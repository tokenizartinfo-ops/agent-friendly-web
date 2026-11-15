# Scoped final-fix review — AFW readonly source-site diagnostic

**Verdict: accepted scope addressed. Remaining findings: 0 Critical / 0 Important / 0 Minor.**
Spec compliance: PASS for I1–I3/M1–M2. Fix quality: PASS within this scoped DATA review. Addressed: 5/5; unaddressed: 0/5. No remaining load-bearing issue attributable to this fix wave was identified.

This is the ONE scoped re-review after the aggregate final-fix wave, under SDD/requesting-code-review. It does not reopen the whole-unit review, C2, prior units, or the underlying R3 business diagnosis. No second fix wave or execution is authorized by this report.

## Authority and exact inputs

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (public repository ID 1347578006); ENVIRONMENT cloud GitDB read-only; ORIGIN GitHub; RESOURCE_TYPE pinned public Source/program/report DATA; ALLOWED_ACTION inspect and create this one unattached Markdown report blob. No refs/runtime mutation; rollback is discard of the unattached report.

The scoped brief was independently read at Rootdocs commit `2a11c709e4ee416774a99509c9bbf275df2c26ff`, path `docs/superpowers/briefs/2026-11-15-readonly-site-finalfix-scoped-review.md`, matching blob `ed7e815903de36228a851ede57e0af10f62ea2fe`. Accepted requirements: `d678c976ea3e0749887b00c0987f3774e83a46b9`; original findings: `0a937f989b22115589a2164b7c169f26d21b1cf0` (C0/I3/M2); preparation metadata and four diffs: `c5574e3eb07b70689881a8085148dcf4c45ff9ee`; Root gate: `808afdf4e5a45b78f0dbc12b2a11561f256ed27a`.

Pinned program abbreviations used below:

| Name | Exact blob |
| --- | --- |
| contract | `a4713c4eba8b449c955fac11273559d4acedfbbd` |
| controls | `16ff5fe98006147916d9f31a9106852ceec1ed18` |
| main | `ca4fc0dcf6ffe8a14771e0f7661824d71a899685` |
| emit | `c11aab85f14993451be5cbc88eb2ff9f4a5c7e6a` |
| Root receiver | `518e5be786a43023a5bfc0007f1a97c1d363d001` |
| suite | `f898b2739b1509fd1d7f44cdfd20dd2c91b84638` |
| helper probe | `2e29c7b5c40c4d01ba8fb89e9715886c4d4e3189` |
| bounds probe | `888b79950c84ba153c3c66cffffd3bde53152aea` |
| qualifier | `aa46a1c23f602c9ca61cf85a7865504609736450` |
| loader | `67898d1d16b57d61410f1f59585f5423d5e0164d` |

## Disposition of the five accepted findings

**I1 — addressed.** Contract lines 28–33 export the actual `revokeLocations` helper: every row, precase and firstFailure alias becomes unknown; all three after-proof flags become false; count becomes zero, collection incomplete and stage unknown. Command, row results and summary are preserved. Main imports it at line 7, latches `afterProofFailed` at line 11, uses it on the post-run verification failure at line 44 and again on final verification failure at line 46. A later successful final verification cannot restore after-proofs once the latch is set. Contract lines 50–51 and independent Root receiver lines 24–26, 36–37 require all six provenance proofs for every positive usable count regardless of stage, with firstFailure consistency and recomputed counts. Controls lines 78–80 exercise actual helper revocation and validator rejection. Helper probe lines 5–13 imports that production helper and validates mapped R3, mapped file-precase and null/unknown-result cases with both actual validators. Its assertions preserve observed outcomes and clear all aliases/after flags. The mapped R3 after-failure vectors are real DATA fixtures, e.g. `ee50ea1bf1de9f627cc0aa652cde7181bccb8854` lines 492–609 retains the mapped R3 and count one while the world-after proof is false; suite line 33 demands rejection by each actual validator.

**I2 — addressed.** Contract lines 14–18 and Root receiver lines 27–33 reject all three wrappers `testTimeoutFailure`, `cancelledByParent`, `testAborted` in any failed row or precase when the terminal stream claims validity. The existing unknown-stream branches remain conservative (contract line 24; Root receiver line 34). The six row/precase vectors in blob `ee50ea1bf1de9f627cc0aa652cde7181bccb8854` lines 852–1580 maintain matching counts, firstFailure, exit and zero usable aliases, so the wrapper contradiction is discriminating. Suite lines 8–9, 32–33 exercises sender and independent Root receiver. The historical actual wrapper remains `testCodeFailure`.

**I3 — addressed.** Contract lines 43–48 and Root receiver lines 14–19 require started=true and ended=true for concrete terminal signals; definite no-launch requires none and unknown launch requires unknown. Suite lines 10–12, 35–36 covers pending/unknown contradictions and legitimate closed, hold and unknown positive pairs on both validators. Its lines 14–30 invoke the actual emitter under isolated fixture roots, including the semantically impossible no-child SIGTERM shape; they require conservative fallback. Emit lines 6–8 performs validation and emits the unknown-launch fallback. Production controls lines 82–91 retain missing and malformed controls and add the signal/proof contradictions. These fixtures explicitly do not claim a new business invocation.

