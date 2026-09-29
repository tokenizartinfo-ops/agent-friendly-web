import { and, desc, eq } from 'drizzle-orm';
import { getCloudflareAccessUser } from '../../../../cloudflare-access-auth';
import { getDb } from '../../../../../db';
import { projectEvents, registrySites, scanObservations, siteProjects } from '../../../../../db/schema';
import { runPublicAudit, sanitizeObservation } from '../../../../../lib/public-audit.mjs';
import { summarizeObservationHistory } from '../../../../../lib/observation-history.mjs';
import { observationRequestIds } from '../../../../../lib/observation-save-attempt.mjs';

type RouteContext = { params: Promise<{ projectId: string }> };
const REQUEST_KEY = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function readinessFromStored(value: string) {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

async function ownedProject(projectId: string, userId: string) {
  const [project] = await getDb()
    .select()
    .from(siteProjects)
    .where(and(eq(siteProjects.id, projectId), eq(siteProjects.userId, userId)))
    .limit(1);
  return project || null;
}

export async function GET(_request: Request, context: RouteContext) {
  const user = await getCloudflareAccessUser();
  if (!user) return Response.json({ error: 'Inicia sesion para consultar observaciones.' }, { status: 401 });
  const { projectId } = await context.params;
  const project = await ownedProject(projectId, user.userId);
  if (!project) return Response.json({ error: 'No se encontro el expediente.' }, { status: 404 });

  let origin = '';
  try { origin = new URL(project.website).origin; } catch { /* No comparable current origin. */ }
  const rows = origin ? await getDb()
    .select()
    .from(scanObservations)
    .where(and(
      eq(scanObservations.projectId, projectId),
      eq(scanObservations.userId, user.userId),
      eq(scanObservations.targetOrigin, origin),
    ))
    .orderBy(desc(scanObservations.checkedAt))
    .limit(5) : [];
  const [observation] = rows;

  return Response.json({
    observation: observation ? {
      id: observation.id,
      target: observation.targetOrigin,
      checkedAt: observation.checkedAt,
      readiness: readinessFromStored(observation.readinessJson),
    } : null,
    history: summarizeObservationHistory(rows, project.website),
  }, { headers: { 'cache-control': 'no-store' } });
}

export async function POST(request: Request, context: RouteContext) {
  const user = await getCloudflareAccessUser();
  if (!user) return Response.json({ error: 'Inicia sesion para guardar una observacion.' }, { status: 401 });
  let body: { confirmSave?: boolean };
  try { body = await request.json() as { confirmSave?: boolean }; } catch {
    return Response.json({ code: 'invalid_json' }, { status: 400 });
  }
  if (!body || body.confirmSave !== true) {
    return Response.json({ error: 'Confirma expresamente que deseas ejecutar y guardar esta auditoria.' }, { status: 400 });
  }
  const requestKey = request.headers.get('idempotency-key');
  if (!requestKey || !REQUEST_KEY.test(requestKey)) {
    return Response.json({ code: 'idempotency_key_required' }, { status: 400, headers: { 'cache-control': 'no-store' } });
  }

  const { projectId } = await context.params;
  const project = await ownedProject(projectId, user.userId);
  if (!project) return Response.json({ error: 'No se encontro el expediente.' }, { status: 404 });

  let requestedOrigin: URL;
  try {
    requestedOrigin = new URL(project.website);
  } catch {
    return Response.json({ error: 'El expediente no contiene un sitio publico valido.' }, { status: 400 });
  }

  const db = getDb();
  const { observationId, eventId } = await observationRequestIds(user.userId, projectId, requestKey);
  const recover = async () => {
    const [saved] = await db.select().from(scanObservations).where(and(
      eq(scanObservations.id, observationId), eq(scanObservations.projectId, projectId), eq(scanObservations.userId, user.userId),
    )).limit(1);
    if (!saved) return null;
    if (saved.targetOrigin !== requestedOrigin.origin) return Response.json({ code: 'idempotency_conflict' }, { status: 409, headers: { 'cache-control': 'no-store' } });
    return Response.json({ observation: { id: saved.id, target: saved.targetOrigin, checkedAt: saved.checkedAt,
      readiness: readinessFromStored(saved.readinessJson) }, replayed: true }, { status: 200, headers: { 'cache-control': 'no-store' } });
  };
  const prior = await recover();
  if (prior) return prior;
  const [existingSite] = await db
    .select()
    .from(registrySites)
    .where(and(eq(registrySites.projectId, projectId), eq(registrySites.userId, user.userId)))
    .limit(1);
  if (existingSite && existingSite.hostname !== requestedOrigin.hostname) {
    return Response.json(
      { error: 'El dominio del expediente cambio. Actualiza la identidad del sitio antes de guardar una observacion nueva.' },
      { status: 409 },
    );
  }
  const [hostnameOwner] = await db
    .select()
    .from(registrySites)
    .where(eq(registrySites.hostname, requestedOrigin.hostname))
    .limit(1);
  if (!existingSite && hostnameOwner && hostnameOwner.projectId !== projectId) {
    return Response.json({ error: 'Ese dominio ya pertenece a otro expediente.' }, { status: 409 });
  }

  let sanitized;
  try {
    sanitized = sanitizeObservation(await runPublicAudit(project.website));
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'No se pudo ejecutar la auditoria publica.' },
      { status: 400, headers: { 'cache-control': 'no-store' } },
    );
  }

  const now = new Date().toISOString();
  const siteId = existingSite?.id || crypto.randomUUID();
  const observationWrite = db.insert(scanObservations).values({
    id: observationId,
    siteId,
    projectId,
    userId: user.userId,
    targetOrigin: sanitized.target,
    evidenceJson: JSON.stringify(sanitized.evidence),
    readinessJson: JSON.stringify(sanitized.readiness),
    probesJson: JSON.stringify(sanitized.probes),
    checkedAt: sanitized.checkedAt,
    createdAt: now,
  }).onConflictDoNothing().returning({ id: scanObservations.id });
  const eventWrite = db.insert(projectEvents).values({
    id: eventId,
    projectId,
    userId: user.userId,
    type: 'scan_observation_saved',
    payloadJson: JSON.stringify({
      observationId,
      score: sanitized.readiness.score,
      checkedAt: sanitized.checkedAt,
    }),
    createdAt: now,
  }).onConflictDoNothing();

  let inserted: { id: string }[];
  try {
    if (existingSite) {
      [inserted] = await db.batch([observationWrite, eventWrite]);
    } else {
      const [, result] = await db.batch([
        db.insert(registrySites).values({
        id: siteId,
        projectId,
        userId: user.userId,
        hostname: requestedOrigin.hostname,
        canonicalOrigin: requestedOrigin.origin,
        verificationStatus: 'unverified',
        visibility: 'private',
        createdAt: now,
        updatedAt: now,
        }),
        observationWrite,
        eventWrite,
      ]);
      inserted = result;
    }
  } catch {
    const committed = await recover();
    if (committed) return committed;
    return Response.json({ code: 'observation_save_unconfirmed', error: 'No pudimos confirmar el guardado. Reintenta con esta misma solicitud.' },
      { status: 503, headers: { 'cache-control': 'no-store' } });
  }
  const committed = await recover();
  if (!committed) return Response.json({ code: 'observation_save_unconfirmed' }, { status: 503, headers: { 'cache-control': 'no-store' } });
  if (!inserted.length) return committed;
  return Response.json({
    observation: {
      id: observationId,
      target: sanitized.target,
      checkedAt: sanitized.checkedAt,
      readiness: sanitized.readiness,
    },
    notice: 'Se guardo una observacion saneada. No se guardaron cuerpos HTTP, credenciales ni errores crudos.',
  }, { status: 201, headers: { 'cache-control': 'no-store' } });
}
