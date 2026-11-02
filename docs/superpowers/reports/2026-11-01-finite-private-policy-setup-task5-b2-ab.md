# Task5-B2 A+B — fixed private historical source and D1 facts

SOURCE ONLY. This report covers the single Root-approved B2 A+B factual producer, not all B2/Task5. Awaiting fresh Root spec/quality review. completePackage=false; operationalReadiness=false.

Execution BASE `70408e380551ac7dc70d3e88ec9f5b75172fbe75`. Product code commit `22963e217760c4aa70daf38d76802d72fad38438`; final qualified code/test HEAD **5b087d0a3090935327b7aee37bcad175bbac4be4**. Final docHEAD is the commit containing this report/ledger; its exact SHA is supplied in the Root handoff after CAS/ref/all-file readback, avoiding self-reference. Review scope BASE70408..docHEAD against the B2 A+B appendix in [spec](../specs/2026-11-01-finite-private-policy-setup.md)/[plan](../plans/2026-11-01-finite-private-policy-setup.md). [Exact preflight and consolidated contract](2026-11-01-finite-private-policy-setup-task5-b2-preflight.md) preserve tables, missing producers, Root combination and six final rulings.

Pre-product docs: `dd4773a38a54a4f7611b1829b7cd79f7d8b6a0b1` exact preflight/ruling and `5d38d05c0afbef8d1a5757c140d45095318484ad` validated consolidated contract/secret-descriptor clarification. Both expected-head CAS + independent ref + all4 exact readbacks matched before product.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated source branch feat/finite-native-cleanup-20261101; ORIGIN GitHub API + hosted branch-only Actions; RESOURCE_TYPE Git source/Actions; RESOURCE_ID branch and run/jobs below; ALLOWED_ACTION scoped source/docs/tests/readback; ROLLBACK immutable prior commits/CAS, no runtime change. Sole writer/no subagents. No local source/clone/dependencies/build/downloads/provider reads/private probes/credentials/roles/OTP/window/DDL/deploy/cron/Container/main merge/Max/email/new chat.

## Implemented contract and boundaries

New unmounted `lib/mcp-qa-finite-historical-source.mjs` exports only `readPrivateQaFiniteHistoricalSource({ctx,env}, originalLease)`. It reads the fixed native env credential internally, verifies the fixed account/reader token, fetches the full UUID closed-canary version and actual module bytes, correlates exact actual legacy storage and derives original Q/cancellations from actual first-primary D1. No caller selectors/pins/URL/credentials/clock/callback initializer. No old unavailable source seam, material constructor, synchronous authority or noarg custody helper was replaced.

The actual fixed historical artifact uses receipt source2a477/tree637/programf6/SHA315cc/1,830,202B. It remains distinct from original Q, which comes from qualified manifest.original plus D1, and candidate M, which remains B1. No historical bytes are embedded, downloaded here, reconstructed from hashes, or returned by a product HTTP/RPC path.

Metadata strips only explicitly validated readonly fields and narrowly witnessed created/cachefalse defaults. Unknown/env/transfer/destructive/cache-on fields deny. Secret bindings must be exact name/type descriptors BEFORE fingerprinting; no secret-value hashes. `metadataProof` records distinct raw and normalized hashes plus sorted actual removed paths; normalized fingerprint must equal the approved fixed config4fc970. Raw drift between snapshots rejects even when both normalize to the same approved hash. Existing fingerprint helpers unchanged.

Fixed custody approval is a dated operation trust, not current scope proof. Token ID/account/active/not-before/actual expiry are checked. Because dated evidence only establishes the minute, effective expiry is min(actual verified expiry, approved conservative2026-11-03T02:59:00Z); no guessed equality/policy hash/new scope. sourceIdentityVerified/scopeVerified/authorizesEffects/operationalReadiness all remain false.

