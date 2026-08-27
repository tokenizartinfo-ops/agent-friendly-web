# Agent Friendly Web Public Experience v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Renovar la superficie publica de Agent Friendly Web con navegacion clara, mapa humano, auditor mejorado, escala de madurez e integridad verificable de enlaces.

**Architecture:** La entrega conserva Next/Vinext y separa datos de navegacion, componentes compartidos y comportamiento del auditor. El bloque es exclusivamente publico y read-only; no cambia el esquema D1 ni aplica migraciones remotas.

**Tech Stack:** Next 16, React 19, TypeScript, Vinext, Lucide React, CSS, Node test runner, Sites/Cloudflare.

**Spec:** `docs/superpowers/specs/2026-08-26-agent-friendly-web-visual-navigation-and-registry-v2-design.md`

## Global Constraints

- El auditor sigue siendo la accion primaria del primer viewport.
- El modelo AF-0 a AF-5 no se presenta como certificacion oficial.
- Capacidades futuras no pueden parecer desplegadas ni ejecutables.
- No se modifica D1, autenticacion, DNS, MCP, A2A, WebMCP, CLI ni x402.
- `/expediente` permanece protegido y una redireccion de autenticacion es saludable.
- La experiencia debe funcionar sin superposiciones en 360, 768, 1280 y 1440 px.
- La autoauditoria de `agentfriendlyweb.dev` debe conservar al menos 70/100 AF-3.

---

### Task 1: Contrato de navegacion y mapa publico

**Files:**
- Create: `test/site-navigation.test.mjs`
- Create: `app/mapa-del-sitio/page.tsx`
- Modify: `app/components/site-header.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: rutas publicas existentes y recursos reales bajo `public/`.
- Produces: ruta HTML `/mapa-del-sitio`, seis destinos del encabezado y sitemap canonico actualizado.

- [ ] **Step 1: Write the failing navigation test**

```js
test('public navigation exposes the approved destinations', async () => {
  const header = await readFile('app/components/site-header.tsx', 'utf8');
  for (const href of ['/#auditar', '/evolucion-agentica', '/metodologia', '/casos/tokenizart', '/mapa-del-sitio', '/expediente']) {
    assert.match(header, new RegExp(`href=["']${href.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}["']`));
  }
});
```

- [ ] **Step 2: Run the test and verify it fails because `/mapa-del-sitio` is absent**

Run: `node --test test/site-navigation.test.mjs`

Expected: FAIL naming the missing map route or href.

- [ ] **Step 3: Add the map route, header destination and sitemap entry**

The page must group human routes, machine resources, active capabilities and roadmap states. Every active resource uses a real `href`; future capabilities render as status rows without an execution CTA.

- [ ] **Step 4: Run the navigation test**

Run: `node --test test/site-navigation.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit the navigation contract**

```bash
git add test/site-navigation.test.mjs app/mapa-del-sitio/page.tsx app/components/site-header.tsx app/sitemap.ts
git commit -m "feat: add public navigation map"
```

### Task 2: Shared footer and valid action inventory

**Files:**
- Create: `app/components/site-footer.tsx`
- Modify: `app/page.tsx`
- Modify: `app/metodologia/page.tsx`
- Modify: `app/evolucion-agentica/page.tsx`
- Modify: `app/casos/tokenizart/page.tsx`
- Modify: `app/mapa-del-sitio/page.tsx`
- Modify: `test/site-navigation.test.mjs`

**Interfaces:**
- Consumes: public routes and technical resources from Task 1.
- Produces: `SiteFooter` with grouped navigation and consistent attribution.

- [ ] **Step 1: Extend the test to require the shared footer on every public page**

```js
for (const page of publicPages) {
  const source = await readFile(page, 'utf8');
  assert.match(source, /<SiteFooter\s*\/>/, `${page} must render the shared footer`);
}
```

- [ ] **Step 2: Run the test and verify it fails on pages with inline footers or no footer**

Run: `node --test test/site-navigation.test.mjs`

Expected: FAIL on the first page without `SiteFooter`.

- [ ] **Step 3: Implement `SiteFooter` and replace inline footers**

The component groups Producto, Recursos para agentes and Proyecto. External links include `target="_blank"` only when opening another tab and always include `rel="noreferrer"`.

- [ ] **Step 4: Run the navigation test**

