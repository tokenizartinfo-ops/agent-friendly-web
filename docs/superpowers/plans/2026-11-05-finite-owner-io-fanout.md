# Finite Owner I/O Fanout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Qualify fixed two-branch provider read concurrency within each existing owner phase snapshot, preserving every read and guard.

**Architecture:** Keep the private observation engine and its original native scopes. Join two full credential verifications, then join fixed QA/M read branches; only the complete joined DATA can reach common binding validation and the existing two-snapshot comparison. Do not change leases, stage-work, Unit2a, SDK or clocks.

**Tech Stack:** Existing JavaScript ES modules, native Promise/AsyncLocalStorage, Node node:test, repository-pinned Miniflare/workerd/esbuild and actual workers-oauth-provider; no new dependency.

**Spec:** [../specs/2026-11-05-finite-owner-io-fanout.md](../specs/2026-11-05-finite-owner-io-fanout.md). Read it alongside this plan.

**State:** **INACTIVE / DESIGN ONLY.** Root selected preparation, not execution. Root reviews/rejects and later supplies an activation BASE after D0.3 acceptance; there is one product writer. This plan's inspected source is d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72; do not implement on this docs branch or overwrite later source. No task/CI/runtime is dispatched by saving these files.

## Global Constraints

- Maximum **2 actual provider fetch/body/cancel lifecycles**; fixed structural bound, no caller option.
- Original child **≤5000ms**; original root **≤30000ms**; original Date.now/performance.now predicates and all earlier expirations unchanged.
- Static source ceiling **2026-11-03T02:59:00Z** unchanged/expired; test fixture substitution remains SYN.
- Original two complete snapshots and facts A→primary A→qualify A→primary B→facts B→qualify B order.
- Two fully verified credentials before QA/M branches; preserve QA pointer→QA version and M pointer→initial M version→ownedProject SELECT→current M version.
- Every endpoint, response/body/module validation, native holder, source/owner/fence/current config check remains; caps8192/65536/4500000B; no cache/reuse/clock widening/D1 aggregation.
- Same native SDK, lexical result/pending semantics, Unit2a store and genuine same-child consumption witness; no public interfaces/options/callbacks/authority DTOs.
- 112 provider GET in successful full consume/grant child;84 in SEND→grant ACK timestamp interval;80 factual D1 SELECT+16 preflight+2 writes in full child unchanged.
- All actual started promises retained through settlement; race/abort/timeout is not physical drain. No effect from partial winner or late settlement.
- SOURCE work only after root activation, in authorized cloud; no local installs/builds/containers. No runtime/provider/credentials/permissions/Entry/real grant.
- operationalReadiness=false; completePackage=false; PCoff=false.

## Review Focus

- Credential one-side rejection while sibling headers/body remain held: no descriptor request or partial source; retain the actual sibling.
- Primary branch failure while the other progresses through further read-only requests: never exceed2 live cycles or begin the next snapshot/effect.
- Authenticated owner/config/pointer drift around a join: preserve existing next-checkpoint denial without claiming atomic provider state.
- Slow native body cancellation after a raced child/root: keep the scope unavailable until every real promise settles; no release from wrapper settlement.
- Test instrumentation changing counts or SDK behavior: retain uninstrumented positive; I/O mode adds no strict-reader probes, source calls or fake successful results.

Each focus has named tests below. This is one unit; calibration is an internal gate, not a second product task.

---

### Task 1: Fixed within-snapshot provider fanout with native causal qualification

**Files:**

- Modify product: `lib/mcp-qa-finite-owner-phase-context.mjs`, credentials()/primary() around inspectedL145–189 only; keep request helperL92–107, factual engine and handler unchanged except lexical movement of these existing read/validation blocks.
- Modify test: `test/mcp-qa-finite-owner-qa-sdk-native.test.mjs`; reuse its world()/consent()/issued() setup and add named fanout cases.
- Modify test fixture: `test/fixtures/finite-initial-entry-world.mjs`; explicitly gated mocked-provider delay and I/O-only mode selection, normal mode defaults unchanged.
- Modify test fixture: `test/fixtures/finite-owner-qa-sdk.mjs`; expose test-only I/O trace/holds from instrumented native context; preserve existing D0.2 observed/unobserved branches.
- Create test fixture: `test/fixtures/finite-owner-io-fanout.mjs`; read-only source instrumentation for timings/lifecycle/hold boundaries, exact-match fail-closed replacements and sanitized trace decoding.
- Read-only regressions: `test/mcp-qa-finite-owner-phase-context-native.test.mjs`, `test/mcp-qa-finite-owner-request-retention-native.test.mjs`, `test/mcp-qa-finite-owner-request-retention.test.mjs`, `test/mcp-qa-finite-preparation-issuer-native.test.mjs`, `test/mcp-qa-finite-profile-native.test.mjs`, `test/mcp-qa-finite-profile.test.mjs`, `test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs`.
- **No edits:** `lib/mcp-qa-finite-initial-lease.mjs`, `lib/mcp-qa-finite-stage-work.mjs`, issuer-store/journals/SQL, forwarder/receiver/token host, SDK version/profiles/config, workflows or dependencies. If a fixture requires an additional file, stop and submit the exact need to root instead of broadening silently.

