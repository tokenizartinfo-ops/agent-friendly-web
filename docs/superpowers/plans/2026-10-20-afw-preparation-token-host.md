# AFW finite preparation token host implementation plan
> For agentic workers: REQUIRED superpowers:executing-plans inline, one fresh whole-branch most-capable review.
Goal: replace the remaining CI-only token policy with a reusable default-closed source AS/token boundary under the existing original preparation profile.
Architecture: actual SDK AS + request-local AsyncLocalStorage; same lease/store/schema/revoker, no duplicate source authority algorithm.
Tech Stack: OAuth provider1.2.1, jose, Miniflare/workerd/D1/KV, nodejs_compat; GitHub APIs/Actions only.
Spec: ../specs/2026-10-20-afw-preparation-token-host.md

## Global constraints / rulings
Original profile<=600000ms, request<=5000ms, input4096bytes/output32768bytes, cleanup<=2000ms. No refreshed window, retry, new key or live resource operation. Source rollback reviewed revert; preserve current read-only host/G2CLOSED. operationalReadiness=false.
Ruling: source-created actual AS exposes authorizationServer and fetchToken only; immutable same-profile source components can compose later, production entrypoint/withdrawal remain separate. Cost if wrong: integration interface revision, not expanded live authority.
Ruling: SDK callback uses AsyncLocalStorage original request context, not a shared mutable current request. Cost if wrong: platform compatibility qualification; nodejs_compat mandatory in native fixture.
Ruling: reuse explicit consent inspect and existing primary consumeExchange; uncertain result not owned. Provider invalid_grant has automatic revocation side effect in exact1.2.1 source, so unowned/uncertain callback denial uses temporarily_unavailable. Cost if wrong: generic503 needs guided manual reconciliation, never automated retry.
Ruling: remote isolated branch/spec/plan/PR/issue497 ledger substitutes local worktree/sdd scripts under owner cloud preference. No local install/build/download. Owner explicitly requests consecutive autonomous source blocks; no repeated design/merge prompt, operational consent separate.
Preflight shared interfaces: original profile/store.inspect -> callback current receipt; original opaque lease -> callback+HTTP; actual AS -> existing signed consent and MCP fixture; known-own consumed row -> existing scoped revoker. All preserve exact units/names, no authority from CI controls.

## Review focus
- Actual SDK env/props or scope mismatch must not grant authority or revoke an unrelated provider grant.
- Late ACK after original deadline must retain captured known-own cleanup without issuing a response token.
- A failed local request must not invalidate unrelated valid same-profile requests; global drift must remain terminal.
- Callback success followed by slow SDK/KV issuance must still be fenced by original HTTP deadline.
- Token downscoping and SDK Unix expiry must agree with persisted visible choice and absolute grant end.

## Task1 — native RED contract
Files: test/preparation-token-host-native.test.mjs; test/fixtures/preparation-token-host-worker.mjs; spec+plan.
- [ ] Explicit source/factory-presence assertion before bundling (no Node import of cloudflare: SDK); native factory default-closed assertions execute workerd.
- [ ] Actual existing signed-consent/code fixture + new source token host sharing the original SDK state/client/profile, no fake success/claims.
- [ ] Cases named in spec; run existing Actions npm test -> expected feature-absence assertion RED, all old tests unchanged.

## Task2 — source host GREEN
Create lib/delegated-preparation-token-host.mjs, docs/AFW-PREPARATION-TOKEN-HOST-2026-10-20.es.md, AGENT prefix.
- [ ] createDelegatedPreparationAuthorizationHost(options)->null or {authorizationServer,fetchToken}; exact trusted pins/profile/default closed.
- [ ] Original lease/caps/rate/ALS callback, existing consent inspect and one actual consumeExchange, no refresh/cross-client.
- [ ] Final issued-token verification/current source/expiry + finite known-own cleanup; unknown ACK remains finite, no retry/winner revocation.
- [ ] Full Actions tests/lint/fivebuilds -> GREEN; no deploy/artifact download.

## Task3 — review and integration
- [ ] One fresh most-capable whole-branch review. Critical/Important reproduce RED->ONE fix pass->GREEN; Minor ledger/defer.
- [ ] Exact tested head/tree merge + fresh mainCI/artifact metadata/current ref, issue497 receipt closes tasks. No docs-only CI churn for pending words.

## Stop conditions
No remote source mounting, client creation/registration, migration, permissions, tokens, OAuth/login/OTP, Container/event/guard/PCoff/Max or support-monitor restart. Cloudflare follow-up authorized/sent separately in existing case02382110, receipt issue497#6290701263; do not resend automatically.

## Observed initial RED
4fcb1ce344b202003b6d4fedd3209fdc9e361d6c / CI39422697083/job118627395862:2389PASS1FAIL1existingSKIP. The explicit missing finite token host assertion fails before bundle; all existing suites pass. This is feature-absence RED, not individual guard mutation proof.
Task1 complete; Task2 implementation now candidate pending complete native GREEN/review/main. Exact SDK v1.2.1 primary source checked: TokenExchangeCallbackOptions contains subjectClientId/grantId and callback invalid_grant auto-revocation; the public AS validator is validateToken(resource,token,env), returning integer Unix expiresAt (the internal implementation's validateAccessToken is NOT the AS surface). No package version change.

## Initial implementation diagnosis
a8ed36ce/CI39423574710/job118630350838:2389PASS1FAIL1SKIP, new native parent stops during bootstrap before its children. JSON parser reported a generic Worker Token connection unavailable response. Exact pinned public OAuthAuthorizationServer source v1.2.1 exposes validateToken(resource,token,env); validateAccessToken(token,resource,env) belongs only to its internal implementation. Our constructor checked the wrong method, so closed as intended but could not initialize. Small fix changes ONLY public method reference and argument order, preserving all authority/expiry checks and test expectations. Not a Cloudflare account/permission/credential issue.

## Native behavior findings / corrections
813df3a8/CI39424255524/job118632665481:2398PASS3FAIL1SKIP (two child cases+parent). All normal read/draft/PKCE/MCP, unknown consume ACK, known-own owner-change cleanup, held lookup, late actual KV write/D1 denial, and terminal drift cases passed.
Exact remaining failures: missing preparation trigger at exchange was accepted; source store.inspect verifies its consent journal but does NOT call the separate preparationSchema gate on inspect. Add explicit reused checkAgentCapsulePreparationSchema before consumption and subsequent current-receipt checks; do not change the accepted store or weaken the native assertion.
Second failure: token request asked read+prepare from a read-only grant; pinned SDK downscope silently intersects with the ceiling. No extra authority was emitted, but the closed profile must reject the invalid request. Capture ORIGINAL HTTP requested scopes in the request-local state and compare both ceiling and SDK effective scopes before consuming. No silent scope addition/drop.
Add planned two-simultaneous-exchange coverage (actual SDK/D1) and explicit no SDK token after unknown consume ACK before whole-branch review. These tests exercise request-local ownership/scopes, not framework-only wiring.
