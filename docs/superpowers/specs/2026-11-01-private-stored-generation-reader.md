# Private stored-generation selection

Date: 2026-11-01 UTC. Project AFW; repository tokenizartinfo-ops/agent-friendly-web.
Baseline main dff68b84573119b3f56dba45ec31045339276f2e (PR704); SOURCE ONLY.

## Problem and scope
The current generation resolver intentionally selects HEAD and compares its stored execution with the current reader. readRetained relaxes phase/window, not HEAD or execution identity. Keep that contract. A future finite cleanup/reconciliation host needs to locate an older stored target after HEAD or reader publication advances, without reviving that target's nominal authority. This increment supplies private validated facts only; it does not implement or authorize cleanup.

Owner delegated chained technical decisions and cloud-first execution; no intermediate design questions are required. GitHub source/Actions only. No runtime publication, route, binding, flag, data/DDL, permission, credential, grant, callback, scheduler, Container or Max change. Do not replay consumed trials, compensate comment clocks or change original five-second limits. operationalReadiness remains false.

## Chosen boundary
Add lib/mcp-qa-stored-generation-reader.mjs:
```js
createPrivateQaStoredGenerationReader({env,ctx,sourceRevision,now,timeoutMs})
  .read(generationPlanHash,parentSignal)
```
Exact five own data options, exactly two call arguments (parentSignal may be undefined; otherwise a genuine AbortSignal). timeoutMs is integer 1..5000. No mode, caller capsule, identity/policy override, effect callback or public facade. A trusted nested caller must supply only remaining ORIGINAL budget and a parent-fenced now; this helper does not establish a new native queue budget. An external parent abort is terminal and never a lease renewal.

Add one narrow private export in lib/mcp-qa-generation-ledger.mjs:
```js
readPrivateQaStoredGenerationSnapshot({storage,generationPlanHash,current})
```
The helper owns one real storage transaction; it obtains the requested INFO capsule from primary storage, validates canonical size/hash/shape, then calls existing createMetadataReader(raw,current)(transaction). The requested target must belong to the fully validated lineage. Reuse its bounded 32-generation traversal, predecessor rules, INFO/control hashing, exact prefix inventories, legacy validation and method fences. Do not build a second lineage validator or configurable projection. A minimal fixed internal state addition may retain canonical actual legacy record data and the owned execution value already validated/hashed by pair(); existing observer/ledger result shapes and semantics must remain identical. Do not return info.execution by raw-reference: it can differ after mutation from the owned execution value actually hashed.

No import/mount in Worker, RPC, HTTP, D1/provider/credential host or configuration. The pure local execution pin is local coherence, NOT external source/module/config provenance.

## Snapshot and coherence
Return exactly this owned deeply immutable PRIVATE snapshot (capsule is the original canonical JSON STRING, never a parsed caller object):
```js
{
 purpose:'afw.qa-stored-generation-snapshot.v1',
 capsule,
 target:{planHash,infoHash,sequence,phase,pendingAt,armedAt,withdrawnAt},
 head:{purpose,sequence,planHash,infoHash},
 storedExecution:{purpose,runtimeVersionId,sourceRevision,context,authorizesEffects:false,operationalReadiness:false},
 coherenceHash
}
```
Target facts come from the validated pair. storedExecution is a detached copy of the owned execution value actually validated/hashed, never the raw info.execution reference. Never return raw transaction/storage capabilities, mutable primary objects, unvalidated bootstrap data or the full raw chain.

Use fixed documented field order:
```text
SHA256("afw.qa-stored-generation-coherence.v1\n" + JSON.stringify({
  generationPlanHash,
  head: {purpose,sequence,planHash,infoHash},
  chain: [{infoHash,control:{purpose,planHash,infoHash,phase,pendingAt,armedAt,withdrawnAt}}, ...],
  legacyControlHash
}))
```
Chain order is HEAD toward legacy. Every infoHash is independently recomputed by existing validation and commits capsule/execution/preparedAt. legacyControlHash is SHA256 of the actual legacy record in its existing validated canonical field order; require legacyControlHash === SHA256(firstGeneration.capsule.predecessor.control), in addition to existing actual-record equality validation against that canonical JSON declaration. Both exact prefix inventories must be proved on every snapshot. Do not call this a commitment to legacy effect journals or physical history: those are not inspected here.

Target and HEAD alone are insufficient: a current HEAD CONTROL pending-to-armed transition can leave an ancestor target and HEAD/INFO hashes unchanged. Whole-lineage commitment detects it.

