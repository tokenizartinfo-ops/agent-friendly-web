# Fixed notice GET and private factual inventory — implementation report

5 November 2026, SOURCE ONLY / UNMOUNTED. **Writer status: DONE_WITH_CONCERNS, ready for root's independent spec/quality review.** The required source checks are covered by the primaries below; this does not accept a deployment, notice consent, hosting or operational package.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006, PUBLIC); ENVIRONMENT=GitHub source/credential-free Actions SYN; ORIGIN=GitHub App API; RESOURCE_TYPE=isolated source branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=exact ten source/test paths, this report and temporary qualifier; ROLLBACK=own commits only with expected-head CAS, preserving foreign changes and every historical row. No local clone/dependencies/build/test or persistent process was used. No Cloudflare runtime was read or mutated.

## Immutable revisions, scope and rulings

- Review BASE remains `dc4edafc0b5e4ba440cd32a21dd3dd58024e811a`, tree `91d023ce48bb2f5105140c788d3646c64c20bd4e`; never reset to a later checkpoint.
- Final codeHEAD `e71eb58f040d8de531206172c2cd0d2df897771a`, code tree `055d0226b5b433742e74d21a1288a4c4ae87425f`.
- Product blobs have been identical since `be044d4894e84497fb490720875195f5c8b15167`. Later changes were fixture schema preservation, the measured SDK assertion, test reinforcement and temporary workflow selection. Source proof is the four product blobs below and the immutable comparison [be044..final code](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/be044d4894e84497fb490720875195f5c8b15167...e71eb58f040d8de531206172c2cd0d2df897771a).
- reportHEAD/tree are the commit/tree containing this report plus qualifier deletion, returned and independently read back in root's closing receipt. A report cannot embed its own containing commit hash.
- The temporary `.github/workflows/afw-notice-get-qualification.yml` is removed with this report after every own run reached terminal status. It remains recoverable at the recorded run heads. No permanent CI/service/permission was added.
- Original brief/preflight at BASE bind the unit. Root's narrow schema-fixture ruling is formalized at [root docs c5d211e6 brief](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/c5d211e671c79d5ed99330eb7c5950e36f3f5da8/docs/superpowers/briefs/2026-11-05-finite-native-notice-next-slice.md), blob `c64f9c9f9c97f2a8832e3dcb090aa17d9b57579c`. It supersedes only “seven DDL exclusively in noticeGet”: all phase-context SYN fixtures may add the missing three objects while retaining their four original consent objects, three foreign events and two grants. Product schema guards remain unchanged.
- Root resolved the header conflict: keep OAuth's header-copy allowlist intact; QA generates fixed nosniff, M validates/does not copy that special header and independently sets fixed `X-Content-Type-Options: nosniff` only on accepted HTML200. The ordinary OAuth modules are untouched.
- The shutdown report/draft is preserved at [a0bd9d6](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/a0bd9d68653cc18313490c842d7d884c6184fa18/docs/superpowers/reports/2026-11-05-finite-native-notice-next-slice.md). Its draft was explicitly unverified then; current source was implemented and qualified separately, without repeating valid RED1/RED2.

## Resulting source behavior

The private observer reads the accepted six-row notice journal, validates all seven exact SQL definitions and reads the original UUID's exact ticket/event columns from fresh first-primary sessions. Each ALL must actually return success===true, an array and the fixed cap. An error, malformed metadata or partial schema is never interpreted as absence. Both whole snapshots include actual schema SQL, notice records, ticket rows and event rows; current grant.exchanged_at remains actual. Foreign prefixes/UUID history are neither used for admission nor rewritten.

The public three-key reader and existing OAuth continuation reject any own notice content. Complete empty schema and totally absent schema remain compatible with the old reader; GET additionally requires complete seven-object schema before reservation/SEND.

