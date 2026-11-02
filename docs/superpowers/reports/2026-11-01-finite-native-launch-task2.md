# Native5 Task2 — native preparation and one-shot child creation

Status: DONE (SOURCE ONLY; fresh root review pending). operationalReadiness=false.

## Revision and authorized scope

- Repository: tokenizartinfo-ops/agent-friendly-web (1347578006).
- Branch: feat/finite-native-cleanup-20261101.
- BASE: 9c64ed4a66af2a845db964d11751e6182f62a8e3; tree c2a93c3002b3630ef7051dfd45bd799dc4e2879f.
- Final code/test HEAD: e5f57230082c0abb55483564db5b7999ea5fa480; tree 1abbc863789475a7b04320c73bc06f75823384cf. Last production change: c9cc0d2bc6d5432004a69f4cefbf89bda6deeb4e; final HEAD additionally corrects/extends tests.
- All eight changed paths were fetched independently at code/test HEAD and matched authored content exactly. Independent branch readback matched that HEAD/tree.
- This report and the appended ledger are documentation only. Exact documentation HEAD is supplied in the final CAS/readback handoff; a commit cannot truthfully contain its own hash.
- PROJECT=AFW; ENVIRONMENT=GitHub source/hosted Node22; ORIGIN=GitHub; RESOURCE_TYPE=branch/source/temporary qualifier; RESOURCE_ID=the branch above; ALLOWED_ACTION=source CRUD/CAS and bounded hosted tests; ROLLBACK=forward revert preserving subsequent work. No local files/clone/dependencies/build, provider/private probe, credentials/scopes/permissions/OAuth, deploy/DDL/cron/Containers, live command/finite HEAD occurrence, Max or main merge.

## Implemented behavior

Actual IndependentClosure methods are prepareFiniteNominalLaunch({intentId,sourceRevision}), createFiniteNominalChild({intentId,controlHash}), and readFiniteNominalLaunch({intentId,controlHash}). Each selects its fixed operation internally, validates exact arity/own-data fields and uses this.ctx/this.env. One original parent of at most five seconds is created BEFORE source hydration. Once the actual plan is available, checks/timers narrow to armAckBy, lastCreateAt or R1 while retaining the SAME original parent/context/start. No renewed lease after hydration, queueing, guard or claim.

Preparation constructs ONE real control, awaits actual prepare acknowledgement, derives the guard identity from actual strict-decoded storage, constructs/arms the real guard and reads back its actual original C0 alarm/state. Only a NEW nominal claim acknowledged by the SAME control can reach prepared persistence. Prepared append and independent readback use the shared coordinator; outer prepare never holds it while awaiting its own inventory. Unknown/late prepare, guard, claim or receipt acknowledgement cannot yield successful preparation. Persisted facts cannot reconstruct same-object authority.

The fixed source module adds only readPrivateQaFiniteLaunchOperations({ctx,env,context,parent}), EXACT result {controlPrimary,guardActions}, default unavailable. Task1 material remains EXACT {ctx,env,plan,request,execution}. No runtime factory/registration, env JSON, caller source/binding/claim or success DTO was added. C2 still owns actual setup completion, seed/source/profile/configuration/ALL create-path coverage, launcher prepare-step success, primary/consent and custody. Synthetic tests substitute only that fixed external provenance dependency.

Root approved the narrow source-internal control.readLaunchControl() addition before code. It shares the original read_nominal strict state/current consent/existing claim path and adds the EXISTING strict finalizer READY decoder/freshness. It awaits actual underlying work without an inner timeout race; the outer original-parent coordinator bounds the caller and retains the slot until actual settlement. Existing readNominalControl semantics remain unchanged; there is no new public DO/RPC method or new claim.

