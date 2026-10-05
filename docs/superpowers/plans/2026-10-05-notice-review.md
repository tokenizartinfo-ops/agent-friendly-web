# AFW Notice Review Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans natively. No new subagents, remote activation or approval pauses; Gabriel authorized autonomous closed development. Preserve unrelated changes.

**Goal:** Resolve operational review blockers with an immutable, separately authorized decision while retaining original reservation and budget.

**Architecture:** An additive review journal references the existing runId. Server-trusted operator context gates writes; the reception identity remains read-only for this journal. Closing a review never changes ACK/outcome, renews lease, permits repair or restores budget.

**Tech Stack:** ES modules, Node test runner, existing SQLite fixture and D1 primary sessions.

**Spec:** This file fixes the contract, extending docs/AFW-NOTICE-OPERATING-HANDOFF-2026-10-05.es.md. Cloud design review turn01a10c84 confirms separate authorization and same-revision exclusion as necessary.

## Global constraints

- AFW repository only; no remote DB/schema/Worker/Access/scheduler mutations in this implementation block.
- New schema/helper closed by default; no public/operator HTTP route or UI in this phase.
- Actor comes exclusively from a trusted server dependency; request bodies cannot select operator identity or authorization.
- One immutable review per reservation, stable requestId, UUID strings; no customer data, free text or secrets.
- Three decisions: retain_block, close_obsolete, close_expired_unconfirmed. Reasons: obsolete_revision, producer_paused, expired_unconfirmed, investigation_required.
- Active pending or accepted reservations cannot be reviewed. Superseded or expired-unconfirmed reservations only.
- Existing reservations continue counting toward three rolling24h/one active task. No lease/budget changes.

## Review focus

1. Same request reused with changed content must conflict, even across runs.
2. ACK or state revision changing during INSERT must fence the review atomically.
3. retain_block stays blocked; a closed review must not resurrect its original notice through another claim.
4. Closed flag, expired window or unauthorized context must perform no storage IO.
5. Malformed/future timestamps and mismatched resource/revision snapshots must fail closed with sanitized errors.

### Task1: Closed review storage contract

Files: create worker/operations/notice-reviews.sql, lib/operations-notice-review.mjs and test/operations-notice-review.test.mjs. Existing fixture test/fixtures/operations-db.mjs supplies SQLite-backed D1.

Interface: recordNoticeReview(env,input,{operatorId,authorized=false,now=Date.now()}) returns immutable sanitized review or null when gated/condition unavailable; invalid input throws generic validation error and conflicting request content throws a generic conflict. input exact keys runId/requestId/decision/reason/expectedRevision/expectedCondition. operatorId is a server-owned nonempty opaque string at most128 characters; do not output it in generic reception responses.

Schema: operations_notice_reviews references run_id UNIQUE/FK, review_request_id UNIQUE, operator_id, reviewed_at, decision/reason, observed_revision/observed_condition. Original reservation/outcome remains immutable. Gate AFW_OPERATIONS_REVIEWS_ENABLED==='true', operationsWindowOpen and authorized===true before IO. Use a primary-session conditional INSERT that compares reservation outcome/lease and current state to expected snapshot. close_obsolete requires later revision or paused state; close_expired_unconfirmed requires original outcomeNULL and lease<=now. reason/decision pair: retain_block/investigation_required; close_obsolete/obsolete_revision or producer_paused; close_expired_unconfirmed/expired_unconfirmed. Never close an active pending or accepted reservation.

- [ ] Write RED tests for closed/unauthorized noIO; accepted/live pending rejection; superseded later revision; expired unknown; exact retry and changed-payload conflict; state/ACK race; timestamps/UUID types; original budget unchanged.
- [ ] Run node --test test/operations-notice-review.test.mjs and observe expected failures before helper implementation.
- [ ] Implement additive schema and helper with one transactional conditional insert plus idempotency reconciliation; sanitized errors.
- [ ] Run focused tests GREEN and inspect original reservation rows unchanged.
- [ ] Commit helper/tests/schema as one closed feature.

### Task2: Reconciliation without same-revision replay

Files: modify lib/operations-notice-reservation.mjs, lib/operations-notice-cycle.mjs, lib/operations-client.mjs; extend related tests. Do not silently require review table for old deployments: explicit server review flag gates new joins; false preserves existing schema contract.

Interface: a review-enabled receipt adds review:null|{decision,reason,reviewedAt}; no operatorId. Client strictly correlates it. Closed decisions remove that receipt from review blockers, NEVER call ACK for it; retain_block/null retain existing behavior. Listing and claim exclude inbox(resource,revision) of a closed review, including a fresh requestId. Only later revision can be considered normally. Budget still counts all reservation rows.

- [ ] Write RED tests: lease-expired receipt remains blocked without review, closed expired receipt allows only later revision, closed superseded receipt never ACKed, retain_block still blocks, review absent keeps old behavior, changed/malformed review rejected, budget unchanged.
- [ ] Implement coordinated gated receipt/list/claim/client/cycle behavior; no operator write API.
- [ ] Run focused tests plus existing authenticated workerd acceptance; add real SQLite concurrency coverage for exclusion.
- [ ] Run npm test, npm run lint, npm run build; inspect all results, commit and open PR with closed scope and limitations.

### Task3: Separate operator capability, later promotion

Requires a distinct server-authorized operator policy/identity and private custody before any HTTP write adapter. Do not use existing reception service identity as operator. Prepare contract/testing first, then a separate bounded synthetic authorization acceptance. Owner involvement is needed only for private identity loading when that concrete form is ready. Remote review migrations/activation require their own receipt/rollback; do not silently apply this plan to operations D1.

### Completion evidence

Record exact source, CI, review outcome, migrations NOT applied and runtime closed. No permanent guard claim. Prior cron/scheduler/PC-off tests already accepted; do not repeat them.
