# Checkpoint 2 — fixed finite Known lifecycle

2026-11-04 UTC. PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT GitHub source and credential-free GitHub Actions; ORIGIN GitHub App source API (no product origin contacted); RESOURCE_TYPE source branch and scoped qualifier; RESOURCE_ID feat/finite-native-cleanup-20261101; ALLOWED_ACTION Checkpoint 2 implementation, tests and report only; ROLLBACK revert this unit on the feature branch against a verified head. No runtime mutation occurred. Report/cleanup HEAD is this document's containing commit, with its exact SHA recorded in the parent handoff after CAS.

## Exact boundary

- BASE `c9809d79d7e4e918e595da829a2109fdc71f453a`; base tree `33c65238fd4cd3072468c3482089dcfa62194dee`.
- Causal RED `8168e64efa56eef8240b9efded5992caa4f1cb9c`.
- Product implementation `0df957482755f4ef6e718e759bff2e69b50517ba`.
- Final CODE HEAD `1bc37f26df3837780c295dafc366f1ad7694370f`; tree `fe1227700afade2a4829f8894cfe0a795584529a`.
- All source writes used GitHub App expected-head CAS. Sole product branch; no PR, main or merge action.
- Product changes are exactly `lib/mcp-release-runtime.mjs` and `lib/mcp-release-successor-reservation.mjs`.
- Test fixture `test/fixtures/named-confirmation-native-rehearsal.mjs` shares private legacy/finite composition. New tests are `test/mcp-release-finite-known-cancellation.test.mjs` and `test/mcp-release-finite-known-cancellation-native.test.mjs`. Existing `test/mcp-release-known-cancellation.test.mjs` changes only its export assertion and two private closure-harness anchors. Every original semantic assertion is retained.
- Own qualifier `.github/workflows/finite-known-profile-c2-qualification.yml` is removed with this report. Parent `finite-request-signal-opt-in-qualification.yml` is unchanged.
- Finite role consumers, current source C2/material provider, native product builders/mounts, profile flags/configuration, historical sources/pins, source ceiling, production bridge/receiver, HTTP/retention engines, journal/eligibility/retirement algorithms and business producers are unchanged.

## Implementation and invariants

Runtime has private frozen LEGACY_RELEASE and FINITE_RELEASE selections built only from the fixed Checkpoint 1 imports and fixed reservation wrappers. Existing public Operator, Workflow and Known entries select legacy. The sole new public runtime entry is `runFiniteKnownCancellationReleaseWorkflow(options)`, accepting exactly `{bundle,env,event,step}`. It carries one selection through private Known -> Workflow -> Operator -> observer/reservation. No public finite Workflow/Operator core, callback strategy, role/profile probing, normalization, fallback, lease mint or registry is exported.

Successor reservation shares the original body behind `reserveReleaseSuccessor(options={})` and `reserveFiniteReleaseSuccessor(options={})`. Each fixes bundle validation, history validation and named resolution. Option keys and provider/retirement/effect order remain the same.

Original guards, effect order and clock logic are preserved: event.timestamp+70000 parent ceiling, policy ceiling, monotonic narrowing, 5-second hydration/primary/provider/retirement children, 20-second activation child, complete matching first-primary snapshots, exact current grant/consent/identity, all 18 hooks and non-reentrance. The private WeakSet lease is registered before the first await and deleted on settlement. Forged/copied/retired leases, expired queued work, late projection, revocation and replay remain denied. Existing actual pending-work retention algorithms are not modified; an outer timeout is never described as physical completion.

## Qualification

1. RED at `8168e64efa56eef8240b9efded5992caa4f1cb9c`: Actions [41929567307](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41929567307), job126922714489, attempt1. Lint0errors/16warnings, then `node --test test/mcp-release-finite-known-cancellation.test.mjs test/mcp-release-finite-known-cancellation-native.test.mjs`:60 tests,1pass59fail,0skip/cancel. Missing runtime export produced the explicit export assertion failure, direct missing-function failures and native compiler missing-export failures; white-box tests also failed at the planned shared-core anchor. No positive was changed to blocked. This is causal RED for the missing entry/composition, not an isolated mutation proof for every assertion.
2. First GREEN at `0df957482755f4ef6e718e759bff2e69b50517ba`: Actions [41929941734](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41929941734), job126923997320, attempt1: lint0errors/16warnings;90/90 unit and89/89 native PASS,0fail/skip/cancel. Commands below.
3. Final GREEN at `1bc37f26df3837780c295dafc366f1ad7694370f`: Actions [41930295369](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41930295369), job126925170305, attempt1: SUCCESS. Lint0errors/16warnings;90/90 unit and90/90 native PASS,0fail/skip/cancel. Final test-only change adds credential-read observation and one entirely uninstrumented string-payload native positive. Product source is identical to the first GREEN. Actual output and positive legacy cases were read before reporting.

