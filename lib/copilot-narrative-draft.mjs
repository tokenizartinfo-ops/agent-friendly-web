import { analyzeIntakeNotes } from './intake-assistant.mjs';
import { previewIntakeDraft } from './intake-draft-review.mjs';

/** The owner's own words remain private draft data and require review plus a separate save. */
export function previewCopilotNarrative(draft = {}, account = '', locale = 'es') {
  if (typeof account !== 'string' || typeof draft.notes !== 'string' && draft.notes != null) throw new Error('invalid');
  const text = account.trim();
  if (!text) throw new Error('empty');
  if (account.length > 5000) throw new Error('too_long');
  if (analyzeIntakeNotes(text, locale).blocked) throw new Error('sensitive');
  const current = String(draft.notes || '').trim();
  if (current.includes(text)) return [];
  const combined = [current, text].filter(Boolean).join('\n\n');
  if (combined.length > 5000) throw new Error('too_long');
  return previewIntakeDraft(draft, { blocked: false, suggestions: [{ field: 'notes', value: combined }] }, ['notes']);
}
