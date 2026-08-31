# Agent Friendly Web Block 5C Controlled Sandbox v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar un conector efimero que pruebe dry-run, canary, verificacion y rollback de un unico archivo sin escribir en ningun sistema externo.

**Architecture:** Un modulo ESM browser-safe valida capsula, comparacion y plan, y opera sobre un `Map` privado en memoria. La revision de capsula consume ese modulo en el cliente y presenta el recorrido como laboratorio comic ES/EN/PT. No se agregan rutas API, tablas D1, secretos ni proveedores remotos.

**Tech Stack:** JavaScript ESM, Web Crypto, React 19, TypeScript, Lucide, Node test runner, vinext.

**Spec:** `docs/superpowers/specs/2026-08-31-agent-friendly-web-block5c-controlled-sandbox-v1-design.md`

## Global Constraints

- `remoteMutation` es siempre `false`.
- Provider unico: `ephemeral_memory`; environment unico: `local_sandbox`.
- Un run escribe como maximo `/llms.txt` o `/llms-full.txt`.
- No `fetch`, filesystem, D1, cookies, storage, secretos ni credenciales.
- Capsule, comparison y plan deben compartir manifiesto y estados aprobados.
- Interfaz y mensajes completos en ES/EN/PT.

---

### Task 1: Contrato y validacion fail-closed

**Files:**
- Create: `test/block5c-controlled-connector.test.mjs`
- Create: `lib/controlled-connector.mjs`

**Interfaces:**
- Consumes: `{ capsule, comparison, plan, canaryPath }`.
- Produces: `prepareControlledConnectorRun(input) -> Promise<ControlledConnectorRun>` y `validateControlledConnectorRun(value)`.

- [ ] Escribir tests que exijan contratos, aprobaciones, manifiesto comun, path allowlisted, un archivo, hash valido y rechazo de secretos.
- [ ] Ejecutar `node --test test/block5c-controlled-connector.test.mjs` y observar fallo por modulo ausente.
- [ ] Implementar la validacion minima y el run determinista.
- [ ] Repetir el test hasta PASS.
- [ ] Commit: `feat:block5c-add-controlled-connector-contract`.

### Task 2: Adaptador de memoria, canary y rollback

**Files:**
- Modify: `test/block5c-controlled-connector.test.mjs`
- Modify: `lib/controlled-connector.mjs`

**Interfaces:**
- Consumes: run validado e initial files opcionales.
- Produces: `createEphemeralConnector(initialFiles?)` con `dryRun`, `applyCanary`, `rollback` e `inspect`.

- [ ] Agregar tests de dry-run no mutante, confirmacion obligatoria, apply de una ruta, recibo metadata-only, replay idempotente, rollback y divergencia.
- [ ] Ejecutar el test y observar fallos por API ausente.
- [ ] Implementar `Map`, backups privados, verificacion SHA-256 y recibos cerrados.
- [ ] Repetir tests hasta PASS.
- [ ] Commit: `feat:block5c-add-ephemeral-canary-rollback`.

### Task 3: Laboratorio comic privado

**Files:**
- Create: `app/components/connector-sandbox.tsx`
- Modify: `app/components/capsule-review.tsx`
- Modify: `lib/private-ui-copy.mjs`
- Modify: `app/globals.css`
- Create: `test/block5c-ui.test.mjs`

**Interfaces:**
- Consumes: capsula, comparacion completa, plan no enviado y locale.
- Produces: `ConnectorSandbox` con preparacion, dry-run, confirmacion, apply y rollback locales.

- [ ] Escribir tests de copy ES/EN/PT, importacion del modulo, cuatro pasos, confirmaciones, ausencia de fetch y limites visibles.
- [ ] Ejecutar test y observar fallo por componente ausente.
- [ ] Implementar componente y montarlo solo cuando 5B esta completo.
- [ ] Agregar CSS comic estable y responsive.
- [ ] Repetir tests hasta PASS.
- [ ] Commit: `feat:block5c-add-comic-connector-lab`.

### Task 4: Gate integral

**Files:**
- Create: `docs/BLOCK-5C-CONTROLLED-SANDBOX-LOCAL-GATE-2026-08-31.md`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`
- Modify: `docs/A2A-DEPLOYMENT-CAPSULE-ROADMAP.es.md`

**Interfaces:**
- Produces: recibo verificable y gate remoto separado.

- [ ] Ejecutar test focalizado y `npm test`.
- [ ] Ejecutar `npm run lint` y `npm run build`.
- [ ] Revisar laboratorio en Chromium a `1440x900` y `390x844`.
- [ ] Documentar resultados, limites, rollback y siguiente aprobacion.
- [ ] Commit: `docs:block5c-close-controlled-sandbox-gate`.
