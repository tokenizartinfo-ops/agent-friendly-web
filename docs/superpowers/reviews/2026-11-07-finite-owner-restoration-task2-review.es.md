# AFW Task2 — independent task review, 7 November 2026

Reviewer: finite_owner_cleanup_review (Astra high, fresh context). Range: 2c6b5a0eb503b8d877158f85832c510b9a45f7ca..aa1e9dc0161ffa0b56777a96aa274cff272484cd. Read-only; no tests, writes or provider operations. The following is the reviewer's report, preserved verbatim apart from this header.

Spec Compliance: **FAIL — two Important requirements remain unmet.**

Task Quality: **CHANGES REQUIRED.** The recorded 51/51 qualification supports the exercised scenarios, but does not cover the two defects below. No Critical finding.

Reviewed the complete 13-path BASE `2c6b5a0` → HEAD `aa1e9dc` package against the brief and its latest rulings. File references below use HEAD unless otherwise identified. No writes, builds, tests or provider operations were performed.

**Important I1 — The historical SDK selector is used without validating the current grant object.**

Evidence: [lib/mcp-qa-finite-owner-cleanup.mjs:661](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/aa1e9dc0161ffa0b56777a96aa274cff272484cd/lib/mcp-qa-finite-owner-cleanup.mjs#L661), especially lines 680–690; the unused guarded `get` facility is at lines 630–636.

When `sdk.reference` exists, cleanup takes its ID and proceeds directly to `api.revokeGrant(selector, subject)`. There is no read of `grant:subject:ID` and no comparison of its current correlation, subject, client, resource or scopes. Consequently, an existing object with the original key but conflicting contents is deleted along with its token prefix, and cleanup can record `returned`.

This is explicitly prohibited by [design:85](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/ead56350882d81e3edf4952cb2658587b5fdd118/docs/superpowers/specs/2026-11-06-finite-native-owner-restoration-design.md#L85). A focused check of pinned SDK1.2.1 confirms that [`revokeGrant`:7079–7120](https://github.com/cloudflare/workers-oauth-provider/blob/1fafae23a0328f49ec3a30c433dfbe502ab3d1a6/src/oauth-provider.ts#L7079) only lists/deletes tokens and deletes the grant; it does not supply the missing validation.

Fix: perform the bounded exact-key native read and qualification before deletion, retaining its actual promise and guards. Permit genuine absence under the original reference without treating it as ACK. Preserve the historical reference’s expiry semantics. Add focused cases for matching, absent and conflicting current objects; conflicts must produce zero deletes and no successful observation/receipt.

**Important I2 — The final receipt omits the required fresh operational inventory after SDK reduction.**

Evidence: [lib/mcp-qa-finite-initial-cleanup.mjs:178](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/aa1e9dc0161ffa0b56777a96aa274cff272484cd/lib/mcp-qa-finite-initial-cleanup.mjs#L178), lines 208–209; [lib/mcp-qa-finite-owner-cleanup.mjs:693](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/aa1e9dc0161ffa0b56777a96aa274cff272484cd/lib/mcp-qa-finite-owner-cleanup.mjs#L693), with snapshot contents at lines 490–495.

The last broad `gates()` runs before `finishPrivateQaFiniteOwnerCleanup`, which subsequently performs SDK I/O. Its final observer rechecks anchors, M/QA, issuer and notice facts, but does not reacquire Workflow status, Container inventory, schedules/tails or the closed operator. Those fresh facts are also absent from `finalFactsHash`. `State.complete` and alarm deletion can therefore follow a newly active workflow, schedule or operator change occurring during that interval.

The already-complete branch likewise invokes owner finishing at initial-cleanup lines 90–94 without running those inventory gates. The anchors dependency only reads local anchors; it does not secretly provide the omitted inventory.

[Design:98](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/ead56350882d81e3edf4952cb2658587b5fdd118/docs/superpowers/specs/2026-11-06-finite-native-owner-restoration-design.md#L98) requires a **new final inventory after SDK reduction and before OwnerCleanup receipt**. [Brief:57](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/c478cc7e85c093614c7ae705ce2ec76615ed8207/docs/superpowers/briefs/2026-11-06-finite-owner-restoration-task2.md#L57) also requires inventory pins and timestamps in the final facts commitment.

Fix: compose a fixed final inventory qualification before receipt persistence and bind its factual results/timestamps into the receipt. Preserve the existing alarm as the sole restore writer. A focused drift test should change an inventory condition after restore while SDK work is pending and verify that neither receipt completion nor initial completion occurs.

**Minor findings**

- **M1 — Cleanup metrics do not satisfy the requested breakdown.** Native capture records child timings, aggregate SQL calls/time, KV lists/deletes and provider-request count, but lacks the requested per-phase provider/DO bytes, reads/cancellations and observed concurrency. Evidence: `test/mcp-qa-finite-owner-cleanup-native.test.mjs:20`; report:233 explicitly acknowledges the missing breakdown; brief:70 requires it. This limits cost/budget assessment, although the report appropriately avoids claiming real-provider feasibility.
- **M2 — The new SDK boundary test covers only part of the reduction facet.** `test/mcp-qa-finite-owner-cleanup-native.test.mjs:67–71` exercises two lists, 100 deletes and a foreign prefix, but not the 200-delete boundary, refusal of a third page or measured peak concurrency. Report:90 states this accurately. Strengthen that focused coverage without representing it as Task1 readonly-reader coverage.
- **M3 — Diagnostic output is predictably truncated.** `test/mcp-qa-finite-owner-cleanup-native.test.mjs:22` prints the entire result, including extensive child/failure arrays. Report:180 and :184 confirm truncation and subsequent artifact recovery. Keep complete JSON artifacts, but print bounded summaries with artifact references. This is maintainability/test-noise debt, not missing evidence in the recovered results. Inherited package/action/Node/CIMD warnings remain recorded at report:76; this task provides no basis to declare them resolved.

**Specific strengths**

- Reduction and receipt capabilities are private object identities with one-way state and single consumption; clones and foreign leases cannot substitute. Evidence: `lib/mcp-qa-finite-owner-cleanup.mjs:598`, :649–651, :702–706.
- Own uncertain effects block completion and are not replayed; reconciliation stays distinct from the missing ACK. Evidence: owner-cleanup:546–556, :565, :579, :657; native tests:76–103 cover restore uncertainty, fence reconciliation and restart without SDK replay.
- Monitoring cleanup uses the same-store barrier, native SQL clock/window, exact original consent and append-only withdrawal with fresh readback. Evidence: `lib/mcp-qa-finite-preparation-issuer-store.mjs:216–247`; native tests:130–149.
- Persistence qualification preserves scripts, native files, namespaces and original clocks, and checks cold-loaded rows before the alarm. Evidence: `test/fixtures/finite-owner-cleanup-persistence.mjs:22–55`, :118–149. The principal and g0 expiry assertions share the same occurrence at native tests:31–44.
- The revised g5 oracle distinguishes closed service from D1 denial and preserves response diagnostics before assertions. Evidence: `test/fixtures/finite-owner-cleanup.mjs:215–278`; native tests:106–127; report:198 explicitly records `toolCallAttempted=false` and `D1DenialProved=false`.

**Cannot Verify / remaining gates**

- Whole-plan compatibility and operational readiness are outside this Task2 gate. Root should complete the separately planned combined review from whole-plan BASE `7aab233`, preserving accepted Task1 interfaces and the historical findings. Task2’s own receipt exposes only the bounded business-closure result (`owner-cleanup:704–706`); it does not establish third-CLOSED, prearm, nominal handoff or PC-off operation.
- Exact inherited warning messages/severity are not reproduced in the packet’s report:76. If needed for the combined gate, Root should inspect its already-fetched qualification job logs and retain concise warning excerpts; no rerun is necessary.

Focused outside-diff checks were limited to the pinned SDK revocation implementation, the cut `gates()` body plus its anchors dependency for I2, and shared stage-work release/exclusion logic (`lib/mcp-qa-finite-stage-work.mjs:8–23`, :54–90). Task1’s producer was not re-reviewed.
