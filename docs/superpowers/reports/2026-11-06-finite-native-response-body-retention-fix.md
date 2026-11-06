# Final whole-branch fix wave — acquired native response body retention

Date: 2026-11-06 UTC. Status: DONE for Important I1 implementation and its bounded SOURCE/SYN qualification; Root's one scoped re-review remains the review gate. This report does not authorize merge or operation.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT=SOURCE/SYN GitHub+Actions; ORIGIN=GitHub connector; RESOURCE_TYPE=source branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=one bounded final-review fix wave. ROLLBACK=only this wave's own commits with exact ref/blob checks, preserving all earlier evidence and history. No runtime effects, main merge, credentials, permissions, subscriptions, cron, Containers or support mail.

## Frozen references and delivery

- FIX_BASE: `8b2380c9bcc9c383ec46590df1403eed19fd2659`, tree `07079c8cc3670a6a1db51ca1daadbf3172c2d445`.
- Requirements: `docs/superpowers/briefs/2026-11-06-finite-native-response-body-retention-fix.md` at Rootdocs `b2ee090b1d1a62059cb80b7601b140ca023cb08e`, blob `c8392e7647f65922c7758db97b6a0fa4ab49f1b8`.
- Complete review: `docs/superpowers/reviews/2026-11-06-finite-native-whole-branch.es.md` at Rootdocs `b5fca44808c5c9c345ea5693527280fda1bc9ddd`, blob `5b7628e7effe5efbd440a9196d5f00a1167e67cf`.
- RED checked-out Source: `85eee832e779df310f14423ceec637ef459b0dd2`, tree `75970081839ab9b494b49496928a45b6a563ed84`. Original three product blobs remained unchanged.
- GREEN checked-out Source: `17c6f08f9e0b76a6ac239be05f5d887e37c49d8c`, tree `f25b309243efb17224e74ff342b39e959b7c55b5`.
- Post-qualification cleanup HEAD (parent of this report's sole final commit): `2d15512dbce193f71ddaddad3cb24268b1b2ba77`, tree `907c6d9f20029359c942683c01cd1846ffd949da`. The temporary qualifier is absent.
- Final delivered HEAD/tree are the commit/tree containing this report; their exact hashes are recorded in the final handoff after independent readback. A report cannot embed its own commit hash. No subsequent Source writes are planned.
- Main independently re-read unchanged: `0c9c475b3ebaa970fc11d628b40e50a90cceb727`.

Every Source write used the explicit existing branch and raw UTF-8 Contents API with the current file blob SHA. After every write: sole parent equals previous HEAD, exactly one changed path, independent exact content/blob readback, and branch ref equals new HEAD. Removal verified the entire untruncated tree and absence of the path. No unknown write, retry, force or alternate branch occurred. No Source writes occurred while either qualifier job was running.

## Cause and minimal correction

All three native initial readers acquired a Response, then checked the original lease/status/headers before assigning a reader. Their finally blocks only retained reader.cancel(), so a pre-reader rejection or late acquired response lost its body cancellation ownership.

Each reader now holds the acquired response outside try and, if no reader exists and its acquired body is unlocked, passes the ACTUAL response.body.cancel() Promise to the existing stage-work retainer. Existing reader.cancel() tracking remains unchanged. The fallback does not call the expired business guard. Cancellation may start and settle after logical failure/abort; it grants no further business IO. The retainer tracks actual cancellation separately, so logical failure remains prompt and another root cannot enter the native ctx until pending physical work settles.

Product diff: exactly three replaced lines in each of the three allowed modules; no other production path. No export, authority callback/factory, API, identity or stage-work change. The immutable script-SHA optimization, byte equality, schemas, profiles, entrypoints, native holders and success semantics remain intact.

## Scope, exact blobs and protected comparison

The additional test-only path `test/fixtures/finite-native-body-retention.mjs` avoids three copies of the same native cancel/root-exclusion orchestration. Root accepted this narrow fixture before writes. Three existing native harnesses import its generated DO methods and use their existing workerd/D1/DO setup. Build capture only records the exact test bundle/metafile when AFW_RETENTION_EVIDENCE is set. One small historical positive baseline was added; existing bootstrap and T2 material positives are reused.

| Path | Before blob | After blob |
| --- | --- | --- |
| `lib/mcp-qa-finite-bootstrap-native.mjs` | `ac0d14ebb5a986e2611e9ddbd72592541c9a4c28` | `003b8cda2b723d3422f8f696302acc8f550b3477` |
| `lib/mcp-qa-finite-historical-source.mjs` | `3f0bf487efd72aa2356fd9982f98a938d328e72d` | `855af60b2880d566f665a405cb3ab4fe8b9d369e` |
| `lib/mcp-qa-finite-initial-material.mjs` | `c0ee5315563764979ed2c681c71b2dbc5515203d` | `8e2d3e4a75baabf1be5d12b6e2868ffc16599f78` |
| `test/fixtures/finite-native-body-retention.mjs` | absent | `227b0009b5c48f205967621c924e4e3ffb72f105` |
| `test/mcp-qa-finite-bootstrap-native.test.mjs` | `1b871f097eb8c1dc67f4cb8ff174b6970c2cf4e4` | `a92908b08417609ac5254645f131905368b4c141` |
| `test/mcp-qa-finite-historical-source-native.test.mjs` | `a4464db2b94ad1b7825f032d3d54a8b990e881b8` | `e3080f8cb55ae618c8c10d74446b3a5db4205045` |
| `test/mcp-qa-finite-initial-material-native.test.mjs` | `7f98bfe8cfe169ef1261f6c15ce9d08df9214d22` | `0482e11bfc875cc249d613e8c888a7fc6d55349b` |

Complete recursive tree comparison at cleanup used every non-tree entry, SHA and mode, not a truncated compare: 3166 BASE entries, 3167 cleanup entries, 3160 unchanged, exactly the seven paths above changed/added. This report is the only subsequent addition. The protected set is the full BASE manifest minus the six existing modified paths; its complete path/blob mapping is reproducible at FIX_BASE and preserved in the qualification complete-tree manifests. No prior documentation/history was rewritten.

Selected protected before=after blobs:

- `lib/mcp-qa-finite-stage-work.mjs`: `a89baeb2578856dadedf700f9d66e180eb09120e`.
- `lib/mcp-qa-finite-fixed-policy-engine.mjs`: `e131f5b22f8f0e54fb61e2f2a131c64798b1d4eb`.
- `lib/mcp-qa-finite-candidate-residency.mjs`: `29373312a0e60ed6ca87ca3952dba751186662a8`.
- `lib/mcp-qa-finite-profile.mjs`: `547eb82f4ec83a2e7bcec88dd18622fc636dc477`.
- `package.json`: `f4fd38ac380c46a149d8cf0f3bd828a28406f761`.
- `package-lock.json`: `36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b`.

Enrollment, P8/P9/P10, SDK, all other tests, schemas/stores/journals/records/profiles/build scripts/entrypoints/migrations are within the unchanged set.

## Native causal qualification

Both runs froze exactly three positive top-level tests and six negative/regression top-level tests, zero nested subtests. The runner verifies exact names/counts/exits, no skips/cancellations and, in RED, six cancellation-entry failure causes. A green expected-failure job is not a product GREEN result.

Positive names:
- actual workerd DO reader returns bounded bridge facts with direct/source authority false
- B2 body retention positive baseline
- T2 material native ownership keeps frozen script and mutable bytes fenced

Regression names:
- I1 acquired bootstrap body retention invalid-status
- I1 acquired bootstrap body retention late-response
- I1 acquired historical-source body retention invalid-status
- I1 acquired historical-source body retention late-response
- I1 acquired initial-material body retention invalid-status
- I1 acquired initial-material body retention late-response

Commands (Node v22.23.4, npm 10.9.9):

```sh
npm ci --ignore-scripts --no-audit --no-fund
/opt/hostedtoolcache/node/22.23.4/x64/bin/node --test --test-concurrency=1 --test-reporter=tap '--test-name-pattern=^(actual workerd DO reader returns bounded bridge facts with direct/source authority false|B2 body retention positive baseline|T2 material native ownership keeps frozen script and mutable bytes fenced)$' test/mcp-qa-finite-bootstrap-native.test.mjs test/mcp-qa-finite-historical-source-native.test.mjs test/mcp-qa-finite-initial-material-native.test.mjs
/opt/hostedtoolcache/node/22.23.4/x64/bin/node --test --test-concurrency=1 --test-reporter=tap '--test-name-pattern=^(I1 acquired bootstrap body retention invalid-status|I1 acquired bootstrap body retention late-response|I1 acquired historical-source body retention invalid-status|I1 acquired historical-source body retention late-response|I1 acquired initial-material body retention invalid-status|I1 acquired initial-material body retention late-response)$' test/mcp-qa-finite-bootstrap-native.test.mjs test/mcp-qa-finite-historical-source-native.test.mjs test/mcp-qa-finite-initial-material-native.test.mjs
npx eslint lib/mcp-qa-finite-bootstrap-native.mjs lib/mcp-qa-finite-historical-source.mjs lib/mcp-qa-finite-initial-material.mjs test/mcp-qa-finite-bootstrap-native.test.mjs test/mcp-qa-finite-historical-source-native.test.mjs test/mcp-qa-finite-initial-material-native.test.mjs test/fixtures/finite-native-body-retention.mjs
```

The two Node commands are identical in RED/GREEN. Lint runs only in GREEN and exited 0 with empty diagnostic output. No package-wide/full-suite/167-case rerun was performed.

| Run / group | Actual top-level tests | Pass | Fail | Exit | Actual UTC interval |
| --- | ---: | ---: | ---: | ---: | --- |
| RED positive | 3 | 3 | 0 | 0 | 2026-11-06T17:48:51.973Z → 2026-11-06T17:48:56.699Z |
| RED regression | 6 | 0 | 6 | 1 | 2026-11-06T17:48:56.699Z → 2026-11-06T17:49:15.705Z |
| GREEN positive | 3 | 3 | 0 | 0 | 2026-11-06T17:51:29.955Z → 2026-11-06T17:51:33.446Z |
| GREEN regression | 6 | 6 | 0 | 0 | 2026-11-06T17:51:33.446Z → 2026-11-06T17:51:39.541Z |

All four test command executions: suites0, nested subtests0, cancelled0, skipped0, todo0. TAP duration_ms: RED positive4687.763688; RED regression18961.192426; GREEN positive3466.280599; GREEN regression6067.714531. Nine behaviors per revision, not eighteen unique behaviors or six plus a fictitious parent. No zero-match/pseudo-file PASS.

Each negative starts from a fresh native ctx. Valid original Root and production adapter validation reach the first fetch. No consumed positive lineage, forged source authority, signature/expiry rejection or seeded phase ACK serves as the positive premise. The material path uses its actual available/candidate path and its own production observation scope. Bootstrap/historical are wrapped in the same internal stage-work ownership semantics as their production composition. The probe is a different, currently LIVE native Root in the SAME ctx, with a new observation admission; it tests lifetime bookkeeping, never grants publication authority.

A native workerd Response wraps a native ReadableStream. The stream's actual cancellation returns a held Promise. The test observes the actual body.cancel() return Promise and returns that exact Promise to production, without resolved substitutes. The late-response variant aborts/finishes the original Root while native acquisition is held, observes prompt logical denial before acquisition, then releases the response. Cleanup releases acquisition/cancel in finally and disposes Miniflare even if assertions fail. No real network/Cloudflare account request occurs; fetch timing and provider DATA are explicitly SYN.

RED actual failure outputs, in the six frozen regression-name order:

```text
  error: 'required acquired-body cancellation entry: {"mode":"invalid-status","fetchEntered":1,"acquired":1,"readerCalls":0,"cancelEntered":0,"cancelSettled":false,"logicalDenied":true,"rootAborted":true,"validAtFetch":true,"nativeResponse":true,"nativeStream":true,"error":"Finite QA bootstrap native evidence unavailable"}'
  error: 'required acquired-body cancellation entry: {"mode":"late-response","fetchEntered":1,"acquired":1,"readerCalls":0,"cancelEntered":0,"cancelSettled":false,"logicalDenied":true,"rootAborted":true,"validAtFetch":true,"nativeResponse":true,"nativeStream":true,"error":"Finite QA bootstrap native evidence unavailable"}'
  error: 'required acquired-body cancellation entry: {"mode":"invalid-status","fetchEntered":1,"acquired":1,"readerCalls":0,"cancelEntered":0,"cancelSettled":false,"logicalDenied":true,"rootAborted":true,"validAtFetch":true,"nativeResponse":true,"nativeStream":true,"error":"Finite historical source unavailable:http"}'
  error: 'required acquired-body cancellation entry: {"mode":"late-response","fetchEntered":1,"acquired":1,"readerCalls":0,"cancelEntered":0,"cancelSettled":false,"logicalDenied":true,"rootAborted":true,"validAtFetch":true,"nativeResponse":true,"nativeStream":true,"error":"Finite historical source unavailable:deadline"}'
  error: 'required acquired-body cancellation entry: {"mode":"invalid-status","fetchEntered":1,"acquired":1,"readerCalls":0,"cancelEntered":0,"cancelSettled":false,"logicalDenied":true,"rootAborted":true,"validAtFetch":true,"nativeResponse":true,"nativeStream":true}'
  error: 'required acquired-body cancellation entry: {"mode":"late-response","fetchEntered":1,"acquired":1,"readerCalls":0,"cancelEntered":0,"cancelSettled":false,"logicalDenied":true,"rootAborted":true,"validAtFetch":true,"nativeResponse":true,"nativeStream":true}'
```

Thus every original-code failure occurred after valid native entry and actual response acquisition, with readerCalls0 and cancelEntered0. The three positive baselines had passed first. These are causal I1 failures, not harness/import/setup failures.

GREEN actual observations, in the same six-name order:

```text
# I1_NATIVE {"mode":"invalid-status","acquired":1,"readerCalls":0,"cancelEntered":1,"logicalDenied":true,"pendingExcluded":true,"settled":true,"released":true,"fetches":1,"storageUnchanged":true}
# I1_NATIVE {"mode":"late-response","acquired":1,"readerCalls":0,"cancelEntered":1,"logicalDenied":true,"pendingExcluded":true,"settled":true,"released":true,"fetches":1,"storageUnchanged":true}
# I1_NATIVE {"mode":"invalid-status","acquired":1,"readerCalls":0,"cancelEntered":1,"logicalDenied":true,"pendingExcluded":true,"settled":true,"released":true,"fetches":1,"storageUnchanged":true}
# I1_NATIVE {"mode":"late-response","acquired":1,"readerCalls":0,"cancelEntered":1,"logicalDenied":true,"pendingExcluded":true,"settled":true,"released":true,"fetches":1,"storageUnchanged":true}
# I1_NATIVE {"mode":"invalid-status","acquired":1,"readerCalls":0,"cancelEntered":1,"logicalDenied":true,"pendingExcluded":true,"settled":true,"released":true,"fetches":1,"storageUnchanged":true}
# I1_NATIVE {"mode":"late-response","acquired":1,"readerCalls":0,"cancelEntered":1,"logicalDenied":true,"pendingExcluded":true,"settled":true,"released":true,"fetches":1,"storageUnchanged":true}
```

Each assertion sequence confirms logical denial, cancel entry, the actual cancel Promise still pending, rejection of another LIVE root specifically with `Finite stage work remains outstanding`, unchanged native storage, exactly one fetch/no subsequent business IO, actual cancellation settlement, then admission of a fresh root. The acquired-body cancel survives original Root abort. Disposal is not used as proof of physical settlement.

## Clocks, graphs and source identity limits

Production Root<=30000ms and child<=5000ms remain unchanged and clipped by original parent guards. Tests use createFiniteOwnerRequestLease and its actual native Root; late acquisition is induced by original Root finish/abort, not by renewing its clock. Cancellation polling cap2000ms; each Node command300000ms maximum; lint120000ms; job15min maximum. Actual groups completed within the intervals above.

The pre-existing native harnesses replace only their test-bundle approval datum with an explicit SYN future ceiling; production source3Nov02:59UTC remains operationally expired. Source/Access/I0/C0/C1 receive no renewal. C0=I0+900000 and C1=C0+180000 remain unchanged. No Identity/Access/live custody validity is asserted.

The test bundles compile the fixed current Source, not an older M/QA bundle. Full scripts and esbuild metafiles for all nine builds per revision are in the artifacts. Input graph sizes remain192/206/216 for bootstrap/historical/material respectively. Hashes below are SYN test bundle hashes, which also incorporate per-fixture clock/DATA; they are not a deterministic product-only M hash or deployed QA provenance.

| Test | Inputs | RED bundle SHA256 | GREEN bundle SHA256 |
| --- | ---: | --- | --- |
| actual workerd DO reader returns bounded bridge facts with direct/source authority false | 192 | `31244ab6fbc862b31130d28a1f2bf4db274b671778df4864d60debd8c22d9083` | `e8ccadd43227b346ae06374f5da95b824ddac09b2f21a9704decac993ccbf540` |
| B2 body retention positive baseline | 206 | `e8c68a129ae6ac3ea94139f8b4ae1d76278d854d49dfd2933a36d11e4cb349cf` | `21657b1c4fd05bdb6d11bce22576d5ae957da27a36c1ae81337baa4f0547be67` |
| T2 material native ownership keeps frozen script and mutable bytes fenced | 216 | `6fa56646a3c293695f5910ac080698153cc8eee7c653690bfacade5efb6040a0` | `ccbc56b8222905745781d5e0522dde36340397c45ce91624d49bd748f29681ac` |
| I1 acquired bootstrap body retention invalid-status | 192 | `766e5cb42347516b0114c0075c51a0782710428e9e532d1ed5ea2c3ba6a1ee22` | `d6a6190c9bcfe12eee073d720c8183abde668c0ce3bf03adb7fbb89a5533d78f` |
| I1 acquired bootstrap body retention late-response | 192 | `ab99457be6b21f910955cf6481e15cc4b82a46cae5839c64841691346c8c9a77` | `b5809923f2d06e2a28475d1b3504bf1cd1b22fb1f80448b718f1deea784a15a4` |
| I1 acquired historical-source body retention invalid-status | 206 | `7db8d83eaa417db049aec1aa547bd396025cc88e22259e712b019970886675e9` | `bd1c3b3acefcc52ca82a005a87a92c0d951b7bee4789d98db41835d996b2aae3` |
| I1 acquired historical-source body retention late-response | 206 | `16155912c371c5e23f6e09e975e1503f0d50a033b8381bee6a671f588d29bcac` | `6eafb0fcc47e2a837c0e6e18f442cd79401277502ec1ced44dc29b89855f56de` |
| I1 acquired initial-material body retention invalid-status | 216 | `1f6727a425f25485b247e8cbb2da735752d76eecdd76840771308875234332c0` | `7289f23d40d06fb8cca2e6a8da720e9124700275e141eaae95f91ffdd4186d7e` |
| I1 acquired initial-material body retention late-response | 216 | `18457e67c5788232b84510030ee2aee5148edce6b1c086211383c33a43347c7e` | `4fb1e5dbc602b35dfd3cbb2f4a132fd13d51329acb3435d51be586538cf29c7b` |

The three edited readers necessarily change any generated M/QA artifact that includes their bytes. No full M/QA distribution build or unrelated chronology assertion was run/modified; no claim that old literal c493 remains current. The bounded native graph evidence is the only new build qualification. Prior 167-positive evidence remains at its original D11 revision. Any later full candidate package must derive its own current graph/hash, never reuse the pre-fix bundle.

## Workflow and artifacts

Temporary path: `.github/workflows/afw-native-body-retention-qualification.yml`; push restricted to this existing Source branch and this workflow path; contents:read; persist-credentials:false; no project secrets; Node22; one bounded job per phase. No redistribution or rerun.

- RED [run42264969077](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42264969077), job128054380876, trigger `f64d5d6467c9b43248f15055b6f2c30eb16b4f35`, workflow blob `b2305c4892f36bf8d7c74e563e8ee7fa970ac7ad`; checkout `85eee832e779df310f14423ceec637ef459b0dd2`. Job success means the six intended RED failures were verified.
- GREEN [run42265404365](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42265404365), job128055890788, trigger `14a4a2557a3086a9ff7ebdbc43221d14b6d93daa`, workflow blob `07815676ac766e38183de0ad93ee614d24c436e7`; checkout `17c6f08f9e0b76a6ac239be05f5d887e37c49d8c`. Job success verifies3positive+6regression PASS and lint0.
- RED [artifact13526886640](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42264969077/artifacts/13526886640):728959bytes; `sha256:e2f92d6fdaa95e41e7fccabe3948c6c7cc05ef269086afa71fa6e25d7b67a05b`; expires2026-11-13T17:49:15Z.
- GREEN [artifact13525818787](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42265404365/artifacts/13525818787):729180bytes; `sha256:f5846d843cd1dbfb4e06e00393bd46d931f8a261aa9f7782eb3e467b465fc970`; expires2026-11-13T17:51:41Z.
- Artifact contents include exact source revision/tree, complete Git tree manifest, affected/protected source copies, package locks, full test bundles/metafiles, executable qualifier, frozen spec, TAP, results, timestamps and SHA256SUMS. Digests/expiration were independently read from GitHub metadata. Artifacts were not downloaded or extracted locally.
- Qualifier removal `2d15512dbce193f71ddaddad3cb24268b1b2ba77` independently verified sole parent `14a4a2557a3086a9ff7ebdbc43221d14b6d93daa`, sole removed path/blob and absence from its complete tree. Product/test blobs remain exactly GREEN-qualified.

## Warnings, concerns and handoff

Observed non-fatal dependency/runner warnings: @esbuild-kit/esm-loader2.6.5 and core-utils3.3.2 deprecated; eslint9.39.4 unsupported warning; Actions punycode DEP0040 and url.parse DEP0169; v4 Actions target Node20 and runner forces Node24. Project tests used Node22.23.4. No dependency upgrade or warning suppression was attempted.

One read-only request for job logs while RED was still active returned404 BlobNotFound; no mutation/retry was inferred. Terminal logs and metadata were subsequently available and inspected. No qualification/setup failure or second RED/GREEN job occurred.

The three Minor findings M-I/M-II/M-III and historical M1/M2 unknowns remain deferred exactly as ruled by Root. M4 remains closed by the prior review. I1 implementation has causal RED/GREEN evidence; this report does not pre-approve Root's scoped re-review. No extra helpers/reviewers were spawned and no incidental Minor was fixed. Root owns the complete FIX_BASE→finalHEAD package and ONE scoped re-review.

Ruling applied: Root's existing final-review authorization permits the smallest three-reader correction despite prior Task3 isolation; shared test-only fixture accepted to avoid duplicated native orchestration. Cost if that scope judgment were wrong: a broader authority/clock/success change could escape the focused case; exact three-line product deltas, complete protected-tree comparison, unaffected positives and Root's scoped re-review constrain that risk. No new operational authority was inferred.

All project read/edit/build/test work stayed in GitHub connector/Actions. Only small local skill metadata was read; no local checkout, dependency install, build, test, container or artifact download.

operationalReadiness=false; completePackage=false; PCoff=false. This is closed SOURCE/SYN evidence, not live API, deployment, subscription, useful delivery, autonomous restoration or PC-off proof. Source writes STOP after the final report readback and handoff.
