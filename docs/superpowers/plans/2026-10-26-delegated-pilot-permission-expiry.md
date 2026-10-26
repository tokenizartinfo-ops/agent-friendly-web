# Delegated Pilot Permission Expiry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Owner selected continuous inline execution and waived intermediate review questions; preserve the final fresh-context review.

**Goal:** Make new delegated read permissions end no later than their original host window.

**Architecture:** Reuse the existing worker, SDK 1.2.1, store and repository. A request-local bounded time helper supplies immutable createdAt/expiresAt values; it does not create new authority or change stable-mode duration.

**Tech Stack:** JavaScript ESM, Node 22, SDK 1.2.1, SQLite test fixture, GitHub Actions ubuntu-24.04.

**Spec:** docs/superpowers/specs/2026-10-26-delegated-pilot-permission-expiry-design.md

## Global Constraints
- Exactly 600000ms maximum; window deadline captured once; existing SDK minimum 60000ms for a new read grant.
- No live credentials, grant references, subjects, OTP or private policy in GitHub.
- No runtime deployment/schema/grant migration, token renewal or new consent trial.
- Frozen Worker and operator remain closed; no native cloud/event/PC-off claim.

## Review Focus
- Latency after the last owner lookup must not create a fresh live grant after the deadline.
- Latency during grant persistence must not complete a code after observed expiry; cleanup must target only that new grant.
- An env deadline changed mid-request cannot extend the captured original deadline.
- Nonfinite or backward time must fail closed without a grant.
- Stable service behavior and evidence opt-in stay compatible.

### Task 1: Bound issuance and explain its actual deadline

**Files:**
- Create test/delegated-pilot-permission-expiry.test.mjs using fixtures/delegated-oauth-runtime.mjs.
- Modify lib/delegated-oauth-worker.mjs only.
- Create docs/AFW-DELEGATED-PILOT-EXPIRY-2026-10-26.es.md and this plan's ledger.

**Interfaces:** Existing createDelegatedOAuthWorker({issuer,resource,now,accessVerifier}), authorize/approve/exchange fixture helpers, SQL consent and application grant records. No new exported API.

- [ ] Add independent failing tests: consent cap/visible date; late grant cap + token expires_in; stable ten minutes; pre-write and post-write latency; changed env deadline; <60s remaining; invalid/backward time.
- [ ] Commit tests and docs on the isolated GitHub branch and open a PR. Observe the new assertions fail in CI against unmodified production code, not an infrastructure failure.
- [ ] Add request-local original deadline calculation. Reuse bounded times for three consent/grant persistence sites; require grant minimum 60000ms; recheck before SDK completion with existing exact-own cleanup on failure. Update text to 'hasta diez minutos' and show the actual form expiry.
- [ ] Run full GitHub CI: npm test, npm run lint, npm run build. Inspect assertions, count, skip, warnings and all builds. Commit the result ledger.
- [ ] Obtain one fresh whole-branch review against the pinned base/head. Fix Important/Critical in one RED→GREEN pass; ledger minors. Merge only after exact head and CI pass; inspect main CI and leave source/runtime boundaries explicit.
