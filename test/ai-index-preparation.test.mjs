import assert from 'node:assert/strict';
import test from 'node:test';
import { buildAiIndexPreparation } from '../lib/ai-index-preparation.mjs';

const website = 'https://taller.example/servicios';
const now = Date.parse('2026-11-23T15:00:00Z');
const checkedAt = '2026-11-23T14:00:00Z';
const current = {
  target: 'https://taller.example/', checkedAt,
  evidence: { sources: true, ownership: false, directAnswers: true },
};

test('shows declared sources and dated evidence for exactly the saved domain', () => {
  const sheet = buildAiIndexPreparation({
    website, contentSources: ['services', 'faq', 'services', 'unknown'], observation: current, readState: 'ready', now,
  });
  assert.equal(sheet.origin, 'https://taller.example');
  assert.deepEqual(sheet.declaredSources, ['services', 'faq']);
  assert.equal(sheet.observedAt, checkedAt);
  assert.deepEqual(sheet.signals, {
    directAnswers: 'detected', structuredData: 'unverified', sources: 'detected', ownership: 'not_detected',
  });
  assert.equal(sheet.contentReview, 'pending');
  assert.equal(sheet.sharingDecision, 'not_recorded');
  assert.equal(sheet.indexStatus, 'unverified');
});

test('unknown, failed, mismatched and future evidence never appears as a current source', () => {
  for (const [observation, readState] of [
    [current, 'loading'], [current, 'failed'], [null, 'ready'],
    [{ ...current, target: 'https://otro.example' }, 'ready'],
    [{ ...current, target: 'http://taller.example' }, 'ready'],
    [{ ...current, checkedAt: '2026-11-23T16:00:00Z' }, 'ready'],
    [{ ...current, checkedAt: 'unreadable' }, 'ready'],
    [{ ...current, checkedAt: '2026-02-30T00:00:00Z' }, 'ready'],
    [{ ...current, checkedAt: '2026-11-22' }, 'ready'],
  ]) {
    const sheet = buildAiIndexPreparation({ website, observation, readState, now });
    assert.equal(sheet.observedAt, null);
    assert.ok(Object.values(sheet.signals).every(state => state === 'unverified'));
    assert.equal(sheet.sharingDecision, 'not_recorded');
  }
});

test('the sheet ignores private text and apparent provider permissions', () => {
  const sheet = buildAiIndexPreparation({
    website, contentSources: ['PRIVATE_TOKEN', 'catalog'],
    observation: { ...current, notes: 'PRIVATE_MARKER', sharingDecision: 'granted', indexStatus: 'indexed' },
    readState: 'ready', now,
  });
  assert.deepEqual(sheet.declaredSources, ['catalog']);
  assert.equal(JSON.stringify(sheet).includes('PRIVATE_'), false);
  assert.equal(sheet.indexStatus, 'unverified');
  assert.equal(sheet.sharingDecision, 'not_recorded');
  assert.equal(buildAiIndexPreparation({ website: 'https://user:password@taller.example', now }), null);
});
