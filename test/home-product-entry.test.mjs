import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const source = readFileSync(new URL('../app/components/comic-home-intro.tsx', import.meta.url), 'utf8');
const compiledModule = { exports: {} };
const compiled = ts.transpileModule(source, { compilerOptions: {
  module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX,
} }).outputText;
const realImports = (id) => {
  if (id === './client-icons') return require('lucide-react');
  if (id.startsWith('../../lib/')) return require(fileURLToPath(new URL(`../lib/${id.slice('../../lib/'.length)}`, import.meta.url)));
  return require(id);
};
new Function('require', 'module', 'exports', compiled)(realImports, compiledModule, compiledModule.exports);
const { ComicCallHero, HomeServiceJourney } = compiledModule.exports;

for (const [locale, dossier] of [['es', '/expediente'], ['en', '/en/dossier'], ['pt', '/pt/dossie']]) {
  test(`a visitor can reach the explanation and the correct private entry in ${locale}`, () => {
    assert.equal(typeof HomeServiceJourney, 'function', 'the first-step explanation must be rendered');
    const html = renderToStaticMarkup(React.createElement(React.Fragment, null,
      React.createElement(ComicCallHero, { locale }), React.createElement(HomeServiceJourney, { locale })));
    assert.match(html, /href="#tu-primer-paso"/);
    assert.match(html, /id="tu-primer-paso"/);
    assert.ok(html.indexOf('href="#tu-primer-paso"') < html.indexOf('class="comic-call-art"'), 'the action must precede the large illustration');
    assert.ok(html.includes(`href="${dossier}"`), `private entry should remain localized: ${dossier}`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.equal((html.match(/<li\b/g) || []).length, 3, 'the explanation should have three ordered steps');
    assert.match(html, /aria-describedby="home-entry-access"/);
    assert.match(html, /id="home-entry-access"/);
    assert.doesNotMatch(html, /<form\b/);
  });
}
