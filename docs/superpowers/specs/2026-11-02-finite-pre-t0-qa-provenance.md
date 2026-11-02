# PRE-T0 QA provenance — C1 source contract

Root ruling 2026-11-02; BASE a609c1f3296177f73468ca8c708b9333330f1d32. SOURCE ONLY, unmounted. No provider action, actual tag, workflow dispatch, private capsule, owner window, grant, publication or runtime admission.

## Trust and scope

This is a source-governed technical bridge under the explicit trusted repository-writer/governance assumption. GitHub refs are mutable by other writers/admins. Immutable Git object SHA plus current ref/payload/source/job correlation does NOT prove historical nonmutation, prevent move-away-and-back, establish full publisher identity or grant business permission. Capture tagSha/recordHash once and recheck current ref before return. The later initial publisher and owning source wrapper must explicitly accept this boundary or require stronger proof BEFORE an owner window. No new ruleset, OIDC, signing key, proxy or store.

Direct qaCodeProvenanceVerified remains false. sourceIdentityVerified, scopeVerified, authorizesEffects, operationalReadiness and completePackage remain false. Existing source-authority/owner-source unavailable seams and full-package gates stay closed. The named bridge evidence is factual, not an authority registration.

## Exact interfaces and record

New record module exports validateFiniteQaBootstrap, encodeFiniteQaBootstrap, decodeFiniteQaBootstrap, and source-owned constants. Record purpose afw.finite-qa-bootstrap.v1. Exact own enumerable data, canonical sorted-key JSON, domain-separated SHA256; encoded envelope <=16384 UTF8 bytes, bounded depth/nodes, no accessors/prototypes/symbols/extra fields.

Public record contains only repository/repositoryId, sourceRevision/sourceTree/sourceCheck, workflowHash/cliHash, commandId/runId/jobId/attempt, fixed workflowPath/job/step, P0/Pend/jobStartedAt/stepStartedAt/observedAt, and qaLive {versionId,deploymentId,module{name,sha256,bytes,exports},publicStatic{purpose,configurationHash,profileHash,bindingsHash}}. Fixed sourceCheck is git-inputs-and-configuration-before-after-v1, not B1 candidate-residency's git-inputs-before-after-v1. Exact QA role exports/profile hashes are required. No raw configuration, module bytes, private-policy/control selector/hash, owner/project/grant/consent/goal/window/callback/JWT/secret value or hash.

New admission parses only /afw-qa-finite-bootstrap v1 <M> from created owner290715446/repository1347578006/main issue497; separate purpose and WeakMap, never finite confirmation or first HEAD. P0 is original comment.created_at; Pend=P0+300000 includes queue/install/compile/tag/readback and successful step/job completion. No business T0/N1/C0/C1 clock. Later native reading may occur after Pend if original completed-success timing and fresh current QA/source/custody/parent qualify.

New issuer internally invokes the actual compileFiniteNativeStaging in its same physical checkout. No caller compiler/pins/source/provider URL. Private credential arguments are internal CLI custody transport only. Verify existing GHA9db dated receipt unchanged with Pend required expiry. Original process PID marker and GITHUB_JOB=publish/GITHUB_ACTION=finite_bootstrap_once/run/attempt1/M coherence. One process cap spent before first POST; original launch reexecution excluded by trusted source host, not durably solved by PID.

Future source workflow .github/workflows/afw-finite-qa-bootstrap.yml: issue_comment created only, exact owner/repository/main/issue497 guard; publish job existing afw-qa-cloud-closed-rollback environment, contents:write/actions:read; Node22/existing lockfile; checkout exact M no persisted credentials; step qa-bootstrap-provenance/id finite_bootstrap_once runs original PID export then exec dedicated CLI. AFW_QA_CLOSED_TOKEN and GITHUB_TOKEN only at source step. No dispatch/execution in this unit.

Compiler adds exact tracked bootstrap workflow and fixed CLI SHA256 inputs, verified at git M before/after and same physical checkout; acyclic QA-only constants embed expectations. Native compares independent public source file bytes with those embedded hashes. Node compiler/fs/esbuild/GHA issuer never enter QA/canary runtime graph. No QA selfhash.

