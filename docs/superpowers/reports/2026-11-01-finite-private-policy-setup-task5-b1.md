# Task5-B1 — candidate provenance/residency compiler and private decoder

SOURCE ONLY. B1 implementation report, awaiting fresh Root spec/quality review. **Task5 is incomplete; completePackage=false; operationalReadiness=false.**

## Scope and ruling

Execution BASE `1057ce94a77df9edd8119f74c516d5512add3cf0`; product implementation `34a8a244be9009b7d982295850e7c4209f767a87`; qualified code/test HEAD **`e93037e9879b8feeb69d11b39ddea784936443af`**. Review range is **BASE1057..final docHEAD**, with B1 judged against the **Root Task5 subdivision and T5-B1 ruling** appendix in [spec](../specs/2026-11-01-finite-private-policy-setup.md) and [plan](../plans/2026-11-01-finite-private-policy-setup.md), not against completion of all Task5. Final docHEAD is the Git commit containing this report/ledger; its exact SHA is recorded in the final Root handoff after CAS/readback, avoiding a self-referential commit hash.

Pre-code [three-part preflight](2026-11-01-finite-private-policy-setup-task5-preflight.md) preserves signatures, native/GHA callers, actual locators/residency, missing original bootstrap, clock/abort limits, retained cleanup and all writer families. Ruling recorded in docs `dc1da49df410185fd4a220c1b7cc27bce347aeb2` before product; exact decoder envelope was recorded with RED `7283d136ce1aa96376182abe3ab5bd105a428495`.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated source branch `feat/finite-native-cleanup-20261101`; ORIGIN GitHub API + branch-only hosted Actions; RESOURCE_TYPE Git source/Actions; RESOURCE_ID branch above and explicitly named run/job IDs below; ALLOWED_ACTION scoped source/docs/tests/readback only; ROLLBACK source commits preserved through expected-head CAS, no runtime state changed. One product writer, no subagents/local source/clone/dependencies/build/downloads/provider read/deploy/DDL/credentials/OAuth/finite HEAD/main merge/email.

## Change

The actual compiler now builds nodeM, then actual canaryM, compresses those exact emitted bytes, then embeds that envelope ONLY in QA. Source verification still brackets compilation in the same physical checkout; exact expected exports, profiles, backend and Container configuration are unchanged. Both output hashes derive from final emitted bytes; no QA hash, package hash or historical code enters the canary/QA cycle.

The candidate envelope contains exact module3keys {name,sha256,bytes} and compiler-derived M/tree/sourceCheck/programM. It is not a manifest, seed, runtime identity, original Q, custody/permission proof or admission. Existing role manifest descriptors keep their separate exports/profile fields. No other unavailable fixed source seam was replaced.

The QA-only static import validates a present build envelope at module load. Missing envelope leaves the private reader unavailable, preserving ordinary/source-only tests; malformed present material denies startup. `readPrivateQaFiniteCandidate()` accepts zero arguments, returns frozen metadata plus a fresh private Uint8Array per call, and is not exported as a Worker/DO HTTP/RPC operation. The module checks exact own-data keys, compiled M/tree, independently hashed compiled Node program, canonical base64, compressed byte/hash limits, gunzip maxOutputLength2MiB, actual decoded byte count/SHA/UTF-8 and exact level9/mtime0 gzip roundtrip. Concatenated/trailing/alternate gzip is rejected. CLI staging evidence omits compressed content; the staging files remain source outputs, not an eligible package. Full `buildFiniteNativePackage` still throws.

Files: `scripts/build-finite-native-package.mjs`, new `lib/mcp-qa-finite-candidate-residency.mjs`, one QA finite-entry import, scoped tests and temporary qualifier. No profile, namespace, Container app, compatibility flag, dependency or lockfile change.

## Exact hosted evidence

All runs use Ubuntu24.04, Node22.23.4, existing lockfile via `npm ci --ignore-scripts --no-audit --no-fund`, no custom secrets/artifacts/deploy; contents:read only, checkout exact github.sha with persist-credentials:false. Temporary qualifier has branch+source-path filters excluding docs-only commits and must be **EXCLUDED from integration**.

| Stage | Commit / run / job / attempt | Actual output |
|---|---|---|
| Meaningful RED | 7283d136ce1aa96376182abe3ab5bd105a428495 / [41486970581](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41486970581) / 125419777631 / 1 | 9 tests,5 pass,4 fail,0 cancelled/skipped. #6 actual compiler missing residency and #8 absent envelope are behavioral RED. #7/#9 fail at missing-envelope build setup, not independent behavioral native RED. Scoped lint passed; later profile step skipped after failure. |
| First implementation | 34a8a244be9009b7d982295850e7c4209f767a87 / [41487492232](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41487492232) / 125421550406 / 1 | 28 tests,25 pass,3 fail,0 cancelled/skipped. Real compiler, actual decoder, all16 malformed cases and real workerd positive passed. Two native negatives correctly rejected startup; fixture disposal rethrew the same ERR_RUNTIME_FAILURE, counted as2 failures+parent. No product failure/cap change. |
| Fixture repair | 6e63a8fe475c6016f8df622876d9afd93d259e19 / [41487695469](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41487695469) / 125422248746 / 1 | 28+14 pass,0 fail/cancelled/skipped; scoped lint passed,artifacts0. Repair validates the exact decoder ERR_RUNTIME_FAILURE during disposal too. |
| Final qualified evidence | e93037e9879b8feeb69d11b39ddea784936443af / [41488089019](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41488089019) / 125423600551 / 1 | 28+14 pass,0 fail/cancelled/skipped; scoped lint passed,artifacts0. Test-only evidence improvement emits BOTH output hashes and independently verifies native maxOutputLength enforcement before decoder's later byte checks. |

