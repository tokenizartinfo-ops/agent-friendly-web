import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { PRIVATE_UI_COPY } from '../lib/private-ui-copy.mjs';

test('connector laboratory copy is complete in Spanish, English and Portuguese', () => {
  const required = [
    'eyebrow', 'title', 'body', 'localOnly', 'canary', 'prepare', 'dryRun', 'apply', 'rollback',
    'confirmApply', 'confirmRollback', 'idle', 'ready', 'dryReady', 'applied', 'rolledBack', 'steps',
  ];
  for (const locale of ['es', 'en', 'pt']) {
    const copy = PRIVATE_UI_COPY[locale].capsule.connector;
    for (const key of required) assert.ok(copy[key], `${locale}.${key}`);
    assert.equal(copy.steps.length, 4);
  }
});

test('comic connector laboratory executes only the in-browser ephemeral adapter', async () => {
  const source = await readFile('app/components/connector-sandbox.tsx', 'utf8');

  assert.match(source, /prepareControlledConnectorRun/);
  assert.match(source, /createEphemeralConnector/);
  assert.match(source, /\.dryRun\(/);
  assert.match(source, /\.applyCanary\(/);
  assert.match(source, /\.rollback\(/);
  assert.match(source, /type="checkbox"/);
  assert.match(source, /remoteMutation/);
  assert.doesNotMatch(source, /fetch\(|localStorage|sessionStorage|indexedDB|password|apiKey|Authorization/);
});

test('capsule review reveals the laboratory only after a complete comparison and prepared plan', async () => {
  const source = await readFile('app/components/capsule-review.tsx', 'utf8');

  assert.match(source, /ConnectorSandbox/);
  assert.match(source, /comparison\?\.status === 'complete' && draftPlan/);
  assert.match(source, /capsule=\{capsule\}/);
  assert.match(source, /comparison=\{comparison\}/);
  assert.match(source, /plan=\{draftPlan\}/);
});

test('connector laboratory has stable comic desktop and mobile styling', async () => {
  const css = await readFile('app/globals.css', 'utf8');
  assert.match(css, /\.connector-lab/);
  assert.match(css, /\.connector-lab-steps/);
  assert.match(css, /\.connector-lab-receipt/);
  assert.match(css, /@media[^]*\.connector-lab-steps/s);
});
