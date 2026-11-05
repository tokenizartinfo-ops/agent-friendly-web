# Finite owner I/O fanout — complete task review package

Repository tokenizartinfo-ops/agent-friendly-web (1347578006).
BASE 51c5db8e987755ccf2819ba861461916e0396943
HEAD ae39d1b220614498856160a3b2de994c58544110
Qualifiedcode9ff0226c23a6a0c1b6a69921c60b7cadec56a72a/treefb2f5c2f8437a4587ccf2dbfb5d72d47202c419f. Rootverifiedcode→report onlyaddsreport/removesownqualifier; source/testsame. Net7files/7commits. ModifiedfilesrecomputedU10fromexactBASE/HEADcontents;2addedfilesinfull. No localcheckout/build. Read changedfilesonlyifnecessaryhunkcutsmidfunction andnamereason.

## Commits
- 44e564d46a0d1b47838cec9ca003da0e705929f2 test(afw): calibrate genuine owner I/O lifecycle before fanout
- eb99d1a3a8d0d1047f370f517f29a9626c1d86bb perf(afw): join fixed owner credential and primary read pairs
- 745fc2afdcea789bbe0427d099a90a2a03c4152d test(afw): qualify owner fanout physical settlement and causal drift
- 0463cdb132f65c6de2b6d3674e346088fc25edf6 test(afw): sample Enrollment seed deadline once and qualify remaining cases
- 051b3fa3296db30c9bdc7bee0277aa0057f0dab2 ci(afw): quote scoped remaining-case pattern as YAML block
- 9ff0226c23a6a0c1b6a69921c60b7cadec56a72a test(afw): preserve one-held-operation phase regression under sibling reads
- ae39d1b220614498856160a3b2de994c58544110 docs(afw): record bounded owner I/O fanout qualification and remove qualifier

## Stat summary
- added docs/superpowers/reports/2026-11-05-finite-owner-io-fanout.md +148/-0
- modified lib/mcp-qa-finite-owner-phase-context.mjs +21/-8
- modified test/fixtures/finite-initial-entry-world.mjs +5/-1
- added test/fixtures/finite-owner-io-fanout.mjs +84/-0
- modified test/fixtures/finite-owner-phase-context.mjs +8/-1
- modified test/fixtures/finite-owner-qa-sdk.mjs +4/-4
- modified test/mcp-qa-finite-owner-qa-sdk-native.test.mjs +125/-3

## Full diff

~~~diff
diff --git a/docs/superpowers/reports/2026-11-05-finite-owner-io-fanout.md b/docs/superpowers/reports/2026-11-05-finite-owner-io-fanout.md
new file mode 100644
--- /dev/null
+++ b/docs/superpowers/reports/2026-11-05-finite-owner-io-fanout.md
@@ -0,0 +1,148 @@
+# Finite owner I/O fanout — SOURCE qualification
+
+5 November 2026. DONE_WITH_CONCERNS, pending ROOT's fresh independent spec/quality review. No next unit is activated.
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (ID 1347578006); ENVIRONMENT GitHub source and isolated credential-free Actions; ORIGIN GitHub App; RESOURCE_TYPE branch/Git objects/Actions; RESOURCE_ID feat/finite-native-cleanup-20261101; ALLOWED_ACTION expected-head CAS source/test writes and bounded SYN qualification. Exact BASE 51c5db8e987755ccf2819ba861461916e0396943. Requirements: docs/superpowers/briefs/2026-11-05-finite-owner-io-fanout.md and root preflight at BASE. Historical design pin d630 is not the execution base; accepted D0.3 remains included.
+
+Final code/test head 9ff0226c23a6a0c1b6a69921c60b7cadec56a72a, tree fb2f5c2f8437a4587ccf2dbfb5d72d47202c419f. The containing report commit/tree are supplied by the delivery CAS receipt, because this file cannot embed its own commit hash. That delivery only adds this report and removes .github/workflows/afw-owner-io-source.yml; qualified source/test bytes remain unchanged. Rollback scope is a reviewed revert of this branch's unit diff to BASE. No runtime rollback was needed or executed.
+
+## Source change and scope
+
+Only lib/mcp-qa-finite-owner-phase-context.mjs changes product behavior. Private verifyCredential retains the original one-token validation; fixed reader and publisher promises and their Promise.allSettled join are retained. Both must fulfill before descriptor reads. Private readQaPrimary retains QA pointer comparison, full module read/hash/validation and public configuration projection. Private readMPrimary retains current M pointer, capsule.activatedVersionId (not historical backup), complete configuration/module validation, original owned-project SELECT and current M metadata read. A retained fixed two-branch allSettled join requires both fulfilled, rechecks the same clock, then runs both original alias checks and returns the same physical DTO. Promise.resolve().then catches synchronous branch start failures. There is no generic pool, callback runner, exported intermediate capability, cache, batching, snapshot overlap or extra authority read.
+
+The original request helper is byte-for-byte intact, including original GET origin/credentials/cache policy, status/header/Date/UTF-8/JSON/length checks, caps 8192/65536/4500000 and retained fetch/read/cancel lifecycle. Native SQL remains SELECT-first/new first-primary sessions and original UUID/store/child/witness. Product prefix before the old credentials block (15941 characters) and suffix beginning at const observed=await primary() (40294 characters) are identical to BASE; the entire schedule extraction is between those boundaries. No product imports, leases, stage-work, handler, public three-key DTO, journals, SDK result semantics or holders changed. Original factsA→primaryA→qualifyA→primaryB→factsB→qualifyB→compare and root≤30000/child≤5000 remain.
+
+Final code/test scope:
+- lib/mcp-qa-finite-owner-phase-context.mjs
+- test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+- test/fixtures/finite-initial-entry-world.mjs
+- test/fixtures/finite-owner-qa-sdk.mjs
+- test/fixtures/finite-owner-io-fanout.mjs (new)
+- test/fixtures/finite-owner-phase-context.mjs (explicit ROOT exception described below)
+
+Sole writer; no subagents, reviewer, local clone/dependencies/tests/build, provider/AFW requests, production workflow, mount/alias installation, schema/resource/access/profile/date/flag/credential/OAuth/OTP/Entry/Max/main/merge changes. Local shell use was limited to skill-file reads.
+
+## Genuine before/after evidence
+
+The I/O-only mode uses the genuine accepted initial Entry/material/preparation, actual SDK1.2.1, native DO/KV/D1 and original grant/code. Normal response bytes and source results are not substituted. It does not wrap SDK/KV or invoke strict-reader probes; the old SDK-observed mode remains separate. D1 session observation only audits the original SQL. The independent uninstrumented original SDK positive remains.
+
+The I/O trace begins inside the actual request callback before fetch and ends after its actual stream cancellation finally settles. It records only bounded fixed category/method/ordinal/branch/snapshot/timestamps/byte counts/outcome, maximum1024 entries; no URL/header/token/body/module/code/cookie or owner DATA. Exact-one source markers fail closed. The count is not outbound-service headers or a clock.child race. Successful order checks require both credential lifecycles complete before descriptors, original QA/M dependencies and sequential snapshots; in-lifecycle peak is exactly2, never greater. Original same-store/same-child consumption is checked after the original real witness predicate.
+
+Delay50 starts only after actual initialization, restoreMethods, source/client seeds and a valid GET/form, immediately before POST. Only mocked CF GET waits; each wait is measured with Node monotonic time and loops until≥50ms. Provider Date is emitted from actual Date.now after the wait. JWKS, ledger, D1/DO and SDK are not delayed. No fake timer, backdating, JS/SQL clock shift, guard/window/threshold change or convenience delay reduction is used in these I/O cases.
+
+| Actual head / case | POST | Peak / active at observation | Whole consume/grant child ms | Tail after durable grant ACK ms | Full / SEND→ACK GET |
+| --- | ---: | --- | ---: | ---: | --- |
+|44e564d, delay0 control before product |302|1 /0|1332|137|112 /84|
+|44e564d, unchanged50ms causal RED |503|1 /1|5001|no ACK|70 prefix /no completed ACK interval|
+|44e564d, fixed-two RED at delay0 |302|1 vs expected2 /0|1310|164|112 /84|
+|eb99d1a, delay0 after schedule |302|2 /0|1965|171|112 /84|
+|eb99d1a, same50ms GREEN |302|2 /0|4867|660|112 /84|
+|eb99d1a, fixed-two delay0 |302|2 /0|1164|149|112 /84|
+|745fc2a, final full-file delay0 |302|2 /0|1488|193|112 /84|
+|745fc2a, final full-file50ms |302|2 /0|4705|587|112 /84|
+|745fc2a, final full-file fixed-two |302|2 /0|1442|176|112 /84|
+
+Every complete112 contains16 each verify-reader, verify-publisher, qa-deployment, qa-version, m-deployment, m-initial-version, m-current-version. Every complete child preserves80 factual SELECT +16 original preflight statements +2 writes=98. The84 SEND→grantACK interval is narrower than the whole child. The RED failed at the original consume/grant child deadline with consume SEND present and grant ACK absent; its 70 started-cycle prefix has 10 of each endpoint category, 46 factual SELECT/8 preflight/1 write. At observation 69 cycles had completed their cancellation finally and 1 was still pending, not a fabricated 112 settled cycles. All successful full-child 112 cycles have actual cancellation-settled/end markers and accepted body bytes greater than zero. Minimum actual mocked waits: RED50.003686ms, initial GREEN50.009953ms, full-file GREEN50.005332ms.
+
+The successful original five-second child includes initial issuer recheck and durable ACK/final recheck; it returns an actual original application grant and SDK code. Instrumented elapsed is measured from entering the native child callback through its action finally; the unchanged native child post-check also succeeds before subsequent work and POST302. The initial GREEN has only132ms wall margin (final full-file295ms). This is empirical SYN feasibility, not real-provider latency, performance/SLA acceptance or a guarantee. No stress/retry-until-green was performed.
+
+At RED response time active1 explicitly means actual work remains pending. That first isolated runtime was awaited-disposed with no subsequent root attempted; later physical settlement was not separately sampled there. It is not drain evidence. The dedicated hostile cases below explicitly measure subsequent physical settlement and occupancy.
+
+## Native hostile results
+
+All23 new fanout cases pass in the complete SDK file at 745fc2a:
+- Reader or publisher failure with the other actual body held: no descriptors, form, SDK operation/receipt, issuer SEND/ACK or grant. Active1 at denial, peak2; the native same-ctx root probe stays blocked through body return and held cancellation. After actual cancellation release, active0 and a fresh bookkeeping probe succeeds.
+- QA failure with M body held, or M failure with QA version body held: sibling may finish allowed reads, but no partial source, next snapshot or effect. Same physical retention checks pass and peak≤2.
+- Actual accepted M controller abort and original-root.finish propagate to the real QA original lease (observed parentAborted), while body/cancel holds preserve occupancy and late work creates no ACK/code/effect. This does not claim Node dispatch signal propagation.
+- A sibling held beyond its original child expires without renewal; observed whole request5185.33008ms includes work before the held operation. A separate causal case completes the other credential, replaces the live KV holder before4500ms and proves it cannot be hidden.
+- Owner, pointer, module and configuration drift at causal before-join, after-first-primary-before-next-existing-read, and between-snapshot barriers: all12 deny at original following checkpoints. The test does not claim atomic provider state or detection after all original checkpoints.
+
+For the four failure+held-sibling cases, started cycles were respectively 2/2/4/5; completed cycles at denial were 1/1/3/4, and after body/cancel release all 2/2/4/5 had settled. A held negative late part is rejected before source acceptance, so its trace accepted-byte count can remain zero; body/cancel lifecycle occupancy is counted independently.
+
+Held responses are explicit SYN negative streams over the mocked provider bytes; the source request's real native read/cancel promises remain pending. No positive source DTO/grant is seeded. Holds release in finally and settle before disposal. Scope occupancy is tested independently of the trace counter, and no allSettled/abort/global provider or SDK/KV drain claim follows.
+
+The preserved original full SDK cases include the independent uninstrumented positive, strict-reader/own-SEND checks, missing source/schema and actual queued SQL5100ms denials. Staged adjacent coverage is stated below.
+
+## Failures, ROOT exceptions and remaining-only qualification
+
+At745fc2a the complete SDK command passed57/57. The following adjacent command was bounded too narrowly at180s: it completed54 phase-context cases (53P1F), then exited124 while the next schema case was in flight; the six other files had not started.
+
+The single failure occurred before intended owner drift: seedPhaseFacts could not seal Enrollment. Its fixture constructed issuedAt:Date.now(),deadline:Date.now()+5000 while the unchanged codec rejects deadline-issuedAt>5000. All other fields come from validated anchors/plan; delta=null uses offset0. ROOT authorized only one native time sample and deadline=issuedAt+5000 in test/fixtures/finite-owner-phase-context.mjs. Original timestamps were not captured: a5001ms interval is INFERRED, not measured. The failed owner case then reached its actual owner mutation/second-observation denial and passed.
+
+The first remaining-only qualifier at0463cdb failed YAML parsing before any jobs/tests/compiler invocation: colon-space inside a shell regex needed a YAML block scalar. Qualifier-only051b3fa corrected it and linted all six controlled files.
+
+The27 remaining/failed phase cases at 051b3fa produced24P3F. held-fetch/body/cancel failed 'actual work did not settle'. The derived phaseContextRead hook held every provider response but used singular releaseHeld/releaseRead/releaseCancel fields; the concurrent credential overwrote a prior release callback. Source retention correctly remained occupied with one unreleased actual operation. This was fixture evidence, not an authorization to weaken retention or extend deadlines.
+
+ROOT explicitly authorized the minimal ONE-response latch only in the derived phaseContextRead held-fetch/body/cancel block, with an exact-one transform check. Its first actual response follows the unchanged original hold/read/cancel path; the sibling response remains original and unmodified. Other modes/hooks/checks and all original assertions are unchanged. No queue/drain abstraction was added. Dedicated23 fanout tests independently qualify concurrent failed siblings. Only these three failed cases, one relevant uninstrumented SDK positive for the shared seed change, and the six unstarted files are run at final head. The57 SDK and53+24 adjacent passes are preserved; no full SDK/50ms rerun is made for these fixture corrections.
+
+At 9ff0226 the three corrected held phase cases pass3/3, the required final uninstrumented actual source/SDK/Unit2a positive passes1/1, and the six previously unstarted files pass65/65 (including5 nested native-profile subtests). Phase coverage is staged53P at 745fc2a +24P at 051b3fa +3P at 9ff0226=80/80 distinct cases. Combined distinct coverage is57 SDK (34 original+23 new) +80 phase +65 adjacent=202 passed cases/subtests, across the disclosed heads, not a claimed one-head202/202 run. The final positive's GET2301ms/POST4123ms, SEND→grantACK1322ms/3285ms remaining and84 provider GETs/0 ledger GETs are actual SYN-fixture measurements.
+
+## Runs, commands and compilation
+
+All runs use attempt1, Ubuntu24.04/Node22.23.4, contents:read, checkout persist-credentials:false/fetch-depth1 and npm ci --ignore-scripts --no-audit --no-fund. Initial qualifiers bounded the job at12min; full SDK+adjacent job15min; remaining-only qualifiers10min. No artifact upload or reusable workflow remains.
+
+| Actual head | Run / job | Outcome | Known authored fixture esbuild calls |
+| --- | --- | --- | ---: |
+|44e564d46a0d1b47838cec9ca003da0e705929f2|42047502457 /127314365473|Control1P +2 intended RED|6|
+|eb99d1a3a8d0d1047f370f517f29a9626c1d86bb|42047841728 /127315577517|Same calibration3P0F|6|
+|745fc2afdcea789bbe0427d099a90a2a03c4152d|42048550578 /127318088611|SDK57P0F; adjacent53P1F then180s timeout124|106 SDK +54 completed phase; possible1 in-flight|
+|0463cdb132f65c6de2b6d3674e346088fc25edf6|42051176155 /no jobs|Qualifier YAML failure|0|
+|051b3fa3296db30c9bdc7bee0277aa0057f0dab2|42051365596 /127328018113|Remaining phase24P3F; subsequent steps skipped|27|
+|9ff0226c23a6a0c1b6a69921c60b7cadec56a72a|42052792433 /127333052666|Held3P; final SDK positive1P; adjacent65P; lint clean|48|
+
+Exact command families:
+~~~sh
+npx eslint lib/mcp-qa-finite-owner-phase-context.mjs test/mcp-qa-finite-owner-qa-sdk-native.test.mjs test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-qa-sdk.mjs test/fixtures/finite-owner-io-fanout.mjs
+# Remaining-only runs add test/fixtures/finite-owner-phase-context.mjs to scoped eslint.
+timeout 300s node --test --test-concurrency=1 --test-name-pattern="fanout causal control|fanout 50ms|fanout fixed two" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+timeout 660s node --test --test-concurrency=1 test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+# Original adjacent command180s included phase-context-native plus the six files below.
+# Remaining phase051 used ROOT's owner/schema + remaining-case positive regex, not the full file.
+timeout 360s node --test --test-concurrency=1 --test-name-pattern="^original retained read blocks foreign root until actual settlement: (held-fetch|held-body|held-cancel)$" test/mcp-qa-finite-owner-phase-context-native.test.mjs
+timeout 150s node --test --test-name-pattern="uninstrumented actual native source/SDK/Unit2a GET POST" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+timeout 240s node --test --test-concurrency=1 test/mcp-qa-finite-owner-request-retention-native.test.mjs test/mcp-qa-finite-owner-request-retention.test.mjs test/mcp-qa-finite-preparation-issuer-native.test.mjs test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-profile.test.mjs test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs
+~~~
+
+The exact interrupted adjacent and27-case remaining-only commands were:
+
+~~~sh
+timeout 180s node --test --test-concurrency=1 test/mcp-qa-finite-owner-phase-context-native.test.mjs test/mcp-qa-finite-owner-request-retention-native.test.mjs test/mcp-qa-finite-owner-request-retention.test.mjs test/mcp-qa-finite-preparation-issuer-native.test.mjs test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-profile.test.mjs test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs
+timeout 360s node --test --test-concurrency=1 --test-name-pattern="^fresh current owner and current publication are independently rechecked: (owner|schema)$|^original primary issuer denies |^original retained read blocks foreign root|^original retained request with 29 seconds|^same ambient original request|^absent exact issuer table|^original issuer reservation|^existing orphan original fence|^failed schema SELECT|^exact original metadata prefix|^missing original ticket|^fresh QA pointer drift|^actual allocated phase fixture|^settled original M journals" test/mcp-qa-finite-owner-phase-context-native.test.mjs
+~~~
+
+These are qualification history, not new product/runtime commands.
+
+Known authored fixture esbuild calls:247, plus at most1 unobserved in-flight invocation at the180s cutoff. Breakdown6+6+(106+54)+0+27+48. Final48 are3 phase worlds,2 SDK roles for one positive,8 owner/transport-retention fixtures,33 issuer scenarios and2 native-profile bundles (nested profile subtests reuse their bundle). There are0 observed esbuild failures/warnings; whether the killed55th phase world's extra call had begun/finished is not logged, so no fabricated exact247/248 total or zero-interruption claim is made. All completed worlds invoke their existing build once per indicated role, and Miniflare internal parsing/JIT is excluded. The original partial command's future test/build work never started. This1-call uncertainty is a delivery concern, not an invitation to rebuild for accounting.
+
+No new compileFiniteNativeStaging, buildFiniteNativePackage, whole npm test/lint/build or build-for-hash invocation is made in this unit. Accepted D0.3 standard evidence at ed63b971 remains the unchanged UNMOUNTED standard graph: M331 inputs/1952076 bytes, QA305 inputs/2021441 bytes; phase context emitted0/receiver/forwarder absent. No production imports/mounts changed. This is not a mounted compiler-budget qualification.
+
+The actual executing SDK component fixture at745 parses QA320 inputs and M187. QA outputs: plain1689478 bytes (1 build), old SDK-observed1692035 (29), new I/O-only1695540 (23). M outputs: plain109279 (1), accepted signal-observed110968 (52); no token-compatible M behavior is removed. Hashes vary with the disclosed SYN ceiling on QA. All106 calls are executing fixture qualification, not standard production graph output. Adjacent phase/retention/issuer/profile components use their existing actual fixture builds; no standard compiler is hidden inside them. The final shared-seed positive at 9ff0226 has QA1689592 bytes/320 inputs/SHAe58f32d73d074c8af7afc793305c38730d7d77fbe7d42129037d8b244e39ef2a and M109279 bytes/187 inputs/SHA518ec6763dc13f8cd1c6dc7b62a4e185bf95767f342954b9908d3bab6a6db734. Its two actual builds are already counted; no extra hash-only compile occurred.
+
+Retained bounded logs show137 RPC-stub lifecycle warnings and62 SDK CIMD notices across the five executing jobs (by job:3/3,3/3,101/54,26/0,4/2 RPC/CIMD). They also retain npm/action/Node deprecations; no scope or dependency/flag change was made to silence them. Scoped ESLint has zero reported errors/warnings; no esbuild diagnostic was hidden. Awaited disposal and explicit hostile settlement probes are present, but these warnings/disposal are not a global physical-drain proof. One attempt to read live job logs returned404 while the blob was unavailable; the completed job logs were then fetched successfully.
+
+## Protected source and outstanding live gates
+
+Fresh final-code-tree metadata confirms these BASE blobs unchanged:
+
+| Path | Blob SHA |
+| --- | --- |
+|lib/delegated-oauth-worker.mjs|d979f395029c9b1e66a99222d06acf99eba4f358|
+|lib/mcp-qa-cloud-closed-pins.mjs|26213123304eea25e652a52d808d25b7e0e3475e|
+|lib/mcp-qa-finite-initial-cleanup.mjs|34a93b63607cff1454f914e16062f17aa3c3e0bb|
+|lib/mcp-qa-finite-initial-entry.mjs|c5ae0f53bee077c693d7f0a0599bbb6347648fee|
+|lib/mcp-qa-finite-initial-lease.mjs|a9cc083baae71c89af2f6436c00571dc8e7a20c9|
+|lib/mcp-qa-finite-owner-oauth-forward.mjs|f7979579fcb6d00b3d5d68c7790089c803f4170f|
+|lib/mcp-qa-finite-owner-oauth-qa.mjs|ec5c16161bffc6e6d19de153b4465bf6ae748493|
+|lib/mcp-qa-finite-preparation-issuer-journal.mjs|414450aa08f797bed5a41cf5cc697342785ce16b|
+|lib/mcp-qa-finite-preparation-issuer-store.mjs|01d1a85eccaa98944b9ce3341db3cd071a4ad24d|
+|lib/mcp-qa-finite-profile.mjs|547eb82f4ec83a2e7bcec88dd18622fc636dc477|
+|lib/mcp-qa-finite-stage-work.mjs|a89baeb2578856dadedf700f9d66e180eb09120e|
+|package-lock.json|36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b|
+|wrangler.independent-closure-qa.finite.jsonc|31c6638c204b631c846a537cbec13b3f9b24e060|
+|wrangler.mcp-own.finite.jsonc|87d3f78c62d373c1f18803da7dc6a4e300caddbf|
+
+Changed product blob85c7105f906b5d7936b4bd205c1f4598f5521546; new I/O fixture8dbbdc542d52078de083d4828d1335ed1bae6254; final suite61aba9c1298f2999dd588f35011502e555df5072; exceptional phase fixturef1ddbfff29b1d5e4da4dbf70c649e0df20582b46. Tree comparison finds only the six authorized source/test files plus the own temporary qualifier before final delivery.
+
+The product ceiling2026-11-03T02:59:00Z stays expired. Initial fixture-only approval/custody/JWKS/provider/ledger/module/history substitutions are SYN; actual SDK crypto, journals, native KV/DO/D1 and original SDK positive execute. The new I/O positives keep actual JS/SQL clocks; existing adjacent historical fixtures explicitly retain their previously accepted SYN time projections, not real-provider operation.
+
+operationalReadiness=false; completePackage=false; PCoff=false. No alias installation, mounted graph, real credentials, runtime/provider timing, Entry/cleanup/notice/subscription/consumer availability or PC-off acceptance follows from these tests. The narrow five-second margin, captured-count uncertainty at the killed process, RPC warnings and staged-head coverage remain explicit limitations. ROOT owns the full actual BASE diff and fresh independent spec/quality review before any next decision.
~~~

