# Whole-branch review packet 11/26 — docs

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 26 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- docs/superpowers/briefs/2026-11-01-finite-material-task1.md: ABSENT -> 24cc0f7a90c09a7f33439a43f237a01fdf9f6672; full diff chars=8154
- docs/superpowers/briefs/2026-11-01-finite-material-task2.md: ABSENT -> 9e1c94f9efa9ceb8aced1c3d7e4098c4c62153ce; full diff chars=7814
- docs/superpowers/briefs/2026-11-01-finite-material-task3.md: ABSENT -> d644f8aec3be65e6881bb4d235b207c26f250015; full diff chars=11068
- docs/superpowers/briefs/2026-11-01-finite-native-cleanup-task3.md: ABSENT -> 07fd51f22925d860cb9f8e3ee8de42bbcec72c3c; full diff chars=19709
- docs/superpowers/briefs/2026-11-01-finite-native-cleanup-task4.md: ABSENT -> 98178ee36a56da7376c0b9c828a9975e88897241; full diff chars=15305
- docs/superpowers/briefs/2026-11-01-finite-native-launch-task1.md: ABSENT -> ef404ae3061a5b7665a752f446779ad594df654e; full diff chars=9265
- docs/superpowers/briefs/2026-11-01-finite-native-launch-task2.md: ABSENT -> 66261e808610687fd20aee0cd4fd04a7d745f677; full diff chars=10462
- docs/superpowers/briefs/2026-11-01-finite-native-launch-task3.md: ABSENT -> 6a884a14a2fcfe460ec2c53c1d3bd971efbe4777; full diff chars=16351
- docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task1.md: ABSENT -> e6decb0c0f10e56db06f09dfe0e387eca9eaadb4; full diff chars=12948
- docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task2.md: ABSENT -> 671da51611e67c2183dd30f04c8fdd518c0e503e; full diff chars=37895
- docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task3.md: ABSENT -> 95ae7926d80ae5a1f593bfa6224089b5637fc65f; full diff chars=33817
- docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task4.md: ABSENT -> 19661e4376ba8a782dbe3e7a3d9bfed4ce88c070; full diff chars=30094
- docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task5-b2.md: ABSENT -> 84099e235ff6f00b2bbe36184bbbdc48604edd72; full diff chars=6611
- docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task5.md: ABSENT -> 1c1be48e6075276660c5b939443c52eff9ce3121; full diff chars=20093
- docs/superpowers/briefs/2026-11-01-finite-profile-package-task4c1.md: ABSENT -> 96b6ac267274fa51d01deae2160db9bd8801ffcd; full diff chars=11998
- docs/superpowers/briefs/2026-11-02-finite-initial-cleanup-owner.md: ABSENT -> 210bc6f649bf2f63ac9e01d4b55befda65c1225e; full diff chars=1921
- docs/superpowers/briefs/2026-11-02-finite-initial-inactive-upload.md: ABSENT -> b473de70fa569928a84bb142f3e30e878eefb9f5; full diff chars=1487
- docs/superpowers/briefs/2026-11-02-finite-initial-preparation-source.md: ABSENT -> bc72ea7a038d9c96c6712e74c6889e6f67896fd3; full diff chars=7344
- docs/superpowers/briefs/2026-11-02-finite-initial-publication.md: ABSENT -> 7dfdcaa4a910184b0f40e60415c5316f1d762ebe; full diff chars=7999
- docs/superpowers/briefs/2026-11-02-finite-pre-t0-qa-provenance.md: ABSENT -> 4fee8aefe88fd91c72b70ff958f12f100443a6ce; full diff chars=9373
- docs/superpowers/briefs/2026-11-04-finite-closed-prearm-policy-conversion-task1.md: ABSENT -> f897f092aec4e036b46d7b7e4bc70de95248f4ae; full diff chars=10365
- docs/superpowers/briefs/2026-11-04-finite-known-profile-c1.md: ABSENT -> 6ea6d9d4b51c61b96c6c38a4544ffa7036d10936; full diff chars=10640
- docs/superpowers/briefs/2026-11-04-finite-known-profile-c2.md: ABSENT -> d0690f5666ad2fa848f5e57783cb6e3fef828083; full diff chars=11523
- docs/superpowers/briefs/2026-11-04-finite-known-profile-c3.md: ABSENT -> 04f5e9ebf6af8ee94f41a409018d62f32416118c; full diff chars=14045
- docs/superpowers/briefs/2026-11-04-finite-owner-phase-context.md: ABSENT -> 8c384bd01e6f6d72ac6a4913de3733352d5d1f87; full diff chars=16462
- docs/superpowers/briefs/2026-11-04-finite-owner-sdk-trust-boundary-d01-preflight.es.md: ABSENT -> c70d074f90ae72fe5fe8f399134a704f5a913907; full diff chars=1886

## docs/superpowers/briefs/2026-11-01-finite-material-task1.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-material-task1.md b/docs/superpowers/briefs/2026-11-01-finite-material-task1.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-material-task1.md
@@ -0,0 +1,57 @@
+# Task4B Task1 — strict finite seed codec and actual nominal identity
+
+SOURCE ONLY. Execute only this bounded task after root dispatch; no subagents. Read pinned repository AGENTS first, then this brief and the selected sections of [bootstrap correction](../specs/2026-11-01-finite-material-bootstrap-correction.md): Exact seed record and canonical bytes; Package and exact locator (structural grammar); Nominal identity and phase inventory correction; Accepted builder check; Root implementation sequencing ruling. Do not read whole history or require the whole plan. Task4A already accepted; do not repeat its review.
+
+## Result and scope
+Implement pure strict seed/manifest structural codec; remove fictitious workflows.nominalRunId and inequality against finalizer.runId from Task1 and external-plan validators/projections. Actual nominal is native NamedConfirmation. Exact finalizer run/attempt/job validation remains. Preserve original finite event/wrapper interfaces and clocks.
+
+DO NOT implement arm-absence inventory, create evidence brands/proof minters/journal fields, or add positive absent-nominal fixtures. Existing lib/mcp-fixed-terminal-workflows.mjs stays unchanged and fail-closed for absent nominal. Actual never-issued child-create SEND producer/inventory co-design belongs4C/Task5. Task1 nominal permission claim is not that SEND journal. Add NEGATIVE regression keeping absence blocked.
+
+## Files and interfaces
+Create lib/mcp-qa-finite-seed.mjs:
+- encodeFiniteMaterialSeed(seed) -> canonical envelope string.
+- decodeFiniteMaterialSeed(text) -> validated immutable {seed,seedHash}.
+- validateFinitePackageManifest(value) -> immutable structural manifest.
+- encodeFinitePackageManifest(value) -> canonical manifest UTF-8 string.
+- hashFinitePackageManifest(value) -> domain-separated lowercase64hex using afw.finite-native-manifest.v1 plus newline.
+
+Root interface clarification (2026-11-01): these two specific pure manifest helpers share the SAME private validation/canonicalizer; Task2 resolver and4C builder must not copy it or fabricate a dummy seed. No generic caller schema, I/O or authority.
+
+No I/O, credentials, runtime authority or generic caller schemas.
+Modify lib/mcp-qa-finite-trial-control.mjs, lib/mcp-qa-finite-external-contract.mjs and affected canonical projections/fixtures ONLY for removal of nominalRunId/inequality. Search bounded references before edits; preserve other finalizer/native rules.
+Create test/mcp-qa-finite-seed.test.mjs and test/mcp-qa-finite-phase-inventory.test.mjs; update affected existing finite tests.
+Report: docs/superpowers/reports/2026-11-01-finite-material-task1.md; append existing progress ledger.
+
+## Exact structural contract
+Envelope EXACT keys purpose,seed,seedHash; purpose afw.finite-material-seed-envelope.v1.
+seed EXACT keys purpose,repository,repositoryId,intentId,sourceRevision,commandId,finalizer,build,manifest:
+- purpose afw.finite-material-seed.v1; repository tokenizartinfo-ops/agent-friendly-web; repositoryId1347578006.
+- intentId64 lowercase hex; sourceRevision40 lowercase hex; commandId positive decimal string.
+- finalizer EXACT runId,attempt,jobId,workflowPath,seedStep: positive safe-integer IDs, attempt1, path .github/workflows/afw-finite-finalizer.yml, step seed-material.
+- build EXACT workflowPath,runId,attempt,artifactId,artifactName,artifactDigest,manifestHash: fixed .github/workflows/afw-finite-native-package.yml, positive safe-integer IDs, attempt1; artifactName afw-finite-native-package-<sourceRevision>; digest sha256:<64 lowercase hex>; manifestHash64hex.
+- manifest EXACT purpose,sourceRevision,sourceTree,sourceCheck,buildWorkflowHash,modules,compatibility.
+- manifest purpose afw.finite-native-package.v1; sourceRevision equals seed revision; sourceTree40hex; sourceCheck git-inputs-and-configuration-before-after-v1; buildWorkflowHash64hex.
+- modules EXACT qaLive,qaClosed,canaryLive,canaryClosed,operatorClosed. Each descriptor EXACT sourceRevision,sourceTree,module,configurationHash,profileHash,bindingsHash. Source revision/tree40hex; three hashes64hex. Historical descriptor provenance need not equal current seed M; do not relabel it.
+- module EXACT name,sha256,bytes,exports: name index.mjs, sha25664hex, bytes positive safe integer<=3145728; exports at most128 sorted unique ASCII identifiers matching ^[A-Za-z_$][A-Za-z0-9_$]{0,127}$.
+- compatibility EXACT qaClassesPreserved,qaNamespacesPreserved,canaryClassesPreserved,canaryNamespacesPreserved,closedEntrypointsDenied,legacyContainmentQualified; each true structurally. This is NOT proof of semantics.
+
+Canonical UTF-8 compact JSON, recursively ASCII-sorted plain-object keys; preserve array order, no string/date normalization/newline. Reject duplicate JSON keys, unknown fields, accessors, prototype keys, nonfinite/unsafe numbers and invalid types. Maximum32768 UTF-8 envelope bytes,24576 manifest bytes, depth12,2048 nodes. No planHash/controlHash/private selectors/policy/grant/token/callback fields.
+seedHash=SHA256(UTF8('afw.finite-material-seed.v1\n') || canonical(seed)).
+manifestHash=SHA256(UTF8('afw.finite-native-manifest.v1\n') || canonical(manifest)).
+These are NEW domains; existing intentHash/planHash/controlHash algorithms unchanged. Decoder validates exact canonical encoding and both digests.
+Archive structural contract for laterTask2: exactly SIX files, manifest.json and five fixed role/index.mjs modules. Task1 implements no ZIP code.
+
+Codec acceptance proves syntax/hashes only. Actual exports/class/configuration/profile semantics and independently committed hashes remain4C; fixture compatibility=true is never semantic profile qualification.
+
+## Hosted TDD
+1. Write failures/roundtrip for canonical ordering and independently computed digests; duplicate JSON keys, prototype/accessor/unknown fields; wrong fixed values; missing/extra role; module basename, bytes0/3145729/unsafe/noninteger; export129/duplicate/unsorted/nonASCII/invalid identifiers; malformed digest; envelope32769 bytes; private fields. Verify no input mutation.
+2. Write identity tests removing nominalRunId while preserving exact finalizer identity. Regression absent nominal at arm AND restore remains blocked using unchanged inventory. No new positive absence authority.
+3. Hosted RED:
+node --test test/mcp-qa-finite-seed.test.mjs test/mcp-qa-finite-phase-inventory.test.mjs test/mcp-qa-finite-trial-control.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs test/mcp-finite-nominal-control.test.mjs
+Record intended failures, then implement minimal codec/identity correction.
+4. Repeat exact command GREEN; scoped ESLint for changed JS; include other directly affected existing finite fixtures if bounded search shows dependency. Do not rerun full suite/4A without new reason.
+5. Commit source/tests/report; record BASE/code/doc HEAD, exact Actions run/jobs/commands/counts, RED/GREEN, boundaries and remaining4C/5. Return to root for fresh scoped review; no self-review subagent.
+
+## Permanent constraints
+Cloud GitHub/Actions ONLY, owner-approved isolated branch lease/CAS; no local code/deps/build, runtime/provider/private probes, deploy/live commands, OAuth/DDL, credentials/role/policy changes, Max or real occurrence. Temporary no-secret hosted qualifier excluded from integration. Original T0/N1/C0/C1/R1 and180000ms preparation margin remain; no reset/replay/refund/history reinterpretation. Seed issuance/account custody belonglaterTask3: dated static policy + explicit unchanged-policy assumption, no scopeVerified=true; process-private capability within trusted ONCE launcher, PID coherence only, whole-launcher sameattempt reexecution excluded not prevented. Do not implement those transports inTask1.
+operationalReadiness=false; finite package/profile/Named binding/full producer remain unavailable until separately qualified. No actual journal or claim is spent.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-01-finite-material-task2.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-material-task2.md b/docs/superpowers/briefs/2026-11-01-finite-material-task2.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-material-task2.md
@@ -0,0 +1,39 @@
+# Task4B Task2 — fixed finite package resolver and bounded archive
+SOURCE ONLY. No subagents. Read this first; requirements are the revised bootstrap correction/Task2 plan at source9304b0b0 and subsequent Task1 exact exports. Do not read full prior history.
+
+## Scope and exact interfaces
+Implement lib/mcp-qa-finite-package.mjs:
+resolveFiniteNativePackage({sourceRevision,githubToken,fetchImpl=fetch,now=Date.now,signal}) -> immutable {build,manifest}.
+Fixed public repository tokenizartinfo-ops/agent-friendly-web, ID1347578006. No caller repository/workflow/URL. Only read operations, existing GHA opaque token transport, never print token or signed URL. Validate exact40-lowerhex sourceRevision and bounded opaque credential, not a provider prefix format. A lookup result is factual source evidence, not runtime authority.
+
+Source-qualified manifest interfaces now provided by lib/mcp-qa-finite-seed.mjs:
+validateFinitePackageManifest, encodeFinitePackageManifest, hashFinitePackageManifest (shared domain afw.finite-native-manifest.v1\\n).
+Reuse those helpers; do not copy canonicalization. The five role modules are qaLive,qaClosed,canaryLive,canaryClosed,operatorClosed, qaClosed closed-rollback.mjs and other four index.mjs, each max3145728 bytes. Role-specific source/tree stays distinct; historical operator is NOT relabeled current M. Structural assertions do not prove profile semantics; actual builder/qualified profile remains4C.
+
+Create scripts/verify-qa-finite-archive.py using Python standard-library zipfile, invoked by bounded Node subprocess. No new dependencies. Fixed archive layout EXACT six files: manifest.json + qaClosed/closed-rollback.mjs and index.mjs under each of the other four roles. Reject absolute/traversal/backslash/NUL/duplicate names, directories/symlinks/nonregular entries, extra files, encrypted/unsupported content, CRC errors, inconsistent or overflowing declared/actual expansion. Read/stream without extraction or module execution. Cap archive64MiB, expanded128MiB,64entries; tighter actual exact-six/module/manifest limits apply. Return only parsed canonical manifest plus hashes/sizes, bounded output; never print module bytes/paths outside fixed layout. Validate duplicate/noncanonical manifest JSON, strict codec semantics, each hash/size and primary digest. Root engineering call: archive transport only in GHA, not Worker.
+
+## Fixed primary lookup
+Workflow .github/workflows/afw-finite-native-package.yml, artifact afw-finite-native-package-<M>.
+Only exact head M/main/event push/completed success/attempt1 from same repository and source-qualified workflow. List at most two100-run pages; require complete pagination/consistent totals/unique entries and EXACTLY ONE eligible run. Validate actual workflow path and committed workflow bytes/hash at M, actual source-tree primary, not caller assertions. Exact run artifact listing <=100 and complete; EXACTLY ONE unexpired exact-name artifact, correct run/repo/head, available sha256:<64hex> provider digest. Missing future workflow/artifact means unavailable, not fallback to closed/named packages; no build/rebuild dispatch.
+Return build exact keys workflowPath,runId,attempt,artifactId,artifactName,artifactDigest,manifestHash as specified by codec; manifest must match M/tree/workflow and file bytes.
+
+Download only the exact selected GitHub artifact API endpoint. Follow only the legitimate provider artifact redirect with HTTPS/source-validated host/path limits; no arbitrary caller URL, no redirect loop, no Authorization forwarded cross-origin, no signed URL in error/log. Use short bounded fetches/subprocess and parent abort; all time counts and any unknown/overflow/rate-limit/timeout fails closed. Use real bounded ZIP parser in tests, synthetic network only.
+
+Modify lib/mcp-qa-finite-source.mjs ONLY to expose concrete package resolution at seed-material phase with explicit existing GitHub transport parameters, returning {build,manifest}. Other full material phases remain unavailable until4C. Do not fake a runtime plan or implement seed issuance/adoption in this task. Concrete package resolver cannot be a placeholder or injected success callback.
+
+## TDD and evidence
+Create test/mcp-qa-finite-package.test.mjs + test/finite_archive_test.py. Meaningful hosted RED then GREEN:
+node --test test/mcp-qa-finite-package.test.mjs
+python -m unittest discover -s test -p 'finite_archive_test.py'
+Tests use REAL ZIP bytes through ACTUAL Python subprocess: zero/two runs, wrong source/event/main/path/attempt, overflow/incomplete/duplicate pages, expired/duplicate artifact, missing/bad digest, wrong manifest/tree/workflow/hash/module, private/extra manifest fields, historical role relabeling versus qualified source evidence, traversal/symlink/duplicate/CRC/bomb/extra archive file, native abort/timeout, credential non-forwarding and sanitized errors.
+Also test the source constructor actually invokes this resolver, with no fixture fallback. Scoped ESLint and Python compile (cloud only); no full suite/repeat4A. Temporary branch-only qualifier no secrets/excluded integration. Do not leave a source-only fixture artifact presented as a live finite package.
+
+## Constraints/report
+Cloud GitHub/Actions only on existing isolated finite branch, CAS exact lease, no local files/deps/build. No CF/private/provider probe, live command, deploy, credentials/roles/OAuth/DDL, main merge, real occurrence or Max. Preserve original clocks/windows/fences and accepted changes.
+Report docs/superpowers/reports/2026-11-01-finite-material-task2.md with BASE/code/docHEAD, exact hostedRED/GREEN/run/job/counts/commands/lint, source-only limitations. Append existing progress. Stop branch writes and return DONE/concerns for root's fresh review. 4C package production/profile/full native producer and Task5 remain pending; operationalReadiness=false.
+
+## Root source-provenance ruling (Task2 implementation)
+Task2 qualifies the exact package origin and committed workflow source at M, each descriptor's actual Git commit/tree, and archive bytes. This does not establish semantic authorization of a role. For this fixed trial operatorClosed.sourceRevision must differ from M; relabeling it M fails closed. No guessed historical expected hash/path or future receipt is introduced. The approved frozen operator/canary/QA provenance receipt, actual builder semantics and full profile qualification remain explicit Task4C gates before any package is eligible for live use. An absent finite build workflow or artifact remains unavailable. Synthetic primary-shaped workflow/ZIP fixtures are test inputs, never a live package or authority.
+
+## Root correction — preserve QA closed main module basename
+The approved existing source pin QA_CLOUD_CLOSED_PINS.qaClosed in lib/mcp-qa-cloud-closed-pins.mjs names closed-rollback.mjs (395915 bytes, SHA2564b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f; dated versionc570b60b-95dc-48e1-89f3-9c4651691dbc). Therefore qaClosed.module.name is hardfixed to closed-rollback.mjs and its archive path is qaClosed/closed-rollback.mjs; the other four roles keep index.mjs. Exactly six files and all other structural bounds remain. This corrects the ROOT contract after accepted Task1, whose original implementation complied with the earlier all-index grammar; it is not a Task1 implementation bug. No actual Cloudflare module is renamed, no current remote state or semantic profile compatibility follows from the format, and the actual approved frozen source identity/profile qualification remains4C.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-01-finite-material-task3.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-material-task3.md b/docs/superpowers/briefs/2026-11-01-finite-material-task3.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-material-task3.md
@@ -0,0 +1,46 @@
+# Task4B Task3 — actual seed issuer, GHA adoption, QA publication bridge and native qualification
+
+SOURCE ONLY; no subagents. Read this first, then only needed sections of specs/2026-11-01-finite-material-bootstrap-correction.md and specs/2026-11-01-finite-qa-code-provenance-bridge.md. Task1/2 source accepted; actual package/profile/native mount is4C, launcher isTask5. No environment/caller JSON plan or success DTO substitutes for qualified constructors.
+
+## Required result
+Implement real fixed seed-material CLI/YAML step, once-only annotated seed/ref creation, public exact native seed reader, GET-only observer adoption, current account-token verification with dated-static approved receipt, and QA published-version/code bridge. No Workflow REST create in this finite GHA ingress. Pure test capability never enables production entry. Keep full native material assembly unavailable until4C rather than pretending syntax proves runtime.
+
+Suggested files: lib/mcp-qa-finite-seed-http.mjs; fixed QA-publication helper if needed; static custody reader/helper; existing finite-http/source/seed/external-contract/trial-control modules; finalizer CLI/YAML; focused existing/new tests. Keep modules focused. Reuse shared codec/manifest helpers and actual Task2 resolver/ZIP; no copied canonicalizer or mock-only resolver.
+
+## Exact new seed contract and public reader
+Existing canonical/ref/domain bounds remain. REQUIRED qaPublication extension is defined EXACTLY by the copied reviewed bridge spec: fixed account/QA Worker, actual live version/deployment and closed immutable version, same-role module/config/profile/bindings matching manifest, historical observedAt. Update strict seed codec/pure fixtures and affected tests. This is explicit unmounted SOURCE grammar amendment; no existing ref/record rewritten.
+
+Fixed creation ref refs/tags/afw-finite-observer-create/<intentId> now points to annotated tag. Tag object and canonical seed envelope/seedHash follow bootstrap correction. Old bare ref is conflicting consumed history, not upgrade opportunity.
+Native readFiniteMaterialSeed({intentId,sourceRevision,fetchImpl=fetch,now=Date.now,signal}) -> immutable {seed,seedHash,tagSha,primaryEvidence}. Fixed public api.github.com GET ONLY; no native GitHub key/artifact download/caller URL. Exact ref/tag/message/target/source, original named comment and existing intent formula, actual main/source, exact finalizer run/path/title/attempt1/owner/admit job, completed-success seed-material step, exact build source/run/artifact lineage. Max12 requests,100jobs,32768seed bytes,262144aggregate metadata bytes, original5s lease, no retry/newclock. Cache only immutable seed identity, never current ready/deployment observations. Rate/overflow/truncation/unknown/mismatches fail closed.
+
+## Original seed issuer and workflow
+Split actual admit job into fixed seed-material BEFORE admit-and-ready. Choose explicit step id finite_seed_once for seed issuer; launcher exports ONLY task-specific AFW_FINITE_SEED_ORIGINAL_PID=$$ and execs Node ONCE for seed-material phase, no retry/supervisor. Existing restore launcher/fences untouched.
+Read authenticated actual event/context, preserve existing original command/admission brand and primary run/job/source validation. Seed creator only belongs to the trusted once-launched original process; PID is COHERENCE ONLY. SAME-attempt WHOLE launcher reexecution is EXCLUDED by trusted host assumption, not prevented or durably identified. No DTO/boolean/recovery call mints/refills authority. Share one consumed process capability across every issuer/client. Default/reconstructed/recovery is GET-only, even404.
+
+Order: real Task2 package/manifest -> exact actual finalizer run/admit job -> correct custody verification -> actual QA publication verification -> consume original issuer BEFORE first POST -> ONE annotated tag POST -> only NEW201 ACK may lead ONE atomic ref POST -> NEWref201 before original admission/margin + independent exact ref/tag/content readback -> seed-material succeeds. Existing ref, lost/late tag/ref ACK, timeout, restart or changed primary = GET-only/admin-pending; no second tag/ref, replacement, force, deletion, refund, automatic new intent or shadow namespace.
+Seed step cannot prove its own future completion. Issuer checks actual primary seed-step START/in_progress, unadjusted clock/CFDate/T0/N1/margin BEFORE writing; LATER native reader checks completed success and started_at<=observedAt<=completed_at. Bridge remains unavailable until that later qualification. Do not estimate completion.
+
+Operator creates exact observer ONLY after seed-material primary success. Then GHA admit GET-adopts exact observer/source/provenance, obtains FIRST successful preview, persists existing ready and completes admit-and-ready. Remove Workflow REST create from this finite ingress, not a 401 fallback. Missing observer fails unavailable; no fabricated wait-before-seed loop/second observer. Poll/restore continue SAME exact observer primary output, original finalizer job semantics and existing native qa_restore claim/GitHub once-send fence. No second nominal claim or new clocks.
+
+## Actual QA publication bridge
+Fixed production closed locator QA_CLOUD_CLOSED_PINS.qaClosed in lib/mcp-qa-cloud-closed-pins.mjs: c570b60b-95dc-48e1-89f3-9c4651691dbc; actual module closed-rollback.mjs/395915B/4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f/configa8c8895f8375f4d09f01960e88bec8c3cac0a89f999e500f74fccf01733f7838/31bindings/14flags. Source locator is not proof finite compatibility or original compiled Git SHA/tree; those are explicit4C gates. Do not relabel historic bytes M. Missing source-qualified compatible finite manifest/actual role evidence keeps full constructor unavailable.
+
+GHA seed uses existing QA-edit/read custody to GET actual active QA deployment; read actual version WITH modules via existing fixed /workers/workers/<QA>/versions/<id>?include=modules grammar for live and SOURCE-fixed closed target; hash real decoded bytes/name/size and compare actual profile/bindings/config/qualified source against finite manifest and approved locator. Re-read live100% pointer unchanged. Never accept ETag as content SHA or compute expected hash from response being accepted. No arbitrary target/latest fallback.
+Native currently reads only canary/OP bytes and keeps qaCodeProvenanceVerified:false. New qaPublicationBridgeVerified means fully qualified GHA seed-step/artifact/source/version/hash lineage + actual native AFW_QA_VERSION + fresh QA deployment/binding/profile checks before/after awaits. It is NOT direct QA module verification or a caller boolean. Direct canary/OP bytes remain required. Original native metadata/body/5s budgets unchanged; if concrete bridge cannot fit, report exact budget conflict. Do not claim4C actual source mount from this transport task.
+Positive fixtures must use real transport/parser/hash path and explicitly SYNTHETIC source-authority pins where platform/provider is fixture-controlled; production fixed source defaults may not accept caller replacement pins or success callbacks. No private/source code bytes in outputs.
+
+## Dated custody receipt, not fresh policy
+scripts/mcp-qa-finite-custody-receipt.json is ROOT's sanitized SOURCE-approved record from actual17:22 selfverify/17:25 admin metadata. Contains NO key value/raw policy; policyHash is the approved canonical snapshot commitment (domain afw.finite-static-policy.v1 newline), not a current policy API result.
+Production GHA id9db7901af95faf07e6f7ef378045328e/account85d0.../expiry2026-11-08T02:59:59Z; account selfverify endpoint /accounts/<fixed>/tokens/verify ONLY, exact identity/active/notbefore/expiry. Reuse safe actual-envelope parsing including informational messages code10000/type:null; messages are not errors. No /user/tokens, token-policy GET, TokenRead permission, role upgrade or mandatory length2 group fiction.
+Receipt unchanged-policy is explicit TRUSTED OPERATOR ASSUMPTION. Fresh verify + fixed resource GETs prove those operations/identity, NOT current policy equivalence; NEVER scopeVerified=true. Mutating permission denial consumes its existing claim/admin-pending, no repair/retry. Strictly correlate plan.custody id/expiry/policyHash/group set to qualified source receipt; pure plan grammar may allow bounded unique sets rather than old exact2, but production uses exact approved4. Preserve safe expiry/deadline checks at every awaited boundary.
+Native reader is DISTINCT: candidate9aa97ad1fc9afe3021cf69ea497d5190 accounttoken metadata18:46UTC active/expiry3nov02:59:00Z, actual stored-secret match NOTverified. It requires own later4C source receipt/selfverify. Do not alias GHA identity/key or treat native candidate as verified. Canary publisher remains separate.
+
+## TDD / scope
+Hosted meaningful RED/GREEN, actual CLI/workflow contract, real native observer/RPC fixture paths where affected, current source-only authority explicitly synthetic:
+- wrong/missing/extra seed/pub fields, private data, source/tag/comment/body/owner/run/title/job/step, started vs completed cycle, actual bytes/profile/bindings/name/source/fixed locator mismatch, changed pointer/native version, stale/late Date/deadline;
+- one original issuer/shared cap, tag/ref lostACK/late201/existing/bare ref/reconstruction404, no secondPOST/Workflowcreate, no authority from tagger or process marker alone;
+- account identity wrong/inactive/expiry/notbefore/receipt mismatch, informationalnull messages allowed vs malformed extras, missing native custody stays unavailable, verify200 never scopeVerified;
+- native fixed public GET bound/rate/overflow/abort/5s deadline/noAuthorization; missing observer/artifact/default source fails before effects; actual seed-material -> admit preview -> ready -> original poll/restore, original claim/fence unchanged.
+Run new focused tests plus all directly affected existing finite-http/cf-http/command/observer/observer-native/read-rpc-native/finalizer/seed and source-interface tests; scoped ESLint. No fullsuite/accepted4A repetition or actual provider/private probe. Temporary no-secret branch qualifier EXCLUDED integration.
+Report docs/superpowers/reports/2026-11-01-finite-material-task3.md; append existing finite progress. Record BASE/code/docHEAD, exact runs/jobs/commands/counts, RED/GREEN/limitations; commit/CAS readback then stop writes for root fresh review.
+Cloud GitHub/Actions ONLY; no local code/deps/build. No live command/CF/private/provider probe, deploy, newtoken/role/OAuth/DDL/schema, mainmerge, Max, actualoccurrence. All original clocks/minimum180000margin/history/legacy/unknown fences remain. No actual finite package/4Cproducer/profile/Task5 install, guard liveness or PC-off acceptance by these tests. operationalReadiness=false.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-01-finite-native-cleanup-task3.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-native-cleanup-task3.md b/docs/superpowers/briefs/2026-11-01-finite-native-cleanup-task3.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-native-cleanup-task3.md
@@ -0,0 +1,79 @@
+# Task3 — independent exact QA finalizer and bounded observer transport
+
+Read this first; it is the exact source task brief. Work only in AFW tokenizartinfo-ops/agent-friendly-web, existing isolated feat/finite-native-cleanup-20261101, after Task2 scoped fix acceptance. Read pinned AGENTS, the finite spec headings referenced below, and this brief. Do not reread entire history or start runtimes. No subagents.
+
+## Task 3 — independent exact QA finalizer and ready handshake
+Add lib/mcp-qa-finite-trial-finalizer.mjs, scripts/run-qa-finite-trial-finalizer.mjs and one fixed workflow/admission integration for the new command kind. Keep existing closed-only rollback untouched. Separate workflow/run without nominal needs dependencies or shared cancel group is ready before arm; fresh primary GitHub readback correlates exact run/attempt/source/intent, in-progress finalizer job and completed admit-and-ready step, never a caller assertion. Use existing authorized QA custody only after metadata qualification; canary publisher remains separate. Use distinct nominal/finalizer concurrency groups and never hold shared QA writer lock while waiting for readiness; only final restore acquires it after fresh proofs. No pending cleanup cancellation; original R1 includes queue time.
+Acceptance: nominal cancellation does not cancel finalizer; no self-terminal job deadlock; live arbitrary profile denied, exact finite profile accepted only in its permitted phase. Container not stopped, guard unresolved, foreign pointer, expired R1, lost deploy ACK and already-consumed claim deny/reconcile without POST retry. Final readback uses a separate GET-only client and reports uncertainty truthfully.
+
+Focused Task3 acceptance: canary closes and its former live proof method becomes unavailable; restart finalizer, recover the exact retained proof through the qualified bounded fixed administrative transport, perform fresh independent closed deployment/provider/primary checks, and permit exactly one QA restore before original R1. No reseal/reopen/new native challenge. Missing provenance, unavailable transport/custody, conflicting or late writes, consumed QA claim and expired R1 leave admin-pending/no effect. Assert retained-proof reuse by two fact consumers never reuses an effect authority.
+
+
+
+## Accepted interfaces and implementation ownership
+Task1 control and Task2 guard/collector/restorer/gate are implemented, unmounted. Keep exact first-intent-only head and same-instance acknowledged prepare requirement; never reset/refund old/new history. Task2 APIs are fixed in spec “Root rulings implemented by Task2”; inspect only needed source. Task4 will own actual native factories, full private producer, finite canary delivery/profile and integration. Task3 owns real fixed observer/HTTP/GHA adapters and contract; an absent constructor remains unavailable, never fabricate authority. All code/tests/qualification on GitHub/Actions only, no local source/temporary trees/dependencies/builds, no live command, runtime/credential/permission/DDL/OAuth or Max actions.
+
+Keep createPrivateQaFiniteTrialFinalizer({plan,readSnapshot,claim,deployClosed,now,signal}).run(). The plan for this external consumer is a bounded TECHNICAL projection correlated to native authoritative plan/control hashes, not the full private Task1 selectors or raw consent. Do not add generic host/actor/method/version selectors. Existing closed-only invocation/rollback command remains unchanged; new fixed original command is EXACT /afw-qa-finite-confirmation v1 <current source SHA>, command kind finite_native_confirmation. It must authenticate actual owner issue497/main/source/attempt1 and derive originalT0, no caller dates/deadlines. Original N1=T0+300000,C0=N1-60000,C1=N1+120000,R1=N1+180000. Whole queue/setup time counts; no compensation/renew/repost. Pre-arm setup is operator-attended, not autonomous recovery or PC-off.
+
+## Concrete observer/material-before-ready ruling
+Implement one exact precreated PrivateQaBootstrap observer and fixed IndependentClosure actor. Creation input EXACT {operation,intentId,sourceRevision}; instance ID deterministic from original intent/source, NOT future controlHash. A FIRST readonly material-preview step invokes actual native producer, shares/extracts canonical reference computation from control, and derives canonical plan/control hashes from authenticated original command + actual source/pin/primary facts. No second independent GHA hash implementation or native provenance inferred from a Workflow ID alone.
+Preview returns bounded technical purpose,intentId,sourceRevision,runtimeVersionId,actorId,planHash,controlHash,resourceHash,T0,N1,C0,C1,R1 only. It creates no pending/head/alarm/claim/ready wait. GHA reads successful FIRST STEP output from primary instance GET while observer still active, validates source/native/instance/resource/custody/original window, persists admission receipt and completes exact admit-and-ready step. Then caller invokes prepare ONCE; native producer rederives same immutable material; changed material blocks. No 5s wait for future GHA readiness and no synthetic session/clock/metadata.
+
+Later fixed native exact head -> once-captured proofHash -> readRetainedFiniteCleanupProof({intentId,proofHash}); missing is not_yet_observed, conflict blocks. readFiniteTrialCleanupCompletion({intentId,controlHash,proofHash}) returns exact settled receipt. Max32 distinct readonly Workflow observation steps, original C1/R1-aware deterministic sleeps; do not cache not_yet forever or exhaust before capture window. Actual nominal Workflow must be terminal before both restores. Exact observer may be active during canary restore under full phase inventory; no whole definition exclusion. Proof retained/readback BEFORE canary POST; guard completion AFTER its readback excludes observer termination/QA restoration/GHA completion.
+
+
+
+## Root ruling — native QA claim and external send fence (2026-11-01)
+Focused source review at340aca28 identified a missing concrete claim channel: GHA cannot call an arbitrary DO, and the accepted observer is terminal before QA restoration. The same exact precreated observer therefore adds ONE separately named native claim step after settled guard completion and before its terminal output. This is one explicit journal mutation outside its maximum32 read-only observations, not a claim that the whole observer is read-only.
+
+Fixed claimFiniteTrialQaRestore({intentId,controlHash,proofHash}) internally fixes kind=qa_restore. Trusted eligibility requires fresh exact retained proof/completion, actual QA/native pins and the admitted finalizer. It does not require observer terminal, QA restored or GHA complete. The step has retries disabled. Only an acknowledged newly issued immutable native claim and its canonical hash may enter terminal output. An existing/reconcile_only or uncertain issuance is not silently upgraded to an acknowledged handoff. The claim is a journal fact, not a bearer or proof of restoration.
+
+After exact provider observer completion, the exact finalizer acquires the serialized QA writer lock, performs fresh independent checks, then obtains one separate durable append-only GitHub send claim before its sole QA POST. The uniqueness domain is the fixed intent/control/qa_restore effect, never run/job identity. Claim content binds native claim hash, proof, exact run/attempt/job/source and candidate/target. A changed run/job cannot create another eligible send. Only the execution acknowledging a NEW send claim may POST; existing/uncertain claim permits GET-only reconciliation, no retry/refund. Use the already authorized GitHub Actions persistence capability; process flags/concurrency alone are insufficient and no new custody is inferred.
+
+Both native claim and final POST remain before originalR1; queue time counts. Historical claim timestamps establish provenance; fresh prewrite observations establish current eligibility. Clock/custody ends never extend. Order: guard completion -> native QA claim -> observer provider complete -> external lock/fresh checks/send claim -> QA POST/readback.
+
+The GHA finalizer consumes a dedicated bounded technical plan projection, not the full private Task1 plan/raw selectors or consent. Shared native canonical reference computation supplies plan/control hashes; exact primary output/module/resource provenance must qualify that projection. Immutable plan.finalizer.jobId pins the admit/poll job that supplies ready evidence. A later fixed restore job in the SAME finalizer workflow/run/attempt/source may acquire the writer lock only after that job finishes; resolve its actual ID from primary GitHub metadata and bind it in the send claim. It is not a nominal needs dependency. Readiness during arm still requires the exact admit job in progress plus completed admit-and-ready step; restore phase must not demand that completed job remain in progress. Phase-specific checks preserve the original material/hash.
+
+Ruling: this is the smallest fixed transport completion — avoid a new public route/observer/credential and eliminate the terminal-observer claim cycle. Cost if wrong: source rework and possible admin-pending; it never licenses a second effect, new custody or runtime promotion.
+
+
+## Actual external adapters / safety
+Use existing qualified AFW_QA_CLOSED_TOKEN only in protected afw-qa-cloud-closed-rollback, same account/QA target. Qualification must correlate actual credential identity/status/expiry without echoing value and independently check effective needed resource/scope; successful verify is NOT Workflowcreate permission. Closed native create401/10000 remains real promotion gate. Independent read-only custody inspector branch/PR710 may be accepted by then; reuse pure fixed helper only if actual interface suitable. Do not depend on its new token/role or assume metadata fixed401. Canary publisher is separate; no value moves to GHA/finalizer/nominal.
+
+Actual GET-only CF client for observer recovery/primary readback; fixed Workflow definition/class/script/instance/input/module+source provenance; bounded bytes/depth/time/no arbitrary URL/body callback. Creation lostACK exactGET reconciliation only, never secondPOST/replacementinstance. No direct generic DO REST or public HTTP. Native QA claim method is the one explicit journal mutation; no arbitrary kind. HTTP errors typed numeric/sanitized, no raw provider/header/credential/messages.
+
+Separate GHA workflow/run, no nominal needs/shared cancel group, cancel-in-progress:false. Fixed afw-finite-finalizer-<intentId> and afw-finite-nominal-<intentId> groups. Admit/poll job never holds serialized QA writer lock. Fixed restore job acquires existing QA writer group only AFTER proof/native claim/observercomplete; all queue time within originalR1; primary exact source/run/attempt/job/step and effect/send claim fences. Own finalizer/GHA job need not terminal beforePOST. No scheduled/permanent guard. Keep old workflows untouched. Source fixture branches may have one temporary no-secret qualifier EXCLUDED from integration.
+
+Single approved QA closed version only. Fresh candidate pointer/version/config/modules/ns/exposure/source/custody/provider/primary/proof/guard checks before send; foreign pointer conflicts never overwrite. Unknown/latePOSTACK leaves issued and reconcilesGETonly; no refund or resume-send. Closed-compatible QA preservesclasses/ns/history/bindings, but denies operative entrypoints. Restart recovers completed original observer output after canary closed and old liveproof method unavailable; never reopens canary/reseals/rechallenges.
+
+## Qualification and report
+Meaningful TDD in cloud: wrongactor/source/attempt/command/clock/late-await/abort beforesecret/effect; material-before-ready no cycle; originaldeadline minimum, exactfirststep successfuloutput; cancel nominal independent; max32 samples/sleep caching; proof discriminant; unresolvedstop/writers, badprovenance/foreignpointer, custodyblocked, originalR1 queued/expiry, lostnativeclaimACK/reconcile_only and lostsendclaim/POSTACK no retry. Actual Workflow/DO fixtures for observer/claim APIs and source dependency constructors; mocks are synthetic authority, not installed capacity. Native version/control projection mismatch blocks. Restart aftercanaryclosed sameproof+completion+nativeclaim permits at most oneQArestore, exactlyboundseparateGitHubsendclaim. Existingclaimdifferentjobcannotnewsend. Protect unchangedclosedrollback/legacy contracts with focusednearby tests; normal fullCI rootlater.
+
+Commit source/tests/report docs/superpowers/reports/2026-11-01-finite-native-cleanup-task3.md and append existing progress ledger. Report BASE/finalcode/head/exactcommands/runs/jobs/counts/REDGREEN/limits/newpaths/tempqualifierexclusion. No operationalReadiness claim, no runtimepromotion. Return DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED +short commits/tests/concerns; don't spawn reviewer. Root does fresh task review and later wholebranchreview.
+
+
+## Root entry handoff — Task2 accepted, custody probe truthful limit
+Task2 is accepted atb902617a/codef8780ba3 after fixround2 (56PASS,scopedrevieworiginalP2ADDRESSED/0new). Retained INTERNAL narrowing assertion now propagates custody -> fixed host -> gate -> actual original runtime and across makeControl/start/interception/timeout awaits; preserve this composition. No public/fifth wrapper argument or RPC authority added.
+PR710 was merged separately into mainabed6474, not yet reconciled into this isolated finite branch. One exact existing-GHA-custody verify GET returned HTTP200 but current inspector blocked/invalid_response, so token identity/effectivepermissions remain UNQUALIFIED. No role/key/runtime change and no rerun unchanged. Do not claim the helper works live or import missing branch files. Task3 may implement its source qualification contract/adapters with explicit synthetic fixtures and runtime missing-evidence failure; do not let an unqualified actual credential or hypothetical scope become readiness. Root separately diagnoses response grammar; no need to block source implementation on provider access. Ask root any concrete cross-task interface question; no human/credential request or live call.
+
+## Root ruling — retained first-primary receipt replaces unavailable external D1 query (Task3, 2026-11-01)
+Focused architecture review accepted this explicit replacement. No external bounded administrative D1 endpoint is accredited. The SAME observer, after settled guard completion and acknowledged native qa_restore claim, obtains one fresh first-primary snapshot through the concrete fixed QA producer's ACTUAL bound DB path under its short original lease and R1. It compares exact row hashes/process generation/settled writer journals to the retained proof (only observation timestamps may differ), and correlates control/proof/completion/native claim/seal/source/native identity before and after the read. Its bounded immutable receipt hashes those references and the observation; it never refreshes its timestamp on external replay.
+
+Irreversible seal, settled writers, and qualified closed source must exclude ALL remaining scoped writes, including already-issued remote writes and old continuations. A known active/pending/unresolved administrative or independent writer blocks; broad credential capability alone does not establish an active writer. Empty Workflows and a closed current deployment ALONE are insufficient: an outstanding D1 write could still commit after the receipt.
+
+After observer completion and acquiring the QA writer lock, GHA performs fresh GET-only checks of exact closed chain/modules/configuration/namespaces/exposure/full Workflow and provider inventories, then validates the retained first-primary receipt and its qualified writer-exclusion lineage. Changed pointers/source/lineage or incomplete inventory stays admin-pending. This is NOT a new external D1 query or an unseen-foreign-writer guarantee. Task4 owns actual source/producer qualification; absence remains unavailable. Original R1, native claim and separate durable send fence remain unchanged. Add a negative fixture holding an actual outstanding D1 writer after the observation: no send claim or POST.
+
+The GitHub send fence uses an immutable annotated tag object and atomic unique ref under the fixed intent/control/qa_restore domain, never run/job/source as an additional namespace. Content binds native claim/proof/exact run/attempt/job/source/candidate/target. Only the execution ACKing a NEW ref201 before R1 may POST. Existing/unknown ACK/restart is GET-only; no deletion, force, reassignment, refund or resend. Tag-object creation alone grants nothing.
+
+Cost if exclusion cannot be qualified: admin-pending and source rework, never blind restore, a new transport or credentials. operationalReadiness=false.
+
+## Task3 source contract — actual Workflow provenance and bounded observations
+The first-step output is an outer technical envelope `{purpose,provenance,material}`. `material` retains the exact mandated preview fields unchanged. `provenance` carries purpose, original `event.instanceId`, compiled sourceRevision, and the observer's OWN actual env version_metadata ID. The material producer's current DO pin alone cannot prove the executable version of an older Workflow. Missing compiled source installation or metadata fails closed; Task4 must install the actual compiled revision and bound producer.
+
+The fixed adapter follows the documented [Workflow instance GET schema](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/get/): `versionId`, `params`, `queued`, `status`, `step_count`, `steps`, and string JSON `output`; step identity uses name/type/start/end/success/attempts/output. It does not fabricate result.id, result.workflow_id, or step.status. The separate [Workflow version GET](https://developers.cloudflare.com/api/resources/workflows/subresources/versions/methods/get/) establishes definition/class/language, not an undocumented Worker-version link. Executable correlation comes from the observer's native envelope plus independently qualified pinned Worker module/configuration source.
+
+Total read-only `step.do` calls are bounded to 32 INCLUDING the first preview: at most 30 distinct cleanup samples spanning original C0 through R1-5000, plus the final first-primary read. The native QA claim is one separate no-retry journal mutation. Native RPC AND Workflow step results may carry disposable transport handles; clone the serializable metadata and release that handle before exact field validation. This is transport normalization, not an unknown-field grammar wildcard.
+
+External readiness persists only while the original authenticated command retains its minimum nominal margin, including every awaited custody/provenance/tag/ref boundary. No later run, job queue, step, or read refreshes T0/R1. All source qualification fixtures are synthetic; default source/material/compiled-observer factories remain unavailable. operationalReadiness=false.
+
+Root confirmed the conservative total of 32 read-only step.do calls on 2026-11-01. Sleeps do not count as provider observations. Cost: slightly coarser sampling and possible admin-pending if evidence is late; no extra authority or clock extension. Clone/release applies only to owned returned RPC/step results, never env or shared bindings.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-01-finite-native-cleanup-task4.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-native-cleanup-task4.md b/docs/superpowers/briefs/2026-11-01-finite-native-cleanup-task4.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-native-cleanup-task4.md
@@ -0,0 +1,44 @@
+# Task4 — actual finite native source, profile and complete synthetic route
+Read this FIRST — exact source task brief, not a runtime authorization.
+AFW repo tokenizartinfo-ops/agent-friendly-web; existing isolated feat/finite-native-cleanup-20261101 after root accepts Task3. Source-only GitHub/hostedActions, no localsource/deps/build/temp or subagents/liveactions.
+
+## Task 4 — actual QA named wrapper/profile and integrated qualification
+Add lib/mcp-qa-finite-confirmation.mjs and mount exact branch in existing PrivateQaNamedConfirmation; extend source-qualified packaging for explicit finite and compatible closed profiles. Actual four release flags, explicit RELEASE_DB/canary node aliases and checked read custody; no forged env, native version or unbound placeholder. Call accepted runKnownCancellationReleaseWorkflow({bundle,env,event,step}) with ORIGINAL afw-release-<bundleHash> and sole {planHash:bundleHash}; trusted control selects intent, no operation payload. Preserve original70s/nested5s/20s under outer N1 and require durable guard plus finalizer readiness. Qualify existing subscription->custody.start->launch->delivery->unsubscribe/close in native source fixtures, covering the useful full route and reservation-only early failure.
+Acceptance: native actual Workflow/DO/D1 fixtures and real module metadata; closed default has no effects. Killing/cancelling nominal workflow at each boundary preserves cleanup. Profile/module-size/binding provenance and rollback class compatibility verified. Exact task and whole-branch review, full tests/lint/build; no live mutation. Produce bounded source receipt with next separately authorized promotion gates. Do not spend the unique first-successor occurrence on an extra rehearsal or claim operationalReady/PCoff from CI.
+
+New Task4 containment work: implement explicit legacy_saved_event/finite_trial_event entrypoint types, actual finite canary deny-first gate, deliverFiniteOwnSaved with ONLY intent/control references, concrete lib/mcp-own-finite-control.mjs resolver, real AFW_FINITE_TRIAL_CONTROL binding and fixed QA readFiniteOwnEventControl method/prepare-produced immutable private record. Audit every alternate delivery/schedule/consume/HTTP route; no fallback or caller OAuth/scope. Native tests hold old RPC before entry across selected finite deployment and demand zero host/auth/readiness/storage/budget/transport touches; test held entered awaits, old signed packets and held cross-generation transactions. Qualify actual profile/binding/source and closed rollback; no historical event recovery solely for retargeting. Root fresh focused architecture review of this new choice before code.
+
+Root-ruling Task4 acceptance: concrete resolver consumes appended observed facts, compares exact expectedProjectRevision+1 and deterministic existing-save fingerprint plus unchanged primary subscription/process receipt hashes; never latest record or caller facts. Test prepare before real synthetic subscription/save, later exact capture, changed revision and replacement receipt, original-window expiry and unknown capture ACK. Cleanup reads retained private technical facts under separate finite authority without OAuth renewal; missing/conflict yields blocked/admin-pending, never fabricated receipt.
+
+
+## Position and boundaries
+Task1/2 source accepted. Task3 source (report docs/superpowers/reports/2026-11-01-finite-native-cleanup-task3.md, Source/interfaces section +fixround1) is accepted only after root scoped rereview; preserve its original-execution capability and GET-only recovery constraints. First-intent-only head never resets/reuses; same-instance acknowledged prepare required for NEW nominal claim, not a fact inferred from a row. Legacy exact issued/complete/absent/absent history and uncertainty stay intact. OriginalT0/N1/C0/C1/R1, shorter observedconsent/capturedD, originalKnownWrapper70s/nested5s/20s allretain across everyawait. No fifthpublicknownwrapperargument, modified actualevent or authority from DTO/hash/flags.
+Task4 is responsible for ACTUAL source factory implementations/installations in finite opt-in profiles, real private first-primary producer and actual nominal/delivery integration — not additional unavailable callback placeholders. Closed defaults remain closed/unavailable. Source tests use actualWorker/Workflow/DO/D1 codepaths with explicitly SYNTHETIC externalprovider/custody/Container fixtures. No fixture is remoteproof.
+A separate upcoming Task5 designs a FIXED native Workflow-binding launcher + GET-only adoption of operator-precreated observer to avoid assuming GHA WorkflowRESTcreatepermission. Do NOT implement it/extraactor/planschema/mutation/adoptionmode here or spend a liveoccurrence. This task may qualify nominal using real original synthetic Workflowevent. Runtime readiness awaits Task5/fullbranchreview/promotion/livegates. Don't assume anotherlegacy APIrole or paidplan willfix401.
+
+## Required actual composition
+1. Add lib/mcp-qa-finite-confirmation.mjs with runPrivateQaFiniteConfirmation({env,event,step}), exact PrivateQaNamedConfirmation branch. Call already accepted runKnownCancellationReleaseWorkflow({bundle,env,event,step}) with providerORIGINAL event.instanceId afw-release-<bundleHash>, originalDate timestamp, SOLE payload{planHash:bundleHash}, original18-stage contract. Source-native originalevent is never reconstructed/rebased. Trustedcontrol/compiledsource selectsintent; no calleroperation payload. Qualifiedsamecontrol instance prepares/acknowledges NEWnominal claim. Losingack/reconstruction blocks newnominal; reads/cleanupremain.
+2. Install actual per-native-constructor compiled finite factories from Task2/3 on every DO reconstruction/alarm as appropriate. Sourcecompiled revision is realconstant frombuild, actualctx/env providesstorage/id/bindings/versionmetadata. No process/functions.exec callable persistence, envclone toforceflags, caller-supplied producer, boolean authority or fakebindingUUID. Nativecoherencepin alone isn'tprovenance: independently qualify actual deployedWorker bytes/module/config/binding/profile plus originalsource/currentcommand.
+3. Task3 functions: installPrivateQaFiniteObserverSource(actualCompiledRevision), installPrivateQaFiniteMaterialFactory(async({ctx,env,refs})=>({controlOptions,readFinalPrimary,custody})); implement concrete resolvePrivateQaFiniteExternalSource for qualified technical artifact/source/projection. Preview shares canonical controlrefs and doesNOTreadready/persistpending; GHA successfulfirststep->admitready, then prepare independently rederives SAME material. Full private Task1 selectors/consent/legacyraw policy never enterGHA/terminaloutput. External source resolver must obtain actual source-qualified artifact/primary metadata; no constant true/fixture actor or deferred generic binding in Node/GHA. Missing/unqualified facts produce blocked with no effects.
+4. readFinalPrimary(check) must execute actual FIXED bound RELEASE_DB first-primary queries and complete own writer exclusion, return {primary,writers} matching retained proof immutablefacts (timestamp differs), after guardcompletion+ACKnativeQAclaim. Native/source/control/proof/completion/claim/seal boundbefore/after. No hidden D1RESTPOST in GET-onlyexternalclient or nonexistent genericDO endpoint. Everyalreadyissuedremote/oldcontinuation unresolvedwriter blocks receipt; currentclosedversion/emptyWF alone never enough.
+5. Concrete source adapters produce all Task1 readPrimary kinds from actualraw receipts/currentgrant+owner+exactproject/revision/program+modulemetadata+primaryGitHubready evidence, using existing qualified known-cancellation/history/material/resolver helpers as anchors. Preserve realraw schema/row statuses and exact first-primary path. Do not reconstruct an empty/new predecessor or equate 200/absence to authorization. Candidate prepare/readiness initialzeroquiescence vs childownedwriter phase remain distinct; no wholeactor/definition exclusion. Real bindings/resources/source/currentnamespace arechecked, not taken from new RPC params.
+
+## Exact profile, artifacts and resources
+QA target agent-friendly-web-independent-closure-qa, actor namespace070c4a7708eb4592a3ded7c117a88225, fixed existing actor name/ID helper; QA_DB676ca49e-af71-4f2f-a12d-11f13de78a51. FiniteQA ACTUAL fourreleaseflags stringtrue and ALL14existingQAflags stringfalse. Explicit RELEASE_DB alias is CANARYrelease database6a728254-1494-4039-802e-b39288a55fcc, AFW_RELEASE_EVENTS_NODE actualcanary node namespace, checked readcustody alias only. Never spreadentireenv/changeahelpercopy tosimulatevalidsource. ActualownWorker app/Container namespace d6fc71552de7494a863aca20365a572d (32hex, notUUID). Five exact deploymentpins require module{name,sha256,bytes}; QA/canarysource tuples DISTINCT. Operator staysclosed855dc5c1/deployment979026f8; currentQAclosedbaseline c570b60b/deployment4c78c652 was primary14:30UTC (dated, not futureliveapproval), canary2607abae/7b5a3683 likewise. No remotechecks/updates fromthissource task.
+Finitecanary needs NEW REAL version_metadata AFW_FINITE_TRIAL_VERSION and concrete AFW_FINITE_TRIAL_CONTROL binding to fixedQA control. Currentclosedcanary lacksversion_metadata; do notclaimaliasexists. Source packaging finite/compatibleclosedprofiles with realclass/namespace/binding manifests and closedrollbackcompatibility. Publicroutes/workers.dev/previews off, schedules/tails empty; preserve fixedcustody byexplicit inheritance, notsecretvaluecopy. No runtime/custody/schema action. Buildctx0/1 remainsINERT; neverinvoke generated/source artifact. Root later uses qualifiedmain/source/actualprivatepacket/material and current resources before promotion.
+
+## Real receiver and legacy containment
+Add concrete lib/mcp-own-finite-control.mjs resolver, fixedQA readFiniteOwnEventControl method and compiledfinite receiverprofile. deliverFiniteOwnSaved accepts ONLY exactintent/controlrefs; server computes own actor/method/DB/grant/program/scope/facts. No OAuth/rawscope/event/selector/callback/URL fromcaller, latest-record fallback or authority string. Validatecurrentconsent +originalnarrowerD acrossallnative/SQL/network awaits, including preserved Task2 internal parentassert throughcustody->fixedhost->gate->actualruntime. Task4 MUSTretain that pipeline.
+Finiteprofile LEGACY deliverOwnSaved denies BEFORE #host/auth/readiness/storage/budget/transport. Inspect actual alternate HTTP/schedule/consume/deliveryentry paths for same containment. Oldenteredawaits, heldtransactions and oldsignedpackets cannotcrossgeneration, overwrite newINFO/dispatch/budget or spendnewbudget. No historical-event replay merelytoretarget. Native tests use real legacy issued/complete/absent/absent rawhistory, preservehashes/unknownACK, prospectivecontainment onlywith qualifiedfinite source and freshquiescence/separatelegacywriter checks; nevermarkoldissuedcomplete/refund/reset.
+Prepare INFO onlyplanned selectors/savekey/expectedrevision, nofuturefacts. Later captureObservedFacts fixed subscription/process/saved_event appendsactualfirst-primaryfactsONCE; exactexpectedProjectRevision+1, deterministic savefingerprint and unchanged primarysubscription/process receipthashes. Missing not_yet_observed; replacement/wrongrevision/generation conflicts block. UnknowncaptureACK readonlyreconcile, nobusinessretry.
+Synthetic internal goal-save authority is separately originalowner/QAprogram authorization; a consumer summary-read OAuth scope is NOT arbitraryproject-edit permission. Use only fixedownsyntheticproject/serverapproval/program, noRealMax/customer/UI userdatamutation. Fullcase customeridentity remains futuregate.
+
+## Qualification / completion
+Meaningful cloudTDD missingactualfactory/bindings/metadata/rawprimary ->failclosed; realoptinpositive profile/source and originalWorkflowevent; changedgrant/owner/revision/program/source/custody/ns/alias/clock/flags/ready rejects; sameinstanceackloss/reconstruction nonewnominal. Native Worker/Workflow/DO/D1 actual composition full subscription->custody.start->launch->save+capture->delivery->nativeunsubscribe/close; reserve-onlyfailure, cancellationeachboundary, heldD1write/launch race, no physicalstop/noadmission shortcut, retainedproof aftercanaryclosed.
+Test real legacy entryheldbeforedeployment touchesZEROhost/auth/readiness/storage/budget/transport; oldenteredawaits/signedpackets/transactionrollbackcannotwrite newgeneration. Test missingversion_metadata andwrongDBalias with actualsourceconstructor, not an assertedBoolean. Concrete rawCF/GHA/APIgrammars correct, informationalmessage10000/type:null safelydiscarded not autherror. ExistingGHAcredential ACTUALverified1nov17:22:52UTC id9db7901af95faf07e6f7ef378045328e activeexp8nov02:59:59UTC; metadata17:25 confirmslimitedQAEditor/readers. RESTWorkflowcreate STILL401/unqualified; no role changes or expectedpermission fiction.
+Sourcecompiled finite+closed artifacts, module/exports/size/profile/binding compatibility and exactmain provenance; sourcefixture authorityexplicitlysynth. Focused+affectednative testcommands/run/job/counts/scopedlint, normalfullsuite/wholebranchreview rootlater afterTask5. Temporary finite-task1 qualifier is branchonly/no secrets/excludedintegration; extendonlycoveringtask. No localwork/newsubagents/runtime/provider/privateprobe/schema/DDL/roles/tokens/OAuth/cases/mail/Max actions.
+Report docs/superpowers/reports/2026-11-01-finite-native-cleanup-task4.md; append existingprogressledger. Record exactBASE/code/head/REDGREEN/commands/hostedruns/jobs/counts/rawsourcequalifierexclusion/actualremaining gates and any source implementationgap candidly. Return DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED short contract; do NOTspawnreviewer. Rootfreshreview/fixloop/integratedwholeCI beforeanylivepromotion. Do notspend unique first-successor occurrence onextraPC-on rehearsal or claimcloudreadinessfromsource tests.
+
+## Latest bounded resource evidence and handoff
+Read-only PRIMARY17:58:04UTC: QAactiveversionc570b60b-95dc-48e1-89f3-9c4651691dbc/deployment4c78c652-5e8a-43e6-a622-bb0def85b9a1,31bindings. Actualclosedversionhas AFW_QA_VERSION version_metadata and ONLYworkflowbinding AFW_QA_BOOTSTRAP ->afw-own-qa-private-bootstrap/PrivateQaBootstrap. AFW_QA_NAMED_CONFIRMATION is declaredinrepositoryconfig but ABSENT fromthisclosedmetadata; don'tcallitexistinglivebinding. A finiteprofile mayexplicitlyaddthedeclaredbindingtoanexistingqualifiedNamedConfirmationdefinition forlaterTask5, subjectsource/definitionverification; no actualprovision/binding/deployment now. ThisreadcoversQAmetadataonly, notallruntimeactivity/otherworkers readiness.
+RootacceptsTask3codee175d5f7/reportHEADf11aa9b6 afterscopedreview: originalP2ADDRESSED,0newP1/P2,71PASS/scopedlint0. Trustedone-launchcaprestriction/costexplicit; immutableat-most-oneGitrefremains. Rootmerged acceptedmainf4ff5159 intoisolatedbranch by exact16addedblobs/no collisions; sourceexistingfilesunchanged. Fullqualification afterTask4/Task5 stillrequired; thismergeisnotnewruntimeevidence.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-01-finite-native-launch-task1.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-native-launch-task1.md b/docs/superpowers/briefs/2026-11-01-finite-native-launch-task1.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-native-launch-task1.md
@@ -0,0 +1,54 @@
+# Native5 Task1 — launch records and source-owned absence inventory
+
+SOURCE ONLY. Root dispatches this task after4C1; no subagents. Read pinned AGENTS, this brief and design sections on clocks, SEND, inventory and cleanup; no broader history. [Design](../specs/2026-11-01-finite-native-launch-adoption-design.md); [plan](../plans/2026-11-01-finite-native-launch-adoption.md). Report path docs/superpowers/reports/2026-11-01-finite-native-launch-task1.md.
+
+Inspected a776e115c2e3682f1620a6e54a758a3c77a16b94; use root's post4C1 lease, preserving newer work. publicStatic v2/historical pins belong4C1. Actual C2 private material/privateCanaryConfiguration is not installed; default fixed-source resolver stays unavailable. No placeholder success, caller DTO or generic truth callback.
+
+## Deliverable / files
+Create lib/mcp-qa-finite-launch-records.mjs and lib/mcp-qa-finite-launch-inventory.mjs. Modify lib/mcp-qa-finite-trial-control.mjs for narrow read-only snapshot primitive and new plan fields; propagate exact fields through mcp-qa-finite-external-contract.mjs/mcp-finite-evidence.mjs and fixed-terminal-workflows.mjs. Create test/mcp-qa-finite-launch-records.test.mjs and test/mcp-qa-finite-launch-inventory-native.test.mjs. No native prepare/create method, launcher sleep implementation or business wrapper change in this task.
+
+Exact private plan top-level launchPolicy={armAckBy,launchAt,lastCreateAt}; workflows={confirmation,bootstrap,launcher}. External technical projection carries both. armAckBy=T0+90000,launchAt=T0+150000,lastCreateAt=T0+160000; N1/C0/C1/R1 stay T0+300000/+240000/+420000/+480000. Existing intent/plan/control hash algorithms unchanged; future unspent plan bytes/hashes change. No old record reinterpretation/reset.
+
+## Pure interfaces / records
+finiteLauncherInstanceId({intentId,sourceRevision}) returns 'afw-finite-launch-'+SHA256(UTF8('afw.finite-launcher.v1\n') || canonical({intentId,sourceRevision})).
+validateFiniteLaunchPolicy({T0,launchPolicy}); validateFiniteLaunchPrepared(value); validateFiniteChildCreateSend(value); validateFiniteChildCreateAck(value); hashFiniteLaunchRecord(value).
+Strict immutable data, safe dates, exact hashes/source/version IDs; never synthesize identity. New hash domain is record.purpose+'\n'+canonical ASCII-sorted-key JSON. Existing nominalClaimHash follows original Task1 effect-hash domain, not a new hash algorithm.
+
+Fixed append-only keys afw.qa-finite-child-create.v1:<intentId>:prepared/:send/:ack.
+Prepared EXACT fields: purpose='afw.qa-finite-launch-prepared.v1',intentId,finitePlanHash,controlHash,sourceRevision,qaVersionId,actorId,launcherId,nominalId,bundleHash,nominalClaimHash,guardStateHash,preparedAt,armAckBy,launchAt,lastCreateAt. preparedAt<=armAckBy; native identity and future IDs correlate to exact plan; prepared receipt comes only after actual prepare/guard/claim in Task2.
+SEND EXACT fields: purpose='afw.qa-finite-child-create-send.v1',intentId,finitePlanHash,controlHash,sourceRevision,qaVersionId,actorId,launcherId,nominalId,bundleHash,nominalClaimHash,preparedHash,bindingHash,issuedAt,deadline. deadline=lastCreateAt and launchAt<=issuedAt<lastCreateAt.
+ACK EXACT fields: purpose='afw.qa-finite-child-create-ack.v1',intentId,controlHash,sendHash,nominalId,acknowledgedAt. Actual timely matching create response only; ACK is not execution/settlement proof.
+Nominal ID afw-release-<bundleHash>, distinct from launcher/observer. SEND is NOT Task1 nominal permission claim and is separate from reservation/admission/launch process-writer kinds.
+
+## New handoff prerequisite (Task3/C2 ownership)
+Root's order is seed primary success -> separate post-T0 private-policy setup completed/qualified -> operator exact observer -> bounded GET-only GHA adoption/preview/ready -> launcher. Proposed setupBy50s/original30s budget; GHA max36 absolute2s slots through70s, child5s clipped to original parent; ARM90 unchanged. No missing-seed wait, CF create/writer lock or new clock. Task1 does NOT implement that wait or publisher.
+
+Consume only C2's immutable qualified setup context/completion receipt (afw.finite-policy-installed.v1 and exact identity from final private-policy-setup spec; draft b23d11c3 owner-locator amendment pending). Setup is ONE extra existing-Bootstrap prearm instance, already terminal before first preview/full inventory. It consumes no finite HEAD. Missing source dependency stays unavailable; no boolean, guessed receipt or old probe proves completion. Keep no whole-definition exclusion; observer32 reads/claim unchanged.
+
+## Actual source boundary / no deadlock
+Add readPrivateQaFiniteControlSnapshot({storage,nativePin,plan,parent}) inside trial-control; reuse its nativePin WeakMap and strict plan/legacy/state decoding. Reads actual storage; computes exact canonical references BEFORE HEAD exists; missing HEAD/SEND must be true absence, never fabricated armed state. Pure serializable snapshot is evidence data, not authority.
+
+ParentBudget INTERNAL {check,signal,deadline}: created once at real operation entry BEFORE hydration, original5s maximum and narrower absolute ends; all hydration/queue/snapshot/provider/transaction work consumes it. check returns current wall clock; rejects reversal/expiry/abort. No helper resets another5s clock. Existing control's now=parent.check and timeoutMs<=remaining preserve this bound.
+
+Fixed resolvePrivateQaFiniteLaunchContext({ctx,env,refs,parent}) remains unavailable untilC2. Retain real context in private WeakMaps; no env JSON/public authority mint. Test real constructors/native pins/DO/D1/storage/inventory with SYNTHETIC external provenance.
+
+createPrivateQaFiniteLaunchInventory({ctx,env,context,parent}) -> {observeBeforeCreation()}. context must resolve from that fixed native source path, not be accepted as a public shape. Output is consumed internally/invocation-bound:
+- never_issued: exact design identity plus phase arm/prelaunch, journalSnapshotHash,controlSnapshotHash,inventoryHash,observedAt.
+- issued: same identity, exact sendHash, optional ackHash and provider observation/unknown.
+- unavailable: no exception/authority.
+
+Caller strings/booleans/DTOs cannot choose phase or mint these results. Derive phase from actual decoded state and original times. At preview before HEAD, match planned source/canonical refs WITHOUT inventing persisted control. At same-invocation pending/armed prepare, decode actual storage directly. At prelaunch require real prepared receipt/nominal claim/guard. Missing source coverage stays unavailable.
+
+CRITICAL: inventory may be awaited inside control.prepare's own synchronization. NEVER call control.read on that object from this producer. The outer prepare must NOT hold the SEND/inventory coordinator. One private coordinator per actual DO context serializes SEND transitions and inventory observations. Acquire it only around snapshot1 -> complete fixed provider inventory -> snapshot2 equal commitments -> synchronous internal consumption, then release. Queue time counts. Task2 later routes EVERY SEND transition through the same coordinator. Durable SEND protects reconstruction and already-issued creates; source path audit is mandatory, not a branded-success shortcut.
+
+Only qualified never_issued permits exact nominal absence at preview/arm/prelaunch; SEND-present plus404 remains unresolved. Full definitions/instances remain enumerated; exact observer/launcher exceptions only. At both restores actual nominal AND launcher terminal/writers settled; QA also observer complete. Never-created nominal cleanup remains admin-pending; no new proof union. No early restore from process sealed_without_admission.
+
+## Hosted TDD / closure
+1. RED tests strict field/hash/order/timing and tampering; real native before-HEAD absence; foreign head, pending/uncertain SEND/ACK, missing source, caller evidence, incomplete inventory deny.
+2. Real nested prepare->inventory test terminates without control.read reentry; real coordinator race blocks SEND until protected observation consumption. Snapshot/control changes deny. Hold actual storage commits/provider requests across parent expiry; no fresh helper lifetime.
+3. Run hosted:
+node --test test/mcp-qa-finite-launch-records.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs
+Record RED/GREEN; run affected fixtures/scoped lint. Provenance SYNTHETIC; no production override.
+4. Commit source/tests/report and append progress. Report BASE/code/head, exact commands/runs/jobs/counts, RED/GREEN, unmountedC2 gate and source coverage limits. Root reviews; no whole-suite/4A repetition.
+
+Cloud source only; no local builds, runtime/private probes, keys/scopes, deployment or occurrence. DO ctx is THIS DO, never Workflow ctx. Keep soleC0 alarm, original70s/5s/20s/four-argument18-stage wrapper. LaterPC-off needs all source/CI/runtime gates and timelyARM; owner declaration differs from provider evidence. operationalReadiness=false.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-01-finite-native-launch-task2.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-native-launch-task2.md b/docs/superpowers/briefs/2026-11-01-finite-native-launch-task2.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-native-launch-task2.md
@@ -0,0 +1,53 @@
+# Native5 Task2 — same-object preparation and unique native child creation
+
+SOURCE ONLY. Root dispatches AFTER Task1 clean review. Execution BASE/root lease is supplied separately; preserve all newer source and pause/resume checkpoints. Read this first, then the Task2-only section below and the accepted Native5 design's same-object/SEND/budget clauses. No whole history. AGENTS governance applies. No subagents; root owns fresh task review.
+
+## Scope and already-owned interfaces
+
+Task1 report docs/superpowers/reports/2026-11-01-finite-native-launch-task1.md is the authoritative implemented handoff; include its forthcoming coordinator fix report. Actual fixed inventory parser is lib/mcp-fixed-terminal-workflows.mjs.
+- createPrivateQaFiniteLaunchParent({now=Date.now,deadline}) -> INTERNAL {check,signal,deadline}, original<=5000ms/narrowerabsoluteend. Create BEFORE source hydration at native RPC entry; no renewed clock after queue/read/guard/claim.
+- resolvePrivateQaFiniteLaunchContext({ctx,env,refs,parent}) -> source-private opaque token; readPrivateQaFiniteLaunchMaterial({ctx,env,context,parent}) -> EXACT {ctx,env,plan,request,execution}. C2 default unavailable. plan canonical private JSON; execution exact prior provenance plus launcherId; request fixed GET transport.
+- createPrivateQaFiniteLaunchInventory({ctx,env,context,parent}).observeBeforeCreation(), withPrivateQaFiniteLaunchCoordinator({ctx,env,context,parent},operation). Task1 private token is never caller authority. EVERY SEND transition uses same coordinator; outer prepare NEVER holds it while awaiting its own inventory reader. Do not treat a raced timeout as underlying settlement; preserve Task1 fix.
+- readPrivateQaFiniteControlSnapshot({storage,nativePin,plan,parent}) and readPrivateQaFiniteControlSnapshotUnderCoordinator: real strict decoder; true absence; no control.read reentry. Source can compute exact control refs before HEAD without inventing persisted state.
+
+## Root C2 capability seam ruling
+
+The Task1 material tuple stays EXACT and is not widened. If no existing fixed producer supplies these operations, add ONLY fixed source-module export readPrivateQaFiniteLaunchOperations({ctx,env,context,parent}) to lib/mcp-qa-finite-launch-source.mjs, default unavailable until C2.
+Its eventual result is EXACT {controlPrimary,guardActions}. controlPrimary is the actual fixed readPrimary set required by createPrivateQaFiniteTrialControl, including nominal; guardActions is EXACT {readPrimary,withdraw,close,seal,proof,canary_restore}, using actual guard execute/reconcile/proof interfaces. These are private source-produced capabilities, NEVER RPC/caller params, success DTO, runtime registration or env JSON. C2 qualifies owner/source/setup/primary/custody; no boolean coverage. Tests compile-time substitute ONLY this source dependency together with the already declared external provenance module, explicitly SYNTHETIC.
+Task2 MUST construct the REAL control and REAL guard using imported constructors, same actual ctx/env/storage/native pin and SAME parent. guard identity comes from actual Task1 decoded control snapshot; don't receive it as a caller-authored identity. Do not use installPrivateQaFiniteNativeGuardFactory to bypass missing source. Guard reconstruction for later alarms is C2; startup guard uses this invocation's bounded clock and persists the original C0 alarm.
+Preview context may not require future READY; prepare/create must qualify actual completed setup/finalizer READY/current consent and all their actual source conditions. Never fabricate these facts to unblock production.
+
+## Binding identity and hashes
+
+Only env.AFW_QA_NAMED_CONFIRMATION.create is allowed. Its fixed definition is afw-own-qa-private-confirmation, class PrivateQaNamedConfirmation, script agent-friendly-web-independent-closure-qa, account85d0d5dadac3341a564f22ce885e9eec. C2 resolver must qualify actual config/definition/class/source and all holders; a name/object alone is not provenance.
+Capture/check the actual binding object+native method identity across awaits. bindingHash is SHA256(UTF8('afw.finite-native-child-binding.v1\n') + canonical ASCII-sorted JSON of EXACT {accountId,bindingName,className,definitionName,qaVersionId,scriptName,sourceModuleHash,sourceProfileHash,sourceRevision}), with actual qualified plan/native values. No caller bindingHash/profile/target.
+Prepared.guardStateHash retains Task1's existing SHA256(JSON.stringify(actual strict-decoded snapshot.guard)); nominalClaimHash retains afw.qa-finite-trial.v1:effect + newline + JSON.stringify(actual claim), NOT the new sorted record domain. Prepared/SEND/ACK hashes use hashFiniteLaunchRecord. Preserve exact raw guard ordering validated by Task1.
+
+## Concrete task requirements
+
+## Task2 — fixed DO prepare/claim and unique native child create
+
+**Files:** create lib/mcp-qa-finite-launch.mjs; modify worker/independent-closure/index.mjs DO methods only and narrow shared context plumbing; tests test/mcp-qa-finite-launch-native.test.mjs.
+
+**Interfaces:** runPrivateQaFiniteLaunchOperation({ctx,env,operation,refs,parent}) is source-internal with fixed operation dispatch; RPC methods prepareFiniteNominalLaunch({intentId,sourceRevision}), createFiniteNominalChild({intentId,controlHash}), readFiniteNominalLaunch({intentId,controlHash}) validate exact arity/fields. ctx MUST be this.ctx of IndependentClosure. Caller cannot supply operation/source/context/binding. Read returns facts, not authority.
+
+- [ ] Test real control.prepare -> guard.arm/readback -> NEW control.claimEffect('nominal') on SAME object; guard.arm currently never calls prepare. Cover90s boundary, unknown prepare/receipt ACK, reconstruction, old head, missing/unsettled private-setup completion, altered seed/readiness/consent/pin and Workflow-context misuse.
+- [ ] Test actual transaction+storage SEND, independent readback, one native binding create with exact ID/payload. Cover149999/150000/160000, clock expiry after EVERY await, lost/late transaction/create ACK, duplicate ID, reconstructed callers/provider404, queued coordinator and held remote create. Unknown creates remain separate native-create writers.
+- [ ] RED: node --test test/mcp-qa-finite-launch-native.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/mcp-qa-finite-trial-guard.test.mjs test/mcp-finite-nominal-control.test.mjs.
+- [ ] Implement DO fixed mounts and live shared-parent budget before source hydration. Persist/read prepared only after same-object claim and C0 guard ACK. Source context resolves actual AFW_QA_NAMED_CONFIRMATION and fixed target metadata. Atomically append SEND; only NEW acknowledged transaction yields process-local once-send capability. Recheck parent before native create; never retry outstanding native call.
+- [ ] Append ACK only for actual matching timely create response; existing/unknown journal is GET-only. Read-only reconciliation never overwrites SEND/ACK, synthesizes termination or invokes create. Preserve guard alarm and independent cleanup.
+- [ ] GREEN same command, scoped lint, commit report docs/superpowers/reports/2026-11-01-finite-native-launch-task2.md. No binding/config deployment; missing actual C2 context stays unavailable.
+
+
+
+## Additional acceptance details
+
+Root clock ruling: create ONE original parent (<=5s) at native entry BEFORE hydration. When the actual plan becomes known, operation check closes over that SAME parent's check plus original armAckBy/lastCreateAt/read bounds; narrow remaining timers/signals only, never replace the parent/context or reset its start. Crossing a newly discovered absolute end during hydration denies before writes. Supply this narrower check as control/guard now and repeat it after every await. A narrower caller timeout never releases a coordinator while underlying work is outstanding.
+Source-internal operation selector is fixed by each native method; refs are exact own-data with arity checks. Prepare refs intentId/sourceRevision; create/read refs intentId/controlHash. DO this.ctx is required, never Workflow ctx as storage. Missing C2 source dependency denies before storage/effects.
+One prepare constructs ONE control -> actual prepare ACK -> same-control guard.arm/readback+C0 alarm -> NEW same-control nominal claim -> append/readback prepared. Unknown/delayed receipt grants no launch; no reconstructed nominal claim. Claims and stored receipts are facts, not reusable execution authority.
+Create resolves prepared/claim itself, correlates actual launcher prepare-step success/current READY, unwithdrawn/unsealed control and current consent/source. Use fresh original control/primary checks immediately before one native send; no re-claim. Validate at every awaited boundary. Parent expiration after SEND means no effect; held/unknown actual send remains outstanding. ACK only timely exact created ID, not proof terminal.
+Fixed native call create({id:'afw-release-'+bundleHash,params:{planHash:bundleHash}}), once. No REST create, force/restart/fallback/new ID, user DTO claim, generic transport, sixth workflow stage or altered nominal event. Task3 owns actual sleep/original event/nominal wrapper.
+Never-created nominal remains admin_pending; no absence restoration union. C0 sole alarm, original fourargs/18stages/70s/5s/20s/T0/N1/C0/C1/R1 unchanged.
+Run meaningful hosted RED/GREEN exact Task2 command, actual workerd exported DO methods/storage/control/guard and native Workflow binding where supported, fixed external provenance synthetic only; include held storage/native-create + fresh queued parent. Scope lint. No fullsuite/C1 repetition absent concrete new concern.
+Report docs/superpowers/reports/2026-11-01-finite-native-launch-task2.md; append existing finite ledger. Exact BASE/code/docHEAD, run/job/attempt/counts/commands/results, defaults-unavailable boundaries, self-review and CAS/readback; return concise status and STOP WRITES for root review.
+No local code/deps/build, provider/private probe, keys/scopes/permissions, real OAuth/consent, deployment/DDL/cron/Container, main merge, live command/occurrence or Max. Temporary hosted qualifier excluded integration. operationalReadiness=false.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-01-finite-native-launch-task3.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-native-launch-task3.md b/docs/superpowers/briefs/2026-11-01-finite-native-launch-task3.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-native-launch-task3.md
@@ -0,0 +1,66 @@
+# Native5 Task3 — durable launcher, original nominal event and passive adoption
+
+SOURCE ONLY. Root dispatches after Task2 acceptance. Verify exact assigned lease and AGENTS general project/security/guidance rules; historical dated receipts are not a task backlog. Read this first, then relevant Native5 design sections and Task3 only of ../plans/2026-11-01-finite-native-launch-adoption.md. No whole history or subagents.
+
+## Owned interfaces and boundaries
+Task1 coordinator/snapshots and Task2 methods are implemented and reviewed. Report ../reports/2026-11-01-finite-native-launch-task2.md plus its fix explains exact outputs/default C2 seam:
+prepareFiniteNominalLaunch({intentId,sourceRevision}) -> facts status='prepared',prepared; readFiniteNominalLaunch({intentId,controlHash}) -> status='observed',prepared/send/ack/nativeCreateAcknowledged; createFiniteNominalChild({intentId,controlHash}) -> acknowledged|issued|admin_pending facts. Every result also mayRetry/authorizesEffects/operationalReadiness false. Only prepared NEW acknowledgement plus matching independent readback lets launcher proceed; stored facts do not restore a lost first preparation step.
+Use fixed env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1').get(id), actual DO ctx stays inside the server. Never Workflow ctx as storage or caller-supplied namespace/source/claim.
+Launcher payload EXACT {operation:'finite_nominal_launcher',intentId,sourceRevision}; ID finiteLauncherInstanceId with accepted original domain. Actual Bootstrap workflowName afw-own-qa-private-bootstrap; nominal definition afw-own-qa-private-confirmation/class PrivateQaNamedConfirmation. Keep finite/default source dispatch separate and preserve ordinary closed routes.
+
+## Launcher result and timing ruling
+Actual server prepared result is strict validateFiniteLaunchPrepared. Correlate original source/intent/launcher ID/actor/current QA version, re-read exact prepared record/hash before acknowledging first step, derive original T0 from its fixed launch policy and validate all relationships. Do not accept caller deadlines.
+Use fixed step names finite-launch-prepare and finite-launch-create, retries.limit=0 (any required zero-retry config fields use existing supported conventions). Absolute sleepUntil step finite-launch-wait at prepared.launchAt. Step replay uses recorded successful result, never repeats acknowledged effects; DO journals remain decisive on unrecorded/lost step result.
+First step's bounded technical output EXACT {purpose:'afw.finite-launcher-prepared.v1',prepared,preparedHash,acknowledgedAt}. preparedHash=hashFiniteLaunchRecord(prepared); acknowledgedAt is actual observed time AFTER both server acknowledgements/readback and <=armAckBy. Actual provider step completion must ALSO be <=armAckBy, source-qualified by C2 before child creation; this output alone is not future terminal or server authority.
+After wake, do one create step only before lastCreateAt, no shift/restart on late wake. Unknown/issued/admin_pending stays factual and terminalizes launcher conservatively when possible. No exception for active whole Bootstrap definition.
+
+## Fixed private confirmation source seam (C2)
+Create lib/mcp-qa-finite-confirmation-source.mjs with ONE fixed readPrivateQaFiniteConfirmationMaterial({env,event,step,parent}) default unavailable until C2. No runtime registration, caller success/authority DTO or env-selected factory.
+Event/step/env are the ORIGINAL actual native entry objects, not request parameters. The future producer resolves actual immutable private setup/first HEAD/control/prepared/SEND/current owner+consent/source/binding/provider provenance, then yields EXACT {bundle,plan,execution}; plan is original canonical private finite-plan JSON. bundle is original validated Named release bundle, never caller content. execution EXACT {intentId,finitePlanHash,controlHash,sourceRevision,qaVersionId,actorId,launcherId,nominalId,bundleHash,preparedHash,sendHash,bindingHash,createdAt}; actual correlated hashes/UUID/time only, no boolean permission. C2 produces this from actual private primary and source constructors; tests substitute ONLY this external provenance boundary explicitly synthetic.
+A private first-HEAD locator is immutable and never advances; C2 may correlate exact bundleHash with that original HEAD/INFO/context, never latest-row or prefix scan. No raw private context/bundle public HTTP/RPC endpoint is added in Task3. Actual C2 private material transport/residency is that later producer's installation gate, not an invented ready stub.
+If shared strict plan decoding is needed, expose a narrow read-only wrapper around the existing trial-control decoder, NOT duplicate/reduce its checks or create authority.
+
+## Nominal original-event envelope
+Validate original actual event.timestamp (native Date time), instanceId='afw-release-'+bundleHash, payload SOLE {planHash:bundleHash}, exact workflowName and no schedule. Creation is within [T0+150000,T0+160000]; future/late/mutated event denies before business. Retain event object/value identity across hydration, never forge/copy a replacement event. All refs must correlate actual private plan/execution/bundle.
+Known is lib/mcp-release-runtime.mjs runKnownCancellationReleaseWorkflow({bundle,env,event,step}); it already derives end=min(policy.expiresAt,event.timestamp+70000), so hydration must count against that original envelope. A <=5s hydration parent begins before private reads and clips to that original event end; no new70s after hydration. Before handoff ensure original envelope/current source/consent still valid. Preserve existing narrower request/child/cleanup checks; ask ROOT rather than adding an unbound fifth arg or env clone if a real interface is missing.
+Call unchanged Known wrapper with EXACT four keys and SAME env/event/step. No extra stage inside its accepted18, no changing its70s/5s/20s or cancellation semantics. Pure technical output after legitimate completion is EXACT {purpose:'afw.finite-confirmation-result.v1',provenance,result}; provenance EXACT {intentId,finitePlanHash,controlHash,sourceRevision,qaVersionId,nominalId,bundleHash,preparedHash,sendHash,bindingHash,createdAt}; result is UNMODIFIED actual Known result. Do not synthesize result after throw/absence, claim late cleanup as renewed nominal authority or use an output as physical-stop/terminal proof. Add this grammar only for exact finite source/instance, preserving old/default reader behavior.
+
+## Accepted Task3 requirements
+## Task3 — real Bootstrap sleep and original nominal entry/inventory integration
+
+**Files:** create lib/mcp-qa-finite-launcher.mjs and lib/mcp-qa-finite-confirmation.mjs; modify Bootstrap/NamedConfirmation mounts, exact phase inventory consumers, finalizer CLI/fixed observer GET adapter and closed-compatibility tests. Add test/mcp-qa-finite-adoption-wait.test.mjs. Do not alter accepted business wrapper implementation.
+**Interfaces:** runPrivateQaFiniteLauncher({env,event,step}) and runPrivateQaFiniteConfirmation({env,event,step}); both source-selected only. Bootstrap operation finite_nominal_launcher, payload EXACT {operation,intentId,sourceRevision}; uses fixed namespace RPC, never Workflow ctx as storage. Nominal entry consumes C2's source-qualified original bundle, never caller policy.
+
+- [ ] Test actual GHA admit orchestration: successful seed prerequisite; operator observer absent until50s then valid;36 absolute slots/skip elapsed/no burst; clipped child near70s; zero budget; missingseed/auth/schema/unknown not benign404; noCF POST/writer lock. Require typed C2 setup completion/terminal receipt before preview; unavailable locator fails closed, no publisher implementation here.
+- [ ] Test actual exported Workflow under workerd: exact seed/ready prerequisites; prepare step success by90s; finite-launch-prepare/create retries0; sleepUntil absolute150s; replays do not repeat effects; no missing-seed polling, start alarm or GHA REST create.
+- [ ] Test nominal original event creation interval[150000,160000]+T0, wrong/future timestamp/payload/ID/source, delayed provider acceptance, queue exceeding70s and held5s/20s child boundaries. Spy only to assert SAME event reference/four keys; accepted wrapper tests verify18 original stages and cancellation behavior. Add bounded outer provenance result without mutating inner result.
+- [ ] Test full phase inventory: true source never-issued permits prelaunch absence; SEND+absence unresolved; exact launcher/observer only; both restores require nominal AND launcher terminal, QA additionally observer complete. Never-created stays admin-pending. Held D1/process/native-create writers block; all binding holders and create paths must route through journal/coordinator.
+- [ ] RED/GREEN: node --test test/mcp-qa-finite-adoption-wait.test.mjs test/mcp-qa-finite-launcher-native.test.mjs test/mcp-qa-finite-confirmation-native.test.mjs test/mcp-qa-finite-launch-inventory-native.test.mjs test/mcp-release-known-cancellation.test.mjs test/mcp-qa-finite-observer-native.test.mjs test/mcp-qa-finite-read-rpc-native.test.mjs.
+- [ ] Implement bounded passive GET-only adoption in the existing admit phase after primary seed success; retain original parent/deadline through preview and existing readiness checks. Consume C2 setup completion via fixed source dependency, not caller authority. Implement exact class dispatch and fixed source C2 context consumption; propagate original nominal parent lease across hydration before calling the unchanged wrapper. Extend provider status handling conservatively: queued/unknown/late create are unresolved, not terminal. Preserve old closed routes and rollback denial.
+- [ ] GREEN/scoped lint, report docs/superpowers/reports/2026-11-01-finite-native-launch-task3.md and ledger; commit and root review. Actual C2 attachment/private bundle/profile/full route and provider acceptance remain pending.
+
+
+
+## Adoption implementation ruling
+Primary completed-success seed-material is prerequisite BEFORE waiting; missing seed is not waitable. Original T0, adoptBy=min(T0+70000,N1-180000), max36 absolute2s slots k0..35; skip elapsed/no catch-up bursts. Last70s slot zero remaining starts no network. Child<=5s clipped SAME original end/start. Wait only exact parsed not-yet instance404 after qualifying its fixed source/definition or genuine qualified pending preview; no catch-all retry/auth/schema/source/transport uncertainty.
+Source-owned immutable setup completion context/receipt (afw.finite-policy-installed.v1) plus actual terminal succeeded instance must precede preview. If not yet a concrete owned reader, add a fixed source-only unavailable C2 dependency with refs-only identity and qualified immutable result; no caller boolean/registration. Ask ROOT for exact signature if needed. No CF create/GHA writer lock/new job/run/clock in this wait. Keep observer32-observation/one-claim budget and actual readiness validation unchanged.
+Queued/unknown native child or SEND with404 stays writer/unresolved. At canary restore nominal AND launcher must be terminal, only exact observer can remain active; QA additionally observer complete. Never-created remains admin_pending. No new cleanup proof union, nominal reset, force/restart or earlier restoration. Audit all current create/binding holders in SOURCE; actual provider-wide binding/custody acceptance is later C2 gate.
+
+## Verification/report/stop
+Cloud GitHub/Actions only, existing Node22 lockfile; no local files/deps/build, live provider/private queries, keys/scopes/permissions/OAuth/deploy/DDL/cron/Container/occurrence/Max/mainmerge. Meaningful hosted RED/GREEN named Task3 tests/affected existing tests and scoped lint, native exported Workflow/DO/SQLite/step behavior where supported, provenance/clocks/provider data explicitly synthetic. Spy only for SAME four argument references; actual existing Known tests own18-stage semantics. No unrelated full suite/C1 repetitions.
+Report docs/superpowers/reports/2026-11-01-finite-native-launch-task3.md, append finite progress ledger, exact BASE/code/docHEAD/run/job/counts/commands/output/fixture limits and remaining C2/C3/package/actual rollout gates. Temporary qualifier excluded integration. CAS/readback then STOP WRITES for fresh review. operationalReadiness=false.
+
+
+## ROOT2 pre-code clarification (Task3)
+Finite source mounts are subclasses in worker/independent-closure/finite.mjs; ordinary index.mjs dispatch remains closed/unchanged. Original event.workflowName, when present, MUST equal the fixed definition. If absent, exact source-selected class/export/fixed binding and C2 actual provider provenance qualify the definition; do not fabricate that event field or replace the original event.
+
+Fixed new C2 seam: lib/mcp-qa-finite-adoption-source.mjs exports readPrivateQaFiniteSetupCompletion({intentId,sourceRevision,parent}), default unavailable. parent is the SAME internal {check,signal,deadline}. Return EXACT {receipt,instance,observedAt}. Receipt is the EXACT installed schema in the private-policy-setup spec. Instance EXACT {definitionName,instanceId,status,sourceRevision,qaVersionId,completedAt,outputHash}; definitionName=afw-own-qa-private-bootstrap, exact computed afw-finite-policy-<setup domain hash>, status=complete, source/QA match receipt; completedAt>=receipt.installedAt and observedAt>=completedAt. outputHash=SHA256(UTF8(canonical ASCII-key-sorted JSON({status:'installed',receipt}))) without an additional domain. Successful actual setup Workflow output is EXACT {status:'installed',receipt}; producer rejects missing/extra fields and independently qualifies actual terminal/source/bindings/pointers/writers. Consumer recomputes outputHash without accepting raw output or caller authority. Missing producer never falls back to a success DTO.
+
+Order: successful primary seed before waiting; GET exact observer first. Qualified absence may wait while attended setup proceeds. Once observer exists, qualify typed completed setup BEFORE preview; missing/running/unknown setup immediately denies, not waitable. Only qualified pending preview can wait afterward. Preserve original70s/5s/36 absolute slots and observer32 budget.
+
+### ROOT3 fixed missing-instance grammar
+Root performed ONE read of the fixed AFW Bootstrap definition and ONE GET of never-created sentinel afw-own-schema-missing-20261101 on 2026-11-02T01:34:31.058Z (1Nov22:34ART). Actual response404: {success:false,messages:[],errors:[{code:10400,message:'workflows.api.error.instance.not_found'}],result:null}. This is dated grammar evidence only, not current module/role/other-instance absence proof. Implementer performed no provider probe.
+Whitelist ONLY that code/message pair at the exact expected instance URL AFTER actual fixed definition/module/source qualification. Require own-data envelope EXACT success/messages/errors/result; successfalse,resultnull,messagesempty,ONE exact code/message error. Read404 body bounded<=2048bytes within the original request/adoption budget. Unknown/auth/schema/other-definition/extra/oversized/generic404 denies, never catch-all retry. No raw body logging. Placeholder10203 is synthetic and rejected.
+
+### ROOT5 mandatory C2 writer-settlement gate
+Task3 exact nominal AND launcher terminal consumption is necessary, not sufficient for actual local/provider quiescence. C2's unavailable fixed native constructor must later own actual ctx/env/opaque launch context and parent, bind primaryRead/readFinalPrimary, and hold/observe Task1 coordinator plus durable SEND/ACK and actual unique nominal source/terminal outcome. Any held/unknown native-create callback/storage/provider work blocks positive restore. ACK/404 is not settlement. Keep native-create lineage a separate internal actual observation; do not add a fake process receipt, new proof union, max3 change, boolean authority or storage-keyed coordinator. C2 Task5 owns the actual barrier integration and held-create tests. This task qualifies source status consumers, not full actual writer-settlement acceptance.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task1.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task1.md b/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task1.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task1.md
@@ -0,0 +1,85 @@
+# Private policy setup Task1 — strict records, selection and effect journals
+
+SOURCE ONLY. Root-dispatched implementer; no subagents. Read this brief, then Shared exact interfaces/types and Task1 of ../plans/2026-11-01-finite-private-policy-setup.md, plus record/state sections of ../specs/2026-11-01-finite-private-policy-setup.md. Preserve root's scoped implementer -> fresh reviewer -> next-task method. Root assigns actual branch/qualified BASE after Native5; never edit another active writer or execute from this older docs baseline.
+
+## Deliverable and boundary
+
+Implement strict private record codecs, explicit sourceM selection/binding and native append-only journals. They retain facts only: no caller boolean/record/hash creates owner authorization or a send capability. Actual Access/owned-primary producers arrive Task2; publisher/stages Task3; post-T0 source Task4; full mounts Task5. Do not install placeholder factories or public registrations to obtain a positive test.
+
+Create:
+- lib/mcp-qa-finite-preparation-records.mjs
+- lib/mcp-qa-finite-preparation-store.mjs
+- lib/mcp-qa-finite-policy-journal.mjs
+- test/mcp-qa-finite-preparation-records.test.mjs
+- test/mcp-qa-finite-preparation-store-native.test.mjs
+- test/mcp-qa-finite-policy-journal-native.test.mjs
+- test/fixtures/finite-preparation-store-worker.mjs
+
+No existing product entrypoint/profile/OAuth/metadata validator changes in this task. Synthetic fixture Worker mounts actual journal/store modules in Miniflare SQLite DO storage; it is test-only and excluded from product bundles. No production authority escape.
+
+## Interfaces
+
+Implement encodeFinitePreparationRecord(kind,value), decodeFinitePreparationRecord(kind,text), hashFinitePreparationRecord(kind,value). kind is a fixed source enum for the plan/spec record types; exact fields/domains/private size caps, no arbitrary schema argument. Canonical decode must reject duplicate keys, unknown fields/accessors/prototypes, invalid hashes/times/IDs and oversized data.
+
+createFiniteOwnerPreparationStore({storage,now}) exposes the exact plan signatures for putPreconnection, putTicket, consumeTicket, putLink, publishSelection, bindSelection, putContext, readSelected and readContext. Publish preparation+selection+head-CAS atomically. Binding is once-only against exact selected hash and originalT0; no fallback/latest scan, no finite HEAD.
+
+createFinitePolicyEffectJournal({storage,identity,now}) exposes issue(send,lease), acknowledge(ack,lease), finish(receipt,lease), markAdminPending({reasonCode,observedAt},lease), read(lease). identity is the plan's strict connection/policy union, not arbitrary storage key. Upload/activation records remain distinct; final completion requires acknowledged actual predecessors. No predicted ACK or force/refund/reset.
+
+Lease={signal,assertCurrent}; queue time included and assertions before/after awaited operations and transaction boundaries. Source adapters later supply the actual parent lease; a pure test lease does not qualify deployed source. MutationObservation/ReadObservation and all field/nullability rules are exactly the plan. Never return executable:true or callback authority. Admin-pending keeps existing issued writers visible.
+
+## Meaningful TDD
+
+1. Add named RED cases:
+   - rejects_noncanonical_private_record_and_future_ack: exact schema/hash/domain/bounds; no raw credential/JWT/cookie fields.
+   - selection_cas_one_winner: two actual native concurrent selections; exactly one expected-head CAS succeeds, history preserved.
+   - selection_changed_after_T0_no_fallback: select away/back; bind old intent rejects despite same prepId.
+   - preparation_cannot_bind_second_intent: original binding remains byte-identical.
+   - consumed_ticket_is_not_refunded: competing consumption/lost ACK never creates a fresh ticket.
+   - lost_issue_ack_retains_issued: inject lost response AFTER actual native commit; reconstruct/read sees issued, repeated issue reports existing, not new.
+   - activation_requires_actual_upload_ack: fabricated future/wrong-version/hash ACK and late ACK rejected.
+   - admin_pending_keeps_outstanding_send: timeout/conflict changes no prior claim/receipt/history; read never labels unknown work settled.
+   - records_do_not_touch_runtime: no transport/Workflow/finite-HEAD side effects; actual T1 modules have no production mounts.
+2. Run hosted focused command and preserve the behavioral failing run/commit. Do not count missing dependency/syntax/fixture wiring as RED.
+3. Implement exact transaction/codecs minimally; freeze returned data without rewriting callers' env or accepted history. Unknown storage ACK remains uncertain. No business producer or provider access.
+4. GREEN same focused command; scoped lint; verify fixture disposal and no private data in output. Native fixtures, clocks/authority and external boundaries are explicitly SYNTHETIC.
+5. Commit report/ledger and stop writes for root fresh review. Do not implement the next task.
+
+## Commands and evidence
+
+Cloud GitHub/Actions only, Node22:
+npm ci --ignore-scripts --no-audit --no-fund
+node --test test/mcp-qa-finite-preparation-records.test.mjs test/mcp-qa-finite-preparation-store-native.test.mjs test/mcp-qa-finite-policy-journal-native.test.mjs
+npx eslint lib/mcp-qa-finite-preparation-records.mjs lib/mcp-qa-finite-preparation-store.mjs lib/mcp-qa-finite-policy-journal.mjs test/mcp-qa-finite-preparation-records.test.mjs test/mcp-qa-finite-preparation-store-native.test.mjs test/mcp-qa-finite-policy-journal-native.test.mjs test/fixtures/finite-preparation-store-worker.mjs
+
+No local code/deps/build, provider/private GET, tokens/keys/roles/OAuth, DDL, deployment, live comment, protected preservation stage or actual occurrence. Temporary no-secret qualifier is branch-only/excluded integration. No root full-suite rerun for this isolated data/journal task.
+
+Report docs/superpowers/reports/2026-11-01-finite-private-policy-setup-task1.md and append docs/superpowers/progress/2026-11-01-finite-native-confirmation-cleanup.md. Record BASE/code/docHEAD, RED/GREEN exact commands/runs/jobs/counts, affected paths, native fixture limitations, source boundaries, remaining tasks/gates, expected-head CAS and exact readback. Return DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED; stop for review.
+
+Global timing remains connection<=15min, original requests<=30s/children<=5s; commandBy=min(actual expiries)-480s-30s; post-T0 setup50/adoption70/ARM90; Known4args/18stages/70s/5s/20s/history unchanged. C1 finite OAuth/monitoring remain closed: Task1 is not an MCP route, full package or runtime acceptance. Publisher metadata candidate05718105... is not proof of stored-secret identity or uploadability. operationalReadiness=false.
+
+## Root execution clarifications after Native5
+
+Task3 is accepted only when its fresh review is clean; use the BASE explicitly assigned by root, not this document's historical design source. Native5 source-only factories still fail closed; this task installs none. The accepted original strict finite-plan decoder is now exported read-only by lib/mcp-qa-finite-trial-control.mjs; reuse existing schema/field algorithms wherever this task consumes legacy/module/configuration structures. Ask root only for a concrete missing exact contract, not a routine design preference.
+
+Record codecs validate exact canonical shape and internal correlations available in that record. Cross-record and current-time assertions (for example an ACK cannot predate its actual SEND, exceed its issued deadline, or be in the future of the journal's actual now) belong to the source-fixed journal/store transaction with the supplied lease; do not smuggle a caller current-time/authority field into the exact schemas. A record's cryptographic digest remains data, never an authenticated capability. Preserve ambiguous committed storage work as uncertain and reconstructable; never retry a remote effect from a journal result.
+
+The original owner flow must separately explain configuration preparation, READ/notices and the synthetic known-goal Save; Task1 does not implement those actions or fabricate their proof. Actual full writer settlement/source/provider/custody/profile/business route acceptance remain later gates. The temporary branch qualifier must be narrowed to this task, excluded from integration, source-only with contents:read/no secrets/artifacts/deploy, and documentation-only commits must not repeat its test run.
+
+
+## Root C2 Task1 exact-contract rulings (2026-11-02, before implementation)
+
+Source-only BASE 6c3b0f951d2c7a63cbf9abfd4aea81222bf1cd9a. Root approved narrow read-only validatePrivateQaFiniteLegacy({legacy,T0}) in mcp-qa-finite-trial-control.mjs, factoring the exact existing previous-field/hash/source validator and reusing legacy(plan,T0); exact own-data pair, immutable legacy only. No fabricated full plan/weaker duplicate; old finite-control native command joins GREEN. Baseline/rollback module is actual validateFiniteModule EXACT {name,sha256,bytes}; exports belong to configuration.exports/profile qualification, never a fourth descriptor field. Configuration is checked with actual activationConfigurationHash (seven keys, secret_text name/type only) AND separately fingerprinted with restorationConfigurationHash. Full source/binding correctness remains T3/T5.
+
+GrantLink and NoticeLink keep exact spec field lists WITHOUT purpose/selfhash. Their digest domains are afw.finite-grant-link.v1 and afw.finite-notice-link.v1 plus newline plus ASCII-key-sorted canonical full record. ConnectionRef map likewise has no purpose/selfhash; domain afw.finite-connection-ref.v1. Other record domains use actual purpose and exclude only their named selfdigest. Root accepted explicit fail-closed RED shells with actual SQLite mounts and behavioral assertions; missing dependencies/syntax/mounts are not qualifying RED. No positive authority placeholder.
+
+
+Root C2 Task1 additional exactness ruling: policies has exactly AFW_DOSSIER_EVENTS_POLICY, AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY, AFW_DOSSIER_RETIREMENT_POLICY, AFW_DOSSIER_SUCCESSOR_POLICY, AFW_OAUTH_PILOT_CLIENT_ID and AFW_OAUTH_PILOT_PROJECT_ID. Project digest is SHA256('afw.finite-owner-project.v1\n'+ASCII-canonical exact {projectId,revision,synthetic}). Standalone ConfigurationApproval checks digest shape; embedded OwnerPreparation checks exact project digest/source/goal. Optional narrow hashFiniteOwnerPreparationProject factual helper confers no authorization. Preconnection approvalHash remains a T2 source correlation to actual stored ConfigurationApproval.
+
+
+Root C2 Task1 identity ruling: Failure.identityHash and journal key derive SHA256('afw.finite-policy-effect-identity.v1\n'+ASCII-canonical EXACT validated identity union INCLUDING kind/effect). Connection union is {kind:'connection',preconnectionId,sourceRevision,stage,effect}; policy union is {kind:'policy',intentId,sourceRevision,setupInstanceId,effect}. Sibling upload replaces only effect with literal upload and hashes same union/domain. No caller key or omitted dimension; afw.finite-connection-stage.v1 remains separate. Shared factual identity helper may be exported; digest never creates send authority. Unknown/late SEND remains outstanding.
+
+
+Root C2 Task1 program provenance ruling: OwnerPreparation.sourceRevision and approval.sourceRevision are runtime/sourceM and MUST match. programContext.sourceRevision is the actual program revision, potentially distinct from M; T1 checks 40hex plus programHash/originalContextHash shape. T2/T4 must correlate all three values with current primary program and exact selected project/goal. No equality to runtimeM, substituted current program or synthesized source authority.
+
+
+Root C2 Task1 actual publication chronology ruling: append private source-owned {selectionHash,publishedAt} witness under sourceM/selection-derived key, without public schema/API changes. Sample publishedAt AFTER the atomic preparation+selection+head-CAS transaction promise successfully settles, with original lease assertions before/after. A second append-only transaction is allowed; recorded requires witness ACK and exact readback. Missing/uncertain head/witness => uncertain factual state; preserve history/head and never reconstruct/manufacture/backdate a witness. Binding requires exact current selection plus durable witness selectedAt<=publishedAt<=originalT0. Delayed witness storage never pretends a head ACK happened earlier. No reset/refund/rollback/authority. Cover actual backdated publication, original transaction held acrossT0, lost head/witness ACKs with focused hosted RED/GREEN.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task2.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task2.md b/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task2.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task2.md
@@ -0,0 +1,142 @@
+# Private policy setup Task2 — actual Access owner and genuine consent links
+
+SOURCE ONLY. Root will assign qualified BASE after C2 Task1 review; do not start from a historical docs commit. No subagents or self-appointed reviewer. One writer on branch; expected-head CAS/readback. Read this brief first, then only the exact interfaces/records of the accepted C2 spec and Task1 report needed for this integration.
+
+## Global constraints
+
+- Source-only cloud work. No provider/private read, secret value, role/key/scope, OAuth action, deploy, DDL, live comment, occurrence, local dependencies/build or automatic recovery.
+- Original connection window<=900000ms; each request parent<=30000ms including queue, child<=5000ms clipped by parent/window. commandBy=min(actualReadExpiry,noticeExpiry,AccessProofExpiry,approvalExpiry,connectionWindowEnd)-480000-30000. Never renew ten-minute grants.
+- Post-T0 setupBy=T0+50000; adoption70s/ARM90s; original Known4args/18stages/70s/5s/20s and C0/C1/R1/history/uncertainty unchanged. No finite HEAD before all actual read-only eligibility checks.
+- PREPARATION uses real qualified Access realm/limiter/client/project/window bindings and independent profile grammar. C1 finite profile keeps OAuth/monitoring-owner closed and currently lacks those Access bindings. Never fake env flags or claim it already handles MCP.
+- Raw policy/context/JWT/cookies never logs/GHA/public artifacts; JWT/cookies never persist. Secret inheritance EXACT {name,type:'inherit',version_id:baselineVersionId}; no old_name/latest/omission/script-upload substitution.
+- Initial preparation publication, custody/API permission, actual baseline bytes/privacy and future runbook approval remain gates. Root's20:39:33.726UTC historical version GETs prove shape only: QA31bindings/14false/two SQLite classes; canary29/8false/AfwOwnEventNodeSQLite/container execution; OP7/3false/no export. They prove no current pointer/source lineage/secret value/artifact availability. Qualify actual copy descriptors before use.
+- Publisher metadata candidate only: root 20:45:01.750UTC exact-name account token 05718105dcdfc92e55cc3624172c2740, notBefore2026-10-28T03:00:00Z, expiry2026-11-03T02:59:00Z; one allow group 7e79ec33834341f28dd431ab73884400 on fixed canary script7d96bc137a854faa875ee0f160119810. AFW_MCP_CLOSURE_PUBLISH_TOKEN secret match/uploadability UNPROVED; future correct account verify and dated-policy trust mandatory, scopeVerified=false. Never substitute GHA9db or reader9aa; no repeat probe here.
+- operationalReadiness=false. No additional namespace, credential, public QA ingress or general URL/RPC authority.
+
+
+
+## Task2: actual Access owner selection and genuine consent links
+
+**Create:** lib/mcp-qa-finite-owner-preparation.mjs, lib/mcp-qa-finite-owner-http.mjs; test/mcp-qa-finite-owner-preparation-native.test.mjs.
+**Modify:** scoped source integrations in lib/delegated-oauth-worker.mjs and lib/dossier-monitoring-owner-http.mjs, preserving ordinary flows/default closure.
+**Consumes:** T1; verifyCloudflareAccessJwtWithExpiry; createDelegatedOAuthStore(db).getGrant; createDelegatedProjectRepository({db,grantStore}).getOwnedProject; lib/dossier-monitoring-authority.mjs recordDossierMonitoringConsent.
+**Produces:** createFiniteOwnerPreparationHost({ctx,env}).fetch(request)->bounded Response; internal readFiniteOwnerPreparation({ctx,env,sourceRevision,intentId?,signal})->{preparation,selection,binding}|throw. Constructors resolve fixed source dependencies, not caller verifier/pins. Internal recordFinitePreparationGrant({ctx,env,request,grantId},lease) and recordFinitePreparationNotice({ctx,env,request,requestId,sequence},lease) return MutationObservation; request is the bounded preserved original request, other fields actual server-created grant/ack values. They reconstruct/link exact transaction evidence and fresh primary rows, never accept arbitrary external DTOs.
+
+- [ ] RED with real signature-verified synthetic JWT/JWKS and actual ephemeral D1: source/audience/owner/origin/cookie/ticket mismatch; no grant needed for initial owned-project choice; exact newly accepted grant versus latest; consent/notice revocation; sourceM pointer changed; raw IDs rejected.
+- [ ] Implement fixed /connections/finite-prepare request grammar and plain human purpose/bounds. QA independently verifies forwarded original request; source-qualified binding holders only. Every logical primary read uses fresh db.withSession('first-primary'); do not mistake listConsentProjects ORDER BY for selection.
+- [ ] Add fixed source calls after genuine createGrant+completeAuthorization success and after acknowledged monitoring consent. Produce GrantLink/NoticeLink only from original transaction plus exact current primary reread; no generic success callback/registration. Monitoring acknowledgement contains sequence/action/expiresAt, not eventHash: compute eventHash from the exact requestId/sequence primary row. Link failure keeps setup unavailable; never repeat grant creation or change ordinary consent/revocation semantics. Existing functions validate/create genuine consent, not provisioning. Missing publisher stage remains unavailable, not simulated success: Task2 tests prove authentication/records, not publication; Task3 supplies the fixed producer without caller registration.
+- [ ] GREEN T2 and existing OAuth/monitoring native suites; scoped lint; fresh review. Ordinary read permission never becomes configuration authority.
+
+
+
+## Root carry-forward
+
+- Task1 records/journals are factual only. Actual request signature/audience/expiry, current owned synthetic project, source, bounded ticket and exact primary records are required by this source constructor. Record/selected/installed/hash are never authority.
+- Read the actual Task1 accepted report/brief for strict enum/hash/domain/nullability/lease interfaces; do not redefine weaker schema/hash algorithms. Project digest helper correlates exact {projectId,revision,synthetic}, not browser labels/latest rows.
+- Initial owned-project selection needs NO existing OAuth grant. Genuine read-consent completion and genuine monitoring acknowledgement alone produce exact grant and notice links, after independent primary re-read; link failure leaves flow unavailable and never repeats grant creation. Do not use latest grant, eventHash from a nonexistent acknowledgement field, identity DTO or server success boolean.
+- Keep actual Access assertion/cookie transient. Never store/log/artifact JWT/cookies/credentials or expose raw owner/project/grant IDs in new public output. Server-issued opaque handles do not mint permission. Original same-origin request has bounded body and original lease across forwarding; QA independently verifies it. Fixed actor/source-qualified binding only; no URL/target injection/public general QA ingress.
+- The user sees plain purpose/next step and separate controls for bounded configuration preparation, reading and notices; describe the original one known-goal Save as a distinct action in its authorized rehearsal configuration/runbook. READ never becomes edit permission. No surprise publish or invented real-user choice; this remains own-synthetic preparation.
+- Source producers missing publication/baseline/material/custody qualification remain unavailable until their owning task. T2 proves actual signature/primary/record linking in synthetic native fixtures, not installed code/policy/receiver/runtime or PC-off. No positive runtime authority placeholder or caller-selected factory.
+
+## Evidence and finish
+
+Hosted Node22 existing lockfile only. Genuine behavioral RED then GREEN for Task2 plus existing OAuth/monitoring/access-expiry commands in plan, scoped lint. No local project/deps/build, provider/private probe, secrets/roles/token/OAuth actions, DDL/deploy, command/finite HEAD/occurrence, main merge or Max. Temporary branch qualifier narrowed to covering commands/no secrets/artifacts/deploy, excluded eventual integration; docs-only changes don't repeat runs. Report docs/superpowers/reports/2026-11-01-finite-private-policy-setup-task2.md, append existing finite progress ledger, include exact BASE/code/docHEAD/runs/jobs/attempts/counts/commands/fixtures/source boundaries/CAS/readback; stop writes for root fresh task review. operationalReadiness=false.
+
+## Targeted dependency inspection at Task1 BASE
+
+Existing verifyCloudflareAccessJwtWithExpiry returns immutable identity {subject,email,expiresAt} from the SAME verified signature payload; ordinary verifyCloudflareAccessJwt has a different userId shape. Use the expiry helper's actual subject, never guessed aliases. Existing delegated-project-repository getOwnedProject returns id/userId/revision/intake but no synthetic marker. Consequently an owned row or synthetic-looking title alone does not prove synthetic scope: require the actual source-qualified own-synthetic project pin/program provenance, and fail unavailable when absent. listConsentProjects ordering is enumeration only, never implicit selection; every logical read gets fresh first-primary.
+
+Existing monitoring acknowledgement is {status:200,sequence,action,expiresAt}; exact requestId/sequence primary event supplies eventHash, not an invented acknowledgement member. Preserve its original one-grant/terminal-revoke/current revision/commit window rules. No new table/DDL or broad query/other-project output for these integrations.
+
+Targeted OAuth integration warning: current successful completeAuthorization lives inside a catch that revokes the just-created grant on an authorization failure. A new preparation-link failure must NOT accidentally enter that existing revoke path, repeat createGrant/completeAuthorization, change the ordinary302 or manufacture a link. Isolate preparation-link unavailability as its own factual pending result after genuine success and exact primary correlation, under the original bounded request; ordinary unrelated consent remains unchanged. Monitoring likewise links only an actual acknowledged grant action and exact event, never a failed write/revoke as a new permission. Cover link failure/reconstruction with real existing consent history unchanged.
+
+## Accepted T1 exact source interface
+
+C2/1 accepted at7b2e448b4ddf0d4765de4eff93045c77642e366b after one review fix. Actual fixed PascalCase record kinds are in preparation-records.mjs; reuse encode/decode/hashFinitePreparationRecord and factual hashFiniteOwnerPreparationProject/validateFinitePolicyEffectIdentity/hashFinitePolicyEffectIdentity. createFiniteOwnerPreparationStore({storage,now}) owns source-derived keys, original lease and after-head-ACK witness. No direct caller-selected storage path or bypass of publishSelection/bindSelection; readSelected and recorded/existing/uncertain are factual, not a send capability. Original user-authority producers must supply real native ctx/env/storage and a source-owned actual clock/lease, not caller values. Source program revision can differ from runtimeM but both correlate actual immutable/current program evidence. Any extra exact record/mapping/source interface required for real initial project selection must be raised concretely to Root and ruled before implementation; do not silently invent a positive authority registry or latest lookup.
+
+Report final STOP WRITES after CAS/readback. Root owns a fresh task-scoped spec+quality review. Owner is asleep; do not open any actual auth/consent/request window or ask the owner to intervene during this source task.
+
+
+## Root Task2 contract amendment — proposed exact table, validation pending
+
+SOURCE ONLY; documentation gate before product edits. BASE `270ef346ac5e87cec87aa4ea7de0527e3f75a826`. Root approved the direction, factual maps/store extensions and digest identities below; the exact source tuple and remaining correlation subsets in this table require Root's immediate validation. No provider/owner action is required. operationalReadiness=false.
+
+Notation: C is the existing strict ASCII-key-sorted canonical serializer; D(domain,value)=SHA256(UTF8(domain+"\\n"+C(value))). Exact means no unknown keys, getters/prototypes or mutable retained input. Existing record codecs and time/ID/hash limits apply. All returned records are immutable own-data copies; digests correlate facts only.
+
+| Contract | Exact tuple/subset and rules |
+|---|---|
+| Fixed source module | NEW `lib/mcp-qa-finite-owner-source.mjs`, `readPrivateQaFiniteOwnerSource({ctx,env,parent,preconnectionId})`; preconnectionId is null for initial choice or the exact 64hex ID resolved from the verified server mapping, never a body raw ID/latest lookup. parent is the same original lease. Production resolver throws unavailable until T3/T5 implement actual qualification; no registration, caller verifier/pins/callback, env true-flag clone or success object. |
+| Proposed source tuple | EXACT `{sourceRevision,actorId,qaNamespaceId,origin,phase,access,clientId,resource,project,goal,programContext,initialBaseline,currentPublication,window}`. sourceRevision40hex; actorId64hex must equal actual native ctx.id; qaNamespaceId32hex must match the fixed actual existing QA namespace/binding holder; origin exactly `https://delegated-canary.agentfriendlyweb.dev`; resource exactly origin+`/mcp`; phase enum `closed_ui\|read_consent\|notice_consent\|finite_prearm` (the last denotes the separately qualified finite profile, not a fourth PREPARATION template); access EXACT `{teamDomain,audience}` with existing Access grammar and private-qualified actual values; clientId existing exact qualified client; project EXACT `{projectId,revision,synthetic:true}`, ONE source-qualified own-synthetic pin; goal discovery/content; programContext EXACT existing `{programHash,sourceRevision,originalContextHash}`; window EXACT `{startedAt,expiresAt}`, integer milliseconds, original positive span<=900000. No live source assertion comes from this tuple's shape or fixture. |
+| Initial versus current provenance | initialBaseline EXACT `{versionId,deploymentId,moduleHash,configurationHash,bindingsHash}`, UUIDs and64hex hashes; immutable initial PREPARATION baseline committed by preconnection.baselineHash. currentPublication EXACT `{stage,versionId,deploymentId,receiptHash}`; stage null/connection/notices/finite, receiptHash null only for initial closed_ui, otherwise the exact acknowledged ConnectionReceipt hash. closed_ui requires current initial UUIDs; read_consent/notice_consent/finite_prearm require corresponding connection/notices/finite stage. Later stages may legitimately have different pointers. Fixed resolver must qualify exact append-only stage chain/current pointer and recoverable material under T3/T5; never rewrite/recompute initialBaseline after transition. Original programContext remains fixed; fresh current primary qualification must match it, not replace it. Within one original request, every re-resolution must preserve its complete source snapshot; across requests only separately qualified stage progression may differ. |
+| Native dependencies and freshness | Source resolves actual env.DB, ctx.storage and fixed limiter/bindings, never body DTOs. Source tuple contains no native handles, credentials, arbitrary URL, source bytes or callback. Host independently checks native ctx/storage, resolves fixed source before use, uses actual original bounded request, signature-verifies Access with fixed audience and freshly compares source around asynchronous work. Every logical D1 read constructs a NEW db.withSession('first-primary'); no fallback to cached session, latest row, list ordering or guessed synthetic title. getOwnedProject must match actual Access subject and exact source project/revision without any OAuth grant. Missing source/publication/custody/material/provenance stays unavailable. |
+| Clock, body and URI grammar | Source-owned Date.now plus monotonic performance.now; original parent<=30000ms from request receipt including queue; each child<=5000ms clipped by parent/window, checks before/after awaits, abort propagation and bounded response. GET/POST ONLY fixed origin+`/connections/finite-prepare`, no query/hash/path selector. POST exact URL-encoded fields `{handle,projectRef,decision}`, handle/projectRef random32-byte lowercase hex, decision approve; max1024 UTF-8 bytes and duplicate/unknown fields rejected. POST Origin must exactly equal origin; exactly one `__Host-afw-finite-prepare` cookie equals handle; cookie Secure/HttpOnly/SameSite=Strict/Path=/ and original expiry. Raw project/owner/grant IDs never accepted or emitted by new HTTP surface. Original forwarded method/URL/headers/body are bounded and preserved transiently; QA independently verifies, never trusts identity DTO. |
+| Realm, subject and ticket correlation | accessRealmHash=D(`afw.finite-access-realm.v1`, EXACT `{teamDomain,audience,origin}`); subjectHash=D(`afw.finite-access-subject.v1`, EXACT `{accessRealmHash,subject}`). ticketHash=existing SHA256(UTF8(actual random handle)); only its digest is stored. csrfReceiptHash=D(`afw.finite-preparation-decision.v1`, EXACT `{ticket,decision,projectHash,goal,clientId,approvedAt,expiresAt}`), where ticket is the entire exact validated original T1 Ticket, decision approve, projectHash the exact mapped project digest, goal the qualified explicit discovery/content goal, clientId the exact source client; approvedAt/expiresAt are fixed original decision times. ticket.action is connection/notices/finite, never null; ticket.connectionRef null ONLY for connection; projectHash and goal are NEVER null for any action. No future TicketUse/approval hash/output enters this digest. TicketUse.recordHash equals this decision digest; actual durable consume ACK and exact TicketUse readback are required BEFORE recording ConfigurationApproval with the same csrfReceiptHash. This is factual correlation, not new permission; same-origin cookie verification remains required. No raw JWT/cookie/handle persistence or logging. |
+| ProjectRef factual map | APPROVED EXACT `{projectRef,preconnectionId,subjectHash,sourceRevision,projectId,revision,issuedAt,expiresAt}`, no purpose/selfhash; D(`afw.finite-project-ref.v1`, whole record). Both opaque IDs random32-byte64hex, time span positive<=900000 and within original source/Access window. Initial GET appends map+Ticket before emitting handle; no Preconnection/grant required for owned choice. Source pin, actual owned primary and map revision must match at POST; map is never authority. |
+| ConfigurationApproval and Preconnection | Reuse exact T1 records/hashes. POST explicit approve fixes the decision digest, consumes the original ticket for that digest with durable ACK/readback, then records ConfigurationApproval keyed by its existing hash and records Preconnection using SAME preallocated preconnectionId, initialBaseline hash, verified owner and exact project. approvedAt/startedAt sampled from source clock at actual decision, expiresAt bounded by original map/ticket/source window and verified Access expiry; never renew GET window on POST. No stage publication/selection is manufactured; absent Task3 producer returns factual pending preparation. |
+| AuthorizationLink factual map | APPROVED EXACT `{preconnectionId,authorizationHash,subjectHash,sourceRevision,projectRef,clientId,resource,issuedAt,expiresAt}`, no purpose/selfhash; D(`afw.finite-authorization-link.v1`, whole record). authorizationHash=existing OAuth SHA256(UTF8(actual transaction.handle)), EXACT delegated_consent_sessions.handle_hash. Fixed source integration after genuine successful beginConsent and actual consent-row insertion, with original independently verified prep cookie/ticket and current preconnection; before form is delivered and before completion. No arbitrary callback/registration. A missing link cannot be inferred later from matching subject/project/time or a newer grant. Original prep ticket consumption remains linked to the approved preconnection; it is not consumed again as fresh approval. |
+| OAuth grant identity and consumed consent | grantHash=existing finite SHA256(UTF8(actual server-created grantId)), unchanged algorithm. consentHash=D(`afw.finite-read-consent.v1`, EXACT `{handle_hash,user_id,kind,project_id,client_id,resource,scopes,expires_at,consumed_at}`) from fresh exact primary delegated_consent_sessions row by original authorizationHash; scopes is parsed original ordered unique allowed string array (no text formatting dependency), kind authorize, consumed_at nonempty, both times strict canonical ISO; subject/client/resource/project match link+source+new grant. Grant is separately reread by EXACT supplied server-created grantId, active/nonrevoked/read scope/unexpired, no latest or time-only mapping. Actual createGrant+completeAuthorization success is required; hash/row alone does not establish it. |
+| Monitoring event and notices identity | eventHash=D(`afw.finite-monitor-consent-event.v1`, EXACT `{grantId,projectId,subject,clientId,resource,revision,action,purpose,requestId,sequence,issuedAt,expiresAt}`), fields mapped from exact fresh primary dossier_monitoring_consent_events row selected by actual acknowledged requestId AND sequence, same exact linked grant/project/subject. action must grant; purpose `afw.dossier-monitoring.v1`; current primary must independently show no terminal revoke, unchanged owner/revision and active original read grant. noticesHash equals this ORIGINAL grant-event eventHash. Existing acknowledgement is only `{status,sequence,action,expiresAt}`, no eventHash. Existing monitoring permissionRef/hash algorithm stays unchanged. |
+| Preparation baseline and existing facts | baselineHash=D(`afw.finite-preparation-baseline.v1`, whole exact initialBaseline). Project hash remains hashFiniteOwnerPreparationProject; GrantLink, NoticeLink, ConnectionRef and all existing record hashes remain T1 algorithms. New hash functions validate exact inputs and never confer source authority. GrantLink authorizationHash is original OAuth handle digest, grantHash as above, acceptedAt actual source clock after successful completion and fresh reread; NoticeLink uses same grantHash plus exact eventHash/sequence and actual acknowledged fresh reread. ConnectionRef is generated only after genuine successful grant and link ACK/readback; no generated ref manufactures consent. |
+| T1 store extension methods | APPROVED `putProjectRef(record,lease)`, `readProjectRef({projectRef},lease)`; `putAuthorizationLink(record,lease)`, `readAuthorizationLink({authorizationHash},lease)`; `putConfigurationApproval(record,lease)`, `readConfigurationApproval({approvalHash},lease)`; `putConnectionRef(record,lease)`, `readConnectionRef({connectionRef},lease)`; `readPreconnection({preconnectionId},lease)`, `readTicket({ticketHash},lease)`, proposed narrow `readTicketUse({ticketHash},lease)` for mandatory consume ACK/readback, `readLink({kind,preconnectionId},lease)` with kind grant/notice. Source-derived immutable keys respectively `owner-project-ref:<projectRef>`, `connection-authorization:<authorizationHash>`, `connection-approval:<approvalHash>`, `owner-connection-ref:<connectionRef>`; existing preconnection/ticket/link keys unchanged. Writes return T1 MutationObservation; reads exact `{status:'observed'\|'absent',record:immutable\|null}`. Validated immutable argument snapshots before awaits; append-only exact replay, no path/key/index API. |
+| Integration failure semantics and remaining gates | Preserve ordinary OAuth success/revocation. Genuine completeAuthorization catch remains scoped to that genuine authorization failure; preparation linking is an independent try/catch AFTER success, unchanged302 and no repeat grant/revoke on link failure. Monitoring links only actual acknowledged grant action; failures never manufacture link, alter consent history or turn revoke into permission. Source/T3/T5 missing => pending/unavailable. readFiniteOwnerPreparation requalifies exact current source+selected/bound record and exact primary evidence; no record-selected-installed flag grants authority. Task3 owns publication stages, Task5 actual source binding/profile/module/program qualification and mounts. |
+
+Test boundary: positive native fixtures may statically replace ONLY the fixed owner-source module during test bundling with an explicitly SYNTHETIC source tuple/qualification implementation. Product resolver remains unavailable; no production registration or fixture fallback. Real request grammar, JWKS signature verification (remote JWKS served by synthetic test network), native D1/SQLite and factual store methods remain exercised. Add affected T1 records/store suites to T2 coverage. Genuine behavioral RED precedes implementation; syntax/dependency/mount failures are not RED. No provider/private read, credentials, real OAuth/consent/window, DDL/deploy, local source/deps/build or owner intervention.
+
+This amendment does not authorize implementing an unvalidated tuple. STOP product writes until Root validates this exact table. Documentation-only commit needs no test run.
+
+
+## Root validation of Task2 amendment — corrections accepted before product work
+
+Root validated the preceding exact table at6b450267 with these binding corrections. These supersede only the conflicting proposed entries; all other exact fields/domains/chronology are approved. Source BASE remains270ef346; this is documentation-first correction, not runtime authorization.
+
+- Add `qaVersionId` UUID to EXACT source tuple and compare actual native `env.QA_VERSION.id`. Namespace identity does not establish current QA version. T3/T5 must prove actual source/module/bindings/current pointer.
+- QA DO primary project/grant/consent/program reads use actual `env.RELEASE_DB`, the existing canary release D1 binding; NEVER QA `env.DB`. Ordinary canary OAuth/monitoring continue their existing env.DB. No environment alias/clone. Private preparation state uses actual ctx.storage. Missing/wrong RELEASE_DB must deny; T3/T5 verify actual binding IDs/holders.
+- Add private factual `OwnerSourceSnapshot` EXACT `{preconnectionId,initialTicketHash,source,sourceHash}`; source is the complete validated INITIAL tuple INCLUDING qaVersionId, closed_ui phase and initial currentPublication; sourceHash=D(`afw.finite-owner-choice.v1`, EXACT `{preconnectionId,initialTicketHash,source}`). No purpose/other selfhash/credentials/source bytes. Strict codecs and append-only store `putOwnerSourceSnapshot(record,lease)` / `readOwnerSourceSnapshot({preconnectionId},lease)`, key `connection-preparation:<preconnectionId>:source`, T1 observations/lease/snapshot discipline. This data never qualifies source.
+- Initial GET must obtain durable snapshot+ProjectRef+Ticket ACK/readback BEFORE emitting handle. Partial or lost ACK preserves factual writes and never implies approval. POST independently resolves current source and compares initial snapshot EXACT before approval: changed goal/programContext/initialBaseline/window/revision/QA version denies. Meaningful goal/program between-requests regressions required. Original source window cannot restart from GET/POST or stage progression.
+- Later phases may differ ONLY through separately source-qualified phase/currentPublication chain; original snapshot, project, goal, program and window stay immutable. initialTicketHash resolves original consumed configuration decision without scans/latest lookup. Later stage tickets/cookies retain exact same preconnection+ProjectRef and original window. Broad rehearsal authorization never replaces explicit displayed goal and verified configuration approval.
+- All proposed hashes/map schemas/store reads, including readTicketUse and noncircular decision digest, are approved. Actual consume ACK/readback precedes ConfigurationApproval. Existing OAuth handle/grant hash and monitoring algorithms stay unchanged.
+- Forwarding uses existing fixed QA namespace/actor through actual source-qualified binding and preserves bounded original request. Never treat canary ExecutionContext as QA DO ctx/storage; no public QA ingress, credential or generic URL/RPC. Mount/caller-holder qualification belongs T5; fixed source adapters may remain unavailable meanwhile. Positive fixture provenance is explicitly synthetic; production resolver unavailable is a mandatory later gate, not a waiver.
+
+Proceed scoped T2 TDD after this documentation commit; no further pause except concrete unresolved contract gaps. No provider/private read, credential/real OAuth/OTP/consent/window, local project/deps/build, DDL/deploy/main merge/first finite HEAD/owner request. operationalReadiness=false.
+
+
+## Root Task2 identity and forwarding ruling (2026-11-02)
+
+Final OwnerPreparation.prepId MUST equal its original preconnectionId: the SAME original server-generated random32-byte ID is reused, never newly allocated or aliased. ONE final preparation per original preconnection; source/owner/window remain unchanged. No T1 schema change/secondary index/latest scan. readFiniteOwnerPreparation resolves exact prepId keys for original OwnerSourceSnapshot, Preconnection, GrantLink and NoticeLink and requalifies current source/primary. ID equality is factual correlation only, never permission. Task3 final producer MUST retain this invariant; immutable selection/binding/history and no renewal remain.
+
+Approved fixed default-unavailable source forwarding exports: forwardPrivateQaFiniteOwnerAuthorization({ctx,env,request,authorizationHash},lease), forwardPrivateQaFiniteOwnerGrant({ctx,env,request,grantId},lease), forwardPrivateQaFiniteOwnerNotice({ctx,env,request,requestId,sequence},lease). Only actual server-success refs and bounded preserved original request; no generic RPC/URL/status/identity DTO or registration. The original lease starts at actual canary request receipt BEFORE first SDK/auth/DB IO; hooks/QA may never restart30s/5s. T5 must qualify native sender/binding/holder and original-deadline/abort forwarding, overwriting any internal transport metadata from trusted source; actual transport remains unavailable here. Canary ExecutionContext is not QA DO ctx/storage. Unrelated ordinary consent is unchanged; a failed prep hook cannot revoke completed authorization or repeat grant creation.
+
+
+## Root SameSite browser-flow correction before source hooks
+
+Keep the preparation cookie SameSite=Strict. A cross-site initial /authorize navigation may omit it; never relax it or infer preparation from subject/time. In addition to genuine beginConsent+consent-row GET mapping when the cookie is actually present, Root approves one exact same-origin POST mapping point: AFTER actual api.approveConsent(request,h) succeeds, BEFORE store.consumeConsent/createGrant/completeAuthorization. The fixed sender passes authorizationHash=existing SHA256(h); QA independently verifies original prep cookie/ticket/current source and exact still-unconsumed original consent row. Existing map is read-only/idempotent; no replacement or refreshed issuedAt. Actual SDK-approved handle plus original configuration decision establishes transaction correlation before any grant. No cookie remains ordinary OAuth without preparation success; wrong handle/source/cookie never creates a link. Mapping after grant by matching rows/time stays forbidden. Missing/failed link cannot repeat or revoke genuine OAuth completion. Real SDK/native tests must cover GET without prep cookie then same-origin POST with it; this is HTTP fixture evidence, not an actual browser session. Actual forwarding qualification remains T5 unavailable.
+
+
+## Root Task2 exact preconnection-to-connection topology (2026-11-02)
+
+APPROVED completion requirement: PreconnectionConnection EXACT `{preconnectionId,connectionRef,grantHash,linkedAt}`, no purpose/selfhash; D(`afw.finite-preconnection-connection.v1`, whole exact record). Key `connection-preparation:<preconnectionId>:connection`. Fixed store `putPreconnectionConnection({relation,connection},lease)` atomically appends BOTH relation and exact existing ConnectionRef; `readPreconnectionConnection({preconnectionId},lease)` returns ReadObservation. Same original lease, strict immutable snapshots, no generic index/scan. Actual stored Preconnection+GrantLink must correlate owner/client/project/resource/grant and original source/window; recompute existing SHA256(grantId) identity. Require relation.linkedAt>=GrantLink.acceptedAt, connection.issuedAt=linkedAt, exact connRef/grantHash, times<=actual clock and expiry within original preconnection. Source additionally clips to fresh actual grant/Access expiration.
+
+Only genuine grant producer after actual GrantLink ACK+readback may allocate the initial random32-byte ConnectionRef. First exact pair wins; competing ref cannot replace it. Unknown/lost ACK, missing one side or conflict stays pending/uncertain, never re-mints/renews from absent read after an unknown attempt. Reconstruction recovers exact paired factual records only. A GrantLink already present with absent relation is NOT a new-allocation opportunity. Reader uses exact preconnection→relation→ConnectionRef. Task3 stages MUST consume this existing immutable pair, never synthesize a newer reference, scan maps or treat the relation as permission. Native atomic-pair/lost-ACK/conflict and actual grant-producer→subsequent-stage/read tests are required; no unexplained test-seeded map stands in for the producer.
+
+
+## Task2 source completion / Root review gate (2026-11-02)
+
+Code HEAD `0bf4dc1247550ab7b71a5242d465c5905a2bc531`, tree `f136b16e5137a2f103b9838e5bcc6aeea6f7e4fc`; hosted run41383552325/job125079335946/attempt1:24native+60affected=84PASS,0FAIL/0SKIP/0CANCELLED; scoped lint0errors/0warnings, artifacts0. Full exact RED/GREEN/commands/limits: [Task2 report](../reports/2026-11-01-finite-private-policy-setup-task2.md).
+
+Actual Access signature/expiry, release-primary owner/revision, exact original transaction links, original decision snapshot and atomic preconnection→ConnectionRef facts are implemented/tested in source. The fixed owner-source and three forwarding adapters intentionally remain UNAVAILABLE until T3/T5 actually qualify source/binding holders/QA_VERSION/RELEASE_DB/module/initial baseline/current stages/program and original cross-worker deadline/abort; no registration, caller authority or runtime readiness claim.
+
+Task3 must retain original prepId=preconnectionId, initial snapshot/window/program/baseline, exact paired ConnectionRef and original grant/notice expiry; no latest lookup, re-mint after uncertain absence, or grant/permission renewal. A read grant never authorizes configuration or publication. T5 cleanup/retirement/final-primary/withdraw/close/seal/proof factories must use retained original context plus actual withdrawal/settlement; do not require the positive ACTIVE eligibility reader after authorized Save/revoke or change Native5/C0/C1/R1 controls.
+
+DONE_WITH_CONCERNS/SOURCE ONLY; fresh Root spec+quality review pending. No provider/private/auth/runtime action. STOP WRITES after final docs CAS/readback; no Task3 implementation. operationalReadiness=false.
+
+### C2 Task2 fix round 1 — Root profile-binding correction (2026-11-02)
+
+Root corrects its earlier `env.QA_VERSION.id` shorthand: the accepted source `finitePublicProfileTemplate('qaLive')` and existing native publication bridge expose the version_metadata binding `AFW_QA_VERSION`. The source tuple field remains `qaVersionId`; resolution MUST compare exclusively actual `env.AFW_QA_VERSION.id`, with no QA_VERSION alias, new binding, profile change or cloned environment. This is a plan correction based on pinned repository source, not provider observation or deployment qualification. Record as round1 finding 2 alongside the reviewer's child timeout P2. Add real native positive with only the profile-derived binding name and negative with only the obsolete shorthand; preserve original source/parent/child/signature semantics and operationalReadiness=false.
+
+### C2 Task2 fix round 1 — Root QA rate-limit binding correction (2026-11-02)
+
+Root extends the same actual-role dependency correction: `finitePublicProfileTemplate('qaLive')` declares `AFW_QA_OCCURRENCE_RATE_LIMITER`, not the canary role's `DELEGATED_RATE_LIMITER`. The private QA owner host MUST call the existing actual QA limiter directly with its existing finite-owner key. No alias, new binding/namespace, cloned environment, quota/settings or unrelated key change; ordinary canary OAuth/monitoring retain their existing DELEGATED_RATE_LIMITER. The native owner fixture takes the binding name from the accepted profile and includes a legacy-only rejection. This corrects earlier QA-role assumptions; source inspection is not actual provider/resource/holder qualification, which remains T5-unavailable.
+
+### C2 Task2 fix round 1 — final source checkpoint (2026-11-02)
+
+codeHEAD `33ade9569fe0f5d770a4ee2a9ed59cb6f68c6b22`; final hosted run41444334695/job125273592435 attempt1: 59PASS/0FAIL/0CANCELLED/0SKIP; scoped lint0/0; artifacts0. Child guard captures each operation and cannot be revived; already committed uncertain facts preserved. QA role exclusively uses existing `AFW_QA_VERSION` and `AFW_QA_OCCURRENCE_RATE_LIMITER`, with profile-derived native positive and obsolete-alias negatives. Full RED/GREEN, exact commands, CAS/readbacks and limits appended to the Task2 report and finite progress ledger. No runtime qualification; source/forwarding remain unavailable pending T3/T5. STOP WRITES after enclosing docs commit/readback; Root fresh scoped review of reviewed docHEAD3aead938..fixHEAD.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task3.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task3.md b/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task3.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task3.md
@@ -0,0 +1,149 @@
+# Private policy setup Task3 — fixed publisher and three preconnection stages
+
+SOURCE ONLY. Root assigns qualified BASE after Task2 review; no execution from old docs source. Read this brief first, then only actual accepted Task1/2 source interfaces/report and the exact pre-T0/transport/receipt sections of C2 spec. One writer, no subagents or self-appointed reviewer.
+
+## Global constraints
+
+- Source-only cloud work. No provider/private read, secret value, role/key/scope, OAuth action, deploy, DDL, live comment, occurrence, local dependencies/build or automatic recovery.
+- Original connection window<=900000ms; each request parent<=30000ms including queue, child<=5000ms clipped by parent/window. commandBy=min(actualReadExpiry,noticeExpiry,AccessProofExpiry,approvalExpiry,connectionWindowEnd)-480000-30000. Never renew ten-minute grants.
+- Post-T0 setupBy=T0+50000; adoption70s/ARM90s; original Known4args/18stages/70s/5s/20s and C0/C1/R1/history/uncertainty unchanged. No finite HEAD before all actual read-only eligibility checks.
+- PREPARATION uses real qualified Access realm/limiter/client/project/window bindings and independent profile grammar. C1 finite profile keeps OAuth/monitoring-owner closed and currently lacks those Access bindings. Never fake env flags or claim it already handles MCP.
+- Raw policy/context/JWT/cookies never logs/GHA/public artifacts; JWT/cookies never persist. Secret inheritance EXACT {name,type:'inherit',version_id:baselineVersionId}; no old_name/latest/omission/script-upload substitution.
+- Initial preparation publication, custody/API permission, actual baseline bytes/privacy and future runbook approval remain gates. Root's20:39:33.726UTC historical version GETs prove shape only: QA31bindings/14false/two SQLite classes; canary29/8false/AfwOwnEventNodeSQLite/container execution; OP7/3false/no export. They prove no current pointer/source lineage/secret value/artifact availability. Qualify actual copy descriptors before use.
+- Publisher metadata candidate only: root 20:45:01.750UTC exact-name account token 05718105dcdfc92e55cc3624172c2740, notBefore2026-10-28T03:00:00Z, expiry2026-11-03T02:59:00Z; one allow group 7e79ec33834341f28dd431ab73884400 on fixed canary script7d96bc137a854faa875ee0f160119810. AFW_MCP_CLOSURE_PUBLISH_TOKEN secret match/uploadability UNPROVED; future correct account verify and dated-policy trust mandatory, scopeVerified=false. Never substitute GHA9db or reader9aa; no repeat probe here.
+- operationalReadiness=false. No additional namespace, credential, public QA ingress or general URL/RPC authority.
+
+
+
+## Task3: fixed private transport and three preconnection stages
+
+**Create:** lib/mcp-qa-finite-policy-transport.mjs, lib/mcp-qa-finite-connection-profile.mjs, lib/mcp-qa-finite-connection-preparation.mjs; modify Task2 owner host to call this actual fixed producer; test/mcp-qa-finite-policy-transport.test.mjs, test/mcp-qa-finite-connection-preparation-native.test.mjs.
+**Consumes:** T1/T2 plus source-approved module/profile/actual custody.
+**Produces:** qualifyFiniteConnectionProfile({phase,metadata})->immutable exact expectations; createFiniteConnectionPreparation({ctx,env}).run({preconnectionId,stage},lease)->StageOutcome<ConnectionReceipt>. Source privately constructs transport; no exported send-capability mint.
+
+- [ ] RED: all exact inherited binding descriptors include baseline UUID in requestHash; latest/omitted/renamed secret rejected. Lost/late version ACK never activates, foreign pointer blocks, stage replay/404 cannot resend; current baseline/rollback bytes/resources/exposure drift denies.
+- [ ] Implement fixed Workers Beta upload and fixed100%activation only. Original admitted invocation+source evidence+NEW durable claim ACK permits one send; journal boolean/hash alone cannot. Keep outstanding remote writes on unknown timeout.
+- [ ] Implement independent closed_ui/read_consent/notice_consent templates with exact Access audience/team/limiter/resource IDs qualified from approved private baseline, no invented constants. First two preserve preparation code; third uses actual qualified finite package bytes, closes OAuth/monitoring owner and records final preparation only after ACK/readback. Bound fifteen-minute window and each30s/5s parent.
+- [ ] GREEN native stage path using actual bound source constructors and explicitly synthetic CF/custody provenance. No actual credential/API probe; unknown actual custody/baseline stays unavailable. Fresh review.
+
+
+
+## Root carry-forward and concrete integration requirements
+
+- Use ACTUAL accepted QA-role AFW_QA_VERSION, AFW_QA_OCCURRENCE_RATE_LIMITER, RELEASE_DB and ctx.storage; no guessed aliases/env clone. Read Task2 final fix report for original request/proof/child leases. Every child must invalidate its actual storage/transport guard on timeout; returning a raced failure is not cancellation/settlement.
+- Reuse exact factual maps/source snapshot/atomic PreconnectionConnection→ConnectionRef. OwnerPreparation.prepId is original preconnectionId. Records/status/hash/source tuple never mint send authority. T3 final preparation only follows all actual acknowledged/read-back stage receipts and both current genuine consent links. No fixture-owned selected:true or future ACK/UUID/terminal claim.
+- Extend the SAME fixed owner entry for explicit connection/notices/finite configuration decisions. Stage comes from actual server ticket and qualified current phase, never arbitrary body stage/ID. Preserve original map/goal/program/baseline/window across stages. If run({preconnectionId,stage},lease) lacks a precise original stage approval/ticket lookup, raise the smallest exact append-only factual relation before code; do not scan latest approvals or infer approval from a read/notices grant.
+- SameSite Strict/canonical Origin/independent Access signatures stay. Genuine READ/notices choices remain their actual existing SDK/monitoring surfaces. Ordinary success/revocation unchanged. Configuration approval and the future original known-goal Save command remain separate from READ.
+- UI must show plain labels for goal (content: explicar mejor productos o servicios; discovery: facilitar que encuentren y entiendan el sitio), not raw enum tokens. Describe next stage and its reason simply. Replace Task2's no-publication-yet text once actual publisher is called; timeout/unknown cannot claim no configuration changed. Administrative uncertainty preserves facts and asks for reconciliation, no automatic reconnect/retry/new token/expiry extension.
+- PREPARATION templates have only closed_ui/read_consent/notice_consent. finite_prearm is a source observation of the separately qualified existing canaryLive role, not a fourth PREPARATION template. Stage3 uses exact M-qualified finite code/profile, business unavailable until actual armed control. Do not enable global OAuth/monitoring owner to fake C3 business route. Actual namespace/class/Container/source attachment must be separately qualified; staged exports are not real capability.
+- Actual private transport is source-constructed, fixed account/canary/approved Beta version upload plus fixed100%deployment only. NEW acknowledged durable SEND grants that uninterrupted invocation ONE consumed send capability; reconstruction/unknown/late/existing facts grant none. Capture actual binding/credential/transport identity around awaits. Keep actual in-flight work visible after caller timeout; no refund/force/replacement/automatic third rollback effect.
+- Upload secret descriptors EXACT {name,type:'inherit',version_id:actualQualifiedStageBaselineUUID}, complete exact vector including baseline UUID in requestHash. No latest/old_name/omitted secret. Actual metadata/activation configuration normalizes inherited secrets back to existing secret_text name/type; do not conflate upload request fingerprint with existing activation/restoration fingerprints. Existing informational CF messages code10000 are not errors; use accepted strict envelope semantics.
+- Fixed source material/credential/profile constructors may remain unavailable until owning T5 qualifier, but exact signatures/data/settlement ownership must be documented. Source-owned M-qualified canaryLive bytes/residency must actually be solved before readiness: public seed/manifest/metadata or GitHub connector file reference is not private artifact access. qaLive existing secrets are only CF reader/publisher; do not invent env.GITHUB_TOKEN/new credential, public artifact, general module upload RPC or arbitrary URL. Raise concrete material-residency dependency now if needed; no private/public provider probe in this source task.
+- Initial preparation baseline publication/source/custody/privacy/closed rollback remains separate attended gate, not an already installed fact. Candidate CF publisher metadata is not stored-secret identity/uploadability/scopesVerified. No live verification/renewal during this task.
+- Actual positive ACTIVE owner reader is for business eligibility. T5 cleanup/final-primary/withdraw/close/seal/proof must still operate from retained original context/current withdrawal+settlement after Save/revoke; do not require active grant to clean up.
+
+## Evidence and completion
+
+Genuine behavioral native RED then GREEN for fixed producer/HTTP stub transport/actual native SQLite journal and stage owner path; fixtures label CF/custody/source qualification SYNTHETIC. Test complete inherited vector, wrong source/pointer/profile/secret/late ACK/held source write, replay and unknown SEND, actual approvals and no predicted final preparation. Hosted Node22 existing lockfile only; command/affected tests from Task3 plan plus scoped ESLint exact changed paths. No full suite reruns unless new concrete failure justifies. Source APIs only, no provider/private read/credential/scope/OAuth/DDL/deploy/occurrence/first HEAD/main merge/Max or local files/deps/build. Owner asleep, no user requests/windows.
+
+Temporary qualifier branch-only contents:read/no secrets/artifacts/deploy, docs-only filtered, EXCLUDED integration. Report docs/superpowers/reports/2026-11-01-finite-private-policy-setup-task3.md; append finite progress ledger. Include BASE/code/docHEAD/CAS/readback, meaningful RED/GREEN exact runs/jobs/attempts/counts/commands, source/synthetic limits, selfreview and remaining source/acceptance gates. STOP WRITES for Root fresh task review, no Task4 implementation. operationalReadiness=false.
+
+## Root verified schema/resource preservation
+
+Read dated docs/superpowers/reports/2026-11-02-preparation-provider-schema.es.md. Root did four read-only metadata GETs, no source/secret values or trial. QA actual existing names match the corrected Task2 role; canary declares AfwOwnEventNode SQLite linked to agent-friendly-web-delegated-canary-afwowneventnode on d6fc71552de7494a863aca20365a572d. Preserve these actual existing class/backend/app relations, no inferred namespace/class replacement. current pointer is only a dated observation, not authority for a later write.
+
+Beta create uses application/json with modules [{name,content_type,content_base64}] and deploy=false, NOT classic FormData. Preserve explicit inherit version_id and validate exact schema from primary docs. Whitelist writable fields; do not blindly send response-only metadata. Declarative exports reconciles classes: prohibit new/deleted/transferred DO namespaces/migrations; only existing class/backend/container may remain. Preserve existing attachment in SOURCE canaryLive public profile/expectations (lib/mcp-qa-finite-profile.mjs), qualifying all dependent hashes/build metadata; current staging containers[] is not deployable preservation. Actual runtime attachment/capability still a later gate. API containers wire grammar and normalized existing fingerprint differ; keep explicit projection, no change to hash algorithms. No actual app/image/build/deploy/namespace action in this source task. Add covering profile/native compile dry-run commands only for this touched source dependency. Raise a concrete schema mismatch before guessing.
+
+## Root C2 Task3 exact contracts (2026-11-02, before affected code)
+
+SOURCE ONLY. Original BASE `2e80783c1d821c3e507f5217ead421237cb87887`. Unique Task3 writer; operationalReadiness=false. These rulings resolve source contracts, not owner/provider authority.
+
+1. StageApproval EXACT {purpose:'afw.finite-connection-stage-approval.v1',preconnectionId,sourceRevision,stage,ticketHash,approvalHash}, no selfdigest; existing D(actual purpose,canonical whole record). Key connection-preparation:<id>:<stage>:approval. putStageApproval(record,lease), readStageApproval({preconnectionId,stage},lease) use factual T1 observations and immutable append-only storage. Verify actual Preconnection/sourceM/owner/project/client/window; original Ticket.action=stage, preconnection/source/projectRef; actual TicketUse.recordHash=ConfigurationApproval.csrfReceiptHash and recomputed original decision digest/current proof limits. connection matches original pre.approvalHash and initialTicketHash; notices/finite match exact original atomic ConnectionRef. No latest scan or consent-to-configuration inference.
+
+2. Final audit EXACT hash-only value {preconnectionId,sourceRevision,sourceHash,preconnectionHash,stageApprovalHashes,stageReceiptHashes,grantLinkHash,noticeLinkHash,connectionRelationHash,connectionRefHash}. Each stage hash map EXACT {connection,notices,finite}. D('afw.finite-owner-preparation-audit.v1',canonical whole exact value); sourceHash=original OwnerSourceSnapshot.sourceHash, preconnectionHash=original recordHash. Other hashes use actual acknowledged/read-back StageApproval/ConnectionReceipt/link/relation/ref records. A narrow factual hashFiniteOwnerPreparationAudit may be shared. No future/self OwnerPreparation/selection hashes or authority.
+
+3. Reader retains original pre.approvalHash/initial-ticket checks independently. OwnerPreparation.approval maps FINAL finite-stage actual ConfigurationApproval into existing own-synthetic-policy-preparation purpose/decision approve/source/project/goal/times/csrf. Qualify all three actual stage approvals/receipts and recompute audit. Preserve original owner/window/baseline/program; prepId=preconnectionId. Final preparation/selection follows finite activation ACK/readback, before commandBy, with actual publication witness.
+
+4. Original-invocation admission: unexported WeakMap in owner-preparation keyed exact ORIGINAL incoming request lease. ONLY actual same-origin POST with verified current Access/source/primary, NEW consumeTicket status recorded, and exact durable decision/approval/StageApproval ACK/readback may set it. Entry captures ctx/env refs, preconnection/stage/stageApprovalHash and SAME already narrowed proof lease, never a settled five-second child/new clock. Export ONLY consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId,stage},originalLease); delete synchronously before validation/await, match exact refs/native source and assert lease, returning frozen private {lease,ownerSource,stageApprovalHash}. No setter/registry/DTO/RPC mint; reconstruction/uncertain/existing facts confer none. Public run consumes once before source IO. owner-http imports owner-preparation and connection-preparation; latter imports consume-only, avoiding cycles. parent.finish invalidates unused admission. Internal result carries refs only to fixed caller; HTML/JSON never projects them. Forms derive stage from server Ticket.action, never a body stage field.
+
+5. Fixed readPrivateQaFiniteConnectionSource({ctx,env,preconnectionId,stage},lease) remains default unavailable, with no runtime override. createFinitePolicyTransport({ctx,env}) privately captures actual existing native CF reader/publisher identities, not caller fetch/URL/credential/pins/success DTOs. T5 owns actual source/custody/byte qualification. Exact private material/transport/settlement table remains subject to Root ruling BEFORE transport/producer code; reuse actual baseline/rollback {versionId,deploymentId,module,configuration}, separate private bytes <=3MiB each, M-qualified candidate, existing exposure/execution validators and recoverable closed rollback. No invented GitHub token/public artifact/general module RPC. Actual byte residency remains a T5 gate.
+
+6. Independent Container correction is approved now: preserve dated existing AfwOwnEventNode SQLite/name/namespace in public+Wrangler source templates and wrangler.mcp-own.finite.jsonc, regenerate dynamic hashes/build metadata. Beta wire containers=[{class_name}], normalized helper validates/reintroduces actual name, exports preserves existing container name. No Docker image directive/app/image build/new namespace/migration/transfer/delete; use schema-correct unsafe metadata for source dry-run if needed. Unexpected reconciliation remains administrative pending. No runtime capability inferred from metadata.
+
+Hosted meaningful RED/GREEN plus scoped lint/native compiler/generated-byte dry-run only. No local source/clone/dependencies/build/temp downloads, provider/private probes, credentials, real auth/consent/window, DDL/deploy/cron/Container action, occurrence/main merge/Max or subagents. Stop writes for Root review after Task3 report.
+
+## Root C2 Task3 private material and effect ownership (2026-11-02)
+
+Record before transport/producer implementation. SOURCE ONLY; operationalReadiness=false.
+
+| Private field / boundary | Exact contract and ownership |
+| --- | --- |
+| readPrivateQaFiniteConnectionSource({ctx,env,preconnectionId,stage},lease) | Fixed default-unavailable source module; no runtime replacement/registry. Returns EXACT frozen {ownerSource,baseline,rollback,candidate,bytes,assertCurrent}. No owner permission inferred from data. |
+| ownerSource | Existing validateFiniteOwnerSource grammar, original sourceM/QA/owner/project/client/goal/program/window/baseline retained. |
+| baseline / rollback | Existing EXACT {versionId,deploymentId,module,configuration}; validateFiniteModule plus <=3MiB, actual qualifyFiniteWorkerVersion(canary; rollback closed:true), activationConfigurationHash/restorationConfigurationHash, snapshotOwnWorkerExecution. |
+| candidate | EXACT {sourceRevision,role,module,configuration,publicStatic}; role preparation or canaryLive. preparation publicStatic=null and exact qualified phase; first two stages preserve actual baseline bytes. canaryLive uses actual M-qualified package descriptor/role/publicStatic and private bytes. |
+| bytes | EXACT {baseline,rollback,candidate}, defensive native Uint8Array copies matching descriptor/hash, <=3MiB each; never persisted/serialized/logged/artifact/public RPC. Source-private real residency and package privacy remain mandatory T5 gates. |
+| assertCurrent(lease) | Fixed source-owned closure qualifies actual ctx/env/binding holders/credential roles/custody/window/program/closed rollback and current exposure. No caller callback authority. Existing version urls and snapshotOwnWorkerExecution checks remain; routes/workers.dev/previews/crons/tails and ALL old pre/post-T0 writers qualify inside actual T5 closure against approved source, unavailable until implemented. No standalone exposure DTO/validator or invented post-T0 control. |
+| createFinitePolicyTransport({ctx,env}).run({preconnectionId,stage},originalLease) | ONLY exported effect method; synchronously consumes actual original owner admission before async IO, privately loads source/journal, captures actual native reader/publisher/global fetch identities, requires NEW SEND+readback before fixed CF requests. No upload(body), generic request, URL/pins/credential argument or exported mint. |
+| Transport result | PRIVATE EXACT {outcome,admission}; outcome is existing exact StageOutcome, admission is consumed actual {lease,ownerSource,stageApprovalHash}. JS-internal only; never HTTP/RPC/JSON/log. Captured narrowed lease is not a new clock. |
+| createFiniteConnectionPreparation.run | Calls the one transport.run; only installed permits post-stage/final preparation using actual captured admission; returns only StageOutcome. Reconstructed/missing admission fails before effects. |
+| Settlement | Transport per-actual-ctx WeakMap retains underlying CF promises until actual fulfillment/rejection after timeout. Producer similarly retains actual journal/storage operations with captured child guards. Abort/race completion is not settlement; durable unknown SEND stays blocking across reconstruction. ALL old writers must block positive qualification/restoration; T5 inventory mandatory, no actor-local-only claim. Any actor-wide durable index needs separate exact Root ruling before implementation. |
+| Expected own transition | Before effect, immutable source and baseline pointer. After timely activation ACK plus exact primary code/config/pointer readback, permit ONLY this stage's expected phase/currentPublication change; captured immutable core plus actual journal/ACK/raw pointer qualifies pre-receipt state, full new ownerSource only AFTER receipt ACK/readback. No future receipt cycle, unrelated drift, initial snapshot replacement or renewed expiry. |
+
+Beta publication remains full schema-qualified JSON/base64/deploy=false and explicit inherit UUID, preserving actual existing namespace/SQLite/Container. No lifecycle weakening, additional credentials, private/public provider probes, general module upload, Docker/image/app/migrations or automatic recovery.
+
+Root approves a DERIVED DRY-RUN-ONLY hosted config: remove top-level exports only in that transient config, retain exact unsafe.metadata.exports/container class declaration. Wrangler otherwise requires a local containers image configuration for the named export. Never deploy/publish that derived config or equate its warning/success with full runtime/profile acceptance. Full source/Beta export/container metadata remains intact. Validate generated module byte/hash identity before/after no-bundle dry-run; no fake image/Docker build.
+
+## Root C2 Task3 actor-wide factual writer head (2026-11-02)
+
+Before journal mutation: key afw.finite-policy-effect.v1:writer-head holds EXACT {identityHash,sendHash}. NEW SEND and head advance are atomic in the same native journal transaction. Advance only after strict matching predecessor SEND+ACK/readback; no clear/reset/delete. Unknown/lost ACK blocks all later SEND including other preconnections after restart. Existing same-send replay never advances or grants capability. Applies connection and policy factories; unrelated finite-trial HEAD stays untouched.
+
+Journal remains factual {storage,identity,now}: no assertSettled callback, success boolean or native-source claim from stored records. Actual fixed transport/source independently qualifies legacy writer inventory before absent-head first issue and underlying settlement before every advance. Its per-ctx registry retains ENTIRE admitted stage work/queued callbacks and actual CF/storage promises until real settlement, never just Promise.race. Only SAME original admission lineage continues itself; another preconnection cannot use an early ACK to bypass pending stage work. T5 source current/primary/writer inventory owns older cross-path reconciliation and remains unavailable until qualified. Unknown head/data/settlement fails closed. Cover atomic head concurrency, different-preconnection unknown, restart reconstruction denial and held actual promises. No registry/mint or storage-derived authority.
+
+## Root C2 Task3 actual original and effect deadline (2026-11-02)
+
+Before code: readFiniteOwnerRequestDeadline(originalLease) is a read-only getter from an unexported WeakMap populated ONLY by actual createFiniteOwnerRequestLease at request receipt, removed on finish. Assert exact original issued/current lease; clone/unissued/finished reject. Returns original wall receipt+30000; no setter/renewal/new parent or admission schema change.
+
+Each publication effect child begins BEFORE SEND transaction/readback. Its captured wall+monotonic duration is <=5000ms clipped by original deadline, source window, actual Preconnection/approval/Access bounds. ConnectionSend.deadline is min of those actual bounds and this SAME effect child's wall end. Claim/readback/network/ACK share the child's nonrenewable budget; never start another five seconds after claim or before fetch. Native captured guard invalidates on expiry/abort/settlement; timeout is not physical settlement. Test clone/finished getter and delayed actual native SEND ACK consuming the original child's budget. T4 has its own fixed original native clock; this getter never supplies setup authority.
+
+## C2 Task3 source handoff (2026-11-02)
+
+DONE_WITH_CONCERNS / SOURCE ONLY. Report: [2026-11-01-finite-private-policy-setup-task3.md](../reports/2026-11-01-finite-private-policy-setup-task3.md).
+BASE `2e80783c1d821c3e507f5217ead421237cb87887`; final code/test HEAD `72ab2aea12a86471ae20ba342bd4b8115fe315d8`; last product-code commit `8216659e8900be92031d03fa37ad4d91838aab80`.
+
+Three server-ticket configuration approvals now produce fixed private Beta upload/activation stages, actual journal receipts, exact final approval/audit/selection and publication witness. Original lease admission is private consume-once; original30s and captured5s claim-to-send budget cannot renew. The actor writer head and retained actual work block unknown writers; rejected acknowledged readback preserves a factual failure barrier. Plain UI text distinguishes confirmed configuration from uncertainty.
+
+Full targeted hosted GREEN at `ec83c42f594ff0751dcf7a17a9a9d147a338b29d`: run41457985200/job125319474707/attempt1,120pass0fail, scoped lint, derived byte-only qa/canary dry-runs and exact emitted-byte comparisons pass, artifacts0. Final changes after that checkpoint affect tests/workflow only: actual complete-wire commitment assertion passes in the41-test transport group at19f01dda; final actual Miniflare/SQLite restart proof at72ab2aea run41460645920/job125328488776/attempt1 passes7/7 and scoped lint, artifacts0. The final run is focused, not another full120 run. The report preserves every RED/diagnostic and its limits.
+
+Actual private owner/material/forwarding sources remain unavailable until T5 qualifies real M bytes/residency/custody, source/primary/exposure/credentials and ALL old writer lineages. Initial preparation publication, T4 setup, C3 business/early-withdrawal surface and attended live acceptance remain separate. No provider/private read, credentials, real auth/consent/window, deploy/DDL/Container/image/migration, first finite HEAD, occurrence, main merge or local source/build occurred. operationalReadiness=false; no PC-off acceptance. Derived dry-run config must never be deployed; full source/Beta existing Container declarations remain preserved.
+
+Temporary branch qualifier is contents:read/no secrets/artifacts/deploy and docs-filtered; exclude from integration. Every source/docs commit uses expected-head CAS plus independent ref/file readback. STOP WRITES after report/ledger readback for fresh Root spec and quality review. No Task4 implementation.
+
+
+## Root C2 Task3 fix round1 — whole-stage actual settlement (2026-11-02)
+
+Fresh reviewer /root/review_private_policy_task3 assessed BASE2e80783..423c1bf: spec FAIL, quality needs fixes, one Important settlement defect, no Critical or separate Minor. Original task is NOT accepted; Task4 remains undispatched. Review evidence: full targeted120PASS ec83c42f/run41457985200/job125319474707 and actual-restart7PASS72ab2aea/run41460645920/job125328488776. Root independently read both logs, actual run/head/attempt1/success and final423c1bf branch pointer. Later ec83..72ab changes only temporary workflow+three test/fixture files; no product drift.
+
+Ruling: fix the existing whole-stage retention requirement in round1/5 using the original implementer. One actual native ctx/source-bound admission lineage must block another SEND across transport, final producer and every nested underlying source/storage/CF promise. Gate before effects, not after transport returns. Original parent finish, wrapper timeout, ACK/receipt and journal head are not settlement. Only actual fulfillment/rejection can remove underlying work; no force/reset/refund/timeout release or success DTO. Invalidated child guards and all original deadlines remain unchanged. A narrow shared INTERNAL factual retention component is permitted if needed to connect these existing owners: it can only retain/deny/observe outstanding actual promises and remove them on actual settlement, never create admission, allow an unrelated lineage, expose a caller send/mint/clear API, or replace T5 all-path native inventory. This clarifies memory ownership, not new authority.
+
+Covering behavioral RED/GREEN: hold actual final publishSelection/storage work after producer timeout+HTTP parent.finish, then attempt a separately admitted writer before releasing it; likewise hold a nested factual-source/storage promise whose race wrapper has already settled. Assert no subsequent SEND/provider effect while outstanding, retain late work until actual settlement, and preserve committed factual history. Exercise actual native SQLite/Miniflare with synthetic source/provider qualification explicitly labelled. Use test/mcp-qa-finite-connection-preparation-native.test.mjs, test/mcp-qa-finite-policy-transport.test.mjs and affected owner-preparation native tests plus scoped lint; retain journal restart tests if shared barrier/journal is touched. No unchanged full suite/native compiler rerun unless a concrete changed dependency justifies it. Append fix report/tests/commands/output and STOP WRITES for same-reviewer scoped423c1bf..fix-docHEAD re-review.
+
+Unimplemented T4/T5/C3 and actual acceptance remain separate gates; operationalReadiness=false. No source/CI result authorizes provider/private probes, credentials, auth/window, runtime deploy, main merge, finite HEAD or Max.
+
+### Fix round1 implementation boundary, before product code
+
+Root accepted one INTERNAL denial/retention scope keyed by actual ctx and exact already-consumed admission reference, retaining original env/storage/primary/request references. It cannot mint an admission, SEND or replacement lineage. Transport and final producer enter the same scope; nested owner factual child operations register their actual native Promise before racing timeout. Each promise is removed only on fulfillment/rejection, and the ctx entry can disappear only after original parent completion AND an empty actual-work set. A competing actual admission is denied before transport IO/SEND.
+
+Use only supported AsyncLocalStorage.run/getStore with actual native Promise chains; no enterWith/disable or RPC/isolate propagation assumption. Reference supplied/checked by Root: https://developers.cloudflare.com/workers/runtime-apis/nodejs/asynclocalstorage/. Native Miniflare/workerd tests must prove propagation through nested source/storage IO; T5 cross-path/durable writer inventory remains separate and unavailable. Public transport/preparation/consume-only signatures, original clocks and child guards remain unchanged. This module has no clear/reset/refund/send/mint API.
+
+## C2 Task3 fix round1/5 handoff — review pending (2026-11-02)
+
+Original review423c1bf was spec FAIL / quality needs fixes: one Important whole-stage settlement defect. Root's ruling is preserved at a6dab660; implementation boundary was recorded before product code at f51d65fa. Fix codeHEAD `62fb4122ab2991eb3d4781187369269ceb849623`; re-review range remains423c1bf..fix-docHEAD, not the writer BASE.
+
+One internal denial-only scope now retains the exact consumed admission lineage across transport, final producer and nested underlying owner source/storage promises. Timeout, wrapper settlement and parent.finish cannot clear actual outstanding work. Competing admission is denied before source IO/SEND; no admission/public signature/deadline/journal/source qualification changes or mint/reset API.
+
+RED `05bfb64dc6b71190fe4f9313f82ebc4c7c226ac8`: run41465306769/job125344480872/attempt1,55 tests53pass2fail; both new native held-final-selection/nested-source cases incorrectly permitted installed second stages. GREEN62fb4122: run41466161397/job125347499185/attempt1,55pass0fail/cancelled0/skipped0, scoped lint clean, artifacts0. Coverage includes actual owner/admission/transport/three-stage tests and native journal restart. No unchanged profile/compiler/full120 rerun.
+
+The final storage hold and nested factual hold survive parent.finish while a separately verified owner POST consumes a new ticket/approval. No additional SEND/provider effect occurs until settlement; committed history remains and expired children make no late writes. Provider/source authority remains explicitly synthetic. AsyncLocalStorage uses supported run/getStore only; no RPC/isolate assumption or replacement for unavailable T5 durable/all-path inventory.
+
+Full finding, ruling, exact commands/output, RED/GREEN evidence and selfreview are appended to [Task3 report](../reports/2026-11-01-finite-private-policy-setup-task3.md). Every commit used expected-head CAS plus independent ref/file readback. Fix implementation is NOT independent acceptance. STOP WRITES after final docs readback for Root's same-reviewer scoped review. No Task4, actual provider/private/auth/credential/runtime/local source/build action. All T4/T5/C3 and attended/runtime gates remain; operationalReadiness=false.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task4.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task4.md b/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task4.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task4.md
@@ -0,0 +1,133 @@
+# Private policy setup Task4 — actual post-T0 setup operation
+
+SOURCE ONLY. Root supplies exact accepted BASE after Task3 fresh review; never run from a historical report's codeHEAD. Read this brief first; it contains the requirements. One writer, no subagents or self-appointed reviewer. Do not implement Task5 or C3.
+
+## Global constraints
+
+- Source-only cloud work. No provider/private read, secret value, role/key/scope, OAuth action, deploy, DDL, live comment, occurrence, local dependencies/build or automatic recovery.
+- Original connection window<=900000ms; each request parent<=30000ms including queue, child<=5000ms clipped by parent/window. commandBy=min(actualReadExpiry,noticeExpiry,AccessProofExpiry,approvalExpiry,connectionWindowEnd)-480000-30000. Never renew ten-minute grants.
+- Post-T0 setupBy=T0+50000; adoption70s/ARM90s; original Known4args/18stages/70s/5s/20s and C0/C1/R1/history/uncertainty unchanged. No finite HEAD before all actual read-only eligibility checks.
+- PREPARATION uses real qualified Access realm/limiter/client/project/window bindings and independent profile grammar. C1 finite profile keeps OAuth/monitoring-owner closed and currently lacks those Access bindings. Never fake env flags or claim it already handles MCP.
+- Raw policy/context/JWT/cookies never logs/GHA/public artifacts; JWT/cookies never persist. Secret inheritance EXACT {name,type:'inherit',version_id:baselineVersionId}; no old_name/latest/omission/script-upload substitution.
+- Initial preparation publication, custody/API permission, actual baseline bytes/privacy and future runbook approval remain gates. Root's20:39:33.726UTC historical version GETs prove shape only: QA31bindings/14false/two SQLite classes; canary29/8false/AfwOwnEventNodeSQLite/container execution; OP7/3false/no export. They prove no current pointer/source lineage/secret value/artifact availability. Qualify actual copy descriptors before use.
+- Publisher metadata candidate only: root 20:45:01.750UTC exact-name account token 05718105dcdfc92e55cc3624172c2740, notBefore2026-10-28T03:00:00Z, expiry2026-11-03T02:59:00Z; one allow group 7e79ec33834341f28dd431ab73884400 on fixed canary script7d96bc137a854faa875ee0f160119810. AFW_MCP_CLOSURE_PUBLISH_TOKEN secret match/uploadability UNPROVED; future correct account verify and dated-policy trust mandatory, scopeVerified=false. Never substitute GHA9db or reader9aa; no repeat probe here.
+- operationalReadiness=false. No additional namespace, credential, public QA ingress or general URL/RPC authority.
+
+
+## Task4: actual post-T0 setup operation
+
+**Create:** lib/mcp-qa-finite-policy-setup.mjs; test/mcp-qa-finite-policy-setup-native.test.mjs.
+**Consumes:** selected owner record, readFiniteMaterialSeed, fixed source-authority/context, T1/T3.
+**Produces:** createPrivateQaFinitePolicySetup({ctx,env}).run({intentId,sourceRevision})->StageOutcome<PolicyReceipt>; runFinitePrivatePolicySetup({env,event,step})->StageOutcome<PolicyReceipt>; no raw policies.
+
+- [ ] RED: original owner/source/seed not complete, T0 pastcommandBy, changed grant/revision/selection, first HEAD touched, predicted new-version/terminal receipt, setup50s and child clipping, unknown prior SEND.
+- [ ] Bind selected preparation once; derive raw policies/C0/C1 from primary originalT0, immutable original context and existing validators. Preserve actual full hashes separately from publicStatic; no caller plan/env clone. One upload then one activation, exact version secret inheritance, no nominal/Container.
+- [ ] Require actual version/module/readback and context persistence before installed receipt. Later primary completed-success setup/output/writer/pointer qualification remains required; emitting a receipt cannot prove self-terminal.
+- [ ] GREEN native Task4 plus seed/bridge/control tests and scoped lint; fresh review.
+
+
+## Binding post-T0 specification
+
+## Post-T0 setup and two-effect contract
+
+One existing PrivateQaBootstrap instance: payload EXACT {operation:'finite_private_policy_setup',intentId,sourceRevision}; ID afw-finite-policy- plus SHA256('afw.finite-private-policy-setup.v1\n'+canonical({intentId,sourceRevision})). No caller policy/clock/selector. runFinitePrivatePolicySetup({env,event,step}) calls only fixed IndependentClosure.setupFinitePrivatePolicy(refs); createPrivateQaFinitePolicySetup({ctx,env}).run(refs) owns dependencies privately. Proposed lib/mcp-qa-finite-policy-setup.mjs and policy-transport.mjs, mounted in finite entrypoints. All caller paths/source/native provenance qualify; IDs alone do not authenticate.
+
+After original seed primary success, attended operator creates setup once; lost ACK is exact GET-only. Derive C0=T0+240000/C1=T0+420000 from original GitHub T0. Snapshot private raw context BEFORE upload under afw.qa-finite-policy-setup.v1:<intentId>:context, <=64KiB without modules. Include original revision/goal/save identity, owner/consents/program/legacy evidence, preparation/selection/binding hashes, baseline/rollback pins, exact six private values and intended full fingerprints. Later Save/revoke never substitutes latest rows; fresh authorization can deny effects without rewriting snapshot.
+
+Preserve actual Known/resolveNamedActivationPlan raw gates and original fourargs/18stages/70s/5s/20s. EVENTS/SUCCESSOR/withdrawal derive from original context/T0; withdrawal exactlyC0/C1. Historical retirement meaning stays qualified; project/client stay pre-T0 identities. Replace only approved private slots. Unknown fields fail; no env clone, private GHA/compiled policy or fabricated canary version/ctx.container capability.
+
+Existing canary-only publisher must qualify actual identity/account/expiry/operations independently; Editor/old closed probe proves neither upload capability nor fresh scope equivalence. Fixed account85d0d5dadac3341a564f22ce885e9eec/canary agent-friendly-web-delegated-canary paths: POST /workers/workers/<canary>/versions?deploy=false; POST /workers/scripts/<canary>/deployments. Reads fixed exact baseline/new/rollback versions, pointer, custody and exposure/execution; no general URLs.
+
+For EVERY pre/post-T0 upload, each inherited secret is EXACT {name,type:'inherit',version_id:baselineVersionId}; no old_name, omission or latest. Pin the actual qualified stage baseline UUID and complete descriptor vector into requestHash and SEND; recheck baseline pointer before sending. Never read/copy secret values. The [Workers Beta API](https://developers.cloudflare.com/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/create/) supports explicit inheritance-version IDs on this route; do not substitute script upload.
+
+Post-T0 keys context/upload-send/upload-ack/activation-send/activation-ack/receipt/failure are append-only. Derived states prepared/upload_issued/uploaded/activation_issued/installed or admin_pending. SEND EXACT {purpose,intentId,sourceRevision,setupInstanceId,contextHash,effect,requestHash,issuedAt,deadline}; purpose afw.finite-policy-send.v1, effect upload|activation. ACK EXACT {purpose,sendHash,resourceId,acknowledgedAt}; purpose afw.finite-policy-ack.v1, actual UUID. Pre-T0 SEND EXACT {purpose,preconnectionId,sourceRevision,stage,contextHash,effect,baselineVersionId,baselineDeploymentId,requestHash,issuedAt,deadline}, purpose afw.finite-connection-send.v1; ACK uses the same ACK fields with purpose afw.finite-connection-ack.v1. Stage receipt EXACT {purpose,preconnectionId,sourceRevision,stage,baselineVersionId,baselineDeploymentId,versionId,deploymentId,moduleHash,configurationHash,completedAt,receiptHash}, purpose afw.finite-connection-installed.v1. Link all three receipts and actual consent links into final auditHash. Receipt timestamps follow actual ACK/readback, never predicted completion.
+
+Only acknowledged/read-back durable NEW SEND grants the same uninterrupted invocation one send. Reconstruct/late/unknown ACK/provider404 never refunds. Only fresh acknowledged new-version actual bytes/publicStatic/full-metadata qualification permits activation. Changed/foreign pointer denies; no atomic provider CAS claimed. Outstanding writes remain in inventory.
+
+Installed receipt EXACT {purpose,intentId,sourceRevision,setupInstanceId,qaVersionId,seedHash,contextHash,baselineVersionId,baselineDeploymentId,versionId,deploymentId,moduleHash,publicStaticHash,activationHash,restorationHash,bindingsHash,installedAt,receiptHash}; purpose afw.finite-policy-installed.v1, <=8192bytes, canonical domain hash. Actual full algorithms stay distinct. Private context/receipt readback precede output. installed cannot attest its own future Workflow terminal: later primary completed-success/output/pointer/writer correlation is mandatory before observer creation/preview or control.prepare.
+
+
+## Accepted dependencies and pending provenance
+
+Use accepted Task1 actual factual store/journal, Task2 actual owner/consent reader, and Task3 actual fixed publication pipeline and exact secret projection. Those data/facts never mint permission. Read only their actual required interfaces/report sections; do not replay earlier work. Actor-wide writer head and unresolved/held actual promise rules apply to the SAME publisher, across connection and policy identities. finite-trial HEAD remains separate and untouched.
+
+The Task3 exported transport consumes original owner-POST admission and cannot be used to invent native setup authority. Propose the smallest exact fixed native source/admission/material contract before affected code. It must bind actual native ctx/env/original entry, original command/seed/selection+publication witness/binding/current owner facts, same M/QA, native setup instance, current pointer/custody/byte/exposure/writer qualification. Missing actual qualification stays default unavailable until Task5; no public override registry/caller success DTO.
+
+Original operation deadline must include queue and forwarding, not restart at the DO. Cloudflare documents WorkflowEvent.timestamp as actual triggered Date and its instanceId/workflowName; GET instance schema has queued/start ISO timestamps, not created_on. Exact clock-provenance relationship needs a source contract/ruling before code; do not infer caller timestamp authority or use a fresh setup30 after forwarding. Original native parent starts before IO, narrows only, each effect child begins BEFORE SEND storage/readback and shares <=5s across claim/network/ACK. No new five seconds after claim. No original owner-HTTP deadline getter used for native setup.
+
+Persist immutable original SetupContext before upload. Changes of current owner Save/revoke may deny new effects but cannot overwrite original baseline/project revision/goal/program/history/context. Preparation binding uses exact current selection+actual publication witness<=T0. Missing/uncertain/replayed binding cannot mint a NEW effects admission. T0 is real owner GitHub comment.created_at, never observedNow/event time.
+
+Derive exact six private slots via current accepted full policy validators and actual source namespace/program/history; no weakened Known/resolveNamedActivationPlan, clone-env, new scopes/consent, predicted new UUID or future terminal receipt. Baseline/new/rollback publicStatic/full hashes stay distinct. Only actual timely upload ACK plus new immutable version bytes+metadata qualifies activation. Receipt after actual activation ACK/readback+context readback; later primary completed setup/output/pointer/writer correlation remains another gate.
+
+No actual provider/private read, stored credential verification/rotation/paste, permissions/OAuth/OTP/window, runtime/DDL/deploy/cron/Container, GitHub live command/finite HEAD, Max, local clones/source/dependencies/build/temp or main merge. Hosted meaningful native RED then GREEN and scoped lint only; no full-suite reruns absent new concrete failure. Reuse branch-only no-secrets/no-artifacts temporary qualifier, EXCLUDED integration.
+
+Report docs/superpowers/reports/2026-11-01-finite-private-policy-setup-task4.md; append finite ledger. Include BASE/code/docHEAD/CAS/readback, exact RED/GREEN runs/jobs/attempts/counts/commands, selfreview and actual-vs-synthetic source limits. STOP WRITES for Root fresh spec+quality review.
+
+## Primary clock references checked by Root (source-only)
+
+- https://developers.cloudflare.com/workflows/build/events-and-parameters/
+- https://developers.cloudflare.com/workflows/build/workers-api/
+- https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/get/
+
+Native WorkflowEvent.timestamp is the triggered Date; instance metadata exposes queued/start. No actual setup instance was read and no equality was established by this documentation lookup. Clock/admission contract must be resolved before product code, preserving original deadlines.
+
+## Concrete command-boundary integration check
+
+Task3 pre-T0 readers readFiniteOwnerPreparationFacts/current selected reader currently reject observed Date.now>=commandBy (owner-preparation.mjs370/383 at423c1bf). The immutable selection spec instead requires selectedAt<=actual original T0<commandBy. Setup may legitimately execute after commandBy while actual grants/window/R1/operation deadlines remain current. Resolve this before product changes: preserve strict pre-T0 reader behavior, introduce only a fixed actual native-source-qualified post-T0 factual path with original binding/witness/T0 provenance (no caller T0/bypass flag/renewed clock), and cover a real command just before commandBy processed after it as well as command at/after commandBy denied. This is a concrete T4 integration gate, not permission to weaken grant/owner/scope/Save/revocation/selection checks.
+
+Task3 dependencies to preserve: programContext.sourceRevision is the actual program revision and may differ from runtime/sourceM. Match actual programHash/revision/originalContextHash to primary and current exact selected project/goal; never force equality to M, switch to latest program, or change the captured original context. Baseline/candidate modules use actual descriptor {name,sha256,bytes}; configuration exports/profile and full activation/restoration fingerprints remain separate qualifications.
+
+## Root integration preflight
+
+## Root C2 Task4 integration preflight (2026-11-02, before source work)
+
+Ruling: preserve strict pre-T0 selection/approval behavior while implementing a fixed native-source-qualified post-T0 factual path. Immutable selection requires selectedAt<=actual original T0<commandBy. A command just before commandBy may validly be processed after it while current permission/R1/setup/original-parent bounds still hold; never use observedNow<commandBy as a substitute for original command chronology. No caller T0/bypass boolean or refreshed parent/consent. T4 must propose the smallest exact actual native-entry/source/admission/material table before affected code; owning T5 source qualifiers may remain unavailable, not fake positive DTOs.
+
+The original native setup clock must include forwarding/queue and clip all child/SEND/ACK work. Official WorkflowEvent timestamp is the native triggered Date; fixed instance GET schema exposes queued/start, not created_on. No equality between those clocks was verified by the documentation lookup. Resolve source-owned provenance/narrowing before code, not a fresh30s in a later DO or a caller deadline argument. Actual four Known args/18stages/70s/5s/20s and setupBy50/ARM90 remain unchanged.
+
+Original pre-T0 ownerSource.currentPublication/ConnectionReceipt sequence is historical preparation provenance after the approved post-T0 policy activation, not permission to report the old prearm pointer as the current provider pointer. Native setup/prepare must separately qualify the actual current pointer/config/code against SetupContext/PolicyReceipt and fresh owned-primary facts, preserving original selection/snapshot/receipts. Use the narrowly expected own transition after actual ACK/readback, no rewritten baseline, new preparation-stage enum or generic pointer bypass. Propose exact contract before code.
+
+Source material-residency gate remains T5: compiler currently has single qaLive/canaryLive outputs; native QA has no GitHub download credential. Root considered a possible canary-first compiler DAG with QA-only compressed M-qualified canary bytes, but this is NOT selected/implemented/authority and requires exact design/size/privacy/hash-cycle qualification. No new key/public artifact/general module RPC by inference.
+
+C3 current-source preflight at423c1bf/bcf54a5c: delegated-oauth-worker143 returns paused on OAuth=false before ordinary owner connections/revoke295–319; monitoring has its own gate144. Separately qualify narrow existing-grant business/early withdrawal before live; C0 cleanup does not establish early owner withdrawal. This is future C3 work, not a reopened Task3 review.
+
+References checked without resource probes: https://developers.cloudflare.com/workflows/build/events-and-parameters/ ; https://developers.cloudflare.com/workflows/build/workers-api/ ; https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/get/ .
+
+Use actual accepted shared mcp-qa-finite-stage-work.mjs for denial/retention where appropriate, without reusing owner-POST admission as native setup authority. Source-owned native admission/clock must be separately constructed and scoped. Read relevant actual Task3 source/interfaces/report fix appendix; do not replay Task3 tests or reimplement the fixed publisher. Any shared fixed transport extension requires a precise native contract before affected code, never a generic send callback.
+
+## Root Task4 factual binding correction — 2026-11-02
+
+Execution BASE `757223ebc920c46e3df77995d7ba017ea3b9884e`. SOURCE ONLY; operationalReadiness=false.
+
+`bindSelection(binding,lease)` is already the intended post-T0 factual API. Preserve strict pre-T0 approval/selection/read APIs. Correct only its observed `at>=commandBy` predicate to require `observedAt<min(preparation.expiresAt,owner.accessExpiresAt,connection.permissionExpiresAt,approval.expiresAt)`. Retain actual-record `selectedAt<=T0<commandBy`, exact current selection/head, durable publication witness `selectedAt<=publishedAt<=T0`, `T0<=boundAt<=observedAt`, immutable once binding and original lease guards. Stored expiries are facts, not current consent or native authority. No new record, hash, key, API or bypass variant. The fixed native setup must independently qualify original primary T0, current owner/consent, R1/setup and original parent before this call.
+
+Required native RED/GREEN: command just before commandBy with binding observed after commandBy and original unexpired bounds; command at/after commandBy, expired stored bounds, late witness and current-head drift denied. Original native source/clock/material table is still under Root ruling; no affected product implementation before that ruling. Known four args/18 stages/70s/5s/20s and Task5/C3 boundaries unchanged.
+
+## Root Task4 native/source/material contract — 2026-11-02
+
+Execution BASE `757223ebc920c46e3df77995d7ba017ea3b9884e`; factual binding correction code `a75403f7c551ea2c6bd66c683d84a3ddddea1e82`. SOURCE ONLY, operationalReadiness=false. This table records Root's pre-code ruling; default source constructors remain unavailable until Task5 actual qualification.
+
+| Boundary | Exact fixed contract and ownership |
+| --- | --- |
+| Public operation | Payload EXACT {operation:'finite_private_policy_setup',intentId,sourceRevision}; refs EXACT {intentId,sourceRevision}; setupInstanceId='afw-finite-policy-'+SHA256('afw.finite-private-policy-setup.v1\n'+ASCII-canonical refs). Only finite PrivateQaBootstrap dispatch and finite IndependentClosure subclass setupFinitePrivatePolicy(refs). Ordinary index/public ingress, existing namespace/class/backend/exports and all other methods unchanged. This is the narrow Task4 exercise mount, not Task5 completion. |
+| Workflow source entry | readPrivateQaFinitePolicyEntry({env,event,step},originalLease) -> EXACT {setupInstanceId,sourceRevision,qaVersionId,eventTimestamp,queuedAt,startedAt,T0}. Fixed source owns actual native entry, existing binding/primary Workflow identity, M/QA, original command/seed and read-only qualification. Native Date/instanceId mandatory; actual supplied workflowName must match afw-own-qa-private-bootstrap, absent name requires source proof. Matching IDs/status DTO are not authority. Default unavailable; no registry or caller clock. |
+| DO source material | readPrivateQaFinitePolicySource({ctx,env,intentId,sourceRevision},originalLease) -> EXACT {native,ownerSource,originalContext,baseline,rollback,bytes,assertCurrent}. native uses the seven fields above. ownerSource uses accepted validateFiniteOwnerSource grammar; finite_prearm/currentPublication remain immutable historical preparation provenance. baseline/rollback EXACT {versionId,deploymentId,module,configuration}, existing module {name,sha256,bytes}; private bytes EXACT {baseline,rollback,candidate}, each Uint8Array <=3MiB. Candidate descriptor comes ONLY from actual seed.manifest.modules.canaryLive.module (name/sha256/bytes, separately actual exports); M/tree/publicStatic checked against source/seed. Fixed assertCurrent(originalLease) independently qualifies actual source/entry, owner/current primary, publisher custody/expiry/operations, current pointer/exposure/bytes and all writer inventory, including only actual own journal ACK transitions. No caller expected-transition DTO or generic send callback. Default unavailable until Task5. |
+| Clock | Workflow wall/monotonic guard starts before IO; eventTimestamp+30000 cap narrows to min(eventTimestamp,queuedAt)+30000 and T0+50000. Require primary queuedAt<=startedAt<=observedNow, eventTimestamp<=observedNow; NO invented equality/order between eventTimestamp/queuedAt. DO source hydration begins under read-only provisional <=5000 guard before IO; no effects until independently source-qualified original deadline, never fresh30 after forwarding. Same parent narrows through original owner/window/permission/R1; each effect child begins before SEND and shares <=5000 across storage/readback/network/ACK. Source clocks/T0 are never public arguments. |
+| Setup factual read | INTERNAL readFiniteOwnerSetupFacts({ctx,env,intentId,sourceRevision},originalLease) itself calls fixed DO source and actual readFiniteMaterialSeed under the same parent, checks primary original T0, selected owner/selection/witness, current D1 owner/grant/notice/revision/program and immutable three-stage history. Pre-T0 reader APIs unchanged. Return private EXACT {value,selected,witness,receipt,ownerSource,source,material,notice}; value is existing pre-selection preparation facts, notice actual current event, source/material remain private and confer no send authority by themselves. No caller seed/T0/bypass. |
+| Original context | EXACT {artifact,scope,original,publication,cancellations,retirementPolicy,withdrawalRequestId,saveIdempotencyKey,legacy,trialId}. artifact actual six fields {script,sourceRevision,sourceTree,programHash,workerHash,sourceCheck}: script is actual candidate Worker bytes, revision/tree are real CODE build M/tree and workerHash actual SHA. Candidate programHash independently proved from embedded candidate program. scope/original/publication existing exact validator grammars. original.programHash/sourceRevision match ownerPreparation.programContext retained ORIGINAL program Q, which may differ from candidate runtime M. cancellations ARRAY preserves existing exact Known historical entry grammar/order/values; no currentGrant in original hash. retirementPolicy raw unchanged qualified historical meaning; withdrawal/save UUIDs and trialId64hex are source-owned preexisting approved identities committed before initial choice, never generated from future T0. publication.workerHash/artifactKey bind candidate bytes, activationKey fixed pre-T0 identity, never provider UUID. legacy existing exact validator. |
+| Original digest | originalContextHash=SHA256 UTF8('afw.finite-original-context.v1\n'+ASCII-canonical exact context projection replacing artifact ONLY with {sourceRevision,sourceTree,programHash,workerHash,sourceCheck}); all other fields unchanged. Bound script bytes/hash separately; no script/current grant/current notice/T0/future ACK in digest projection. Actual original program/context and candidate provenance must reconcile independently; digest alone grants nothing. |
+| Derived policy material | C0=T0+240000,C1=T0+420000,N1=T0+300000. Exact six private slots only. EVENTS actual selected owner/grant/project/client/resource T0..N1; SUCCESSOR retained scope/original/publication and candidate {trialId,programHash,sourceRevision,startAt:T0,expiresAt:N1,budget:1}; withdrawal C0..C1 with actual current D1 notice originalConsent {sequence,revision,issuedAt,expiresAt} and actual resolved candidate identity. Historical cancellations preserved; construct full Known history currentGrant from current D1, never initial hash. Pure resolveSuccessorPreparation/prepareKnownCancellationHistory/withdrawal parser before effects; resolveNamedActivationPlan only after actual new version/deployment/config readback. No env clone, fake flag/Container, predicted UUID or Known execution. |
+| Native effect admission | Only original actual setup producer, after fixed native source + primary seed + factual current checks, can enter private transport under its same original lease. No owner-POST admission reuse, public mint/clear/force/reset or factual-record authority. Same actual ctx/env/storage/db captured and shared stage-work retention across connection/policy identities; track actual nested IO Promise before races. Binding newly recorded plus exact durable readback required; existing/uncertain binding/SEND never grants a new send. |
+| Transport/context/output | Reuse fixed Beta HTTP/projection engine privately; no generic URLs/credentials/caller policies. Snapshot immutable SetupContext <=64KiB before upload. Exact baseline-version secret inheritance vector hashed in request/SEND. One upload then one activation; actual timely upload ACK plus fresh bytes/full metadata needed. Source assertCurrent independently reconciles baseline to its own actual journal ACK/pointer transition. Context and receipt readback precede installed output; output contains no raw policies. Later completed-success Workflow/output/pointer/writer qualification remains mandatory for observer/control.prepare. |
+
+No relabelling M script with original Q revision, weakening Known four args/18 stages/70s/5s/20s, compiler changes, actual provider/private reads, credential/role/OAuth/window action, runtime/DDL/deploy/cron/Container, finite HEAD or Task5/C3 implementation. Compiler source currently does not establish separate retained program mapping; default source remains unavailable until qualified. SYNTHETIC fixtures establish source-contract behavior only, never actual custody/byte residency/platform cross-RPC provenance.
+
+
+Root Task4 final pre-effect checks: actual native eventTimestamp AND queuedAt must be >= actual material.primaryEvidence.seedStepCompletedAt >= original T0; completed-success seed is required BEFORE setup creation. No invented event/queue equality/tolerance. Candidate upload cap3MiB never relaxes Known artifact.script<=2MiB; validate exact artifact bytes/hash/M/tree/sourceCheck/candidate correspondence BEFORE publication, then full resolveNamedActivationPlan only after actual new UUID/config readback. Default actual source remains unavailable until Task5.
+
+
+## Root Task4 whole-operation retention ruling — 2026-11-02
+
+SOURCE ONLY at execution BASE `757223ebc920c46e3df77995d7ba017ea3b9884e`; preceding implementation `c96a1cee336c0edf7e7fc7ae21ccaabedd667f85`. Before affected code: start the existing denial-only `observeFiniteOwnerStageWork` atomically at original DO run entry after exact refs validation and before first source/facts IO. Its private original-invocation lineage object identifies actual ctx/env/storage/RELEASE_DB plus the SAME original issued parent lease, narrowed only after original source time is known. Retain this lineage through hydration, nested factual reads, binding/context, transport and receipt; retain actual nested native promises before racing. A second lineage is denied before source/effects while outstanding; release only original termination AND actual promises settled. No public lineage constructor/token/mint/clear, helper relaxation or new clock.
+
+Lineage retention grants NO send authority. The distinct private effect admission is minted and consumed only after fixed source/seed/current owner checks and NEW binding/context ACK/readback. Original source constructors receive the actual original parent lease while bounded read-only child races retain their actual operations. Native Workflow RPC returns RpcPromise: retain a fixed source-owned native async continuation awaiting the captured actual binding/method BEFORE racing the original Workflow deadline. This proves client RPC-continuation settlement only, not remote physical settlement, remote DO terminal, or T5 all-path closure. Root approved this narrow correction after native RED `545156864549efa963a30bcab58848dcefd9c2c5` run41475481741/job125379799936 (1 failed), and repair `a8e56e9ed6666b320a1ab026e982e818218d98d9` run41475798053/job125380907183 (1 passed). Add a native held nested hydration case: response/finish does not release held work, second invocation performs no new source read/SEND/CF POST, and late guard cannot write. All source/CF/GitHub/custody fixture qualification remains SYNTHETIC; operationalReadiness=false.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task5-b2.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task5-b2.md b/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task5-b2.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task5-b2.md
@@ -0,0 +1,31 @@
+# C2 Task5-B2 — actual pre-T0 source/bootstrap origin
+
+SOURCE ONLY. Sequential continuation of accepted B1, NOT the entire Task5 and NOT runtime authorization. Owner PC stays on but unavailable until16:00 Argentina2Nov; no human interaction/OTP/window/token steps. Execute GitHub/Actions only, same isolated branch; no local source/dependencies/build/temp. Sole implementer, no subagents. BASE is the Root acceptance commit containing this brief, supplied in dispatch.
+
+## Before product: concrete supported source map
+
+Read Task5 preflight report and narrower B1 report plus appended spec/plan rulings at BASE. B1 candidate byte residency exists and is accepted; do not redo B1. Original Task5 default-unavailable seams and completePackage false remain. Start with B2 architecture/dataflow investigation ONLY. Propose exact producer/locator and contract table to Root; do not write product until Root ruling. This is engineering clarification, no owner question or permission request. Root will decide, record ruling and continue.
+
+Bounded outcome: independently verifiable source of initial owner configuration BEFORE first OwnerSourceSnapshot/ticket and BEFORE post-T0 seed. Map original Q/context versus compiled candidate M, actual project/client/goal/realm/window, baseline/rollback/code/privacy, and retained history. Native private values are data, not authority; actual source/provenance/current binding/custody+authenticated owner still needed. A success DTO/parser/default-throw removal or source-looking object is not a producer.
+
+Inspect exact existing source before introducing another store: lib/mcp-qa-private-context.mjs globals default null; lib/mcp-qa-generation-draft-reader.mjs needs exact approved namedBundleHash, not latest; lib/mcp-qa-generation-material.mjs/preparation.mjs, lib/mcp-qa-original-pins.mjs, actual ctx.storage legacy control/journals; fixed closed-canary private metadata/bindings can provide selectors ONLY if actual source/grammar shows them. No provider/private reads during this source task. Existing dated resource pins in Task5 brief are references, not current facts.
+
+Every required datum row MUST name: exact current accepted validator shape; actual producer/function with file:line; exact immutable locator/key or source-qualified derivation; initialization chronology/authority and issuer; native/GHA environment/custody path; original clock/cancel/settlement ownership; privacy/output boundary; unresolved condition and smallest supported remedy. Distinguish old real Q/closed histories from new proposed save/withdraw/trial intentions; never fabricate history. If new intentions need generation before initial choice, propose exact source-owned immutable transaction and why it is authorized; Root ruling required before code. New original15min window cannot renew on GET/replay/cleanup.
+
+## QA code proof chicken-and-egg: evaluate one existing-custody route
+
+Native reader9aa permits canary+OP code/metadata/Containers, NOT QA code. GHA9db separate QA code bridge exists after seed; post-T0 seed cannot authorize pre-T0 owner preparation. Evaluate factoring existing actual GHA publication reader/bridge as a separately purposed PRE-T0 provenance producer. Native may derive exact bridge locator from actual AFW_QA_VERSION.id rather than caller/latest/one resettable sourceM tag. Bridge would bind actual QA UUID/code hash/sourceM/tree/config and exact approved bootstrap selector to actual trusted owner command/run/job/step; separate original command/purpose and completed-success primary before owner GET. A tag body/hash is factual, not issuer authority; independently check real public GitHub/CF primary under original clock. A producer cannot attest its own future job terminal. Do not decide/implement this hypothesis silently; compare to supported existing alternatives, choose smallest with Root.
+
+No new native QA CodeRead scope, GHA token in Worker, shared-secret signing key, generic public RPC/HTTP payload, raw module/policy artifact or sixth package role by inference. Initial canary/QA publication actual delivery path must be named separately: GHA9db lacks canaryEdit, native057 publisher is separate and matched/uploadable not yet verified. A later attended runbook can own initial publication; current source must not invent an API/tool/callback/credential to bridge it.
+
+## Composition limits
+
+The later native confirmation constructor has no ctx; do not return raw private bundles over new public RPC or fabricate env/ctx. Consider direct retained nativeQA_DB read ONLY if a real source-produced capsule and exact approved selector/grammar/immutable producer are concretely supported. Existing packet/draft SQL installed state is dated; no DDL/new table, row update/replacement or bypass of old exact decoder. Any new use of existing immutable table needs explicit Root ruling and owning source writer, not a free parser.
+
+Forwarding remains separate: Request/RpcTarget supported, no documented sender-script identity/AbortSignal serialization. Original30s starts canary receipt beforeIO and must never reset; source lifetime capability narrowing only, independent backend JWT/Origin/Strict/ticket/currentD1/source+binding-holder qualification remains. Rpc disposal/client timeout/Workflow terminal cannot certify remote writers settled. No forwarding code in this B2 preflight.
+
+C2 later setup/material/current-primary/all-writer/launch/confirmation/GHA adoption plus C3 existing-grant business and early withdrawal remain separate. No complete-package success, finite HEAD/reset, OAuth/cron/Container activation/Max/data/emails/automation/newchat.
+
+## Deliverable / decision
+
+Prepare exact bounded B2 proposal in docs/superpowers/reports/2026-11-01-finite-private-policy-setup-task5-b2-preflight.md, append ledger only after agreed Root design/ruling. Before that send compact table+recommendation and STOP PRODUCT for Root decision; public docs/API lookup allowed if actually needed, primary only/targeted. No repeated scan/full reports or tests before implementation. If present code cannot supply datum, say exactly what producer/selector is missing and a concrete supported source-only remedy rather than inventing a runtime fact. Root may refine B2 into a smaller implementable substep with its own RED/GREEN and review.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task5.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task5.md b/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task5.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-private-policy-setup-task5.md
@@ -0,0 +1,87 @@
+# Private policy setup Task5 — actual fixed sources, material and mounts
+
+SOURCE ONLY. Root supplies qualified execution BASE after Task4 acceptance. Read this brief first; exact accepted earlier interfaces and owning gaps are below. One product writer, no subagents or self-appointed reviewer. No C3 implementation or runtime action. Do not replay completed Native5/C2 tasks.
+
+## Global constraints
+
+- Source-only cloud work. No provider/private read, secret value, role/key/scope, OAuth action, deploy, DDL, live comment, occurrence, local dependencies/build or automatic recovery.
+- Original connection window<=900000ms; each request parent<=30000ms including queue, child<=5000ms clipped by parent/window. commandBy=min(actualReadExpiry,noticeExpiry,AccessProofExpiry,approvalExpiry,connectionWindowEnd)-480000-30000. Never renew ten-minute grants.
+- Post-T0 setupBy=T0+50000; adoption70s/ARM90s; original Known4args/18stages/70s/5s/20s and C0/C1/R1/history/uncertainty unchanged. No finite HEAD before all actual read-only eligibility checks.
+- PREPARATION uses real qualified Access realm/limiter/client/project/window bindings and independent profile grammar. C1 finite profile keeps OAuth/monitoring-owner closed and currently lacks those Access bindings. Never fake env flags or claim it already handles MCP.
+- Raw policy/context/JWT/cookies never logs/GHA/public artifacts; JWT/cookies never persist. Secret inheritance EXACT {name,type:'inherit',version_id:baselineVersionId}; no old_name/latest/omission/script-upload substitution.
+- Initial preparation publication, custody/API permission, actual baseline bytes/privacy and future runbook approval remain gates. Root's20:39:33.726UTC historical version GETs prove shape only: QA31bindings/14false/two SQLite classes; canary29/8false/AfwOwnEventNodeSQLite/container execution; OP7/3false/no export. They prove no current pointer/source lineage/secret value/artifact availability. Qualify actual copy descriptors before use.
+- Publisher metadata candidate only: root 20:45:01.750UTC exact-name account token 05718105dcdfc92e55cc3624172c2740, notBefore2026-10-28T03:00:00Z, expiry2026-11-03T02:59:00Z; one allow group 7e79ec33834341f28dd431ab73884400 on fixed canary script7d96bc137a854faa875ee0f160119810. AFW_MCP_CLOSURE_PUBLISH_TOKEN secret match/uploadability UNPROVED; future correct account verify and dated-policy trust mandatory, scopeVerified=false. Never substitute GHA9db or reader9aa; no repeat probe here.
+- operationalReadiness=false. No additional namespace, credential, public QA ingress or general URL/RPC authority.
+
+
+## Task5: C2 mounts, retained primary and final dependency gate
+
+**Modify:** worker/mcp-own/connection-preparation.mjs(new), worker/independent-closure/finite.mjs and actual existing classes; source-authority and planned lib/mcp-qa-finite-material.mjs. Create test/mcp-qa-finite-preparation-mount-native.test.mjs.
+**Produces:** readPrivateQaFiniteSetupContext({ctx,env,intentId,sourceRevision,signal})->immutable {context,receipt}; planned createPrivateQaFiniteMaterial({ctx,env,refs})->EXACT {controlOptions,readFinalPrimary,custody}. These are planned owned producers, not already available APIs.
+
+- [ ] RED actual Worker->QA DO->D1+Workflow mounts: independent Access proof, private data never in outputs; missing actual binding/custody/profile denies before effects; ctx.container/class/source mismatch denies prepare; Save/revoke changes current rows but cannot replace immutable baseline; all pre/post-T0 writers block restoration until settled.
+- [ ] Install only fixed source constructors with actual ctx/env and proven binding provenance. Initial preparation entry is independent of global OAuth gate; protect original request forwarding and fixed actor. Integrate Native5 completed setup prerequisite and36 absolute2s adoption slots through70s/ARM90s without another active-instance exception.
+- [ ] Explicit C3 dependency: delegated-oauth-worker:135 returns before /mcp when OAuth=false; :194 needs Access/limiter/pins absent from C1 finite profile. C3 must separately implement/review a narrow finite HTTP/resource-only existing-grant route with current finite control, preserving default closure; no env clone/true-flag bypass/new OAuth/server here. This plan cannot certify the full business route.
+- [ ] GREEN mounted native path and affected existing tests/scoped lint/dry-run generated profiles. Root composes full-suite/review after Native5/C2/C3; actual promotion/publication/privacy/custody/consent remain separate.
+
+
+## Pre-code qualification table (mandatory)
+
+Before affected product edits, inspect the ACTUAL fixed source seams and required producers/callers, then propose a compact exact table for Root ruling: each source function's signature/return/parent clock, actual authoritative value locator/initialization, native identity/binding/source proof, approved custody+byte residency, mutable facts versus immutable context, original request forwarding/abort, underlying writer inventory/settlement. Use supported existing APIs/source methods only. Name what comes from actual native ctx/env, own D1/SQLite, immutable provider versions, current provider pointer/Workflow/Container metadata, actual seed/GHA primary and source compiler; no invented caller-identity/native metadata API, hidden local agent, success DTO, namespace lookup guessed from a name, latest grant/program/artifact or an arbitrary URL/pins registry. If a required private bootstrap datum lacks a supported owner/source-produced locator, identify the smallest concrete initialization/handoff and proof before code. Do not fill it with fixture values or a new credential/resource by inference. Root rules autonomously; don't ask the human for engineering choices.
+
+Actual constructors must implement source-qualified positive paths from genuine runtime inputs, not replace unconditional throw with a staged true flag or caller function. Missing/malformed/expired/unqualified runtime inputs remain fail-closed configuration gates. Describe any actual input gate precisely; do not label an unimplemented path complete. No static isNative/selected/sourceVerified bool as authority. A factual hash/status/native test fixture alone grants nothing.
+
+## Accepted dependencies; read targeted actual source, not whole history
+
+- Native5 actual context/inventory/coordinator, nominal launch and cached-step launcher/confirmation, setup completion and absolute adoption loop are accepted. Specs/plans: 2026-11-01-finite-native-launch-adoption-design.md / finite-native-launch-adoption.md. Current original operation deadlines and Known4args/18stages/70s/5s/20s remain unchanged.
+- C2T1 actual exact records/store/journal, append-only history/selection/witness/binding/context and actor writer-head. C2T2 actual RSA/Access + owned first-primary D1 + genuine SDK/notice links. C2T3 fixed Beta publisher and all three pre-T0 approvals/receipts/final selection; reviewed source43ebcacd after shared whole-stage retention correction. C2T4 native setup reviewed3b1f876; exact native/source/material table in Task4 brief, original-context projection/domain, original Q versus candidate CODEM, original event/queue30s and setup50s, exact current T0<commandBy binding semantics. Do not copy snippets from old unqualified commits.
+- Whole-stage mcp-qa-finite-stage-work.mjs is INTERNAL retention/denial only. Actual ctx+original private lineage before source hydration; actual nested promises before races; original termination AND actual fulfillment/rejection before release. Later native effect admission separately minted only after fixed source/seed/facts/NEW binding/context ACK/readback. No force/clear/reset/refund/mint or cross-RPC/thenable settlement claim. AsyncLocalStorage uses supported run/getStore inside one native scope; actual platform RpcPromise must be awaited in a source-owned native continuation, not passed raw or turned into a generic caller callback.
+- Genuine owner entry actual QA names AFW_QA_VERSION, AFW_QA_OCCURRENCE_RATE_LIMITER, RELEASE_DB and ctx.storage; no aliases/env clone/profile/quota mutation. Actual finite canary uses AFW_FINITE_TRIAL_VERSION, fixed own namespace/class/Container link and actual controls. Ordinary OAuth retains its existing DB/DELEGATED_RATE_LIMITER.
+
+## Fixed source seams to complete / compose
+
+Read actual code and relevant precise callers; these are currently intentionally unavailable (no registration allowed):
+- mcp-qa-finite-owner-source.mjs: readPrivateQaFiniteOwnerSource and forwardPrivateQaFiniteOwnerAuthorization/Grant/Notice. Preserve Task2/3 exact owner source tuple, original original-POST admission and genuine SDK-before-grant/after-success/notice chronology; fixed native sender/QA target only. Overwrite transport metadata, preserve original receipt deadline and abort without fresh30 in QA. JWT/cookies can cross only actual private request path transiently, never persist/log; actual backend verifies canonical Origin/Strict ticket and Access independently. No generic public raw owner RPC.
+- mcp-qa-finite-connection-source.mjs: readPrivateQaFiniteConnectionSource -> accepted EXACT {ownerSource,baseline,rollback,candidate,bytes,assertCurrent}. Candidate/code/privacy/exposure/custody and ALL old writers must actually qualify; assertion closure source-owned, no caller expected-transition DTO.
+- mcp-qa-finite-policy-setup-source.mjs: readPrivateQaFinitePolicyEntry({env,event,step},originalLease), readPrivateQaFinitePolicySource({ctx,env,intentId,sourceRevision},originalLease), exact Task4 table. Actual original route/entry+M/QA+fixed Workflow primary, not matching IDs alone. Native event/queued follow actual completed-success seed; no invented equality/order, future timing/renewal. Actual Source must establish original Q/current primary and actual candidateM program correspondence, not relabel code revision.
+- mcp-qa-finite-launch-source.mjs: resolvePrivateQaFiniteLaunchContext, readPrivateQaFiniteLaunchMaterial and readPrivateQaFiniteLaunchOperations; exact actual original APIs/data/protected inventory. Shared coordinator retains ACTUAL callback until settlement, not timeout wrapper.
+- mcp-qa-finite-confirmation-source.mjs: readPrivateQaFiniteConfirmationMaterial({env,event,step,parent}) -> EXACT {bundle,plan,execution}, actual private first HEAD/SEND/control/native metadata/current consent and source; original env/event/step references/four Known args retained. No private raw policy over HTTP/RPC.
+- mcp-qa-finite-adoption-source.mjs: readPrivateQaFiniteSetupCompletion({intentId,sourceRevision,parent}) -> EXACT {receipt,instance,observedAt}. This caller is not necessarily a Worker: inspect actual GHA/client custody and don't invent ctx/env. Actual exact native setup completed-success/output+pointer/writer qualification before observer/control, while exact qualified10400 observer404 only is waitable. Reuse absolute36x2s slots/original70s; no new parent or setup active-instance exception.
+- mcp-qa-finite-source-authority.mjs: qualifyFiniteNativeSourceContext and readFiniteNativeCustody; no caller boolean/source pin/env material. Preserve separate GHA QA-code evidence versus native code scope; role/module/profile/hash-source qualification is factual, not arbitrary authority.
+- Planned mcp-qa-finite-material.mjs: createPrivateQaFiniteMaterial({ctx,env,refs}) -> EXACT {controlOptions,readFinalPrimary,custody}; readPrivateQaFiniteSetupContext({ctx,env,intentId,sourceRevision,signal}) -> immutable {context,receipt}. Real fixed constructors, not factories accepting caller body/keys/callbacks/success evidence. Compose actual original context, stored receipt, current source/primary and cleanup ownership.
+
+## Material residency and actual program/source provenance
+
+Native QA has no GitHub artifact download credential. Public seed/manifest or connector file ref does not supply private bytes; do not invent env.GITHUB_TOKEN, public private-code artifact, generic module RPC or copy GHA key into native env. Native reader has canary/OP code + account Worker metadata/Containers read, NOT QA code. Existing GHA publication bridge separately qualifies QA bytes with GHA custody; preserve that distinction and scopeVerified limitations.
+
+Source-owned candidate canaryM bytes must really be resident before native run. Root's possible route (NOT yet selected): source compiler DAG canary first then QA-only compressed exact canary bytes/metadata, no self/package hash cycle or embedded private policy. Inspect actual module graph/build; propose exact mechanism/size/privacy/provenance/decoder limits before implementation. Candidate <=3MiB general descriptor AND Known artifact.script<=2MiB before effects; actual descriptor3keys separate exports/profile. Code artifact actual M/tree/check/script SHA; original programme Q/context not re-labelled. Builder before/after same physical checkout rule, exact emitted module hashes and Root-approved derived dry-run-only limitation stay. No image/Docker build or changed Container app/namespace.
+
+Complete package remains ineligible until ALL owning Source/C3/privacy/historical gates actually implemented. Do not turn buildFiniteNativePackage's missing-gate throw into a blanket success on file presence/fixture bool. An actual approved historical locator/byte privacy+hash/source provenance table is required before historical raw bytes can enter a public artifact; observed historical versions are NOT invented Git commits. Current source phase may keep package ineligible specifically because C3 is not implemented; record the concrete handoff, not a false full-package claim.
+
+## Owned current versus retained original / cleanup
+
+Retain immutable owner selection/source snapshot, original baseline/project revision/goal/program/legacy/private policies and T0/C0/C1/R1. Actual prearm publication sequence is historical after own post-T0 activation; independently qualify actual current pointer/code/config using exact real journal ACK/PolicyReceipt transition. Fresh owner/grant/notice/revision before business/prepare; after authorized Save/revoke, cleanup/final-primary/withdraw/close/seal/proof must use retained original context + current withdrawal/known Save/settlement, not an ACTIVE-owner eligibility reader that rejects cleanup.
+
+ALL actual pre/post-T0 writer families must block positive restoration until settled: old legacy publishers/operations, original owner stage and final/nested IO, setup publication, actual native nominal create, launcher and original nominal activity. Native Workflow terminal is necessary, NOT sufficient. No max-three-process filter repurposed as complete inventory. No invented process receipt/terminal flag/administrative override. Held/unknown callbacks/SEND or provider work => admin_pending, no positive restore or new send.
+
+Original cleanup ordering/proof: withdraw nominal -> permission-only withdrawal -> separate close -> seal -> retain proof/readback BEFORE canary POST. retired_process actual physical proof OR sealed_without_admission irreversible gate+all writers settled+actual primary; null/404 isn't proof. Canary restore exact original observer may active, nominal+launcher terminal; guard complete -> NEW QA restore claim ACK -> same observer fresh first-primary -> observer provider complete -> GHA lock/full chain/unique send -> ONE QAclosed POST/readback by R1. First finite HEAD never reset/advance/reuse; source cannot expose raw private bundle to client.
+
+## Source/custody/resource boundaries
+
+PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web. CF account85d0d5dadac3341a564f22ce885e9eec. Fixed QA agent-friendly-web-independent-closure-qa / namespace070c4a7708eb4592a3ded7c117a88225 / actor afw-own-successor-closure-v1. Canary agent-friendly-web-delegated-canary / namespace+app d6fc71552de7494a863aca20365a572d / class AfwOwnEventNode SQLite and app agent-friendly-web-delegated-canary-afwowneventnode. QA RELEASE_DB is canary6a728254-1494-4039-802e-b39288a55fcc; QA own DB676ca49e-af71-4f2f-a12d-11f13de78a51 distinct. OP agent-friendly-web-release-operator. Shared account doesn't permit Tokenizart/FCO reads/actions from this task.
+
+Known dated custody metadata only (no current secret match/permission claimed): GHA9db7901af95faf07e6f7ef378045328e (expires8Nov02:59:59Z), native reader9aa97ad1fc9afe3021cf69ea497d5190 and native publisher05718105dcdfc92e55cc3624172c2740 (expires3Nov02:59Z). Do NOT alias these identities, widen/read token policies/TokenRead, rotate/paste/renew or repeat accepted custody. Source constructors must verify correct account/token identity/lifetime/approved exact operation trust within original clocks; method capability and stored-match stay actual future gates. No real token/provider probe during source work.
+
+Dated resource/metadata evidence only: report2026-11-02-preparation-provider-schema.es.md; Root4GETs QA versionc570b60b/dep4c78c652 and canary2607abae/dep7b5a3683 shape+Container link, NOT current full closure. Beta create JSON modules.content_base64,deploy=false, explicit inherited version UUID; whitelist writable fields and exact existing namespace/backend/container, never new/deleted/transferred class. Source getters may include read-only lifecycle/cache fields: propose exact documented normalization before relaxing existing strict execution helper; no guessing from response shape.
+
+## C3 / acceptance boundary
+
+Global OAuth=false currently returns before normal /mcp and owner connection/revoke; finite profile lacks preparation Access/limiter pins. C3 must separately implement/review narrow existing-grant finite business/resource and early owner-withdrawal path with actual controls. No env clone/true-flag bypass/new OAuth/server here. C0 cleanup alone isn't early owner withdrawal. Source Task5 cannot certify full business/client/useful cloud turn/PCoff or fabricate a callback/scheduler/consumer. Preserve existing cloud mail monitor/paused local automation; create none.
+
+## Evidence / completion
+
+Meaningful RED then GREEN actual Worker→QA DO→owned D1/SQLite/Workflow mounts and actual new constructors/parsers under explicitly SYNTHETIC CF/GitHub/custody boundary. Don't stub whole source/facts success and claim full path: test actual new logic and label each replaced external boundary. Cover wrong source/binding/profile/ctx.container/class/holder, original forward clock/abort/replay/Strict/JWT, private raw output denial, changed Save/revoke with original context preserved, missing setup success/output, held native create and all writer families blocking restoration. No tests/side effects against actual providers.
+
+Commands source plan: node --test test/mcp-qa-finite-preparation-mount-native.test.mjs test/mcp-qa-finite-read-rpc-native.test.mjs test/mcp-own-finite-entrypoints-native.test.mjs, plus actually affected Native5/C2 tests, scoped eslint exact JS. New compiler/residency changes justify targeted compiler/native source/profile and bounded generated-byte dry-run ONLY, not Docker/provider or full suite repeatedly. Existing lockfile Node22 in hosted Actions; temporary contents:read/no secrets/artifacts/deploy/docs-only-trigger qualifier excluded integration. Root runs whole-suite/lint/build/whole-branch review AFTER C2/C3/source composition, never this task by reflex.
+
+Report docs/superpowers/reports/2026-11-01-finite-private-policy-setup-task5.md; append finite ledger. BASE/code/docHEAD/exact CAS+ref+file readbacks, contracts/rulings before code, exact RED/GREEN commands/output/run/job/attempt/counts, selfreview, actual vs synthetic and owning remaining gates. Original source capture/proofs raw never logs/artifacts. STOP WRITES for fresh Root spec+quality review. No Task C3/actual promotion/runtime/consent work.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-01-finite-profile-package-task4c1.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-01-finite-profile-package-task4c1.md b/docs/superpowers/briefs/2026-11-01-finite-profile-package-task4c1.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-01-finite-profile-package-task4c1.md
@@ -0,0 +1,76 @@
+# Task4C1 — public profiles, typed provenance and actual compiler staging
+
+SOURCE ONLY. Root-dispatched implementer; no subagents. Read this first, then only the Global constraints, Fixed interface block and Task4C1 section of ../plans/2026-11-01-finite-profile-package.md and the applicable accepted ../specs/2026-11-01-finite-profile-package-design.md. Do not read the whole preceding history or other task bodies. Preserve root's task-by-task SDD/fresh-review method.
+
+## Baseline and authorized scope
+
+Concrete B3 interfaces inspected at eaefd5aabf5ebf3c08da29c2ad6d1eb699af39f8. Root assigns the execution branch/BASE after current reviews; do not overwrite an active writer or assume this design branch is the product branch. Read its pinned AGENTS and verify exact tree first. All code/deps/tests/builds run on GitHub/Actions, not locally.
+
+Implement public static profile qualification, explicit historical provenance codec, B3 QA-publication amendments and the REAL source compiler/packager. Default profiles stay closed. Full native material/factory integration is 4C2 after Native5 primitives; complete nominal/receiver route is 4C3. Positive compiler staging is not a complete finite package. Missing mounts, historical bytes or qualifications MUST block complete-package output/upload.
+
+No provider/private CF read, credential value/copy/new custody, role/scope, protected preservation-stage dispatch, deployment, DDL, live comment, OAuth, occurrence or Max. Design acceptance does not authorize privacy/preservation/runtime execution.
+
+## Files and fixed B3 calls
+
+Create lib/mcp-qa-finite-profile.mjs, scripts/build-finite-native-package.mjs, worker/independent-closure/finite.mjs, worker/mcp-own/finite.mjs, wrangler.independent-closure-qa.finite.jsonc, wrangler.mcp-own.finite.jsonc, .github/workflows/afw-finite-native-package.yml and the three profile/builder/native tests named below.
+
+Modify lib/mcp-qa-finite-source-authority.mjs, mcp-qa-finite-seed.mjs, mcp-qa-finite-package.mjs, mcp-qa-finite-seed-primary.mjs, mcp-qa-finite-publication.mjs, mcp-qa-finite-publication-bridge.mjs, mcp-qa-finite-seed-issuer.mjs, mcp-qa-finite-http.mjs and affected codec/transport fixtures; scripts/verify-qa-finite-archive.py; lib/mcp-activation-observer.mjs. Do not silently broaden scope to4C2.
+
+Keep source-authority exports:
+- qualifyFiniteSourcePackage({manifest}) -> immutable exact five-role expectations containing internal publicStatic/privateFull rules.
+- qualifyFiniteSourceRoleMetadata({manifest,role,metadata}) -> same-role qualified expectations or throw.
+- qualifyFiniteNativeSourceContext({ctx,env,intentId,sourceRevision,seed?}) and readFiniteNativeCustody() remain unavailable until 4C2 supplies actual source/native qualification. No registration/caller pins/success callback escape.
+
+Publication already calls the first two synchronously after actual modules; bridge calls native context before/after seed and readFiniteNativeCustody() without args. Preserve these signatures. Do not replace imports with a test callback in production. Actual byte hashes and build/source lineage are independently checked; expected static profile comes from approved templates, never metadata being accepted.
+
+## Required contracts
+
+projectFinitePublicConfiguration({role,metadata}) validates exact source fields first. Canary-only typed private slots: AFW_DOSSIER_EVENTS_POLICY, AFW_DOSSIER_SUCCESSOR_POLICY, AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY, AFW_DOSSIER_RETIREMENT_POLICY, AFW_OAUTH_PILOT_PROJECT_ID, AFW_OAUTH_PILOT_CLIENT_ID. Exact presence/type/purpose is reviewed source policy. Unknown additions/accessors fail; no generic stripping. QA has no plaintext private slots. Existing raw policy gates and actual full fingerprints stay intact.
+
+Manifest role EXACT {provenance,module,publicStatic}; publicStatic EXACT {purpose:'afw.finite-public-static-profile.v1',configurationHash,profileHash,bindingsHash}; exact domains/union are in the accepted spec. New live roles require actual M/tree. Historical content pins preserve actual names/version/bytes/config and source-approved receipt blob; they are NOT original compilation attestations. qaClosed remains closed-rollback.mjs. Original C570 Git SHA/tree remains unverified.
+
+Advance strict manifest/seed/envelope/hash purposes to v2 together. Task2 cached tree(revision) reads compiled M or genuinely attested historical tuple; historical-content variant checks exact receipt blob at M instead of fabricating an original commit. Operator must match literal historical pin, replacing its old source!=M syntax predicate explicitly. Update archive validator/fixtures and all seed consumers; no actual stored seed migration.
+
+B3 readFiniteQaPublication must preserve FULL actual configurationHash while adding publicStatic; don't compare projected manifest hashes to full CF hashes. Native QA bridge checks same-role publicStatic through the source context after qualified seed; direct QA code provenance stays false and scopeVerified stays false. Preserve finiteSourceFile/qualifyFiniteSeedLineage, real source/build/artifact/step validation, original budgets and issuer-start versus later-completed-step ordering.
+
+Document4C2's PRIVATE privateCanaryConfiguration tuple/INFO amendment, but do not fabricate private material here. Existing private deployment configurationHash stays FULL; public source/canaryContainment bindingsHash semantics are explicit. GHA receives no raw canary configuration. Finalizer selects closed canary only; qualify its closed pointer before reading its closed metadata.
+
+Activation snapshot needs ACTUAL version_metadata name/type/provider shape for AFW_FINITE_TRIAL_VERSION. Add strict grammar/unknown-extra/accessor tests, never discard binding or forge alias. Exact source profile includes actual classes/resources/aliases,14 QA false/four release true, namespace preservation, private release-read alias distinction and legacy receiver denial; use the spec's fixed values. No env-spread normalization.
+
+## TDD and real package gates
+
+1. Write named failing cases: private_projection_preserves_full_fingerprint; unknown_private_slot_denied; actual_version_metadata_required; historical_content_never_claims_M; missing_factory_blocks_package; stale_historical_artifact_blocks_upload. Assert equal public hash with differing valid raw policies, unequal full hashes, and unchanged Known raw rejection.
+2. Run meaningful hosted RED before implementation; failure must expose missing behavior, not fixture syntax.
+3. Implement source rules/codec/publication and actual builder. buildFiniteNativePackage({cwd,sourceRevision}) -> {manifest,files} only after all mandatory inputs and mounts qualify; CLI node scripts/build-finite-native-package.mjs <M>. Use actual source checks before/after, esbuild/metafile/class/native tests and external postcompile hashes. Source registration slots or exports alone cannot prove mounted semantics.
+4. Main-push producer is secret-free/read-only; exact six files and artifact afw-finite-native-package-<M>. Missing Native5/4C2/4C3 mounts or historical inputs yields no eligible artifact. Tests may qualify compiler staging separately with actual classes, clearly labeled incomplete.
+5. Historical input lookup is exact reviewed run/head/attempt/artifact ID/digest/receipt, never latest/arbitraryURL. Existing bytes are NOT known available. The future protected fixed-read preparation and its privacy/identity gate need separate root scope; do not add a secret-using push trigger or upload private raw policies/modules. No artifact ID fabricated.
+6. GREEN plus proportional affected tests/scoped lint and actual generated-byte Wrangler dry-run; stop writes for root fresh review.
+
+Commands on hosted Node 22 after npm ci --ignore-scripts --no-audit --no-fund:
+- node --test test/mcp-qa-finite-profile.test.mjs test/build-finite-native-package.test.mjs test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-seed.test.mjs test/mcp-qa-finite-package.test.mjs test/mcp-qa-finite-seed-http.test.mjs test/mcp-qa-finite-seed-issuer.test.mjs test/mcp-qa-finite-publication-bridge.test.mjs
+- python3 -m unittest discover -s test -p finite_archive_test.py
+- node --test test/mcp-qa-finite-http.test.mjs test/mcp-qa-finite-cf-http.test.mjs test/mcp-qa-finite-observer-native.test.mjs test/mcp-qa-finite-read-rpc-native.test.mjs
+- npx eslint <exact changed JS paths>
+- npx wrangler deploy output/finite-native-package/qaLive/index.mjs --config wrangler.independent-closure-qa.finite.jsonc --dry-run --no-bundle --outdir output/finite-dry-qa
+- npx wrangler deploy output/finite-native-package/canaryLive/index.mjs --config wrangler.mcp-own.finite.jsonc --dry-run --no-bundle --outdir output/finite-dry-canary
+
+Assert generated bytes unchanged. Staging uses the same commands against explicit isolated staging paths and cannot upload an eligible package; no provider effects.
+
+Retain existing size/request/time bounds. Temporary finite-task1 qualifier is branch-only/excluded integration; no full-suite reruns unless root requests the composed gate.
+
+## Required report and stop
+
+Write docs/superpowers/reports/2026-11-01-finite-profile-package-task4c1.md; append docs/superpowers/progress/2026-11-01-finite-native-confirmation-cleanup.md. Record exact BASE/code/docHEAD, paths, RED/GREEN commands/run/job/counts, module/profile/build evidence, staging versus package limits and unclosed source/privacy/custody/input gates. Verify cloud CAS/readback; return DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED and stop writes for fresh review.
+
+Preserve original 4args/18stages/70s/5s/20s and outer clocks/history. Source classes/profile/compiler readiness does not prove full finite package, live capability, guard liveness or PC-off. operationalReadiness=false.
+
+
+## Root execution addendum
+BASE is assigned by the following root dispatch; previous B3 is now accepted througha776e115 (fixcodef2b35826,72coveringPASS/scopedreviewclean). Preserve the strict job-start string/safe-integer check.
+This task is source compiler/profile staging only. Sourceauthoritydefaultfullpackagequalification stays unavailable until actualNative5/4C2/4C3 mounts and privacy-qualifiedhistoricalinputs exist. No artifact claims from function presence, compatibility=true fixtures or an unattested readiness flag. Positive staging uses actual compiled classes and source-owned templates; no production caller/pins/true-witness/registration bypass. No schema/DDL/remote preservation or metadata probe. Prior data/journals/history are never reinterpreted duringv2codec change.
+
+## Root C1 scope addition: finite withdrawal profile (2026-11-01)
+
+Source audit requires AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED='true': createFiniteOwnNativeCleanupHost.withdrawFiniteTrialPermissions calls createFiniteOwnReductionActions, whose construction and every current() verify the actual flag, exact raw withdrawalPolicyHash, own container/program/source, original consent and C0/C1. Preserve those predicates.
+
+Root authorizes a finite-entrypoint-only subclass of the actual SQLite AfwOwnEventNode denying legacy withdrawPermissions and withdrawPermissionsForPlan before env/host/auth/storage/budget/transport; preserve constructor/namespace and inherited finite path. Ordinary entrypoint remains unchanged. Use hosted meaningful RED/GREEN poisoned-env tests and actual compiled class dry-run. This is not entered-old-await or cross-generation compatibility proof; those remain C3. RETIREMENT_READ_ENABLED stays false: finite retirement uses createSuccessorRetirementHandoff with its separate finite journal prefix. Whole-package source qualification remains unavailable.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-02-finite-initial-cleanup-owner.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-02-finite-initial-cleanup-owner.md b/docs/superpowers/briefs/2026-11-02-finite-initial-cleanup-owner.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-02-finite-initial-cleanup-owner.md
@@ -0,0 +1,9 @@
+# Task B2b — mounted initial cleanup owner
+
+Read binding spec ../specs/2026-11-02-finite-initial-cleanup-owner.md first and the single TaskB2b in ../plans/2026-11-02-finite-initial-cleanup-owner.md. These are your requirements; exact values apply verbatim. Root delegated routine implementation decisions; do not restart user approval/design questions. Use actual dispatch branch HEAD/tree recorded by Root. Sole source writer, no subagents/reviewer spawning.
+
+This unit extends the ACTUAL B1→A→inactive uploader continuation, not another factual reader or unavailable success adapter. Safe RPC stays DATA/negative authority; no actual initial intent until complete composition. Pre-code table before product, meaningful actual native RED/GREEN, private durable arm + existing alarm mounted only finite subclass, strict initial-only recovery with unknowns/futureforwardjournal unavailable. Source/keys/custody/clock/zeroeffects and owner-window/handoff limits in spec bind everything.
+
+Existing accepted B2a report and review are2026-11-02-finite-initial-inactive-upload.md; preserve its result and original transaction/retention discipline. Historicalwriter qualification report narrows a concrete old restore SEND; does not drain olddispatch or prove9aanativecapability. Do not redo accepted units or expand full owner/activation scope.
+
+Report same basename ../reports/2026-11-02-finite-initial-cleanup-owner.md, append shared ledger; actualrun/head/tree/commands/counts/native-versus-SYN/bytes/limits/CAS/readbacks. HostedNode22 only. No local clones/deps/build/temp or remote runtime/main/livecommand/grants/token/Max actions. STOP for Root fresh review.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-02-finite-initial-inactive-upload.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-02-finite-initial-inactive-upload.md b/docs/superpowers/briefs/2026-11-02-finite-initial-inactive-upload.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-02-finite-initial-inactive-upload.md
@@ -0,0 +1,7 @@
+# C2-B2a implementation brief — initial inactive upload
+
+Read first ../specs/2026-11-02-finite-initial-inactive-upload.md: it is the binding requirements with exact values. Plan ../plans/2026-11-02-finite-initial-inactive-upload.md. Source-supported preflight ../reports/2026-11-02-finite-initial-inactive-upload-preflight.md; older fulltable ../reports/2026-11-02-finite-initial-publication-preflight.md.
+
+Single unit: private real deploy=false upload inside surviving B1 winner after actualA/post-sync. Helpers only codecs/journal/pure wire as required. Do not add another factualreader, generic registry, caller facts/credentials, runtime dispatch or future activation authority. Root explicitly removes activation's allwriter/Workflow-capability prerequisites from inactive creation while preserving olduncertainty and futuregates.
+
+Report ../reports/2026-11-02-finite-initial-inactive-upload.md; shared ledger ../progress/2026-11-01-finite-native-confirmation-cleanup.md. Fresh implementer/no subagents/sole writer; GitHub/Actions only. Exact taskBASE provided in dispatch; keep actual chronology of pre-code table, RED, product and Root rulings. No source/task control pretending passed runtime. All readinessfalse.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-02-finite-initial-preparation-source.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-02-finite-initial-preparation-source.md b/docs/superpowers/briefs/2026-11-02-finite-initial-preparation-source.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-02-finite-initial-preparation-source.md
@@ -0,0 +1,39 @@
+# Task5-B2-C2 — Initial private preparation/source preflight
+
+SOURCE ONLY, PREFLIGHT FIRST. Repository tokenizartinfo-ops/agent-friendly-web, branch feat/finite-native-cleanup-20261101. Read this first; it is the requirements. Current C1 code d22d5366069ff569e428bc051a3e524f93abeed0/docs b7ca96be80da939ad906c52e5b2ab900e901e4cd is under independent review; no implementation/writes until Root accepts that gate and issues the actual contract.
+
+## Bounded next result
+
+Identify the smallest concrete source-owned initial private preparation producer, immutable selector/once record and original source-context construction needed BEFORE the first owner ticket/consent. B1 actual candidate-byte residency and B2-AB historical facts are accepted. C1 adds factual pre-T0 QA publication provenance, not source authority or an owner capsule. Do not redo them or expand into all remaining Task5/C3.
+
+Send Root an exact supported table and minimal proposed contract BEFORE any code/spec change. Root will decide, persist the ruling and authorize one bounded implementation. No guesses disguised as working APIs. If a load-bearing primitive does not exist, state it and propose the smallest owned source addition with its actual entry, trust and side-effect boundary.
+
+## Read narrowly
+
+- C1 brief/spec/report and existing B2-AB preflight report only relevant source tables.
+- lib/mcp-qa-finite-owner-source.mjs, source-authority.mjs, owner-preparation.mjs, owner-http.mjs.
+- lib/mcp-qa-finite-connection-source.mjs, connection-profile.mjs, connection-preparation.mjs, policy-transport.mjs.
+- worker/independent-closure/finite.mjs and only actual entry/class sections of index.mjs.
+- B1 candidate-residency, B2 historical-source, actual private preparation records/store, and fixed compiled source constants.
+- Existing named packet/draft readers and schema only to evaluate a specific storage/selector proposal, not broad old history.
+- Existing full package/material source seams only when they are an actual dependency.
+Do not dump the ledger, AGENTS/history or unrelated Tokenizart/FCO.
+
+## Table required
+
+1. Actual original entry: existing native Workflow versus DO entry; fixed operation/payload/instance ID and source-owned issuer/owner command provenance. Separate initial preparation clock from C1 P0/Pend and later business T0/N1/C0/C1/R1. Queue, event time, original lease, once/SEND/ACK/uncertainty and forbidden retries must be explicit.
+2. Initial source identity/trust: actual native ctx/env/namespace/version/binding holders, current pointer/exposure, independently compiled M/tree, C1 named factual bridge and source-owned callgraph. No caller DTO registration/global env getter/native-looking object as identity. Git refs mutable: the selected trust boundary MUST explicitly accept repositoryWriterTrustAssumed=true/historicalRefNonmutationVerified=false, or require an actually supported stronger proof before an owner window. Metadata/source hashes alone never authorize effects.
+3. Actual private inputs: old artifact frozen315/source2a477 versus original Q from manifest+D1 versus candidate M; owner/project/revision/goal/client/Access realm and actual current row where obtained. Do not guess from labels/emails, reconstruct strings from hashes, relabel Q or synthesize a new draft from historical19fc. User authorized choosing ordinary test goals; existing selected content goal is a declared preference, not proof of current project ownership.
+4. Candidate bytes: reuse B1 actual resident canary text/bytes. No raw >64KiB RPC, new generic upload/proxy, unknown artifact-ID-to-bytes transport, or private module/config/tag output.
+5. Initial capsule and selector: choose a concrete existing native storage/immutable table path with exact grammar/hash/key, source revision/QA UUID/original intent binding, write-once ACK/readback and retained original preconnection ID. Existing namedpacket/draft tables are not generic maps: their keys derive actual generation_plan_hash/named_bundle_hash. Root has not approved a new table/store/resource or oldhash reuse. A private native DO append-only record is only a proposal until exact ruling. Preserve all old native/D1 history and first finite HEAD.
+6. Owner source: exact accepted validateFiniteOwnerSource fields and genuine closed_ui initial baseline/currentPublication/window, then retained connection/notices/finite chain. Owner <=15min and read <=10min do not start now, never renew due source re-read/retry/new stage. No read grant as configuration approval.
+7. Initial canary closed_ui preparation: exact connection-profile Access/limiter/client/project/expiry bindings, source actual values and private initial publication authority/bytes/rollback. Native9aa only read, publisher057 canary editor only; GHA9db QA editor only. No key transfer/scope extension. Initial QA upload and native initial canary stage are separate publication gates, never executed by this preflight.
+8. Actual API/budget: original owner resolve repeatedly wraps readSource in child<=5s; C1 standalone 3CF+11GH original30s cannot simply be duplicated around every owner step. Propose source-owned invocation-local proof/current-primary checks without inventing cache authority or extending clocks. Separate local holder coherence, GitHub technical facts, current provider/DB state and all-writer settling.
+9. Native Workflow primary: official https://developers.cloudflare.com/workflows/build/workers-api/ documents env.BINDING.get(id).status() returning actual status/output. This may avoid REST permission assumptions for a fixed existing instance, but proves no caller-script identity/physical settlement on its own. Verify actual source binding/entry; no invocation, consumer, event subscription or workflow activation.
+10. Enumerate exactly which source seams this bounded unit would replace versus remain unavailable. Full material, current all-writer mounts, bootstrap-after-T0, cleanup/finalizer and C3 business/Save/early withdrawal/receiver are separate. Do not claim completePackage/source authority globally or hide owning gaps behind booleans.
+
+## Existing custody / execution constraints
+
+Dated native reader9aa97ad1fc9afe3021cf69ea497d5190 and canary publisher05718105dcdfc92e55cc3624172c2740 ceiling 2026-11-03T02:59:00Z unchanged. GHA9db7901af95faf07e6f7ef378045328e receipt through8Nov02:59:59Z; workflow create permission NOT proved. Current matches/capability require future actual verification; no renewal, token alias/copy or scope widening here. No provider/private resource query, actual tag/command/dispatch, deployment, OAuth/consent/window, credentials, DDL, cron, Containers, Max, email/chat/automation or local source/deps/build. Main untouched.
+
+One agent, no subagents, READ ONLY until Root ruling. Return compact exact table with concrete source file/lines, small alternatives only for genuine unresolved mechanism, proposed exported APIs and test/evidence plan. Root persists the full preflight. operationalReadiness=false; completePackage=false; PCoff=false.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-02-finite-initial-publication.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-02-finite-initial-publication.md b/docs/superpowers/briefs/2026-11-02-finite-initial-publication.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-02-finite-initial-publication.md
@@ -0,0 +1,38 @@
+# C2-B preflight — initial native entry, publication and private capsule
+
+Read first. AFW repository tokenizartinfo-ops/agent-friendly-web; isolated feat/finite-native-cleanup-20261101. C1 acceptedRoot6038; A code2ab571bd/docs119f21f reviewedPASS/qualityapproved, sourceonly. One writer, no subagents, firstREADONLYpreflight/no code untilRootactualcontractruling. B is not an API/platform rewrite or all ofTask5/C3.
+
+## Bounded useful next result to make exact
+
+Source-owned initial native Workflow entry+existing privateactor, original owner-command/once/unknown-outcome fencing, current source/custody/all-writer preconditions BEFORE any Aclaim/effect where possible, actual initial canary closed_ui publication with recoverable rollback and journals, retained immutable private preparation capsule. A's factualresult/data/localWeakSet never grants effectpermission or provesrestartconsumption. ActualownerHTTPforwarding/source-session/three-stage mounts may be separately bounded if the actual dependency table requires; no fake source success todeclare allavailable.
+
+FIRST return exact actual-supported issuer/entry/clock/source/custody/primitive/effect/journal/rollback/table and minimal proposed API/result/storage contract. Mark which next seams canreally beimplemented/whichremainunavailable. Root decides thenpersistsruling beforeproduct. No actualcommand, instance, tag, grant, window, publication or provider probe by this preflight.
+
+## Read narrowly
+
+- reports/2026-11-02-finite-initial-material.md, specs/2026-11-02-finite-initial-material.md; full initialpreparationpreflight only pertinentsections.
+- Actual three lib/mcp-qa-finite-initial-material*.mjs, B1residency, C1bootstrap source/native/publication, B2historical source only specificfactpaths.
+- worker/independent-closure/finite.mjs and actualclasses inindex.mjs; actual fixed bootstrap binding inwranglerprofile.
+- Existing actual native originalentry/DOtransport and canary upload/activation/restoration helpers, connection-profile, policy-transport/source seams. ActualAllwriter source/gate only relatedmethods. Don'tdump ledger/AGENTS/history or unrelatedprojects.
+- reports/2026-11-02-reader-metadata-preparation.es.md (new primarymetadata, NOT capabilityproof).
+- Existingowner-source/owner-preparation/HTTP exact interfaces where capsule/readsession musteventuallyfit.
+
+## Binding decisions and concrete risks
+
+1. Future creator is Root's already-authorized CloudflareMCPadminAPI, one deterministic WorkflowID/payload, not assumedGHAWorkflowCreate or transferredtoken. UnknownCREATEACK: onlyGETreconcileexactID, no alternateID/retry/restart. Initialconfigurationpermission derives actualfixedownercomment, not callerDTO/MCPidentity.
+2. Actual nativeWorkflow.run event timestamp documented as instancecreated(triggered), with instanceId/workflowName; source https://developers.cloudflare.com/workflows/build/workers-api/ . No nativecaller-script attestation or separatequeuedAt from status. Original I0=actualinitialcomment time, includes allqueue; C1P0/Pend and laterbusinessT0/N1/C0/C1/R1 remain distinct. No Rootclock compensation. Explicit originaloperation/childtimers; Aparent<=30s/child<=5. Don't silently renew A/budget onread/phase/Workflowretry.
+3. Trust boundary: actual deployedsourcecallgraph plusaccount/bindinggovernance, independent compiledM/tree/C1 hashes andcurrentQA/version/pointers. repositoryWriterTrustAssumedtrue/historicalRefNonmutationVerifiedfalse acceptedtechnicalboundary, no publisheridentity/physicalsettlement claim. Need independentlyqualified actualnativeentry originalissuer/currentcontrol; no registry/caller-enrolledsuccess/context DTO.
+4. Aglobalcommittedonce fences evenlostACK; localstorageWeakSet onlysameisolate. Iffirstclaimnevercommitted, absentdurablerecordafterrestart proves neitherconsumption norphysicalsettlement. B must own this; don't hidebehindAflag or regenerateIDs afterunknown. Define nativeentrydurability/terminal+originalwriter proof, step retries/callbackreruns/failure-readonlyreconciliation.
+5. Initialoldcanary baseline/rollback fixed historical2607 rawmodule/config fromactual9aa supportedread; newcandidate onlyactualA/B1bytes underM. Initialpreparedclosed_ui profile exactAccess/limiter/client/project/absoluteexpiry, allEnabledfalse/privatepoliciesempty asactualconnection-profile. A has no speculativecurrentbaseline/currentPublication. ActualversionreturnedonlyafterPOST; no predictedUUID. Reuse actual supported uploadmultipart/inherit-secret logic, no secretvalue read/copy or wrongsecret_textdescriptor upload. Uploadversion != deployment.
+6. Native057 editoronlycanary; native9aa readonlycanary/operator+Metadata/Containers; GHA9dbQAeditor for distinctQApublication, nevertransferkey. Productionexpiry3Nov02:59UTC9aa/057 unchanged/minactual. TokenmetadataRootGET2Nov20:34active/roles notstoredkeymatch/endpointproof. NoTailReadgroupobserved; RESTWorkflowlist/status native9aa capabilityUNVERIFIED, don'tderivefromMetadataRead/OpenAPI/adminMCPsuccess. Bindingget.status ownexactinstance availabledocumented, notlist orqueuedAt.
+7. BEFORE mutation/once wherepossible, actualsupported current QA/canary/operator pointers/exposure/globalwriter inventory and allnative/D1writer settlement. Identify precisefixedendpoints, scope, source versus physicallimits; currentownBWorkflowexception onlyactualidentity, not arbitrarynonterminalignore. No trustedboolean/oldRootsnapshot ascurrentproof. Ifcapabilitymissing, failbeforeeffects; propose actualsupportedverificationgate, not automatic newtoken/role/proxy.
+8. Keep owner15min fromoriginalI0/custodybound andread10min separate; nowindowscreatednow. Capsule/witness strictlyprivate<=64KiB/noscript; useAprojection32KiB sortedv1hash. Exactapprovedpinnedoldsyntheticproject+freshownedrow; goalcontent sourcepreference notgrant. Initialcommandconfigapproval neverreadergrant/notices/Saveapproval.
+9. Fullownerflow current source/readSource repeatedchild5 +C1anon11GH causesrate/latency problem. C1fullread onceinit; retainedtechnicalevidenceDATA, laterconstructor mustfreshactualsource/currentmain/tag/pointers/privateDB/ownerdecision, not cachedauthority. NOhard10sessionbudget/53flowqualification untilactualforwardedhookphysicalsessioncomposition tested; GitHub60/IP/hour/sharedquota. StatewhatBcanimplementnowvsowningforwardinggate.
+10. Retained oldretirementpolicyhistorical=true preservesoriginalsource/target/key/window/rows; nonewT0/newgrant rewrite/physicalstop or flagenable. LaterC3 Save/callback/unsubscribe/earlywithdraw/timing remainseparate; preserveKnown4args18hooks70s/5s/20s andfirstfiniteHEADunspent.
+11. A reviewminor (nonblocking) testcompat expectedcanonicalizer sharesinitialCanonical; carry independentTask4canonical/knownanswer or actualend-to-endproductiondigest test inowningintegration/finalreview, no unrelatedretestwave.
+
+## Required proposal and later tests
+
+Exact API/own-data grammars/sourceauthority boundaries, originalclock/effectdeadline/onceSENDACK/readback/unknown paths, actualprivatebyteingress+baselinepreservation/rollback eligibility, currentallwriters/custody/API budget and preciseowninggaps. No genericruntime wiring by callerfacts. MeaningfulnativeDO/D1/Workflow/actualtransport/source tests underexplicitSYNexternalboundary, not wholefactsuccess; actualcompilerwhenentryprofilechanges. ProportionalhostedNode22/existinglockfile/temporaryqualifier/no-secrets/artifacts/deploy, no actualproduction workflow dispatch/sourcecommands. Freshindependentreview afteroneboundedproductunit, sourceonly; allreadinessflagsfalse.
+
+This brief itself authorizes no resource/profile/permission/credential/runtime action. Returncompact actualsupportedtable first; Rootpersistsbeforecode.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-02-finite-pre-t0-qa-provenance.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-02-finite-pre-t0-qa-provenance.md b/docs/superpowers/briefs/2026-11-02-finite-pre-t0-qa-provenance.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-02-finite-pre-t0-qa-provenance.md
@@ -0,0 +1,54 @@
+# Task5-B2-C1 — QA provenance before owner preparation
+
+SOURCE ONLY. Continue after accepted B1 and B2-AB; do not redo them. Repository tokenizartinfo-ops/agent-friendly-web, isolated branch feat/finite-native-cleanup-20261101. BASE is the Root commit containing this brief, supplied in dispatch. No runtime/publication/provider/private probe, actual tag or workflow dispatch, tokens/permissions, OAuth/grants/windows, DDL, main merge, local source/dependencies/build, Max, emails, chat or automation. One writer, no subagents.
+
+## Current problem and bounded result
+
+Native reader9aa can read canary/operator code and account metadata/Containers under dated approved trust; no QA ContentRead. GHA9db has a separate actual QA code-read route. Existing readFiniteQaPublication and readFiniteQaPublicationBridge depend on a qualified full package and post-T0 material seed. They cannot bootstrap the code proof needed BEFORE the initial owner snapshot, ticket and consent.
+
+Bounded result: a separately purposed PRE-T0 QA publication provenance producer and verifier, using existing GHA custody and actual compiled QA bytes. No initial owner/private capsule/window generation, source authority registration, forwarding, C3 or full-package success in this unit. Keep direct qaCodeProvenanceVerified=false; use a named bridge evidence record, not a UUID/success boolean as authority.
+
+FIRST send Root a compact exact proposal/contract and source-supported API/clock/issuer table BEFORE any product. Read existing code/spec and point out actual changes required; Root decides without asking owner. Persist the selected contract/ruling before code. Do not produce a generic platform rewrite or reopen all Task5.
+
+## Read narrowly
+
+- This plan/ledger tail and reports/2026-11-02-finite-cloud-continuation.es.md.
+- specs/2026-11-01-finite-qa-code-provenance-bridge.md (original post-T0 design; many structural parts implemented later, historical DESIGN status is not current runtime proof).
+- lib/mcp-qa-finite-publication.mjs, publication-bridge.mjs, seed-issuer.mjs, seed-primary.mjs, source-authority.mjs, custody.mjs, profile.mjs.
+- scripts/build-finite-native-package.mjs (actual source staging compiler; full build still deliberately throws).
+- Actual GHA finalizer source/CLI only for the specific issuer/admission and command/step provenance pattern you must factor.
+Do not dump whole ledger/AGENTS/history. Native and GHA callers are different environments; do not fabricate ctx/env in CLI or assume credentials transfer.
+
+## Root-selected direction to evaluate and make exact
+
+Proposed immutable locator: refs/tags/afw-finite-bootstrap/<canonical full QA version UUID>, derived by native reader from genuine AFW_QA_VERSION.id, not latest/caller/M-only resettable tag. It is NOT present or authorized to create now. A new dedicated source command/purpose must be distinct from the post-T0 finite confirmation command and cannot consume/reset the first finite HEAD.
+
+The GHA producer should independently admit the actual owner command, repository, main/source revision, trusted workflow/run/job/attempt1 and original process; use GITHUB_TOKEN and existing AFW_QA_CLOSED_TOKEN through fixed source code, not new keys. Derive expected QA source bytes by the real same-physical-checkout compiler/staging role; fetch and hash actual exact QA modules/configuration through approved9db. Re-read current QA deployment pointer and require unchanged one100% UUID/deployment. Tag may contain only bounded public-safe provenance facts, source/run references and hashes; no private plan/control selector/hash, owner/grant/project/consent, raw configuration, module bytes, callback, JWT or credential. The issuer cannot attest its own future step/job completion. Later native public-primary verification must establish actual completed-success and original step timing before using the record. Explicitly define the once/unknown-ACK/readback semantics; no replacement/ref reset or resending mutation after uncertain ACK.
+
+No full finite package/manifest is eligible yet. Do not call the full-package qualifier and silently bypass it; factor a narrow QA-role byte/profile check if supported while preserving every old full-package gate. Pure staging is source evidence, not runtime admission or rollback compatibility. Source verification, expected versus observed hashes, exports/backend/namespace/secret-descriptor/configuration normalization all stay explicit. Determine exact expected fields from existing profile/compiler, not fabricated future manifest.
+
+Native verification must use supported fixed metadata endpoints under9aa and public GitHub primary; do not assume Beta version metadata without modules is permitted by MetadataRead just because an admin tool could read it. Consult endpoint schema/permission docs if necessary; no actual credential/provider probe. Native cannot read QA code directly, cannot import GHA token, and cannot invent caller-script identity from ctx/env/metadata UUID. If only deployments pointer plus verified GHA evidence is supported, name that evidence honestly and keep actual native source/context qualification an owning later gate.
+
+Existing synchronous qualifyFiniteNativeSourceContext and zeroarg readFiniteNativeCustody remain unavailable. Do not turn them into fake async provider checks/global env getters or caller-minted registry. A new narrow factual bridge can compose independently, with exact native holder coherence and original parent, leaving source-identity authority false. State which later constructor consumes it.
+
+## Contract table required before product
+
+Specify exact exported functions, inputs/outputs, own-data grammar/canonical domain/hash/size, immutable locator and approved issuer; actual command/workflow/job/step names/admission/original clocks; GHA compile/read/verify and public tag mutation boundaries; native checks/custody/source assumptions/current pointer/primary completed-success; private versus public data; actual versus synthetic test boundaries. Include a real supported initial publication handoff, without performing it or inventing artifact-reference-to-byte transport. No new namespace/resource/role/key by inference.
+
+Propose the smallest source-authorized issuer deadline including command/queue, and native original-request/child<=5s clipping without fresh lifetime. Do not reuse business T0/N1/C0/C1 before they exist. Keep original owner15min/read10min windows unstarted in this unit. Qualification must be reproducible after dated production custody expires: test-only explicit SYN approval/data boundaries, separate unmodified production expiry denial; no caller clock/pin override and no extended real authorization.
+
+If public GitHub primary reads have availability/rate constraints, state exact request budget/caching assumptions. No new generic proxy, bearer key, OIDC server or store by inference. Do not silently trust tag body/ETag/class export/status DTO or cache as authority.
+
+## After Root ruling
+
+Implement only the agreed concrete unit with meaningful RED→GREEN and actual new constructors/parser/issuer/verifier logic under explicitly SYN CF/GH/custody boundary. Native Worker/DO and real compiler when affected, no whole-facts success mock claimed as integration. Cover wrong QA/source/bytes/role/config/holder, wrong owner/repo/branch/workflow/attempt/step, self-future completion, pointer drift, stale/expired original clock, tag conflict/unknown ACK/replay, private output denial and source-only/ineligible full package. Tests proportional; no provider/runtime action.
+
+Hosted Node22/existing lockfile, temporary branch/path-scoped qualifier contents:read with no secrets/artifacts/deploy and no docs-only trigger; EXCLUDED integration. Do not dispatch actual production-source workflows. Report exact BASE/code/docHEAD/commands/run/job/attempt/counts and CAS/ref/all-file readbacks; source versus synthetic boundaries and missing initializer/source/material/C3/runtime gates. STOP for fresh independent spec+quality review.
+
+## Other gates remain separate
+
+B2-AB historical facts are implemented but not a source/context authority. OriginalQ is manifest+D1, frozen315/source2a477 is old artifact and M is current candidate. No new draft from19fc/hash reconstruction. Initial once capsule/realm/project/goal/window/new intentions and all-writer material mounts remain later.
+
+C3 source/timing report is reports/2026-11-02-finite-c3-consumer-preflight.md. It includes missing finiteGate, premature admission before reservation, early owner reduction, Save producer and client unsubscribe timing. Do not implement those here. Preserve Known fourargs/18hooks/70s/5s/20s and original clocks/first HEAD. Official MCP Events supports Work Cloud/dots, but actual AFW consumer/binding/useful turn/PCoff are unproved. No new client/callback/scheduler/chat.
+
+Owner has authorized autonomous source work and will help only when a concrete human step is ready. This unit requires no OTP/click/permission window. operationalReadiness=false; completePackage=false; PCoff=false.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-04-finite-closed-prearm-policy-conversion-task1.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-04-finite-closed-prearm-policy-conversion-task1.md b/docs/superpowers/briefs/2026-11-04-finite-closed-prearm-policy-conversion-task1.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-04-finite-closed-prearm-policy-conversion-task1.md
@@ -0,0 +1,63 @@
+# Task brief — pure closed-prearm configuration conversion
+
+Task1 ACTIVE in the containing docs commit after independently accepted first-phase context. Root supplies exact source BASE. Read this first; these are the requirements with exact values. Spec is docs/superpowers/specs/2026-11-04-finite-closed-prearm-policy-conversion.md in the containing activation. Only Task1 belongs to this implementer; Task2 derive integration remains INACTIVE and must not be implemented by finding an easy fixture substitution.
+
+## Global Constraints
+
+- Product inspected at e280a297f4c2ea3f38ea3fc4ac157439415708be. Root supplies the actual accepted C3 baseline before implementation; do not follow the advancing product branch during this docs task.
+- QA date2026-09-07 flags[nodejs_compat,enable_request_signal]; M date2026-09-07 flags[nodejs_compat,global_fetch_strictly_public,enable_request_signal], exact order.
+- Accepted finite hash/lifecycle APIs and C3 role selection are reused. Historical2607/c570, QA_CLOUD_CLOSED_PINS and strict legacy APIs are immutable.
+- Full canaryLive projection remains strict; no empty/private placeholder success, new profile role, fallback/hash callback or finite publish operation.
+- No SDK issuance, source producer, own-SEND relaxation, mount, admission, Entry, runtime, OAuth, OTP, Max, permissions, schema or clock extension.
+- All original windows, budgets, holders and identity checks remain; no production Date compensation or expiry renewal.
+- source ceiling2026-11-03T02:59:00Z is expired; operationalReadiness=false; completePackage=false; PCoff=false. Preserve the reserved single coordinated consuming PC-off occurrence.
+- No local clone/dependencies/tests/build; use the established authorized cloud source workflow only after root accepts this plan. This docs task executes no test/build/provider action.
+
+
+## Exact file map
+
+Create lib/mcp-qa-finite-prearm-profile.mjs,lib/mcp-qa-finite-policy-configuration.mjs,test/mcp-qa-finite-prearm-profile.test.mjs,test/mcp-qa-finite-policy-configuration.test.mjs,test/fixtures/finite-policy-configuration-data.mjs. Existing profile tests may be read/run, not weakened. No existing source/mount/stub/transport/derive/codec/issuer/cleanup/profile/historic file is modified by Task1.
+
+## Task 1: Pure exact closed-prearm qualifier and full builder
+
+This is independently acceptable before notice/source/SDK work. It does not promise an executable owner timeline.
+
+**Interfaces consumed:** finiteFields, finiteData; qualifyFiniteConnectionProfile({phase:'closed_ui',metadata}); finitePublicProfileTemplate('canaryLive'); projectFinitePublicConfiguration({role:'canaryLive',metadata}); existing parseDossierEventPolicyFields, parseDossierRetirementFields and parseOwnPermissionWithdrawalPolicy DATA grammars.
+
+**Interfaces produced:**
+- qualifyFinitePrearmConfiguration({metadata,originalConfiguration}) -> deeply frozen detached normalized configuration, or throw.
+- buildFinitePolicySetupConfiguration({prearmConfiguration,policies}) -> deeply frozen detached normalized full configuration, or throw.
+- No other production export, option, policy resolver or provider dependency.
+
+- [ ] **Step 1: Add deterministic DATA fixture and causal failing tests.** Use the fixed canaryLive template; close every enabled flag, empty its four nominal slots, set project/client to ci-prearm-project/ci-prearm-client, and add the exact five preparation bindings. Use ACCESS_TEAM_DOMAIN=ci-prearm.cloudflareaccess.com, ACCESS_AUD=ci-prearm-aud, AFW_OAUTH_PILOT_EXPIRES_AT=2026-11-03T02:59:00.000Z, DELEGATED_RATE_LIMITER={name:'DELEGATED_RATE_LIMITER',type:'ratelimit',namespace_id:'2026101001',simple:{limit:10,period:60}}, monitoring policy=''. These are fixture DATA and never a provider plan.
+
+  Construct six structurally valid policy strings as explicit expired synthetic DATA using the existing policy grammars and fixed template resource. Events uses original synthetic grant/subject plus the same project/client, startAt=1000, expiresAt=301000; successor candidate shares this interval and budget1; withdrawal uses startAt=241000/expiresAt=421000 with explicit original notice sequence/revision/issuedAt/expiry; retirement is JSON with programHash/sourceRevision and its actual event-policy fields including containerId. UUID/hash fixture identities are deterministic and labelled synthetic. Do not use existing SYNTHETIC_PREARM or SYNTHETIC_QUALIFIED_ORIGINAL_RETIREMENT words. Do not return ownerSource, accepted, installed, ready, admission or receipt from the fixture.
+
+  Test names and decisive assertions:
+
+  - `exact original closed prearm is detached frozen DATA`: qualify succeeds with deep equality, nested Object.isFrozen checks; changing caller input later cannot change result. A different same-grammar Access audience/expiry/limiter/project-client value denies against original.
+  - `closed prearm never passes the full projection`: assert.throws on projectFinitePublicConfiguration for closed prearm; qualifyFiniteConnectionProfile({phase:'finite_prearm',...}) still throws.
+  - `clone and six patches leaves the causal shape failure`: reproduce the OLD pure clone-and-six-slot-patch expression on the fixture and assert the actual full projector throws. Then call the missing builder and assert its projected result equals finitePublicProfileTemplate('canaryLive'). The second assertion is the implementation RED; the first pins why cloning is insufficient.
+  - `full candidate preserves holders and removes exactly five names`: assert sorted before-minus-after names exactly equal the five spec names; after-minus-before is empty; every retained non-plain binding deep-equals its original; DELEGATED_RATE_LIMITER is absent specifically. Verify non-binding fields/exports/container declaration unchanged.
+  - `full flags and six original strings are exact`: exactly events/successor/withdrawal true, every other enabled flag false; each of six output texts equals fixture input byte-for-byte, no privateSlot object survives, original input remains untouched.
+  - `foreign shape and private placeholder cannot be repaired`: mutate each retained holder type/id/name, metadata binding, export/container, extra/missing/duplicate binding, flag order/date, new policy key, empty policy, opaque placeholder, JSON scalar/array, mismatched project/client; all throw. A placeholder rejection belongs to builder input grammar, not a modified full projector.
+  - `strict data rejects hidden capabilities without evaluating accessors`: extras, getter, symbol, custom prototype, sparse array, function/lease/env and oversize DATA deny; getter call count remains0.
+  - `full hashes keep distinct original domains`: finite activation, restoration and existing canonical binding digests are stable for equal configs; prearm versus full differs; one event grant mutation changes full private hashes but leaves publicStatic projection unchanged. That redaction equality does not certify grant validity.
+
+- [ ] **Step 2: Run causal RED in the authorized cloud task.** Run `node --test test/mcp-qa-finite-prearm-profile.test.mjs test/mcp-qa-finite-policy-configuration.test.mjs`. Expect failure at the explicitly missing new export/module, with old clone/projector assertion passing. Preserve exact head/run/attempt and failing assertion; dependency-install failure is not RED.
+
+- [ ] **Step 3: Implement the two pure interfaces.** Follow the spec's exact snapshot, original equality and full-template algorithm. Use strict DATA helpers before any property traversal. Reuse existing parsers; do not build a fake private-source validator, clock, namespace resolver or callback registry. Retain immutable original holders before constructing the new full object. Output has no authority field.
+
+- [ ] **Step 4: Run GREEN and unchanged strict projection checks.** Run the two new tests plus `node --test test/mcp-qa-finite-profile.test.mjs` against accepted C3. Expect zero failures/skips. Run repository lint scoped to the new files using the existing ESLint installation, without downloading a new tool. Report counts/warnings accurately. No native owner or remote outcome is claimed.
+
+- [ ] **Step 5: Commit and review this unit.** Use expected-head source commit with message `feat(afw): define closed prearm policy conversion data`. Root may accept this pure unit while rejecting/defering Task2. Record it as DATA-only, not imported native production. No deployment or new permission follows.
+
+
+
+## Root handoff
+
+Use standing SDD one-writer source workflow, no further subagents. Pure DATA equality and JSON grammar are not provenance or authority. Original config supplied as its own original can only prove structural equality; actual QA producer must independently anchor it. Secret descriptor preservation is not comparison or custody of secret values. Module bytes and current provider ownership remain outside this pure helper, never invented as tested facts. Six synthetic expired structurally valid policies may test the builder, but cannot qualify original T0/grant/notice/program identity.
+
+No changes to the strict full projection; exact five removals include DELEGATED_RATE_LIMITER reference. Legacy APIs/historical pins unchanged. No native/real owner pipeline positive claim and no changed actual runtime import graph: helper stays detached until separate Task2. Do not rerun whole compiler merely because a new detached source file exists; run scoped pure tests/lint and demonstrate no production import/mount changes in full diff. A future real consumer integration has its own exact-head compiler/native gates.
+
+Report docs/superpowers/reports/2026-11-04-finite-closed-prearm-policy-conversion-task1.md: exact BASE/code/reportHEAD/tree, RED/GREEN command/run/job/attempt/counts/warnings, DATA-only boundaries, before/after name/holder/hash assertions, immutable oldsource/pins, qualifier removal. Self-review fullBASEdiff. Root review before acceptance. No runtime/Entry/schema/credentials/OAuth/OTP/Max/PC-off.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-04-finite-known-profile-c1.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-04-finite-known-profile-c1.md b/docs/superpowers/briefs/2026-11-04-finite-known-profile-c1.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-04-finite-known-profile-c1.md
@@ -0,0 +1,67 @@
+# Checkpoint 1 brief — fixed finite candidate primitives
+
+Read this first: implement ONLY Checkpoint1 below. The parent signal opt-in task remains incomplete, and lifecycle/finite consumer checkpoints2/3 are NOT assigned here. Source baseline is the containing activation commit supplied by root; original inspected code is bd923bab and checkpoint report3fb1751c. No product writer runs concurrently. GitHub source and credential-free Actions only, expected-head CAS on feat/finite-native-cleanup-20261101. No local clone/build/dependencies or remote effects.
+
+## Global Constraints
+
+- Inspected source bd923bab7225212e35e054b14c132de78195ec5e / tree b6fd94de88c796d5c8708b815b8db4e9595b6f92. Before source work, verify actual feature head; a later docs-only head may differ. Do not attribute this design's source observations to a moving branch.
+- QA date2026-09-07 flags exactly ["nodejs_compat","enable_request_signal"]; M date2026-09-07 flags exactly ["nodejs_compat","global_fetch_strictly_public","enable_request_signal"]. Legacy M pair and digests unchanged.
+- No exported strategy/hash callback, old-or-new fallback, compatibility normalization, new approval/token/DTO authority, native mount or business producer.
+- All18 hooks, exact primary grant/history/identity, original70s parent, existing5s/20s children, actual cancellation/retention and one-use/no-replay semantics remain.
+- Source ceiling2026-11-03T02:59:00Z expired; operationalReadiness=false; completePackage=false; PCoff=false.
+- No provider/runtime writes, Entry/DDL/credentials/permissions/OAuth/OTP/cron/Max, new budget, generic outbound, other-project work or reserved occurrence consumption.
+- Historic2607/c570 modules/configurations and QA_CLOUD_CLOSED_PINS byte-identical. No old sealed record/Plan/capsule rewrite.
+- All verification below runs in authorized credential-free cloud source CI; no local clones/builds/dependencies. Reuse the held implementer's qualifier, restore its own scoped source test stages as needed, and remove it before delivery. No dispatch or test was performed while writing this plan.
+
+
+## Checkpoint1: Strict fixed candidate primitives
+
+**Files**
+- Modify lib/mcp-activation-observer.mjs.
+- Modify lib/mcp-release-operator-policy.mjs.
+- Create test/mcp-finite-activation-compatibility.test.mjs.
+- Create test/mcp-finite-named-activation.test.mjs.
+- Preserve/run test/mcp-activation-observer.test.mjs and test/mcp-named-activation.test.mjs.
+
+**Interfaces produced**
+- finiteActivationConfigurationHash(value) -> string.
+- createFiniteActivationObserver(options={}) -> async (input,signal) -> existing observation.
+- validateFiniteReleaseOperatorBundle(bundle) -> true, confirm_named only.
+- resolveFiniteNamedActivationPlan(bundle,namespace) -> frozen {plan,current}.
+- validateFiniteNamedCancellationHistory(bundle,raw) -> true.
+- Exact option fields/results and fixed flag arrays are defined in the spec; no optional profile field.
+
+- [ ] Add failing cases named legacy_pair_digest_and_positive_observer_preserved, finite_triple_hashes_actual_flags, profiles_reject_each_other, exact_flags_date_and_plain_data, finite_observer_checks_approved_and_observed_profile, finite_named_plan_and_history_positive, finite_bundle_requires_confirm_named, finite_private_binding_and_current_grant_correlated. Use the existing legacy fixtures as unchanged originals; build a separate candidate copy before hashing. Independently compute the canonical SHA-256 expected value from a fixed literal seven-field fixture with sorted bindings and actual flags. Record the legacy golden from the old implementation before refactoring and require exact equality afterwards. Assert input not mutated; reject old/new cross-use, missing/extra/wrong/reordered flags/date, accessor without invocation and secret content.
+- [ ] In cloud run node --test test/mcp-finite-activation-compatibility.test.mjs test/mcp-finite-named-activation.test.mjs; expect missing fixed exports/candidate rejection RED. Preserve that causal result, not a harness timeout.
+- [ ] Extract private snapshot/hash/observer bodies with module-owned exact flag selection; keep the canonical function and all existing validation byte-for-byte in meaning. Add the two fixed activation exports. Approved configuration and observed metadata use the same selected hash. No new exported implementation.
+- [ ] Extract private policy bundle/resolver/history bodies. Existing exports use old hash and existing operation range. New finite exports use the candidate hash and require confirm_named before nested manifest validation. Keep current target, artifact size/hash, exact fields, named bindings, identity, scope, window and current-grant checks.
+- [ ] Run node --test test/mcp-finite-activation-compatibility.test.mjs test/mcp-finite-named-activation.test.mjs test/mcp-activation-observer.test.mjs test/mcp-named-activation.test.mjs. Expect all selected assertions PASS, zero skips/cancellations. Run lint before the checkpoint acceptance; retain existing warnings.
+- [ ] Commit the strict primitive unit with exact CI head/run/job/attempt. Stop for its source review checkpoint. This is a prerequisite only; do not report the finite path fixed.
+
+
+## Binding fixed interfaces (future entries shown for compatibility context only)
+
+## Fixed interfaces
+
+Existing input/result shapes below mean the exact shapes and error/outcome behavior at the pinned source, not newly extensible DTOs.
+
+| Module | Added fixed export | Contract |
+| --- | --- | --- |
+| lib/mcp-activation-observer.mjs | finiteActivationConfigurationHash(value) -> string | Same seven configuration fields, structural/plain-data/execution/binding/size checks and SHA-256 canonical algorithm as activationConfigurationHash; exact new M triple only. |
+| same | createFiniteActivationObserver({versionId,deploymentId,namespaceId,applicationId,configuration,readCredential,fetchImpl=globalThis.fetch}={}) -> async (input,signal) -> observation | Same observer interface/result as createActivationObserver. Candidate validation applies both before any request and to observed metadata. Existing fixed readers, target validation, bytes, bracketed deployment, 5s clock and cancellation stay unchanged. |
+| lib/mcp-release-operator-policy.mjs | validateFiniteReleaseOperatorBundle(bundle) -> true | Fixed confirm_named only; all existing artifact, target, hash, plan, manifest, identity and window checks using finiteActivationConfigurationHash. Reject publish and confirm. Throws same sanitized policy error. |
+| same | resolveFiniteNamedActivationPlan(bundle,namespace) -> frozen {plan,current} | Same pure identity resolution and drift checks as legacy; calls finite validation, never namespace.get or a business effect. |
+| same | validateFiniteNamedCancellationHistory(bundle,raw) -> true | Same complete history/grant correlation, using finite bundle validation. No authorization created. |
+| lib/mcp-release-successor-reservation.mjs | reserveFiniteReleaseSuccessor({bundle,env,namespace,readCredential,fetchImpl=globalThis.fetch,now=Date.now,signal,observation,authorize,cancellationHistory}={}) -> Promise<existing reservation result> | Shared existing reservation body, with fixed finite bundle/resolver/history functions. Preserves retirement provider/custody checks, atomic INSERT, exact-own-row logic and finite gate. No new options or authority. |
+| lib/mcp-release-runtime.mjs | runFiniteKnownCancellationReleaseWorkflow(options) -> Promise<existing Known outcome> | options remains exact own-data {bundle,env,event,step}; fixed confirm_named candidate path; no fifth argument. Same original event, private request lease, primary snapshots, eligibility closure, hooks, clocks and terminal outcomes. |
+
+Keep activationConfigurationHash, createActivationObserver, validateReleaseOperatorBundle, resolveNamedActivationPlan, validateNamedCancellationHistory, reserveReleaseSuccessor, runKnownCancellationReleaseWorkflow, runReleaseWorkflow and runReleaseOperator unchanged in callable contract and strict legacy behavior. In particular, generic legacy publish/confirm semantics remain.
+
+Implement shared PRIVATE bodies in those same existing files. The activation snapshot/hash/observer body receives only module-owned fixed flag selection; policy bodies receive a module-owned fixed hash selection and fixed operation restriction; reservation body receives only its local fixed validator/resolver/history selection. Runtime defines its own frozen LEGACY_RELEASE and FINITE_RELEASE selections referencing the appropriate fixed exports. Private runKnownCancellationReleaseWorkflowImpl(profile,options), runReleaseWorkflowImpl(profile,options) and runReleaseOperatorImpl(profile,bundle,env,args,lease,observation,authorize,cancellationHistory) contain the current bodies. Existing public functions pass LEGACY_RELEASE; the one new public Known function passes FINITE_RELEASE. Pass the same private selection through every nested call. Do not export runFiniteReleaseWorkflow, runFiniteReleaseOperator, a strategy object, lease mint, registry or configurable helper.
+
+The current knownRequestLeases WeakSet, creation before first await and removal on settlement remain private and shared with the existing mechanism. Do not replace the lease by a serializable profile/approval token. Fixed finite reservation is necessary because its module independently revalidates bundle, history and named identity. Fixed finite observer is necessary because it independently validates both approved and actual provider configuration. A wrapper around legacy validation alone cannot work.
+
+
+## Evidence and handoff
+
+Write full task report to docs/superpowers/reports/2026-11-04-finite-known-profile-c1.md. Include exact BASE/code/report HEAD, causal RED and GREEN commands/run/job/attempt/counts/warnings, legacy golden digest and cross-profile rejection, actual-versus-SYN boundaries. Do not re-run the previous native signal opt-in experiment or accepted old units. A scoped temporary push-path qualifier may be created; remove your qualifier before delivery. Leave the parent's existing opt-in qualifier unchanged. No self-acceptance or reviewer dispatch; root sends a fresh task reviewer. Return status, commits, one-line tests, concerns. Stop source writes at this checkpoint's report; root chains later checkpoints after review.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-04-finite-known-profile-c2.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-04-finite-known-profile-c2.md b/docs/superpowers/briefs/2026-11-04-finite-known-profile-c2.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-04-finite-known-profile-c2.md
@@ -0,0 +1,63 @@
+# Checkpoint 2 brief — fixed finite Known lifecycle
+
+Implement ONLY Checkpoint2 below, not Checkpoint3 or the blocked parent opt-in task. Read this first as the exact task requirements. Root supplies the actual BASE containing this brief. Primitives from Checkpoint1 are independently accepted; their fixed APIs are present in the same source branch. One product writer at a time. GitHub source and credential-free Actions only; no local clone/build/dependencies or remote effects.
+
+## Global Constraints
+
+- Inspected source bd923bab7225212e35e054b14c132de78195ec5e / tree b6fd94de88c796d5c8708b815b8db4e9595b6f92. Before source work, verify actual feature head; a later docs-only head may differ. Do not attribute this design's source observations to a moving branch.
+- QA date2026-09-07 flags exactly ["nodejs_compat","enable_request_signal"]; M date2026-09-07 flags exactly ["nodejs_compat","global_fetch_strictly_public","enable_request_signal"]. Legacy M pair and digests unchanged.
+- No exported strategy/hash callback, old-or-new fallback, compatibility normalization, new approval/token/DTO authority, native mount or business producer.
+- All18 hooks, exact primary grant/history/identity, original70s parent, existing5s/20s children, actual cancellation/retention and one-use/no-replay semantics remain.
+- Source ceiling2026-11-03T02:59:00Z expired; operationalReadiness=false; completePackage=false; PCoff=false.
+- No provider/runtime writes, Entry/DDL/credentials/permissions/OAuth/OTP/cron/Max, new budget, generic outbound, other-project work or reserved occurrence consumption.
+- Historic2607/c570 modules/configurations and QA_CLOUD_CLOSED_PINS byte-identical. No old sealed record/Plan/capsule rewrite.
+- All verification below runs in authorized credential-free cloud source CI; no local clones/builds/dependencies. Reuse the held implementer's qualifier, restore its own scoped source test stages as needed, and remove it before delivery. No dispatch or test was performed while writing this plan.
+
+
+## Checkpoint2: One shared lifecycle with fixed finite entry
+
+**Files**
+- Modify lib/mcp-release-runtime.mjs and lib/mcp-release-successor-reservation.mjs.
+- Modify test/fixtures/named-confirmation-native-rehearsal.mjs to share its existing private test composition with a separately named finite entry.
+- Create test/mcp-release-finite-known-cancellation.test.mjs and test/mcp-release-finite-known-cancellation-native.test.mjs.
+- Modify only source/export anchors needed in test/mcp-release-known-cancellation.test.mjs; retain every existing semantic assertion.
+- Test existing test/mcp-release-known-cancellation-native.test.mjs, test/mcp-release-reservation-native.test.mjs, test/mcp-release-workflow-native.test.mjs and test/mcp-release-runtime-native.test.mjs.
+
+**Consumes** Checkpoint1 fixed exports.
+
+**Produces**
+- runFiniteKnownCancellationReleaseWorkflow(options) -> Promise<existing Known outcome>, exact {bundle,env,event,step}.
+- reserveFiniteReleaseSuccessor(options={}) -> Promise<existing reservation result>, same option keys as legacy reserveReleaseSuccessor.
+- PRIVATE runKnownCancellationReleaseWorkflowImpl(profile,options), runReleaseWorkflowImpl(profile,options), runReleaseOperatorImpl(profile,bundle,env,args,lease,observation,authorize,cancellationHistory).
+- Test-only rehearseExactFiniteNamedConfirmation({artifact,mode='confirmed',payloadMode='object',retirement='stopped',replay=false,fault=null,nativeFault=null,measure=false,replayExpected='uncertain',witness=false}) -> existing rehearsal result. Finite fixture fixes reserve='true', historyMode='known_cancellation', invocation='workflow'; it exposes no profile/hash/authorizer override. Existing rehearseExactNamedConfirmation(options) stays compatible.
+
+- [ ] Add finite cross-profile entry rejection, exact-four-fields admission, forged/copied/retired lease denial, complete primary history, non-reentrant18-hook and original deadline tests. Factor test-only scenario helpers where useful; do not replace the legacy cases. The runtime export assertion becomes the existing three names plus runFiniteKnownCancellationReleaseWorkflow and still rejects a lease mint, registry or public core.
+- [ ] Add an untouched actual finite-core native positive and separate observation-only18-hook witness. The fixed test builder compiles a test-only WorkflowEntrypoint named AfwReleaseWorkflow which forwards exactly {bundle,env:this.env,event,step} into the real finite Known export, with default fetch404. Use existing real isolated D1/native Workflow and custody DO fixture. Set finite operator compatibility to exact QA pair and identity/custody Worker to exact M triple; configure candidate metadata/hash to exact triple. Do not pass through the legacy buildMcpReleaseOperator validator. This is an unmounted test wrapper, not a product entry.
+- [ ] Refactor the existing rehearsal into a private fixed legacy/finite helper in the same fixture file. Legacy mode preserves its original builder argument, flags, RPC caller and history defaults. The new fixed finite wrapper supplies its own private builder, omits the legacy RPC caller/service binding, and uses native Workflow only. Keep knownCancellationNativeHarness and observation instrumentation test-only. witness=true adds observations to the real private authorize closure; untouched positive remains separate.
+- [ ] Assert finite confirmed result, mayRetry=false, operationalReadiness=false, journals {attempts:1,receipts:1,acceptances:1}, reservationCount1, prepared/mayBoot=false, six primary projections, all18 distinct hook names, unchanged immutable history, exact native Date/event identity/payload and elapsed original budget. Negative cases: missing/expired current grant, identity mismatch, extra cancellation, queue/projection deadline => blocked and zero provider/credential/journal effects; revoke-prewrite/postwrite => uncertain with preserved activation history and reservation count0/1; foreign reservation race, lost ACK, late outer step and restart => no second row/effect, no late confirmed. Existing native fault helpers stay synthetic and must not become production options.
+- [ ] Run the two new files with node --test; expect failure before finite implementation. Do not replace a failing positive with blocked/pending.
+- [ ] Introduce private frozen LEGACY_RELEASE and FINITE_RELEASE selections in runtime using only fixed imports. Move current bodies without changing guard/order/clock logic; public legacy wrappers select LEGACY_RELEASE and new finite Known selects FINITE_RELEASE. Carry the same selection through Known -> Workflow -> Operator. Preserve private WeakSet lease issuance before first await, original options field validation and registry deletion on settlement.
+- [ ] In successor reservation share its existing body behind two fixed wrappers. Each local strategy fixes bundle/history/resolver; runtime's finite strategy references finite observer and finite reservation. Keep createActivationJournal, createSuccessorReservation, eligibility SQL, retirement evidence, provider readers, finite gate and effect order unchanged.
+- [ ] Update the legacy white-box closure harness anchor for the private Workflow call. Capture a test-local closure bound to the selected profile for retired/copied lease checks; never export that closure from product. Keep the18-hook, concurrent reentry, expired and missing primary assertions. Adjust instrumented compiled-source anchors to the single shared authorize closure; do not instrument the untouched native positive.
+- [ ] Cloud validation, separately attributable groups:
+  - node --test test/mcp-release-finite-known-cancellation.test.mjs test/mcp-release-known-cancellation.test.mjs
+  - node --test --test-concurrency=1 test/mcp-release-finite-known-cancellation-native.test.mjs test/mcp-release-known-cancellation-native.test.mjs test/mcp-release-reservation-native.test.mjs test/mcp-release-workflow-native.test.mjs test/mcp-release-runtime-native.test.mjs
+  Require PASS with original positive legacy cases still present and successful, not just negative admission cases. Run lint first; preserve exact source/run/job/attempt and distinction between actual native mechanics and SYN provider/custody.
+- [ ] Commit/review the lifecycle unit. No native mount or production builder modification. Do not claim C2/source integration or package readiness.
+
+
+## Preserved invariants
+
+- All18 Known hooks: workflow_admission; operator_credential; operator_primary_read; operator_primary_result; activation_before_read; activation_after_read; activation_before_attempt; activation_after_attempt; activation_before_receipt; activation_after_receipt; activation_before_acceptance; activation_complete; successor_rpc; successor_rpc_complete; successor_before_retirement; successor_after_retirement; successor_before_write; successor_after_write.
+- Original event.timestamp+70000 parent ceiling, source window, monotonic narrowing, hydration/primary/provider/retirement5s children and activation20s child. No fresh parent, Date.now offset, replacement budget, retry, cancellation RPC or deadline-only substitute.
+- Two matching first-primary snapshots, current exact grant and monitoring consent, complete unfiltered cancellation history, original identity and namespace drift checks, non-reentrant authorization, original one-use/no-replay semantics.
+- Actual native admission/cancellation/retention remain: sender503 is not physical completion; retained read/fetch/body/cancellation stays occupied through actual settlement. No production bridge/receiver/retention algorithm edit.
+- Existing RELEASE_TARGET, fixed URLs/resource scope and guarded effect order remain. No general outbound, new approval/token/DTO authority, provider write, Entry/DDL/permission/credential/OAuth/OTP/cron/Max, new native mount, producer or other-project changes.
+- Three mutable phase settings and all physical/secret bindings unchanged. Full prearm and closed_ui/read_consent/notice_consent keep exact candidate flags.
+- lib/mcp-qa-finite-historical-source.mjs, lib/mcp-qa-cloud-closed-pins.mjs, worker/independent-closure/closed-rollback.mjs, worker/mcp-own/closed-rollback.mjs and original2607/c570 configuration artifacts/pins remain byte-identical to aed54dab and the inspected baseline.
+- Source ceiling2026-11-03T02:59:00Z remains expired. operationalReadiness=false; completePackage=false; PCoff=false. No reset or use of the reserved occurrence.
+
+
+## Handoff
+
+Full report path: docs/superpowers/reports/2026-11-04-finite-known-profile-c2.md. Record exact BASE/code/report HEAD, causal RED/GREEN, commands/run/job/attempt/counts/warnings, actual native mechanics versus SYN provider/custody/identity fixtures and unchanged legacy positive coverage. Remove your own qualifier only; parent opt-in qualifier stays untouched. No self-acceptance or reviewer dispatch. No full final compiler required here unless a concrete graph concern appears; final compatibility compiler belongs to Checkpoint3. Root fresh independent review must accept this checkpoint before role integration. Existing current source C2/material provider remains unavailable; do not replace it or claim a mounted complete finite workflow.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-04-finite-known-profile-c3.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-04-finite-known-profile-c3.md b/docs/superpowers/briefs/2026-11-04-finite-known-profile-c3.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-04-finite-known-profile-c3.md
@@ -0,0 +1,78 @@
+# Checkpoint 3 brief — explicit finite roles and final compatibility qualification
+
+Implement ONLY Checkpoint3. The fixed primitives and shared finite Known lifecycle are independently accepted in the adjacent review records; do not redo them. Root supplies the containing activation commit as actual BASE. One product writer, GitHub source/credential-free Actions only. The original opt-in task remains incomplete until this integration is verified; no source role/decoder success alone proves a deployed package.
+
+## Global Constraints
+
+- Inspected source bd923bab7225212e35e054b14c132de78195ec5e / tree b6fd94de88c796d5c8708b815b8db4e9595b6f92. Before source work, verify actual feature head; a later docs-only head may differ. Do not attribute this design's source observations to a moving branch.
+- QA date2026-09-07 flags exactly ["nodejs_compat","enable_request_signal"]; M date2026-09-07 flags exactly ["nodejs_compat","global_fetch_strictly_public","enable_request_signal"]. Legacy M pair and digests unchanged.
+- No exported strategy/hash callback, old-or-new fallback, compatibility normalization, new approval/token/DTO authority, native mount or business producer.
+- All18 hooks, exact primary grant/history/identity, original70s parent, existing5s/20s children, actual cancellation/retention and one-use/no-replay semantics remain.
+- Source ceiling2026-11-03T02:59:00Z expired; operationalReadiness=false; completePackage=false; PCoff=false.
+- No provider/runtime writes, Entry/DDL/credentials/permissions/OAuth/OTP/cron/Max, new budget, generic outbound, other-project work or reserved occurrence consumption.
+- Historic2607/c570 modules/configurations and QA_CLOUD_CLOSED_PINS byte-identical. No old sealed record/Plan/capsule rewrite.
+- All verification below runs in authorized credential-free cloud source CI; no local clones/builds/dependencies. Reuse the held implementer's qualifier, restore its own scoped source test stages as needed, and remove it before delivery. No dispatch or test was performed while writing this plan.
+
+
+## Checkpoint3: Explicit finite roles and complete source qualification
+
+**Files**
+- Modify lib/mcp-qa-finite-initial-owner-source.mjs, lib/mcp-qa-finite-preparation-cleanup.mjs, lib/mcp-qa-finite-policy-setup.mjs, lib/mcp-qa-finite-policy-transport.mjs, lib/mcp-qa-finite-preparation-records.mjs, lib/mcp-qa-finite-profile.mjs, lib/mcp-qa-finite-confirmation.mjs.
+- Modify focused existing tests: test/mcp-qa-finite-profile.test.mjs, test/mcp-qa-finite-preparation-records.test.mjs, test/mcp-qa-finite-policy-transport.test.mjs, test/mcp-qa-finite-policy-setup-native.test.mjs, test/mcp-qa-finite-confirmation-native.test.mjs and affected finite source fixtures only.
+- Test existing connection, initial-owner-source, preparation-cleanup, initial-upload, phase/bootstrap/historical, original native cancellation/retention files listed below.
+- No edit to lib/mcp-qa-finite-confirmation-source.mjs, historical files/pins, production bridge/receiver/retention, native mounts or clock algorithms.
+
+**Consumes** All fixed interfaces from Checkpoints1-2.
+
+**Produces** Existing public finite APIs unchanged, with correct fixed candidate consumers and explicitly historical rollback validation. Descriptor string becomes finiteActivationConfigurationHash; QA remains null.
+
+- [ ] Add mixed_role_setup_context_roundtrip (candidate baseline + historical rollback succeeds; both swapped roles fail), read_version_current_candidate_and_historical_rollback (both actual and expected configs validated by trusted role), wrong_role_denied_before_mutation (zero writes/effects), candidate_private_projection_full_hash and finite_confirmation_handoff_fixed_entry cases. Public projection equality must not hide a changed full candidate hash; invalid private manifest still fails finite bundle validation. Keep the historical digest assertions in separate legacy cases; remove historicalActivation normalization as the mechanism for qualifying new candidate behavior.
+- [ ] Run those focused files to establish the actual compatibility RED at consumer boundaries. Keep old pending/uninstalled-source negative tests. No public factory gets a role or injected hash argument.
+- [ ] Apply the spec consumer map exactly. In policy-setup retain the legacy publish-only validator at old line75. In policy-transport use candidate-only configuration(value) and private historicalConfiguration(value); readVersion's existing closed argument chooses the exact projection/hash for BOTH metadata and pin. Candidate wire remains candidate-only. Keep qualifyFiniteWorkerVersion and restoration hash checks intact.
+- [ ] Split SetupContext baseline/rollback checks by property name. Use finite bundle/resolver/history in candidate installation/confirmation. Switch confirmation's Known call without altering event/env/step identity, number of keys, clock, source reread, result or provenance checks. Update the test spy export name and candidate fixture hash; do not stub the actual native lifecycle tests from Checkpoint2.
+- [ ] Update finite candidate fixtures to the fixed hash only where their data is a new candidate; preserve old rollback configurations. Preserve template/config flags already qualified by the preceding opt-in work. Do not edit historical2607/c570 files or recompute historical pins.
+- [ ] Run lint; run bounded cloud groups with exact head attribution and isolate initial-upload from other native files:
+  - node --test test/mcp-qa-finite-profile.test.mjs test/mcp-qa-finite-preparation-records.test.mjs test/mcp-qa-finite-policy-transport.test.mjs
+  - node --test --test-concurrency=1 test/mcp-qa-finite-policy-setup-native.test.mjs test/mcp-qa-finite-connection-preparation-native.test.mjs test/mcp-qa-finite-initial-owner-source-native.test.mjs test/mcp-qa-finite-preparation-cleanup-native.test.mjs test/mcp-qa-finite-confirmation-native.test.mjs
+  - node --test test/mcp-qa-finite-initial-upload-native.test.mjs
+  - node --test --test-concurrency=1 test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-phase-inventory.test.mjs test/mcp-qa-finite-bootstrap-native.test.mjs test/mcp-qa-finite-historical-source-native.test.mjs
+  - node --test --test-concurrency=1 test/mcp-qa-finite-owner-native-conduit-native.test.mjs test/mcp-qa-finite-owner-request-retention.test.mjs test/mcp-qa-finite-owner-request-retention-native.test.mjs
+  The last group is affected-source regression, not another flag experiment. Preserve receiver-aborted held/before-guard observations and retained pending work through actual settlement. Require terminal PASS, zero unexpected skips/cancellations; the existing initial-upload timeout is unresolved until diagnosed, not waived by this plan. No product timer/budget increase or unrelated HTTP-engine fix.
+- [ ] Compare exact Git blob IDs against aed54dab and sourceBASE for lib/mcp-qa-finite-historical-source.mjs, lib/mcp-qa-cloud-closed-pins.mjs, worker/independent-closure/closed-rollback.mjs, worker/mcp-own/closed-rollback.mjs, wrangler.independent-closure-qa.rollback.jsonc, scripts/mcp-confirmation-frozen-artifact.json and scripts/mcp-qa-legacy-historical-context.json. Require equality and inspect full source diff for any historical pin/config mutation.
+- [ ] After final source edits, run ONE actual compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:process.env.GITHUB_SHA}) in the authorized qualifier. Log only sourceRevision/tree and module metadata/public hashes; do not log private bundle/material, candidate bytes or secrets. Require source/template/entry/bootstrap/residency guards and M<=2097152 / QA<=3145728 bytes without relaxing limits. The exact codeHEAD must be committed and clean. No complete-package/deployment claim.
+- [ ] Remove the temporary qualifier before delivery. This administrative removal is a later source revision: report the exact compiler head and subsequent diff, never attach its module hashes to a later head. If removal changes compiler-bound workflow input, compile the final intended source in the established bounded CI mechanism rather than claim equivalence. Avoid an endless documentation rebuild: reportHEAD is documentation only and explicitly distinct.
+- [ ] Write final implementation report docs/superpowers/reports/2026-11-04-finite-request-signal-opt-in.md with expanded file map, root ruling/design, BASE/codeHEAD/reportHEAD, all run/job/attempt/counts, preserved failures/timeout disposition, legacy positive and finite actual lifecycle outcomes, SYN limits, historical blob equality, final compile metadata and remaining C2/unmounted/expired-source limitations. Fresh independent source review before root composition; no PR/merge/deploy by this plan.
+
+## Exact consumer map at pinned source
+
+| Source and line anchor | Required selection |
+| --- | --- |
+| mcp-qa-finite-initial-owner-source:138 | New candidate hash for initialBaseline.configurationHash. |
+| mcp-qa-finite-preparation-cleanup:39 | New candidate hash for capsule/initial baseline correlation. |
+| mcp-qa-finite-policy-setup:74,91 | New candidate hash for baseline receipt and expectedFull.activationHash. |
+| mcp-qa-finite-policy-setup:75 | KEEP legacy validateReleaseOperatorBundle for configuration-free publish artifact validation; do not alias the entire import. |
+| mcp-qa-finite-policy-transport:31,69,109,166 | Candidate configuration validation/hash for phase baseline, Plan correlation and wire. |
+| mcp-qa-finite-policy-transport:160-164 | Existing private closed=false role is candidate/current; closed=true is historical rollback. Validate BOTH returned metadata and expected pin under that exact role. |
+| mcp-qa-finite-policy-transport:222 | Fixed finite resolver and history validation after installation. |
+| mcp-qa-finite-preparation-records:120 | Replace undifferentiated [baseline,rollback] activation validation: baseline uses finite; rollback uses legacy. Keep restoration hash and record schema/digests. |
+| mcp-qa-finite-profile:56 | canaryLive privateFull.activationAlgorithm becomes exact string "finiteActivationConfigurationHash"; qaLive remains null. |
+| mcp-qa-finite-confirmation:55,73 | Fixed finite bundle validator, then runFiniteKnownCancellationReleaseWorkflow with the same env/event/step identities and exactly four keys. |
+| mcp-release-runtime:174,181,243,262 | Selected Known bundle/resolver/history and private Workflow body. |
+| mcp-release-runtime:95,101,132 | Selected Workflow bundle/history and private Operator body. |
+| mcp-release-runtime:48,50,57,74,81 | Selected Operator bundle/history/resolver/observer/reservation. |
+| mcp-release-successor-reservation:14,16,20 | Selected bundle/history/resolver in shared reservation body. |
+
+All module paths in the table are under lib/ with .mjs suffix. Line numbers are source anchors, not future diff line numbers. Scoped inventory41925030772/job126907057963 plus41925236121/job126907778764 and inspected imports establish this map. Recheck only these symbols and direct changed consumers before source edits; do not rescan the entire vault.
+
+For transport, keep configuration(value) candidate-only. Add private historicalConfiguration(value) using the legacy hash after the same seven-field projection; share a private projection helper if useful. readVersion(pin,lease,closed=false) chooses those fixed functions from its pre-existing internal role, then compares both same-role activation hashes. The historical branch must never call candidate configuration() first. Wire is always candidate. Do not infer closed from flags; existing readVersion(rollback,c,true) is the historical caller. Keep qualifyFiniteWorkerVersion's exact restoration pin/module comparison and basiccompatibility check unchanged.
+
+For SetupContext, explicitly validate baseline and rollback by property name rather than order/probing. The stored schema and hash domains do not change; old sealed records are not migrated or rewritten. Historical pins and their module/configuration checks remain independent. Structural activation validation is not a substitute for exact historical source/pin qualification.
+
+
+## Root execution clarifications
+
+Use the accepted APIs already present: finiteActivationConfigurationHash, createFiniteActivationObserver, validateFiniteReleaseOperatorBundle, resolveFiniteNamedActivationPlan, validateFiniteNamedCancellationHistory, reserveFiniteReleaseSuccessor, runFiniteKnownCancellationReleaseWorkflow. Legacy APIs remain strict. Hash current/candidate metadata and expected pins with the finite function, historical rollback with legacy; never try whichever passes. Configuration-free setup publish validation stays legacy.
+
+Diagnose the recorded initial-upload file timeout with isolated test output and actual last unsettled case. Do not call 82 prior passes/one cancellation a completed suite. Product clocks cannot increase. Test/CI bounds may be adjusted only to measured isolated test work, recorded explicitly; do not hide a hung test by raising bounds or changing positive expectations. Reuse unchanged incoming signal milestone; repeats must be justified by changed integration code, not metadata lag.
+
+Write full report docs/superpowers/reports/2026-11-04-finite-known-profile-c3.md: exact BASE/code/reportHEAD, causal consumer RED/GREEN, command/run/job/attempt/counts/warnings, historical blob comparison, timeout diagnosis and final exact source compiler/tree/module hashes. Remove your qualifier and the parent opt-in qualifier before final delivery, preserving all product evidence. Root fresh task review then decides parent opt-in acceptance. Do not claim C2 material/current producer source, user consent, notice/finite prearm, cleanup handoff, remote rollout or PC-off completed.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-04-finite-owner-phase-context.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-04-finite-owner-phase-context.md b/docs/superpowers/briefs/2026-11-04-finite-owner-phase-context.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-04-finite-owner-phase-context.md
@@ -0,0 +1,121 @@
+# Task brief — original owner first-phase factual context
+
+Prepared only; root activates after Checkpoint3 acceptance. Read this first when dispatched. The full scoped requirements are the linked spec and Task1 below, never the earlier architecture history. BASE is supplied in dispatch and must be verified before CAS. One product writer; GitHub source and credential-free Actions only; no subagents.
+
+Spec: docs/superpowers/specs/2026-11-04-finite-owner-phase-context.md (same activated commit).
+
+## Global Constraints
+
+- The exact private envelope is {source,preconnectionId,capsuleHash}; validateFiniteOwnerSource keeps its strict inner grammar.
+- Common/M must never import QA bootstrap or candidate-residency decoding modules.
+- Strict standalone readPrivateQaFiniteInitialOwnerSource and its absence checks remain unchanged.
+- Pending-only conduit, GET-only private continuation and private POST rejection remain unchanged.
+- No SDK issuance, native mount, provider mutation, permission boolean, callback/DTO authority or new admission.
+- Original I0/C0/C1, technical I0+300000, parent <=30000ms, child <=5000ms, commandBy-510000, nominal and launch clocks/counters remain unchanged.
+- Historical2607/c570 and QA_CLOUD_CLOSED_PINS remain immutable; source ceiling2026-11-03T02:59:00Z is expired; single consuming Entry remains reserved.
+- Exact candidate profile follows the eventually root-accepted incoming Request.signal qualification revision; no hardcoded old flag set or duplicate opt-in experiment.
+- No activation before that source qualification and root review; no remote schema, permissions, tokens, OAuth, OTP, cron, Max or other-project action.
+
+## Review Focus
+
+- Original pointer appears again after an unresolved SEND: context must still deny; matching pointer is not settled publication.
+- Storage prefixes look valid individually but belong to another original A/owner/enrollment: no phase source may be returned.
+- Receipt is valid but actual module/configuration or first-primary owner changes between snapshots: deny, without retry or repair.
+- Held read/body/cancel outlives logical timeout or abort: retain actual work and deny later work borrowing another root.
+- Later stage or private-policy text passes a loose projection: deny notice_consent/finite_prearm; placeholders and empty fields do not prove semantic prearm.
+
+All five are assigned explicit tests below. No execution occurs merely because this plan exists.
+
+---
+
+
+## File map
+
+Create:
+
+- lib/mcp-qa-finite-owner-phase-context.mjs — fixed QA-only context producer; lexical bounded provider/D1 observations and two supported phase decisions.
+- lib/mcp-qa-finite-owner-stage-facts.mjs — pure exact installed-stage DATA qualifier, below resolve.
+- lib/mcp-qa-finite-preparation-enrollment-facts.mjs — pure original enrollment binding qualifier, with no phase/relax switch.
+- test/mcp-qa-finite-owner-phase-context.test.mjs — pure qualifier/strict data and graph boundary tests.
+- test/mcp-qa-finite-owner-phase-context-native.test.mjs — actual QA DO/D1 reader against explicit synthetic external evidence.
+- test/fixtures/finite-owner-phase-context.mjs — native test extension to the existing initial-entry world; no product source replacement.
+
+Modify:
+
+- lib/mcp-qa-finite-owner-preparation-qa.mjs — lexical reader import/call only.
+- lib/mcp-qa-finite-owner-preparation.mjs — stageHistory fact gathering delegates pure installed-stage predicates; preserve final currentPublication check, resolve/envelope, GET rejection, setup semantics and result shapes.
+- lib/mcp-qa-finite-preparation-cleanup.mjs — extract only enrollment linkage predicates into shared helper; preserve all standalone inventory/absence/reread gates.
+- test/fixtures/finite-initial-entry-world.mjs — minimal test-only original-lease entry to the real context module and fixture extension; existing fixture modes unchanged.
+
+Do not edit worker entrypoints, profile/flag files, initial standalone source reader, common owner-source/connection-source stubs, issuer mutation/schema files, cleanup alarm, transport pending return, historical pins or existing setup-facts pending expectations.
+
+## Task 1: QA factual context for closed_ui and first settled connection
+
+This is one independently testable deliverable. Pure extraction, native fixture and QA adapter change belong to the same task; neither scaffolding nor a nominal new export is a completed unit.
+
+**Interfaces consumed:**
+
+- readPrivateQaFiniteInitialAnchors({ctx,env},originalLease), returning the exact DATA shape stated in the spec.
+- Existing request root/deadline and observeFiniteFactualReadWork, with accepted same-ambient genuine-owner borrowing.
+- createFiniteOwnerPreparationStore({storage,now}) read methods, preparation codecs, policy identity hashes and journal records.
+- createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId},lease), read-only.
+- qualifyFiniteConnectionProfile({phase,metadata}), used only with supported preparation phases.
+- Existing primary repository/grant readers and new fixed SELECTs for exact original issuer/fence/consent/link observations.
+
+**Interfaces produced:**
+
+- readPrivateQaFiniteOwnerContext({ctx,env,parent,preconnectionId = null}) -> Promise<Readonly<{source,preconnectionId,capsuleHash}>>, otherwise unavailable.
+- qualifyFiniteOwnerInstalledStage({source,preconnection,sourceSnapshot,initialTicket,connection,stage,stageApproval,approval,ticket,ticketUse,upload,activation,predecessors,grantLink,noticeLink,observedAt}) -> Readonly<ConnectionReceipt>, otherwise throw.
+- qualifyFinitePreparationEnrollmentFacts({anchors,enrollment,ack,preconnection,sourceSnapshot,stageApproval,approval,ticket,ticketUse,projectRef}) -> Readonly<{enrollment,ack}>, otherwise throw.
+- preparePrivateQaFiniteOwnerChoice signature and common continuation are unchanged; only its lexical producer changes.
+
+- [ ] **Step 1: Bind the accepted source inputs.** Read the actual accepted opt-in commit/profile and repository instructions. Record head/tree, exact profile files and previous accepted run in the task receipt. Confirm no source conflict with this file map. Do not write a compatibility flag or dispatch the independent signal experiment.
+
+- [ ] **Step 2: Write focused failing DATA tests.** In test/mcp-qa-finite-owner-phase-context.test.mjs, import the two missing pure qualifiers and assert exact original-chain success plus one-field mutations: wrong original A, changed subject/source/project, wrong predecessor, ticket-use decision hash, ACK sendHash, receipt version/deployment, completedAt before either ACK, extra data/accessor/symbol and unknown journal state. For enrollment, exact original tuple/ACK succeeds, null ACK is factual only, wrong capsule/plan/zero-state/decision/hash denies. Native backup cases must deny missing/tampered Receipt/Backup/chunk, mismatched manifest/material/baseline and assembled length/hash without changing historical pins. Assert neither helper accepts a function/env or returns a callback/permission key. Do not test an invented all-four phase source.
+
+- [ ] **Step 3: Run focused RED in authorized cloud CI.** Run `node --test test/mcp-qa-finite-owner-phase-context.test.mjs`. Expected FAIL specifically because planned modules/exports are absent, not missing runner dependencies. Preserve the sanitized failure and exact head.
+
+- [ ] **Step 4: Extract the two pure qualifiers.** Implement signatures exactly as the spec. Move original predicates without weakening expiry or strict standalone reader behavior. stageHistory gathers the same exact records, passes one stage at a time with actual predecessors, and keeps its existing source.currentPublication comparison. The strict cleanup reader retains all prefix absence/zero-state/reread gates; the shared helper only checks factual linkage. No helper calls resolve, stageHistory, a reader or a store.
+
+- [ ] **Step 5: Add native failing two-phase tests through the actual reader.** Extend initialEntryHarness with a test-only direct native invocation under createFiniteOwnerRequestLease, and implement fixture composition in test/fixtures/finite-owner-phase-context.mjs. Use real initial anchors and native preparation/journal APIs; test setup may supply labelled synthetic provider/custody metadata, but may not substitute owner source, context producer, strict qualifiers, resident decoder or create a source-shaped success DTO. During the tested read, prohibit storage put/delete/sync, SQL mutations and provider non-GETs; retain read-only transactions where existing journal reads require them.
+
+  Required named cases/assertions:
+
+  - `closed source keeps original A and stable original context`: exact envelope keys; source matches strict grammar; original baseline/program/window match capsule/material; actual retained backup manifest/chunk hashes are checked; snapshots unchanged.
+  - `original approval and enrollment stay closed without publication`: use actual record/store APIs; resulting phase closed_ui; strict standalone reader still rejects same approvals.
+  - `settled first connection derives read_consent from exact primary state`: exact upload/activation journal and receipt, real read-only source code, actual synthetic provider metadata for the derived configuration. Assert phase/read receipt; original baseline does not move; all unchanged binding/module bytes exact.
+  - `unknown SEND denies even while provider pointer equals original M`: upload-only, activation-only, orphan ACK/receipt, wrong contextHash and writer-head cases all unavailable.
+  - `foreign extra and later stages never become matching phase state`: foreign A, unknown keys, notices/finite approval or receipts, empty/private-placeholder canaryLive fields all unavailable. Do not invent a positive notices/prearm candidate.
+  - `primary issuer prefixes remain facts not next-stage permission`: no issuer prefix accepted; exact reservation/OPEN/authorization/consumed-without-grant prefixes checked; grant/link/relation checked when present. Unknown ACK, orphan row/link, reservation/fence tuple mismatch, terminal fence, revocation or expiry denies. Missing grant is never repaired and no notice eligibility returned.
+  - `fresh current owner and current publication are independently rechecked`: owner/revision/grant/configuration/QA-pointer drift after first snapshot denies; every independent observation starts with SELECT in a fresh first-primary session.
+  - `original retained request cannot be renewed or borrowed`: genuine root with 29s elapsed leaves <=1s; abort/holder drift/held fetch/body/cancel retain work until settlement; clone/foreign-root denial. Reuse accepted retention controls, not a new permission mechanism.
+
+- [ ] **Step 6: Run native RED in authorized cloud CI.** Run `node --test test/mcp-qa-finite-owner-phase-context-native.test.mjs`. Expected FAIL for missing/new reader behavior with native fixture actually entered; no success assertion from source substitution. SQL mutation fixtures use their real supported SQL clock; capsule pre-expiry test clocks remain explicit synthetic evidence and never alter production Date/clock policy.
+
+- [ ] **Step 7: Implement the QA reader and lexical adapter.** Implement exactly the spec's two snapshots, bounded inventories with overflow, actual QA/resident/original M and retained-backup qualification, shared enrollment/first-stage predicates and current primary owner/issuer/link checks. Original baseline uses finiteActivationConfigurationHash(plan.configuration), not latest receipt or restoration hash. First connection configuration differs from original only by AFW_DELEGATED_OAUTH_ENABLED=true. Unknown SEND, later stages, cleanup progress and profile/provenance mismatch throw unavailable. Close every actual lifetime through retained existing scope; no writes, repair, retries, new lease or source factory. Switch the QA adapter import to the new reader; leave private POST rejection untouched.
+
+- [ ] **Step 8: Run scoped lint first, then the focused GREEN and unchanged-boundary suite in authorized cloud CI.**
+
+```sh
+node --test test/mcp-qa-finite-owner-phase-context.test.mjs test/mcp-qa-finite-owner-phase-context-native.test.mjs test/mcp-qa-finite-initial-owner-source-native.test.mjs test/mcp-qa-finite-initial-owner-source-records.test.mjs test/mcp-qa-finite-preparation-cleanup-native.test.mjs test/mcp-qa-finite-preparation-cleanup-records.test.mjs test/mcp-qa-finite-owner-context.test.mjs test/mcp-qa-finite-owner-original-context-native.test.mjs test/mcp-qa-finite-owner-native-conduit.test.mjs test/mcp-qa-finite-owner-request-retention-native.test.mjs test/mcp-qa-finite-policy-setup-facts-native.test.mjs
+```
+
+Expected zero failures/skips in this focused set; tests assert private POST calls reader zero times, pending host effects zero, strict initial denials intact, and existing setup-facts pending remains correct. Reuse recorded accepted incoming-signal evidence; do not duplicate its opt-in experiment. If a new regression is exposed, fix the relevant task and rerun only affected checks.
+
+- [ ] **Step 9: Verify the changed import graph once.** Run existing candidate residency check `node --test test/mcp-qa-finite-candidate-residency.test.mjs` and the repository's established credential-free changed-graph compiler gate at the accepted head. Capture actual M and QA graphs. Assert no new M/common edge to bootstrap/residency, no worker mount/profile edit, historical pins unchanged. A direct native reader fixture is not proof of a compiled product mount.
+
+- [ ] **Step 10: Commit and obtain the root source review.** Commit only this task's explicit file map plus its concise evidence note with expected-head CAS, preserving concurrent changes. Suggested message: `feat(afw): qualify original first-phase owner context`. Record exact source/tree/run, synthetic input boundaries, supported phases, preserved denials and remaining gates. A commit alone is not acceptance; root reviews before any next implementation slice or activation.
+
+
+
+## Root mandatory clarifications
+
+- Both source spec and plan include Root compatibility handoff/causal-cycle correction. Use finiteActivationConfigurationHash for ORIGINAL/CANDIDATE preparation configurations, legacy only for historical rollback; never infer role from flags or try validators until one succeeds.
+- Supported source phases ONLY closed_ui/read_consent. Notice/closed-prearm/full setup source remains unavailable. No fake ready DTO, fixture-only full private policy or weakening of actual pending boundary. Existing four setup-facts positives remain intentionally pending until later genuine flow.
+- No global grant absence scan without a reserved UUID. Actual prepare store signature is {storage,now} captured lexically. Per current primary observation use new first-primary session and SELECT first. No permissions/authority returned from the DATA helpers.
+- Tests may create synthetic evidence through actual journal APIs but must label provenance; actual context module/residency/record validators are not replaced with success objects. Verify no provider non-GET/storage writes during tested context reads. Read-only storage transactions are permitted.
+- If the closed_ui source with approval/enrollment exposes unsupported current strict fixture assumptions, report the actual failing boundary; do not broaden initial-reader contract or change expectations to success-shaped pending data.
+- Report docs/superpowers/reports/2026-11-04-finite-owner-phase-context.md: exact BASE/code/report HEAD/tree, RED/GREEN cmds/run/job/attempt/counts/warnings, actual-vs-SYN boundaries, retained limits and original clocks, changed graph/compiler with original2MiB M/3MiB QA limits and no common/M→QA decoder edge; remove own qualifier. No remote operations.
+
+
+On activation root supplies actual accepted compatibility/signal source BASE. Its immutable acceptance record and final opt-in report travel with this task. No earlier compiler hashes transfer to your changed QA graph; obtain one exact-head actual compiler with original limits after your source changes.

~~~~~~~~~~

## docs/superpowers/briefs/2026-11-04-finite-owner-sdk-trust-boundary-d01-preflight.es.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/briefs/2026-11-04-finite-owner-sdk-trust-boundary-d01-preflight.es.md b/docs/superpowers/briefs/2026-11-04-finite-owner-sdk-trust-boundary-d01-preflight.es.md
--- /dev/null
+++ b/docs/superpowers/briefs/2026-11-04-finite-owner-sdk-trust-boundary-d01-preflight.es.md
@@ -0,0 +1,7 @@
+# D0.1 preflight — 2026-11-04
+- PROJECT: Agent Friendly Web; REPOSITORY: tokenizartinfo-ops/agent-friendly-web (ID 1347578006); ENVIRONMENT: candidate SOURCE branch feat/finite-native-cleanup-20261101; ORIGIN: GitHub connector; RESOURCE_TYPE: branch commit/tree; RESOURCE_ID: 7067c850914353d720eac67e039216bd19ec1268; ALLOWED_ACTION: D0.1 source/test/docs commit and credential-free Actions only.
+- Branch head read through Git ref equals exact accepted BASE 7067c850914353d720eac67e039216bd19ec1268; tree 6b1fbd2329d89e16415e65b4c6082114e58ae96d. No main/PR/deploy/provider contact.
+- Accepted phase-context first-primary reader and pure conversion are already in BASE; D0.1 consumes neither as authority. D0 design brief and linked exact access delta reviewed. D0.2/D0.3 inactive.
+- Proposal: exactly one qaLive alias AFW_FINITE_OWNER_OAUTH_KV to existing namespace 6b94ff702e504e14a7730cee73a0f6ff. This would grant namespace-wide QA Worker read/write on actual installation, not per-key or actor permissions. This commit creates SOURCE declarations only and carries no real binding, credential, operational authorization, or Entry.
+- M physical bindings and historical qaClosed/c570/M2607/pins remain fixed. Revised Q bootstrap/material/capsule must precede the single Entry. Old sealed Q cannot qualify after this change.
+- Rollback: revert only this task's branch commits by CAS to the preserved BASE after verifying no later legitimate work; do not reset other refs or delete historical resources. Source evidence is the commits, Actions runs and this record.

~~~~~~~~~~
