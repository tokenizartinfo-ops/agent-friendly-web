# R3 fixed-budget wait: bounded read-only causal source preflight

Date: 2026-11-14. Repository: tokenizartinfo-ops/agent-friendly-web. Source: 6739481ada03d50e035edfd9c157c1646fad705d. Scope: READONLY SOURCE. Core3200 and Main0c9 are parent-supplied unchanged boundaries, not independently reverified here.

## Outcome

No deterministic fixture or production defect explaining the R3 wait failure is proven by the inspected source. The proven issue is an observation gap: the failing wait does not preserve the final returned signal state, while the owned unwind subsequently releases and restores that state. It therefore cannot distinguish a path that never reached readonly lookup from one that reached it but did not produce two fulfilled intercepted gets.

The reported run43658045169/1 results (C1-C6, eight pure controls, readonly profile and R1/R2 passed; R3 failed at World1158) are supplied diagnostic evidence, not artifact contents independently inspected in this preflight. The failure is not evidence of provider latency, a broken clock, or a child deadline event.

## Source identity and reading method

GitHub read-only fetches at the exact source returned these matching blobs:

- test/fixtures/finite-budget-world.mjs: 1e18873791e0520fff611e353232e38786c51941.
- test/fixtures/finite-owner-cleanup.mjs: 2f5dad6c306fac1be2f11845bef640bb204ad572.
- lib/mcp-qa-finite-owner-cleanup.mjs: 1a5a2583d266179cdd89f799c64199f29044fec5.
- lib/mcp-qa-finite-owner-phase-context.mjs: 7eb8f28760de60f143e487eeb6988705059a0a44.

The adapter and library-prefix literals at fixture lines302/303 were decoded with JSON.parse as DATA and read, never evaluated, imported or executed. “Adapter line” below means a line in that decoded literal, not a repository file line.

One initial read used the concatenated label “closed” as part of the ref and returned 404; the corrected exact 40-character source above supplied all evidence. No source was obtained from a floating ref.

## Causal chain established by source

1. World1173 creates a fresh ownerReferenceFixture, sets R3, then prepareOwnerReference calls finiteBudgetReadonly (fixture125-129). The supplied separate inspection excludes an earlier ownerReferenceConfigure during fixture setup. The decoded adapter138-143 calls any prior restore, captures native methods, installs its wrapper, then calls ownerReferenceConfigure. The latter captures the installed wrapper (literal fixture15). The fresh path thus has no source-proven unconditional restore that removes interception. A previous configure is not a supported explanation here.

2. The real grant put passes through two wrappers. The adapter130-135 waits for the native put and then awaits readonly seeding. For R3, seeding101-122 writes 199 foreign-correlation grant rows, checks an inventory of 200 total entries, and only then assigns state.input. This setup is on the original SDK completion promise chain. A fixture seeding failure or unresolved setup can prevent later summary lookup; its actual occurrence is unknown.

3. The production handler awaits sdk_complete and its journal/rechecks before invoking the readonly summary child (phase-context724-733,831-838). That summary does further source, anchor and journal checks before creating the facet and calling listUserGrants (cleanup85-112). Therefore the POST can close or remain pending before the first readonly list/get. The handler catches its failure into pending() at phase-context847. The Node issue promise is not awaited by World until1177, after the held condition. A returned non-302 response therefore does not stop this particular wait early.

4. Within readonlyGrantKv, native operations are admitted by a guarded queue with active<2 (cleanup46-81). A held get keeps that active slot occupied. Adapter74-95 increments heldNativeSettled only in the fulfillment observer for an intercepted get in R3; rejection increments nativeRejected, never the held count. A never-invoked get, a rejected get, a guard rejection before native entry, or a pending native get can all leave the count below2. The hold is explicitly after native settlement, not a physical KV-latency simulation.

5. World1157-1158 repeatedly obtains a signal value, checks the predicate, and otherwise performs the unchanged deadline assertion. World1176 supplies the exact-equality predicate and the original Date.now()+30000. It preserves neither the final returned value nor issue settlement information on the failure path. World1181 onwards, including causal deadline proof, is unreachable on this failure.

