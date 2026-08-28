import { and, eq } from 'drizzle-orm';
import { getChatGPTUser } from '../../../../../../chatgpt-auth';
import { getDb } from '../../../../../../../db';
import {
  capsuleApprovals,
  projectEvents,
  publicationCapsules,
  siteProjects,
} from '../../../../../../../db/schema';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { deriveCapsuleRole } from '../../../../../../../lib/capsule-access.mjs';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { capsuleState, validateCapsuleDecision } from '../../../../../../../lib/publication-capsule.mjs';

type RouteContext = { params: Promise<{ projectId: string; capsuleId: string }> };

function parseCapsule(value: string) {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function approvalStatus(rows: Array<{ role: string; decision: string }>, role: string, fallback: string) {
  return rows.find((row) => row.role === role)?.decision || fallback;
}

export async function POST(request: Request, context: RouteContext) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: 'Inicia sesion para decidir sobre la capsula.' }, { status: 401 });
  const { projectId, capsuleId } = await context.params;
  const db = getDb();
  const [project] = await db.select().from(siteProjects).where(eq(siteProjects.id, projectId)).limit(1);
  const role = project ? deriveCapsuleRole(user, project) : null;
  if (!project || !role) return Response.json({ error: 'No se encontro una capsula disponible para esta identidad.' }, { status: 404 });

  const [capsule] = await db
    .select()
    .from(publicationCapsules)
    .where(and(eq(publicationCapsules.id, capsuleId), eq(publicationCapsules.projectId, projectId)))
    .limit(1);
  if (!capsule) return Response.json({ error: 'No se encontro la capsula.' }, { status: 404 });
  const stored = parseCapsule(capsule.capsuleJson);
  if (!stored) return Response.json({ error: 'La capsula almacenada no es valida.' }, { status: 500 });
  const requiredRoles = Array.isArray(stored.approvals?.requiredRoles) ? stored.approvals.requiredRoles : ['owner'];
  if (!requiredRoles.includes(role)) {
    return Response.json({ error: 'Esta capsula no requiere una decision de este rol.' }, { status: 403 });
  }

  let decision;
  try {
    decision = validateCapsuleDecision(await request.json());
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'La decision no es valida.' }, { status: 400 });
  }
  if (decision.manifestSha256 !== capsule.manifestSha256) {
    return Response.json({ error: 'La decision no corresponde a la version exacta de esta capsula.' }, { status: 409 });
  }
  if (new Date().getTime() >= Date.parse(capsule.expiresAt)) {
    return Response.json({ error: 'La capsula vencio. El owner debe generar una nueva version.' }, { status: 409 });
  }

  const [replayed] = await db
    .select()
    .from(capsuleApprovals)
    .where(eq(capsuleApprovals.idempotencyKey, decision.idempotencyKey))
    .limit(1);
  if (replayed) {
    if (replayed.capsuleId !== capsuleId || replayed.role !== role || replayed.decision !== decision.decision) {
      return Response.json({ error: 'La clave de idempotencia ya fue utilizada para otra decision.' }, { status: 409 });
    }
    return Response.json({ role, decision: replayed.decision, status: capsule.status, replayed: true }, { headers: { 'cache-control': 'no-store' } });
  }

  const existingApprovals = await db
    .select()
    .from(capsuleApprovals)
    .where(eq(capsuleApprovals.capsuleId, capsuleId));
  const currentStatus = capsuleState({ requiredRoles, approvals: existingApprovals, expiresAt: capsule.expiresAt });
  if (currentStatus === 'rejected') {
    return Response.json({ error: 'Esta version fue rechazada y ya no admite nuevas decisiones.' }, { status: 409 });
  }
  if (currentStatus === 'approved_for_manual_handoff') {
    return Response.json({ error: 'Esta version ya fue aprobada para entrega manual.' }, { status: 409 });
  }

  const previousRoleDecision = existingApprovals.find((approval) => approval.role === role);
  if (previousRoleDecision) {
    return Response.json({ error: 'Este rol ya decidio sobre esta version. Genera otra capsula para cambiar el contenido.' }, { status: 409 });
  }

  const approvals = [...existingApprovals, { role, decision: decision.decision }];
  const status = capsuleState({ requiredRoles, approvals, expiresAt: capsule.expiresAt });
  const ownerApprovalStatus = approvalStatus(approvals, 'owner', 'pending');
  const maintainerApprovalStatus = requiredRoles.includes('maintainer')
    ? approvalStatus(approvals, 'maintainer', 'pending')
    : 'not_required';
  const now = new Date().toISOString();
  await db.batch([
    db.insert(capsuleApprovals).values({
      id: crypto.randomUUID(),
      capsuleId,
      projectId,
      role,
      actorUserId: user.userId,
      decision: decision.decision,
      manifestSha256: decision.manifestSha256,
      idempotencyKey: decision.idempotencyKey,
      note: decision.note,
      createdAt: now,
    }),
    db.update(publicationCapsules).set({
      status,
      ownerApprovalStatus,
      maintainerApprovalStatus,
      updatedAt: now,
    }).where(eq(publicationCapsules.id, capsuleId)),
    db.insert(projectEvents).values({
      id: crypto.randomUUID(),
      projectId,
      userId: user.userId,
      type: 'publication_capsule_decision',
      payloadJson: JSON.stringify({ capsuleId, role, decision: decision.decision, manifestSha256: decision.manifestSha256, status }),
      createdAt: now,
    }),
  ]);

  return Response.json({
    role,
    decision: decision.decision,
    status,
    approvals: { owner: ownerApprovalStatus, maintainer: maintainerApprovalStatus },
    replayed: false,
    notice: status === 'approved_for_manual_handoff'
      ? 'La capsula esta aprobada para entrega manual. El sitio todavia no fue modificado.'
      : 'La decision quedo registrada. No se modifico el sitio.',
  }, { status: 201, headers: { 'cache-control': 'no-store' } });
}
