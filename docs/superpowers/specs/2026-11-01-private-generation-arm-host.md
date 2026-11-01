# Private first-generation ARM composition — source-only same-request boundary
2026-11-01 UTC. AFW, tokenizartinfo-ops/agent-friendly-web; baseline accepted dff68b84573119b3f56dba45ec31045339276f2e. This is Task2a of the older native-quiescence plan, NOT the native mutating ingress or deployment.

## Decision and authorization scope
Owner delegated technical decisions/chained cloud-first implementation. Implement one UNMOUNTED private same-request ARM host using existing material/primary/HTTP/ledger primitives. Source and secret-free Actions only. No production entrypoint import/RPC/Workflow dispatch/config, DDL/data, live permissions/credentials/grants, remote ARM, active guard, callbacks or Max.

Existing .prepare() stays all14false/7empty and rejects ALL V2. Never call it after pendingCAS or present a storage facade that hides V2. The ancestor stored-generation reader is not a first-generation prerequisite.

## Exact API and trust preconditions
Create lib/mcp-qa-generation-arm.mjs:
```js
createPrivateQaGenerationArm({
 env,ctx,sourceRevision,artifactContext,historicalContext,externalPins,
 nativeInvocation,fetchImpl,now,timeoutMs
}).arm(namedBundleHash,parentSignal)
```
Exact ten own data factory options and exactly two invocation arguments. Genuine non-aborted AbortSignal required. Integer timeoutMs1..5000. Fixed actor afw-own-successor-closure-v1. A factory invocation is one-shot, consumed before asynchronous work; no automatic retry/refund/new H.

now is the pinned original parent-fenced clock. Its throws/rollback and parent abort are terminal; the trusted local caller must supply only remaining ORIGINAL budget. Child clocks only narrow it. This private API does not create or verify a cross-RPC lease, queue-inclusive parent monotonic clock or native Workflow origin.

nativeInvocation is exact own-data {instanceId,qaVersionId,sourceRevision}, pinned by identity/descriptors/values before first await. It is a TRUSTED CALLER DECLARATION requiring future ingress establishment, NOT native attestation. Require version equals actual pinned AFW_QA_VERSION.id, source equals fixed host source, and supplied instanceId equals afw-qa-arm- plus namedBundleHash. Never generate that ID and describe it as observed invocation provenance. Do not add nativeInvocationVerified or an authority callback.

externalPins is the existing strict canary/operator HTTP pin shape. The future server composition must fix it to accepted source pins; not client input. Reuse createPrivateQaArmHttpAdapters directly with credential from the existing own env AFW_MCP_CLOSURE_READ_TOKEN, pinned fetchImpl/clock. No caller-supplied adapter/reader, arbitrary URL/resource, extra HTTP mode or no-self exception. HTTP sessionId is namedBundleHash; generationPlanHash is independently recomputed and remains ledger key.

## Native profile and stable capabilities
Before first await, require EXACT prepared_idle profile: AFW_MCP_CLOSURE_ENABLED, AFW_MCP_CLOSURE_DISPATCH_ENABLED and AFW_MCP_CLOSURE_REDUCTION_ENABLED are string true; other eleven PRIVATE_QA_CLOSED_FLAGS are string false. The seven existing legacy policies remain empty strings. Do not change the default closed profile or existing preparation.

Pin ctx.id/toString, actual fixed namespace actor, ctx.storage/transaction, own native version metadata object/UUID, createPrivateQaExecutionPin in durable_object context, source/context objects, namespace methods, explicit distinct AFW_QA_DB and AFW_QA_DOSSIER_DB and their methods. Recheck after every await and final settlement. Dossier binding remains a future explicit capability; absent or aliased databases block. Local pin is coherence, not external module/config/binding provenance. Do not freeze caller/env/primary objects.

## Composition
1. Capture original wall and monotonic lease + parent abort before any I/O. All further readers receive current-fenced now and remaining original timeout; timers and final serialization consume it.
2. Read immutable draft by namedBundleHash using existing createPrivateQaGenerationDraftReader. Read actual literal legacy control plus ALL FOUR fixed journals through a real storage transaction using existing preparation-style strict descriptors/bounds. Retain undefined/absence vs null and issued/complete uncertainty; no synthetic replacement/reset.
3. Assemble with assemblePrivateQaGenerationDraftMaterial using exact original artifact/receipt, historical context, namespace and current time. Keep original draft bytes, five-record literal snapshot and commitments private. First-generation capsule must declare legacy predecessor.
4. Derive original primary pins and historical identity through existing readers inside the same lease. Recheck exact bytes/material after primary correlation. No rewritten SQL, packet-table writer, journal migration or broad D1 access.
5. Construct the existing createPrivateQaGenerationLedger over REAL storage/material.capsuleJson/native execution pin and one fixed internal checkEligibility closure. The ledger alone proves complete V2 lineage/inventories and owns initial pendingCAS and exact pending-to-armed promotion. No filtering of own pending state.
6. Each of its TWO eligibility calls must independently reread and match exact draft/five legacy records, reassemble identical commitments, derive/check original primary and historical correlation, and require createPrivateQaArmEligibility().check()===true including actual own history/current grant and GLOBAL reservations zero. Use original material window/current grant from its capsule, not a caller scope.
7. The corresponding first/second createPrivateQaArmHttpAdapters.readSnapshot(parentSignal) must REALLY run around CAS; first includes fixed external module bytes, second revalidates pointers/config/inventories. It permits only the supplied exact nominated bootstrap instance; presence is NOT invocation provenance. Do not replace with runPrivateQaArmObservation because that wrapper deliberately requires allfalse.
8. Reread draft/five legacy records and repeat current/profile/native pins after the primary/HTTP observations and at settlement; drift blocks, or remains uncertain after ledger handoff. No extra current-eligibility assumption becomes physical reservation/retirement.
9. Validate exact metadata ledger receipt and correlate derived plan/source/runtime; never expose packet, capsule, draft, journals, token or provider body. No global legacy writes, nominal/Container/provider effects, alarm, schedule or cleanup calls.

