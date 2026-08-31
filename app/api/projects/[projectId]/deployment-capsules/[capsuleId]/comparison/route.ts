import { and, desc, eq } from 'drizzle-orm';
import { getChatGPTUser } from '../../../../../../chatgpt-auth';
import { getDb } from '../../../../../../../db';
import {
  capsuleOriginComparisons,
  projectEvents,
  publicationCapsules,
  siteProjects,
} from '../../../../../../../db/schema';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { deriveCapsuleRole } from '../../../../../../../lib/capsule-access.mjs';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { compareCapsuleOrigin } from '../../../../../../../lib/origin-comparison.mjs';

type RouteContext = { params: Promise<{ projectId: string; capsuleId: string }> };

const REQUEST_CONTRACT = 'agentfriendly.origin-comparison-request.v1';
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
  if (!project || !role) return { project: null, role: null, capsuleRow: null };
  const [capsuleRow] = await db.select().from(publicationCapsules).where(and(
    eq(publicationCapsules.id, capsuleId),
    eq(publicationCapsules.projectId, projectId),
  )).limit(1);
  return { project, role, capsuleRow: capsuleRow || null };
}

async function latestComparison(capsuleId: string) {
  const [row] = await getDb().select().from(capsuleOriginComparisons)
    .where(eq(capsuleOriginComparisons.capsuleId, capsuleId))
    .orderBy(desc(capsuleOriginComparisons.createdAt)).limit(1);
  return row ? parseObject(row.comparisonJson) : null;
}

export async function GET(request: Request, context: RouteContext) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: 'Inicia sesion para comparar la capsula.' }, { status: 401 });
  const { projectId, capsuleId } = await context.params;
  const { role, capsuleRow } = await access(projectId, capsuleId, user);
  if (!role || !capsuleRow) return Response.json({ error: 'No se encontro una comparacion disponible para esta identidad.' }, { status: 404 });
  const comparison = await latestComparison(capsuleId);
  const headers: Record<string, string> = { 'cache-control': 'no-store' };
  if (comparison && new URL(request.url).searchParams.get('download') === '1') {
    headers['content-type'] = 'application/json; charset=utf-8';
    headers['content-disposition'] = `attachment; filename="agent-friendly-origin-comparison-${capsuleId}.json"`;
    return new Response(`${JSON.stringify(comparison, null, 2)}\n`, { headers });
  }
  return Response.json({ actorRole: role, comparison }, { headers });
}

export async function POST(request: Request, context: RouteContext) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: 'Inicia sesion para comparar la capsula.' }, { status: 401 });
  const body = await request.json() as Record<string, unknown>;
  if (body.contract !== REQUEST_CONTRACT || body.confirmRead !== true) {
    return Response.json({ error: 'Confirma la lectura publica antes de comparar.' }, { status: 400 });
  }
  const idempotencyKey = String(body.idempotencyKey || '').trim();
  if (!IDEMPOTENCY_KEY.test(idempotencyKey)) return Response.json({ error: 'La clave de idempotencia no es valida.' }, { status: 400 });

  const { projectId, capsuleId } = await context.params;
  const { role, capsuleRow } = await access(projectId, capsuleId, user);
  if (!role || !capsuleRow) return Response.json({ error: 'No se encontro una capsula disponible para esta identidad.' }, { status: 404 });
  if (String(body.manifestSha256 || '') !== capsuleRow.manifestSha256) {
    return Response.json({ error: 'La capsula cambio. Recarga antes de comparar.' }, { status: 409 });
  }
  if (Date.parse(capsuleRow.expiresAt) <= Date.now()) return Response.json({ error: 'La capsula vencio.' }, { status: 409 });

  const db = getDb();
  const [replayed] = await db.select().from(capsuleOriginComparisons)
    .where(eq(capsuleOriginComparisons.idempotencyKey, idempotencyKey)).limit(1);
  if (replayed) {
    if (replayed.projectId !== projectId || replayed.capsuleId !== capsuleId || replayed.userId !== user.userId) {
      return Response.json({ error: 'La clave de idempotencia ya fue utilizada.' }, { status: 409 });
    }
    return Response.json({ actorRole: role, comparison: parseObject(replayed.comparisonJson), replayed: true }, { headers: { 'cache-control': 'no-store' } });
  }
  const [existing] = await db.select().from(capsuleOriginComparisons).where(and(
    eq(capsuleOriginComparisons.capsuleId, capsuleId),
    eq(capsuleOriginComparisons.manifestSha256, capsuleRow.manifestSha256),
  )).limit(1);
  if (existing) {
    return Response.json({ actorRole: role, comparison: parseObject(existing.comparisonJson), replayed: true }, { headers: { 'cache-control': 'no-store' } });
  }

  const capsule = parseObject(capsuleRow.capsuleJson);
  if (!capsule) return Response.json({ error: 'La capsula almacenada no es valida.' }, { status: 409 });
  const comparisonId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const comparison = await compareCapsuleOrigin(capsule, { comparisonId, observedAt: createdAt });
  await db.batch([
    db.insert(capsuleOriginComparisons).values({
      id: comparisonId,
      capsuleId,
      siteId: capsuleRow.siteId,
      projectId,
      userId: user.userId,
      manifestSha256: capsuleRow.manifestSha256,
      origin: comparison.origin,
      contractVersion: comparison.contract,
      status: comparison.status,
      comparisonJson: JSON.stringify(comparison),
      idempotencyKey,
      expiresAt: capsuleRow.expiresAt,
      createdAt,
      updatedAt: createdAt,
    }),
    db.insert(projectEvents).values({
      id: crypto.randomUUID(), projectId, userId: user.userId,
      type: 'capsule_origin_comparison_created',
      payloadJson: JSON.stringify({ comparisonId, capsuleId, manifestSha256: capsuleRow.manifestSha256, status: comparison.status, resourceCount: comparison.resources.length }),
      createdAt,
    }),
  ]);
  return Response.json({ actorRole: role, comparison, replayed: false }, { status: 201, headers: { 'cache-control': 'no-store' } });
}

