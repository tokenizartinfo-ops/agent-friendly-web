# Server-owned QA closure catalog

Owner selected consecutive autonomous AFW implementation. This block adds an internal per-occurrence immutable catalog, without routes or hosted credentials. No old token or baseline is enrolled automatically.

The server supplies the entire registration: explicit catalog contract, occurrence/closeAt/baselineRef, plan revision, five exact administrative resources, four V2 digests, identity name/stable digest, opaque creation/custody/inventory references and finite creation/expiry dates. baselineRef hashes every registration field except itself. No secrets or consumer exclusiveQa boolean.

Approval requires a trusted primary provisioning reader, addressed only by the pinned creationRef, to return an exact versioned exclusive receipt matching the complete registration hash. That reader must derive its receipt from own isolated provisioning/custody/inventory; a synthetic callback proves only the interface, not real exclusivity. No reader is mounted here. Server storage is trusted and exclusive; consumers cannot approve or alter it.

Copy strict data-only registration before awaits. Approve only before closeAt with finite identity expiry at least10s later; monotonic clock/input-free methods. Transaction stores once: equal registration is idempotent, different registration cannot replace it. Revocation is append-only and never restored by approval. Read requires exact persisted registration and fresh primary provisioning receipt; fail closed on mismatch, revocation or unknown. Expiry does not erase historical registration needed for closure. Catalog authority is distinct from the occurrence plan's own revocation.

Acceptance: missing/changed/revoked provisioning, malformed/secret/accessor input, changed plan/resources/digests, late registration, immutable collision and restart/revocation. Native SQLite Durable Object storage test before integration. Closure effects, hosted adoption, actual active-disable, integratedPCoff and Max remain separate.

Token reservation is atomic with approval in one shared primary catalog storage; a different occurrence cannot reserve the same account/token UUID, including after revocation. An orphan or mismatched token reservation fails closed. The mounted server must use a single catalog storage scope for all plans, not one separate namespace/object per occurrence. No provider-global CAS/exclusivity is inferred from this local fence.

Review caught deadline crossing an awaited storage put. The approval now rechecks after each put and throws inside the transaction when late. Native SQLite DO tests verify zero rows after crossing either write; the token reservation and registration roll back together. Ten focused cases passed after correction; no expiry claim based solely on a pre-write clock check.
