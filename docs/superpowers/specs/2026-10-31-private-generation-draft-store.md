# Isolated private generation draft store
31oct2026. Task2a of private generation preparation; source/CI only, no remote installation/data/mount.

The existing676 table afw_qa_named_packets_v1 remains generation_plan_hash-keyed, unchanged. A separate immutable afw_qa_generation_drafts_v1 has named_bundle_hash and draft_json. Each business bundle is recorded once: duplicate, REPLACE, UPSERT, UPDATE and DELETE cannot refund or rewrite it. No IF NOT EXISTS or automatic migration; live installation requires separate exact target/preservation/readback.

Canonical <=65536 UTF8 envelope: purpose afw.qa-generation-draft.v1, eventId (64 lowercase hex), namedPolicy, closurePolicy, cancellationHistory, historicalNamedPolicy and historicalDispatchPolicy (five nonempty data strings). No script, callback, source code or execution UUID. The decoder checks only envelope grammar; later materializer validates frozen315/bundleHash/current policy, commitments and primary identities.

The INTERNAL reader performs exactly one first-primary SELECT by named_bundle_hash, never generation_plan_hash or a fallback table/DB. Parent AbortSignal, <=5s original caller remaining timeout, wall/monotonic/backward time, stable DB/session/statement identities, post-settlement revalidation and static errors. Missing/invalid/late data is null; no install, writes, credentials, provider, retry or authority. Raw draft stays inside the private host, never a public RPC result.

Native SQLite/D1 tests preserve unrelated history, prove immutable key behavior and unknown-ACK read-only reconciliation, and keep an old generation packet from becoming a draft fallback. Unit tests cover bounded metadata, argument/identity/deadline drift, UTF8 limits and exact domain/envelope. Concrete historical D1 correlation (Task2b) and native composition/ARM remain pending. operationalReadiness=false.
