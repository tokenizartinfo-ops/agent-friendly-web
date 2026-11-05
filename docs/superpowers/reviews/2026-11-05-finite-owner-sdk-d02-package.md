# D0.2 integrated SDK/owned-recheck — full task review package

Repository: tokenizartinfo-ops/agent-friendly-web (1347578006).
BASE: f2c11705cf4f44c66d158444679640e727ae7de9
HEAD: d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72
Qualified standard code HEAD: 4148b25fd2c498495c48665072e08cb6ac5efc65. Later report commit adds report and removes only its workflow (root verified separate compare). All twelve BASE..HEAD changed files included; no workflow remains in net diff.

Existing modified files below use a recomputed full unified diff with 10 lines of context, from GitHub contents fetched at EXACT BASE and HEAD. Added files use complete GitHub patches. No local checkout/build. Full diff is the review view; read a changed file only if a hunk needed for judgment is genuinely cut off mid-function, stating that reason.

## Commits
- 1c70547f4f769d52ee24b99614b8bb61697d877e test(afw): expose missing D02 local result and wire helpers
- a5000b3c4eeb34af3d220a46cecc69ebdbdb5eac feat(afw): add strict local SDK provenance and one-path grammar
- 8bae8e2bfca828b94d2a5e3412ac8406b26176bf test(afw): compose native SDK and strict pending source boundary
- d3f70ce72a8fd3b1a4db3038374e89c376d311ad test(afw): dispose SDK fixture on every initialization failure
- 84a0f6795982f8c4ed519cfe54ff7caa8bbda770 test(afw): resolve pinned SDK package in native fixture
- ac45d433e35a18676f72d091f899970e5fd6100f test(afw): use accepted native multiworker option conversion
- 473a258316ea579913c1c56d88e20ae8929444e0 test(afw): locate native entry prerequisite failure without payloads
- e87a977e2646cb2175d94eb3ab507b5fbcc9ea66 test(afw): compare native fixture identity across worker composition
- 2e6cd00b683ff790e12e6b0104637b8006607372 test(afw): preserve native QA identity through fixture initialization
- 743759a606b5bcac9bde3d3be1aba3f8b396fdb8 feat(afw): keep SDK and original issuer continuation lexical in QA
- 8c77df94dc9cbf5d7dedf517354af53fb76b94b7 fix(afw): relay SDK redirect without following the native response
- 70f98bbd93596530d3c854d63af327a30f09655d test(afw): qualify lexical SDK retention and replay limits
- 8939680278b1d09f2b6854f1f598e6bd335cf38d test(afw): observe actual abort boundaries without changing transport
- 1247a965ab839a8d782661e0d69bb461c3d8e023 test(afw): align SDK native fixture with exact existing worker flags
- 40f0feb0ed4d29848cc155175793a0e897e22017 test(afw): complete owned SDK hostile matrix and exact-head qualification
- 7c9d6c3729d54769f23e83d598ec3a556d32d733 test(afw): preserve exact legacy pair failure contract
- 251060cf6f862dbf4dd0892bfa082b7935b0bebb fix(afw): preserve private legacy pair failure status and qualify exact source
- 44ab2c93d170086a8274bb2b5ae0b1e0e54a6c8a test(afw): await one disposal across every initialization failure path
- 371f5abf67218dd7336ce54d140da8ffbb17aeb0 ci(afw): qualify actual unmounted standard graph without assuming reader inclusion
- 4148b25fd2c498495c48665072e08cb6ac5efc65 ci(afw): preserve accepted shared DATA graph and exact effectful exclusions
- d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72 docs(afw): report D0.2 source qualification and remove owned qualifier

## Stat
- docs/superpowers/reports/2026-11-05-finite-owner-sdk-trust-boundary-d02.md +155 -0
- lib/mcp-qa-finite-owner-approved-ticket-facts.mjs +23 -0
- lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs +72 -0
- lib/mcp-qa-finite-owner-issuer-provenance-records.mjs +40 -0
- lib/mcp-qa-finite-owner-oauth-forward.mjs +30 -0
- lib/mcp-qa-finite-owner-oauth-qa.mjs +15 -0
- lib/mcp-qa-finite-owner-oauth-wire.mjs +42 -0
- lib/mcp-qa-finite-owner-phase-context.mjs +262 -11
- lib/mcp-qa-finite-owner-preparation.mjs +7 -7
- test/fixtures/finite-initial-entry-world.mjs +32 -14
- test/fixtures/finite-owner-qa-sdk.mjs +119 -0
- test/mcp-qa-finite-owner-qa-sdk-native.test.mjs +242 -0

## Full diff

### docs/superpowers/reports/2026-11-05-finite-owner-sdk-trust-boundary-d02.md

```diff
diff --git a/docs/superpowers/reports/2026-11-05-finite-owner-sdk-trust-boundary-d02.md b/docs/superpowers/reports/2026-11-05-finite-owner-sdk-trust-boundary-d02.md
@@ -0,0 +1,155 @@
+# Finite owner SDK trust boundary D0.2 — source qualification
+
+5 November 2026. Integrated actual QA SDK issuance and same-module lexical owned recheck. Candidate for ROOT's independent review; no operational acceptance.
+
+## Revision and scope
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT GitHub source and credential-free Actions; BRANCH feat/finite-native-cleanup-20261101. Original execution BASE f2c11705cf4f44c66d158444679640e727ae7de9. Final code head 4148b25fd2c498495c48665072e08cb6ac5efc65, tree 9c1f10f0a7807dec1f9c1a053cb96d680b6449ad. This report's exact containing commit/tree is identified by the CAS delivery receipt; it cannot embed its own commit hash. Rollback is a reviewed revert of this branch's D0.2 diff to BASE, not a runtime rollback.
+
+Sole product writer. GitHub App reads/tree/commit/expected-head ref updates only, with branch-head checks before every source write. No main mutation, merge, PR publication, local clone/build/test/dependency install, provider call, browser, credential, API-token reuse, binding installation, remote DDL, Entry or runtime action.
+
+Product diff: six new owner modules (approved-ticket DATA facts, issuer-provenance records/journal, OAuth wire/forwarder/receiver), and the existing phase-context/preparation modules. Tests: the new SDK test/fixture and minimal accepted initial-entry fixture reuse. Own bounded qualifier is removed in this report commit. Original Unit2a store/journal/schema, historical pins, Worker/DO entrypoints, ordinary OAuth store/worker, stage-work API, cleanup alarms, flags and dates remain unchanged.
+
+D0.1's accepted profile/alias contract is reused, not repeated as a task: proposed QA AFW_FINITE_OWNER_OAUTH_KV → existing 6b94ff702e504e14a7730cee73a0f6ff. This is namespace-wide QA read/write access, not per-key ACL/exclusive ownership; no actual access grant was installed. Original revised QA material/capsule binding must precede the one reserved Entry. D0.3 token compatibility, notice SQL, full mounting and installation remain INACTIVE.
+
+## Implementation and authority
+
+One private observeOwnerPhasePair engine remains in mcp-qa-finite-owner-phase-context.mjs. Both snapshots retain actual current primary observations, exact original CLOSED configuration and actual read_consent receipt/configuration, owner/revision/history/backup, clocks/holders, QA/M profile mapping and journal qualification. Private strict qualifySettledOwnerPair rejects unresolved SDK or Unit2a SEND. Existing readPrivateQaFiniteOwnerContext still returns only frozen {source,preconnectionId,capsuleHash}.
+
+The fixed OAuth handler is in that same module; oauth-qa contains only the unmounted receiver. Nested zero-argument recheckOwned compares both newly observed DATA frames to this invocation's exact fresh append ledger/program position. Actual request/root, SDK Promise/result and Unit2a store/consumption witness stay lexical. No allowPending, source/verifier callback, observation export, DTO authority, actor registry, copied witness or ordinary granting fallback exists.
+
+M only forwards original bounded GET/POST /authorize to /_finite-owner/authorize over one native request. It overwrites private metadata and relays bounded actual SDK cookies/redirect with redirect:manual. M metadata is untrusted DATA. Former SDK-result/report paths deny before SDK/journal/D1 effects.
+
+QA independently verifies original source, owner Access, preparation cookie, approval/ticket, scope and current state. SDK1.2.1 receives only frozen {OAUTH_KV:capturedAlias}; alias object/methods and surrounding holders are checked before/after application-controlled awaits. Fixed issuer/resource, two read scopes, TTL300, CIMDfalse; no SDK server.fetch/createClient/list/purge. GET performs actual parse/describe/begin, then fresh original reservation/open/authorization/ACK/link before form. POST performs actual approve, ExpectedGrant, genuine consume and insertReadGrant on the SAME actual store and SAME <=5s child, then fresh GrantLink/pair and actual completeAuthorization with revokeExistingGrants:false and original applicationGrantId/userId/projectId props.
+
+Local provenance has exact Root/SdkSend/SdkObserved/ExpectedGrant DATA, maximum eight rows/read-nine under the original A prefix, canonical own-data/domain hashes and <=16384-byte records, transaction/sync/exact readback. Only an awaited actual QA SDK result produces SdkObserved(outcome:resolved). SEND means intended call, not dispatch proof. Restart cannot hydrate ownership or repeat an unresolved SDK call. No raw handle, cookie, code, token, redirect or encrypted props enters these records/logs.
+
+Root's pure-link extraction ruling is preserved at docs/superpowers/reviews/2026-11-05-finite-owner-sdk-d02-link-facts-ruling.md on docs commit fc823057c7c0b9dea584748b543e78b5f4d9755a. Pure constructors/predicates reuse exact codecs and scope/expiry/source equalities; caller allocation, randomness, clocks, lifecycle and actual I/O stay in callers. Old linker control flow/readback and only-this-invocation fresh GrantLink mutation.status===recorded allocation gate remain. Self-review found pair predicate status403 versus original503; causal RED and the final private fixed pair503/ticket403 correction are recorded below.
+
+## Evidence chronology
+
+All runs attempt1, same bounded qualifier on Ubuntu24.04/Node22, permissions contents:read, checkout persist-credentials:false, npm ci --ignore-scripts --no-audit --no-fund, scoped lint before native work. Commands and case counts are qualified per head; no aggregate green claim is made for a later untested revision.
+
+| Head | Actions run / job | Result and causal boundary | Actual fixture esbuild calls |
+| --- | --- | --- | --- |
+| 1c70547f4f769d52ee24b99614b8bb61697d877e | 42018617906 / 127215365039 | helper RED 0P2F, missing functions; not native RED | 0 |
+| a5000b3c4eeb34af3d220a46cecc69ebdbdb5eac | 42018945636 / 127216504411 | helper GREEN 2P0F | 0 |
+| 8bae8e2bfca828b94d2a5e3412ac8406b26176bf | 42020190003 / 127220700276 | SDK package resolution failed before native path; leaked fixture eventually job-cancelled at timeout | 1 failed |
+| d3f70ce72a8fd3b1a4db3038374e89c376d311ad | 42020505691 / 127221776565 | guarded disposal/180s cap; 2P1F same exact resolution cause; infrastructure only | 1 failed |
+| 84a0f6795982f8c4ed519cfe54ff7caa8bbda770 | 42020897378 / 127223094244 | 2P1F: neutral build fixed with module/main; invalid composed Miniflare conversion before boot | 2 |
+| ac45d433e35a18676f72d091f899970e5fd6100f | 42021095932 / 127223766869 | 2P1F: whole multi-worker conversion boots, original Entry pending | 2 |
+| 473a258316ea579913c1c56d88e20ae8929444e0 | 42021444854 / 127224935968 | 2P1F: exact historical-source stage diagnostic | 2 |
+| e87a977e2646cb2175d94eb3ab507b5fbcc9ea66 | 42021889457 / 127226415314 | 2P1F: original/candidate IDs unequal across unnamed provisional versus named final QA | 2 |
+| 2e6cd00b683ff790e12e6b0104637b8006607372 | 42022171581 / 127227358395 | genuine pending RED 2P1F: IDs equal, actual Entry/material/source/SDK parser reached, durable begin SEND; expected200 got503 at strict recheck. No claim physical begin entered | 2 |
+| 743759a606b5bcac9bde3d3be1aba3f8b396fdb8 | 42022889958 / 127229777824 | 2P1F: GET/form/original authorization passed; POST404 instead302; missing manual redirect at fixed hop corrected next | 2 |
+| 8c77df94dc9cbf5d7dedf517354af53fb76b94b7 | 42023202563 / 127230857926 | first integrated actual GET/POST GREEN 3P0F | 2 |
+| 70f98bbd93596530d3c854d63af327a30f09655d | 42025070730 / 127237108500 | 8P3F: two observer assertions mixed write/read diagnostics; abort test used wrong actual fixture flags | 18 |
+| 8939680278b1d09f2b6854f1f598e6bd335cf38d | 42026238410 / 127241044076 | 3 diagnostic cases, wrong-profile evidence only; missing outgoing diagnostic fields explicitly unqualified | 6 |
+| 1247a965ab839a8d782661e0d69bb461c3d8e023 | 42026734064 / 127242700929 | 3P0F focused native signal qualification with exact existing profile flags | 6 |
+| 40f0feb0ed4d29848cc155175793a0e897e22017 | 42028096501 / 127247279377 | full matrix 32P1F/33; all behavior cases passed, remaining observer assertion wrongly required one statement in original eight-query Unit2a preflight; regressions/compiler skipped | 60 |
+| 7c9d6c3729d54769f23e83d598ec3a556d32d733 | 42029399559 / 127251664502 | focused pair expiry status RED 0P1F; valid pair accepted, expected503 rejected actual403 | 0 |
+| 251060cf6f862dbf4dd0892bfa082b7935b0bebb | 42029892326 / 127253353675 | selected7P0F including corrected pair/observer; original regressions212P1F/213: double fixture disposal masked intended initialization error; standard skipped | 6 SDK +161 regression |
+| 44ab2c93d170086a8274bb2b5ae0b1e0e54a6c8a | 42031124425 / 127257539718 | targeted3P0F: disposal, pair and uninstrumented actual source; standard compiler API succeeded, qualifier's unjustified reader-in-graph assertion failed | 3 fixture +3 standard |
+| 371f5abf67218dd7336ce54d140da8ffbb17aeb0 | 42031782622 / 127259802513 | standard API returned; extra unsupported exclusion of existing shared initial-anchors from M parsed graph failed; no tests repeated | 3 standard |
+| 4148b25fd2c498495c48665072e08cb6ac5efc65 | 42032209747 / 127261216306 | final standard-only source gate GREEN; scoped lint clean; no tests repeated | 3 standard |
+
+Native initial command: node --test test/mcp-qa-finite-owner-qa-sdk-native.test.mjs (bounded 180/300/600s as the matrix grew). Focused diagnostic command selected abort boundary diagnostic; pair RED selected legacy pair predicate. Selected SDK and affected regression commands are preserved in the workflow at 251060cf6f862dbf4dd0892bfa082b7935b0bebb; the final 4148 workflow is standard-only. Exact commands follow. 251060's narrow rerun covers the changed pure predicate and corrected observer assertions plus actual positive/held approve/held complete; unchanged hostile cases retain their precise40f0 evidence. 44ab2's targeted native rerun proves the only subsequent fixture disposal change. The final workflow-only correction makes no product/test change.
+
+No infrastructure/import/boot failure above is called native behavioral RED. Fixture corrections were: guarded awaited disposal for initialization exits; esbuild module/main resolution (standard compiler already correct and untouched); convertV4 on the whole raw multi-worker composition; consistent SDK-only logical QA name at provisional/final native idFromName; manual redirect on fixed hop; exact SDK-only native flags from existing finiteWranglerProfileTemplate. Old default fixture identity/modes and product flags/pins remain. The final disposal fix memoizes one awaited disposal Promise over the immutable initialization Miniflare instance; provisional/final construction uses setOptions on that same instance. Both initialization catches await it once. Later restart creates/disposes its separate current instance without consulting that memo.
+
+Actual flags now used and logged from Miniflare input: M date2026-09-07 flags[nodejs_compat,global_fetch_strictly_public,enable_request_signal]; QA same date flags[nodejs_compat,enable_request_signal]. With these existing flags, native M controller.abort and real root.finish both abort outgoing native Request, QA Request and QA genuine lease BEFORE held SDK settlement; actual late result observes aborted=true and creates no ACK. Node Miniflare dispatchFetch AbortSignal did not reach native M; that carrier limitation is separate and is not counted as successful native QA abort. Wrong-profile diagnostics did not show a product guard defect.
+
+Warnings: npm/Actions dependency deprecations, action runtime Node20 forcedNode24 notices and punycode; expected SDK CIMD-disabled warning for QA's fixed false option; native fixture RPC-stub-disposal warnings remain disclosed, not suppressed. The newly introduced unused canonical warning in7437 was removed in8c77; scoped lint is clean on all final heads. No flags changed to silence warnings.
+
+
+### Reproducible command boundaries
+
+All commands run in credential-free Actions after npm ci and scoped ESLint. Full matrix at40f0 used `timeout 600s node --test test/mcp-qa-finite-owner-qa-sdk-native.test.mjs`. At251060 the selected SDK command was:
+
+```sh
+timeout 180s node --test --test-name-pattern='D0.2|strict local|legacy pair|uninstrumented|held actual approve|held actual complete' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+```
+
+The affected original regression command at251060 was:
+
+```sh
+timeout 540s node --test \
+  test/mcp-qa-finite-owner-phase-context.test.mjs \
+  test/mcp-qa-finite-owner-phase-context-native.test.mjs \
+  test/mcp-qa-finite-owner-context.test.mjs \
+  test/mcp-qa-finite-owner-preparation-native.test.mjs \
+  test/mcp-qa-finite-preparation-issuer-records.test.mjs \
+  test/mcp-qa-finite-preparation-issuer-native.test.mjs \
+  test/mcp-qa-finite-owner-native-wire.test.mjs \
+  test/mcp-qa-finite-owner-native-conduit.test.mjs \
+  test/mcp-qa-finite-owner-native-conduit-native.test.mjs \
+  test/mcp-qa-finite-owner-request-retention.test.mjs \
+  test/mcp-qa-finite-owner-request-retention-native.test.mjs \
+  test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs \
+  test/mcp-qa-finite-policy-setup-facts-native.test.mjs
+```
+
+The causal fixture-fix qualification at44ab2 used `timeout 120s node --test --test-name-pattern='actual allocated phase fixture disposes|uninstrumented|legacy pair' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs test/mcp-qa-finite-owner-phase-context-native.test.mjs`. The final standard-only command is the bounded inline Node ES module in [.github/workflows/afw-d02-sdk-source.yml at4148](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/4148b25fd2c498495c48665072e08cb6ac5efc65/.github/workflows/afw-d02-sdk-source.yml), calling the unchanged `compileFiniteNativeStaging` with the actual checkout revision and closed readiness, then asserting the recorded graph facts/caps/exclusions. [Final Actions evidence](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42032209747/job/127261216306).
+
+## Required hostile and ownership coverage
+
+Coverage is deliberately split by revision: 32 behavioral/pure cases passed at40f0; its one observer-only assertion passed after exact preflight classification at251060. The added pair-status regression passed at251060 and44ab2. Of213 original affected tests,212 passed at251060 and the sole initialization-disposal regression passed at44ab2 after the fixture-only fix. Final product source is identical between251060 and the final compiler head; only initialization fixture/workflow changed. No single-head claim of34 SDK tests or213 original tests is made.
+
+| Contract / causal boundary | Evidence and limit |
+| --- | --- |
+| Actual GET/POST, original app UUID, scopes/props, shared KV | Final uninstrumented native race positive; actual SDK transaction/grant/code and encrypted original props audited in memory through M's shared native KV. Application row absent before POST. Instrumented approve case additionally observes actual grant ACK before the only SDK grant put. |
+| Forged prior result protocol before success | Uninstrumented oldPaths before first GET: five old internal/public paths with valid owner headers and fabricated result fields deny; original journals, SDK calls and historical/app rows unchanged. No positive path exists for reports. |
+| Held actual approve / another invocation | Final held-approve case: actual native transaction get held; no app grant/complete before real result; fabricated paths and another full bearer request cannot borrow occupancy. Actual SDK delete/complete runs once after release. |
+| Held actual complete / late result | Final held-complete case: app grant and ACK already exist; actual SDK grant put's settlement held; forged completed path cannot append observed; original <=30s parent expires, SDK promise remains retained. Late settlement changes no application journal, then recreated actor cannot resume. |
+| Bare replay limit | Final clean positive races two byte-identical valid owner+SDK submissions: exactly one302 and one503; actual original grant/code only. Completed replay adds nothing and winner remains unrevoked. Missing SDK cookie and stale actual transaction fail despite copied public fields (40f0); no human-presence or authenticated-M claim. |
+| Strict same-ambient reader versus owned continuation | Final held-approve instrumentation explicitly requires strictUnavailable at SDK approve/complete and issuer consume/grant SEND in the SAME genuine ambient lineage. The actual owning handler continues, retaining true store/child/consumption identities; unrelated new-reader request is unavailable. |
+| Extra/foreign SDK or issuer DATA | 40f0 actual held-begin rejects extra SDK/issuer rows and a well-formed forged local SDK observed record without adopting it; physical storage remains exactly the hostile input snapshot after denial. |
+| Freeze / ACK / policy uncertainty | 40f0 held-approve rejects valid original issuer freeze or changed issuer ACK; held-begin rejects original policy SEND whose ACK is missing. No grant/late local observed follows. |
+| Common guards inside owned recheck | 40f0 held SDK cases reject retained-backup tamper, current module/pointer/configuration drift and actual owner-project revision change. Common observer is not replaced by a positive fixture alias. |
+| Both repeated current/original snapshots | 40f0 current read_consent configuration drift and original CLOSED-to-open configuration drift are each introduced at first and at second observation after actual SDK result. All deny before new observed/issuer progression. Existing standard-reader regressions independently cover its full actual receipt, QA pointer, module/owner/history chain. |
+| Native abort / held promises | 1247 and40f0 exact native profile controller/root.finish tests observe QA Request+genuine lease abortion before SDK settlement and no late observed. Node dispatchFetch signal never arriving at native M is separately classified; it is not a native abort qualification. |
+| Original parent and expiry | 40f0 real29s delay before forwarding leaves no renewed budget and returns pending within original30s; may expire before actual SDK entry. Actual Access expiry during held begin denies late result. Original issuer native regression cases exercise C0, consent, grant and child-deadline expiry at real SQL execution; no production Date/SQL-clock substitution. |
+| Genuine same-child stale SQL | 40f0 handler queue-open and queue-grant delay actual unchanged native SQL5100ms; row is absent at physical execution. Grant case retains already-real consumption ACK but creates no grant/complete. SAME <=5s child is not renewed; subsequent requests perform zero additional SDK calls. |
+| Missing schema / incomplete first GET | 40f0 missing issuer table denies before any SDK lookup or claim. Queued original open leaves actual begin observed/reservation/unresolved open SEND, never form/authorization; new GET cannot restart SDK. |
+| Actual KV miss/error/stale | 40f0 actual SDK receives native client miss/error or absent transaction from a test-only negative KV wrapper; no substitute source/approved result. Unresolved approve cannot be retried. Resolved local complete is not propagation proof and no missing-code repair/reissue path exists. |
+| Mapping and holders | 40f0 wrong actual QA alias namespace, extra same-account binding, changed QA module, absent native alias and same-shaped method replacement deny SDK/app progression. Revised original source mapping and actual current M mapping are checked by the common engine in both snapshots. |
+| History and no unrelated mutations | Every new world compares exact original historical D1 grants before/after; final approve call trace permits only client/transaction gets, transaction delete and one acknowledged SDK grant put, with no list/purge/createClient/token or other grant mutation. Original legacy linker/native issuer regressions remain separate. |
+| Records, grammar and old semantics | Pure canonical/domain/field/prototype/accessor/symbol/size/clock tests; former SdkAck rejected. Final pair-negative checks original503 after causal RED; ticket403 remains fixed. Existing linker tests cover exact original grant over newer matches, unmapped/unconsumed rejection, idempotence, lost ACK and no allocation from pre-existing GrantLink. |
+
+## Actual versus SYN and retained uncertainty
+
+Actual: two native Workers/QA DO; one shared isolated native KV namespace mapped as M.OAUTH_KV and QA alias; installed dependency SDK1.2.1; original source/record/journal/Unit2a code and native SQLite execution clock; exact original app UUID; actual returned consumption witness on same store/child; actual native transaction, approve/delete, SDK grant/code and original encrypted props. Test-only read audit decrypts this test's grant using the SDK1.2.1 public HMAC/AES-KW/AES-GCM format and its actual returned code, only in memory; no /token exchange or D0.3 compatibility assertion.
+
+SYN: external Access identity/JWKS and owner approvals, provider/ledger/custody/material/history inputs, short resident candidate bytes, isolated client registry seed and expired source ceiling substitution. Product ceiling2026-11-03T02:59:00Z remains expired/unchanged. SDK-only fixture mappings do not prove an actual Cloudflare alias grant. Legacy linker fixtures retain their already accepted source substitutions and are only regressions, never the actual-source D0.2 positive.
+
+Uninstrumented positive is separate from hostile observers. Fixed test-only same-ambient strict-reader probes run at SDK/issuer SEND; native KV wrappers invoke the real methods/results and hold their settlement as seen by actual SDK. A hold can occur after the physical native KV operation has committed. Thus retained whole SDK Promise and no late application ACK/progression are proved, not remote KV cancellation, absence of an opaque late write, propagation/token visibility or global physical drain. No SDK purge/list/reissue repairs uncertainty.
+
+## Native timing and live feasibility limit
+
+Measured from actual dispatch to response, excluding fixture setup. Clean uninstrumented251060: GET3716ms, POST4396ms; consume SEND issued1793882791256 to grant ACK observed1793882792355 =1099ms, with3720ms remaining to that same Send.deadline. There were84 mocked Cloudflare-provider GET observations and zero ledger GET observations INSIDE that interval. Instrumented held-approve at the same head: GET4103ms, POST5707ms, interval1433ms, remaining3390ms,112 provider/zero ledger GETs (additional strict-reader probes).
+
+Final unchanged-product positive44ab2: GET2763ms, POST3308ms; consume1793883325007 → ACK1793883325830 =823ms, remaining4047ms; again84 provider/zero ledger GETs inside the child interval. Bounds are entry.at >= consumeSend.issuedAt && entry.at <= grantAck.observedAt, filtered by actual outbound method GET and allowlisted provider origin enum. These are fresh source-control observations, not a count of the whole POST. Native SQLite clock is real; outbound provider latency is SYN in-process.
+
+84 real control-plane GETs plus actual issuance in an unchanged <=5s child is a material unresolved operational feasibility risk. These synthetic latencies are not a production SLA, availability proof or permission to launch. No clocks widened, common checks removed or authority cached. A future separately authorized nonconsuming real-latency gate is required.
+
+## Compiler graph, counts and remaining gates
+
+The standard compiler API succeeded on three heads. The first two enclosing gates failed only at my added graph assertions: expecting a standard phase reader, then excluding pre-existing shared initial-anchors. Root corrected both assumptions using actual entrypoints and the accepted D0.1/shared-DATA ruling. Nothing was imported/mounted or removed from product to satisfy a graph test. The final4148 gate prints metadata first, preserves original guards and checks the actual unmounted boundary.
+
+| Final standard role at 4148b25fd2c498495c48665072e08cb6ac5efc65 | Bytes / unchanged cap | SHA-256 | Actual graph facts |
+| --- | --- | --- | --- |
+| canaryLive M | 1,951,985 /2,097,152 | c3f5ebf96dfec15b8f4ee43e5926c7c543a454d4ef57700bbd40245e9a1ece06 |331 parsed inputs; phase reader absent/emitted0; existing ordinary SDK1 parsed input/227759 emitted bytes; new finite forwarder/QA receiver absent |
+| qaLive |2,021,421 /3,145,728 |1debc2b2f078ab0b3c9de84fc9c20fedddefdcaa2e4e2305622f324dd96c7aa7 |305 parsed inputs; phase reader absent/emitted0; SDK0 parsed/emitted; new finite forwarder/QA receiver absent |
+
+Final source tree 9c1f10f0a7807dec1f9c1a053cb96d680b6449ad; source revision was verified before/after by the unchanged compiler. M excludes effectful initial-entry, bootstrap-source/issuer, candidate-residency decoder, preparation issuer store/journal and native filesystem/esbuild imports. Shared initial-anchors/Entry DATA records are permitted existing dependencies, as already ruled at D0.1. These standard bytes meet existing caps but do not qualify a mounted SDK/reader graph or its eventual budget.
+
+Separate uninstrumented component fixture at44ab2: QA1,686,627 bytes,320 inputs,SHA9414910403a4d2bcdc930e7d4bccf8e1f21caca54f3d0e2bb7ba4b54cf7703ac; M109,279 bytes,187 inputs,SHA518ec6763dc13f8cd1c6dc7b62a4e185bf95767f342954b9908d3bab6a6db734. That QA fixture DOES compile/execute the actual phase reader, fixed handler, SDK and Unit2a together, using disclosed SYN provider/history/candidate descriptors and ceiling. Other fixture hashes vary with the explicit per-world SYN ceiling and instrumentation; all actual invocation counts are retained below.
+
+Before the final qualification, explicitly authored fixture build invocations total106: 16 through first integrated GREEN, +18 hostile, +6 wrong-profile diagnostic, +6 corrected-profile diagnostic, +60 full matrix. Two of106 failed package resolution; all later calls compiled their two fixture roles. Helper/pair REDs invoke no compiler. Standard compileFiniteNativeStaging calls through251060: zero (earlier gates skipped); buildFiniteNativePackage calls: zero. Final accounting: +6 SDK fixture builds at251060; +161 original regression component builds there; +3 fixture builds at44ab2 (one original init-failure case plus two SDK roles); and +9 standard esbuild calls from THREE actual compileFiniteNativeStaging calls (44ab2,371f5,4148), each one node program and two Worker roles. Total explicit esbuild calls285:276 fixture/component plus9 standard, including the two early failed SDK package resolutions. buildFiniteNativePackage invoked zero times. The161 original regression builds are80 phase-context worlds,32 preparation worlds,33 Unit2a issuer cases,6 conduit role builds across3 cases,8 retention worlds,1 setup-facts world and1 original-context world. Each has one authored esbuild call unless the two conduit roles are explicit. This tally excludes predecessor D0.1's already accepted compiler runs and Miniflare/workerd's internal module parsing/JIT. No nested compiler is hidden in initialHistoryFixture/bootstrapWorld (source read); each initialEntryHarness SDK case compiles QA once and its M composition once. Distinguish fixture esbuild invocations, native regression component esbuilds and the standard compiler API.
+
+operationalReadiness=false; completePackage=false; PCoff=false. No full mounted SDK graph/QA3MiB proof, runtime access installation, live canary, owner browser, real provider timing, token compatibility, notices, launch or deployment is claimed. Follow-up gates remain with ROOT. The high number of provider observations inside the <=5s child requires a separately authorized nonconsuming real-latency preflight before any later operational acceptance; no clocks, common checks or authority caching were changed to improve synthetic timing.
+
+
+## Delivery boundary
+
+The final report commit changes only this report and deletes .github/workflows/afw-d02-sdk-source.yml. Its HEAD/tree differ from the exact compiler head above; it is not a separately compiled artifact. Product/test source remains byte-identical to the qualified final source. Final status: DONE_WITH_CONCERNS for ROOT review, with unmounted/inactive operational gates, documented Node carrier limitation and unresolved live critical-path latency. No further task is activated by this delivery.
```

