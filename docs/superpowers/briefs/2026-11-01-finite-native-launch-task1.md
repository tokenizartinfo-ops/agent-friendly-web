# Native5 Task1 — launch records and source-owned absence inventory

SOURCE ONLY. Root dispatches this task after4C1; no subagents. Read pinned AGENTS, this brief and design sections on clocks, SEND, inventory and cleanup; no broader history. [Design](../specs/2026-11-01-finite-native-launch-adoption-design.md); [plan](../plans/2026-11-01-finite-native-launch-adoption.md). Report path docs/superpowers/reports/2026-11-01-finite-native-launch-task1.md.

Inspected a776e115c2e3682f1620a6e54a758a3c77a16b94; use root's post4C1 lease, preserving newer work. publicStatic v2/historical pins belong4C1. Actual C2 private material/privateCanaryConfiguration is not installed; default fixed-source resolver stays unavailable. No placeholder success, caller DTO or generic truth callback.

## Deliverable / files
Create lib/mcp-qa-finite-launch-records.mjs and lib/mcp-qa-finite-launch-inventory.mjs. Modify lib/mcp-qa-finite-trial-control.mjs for narrow read-only snapshot primitive and new plan fields; propagate exact fields through mcp-qa-finite-external-contract.mjs/mcp-finite-evidence.mjs and fixed-terminal-workflows.mjs. Create test/mcp-qa-finite-launch-records.test.mjs and test/mcp-qa-finite-launch-inventory-native.test.mjs. No native prepare/create method, launcher sleep implementation or business wrapper change in this task.

Exact private plan top-level launchPolicy={armAckBy,launchAt,lastCreateAt}; workflows={confirmation,bootstrap,launcher}. External technical projection carries both. armAckBy=T0+90000,launchAt=T0+150000,lastCreateAt=T0+160000; N1/C0/C1/R1 stay T0+300000/+240000/+420000/+480000. Existing intent/plan/control hash algorithms unchanged; future unspent plan bytes/hashes change. No old record reinterpretation/reset.

## Pure interfaces / records
finiteLauncherInstanceId({intentId,sourceRevision}) returns 'afw-finite-launch-'+SHA256(UTF8('afw.finite-launcher.v1\n') || canonical({intentId,sourceRevision})).
validateFiniteLaunchPolicy({T0,launchPolicy}); validateFiniteLaunchPrepared(value); validateFiniteChildCreateSend(value); validateFiniteChildCreateAck(value); hashFiniteLaunchRecord(value).
Strict immutable data, safe dates, exact hashes/source/version IDs; never synthesize identity. New hash domain is record.purpose+'\n'+canonical ASCII-sorted-key JSON. Existing nominalClaimHash follows original Task1 effect-hash domain, not a new hash algorithm.

Fixed append-only keys afw.qa-finite-child-create.v1:<intentId>:prepared/:send/:ack.
Prepared EXACT fields: purpose='afw.qa-finite-launch-prepared.v1',intentId,finitePlanHash,controlHash,sourceRevision,qaVersionId,actorId,launcherId,nominalId,bundleHash,nominalClaimHash,guardStateHash,preparedAt,armAckBy,launchAt,lastCreateAt. preparedAt<=armAckBy; native identity and future IDs correlate to exact plan; prepared receipt comes only after actual prepare/guard/claim in Task2.
SEND EXACT fields: purpose='afw.qa-finite-child-create-send.v1',intentId,finitePlanHash,controlHash,sourceRevision,qaVersionId,actorId,launcherId,nominalId,bundleHash,nominalClaimHash,preparedHash,bindingHash,issuedAt,deadline. deadline=lastCreateAt and launchAt<=issuedAt<lastCreateAt.
ACK EXACT fields: purpose='afw.qa-finite-child-create-ack.v1',intentId,controlHash,sendHash,nominalId,acknowledgedAt. Actual timely matching create response only; ACK is not execution/settlement proof.
Nominal ID afw-release-<bundleHash>, distinct from launcher/observer. SEND is NOT Task1 nominal permission claim and is separate from reservation/admission/launch process-writer kinds.