The fixed M bridge and QA receiver accept only the bounded original GET. Metadata is overwritten at M; caller options never create source/identity/permission. The handler verifies actual Access crypto, preparation cookie, preconnection, approval, original issuer/grant/SDK chain and current publication. A lexical expected whole frame tracks only this invocation's actual recorded reservation, its own SEND, its real retained INSERT Promise/result, and recorded ACK. Separate append Promises never overwrite SQL references. Every own transition checks two complete snapshots. Pending, existing, no_mutation, unknown or contradictory state returns503 without reconstructing an ACK or retrying SQL.

Success inserts exactly one original fourteen-column ticket and three journal rows, with no consent event. HTML has the fixed preparation message, hidden escaped handle, disabled button, no action/JS, CSP form-action none, no-store and Strict/HttpOnly/Secure cookie. All three human POST paths remain closed before any journal/SQL. No route/mount, phase, NoticeLink or source-notice permission was added.

| Final path | Blob |
| --- | --- |
| `lib/mcp-qa-finite-owner-notice-get-forward.mjs` | `b131cdef0fccf7ccdd4b810d99ea4be4252b2650` |
| `lib/mcp-qa-finite-owner-notice-get-qa.mjs` | `6f7b6cb02e9551caab16afdc1b1cd650336837f4` |
| `lib/mcp-qa-finite-owner-notice-get-wire.mjs` | `74da03e38a5ff7561f23ddbab5dfc3397cb31896` |
| `lib/mcp-qa-finite-owner-phase-context.mjs` | `4fc7a7005330e6fbf76ae7ab0ea4767dcfd2facf` |
| `test/fixtures/finite-initial-entry-world.mjs` | `bfb918ebe15edc654de0e57d5aecf83757129b07` |
| `test/fixtures/finite-owner-io-fanout.mjs` | `e181bfd7634b6f71e4129b03fbb529a2f1b04f10` |
| `test/fixtures/finite-owner-notice-get.mjs` | `f83a1db865ea85668d7261f728a1ec12541409cc` |
| `test/fixtures/finite-owner-qa-sdk.mjs` | `6ac23eb8251ee89ee73a40b822c8856ebeca578a` |
| `test/mcp-qa-finite-owner-notice-get-native.test.mjs` | `50f082434f339094718a681456dcb2e13912811c` |
| `test/mcp-qa-finite-owner-qa-sdk-native.test.mjs` | `35c3d9a3bd7be8ea09e3963ac6e56cd3ee40a1f8` |

Protected blobs, unchanged from BASE:

- `lib/mcp-qa-finite-owner-oauth-forward.mjs`: `f7979579fcb6d00b3d5d68c7790089c803f4170f`.
- `lib/mcp-qa-finite-owner-oauth-qa.mjs`: `ec5c16161bffc6e6d19de153b4465bf6ae748493`.
- `lib/mcp-qa-finite-owner-oauth-wire.mjs`: `fc113a05e7f6d1ef72cd045a55c5934b357aa724`.
- `lib/mcp-qa-finite-preparation-issuer-store.mjs`: `efc25b2af9c80b8eb27cffe219544e974002293e`.
- `lib/mcp-qa-finite-preparation-notice-journal.mjs`: `b9c15aba18e2442a0ed864b8afd5e86313c5e470`.
- `lib/mcp-qa-finite-preparation-notice-records.mjs`: `8c9386b27109cd056d3f70d91ab3cb6c6f40b4e9`.

SDK source, ordinary M entry/hosts, schema/config, source stubs and all other product files were not modified. Accepted store4016c13d and journal2969a840 were reused; no repeated147-store/33-issuer/journal or50ms/allSDK suite was run.

## Required acceptance coverage, with exact selected counts

All runs below are attempt1. TAP skip counts describe only emitted TAP; Node22 filters exclude unselected declarations rather than reporting them as skips.

