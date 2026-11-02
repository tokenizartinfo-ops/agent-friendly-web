# C2-A initial factual material — implemented; independent review pending

Date: 2026-11-02. Repository: tokenizartinfo-ops/agent-friendly-web. Branch: feat/finite-native-cleanup-20261101. Source-only GitHub API work; main untouched.

## Checkpoints and authorized scope

- Accepted C1/base: 6038db5ffbdcaa3e3512f31e355e96dd20f52beb.
- Full preflight/proposed A contract: ba452cffcf10def0263164a18551372ba15ffd82; Root's corrected pre-code hash/bounds clarification: 5a44224eb67d54aa5758aeaf2dbfbe83cee192ac.
- Meaningful RED tests/qualifier: 42d078a921878229675a49475585c040268a23ad.
- Product checkpoints: 53416c2e76fb2536fbca20e189fcc9d814152e90, 8584cfa658120e62173d096ed6e24b85efcc3b33, 83e9eed6f6c905880083c86c603d6955d5b384dc, 8a8633d7527a448998cefd46910f7d197d47aded.
- Later Root attempt-fence clarification recorded in docs at ced9abbb15eb3bde4475a543dd54902522c280b8, before final fresh-constructor regression.
- Final code/test head: **2ab571bd1659060387b5c19d58dd5d329b8b7d5e**, tree 2028582ff260923c09c0a58764df0af16410e086.
- This final documentation commit descends directly from that code head; its exact SHA is the enclosing Git commit delivered to Root after CAS/ref/readback. No claim that a self-referential SHA can be embedded in its own content.

A is an UNMOUNTED factual input to future C2-B. No Workflow/HTTP/RPC mount, initial publisher, ownerSource replacement, source authority, session forwarding, all-writers/full-package claim, upload/deploy/activation or owner command/window. B1/B2/C1 and Task4 product code are unchanged. Original exact requirements and full source/refinement table remain in [initial preparation preflight](2026-11-02-finite-initial-preparation-source-preflight.md); accepted A contract is [initial material spec](../specs/2026-11-02-finite-initial-material.md).

## Actual API, records, storage, entry and clock

| Surface | Implemented contract and source |
|---|---|
| Constructor | createPrivateQaFiniteInitialMaterial({ctx,env}); capture actual actor/storage/D1/self/event namespace/version/credential/fetch holders. collect({commandId}, originalLease) returns admin_pending/mayRetry:false or private factual result. assertCurrent(result, sameOriginalLease) is a constructor-local WeakMap factual check, never permission. lib/mcp-qa-finite-initial-material.mjs:16,24,91. |
| Entry | No public/native operation entry. Existing actor/storage are only supplied by the future source-owned caller; this does not attest a platform caller/MCP identity or consume an original native issuer. |
| Clock | Immutable public owner comment created_at = I0, unedited exact owner/repository/issue/body/M/QA; read before/after. Deadline min(original live parent, local entry+30s, I0+300s, fixed production approval ceiling); child<=5s with actual AbortController/timer and retained operation promises. No invented queuedAt/equality/status timestamp. material.mjs:29–61. |
| Once/IDs | Fixed actual-storage global durable once; IDs preconnectionId/trialId/activationKey (random 32-byte hex), withdrawalRequestId/saveIdempotencyKey (UUID) allocated once before material assembly, memoized across transaction callback reentry. Same-isolate WeakSet before first claim transaction prevents new-constructor/unknown-no-commit retries. store.mjs:4–39. Restart limitation below. |
| Records | Exact own-data codecs: InitialClaim<=8192; InitialMaterial<=65536; InitialSelector/InitialAck<=2048 UTF8 bytes. Strict canonical strings, exact fields, self hashes/domain hashes, prototype/getter rejection. records.mjs:13–100. These are DATA, not serialized capabilities. |
| Storage | Existing actor prefix afw.finite-initial-preparation.v1: once, material:<materialHash>, selector, ack. Material+selector one actual atomic transaction, then factual ACK witness only after that ACK; separate ACK transaction and four exact readbacks. Fail closed on existing once/selector/ack/finite HEAD/conflict. No DDL/new binding/named packet/draft hash. store.mjs:24–63. |
| Selector | Fixed private selector binds intentHash, claimHash, materialHash, M, QA, preconnectionId. Never overwrites afw.qa-finite-trial.v1:head, grants authority or selects a public effect. |
| Custody/context | Stored originalContext exact ten fields artifact/scope/original/publication/cancellations/retirementPolicy/withdrawalRequestId/saveIdempotencyKey/legacy/trialId. Artifact exact five identity fields; no script. Existing finiteData original limits <=32768 bytes/depth12/nodes2048 inside material64KiB. Rehydrate only actual B1 script/bytes in memory. records.mjs:44–59; material.mjs:77–87. |

