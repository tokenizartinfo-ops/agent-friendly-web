# Agent Friendly Web Block 5D GitHub Draft PR Canary v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar y probar localmente un adaptador GitHub capaz de abrir un unico Draft PR canary en un repositorio sintetico, manteniendo apagada la ejecucion remota.

**Architecture:** Un contrato puro valida el run y construye una solicitud de un archivo. Un ejecutor fail-closed recibe un cliente GitHub inyectado, verifica aprobacion y flag, y devuelve un recibo metadata-only. No se incorpora SDK, token ni ruta HTTP remota en este release.

**Tech Stack:** JavaScript ESM, Web Crypto, Node test runner.

**Spec:** `docs/superpowers/specs/2026-08-31-agent-friendly-web-block5d-github-draft-pr-canary-v1-design.md`

## Global Constraints

- Repositorio exacto: `tokenizartinfo-ops/agent-friendly-web-synthetic-origin`.
- Base exacta: `main`.
- Unico archivo: `llms.txt`.
- Draft obligatorio; merge siempre prohibido.
- Sin secretos en inputs, outputs, logs o fixtures.
- Ninguna llamada remota durante tests o este release.

---

### Task 1: Contrato y preparacion 5D

**Files:**
- Create: `test/block5d-github-draft-pr-canary.test.mjs`
- Create: `lib/github-draft-pr-canary.mjs`

**Interfaces:**
- Consumes: capsula, comparacion y `agentfriendly.draft-pr-plan.v1` aprobados.
- Produces: `prepareGitHubDraftPrCanary(input)` y `validateGitHubDraftPrCanary(run)`.

- [x] **Step 1: Write the failing test** para target exacto, un archivo, hashes, expiracion y ausencia de secretos.
- [x] **Step 2: Run test to verify it fails** con `node --test test/block5d-github-draft-pr-canary.test.mjs`.
- [x] **Step 3: Write minimal implementation** del contrato puro.
- [x] **Step 4: Run test to verify it passes**.
- [x] **Step 5: Commit** el contrato.

### Task 2: Ejecutor fail-closed y recibo

**Files:**
- Modify: `test/block5d-github-draft-pr-canary.test.mjs`
- Modify: `lib/github-draft-pr-canary.mjs`

**Interfaces:**
- Produces: `executeGitHubDraftPrCanary(run, controls)` y recibo `agentfriendly.github-draft-pr-receipt.v1`.

- [x] **Step 1: Write the failing tests** para flag apagado, aprobacion ausente, capability incorrecta, respuesta no draft, replay divergente y cliente simulado valido.
- [x] **Step 2: Run test to verify expected failures**.
- [x] **Step 3: Write minimal implementation** sin SDK ni red.
- [x] **Step 4: Run focused and full tests**.
- [x] **Step 5: Commit** el adaptador probado.

### Task 3: Gate local y siguiente consentimiento

**Files:**
- Create: `docs/BLOCK-5D-GITHUB-DRAFT-PR-CANARY-LOCAL-GATE-2026-08-31.md`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`

**Interfaces:**
- Produces: evidencia y checklist para la futura accion remota.

- [x] **Step 1: Run `npm test`, `npm run lint` and `npm run build`**.
- [x] **Step 2: Confirm no network client, token, route or enabled flag exists**.
- [x] **Step 3: Record repository, one-file boundary and approval still required**.
- [x] **Step 4: Update roadmap without claiming remote deployment**.
- [x] **Step 5: Commit** la evidencia del gate.
