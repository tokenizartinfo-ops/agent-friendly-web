# Same-run ARM handoff implementation plan

Goal: prove one integrated native ARM -> original-lease read-only named preflight path, with no replayable authority.
Architecture: one unmounted host module composes existing ARM and preflight; a private in-memory token joins them only after the native step's outer settlement.
Tech stack: JavaScript ESM, Cloudflare Workflow/DurableObject/D1, Node test, esbuild/Miniflare, GitHub Actions only.
Spec: `docs/superpowers/specs/2026-11-01-same-run-arm-handoff.md`.
Baseline: `abdb91763ca8eab5254022680ca54cf992afcddc`. Design review by root precedes source implementation.

**IMPLEMENTATION HOLD — OPTIONAL ALTERNATIVE.** Root found an existing AfwReleaseWorkflow confirm_named -> AfwOwnEventNode subscribe/saved producer/deliverOwnSaved/unsubscribe/close/withdraw path. First reconcile its actual consumer/protocol blocker and choose the smallest existing-path integration. This plan does not establish QA generation ARM as a prerequisite to that path or any nominal test. No task below starts until root explicitly selects this alternative based on that comparison.

## Global constraints

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=isolated remote source/secret-free CI; ORIGIN=https://github.com; RESOURCE_TYPE=branch/PR; RESOURCE_ID=design/same-run-arm-handoff-20261101; ALLOWED_ACTION=docs then reviewed source/tests only; ROLLBACK=additive source revert, baseline preserved.

CLOUD ONLY: no local files, clones, dependencies, builds or servers. No production entrypoint/config/binding change, runtime deployment, remote D1 reads/writes, grants/keys/OTP/OAuth/cron, live Workflow/consumer, Max or replay of consumed intents. Tests seed isolated runner DBs only. Token never exported/serialized/checkpointed; no injected consumer/receipt/factory/authorize/source identity; native actor origin is TCB assumption. Original event timestamp+5000 and all false authority flags persist. No cancellation/physical commit deadline claim. operationalReadiness=false.

## Preflight and shared-interface rulings

| Task | Consumes -> produces | Self-consistency and boundary |
| --- | --- | --- |
| 1 | Existing ARM result -> additive armDecisionAt | Only armed result gains one decision-time field; pendingAt/armedAt/storage unchanged; all consumers inspected and strict expectations updated. |
| 2 | Task1 exact receipt + compiled contexts + native event -> handoff module | No receipt or token input; two actor adapter argument shapes fixed in spec; final output is facts only. |
| 3 | Task2 adapters -> real Workflow/DO/D1 fixture | Test-only mounts explicitly seed draft AND packet; no production binding or fake success substituted for real ledger/preflight. |
| 4 | Reviewed Task1-3 head -> accepted source evidence | Exact CI head/tree and regression boundary; no runtime inference. |

| Shared producer / consumer | Ruling before implementation |
| --- | --- |
| ARM host / handoff validator | Exact existing armed keys plus armDecisionAt; <=2048 JSON; all hashes and version/source checked; no native caller attestation. |
| Workflow / actor ARM + actor preflight | Exactly [namedBundleHash,{instanceId,eventTimestamp}]; derive originalEnd from stamp; no injected version/source; same fixed actor, compiled source/context. |
| Private mint / private consume in same module | WeakMap record only, opaque object never returned; delete synchronously before first await; no token exported for tests. |
| Actor preflight / existing constructor | Use createPrivateQaNamedPreflight with remaining original budget and fenced now; preserve readPrivateQaNamedPacket diagnostic facade. |
| ARM material / fixture packet producer | Same assembled capsule/packet bytes, different hash keys; insert into both existing isolated schemas, no ARM side-effect insertion. |
| Existing compiled context/pins / handoff host | Reuse private-context and QA_CLOUD_CLOSED_PINS.canary/operator; no new generic pin injection or credential pathway. |

## Review focus mapped to tests