## Actual producer composition and identity boundaries

collect invokes actual readPrivateQaFiniteCandidate(), readPrivateQaFiniteBootstrap({ctx,env},lease) and readPrivateQaFiniteHistoricalSource({ctx,env},lease), without a wholesale facts DTO replacement. C1 remains uncached and runs once for this assembly. Successor manifest uses actual B2 raw successor policy and existing resolver; original Q matches B2 original admission. Exact owner/project/client/resource derive approved pinned old synthetic2607 configuration + B2 original scope/admission + two actual fresh first-primary getOwnedProject queries over the same ID/subject and positive revision. Access domain/audience and DELEGATED_RATE_LIMITER values must exist and satisfy their grammar; missing/invalid values fail. synthetic:true is the approved fixed own-test source policy, not a label/email heuristic.

Historical frozen artifact, immutable old Q and current reader/candidate M remain distinct. historicalEvidence is explicitly reader-origin under afw.finite-historical-evidence.v1; its reader is M/tree and its five commitments hash actual B2 receipt, metadataProof, bindings, legacy and history under the five exact accepted domains. Full legacy retains raw strings unchanged and adds M/sourceHash of that reader evidence. No M-produced-old-history or old-build provenance claim. Cancellations and retirementPolicy remain actual old raw historical facts, with no new T0/grant transformation or physical-stop claim.

Task4's actual recursively sorted afw.finite-original-context.v1 digest semantics stay unchanged. The regression reconstructs Task4's same exact projection, uses existing finiteData, compares the digest after the actual canonical material codec roundtrip, and rejects a >32KiB projection even while its enclosing material remains <64KiB. No invented sorted-vs-schema-order difference or shared helper/Task4 change.

Positive native path makes exactly **13 anonymous GH GETs** (C1 eleven + initial command twice) and **6 CF synthetic GETs**. Initial C1 retained facts are data only. Public GH 60/IP/hour/shared-quota availability remains a gate; no key/proxy/retry. The earlier hypothetical 53-call whole HTTP flow is UNQUALIFIED: no physical request/source session forwarding or ten-session allowance is implemented. Future B owns real complete-flow accounting and fresh main/tag/pointers/private DB/owner decision admission.

## Hosted RED → GREEN evidence

All six runs below are the existing temporary branch-only push source qualifier, attempt 1; no rerun, manual dispatch, secrets, deploy or artifact upload. Artifacts API verified empty for every run. Qualifier remains EXCLUDED from eventual integration.

| Commit | Run / job | Result |
|---|---|---|
| 42d078a | 41517730516 / 125525463616 | RED: 4 pass, 5 fail. Missing actual collector/codec behavior; harness/dependencies valid. Lint 0 errors, one unused-argument warning subsequently removed. |
| 53416c2 | 41518799075 / 125529151184 | 7 pass, 2 fail. Test digest used literal backslash-n; held synthetic remote response did not retain a locally aborted fetch promise. Neither failure was concealed or called physical settlement. |
| 8584cfa | 41519126996 / 125530286550 | 9 pass, 0 fail; scoped lint clean. Fixed test delimiter and held actual native transaction ACK boundary. |
| 83e9eed | 41519345788 / 125531046269 | 19 pass, 0 fail; scoped lint clean, expanded negatives. |
| 8a8633d | 41519795116 / 125532563876 | 19 pass, 0 fail; scoped lint clean, isolate attempt denial/result validity. |
| **2ab571b** | **[41520147197](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41520147197) / 125533756257** | **19 pass, 0 fail, 0 cancelled, 0 skipped; scoped lint clean; artifacts 0.** Fresh-constructor/no-commit regression included. |

Exact hosted commands, Node22/Ubuntu24.04/existing lockfile:

```sh
npm ci --ignore-scripts --no-audit --no-fund
node --test test/mcp-qa-finite-initial-material-native.test.mjs test/mcp-qa-finite-initial-material-records.test.mjs
npx eslint lib/mcp-qa-finite-initial-material.mjs lib/mcp-qa-finite-initial-material-records.mjs lib/mcp-qa-finite-initial-material-store.mjs test/mcp-qa-finite-initial-material-native.test.mjs test/mcp-qa-finite-initial-material-records.test.mjs test/fixtures/finite-initial-history-world.mjs
```

Actual native Miniflare DO/SQLite storage + D1 and actual B1/B2/C1 parser/producer composition run in cloud CI. Explicit SYN boundaries: fixed historical receipt/configuration/DB rows, compiled resident candidate/source pins and mocked outbound fixed CF/GH responses/credential; test-only approval ceilings moved forward so permanent source regression remains reproducible. No real provider access/runtime claim. Production ceilings are unchanged. No whole-success fact reader mocks.

