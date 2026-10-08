# LOCAL blocks 1–2: versioned server admission and exact approvals

Approved spec58de610; no HTTP mount. Saved before tests/code.

DTO strict allowlists:
- admissionContract omitted or cloud-v1 preserves existing preflight. server-v1 requires approval/readServerAdmission and rejects preflight. Unknown/mixed rejects.
- approval exact {manifest,identityRef,enrollmentRef,serverConfigVersion,planRevision}. Existing exact manifest/signal; identity/enrollment/config version hex64 opaque; planRevision safe integer1..MAX_SAFE. Effective config digest is not deployment attestation. Dates integer0..8640000000000000 with all ends after start; original pins retain formats. Copy inputs; no arbitrary JSON.
- server DTO exact {contractVersion,serverConfigVersion,planRevision,admissionRevision,observedAt,identityRef,enrollmentRef,schemaVersion}. contractVersion afw-server-admission-v1; schemaVersion2; revisions safe integer>=1; refs/config hex64; timestamp<=clock freshness<=30s. Exact approval matches; admissionRevision pinned per occurrence, never cloud revision. Trusted caller provider declares only own server state; no network/VM observations or consumer provider.

Typed immutable approvals: occurrence/request/event unique, exact manifest columns, opaque refs. Revocation append-only single per occurrence, enum operator_closed/window_expired/security_denied. Internal approve/read/revoke only; synthetic approval proves no real owner. No regrant.

Explicit additive schema1-to2 migration without IF NOT EXISTS; immutable marker2, duplicate migration fails. Contract mapping precedes journal; server journal trigger checks approval matches header/mapping and not revoked except stopped. Mapping prevents server-to-cloud downgrade. create/admit/consume guards share batch; final guard after effects rechecks approval+clock. Stop original identity/digest/history stays enforced but permits expiry/revocation. Legacy schema usable without migration; server requires marker2.

TDD: SQLite tests first RED, then validators/catalog/migration/store. New tests explicitly migrate, legacy fixture unchanged. Two connections; revoke after provider lookup before batch => rollback create/admit/consume/effects; direct journal guards; expired/revoked stop; exact DTO/revisions/ref bounds; immutability; schema missing/duplicate migration. Native Miniflare two bindings and helpers.

Focal+native, full npm test, lint. Supported network command only for loopback, back to use_default; sanitized receipts; commit/push own branch. Transport c8ee03d unnecessary for blocks1–2, defer import. No runtime/public/routes/budget/Access/remote SQL/scheduler changes.

Completed LOCAL blocks1–2: see docs/evidence/occurrence-server-admission-local-receipt.md. Reviewer P2 corrected with RED/GREEN; final SQL clock fence added to server checks. No HTTP adapter or runner imported. Native4/4 and full1165pass/1skip; schema2 is local-only.
