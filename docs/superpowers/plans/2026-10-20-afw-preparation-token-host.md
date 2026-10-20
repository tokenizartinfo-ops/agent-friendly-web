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
