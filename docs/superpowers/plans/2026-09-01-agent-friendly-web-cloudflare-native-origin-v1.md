# Agent Friendly Web Cloudflare-native Origin v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move Agent Friendly Web from Sites to a Cloudflare-native Vinext Worker without changing the public origin until parity and rollback are proven.

**Architecture:** Keep the existing public origin stable while replacing the Sites Vite plugin and Sites identity with repository-owned Wrangler configuration and Cloudflare Access JWT verification. Build and test locally first, then prepare an isolated Access-protected canary; the public custom-domain cutover is a separate final gate.

**Tech Stack:** Next.js 16, Vinext, Vite 8, Cloudflare Workers, Cloudflare Access, D1, Drizzle ORM, Node 22, `node:test`, Wrangler.

**Spec:** `docs/CLOUDFLARE-NATIVE-ORIGIN-SPEC-V1.md`

## Global Constraints

- `https://agentfriendlyweb.dev` is the only canonical public origin.
- No `*.chatgpt.site` surface may be deployed, restored, linked or used as staging.
- Tokenizart resources are forbidden targets.
- Historical release receipts remain unchanged.
- Private routes fail closed without a verified Cloudflare Access actor.
- No public DNS or traffic change occurs before parity and rollback gates pass.

---

### Task 1: Guard the hosting boundary

**Files:**
- Create: `test/cloudflare-native-hosting.test.mjs`
- Modify: `vite.config.ts`
- Modify: `package.json`
- Delete: `.openai/hosting.json`

**Interfaces:**
- Produces: a build configuration with no Sites plugin or Sites project metadata.

- [ ] Write a failing test that rejects `@openai/sites-vite-plugin`, `.openai/hosting.json`, `oai-authenticated-*` runtime headers and active `*.chatgpt.site` contact origins.
- [ ] Run the focused test and confirm it fails for the legacy configuration.
- [ ] Remove the Sites plugin, capability file and dependency.
- [ ] Run the focused test and the complete suite.
- [ ] Commit the hosting boundary.

### Task 2: Replace Sites identity with Cloudflare Access

**Files:**
- Create: `app/cloudflare-access-auth.ts`
- Modify: all private pages and `/api/projects/*` routes.
- Delete: `app/chatgpt-auth.ts`
- Modify: identity contract tests.

**Interfaces:**
- Produces: `getCloudflareAccessUser()` and `requireCloudflareAccessUser()` returning `{ userId, email, displayName }` only after JWT verification.

- [ ] Write failing tests for missing, invalid and valid Access identities and for absence of `oai-authenticated-*` references.
- [ ] Run the focused tests and confirm the expected failures.
- [ ] Implement Access identity using the existing bounded JWT verifier and Worker environment bindings.
- [ ] Rename route imports and preserve fail-closed ownership filters.
- [ ] Run identity tests and the complete suite.
- [ ] Commit the identity migration.

### Task 3: Add Cloudflare-native Worker configuration

**Files:**
- Create: `wrangler.jsonc`
- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `test/cloudflare-web-config.test.mjs`

**Interfaces:**
- Produces: local, canary and production configuration with separate D1 bindings and no routes enabled by default in source.

- [ ] Write a failing structural test for Worker name, compatibility flags, D1 isolation, Access variables and disabled automatic route cutover.
- [ ] Run the focused test and confirm the configuration is missing.
- [ ] Add the Wrangler configuration and scripts for local preview, build and dry-run only.
- [ ] Run `wrangler types`, focused tests and `wrangler deploy --dry-run`.
- [ ] Commit the Worker configuration.

### Task 4: Reconcile the retired contact surface

**Files:**
- Modify: `wrangler.contact.jsonc`
- Modify: contact Worker tests and policy fixtures.
- Modify: active roadmap/status documents.

**Interfaces:**
- Produces: an OFF contact frontier that references only an own-domain canary and cannot accept writes.

- [ ] Write a failing test that rejects operational `*.chatgpt.site` origins.
- [ ] Run the focused test and confirm the legacy origin is detected.
- [ ] Point disabled fixtures at `canary.agentfriendlyweb.dev` and preserve writes OFF.
- [ ] Run contact tests and the complete suite.
- [ ] Commit contact reconciliation.

### Task 5: Verify local parity

**Files:**
- Create: `scripts/smoke-cloudflare-native-local.mjs`
- Create: `test/cloudflare-native-parity.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: a repeatable smoke covering public HTML, machine resources, APIs and private fail-closed behavior.

- [ ] Write a failing parity contract for representative public and private routes.
- [ ] Implement the bounded local smoke.
- [ ] Run tests, lint, build, Vinext compatibility check and Wrangler dry-run.
- [ ] Record exact results in a local gate receipt.
- [ ] Commit local parity evidence.

### Task 6: Prepare, but do not activate, the own-domain canary

**Files:**
- Create: `docs/CLOUDFLARE-NATIVE-CANARY-RUNBOOK-V1.md`
- Create: `scripts/preflight-cloudflare-native-canary.mjs`
- Create: `test/cloudflare-native-canary-preflight.test.mjs`

**Interfaces:**
- Produces: a metadata-only preflight requiring explicit resource IDs, Access application, D1 backup state, rollback target and zero public traffic.

- [ ] Test that preflight fails without every required boundary value.
- [ ] Implement metadata-only validation with no Cloudflare mutation.
- [ ] Document exact creation, migration, smoke and rollback commands.
- [ ] Run preflight in dry-run mode and commit the evidence.

### Task 7: Final remote cutover gate

**Files:**
- Create after canary: `docs/CLOUDFLARE-NATIVE-PRODUCTION-CUTOVER-RECEIPT.md`

**Interfaces:**
- Consumes: successful canary, Access tests, empty/approved data migration, origin comparison and rollback proof.
- Produces: the Cloudflare-native `agentfriendlyweb.dev` origin and retired Sites binding.

- [ ] Confirm project, repository, environment, origin, resource IDs, allowed action and rollback.
- [ ] Verify canary parity and Access fail-closed behavior.
- [ ] Attach the Worker to `agentfriendlyweb.dev` with the previous origin recorded.
- [ ] Run public, machine-readable, mobile and external-agent audits.
- [ ] Remove Sites remotes and archive legacy projects only after the new origin is stable.
- [ ] Record the exact Worker version, D1 IDs, Access application, checks and rollback result.