**Interfaces:**

- Consume existing observeOwnerPhasePair({ctx,env,parent,preconnectionId?}), request(path,cap=65536,token=reader), child(work), owned(), retain(promise), current(clock.lease); no signature changes.
- Private product functions exactly as spec: verifyCredential(token:string,id:string,expiresAt:number):Promise<void>; credentials():Promise<void>; readQaPrimary():Promise<{qaMetadata}>; readMPrimary():Promise<{project,pointer,currentConfiguration,configuration,initialBaseline}>; primary():Promise<{project,pointer,currentConfiguration,qaSdkBindingFacts,initialBaseline}>. All nested in the same run closure, not exported.
- Test-only new mode: `phase-context-sdk-io-observed`. Keep current `phase-context-sdk`, `phase-context-sdk-observed` and restart behavior intact. Extend world(fn,{observed=true,restart=false,ioObserved=false}={}); ioObserved requires observed=false and restart=false for the timing trial, otherwise test setup throws.
- Test-fixture signature extension only: extendFiniteOwnerQaSdk(entry:string,{observed=false,ioObserved=false}={}):string; initialEntryHarness passes ioObserved=true only for the new exact mode. finiteOwnerSdkWorkers(qa,{observed=false}={}) remains unchanged and receives observed=false for that mode.
- Fixture helper exports: instrumentFiniteOwnerIoFanout(source:string):string; decodeFiniteOwnerIoTrace(value:unknown):ReadonlyArray<IoEvent>. Neither is imported by product.
- IoEvent exact DATA fields: {kind,ordinal,primaryOrdinal,branch,endpoint,phase,at,bytes,outcome}; nullable fields permitted only when inapplicable. kind∈{child,primary,provider,join}; branch∈{credential,qa,m,null}; endpoint∈{verify-reader,verify-publisher,qa-deployment,qa-version,m-deployment,m-initial-version,m-current-version,null}; phase∈{start,headers,body-settled,cancel-start,cancel-settled,settled}; outcome∈{fulfilled,rejected,null}; at finite native milliseconds, counters nonnegative integers. No headers/tokens/URLs/resource IDs/content.
- Test-only DO methods: ioObservation():Promise<ReadonlyArray<IoEvent>>, ioHold(point), ioRelease(point). Fixed points=credential-reader-body,credential-publisher-body,qa-body,m-body,qa-cancel,m-cancel,after-primary-join; arguments are fixed test enum only. They pause an actual operation and never forge its return or frame.
- Host fixture property `f.ownerIoDelayMs` defaults0; allowed0/50 for this task. `f.ownerIoReady` defaultsfalse and becomes true only in the test after original setup plus valid GET consent. Provider GET delay is applied only when ready and mode matches. No injected delay to fixture setup/JWKS/ledger/D1/SDK. Error/hold configuration remains test-only.

- [ ] **Step 1: Record activated source and prepare causal tests before product edits.**

  Root activation must identify BASE and sole writer after D0.3. Compare its phase/fixture changes with d630 and preserve all accepted changes; report conflicts, never rewind. In cloud, add the isolated I/O mode and named tests below while product is still serial. Native clocks remain real. Source instrumentation observes entry/settlement and may hold operations; it must not replace read return values, common validation, SDK outcomes, app grant or real calls.

  I/O-only instrumentation uses exact-one marker checks, not permissive replaceAll that silently matches nothing/many. Existing sdk-observed injects strict-reader source calls at SEND; **do not combine it with I/O timing**. New I/O mode leaves actual SDK/KV methods unwrapped. Instrument the **whole** original child around its consume/grant block, including initial recheck and final durable ACK/recheck; the observer may record original l/w identity equality as booleans in existing probes, never return a lease or witness.

  Lifecycle starts before actual fetch and settles only after actual stream read/cancel finally has settled, including rejection. If an outbound response wrapper is used, its headers return is not cycle completion. Fixture traces must verify all expected marker matches and startup cleanup on failure.

