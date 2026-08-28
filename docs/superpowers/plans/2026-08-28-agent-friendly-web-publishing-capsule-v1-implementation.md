# Agent Friendly Web Publishing Capsule v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the local, non-publishing foundation for a signed Agent Friendly Web publication capsule, double-consent state transitions, and a Draft PR plan that cannot merge or contact GitHub.

**Architecture:** A focused capsule module will normalize public text files, enforce an explicit route allowlist, calculate SHA-256 digests, sign and verify immutable payloads with Ed25519, and derive idempotency keys. A separate state module will validate domain, owner, and maintainer events without mutating the signed capsule. A Draft PR adapter will consume only a verified capsule in `maintainer_approved` state and return an offline, reversible plan; it will not perform network calls, install a GitHub App, create branches, open pull requests, or merge code.

**Tech Stack:** Node.js 22 built-ins (`node:crypto`), ECMAScript modules, JSON Schema draft 2020-12, Node test runner.

**Spec:** `docs/superpowers/specs/2026-08-26-agent-friendly-registry-and-publishing-bridge-v1-design.md`

## Global Constraints

- The capsule contract is `agentfriendly.publication-capsule.v1`.
- Owner and maintainer approvals are separate metadata-only events bound to the capsule digest.
- No password, cookie, API key, private key, token, connection string, or credential-like value may enter capsule content, logs, receipts, or errors.
- Only UTF-8 public text assets on the explicit route allowlist are accepted.
- Every file receives SHA-256; the capsule receives a deterministic digest and idempotency key.
- The signed capsule is immutable; status is a projection of append-only events.
- No state transition may jump from `draft` to `applying`.
- The Draft PR adapter is plan-only: `draft: true`, `auto_merge: false`, no network, no local writes, and no repository mutation.
- No D1 migration, Worker binding, secret, DNS, billing, production deployment, GitHub App installation, WordPress plugin, or remote publication is included.
- Before completion run `npm test`, `npm run lint`, `npm run build`, and `npm audit --omit=dev`.

---

### Task 1: Immutable publication capsule

**Files:**
- Create: `lib/publication-capsule.mjs`
- Create: `test/publication-capsule.test.mjs`
- Create: `public/schemas/publication-capsule.v1.json`

**Interfaces:**
- Produces: `buildPublicationCapsule(input, options)`, `signPublicationCapsule(capsule, privateKey, options)`, `verifyPublicationCapsule(capsule, publicKey, options)`, `publicationIdempotencyKey(capsule)`, `PUBLICATION_CAPSULE_CONTRACT`, `DEFAULT_PUBLICATION_PATHS`.
- Capsule input uses `domain`, `environment`, `owner_ref`, `maintainer_ref`, `mode`, `created_at`, `expires_at`, and `files[]` with `path`, `operation`, `media_type`, `content`, and optional `previous_sha256`.

- [ ] **Step 1: Write failing tests for deterministic hashes, signatures, limits, and secret rejection**

```js
test("builds and verifies an immutable signed capsule", () => {
  const capsule = buildPublicationCapsule(validInput, { now: NOW });
  const signed = signPublicationCapsule(capsule, privateKey, { keyId: "test-key" });
  assert.equal(verifyPublicationCapsule(signed, publicKey, { now: NOW }).valid, true);
  assert.match(publicationIdempotencyKey(signed), /^sha256:/);
});

test("rejects traversal, non-allowlisted routes, secrets and expired capsules", () => {
  assert.throws(() => buildPublicationCapsule(secretInput, { now: NOW }), /contenido sensible/i);
  assert.throws(() => buildPublicationCapsule(traversalInput, { now: NOW }), /ruta/i);
});
```

- [ ] **Step 2: Run the capsule tests and confirm they fail because the module does not exist**

