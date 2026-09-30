import { analyzeIntakeNotes } from './intake-assistant.mjs';

export function validateCopilotWorkingDraft(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)
    || Object.keys(input).some(key => !['text', 'revision', 'mutationKey', 'locale'].includes(key))
    || typeof input.text !== 'string' || input.text.length > 5000
    || !Number.isSafeInteger(input.revision) || input.revision < 0
    || typeof input.mutationKey !== 'string' || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(input.mutationKey)
    || !['es', 'en', 'pt'].includes(input.locale)) return { ok: false, code: 'invalid_working_draft' };
  if (input.text.trim() && analyzeIntakeNotes(input.text, input.locale).blocked) return { ok: false, code: 'sensitive_working_draft' };
  return { ok: true, text: input.text, revision: input.revision, mutationKey: input.mutationKey };
}