Each reader/check before-and-after uses the SAME original parent-fenced now and remaining budget; no fresh five seconds. The HTTP plan expiry is at most remaining original end and material expiry. Methods/options/contexts/credentials/pins are drift-fenced, not copied from later input.

## Mutation and uncertainty semantics
Metadata ARM is a mutation even when authority flags are false. This module stays unimported/unmounted. Within its local trusted preconditions, no additional write may be admitted after current rejects. An already issued put/transaction may have a late or lost ACK/commit; timeout is NOT proof it stayed unarmed. Existing ledger uncertainty is preserved, rows/history retained, no delete/rollback/retry.

Conservatively latch ledger handoff before invoking ledger.arm. Missing/invalid/late result after that handoff returns uncertain unless a valid settled ledger blocked result establishes no write. Never translate an uncertain or post-issued timeout into blocked/no-write. Any armed metadata remains non-authoritative; later nominal admission needs separate complete approved handoff/authority, not merely finding an armed row.

Exact public-to-this-private-caller result shapes (owned frozen, <=2048 UTF-8 bytes of JSON.stringify):
```js
// Before any uncertain ledger handoff, or a timely validated ledger blocked/no-write result
{purpose:'afw.qa-generation-arm.v1',status:'blocked',writeMayHaveOccurred:false,
 authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,
 operationalReadiness:false,mayRetry:false}
// Any uncertain/unknown/late ledger handoff
{purpose:'afw.qa-generation-arm.v1',status:'uncertain',writeMayHaveOccurred:true,
 authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,
 operationalReadiness:false,mayRetry:false}
// Timely verified metadata result, NOT a nominal effect capability
{purpose:'afw.qa-generation-arm.v1',status:'armed',namedBundleHash,generationPlanHash,packetHash,
 runtimeVersionId,sourceRevision,context:'durable_object',preparedIdle:true,
 d1IdentityCorrelationVerified:true,retainedUncertainty:true,writeMayHaveOccurred:true,
 authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,
 operationalReadiness:false,mayRetry:false}
```
Malformed factory options may throw a fixed sanitized error; invocation failures resolve one fixed result. No thrown provider/private data reflection.

## Required source verification
- RED first, then actual private-host + existing real ledger CAS happy path with controlled primary D1/HTTP fixtures; separate Miniflare DO/D1 composition via TEST-ONLY fixture. Synthetic nativeInvocation/native metadata prove local consistency only.
- Both hash domains and exact prepared_idle profile; missing/aliased DB, absent/foreign/drifting declaration, wrong self ID/status/duplicate/missing inventory block. Allfalse preparation stays unchanged.
- Exactly two real eligibility/HTTP calls; current grant/history/global reservation changes after pending cause uncertain without armed promotion. Unchanged literal5 records and both original/historical primary readers are actually exercised.
- Existing orphan/concurrent/new V2 and cross-H data fail through ledger; never replace/clear historical controls/journals/global budgets.
- Parent abort, remaining-clock exhaustion at draft/material/primary/HTTP/CAS/serialization/settlement, drift, late/hung callbacks and unknown commit ACK preserve uncertainty and prevent new writes/retry. Test pending or armed data may remain after unknown ACK; no false physical cancellation claim.
- No credential output, provider POST/PUT/PATCH, nominal effects, production imports/config/mount or remote DDL/data.
- Focused RED/GREEN + target lint, then full CI/five existing builds and fresh task/whole-branch reviews. Existing frozen315 build stays separate; this unmounted library is NOT included in a new deployed/candidate QA package merely because tests pass.

## Deferred promotion gates
Native mutating ingress remains absent until actual Workflow-origin/parent-lease/handoff semantics have a reviewed supported design. Existing two-argument read-only preparation facade cannot simply be copied. Hosted performance.now uses I/O-advanced time like Date.now, not independently certified real-time enforcement. No experimental AbortSignal RPC flag, callback, artificial safety margin or post-response timeout is proof of atomic remote cancellation.

Trusted create-only draft insertion, fresh own scope, explicit dossier capability/measured candidate + compatible rollback, actual native quiescence within ORIGINAL bound, generation guard/finalizer/nominal useful delivery/client subscription/withdrawal and coordinated PC-off remain. No new live authorization from this document.
