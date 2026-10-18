import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const components = new Map();
function loadComponent(path) {
  if (components.has(path)) return components.get(path).exports;
  const compiledModule = { exports: {} };
  components.set(path, compiledModule);
  const compiled = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX,
  } }).outputText;
  const realImports = (id) => {
    if (id.endsWith('.css')) return {}; // Styles are verified in the real browser; no effect on server markup.
    if (!id.startsWith('.')) return require(id);
    const localPath = resolve(dirname(path), id);
    const componentPath = [localPath, `${localPath}.tsx`, `${localPath}.ts`].find(existsSync);
    assert.ok(componentPath, `local import exists: ${id}`);
    return /\.tsx?$/.test(componentPath) ? loadComponent(componentPath) : require(componentPath);
  };
  new Function('require', 'module', 'exports', compiled)(realImports, compiledModule, compiledModule.exports);
  return compiledModule.exports;
}
const { ComicCallHero, HomeServiceJourney } = loadComponent(fileURLToPath(new URL('../app/components/comic-home-intro.tsx', import.meta.url)));
const { HomeExperience } = loadComponent(fileURLToPath(new URL('../app/page.tsx', import.meta.url)));

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

test('the actual homepage includes the first step before maturity and keeps one main heading', async () => {
  for (const locale of ['es', 'en', 'pt']) {
    const html = renderToStaticMarkup(await HomeExperience({ locale }));
    const step = html.indexOf('id="tu-primer-paso"');
    const maturity = html.indexOf('id="ruta-de-madurez"');
    assert.ok(step >= 0 && maturity > step, `the homepage should explain the first step before the levels in ${locale}`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `one main heading in ${locale}`);
    assert.match(html, /<h2 id="audit-title"/);
  }
});
