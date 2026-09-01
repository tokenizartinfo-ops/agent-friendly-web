import { and, desc, eq } from 'drizzle-orm';
import { getCloudflareAccessUser } from '../../../../../../cloudflare-access-auth';
import { getDb } from '../../../../../../../db';
import {
  capsuleOriginComparisons,
  draftPrPlans,
  projectEvents,
  publicationCapsules,
  siteProjects,
} from '../../../../../../../db/schema';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { deriveCapsuleRole } from '../../../../../../../lib/capsule-access.mjs';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { buildDraftPrPlan } from '../../../../../../../lib/draft-pr-plan.mjs';

type RouteContext = { params: Promise<{ projectId: string; capsuleId: string }> };

const REQUEST_CONTRACT = 'agentfriendly.draft-pr-plan-request.v1';
const IDEMPOTENCY_KEY = /^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,119}$/;

function parseObject(value: string) {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function access(projectId: string, capsuleId: string, user: { userId: string; email: string }) {
  const db = getDb();
  const [project] = await db.select().from(siteProjects).where(eq(siteProjects.id, projectId)).limit(1);
  const role = project ? deriveCapsuleRole(user, project) : null;
  if (!project || !role) return { role: null, capsuleRow: null };
  const [capsuleRow] = await db.select().from(publicationCapsules).where(and(
    eq(publicationCapsules.id, capsuleId),
    eq(publicationCapsules.projectId, projectId),
  )).limit(1);
  return { role, capsuleRow: capsuleRow || null };
}

async function latestPlan(capsuleId: string) {
  const [row] = await getDb().select().from(draftPrPlans)
    .where(eq(draftPrPlans.capsuleId, capsuleId))
    .orderBy(desc(draftPrPlans.createdAt)).limit(1);
  return row ? parseObject(row.planJson) : null;
}

export async function GET(request: Request, context: RouteContext) {
  const user = await getCloudflareAccessUser();
  if (!user) return Response.json({ error: 'Inicia sesion para revisar el borrador tecnico.' }, { status: 401 });
  const { projectId, capsuleId } = await context.params;
  const { role, capsuleRow } = await access(projectId, capsuleId, user);
  if (!role || !capsuleRow) return Response.json({ error: 'No se encontro un borrador disponible para esta identidad.' }, { status: 404 });
  const plan = await latestPlan(capsuleId);
  const headers: Record<string, string> = { 'cache-control': 'no-store' };
  if (plan && new URL(request.url).searchParams.get('download') === '1') {
    headers['content-type'] = 'application/json; charset=utf-8';
    headers['content-disposition'] = `attachment; filename="agent-friendly-draft-pr-plan-${capsuleId}.json"`;
    return new Response(`${JSON.stringify(plan, null, 2)}\n`, { headers });
  }
  return Response.json({ actorRole: role, plan }, { headers });
}

export async function POST(request: Request, context: RouteContext) {
  const user = await getCloudflareAccessUser();
  if (!user) return Response.json({ error: 'Inicia sesion para preparar el borrador tecnico.' }, { status: 401 });
  const body = await request.json() as Record<string, unknown>;
  if (body.contract !== REQUEST_CONTRACT || body.confirmPrepare !== true) {
    return Response.json({ error: 'Confirma la preparacion del borrador tecnico.' }, { status: 400 });
  }
  const idempotencyKey = String(body.idempotencyKey || '').trim();
  if (!IDEMPOTENCY_KEY.test(idempotencyKey)) return Response.json({ error: 'La clave de idempotencia no es valida.' }, { status: 400 });

  const { projectId, capsuleId } = await context.params;
  const { role, capsuleRow } = await access(projectId, capsuleId, user);
  if (!role || !capsuleRow) return Response.json({ error: 'No se encontro una capsula disponible para esta identidad.' }, { status: 404 });
  if (role !== 'owner') return Response.json({ error: 'Solo el owner puede preparar el borrador tecnico.' }, { status: 404 });
  if (String(body.manifestSha256 || '') !== capsuleRow.manifestSha256) return Response.json({ error: 'La capsula cambio. Recarga antes de continuar.' }, { status: 409 });

  const db = getDb();
  const [replayed] = await db.select().from(draftPrPlans).where(eq(draftPrPlans.idempotencyKey, idempotencyKey)).limit(1);
  if (replayed) {
    if (replayed.projectId !== projectId || replayed.capsuleId !== capsuleId || replayed.userId !== user.userId) {
      return Response.json({ error: 'La clave de idempotencia ya fue utilizada.' }, { status: 409 });
    }
    return Response.json({ actorRole: role, plan: parseObject(replayed.planJson), replayed: true }, { headers: { 'cache-control': 'no-store' } });
  }

  const [comparisonRow] = await db.select().from(capsuleOriginComparisons).where(and(
    eq(capsuleOriginComparisons.capsuleId, capsuleId),
    eq(capsuleOriginComparisons.manifestSha256, capsuleRow.manifestSha256),
  )).orderBy(desc(capsuleOriginComparisons.createdAt)).limit(1);
  const comparison = comparisonRow ? parseObject(comparisonRow.comparisonJson) : null;
  if (!comparison || comparison.status !== 'complete') return Response.json({ error: 'Completa primero la comparacion con el sitio actual.' }, { status: 409 });
  const [existingPlan] = await db.select().from(draftPrPlans).where(and(
    eq(draftPrPlans.capsuleId, capsuleId),
    eq(draftPrPlans.comparisonId, comparison.comparisonId),
  )).limit(1);
  if (existingPlan) {
    return Response.json({ actorRole: role, plan: parseObject(existingPlan.planJson), replayed: true }, { headers: { 'cache-control': 'no-store' } });
  }
  const capsule = parseObject(capsuleRow.capsuleJson);
  if (!capsule) return Response.json({ error: 'La capsula almacenada no es valida.' }, { status: 409 });

  const planId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  let plan;
  try {
    plan = buildDraftPrPlan({
      planId,
      capsule,
      comparison,
      repository: body.repository,
      baseBranch: body.baseBranch,
      pathMappings: body.pathMappings,
      reviewer: body.reviewer,
      generatedAt: createdAt,
      externalVerifierTests: [
        { provider: 'Cloudflare isitagentready.com', url: 'https://isitagentready.com/' },
        { provider: 'Schema.org Markup Validator', url: 'https://validator.schema.org/' },
      ],
    });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'No se pudo preparar el borrador tecnico.' }, { status: 400 });
  }
  if (plan.status !== 'prepared_not_submitted' || plan.remoteSubmission !== false || plan.mergeAllowed !== false) {
    return Response.json({ error: 'El borrador no cumple los limites de seguridad.' }, { status: 409 });
  }

  await db.batch([
    db.insert(draftPrPlans).values({
      id: planId,
      capsuleId,
      comparisonId: comparison.comparisonId,
      projectId,
      userId: user.userId,
      provider: 'github',
      repository: plan.repository,
      baseBranch: plan.baseBranch,
      proposedBranch: plan.branch,
      contractVersion: plan.contract,
      status: 'prepared_not_submitted',
      planJson: JSON.stringify(plan),
      idempotencyKey,
      createdAt,
      updatedAt: createdAt,
    }),
    db.insert(projectEvents).values({
      id: crypto.randomUUID(), projectId, userId: user.userId,
      type: 'draft_pr_plan_created',
      payloadJson: JSON.stringify({ planId, capsuleId, comparisonId: comparison.comparisonId, manifestSha256: capsuleRow.manifestSha256, status: 'prepared_not_submitted', fileCount: plan.files.length }),
      createdAt,
    }),
  ]);
  return Response.json({ actorRole: role, plan, replayed: false }, { status: 201, headers: { 'cache-control': 'no-store' } });
}