6. The owned unwind (World873-913) deliberately releases and restores the adapter before original callbacks/disposal, preserving the original primary error. Restoration removes its WeakMap state (adapter179-184). A later read cannot be assumed to recover the state that failed the wait.

## What the existing controls do and do not establish

F1 (World1269-1286) exercises the actual fresh adapter setup, but explicitly calls two kv.get operations itself. F3 (1371-1386) assembles the protected facet and explicitly submits facet.get operations. They establish wrapper retention, receiver preservation and queue behavior in those inert contexts. They do not establish reachability of the native OAuth handler through seeding, sdk_complete, journal/rechecks and readonly preflight.

The current deadline-classification controls (1750-1781) distinguish modeled orderings and preserve promise identity. They cannot classify this actual R3 run because the hold and final snapshot were not obtained. R1/R2 passing their fresh fixtures narrows broad fixture/profile breakage but does not identify R3's terminal state.

The inspected official upstream source is cloudflare/workers-oauth-provider commit1fafae23a0328f49ec3a30c433dfbe502ab3d1a6, src/oauth-provider.ts blob10274b62aad09ea0e9d058cc1e3d41a9f8cb7d97. Its completeAuthorization awaits the grant put and skips existing-grant enumeration when revokeExistingGrants is false; its listUserGrants fetches eligible page keys concurrently (6540 onward,6963 onward). That supports the intended path. The supplied lock version1.2.1 and registry integrity do not by themselves prove that this tag source equals the installed tarball. No artifact-equivalence claim is made.

## Bounded hypotheses

- Before summary: the POST returned/pended/failed or remained in SDK/seeding/rechecks before readonly selection.
- Selected child, before list/get: source/anchor/journal checks or its original guard/lease prevented native entry.
- Native entry occurred: fewer than two intercepted gets fulfilled before the failure; a rejection, pending native promise or detached interception must be distinguished with actual counters.

These are alternatives, not findings. No provider, clock, timeout, cap or assertion change is justified. A deterministic wrapper-restore bug on the fresh R path is not demonstrated. No global-native-drain, namespace-empty, hosting, OAuth-operational or PC-off conclusion follows.

## ONE proposed observational seam — retain the final existing R3 sample

Instrument only the R3 wait boundary so its existing read callback stores a bounded whitelist projection of the most recent value it already received. If the original wait throws, preserve that one projection before unwinding and rethrow the identical original error. Do not call another RPC, poll again, race/await issue differently, change predicate/deadline/assertion, release early, or enter the business stack by another route.

Whitelist: inputSeeded and seedEntries; lists/gets; nativeInvoked/nativeSettled/nativeRejected/nativeUnsettled; outwardPending/heldNativeSettled; observer-invalid flags; selected-child scalar status/order fields; queue sample count and last sample's family/child/active/queued/method; held-operation count. Exclude all keys, identities, grants, cookies, headers, rows, raw source, errors/stacks and whole signal objects. Keep exact source/run/attempt and diagnostic-only false-readiness flags.

This answers the next missing question using the existing sample: did R3 reach the selected readonly child and native list/get admission, and what counter/settlement state failed the exact predicate? It does not promise to identify an earlier subphase if no selected child appears. That result would justify a separately scoped next inspection, not speculative extra instrumentation now.

Proposed controls before any later diagnostic run: prove no added RPC/poll or altered original arguments/predicate/deadline; preserve the original error object and failing outcome; exercise each enumerated projection shape and reject unknown/raw canary fields; bound projection size/counts; retain existing owned release/restore/disposal and primary-error controls. Reuse existing pure coverage proportionally. No controls or tests were run in this preflight.

## Operations performed

Only GitHub source reads and this one unattached Markdown report blob. No local source file, eval/import/source execution, tests, dependencies, ref/branch/commit mutations, workflow dispatch, artifact/TAP/key reads, browser, AFW/Cloudflare API or OAuth operation. No subagents. No implementation was made.
