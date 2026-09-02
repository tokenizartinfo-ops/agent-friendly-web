import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { buildEmailOutboundCanaryPlan } from '../lib/email-outbound-canary.mjs';
import { runEmailOutboundCanaryPreflight } from '../scripts/preflight-email-outbound-canary.mjs';

const root = new URL('../', import.meta.url);
const rootPath = fileURLToPath(root);
const scriptFile = fileURLToPath(new URL('../scripts/preflight-email-outbound-canary.mjs', import.meta.url));

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('package exposes only the bounded local outbound preflight', async () => {
  const pkg = JSON.parse(await read('package.json'));

  assert.equal(
    pkg.scripts['email:outbound:preflight'],
    'node scripts/preflight-email-outbound-canary.mjs --input',
  );
  assert.equal(pkg.scripts['email:outbound:send'], undefined);
  assert.equal(pkg.scripts['email:outbound:apply'], undefined);
  assert.equal(pkg.scripts['email:outbound:deploy'], undefined);
});

test('sanitized remote baseline reproduces the unconfigured provider state', async () => {
  const evidence = JSON.parse(
    await read('docs/evidence/email-outbound-canary-baseline-2026-09-02.json'),
  );
  const result = buildEmailOutboundCanaryPlan(evidence);

  assert.equal(evidence.project, 'agent-friendly-web');
  assert.equal(evidence.repository, 'tokenizartinfo-ops/agent-friendly-web');
  assert.equal(evidence.environment, 'afw_email_outbound_canary');
  assert.equal(evidence.origin, 'agentfriendlyweb.dev');
  assert.equal(evidence.workersPaidStatus, 'unknown');
  assert.equal(evidence.quota, null);
  assert.equal(evidence.usage, null);
  assert.deepEqual(evidence.sendingSubdomains, []);
  assert.equal(evidence.dnsPreview.records.length, 6);
  assert.equal(evidence.dnsPreview.missingCount, 6);
  assert.equal(evidence.dnsPreview.conflictCount, 0);
  assert.equal(result.ok, true);
  assert.equal(result.plan.state, 'provider_selected_remote_unconfigured');
  assert.doesNotMatch(JSON.stringify(evidence), /gmail\.com|outlook\.com|v=dkim1|privateDestination/i);
});

