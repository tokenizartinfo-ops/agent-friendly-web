# Agent Friendly Web Production Cutover v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move `agentfriendlyweb.dev` from Sites to the verified Cloudflare-native Worker with a tested, bounded rollback.

**Architecture:** Create production-only D1, Worker and Access resources without public traffic, expose the exact production candidate through an Access-protected release hostname, test detach/reattach there, then perform an apex custom-domain switch while retaining the Sites binding and DNS snapshot for immediate rollback.

**Tech Stack:** Next.js 16, Vinext, Vite 8, Cloudflare Workers, D1, Cloudflare Access, Wrangler 4, Node 24, `node:test`.

**Spec:** `docs/CLOUDFLARE-NATIVE-PRODUCTION-CUTOVER-SPEC-V1.md`

## Global Constraints

- The only public target is `https://agentfriendlyweb.dev`.
- `release.agentfriendlyweb.dev` is temporary, Access-protected and never linked publicly.
- Tokenizart resources and `*.chatgpt.site` are forbidden targets.
- Contact writes, email, CRM, payments and transactional protocols remain disabled.
- The Sites custom-domain binding and validation TXT remain available during the initial stability window.
- Every remote mutation must be preceded by an exact metadata preflight and followed by a bounded read-only verification.

---

### Task 1: Encode the production cutover contract

**Files:**
- Create: `test/cloudflare-native-production-preflight.test.mjs`
- Create: `scripts/preflight-cloudflare-native-production.mjs`
- Create: `docs/evidence/cloudflare-native-production-cutover-metadata.json`
- Modify: `package.json`

**Interfaces:**
- Produces: `validateProductionCutoverPreflight(metadata)` and CLI report `agentfriendly.cloudflare-native-production-cutover.v1`.

- [ ] Write tests that accept only AFW production metadata with exact origin, Worker, D1, Access, Sites rollback and DNS snapshot fields.
- [ ] Run the focused test and confirm it fails because the production validator does not exist.
- [ ] Implement the validator with no network calls or mutations.
- [ ] Add `web:preflight:production` and verify the initial metadata fails closed while resource IDs are absent.
- [ ] Run focused tests and commit the contract.

### Task 2: Add public-edge and origin-comparison smokes

**Files:**
- Modify: `scripts/smoke-cloudflare-native-local.mjs`
- Modify: `test/cloudflare-native-parity.test.mjs`
- Create: `scripts/compare-cloudflare-native-public-origin.mjs`
- Create: `test/cloudflare-native-origin-comparison.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: smoke mode `public-edge` and `comparePublicOrigins({ baselineUrl, candidateUrl, fetchImpl })`.

- [ ] Write a failing smoke test requiring public routes to return their expected MIME and private routes to be intercepted by Cloudflare Access.
- [ ] Write failing comparison tests for status, content type, semantic markers, bounded size and explicit expected additions.
- [ ] Run both focused test files and confirm expected failures.
- [ ] Implement the minimal bounded modes without accepting arbitrary private hosts or credentials.
- [ ] Add `web:smoke:production` and `web:compare:cutover` scripts.
- [ ] Run focused and complete tests and commit the smoke layer.

### Task 3: Prepare production configuration

**Files:**
- Modify: `wrangler.jsonc`
- Modify: `package.json`
- Modify: `test/cloudflare-web-config.test.mjs`

**Interfaces:**
- Consumes: real production D1 ID and Access audience.
- Produces: deploy and migration commands scoped only to `--env production`, with no route in source.

- [ ] Extend structural tests to reject placeholder production IDs, enabled diagnostics, public routes in source or cross-project bindings.
- [ ] Run the focused test and confirm it fails on placeholders.
- [ ] Create the isolated production D1 and Access release application, then insert only their non-secret IDs.
- [ ] Add `web:d1:migrations:production`, `web:deploy:production` and `web:deploy:production:dry-run`.
- [ ] Generate Worker types and run focused tests and dry-run.
- [ ] Commit production configuration and metadata.

### Task 4: Deploy and verify the protected production release

**Files:**
- Modify: `docs/evidence/cloudflare-native-production-cutover-metadata.json`
- Create: `docs/CLOUDFLARE-NATIVE-PRODUCTION-RELEASE-GATE.md`

**Interfaces:**
- Produces: deployed production Worker, migrated empty D1 and `release.agentfriendlyweb.dev` behind Access.

- [ ] Apply all D1 migrations and record the migration receipts.
- [ ] Query all thirteen functional tables and verify zero rows and zero writes.
- [ ] Deploy the production Worker without an apex domain and record deployment/version IDs.
- [ ] Attach the release custom domain only after Access is active for the exact hostname.
- [ ] Run anonymous Access smoke, authenticated HTML QA and desktop/mobile QA.
- [ ] Update metadata and run production preflight.

### Task 5: Prove rollback and compare origins

**Files:**
- Modify: `docs/CLOUDFLARE-NATIVE-PRODUCTION-RELEASE-GATE.md`
- Modify: `docs/evidence/cloudflare-native-production-cutover-metadata.json`

**Interfaces:**
- Produces: detach/reattach receipt and bounded comparison of Sites versus the production candidate.

- [ ] Record the release custom-domain ID and exact Worker service.
- [ ] Detach the release domain and verify it no longer serves the Worker.
- [ ] Reattach it to the same Worker and verify Access intercepts every representative route.
- [ ] Run the origin comparison against the current public origin and the authenticated production candidate, recording intended differences.
- [ ] Requery D1 and verify no rows were written.
- [ ] Mark rollback proof and comparison complete in metadata.

### Task 6: Execute and verify the apex cutover

**Files:**
- Create: `docs/CLOUDFLARE-NATIVE-PRODUCTION-CUTOVER-RECEIPT.md`
- Modify: `docs/evidence/cloudflare-native-production-cutover-metadata.json`
- Modify: `public/.well-known/infrastructure-status.json`
- Modify: public discovery and OKF sources that describe the runtime state.

**Interfaces:**
- Produces: public Cloudflare-native origin with private paths protected and Sites retained only as rollback evidence.

- [ ] Re-run the full local verification and production preflight.
- [ ] Add exact apex private destinations to the existing Access application.
- [ ] Delete only the two snapshotted Sites A records and attach the apex to the production Worker.
- [ ] Run public-edge smoke, machine-resource checks, TLS/DNS checks and responsive browser QA.
- [ ] Requery D1 and verify zero unintended writes.
- [ ] If any critical check fails, execute the documented rollback immediately and record the failure honestly.
- [ ] If checks pass, publish the updated infrastructure status and regenerate/validate OKF.

### Task 7: Integrate and hold the legacy return path

**Files:**
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`
- Modify: `docs/PROJECT-RESOURCE-BOUNDARY-AUDIT-2026-09-01.md`
- Modify: `docs/CLOUDFLARE-NATIVE-ORIGIN-SPEC-V1.md`

**Interfaces:**
- Produces: reviewed repository truth matching the deployed runtime.

- [ ] Run tests, lint, compatibility, build, production dry-run and `git diff --check`.
- [ ] Create a PR against `main` and wait for CI.
- [ ] Merge only with green CI and verify `main` again.
- [ ] Keep the Sites binding and validation TXT during the initial stability window; do not delete the Sites project in this task.
- [ ] Record the later retirement decision as a separate operational receipt.

