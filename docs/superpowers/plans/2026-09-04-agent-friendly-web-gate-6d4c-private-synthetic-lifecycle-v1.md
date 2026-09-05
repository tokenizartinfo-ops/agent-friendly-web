# Gate 6D.4C Private Synthetic Privacy Lifecycle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Exercise one complete, private and exclusively synthetic privacy lifecycle in the isolated Agent Friendly Web canary, then return every capability switch to OFF.

**Architecture:** A synthetic-only service reuses the Gate 6D.4B policy, D1 stores and erasure primitive to run a resumable sequence over the single reserved `synthetic-canary@example.invalid` fixture. A dedicated same-origin endpoint and page require Cloudflare Access, an allowlisted subject, a fixed request contract, rate limiting and an independent kill switch. Remote execution is preceded by a fail-closed metadata preflight, a D1 Time Travel bookmark and an OFF deployment; after one successful cycle the canary is redeployed OFF and production remains untouched.

**Tech Stack:** Node.js 22.23.2, Node test runner, TypeScript route adapters, Cloudflare Workers, Cloudflare Access, D1, Wrangler 4, Web Crypto.

**Spec:** `docs/superpowers/specs/2026-09-03-agent-friendly-web-real-contact-privacy-lifecycle-v1-design.md`

## Global Constraints

- Project is `Agent Friendly Web`; repository is `tokenizartinfo-ops/agent-friendly-web`.
- Canary origin is exactly `https://canary.agentfriendlyweb.dev`; public origin is exactly `https://agentfriendlyweb.dev`.
- The only fixture email is `synthetic-canary@example.invalid`; the endpoint accepts no email, name, domain, message, recipient, token or arbitrary identifier.
- The exercised order is grant, rectification, export, withdrawal and erasure/suppression.
- Grant and withdrawal affect only `commercial_contact`; erasure/suppression affects `requested_plan` and clears direct identifiers.
- The export is checked in memory and represented externally only by a digest/count; no direct identifier is returned, logged or written to lifecycle evidence.
- The flow is resumable and idempotent. Each D1 phase is atomic; an interrupted run resumes completed phases and never duplicates events.
- `AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED` is independent and missing means false. It is true only for the bounded private probe and false at close.
- `AFW_REAL_CONTACT_ENABLED`, `AFW_PRIVACY_REQUESTS_ENABLED`, `AFW_RETENTION_JOBS_ENABLED` and `AFW_PRODUCT_UPDATES_ENABLED` remain the string `false` in base, canary and production throughout the gate.
- D1 canary is `agent-friendly-web-web-canary` / `2b518988-eacb-4c31-b760-4e58c3c0285b`; D1 production is `agent-friendly-web-web-production` / `d26fc9d2-df5a-4957-8e58-cc4c945faad8` and is never mutated.
- No email is sent, no proposal is created, no payment is charged, no customer site is modified and no Tokenizart resource is read or mutated.
- Every private response uses `Cache-Control: no-store, private`; private pages use `X-Robots-Tag: noindex, nofollow` and never enter the sitemap.
- No deployment, migration, traffic change or secret operation occurs before the local test, lint, build and deploy dry-run gates pass.
- PR #49 remains Draft; this plan does not merge it.

---

### Task 1: Synthetic lifecycle service

**Files:**
- Create: `lib/synthetic-privacy-lifecycle.mjs`
- Create: `test/synthetic-privacy-lifecycle.test.mjs`

**Interfaces:**
- Produces: `SYNTHETIC_PRIVACY_LIFECYCLE_CONTRACT = "agent-friendly-web.synthetic-privacy-lifecycle.v1"`.
- Produces: `runSyntheticPrivacyLifecycle(database, input, overrides)`.
- `input` is exactly `{ actorRefHash, suppressionHmacKey }`.
- `overrides` may contain only deterministic `now` and `randomUUID` functions used by tests.
- Returns only `{ status, synthetic, contactStatus, restricted, counts, capabilities }`; it never returns IDs, hashes, contact fields or SQL details.

- [ ] **Step 1: Write the failing service tests**

Cover these observable behaviors:

```js
assert.deepEqual(result, {
  status: 'synthetic_privacy_lifecycle_completed',
  synthetic: true,
  contactStatus: 'erased',
  restricted: false,
  counts: {
    consentEvents: 2,
    privacyRequests: 4,
    suppressions: 2,
    lifecycleEvents: 3,
  },
  capabilities: {
    sendsEmail: false,
    createsProposal: false,
    chargesPayment: false,
    modifiesCustomerSite: false,
    acceptsRealContacts: false,
  },
});
```

