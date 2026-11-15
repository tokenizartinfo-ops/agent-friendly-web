# Addendum: minimal pre-summary phase projection for the R3 final-sample seam

Date: 2026-11-14. Repository: tokenizartinfo-ops/agent-friendly-web. Source: 6739481ada03d50e035edfd9c157c1646fad705d. READONLY SOURCE / design input only.

This addendum supplements causal preflight blob3b32d746dd9a505dffd85d7d9fd0afc26ef529b6. It proposes a tiny scalar addition to the EXISTING finiteBudgetSignals response so the previously proposed final-existing-sample seam can preserve more useful phase information. No implementation, tests or diagnostic run were performed.

## Same four source pins

- test/fixtures/finite-budget-world.mjs: 1e18873791e0520fff611e353232e38786c51941.
- test/fixtures/finite-owner-cleanup.mjs: 2f5dad6c306fac1be2f11845bef640bb204ad572.
- lib/mcp-qa-finite-owner-cleanup.mjs: 1a5a2583d266179cdd89f799c64199f29044fec5.
- lib/mcp-qa-finite-owner-phase-context.mjs: 7eb8f28760de60f143e487eeb6988705059a0a44.

The already-fetched exact source and JSON-decoded DATA literals were inspected. No additional source, provider, runtime or artifact evidence is claimed.

## Recommendation: four scalar fields, zero new producers

Append one bounded diagnostic object with exactly these four fields, derived only from this.ownerReferenceState already maintained by the fixture:

| Output field | Closed value set | Exact meaning |
| --- | --- | --- |
| completeWrites | 0, 1, multiple, unknown | Existing grant-put wrapper entry count, normalized. This is an ATTEMPT counter before native put is called, not proof that a grant was written. |
| completeNormal | 0, 1, multiple, unknown | Existing sdk_complete normal marker count, normalized. This marker means the SDK result was awaited and its first recheck succeeded; it precedes the SdkObserved append and subsequent recheck. |
| lookupStage | not_seen, entered, exited, unknown | Presence and completion shape of the EXISTING lookupChild metric, described below. |
| authorizePostFinally | not_seen, one, multiple, unknown | Number class of existing requests entries whose own method field is exactly POST. These entries are pushed in ownerReferenceFetch's finally. This does not mean the original Node issue promise fulfilled or identify its response status. |

Source producers:

- Fixture literal at repository line15 initializes completeWrites/completeNormal to0. Its grant put wrapper increments completeWrites before Reflect.apply(native.put,...).
- Fixture102 inserts completeNormal immediately after phase-context730's actual-result wait and recheck, only for op sdk_complete.
- Fixture103-104 inserts lookupChild={budgetMs:5000} immediately inside the readonly action; its finally adds actualElapsedMs and aborted.
- Fixture literal15's ownerReferenceFetch captures the original-method metadata header, and its finally pushes requests with that method. The response status is written only into a separate trace string.
- The existing finiteBudgetSignals response is decoded adapter168-173 at fixture302. This is the sole response to extend; no new RPC, read or polling loop is needed.

Do not add a new state machine, phase producer, timestamp, request identifier, issue handler, Promise observer or arbitrary trace export.

## Strict unknown semantics

Before projecting, require an own DATA property for this.ownerReferenceState containing the expected plain state object, an own DATA mode equal to normal, and equality with the existing globalThis.__r1ReferenceState DATA value. The existing finite-budget WeakMap lookup must still identify this same owner through its original code. If the state or identity gate is unavailable, changed, accessor-based or otherwise unsupported, output unknown for all four fields. Do not throw, assert, coerce unknown objects to strings or use missing values as zero.

For each counter: only an own DATA nonnegative safe integer is admissible. Preserve0 and1; map larger valid values to multiple. Invalid/missing values are unknown.

For lookupStage:

- not_seen only if the valid expected state has no own lookupChild property.
- entered only for an own DATA plain metric with its original budgetMs exactly5000 and neither completion property present.
- exited only if both completion properties are own DATA values, actualElapsedMs is finite and nonnegative, and aborted is boolean.
- A malformed, partial, accessor-based or unexpected metric shape is unknown. Missing completion properties must not be interpreted as an actual pending native operation.

