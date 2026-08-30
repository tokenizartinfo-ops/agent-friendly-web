# Agent Friendly Web External Readiness Gate v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar un primer gate de verificacion externa honesto que corrija Markdown, ARD y WebMCP read-only, publique evidencia AF-EV y preserve DNS, OAuth, A2A y pagos como gates separados.

**Architecture:** La portada negociara Markdown mediante `proxy.ts` y un route handler dedicado. Los manifiestos ARD seran archivos publicos estaticos y la pagina registrara una tool WebMCP local que reutiliza `/api/scan`. AF-EV sera una fotografia declarativa versionada y descubrible, no una dependencia runtime del auditor propio.

**Tech Stack:** Node.js 22+, Vinext/Next App Router, React 19, Cloudflare Workers, JSON/Markdown, Node test runner.

**Spec:** `docs/CLOUDFLARE-EXTERNAL-READINESS-BASELINE-2026-08-30.md` y `docs/superpowers/specs/2026-08-28-agent-friendly-web-block5b-origin-diff-draft-pr-v1-design.md`

## Global Constraints

- No desplegar ni modificar DNS, OAuth, A2A, pagos, billing o credenciales.
- No afirmar 100%, certificacion, indexacion, ranking o recomendacion.
- Mantener AF-0 a AF-5 separado de AF-EV.
- Cada capacidad marcada `deployed` debe existir y tener una prueba real.
- WebMCP permanece experimental y solo registra una tool publica read-only.
- Usar TDD: cada cambio de comportamiento empieza con una prueba fallida.

---

### Task 1: Contrato AF-EV y baseline publico

**Files:**
- Create: `public/.well-known/external-readiness.json`
- Test: `test/external-readiness.test.mjs`
- Modify: `public/.well-known/agent-readiness.json`

**Interfaces:**
- Produces: `agent-friendly-web.external-readiness.v1` con `observations[]`, checks y limites.

- [x] Escribir una prueba que exija proveedor, fecha, 53/100, Level 2, estado `baseline`, URL y separacion AF-5/AF-EV.
- [x] Ejecutar `node --test test/external-readiness.test.mjs` y confirmar fallo por archivo ausente.
- [x] Crear el manifiesto minimo y actualizar readiness sin cambiar capacidades no desplegadas.
- [x] Repetir la prueba y confirmar PASS.

### Task 2: Manifiestos ARD compatibles

**Files:**
- Modify: `public/.well-known/ai-catalog.json`
- Create: `public/.well-known/ard.json`
- Modify: `lib/scanner.mjs`
- Modify: `test/scanner.test.mjs`
- Modify: `test/agent-discovery.test.mjs`
- Modify: `test/cli-public-discovery.test.mjs`
- Modify: `test/public-guide-discovery.test.mjs`
- Modify: `test/public-mcp-discovery.test.mjs`
- Modify: `test/publication-capsule-discovery.test.mjs`

**Interfaces:**
- Produces: catalogos con `specVersion: "1.0"`, `host` y `entries[]`.
- Consumes: `matchesResource(probe, "aiCatalog")`, compatible con `entries` y el formato historico `resources`.

- [x] Escribir pruebas que exijan los campos ARD, URN `urn:air:agentfriendlyweb.dev:*`, URLs HTTPS y equivalencia de ambos manifiestos.
- [x] Ejecutar las pruebas y confirmar fallo por falta de `specVersion`/`entries`.
- [x] Migrar los catalogos y ampliar el parser para aceptar ARD y legado.
- [x] Actualizar las pruebas de descubrimiento para leer `entries[].url`.
- [x] Ejecutar las pruebas afectadas y confirmar PASS.

### Task 3: Negociacion Markdown propia

**Files:**
- Create: `lib/markdown-negotiation.mjs`
- Create: `app/index.md/route.ts`
- Modify: `proxy.ts`
- Test: `test/markdown-negotiation.test.mjs`

**Interfaces:**
- Produces: `acceptsMarkdown(accept: unknown): boolean` y `GET(): Response` con `text/markdown; charset=utf-8`.
- Consumes: header `Accept`; reescribe solo `/` hacia `/index.md` y establece `Vary: Accept`.

- [x] Escribir pruebas de quality values, wildcard, HTML preferido, route body, cache y `Vary`.
- [x] Ejecutar y confirmar fallo porque helper/route no existen.
- [x] Implementar parser minimo, route Markdown canonico y rewrite en `proxy.ts`.
- [x] Ejecutar la prueba y confirmar PASS.

### Task 4: WebMCP publico read-only

**Files:**
- Create: `lib/public-webmcp.mjs`
- Create: `app/components/public-webmcp-registration.tsx`
- Modify: `app/page.tsx`
- Test: `test/public-webmcp.test.mjs`

**Interfaces:**
- Produces: `createPublicAuditWebMcpTool({ fetchImpl })` con nombre `afw.audit_public_site`.
- Consumes: `POST /api/scan` y devuelve texto JSON saneado; no persiste ni muta.

- [x] Escribir pruebas de schema, URL requerida, llamada a `/api/scan`, error saneado y ausencia de acciones mutantes.
- [x] Ejecutar y confirmar fallo porque el modulo no existe.
- [x] Implementar la factory y el componente con feature detection, `AbortController` y cleanup.
- [x] Montar el componente en la portada sin UI visible ni efectos cuando WebMCP no existe.
- [x] Ejecutar la prueba y confirmar PASS.

### Task 5: Descubrimiento humano y machine-readable

**Files:**
- Create: `app/verificacion-externa/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/components/site-footer.tsx`
- Modify: `app/mapa-del-sitio/page.tsx`
- Modify: `public/llms.txt`
- Modify: `public/llms-full.txt`
- Modify: `public/.well-known/agent-readiness.json`
- Test: `test/external-readiness.test.mjs`

**Interfaces:**
- Produces: pagina `/verificacion-externa`, enlaces `rel="ard"`, `rel="alternate"` y recursos AF-EV descubribles.

- [x] Ampliar la prueba para exigir pagina, sitemap, footer, llms y enlaces de metadata.
- [x] Ejecutar y confirmar fallo por superficies ausentes.
- [x] Implementar la pagina y enlaces sin mostrar el baseline como puntaje propio actual.
- [x] Ejecutar la prueba y confirmar PASS.

### Task 6: Verificacion integral y gate de release

**Files:**
- Modify: `docs/CLOUDFLARE-EXTERNAL-READINESS-BASELINE-2026-08-30.md` solo si las pruebas revelan una discrepancia.

**Interfaces:**
- Produces: candidato local EV-1; no produce deployment.

- [x] Ejecutar `npm test`.
- [x] Ejecutar `npm run lint`.
- [x] Ejecutar `npm run build`.
- [x] Iniciar servidor local y verificar `GET /` en HTML y con `Accept: text/markdown`.
- [x] Verificar que `/.well-known/ai-catalog.json`, `/.well-known/ard.json` y `/.well-known/external-readiness.json` responden JSON.
- [x] Revisar `git diff --check` y `git status --short`.
- [x] No desplegar. Solicitar gate separado para release y reauditoria externa posterior.
