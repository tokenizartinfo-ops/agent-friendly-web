# Native5 Task2 — same-object preparation and unique native child creation

SOURCE ONLY. Root dispatches AFTER Task1 clean review. Execution BASE/root lease is supplied separately; preserve all newer source and pause/resume checkpoints. Read this first, then the Task2-only section below and the accepted Native5 design's same-object/SEND/budget clauses. No whole history. AGENTS governance applies. No subagents; root owns fresh task review.

## Scope and already-owned interfaces

Task1 report docs/superpowers/reports/2026-11-01-finite-native-launch-task1.md is the authoritative implemented handoff; include its forthcoming coordinator fix report. Actual fixed inventory parser is lib/mcp-fixed-terminal-workflows.mjs.
- createPrivateQaFiniteLaunchParent({now=Date.now,deadline}) -> INTERNAL {check,signal,deadline}, original<=5000ms/narrowerabsoluteend. Create BEFORE source hydration at native RPC entry; no renewed clock after queue/read/guard/claim.
- resolvePrivateQaFiniteLaunchContext({ctx,env,refs,parent}) -> source-private opaque token; readPrivateQaFiniteLaunchMaterial({ctx,env,context,parent}) -> EXACT {ctx,env,plan,request,execution}. C2 default unavailable. plan canonical private JSON; execution exact prior provenance plus launcherId; request fixed GET transport.
- createPrivateQaFiniteLaunchInventory({ctx,env,context,parent}).observeBeforeCreation(), withPrivateQaFiniteLaunchCoordinator({ctx,env,context,parent},operation). Task1 private token is never caller authority. EVERY SEND transition uses same coordinator; outer prepare NEVER holds it while awaiting its own inventory reader. Do not treat a raced timeout as underlying settlement; preserve Task1 fix.
- readPrivateQaFiniteControlSnapshot({storage,nativePin,plan,parent}) and readPrivateQaFiniteControlSnapshotUnderCoordinator: real strict decoder; true absence; no control.read reentry. Source can compute exact control refs before HEAD without inventing persisted state.

## Root C2 capability seam ruling

The Task1 material tuple stays EXACT and is not widened. If no existing fixed producer supplies these operations, add ONLY fixed source-module export readPrivateQaFiniteLaunchOperations({ctx,env,context,parent}) to lib/mcp-qa-finite-launch-source.mjs, default unavailable until C2.
Its eventual result is EXACT {controlPrimary,guardActions}. controlPrimary is the actual fixed readPrimary set required by createPrivateQaFiniteTrialControl, including nominal; guardActions is EXACT {readPrimary,withdraw,close,seal,proof,canary_restore}, using actual guard execute/reconcile/proof interfaces. These are private source-produced capabilities, NEVER RPC/caller params, success DTO, runtime registration or env JSON. C2 qualifies owner/source/setup/primary/custody; no boolean coverage. Tests compile-time substitute ONLY this source dependency together with the already declared external provenance module, explicitly SYNTHETIC.
Task2 MUST construct the REAL control and REAL guard using imported constructors, same actual ctx/env/storage/native pin and SAME parent. guard identity comes from actual Task1 decoded control snapshot; don't receive it as a caller-authored identity. Do not use installPrivateQaFiniteNativeGuardFactory to bypass missing source. Guard reconstruction for later alarms is C2; startup guard uses this invocation's bounded clock and persists the original C0 alarm.
Preview context may not require future READY; prepare/create must qualify actual completed setup/finalizer READY/current consent and all their actual source conditions. Never fabricate these facts to unblock production.

## Binding identity and hashes

Only env.AFW_QA_NAMED_CONFIRMATION.create is allowed. Its fixed definition is afw-own-qa-private-confirmation, class PrivateQaNamedConfirmation, script agent-friendly-web-independent-closure-qa, account85d0d5dadac3341a564f22ce885e9eec. C2 resolver must qualify actual config/definition/class/source and all holders; a name/object alone is not provenance.
Capture/check the actual binding object+native method identity across awaits. bindingHash is SHA256(UTF8('afw.finite-native-child-binding.v1\n') + canonical ASCII-sorted JSON of EXACT {accountId,bindingName,className,definitionName,qaVersionId,scriptName,sourceModuleHash,sourceProfileHash,sourceRevision}), with actual qualified plan/native values. No caller bindingHash/profile/target.
Prepared.guardStateHash retains Task1's existing SHA256(JSON.stringify(actual strict-decoded snapshot.guard)); nominalClaimHash retains afw.qa-finite-trial.v1:effect + newline + JSON.stringify(actual claim), NOT the new sorted record domain. Prepared/SEND/ACK hashes use hashFiniteLaunchRecord. Preserve exact raw guard ordering validated by Task1.

## Concrete task requirements

## Task2 — fixed DO prepare/claim and unique native child create

