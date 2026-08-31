import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { PRIVATE_UI_COPY } from '../lib/private-ui-copy.mjs';
import { localizedPath, resolveLocalizedRoute } from '../lib/site-i18n.mjs';

test('Registry, dossier, intake and capsule copy covers ES EN PT', () => {
  for (const locale of ['es', 'en', 'pt']) {
    const copy = PRIVATE_UI_COPY[locale];
    assert.ok(copy.registry.title.length > 30 && copy.registry.searchLabel.length > 20);
    assert.ok(copy.profile.identityTitle && copy.profile.capabilitiesTitle && copy.profile.limitsTitle);
    assert.ok(copy.dossier.privateSession && copy.dossier.signOut && copy.dossier.title.length > 20);
    assert.ok(copy.intake.sections.length >= 6 && copy.intake.goals.length === 5);
    assert.ok(copy.capsule.title && copy.capsule.noWriteBody.length > 40 && copy.capsule.approve && copy.capsule.reject);
    assert.equal(Object.keys(copy.capsule.operations).length, 3);
    assert.ok(copy.capsule.statuses.owner_approval_pending && copy.capsule.comparisonStatuses.changed);
    assert.ok(copy.capsule.messages.empty && copy.capsule.messages.previewReady && copy.capsule.messages.privateLinkCopied);
  }
});

test('public Registry experiences receive locale but preserve owner fields verbatim', () => {
  const listing = readFileSync(new URL('../app/registry/page.tsx', import.meta.url), 'utf8');
  const profile = readFileSync(new URL('../app/registry/[slug]/page.tsx', import.meta.url), 'utf8');
  assert.match(listing, /RegistryExperience/);
  assert.match(listing, /locale\??:\s*Locale/);
  assert.match(profile, /RegistryProfileExperience/);
  assert.match(profile, /profile\.organization/);
  assert.match(profile, /profile\.declaredCapabilities/);
  assert.doesNotMatch(profile, /translateOwner|autoTranslate/);
});

test('localized Registry profile routes preserve the public slug', () => {
  assert.equal(localizedPath('registryProfile', 'en', { slug: 'tokenizart' }), '/en/registry/tokenizart');
  assert.deepEqual(resolveLocalizedRoute('pt', ['registry', 'tokenizart']), {
    locale: 'pt', routeKey: 'registryProfile', params: { slug: 'tokenizart' },
  });
  assert.equal(localizedPath('registryProfile', 'en', { slug: '../private' }), null);
});

test('private components localize controls without changing canonical payloads or API routes', () => {
  const intake = readFileSync(new URL('../app/components/intake-workspace.tsx', import.meta.url), 'utf8');
  const capsule = readFileSync(new URL('../app/components/capsule-review.tsx', import.meta.url), 'utf8');
  assert.match(intake, /locale\??:\s*Locale/);
  assert.match(capsule, /locale\??:\s*Locale/);
  assert.match(intake, /\/api\/projects/);
  assert.match(capsule, /agentfriendly\.publication-capsule-build\.v1/);
  assert.match(capsule, /localizedPath\('capsule'/);
});

test('Spanish private pages expose localized route identity to the language switcher', () => {
  const dossier = readFileSync(new URL('../app/expediente/page.tsx', import.meta.url), 'utf8');
  const capsule = readFileSync(new URL('../app/capsula/[projectId]/page.tsx', import.meta.url), 'utf8');
  assert.match(dossier, /<SiteHeader routeKey="dossier"/);
  assert.match(capsule, /<SiteHeader routeKey="capsule"/);
  assert.match(capsule, /projectId=\{projectId\}/);
});
