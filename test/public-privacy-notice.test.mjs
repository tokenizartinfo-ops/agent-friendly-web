import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { localizedPath } from '../lib/site-i18n.mjs';

async function read(path) {
  return readFile(path, 'utf8').catch(() => '');
}

test('privacy notice has stable Spanish, English and Portuguese routes', () => {
  assert.equal(localizedPath('privacy', 'es'), '/privacidad');
  assert.equal(localizedPath('privacy', 'en'), '/en/privacy');
  assert.equal(localizedPath('privacy', 'pt'), '/pt/privacidade');
});

test('privacy notice copy is substantial, transparent and localized', async () => {
  const source = await read('lib/privacy-notice-copy.mjs');

  for (const marker of ['es:', 'en:', 'pt:', 'Tokenizart Group LLC', 'Gabriel Mucchiut']) {
    assert.match(source, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  for (const concept of [
    'Cloudflare',
    '180',
    '365',
    '730',
    'hello@agentfriendlyweb.dev',
    'no constituye asesoramiento jurídico',
    'does not constitute legal advice',
    'não constitui assessoria jurídica',
    'Captura web de datos reales deshabilitada',
    'Real-data web capture disabled',
    'Captura web de dados reais desativada',
  ]) assert.ok(source.includes(concept), `privacy copy is missing ${concept}`);
  assert.ok(!source.includes('Canal de datos reales cerrado'));
});

test('privacy page renders current processing, rights, retention and official sources', async () => {
  const [component, spanishPage, localizedRouter] = await Promise.all([
    read('app/components/privacy-policy-page.tsx'),
    read('app/privacidad/page.tsx'),
    read('app/[locale]/[[...slug]]/page.tsx'),
  ]);

  assert.match(component, /PrivacyPolicyPage/);
  assert.match(component, /privacy-retention-table/);
  assert.match(component, /copy\.sources/);
  assert.match(component, /PRIVACY_CONTACT_EMAIL/);
  assert.match(spanishPage, /localizedRouteMetadata\('privacy', 'es'\)/);
  assert.match(spanishPage, /PrivacyPolicyPage locale="es"/);
  assert.match(localizedRouter, /case 'privacy'/);
  assert.match(localizedRouter, /PrivacyPolicyPage/);
});

test('machine privacy contract describes the candidate policy and keeps every real capability off', async () => {
  const raw = await read('public/.well-known/contact-privacy-lifecycle-contract.json');
  const contract = JSON.parse(raw || '{}');

  assert.equal(contract.status, 'private_human_privacy_pilot_completed_erased_kill_switch_off');
  assert.equal(contract.policy_notice.status, 'candidate_for_legal_review');
  assert.equal(contract.policy_notice.approved_for_real_contact, false);
  assert.equal(contract.policy_notice.automated_retention_enforcement, false);
  assert.equal(contract.identity.commercial_operator, 'Tokenizart Group LLC');
  assert.equal(contract.identity.controller_designation_verified, false);
  assert.equal(contract.contact.channel, 'hello@agentfriendlyweb.dev');
  assert.equal(contract.current_processing.voluntary_inbound_email, true);
  assert.equal(contract.real_contact_enabled, false);
  assert.equal(contract.privacy_requests_enabled, false);
  assert.equal(contract.retention_jobs_enabled, false);
  assert.equal(contract.product_updates_enabled, false);
  assert.equal(contract.claims.global_legal_compliance, false);
  assert.equal(contract.next_gate, 'policy_legal_identity_and_public_copy_review_required');
  assert.deepEqual(contract.human_policy, {
    es: 'https://agentfriendlyweb.dev/privacidad',
    en: 'https://agentfriendlyweb.dev/en/privacy',
    pt: 'https://agentfriendlyweb.dev/pt/privacidade',
  });
});

test('privacy notice is discoverable without cluttering the primary navigation', async () => {
  const [header, footer, sitemap, map, catalog, readiness, llms, contact] = await Promise.all([
    read('app/components/site-header.tsx'),
    read('app/components/site-footer.tsx'),
    read('app/sitemap.ts'),
    read('app/mapa-del-sitio/page.tsx'),
    read('public/.well-known/ai-catalog.json'),
    read('public/.well-known/agent-readiness.json'),
    read('public/llms.txt'),
    read('app/components/contact-intake.tsx'),
  ]);

  assert.doesNotMatch(header, /\['privacy',/);
  assert.match(footer, /\['privacy', 'privacy'\]/);
  assert.match(sitemap, /'privacy'/);
  assert.match(map, /contact-privacy-lifecycle-contract\.json/);
  assert.match(catalog, /contact-privacy-lifecycle-contract\.json/);
  assert.match(readiness, /contact_privacy/);
  assert.match(llms, /\/privacidad/);
  assert.match(contact, /localizedPath\('privacy'/);
});

test('all current environments remain fail-closed for real contact and marketing', async () => {
  const config = JSON.parse(await read('wrangler.jsonc'));
  const flags = [
    'AFW_REAL_CONTACT_ENABLED',
    'AFW_PRIVACY_REQUESTS_ENABLED',
    'AFW_RETENTION_JOBS_ENABLED',
    'AFW_PRODUCT_UPDATES_ENABLED',
  ];

  for (const vars of [config.vars, config.env.canary.vars, config.env.production.vars]) {
    for (const flag of flags) assert.equal(vars[flag], 'false');
  }
});