All work uses the supplied SAME original parent clock/abort plus a narrowing30s ceiling; each logical provider/storage/D1 child has<=5s, with wall/monotonic/backwards checks and stable holders/methods. Actual native promises/continuations are retained before races when the existing denial-only stage scope exists. This establishes local continuation retention, never remote physical settlement or RPC-disposal authority.

Native storage reads only the five exact known control/journal keys in each transaction, twice, with canonical raw/hash equality and fixed historical commitments. No storage scans/writes/HEAD access. Output intentionally omits invented finiteLegacy.sourceRevision/sourceHash. Missing strings/records or mismatched commitments are unavailable; old named/dispatch policy strings are never fabricated and19fc is never reused as a new draft selector.

D1 runs one bounded fixed statement per snapshot, twice, through RELEASE_DB.withSession('first-primary'). Source-qualified Q/scope bind selection; GLOBAL counts and all closures (LIMIT10, LEFT joins) retain overflow/foreign/missing discrepancy. Exactly1 admission/process closure and1..8 nonadmitted cancellations; each cancellation’s actual grant/scope/canonical ISO/expiry/latest revoke/earlier grant chronology is validated against local AND DB time. The historical events grant must match its committed hash and historical candidate, while other cancellation rows preserve their own actual container/program/revision. No active new grant or current project revision requirement. New Save/revoke therefore does not masquerade as missing historical eligibility. Snapshots do not claim distributed atomicity or physical-stop proof.

Retirement grammar was narrowly factored into `lib/dossier-event-policy-data.mjs`, shared by the existing event/retirement hosts and new reader. Existing enabled/env/binding/effect guards are unchanged in meaning; no env clone or relaxed parser. Retirement target is the policy's explicit containerId (the historical unnamed grammar used by observeOwnRetiredCustody), not forced to Q or M. Program/source grammar remains exact. Existing live/event/retirement regressions run.

Return is deep-owned private factual data with exact artifact/receipt/configuration/metadataProof/bindings/legacy/history/observedAt and four false claims. Script is bounded by exact receipt raw UTF8 byte count/SHA; metadata excluding script<=131072 and raw script+metadata<=2MiB. Escaped JSON of private script is deliberately NOT treated as a2MiB wire envelope; a quote-heavy native fixture proves this distinction. No raw private script/policy in product logs, HTTP/RPC, artifacts or public embedding.

## Hosted verification

Ubuntu24.04, actual Node22.23.4, existing lockfile; `npm ci --ignore-scripts --no-audit --no-fund`. Temporary branch qualifier contents:read, no custom secrets/artifacts/deploy, docs-only excluded; **EXCLUDE this workflow from integration**. No full-suite/image/Docker/dependency upgrade. These are source tests, not deployed-native/provider/custody evidence.

Commands:
- `node --test test/mcp-qa-finite-historical-source-native.test.mjs`
- `node --test test/mcp-qa-original-pins.test.mjs test/mcp-qa-historical-identity.test.mjs test/mcp-qa-legacy-predecessor.test.mjs test/mcp-qa-cloud-closed-http.test.mjs test/mcp-release-known-cancellation.test.mjs test/dossier-event-rpc-authority.test.mjs test/mcp-successor-retirement-host.test.mjs test/mcp-qa-original-pins-native.test.mjs test/mcp-qa-historical-identity-native.test.mjs`
- `node --test test/mcp-qa-finite-candidate-residency.test.mjs test/build-finite-native-package.test.mjs`
- `npx eslint lib/mcp-qa-finite-historical-source.mjs lib/dossier-event-policy-data.mjs lib/dossier-event-rpc-authority.mjs lib/mcp-own-retirement-host.mjs test/mcp-qa-finite-historical-source-native.test.mjs`

