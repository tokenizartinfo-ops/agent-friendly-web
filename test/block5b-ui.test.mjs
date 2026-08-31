import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { PRIVATE_UI_COPY } from '../lib/private-ui-copy.mjs';

test('capsule review exposes progressive read-only comparison and an unsubmitted technical draft', async () => {
  const source = await readFile('app/components/capsule-review.tsx', 'utf8');
  for (const locale of ['es', 'en', 'pt']) {
    const copy = PRIVATE_UI_COPY[locale].capsule;
    for (const label of ['compare', 'differences', 'draftTitle', 'notSent', 'downloadComparison', 'downloadDraft', 'compareBody']) assert.ok(copy[label]);
  }
  assert.match(source, /copy\.compare/);

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
