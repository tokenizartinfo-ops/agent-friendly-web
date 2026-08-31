import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { COMIC_HOME_COPY, HOME_COPY, MATURITY_COPY } from '../lib/home-copy.mjs';

const home = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
const scan = readFileSync(new URL('../app/components/scan-workspace.tsx', import.meta.url), 'utf8');
const map = readFileSync(new URL('../app/components/maturity-map.tsx', import.meta.url), 'utf8');
const demonstrator = readFileSync(new URL('../app/components/maturity-demonstrator.tsx', import.meta.url), 'utf8');
const comicIntro = readFileSync(new URL('../app/components/comic-home-intro.tsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

test('home and maturity dictionaries cover all three locales and six AF stages', () => {
  for (const locale of ['es', 'en', 'pt']) {
    assert.ok(HOME_COPY[locale].title);
    assert.ok(COMIC_HOME_COPY[locale].title.length > 30);
    assert.equal(COMIC_HOME_COPY[locale].files.length, 8);
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
  assert.match(home, /<ComicCallHero locale=/);
  assert.match(home, /<ScanWorkspace initialSite=.*locale=/s);
  assert.match(home, /<MaturityMap locale=/);
  assert.match(home, /<HomeMaturityComparison locale=/);
  assert.match(home, /<FutureArchive locale=/);
  assert.match(home, /<HomeNextPaths locale=/);
  assert.match(home, /<SiteFooter locale=/);
});

test('home follows the approved human journey before opening the future archive', () => {
  const sequence = [
    '<ComicCallHero locale=',
    '<MaturityMap locale=',
    '<ScanWorkspace initialSite=',
    '<HomeMaturityComparison locale=',
    '<FutureArchive locale=',
    '<HomeNextPaths locale=',
  ].map((token) => home.indexOf(token));
  assert.ok(sequence.every((index) => index >= 0), `missing home section: ${sequence}`);
  assert.deepEqual(sequence, [...sequence].sort((a, b) => a - b));
});

test('comic home leads with the approved call, a responsive hero asset and a progressive future archive', () => {
  assert.match(styles, /agent-friendly-call-robots\.webp/);
  assert.match(comicIntro, /className="comic-call-art"/);
  assert.ok(comicIntro.indexOf('id="comic-call-title"') < comicIntro.indexOf('className="comic-call-art"'));
  assert.ok(comicIntro.indexOf('className="comic-call-art"') < comicIntro.indexOf('<p>{copy.intro}<\/p>'));
  assert.match(comicIntro, /id="archivo-del-futuro"/);
  assert.match(comicIntro, /<details className="archive-more"/);
  assert.match(comicIntro, /copy\.files\.slice\(0, 3\)/);
  assert.match(comicIntro, /copy\.files\.slice\(3\)/);
  assert.match(comicIntro, /localizedPath/);
  assert.match(comicIntro, /COMIC_HOME_COPY/);
  assert.match(map, /af-robot/);
  assert.match(map, /data-equipped=/);
});

test('hero CSS protects desktop contrast and brings the illustration forward on mobile', () => {
  assert.match(styles, /\.comic-call-hero::before\s*\{[^}]*background:/s);
  assert.match(styles, /\.comic-call-art\s*\{[^}]*agent-friendly-call-robots\.webp/s);
  assert.match(styles, /@media \(max-width: 620px\)[\s\S]*\.comic-call-art\s*\{[^}]*position:\s*relative;/s);
  assert.match(styles, /@media \(max-width: 620px\)[\s\S]*\.comic-call-actions\s*\{[^}]*display:\s*grid;/s);
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
