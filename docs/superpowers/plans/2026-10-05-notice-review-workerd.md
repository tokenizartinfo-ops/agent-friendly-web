# AFW Notice Review Runtime Acceptance Plan

> **For agentic workers:** Use superpowers:executing-plans natively. Gabriel authorizes continued AFW work without generic approval pauses. No new chats or subagents; use the existing AFW cloud environment.

**Goal:** Verify the integrated operator adapter and immutable journal inside local workerd/D1 before planning any exposed operator service.

**Architecture:** A test-only bundled harness imports the actual adapter, verifies a synthetic signed human JWT and writes to ephemeral Miniflare D1. Production Workers and remote resources remain unchanged. Node SQLite acceptance does not alone establish workerd/D1 compatibility, particularly installation and enforcement of the journal triggers.

**Tech Stack:** Node tests, jose, esbuild, Miniflare/workerd, ephemeral D1.

**Spec:** `docs/AFW-NOTICE-REVIEW-CONTROLS-2026-10-05.es.md`; integrated PR256 source f65388f, main ea118645ecd3e9cdb55147128cc0dad0038bb2ff.

## Global constraints

- No remote migration, deployment, Access policy, token, scheduler, real operator, customer or mail change. No modification of production Worker entrypoints or authorization contracts.
- Use actual `createNoticeReviewControls`, `resolveOperationsReviewOperator` and `recordNoticeReview`; never substitute an implementation in the test.
- Harness only in test source. Synthetic fixed AFW subdomain, server-owned configuration, separate review/reception audiences, pinned subject and public JWK. Private signing key stays in memory outside workerd; no logs or files containing JWTs.
- Install the actual schema, consumer-state, watchdog-state, watchdog-inbox, notice-reservations and notice-reviews SQL in ephemeral D1. Preserve complete CREATE TRIGGER statements: splitting this journal on every semicolon breaks BEGIN/END bodies. Assert both triggers exist, then exercise them.
- No network credentials or real Access assertion. The test's synthetic limiter is explicitly not acceptance of Cloudflare's deployed 10/60 binding.
- Dispose runtime in finally; do not leave a dev server, route or persisted shared database.

## Review focus

1. Successful adapter execution must prove real signature verification, D1 primary-session writes and sanitized output, not merely a mock response.
2. Replay and competing request IDs must preserve one decision per sequence, while original reservation/outcome remains unchanged.
3. History UPDATE and DELETE must fail in workerd/D1 with actual installed triggers; a silently skipped trigger is a failed acceptance.
4. Cross-origin, reception audience and injected authorization fields must leave zero decisions on a fresh fixture.
5. After terminal closure, actual list/claim/restore/ACK helpers must respect the original revision fence while preserving historical ACK outcomes and budget.

### Task1: Local signed runtime and D1 acceptance

**Files:** Create `test/operations-notice-review-workerd.test.mjs`. Reference existing harness patterns in `test/operations-manager-worker.test.mjs` and `test/operations-notice-workerd.test.mjs`. Change production code only for a reproduced runtime defect, with a targeted RED test and root review.

**Interfaces:** Consume `createNoticeReviewControls({env,config,keySet,limiter,now})` and existing notice helpers. Produce isolated Node tests with actual workerd dispatch and direct D1 assertions.

- [ ] Add a signed-JWT test harness importing the integrated adapter. Before writing its working fixture/SQL loader, run the focused test and observe a genuine failure; do not manufacture a defect in production code.
- [ ] Install all six actual SQL sources, handling complete trigger statements, and assert both immutable triggers in sqlite_master.
- [ ] Seed a synthetic superseded reservation with current paused later revision. Assert missing/foreign browser metadata403, wrong reception audience401 and injected actor fields400 without a journal insert.
- [ ] Assert valid signed retain200, exact replay200/same result, then terminal close200/sequence2 with new requestId/expectedSequence1. Terminal reopen409, no reservation mutation, output contains no subject/email/actor/token.
- [ ] Attempt actual journal UPDATE and DELETE and require rejection. Verify both original decisions survive unchanged.
- [ ] Exercise real notice list/claim/restore/ACK fences through the harness against the closed original revision; a new requestId must not revive it. Preserve historical superseded ACK. Keep all required server flags and shared-budget schemas explicit in the fixture.
- [ ] Run `node --test test/operations-notice-review-workerd.test.mjs`. Runtime/schema errors are findings to fix, not permission to weaken guards or skip triggers. No need to duplicate every existing body/expiry unit test.

### Task2: Integration receipt and review

**Files:** Create `docs/AFW-NOTICE-REVIEW-WORKERD-2026-10-05.es.md`; update `AGENTS.md` and `docs/AFW-OPERATING-ROADMAP.es.md` with observed evidence and remaining live-operator boundaries.

- [ ] Run npm test, npm run lint and npm run build, retain exact source/results and limits.
- [ ] Commit on `test/afw-notice-review-workerd-cloud-20261005` from clean current main. Open and attach PR; root reviews and integrates after CI, no cloud merge or remote activation.
- [ ] Record that local acceptance does not create a human Access policy, deployed rate limiter, UI, revocation check or live authorization. Next promotion plan must separate operator service from service reception and establish private identity lifecycle before an exposed write route.

## Prior integration evidence

PR256 reviewed by root, 39 focused tests passed locally. CI37333496981 executed source f65388f: 867 tests passed, zero failures; lint zero errors/two existing warnings; build complete. Merged as ea118645ecd3e9cdb55147128cc0dad0038bb2ff at 2026-10-05T15:33:14Z. Its initial PR event had no CI run; root reopened the PR to obtain a real pull_request run before merging. No runtime publication follows from the merge.
