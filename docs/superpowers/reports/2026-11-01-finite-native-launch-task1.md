# Native5 Task1 — canonical launch records and source-owned absence inventory

Status: DONE (SOURCE ONLY; root review pending). operationalReadiness=false.

## Revision and scope

- Repository: tokenizartinfo-ops/agent-friendly-web (1347578006).
- Branch: feat/finite-native-cleanup-20261101.
- BASE: c989ff4473117cea7e31ff026306dac90237bb98; tree a7668dc2c463c2aafa7a7f60a723879630d3f868.
- Final code/test HEAD: b425c77ff551fb54c70e24f69b2f57862ed22b63; tree 23ed4e40b70d8059433518b875b332eae4036fec.
- Exact source readback of all 15 changed paths matched the authored contents at code HEAD. Branch lease independently matched that HEAD before reporting.
- This documentation commit carries the report and appended ledger only. Its exact SHA is supplied in the final CAS/readback handoff, not invented in its own contents.
- Authorized remote work: AFW GitHub source CRUD/CAS and bounded hosted Node22 qualification. Rollback is a forward revert preserving subsequent work. No local checkout/files/dependencies/build, provider/private probe, credential/scope, publication, deploy, DDL, live command, occurrence or main merge.

## Implemented

Strict immutable prepared/SEND/ACK codecs and launcher identity use the exact new purposes, canonical ASCII-key ordering and launch timing. Nominal claim correlation keeps the ORIGINAL afw.qa-finite-trial.v1:effect newline hash domain. Existing intent/plan/control hash algorithms remain unchanged; new future plan bytes now require exact launchPolicy={armAckBy,launchAt,lastCreateAt} and workflows={confirmation,bootstrap,launcher}. External plan projection and control evidence validation carry those exact fields. Old missing-policy records are rejected, not reinterpreted/reset.

The original control's strict legacy, HEAD/INFO/control/fact/effect/readiness decoder is shared with readPrivateQaFiniteControlSnapshot. Snapshot reads actual transactional storage and actual nativePin WeakMap, computes canonical planned control references even when HEAD is truly absent, and never calls control.read. It includes the actual sole alarm, guard and cleanup-started state in its commitments, rejects orphan guard/journal/ACK state and preserves all original control clocks/domains.

The source-owned inventory retains actual ctx/env/native pin/private context in WeakMaps. One coordinator per actual DO ctx covers snapshot1 -> full fixed definitions/all bounded instance pages -> snapshot2 equality -> synchronous phase consumption. Queueing, source hydration, transactions, provider awaits and synchronous consumption use the SAME original parent. Actual pending/armed without a prepared receipt is usable only after this same invocation witnessed the unspent HEAD; reconstructed pending cannot acquire arm eligibility.

A private invocation token is minted only after snapshot2 under the coordinator. The fixed synchronous parser consumes it through the private lookup exactly once; finally deletes it before releasing the coordinator. Tokens are never returned. Copied real snapshots, fabricated inventory, caller DTOs and returned fact DTO replay cannot mint an absence result. A narrow function-only ESM cycle is covered by hosted compiled workerd tests. The existing public readFiniteTrialAfwWorkflows parser remains strict about nominal presence.

At prelaunch the actual acknowledged prepared record, original nominal claim, guard state and actual C0 alarm must match. Existing SEND, with or without ACK and with absent provider nominal, remains issued/unresolved. Cleanup-started and sealed state cannot produce a new absence observation. Never-created nominal remains administrative pending; no new restoration proof union, early restore or ghost terminal receipt.

## Exact Task2 handoff interfaces

