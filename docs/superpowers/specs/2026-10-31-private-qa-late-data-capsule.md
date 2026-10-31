# Increment676: immutable QA packet storage and exact primary reader

This increment implements only source schema and bounded internal packet reader, with real D1 fixtures. No installed table/real row, assembler, compiled artifact slot or Named preflight is credited yet. Those follow the reviewed integration design below. The private reader returns raw packet data only inside trusted server composition; it must never be exported as a public RPC response or treated as effect authority. Its envelope validation is not semantic grant/bundle validation.

# Private QA late-data capsule and closed Named preflight

AFW only,31Oct2026. Base431a33289af73724dd139c13ea707641deae01e9 (PR675). Owner approved the ongoing nominal/generation integration and autonomous own QA. This is a source preparation plan; it does not itself authorize runtime/schema/credential changes. Explicit current remote custody and rollback must be checked at any later mutation.

## Concrete gap
INFO stores generation commitments (<=16KiB), not a recoverable nominal bundle/history. Existing materializeMcpPrivateConfirmation returns new JavaScript; using it after a grant would require republishing QA and changing its UUID. A same-UUID late-data channel is needed.675 resolves only an already-armed current generation; it is neither a validator of a new plan before ARM nor a writer.

## Chosen separation
1. Build and measure frozen canary artifact315cc3b3/source2a477373 with its own lockfile, QA source and validators BEFORE human consent. Reuse the existing named-package job's verified historical artifact. Embed artifact as a fixed build-time slot. Source/default slot is absent and closes before data access; build substitution must verify actual frozen receipt. No policy, grant, callback or key in public code artifacts.
2. Late private packet is canonical JSON,<=65536 UTF8 bytes for the WHOLE serialized envelope including escaping. Fields in exact order: purpose, generationCapsule, namedPolicy, closurePolicy, cancellationHistory. Four data strings only, no script, credential, QA UUID, INFO hash or self hash. Minimal scope/grant references in policies are private data; no consent/grant rows or user answers are copied. Canonical generationCapsule bytes match immutable INFO exactly.
3. Store packet in a new additive immutable table in existing isolated QA_DB676ca49e-af71-4f2f-a12d-11f13de78a51, keyed by domain-separated generationPlanHash. Not dossierDB6a728254. Administrative root performs one fixed parameterized create-only INSERT; unknown ACK allows exact read reconciliation only, never another INSERT/ARM/window refresh. PK, duplicate-blocking BEFORE INSERT and UPDATE/DELETE triggers enforce append-only ordinary writes, including INSERT OR REPLACE/UPSERT. No new write RPC/HTTP route, no latest-row query, no automatic migration.
4. Read with first-primary by the exact generation hash derived from primary HEAD/INFO. A row, PK or hash is coherence evidence, not ARM, grant or effect authority. Module/config/binding provenance still requires independent root correlation.

## Hash domains and composition
namedBundleHash = SHA256(JSON.stringify({artifact:compiledArtifact,policy:decodedNamedPolicy})), preserving runtime order.
generationPlanHash = SHA256("afw.qa-generation-plan.v2\n"+canonicalGenerationCapsule).
INFO.infoHash remains the ledger's distinct commitment including stored QA identity.
Packet hash is an observation only, never embedded into itself.
Reuse generation grammar, validateReleaseOperatorBundle, validateNamedCancellationHistory, resolveNamedActivationPlan and parseCanaryRestorationPolicy. Link bundleHash/closurePolicyHash/cancellationHistoryHash, trial/grant/window to exact decoded data. The capsule's eventId remains the declared generation commitment; this read path does not prove a dispatch schedule/event or authorize one. Future dispatch must independently match that eventId.

Do not equate fingerprint domains. Activation and restoration configuration hashes differ; recompute restorationConfigurationHash on the same live metadata for the closure/live check, not equality to the activation fingerprint or the closed-QA profile fingerprint. Restoration startAt may be a later phase/cutoff, not nominal consent start. Audit and preserve containment and original absolute deadlines; no assumed equality that shifts a cutoff.

