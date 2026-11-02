# C2 Task1 — strict private preparation records and native journals

Status: DONE_WITH_CONCERNS, SOURCE ONLY; fresh root review pending. operationalReadiness=false. No Task2/3/4/5 producer, source capability, public mount or runtime acceptance is implied.

## Provenance and authorization

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=GitHub source / existing hosted Actions Node22; ORIGIN=GitHub; RESOURCE_TYPE=branch/source/temporary qualifier; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=Task1 source CRUD, expected-head CAS, scoped hosted tests; ROLLBACK=forward revert preserving subsequent history. BASE `6c3b0f951d2c7a63cbf9abfd4aea81222bf1cd9a`. Final code/test HEAD `7a7ebb4d8db5e37b615dc5c38d2f1a80e8513b28`, tree `39c2e04f8387741601017f8786fdeb1ac5b3c36a`. Documentation HEAD is the enclosing report/ledger commit, returned exactly after independent CAS/readback in the implementer handoff; its predecessor is the final code HEAD. No self-referential SHA is invented.

Root exact-contract rulings are retained append-only in the Task1 brief, Shared plan and progress ledger: standalone actual legacy decoder, actual three-field module descriptor, actual seven-key activation configuration grammar plus separate restoration hash, exact link/map/identity/project domains, six actual environment slot names, program revision distinct from runtimeM, and actual post-head-ACK publication chronology. The spec also retains the module/configuration clarification. These are source design decisions, never authenticated owner/current-source evidence.

## Delivered paths and behavior

- `lib/mcp-qa-finite-preparation-records.mjs`: fixed PascalCase record-kind enum Preconnection, ConfigurationApproval, OwnerPreparation, Selection, Binding, GrantLink, NoticeLink, ConnectionRef, Ticket, TicketUse, SetupContext, ConnectionSend/Ack/Receipt, PolicySend/Ack/Receipt, Failure. Exact own-data/prototype/accessor/unknown-field/size/domain/hash/time/ID validation; canonical ASCII-key-sorted encode/decode rejects duplicate keys and alternative serialization. Hash excludes only each named selfdigest, while ticket/subject/request inputs remain committed. Immutable copies. Factual project/identity helpers confer no permission.
- `lib/mcp-qa-finite-preparation-store.mjs`: source-derived keys; actual storage transactions atomically append preparation/selection and CAS sourceM head. Immutable one-use ticket and original binding/context/link records; no fallback/latest scan. The separate immutable private publication witness is sampled AFTER the actual head transaction ACK and requires witness ACK plus readback before recorded. Missing/lost head ACK never reconstructs a witness. Binding requires exact current selection and selectedAt<=publishedAt<=originalT0. Unknown work stays uncertain and history survives.
- `lib/mcp-qa-finite-policy-journal.mjs`: exact connection/policy identity including source/stage/setup/effect; source-derived sibling upload lookup; append-only SEND/ACK/receipt/failure. Activation requires actual sibling upload ACK; finish requires both actual ACKs and exact resources. Future/before-SEND/wrong-hash/late ACK and wrong-version receipt reject. Admin-pending retains outstanding SEND/ACK/receipt facts; no reset/refund/send callback.
- `lib/mcp-qa-finite-trial-control.mjs`: root-approved narrow read-only `validatePrivateQaFiniteLegacy({legacy,T0})` factors/reuses the exact existing previous-field/hash/source validator and existing legacy algorithm. Existing full-plan decoder remains strict; no fabricated full plan or reduced history grammar.
- Tests: `test/mcp-qa-finite-preparation-records.test.mjs`, `test/mcp-qa-finite-preparation-store-native.test.mjs`, `test/mcp-qa-finite-policy-journal-native.test.mjs`; actual test-only `test/fixtures/finite-preparation-store-worker.mjs` mounts these modules in workerd SQLite DO storage.
- `.github/workflows/finite-task1-temporary-qualifier.yml` narrowed to these focused tests plus the touched old decoder native test and scoped lint; branch-only push, contents:read, no secrets/artifacts/deploy. Documentation-only commits are filtered. EXCLUDE this temporary qualifier from eventual integration.
- Durable docs: Task1 brief, Shared plan, accepted spec clarification, existing progress ledger, this report. All existing history retained.

Every storage await/transaction boundary is guarded by the supplied original lease. Test source clocks, identities, leases and authority are SYNTHETIC. No result contains executable:true or a callback authority.

