# Finite owner SDK owned recheck — D0.2 supplement

4 November 2026. DESIGN ONLY. Inspected product source **33fece006e8ccb74c6f91546002469d89939c059**, specifically the accepted 279-line [phase reader](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/33fece006e8ccb74c6f91546002469d89939c059/lib/mcp-qa-finite-owner-phase-context.mjs). Supplements [D0](2026-11-04-finite-owner-sdk-trust-boundary.md); changes no product code or operational access. A/B remain inactive until root integrates D0.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT GitHub docs; RESOURCE_ID docs/finite-fenced-owner-issuer-notice-20261104; ALLOWED_ACTION fixed source reads and three new docs with expected-head CAS. Rollback is a docs revert. No advancing product reads, test/build/runtime/provider/binding/credential/DDL/Entry actions.

## Decision: same-module lexical composition

Keep one physical observation implementation in lib/mcp-qa-finite-owner-phase-context.mjs. Move its existing nested I/O/qualification blocks into non-exported fixed helpers in that same module. Add the fixed QA OAuth handler there, next to the unchanged strict reader export. The proposed oauth-qa.mjs retains the native receiver and imports that fixed handler. It does not receive raw observation frames or own-recheck capability.

Exact interfaces:

```js
// Existing public-to-QA-module API; same input/output contract.
export async function readPrivateQaFiniteOwnerContext(
 {ctx, env, parent, preconnectionId} // preconnectionId remains optional
); // -> frozen {source, preconnectionId, capsuleHash}

// Fixed QA handler; receiver supplies genuine original registered lease.
export async function handlePrivateQaFiniteOwnerOAuth(
 {request, env, ctx}, originalLease
); // -> Response

// ALL following functions are module-private, not exported.
async function observeOwnerPhasePair(
 {ctx, env, parent, preconnectionId}
); // -> private immutable ObservationPair DATA
function qualifySettledOwnerPair(pair); // -> existing reader DTO or throw

// Nested inside EACH actual handlePrivateQaFiniteOwnerOAuth invocation:
async function recheckOwned(); // -> void; no caller arguments
```

There is no source factory, injected verifier, callback, mode, allowPending, ownedWriter flag, public recheck token, actor-wide continuation registry or method to hydrate state from journal rows. A new request has a new lexical stack and must pass qualifySettledOwnerPair before claiming any work.

## One observation engine, two consumers

Today facts, primary, issuerPrimary and qualify are nested inside the reader. issuerPrimary rejects SEND without ACK; qualify also performs actual store reads. Extract their I/O once. Keep common source/phase/identity validation separate from the final settled-operation rule. Do not duplicate the 279-line engine or run the strict reader and catch its denial as permission.

observeOwnerPhasePair always performs the current capture/holder, original request-root/deadline, retention, two-snapshot and fresh-primary reads. It supplies no success/authorization flag. It does not accept expected journal deltas or a replacement source. Both consumers apply the SAME common validation to both snapshots, including receipt-dependent current configuration checks, before applying their final operation rules.

Private DATA schema (never exported across modules, native RPC/HTTP, storage, logs or browser):

```text
ObservationPair = {first: ObservationSnapshot, second: ObservationSnapshot}
ObservationSnapshot = {
 sourceBase, preconnectionId, capsuleHash, anchor,
 physical: {project, pointer, currentConfiguration, initialBaseline,
            qaSdkBindingFacts},
 preparation: {sourceSnapshot, ticket, ticketUse, projectRef,
               preconnection, stageApproval, approval},
 records: {inventory, effects, enrollment, issuer, sdk},
 installed: {receipt, enrollment, ack},
 issuerRows: {schema, fence, consent, grant, authorization,
              grantLink, relation, connection}
}
```

