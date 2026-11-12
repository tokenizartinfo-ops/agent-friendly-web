# Task1 addendum — preserve the observer callback receiver

PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web/public1347578006. ENVIRONMENT Source/SYN GitHub Actions. ORIGIN GitHub connector. RESOURCE_TYPE isolated Source branch; RESOURCE_ID feat/finite-native-cleanup-20261101. ALLOWED_ACTION this test-only causal RED/GREEN and cleanup. ROLLBACK own changes only, CAS/readback, no force/reset. Rootdocs branch docs/finite-pcoff-continuation-20261103 is Root-owned and separate.

This is the same IN_PROGRESS Task1 under docs/superpowers/plans/2026-11-07-finite-native-budget-qualification.md. The previous writer has finished its bounded block; its seat is no longer available after the tool session renewed. Resume from durable Source, do not repeat completed A/B/C investigation or tests. No subagents, helper, reviewer, main, PR, deploy, runtime, credential, browser, email or provider work.

## Exact clean BASE and accepted evidence

BASE da70e2358b18f9db750e67ea6eab37fb54a96257; tree c807af716c5dd14e09a59df7f9b082646bf90bf2; 3188 leaves; TEMP absent. Parent fcb130a9b7c6445ddc961b96f994ce605dadf375, only TEMP removal/report changed. Report docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md blob5173c1033d88ae18f9d494f686fa2fd2ea4dd708; read its last section only for this block, not all history. Main last verified0c9c475b3ebaa970fc11d628b40e50a90cceb727; verify fresh before mutations.

Previous pure RED43128157794/1 Sourcec1383a15d4e13cc7720508531e41deaea6f08b5b: 8Q,5pass/3independent expected ERR_ASSERTION, A shorthand adapter, B cold journal tx identity, C same-Root phase overlay. GREEN43128506060/1 Sourcefcb130a9b7c6445ddc961b96f994ce605dadf375:8/8,syntax/lint and exact compile-only preflight176role inputs/130fixed paths/635groups/54reader sites PASS. Its encrypted-custody helper and original P1 are not involved. Artifact13904770974 ZIP1542B/SHA25642f22599a50c1961d560b441472fe613224c5928637cb98caa79ed5069e80e12 passed same-ID three-file readback.

Current compiler blob f654001b027555c41dbe3f287445e73ac849094b; runtime816d3c8bfababf94ce4a808e1313a43b090d844e; testc08ae0d6a8b780bbc54a1a72c1d85714162b6304. A/B/C corrections and their controls are accepted only as pure regression evidence, not full native qualification. Do not change them in this addendum.

## Proven concern and minimal correction

Before C, run and phase invoked callbacks through zero-argument arrows. Current runWithPhase and run pass invoke directly to AsyncLocalStorage.run. Node22.23.4 internally uses ReflectApply(callback,null,args), so a strict ordinary callback gets this=null rather than the original plain-call undefined. Current emitted business callbacks are arrows and no affected business site was identified, but the hook receiver contract changed. This is a correctness concern to resolve before full9, not a reason to change Root/phase design.

Only two implementation replacements are authorized, after new RED:
- runWithPhase: als.run(immutable({...store,phase:value,phaseOverlay:value}),invoke) becomes als.run(immutable({...store,phase:value,phaseOverlay:value}),()=>invoke()).
- run fallback: return als.run(store,invoke) becomes return als.run(store,()=>invoke()).
Require each old expression exactly once. No extra await, new API, refactor, wider phase propagation or native/lease method changes.

## Closed paths and TDD sequence

Allowed paths:
1. test/finite-budget-diagnostics.test.mjs
2. test/fixtures/finite-budget-diagnostics.mjs
3. .github/workflows/afw-finite-budget-qualification.yml (TEMP)
4. existing Task1 report above, append only.

All other leaves including compiler, evidence, descriptors, custody helper, native P1, lib/worker/SDK/package/lock/config/compatibility must remain exact BASE. Use remote GitHub trees/commits/CAS, no local checkout/deps/build/test. Cloud branch adapts the existing SDD workspace; do not create a new plan.

Read TDD/writing-good-tests and verification-before-completion skills. Add a new behavior assertion at the end of existing coldPhaseReentry/Q3 so its accepted phase controls run first. Use an ordinary strict callback returning this. Evaluate all three paths before asserting their receiver values: run(child,callback); inside an established run(child), phase('sdk_lookup',callback); and phase('sdk_lookup',()=>run(child,callback)). Expected [undefined,undefined,undefined], current predicted [null,null,null]. Fixed message: cold-C original strict callback receiver. Preserve all eight Q identities/counts and their existing assertions. This adds no native leaf and needs no external state.

One short pure RED before touching runtime: all8Q should produce exactly Q3 ERR_ASSERTION at that receiver assertion,7pass/1fail,0cancel/skip/todo. Check current code unchanged by blob. No setup/parse error counts as causal RED. Use current locked deps and Node22/Ubuntu24.04; one job<=5min,contents:read/actions:read,no secrets/environment. Self-path push only for the exact Source branch,attempt1,no inputs,cancel-in-progressfalse. Existing fcb130a9 .github/workflows/afw-finite-budget-qualification.yml is a known previous pure workflow template. Set RED expected marker to the new receiver assertion and require exactly Q3 failure. No native preflight is needed in RED.

Freeze Source through terminal and exact same-ID safe artifact readback (tests.tap/result.json/budget-artifact.json,7days). Use existing sealBudgetArtifact/verifyBudgetArtifact, not another custody format. Keep logs closed/bounded. Only synthetic memory tests; no Miniflare construction,I0,SDK/native lifecycle, historical artifact decryption, permission or credential.

After RED is confirmed, apply only the two trampoline replacements, leaving the exact RED test blob unchanged. One GREEN of all8Q plus syntax/lint and current compile-only preflight (176role inputs/130paths/635groups/54reader sites; I0Opened=false/nativeExecutionProduced=false). Actual Source/run/attempt, correct TAP8pass/0fail/cancel/skip/todo and same-ID artifact bytes must be verified.

## Report / stop

Append RED/Green Sources,runs,jobs,exact assertions and control results, artifact IDs/digests/readbacks, runtime/test blobs and changed paths. Distinguish pure callback preservation from complete Task1 or native/PCoff readiness. No repeat of custody9tests, old R0, prior A/B/C RED, original900s, full9, Task2 or real trial. Retire TEMP after terminal results; compare full tree/all protected blobs against BASE and verify main unchanged. Return clean Source HEAD/tree/leaves/report and STOP_WRITES.

Root will separately decide next coherent full9 after this concern is cleared. operationalReadiness=false; completePackage=false; PCoff=false. No human intervention pending; the existing GitHub encryption key already worked, do not recreate it.
