import { createHash } from 'node:crypto';
import { and, desc, eq } from 'drizzle-orm';
import { getChatGPTUser } from '../../../../chatgpt-auth';
import { getDb } from '../../../../../db';
import {
  capsuleApprovals,
  domainClaims,
  projectEvents,
  publicationCapsules,
  registrySites,
  siteProjects,
} from '../../../../../db/schema';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { deriveCapsuleRole, maintainerApprovalRequired } from '../../../../../lib/capsule-access.mjs';
import { domainClaimStatusAt } from '../../../../../lib/domain-verification.mjs';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { buildPublicationCapsule, capsuleState } from '../../../../../lib/publication-capsule.mjs';

type RouteContext = { params: Promise<{ projectId: string }> };

const BUILD_CONTRACT = 'agentfriendly.publication-capsule-build.v1';
const CAPSULE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const IDEMPOTENCY_KEY = /^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,119}$/;

function decodeList(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseCapsule(value: string) {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function opaqueRef(prefix: string, value: string) {
  return `${prefix}:${createHash('sha256').update(value).digest('hex').slice(0, 24)}`;
}

function normalizedDomain(value: unknown) {
  return String(value || '').trim().toLowerCase().replace(/\.$/, '');
}

function decisionStatus(rows: Array<{ role: string; decision: string }>, role: string, fallback: string) {
  return rows.find((row) => row.role === role)?.decision || fallback;
}

async function present(row: typeof publicationCapsules.$inferSelect) {
  const db = getDb();
  const approvals = await db
    .select()
    .from(capsuleApprovals)
    .where(eq(capsuleApprovals.capsuleId, row.id));
  const capsule = parseCapsule(row.capsuleJson);
  if (!capsule) return null;
  const requiredRoles = Array.isArray(capsule.approvals?.requiredRoles) ? capsule.approvals.requiredRoles : ['owner'];
  const status = capsuleState({ requiredRoles, approvals, expiresAt: row.expiresAt });
  return {
    ...capsule,
    status,
    approvals: {
      requiredRoles,
      owner: decisionStatus(approvals, 'owner', 'pending'),
      maintainer: requiredRoles.includes('maintainer')
        ? decisionStatus(approvals, 'maintainer', 'pending')
        : 'not_required',
    },
  };
}

async function projectForActor(projectId: string, user: { userId: string; email: string }) {
  const [project] = await getDb().select().from(siteProjects).where(eq(siteProjects.id, projectId)).limit(1);
  if (!project) return { project: null, role: null };
  return { project, role: deriveCapsuleRole(user, project) };
}

export async function GET(request: Request, context: RouteContext) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: 'Inicia sesion para revisar una capsula.' }, { status: 401 });
  const { projectId } = await context.params;
  const { project, role } = await projectForActor(projectId, user);
  if (!project || !role) return Response.json({ error: 'No se encontro una capsula disponible para esta identidad.' }, { status: 404 });

  const [row] = await getDb()
    .select()
    .from(publicationCapsules)
    .where(eq(publicationCapsules.projectId, projectId))
    .orderBy(desc(publicationCapsules.version))
    .limit(1);
  const capsule = row ? await present(row) : null;
  const headers: Record<string, string> = { 'cache-control': 'no-store' };
  if (capsule && new URL(request.url).searchParams.get('download') === '1') {
    headers['content-type'] = 'application/json; charset=utf-8';
    headers['content-disposition'] = `attachment; filename="agent-friendly-capsule-${capsule.target.hostname}-v${capsule.version}.json"`;
    return new Response(`${JSON.stringify(capsule, null, 2)}\n`, { headers });
  }
  return Response.json({ actorRole: role, capsule }, { headers });
}