**Files:** create lib/mcp-qa-finite-launch.mjs; modify worker/independent-closure/index.mjs DO methods only and narrow shared context plumbing; tests test/mcp-qa-finite-launch-native.test.mjs.

**Interfaces:** runPrivateQaFiniteLaunchOperation({ctx,env,operation,refs,parent}) is source-internal with fixed operation dispatch; RPC methods prepareFiniteNominalLaunch({intentId,sourceRevision}), createFiniteNominalChild({intentId,controlHash}), readFiniteNominalLaunch({intentId,controlHash}) validate exact arity/fields. ctx MUST be this.ctx of IndependentClosure. Caller cannot supply operation/source/context/binding. Read returns facts, not authority.

- [ ] Test real control.prepare -> guard.arm/readback -> NEW control.claimEffect('nominal') on SAME object; guard.arm currently never calls prepare. Cover90s boundary, unknown prepare/receipt ACK, reconstruction, old head, missing/unsettled private-setup completion, altered seed/readiness/consent/pin and Workflow-context misuse.
- [ ] Test actual transaction+storage SEND, independent readback, one native binding create with exact ID/payload. Cover149999/150000/160000, clock expiry after EVERY await, lost/late transaction/create ACK, duplicate ID, reconstructed callers/provider404, queued coordinator and held remote create. Unknown creates remain separate native-create writers.
- [ ] RED: node --test test/mcp-qa-finite-launch-native.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/mcp-qa-finite-trial-guard.test.mjs test/mcp-finite-nominal-control.test.mjs.
- [ ] Implement DO fixed mounts and live shared-parent budget before source hydration. Persist/read prepared only after same-object claim and C0 guard ACK. Source context resolves actual AFW_QA_NAMED_CONFIRMATION and fixed target metadata. Atomically append SEND; only NEW acknowledged transaction yields process-local once-send capability. Recheck parent before native create; never retry outstanding native call.
- [ ] Append ACK only for actual matching timely create response; existing/unknown journal is GET-only. Read-only reconciliation never overwrites SEND/ACK, synthesizes termination or invokes create. Preserve guard alarm and independent cleanup.
- [ ] GREEN same command, scoped lint, commit report docs/superpowers/reports/2026-11-01-finite-native-launch-task2.md. No binding/config deployment; missing actual C2 context stays unavailable.



## Additional acceptance details

Root clock ruling: create ONE original parent (<=5s) at native entry BEFORE hydration. When the actual plan becomes known, operation check closes over that SAME parent's check plus original armAckBy/lastCreateAt/read bounds; narrow remaining timers/signals only, never replace the parent/context or reset its start. Crossing a newly discovered absolute end during hydration denies before writes. Supply this narrower check as control/guard now and repeat it after every await. A narrower caller timeout never releases a coordinator while underlying work is outstanding.
Source-internal operation selector is fixed by each native method; refs are exact own-data with arity checks. Prepare refs intentId/sourceRevision; create/read refs intentId/controlHash. DO this.ctx is required, never Workflow ctx as storage. Missing C2 source dependency denies before storage/effects.
One prepare constructs ONE control -> actual prepare ACK -> same-control guard.arm/readback+C0 alarm -> NEW same-control nominal claim -> append/readback prepared. Unknown/delayed receipt grants no launch; no reconstructed nominal claim. Claims and stored receipts are facts, not reusable execution authority.
Create resolves prepared/claim itself, correlates actual launcher prepare-step success/current READY, unwithdrawn/unsealed control and current consent/source. Use fresh original control/primary checks immediately before one native send; no re-claim. Validate at every awaited boundary. Parent expiration after SEND means no effect; held/unknown actual send remains outstanding. ACK only timely exact created ID, not proof terminal.
Fixed native call create({id:'afw-release-'+bundleHash,params:{planHash:bundleHash}}), once. No REST create, force/restart/fallback/new ID, user DTO claim, generic transport, sixth workflow stage or altered nominal event. Task3 owns actual sleep/original event/nominal wrapper.
Never-created nominal remains admin_pending; no absence restoration union. C0 sole alarm, original fourargs/18stages/70s/5s/20s/T0/N1/C0/C1/R1 unchanged.
Run meaningful hosted RED/GREEN exact Task2 command, actual workerd exported DO methods/storage/control/guard and native Workflow binding where supported, fixed external provenance synthetic only; include held storage/native-create + fresh queued parent. Scope lint. No fullsuite/C1 repetition absent concrete new concern.
Report docs/superpowers/reports/2026-11-01-finite-native-launch-task2.md; append existing finite ledger. Exact BASE/code/docHEAD, run/job/attempt/counts/commands/results, defaults-unavailable boundaries, self-review and CAS/readback; return concise status and STOP WRITES for root review.
No local code/deps/build, provider/private probe, keys/scopes/permissions, real OAuth/consent, deployment/DDL/cron/Container, main merge, live command/occurrence or Max. Temporary hosted qualifier excluded integration. operationalReadiness=false.