## Read-only vertical slice
Keep675's no-D1 resolver/2048byte DTO unchanged. A separate private preparation reader may use QA_DB explicitly, with one original <=5s wall/monotonic lease, stable env/storage/db/statement identities, no retries and final settlement check. It first narrows primary HEAD/INFO by the expected namedBundleHash, then uses675's full current-generation fence, reads the exact private packet and assembles the local bundle against the compiled artifact. No access to dossierDB, provider credentials, activation, reservation, OAuth or Container APIs.

Mount a closed preflight in actual PrivateQaNamedConfirmation, with payload exactly {planHash} where planHash is namedBundleHash. Use a DISTINCT finite instance identity such as afw-qa-named-preflight-<namedBundleHash>, never afw-release-<namedBundleHash>, so diagnostics do not consume nominal instance identity. Both object and canonical API JSON payload forms must be tested. Default source without the fixed artifact blocks. All14 closed flags remain literalfalse; ordinary nominal ID/payload stays blocked. Retain existing observe_closed_context support and compatible rollback exports.

Preflight returns bounded JSON/DTO with only generation/named/packet hashes, QA UUID/revision and frozen artifact receipt fields, every authority/liveness/readiness/retry flagfalse. No private policy, capsule, grant, row, code or raw error escapes. Actual Workflow↔DO contexts must compare native QA UUID and compiled QA source, distinct from frozen canary source. Cached step output is not a new observation. Positive source fixtures do not establish remote provenance.

## Build scope
Add an explicitly separate <=3MiB measured QA named-template build for the combined QA code and frozen artifact. Do NOT expand the existing <=1MiB closed-context or <=2MiB public/legacy artifact limits. Both candidate and compatible rollback must preserve registered exports/resources, all closed flags and existing isolated DB binding. No new AFW_QA_DOSSIER_DB in this read-only increment. Reuse existing named package checkout/lockfiles; no extra local clone/build or credential. Verify source before/after, exact Git inputs, module/config/workflow hashes and bytes; preserve only code/template manifests, never a real late packet.

## Verification order
RED/GREEN data grammar/hash domain and containment tests; canonical escaping and combined64KiB boundary; private-field/secret rejection; exact primary SELECT and hung/abort/deadline/settlement checks. Native D1 fixture qualifies PK/triggers, duplicate INSERT and UPDATE/DELETE rejection, unknown-ACK reconciliation semantics and unchanged unrelated/history rows. Native actual DO/Workflow consumes seeded SYNTHETIC packet only; positive fake-artifact tests are labeled coherence fixtures, and the package job separately exercises the exact historical frozen artifact. Require no dossierDB/provider/credential/effect accesses, distinct finite preflight ID and exact payload, wrong context/UUID/source/HEAD/hash/package failures, both sealed builds and measured sizes. Independent review before acceptance.

No remote migration, packet INSERT, source upload, Workflow creation or grant in the implementation tests. SQL schema is a fixed source artifact for the isolated QA DB; the implementation never auto-applies it. Later administrative channel qualification is its own concrete bounded operation with actual source, target/schema inspection, preservation/rollback and sane receipts. Missing real channel or packet remains a gate; source CI never credits it.

## Remaining effect gates
Complete fixed capsule, root module/config/UUID correlation before ARM, explicit actual-dossier capability and primary phase predicates, V2 guard/journals and cleanup independent of revoked grants, full finite external finalizer, actual native watch ACK and independent native cleanup, useful delivery/physical stop/PC-off remain unproved. Native unsubscribe unknown cannot block otherwise safe server cleanup, but still blocks full acceptance. Do not spend the unique successor occurrence in a preliminary PC-on run.

Primary references: https://developers.cloudflare.com/d1/sql-api/sql-statements/ ; https://www.sqlite.org/lang_createtrigger.html ; https://developers.cloudflare.com/durable-objects/platform/limits/ . The protocol caps here are intentional; provider SQLite DO key+value currently allows2MB, while legacy KV limits differ. INFO16KiB is unchanged.
