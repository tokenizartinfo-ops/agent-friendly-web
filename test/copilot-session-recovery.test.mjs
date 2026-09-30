import test from 'node:test';
import assert from 'node:assert/strict';
import { visibleSessionResult } from '../lib/copilot-session.mjs';

test('applying a proposal locally does not lose it if the dossier save failed before reload', () => {
  const session = { decisions: [{ field: 'cms', choice: 'applied_to_draft' }], pending: { suggestions: [{ field: 'cms', value: 'Drupal', sourceExcerpt: 'Drupal' }], goalGuidance: null } };
  assert.equal(visibleSessionResult(session, { cms: '' }).suggestions.length, 1);
  assert.equal(visibleSessionResult(session, { cms: 'Drupal' }), null);
  assert.equal(visibleSessionResult({ ...session, decisions: [{ field: 'cms', choice: 'discarded' }] }, { cms: '' }), null);
});

test('an applied goal is recovered until its category exists in the dossier', () => {
  const session = { decisions: [{ field: 'goals', choice: 'applied_to_draft' }], pending: { suggestions: [], goalGuidance: { mode: 'query', sourceExcerpt: 'consultar catálogo' } } };
  assert.equal(visibleSessionResult(session, { goals: [] }).goalGuidance.mode, 'query');
  assert.equal(visibleSessionResult(session, { goals: ['tools'] }), null);
});

test('an empty inference remains distinguishable from consumed proposals', () => {
  const empty = { decisions: [], pending: { suggestions: [], goalGuidance: null } };
  assert.deepEqual(visibleSessionResult(empty), { ...empty.pending, blocked: false });
  const partial = { decisions: [{ field: 'cms', choice: 'discarded' }], pending: { suggestions: [{ field: 'cms', value: 'Drupal' }, { field: 'hosting', value: 'Cloudflare' }], goalGuidance: null } };
  assert.equal(visibleSessionResult(partial).suggestions[0].field, 'hosting');
});
