import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

import {
  INTAKE_ASSISTANT_ALLOWED_FIELDS,
  analyzeIntakeNotes,
} from '../lib/intake-assistant.mjs';

test('assistant orders rough context into field-scoped suggestions', () => {
  const result = analyzeIntakeNotes('Somos Museo Sur. Nuestro sitio es museosur.org. Queremos que nos encuentren coleccionistas y funcionar en espanol, ingles y portugues. Usamos WordPress.');

  assert.equal(result.blocked, false);
  assert.equal(result.persistence, 'none');
  assert.equal(result.autonomousWrite, false);
  assert.ok(result.suggestions.length >= 4);
  assert.ok(result.suggestions.every((item) => INTAKE_ASSISTANT_ALLOWED_FIELDS.includes(item.field)));
  assert.ok(result.suggestions.some((item) => item.field === 'organization' && item.value === 'Museo Sur'));
  assert.ok(result.suggestions.some((item) => item.field === 'website' && item.value === 'https://museosur.org/'));
  assert.ok(result.suggestions.some((item) => item.field === 'languages' && item.value.includes('es')));
});

test('assistant fails closed when notes contain likely credentials', () => {
  const result = analyzeIntakeNotes('Mi API key es sk-test-123456789 y la password del hosting es secreto.');

  assert.equal(result.blocked, true);
  assert.deepEqual(result.suggestions, []);
  assert.match(result.warning, /credenciales|secretos/i);
});

test('assistant does not expose autonomous persistence, voice, email or payments', async () => {
  const contractPath = 'public/.well-known/intake-assistant-contract.json';
  assert.equal(await stat(contractPath).then(() => true).catch(() => false), true);
  const contract = JSON.parse(await readFile(contractPath, 'utf8'));

  assert.equal(contract.persistence, 'none');
  assert.equal(contract.autonomousWrite, false);
  assert.equal(contract.capabilities.voiceInput, false);
  assert.equal(contract.capabilities.emailDispatch, false);
  assert.equal(contract.capabilities.paymentExecution, false);
  assert.deepEqual(contract.allowedFields, INTAKE_ASSISTANT_ALLOWED_FIELDS);
});

test('Block 3 prototype is public but does not call the project persistence API', async () => {
  const page = await readFile('app/asistente/page.tsx', 'utf8');
  const component = await readFile('app/components/intake-assistant-prototype.tsx', 'utf8');
  const localizedCopy = await readFile('lib/public-tools-copy.mjs', 'utf8');

  assert.match(page, /IntakeAssistantPrototype/);
  assert.doesNotMatch(component, /\/api\/projects/);
  assert.match(component, /copy\.review/);
  assert.match(component, /copy\.privacy/);
  assert.match(localizedCopy, /review: 'Revisar propuesta'/);
  assert.match(localizedCopy, /No se guarda/);
});