1. lib/mcp-qa-finite-launch-inventory.mjs:
   - createPrivateQaFiniteLaunchParent({now=Date.now,deadline}) returns INTERNAL immutable {check,signal,deadline}. Create ONCE at native operation entry BEFORE hydration. It clips to original 5000ms and the narrower absolute end, rejects clock reversal/expiry/reuse after abort.
   - createPrivateQaFiniteLaunchInventory({ctx,env,context,parent}) returns {observeBeforeCreation()}; no caller phase, evidence or consumer callback. Results are facts with authorizesEffects=false and operationalReadiness=false.
   - withPrivateQaFiniteLaunchCoordinator({ctx,env,context,parent}, operation) calls the source-internal operation(check) under that same per-ctx coordinator. Task2 MUST route EVERY SEND append/transition through it and check before/after every await. Outer prepare MUST NOT hold it while awaiting inventory.
   - A context retains the SAME parent object; a later actual native invocation needs its own bounded parent and freshly resolved source context. No helper renews the previous invocation.
2. lib/mcp-qa-finite-launch-source.mjs:
   - resolvePrivateQaFiniteLaunchContext({ctx,env,refs,parent}) and readPrivateQaFiniteLaunchMaterial({ctx,env,context,parent}) deliberately remain unavailable.
   - C2 must produce an opaque token and retain EXACT material {ctx,env,plan,request,execution}. plan is canonical private plan JSON.
   - execution EXACT {intentId,controlHash,sourceRevision,moduleHash,confirmationId,observerId,admissionHash,launcherId}.
   - request receives only source-fixed {method:'GET',path,query,signal}, plus the same check as second argument. It is used by the existing complete AFW workflow enumerator; no caller URL/method/resource selector.
   - C2 must qualify actual immutable completed private-setup receipt/context, source/bindings/ALL create-path coverage, custody and exact observer/launcher provenance before resolving. No boolean coverage/setup substitute. Preview must not require the future READY receipt it is establishing. Task1 does not invent the private publisher/owner locator.
3. lib/mcp-qa-finite-trial-control.mjs:
   - readPrivateQaFiniteControlSnapshot({storage,nativePin,plan,parent}) returns factual {control,state,nominalClaim,guard,alarm,prepared,send,ack,cleanupStarted,sealed,controlSnapshotHash,journalSnapshotHash}. Missing persisted state and journal rows are null.
   - Existing control should receive now=parent.check and timeoutMs no greater than the remaining parent in Task2; do not hold the SEND coordinator around outer prepare.
4. Fixed append-only keys: afw.qa-finite-child-create.v1:<intentId>:prepared / :send / :ack. Task2 owns actual prepared persistence and atomic NEW SEND/readback/once-send/native-create semantics. This task implements no business native prepare/create method, binding create, launcher sleep or Task3 adoption.

The two C2 source functions are intentionally unavailable in production, without runtime registration, env JSON material or public success DTO. Only that external provenance module is compile-time substituted in native tests. Storage, D1/native binding pins, strict decoder, guard/control, fixed enumeration/parser, parent and coordinator are real source implementations.

## Hosted TDD evidence

Exact brief command throughout:

```sh
node --test test/mcp-qa-finite-launch-records.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs
```

| Revision | Run / job | Focused result | Meaning |
|---|---|---|---|
| 48761994873d3b6364d47ebfb763b5a121382064 | 41347968011 / 124971767357 | 12 tests;2 PASS,10 expected FAIL | New codec/snapshot/inventory exports absent; existing two native control tests pass. |
| 3275116b004add819feaf597b38fb8c4a41d5e10 | 41348380100 / 124973023584 | 24;12 PASS,12 expected FAIL | Real codecs/snapshot now pass; native inventory implementation still absent. |
| 8284a26c36a1c369f499ab151dbdaba0f9739d76 | 41348539372 / 124973497655 | 24 PASS | First inventory GREEN; affected fixtures exposed the separate extraction regression below. |
| 47858d9d5021e3e1a096e6d36e818e5983479ceb | 41348718958 / 124974034681 | 26;25 PASS,1 expected FAIL | Copied actual snapshot plus fabricated provider DTO incorrectly minted absence. |
| 73f2b8726828d346ab5adc60c7f8f9f03c1b567f | 41348777081 / 124974213263 | 27;25 PASS,2 expected FAIL | Previous DTO gap plus inherited hash-domain/UUID-coercion regression. |
| 490c3abe823c0b7a81c5a5d10ef11506dd9e6d2f | 41348937299 / 124974694256 | 34;33 PASS,1 expected FAIL | Tokens/codecs fixed; actual modified C0 alarm was not yet committed/checked. |
| 1c106e27f247bcf1b13093f6f91c082a13a93dd2 | 41349123287 / 124975262662 | 36;34 PASS,2 expected FAIL | Orphan guard and actual cleanup claim wrongly permitted absence. |
| b425c77ff551fb54c70e24f69b2f57862ed22b63 | 41349308125 / 124975828609 | 39 PASS,0 FAIL,0 SKIP,0 CANCELLED | Final complete Task1 qualification including actual concurrent SEND append. |

