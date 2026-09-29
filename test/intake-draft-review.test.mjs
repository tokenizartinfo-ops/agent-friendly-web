import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { analyzeIntakeNotes } from '../lib/intake-assistant.mjs';
import { previewIntakeDraft, applyIntakeDraft, planIntakeRebase, applyIntakeRebase, resolveIntakeRebase } from '../lib/intake-draft-review.mjs';

test('explicit conflict choices keep local or stored values without silently choosing', () => {
  const current = { organization: 'Remote', cms: 'WordPress' };
  const plan = planIntakeRebase({ organization: 'Base', cms: 'Drupal' }, { organization: 'Local', cms: 'Drupal' }, current, 2);
  assert.throws(() => resolveIntakeRebase(current, 2, plan, {}), /missing_choice/);
  assert.equal(resolveIntakeRebase(current, 2, plan, { organization: 'local' }).organization, 'Local');
  assert.deepEqual(resolveIntakeRebase(current, 2, plan, { organization: 'current' }), current);
  assert.throws(() => resolveIntakeRebase(current, 3, plan, { organization: 'local' }), /stale_revision/);
});

test('three-way review preserves newer unrelated fields and applies only local edits', () => {
  const base = { organization: 'Original', cms: 'Drupal', languages: ['es'] };
  const draft = { ...base, organization: 'Local' };
  const current = { ...base, cms: 'WordPress', languages: ['en'], role: 'owner' };
  const plan = planIntakeRebase(base, draft, current, 2);
  assert.deepEqual(plan.conflicts, []);
  assert.deepEqual(applyIntakeRebase(current, 2, plan), { ...current, organization: 'Local' });
  assert.equal(current.organization, 'Original');
});

test('different edits to the same field require a human decision and stale plans fail', () => {
  const plan = planIntakeRebase({ organization: 'Original' }, { organization: 'Local' }, { organization: 'Remote' }, 2);
  assert.deepEqual(plan.conflicts, [{ field: 'organization', base: 'Original', local: 'Local', current: 'Remote' }]);
  assert.throws(() => applyIntakeRebase({ organization: 'Remote' }, 2, plan), /unresolved_conflict/);
  const clean = planIntakeRebase({ cms: 'Drupal' }, { cms: 'WordPress' }, { cms: 'Drupal' }, 2);
  assert.throws(() => applyIntakeRebase({ cms: 'Drupal' }, 3, clean), /stale_revision/);
});

test('identical changes are not conflicts; permissions cannot be rebased by the assistant', () => {
  const plan = planIntakeRebase({ languages: ['es'] }, { languages: ['en'] }, { languages: ['en'] }, 2);
  assert.deepEqual(plan.changes, []);
  assert.deepEqual(plan.conflicts, []);
  assert.throws(() => planIntakeRebase({ role: 'owner' }, { role: 'admin' }, { role: 'owner' }, 2), /invalid_proposal/);
  assert.throws(() => planIntakeRebase({}, {}, {}, 0), /invalid_revision/);
});

test('selected proposals show replacements and preserve every unrelated field', () => {
  const draft = { organization: 'Original', website: 'https://old.example/', cms: 'Drupal', role: 'owner', notes: 'Keep this' };
  const result = analyzeIntakeNotes('Somos Restaurante. Nuestro sitio es new.example. Usamos WordPress.');
  const changes = previewIntakeDraft(draft, result, ['organization', 'cms']);
  assert.deepEqual(changes.map(c => [c.field, c.before, c.after]), [['organization', 'Original', 'Restaurante'], ['cms', 'Drupal', 'WordPress']]);
  assert.deepEqual(applyIntakeDraft(draft, changes), { ...draft, organization: 'Restaurante', cms: 'WordPress' });
  assert.equal(draft.organization, 'Original');
});

test('empty, blocked and unselected proposals cannot change a draft', () => {
  const draft = { website: 'https://keep.example/' };
  assert.deepEqual(previewIntakeDraft(draft, analyzeIntakeNotes(''), []), []);
  assert.deepEqual(previewIntakeDraft(draft, analyzeIntakeNotes('password: fake-example'), ['notes']), []);
  assert.deepEqual(applyIntakeDraft(draft, []), draft);
});

test('unknown fields, invalid shapes and stale previews fail closed', () => {
  assert.throws(() => applyIntakeDraft({}, [{ field: 'role', before: undefined, after: 'admin' }]), /invalid/);
  assert.throws(() => applyIntakeDraft({}, [{ field: 'languages', before: undefined, after: 'en' }]), /invalid/);
  assert.throws(() => applyIntakeDraft({ cms: 'Wix' }, [{ field: 'cms', before: 'Drupal', after: 'WordPress' }]), /stale/);
});

test('unchanged proposals are not presented as changes and lists are copied', () => {
  const result = analyzeIntakeNotes('Somos Restaurante. English.');
  const changes = previewIntakeDraft({ organization: 'Restaurante' }, result, ['organization', 'languages']);
  assert.equal(changes.length, 1);
  const applied = applyIntakeDraft({}, changes);
  applied.languages.push('es');
  assert.deepEqual(changes[0].after, ['en']);
});

test('reduced pilot excludes rehearsal route and assistant does not write directly', async () => {
  await assert.rejects(readFile('app/internal/intake-preview/page.tsx', 'utf8'), { code: 'ENOENT' });
  const component = await readFile('app/components/intake-assistant-prototype.tsx', 'utf8');
  assert.doesNotMatch(component, /fetch\(|localStorage|sessionStorage|\/api\/projects/);
  assert.match(component, /applyIntakeDraft\(draft, changes\)/);
});
