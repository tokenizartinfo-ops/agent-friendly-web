# Finite owner I/O fanout — implementation brief

Read this first; it is your complete unit requirements. Root supplies containing commit as exact execution BASE AFTER D0.3 independent acceptance. Repository tokenizartinfo-ops/agent-friendly-web (1347578006), product branch feat/finite-native-cleanup-20261101. Report: docs/superpowers/reports/2026-11-05-finite-owner-io-fanout.md. One product writer; no subagents.

## Result / boundaries

One reviewable SOURCE unit: fixed concurrency2 for provider reads inside each existing primary observation, all reads/checks retained. D0.2 actual lexical SDK/issuer and D0.3 real token/MCP compatibility are dependencies, not work to repeat. Root accepted design fb63b524 and preflight docs/superpowers/reviews/2026-11-05-finite-owner-io-fanout-preflight.es.md. Design inspected d630a99d is NOT execution BASE; preserve subsequent D0.3 fixture/token changes.

No new mount/alias/access/namespace/resource, SDK callback/factory, grant/schema/DDL, clocks, cache, D1 batching, snapshot overlap, ordinary fallback, dependency, profile/flag/date change, provider/AFW request, OAuth/OTP/credentials/Max/main/merge. operationalReadiness=false;completePackage=false;PCoff=false. Source ceiling2026-11-03T02:59:00Z stays expired; existing fixture-only substitution disclosed SYN, JS/SQL clocks native.

## Exact source scope and interfaces

Modify product ONLY lib/mcp-qa-finite-owner-phase-context.mjs around credentials()/primary(). Keep private observeOwnerPhasePair signature, strict3-key public DTO, handler, same Unit2a store/child/witness, request helper, issuer/SDK journals, SDK pending/result semantics, holders and two snapshots unchanged. Do not modify initial-lease or stage-work: source inspection shows per-child state and one ambient ALS Set support siblings, subject to native proof.

Test files: modify test/mcp-qa-finite-owner-qa-sdk-native.test.mjs; minimally modify test/fixtures/finite-initial-entry-world.mjs and test/fixtures/finite-owner-qa-sdk.mjs; create test/fixtures/finite-owner-io-fanout.mjs for fixed I/O-only source observation/holds. Preserve old observed and unobserved modes including D0.3 actual M token support. Other edits need root with exact evidence. Own temporary branch/path-scoped credential-free Actions qualifier allowed, removed before report; no production workflow.

Retain existing request(path,cap=65536,token=reader) code/lifecycle verbatim: fixed GET origin, original credential, no-store/no-cache, all status/header/Date/body/length/UTF8/JSON/module/cancellation checks and caps8192/65536/4500000. No header return mistaken for completed cycle. All module bodies re-read/hash/full-validate, no cached bytes/descriptors. Native SQL SELECT-first original UUID/new first-primary session and all actual D1 queries unchanged.

Private interfaces inside same observation closure:
- verifyCredential(token,id,expiresAt):Promise<void>, unchanged one-token validation block.
- credentials():Promise<void>, fixed reader+publisher calls, both fully validated before descriptors.
- readQaPrimary():Promise<{qaMetadata}>, original QA pointer→expected pointer compare→exact QA include=modules→all original validations.
- readMPrimary():Promise<{project,pointer,currentConfiguration,configuration,initialBaseline}>, original M pointer→initial activated M version (capsule.activatedVersionId, NOT historical backup)→full validation→original ownedProject SELECT→current M version if needed→full validation.
- primary():Promise<same PhysicalObservation>, await credentials then fixed QA+M join, current(clock.lease), both original alias checks and SAME {project,pointer,currentConfiguration,qaSdkBindingFacts,initialBaseline}.
Use retained fixed branch promises plus retained Promise.allSettled join. Catch synchronous start errors as rejected promises. Require BOTH fulfilled and discard both outputs on failure. No generic runner/caller callbacks/pool/options/exported intermediate data or capability. After either rejected join no next phase/snapshot/effect. Sibling may finish allowed reads while other fails, never authority. Native retained actual work may outlive raced branch rejection: no drain assertion from allSettled/abort.

Structural maximum2 actual provider fetch/body/cancel lifecycles at once; branch never starts its next request before prior actual work/finally completes. No overlap between primary snapshots or independent rechecks. Preserve sequence factsA→primaryA→qualifyA→primaryB→factsB→qualifyB→compare. Same root≤30000ms and original consume/grant child≤5000ms, including initial recheck and durable final ACK/recheck. No window/lease renewal.

