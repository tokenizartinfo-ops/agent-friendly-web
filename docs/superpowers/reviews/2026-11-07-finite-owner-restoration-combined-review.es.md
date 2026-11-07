# AFW — independent combined SOURCE-plan review

7 November2026. Fresh solo reviewer finite_owner_restoration_combined_review, gpt-6-astra/high, read-only. Range7aab233741b09f8873bf04831ca2fa9a9c2b1c4d..29681cae2bf1094ec5c66d5b2784254f77bec697. Root preserves the independent report below; exclusions receive explicit Root rulings in the living ledger. No main/runtime/PC-off approval follows from this record.

## Independent report (verbatim)

**Combined review verdict: PASS for bounded SOURCE-plan integration, with seven tracked Minor findings.** I found no Critical or Important defect requiring correction before that integration. This does not approve main promotion or runtime operation.

Review scope: `7aab233741b09f8873bf04831ca2fa9a9c2b1c4d` → `29681cae2bf1094ec5c66d5b2784254f77bec697`. I reviewed all 19 complete file diffs, including both reports, against the binding spec and current appended rulings. I performed the review myself, read-only, without tests, builds, clones, mutations or runtime calls.

I also independently compared the tested and final trees: the only differences are retirement of the temporary qualifier and the report append. Production and test blobs match the successful run. GitHub confirms run `42390108314`, attempt 1, completed successfully at tested Source `92d0255a2d5c2ac2249941e8348a0d5701742604`. The supplied coherent evidence records **56 passes, zero failures/cancellations/skips/todos**; I did not combine successes from different runs.

**Strengths**

- **Task1 makes the redirect depend on actual SDK completion and durable Reference persistence.** Correlation binds the original root, expected grant, complete SEND and identity. Transaction, sync and exact readback precede redirect; a ledger row cannot substitute for the original promise’s normal return.
- **Authority remains private and tied to the original execution.** Readonly enumeration and destructive SDK reduction use separate restricted facets. The implementation checks the original holder/lease around I/O, retains started promises after logical expiration, and prevents queued emission following failure. Cleanup outputs are private, one-use objects bound to the original context, environment and lease.
- **Task2 composes the original cleanup machinery.** It preserves the original alarm, actor, three slots, counter, clocks and owned restoration writer. Freeze/fence/grant/monitoring withdrawal precedes baseline restoration and bounded SDK reduction. Unknown SEND outcomes prevent completion or replay; reconciliation does not manufacture ACKs.
- **The I1 and I2 fixes address their actual failure modes.** At `lib/mcp-qa-finite-owner-cleanup.mjs:644`, the current native SDK object is validated before deletion. At lines 755–760, that validation precedes SEND and actual SDK invocation. At lines 767–775, operational inventory and owner state are freshly read before receipt creation or reuse.
- **The evidence preserves useful distinctions.** Held outward ACKs are distinguished from pending physical KV operations; the adversarial SDK-only graph is distinguished from ordinary M admission; post-C0 denial is correctly classified as service-window closure rather than a demonstrated D1 tool denial. Receipt fields explicitly reject global native-drain and namespace-empty claims.
- **Restart and partial-failure coverage is substantive.** Genuine persisted lineages exercise cold recovery, partial issuer/notice states, foreign pointer preservation, unknown restore/fence outcomes, retained SDK effects, current-object conflict, and inventory drift. The reports retain failed history instead of replacing it with the final success.

**Issues**

Critical: **None found in the reviewed range.**

Important: **None found in the reviewed range.**

Minor findings remain open:

1. **Task1-RM1 — Historical RED graph preservation is incomplete.**  
   Location: `docs/superpowers/reports/2026-11-06-finite-owner-restoration-task1.md:69`.  
   Trigger: the original RED artifact upload selected the wrong generated-output directory.  
   Impact: the causal RED TAP and marker survive, but its generated scripts/metafiles cannot be independently inspected from that artifact. GREEN graphs cannot repair this historical omission.  
   Fix: preserve the explicit exception and require correct artifact inventory/readback for subsequent qualification. Do not reconstruct or rerun the historical RED merely to make the record appear complete.

2. **Task1-RM2 — Readonly SDK facet limits lack direct boundary coverage.**  
   Locations: `lib/mcp-qa-finite-owner-cleanup.mjs:46`; `test/mcp-qa-finite-owner-sdk-reference-native.test.mjs:12`.  
   Trigger: lookup reaches two full pages, the 200-get boundary, a forbidden third page, or expiration with a populated queue.  
   Impact: inspected guards fail closed, but current native cases do not directly establish every limit and queued-expiration behavior. Task2 reduction coverage does not cover this distinct reader.  
   Fix: add directed, authorized boundary cases before promoting reliance on the full advertised lookup envelope.

3. **Task1-RM3 — Operational latency and volume remain insufficiently characterized.**  
   Locations: `docs/superpowers/reports/2026-11-06-finite-owner-restoration-task1.md:76`; `test/fixtures/finite-owner-cleanup.mjs:137`.  
   Trigger: repeated validation and body processing consume the original five-second child budget under less favorable conditions.  
   Impact: one historical principal failed before SDK completion at 5065 ms without identifying the exact operation; large SYN body aggregates remain an operational risk. A later pass does not establish real quota, RTT, CPU or memory viability.  
   Fix: qualify phase-specific cost and worst-case budgets before runtime promotion, preserving the existing clocks and authority checks.

