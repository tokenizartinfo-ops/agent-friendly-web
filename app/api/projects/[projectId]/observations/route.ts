import { and, desc, eq } from 'drizzle-orm';
import { getChatGPTUser } from '../../../../chatgpt-auth';
import { getDb } from '../../../../../db';
import { projectEvents, registrySites, scanObservations, siteProjects } from '../../../../../db/schema';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { runPublicAudit, sanitizeObservation } from '../../../../../lib/public-audit.mjs';

type RouteContext = { params: Promise<{ projectId: string }> };

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
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: 'Inicia sesion para consultar observaciones.' }, { status: 401 });
  const { projectId } = await context.params;
  const project = await ownedProject(projectId, user.userId);
  if (!project) return Response.json({ error: 'No se encontro el expediente.' }, { status: 404 });

  const [observation] = await getDb()
    .select()
    .from(scanObservations)
    .where(and(
      eq(scanObservations.projectId, projectId),
      eq(scanObservations.userId, user.userId),
    ))
    .orderBy(desc(scanObservations.checkedAt))
    .limit(1);

  return Response.json({
    observation: observation ? {
      id: observation.id,
      target: observation.targetOrigin,
      checkedAt: observation.checkedAt,
      readiness: readinessFromStored(observation.readinessJson),
    } : null,
  }, { headers: { 'cache-control': 'no-store' } });
}

export async function POST(request: Request, context: RouteContext) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: 'Inicia sesion para guardar una observacion.' }, { status: 401 });
  const body = await request.json() as { confirmSave?: boolean };
  if (body.confirmSave !== true) {
    return Response.json({ error: 'Confirma expresamente que deseas ejecutar y guardar esta auditoria.' }, { status: 400 });
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
  const observationId = crypto.randomUUID();
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
  });
  const eventWrite = db.insert(projectEvents).values({
    id: crypto.randomUUID(),
    projectId,
    userId: user.userId,
    type: 'scan_observation_saved',
    payloadJson: JSON.stringify({
      observationId,
      score: sanitized.readiness.score,
      checkedAt: sanitized.checkedAt,
    }),
    createdAt: now,
  });

  if (existingSite) {
    await db.batch([observationWrite, eventWrite]);
  } else {
    await db.batch([
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
  }

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