Tests must also prove:

- exactly one eligible `.invalid` fixture is required;
- a completed marker produces `synthetic_privacy_lifecycle_already_completed` with no writes;
- grant and withdrawal are for `commercial_contact` only;
- the rectification modifies only the fixed synthetic `name` value;
- the export query selects only allowlisted subject fields, is hashed in memory and is not returned;
- erasure delegates to `applyContactErasureToD1` with `requested_plan` and an HMAC, never the email;
- malformed D1 results, invalid actor hashes, short HMAC keys, ambiguous fixtures and phase failures return stable sanitized errors;
- re-running after any completed phase resumes without duplicate events;
- response serialization contains no `@`, UUID, 64-character hash, SQL, token, secret or fixture name.

- [ ] **Step 2: Run the focused test and observe RED**

```powershell
node --test test/synthetic-privacy-lifecycle.test.mjs
```

Expected: FAIL because `lib/synthetic-privacy-lifecycle.mjs` does not exist.

- [ ] **Step 3: Implement the minimal synthetic-only service**

Use the existing public functions:

```js
recordConsentLifecycleEventToD1(database, event, overrides)
createPrivacyRequestToD1(database, request, overrides)
applyContactErasureToD1(database, erasure, overrides)
resolveContactStatusFromD1(database, leadId)
```

The service must derive stable step UUIDs from SHA-256 material scoped to the contract, actor hash and step name; use Web Crypto HMAC-SHA-256 for the suppression reference; and perform rectification, export resolution, withdrawal suppression and request resolution in bounded D1 batches. A completed deletion lifecycle event is the replay marker. D1 errors are translated to `synthetic_privacy_lifecycle_store_failed` without provider details.

- [ ] **Step 4: Run the focused service tests and observe GREEN**

```powershell
node --test test/synthetic-privacy-lifecycle.test.mjs
```

Expected: all service tests pass.

- [ ] **Step 5: Commit Task 1**

```powershell
git add -- lib/synthetic-privacy-lifecycle.mjs test/synthetic-privacy-lifecycle.test.mjs
git commit -m "feat: add synthetic privacy lifecycle service"
```

### Task 2: Private HTTP boundary and human probe page

**Files:**
- Modify: `lib/synthetic-privacy-lifecycle.mjs`
- Create: `app/api/canary/synthetic-privacy-lifecycle/route.ts`
- Create: `app/canary/synthetic-privacy-lifecycle/route.ts`
- Create: `test/synthetic-privacy-lifecycle-page.test.mjs`
- Modify: `test/synthetic-privacy-lifecycle.test.mjs`

**Interfaces:**
- Produces: `createSyntheticPrivacyLifecycleHandler(overrides)`.
- Accepts exactly:

```json
{
  "contract": "agent-friendly-web.synthetic-privacy-lifecycle.v1",
  "action": "run_one_private_synthetic_privacy_lifecycle",
  "confirmation": "synthetic_only"
}
```

- [ ] **Step 1: Write failing handler and page tests**

Verify 404 while the independent switch is OFF; exact HTTPS host/path/origin; Access JWT and allowlisted subject; D1 and HMAC secret presence; rate limit; bounded JSON; exact request keys; sanitized success/duplicate responses; no email/payment/proposal integrations; no input controls; and no sitemap entry.

- [ ] **Step 2: Run the focused tests and observe RED**

```powershell
node --test test/synthetic-privacy-lifecycle.test.mjs test/synthetic-privacy-lifecycle-page.test.mjs
```

Expected: FAIL because the handler and routes are absent.

- [ ] **Step 3: Implement the private boundary**

The handler must check `AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED === "true"` before identity or storage, verify `cf-access-jwt-assertion`, hash the Access subject, compare it against `AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES`, invoke `AFW_SYNTHETIC_CONTACT_RATE_LIMITER`, and pass `AFW_CONTACT_SUPPRESSION_HMAC_KEY` only to the service. The page renders one button and fixed explanatory copy; it accepts no user data.

- [ ] **Step 4: Run the focused tests and observe GREEN**

```powershell
node --test test/synthetic-privacy-lifecycle.test.mjs test/synthetic-privacy-lifecycle-page.test.mjs
```

Expected: all handler and page tests pass.

- [ ] **Step 5: Commit Task 2**

