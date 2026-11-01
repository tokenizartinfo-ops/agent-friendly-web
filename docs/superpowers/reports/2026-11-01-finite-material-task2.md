# Task4B Task2 — fixed finite package resolver and bounded archive
2026-11-01 · SOURCE ONLY · operationalReadiness=false

## Result and scope
Implemented the real fixed GitHub resolver in `lib/mcp-qa-finite-package.mjs`, the actual Python standard-library ZIP subprocess in `scripts/verify-qa-finite-archive.py`, and the concrete `seed-material` entry in `lib/mcp-qa-finite-source.mjs`. The result is immutable `{build,manifest}`, not a runtime plan or authority. All other full material phases remain unavailable.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (ID1347578006); ENVIRONMENT=isolated source branch/GitHub Actions; ORIGIN=https://github.com/tokenizartinfo-ops/agent-friendly-web; RESOURCE_TYPE=Git branch, source blobs and temporary Actions qualifier; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=bounded Task2 source/tests/docs commits and branch-push no-secret qualification; ROLLBACK=preserved BASE and append-only commits, no destructive reset, no runtime mutation.

BASE: `1d49771a3bfb06433cb006db8d2d6c97c2673822`.
RED commit: `a167611cc63f787a7de87c2aaff58242e32c2886`.
Final qualified code HEAD: `a391a530bf8b4490b767764c1d33946fccc9807c`.
Initial pre-correction code HEAD: `44221801cfcc9a23a09ccde1291e0553c9bcf655`; this earlier GREEN used the superseded all-index ROOT grammar.
Final qualified source tree: `08b18ef1dd6676774d2a0d1f0b2e708da5d7a497`.
Root-correction RED: `f3ae28cee4eefdc64c945f7c48fcb009686e3375`.
Documentation HEAD is recorded by the follow-up receipt below; its parent is the exact qualified code HEAD. Every branch update used the exact previous SHA lease with force=false; independent Git ref readback matched.

## Concrete behavior
- Fixed repository/workflow/artifact selector; exact lowerhex40 source; reuse of existing bounded opaque GitHub bearer transport (1..8192 printable ASCII bytes), without provider-prefix interpretation. No caller URL/repository/workflow, dispatch, rebuild, latest selection or fallback.
- Fixed workflow run GET query head_sha=M/main/push/success, maximum two100-run pages, consistent totals, exact page sizes/validated same-query pagination and unique run IDs. Exactly one run qualifies repository/head repository, actual source, path, workflow ID, completed success and attempt1.
- Read the primary Git commit/tree and committed workflow blob at M. Verify file path/type/size/base64/Git blob SHA, hash the exact bytes and parse the fixed push/main trigger with existing YAML dependency. No dependency was added.
- One complete <=100-artifact listing with unique IDs; exactly one exact-name artifact, unexpired future expiry, exact originating run/repository/head/branch, <=64MiB and available sha256 provider digest.
- Download only the selected fixed GitHub artifact API endpoint. Accept one302 from that endpoint to HTTPS `productionresultssa[0-9]+.blob.core.windows.net/actions-results/...` with bounded validated path and signed query; no credentials/userinfo/nondefault port/fragment, encoded path separator/traversal, foreign host or second redirect. Never forward Authorization cross-origin. The Location is derived from the primary response, never a caller URL; unknown provider formats fail closed.
- Each network/subprocess step has a native5s ceiling inside a30s total native/injected-clock budget; every awaited read counts, backwards/unknown time and parent abort fail closed. Response bodies, JSON, workflow bytes and subprocess output/stderr are bounded. Rate limit/HTTP failure/overflow/unknown results are unavailable. Errors omit tokens, signed URLs, provider bodies and parser diagnostics.
- Hardfixed archive names are manifest.json, qaLive/index.mjs, qaClosed/closed-rollback.mjs, canaryLive/index.mjs, canaryClosed/index.mjs and operatorClosed/index.mjs. Actual Python ZIP parsing reads stdin without extraction/import/execution. EXACT six regular files, fixed names; rejects traversal, absolute/backslash/NUL names, duplicate/extra/directory/symlink/FIFO entries, encryption, unsupported compression, multi-disk/ZIP64/comments/prefix/trailing undeclared bytes and inconsistent local/central records. Limits: archive64MiB, expanded128MiB,64entries with tighter exact-six, manifest24576 and each module3145728 bounds. Independent bounded deflate expansion counting prevents ZipExtFile's declared-size clipping from hiding extra expanded bytes; zipfile streaming also verifies CRC and actual sizes.
- Parser returns only parsed manifest/canonical text and fixed file sizes/digests. Node applies the Task1 codec with the narrowly amended fixed QA closed basename `validateFinitePackageManifest`, `encodeFinitePackageManifest`, `hashFinitePackageManifest`; no copied manifest canonicalization or codec replacement. Duplicate/noncanonical JSON, unknown/private schema fields, mismatched provider/module/manifest/workflow/tree hashes and sizes fail closed.
- Every role descriptor's Git commit/tree is independently read (deduplicated by exact commit), and its ZIP bytes are matched. Historical operatorClosed cannot be relabeled M. Actual exports/profile/configuration/binding semantics are not inferred from structural assertions.

