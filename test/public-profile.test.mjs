import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildPublicProfile,
  renderPublicProfileMarkdown,
} from '../lib/public-profile.mjs';

const profileFixture = {
  slug: 'museo-top',
  version: 1,
  publishedAt: '2026-08-27T14:00:00.000Z',
  canonicalUrl: 'https://agentfriendlyweb.dev/registry/museo-top',
  organization: 'Museo Top',
  canonicalOrigin: 'https://museotop.example',
  siteType: 'museum',
  sectors: ['museos', 'coleccionismo deportivo'],
  audiences: ['coleccionistas', 'investigadores'],
  languages: ['Español', 'English'],
  publicSources: [
    {
      title: 'Sitio principal',
      url: 'https://museotop.example',
      state: 'owner_declared',
      observedAt: '2026-08-27T13:50:00.000Z',
    },
  ],
  declaredCapabilities: ['discovery', 'public_registry'],
  observedResources: [
    {
      type: 'robots',
      url: 'https://museotop.example/robots.txt',
      state: 'observed',
      observedAt: '2026-08-27T13:55:00.000Z',
    },
  ],
  verification: {
    status: 'verified',
    hostname: 'museotop.example',
    method: 'dns_txt',
    verifiedAt: '2026-08-27T13:40:00.000Z',
    verifiedUntil: '2026-11-25T13:40:00.000Z',
  },
  readiness: {
    level: 'AF-2',
    score: 43,
    state: 'observed',
    observedAt: '2026-08-27T13:55:00.000Z',
  },
  historyUrl: 'https://agentfriendlyweb.dev/registry/museo-top/history',
  limits: [
    'La verificacion acredita control temporal del dominio, no calidad comercial.',
    'El perfil no garantiza indexacion, posicionamiento ni recomendacion por una LLM.',
  ],
  ownerEmail: 'private@example.com',
  maintainerEmail: 'maintainer@example.com',
  notes: 'Private operational notes',
};

test('public projection labels provenance and omits private fields', () => {
  const profile = buildPublicProfile(profileFixture);

  assert.equal(profile.contract, 'agentfriendly.public-profile.v1');
  assert.equal(profile.verification.status, 'verified');
  assert.equal(profile.assertions.organization.state, 'owner_declared');
  assert.equal(profile.assertions.canonicalOrigin.state, 'verified');
  assert.equal(profile.assertions.readiness.state, 'observed');
  assert.equal(JSON.stringify(profile).includes('private@example.com'), false);
  assert.equal(JSON.stringify(profile).includes('maintainer@example.com'), false);
  assert.equal(JSON.stringify(profile).includes('Private operational notes'), false);
});

test('markdown renderer emits real markdown with source dates', () => {
  const markdown = renderPublicProfileMarkdown(buildPublicProfile(profileFixture));

  assert.match(markdown, /^# Museo Top/m);
  assert.match(markdown, /Owner declared/);
  assert.match(markdown, /Observed/);
  assert.match(markdown, /Verified/);
  assert.match(markdown, /2026-08-27/);
  assert.doesNotMatch(markdown, /<section|<script|private@example.com/i);
});

test('public projection rejects HTML and invalid public URLs', () => {
  assert.throws(
    () => buildPublicProfile({ ...profileFixture, organization: '<script>alert(1)</script>' }),
    /HTML/i,
  );
  assert.throws(
    () => buildPublicProfile({ ...profileFixture, canonicalOrigin: 'javascript:alert(1)' }),
    /URL/i,
  );
});