Run: `node --test test/publication-capsule.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 3: Implement canonical serialization, SHA-256, bounds, Ed25519 signing, verification, and idempotency**

The implementation must:

```js
export const PUBLICATION_CAPSULE_CONTRACT = "agentfriendly.publication-capsule.v1";
export const DEFAULT_PUBLICATION_PATHS = Object.freeze([
  "/llms.txt",
  "/llms-full.txt",
  "/robots.txt",
  "/sitemap.xml",
  "/openapi.json",
  "/ai-catalog.json",
  "/.well-known/mcp.json",
]);
```

- reject duplicate paths, delete without a previous hash, unsupported media types, files above 128 KiB, bundles above 512 KiB, TTL outside 1 minute to 14 days, and credential-like text;
- derive `capsule_id` from the canonical payload digest;
- keep the private key outside the capsule and all output;
- verify file hashes, capsule digest, signature, expiry, and contract without echoing content in errors.

- [ ] **Step 4: Run the capsule tests and confirm they pass**

Run: `node --test test/publication-capsule.test.mjs`

Expected: PASS.

- [ ] **Step 5: Add and validate the strict JSON Schema**

The schema must set `additionalProperties: false`, enumerate modes and operations, constrain SHA-256 and timestamps, and require a detached Ed25519 signature for a signed capsule.

- [ ] **Step 6: Commit the capsule contract**

```bash
git add lib/publication-capsule.mjs test/publication-capsule.test.mjs public/schemas/publication-capsule.v1.json
git commit -m "feat: add signed publication capsule contract"
```

### Task 2: Double-consent state machine

**Files:**
- Create: `lib/publication-consent.mjs`
- Create: `test/publication-consent.test.mjs`
- Create: `public/schemas/publication-approval.v1.json`

**Interfaces:**
- Consumes: capsule digest, capsule ID, owner and maintainer references from Task 1.
- Produces: `createPublicationEvent(capsule, input, options)`, `projectPublicationState(capsule, events, options)`, `PUBLICATION_EVENT_CONTRACT`, `PUBLICATION_STATES`.

- [ ] **Step 1: Write failing tests for the canonical path and forbidden state jumps**

```js
test("requires domain, owner and maintainer consent in order", () => {
  const state = projectPublicationState(capsule, approvedEvents, { now: NOW });
  assert.equal(state.status, "maintainer_approved");
});

test("cannot jump from draft to applying or reuse another capsule approval", () => {
  assert.throws(() => createPublicationEvent(capsule, applyingEvent, { currentState: "draft" }), /transicion/i);
  assert.throws(() => projectPublicationState(capsule, foreignApproval, { now: NOW }), /capsula/i);
});
```

- [ ] **Step 2: Run the consent tests and confirm RED**

Run: `node --test test/publication-consent.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 3: Implement append-only, metadata-only events and deterministic projection**

Allowed forward path:

```text
draft -> domain_verification_pending -> owner_verified -> owner_approved
-> maintainer_pending -> maintainer_approved -> applying -> applied -> verified
```

Exceptional transitions:

- `applied -> verification_failed -> rolled_back`;
- any non-terminal pre-application state may become `revoked` or `expired`;
- expiry is calculated from the signed capsule and cannot be extended by an event.

Every event must contain only event ID, capsule ID/digest, actor reference, role, action, scopes, timestamp, and optional bounded reason. It must never contain file content or credentials.

- [ ] **Step 4: Run consent tests and confirm GREEN**

Run: `node --test test/publication-consent.test.mjs`

Expected: PASS.

- [ ] **Step 5: Add strict approval/event schema and commit**

```bash
git add lib/publication-consent.mjs test/publication-consent.test.mjs public/schemas/publication-approval.v1.json
git commit -m "feat: enforce publication double consent"
```

### Task 3: Offline Draft PR adapter

**Files:**
- Create: `lib/draft-pr-adapter.mjs`
- Create: `test/draft-pr-adapter.test.mjs`
- Create: `public/schemas/draft-pr-plan.v1.json`

**Interfaces:**
- Consumes: a verified signed capsule and a projected `maintainer_approved` state.
- Produces: `buildDraftPrPlan(capsule, context, options)`, `DRAFT_PR_PLAN_CONTRACT`.

- [ ] **Step 1: Write failing tests for plan-only behavior and fail-closed gates**

```js
test("creates a deterministic Draft PR plan without executing it", () => {
  const plan = buildDraftPrPlan(signedCapsule, approvedContext, { publicKey, now: NOW });
  assert.equal(plan.draft, true);
  assert.equal(plan.auto_merge, false);
  assert.equal(plan.executed, false);
  assert.deepEqual(plan.touched_paths, ["llms.txt"]);
});

test("rejects missing maintainer consent and out-of-scope repository paths", () => {
  assert.throws(() => buildDraftPrPlan(signedCapsule, ownerOnlyContext, { publicKey, now: NOW }), /mantenedor/i);
});
```

