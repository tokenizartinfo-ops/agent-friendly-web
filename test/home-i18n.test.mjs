import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { HOME_COPY, MATURITY_COPY } from '../lib/home-copy.mjs';

const home = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
const scan = readFileSync(new URL('../app/components/scan-workspace.tsx', import.meta.url), 'utf8');
const map = readFileSync(new URL('../app/components/maturity-map.tsx', import.meta.url), 'utf8');
const demonstrator = readFileSync(new URL('../app/components/maturity-demonstrator.tsx', import.meta.url), 'utf8');

test('home and maturity dictionaries cover all three locales and six AF stages', () => {
  for (const locale of ['es', 'en', 'pt']) {
    assert.ok(HOME_COPY[locale].title);
    assert.ok(HOME_COPY[locale].form.submit);
    assert.equal(HOME_COPY[locale].categories.length, 7);
    assert.equal(MATURITY_COPY[locale].stages.length, 6);
    assert.equal(MATURITY_COPY[locale].scenarios.tokenizart.answers.length, 6);
  }
});

test('home experience passes locale through the comic shell and interactive audit', () => {
  assert.match(home, /HomeExperience/);
  assert.match(home, /locale/);
  assert.match(home, /<SiteHeader locale=/);
  assert.match(home, /<ScanWorkspace initialSite=.*locale=/s);
  assert.match(home, /<MaturityMap locale=/);
  assert.match(home, /<SiteFooter locale=/);
});

test('audit and maturity components accept locale without changing the public scan endpoint', () => {
  assert.match(scan, /locale\s*=\s*['"]es['"]/);
  assert.match(scan, /HOME_COPY/);
  assert.match(scan, /fetch\(['"]\/api\/scan['"]/);
  assert.match(map, /locale\s*=\s*['"]es['"]/);
  assert.match(map, /MATURITY_COPY/);
  assert.match(demonstrator, /locale\s*=\s*['"]es['"]/);
  assert.match(demonstrator, /MATURITY_COPY/);
});