sourceBase uses the existing validateFiniteOwnerSource closed_ui shape. preparation fields are exactly existing decoded store records or null. inventory/effects/enrollment/sdk are immutable sorted [key,canonicalRecord] arrays, never mutable Maps. issuer uses the existing exact journal reader shape. schema and rows use the exact SELECT projections already in issuerPrimary. installed fields use existing enrollment/installed-stage codecs. qaSdkBindingFacts is D0.1's strict DATA alias/namespace/bindingHash tuple; it is not a capability. anchor is the current canonical anchors/backup/inventory/effects/enrollment/issuer commitment extended with the bounded SDK journal; it is equality evidence only. No function, Promise, native holder, token, SDK cookie/code/approved request, consumption or barrier witness is included.

Preserve existing bounds: connection inventory at most16 (read17), effects at most32 (read33), enrollment at most2 (read3), issuer at most14 (read16), SDK at most8 records before notices (read9), each new SDK record at most16384 bytes. Preserve current backup2MiB and provider-response caps4500000/65536/8192 and canonical validation of all existing records. No widened JSON grammar or generic record bag. Frame lives only for the current comparison, is recursively frozen and discarded; it has no decoder/adoption API.

Two snapshots must match the current complete anchor, qualified physical result, preparation records, issuer rows and SDK records, with normal time-dependent bounds checked independently at each snapshot. No source/metadata authority comes from a frame hash. The receiver cannot provide a frame.

## Lexical ownership and exact delta

On handler entry, call the shared engine and strict qualifier, verify actual original owner/form/SDK inputs as in D0.2, and capture an immutable settled baseline. GET/POST claims are still the original durable one-use operations. The handler captures the actual request object, registered root/deadline, ctx/env/native methods, QA alias, exact issuer store instance, original issuer identity and child leases. No new admission is minted.

The fixed handler enters existing observeFiniteOwnerRequestWork({ctx,env,originalLease}, operation) exactly once, with readFiniteOwnerRequestContext(originalLease).root === originalLease, before source/SDK I/O. Its receiver creates the genuine forwarded root/finish lifecycle but does not create a second request scope. observeOwnerPhasePair retains the existing observeFiniteFactualReadWork borrowing of that exact ambient lineage; its clock closes without closing the original root. Existing retainFiniteOwnerStagePromise therefore retains the handler's SDK and all nested source/store operations in the same real scope. No change to stage-work.mjs, new retention admission, public scope selector or use of its read-only fallback to execute SDK is needed. Receiver finish closes the root after response/failure; outstanding actual promises remain retained under existing release rules.

Only that executing stack maintains:
- expected canonical journal/record inventory, initialized to the settled baseline;
- exact fresh append outcomes and actual write/readback results;
- the current real SDK Promise and its result/rejection, or actual Unit2a Promise/result;
- the genuine consumption object and SAME store/SAME child lease until insertReadGrant consumes it;
- a fixed local program position, advanced only by the hardcoded GET/POST sequence.

The ledger is not an authority DTO and cannot be serialized or returned. Append succeeds for new work only on actual status recorded plus existing sync/readback; existing or uncertain stops this invocation. Do not inspect a matching row after an uncertain ACK and recover permission. Canonical bytes enter expected inventory only after that actual append outcome. Every other key/value must remain byte-identical to the settled baseline or an already accepted local write.

recheckOwned takes no parameters. It closes over those objects, calls observeOwnerPhasePair under the unchanged original parent/active child deadline, applies common validation to BOTH snapshots, and compares the full observed inventory with its exact local ledger. No foreign/extra/missing/replaced record, freeze, cleanup operation, provider-effect change or reservation identity drift is accepted. It returns only void to the next fixed statement in the same handler.