Final run [41349308125](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41349308125), job [124975828609](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41349308125/job/124975828609): completed/success, push, attempt1, exact codeHEAD/branch/repository1347578006, Node22, artifacts0.

Final affected command:125 PASS,0 FAIL,0 SKIP,0 CANCELLED.

```sh
node --test test/mcp-qa-finite-trial-control.test.mjs test/mcp-qa-finite-phase-inventory.test.mjs test/mcp-qa-finite-finalizer.test.mjs test/mcp-qa-finite-http.test.mjs test/mcp-qa-finite-trial-guard.test.mjs
```

Final scoped lint PASS:

```sh
npx eslint lib/mcp-qa-finite-launch-records.mjs lib/mcp-qa-finite-launch-inventory.mjs lib/mcp-qa-finite-launch-source.mjs lib/mcp-qa-finite-trial-control.mjs lib/mcp-qa-finite-external-contract.mjs lib/mcp-finite-evidence.mjs lib/mcp-fixed-terminal-workflows.mjs test/mcp-qa-finite-launch-records.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/fixtures/finite-launch-native.mjs test/fixtures/finite-finalizer.mjs test/fixtures/qa-finite-trial.mjs test/mcp-qa-finite-trial-control.test.mjs
```

The temporary qualifier installs existing dependencies with npm ci --ignore-scripts --no-audit --no-fund on the hosted runner. It remains excluded from integration. No whole-suite, C1 compiler/full package or publication repetition was performed.

Coverage includes strict exact fields/hash/order/timing/tampering, safe dates, inherited keys/coercion, before-HEAD true absence, foreign HEAD/native pin/old plan/orphan ACK, missing source/caller DTO, incomplete pages/provider nominal, same-invocation pending versus reconstruction, real nested prepare/inventory, real control.prepare -> guard.arm -> same-object nominal claim and prepared record, unchanged original claim hash, actual SEND/ACK with absent nominal, source hydration/provider/queued work/held actual transaction ACK across parent expiry, snapshot drift, actual alarm drift, orphan guard and cleanup-started denial. The strongest race appends the actual SEND record transactionally under the shared coordinator only after protected observation consumption, then observes issued state. All provenance and provider data are explicitly SYNTHETIC; no production registration or caller authority bypass exists.

## Self-review and intermediate regression disclosure

The affected run at8284a26 had125 tests:66 PASS,49 FAIL,10 CANCELLED; scoped lint passed. Extracting the decoder omitted the internally used fresh accessor, so restoration eligibility and reconciliation caught ReferenceError as blocked, and a held-claim test never reached its expected transaction. Minimal fix4ffbf5f restored the same original check without changing its algorithm. Subsequent affected runs, including final exact HEAD, pass125/125. This failed intermediate result is not hidden or treated as acceptance.

