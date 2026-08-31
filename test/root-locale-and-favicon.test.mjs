import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { localeFromPathname, localeFromRequestHeader } from '../lib/request-locale.mjs';

const layout = readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8');
const proxy = readFileSync(new URL('../proxy.ts', import.meta.url), 'utf8');
const faviconRoute = readFileSync(new URL('../app/favicon.ico/route.ts', import.meta.url), 'utf8');

test('request locale is derived only from supported public locale prefixes', () => {
  assert.equal(localeFromPathname('/'), 'es');
  assert.equal(localeFromPathname('/metodologia'), 'es');
  assert.equal(localeFromPathname('/en'), 'en');
  assert.equal(localeFromPathname('/en/guide'), 'en');
  assert.equal(localeFromPathname('/pt'), 'pt');
  assert.equal(localeFromPathname('/pt/guia'), 'pt');
  assert.equal(localeFromPathname('/fr'), 'es');
});

test('request locale header fails closed to Spanish', () => {
  assert.equal(localeFromRequestHeader('en'), 'en');
  assert.equal(localeFromRequestHeader('pt'), 'pt');
  assert.equal(localeFromRequestHeader('es'), 'es');
  assert.equal(localeFromRequestHeader('EN'), 'es');
  assert.equal(localeFromRequestHeader(null), 'es');
});

test('proxy binds the locale to the request and root layout uses it on html', () => {
  assert.match(proxy, /x-agent-friendly-locale/);
  assert.match(proxy, /localeFromPathname/);
  assert.match(proxy, /\/en\/:path\*/);
  assert.match(proxy, /\/pt\/:path\*/);
  assert.match(layout, /localeFromRequestHeader/);
  assert.match(layout, /<html lang=\{locale\}>/);
});

test('traditional favicon requests redirect to the published SVG icon', () => {
  assert.match(faviconRoute, /favicon\.svg/);
  assert.match(faviconRoute, /Response\.redirect/);
});