## Actual APIs and private validation

GHA: account token verify; QA deployments?per_page=1; Beta /workers/workers/agent-friendly-web-independent-closure-qa/versions/<fullUUID>?include=modules; repeat identical pointer. Existing GHA ContentRead route only. Exact module bytes, canonical base64, size/hash/exports against actual compiler role. Strict existing qaLive public profile projection; secret_text exactly name/type BEFORE hashes. Explicit supported readonly wrappers only, no permissive provider normalizations. No qaClosed/history/full manifest call or bypass. No raw/private configuration fingerprint in public output.

CF OpenAPI verified 2026-11-02: deployments accepts Workers Metadata Read-Only and Individual Metadata Read-Only; Beta and classic version GET do NOT, even without include. Native uses token verify and two deployments reads ONLY; no QA code GET/settings-as-version-proof.

Tag locator refs/tags/afw-finite-bootstrap/<canonical fullQAUUID>; annotated name afw-finite-bootstrap-<UUID>; object M type commit. GET absence, POST tag, POST ref, exact readbacks. No PATCH/PUT/delete/reset. Conflict/unknown ACK/expiry consumes attempt; no resend or replacement. Later GET reconciliation remains factual only.

Public primary: exact owner command/main M/git commit tree/run repository/head/event/attempt1/workflow/title; original job/step start and in_progress issuer; later actual completed-success run/job/step with observation inside step and completed step/job before Pend. Exact tracked workflow and CLI contents authenticated by Git blob SHA plus independent compiler-embedded expected SHA256. Issuer never attests its future completion.

## Native reader

readPrivateQaFiniteBootstrap({ctx,env},originalLease), exactly two arguments; exact original {signal,assertCurrent}, no caller clock/fetch/pins/credential. Capture same actual ctx.id/storage, native self namespace, AFW_QA_VERSION object/id, read-token holder and fixed fetch; recheck after awaits. Derive fullUUID locator from actual version metadata. Local coherence and compiler constants are not source identity authority.

Native9aa approved ceiling remains 2026-11-03T02:59:00Z; effective expiry min(actual verified expiry,ceiling), scopeVerified=false. Original parent <=30s wall/monotonic/abort, each child <=5s clipped parent, actual read promises retained before race, no renewed lifetime or remote physical-settlement claim.

Budget: exactly 3CF GET plus 10–12 public GitHub GET, no auth fallback/cache/retry/proxy. Fresh Date/no cache/redirect denial/bounded fatalUTF8 bodies. Rate/latency failure is unavailable and remains deployment usability gate, not a credential diagnosis.

Return named afw.finite-qa-bootstrap-evidence.v1 with record, recordHash, tagSha, primaryEvidence, currentPointer, observedAt, qaPublicationBridgeVerified:true and the false fields above; explicit repositoryWriterTrustAssumed:true and historicalRefNonmutationVerified:false. Private in-process evidence, no new HTTP/RPC mount. Later readPrivateQaFiniteOwnerSource owns source/context qualification; currently unavailable.

## Initial publication handoff and tests

Initial publication is separate approved preservation/upload/deployment gate. Actual compiler files qaLive/index.mjs and canaryLive/index.mjs are bytes. CF POST /workers/scripts/<name>/versions accepts multipart/form-data (upload without deployment) and requires write/admin/editor permission; artifact IDs alone are not byte transport and read custody never authorizes publishing. No upload or deployment here.

Meaningful hosted Node22 RED/GREEN exercises new record/admission/issuer/primary/native logic, actual compiler and affected profile checks. CF/GH/custody boundaries explicitly SYN, no whole-facts success mock. Positive tests substitute only explicit SYN approval data with real clocks; separate production expiry denial keeps real ceiling unchanged. Temporary branch/path-only contents:read qualifier, no secrets/artifacts/deploy, EXCLUDED integration, no docs-only trigger.

Remaining: initial publication/byte ingress, source-context authority, private initializer/capsule/windows/new identities, material/forwarding/all-writer mounts, C3/consumer/runtime/PCoff. Task5 incomplete.