Its unresolved-operation rule is exact:
1. **Own SEND recorded, effect not started:** only the exact just-appended SEND at the current program position may lack ACK. D1 rows must equal the previously qualified rows. This permits the same stack to invoke its single planned SDK/store call, not to issue downstream work.
2. **Actual Promise pending:** retain it; no subsequent SDK call, grant, phase advance or success response. An internal diagnostic recheck cannot turn pending into resolved.
3. **Actual Promise resolved, ACK not appended:** only the exact local result permits the next outcome append. For Unit2a, current exact rows must equal the actual returned result and expected transition; row equality never manufactures consumption. For SDK, no wire claim or KV row substitutes for the actual local result. Rejection/no_mutation/uncertain aborts the success sequence.
4. **ACK/Observed durably appended:** compare exact record and current rows, then permit only the next fixed operation. General reader may again observe a fully settled intermediate prefix, but that observation does not continue this handler's witness chain.

SDK begin runs before app reservation: its unresolved SEND is owned only by the current GET; a held begin cannot produce reservation/form or be claimed by a second GET. POST uses the settled GET prefix as baseline but calls its own actual approveConsent and later completeAuthorization. It never recreates the prior GET's live closure.

For issuer operations the only accepted additions are the original reservation and open_fence/authorization on GET, consume/grant on POST, plus their ACKs and exact preparation links specified by D0.2. Freeze/close_fence/revoke_grant never become an owned forward delta. The existing Unit2a store, schema, native-time predicates, WeakMaps and genuine consumption witness remain unchanged.

Full rechecks occur before the next effect and after its actual result before an ACK/success. The consume→grant chain still uses ONE actual child lease/store; its journal work and any full recheck fit inside the original <=5s child or fail closed. No new child for insertReadGrant, deadline extension, fallback reader or latency assumption is allowed. Parent remains <=30s and clipped to all original bounds.

## Invariants preserved

Common validation keeps original capsule/material/backup chunks/receipt, native residency/source pins, QA pointer/module/bindings and original/current M configuration/module/receipt, credential identity/expiry, exact owner revision, original I0/C0/C1 and actual alarm/cleanup state. Every current D1 observation uses a new first-primary session with SELECT first, never owner/client scans. Every awaited fetch/body/cancel and SDK/store promise retains its actual lifecycle.

The read_consent receipt guard must run in BOTH snapshots: an installed connection receipt requires the exact enabled read_consent configuration and matching pointer/configuration hash; original CLOSED M with that receipt denies even if other hashes agree. Provider own-SEND is never accepted by this mechanism.

Schema absence remains a factual allowed state only under the accepted absence rule: no issuer reservation/fence/grant link/relation. It grants no right to issue; Unit2a's actual preflight still requires its exact schema before mutation. Lone first-GET source inventory remains accepted only with the current absence rules for ticket/use/preconnection/enrollment/effects/issuer; adding SDK inventory must not accidentally turn that prefix into authority. An SDK SEND cannot be admitted at that incomplete prefix. No DDL is introduced.

General reader always rejects unresolved SDK/issuer SEND, orphan ACK, foreign/extra SDK records and incomplete local outcomes. It cannot identify ownership from requestId, hashes, journal rows or matching metadata. Restart/new request must stop on pending records even when all copied correlation fields match.

Late settlement may discharge retention only. It cannot append expired ACK, renew the original window, expose a code, recover a witness or prove global SDK/KV physical drain. D0 option2 and its proposed ONE QA OAuth KV alias remain unchanged; access is not installed by this design. Original uncertainty ruling and deployment-writer-unknown restore prohibition remain.

Source ceiling2026-11-03T02:59:00Z remains expired. Fixture-only substitution is SYN, never eligibility. operationalReadiness=false; completePackage=false; PCoff=false.


## Root D0.2 SOURCE activation — 5 November2026

Latestcontainingcommitactivates ONLYD0.2plusowned-recheckamendment afterD0.1acceptance04e8bb0f. ActualexecutionBASEsuppliedindispatch. HistoricalD0.1-onlyactivation/unassignedwordingaboveisdatedhistory. D0.3/notices/fullmount/actualbinding/provider/credential/Entry remainINACTIVE. SourceSDKtestsareonlysyntheticnativequalification. Briefdocs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d02.md governsrootrulings andCASsinglewriter. No operationalreadiness.
