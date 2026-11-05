# Finite owner I/O fanout — SOURCE qualification

5 November 2026. DONE_WITH_CONCERNS, pending ROOT's fresh independent spec/quality review. No next unit is activated.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (ID 1347578006); ENVIRONMENT GitHub source and isolated credential-free Actions; ORIGIN GitHub App; RESOURCE_TYPE branch/Git objects/Actions; RESOURCE_ID feat/finite-native-cleanup-20261101; ALLOWED_ACTION expected-head CAS source/test writes and bounded SYN qualification. Exact BASE 51c5db8e987755ccf2819ba861461916e0396943. Requirements: docs/superpowers/briefs/2026-11-05-finite-owner-io-fanout.md and root preflight at BASE. Historical design pin d630 is not the execution base; accepted D0.3 remains included.

Final code/test head 9ff0226c23a6a0c1b6a69921c60b7cadec56a72a, tree fb2f5c2f8437a4587ccf2dbfb5d72d47202c419f. The containing report commit/tree are supplied by the delivery CAS receipt, because this file cannot embed its own commit hash. That delivery only adds this report and removes .github/workflows/afw-owner-io-source.yml; qualified source/test bytes remain unchanged. Rollback scope is a reviewed revert of this branch's unit diff to BASE. No runtime rollback was needed or executed.

## Source change and scope

Only lib/mcp-qa-finite-owner-phase-context.mjs changes product behavior. Private verifyCredential retains the original one-token validation; fixed reader and publisher promises and their Promise.allSettled join are retained. Both must fulfill before descriptor reads. Private readQaPrimary retains QA pointer comparison, full module read/hash/validation and public configuration projection. Private readMPrimary retains current M pointer, capsule.activatedVersionId (not historical backup), complete configuration/module validation, original owned-project SELECT and current M metadata read. A retained fixed two-branch allSettled join requires both fulfilled, rechecks the same clock, then runs both original alias checks and returns the same physical DTO. Promise.resolve().then catches synchronous branch start failures. There is no generic pool, callback runner, exported intermediate capability, cache, batching, snapshot overlap or extra authority read.

The original request helper is byte-for-byte intact, including original GET origin/credentials/cache policy, status/header/Date/UTF-8/JSON/length checks, caps 8192/65536/4500000 and retained fetch/read/cancel lifecycle. Native SQL remains SELECT-first/new first-primary sessions and original UUID/store/child/witness. Product prefix before the old credentials block (15941 characters) and suffix beginning at const observed=await primary() (40294 characters) are identical to BASE; the entire schedule extraction is between those boundaries. No product imports, leases, stage-work, handler, public three-key DTO, journals, SDK result semantics or holders changed. Original factsA→primaryA→qualifyA→primaryB→factsB→qualifyB→compare and root≤30000/child≤5000 remain.

Final code/test scope:
- lib/mcp-qa-finite-owner-phase-context.mjs
- test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
- test/fixtures/finite-initial-entry-world.mjs
- test/fixtures/finite-owner-qa-sdk.mjs
- test/fixtures/finite-owner-io-fanout.mjs (new)
- test/fixtures/finite-owner-phase-context.mjs (explicit ROOT exception described below)

Sole writer; no subagents, reviewer, local clone/dependencies/tests/build, provider/AFW requests, production workflow, mount/alias installation, schema/resource/access/profile/date/flag/credential/OAuth/OTP/Entry/Max/main/merge changes. Local shell use was limited to skill-file reads.

## Genuine before/after evidence

The I/O-only mode uses the genuine accepted initial Entry/material/preparation, actual SDK1.2.1, native DO/KV/D1 and original grant/code. Normal response bytes and source results are not substituted. It does not wrap SDK/KV or invoke strict-reader probes; the old SDK-observed mode remains separate. D1 session observation only audits the original SQL. The independent uninstrumented original SDK positive remains.

The I/O trace begins inside the actual request callback before fetch and ends after its actual stream cancellation finally settles. It records only bounded fixed category/method/ordinal/branch/snapshot/timestamps/byte counts/outcome, maximum1024 entries; no URL/header/token/body/module/code/cookie or owner DATA. Exact-one source markers fail closed. The count is not outbound-service headers or a clock.child race. Successful order checks require both credential lifecycles complete before descriptors, original QA/M dependencies and sequential snapshots; in-lifecycle peak is exactly2, never greater. Original same-store/same-child consumption is checked after the original real witness predicate.