### lib/mcp-qa-finite-owner-approved-ticket-facts.mjs

```diff
diff --git a/lib/mcp-qa-finite-owner-approved-ticket-facts.mjs b/lib/mcp-qa-finite-owner-approved-ticket-facts.mjs
@@ -0,0 +1,23 @@
+import {initialOwn as own,initialFields as fields} from './mcp-qa-finite-initial-material-records.mjs';
+import {hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash,hashFinitePreparationRecord as hash,encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode} from './mcp-qa-finite-preparation-records.mjs';
+import {createHash} from 'node:crypto';
+const fail=()=>{const e=Error('Finite owner preparation unavailable');e.status=403;throw e;};
+const failPair=()=>{const e=Error('Finite owner preparation unavailable');e.status=503;throw e;};
+const sha=x=>createHash('sha256').update(x).digest('hex');
+/** Pure predicates; actual owner verification, clocks and all I/O stay with callers. */
+export function qualifyFiniteOwnerApprovedTicket(input){
+ const v=own(input);fields(v,['source','identity','currentTicket','ticket','use','pre','approval','snapshot','realm','subjectHash','observedAt']);
+ const {source,identity,currentTicket,ticket,use,pre,approval,snapshot,realm,subjectHash,observedAt}=v,id=currentTicket.preconnectionId;
+ const decision=evidence('decision',{ticket,decision:'approve',projectHash:projectHash(source.project),goal:source.goal,clientId:source.clientId,approvedAt:approval.approvedAt,expiresAt:approval.expiresAt});
+ if(ticket.preconnectionId!==id||ticket.projectRef!==currentTicket.projectRef||ticket.subjectHash!==subjectHash||use.recordHash!==decision||approval.csrfReceiptHash!==decision||hash('ConfigurationApproval',approval)!==pre.approvalHash||approval.subjectHash!==subjectHash||approval.sourceRevision!==source.sourceRevision||approval.projectHash!==projectHash(source.project)||approval.clientId!==source.clientId||pre.owner.subject!==identity.subject||pre.owner.accessRealmHash!==realm||pre.sourceRevision!==source.sourceRevision||pre.actorId!==source.actorId||pre.clientId!==source.clientId||pre.resource!==source.resource||projectHash(pre.project)!==projectHash(source.project)||pre.baselineHash!==evidence('baseline',snapshot.source.initialBaseline)||!Number.isSafeInteger(observedAt)||observedAt>=Math.min(pre.expiresAt,pre.owner.accessExpiresAt,approval.expiresAt))fail();
+}
+const data=(kind,input)=>decode(kind,encode(kind,own(input)));
+export const finiteOwnerAuthorizationLink=input=>data('AuthorizationLink',input);
+export const finiteOwnerGrantLink=input=>data('GrantLink',input);
+export const finiteOwnerPreconnectionConnection=input=>data('PreconnectionConnection',input);
+export const finiteOwnerConnectionRef=input=>data('ConnectionRef',input);
+export function qualifyFiniteOwnerConnectionPair(input){
+ const v=own(input);fields(v,['source','identity','pre','link','grant','relation','connection','observedAt']);
+ const {source,identity,pre,link,grant,observedAt}=v,relation=finiteOwnerPreconnectionConnection(v.relation),connection=finiteOwnerConnectionRef(v.connection);
+ if(relation.preconnectionId!==pre.preconnectionId||relation.grantHash!==sha(grant.grantId)||relation.grantHash!==link.grantHash||relation.linkedAt<link.acceptedAt||relation.linkedAt>observedAt||connection.connectionRef!==relation.connectionRef||connection.issuedAt!==relation.linkedAt||connection.subject!==identity.subject||connection.grantId!==grant.grantId||connection.clientId!==source.clientId||connection.projectId!==source.project.projectId||connection.resource!==source.resource||connection.expiresAt>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,Date.parse(grant.expiresAt))||!Number.isSafeInteger(observedAt)||observedAt>=connection.expiresAt)failPair();
+}
```

### lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs

```diff
diff --git a/lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs b/lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs
@@ -0,0 +1,72 @@
+import {initialOwn as own,initialFields as fields,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
+import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
+import {FINITE_OWNER_ISSUER_PROVENANCE_PREFIX as P,FINITE_OWNER_SDK_OPERATIONS as OPS,encodeFiniteOwnerIssuerProvenanceRecord as encode,decodeFiniteOwnerIssuerProvenanceRecord as decode} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
+const fail=()=>{throw Error('Finite owner issuer provenance unavailable');};
+export function createFiniteOwnerIssuerProvenanceJournal(options){
+ fields(options,['ctx','env']);const c=captureFinitePreparationIssuerContext(options);
+ const prefix=id=>{if(!hex(id))fail();return P+id+':';};
+ const record=(kind,value)=>decode(kind,encode(kind,value));
+ async function inventory(id,guard,storage=c.storage){
+  const list=storage.list;if(typeof list!=='function')fail();guard();
+  const rows=await c.wait(Reflect.apply(list,storage,[{prefix:prefix(id),limit:9}]),guard);
+  if(!(rows instanceof Map)||rows.size>8)fail();
+  const out={root:null,grant:null,operations:Object.fromEntries(OPS.map(op=>[op,{send:null,observed:null}]))},entries=[];
+  for(const [key,raw]of rows){
+   const suffix=key.slice(prefix(id).length);let kind,target,field;
+   if(suffix==='root'||suffix==='grant'){kind=suffix==='root'?'Root':'ExpectedGrant';target=out;field=suffix;}
+   else{const parts=suffix.split(':');if(parts.length!==2||!OPS.includes(parts[0])||!['send','observed'].includes(parts[1]))fail();kind=parts[1]==='send'?'SdkSend':'SdkObserved';target=out.operations[parts[0]];field=parts[1];}
+   target[field]=decode(kind,raw);entries.push(Object.freeze([key,raw]));
+  }
+  const root=out.root;
+  if(!root){if(rows.size)fail();}
+  else{
+   if(root.preconnectionId!==id||root.actorId!==c.actorId||root.qaVersionId!==c.qa)fail();
+   for(const op of OPS){
+    const {send,observed}=out.operations[op];
+    if(send&&(send.rootHash!==root.recordHash||send.operation!==op||send.issuedAt<root.createdAt||send.deadline>root.C0))fail();
+    if(observed&&(!send||observed.sendHash!==send.recordHash||observed.observedAt<send.issuedAt||observed.observedAt>=send.deadline))fail();
+   }
+   const begin=out.operations.sdk_begin,approve=out.operations.sdk_approve,complete=out.operations.sdk_complete;
+   if(approve.send&&!begin.observed||out.grant&&(!approve.observed||out.grant.rootHash!==root.recordHash||Date.parse(out.grant.createdAt)<approve.observed.observedAt||Date.parse(out.grant.expiresAt)>root.C0)||complete.send&&(!out.grant||complete.send.bindingHash!==out.grant.recordHash))fail();
+  }
+  for(const op of OPS)Object.freeze(out.operations[op]);Object.freeze(out.operations);
+  return Object.freeze({...out,entries:Object.freeze(entries.sort(([a],[b])=>a.localeCompare(b)))});
+ }
+ async function append(id,suffix,kind,input,lease){
+  const value=record(kind,input),raw=encode(kind,value),guard=c.leaseGuard(lease);guard();
+  try{
+   const status=await c.wait(Reflect.apply(c.transaction,c.storage,[async tx=>{
+    const get=tx.get,put=tx.put,list=tx.list;if([get,put,list].some(x=>typeof x!=='function'))fail();
+    const check=()=>{guard();if(tx.get!==get||tx.put!==put||tx.list!==list)fail();};
+    const before=await inventory(id,check,tx),root=before.root;
+    const old=await c.wait(Reflect.apply(get,tx,[prefix(id)+suffix]),check);
+    if(old!==undefined){if(old!==raw)fail();return 'existing';}
+    if(before.entries.length>=8)fail();
+    if(kind==='Root'){if(root||value.preconnectionId!==id||value.actorId!==c.actorId||value.qaVersionId!==c.qa)fail();}
+    else{
+     if(!root)fail();
+     if(kind==='SdkSend'){
+      if(value.rootHash!==root.recordHash||value.operation+':send'!==suffix||value.issuedAt<root.createdAt||value.deadline>root.C0)fail();
+      if(value.operation==='sdk_approve'&&!before.operations.sdk_begin.observed||value.operation==='sdk_complete'&&(!before.grant||value.bindingHash!==before.grant.recordHash))fail();
+     }
+     if(kind==='SdkObserved'){
+      const send=before.operations[suffix.split(':')[0]]?.send;
+      if(!send||value.sendHash!==send.recordHash||value.observedAt<send.issuedAt||value.observedAt>=send.deadline)fail();
+     }
+     if(kind==='ExpectedGrant'&&(!before.operations.sdk_approve.observed||value.rootHash!==root.recordHash||Date.parse(value.createdAt)<before.operations.sdk_approve.observed.observedAt||Date.parse(value.expiresAt)>root.C0))fail();
+    }
+    check();await c.wait(Reflect.apply(put,tx,[prefix(id)+suffix,raw]),check);return 'recorded';
+   }]),guard);
+   await c.wait(Reflect.apply(c.sync,c.storage,[]),guard);
+   if(await c.wait(Reflect.apply(c.get,c.storage,[prefix(id)+suffix]),guard)!==raw)fail();
+   return Object.freeze({status,recordHash:value.recordHash});
+  }catch{return Object.freeze({status:'uncertain',recordHash:value.recordHash});}
+ }
+ return Object.freeze({
+  read(input,lease){const v=own(input);fields(v,['preconnectionId']);return inventory(v.preconnectionId,c.leaseGuard(lease));},
+  appendRoot(input,lease){const r=record('Root',input);return append(r.preconnectionId,'root','Root',r,lease);},
+  appendSend(input,lease){const v=own(input);fields(v,['preconnectionId','record']);const r=record('SdkSend',v.record);return append(v.preconnectionId,r.operation+':send','SdkSend',r,lease);},
+  appendObserved(input,lease){const v=own(input);fields(v,['preconnectionId','operation','record']);if(!OPS.includes(v.operation))fail();return append(v.preconnectionId,v.operation+':observed','SdkObserved',v.record,lease);},
+  appendExpectedGrant(input,lease){const v=own(input);fields(v,['preconnectionId','record']);return append(v.preconnectionId,'grant','ExpectedGrant',v.record,lease);}
+ });
+}
```

### lib/mcp-qa-finite-owner-issuer-provenance-records.mjs

```diff
diff --git a/lib/mcp-qa-finite-owner-issuer-provenance-records.mjs b/lib/mcp-qa-finite-owner-issuer-provenance-records.mjs
@@ -0,0 +1,40 @@
+import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
+import {issuerTime,issuerUuid,issuerScopes,issuerIso} from './mcp-qa-finite-preparation-issuer-records.mjs';
+// Canonical DATA commitments only. No record asserts caller identity or ownership.
+export const FINITE_OWNER_ISSUER_PROVENANCE_PREFIX='afw.finite-owner-issuer-provenance.v1:';
+export const FINITE_OWNER_SDK_OPERATIONS=Object.freeze(['sdk_begin','sdk_approve','sdk_complete']);
+const defs={
+ Root:['preconnectionId','capsuleHash','enrollmentHash','sourceRevision','actorId','qaVersionId','mVersionId','originalConnectionReceiptHash','I0','C0','C1','createdAt'],
+ SdkSend:['rootHash','operation','originalRequestId','originalRequestHash','issuedAt','deadline','bindingHash'],
+ SdkObserved:['sendHash','resultHash','observedAt','outcome'],
+ ExpectedGrant:['rootHash','identityHash','reservationHash','authorizationHash','grantId','approvedRequestHash','scopes','createdAt','expiresAt']
+};
+const purposes={Root:'afw.finite-owner-issuer-root.v1',SdkSend:'afw.finite-owner-sdk-send.v1',SdkObserved:'afw.finite-owner-sdk-observed.v1',ExpectedGrant:'afw.finite-owner-expected-grant.v1'};
+const fail=()=>{throw Error('Finite owner issuer provenance unavailable');};
+const check=v=>{if(!v)fail();};
+function validate(kind,input,sealing=false){
+ check(Object.hasOwn(defs,kind));
+ const v=own(input);fields(v,['purpose',...defs[kind],...(!sealing||Object.hasOwn(v,'recordHash')?['recordHash']:[])]);
+ check(v.purpose===purposes[kind]&&Buffer.byteLength(canonical(v))<=16384);
+ for(const [key,value]of Object.entries(v))if(key.endsWith('Hash'))check(hex(value));
+ if(kind==='Root'){
+  check(hex(v.preconnectionId)&&hex(v.actorId)&&hex(v.sourceRevision,40)&&issuerUuid(v.qaVersionId)&&issuerUuid(v.mVersionId));
+  check(['I0','C0','C1','createdAt'].every(k=>issuerTime(v[k]))&&v.C0===v.I0+900000&&v.C1===v.C0+180000&&v.createdAt>=v.I0&&v.createdAt<v.C0);
+ }
+ if(kind==='SdkSend')check(FINITE_OWNER_SDK_OPERATIONS.includes(v.operation)&&issuerUuid(v.originalRequestId)&&issuerTime(v.issuedAt)&&issuerTime(v.deadline)&&v.issuedAt<v.deadline&&v.deadline-v.issuedAt<=30000);
+ if(kind==='SdkObserved')check(v.outcome==='resolved'&&issuerTime(v.observedAt));
+ if(kind==='ExpectedGrant')check(issuerUuid(v.grantId)&&issuerScopes(v.scopes)&&issuerIso(v.createdAt)&&issuerIso(v.expiresAt)&&Date.parse(v.createdAt)<Date.parse(v.expiresAt));
+ const body=Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'));
+ if(!sealing)check(v.recordHash===hash(v.purpose,body));
+ return v;
+}
+export function sealFiniteOwnerIssuerProvenanceRecord(kind,input){
+ const v=validate(kind,input,true),body=Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'));
+ return validate(kind,{...body,recordHash:hash(v.purpose,body)});
+}
+export function encodeFiniteOwnerIssuerProvenanceRecord(kind,input){
+ const raw=canonical(validate(kind,input));check(Buffer.byteLength(raw)<=16384);return raw;
+}
+export function decodeFiniteOwnerIssuerProvenanceRecord(kind,raw){
+ check(typeof raw==='string'&&Buffer.byteLength(raw)<=16384);const v=validate(kind,JSON.parse(raw));check(canonical(v)===raw);return v;
+}
```

### lib/mcp-qa-finite-owner-oauth-forward.mjs

```diff
diff --git a/lib/mcp-qa-finite-owner-oauth-forward.mjs b/lib/mcp-qa-finite-owner-oauth-forward.mjs
@@ -0,0 +1,30 @@
+import {readFiniteOwnerRequestContext,readFiniteOwnerRequestBoundary} from './mcp-qa-finite-owner-preparation.mjs';
+import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
+import {finiteNativeFailure as fail,finiteNativeUuid} from './mcp-qa-finite-owner-native-wire.mjs';
+import {finiteOwnerOAuthTarget,qualifyFiniteOwnerOAuthRequest,readFiniteOwnerOAuthMetadata,finiteNativeActor,finiteNativePreservedHeaders,finiteNativeOperation,finiteNativeBytes,finiteNativePending as pending} from './mcp-qa-finite-owner-oauth-wire.mjs';
+/** Unmounted forwarding only. Transport metadata never asserts SDK results. */
+export async function forwardPrivateFiniteOwnerOAuth({request,env,ctx},originalLease){
+ try{
+  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
+  const namespace=env?.AFW_FINITE_TRIAL_CONTROL,idFromName=namespace?.idFromName,get=namespace?.get,metadata=env?.AFW_FINITE_TRIAL_VERSION,version=metadata?.id;
+  if([idFromName,get].some(v=>typeof v!=='function')||!finiteNativeUuid(version))fail();
+  const id=Reflect.apply(idFromName,namespace,[finiteNativeActor]),actor=id.toString(),stub=Reflect.apply(get,namespace,[id]),fetcher=stub?.fetch;
+  if(!/^[a-f0-9]{64}$/.test(actor)||typeof fetcher!=='function')fail();
+  const check=()=>{originalLease.assertCurrent();if(env.AFW_FINITE_TRIAL_CONTROL!==namespace||namespace.idFromName!==idFromName||namespace.get!==get||Reflect.apply(idFromName,namespace,[finiteNativeActor]).toString()!==actor||stub.fetch!==fetcher||env.AFW_FINITE_TRIAL_VERSION!==metadata||metadata.id!==version)fail();};
+  check();
+  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async first=>{
+   const bytes=await finiteNativeBytes(request,check,first);check();qualifyFiniteOwnerOAuthRequest(request,bytes);
+   const headers=new Headers();for(const name of finiteNativePreservedHeaders){const value=request.headers.get(name);if(value!==null)headers.set(name,value);}
+   headers.set('x-afw-finite-boundary',JSON.stringify(readFiniteOwnerRequestBoundary(originalLease)));
+   headers.set('x-afw-finite-original-method',request.method);headers.set('x-afw-finite-original-url',request.url);
+   headers.set('x-afw-finite-version',version);headers.set('x-afw-finite-request-id',crypto.randomUUID());
+   readFiniteOwnerOAuthMetadata(headers);check();
+   const response=await Reflect.apply(fetcher,stub,[new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]);check();
+   const body=await finiteNativeBytes(response,check,first,503);check();
+   if(![200,302].includes(response.status))return pending([400,401,403,404,405,413,429].includes(response.status)?response.status:503);
+   const output=new Headers({'Cache-Control':'no-store'});
+   for(const [key,value]of response.headers){if(!['content-type','content-security-policy','referrer-policy','location','set-cookie','cache-control','x-frame-options'].includes(key)||value.length>8192)fail();output.append(key,value);}
+   check();return new Response(body,{status:response.status,headers:output});
+  }));
+ }catch{return pending();}
+}
```

### lib/mcp-qa-finite-owner-oauth-qa.mjs

```diff
diff --git a/lib/mcp-qa-finite-owner-oauth-qa.mjs b/lib/mcp-qa-finite-owner-oauth-qa.mjs
@@ -0,0 +1,15 @@
+import {createFiniteOwnerForwardedRequestLease} from './mcp-qa-finite-owner-preparation.mjs';
+import {finiteOwnerOAuthTarget,readFiniteOwnerOAuthMetadata,finiteNativePending as pending} from './mcp-qa-finite-owner-oauth-wire.mjs';
+import {handlePrivateQaFiniteOwnerOAuth} from './mcp-qa-finite-owner-phase-context.mjs';
+export function createPrivateQaFiniteOwnerOAuthReceiver({ctx,env}){
+ return Object.freeze({async fetch(request){
+  let parent;
+  try{
+   if(!(request instanceof Request)||request.url!==finiteOwnerOAuthTarget)return pending(404);
+   if(request.method!=='POST')return pending(405);
+   const metadata=readFiniteOwnerOAuthMetadata(request.headers);
+   parent=createFiniteOwnerForwardedRequestLease(request,metadata.boundary);
+   return await handlePrivateQaFiniteOwnerOAuth({request,env,ctx},parent.lease);
+  }catch{return pending();}finally{parent?.finish();}
+ }});
+}
```

### lib/mcp-qa-finite-owner-oauth-wire.mjs

```diff
diff --git a/lib/mcp-qa-finite-owner-oauth-wire.mjs b/lib/mcp-qa-finite-owner-oauth-wire.mjs
@@ -0,0 +1,42 @@
+import {finiteNativeOrigin as origin,finiteNativeHeaders,finiteNativeUuid,finiteNativeFailure as fail} from './mcp-qa-finite-owner-native-wire.mjs';
+export {finiteNativeOrigin,finiteNativeActor,finiteNativePreservedHeaders,finiteNativeOperation,finiteNativeBytes,finiteNativeCancel,finiteNativePending} from './mcp-qa-finite-owner-native-wire.mjs';
+export const finiteOwnerOAuthTarget='https://afw-private.invalid/_finite-owner/authorize';
+const max=16384;
+function shape(params,keys,multiple=[]){
+ for(const key of params.keys())if(!keys.includes(key))fail(400);
+ for(const key of keys)if(params.getAll(key).length>1&&!multiple.includes(key))fail(400);
+ for(const [key,value]of params)if(!value||value.length>4096||/[\u0000-\u001f\u007f]/.test(key+value))fail(400);
+}
+export function qualifyFiniteOwnerOAuthRequest(request,bytes){
+ if(!(request instanceof Request)||!(bytes instanceof Uint8Array)||bytes.length>max)fail(400);
+ const url=new URL(request.url);
+ if(url.origin!==origin||url.pathname!=='/authorize'||url.hash||url.username||url.password||request.url.length>max)fail(404);
+ if(!['GET','POST'].includes(request.method))fail(405);
+ let form=null;
+ if(request.method==='GET'){
+  if(bytes.length)fail(400);
+  const q=url.searchParams,keys=['client_id','redirect_uri','response_type','resource','scope','state','code_challenge','code_challenge_method'];
+  shape(q,keys);if(keys.some(k=>q.getAll(k).length!==1)||q.get('response_type')!=='code'||q.get('resource')!==origin+'/mcp'||q.get('code_challenge_method')!=='S256'||!/^[-_A-Za-z0-9]{43}$/.test(q.get('code_challenge')))fail(400);
+  const redirect=new URL(q.get('redirect_uri'));if(redirect.protocol!=='https:'||redirect.username||redirect.password||redirect.hash)fail(400);
+ }else{
+  if(url.search||request.headers.get('Origin')!==origin||!/^application\/x-www-form-urlencoded(?:;\s*charset=UTF-8)?$/i.test(request.headers.get('Content-Type')??''))fail(400);
+  let raw;try{raw=new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{fail(400);}
+  if(/%(?![a-f0-9]{2})/i.test(raw))fail(400);
+  form=new URLSearchParams(raw);shape(form,['handle','decision','scope','project'],['scope']);
+  if(form.getAll('handle').length!==1||!/^[-_A-Za-z0-9]{43}$/.test(form.get('handle'))||form.getAll('decision').length!==1||form.get('decision')!=='approve'||!form.getAll('scope').length||form.getAll('scope').length>2||new Set(form.getAll('scope')).size!==form.getAll('scope').length||form.getAll('scope')[0]!=='afw:project:read'||form.getAll('scope').some(s=>!['afw:project:read','afw:evidence:read'].includes(s)))fail(400);
+ }
+ const cookie=request.headers.get('Cookie')??'',assertion=request.headers.get('Cf-Access-Jwt-Assertion')??'';
+ if(cookie.length>8192||assertion.length>8192||/[\r\n]/.test(cookie+assertion))fail(400);
+ const names=new Set();for(const part of cookie.split(';').filter(x=>x.trim())){const match=/^\s*([^=\s]+)=([^;\s]*)\s*$/.exec(part);if(!match||names.has(match[1]))fail(400);names.add(match[1]);}
+ return Object.freeze({method:request.method,url:request.url,form});
+}
+export function readFiniteOwnerOAuthMetadata(headers){
+ const entries=[...headers].filter(([key])=>key.startsWith('x-afw-finite-'));
+ if(entries.length!==finiteNativeHeaders.length||entries.some(([key])=>!finiteNativeHeaders.includes(key))||Buffer.byteLength(JSON.stringify(entries))>max)fail(400);
+ const raw=headers.get('x-afw-finite-boundary');let boundary;try{boundary=JSON.parse(raw);}catch{fail(400);}
+ if(!boundary||!['startedAt','deadline','remainingMs'].every(k=>Number.isSafeInteger(boundary[k]))||JSON.stringify({startedAt:boundary.startedAt,deadline:boundary.deadline,remainingMs:boundary.remainingMs})!==raw)fail(400);
+ const method=headers.get('x-afw-finite-original-method'),url=headers.get('x-afw-finite-original-url'),mVersionId=headers.get('x-afw-finite-version'),requestId=headers.get('x-afw-finite-request-id');
+ if(!['GET','POST'].includes(method)||!finiteNativeUuid(mVersionId)||!finiteNativeUuid(requestId))fail(400);
+ const original=new URL(url);if(original.origin!==origin||original.pathname!=='/authorize'||original.hash||method==='POST'&&original.search)fail(400);
+ return Object.freeze({boundary,method,url,mVersionId,requestId});
+}
```

### lib/mcp-qa-finite-owner-phase-context.mjs

