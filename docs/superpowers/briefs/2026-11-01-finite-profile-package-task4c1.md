# Task4C1 — public profiles, typed provenance and actual compiler staging

SOURCE ONLY. Root-dispatched implementer; no subagents. Read this first, then only the Global constraints, Fixed interface block and Task4C1 section of ../plans/2026-11-01-finite-profile-package.md and the applicable accepted ../specs/2026-11-01-finite-profile-package-design.md. Do not read the whole preceding history or other task bodies. Preserve root's task-by-task SDD/fresh-review method.

## Baseline and authorized scope

Concrete B3 interfaces inspected at eaefd5aabf5ebf3c08da29c2ad6d1eb699af39f8. Root assigns the execution branch/BASE after current reviews; do not overwrite an active writer or assume this design branch is the product branch. Read its pinned AGENTS and verify exact tree first. All code/deps/tests/builds run on GitHub/Actions, not locally.

Implement public static profile qualification, explicit historical provenance codec, B3 QA-publication amendments and the REAL source compiler/packager. Default profiles stay closed. Full native material/factory integration is 4C2 after Native5 primitives; complete nominal/receiver route is 4C3. Positive compiler staging is not a complete finite package. Missing mounts, historical bytes or qualifications MUST block complete-package output/upload.

No provider/private CF read, credential value/copy/new custody, role/scope, protected preservation-stage dispatch, deployment, DDL, live comment, OAuth, occurrence or Max. Design acceptance does not authorize privacy/preservation/runtime execution.

## Files and fixed B3 calls

Create lib/mcp-qa-finite-profile.mjs, scripts/build-finite-native-package.mjs, worker/independent-closure/finite.mjs, worker/mcp-own/finite.mjs, wrangler.independent-closure-qa.finite.jsonc, wrangler.mcp-own.finite.jsonc, .github/workflows/afw-finite-native-package.yml and the three profile/builder/native tests named below.

Modify lib/mcp-qa-finite-source-authority.mjs, mcp-qa-finite-seed.mjs, mcp-qa-finite-package.mjs, mcp-qa-finite-seed-primary.mjs, mcp-qa-finite-publication.mjs, mcp-qa-finite-publication-bridge.mjs, mcp-qa-finite-seed-issuer.mjs, mcp-qa-finite-http.mjs and affected codec/transport fixtures; scripts/verify-qa-finite-archive.py; lib/mcp-activation-observer.mjs. Do not silently broaden scope to4C2.

Keep source-authority exports:
- qualifyFiniteSourcePackage({manifest}) -> immutable exact five-role expectations containing internal publicStatic/privateFull rules.
- qualifyFiniteSourceRoleMetadata({manifest,role,metadata}) -> same-role qualified expectations or throw.
- qualifyFiniteNativeSourceContext({ctx,env,intentId,sourceRevision,seed?}) and readFiniteNativeCustody() remain unavailable until 4C2 supplies actual source/native qualification. No registration/caller pins/success callback escape.

Publication already calls the first two synchronously after actual modules; bridge calls native context before/after seed and readFiniteNativeCustody() without args. Preserve these signatures. Do not replace imports with a test callback in production. Actual byte hashes and build/source lineage are independently checked; expected static profile comes from approved templates, never metadata being accepted.

## Required contracts

projectFinitePublicConfiguration({role,metadata}) validates exact source fields first. Canary-only typed private slots: AFW_DOSSIER_EVENTS_POLICY, AFW_DOSSIER_SUCCESSOR_POLICY, AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY, AFW_DOSSIER_RETIREMENT_POLICY, AFW_OAUTH_PILOT_PROJECT_ID, AFW_OAUTH_PILOT_CLIENT_ID. Exact presence/type/purpose is reviewed source policy. Unknown additions/accessors fail; no generic stripping. QA has no plaintext private slots. Existing raw policy gates and actual full fingerprints stay intact.

Manifest role EXACT {provenance,module,publicStatic}; publicStatic EXACT {purpose:'afw.finite-public-static-profile.v1',configurationHash,profileHash,bindingsHash}; exact domains/union are in the accepted spec. New live roles require actual M/tree. Historical content pins preserve actual names/version/bytes/config and source-approved receipt blob; they are NOT original compilation attestations. qaClosed remains closed-rollback.mjs. Original C570 Git SHA/tree remains unverified.

Advance strict manifest/seed/envelope/hash purposes to v2 together. Task2 cached tree(revision) reads compiled M or genuinely attested historical tuple; historical-content variant checks exact receipt blob at M instead of fabricating an original commit. Operator must match literal historical pin, replacing its old source!=M syntax predicate explicitly. Update archive validator/fixtures and all seed consumers; no actual stored seed migration.

B3 readFiniteQaPublication must preserve FULL actual configurationHash while adding publicStatic; don't compare projected manifest hashes to full CF hashes. Native QA bridge checks same-role publicStatic through the source context after qualified seed; direct QA code provenance stays false and scopeVerified stays false. Preserve finiteSourceFile/qualifyFiniteSeedLineage, real source/build/artifact/step validation, original budgets and issuer-start versus later-completed-step ordering.

