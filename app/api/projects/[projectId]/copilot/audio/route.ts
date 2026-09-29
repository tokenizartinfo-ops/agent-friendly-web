import { env } from 'cloudflare:workers';
import { and, eq } from 'drizzle-orm';
import { getCloudflareAccessUser } from '../../../../../cloudflare-access-auth';
import { getDb } from '../../../../../../db';
import { siteProjects } from '../../../../../../db/schema';
import { currentCopilotConsent } from '../../../../../../lib/copilot-consent';
import { isCopilotProjectAllowed } from '../../../../../../lib/copilot-rollout.mjs';
import { MAX_VOICE_BYTES, reviewVoiceTranscript, validateVoiceUpload } from '../../../../../../lib/intake-copilot-audio.mjs';

type Context = { params: Promise<{ projectId: string }> };
const headers = { 'cache-control': 'no-store' };
const reply = (code: string, status: number) => Response.json({ code }, { status, headers });

export async function POST(request: Request, context: Context) {
  const user = await getCloudflareAccessUser();
  if (!user) return reply('authentication_required', 401);
  if (String(env.AFW_COPILOT_ENABLED) !== 'true' || !env.AFW_COPILOT_PROJECT_ID) return reply('copilot_unavailable', 503);
  if (request.headers.get('origin') !== new URL(request.url).origin) return reply('invalid_origin', 403);
  const { projectId } = await context.params;
  if (!isCopilotProjectAllowed({ enabled: true, allowedProjectId: env.AFW_COPILOT_PROJECT_ID, projectId })) return reply('project_unavailable', 404);
  const [project] = await getDb().select({ id: siteProjects.id }).from(siteProjects)
    .where(and(eq(siteProjects.id, projectId), eq(siteProjects.userId, user.userId))).limit(1);
  if (!project) return reply('project_unavailable', 404);
  if (request.headers.get('x-afw-processing-consent') !== 'afw-copilot-processing-v1') return reply('processing_consent_required', 400);
  const locale = request.headers.get('x-afw-locale');
  if (!['es', 'en', 'pt'].includes(locale || '')) return reply('invalid_input', 400);
  const contentType = request.headers.get('content-type');
  const declaredBytes = Number(request.headers.get('content-length'));
  if (Number.isSafeInteger(declaredBytes) && declaredBytes > MAX_VOICE_BYTES) return reply('input_too_large', 413);
  if (!validateVoiceUpload(contentType, Number.isSafeInteger(declaredBytes) && declaredBytes > 0 ? declaredBytes : 1).ok) return reply('invalid_audio', 400);
  try {
    const consent = await currentCopilotConsent(projectId, user.userId);
    if (!consent.granted) return reply('project_consent_required', 403);
    const { success } = await env.COPILOT_RATE_LIMIT.limit({ key: user.userId });
    if (!success) return Response.json({ code: 'copilot_rate_limited' }, { status: 429, headers: { ...headers, 'retry-after': '60' } });
    const reader = request.body?.getReader();
    if (!reader) return reply('invalid_audio', 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_VOICE_BYTES) { await reader.cancel(); return reply('input_too_large', 413); }
      chunks.push(value);
    }
    if (!validateVoiceUpload(contentType, size).ok) return reply('invalid_audio', 400);
    const binary = chunks.map(chunk => Array.from(chunk, byte => String.fromCharCode(byte)).join('')).join('');
    const transcript = await env.AI.run('@cf/openai/whisper-large-v3-turbo', {
      audio: btoa(binary), task: 'transcribe', vad_filter: true,
    });
    const reviewed = reviewVoiceTranscript(transcript, locale);
    if ('code' in reviewed && typeof reviewed.code === 'string') return reply(reviewed.code, 422);
    return Response.json(reviewed, { headers });
  } catch {
    return reply('copilot_unavailable', 503);
  }
}