| Required group | Qualified primary | Result |
| --- | --- | --- |
| New native file, full33 cases | be044 / run42095343936 / job127483768304 | 33PASS/0FAIL/0skip,458761.807882ms |
| Final changed principal and consent cases | e71eb58f / run42098853181 / job127496007748 | 2PASS/0FAIL/0skip,32356.0771ms; replaces the two changed assertions/cases,31 other cases preserved |
| Pure phase file, entire18 | be044 / run42095343936 / job127483768304 | 18PASS/0FAIL/0skip,132.301603ms |
| Selected phase-native16 | c0e1db92 / run42097918038 / job127492728047 | 16PASS/0FAIL/0skip,59418.956819ms |
| Selected SDK-native6 | c0e1db92 / job127492728047 plus1c2a4a5b / job127494691138 | Five unchanged cases PASS in the first; affected fanout case PASS in the second. Do not misreport this as one six-pass TAP run |
| Selected D04 token-native4 | 1c2a4a5b / run42098481702 / job127494691138 | 4PASS/0FAIL/0skip,54236.087611ms |
| Targeted ten-file ESLint | 1c2a4a5b and final e71eb58f jobs | Both success, no lint diagnostic |

Static declaration inventories supplied by root at BASE and unchanged by this unit: phase-native80=16selected+64not selected; SDK-native61=6+55; D04token-native46=4+42. These are **static inventories, not TAP skips**. Final reinforcement filters select2 of current33 declarations, leaving31 not selected in that run. The fanout-only correction selects1 of61, leaving60 not selected; it preserves the other five earlier selected passes.

Exact required commands (shell runs also checked actual TAP counts/nonzero):

```text
node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs
node --test test/mcp-qa-finite-owner-phase-context.test.mjs
node --test --test-name-pattern='^(closed source keeps|settled first connection|unknown issuer SEND|absent original issuer never|failed schema SELECT|fresh current owner|fresh QA pointer|same ambient original request)' test/mcp-qa-finite-owner-phase-context-native.test.mjs
node --test --test-name-pattern='^(uninstrumented actual native|missing actual SDK binding cookie|actual current publication drift|owned begin recheck rejects actual foreign delta owner-revision|fanout causal control delay0)' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
node --test --test-name-pattern='^D04 actual exchange (retains|then SYN valid native timestamp drift|then SYN immutable original current-(owner|revision))' test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs
node --test --test-name-pattern='^fanout causal control delay0' test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
node --test --test-name-pattern='^(GET acknowledged original|SYN negative consent event with real)' test/mcp-qa-finite-owner-notice-get-native.test.mjs
./node_modules/.bin/eslint lib/mcp-qa-finite-owner-phase-context.mjs lib/mcp-qa-finite-owner-notice-get-wire.mjs lib/mcp-qa-finite-owner-notice-get-forward.mjs lib/mcp-qa-finite-owner-notice-get-qa.mjs test/mcp-qa-finite-owner-notice-get-native.test.mjs test/fixtures/finite-owner-notice-get.mjs test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-qa-sdk.mjs test/fixtures/finite-owner-io-fanout.mjs test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
```

The principal actually issues QA code, exchanges it through actual M, reads actual MCP and the D0.4 three-key reader before GET. It verifies all fourteen actual columns, an independent full-row ACK hash, original identity/grant and verbatim original preparation/issuer/SDK rows; actual exchanged_at and original issuer ACK are retained. A valid own ticket followed by a SYN negative consent event denies subsequent access without changing that ticket/journal.

Other native cases cover schema0/7/partial/extra/changed SQL and failed actual ALL metadata; foreign history; grammar, cookies, crypto signature/subject/audience/issuer; longer original versus shorter current Access and actual expiry during GET; unknown/overflow/orphan/SEND/correlation/row-hash states; own pending and committed-before-return gates with a foreign reader/GET denied; lost reservation/SEND/SQL observation without retry; interleaved freeze; original5s SQL queue; CLOSE-before-ticket and ticket-before-CLOSE with history retained; two-snapshot owner/revision/pointer/exchanged_at/journal/ticket drift; and actual HTTP body/cancel retention after child expiry. Ticket mutation was explicitly destructive SYN corruption after first snapshot with trigger reinstated, not a legitimate transition. Positive grants were always actually issued by SDK/native paths; no positive SQL prefills/verifier/source/snapshot mocks were used.

## All primary runs, failures and their disposition