Document4C2's PRIVATE privateCanaryConfiguration tuple/INFO amendment, but do not fabricate private material here. Existing private deployment configurationHash stays FULL; public source/canaryContainment bindingsHash semantics are explicit. GHA receives no raw canary configuration. Finalizer selects closed canary only; qualify its closed pointer before reading its closed metadata.

Activation snapshot needs ACTUAL version_metadata name/type/provider shape for AFW_FINITE_TRIAL_VERSION. Add strict grammar/unknown-extra/accessor tests, never discard binding or forge alias. Exact source profile includes actual classes/resources/aliases,14 QA false/four release true, namespace preservation, private release-read alias distinction and legacy receiver denial; use the spec's fixed values. No env-spread normalization.

## TDD and real package gates

1. Write named failing cases: private_projection_preserves_full_fingerprint; unknown_private_slot_denied; actual_version_metadata_required; historical_content_never_claims_M; missing_factory_blocks_package; stale_historical_artifact_blocks_upload. Assert equal public hash with differing valid raw policies, unequal full hashes, and unchanged Known raw rejection.
2. Run meaningful hosted RED before implementation; failure must expose missing behavior, not fixture syntax.
3. Implement source rules/codec/publication and actual builder. buildFiniteNativePackage({cwd,sourceRevision}) -> {manifest,files} only after all mandatory inputs and mounts qualify; CLI node scripts/build-finite-native-package.mjs <M>. Use actual source checks before/after, esbuild/metafile/class/native tests and external postcompile hashes. Source registration slots or exports alone cannot prove mounted semantics.
4. Main-push producer is secret-free/read-only; exact six files and artifact afw-finite-native-package-<M>. Missing Native5/4C2/4C3 mounts or historical inputs yields no eligible artifact. Tests may qualify compiler staging separately with actual classes, clearly labeled incomplete.
5. Historical input lookup is exact reviewed run/head/attempt/artifact ID/digest/receipt, never latest/arbitraryURL. Existing bytes are NOT known available. The future protected fixed-read preparation and its privacy/identity gate need separate root scope; do not add a secret-using push trigger or upload private raw policies/modules. No artifact ID fabricated.
6. GREEN plus proportional affected tests/scoped lint and actual generated-byte Wrangler dry-run; stop writes for root fresh review.

Commands on hosted Node 22 after npm ci --ignore-scripts --no-audit --no-fund:
- node --test test/mcp-qa-finite-profile.test.mjs test/build-finite-native-package.test.mjs test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-seed.test.mjs test/mcp-qa-finite-package.test.mjs test/mcp-qa-finite-seed-http.test.mjs test/mcp-qa-finite-seed-issuer.test.mjs test/mcp-qa-finite-publication-bridge.test.mjs
- python3 -m unittest discover -s test -p finite_archive_test.py
- node --test test/mcp-qa-finite-http.test.mjs test/mcp-qa-finite-cf-http.test.mjs test/mcp-qa-finite-observer-native.test.mjs test/mcp-qa-finite-read-rpc-native.test.mjs
- npx eslint <exact changed JS paths>
- npx wrangler deploy output/finite-native-package/qaLive/index.mjs --config wrangler.independent-closure-qa.finite.jsonc --dry-run --no-bundle --outdir output/finite-dry-qa
- npx wrangler deploy output/finite-native-package/canaryLive/index.mjs --config wrangler.mcp-own.finite.jsonc --dry-run --no-bundle --outdir output/finite-dry-canary

Assert generated bytes unchanged. Staging uses the same commands against explicit isolated staging paths and cannot upload an eligible package; no provider effects.

Retain existing size/request/time bounds. Temporary finite-task1 qualifier is branch-only/excluded integration; no full-suite reruns unless root requests the composed gate.

## Required report and stop

Write docs/superpowers/reports/2026-11-01-finite-profile-package-task4c1.md; append docs/superpowers/progress/2026-11-01-finite-native-confirmation-cleanup.md. Record exact BASE/code/docHEAD, paths, RED/GREEN commands/run/job/counts, module/profile/build evidence, staging versus package limits and unclosed source/privacy/custody/input gates. Verify cloud CAS/readback; return DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED and stop writes for fresh review.

Preserve original 4args/18stages/70s/5s/20s and outer clocks/history. Source classes/profile/compiler readiness does not prove full finite package, live capability, guard liveness or PC-off. operationalReadiness=false.


## Root execution addendum
BASE is assigned by the following root dispatch; previous B3 is now accepted througha776e115 (fixcodef2b35826,72coveringPASS/scopedreviewclean). Preserve the strict job-start string/safe-integer check.
This task is source compiler/profile staging only. Sourceauthoritydefaultfullpackagequalification stays unavailable until actualNative5/4C2/4C3 mounts and privacy-qualifiedhistoricalinputs exist. No artifact claims from function presence, compatibility=true fixtures or an unattested readiness flag. Positive staging uses actual compiled classes and source-owned templates; no production caller/pins/true-witness/registration bypass. No schema/DDL/remote preservation or metadata probe. Prior data/journals/history are never reinterpreted duringv2codec change.
