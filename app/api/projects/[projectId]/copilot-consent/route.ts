import { env } from 'cloudflare:workers';
import { and, eq } from 'drizzle-orm';
import { getCloudflareAccessUser } from '../../../../cloudflare-access-auth';
import { getDb } from '../../../../../db';
import { copilotConsentEvents, siteProjects } from '../../../../../db/schema';
import { COPILOT_CONSENT_VERSION, currentCopilotConsent } from '../../../../../lib/copilot-consent';
import { isCopilotProjectAllowed } from '../../../../../lib/copilot-rollout.mjs';

type Context = { params: Promise<{ projectId: string }> };
const headers = { 'cache-control': 'no-store' };
const reply = (code: string, status: number) => Response.json({ code }, { status, headers });

async function ownedProject(context: Context) {
  const user = await getCloudflareAccessUser();
  if (!user) return { error: reply('authentication_required', 401) };
  const { projectId } = await context.params;
  if (String(env.AFW_COPILOT_ENABLED) !== 'true' || !env.AFW_COPILOT_PROJECT_ID) {
    return { error: reply('copilot_unavailable', 503) };
  }
  if (!isCopilotProjectAllowed({ enabled: true, allowedProjectId: env.AFW_COPILOT_PROJECT_ID, projectId })) {
    return { error: reply('project_unavailable', 404) };
  }
  const [project] = await getDb().select({ id: siteProjects.id }).from(siteProjects)
    .where(and(eq(siteProjects.id, projectId), eq(siteProjects.userId, user.userId))).limit(1);
  if (!project) return { error: reply('project_unavailable', 404) };
  return { projectId, userId: user.userId };
}

export async function GET(_request: Request, context: Context) {
  const ownership = await ownedProject(context);
  if (ownership.error) return ownership.error;
  try {
    return Response.json(await currentCopilotConsent(ownership.projectId!, ownership.userId!), { headers });
  } catch { return reply('copilot_unavailable', 503); }
}

export async function POST(request: Request, context: Context) {
  if (request.headers.get('origin') !== new URL(request.url).origin
    || request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return reply('invalid_origin', 403);
  const ownership = await ownedProject(context);
  if (ownership.error) return ownership.error;
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply('invalid_input', 400);
    const decoder = new TextDecoder('utf-8', { fatal: true });
    let size = 0;
    let raw = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 1024) { await reader.cancel(); return reply('input_too_large', 413); }
      raw += decoder.decode(value, { stream: true });
    }
    body = JSON.parse(raw + decoder.decode());
  } catch { return reply('invalid_input', 400); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return reply('invalid_input', 400);
  const { action, consentVersion, idempotencyKey } = body as Record<string, unknown>;
  if ((action !== 'grant' && action !== 'revoke') || consentVersion !== COPILOT_CONSENT_VERSION
    || typeof idempotencyKey !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(idempotencyKey)) return reply('invalid_input', 400);
  try {
    const db = getDb();
    const [existing] = await db.select({ action: copilotConsentEvents.action, userId: copilotConsentEvents.userId })
      .from(copilotConsentEvents).where(and(eq(copilotConsentEvents.projectId, ownership.projectId!), eq(copilotConsentEvents.idempotencyKey, idempotencyKey))).limit(1);
    if (existing && (existing.action !== action || existing.userId !== ownership.userId)) return reply('idempotency_conflict', 409);
    if (!existing) await db.insert(copilotConsentEvents).values({
      projectId: ownership.projectId!, userId: ownership.userId!, action,
      consentVersion, idempotencyKey, createdAt: new Date().toISOString(),
    }).onConflictDoNothing();
    const [recorded] = await db.select({ action: copilotConsentEvents.action, userId: copilotConsentEvents.userId })
      .from(copilotConsentEvents).where(and(eq(copilotConsentEvents.projectId, ownership.projectId!), eq(copilotConsentEvents.idempotencyKey, idempotencyKey))).limit(1);
    if (!recorded || recorded.action !== action || recorded.userId !== ownership.userId) return reply('idempotency_conflict', 409);
    return Response.json(await currentCopilotConsent(ownership.projectId!, ownership.userId!), { headers });
  } catch { return reply('copilot_unavailable', 503); }
}