~~~diff
diff --git a/lib/mcp-qa-finite-owner-phase-context.mjs b/lib/mcp-qa-finite-owner-phase-context.mjs
--- a/lib/mcp-qa-finite-owner-phase-context.mjs
+++ b/lib/mcp-qa-finite-owner-phase-context.mjs
@@ -135,39 +135,45 @@
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
+   const verifyCredential=async(token,id,expiresAt)=>{
+    const v=finiteCfEnvelope((await request('/tokens/verify',8192,token)).value);fields(v,['id','status','expires_on',...Object.hasOwn(v,'not_before')?['not_before']:[]]);
+    if(v.id!==id||v.status!=='active'||Date.parse(v.expires_on)!==expiresAt||Date.parse(v.expires_on)<=Date.now()||v.not_before!=null&&(!Number.isSafeInteger(Date.parse(v.not_before))||Date.parse(v.not_before)>Date.now()))fail();
+   };
    const credentials=async()=>{
+    const readerWork=retain(Promise.resolve().then(()=>verifyCredential(reader,plan.readerId,plan.readerExpiresAt)));
+    const publisherWork=retain(Promise.resolve().then(()=>verifyCredential(publisher,plan.publisherId,plan.publisherExpiresAt)));
+    const joined=await retain(Promise.allSettled([readerWork,publisherWork]));
+    current(clock.lease);if(joined.some(result=>result.status!=='fulfilled'))fail();
-    for(const [token,id,expiresAt]of [[reader,plan.readerId,plan.readerExpiresAt],[publisher,plan.publisherId,plan.publisherExpiresAt]]){
-     const v=finiteCfEnvelope((await request('/tokens/verify',8192,token)).value);fields(v,['id','status','expires_on',...Object.hasOwn(v,'not_before')?['not_before']:[]]);
-     if(v.id!==id||v.status!=='active'||Date.parse(v.expires_on)!==expiresAt||Date.parse(v.expires_on)<=Date.now()||v.not_before!=null&&(!Number.isSafeInteger(Date.parse(v.not_before))||Date.parse(v.not_before)>Date.now()))fail();
-    }
    };