export async function POST(request: Request, context: RouteContext) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: 'Inicia sesion para preparar una capsula.' }, { status: 401 });
  const body = await request.json() as Record<string, unknown>;
  if (body.contract !== BUILD_CONTRACT || body.confirmBuild !== true) {
    return Response.json({ error: 'Confirma expresamente la preparacion de la capsula.' }, { status: 400 });
  }
  const requestIdempotencyKey = String(body.idempotencyKey || '').trim();
  if (!IDEMPOTENCY_KEY.test(requestIdempotencyKey)) {
    return Response.json({ error: 'La clave de idempotencia no es valida.' }, { status: 400 });
  }

  const { projectId } = await context.params;
  const { project, role } = await projectForActor(projectId, user);
  if (!project || role !== 'owner') return Response.json({ error: 'Solo el owner del expediente puede preparar una capsula.' }, { status: 404 });

  const db = getDb();
  const [replayed] = await db
    .select()
    .from(publicationCapsules)
    .where(eq(publicationCapsules.idempotencyKey, requestIdempotencyKey))
    .limit(1);
  if (replayed) {
    if (replayed.projectId !== projectId || replayed.userId !== user.userId) {
      return Response.json({ error: 'La clave de idempotencia ya fue utilizada.' }, { status: 409 });
    }
    return Response.json({ actorRole: role, capsule: await present(replayed), replayed: true }, { headers: { 'cache-control': 'no-store' } });
  }

  const [site] = await db
    .select()
    .from(registrySites)
    .where(and(eq(registrySites.projectId, projectId), eq(registrySites.userId, user.userId)))
    .limit(1);
  if (!site || site.verificationStatus !== 'verified') {
    return Response.json({ error: 'Primero debes verificar el dominio del expediente.' }, { status: 409 });
  }
  const expectedDomain = normalizedDomain(body.expectedDomain);
  if (!expectedDomain || expectedDomain !== site.hostname) {
    return Response.json({ error: 'El dominio confirmado no coincide con el dominio verificado.' }, { status: 409 });
  }
  const [claim] = await db
    .select()
    .from(domainClaims)
    .where(and(
      eq(domainClaims.siteId, site.id),
      eq(domainClaims.projectId, projectId),
      eq(domainClaims.userId, user.userId),
      eq(domainClaims.status, 'verified'),
    ))
    .orderBy(desc(domainClaims.verifiedAt))
    .limit(1);
  if (!claim || domainClaimStatusAt(claim) !== 'verified') {
    return Response.json({ error: 'La verificacion del dominio vencio. Renuevala antes de preparar la capsula.' }, { status: 409 });
  }

  const [lastCapsule] = await db
    .select()
    .from(publicationCapsules)
    .where(eq(publicationCapsules.siteId, site.id))
    .orderBy(desc(publicationCapsules.version))
    .limit(1);
  const version = (lastCapsule?.version || 0) + 1;
  const capsuleId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.parse(createdAt) + CAPSULE_TTL_MS).toISOString();
  const maintainerRequired = maintainerApprovalRequired(project);
  let capsule;
  try {
    capsule = buildPublicationCapsule({
      capsuleId,
      projectId,
      siteId: site.id,
      version,
      canonicalOrigin: site.canonicalOrigin,
      organization: project.organization,
      siteType: project.siteType,
      audience: project.audience,
      goals: decodeList(project.goalsJson),
      languages: decodeList(project.languagesJson),
      selectedResources: decodeList(project.authorizedResourcesJson),
      crawlerSearchPolicy: project.crawlerSearchPolicy,
      crawlerTrainingPolicy: project.crawlerTrainingPolicy,
      ownerRef: opaqueRef('owner', user.userId),
      maintainerRequired,
      maintainerRef: project.maintainerEmail ? opaqueRef('maintainer', project.maintainerEmail.toLowerCase()) : 'maintainer:pending-contact',
      createdAt,
      expiresAt,
    });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'No se pudo preparar la capsula.' }, { status: 400 });
  }

  const row = {
    id: capsuleId,
    siteId: site.id,
    projectId,
    userId: user.userId,
    version,
    contractVersion: capsule.contract,
    mode: capsule.mode,
    manifestSha256: capsule.integrity.manifestSha256,
    idempotencyKey: requestIdempotencyKey,
    capsuleJson: JSON.stringify(capsule),
    status: capsule.status,
    ownerApprovalStatus: 'pending',
    maintainerApprovalStatus: maintainerRequired ? 'pending' : 'not_required',
    expiresAt,
    createdAt,
    updatedAt: createdAt,
  };
  await db.batch([
    db.insert(publicationCapsules).values(row),
    db.insert(projectEvents).values({
      id: crypto.randomUUID(),
      projectId,
      userId: user.userId,
      type: 'publication_capsule_created',
      payloadJson: JSON.stringify({ capsuleId, version, manifestSha256: capsule.integrity.manifestSha256, fileCount: capsule.files.length }),
      createdAt,
    }),
  ]);

  return Response.json({ actorRole: role, capsule, replayed: false }, { status: 201, headers: { 'cache-control': 'no-store' } });
}
