# Finite Material Bootstrap Correction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Root owns task/review dispatch; do not spawn agents independently.

**Goal:** Complete independently testable Task4B structural seed, identity, package-resolution and adoption source behavior without claiming Task4C runtime integration.

**Architecture:** A strict public technical seed binds the original finalizer job to one exact finite package. GHA creates it once; the native reader validates exact public primaries; operator creation precedes GET-only adoption. Full material/profile/package production remains4C; delayed launcher remainsTask5.

**Tech Stack:** Node22 ESM, existing GitHub Actions/Cloudflare fixtures, Python3 standard-library zipfile for bounded archive inspection; no new dependencies.

**Spec:** [finite-material-bootstrap-correction](../specs/2026-11-01-finite-material-bootstrap-correction.md), including accepted builder rulings.

## Global Constraints

- Cloud GitHub/Actions only; no local source/dependencies/build, live command, provider/private probes, publish, new custody/scope or runtime mutation.
- Original T0/N1/C0/C1/R1 and180000ms preparation margin unchanged; all awaits count. operationalReadiness=false.
- Seed ref domain unchanged; canonical technical metadata only, no plan/control hashes/private selectors/policy/secrets.
- DATED STATIC policy receipt + fresh ACCOUNT self-verification/fixed GETs; unchanged policy is trusted-operator assumption, never scopeVerified=true.
- Original once-launcher process capability only; PID coherence is not identity; same-attempt WHOLE launcher reexecution EXCLUDED, not prevented; no retry/supervisor/refill.
- Actual finite package creation, mounted source producer/full profile/full route are4C. Named binding installation and timer/child-create SEND producer remain4C/Task5. Do not repeat accepted4A review.
- Each task records hosted RED/GREEN/source/run/counts, scoped lint and limitations; commit before root's fresh task review. Temporary no-secret qualifier is excluded from integration.

## Review Focus

1. Duplicate JSON keys/prototype names must fail before hashing (Task1).
2. Absent nominal stays blocked in4B; no synthetic future SEND proof may unlock it (Task1).
3. ZIP names, decompression bounds and CRC mismatch must fail in the actual parser (Task2).
4. Seed ref404 after lost POST cannot refill original authority (Task3).
5. Dated policy must not become fresh equivalent scope, even after verify200 (Task3).

## File responsibilities and interfaces

Task1 creates lib/mcp-qa-finite-seed.mjs: encodeFiniteMaterialSeed(seed) -> canonical envelope string; decodeFiniteMaterialSeed(text) -> validated {seed,seedHash}; validateFinitePackageManifest(value) -> immutable manifest. No I/O or authority. Modify existing trial-control/external-contract canonical projections ONLY; retain fixed-terminal inventory behavior. No historical migration or invented future SEND proof type.

Task2 creates lib/mcp-qa-finite-package.mjs: resolveFiniteNativePackage({sourceRevision,githubToken,fetchImpl=fetch,now=Date.now,signal}) -> {build,manifest}; no arbitrary repository/workflow selector. scripts/verify-qa-finite-archive.py inspects archive bytes and returns only manifest and file digests/sizes; Node wrapper owns bounded subprocess/timeout/output and digest comparison. This is real resolution/parsing, not an injected success callback.

Task3 creates lib/mcp-qa-finite-seed-http.mjs: readFiniteMaterialSeed({intentId,sourceRevision,fetchImpl=fetch,now=Date.now,signal}) -> {seed,seedHash,tagSha,primaryEvidence}; fixed public GET only. Its createFiniteMaterialSeedIssuer({admission,githubToken,fetchImpl,now,signal}) is initialized ONLY from the fixed original seed-material CLI entry and exposes issue({build,manifest,finalizer}) -> newly-ACKed receipt; default/reconstructed clients get reconciliation only. Private capability stays module/process-local; no public mint token.

Modify mcp-qa-finite-source.mjs to call the concrete Task2 resolver for seed-material; return {build,manifest}, not a pretend runtime plan. Later-phase full technical/native material assembly remains4C and unavailable until installed; this does not excuse a stub Task2 resolver. Existing source/material factories receive the exact qualified seed reader dependency at their4C mount. Native qualifier itself is fully implemented/testable in4B without claiming that mount.

## Task1 — strict codec and actual nominal identity

**Files:** create seed module and test/mcp-qa-finite-seed.test.mjs; modify lib/mcp-qa-finite-trial-control.mjs, lib/mcp-qa-finite-external-contract.mjs and their existing finite fixtures; add test/mcp-qa-finite-phase-inventory.test.mjs as a NEGATIVE regression of unchanged inventory.

- [ ] Write codec failures: duplicate keys/prototype/accessor/unknown fields; wrong domain/hash/role/size; raw private fields; envelope32769 bytes denied. Round trip exact canonical seed and independently recomputed digest.
- [ ] Write identity/unchanged-inventory failures: reject nominalRunId; preserve exact finalizer identity; absent nominal stays BLOCKED at arm and restores. No positive absent-nominal fixture and no invented brand/proof constructor/journal fields. Task1 nominal permission claim is not Task5 child-create SEND evidence. Existing full inventory and restore terminal requirements stay unchanged.
- [ ] Hosted RED: node --test test/mcp-qa-finite-seed.test.mjs test/mcp-qa-finite-phase-inventory.test.mjs test/mcp-qa-finite-trial-control.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs test/mcp-finite-nominal-control.test.mjs. Verify intended failures.
- [ ] Implement structural codec and remove fictitious GHA field/inequality from affected projections/fixtures. module.name=index.mjs; each role bytes1..3145728; exports max128 sorted unique ASCII identifiers matching ^[A-Za-z_$][A-Za-z0-9_$]{0,127}$. Fixed role keys and64hex module hashes. Add boundary/invalid-export tests; do not infer semantic profile compatibility. Inventory production code is unchanged; actual absence proof/journal design belongs4C/Task5.
- [ ] Repeat exact command GREEN; scoped lint; commit source/tests/report. No finite head/reset or old-ref reinterpretation.

