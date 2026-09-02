import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('keeps the commercial control route local, dynamic and out of public discovery', async () => {
  const [page, sitemap, header, footer, wranglerSource] = await Promise.all([
    read('app/internal/commercial-control/page.tsx'),
    read('app/sitemap.ts'),
    read('app/components/site-header.tsx'),
    read('app/components/site-footer.tsx'),
    read('wrangler.jsonc'),
  ]);

  assert.match(page, /export const dynamic = 'force-dynamic'/);
  assert.equal(page.includes('cloudflare:workers'), false);
  assert.match(page, /import\.meta\.env\.DEV/);
  assert.match(page, /evaluateCommercialControlAccess/);
  assert.match(page, /notFound\(\)/);
  assert.match(page, /index: false/);
  assert.match(page, /follow: false/);
  for (const publicSource of [sitemap, header, footer]) {
    assert.equal(publicSource.includes('commercial-control'), false);
  }

  const wrangler = JSON.parse(wranglerSource);
  assert.equal('AFW_COMMERCIAL_CONTROL_LOCAL_ENABLED' in wrangler.vars, false);
  assert.equal('AFW_COMMERCIAL_CONTROL_LOCAL_ENABLED' in wrangler.env.canary.vars, false);
  assert.equal('AFW_COMMERCIAL_CONTROL_LOCAL_ENABLED' in wrangler.env.production.vars, false);
});

test('renders six functional read-only views without remote or browser persistence code', async () => {
  const component = await read('app/components/commercial-control-dashboard.tsx');

  assert.match(component, /^'use client';/);
  assert.equal(component.includes("from 'next/link'"), false);
  assert.match(component, /<a href="\/" aria-label="Volver a Agent Friendly Web">/);
  assert.match(component, /role="tablist"/);
  assert.match(component, /role="tab"/);
  assert.match(component, /aria-selected=/);
  assert.match(component, /aria-labelledby=/);
  assert.match(component, /tabIndex=/);
  assert.match(component, /onKeyDown=/);
  assert.match(component, /ArrowRight/);
  assert.match(component, /ArrowLeft/);
  assert.match(component, /Home/);
  assert.match(component, /End/);
  assert.match(component, /hidden=/);
  assert.match(component, /type="search"/);
  assert.match(component, /<select/);
  for (const view of ['overview', 'pipeline', 'pricing', 'content', 'email', 'metrics']) {
    assert.match(component, new RegExp(`id: '${view}'`));
  }
  for (const forbidden of ['fetch(', 'localStorage', 'sessionStorage', 'XMLHttpRequest', 'sendBeacon']) {
    assert.equal(component.includes(forbidden), false, `${forbidden} must remain absent`);
  }
  assert.match(component, /Datos sinteticos/);
  assert.match(component, /Sin envios ni pagos/);
  assert.match(component, /const pricingModeLabels:/);
  assert.match(component, /const workflowStatusLabels:/);
  assert.match(component, /Entrada gratuita/);
  assert.match(component, /Borrador, sin publicar/);
  assert.match(component, /Estructura, sin enviar/);
});

test('provides stable desktop and mobile dashboard geometry', async () => {
  const styles = await read('app/globals.css');

  assert.match(styles, /\.commercial-control-shell\s*\{/);
  assert.match(styles, /\.commercial-control-tabs\s*\{/);
  assert.match(styles, /\.commercial-control-table-wrap\s*\{/);
  assert.match(styles, /\.commercial-control-tab\s*\{[^}]*min-height:\s*44px;/s);
  assert.match(styles, /@media \(max-width: 760px\)[\s\S]*\.commercial-control-kpis\s*\{[^}]*grid-template-columns:\s*1fr;/s);
});