### Preserved causal REDs before shutdown

All attempts are attempt 1; checkout persisted credentials=false, contents permission=read, Ubuntu24.04, Node22.23.4, npm10.9.9. Each job used `npm ci --ignore-scripts --no-audit --no-fund`, max job15min. No product30s/5s clock was extended.

1. **Valid causal RED1.** HEAD `bab878c611006abf7a00a9b223bc478e203b7a38`; [run42078935862](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42078935862), [job127426529616](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42078935862/job/127426529616). Exact command:
   `node --test --test-name-pattern='^inventory own negative' test/mcp-qa-finite-owner-notice-get-native.test.mjs`.
   TAP tests1/pass0/fail1/cancel0/skip0, duration14124.220083ms. The file at that HEAD contained one case. Actual QA GET/POST emitted the original native grant; schema7/notice0/tickets0/events0 and original read_consent reader passed before adding a SYN negative unknown key under the own preconnection notice prefix. BASE reader ignored it: status undefined versus expected unavailable at line30. No bundle/fixture/deadline failure was called RED.

2. **Implementation/escaping defect, NOT valid RED2.** HEAD `b2069aba00535c60715b0f1fab4f4a4ca6520035`; [run42079302582](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42079302582), [job127427807189](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42079302582/job/127427807189). Exact command:
   `node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs`.
   TAP tests2/pass0/fail2/cancel0/skip0, duration9543.875255ms. Both stopped at initial reader3keys prerequisite (actual status unavailable); no absent-GET causal claim. Inspection found literal double-escaped whitespace/name regexes in the schema comparison. Corrected those lexical regexes in the next own commit; no clock, validator bypass or positive fake was added.

3. **Small corrected checkpoint: inventory GREEN + valid causal RED2.** HEAD `2f2cbe4d2f9852d6717fcda59e23a5fc51fb9330`; [run42079702545](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42079702545), [job127429219590](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42079702545/job/127429219590). Exact command:
   `node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs`.
   TAP tests2/pass1/fail1/cancel0/skip0, duration19553.299179ms. Inventory own negative test PASS. Principal case reached actual QA code→actual M token exchange→actual MCP read_project_summary→actual D0.4 three-key/read_consent reader; preserved actual exchanged_at. Complete schema7 and empty own notice/ticket/event prerequisites passed. Missing GET scaffold then returned503 versus200, exact assertion: `fixed GET missing after actual prerequisites; tickets=0 journal=0`. This is the valid causal RED2. No GREEN GET exists.



Resumed runs (each head is immutable; no automatic rerun/attempt2):

| Head | Run / job | Observed result and disposition |
| --- | --- | --- |
|35ad25a479eb7bc5a4dad040be047e4f4d349e8b|42093279704 /127476629576|1T0P1F0skip. Fixture graph helper treated esbuild virtual define as a file, ENOENT before prerequisites. One actual QA compile. Not a product RED. Fixed capture distinguishes actual file bytes from actual virtual compile-option text; no extra build just for hashes. Upload warned no files.|
|808a9bab84193557970a804ca5fbf619f39dff15|42093762800 /127478302248|1T0P1F0skip. GET200/ticket/ACK/HTML/nosniff assertions passed, then exact Cache-Control assertion found duplicated no-store. Fixed only new GET forward to set once. Two compiles. Full metrics JSON was split at64KiB in logs; root reconstructed it, not lost.|
|0db9f2d1c7018dc6f572f7fe930d8dfe5acd30e7|42094285083 /127480153262|32T30P2F0skip,268249.906914ms. Two fixture expectations incorrectly wanted applied from original closeFence, whose accepted status is fenced. Corrected assertions only. Principal and all other native cases passed.62compiles.|
|be044d4894e84497fb490720875195f5c8b15167|42095343936 /127483768304|33nativePASS plus18purePASS. Phase16 emitted6P10F because legacy fixture contained partial four-object monitoring schema. SDK/token/lint were skipped in this job.64QA/M compiles plus16phase QA invocations. No budget/hang failure.|
|d87158c4847604446051ab27e3ef9d844b3d2f8d|42097405566 /127490953992|One authorized diagnostic case,1T0P1F0skip. Actual LIST Maptrue,size0; actual ALL success:true/array:true,size4; source fail-site phase:276. Diagnostic QA1469048B/322inputs/hash e486e62e3d00a75fa6f18d90353483f86add066f3f8f75e25134f49b0687d65e. This instrumented diagnostic bundle is not a GREEN product bundle.|
|c0e1db92432651391d3dfc10e18c409e1b4aa4ec|42097918038 /127492728047|Phase16PASS. SDK6 emitted5P1F because old metric expected80 versus measured128 factual reads. Control returned302 with original child1532ms, HTTP112/84, peak2/active0, preflight16/writes2 intact. Token/lint skipped.12QA/M compiles plus16phase QA invocations.|
|1c2a4a5bae85a8ed0789057c5691fd7bd9fe3cdc|42098481702 /127494691138|Only affected fanout1PASS,15030.431257ms; D04token4PASS; lint10clean. Only factual expectation changed80→128.10QA/M compiles.|
|e71eb58f040d8de531206172c2cd0d2df897771a|42098853181 /127496007748|Only reinforced principal+consent2PASS,32356.0771ms, lint10clean.4QA/M compiles. Last test source and all product blobs qualified as above.|