| Revision / run / job (all attempt1) | Result and qualification |
| --- | --- |
| RED18cdadd6547aa4b9d5095c54ad2c065437dc30c1 /41494766596 /125446692715 |16tests11pass5fail. Three positive cases behaviorally reject missing producer through test-only unavailable fallback; aggregate parent fail. Foreign-closure fixture FK insertion failed BEFORE behavior, not counted as behavioral RED. Lint passed. |
| Product22963e217760c4aa70daf38d76802d72fad38438 /41495551219 /125449433224 |16newnative +256regressions PASS, lint clean. Foreign closure fixture corrected by inserting its required grant. |
| Test54e081d46e16eec71a3601aa51ce5fadb99b651c /41496044051 /125451144530 |20newnative +256regressions +28B1 PASS, lint clean. Added actual D1 corruption/8positive9overflow/legacy null/journal negatives and actual production commitments rejecting synthetic bytes. |
| Test31d411ccf65c0713381f3670f9b4a0bfd13c7db4 /41496480232 /125452664866 |19pass2fail. Additional retention fixture held timer INSIDE native transaction; Miniflare RPC Promise/typeHeader failure after30s, then aggregate/following snapshot failure. No product change. |
| Fixture1d7042566bd95907fbf7e0f739891e2dc22b1421 /41496938879 /125454248987 |19pass2fail. Hold moved AFTER real transaction; completed in5.7s but assertion compared RPC proxy object directly. Bounded metadata serialization corrected next; no product change. |
| Final5b087d0a3090935327b7aee37bcad175bbac4be4 /41497210626 /125455183793 |21newnative +256regressions +28affectedB1 PASS; 0fail/0cancel/0skip in each; scoped lint success; artifactsAPI0. |

Final actual compile at 5b087d0a3090935327b7aee37bcad175bbac4be4: sourceTree04c7c6526051fc0fac1cd602dd47d78b539d2c89; canary1,942,384B/SHA b2a8b83f7c92547df2d8669dd20c6d846169514c5e5576c0a0a7fad17a0bcc5e (remaining154,768B); QA1,761,077B/SHA db7fd9b960b7a322d9328af585d70a28dc03f1e00785b9b6a52d1927aec373c6; gzip381,302B/SHA1b89b6c11513826eb4531c038347f46b8e5173adcdabeaf2fb30b43a4889a157. Shared pure-grammar extraction changed existing canary/QA dependencies, so this affected B1 compile/native decoder rerun was necessary. No compiler/profile/export/Container/backend/lockfile/cap changes; Node program hash remains f6f517c3ac135cfa7b9853137e0487f768b8f24a11e24959a337cac4e28d42e6. Remaining candidate margin is measured for this source only, not a fit guarantee for future mounts/C3.

Expected native decoder startup rejection logs belong to B1 negative cases. Preexisting npm deprecation notices, punycode, and actionsv4 Node20→runnerNode24 warnings are separate from the actual Node22 test process. Output is not claimed pristine; no unrelated action upgrade.

## Actual versus synthetic evidence

The new code actually runs in workerd Worker/DO/native SQLite storage and D1, using real SQL/first-primary session methods, actual fetch Response parsing, fixed metadata decoder/normalizer, legacy correlator, shared policy grammar and history collector. CF endpoint responses, custody token value/primary, and fixed historical source commitments are explicitly SYNTHETIC replacements at build/provider boundaries for coherent positive fixtures; no source success DTO replaces the whole reader. A separate native case uses production fixed commitments and correctly rejects synthetic historical bytes.

Positive native cases demonstrate Q separate from historical artifact/candidate, actual cancellation rows and own per-record programs, default normalization with raw hash witness, quote-heavy byte cap, exactly8 rows, and independence from later new-grant/revoke. Negatives cover wrong/expired custody, transfers/cache/secret-value/unknown metadata, corrupt bytes/missing slots/raw drift, extra foreign closure, scope/scopes/ISO/expiry/latest-monitor changes, ninth cancellation, storednull/corrupt legacy, original abort/expired parent, and actual fixed-pin rejection.