+   const readQaPrimary=async()=>{
-   const primary=async()=>{
-    await credentials();
     const qaPointer=finiteQaPointer(await request('/workers/scripts/'+QA+'/deployments?per_page=1'));
     if(canonical(qaPointer)!==canonical(material.qaBootstrap.currentPointer))fail();
     const q=finiteCfEnvelope((await request('/workers/workers/'+QA+'/versions/'+qaVersionId+'?include=modules',4500000)).value);
     const configKeys=Object.keys(finitePublicProfileTemplate('qaLive')),wrappers=['id','number','startup_time_ms','annotations','urls','source','created_on','author_id','author_email','modules'];
     fields(q,[...configKeys,...wrappers.filter(k=>Object.hasOwn(q,k))]);
     if(q.id!==qaVersionId||!Array.isArray(q.urls)||q.urls.length||!Array.isArray(q.modules)||q.modules.length!==1)fail();
     const qaModule=fields(q.modules[0],['name','content_type','content_base64']),expectedModule=material.qaBootstrap.record.qaLive.module;
     if(qaModule.name!==expectedModule.name||qaModule.content_type!=='application/javascript+module'||typeof qaModule.content_base64!=='string'||qaModule.content_base64.length>Math.ceil(expectedModule.bytes/3)*4)fail();
     const bytes=Buffer.from(qaModule.content_base64,'base64');
     if(bytes.toString('base64')!==qaModule.content_base64||bytes.length!==expectedModule.bytes||sha(bytes)!==expectedModule.sha256)fail();
     projectFinitePublicConfiguration({role:'qaLive',metadata:Object.fromEntries(configKeys.map(k=>[k,q[k]]))});
+    return {qaMetadata:Object.fromEntries(configKeys.map(k=>[k,q[k]]))};
+   };
+   const readMPrimary=async()=>{
     const pointer=finiteQaPointer(await request('/workers/scripts/'+CANARY+'/deployments?per_page=1'));
 
     const metadata=finiteCfEnvelope((await request('/workers/workers/'+CANARY+'/versions/'+capsule.activatedVersionId+'?include=modules',4500000)).value);
     const configuration=qualifyFiniteInitialUploadedVersion(metadata,capsule.activatedVersionId,plan.configuration,resident.bytes);
     if(restorationConfigurationHash(configuration)!==capsule.configurationHash||finiteInitialCapsuleBindingsHash(configuration.bindings)!==capsule.bindingsHash)fail();
     const binding=name=>configuration.bindings.find(b=>b.name===name),text=name=>binding(name)?.text;
     if(text('AFW_OAUTH_PILOT_CLIENT_ID')!==p.clientId||text('AFW_OAUTH_PILOT_PROJECT_ID')!==p.project.projectId||text('AFW_OAUTH_RESOURCE')!==p.resource||text('ACCESS_TEAM_DOMAIN')!==p.access.teamDomain||text('ACCESS_AUD')!==p.access.audience||text('AFW_OAUTH_PILOT_EXPIRES_AT')!==new Date(capsule.C0).toISOString()||canonical(binding('DELEGATED_RATE_LIMITER'))!==canonical(p.limiter))fail();
     const project=await owned();
     let currentConfiguration=configuration;
     if(pointer.versionId!==capsule.activatedVersionId||pointer.deploymentId!==capsule.activatedDeploymentId){
@@ -176,24 +182,31 @@
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
+    return {project,pointer,currentConfiguration,configuration,initialBaseline:{versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,moduleHash:sha(resident.bytes),configurationHash:finiteActivationConfigurationHash(plan.configuration),bindingsHash:finiteInitialCapsuleBindingsHash(configuration.bindings)}};
+   };
+   const primary=async()=>{
+    await credentials();
+    const qaWork=retain(Promise.resolve().then(readQaPrimary)),mWork=retain(Promise.resolve().then(readMPrimary));
+    const joined=await retain(Promise.allSettled([qaWork,mWork]));
+    current(clock.lease);if(joined.some(result=>result.status!=='fulfilled'))fail();
+    const {qaMetadata}=joined[0].value,{project,pointer,currentConfiguration,configuration,initialBaseline}=joined[1].value;
-    const qaMetadata=Object.fromEntries(configKeys.map(k=>[k,q[k]]));
     const qaSdkBindingFacts=qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata:currentConfiguration});
     qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata:configuration});
+    return {project,pointer,currentConfiguration,qaSdkBindingFacts,initialBaseline};
-    return {project,pointer,currentConfiguration,qaSdkBindingFacts,initialBaseline:{versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,moduleHash:sha(resident.bytes),configurationHash:finiteActivationConfigurationHash(plan.configuration),bindingsHash:finiteInitialCapsuleBindingsHash(configuration.bindings)}};
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
~~~

