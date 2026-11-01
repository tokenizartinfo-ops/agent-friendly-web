# Finite profile and native package implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Root preserves the existing dispatch method: one scoped implementer, fresh task review, then the next task. Do not spawn subagents from a task brief.

**Goal:** Implement source-qualified public profiles, literal historical provenance and actual finite packaging, then connect private native material and the original nominal route.

**Architecture:** Public static commitments and private actual fingerprints remain separate. The fixed B3 source-authority exports are the integration boundary; compiled source, actual native bindings and qualified primary observations supply authority. Compiler staging cannot certify missing factories or a full business route.

**Tech Stack:** Existing Node >=22.18.0, ESM, esbuild, Wrangler, Miniflare/workerd, SQLite DO/D1 and GitHub Actions; existing lockfile/dependencies.

**Spec:** [accepted package design](../specs/2026-11-01-finite-profile-package-design.md), [QA bridge](../specs/2026-11-01-finite-qa-code-provenance-bridge.md), [native launcher](../specs/2026-11-01-finite-native-launch-adoption-design.md). Concrete B3 interface baseline: eaefd5aabf5ebf3c08da29c2ad6d1eb699af39f8. Design approval is SOURCE ONLY.

## Global constraints

- GitHub/Actions only; no local code/deps/build, runtime/probe, private CF read, secret-stage dispatch, credential creation/copy, permissions, deployment, live comment, DDL or occurrence by this plan.
- Keep default profiles closed; exact classes/namespaces/resources, actual QA_VERSION and AFW_FINITE_TRIAL_VERSION bindings, all 14 QA false/four release true as the spec pins. No forged env, caller pins, registration escape or success witness.
- Keep original Known four arguments/18 stages/70s and child 5s/20s, outer T0/N1/C0/C1/R1, parent cancellation, retained uncertainty and raw legacy history. Native5 only adds its reviewed launcher timings/journal.
- Public artifacts contain code/templates and allowed technical metadata only. Six private canary slots are source-allowlisted by role/type/purpose; unknown fields fail. Raw policies/consent/customer/callback/key values never enter GHA/artifacts.
- Seed 32KiB, manifest 24KiB, module 3MiB, archive 64MiB/expanded 128MiB; native original 5s/read limits unchanged. No artifact or custody availability is presumed.
- Build main-push has contents/actions read only and NO CF secret/provider calls. Historical preservation is a separately approved protected fixed-read manual stage, after concrete scope/custody/privacy review; do not implement or dispatch it under this plan.
- operationalReadiness=false; fresh artifact IDs/digests/expiry, main/source, publication, custody and live eligibility must qualify before any separately authorized future comment.

## Review focus

1. Mutated private values preserving public projection must still fail private raw-policy/full-hash gates (4C1/2).
2. Historical module copied into M must never acquire fictitious original build provenance (4C1).
3. Native binding substitution after an await must fail before effects (4C2).
4. Missing mounts/expired historical artifact must not produce a successful complete package (4C1/3).
5. Pending late create/D1/Container writers must prevent both restores despite local timeout (Native5/4C3).

## Order and file ownership

4C1 -> Native5 source primitives -> 4C2 full mounts -> 4C3 composed route/package completion -> root full-suite/review. Native5 follows its separate reviewed design: prepare/SEND/ACK journal, coordinator-bound inventory and launcher orchestration. 4C1 may proceed first. Native5 and 4C2 must agree exact same-object control handoff before integration; never fake prepare/claim ordering to obtain a positive fixture.

4C1 owns profiles, codec/provenance, artifact builder/resolver and B3 publication adapters. 4C2 owns private material/primary/native factories. 4C3 owns actual finite nominal/receiver integration and full package completion. Extracted first brief: ../briefs/2026-11-01-finite-profile-package-task4c1.md. Each task appends ../progress/2026-11-01-finite-native-confirmation-cleanup.md and writes its corresponding task4c1/task4c2/task4c3 report.

## Fixed interface block

