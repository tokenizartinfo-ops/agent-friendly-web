# Agent Friendly Web Email Review Ready v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** implement a local-only, at-most-once internal review notification while keeping every remote email capability disabled.

**Architecture:** a pure request/template module feeds an orchestration gate with injected identity, rate-limit, D1 and email dependencies. A D1 adapter reserves each event before sending and stores only metadata hashes. A canary API adapter remains behind a false kill switch and has no committed send binding.

**Tech Stack:** Node.js 22 ESM, `node:test`, Next/vinext route handlers, Cloudflare Access, D1, Rate Limiting and Email Service.

**Spec:** `docs/superpowers/specs/2026-09-02-agent-friendly-web-email-review-ready-v1-design.md`

## Global Constraints

- Project and repository are exactly `agent-friendly-web` and `tokenizartinfo-ops/agent-friendly-web`.
- Environment and origin are exactly `afw_email_review_ready_canary` and `canary.agentfriendlyweb.dev`.
- Sender is exactly `hello@agentfriendlyweb.dev`; destination is supplied only by a fixed Cloudflare binding.
- Request bodies never accept addresses, subject, message body, HTML, headers, attachments or secrets.
- Semantics are at-most-once; no automatic retry is allowed.
- Gate 6C.3A performs no remote deploy, migration, binding, route, billing change or email send.

---

### Task 1: Request contract and localized template

**Files:**
- Create: `test/email-review-ready.test.mjs`
- Create: `lib/email-review-ready.mjs`

**Interfaces:**
- Consumes: one closed JSON object and an authenticated actor hash supplied by the caller.
- Produces: `validateEmailReviewReadyRequest(input)` and `buildEmailReviewReadyMessage(input)`.

- [x] **Step 1: Write the failing contract tests**

Assert a valid ESP request returns the fixed contract, event, template, purpose and a generated subject/text. Add literal table cases rejecting missing human approval, unknown fields, arbitrary email fields, body/HTML, invalid UUID, unsupported locale and a non-fixed purpose or template.

- [x] **Step 2: Run the test to verify RED**

Run: `node --test test/email-review-ready.test.mjs`

Expected: module-not-found for `lib/email-review-ready.mjs`.

- [x] **Step 3: Implement the minimal pure contract**

Export:

```js
export const EMAIL_REVIEW_READY_CONTRACT = 'agent-friendly-web.email-review-ready.v1';
export function validateEmailReviewReadyRequest(input = {}) {}
export function buildEmailReviewReadyMessage(input = {}) {}
```

Use exact-key allowlists and fixed translations for `es`, `en` and `pt`. The result may contain only the canonical sender, fixed template content and opaque event metadata.

- [x] **Step 4: Run the focused test to verify GREEN**

Run: `node --test test/email-review-ready.test.mjs`

Expected: all Task 1 tests pass.

### Task 2: At-most-once D1 adapter

**Files:**
- Create: `test/email-review-ready-d1.test.mjs`
- Create: `lib/email-review-ready-d1.mjs`
- Modify: `db/schema.ts`
- Create: `drizzle/0006_email_transactional_deliveries.sql`

**Interfaces:**
- Consumes: validated request plus SHA-256 actor hash.
- Produces: `reserveEmailReviewReadyDelivery(database, request, actorHash)`, `markEmailReviewReadySent(database, reservationId, providerId)` and `markEmailReviewReadyFailed(database, reservationId, code)`.

- [x] **Step 1: Write failing storage and migration tests**

Exercise a real-shaped fake D1 statement API and assert the first call inserts metadata only, same-request replay returns duplicate without insert, changed payload conflicts, event reuse cannot send twice, provider IDs are hashed and raw addresses/content never enter bindings. Apply every migration to isolated SQLite and assert the new table is empty.

- [x] **Step 2: Run the tests to verify RED**

Run: `node --test test/email-review-ready-d1.test.mjs`

Expected: module-not-found and then missing table until code and migration exist.

- [x] **Step 3: Implement schema, migration and adapter**

