import assert from 'node:assert/strict';
import test from 'node:test';
import { analyzeIntakeNotes } from '../lib/intake-assistant.mjs';
import { respondToPublicGuide } from '../lib/public-guide.mjs';
import { publicToolsCopy } from '../lib/public-tools-copy.mjs';
import { faqEntries, matchPublicFaq } from '../lib/public-faq.mjs';

test('published intake example retains all three declared languages and their evidence', () => {
  const input = 'Somos Museo Sur. Nuestro sitio es museosur.org. Queremos que nos encuentren coleccionistas, investigadores y visitantes. La web usa WordPress y debe explicarse en español, inglés y portugués.';
  const languages = analyzeIntakeNotes(input).suggestions.find(s => s.field === 'languages');
  assert.deepEqual(languages?.value, ['es', 'en', 'pt']);
  for (const word of ['español', 'inglés', 'portugués']) assert.ok(languages.sourceExcerpt.includes(word));
});

test('language variants preserve declared values, avoid substrings and do not duplicate', () => {
  for (const word of ['portugués', 'português', 'portugues', 'Portuguese', 'portugués'.normalize('NFD')]) {
    const result = analyzeIntakeNotes('Idiomas: ' + word + ', ' + word);
    assert.deepEqual(result.suggestions.find(s => s.field === 'languages')?.value, ['pt'], word);
  }
  assert.equal(analyzeIntakeNotes('Somos Englishwood y Portuguesia.').suggestions.some(s => s.field === 'languages'), false);
  assert.equal(analyzeIntakeNotes('No declaramos idiomas.').suggestions.some(s => s.field === 'languages'), false);
});

test('novice multi-intent questions receive a concrete start and a scoped cost answer', () => {
  const cases = [
    ['es', 'Tengo una web de servicios técnicos. No entiendo MCP ni archivos. ¿Qué tendría que hacer primero y cuánto cuesta?', /diagnóstico público/i, /precio|costo/i],
    ['en', 'I have a services website. I do not understand MCP or files. What should I do first and how much does it cost?', /public (audit|diagnostic)|audit the public domain/i, /price|cost/i],
    ['pt', 'Tenho um site de serviços. Não entendo MCP nem arquivos. O que devo fazer primeiro e quanto custa?', /auditoria pública|diagnóstico público|auditar o domínio público/i, /preço|custo/i],
  ];
  for (const [locale, message, firstStep, cost] of cases) {
    const turn = respondToPublicGuide({ locale, message });
    assert.equal(turn.topic, 'getting_started', locale);
    assert.match(turn.answer, firstStep);
    assert.match(turn.answer, cost);
    assert.ok(turn.sources.some(s => s.id === 'audit'));
    assert.ok(turn.answer.length < 900);
    assert.equal(turn.blocked, false);
  }
});

test('novice routing never suppresses secret and action boundaries', () => {
  assert.equal(respondToPublicGuide({ message: 'No entiendo MCP. Mi API key es sk-test-123456789. ¿Qué hago primero y cuánto cuesta?' }).topic, 'security_block');
  assert.equal(respondToPublicGuide({ message: 'No entiendo MCP. Publica archivos en mi web y paga ahora.' }).topic, 'action_boundary');
});

test('all published locale examples preserve Spanish, English and Portuguese', () => {
  for (const locale of ['es', 'en', 'pt']) {
    const languages = analyzeIntakeNotes(publicToolsCopy(locale).intake.example).suggestions.find(s => s.field === 'languages');
    assert.deepEqual(languages?.value, ['es', 'en', 'pt'], locale);
  }
});
test('capability copy changes preserve pricing and verification help', () => {
  for (const locale of ['es', 'en', 'pt']) {
    const entries = faqEntries(locale);
    for (const id of ['pricing', 'external-verification', 'cli-mcp-status']) {
      assert.ok(entries.some(e => e.id === id), locale + ': ' + id);
    }
    assert.equal(matchPublicFaq('external verification', locale)?.id, 'external-verification');
  }
});
