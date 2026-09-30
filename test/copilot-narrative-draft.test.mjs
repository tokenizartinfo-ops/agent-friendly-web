import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { previewCopilotNarrative } from '../lib/copilot-narrative-draft.mjs';
import { applyIntakeDraft } from '../lib/intake-draft-review.mjs';
import { normalizeIntake } from '../lib/intake.mjs';

test('a reviewed voice or text account can be added without replacing existing private notes', () => {
  const draft = { notes: 'Primer contexto.' };
  const changes = previewCopilotNarrative(draft, 'Segundo segmento.');
  assert.deepEqual(changes, [{ field: 'notes', before: 'Primer contexto.', after: 'Primer contexto.\n\nSegundo segmento.' }]);
  assert.equal(applyIntakeDraft(draft, changes).notes, 'Primer contexto.\n\nSegundo segmento.');
  assert.equal(draft.notes, 'Primer contexto.');
  assert.throws(() => applyIntakeDraft({ notes: 'Otro cambio' }, changes), /stale_preview/);
});

test('duplicate, sensitive and oversized accounts fail closed', () => {
  assert.deepEqual(previewCopilotNarrative({ notes: 'Ya contado.' }, 'Ya contado.'), []);
  assert.throws(() => previewCopilotNarrative({}, 'Mi password es abc123'), /sensitive/);
  assert.throws(() => previewCopilotNarrative({ notes: 'a'.repeat(4000) }, 'b'.repeat(1500)), /too_long/);
  assert.throws(() => previewCopilotNarrative({}, '   '), /empty/);
});

test('private dossier normalization retains reviewed paragraph breaks up to 5000 characters', () => {
  const account = 'Primer segmento.\n\nSegundo segmento.';
  assert.equal(normalizeIntake({ notes: account }).notes, account);
  assert.equal(normalizeIntake({ notes: 'x'.repeat(5100) }).notes.length, 5000);
});

test('copilot offers a separate review before applying the account to the draft', async () => {
  const ui = await readFile('app/components/intake-intelligent-copilot.tsx', 'utf8');
  assert.match(ui, /previewCopilotNarrative\(draft, notes, locale\)/);
  assert.match(ui, /applyIntakeDraft\(draft, narrativeChanges\)/);
});

test('reviewed copilot changes resume project autosave and navigation waits for an acknowledged save', async () => {
  const workspace = await readFile('app/components/intake-workspace.tsx', 'utf8');
  const dialog = await readFile('app/components/draft-exit-dialog.tsx', 'utf8');
  assert.match(workspace, /<IntakeIntelligentCopilot[\s\S]*?setAutosavePaused\(false\); setData\(intakeFromProject\(next\)\)/);
  assert.match(workspace, /if \(workingPending && !\(await workingSave\.current\?\.\(\)\)\) return false/);
  assert.match(workspace, /const saved = hasPendingDraft[\s\S]*?await saveReviewedDraft\(\) : true/);
  assert.match(workspace, /if \(saved\) \{ exitCleanup\.current\?\.\(\); workingExit\.current\?\.\(\); window\.location\.assign\(exitTarget\); \}/);
  assert.match(dialog, /if \(!await onSaveLeave\(\)\) setFailed\(true\)/);
  assert.match(dialog, /Salir sin guardar/);
});
