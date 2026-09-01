# Agent Friendly Web Email Routing and Draft Control v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar una politica local determinista que clasifique metadata de correo y prepare planes de borrador sin enviar, persistir ni configurar infraestructura remota.

**Architecture:** Un modulo ESM puro valida y normaliza metadata minima, aplica routing y consentimiento, y devuelve un plan inmutable de borrador. Un contrato JSON publico declara el estado real de la capacidad y tests Node verifican comportamiento y claims.

**Tech Stack:** Node.js 22, ESM, `node:test`, JSON estatico y Markdown.

**Spec:** `docs/superpowers/specs/2026-08-31-agent-friendly-web-email-routing-draft-control-v1-design.md`

## Global Constraints

- No crear DNS, casillas, routing, proveedor, secretos, persistencia ni envio.
- No aceptar cuerpos, HTML, adjuntos, mensajes crudos ni secretos.
- Toda salida usa `draft_only` y niega envio automatico.
- Marketing requiere consentimiento separado.
- Asuntos sensibles requieren revision humana.

---

### Task 1: Politica determinista de routing y borradores

**Files:**
- Create: `test/email-operations.test.mjs`
- Create: `lib/email-operations.mjs`

**Interfaces:**
- Produces: `normalizeEmailPlanningInput(input)` y `prepareEmailDraftPlan(input)`.

- [ ] **Step 1: Write the failing tests** for aliases, inbound `no-reply`, forbidden content, consent, sensitive review and idempotency.
- [ ] **Step 2: Run `node --test test/email-operations.test.mjs`** and confirm failure because the module does not exist.
- [ ] **Step 3: Implement the minimal pure module** with allowlists, stable normalization and a deterministic plan ID.
- [ ] **Step 4: Run `node --test test/email-operations.test.mjs`** and confirm all focused tests pass.
- [ ] **Step 5: Commit** the tested behavior.

### Task 2: Public machine-readable status

**Files:**
- Create: `test/email-operations-contract.test.mjs`
- Create: `public/.well-known/email-operations-contract.json`

**Interfaces:**
- Produces: public status `planned_draft_only` with candidate addresses and blocked actions.

- [ ] **Step 1: Write the failing contract test** requiring truthful status and boundaries.
- [ ] **Step 2: Run the focused test** and confirm failure because the contract is absent.
- [ ] **Step 3: Add the minimal JSON contract** without claiming deployed mail.
- [ ] **Step 4: Run the focused test** and confirm it passes.
- [ ] **Step 5: Commit** the contract.

### Task 3: Governance and roadmap evidence

**Files:**
- Create: `docs/BLOCK-6C-EMAIL-ROUTING-DRAFT-LOCAL-GATE-2026-08-31.md`
- Modify: `docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md`
- Modify: `docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`

**Interfaces:**
- Consumes: test results and contract from Tasks 1-2.
- Produces: an auditable local gate and explicit remote prerequisites.

- [ ] **Step 1: Add a failing documentation assertion** to the contract test.
- [ ] **Step 2: Run the focused test** and confirm the missing gate evidence.
- [ ] **Step 3: Update the four documents** with actual local state and remote prohibitions.
- [ ] **Step 4: Run focused and full verification**: `npm test`, `npm run lint`, `npm run build`.
- [ ] **Step 5: Review the diff, commit, push and open a PR** without deploying it.