## Actual source boundary / no deadlock
Add readPrivateQaFiniteControlSnapshot({storage,nativePin,plan,parent}) inside trial-control; reuse its nativePin WeakMap and strict plan/legacy/state decoding. Reads actual storage; computes exact canonical references BEFORE HEAD exists; missing HEAD/SEND must be true absence, never fabricated armed state. Pure serializable snapshot is evidence data, not authority.

ParentBudget INTERNAL {check,signal,deadline}: created once at real operation entry BEFORE hydration, original5s maximum and narrower absolute ends; all hydration/queue/snapshot/provider/transaction work consumes it. check returns current wall clock; rejects reversal/expiry/abort. No helper resets another5s clock. Existing control's now=parent.check and timeoutMs<=remaining preserve this bound.

Fixed resolvePrivateQaFiniteLaunchContext({ctx,env,refs,parent}) remains unavailable untilC2. Retain real context in private WeakMaps; no env JSON/public authority mint. Test real constructors/native pins/DO/D1/storage/inventory with SYNTHETIC external provenance.

createPrivateQaFiniteLaunchInventory({ctx,env,context,parent}) -> {observeBeforeCreation()}. context must resolve from that fixed native source path, not be accepted as a public shape. Output is consumed internally/invocation-bound:
- never_issued: exact design identity plus phase arm/prelaunch, journalSnapshotHash,controlSnapshotHash,inventoryHash,observedAt.
- issued: same identity, exact sendHash, optional ackHash and provider observation/unknown.
- unavailable: no exception/authority.

Caller strings/booleans/DTOs cannot choose phase or mint these results. Derive phase from actual decoded state and original times. At preview before HEAD, match planned source/canonical refs WITHOUT inventing persisted control. At same-invocation pending/armed prepare, decode actual storage directly. At prelaunch require real prepared receipt/nominal claim/guard. Missing source coverage stays unavailable.

CRITICAL: inventory may be awaited inside control.prepare's own synchronization. NEVER call control.read on that object from this producer. The outer prepare must NOT hold the SEND/inventory coordinator. One private coordinator per actual DO context serializes SEND transitions and inventory observations. Acquire it only around snapshot1 -> complete fixed provider inventory -> snapshot2 equal commitments -> synchronous internal consumption, then release. Queue time counts. Task2 later routes EVERY SEND transition through the same coordinator. Durable SEND protects reconstruction and already-issued creates; source path audit is mandatory, not a branded-success shortcut.

Only qualified never_issued permits exact nominal absence at preview/arm/prelaunch; SEND-present plus404 remains unresolved. Full definitions/instances remain enumerated; exact observer/launcher exceptions only. At both restores actual nominal AND launcher terminal/writers settled; QA also observer complete. Never-created nominal cleanup remains admin-pending; no new proof union. No early restore from process sealed_without_admission.

## Hosted TDD / closure
1. RED tests strict field/hash/order/timing and tampering; real native before-HEAD absence; foreign head, pending/uncertain SEND/ACK, missing source, caller evidence, incomplete inventory deny.
2. Real nested prepare->inventory test terminates without control.read reentry; real coordinator race blocks SEND until protected observation consumption. Snapshot/control changes deny. Hold actual storage commits/provider requests across parent expiry; no fresh helper lifetime.
3. Run hosted:
node --test test/mcp-qa-finite-launch-records.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs
Record RED/GREEN; run affected fixtures/scoped lint. Provenance SYNTHETIC; no production override.
4. Commit source/tests/report and append progress. Report BASE/code/head, exact commands/runs/jobs/counts, RED/GREEN, unmountedC2 gate and source coverage limits. Root reviews; no whole-suite/4A repetition.

Cloud source only; no local builds, runtime/private probes, keys/scopes, deployment or occurrence. DO ctx is THIS DO, never Workflow ctx. Keep soleC0 alarm, original70s/5s/20s/four-argument18-stage wrapper. LaterPC-off needs all source/CI/runtime gates and timelyARM; owner declaration differs from provider evidence. operationalReadiness=false.