At B3, lib/mcp-qa-finite-source-authority.mjs exports four synchronous unavailable functions. Retain names/call sites:
- qualifyFiniteSourcePackage({manifest}) -> deeply immutable five-role expectations; no caller expected pins. Each role has publicStatic rule and privateFull rule selected internally from reviewed templates/receipt mappings.
- qualifyFiniteSourceRoleMetadata({manifest,role,metadata}) -> same-role immutable qualified expectations or throw; publication already calls it after actual byte checks.
- qualifyFiniteNativeSourceContext({ctx,env,intentId,sourceRevision,seed?}) -> undefined on success, otherwise throw; checks actual fixed actor/bindings/compiled source before seed, and same-role seeded commitments when supplied.
- readFiniteNativeCustody() -> frozen source-approved {id,tokenKind:'account',expiresAt}, or throw. Bridge independently verifies the actual stored token at the fixed account endpoint. Candidate identity is not secret-match evidence; no fallback to GHA9db.

Existing B3 calls must remain valid: readFiniteQaPublication({manifest,request,check}); readFiniteQaPublicationBridge({ctx,env,intentId,sourceRevision,fetchImpl,now,signal}); resolvePrivateQaFiniteExternalSource({phase:'seed-material',sourceRevision,githubToken,fetchImpl,now,signal}); readFiniteMaterialSeed({intentId,sourceRevision,fetchImpl,now,signal}). Do not add registration/caller authority arguments. Current publication ignores qualifier return values; update it deliberately to consume role expectations and full versus public hashes.

## Task4C1: typed profiles, provenance and real compiler/packager

**Files:** Create lib/mcp-qa-finite-profile.mjs, scripts/build-finite-native-package.mjs, worker/independent-closure/finite.mjs, worker/mcp-own/finite.mjs, two finite Wrangler configs and .github/workflows/afw-finite-native-package.yml. Modify source-authority, finite-seed/package/seed-primary/publication/publication-bridge/seed-issuer/http, scripts/verify-qa-finite-archive.py and activation-observer. Tests: new test/mcp-qa-finite-profile.test.mjs, test/build-finite-native-package.test.mjs, test/mcp-qa-finite-profile-native.test.mjs plus existing affected suites.

**Interfaces:** projectFinitePublicConfiguration({role,metadata}) -> strict public projection; source qualifier delegates to these internal templates. buildFiniteNativePackage({cwd,sourceRevision}) -> {manifest,files} only after all required inputs/semantics qualify; CLI node scripts/build-finite-native-package.mjs <M> writes output/finite-native-package. Fixed historical-input registry is a future reviewed input, never caller URL/pins.