## Genuine native qualification, before/after code

Use accepted genuine initial Entry/material/preparation/actual SDK fixture, no source DTO substitutions or positive grants. Separate I/O-only mode from sdk-observed: old observer calls strict-reader probes and changes counts, so do not combine. I/O observer does not call source/store/SDK or wrap actual SDK/KV. Exact-one source marker assertions fail closed; no silent replaceAll. Keep independent uninstrumented positive.

Observe cycles inside actual request lifecycle until stream.read/cancel finally settles; NOT just outboundService return/headers or clock.child raced result. Trace only fixed endpoint categories/method/ordinal/branch/snapshot/timestamps/bytecounts/outcome, bounded entries, no headers/token/module/body/code/cookie/raw owner data. Test holds release/settle in finally before disposal.

Before product change:
1. delay0 control succeeds genuine POST302/store+child/grant/code; record peak1 and full child112 GET, endpoint multiset16each {verify-reader,verify-publisher,qa-deployment,qa-version,m-deployment,m-initial-version,m-current-version}. SEND→grantACK84 is narrower than whole child; total D1 remains80factualSELECT+16preflight+2writes=98. No extra probes.
2. Activate mocked GET delay50ms only AFTER genuine initialization, restored methods/source seed/client seed and VALID GET/form, immediately before POST. Each affected CF GET waits≥50ms measured actual monotonic clock; provider Date emitted from actual Date.now after wait. No delayJWKS/ledger/SQL/DO/SDK, no clock offset/fake timers/backdating/spin.
3. Test expected POST302/wholechild<5000; BEFORE schedule change it must fail causally at original consume/grant child expiry, not setup/observer/source mismatch. Fixed-two overlap test before change records peak1 vs expected2. Record failed prefix counts honestly; failed run need not reach112.
If delay0/calibration cannot prove intended causality, diagnose fixture once then report exact evidence to root; don't implement blindly or choose a more convenient delay.

Implement only schedule, then SAME workload GREEN:
- actual POST302, whole original child including durable tail <5000ms; original ACK/deadline; real grant/code.
- peak===2, never>2 through fetch/body/cancel; credentials both validated before descriptors, intraQA/intraM dependencies and snapshot order intact.
- unchanged112/84 counts and multiset; same store/actual child witness; full-child elapsed/margin and tail timing, not ACK timestamp alone.
Nominal old112*50=5600ms vs new64*50=3200ms plus native overhead is a hypothesis. If fanout still cannot fit5s, report measured failed viability/root decision; do not silently tune delay, cache/skip reads/batchSQL or widen clocks.

Add hostile behavioral native cases:
- Each credential failure with sibling real body held: no descriptors/form/SDK/grant; original occupancy retained through body/cancel settlement.
- QA or M branch failure with other body held: no partial source/nextsnapshot/effect, peak≤2 across timeout.
- Owner/pointer/module/config drift before join, after FIRST primary join ahead of next existing read, and between snapshots; use causal barrier, not guessed sleeps. Original following checkpoint must deny; never claim detecting changes after all original checkpoints/atomic provider state.
- Native parent/request-signal abort with actual body and cancel held: original scope occupied until physical settlement, no late ACK/code/effects. Node dispatch wrapper signal alone was not propagated; use accepted actual native boundary.
- Sibling beyond original child deadline doesn't renew it; completed sibling cannot hide holder replacement.
- Preserve queuedSQL5100ms denial and all strict-reader/ownSEND/source absent/schema malformed/lone-source variants via existing affected tests; do not add redundant mirror assertions or remove legitimate positives.

Commands scoped cloud-only:
A calibration/control: node --test --test-concurrency=1 --test-name-pattern="fanout causal control|fanout 50ms|fanout fixed two" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
B hostile: node --test --test-concurrency=1 --test-name-pattern="fanout" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
C affected final: existing SDK native file (including uninstrumented actual source/SDK/Unit2a GET POST returns one original grant and code), phase-context-native, owner-request-retention-native + owner-request-retention, preparation-issuer-native, profile-native + profile, sdk-binding-facts. Exact filenames are in design plan Step6. Do not rerun already-qualified same-head cases merely to improve report layout. If final whole SDK file overlaps new tests, first native full execution can serve B+C; preserve RED and scoped correction runs if needed.
Scoped eslint five controlled product/test/fixture files before native groups. Actions Ubuntu24.04/Node22 contents:read, checkout persist-credentials:false, npmci --ignore-scripts --no-audit --no-fund. No local clone/deps/tests/build.

