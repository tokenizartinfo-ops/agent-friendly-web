# C2 Task3 independent review — initial gate

Reviewer: /root/review_private_policy_task3, fresh gpt-6-astra/high; read-only, no subagents or tests rerun.

BASE2e80783c1d821c3e507f5217ead421237cb87887; reviewed HEAD423c1bfafc863d97114848e66edbea8e97ea0429. Canonical compare30commits/30files; brief then report read at pinnedHEAD. Spec FAIL; quality needs fixes. One Important; no Critical or separate Minor.

**Important — final preparation work does not hold the publication barrier.**

At lib/mcp-qa-finite-connection-preparation.mjs:13–16, transport.run() executes before the producer checks its separate nativeWork registry. Meanwhile, the transport marks its work complete before returning to that producer (transport:155–161) and removes its barrier when the original parent finishes (transport:39–43).

- Trigger: finite activation and its receipt complete, then publishSelection or subsequent producer storage work remains physically pending past its child timeout. The producer returns admin_pending; HTTP parent.finish() removes the transport barrier although producer work remains outstanding.
- Impact: another admitted invocation can enter the fixed transport without consulting that outstanding producer work. The journal’s predecessor activation already has an ACK/receipt; its factual writer-head check does not supply the missing settlement barrier. nativeWork.has(ctx) is reached only after the new transport has performed its effects. This violates the explicit requirement to retain and gate on the entire admitted stage, rather than only the transport portion.
- Related loss within the same boundary: producer tracking at connection-preparation:30 retains the factual-reader promise, but that reader invokes nested child() operations through resolve/step. owner-preparation:63 races—and does not retain—the underlying promise. On timeout, the wrapper can settle while its actual source/storage operation remains pending.
- Fix: maintain one source-owned, admission-lineage barrier through transport, final producer, and nested factual IO; test it before any subsequent SEND. Release only after original-request completion and actual settlement of all underlying work. Add focused behavioral coverage holding final selection storage and a nested factual operation, then attempting another writer before releasing them. Preserve invalidated child guards and avoid exposing a new admission/mint API.

The focused dependency check found no existing shared barrier: lib/mcp-qa-finite-owner-source.mjs:3–10 remains default-unavailable; the transport and producer registries are separate private WeakMaps. T5’s future inventory requirement does not implement this required Task3 seam.

Strengths: original consume-only admission owner-preparation18–44; captured child before SEND and complete wire commitment transport123–144; atomic factual writer head journal55–85; full original approval/history/audit reconstruction owner-preparation311–374; existing SQLite/Container preservation profile21/Wrangler70.

Cannot-verify dependencies: actual M-qualified bytes/residency/source/custody/current primary/exposure/all legacy writers/initial publication/rollback T5 and attended; T4 native setup; C3 business/early withdrawal. These deferrals do not implement the missing Task3 settlement seam. Root retains them as future gates, not runtime acceptance.

Evidence: pinned report plus Root's independently read120PASS/run41457985200/job125319474707 at ec83c42f, wire41PASS/run41458964162/job125322787793, restart7PASS/run41460645920/job125328488776 at72ab2aea. Reviewer did not rerun tests or reread logs. Temporary qualifier excluded integration. operationalReadiness=false.

## Root C2 Task3 fix round1 — whole-stage actual settlement (2026-11-02)

Fresh reviewer /root/review_private_policy_task3 assessed BASE2e80783..423c1bf: spec FAIL, quality needs fixes, one Important settlement defect, no Critical or separate Minor. Original task is NOT accepted; Task4 remains undispatched. Review evidence: full targeted120PASS ec83c42f/run41457985200/job125319474707 and actual-restart7PASS72ab2aea/run41460645920/job125328488776. Root independently read both logs, actual run/head/attempt1/success and final423c1bf branch pointer. Later ec83..72ab changes only temporary workflow+three test/fixture files; no product drift.

Ruling: fix the existing whole-stage retention requirement in round1/5 using the original implementer. One actual native ctx/source-bound admission lineage must block another SEND across transport, final producer and every nested underlying source/storage/CF promise. Gate before effects, not after transport returns. Original parent finish, wrapper timeout, ACK/receipt and journal head are not settlement. Only actual fulfillment/rejection can remove underlying work; no force/reset/refund/timeout release or success DTO. Invalidated child guards and all original deadlines remain unchanged. A narrow shared INTERNAL factual retention component is permitted if needed to connect these existing owners: it can only retain/deny/observe outstanding actual promises and remove them on actual settlement, never create admission, allow an unrelated lineage, expose a caller send/mint/clear API, or replace T5 all-path native inventory. This clarifies memory ownership, not new authority.

