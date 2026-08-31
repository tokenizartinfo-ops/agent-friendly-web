import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { CONTACT_COPY } from '../lib/contact-copy.mjs';

test('contact experience is complete in Spanish, English and Portuguese', () => {
  for (const locale of ['es', 'en', 'pt']) {
    const copy = CONTACT_COPY[locale];
    assert.ok(copy.title);
    assert.ok(copy.previewNotice);
    assert.ok(copy.consents.requestedPlan);
    assert.ok(copy.consents.commercial);
    assert.ok(copy.consents.updates);
  }
});

test('public contact contract declares preview-only behavior and separated consent', async () => {
  const contract = JSON.parse(await readFile('public/.well-known/contact-intake-contract.json', 'utf8'));
  assert.equal(contract.status, 'preview_only');
  assert.equal(contract.audit_requires_email, false);
  assert.equal(contract.persistence_enabled, false);
  assert.equal(contract.mailbox_status, 'planned_not_configured');
  assert.equal(contract.security.probable_secrets_rejected, true);
  assert.equal('secrets_accepted' in contract.security, false);
  assert.match(contract.documentation, /^https:\/\/github\.com\//);
  assert.deepEqual(contract.consent_purposes.required, ['requested_plan']);
  assert.deepEqual(contract.consent_purposes.optional, ['commercial_contact', 'product_updates']);
});

test('preview-only contact capability is discoverable without being advertised as active capture', async () => {
  const [readiness, catalog, llms] = await Promise.all([
    readFile('public/.well-known/agent-readiness.json', 'utf8').then(JSON.parse),
    readFile('public/.well-known/ai-catalog.json', 'utf8').then(JSON.parse),
    readFile('public/llms.txt', 'utf8'),
  ]);
  assert.equal(readiness.capabilities.consented_contact.status, 'prototype');
  assert.equal(readiness.capabilities.consented_contact.persistence, false);
  assert.ok(catalog.entries.some((entry) => entry.url.endsWith('/.well-known/contact-intake-contract.json')));
  assert.match(llms, /contact-intake-contract\.json/);
});