Canonical run links use [Actions runs](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions); each exact run/job ID above is independently retrievable. No run was canceled, replayed or extended to fit. Diagnostic onLoad code was removed before c0e1. No timeout or credential incident was inferred from temporary404 BlobNotFound while a job was still running.

## Legacy SYN schema adapter: preservation and isolation

The phase failures were correct product denials, not grounds to weaken success/Map/schema predicates. Native history fixture installed four consent objects and three events for foreign original/cancelled-old grants. Root authorized the already-scoped world adapter to apply the original seven IF NOT EXISTS definitions after native history seeding. It adds only owner-tickets table and its two triggers.

Assertions on each affected harness verify exact SQL of four consent objects, all three existing consent rows and both existing grant rows before/after, then verify seven objects. There is no DROP/DELETE/UPDATE or new positive seed in this adapter. Other non-phase modes remain unchanged. Native stdout records consentObjectsPreserved4/consentRowsPreserved3/grantsPreserved2/objectsAfter7/addedObjects3.

Comparison be044..c0e1 changed only world initialization, removal of diagnostic fixture text, and the temporary qualifier; all four product blobs were identical. Comparison c0e1..1c2a changed only the measured SDK test assertion and qualifier. Final e71 changes only two test assertions/cases and qualifier. The root documents containing the narrow ruling are referenced above and were not copied over this source branch by the writer.

## Actual GET I/O, timing and budgets

Final reinforced principal elapsed **1328ms** including transport and subsequent factual inspection. It observed12complete source snapshots,84actual provider HTTP GET lifecycles, peak2, active0 and84settled body/cancel lifecycles. The ticket SEND-recorded→complete interval in trace is604ms; actual SEND window<=5000ms and completion before that exact deadline are asserted. Parent remains original<=30000ms; queued negative crosses real5s without clock patch or extension.

| Whole expected-frame recheck | Trace stage | Actual Date.now ms |
| --- | --- | --- |
| baseline | before | 1793908708614 |
| baseline | after | 1793908708828 |
| reservation-recorded | before | 1793908708833 |
| reservation-recorded | after | 1793908709017 |
| ticket-send-recorded | before | 1793908709020 |
| ticket-send-recorded | after | 1793908709204 |
| ticket-sql-resolved | before | 1793908709230 |
| ticket-sql-resolved | after | 1793908709440 |
| ticket-ack-recorded | before | 1793908709443 |
| ticket-ack-recorded | after | 1793908709623 |

Baseline observed at1793908708611; final complete1793908709624. These are real runner/workerd fixture timestamps, not live-provider latency or wall-clock evidence of deployment.

