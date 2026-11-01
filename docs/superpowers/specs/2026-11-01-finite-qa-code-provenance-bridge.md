# Finite QA code-provenance bridge — explicit seed amendment

Status: DESIGN ONLY; root-selected source direction, not implemented or deployed.
Baseline: `5c5813cd2e17c32024960f923f08b557d062cc5b`.
This amends Task4B/Task3 seed qualification and Task4C composition in [finite material bootstrap correction](2026-11-01-finite-material-bootstrap-correction.md). No credential change, provider call, publication, trial, role expansion or Task5 launcher change is authorized.

## Problem and trust boundary

Native `createPrivateQaArmHttpAdapters` in `lib/mcp-qa-cloud-closed-http.mjs` selects only canary/operator module pins. It reads QA deployment pointers, namespaces and exposure, but never QA module bytes. Its `qaCodeProvenanceVerified:false` is intentional; `lib/mcp-qa-closed-observation-v2.mjs` preserves that distinction. Historical native success therefore does not qualify direct QA content access.

Use the already source-qualified GHA `seed-material` step to validate actual QA live and selected compatible closed bytes/configuration against the finite package. Retain its bounded technical receipt in the existing immutable seed. Native qualification independently authenticates that step/source/artifact lineage, matches actual native version and fresh deployment pointer, and names the resulting evidence `qaPublicationBridgeVerified`. Keep direct `qaCodeProvenanceVerified:false`; no bare version equality, self-reported boolean or ETag-as-SHA shortcut.

Root's dated administrative observation at 2026-11-01T18:46:23Z found candidate account token `9aa97ad1fc9afe3021cf69ea497d5190`, named “AFW closure reader temporal20261028”, active, not-before 2026-10-28T03:00:00Z, expiring 2026-11-03T02:59:00Z. Observed policy describes canary/operator ContentRead and account MetadataRead/ContainersRead, without QA ContentRead. This is CANDIDATE metadata only: no match to the actual native `AFW_MCP_CLOSURE_READ_TOKEN` secret was established. It proves neither effective endpoint denial nor native identity. GHA account token `9db7901af95faf07e6f7ef378045328e` has separate self-verification evidence and uses `AFW_QA_CLOSED_TOKEN`; it is not a native alias. No key copying or rotation is requested. Dated policy metadata plus fresh correct-kind self-verification and fixed successful operations remain the explicit trust assumption; full fresh policy equivalence is not claimed.

## Fixed closed-target locator

The existing immutable source locator is `QA_CLOUD_CLOSED_PINS.qaClosed` in `lib/mcp-qa-cloud-closed-pins.mjs`:

- Worker `agent-friendly-web-independent-closure-qa`; version `c570b60b-95dc-48e1-89f3-9c4651691dbc`.
- Actual main module `closed-rollback.mjs`, 395915 bytes, SHA256 `4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f`.
- Configuration hash `a8c8895f8375f4d09f01960e88bec8c3cac0a89f999e500f74fccf01733f7838`, 31 bindings and 14 closed flags.

This source constant selects the target; never newest/list-first, caller input or a failed-current fallback. It is historical provenance, not an assertion of present finite compatibility.

`buildPrivateQaClosedContext` builds new candidate/rollback bytes but declares `remotePublished:false`; it supplies no deployed rollback-version locator. `compiledQaArtifactContext`, `buildPrivateQaNamedContext` and `scripts/mcp-confirmation-frozen-artifact.json` concern the historical CANARY artifact2607/315cc, not this QA baseline. Do not substitute them.

`QA_CLOUD_CLOSED_PINS.qaClosed` contains NO original compiled sourceRevision/sourceTree. Version/name/bytes/hash/configuration pins do not establish that tuple; copying historical bytes into an archive built at M never relabels their provenance as M. The existing closed builder describes its own new output, and the named/frozen helpers concern the canary: none supplies the missing historical QA tuple. Task4C must recover qualified original provenance OR obtain review of a typed historical-content-pin manifest variant, or produce a newly qualified closed artifact with a separately approved locator, before finite package production. No source SHA/tree or future manifest fields are invented here; this does not block Task4B structural resolver work or amend its active schema beyond the agreed filename.

Task4C must additionally prove that the selected QA target preserves actual classes, namespaces, custody and durable-history compatibility, with operative entrypoints closed. If C570 cannot satisfy that proof, stop before seeding; another target needs its own source-approved locator/publication evidence. No compatible replacement or qualifying archive is asserted here.

**Necessary structural correction:** current `lib/mcp-qa-finite-seed.mjs` requires every module name and archive member to be `index.mjs`. Literal C570 reuse must retain its actual `closed-rollback.mjs` name. Root explicitly selects qaClosed.module.name=`closed-rollback.mjs` and the archive member `qaClosed/closed-rollback.mjs`; the other four roles remain `index.mjs`. Exactly one qaClosed member, six total archive files, no alternatives, aliases or duplicate names. Another target/name requires a separately reviewed source contract. Other roles keep `index.mjs`, existing caps/exports grammar and historical source identities. This explicit codec/archive amendment is not already implemented.

## Exact public seed extension

Add REQUIRED `qaPublication` to the current exact seed keyset. Keep existing purpose/domain/ref, canonicalization, seedHash algorithm and size/depth/node ceilings; seedHash now covers this additional field. The unmounted grammar changes deliberately: old seeds lacking it fail qualification, and existing refs are never rewritten or upgraded.

`qaPublication` has EXACT keys:

```text
purpose: "afw.finite-qa-publication.v1"
accountId: "85d0d5dadac3341a564f22ce885e9eec"
workerName: "agent-friendly-web-independent-closure-qa"
qaLive: {versionId, deploymentId, module,
         configurationHash, profileHash, bindingsHash}
qaClosed: {versionId, module,
           configurationHash, profileHash, bindingsHash}
observedAt: integer UTC milliseconds
```

