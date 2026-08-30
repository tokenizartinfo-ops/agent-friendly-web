import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('capsule review exposes progressive read-only comparison and an unsubmitted technical draft', async () => {
  const source = await readFile('app/components/capsule-review.tsx', 'utf8');
  for (const label of [
    'Comparar con el sitio actual',
    'Revisar diferencias',
    'Preparar borrador tecnico',
    'No enviado',
    'Descargar comparacion',
    'Descargar borrador tecnico',
    'Solo lee archivos publicos',
  ]) assert.match(source, new RegExp(label, 'i'));

  assert.match(source, /origin-comparison-request\.v1/);
  assert.match(source, /draft-pr-plan-request\.v1/);
  assert.match(source, /comparison\.resources\.map/);
  assert.match(source, /change\.type/);
  assert.match(source, /manifestSha256/);
  assert.match(source, /pathMappings/);
  assert.doesNotMatch(source, />\s*(?:Publicar|Crear PR)\s*</i);
  assert.doesNotMatch(source, /password|apiKey|Authorization/);
});

test('Block 5B styles define stable diff and form layouts for desktop and mobile', async () => {
  const css = await readFile('app/globals.css', 'utf8');
  assert.match(css, /\.capsule-comparison/);
  assert.match(css, /\.capsule-diff-line/);
  assert.match(css, /\.draft-plan-form/);
  assert.match(css, /@media[^]*\.draft-plan-form/s);
});
