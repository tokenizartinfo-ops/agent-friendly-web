# Agent Friendly Web CRM Lite Local v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar un pipeline CRM local que normalice metadata minima y prepare transiciones idempotentes sin persistencia ni datos reales.

**Architecture:** Un modulo ESM puro valida la oportunidad y aplica una maquina de estados cerrada. Un contrato JSON y un acta de gate exponen el estado real sin anunciar CRM remoto.

**Tech Stack:** Node.js 22, ESM, `node:test`, JSON y Markdown.

**Spec:** `docs/superpowers/specs/2026-08-31-agent-friendly-web-crm-lite-local-v1-design.md`

## Global Constraints

- No PII, cuerpos, notas libres, adjuntos ni secretos.
- No D1, red, email, pagos, webhooks ni automatizaciones.
- No saltos de etapa ni reaperturas.
- Propuesta y estados posteriores requieren revision humana.

---

### Task 1: Normalizacion y maquina de estados

**Files:**
- Create: `test/crm-lite.test.mjs`
- Create: `lib/crm-lite.mjs`

**Interfaces:**
- Produces: `normalizeOpportunityMetadata(input)` y `planOpportunityTransition(input)`.

- [ ] **Step 1: Write failing tests** for normalization, PII rejection, canonical transitions, terminal states, loss reasons and idempotency.
- [ ] **Step 2: Run `node --test test/crm-lite.test.mjs`** and verify the missing module failure.
- [ ] **Step 3: Implement the minimal pure module** using allowlists and SHA-256 plan identifiers.
- [ ] **Step 4: Run the focused test** and verify all cases pass.
- [ ] **Step 5: Commit** the behavior.

### Task 2: Contract and governance evidence

**Files:**
- Create: `test/crm-lite-contract.test.mjs`
- Create: `public/.well-known/crm-lite-contract.json`
- Create: `docs/BLOCK-6D-CRM-LITE-LOCAL-GATE-2026-08-31.md`
- Modify: `docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`

**Interfaces:**
- Produces: truthful machine and human status `local_planning_only`.

- [ ] **Step 1: Write the failing contract and documentation test.**
- [ ] **Step 2: Run it and verify missing artifacts.**
- [ ] **Step 3: Add the contract, gate record and roadmap updates.**
- [ ] **Step 4: Run `npm test`, `npm run lint` and `npm run build`.**
- [ ] **Step 5: Review, commit, push and open a PR without deployment.**