Create first obtains the source-owned complete prelaunch inventory outside the SEND coordinator. Its result remains factual, not authority. Under the coordinator, fresh real control/primary/READY checks and a strict storage snapshot must match its relevant control/journal commitments. The actual append transaction rechecks complete control rows, guard rows, C0 alarm and journal commitments before writing a NEW immutable SEND. Independent strict readback and fresh control/primary checks follow. Only that acknowledged NEW transaction gives a process-local once-send capability; it is consumed before the unique native call:

```js
env.AFW_QA_NAMED_CONFIRMATION.create({
  id: 'afw-release-' + bundleHash,
  params: {planHash: bundleHash}
})
```

Actual binding object and create method identity are captured and checked across awaits. bindingHash uses afw.finite-native-child-binding.v1 plus newline and canonical ASCII-sorted EXACT account/binding/class/definition/QA version/script/module/profile/revision tuple from the brief. Prepared guardStateHash and nominalClaimHash retain their original JSON ordering/domains. Prepared/SEND/ACK use the accepted strict codecs/hashFiniteLaunchRecord.

Every prepared/SEND/ACK append uses the shared coordinator and awaits actual storage work. The native create promise is also retained by the same callback. Caller expiry never releases outstanding work. Existing or uncertain SEND gives only factual reads; no refund, retry, restart, fallback, replacement ID or REST creation. ACK is appended only after an actual timely matching native create response. nativeCreateAcknowledged is an API fact, not evidence of newness, execution, terminal state or physical settlement. Lost/late responses remain unresolved SEND; read reconciliation never overwrites journals or creates a child.

Original C0 sole alarm, cleanup authority, four arguments, eighteen stages, original event, 70s/5s/20s and T0/N1/C0/C1/R1 remain unchanged. Never-created nominal remains admin_pending for restoration. No absence restoration union or invented terminal outcome. Task3 sleep/adoption/original nominal wrapper is untouched; later alarm reconstruction remains a C2 gate.

## Hosted TDD and qualification

| Revision | Run / job (all attempt1) | Focused result | Interpretation |
| --- | --- | --- | --- |
| f21892236320592e9155703be2d8ba55ee5adb0e | 41369062429 / 125035371298 | 78 tests: 48 PASS, 30 expected FAIL | Meaningful RED: actual IndependentClosure fixed methods absent. Existing tests pass. |
| 7e8e25f646f17f7c7df46bba4033d7272c694e10 | 41369303050 / 125036128991 | 78: 77 PASS, 1 FAIL | Actual Miniflare duplicate-ID create returned the existing matching instance; missing prelaunch absence check exposed. |
| 10e7dfd902a300c85cc6769a7c11eed2ed562913 | 41369551093 / 125036865344 | 92: 90 PASS, 2 FAIL | Meaningful preexisting-instance RED retained. Separate late-SEND-readback harness predicate incorrectly matched the word readback as ACK; not accepted as a product finding. |
| c9cc0d2bc6d5432004a69f4cefbf89bda6deeb4e | 41369667707 / 125037213715 | 93: 92 PASS, 1 FAIL | Prelaunch correction GREEN; newly added held-SEND harness failed to enter its branch. Fixture error, not a production finding. |
| e5f57230082c0abb55483564db5b7999ea5fa480 | 41369829372 / 125037690164 | 94 PASS, 0 FAIL, 0 SKIP, 0 CANCELLED | Final focused GREEN with corrected held-SEND and lost-prepared reconstruction coverage. |

Final [run41369829372](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41369829372), [job125037690164](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41369829372/job/125037690164): completed/success, push, attempt1, exact code/test HEAD, branch and repository verified. Node v22.23.4; artifacts0. Existing hosted dependencies only: npm ci --ignore-scripts --no-audit --no-fund. Eight-minute job ceiling; no artifact publication. Existing action-runtime Node20/forced Node24 deprecation warning is distinct from the verified Node22 test runtime. Initial fixture unused-variable lint warning was removed; final scoped lint has zero errors/warnings.

Exact brief command (RED and final GREEN):

```sh
node --test test/mcp-qa-finite-launch-native.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/mcp-qa-finite-trial-guard.test.mjs test/mcp-finite-nominal-control.test.mjs
```

