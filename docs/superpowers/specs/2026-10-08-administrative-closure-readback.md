# Administrative closure primary readback

Architectural preparation under standing owner authorization; inline design/implementation without repeated approval. No remote token creation or modification.

Result: a bounded read-only Cloudflare adapter for a trusted server-owned closure baseline. It may certify that all pinned resources already match the approved closed baseline; it cannot restore a differing resource. Missing custody, drift or uncertain provider response must remain unknown.

Baseline configuration pins account, service token, Worker, Access application/policy, closure plan and digest of the exact provider result for each of four GET resources: token, settings, schedules, policy. All resource paths are constructed from validated primitive identifiers and fixed route templates, never caller input. A token baseline requires enabled=false in both reads; an expired enabled token is not disabled proof.

The trusted transport returns the provider's JSON envelope, with success=true and a result. The adapter makes two passes of four sequential GET requests, no retries, no writes or arbitrary methods. Each complete result is canonicalized as JSON with sorted object keys (array order retained) and hashed with SHA256. Exact digest equality with the approved baseline must hold in every read. Token id, Worker resource path and policy id must match the pins. Settings must contain a bindings array without duplicate names; present AFW consumer/assistance/dossier flags must be literal false and the present operations window empty (absence preserves the code's closed defaults). Schedules must be an empty array. An approved digest alone cannot certify an open flag, active cron or missing settings. Unknown keys affect the digest; no unreviewed binding can be ignored. Private values never appear in receipts, logs or exceptions.

Before and after every awaited read/digest, validate exact callback plan and a valid monotonic server clock at/after closeAt. A caller-edited callback or clock regression cannot produce a verified receipt. Baseline digests and plan are copied/frozen; caller changes cannot repin the expected state. The receipt is only {verified,state}, restored or unknown, and is a dated observation rather than a promise of future administrative state.

The service token full result may contain private metadata; baseline digests stay internal. No code accepts raw credentials or generates an API token. Account permission_groups403 remains a separate custody gate. No CAS/ETag is inferred from GET/PUT/PATCH documentation; this block makes no mutations and cannot overwrite concurrent legitimate changes.

Native provider read and independently hosted custody remain unaccepted. Mock tests prove validation and fixed transport request composition only. Next: own primary read baseline receipt, real safe administrative mutation capability or already-closed observed state, private hosted composition and integrated PC-off before Max.