Covering behavioral RED/GREEN: hold actual final publishSelection/storage work after producer timeout+HTTP parent.finish, then attempt a separately admitted writer before releasing it; likewise hold a nested factual-source/storage promise whose race wrapper has already settled. Assert no subsequent SEND/provider effect while outstanding, retain late work until actual settlement, and preserve committed factual history. Exercise actual native SQLite/Miniflare with synthetic source/provider qualification explicitly labelled. Use test/mcp-qa-finite-connection-preparation-native.test.mjs, test/mcp-qa-finite-policy-transport.test.mjs and affected owner-preparation native tests plus scoped lint; retain journal restart tests if shared barrier/journal is touched. No unchanged full suite/native compiler rerun unless a concrete changed dependency justifies it. Append fix report/tests/commands/output and STOP WRITES for same-reviewer scoped423c1bf..fix-docHEAD re-review.

Unimplemented T4/T5/C3 and actual acceptance remain separate gates; operationalReadiness=false. No source/CI result authorizes provider/private probes, credentials, auth/window, runtime deploy, main merge, finite HEAD or Max.


## Scoped fix round1 review — accepted by Root

Reviewed423c1bfafc863d97114848e66edbea8e97ea0429..43ebcacd9a3455a0c44f3f55ee6a1d7ed10366d2. Same independent reviewer /root/review_private_policy_task3: original Important ADDRESSED, scoped spec PASS, quality approved, no new breakage of any severity. Shared stage-work7–20/27–38 removes actual promises only on fulfillment/rejection and releases ctx only after request termination+empty work set; transport36–40 gates before source IO/SEND; producer15–24 reuses exact consumed admission; owner-preparation64–66 tracks underlying child operations before racing. Tests53–74 cover held final selection and held nested IO through parent.finish with a fourth actual decision/no new SEND. Reviewer fetched scoped compare once5commits13files, read brief/report, no writes/subagents/retests. Remaining T4/T5/C3/actual gates nonblocking for source Task3 only.

## Root C2 Task3 accepted after fix round1 (2026-11-02)

Task C2.3: fix round1/5 (1 addressed,0 open — whole-stage publication barrier now includes final producer and nested actual promises; commits423c1bf..43ebcacd).
Task C2.3: complete (commits2e80783..43ebcacd, fresh spec+quality review clean after scoped correction).

Original fresh reviewer /root/review_private_policy_task3 reported one Important at423c1bf; Root recorded it/ruling at a6dab660 and resumed original implementer. Same reviewer re-reviewed only423c1bfafc863d97114848e66edbea8e97ea0429..43ebcacd9a3455a0c44f3f55ee6a1d7ed10366d2: ADDRESSED both final-selection and nested-IO paths; scoped spec PASS, quality approved; no new Critical/Important/Minor or separate out-of-scope finding. Evidence lines: shared stage-work7–20 and27–38; transport36–40; producer15–24; owner-preparation64–66; native covering tests53–74. The common component is retention/denial only and does not mint admission.

Root independently read GREEN run41466161397 actual head62fb4122ab2991eb3d4781187369269ceb849623/attempt1/completed-success, job125347499185 log55PASS0FAIL0cancel0skip and scoped lint exit success; artifacts list0; final ref43ebcacd exact. Both new behavioral tests are visible in logs. Prior full scoped120PASS ec83c42f/run41457985200 and actual restart7PASS72ab2aea/run41460645920 remain separately dated evidence; no false claim of new full120 at fix head.

Cannot-verify resolution against owning plan/brief: actual M-qualified resident bytes/source/custody/current primary/exposure/all previous writer lineages are explicitly owned by T5 and remain default unavailable; initial preparation publication/recoverable rollback and real runtime identity/consent/PCoff are attended gates. T4 setup and C3 business/early withdrawal are separately unimplemented tasks. These are not silently accepted as runtime evidence or parked Task3 defects. Task3 required composition/settlement seam is implemented and now reviewed; no overall C2/package/runtime readiness claimed.

Report docs/superpowers/reports/2026-11-01-finite-private-policy-setup-task3.md; review docs/superpowers/reviews/2026-11-01-finite-private-policy-setup-task3.md. Temporary qualifier excluded integration. No main merge/runtime/source promotion, provider/private probe, credentials, consent/window, occurrence/finite HEAD, Max or email. operationalReadiness=false.

Task C2.4 is next, prepared in its scoped brief and dispatched only after this documentation commit's CAS/ref/file qualification. Original Task3 implementer remains stopped; fresh implementer/BASE supplied by Root dispatch.