~~~diff
diff --git a/test/fixtures/finite-initial-entry-world.mjs b/test/fixtures/finite-initial-entry-world.mjs
--- a/test/fixtures/finite-initial-entry-world.mjs
+++ b/test/fixtures/finite-initial-entry-world.mjs
@@ -1,10 +1,11 @@
+import {instrumentFiniteOwnerIo,extendFiniteOwnerIo,delayFiniteOwnerIo} from './finite-owner-io-fanout.mjs';
 import {extendFiniteOwnerQaSdk,finiteOwnerSdkWorkers,instrumentFiniteOwnerQaSdk,instrumentFiniteOwnerQaSdkLate} from './finite-owner-qa-sdk.mjs';
 import {FINITE_PREPARATION_ISSUER_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {extendFiniteOwnerPhaseContext,seedFiniteOwnerPhaseHistory} from './finite-owner-phase-context.mjs';
 import {extendPreparationCleanupFixture} from './finite-preparation-cleanup-entry.mjs';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {gzipSync} from 'node:zlib';
 import {readFile,mkdtemp,rm} from 'node:fs/promises';
 import {tmpdir} from 'node:os';
 import {join,resolve} from 'node:path';
@@ -33,55 +34,58 @@
  const program='SYNTHETIC actual resident candidate program',script='// SYNTHETIC B1 candidate bytes\nexport default{};',bytes=Buffer.from(script),compressed=gzipSync(bytes,{level:9,mtime:0}),resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:M,sourceTree:TREE,sourceCheck:'git-inputs-before-after-v1',programHash:sha(program),module:{name:'index.mjs',sha256:sha(bytes),bytes:bytes.length},compressedSha256:sha(compressed),compressedBytes:compressed.length,content:compressed.toString('base64')};
  const w=await bootstrapWorld({sourceRevision:M,sourceTree:TREE,modules:{qaLive:{module:{name:'index.mjs',sha256:sha('export default{};'),bytes:17,exports:[...finitePublicProfileTemplate('qaLive').exports]}}},files:{'qaLive/index.mjs':'export default{};'}});
  const created=new Date(Math.floor((Date.now()-(['partial','upload-partial'].includes(mode)?40000:1000))/1000)*1000).toISOString().replace('.000Z','Z'),command={id:COMMAND,user:{id:290715446,login:'tokenizartinfo-ops',type:'User'},author_association:'OWNER',body:'/afw-qa-finite-prepare v1 '+M+' '+UUID,created_at:created,updated_at:created,issue_url:GH+'/issues/497'};w.map.set('/issues/comments/'+COMMAND,command);
  const approval=Date.now()+86400000;
  const opScript='// SYN operator closed\nexport default{};',opConfig={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],main_module:'index.mjs',usage_model:'standard',containers:[],exports:{default:{type:'worker'}},bindings:[{name:'RELEASE_DB',type:'d1',id:'6a728254-1494-4039-802e-b39288a55fcc'},{name:'AFW_RELEASE_EVENTS_NODE',type:'durable_object_namespace',namespace_id:'d6fc71552de7494a863aca20365a572d',class_name:'AfwOwnEventNode'},{name:'AFW_RELEASE_OPERATOR_ENABLED',type:'plain_text',text:'false'}]},opPin={...realPins.operator,module:{name:'index.mjs',bytes:Buffer.byteLength(opScript),sha256:sha(opScript)},configurationHash:restorationConfigurationHash(opConfig)},opMetadata={...opConfig,id:opPin.id,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(opScript).toString('base64')}]};
  const f={mf,x,w,command,nowOffset:0,activations:[],restores:[],pointerMode:'baseline',alarmMode:'normal',requests:[],uploads:[],mode,pointerReads:0,tokenReads:0,publisherReads:0,baselineReads:0,held:null,release:null,commandReads:0,approval};
  let entry="\n import{DurableObject}from'cloudflare:workers';\n import*as workflowGate from'./lib/mcp-fixed-terminal-workflows.mjs';\n import*as activationWire from'./lib/mcp-qa-finite-initial-activation-wire.mjs';\n import{readPrivateQaFiniteCandidate}from'./lib/mcp-qa-finite-candidate-residency.mjs';\n import{observeFiniteOwnerRequestWork,observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';\n import{readPrivateQaFiniteInitialOwnerSource}from'./lib/mcp-qa-finite-initial-owner-source.mjs';\n import{preparePrivateQaFiniteOwnerChoice}from'./lib/mcp-qa-finite-owner-preparation-qa.mjs';\n import{createFiniteOwnerRequestLease}from'./lib/mcp-qa-finite-owner-preparation.mjs';\n import*as historySchema from'./lib/mcp-qa-finite-initial-history-schema.mjs';\n import*as oldGuard from'./lib/mcp-qa-finite-initial-old-guard.mjs';\n import*as custodyProbe from'./lib/mcp-qa-finite-initial-custody-probe.mjs';\n import{IndependentClosure as FiniteClosure,PrivateQaBootstrap}from'./worker/independent-closure/finite.mjs';\n import{sealFiniteInitialCapsule}from'./lib/mcp-qa-finite-initial-capsule-records.mjs';\n import{initialCanonical,hashFiniteInitialMaterialRecord}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{initialInstanceId}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as enc}from'./lib/mcp-qa-finite-initial-cleanup-records.mjs';\n const P='afw.finite-initial-cleanup.v1:';\n const KEY='afw.finite-initial-preparation.v1:entry';\n export class Node extends DurableObject{}\n export class Initial extends FiniteClosure{\n async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);await this.ctx.storage.sync();}\n async snapshot(){return[...await this.ctx.storage.list()];}\n async mutateCleanup(key,mode){const k=P+key;if(mode==='delete')await this.ctx.storage.delete(k);else{const kinds={'activation-completion':'ActivationCompletion','restore-ack':'RestoreAck',receipt:'Receipt'},fields={'activation-completion':'ackHash','restore-ack':'sendHash',receipt:'restoreAckHash'},r=JSON.parse(await this.ctx.storage.get(k));delete r.purpose;delete r.recordHash;r[fields[key]]='a'.repeat(64);await this.ctx.storage.put(k,enc(kinds[key],seal(kinds[key],r)));}await this.ctx.storage.sync();}\n async capsuleFacts(){const s=this.ctx.storage,read=async k=>JSON.parse(await s.get(k)),prefix='afw.finite-initial-preparation.v1:',entry=await read(KEY),selector=await read(prefix+'selector');return {entry,claim:await read(prefix+'once'),selector,materialAck:await read(prefix+'ack'),material:await read(prefix+'material:'+selector.materialHash),plan:await read(P+'plan'),state:await read(P+'state'),arm:await read(P+'arm-ack'),send:await read(P+'activation-send'),activationAck:await read(P+'activation-ack'),completion:await read(P+'activation-completion'),recordedAt:Date.now()};}\n async probeCapsuleFacts(input){try{return{ok:true,capsule:sealFiniteInitialCapsule(input)};}catch{return{ok:false};}}\n async seedFutureActivation(kind='complete'){\n  // SYN FUTURE INPUT: production forward activation producer is deliberately ABSENT.\n  const p=JSON.parse(await this.ctx.storage.get(P+'plan')),annotation='afw-finite-initial-activate-'+p.recordHash,body=JSON.stringify({strategy:'percentage',versions:[{version_id:p.candidateVersionId,percentage:100}],annotations:{'workers/message':annotation}});\n  const arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),issuedAt=kind==='pre-arm'?arm.acknowledgedAt-1:arm.acknowledgedAt,deadline=Math.min(p.forwardDeadline,issuedAt+5000);if(issuedAt<p.I0||deadline-issuedAt<4)throw Error('SYN forward deadline insufficient');const send=seal('ActivationSend',{planHash:p.recordHash,entryHash:p.entryHash,materialHash:p.materialHash,candidateVersionId:p.candidateVersionId,bodyHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(body)).then(b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')),annotation,issuedAt,deadline});\n  await this.ctx.storage.put(P+'activation-send',enc('ActivationSend',send));if(kind==='send')return;\n  const ack=seal('ActivationAck',{planHash:p.recordHash,sendHash:send.recordHash,deploymentId:'66666666-6666-4666-8666-666666666666',acknowledgedAt:issuedAt+1});\n  await this.ctx.storage.put(P+'activation-ack',enc('ActivationAck',ack));if(kind==='ack')return;\n  const completion=seal('ActivationCompletion',{planHash:p.recordHash,sendHash:send.recordHash,ackHash:ack.recordHash,candidateVersionId:p.candidateVersionId,deploymentId:ack.deploymentId,settledAt:issuedAt+2,observedAt:issuedAt+3});\n  await this.ctx.storage.put(P+'activation-completion',enc('ActivationCompletion',completion));await this.ctx.storage.sync();\n }\n async probeActivationWire(metadata,mode='normal'){\n  try{\n   const plan=JSON.parse(await this.ctx.storage.get(P+'plan')),arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),entry=JSON.parse(await this.ctx.storage.get(KEY));\n   if(mode==='arm')arm.alarmAt++;\n   const issuedAt=arm.acknowledgedAt-(mode==='issued-before-arm'?1:0),deadline=mode==='deadline-too-long'?issuedAt+5001:Math.min(plan.forwardDeadline,issuedAt+5000),wire=activationWire.prepareFiniteInitialActivationWire({plan,arm,entry,issuedAt,deadline});\n   const result={id:'66666666-6666-4666-8666-666666666666',...JSON.parse(wire.body)};\n   if(mode==='wrong-version')result.versions[0].version_id=plan.baselineVersionId;\n   if(mode==='wrong-annotation')result.annotations['workers/message']='SYN invalid';\n   const ack=activationWire.qualifyFiniteInitialActivationAck({plan,send:wire.send,result,acknowledgedAt:mode==='ack-after-deadline'?deadline:issuedAt+1});\n   if(mode==='wrong-deployment')result.id='77777777-7777-4777-8777-777777777777';\n   if(mode==='wrong-module')metadata.modules[0].content_base64='AAAA';\n   let candidateBytes=readPrivateQaFiniteCandidate().bytes;\n   if(mode==='coherent-wrong-module'){candidateBytes=new TextEncoder().encode('SYN coherently altered module');metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   if(mode==='same-size-wrong-module'){candidateBytes=candidateBytes.slice();candidateBytes[0]^=1;metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   const completion=activationWire.qualifyFiniteInitialActivationCompletion({plan,send:wire.send,ack,pointer:result,metadata,bytes:candidateBytes,settledAt:issuedAt+2,observedAt:mode==='observation-after-deadline'?deadline:issuedAt+3});\n   return{status:'proposal_only',wire,ack,completion};\n  }catch{return{status:'rejected'};}\n }\n\n async ownerSourceRead(delta=400000,mode='normal',preconnectionId=null,token=null){\n  const s=this.ctx.storage,raw=JSON.parse(await s.get('afw.finite-initial-preparation.v1:capsule')),now=Date.now,get=s.get,list=s.list,alarm=s.getAlarm,put=s.put,transaction=s.transaction,sync=s.sync,fetcher=globalThis.fetch,version=this.env.AFW_QA_VERSION,node=this.env.AFW_RELEASE_EVENTS_NODE,db=this.env.RELEASE_DB,withSession=db.withSession;let offset=raw.I0+delta-now(),reads=0,capsuleReads=0;\n  Date.now=()=>now()+offset;\n  const requestAbort=new AbortController(),request=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{signal:requestAbort.signal,headers:token?{'Cf-Access-Jwt-Assertion':token}:{}}),entry=createFiniteOwnerRequestLease(request);\n  if(mode==='request-budget')offset+=29900;this.ownerEffects=0;\n  const noWrite=()=>{this.ownerEffects++;throw Error('SYN owner reader attempted a write');};if(mode!=='private-choice'){s.put=noWrite;s.transaction=noWrite;s.sync=noWrite;}\n  if(['held-fetch','held-body','held-cancel'].includes(mode)){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(fetcher,globalThis,args).then(async response=>{\n   if(mode==='held-fetch')return new Promise(resolve=>{owner.releaseHeld=()=>resolve(response);});\n   await response.body.cancel();\n   if(mode==='held-cancel')return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{status:401,headers:response.headers});\n   let pulled=false;return new Response(new ReadableStream({pull(controller){if(pulled)return;pulled=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers});\n  });}\n  s.get=async(...a)=>{const v=await Reflect.apply(get,s,a);reads++;if(a[0].endsWith(':capsule'))capsuleReads++;\n   if(['held-read','request-budget','nested-request-held-read'].includes(mode)&&reads===1)return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n   if(mode==='holder-drift'&&reads===1)this.env.AFW_RELEASE_EVENTS_NODE={};\n   if(mode==='backward'&&reads===1)offset-=100;\n   if(mode==='parent-deadline'&&reads===1)offset+=30001;\n   if(mode==='aborted'&&reads===1)entry.finish();if(mode==='request-abort'&&reads===1)requestAbort.abort();\n   if(mode==='missing'&&a[0].endsWith(':capsule'))return undefined;\n   if(mode==='malformed'&&a[0].endsWith(':capsule'))return v+' ';\n   if(mode==='hash'&&a[0].endsWith(':capsule')){const x=JSON.parse(v);x.bindingsHash='f'.repeat(64);return initialCanonical(x);}\n   if(mode==='material'&&a[0].includes(':material:'))return v+' ';\n   if(mode.startsWith('anchor-')&&a[0].endsWith(':'+mode.slice(7)))return v+' ';\n   if(mode==='changed-anchor'&&capsuleReads>1&&a[0].endsWith(':capsule'))return v+' ';\n   return v;\n  };\n  s.getAlarm=(...a)=>mode==='alarm'?Promise.resolve(raw.C0+1):Reflect.apply(alarm,s,a);\n  s.list=(...a)=>Reflect.apply(list,s,a).then(rows=>{if(mode.startsWith('anchor-')&&rows.has(P+mode.slice(7)))rows.set(P+mode.slice(7),rows.get(P+mode.slice(7))+' ');if(mode==='transition'&&a[0]?.prefix===P)rows.set(P+'restore-send','SYN transition');if(mode==='head'&&a[0]?.prefix==='afw.qa-finite-trial.v1:')rows.set('afw.qa-finite-trial.v1:head','SYN head');if(mode==='publication'&&a[0]?.prefix==='afw.finite-policy-effect.v1:')rows.set(a[0].prefix+'writer-head','SYN publication');return rows;});\n  if(mode==='wrong-version')this.env.AFW_QA_VERSION={id:'99999999-9999-4999-8999-999999999999'};\n  const ctx=mode==='wrong-actor'?{storage:s,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('SYN-wrong')}:this.ctx;\n  const restore=()=>{Date.now=now;s.get=get;s.list=list;s.getAlarm=alarm;s.put=put;s.transaction=transaction;s.sync=sync;globalThis.fetch=fetcher;this.env.AFW_QA_VERSION=version;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=withSession;};\n  this.ownerRestore=restore;\n  try{if(mode==='private-choice')return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>preparePrivateQaFiniteOwnerChoice({ctx,env:this.env,request},entry.lease));if(mode.startsWith('nested-request'))return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId}));if(mode==='untrusted-parent')return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:{signal:entry.lease.signal,assertCurrent:()=>{}},preconnectionId});return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId});}\n  catch{return{status:'unavailable'};}finally{entry.finish();restore();}\n }\n\n async ownerEffectCount(){return this.ownerEffects??0;}\n async preEntryCustody(mode='normal'){const ctx=mode==='wrong-actor'?{storage:this.ctx.storage,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('wrong-actor')}:this.ctx;return await custodyProbe.readFinitePreEntryCustody({ctx,env:this.env});}\n async probeStageAvailability(){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{}}),admission=Object.freeze({lease});try{await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},async()=>true);return{available:true};}catch{return{available:false};}finally{controller.abort();}}\n async probeNativeCustody(mode='normal'){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}}),admission=Object.freeze({lease});try{if(mode==='aborted')controller.abort();if(mode==='unscoped')return await custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease);return await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},()=>custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease));}catch{return{status:'unavailable'};}finally{controller.abort();}}\n async probeOldGuard(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await oldGuard.readFiniteInitialOldGuard({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeHistorySchema(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await historySchema.readFiniteInitialHistorySchema({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeInitialInventory(){try{const raw=await this.ctx.storage.get(KEY),entry=JSON.parse(raw),read=async(path,query)=>{const url='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec'+path+(query?'?'+new URLSearchParams(query):''),r=await fetch(url,{headers:{Authorization:'Bearer '+this.env.AFW_MCP_CLOSURE_READ_TOKEN}}),v=await r.json();return{value:v.result,info:v.result_info};};return await workflowGate.readFiniteInitialAfwWorkflows({read,assertCurrent:()=>{},entry});}catch{return{status:'unavailable'};}}\n async initialAlarmAt(at){const original=Date.now,offset=at-original(),db=this.env.RELEASE_DB,withSession=db.withSession;\n  // SYN time advance: keep native D1 query and data, shift only its SQL clock to match worker clock.\n  db.withSession=(...args)=>{const session=Reflect.apply(withSession,db,args),prepare=session.prepare;session.prepare=sql=>Reflect.apply(prepare,session,[sql.replace(' AS INTEGER) dbNow',' AS INTEGER)+'+offset+' dbNow')]);return session;};\n  Date.now=()=>original()+offset;try{return await this.alarm();}finally{Date.now=original;db.withSession=withSession;}}\n async alarmInfo(){return this.ctx.storage.getAlarm();}\n async initialAlarm(){return this.alarm();}\n async nominalAlarmData(){const r=await this.alarm();return {state:await r?.state};}\n async installAlarm(at){return this.ctx.storage.setAlarm(at);}\n async configure(mode){\n  this.localBodyCancelled=false;const actualFetch=globalThis.fetch;\n  if(mode==='late-body-observe'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).includes('/instances-v2?state=active'))return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){owner.localBodyCancelled=true;}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-cancel'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-read'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});let requested=false;return new Response(new ReadableStream({pull(controller){if(requested)return;requested=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  this.fault=mode;this.transactions=0;this.syncs=0;this.callbacks=0;this.uploadStage=null;this.uploadTransactions=0;this.cleanupStage=null;this.activationStage=null;this.capsuleStage=false;this.capsuleTransactions=0;\n  const s=this.ctx.storage,nt=s.transaction,ns=s.sync,ng=s.get,db=this.env.RELEASE_DB,node=this.env.AFW_RELEASE_EVENTS_NODE,dbSession=db.withSession,nodeString=node.idFromString,publisher=this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,nga=s.getAlarm,nlist=s.list;\n  this.restore=()=>{globalThis.fetch=actualFetch;s.transaction=nt;s.sync=ns;s.get=ng;s.getAlarm=nga;s.list=nlist;this.env.RELEASE_DB=db;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=dbSession;node.idFromString=nodeString;this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=publisher;};\n  s.transaction=(fn,...args)=>{\n   const n=++this.transactions;\n   if(n===1&&mode==='changed-db-with-session')db.withSession=(...args)=>Reflect.apply(dbSession,db,args);\n   if(n===1&&mode==='changed-node-id-from-string')node.idFromString=(...args)=>Reflect.apply(nodeString,node,args);\n   if(mode==='never-commit'&&n===1)return Promise.reject(Error('SYN precommit failure'));\n   if(mode==='callback-retry'&&n===1)return(async()=>{\n    let candidate;\n    await Reflect.apply(nt,s,[async tx=>{this.callbacks++;await fn(tx);candidate=await tx.get(KEY);tx.rollback();}]);\n    await s.put(KEY,candidate);await Reflect.apply(ns,s,[]);\n    return Reflect.apply(nt,s,[async tx=>{this.callbacks++;return fn(tx);}]);\n   })();\n   let stage,sendPair,arm=false,armRows=[],activationStage,capsuleWrite=false;\n   const capsuleTx=this.activationStage==='completion';if(capsuleTx)this.capsuleTransactions++;\n   const wrapped=async tx=>{\n    const actual=await fn({get:async(...a)=>{\n     const value=await tx.get(...a);\n     if(capsuleTx){\n      const k=a[0],prefix='afw.finite-initial-preparation.v1:',aliases={entry:KEY,claim:prefix+'once',selector:prefix+'selector',materialAck:prefix+'ack',material:k.startsWith(prefix+'material:')?k:null,plan:P+'plan',state:P+'state',arm:P+'arm-ack',send:P+'activation-send',activationAck:P+'activation-ack',completion:P+'activation-completion',head:'afw.qa-finite-trial.v1:head'};\n      if(mode.startsWith('capsule-missing-')&&k===aliases[mode.slice(16)])return undefined;\n      if(mode.startsWith('capsule-mismatch-')&&k===aliases[mode.slice(17)])return value+' ';\n      if(mode==='capsule-coherent-ack'&&k===prefix+'ack'){const v=JSON.parse(value);v.acknowledgedAt++;return initialCanonical(v);}\n      if(mode==='capsule-coherent-claim'&&k===prefix+'once'){const v=JSON.parse(value);v.deadline--;v.claimHash=hashFiniteInitialMaterialRecord('InitialClaim',v);return initialCanonical(v);}\n      if(mode==='capsule-finite-head'&&k===aliases.head)return {intentId:'SYN conflict'};\n     }\n     return value;\n    },setAlarm:mode==='cleanup-missing-tx-alarm'?undefined:(...a)=>tx.setAlarm(...a),deleteAlarm:(...a)=>tx.deleteAlarm(...a),put:async(k,v)=>{\n     if(k==='afw.finite-initial-preparation.v1:capsule')capsuleWrite=true;\n     if(k===P+'plan'||k===P+'state'){arm=true;armRows.push([k,v]);}\n     if(k.startsWith(P+'activation-'))activationStage=k.slice((P+'activation-').length);\n     if(k.startsWith('afw.finite-initial-upload.v1:')){stage=k.split(':').at(-1);if(stage==='send'){sendPair=[k,v];this.uploadTransactions++;if(mode==='upload-publisher-drift')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';}}\n     return tx.put(k,v);\n    }});\n    if(arm&&mode==='cleanup-callback-retry')tx.rollback();\n    if(arm&&mode==='cleanup-never-commit'){tx.rollback();throw Error('SYN cleanup precommit');}\n    if(stage==='send'&&mode==='upload-callback-retry')tx.rollback();\n    if(stage==='send'&&mode==='upload-never-commit'){tx.rollback();throw Error('SYN upload precommit rejected');}\n    return actual;\n   };\n   const actual=Reflect.apply(nt,s,[mode.startsWith('upload-')||mode.startsWith('cleanup-')||mode.startsWith('activation-storage-')||mode.startsWith('capsule-')?wrapped:fn,...args]).then(v=>{this.uploadStage=stage??this.uploadStage;if(arm)this.cleanupStage='plan';if(activationStage)this.activationStage=activationStage;if(capsuleWrite)this.capsuleStage=true;return v;});\n   if(mode==='capsule-held-transaction')return actual.then(v=>capsuleWrite?new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}):v);\n   if(mode==='capsule-return-lost'||mode==='capsule-completion-return-lost')return actual.then(v=>{if(capsuleWrite||mode==='capsule-completion-return-lost'&&activationStage==='completion')throw Error('SYN journal transaction return lost');return v;});\n   if(mode==='activation-storage-return-lost')return actual.then(v=>{if(activationStage==='send')throw Error('SYN committed SEND return lost');return v;});\n   if(mode.startsWith('cleanup-'))return actual.then(async v=>{\n    if(arm&&mode==='cleanup-callback-retry'){for(const row of armRows)await s.put(...row);const p=JSON.parse(armRows.find(([k])=>k===P+'plan')[1]);await s.setAlarm(p.C0);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(arm&&mode==='cleanup-final-return-lost'){await Reflect.apply(ns,s,[]);throw Error('SYN final cleanup transaction return lost');}\n    return v;\n   });\n   if(mode.startsWith('upload-'))return actual.then(async v=>{\n    if(stage==='send'&&mode==='upload-callback-retry'){await s.put(...sendPair);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(stage==='send'&&mode==='upload-lost-send-ack'){await Reflect.apply(ns,s,[]);throw Error('SYN upload committed ACK lost');}\n    if(stage==='send'&&mode==='upload-held-send')return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n    return v;\n   });\n   if(mode==='lost-ack'&&n===1)return actual.then(async()=>{await Reflect.apply(ns,s,[]);throw Error('SYN committed ACK lost');});\n   if(mode==='changed-sync'&&n===1)return actual.then(v=>{s.sync=()=>Promise.resolve();return v;});\n   if(mode==='held-transaction'&&n===1)return actual.then(v=>new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}));\n   return actual;\n  };\n  s.sync=(...args)=>{\n   const n=++this.syncs,actual=Reflect.apply(ns,s,args);\n   if(mode==='capsule-sync-lost'&&this.capsuleStage||mode==='capsule-completion-sync-lost'&&this.activationStage==='completion')return actual.then(()=>{throw Error('SYN capsule sync lost');});\n   if(mode==='capsule-held-sync'&&this.capsuleStage)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='capsule-holder-drift'&&this.capsuleStage)return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n   if(mode==='capsule-expired-completion'&&this.activationStage==='completion')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='activation-storage-sync-lost'&&this.activationStage==='send')return actual.then(()=>{throw Error('SYN SEND sync lost');});\n   if(mode==='cleanup-reject-sync'&&this.cleanupStage==='plan')return actual.then(()=>{throw Error('SYN cleanup sync lost');});\n   if(mode==='cleanup-hold-sync'&&this.cleanupStage==='plan')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='cleanup-nominal-conflict'&&this.uploadStage==='receipt')return actual.then(()=>s.put('afw.qa-finite-trial.v1:head',{intentId:'SYN conflict'}));\n   if(mode==='cleanup-publisher-drift'&&this.cleanupStage==='plan')return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n\n   if(mode==='upload-reject-sync'&&this.uploadStage==='send')return actual.then(()=>{throw Error('SYN upload sync ACK lost');});\n   if(mode==='upload-hold-sync'&&this.uploadStage==='send'||mode==='upload-hold-ack-sync'&&this.uploadStage==='ack')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(['upload-chunk-tamper','upload-config-tamper'].includes(mode)&&n===3)return actual.then(async()=>{for(const[k,v]of await s.list()){if(mode==='upload-chunk-tamper'?k.includes(':chunk:'):k.endsWith(':backup')){const x=JSON.parse(v);if(mode==='upload-chunk-tamper')x.content='AAAA';else x.rawConfiguration.usage_model='changed';await s.put(k,JSON.stringify(x));break;}}});\n\n   if(mode==='reject-sync'&&n===1||mode==='post-reject-sync'&&n===2)return actual.then(()=>{throw Error('SYN sync ACK lost');});\n   if(mode==='hold-sync'&&n===1||mode==='post-hold-sync'&&n===2)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   return actual;\n  };\n  if(mode.startsWith('capsule-'))s.get=async(...a)=>{\n   const value=await Reflect.apply(ng,s,a),key=a[0];\n   if(key==='afw.finite-initial-preparation.v1:capsule'&&value!==undefined){\n    if(mode==='capsule-readback-lost')throw Error('SYN capsule readback lost');\n    if(mode==='capsule-held-readback')return new Promise(resolve=>{this.releaseHeld=()=>resolve(value);});\n   }\n   if(mode==='capsule-completion-readback-lost'&&key===P+'activation-completion'&&value!==undefined)throw Error('SYN completion readback lost');\n   return value;\n  };\n  if(mode==='upload-readback-tamper')s.get=async(...a)=>{const value=await Reflect.apply(ng,s,a);return a[0].startsWith('afw.finite-initial-upload.v1:')&&a[0].endsWith(':send')&&value!==undefined?value+' ':value;};\n  if(mode==='gate-retention'){\n   db.withSession=(...args)=>{\n    const session=Reflect.apply(dbSession,db,args),prepare=session.prepare;\n    session.prepare=(sql,...more)=>{\n     const statement=Reflect.apply(prepare,session,[sql,...more]);\n     if(sql.includes('FROM sqlite_schema')){\n      const all=statement.all;\n      statement.all=(...params)=>Reflect.apply(all,statement,params).then(value=>new Promise(resolve=>{this.releaseHeld=()=>resolve(value);}));\n     }\n     return statement;\n    };\n    return session;\n   };\n  }\n  if(mode==='missing-get-alarm')s.getAlarm=undefined;\n  if(mode==='late-initial-journal'||mode==='preexisting-send'){let reads=0;s.list=(...args)=>Reflect.apply(nlist,s,args).then(async rows=>{if(++reads===3){if(mode==='preexisting-send')await s.put(P+'activation-send','SYN conflict');rows.set(P+'activation-send','SYN conflict');}return rows;});}\n  if(mode==='missing-list')s.list=undefined;\n  if(mode==='cleanup-alarm-ack-lost')s.getAlarm=(...a)=>this.cleanupStage==='plan'?Promise.reject(Error('SYN native alarm ACK lost')):Reflect.apply(nga,s,a);\n  if(mode==='missing-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=undefined;\n  if(mode==='invalid-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='bad token';\n  if(mode==='missing-sync')s.sync=undefined;\n  if(mode==='missing-db')this.env.RELEASE_DB=undefined;\n  if(mode==='missing-node')this.env.AFW_RELEASE_EVENTS_NODE=undefined;\n  if(mode==='missing-db-with-session')db.withSession=undefined;\n  if(mode==='noncallable-db-with-session')db.withSession=0;\n  if(mode==='missing-node-id-from-string')node.idFromString=undefined;\n  if(mode==='noncallable-node-id-from-string')node.idFromString=0;\n }\n async invoke(refs){return typeof this.prepareFiniteInitialMaterial==='function'?this.prepareFiniteInitialMaterial(refs):{status:'admin_pending',mayRetry:false,operationalReadiness:false};}\n async release(){this.releaseHeld?.();this.releaseHeld=null;}\n async releaseBodyCancel(){this.releaseCancel?.();this.releaseCancel=null;}\n async releaseBodyRead(){this.releaseRead?.();this.releaseRead=null;}\n async stats(){return{transactions:this.transactions,capsuleTransactions:this.capsuleTransactions,capsuleStage:this.capsuleStage,syncs:this.syncs,callbacks:this.callbacks,uploadTransactions:this.uploadTransactions,uploadStage:this.uploadStage,held:typeof this.releaseHeld==='function',bodyCancelled:this.localBodyCancelled===true,cancelHeld:typeof this.releaseCancel==='function',readHeld:typeof this.releaseRead==='function'};}\n async restoreMethods(){this.releaseHeld?.();this.releaseRead?.();this.releaseCancel?.();this.restore?.();}\n\n }export default{async fetch(request,env){const refs=await request.json();\n  const event={payload:{operation:'finite_initial_preparation',commandId:refs.commandId,sourceRevision:refs.sourceRevision,qaVersionId:refs.qaVersionId},timestamp:new Date(refs.createdAt),instanceId:refs.initialInstanceId,workflowName:refs.workflowName};\n  // Explicit SYN event/step delivery; actual production Workflow class/run and DO RPC.\n  let config;const step={do:async(name,options,fn)=>{config={name,options};return fn();}};\n  const result=await PrivateQaBootstrap.prototype.run.call({env:env},event,step);return Response.json({result,config});}};\n";
  if(mode.startsWith('enrollment'))entry=extendPreparationCleanupFixture(entry);
  if(mode.startsWith('phase-context'))entry=extendFiniteOwnerPhaseContext(entry);
  if(mode.startsWith('phase-context-sdk'))entry=extendFiniteOwnerQaSdk(entry,{observed:mode.startsWith('phase-context-sdk-observed')});
