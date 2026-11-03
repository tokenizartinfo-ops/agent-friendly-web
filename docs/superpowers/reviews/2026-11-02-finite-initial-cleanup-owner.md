# B2b mounted initial cleanup — independent source review

BASEdc337e624bc77a6e54a8f7a105c4199ec4f619d5 → HEADfd6fb939405d02a168ff5f04f162dca1a8b6d20e; full11patch package at89fdc35b. Fresh reviewer/root/review_initial_cleanup_owner: Spec Issues found; Quality Needs fixes;0Critical.

## Important — fix round1/5

1. **Completed-state shortcut bypasses journal consistency.** lib/mcp-qa-finite-initial-cleanup.mjs:66 returns the receipt outcome after checking only its planHash. A completed never_activated state accompanied by a valid activation SEND without completion still returns never_activated; similarly, a restored receipt can survive missing or contradictory restore journals. This violates the explicit missing/contradictory-state and unknown-SEND rules. Validate the complete outcome's required/forbidden journal set and all cross-record hashes before returning it. Add focused native tests that introduce these contradictions after completion and require admin_pending, with no effects.

2. **Activation need not follow the arm ACK.** lib/mcp-qa-finite-initial-cleanup.mjs:152–154 validates both records against the forward deadline but never requires send.issuedAt >= armAck.acknowledgedAt. Consequently, recovery accepts activation before acknowledged cleanup ownership. The SYN producer at test/fixtures/finite-initial-entry-world.mjs:29 actually uses I0+1000, independently of the later real arm ACK. Enforce causal ordering, generate positive fixtures after that ACK within the original deadline, and reject an otherwise valid pre-arm SEND.

3. **Verbatim duplication of the lease implementation.** lib/mcp-qa-finite-initial-cleanup.mjs:21–37 copies lib/mcp-qa-finite-initial-entry.mjs:20–36, including promise retention, monotonic checks, narrowing, abort races and child deadlines. This is an Important maintainability defect under the review rubric: fixes to a safety boundary can diverge between forward and cleanup execution. Extract the shared internal mechanism while keeping each caller's original deadline and authority boundary explicit.

Root ruling: all three are real task gaps and do not conflict with spec. Enter fix loop, same recovery implementer owns code; no controller product fix. Shared INTERNAL lease utility is not a new public effect/clock-selector API; each fixed actual caller must retain its original setup or cleanup-only bound, source ceiling and holders. No renewal or body/clock facts from a caller DTO.

## Minor deferred

Existing job/dependency warnings: punycode, esbuild-kit, ESLint9.39.4 and ActionsNode20→24; disclose in report and retain final whole-branch maintenance triage. No suppression or unrelated upgrades.

## Checks and limits

Strong private same-winner arm227–259; native delivery reservation68–86; once restoration151–175; strictrecordbounds22–43; native35testgate28–81. Root verified exact41553851713/attempt1/headb38d145:35focused/163regressions/23compilerPASS0fail/cancel/skip/lintPASS/artifacts0, reportedbytes/graphs matchprimary. Additional focused reads: inheritedcodec bounds, duplicatedclock, nominalalarmwriter. No reviewer provider/writes/reruns. Alarm precheck race not demonstrated: storage-onlychain plus transactionalnominalHEAD; nativeinputgate/retryexclusion remainsunverified, notinventeddefect. Manualalarm/futureactivation/provider/clocks/custodySYN, noactualscheduler/native9aa/liveactivation/fullcleanup/PCoff claim.
