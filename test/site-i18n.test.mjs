import assert from 'node:assert/strict';
import test from 'node:test';

import {
  DEFAULT_LOCALE,
  LOCALES,
  languageAlternates,
  localizedPath,
  normalizeLocale,
  resolveLocalizedRoute,
} from '../lib/site-i18n.mjs';

test('locale catalog accepts only Spanish, English and Portuguese', () => {
  assert.deepEqual(LOCALES, ['es', 'en', 'pt']);
  assert.equal(DEFAULT_LOCALE, 'es');
  assert.equal(normalizeLocale('ES'), 'es');
  assert.equal(normalizeLocale('en'), 'en');
  assert.equal(normalizeLocale('pt-BR'), 'pt');
  assert.equal(normalizeLocale('fr'), null);
  assert.equal(normalizeLocale(undefined), null);
});

test('localized paths preserve Spanish canonicals and use stable English and Portuguese slugs', () => {
  assert.equal(localizedPath('home', 'es'), '/');
  assert.equal(localizedPath('methodology', 'es'), '/metodologia');
  assert.equal(localizedPath('methodology', 'en'), '/en/methodology');
  assert.equal(localizedPath('methodology', 'pt'), '/pt/metodologia');
  assert.equal(localizedPath('tokenizartCase', 'en'), '/en/cases/tokenizart');
  assert.equal(localizedPath('tokenizartCase', 'pt'), '/pt/casos/tokenizart');
  assert.equal(localizedPath('siteMap', 'en'), '/en/site-map');
  assert.equal(localizedPath('siteMap', 'pt'), '/pt/mapa-do-site');
  assert.equal(localizedPath('unknown', 'es'), null);
  assert.equal(localizedPath('home', 'fr'), null);
});

test('localized route resolver is allowlisted and rejects unknown or unsafe segments', () => {
  assert.deepEqual(resolveLocalizedRoute('en', []), { locale: 'en', routeKey: 'home', params: {} });
  assert.deepEqual(resolveLocalizedRoute('pt', ['metodologia']), { locale: 'pt', routeKey: 'methodology', params: {} });
  assert.deepEqual(resolveLocalizedRoute('en', ['capsule', 'project_123']), {
    locale: 'en', routeKey: 'capsule', params: { projectId: 'project_123' },
  });
  assert.equal(resolveLocalizedRoute('es', ['methodology']), null);
  assert.equal(resolveLocalizedRoute('en', ['unknown']), null);
  assert.equal(resolveLocalizedRoute('en', ['capsule', '..']), null);
  assert.equal(resolveLocalizedRoute('pt', ['capsula', 'a/b']), null);
});

test('language alternates include every locale plus x-default', () => {
  assert.deepEqual(languageAlternates('guide'), {
    es: '/guia',
    en: '/en/guide',
    pt: '/pt/guia',
    'x-default': '/guia',
  });
});

test('localized paths preserve only safe fragments', () => {
  assert.equal(localizedPath('home', 'en', { hash: 'audit' }), '/en#audit');
  assert.equal(localizedPath('home', 'pt', { hash: 'auditar' }), '/pt#auditar');
  assert.equal(localizedPath('home', 'en', { hash: 'bad fragment' }), '/en');
  assert.equal(localizedPath('home', 'en', { hash: '<script>' }), '/en');
});
