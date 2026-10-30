# Private QA generation ledger — metadata-only

Date: 2026-10-30. Project AFW; source repository tokenizartinfo-ops/agent-friendly-web. Approved direction: successive bounded synthetic rehearsals without erasing immutable history or refreshing a consumed reservation. This increment adds no host, binding, RPC, provider/D1 implementation, grant or runtime deployment.

## Constructor and identity

createPrivateQaGenerationLedger({storage,capsule,executionPin,checkEligibility,now,timeoutMs}) fixes the target at construction. Four argument-free methods: arm(), readArmed(), status(), withdraw(). Exact plain data options; timeout 1–5000ms; original wall and monotonic lease preserved across all awaits.

The canonical JSON capsule contains purpose afw.qa-generation-capsule.v2, predecessor, trialId, grantId, eventId, closurePolicyHash, bundleHash, cancellationHistoryHash, startAt, expiresAt. Trial/event and hashes are 64 lowercase hex; grant is bounded opaque identity. Window is <=10min. No QA UUID/revision, self hash, callback, key or arbitrary destination.

First predecessor: {kind:"legacy",control:<canonical full legacy control JSON>,trialId,grantId,eventId}. Its approved control uses the existing v1 schema and canonical restoration policy; it must match the actual legacy row byte-for-byte after defined-field canonicalization, be withdrawn and expired. Identity pins are declarations requiring the future server eligibility adapter to corroborate; they are not independently proved by metadata.

Later predecessor: {kind:"generation",planHash,infoHash,sequence}. Sequence <=32 is a deliberate finite traversal ceiling. Entire lineage is checked against immutable INFO and valid CONTROL; every predecessor must be withdrawn/expired before new ARM. New trial, grant and event must differ from every recorded ancestor, including fixed legacy pins.

planHash = SHA256("afw.qa-generation-plan.v2\\n" + canonicalCapsule).
INFO includes purpose, sequence, planHash, capsule, execution snapshot and preparedAt. infoHash = SHA256("afw.qa-generation-info.v2\\n" + canonicalINFO); not stored inside INFO. Snapshot is exactly the pure pin's DO context; root must separately prove native binding and module/config/source correlation before ARM.

Only new keys: afw.qa-generation-head.v2; afw.qa-generation-info.v2:<planHash>; afw.qa-generation-control.v2:<planHash>. The v1 key and all journals are read-only. No delete/reset/rename. If HEAD is absent, two internal fixed-prefix INFO/CONTROL scans (limit33 each) in the same transaction must be empty; any orphan blocks legacy initialization. With HEAD present, those bounded scans must equal the complete <=32-member lineage, also rejecting a HEAD rolled back to a valid ancestor. No caller list/cursor API. Canonical field order is literally the constructor grammar order listed above; nested predecessor and legacy fields have their listed order. Reordered JSON is rejected, never a second plan identity. txn.list availability is documented at https://developers.cloudflare.com/durable-objects/api/legacy-kv-storage-api/#transaction .

## State transitions

1. Capture original lease and current pin.
2. External server checkEligibility() must return literal true (global reservation0 and all future server-specific D1 eligibility checks); callback is never invoked inside a retryable storage transaction.
3. One storage transaction compares exact lineage/HEAD, requires target INFO/CONTROL absent, and writes INFO+pending CONTROL+HEAD atomically.
4. Recheck eligibility under the same lease/pin.
5. Second transaction compares that exact current pending row and promotes only CONTROL pending→armed.

Failure after the first CAS leaves pending metadata; it cannot satisfy readArmed. Neither method retries ARM, repairs corrupt records, rolls HEAD back or rebinds an existing plan to a new runtime. Lost ACK yields uncertain and requires later reconciliation/cleanup, not automatic continuation. A row marked armed does not prove a live autonomous guard. Future Workflow orchestration must preserve cleanup obligation even when ARM is uncertain.

withdraw() allows pending→withdrawn or armed→withdrawn, including historical targets under a new valid QA runtime. It changes only that fixed CONTROL, never HEAD. Absent target returns absent and does not claim a permanent fence against a future ARM. status() can inspect historical metadata without reviving its UUID. readArmed() additionally requires exact HEAD, armed/unwithdrawn state, current UUID/revision/context and current window.

All observations carry authorizesEffects:false, guardLivenessVerified:false, operationalReadiness:false, mayRetry:false. They are metadata, not authorization callbacks. No clock or window renewal. Malformed/missing/contradictory HEAD/INFO/CONTROL fails closed; no legacy fallback or new legacy writes.

## Limits and future integration

Storage CAS is atomic only for Durable Object metadata. D1 pre/post reads are observations; final reservation SQL must revalidate independently. The future server adapter must enforce reservation0 for every ARM, exact scope/history/consent and runtime pins. The library alone does not fence legacy host entrypoints; that remains a separate integration prerequisite.

No subscription, callback, Container, Workflow, scheduler, cloud cleanup or PC-off property is claimed. Existing one-successor global budget stays unchanged. Runtime remains closed.

## Validation

Unit storage fixture: positive lineage, pending/armed/withdrawn, uniqueness, no replay, <=32 ancestry, time/pin drift, strict data grammar, corruption, concurrent CAS, lost ACK at each transaction, postcheck failure, later-code historical withdrawal. Native workerd test: real DO storage/transactions, concurrency and persistence; pin/clock/eligibility synthetic and no provider effects. Legacy native restoration tests remain unchanged.
