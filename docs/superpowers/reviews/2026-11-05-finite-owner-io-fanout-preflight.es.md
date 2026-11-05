# Root preflight — finite owner I/O fanout

5nov2026. DESIGN ACCEPTED BY ROOT, IMPLEMENTATION INACTIVE pending D0.3 acceptance. Source pin d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72; design commit fb63b524fc794c13747e04f46be1d43abc49ea61. Root read all three design documents and directly checked original initial-lease and stage-work implementation. No operational availability, alias installation, current provider or mounted graph is inferred.

## Scope / conflict scan

| Tasks/interfaces sharing files | Producer / consumer | Root finding and ruling |
| --- | --- | --- |
| D0.3 token compatibility and proposed fanout | Both modify finite-owner-qa-sdk fixture; D0.3 also modifies token host | Sequential only. Do not activate until D0.3 report/full review accepted; execution BASE must include those edits. Original design pin is inspection only. |
| Fanout internal steps / observation DTO | Credentials→two branches→common alias checks→existing physical pair | Same exact calls/guards/output; joins discard both outputs on any failure. No two snapshots concurrent. Private branch DATA never creates authority. |
| Fanout siblings / initial-lease | child owns local controller/alive/deadline; root end/holders shared | Source supports siblings without modifying lease. Root inspected native monotonic predicates and pendingWork Set. Native hostile tests must still qualify this. |
| Fanout siblings / stage-work | One ALS entry and original lineage, Set of actual native promises | Root inspected retain/released/matching. No new request/owner scope per branch, admission, returned capability or public helper. Do not release from raced Promise alone. |
| Fanout source / response lifecycle | Actual fetch, stream.read and cancellation retained by unchanged request helper | Test counter must measure inside actual request lifecycle until cancellation settlement, not outbound-service headers or clock.child raced return. Max2 is whole lifecycle, including failed work still physically pending. |
| Step2 RED / Step4 GREEN | Fixed50ms workload after preparation and valid GET, beforePOST | Identical workload; 112serial GET adds≥5600ms across original5s child, nominal fanout64slots adds3200ms plus native work. Actual timing decides; no passing-threshold tuning or clock patch. |
| Source count / I/O instrumentation | Uninstrumented SDK positive separate; old sdk-observed adds reader calls | New I/O-only mode must neither invoke source probes nor wrap SDK/KV. Verify112full/84timestamp and exact endpoint multiset, original SQL count unchanged. |
| Step5 drift expectations / provider TOCTOU | beforejoin/afterfirstprimary/between snapshots | Changes must be placed before the relevant existing read. No claim to detect a change after all original checkpoints; no additional authority-producing read to manufacture denial. |
| Step5 failed siblings / concurrency | Sibling may continue allowed reads after other rejects | Complete joins + existing retentions deny partial results/effects. No next snapshot/effect after rejected join; no global provider cancellation/drain claim. |
| Step6 affected vs wholebranch CI | Unit regression first; integration fullCI later | Ruling: this unit runs scoped relevant groups and native fixture compilation only. Do NOT add full npm test/lint/build or separate standard package compiler now if the graph remains unmounted/unchanged as accepted D0.2/D0.3 evidence shows. Wholebranch fullCI/actual mounted compiler belong to final integration, once, not every source slice. If actual source reachability changes, report before widening. |
| Task file map / qualifier | No production workflows/SDK/deps changes; cloud test runner still needed | Ruling: own temporary branch/path-scoped credential-free Actions qualifier allowed and must be removed before report. No reusable production workflow or runtime command. One writer only. |
| Plan coherence | Three private local helper extractions; one unit, tests before source | File map and signatures agree; no D1 batching/cache/caps/expiry/access delta. Existing fixture old mode preserved, actual source/body/bytes remain original. |

## Review acceptance / next activation gate

Root accepts the conservative design as the next candidate SOURCE unit, within delegated owner discretion. This records ROOT choice, not a claim of separately solicited owner approval. It adds no real access, no new Entry, no SDK operation against real KV, no production publication and no provider query. Execution remains INACTIVE until D0.3 is accepted, an exact product BASE is recorded and one implementer is dispatched with a bounded brief. Design author has finished and may not touch advancing product.

If the50ms fanout fails genuine5s viability, stop that unit with measured evidence; root will make a new bounded technical ruling. Do not silently lower delay, add cache, skip reads, batch SQL or widen clocks. Fix rounds for review use the same implementer/scoped diff under standing SDD.

operationalReadiness=false;completePackage=false;PCoff=false. Source ceiling2026-11-03T02:59:00Z expired. Original live scopes/credentials/OTP/Entry/runtime/Max remain untouched. Single coordinated consuming PC-off occurrence remains later.
