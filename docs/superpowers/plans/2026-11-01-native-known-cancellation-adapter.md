# Native known-cancellation integration plan
Goal: permit the existing own finite confirm_named reservation path to classify the real retained NULL-generation cancellation, with current primary consent and no history deletion.
Architecture: one private administrative adapter supplies existing authorize/cancellationHistory inputs; current runtime, retirement custody and atomic reservation predicate stay in place.
Tech stack: JavaScript ESM; native Workflow/DO/D1; existing Miniflare/Node tests and GitHub Actions.
Spec: docs/superpowers/specs/2026-11-01-native-known-cancellation-adapter.md.
Status: DESIGN ONLY, fresh root review before implementation. Baseline abdb91763ca8eab5254022680ca54cf992afcddc.

## Global constraints
PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=GitHub source-only; ORIGIN=https://github.com; RESOURCE_TYPE=isolated branch/docs; RESOURCE_ID=design/native-known-cancellation-adapter-20261101; ALLOWED_ACTION=spec/plan/progress now, reviewed source later; ROLLBACK=preserved baseline/additive source revert.
CLOUD ONLY; no local files/clones/dependencies/builds. No runtime, DB, keys, permissions, grants, OAuth, Workflow, consumer, cron or Max mutation. No tests executed for this design task. Future tests are isolated cloud fixtures only.
No V2/ARM, new receiver, generic auth/reader/ledger. Preserve all global once/custody/journals. No authorize:true shortcut or fabricated OAuth context. Original N1/R1 never extended; metadata evidence is not readiness. operationalReadiness=false.

## Preflight and interface rulings
| Producer -> consumer | Exact agreement |
| --- | --- |
| Mounted worker -> new adapter | runKnownCancellationReleaseWorkflow({bundle,env,event,step}); module-owned build-time bundle/native values only. |
| Adapter projection -> existing validators | Existing strict raw known-history JSON; current grant from actual primary exact sealed grant; original/candidate/window signatures unchanged. |
| Adapter -> runtime | runReleaseWorkflow({bundle,env,event,step,authorize,cancellationHistory,requestLease}); private closure plus exact internal {current,remaining}, no new public input. |
| authorize -> named eligibility | Existing createPrivateQaNamedEligibility(options).check(signal); same original deadline and fixed scope, every listed hook, own reservation exact after write. |
| Reservation -> known-history compiler | Existing atomic INSERT SELECT untouched; counts/joins/current grant remain final write fence. |
| Native source proof -> runtime promotion | Source CI cannot authorize fresh grant, operator-profile switch or live cleanup. |

Self-consistency: every task consumes the preceding fixed interface; Task1 owns the same-module adapter and private lease brand in runtime; Task2 sequentially consumes that exact runtime interface for worker wiring/native fixture; neither changes existing predicate or guard. Task3 owns docs/evidence only. No parallel file ownership or dependency cycle.

Review focus mapped to tests:
1. History says one cancellation but primary differs: unknown/extra/missing/foreign/history-race tests, no reservation.
2. Bundle identity/grant is substituted: exact current grant + subject/project/client/resource, revoked/expired/future/unexchanged/mismatched consent tests, no journal/credential before admission.
3. Per-stage lease renewal: queue delay, repeated hook calls, final settlement and cumulative elapsed tests under ONE original <=70s budget; no 18*5s allowance.
4. Authorization revoked after effects: at each hook, preserve already committed rows; uncertain/no retry; after own reservation accept only exact same row and reject external row.
5. Fake native provenance/profile success: actual mounted wrapper/native fixture, no payload authorization input; no V2, OAuth fabrication, new receiver or runtime-readiness claims.

## Task 1 — fixed administrative adapter and bounded primary producer
Files: MODIFY lib/mcp-release-runtime.mjs; NEW test/mcp-release-known-cancellation.test.mjs. Existing predicate/readers stay unchanged. Keep adapter with runtime so the lease brand stays unexported; no extra capability framework/module.
Consumes: sealed bundle, native env/event/step, RELEASE_DB, fixed namespace, existing validateReleaseOperatorBundle/resolveNamedActivationPlan/validateNamedCancellationHistory/createPrivateQaNamedEligibility.
Produces: one additional host export runKnownCancellationReleaseWorkflow({bundle,env,event,step}), returning existing bounded runtime outcome.

