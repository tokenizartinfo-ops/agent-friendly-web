# Task1 continuation — chronology probe, 11 November 2026

Read this first: these are the requirements for the next bounded experiment, not an invitation to repeat the full Task1 implementation.

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web/public1347578006; ENVIRONMENT SOURCE/SYN GitHub Actions; ORIGIN GitHub connector; RESOURCE_TYPE feature branch; RESOURCE_ID feat/finite-native-cleanup-20261101; ALLOWED_ACTION only diagnostic data/test/one probe as below; ROLLBACK preserve history, own changes only, CAS/no force/no reset. Source BASE-C=1455ba78e021f41b82700035a3819898b6a255d7/tree521f2c67291569073f3a2b0a8c13a3b6b1f1e0a7. Global task BASE29681cae2bf1094ec5c66d5b2784254f77bec697 still binds protected equality. Main0c9c475b remains separate. Rootdocs docs/finite-pcoff-continuation-20261103 is Root-only.

## Question and existing evidence

G5run42420218406/attempt1 passed syntax/lint/8Q/prepared M+QA compilation and producer; P1 failed at producer|0|QA overflow. Business assertions before that diagnostic check passed; later assertions were not reached. The saved inspection42422039237 and full report at BASE-C contain all four QA overflow/invalid/unattributed aggregates. They imply more than16384 collector calls, but snapshots do not expose eventCalls or order of first invalid/overflow. Repeating G5 unchanged cannot answer the question.

Determine whether invalid/unattributed observations BEGIN before overflow, and identify fixed diagnostic reasons. Do not infer a production/provider cause, raise/remove16384, suppress events, alter retention/decisions or fix attribution until evidence is reviewed by Root.

## Code scope: ONLY five existing allowed paths

- test/fixtures/finite-budget-diagnostics.mjs: additive diagnostic counters/order and fixed reason labels.
- test/finite-budget-diagnostics.test.mjs: extend existing Q groups, exactly8 groups remain.
- test/fixtures/finite-budget-world.mjs: fixed Node CLI probe command and bounded result extraction only.
- .github/workflows/afw-finite-budget-qualification.yml: temporary pure/probe workflow, retired terminal.
- docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task1.md: append outcome, preserve all history.