## Hosted commands

Node22 on ubuntu-24.04, observed Node22.23.4. Installation:

```sh
npm ci --ignore-scripts --no-audit --no-fund
```

Focused command (same three files throughout; Node orders their subtests):

```sh
node --test test/mcp-qa-finite-preparation-store-native.test.mjs test/mcp-qa-finite-policy-journal-native.test.mjs test/mcp-qa-finite-preparation-records.test.mjs
```

Additional command required by root for the exact legacy helper:

```sh
node --test test/mcp-qa-finite-trial-control-native.test.mjs
```

Scoped lint throughout:

```sh
npx eslint test/fixtures/finite-preparation-store-worker.mjs test/mcp-qa-finite-preparation-store-native.test.mjs test/mcp-qa-finite-policy-journal-native.test.mjs test/mcp-qa-finite-preparation-records.test.mjs lib/mcp-qa-finite-preparation-records.mjs lib/mcp-qa-finite-preparation-store.mjs lib/mcp-qa-finite-policy-journal.mjs lib/mcp-qa-finite-trial-control.mjs
```

No whole-suite rerun, build/deploy, or provider qualification was performed for this isolated data/journal task.

## RED / GREEN evidence

All runs below are push-triggered attempt1 under the temporary qualifier. Existing decoder command passed2 tests and scoped lint completed with0 errors for every listed run; the first run had1 fixture-style lint warning, corrected before qualifying RED. Later lint had0 warnings.

| Commit | Run / job | Focused result and meaning |
|---|---|---|
| a7259f8e164ab3b3b96a4d2aad7d9c2bd77a4d3c | 41376246732 / 125057003534 | 0PASS10FAIL. NONQUALIFYING native fixture startup: exported constant H was interpreted as Worker handler; eight native mount failures plus two intentional codec-shell failures. No product correctness inference. |
| 648997a42bc5872b28e5a1d3fdb828ad4a1576c0 | 41376387383 / 125057428214 | 1PASS9FAIL. Actual native SQLite mounts/transactions now work. Meaningful CAS expected1/actual0, recorded-vs-uncertain, journal/selection/ticket assertions fail against explicit fail-closed shells. Two codec-shell throws and one lost-ACK shell TypeError are separately disclosed; they do not substitute for behavioral assertions. |
| ed055fbce8eee3af41709ce659cf8b2debf2677d | 41376715413 / 125058449065 | 1PASS11FAIL. Adds all exact record kinds and legacy-helper contract; helper absent is asserted undefined-vs-function without missing-module/syntax failure. Native meaningful failures preserved. |
| 7b89b78b890188d8bc4c7ba3998a75104f017d4e | 41376855027 / 125058868958 | 1PASS15FAIL. Adds immutable preconnection/links/context and receipt predecessor/resource behavior; actual mounts remain valid. Same disclosed fail-closed shell limitations. |
| 44dc922a56e3dbfef0d794d1610667db919b6247 | 41376969623 / 125059220083 | Initial GREEN16PASS0FAIL plus old decoder2PASS. All new product behavior implemented after qualifying RED. Self-review then identified actual publication chronology gap. |
| 79bbd24e0d2930964f606d60edc1f084d260f793 | 41377275523 / 125060147818 | Genuine regression RED16PASS4FAIL: backdated selection accepted; actual head transaction held acrossT0 still bound; lost head ACK reconstructed existing; missing witness write falsely recorded. No fixture/syntax/dependency failure. |
| a7fc159e81f882b2c7f56d05c8729af1aa616e99 | 41377327773 / 125060307598 | Genuine RED16PASS5FAIL: same four plus admin-pending accessor was invoked instead of rejecting without side effects. |
| 7a7ebb4d8db5e37b615dc5c38d2f1a80e8513b28 | 41377436434 / 125060645997 | Final GREEN21PASS0FAIL0SKIP0CANCELLED plus old decoder2PASS =23PASS. Scoped ESLint0errors/0warnings; artifacts0; completed/success/attempt1/head independently verified. |

Positive binding/context fixtures were corrected to publish BEFORE originalT0 when actual publication chronology was installed; their former backdated publication was no longer a valid positive premise. The four dedicated regressions remained the failure oracle. The lost-witness-ACK case keeps the actual committed immutable witness; later exact durable readback recovers facts without writing/replacing/backdating it, and never recovers send authority. Lost head ACK leaves no witness and cannot bind. Selection-away/back uses actual distinct preparation and history before returning to the original prepId; original binding intent remains byte-identical and no fallback occurs.

