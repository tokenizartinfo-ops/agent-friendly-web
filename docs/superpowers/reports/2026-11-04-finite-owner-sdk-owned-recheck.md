# Finite owner SDK owned recheck — design report

4 November 2026. Docs only; inspected fixed product33fece006e8ccb74c6f91546002469d89939c059. No product edits, builds/tests, runtime/binding/provider/credential/DDL/Entry action.

The accepted [279-line phase reader](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/33fece006e8ccb74c6f91546002469d89939c059/lib/mcp-qa-finite-owner-phase-context.mjs) nests physical facts/primary/issuer reads and qualification; issuerPrimary rejects SEND without ACK. Calling it unchanged after the handler's own SEND would block the proposed D0.2 sequence.

**Resolution: same-module lexical composition.** Extract that one observation engine into a non-exported observeOwnerPhasePair. Keep the standard reader strict. Implement the fixed QA OAuth handler in the same module, with private zero-argument recheckOwned closing over its actual request, original store/lease, newly recorded precise journal delta and real SDK/Unit2a Promise/result. The native receiver imports only the fixed handler. No observation transport, callback, allowPending flag or row-derived witness.

The [spec](../specs/2026-11-04-finite-owner-sdk-owned-recheck.md) defines private DATA shape/bounds and the before-call/pending/resolved/ACK states. Common actual source, metadata, backup, owner, primary, expiry and receipt-phase checks run in both snapshots. Schemaabsence and first-GET prefix acceptance remain factual, never new issuance permission. Foreign deltas and restarted SEND cannot become owned work. Unit2a remains unchanged.

The [plan](../plans/2026-11-04-finite-owner-sdk-owned-recheck.md) amends D0.2 as one integrated affected-head implementation and native proof, avoiding a scaffolding-only task. It requires GET/POST own-SEND progress while standard reader denies, early held begin, exact-delta hostility, restart denial, pointer/owner drift and real SDK/fetch/body/cancel retention.

No new SDK-attestation research or mechanism. Option2 and the proposed single QA OAuth KV alias remain unchanged; no access is installed. A/B stay inactive until root accepts/integrates D0; provider own-SEND and full mounting/cleanup remain separate. Original clocks and expired source ceiling remain; operationalReadiness=false, completePackage=false, PCoff=false.
