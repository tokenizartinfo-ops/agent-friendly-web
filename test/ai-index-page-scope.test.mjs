import assert from 'node:assert/strict';
import test from 'node:test';
import { prepareAiIndexPageScope } from '../lib/ai-index-page-scope.mjs';

const website = 'https://taller.example/servicios';
const now = Date.parse('2026-11-23T16:20:00Z');
const prepare = (include = '', exclude = '') => prepareAiIndexPageScope({ website, include, exclude, now });

test('exports only explicitly entered pages for the saved origin', () => {
  const result = prepare(' /servicios \nhttps://taller.example/contacto\n/servicios\r\n', '/prensa');
  assert.deepEqual(result, { status: 'ready', draft: {
    contract: 'afw.ai-index-page-scope.v1',
    origin: 'https://taller.example',
    preparedAt: '2026-11-23T16:20:00.000Z',
    includeForReview: ['/servicios', '/contacto'],
    excludeFromProposal: ['/prensa'],
    status: 'draft',
  } });
});

test('keeps an explicit exclusion and rejects an empty or contradictory decision', () => {
  assert.deepEqual(prepare('', '/archivo').draft.includeForReview, []);
  assert.equal(prepare().code, 'empty');
  assert.equal(prepare('/servicios', 'https://taller.example/servicios').code, 'conflict');
  assert.equal(prepare('/servicios', '/%73ervicios').code, 'conflict');
  assert.equal(prepare('/gu%C3%ADa', '/gu%c3%ada').code, 'conflict');
});

test('rejects foreign, wrong-scheme, wildcard and ambiguous routes without returning their values', () => {
  for (const url of [
    '//other.example/secret', 'https://other.example/secret', 'https://taller.example//other.example/secret',
    'http://taller.example/secret', 'https://user:secret@taller.example/',
    '/secret?marker=1', '/secret#section', '/secret/*',
    '/secret\\alt', '/secret\u0000', '/secret/../public', '/%2e%2e/public', 'private',
  ]) {
    assert.deepEqual(prepare(url), {status: 'invalid', code: 'page'});
  }
});

test('preserves valid exact paths and enforces bounds on the proposed list', () => {
  assert.deepEqual(prepare('/\n/Servicios/\n/gu%C3%ADa').draft.includeForReview, ['/', '/Servicios/', '/gu%C3%ADa']);
  assert.equal(prepare('x'.repeat(4001)).code, 'length');
  assert.equal(prepare(Array.from({length: 51}, (_, i) => '/' + i).join('\n')).code, 'length');
  assert.equal(prepareAiIndexPageScope({ website: '', include: '/', now }).code, 'origin');
});

