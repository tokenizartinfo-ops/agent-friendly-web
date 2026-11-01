# Task3 — finite native observer and external QA finalizer

Status: DONE_WITH_CONCERNS, SOURCE ONLY. operationalReadiness=false.

Repository: tokenizartinfo-ops/agent-friendly-web. Branch: feat/finite-native-cleanup-20261101.
Task3 BASE: 529fac1a99a167aaeccac4ada96a41904adb771a (accepted Task1/Task2 plus pinned Task3 handoff).
Final qualified source HEAD: aaa3a5cb663993d1843f6a432b98f98810a94f3c.
This report and progress-ledger update are a documentation-only child of that source checkpoint; coordinator handback records that child commit. No main merge, deploy, real command, provider operation, live credential/permission probe, DDL, OAuth, Max action or finite occurrence was performed.

## Result
- Fixed PrivateQaBootstrap observer, deterministic original intent/source instance, and exact fixed IndependentClosure methods. Preview shares native canonical plan/control/resource reference computation and performs no journal/alarm/ready write. Its mandated material DTO is unchanged.
- Own Workflow executable provenance envelope binds compiled source, actual own version_metadata and original event.instanceId, independently of the DO preview. Missing compiled source/material factory fails closed.
- At most 32 TOTAL read-only step.do calls: preview, up to 30 distinct cleanup observations across original C0..R1-5000, final-primary receipt. One separately named no-retry native qa_restore claim after settled cleanup. Only newly acknowledged issued native claim enters output; existing/unknown does not.
- Native final-primary read correlates actual control/proof/completion/claim before and after, native/source pin and exact proof primary facts. The immutable receipt requires full scoped writer exclusion, including held remote writes. This explicitly replaces the impossible external D1 query.
- Bounded technical projection excludes raw selectors/consent/legacy payload. External finalizer validates retained discriminated proof, native claim, exact observer terminal output and immutable first-primary receipt while independently rechecking closed deployment/module/configuration/ns/exposure/full Workflow/provider chain and original custody.
- Separate append-only GitHub annotated-tag/atomic-ref send fence under intent/control/qa_restore. Content binds claim/proof/exact run/attempt/restore job/source/candidate/target. Only NEW ref201 acknowledged by the same execution enables the sole QA POST. Existing/lost ACK/restart is GET-only; tag object alone grants no authority; no deletion/force/refund.
- Separate fixed finalizer workflow/run: admit/poll never holds QA writer lock; restore acquires existing writer group after that same run's admit completes. Both jobs explicitly actions:read and contents:write, protected existing CF environment, no anonymous fallback/nominal dependency/shared cancellation group. Admission has contents:read only. Existing closed-only workflows/command remain unchanged.
- Exact new owner issue497/main/attempt1/source command and original authenticated T0. N1/C0/C1/R1 never renew. Readiness margin propagates across await/tag/ref boundaries. External polling uses 48 deterministic ORIGINAL T0..R1-5000 slots, so early readiness cannot exhaust observations near C0.

## Source and interfaces for Task4
New source:
- lib/mcp-qa-finite-observer.mjs
- lib/mcp-qa-finite-observer-native.mjs
- lib/mcp-qa-finite-external-contract.mjs
- lib/mcp-qa-finite-trial-finalizer.mjs
- lib/mcp-qa-finite-http.mjs
- lib/mcp-qa-finite-source.mjs
- scripts/run-qa-finite-trial-finalizer.mjs
- .github/workflows/afw-finite-finalizer.yml

Existing source changed narrowly: lib/mcp-qa-finite-trial-control.mjs (shared canonical preview), lib/mcp-own-finite-cleanup-proof.mjs (shared factual projection validator; native control validation remains strict), lib/mcp-qa-cloud-lifecycle-admission.mjs (separate exact command kind), worker/independent-closure/index.mjs (fixed dispatch/methods). Task2 runtime interception/wrapper/stages/original deadlines were not edited.

Task4 must install installPrivateQaFiniteObserverSource(actualCompiledRevision), installPrivateQaFiniteMaterialFactory(async ({ctx,env,refs}) => ({controlOptions,readFinalPrimary,custody})), and implement resolvePrivateQaFiniteExternalSource in reviewed source. Native factory supplies ACTUAL bound storage/pin/primary producer; readFinalPrimary(check) performs the actual fixed bound-DB first-primary path and complete writer exclusion, returning only {primary,writers}. Caller/env JSON is not an authority substitute. External constructor supplies the bounded technical artifact fields; CLI adds observed preview/authenticated commandId/primary GitHub finalizer identity. No raw private selectors or consent go to GHA.

