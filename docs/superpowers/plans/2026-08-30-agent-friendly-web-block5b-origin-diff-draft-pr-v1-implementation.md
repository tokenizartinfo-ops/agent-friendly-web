# Agent Friendly Web Block 5B Origin Diff and Draft PR v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Permitir que un owner compare una capsula vigente contra archivos publicos de su dominio y descargue un plan tecnico de Draft PR sin enviar el PR ni modificar ningun sistema externo.

**Architecture:** La logica pura vive en modulos ESM testeables: uno recupera y compara recursos allowlisted mediante `fetchLimitedPublicUrl`, otro prepara un plan Git determinista y un proveedor dry-run. Las rutas privadas derivan identidad y rol en servidor, persisten contratos acotados en D1 y la interfaz agrega revision progresiva. El proveedor GitHub real queda detras de `DRAFT_PR_REMOTE_SUBMISSION_ENABLED=false` y no hace red en este release.

**Tech Stack:** Next/Vinext, React 19, Cloudflare D1, Drizzle ORM, Node test runner, SHA-256, Sites.

**Spec:** `docs/superpowers/specs/2026-08-28-agent-friendly-web-block5b-origin-diff-draft-pr-v1-design.md`

## Global Constraints

- Solo HTTPS publico, puertos estandar, sin credenciales en URL, redirects manuales, timeout de ocho segundos y maximo 250.000 bytes.
- Rutas de origen limitadas a `/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/sitemap.xml` y `/`.
- `robots.txt`, `sitemap.xml` y JSON-LD son propuestas manuales, nunca reemplazos automaticos.
- No persistir secretos, bodies crudos ajenos al diff acotado, emails en eventos ni errores de proveedor.
- 5B.1 no crea PR remoto; 5B.2 solo prueba un proveedor simulado y conserva el flag remoto deshabilitado.
- Toda migracion remota, release Sites o GitHub App real requiere su gate correspondiente.

---

### Task 1: Contratos puros de comparacion

**Files:**
- Create: `lib/origin-comparison.mjs`
- Test: `test/origin-comparison.test.mjs`

**Interfaces:**
- Consumes: `fetchLimitedPublicUrl(url, options)` y una capsula `agentfriendly.publication-capsule.v1`.
- Produces: `compareCapsuleOrigin(capsule, dependencies?) -> Promise<agentfriendly.origin-comparison.v1>` y `validateOriginComparison(value)`.

- [x] Escribir tests fallidos para estados `missing`, `unchanged`, `changed`, `manual_review_required`, `unavailable` y `blocked`.
- [x] Ejecutar `node --test test/origin-comparison.test.mjs` y confirmar fallo por modulo ausente.
- [x] Implementar rutas allowlisted, hashes de bytes, normalizacion CRLF solo para diff, limites y secret scan fail-closed.
- [x] Ejecutar el test hasta obtener PASS.
- [x] Commit de logica y pruebas.

### Task 2: Plan de Draft PR y proveedor deshabilitado

**Files:**
- Create: `lib/draft-pr-plan.mjs`
- Create: `lib/draft-pr-provider.mjs`
- Test: `test/draft-pr-plan.test.mjs`
- Test: `test/draft-pr-provider.test.mjs`

**Interfaces:**
- Consumes: capsula y comparacion completa.
- Produces: `buildDraftPrPlan(input) -> agentfriendly.draft-pr-plan.v1`, `DryRunDraftPrProvider.prepare(plan)` y `GitHubDraftPrProvider.submit(plan)` que falla cerrado mientras el flag este apagado.

- [x] Escribir tests fallidos para repositorio `owner/name`, rama base, rutas POSIX, rama administrada, archivos manuales bajo `.agentfriendly/proposals/`, post-checks y rollback.
- [x] Agregar pruebas negativas para `..`, rutas absolutas, workflows, secretos, merge y envio remoto.
- [x] Implementar el plan determinista y los dos providers sin cliente HTTP real.
- [x] Ejecutar ambos tests hasta obtener PASS.
- [x] Commit de contratos y providers.

### Task 3: Persistencia D1 y schemas publicos

**Files:**
- Modify: `db/schema.ts`
- Create: `drizzle/0003_origin_comparisons_and_draft_pr_plans.sql`
- Create: `public/schemas/origin-comparison.v1.json`
- Create: `public/schemas/draft-pr-plan.v1.json`
- Modify: `drizzle/meta/_journal.json`
- Test: `test/block5b-schema.test.mjs`
- Test: `test/block5b-public-contracts.test.mjs`