## Hosted evidence
Existing temporary file `.github/workflows/finite-task1-temporary-qualifier.yml` was narrowed to Task2 commands. Its actual trigger is push ONLY on the isolated branch, permissions contents:read, Ubuntu24.04, Node22,8-minute job bound, checkout exact github.sha with persist-credentials:false, no project secrets or artifact upload. It remains TEMPORARY and EXCLUDED FROM INTEGRATION. Full CI still triggers PR or main push only; neither was invoked.

| Stage | Exact source | Run / job | Evidence |
| --- | --- | --- | --- |
| RED | a167611cc63f787a7de87c2aaff58242e32c2886 | [41338258762](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41338258762) / [124942585176](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41338258762/job/124942585176) | Node103FAIL0PASS0SKIP; Python23FAIL. Expected missing concrete resolver assertion / missing actual parser. Scoped lint also rejected missing implementation. |
| Initial GREEN (superseded grammar) | 44221801cfcc9a23a09ccde1291e0553c9bcf655 | [41338469061](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41338469061) / [124943205564](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41338469061/job/124943205564) | Node103PASS0FAIL0CANCEL0SKIP (14150.033ms); Python23PASS0FAIL (0.827s); scoped ESLint clean; Python compile passed. Job/run SUCCESS, attempt1, push, exact branch/head verified; completed18:48:52Z. |

| Correction RED | f3ae28cee4eefdc64c945f7c48fcb009686e3375 | [41338886494](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41338886494) / [124944451818](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41338886494/job/124944451818) | Resolver105 tests:100PASS5FAIL; codec77:73PASS4FAIL; Python24:21PASS3FAIL;0SKIP. Expected valid closed-rollback name rejection, old-name archive acceptance and escaped-signature query rejection. Lint/compile passed. |
| FINAL GREEN | a391a530bf8b4490b767764c1d33946fccc9807c | [41339000993](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41339000993) / [124944799259](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41339000993/job/124944799259) | Resolver105PASS0FAIL0SKIP (15595.470806ms), amended codec77PASS0FAIL0SKIP (178.05259ms), Python24PASS0FAIL (1.044s): TOTAL206PASS0FAIL0SKIP. Scoped lint clean and Python compile passed. Exact source/branch/push/attempt1 verified; run SUCCESS at18:55:19Z. |

Final exact hosted commands:
```text
npm ci --ignore-scripts --no-audit --no-fund
node --test test/mcp-qa-finite-package.test.mjs
node --test test/mcp-qa-finite-seed.test.mjs
python -m unittest discover -s test -p 'finite_archive_test.py'
npx eslint lib/mcp-qa-finite-seed.mjs test/mcp-qa-finite-seed.test.mjs lib/mcp-qa-finite-package.mjs lib/mcp-qa-finite-source.mjs test/mcp-qa-finite-package.test.mjs
python -m py_compile scripts/verify-qa-finite-archive.py test/finite_archive_test.py
```

The105 resolver Node cases include real subprocess success, immutable output/nonexecution, actual source entry/missing workflow, run/source/path/main/event/attempt/repository rejects, zero/two runs, overflow/incomplete/duplicate/changed two-page results, exact complete two-page success, artifact expiry/duplicates/digest/source/size failures, altered manifest/module/private fields/historical relabeling, adversarial actual ZIP cases, malformed workflow source/blob, rate-limit/HTTP errors, redirect/credential containment, native fetch/body timeouts, parent abort including archive phase, and original elapsed-clock fencing. Python24 cases independently run the real script for valid archive/hash/nonexecution, exact manifest byte boundary, archive overflow and21 malformed archive forms, including a falsely renamed QA closed module. Network responses alone are synthetic; ZIP bytes and Python process are real. No injected success parser/resolver or module execution exists.

