# Agent Friendly Web Private Review Ready Integration v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preparar un aviso interno exclusivamente desde una solicitud privada persistida, sin leer PII ni enviar correo.

**Architecture:** Un adaptador puro valida un trigger minimo, consulta `contact_leads` mediante una sentencia D1 preparada que solo selecciona `id`, `locale` y `state`, y deriva el contrato de correo existente. No se cambia el endpoint remoto, no se migra D1 y no se invoca el proveedor.

**Tech Stack:** Node.js ESM, Cloudflare D1 prepared statements, Node test runner, vinext.

**Spec:** `docs/superpowers/specs/2026-09-03-agent-friendly-web-private-review-ready-integration-v1-design.md`

## Global Constraints

- El cambio pertenece solo a `agent-friendly-web`.
- El estado final es `prepared_not_sent`.
- El adaptador no acepta ni lee PII o contenido de mensajes.
- No hay despliegue, migracion, correo, red, reintento ni modificacion de produccion.
- Todo envio futuro conserva aprobacion humana en el momento de la accion y kill switch OFF por defecto.

---

### Task 1: Adaptador metadata-only

**Files:**
- Create: `test/private-review-ready-integration.test.mjs`
- Create: `lib/private-review-ready-integration.mjs`

**Interfaces:**
- Consumes: D1 compatible con `prepare(sql).bind(value).first()`.
- Produces: `preparePrivateReviewReadyNotification(database, trigger)`.

- [x] **Step 1: escribir pruebas fallidas para validacion, consulta minima, derivacion y fallos cerrados.**
- [x] **Step 2: ejecutar `node --test test/private-review-ready-integration.test.mjs` y confirmar `ERR_MODULE_NOT_FOUND`.**
- [x] **Step 3: implementar el adaptador minimo sin imports de red o proveedor.**
- [x] **Step 4: repetir la prueba dirigida y confirmar que pasa.**

### Task 2: Contrato y estado documental

**Files:**
- Create: `public/.well-known/private-review-ready-integration-contract.json`
- Create: `docs/BLOCK-6C3C-PRIVATE-REVIEW-READY-INTEGRATION-LOCAL-2026-09-03.md`
- Modify: `public/.well-known/email-review-ready-contract.json`
- Modify: `public/.well-known/email-operations-contract.json`
- Modify: `docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md`
- Modify: `docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`
- Modify: `test/email-operations-contract.test.mjs`

**Interfaces:**
- Consumes: comportamiento verificado de Task 1.
- Produces: estado machine-readable `private_flow_adapter_local_ready_remote_disabled`.

- [x] **Step 1: ampliar primero las pruebas del contrato publico.**
- [x] **Step 2: confirmar el fallo por contrato inexistente/capacidades ausentes.**
- [x] **Step 3: publicar contrato local y reconciliar roadmaps sin inflar capacidades.**
- [x] **Step 4: ejecutar pruebas dirigidas y confirmar que pasan.**

### Task 3: Verificacion integral y entrega

**Files:**
- Modify: solo archivos de Tasks 1 y 2 si la verificacion detecta un defecto.

**Interfaces:**
- Consumes: adaptador y contratos locales.
- Produces: commit revisable en el Draft PR existente.

- [x] **Step 1: ejecutar `npm test`.**
- [x] **Step 2: ejecutar `npm run lint`.**
- [x] **Step 3: ejecutar `npm run build` y esperar su codigo final.**
- [x] **Step 4: revisar diff, secretos y fronteras de proyecto.**
- [ ] **Step 5: commit, push y verificar CI del Draft PR sin merge.**
