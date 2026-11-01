# Task 1 — immutable finite trial control
2026-11-01 · AFW · source only · operationalReadiness=false

## Scope and source identity
- Repository: tokenizartinfo-ops/agent-friendly-web.
- Branch: feat/finite-native-cleanup-20261101.
- Assigned BASE: 8b3ebb647edca8249aa1c8f237c047c996ba858d.
- Accepted dependency: main cd13d3de95e32adaef0411e94b5665dae3cdbcc2 / PR709.
- Final code head: a5cefc7df7c6644bcb9bb94f2b8ba1e851216dc8.
- No existing runtime, wrapper, guard, finalizer, profile, custody, grant, schema or default behavior changed. No local source/dependencies/builds or child agents. All edits used remote Git trees/commits with expected-head leases; all execution used GitHub Actions.
- Rollback is source revert only. No storage deletion, budget refund, historical rewrite or intent reuse.

Files: lib/mcp-qa-finite-trial-control.mjs; test/fixtures/qa-finite-trial.mjs; test/mcp-qa-finite-trial-control.test.mjs; test/mcp-qa-finite-trial-control-native.test.mjs; this report and the plan progress ledger.

The temporary .github/workflows/finite-task1-temporary-qualifier.yml is BRANCH-ONLY qualification scaffolding. Root must exclude it from eventual source integration; it runs on push only to this exact branch, with contents:read, no runtime credentials/deployments. It is not the Task3 external finalizer.

## Implemented contract
The unmounted private factory validates bounded, exact canonical own-data plan bytes and computes domain-separated plan/control hashes. Original authenticated command metadata is compared against the trusted fixed primary admission producer: T0=command.createdAt, N1=T0+300000, C0=N1-60000, C1=N1+120000, R1=N1+180000. At least 180000 ms nominal remaining is required throughout prepare; future timestamps and clock reversal deny without compensation. Every observed consent deadline only narrows the invocation through every await/write/return, and the immutable nominal claim retains that narrower deadline.

QA source/native profile and the canary deny-first containment artifact have distinct plan-bound tuples. The latter includes canary source revision/version/module/profile/binding hashes; no equality between two different Worker artifacts is fabricated.

createPrivateQaFiniteTrialNativePin is a private constructor-only coherence token branded by WeakMap. It captures the actual native ctx storage/actor and env namespace/version/binding identities, all four release flags true and all fourteen existing QA flags false. It reads no secret, does not clone/freeze env, and does not infer native class/resource provenance from arbitrary methods. Concrete primary module/config/binding and authenticated-command producers remain mandatory Task2/4 work. No arbitrary attestation DTO is accepted as nativePin.

prepare writes immutable INFO, pending control, fixed head and original alarm in one transaction; reads back stored INFO and getAlarm separately; then rechecks actual pin, bounded primary evidence and exact finalizer readiness before pending→armed CAS. Finalizer evidence binds repository/run/attempt/source/intent, distinct nominal run, exact in-progress finalizer job and completed successful admit-and-ready step plus fixed admission/resource/custody/window evidence. A ready boolean, queued run, wrong job/source or incomplete step does not qualify.

Original legacy control/prepared_dispatch=issued/reduction_dispatch=complete/restoration absent/retirement absent remain byte-for-byte unchanged. Their hashes and uncertainty remain bound. The primary predicate requires source-qualified prospective deny-first containment, isolated entered writers, old packet fences/revocation/expiry, separate legacy writer terminal evidence and complete current/new-scope quiescence. V2 records, orphan finite records, competing heads and altered histories block.

INFO has planned selectors/save key/expected revision only. Fixed internal captureObservedFacts(subscription|process|saved_event) obtains bounded technical facts from fixed first-primary producer methods, checks exact deterministic event ID/save fingerprint/expectedRevision+1 and unchanged primary subscription/process receipt/generation correlations, then appends once under unchanged controlHash. Missing facts return not_yet_observed without writes. Capture attempt is journaled before fact append. Lost ACK can only reconcile the exact retained record; an issued attempt without a record remains reconcile_only. No subscribe/save/delivery retry or caller facts are accepted.

Effects are exactly nominal, withdraw, close, seal, canary_restore and qa_restore. Claims are immutable issued-before-send facts, not business effects or portable authorization. Restoration claims bind the same retained proof hash through their separate journals; the concrete proof validator/transport remain Task2/3. reconcileEffect reads the trusted exact receipt only; never marks completion, retries, refunds or rewrites the claim. withdrawNominal leaves original cleanup authority/alarm intact. Cleanup is allowed for pending controls under C1/R1 without nominal OAuth renewal.