+ if(mode==='phase-context-sdk-io')entry=extendFiniteOwnerIo(entry);
  let product;try{product=await readFile('lib/mcp-qa-finite-initial-material.mjs','utf8');}catch{product='export function createPrivateQaFiniteInitialMaterial(){return{collect:async()=>({status:"admin_pending"}),assertCurrent(){throw Error("missing original factual producer");}};}';}
  const approvalDecl="CEILING=Date.parse('2026-11-03T02:59:00Z')";
  if(product.includes(approvalDecl)){assert.equal(product.split(approvalDecl).length,2);product=product.replace(approvalDecl,'CEILING='+approval);}
  const sources=new Map();
  for(const p of ['mcp-qa-finite-initial-entry.mjs','mcp-qa-finite-initial-entry-records.mjs','mcp-qa-finite-initial-capsule-records.mjs','mcp-qa-finite-initial-cleanup.mjs']){try{const s=await readFile('lib/'+p,'utf8');sources.set(p,s.replaceAll("Date.parse('2026-11-03T02:59:00Z')",String(approval)));}catch{/* RED: finite class has no entry yet. */}}
  for(const p of ['mcp-qa-finite-historical-source.mjs','mcp-qa-finite-bootstrap-native.mjs']){
   const s=await readFile('lib/'+p,'utf8');assert.equal(s.split(approvalDecl).length,2);sources.set(p,s.replace(approvalDecl,'CEILING='+approval));
  }
  if(mode.startsWith('phase-context-sdk-observed')){
   // Test-only error-location observation; no return/guard/authority replacement.
   const instrument=source=>source.replaceAll('catch{return pending();}',"catch(error){console.info('D02 initial failure frames',String(error?.stack??'').split('\\n').slice(1,5).join(' | '));if(/^Finite historical source unavailable:(input|custody|http|metadata|historical_slots|legacy|history|coherence|deadline)$/.test(error?.message??''))console.info('D02 historical gate',error.message);return pending();}");
   product=instrument(product);
   sources.set('mcp-qa-finite-initial-entry.mjs',instrument(sources.get('mcp-qa-finite-initial-entry.mjs')));
  }
  const plugin={name:'explicit-SYN-external-data-not-whole-facts',setup(b){
+  if(mode==='phase-context-sdk-io')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerIo(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode==='phase-context-sdk-token-late')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdkLate(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode.startsWith('phase-context-sdk-observed'))b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdk(await readFile(args.path,'utf8')),loader:'js'}));
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
  const built=await build({metafile:true,stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],plugins:[plugin],define:{'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':J(resident),'globalThis.__AFW_QA_SOURCE_REVISION__':J(M),'globalThis.__AFW_FINITE_SOURCE_TREE__':J(TREE),'globalThis.__AFW_NODE_PROGRAM__':J(program),'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':J(w.expected)}});
  if(mode.startsWith('phase-context-sdk'))console.info('D02 fixture QA compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:sha(built.outputFiles[0].contents),inputs:Object.keys(built.metafile.inputs).length}));
  let finalOptions={...base,script:built.outputFiles[0].text,outboundService:async req=>{
+  await delayFiniteOwnerIo(f,req);
   if(req.url.endsWith('/cdn-cgi/access/certs'))return Response.json({keys:[jwk]});
   f.requests.push(req.url);(f.observationTimes??=[]).push({at:Date.now(),method:req.method,kind:new URL(req.url).origin==='https://api.cloudflare.com'?'provider':'ledger'});(f.requestMethods??=[]).push(req.method);
   let value;
   if(req.url.startsWith(GH)){
    assert.equal(req.headers.get('authorization'),null);value=structuredClone(await w.get(req.url.slice(GH.length)));
    if(req.url===GH+'/issues/comments/'+COMMAND){f.commandReads++;if(mode==='wrong-owner')value.user.id=1;if(mode==='wrong-repository')value.issue_url='https://api.github.com/repos/other/repo/issues/497';if(mode==='wrong-issue')value.issue_url=GH+'/issues/498';if(mode==='wrong-source')value.body=value.body.replace(M,'e'.repeat(40));if(mode==='wrong-qa')value.body=value.body.replace(UUID,'44444444-4444-4444-8444-444444444444');if(mode==='edited')value.updated_at=new Date(Date.parse(created)+1).toISOString();if(mode==='expired-command')value.created_at=value.updated_at=new Date(Date.now()-300001).toISOString();if(mode==='command-drift'&&f.commandReads===2)value.body+=' '; }
   }else{
    assert.ok(['Bearer synthetic-native-reader','Bearer synthetic-native-publisher'].includes(req.headers.get('authorization')));
    let result;
    if(req.url===CF+'/tokens/verify'){if(mode==='custody-hold'){f.held='custody-read';await new Promise(resolve=>{f.release=resolve;});}result={id:req.headers.get('authorization')==='Bearer synthetic-native-reader'?'9aa97ad1fc9afe3021cf69ea497d5190':'05718105dcdfc92e55cc3624172c2740',status:'active',expires_on:new Date(approval+60000).toISOString(),not_before:null};}
@@ -191,21 +195,21 @@
     if(mode==='publisher-revoked-before-send'&&role==='publisher'&&f.publisherReads>=3)result.status='disabled';
     if(mode===role+'-wrong-id')result.id='0'.repeat(32);
     if(mode===role+'-inactive')result.status='disabled';
     if(mode===role+'-expired')result.expires_on=new Date(Date.now()-1).toISOString();
     if(mode===role+'-not-before')result.not_before=new Date(Date.now()+60000).toISOString();
    }
    value={success:true,errors:[],messages:[],result};
   }
   return Response.json(value,{headers:{date:new Date(Date.now()+f.nowOffset).toUTCString(),'x-ratelimit-remaining':'60'}});
  }};
+ if(mode.startsWith('phase-context-sdk')){finalOptions=await finiteOwnerSdkWorkers(finalOptions,{observed:mode.startsWith('phase-context-sdk-observed'),token:mode.includes('-token'),io:mode==='phase-context-sdk-io'});f.sdkProfiles=Object.fromEntries(finalOptions.workers.map(worker=>[worker.name,{compatibilityDate:worker.compatibilityDate,compatibilityFlags:worker.compatibilityFlags}]));console.info('D02 actual Miniflare SDK profiles',JSON.stringify(f.sdkProfiles));}
- if(mode.startsWith('phase-context-sdk')){finalOptions=await finiteOwnerSdkWorkers(finalOptions,{observed:mode.startsWith('phase-context-sdk-observed'),token:mode.includes('-token')});f.sdkProfiles=Object.fromEntries(finalOptions.workers.map(worker=>[worker.name,{compatibilityDate:worker.compatibilityDate,compatibilityFlags:worker.compatibilityFlags}]));console.info('D02 actual Miniflare SDK profiles',JSON.stringify(f.sdkProfiles));}
  finalOptions=convertV4MiniflareOptions(finalOptions);
  await mf.setOptions(finalOptions);
  const bindings=await mf.getBindings(mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB',mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);
  if(mode.startsWith('phase-context-sdk'))console.info('D02 native identity comparison',JSON.stringify({provisionalWorker:base.name,finalWorker:'qa-sdk',original:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-one-occurrence-v1').toString()===x.ids.original,candidate:bindings.AFW_RELEASE_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1').toString()===x.ids.candidate}));
  if(mode.startsWith('phase-context')){try{if(mode==='phase-context-init-failure')throw Error('SYN phase fixture initialization failed');await seedFiniteOwnerPhaseHistory(f.db,x,seedInitialHistory);for(const sql of FINITE_PREPARATION_ISSUER_SCHEMA)await f.db.prepare(sql).run();}catch(error){await disposeFailedInitialization();error.fixtureDisposed=true;throw error;}}else await seedInitialHistory(f.db,x);await f.stub.seed(x.rows);f.resident=resident;
  if(mode==='invalid-owned-revision')await f.db.prepare('UPDATE site_projects SET revision=0').run();
  if(mode==='wrong-owned-subject')await f.db.prepare("UPDATE site_projects SET user_id='another-owner'").run();
  f.namespace=bindings.AFW_INDEPENDENT_CLOSURE;
  f.workflow=async refs=>(await f.mf.dispatchFetch('https://synthetic.invalid/workflow',{method:'POST',body:J(refs)})).json();
  f.restart=async()=>{assert.ok(persist);await f.mf.dispose();f.mf=new Miniflare(finalOptions);const b=await f.mf.getBindings(mode.startsWith('phase-context-sdk')?'qa-sdk':undefined);if(mode.startsWith('phase-context-sdk'))f.db=await f.mf.getD1Database('RELEASE_DB','qa-sdk');f.stub=b.AFW_INDEPENDENT_CLOSURE.get(b.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));};
