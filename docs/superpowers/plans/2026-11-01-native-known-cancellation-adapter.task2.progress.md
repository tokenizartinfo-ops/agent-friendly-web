# Task 2: mounted native known-cancellation qualification

2026-11-01 UTC. SOURCE ONLY. operationalReadiness=false.

## Scope and provenance
- PROJECT: Agent Friendly Web.
- REPOSITORY / ORIGIN: public GitHub tokenizartinfo-ops/agent-friendly-web.
- ENVIRONMENT / RESOURCE_ID: feat/native-known-cancellation-adapter-20261101; isolated GitHub-hosted Actions fixtures.
- RESOURCE_TYPE: source, tests, temporary branch qualification workflow.
- ALLOWED_ACTION: reversible Task 2 source changes and synthetic secret-free cloud qualification only. No runtime, provider request, remote SQL, grant, OAuth, permission, key, consumer, deployment or Max action.
- ROLLBACK: revert the three Task 2 implementation/test commits on this branch. No runtime or data was changed.
- BASE: d61e29f60eca41e258ee92d309549f9fc71a9cdb, tree 6686812f5d7584c64eeefdb0f88459c09655fa6e.
- Qualified source HEAD: 68b4f9e9a8a444f7d98963614929eae04e4936de, tree 52245a22a4994b7d8e64f514aa310a4c600430c9.
- The final documentation checkpoint is the commit carrying this report; its source/test blobs are unchanged from the qualified HEAD.

## Implementation and compatibility
worker/mcp-release/index.mjs adds the accepted adapter import and ONE dispatch condition: sealed bundle operation confirm_named plus exact reservation flag true. The three existing diagnostic dispatches retain their precedence. All other modes use the existing generic runtime. Direct RPC still delegates to runReleaseOperator and cannot gain Workflow reservation authority. Closed HTTP404 and the unique build-time bundle token are unchanged; no public RPC, payload, flag, configuration, lease factory or diagnostic export was added.

The Task 1 runtime and tests are unchanged: runtime blob2420c760af1485e39aa53ff7726b9605161f768c and test blob87c9779f67cc26ec4cf553da6ed4f8af1298b3d0. Task 2 consumes the module-private branded/method-pinned request lease without exporting or replacing it.

Every mounted reservation rehearsal now seeds the complete synthetic original identity/admission, admitted closure, NULL-generation cancellation, current grant and immutable monitoring schemas. The abbreviated-schema branch is removed. Existing retirement failure, clock, flag/binding drift, lost ACK, journal retention and non-reservation tests keep their assertions. The primary mounted success uses buildMcpReleaseOperator and the actual AfwReleaseWorkflow export. No custom Workflow injects authorize, history or identity.

One pre-existing custom GENERIC runtime test intentionally calls runReleaseWorkflow with authorize but WITHOUT cancellationHistory/requestLease. It explicitly marks its fixture generic-without-history and keeps its original single admitted closure, using the full schemas. The actual production builder never emits this fixture marker. This is test-data compatibility for the unchanged generic API, not a mounted fallback.

## Native evidence and observer boundaries
Actual native WorkflowEvent Date, workflowName metadata, instance afw-release-<bundleHash> and sole object payload {planHash} are observed and forwarded unchanged. Native providers, identities and challenged DO retirement custody remain SYNTHETIC. All test SQL is delegated to actual isolated D1 with the existing immutable schemas; no fixture treats empty D1 as proof of DO budget.

The main measured run keeps production builder and adapter bytes unchanged. Test-only forwarding proxies measure projection reads, eligibility SQL, provider and challenged RPC waits. Separate appended observation-only instrumentation counts the private authorize stage and elapsed hook time; it does not replace callbacks, alter returns, inject authority/history/identity, or add a production export. Root explicitly approved this separate coverage witness. Its outcome, reservation count, retirement calls and all three activation journals match the uninstrumented source qualification.

The native suite covers current grant absence/expiry and identity mismatch, extra unknown cancellation, queue expiry, deadline during projection, revocation immediately before the atomic INSERT and immediately after its committed write, a foreign trial/scope winning the fixed reservation slot, lost ACK, restart of the same native instance, and outer step settlement past the original event deadline. Own prepared row passes the after-write check; foreign row blocks restart. Issued SQL can commit even when its acknowledgement is lost, and the test retains the row plus attempts/receipts/acceptances. mayRetry remains false and immutable prior rows are retained. Clocks in deadline faults advance relative to the unchanged native timestamp; no extra budget is allocated.