## Self-review, verification and boundaries

Self-review covered fixed fields/domains, legacy reuse, secret descriptor handling, immutable return values, ticket replay/no refund, native CAS/history, exact original binding/context, identity/effect isolation, actual ACK correlations, unknown commit preservation, original lease assertions, and no production entrypoint import/mount. It found and reproduced the chronology/accessor gaps above before the final fix. This is implementer self-review only; root owns fresh independent Spec/Quality review.

Every commit used the exact preceding branch head as expected_sha; every successful update was followed by independent branch ref and exact content readback. All13 pre-report changed paths were independently fetched at final code HEAD and matched in-memory source exactly. GitHub compare BASE..codeHEAD showed ahead10/behind0 and only these scoped paths. Final Actions run/job/head/tree/attempt/conclusion were independently checked; artifacts list empty. Documentation-only c60f82f0fbb3a756929bf77f652cac81b1dba4a4 produced0 workflow runs. Final documentation CAS/readback is included in the handoff.

Actual native SQLite transactions/concurrency, test DO reconstruction, immutable source-owned state and after-commit lost-response injection are exercised. The Worker fixture/leases/time/provenance/Cloudflare resource values are explicitly synthetic. No deployed source parent, actual provider ACK, actual owner authorization, real provider restart or PC-off behavior is qualified. The fixture is excluded from product bundles and no production mount was added.

No local project/source file, clone, dependencies, build, temporary download or persistent process was created. Only tiny installed skill instructions were read locally. No provider/private Cloudflare GET, credential/key/role/scope/OAuth/OTP/consent/window change, runtime/DDL/deploy/cron/Container/first finite HEAD/owner command/Max/main merge occurred. Owner going to sleep did not widen scope.

## Remaining gates

Fresh root review first; then Task2 actual Access/primary/ticket/consent producers, Task3 private source transport/stages/custody/profile, Task4 originalT0 setup, Task5 actual mounts/material/primary and Native5 ROOT5 writer-settlement barrier. C3 finite business HTTP route and full composition remain separate. Actual recoverable publication/privacy/custody/source/current-owner/runbook authorization and attended operation remain unavailable gates, prepared for human attention when required. Pure record/hash/journal status never authorizes send or an owner operation. operationalReadiness=false.

STOP WRITES after documentation commit and independent readback; no next-task implementation or self-appointed reviewer.


## C2 Task1 fix round 1/5 — opened before product mutation

FIX_BASE/reviewedHEAD224693b91b7a66d331f5996f1ddc178823e4d485. Fresh independent reviewer /root/review_private_policy_task1: Spec FAIL / Quality FAIL; ONE P2, two same-pattern sites, no other actionable finding.

Verbatim: **[P2] Snapshot ticket-consumption input before asynchronous storage work. lib/mcp-qa-finite-preparation-store.mjs:67–72. fields() validates and returns the caller’s original mutable object. consumeTicket derives the use key before its first await, then rereads value.ticketHash and spreads value after awaits. Deterministic reproduction: persist valid tickets A and B; call consumeTicket({ticketHash:A,recordHash:R}, lease); suspend get(A:use); change the original argument’s ticketHash to B; resume. The transaction validates B but stores TicketUse(ticketHash=B) under A:use. A subsequent ordinary consumption of B succeeds under B:use, consuming B twice. This breaks the Task1 one-use/exact-record invariant without an expired lease or forged stored record. Capture a validated immutable argument snapshot before any await and cover this interleaving. The same retained-wrapper pattern appears in putLink at lines76–82: changing value.kind during the preconnection read can skip the notice→grant check and select a different storage suffix; snapshot the discriminator too.**

Reviewer reproduction is source-derived, not previously executed. Root assigned original sole implementer fix round1/5; no subagents. Scope is both mutable-wrapper boundaries, meaningful actual native RED before minimal fix, unchanged lease/schema/chronology and exact source-only limits. Covering command: node --test test/mcp-qa-finite-preparation-store-native.test.mjs. Scoped lint only changed product/store-native/fixture JS; temporary qualifier narrowed to avoid repeating unchanged suites. No whole-suite, runtime/provider/custody/identity/consent/OAuth/OTP/window operation; owner asleep. Root owns scoped re-review224693b..fixHEAD and next-task gate.