The retention test uses a clearly test-only ctx adapter around a real native transaction and deliberately holds its local continuation AFTER transaction completion. Original timeout/finish denies a second scope until that continuation settles; it does NOT claim a held physical write, remote RPC completion, source identity of the adapter or all-writer coverage. No source/custody identity authority is inferred from native-looking ctx/env.

## Self-review, readbacks and remaining gates

Scoped self-review checked exact entry/result keys, fixed locators/credential custody, secret-descriptor-before-hash order, raw-vs-normalized witness, source/Q/M separation, complete D1 inventory before projection, original clock/retention, byte bounds, grammar guard preservation and private output boundaries. No known actionable issue remains within this factual unit; fresh independent Root spec/quality review still required.

Final run primary verified completed/success/attempt1/head5b087d0a3090935327b7aee37bcad175bbac4be4, artifacts API total_count0; all10 changed files exactly matched expected content at codeHEAD. [Final run](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41497210626).

Every commit used expected-head CAS with independent branch ref and every changed-file exact content readback. Final BASE..codeHEAD compare and all affected files checked; report/ledger doc commit readback included in final handoff. No branch mutation after STOP report.

Pending: real native code identity/permission/binding-source qualification, actual custody scope/stored-secret match, approved initial selector/realm/project/goal/window, pre-T0 QA provenance bridge, bootstrap once/capsule/new intentions, retained cleanup/material/Workflow/GHA mounts/all writers, initial attended publication/tool byte ingress, C3 and all runtime/PC-off gates. Existing draft tables/writers unchanged; no new store/DDL. Complete package still false/throws. This block is not initial owner preparation or full Task5 completion.

## B2-AB fix round 1 — reproducible synthetic custody boundary (2026-11-02)

Finding: initial fresh review at `bd9cb210721213b06a8c762c5e96000bf11f11c1` was source specPASS / qualityNEEDS_FIXES: the native fixture inherited production's dated custody ceiling, so ordinary qualification would fail after 2026-11-03T02:59:00Z. Root recorded the bounded test-only ruling before this fix in plan/ledger/review at execution BASE `2de006396e4a44a3460da29c295519d0dfde38a0`. Original implementer, round 1/5; no new product implementation or C3 work.

Qualified testHEAD: `f68d360aac8d789024e2a4da1f1bd951bb71c7bb`. Compare execution BASE through testHEAD changes exactly two files: `test/mcp-qa-finite-historical-source-native.test.mjs` and temporary qualifier `.github/workflows/finite-task1-temporary-qualifier.yml`. Product reader and its exact approved `CEILING=Date.parse('2026-11-03T02:59:00Z')` are unchanged, independently read back byte-for-byte. No production signature, caller clock/pin/key override, registration, approval extension or dependency changes. No 256-regression/B1 rerun was warranted or performed.

The test-only esbuild boundary asserts the exact production ceiling declaration occurs once. Ordinary positive fixtures replace only that source-held datum in their in-memory test bundle with `max(Date.now()+86400000, Date.parse('2026-11-04T00:00:00Z'))`, and supply an explicitly SYN token expiry 60000ms later. Replacement absence/uniqueness is asserted. All ordinary Date.now(), performance clock, original request lease, CF-response freshness and actual native D1/SQLite clocks remain real. This is dynamic synthetic approval data with an expiry beyond the production ceiling, not evidence of real post-date execution or renewed production permission.

The production-historical-pin negative uses that same SYN custody boundary while retaining real committed historical pins; it requires the exact `metadata` error AND an observed call to the fixed historical-version endpoint. An earlier deadline cannot masquerade as historical-pin proof.

One focused expiry test retains the unchanged production ceiling and substitutes the seven known Date.now() call sites ONLY inside the reader bundle with a constant, asserting the exact call count/removal and preserved ceiling declaration. Its paired controls are:
- Constant CEILING−1: initial check admits the first SYN provider invocation.
- Constant exact CEILING: `deadline`, zero provider invocations.

