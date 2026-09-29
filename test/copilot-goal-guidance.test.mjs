import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { reviewCopilotOutput } from '../lib/intake-copilot.mjs';

test('copilot carries a quoted discovery goal as provisional guidance', () => {
  const notes = 'Queremos que visitantes encuentren horarios y preguntas frecuentes. No queremos pagos.';
  const reviewed = reviewCopilotOutput({ suggestions: [], goalEvidence: {
    mode: 'discover', sourceExcerpt: 'visitantes encuentren horarios y preguntas frecuentes',
  } }, notes);
  assert.deepEqual(reviewed.goalGuidance, {
    mode: 'discover', sourceExcerpt: 'visitantes encuentren horarios y preguntas frecuentes',
  });
  assert.equal(reviewed.autonomousWrite, false);
});

test('copilot discards invented, negated or unsupported advanced goals', () => {
  const negative = 'Queremos explicar el catálogo. No queremos pagos ni acciones delegadas.';
  for (const goalEvidence of [
    { mode: 'transact', sourceExcerpt: 'pagos' },
    { mode: 'act', sourceExcerpt: 'acciones delegadas' },
    { mode: 'query', sourceExcerpt: 'MCP' },
    { mode: 'discover', sourceExcerpt: 'un objetivo inventado' },
  ]) {
    assert.equal(reviewCopilotOutput({ suggestions: [], goalEvidence }, negative).goalGuidance, null);
  }
});

test('copilot requires a concrete positive action or transaction to explore advanced horizons', () => {
  const notes = 'Queremos reservar turnos con autorización. Más adelante queremos que visitantes paguen entradas.';
  assert.equal(reviewCopilotOutput({ suggestions: [], goalEvidence: { mode: 'act', sourceExcerpt: 'reservar turnos con autorización' } }, notes).goalGuidance.mode, 'act');
  assert.equal(reviewCopilotOutput({ suggestions: [], goalEvidence: { mode: 'transact', sourceExcerpt: 'visitantes paguen entradas' } }, notes).goalGuidance.mode, 'transact');
});

test('provider requests optional quoted goal evidence and the UI presents a question without applying it', async () => {
  const provider = await readFile('lib/intake-copilot-provider.mjs', 'utf8');
  const ui = await readFile('app/components/intake-intelligent-copilot.tsx', 'utf8');
  assert.match(provider, /goalEvidence/);
  assert.match(ui, /result\.goalGuidance/);
  assert.match(ui, /goalGuidanceCopy\[locale\]/);
});
