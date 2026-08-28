# Agent Friendly Web Publication Capsule v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar la capsula privada, versionada y de doble consentimiento que prepara un handoff manual sin efectuar escrituras remotas.

**Architecture:** Un modulo ESM puro genera archivos allowlisted, hashes y estados. D1 conserva versiones inmutables y decisiones idempotentes. Rutas privadas derivan los roles desde identidad autenticada, y dos superficies UI muestran la misma capsula sin habilitar conectores mutantes.

**Tech Stack:** Next.js/Vinext, React 19, Node ESM, Drizzle ORM, Cloudflare D1, Node test runner.

**Spec:** `docs/superpowers/specs/2026-08-28-agent-friendly-web-publication-capsule-v1-design.md`

## Global Constraints

- El contrato es `agentfriendly.publication-capsule.v1`.
- La decision usa `agentfriendly.capsule-decision.v1`.
- El modo unico de v1 es `manual_handoff`.
- No existen escrituras remotas, secretos, ZIP firmado, merge, deploy o DNS.
- `robots` y `sitemap` solo producen propuestas `manual_merge`.
- El estado terminal positivo es `approved_for_manual_handoff`.

---

### Task 1: Domain generator and contracts

**Files:**
- Create: `lib/publication-capsule.mjs`
- Create: `test/publication-capsule.test.mjs`
- Create: `public/schemas/publication-capsule.v1.json`
- Create: `public/schemas/capsule-decision.v1.json`

**Interfaces:**
- Produces: `buildPublicationCapsule(input)`, `capsuleState(input)`, `validateCapsuleDecision(input)`.

- [x] Write failing tests for deterministic generation, resource allowlist, hashes, unsupported resources, manual merge and secret rejection.
- [x] Run the focused test and confirm RED.
- [x] Implement the minimal generator and state helpers.
- [x] Run the focused test and confirm GREEN.
- [x] Add and validate the two public JSON schemas.

### Task 2: Durable capsule and approvals

**Files:**
- Modify: `db/schema.ts`
- Create: `drizzle/0002_publication_capsules.sql`
- Modify: `drizzle/meta/_journal.json`
- Create: `test/publication-capsule-schema.test.mjs`

**Interfaces:**
- Produces: `publicationCapsules`, `capsuleApprovals`.

- [x] Write failing schema assertions for immutable versioning, manifest hash and idempotent role decisions.
- [x] Run the focused test and confirm RED.
- [x] Add the Drizzle tables and generate the migration.
- [x] Inspect migration SQL for destructive changes.
- [x] Run schema tests and confirm GREEN.

### Task 3: Authenticated capsule routes

**Files:**
- Create: `app/api/projects/[projectId]/deployment-capsules/route.ts`
- Create: `app/api/projects/[projectId]/deployment-capsules/[capsuleId]/decisions/route.ts`
- Create: `test/publication-capsule-routes.test.mjs`

**Interfaces:**
- `GET /api/projects/:projectId/deployment-capsules`
- `POST /api/projects/:projectId/deployment-capsules`
- `POST /api/projects/:projectId/deployment-capsules/:capsuleId/decisions`

- [x] Write failing source-contract tests for authentication, domain verification, role derivation, manifest hash, expiry and idempotency.
- [x] Run the focused test and confirm RED.
- [x] Implement owner-only generation and owner/maintainer review access.
- [x] Implement idempotent decisions and materialized state.
- [x] Record metadata-only project events.
- [x] Run route tests and confirm GREEN.

### Task 4: Owner and maintainer review UI

**Files:**
- Modify: `app/components/intake-workspace.tsx`
- Create: `app/capsula/[projectId]/page.tsx`
- Create: `app/components/capsule-review.tsx`
- Modify: `app/globals.css`
- Create: `test/publication-capsule-ui.test.mjs`

**Interfaces:**
- Owner creates and opens a capsule from `/expediente`.
- Owner or maintainer reviews and decides from `/capsula/:projectId`.

- [x] Write failing UI-contract tests for the explicit build action, no-write notice, file inventory, download and two approvals.
- [x] Run the focused test and confirm RED.
- [x] Add the owner entry point and dedicated review surface.
- [x] Add responsive styles following the existing comic visual language.
- [x] Run UI tests and confirm GREEN.

### Task 5: Discovery, documentation and release gate

**Files:**
- Modify: `app/mapa-del-sitio/page.tsx`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`
- Modify: `docs/A2A-DEPLOYMENT-CAPSULE-ROADMAP.es.md`
- Create: `docs/BLOCK-5A-PUBLICATION-CAPSULE-CANDIDATE-2026-08-28.md`

**Interfaces:**
- Documents the private candidate without advertising a deployed mutating connector.

- [x] Update roadmap and site map with accurate candidate status.
- [x] Document migrations, tests, limitations and rollback.
- [x] Run all tests, lint and build.
- [x] Start a local server and inspect desktop/mobile capsule surfaces.
- [x] Record verification evidence and leave production publication unauthorized.