~~~

~~~diff
diff --git a/test/fixtures/finite-owner-io-fanout.mjs b/test/fixtures/finite-owner-io-fanout.mjs
new file mode 100644
--- /dev/null
+++ b/test/fixtures/finite-owner-io-fanout.mjs
@@ -0,0 +1,84 @@
+// Fixed test-only I/O observation. No SDK/KV wrapper or strict-source probe.
+export function instrumentFiniteOwnerIo(source){
+ const once=(needle,replacement)=>{if(source.split(needle).length!==2)throw Error('SYN I/O marker changed: '+needle);source=source.replace(needle,replacement);};
+ const runtime=String.raw`
+const ioState=()=>globalThis.__finiteIo;
+const ioBegin=(path,token,reader,snapshot)=>{
+ const s=ioState();if(!s)return null;
+ if(s.rows.length>=1024)throw Error('SYN bounded I/O trace');
+ const category=path==='/tokens/verify'?(token===reader?'verify-reader':'verify-publisher'):path.includes('independent-closure-qa/deployments')?'qa-deployment':path.includes('independent-closure-qa/versions')?'qa-version':path.includes('/deployments')?'m-deployment':path.includes('/55555555-5555-4555-8555-555555555555?')?'m-initial-version':'m-current-version';
+ const row={category,method:'GET',ordinal:s.rows.length+1,snapshot,branch:category.startsWith('verify-')?'credentials':category.startsWith('qa-')?'qa':'m',startedAt:Date.now(),startMono:performance.now(),bytes:0,outcome:'pending'};
+ s.rows.push(row);s.active++;s.peak=Math.max(s.peak,s.active);return row;
+};
+const ioResponse=async(response,row)=>{
+ const s=ioState();if(!s||!row)return response;
+ if(s.fail===row.category){await response.body.cancel();return new Response(null,{status:503,headers:response.headers});}
+ if(s.hold!==row.category||s.holdUsed)return response;
+ s.holdUsed=true;const bytes=new Uint8Array(await response.arrayBuffer());let pulled=false;
+ return new Response(new ReadableStream({
+  pull(controller){
+   if(pulled){controller.close();return;}pulled=true;s.held={category:row.category,phase:'body'};
+   return new Promise(resolve=>{s.releaseRead=()=>{s.releaseRead=null;s.held=null;controller.enqueue(bytes);resolve();};if(s.autoRelease)s.releaseRead();});
+  },
+  cancel(){
+   s.held={category:row.category,phase:'cancel'};row.cancelHeldAt=performance.now();
+   return new Promise(resolve=>{s.releaseCancel=()=>{s.releaseCancel=null;s.held=null;row.cancelReleasedAt=performance.now();resolve();};if(s.autoRelease)s.releaseCancel();});
+  }
+ },{highWaterMark:0}),{status:response.status,headers:response.headers});
+};
+const ioCheckpoint=async name=>{
+ const s=ioState();if(!s||s.checkpoint!==name||s.snapshots!==1)return;
+ s.checkpointHeld=name;await new Promise(resolve=>{s.releaseCheckpoint=()=>{s.releaseCheckpoint=null;s.checkpointHeld=null;resolve();};if(s.autoRelease)s.releaseCheckpoint();});
+};
+const ioEnd=row=>{if(!row)return;row.endedAt=Date.now();row.endMono=performance.now();ioState().active--;};
+`;
+ once("const CF='https://api.cloudflare.com",runtime+"\nconst CF='https://api.cloudflare.com");
+ once("const request=(path,cap=65536,token=reader)=>child(async l=>{\n    let response,stream;","let ioSnapshot=0;\n   const request=(path,cap=65536,token=reader)=>child(async l=>{\n    const io=ioBegin(path,token,reader,ioSnapshot);let response,stream;");
+ once("response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));current(l);","response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));response=await ioResponse(response,io);current(l);");
+ once("if(length!==null&&Number(length)!==size)fail();","if(io)io.bytes=size;if(length!==null&&Number(length)!==size)fail();");
+ once("return {value:JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),date};","const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));if(io)io.outcome='fulfilled';return {value,date};");
+ once("}finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}","}finally{try{if(io){io.cancelStartedAt=performance.now();if(io.outcome==='pending')io.outcome='rejected';}if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}finally{if(io)io.cancelSettledAt=performance.now();ioEnd(io);}}");
+ once("const primary=async()=>{\n    await credentials();","const primary=async()=>{\n    ioSnapshot=ioState()?++ioState().snapshots:0;await credentials();");
+ once("const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{activeChild=null;}});","const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;const io=ioState(),startedAt=Date.now(),startMono=performance.now(),first=io?.rows.length,sqlFirst=globalThis.__finiteIoOwner?.sdkPrimary?.length??0;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{if(io?.consuming){io.child={startedAt,startMono,deadline:until,endedAt:Date.now(),endMono:performance.now(),first,last:io.rows.length,sqlFirst,sqlLast:globalThis.__finiteIoOwner?.sdkPrimary?.length??0};io.consuming=false;}activeChild=null;}});");
+ once("consumptionChild=l;consumptionStore=store;","consumptionChild=l;consumptionStore=store;if(ioState())ioState().consuming=true;");
+ once("if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();","if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();if(ioState())ioState().same={child:consumptionChild===l,store:consumptionStore===store};");
+ once("onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});","onAbort=()=>{if(ioState())ioState().parentAborted=true;clock.close();};originalLease.signal.addEventListener('abort',onAbort,{once:true});");
+ once("const joined=await retain(Promise.allSettled([qaWork,mWork]));","const joined=await retain(Promise.allSettled([qaWork,mWork]));await ioCheckpoint('before-join');");
+ once("const observed=await primary();","const observed=await primary();await ioCheckpoint('after-first');");
+ once("const qualified=await qualify(first,observed),again=await primary(),second=await facts(),secondQualified=await qualify(second,again);","const qualified=await qualify(first,observed);await ioCheckpoint('between');const again=await primary(),second=await facts(),secondQualified=await qualify(second,again);");
+ return source;
+}
+export function extendFiniteOwnerIo(entry){
+ const needle=' export class Initial extends FiniteClosure{';if(entry.split(needle).length!==2)throw Error('SYN I/O class marker');
+ return entry.replace(needle,needle+String.raw`
+ async ioConfigure(options={}){
+  await this.sdkPrimaryObserve();globalThis.__finiteIoOwner=this;
+  globalThis.__finiteIo={rows:[],active:0,peak:0,snapshots:0,child:null,fail:options.fail??null,hold:options.hold??null,checkpoint:options.checkpoint??null};
+ }
+
+ async ioRelease(kind='all'){
+  const s=globalThis.__finiteIo;if(!s)return;
+  if(kind==='all')s.autoRelease=true;
+  if(kind==='all'||kind==='body')s.releaseRead?.();
+  if(kind==='all'||kind==='cancel')s.releaseCancel?.();
+  if(kind==='all'||kind==='checkpoint')s.releaseCheckpoint?.();
+ }
+ async ioProbe(){
+  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/retention'));
+  try{return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:root.lease},async()=>({allowed:true}));}
+  catch{return {allowed:false};}finally{root.finish();}
+ }
+ async ioObservation(){
+  const s=globalThis.__finiteIo;if(!s)return null;
+  const c=s.child,sessions=c?(this.sdkPrimary??[]).slice(c.sqlFirst,c.sqlLast):[];
+  let factual=0,preflight=0,writes=0;
+  for(const session of sessions){if(session.queries.length===8)preflight+=8;else for(const sql of session.queries){if(sql.startsWith('SELECT '))factual++;else writes++;}}
+  return {rows:s.rows,active:s.active,peak:s.peak,snapshots:s.snapshots,child:s.child,same:s.same??null,held:s.held??null,checkpointHeld:s.checkpointHeld??null,parentAborted:s.parentAborted??false,sql:{factual,preflight,writes}};
+ }
+`);
+}
+export async function delayFiniteOwnerIo(f,req){
+ if(!f.ioDelay||req.method!=='GET'||new URL(req.url).origin!=='https://api.cloudflare.com')return;
+ const start=performance.now();while(performance.now()-start<f.ioDelay)await new Promise(resolve=>setTimeout(resolve,f.ioDelay-(performance.now()-start)));
+ (f.ioWaits??=[]).push(performance.now()-start);
+}
~~~

