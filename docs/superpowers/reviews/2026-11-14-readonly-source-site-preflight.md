# Readonly assertion source-site diagnostic — builder preflight
Date: 2026-11-14 UTC. Verdict: **CLEAR for inactive preparation only**, using the settled constraints below. **NOT released for Source attachment, workflow activation, controls, Native, or live execution.** No implementation prepared.

This preflight evaluates the next cause-specific unit only. It does not repeat the separate whole-review of run 43649183563/attempt1. The new reason is that all three completed readonly failures are assertions, but their source assertions remain ambiguous. Numeric values alone cannot choose a business fix. The original full16 remains consumed/failed. No clocks, assertions, cap, Worker/SDK body, or Native body may be altered.

## Authority and observed baseline
- Requirements: Rootdocs commit 6cc3e42c3525af7539a6d121f7ac6da5a179fa1a, docs/superpowers/specs/2026-11-14-readonly-source-site-diagnostic-draft.md, blob c45b0c2bece35bb4422803ccf861779d668cba7e.
- Initial compact assertion map: same Rootdocs commit, docs/superpowers/reviews/2026-11-14-readonly-current-assertion-sites.json, blob 8696af6799839c6e23c0b742bd87063b6fcf0317. It is not complete.
- Current Source CLOSED 1e4026ceb0c43efe1ccd815a874e10375646753b; tree c58cc07480661335060648bbb236d99b9ff58f13. Recursive tree DATA read confirms original F7 f7a71f1a0fa4f5ddf069ff411f008a098455e5cc (126209B) and SAME e3a3b0f2599fd1e8bc2ce61d22bbfc96676ca1be (689075B). Parent-supplied SAME SHA256 fadd768680490150424cb696f6dc2713bbe3a84dd35c0695a95064c050c169b9 was not recomputed here. Core3200 unchanged is the supplied closed-unit baseline, not a new whole-unit re-review.
- Existing whole-unit package 34c6e20cd1a2dec3463f0b466d07c7877c1fbc32 was read only for exact current pins, program references, and already retained safe results.
- Actual two-job result supplied and corroborated by retained safe package: positive_prepare exit0; readonly R1 strictEqual false/true, R2 strictEqual 0/1, R3 == false/true, all ERR_ASSERTION; all3 terminal plus consistent cumulative summary. Original readonly CLI/test body was uninstrumented. This preflight did not download private artifacts or inspect raw original errors.

## Finding: a serialized cause can preserve the original throw location
Exact upstream Node v22.23.4 resolves through annotated tag f206f23d067e60ce0cc6506abb28fe5e2f2dc8c3 to commit **27f213124280b4db4cd1e3dd42f6f8afd01ceff7**. All following primary reads were at that tag/commit; no Node program was executed.

