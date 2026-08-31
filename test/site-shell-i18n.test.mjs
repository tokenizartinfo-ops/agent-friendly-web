import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { SHARED_COPY } from '../lib/site-copy.mjs';

const header = readFileSync(new URL('../app/components/site-header.tsx', import.meta.url), 'utf8');
const footer = readFileSync(new URL('../app/components/site-footer.tsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

test('shared shell copy provides complete Spanish, English and Portuguese labels', () => {
  for (const locale of ['es', 'en', 'pt']) {
    const copy = SHARED_COPY[locale];
    assert.ok(copy.nav.audit);
    assert.ok(copy.nav.guide);
    assert.ok(copy.nav.dossier);
    assert.ok(copy.footer.product);
    assert.ok(copy.footer.agentResources);
    assert.ok(copy.menu.open);
    assert.ok(copy.language.label);
  }
  assert.equal(SHARED_COPY.es.nav.audit, 'Auditar');
  assert.equal(SHARED_COPY.en.nav.audit, 'Audit');
  assert.equal(SHARED_COPY.pt.nav.audit, 'Auditar');
});

test('site header accepts locale and current route and renders an accessible three-language switcher', () => {
  assert.match(header, /locale\s*=\s*['"]es['"]/);
  assert.match(header, /routeKey\s*=\s*['"]home['"]/);
  assert.match(header, /language-switcher/);
  assert.match(header, /aria-current=/);
  assert.match(header, /localizedPath/);
  assert.match(header, /\['es', 'en', 'pt'\]/);
  assert.match(header, /target\.toUpperCase\(\)/);
});

test('site footer localizes human links while keeping machine resources canonical', () => {
  assert.match(footer, /locale\s*=\s*['"]es['"]/);
  assert.match(footer, /localizedPath/);
  assert.match(footer, /\/llms\.txt/);
  assert.match(footer, /\/openapi\.json/);
  assert.match(footer, /sharedCopy/);
});

test('comic language switcher remains legible and stable on mobile', () => {
  assert.match(css, /\.language-switcher/);
  assert.match(css, /\.language-switcher a\[aria-current='page'\]/);
  assert.match(css, /@media \(max-width: 760px\)/);
});