- [ ] RED: test two valid differing private policies yield identical public projection but different actual activation/restoration fingerprints; unknown slot/accessor/version_metadata extra fails. Test real finite class exports/binding identities/14+4 flags; renamed/dropped version binding and dummy-mounted factories fail.
- [ ] RED: test strict v2 provenance union and all six archive names; qaClosed/closed-rollback.mjs stays literal. Reject invented historic source=M, arbitrary receipt, wrong role/config/bytes/tree, malformed historical-source tuple, stale artifact and unavailable mounts. Run focused commands below; retain failing commit/run.
- [ ] Implement publicStatic EXACT {purpose:'afw.finite-public-static-profile.v1',configurationHash,profileHash,bindingsHash} and role EXACT {provenance,module,publicStatic}. Apply accepted domain-separated public hashes. Preserve actual activationConfigurationHash/restorationConfigurationHash algorithms. Add actual version_metadata grammar to activation-observer, strict provider shape/name/type and unknown/accessor negatives.
- [ ] Implement compiled-source.v1 for new live roles and approved historical-content-pin.v1/historical-source-pin.v1 union for closed roles. Advance manifest/seed/envelope/hash purposes to v2. Update Task2 resolver's cached tree(revision) logic: compiled tuple=M; qualified historical-source tuple uses actual original commit/tree; content-pin uses source-approved receipt blob at M, never invented Git lineage. Replace operator.sourceRevision!=M with literal approved historical provenance.
- [ ] Amend B3 publication: read actual full QA configuration hash from bytes/metadata, compare historical full pin independently, compute publicStatic through source expectations. qaPublication retains FULL configurationHash plus typed publicStatic. Update strict codec/issuer/reader/bridge fixtures together. Preserve finiteSourceFile and qualifyFiniteSeedLineage exact source/build workflow/run/artifact/finalizer checks and original request budgets. In finite-http restore, qualify the closed canary pointer before its closed metadata GET; never request live canary private configuration from GHA.
- [ ] Build actual finite entrypoints/configurations with verifyMcpReleaseSource before/after, actual esbuild exports/metafile and external post-build module hashes. Internal role checks validate actual exports/classes/imports/config/bindings; do not derive expected profile from provider data under test. Native context/custody stay unavailable until 4C2; missing full mounts blocks complete package output. Staging compilation tests may pass with explicit staging results, never an eligible package manifest/artifact.
- [ ] Wire secret-free main push producer and exact artifact afw-finite-native-package-<M>. Preserve six-file layout/limits/digest/actual lineage. No public private baseline data, fallback rebuild or presumed surviving input; unavailable inputs produce no eligible upload. Prove protected manual preparation is outside this workflow.
- [ ] GREEN: affected codec/archive/publication/compiler/native tests, scoped lint and generated-file Wrangler no-bundle dry-run. Commit/report source-staging versus complete-package status separately; fresh review stops writes.

## Task4C2: private plan, raw primary and native factories

**Files:** Create lib/mcp-qa-finite-material.mjs and lib/mcp-qa-finite-primary.mjs; implement remaining source-authority exports; modify trial-control, observer-native, trial-guard, finite entrypoints, release runtime binding resolver, activation observer and own finite cleanup composition. Tests: new test/mcp-qa-finite-material-native.test.mjs plus existing native control/guard/read-RPC/cleanup suites.

**Consumes:** 4C1 expectations; accepted Native5 prepare/SEND/coordinator inventory; actual ctx/env/primary D1 and bridge. **Produces:** createPrivateQaFiniteMaterial({ctx,env,refs}) -> EXACT {controlOptions,readFinalPrimary,custody}. controlOptions stays {storage,nativePin,plan,readPrimary,now,timeoutMs}; readPrimary names admission/finalizer/subscription/process/savedEvent/effect plus optional existing nominal. readFinalPrimary(check) -> EXACT {primary,writers}, backed by actual bound DB first-primary and every scoped writer.

- [ ] RED: raw policy mismatch despite matching public projection; caller plan/raw selectors rejected; real native binding mutation/alias confusion fails; old control INFO cannot be reinterpreted; held writer rejects final-primary. Provider/custody fixture authority explicitly SYNTHETIC.
- [ ] Add PRIVATE privateCanaryConfiguration tuple from accepted design to private plan/material/INFO validation before prepare/controlHash. Cross-check actual activationHash/restorationHash/bindingsHash; external projection exposes only bounded opaque commitments. No raw configuration travels to GHA; public source/canaryContainment hash meanings stay explicit.
- [ ] Assemble private material only from exact intent/control references, seed and actual raw primary. Validate Known policies/consent/owner/program/window without cloning env. Implement source-qualified native actor/version/profile and separate native custody receipt handling; absent actual qualification stays unavailable.
- [ ] Install real compiled material/observer/guard/cleanup factories. Guard factory({ctx,env,head}) returns actual {ctx,env,control,capabilities,now}; capabilities EXACT identity/readPrimary/withdraw/close/seal/proof/canary_restore. Each effect keeps existing execute/reconcile contract. Finite QA release read alias resolves AFW_MCP_CLOSURE_READ_TOKEN directly; ordinary operator retains AFW_RELEASE_READ_TOKEN.
- [ ] Integrate Native5 same-control prepare -> guard.arm -> nominal claim -> prepared receipt; preserve Task2 internal parent assertions. readFinalPrimary uses actual DB plus writer exclusion, not impossible external D1 query.
- [ ] GREEN: native material/control/read-RPC/observer/cleanup/reduction tests and scoped lint; report exact source/pins/alias checks, remaining custody/input gates; fresh review.