```powershell
git add -- lib/synthetic-privacy-lifecycle.mjs app/api/canary/synthetic-privacy-lifecycle/route.ts app/canary/synthetic-privacy-lifecycle/route.ts test/synthetic-privacy-lifecycle.test.mjs test/synthetic-privacy-lifecycle-page.test.mjs
git commit -m "feat: add private synthetic privacy gate"
```

### Task 3: Configuration, contract and fail-closed preflight

**Files:**
- Modify: `wrangler.jsonc`
- Modify: `worker-configuration.d.ts`
- Modify: `public/.well-known/contact-privacy-lifecycle-contract.json`
- Modify: `test/contact-privacy-contract.test.mjs`
- Create: `scripts/preflight-synthetic-privacy-lifecycle-canary.mjs`
- Create: `test/synthetic-privacy-lifecycle-preflight.test.mjs`
- Create: `docs/evidence/synthetic-privacy-lifecycle-canary-metadata.json`
- Modify: `package.json`

**Interfaces:**
- Produces `npm run privacy:lifecycle:preflight -- --input <path>`.
- Preflight output is a sanitized JSON decision with `ready: true|false` and stable reason codes.

- [ ] **Step 1: Write failing configuration, contract and preflight tests**

Require the new switch to be the string `false` in base, canary and production; preserve all four real-data flags as `false`; keep the public contract honest as local-ready/remote-disabled; and reject metadata unless every declared boundary matches the Global Constraints, canary and production D1 IDs differ, the route is private, Access is required, the migration set includes `0008_contact_privacy_lifecycle.sql`, and rollback is declared.

- [ ] **Step 2: Run the focused tests and observe RED**

```powershell
node --test test/contact-privacy-contract.test.mjs test/synthetic-privacy-lifecycle-preflight.test.mjs
```

Expected: FAIL because the switch and preflight do not exist.

- [ ] **Step 3: Implement configuration and preflight**

Add `AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED: "false"` to all three variable blocks. Do not place the HMAC secret in `wrangler.jsonc`, docs, tests or evidence. Add the npm script and metadata fixture with only resource names/IDs, origin, expected flags and rollback commands. Keep discovery status at `private_synthetic_lifecycle_local_ready_remote_disabled` until remote evidence exists.

- [ ] **Step 4: Regenerate Worker types**

```powershell
npm run web:types
```

Expected: `worker-configuration.d.ts` contains the new false-valued switch and no secret value.

- [ ] **Step 5: Run focused and full local verification**

```powershell
node --test test/contact-privacy-contract.test.mjs test/synthetic-privacy-lifecycle-preflight.test.mjs test/synthetic-privacy-lifecycle.test.mjs test/synthetic-privacy-lifecycle-page.test.mjs
npm test
npm run lint
npm run build
npm run web:deploy:dry-run
npm run privacy:lifecycle:preflight -- --input docs/evidence/synthetic-privacy-lifecycle-canary-metadata.json
git diff --check
```

Expected: zero test/build/lint errors, only the pre-existing `no-img-element` warning if still present, dry-run performs no deployment, and preflight returns `ready: true`.

- [ ] **Step 6: Commit Task 3**

```powershell
git add -- wrangler.jsonc worker-configuration.d.ts public/.well-known/contact-privacy-lifecycle-contract.json test/contact-privacy-contract.test.mjs scripts/preflight-synthetic-privacy-lifecycle-canary.mjs test/synthetic-privacy-lifecycle-preflight.test.mjs docs/evidence/synthetic-privacy-lifecycle-canary-metadata.json package.json
git commit -m "chore: prepare synthetic privacy canary"
```

### Task 4: Private remote canary, rollback and evidence

