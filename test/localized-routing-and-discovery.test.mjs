import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const localizedPagePath = new URL('../app/[locale]/[[...slug]]/page.tsx', import.meta.url);
const metadataModulePath = new URL('../lib/localized-route-metadata.mjs', import.meta.url);

test('localized catch-all publishes every human route in English and Portuguese', async () => {
  assert.ok(existsSync(localizedPagePath), 'localized route dispatcher must exist');
  if (!existsSync(localizedPagePath)) return;
  const source = readFileSync(localizedPagePath, 'utf8');
  for (const routeKey of ['home', 'guide', 'faq', 'aeo', 'sectors', 'evolution', 'methodology', 'measurement', 'assistant', 'openKnowledge', 'registry', 'registryProfile', 'cli', 'mcp', 'externalVerification', 'tokenizartCase', 'siteMap', 'dossier', 'capsule']) {
    assert.match(source, new RegExp(`['\"]${routeKey}['\"]`));
  }
  assert.match(source, /resolveLocalizedRoute/);
  assert.match(source, /notFound\(\)/);
});

test('public localized routes do not eagerly load the Cloudflare-only Registry database', () => {
  const store = readFileSync(new URL('../lib/registry-store.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(store, /import\s+\{\s*getDb\s*\}\s+from\s+['"]\.\.\/db['"]/);
  assert.match(store, /await\s+import\(['"]\.\.\/db['"]\)/);
  assert.match(store, /ERR_UNSUPPORTED_ESM_URL_SCHEME/);
});

test('localized metadata binds canonical and hreflang without indexing private routes', async () => {
  assert.ok(existsSync(metadataModulePath), 'localized metadata module must exist');
  if (!existsSync(metadataModulePath)) return;
  const { localizedRouteMetadata } = await import(metadataModulePath.href);
  for (const locale of ['en', 'pt']) {
    const publicMeta = localizedRouteMetadata('methodology', locale);
    assert.equal(publicMeta.alternates.canonical.startsWith(`/${locale}/`), true);
    assert.equal(publicMeta.alternates.languages.es, '/metodologia');
    assert.equal(publicMeta.alternates.languages.en, '/en/methodology');
    assert.equal(publicMeta.alternates.languages.pt, '/pt/metodologia');
    assert.notEqual(publicMeta.robots?.index, false);

    const privateMeta = localizedRouteMetadata('dossier', locale);
    assert.equal(privateMeta.robots.index, false);
    assert.equal(privateMeta.robots.follow, false);
  }
});

test('sitemap expands public human routes by locale and keeps private or machine routes out', () => {
  const source = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8');
  assert.match(source, /routeEntries\(\)/);
  assert.match(source, /PUBLIC_SITEMAP_ROUTE_KEYS/);
  assert.match(source, /localizedPath/);
  assert.doesNotMatch(source, /PUBLIC_SITEMAP_ROUTE_KEYS[^;]*dossier/s);
  assert.doesNotMatch(source, /PUBLIC_SITEMAP_ROUTE_KEYS[^;]*capsule/s);
});

test('specialized sector and evolution experiences preserve comic interaction in every locale', () => {
  const sector = readFileSync(new URL('../app/components/sector-guide-page.tsx', import.meta.url), 'utf8');
  const evolution = readFileSync(new URL('../app/evolucion-agentica/page.tsx', import.meta.url), 'utf8');
  assert.match(sector, /<SiteHeader[^>]*locale=\{locale\}[^>]*routeKey="sectors"/);
  assert.match(sector, /<SiteFooter locale=\{locale\}/);
  assert.match(evolution, /AgenticEvolutionExperience/);
  assert.match(evolution, /<MaturityDemonstrator locale=\{locale\}/);
});

test('public discovery states the human language routes while machine contracts remain canonical', () => {
  const llms = readFileSync(new URL('../public/llms.txt', import.meta.url), 'utf8');
  const readiness = JSON.parse(readFileSync(new URL('../public/.well-known/agent-readiness.json', import.meta.url), 'utf8'));
  assert.match(llms, /\/en\//);
  assert.match(llms, /\/pt\//);
  assert.deepEqual(readiness.human_languages, ['es', 'en', 'pt']);
  assert.equal(readiness.machine_routes_localized, false);
});
