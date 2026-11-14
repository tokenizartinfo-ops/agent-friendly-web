# AFW current-frontiers final fix: one scoped re-review

Disposition: APPROVED for the aggregate diagnostic-contract fix wave. I1-I5 and M1 are addressed. No new breakage was found in the fix diff. This is exactly one scoped re-review, not a second whole-unit review.

New findings: Critical 0; Important 0; Minor 0.
Prior findings: addressed 6; not addressed 0.

## Scope and authority

Repository: tokenizartinfo-ops/agent-friendly-web.
Read first: Rootdocs 236f403cbba768866584cef307552eab5951c8c8, docs/superpowers/reviews/2026-11-14-current-frontiers-final-fix-scoped-package.json, blob 6e43b526d9b6442cf81e0cbe005d5ad50f8dad91.
Prior review: 27a3f544f73661b579ed8dc5b994fff4ae8c9f77.
Brief: 3b500ace0be41a9a1a0449e685920d9d498d41da.
Fix report: a38c558ed3d4730fd84575502911662311b6b4ab.
Program diff: ae21fca48026664ec6997734fe8b5551dfcb92dc (32307 bytes; SHA256 e76375410afe5466bc4209a0c85d4673422a0fee54fc5b40809f4d520b5291fd).
Reviewed only these fixes and their controls plus new breakage caused by them. Existing business Native failures, historical cause, roadmap and the next source-site unit are outside this review.

Source chain supplied by the scoped package:
- BASE CLOSED 1e4026ceb0c43efe1ccd815a874e10375646753b.
- INACTIVE 053288df8e3465269539f800bfc9f4eaf2d800bd.
- ACTIVE e98c810105288d50d9bd2b17fa1ce858078b86b5.
- CLOSED 327e9b7ec2182588dfb02e58b238787abb37a017.

## Finding verdicts

### I1 — addressed

Pinned receiver.mjs, blob 81799fa3b8fc675577dd083f77c7fa940f342bf0, line 72 returns nativeCommandExitedZero and removes nativeBusinessPassed. Lines 36 and 68-70 reject exit 0 with a non-null primary catch, require a known bounded exit for complete coverage, and require the positive catch state to agree with that exit. Historical positive exit 0/null catch remains accepted as the scoped observation. The actual I1_scoped_exit_observation and I1_zero_exit_primary_rejected controls are green. The closure explicitly deprecates the obsolete business-pass interpretation without rewriting historical records. No P1, consumer or broader business pass follows.

### I2 — addressed

Receiver line 57 requires safe numeric prefixFiles 0..4096 and prefixBytes 0..536870912 before first-limit arithmetic. Line 70 admits complete readonly diagnostic coverage only for complete/first_limit inventory. sender-stage.mjs, blob 31377a41bb4ad8824a545c507c0758840743996d, holds unknown/null-prefix inventory at unknown; future-native-main.mjs line 63 calls that helper. Focused controls independently null each complete/first_limit prefix, reject complete-stage unknown inventory, and check sender coverage. The historical numeric record and known first-limit record remain accepted. All eight I2/baseline acceptance relationships are supported by the actual green rows.

### I3 — addressed

limit-control.mjs, blob 7fcfad5af462399a18df732eb8cb58f10193d8a8, uses sparse truncate to 536870913 logical bytes, bounds physical blocks when supported, calls the production measure path, and asserts its first-limit DTO. inventory.mjs retains the original anchored/unsorted traversal, original guard and hashFiles=false path; its real guard fails before material content reads. The only inventory production change is the unknown-hint fix.

Both mutants target production code: observer disconnected at line 102 of blob da4fa9e34af73d29761741faa5deb172079ece45; first_limit conversion disabled at line 124 of blob ba2ab01a9a397554c09c0988bef241874dfe5076. The qualifier requires metadata probes still to exit 0, actual real-path probes to exit 1, an observed unknown DTO after traversal, and ERR_ASSERTION rather than a generic failure. Actual receipt reports both mutation pairs, real traversal, AssertionError, logicalBytes 536870913, allocatedBlocks 0 and the exact first_limit bytes/prefix 0/ordinal 1/next 536870913/region root DTO. This qualifies a synthetic production helper path; it does not explain the historical custody limit.

### I4 — addressed

runtime.mjs, blob 815c32f1020ff1f32799ed47a652ced314a903f7, lines 9-31 starts false, reports nullable pending, sets true only on the child spawn event, and reports pre-open/synchronous/async-before-spawn failure as nonstarted. An error after confirmed spawn preserves partial state and waits for close instead of resolving early. The future Native driver no longer sets started in advance; line 47 propagates callback state and line 48 restores only after the awaited helper returns. Original arguments and clock controls remain unchanged in the inert future Native diff.

