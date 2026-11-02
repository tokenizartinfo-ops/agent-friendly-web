# Private policy setup Task1 — strict records, selection and effect journals

SOURCE ONLY. Root-dispatched implementer; no subagents. Read this brief, then Shared exact interfaces/types and Task1 of ../plans/2026-11-01-finite-private-policy-setup.md, plus record/state sections of ../specs/2026-11-01-finite-private-policy-setup.md. Preserve root's scoped implementer -> fresh reviewer -> next-task method. Root assigns actual branch/qualified BASE after Native5; never edit another active writer or execute from this older docs baseline.

## Deliverable and boundary

Implement strict private record codecs, explicit sourceM selection/binding and native append-only journals. They retain facts only: no caller boolean/record/hash creates owner authorization or a send capability. Actual Access/owned-primary producers arrive Task2; publisher/stages Task3; post-T0 source Task4; full mounts Task5. Do not install placeholder factories or public registrations to obtain a positive test.

Create:
- lib/mcp-qa-finite-preparation-records.mjs
- lib/mcp-qa-finite-preparation-store.mjs
- lib/mcp-qa-finite-policy-journal.mjs
- test/mcp-qa-finite-preparation-records.test.mjs
- test/mcp-qa-finite-preparation-store-native.test.mjs
- test/mcp-qa-finite-policy-journal-native.test.mjs
- test/fixtures/finite-preparation-store-worker.mjs

No existing product entrypoint/profile/OAuth/metadata validator changes in this task. Synthetic fixture Worker mounts actual journal/store modules in Miniflare SQLite DO storage; it is test-only and excluded from product bundles. No production authority escape.

## Interfaces

Implement encodeFinitePreparationRecord(kind,value), decodeFinitePreparationRecord(kind,text), hashFinitePreparationRecord(kind,value). kind is a fixed source enum for the plan/spec record types; exact fields/domains/private size caps, no arbitrary schema argument. Canonical decode must reject duplicate keys, unknown fields/accessors/prototypes, invalid hashes/times/IDs and oversized data.

createFiniteOwnerPreparationStore({storage,now}) exposes the exact plan signatures for putPreconnection, putTicket, consumeTicket, putLink, publishSelection, bindSelection, putContext, readSelected and readContext. Publish preparation+selection+head-CAS atomically. Binding is once-only against exact selected hash and originalT0; no fallback/latest scan, no finite HEAD.

createFinitePolicyEffectJournal({storage,identity,now}) exposes issue(send,lease), acknowledge(ack,lease), finish(receipt,lease), markAdminPending({reasonCode,observedAt},lease), read(lease). identity is the plan's strict connection/policy union, not arbitrary storage key. Upload/activation records remain distinct; final completion requires acknowledged actual predecessors. No predicted ACK or force/refund/reset.

Lease={signal,assertCurrent}; queue time included and assertions before/after awaited operations and transaction boundaries. Source adapters later supply the actual parent lease; a pure test lease does not qualify deployed source. MutationObservation/ReadObservation and all field/nullability rules are exactly the plan. Never return executable:true or callback authority. Admin-pending keeps existing issued writers visible.

## Meaningful TDD

1. Add named RED cases:
   - rejects_noncanonical_private_record_and_future_ack: exact schema/hash/domain/bounds; no raw credential/JWT/cookie fields.
   - selection_cas_one_winner: two actual native concurrent selections; exactly one expected-head CAS succeeds, history preserved.
   - selection_changed_after_T0_no_fallback: select away/back; bind old intent rejects despite same prepId.
   - preparation_cannot_bind_second_intent: original binding remains byte-identical.
   - consumed_ticket_is_not_refunded: competing consumption/lost ACK never creates a fresh ticket.
   - lost_issue_ack_retains_issued: inject lost response AFTER actual native commit; reconstruct/read sees issued, repeated issue reports existing, not new.
   - activation_requires_actual_upload_ack: fabricated future/wrong-version/hash ACK and late ACK rejected.
   - admin_pending_keeps_outstanding_send: timeout/conflict changes no prior claim/receipt/history; read never labels unknown work settled.
   - records_do_not_touch_runtime: no transport/Workflow/finite-HEAD side effects; actual T1 modules have no production mounts.
