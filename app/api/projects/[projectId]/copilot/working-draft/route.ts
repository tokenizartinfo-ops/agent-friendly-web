import { env } from 'cloudflare:workers';
import { and, eq } from 'drizzle-orm';
import { getCloudflareAccessUser } from '../../../../../cloudflare-access-auth';
import { getDb } from '../../../../../../db';
import { copilotWorkingDrafts, siteProjects } from '../../../../../../db/schema';
import { isCopilotProjectAllowed } from '../../../../../../lib/copilot-rollout.mjs';
import { validateCopilotWorkingDraft } from '../../../../../../lib/copilot-working-draft.mjs';
import { emptyCopilotSession, reviewCopilotSession } from '../../../../../../lib/copilot-session.mjs';

type Context = { params: Promise<{ projectId: string }> };
const headers = { 'cache-control': 'no-store' };
const reply = (code: string, status: number) => Response.json({ code }, { status, headers });
function view(row: { text: string; revision: number; updatedAt: string; sessionJson?: string }) {
  let session = emptyCopilotSession();
  try { session = reviewCopilotSession(JSON.parse(row.sessionJson || '{}'), row.text); } catch { /* Legacy state. */ }
  return { text: row.text, revision: row.revision, updatedAt: row.updatedAt, session };
}

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
  if ('code' in access) return reply(access.code || 'project_unavailable', access.status || 404);
  const [draft] = await getDb().select({ text: copilotWorkingDrafts.text, revision: copilotWorkingDrafts.revision, updatedAt: copilotWorkingDrafts.updatedAt, sessionJson: copilotWorkingDrafts.sessionJson })
    .from(copilotWorkingDrafts).where(and(eq(copilotWorkingDrafts.projectId, access.projectId), eq(copilotWorkingDrafts.userId, access.userId))).limit(1);
  return Response.json({ draft: draft ? view(draft) : { text: '', revision: 0, updatedAt: null, session: emptyCopilotSession() } }, { headers });
}

export async function PUT(request: Request, context: Context) {
  const access = await owner(context);
  if ('code' in access) return reply(access.code || 'project_unavailable', access.status || 404);
  if (request.headers.get('origin') !== new URL(request.url).origin
    || request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return reply('invalid_origin', 403);
  if (Number(request.headers.get('content-length')) > 28000) return reply('input_too_large', 413);
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
      if (bytes > 28000) { await reader.cancel(); return reply('input_too_large', 413); }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch { return reply('invalid_working_draft', 400); }
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { return reply('invalid_working_draft', 400); }
  const input = validateCopilotWorkingDraft(parsed);
  if (!input.ok || !('text' in input)) return reply(input.code || 'invalid_working_draft', input.code === 'sensitive_working_draft' ? 422 : 400);
  const db = getDb();
  const now = new Date().toISOString();
  const sessionPatch = input.session ? { sessionJson: JSON.stringify(input.session) } : {};
  const row = { projectId: access.projectId, userId: access.userId, text: input.text, revision: 1, lastMutationKey: input.mutationKey, updatedAt: now, ...sessionPatch };
  const saved = input.revision === 0
    ? await db.insert(copilotWorkingDrafts).values(row).onConflictDoNothing().returning({ text: copilotWorkingDrafts.text, revision: copilotWorkingDrafts.revision, updatedAt: copilotWorkingDrafts.updatedAt, sessionJson: copilotWorkingDrafts.sessionJson })
    : await db.update(copilotWorkingDrafts).set({ text: input.text, revision: input.revision + 1, lastMutationKey: input.mutationKey, updatedAt: now, ...sessionPatch })
      .where(and(eq(copilotWorkingDrafts.projectId, access.projectId), eq(copilotWorkingDrafts.userId, access.userId), eq(copilotWorkingDrafts.revision, input.revision)))
      .returning({ text: copilotWorkingDrafts.text, revision: copilotWorkingDrafts.revision, updatedAt: copilotWorkingDrafts.updatedAt, sessionJson: copilotWorkingDrafts.sessionJson });
  if (saved.length) return Response.json({ draft: view(saved[0]) }, { headers });
  const [current] = await db.select({ text: copilotWorkingDrafts.text, revision: copilotWorkingDrafts.revision, updatedAt: copilotWorkingDrafts.updatedAt, lastMutationKey: copilotWorkingDrafts.lastMutationKey, sessionJson: copilotWorkingDrafts.sessionJson })
    .from(copilotWorkingDrafts).where(and(eq(copilotWorkingDrafts.projectId, access.projectId), eq(copilotWorkingDrafts.userId, access.userId))).limit(1);
  if (current?.lastMutationKey === input.mutationKey && current.text === input.text && (!input.session || current.sessionJson === JSON.stringify(input.session)))
    return Response.json({ draft: view(current), replayed: true }, { headers });
  return Response.json({ code: 'working_draft_conflict', draft: current ? view(current) : null }, { status: 409, headers });
}