- [ ] **Step 2: Establish the unmodified serial control and the50ms RED cause.**

  Add these tests in the existing SDK native test file:

  | Exact test name | Causal assertions |
  | --- | --- |
  | fanout causal control keeps full native child volume | delay0; successful actual POST; full child112 with per-endpoint counts{verify-reader:16,verify-publisher:16,qa-deployment:16,qa-version:16,m-deployment:16,m-initial-version:16,m-current-version:16}; SEND→ACK84; no unexplained category; before change peak1 recorded, candidate peak≤2 |
  | fanout 50ms provider delay fits the original same child | after valid GET set ready=true/delay50; POST must302, same genuine store/child, child elapsed<5000 and original ACK deadline; code/grant remains actual, not trace authority |
  | fanout fixed two branches preserve credential and snapshot barriers | cause overlapping provider cycles, assert peak===2 and never>2; no descriptor start before both verify fully settled+validated; QA/M dependencies and primary ordering; every full child count unchanged |

  Run future cloud commands from repository root:
  `node --test --test-concurrency=1 --test-name-pattern="fanout causal control|fanout 50ms|fanout fixed two" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs`

  Expected before product edit: delay0 passes;50ms expected-success test fails because the original child expires, not because setup, observer or fixture construction failed; fixed-two test shows peak1. Record statuses, native elapsed/margin, provider prefix counts and expiry cause without data. Serial full112 delay50 requires≥5600ms of added waiting, so it cannot fit5s; a failed run may stop before112 and must not fabricate a full multiset. No baseline reconstruction/mock source success.

  **Calibration gate:** if delay0 fails, fix the observer/setup independently before using its timings. If50ms RED occurs outside the intended child or no causal expiry is established, stop and report actual timing/depth to root. Do not move delay into preparation, backdate Date, alter clocks, relax assertions or silently choose another delay. No implementation acceptance based solely on RED.

- [ ] **Step 3: Implement only the fixed private schedule.**

  In phase-context extract the unchanged per-credential block into verifyCredential and QA/M blocks into the named private functions. credentials creates exactly two retained promises from fixed lexical calls and retains a Promise.allSettled join; require both fulfilled then current(clock.lease). primary awaits credentials, creates exactly two retained fixed branch promises, joins them the same way, checks current again, then performs the original two qualifyFiniteOwnerSdkBindingFacts calls and builds the original PhysicalObservation.

  Neither branch begins another request until its prior request/finally completes; if a child wait rejects, that branch ends. Preserve request lifecycle retention verbatim. A join with a rejected branch throws the original fail-closed phase error, does not return its sibling DATA and does not start a snapshot/effect. No fallback, cache, dynamic pool, branch-selector option or authority object. No changes to initial-lease or stage-work are required by inspected source.

- [ ] **Step 4: Verify GREEN for the same causal workload and honest Date.**

  Run the exact Step2 command at the candidate head. Required: delay0 and delay50 actual result assertions pass, two cycles demonstrably overlap, peak≤2 across headers/body/cancel, all112 successful-child GET unchanged, original child/root deadlines intact. The test delay waits at least50ms on native performance.now, using bounded timer awaits rather than spin or fake clocks; report actual elapsed if scheduling adds more. The provider response Date is produced from real Date.now at headers emission after the test delay; nowOffset stays0 in the timed flow.

  Report observed full-child elapsed, durable ACK/final recheck completion and remaining margin, not just grantAck.observedAt. Nominal fanout depth64×50=3200ms plus native/DO/D1/payload/tail may still exceed5s. If it does, report FAILED viability under50ms with actual timing and stop for root's ruling; do not mark Task1 complete or tune a passing threshold. Keep the source change reviewable, not operationally enabled.