Further self-review REDs closed copied-DTO authority, inherited domain lookup/UUID coercion, metadata-only alarm acceptance, orphan guard and cleanup-started absence. Source code was reread against BASE; no worker mount/business wrapper/guard alarm scheduling/hash algorithm was edited. The existing trial-control module is large; the narrow shared decoder extraction avoids a second divergent validator rather than restructuring unrelated code.

## Changed files

- .github/workflows/finite-task1-temporary-qualifier.yml
- docs/superpowers/progress/2026-11-01-finite-native-confirmation-cleanup.md
- lib/mcp-finite-evidence.mjs
- lib/mcp-fixed-terminal-workflows.mjs
- lib/mcp-qa-finite-external-contract.mjs
- lib/mcp-qa-finite-launch-inventory.mjs
- lib/mcp-qa-finite-launch-records.mjs
- lib/mcp-qa-finite-launch-source.mjs
- lib/mcp-qa-finite-trial-control.mjs
- test/fixtures/finite-finalizer.mjs
- test/fixtures/finite-launch-native.mjs
- test/fixtures/qa-finite-trial.mjs
- test/mcp-qa-finite-launch-inventory-native.test.mjs
- test/mcp-qa-finite-launch-records.test.mjs
- test/mcp-qa-finite-trial-control.test.mjs
- docs/superpowers/reports/2026-11-01-finite-native-launch-task1.md (this report).

## Remaining boundaries

No known unresolved Task1 code issue. Actual complete package/private source context/custody/default native material remain unmounted C2 gates. Source coverage qualifies only the implemented primitives under synthetic external provenance; it does not attest installed provider bindings, the private setup completion, a finite occurrence, cloud liveness or PC-off. All future SEND paths must use the shared coordinator and actual once-send/source gates in Task2; Task3 owns sleep/adoption and full phase/cleanup composition. Original C0 sole alarm, four-argument18-stage business wrapper and70s/5s/20s semantics are unchanged.

STOP WRITES after documentation CAS/readback. Root performs fresh scoped review before another product writer.


## Fix round 1/5 — coordinator settlement (2026-11-02 UTC)

Status: DONE, source-only implementation; scoped root re-review pending. This section supersedes the prior no-known-issue statement for the review finding and records its fix. Review HEAD087f6427004ecabd89e9989dd87d0d4fde449424; write BASEef30cf6c3c69df97d5c5944ea3cf153bc5fac038 (tree960e195ae016a824bcfd87d0853d296434d33da7), verified pause-documentation-only descendant. Final code/test HEAD5cf7a373457b313397aa0fa249385d02ef610146; final documentation HEAD is this report's enclosing commit, supplied after exact CAS/readback in the implementer return. Repository tokenizartinfo-ops/agent-friendly-web, branch feat/finite-native-cleanup-20261101; all five changed paths read back exactly at code HEAD. Rollback remains a forward revert preserving other work.

Finding: **[P2] Keep coordinator occupied until underlying work settles**, original lib/mcp-qa-finite-launch-inventory.mjs:69. bounded() can reject its caller while operation(check) still awaits storage/provider. Unconditional release let a distinct unexpired parent enter the same actor section. Deadline checks cannot cancel already-issued work. Root approved including the nested snapshot timeout race in the same finding/round; rulings were ledgered before production edits.

### Change and limits

withPrivateQaFiniteLaunchCoordinator now separately retains the actual callback promise. Caller failure remains bounded by its original parent, but slot release occurs on callback fulfillment or rejection. Both settlement outcomes are observed. Queue timeout releases only its own gate; the predecessor chain still prevents bypass. No clock, parent budget, authority lifetime or cancellation assumption is renewed.

readPrivateQaFiniteControlSnapshot keeps its original bounded public behavior. Shared private readFiniteControlSnapshot preserves all decoding, identity, hash and deadline checks. The new source-internal readPrivateQaFiniteControlSnapshotUnderCoordinator(options) uses the same exact {storage,nativePin,plan,parent} inputs and awaits the actual transaction promise without an inner timeout race. Only the inventory coordinator imports that variant. Its outer caller still fails within the original parent; late transaction returns must pass the unchanged original-parent checks before yielding any result. No caller flag, settlement DTO or registration is added to the public snapshot interface. Inspection of the complete fixed workflow enumeration path found sequential direct awaits and no additional nested timeout race.

