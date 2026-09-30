import test from 'node:test';
import assert from 'node:assert/strict';
import { visibleSessionResult } from '../lib/copilot-session.mjs';

test('applying a proposal locally does not lose it if the dossier save failed before reload', () => {
  const session = { decisions: [{ field: 'cms', choice: 'applied_to_draft' }], pending: { suggestions: [{ field: 'cms', value: 'Drupal', sourceExcerpt: 'Drupal' }], goalGuidance: null } };
  assert.equal(visibleSessionResult(session, { cms: '' }).suggestions.length, 1);
  assert.equal(visibleSessionResult(session, { cms: 'Drupal' }).suggestions.length, 0);
  assert.equal(visibleSessionResult({ ...session, decisions: [{ field: 'cms', choice: 'discarded' }] }, { cms: '' }).suggestions.length, 0);
});

test('an applied goal is recovered until its category exists in the dossier', () => {
  const session = { decisions: [{ field: 'goals', choice: 'applied_to_draft' }], pending: { suggestions: [], goalGuidance: { mode: 'query', sourceExcerpt: 'consultar catálogo' } } };
  assert.equal(visibleSessionResult(session, { goals: [] }).goalGuidance.mode, 'query');
  assert.equal(visibleSessionResult(session, { goals: ['tools'] }).goalGuidance, null);
});