## TDD and cloud verification
- Tests/fixture-only RED: 8bcb279de739e2cd67c4955e85257afb298a2921, tree b9cddb7f3f45fb89f229b5e7ed359ea776812e2e; [run41309039245](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41309039245), job124855377295. 14 tests: 1 PASS, 13 FAIL, 0 SKIP. No setup/schema failure. The old wrapper made zero projections/eligibility checks, failed to reserve against complete history, and let invalid current consent reach later runtime work.
- Minimal production wiring: 36a94321ff3c4683f8e78c5175b11d9775f9fbee, tree906f08a6abaeb6372b7e47cb65ed04324ae383b0; [run41309192744](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41309192744), job124855819678. Mounted14 PASS and adapter43 PASS. Related174 PASS/1 FAIL exposed the legacy generic fixture's one-closure expectation; production code needed no correction.
- Fixture compatibility and hook-duration observation: 68b4f9e9a8a444f7d98963614929eae04e4936de. [run41309533100](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41309533100), job124856815553: mounted14 PASS + adapter43 PASS + related175 PASS = 232 PASS, 0 FAIL, 0 SKIP. Scoped eslint succeeded without diagnostics.

Commands:
```sh
node --test test/mcp-release-known-cancellation-native.test.mjs
node --test test/mcp-release-known-cancellation.test.mjs
node --test test/mcp-known-cancellation-native.test.mjs test/mcp-qa-named-eligibility.test.mjs test/mcp-qa-named-eligibility-native.test.mjs test/mcp-release-workflow-native.test.mjs test/mcp-release-reservation-native.test.mjs test/mcp-release-runtime-native.test.mjs test/mcp-named-authorization-native.test.mjs
npx eslint test/mcp-named-authorization-native.test.mjs worker/mcp-release/index.mjs test/mcp-release-known-cancellation-native.test.mjs test/mcp-release-reservation-native.test.mjs test/fixtures/named-confirmation-native-rehearsal.mjs test/fixtures/named-known-cancellation.mjs test/fixtures/known-cancellation-native-harness.mjs
```

Measured isolated native elapsed values in final GREEN; all times are milliseconds. SQL timing is a subset of full hook time, not an additional budget.

| Run | Total | Projection reads/time | Eligibility SQL checks/time | Unique hooks/invocations/full hook time | Synthetic provider GETs/time | Challenged RPCs/time | Remaining ORIGINAL deadline |
| --- | ---: | --- | --- | --- | --- | --- | ---: |
| Unmodified production source with forwarding measurement proxies | 137 | 6 / 7 | 26 / 40 | Not instrumented | 10 / 27 | 2 / 4 | 69857 |
| Separate observation-only compiled witness | 119 | 6 / 10 | 26 / 33 | 18 / 26 / 38 | 10 / 17 | 2 / 4 | 69874 |

Both returned confirmed, exactly one own prepared reservation, attempts1/receipts1/acceptances1, retirement reads2, mayBootfalse/mayRetryfalse/operationalReadinessfalse and unchanged history. The six projection SELECTs are two full bounded snapshots. Hook count26 includes the initial and runtime workflow_admission checks plus recurring credential/custody checks. The successful measurements do not predict remote provider performance.

The retained temporary workflow uses Ubuntu24.04/Node22, contents:read, checkout without retained credentials, npm ci --ignore-scripts --no-audit --no-fund, isolated fixtures and scoped eslint. No local source/file/temp/dependency/build/clone/process was used. Root's final composition owns full CI and fresh Task 2 review. The temporary .github/workflows/known-cancellation-source-qualification.yml MUST be excluded from final Task 3 integration; it has no live endpoint, secret reference, protected environment or manual dispatch.

## Self-review and limits
Self-review checked narrow dispatch/diagnostic precedence, unchanged unique builder token/closed HTTP/direct RPC, complete mounted schema migration, preserved generic absent-lease behavior, all18 observed native hook names versus26 actual invocations, original deadline consumption and outer settlement, exact own/foreign reservation behavior, immutable history/journal retention and sanitized outcomes. No Task 1 production runtime, validators, reservation SQL or production ledgers changed.

Synthetic source qualification is not live provider latency, deployed binding provenance, grant/monitoring consent, physical stop, native custody availability, DO once-budget, delivery, subscription, guard, cleanup, PC-off or Max evidence. Original N1/R1, compatible operator/cleanup arrangements and any future promotion remain separate. No PR was created and no Task 3 publication/integration was performed.