**Files:**
- Create after observation: `docs/evidence/synthetic-privacy-lifecycle-canary-remote-2026-09-04.json`
- Create after observation: `docs/BLOCK-6D4C-SYNTHETIC-PRIVACY-CANARY-REMOTE-2026-09-04.md`
- Modify after observation: `public/.well-known/contact-privacy-lifecycle-contract.json`
- Modify after observation: `test/contact-privacy-contract.test.mjs`
- Modify after observation: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`
- Modify after observation: `docs/COMPANY-BUILDING-AND-CAPITAL-ROADMAP-2026-09-02.md`
- Modify after observation: `docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md`
- Modify after observation: `docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md`

**Remote declaration:**

```text
PROJECT=agent-friendly-web
REPOSITORY=tokenizartinfo-ops/agent-friendly-web
ENVIRONMENT=afw_canary
ORIGIN=https://canary.agentfriendlyweb.dev
RESOURCE_TYPE=cloudflare_worker_d1_access_rate_limit_secret
RESOURCE_ID=agent-friendly-web-web-canary + 2b518988-eacb-4c31-b760-4e58c3c0285b
ALLOWED_ACTION=apply additive migration 0008 to canary, deploy OFF, execute one allowlisted synthetic lifecycle, redeploy OFF, verify counts
ROLLBACK=restore prior Worker version with every switch OFF; use the recorded pre-migration D1 Time Travel bookmark only if the additive migration or synthetic probe fails
```

- [ ] **Step 1: Inspect remote state read-only**

Verify Worker routes/versions/settings, Access application/policies, canary and production D1 identities, applied migrations and pre-probe table counts. Abort if any resource belongs to Tokenizart, the D1 IDs match, Access is bypassable, a real-data flag is true, or the fixture is not exactly one eligible `.invalid` contact.

- [ ] **Step 2: Record D1 recovery state**

Capture the canary D1 Time Travel bookmark and schema/migration status without reading direct identifiers beyond the fixed `.invalid` fixture predicate. Store only the bookmark/reference needed for rollback in local evidence; never expose Access JWTs or secrets.

- [ ] **Step 3: Apply only migration 0008 to canary and deploy OFF**

```powershell
npm run web:d1:migrations:canary
npm run web:deploy:canary
```

Verify the private endpoint returns 404 while `AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED=false`, production is unchanged and all four real-data flags remain false.

- [ ] **Step 4: Provision the canary HMAC secret without exposing it**

Generate at least 32 random bytes locally, pipe them directly to `wrangler secret put AFW_CONTACT_SUPPRESSION_HMAC_KEY --env canary`, and do not print, persist or copy the value into source, shell history, docs, evidence or chat. Confirm only that the binding exists.

- [ ] **Step 5: Open the bounded synthetic switch and run once**

Create/deploy a canary-only version with `AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED=true`; keep every real-data flag false. Through an allowlisted Cloudflare Access session invoke the one fixed button once, then replay once to verify idempotence. Expected sanitized statuses are `synthetic_privacy_lifecycle_completed` followed by `synthetic_privacy_lifecycle_already_completed`.

- [ ] **Step 6: Verify D1 and external side effects**

Confirm exactly two consent events, four privacy requests, two suppressions and three lifecycle events for this synthetic run; the fixture resolves as erased; direct fields are blank; email delivery row counts did not change; no provider send, proposal, payment, customer-site action, public contact capture or production D1 change occurred.

- [ ] **Step 7: Close the switch and verify rollback posture**

Redeploy canary with `AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED=false`. Verify endpoint/page 404, all synthetic write switches OFF, every real-data flag OFF, Access still deny-by-default and public production healthy. Do not restore the successfully erased synthetic fixture.

- [ ] **Step 8: Write evidence from observed values only**

Record Worker version IDs, D1 bookmark, migration status, before/after counts, sanitized HTTP statuses and final flags. Update the public contract status to `private_synthetic_lifecycle_verified_kill_switch_off`, retain every real capability as false and set the next gate to `private_human_privacy_pilot_legal_review_required`.

- [ ] **Step 9: Run final verification**

```powershell
npm test
npm run lint
npm run build
npm run web:deploy:dry-run
npm run privacy:lifecycle:preflight -- --input docs/evidence/synthetic-privacy-lifecycle-canary-metadata.json
git diff --check
git status --short --branch
```

Expected: zero failures, no deployment from dry-run, final remote switches OFF and only reviewed Gate 6D.4C evidence changes uncommitted.

- [ ] **Step 10: Commit and push the reviewed gate**

```powershell
git add -- docs/evidence/synthetic-privacy-lifecycle-canary-remote-2026-09-04.json docs/BLOCK-6D4C-SYNTHETIC-PRIVACY-CANARY-REMOTE-2026-09-04.md public/.well-known/contact-privacy-lifecycle-contract.json test/contact-privacy-contract.test.mjs docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md docs/COMPANY-BUILDING-AND-CAPITAL-ROADMAP-2026-09-02.md docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md
git commit -m "docs: close synthetic privacy canary gate"
git push origin docs/company-building-capital-roadmap-v1
```

Expected: PR #49 remains Draft; no merge occurs.