For authorizePostFinally: inspect only the bounded existing requests array and own DATA method fields; allow only exact GET/POST values for this two-request scope. An unexpected type, extra/unsupported entry or oversized array is unknown. With the valid expected shape, zero POST entries means not_seen, one means one, and multiple exact POST entries mean multiple, an anomaly rather than success. No raw entry, header, elapsed time or method string is exported.

Compute the tiny projection synchronously alongside the existing scalar snapshot, before the response's existing terminal grantRemaining native-get await, and retain it as that snapshot's value. Do not add or move existing I/O. The final Node failure seam preserves only the already-returned whitelist and rethrows the identical original error before the existing owned unwind. There must be no additional read, poll, issue promise attachment, Promise.race, early release, assertion change or budget change.

## Useful interpretation with existing counters

- completeWrites0 and lookupStage not_seen: no grant-put entry or lookup marker was observed in this state. This does not establish whether the POST started.
- completeWrites1, completeNormal0, lookupStage not_seen: a grant-put attempt occurred, but the sdk_complete result-plus-first-recheck marker has not been observed. Combine with the EXISTING inputSeeded/seedEntries projection to distinguish completed fixture setup from absent/incomplete setup. It still cannot distinguish all SDK, seed, await, guard and first-recheck failures.
- completeNormal1 and lookupStage not_seen: the first completion recheck succeeded, but the lookup action marker was not observed. The remaining interval includes result validation, SdkObserved persistence/rechecks and the child check before invoking the action.
- lookupStage entered/exited: the readonly action was entered. Combine with the EXISTING selected-child, list/get, native-settlement and held counters. exited does not imply success; the marker is written in finally.
- authorizePostFinally one: the native-authorize forwarding wrapper passed through its finally for a POST-metadata request. It may have returned or thrown; issue settlement and status remain unknown.
- multiple or unknown forbids a clean phase conclusion. Retain those values without turning them into a fallback success or a new failing assertion.

This creates meaningful coarse boundaries without claiming the exact earlier failure site.

## Deliberately omitted candidates

Response status from trace: the existing producer appends native-authorize-response:<status>, but requests[] has no status and the trace string has no method/request linkage. The completed GET precedes the POST in this fixture. Its200 marker can remain the latest response when the POST fails or has not completed. Exporting it as POST status would be a false association. A request finally can also execute after forward throws without any new response marker. No status field is recommended.

Latest child metric.position: fixture106 captures position when the child begins, not the live position. The relevant withChild calls occur after sdkCall/issuerCall settle their lexical position; the readonly summary child begins at settled. Children from the preceding GET share the same array. Thus the latest position is neither a reliable current POST phase nor a useful discriminator here. endPosition also describes only child exit and has no direct request identity. Neither is recommended.

## Identity and observation limits

The global pointer is shared within its runtime and restore clears it while leaving this.ownerReferenceState present. The equality gate prevents treating an obviously detached/restored object as current; it does not provide historical invocation identity. There is no existing request/case identifier on these metrics. A stale or cross-invocation write cannot be retrospectively disproved by a same-pointer snapshot. The source's fresh R3 fixture and single prepared GET/single issue POST are necessary scope assumptions, not credentials or runtime proof.

The metrics and native-budget counters are observations of different wrappers, not an atomic transaction. The existing response already awaits native I/O; values can advance before the response reaches Node. No timestamp/timeline is proposed to disguise that limit. A negative/missing marker proves only that the marker was not observed under the validated projection, not that its production callsite was never reached.

The added descriptor checks and scalar projection can perturb scheduling slightly. They confer no authority and must remain diagnostic-only. They cannot prove physical native drain, a deadline cause, namespace emptiness, provider behavior, hosting or PC-off operation.

## Proportional controls for a later authorized implementation

Validate the four closed value sets with missing, invalid, stale-pointer, accessor and unsupported-shape cases; raw/secret canary fields must never appear. Verify the original RPC count, polling cadence, argument and promise behavior, predicate, deadline, assertion, primary error and owned cleanup remain unchanged. Keep the original issue promise completely untouched, including its original unhandled behavior. These are proposed controls only; none were run.

Only this one unattached Markdown addendum blob is written. No Source edits, source execution, imports/eval, local source files, dependencies, tests, workflows, refs, private artifacts/TAP/keys, browser, AFW/Cloudflare API or OAuth operations were used. No subagents.
