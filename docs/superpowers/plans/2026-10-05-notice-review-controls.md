# AFW Closed Operator Review Controls Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans natively, no new subagents. Gabriel authorized autonomous closed development; no generic approval pauses. Remote promotion remains separate.

**Goal:** Prepare an internal authenticated HTTP adapter for an operator's review decision, without mounting it in any Worker or exposing a route.

**Architecture:** Reuse resolveOperationsReviewOperator and recordNoticeReview from main0db59c4. Authentication and authorization configuration are trusted server dependencies. Origin/Fetch-Metadata checks protect browser mutations; the body cannot choose actor or permissions. A closed default makes no storage/key/limiter/body IO.

**Tech Stack:** ES modules, jose signed synthetic JWTs, existing SQLite D1 fixture, Node tests.

**Spec:** This document; existing identity contract docs/AFW-REVIEW-OPERATOR-IDENTITY-2026-10-05.es.md and journal docs/AFW-NOTICE-REVIEW-2026-10-05.es.md are prerequisites. Distinct Access operator policy, live identity acceptance and UI are NOT part of this block.

## Global constraints

- No remote DB migration, Worker/Access/token/schedule/customer/mail changes. No modification of operations-manager/index.mjs or existing receiver adapter.
- New function exported internally only: createNoticeReviewControls({env,config,keySet,limiter,now=Date.now,bodyTimeoutMs=1000}) returns async(request)=>Response.
- config is the existing resolver's server-only enabled/origin/teamDomain/audience/consumerAudience/subject contract. env.OPERATIONS_STATE_DB is server-pinned to operational storage, never selected from body.
- Require config.enabled===true, env.AFW_OPERATIONS_REVIEWS_ENABLED==='true' and operationsWindowOpen(env,now()) before any IO. Missing/invalid limiter dependency fails closed.
- Synthetic path /notices/review is an adapter contract, not a deployed endpoint. Require exact pathname, no query, POST. Wrong path404; wrong method405 with Allow:POST; disabled404/unavailable.
- Require Origin exactly config.origin and Sec-Fetch-Site exactly same-origin; missing/foreign metadata403. No CORS headers.
- Signed pinned human operator resolver required; reception identity, email/role/actor headers or body never authorize. Denial401; authenticated operatorId used as limiter key (10/60 policy is a future binding requirement).
- Rate-denied429. JSON-only body415 for other media types, max1024 bytes413, timeout408, malformed UTF8/JSON400. Consume streams with deadline and cancellation, never print errors/body/tokens. Reject extra fields.
- Body exact keys runId/requestId/decision/reason/expectedRevision/expectedCondition/expectedSequence. Pass operatorId from resolver and authorizedtrue only after all guards. Keep journal snapshot/CAS/budget unchanged.
- Successful decision200 {review:{sequence,decision,reason,reviewedAt}}, no actor/token/subject/email. Same request replay is idempotent. Stale/null/conflict409; invalid input400; storage/provider errors503 generic. Every response Cache-Control:no-store and Content-Type:application/json (except optional empty method response).

## Review focus

1. Cross-origin browser mutation must stop before identity lookup, limiter or DB.
2. Same signed operator from a reception/multiple audience must never write.
3. Untrusted body with operatorId/authorized/DB/origin fields must be rejected, never merged with context.
4. Stream exceeding size/deadline must stop without echoing content or inserting decisions.
5. ACK/state/lease race at journal insert must return a conflict instead of falsely confirming closure.

### Task1: Authenticated synthetic adapter

Files: create lib/operations-notice-review-controls.mjs and test/operations-notice-review-controls.test.mjs. Import existing identity, window and review helper; do not broaden them or refactor receiver body parser unnecessarily.

- [ ] Write RED tests using signed JWTs and real ephemeral SQLite: closed/noIO; wrong path/method; absent/foreign Origin and Fetch-Metadata; reception/multiple-audience/wrong-subject/expiredJWT; valid pinned operator creates exactly one review and replay returns same; injected role/actor fields400; snapshot conflict409; retain→close history preserved; failed limiter no review.
- [ ] Run node --test test/operations-notice-review-controls.test.mjs to observe failure before implementation.
- [ ] Implement createNoticeReviewControls with only the interface and statuses above, sanitized errors, fresh now() at persistence; reject a window expiring after identity/body before calling helper.
- [ ] Add RED→GREEN stream tests oversized, timeout, invalid UTF8/JSON; error output contains no credential/body/provider detail. Test identity/window expiry during awaited operations.
- [ ] Run focused tests; inspect exactly one original reservation and immutable journal history. Add authentic signed-JWT + D1 execution through the new adapter, not only mocks.

### Task2: Reviewable integration evidence, still closed

Files: document docs/AFW-NOTICE-REVIEW-CONTROLS-2026-10-05.es.md and update AGENTS.md/operating roadmap with actual source and limits.

- [ ] Run npm test, npm run lint, npm run build; inspect exit codes/results.
- [ ] Commit to a new AFW feature branch from current clean origin/main; open PR, attach it and return exact source/tests/evidence for root review. No merge or remote publication from this task.
- [ ] Record operator policy/private custody/CSRF live acceptance and mounting as later tasks, not inferred capabilities. Do not repeat accepted scheduler/cron/PC-off trials.

## Completion

Adapter is testable internally and closed by default. Root reviews before merge. Production operator access, policy/identity setup and live acceptance remain unimplemented until their scoped plan is prepared. Never use the existing reception service token to write reviews or extend its expiry automatically.