Actual API grammar is documented in the spec: [Workflow instance GET](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/get/) and [Workflow version GET](https://developers.cloudflare.com/api/resources/workflows/subresources/versions/methods/get/). No invented result.id/workflow_id, step.status, or Workflow-version=Worker-version equality. Successful informational messages are not authentication errors. No helper from separate main PR710/711 was imported or assumed live-qualified.

## TDD and verification
Initial RED: d5c05ab53abdc16028c0b0adf9acb59fda7a9780, run 41327478972/job124910358589: 3 tests, 0 pass, 3 expected missing API failures.
Rulings recorded BEFORE relevant implementation in 5e859f5575f229f9674ded2141e6bd28a94348c9.
Native fixture setup failures exposed actor identity mismatch in synthetic setup and actual disposable native RPC/Workflow-result handles. Fixture identity was corrected before constructing control; owned returned metadata is cloned/released before exact validation. Environment/shared bindings are never cloned. Diagnostic bundle instrumentation was removed.
First complete GREEN: 1071714ea35d1b97b13d1d57079de44f582b572a, run41330487579/job124919346815: 62+143+3 pass; scoped lint clean.
Bounded-sampling/ready-margin GREEN: 9dca10f311e6361f7e371d76707050feefb45b48, run41330654367/job124919841569: 62+143+3 pass; scoped lint clean.
Late external-poll RED: 01aa12397d2baff7d03aa5c9620e2a6c220128d7, run41330863711/job124920482599: 63 tests, 62 pass, 1 expected late-C1 completion failure (poll exhausted near C0).
Final GREEN: 41330951514/job124920741851 at aaa3a5cb663993d1843f6a432b98f98810a94f3c: 63 focused + 143 preserved + 3 actual native = 209 PASS, 0 FAIL, 0 SKIP. Scoped lint: clean.

Exact hosted commands (Node22; dependencies installed ONLY in GitHub runner):
```sh
npm ci --ignore-scripts --no-audit --no-fund
node --test --test-reporter=spec test/mcp-qa-finite-finalizer.test.mjs test/mcp-qa-finite-observer.test.mjs test/mcp-qa-finite-http.test.mjs test/mcp-qa-finite-cf-http.test.mjs test/mcp-qa-finite-command.test.mjs
node --test --test-reporter=spec test/mcp-qa-finite-trial-control.test.mjs test/mcp-qa-finite-trial-guard.test.mjs test/mcp-qa-finite-cleanup-store.test.mjs test/mcp-qa-finite-canary-restorer.test.mjs test/mcp-qa-cloud-lifecycle-admission.test.mjs test/mcp-qa-cloud-closed-rollback.test.mjs
timeout 90s node --test --test-reporter=spec test/mcp-qa-finite-read-rpc-native.test.mjs test/mcp-qa-finite-observer-native.test.mjs
npx eslint lib/mcp-qa-finite-*.mjs lib/mcp-own-finite-cleanup-proof.mjs scripts/run-qa-finite-trial-finalizer.mjs test/mcp-qa-finite-finalizer.test.mjs test/fixtures/finite-finalizer.mjs
```

Coverage includes actual native Workflow + fixed actor/claim journal/D1, retained proof after canary closed, missing/old own executable provenance, exact technical preview, no absent-result cache, lost native/send/create/POST ACK, changed job/attempt/source, foreign pointer, unresolved writers, original deadline and after-await/abort, custody rejection, unchanged closed-only commands, successful fixed HTTP QA POST plus separate independent GET readback, and actual pending D1 write blocking finalizer with zero send claims/POSTs even though the deferred write later commits. Source/custody/primary authority in fixtures remains synthetic; actual runtime capability is not claimed.

New tests: test/mcp-qa-finite-{finalizer,observer,http,cf-http,command,observer-native}.test.mjs. New fixtures: test/fixtures/finite-{finalizer,github,cf-http}.mjs; finite-restoration fixture gains optional preconstruction configuration/time only.

## Limits and next gates
- Actual native factories, real private producer/profile, actual external source pins, current token identity/effective scope, receiver/delivery and nominal integration are Task4. All are unavailable by default here. No actual Workflow-create permission was proven.
- Immutable retained primary is historical evidence anchored in the qualified closed/no-writer chain, never advertised as a new external D1 read or a guarantee about unseen foreign writers. Inability to establish complete exclusion means admin-pending/source rework.
- Root accepted the annotated-tag/unique-ref persistence cost and total32 conservative sampling. Existing/uncertain persistence cannot be reclaimed; late evidence may leave admin-pending. No new transport or credentials is a fallback.
- Temporary .github/workflows/finite-task1-temporary-qualifier.yml was adapted for Task3 with read-only permissions/no secrets and MUST BE EXCLUDED from final integration. Source branch artifact/cache state is hosted only; no local source/temp/dependencies/build were created.
- Root still performs fresh Task3 review, full branch tests/whole-branch CI and later integration. This scoped qualification does not authorize a live occurrence or promotion.

## Task3 fix round1/5 — consumed send-fence recovery (2026-11-01)
FIX_BASE: dc7d1869d6cd89b1b9d39e9ea7a1248a2c024c00.
Finding addressed in source; scoped re-review remains pending. Final qualified code/test HEAD: e175d5f7101c2a80c32baa69d2d4b063dc67b77d (production correction 3c7bc1c0109d5d5c9fbc93a927b0b52ee7ab43e6). This report/ledger append is its documentation-only child, whose exact HEAD is returned to root.

Review finding (verbatim):
> [P2] Keep consumed send-fence recovery GET-only — lib/mcp-qa-finite-http.mjs:150–152. After a send ref was created—including lostACK—reconstructing GitHubclient resets claimStarted. claimSend creates another annotatedtag and attempts anotherrefPOST beforediscovering existingfence. Restarttest explicitlyexpectsrefPosts===2 (test/mcp-qa-finite-http.test.mjs5–10). ViolatesacceptedGET-onlyrecoveryforconsumedGitHubsendauthority. Preserve readonlyreconciliationacrossreconstruction andassertZEROadditionaltag/refPOSTsforexistingandlostACKfences. AtomicrefuniquenesscurrentlystillpreventssecondQAdeploymentPOST.

Root's binding original-execution ruling was recorded in spec/plan/ledger BEFORE relevant code at d93ca236c90e584ed8515a4739ec80d0332ed0b2. GET404 cannot prove no unknown pending attempt. Only the once-launched, trusted fixed GHA restore process may initialize one private capability, after branded authenticated admission, exact primary run/attempt/job/step and retained proof/source correlation. It is shared across all clients and consumed on first claimSend entry before ANY send-fence mutation (including annotated-tag POST and even before an awaited read). Failed/unknown work cannot refund it. The adapter first GETs the fixed effect ref; existing fences are read-only. Default/no-cap/reconstructed recovery, including 404, cannot create a tag/ref. A stale/cached 404 also fails before mutation. The unique effect domain and immutable tag/ref content remain unchanged.

The fixed restore YAML now contains one task-specific PID-marker export and one exec of Node, with exact step id finite_restore_once and no retry/supervisor wrapper. Actual process/PID plus authenticated source/identity and original clock are rechecked through claim and sole QA-send awaits. PID is ONLY coherence, not durable identity, source provenance or evidence no prior attempt occurred. A real child process inheriting the parent's marker fails admission. A true GHA rerun remains attempt2 and denied. Same-attempt reexecution of the WHOLE launcher is explicitly excluded: metadata/PID cannot distinguish it. If once-launch cannot be established, no capability is available. Loss of the original process before issuance may leave admin-pending even when no ref exists; generic mutating process resumption is unsupported. Atomic ref uniqueness is still the durable final fence.

Implementation scope: lib/mcp-qa-finite-http.mjs, fixed restore CLI initialization, fixed finalizer workflow launcher, and focused fixtures/tests. No nominal factory/wrapper/runtime or control plan interface changed. No new persistent namespace, credential, role, provider endpoint or permission was introduced. Test fixtures use independently bundled synthetic process worlds without any production capability-reset hook. Authenticated fixture intent is opt-in; existing native/pure-finalizer fixture defaults remain unchanged.

RED: 31560555e2c8f51319ec7f5076be81306602c50c; run41331811152/job124923315740:55 tests,53PASS,2FAIL,0SKIP. Both failures were the requested existing/lost-ACK reconstruction regressions (2 ref POSTs versus expected1); scoped lint clean.
First implementation run41332917535/job124926594245 at44c3de7f:69 tests,68PASS,1FAIL. The failing static launcher test detected a single literal dollar instead of shell PID double-dollar; corrected before completion.
GREEN at3c7bc1c:run41333070372/job124927064253,70PASS,0FAIL,0SKIP.
Final GREEN [run41333148084](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41333148084)/job124927292982 at e175d5f7101c2a80c32baa69d2d4b063dc67b77d:71PASS,0FAIL,0SKIP; scoped lint clean. Job and branch HEAD read back. Added actual hosted bash-export/exec positive coherence and actual inherited-PID child negative tests; all GitHub/CF responses and source authority in these tests are synthetic.

Exact round1 hosted commands:
```sh
npm ci --ignore-scripts --no-audit --no-fund
node --test --test-reporter=spec test/mcp-qa-finite-finalizer.test.mjs test/mcp-qa-finite-http.test.mjs test/mcp-qa-finite-cf-http.test.mjs test/mcp-qa-finite-command.test.mjs
npx eslint lib/mcp-qa-finite-http.mjs lib/mcp-qa-finite-trial-finalizer.mjs scripts/run-qa-finite-trial-finalizer.mjs test/mcp-qa-finite-http.test.mjs test/fixtures/finite-github.mjs
```
Coverage: zero additional tag/ref POSTs for existing and lost-ACK reconstruction; unknown deferred ref POST with a still-404 GET and later commit; lost annotated-tag ACK; default recovery/404; cross-client consumption and no re-admission; actual original exec success; inherited child PID rejection; attempt2, unqualified admission DTO, changed proof/job/step and stale404; existing HTTP/finalizer/affected CLI behavior and original deadlines.

No full suite, native runtime/provider probe, actual command/occurrence, credential/permission/DDL/OAuth/Max action, local source/dependencies/build or subagent was used for this fix. Temporary finite-task1-temporary-qualifier.yml now runs ONLY this covering subset, still no secrets/read-only permissions, and remains EXCLUDED from integration. Task4's absent factories remain expected, not a new finding. operationalReadiness=false. Branch writes stop after this documentation child for root's scoped re-review.
