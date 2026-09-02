import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const canonical = 'https://agentfriendlyweb.dev';

test('public status ledger exposes planning contracts without inflating active capabilities', async () => {
  const readiness = JSON.parse(await readFile('public/.well-known/agent-readiness.json', 'utf8'));

  assert.equal(readiness.capabilities.email_operations.status, 'inbound_and_one_shot_outbound_verified');
  assert.equal(readiness.capabilities.email_operations.inbound_routing, true);
  assert.equal(readiness.capabilities.email_operations.outbound_sending, false);
  assert.equal(readiness.capabilities.email_operations.dns_configured, true);
  assert.equal(readiness.capabilities.email_operations.outbound_provider_selected, true);
  assert.equal(readiness.capabilities.email_operations.email_provider_configured, true);
  assert.equal(readiness.capabilities.email_operations.outbound_delivery_verified, true);
  assert.equal(readiness.capabilities.email_operations.outbound_binding_configured, false);
  assert.deepEqual(readiness.capabilities.email_operations.resources, [
    '/.well-known/email-operations-contract.json',
    '/.well-known/email-inbound-canary-contract.json',
    '/.well-known/email-outbound-canary-contract.json',
  ]);
  assert.equal(readiness.capabilities.crm_lite.status, 'local_planning_only');
  assert.equal(readiness.capabilities.crm_lite.remote_persistence, false);
  assert.equal(readiness.capabilities.crm_lite.accepts_pii, false);
});

test('public catalogs and site map discover the planning contracts with explicit boundaries', async () => {
  const [catalog, ard, siteMap] = await Promise.all([
    readFile('public/.well-known/ai-catalog.json', 'utf8').then(JSON.parse),
    readFile('public/.well-known/ard.json', 'utf8').then(JSON.parse),
    readFile('app/mapa-del-sitio/page.tsx', 'utf8'),
  ]);
  const expected = [
    `${canonical}/.well-known/email-operations-contract.json`,
    `${canonical}/.well-known/email-inbound-canary-contract.json`,
    `${canonical}/.well-known/email-outbound-canary-contract.json`,
    `${canonical}/.well-known/crm-lite-contract.json`,
  ];

  for (const manifest of [catalog, ard]) {
    const urls = manifest.entries.map((entry) => entry.url);
    for (const url of expected) assert.ok(urls.includes(url), `${url} is missing`);
  }

  assert.match(siteMap, /Email operations contract/);
  assert.match(siteMap, /Email inbound canary contract/);
  assert.match(siteMap, /Email outbound canary contract/);
  assert.match(siteMap, /CRM Lite contract/);
  assert.match(siteMap, /Correo operativo[\s\S]*documented/);
  assert.match(siteMap, /CRM Lite[\s\S]*documented/);
  assert.doesNotMatch(siteMap, /no hay casilla, DNS, proveedor/);
});

test('home no longer labels the verified reference breakdown as pending work', async () => {
  const [copy, scan] = await Promise.all([
    readFile('lib/home-copy.mjs', 'utf8'),
    readFile('app/components/scan-workspace.tsx', 'utf8'),
  ]);

  assert.doesNotMatch(copy, /Qué vamos a medir|What we will measure|O que vamos medir/);
  assert.doesNotMatch(scan, /copy\.pending/);
  assert.match(scan, /referenceBreakdown/);
});