**M1 — addressed.** Controls line 66 constructs named frames with intact location syntax at exactly 1024 and 1025 ASCII units and bytes; the first maps and the second is unknown. Other stack and frame-count bounds remain at lines 62–65. Bounds probe lines 5–8 independently constructs and asserts the same pair against the production projector. The inspected production `site.mjs` blob `b6cafcb75b4b158f7c36bbf336bf50b048699c4c` line 7 contains the frame guard; mutant blob `0338703c63a6b1193d59e9babfbfc0a24fed2033` is text-exact to it with only `!bounded(s,1024)||` removed. The mutant still satisfies the valid frame grammar at lines 8–13. Qualifier line 27 requires fixed exit 0, mutant exit 1, the 1024 positive preserved in both and the 1025 assertion failing only for the mutant. This is a discriminating guard control.

**M2 — addressed.** Contract lines 37–38 requires a trusted context with count exactly 18 and both expected digests whenever proof is verified. Main line 10 and emit line 6 provide expectations from their loader binding, not from the record under test; there is no new set/expanded digest literal inside any of the four fixed production members. Root receiver line 13 retains the independently supplied expected set/expanded pins and cardinality 18. Controls lines 73–75 uses bound fixture digests/count 18; lines 80, 83–90 rejects contradictory count/set/expanded proofs, including actual emitter fallback. Loader lines 18–24 verifies payload/program membership and recomputes production metadata from the pinned programs before generating the binding. Qualifier lines 17–18 derives isolated before/fixed fixture bindings from that verified outer binding. Suite lines 8–9, 23, 34, 37 independently handles expected contexts, emitter positive and contradictory proofs, and historical actual compatibility.

Production manifest `dc05f770fae4983b4087477f5090e48dee600fba` line 1 has exactly 18 entries matching the prepared production pins, distinct from control payload 49. Production set: `e4efb6f96edb03473948bebc62614a75139ec1ce906377ef26c1428a6fd542a4`; expanded: 95515 bytes / `d5d194995bb0091fb6962d8d229bf114a581463c5fe42185c1a333b224cd0da7`. The independent raw Root receiver equals module blob `a6c45c42425669baa774a19aeef3cf7355f4d716` with only the `export default ` prefix added, verified by exact text comparison.

## Recorded qualification and independent DATA checks

Actual report `5dad819d844d70c97d77a9618446d19af5cba938` was also read at the exact Rootdocs path `docs/superpowers/reviews/2026-11-15-readonly-site-finalfix-actual.md` and matched exactly. Public GitHub API metadata independently confirms [run 43661818015, attempt 1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43661818015), one controls job 132652590490, completed/success, source `1874acaebe746104f299eb6c5b08178222d49626`, tree `14b1b8dafed8a51e97e6e0a0709efd4d94f8c760`. The job ended at 2026-11-15T01:10:52Z.

As DATA, both complete 59-row streams were compared in order with matrix `5940b7ee0d6e0ddc9a4acf6e16063a7298574b67` line 1: every ID/result matches its expected side. Actual report lines 264–275 records before 39 failed / 20 passed; lines 520–531 records fixed 59 passed / 0 failed; cancelled, skipped and todo are zero. These before failures are expected failed rejection assertions exposing the old flaws, not new business failures.

Actual report lines 534–559 records C1–C6 six groups passed with usable shape/columns, shared production helper three cases passed, fixed 1024 mapped/1025 unknown, guard-removal mutant killed while retaining 1024 mapped, and historical actual accepted. Qualifier lines 10–12, 19–27 verifies the complete expected matrix and invokes the actual controls/helper/bounds components; suite does not merely copy success metadata.

Independent qualification receiver `266ba951b4e77321fbcb89756e7aad183faf1447` lines 9–24 binds actual source/tree/run/attempt/job, control49 and production18 pins, all 59 expected rows per side, exact summaries and the additional controls. Actual report lines 562–572 carries the matching control set `b8c6a54eaf85224115423d93a938642825c95b498da70f6b73f237d98f6ccc56`, expanded `ab11a3e0a319573bfd2b752b4eeb3398270650fc2b00473843044e089cedf770`, production pins and exact Root receiver identity. No Source function was evaluated by this reviewer.

## Limits and preserved closure

The accepted closure is recorded in actual report line 7: Source `8b1e2f364608ebef7727ebcb51a47d171410ce8e`, tree `b9f5ad58137adedce030699b55d8fcc5a4188c09`, original F7 `f7a71f1a0fa4f5ddf069ff411f008a098455e5cc` restored only after terminal; SAME `9c0ae115e491341a8aa28b1184b2160bf4de92b6` 1010233 bytes preserves the entire 996063-byte proposal prefix, with Core3200/Main unchanged and five active states zero at that readback. This review relies on that pinned closure evidence and does not repeat the whole-tree/1MB preservation audit or assert current Cloudflare runtime state.

This was a static, scoped public DATA review. No local Source files, Source import/eval/syntax checks, tests, dependencies, workflow dispatch, private artifact/TAP/key access, browser/Cloudflare/AFW/OAuth/owner operation, ref mutation or subagent was used. The sole authorized write is this unattached report blob. The reviewer did not rerun the qualification. Production main/preflight were not executed by the controls-only qualifier; their fixed paths were inspected statically.

Historical run 43658045169/1 remains consumed and unchanged: R1/R2 pass, R3 wait fails; its underlying cause remains unknown. Recorded Source/contract qualification does not prove PC-off operation, business repair, live readiness, global Native drain, SDK namespace emptiness or new authority. All seven nonclaims remain false (actual report lines 574–580).