~~~diff
diff --git a/test/fixtures/finite-owner-phase-context.mjs b/test/fixtures/finite-owner-phase-context.mjs
--- a/test/fixtures/finite-owner-phase-context.mjs
+++ b/test/fixtures/finite-owner-phase-context.mjs
@@ -26,21 +26,21 @@
    const map={projectRef,preconnectionId:id,subjectHash:subject,sourceRevision:source.sourceRevision,projectId:source.project.projectId,revision:source.project.revision,issuedAt:at,expiresAt:capsule.C0};
    const snapshot={preconnectionId:id,initialTicketHash:ticketHash,source};snapshot.sourceHash=phaseHash('OwnerSourceSnapshot',snapshot);
    const approval={purpose:'afw.finite-connection-approval.v1',subjectHash:subject,sourceRevision:source.sourceRevision,projectHash:phaseProjectHash(source.project),clientId:source.clientId,approvedAt:at,expiresAt:capsule.C0};
    approval.csrfReceiptHash=phaseEvidence('decision',{ticket,decision:'approve',projectHash:approval.projectHash,goal:source.goal,clientId:source.clientId,approvedAt:at,expiresAt:capsule.C0});
    const pre={purpose:'afw.finite-connection-preparation.v1',preconnectionId:id,sourceRevision:source.sourceRevision,actorId:source.actorId,owner:{subject:anchors.material.ownerSelection.subject,accessRealmHash:realm,accessVerifiedAt:at,accessExpiresAt:capsule.C0},project:source.project,clientId:source.clientId,resource:source.resource,startedAt:at,expiresAt:capsule.C0,approvalHash:phaseHash('ConfigurationApproval',approval),baselineHash:phaseEvidence('baseline',source.initialBaseline)};
    pre.recordHash=phaseHash('Preconnection',pre);
    const stageApproval={purpose:'afw.finite-connection-stage-approval.v1',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection',ticketHash,approvalHash:pre.approvalHash};
    const store=phaseStore({storage,now:Date.now}),put=async(method,v)=>{const result=await store[method](v,parent.lease);if(result.status!=='recorded')throw Error('SYN seed '+method+' '+result.status);};
    await put('putOwnerSourceSnapshot',snapshot);if(kind==='snapshot-only')return {provenance:'SYN exact native snapshot prefix',preconnectionId:id};await put('putProjectRef',map);if(kind==='snapshot-map')return {provenance:'SYN exact native snapshot/project-ref prefix',preconnectionId:id};await put('putTicket',ticket);await put('putConfigurationApproval',approval);await put('consumeTicket',{ticketHash,recordHash:approval.csrfReceiptHash});await put('putPreconnection',pre);await put('putStageApproval',stageApproval);
    if(kind==='approval')return {provenance:'SYN evidence via actual preparation store',preconnectionId:id};
+   const p=anchors.plan,r=anchors.records,c=anchors.capsule,values={capsuleHash:c.capsuleHash,planHash:p.recordHash,armAckHash:r['arm-ack'].recordHash,activationCompletionHash:r['activation-completion'].recordHash,entryHash:c.entryHash,materialHash:c.materialHash,actorId:anchors.actorId,ownerSourceHash:snapshot.sourceHash,preconnectionHash:pre.recordHash,stageApprovalHash:phaseHash('StageApproval',stageApproval),configurationApprovalHash:phaseHash('ConfigurationApproval',approval),issuedAt:Date.now()};values.deadline=values.issuedAt+5000;
-   const p=anchors.plan,r=anchors.records,c=anchors.capsule,values={capsuleHash:c.capsuleHash,planHash:p.recordHash,armAckHash:r['arm-ack'].recordHash,activationCompletionHash:r['activation-completion'].recordHash,entryHash:c.entryHash,materialHash:c.materialHash,actorId:anchors.actorId,ownerSourceHash:snapshot.sourceHash,preconnectionHash:pre.recordHash,stageApprovalHash:phaseHash('StageApproval',stageApproval),configurationApprovalHash:phaseHash('ConfigurationApproval',approval),issuedAt:Date.now(),deadline:Date.now()+5000};
    for(const k of ['sourceRevision','sourceTree','qaVersionId','initialInstanceId','preconnectionId','I0','C0','C1'])values[k]=c[k];
    for(const k of ['readerId','publisherId','readerExpiresAt','publisherExpiresAt','manifestHash','baselineVersionId','baselineDeploymentId'])values[k]=p[k];
    const enrollment=phaseSealEnrollment('Enrollment',values),ack=phaseSealEnrollment('Ack',{enrollmentHash:enrollment.recordHash,stateHash:anchors.zero.recordHash,alarmAt:c.C0,acknowledgedAt:Date.now()});
    await storage.put('afw.finite-preparation-cleanup.v1:enrollment',phaseEncodeEnrollment('Enrollment',enrollment));
    if(kind!=='enrollment-no-ack')await storage.put('afw.finite-preparation-cleanup.v1:ack',phaseEncodeEnrollment('Ack',ack));
    const use=(await store.readTicketUse({ticketHash},parent.lease)).record;
    const facts={anchors,enrollment,ack,preconnection:pre,sourceSnapshot:snapshot,stageApproval,approval,ticket,ticketUse:use,projectRef:map};
    phaseEnrollmentFacts(facts);this.phaseSeededFacts=facts;
    if(['enrollment','enrollment-no-ack'].includes(kind))return {provenance:'SYN enrollment DATA',preconnectionId:id};
    const contextHash=phaseDigest('afw.finite-connection-context.v1',{preconnection:pre,stageApproval,predecessors:[],grant:null,notice:null}),identity={kind:'connection',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection'};
@@ -131,20 +131,27 @@
    const connectionRef='2'.repeat(64),linkedAt=Date.now(),relation={preconnectionId:c.preconnectionId,connectionRef,grantHash:grantLink.grantHash,linkedAt},connection={connectionRef,subject:pre.owner.subject,grantId:identity.grantId,clientId:pre.clientId,projectId:pre.project.projectId,resource:pre.resource,issuedAt:linkedAt,expiresAt:c.C0};
    if((await pstore.putPreconnectionConnection({relation,connection},parent.lease)).status!=='recorded')throw Error('SYN connection pair');
    return {identity,provenance:'actual D1/store mutation with real SQL clock; synthetic isolated evidence'};
   }catch(e){return {fixtureError:String(e),stack:e.stack};}finally{parent.finish();}
  }
  async removePhaseIssuerFixture(){for(const [key]of await this.ctx.storage.list({prefix:'afw.finite-preparation-issuer.v1:'}))await this.ctx.storage.delete(key);await this.ctx.storage.sync();}
 `;
  const start=entry.indexOf(' async ownerSourceRead('),end=entry.indexOf(' async ownerEffectCount()',start);
  if(start<0||end<start)throw Error('Original native request harness missing');
  let method=entry.slice(start,end).replace('async ownerSourceRead(','async phaseContextRead(').replaceAll('readPrivateQaFiniteInitialOwnerSource(','readPrivateQaFiniteOwnerContext(');
+ // These legacy regressions intentionally hold ONE actual operation. Concurrent
+ // source credentials must not overwrite the single release RPC's callback.
+ const heldNeedle="if(['held-fetch','held-body','held-cancel'].includes(mode)){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(fetcher,globalThis,args).then(async response=>{";
+ const heldReplacement="if(['held-fetch','held-body','held-cancel'].includes(mode)){let phaseHeld=false;const owner=this;globalThis.fetch=(...args)=>Reflect.apply(fetcher,globalThis,args).then(async response=>{if(phaseHeld)return response;phaseHeld=true;";
+ if(method.split(heldNeedle).length!==2)throw Error('SYN exact phase held-operation hook changed');
+ method=method.replace(heldNeedle,heldReplacement);
+
  // Read-only journal transactions are real transactions; mutation methods throw.
  method=method.replace("s.put=noWrite;s.transaction=noWrite;s.sync=noWrite;","s.put=noWrite;s.delete=noWrite;s.sync=noWrite;s.transaction=fn=>Reflect.apply(transaction,s,[tx=>fn({get:(...a)=>tx.get(...a),list:(...a)=>tx.list(...a),put:noWrite,delete:noWrite,setAlarm:noWrite,deleteAlarm:noWrite})]);");
  method=method.replace('put=s.put,transaction=', 'put=s.put,del=s.delete,transaction=').replace('s.put=put;s.transaction=', 's.put=put;s.delete=del;s.transaction=');
  // Every independent current observation must begin with SELECT, never PRAGMA.
  method=method.replace('this.ownerRestore=restore;', `this.ownerRestore=restore;
   this.phasePrimary=[];db.withSession=(constraint)=>{if(constraint!=='first-primary')throw Error('SYN non-primary');const session=Reflect.apply(withSession,db,[constraint]),prepare=session.prepare,queries=[];this.phasePrimary.push(queries);session.prepare=sql=>{if(!/^SELECT\\b/i.test(sql.trim()))throw Error('SYN non-read/first SQL');queries.push(sql);if(mode==='schema-failure'&&sql.includes('FROM sqlite_schema'))throw Error('SYN failed schema read');return Reflect.apply(prepare,session,[sql]);};return session;};`);
  method=method.replace('catch{return{status:', 'catch(e){return{fixtureError:String(e),status:');
  return imports+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods+method+" async phasePrimaryReads(){return this.phasePrimary;}\n");
 }
 
~~~

~~~diff
diff --git a/test/fixtures/finite-owner-qa-sdk.mjs b/test/fixtures/finite-owner-qa-sdk.mjs
--- a/test/fixtures/finite-owner-qa-sdk.mjs
+++ b/test/fixtures/finite-owner-qa-sdk.mjs
@@ -70,48 +70,48 @@
   try{return await readPrivateQaFiniteOwnerContext({ctx:this.ctx,env:this.env,parent:parent.lease});}catch{return {status:'unavailable'};}finally{parent.finish();}
  }
 `;
  if(observed)methods=methods.replace("async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}", "async fetch(request){this.sdkSignals={entryAborted:request.signal.aborted,abortObserved:false,settled:false,settledAborted:null};const seen=this.sdkSignals;request.signal.addEventListener('abort',()=>{seen.abortObserved=true;},{once:true});try{return await createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}finally{seen.settled=true;seen.settledAborted=request.signal.aborted;}}");
  // Ticket fixture is external SYN approval DATA, generated through genuine store.
  // It must match a real bounded preparation cookie, never a positive source alias.
  const old="ticketHash='7'.repeat(64)",replacement="ticketHash=phaseRawSha('a'.repeat(64))";
  if(!entry.includes(old))throw Error('SYN exact phase seed changed');
  return imports+entry.replace(old,replacement).replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
 }
+export async function finiteOwnerSdkWorkers(qa,{observed=false,token=false,io=false}={}){
-export async function finiteOwnerSdkWorkers(qa,{observed=false,token=false}={}){
  const mProfile=finiteWranglerProfileTemplate('canaryLive');let outgoingInstrumentations=0;
  let source=`import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
  import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
  export default{async fetch(request,env,ctx){const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}}};`;
  if(token)source=`import {createDelegatedOAuthWorker} from './lib/delegated-oauth-worker.mjs';
  import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
  import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
  const issuer='https://delegated-canary.agentfriendlyweb.dev',worker=createDelegatedOAuthWorker({issuer,resource:issuer+'/mcp'});let tokenPins=null,wrongNamespace=false;
  export default{async fetch(request,env,ctx){
   const path=new URL(request.url).pathname;
   if(path==='/fixture/token-config'&&request.method==='POST'){
    const pins=await request.json();tokenPins={AFW_OAUTH_PILOT_CLIENT_ID:pins.clientId,AFW_OAUTH_PILOT_PROJECT_ID:pins.projectId,AFW_OAUTH_PILOT_EXPIRES_AT:pins.expiresAt,ACCESS_AUD:pins.audience,ACCESS_TEAM_DOMAIN:pins.teamDomain};return new Response(null,{status:204});
   }
   if(path==='/fixture/token-namespace'&&request.method==='POST'){wrongNamespace=true;return new Response(null,{status:204});}
   if(path==='/oauth/token'||path==='/mcp'){const headers=new Headers(request.headers);headers.set('Host',new URL(issuer).host);return worker.fetch(new Request(request,{headers}),{...env,...tokenPins,...(wrongNamespace?{OAUTH_KV:env.SYN_WRONG_KV}:{})},ctx);}
   if(path!=='/authorize')return new Response(null,{status:404});
   const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}
  }};`;
+ if(observed||io)source=source.replace("export default{async fetch(request,env,ctx){const root=",`let active,activeRoot,delay=0;export default{async fetch(request,env,ctx){const path=new URL(request.url).pathname;if(path==='/fixture/signal-state')return Response.json(globalThis.__d02M??{});if(path==='/fixture/abort'){active?.abort();return new Response(null,{status:204});}if(path==='/fixture/abort-root'){activeRoot?.finish();return new Response(null,{status:204});}if(path==='/fixture/elapsed'){delay=29000;return new Response(null,{status:204});}const seen=globalThis.__d02M={incomingEntryAborted:request.signal.aborted,incomingAbortObserved:false,rootAbortObserved:false};request.signal.addEventListener('abort',()=>{seen.incomingAbortObserved=true;},{once:true});const control=new AbortController();request.signal.addEventListener('abort',()=>control.abort(),{once:true});request=new Request(request,{signal:control.signal});active=control;const root=`).replace("try{return await forward", "activeRoot=root;globalThis.__d02M.rootEntryAborted=root.lease.signal.aborted;root.lease.signal.addEventListener('abort',()=>{globalThis.__d02M.rootAbortObserved=true;},{once:true});try{const elapsed=delay;delay=0;if(elapsed)await new Promise(resolve=>setTimeout(resolve,elapsed));return await forward").replace("finally{root.finish();}", "finally{root.finish();if(active===control)active=null;if(activeRoot===root)activeRoot=null;}");
+ const plugins=observed||io?[{name:'SYN-signal-observation',setup(b){b.onLoad({filter:/mcp-qa-finite-owner-oauth-forward\.mjs$/},async args=>{
- if(observed)source=source.replace("export default{async fetch(request,env,ctx){const root=",`let active,activeRoot,delay=0;export default{async fetch(request,env,ctx){const path=new URL(request.url).pathname;if(path==='/fixture/signal-state')return Response.json(globalThis.__d02M??{});if(path==='/fixture/abort'){active?.abort();return new Response(null,{status:204});}if(path==='/fixture/abort-root'){activeRoot?.finish();return new Response(null,{status:204});}if(path==='/fixture/elapsed'){delay=29000;return new Response(null,{status:204});}const seen=globalThis.__d02M={incomingEntryAborted:request.signal.aborted,incomingAbortObserved:false,rootAbortObserved:false};request.signal.addEventListener('abort',()=>{seen.incomingAbortObserved=true;},{once:true});const control=new AbortController();request.signal.addEventListener('abort',()=>control.abort(),{once:true});request=new Request(request,{signal:control.signal});active=control;const root=`).replace("try{return await forward", "activeRoot=root;globalThis.__d02M.rootEntryAborted=root.lease.signal.aborted;root.lease.signal.addEventListener('abort',()=>{globalThis.__d02M.rootAbortObserved=true;},{once:true});try{const elapsed=delay;delay=0;if(elapsed)await new Promise(resolve=>setTimeout(resolve,elapsed));return await forward").replace("finally{root.finish();}", "finally{root.finish();if(active===control)active=null;if(activeRoot===root)activeRoot=null;}");
- const plugins=observed?[{name:'SYN-signal-observation',setup(b){b.onLoad({filter:/mcp-qa-finite-owner-oauth-forward\.mjs$/},async args=>{
   outgoingInstrumentations++;let contents=await readFile(args.path,'utf8');const needle="const response=await Reflect.apply(fetcher,stub,[new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]);check();";
   if(contents.split(needle).length!==2)throw Error('SYN outgoing observation changed');
   contents=contents.replace(needle,"const outgoing=new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});globalThis.__d02M.outgoingEntryAborted=outgoing.signal.aborted;globalThis.__d02M.outgoingAbortObserved=false;outgoing.signal.addEventListener('abort',()=>{globalThis.__d02M.outgoingAbortObserved=true;},{once:true});const response=await Reflect.apply(fetcher,stub,[outgoing]);check();");
   return {contents,loader:'js'};
  });}}]:[];
  const built=await build({plugins,stdin:{contents:source,resolveDir:process.cwd()},bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*']});
+ if((observed||io)&&outgoingInstrumentations!==1)throw Error('SYN outgoing observer not installed exactly once');
- if(observed&&outgoingInstrumentations!==1)throw Error('SYN outgoing observer not installed exactly once');
  console.info('D02 fixture M compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:createHash('sha256').update(built.outputFiles[0].contents).digest('hex'),inputs:Object.keys(built.metafile.inputs).length}));
  return {...(qa.resourcePersistencePath?{resourcePersistencePath:qa.resourcePersistencePath}:{}),workers:[{...qa,name:'qa-sdk'},{
   name:'m-sdk',modules:true,script:built.outputFiles[0].text,compatibilityDate:mProfile.compatibility_date,compatibilityFlags:mProfile.compatibility_flags,
   kvNamespaces:{OAUTH_KV:'finite-sdk-shared',...(token?{SYN_WRONG_KV:'finite-sdk-wrong'}:{})},
   ...(token?{d1Databases:{DB:qa.d1Databases.RELEASE_DB},ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'99123',simple:{limit:1000,period:60}}}}:{}),
   bindings:{...(token?{AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_OAUTH_REFRESH_ENABLED:'false',AFW_OAUTH_SERVICE_MODE:'window',AFW_DOSSIER_EVENTS_ENABLED:'false'}:{}),AFW_FINITE_TRIAL_VERSION:{id:'77777777-7777-4777-8777-777777777777'}},
   durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'Initial',scriptName:'qa-sdk',useSQLite:true,uniqueKey:'initial-c2a'}}
  }].reverse()};
 }
 export async function seedFiniteOwnerSdkClient(mf,source){
~~~

~~~diff
diff --git a/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs b/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
--- a/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
+++ b/test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
@@ -60,37 +60,37 @@
  const value={source:{clientId:'client',resource,project:{projectId:'project'}},identity:{subject:'owner'},pre:{preconnectionId:h,expiresAt:2000,owner:{accessExpiresAt:2000}},link:{grantHash,acceptedAt:1000},grant:{grantId,expiresAt:'1970-01-01T00:00:02.000Z'},relation:{preconnectionId:h,connectionRef:ref,grantHash,linkedAt:1000},connection:{connectionRef:ref,subject:'owner',grantId,clientId:'client',projectId:'project',resource,issuedAt:1000,expiresAt:2000},observedAt:1500};
  assert.doesNotThrow(()=>qualify(value));
  assert.throws(()=>qualify({...value,observedAt:2000}),error=>error.status===503);
 });
 
 import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
 import {seedFiniteOwnerSdkClient,readSyntheticIssuedGrantProps} from './fixtures/finite-owner-qa-sdk.mjs';
 async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r?.[Symbol.dispose]?.();}}
 
 const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
+async function world(fn,{observed=true,restart=false,io=false}={}){
+ const f=await initialEntryHarness(io?'phase-context-sdk-io':'phase-context-sdk'+(observed?'-observed':'')+(restart?'-restart':''));
-async function world(fn,{observed=true,restart=false}={}){
- const f=await initialEntryHarness('phase-context-sdk'+(observed?'-observed':'')+(restart?'-restart':''));
  try{
   await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
   f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined,JSON.stringify(f.phaseCurrent));
   const context=await plain(f.stub.sdkReadCurrent());assert.equal(context.source?.phase,'read_consent');
   f.source=context.source;f.token=await f.enrollmentToken(f.source);f.headers={'Cf-Access-Jwt-Assertion':f.token,Cookie:PREP};
   await seedFiniteOwnerSdkClient(f.mf,f.source);
   f.query=new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:'a'.repeat(43),code_challenge_method:'S256'});
   f.timings={};f.get=async extra=>{const start=Date.now();try{return await f.mf.dispatchFetch(f.source.origin+'/authorize?'+f.query,{redirect:'manual',headers:{...f.headers,...extra}});}finally{f.timings.get=Date.now()-start;}};
   f.post=async (form,extra={})=>{const start=Date.now();try{return await f.mf.dispatchFetch(f.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',...f.headers,Cookie:PREP+'; '+form.cookie,...extra},body:new URLSearchParams({handle:form.handle,decision:'approve',scope:'afw:project:read'})});}finally{f.timings.post=Date.now()-start;}};
   f.history=await plain(f.stub.sdkGrants());
   if(observed){await f.stub.sdkConfigure();await f.stub.sdkPrimaryObserve();}
   await fn(f);
   const after=await plain(f.stub.sdkGrants());
   for(const row of f.history)assert.deepEqual(after.find(r=>r.id===row.id),row,'original historical D1 grant unchanged');
+ }finally{if(io){await f.stub.ioRelease('all');await ioWait(f,s=>s.active===0);}await f.stub.sdkReleaseHeld().catch(()=>{});await f.mf.dispose();await f.cleanup();}
- }finally{await f.stub.sdkReleaseHeld().catch(()=>{});await f.mf.dispose();await f.cleanup();}
 }
 async function consent(f){
  const response=await f.get();assert.equal(response.status,200);
  const html=await response.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
  const cookie=response.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
  const rows=await plain(f.stub.snapshot()),reservation=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]);
  assert.equal(await plain(f.stub.sdkGrant(reservation.identity.grantId)),null);
  return {handle,cookie,identity:reservation.identity};
 }
 async function status(p){const r=await p;await r.body?.cancel();return r.status;}
