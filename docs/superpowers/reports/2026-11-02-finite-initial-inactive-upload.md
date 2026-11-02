# C2-B2a initial inactive upload — source implementation evidence

Status: source qualified; independent review fix round1 pending; SOURCE ONLY. Binding spec and plan: ../specs/2026-11-02-finite-initial-inactive-upload.md and ../plans/2026-11-02-finite-initial-inactive-upload.md.
BASE c4696911f8895ae605da0512c77dc8d1a0e5acd0 / tree30646c600c01160b731a5ed834991e9be413fe78, branch feat/finite-native-cleanup-20261101, tokenizartinfo-ops/agent-friendly-web. Branch ref read back equal BASE before changes. Root is review owner; this task is sole writer.

## Pre-code actual constructor / wire / journal / precondition / test table

| Boundary | Actual supported source and selected implementation |
|---|---|
| Constructor and only call | mcp-qa-finite-initial-entry.mjs: existing public constructor stays; private nonexported publishInitialClosedVersion(ctx,env,entry,producer,result,parent) is invoked only after actual collect/assertCurrent/post-sync/assertCurrent. No stored data continuation or effect export. |
| Source / bytes | Actual A result candidateBytes + script and compiled residency identity; assertCurrent original parent before every effect barrier. Distinct fixed historical baseline2607/7b5, QA_CLOUD_CLOSED_PINS.canary module315 and existing frozen historical receipt2a477. Pure baseline metadata qualification may be extracted/reused without adding any factual reader. |
| Wire | Existing finitePublicProfileTemplate(canaryLive), qualifyFiniteConnectionProfile(closed_ui); exact existing export/SQLite/Container/resource IDs. Populate Access/client/project/limiter from actual A; original intent.initialDeadline expiry. Empty private policies, every enabled flag false; A-retained IDs remain bound in private manifest/SEND, no fresh IDs/window. JSON content_base64, exact baseline inherit descriptors, containers class_name only. Deny unknown raw/config/export fields. |
| Preservation | Sanitized raw baseline metadata, normalized config and baseline module bytes are private append-only bounded deterministic chunks. Exact codec fields, hash-stamped manifests and chunks <=64KiB; no secret values or body in A/RPC/log/artifact. Native transaction final return -> actual sync -> exact readback; preserve existing keys/history. |
| Journal | New afw.finite-initial-upload.v1 domain, deterministic keys per Entry/material. Distinct SEND, ACK, receipt. Final transaction return is sole new-SEND admission. No callback HTTP or outer inserted flag. Existing/unknown SEND denies another POST; exact readback after captured sync. ACK only actual successful returned UUID; GET same UUID and module/config/resource equality before receipt. |
| Lifetime / promises | Existing original native30s/child<=5s/I0/custody/ceiling. Add parent retain API internal only; underlying native transaction/sync/get/fetch/body promises retained before races. Sticky unknown cannot become a new effect admission. No old45s helper. |
| Static / live preconditions | Reader and publisher bindings both present/valid before Entry; capture/recheck transport, storage, env and source holders. Fixed actual token verify IDs9aa/057/status/not_before/expiry under original lease, narrowed custody. Fixed canary pointer before SEND and after uploaded readback, dated observations only. |
| Tests | Extend real finite Workflow->DO SQLite+D1/A/residency fixture, actual JSON serialization with explicit SYN CF/GH/token/source pins/approval ceiling. RED for missing real upload and pre-Entry publisher; native faults at distinct upload SEND/sync/ACK/readback, restart/replay, original/child budget and immutable/private chunk stamping. Preserve B1 assertions, adapt its intentional extra sync count and fixture routes. Pure strict wire/codec rejection tests plus one stable actual compiler/residency/profile qualification. |

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT source-only branch / GitHub-hosted Node22; ORIGIN GitHub; RESOURCE_TYPE Git branch/tree and Actions; RESOURCE_ID feat/finite-native-cleanup-20261101; ALLOWED_ACTION bounded code/test/docs commits and branch-only qualification; ROLLBACK retained exact BASE and append-only commits, no main change or provider mutation.