Both GREEN runs execute `npm run lint`, then separately:
- `node --test test/mcp-release-finite-known-cancellation.test.mjs test/mcp-release-known-cancellation.test.mjs`
- `node --test --test-concurrency=1 test/mcp-release-finite-known-cancellation-native.test.mjs test/mcp-release-known-cancellation-native.test.mjs test/mcp-release-reservation-native.test.mjs test/mcp-release-workflow-native.test.mjs test/mcp-release-runtime-native.test.mjs`

Qualifier used push restricted to the sole product branch AND its own workflow path, contents:read, persist-credentials:false, Ubuntu24.04, Node22, `npm ci --ignore-scripts --no-audit --no-fund`, an18-minute job bound and no credential bindings. No source-signal experiment, unrelated unit group or full final compiler was repeated.

Warnings: lint has the existing 16 repository warnings and zero errors; npm reports deprecated @esbuild-kit/esm-loader, @esbuild-kit/core-utils and eslint9.39.4. Node punycode deprecation and Actions Node20-to24 execution warnings were observed. No dependencies were upgraded to suppress warnings.

The final unit group has 47 finite and 43 legacy cases. It exercises exact admission/cross-profile rejection, complete primary history/current-grant negatives, forged/copied/retired leases on the selected private core, all18 hooks, concurrent reentry, original event deadline, late projection and wall-clock regression. Both matching and foreign own-row reservation fences remain exercised. Legacy tests were not replaced with blocked assertions.

The native group includes15 finite cases plus the untouched existing legacy Known, reservation, Workflow and runtime suites. The unchanged legacy production-builder positive and separate legacy18-hook witness still pass, as do the original legacy adapter positive and lost-ACK case in the unit group. The finite suite uses a separate fixed test-only WorkflowEntrypoint calling the actual finite Known export; default fetch404 and no legacy RPC caller/service binding. Finite QA uses date2026-09-07 and exact [nodejs_compat,enable_request_signal]; candidate metadata/hash and identity/custody Worker use exact M [nodejs_compat,global_fetch_strictly_public,enable_request_signal].

Finite positives confirm mayRetry=false, operationalReadiness=false, one attempt/receipt/acceptance, one prepared reservation with mayBoot=false and preserved complete history. There are separate unchanged-core observation, instrumented18-hook witness, and completely uninstrumented string-payload positive cases. Measurement is test-only, outside authority. Six primary projections, exact native Date/event identity/payload, all18 distinct hooks and remaining original budget are asserted.

Final native measurements at CODE HEAD: unchanged-core finite positive130ms elapsed,69864ms original budget remaining,6projections/26eligibility checks/10provider reads/2custody RPCs/6synthetic credential reads. Witness113ms elapsed,69882ms remaining,26hook invocations containing all18 distinct names. Legacy unchanged-core positive129ms/69865ms remaining and its witness114ms/69880ms remaining. The separate string-payload positive has no measurement wrapper or qualification output. These are observed isolated CI timings, not a service SLA.

Native missing/expired current grant, identity mismatch, extra cancellation, expired queue and projection deadline assert blocked with zero credentials/provider/journal/reservation effects. Prewrite/postwrite revocation yields uncertain with preserved activation history and reservation counts0/1. Foreign reservation race, lost ACK, late outer settlement and restart preserve one-row/one-effect fences and never yield late confirmed. Fault and observation helpers are SYN test-only seams, not production options.

## Limits and handoff

Real mechanics under test are isolated native workerd Workflow, D1 SQL/atomic fences and Durable Object RPC. Provider responses, grant/owner identities, retirement/custody evidence and fault timing are SYNTHETIC. These results do not demonstrate Cloudflare-hosted lifecycle, actual custody/provider identity, deployment, live cancellation or PC-off availability.

No local clone, build, dependencies or persistent process was created. Only small local skill instruction reads occurred; all code authoring and qualification were cloud source work. No credential/provider/runtime/Entry/DDL/permission/OAuth/OTP/cron/Max action, new budget, arbitrary outbound or reserved occurrence was introduced or consumed.

No full final compiler was run: the scoped real native compositions passed and no graph concern appeared. Final compatibility compiler and finite role consumer integration belong to Checkpoint3. Current source C2/material remains unavailable and product mounts unchanged. This is an implementation handoff pending root's fresh independent review, not self-acceptance or package/source-integration readiness.

Source ceiling `2026-11-03T02:59:00Z` remains expired. operationalReadiness=false; completePackage=false; PCoff=false.