The actual controls cover a real short child, deterministic EISDIR pre-open failure, synchronous spawn failure, real failed-spawn event, and a spawned child's self-SIGTERM with observed partial state followed by close. All are green. These are ordinary synthetic Node child controls, not execution of the future Native driver/World/SDK. The future integration remains explicitly unexecuted DATA.

### I5 — addressed

Receiver line 19 requires trusted context.attempt===1 and wire.attempt===context.attempt while retaining source/run/job/tree bindings. I5_trusted_attempt2_rejected changes only the trusted attempt, and the actual row is green. The independent Root control receiver also binds trusted attempt 1.

### M1 — addressed

inventory.mjs, blob 33b802fc2042836306d3910d507b113f2c6c4a13, line 125 emits null for all four unknown numeric hints and false clipping. Receiver line 65 enforces that representation. The actual measure test observes private filesystem order, confirms a regular entry followed by an invalid symlink, then checks unknown/null hints. Five focused one-field receiver stale-hint/clipping negatives also pass. No path/name is projected. Known complete and first-limit inventory semantics are preserved.

## Evidence and independent DATA checks

The one existing control-only run is 43654648845, attempt 1, job 132630407652. GitHub run metadata independently read during this review reports push/head e98c810105288d50d9bd2b17fa1ce858078b86b5, completed/success; the only job and all its steps report completed/success. The preserved actual receipt records before 19 failed/4 passed, fixed 23 passed/0 failed, no cancellation/skips/todos, both production mutation kills and the semantic facts above. RootAccepted is supplied by the scoped package. I read Root's gate 8f06711ae5300aa7c25a0b0ffce61a417a215499 and its strict closed-control parent receiver 1c63281424f2d1bbda1faafddb7bec7b91afc993 as inert DATA; I did not evaluate either.

Independently decoded the unique embedded final-fix gzip/base64 payload in memory:
- Compressed 109745 bytes; SHA256 2d4e30ae4bb07d96b771e922b6d6475259db4f1fc18329aa0b5c31b9b7fa5e49; blob 56aaf1b24d256362818f96a261c709b06dfec56d.
- Expanded canonical JSON 570261 bytes; SHA256 16000dc2df60a458d96bf122fa9472064d3ca82964f8ea441700c94e7f913f62; blob 51c5eef222f3c7cc43f0f291a4b1403fb1e580a1.
- All 33 embedded programs reproduce their bytes/SHA256/Git blob pins and match the fix report. Program set SHA256 716cdeb6886a41584ee161eaca5f86246ff11ce6e1b448770d7c8eb2895a1ede. The embedded original workflow also reproduces its pin.
- Entire 847932-byte proposal is an exact prefix of final SAME.
- Final SAME independently hashes to 857320 bytes, SHA256 c45eea01d67a398b04bfbf177d144c4c9f93e9928b88ce2e8c1dcb0c49207d6f, blob 057c93ba0e250c8df77d658bb41f4dfb1b4455de.
- Fetch of CLOSED F7 reports original blob f7a71f1a0fa4f5ddf069ff411f008a098455e5cc. CLOSED commit lists only F7 and SAME as changed. Full Core3200/Main/head0/five-active0/terminal-before-CAS readback is supplied by Root's scoped package and closure ledger; this reviewer did not repeat a whole-tree or live-ref sweep.

The inactive F7 invokes only bootstrap DATA verification, qualify.mjs and closed emission, with one job, attempt-1 fixed gate, five-minute ceiling, no npm/install, no artifacts upload and no Native/SDK invocation. Corrected future Native programs are materialized DATA and are not invoked by the qualifier.

## Residual limits and actions

No residual issue from I1-I5/M1 and no new fix-diff finding was identified. Future Native paths remain unexecuted and require separate release/binding. Historical positive/readonly observations remain unchanged; the historical cause and old custody-limit event remain unexplained. The seven global nonclaims remain false, including operationalReadiness and PCoff.

No Source code was imported, evaluated, syntax checked, tested or built by this reviewer locally or remotely. Only read-only GitHub/public pinned DATA retrieval, string/JSON inspection, bounded gzip decoding and hashes occurred. No refs, workflows, Source files or Rootdocs were mutated. Cloudflare, keys, private artifacts, browser and mail were not accessed. No subagents were used. The only permitted write is this one unattached report blob. No fixes, reruns or new Native attempt are requested or authorized. The next source-site unit remains draft/inactive preparation only.

