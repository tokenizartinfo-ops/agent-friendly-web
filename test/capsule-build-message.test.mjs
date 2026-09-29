import test from 'node:test';
import assert from 'node:assert/strict';
import { capsuleBuildMessage } from '../lib/capsule-build-message.mjs';

test('empty resource selection explains the next step in all supported languages', () => {
  const error = new Error('Capsule has no generable resources');
  assert.match(capsuleBuildMessage(error, 'es'), /Selecciona.*guarda.*llms\.txt/);
  assert.match(capsuleBuildMessage(error, 'en'), /Select.*save.*llms\.txt/);
  assert.match(capsuleBuildMessage(error, 'pt'), /Selecione.*salve.*llms\.txt/);
});

test('existing actionable server messages are retained and unknown values use a fallback', () => {
  assert.equal(capsuleBuildMessage(new Error('Primero debes verificar el dominio del expediente.'), 'es'), 'Primero debes verificar el dominio del expediente.');
  assert.equal(capsuleBuildMessage(null, 'en'), 'The capsule could not be prepared.');
});