## Task2 — concrete fixed package resolver and archive validation

**Files:** create package module, archive script, test/mcp-qa-finite-package.test.mjs, test/finite_archive_test.py; modify source module only for concrete package-resolution entry.

- [ ] Write failures for zero/two eligible builds, wrong main/source/path/event/attempt, overflow, expired/duplicate artifact, missing digest, altered manifest/module, historical operator relabeled M, archive traversal/symlink/duplicate names/CRC/bomb/extra file. Use real ZIP bytes through the real Python subprocess; network provider is explicitly synthetic.
- [ ] Hosted RED: node --test test/mcp-qa-finite-package.test.mjs; python -m unittest discover -s test -p 'finite_archive_test.py'. Confirm expected missing implementation/validation failures.
- [ ] Implement fixed push/main/success/attempt1 workflow lookup and exact artifact name, two100-run pages/one100-artifact page, unique-or-fail. Existing GHA token downloads by exactID; redirect target is restricted to GitHub's qualified artifact-download response and credential is never forwarded cross-origin. No caller URL.
- [ ] Enforce archive64MiB/expanded128MiB/64files plus tighter module limits. Require exactly SIX files: manifest.json plus index.mjs under qaLive,qaClosed,canaryLive,canaryClosed,operatorClosed; each module <=3145728 bytes. No extra directory entries/files. ZIP inspection must validate declared/uncompressed actual sizes, CRC and paths before returning metadata. Compare archive provider digest and canonical manifest/file hashes; no archive module execution.
- [ ] Return exact {build,manifest}; unavailable live finite artifact is a factual failure, not a fake fixture fallback. Test source entry uses this concrete resolver. Repeat both commands GREEN, scoped lint/Python compile, commit evidence. Finite build workflow/artifact production belongs4C.

## Task3 — original seed step, adoption and native public qualification

**Files:** create seed-http module and test/mcp-qa-finite-seed-http.test.mjs; modify lib/mcp-qa-finite-http.mjs, lib/mcp-qa-finite-source.mjs, scripts/run-qa-finite-trial-finalizer.mjs, .github/workflows/afw-finite-finalizer.yml; extend existing finite HTTP/CF/observer/native tests.

- [ ] Write seed-material before admit-and-ready tests using actual CLI/workflow contract. Original event/run/job/build are primary-qualified; exact seed step success is required before observer creation/preview. Successful seed contains no private data. Missing seed never starts a fabricated polling observer.
- [ ] Write original-process/unknown-ACK failures: shared consumed capability across clients; lost tag/ref ACK, late201, existing/bare ref, default/reconstructed invocation and404 cannot POST again. Document/test the trusted launcher boundary without claiming to prevent whole-launcher reexecution. Fixed workflow has no retry/supervisor.
- [ ] Write account-custody failures: wrongID/account/expiry/inactive; missing dated receipt; native distinct identity unavailable; verify200 does not yield scopeVerified. No /user/tokens/policy-query/two-group requirement. Fixed mutation denial consumes its claim and remains admin-pending; no credential repair.
- [ ] Write native exact public GET provenance failures: wrongtag/source/comment/body/owner/run/title/job/step, incomplete pagination/rate limit/5s expiry; no Authorization header/native GitHub key/private archive download. Run actual native observer/RPC fixtures with synthetic public transport; wrong seed never reaches material authority.
- [ ] Hosted RED/GREEN command: node --test test/mcp-qa-finite-seed-http.test.mjs test/mcp-qa-finite-http.test.mjs test/mcp-qa-finite-cf-http.test.mjs test/mcp-qa-finite-command.test.mjs test/mcp-qa-finite-observer.test.mjs test/mcp-qa-finite-observer-native.test.mjs test/mcp-qa-finite-read-rpc-native.test.mjs test/mcp-qa-finite-finalizer.test.mjs.
- [ ] Implement actual seed-material CLI phase using Tasks1/2, original consumed issuer and independent ref/tag readback. Split YAML fixed seed-material success from later ready step. GHA admit adopts exact operator-created observer GET-only; no Workflow REST create or creation permission inference. Implement fixed public native seed reader; preserve Task3 restoration once-send fence.
- [ ] GREEN exact command, scoped lint; commit source/tests/report and progress with remaining4C/Task5 gates. Root reviews each task and later combined source. Do not call4B complete from throwing package/source placeholders or mock-only transport; do not call4C complete from4B tests.

## Closure

Self-review against spec: codec/identity belongsTask1, package provenance/real archiveTask2, issuance/adoption/custody/public qualificationTask3. Spec's build production, semantic exports/configuration/profile qualification, actual native factories/runtime pin assembly, arm-absence inventory with concrete SEND journal/source producer, receiver/full route and future launcher are explicitly deferred4C/Task5. All source test authority is synthetic; no operational readiness, current scope equivalence, live package availability or PC-off claim.