4. **Task1-RM4 — Inherited warnings still require ownership and disposition.**  
   Location: `docs/superpowers/reports/2026-11-06-finite-owner-restoration-task1.md:137`.  
   Trigger: qualification emits RPC-stub disposal, dependency/API deprecation, Actions runtime-transition and SDK configuration notices.  
   Impact: the current evidence does not establish their exact owners or demonstrate a new correctness failure. The RPC warning nevertheless leaves lifecycle maintenance unresolved.  
   Fix: trace warnings to their owners and record deliberate dispositions in maintenance work. Do not enable CIMD, suppress warnings or upgrade dependencies incidentally to this plan.

5. **Task2-M1 — Diagnostic accounting is not sufficiently separated by phase and resource.**  
   Locations: `docs/superpowers/reports/2026-11-06-finite-owner-restoration-task2.md:233`; `test/fixtures/finite-owner-cleanup.mjs:137`.  
   Trigger: diagnosing an over-budget child or projecting provider limits requires distinguishing CF/GitHub/DO/SQL/KV activity, body cost, cancellation and concurrency.  
   Impact: coarse counters and partial spans cannot answer those questions reliably. Root’s additional final-run observations improve the record but do not supply endpoint/phase attribution or prove common denominators.  
   Fix: introduce attributable bounded diagnostics and qualify the resulting operating envelope before promotion. Do not label SYN aggregate observations as real provider requests.

6. **Task2-M2 — Reduction facet maximum boundaries remain incompletely exercised.**  
   Locations: `lib/mcp-qa-finite-owner-cleanup.mjs:629`; `test/mcp-qa-finite-owner-cleanup-native.test.mjs:73`.  
   Trigger: SDK reduction approaches 200 total deletes, attempts a third list, or fills its two-operation queue.  
   Impact: the existing native case demonstrates 100 deletes, two lists and foreign-prefix refusal, not every maximum boundary or observed peak of two. The implementation has explicit fail-closed limits; this is a qualification gap, not an observed overrun.  
   Fix: directly exercise the limits, including that the final grant deletion consumes the same total-delete allowance, before promoting the maximum reduction profile.

7. **Task2-M3 — Oversized console diagnostics truncate useful evidence.**  
   Locations: `test/mcp-qa-finite-owner-cleanup-native.test.mjs:22`; `test/fixtures/finite-owner-cleanup.mjs:138`.  
   Trigger: a complete result object is serialized into one large console line.  
   Impact: g3/g4 console output truncated, making review depend on artifact retrieval. Complete artifacts and strict readbacks preserved this run’s evidence; the diagnostic design remains fragile.  
   Fix: emit concise console summaries with artifact path/hash and keep full sanitized JSON in artifacts.

**Deferred-item triage**

| Item | Before bounded SOURCE integration? | Required disposition |
|---|---|---|
| RM1 | No | Preserve historical exception; never substitute later graphs. |
| RM2 | No | Boundary qualification before promoting the full readonly envelope. |
| RM3 | No | Measured operating-budget gate before runtime promotion. |
| RM4 | No | Tracked maintenance; resolve relevant lifecycle/runtime warnings before relying on affected environments. |
| M1 | No | Phase/resource accounting before runtime promotion; combine analysis with RM3 without erasing either finding. |
| M2 | No | Separate reduction-boundary qualification before promoting its maximum profile. |
| M3 | No | Diagnostic maintenance for subsequent qualification; current recovered evidence remains valid. |

These classifications follow the current effects and evidence, rather than a severity ceiling. None demonstrates an authority bypass, unauthorized deletion, false ACK, lost actual-promise exclusion or false successful completion in the reviewed implementation.

Pre-BASE Minor M-I/M-II/M-III, historical M1/M2 and M4-closed retain their existing statuses. This review neither reopens nor silently waives them.

**Recommendations**

- Integrate this bounded plan with the seven findings and their promotion gates explicitly retained.
- Keep the final run, tested-to-final blob comparison and historical exceptions attached to the acceptance record.
- For later authorized qualification, prioritize boundary tests and attributable performance measurements. Do not widen clocks, substitute older bundles or infer runtime viability from this pass.
- Preserve the current distinction between business closure, bounded SDK reduction and unproved global physical drain.

**Declined to judge**

- The earlier 954-commit Source history and pre-BASE implementation quality: outside this review range.
- Main integration, repository-wide regression safety and promotion readiness: separate gates; no full suite or merge was authorized.
- Real provider quotas, latency, runtime compatibility, custody validity and availability: SOURCE/SYN evidence cannot establish them.
- Real subscription, useful delivery, native withdrawal across arbitrary actors/isolates, and PC-off operation: not exercised and explicitly outside current scope.
- Third CLOSED, prearm, full setup and nominal handoff: remain denied future states.
- Global SDK namespace emptiness and physical drain: deliberately unproved; the receipts correctly say false.
- Exact attribution of the historical 5065 ms failure and inherited warnings: existing diagnostics are insufficient to establish their causes.
- Physical KV-expiration equality in the late-write case, and a post-C0 business-tool D1 denial: the recorded experiment does not establish either claim.

Root should explicitly retain or rule these exclusions; none is an implicit approval.

**Spec Compliance and Quality verdict**

**Functional and authority compliance: PASS within the current amended scope.** Task1 and Task2 compose correctly across the inspected interfaces, including the current-object and final-inventory fixes. No separate plan defect requiring redesign was established. Qualification completeness remains limited by the seven findings above, particularly performance accounting and maximum-boundary coverage.

**Combined SOURCE-plan integration: PASS.** No corrective code change is required before this bounded gate based on the reviewed evidence.

**Operational limitations:** `operationalReadiness=false`, `completePackage=false`, `PCoff=false`. This verdict authorizes no main merge, provider execution, credentials, permissions, new trial, real subscription or real delivery.