@@ -233,10 +233,132 @@
  const form=operation==='grant'?await consent(f):null;
  await f.stub.sdkConfigure('queue-'+operation);
  assert.equal(await status(form?f.post(form):f.get()),503);
  let s;for(let n=0;n<100;n++){s=await observe(f);if(s.queue?.returned)break;await new Promise(r=>setTimeout(r,20));}
  assert.equal(s.queue?.entered,true);assert.equal(s.queue?.returned,true);assert.equal(s.queue?.rowAbsent,true,'original SQL clock rejected actual delayed execution');
  assert(!has(s,'sdk_complete:send'));
  if(form){assert.equal(await plain(f.stub.sdkGrant(form.identity.grantId)),null);const rows=await plain(f.stub.snapshot());assert(rows.some(([k])=>k.endsWith(':consume:ack')));assert(!rows.some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':grant:ack')));}
  else {assert(has(s,'sdk_begin:observed'));assert(!(await plain(f.stub.snapshot())).some(([k])=>k.endsWith(':authorization:ack')));}
  const beforeCalls=s.calls.length;assert.equal(await status(form?f.post(form):f.get()),503);assert.equal((await observe(f)).calls.length,beforeCalls,'incomplete first GET/POST never restarts SDK');
 }));
+
+
+async function fanoutMetrics(f,form,response,{peak}){
+ const state=await plain(f.stub.ioObservation()),rows=await plain(f.stub.snapshot());
+ const read=suffix=>{const raw=rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(suffix))?.[1];return raw?JSON.parse(raw):null;};
+ const send=read(':consume:send'),ack=read(':grant:ack'),child=state.child;
+ const full=child?state.rows.slice(child.first,child.last):[];
+ const narrow=send&&ack?full.filter(r=>r.startedAt>=send.issuedAt&&r.startedAt<=ack.observedAt):[];
+ const counts={};for(const row of full)counts[row.category]=(counts[row.category]??0)+1;
+ console.info('fanout actual lifecycle',JSON.stringify({status:response.status,peak:state.peak,active:state.active,child,elapsed:child?child.endMono-child.startMono:null,tail:child&&ack?child.endedAt-ack.observedAt:null,full:full.length,narrow:narrow.length,counts,sql:state.sql,delayMinimum:f.ioWaits?.length?Math.min(...f.ioWaits):0,sendPresent:!!send,ackPresent:!!ack}));
+ assert.equal(response.status,302,'genuine original POST must issue code before original child expiry');
+ assert(child);assert(child.endMono-child.startMono<5000);assert(child.endedAt<child.deadline);
+ assert.equal(full.length,112);assert.equal(narrow.length,84);
+ assert.deepEqual(counts,Object.fromEntries(['verify-reader','verify-publisher','qa-deployment','qa-version','m-deployment','m-initial-version','m-current-version'].map(k=>[k,16])));
+ assert.deepEqual(state.sql,{factual:80,preflight:16,writes:2});
+ assert.equal(state.peak,peak);assert.equal(state.active,0);assert.deepEqual(state.same,{child:true,store:true});assertIoOrder(state.rows);
+ assert(full.every(r=>r.outcome==='fulfilled'&&r.endMono>=r.cancelSettledAt&&r.cancelSettledAt>=r.cancelStartedAt&&r.bytes>0));
+ if(f.ioDelay)assert(f.ioWaits.every(ms=>ms>=50));
+ await issued(f,form,response);
+ assert.equal((await observe(f)).calls.length,0,'I/O-only mode leaves actual SDK KV unwrapped');
+ assert.equal((await observe(f)).probes.length,0,'I/O-only mode never probes source');
+ return state;
+}
+test('fanout causal control delay0 preserves complete native child and original reads',{timeout:120000},()=>world(async f=>{
+ const form=await consent(f);await f.stub.ioConfigure();
+ await fanoutMetrics(f,form,await f.post(form),{peak:2});
+},{observed:false,io:true}));
+test('fanout 50ms preserves original five second child and actual grant',{timeout:120000},()=>world(async f=>{
+ const form=await consent(f);await f.stub.ioConfigure();f.ioDelay=50;
+ await fanoutMetrics(f,form,await f.post(form),{peak:2});
+},{observed:false,io:true}));
+test('fanout fixed two overlaps real request lifecycles',{timeout:120000},()=>world(async f=>{
+ const form=await consent(f);await f.stub.ioConfigure();
+ await fanoutMetrics(f,form,await f.post(form),{peak:2});
+},{observed:false,io:true}));
+
+
+async function ioWait(f,predicate){
+ for(let n=0;n<400;n++){const s=await plain(f.stub.ioObservation());if(!s||predicate(s))return s;await new Promise(resolve=>setTimeout(resolve,20));}
+ assert.fail('native I/O barrier did not settle within 8s');
+}
+function assertIoOrder(rows){
+ let priorEnd=0;
+ for(const snapshot of [...new Set(rows.map(r=>r.snapshot))]){
+  const group=rows.filter(r=>r.snapshot===snapshot),by=k=>group.find(r=>r.category===k);
+  assert.equal(group.length,7,'all original reads in each complete primary');
+  const reader=by('verify-reader'),publisher=by('verify-publisher'),qa=by('qa-deployment'),m=by('m-deployment');
+  assert(Math.min(reader.startMono,publisher.startMono)>=priorEnd,'no primary snapshot overlap');
+  assert(Math.min(qa.startMono,m.startMono)>=Math.max(reader.endMono,publisher.endMono),'both credentials fully settled before descriptors');
+  assert(by('qa-version').startMono>=qa.endMono);
+  assert(by('m-initial-version').startMono>=m.endMono);
+  assert(by('m-current-version').startMono>=by('m-initial-version').endMono);
+  priorEnd=Math.max(...group.map(r=>r.endMono));
+ }
+ const events=rows.flatMap(r=>[[r.startMono,1],[r.endMono,-1]]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);let active=0;
+ // Native workerd timestamps can tie; strict positive intervals carry the peak
+ // assertion separately from the in-lifecycle increment/decrement counter.
+ for(const [,delta]of events){active+=delta;assert(active<=2,'physical body/cancel concurrency bound');}
+}
+async function ioDeny(f,response){
+ assert.equal(response.status,503);assert.doesNotMatch(await response.text(),/<form|name="handle"/);assert.equal(response.headers.get('Location'),null);
+ const s=await observe(f);assert.equal(s.rows.length,0,'no actual SDK operation/receipt');assert.equal(s.calls.length,0);assert.equal(s.probes.length,0);
+ assert.equal((await plain(f.stub.sdkGrants())).length,f.history.length,'no new grant');
+ const rows=await plain(f.stub.snapshot());assert(!rows.some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')),'no issuer SEND or ACK');
+}
+async function ioPhysicalRelease(f,{replace=false}={}){
+ const held=await ioWait(f,s=>s.held?.phase==='body');assert.equal(held.active,1);
+ assert.deepEqual(await plain(f.stub.ioProbe()),{allowed:false},'original native request remains occupied');
+ if(replace)await f.stub.sdkReplaceHolder();
+ await f.stub.ioRelease('body');
+ const cancelling=await ioWait(f,s=>s.held?.phase==='cancel');assert.equal(cancelling.active,1);
+ assert.deepEqual(await plain(f.stub.ioProbe()),{allowed:false},'cancellation Promise retains occupancy');
+ await f.stub.ioRelease('cancel');
+ const done=await ioWait(f,s=>s.active===0);assert(done.rows.some(r=>r.cancelReleasedAt>=r.cancelHeldAt));assert(done.peak<=2);
+ for(let n=0;n<100;n++){if((await plain(f.stub.ioProbe())).allowed)return done;await new Promise(resolve=>setTimeout(resolve,20));}
+ assert.fail('native request did not release after actual physical settlement');
+}
+for(const [fail,hold]of [['verify-reader','verify-publisher'],['verify-publisher','verify-reader'],['qa-deployment','m-deployment'],['m-deployment','qa-version']]){
+ test('fanout failed '+fail+' retains sibling actual body and cancellation',{timeout:60000},()=>world(async f=>{
+  await f.stub.ioConfigure({fail,hold});const pending=f.get();await ioWait(f,s=>s.held?.phase==='body');
+  await ioDeny(f,await pending);const failed=await plain(f.stub.ioObservation());assert.equal(failed.snapshots,1);assert.equal(failed.peak,2);
+  if(fail.startsWith('verify-'))assert(failed.rows.every(r=>r.branch==='credentials'),'no descriptors after credential failure');
+  await ioPhysicalRelease(f);
+  const done=await plain(f.stub.ioObservation());assert.equal(done.snapshots,1,'failed join never starts next snapshot');
+  console.info('fanout retained failure',JSON.stringify({fail,hold,activeAtDenial:failed.active,settled:done.active,peak:done.peak,categories:done.rows.map(r=>r.category)}));
+ },{observed:false,io:true}));
+}
+for(const boundary of ['controller','root-finish']){
+ test('fanout native '+boundary+' abort retains actual body and cancel',{timeout:60000},()=>world(async f=>{
+  await f.stub.ioConfigure({hold:'qa-version'});const pending=f.get();await ioWait(f,s=>s.held?.phase==='body');
+  await status(f.mf.dispatchFetch(f.source.origin+(boundary==='controller'?'/fixture/abort':'/fixture/abort-root')));
+  await ioDeny(f,await pending);assert.equal((await plain(f.stub.ioObservation())).parentAborted,true,'accepted actual native QA boundary received abort');
+  await ioPhysicalRelease(f);
+  assert.equal((await observe(f)).rows.length,0,'no late SDK receipt');
+ },{observed:false,io:true}));
+}
+test('fanout sibling beyond original child cannot renew its deadline',{timeout:60000},()=>world(async f=>{
+ await f.stub.ioConfigure({hold:'verify-publisher'});const start=performance.now(),pending=f.get();await ioWait(f,s=>s.held?.phase==='body');
+ await ioDeny(f,await pending);const elapsed=performance.now()-start;assert(elapsed>=4900&&elapsed<15000);
+ await ioPhysicalRelease(f);assert.equal((await plain(f.stub.ioObservation())).snapshots,1);
+ console.info('fanout native sibling expiry',JSON.stringify({elapsed,renewed:false}));
+},{observed:false,io:true}));
+for(const checkpoint of ['before-join','after-first','between'])for(const drift of ['owner','pointer','module','configuration']){
+ test('fanout '+drift+' drift at causal '+checkpoint+' denies at original following checkpoint',{timeout:60000},()=>world(async f=>{
+  await f.stub.ioConfigure({checkpoint});const pending=f.get();await ioWait(f,s=>s.checkpointHeld===checkpoint);
+  if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN drift'").run();
+  if(drift==='pointer')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
+  if(drift==='module')f.phaseFault='module';
+  if(drift==='configuration')f.phaseFault='configuration';
+  await f.stub.ioRelease('checkpoint');await ioDeny(f,await pending);
+  const s=await ioWait(f,s=>s.active===0);assert(s.snapshots<=2);assert(s.peak<=2);
+ },{observed:false,io:true}));
+}
+
+test('fanout completed sibling cannot hide live holder replacement',{timeout:60000},()=>world(async f=>{
+ await f.stub.ioConfigure({hold:'verify-publisher'});const start=performance.now(),pending=f.get();
+ await ioWait(f,s=>s.held?.phase==='body'&&s.rows.some(r=>r.category==='verify-reader'&&r.outcome==='fulfilled'));
+ await f.stub.sdkReplaceHolder();await f.stub.ioRelease('body');
+ await ioWait(f,s=>s.held?.phase==='cancel');assert(performance.now()-start<4500,'replacement precedes original child expiry');
+ await f.stub.ioRelease('cancel');await ioDeny(f,await pending);
+ const s=await ioWait(f,s=>s.active===0);assert.equal(s.snapshots,1);assert.equal(s.peak,2);
+},{observed:false,io:true}));
~~~