1. [v8 reporter](https://github.com/nodejs/node/blob/27f213124280b4db4cd1e3dd42f6f8afd01ceff7/lib/internal/test_runner/reporter/v8-serializer.js#L16-L31), blob c75bfcdac478cf405a3d385078a8ca93ea7e97b8: child reporting serializes details.error, restoring the child event afterward.
2. [parent runner](https://github.com/nodejs/node/blob/27f213124280b4db4cd1e3dd42f6f8afd01ceff7/lib/internal/test_runner/runner.js#L206-L217), blob e08e638cf9bb6972bb13ec0eb756f0107945a00d: parent reporting deserializes the error before forwarding the event.
3. [error serdes](https://github.com/nodejs/node/blob/27f213124280b4db4cd1e3dd42f6f8afd01ceff7/lib/internal/error_serdes.js#L48-L79), blob efe75192d9f529bae7daf95a14f3ad3b68001cea: standard Error serialization traverses descriptors, attempts getter evaluation inside Node, converts a successful getter result to DATA, and serializes cause recursively. [Deserialization](https://github.com/nodejs/node/blob/27f213124280b4db4cd1e3dd42f6f8afd01ceff7/lib/internal/error_serdes.js#L164-L179) reconstructs descriptors on an Error-prototype object. A serialized cause.stack string can therefore preserve the original child's captured throw-site string as an own DATA property. Missing/failed representations remain possible.
4. [AssertionError constructor](https://github.com/nodejs/node/blob/27f213124280b4db4cd1e3dd42f6f8afd01ceff7/lib/internal/assert/assertion_error.js#L355-L384), blob 5dbf1e7a3413808e743cc9755ee1d16ee246766f: stack capture uses the assertion's supplied start function, caches a header with the assertion code, then resets the public name. [strictEqual](https://github.com/nodejs/node/blob/27f213124280b4db4cd1e3dd42f6f8afd01ceff7/lib/assert.js#L384-L395), blob f2ce5e9c0752e865dbf3e483dc0bf72e41643404, supplies its own assertion function as that start. This supports expecting the caller site rather than internal assertion implementation as the first frame.
5. Node reconstruction uses ObjectCreate with descriptors rather than constructing a new native Error. **Do not require types.isNativeError(cause) for the new stack-DATA helper.** Static code predicts that requiring a native-error brand would discard this representation; the real tiny cloud control must establish the actual reporter shape on this exact binary before Native.
6. Neither this evidence nor a future location label proves why an assertion failed, authenticates the Error, or recovers the previous run's discarded raw stack. It can diagnose only the new run when a valid mapping is available.

**Security scope:** zero-getter/zero-Proxy-trap guarantees apply to our own projection after receipt. Node's existing earlier serializer explicitly attempts getters, so claiming zero getter calls across the entire Node test pipeline would be false. Direct malicious descriptor/Proxy controls must exercise the projector in process, not falsely hold Node's serializer to that promise.

## No adequate existing structured substitute
- [test:fail documentation](https://github.com/nodejs/node/blob/27f213124280b4db4cd1e3dd42f6f8afd01ceff7/doc/api/test.md#L3098-L3115), blob abcab012548a43a791a38b06e59dab4433fe362a, identifies event file/line/column as the **test definition**, and details.error.cause as the thrown error. Test-definition coordinates cannot distinguish World1188's four assertions or Native106–118's multiple assertions.
- [util.getCallSites documentation](https://github.com/nodejs/node/blob/27f213124280b4db4cd1e3dd42f6f8afd01ceff7/doc/api/util.md#L517-L552), blob d26baff5a3c66ada856386f8f14be017519983fe, captures the current caller stack. Its API has no prior-Error argument. Calling it in the reporter would locate the reporter, not the original child throw. Global prepareStackTrace, inspector pauses, new instrumentation, Error.captureStackTrace on a new Error, or invented metadata are not substitutes.
- [error.stack documentation](https://github.com/nodejs/node/blob/27f213124280b4db4cd1e3dd42f6f8afd01ceff7/doc/api/errors.md#L313-L391), blob 539c0994c995fbdd77b83411668fa7c7727a2517, describes stack locations and lazy accessors. Only own DATA strings are admitted here; no accessor may be forced.

## Settled parsing contract
This is a new narrow exception to the existing closed projector's no-stack-reading promise. Keep qualified-driver numeric/class/code/operator behavior unchanged. Add one independently bounded finite field, sourceSite, in a new-unit schema/receiver version. Do not modify the qualified source module or Native/World bodies.

1. Access wrapper, cause, message and stack only through own-property DATA descriptors using the qualified non-Proxy guard. Reject a Proxy, accessor, missing DATA value, wrong type, reflection failure or unexpected shape to sourceSite=unknown. Never call a supplied reader, getter, toString, inspect hook, coercion or prepareStackTrace. Do not traverse cause chains to hunt for a better stack.
2. The new helper operates only for an own-DATA ERR_ASSERTION cause. No native-error brand check is necessary or permitted as an admission prerequisite. Brand absence does not make the hint authenticated.
3. Root expressly permits **bounded in-RAM own-DATA message only to delimit the exact cached AssertionError stack header**. Require stack to begin with the exact Node22 header formed from the fixed AssertionError/code prefix and the complete own message; support only the exact empty-message form if a real control proves it. Strip that full header, then parse its remaining frame suffix. No semantic-message classification. Missing/accessor/header mismatch or ambiguity yields unknown. This prevents a newline plus fake at-frame inside message from becoming the throw frame. No raw message/stack/hash/function/path is emitted or logged.
4. Proposed conservative bounds: each raw input string at most 65536 UTF16 units **and** 65536 UTF8 bytes; at most64 suffix frames; each frame at most1024 UTF16 units/UTF8 bytes. Reject CR, NUL, overflow, overlong/malformed/incomplete suffix, missing separator, ambiguous frame syntax and extra non-frame suffix. Check primitive type/length before byte counting. Inputs remain private Runner RAM.
5. **Select the first frame after the verified header; do not search forward for a known source.** Settled skiplist is empty. For standard asserts the constructor evidence predicts caller-first capture; tiny controls must prove this. An unrecognized Node frame, unknown helper/dependency/compiled frame, malformed first frame, or missing map entry produces unknown. In particular an unknown lower fixture followed by a known World await/caller must stay unknown. Do not report the known caller as the assertion.
6. Frame parsing admits only one unambiguous location per frame, with positive canonical decimal line/column. Handle the exact plain and named/async forms established by the controls; no arbitrary suffix search through text. Names are syntactic input only and never returned. A malformed or double-location first frame is unknown.
7. **Paths must equal exact trusted Runner-generated names**, not merely end in a public basename/suffix. Root verifies repository/ref/current Source and trusted cwd before tests. Build the two approved absolute paths and their canonical file URLs from that verified cwd; compare input spelling exactly. No arbitrary path.normalize, URL decoding, dot-segment collapse or free-origin acceptance. Reject prefix impostors, ../, percent-encoded paths, alternate origins, separators, query/hash and basename matches. Relative spellings may be admitted only if the exact original CLI control actually produces and proves them; safest initial allowlist is absolute path plus canonical file URL only.
8. Bind each mapped file to its immutable blob, bytes and SHA256, and bind the static map itself. Before Native, verify working-copy bytes match the original and Source Git pins match. No World/Native rewrite/instrumentation or lineoffset/source-map guessing.
9. Map the exact parsed line **and column** to a unique disjoint assertion-call span in the appendix. The real tiny same-line control must demonstrate that Node22's observed columns fall within the intended expression spans for both method assertions and callable assert. Do not assume the runtime column equals the token's first character. Unmapped columns, gap columns, multiple candidates, overlapping spans, unexpected line or changed byte pins yield unknown. Never choose the nearest assertion.
10. Output only an enum such as world_1188_a4, native_111_a6 or unknown. Coordinates/path/function/raw header are not separate outputs. Alias meaning is the mapped assertion expression in this pinned file, **not an authenticated root cause**. Preserve all seven nonclaims false. Retain per-row failure/error relationships, firstFailure equality and cumulative summary checks. Unknown location never upgrades a failed case to pass.
11. Unknown in a genuinely different/unmapped Native failure is an honest result. If the **tiny real serialized-assertion controls cannot establish a usable own DATA representation and unambiguous column mapping**, hold before Native: another Native run would have no demonstrated ability to answer the new question. Do not force materialization or widen the parser.

Cost if this design is wrong: a false assertion-site label or additional private DATA handling. Controls must exercise fake-at message injection, unmapped-first-frame rejection, exact paths/columns and canary non-echo. The label stays explicitly untrusted and never authorizes a business fix by itself.

## Exact Source/program pins to reuse
| Purpose | Exact reference |
|---|---|
| Original World | test/fixtures/finite-budget-world.mjs, blob 1e18873791e0520fff611e353232e38786c51941, 243656B, SHA256 125bfb65ebf5a87fb1301750ffeae4fe52f24dd6049828cf8c8557b94d886855 |
| Original Native | test/mcp-qa-finite-budget-native.test.mjs, blob 533dafb5df5f8e57442c5b9029dc8dec6dded434, 12749B, SHA256 7194f50e3974076da519b1b99103d28537cc2d33813e8bf6eae83cf014d24948 |
| Qualified driver; unchanged numeric predicate | blob 3ef70505e65c179dae68a9a1a504da591f840c49, 8545B, SHA256 fb168aed7ea6c508f7ca3d59b2bd125dfe5125f528a9d85ceb4bc4944198cf43; boolean OR safe integer0..65536, otherwise null |
| Previous closed collector | closed.mjs blob 7d9e792fdcaac628f8c8724287904cba976772fd, 5785B, SHA256 cce547d7e23844003832498493e0d3b6d3bc352980408a66dd194949dab8e778 |
| Previous dual reporter | reporter.mjs blob 2c0392952a6d2fea538ff6ce85aa3785691d81ce, 380B, SHA256 397f50c63e2d7ad6af79ec9189928db1362b3b1646850633a9a648857f8cd4a4 |
| Previous sanitized child environment/runtime | runtime.mjs blob b36c361e8cfe959bfddc79e9f9595a25bfbd2a8a, 2667B, SHA256 2cb2726df56997e5127d579310542b278fbfcca7762865afba90bc96ab8b8587 |
| Existing Root receiver; new schema/receiver version required | Rootdocs path docs/superpowers/reviews/2026-11-14-current-failed-frontiers-root-receiver.js, blob 86c84f61f04f12ce94d6c0bc5f47293a3242638d |
| Legacy source-site projector; read as reference, **do not reuse unchanged** | test/fixtures/finite-budget-failure-diagnostic.mjs, blob 62965a9d5836e54563550fe29dff23abe9a62054. It requires native Error branding, uses line-only labels and can continue to later frames; those behaviors are unsuitable for this serialized-cause exact-assertion unit. Leave it untouched. |

World/Native file bodies were read as DATA. The two Source files above are the smallest useful initial map. Lower fixture sites are not silently attributed: owner-cleanup blob2f5dad6c306fac1be2f11845bef640bb204ad572, first-connection-publication blobcede301c3e9cd95716ae2134f938dbb1d940e7a9, initial-entry-world bloba7b730dc9be336528f0971544099f79d05758b1a, compiled Worker/dependency frames and all other locations remain unknown unless a future separate pinned map decision explicitly admits them. Do not import/evaluate them to generate this map.

Important reachable additions to the compact initial map: **World1138,1139,1140** are used by fixedChildDeadlineProof; **World1145,1146** by fixedNegativeBoundaryProof. World1145 has events.length===1 and childs.size===1, either potentially consistent with a 0/1 projection; that projection proves neither site. World1139/1140 contain boolean checks potentially consistent with == false/true. World1188 has four assertions, last one compares presence of sdkReference with case R1. These are hypotheses to disambiguate, not findings of actual failure location.

## Tiny cloud controls before Native — no Source imports
Prepare these in the future pinned diagnostic payload; run on Ubuntu24.04 with exact Node22.23.4, original CLI isolation, concurrency1 and supported dual reporters. Use tiny standalone test fixtures generated from reviewed constant public strings in the private Runner directory, not Source modules. Native/World/dependencies/builds are unnecessary for these controls. Emit only closed fixed pass/count/enum records; private TAP and raw fixture errors stay on Runner.

| Control | Meaningful proof / hold condition |
|---|---|
| C1 real serialized cause | Actual child node:test failures for strict boolean false/true, strict numeric0/1 and callable assert(false), using real dual reporters. At the reporter boundary require cause.message and cause.stack own DATA strings and expected finite sites. Record shape only, never values. Direct native-error accessor and deserialized cause are distinct paths. If the real serialized representation is unusable, hold before Native. |
| C2 same-line exact assertions | A tiny helper has at least3 distinct assert expressions on one ASCII line; separate tiny tests fail first/middle/last while prior calls pass. The actual observed stack columns must resolve each distinct pinned span/enum; method and callable forms included. Include an async helper/caller pair and require helper site, never caller site. No fake stack replacement in these positive controls. |
| C3 first-frame/path defenses | Artificial own-DATA stacks exercise unknown first external helper followed by known caller, unknown Node first frame, same-basename impostor, dot/encoded/alternate-origin paths, off-by-line/gap-column, malformed/double-location first frame. All unknown. Genuine exact canonical path plus correct pinned span is the sole positive pair. No forward search. |
| C4 descriptor/Proxy scope | Call projector directly with accessors on wrapper cause and cause code/message/stack, throwing getters, inherited properties, Proxy/revokedProxy wrappers and causes. Counters remain zero. This tests our guard only; do not claim Node serializer getters are untouched. Preserve existing numeric/code/class accessor controls. |
| C5 header/bounds/non-echo | Exact DATA message contains private canary plus newline fake at-frame pointing to another known site; header stripping yields only the actual first suffix site. Missing/mismatched header, accessor message, overlong input, CR/NUL, trailing malformed suffix and unavailable stack yield unknown. Output serialized bytes contain none of message, stack, paths, function names or canary. Include boundary-size +1 controls without giant data allocations. |
| C6 provenance/collector/receiver | Wrong source-file/map pin prevents Native admission. New field accepts finite enum only; extra path/coordinate/string fields are rejected. Per-row errors + firstFailure include equal location field; all3 terminal and summary/end rules unchanged. The seven nonclaims remain false; unknown maps do not manufacture pass. Existing correctly pinned qualified collector/summary controls can be reused rather than a new generic framework. |

No control was executed by this preflight. Source Native may be considered only after Root reviews the inactive bytes, exact payload/map pins, independent receiver and actual tiny-control gate design, plus the current completed-unit review result. Then at most one newly justified readonly-only diagnostic with original CLI dual-reporters, all3 original tests, 120000ms per-case and seven-minute job ceiling; no positive_prepare/full16/liveEntry replay, new AbortSignal, clock reset, assertion removal, cap widening, key/private-artifact transport, Cloudflare action or authorization expansion. Original pure8/current readonly profile remain pre-Native prerequisites.

## SDD preflight conflict/interface scan
No implementation plan exists for this new unit yet; these are the interfaces/tasks the Root plan must preserve. All rulings are settled here rather than deferred to routine owner questions.

| Pair / unit | Producer versus consumer | Finding and ruling |
|---|---|---|
| Existing projection / site helper | Qualified DTO numeric fields versus new stack annotation | Numeric projection unchanged; separate finite field + schema version. Never reuse legacy nativeError/line-only/forward-search semantics. |
| Node serializer / descriptor security controls | Node may evaluate getters before our reporter; our projector must not | Narrow guarantee to our own projection. Genuine serialized shape control plus separate direct malicious-object controls. |
| Header parser / message non-echo | Need identify actual frame suffix without treating multiline message as frames | Root permits own-DATA message solely for exact bounded header matching; no semantic classification/output, unknown on ambiguity. |
| First source frame / call-site map | A lower unmapped fixture can precede a known caller | No frame skipping; empty skiplist; unknown before known remains unknown. Never choose a convenient caller. |
| Static map / original Source bodies | Multiple asserts share line; Native returns exact column | Bind original bytes and disjoint call spans, prove actual Node column behavior using tiny fixtures; line-only alias does not claim an assertion. |
| Collector / independent receiver | Per-row error object copied into firstFailure, cumulative summary verifies all3 | Add finite field consistently in both locations, preserve complete/unknown/end invariants and all7false. |
| Controls / Native admission | Tiny controls demonstrate extraction can answer the question | If real serialization/column controls fail or remain unknown, hold before Native. Do not spend a Native trial on an unproven extractor. |
| New readonly unit / completed two-job unit | Reuses qualified modules and current Source baseline | No duplicate whole-review, positive rerun or full16. Existing results are evidence, not a new execution permission. |
| Future payload / Source preservation | F7 + append-only full SAME; Core files read-only | Original Source/World/Native untouched. Root owns attachment/activation/restoration; this report is the sole new unattached blob. |

## Appendix A — pinned public Source assertion spans
These are **static DATA-only spans**, not runtime-verified columns. Lines and columns are 1-based; both ends inclusive. All listed assertion lines are ASCII without tabs, so byte/character/UTF16 column ambiguity is absent. Enum format is alias_line_aN in source order. Runtime column must map to exactly one span on the exact pinned line; columns in a gap are unknown. Actual Node behavior remains gated by C2.

The initial map includes some neighboring helper/reduction assertions; their inclusion here is not proof that readonly reaches them. Unmapped Source sites remain unknown. This appendix has 83 disjoint assertion-call spans across the two pinned files.

| Pinned line | Ordered assertion spans |
|---|---|
| world_1138 | a1: 56–158 |
| world_1139 | a1: 2–38; a2: 40–79; a3: 81–172 |
| world_1140 | a1: 2–76 |
| world_1145 | a1: 2–42; a2: 44–108; a3: 128–156; a4: 158–181; a5: 183–209; a6: 211–244; a7: 246–270; a8: 272–294; a9: 296–322; a10: 324–365 |
| world_1146 | a1: 16–43; a2: 50–75; a3: 77–107; a4: 109–152 |
| world_1150 | a1: 66–125; a2: 127–154; a3: 156–193 |
| world_1151 | a1: 2–81; a2: 83–131 |
| world_1152 | a1: 120–150 |
| world_1153 | a1: 2–82; a2: 96–179 |
| world_1158 | a1: 68–134 |
| world_1161 | a1: 2–84; a2: 86–170; a3: 172–219 |
| world_1168 | a1: 2–54; a2: 56–98 |
| world_1174 | a1: 110–148 |
| world_1176 | a1: 141–185; a2: 187–260 |
| world_1180 | a1: 65–104; a2: 106–139 |
| world_1181 | a1: 60–104; a2: 106–149 |
| world_1188 | a1: 3–34; a2: 36–67; a3: 69–100; a4: 102–150 |
| world_1190 | a1: 66–79; a2: 81–149 |
| native_106 | a1: 3–36; a2: 38–69; a3: 71–102 |
| native_107 | a1: 3–51 |
| native_108 | a1: 3–38; a2: 40–85 |
| native_109 | a1: 3–39; a2: 41–87 |
| native_110 | a1: 3–29; a2: 31–63; a3: 65–96 |
| native_111 | a1: 19–41; a2: 43–66; a3: 68–94; a4: 96–129; a5: 131–161; a6: 163–201 |
| native_112 | a1: 8–44; a2: 46–76; a3: 78–115 |
| native_113 | a1: 19–69; a2: 71–109 |
| native_115 | a1: 4–48; a2: 50–84; a3: 86–109; a4: 111–156; a5: 158–211 |
| native_116 | a1: 4–44; a2: 46–87; a3: 89–124; a4: 126–165 |
| native_117 | a1: 4–73 |
| native_118 | a1: 4–38; a2: 40–74 |
| native_120 | a1: 3–49; a2: 51–92; a3: 94–125 |

## Appendix B — exact expression meaning for each enum
| Enum | Span | Pinned public expression |
|---|---|---|
| world_1138_a1 | 56–158 | `assert.equal(result.classification,'confirmed_deadline','same selected child causal deadline required')` |
| world_1139_a1 | 2–38 | `assert.equal(before.outwardPending,2)` |
| world_1139_a2 | 40–79 | `assert.equal(before.heldNativeSettled,2)` |
| world_1139_a3 | 81–172 | `assert(fixedQueueCausality(before),'two actual held operations bound to same current queue')` |
| world_1140_a1 | 2–76 | `assert(after.released&&after.outwardPending===0&&after.nativeUnsettled===0)` |
| world_1145_a1 | 2–42 | `assert.equal(value.observerInvalid,false)` |
| world_1145_a2 | 44–108 | `assert.equal(events.length,1,'one actual reached final list cap')` |
| world_1145_a3 | 128–156 | `assert.equal(e.family,family)` |
| world_1145_a4 | 158–181 | `assert(e.childOrdinal>0)` |
| world_1145_a5 | 183–209 | `assert.equal(childs.size,1)` |
| world_1145_a6 | 211–244 | `assert.equal(e.kind,'cap_'+method)` |
| world_1145_a7 | 246–270 | `assert.equal(e.counter,2)` |
| world_1145_a8 | 272–294 | `assert.equal(e.limit,2)` |
| world_1145_a9 | 296–322 | `assert.equal(value.lists,2)` |
| world_1145_a10 | 324–365 | `assert.equal(value.thirdListEntered,false)` |
| world_1146_a1 | 16–43 | `assert.equal(value.gets,200)` |
| world_1146_a2 | 50–75 | `assert.equal(value.gets,1)` |
| world_1146_a3 | 77–107 | `assert.equal(value.deletes,200)` |
| world_1146_a4 | 109–152 | `assert.equal(value.grantDeleteEntered,false)` |
| world_1150_a1 | 66–125 | `assert.equal(c.invoke,1,'actual single '+name+' invocation')` |
| world_1150_a2 | 127–154 | `assert.equal(c.sync_throw,0)` |
| world_1150_a3 | 156–193 | `assert.equal(c.fulfilled+c.rejected,1)` |
| world_1151_a1 | 2–81 | `assert.equal(value.sendCalls.fulfilled,1,'original SEND ACK settled before SDK')` |
| world_1151_a2 | 83–131 | `assert.equal(value.sendCalls.sendHashes.length,1)` |
| world_1152_a1 | 120–150 | `assert.equal(sendRows.length,1)` |
| world_1153_a1 | 2–82 | `assert.equal(JSON.parse(sendRows[0][1]).recordHash,value.sendCalls.sendHashes[0])` |
| world_1153_a2 | 96–179 | `assert.equal(value.sdkCalls.rejected,1,'actual SDK rejection for negative boundary')` |
| world_1158_a1 | 68–134 | `assert(Date.now()<deadline,'SYN fixed budget observation deadline')` |
| world_1161_a1 | 2–84 | `assert.equal(process.env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web')` |
| world_1161_a2 | 86–170 | `assert.equal(process.env.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101')` |
| world_1161_a3 | 172–219 | `assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1')` |
| world_1168_a1 | 2–54 | `assert.equal(process.env.AFW_BUDGET_GROUP,'readonly')` |
| world_1168_a2 | 56–98 | `assert(['R1','R2','R3'].includes(caseName))` |
| world_1174_a1 | 110–148 | `assert.equal(rootBefore.available,true)` |
| world_1176_a1 | 141–185 | `assert.equal(held.queueObserverInvalid,false)` |
| world_1176_a2 | 187–260 | `assert(fixedQueueCausality(held),'actual causal populated readonly queue')` |
| world_1180_a1 | 65–104 | `assert.equal(rootDuring.available,false)` |
| world_1180_a2 | 106–139 | `assert.equal(rootDuring.live,true)` |
| world_1181_a1 | 60–104 | `assert.equal(beforeRelease.nativeUnsettled,0)` |
| world_1181_a2 | 106–149 | `assert.equal(beforeRelease.outwardPending,2)` |
| world_1188_a1 | 3–34 | `assert.equal(sdkRoot.I0,plan.I0)` |
| world_1188_a2 | 36–67 | `assert.equal(sdkRoot.C0,plan.C0)` |
| world_1188_a3 | 69–100 | `assert.equal(sdkRoot.C1,plan.C1)` |
| world_1188_a4 | 102–150 | `assert.equal(sdkReference!==null,caseName==='R1')` |
| world_1190_a1 | 66–79 | `assert(actual)` |
| world_1190_a2 | 81–149 | `assert.equal(hash(actual.script),f.firstConnectionBuild[role].sha256)` |
| native_106_a1 | 3–36 | `assert.equal(result.caseName,name)` |
| native_106_a2 | 38–69 | `assert.equal(f.completeWrites,1)` |
| native_106_a3 | 71–102 | `assert.equal(f.completeNormal,1)` |
| native_107_a1 | 3–51 | `assert.equal(f.input.entries,name==='R2'?201:200)` |
| native_108_a1 | 3–38 | `assert.equal(f.input.correlations,1)` |
| native_108_a2 | 40–85 | `assert.equal(f.input.expirationPreserved,true)` |
| native_109_a1 | 3–39 | `assert.equal(f.foreignUnchanged,true)` |
| native_109_a2 | 41–87 | `assert(f.lists<=2&&f.gets<=200&&f.scopePeak<=2)` |
| native_110_a1 | 3–29 | `assert.equal(f.sdkReplay,0)` |
| native_110_a2 | 31–63 | `assert.equal(f.nativeUnsettled,0)` |
| native_110_a3 | 65–96 | `assert.equal(f.outwardPending,0)` |
| native_111_a1 | 19–41 | `assert.equal(f.lists,2)` |
| native_111_a2 | 43–66 | `assert.equal(f.gets,200)` |
| native_111_a3 | 68–94 | `assert.equal(f.scopePeak,2)` |
| native_111_a4 | 96–129 | `assert.equal(f.responseStatus,302)` |
| native_111_a5 | 131–161 | `assert.equal(f.referenceRows,1)` |
| native_111_a6 | 163–201 | `assert.equal(f.referenceBefore302,true)` |
| native_112_a1 | 8–44 | `assert.notEqual(f.responseStatus,302)` |
| native_112_a2 | 46–76 | `assert.equal(f.referenceRows,0)` |
| native_112_a3 | 78–115 | `assert.equal(f.thirdListEntered,false)` |
| native_113_a1 | 19–69 | `assert.equal(f.boundaryProof.exactPrecedingPages,2)` |
| native_113_a2 | 71–109 | `assert.equal(f.boundaryProof.counter,2)` |
| native_115_a1 | 4–48 | `assert.equal(f.holdLabel,'holdpostnativeACK')` |
| native_115_a2 | 50–84 | `assert.equal(f.heldNativeSettled,2)` |
| native_115_a3 | 86–109 | `assert(f.queuedAtHold>0)` |
| native_115_a4 | 111–156 | `assert.equal(f.deadlineProof.queueCausal,true)` |
| native_115_a5 | 158–211 | `assert.equal(f.deadlineProof.denialAfterDeadline,true)` |
| native_116_a1 | 4–44 | `assert.equal(f.rootBefore.available,true)` |
| native_116_a2 | 46–87 | `assert.equal(f.rootDuring.available,false)` |
| native_116_a3 | 89–124 | `assert.equal(f.rootDuring.live,true)` |
| native_116_a4 | 126–165 | `assert.equal(f.rootAfter.available,true)` |
| native_117_a1 | 4–73 | `assert(f.originalChildElapsedMs>=4900&&f.originalChildElapsedMs<10000)` |
| native_118_a1 | 4–38 | `assert.equal(f.callsAfterRelease,0)` |
| native_118_a2 | 40–74 | `assert.equal(f.lateReference,false)` |
| native_120_a1 | 3–49 | `assert.equal(result.operationalReadiness,false)` |
| native_120_a2 | 51–92 | `assert.equal(result.completePackage,false)` |
| native_120_a3 | 94–125 | `assert.equal(result.PCoff,false)` |

## Work performed and limits
Read-only GitHub DATA/documentation reads and RAM parsing only, plus local reads of installed systematic-debugging and SDD preflight skill text. No Source eval/import/syntax check/tests/build/npm/dependencies, no local Source files, refs, Rootdocs edits, workflow run, Cloudflare, credentials, private artifact, browser or mail access. No subagents. This single unattached report blob is the only authorized write.

Source byte/hash values above are independently identified Git blobs plus the previously pinned preparation package; SHA256 values were not independently recomputed in this preflight. No claim that future controls passed, actual readonly sites are now known, or any business readiness changed.

