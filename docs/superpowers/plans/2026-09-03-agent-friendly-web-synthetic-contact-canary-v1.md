# Agent Friendly Web Synthetic Contact Canary v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Probar en el canary canonico la captura, persistencia y preparacion de revision de una solicitud sintetica sin abrir el formulario publico ni enviar correo.

**Architecture:** Un handler privado verifica frontera exacta, Access, allowlist, rate limit y contrato fijo. Deriva el fixture sintetico, reutiliza `processContactRequest`, `verifyTurnstileToken`, `saveContactIntakeToD1` y `preparePrivateReviewReadyNotification`, y devuelve solo un recibo saneado. Una UI privada genera el UUID y obtiene el token Turnstile; no acepta PII ni texto libre.

**Tech Stack:** Node.js ESM, vinext/Next routes, Cloudflare Access, Turnstile, Workers Rate Limiting y D1.

**Spec:** `docs/superpowers/specs/2026-09-03-agent-friendly-web-synthetic-contact-canary-v1-design.md`

## Global Constraints

- Trabajar solo en `tokenizartinfo-ops/agent-friendly-web` y `afw_canary`.
- Captura publica y produccion no cambian.
- Las claves oficiales de prueba Turnstile existen solo en canary.
- El email permanece deshabilitado y el nuevo flujo nunca importa ni invoca el handler de envio.
- La accion remota se limita a una solicitud sintetica, luego el kill switch vuelve a OFF.

---

### Task 1: Handler privado con TDD

**Files:**
- Create: `test/synthetic-contact-canary.test.mjs`
- Create: `lib/synthetic-contact-canary.mjs`

- [x] **Step 1: escribir pruebas fallidas de frontera, identidad, allowlist y runtime.**
- [x] **Step 2: ejecutar la prueba dirigida y observar el fallo por modulo inexistente.**
- [x] **Step 3: implementar las guardas minimas y repetir hasta verde.**
- [x] **Step 4: agregar pruebas fallidas de contrato, Turnstile, persistencia y preparacion.**
- [x] **Step 5: implementar la orquestacion minima y confirmar respuesta saneada e idempotente.**
- [x] **Step 6: comprobar por inspeccion que no importa ni invoca entrega de email.**

### Task 2: Rutas y configuracion cerrada

**Files:**
- Create: `app/api/canary/contact-intake/route.ts`
- Create: `app/canary/contact-intake/route.ts`
- Modify: `wrangler.jsonc`
- Modify: `test/cloudflare-web-config.test.mjs`
- Modify: `test/contact-surface-boundaries.test.mjs`
- Create: `test/synthetic-contact-canary-page.test.mjs`

- [x] **Step 1: escribir pruebas fallidas para bindings solo-canary, kill switch OFF y UI fija.**
- [x] **Step 2: implementar rutas y configuracion minima.**
- [x] **Step 3: verificar que produccion no recibe variables, rate limiter o rutas nuevas.**
- [x] **Step 4: ejecutar pruebas dirigidas y confirmar verde.**

### Task 3: Contrato y preflight local

**Files:**
- Create: `public/.well-known/synthetic-contact-canary-contract.json`
- Create: `docs/BLOCK-6C3D-SYNTHETIC-CONTACT-CANARY-LOCAL-2026-09-03.md`
- Modify: roadmaps y contratos que describen el estado de Gate 6C.

- [x] **Step 1: probar primero el contrato machine-readable y el estado exacto.**
- [x] **Step 2: documentar capacidades verificadas y limites sin presentarlos como publicos.**
- [x] **Step 3: ejecutar pruebas dirigidas, `npm test`, `npm run lint`, `npm run build` y dry-run canary.**
- [ ] **Step 4: revisar diff, secretos y fronteras; commit, push y CI del Draft PR.**

### Task 4: Canary remoto con una solicitud sintetica

**Resources:**
- Worker: `agent-friendly-web-web-canary`.
- D1: `agent-friendly-web-web-canary`.
- Origin: `https://canary.agentfriendlyweb.dev`.

- [ ] **Step 1: declarar frontera remota, ejecutar `wrangler whoami` y capturar baseline D1/email.**
- [ ] **Step 2: desplegar OFF y probar cierre sin cambios de datos.**
- [ ] **Step 3: habilitar temporalmente el gate sintetico, manteniendo email OFF.**
- [ ] **Step 4: ejecutar una unica captura desde la UI privada y guardar evidencia saneada.**
- [ ] **Step 5: verificar D1, consentimiento, preparacion y cero cambios en entregas de email.**
- [ ] **Step 6: restaurar OFF, verificar cierre y registrar version/rollback.**
- [ ] **Step 7: actualizar evidencia y contratos; commit, push y CI sin merge.**