Exact commands:
```text
node --test test/mcp-qa-finite-candidate-residency.test.mjs test/build-finite-native-package.test.mjs
# tests 28
# pass 28
# fail 0
# cancelled 0
# skipped 0
node --test test/mcp-qa-finite-profile-native.test.mjs test/mcp-qa-finite-profile.test.mjs
# tests 14
# pass 14
# fail 0
# cancelled 0
# skipped 0
npx eslint lib/mcp-qa-finite-candidate-residency.mjs scripts/build-finite-native-package.mjs worker/independent-closure/finite.mjs test/mcp-qa-finite-candidate-residency.test.mjs
# exit 0; no lint diagnostics
```

Logs are not pristine: the two negative workerd cases intentionally emit sanitized startup rejection messages (not incidents). Existing punycode/npm dependency notices, the Node20 deprecation notice for actionsv4 (runner forces action runtimeNode24), and the existing finite-profile CIMD warning are separate from the Node22 test runtime and the successful scoped lint. No unrelated action/dependency/flag upgrade or rerun was performed.

Final run/head/event/path/attempt were independently read back as completed/success, push, exact scoped workflow/head, attempt1; artifact listing total_count0.

## Measured compile at qualified codeHEAD

| Value | Evidence |
|---|---|
| sourceM | `e93037e9879b8feeb69d11b39ddea784936443af` |
| sourceTree | `1d151a2555510d3bbc905f997182de791dec5184` |
| programM SHA256 | `f6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6` |
| canaryM bytes | 1941257 |
| canaryM SHA256 | `e900a53ea779168ce1391a7bd09b66ac7ae023e40493b837555c750d4df57f6e` |
| QA bytes | 1760625 |
| QA SHA256 | `8440daba8d96075d7a4ced10c5df7618c8bdc68112d7fc6dbb8b58499f3e62d3` |
| gzip bytes | 380962 |
| gzip SHA256 | `cb7ee5d47384cba72b7d6d9e95aecf34cce8f72e12e4342808f6e26e3370f09c` |
| provenance | `git-inputs-before-after-v1`; outer staging additionally checks configuration before/after |

Candidate margin is **155,895 bytes** below2MiB; QA margin1,385,103 below3MiB. These are measurements of this source revision, not a guarantee after later mounts/C3. Future dependency changes require another measured compile; caps were not expanded. A later docs commit has a different Git revision/tree and is not falsely labelled as this built M.

Actual compiler tests independently rebuild nodeM, hash emitted canary/QA and decompressed resident bytes, prove decoder absent from canary graph/present in QA, preserve exact exports, and retain physical-checkout divergence/same-root alias tests. Same-root before/after source checks include lib/worker/scripts and dependency/config inputs. Complete-package and historical-input gates remain closed.

## Actual versus synthetic; selfreview

Actual: hosted compiler/source checks, actual emitted candidate/program, strict production decoder, workerd implementation under unchanged2026-09-07/nodejs_compat, native gzip roundtrip and bounded inflate support, unchanged finite native/closed entrypoint/profile regressions. Workerd positive fixture verifies a valid4096-byte compressed probe expands normally but is rejected with maxOutputLength16; this independently checks the platform bound instead of relying only on a later descriptor mismatch.

Synthetic boundaries: isolated metadata-only test HTTP fixture for invoking the real private reader; malformed envelopes intentionally injected as build literals; no real CF/GitHub runtime/custody/provider data. Test fixture alone exposes metadata, never raw candidate/context/policy. Native oversized/trailing payloads fail with the exact sanitized decoder message; runtime disposal failure is handled only for that expected code/message. No actual grant/source-context/owner forwarding/setup/settlement path is claimed.

Selfreview found and corrected test teardown rejection; then strengthened evidence with exact QA hash and direct bounded-inflate control. Verified no source seam registration/boolean authority, raw private input, historical code, package success, new route/export/profile/flag or Q relabelling. Candidate gzip embeds only the source-built canary. Decoder eager work is bounded and tested; this is source acceptance evidence, not a deployed cold-start/runtime benchmark. Canonical gzip compatibility is proven only for this tested Node/workerd/profile, and correctly fails closed on future incompatibility.

No whole-suite/image/Docker or reflex Wrangler run: unchanged profiles are checked by actual compiler/template comparison and targeted native profile tests. Root composes whole checks after remaining C2/C3 gates.

## CAS/readback, remaining gates and STOP

All five source/docs/test commits (dc1da49,7283d13,34a8a24,6e63a8f,e93037e) used expected-head CAS and independent branch-ref plus every changed-file exact content readback. Final report/ledger commit also requires CAS/ref/all-file readback before handoff; final diff must contain only the nine scoped files above plus this report. Temporary branch qualifier is not integration content.

STOP WRITES after final docs readback for fresh Root review. B1 is not independent acceptance and does not complete Task5. Original bootstrap/source qualification, retained setup/current primary, ALL-writer settlement, actual native material/mounts/confirmation/GHA adoption/external source, historical byte privacy/locator, C3 existing-grant/early withdrawal, custody and attended runtime gates remain separate. CompletePackage=false and operationalReadiness=false.

Next B2 investigation, NOT implemented: first examine exact approved closed-canary private metadata/bindings plus exact namedBundleHash-selected historical QA draft/D1 original before proposing another store/capsule. compiledQaArtifactContext/compiledQaHistoricalContext null globals do not prove availability. Newly authorized immutable save/withdraw/trial intentions may be generated before first choice only under separate concrete ruling and never disguised as historical Q/cancellations/legacy. No runtime read/init is authorized by this note.
