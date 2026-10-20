# AFW native authorization-code/PKCE preparation composition
20oct2026UTC /19octART. Basefe12b6f4adbcf43ccc69773a5db67488457c9a48 / PR511 /2292PASS0FAIL1existingSKIP.
Project AFW only; GitHub source + existing Actions. No local clone/install/build, no remote Cloudflare/OAuth/permission/credential/Max action.

## Binding scope and pre-flight
Parent plan: docs/superpowers/plans/2026-10-19-afw-preparation-consent-mount.md Step2; policy Step1 already COMPLETE by issue497#6280131804, do not redo.
Interface scan: policy consumes original requested scopes/absolute transaction+trial dates; SDK approveConsent can approve any supported scope, so AFW MUST retain original-subset check. Actual token ctx must originate from OAuthAuthorizationServer.validateToken, not a synthetic validator. D1 application grants still govern current operation even while provider KV token remains valid.
Schema inspected0011/0012: kind is TEXT without enum constraint, no consent startedAt/profile/revision columns. Existing storeconsumeConsent uses conditional UPDATE RETURNING; createGrant is a distinct write, so this is NOT a proof of atomic multi-store consent/grant issuance.
Ruling: split Step2 into protocol composition acceptance FIRST, then production consent admission/orchestration/persistence. The new file is explicitly CI-only and uses kind ci-preparation-protocol-v1, deriving original begin from expiresAt-600000 for THIS fixture format; not silently proposing a production field encoding or migration. Cost: real profile/store/HTTP/UI wiring remains unimplemented.
Ruling: this verifies already implemented components with actual SDK/KV/D1, not a new production feature; test may pass on first run. If it reveals a product bug, retain meaningful RED before any production correction. Fixture-only construction failures are diagnosed as harness failures, never "provider outage".
Ruling: branch/API/Actions ledger replaces local worktree/scripts under owner's cloud-first instruction; no native desktop/runtime mutation. Rollback source-only reviewed revert, preserve all live data/config/custody.

## Goal and files
New test/fixtures/preparation-code-worker.mjs ONLY test entrypoint, no production import/config/caller; new test/delegated-preparation-consent-code-native.test.mjs.
Real SDK1.2.1 parse/begin/approve/complete/code exchange/validateToken on native workerd KV; source D1 store with first-primary sessions; existing pure policy, schema checker, HTTP original lease, OAuth bridge/host/MCP/domain.
Actual Client StreamableHTTP legacy/modern; original JSON bounds and explicit legacy transport remain.
Human actor resolver, authorization UI/control routes, timing policy, limiter and grant-ACK fault are SYNTHETIC TEST adapters. No Access-JWT/human-consent/production-host/remote-provider proof, no customer/session/token reuse.
Actual SDK code/PKCE/KV tokens are generated/consumed only inside ephemeral runner. No static token validator and no secret printing/artifact. Only metadata/counts/sanitized failure messages.

## Tasks
1. Add test fixture +16subcases +this plan/docs, run existing CI and inspect actual result. Existing baseline tests remain mandatory; inspect logs after job completion.
2. Diagnose any mismatch from first primary failure, preserve distinction fixture vs product, narrowly repair and run same exact fullCI/lint/fivebuilds. No SSE fallback/scope widening/deadline renewal.
3. One fresh whole-branch reviewer (most capable available), read-only GitHub. Re-grade: Important/Critical ONE RED→GREEN fix pass; Minor ledger/defer, no re-review. Merge exact tested tree/head; mainCI; issue497 checkpoint supersedes pending ledger.

## Native cases
- Unknown scope/foreign project; exact schema absent before begin; fresh owner/schema after begin.
- SDK CSRF cookie, synthetic actor, Origin, extra/repeated fields and original read-only request cannot widen.
- Real SDK wrong PKCE/resource, code/consent replay; concurrent approval produces one appgrant and redirect.
- Grant ACK lost AFTER native D1 insert closes without code, marks appgrant revoked, no second grant or capsule.
- Explicit draft choice yields real KV token, no refresh, TTL bounded by original trial expiry; appgrant exchanged.
- Legacy uses issued token to prepare capsule; modern reconciles same result.
- Lost MCP HTTP ACK: exactly one write POST and explicit read with same real token, no reconnect/retry.
- D1 withdrawal blocks next prep read; actual SDK revocation also invalidates next HTTP; capsule history remains.
- No refresh/DCR, malformed token401. Original read Worker regression suite unchanged.

## Completion and gates
This increment can close ONLY protocol composition subset of Step2. It DOES NOT implement/accept production preparation consent/mount/UI, actual human/Cloudflare Access auth, additive schema migration, atomic grant issuance/recovery, native event subscription/usefulturn/withdrawal or PC-off/Max.
G2 accepted/CLOSED; never repeat OTP, catalog refresh, old grants/clients. G3 needs new Container02382110 evidence; G4/G5/G6 separate. operationalReadiness=false.
Exact initial/result/review/integration on carrying PR/issue497, no docs-only rerun loop.

## Task1 observed native failure and diagnosis
Firstf615fa90 / CI39347113127/job118382260623:2302PASS/6FAIL/1existingSKIP. Native scope/cookie/primary/PKCE/concurrent/ACK/code cases passed; legacy next request401 after main flow deliberately replayed its code; downstream MCP failures cascaded.
Primary exact SDK1.2.1 src/oauth-provider.ts handleAuthorizationCodeGrant: already-used valid code revokes all first-exchange tokens (RFC6749§10.5). This is correct provider behavior, not a Cloudflare outage or production bug.
Ruling: isolate malicious replay in its OWN issued-token flow and assert next native HTTP401; acquire a separate fresh code/token for valid MCP preparation. Keep original replay400 assertion and add family401; no weakening or synthetic token validator. Cost: one additional subcase/ephemeral grant in runner; no product/source runtime changes.
Task2 fixture sequence correction in candidate, exact GREEN/review/main pending. All16subcases require actual acceptance; no claims from this ledger before receipts.