Delay50 starts only after actual initialization, restoreMethods, source/client seeds and a valid GET/form, immediately before POST. Only mocked CF GET waits; each wait is measured with Node monotonic time and loops until≥50ms. Provider Date is emitted from actual Date.now after the wait. JWKS, ledger, D1/DO and SDK are not delayed. No fake timer, backdating, JS/SQL clock shift, guard/window/threshold change or convenience delay reduction is used in these I/O cases.

| Actual head / case | POST | Peak / active at observation | Whole consume/grant child ms | Tail after durable grant ACK ms | Full / SEND→ACK GET |
| --- | ---: | --- | ---: | ---: | --- |
|44e564d, delay0 control before product |302|1 /0|1332|137|112 /84|
|44e564d, unchanged50ms causal RED |503|1 /1|5001|no ACK|70 prefix /no completed ACK interval|
|44e564d, fixed-two RED at delay0 |302|1 vs expected2 /0|1310|164|112 /84|
|eb99d1a, delay0 after schedule |302|2 /0|1965|171|112 /84|
|eb99d1a, same50ms GREEN |302|2 /0|4867|660|112 /84|
|eb99d1a, fixed-two delay0 |302|2 /0|1164|149|112 /84|
|745fc2a, final full-file delay0 |302|2 /0|1488|193|112 /84|
|745fc2a, final full-file50ms |302|2 /0|4705|587|112 /84|
|745fc2a, final full-file fixed-two |302|2 /0|1442|176|112 /84|

Every complete112 contains16 each verify-reader, verify-publisher, qa-deployment, qa-version, m-deployment, m-initial-version, m-current-version. Every complete child preserves80 factual SELECT +16 original preflight statements +2 writes=98. The84 SEND→grantACK interval is narrower than the whole child. The RED failed at the original consume/grant child deadline with consume SEND present and grant ACK absent; its 70 started-cycle prefix has 10 of each endpoint category, 46 factual SELECT/8 preflight/1 write. At observation 69 cycles had completed their cancellation finally and 1 was still pending, not a fabricated 112 settled cycles. All successful full-child 112 cycles have actual cancellation-settled/end markers and accepted body bytes greater than zero. Minimum actual mocked waits: RED50.003686ms, initial GREEN50.009953ms, full-file GREEN50.005332ms.

The successful original five-second child includes initial issuer recheck and durable ACK/final recheck; it returns an actual original application grant and SDK code. Instrumented elapsed is measured from entering the native child callback through its action finally; the unchanged native child post-check also succeeds before subsequent work and POST302. The initial GREEN has only132ms wall margin (final full-file295ms). This is empirical SYN feasibility, not real-provider latency, performance/SLA acceptance or a guarantee. No stress/retry-until-green was performed.

At RED response time active1 explicitly means actual work remains pending. That first isolated runtime was awaited-disposed with no subsequent root attempted; later physical settlement was not separately sampled there. It is not drain evidence. The dedicated hostile cases below explicitly measure subsequent physical settlement and occupancy.

## Native hostile results

All23 new fanout cases pass in the complete SDK file at 745fc2a:
- Reader or publisher failure with the other actual body held: no descriptors, form, SDK operation/receipt, issuer SEND/ACK or grant. Active1 at denial, peak2; the native same-ctx root probe stays blocked through body return and held cancellation. After actual cancellation release, active0 and a fresh bookkeeping probe succeeds.
- QA failure with M body held, or M failure with QA version body held: sibling may finish allowed reads, but no partial source, next snapshot or effect. Same physical retention checks pass and peak≤2.
- Actual accepted M controller abort and original-root.finish propagate to the real QA original lease (observed parentAborted), while body/cancel holds preserve occupancy and late work creates no ACK/code/effect. This does not claim Node dispatch signal propagation.
- A sibling held beyond its original child expires without renewal; observed whole request5185.33008ms includes work before the held operation. A separate causal case completes the other credential, replaces the live KV holder before4500ms and proves it cannot be hidden.
- Owner, pointer, module and configuration drift at causal before-join, after-first-primary-before-next-existing-read, and between-snapshot barriers: all12 deny at original following checkpoints. The test does not claim atomic provider state or detection after all original checkpoints.