- Actual captured SQL:102first-primary sessions,111statements; first62/all49. The following noticeInspect diagnostic contributes3sessions/3ALLs after complete. The source GET itself is99sessions/108statements:96factual reads across12snapshots plus original store preflight11reads and one INSERT. Original issuer preflight is8statements; monitoring preflight adds schema+two PRAGMA reads. No factual ALL borrows a preflight session.
- Of the factual reads,36 are the new three-per-snapshot ALLs:12schema,12ticket and12event queries. Each is first on a newly created first-primary session; bound grant UUID is always the original issuer UUID. Schema cap8 accepts only0 or7; tickets cap2 rejects>=2; events cap3 rejects any row. Actual journal lists use limit7; twelve extra factual journal lists are recorded separately from three append transaction lists.
- Observed native API invocation counters, including the final diagnostic inspection: storage.get903, storage.list109, sync3, transactions27; transaction.get99/list3/put3. The inspection adds one outer list and the three ALLs identified above. These are instrumentation categories, not a sum of billable network RPCs; do not infer cross-RPC physical drain.
- Each own recheck preserves the full pair, original fanout scheduler/credential join, peak2 and serial snapshots. Principal source GET factual accounting is6pairs×16D1factual statements plus its12store statements, and6pairs×14HTTP GETs; timestamps/query sessions in artifact permit checking per-phase costs.
- The separate original OAuth fanout control0 has112HTTP/84narrow observations and sixteen primary snapshots. Its actual factual SQL changed80→128 (+48=16×3), while preflight16/writes2 remain unchanged. Corrected control child1577ms, peak2/active0; no50ms repeat or scheduler change. These112/128 values are **not** GET totals.

Exact new factual SQL, without values:

```sql
SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8;
SELECT handle_hash,request_id,user_id,grant_id,project_id,client_id,resource,purpose,action,revision,expected_sequence,issued_at,expires_at,permission_expires_at FROM dossier_monitoring_owner_tickets WHERE grant_id=? ORDER BY handle_hash LIMIT 2;
SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3
```

SQL/header/body/cancel failures remain retained. Native tests prove a fresh SYN lease in the same ctx is blocked while actual queued SQL or HTTP body/cancellation remains unresolved, then releases after actual settlement. This is request-scope bookkeeping, not a durable all-path writer inventory or proof of global drain. No unknown ACK was reconstructed from SELECT; no row/history was deleted to recover an outcome.

## Actual compilers, graph and retained artifacts

No standard compiler/build was added; standard entrypoints/configs are unchanged, and phase/new receiver remain unmounted. Actual QA/M harness builds were measured during tests, never a separate build for hashes. Current real fixture profile remains QA2026-09-07/nodejs_compat/enable_request_signal and M adds global_fetch_strictly_public.

Final focused native compiler outputs:

| Invocation | Bytes | Metafile inputs | Bundle SHA256 |
| --- | ---: | ---: | --- |
| principal QA | 1759194 | 324 | `f4232ea48bf810e47bbeecacdc16b1a6c8a1f697cee65575be33772eee024823` |
| principal M | 1678423 | 302 | `d68eef4a16568b6bb53c4921f0d0cc111113e674ebab3127d2430d7ed1f9f032` |
| consent negative QA | 1759194 | 324 | `d0bf2b020b6498e299b34e9484ed1dff5915b1cebde837706e12810d22e080e8` |
| consent negative M | 1678423 | 302 | `d68eef4a16568b6bb53c4921f0d0cc111113e674ebab3127d2430d7ed1f9f032` |

Compare to RED1 actual QA1706500B/320inputs and token M1671443B/300inputs: current QA adds notice wire/journal/records/receiver reachability; current M fixture adds only notice wire/forward (302inputs). M's ordinary source/token SDK graph remains separate; no unexpected standard edge was discovered. QA source phase already existed in the private harness and now imports the notice journal. No graph/byte count is a remote fit/hosting claim.