An outstanding callback that never settles can keep this actor's coordinator occupied indefinitely. That is deliberate exclusion of unknown work, with unavailable/admin_pending handling; it is not evidence of cancellation, safe restoration, or renewed execution authority. Future source transport/SEND callbacks must await their actual work, not detach it behind a new timeout wrapper. C2 context and default source guards remain unavailable; no business method, provider operation, runtime or occurrence was added.

### Covering tests and hosted evidence

The added native cases hold the active provider transport, direct storage callback and nested snapshot storage acknowledgement beyond a narrower original500ms parent. A distinct original5s parent/context is prepared before the hold; its coordinator entry is attempted only after the first caller has returned unavailable. Tests assert the old work is still unsettled then, the fresh invocation cannot enter before actual settlement, the slot eventually releases, the fresh write succeeds, late expired work cannot write, and no unhandled rejection occurs. The storage holds execute actual workerd/SQLite transactions and delay the acknowledgement outside their transaction callback. This retains the unresolved storage API promise while allowing workerd timer events. Existing queued-expiry, nested-prepare and protected SEND race tests remain included. External provenance/provider data remain explicitly synthetic; actual native storage, pins, decoder, parser and coordinator are exercised.

| Revision | Hosted run / job | Evidence |
| --- | --- | --- |
| 481f7c658cb5b23b491388ef0c49e8837038b5af | docs only, skip CI | Finding and round recorded before edits. |
| 9bd1764f96646c5a018acd289cae74e554cff694 | 41367768265 / 125031491775 | Initial42tests39PASS3FAIL; provider overlap assertion valid; storage/snapshot harness held inside native transaction, blocked workerd timer events and hit its30s blockConcurrencyWhile reset. Those two failures were harness errors, not accepted RED evidence. LintPASS. |
| 65f54dc12a81aa9931527493117cabc4049f1981 | 41367995719 / 125032185984 | Meaningful RED42tests39PASS3FAIL,0SKIP/CANCELLED; all three fail the intended “fresh parent must not enter while expired callback is outstanding” assertion, true !== false. LintPASS; production unchanged. |
| 5cf7a373457b313397aa0fa249385d02ef610146 | 41368143785 / 125032621637 | GREEN42PASS0FAIL0SKIP0CANCELLED; scoped lintPASS. |

Final [run41368143785](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41368143785), [job125032621637](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41368143785/job/125032621637): completed/success, push, attempt1, exact codeHEAD, branch and repository1347578006 verified; hosted Nodev22.23.4, artifacts0. Existing dependencies only: npm ci --ignore-scripts --no-audit --no-fund. Workflow action runtime emitted its existing Node20 deprecation/forced Node24 warning; test runtime was Node22 as verified. No test warnings/errors in final qualification.

Commands:

```sh
node --test test/mcp-qa-finite-launch-records.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs
npx eslint lib/mcp-qa-finite-launch-inventory.mjs lib/mcp-qa-finite-trial-control.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs
```

Output: tests42, pass42, fail0, cancelled0, skipped0; lint step success. Temporary qualifier was narrowed to those commands per root scope and remains excluded from integration. No164-test/full-suite repetition, local clone/files/deps/build, private/provider probes, credentials, OAuth, deployment, main merge or HEAD occurrence. No code beyond the two source modules changed; the native test, temporary qualifier and ledger/report comprise the remaining fix delta.

Task1 fix round1/5: implementer considers1 addressed,0 open, pending root scoped re-review; range ef30cf6..5cf7a37. STOP WRITES after final documentation CAS/readback.