1. Cached or substituted step result mints continuation: replay/duplicate/exact-byte-substitution directed tests; zero preflight I/O.
2. Queue/checkpoint/RPC/microtask delay renews five seconds: original timestamp expiry at entry, callback and outer settlement plus 1ms final-microtask regression; native delayed RPC; zero late continuation.
3. Unknown ARM commit represented as cancellation: real ledger lost pending/armed ACK tests and delayed settlement; preserve rows and uncertain/writeMayHaveOccurred.
4. Hash/native/profile drift or missing packet accepted: same-hash triplet, source/version/fixed actor/binding/profile changes; native draft-only success-at-ARM then blocked-preflight.
5. Native fixture or documentation claims production authority: module export/import/config regression, all flags false, no token/private data output, source-only mount and TCB assertions.

## Conditional Task 1 — timestamp the existing ARM decision

Files: modify `lib/mcp-qa-generation-arm.mjs`, `test/mcp-qa-generation-arm.test.mjs`, `test/mcp-qa-generation-arm-native.test.mjs`; update its source note/spec only where result grammar changes.
Consumes: `createPrivateQaGenerationArm(options).arm(namedBundleHash,parentSignal)` and existing exact result validators.
Produces: unchanged method, armed result gains integer `armDecisionAt` captured after validated ledger receipt/final rereads and before return; non-armed results unchanged.

- [ ] Search exact ARM result consumers in the pinned remote tree and record affected paths.
- [ ] RED: require decision timestamp within host lease; delayed final read/serialization cannot emit valid armed decision; no commit-time interpretation.
- [ ] Minimal implementation, preserving CAS, two eligibility observations, retained uncertainty and existing error sanitation.
- [ ] GREEN: `node --test test/mcp-qa-generation-arm.test.mjs test/mcp-qa-generation-arm-native.test.mjs`; scoped eslint.
- [ ] Commit source/tests and record exact RED/GREEN cloud evidence in progress ledger; fresh task review.

## Conditional Task 2 — integrated source-only host and replay/settlement fences

Files: create `lib/mcp-qa-arm-handoff.mjs`, `test/mcp-qa-arm-handoff.test.mjs`. Existing constructor APIs and production index stay unchanged.
Consumes: Task1 receipt; compiledQaSourceRevision/artifact/historical contexts; fixed closed canary/operator pins; actual event/step/env and fixed native actor.
Produces exact exports:
```js
runPrivateQaArmHandoff({env,event,step})
armPrivateQaGenerationForHandoff({env,ctx,args})
readPrivateQaArmHandoffPreflight({env,ctx,args})
```
Actor adapters return bounded JSON strings; Workflow returns exact bounded own-data result specified in spec. All private lease/token/receipt logic stays inside this one module.

- [ ] RED tests compile module with TEST-ONLY fixed contexts, native boundaries or clearly marked fixture doubles; do not add public injectors to accommodate tests.
- [ ] Test original Date timestamp (future/old/altered/rollback), missing context/profile/DB/fixed actor, exact payload/args/accessor rejection, actual version/source/binding drift and receipt hash triplet.
- [ ] Test cached step returning valid-looking receipt without callback, callback twice, mismatched outer bytes, callback timely but outer settlement late, clock exhaustion at final microtask, delayed/hung ARM RPC, preflight delay/failure. None can mint/use late continuation.
- [ ] Implement original-end lease + actor wrappers; capture step.do once and invoke captured native function with its receiver. Do not invent platform caller attestation or transmit AbortSignal/functions over RPC.
- [ ] Implement WeakMap mint ONLY after outer settlement/executedHere/exact receipt/current checks; private consume deletes synchronously before any await and calls only fixed preflight with original envelope. No second step, sleep or token output.
- [ ] Verify no reconstruction from a second run even with identical event/receipt; module exports only three adapters, no factory/consumer hook. Test private consumption by observable one-preflight path and negative replay, without exporting the token.
- [ ] GREEN: `node --test test/mcp-qa-arm-handoff.test.mjs test/mcp-qa-generation-arm.test.mjs test/mcp-qa-named-preflight.test.mjs test/mcp-qa-generation-preparation.test.mjs`; scoped eslint.
- [ ] Commit, cloud evidence, fresh task review and fix/re-review.

## Conditional Task 3 — native integrated journey with both real schemas

