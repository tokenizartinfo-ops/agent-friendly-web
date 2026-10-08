# AFW: pinned D1 closure actions

Scope: bounded server-owned adapter over the existing v2 approval catalog and append-only occurrence journal. The owner authorized autonomous continuation and design decisions; no new credential, grant, route, database or remote activation is included. Existing closure coordinator remains unchanged.

`createClosureD1Actions({db,approval,plan,now})` validates and captures immutable approved manifest/identity/enrollment/version/revision and closure plan. Plan must match occurrence and close exactly at manifest.deadline, with primitive SHA256 baseline reference. Every public callback must receive the exact pinned plan (readback additionally the exact step). Caller is trusted server configuration, never request JSON.

Before any effect, read the real catalog and compare every approval column with the configured approval. Missing, mismatched or unavailable plan denies without writing. Do not consume cloud preflight as server administration. Revocation is append-only via catalog; already revoked is a readback, not another INSERT. Closing ledger requires revoked approval and the same journal identity/manifest digest. Preserve completed/stopped; active ledger uses the existing atomic stop transition, reason window_expired. A concurrent completion may win and must survive. Never-started/missing/mismatched journal denies, never invent stopped.

Actions return only exact `{verified,state}` receipts (unknown = false/state unknown). Provider errors are sanitized. A failed or ambiguous write is not repeated; coordinator's reconcile may only read actual pinned primary state. readIssuedReceipt only supports revokePlan/closeLedger; restoreAdministration is explicitly unverified and cannot produce restored. No provider CAS/ETag, credential readiness, runtime deployment or PC-off is inferred.

Validation: tests against native SQLite D1 schema/triggers, independently addressed clients, active stop after deadline, completed preservation, wrong pin/identity/deadline, absent ledger, lost write acknowledgment recovered through readback and concurrency. Real schema clock is used. No new migration.

Next separate blocks: hosted DO lifecycle and actual administrative restoration capability/custody/readback; own bounded remote integration and PC-off. This adapter does not claim administrative closure.