- [ ] RED: missing adapter; exact native invocation and bundle hash; no input authorize/history; all absent/expired/wrong grant or original/cancellation cases block before runtime.
- [ ] Implement fixed bounded two-snapshot primary projection described in spec, using source-only bound SQL with LIMIT2/LIMIT9 and strict shapes. No generic query interface, SELECT *, hidden closures or historical current-grant substitute.
- [ ] Same-module private WeakSet registers requestLease before first await; no exported mint/registry/accessor. Optional supplied lease requires identity membership, not DTO shape; delete/invalidate at settlement. Legacy calls without requestLease unchanged; forged/copied/retired lease denies.
- [ ] Reuse current complete named eligibility; all 18 stage names private and fixed; one permanently invalidated adapter on failure; preserve exact three-way original/event/current identity joins.
- [ ] Source anchor runtime line116 existing step maximum70000 (not global event lease); reservation line27 child5000 and runtime line75 child20000 preserved. NEW narrowing: shared original end=min(policy.expiresAt,event.timestamp+70000), captured before I/O; each timeout <=remaining original. Parent signal and monotonic/wall rollback/final-settlement fences. Single producer snapshot cost included.
- [ ] Implement optional private branded requestLease in runReleaseWorkflow current/remaining; inherited operator lease uses it; final outer settlement checked. Classifier/parser/provider failures never return private raw data.
- [ ] RED/GREEN demonstrate current grant/consent drift, arbitrary stage/reentry, queue-expired invocation, primary future dates, immutable history race, external reservation and exact own-row post-write allowance.
- [ ] Future cloud command: node --test test/mcp-release-known-cancellation.test.mjs test/mcp-known-cancellation-native.test.mjs test/mcp-qa-named-eligibility.test.mjs test/mcp-qa-named-eligibility-native.test.mjs; scoped eslint.
- [ ] Commit with exact cloud RED/GREEN evidence, fresh task review. No fabricated test counts.

## Task 2 — real wrapper wiring and integrated native qualification
Files: MODIFY worker/mcp-release/index.mjs; consume completed lib/mcp-release-runtime.mjs interface; NEW test/mcp-release-known-cancellation-native.test.mjs; minimal extension test/fixtures/named-confirmation-native-rehearsal.mjs if necessary. Reuse history seeder and existing actual runtime/custody fixture.
Consumes: Task1 sole export and existing private compiled bundle.
Produces: mounted SOURCE route selects adapter ONLY for confirm_named+reservation true; other modes preserve existing behavior; no new RPC/config/flag.

- [ ] RED native fixture uses actual AfwReleaseWorkflow export and esbuild-injected private bundle, not a custom Workflow that injects authorize. Primary seed matches one admission + admitted closure + one NULL cancellation, real D1 immutable schemas and challenged DO receipt.
- [ ] Verify Task1 optional private requestLease is branded and method-pinned, conjoined in every runtime current/remaining check; existing operator inherits those clocks. Exercise all callers with parameter absent for unchanged behavior and copied/forged/retired object denial. Check after outer step settlement as well.
- [ ] Wire narrow branch. Preserve unique build-time bundle token used by private template builder, closed HTTP404 and all diagnostic dispatch precedence. Direct operator RPC cannot gain reservation authority.
- [ ] GREEN integrated native confirmation + own reservation1, no boot/subscription/launch, all18 unique authorization hooks exercised with actual invocation count measured (may exceed18). Record total elapsed, projection time, hook count/time, provider/RPC time and remaining ORIGINAL deadline; do not expand budget to make test pass.
- [ ] Test full real wrapper with fresh valid synthetic consent, absent/current expired grant, current-identity mismatch, late queue, extra cancellation, revocation at prewrite/postwrite, lost ACK, duplicate native instance/activation attempt, delayed outer settlement and external reservation race. Validate immutable prior rows and mayRetryfalse.
- [ ] Test own prepared row matching same trial/container/scope/window allowed after insert; other row blocks. No proof of DO budget inferred from empty D1; native custody/retirement fixture explicitly labelled synthetic.
- [ ] Future cloud command: node --test test/mcp-release-known-cancellation-native.test.mjs test/mcp-release-workflow-native.test.mjs test/mcp-release-reservation-native.test.mjs test/mcp-release-runtime-native.test.mjs test/mcp-named-authorization-native.test.mjs; target lint.
- [ ] Commit and fresh task review/fix. No remote trial or materialized live package here.

## Task 3 — exact-source acceptance and finite promotion handoff
Files: this spec/plan/progress and concise source receipt; additive AGENTS checkpoint only after implemented evidence.
Consumes: reviewed Task1-2 head, full cloud CI, measured original-budget native result.
Produces: exact source evidence, explicit next runtime prerequisites; no claim of active service.

- [ ] Existing full PR CI: npm test, npm run lint, npm run build and existing five package checks on exact head. Private/public template grammar and unique bundle slot remain valid.
- [ ] Fresh whole-branch review. Source checkpoint records exact head/tree/run, test counts, measured timings and all unresolved runtime gates.
- [ ] Prepare the finite own trial package before any human consent: current matching fresh grant+separate monitor consent, retained-history primary readback, actual DO custody/budget, discovered Work receiver capability plus real subscription/callback readiness, N1/R1 original and independent closure.
- [ ] Resolve operator855-closed pin conflict by separately reviewed existing independent-QA cleanup/execution compatibility OR explicit finite operator profile with measured recoverable closed rollback. Do not silently activate closed operator or implement a new cleanup subsystem in this patch.
- [ ] Root may accept source under delegated authorization only after review; any runtime actions remain separately scoped. No new OTP/key/receiver/grant from design. Next actual route is existing subscription -> saved producer -> useful review -> unsubscribe/native stop/independent closure.

No current source blocker requires inventing an OAuth context: this design's authority is explicitly narrow administrative-native plus primary current consent. The live fresh grant and compatible deployment/cleanup profile remain real gates, not data to fabricate. Root must review this authority declaration and exact original budget before code.
