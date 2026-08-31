import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { PUBLIC_FAQ_ITEMS, faqEntries, matchPublicFaq } from '../lib/public-faq.mjs';
import { localizedPath } from '../lib/site-i18n.mjs';

const homeSource = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
const faqPageSource = readFileSync(new URL('../app/preguntas-frecuentes/page.tsx', import.meta.url), 'utf8');
const dispatcherSource = readFileSync(new URL('../app/[locale]/[[...slug]]/page.tsx', import.meta.url), 'utf8');
const sitemapSource = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8');
const headerSource = readFileSync(new URL('../app/components/site-header.tsx', import.meta.url), 'utf8');
const footerSource = readFileSync(new URL('../app/components/site-footer.tsx', import.meta.url), 'utf8');
const siteMapSource = readFileSync(new URL('../app/mapa-del-sitio/page.tsx', import.meta.url), 'utf8');

test('FAQ catalog provides reviewed public answers in every locale', () => {
  assert.ok(PUBLIC_FAQ_ITEMS.length >= 12);
  for (const item of PUBLIC_FAQ_ITEMS) {
    assert.match(item.id, /^[a-z0-9-]+$/);
    assert.ok(item.intents.length > 0);
    assert.ok(item.sources.length > 0);
    for (const locale of ['es', 'en', 'pt']) {
      assert.ok(item[locale].question.length > 10);
      assert.ok(item[locale].shortAnswer.length > 20);
      assert.ok(item[locale].detailedAnswer.length >= item[locale].shortAnswer.length);
    }
  }
  assert.equal(faqEntries('es').length, PUBLIC_FAQ_ITEMS.length);
});

test('FAQ matcher selects a canonical entry without model inference', () => {
  assert.equal(matchPublicFaq('El cambio de AF-0 a AF-5 es automatico?', 'es')?.id, 'automatic-progression');
  assert.equal(matchPublicFaq('What is llms.txt used for?', 'en')?.id, 'llms-txt');
  assert.equal(matchPublicFaq('Como protejo minhas senhas e acessos?', 'pt')?.id, 'safe-access');
  assert.equal(matchPublicFaq('xylophone unrelated sentence', 'en'), null);
});

test('FAQ is reachable in every locale and included in public discovery', () => {
  assert.equal(localizedPath('faq', 'es'), '/preguntas-frecuentes');
  assert.equal(localizedPath('faq', 'en'), '/en/frequently-asked-questions');
  assert.equal(localizedPath('faq', 'pt'), '/pt/perguntas-frequentes');
  assert.match(dispatcherSource, /PublicFaqExperience/);
  assert.match(dispatcherSource, /case ['"]faq['"]/);
  assert.match(sitemapSource, /'faq'/);
  assert.match(headerSource, /\['faq', 'faq'\]/);
  assert.match(footerSource, /\['faq', 'faq'\]/);
  assert.match(siteMapSource, /\/preguntas-frecuentes/);
});

test('home and full page render one shared FAQ catalog with matching JSON-LD', () => {
  assert.match(homeSource, /<PublicFaq locale=\{locale\} limit=\{6\}/);
  assert.match(faqPageSource, /faqEntries\(locale\)/);
  assert.match(faqPageSource, /['"]FAQPage['"]/);
  assert.match(faqPageSource, /<PublicFaq locale=\{locale\}/);
  assert.match(faqPageSource, /<SiteHeader routeKey="faq" locale=\{locale\}/);
  assert.match(faqPageSource, /<SiteFooter locale=\{locale\}/);
});