Root scope ruling preserved: deploy=false immutable version creation does not require activation's global writer-drain / Workflow list-status gate. Old uncertainty is unchanged. Future activation, rollback, ownerSource and capsule must independently qualify inside the same winning invocation before return. No actual initial command until full composition, to avoid spending Entry on partial work. Latest/last100 catalog effects exist; pointers are dated observations, not future foreign-write proof.

operationalReadiness=false; completePackage=false; PCoff=false.

## Root timing clarification (after pre-code table, before final validation)

Root accepted the table and explicitly confirmed intent.initialDeadline (I0+5min) is a shorter inactive technical profile bound. It is NOT the future owner window (grammar permits up to15min), not a renewed window or proof of a ready15min flow. Future activation/owner composition must reconcile its original bounds independently inside the same winning invocation. No new test wave or scope expansion solely for this note.

## Initial RED -> GREEN chronology

- Pre-code table93719fdca2c62788097f3f5685c3047eabd6c629/treee66b00ee809a49587a8b8eb0dce73083c311b05b exact readback.
- Native RED0486e42f5a869f8a71b91e9e88c6be6f218cf732/tree1426b590dbe059aef5e92a765b60a90e7faaad85, Actions41543223627/job125612299535/attempt1:3tests,0PASS,3expectedFAIL,0cancel/skip,lintPASS. Missing actual POST and absent/invalid publisher improperly reaching material_recorded. Tests exercise actual finite class/Workflow/DO/SQLite/D1/A/residency, external facts explicitly SYN.
- First implementationf1223cafd59f2da3696c3e9d6b6661e184f83280/tree8ef4a3fa4740f3775551a8ba9f55c22a82003be4. Actual Actions41543829083/job125614326556/attempt1:3PASS0fail/cancel/skip,lintPASS. This is the small first GREEN, not complete qualification.
- Expanded native boundary tests8bb966f3ae6807a1856a939701543e9561786ecb/treebdfa151de874a063885de335a369d226742c6e02 now include original/child expiration, actual held promise, lostACK, restart, callback reentry, chunk tamper/privacy, custody and exact UUID/version resource failures. B1 successful sync count intentionally becomes6 (old two plus backup/SEND/ACK/receipt), retaining all earlier assertions.

- Expanded8bb966f3 Actions41544264267/job125615855644/attempt1:83tests,82PASS,1FAIL,0cancel/skip; lint clean. All native B1/upload/custody/durability/restart tests passed. The new hostile-accessor codec test exposed one product bug: seal spread its caller record before validating own data descriptors and executed the getter. Root cause is construction order, corrected by initialOwn(value) before spread. This is a causal RED/fix, not a waived assertion. Remaining successful suites are not reflexively rerun; focused codec/new fresh-baseline cases and the required first stable compiler/profile/residency plus affected historical/A regressions follow.

- Focused correction and affected qualification47083000cb56f5345a91fc087c61a11c5def6fd7/treeaec08340d93eee0cdf34fe737a8f6d0b83c4cc94: Actions41544832452/job125617754533/attempt1,3codec+8native fresh pre-send/config/winner+53historical/A/profile+23compiler/residency tests PASS,0fail/cancel/skip,lint clean. Preliminary bytes canary1948550/QA1905417/compressed382788. The codec bug is fixed; these tests are real executed results, external authority/source pins remain SYN.
- One verification gap identified during final evidence audit: existing compiler rejects issuer/compiler/esbuild inputs but does not explicitly assert filesystem imports absent across the emitted runtime graph. Added this required graph assertion to the existing residency test, using the same compiled result and no product changes. The next narrow run repeats only the compiler/residency needed to close that specific unresolved check, not the passing native/profile suites. Its exact source head/measurements supersede470's preliminary sizes/hashes for final qualification.

