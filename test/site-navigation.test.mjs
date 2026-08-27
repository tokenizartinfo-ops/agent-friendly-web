import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const requiredNavigation = [
  '/#auditar',
  '/evolucion-agentica',
  '/metodologia',
  '/casos/tokenizart',
  '/mapa-del-sitio',
  '/expediente',
];

const publicPages = [
  'app/page.tsx',
  'app/metodologia/page.tsx',
  'app/evolucion-agentica/page.tsx',
  'app/casos/tokenizart/page.tsx',
  'app/mapa-del-sitio/page.tsx',
];

test('public navigation exposes the approved destinations', async () => {
  const header = await readFile('app/components/site-header.tsx', 'utf8');

  for (const href of requiredNavigation) {
    assert.ok(header.includes(`href="${href}"`), `header is missing ${href}`);
  }
});

test('the human site map groups real resources and roadmap capabilities', async () => {
  const path = 'app/mapa-del-sitio/page.tsx';
  const exists = await stat(path).then(() => true).catch(() => false);
  assert.equal(exists, true, `${path} must exist`);

  const page = await readFile(path, 'utf8');
  for (const heading of ['Para propietarios y equipos', 'Para agentes y buscadores', 'Capacidades activas', 'Roadmap']) {
    assert.match(page, new RegExp(heading, 'i'));
  }
  for (const resource of ['/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt', '/openapi.json']) {
    assert.ok(page.includes(`href: '${resource}'`) || page.includes(`href="${resource}"`), `site map is missing ${resource}`);
  }
});

test('the technical sitemap includes only canonical public HTML routes', async () => {
  const sitemap = await readFile('app/sitemap.ts', 'utf8');

  for (const route of ['/metodologia', '/evolucion-agentica', '/casos/tokenizart', '/mapa-del-sitio']) {
    assert.ok(sitemap.includes(route), `sitemap is missing ${route}`);
  }
  for (const excluded of ['/expediente', '/api/', '/.well-known/']) {
    assert.equal(sitemap.includes(excluded), false, `sitemap must not include ${excluded}`);
  }
});

test('every public page uses the shared footer', async () => {
  for (const page of publicPages) {
    const source = await readFile(page, 'utf8');
    assert.match(source, /<SiteFooter\s*\/>/, `${page} must render the shared footer`);
  }
});

test('the home maturity map exposes six stages and one clear demonstrator action', async () => {
  const path = 'app/components/maturity-map.tsx';
  const exists = await stat(path).then(() => true).catch(() => false);
  assert.equal(exists, true, `${path} must exist`);

  const maturity = await readFile(path, 'utf8');
  for (let stage = 0; stage <= 5; stage += 1) {
    assert.match(maturity, new RegExp(`AF-${stage}`));
  }
  assert.equal((maturity.match(/href="\/evolucion-agentica"/g) || []).length, 1);
});

test('the mobile navigation stretches across the available menu width', async () => {
  const styles = await readFile('app/globals.css', 'utf8');
  assert.match(styles, /\.site-header nav\.is-open\s*\{[^}]*justify-content:\s*stretch;/s);
  assert.match(styles, /\.site-header nav\.is-open a\s*\{[^}]*width:\s*100%;/s);
});