For the four failure+held-sibling cases, started cycles were respectively 2/2/4/5; completed cycles at denial were 1/1/3/4, and after body/cancel release all 2/2/4/5 had settled. A held negative late part is rejected before source acceptance, so its trace accepted-byte count can remain zero; body/cancel lifecycle occupancy is counted independently.

Held responses are explicit SYN negative streams over the mocked provider bytes; the source request's real native read/cancel promises remain pending. No positive source DTO/grant is seeded. Holds release in finally and settle before disposal. Scope occupancy is tested independently of the trace counter, and no allSettled/abort/global provider or SDK/KV drain claim follows.

The preserved original full SDK cases include the independent uninstrumented positive, strict-reader/own-SEND checks, missing source/schema and actual queued SQL5100ms denials. Staged adjacent coverage is stated below.

## Failures, ROOT exceptions and remaining-only qualification

At745fc2a the complete SDK command passed57/57. The following adjacent command was bounded too narrowly at180s: it completed54 phase-context cases (53P1F), then exited124 while the next schema case was in flight; the six other files had not started.

The single failure occurred before intended owner drift: seedPhaseFacts could not seal Enrollment. Its fixture constructed issuedAt:Date.now(),deadline:Date.now()+5000 while the unchanged codec rejects deadline-issuedAt>5000. All other fields come from validated anchors/plan; delta=null uses offset0. ROOT authorized only one native time sample and deadline=issuedAt+5000 in test/fixtures/finite-owner-phase-context.mjs. Original timestamps were not captured: a5001ms interval is INFERRED, not measured. The failed owner case then reached its actual owner mutation/second-observation denial and passed.

The first remaining-only qualifier at0463cdb failed YAML parsing before any jobs/tests/compiler invocation: colon-space inside a shell regex needed a YAML block scalar. Qualifier-only051b3fa corrected it and linted all six controlled files.

The27 remaining/failed phase cases at 051b3fa produced24P3F. held-fetch/body/cancel failed 'actual work did not settle'. The derived phaseContextRead hook held every provider response but used singular releaseHeld/releaseRead/releaseCancel fields; the concurrent credential overwrote a prior release callback. Source retention correctly remained occupied with one unreleased actual operation. This was fixture evidence, not an authorization to weaken retention or extend deadlines.

ROOT explicitly authorized the minimal ONE-response latch only in the derived phaseContextRead held-fetch/body/cancel block, with an exact-one transform check. Its first actual response follows the unchanged original hold/read/cancel path; the sibling response remains original and unmodified. Other modes/hooks/checks and all original assertions are unchanged. No queue/drain abstraction was added. Dedicated23 fanout tests independently qualify concurrent failed siblings. Only these three failed cases, one relevant uninstrumented SDK positive for the shared seed change, and the six unstarted files are run at final head. The57 SDK and53+24 adjacent passes are preserved; no full SDK/50ms rerun is made for these fixture corrections.

At 9ff0226 the three corrected held phase cases pass3/3, the required final uninstrumented actual source/SDK/Unit2a positive passes1/1, and the six previously unstarted files pass65/65 (including5 nested native-profile subtests). Phase coverage is staged53P at 745fc2a +24P at 051b3fa +3P at 9ff0226=80/80 distinct cases. Combined distinct coverage is57 SDK (34 original+23 new) +80 phase +65 adjacent=202 passed cases/subtests, across the disclosed heads, not a claimed one-head202/202 run. The final positive's GET2301ms/POST4123ms, SEND→grantACK1322ms/3285ms remaining and84 provider GETs/0 ledger GETs are actual SYN-fixture measurements.

## Runs, commands and compilation

All runs use attempt1, Ubuntu24.04/Node22.23.4, contents:read, checkout persist-credentials:false/fetch-depth1 and npm ci --ignore-scripts --no-audit --no-fund. Initial qualifiers bounded the job at12min; full SDK+adjacent job15min; remaining-only qualifiers10min. No artifact upload or reusable workflow remains.