**Interfaces:**
- Produces: tablas `capsule_origin_comparisons` y `draft_pr_plans` con indices de idempotencia y proyecto; schemas publicos cerrados con `additionalProperties: false`.

- [ ] Escribir tests fallidos que exijan tablas, indices y contratos.
- [ ] Crear migracion aditiva y modelos Drizzle sin tocar tablas previas.
- [ ] Publicar schemas que no admitan tokens, cookies ni merge.
- [ ] Ejecutar los tests de schema y contratos hasta PASS.
- [ ] Aplicar la migracion solo a D1 local de prueba y comprobar tablas vacias.
- [ ] Commit de persistencia y contratos.

### Task 4: APIs privadas, aislamiento e idempotencia

**Files:**
- Create: `app/api/projects/[projectId]/deployment-capsules/[capsuleId]/comparison/route.ts`
- Create: `app/api/projects/[projectId]/deployment-capsules/[capsuleId]/draft-pr-plan/route.ts`
- Test: `test/block5b-routes.test.mjs`

**Interfaces:**
- Consumes: identidad ChatGPT, rol derivado, capsula vigente, tablas Task 3 y modulos Tasks 1-2.
- Produces: GET/POST privados con `cache-control: no-store`, 404 para proyectos ajenos, idempotencia y downloads JSON.

- [ ] Escribir tests contractuales fallidos para identidad, rol, manifest hash, idempotencia, 404 y ausencia de envio remoto.
- [ ] Implementar GET/POST de comparacion con errores parciales saneados y eventos metadata-only.
- [ ] Implementar GET/POST del plan solo sobre comparacion completa y vigente.
- [ ] Ejecutar tests de rutas y regresiones de capsula hasta PASS.
- [ ] Commit de APIs privadas.

### Task 5: Interfaz progresiva de revision

**Files:**
- Modify: `app/components/capsule-review.tsx`
- Modify: `app/globals.css`
- Test: `test/block5b-ui.test.mjs`

**Interfaces:**
- Consumes: APIs privadas de Task 4.
- Produces: CTA `Comparar con el sitio actual`, diff accesible por archivo y formulario `Preparar borrador tecnico` con descarga marcada `No enviado`.

- [ ] Escribir test fallido para los tres pasos, estados humanos, hashes, diff, CTA exacto y ausencia de `Publicar`/`Crear PR`.
- [ ] Implementar carga, comparacion y plan con mensajes no tecnicos y errores parciales.
- [ ] Agregar estilos estables desktop/mobile y colores con texto/simbolo, no solo color.
- [ ] Ejecutar test de UI y build hasta PASS.
- [ ] Commit de interfaz.

### Task 6: Evidencia externa, documentacion y gate local

**Files:**
- Modify: `public/.well-known/agent-readiness.json`
- Modify: `public/llms-full.txt`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`
- Create: `docs/BLOCK-5B-LOCAL-GATE-2026-08-30.md`

**Interfaces:**
- Consumes: entrega completa y `docs/EXTERNAL-AUDIT-AND-EVIDENCE-REGISTRY-2026-08-30.md`.
- Produces: recibo local con comandos, resultados, limites y siguiente gate remoto separado.

- [ ] Ejecutar tests focales de Block 5B.
- [ ] Ejecutar `npm test`, `npm run lint` y `npm run build`.
- [ ] Ejecutar D1 local, negativas de red y QA visual desktop/mobile.
- [ ] Registrar estado `release_candidate`, `remote_submission=false`, migracion remota pendiente y rollback.
- [ ] Commit del recibo local.

### Task 7: Gate remoto separado

**Files:**
- Modify only after approval: `.openai/hosting.json` deployment state and `docs/BLOCK-5B-REMOTE-RELEASE-RECEIPT-2026-08-30.md`

**Interfaces:**
- Consumes: commit mergeado, D1 backup/preflight, Sites package exacto.
- Produces: migracion aditiva remota y release con `remote_submission=false`.

- [ ] Solicitar aprobacion separada para migrar D1 y publicar 5B.
- [ ] Verificar backup/rollback y tablas remotas antes de migrar.
- [ ] Aplicar solo `0003`, comprobar tablas vacias y rutas fail-closed.
- [ ] Publicar el commit exacto con Sites y ejecutar smokes privados/publicos.
- [ ] Reauditar verificadores externos declarados despues del despliegue.