Nineteen top-level tests cover positive composition/custody/hash/bounds/old-key/HEAD preservation; fifteen owner/repository/issue/M/QA/edit/expiry/command-drift/Access/limiter/current-row/abort/holder negatives; actual partially-consumed original parent + held child; and strict record API/getter/extra-field rejection. Positive case also contains five native storage subcases: concurrent one transaction; committed-claim unknown ACK; uncommitted first claim; material transaction ACK unknown; ACK write unavailable. Fresh constructor on same actual storage with different valid M/QA cannot issue a second claim transaction/IDs. Material/selector partial facts are never resent/overwritten; no success brand after unknown ACK. Cloned result, another constructor/lease, mutated candidate bytes and expired original lease all fail factual assertCurrent.

Mandatory deadline test: original parent has 120ms total, consumes 60ms before collection; first actual native storage read transaction ACK is deliberately held. Real parent timer/abort returns pending; stage remains blocked while actual ACK promise is held, then releases only after settlement; exact storage snapshot is unchanged, with no post-deadline writes. This is a retained local native-operation proof, not a remote physical-process stop claim.

## Custody and changed-file verification

Every mutation used GitHub tree/commit + expected_sha CAS with force:false. Known bases/rollback commits were retained. Chain: 6038db5→ba452cf→5a44224→42d078a→53416c2→8584cfa→83e9eed→8a8633d→ced9abb→2ab571b→this final docs commit. No main mutation or rollback performed.

At final code head, branch ref exact and all seven source/test/qualifier contents read back exact. Compare 6038db5→2ab571b is ahead9/behind0, exactly these twelve files (no existing Task4/B1/B2/C1/entry/source-authority product edits):
- lib/mcp-qa-finite-initial-material.mjs
- lib/mcp-qa-finite-initial-material-records.mjs
- lib/mcp-qa-finite-initial-material-store.mjs
- test/mcp-qa-finite-initial-material-native.test.mjs
- test/mcp-qa-finite-initial-material-records.test.mjs
- test/fixtures/finite-initial-history-world.mjs
- .github/workflows/finite-task1-temporary-qualifier.yml
- docs/superpowers/reports/2026-11-02-finite-initial-preparation-source-preflight.md
- docs/superpowers/specs/2026-11-02-finite-initial-material.md
- docs/superpowers/plans/2026-11-01-finite-private-policy-setup.md
- docs/superpowers/progress/2026-11-01-finite-native-confirmation-cleanup.md
- docs/superpowers/reports/2026-11-02-finite-initial-material.md

Final documentation update only appends spec/plan/ledger and replaces this in-progress report. Its CAS/ref and exact file readbacks are returned to Root after commit. No local clone/deps/build/temp, provider probes, workflow instances, actual commands/tags/auth/grants/credentials/config/runtime/DDL actions occurred.

## Root clarification of uncertain first-claim outcomes — 2026-11-02 20:30 UTC

Chronology: the implementer added the private per-actual-storage WeakSet denial in source commit 8a8633d7527a448998cefd46910f7d197d47aded before Root's message confirming this defense. This is NOT represented as pre-code Root approval. Root subsequently confirmed the bounded defense and asked to preserve this chronology; no history rewrite/revert is needed.

The original pre-code contract remains unmounted factual C2-A. A committed/retained durable once record denies replay across constructors/M/QA/lost ACK. If the first claim never committed, absent durable evidence after actor restart proves neither consumption nor physical settlement. The private WeakSet is set after verified original command, before first claim transaction, keyed only by captured actual storage identity; it is never cleared on false/unknown outcomes. It denies new-constructor retries in the same isolate, including an uncommitted claim, and concurrent claims admit one attempt. It is NOT a durable registry, source authority, effect admission, or restart proof.

Future C2-B must independently fence the original native entry and unknown outcomes. No A data/result can supply that permission. No new key/table/role/entry/proxy/incarnation claim. Required final focused test explicitly uses a fresh store constructor over the same actual storage after unknown/no-commit ACK, asserts no second transaction/IDs; concurrent path one actual attempt. Operational readiness remains false. This clarification is persisted before that final test refinement.

## Stop and remaining gate

Implementation/testing complete for bounded C2-A; independent source/spec/quality review remains required. C2-B must independently admit genuine native entry/original issuer, restart/unknown-outcome continuity and all writers before any publication; cached A data is not permission. No full initializer/UI readiness. Existing owner15min/read10min remain unstarted; completePackage, operational readiness and PC-off readiness remain false. STOP: no publisher/mount/runtime progression by this task.