| Actual head | Run / job | Outcome | Known authored fixture esbuild calls |
| --- | --- | --- | ---: |
|44e564d46a0d1b47838cec9ca003da0e705929f2|42047502457 /127314365473|Control1P +2 intended RED|6|
|eb99d1a3a8d0d1047f370f517f29a9626c1d86bb|42047841728 /127315577517|Same calibration3P0F|6|
|745fc2afdcea789bbe0427d099a90a2a03c4152d|42048550578 /127318088611|SDK57P0F; adjacent53P1F then180s timeout124|106 SDK +54 completed phase; possible1 in-flight|
|0463cdb132f65c6de2b6d3674e346088fc25edf6|42051176155 /no jobs|Qualifier YAML failure|0|
|051b3fa3296db30c9bdc7bee0277aa0057f0dab2|42051365596 /127328018113|Remaining phase24P3F; subsequent steps skipped|27|
|9ff0226c23a6a0c1b6a69921c60b7cadec56a72a|42052792433 /127333052666|Held3P; final SDK positive1P; adjacent65P; lint clean|48|

Exact command families:
~~~sh
npx eslint lib/mcp-qa-finite-owner-phase-context.mjs test/mcp-qa-finite-owner-qa-sdk-native.test.mjs test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-qa-sdk.mjs test/fixtures/finite-owner-io-fanout.mjs
# Remaining-only runs add test/fixtures/finite-owner-phase-context.mjs to scoped eslint.
timeout 300s node --test --test-concurrency=1 --test-name-pattern="fanout causal control|fanout 50ms|fanout fixed two" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
timeout 660s node --test --test-concurrency=1 test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
# Original adjacent command180s included phase-context-native plus the six files below.
# Remaining phase051 used ROOT's owner/schema + remaining-case positive regex, not the full file.
timeout 360s node --test --test-concurrency=1 --test-name-pattern="^original retained read blocks foreign root until actual settlement: (held-fetch|held-body|held-cancel)$" test/mcp-qa-finite-owner-phase-context-native.test.mjs
timeout 150s node --test --test-name-pattern="uninstrumented actual native source/SDK/Unit2a GET POST" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
timeout 240s node --test --test-concurrency=1 test/mcp-qa-finite-owner-request-retention-native.test.mjs test/mcp-qa-finite-owner-request-retention.test.mjs test/mcp-qa-finite-preparation-issuer-native.test.mjs test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-profile.test.mjs test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs
~~~

The exact interrupted adjacent and27-case remaining-only commands were:

~~~sh
timeout 180s node --test --test-concurrency=1 test/mcp-qa-finite-owner-phase-context-native.test.mjs test/mcp-qa-finite-owner-request-retention-native.test.mjs test/mcp-qa-finite-owner-request-retention.test.mjs test/mcp-qa-finite-preparation-issuer-native.test.mjs test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-profile.test.mjs test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs
timeout 360s node --test --test-concurrency=1 --test-name-pattern="^fresh current owner and current publication are independently rechecked: (owner|schema)$|^original primary issuer denies |^original retained read blocks foreign root|^original retained request with 29 seconds|^same ambient original request|^absent exact issuer table|^original issuer reservation|^existing orphan original fence|^failed schema SELECT|^exact original metadata prefix|^missing original ticket|^fresh QA pointer drift|^actual allocated phase fixture|^settled original M journals" test/mcp-qa-finite-owner-phase-context-native.test.mjs
~~~

These are qualification history, not new product/runtime commands.

Known authored fixture esbuild calls:247, plus at most1 unobserved in-flight invocation at the180s cutoff. Breakdown6+6+(106+54)+0+27+48. Final48 are3 phase worlds,2 SDK roles for one positive,8 owner/transport-retention fixtures,33 issuer scenarios and2 native-profile bundles (nested profile subtests reuse their bundle). There are0 observed esbuild failures/warnings; whether the killed55th phase world's extra call had begun/finished is not logged, so no fabricated exact247/248 total or zero-interruption claim is made. All completed worlds invoke their existing build once per indicated role, and Miniflare internal parsing/JIT is excluded. The original partial command's future test/build work never started. This1-call uncertainty is a delivery concern, not an invitation to rebuild for accounting.

