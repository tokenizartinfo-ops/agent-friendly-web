import { env } from 'cloudflare:workers';
import { and, eq } from 'drizzle-orm';
import { getCloudflareAccessUser } from '../../../../cloudflare-access-auth';
import { getDb } from '../../../../../db';
import { siteProjects, copilotWorkingDrafts } from '../../../../../db/schema';
import { reviewCopilotOutput, validateCopilotInput } from '../../../../../lib/intake-copilot.mjs';
import { requestIntakeSuggestions } from '../../../../../lib/intake-copilot-provider.mjs';
import { isCopilotProjectAllowed } from '../../../../../lib/copilot-rollout.mjs';
import { currentCopilotConsent } from '../../../../../lib/copilot-consent';
import { buildCopilotContext } from '../../../../../lib/copilot-context.mjs';

type Context = { params: Promise<{ projectId: string }> };
const headers = { 'cache-control': 'no-store' };
const reply = (code: string, status: number) => Response.json({ code }, { status, headers });

export async function POST(request: Request, context: Context) {
  const user = await getCloudflareAccessUser();
  if (!user) return reply('authentication_required', 401);
  if (String(env.AFW_COPILOT_ENABLED) !== 'true') return reply('copilot_unavailable', 503);
  if (request.headers.get('origin') !== new URL(request.url).origin
    || request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return reply('invalid_origin', 403);
  const { projectId } = await context.params;
  if (!env.AFW_COPILOT_PROJECT_ID) return reply('copilot_unavailable', 503);
  if (!isCopilotProjectAllowed({ enabled: true, allowedProjectId: env.AFW_COPILOT_PROJECT_ID, projectId })) return reply('project_unavailable', 404);
  const [project] = await getDb().select({ id: siteProjects.id, revision: siteProjects.revision, organization: siteProjects.organization, website: siteProjects.website, audience: siteProjects.audience, cms: siteProjects.cms, hosting: siteProjects.hosting, control: siteProjects.control, goalsJson: siteProjects.goalsJson }).from(siteProjects)
    .where(and(eq(siteProjects.id, projectId), eq(siteProjects.userId, user.userId))).limit(1);
  if (!project) return reply('project_unavailable', 404);

  let raw = '';
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply('invalid_input', 400);
    const decoder = new TextDecoder('utf-8', { fatal: true });
    let byteCount = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      byteCount += value.byteLength;
      if (byteCount > 12000) { await reader.cancel(); return reply('input_too_large', 413); }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    let parsed: unknown;
    try { parsed = JSON.parse(raw); } catch { return reply('invalid_input', 400); }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)
      || (parsed as Record<string, unknown>).processingConsentVersion !== 'afw-copilot-processing-v1') {
      return reply('processing_consent_required', 400);
    }
    const input = validateCopilotInput(parsed);
    if (!input.ok) return reply(input.code || 'invalid_input', 400);
    const consent = await currentCopilotConsent(projectId, user.userId);
    if (!consent.granted) return reply('project_consent_required', 403);
    const { success } = await env.COPILOT_RATE_LIMIT.limit({ key: user.userId });
    if (!success) return Response.json({ code: 'copilot_rate_limited' }, { status: 429, headers: { ...headers, 'retry-after': '60' } });
    const [working] = await getDb().select({ text: copilotWorkingDrafts.text, sessionJson: copilotWorkingDrafts.sessionJson }).from(copilotWorkingDrafts)
      .where(and(eq(copilotWorkingDrafts.projectId, projectId), eq(copilotWorkingDrafts.userId, user.userId))).limit(1);
    const payload = await requestIntakeSuggestions(env.AI, input.notes, input.locale, buildCopilotContext(project, working));
    const reviewed = reviewCopilotOutput(payload, input.notes, input.locale);
    return Response.json(reviewed, { headers });
  } catch {
    return reply('copilot_unavailable', 503);
  }
}
