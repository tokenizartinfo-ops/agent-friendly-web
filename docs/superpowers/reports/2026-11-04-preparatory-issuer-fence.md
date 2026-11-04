# Preparatory issuer fence and grant-only cleanup — Unit 2a

SOURCE ONLY; ready for fresh independent task review, not source acceptance or promotion.

## Exact scope and checkpoints

- PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006).
- ENVIRONMENT isolated feature source and credential-free GitHub Actions. Branch `feat/finite-native-cleanup-20261101`; every source ref advance used exact expected-SHA CAS.
- BASE `1c05ff6d8f39787b8af96ad30ea8593db7d0a7d3`.
- Production implementation and main qualification HEAD `9907976a20707d6936c7cabe29d2ced10a2869e9`.
- Additional eight native cases HEAD `d1b46f5d68d210001e7ac949abd3169a77fb8e07`.
- Final lint-only HEAD `333fcfb72bceb83a08c86cdf39adebfbdeb99462`.
- codeHEAD `57c3a8d83221c765d1f03221bc5f974740c61d46`: removes temporary `.github/workflows/afw-preparatory-issuer-qualification.yml`. All production source bytes remain identical to the qualified implementation HEAD.
- reportHEAD is the commit containing this report; its exact SHA is returned separately to the root with codeHEAD to avoid a self-referential Git hash.
- ORIGIN delegated-canary.agentfriendlyweb.dev was not contacted. Fixed QA actor `afw-own-successor-closure-v1`, QA namespace `070c4a7708eb4592a3ded7c117a88225`, and RELEASE_DB `6a728254-1494-4039-802e-b39288a55fcc` are source identities, not remote execution targets.
- ALLOWED_ACTION source/schema-file changes and isolated native tests. Rollback is source revert before promotion; no remote installation or runtime mutation occurred.
- No local files, clones, worktrees, dependencies, builds or persistent processes were created by the implementer. Checkouts/dependencies/native execution occurred only on ephemeral GitHub-hosted Actions runners with persisted checkout credentials disabled.

## Result and boundaries

Added strict own-data/domain-hashed Identity, Reservation, Send, Ack and Freeze records; a fixed append-once native journal; one source-only monotonic fence table; and the fixed eight-method QA SQL store. All factories remain internal and unmounted. No SDK call, source forward/controller, route or worker mount was added.

The journal closes captured QA actor/storage/env holders, snapshots strict data before awaits, preserves actual pending I/O through settlement, and requires actual transaction final return, sync and exact readback before `recorded`. Identical historical appends return `existing`, never a fresh issuing continuation. Freeze denies later granting sends; cleanup sends remain bounded factual data. Conflicting reservation/grant UUID and unknown keys fail closed.

The SQL store preflight inspects actual table/trigger SQL definitions and ordinary tables' declared TEXT/INTEGER domains, and qualifies native subsecond clock/canonical ISO conversion before effects. It does not install schema and does not fall back to ordinary OAuth. OPEN is plain INSERT SELECT. Closed-first terminal upsert uses actual SQL time; immutable tuple/no-delete/terminal triggers prevent reopening or changing a tombstone. Storage allows `reserved_at <= fenced_at`, including reduction before initial C0; this is not timing authority. Existing current initial cleanup still requires initial C0.

Every granting statement uses actual SQL execution time against its original finite window/C0 and relevant canonical consent/grant expiry, with explicit TEXT-to-integer conversion. A stale reserved consumedAt cannot bypass queued SQL time. Grant creation needs the exact one-use non-null UPDATE RETURNING object from this same store/surviving lease; clones, SELECT reconstructions, foreign stores/leases and replay cannot issue. Consumed-without-grant is terminal valid.

A terminal close ACK plus exact SELECT as the FIRST query of a NEW first-primary session precedes original-UUID grant observation. Unknown close ACK reconciles only the same original request ID/immutable identity/server fence time. Barrier and observation witnesses are private actual-result facts, not serializable permission. The source does not claim all later reads in a session are physically primary. Cleanup targets only the original reserved UUID without notice consent; it preserves exchangedAt, prior revocation and unrelated rows.