Runner/action deprecation notices (Node20 actions forced to24, punycode/url.parse) appeared in setup/cleanup; no scoped lint warning/error and no test skip. No full suite, build, accepted4A rerun or production qualification was claimed.

## Rulings and limitations
1. Root ruling: Task2 establishes factual package/workflow/commit/tree/archive consistency only. operatorClosed.sourceRevision must differ from M for this fixed trial. The approved frozen operator/canary/QA provenance receipt and actual builder/export/profile/configuration/binding authorization remain explicit4C gates BEFORE live package use. No guessed historical hash/path or unavailable future receipt was introduced. Cost if wrong: provenance consistency alone would be mistaken for role authorization; that promotion is explicitly prohibited.
2. Existing Task1 encode/hash helpers are reused; only their shared role-specific basename predicate and the associated pure fixtures/tests were amended by the explicit root source correction below. Skill workspace/full-suite defaults yield to the explicit cloud-only, single-task, scoped-test brief; no local source checkout/files/dependencies/build and no accepted4A repetition. Existing finite ledger is the durable checkpoint.
3. Redirect allowlist and normal ZIP subset are deliberately narrow. Changed legitimate provider host/layout/ZIP format fails closed and needs separate source qualification; this synthetic qualification does not assert current live finite artifact availability.
4. Missing finite package workflow/artifact correctly returns unavailable. No finite package workflow or live finite artifact was created. Test ZIP modules deliberately throw if executed, and remain inert memory inputs in hosted tests; no fixture artifact is published as a live package.

No Task3 seed issuance/adoption,4C package production/full material factory/native route or Task5 launcher was implemented. Original clocks/windows/fences and accepted Task1 identity behavior remain unchanged; the pure manifest basename grammar was amended by the root correction below. No Cloudflare/private/provider probe, live command, deploy, credential/role/OAuth/DDL change, real occurrence, main merge, Max action, PC-off or operational-readiness claim. Source-only qualification is complete; root's fresh review follows after documentation/CAS readback. No self-review agent was spawned.

## Accepted ROOT contract correction and focused fix
During this task, root's independent source inspection identified the existing approved closed QA main-module pin in `lib/mcp-qa-cloud-closed-pins.mjs`: `QA_CLOUD_CLOSED_PINS.qaClosed.module.name=closed-rollback.mjs`,395915bytes, SHA256 `4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f`, dated version `c570b60b-95dc-48e1-89f3-9c4651691dbc`. These committed source fields were read; no Cloudflare read or current-runtime inference was made.

Root explicitly corrected the contract: qaClosed retains `closed-rollback.mjs` and `qaClosed/closed-rollback.mjs`; other four role names remain `index.mjs`. Exactly six files, all caps and no arbitrary paths remain. Task1 originally complied with the old all-index grammar; this is a later ROOT correction, not a claim of an original Task1 implementation bug. The shared codec's one fixed-name predicate, pure fixtures/tests, real parser/layout, resolver comparison and brief/spec/plan grammar were amended together. No artifact or deployed module was renamed. Format compliance does not prove compatibility or approved frozen source provenance; those remain4C.

A concrete resolver defect found before closure was also reproduced: URL path escape rejection scanned the signature query and rejected legitimate escaped slash/plus/equal bytes. Validation now constrains the ORIGINAL raw path and compares it with the parsed path, while allowing escaped signature query values; host/source/HTTPS/one-redirect/no-cross-origin-Authorization limits remain. Its new positive regression failed in correction RED and passed in final GREEN.

The amendment RED showed the expected valid-new-name failures, while Python's old-name negative failed because the old parser accepted the mislabel. This is followed by the complete206-test final GREEN, including all77 pure codec cases. All earlier evidence above is retained as dated history and is not represented as the final grammar's qualification.

## Documentation checkpoint receipt
The follow-up documentation-only receipt records this report/brief/ledger checkpoint SHA and returns the final branch HEAD to root. Tests above qualify the exact code HEAD; documentation-only commits do not change that code or its evidence.