Run: `node --test test/site-navigation.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit the shared shell**

```bash
git add app/components/site-footer.tsx app/page.tsx app/metodologia/page.tsx app/evolucion-agentica/page.tsx app/casos/tokenizart/page.tsx app/mapa-del-sitio/page.tsx test/site-navigation.test.mjs
git commit -m "feat: unify public site shell"
```

### Task 3: Safe audit prefill and complete result disclosure

**Files:**
- Create: `lib/site-prefill.mjs`
- Create: `test/site-prefill.test.mjs`
- Modify: `app/components/scan-workspace.tsx`

**Interfaces:**
- Produces: `normalizeSitePrefill(value: unknown): string` returning a public hostname/path candidate or an empty string.
- Consumes: query parameter `site` through `window.location.search` after mount; it never starts an audit automatically.

- [ ] **Step 1: Write the failing prefill tests**

```js
test('normalizeSitePrefill accepts a public hostname and strips credentials', () => {
  assert.equal(normalizeSitePrefill('https://user:pass@example.org/path'), 'example.org/path');
});

test('normalizeSitePrefill rejects private and unsupported targets', () => {
  for (const value of ['localhost', '127.0.0.1', 'file:///tmp/a', 'javascript:alert(1)']) {
    assert.equal(normalizeSitePrefill(value), '');
  }
});
```

- [ ] **Step 2: Run the test and verify the missing module failure**

Run: `node --test test/site-prefill.test.mjs`

Expected: FAIL because `lib/site-prefill.mjs` does not exist.

- [ ] **Step 3: Implement the helper and connect it without auto-submit**

The scanner also displays all seven categories, collapsible evidence/limits, a single recommended next action and a real Agent Friendly Web reference before a scan exists.

- [ ] **Step 4: Run the focused and full tests**

Run: `node --test test/site-prefill.test.mjs`

Run: `npm test`

Expected: PASS for both commands.

- [ ] **Step 5: Commit the scanner behavior**

```bash
git add lib/site-prefill.mjs test/site-prefill.test.mjs app/components/scan-workspace.tsx
git commit -m "feat: improve public audit workflow"
```

### Task 4: Observatorio visual and maturity map

**Files:**
- Create: `app/components/maturity-map.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `test/site-navigation.test.mjs`

**Interfaces:**
- Produces: `MaturityMap` with six AF stages and one unambiguous link to `/evolucion-agentica`.
- Consumes: shared header/footer and audit result layout from previous tasks.

- [ ] **Step 1: Add a failing source contract for the six maturity stages and map component**

```js
const maturity = await readFile('app/components/maturity-map.tsx', 'utf8');
for (let stage = 0; stage <= 5; stage += 1) assert.match(maturity, new RegExp(`AF-${stage}`));
assert.match(maturity, /href="\/evolucion-agentica"/);
```

- [ ] **Step 2: Run the test and verify the missing component failure**

Run: `node --test test/site-navigation.test.mjs`

Expected: FAIL because `maturity-map.tsx` does not exist.

- [ ] **Step 3: Implement the observatory layout and responsive CSS**

Use the existing green, lime and coral identity plus a restrained functional blue. Keep cards at 8 px or less, use Lucide icons, visible focus, 42 px touch targets, stable grid dimensions and `prefers-reduced-motion`.

- [ ] **Step 4: Run tests, lint and build**

Run: `npm test`

Run: `npm run lint`

Run: `npm run build`

Expected: all commands exit 0.

- [ ] **Step 5: Commit the visual implementation**

```bash
git add app/components/maturity-map.tsx app/page.tsx app/globals.css test/site-navigation.test.mjs
git commit -m "feat: redesign public observatory"
```

### Task 5: Browser QA, self-audit and publication

**Files:**
- Modify only if QA reveals a reproduced defect: affected source and its regression test.

**Interfaces:**
- Consumes: complete public build from Tasks 1-4.
- Produces: validated Sites version and canonical deployment.

- [ ] **Step 1: Start the retained local development server**

Run: `npm run dev`

Expected: exact local URL printed and successful compilation.

- [ ] **Step 2: Verify public routes and protected redirect**

Check `/`, `/metodologia`, `/evolucion-agentica`, `/casos/tokenizart`, `/mapa-del-sitio`, `/sitemap.xml` and `/expediente`. Public routes return 200; `/expediente` redirects to authentication.

- [ ] **Step 3: Perform browser QA**

Capture and inspect the home, map, evolution and Tokenizart case at 360, 768, 1280 and 1440 px. Verify no horizontal overflow, overlap, inaccessible navigation, false buttons or console errors.

- [ ] **Step 4: Run final gates**

Run: `npm test`

Run: `npm run lint`

Run: `npm run build`

Expected: all commands exit 0.

- [ ] **Step 5: Publish with Sites and verify canonical origin**

Save and deploy a new Sites version, then verify `https://agentfriendlyweb.dev`, its sitemap, the new map and the public auditor. Re-run the self-audit and require at least 70/100 AF-3.

- [ ] **Step 6: Commit any QA-only fix and record the release SHA**

No source change is required when QA is clean. If a defect is found, add its failing regression test before the fix and commit both together.
