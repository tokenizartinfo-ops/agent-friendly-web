# Task1 — cold-consumer attribution: causal pure regressions before fixes

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web, public1347578006. ENVIRONMENT Source/SYN GitHub Actions only; ORIGIN GitHub connector. RESOURCE_TYPE isolated Source branch; RESOURCE_ID feat/finite-native-cleanup-20261101. ALLOWED_ACTION the bounded pure RED/GREEN below, not native qualification or production. ROLLBACK own changes only by CAS, readback and no force/reset. Root owns Rootdocs separately. Same Task1 and plan docs/superpowers/plans/2026-11-07-finite-native-budget-qualification.md; no new task or parallel writer.

## Baseline, evidence and authority

BASE 0da5ff6a51abf559139b86e41925af72d5b49e1d, tree 7f69b3a1ae7a5b7a082ee516214826b2591d6a5d, 3188 leaves, TEMP absent. Main 0c9c475b3ebaa970fc11d628b40e50a90cceb727. Task1 GLOBALBASE 29681cae2bf1094ec5c66d5b2784254f77bec697 remains the review base.

Original full9 43121646075/1 failed in P1 observed metrics after the business assertions. Read-only diagnostic 43125759405/1 authenticated its exact consumer-failure artifact13902156351; it did not execute native work or I0. Only consumer/QA/epoch0 had 16 invocationIdentity; first ordinal43, 11 before and 5 after the first retained-operation omission. No readerOrigin, scope loss or numeric overflow. All 24 business bitmap checks true; ready54339ms before C0, dbNow2811ms after C0. allP1Phases=false, but the final assertion was not reached. Safe diagnostic artifact13902232875 exact readback passed. Those facts do not identify all 16 sites.

Root accepts three falsifiable STATIC hypotheses for small regressions, not as already proven causes:
A. initial-cleanup transact passes work({r,put,alarm:...}); put is a local wrapper around the actual native tp call. Current object-literal facade selection omits shorthand. The first outer tx.put is consistent with recorded ordinal43.
B. cleanup-journal Reflect.apply(c.transaction,...) can leave native callback tx unmarked; cold runtime may not yet know the function. Producer zero-error history is a control, not grounds to assign the balance by subtraction.
C. sdk_lookup phase overlay is lost on reentry through run(originalLease), which reloads its stored phase. Actual scope identities and business work remain unchanged.

## Closed edit scope

Only:
- test/finite-budget-diagnostics.test.mjs
- test/fixtures/finite-budget-world.mjs
- test/fixtures/finite-budget-diagnostics.mjs
- .github/workflows/afw-finite-budget-qualification.yml (TEMP)
- docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md (append report)

All other leaves must equal BASE. No lib/**, worker/**, descriptors JSON, SDK, package/lock, compatibility, configs, custody helper, Node evidence verifier or native P1 test changes. Do not add a generic exporter, arbitrary workflow input or another observer feature. No subagents or reviewers. Formal Task1 review comes from Root after the complete qualification.

## RED: confirm defects independently, before observer/compiler edits

Use the current real transformBudgetPreparedSource and createBudgetRuntime. Add focused behavior assertions to existing relevant Q cases (retain original 8Q count), not a parallel implementation of the transform. Read writing-good-tests.md before writing tests.

1. From the pinned actual initial-cleanup module, transform its real source and extract the exact selected facade literal and tx.put call expression by AST. Execute those transformed expressions with a memory-native test transaction, a registered original child and real runtime hooks. Real effects/this/arguments/result/promise identity must stay exact. One wrapper call produces exactly one native leaf put started and settled, zero invocationIdentity. Controls: an equivalent explicit facade; a shorthand bound directly to a captured native alias that must still count; an unknown function with no native leaf that must remain incomplete. Do not rewrite or copy the production algorithm just to manufacture a passing case.
2. For B, transform the pinned real journal callback form and exercise it cold, before any shared native-function registration. Its tx native leaf must count once under the same actual original Root/child. Compare to the existing recognized transaction form and to an unregistered/unknown function control. A test that already passes rejects that hypothesis; report it and DO NOT change its implementation.
3. For C, one known leaf in phase('sdk_lookup',()=>run(sameChild,...)) must carry sdk_lookup, preserve original Root/child/deadline, exact returned promise and outer phase after return. Include nested child under the same Root, alias as applicable, distinct/concurrent Root and error/rejection controls. The phase overlay is observational, not authority; no inherited child identity from another scope.

One short pure RED workflow on Node22/current lock, Ubuntu24.04, <=5min; one job, contents:read/actions:read, no secrets/environment, no native fixture/Miniflare instantiation, no I0. Install existing locked dependencies only in runner with npm ci --ignore-scripts --no-audit --no-fund. Use attempt1/fixed Source branch/self-path push/no inputs/cancel-in-progress false. Run only relevant Q names or the existing eight pure Q if needed to expose independent failures. Record exact TAP and failures; the wrapper may require the expected failing exit to preserve RED evidence, but must not turn an unexpected setup/parse/dependency failure into a causal test pass.

Freeze Source for run; exact Source/run/attempt and same-ID artifact readback of only safe TAP/result/manifest. Keep logs and records bounded; no actual secrets or native state. Compare all protected blobs before activation. If RED does not reproduce a hypothesis, stop that candidate, explain and keep its implementation unchanged. No second blind diagnostic/native cycle.

## Conditional minimal fixes and GREEN

Only after the relevant RED is observed for the correct behavioral reason may the SAME writer implement that candidate's minimal correction:
- A: identify the source-proven local wrapper binding/closed selector. Never mark all shorthand properties as facades: a shorthand can directly alias a real native function. Count the leaf, not the adapter, without hiding unknown calls.
- B: only if its cold callback regression fails causally; recognize the source-proven native transaction argument path, not method-name inference that labels an arbitrary facade/native tx.
- C: preserve an explicitly active observational phase on same-Root reentry while selecting the actual requested lease's original Root/child/deadline. Different Roots remain isolated; async context must restore on success/throw/rejection. No mutating lease identity or authorizing work.

No dropping assertions, invented Roots, larger caps, clock changes, extra await/IO/native probes, native method replacement or converted promises. Preserve original calls/getters/this/evaluation order/returned promises/errors/closures and all 54 reader-site identities. Static selectors and hook counts must stay exact; update their test-only expected counts only when justified by the accepted minimal compiler change. Fixed production input hashes and descriptor pins remain unchanged.

One pure GREEN run with syntax/lint, all existing 8Q and current exact preflight compilation (130 fixed paths,635 groups,54 reader sites); custody tests already passed unchanged, no need repeat them unless a changed dependency justifies it. Same short workflow/artifact readback conditions. No full900s/P1 in this block; no historical-state mounting or decryption is needed.

## Report and STOP

Append causal RED Source/run, exact failure names/codes vs hypotheses, minimal changed functions, GREEN Source/run and artifact readbacks. Explicitly distinguish pure memory-native test fixtures from real Miniflare/native/P1 or provider quotas. If any hypothesis stays unproven, or GREEN fails for a new cause, report it rather than layering unrelated fixes. Retire TEMP after terminal results; verify full tree and main. Return Source HEAD/tree, blob identities, changed-path proof, report and concerns. STOP_WRITES pending Root review/ruling on coherent full9.

operationalReadiness=false; completePackage=false; PCoff=false. No real Cloudflare resources, deploy, main, PR, OAuth, OTP, credentials, cron, Containers, users, Max, email or Chavo messages in this block.