```diff
diff --git a/lib/mcp-qa-finite-owner-phase-context.mjs b/lib/mcp-qa-finite-owner-phase-context.mjs
--- a/lib/mcp-qa-finite-owner-phase-context.mjs
+++ b/lib/mcp-qa-finite-owner-phase-context.mjs
@@ -1,10 +1,24 @@
+import {randomBytes} from 'node:crypto';
+import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
+import {createFinitePreparationIssuerStore} from './mcp-qa-finite-preparation-issuer-store.mjs';
+import {sealFinitePreparationIssuerRecord as issuerSeal,issuerScopes} from './mcp-qa-finite-preparation-issuer-records.mjs';
+import {encodeFiniteOwnerIssuerProvenanceRecord as sdkEncode,FINITE_OWNER_SDK_OPERATIONS as sdkOperations} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
+import {encodeFinitePreparationRecord as prepEncode} from './mcp-qa-finite-preparation-records.mjs';
+import {qualifyFiniteOwnerApprovedTicket,finiteOwnerAuthorizationLink,finiteOwnerGrantLink,finiteOwnerPreconnectionConnection,finiteOwnerConnectionRef,qualifyFiniteOwnerConnectionPair} from './mcp-qa-finite-owner-approved-ticket-facts.mjs';
+import {qualifyFiniteOwnerSdkBindingFacts} from './mcp-qa-finite-owner-sdk-binding-facts.mjs';
+import {createFiniteOwnerIssuerProvenanceJournal as sdkJournal} from './mcp-qa-finite-owner-issuer-provenance-journal.mjs';
+import {sealFiniteOwnerIssuerProvenanceRecord as sdkSeal} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
+import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
+import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
+import {verifyCloudflareAccessJwtWithExpiry} from './cloudflare-access-identity.mjs';
+import {readFiniteOwnerOAuthMetadata,qualifyFiniteOwnerOAuthRequest,finiteNativeOperation,finiteNativeBytes,finiteNativePending as pending} from './mcp-qa-finite-owner-oauth-wire.mjs';
 import {FINITE_PREPARATION_ISSUER_SCHEMA} from './mcp-qa-finite-preparation-issuer-store.mjs';
 import {readPrivateQaFiniteInitialAnchors} from './mcp-qa-finite-initial-anchors.mjs';
 import {decodeFiniteInitialUploadRecord as uploadRecord} from './mcp-qa-finite-initial-upload-records.mjs';
 import {initialOwn as own} from './mcp-qa-finite-initial-material-records.mjs';
 import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
 import {createFinitePolicyEffectJournal} from './mcp-qa-finite-policy-journal.mjs';
 import {createFinitePreparationIssuerJournal} from './mcp-qa-finite-preparation-issuer-journal.mjs';
 import {decodeFinitePreparationCleanupRecord as enrollmentRecord} from './mcp-qa-finite-preparation-cleanup-records.mjs';
 import {hashFinitePreparationRecord as prepHash,hashFinitePolicyEffectIdentity as effectIdentity,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash} from './mcp-qa-finite-preparation-records.mjs';
 import {qualifyFiniteOwnerInstalledStage} from './mcp-qa-finite-owner-stage-facts.mjs';
@@ -32,43 +46,45 @@
 const SLOT='afw-own-successor-closure-v1',QA='agent-friendly-web-independent-closure-qa',CANARY='agent-friendly-web-delegated-canary';
 const iso=x=>typeof x==='string'&&Number.isSafeInteger(Date.parse(x))&&new Date(Date.parse(x)).toISOString()===x;
 const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
 const fail=()=>{throw Error('Finite owner phase context unavailable');};
 const current=l=>{l.assertCurrent();if(l.signal.aborted)fail();};
 
 /** UNMOUNTED factual entry. A genuine original incoming request lease is
  * or internally registered descendant is required, never browser data.
  * Retention confers no owner admission and preserves the original request.
  */
-export async function readPrivateQaFiniteOwnerContext(options){
+async function observeOwnerPhasePair(options){
  let clock,onAbort,parentSignal;
  try{
   if(arguments.length!==1)fail();
   fields(options,['ctx','env','parent',...Object.hasOwn(options,'preconnectionId')?['preconnectionId']:[]]);
   const {ctx,env,parent}=options,requested=options.preconnectionId??null;
   fields(parent,['signal','assertCurrent']);
   const {root,deadline}=readFiniteOwnerRequestContext(parent);
   if(requested!==null&&!hex(requested))fail();
   const signal=parent.signal,assertCurrent=parent.assertCurrent;
   const storage=ctx?.storage,get=storage?.get,list=storage?.list,getAlarm=storage?.getAlarm,transaction=storage?.transaction,sync=storage?.sync;
   const actor=ctx?.id,toString=actor?.toString,self=env?.AFW_INDEPENDENT_CLOSURE,idFromName=self?.idFromName,namespaceGet=self?.get;
   const db=env?.RELEASE_DB,prepare=db?.prepare,withSession=db?.withSession,node=env?.AFW_RELEASE_EVENTS_NODE,nodeName=node?.idFromName,nodeString=node?.idFromString,nodeGet=node?.get;
   const metadata=env?.AFW_QA_VERSION,qaVersionId=metadata?.id,reader=env?.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env?.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
   if(!(signal instanceof AbortSignal)||[assertCurrent,get,list,getAlarm,transaction,sync,toString,idFromName,namespaceGet,prepare,withSession,nodeName,nodeString,nodeGet,fetcher].some(v=>typeof v!=='function')||db===env.DB||[reader,publisher].some(v=>typeof v!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(v)))fail();
+  const alias=env?.AFW_FINITE_OWNER_OAUTH_KV,aliasGet=alias?.get,aliasPut=alias?.put,aliasDelete=alias?.delete,aliasList=alias?.list;
+  if([aliasGet,aliasPut,aliasDelete,aliasList].some(v=>typeof v!=='function'))fail();
   const actorId=Reflect.apply(toString,actor,[]),expected=readFiniteQaBootstrapSourceExpectations(),resident=readPrivateQaFiniteCandidate();
   const qaNamespaceId=finitePublicProfileTemplate('qaLive').bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id;
   if(!hex(actorId)||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId||resident.sourceRevision!==expected.sourceRevision||resident.sourceTree!==expected.sourceTree)fail();
   const holders=()=>{
    current(parent);
    if(options.ctx!==ctx||options.env!==env||options.parent!==parent||(options.preconnectionId??null)!==requested||parent.signal!==signal||parent.assertCurrent!==assertCurrent||readFiniteOwnerRequestDeadline(parent)!==deadline||readFiniteOwnerRequestContext(parent).root!==root||
     ctx.storage!==storage||storage.get!==get||storage.list!==list||storage.getAlarm!==getAlarm||storage.transaction!==transaction||storage.sync!==sync||ctx.id!==actor||actor.toString!==toString||Reflect.apply(toString,actor,[])!==actorId||
-    env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||self.get!==namespaceGet||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId||env.RELEASE_DB!==db||db.prepare!==prepare||db.withSession!==withSession||
+    env.AFW_FINITE_OWNER_OAUTH_KV!==alias||alias.get!==aliasGet||alias.put!==aliasPut||alias.delete!==aliasDelete||alias.list!==aliasList||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||self.get!==namespaceGet||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId||env.RELEASE_DB!==db||db.prepare!==prepare||db.withSession!==withSession||
     env.AFW_RELEASE_EVENTS_NODE!==node||node.idFromName!==nodeName||node.idFromString!==nodeString||node.get!==nodeGet||env.AFW_QA_VERSION!==metadata||metadata.id!==qaVersionId||
     env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();
   };
   // Narrow the original request deadline; do not reuse B1/A's expired technical
   // authority or manufacture a new incoming request window from this call.
   clock=createFiniteInitialLease(deadline,deadline,holders,fail);
   parentSignal=signal;onAbort=()=>clock.close();signal.addEventListener('abort',onAbort,{once:true});current(clock.lease);
   const run=()=>observeFiniteFactualReadWork({ctx,env,originalLease:clock.lease,requestLease:parent},async()=>{
    const child=work=>clock.child(l=>retain(Promise.resolve().then(()=>{current(l);return work(l);})));
    const read=key=>child(()=>Reflect.apply(get,storage,[key]));
@@ -107,21 +123,22 @@
     for(const k of ['entryHash','materialHash','sourceRevision','sourceTree','qaVersionId','initialInstanceId','baselineVersionId','baselineDeploymentId'])if(receipt[k]!==plan[k]||backup[k]!==plan[k])fail();
     if(backup.recordHash!==plan.manifestHash||receipt.manifestHash!==plan.manifestHash||receipt.uploadedVersionId!==capsule.activatedVersionId||receipt.moduleHash!==plan.moduleHash||receipt.configurationHash!==plan.configurationHash||backup.retainedIds.preconnectionId!==capsule.preconnectionId||canonical(backup.retainedIds)!==canonical({preconnectionId:capsule.preconnectionId,trialId:material.originalContext.trialId,activationKey:material.originalContext.publication.activationKey,withdrawalRequestId:material.originalContext.withdrawalRequestId,saveIdempotencyKey:material.originalContext.saveIdempotencyKey})||receipt.recordedAt>capsule.recordedAt)fail();
     const chunks=[];let bytes=0;
     for(const c of backup.chunks){const chunk=await backupRead(up+'chunk:'+String(c.index).padStart(3,'0'),'Chunk');if(chunk.manifestHash!==backup.recordHash||chunk.index!==c.index||chunk.bytes!==c.bytes||chunk.sha256!==c.sha256)fail();const part=Buffer.from(chunk.content,'base64');bytes+=part.length;if(bytes>2097152)fail();chunks.push(part);}
     if(bytes!==backup.moduleBytes||sha(Buffer.concat(chunks,bytes))!==backup.moduleHash)fail();
     const prefix='connection-preparation:'+capsule.preconnectionId+':',inventory=await rows(prefix,17),effects=await rows('afw.finite-policy-effect.v1:',33),enrollment=await rows('afw.finite-preparation-cleanup.v1:',3);
     if(inventory.size>16||effects.size>32||enrollment.size>2)fail();
     for(const k of inventory.keys())if(!['record','source','connection:approval','grant','connection'].some(s=>k===prefix+s))fail();
     for(const k of enrollment.keys())if(!['enrollment','ack'].some(s=>k==='afw.finite-preparation-cleanup.v1:'+s))fail();
     const issuer=await child(l=>createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
-    return {capsule,material,plan,a,inventory,effects,enrollment,issuer,anchor:canonical({anchors:a,backupRaw,inventory:[...inventory],effects:[...effects],enrollment:[...enrollment],issuer})};
+    const sdk=await child(l=>sdkJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
+    return {capsule,material,plan,a,inventory,effects,enrollment,issuer,sdk,anchor:canonical({anchors:a,backupRaw,inventory:[...inventory],effects:[...effects],enrollment:[...enrollment],issuer,sdk:sdk.entries})};
    };
    const first=await facts(),{capsule,material,plan}=first,p=material.ownerSelection;
    if(plan.moduleBytes!==resident.bytes.length||sha(resident.bytes)!==capsule.moduleHash||material.originalContext.original.containerId!==Reflect.apply(nodeName,node,['afw-own-event-one-occurrence-v1']).toString())fail();
    const owned=()=>child(async l=>{
     const session=Reflect.apply(withSession,db,['first-primary']),sessionPrepare=session?.prepare;
     if(typeof sessionPrepare!=='function')fail();
     const value=await retain(createDelegatedProjectRepository({db:session,grantStore:createDelegatedOAuthStore(session)}).getOwnedProject(p.project.projectId,p.subject));current(l);
     if(session.prepare!==sessionPrepare||!value||value.id!==p.project.projectId||value.userId!==p.subject||value.revision!==p.project.revision)fail();
     return {projectId:value.id,revision:value.revision,synthetic:true};
    });
@@ -159,46 +176,49 @@
      fields(raw,[...configKeys,...wrappers.filter(k=>Object.hasOwn(raw,k)),...Object.hasOwn(raw,'cache_options')?['cache_options']:[]]);
      if(raw.id!==pointer.versionId||!Array.isArray(raw.urls)||raw.urls.length||!Array.isArray(raw.modules)||raw.modules.length!==1)fail();
      const cfg=structuredClone(own(Object.fromEntries(configKeys.map(k=>[k,raw[k]]))));
      fields(cfg.exports,['default','AfwNodeControl','AfwOwnEventNode']);
      for(const [name,e]of Object.entries(cfg.exports)){const keys=name==='AfwOwnEventNode'?['type','storage','container']:['type'];fields(e,[...keys,...Object.hasOwn(e,'state')?['state']:[],...Object.hasOwn(e,'cache')?['cache']:[]]);if(Object.hasOwn(e,'state')){if(e.state!=='created')fail();delete e.state;}if(Object.hasOwn(e,'cache')){fields(e.cache,['enabled']);if(name==='AfwOwnEventNode'||e.cache.enabled!==false)fail();delete e.cache;}}
      if(Object.hasOwn(raw,'cache_options')){const keys=['enabled','cross_version_cache'].filter(k=>Object.hasOwn(raw.cache_options??{},k));if(!keys.length)fail();fields(raw.cache_options,keys);if(keys.some(k=>raw.cache_options[k]!==false))fail();}
      const expected=structuredClone(plan.configuration);expected.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
      if(canonical(cfg)!==canonical(expected))fail();qualifyFiniteConnectionProfile({phase:'read_consent',metadata:cfg});
      const currentModule=fields(raw.modules[0],['name','content_type','content_base64']);if(currentModule.name!=='index.mjs'||currentModule.content_type!=='application/javascript+module'||typeof currentModule.content_base64!=='string'||currentModule.content_base64!==Buffer.from(resident.bytes).toString('base64'))fail();currentConfiguration=cfg;
     }
-    return {project,pointer,currentConfiguration,initialBaseline:{versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,moduleHash:sha(resident.bytes),configurationHash:finiteActivationConfigurationHash(plan.configuration),bindingsHash:finiteInitialCapsuleBindingsHash(configuration.bindings)}};
+    const qaMetadata=Object.fromEntries(configKeys.map(k=>[k,q[k]]));
+    const qaSdkBindingFacts=qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata:currentConfiguration});
+    qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata:configuration});
+    return {project,pointer,currentConfiguration,qaSdkBindingFacts,initialBaseline:{versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,moduleHash:sha(resident.bytes),configurationHash:finiteActivationConfigurationHash(plan.configuration),bindingsHash:finiteInitialCapsuleBindingsHash(configuration.bindings)}};
    };
    const observed=await primary();
    const source=validateFiniteOwnerSource({sourceRevision:capsule.sourceRevision,actorId,qaNamespaceId,qaVersionId,origin:'https://delegated-canary.agentfriendlyweb.dev',phase:'closed_ui',access:p.access,clientId:p.clientId,resource:p.resource,project:observed.project,goal:p.goal,
     programContext:{programHash:material.originalContext.original.programHash,sourceRevision:material.originalContext.original.sourceRevision,originalContextHash:digest('afw.finite-original-context.v1',material.originalContext)},
     initialBaseline:observed.initialBaseline,currentPublication:{stage:null,versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,receiptHash:null},window:{startedAt:capsule.I0,expiresAt:capsule.C0}});
    const issuerPrimary=async(f,data,enrollment,ack,receipt,getRecord)=>{
     const id=capsule.preconnectionId,issuer=f.issuer,i=issuer.reservation?.identity;
     const schema=await select('SELECT type,name,sql FROM sqlite_schema WHERE name=?',['finite_preparation_issuer_fences']);
     const grantLink=await getRecord('readLink',{kind:'grant',preconnectionId:id},false),relation=await getRecord('readPreconnectionConnection',{preconnectionId:id},false);
     if(!schema){if(i||grantLink||relation)fail();return {schema:null};}
     fields(schema,['type','name','sql']);const normalized=x=>typeof x==='string'?x.replace(/\s+/g,' ').trim().replace(/;$/,''):null;
     if(schema.type!=='table'||schema.name!=='finite_preparation_issuer_fences'||normalized(schema.sql)!==normalized(FINITE_PREPARATION_ISSUER_SCHEMA[0]))fail();
     const fence=await select('SELECT preconnection_id,authorization_hash,grant_id,enrollment_hash,identity_hash,reserved_at,forward_until,cleanup_until,fence_request_id,fenced_at FROM finite_preparation_issuer_fences WHERE preconnection_id=?',[id]);
     if(!i){if(fence||grantLink||relation)fail();return {schema,fence,grantLink,relation};}
     if(!receipt||!enrollment||!ack||issuer.freeze||i.preconnectionId!==id||i.enrollmentHash!==enrollment.recordHash||i.capsuleHash!==capsule.capsuleHash||i.sourceRevision!==capsule.sourceRevision||i.qaVersionId!==qaVersionId||i.actorId!==actorId||i.subject!==p.subject||i.accessRealmHash!==data.preconnection.owner.accessRealmHash||i.projectId!==p.project.projectId||i.projectRevision!==p.project.revision||i.clientId!==p.clientId||i.resource!==p.resource||i.I0!==capsule.I0||i.C0!==capsule.C0||i.C1!==capsule.C1||i.reservedAt<ack.acknowledgedAt||i.reservedAt>Date.now()||issuer.reservation.issuedAt>Date.now()||Date.parse(i.consentExpiresAt)>data.preconnection.expiresAt)fail();
     clock.narrow(Date.parse(i.consentExpiresAt));
     for(const [op,v]of Object.entries(issuer.operations)){
-     if(v.send&&!v.ack||v.ack&&!v.send||['close_fence','revoke_grant'].includes(op)&&(v.send||v.ack)||v.ack?.observedAt>Date.now())fail();
+     if(v.ack&&!v.send||['close_fence','revoke_grant'].includes(op)&&(v.send||v.ack)||v.ack?.observedAt>Date.now())fail();
     }
     const ops=issuer.operations,expectedFence={preconnection_id:id,authorization_hash:i.authorizationHash,grant_id:i.grantId,enrollment_hash:i.enrollmentHash,identity_hash:i.identityHash,reserved_at:i.reservedAt,forward_until:i.C0,cleanup_until:i.C1,fence_request_id:null,fenced_at:null};
     if(fence&&canonical(fence)!==canonical(expectedFence))fail();
     const consent=await select('SELECT handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at FROM delegated_consent_sessions WHERE handle_hash=?',[i.authorizationHash]);
     const grant=await select('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants WHERE id=?',[i.grantId]);
     const authorization=await getRecord('readAuthorizationLink',{authorizationHash:i.authorizationHash},false);
-    const rowAck=(op,row)=>{const v=ops[op];if(!v.send){if(row)fail();return;}if(v.ack.outcome==='no_mutation'){if(v.ack.rowHash!==null||row)fail();return;}if(!row||v.ack.rowHash!==digest('afw.finite-preparation-issuer-row.v1',row))fail();};
+    const rowAck=(op,row)=>{const v=ops[op];if(!v.send){if(row)fail();return;}if(!v.ack)return;if(v.ack.outcome==='no_mutation'){if(v.ack.rowHash!==null||row)fail();return;}if(!row||v.ack.rowHash!==digest('afw.finite-preparation-issuer-row.v1',row))fail();};
     rowAck('open_fence',fence);
     if(!fence&&(consent||grant||authorization||grantLink||relation||ops.authorization.send||ops.consume.send||ops.grant.send))fail();
     if(consent){
      const expected={handle_hash:i.authorizationHash,user_id:i.subject,kind:'authorize',project_id:i.projectId,client_id:i.clientId,resource:i.resource,scopes_json:JSON.stringify(i.requestedScopes),expires_at:i.consentExpiresAt,consumed_at:consent.consumed_at};
      if(canonical(consent)!==canonical(expected)||consent.consumed_at!==''&&(!iso(consent.consumed_at)||Date.parse(consent.consumed_at)<i.reservedAt||Date.parse(consent.consumed_at)>Date.now()||Date.parse(consent.consumed_at)>=Date.parse(consent.expires_at)))fail();
     }
     rowAck('authorization',consent?{...consent,consumed_at:''}:null);
     rowAck('consume',consent?.consumed_at?consent:null);
     if(authorization){
      if(!consent||authorization.preconnectionId!==id||authorization.authorizationHash!==i.authorizationHash||authorization.subjectHash!==data.ticket.subjectHash||authorization.sourceRevision!==source.sourceRevision||authorization.projectRef!==data.ticket.projectRef||authorization.clientId!==i.clientId||authorization.resource!==i.resource||authorization.issuedAt<i.reservedAt||authorization.issuedAt>Date.now()||authorization.expiresAt>Math.min(data.preconnection.expiresAt,Date.parse(consent.expires_at))||Date.now()>=authorization.expiresAt)fail();
@@ -261,22 +281,253 @@
      const allowed=['writer-head',...['send','ack'].map(s=>up+':'+s),...['send','ack','receipt'].map(s=>activationId+':'+s)].map(s=>'afw.finite-policy-effect.v1:'+s);
      if(f.effects.size!==allowed.length||[...f.effects.keys()].some(k=>!allowed.includes(k)))fail();
      const upload=await child(l=>createFinitePolicyEffectJournal({storage,identity:{...identity,effect:'upload'},now:Date.now}).read(l)),activation=await child(l=>createFinitePolicyEffectJournal({storage,identity:{...identity,effect:'activation'},now:Date.now}).read(l));
      receipt=qualifyFiniteOwnerInstalledStage({source,preconnection:data.preconnection,sourceSnapshot:data.sourceSnapshot,initialTicket:data.ticket,connection:null,stage:'connection',stageApproval:data.stageApproval,approval:data.approval,ticket:data.ticket,ticketUse:data.ticketUse,upload,activation,predecessors:[],grantLink:null,noticeLink:null,observedAt:Date.now()});
      const expected=structuredClone(plan.configuration);expected.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
      if(canonical(actual.currentConfiguration)!==canonical(expected))fail();
      qualifyFiniteConnectionProfile({phase:'read_consent',metadata:actual.currentConfiguration});
      if(f.effects.get('afw.finite-policy-effect.v1:writer-head')!==JSON.stringify({identityHash:activationId,sendHash:prepHash('ConnectionSend',activation.send)})||receipt.moduleHash!==capsule.moduleHash||receipt.configurationHash!==finiteActivationConfigurationHash(actual.currentConfiguration))fail();
     }
     if(receipt?(actual.pointer.versionId!==receipt.versionId||actual.pointer.deploymentId!==receipt.deploymentId):(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId))fail();
+    if(f.sdk.root){const r=f.sdk.root;if(!receipt||!enrollment||!ack||r.preconnectionId!==id||r.capsuleHash!==capsule.capsuleHash||r.enrollmentHash!==enrollment.recordHash||r.originalConnectionReceiptHash!==receipt.receiptHash||r.sourceRevision!==capsule.sourceRevision||r.actorId!==actorId||r.qaVersionId!==qaVersionId||r.mVersionId!==receipt.versionId||r.I0!==capsule.I0||r.C0!==capsule.C0||r.C1!==capsule.C1||r.createdAt>Date.now())fail();for(const v of Object.values(f.sdk.operations))if(v.observed?.observedAt>Date.now())fail();}
     const issuerFacts=await issuerPrimary(f,data,enrollment,ack,receipt,getRecord);
+    if(f.sdk.root){
+     const b=f.sdk.operations.sdk_begin,a=f.sdk.operations.sdk_approve,c=f.sdk.operations.sdk_complete,i=f.issuer.reservation?.identity,g=f.sdk.grant;
+     if(b.send&&b.send.bindingHash!==b.send.originalRequestHash||a.send&&(!i||a.send.bindingHash!==i.authorizationHash)||c.send&&(!issuerFacts.grant||!issuerFacts.grantLink||!issuerFacts.relation))fail();
+     if(i&&(!b.observed||b.observed.resultHash!==digest('afw.finite-owner-sdk-begin-result.v1',{authorizationHash:i.authorizationHash,requestHash:b.send.originalRequestHash})))fail();
+     if(g&&(!i||g.rootHash!==f.sdk.root.recordHash||g.identityHash!==i.identityHash||g.reservationHash!==f.issuer.reservation.recordHash||g.authorizationHash!==i.authorizationHash||g.grantId!==i.grantId||g.approvedRequestHash!==a.observed?.resultHash||Date.parse(g.createdAt)>Date.now()||Date.now()>=Date.parse(g.expiresAt)||Date.parse(g.expiresAt)>Math.min(i.C0,Date.parse(i.consentExpiresAt),data.preconnection.expiresAt)||g.scopes.some(s=>!i.requestedScopes.includes(s))))fail();
+     if(issuerFacts.grant&&g&&(canonical(JSON.parse(issuerFacts.grant.scopes_json))!==canonical(g.scopes)||issuerFacts.grant.created_at!==g.createdAt||issuerFacts.grant.expires_at!==g.expiresAt))fail();
+    }
     return {receipt,data,enrollment,ack,issuerFacts};
    };
-   const qualified=await qualify(first,observed),again=await primary(),second=await facts();
-   if(canonical(again)!==canonical(observed)||second.anchor!==first.anchor||canonical(await qualify(second,again))!==canonical(qualified))fail();
-   const receipt=qualified.receipt,result=receipt?validateFiniteOwnerSource({...source,phase:'read_consent',currentPublication:{stage:'connection',versionId:receipt.versionId,deploymentId:receipt.deploymentId,receiptHash:receipt.receiptHash}}):source;
-   current(clock.lease);
-   return Object.freeze({source:result,preconnectionId:capsule.preconnectionId,capsuleHash:capsule.capsuleHash});
+   const qualified=await qualify(first,observed),again=await primary(),second=await facts(),secondQualified=await qualify(second,again);
+   const snapshot=(f,physical,q)=>({
+    sourceBase:source,preconnectionId:capsule.preconnectionId,capsuleHash:capsule.capsuleHash,
+    anchor:JSON.parse(f.anchor),physical,
+    preparation:Object.fromEntries(['sourceSnapshot','ticket','ticketUse','projectRef','preconnection','stageApproval','approval'].map(k=>[k,q.data[k]??null])),
+    records:{inventory:[...f.inventory],effects:[...f.effects],enrollment:[...f.enrollment],issuer:f.issuer,sdk:f.sdk.entries},
+    installed:{receipt:q.receipt,enrollment:q.enrollment,ack:q.ack},
+    issuerRows:{schema:null,fence:null,consent:null,grant:null,authorization:null,grantLink:null,relation:null,connection:null,...q.issuerFacts}
+   });
+   const pair={first:snapshot(first,observed,qualified),second:snapshot(second,again,secondQualified)};
+   if(canonical(pair.first)!==canonical(pair.second))fail();
+   current(clock.lease);return freezeOwnerPhaseData(pair);
   });
   return await run();
  }finally{if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}
 }
+
+
+function freezeOwnerPhaseData(value){
+ if(value&&typeof value==='object'){for(const v of Object.values(value))freezeOwnerPhaseData(v);Object.freeze(value);}return value;
+}
+function qualifySettledOwnerPair(pair){
+ for(const s of [pair.first,pair.second]){
+  for(const v of Object.values(s.records.issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
+  const names=new Set(s.records.sdk.map(([key])=>key));
+  for(const [key]of s.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
+ }
+ const {sourceBase,installed,preconnectionId,capsuleHash}=pair.second,r=installed.receipt;
+ const source=r?validateFiniteOwnerSource({...sourceBase,phase:'read_consent',currentPublication:{stage:'connection',versionId:r.versionId,deploymentId:r.deploymentId,receiptHash:r.receiptHash}}):sourceBase;
+ return Object.freeze({source,preconnectionId,capsuleHash});
+}
+export async function readPrivateQaFiniteOwnerContext(options){
+ if(arguments.length!==1)fail();
+ return qualifySettledOwnerPair(await observeOwnerPhasePair(options));
+}
+
+/** Fixed unmounted QA implementation. All continuations and witnesses live only
+ * in this invocation's stack; persisted DATA never recreates them. */
+export async function handlePrivateQaFiniteOwnerOAuth({request,env,ctx},originalLease){
+ let clock,onAbort;
+ try{
+  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
+  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async firstFailure=>{
+   const received=readFiniteOwnerOAuthMetadata(request.headers);
+   const issuerCapture=captureFinitePreparationIssuerContext({ctx,env});
+   const alias=env.AFW_FINITE_OWNER_OAUTH_KV,methods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
+   const db=env.RELEASE_DB,dbPrepare=db?.prepare,node=env.AFW_RELEASE_EVENTS_NODE,nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get};
+   const self=env.AFW_INDEPENDENT_CLOSURE,selfGet=self?.get,metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
+   const headers=request.headers,signal=request.signal,url=request.url,method=request.method,headerBytes=canonical([...headers]);
+   if([...Object.values(methods),...Object.values(nodeMethods),dbPrepare,selfGet].some(v=>typeof v!=='function'))fail();
+   let identity=null,activeChild=null;
+   const holders=()=>{
+    current(originalLease);issuerCapture.holders();
+    if(env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.RELEASE_DB!==db||db.prepare!==dbPrepare||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(k=>node[k]!==nodeMethods[k])||env.AFW_INDEPENDENT_CLOSURE!==self||self.get!==selfGet||env.AFW_QA_VERSION!==metadata||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher||request.headers!==headers||request.signal!==signal||request.url!==url||request.method!==method||canonical([...headers])!==headerBytes)fail();
+    if(identity&&Date.now()>=identity.expiresAt)fail();
+   };
+   clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);
+   onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});
+   const check=()=>{current(clock.lease);if(activeChild)current(activeChild);};
+   const wait=async promise=>{check();const result=await clock.wait(retain(promise),activeChild??clock.lease);check();return result;};
+   const bytes=await wait(finiteNativeBytes(request,check,firstFailure));check();
+   const original=new Request(received.url,{method:received.method,headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});
+   const grammar=qualifyFiniteOwnerOAuthRequest(original,bytes);
+   const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);
+   if(context.source.phase!=='read_consent'||received.mVersionId!==context.source.currentPublication.versionId||!baseline.second.issuerRows.schema)fail();
+   const expected=structuredClone(baseline.second),source=context.source,id=context.preconnectionId;
+   const capsule=expected.anchor.anchors.capsule,prep=expected.preparation;
+   clock.narrow(Math.min(capsule.C0,prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,prep.approval.expiresAt));
+   const verified=await wait(verifyCloudflareAccessJwtWithExpiry({token:original.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
+   if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);
+   const rawCookies=(original.headers.get('Cookie')??'').split(';').map(s=>s.trim()),cookie=rawCookies.filter(s=>s.startsWith('__Host-afw-finite-prepare='));
+   if(cookie.length!==1||!/^__Host-afw-finite-prepare=[a-f0-9]{64}$/.test(cookie[0])||sha(cookie[0].slice('__Host-afw-finite-prepare='.length))!==prep.ticket.ticketHash)fail();
+   const realm=evidence('realm',{...source.access,origin:source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:identity.subject});
+   qualifyFiniteOwnerApprovedTicket({source,identity,currentTicket:prep.ticket,ticket:prep.ticket,use:prep.ticketUse,pre:prep.preconnection,approval:prep.approval,snapshot:prep.sourceSnapshot,realm,subjectHash,observedAt:Date.now()});
+   if(identity.subject!==expected.anchor.anchors.material.ownerSelection.subject)fail();
+   const sdk=sdkJournal({ctx,env}),issuer=createFinitePreparationIssuerJournal({ctx,env}),store=createFinitePreparationIssuerStore({ctx,env}),preparation=createFiniteOwnerPreparationStore({storage:ctx.storage,now:Date.now});
+   const sdkPrefix='afw.finite-owner-issuer-provenance.v1:'+id+':',inventoryPrefix='connection-preparation:'+id+':';
+   let position='baseline',operation=null,actualPromise=null,actualResult=null,settled=false;
+   // These are lexical objects, never fields in a frame/journal/response.
+   let consumption=null,consumptionChild=null,consumptionStore=null;
+   const readSdk=(suffix)=>{const row=expected.records.sdk.find(([key])=>key===sdkPrefix+suffix);return row?JSON.parse(row[1]):null;};
+   function updateAnchor(){
+    expected.anchor.inventory=structuredClone(expected.records.inventory);
+    expected.anchor.issuer=structuredClone(expected.records.issuer);
+    expected.anchor.sdk=structuredClone(expected.records.sdk);
+   }
+   async function recheckOwned(){
+    check();
+    if(actualPromise&&!settled)fail();
+    const pendingIssuer=Object.entries(expected.records.issuer.operations).filter(([,v])=>v.send&&!v.ack).map(([k])=>k);
+    const pendingSdk=sdkOperations.filter(op=>readSdk(op+':send')&&!readSdk(op+':observed'));
+    if(pendingIssuer.length+pendingSdk.length>1)fail();
+    if(pendingIssuer.length&&(pendingIssuer[0]!==operation||!['issuer-send','issuer-resolved'].includes(position)))fail();
+    if(pendingSdk.length&&(pendingSdk[0]!==operation||!['sdk-send','sdk-resolved'].includes(position)))fail();
+    if(position.endsWith('-resolved')&&(!actualPromise||!settled||!actualResult))fail();
+    const pair=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
+    if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();
+    check();
+   }
+   const fresh=async(promise,record)=>{const result=await wait(promise);if(result?.status!=='recorded'||result.recordHash!==record.recordHash)fail();return result;};
+   const sdkAppend=async(kind,record,op=null)=>{
+    check();
+    const suffix=kind==='Root'?'root':kind==='ExpectedGrant'?'grant':op+(kind==='SdkSend'?':send':':observed');
+    if(readSdk(suffix))fail();
+    const call=kind==='Root'?sdk.appendRoot(record,clock.lease):kind==='ExpectedGrant'?sdk.appendExpectedGrant({preconnectionId:id,record},clock.lease):kind==='SdkSend'?sdk.appendSend({preconnectionId:id,record},clock.lease):sdk.appendObserved({preconnectionId:id,operation:op,record},clock.lease);
+    await fresh(call,record);expected.records.sdk.push([sdkPrefix+suffix,sdkEncode(kind,record)]);expected.records.sdk.sort(([a],[b])=>a.localeCompare(b));updateAnchor();
+   };
+   const api=new OAuthAuthorizationServer({issuer:source.origin,resources:[source.resource],scopesSupported:['afw:project:read','afw:evidence:read'],accessTokenTTL:300,clientIdMetadataDocumentEnabled:false}).getOAuthApi(Object.freeze({OAUTH_KV:alias}));
+   const authData=value=>{
+    const v=own(value);fields(v,['responseType','clientId','redirectUri','scope','state','codeChallenge','codeChallengeMethod','resource','issuer']);
+    if(v.responseType!=='code'||v.clientId!==source.clientId||v.resource!==source.resource||v.issuer!==source.origin||v.codeChallengeMethod!=='S256'||!/^[-_A-Za-z0-9]{43}$/.test(v.codeChallenge)||!issuerScopes(v.scope)||typeof v.state!=='string'||!v.state||v.state.length>4096||typeof v.redirectUri!=='string'||v.redirectUri.length>4096)fail();
+    const redirect=new URL(v.redirectUri);if(redirect.protocol!=='https:'||redirect.username||redirect.password||redirect.hash)fail();return v;
+   };
+   const authHash=v=>digest('afw.finite-owner-sdk-request.v1',authData(v));
+   async function sdkCall(op,bindingHash,requestHash,call,resultHash){
+    await recheckOwned();if(readSdk(op+':send'))fail();
+    operation=op;actualPromise=null;actualResult=null;settled=false;position='sdk-send';
+    const send=sdkSeal('SdkSend',{purpose:'afw.finite-owner-sdk-send.v1',rootHash:readSdk('root').recordHash,operation:op,originalRequestId:crypto.randomUUID(),originalRequestHash:requestHash,issuedAt:Date.now(),deadline:clock.end(),bindingHash});
+    await sdkAppend('SdkSend',send,op);await recheckOwned();check();
+    actualPromise=retain(Promise.resolve().then(()=>{check();return call();}));position='sdk-pending';
+    actualResult=await wait(actualPromise);settled=true;position='sdk-resolved';await recheckOwned();
+    const observed=sdkSeal('SdkObserved',{purpose:'afw.finite-owner-sdk-observed.v1',sendHash:send.recordHash,resultHash:resultHash(actualResult),observedAt:Date.now(),outcome:'resolved'});
+    await sdkAppend('SdkObserved',observed,op);position='sdk-observed';await recheckOwned();
+    const result=actualResult;actualPromise=null;actualResult=null;settled=false;operation=null;position='settled';return result;
+   }
+   const issuerAppend=async(kind,record,op=null)=>{
+    check();const call=kind==='Reservation'?issuer.appendReservation(record,activeChild):kind==='Send'?issuer.appendSend({preconnectionId:id,record},activeChild):issuer.appendAck({preconnectionId:id,operation:op,record},activeChild);
+    await fresh(call,record);
+    if(kind==='Reservation')expected.records.issuer.reservation=record;
+    else expected.records.issuer.operations[op][kind==='Send'?'send':'ack']=record;
+    updateAnchor();
+   };
+   async function issuerCall(op,window,call){
+    await recheckOwned();operation=op;position='issuer-send';actualPromise=null;actualResult=null;settled=false;
+    const reservation=expected.records.issuer.reservation,i=reservation.identity;
+    if(expected.records.issuer.operations[op].send)fail();
+    const send=issuerSeal('Send',{purpose:'afw.finite-preparation-issuer-send.v1',identityHash:i.identityHash,reservationHash:reservation.recordHash,operation:op,requestId:null,requestHash:digest('afw.finite-owner-issuer-request.v1',{identityHash:i.identityHash,operation:op}),issuedAt:Date.now(),deadline:window.deadline});
+    await issuerAppend('Send',send,op);await recheckOwned();check();
+    actualPromise=retain(Promise.resolve().then(()=>{check();return call();}));position='issuer-pending';
+    actualResult=await wait(actualPromise);settled=true;
+    const row=op==='consume'?actualResult:actualResult?.status==='applied'?actualResult.row:null;
+    if(!row)fail();
+    const rowName=({open_fence:'fence',authorization:'consent',consume:'consent',grant:'grant'})[op];if(!rowName)fail();
+    expected.issuerRows[rowName]=structuredClone(row);position='issuer-resolved';await recheckOwned();
+    const ack=issuerSeal('Ack',{purpose:'afw.finite-preparation-issuer-ack.v1',sendHash:send.recordHash,rowHash:digest('afw.finite-preparation-issuer-row.v1',row),outcome:'applied',observedAt:Date.now()});
+    await issuerAppend('Ack',ack,op);position='issuer-ack';await recheckOwned();
+    const result=op==='consume'?actualResult:row;actualPromise=null;actualResult=null;settled=false;operation=null;position='settled';return result;
+   }
+   async function localPreparation(kind,record,call,readBack,rowName,inventorySuffix=null){
+    await recheckOwned();const result=await wait(call());
+    if(result?.status!=='recorded'||result.recordHash!==prepHash(kind,record))fail();
+    const read=await wait(readBack());if(read?.status!=='observed'||prepEncode(kind,read.record)!==prepEncode(kind,record))fail();
+    expected.issuerRows[rowName]=structuredClone(record);
+    if(inventorySuffix){expected.records.inventory.push([inventoryPrefix+inventorySuffix,prepEncode(kind,record)]);expected.records.inventory.sort(([a],[b])=>a.localeCompare(b));}
+    updateAnchor();await recheckOwned();return result;
+   }
+   const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{activeChild=null;}});
+   await recheckOwned();
+   if(grammar.method==='GET'){
+    if(readSdk('root')||expected.records.issuer.reservation)fail();
+    const parsed=authData(await wait(api.parseAuthRequest(original))),description=await wait(api.describeConsent(parsed));
+    await recheckOwned();
+    const root=sdkSeal('Root',{purpose:'afw.finite-owner-issuer-root.v1',preconnectionId:id,capsuleHash:capsule.capsuleHash,enrollmentHash:expected.installed.enrollment.recordHash,sourceRevision:source.sourceRevision,actorId:source.actorId,qaVersionId:source.qaVersionId,mVersionId:received.mVersionId,originalConnectionReceiptHash:expected.installed.receipt.receiptHash,I0:capsule.I0,C0:capsule.C0,C1:capsule.C1,createdAt:Date.now()});
+    await sdkAppend('Root',root);await recheckOwned();
+    const requestHash=authHash(parsed),transaction=await sdkCall('sdk_begin',requestHash,requestHash,()=>api.beginConsent(parsed),result=>{
+     if(typeof result?.handle!=='string'||!/^[-_A-Za-z0-9]{43}$/.test(result.handle)||!(result.headers instanceof Headers))fail();
+     return digest('afw.finite-owner-sdk-begin-result.v1',{authorizationHash:sha(result.handle),requestHash});
+    });
+    const authorizationHash=sha(transaction.handle),at=Date.now();
+    // Consent remains original C0/owner expiry; request lifetime controls mutations,
+    // not a new duration for the user's independently submitted POST.
+    const consentExpiry=new Date(Math.min(capsule.C0,prep.preconnection.expiresAt,identity.expiresAt,prep.preconnection.owner.accessExpiresAt)).toISOString();
+    const i=issuerSeal('Identity',{preconnectionId:id,enrollmentHash:expected.installed.enrollment.recordHash,capsuleHash:capsule.capsuleHash,sourceRevision:source.sourceRevision,qaVersionId:source.qaVersionId,actorId:source.actorId,subject:identity.subject,accessRealmHash:realm,projectId:source.project.projectId,projectRevision:source.project.revision,clientId:source.clientId,resource:source.resource,authorizationHash,grantId:crypto.randomUUID(),requestedScopes:parsed.scope,consentExpiresAt:consentExpiry,I0:capsule.I0,C0:capsule.C0,C1:capsule.C1,reservedAt:at});
+    await withChild(async(_l,w)=>{const r=issuerSeal('Reservation',{purpose:'afw.finite-preparation-issuer-reservation.v1',identity:i,requestHash,issuedAt:Date.now(),deadline:w.deadline});await issuerAppend('Reservation',r);await recheckOwned();});
+    await withChild((l,w)=>issuerCall('open_fence',w,()=>store.openFence({identity:i,window:w},l)));
+    await withChild((l,w)=>issuerCall('authorization',w,()=>store.insertAuthorization({identity:i,window:w},l)));
+    const link=finiteOwnerAuthorizationLink({preconnectionId:id,authorizationHash,subjectHash,sourceRevision:source.sourceRevision,projectRef:prep.ticket.projectRef,clientId:source.clientId,resource:source.resource,issuedAt:Date.now(),expiresAt:Math.min(prep.preconnection.expiresAt,Date.parse(consentExpiry))});
+    await withChild(l=>localPreparation('AuthorizationLink',link,()=>preparation.putAuthorizationLink(link,l),()=>preparation.readAuthorizationLink({authorizationHash},l),'authorization'));
+    await recheckOwned();
+    const escape=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
+    if(typeof description.clientName!=='string'||description.clientName.length>1024)fail();
+    const html='<h1>Permitir lectura</h1><p>'+escape(description.clientName)+'</p><form method="post" action="/authorize"><input type="hidden" name="handle" value="'+escape(transaction.handle)+'"><input type="hidden" name="project" value="'+escape(source.project.projectId)+'"><input type="hidden" name="scope" value="afw:project:read">'+(parsed.scope.includes('afw:evidence:read')?'<label><input type="checkbox" name="scope" value="afw:evidence:read"> Compartir observaciones</label>':'')+'<button name="decision" value="approve">Permitir lectura</button></form>';
+    const out=new Headers(transaction.headers);out.set('Content-Type','text/html; charset=utf-8');out.set('Cache-Control','no-store');
+    if(Buffer.byteLength(html)>16384||[...out].some(([,v])=>v.length>8192))fail();check();return new Response(html,{headers:out});
+   }
+   const form=grammar.form,i=expected.records.issuer.reservation?.identity,root=readSdk('root');
+   if(!i||!root||!readSdk('sdk_begin:observed')||readSdk('sdk_approve:send')||!expected.issuerRows.authorization||!expected.issuerRows.consent||expected.issuerRows.consent.consumed_at!==''||expected.issuerRows.grant||sha(form.get('handle'))!==i.authorizationHash||form.has('project')&&form.get('project')!==i.projectId||form.getAll('scope').some(s=>!i.requestedScopes.includes(s)))fail();
+   clock.narrow(Date.parse(i.consentExpiresAt));
+   const scopes=form.getAll('scope');
+   const approved=await sdkCall('sdk_approve',i.authorizationHash,digest('afw.finite-owner-approved-form.v1',{authorizationHash:i.authorizationHash,scopes}),()=>api.approveConsent(original,form.get('handle'),{scope:scopes}),result=>{
+    const actual=authData(result.request);
+    if(canonical(actual.scope)!==canonical(scopes)||authHash({...actual,scope:i.requestedScopes})!==readSdk('sdk_begin:send').originalRequestHash||!(result.headers instanceof Headers))fail();
+    return authHash(actual);
+   });
+   const createdAt=new Date().toISOString(),expiresAt=new Date(Math.min(i.C0,Date.parse(i.consentExpiresAt),prep.preconnection.expiresAt,identity.expiresAt)).toISOString();
+   const grant=sdkSeal('ExpectedGrant',{purpose:'afw.finite-owner-expected-grant.v1',rootHash:root.recordHash,identityHash:i.identityHash,reservationHash:expected.records.issuer.reservation.recordHash,authorizationHash:i.authorizationHash,grantId:i.grantId,approvedRequestHash:authHash(approved.request),scopes,createdAt,expiresAt});
+   await sdkAppend('ExpectedGrant',grant);await recheckOwned();
+   await withChild(async(l,w)=>{
+    consumptionChild=l;consumptionStore=store;
+    consumption=await issuerCall('consume',w,()=>store.consumeAuthorization({identity:i,window:w,consumedAt:createdAt},l));
+    if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();
+    await issuerCall('grant',w,()=>store.insertReadGrant({identity:i,window:w,consumption,grant:{scopes,createdAt,expiresAt}},l));
+    consumption=null;consumptionChild=null;consumptionStore=null;
+   });
+   const grantLink=finiteOwnerGrantLink({preconnectionId:id,authorizationHash:i.authorizationHash,grantId:i.grantId,grantHash:sha(i.grantId),acceptedAt:Date.now()});
+   await withChild(async l=>{
+    const linked=await localPreparation('GrantLink',grantLink,()=>preparation.putLink({kind:'grant',record:grantLink},l),()=>preparation.readLink({kind:'grant',preconnectionId:id},l),'grantLink','grant');
+    // Only this stack's genuinely new link ACK permits pair allocation.
+    if(linked.status!=='recorded'||expected.issuerRows.relation)fail();
+    const connectionRef=randomBytes(32).toString('hex'),linkedAt=Date.now();
+    const relation=finiteOwnerPreconnectionConnection({preconnectionId:id,connectionRef,grantHash:grantLink.grantHash,linkedAt});
+    const connection=finiteOwnerConnectionRef({connectionRef,subject:identity.subject,grantId:i.grantId,clientId:source.clientId,projectId:source.project.projectId,resource:source.resource,issuedAt:linkedAt,expiresAt:Math.min(prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,identity.expiresAt,Date.parse(expiresAt))});
+    await recheckOwned();
+    const paired=await wait(preparation.putPreconnectionConnection({relation,connection},l));
+    if(paired?.status!=='recorded'||paired.recordHash!==prepHash('PreconnectionConnection',relation))fail();
+    const rr=await wait(preparation.readPreconnectionConnection({preconnectionId:id},l)),cr=await wait(preparation.readConnectionRef({connectionRef},l));
+    if(rr.status!=='observed'||cr.status!=='observed'||prepEncode('PreconnectionConnection',rr.record)!==prepEncode('PreconnectionConnection',relation)||prepEncode('ConnectionRef',cr.record)!==prepEncode('ConnectionRef',connection))fail();
+    qualifyFiniteOwnerConnectionPair({source,identity,pre:prep.preconnection,link:grantLink,grant:{grantId:i.grantId,expiresAt},relation:rr.record,connection:cr.record,observedAt:Date.now()});
+    expected.issuerRows.relation=structuredClone(relation);expected.issuerRows.connection=structuredClone(connection);
+    expected.records.inventory.push([inventoryPrefix+'connection',prepEncode('PreconnectionConnection',relation)]);expected.records.inventory.sort(([a],[b])=>a.localeCompare(b));updateAnchor();await recheckOwned();
+   });
+   const completed=await sdkCall('sdk_complete',grant.recordHash,grant.approvedRequestHash,()=>api.completeAuthorization({request:approved.request,userId:i.subject,scope:scopes,metadata:{},props:{applicationGrantId:i.grantId,userId:i.subject,projectId:i.projectId},revokeExistingGrants:false}),result=>{
+    if(typeof result?.redirectTo!=='string'||result.redirectTo.length>8192)fail();
+    const target=new URL(result.redirectTo),registered=new URL(approved.request.redirectUri);
+    if(target.origin!==registered.origin||target.pathname!==registered.pathname||!target.searchParams.get('code'))fail();
+    return digest('afw.finite-owner-sdk-complete-result.v1',{redirectHash:sha(result.redirectTo)});
+   });
+   await recheckOwned();const out=new Headers(approved.headers);out.set('Location',completed.redirectTo);out.set('Cache-Control','no-store');
+   if([...out].some(([,v])=>v.length>8192))fail();check();return new Response(null,{status:302,headers:out});
+  }));
+ }catch{return pending();}finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
+}
```