## Task4C3: original nominal route, receiver and package completion

**Files:** finite entrypoints and actual Worker/Workflow/DO mounts, existing Known wrapper/runtime adapters and finite receiver control resolver; new test/mcp-finite-full-route-native.test.mjs and affected native suites; complete builder semantic gates.

**Consumes:** reviewed 4C2 factories and Native5 journal/inventory. **Produces:** original provider event to runKnownCancellationReleaseWorkflow({bundle,env,event,step}), no fifth argument; real finite route and six-file package when every dependency qualifies.

- [ ] RED: actual Worker/Workflow/DO/D1 route subscribes -> custody -> Native5 launch -> save/capture -> delivery -> native withdrawal/close -> proof/restore. Assert original event sole {planHash:bundleHash}, exact instance, original timestamp and all18 stages; no synthetic readiness bypass.
- [ ] RED: legacy receiver denies before host/auth/storage/budget/transport; poisoned env getters remain untouched. Test active launcher, SEND-with404, late create ACK, held D1/Container writes, loss of prepare ACK and reconstruction; both restores remain unavailable/admin-pending as required.
- [ ] Implement original-event resolver and finite receiver using intent/control refs and append-only observed facts. Preserve original policies and all legacy uncertainty; no arbitrary plan or synthetic terminal receipt.
- [ ] GREEN: full route plus affected Known/native cleanup suites, actual compiler/module/profile artifacts and scoped lint. Enable complete package success only with qualified full mounts and approved historical bytes; if bytes unavailable, report that gate without fabricating artifact IDs.
- [ ] Root runs composed full suite/build/review after all tasks. Actual artifact locator/expiry and independent source/publication/privacy/custody/consent checks precede any separately scoped promotion/trial.

## Hosted verification and evidence

4C1 commands: node --test test/mcp-qa-finite-profile.test.mjs test/build-finite-native-package.test.mjs test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-seed.test.mjs test/mcp-qa-finite-package.test.mjs test/mcp-qa-finite-seed-http.test.mjs test/mcp-qa-finite-seed-issuer.test.mjs test/mcp-qa-finite-publication-bridge.test.mjs; python3 -m unittest discover -s test -p finite_archive_test.py.

4C2: node --test test/mcp-qa-finite-material-native.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs test/mcp-qa-finite-read-rpc-native.test.mjs test/mcp-qa-finite-observer-native.test.mjs test/mcp-qa-finite-trial-guard.test.mjs test/mcp-own-finite-cleanup-native.test.mjs test/mcp-own-finite-reduction-native.test.mjs.

4C3: node --test test/mcp-finite-full-route-native.test.mjs test/mcp-release-known-cancellation-native.test.mjs test/mcp-own-finite-entrypoints-native.test.mjs test/mcp-qa-finite-finalizer.test.mjs test/mcp-qa-finite-http.test.mjs.

Use npm ci --ignore-scripts --no-audit --no-fund on hosted Node 22, npx eslint with the report's explicit changed-JS list, and generated-file dry-runs: npx wrangler deploy output/finite-native-package/qaLive/index.mjs --config wrangler.independent-closure-qa.finite.jsonc --dry-run --no-bundle --outdir output/finite-dry-qa; npx wrangler deploy output/finite-native-package/canaryLive/index.mjs --config wrangler.mcp-own.finite.jsonc --dry-run --no-bundle --outdir output/finite-dry-canary; assert generated bytes unchanged. No deploy invocation without --dry-run. Temporary finite-task1 qualifier remains branch-only/excluded integration. Reports record exact BASE/code/docHEAD, RED/GREEN commits, commands/run/job/counts, artifact/staging limits, review disposition and remaining gates. No full-suite repetition per small task. Root alone coordinates final full-suite and dispatch; no active implementation is authorized by saving this plan.