Metafiles are from the actual build results and include imports/output reachability. Captured bundle SHA/bytes are actual output bytes. Input file hashes explicitly refer to repository file bytes before SYN onLoad transformations; virtual hashes refer to the exact supplied compile-option text (stdin/defines), rather than pretending virtual inputs are files. Actual transformed graph byte/import information is in the metafile. Provider/history and source-ceiling adjustments remain the existing explicit SYN harness boundary.

Artifacts, each retained seven days as authorized:

| Run | Artifact ID / ZIP SHA256 | Contents |
| --- | --- | --- |
|42093762800|13446176700 / c9c6f71fc85d85ce556474eb2d3998309acbe38f1f49f734bb3370222d9f2003|2actual QA/M graph manifests; early header-failure primary|
|42094285083|13447421598 /59e725ce41390467f3a3aac421f34947379d1d6265f2104ef803bf5254e0df96|62actual graph manifests and principal I/O detail; CLOSE assertion-failure job|
|42095343936|13446718826 /74a2572333a5a76ee91598b419535aaafd42b2211fca114aec5d1187caec9f19|64actual graph manifests and full principal query/session/HTTP detail;33nativeGREEN|
|42098853181|13447389411 /5ac2ab6cf5aa1fc4ed44051e1abe6e1be3417a0eccc8bca11687b12aac8d01e9|4final actual graph manifests and final principal I/O detail;153292Bcompressed|

Count ledger:10pre-shutdown fixture compiler invocations already preserved; resumed jobs1+2+62+80+1diagnostic+28+10+4=188, total198fixture invocations and0standard. Of the80/28 groups, each includes16phase-only QA builds (one per actually run harness, unlike the explicit two-worker SDK logs). All other QA/M counts are explicit compiler log lines; c0e1 additionally recorded22native schema-adapter completions (16phase+6SDK). The numerous SYN compiles are reported as cost, not hidden or presented as production builds.

Artifacts expire under the authorized seven-day retention. Permanent source/report and run/hash pointers remain; no new publication/storage service or unapproved evidence destination was created.

## Warnings, self-review and remaining authority limits

Warnings preserved: RPC stub disposal; CIMD/profile message in SYN QA; npm deprecated esbuild-kit esm-loader/core-utils and eslint9.39.4; setup punycode DEP0040; Actions checkout/setup-node Node20-to24 warning; git default-branch hint. First graph-helper failure also emitted “no files” upload warning. Root located the same RPC warning in existing D04GREEN run42059641718/job127357402313 (762ab84265b2fb75256f1c7e17f2618e6893123a,24+3+7PASS), before this GET unit. That is dated prior evidence, not proof of identical cause or absence of current risk. No warning, MinorD03 OAuth-error precision or old fanout cleanup was fixed by scope drift.

Self-review: public export set is old three-key reader/OAuth handler plus the fixed GET handler; observer/pairs and expected frames stay private. Original select helper is unchanged. No allowPending or caller identity/time/keySet/source options exist. Full expected snapshots retain actual current rows and raw SQL. SQL Promise/result/settled remain lexical until final ACK recheck, while append references are separate. Product store/journal/SDK/ordinary-M/source-stub/config/schema blobs are preserved. Final BASE diff is exactly ten approved source/test files plus this report after qualifier deletion. Root still must inspect that full diff and obtain a fresh independent spec/quality review; writer did not create a helper/reviewer.

This unit produces preparation only. POST/CSRF consent, NoticeLink/stages/third CLOSED/ownSEND/full setup/cleanup/guard/ARM/mount/hosting and the complete operational package remain downstream, separately scoped. The POST design on another branch is INACTIVE and was not incorporated here.

Source ceiling2026-11-03T02:59Z remains expired; no early renewal/rearm. C0=I0+900000, C1=C0+180000, parent30s/child5s unchanged. Native crypto/D1/DO/SDK/token/MCP in an explicitly SYN provider/history harness do not establish live customer Access, current runtime state or fit with a PC off. Unknown outcomes remain no-retry; code rollback never authorizes deleting historical D1/DO data or claiming global physical drain.

**operationalReadiness=false; completePackage=false; PCoff=false.**