### lib/mcp-qa-finite-owner-preparation.mjs

```diff
diff --git a/lib/mcp-qa-finite-owner-preparation.mjs b/lib/mcp-qa-finite-owner-preparation.mjs
--- a/lib/mcp-qa-finite-owner-preparation.mjs
+++ b/lib/mcp-qa-finite-owner-preparation.mjs
@@ -1,10 +1,11 @@
+import {qualifyFiniteOwnerApprovedTicket,finiteOwnerAuthorizationLink,finiteOwnerGrantLink,finiteOwnerPreconnectionConnection,finiteOwnerConnectionRef,qualifyFiniteOwnerConnectionPair} from './mcp-qa-finite-owner-approved-ticket-facts.mjs';
 import {qualifyFiniteOwnerInstalledStage} from './mcp-qa-finite-owner-stage-facts.mjs';
 import {readPrivateQaFinitePolicySource} from './mcp-qa-finite-policy-setup-source.mjs';
 import {readFiniteMaterialSeed} from './mcp-qa-finite-seed-http.mjs';
 import {narrowFinitePolicySetupClock} from './mcp-qa-finite-policy-setup.mjs';
 import {finiteFields as setupFields} from './mcp-finite-evidence.mjs';
 import {retainFiniteOwnerStagePromise} from './mcp-qa-finite-stage-work.mjs';
 import {createHash,randomBytes} from 'node:crypto';
 import {verifyCloudflareAccessJwtWithExpiry} from './cloudflare-access-identity.mjs';
 import {createDelegatedOAuthStore} from './delegated-oauth-store.mjs';
 import {createDelegatedProjectRepository} from './delegated-project-repository.mjs';
@@ -260,22 +261,21 @@
  return {status:202,preconnectionId:pre.preconnectionId,stage};
 }
 
 async function approved(options,lease,phase,ownedContext=null){
  const c=await ticketContext(options,lease,ownedContext);if(c.source.phase!==phase)fail();
  const id=c.ticket.preconnectionId;
  const pre=observed(await c.step(childLease=>c.store.readPreconnection({preconnectionId:id},childLease)));
  const approval=observed(await c.step(childLease=>c.store.readConfigurationApproval({approvalHash:pre.approvalHash},childLease)));
  const ticket=observed(await c.step(childLease=>c.store.readTicket({ticketHash:c.snapshot.initialTicketHash},childLease)));
  const use=observed(await c.step(childLease=>c.store.readTicketUse({ticketHash:c.snapshot.initialTicketHash},childLease)));
- const decision=evidence('decision',{ticket,decision:'approve',projectHash:projectHash(c.source.project),goal:c.source.goal,clientId:c.source.clientId,approvedAt:approval.approvedAt,expiresAt:approval.expiresAt});
- if(ticket.preconnectionId!==id||ticket.projectRef!==c.ticket.projectRef||ticket.subjectHash!==c.subjectHash||use.recordHash!==decision||approval.csrfReceiptHash!==decision||hash('ConfigurationApproval',approval)!==pre.approvalHash||approval.subjectHash!==c.subjectHash||approval.sourceRevision!==c.source.sourceRevision||approval.projectHash!==projectHash(c.source.project)||approval.clientId!==c.source.clientId||pre.owner.subject!==c.identity.subject||pre.owner.accessRealmHash!==c.realm||pre.sourceRevision!==c.source.sourceRevision||pre.actorId!==c.source.actorId||pre.clientId!==c.source.clientId||pre.resource!==c.source.resource||projectHash(pre.project)!==projectHash(c.source.project)||pre.baselineHash!==evidence('baseline',c.snapshot.source.initialBaseline)||Date.now()>=Math.min(pre.expiresAt,pre.owner.accessExpiresAt,approval.expiresAt))fail(403);
+ qualifyFiniteOwnerApprovedTicket({source:c.source,identity:c.identity,currentTicket:c.ticket,ticket,use,pre,approval,snapshot:c.snapshot,realm:c.realm,subjectHash:c.subjectHash,observedAt:Date.now()});
  return {...c,pre,approval};
 }
 function scopes(value){
  let result;try{result=JSON.parse(value);}catch{fail();}
  if(!Array.isArray(result)||result.length<1||result.length>2||new Set(result).size!==result.length||!result.includes('afw:project:read')||result.some(x=>!['afw:project:read','afw:evidence:read'].includes(x)))fail();
  return result;
 }
 const iso=x=>typeof x==='string'&&Number.isSafeInteger(Date.parse(x))&&new Date(Date.parse(x)).toISOString()===x;
 async function consent(c,authorizationHash,consumed){
  if(!hex(authorizationHash))fail();
@@ -301,53 +301,53 @@
 export async function recordFinitePreparationAuthorization({ctx,env,request,authorizationHash},lease){
  current(lease);const c=await approved({ctx,env,request},lease,'read_consent');
  const url=new URL(request.url);if(url.pathname!=='/authorize')fail();
  if(request.method==='GET'){
   if(url.searchParams.getAll('client_id').length!==1||url.searchParams.get('client_id')!==c.source.clientId||url.searchParams.getAll('resource').length!==1||url.searchParams.get('resource')!==c.source.resource)fail();
  }else if(request.method==='POST'){
   if(url.search||!request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded'))fail();
   const form=await body(request,lease);if(form.getAll('handle').length!==1||form.getAll('decision').length!==1||form.get('decision')!=='approve'||sha(form.get('handle')??'')!==authorizationHash)fail();
  }else fail();
  const row=await consent(c,authorizationHash,false),old=await c.step(childLease=>c.store.readAuthorizationLink({authorizationHash},childLease));
- const record={preconnectionId:c.pre.preconnectionId,authorizationHash,subjectHash:c.subjectHash,sourceRevision:c.source.sourceRevision,projectRef:c.ticket.projectRef,clientId:c.source.clientId,resource:c.source.resource,issuedAt:old.record?.issuedAt??Date.now(),expiresAt:Math.min(c.pre.expiresAt,Date.parse(row.expires_at))};
+ const record=finiteOwnerAuthorizationLink({preconnectionId:c.pre.preconnectionId,authorizationHash,subjectHash:c.subjectHash,sourceRevision:c.source.sourceRevision,projectRef:c.ticket.projectRef,clientId:c.source.clientId,resource:c.source.resource,issuedAt:old.record?.issuedAt??Date.now(),expiresAt:Math.min(c.pre.expiresAt,Date.parse(row.expires_at))});
  await durable(c,childLease=>c.store.putAuthorizationLink(record,childLease),childLease=>c.store.readAuthorizationLink({authorizationHash},childLease),'AuthorizationLink',record);
  return Object.freeze({status:old.status==='observed'?'existing':'recorded',recordHash:hash('AuthorizationLink',record)});
 }
 export async function recordFinitePreparationGrant({ctx,env,request,grantId},lease){
  current(lease);const c=await approved({ctx,env,request},lease,'read_consent');
  if(request.method!=='POST'||new URL(request.url).pathname!=='/authorize'||!request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded'))fail();
  const form=await body(request,lease);
  if(form.getAll('handle').length!==1||form.getAll('decision').length!==1||form.get('decision')!=='approve'||!form.get('handle'))fail();
  const authorizationHash=sha(form.get('handle'));await authorization(c,authorizationHash);
  const row=await consent(c,authorizationHash,true),grant=await exactGrant(c,grantId,row.scopes),approvedScopes=form.getAll('scope');
  if(canonical(approvedScopes)!==canonical(grant.scopes)||Date.parse(grant.createdAt)<Date.parse(row.consumed_at)||form.has('project')&&(form.getAll('project').length!==1||form.get('project')!==c.source.project.projectId))fail();
  const preconnectionId=c.pre.preconnectionId,old=await c.step(childLease=>c.store.readLink({kind:'grant',preconnectionId},childLease));
- const record={preconnectionId,authorizationHash,grantId,grantHash:sha(grantId),acceptedAt:old.record?.acceptedAt??Date.now()};
+ const record=finiteOwnerGrantLink({preconnectionId,authorizationHash,grantId,grantHash:sha(grantId),acceptedAt:old.record?.acceptedAt??Date.now()});
  const linked=await durable(c,childLease=>c.store.putLink({kind:'grant',record},childLease),childLease=>c.store.readLink({kind:'grant',preconnectionId},childLease),'GrantLink',record);
  const existing=await c.step(childLease=>c.store.readPreconnectionConnection({preconnectionId},childLease));
  if(existing.status==='absent'){
   // An existing link without the pair may represent a lost earlier outcome.
   // Only this invocation's genuinely new link ACK permits the first allocation.
   if(linked.mutation.status!=='recorded')return Object.freeze({status:'uncertain',recordHash:hash('GrantLink',record)});
-  const connectionRef=opaque(),linkedAt=Date.now(),relation={preconnectionId,connectionRef,grantHash:record.grantHash,linkedAt};
-  const connection={connectionRef,subject:c.identity.subject,grantId:grant.grantId,clientId:c.source.clientId,projectId:c.source.project.projectId,resource:c.source.resource,issuedAt:linkedAt,expiresAt:Math.min(c.pre.expiresAt,c.pre.owner.accessExpiresAt,c.identity.expiresAt,Date.parse(grant.expiresAt))};
+  const connectionRef=opaque(),linkedAt=Date.now(),relation=finiteOwnerPreconnectionConnection({preconnectionId,connectionRef,grantHash:record.grantHash,linkedAt});
+  const connection=finiteOwnerConnectionRef({connectionRef,subject:c.identity.subject,grantId:grant.grantId,clientId:c.source.clientId,projectId:c.source.project.projectId,resource:c.source.resource,issuedAt:linkedAt,expiresAt:Math.min(c.pre.expiresAt,c.pre.owner.accessExpiresAt,c.identity.expiresAt,Date.parse(grant.expiresAt))});
   const paired=await c.step(childLease=>c.store.putPreconnectionConnection({relation,connection},childLease));
   if(!['recorded','existing'].includes(paired?.status)||paired.recordHash!==hash('PreconnectionConnection',relation))return Object.freeze({status:'uncertain',recordHash:hash('GrantLink',record)});
  }
  await connectionPair(c,record,grant);
  return Object.freeze({status:old.status==='observed'?'existing':'recorded',recordHash:hash('GrantLink',record)});
 }
 
 async function connectionPair(c,link,grant){
  const relation=observed(await c.step(childLease=>c.store.readPreconnectionConnection({preconnectionId:c.pre.preconnectionId},childLease)));
  const connection=observed(await c.step(childLease=>c.store.readConnectionRef({connectionRef:relation.connectionRef},childLease)));
- if(relation.preconnectionId!==c.pre.preconnectionId||relation.grantHash!==sha(grant.grantId)||relation.grantHash!==link.grantHash||relation.linkedAt<link.acceptedAt||relation.linkedAt>Date.now()||connection.connectionRef!==relation.connectionRef||connection.issuedAt!==relation.linkedAt||connection.subject!==c.identity.subject||connection.grantId!==grant.grantId||connection.clientId!==c.source.clientId||connection.projectId!==c.source.project.projectId||connection.resource!==c.source.resource||connection.expiresAt>Math.min(c.pre.expiresAt,c.pre.owner.accessExpiresAt,Date.parse(grant.expiresAt))||Date.now()>=connection.expiresAt)fail();
+ qualifyFiniteOwnerConnectionPair({source:c.source,identity:c.identity,pre:c.pre,link,grant,relation,connection,observedAt:Date.now()});
  return {relation,connection};
 }
 
 async function eventRow(c,{requestId,sequence,grantId}){
  const row=await c.step(()=>c.primary().prepare("SELECT c.* FROM dossier_monitoring_consent_events c WHERE c.request_id=? AND c.sequence=? AND c.grant_id=? AND c.user_id=? AND NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events r WHERE r.grant_id=c.grant_id AND r.action='revoke')").bind(requestId,sequence,grantId,c.identity.subject).first());
  if(!row)fail(403);
  const event={grantId:row.grant_id,projectId:row.project_id,subject:row.user_id,clientId:row.client_id,resource:row.resource,revision:row.revision,action:row.action,purpose:row.purpose,requestId:row.request_id,sequence:row.sequence,issuedAt:row.issued_at,expiresAt:row.expires_at};
  evidence('event',event);
  if(event.projectId!==c.source.project.projectId||event.subject!==c.identity.subject||event.clientId!==c.source.clientId||event.resource!==c.source.resource||event.revision!==c.source.project.revision||event.issuedAt>Date.now()||event.expiresAt<=Date.now()||event.expiresAt>c.pre.expiresAt)fail(403);
  return event;
```