## Final exact source qualification

Final code/test HEAD5705d750fdac7f3e1c859f50f1df33b124ddfa6c; tree51d2c534ff71dbdea593676751d1e481737d4f80. Last product change47083000cb56f5345a91fc087c61a11c5def6fd7;5705 adds the required graph assertion and narrows only temporary qualification. All11 source/test/qualifier files were read back by exact HEAD and matched intended content, not just filenames. BASE..codeHEAD is ahead6/behind0; no merge or change to main.

Final graph/compiler/residency run [41545121309](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41545121309), job125618722602, attempt1, head5705d750:23PASS,0fail/0cancel/0skip; scoped lint0errors/0warnings; artifacts0. Both actual emitted runtime graphs exclude issuer/compiler/esbuild and filesystem imports (qaLive292inputs,canaryLive318inputs).

| Actual source measurement at5705 | Bytes | SHA256 |
|---|---:|---|
| canaryLive/index.mjs | 1948550 | ac1d9d8af2153815e74f608dbe208760e11938b143c702b4ce54d2b495d45965 |
| qaLive/index.mjs | 1905417 | 3cd5d82a90d87943692ba4d0fca2ef6b7bd105430dfc94bd3ac5dae2a6dfc875 |
| QA-held compressed candidate | 382787 | e0d964d5f60c74a7ba4fab6cb85360e73f7c6652e58294cbc5341975df5340fc |

ProgramHash f6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6. Canary2MiB/QA3MiB caps unchanged. Exact modules/existing exports/config templates and source revision/tree verified by actual compiler, current QA-only residency decoded under workerd. Historical closed bytes remain distinct from candidateM.

### Commands and observed coverage

All commands execute only on GitHub-hosted ubuntu24.04 with locked npm dependencies / Node22.23.4. Install: `npm ci --ignore-scripts --no-audit --no-fund`. No credential-bearing env, provider command, artifact publication or local build.

- RED41543223627 and firstGREEN41543829083: `node --test test/mcp-qa-finite-initial-upload-native.test.mjs` at their respective recorded heads (3cases).
- Expanded41544264267: `node --test test/mcp-qa-finite-initial-upload-native.test.mjs test/mcp-qa-finite-initial-upload-records.test.mjs test/mcp-qa-finite-initial-entry-native.test.mjs test/mcp-qa-finite-initial-entry-records.test.mjs test/mcp-qa-finite-initial-material-records.test.mjs` —83tests,82PASS/one subsequently fixed accessor failure. All B1/native upload fault cases passed in this run.
- Focused47083000/run41544832452: `node --test test/mcp-qa-finite-initial-upload-records.test.mjs` —3PASS, including the exact failing accessor case; `node --test --test-name-pattern='fresh pre-send|upload-config-tamper|actual native winner' test/mcp-qa-finite-initial-upload-native.test.mjs` —8PASS; `node --test test/mcp-qa-finite-historical-source-native.test.mjs test/mcp-qa-finite-initial-material-native.test.mjs test/mcp-qa-finite-profile.test.mjs test/mcp-qa-finite-profile-native.test.mjs` —53PASS. Nofail/cancel/skip. Preliminary compiler23PASS; exact final graph-qualified measurements are5705 above.
- Final5705/run41545121309: `node --test test/mcp-qa-finite-candidate-residency.test.mjs` —23PASS.
- Final lint: `npx eslint lib/mcp-qa-finite-initial-*.mjs lib/mcp-qa-finite-historical-source.mjs test/mcp-qa-finite-initial-upload-*.test.mjs test/mcp-qa-finite-initial-entry-native.test.mjs test/fixtures/finite-initial-*.mjs test/mcp-qa-finite-candidate-residency.test.mjs` —clean.
- Artifact inventories explicitly fetched for all5 runs:0 each. Qualifier contents:read; no docs-only trigger, secrets, upload-artifact or deploy. Temporary workflow EXCLUDED from eventual integration.