No new compileFiniteNativeStaging, buildFiniteNativePackage, whole npm test/lint/build or build-for-hash invocation is made in this unit. Accepted D0.3 standard evidence at ed63b971 remains the unchanged UNMOUNTED standard graph: M331 inputs/1952076 bytes, QA305 inputs/2021441 bytes; phase context emitted0/receiver/forwarder absent. No production imports/mounts changed. This is not a mounted compiler-budget qualification.

The actual executing SDK component fixture at745 parses QA320 inputs and M187. QA outputs: plain1689478 bytes (1 build), old SDK-observed1692035 (29), new I/O-only1695540 (23). M outputs: plain109279 (1), accepted signal-observed110968 (52); no token-compatible M behavior is removed. Hashes vary with the disclosed SYN ceiling on QA. All106 calls are executing fixture qualification, not standard production graph output. Adjacent phase/retention/issuer/profile components use their existing actual fixture builds; no standard compiler is hidden inside them. The final shared-seed positive at 9ff0226 has QA1689592 bytes/320 inputs/SHAe58f32d73d074c8af7afc793305c38730d7d77fbe7d42129037d8b244e39ef2a and M109279 bytes/187 inputs/SHA518ec6763dc13f8cd1c6dc7b62a4e185bf95767f342954b9908d3bab6a6db734. Its two actual builds are already counted; no extra hash-only compile occurred.

Retained bounded logs show137 RPC-stub lifecycle warnings and62 SDK CIMD notices across the five executing jobs (by job:3/3,3/3,101/54,26/0,4/2 RPC/CIMD). They also retain npm/action/Node deprecations; no scope or dependency/flag change was made to silence them. Scoped ESLint has zero reported errors/warnings; no esbuild diagnostic was hidden. Awaited disposal and explicit hostile settlement probes are present, but these warnings/disposal are not a global physical-drain proof. One attempt to read live job logs returned404 while the blob was unavailable; the completed job logs were then fetched successfully.

## Protected source and outstanding live gates

Fresh final-code-tree metadata confirms these BASE blobs unchanged:

| Path | Blob SHA |
| --- | --- |
|lib/delegated-oauth-worker.mjs|d979f395029c9b1e66a99222d06acf99eba4f358|
|lib/mcp-qa-cloud-closed-pins.mjs|26213123304eea25e652a52d808d25b7e0e3475e|
|lib/mcp-qa-finite-initial-cleanup.mjs|34a93b63607cff1454f914e16062f17aa3c3e0bb|
|lib/mcp-qa-finite-initial-entry.mjs|c5ae0f53bee077c693d7f0a0599bbb6347648fee|
|lib/mcp-qa-finite-initial-lease.mjs|a9cc083baae71c89af2f6436c00571dc8e7a20c9|
|lib/mcp-qa-finite-owner-oauth-forward.mjs|f7979579fcb6d00b3d5d68c7790089c803f4170f|
|lib/mcp-qa-finite-owner-oauth-qa.mjs|ec5c16161bffc6e6d19de153b4465bf6ae748493|
|lib/mcp-qa-finite-preparation-issuer-journal.mjs|414450aa08f797bed5a41cf5cc697342785ce16b|
|lib/mcp-qa-finite-preparation-issuer-store.mjs|01d1a85eccaa98944b9ce3341db3cd071a4ad24d|
|lib/mcp-qa-finite-profile.mjs|547eb82f4ec83a2e7bcec88dd18622fc636dc477|
|lib/mcp-qa-finite-stage-work.mjs|a89baeb2578856dadedf700f9d66e180eb09120e|
|package-lock.json|36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b|
|wrangler.independent-closure-qa.finite.jsonc|31c6638c204b631c846a537cbec13b3f9b24e060|
|wrangler.mcp-own.finite.jsonc|87d3f78c62d373c1f18803da7dc6a4e300caddbf|

Changed product blob85c7105f906b5d7936b4bd205c1f4598f5521546; new I/O fixture8dbbdc542d52078de083d4828d1335ed1bae6254; final suite61aba9c1298f2999dd588f35011502e555df5072; exceptional phase fixturef1ddbfff29b1d5e4da4dbf70c649e0df20582b46. Tree comparison finds only the six authorized source/test files plus the own temporary qualifier before final delivery.