### test/fixtures/finite-initial-entry-world.mjs

```diff
diff --git a/test/fixtures/finite-initial-entry-world.mjs b/test/fixtures/finite-initial-entry-world.mjs
--- a/test/fixtures/finite-initial-entry-world.mjs
+++ b/test/fixtures/finite-initial-entry-world.mjs
@@ -1,88 +1,102 @@
+import {extendFiniteOwnerQaSdk,finiteOwnerSdkWorkers,instrumentFiniteOwnerQaSdk} from './finite-owner-qa-sdk.mjs';
 import {FINITE_PREPARATION_ISSUER_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {extendFiniteOwnerPhaseContext,seedFiniteOwnerPhaseHistory} from './finite-owner-phase-context.mjs';
 import {extendPreparationCleanupFixture} from './finite-preparation-cleanup-entry.mjs';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {gzipSync} from 'node:zlib';
 import {readFile,mkdtemp,rm} from 'node:fs/promises';
 import {tmpdir} from 'node:os';
 import {join,resolve} from 'node:path';
 import {build} from 'esbuild';
 import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
 import {bootstrapWorld,UUID,GH,CF} from './finite-bootstrap-world.mjs';
 import {initialHistoryFixture,seedInitialHistory} from './finite-initial-history-world.mjs';
 import {QA_CLOUD_CLOSED_PINS as realPins} from '../../lib/mcp-qa-cloud-closed-pins.mjs';
 import {initialHash} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
 import {generateKeyPair,exportJWK,SignJWT} from 'jose';
 import {AFW_FIXED_WORKFLOWS} from '../../lib/mcp-fixed-terminal-workflows.mjs';
 import {restorationConfigurationHash} from '../../lib/mcp-restoration-configuration.mjs';
-import {finitePublicProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
+import {finitePublicProfileTemplate,finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
 const sha=x=>createHash('sha256').update(x).digest('hex'),J=JSON.stringify;
 const M='c'.repeat(40),TREE='d'.repeat(40),COMMAND=9001;
 export async function initialEntryHarness(mode='normal'){
- const pair=(mode.startsWith('enrollment')||mode==='private-choice')?await generateKeyPair('RS256'):null,privateKey=pair?.privateKey,jwk=pair?{...await exportJWK(pair.publicKey),kid:'enrollment-SYN',alg:'RS256'}:null;
+ const pair=(mode.startsWith('enrollment')||mode==='private-choice'||mode.startsWith('phase-context-sdk'))?await generateKeyPair('RS256'):null,privateKey=pair?.privateKey,jwk=pair?{...await exportJWK(pair.publicKey),kid:'enrollment-SYN',alg:'RS256'}:null;
  const persist=mode.endsWith('restart')?await mkdtemp(join(tmpdir(),'afw-entry-restart-')):null;
- const base={...(persist?{resourcePersistencePath:persist}:{}),modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],ratelimits:{AFW_QA_OCCURRENCE_RATE_LIMITER:{namespace_id:'99122',simple:{limit:1000,period:60}}},bindings:{AFW_QA_VERSION:{id:UUID},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'synthetic-native-publisher'},d1Databases:{RELEASE_DB:'initial-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Initial',useSQLite:true,uniqueKey:'initial-c2a'},AFW_RELEASE_EVENTS_NODE:{className:'Node',useSQLite:true,uniqueKey:'initial-node'}}};
+ const sdkProfile=mode.startsWith('phase-context-sdk')?finiteWranglerProfileTemplate('qaLive'):null;
+ const base={...(sdkProfile?{name:'qa-sdk'}:{}),...(persist?{resourcePersistencePath:persist}:{}),...(mode.startsWith('phase-context')?{kvNamespaces:{AFW_FINITE_OWNER_OAUTH_KV:'finite-sdk-shared'}}:{}),modules:true,compatibilityDate:sdkProfile?.compatibility_date??'2026-09-07',compatibilityFlags:sdkProfile?.compatibility_flags??['nodejs_compat'],ratelimits:{AFW_QA_OCCURRENCE_RATE_LIMITER:{namespace_id:'99122',simple:{limit:1000,period:60}}},bindings:{AFW_QA_VERSION:{id:UUID},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'synthetic-native-publisher'},d1Databases:{RELEASE_DB:'initial-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Initial',useSQLite:true,uniqueKey:'initial-c2a'},AFW_RELEASE_EVENTS_NODE:{className:'Node',useSQLite:true,uniqueKey:'initial-node'}}};
  const mf=new Miniflare(convertV4MiniflareOptions({...base,script:'import{DurableObject}from"cloudflare:workers";export class Initial extends DurableObject{} export class Node extends DurableObject{} export default{fetch(){return new Response(null,{status:404})}};'}));
+ let failedInitializationDisposal;
+ const disposeFailedInitialization=()=>failedInitializationDisposal??=mf.dispose();
+ try{
  const b=await mf.getBindings(),ns=b.AFW_RELEASE_EVENTS_NODE,x=initialHistoryFixture({original:ns.idFromName('afw-own-event-one-occurrence-v1').toString(),candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()},mode);x.ids={original:x.original.containerId,candidate:ns.idFromName('afw-own-event-first-successor-v1').toString()};
  const program='SYNTHETIC actual resident candidate program',script='// SYNTHETIC B1 candidate bytes\nexport default{};',bytes=Buffer.from(script),compressed=gzipSync(bytes,{level:9,mtime:0}),resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:M,sourceTree:TREE,sourceCheck:'git-inputs-before-after-v1',programHash:sha(program),module:{name:'index.mjs',sha256:sha(bytes),bytes:bytes.length},compressedSha256:sha(compressed),compressedBytes:compressed.length,content:compressed.toString('base64')};
  const w=await bootstrapWorld({sourceRevision:M,sourceTree:TREE,modules:{qaLive:{module:{name:'index.mjs',sha256:sha('export default{};'),bytes:17,exports:[...finitePublicProfileTemplate('qaLive').exports]}}},files:{'qaLive/index.mjs':'export default{};'}});
  const created=new Date(Math.floor((Date.now()-(['partial','upload-partial'].includes(mode)?40000:1000))/1000)*1000).toISOString().replace('.000Z','Z'),command={id:COMMAND,user:{id:290715446,login:'tokenizartinfo-ops',type:'User'},author_association:'OWNER',body:'/afw-qa-finite-prepare v1 '+M+' '+UUID,created_at:created,updated_at:created,issue_url:GH+'/issues/497'};w.map.set('/issues/comments/'+COMMAND,command);
  const approval=Date.now()+86400000;
  const opScript='// SYN operator closed\nexport default{};',opConfig={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],main_module:'index.mjs',usage_model:'standard',containers:[],exports:{default:{type:'worker'}},bindings:[{name:'RELEASE_DB',type:'d1',id:'6a728254-1494-4039-802e-b39288a55fcc'},{name:'AFW_RELEASE_EVENTS_NODE',type:'durable_object_namespace',namespace_id:'d6fc71552de7494a863aca20365a572d',class_name:'AfwOwnEventNode'},{name:'AFW_RELEASE_OPERATOR_ENABLED',type:'plain_text',text:'false'}]},opPin={...realPins.operator,module:{name:'index.mjs',bytes:Buffer.byteLength(opScript),sha256:sha(opScript)},configurationHash:restorationConfigurationHash(opConfig)},opMetadata={...opConfig,id:opPin.id,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(opScript).toString('base64')}]};
  const f={mf,x,w,command,nowOffset:0,activations:[],restores:[],pointerMode:'baseline',alarmMode:'normal',requests:[],uploads:[],mode,pointerReads:0,tokenReads:0,publisherReads:0,baselineReads:0,held:null,release:null,commandReads:0,approval};
  let entry="\n import{DurableObject}from'cloudflare:workers';\n import*as workflowGate from'./lib/mcp-fixed-terminal-workflows.mjs';\n import*as activationWire from'./lib/mcp-qa-finite-initial-activation-wire.mjs';\n import{readPrivateQaFiniteCandidate}from'./lib/mcp-qa-finite-candidate-residency.mjs';\n import{observeFiniteOwnerRequestWork,observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';\n import{readPrivateQaFiniteInitialOwnerSource}from'./lib/mcp-qa-finite-initial-owner-source.mjs';\n import{preparePrivateQaFiniteOwnerChoice}from'./lib/mcp-qa-finite-owner-preparation-qa.mjs';\n import{createFiniteOwnerRequestLease}from'./lib/mcp-qa-finite-owner-preparation.mjs';\n import*as historySchema from'./lib/mcp-qa-finite-initial-history-schema.mjs';\n import*as oldGuard from'./lib/mcp-qa-finite-initial-old-guard.mjs';\n import*as custodyProbe from'./lib/mcp-qa-finite-initial-custody-probe.mjs';\n import{IndependentClosure as FiniteClosure,PrivateQaBootstrap}from'./worker/independent-closure/finite.mjs';\n import{sealFiniteInitialCapsule}from'./lib/mcp-qa-finite-initial-capsule-records.mjs';\n import{initialCanonical,hashFiniteInitialMaterialRecord}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{initialInstanceId}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as enc}from'./lib/mcp-qa-finite-initial-cleanup-records.mjs';\n const P='afw.finite-initial-cleanup.v1:';\n const KEY='afw.finite-initial-preparation.v1:entry';\n export class Node extends DurableObject{}\n export class Initial extends FiniteClosure{\n async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);await this.ctx.storage.sync();}\n async snapshot(){return[...await this.ctx.storage.list()];}\n async mutateCleanup(key,mode){const k=P+key;if(mode==='delete')await this.ctx.storage.delete(k);else{const kinds={'activation-completion':'ActivationCompletion','restore-ack':'RestoreAck',receipt:'Receipt'},fields={'activation-completion':'ackHash','restore-ack':'sendHash',receipt:'restoreAckHash'},r=JSON.parse(await this.ctx.storage.get(k));delete r.purpose;delete r.recordHash;r[fields[key]]='a'.repeat(64);await this.ctx.storage.put(k,enc(kinds[key],seal(kinds[key],r)));}await this.ctx.storage.sync();}\n async capsuleFacts(){const s=this.ctx.storage,read=async k=>JSON.parse(await s.get(k)),prefix='afw.finite-initial-preparation.v1:',entry=await read(KEY),selector=await read(prefix+'selector');return {entry,claim:await read(prefix+'once'),selector,materialAck:await read(prefix+'ack'),material:await read(prefix+'material:'+selector.materialHash),plan:await read(P+'plan'),state:await read(P+'state'),arm:await read(P+'arm-ack'),send:await read(P+'activation-send'),activationAck:await read(P+'activation-ack'),completion:await read(P+'activation-completion'),recordedAt:Date.now()};}\n async probeCapsuleFacts(input){try{return{ok:true,capsule:sealFiniteInitialCapsule(input)};}catch{return{ok:false};}}\n async seedFutureActivation(kind='complete'){\n  // SYN FUTURE INPUT: production forward activation producer is deliberately ABSENT.\n  const p=JSON.parse(await this.ctx.storage.get(P+'plan')),annotation='afw-finite-initial-activate-'+p.recordHash,body=JSON.stringify({strategy:'percentage',versions:[{version_id:p.candidateVersionId,percentage:100}],annotations:{'workers/message':annotation}});\n  const arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),issuedAt=kind==='pre-arm'?arm.acknowledgedAt-1:arm.acknowledgedAt,deadline=Math.min(p.forwardDeadline,issuedAt+5000);if(issuedAt<p.I0||deadline-issuedAt<4)throw Error('SYN forward deadline insufficient');const send=seal('ActivationSend',{planHash:p.recordHash,entryHash:p.entryHash,materialHash:p.materialHash,candidateVersionId:p.candidateVersionId,bodyHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(body)).then(b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')),annotation,issuedAt,deadline});\n  await this.ctx.storage.put(P+'activation-send',enc('ActivationSend',send));if(kind==='send')return;\n  const ack=seal('ActivationAck',{planHash:p.recordHash,sendHash:send.recordHash,deploymentId:'66666666-6666-4666-8666-666666666666',acknowledgedAt:issuedAt+1});\n  await this.ctx.storage.put(P+'activation-ack',enc('ActivationAck',ack));if(kind==='ack')return;\n  const completion=seal('ActivationCompletion',{planHash:p.recordHash,sendHash:send.recordHash,ackHash:ack.recordHash,candidateVersionId:p.candidateVersionId,deploymentId:ack.deploymentId,settledAt:issuedAt+2,observedAt:issuedAt+3});\n  await this.ctx.storage.put(P+'activation-completion',enc('ActivationCompletion',completion));await this.ctx.storage.sync();\n }\n async probeActivationWire(metadata,mode='normal'){\n  try{\n   const plan=JSON.parse(await this.ctx.storage.get(P+'plan')),arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),entry=JSON.parse(await this.ctx.storage.get(KEY));\n   if(mode==='arm')arm.alarmAt++;\n   const issuedAt=arm.acknowledgedAt-(mode==='issued-before-arm'?1:0),deadline=mode==='deadline-too-long'?issuedAt+5001:Math.min(plan.forwardDeadline,issuedAt+5000),wire=activationWire.prepareFiniteInitialActivationWire({plan,arm,entry,issuedAt,deadline});\n   const result={id:'66666666-6666-4666-8666-666666666666',...JSON.parse(wire.body)};\n   if(mode==='wrong-version')result.versions[0].version_id=plan.baselineVersionId;\n   if(mode==='wrong-annotation')result.annotations['workers/message']='SYN invalid';\n   const ack=activationWire.qualifyFiniteInitialActivationAck({plan,send:wire.send,result,acknowledgedAt:mode==='ack-after-deadline'?deadline:issuedAt+1});\n   if(mode==='wrong-deployment')result.id='77777777-7777-4777-8777-777777777777';\n   if(mode==='wrong-module')metadata.modules[0].content_base64='AAAA';\n   let candidateBytes=readPrivateQaFiniteCandidate().bytes;\n   if(mode==='coherent-wrong-module'){candidateBytes=new TextEncoder().encode('SYN coherently altered module');metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   if(mode==='same-size-wrong-module'){candidateBytes=candidateBytes.slice();candidateBytes[0]^=1;metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   const completion=activationWire.qualifyFiniteInitialActivationCompletion({plan,send:wire.send,ack,pointer:result,metadata,bytes:candidateBytes,settledAt:issuedAt+2,observedAt:mode==='observation-after-deadline'?deadline:issuedAt+3});\n   return{status:'proposal_only',wire,ack,completion};\n  }catch{return{status:'rejected'};}\n }\n\n async ownerSourceRead(delta=400000,mode='normal',preconnectionId=null,token=null){\n  const s=this.ctx.storage,raw=JSON.parse(await s.get('afw.finite-initial-preparation.v1:capsule')),now=Date.now,get=s.get,list=s.list,alarm=s.getAlarm,put=s.put,transaction=s.transaction,sync=s.sync,fetcher=globalThis.fetch,version=this.env.AFW_QA_VERSION,node=this.env.AFW_RELEASE_EVENTS_NODE,db=this.env.RELEASE_DB,withSession=db.withSession;let offset=raw.I0+delta-now(),reads=0,capsuleReads=0;\n  Date.now=()=>now()+offset;\n  const requestAbort=new AbortController(),request=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{signal:requestAbort.signal,headers:token?{'Cf-Access-Jwt-Assertion':token}:{}}),entry=createFiniteOwnerRequestLease(request);\n  if(mode==='request-budget')offset+=29900;this.ownerEffects=0;\n  const noWrite=()=>{this.ownerEffects++;throw Error('SYN owner reader attempted a write');};if(mode!=='private-choice'){s.put=noWrite;s.transaction=noWrite;s.sync=noWrite;}\n  if(['held-fetch','held-body','held-cancel'].includes(mode)){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(fetcher,globalThis,args).then(async response=>{\n   if(mode==='held-fetch')return new Promise(resolve=>{owner.releaseHeld=()=>resolve(response);});\n   await response.body.cancel();\n   if(mode==='held-cancel')return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{status:401,headers:response.headers});\n   let pulled=false;return new Response(new ReadableStream({pull(controller){if(pulled)return;pulled=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers});\n  });}\n  s.get=async(...a)=>{const v=await Reflect.apply(get,s,a);reads++;if(a[0].endsWith(':capsule'))capsuleReads++;\n   if(['held-read','request-budget','nested-request-held-read'].includes(mode)&&reads===1)return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n   if(mode==='holder-drift'&&reads===1)this.env.AFW_RELEASE_EVENTS_NODE={};\n   if(mode==='backward'&&reads===1)offset-=100;\n   if(mode==='parent-deadline'&&reads===1)offset+=30001;\n   if(mode==='aborted'&&reads===1)entry.finish();if(mode==='request-abort'&&reads===1)requestAbort.abort();\n   if(mode==='missing'&&a[0].endsWith(':capsule'))return undefined;\n   if(mode==='malformed'&&a[0].endsWith(':capsule'))return v+' ';\n   if(mode==='hash'&&a[0].endsWith(':capsule')){const x=JSON.parse(v);x.bindingsHash='f'.repeat(64);return initialCanonical(x);}\n   if(mode==='material'&&a[0].includes(':material:'))return v+' ';\n   if(mode.startsWith('anchor-')&&a[0].endsWith(':'+mode.slice(7)))return v+' ';\n   if(mode==='changed-anchor'&&capsuleReads>1&&a[0].endsWith(':capsule'))return v+' ';\n   return v;\n  };\n  s.getAlarm=(...a)=>mode==='alarm'?Promise.resolve(raw.C0+1):Reflect.apply(alarm,s,a);\n  s.list=(...a)=>Reflect.apply(list,s,a).then(rows=>{if(mode.startsWith('anchor-')&&rows.has(P+mode.slice(7)))rows.set(P+mode.slice(7),rows.get(P+mode.slice(7))+' ');if(mode==='transition'&&a[0]?.prefix===P)rows.set(P+'restore-send','SYN transition');if(mode==='head'&&a[0]?.prefix==='afw.qa-finite-trial.v1:')rows.set('afw.qa-finite-trial.v1:head','SYN head');if(mode==='publication'&&a[0]?.prefix==='afw.finite-policy-effect.v1:')rows.set(a[0].prefix+'writer-head','SYN publication');return rows;});\n  if(mode==='wrong-version')this.env.AFW_QA_VERSION={id:'99999999-9999-4999-8999-999999999999'};\n  const ctx=mode==='wrong-actor'?{storage:s,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('SYN-wrong')}:this.ctx;\n  const restore=()=>{Date.now=now;s.get=get;s.list=list;s.getAlarm=alarm;s.put=put;s.transaction=transaction;s.sync=sync;globalThis.fetch=fetcher;this.env.AFW_QA_VERSION=version;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=withSession;};\n  this.ownerRestore=restore;\n  try{if(mode==='private-choice')return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>preparePrivateQaFiniteOwnerChoice({ctx,env:this.env,request},entry.lease));if(mode.startsWith('nested-request'))return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId}));if(mode==='untrusted-parent')return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:{signal:entry.lease.signal,assertCurrent:()=>{}},preconnectionId});return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId});}\n  catch{return{status:'unavailable'};}finally{entry.finish();restore();}\n }\n\n async ownerEffectCount(){return this.ownerEffects??0;}\n async preEntryCustody(mode='normal'){const ctx=mode==='wrong-actor'?{storage:this.ctx.storage,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('wrong-actor')}:this.ctx;return await custodyProbe.readFinitePreEntryCustody({ctx,env:this.env});}\n async probeStageAvailability(){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{}}),admission=Object.freeze({lease});try{await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},async()=>true);return{available:true};}catch{return{available:false};}finally{controller.abort();}}\n async probeNativeCustody(mode='normal'){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}}),admission=Object.freeze({lease});try{if(mode==='aborted')controller.abort();if(mode==='unscoped')return await custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease);return await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},()=>custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease));}catch{return{status:'unavailable'};}finally{controller.abort();}}\n async probeOldGuard(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await oldGuard.readFiniteInitialOldGuard({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeHistorySchema(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await historySchema.readFiniteInitialHistorySchema({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeInitialInventory(){try{const raw=await this.ctx.storage.get(KEY),entry=JSON.parse(raw),read=async(path,query)=>{const url='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec'+path+(query?'?'+new URLSearchParams(query):''),r=await fetch(url,{headers:{Authorization:'Bearer '+this.env.AFW_MCP_CLOSURE_READ_TOKEN}}),v=await r.json();return{value:v.result,info:v.result_info};};return await workflowGate.readFiniteInitialAfwWorkflows({read,assertCurrent:()=>{},entry});}catch{return{status:'unavailable'};}}\n async initialAlarmAt(at){const original=Date.now,offset=at-original(),db=this.env.RELEASE_DB,withSession=db.withSession;\n  // SYN time advance: keep native D1 query and data, shift only its SQL clock to match worker clock.\n  db.withSession=(...args)=>{const session=Reflect.apply(withSession,db,args),prepare=session.prepare;session.prepare=sql=>Reflect.apply(prepare,session,[sql.replace(' AS INTEGER) dbNow',' AS INTEGER)+'+offset+' dbNow')]);return session;};\n  Date.now=()=>original()+offset;try{return await this.alarm();}finally{Date.now=original;db.withSession=withSession;}}\n async alarmInfo(){return this.ctx.storage.getAlarm();}\n async initialAlarm(){return this.alarm();}\n async nominalAlarmData(){const r=await this.alarm();return {state:await r?.state};}\n async installAlarm(at){return this.ctx.storage.setAlarm(at);}\n async configure(mode){\n  this.localBodyCancelled=false;const actualFetch=globalThis.fetch;\n  if(mode==='late-body-observe'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).includes('/instances-v2?state=active'))return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){owner.localBodyCancelled=true;}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-cancel'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-read'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});let requested=false;return new Response(new ReadableStream({pull(controller){if(requested)return;requested=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  this.fault=mode;this.transactions=0;this.syncs=0;this.callbacks=0;this.uploadStage=null;this.uploadTransactions=0;this.cleanupStage=null;this.activationStage=null;this.capsuleStage=false;this.capsuleTransactions=0;\n  const s=this.ctx.storage,nt=s.transaction,ns=s.sync,ng=s.get,db=this.env.RELEASE_DB,node=this.env.AFW_RELEASE_EVENTS_NODE,dbSession=db.withSession,nodeString=node.idFromString,publisher=this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,nga=s.getAlarm,nlist=s.list;\n  this.restore=()=>{globalThis.fetch=actualFetch;s.transaction=nt;s.sync=ns;s.get=ng;s.getAlarm=nga;s.list=nlist;this.env.RELEASE_DB=db;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=dbSession;node.idFromString=nodeString;this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=publisher;};\n  s.transaction=(fn,...args)=>{\n   const n=++this.transactions;\n   if(n===1&&mode==='changed-db-with-session')db.withSession=(...args)=>Reflect.apply(dbSession,db,args);\n   if(n===1&&mode==='changed-node-id-from-string')node.idFromString=(...args)=>Reflect.apply(nodeString,node,args);\n   if(mode==='never-commit'&&n===1)return Promise.reject(Error('SYN precommit failure'));\n   if(mode==='callback-retry'&&n===1)return(async()=>{\n    let candidate;\n    await Reflect.apply(nt,s,[async tx=>{this.callbacks++;await fn(tx);candidate=await tx.get(KEY);tx.rollback();}]);\n    await s.put(KEY,candidate);await Reflect.apply(ns,s,[]);\n    return Reflect.apply(nt,s,[async tx=>{this.callbacks++;return fn(tx);}]);\n   })();\n   let stage,sendPair,arm=false,armRows=[],activationStage,capsuleWrite=false;\n   const capsuleTx=this.activationStage==='completion';if(capsuleTx)this.capsuleTransactions++;\n   const wrapped=async tx=>{\n    const actual=await fn({get:async(...a)=>{\n     const value=await tx.get(...a);\n     if(capsuleTx){\n      const k=a[0],prefix='afw.finite-initial-preparation.v1:',aliases={entry:KEY,claim:prefix+'once',selector:prefix+'selector',materialAck:prefix+'ack',material:k.startsWith(prefix+'material:')?k:null,plan:P+'plan',state:P+'state',arm:P+'arm-ack',send:P+'activation-send',activationAck:P+'activation-ack',completion:P+'activation-completion',head:'afw.qa-finite-trial.v1:head'};\n      if(mode.startsWith('capsule-missing-')&&k===aliases[mode.slice(16)])return undefined;\n      if(mode.startsWith('capsule-mismatch-')&&k===aliases[mode.slice(17)])return value+' ';\n      if(mode==='capsule-coherent-ack'&&k===prefix+'ack'){const v=JSON.parse(value);v.acknowledgedAt++;return initialCanonical(v);}\n      if(mode==='capsule-coherent-claim'&&k===prefix+'once'){const v=JSON.parse(value);v.deadline--;v.claimHash=hashFiniteInitialMaterialRecord('InitialClaim',v);return initialCanonical(v);}\n      if(mode==='capsule-finite-head'&&k===aliases.head)return {intentId:'SYN conflict'};\n     }\n     return value;\n    },setAlarm:mode==='cleanup-missing-tx-alarm'?undefined:(...a)=>tx.setAlarm(...a),deleteAlarm:(...a)=>tx.deleteAlarm(...a),put:async(k,v)=>{\n     if(k==='afw.finite-initial-preparation.v1:capsule')capsuleWrite=true;\n     if(k===P+'plan'||k===P+'state'){arm=true;armRows.push([k,v]);}\n     if(k.startsWith(P+'activation-'))activationStage=k.slice((P+'activation-').length);\n     if(k.startsWith('afw.finite-initial-upload.v1:')){stage=k.split(':').at(-1);if(stage==='send'){sendPair=[k,v];this.uploadTransactions++;if(mode==='upload-publisher-drift')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';}}\n     return tx.put(k,v);\n    }});\n    if(arm&&mode==='cleanup-callback-retry')tx.rollback();\n    if(arm&&mode==='cleanup-never-commit'){tx.rollback();throw Error('SYN cleanup precommit');}\n    if(stage==='send'&&mode==='upload-callback-retry')tx.rollback();\n    if(stage==='send'&&mode==='upload-never-commit'){tx.rollback();throw Error('SYN upload precommit rejected');}\n    return actual;\n   };\n   const actual=Reflect.apply(nt,s,[mode.startsWith('upload-')||mode.startsWith('cleanup-')||mode.startsWith('activation-storage-')||mode.startsWith('capsule-')?wrapped:fn,...args]).then(v=>{this.uploadStage=stage??this.uploadStage;if(arm)this.cleanupStage='plan';if(activationStage)this.activationStage=activationStage;if(capsuleWrite)this.capsuleStage=true;return v;});\n   if(mode==='capsule-held-transaction')return actual.then(v=>capsuleWrite?new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}):v);\n   if(mode==='capsule-return-lost'||mode==='capsule-completion-return-lost')return actual.then(v=>{if(capsuleWrite||mode==='capsule-completion-return-lost'&&activationStage==='completion')throw Error('SYN journal transaction return lost');return v;});\n   if(mode==='activation-storage-return-lost')return actual.then(v=>{if(activationStage==='send')throw Error('SYN committed SEND return lost');return v;});\n   if(mode.startsWith('cleanup-'))return actual.then(async v=>{\n    if(arm&&mode==='cleanup-callback-retry'){for(const row of armRows)await s.put(...row);const p=JSON.parse(armRows.find(([k])=>k===P+'plan')[1]);await s.setAlarm(p.C0);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(arm&&mode==='cleanup-final-return-lost'){await Reflect.apply(ns,s,[]);throw Error('SYN final cleanup transaction return lost');}\n    return v;\n   });\n   if(mode.startsWith('upload-'))return actual.then(async v=>{\n    if(stage==='send'&&mode==='upload-callback-retry'){await s.put(...sendPair);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(stage==='send'&&mode==='upload-lost-send-ack'){await Reflect.apply(ns,s,[]);throw Error('SYN upload committed ACK lost');}\n    if(stage==='send'&&mode==='upload-held-send')return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n    return v;\n   });\n   if(mode==='lost-ack'&&n===1)return actual.then(async()=>{await Reflect.apply(ns,s,[]);throw Error('SYN committed ACK lost');});\n   if(mode==='changed-sync'&&n===1)return actual.then(v=>{s.sync=()=>Promise.resolve();return v;});\n   if(mode==='held-transaction'&&n===1)return actual.then(v=>new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}));\n   return actual;\n  };\n  s.sync=(...args)=>{\n   const n=++this.syncs,actual=Reflect.apply(ns,s,args);\n   if(mode==='capsule-sync-lost'&&this.capsuleStage||mode==='capsule-completion-sync-lost'&&this.activationStage==='completion')return actual.then(()=>{throw Error('SYN capsule sync lost');});\n   if(mode==='capsule-held-sync'&&this.capsuleStage)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='capsule-holder-drift'&&this.capsuleStage)return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n   if(mode==='capsule-expired-completion'&&this.activationStage==='completion')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='activation-storage-sync-lost'&&this.activationStage==='send')return actual.then(()=>{throw Error('SYN SEND sync lost');});\n   if(mode==='cleanup-reject-sync'&&this.cleanupStage==='plan')return actual.then(()=>{throw Error('SYN cleanup sync lost');});\n   if(mode==='cleanup-hold-sync'&&this.cleanupStage==='plan')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='cleanup-nominal-conflict'&&this.uploadStage==='receipt')return actual.then(()=>s.put('afw.qa-finite-trial.v1:head',{intentId:'SYN conflict'}));\n   if(mode==='cleanup-publisher-drift'&&this.cleanupStage==='plan')return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n\n   if(mode==='upload-reject-sync'&&this.uploadStage==='send')return actual.then(()=>{throw Error('SYN upload sync ACK lost');});\n   if(mode==='upload-hold-sync'&&this.uploadStage==='send'||mode==='upload-hold-ack-sync'&&this.uploadStage==='ack')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(['upload-chunk-tamper','upload-config-tamper'].includes(mode)&&n===3)return actual.then(async()=>{for(const[k,v]of await s.list()){if(mode==='upload-chunk-tamper'?k.includes(':chunk:'):k.endsWith(':backup')){const x=JSON.parse(v);if(mode==='upload-chunk-tamper')x.content='AAAA';else x.rawConfiguration.usage_model='changed';await s.put(k,JSON.stringify(x));break;}}});\n\n   if(mode==='reject-sync'&&n===1||mode==='post-reject-sync'&&n===2)return actual.then(()=>{throw Error('SYN sync ACK lost');});\n   if(mode==='hold-sync'&&n===1||mode==='post-hold-sync'&&n===2)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   return actual;\n  };\n  if(mode.startsWith('capsule-'))s.get=async(...a)=>{\n   const value=await Reflect.apply(ng,s,a),key=a[0];\n   if(key==='afw.finite-initial-preparation.v1:capsule'&&value!==undefined){\n    if(mode==='capsule-readback-lost')throw Error('SYN capsule readback lost');\n    if(mode==='capsule-held-readback')return new Promise(resolve=>{this.releaseHeld=()=>resolve(value);});\n   }\n   if(mode==='capsule-completion-readback-lost'&&key===P+'activation-completion'&&value!==undefined)throw Error('SYN completion readback lost');\n   return value;\n  };\n  if(mode==='upload-readback-tamper')s.get=async(...a)=>{const value=await Reflect.apply(ng,s,a);return a[0].startsWith('afw.finite-initial-upload.v1:')&&a[0].endsWith(':send')&&value!==undefined?value+' ':value;};\n  if(mode==='gate-retention'){\n   db.withSession=(...args)=>{\n    const session=Reflect.apply(dbSession,db,args),prepare=session.prepare;\n    session.prepare=(sql,...more)=>{\n     const statement=Reflect.apply(prepare,session,[sql,...more]);\n     if(sql.includes('FROM sqlite_schema')){\n      const all=statement.all;\n      statement.all=(...params)=>Reflect.apply(all,statement,params).then(value=>new Promise(resolve=>{this.releaseHeld=()=>resolve(value);}));\n     }\n     return statement;\n    };\n    return session;\n   };\n  }\n  if(mode==='missing-get-alarm')s.getAlarm=undefined;\n  if(mode==='late-initial-journal'||mode==='preexisting-send'){let reads=0;s.list=(...args)=>Reflect.apply(nlist,s,args).then(async rows=>{if(++reads===3){if(mode==='preexisting-send')await s.put(P+'activation-send','SYN conflict');rows.set(P+'activation-send','SYN conflict');}return rows;});}\n  if(mode==='missing-list')s.list=undefined;\n  if(mode==='cleanup-alarm-ack-lost')s.getAlarm=(...a)=>this.cleanupStage==='plan'?Promise.reject(Error('SYN native alarm ACK lost')):Reflect.apply(nga,s,a);\n  if(mode==='missing-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=undefined;\n  if(mode==='invalid-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='bad token';\n  if(mode==='missing-sync')s.sync=undefined;\n  if(mode==='missing-db')this.env.RELEASE_DB=undefined;\n  if(mode==='missing-node')this.env.AFW_RELEASE_EVENTS_NODE=undefined;\n  if(mode==='missing-db-with-session')db.withSession=undefined;\n  if(mode==='noncallable-db-with-session')db.withSession=0;\n  if(mode==='missing-node-id-from-string')node.idFromString=undefined;\n  if(mode==='noncallable-node-id-from-string')node.idFromString=0;\n }\n async invoke(refs){return typeof this.prepareFiniteInitialMaterial==='function'?this.prepareFiniteInitialMaterial(refs):{status:'admin_pending',mayRetry:false,operationalReadiness:false};}\n async release(){this.releaseHeld?.();this.releaseHeld=null;}\n async releaseBodyCancel(){this.releaseCancel?.();this.releaseCancel=null;}\n async releaseBodyRead(){this.releaseRead?.();this.releaseRead=null;}\n async stats(){return{transactions:this.transactions,capsuleTransactions:this.capsuleTransactions,capsuleStage:this.capsuleStage,syncs:this.syncs,callbacks:this.callbacks,uploadTransactions:this.uploadTransactions,uploadStage:this.uploadStage,held:typeof this.releaseHeld==='function',bodyCancelled:this.localBodyCancelled===true,cancelHeld:typeof this.releaseCancel==='function',readHeld:typeof this.releaseRead==='function'};}\n async restoreMethods(){this.releaseHeld?.();this.releaseRead?.();this.releaseCancel?.();this.restore?.();}\n\n }export default{async fetch(request,env){const refs=await request.json();\n  const event={payload:{operation:'finite_initial_preparation',commandId:refs.commandId,sourceRevision:refs.sourceRevision,qaVersionId:refs.qaVersionId},timestamp:new Date(refs.createdAt),instanceId:refs.initialInstanceId,workflowName:refs.workflowName};\n  // Explicit SYN event/step delivery; actual production Workflow class/run and DO RPC.\n  let config;const step={do:async(name,options,fn)=>{config={name,options};return fn();}};\n  const result=await PrivateQaBootstrap.prototype.run.call({env:env},event,step);return Response.json({result,config});}};\n";
  if(mode.startsWith('enrollment'))entry=extendPreparationCleanupFixture(entry);
  if(mode.startsWith('phase-context'))entry=extendFiniteOwnerPhaseContext(entry);
+ if(mode.startsWith('phase-context-sdk'))entry=extendFiniteOwnerQaSdk(entry,{observed:mode.startsWith('phase-context-sdk-observed')});
  let product;try{product=await readFile('lib/mcp-qa-finite-initial-material.mjs','utf8');}catch{product='export function createPrivateQaFiniteInitialMaterial(){return{collect:async()=>({status:"admin_pending"}),assertCurrent(){throw Error("missing original factual producer");}};}';}
  const approvalDecl="CEILING=Date.parse('2026-11-03T02:59:00Z')";
  if(product.includes(approvalDecl)){assert.equal(product.split(approvalDecl).length,2);product=product.replace(approvalDecl,'CEILING='+approval);}
  const sources=new Map();
  for(const p of ['mcp-qa-finite-initial-entry.mjs','mcp-qa-finite-initial-entry-records.mjs','mcp-qa-finite-initial-capsule-records.mjs','mcp-qa-finite-initial-cleanup.mjs']){try{const s=await readFile('lib/'+p,'utf8');sources.set(p,s.replaceAll("Date.parse('2026-11-03T02:59:00Z')",String(approval)));}catch{/* RED: finite class has no entry yet. */}}
  for(const p of ['mcp-qa-finite-historical-source.mjs','mcp-qa-finite-bootstrap-native.mjs']){
   const s=await readFile('lib/'+p,'utf8');assert.equal(s.split(approvalDecl).length,2);sources.set(p,s.replace(approvalDecl,'CEILING='+approval));
  }
+ if(mode.startsWith('phase-context-sdk-observed')){
+  // Test-only error-location observation; no return/guard/authority replacement.
+  const instrument=source=>source.replaceAll('catch{return pending();}',"catch(error){console.info('D02 initial failure frames',String(error?.stack??'').split('\\n').slice(1,5).join(' | '));if(/^Finite historical source unavailable:(input|custody|http|metadata|historical_slots|legacy|history|coherence|deadline)$/.test(error?.message??''))console.info('D02 historical gate',error.message);return pending();}");
+  product=instrument(product);
+  sources.set('mcp-qa-finite-initial-entry.mjs',instrument(sources.get('mcp-qa-finite-initial-entry.mjs')));
+ }
  const plugin={name:'explicit-SYN-external-data-not-whole-facts',setup(b){
+  if(mode.startsWith('phase-context-sdk-observed'))b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdk(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode.startsWith('enrollment-pin-'))b.onLoad({filter:/mcp-qa-finite-initial-anchors\.mjs$/},async args=>{
    let contents=await readFile(args.path,'utf8');
    const needle='const compiledResidency=globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__??null;';
    assert.equal(contents.split(needle).length,2);
    const values={'enrollment-pin-absent':'null','enrollment-pin-foreign':"({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__,sourceRevision:'f'.repeat(40)})",'enrollment-pin-malformed':"({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__,module:{name:'index.mjs',sha256:'f',bytes:1}})",'enrollment-pin-accessor':"Object.defineProperty({...globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__},'module',{enumerable:true,get(){throw Error('SYN accessor executed');}})"};
    contents=contents.replace(needle,'const compiledResidency='+values[mode]+';');return {contents,loader:'js'};
   });
   if(mode.startsWith('enrollment'))b.onResolve({filter:/mcp-qa-finite-(owner-source|connection-source)\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-preparation-cleanup-source.mjs'}));
   b.onLoad({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({contents:product,loader:'js'}));
   b.onResolve({filter:/mcp-qa-finite-initial-material\.mjs$/},()=>({path:process.cwd()+'/lib/mcp-qa-finite-initial-material.mjs'}));
   b.onLoad({filter:/mcp-qa-finite-(initial-entry|initial-entry-records|initial-capsule-records|initial-cleanup|historical-source|bootstrap-native)\.mjs$/},args=>({contents:sources.get(args.path.split('/').at(-1)),loader:'js'}));
   b.onLoad({filter:/mcp-confirmation-frozen-artifact\.json$/},()=>({contents:J(x.receipt),loader:'json'}));
   b.onLoad({filter:/mcp-qa-legacy-historical-context\.json$/},()=>({contents:J(x.historical),loader:'json'}));
   b.onLoad({filter:/mcp-qa-cloud-closed-pins\.mjs$/},()=>({contents:'export const QA_CLOUD_CLOSED_PINS='+J({...realPins,canary:x.pin,operator:opPin})+';',loader:'js'}));
  }};
- const built=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin],define:{'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':J(resident),'globalThis.__AFW_QA_SOURCE_REVISION__':J(M),'globalThis.__AFW_FINITE_SOURCE_TREE__':J(TREE),'globalThis.__AFW_NODE_PROGRAM__':J(program),'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':J(w.expected)}});
- const finalOptions=convertV4MiniflareOptions({...base,script:built.outputFiles[0].text,outboundService:async req=>{
+ const built=await build({metafile:true,stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin],define:{'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':J(resident),'globalThis.__AFW_QA_SOURCE_REVISION__':J(M),'globalThis.__AFW_FINITE_SOURCE_TREE__':J(TREE),'globalThis.__AFW_NODE_PROGRAM__':J(program),'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':J(w.expected)}});
+ if(mode.startsWith('phase-context-sdk'))console.info('D02 fixture QA compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:sha(built.outputFiles[0].contents),inputs:Object.keys(built.metafile.inputs).length}));
+ let finalOptions={...base,script:built.outputFiles[0].text,outboundService:async req=>{
   if(req.url.endsWith('/cdn-cgi/access/certs'))return Response.json({keys:[jwk]});
-  f.requests.push(req.url);(f.requestMethods??=[]).push(req.method);
+  f.requests.push(req.url);(f.observationTimes??=[]).push({at:Date.now(),method:req.method,kind:new URL(req.url).origin==='https://api.cloudflare.com'?'provider':'ledger'});(f.requestMethods??=[]).push(req.method);
   let value;
   if(req.url.startsWith(GH)){
    assert.equal(req.headers.get('authorization'),null);value=structuredClone(await w.get(req.url.slice(GH.length)));
    if(req.url===GH+'/issues/comments/'+COMMAND){f.commandReads++;if(mode==='wrong-owner')value.user.id=1;if(mode==='wrong-repository')value.issue_url='https://api.github.com/repos/other/repo/issues/497';if(mode==='wrong-issue')value.issue_url=GH+'/issues/498';if(mode==='wrong-source')value.body=value.body.replace(M,'e'.repeat(40));if(mode==='wrong-qa')value.body=value.body.replace(UUID,'44444444-4444-4444-8444-444444444444');if(mode==='edited')value.updated_at=new Date(Date.parse(created)+1).toISOString();if(mode==='expired-command')value.created_at=value.updated_at=new Date(Date.now()-300001).toISOString();if(mode==='command-drift'&&f.commandReads===2)value.body+=' '; }
   }else{
    assert.ok(['Bearer synthetic-native-reader','Bearer synthetic-native-publisher'].includes(req.headers.get('authorization')));
    let result;
    if(req.url===CF+'/tokens/verify'){if(mode==='custody-hold'){f.held='custody-read';await new Promise(resolve=>{f.release=resolve;});}result={id:req.headers.get('authorization')==='Bearer synthetic-native-reader'?'9aa97ad1fc9afe3021cf69ea497d5190':'05718105dcdfc92e55cc3624172c2740',status:'active',expires_on:new Date(approval+60000).toISOString(),not_before:null};}
    else if(req.url===CF+'/workers/scripts/agent-friendly-web-independent-closure-qa/deployments?per_page=1'){
     result=structuredClone(w.pointer);
     if(f.phaseDrift==='qa-pointer'&&++f.phaseQaObservation===2)result.deployments[0].id='99999999-9999-4999-8999-999999999999';
     if(f.uploads.length>0){f.gateReached=true;if(f.gateMode==='qa')result.deployments[0].id='99999999-9999-4999-8999-999999999999';}
    }
-   else if(req.url===CF+'/workers/workers/agent-friendly-web-independent-closure-qa/versions/'+UUID+'?include=modules'){result={...structuredClone(finitePublicProfileTemplate('qaLive')),id:UUID,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from('export default{};').toString('base64')}]};if(f.ownerFault==='qa-module')result.modules[0].content_base64='AAAA';if(f.ownerFault==='qa-namespace')result.bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id='f'.repeat(32);}
+   else if(req.url===CF+'/workers/workers/agent-friendly-web-independent-closure-qa/versions/'+UUID+'?include=modules'){result={...structuredClone(finitePublicProfileTemplate('qaLive')),id:UUID,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from('export default{};').toString('base64')}]};if(f.ownerFault==='qa-module')result.modules[0].content_base64='AAAA';if(f.ownerFault==='qa-namespace')result.bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id='f'.repeat(32);if(f.ownerFault==='sdk-alias')result.bindings.find(b=>b.name==='AFW_FINITE_OWNER_OAUTH_KV').namespace_id='f'.repeat(32);if(f.ownerFault==='sdk-extra')result.bindings.push({name:'EXTRA_SAME_ACCOUNT',type:'kv_namespace',namespace_id:'6b94ff702e504e14a7730cee73a0f6ff'});}
    else if(req.url===CF+'/workers/scripts/agent-friendly-web-release-operator/deployments?per_page=1'){if(['primary-retention','primary-late-headers'].includes(f.gateMode))await new Promise(resolve=>setTimeout(resolve,500));result={deployments:[{id:['primary-retention','primary-late-headers','operator-pointer'].includes(f.gateMode)?'99999999-9999-4999-8999-999999999999':opPin.deploymentId,strategy:'percentage',versions:[{version_id:opPin.id,percentage:100}]}]};}
    else if(req.url===CF+'/workers/workers/agent-friendly-web-release-operator/versions/'+opPin.id+'?include=modules'){result=structuredClone(opMetadata);if(f.gateMode==='operator-version')result.modules[0].content_base64=Buffer.from('SYN operator drift').toString('base64');}
    else if(req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/versions?deployable=true&per_page=100&page=1'){
     const items=Array.from({length:100},(_,i)=>({id:i===5&&f.alarmMode!=='ineligible'?x.pin.id:'00000000-0000-4000-8000-'+String(i+1).padStart(12,'0'),number:171-i}));
     result={items};
     return Response.json({success:true,errors:[],messages:[],result,result_info:{page:0,per_page:100,count:100,total_count:100}},{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString()}});
    }
    else if(req.url===CF+'/workflows/afw-own-qa-private-bootstrap/instances/afw-mcp-closure-d56b5e850d24cc23058a024d73bae4c830a91c1fb9659f2e96282854ccae2c04'){
     assert.equal(req.method,'GET');assert.equal(req.headers.get('authorization'),'Bearer synthetic-native-reader');
     if(f.oldGuardMode==='retention-401')await new Promise(resolve=>setTimeout(resolve,500));
@@ -129,33 +143,33 @@
      f.activations.push({body,data});f.activationAnnotation=data.annotations['workers/message'];
      result={id:'66666666-6666-4666-8666-666666666666',...data};f.pointerMode=f.alarmMode==='activation-pointer-drift'?'foreign':'candidate';
      if(f.alarmMode==='activation-ack-bad')result.versions[0].percentage=99;
      if(f.alarmMode==='activation-held'){f.held='activation';await new Promise(resolve=>{f.release=resolve;});}
      if(f.alarmMode==='activation-ack-lost')throw Error('SYN activation applied ACK lost');
     }else{
      f.restores.push({body,data});result={id:'77777777-7777-4777-8777-777777777777',...data};f.restored=result;f.pointerMode='restored';
      if(f.alarmMode==='restore-ack-lost')throw Error('SYN restore applied ACK lost');
     }
    }
-   else if(req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments?per_page=1'){f.pointerReads++;if(f.phaseDrift&&++f.phaseObservation===2){if(f.phaseDrift==='schema')await f.db.prepare('DROP TABLE finite_preparation_issuer_fences').run();if(f.phaseDrift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1').run();if(f.phaseDrift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN drift'").run();if(f.phaseDrift==='configuration')f.phaseFault='configuration';if(f.phaseDrift==='pointer')f.phaseCurrent.receipt.deploymentId='11111111-1111-4111-8111-111111111111';if(f.phaseDrift==='grant')await f.db.prepare("UPDATE delegated_access_grants SET revoked_at=?").bind(new Date().toISOString()).run();}if(f.phaseCurrent)result={deployments:[{id:f.phaseCurrent.receipt.deploymentId,strategy:'percentage',versions:[{version_id:f.phaseCurrent.receipt.versionId,percentage:100}]}]};else if(f.pointerMode==='restored')result={deployments:[f.restored]};else if(f.pointerMode==='candidate'||f.pointerMode==='foreign')result={deployments:[{id:f.pointerMode==='foreign'?'99999999-9999-4999-8999-999999999999':'66666666-6666-4666-8666-666666666666',strategy:'percentage',versions:[{version_id:f.uploaded.id,percentage:100}],annotations:{'workers/message':f.activationAnnotation}}]};else result={deployments:[{id:mode==='baseline-drift'||mode==='pointer-drift'&&f.uploads.length||(f.gateMode==='canary-pointer'&&f.gateReached||f.gateMode==='final-pointer'&&f.pointerReads>=5)?'99999999-9999-4999-8999-999999999999':x.pin.deploymentId,strategy:'percentage',versions:[{version_id:x.pin.id,percentage:100}]}]};}
+   else if(req.url===CF+'/workers/scripts/agent-friendly-web-delegated-canary/deployments?per_page=1'){f.pointerReads++;if(f.phaseDrift&&++f.phaseObservation===2){if(f.phaseDrift==='schema')await f.db.prepare('DROP TABLE finite_preparation_issuer_fences').run();if(f.phaseDrift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1').run();if(f.phaseDrift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN drift'").run();if(f.phaseDrift==='configuration')f.phaseFault='configuration';if(f.phaseDrift==='original-open')f.ownerFault='original-open';if(f.phaseDrift==='pointer')f.phaseCurrent.receipt.deploymentId='11111111-1111-4111-8111-111111111111';if(f.phaseDrift==='grant')await f.db.prepare("UPDATE delegated_access_grants SET revoked_at=?").bind(new Date().toISOString()).run();}if(f.phaseCurrent)result={deployments:[{id:f.phaseCurrent.receipt.deploymentId,strategy:'percentage',versions:[{version_id:f.phaseCurrent.receipt.versionId,percentage:100}]}]};else if(f.pointerMode==='restored')result={deployments:[f.restored]};else if(f.pointerMode==='candidate'||f.pointerMode==='foreign')result={deployments:[{id:f.pointerMode==='foreign'?'99999999-9999-4999-8999-999999999999':'66666666-6666-4666-8666-666666666666',strategy:'percentage',versions:[{version_id:f.uploaded.id,percentage:100}],annotations:{'workers/message':f.activationAnnotation}}]};else result={deployments:[{id:mode==='baseline-drift'||mode==='pointer-drift'&&f.uploads.length||(f.gateMode==='canary-pointer'&&f.gateReached||f.gateMode==='final-pointer'&&f.pointerReads>=5)?'99999999-9999-4999-8999-999999999999':x.pin.deploymentId,strategy:'percentage',versions:[{version_id:x.pin.id,percentage:100}]}]};}
    else if(req.url===CF+'/workers/workers/agent-friendly-web-delegated-canary/versions?deploy=false'){
     assert.equal(req.method,'POST');assert.equal(req.headers.get('authorization'),'Bearer synthetic-native-publisher');assert.match(req.headers.get('content-type'),/^application\/json/);
     const body=await req.text(),data=JSON.parse(body);f.uploads.push({body,data});f.uploaded={...data,id:'55555555-5555-4555-8555-555555555555',urls:[],containers:data.containers.map(c=>({...c,name:'agent-friendly-web-delegated-canary-afwowneventnode'})),bindings:data.bindings.map(b=>b.type==='inherit'?{name:b.name,type:'secret_text'}:b)};
     result={id:mode==='ack-baseline'?x.pin.id:mode==='ack-qa'?UUID:mode==='ack-latest'?'latest':mode==='ack-invalid'?'not-a-uuid':f.uploaded.id};
     if(mode==='lost-http-ack')throw Error('SYN provider ACK lost after version creation');
     if(mode==='held-http'){f.held='fetch';await new Promise(resolve=>{f.release=resolve;});}
     if(mode==='held-body'){
      f.held='body';return new Response(new ReadableStream({start(controller){f.release=()=>{controller.enqueue(new TextEncoder().encode(JSON.stringify({success:true,errors:[],messages:[],result})));controller.close();};}}),{headers:{date:new Date().toUTCString(),'content-type':'application/json'}});
     }
    }else if(req.url===CF+'/workers/workers/agent-friendly-web-delegated-canary/versions/55555555-5555-4555-8555-555555555555?include=modules'){assert.ok(f.uploaded);result=structuredClone(f.uploaded);
     if(f.ownerFault==='module')result.modules[0].content_base64='AAAA';
-    if(f.ownerFault==='configuration')result.bindings.find(b=>b.name==='ACCESS_AUD').text='SYN drift';
+    if(f.ownerFault==='configuration')result.bindings.find(b=>b.name==='ACCESS_AUD').text='SYN drift';if(f.ownerFault==='original-open')result.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
     if(mode==='wrong-uploaded-module'||f.alarmMode==='candidate-module'&&f.gateReached||f.alarmMode==='activation-completion-module'&&f.activations.length)result.modules[0].content_base64=Buffer.from(x.script).toString('base64');
     if(mode==='qa-uploaded-module')result.modules[0].content_base64=Buffer.from('export default{};').toString('base64');
     if(mode==='literal-secret'||f.alarmMode==='candidate-secret'&&f.gateReached)result.bindings.find(b=>b.type==='secret_text').text='SYNTHETIC_SHOULD_NEVER_PERSIST';
     if(mode==='new-resource'||f.alarmMode==='candidate-resource'&&f.gateReached)result.bindings.find(b=>b.name==='AFW_FINITE_TRIAL_CONTROL').namespace_id='f'.repeat(32);
     if(mode==='new-class')result.exports.NewClass={type:'durable-object',storage:'sqlite'};
     if(mode==='new-migration')result.migrations=[];
     if(mode==='enabled-cache')result.exports.default.cache={enabled:true};
    }
    else if(f.phaseCurrent&&req.url===CF+'/workers/workers/agent-friendly-web-delegated-canary/versions/'+f.phaseCurrent.receipt.versionId+'?include=modules'){result={...structuredClone(f.phaseCurrent.configuration),id:f.phaseCurrent.receipt.versionId,urls:[],modules:structuredClone(f.uploaded.modules)};if(f.phaseFault==='module')result.modules[0].content_base64='AAAA';if(f.phaseFault==='configuration')result.bindings.find(b=>b.name==='ACCESS_AUD').text='SYN drift';if(f.phaseFault==='later')result.bindings.find(b=>b.name==='AFW_DOSSIER_MONITORING_OWNER_ENABLED').text='true';if(f.phaseFault==='empty-private'||f.phaseFault==='placeholder-private'){result.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY').text=f.phaseFault==='empty-private'?'':'SYNTHETIC-PRIVATE-AFW_DOSSIER_EVENTS_POLICY';result.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_ENABLED').text='true';}}
    else{assert.equal(req.method,'GET');assert.equal(req.url,CF+'/workers/workers/agent-friendly-web-delegated-canary/versions/2607abae-cec3-4e35-89eb-8b8572262b54?include=modules');result=structuredClone(x.metadata);f.baselineReads++;if(f.gateMode==='history'&&f.uploads.length>0)result.modules[0].content_base64=Buffer.from('SYN drift').toString('base64');
@@ -175,27 +189,31 @@
     if(role==='publisher')f.publisherReads++;
     if(mode==='publisher-revoked-before-send'&&role==='publisher'&&f.publisherReads>=3)result.status='disabled';
     if(mode===role+'-wrong-id')result.id='0'.repeat(32);
     if(mode===role+'-inactive')result.status='disabled';
     if(mode===role+'-expired')result.expires_on=new Date(Date.now()-1).toISOString();
     if(mode===role+'-not-before')result.not_before=new Date(Date.now()+60000).toISOString();
    }
    value={success:true,errors:[],messages:[],result};
   }
   return Response.json(value,{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString(),'x-ratelimit-remaining':'60'}});
- }});
+ }};
+ if(mode.startsWith('phase-context-sdk')){finalOptions=await finiteOwnerSdkWorkers(finalOptions,{observed:mode.startsWith('phase-context-sdk-observed')});f.sdkProfiles=Object.fromEntries(finalOptions.workers.map(worker=>[worker.name,{compatibilityDate:worker.compatibilityDate,compatibilityFlags:worker.compatibilityFlags}]));console.info('D02 actual Miniflare SDK profiles',JSON.stringify(f.sdkProfiles));}
+ finalOptions=convertV4MiniflareOptions(finalOptions);
  await mf.setOptions(finalOptions);
- const bindings=await mf.getBindings();f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB');
- if(mode.startsWith('phase-context')){try{if(mode==='phase-context-init-failure')throw Error('SYN phase fixture initialization failed');await seedFiniteOwnerPhaseHistory(f.db,x,seedInitialHistory);for(const sql of FINITE_PREPARATION_ISSUER_SCHEMA)await f.db.prepare(sql).run();}catch(error){await mf.dispose();error.fixtureDisposed=true;throw error;}}else await seedInitialHistory(f.db,x);await f.stub.seed(x.rows);f.resident=resident;
+ const bindings=await mf.getBindings(mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB',mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);
+ if(mode.startsWith('phase-context-sdk'))console.info('D02 native identity comparison',JSON.stringify({provisionalWorker:base.name,finalWorker:'qa-sdk',original:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString()===x.ids.original,candidate:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1').toString()===x.ids.candidate}));
+ if(mode.startsWith('phase-context')){try{if(mode==='phase-context-init-failure')throw Error('SYN phase fixture initialization failed');await seedFiniteOwnerPhaseHistory(f.db,x,seedInitialHistory);for(const sql of FINITE_PREPARATION_ISSUER_SCHEMA)await f.db.prepare(sql).run();}catch(error){await disposeFailedInitialization();error.fixtureDisposed=true;throw error;}}else await seedInitialHistory(f.db,x);await f.stub.seed(x.rows);f.resident=resident;
  if(mode==='invalid-owned-revision')await f.db.prepare('UPDATE site_projects SET revision=0').run();
  if(mode==='wrong-owned-subject')await f.db.prepare("UPDATE site_projects SET user_id='another-owner'").run();
  f.namespace=bindings.AFW_INDEPENDENT_CLOSURE;
  f.workflow=async refs=>(await f.mf.dispatchFetch('https://synthetic.invalid/workflow',{method:'POST',body:J(refs)})).json();
- f.restart=async()=>{assert.ok(persist);await f.mf.dispose();f.mf=new Miniflare(finalOptions);const b=await f.mf.getBindings();f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));};
+ f.restart=async()=>{assert.ok(persist);await f.mf.dispose();f.mf=new Miniflare(finalOptions);const b=await f.mf.getBindings(mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);if(mode.startsWith('phase-context-sdk'))f.db=await f.mf.getD1Database('RELEASE_DB','qa-sdk');f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));};
  f.alarmAt=async at=>{f.nowOffset=at-Date.now();try{return await f.stub.initialAlarmAt(at);}finally{f.nowOffset=0;}};
  f.ownerRead=async(delta=400000,...args)=>{const rows=await f.stub.snapshot();let raw;try{raw=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-preparation.v1:capsule')[1]);}finally{rows[Symbol.dispose]?.();}f.nowOffset=raw.I0+delta-Date.now();try{return await f.stub.ownerSourceRead(delta,...args);}finally{f.nowOffset=0;}};
  f.future=async(kind='complete')=>{await f.stub.seedFutureActivation(kind);const rows=await f.stub.snapshot(),plan=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]);f.activationAnnotation='afw-finite-initial-activate-'+plan.recordHash;f.pointerMode='candidate';return plan;};
  f.cleanup=async()=>{if(persist){assert.ok(resolve(persist).startsWith(resolve(tmpdir())+'/afw-entry-restart-'));await rm(persist,{recursive:true,force:true});}};
- f.enrollmentToken=async source=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject('owner').setIssuer('https://'+source.access.teamDomain).setAudience(source.access.audience).setIssuedAt().setExpirationTime(Math.floor((Date.now()+3600000)/1000)).sign(privateKey);
+ f.enrollmentToken=async (source,expiresAt=Math.floor((Date.now()+3600000)/1000))=>new SignJWT({email:'SYN@example.invalid'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setSubject('owner').setIssuer('https://'+source.access.teamDomain).setAudience(source.access.audience).setIssuedAt().setExpirationTime(expiresAt).sign(privateKey);
  f.refs={commandId:COMMAND,sourceRevision:M,qaVersionId:UUID,initialInstanceId:'afw-finite-initial-'+initialHash('afw.finite-initial-instance.v1',{operation:'finite_initial_preparation',commandId:COMMAND,sourceRevision:M,qaVersionId:UUID}),workflowName:'afw-own-qa-private-bootstrap',createdAt:mode==='partial'?Date.now()-29700:mode==='upload-partial'?Date.now()-27000:Date.now()};
  return f;
+ }catch(error){await disposeFailedInitialization();throw error;}
 }
```