## Explicit limitations and costs
1. This is intentionally first-intent-only. It never advances/clears the fixed finite head, even after expiry/withdrawal. A consumed prior intent blocks a new intent; a later repeatable lifecycle requires separate reviewed design. Do not spend the unique first-successor occurrence on an extra rehearsal.
2. Only the SAME control instance that successfully acknowledged prepare may issue the one nominal claim. Lost arm ACK, hibernation or reconstruction loses nominal eligibility. Durable read/facts/cleanup remain available; neither an armed row nor replayed prepare revives nominal work. Task4 must compose that instance or obtain a separately reviewed trusted handoff.
3. Fact/primary/GitHub providers in tests are synthetic. Native tests use real workerd DO SQLite, transactions, actor IDs and D1/DO bindings, but simulated version/command/source/GitHub evidence and a persisted future test clock. They do not prove deployed source, live consent, real containment, guard execution, useful delivery, unsubscribe or PC-off.
4. No guard/proof/finalizer/Workflow integration was added. NativePin is coherence, not provenance; producer absence must remain unmounted. read() exposes retained private facts only inside trusted composition.
5. Native pending test models primary failure after pending commit; unit tests additionally model lost initial/armed CAS ACK, delayed commit and lost fact append/claim ACK. Neither claims atomic cancellation of remote writes.

## TDD and cloud evidence
- RED 375c28573f4ff28112165816c4fc4096bfac5b73: Actions 41314102576 / job 124870400077. 40 tests: 13 PASS, 27 FAIL, 0 SKIP. Required factory was undefined; no implementation existed. Negative grammar cases already threw, hence their passes.
- First implementation 1c63fdd1a6f68f72d0df2cad564a9575718c959d: Actions 41314501853 / job 124871581651. Focused 42 PASS; native 1 FAIL because the synthetic alarm was in workerd's past and fired immediately. Fixture corrected to a persisted future synthetic timestamp, preserving its original clock across reconstruction.
- 99581193904ac48eff312a43336bb1e6dd624faf: Actions 41314749999 / job 124872308918. 49 focused + 1 native + 89 nearby PASS; scoped lint 0 errors, 1 new unused fixture warning, subsequently removed.
- c236cd600596e422f2653182b49872d0ef8a9e4c: Actions 41314954159 / job 124872908998. 53 focused + 2 native + 89 nearby PASS, no failures/skips; scoped lint clean.
- FINAL a5cefc7df7c6644bcb9bb94f2b8ba1e851216dc8: Actions 41315067210 / job 124873249214. 53 focused + 2 native + 89 nearby PASS (144 total), 0 FAIL, 0 SKIP; scoped lint clean. [Exact run](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41315067210) / [job](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41315067210/job/124873249214).

Exact commands (Node22 on GitHub-hosted ubuntu-24.04):
```sh
npm ci --ignore-scripts --no-audit --no-fund
node --test --test-reporter=spec test/mcp-qa-finite-trial-control.test.mjs
node --test --test-reporter=spec test/mcp-qa-finite-trial-control-native.test.mjs
node --test --test-reporter=spec test/mcp-qa-generation-ledger.test.mjs test/mcp-qa-execution-identity.test.mjs test/mcp-own-synthetic-save.test.mjs
npx eslint lib/mcp-qa-finite-trial-control.mjs test/mcp-qa-finite-trial-control*.test.mjs test/fixtures/qa-finite-trial.mjs
```

Full integrated suite/build/source promotion is root's later gate, not claimed here. Framework punycode and GitHub action-runtime deprecation notices are separate from scoped source lint.

## Self-review and residual gates
Self-review corrected ACK-local acknowledgment timing, exact stored capture/effect grammar, unknown prefix records, fresh subscription/process correlation, same-proof separate restoration claims, actual narrow claim deadline, consumed nominal eligibility and sticky clock reversal invalidation. Root interim source checks corrected distinct QA/canary artifact tuples and preserving narrower consent across awaited finalizer/fact/storage operations.

Root independently reviews this exact Task1 code head next. Remaining tasks must supply real trusted primary producers, containment/native admission seal, guard and retained cleanup proof/completion, bounded fixed transport and independent finalizer, and actual wrapper/profile. No live mutation, finalizer readiness, physical stop, PC-off or operational-readiness credit follows from these tests.
