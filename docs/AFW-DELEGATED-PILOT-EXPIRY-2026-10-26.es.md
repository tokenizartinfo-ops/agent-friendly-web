# Progress: docs/superpowers/plans/2026-10-26-delegated-pilot-permission-expiry.md

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated GitHub branch; ORIGIN github.com; RESOURCE_TYPE source tree/PR/Actions; ALLOWED_ACTION source tests, scoped code/docs and hosted CI; ROLLBACK unmerged branch or additive revert, no runtime mutation.

BASE 3ff29aa48a4c59dcd80f4e5fa28ec3922a7b1f60, tree 6c091c9dfe1b241bebc3a02796bff7b0a04964e4. Branch fix/delegated-pilot-permission-expiry-20261026.

Task 1: started. Diagnosis from real trial: createGrant uses now()+600000 without host deadline; the early request gate already blocks reads after host expiry. New tests are about issuance metadata and async completion, not a claim of an observed unauthorized post-window read.

Ruling: use an isolated remote GitHub branch and this versioned ledger in place of a local worktree/.superpowers workspace — owner cloud-first preference; costs inability to run local skill helper scripts, offset by pinned branch/commit and hosted CI evidence. No local build, clone or dependency.
Ruling: execute the known narrow fix inline without waking the owner for design/plan approval — explicit opt-out and overnight authorization; source remains reviewable and requires CI/fresh review before integration. No new runtime trial or permissions.

Expected RED: new consent/grant deadline, async-expiry and short-window assertions fail against unchanged worker. Stable behavior should already pass. Actual evidence pending; no completion claim.

Task 1: RED observed on head 6c388627495d5030430d6c4ab9648c50aaf42c0d, CI40262831734/job121378668996. npm test: 2890 tests, 2882 PASS, 7 FAIL, 1 existing skip. All seven failures are new regression assertions: window consent/grant deadlines, async owner lookup expiry, changed original env deadline, backward time, SDK-short remaining window, and persistence expiry. Stable mode passed. Lint/build skipped after expected test failure; no infrastructure failure. Source worker unchanged in RED.

Implementation: original request-local hostDeadline; monotonic observed permission time; exact canonical createdAt/expiresAt; three bounded consent/grant writes; 60s minimum for new grants; check after persistence and SDK completion with existing exact-own revoke on failure. UI now says up to ten minutes and presents actual form expiry. No runtime resource or stored historical grant changed. GREEN pending.

CI40263306828/job121380123344 on 8b317904: 2890 tests, 2888 PASS, 1 FAIL, 1 existing skip. All eight new regression tests passed (including stable behavior); the only failure was the old exact copy assertion in delegated-oauth-flow.test.mjs:466 expecting 'El permiso dura diez minutos'. The intended contract now says 'hasta diez minutos'; update that assertion only, preserving all its fresh-consent/revoked-grant assertions. Lint/build skipped; do not call this run GREEN. Separate preparation/operator/named-package build-only runs40263306878/40263306836/40263306833 passed.

Final whole-branch review: /root/review_pilot_permission_expiry, model gpt-6-astra/high, base3ff29aa..headff2bf122. 0Critical,2Important,0Minor; declined-to-judge []. Both findings accepted: raw now() for consent lookup/consume bypasses monotonic validation, and cleanup can write revoked_at='' if the clock fails after grant persistence/SDK completion. No runtime mutation was made. One fix pass begins with three new regression tests against the unchanged reviewed implementation; expected RED in the new assertions. Parent will not request a second review seat.