Affected control command: 66 PASS, 0 FAIL, 0 SKIP, 0 CANCELLED. Combined final qualification: 160 PASS.

```sh
node --test test/mcp-qa-finite-trial-control.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs
npx eslint lib/mcp-qa-finite-launch.mjs lib/mcp-qa-finite-launch-source.mjs lib/mcp-qa-finite-trial-control.mjs worker/independent-closure/index.mjs test/mcp-qa-finite-launch-native.test.mjs test/fixtures/finite-launch-operations-native.mjs
```

No unrelated full-suite/C1 compiler/package repetition. The existing temporary qualifier was updated in place and remains excluded from integration.

## Evidence and self-review limits

Actual workerd exported DO methods, SQLite transactions/readbacks, native pins, strict control, guard/alarm, inventory/parser/coordinator and actual native Workflow binding/class were exercised. External setup/provider/source/primary evidence is explicitly SYNTHETIC. Tests do not attest a private package, installed binding, actual setup or consent, remote clock, provider liveness, occurrence, guard operation or PC-off.

Coverage: exact RPC shapes and Workflow-context misuse; real same-control prepare/guard/NEW claim ordering; default missing source/operations, missing or running setup, altered seed/pin/binding, old HEAD; exact90s boundary and hydration crossing it; missing/changed/stale READY and READY crossing awaits;149999/150000/160000 create boundaries; consent withdrawal/sealed gate; original domain hashes and fixed native payload; unknown/late prepare, guard, claim, prepared/SEND/ACK transaction and independent readback; late primary check after SEND; duplicate actual native instance; lost/late/mismatched native response; repeated/reconstructed calls and immutable journal reads; lost prepared ACK without successful source step; held actual SEND storage acknowledgement and held actual native create after caller expiry while a distinct fresh parent cannot enter the coordinator before real settlement. Existing Task1 provider/snapshot queue tests remain included. Provider absence with an issued SEND cannot restore absence authority; this module's read method reports journal facts, not a fabricated provider404/termination proof.

The duplicate return is specifically an observed MINIFLARE behavior, not a Cloudflare production guarantee. The current [official Workers API create documentation](https://developers.cloudflare.com/workflows/build/workers-api/#create) supplied by root says create throws when an ID already exists within retention; createBatch has distinct handling. Regardless, source-qualified absence precedes SEND and a duplicate error/uncertain response never grants retry. Real provider behavior remains a later separately authorized qualification.

Self-review checked the exact delta against BASE, original claim/hash domains, no Task3 business-wrapper change, no renewed parent/context, source default-closed behavior, NEW-SEND-only local capability, atomic commitment comparison, no nested timeout release in the new control read, and unmodified original guard scheduling. No known unresolved Task2 implementation defect. An indefinitely unsettled callback deliberately keeps the coordinator occupied; this availability cost preserves unknown-work exclusion and does not authorize forced release or restoration.

## Changed paths and handoff

- lib/mcp-qa-finite-launch.mjs (new fixed operation implementation).
- lib/mcp-qa-finite-launch-source.mjs (one unavailable fixed operations seam).
- lib/mcp-qa-finite-trial-control.mjs (root-approved internal current READY read).
- worker/independent-closure/index.mjs (fixed DO methods/shared parent entry only).
- test/mcp-qa-finite-launch-native.test.mjs.
- test/fixtures/finite-launch-operations-native.mjs (synthetic external boundary).
- .github/workflows/finite-task1-temporary-qualifier.yml (temporary; EXCLUDE integration).
- docs/superpowers/progress/2026-11-01-finite-native-confirmation-cleanup.md (append).
- This report.

C2 actual owner/setup/primary/custody implementation remains the separate later five-task plan; no actual producer was guessed. Task3 remains future work. Root owns fresh scoped review before subsequent product writing. STOP WRITES after documentation CAS/readback.
