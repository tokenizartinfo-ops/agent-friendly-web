import { validateCopilotInput } from './intake-copilot.mjs';

const allowedTypes = new Set(['audio/webm', 'audio/mp4', 'audio/ogg']);
export const MAX_VOICE_BYTES = 2_000_000;

export function validateVoiceUpload(contentType, bytes) {
  const mediaType = typeof contentType === 'string' ? contentType.split(';')[0].trim().toLowerCase() : '';
  return { ok: allowedTypes.has(mediaType) && Number.isSafeInteger(bytes) && bytes > 0 && bytes <= MAX_VOICE_BYTES };
}

export function reviewVoiceTranscript(raw, locale) {
  const text = typeof raw?.text === 'string' ? raw.text.trim() : '';
  if (!text) return { ok: false, code: 'empty_transcript' };
  if (text.length > 5000) return { ok: false, code: 'transcript_too_large' };
  const checked = validateCopilotInput({ notes: text, locale });
  if (!checked.ok) return { ok: false, code: checked.code };
  return { contract: 'intake-copilot-audio.v1', text, persistence: 'none', autonomousWrite: false };
}

export function appendVoiceSegment(current, segment) {
  if (typeof current !== 'string' || typeof segment !== 'string') return null;
  const combined = [current.trim(), segment.trim()].filter(Boolean).join('\n');
  return combined.length <= 5000 ? combined : null;
}