Do not sum these into one final-head whole-suite result. Focused revalidation follows the actual isolated codec fix; previously passing native assertions were retained, not dropped or mislabeled as freshly rerun. Broad repository npm test/lint/build were not run for publication because no publication is authorized in this unit; the explicit bounded hosted qualification owns this source task.

### Actual versus SYN

ACTUAL: production finite Workflow class.run -> native DO RPC/actor; SQLite transaction/sync/get/readback and D1 queries; actual A/bootstrap/historical source composition; original parent and child timers/abort; real captured pending transaction/sync/fetch/body promises; native persisted actor restart; exact outgoing JSON request serialization, hashes and private backup reconstruction. Chunk records<=64KiB/native value bounds; sorted chunk identities reproduce the exact SYN baseline bytes. Native journals retain old legacy unknown and firstfiniteHEAD untouched. Successful actual path has one POST, six durability syncs and the existing exact material_recorded RPC envelope only.

Explicit SYN: GitHub command/main/source facts, Cloudflare HTTP responses/token IDs/status/custody metadata/approval ceiling, frozen historical receipt and pin contents, test-resident small candidate program, provider-created UUID/config, Workflow delivery/step scheduler and injected callback retry/ACK loss/timing. Full real source compiler/residency measurements above are NOT those tiny fixture bytes. Synthetic HTTP/body holds establish no universal remote cancellation or physical settlement. No production Cloudflare endpoint/token/reader/publisher or live workflow was exercised.

The shared historical fixture now includes the second existing projection-secret descriptor so the actual reviewed profile's physical/secret binding preservation is tested truthfully; the29binding/8flag shape is retained. B1's two existing sync assertions deliberately count six after adding backup/SEND/ACK/receipt; pre-A/post-A durability and replay assertions remain.

### Owning implementation and remaining limits

The new mutator is private and nonexported, with one call after actual A/post-sync. Its only mutation URL is the fixed JSON inactive upload. Pure new wire/record functions and pure historical baseline validation cannot perform I/O or mint admission. SEND stores only the exact request/body hash and correlation, not script, body or credential. Actual successful returned UUID is persisted/synced/read back before GET of that exact UUID; no list-latest, predicted ID, activation or rollback. All failures are admin_pending; possible orphan and durable SEND uncertainty remain. No public enabling status or upload receipt crosses RPC.

Returned descriptors/inheritance semantics do not prove equal secret values. Raw configuration backups carry names/types only; forbidden secret content stops before persistence. Fixed baseline2607/7b5 is observed before/after, never dynamically adopted. Preservation does not prove future last100 deployment eligibility, nor absence of later foreign changes; immutable upload updates latest/catalog even without traffic deployment. Legacy uncertainty is neither settled nor recast as execution-provenance proof.

Future activation/rollback/ownerSource/capsule must independently qualify relevant writers, actual9aa capability, original bounds and recoverability inside this same winning invocation; upload receipt cannot resume permission. No real initial command until full composition, because it would spend permanent Entry on this partial unit. The original private issuer/runtime wiring, independent provider acceptance, shared Container and owner flow remain outside this deliverable.

Noise preserved: npm's deprecated esbuild-kit loaders/eslint9.39.4, setup-node punycode deprecation, Git default-branch/detached-HEAD notices, Actions' Node20-action runtime migration warning. Rejected-residency specimens are intentional denial tests; the uploader has no logging path for product exceptions, secrets or bodies. No dependency/lock/config maintenance or warning suppression performed.

### Readback and handoff

All refs updated using expectedSHA plus force:false, linear parents; pre-code approval docs and all intervening work preserved. Code-file exact blob readbacks at5705:

- test/fixtures/finite-initial-entry-world.mjs — b9cdadbe248b2045f171fb5fec5d5fd82e0fb649 exact
- test/mcp-qa-finite-initial-upload-native.test.mjs — 208a3cce2c17a0fba91728c410869e9440d16afc exact
- .github/workflows/finite-task1-temporary-qualifier.yml — 8ff67832cb19abba262482a910c36de06e15433e exact
- lib/mcp-qa-finite-initial-entry.mjs — a89fa70447caa6ba0ad018bce014e8c6e08aa0c4 exact
- lib/mcp-qa-finite-historical-source.mjs — 23cc64470a0f856a10817626988630bbed4079d7 exact
- lib/mcp-qa-finite-initial-upload-wire.mjs — 8e8bbb6b197e032879c34dd82c27aa2a4e89ba49 exact
- lib/mcp-qa-finite-initial-upload-records.mjs — 383665100e5f829edbaf13c0f137b37ae70a1954 exact
- test/fixtures/finite-initial-history-world.mjs — 74f9ca6470d596c0da1247bb9d9f464a80b9ec78 exact
- test/mcp-qa-finite-initial-upload-records.test.mjs — ea74b7a415d5bdab6a315ff37e34b2c49a947e49 exact
- test/mcp-qa-finite-initial-entry-native.test.mjs — 99f6d8080bdd718b52e4e9a04dd6bea14bf96e7f exact
- test/mcp-qa-finite-candidate-residency.test.mjs — 654109b27b9327f4c24bd84689aa386b1a600808 exact

Final documentation commit appends this report and the shared ledger only, parent5705/tree51d2. Its exact resulting docHEAD/tree/ref and13-file readback are returned in the final Root handoff (a commit cannot contain its own eventual hash). The source measurements remain qualified5705, not an assertion that later documentation-only commits were compiled.

STOP / release sole writer for FRESH independent spec + quality review. No reviewer or subagent spawned by this task. No main/provider/runtime/actual initial command/native Workflow CREATE/upload/deploy/activation/rollback/grant/token/role/Container/Max/mail/chat/automation action; no local source/clone/dependencies/build/temp/download/process.
operationalReadiness=false; completePackage=false; PCoff=false.

## Independent review fix round1/5 — shared historical byte qualification

Review scope starts at previous-reviewedHEAD39f0b726; Root dispatch BASE185f4dbb2c99f08165ebf80ca4ef44e888b5f684/tree50cb93f0136d7bef00d57c846c693430d3e6da88, ref read back exactly. Root retained all intervening review/ledger work. SpecPASS/QualityNeedsFixes,0Critical,1Important.

Accepted Important: verbatim configuration/module/base64/byte-hash/receipt/historical-linkage validation existed twice in mcp-qa-finite-historical-source.mjs (initial backup qualifier and historical version consumer). No present behavioral divergence was found. Selected correction: a single nonexported pure internal qualifier returns validated configuration, metadata proof and bytes; each existing caller retains its own backup projection or historical policy/history responsibilities. No new import/export/capability, runtime dispatch, provider operation or permission. The report's stale line3 status is corrected separately; baseline tool warnings remain deferred.

Behavioral regression is a native shared-input matrix, not source-text or function-call-count assertions: both public pure backup qualification and actual native historical reader receive the same metadata, verify exact bytes and source linkage, and reject module shape/encoding/hash, secret values, unknown config and physical namespace changes. A corrupted native legacy journal must reject the historical reader while the pure baseline qualifier still succeeds; this protects the intentionally different responsibilities. Loaded receipt-version and source-link mismatches must deny both.

Because this is behavior-preserving extraction, the new matrix first establishes baseline GREEN, then runs unchanged after extraction; no fabricated behavioral RED is claimed. Existing upload-native winner/backup/pre-send/wrong-module consumers also run. No compiler rebuild is planned because dependency graph/imports/exports and source constraints are unchanged; earlier5705 measurements remain earlier-source evidence only.