Cleanup-expiry ruling: native DBnow<expiry applies to granting/consume mutations, not permission-reducing cleanup. An expired original grant may be revoked within original C1/cleanup window, after the confirmed barrier and current owner/revision plus exact original expiry identity; original expiry is never rewritten. Root recorded this clarification in [the continuation ledger at 2da017da](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/2da017da148edc082055c312e247937d358e13b7/docs/superpowers/progress/2026-11-04-pc-off-preparation-continuation.es.md).

The sole runtime-graph change is conservative initial-alarm refusal on any unresolved issuer-prefix row. No issuer rows preserves existing Unit1 recovery.

## Causal RED and corrective evidence

All runs below are attempt 1.

| Head | Run / job | Actual result |
| --- | --- | --- |
| c41499c746ce82d05a9c384dfdb8ec8d8cdaf436 | [41906273217](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41906273217) / 126841642738 | Causal RED: 3 tests, 0 pass, 3 fail. Missing NEW codec/journal interface and fence SQL file: ERR_MODULE_NOT_FOUND/ENOENT. No fixture parse/RPC failure and no fake ordinary finite fallback. |
| f505b9a93519c73760f55de7aedeabf221225fd0 | [41907418855](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41907418855) / 126845689196 | Lint passed. Cheap group 12 pass/1 fail: test attempted Object.assign through frozen inherited properties before calling codec. Fixture corrected; native groups did not run. |
| cad768b9fb083301e13be5eca37e6d4bac9b80ac | [41907598544](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41907598544) / 126846309265 | Codec 13 pass; obsolete native fixture hung while awaiting a grant-committed flag after SQL binding failure. Root requested one scoped cancellation; terminal job cancelled independently read back. This was a fixture-loop failure, not provider diagnosis, runtime traffic, timeout-as-settlement or accepted SQL proof. |
| 225de8af40eed4a60bca09f8495532b27223cf14 | [41907969296](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41907969296) / 126847603435 | Native 24 tests: 16 pass/8 fail. Actual D1 caught duplicate placeholder use in ISO grant-expiry conversion with only one corresponding binding. Both native operands bound in 9907976a. Bounded fixture supersedes obsolete loop. |
| bbb8e38651b1579856807b3df7b3576552bbbd26 | [41908498251](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41908498251) / 126849463699 | Additional journal chain 0 pass/1 fail: fixture outer selector omitted journal_chain, so chain did not execute. Corrected fixture routing; no production change. |

These incidental fixture failures are not relabeled as causal missing-feature RED.

## GREEN commands and exact applicability

[Run 41908219643](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41908219643), job `126848474920`, HEAD `9907976a20707d6936c7cabe29d2ced10a2869e9`, attempt 1, SUCCESS:

```sh
node --test test/mcp-qa-finite-preparation-issuer-records.test.mjs
# 13 pass, 0 fail, 0 skip
node --test --test-timeout=30000 test/mcp-qa-finite-preparation-issuer-native.test.mjs
# 25 pass, 0 fail, 0 skip
node --test test/delegated-oauth-store.test.mjs test/mcp-qa-finite-initial-cleanup-records.test.mjs test/mcp-qa-finite-initial-cleanup-native.test.mjs test/mcp-qa-finite-preparation-cleanup-native.test.mjs
# 92 pass, 0 fail, 0 skip
npx esbuild worker/independent-closure/index.mjs --bundle --format=esm --platform=neutral --target=es2022 '--external:node:*' '--external:cloudflare:*' --outfile=/tmp/issuer-qa-graph.mjs
# SUCCESS: runtime GRAPH/import bundle check only; 725.7KB, 47ms
```

The esbuild command is not compileFiniteNativeStaging, a NodeM/residency-literal qualification, a candidate artifact, published size proof or full production compiler gate. Those full-branch/artifact checks remain separately required before promotion; none was inferred or dispatched.

[Run 41908840534](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41908840534), job `126850658309`, HEAD `d1b46f5d68d210001e7ac949abd3169a77fb8e07`, attempt 1, SUCCESS:

```sh
node --test --test-timeout=30000 --test-name-pattern='REAL journal append-once send ACK freeze|REAL barrier beats SYN queued|REAL native execution fence rejects SYN late' test/mcp-qa-finite-preparation-issuer-native.test.mjs
# 8 additional cases pass, 0 fail, 0 skip; preceding 25 were not repeated
```

These eight separately prove native journal send/ACK/freeze and immutable reservation/replacement/unknown-key handling; terminal barrier committing ahead of actual queued original OPEN/consume/grant SQL; and actual late OPEN/authorization/grant deadline/C0 rejection.

[Run 41909055800](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41909055800), job `126851415572`, HEAD `333fcfb72bceb83a08c86cdf39adebfbdeb99462`, attempt 1, SUCCESS:

```sh
npx eslint --max-warnings=0 lib/mcp-qa-finite-preparation-issuer-*.mjs lib/mcp-qa-finite-initial-cleanup.mjs test/mcp-qa-finite-preparation-issuer-*.test.mjs test/mcp-qa-finite-initial-cleanup-native.test.mjs test/fixtures/finite-preparation-issuer-worker.mjs
# 0 errors, 0 warnings
```

A fixture anonymous default-export warning in earlier GREEN runs was corrected by naming its handler. No native repeat was justified by that naming-only edit. Production files are unchanged from 9907976a; later commits affect only test coverage/fixture naming and temporary qualifier removal. Unique accepted counts: codec 13, native component 33 (25+8), affected regressions 92 = 138 passing cases, zero accepted failures/skips. No unrelated/full-suite repetition.

Dependency/runner warnings remain visible: esbuild-kit loader/core-utils deprecations, pinned ESLint package support warning, runner-action Node20-to-24 deprecation and punycode/url.parse warnings; existing native SQLite API emits ExperimentalWarning. Tests themselves selected Node22. These are not hidden as source lint warnings.

## Actual native proof versus SYN fixtures

Actual Miniflare D1 SQLite statements, native database clock/conversion, first-primary API/session sequencing, native DO storage transactions/final returns/sync/readback and actual selected grant rows are exercised. Queues hold actual SQL execution or its postcommit response, not fake successful query DTOs. Held grant response permits a terminal barrier to commit before its response returns; the exact reserved UUID is then found/revoked with no notice row/table. Native SQL confirms both fence orders, delayed work after terminal closure, consent/grant expiry and child deadlines, unknown fence ACK/exact reconciliation, clone/rebuilt/foreign/replay witness denial, consumed/no-grant validity, foreign immutable fields/revision, prior revocation/exchange history and unrelated rows. Journal callback-final throw, post-native-commit response hold/abort, final ACK throw, sync and readback faults permit no next SQL continuation. No transaction-interior hold requires a same-actor release.

Identity/lease/source holder setup, SDK absence, journal dispatch data and queue/fault adapters are explicitly SYN. Unsupported-clock/ISO negative adapters alter only fixture preflight literals; actual native SQL returns unsupported/null values and production denies, with no JavaScript fallback. Component test I0 is constructed from actual current SQL time and is NOT a renewed valid capsule or extended production ceiling.

Separate unchanged Unit1 native regression cases qualify the genuine original pre-Nov3 capsule/enrollment/selector linkage under their existing historical fixture clock, including admitted owner POST/enrollment, mismatched selector and held actual native enrollment. They do not make these current-time SYN component identities actual SDK/native M→QA provenance. The actual finite SDK approval/CSRF, original native source/selector producer and notice composition remain unavailable Unit2b work. Component factories and DATA do not authorize business callers; future composition must preserve original parent/child deadlines and retention rather than treating these tests as admission.

## Source hashes and preservation checks

Schema SHA256: `aa2e7e1d689077cf969dc2e4407a4ea8ef4656646671954a8bf5856139dfc2ea`. Exact SQL-file content equals the runtime preflight definition array in cheap tests. Actual installed/tampered native definitions are separately checked by preflight.

Git blob SHAs, independently read back at final source checkpoint:

- `db/finite-preparation-issuer-fences.sql`: `92c7986ae2c5c83742a92d83dac9b2585e8e182e`
- `db/schema.ts`: `02965acaa08db50750439cb4a0ca61e5a43a4b15`
- `lib/mcp-qa-finite-preparation-issuer-journal.mjs`: `414450aa08f797bed5a41cf5cc697342785ce16b`
- `lib/delegated-oauth-store.mjs`: `80caca043bf2f9c1f9c8a4fcf4b1082ca0f0cb8f`
- `lib/mcp-qa-finite-preparation-issuer-store.mjs`: `01d1a85eccaa98944b9ce3341db3cd071a4ad24d`
- `lib/mcp-qa-finite-preparation-issuer-records.mjs`: `50f9a013580a46ad1d445a240f47b7b2ce887d49`
- `lib/mcp-qa-finite-initial-cleanup.mjs`: `34a93b63607cff1454f914e16062f17aa3c3e0bb`

Ordinary `lib/delegated-oauth-store.mjs` and `db/schema.ts` are byte/blob-identical to BASE. Actual unrelated grant rows and legitimate exchangedAt/prior revocation stay unchanged in native tests. No historical expiry, consent, scope or source ceiling was rewritten. BASE..codeHEAD self-review contains only the new schema/three component modules, four-line alarm refusal, new issuer tests/fixture and the one initial-alarm regression; the temporary qualifier is absent.

## Stop point

No remote DDL, schema installation, credentials, keys, permissions, provider calls, Entry, OTP/OAuth action, deployment, main/merge, cron, monitor, other project, Max or source forward was performed. No automatic review or Unit2b was dispatched.

Fresh independent source review is the next gate. Unit2b native provenance/SDK/consent/selector/notice composition, Unit3 qualified alarm handoff, remote schema preservation/installation and full branch/artifact/promotion gates remain separate. operationalReadiness=false; completePackage=false; PCoff=false.


## Root compiler addendum — 4 November 2026, 20:57 UTC

The earlier 725.7KB legacy `worker/independent-closure/index.mjs` build did not qualify the changed `finite.mjs` entry. Root ran the actual `compileFiniteNativeStaging` source compiler in a credential-free temporary Actions job, without modifying compiler guards or product code.

First verifier HEAD4213efd49cac8a1df74ba8cb02fa9a6bab4679b4 / run41910465625 failed an extra verifier assertion that issuer-records must be imported. The product compiler had returned successfully; this codec is intentionally unmounted, while initial cleanup checks its fixed prefix literal. Root removed only that erroneous assertion. This is verifier correction, not a product fix, renewed clock or relaxed compiler.

Corrected HEAD `3be763e4e0813518f83f516dd60fb5fb51b85b05`, source tree `8c6b15022e1ebce2662b6fb173399ee371886fbf`: [Actions41911378344](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41911378344), job126859517581, attempt1, SUCCESS. Root read actual completed job/logs. Actual compiler entry `worker/independent-closure/finite.mjs` and changed initial-cleanup are present in QA graph. SQL store/journal remain absent from both worker graphs; no node:fs output import. Original 2MiB canary/3MiB QA guards and embedded residency/bootstrap/source-before-after checks all passed, unchanged.

- canaryLive:1950914bytes, SHA256 `63dbebc5e406774d6e8b0cb5715f98d6d8a0e891d6c708ae32170ffbe78c1773`.
- qaLive:2006323bytes, SHA256 `866ea9ca50d900c13af194a375cee2e9eb39d302d0a325b30a90adec79340fe7`.
- Candidate compressed383484bytes; original cap2098176bytes.

These module hashes qualify only compiler HEAD3be763e4/tree8c6b1502, not this later report/deletion commit or a deployable complete package. Temporary root qualifier removed in this commit. Existing accepted138 cases are preserved, not rerun; no native product change since9907976a. completePackage=false;operationalReadiness=false;PCoff=false. Fresh independent Unit2a review dispatched against the full task diff and report; this addendum supplies the previously missing graph evidence, not acceptance.
