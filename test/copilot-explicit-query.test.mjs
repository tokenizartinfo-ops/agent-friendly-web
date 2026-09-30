import test from 'node:test';
import assert from 'node:assert/strict';
import { reviewCopilotOutput } from '../lib/intake-copilot.mjs';

test('an omitted model goal still offers the exact explicit API query intent for review', () => {
  const sentence = 'Queremos que los agentes puedan consultar nuestro catálogo mediante una API';
  const result = reviewCopilotOutput({ suggestions: [] }, `Somos una empresa de servicios profesionales. ${sentence}. No queremos pagos ni compras. Caso sintético de prueba AFW.`);
  assert.deepEqual(result.goalGuidance, { mode: 'query', sourceExcerpt: sentence });
  assert.deepEqual(result.suggestions, []);
  assert.equal(result.autonomousWrite, false);
});

test('explicit query fallback does not treat negation, future, hypotheticals or several intentions as agreed scope', () => {
  for (const text of [
    'No queremos consultar una API.',
    'Tal vez queremos consultar una API más adelante.',
    'Queremos consultar una API en el futuro.',
    'Queremos consultar una API el próximo año.',
    'We want to query an API next year.',
    'Queremos consultar una API o quizá contratar otro servicio.',
    'Si fuera necesario, queremos consultar una API.',
    'Queremos consultar una API. Queremos leer un MCP.',
    'Nuestro sitio tiene una API de consultas.',
    'Queremos conocer qué es una API.',
  ]) assert.equal(reviewCopilotOutput({ suggestions: [] }, text).goalGuidance, null, text);
});

test('bounded explicit query phrasing is supported in English and Portuguese', () => {
  for (const text of ['We want agents to query our catalog using an API', 'Queremos que os agentes possam consultar nosso catálogo via uma API']) {
    assert.deepEqual(reviewCopilotOutput({ suggestions: [] }, text).goalGuidance, { mode: 'query', sourceExcerpt: text });
  }
});

test('explicit API goal evidence is bounded and does not replace invalid model evidence', () => {
  const text = 'Queremos consultar una API';
  assert.equal(reviewCopilotOutput({ suggestions: [], goalEvidence: { mode: 'transact', sourceExcerpt: text } }, text).goalGuidance, null);
  assert.equal(reviewCopilotOutput({ suggestions: [] }, `${text} ${'detalle '.repeat(30)}`).goalGuidance, null);
});