### test/fixtures/finite-owner-qa-sdk.mjs

```diff
diff --git a/test/fixtures/finite-owner-qa-sdk.mjs b/test/fixtures/finite-owner-qa-sdk.mjs
@@ -0,0 +1,119 @@
+import {build} from 'esbuild';
+import {createHash} from 'node:crypto';
+import {readFile} from 'node:fs/promises';
+import {finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
+// SYN fixture composition only. Actual source/SDK/journals/Unit2a modules remain.
+export function extendFiniteOwnerQaSdk(entry,{observed=false}={}){
+ const imports=`import {sealFiniteOwnerIssuerProvenanceRecord as sdkSeal,encodeFiniteOwnerIssuerProvenanceRecord as sdkEncode} from './lib/mcp-qa-finite-owner-issuer-provenance-records.mjs';\nimport {createPrivateQaFiniteOwnerOAuthReceiver} from './lib/mcp-qa-finite-owner-oauth-qa.mjs';\n`;
+ let methods=`
+ async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}
+ async sdkObservation(){return {queue:this.sdkQueue??null,signals:this.sdkSignals??null,leaseSignals:globalThis.__d02QaSignals??null,held:!!this.sdkRelease,probes:globalThis.__d02Probes??[],primary:this.sdkPrimary??[],rows:[...await this.ctx.storage.list({prefix:'afw.finite-owner-issuer-provenance.v1:'})],calls:this.sdkCalls??[]};}
+ async sdkConfigure(mode='normal'){
+  globalThis.__d02Probes=[];
+
+  const kv=this.env.AFW_FINITE_OWNER_OAUTH_KV;this.sdkCalls=[];this.sdkMode=mode;this.sdkRelease=null;this.sdkRestore?.();
+  const methods={get:kv.get,put:kv.put,delete:kv.delete,list:kv.list};this.sdkRestore=()=>{for(const key of Object.keys(methods))kv[key]=methods[key];};
+  for(const key of Object.keys(methods))kv[key]=async(...args)=>{
+   const call={method:key,prefix:String(args[0]).split(':')[0]};this.sdkCalls.push(call);
+   if(key==='put'&&String(args[0]).startsWith('grant:'))call.actualGrantAck=[...await this.ctx.storage.list({prefix:'afw.finite-preparation-issuer.v1:'})].some(([k])=>k.endsWith(':grant:ack'));
+   if(this.sdkMode==='stale'&&key==='get'&&String(args[0]).startsWith('transaction:'))return null;
+   if(key==='list')throw Error('SYN prohibited SDK list');
+   if(this.sdkMode==='miss'&&key==='get'&&String(args[0]).startsWith('client:'))return null;
+   if(this.sdkMode==='error'&&key==='get')throw Error('SYN KV error');
+   const actual=Reflect.apply(methods[key],kv,args);
+   if(this.sdkMode==='hold-'+key){this.sdkMode='held';return actual.then(value=>new Promise(resolve=>{this.sdkRelease=()=>resolve(value);}));}
+   return actual;
+  };
+ }
+ async sdkCorrupt(kind){
+  const rows=[...await this.ctx.storage.list()],capsule=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]),id=capsule.preconnectionId,sp='afw.finite-owner-issuer-provenance.v1:'+id+':',ip='afw.finite-preparation-issuer.v1:'+id+':';
+  if(kind==='sdk-extra')await this.ctx.storage.put(sp+'unknown','SYN forbidden extra');
+  else if(kind==='sdk-observed'){const send=JSON.parse(await this.ctx.storage.get(sp+'sdk_begin:send'));await this.ctx.storage.put(sp+'sdk_begin:observed',sdkEncode('SdkObserved',sdkSeal('SdkObserved',{purpose:'afw.finite-owner-sdk-observed.v1',sendHash:send.recordHash,resultHash:'f'.repeat(64),observedAt:Date.now(),outcome:'resolved'})));}
+  else if(kind==='issuer-extra')await this.ctx.storage.put(ip+'unknown','SYN forbidden extra');
+  else if(kind==='issuer-freeze'){const r=JSON.parse(await this.ctx.storage.get(ip+'reservation'));await this.ctx.storage.put(ip+'freeze',phaseEncodeIssuer('Freeze',phaseSealIssuer('Freeze',{purpose:'afw.finite-preparation-issuer-freeze.v1',identityHash:r.identity.identityHash,reservationHash:r.recordHash,frozenAt:Date.now()})));}
+  else if(kind==='policy-send'){const ack=rows.find(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':ack'));if(!ack)throw Error('SYN policy ACK missing');await this.ctx.storage.delete(ack[0]);}
+  else if(kind==='absent-schema')await this.env.RELEASE_DB.prepare('DROP TABLE finite_preparation_issuer_fences').run();
+  else throw Error('SYN unknown fault');await this.ctx.storage.sync();
+ }
+ async sdkGrants(){return (await this.env.RELEASE_DB.prepare('SELECT * FROM delegated_access_grants ORDER BY id').all()).results;}
+ async sdkGrant(id){if(!/^[a-f0-9-]{36}$/.test(id))throw Error('SYN UUID');return this.env.RELEASE_DB.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(id).first();}
+ async sdkReplaceHolder(){const kv=this.env.AFW_FINITE_OWNER_OAUTH_KV,original=kv.get;kv.get=(...args)=>Reflect.apply(original,kv,args);}
+ async sdkAliasAbsent(absent){if(absent){this.sdkAlias=this.env.AFW_FINITE_OWNER_OAUTH_KV;this.env.AFW_FINITE_OWNER_OAUTH_KV=undefined;}else this.env.AFW_FINITE_OWNER_OAUTH_KV=this.sdkAlias;}
+ async sdkPrimaryObserve(){
+  this.sdkPrimary=[];const db=this.env.RELEASE_DB,original=db.withSession;
+  db.withSession=constraint=>{const session=Reflect.apply(original,db,[constraint]),prepare=session.prepare,queries=[];this.sdkPrimary.push({constraint,queries});session.prepare=sql=>{queries.push(sql);const statement=Reflect.apply(prepare,session,[sql]);
+   if(this.sdkMode==='queue-grant'&&sql.includes('INSERT INTO delegated_access_grants')||this.sdkMode==='queue-open'&&sql.includes('INSERT INTO finite_preparation_issuer_fences')){
+    this.sdkMode='queued';const seen=this.sdkQueue={entered:false,returned:false,rowAbsent:null};return {bind(...args){const bound=statement.bind(...args);return {async first(){seen.entered=true;await new Promise(resolve=>setTimeout(resolve,5100));const row=await bound.first();seen.returned=true;seen.rowAbsent=row===null;return row;}};}};
+   }return statement;};return session;};
+ }
+ async sdkOldPath(path,headers={},body=''){
+  if(!['/read-grant','/sdk-completed','/sdk-complete','/sdk-begin','/sdk-approve'].includes(path))throw Error('SYN path');
+  const h=new Headers(headers),at=Date.now();h.set('x-afw-finite-boundary',JSON.stringify({startedAt:at,deadline:at+30000,remainingMs:30000}));h.set('x-afw-finite-original-method','POST');h.set('x-afw-finite-original-url','https://delegated-canary.agentfriendlyweb.dev/authorize');h.set('x-afw-finite-version','77777777-7777-4777-8777-777777777777');h.set('x-afw-finite-request-id','77777777-7777-4777-8777-777777777777');
+  const response=await createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(new Request('https://afw-private.invalid/_finite-owner'+path,{method:'POST',headers:h,body}));await response.body?.cancel();return response.status;
+ }
+ async sdkReleaseHeld(){this.sdkRelease?.();this.sdkRelease=null;}
+ async sdkReadCurrent(){
+  const parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/authorize'));
+  try{return await readPrivateQaFiniteOwnerContext({ctx:this.ctx,env:this.env,parent:parent.lease});}catch{return {status:'unavailable'};}finally{parent.finish();}
+ }
+`;
+ if(observed)methods=methods.replace("async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}", "async fetch(request){this.sdkSignals={entryAborted:request.signal.aborted,abortObserved:false,settled:false,settledAborted:null};const seen=this.sdkSignals;request.signal.addEventListener('abort',()=>{seen.abortObserved=true;},{once:true});try{return await createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}finally{seen.settled=true;seen.settledAborted=request.signal.aborted;}}");
+ // Ticket fixture is external SYN approval DATA, generated through genuine store.
+ // It must match a real bounded preparation cookie, never a positive source alias.
+ const old="ticketHash='7'.repeat(64)",replacement="ticketHash=phaseRawSha('a'.repeat(64))";
+ if(!entry.includes(old))throw Error('SYN exact phase seed changed');
+ return imports+entry.replace(old,replacement).replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
+}
+export async function finiteOwnerSdkWorkers(qa,{observed=false}={}){
+ const mProfile=finiteWranglerProfileTemplate('canaryLive');let outgoingInstrumentations=0;
+ let source=`import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
+ import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
+ export default{async fetch(request,env,ctx){const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}}};`;
+ if(observed)source=source.replace("export default{async fetch(request,env,ctx){const root=",`let active,activeRoot,delay=0;export default{async fetch(request,env,ctx){const path=new URL(request.url).pathname;if(path==='/fixture/signal-state')return Response.json(globalThis.__d02M??{});if(path==='/fixture/abort'){active?.abort();return new Response(null,{status:204});}if(path==='/fixture/abort-root'){activeRoot?.finish();return new Response(null,{status:204});}if(path==='/fixture/elapsed'){delay=29000;return new Response(null,{status:204});}const seen=globalThis.__d02M={incomingEntryAborted:request.signal.aborted,incomingAbortObserved:false,rootAbortObserved:false};request.signal.addEventListener('abort',()=>{seen.incomingAbortObserved=true;},{once:true});const control=new AbortController();request.signal.addEventListener('abort',()=>control.abort(),{once:true});request=new Request(request,{signal:control.signal});active=control;const root=`).replace("try{return await forward", "activeRoot=root;globalThis.__d02M.rootEntryAborted=root.lease.signal.aborted;root.lease.signal.addEventListener('abort',()=>{globalThis.__d02M.rootAbortObserved=true;},{once:true});try{const elapsed=delay;delay=0;if(elapsed)await new Promise(resolve=>setTimeout(resolve,elapsed));return await forward").replace("finally{root.finish();}", "finally{root.finish();if(active===control)active=null;if(activeRoot===root)activeRoot=null;}");
+ const plugins=observed?[{name:'SYN-signal-observation',setup(b){b.onLoad({filter:/mcp-qa-finite-owner-oauth-forward\.mjs$/},async args=>{
+  outgoingInstrumentations++;let contents=await readFile(args.path,'utf8');const needle="const response=await Reflect.apply(fetcher,stub,[new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]);check();";
+  if(contents.split(needle).length!==2)throw Error('SYN outgoing observation changed');
+  contents=contents.replace(needle,"const outgoing=new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});globalThis.__d02M.outgoingEntryAborted=outgoing.signal.aborted;globalThis.__d02M.outgoingAbortObserved=false;outgoing.signal.addEventListener('abort',()=>{globalThis.__d02M.outgoingAbortObserved=true;},{once:true});const response=await Reflect.apply(fetcher,stub,[outgoing]);check();");
+  return {contents,loader:'js'};
+ });}}]:[];
+ const built=await build({plugins,stdin:{contents:source,resolveDir:process.cwd()},bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*']});
+ if(observed&&outgoingInstrumentations!==1)throw Error('SYN outgoing observer not installed exactly once');
+ console.info('D02 fixture M compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:createHash('sha256').update(built.outputFiles[0].contents).digest('hex'),inputs:Object.keys(built.metafile.inputs).length}));
+ return {...(qa.resourcePersistencePath?{resourcePersistencePath:qa.resourcePersistencePath}:{}),workers:[{...qa,name:'qa-sdk'},{
+  name:'m-sdk',modules:true,script:built.outputFiles[0].text,compatibilityDate:mProfile.compatibility_date,compatibilityFlags:mProfile.compatibility_flags,
+  kvNamespaces:{OAUTH_KV:'finite-sdk-shared'},
+  bindings:{AFW_FINITE_TRIAL_VERSION:{id:'77777777-7777-4777-8777-777777777777'}},
+  durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'Initial',scriptName:'qa-sdk',useSQLite:true,uniqueKey:'initial-c2a'}}
+ }].reverse()};
+}
+export async function seedFiniteOwnerSdkClient(mf,source){
+ const kv=await mf.getKVNamespace('OAUTH_KV','m-sdk');
+ await kv.put('client:'+source.clientId,JSON.stringify({clientId:source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN native client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));
+}
+
+/** Fixed read-only observation in the same genuine request scope, used only in
+ * hostile fixtures. No witness/root/source result leaves the lexical stack. */
+export function instrumentFiniteOwnerQaSdk(source){
+ const once=(needle,replacement)=>{if(source.split(needle).length!==2)throw Error('SYN observation point changed');source=source.replace(needle,replacement);};
+ once("onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});","globalThis.__d02QaSignals={entryAborted:originalLease.signal.aborted,abortObserved:false,sdkSettledAborted:null};const signalSeen=globalThis.__d02QaSignals;onAbort=()=>{signalSeen.abortObserved=true;clock.close();};originalLease.signal.addEventListener('abort',onAbort,{once:true});");
+ once("actualPromise=retain(Promise.resolve().then(()=>{check();return call();}));position='sdk-pending';","actualPromise=retain(Promise.resolve().then(()=>{check();return call();}).then(value=>{signalSeen.sdkSettledAborted=originalLease.signal.aborted;return value;}));position='sdk-pending';");
+ const probe=kind=>`let strictUnavailable=false;try{await readPrivateQaFiniteOwnerContext({ctx,env,parent:originalLease});}catch{strictUnavailable=true;}(globalThis.__d02Probes??=[]).push({kind:'${kind}',op,strictUnavailable});`;
+ once("await sdkAppend('SdkSend',send,op);await recheckOwned();check();","await sdkAppend('SdkSend',send,op);"+probe('sdk')+"await recheckOwned();check();");
+ once("await issuerAppend('Send',send,op);await recheckOwned();check();","await issuerAppend('Send',send,op);"+probe('issuer')+"await recheckOwned();check();");
+ once("if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();","if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();(globalThis.__d02Probes??=[]).push({kind:'consumption',sameChild:consumptionChild===l,sameStore:consumptionStore===store,remainingMs:w.deadline-Date.now(),windowMs:w.deadline-w.startedAt});");
+ return source;
+}
+
+/** Read-only audit of this test's actual SDK1.2.1 encrypted grant. This public
+ * wrapping constant and HMAC/AES-KW/AES-GCM format are from pinned
+ * cloudflare/workers-oauth-provider v1.2.1 src/oauth-provider.ts:6334-6408.
+ * No token exchange, SDK substitute, code logging or production key access. */
+export async function readSyntheticIssuedGrantProps(code,grant){
+ const publicWrappingConstant=new Uint8Array([0x22,0x7e,0x26,0x86,0x8d,0xf1,0xe1,0x6d,0x80,0x70,0xea,0x17,0x97,0x5b,0x47,0xa6,0x82,0x18,0xfa,0x87,0x28,0xae,0xde,0x85,0xb5,0x1d,0x4a,0xd9,0x96,0xca,0xca,0x43]);
+ const hmac=await crypto.subtle.importKey('raw',publicWrappingConstant,{name:'HMAC',hash:'SHA-256'},false,['sign']);
+ const material=await crypto.subtle.sign('HMAC',hmac,new TextEncoder().encode(code));
+ const wrapping=await crypto.subtle.importKey('raw',material,{name:'AES-KW'},false,['unwrapKey']);
+ const key=await crypto.subtle.unwrapKey('raw',Buffer.from(grant.authCodeWrappedKey,'base64'),wrapping,{name:'AES-KW'},{name:'AES-GCM'},false,['decrypt']);
+ const bytes=await crypto.subtle.decrypt({name:'AES-GCM',iv:new Uint8Array(12)},key,Buffer.from(grant.encryptedProps,'base64'));
+ return JSON.parse(new TextDecoder().decode(bytes));
+}
```

### test/mcp-qa-finite-owner-qa-sdk-native.test.mjs

```diff
diff --git a/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs b/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
@@ -0,0 +1,242 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+
+// Missing-feature RED is deliberately separate from a native pending-operation
+// RED: absence of these modules does not claim that an SDK call was entered.
+async function feature(path,names){
+ const m=await import(path).catch(error=>{if(error.code==='ERR_MODULE_NOT_FOUND'&&error.message.includes(path.split('/').at(-1)))return {};throw error;});
+ for(const name of names)assert.equal(typeof m[name],'function','missing D0.2 helper: '+name);
+ return m;
+}
+test('D0.2 local resolved result has a strict domain and rejects the removed reported ACK',async()=>{
+ const {sealFiniteOwnerIssuerProvenanceRecord:seal,encodeFiniteOwnerIssuerProvenanceRecord:encode,decodeFiniteOwnerIssuerProvenanceRecord:decode}=await feature('../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs',['sealFiniteOwnerIssuerProvenanceRecord','encodeFiniteOwnerIssuerProvenanceRecord','decodeFiniteOwnerIssuerProvenanceRecord']);
+ const input={purpose:'afw.finite-owner-sdk-observed.v1',sendHash:'a'.repeat(64),resultHash:'b'.repeat(64),observedAt:100,outcome:'resolved'};
+ const record=seal('SdkObserved',input),raw=encode('SdkObserved',record);
+ assert.deepEqual(decode('SdkObserved',raw),record);
+ for(const extra of [{reported:true},{code:'never durable'},{operation:'sdk_complete'},{outcome:'reported'}])assert.throws(()=>seal('SdkObserved',{...input,...extra}));
+ assert.throws(()=>seal('SdkAck',input));
+ assert.throws(()=>decode('SdkObserved',raw+' '));
+ assert.throws(()=>seal('SdkObserved',Object.defineProperty({...input},'resultHash',{enumerable:true,get(){throw Error('accessor ran');}})),error=>!error.message.includes('accessor ran'));
+});
+test('D0.2 fixed original authorization grammar denies old result paths and payloads',async()=>{
+ const {qualifyFiniteOwnerOAuthRequest:qualify}=await feature('../lib/mcp-qa-finite-owner-oauth-wire.mjs',['qualifyFiniteOwnerOAuthRequest']);
+ const origin='https://delegated-canary.agentfriendlyweb.dev';
+ const url=origin+'/authorize?client_id=c&redirect_uri=https%3A%2F%2Fclient.example%2Fcb&response_type=code&resource='+encodeURIComponent(origin+'/mcp')+'&scope=afw%3Aproject%3Aread&state=s&code_challenge='+'a'.repeat(43)+'&code_challenge_method=S256';
+ const get=new Request(url);assert.equal(qualify(get,new Uint8Array()).method,'GET');
+ for(const path of ['/read-grant','/sdk-completed','/sdk-complete','/sdk-begin','/sdk-approve'])assert.throws(()=>qualify(new Request(origin+path),new Uint8Array()));
+ assert.throws(()=>qualify(new Request(url+'&resultHash='+'b'.repeat(64)),new Uint8Array()));
+ assert.throws(()=>qualify(new Request(url+'&client_id=c'),new Uint8Array()));
+ const headers={Origin:origin,'Content-Type':'application/x-www-form-urlencoded'};
+ const post=new Request(origin+'/authorize',{method:'POST',headers});
+ const form='handle='+'a'.repeat(43)+'&decision=approve&scope=afw%3Aproject%3Aread';
+ assert.equal(qualify(post,new TextEncoder().encode(form)).method,'POST');
+ for(const suffix of ['&sdkCompleted=true','&resultHash=x','&decision=approve'])assert.throws(()=>qualify(post,new TextEncoder().encode(form+suffix)));
+ assert.throws(()=>qualify(post,new Uint8Array(16385)));
+});
+
+test('strict local provenance records preserve exact bounded DATA-only fields',async()=>{
+ const {sealFiniteOwnerIssuerProvenanceRecord:seal,encodeFiniteOwnerIssuerProvenanceRecord:encode,decodeFiniteOwnerIssuerProvenanceRecord:decode}=await import('../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs');
+ const h='a'.repeat(64),uuid='11111111-1111-4111-8111-111111111111',I0=1000;
+ const values={
+  Root:{purpose:'afw.finite-owner-issuer-root.v1',preconnectionId:h,capsuleHash:h,enrollmentHash:h,sourceRevision:'a'.repeat(40),actorId:h,qaVersionId:uuid,mVersionId:uuid,originalConnectionReceiptHash:h,I0,C0:I0+900000,C1:I0+1080000,createdAt:I0},
+  SdkSend:{purpose:'afw.finite-owner-sdk-send.v1',rootHash:h,operation:'sdk_begin',originalRequestId:uuid,originalRequestHash:h,issuedAt:I0,deadline:I0+30000,bindingHash:h},
+  ExpectedGrant:{purpose:'afw.finite-owner-expected-grant.v1',rootHash:h,identityHash:h,reservationHash:h,authorizationHash:h,grantId:uuid,approvedRequestHash:h,scopes:['afw:project:read'],createdAt:'2026-11-05T00:00:00.000Z',expiresAt:'2026-11-05T00:01:00.000Z'}
+ };
+ for(const [kind,value]of Object.entries(values)){
+  const sealed=seal(kind,value),raw=encode(kind,sealed);assert.deepEqual(decode(kind,raw),sealed);
+  for(const bad of [{...value,extra:true},{...value,[Symbol('unknown')]:true},Object.assign(Object.create({}),value),Object.defineProperty({...value},'purpose',{enumerable:true,get(){throw Error('executed accessor');}})])assert.throws(()=>seal(kind,bad),e=>!e.message.includes('executed accessor'));
+  assert.throws(()=>decode(kind,raw+' '));assert.throws(()=>decode(kind,' '.repeat(16385)));
+ }
+ assert.throws(()=>seal('Root',{...values.Root,C0:values.Root.C0+1}));
+ assert.throws(()=>seal('SdkSend',{...values.SdkSend,operation:'sdk-completed'}));
+ assert.throws(()=>seal('SdkSend',{...values.SdkSend,deadline:I0+30001}));
+ assert.throws(()=>seal('ExpectedGrant',{...values.ExpectedGrant,grantId:'substitute'}));
+ assert.throws(()=>seal('ExpectedGrant',{...values.ExpectedGrant,scopes:['afw:write']}));
+});
+
+test('legacy pair predicate rejects expiry with its original 503 status',async()=>{
+ const {qualifyFiniteOwnerConnectionPair:qualify}=await import('../lib/mcp-qa-finite-owner-approved-ticket-facts.mjs');
+ const {createHash}=await import('node:crypto'),h='a'.repeat(64),ref='b'.repeat(64),grantId='11111111-1111-4111-8111-111111111111',grantHash=createHash('sha256').update(grantId).digest('hex'),resource='https://delegated-canary.agentfriendlyweb.dev/mcp';
+ const value={source:{clientId:'client',resource,project:{projectId:'project'}},identity:{subject:'owner'},pre:{preconnectionId:h,expiresAt:2000,owner:{accessExpiresAt:2000}},link:{grantHash,acceptedAt:1000},grant:{grantId,expiresAt:'1970-01-01T00:00:02.000Z'},relation:{preconnectionId:h,connectionRef:ref,grantHash,linkedAt:1000},connection:{connectionRef:ref,subject:'owner',grantId,clientId:'client',projectId:'project',resource,issuedAt:1000,expiresAt:2000},observedAt:1500};
+ assert.doesNotThrow(()=>qualify(value));
+ assert.throws(()=>qualify({...value,observedAt:2000}),error=>error.status===503);
+});
+
+import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
+import {seedFiniteOwnerSdkClient,readSyntheticIssuedGrantProps} from './fixtures/finite-owner-qa-sdk.mjs';
+async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r?.[Symbol.dispose]?.();}}
+
+const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
+async function world(fn,{observed=true,restart=false}={}){
+ const f=await initialEntryHarness('phase-context-sdk'+(observed?'-observed':'')+(restart?'-restart':''));
+ try{
+  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
+  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined,JSON.stringify(f.phaseCurrent));
+  const context=await plain(f.stub.sdkReadCurrent());assert.equal(context.source?.phase,'read_consent');
+  f.source=context.source;f.token=await f.enrollmentToken(f.source);f.headers={'Cf-Access-Jwt-Assertion':f.token,Cookie:PREP};
+  await seedFiniteOwnerSdkClient(f.mf,f.source);
+  f.query=new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:'a'.repeat(43),code_challenge_method:'S256'});
+  f.timings={};f.get=async extra=>{const start=Date.now();try{return await f.mf.dispatchFetch(f.source.origin+'/authorize?'+f.query,{redirect:'manual',headers:{...f.headers,...extra}});}finally{f.timings.get=Date.now()-start;}};
+  f.post=async (form,extra={})=>{const start=Date.now();try{return await f.mf.dispatchFetch(f.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',...f.headers,Cookie:PREP+'; '+form.cookie,...extra},body:new URLSearchParams({handle:form.handle,decision:'approve',scope:'afw:project:read'})});}finally{f.timings.post=Date.now()-start;}};
+  f.history=await plain(f.stub.sdkGrants());
+  if(observed){await f.stub.sdkConfigure();await f.stub.sdkPrimaryObserve();}
+  await fn(f);
+  const after=await plain(f.stub.sdkGrants());
+  for(const row of f.history)assert.deepEqual(after.find(r=>r.id===row.id),row,'original historical D1 grant unchanged');
+ }finally{await f.stub.sdkReleaseHeld().catch(()=>{});await f.mf.dispose();await f.cleanup();}
+}
+async function consent(f){
+ const response=await f.get();assert.equal(response.status,200);
+ const html=await response.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
+ const cookie=response.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
+ const rows=await plain(f.stub.snapshot()),reservation=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]);
+ assert.equal(await plain(f.stub.sdkGrant(reservation.identity.grantId)),null);
+ return {handle,cookie,identity:reservation.identity};
+}
+async function status(p){const r=await p;await r.body?.cancel();return r.status;}
+async function observe(f){return plain(f.stub.sdkObservation());}
+async function held(f){for(let n=0;n<200;n++){const state=await observe(f);if(state.held)return state;await new Promise(r=>setTimeout(r,20));}assert.fail('actual SDK KV hold did not enter');}
+function has(s,suffix){return s.rows.some(([key])=>key.endsWith(suffix));}
+async function oldPaths(f,form={handle:'a'.repeat(43),cookie:'SYN'}){
+ const before=await observe(f),rows=await plain(f.stub.snapshot()),grants=await plain(f.stub.sdkGrants());
+ for(const path of ['/read-grant','/sdk-completed','/sdk-complete','/sdk-begin','/sdk-approve']){
+  assert.equal(await f.stub.sdkOldPath(path,{...f.headers,Cookie:PREP+'; '+form.cookie},JSON.stringify({handle:form.handle,resultHash:'a'.repeat(64),sdkCompleted:true})),404);
+  assert.equal(await status(f.mf.dispatchFetch(f.source.origin+path,{method:'POST',headers:f.headers,body:'resultHash='+ 'b'.repeat(64)})),503);
+ }
+ assert.deepEqual(await plain(f.stub.snapshot()),rows);assert.deepEqual(await plain(f.stub.sdkGrants()),grants);const after=await observe(f);assert.deepEqual(after.rows,before.rows);assert.deepEqual(after.calls,before.calls);assert.deepEqual(after.probes,before.probes);
+}
+async function issued(f,form,response){
+ assert.equal(response.status,302);const code=new URL(response.headers.get('Location')).searchParams.get('code');assert(code);
+ const app=await plain(f.stub.sdkGrant(form.identity.grantId));
+ assert.equal(app.id,form.identity.grantId);assert.equal(app.revoked_at,'');
+ const [subject,sdkId]=code.split(':'),kv=await f.mf.getKVNamespace('OAUTH_KV','m-sdk'),grant=await kv.get('grant:'+subject+':'+sdkId,{type:'json'});
+ assert(grant,'M fixture alias observes actual SDK grant');assert.equal(grant.userId,form.identity.subject);assert.equal(grant.clientId,form.identity.clientId);assert.equal(grant.resource,form.identity.resource);assert.deepEqual(grant.scope,['afw:project:read']);assert(grant.encryptedProps);assert(grant.authCodeId);
+ assert.deepEqual(await readSyntheticIssuedGrantProps(code,grant),{applicationGrantId:form.identity.grantId,userId:form.identity.subject,projectId:form.identity.projectId});
+ const final=await observe(f);assert(has(final,'sdk_complete:observed'));assert.equal(final.rows.length,8);
+ const journal=await plain(f.stub.snapshot()),read=suffix=>JSON.parse(journal.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(suffix))[1]),consume=read(':consume:send'),ack=read(':grant:ack');assert(ack.observedAt<consume.deadline);console.info('D02 native timing',JSON.stringify({...f.timings,consumeSendToGrantAckMs:ack.observedAt-consume.issuedAt,childRemainingAtGrantAckMs:consume.deadline-ack.observedAt,consumeIssuedAt:consume.issuedAt,grantAckObservedAt:ack.observedAt,mockedProviderGetObservations:(f.observationTimes??[]).filter(v=>v.kind==='provider'&&v.method==='GET'&&v.at>=consume.issuedAt&&v.at<=ack.observedAt).length,mockedLedgerGetObservations:(f.observationTimes??[]).filter(v=>v.kind==='ledger'&&v.method==='GET'&&v.at>=consume.issuedAt&&v.at<=ack.observedAt).length}));
+ return {app,code,sdkId,grant};
+}
+test('uninstrumented actual native source/SDK/Unit2a GET POST returns one original grant and code',()=>world(async f=>{
+ await oldPaths(f);
+ const form=await consent(f),racing=await Promise.all([f.post(form),f.post(form)]);assert.deepEqual(racing.map(r=>r.status).sort(),[302,503]);const winner=await issued(f,form,racing.find(r=>r.status===302));await racing.find(r=>r.status===503).body?.cancel();
+ const before=await plain(f.stub.snapshot());
+ assert.equal(await status(f.post(form)),503);assert.equal(await status(f.get()),503);
+ assert.deepEqual(await plain(f.stub.snapshot()),before);
+ assert.deepEqual(await plain(f.stub.sdkGrant(form.identity.grantId)),winner.app);
+ assert.equal((await observe(f)).calls.length,0,'positive uses unwrapped native KV methods');
+},{observed:false}));
+test('held actual approve denies fabricated results and concurrent complete bearer replay; one original winner',()=>world(async f=>{
+ const form=await consent(f);await f.stub.sdkConfigure('hold-get');const pending=f.post(form);
+ let s=await held(f);assert(has(s,'sdk_approve:send'));assert(!has(s,'sdk_approve:observed'));assert(!has(s,'sdk_complete:send'));
+ assert.equal(await plain(f.stub.sdkGrant(form.identity.grantId)),null);
+ await oldPaths(f,form);assert.equal(await status(f.post(form)),503);
+ assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
+ await f.stub.sdkReleaseHeld();await issued(f,form,await pending);
+ s=await observe(f);assert(s.calls.some(c=>c.method==='get'&&c.prefix==='transaction'));assert(s.calls.filter(c=>c.method==='put'&&c.prefix==='grant').every(c=>c.actualGrantAck));assert.equal(s.calls.filter(c=>c.method==='put'&&c.prefix==='grant').length,1);assert.equal(s.calls.filter(c=>c.method==='list').length,0);assert(s.calls.every(c=>c.method==='get'&&['client','transaction'].includes(c.prefix)||c.method==='put'&&c.prefix==='grant'||c.method==='delete'&&c.prefix==='transaction'),'no other SDK grant/token mutation');
+ for(const p of s.probes.filter(p=>p.strictUnavailable!==undefined))assert.equal(p.strictUnavailable,true,'strict public reader denied same ambient unresolved SEND');
+ for(const op of ['consume','grant'])assert(s.probes.some(p=>p.kind==='issuer'&&p.op===op&&p.strictUnavailable));for(const op of ['sdk_approve','sdk_complete'])assert(s.probes.some(p=>p.kind==='sdk'&&p.op===op&&p.strictUnavailable));
+ const consumed=s.probes.find(p=>p.kind==='consumption');assert(consumed.sameStore&&consumed.sameChild);assert(consumed.windowMs<=5000&&consumed.remainingMs>0);
+ const writes=[];let readCount=0;for(const session of s.primary){assert.equal(session.constraint,'first-primary');if(session.queries.length>1){assert.equal(session.queries.length,8,'exact unchanged Unit2a preflight');assert.equal(session.queries[0],"SELECT type,name,sql FROM sqlite_schema WHERE tbl_name='finite_preparation_issuer_fences' AND type IN ('table','trigger') ORDER BY type,name");assert.match(session.queries[1],/^SELECT CAST\(unixepoch\('subsec'\)\*1000 AS INTEGER\) AS ms,/);for(const [index,table]of [[2,'delegated_consent_sessions'],[3,'delegated_access_grants'],[4,'site_projects']])assert(session.queries[index].startsWith('SELECT ')&&session.queries[index].endsWith(' FROM '+table+' LIMIT 0'));assert.deepEqual(session.queries.slice(5),['PRAGMA table_info(delegated_consent_sessions)','PRAGMA table_info(delegated_access_grants)','PRAGMA table_info(site_projects)']);continue;}const sql=session.queries[0];if(/^SELECT\b/i.test(sql)){readCount++;continue;}assert.match(sql,/^WITH q\(preconnection_id,authorization_hash,grant_id,enrollment_hash,identity_hash,/);assert(sql.includes("n(ms) AS (SELECT CAST(unixepoch('subsec')*1000 AS INTEGER))"));const kind=['INSERT INTO finite_preparation_issuer_fences','INSERT INTO delegated_consent_sessions','UPDATE delegated_consent_sessions AS c SET consumed_at=','INSERT INTO delegated_access_grants'].find(k=>sql.includes(k));assert(kind,'only exact original Unit2a atomic writer');writes.push(kind);}assert(readCount>20);assert.equal(new Set(writes).size,4);assert.equal(writes.length,4);
+}));
+test('missing actual SDK binding cookie denies copied public form before original consume',()=>world(async f=>{
+ const form=await consent(f);assert.equal(await status(f.post(form,{Cookie:PREP})),503);
+ const s=await observe(f);assert(has(s,'sdk_approve:send'));assert(!has(s,'sdk_approve:observed'));assert(!has(s,'sdk_complete:send'));
+ assert.equal(await plain(f.stub.sdkGrant(form.identity.grantId)),null);
+ assert.equal(await status(f.post(form)),503,'unknown approve claim cannot be retried with later credentials');
+}));
+test('stale actual native KV transaction remains unavailable and cannot allocate another attempt',()=>world(async f=>{
+ const form=await consent(f);await f.stub.sdkConfigure('stale');assert.equal(await status(f.post(form)),503);
+ const before=await observe(f);assert(has(before,'sdk_approve:send'));assert(!has(before,'sdk_approve:observed'));assert.equal(await status(f.post(form)),503);const after=await observe(f);assert.deepEqual(after.rows,before.rows);assert.deepEqual(after.calls,before.calls);assert.deepEqual(after.probes,before.probes);
+}));
+test('real KV client miss/error, wrong actual alias profile and missing holder deny before SDK claim',()=>world(async f=>{
+ const original=await plain(f.stub.snapshot());
+ for(const fault of ['sdk-alias','sdk-extra','qa-module']){f.ownerFault=fault;assert.equal(await status(f.get()),503,fault);assert.deepEqual(await plain(f.stub.snapshot()),original);}f.ownerFault=null;
+ await f.stub.sdkAliasAbsent(true);assert.equal(await status(f.get()),503);await f.stub.sdkAliasAbsent(false);
+ for(const mode of ['miss','error']){await f.stub.sdkConfigure(mode);assert.equal(await status(f.get()),503,mode);assert.deepEqual(await plain(f.stub.snapshot()),original);assert.equal((await observe(f)).rows.length,0);}
+}));
+test('actual begin native abort retains SDK uncertainty; late resolution creates no reservation or form',()=>world(async f=>{
+ await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);
+ assert(!has(await observe(f),'sdk_begin:observed'));await status(f.mf.dispatchFetch(f.source.origin+'/fixture/abort'));
+ assert.equal(await status(pending),503);assert.equal((await observe(f)).held,true);
+ assert.equal(await status(f.get()),503);await f.stub.sdkReleaseHeld();await new Promise(r=>setTimeout(r,100));
+ const s=await observe(f);assert(!has(s,'sdk_begin:observed'));assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')));
+ assert.equal(await status(f.get()),503,'unresolved original begin SEND never reissues');
+}));
+test('actual begin holder replacement while pending denies actual settled result',()=>world(async f=>{
+ await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);await f.stub.sdkReplaceHolder();await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);
+ assert(!has(await observe(f),'sdk_begin:observed'));assert.equal(await status(f.get()),503);
+}));
+test('held actual complete times out at original parent; late KV settlement and actor restart cannot ACK or reissue',{timeout:55000},()=>world(async f=>{
+ const form=await consent(f);await f.stub.sdkConfigure('hold-put');const start=Date.now(),pending=f.post(form);
+ const s=await held(f);assert(has(s,'sdk_complete:send'));assert(!has(s,'sdk_complete:observed'));assert(s.calls.some(c=>c.prefix==='grant'&&c.actualGrantAck));
+ await oldPaths(f,form);assert.equal(await status(f.post(form)),503);
+ assert.equal(await status(pending),503);assert(Date.now()-start<32000);assert.equal((await observe(f)).held,true);
+ const frozen=await plain(f.stub.snapshot());await f.stub.sdkReleaseHeld();await new Promise(r=>setTimeout(r,100));
+ assert.deepEqual(await plain(f.stub.snapshot()),frozen);assert(!has(await observe(f),'sdk_complete:observed'));
+ await f.restart();assert.equal(await status(f.post(form)),503);assert.deepEqual(await plain(f.stub.snapshot()),frozen);
+},{restart:true}));
+test('29 seconds of actual original request lifetime leaves at most one second for held SDK begin',{timeout:42000},()=>world(async f=>{
+ await f.stub.sdkConfigure('hold-put');await status(f.mf.dispatchFetch(f.source.origin+'/fixture/elapsed'));const start=Date.now(),pending=f.get();
+ const response=await pending;assert.equal(response.status,503);await response.body?.cancel();assert(Date.now()-start<32000);
+ const s=await observe(f);if(s.held){assert(!has(s,'sdk_begin:observed'));await f.stub.sdkReleaseHeld();await new Promise(r=>setTimeout(r,100));}
+ assert(!has(await observe(f),'sdk_begin:observed'));assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')));
+}));
+
+for(const boundary of ['controller','root-finish','dispatch-signal'])test('abort boundary diagnostic '+boundary,{timeout:45000},()=>world(async f=>{
+ await f.stub.sdkConfigure('hold-put');const control=new AbortController(),pending=(boundary==='dispatch-signal'?f.mf.dispatchFetch(f.source.origin+'/authorize?'+f.query,{redirect:'manual',headers:f.headers,signal:control.signal}):f.get()).then(async r=>({status:await status(Promise.resolve(r))}),()=>({rejected:true}));
+ await held(f);
+ if(boundary==='dispatch-signal')control.abort();else await status(f.mf.dispatchFetch(f.source.origin+(boundary==='controller'?'/fixture/abort':'/fixture/abort-root')));
+ await new Promise(r=>setTimeout(r,100));
+ const before=await observe(f),m=await (await f.mf.dispatchFetch(f.source.origin+'/fixture/signal-state')).json();
+ await f.stub.sdkReleaseHeld();const response=await pending;await new Promise(r=>setTimeout(r,100));const after=await observe(f);
+ for(const key of ['incomingEntryAborted','incomingAbortObserved','rootAbortObserved','rootEntryAborted','outgoingEntryAborted','outgoingAbortObserved'])assert.equal(typeof m[key],'boolean','missing actual signal observation '+key);
+ if(boundary!=='dispatch-signal'||m.incomingAbortObserved){assert.equal(m.rootAbortObserved,true);assert.equal(m.outgoingAbortObserved,true);assert.equal(before.signals.abortObserved,true);assert.equal(before.leaseSignals.abortObserved,true);assert.equal(after.leaseSignals.sdkSettledAborted,true);assert.equal(has(after,'sdk_begin:observed'),false,'actual native QA abort must deny late observed ACK');}
+ console.info('D02 abort boundary diagnostic',JSON.stringify({boundary,sender:m,qaBefore:before.signals,qaLeaseBefore:before.leaseSignals,qaAfter:after.signals,qaLeaseAfter:after.leaseSignals,response,lateObserved:has(after,'sdk_begin:observed'),profiles:f.sdkProfiles}));
+}));
+
+for(const snapshot of ['first','second'])test('actual current publication drift denies owned SDK result at '+snapshot+' observation',()=>world(async f=>{
+ await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);
+ if(snapshot==='first')f.phaseFault='configuration';else{f.phaseObservation=0;f.phaseDrift='configuration';}
+ await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);assert(!has(await observe(f),'sdk_begin:observed'));
+ assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')));
+}));
+test('actual verified owner expiry during held SDK begin cannot extend original access',()=>world(async f=>{
+ f.headers['Cf-Access-Jwt-Assertion']=await f.enrollmentToken(f.source,Math.floor(Date.now()/1000)+8);
+ await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);assert.equal(await status(pending),503);assert.equal((await observe(f)).held,true);
+ await f.stub.sdkReleaseHeld();await new Promise(r=>setTimeout(r,100));assert(!has(await observe(f),'sdk_begin:observed'));
+ assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')));
+}));
+
+for(const fault of ['sdk-extra','sdk-observed','issuer-extra','policy-send','backup','module','pointer','owner-revision'])test('owned begin recheck rejects actual foreign delta '+fault,()=>world(async f=>{
+ await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);
+ if(['sdk-extra','sdk-observed','issuer-extra','policy-send'].includes(fault))await f.stub.sdkCorrupt(fault);
+ else if(fault==='backup')await f.stub.phaseCorrupt('tamper-backup');
+ else if(fault==='module')f.phaseFault='module';
+ else {f.phaseObservation=0;f.phaseDrift=fault==='pointer'?'pointer':'revision';}
+ const before=await plain(f.stub.snapshot());await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);assert.deepEqual(await plain(f.stub.snapshot()),before,'actual SDK result cannot adopt foreign ledger facts');
+ assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation')));
+}));
+for(const fault of ['issuer-freeze','issuer-ack'])test('owned approve recheck rejects original issuer '+fault,()=>world(async f=>{
+ const form=await consent(f);await f.stub.sdkConfigure('hold-get');const pending=f.post(form);await held(f);
+ if(fault==='issuer-freeze')await f.stub.sdkCorrupt(fault);else await f.stub.phaseCorrupt(fault);
+ const before=await plain(f.stub.snapshot());await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await plain(f.stub.sdkGrant(form.identity.grantId)),null);assert(!has(await observe(f),'sdk_approve:observed'));
+}));
+for(const snapshot of ['first','second'])test('owned recheck still requires original CLOSED configuration in '+snapshot+' snapshot',()=>world(async f=>{
+ await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);
+ if(snapshot==='first')f.ownerFault='original-open';else{f.phaseObservation=0;f.phaseDrift='original-open';}
+ await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);assert(!has(await observe(f),'sdk_begin:observed'));
+}));
+test('absent original issuer schema denies handler before any actual SDK lookup or claim',()=>world(async f=>{
+ await f.stub.sdkCorrupt('absent-schema');assert.equal(await status(f.get()),503);const s=await observe(f);assert.equal(s.calls.length,0);assert.equal(s.rows.length,0);
+}));
+for(const operation of ['open','grant'])test('actual handler original child cannot authorize SQL queued beyond five seconds: '+operation,{timeout:35000},()=>world(async f=>{
+ const form=operation==='grant'?await consent(f):null;
+ await f.stub.sdkConfigure('queue-'+operation);
+ assert.equal(await status(form?f.post(form):f.get()),503);
+ let s;for(let n=0;n<100;n++){s=await observe(f);if(s.queue?.returned)break;await new Promise(r=>setTimeout(r,20));}
+ assert.equal(s.queue?.entered,true);assert.equal(s.queue?.returned,true);assert.equal(s.queue?.rowAbsent,true,'original SQL clock rejected actual delayed execution');
+ assert(!has(s,'sdk_complete:send'));
+ if(form){assert.equal(await plain(f.stub.sdkGrant(form.identity.grantId)),null);const rows=await plain(f.stub.snapshot());assert(rows.some(([k])=>k.endsWith(':consume:ack')));assert(!rows.some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':grant:ack')));}
+ else {assert(has(s,'sdk_begin:observed'));assert(!(await plain(f.stub.snapshot())).some(([k])=>k.endsWith(':authorization:ack')));}
+ const beforeCalls=s.calls.length;assert.equal(await status(form?f.post(form):f.get()),503);assert.equal((await observe(f)).calls.length,beforeCalls,'incomplete first GET/POST never restarts SDK');
+}));
```

## Root verified evidence and concerns for assessment

Root fetched logs of helper RED/GREEN, genuine pending-prefix RED42022171581, first native issuance42023202563, hostile8P3F42025070730, corrected signal diagnostic42026734064, full matrix32P1F42028096501, and final standard42032209747. Final selected and fixture correction logs are separately checked by root in this review handoff; report names precise revisions/commands and split-head limits. Report-code-only compare4148..d630 contains report+workflowdeletion only, no product/test differences.

DONE_WITH_CONCERNS: unmounted source scope, carrier-level Node dispatchFetch AbortSignal limitation, and high provider I/O before original child deadline. Root handled non-DONE report per handling-reports: these are explicitly unaccredited readiness/measurement limits, no request to waive correctness. Review on merits. Source report contains partial failed gates and all corrected causes; do not presume compiler itself failed where subsequent assertion was wrong. Existing shared anchors/Entry DATA dependencies remain permitted; effectful entry/decoder boundaries remain.

Independent pinned docs-only I/O audit (not a second task review) at ce516e327f58b29cd3392a1f4b754382a39e6b90, docs/superpowers/reports/2026-11-05-finite-sdk-child-io-feasibility.es.md: exact current code has112 serial provider GET and98 D1 API operations over WHOLE consume/grant child, while measured consumeSEND→grantACK timestamp spans84GET+78D1; timestamp precedes durableACK+lastrecheck. SYN timing not live SLA. All proposed optimizations INACTIVE, no source changes or tests from audit. Operational readiness/completePackage/PCoff remain false.

Root pure-link extraction ruling at fc823057c7c0b9dea584748b543e78b5f4d9755a, docs/superpowers/reviews/2026-11-05-finite-owner-sdk-d02-link-facts-ruling.md: pure DATA sharing allowed, original linker control flow/readback/status and genuinely-new GrantLink allocation gate preserved; no pure object replaces authority or actual I/O.