- [ ] **Step 5: Add and run hostile native join/lifecycle cases.**

  Add parameterized cases with these exact name prefixes; each assertion is observable outcome/state/trace, not function text:

  | Name prefix and variants | Assertions |
  | --- | --- |
  | fanout credential failure retains held sibling [reader,publisher] | actual other credential body held; first rejects; no descriptor starts, no form/SDK/grant; foreign root denied until held body and cancel settle |
  | fanout branch failure cannot release held sibling [qa,m] | one real body held, other rejects HTTP/envelope; no partial success, no next primary/effect, peak≤2 even after timeout; release is settlement only |
  | fanout current facts drift denies at join [owner,pointer,module,configuration]×[before-join,after-join,between-snapshots] | mutate actual fixture data at a causal barrier; before-join data must be read by the affected branch; after-join mutation is placed after the first primary of the pair and must be read at its second existing primary; original validation denies before its following effect/ACK; no claim to detect unobserved post-checkpoint change |
  | fanout native abort retains body and cancel [parent,request-signal]×[body,cancel] | use actual propagated native abort boundary, hold real pending work; no late ACK/code/grant, original scope stays occupied until all settle; aborting a dispatch wrapper alone is not assumed propagated |
  | fanout sibling lease expiry never renews outer child | late headers/body beyond original child denies even if other branch already finished; no replacement child or new SDK continuation |
  | fanout completed sibling never masks holder replacement | replace native holder while other branch held; after release fail closed, no frame/result-authority fallback |

  Use real denied/occupied observations already exposed by the native fixture, not swallowed exception text. For after-join hooks, pause at the join AFTER actual original validations and mutate ahead of the next existing primary; never insert an extra successful check to make the test pass. Restore/release held mocks in finally; await actual settlement then dispose. Unknown/late success remains in its original journal state.

  Run:
  `node --test --test-concurrency=1 --test-name-pattern="fanout" test/mcp-qa-finite-owner-qa-sdk-native.test.mjs`
  Required all named cases PASS with no skipped hostile variant, all lifecycle counters settled at cleanup, no unhandled rejection. Do not interpret a denied HTTP response as physical drainage.

- [ ] **Step 6: Run affected existing qualification, including the independent SDK positive.**

  In authorized cloud run:
  `node --test --test-concurrency=1 test/mcp-qa-finite-owner-qa-sdk-native.test.mjs test/mcp-qa-finite-owner-phase-context-native.test.mjs test/mcp-qa-finite-owner-request-retention-native.test.mjs test/mcp-qa-finite-owner-request-retention.test.mjs test/mcp-qa-finite-preparation-issuer-native.test.mjs test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-profile.test.mjs test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs`

  Preserve the existing exact test **uninstrumented actual native source/SDK/Unit2a GET POST returns one original grant and code** with unwrapped KV/SDK and no I/O source transforms. Preserve actual handler SQL queued5100ms open/grant denial, same-store/same-child probes, strict reader denial at own unresolved SEND, no new authority from journal DTOs, no-schema/lone-source/malformed variants, stable prior profiles and original pair503 result. Existing observer failures are not permission to weaken those checks.

  Verify controlled-file lint:
  `npx eslint lib/mcp-qa-finite-owner-phase-context.mjs test/mcp-qa-finite-owner-qa-sdk-native.test.mjs test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-qa-sdk.mjs test/fixtures/finite-owner-io-fanout.mjs`

  No broad npm/build invocation until this affected gate passes or a concrete new concern justifies it. For root's integration gate, preserve the repository full Node command `npm test` once on the final candidate; accepted equivalent CI may satisfy it. Required repository lint/build remain integration checks through established cloud CI, not a new deploy or duplicated all-scope benchmark. Keep exact run/head/results and distinguish affected gate from full-node qualification.

- [ ] **Step 7: Review the single unit and commit its exact scope.**

  Check source diff contains only scheduling/extraction; all request/header/body/caps, fields, comparisons, module downloads, D1/store/SDK paths and leases unchanged. Compare source variants and successful count/byte expectations with unmodified control. Ask root/fresh authorized review to reject or accept this whole unit; report calibration failure honestly.

  Future cloud commit commands (not run by this design task):
  `git add lib/mcp-qa-finite-owner-phase-context.mjs test/mcp-qa-finite-owner-qa-sdk-native.test.mjs test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-qa-sdk.mjs test/fixtures/finite-owner-io-fanout.mjs`
  `git commit -m "perf(afw): bound owner primary provider reads to two concurrent lifecycles"`

  Deliver commit/ref, exact test heads and counts, child112/interval84 trace, RED/GREEN or failed50ms record, unresolved risks and false operational flags. No merge, deployment, access installation, CI dispatch outside activation, real probe, or second product writer follows automatically.
