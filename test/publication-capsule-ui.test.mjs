import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('owner expediente exposes explicit capsule preparation without remote publication', async () => {
  const source = await readFile('app/components/intake-workspace.tsx', 'utf8');

  assert.match(source, /CapsuleReview/);
  assert.match(source, /projectId=\{projectId\}/);
  assert.match(source, /expectedDomain=\{hostname\}/);
});

test('capsule review shows exact files, hashes, download and separate human decisions', async () => {
  const source = await readFile('app/components/capsule-review.tsx', 'utf8');

  for (const label of [
    'Capsula de implementacion',
    'Preparar vista previa',
    'Descargar paquete JSON',
    'Aprobacion del owner',
    'Aprobacion del mantenedor',
    'Aprobar esta version',
    'Rechazar esta version',
    'No modifica el sitio',
  ]) {
    assert.match(source, new RegExp(label));
  }
  assert.match(source, /file\.sha256\.slice/);
  assert.match(source, /file\.operation/);
  assert.match(source, /deployment-capsules/);
  assert.match(source, /agentfriendly\.publication-capsule-build\.v1/);
  assert.match(source, /agentfriendly\.capsule-decision\.v1/);
  assert.doesNotMatch(source, /password|apiKey|Authorization/);
});

test('private capsule page requires identity and reveals only the capsule review surface', async () => {
  const source = await readFile('app/capsula/[projectId]/page.tsx', 'utf8');

  assert.match(source, /requireChatGPTUser/);
  assert.match(source, /CapsuleReview/);
  assert.doesNotMatch(source, /IntakeWorkspace/);
});