test('CLI emits one sanitized JSON plan and performs no network operation', async () => {
  const output = execFileSync(process.execPath, [
    scriptFile,
    '--input',
    'docs/evidence/email-outbound-canary-baseline-2026-09-02.json',
  ], {
    cwd: rootPath,
    encoding: 'utf8',
  });
  const result = JSON.parse(output);

  assert.equal(result.ok, true);
  assert.equal(result.plan.state, 'provider_selected_remote_unconfigured');
  assert.equal(result.plan.dnsPreview.missingCount, 6);
  assert.ok(result.plan.steps.every((step) => step.networkMutation === false));
  assert.doesNotMatch(output, /gmail\.com|outlook\.com|destinationAddress|privateDestination|fetch\(/i);
});

test('CLI helper and process fail closed for invalid input', async () => {
  assert.deepEqual(await runEmailOutboundCanaryPreflight(''), {
    ok: false,
    code: 'invalid_arguments',
  });

  const folder = await mkdtemp(join(tmpdir(), 'afw-email-outbound-invalid-'));
  const input = join(folder, 'input.json');
  try {
    const baseline = JSON.parse(
      await read('docs/evidence/email-outbound-canary-baseline-2026-09-02.json'),
    );
    await writeFile(input, JSON.stringify({ ...baseline, origin: 'tokenizart.com' }), 'utf8');
    const result = spawnSync(process.execPath, [scriptFile, '--input', input], {
      cwd: rootPath,
      encoding: 'utf8',
    });

    assert.equal(result.status, 1);
    assert.deepEqual(JSON.parse(result.stdout), { ok: false, code: 'invalid_origin' });
    assert.equal(result.stderr, '');
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
});

test('public outbound contract reports selected provider and disabled remote capabilities', async () => {
  const contract = JSON.parse(
    await read('public/.well-known/email-outbound-canary-contract.json'),
  );

  assert.equal(contract.contract, 'agent-friendly-web.email-outbound-canary.v1');
  assert.equal(contract.status, 'provider_selected_remote_unconfigured');
  assert.equal(contract.provider.id, 'cloudflare_email_service');
  assert.equal(contract.identity.sender, 'hello@agentfriendlyweb.dev');
  assert.equal(contract.identity.reply_to, 'hello@agentfriendlyweb.dev');
  assert.equal(contract.identity.destination_id, 'verified_destination_1');
  assert.equal(contract.remote_state.sending_domain_onboarded, false);
  assert.equal(contract.remote_state.dns_applied, false);
  assert.equal(contract.remote_state.dns_preview_missing_records, 6);
  assert.equal(contract.remote_state.dns_preview_conflicts, 0);
  assert.equal(contract.capabilities.local_preflight, true);
  assert.equal(contract.capabilities.provider_selected, true);
  assert.equal(contract.capabilities.provider_configured, false);
  assert.equal(contract.capabilities.outbound_sending, false);
  assert.equal(contract.capabilities.human_canary_verified, false);
  assert.equal(contract.capabilities.automatic_sending, false);
  assert.equal(contract.capabilities.arbitrary_recipients, false);
  assert.equal(contract.capabilities.marketing, false);
  assert.equal(contract.capabilities.message_persistence, false);
  assert.equal(contract.cost.pricing_observed_at, '2026-09-02');
  assert.equal(contract.cost.verified_destination_canary_usd, 0);
  assert.equal(contract.requires_separate_remote_approval, true);
  assert.ok(contract.blocked_actions.includes('send_email'));
  assert.ok(contract.blocked_actions.includes('configure_dns'));
  assert.doesNotMatch(JSON.stringify(contract), /gmail\.com|outlook\.com|v=dkim1/i);
});

test('Gate 6C.2A documentation records boundaries, costs and two separate remote decisions', async () => {
  const [gate, emailArchitecture, growthRoadmap, agentRoadmap, marketStrategy, publicStatus] = await Promise.all([
    read('docs/BLOCK-6C2-EMAIL-OUTBOUND-CANARY-LOCAL-GATE-2026-09-02.md'),
    read('docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md'),
    read('docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md'),
    read('docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md'),
    read('docs/MARKET-AND-LOCALE-EXPANSION-STRATEGY-V1.md'),
    read('docs/PUBLIC-SITE-STATUS-RECONCILIATION-2026-08-31.md'),
  ]);

  for (const field of [
    'PROJECT',
    'REPOSITORY',
    'ENVIRONMENT',
    'ORIGIN',
    'RESOURCE_TYPE',
    'RESOURCE_ID',
    'ALLOWED_ACTION',
    'ROLLBACK',
  ]) assert.match(gate, new RegExp(field));

  assert.match(gate, /provider_selected_remote_unconfigured/);
  assert.match(gate, /USD 5/);
  assert.match(gate, /3\.000 correos/);
  assert.match(gate, /USD 0,35/);
  assert.match(gate, /developers\.cloudflare\.com\/email-service\/platform\/pricing/);
  assert.match(gate, /primera decision remota/i);
  assert.match(gate, /segunda decision remota/i);
  assert.match(gate, /no se (?:aplico|modifico).*DNS/i);
  assert.match(gate, /no se envio.*correo/i);

  for (const document of [emailArchitecture, growthRoadmap, agentRoadmap]) {
    assert.match(document, /Gate 6C\.2A/);
    assert.match(document, /provider_selected_remote_unconfigured/);
    assert.match(document, /Cloudflare Email Service/);
  }
  assert.match(marketStrategy, /inbound_canary_verified/);
  assert.match(marketStrategy, /provider_selected_remote_unconfigured/);
  assert.doesNotMatch(marketStrategy, /sera la identidad universal.*cuando el Gate 6C habilite correo/);
  assert.match(publicStatus, /Gate 6C\.2A/);
  assert.match(publicStatus, /provider_selected_remote_unconfigured/);
});