Version/deployment IDs are canonical lowercase UUIDs; live/closed version IDs differ. Hashes are64 lowercase hex. Each `module` is the EXACT corresponding manifest module descriptor `{name,sha256,bytes,exports}`, including actual main-module basename, bounded byte count and sorted unique exports. The three role hashes must equal their same-role manifest values. Role-specific source/tree provenance remains in the already bound manifest; no duplicate source selector is added. Closed version equals the fixed source-approved locator, not an arbitrary version sharing a hash. No closed deployment ID is invented: it is an immutable target, not necessarily active.

`observedAt` is the parsed Date of the final fresh primary QA live-deployment response. BEFORE issuance, the issuer verifies the actual primary seed step's started_at, requires started_at<=observedAt, checks the unadjusted current clock/CF Date (maximum5000ms skew), original T0<=observedAt<N1 and the unchanged admission margin. completed_at does not yet exist: it is neither required nor estimated at this phase. Only LATER native public-primary qualification requires that exact step completed successfully and started_at<=observedAt<=completed_at. Until those later checks pass, qaPublicationBridgeVerified remains false/unavailable. Failure blocks without compensation or a fabricated final timestamp. The stored observation stays historical and is never refreshed on readback.

The field contains no private plan/control hashes, selectors, grant, consent, callback, credential, raw policy or customer data. It is evidence bound to qualified source execution, not standalone authority.

## Actual issuer and native readback

Within the existing once-launched GHA seed process, after exact finite archive qualification and custody verification:

1. GET the fixed QA deployments endpoint; require exactly one100% active version/deployment. This is only the live candidate selector. Fetch `/accounts/<fixed>/workers/workers/<fixed-QA>/versions/<live>?include=modules` and the same endpoint for the source-fixed closed target.
2. Decode and hash actual module bytes; compare names, hashes, sizes, exports, exact role configuration/profile/binding semantics and all compatibility evidence with the qualified finite manifest. Secret bindings are names/types only. Never derive expected hashes from the very response being accepted. Neither successful HTTP nor a digest-shaped ETag establishes bytes.
3. Re-read the fixed live deployment pointer after qualification; require unchanged exact IDs/100%. Bind its primary Date as observedAt. Before mutation, verify the exact currently running seed step's primary started_at, issuer clock/CF Date, original T0/N1 and admission margin as specified above. Do not require or synthesize this still-running step's completed_at.
4. Consume the existing original-process seed capability before the first POST. Follow the existing one annotated-tag/one atomic-ref sequence. Ref201 ACK plus independent exact ref/tag/content readback is mandatory before seed-material succeeds. Existing/conflicting refs, lost ACK, late work or reconstruction permit GET-only reconciliation; never replace/refund/reissue.

These GETs use existing custody, fixed origins/paths, bounded bodies, no redirects/retries, child5s limits and the original seed admission window including180000ms remaining margin. Queue/qualification/readback consume original T0-derived ends. No new lifetime begins at publication.

Native hydration is the LATER qualification phase: it uses the existing exact seed ref/tag, original comment/main/run/attempt/job/source/build-artifact lineage and the primary completed-success seed-material step, then independently checks started_at<=observedAt<=completed_at. An in-progress step, even with a visible exact seed, leaves qaPublicationBridgeVerified false/unavailable. The reviewed workflow must actually enforce the preceding checks; a tag containing matching hashes is insufficient. Within the existing5s hydration lease, native reads fresh QA deployment metadata and requires seed.qaLive version/deployment100%, actual `AFW_QA_VERSION.id`, fixed actor/binding/profile coherence and source identity to agree before and after awaited primary qualification. Immutable seed identity may be cached; readiness and deployment observations cannot. Any changed pointer/version/source/receipt blocks. Native direct canary/operator byte qualification remains required. After restoration, phase-specific existing checks select qaClosed; this amendment grants no extra deployment effect.

Maintain the existing native request/body budgets; adding the bridge does not authorize expanding them silently. If the concrete hydration cannot complete within them, fail unavailable and return the exact budget conflict for review.

## Acceptance and remaining gate

Required negatives: missing/extra qaPublication fields; foreign account/Worker; wrong live pointer or closed locator; module/profile/bindings mismatch; wrong actual basename; edited/ref-conflicting seed; successful step without qualified source/archive; stale/late timestamps; changed native version or pointer across awaits; lost tag/ref ACK/restart; C570 incompatible classes/history. Positive fixtures must exercise actual GHA-byte verification and native metadata bridge while direct QA-code verification staysfalse. No fixture proves current custody or deployed compatibility.

Concrete remaining gates: C570's original compiled sourceRevision/sourceTree are not established by its immutable locator/hash, and its compatibility with the actual finite candidate's classes/namespaces/history is unproven. Resolve the provenance/package choice described above and independently qualify target compatibility before producing the finite package. All runtime promotion, actual occurrence, guard liveness and PC-off acceptance remain separate. operationalReadiness=false.

## Builder review and root ruling — 2026-11-01

The fresh bridge builder identified one blocking timestamp cycle: the issuer cannot validate completion of its own seed-material step before issuing the seed. Root accepted the two-phase rule above: issuer checks actual primary START and original clocks/margin before POST; later native qualification requires primary completed/success and the inclusive observation interval. No completion estimate or fake final timestamp. The separate historical QA source-tuple and compatibility/package gates are explicit; no historical byte relabeling or active Task4B schema expansion is authorized by this documentation correction. No other builder blocking question was reported in this pass.
