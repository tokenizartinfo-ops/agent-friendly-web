import { env } from 'cloudflare:workers';
import { and, eq } from 'drizzle-orm';
import { getCloudflareAccessUser } from '../../../../../cloudflare-access-auth';
import { getDb } from '../../../../../../db';
import { copilotWorkingDrafts, siteProjects } from '../../../../../../db/schema';
import { isCopilotProjectAllowed } from '../../../../../../lib/copilot-rollout.mjs';
import { validateCopilotWorkingDraft } from '../../../../../../lib/copilot-working-draft.mjs';

type Context = { params: Promise<{ projectId: string }> };
const headers = { 'cache-control': 'no-store' };
const reply = (code: string, status: number) => Response.json({ code }, { status, headers });

async function owner(context: Context) {
  const user = await getCloudflareAccessUser();
  if (!user) return { code: 'authentication_required', status: 401 } as const;
  if (String(env.AFW_COPILOT_ENABLED) !== 'true' || !env.AFW_COPILOT_PROJECT_ID) return { code: 'copilot_unavailable', status: 503 } as const;
  const { projectId } = await context.params;
  if (!isCopilotProjectAllowed({ enabled: true, allowedProjectId: env.AFW_COPILOT_PROJECT_ID, projectId })) return { code: 'project_unavailable', status: 404 } as const;
  const [project] = await getDb().select({ id: siteProjects.id }).from(siteProjects)
    .where(and(eq(siteProjects.id, projectId), eq(siteProjects.userId, user.userId))).limit(1);
  if (!project) return { code: 'project_unavailable', status: 404 } as const;
  return { projectId, userId: user.userId };
}

export async function GET(_request: Request, context: Context) {
  const access = await owner(context);
  if ('code' in access) return reply(access.code, access.status);
  const [draft] = await getDb().select({ text: copilotWorkingDrafts.text, revision: copilotWorkingDrafts.revision, updatedAt: copilotWorkingDrafts.updatedAt })
    .from(copilotWorkingDrafts).where(and(eq(copilotWorkingDrafts.projectId, access.projectId), eq(copilotWorkingDrafts.userId, access.userId))).limit(1);
  return Response.json({ draft: draft || { text: '', revision: 0, updatedAt: null } }, { headers });
}

export async function PUT(request: Request, context: Context) {
  const access = await owner(context);
  if ('code' in access) return reply(access.code, access.status);
  if (request.headers.get('origin') !== new URL(request.url).origin
    || request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return reply('invalid_origin', 403);
  if (Number(request.headers.get('content-length')) > 12000) return reply('input_too_large', 413);
  let raw = '';
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply('invalid_working_draft', 400);
    const decoder = new TextDecoder('utf-8', { fatal: true });
    let bytes = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 12000) { await reader.cancel(); return reply('input_too_large', 413); }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch { return reply('invalid_working_draft', 400); }
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { return reply('invalid_working_draft', 400); }
  const input = validateCopilotWorkingDraft(parsed);
  if (!input.ok) return reply(input.code, input.code === 'sensitive_working_draft' ? 422 : 400);
  const db = getDb();
  const now = new Date().toISOString();
  const row = { projectId: access.projectId, userId: access.userId, text: input.text, revision: 1, lastMutationKey: input.mutationKey, updatedAt: now };
  const saved = input.revision === 0
    ? await db.insert(copilotWorkingDrafts).values(row).onConflictDoNothing().returning({ revision: copilotWorkingDrafts.revision, updatedAt: copilotWorkingDrafts.updatedAt })
    : await db.update(copilotWorkingDrafts).set({ text: input.text, revision: input.revision + 1, lastMutationKey: input.mutationKey, updatedAt: now })
      .where(and(eq(copilotWorkingDrafts.projectId, access.projectId), eq(copilotWorkingDrafts.userId, access.userId), eq(copilotWorkingDrafts.revision, input.revision)))
      .returning({ revision: copilotWorkingDrafts.revision, updatedAt: copilotWorkingDrafts.updatedAt });
  if (saved.length) return Response.json({ draft: { text: input.text, ...saved[0] } }, { headers });
  const [current] = await db.select({ text: copilotWorkingDrafts.text, revision: copilotWorkingDrafts.revision, updatedAt: copilotWorkingDrafts.updatedAt, lastMutationKey: copilotWorkingDrafts.lastMutationKey })
    .from(copilotWorkingDrafts).where(and(eq(copilotWorkingDrafts.projectId, access.projectId), eq(copilotWorkingDrafts.userId, access.userId))).limit(1);
  if (current?.lastMutationKey === input.mutationKey && current.text === input.text)
    return Response.json({ draft: { text: current.text, revision: current.revision, updatedAt: current.updatedAt }, replayed: true }, { headers });
  return Response.json({ code: 'working_draft_conflict', draft: current ? { text: current.text, revision: current.revision, updatedAt: current.updatedAt } : null }, { status: 409, headers });
}