- [ ] **Step 2: Run the adapter tests and confirm RED**

Run: `node --test test/draft-pr-adapter.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 3: Implement a deterministic, non-networking plan**

The plan must include:

```js
{
  contract: "agentfriendly.draft-pr-plan.v1",
  draft: true,
  auto_merge: false,
  executed: false,
  branch: "afw/capsule-<digest-prefix>",
  base_branch: "main",
  changes: [],
  post_checks: [],
  rollback: { strategy: "revert_pull_request", touched_paths: [] }
}
```

Repository identifiers must match `owner/repo`; base branches and file paths must reject traversal and control characters. The adapter must not import `fetch`, Octokit, Wrangler, shell, or filesystem write APIs.

- [ ] **Step 4: Run adapter tests and confirm GREEN**

Run: `node --test test/draft-pr-adapter.test.mjs`

Expected: PASS.

- [ ] **Step 5: Add the strict plan schema and commit**

```bash
git add lib/draft-pr-adapter.mjs test/draft-pr-adapter.test.mjs public/schemas/draft-pr-plan.v1.json
git commit -m "feat: add offline draft pr publication plan"
```

### Task 4: Gate documentation and roadmap alignment

**Files:**
- Create: `docs/BLOCK-5A-PUBLISHING-CAPSULE-GATE-2026-08-28.md`
- Modify: `docs/A2A-DEPLOYMENT-CAPSULE-ROADMAP.es.md`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`
- Create: `test/publication-capsule-docs.test.mjs`

**Interfaces:**
- Documents the candidate status without declaring a deployment or active connector.

- [ ] **Step 1: Write a failing documentation contract test**

The test must require the three public schema paths, the explicit phrases `sin publicacion remota`, `doble consentimiento`, `Draft PR`, `sin merge automatico`, and roadmap status `Bloque 5A - capsula local: candidato verificado`.

- [ ] **Step 2: Run the documentation test and confirm RED**

Run: `node --test test/publication-capsule-docs.test.mjs`

Expected: FAIL because the gate document and status do not exist.

- [ ] **Step 3: Document the implemented boundary and remaining gates**

The gate must distinguish:

- implemented locally: contracts, hashes, signatures, consent projection, Draft PR plan;
- not implemented: remote GitHub App, PR creation, WordPress plugin, CMS writes, secrets, D1 persistence, production deployment;
- next gate: synthetic repository fixture followed by a separately approved GitHub App or manual maintainer workflow;
- WordPress begins only after the common capsule and rollback contract is stable.

- [ ] **Step 4: Run documentation test and confirm GREEN**

Run: `node --test test/publication-capsule-docs.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit documentation**

```bash
git add docs/BLOCK-5A-PUBLISHING-CAPSULE-GATE-2026-08-28.md docs/A2A-DEPLOYMENT-CAPSULE-ROADMAP.es.md docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md test/publication-capsule-docs.test.mjs
git commit -m "docs: record publishing capsule gate"
```

### Task 5: Full verification and review gate

**Files:**
- Modify only files required by failures found in this task.

**Interfaces:**
- Produces a reviewable branch and evidence; it does not deploy or publish.

- [ ] **Step 1: Run focused tests**

Run:

```bash
node --test test/publication-capsule.test.mjs test/publication-consent.test.mjs test/draft-pr-adapter.test.mjs test/publication-capsule-docs.test.mjs
```

Expected: all focused tests PASS.

- [ ] **Step 2: Run full quality gates**

Run:

```bash
npm test
npm run lint
npm run build
npm audit --omit=dev
```

Expected: tests, lint, and build PASS; production dependency audit reports zero vulnerabilities.

- [ ] **Step 3: Inspect repository diff and prohibited imports**

Run:

```bash
git diff --check
rg -n "fetch\(|Octokit|wrangler|child_process|writeFile|appendFile|private[_-]?key|password|api[_-]?key" lib/publication-*.mjs lib/draft-pr-adapter.mjs -S
git status --short
```

Expected: no networking or write implementation; any secret terms appear only in rejection logic.

- [ ] **Step 4: Request code review and resolve findings**

Review for spec compliance first, then implementation quality. Re-run all quality gates after any correction.

- [ ] **Step 5: Present the merge gate**

Report branch, commits, tests, residual risks, and the explicit statement that no production or remote publication occurred.
