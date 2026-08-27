import test from 'node:test';
import assert from 'node:assert/strict';

import {
  completionForIntake,
  normalizeIntake,
  nextQuestion,
  publicAttestationDraft,
} from '../lib/intake.mjs';

test('normalizeIntake keeps useful context and removes secret-like fields', () => {
  const result = normalizeIntake({
    organization: 'Museo Ejemplo',
    website: 'https://museo.example',
    role: 'owner',
    siteType: 'museum',
    control: 'dns',
    audience: 'Coleccionistas y escuelas',
    goals: ['discovery'],
    notes: 'Queremos mostrar la coleccion.',
    password: 'never-store-me',
    apiKey: 'also-never-store-me',
  });

  assert.equal(result.organization, 'Museo Ejemplo');
  assert.equal(result.website, 'https://museo.example/');
  assert.equal('password' in result, false);
  assert.equal('apiKey' in result, false);
});

test('normalizeIntake accepts publishing context and rejects secret-like input', () => {
  const result = normalizeIntake({
    organization: 'Museo Top',
    website: 'museotop.example',
    maintainerName: 'Proveedor Web',
    maintainerEmail: 'web@example.com',
    dnsProvider: 'Cloudflare',
    contentSources: ['catalogo', 'archivo'],
    desiredCapabilities: ['discovery', 'structured_content'],
    authorizedResources: ['llms', 'sitemap', 'jsonld'],
    publicationPreference: 'registry_first',
    crawlerSearchPolicy: 'allow',
    crawlerTrainingPolicy: 'reserve',
    approverName: 'Claudio',
    approverEmail: 'claudio@example.com',
    monitoringPreference: 'monthly',
    password: 'never-store-me',
    cloudflareApiToken: 'never-store-me-either',
  });

  assert.equal(result.website, 'https://museotop.example/');
  assert.deepEqual(result.authorizedResources, ['llms', 'sitemap', 'jsonld']);
  assert.equal(result.crawlerTrainingPolicy, 'reserve');
  assert.equal('password' in result, false);
  assert.equal('cloudflareApiToken' in result, false);
});

test('publicAttestationDraft exposes only owner-approved public fields', () => {
  const result = publicAttestationDraft(normalizeIntake({
    organization: 'Museo Top',
    website: 'museotop.example/catalogo',
    audience: 'Coleccionistas',
    languages: ['Español'],
    maintainerEmail: 'private@example.com',
    notes: 'Private operational notes',
  }));

  assert.equal(result.organization, 'Museo Top');
  assert.equal(result.canonicalOrigin, 'https://museotop.example');
  assert.equal('maintainerEmail' in result, false);
  assert.equal('notes' in result, false);
});

test('completionForIntake measures only context fields needed to make a roadmap', () => {
  const partial = normalizeIntake({ organization: 'Galeria Uno', website: 'galeria.example' });
  assert.equal(completionForIntake(partial), 17);

  const complete = normalizeIntake({
    organization: 'Galeria Uno',
    website: 'galeria.example',
    role: 'owner',
    siteType: 'gallery',
    control: 'origin',
    audience: 'Artistas y compradores',
    goals: ['discovery', 'content'],
    languages: ['es'],
    publicationPreference: 'registry_first',
    crawlerSearchPolicy: 'allow',
    crawlerTrainingPolicy: 'reserve',
    approverEmail: 'owner@galeria.example',
  });
  assert.equal(completionForIntake(complete), 100);
});

test('nextQuestion asks for the earliest missing decision in plain Spanish', () => {
  const question = nextQuestion(normalizeIntake({ organization: 'Archivo Sur' }));
  assert.equal(question.field, 'website');
  assert.match(question.prompt, /sitio/i);
});

test('nextQuestion asks publication decisions after the basic context', () => {
  const intake = normalizeIntake({
    organization: 'Archivo Sur',
    website: 'archivo.example',
    role: 'owner',
    siteType: 'archive',
    control: 'provider',
    audience: 'Investigadores',
    goals: ['discovery'],
    languages: ['Español'],
  });
  const question = nextQuestion(intake);
  assert.equal(question.field, 'publicationPreference');
  assert.match(question.prompt, /publicar/i);
  assert.equal(completionForIntake(intake, { stage: 'basic' }), 100);
  assert.equal(nextQuestion(intake, { stage: 'basic' }), null);
});
