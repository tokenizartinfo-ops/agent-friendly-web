# Task4B Task1 — strict finite seed codec and actual nominal identity

SOURCE ONLY. Execute only this bounded task after root dispatch; no subagents. Read pinned repository AGENTS first, then this brief and the selected sections of [bootstrap correction](../specs/2026-11-01-finite-material-bootstrap-correction.md): Exact seed record and canonical bytes; Package and exact locator (structural grammar); Nominal identity and phase inventory correction; Accepted builder check; Root implementation sequencing ruling. Do not read whole history or require the whole plan. Task4A already accepted; do not repeat its review.

## Result and scope
Implement pure strict seed/manifest structural codec; remove fictitious workflows.nominalRunId and inequality against finalizer.runId from Task1 and external-plan validators/projections. Actual nominal is native NamedConfirmation. Exact finalizer run/attempt/job validation remains. Preserve original finite event/wrapper interfaces and clocks.

DO NOT implement arm-absence inventory, create evidence brands/proof minters/journal fields, or add positive absent-nominal fixtures. Existing lib/mcp-fixed-terminal-workflows.mjs stays unchanged and fail-closed for absent nominal. Actual never-issued child-create SEND producer/inventory co-design belongs4C/Task5. Task1 nominal permission claim is not that SEND journal. Add NEGATIVE regression keeping absence blocked.

## Files and interfaces
Create lib/mcp-qa-finite-seed.mjs:
- encodeFiniteMaterialSeed(seed) -> canonical envelope string.
- decodeFiniteMaterialSeed(text) -> validated immutable {seed,seedHash}.
- validateFinitePackageManifest(value) -> immutable structural manifest.

No I/O, credentials, runtime authority or generic caller schemas.
Modify lib/mcp-qa-finite-trial-control.mjs, lib/mcp-qa-finite-external-contract.mjs and affected canonical projections/fixtures ONLY for removal of nominalRunId/inequality. Search bounded references before edits; preserve other finalizer/native rules.
Create test/mcp-qa-finite-seed.test.mjs and test/mcp-qa-finite-phase-inventory.test.mjs; update affected existing finite tests.
Report: docs/superpowers/reports/2026-11-01-finite-material-task1.md; append existing progress ledger.

## Exact structural contract
Envelope EXACT keys purpose,seed,seedHash; purpose afw.finite-material-seed-envelope.v1.
seed EXACT keys purpose,repository,repositoryId,intentId,sourceRevision,commandId,finalizer,build,manifest:
- purpose afw.finite-material-seed.v1; repository tokenizartinfo-ops/agent-friendly-web; repositoryId1347578006.
- intentId64 lowercase hex; sourceRevision40 lowercase hex; commandId positive decimal string.
- finalizer EXACT runId,attempt,jobId,workflowPath,seedStep: positive safe-integer IDs, attempt1, path .github/workflows/afw-finite-finalizer.yml, step seed-material.
- build EXACT workflowPath,runId,attempt,artifactId,artifactName,artifactDigest,manifestHash: fixed .github/workflows/afw-finite-native-package.yml, positive safe-integer IDs, attempt1; artifactName afw-finite-native-package-<sourceRevision>; digest sha256:<64 lowercase hex>; manifestHash64hex.
- manifest EXACT purpose,sourceRevision,sourceTree,sourceCheck,buildWorkflowHash,modules,compatibility.
- manifest purpose afw.finite-native-package.v1; sourceRevision equals seed revision; sourceTree40hex; sourceCheck git-inputs-and-configuration-before-after-v1; buildWorkflowHash64hex.
- modules EXACT qaLive,qaClosed,canaryLive,canaryClosed,operatorClosed. Each descriptor EXACT sourceRevision,sourceTree,module,configurationHash,profileHash,bindingsHash. Source revision/tree40hex; three hashes64hex. Historical descriptor provenance need not equal current seed M; do not relabel it.
- module EXACT name,sha256,bytes,exports: name index.mjs, sha25664hex, bytes positive safe integer<=3145728; exports at most128 sorted unique ASCII identifiers matching ^[A-Za-z_$][A-Za-z0-9_$]{0,127}$.
- compatibility EXACT qaClassesPreserved,qaNamespacesPreserved,canaryClassesPreserved,canaryNamespacesPreserved,closedEntrypointsDenied,legacyContainmentQualified; each true structurally. This is NOT proof of semantics.

Canonical UTF-8 compact JSON, recursively ASCII-sorted plain-object keys; preserve array order, no string/date normalization/newline. Reject duplicate JSON keys, unknown fields, accessors, prototype keys, nonfinite/unsafe numbers and invalid types. Maximum32768 UTF-8 envelope bytes,24576 manifest bytes, depth12,2048 nodes. No planHash/controlHash/private selectors/policy/grant/token/callback fields.
seedHash=SHA256(UTF8('afw.finite-material-seed.v1\n') || canonical(seed)).
manifestHash=SHA256(UTF8('afw.finite-native-manifest.v1\n') || canonical(manifest)).
These are NEW domains; existing intentHash/planHash/controlHash algorithms unchanged. Decoder validates exact canonical encoding and both digests.
Archive structural contract for laterTask2: exactly SIX files, manifest.json and five fixed role/index.mjs modules. Task1 implements no ZIP code.

Codec acceptance proves syntax/hashes only. Actual exports/class/configuration/profile semantics and independently committed hashes remain4C; fixture compatibility=true is never semantic profile qualification.

## Hosted TDD
1. Write failures/roundtrip for canonical ordering and independently computed digests; duplicate JSON keys, prototype/accessor/unknown fields; wrong fixed values; missing/extra role; module basename, bytes0/3145729/unsafe/noninteger; export129/duplicate/unsorted/nonASCII/invalid identifiers; malformed digest; envelope32769 bytes; private fields. Verify no input mutation.
2. Write identity tests removing nominalRunId while preserving exact finalizer identity. Regression absent nominal at arm AND restore remains blocked using unchanged inventory. No new positive absence authority.
3. Hosted RED:
node --test test/mcp-qa-finite-seed.test.mjs test/mcp-qa-finite-phase-inventory.test.mjs test/mcp-qa-finite-trial-control.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs test/mcp-finite-nominal-control.test.mjs
Record intended failures, then implement minimal codec/identity correction.
4. Repeat exact command GREEN; scoped ESLint for changed JS; include other directly affected existing finite fixtures if bounded search shows dependency. Do not rerun full suite/4A without new reason.
5. Commit source/tests/report; record BASE/code/doc HEAD, exact Actions run/jobs/commands/counts, RED/GREEN, boundaries and remaining4C/5. Return to root for fresh scoped review; no self-review subagent.

## Permanent constraints
Cloud GitHub/Actions ONLY, owner-approved isolated branch lease/CAS; no local code/deps/build, runtime/provider/private probes, deploy/live commands, OAuth/DDL, credentials/role/policy changes, Max or real occurrence. Temporary no-secret hosted qualifier excluded from integration. Original T0/N1/C0/C1/R1 and180000ms preparation margin remain; no reset/replay/refund/history reinterpretation. Seed issuance/account custody belonglaterTask3: dated static policy + explicit unchanged-policy assumption, no scopeVerified=true; process-private capability within trusted ONCE launcher, PID coherence only, whole-launcher sameattempt reexecution excluded not prevented. Do not implement those transports inTask1.
operationalReadiness=false; finite package/profile/Named binding/full producer remain unavailable until separately qualified. No actual journal or claim is spent.