## Reader identity and lease
Before FIRST await, pin current ctx.storage/transaction, ctx.id/toString, AFW_INDEPENDENT_CLOSURE/idFromName and its fixed afw-own-successor-closure-v1 actor, AFW_QA_VERSION object/native UUID, sourceRevision and options. Construct createPrivateQaExecutionPin in durable_object context before reading. It must stay coherent after every await and at outer settlement. Never require stored target source/UUID to equal current reader source/UUID; retain them as separately named historical facts.

Use one original wall AND monotonic <=timeoutMs lease covering both snapshots, hashing, all awaits and final settlement; reject backwards clocks, abort, methods/objects/options/actor drift and timeout. Parent-fenced now throws are terminal. Fence losing/hung work after race settlement; late reads cannot expose private data or mutate returned objects. Synchronous copies/hashes also consume original budget.

Read two complete primary snapshots and require matching target/capsule/commitment. Capture the target interval segment BEFORE / WITHIN / AFTER on the first completed snapshot, and require that SAME segment on the second snapshot and final settlement. Public withinWindow is true only for WITHIN. Equal booleans alone are insufficient: a valid 1ms window may be crossed entirely, false-to-false before-to-after, within the five-second lease. ANY start/expiry crossing after first snapshot BLOCKS that invocation; never relabel first evidence or renew a deadline. A later independent observation of expired historical facts grants no retry/cleanup authority.

## Private result
Return exactly this successful private result:
```js
{
 purpose:'afw.qa-stored-generation-selection.v1',status:'selected',
 capsule,target,head,coherenceHash,isHead,withinWindow,observedAt,
 storedExecution,readerExecution,
 authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,
 operationalReadiness:false,mayRetry:false
}
```
capsule/target/head/storedExecution are the exact owned snapshot representations above; readerExecution is a separate owned execution-pin snapshot using the current native UUID/source/durable_object context. observedAt samples the pinned original now after snapshot two completes and before result construction; post-serialization outer settlement repeats all clock/pin/abort checks and rejects any interval-segment drift. It is an observation timestamp, not a renewed lease.

Measure the entire result as UTF-8 bytes of JSON.stringify(result); require <=24576 bytes before returning. Deep-own/freeze every nested object, never freeze caller/primary objects. Unknown/absent/corrupt/incoherent target returns exactly:
```js
{purpose:'afw.qa-stored-generation-selection.v1',status:'blocked',isHead:false,withinWindow:false,
 authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,
 operationalReadiness:false,mayRetry:false}
```
No selected private content in blocked output. Factory misuse may throw the usual fixed sanitized error; read failures resolve blocked. No broad error reflection.

No successful selection result may satisfy current/retained resolver receipt validators or nominal named authorization. Existing read/readRetained/readArmed semantics are unchanged.

## Required verification
- Actual ledger-backed valid ancestor under newer HEAD and different current reader UUID/source; stored identity retained, new reader identity separate.
- Current target pending/armed/withdrawn facts and expired ancestor facts; no liveness/authority inference.
- Head CONTROL-only drift, target drift, non-target ancestor drift, legitimate HEAD advance and legacy drift between snapshots all block; newer valid state is never overwritten.
- Corrupt/missing/orphan/foreign/rolled-back lineage, unknown target, prefix mismatch and bad canonical/hash data block.
- Accessors/prototypes/extra options/args/duck signals and changed methods/options/native pin/actor reject; returned/input mutation isolation without freezing caller or primary objects.
- Parent abort and parent-fenced budget exhaustion, hung transactions, backwards clocks, original wall+mono deadline and final settlement, natural window-boundary crossing including valid 1ms BEFORE-to-AFTER false-to-false; losing work remains fenced.
- Zero put/delete/D1/provider/credential calls; no production import/route/config changes.
- Existing resolver/current retained and named authority reject historical substitutions; run their regression suites unchanged.
- Secret-free GitHub Actions RED then GREEN targeted tests/lint, complete CI and five existing packages; independent task and whole-branch review before accepted merge. Synthetic native identity fixtures are not external publication/module provenance or PC-off evidence.

## Remaining downstream gates
Separate trusted draft insertion, ARM/prepared profile, generation journals/physical guard/finalizer/cleanup authorization, real client subscription/useful review/withdrawal and an actual agreed PC-off occurrence remain. This source block closes only private selection; no runtime/PC-off readiness promotion.
