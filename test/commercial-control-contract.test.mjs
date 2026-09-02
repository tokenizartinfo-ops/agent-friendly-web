import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('versions the synthetic boundary without publishing it from the web origin', async () => {
  const contract = JSON.parse(await read('docs/contracts/commercial-control.v1.json'));

  assert.equal(contract.contract, 'agent-friendly-web.commercial-control.v1');
  assert.equal(contract.status, 'local_synthetic_only');
  assert.equal(contract.public_ui, false);
  assert.equal(contract.synthetic_data_only, true);
  assert.equal(contract.capabilities.remote_persistence, false);
  assert.equal(contract.capabilities.email_sending, false);
  assert.equal(contract.capabilities.social_publishing, false);
  assert.equal(contract.capabilities.proposal_creation, false);
  assert.equal(contract.capabilities.payment_collection, false);
  assert.equal(contract.capabilities.customer_site_changes, false);
  assert.equal(contract.requires_separate_remote_approval, true);
  assert.ok(contract.blocked_actions.includes('publish_price'));

  await assert.rejects(access(new URL('public/.well-known/commercial-control-contract.json', root)));
});

test('documents Gate 6D.1 without presenting it as a live CRM', async () => {
  const [gate, roadmap, sitemap, agentCatalog] = await Promise.all([
    read('docs/BLOCK-6D1-COMMERCIAL-CONTROL-LOCAL-GATE-2026-09-02.md'),
    read('docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md'),
    read('app/sitemap.ts'),
    read('public/.well-known/ai-catalog.json'),
  ]);

  assert.match(gate, /local_synthetic_only/);
  assert.match(gate, /datos sinteticos/i);
  assert.match(gate, /sin D1, emails, publicaciones sociales, propuestas ni pagos/i);
  assert.match(gate, /aprobacion separada/i);
  assert.match(roadmap, /Gate 6D\.1 - Centro Comercial interno/);
  assert.equal(sitemap.includes('commercial-control'), false);
  assert.equal(agentCatalog.includes('commercial-control'), false);
});
