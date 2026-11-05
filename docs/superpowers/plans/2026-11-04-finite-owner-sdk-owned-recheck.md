# Finite owner SDK owned recheck — D0.2 amendment

4 November 2026. DESIGN ONLY; no implementation/test/runtime authorization. Product pin33fece006e8ccb74c6f91546002469d89939c059. [Spec](../specs/2026-11-04-finite-owner-sdk-owned-recheck.md).

> **For agentic workers:** use the root's standing single-product-writer SDD execution after root accepts and dispatches this amendment. This does not create another writer or a scaffolding-only implementation task. Original A/B remain inactive until D0 is accepted and integrated.

## Filemap and interfaces

Amend existing D0.2 at ONE integrated affected head:

- Modify lib/mcp-qa-finite-owner-phase-context.mjs: single extracted non-exported observeOwnerPhasePair({ctx,env,parent,preconnectionId}); strict qualifySettledOwnerPair(pair); retain existing readPrivateQaFiniteOwnerContext API; implement fixed exported handlePrivateQaFiniteOwnerOAuth({request,env,ctx},originalLease) in the SAME module with nested zero-argument recheckOwned().
- Create planned lib/mcp-qa-finite-owner-oauth-qa.mjs only as the fixed native receiver importing that handler; it receives no observation frames or generic continuation.
- Existing D0.2 oauth-forward/wire and bounded issuer-provenance records/journal remain as specified. D0.1 binding-facts is called inside common private metadata qualification.
- Modify planned test/mcp-qa-finite-owner-qa-sdk-native.test.mjs and test/fixtures/finite-owner-qa-sdk.mjs with actual two-consumer behavior and lifecycle injections.
- Retain/extend accepted phase-context native tests at the execution head. Unit2a store/journal/schema and production Worker/DO entrypoints remain unchanged.

No cross-module observation export, serialized frame decoder, source callback, allowPending flag or copied SDK-result endpoint. No new schema/access task. D0.3 token compatibility stays separately reviewable.

## Integrated RED/GREEN sequence

1. **Pin accepted dependencies.** Record root-approved product head containing accepted reader and D0.1; compare against inspected33fece source. Original reader tests and schemaabsence/firstGET rulings are regression requirements. Do not follow another active writer.
2. **Write causal native RED.** Actual QA handler records SDK begin SEND then attempts its next fixed step through current strict reader: it cannot progress. The positive expectation must fail at this precise dependency, not absent fixtures/import errors. Another request invoking standard reader at the same prefix must already deny.
3. **Refactor one physical engine and implement handler together.** Move existing I/O to observeOwnerPhasePair without cloning it. Extract common validation and strict settled rules; perform all common/receipt checks twice. Keep handler within one existing observeFiniteOwnerRequestWork scope; shared observations borrow its ambient genuine root via observeFiniteFactualReadWork, with no stage-work API changes or read-only fallback for SDK execution. Only the handler's real local effects produce its expected ledger/result state.
4. **Integrate exact own-delta checks.** Verify baseline and every fresh recorded append; uncertain/existing appends stop. Pair snapshots equal the exact ledger. Pending actual Promise cannot advance. Unit2a consume/grant keep one store and the same <=5s child; no row reconstruction or extra lease. Holder/fence/expiry checks remain.
5. **Run focused cloud native GREEN** for test/mcp-qa-finite-owner-qa-sdk-native.test.mjs and the accepted reader's actual native test file(s), then affected issuer, retention, profile and context regressions once at that same head. Record exact command/run/head/attempt/counts. No local build/tests; no runtime operations. A passing source test does not install alias or qualify mounting.
6. **Review integrated graph/diff.** One observation implementation, no public frame/continuation endpoint, standard reader unchanged contract, fixed QA receiver import, no M decoder edge and no changes to Unit2a authority. Publish root-review checkpoint via CAS. Do not merge a disconnected refactor and call D0.2 complete.

## Required native real-code cases

Use actual workerd DO storage, D1 and shared synthetic KV, actual SDK1.2.1 and actual source reader/journal/store functions. External provider/Access/custody/material inputs and expired-ceiling substitution are explicitly SYN; no ready source DTO, prefilled positive grant or syntheticFacts alias.

- **GET early held begin:** actual recorded begin SEND remains unresolved while actual KV operation is held. Same executing GET can perform its own recheck, but no reservation/form/second SDK call occurs. Standard reader and second GET deny. Exercise strict reader in the same genuine ambient lineage through a fixed test-only observation point, so its denial is causally the unresolved journal rule rather than merely another request's occupancy rejection; test the latter separately. Once actual SDK resolves, the same original stack appends Observed and continues; assert actual form comes after genuine issuer ACK/link.
- **POST own issuer SEND:** live invocation records consume/grant SEND and verifies its precise local transition/result. Standard reader denies the unresolved prefix; only actual consume result permits insertReadGrant on the same store/lease. Copying the exact row into another call fails.
- **Pending versus resolved SDK:** hold actual approve and complete operations. Fabricated completion payloads have no endpoint. A local recheck never replaces the pending Promise. Release then require actual result plus fresh ACK before next work.
- **Foreign/extra delta:** inject an extra/changed SDK record, other operation SEND, ACK, issuer reservation, preparation link, freeze or policy-writer SEND between snapshots and between effects. Both consumers deny; no successor grant/SDK call. Do not whitelist an entire prefix.
- **Restart and same metadata:** recreate actor/request after unresolved SEND using same requestId/body/version/root-like metadata. No local ownership can be loaded from rows; no SDK retry or reconstructed witness.
- **Drift:** change QA/M pointer/module/config/alias, original backup bytes, credential expiry, current project owner/revision or initial capsule linkage before next recheck. Blocks next work. Repeat enabled-receipt versus original-CLOSED configuration mutation independently in first and second snapshots.
- **Retention/expiry:** hold actual SDK, provider fetch, body read and cancellation separately. Timeouts/native abort retain real operations; late settlements never authorize ACK/response/next effect. Consume/grant child and parent deadlines never renew. Actual SQL clock rejects stale queued granting SQL.
- **Existing absence prefixes:** schema absent with no issuer/link/relation remains factual; reservation or link while schema absent denies. First-GET lone source prefix remains as accepted, cannot host SDK SEND without approved enrollment/receipt. No schema creation and no extra source eligibility from fixture ceiling.
- **Settled behavior:** existing closed_ui/read_consent DTO remains byte-for-byte equivalent for allowed settled histories. General reader stays unavailable for every unresolved SDK/issuer history even when the handler's own private recheck succeeds.

Original SDK promise settlement, permission reduction and restoration remain distinct. This supplement solves lexical rechecking only; provider publication continuation, full mounting/cleanup and actual QA alias authorization stay separate.


## Root D0.2 SOURCE activation — 5 November2026

Latestcontainingcommitactivates ONLYD0.2plusowned-recheckamendment afterD0.1acceptance04e8bb0f. ActualexecutionBASEsuppliedindispatch. HistoricalD0.1-onlyactivation/unassignedwordingaboveisdatedhistory. D0.3/notices/fullmount/actualbinding/provider/credential/Entry remainINACTIVE. SourceSDKtestsareonlysyntheticnativequalification. Briefdocs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d02.md governsrootrulings andCASsinglewriter. No operationalreadiness.