The product ceiling2026-11-03T02:59:00Z stays expired. Initial fixture-only approval/custody/JWKS/provider/ledger/module/history substitutions are SYN; actual SDK crypto, journals, native KV/DO/D1 and original SDK positive execute. The new I/O positives keep actual JS/SQL clocks; existing adjacent historical fixtures explicitly retain their previously accepted SYN time projections, not real-provider operation.

operationalReadiness=false; completePackage=false; PCoff=false. No alias installation, mounted graph, real credentials, runtime/provider timing, Entry/cleanup/notice/subscription/consumer availability or PC-off acceptance follows from these tests. The narrow five-second margin, captured-count uncertainty at the killed process, RPC warnings and staged-head coverage remain explicit limitations. ROOT owns the full actual BASE diff and fresh independent spec/quality review before any next decision.


## Fix round 1/5 — actual pending-branch drift (5 November 2026)

FIX_BASE / previous reviewed HEAD: ae39d1b220614498856160a3b2de994c58544110. Same source writer, no subagents/reviewer. Independent reviewer review_owner_io_fanout found product structure Pass but SpecIssues/Needsfixes: the old before-join barrier was injected AFTER awaited Promise.allSettled([qaWork,mWork]). ROOT authorized only fixture/native-case/report changes and an own temporary scoped qualifier. Product scheduling, source guards, clocks, permissions and deferred minor cleanup were outside this round.

This append CORRECTS the earlier report's before-join claim: those four existing drift cases changed state after both branches had settled, before joined results were consumed. They were useful post-join coverage, not evidence of drift with a branch pending. The historical report above remains unchanged for provenance; this append supersedes that characterization.

Fix code/test head: 59d6852539b59bc3430f41c7455ca36be223955d; tree 480a8b61276489645f565fd54d19d07eeeab8883. Final report containing commit/tree are in the CAS delivery receipt; final delivery only appends this text and removes the own qualifier. Before CAS, branch ref readback matched the expected head. Final product blob remains 85c7105f906b5d7936b4bd205c1f4598f5521546, exactly unchanged from FIX_BASE. Fixed I/O fixture blob 900172e1dd24662c354c0d3d48d4ed28a86c3a52; native test blob fb645efe76fd007e64aed1c485ac98834ba7b729.

Only these code/test files changed against FIX_BASE:
- test/fixtures/finite-owner-io-fanout.mjs
- test/mcp-qa-finite-owner-qa-sdk-native.test.mjs

The fixture observes the original fixed QA/M branch promises entering pending state and reaching their actual helper-promise finalizers. Exact-one instrumentation markers fail closed. It records whether each original request callback has actually invoked fetch. It does not substitute source/result/DTO, query an additional authority, wrap SDK/KV, change a grant or export a capability.

The new selected before-join gate is inside the retained original request callback, before the original fetch is invoked. It applies only to the explicitly selected category in snapshot 1:
- Owner/pointer: M deployment request, before that branch obtains the pointer or reaches its later original owned-project SELECT.
- Module/configuration: current M version request, before the original metadata fetch observes the mutated module/configuration.

A real retained source M branch/helper and its original child callback remain unfinished while the gate is held. The trace's active1 at this gate means that callback is awaiting the test barrier; it does NOT claim an outbound fetch/body is already in flight. Tests explicitly require M=pending, the affected callback entered, fetchStarted=false, outcome=pending, no end marker, snapshot1, and peak≤2 BEFORE performing the native D1 owner mutation or mocked provider pointer/module/configuration mutation. Then they release the barrier and verify denial through the original following checks. No guessed sleep, timer/clock offset, shortened delay, deadline extension or new source read is used.

The old four cases are retained under joined-before-consumption. They now explicitly assert QA=settled, M=settled and active0 at that checkpoint. The eight existing after-first/between-snapshot cases are unchanged and were not rerun. The new four tests own their pending request/barrier cleanup; the existing world() prefix through its finally block is byte-for-byte unchanged. ROOT's deferred minor at the global world cleanup remains deferred and was not mixed into fix1.