2. Run hosted focused command and preserve the behavioral failing run/commit. Do not count missing dependency/syntax/fixture wiring as RED.
3. Implement exact transaction/codecs minimally; freeze returned data without rewriting callers' env or accepted history. Unknown storage ACK remains uncertain. No business producer or provider access.
4. GREEN same focused command; scoped lint; verify fixture disposal and no private data in output. Native fixtures, clocks/authority and external boundaries are explicitly SYNTHETIC.
5. Commit report/ledger and stop writes for root fresh review. Do not implement the next task.

## Commands and evidence

Cloud GitHub/Actions only, Node22:
npm ci --ignore-scripts --no-audit --no-fund
node --test test/mcp-qa-finite-preparation-records.test.mjs test/mcp-qa-finite-preparation-store-native.test.mjs test/mcp-qa-finite-policy-journal-native.test.mjs
npx eslint lib/mcp-qa-finite-preparation-records.mjs lib/mcp-qa-finite-preparation-store.mjs lib/mcp-qa-finite-policy-journal.mjs test/mcp-qa-finite-preparation-records.test.mjs test/mcp-qa-finite-preparation-store-native.test.mjs test/mcp-qa-finite-policy-journal-native.test.mjs test/fixtures/finite-preparation-store-worker.mjs

No local code/deps/build, provider/private GET, tokens/keys/roles/OAuth, DDL, deployment, live comment, protected preservation stage or actual occurrence. Temporary no-secret qualifier is branch-only/excluded integration. No root full-suite rerun for this isolated data/journal task.

Report docs/superpowers/reports/2026-11-01-finite-private-policy-setup-task1.md and append docs/superpowers/progress/2026-11-01-finite-native-confirmation-cleanup.md. Record BASE/code/docHEAD, RED/GREEN exact commands/runs/jobs/counts, affected paths, native fixture limitations, source boundaries, remaining tasks/gates, expected-head CAS and exact readback. Return DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED; stop for review.

Global timing remains connection<=15min, original requests<=30s/children<=5s; commandBy=min(actual expiries)-480s-30s; post-T0 setup50/adoption70/ARM90; Known4args/18stages/70s/5s/20s/history unchanged. C1 finite OAuth/monitoring remain closed: Task1 is not an MCP route, full package or runtime acceptance. Publisher metadata candidate05718105... is not proof of stored-secret identity or uploadability. operationalReadiness=false.

## Root execution clarifications after Native5

Task3 is accepted only when its fresh review is clean; use the BASE explicitly assigned by root, not this document's historical design source. Native5 source-only factories still fail closed; this task installs none. The accepted original strict finite-plan decoder is now exported read-only by lib/mcp-qa-finite-trial-control.mjs; reuse existing schema/field algorithms wherever this task consumes legacy/module/configuration structures. Ask root only for a concrete missing exact contract, not a routine design preference.

Record codecs validate exact canonical shape and internal correlations available in that record. Cross-record and current-time assertions (for example an ACK cannot predate its actual SEND, exceed its issued deadline, or be in the future of the journal's actual now) belong to the source-fixed journal/store transaction with the supplied lease; do not smuggle a caller current-time/authority field into the exact schemas. A record's cryptographic digest remains data, never an authenticated capability. Preserve ambiguous committed storage work as uncertain and reconstructable; never retry a remote effect from a journal result.

The original owner flow must separately explain configuration preparation, READ/notices and the synthetic known-goal Save; Task1 does not implement those actions or fabricate their proof. Actual full writer settlement/source/provider/custody/profile/business route acceptance remain later gates. The temporary branch qualifier must be narrowed to this task, excluded from integration, source-only with contents:read/no secrets/artifacts/deploy, and documentation-only commits must not repeat its test run.