The CEILING−1 control has no 1ms IO budget: entered and every reader wall-clock check are frozen at the same constant; they do not advance toward expiry. The real parent and monotonic clocks still enforce their original bounds. It proves initial guard passage, not completion of metadata/D1 under a 1ms deadline. At exact CEILING, entered==at==lastWall and wall elapsed==0; the same native input/real parent has passed the control; the initial check's `at>=effectiveExpiry` is the boundary that denies before `gate='custody'` and token fetch. Later HTTP freshness/history are not claimed by this negative. No global clock modification or product override exists.

### Hosted RED and GREEN

Both attempt 1 runs used Ubuntu24.04, Node22.23.4, existing lockfile, branch-only push, contents:read, no secrets/artifacts/deploy. Exact commands:
```text
npm ci --ignore-scripts --no-audit --no-fund
node --test test/mcp-qa-finite-historical-source-native.test.mjs
npx eslint test/mcp-qa-finite-historical-source-native.test.mjs
```

| Phase | Exact head | Run / job | Actual output |
| --- | --- | --- | --- |
| RED temporal reproduction | 9793f0d9f853c758242415f031abe5cd0044980e | [41500063202](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41500063202) / 125464938529 | 22 tests, 13 pass, 9 fail, 0 cancelled/skipped; lint success |
| GREEN corrected fixture | f68d360aac8d789024e2a4da1f1bd951bb71c7bb | [41500276455](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41500276455) / 125465668561 | 22 tests, 22 pass, 0 fail/cancelled/skipped/todo; duration 14483.535724ms; lint success |

RED deliberately instrumented the OLD fixture reader clock at exact production expiry across its existing paths. Six positive/retention cases and the historical-pin negative failed behaviorally at deadline; the parent aggregate also failed. The ninth failure was separate test-fixture bookkeeping: deepEqual compared a native RPC result proxy with a plain object in the newly added expiry case. GREEN compares its actual fields; no product fix was involved. RED is instrumented temporal reproduction, not an actual future wall-clock run, and that proxy assertion failure is not counted as behavioral expiry evidence.

GREEN's positive actual new reader, Worker/DO, storage, D1/SQLite, native methods and parsing execute under the explicit SYN CF/custody/historical-commitment boundary. Production historical pins and unchanged production ceiling are tested separately as above. No whole owner-to-provider integration or actual key/scope/source identity is claimed. Existing local-continuation retention qualification retains its prior limitation: not remote writer settlement.

Primary run API confirmed GREEN actual head, attempt1, completed/success; job and exact commands/log summary matched. Artifacts API returned zero for both runs. Logs include preexisting punycode/npm dependency deprecations and actions v4 Node20-target deprecation (runner forces those actions onto Node24); the qualification test runtime itself is Node22.23.4. No claim of warning-free output and no unrelated upgrades.

Self-review: reviewed the complete two-file diff, exact/unique fixture substitutions, paired initial-ceiling controls, genuine metadata endpoint assertion, preserved production file, and workflow scope. No new product dependencies, native graph measurement, broad suite or runtime proof was needed. CAS on each commit plus independent branch-ref and every changed-file exact readback matched. Report/ledger-only follow-up commit is the fixDocHEAD, supplied separately after creation to avoid a self-hash cycle; both documents and final test/workflow/product are read back there. Docs-only pushes are excluded by the qualifier paths; temporary workflow remains EXCLUDED from eventual integration.

STOP WRITES after this report for fresh scoped rereview FIX_BASE `bd9cb210721213b06a8c762c5e96000bf11f11c1` through fixDocHEAD. B2-AB acceptance remains Root's decision; Task5 and B2 bootstrap remain incomplete. Source authority, historical runtime availability, QA bridge/bootstrap, mounts, forwarding, C3, activation and operational readiness remain separate/unavailable. `operationalReadiness=false`. No local source/build/dependencies, actual provider/private read, credential operation, owner step, runtime mutation, main merge or C3 implementation occurred.