The migration creates `email_transactional_deliveries` with unique indexes on `event_id` and `idempotency_key`. Reserve before send; on uniqueness races re-read and classify duplicate/conflict. Updates use `WHERE status = 'reserved'` and never store raw provider errors.

- [x] **Step 4: Run focused tests to verify GREEN**

Run: `node --test test/email-review-ready-d1.test.mjs test/block5b-local-migration.test.mjs test/block6b-local-migration.test.mjs`

Expected: all focused storage and migration tests pass.

### Task 3: Canary orchestration and closed route

**Files:**
- Create: `test/email-review-ready-gate.test.mjs`
- Create: `lib/email-review-ready-gate.mjs`
- Create: `app/api/canary/email/review-ready/route.ts`
- Modify: `wrangler.jsonc`

**Interfaces:**
- Consumes: HTTP request, Access identity verifier, rate limiter, D1 adapter and `SendEmail` binding supplied by the runtime.
- Produces: `processEmailReviewReadyRequest(input, dependencies)` and a Next POST adapter.

- [x] **Step 1: Write failing orchestration tests**

Assert kill switch, identity, actor hash allowlist, exact origin, rate limit and runtime bindings all fail closed before reservation. Assert first send returns 201, replay returns 200 without calling the binding twice, provider failure records only a stable code and performs zero retries.

- [x] **Step 2: Run the test to verify RED**

Run: `node --test test/email-review-ready-gate.test.mjs`

Expected: module-not-found for `lib/email-review-ready-gate.mjs`.

- [x] **Step 3: Implement gate and route adapter**

The gate calls dependencies in this order: validate, authorize actor hash, rate limit, reserve, build template, send once, mark sent. The route reads at most 2 KiB JSON, verifies Cloudflare Access and uses `Cache-Control: no-store, private`. `AFW_EMAIL_REVIEW_READY_ENABLED` is committed as `false`; no `send_email` or remote route is added.

- [x] **Step 4: Run focused tests to verify GREEN**

Run: `node --test test/email-review-ready*.test.mjs test/cloudflare-web-config.test.mjs`

Expected: all focused tests pass and config exposes no active binding or route.

### Task 4: Public truth, gate record and branch verification

**Files:**
- Create: `public/.well-known/email-review-ready-contract.json`
- Create: `docs/BLOCK-6C3A-EMAIL-REVIEW-READY-LOCAL-GATE-2026-09-02.md`
- Modify: `public/.well-known/email-operations-contract.json`
- Modify: `docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md`
- Modify: `docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`
- Modify outside Git: `C:/Users/gabri/Obsidian/segundo cerebro tokenizart/12-AI-Agents-Hermes/Projects/Agent-Friendly-Web.md`

**Interfaces:**
- Consumes: verified local implementation and current remote evidence.
- Produces: truthful public status `transactional_case_selected_local_ready_remote_disabled` and Gate 6C.3B preconditions.

- [x] **Step 1: Write failing contract assertions**

Extend the email contract tests to require the new machine contract, at-most-once semantics, fixed binding destination, metadata-only persistence and explicit false values for remote binding, sending, automation and arbitrary recipients.

- [x] **Step 2: Run contract tests to verify RED**

Run: `node --test test/email-operations-contract.test.mjs`

Expected: failure because the new contract and status are absent.

- [x] **Step 3: Reconcile public and private documentation**

Record the selected case, architecture, limits, tests and rollback. Keep the outbound canary result intact and describe Gate 6C.3B as a future remote preflight plus one controlled canary.

- [x] **Step 4: Run complete verification**

Run:

```text
npm test
npm run lint
npm run build
git diff --check
```

Expected: tests and build exit 0, lint has no errors, and the diff check is empty.

- [ ] **Step 5: Scan, commit and update only the Draft PR**

Scan changed files for private destinations, JWTs, credentials, DKIM values, message content supplied by callers and cross-project resource names. Commit, push and update Draft PR `#49`; do not merge, deploy, migrate D1 or send email.
