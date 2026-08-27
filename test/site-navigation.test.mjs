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