Root ruling supersedes plan's integration-check phrasing: NO whole npm test/build/lint or new standard compile gate in this unit if standard graph remains unmounted and unchanged. Native component fixture compilation qualifies changed module; full mounted compiler/fullbranchCI happen later once. Count all real fixture esbuild invocations/failedattempts, do not build solely forhashes. Report graph unchanged proof (diff/import paths + accepted D0.3 standard evidence), explicit componentfixture graphs. If unexpected production reachability or additional source edit needed, report root.

## Delivery
Report BASE/finalcode/reportHEAD/tree, full file scope, all failures and causalRED/GREEN/actual heads/runs/jobs/attempts/commands/counts, actualvsSYN, wholechild elapsed/tail/112/84/multiset/peak, holds/drain bounds, compiler calls/warnings/protectedblobs, remaininglive gates. Remove qualifier, self-review scope/cancellation/unchangedguard comparison, CAS only expectedHEAD. Return DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED + reportref/SHAs/one-line tests/concerns. Root generates full BASEdiff and fresh independent spec+quality review. Do not activate next task.


---

# I/O fanout — approved test-fixture scope amendment

5nov2026. Requirements amendment to brief at executionBASE51c5db8e987755ccf2819ba861461916e0396943. Root granted this source/test-only exception while same sole writer implement_owner_io_fanout remained active. Not an operational permission or new source unit.

## Additional allowed file

test/fixtures/finite-owner-phase-context.mjs ONLY the following two constructions in the accepted derived phase fixture:

1. Enrollment timestamps: sample actual Date.now once for issuedAt; set deadline=issuedAt+5000. Preserve actual native clock, exact codec and every source field/limit. Original code issuedAt:Date.now(),deadline:Date.now()+5000 can exceed the codec5000delta by crossing a millisecond. Original failing values were not logged, so causal explanation is source-inferred, not a measured original5001delta. This is distinct from the measured fanoutRED child5001ms.
2. Invocation-local one-response latch in the DERIVED phaseContextRead test fetch hook, gated ONLY to held-fetch/held-body/held-cancel modes. First actual response follows original hold/read/cancel behavior; sibling uses its original unmodified response. The inherited single-release controls and actual-work-settlement/foreign-root assertions remain. Never earlyreturn/bypass othermodehooks. Use exact-one source marker checks. No generic queue API/new RPC/drain claim/sourceguard change. This preserves old one-held-operation regression intent while new fanout tests independently qualify dual lifecycle retention.

No other changes to this file or its normal semantics are authorized by this exception. Source initial-lease/stage-work/store/requesthelper/SDK/guards remain unchanged. No cache, reordered snapshots, reduced read, changed SQL clock or public capability.

## Evidence / bounded continuation

At745fc2a, Actions42048550578/job127318088611: full SDK57PASS0FAIL0SKIP, including23fanout cases. Subsequent adjacent180scommand timedout124 after53PASS1fixture-setupFAIL across54completed phase cases; schema next was in-flight. Root read primary logs. Single-samplefix approved; failed owner case now reaches intended source/second-read ownerdenial.

Remaining-only051b3fa/Actions42051365596/job127328018113: phase27completed24PASS3FAIL0SKIP. Three original held fetch/body/cancel cases report actual work did not settle; concurrent credential siblings overwrite one inherited callback slot. This is test-helper incompatibility with the new concurrency; retained work staying occupied is the source contract to preserve. Root selected one-response latch because the old regression's intent is one held operation and dedicated fanout hostiles exercise siblings. No relaxation of the real-settlement assertion.

Continue only these3failed cases + one final uninstrumentedSDKpositive covering sharedseedfix + six unstarted affected files. Keep prior57SDK/53phase/24remainingphase evidence; do not fabricate all-one-head fullpass or repeat them merely for report formatting. The earlier0463cdb qualifier failedYAML beforejobs; jobs[]/0native0compiler is an infrastructure receipt, not productRED. Corrected bound/regex qualification only, no productclockchange. Exact final count/report must disclose a possible unlogged in-flight compiler in the timed-out phase case rather than invent precision or rerun for counts.

Root sends final review this amendment alongside complete BASE..HEAD scope. Later wholebranch CI remains separate; current operationalReadiness=false;completePackage=false;PCoff=false.
