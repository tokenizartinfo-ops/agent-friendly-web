import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('AEO education page explains business value without ranking promises', async () => {
  const page = await read('app/aeo-y-crawlers/page.tsx');

  assert.match(page, /AEO/);
  assert.match(page, /SEO/);
  assert.match(page, /no garantiza indexacion, ranking ni recomendacion/i);
  assert.match(page, /<details className="crawler-detail">/);
});

test('crawler catalog distinguishes user agents from robots product tokens', async () => {
  const catalog = await import('../lib/crawler-catalog.mjs');
  const googleExtended = catalog.CRAWLER_CATALOG.find((entry) => entry.id === 'google-extended');
  const gptBot = catalog.CRAWLER_CATALOG.find((entry) => entry.id === 'gptbot');

  assert.equal(googleExtended.kind, 'robots_product_token');
  assert.equal(googleExtended.isUserAgent, false);
  assert.equal(gptBot.kind, 'crawler_user_agent');
  assert.equal(gptBot.isUserAgent, true);
  assert.ok(catalog.CRAWLER_CATALOG.every((entry) => entry.officialSource.startsWith('https://')));
  for (const token of ['GPTBot', 'ClaudeBot', 'Google-Extended', 'PerplexityBot', 'bingbot', 'meta-externalagent', 'CCBot']) {
    assert.ok(catalog.CRAWLER_CATALOG.some((entry) => entry.token === token));
  }
  assert.equal(catalog.crawlerCatalogPayload().contract, 'crawler-policy-catalog.v1');
});

test('machine crawler catalog is static, synchronized and discoverable', async () => {
  const catalog = await import('../lib/crawler-catalog.mjs');
  const [staticCatalog, header, footer, sitemap, map, llms, aiCatalog] = await Promise.all([
    read('public/.well-known/crawler-policy-catalog.json'),
    read('app/components/site-header.tsx'),
    read('app/components/site-footer.tsx'),
    read('app/sitemap.ts'),
    read('app/mapa-del-sitio/page.tsx'),
    read('public/llms.txt'),
    read('public/.well-known/ai-catalog.json'),
  ]);

  assert.deepEqual(JSON.parse(staticCatalog), catalog.crawlerCatalogPayload());
  for (const source of [header, footer, sitemap, map, llms, aiCatalog]) {
    assert.match(source, /aeo-y-crawlers|crawler-policy-catalog/);
  }
  assert.match(map, /Registry publico[\s\S]*Activo/);
});