Files: create `test/fixtures/qa-arm-handoff-native.mjs`, `test/mcp-qa-arm-handoff-native.test.mjs`. Reuse existing fixture material, QA draft/named packet SQL and primary history seeder.
Consumes: all three Task2 adapters, real existing ARM ledger and named preflight, isolated native Workflow/DO/D1.
Produces: one meaningful native joined proof, clearly labelled synthetic pins/invocation context; no production host changes.

- [ ] RED: TEST-ONLY Workflow calls runPrivateQaArmHandoff, fixed DO routes two exact methods; prepared_idle3true/11false/7empty and source/native version compiled/controlled for fixture. Real native step.do runs, not a substitute promise.
- [ ] Seed immutable draft in QA DB by named hash AND consistent named packet by generation plan hash, plus distinct dossier primary history. Pin synthetic external read responses via test-only outbound service; no real network.
- [ ] GREEN success requires native metadata ARM + one actual packet preflight, same three hashes and original timestamp budget, sentinel legacy/journals unchanged, no new writes beyond ledger, false readiness/authority.
- [ ] Native negatives: omit packet while retaining draft (armed metadata remains; preflight blocks); mismatch packet/capsule/hash; already armed/replayed event; delayed/lost ARM transaction settlement preserving pending/armed rows and denying continuation. Include lease expiry while queued/awaiting actor with remaining original budget.
- [ ] Keep precise split: native Workflow happy path and actual DO/D1 uncertainty proof, deterministic step replay/checkpoint-delay adversaries from Task2. No claim that fixture IDs authenticate a platform caller.
- [ ] Run `node --test test/mcp-qa-arm-handoff-native.test.mjs test/mcp-qa-arm-handoff.test.mjs test/mcp-qa-generation-arm-native.test.mjs test/mcp-qa-named-preflight-native.test.mjs test/mcp-qa-generation-ledger-native.test.mjs`; scoped eslint.
- [ ] Commit, exact cloud results and fresh task review.

## Conditional Task 4 — source acceptance and promotion handoff

Files: this spec/plan/progress; concise `docs/AFW-SAME-RUN-ARM-HANDOFF-2026-11-01.es.md`; additive AGENTS.md checkpoint only after implemented evidence. Do not edit historical receipts to imply runtime movement.
Consumes: reviewed source head and actual test runs.
Produces: source accepted with concrete remaining integration gates and exact next task, operationalReadiness=false.

- [ ] Verify source module still not imported by production; no new production RPC, operation/config/binding/schema; existing frozen315 package verification remains independent.
- [ ] Run existing PR CI on exact head (Node22/ubuntu24.04): sealed checks, focused tests, `npm test`, `npm run lint`, `npm run build`; existing five package checks must be matched to exact head. No new live workflow dispatch or credentials.
- [ ] Fresh whole-branch review; root resolves findings; exact head/tree/CI acceptance and source merge only under existing delegated source authorization, with expected-head check.
- [ ] Append issue497 checkpoint if root's existing authorization permits, preserving source vs dated runtime and consumed-intent distinctions. Stop this task before any production mutation.
- [ ] If root selected this generation-controlled alternative, its next block is source create-only draft+packet producer/hydration with immutable readback and fresh scope; then reviewed mounting/candidate/dossier/rollback, server once-claim and physical finite guard/finalizer, consented client delivery/review/withdrawal, integrated PC-ON then agreed PC-off. See spec finite route; none is claimed done here.

## Execution protocol and closure

Use GitHub connectors for source and existing secret-free Actions for tests. Optional bounded source-qualification workflow is a test implementation detail only under root's authorization; never dispatch an operational workflow. Record run/head/attempt and failure cause, not a fabricated test total. Each implementation task receives a fresh reviewer and fixes precede next acceptance. No local workspace fallback.

Self-review before code: exact signatures and hash domains agree across all tasks; type/descriptor/clock/receipt limits are explicit; two storage tables remain distinct; no open design question is hidden as a test injector. Root fresh design review is pending. Source rollback is an additive revert preserving baseline/history; no runtime rollback follows from this plan.