No other Source path. In particular preserve lib/**,worker/**,SDK1.2.1,package/lock,configuration,descriptor JSON, native.test and original fixture helpers byte-exact. Do not rewrite old reports. No local clones/deps/builds/project execution; small instruction reads allowed. Existing isolated remote Source branch satisfies worktree isolation.

## Additive sensor contract

Keep all original event() increments, their ordering before validation/dedup, limit16384, retain decisions, counters, return values, native Promise identity, this/callback/guard/lease behavior. This experiment diagnoses; it does not correct a suspected cause.

Add a bounded snapshot object with its own purpose afw.finite-budget-chronology.syn.v1, limit, actual total eventCalls, fixed byEvent counters for root/child/begin/bytes/logical/scopeLogical/cancel/settle/incomplete, firstOverflow and firstInvalid, invalid/unattributed counts BEFORE/AFTER overflow and a fixed reason histogram. First-overflow occurs on the original event16385; record method enum and ordinal, never a stack/message/input. For an invalid action on the same event that crosses the limit, label its relation explicitly as after overflow (including same transition event); constructor options failure may be ordinal0. No global cross-request phase or business authority.

Use fixed private enums at the actual collector/runtime failure branches. Distinguish missing lease/store/child context, holder input/conflict, native capture input/conflict, clone/reader/body origin, invocation identity versus missing root, phase/method/alias/transaction/fetch-resource failures, observer callback/then exceptions, dormant invocation, and collector validation/exception. A smaller schema is acceptable only if it still distinguishes the real existing branches; document the final source-line→enum table. No caller-provided arbitrary strings, paths, URL, headers, values, Error, credentials, capability or raw identities. Unknown reason normalizes to a fixed enum. Preserve the exact original invalid/unattributed increments; optional incomplete(reason) remains backward compatible with zero arguments. Counters are data only and bounded in key cardinality; no unbounded list of every invalid event.

Snapshot creation must not increment eventCalls or change coverage merely by reading it. Enum/counter/order tests live in existing Q groups (e.g.Q4/Q6), not a ninth group. Cover invalid before limit, first crossing, invalid after limit, same-transition classification, constructor invalid, reason sanitization/accessor safety, and unchanged native value/Promise/effect. Preserve all old assertions, including actual compiler-node Q5.

## TDD and cloud evidence stages

A. ONE pure-contract RED on the new tests against the unchanged sensor, before implementation. Existing8 groups, require intended new chronology assertion failure rather than syntax/import failure. TEMP pure-only job contents:read/self-path push and fixed Source SHA; bounded artifact7d/same-ID readback. Preserve outcome. No native/MF/I0 in RED. If wrong failure, preserve and NEEDS_CONTEXT; no blind retry.

B. Implement only the diagnostic contract and fixed Node command, then ONE pure8Q+strict prepared M/QA preflight→producer-only probe qualification. The original world CLI setImmediate dispatch must remain, no Node --input-type CLI for Miniflare. New fixed command may be prepare-positive-probe. It must call the EXISTING produceCheckpoint(root,{variant:'principal',budgetQualification:true,deferWait:true}) helper. This preserves original SDKcomplete/Reference/Notice setup and I0/C0=I0+900000/C1=C0+180000; existing helper cleanup/disposal happens before original C0. No cold consumer/alarm/fullP1, no fake/extended clocks, no firstConnection wrapper/selector/count changes. Compile preflight beforeI0 and compare exact prepared role records as existing qualification does. At most2nativeMF, one genuine producer lineage/two graphs. Label the result partial diagnostic, not9GREEN or lifecycle closure.

Record actual Source/run/attempt/I0/C0/C1, completeNormal/Reference/Notice facts from existing saved producer evidence, each role/epoch chronology and fixed counters/reasons, original native manifests/scripts/metafiles/hash proof, disposedBeforeC0=true, originalAlarmObserved=false, operationalReadiness=false/completePackage=false/PCoff=false. Preserve full safe JSON first; console summaries≤2048UTF8/line. Full artifact7d, exact source/run/attempt/path/bytes/SHA manifest; download by SAME ID and verify inventory. No large artifact download/extraction on Gabriel's PC.

For reading results, expose a safe aggregate per epoch in job logs in bounded lines and append that same aggregate to the report; otherwise Root cannot inspect an opaque artifact without another job. No raw native rows or KV data in console/report. Snapshot rows stay only in safe SYN artifacts as before.

RED job≤3min; StageB pure job≤3min/probe job≤5min, dependent and source-frozen from activation to terminal. Contents:read, exact Source branch and self-path push, cancel-in-progress:false, checkoutgithub.sha/persist-credentials:false/fetch-depth:1. No dispatch/UI/credentials. No dependencies/config changes. Only one StageB attempt: on any failed gate preserve and report NEEDS_CONTEXT before further work. Do not run old RED, full9,16,51,56 or standalone graph inventory.

## Report/STOP contract

Append stage/date/source/tree/blobs/commands and actual pass/fail/cancel/skip/todo, native/partial limits, exact artifacts/digests/readbacks and first-invalid/overflow/reason aggregates to the existing report. Retire TEMP at terminal, verify source ref/full report/full recursive tree/protected equality/main, then STOP_WRITES and return NEEDS_CONTEXT for Root's causal ruling (or DONE_WITH_CONCERNS if only this experiment is complete, explicitly Task1 remains incomplete). No self-appointed reviewer or helpers; do not spawn subagents. Original Task1 review and Task2 have not begun.

No real Cloudflare API/runtime/DDL/OAuth/OTP/tokens/permissions/cron/Container/customer/consumer/new chat/Max/mail/main/PR/publish. Evidence is SOURCE/SYN/API invocation, not physical provider traffic, quotas, billing, global drain or SDK namespace emptiness. No owner step needed.