### Causal RED and scoped GREEN

| Actual head | Run / job / attempt | Command result | Fixture builds |
| --- | --- | --- | ---: |
|7ac10c3f69eb69d56f097219c199670b9cf4958d|42056328272 /127345582052 /1|0P4F0skip, intended pending-state RED at old location; scoped lint clean|8|
|59d6852539b59bc3430f41c7455ca36be223955d|42056890908 /127347597989 /1|8P0F0skip: four new pending cases +four preserved post-join cases; scoped lint clean|16|

RED retained the old barrier location and added actual branch observation plus the new pending assertion. All four owner/pointer/module/configuration cases failed exactly at “original M branch must still be unfinished at mutation barrier”: expected pending, actual settled. Each recorded QA=settled, M=settled, affected fetchStarted=true, outcome=fulfilled, active0, snapshot1. The failed assertion preceded mutation. Per-test finally released the old gate and awaited/cancelled the original pending response. These were causal coverage REDs, not initialization/observer/source mismatch failures or fabricated product positives.

GREEN kept the same four assertions and mutations, moving only the selected test barrier before the affected fetch; the old post-join barrier was renamed and preserved. All four new mutations recorded QA=settled, M=pending, fetchStarted=false, outcome=pending, active1, snapshot1. After release, each actual request returned503 without form/Location/SDK operation/receipt/issuer SEND/ACK/new grant, the affected fetch had actually started and its cancellation/end markers had settled, both branches were settled, active0, snapshot1, peak2. Thus all four denied at original checks in the first snapshot. No detection after all original checkpoints or atomic-provider-state claim is made.

Exact cloud commands:

~~~sh
npx eslint test/fixtures/finite-owner-io-fanout.mjs test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
timeout 180s node --test --test-concurrency=1 --test-name-pattern="fanout pending branch" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
timeout 180s node --test --test-concurrency=1 --test-name-pattern="fanout pending branch|drift at causal joined-before-consumption" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
~~~

Both Actions jobs use Ubuntu24.04/Node22.23.4, timeout5min, contents:read, checkout persist-credentials:false/fetch-depth1 and npm ci --ignore-scripts --no-audit --no-fund. No secrets, artifact uploads, local clone/dependencies/build/tests or real provider requests. The branch/path-scoped .github/workflows/afw-owner-io-source.yml is removed in final delivery.

Compilation accounting for this round is exact: 4 native worlds ×2 roles=8 actual esbuild calls for RED, 8 worlds ×2=16 for GREEN, total24, all completed; 0 observed compiler failures or esbuild warnings. GREEN's executing component fixture QA is1696356 bytes/320 parsed inputs (first SHA2bc2954c260101eb7c4591703d3f2f4e2366872ef4fe85c198a2c052a46316b1), M110968 bytes/187 inputs/SHAa90fcc6ef797de0218b93de2c166c8f6957c7bdf5468e0280f998b3ef0e0d45a. QA hashes vary with the existing disclosed SYN ceiling. No extra hash-only build or standard compiler was invoked; no production graph/import/mount changed. Cumulative known authored fixture calls become271, with the same possible1 unlogged invocation at the earlier180s cutoff still unresolved.

Warnings retained: RED0 RPC-stub warnings/4 CIMD notices; GREEN8 RPC-stub warnings/8 CIMD notices; npm/action/Node deprecations remain in both bounded logs. Scoped lint has0 errors/warnings, esbuild diagnostics0. The RPC notices are not suppressed and are not physical-drain evidence. There were no additional failure/correction runs in this round.

Prior57 SDK, staged80 phase and65 adjacent coverage remains at its documented heads; this is ONLY the scoped eight-case fix1 qualification. No full57/80/65 suite, 50ms repeat/stress or new standard compile gate was run. The prior132ms empirical margin and earlier one-call accounting uncertainty remain limitations. The deferred minor and full integration checks remain ROOT's final whole-branch list.

DONE_WITH_CONCERNS; ready for the same independent reviewer's scoped re-review, not self-approval. operationalReadiness=false; completePackage=false; PCoff=false. No next unit, runtime, Entry, alias, credential, OAuth/OTP, clock, Max, main or merge action is activated by this append.
