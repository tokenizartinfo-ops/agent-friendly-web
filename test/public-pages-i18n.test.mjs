import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { PUBLIC_PAGE_COPY, PUBLIC_PAGE_KEYS } from '../lib/public-page-copy.mjs';

const localizedPage = readFileSync(new URL('../app/components/localized-public-page.tsx', import.meta.url), 'utf8');

test('every informative page has substantial Spanish, English and Portuguese content', () => {
  assert.deepEqual(PUBLIC_PAGE_KEYS, [
    'methodology', 'aeo', 'evolution', 'openKnowledge', 'cli', 'mcp',
    'externalVerification', 'tokenizartCase', 'siteMap',
  ]);
  for (const key of PUBLIC_PAGE_KEYS) {
    for (const locale of ['es', 'en', 'pt']) {
      const page = PUBLIC_PAGE_COPY[key][locale];
      assert.ok(page.eyebrow.length > 3, `${key}/${locale} eyebrow`);
      assert.ok(page.title.length > 12, `${key}/${locale} title`);
      assert.ok(page.intro.length > 40, `${key}/${locale} intro`);
      assert.ok(page.sections.length >= 3, `${key}/${locale} sections`);
      assert.ok(page.sections.every((section) => section.title && section.body.length > 30));
      assert.ok(page.cta.label && page.cta.routeKey);
    }
  }
});

test('localized public page uses the shared comic shell, real links and visible limits', () => {
  assert.match(localizedPage, /SiteHeader/);
  assert.match(localizedPage, /SiteFooter/);
  assert.match(localizedPage, /localizedPath/);
  assert.match(localizedPage, /localized-comic-hero/);
  assert.match(localizedPage, /localized-comic-sections/);
  assert.match(localizedPage, /page\.limits/);
});

test('Spanish informative pages identify their matching route key for the language switcher', () => {
  const files = {
    methodology: '../app/metodologia/page.tsx', aeo: '../app/aeo-y-crawlers/page.tsx',
    evolution: '../app/evolucion-agentica/page.tsx', openKnowledge: '../app/conocimiento-abierto/page.tsx',
    cli: '../app/cli/page.tsx', mcp: '../app/mcp-readonly/page.tsx',
    externalVerification: '../app/verificacion-externa/page.tsx', tokenizartCase: '../app/casos/tokenizart/page.tsx',
    siteMap: '../app/mapa-del-sitio/page.tsx',
  };
  for (const [key, path] of Object.entries(files)) {
    const source = readFileSync(new URL(path, import.meta.url), 'utf8');
    assert.match(source, new RegExp(`<SiteHeader routeKey=["']${key}["']`), path);
  }
});
