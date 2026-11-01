# Existing native confirmation: private known-cancellation adapter
2026-11-01 UTC. Historical design baseline abdb91763ca8eab5254022680ca54cf992afcddc. Implementation baseline 7163bde8a956f82fe1a55bae1116123c3ee72371 / tree b54cdf73a8514cbb21a24c679dd93685e4b5c4fe (PR708 diagnostic only). Fresh design review approved with mandatory fixture migration, resolved in plan before code. operationalReadiness=false.

## Decision and evidence
Reuse the mounted AfwReleaseWorkflow -> runReleaseWorkflow -> reserveReleaseSuccessor route. Add ONE private administrative adapter to provide the two already-supported inputs, authorize and cancellationHistory. Do not rebuild the reservation SQL, historical reader framework, ledger, V2 generation or ARM.

Root's separate SELECT-only evidence at 12:21:46 UTC identifies the shared source-bound canary/RELEASE_DB 6a728254: admissions1, closures2 (one admitted process and one NULL-generation cancellation), reservations/fixed-slot0, launchclaims0, subscriptionreceipts0. These counts explain the legacy COUNT(closures)=1 rejection but do not prove complete identity/consent, DO budget or custody. This design agent read source, not runtime DB.

Root's Work receiver discovery at 12:22:40-44 UTC found AFW event afw.dossier.changed for the fixed project through existing ChatGPT Work. This is metadata capability evidence only, no subscription/grant or delivery. No new receiver is proposed.

## Conflict table and minimum correction
| Existing producer/consumer | Actual contract | Correction |
| --- | --- | --- |
| worker/mcp-release/index.mjs AfwReleaseWorkflow | Passes only bundle/env/event/step | For confirm_named plus reservation opt-in, call the new fixed administrative adapter. Other dispatches/publish stay unchanged. |
| runReleaseWorkflow, runReleaseOperator | authorize optional; history requires authorize and reservation opt-in | Preserve generic trusted internal API; mounted known-history route always supplies BOTH, never caller-selected functions. |
| reserveReleaseSuccessor | Passes hooks to challenged native retirement reads and createSuccessorReservation | Reuse exactly; no new RPC or retirement bypass. |
| prepareKnownCancellationHistory / validateNamedCancellationHistory | Strict <=16KiB history, exact current grant equals sealed event policy; no DB read or authority | Producer supplies primary-derived exact data, then calls both existing validators. |
| createPrivateQaNamedEligibility | Complete primary known-history/current consent test; permits zero reservations OR one exact own reservation | Reuse at every authorize hook; external/different trial/container/scope/window reservation denies. |
| createPrivateQaNamedAuthorization | Requires V2 armed-generation receipts; expressly not full effect authority | Do not use for this route; no new V2 prerequisite. |
| createDossierMonitoringAuthorization / createDossierEventRpcAuthority | Requires OAuth-validated request context | Do not fabricate context from a bundle. OAuth client subscription remains separate. |

## Authority, exact host interface and data producer
Add ONE host export to the existing lib/mcp-release-runtime.mjs (alongside its two current exports):
```js
runKnownCancellationReleaseWorkflow({bundle,env,event,step})
```
This is a trusted module interface, not HTTP/RPC/MCP. The mounted caller supplies its UNIQUE build-time bundle and native event/step/env; no function accepts history, authorize, receipt, arbitrary selector or claimed identity from client input. The returned shape is the existing runReleaseWorkflow outcome, no private material.

Authority is narrowly administrative: one explicitly authorized own synthetic finite confirmation/reservation intent, sealed artifact/plan/configuration, actual fixed native Workflow identity, actual verified RELEASE_DB/namespace, and CURRENT primary grant plus separate monitoring consent matching that sealed plan. Native invocation/binding origin is TCB, not platform caller attestation. This is not an OAuth request and cannot authorize subscription, callback, boot, delivery or cleanup. A UUID/hash or bundle alone is insufficient.

Before I/O validateReleaseOperatorBundle and resolveNamedActivationPlan; require confirm_named, all existing reservation/confirmation flags true, exact payload {planHash:SHA256(JSON.stringify(bundle))}, exact native instance afw-release-<hash>, no schedule, native timestamp not future, fixed namespace methods and actual env references. Pin immutable copied bundle bytes and native event identity/values; capture step.do once rather than assuming native method getter stability. No new selector/config flag.

Extract exact event policy (grantId,subject,projectId,clientId,resource,startAt,expiresAt) and manifest from the sealed configuration. Raw subject/project/client/resource are compared with actual current primary rows; opaque ownerRef/projectRef are only manifest commitments and are never treated as authenticated identity.

The new adapter contains a SMALL bounded primary projection, not a new generic reader:
1. first-primary SELECT of original admission joined to its generated closure using sealed manifest original container/program/source/image, LIMIT2; require exactly one matching row. Project original processGeneration/closedAt and original owner/project/client/resource.
2. first-primary SELECT exact sealed event grant and latest monitoring row, LIMIT2; require exactly one, raw identity equals BOTH event policy and original identity. Project currentGrant {grantId,consentSequence,consentRevision,issuedAt,expiresAt}. The current grant is distinct from original/cancelled grants.
3. first-primary SELECT ALL NULL-generation closures joined to their grants and latest monitoring row, stable order, LIMIT9. Max8 permitted; ninth/extra/missing joins/foreign identity block. Project the EXACT cancellation record shape already consumed by prepareKnownCancellationHistory. Never supply a WHERE filter that silently hides unknown closures; complete primary validator's global count and exact join remain decisive.

Use fixed SQL/bound parameters, strict own-data row/byte bounds and no SELECT * / returned private rows. Repeat these bounded projections and require byte equality before admission. A row's presence is data, not authorization: validateNamedCancellationHistory(bundle,raw), then existing createPrivateQaNamedEligibility(...).check(parentSignal) must pass using the projected original, resolved exact candidate and same original window. No static historical grant, historicalContext or old packet supplies currentGrant. No grant/monitoring event is created here. If no current matching valid grant exists, outcome blocked before credential/journal/provider work.

Keep the resulting history bytes private and immutable. An internal unexported authorize(stage,signal) accepts ONLY the 18 existing stages, rejects reentry/abort/drift, invokes the existing complete primary eligibility reader under the SAME request lease, and permanently fails closed after any denial. Initial authorization before calling runtime plus its workflow_admission hook are both charged to that lease. No authorize callback comes from payload/config/caller and no callback/token is returned. Pass the fixed internal closure and raw history to:
```js
runReleaseWorkflow({bundle,env,event,step,authorize,cancellationHistory,requestLease})
```
Keep the adapter in the SAME runtime module so requestLease can be truly module-private: mint an exact owned {current,remaining} object, register its identity in an unexported WeakSet before the first await, and require membership whenever the optional requestLease parameter is present. No lease factory/registry/accessor is exported. Shape-compatible objects, JSON/DTO copies and foreign leases are rejected; direct legacy calls with the parameter absent keep current behavior. The adapter invalidates/removes its lease at final settlement; it cannot be replayed. requestLease is not a payload/RPC input. A minimal additive runtime parameter conjoins this parent lease in runReleaseWorkflow's current() and remaining(); existing runReleaseOperator already inherits these functions. Without this plumbing, stage checks alone could let the runtime continue under its longer policy window, so it is REQUIRED. Validate and pin the internal lease methods; absent preserves older trusted calls. Only the new same-module mounted adapter creates it; it cannot extend any child deadline.

The final reservation INSERT SELECT STILL repeats the complete known-history/current-consent predicates atomically; pre-read authorization does not replace that write fence. No changes to mcp-successor-cancellation-history.mjs or reservation SQL are planned.

## Original budget and exact 18 hooks
Source anchor: at baseline abdb917, lib/mcp-release-runtime.mjs line116 already caps the named step at Math.min(70000,remaining()); lines102-105 bound the Workflow by policy.expiresAt. That is NOT an existing global70s-from-event guarantee. This design deliberately NARROWS the existing route by starting that ceiling at the original native event time, including queue/projection. Existing reservation5s (lib/mcp-release-successor-reservation.mjs line27) and activation20s (runtime line75) remain narrower child budgets. This is not the optional QA ARM path and does not replace/extend its5s lease. If mounting inherits ANY tighter parent deadline, it must be conjoined; unavailable/unverifiable inherited authority blocks rather than allocating70s.

Capture one budget BEFORE projection/first await: end=min(sealed policy.expiresAt, native event.timestamp+70000), using the existing named step maximum as a narrowing ceiling, plus a monotonic deadline derived once from that original end at entry. Reject queue-expired/future events; never recompute end from later now. policy.startAt remains unchanged. This adds no time beyond the original nominal N1; packaging must ensure policy expiry is within the original authorized N1. R1 cleanup authority/deadline is separate and unchanged; nominal consent failure must not suppress authorized finite cleanup.

All projection, initialization, hooks, provider/RPC waits and final serialization consume this SAME deadline. Reader timeout is min(5000, remaining ORIGINAL budget), a per-operation ceiling inside one fixed budget, not a renewed five-second request window. The adapter's original fenced clock feeds eligibility. On its expiry, permanently invalidate; race adapter output to bounded uncertainty, do not claim remote cancellation. The internal requestLease propagates the fixed end into runtime current/remaining; existing step/activation/reservation sub-budgets continue to narrow it. A hook cannot extend the whole path by up to 18*5 seconds. Do not claim 18 checks plus HTTP fit until native elapsed timing proves it.

| # | Stage producer | Runtime consumer boundary |
| --- | --- | --- |
| 1 | runReleaseWorkflow | workflow_admission before step/provider |
| 2 | runReleaseOperator | operator_credential before reading own credential (may recur) |
| 3 | runReleaseOperator | operator_primary_read before publication SELECT |
| 4 | runReleaseOperator | operator_primary_result after SELECT |
| 5 | createActivationJournal | activation_before_read |
| 6 | createActivationJournal | activation_after_read |
| 7 | createActivationJournal | activation_before_attempt |
| 8 | createActivationJournal | activation_after_attempt |
| 9 | createActivationJournal | activation_before_receipt |
| 10 | createActivationJournal | activation_after_receipt |
| 11 | createActivationJournal | activation_before_acceptance |
| 12 | createActivationJournal | activation_complete |
| 13 | reserveReleaseSuccessor | successor_rpc before each challenged custody call |
| 14 | reserveReleaseSuccessor | successor_rpc_complete after each custody call |
| 15 | createSuccessorReservation | successor_before_retirement |
| 16 | createSuccessorReservation | successor_after_retirement |
| 17 | createSuccessorReservation | successor_before_write |
| 18 | createSuccessorReservation | successor_after_write |

These are 18 unique stage names, NOT 18 guaranteed invocations or 18 SQL calls. Credential/custody checks may recur. Each consumes the single original budget; measured actual count and elapsed time must be recorded. After the own INSERT, eligibility accepts only that same prepared row/trial/container/scope/window; no generic 'one row is okay' rule.

## Failure and preservation
Before runtime entry return existing blocked outcome. The deadline gates local authorization/decision and fresh effect admission, not the atomic remote commit time. An already issued SQL/RPC operation can settle/commit late. Classification/row/parser failures return fixed sanitized errors/outcomes with no raw D1/provider/policy data. After runtime handoff, any adapter timeout/unknown late result is conservatively uncertain/mayRetryfalse, preserving all activation attempts/receipts/acceptances and any reservation. Check lease again after outer runtime/step settlement; no late confirmed result. This does not add Workflow durable retry semantics, reset consumed intent, or prove ACK cancellation.

Never delete/rewrite closures, grants, monitoring history, activation journals, fixed global reservation slot, launch claims, actor custody or DO budget. NULL generation remains cancellation-without-admission, never physical stop. Native retirement evidence remains required. D1 counts do not prove original/successor DO availability.

## Promotion gates outside this source patch
Fresh exact own grant must be OAuth-exchanged, unrevoked, correct singleton scope/identity and sufficient expiry, with separate exact monitoring grant sequence/revision/window covering candidate expiry. User consent is obtained only once a reviewable finite package exists, through existing supported flow; no reuse of withdrawn historical grants.

Actual RELEASE_DB binding provenance and native fixed actor/custody/once budget must be independently checked. Closed operator855 pin is incompatible with silently making that operator operational: choose and review either existing independent-QA finite cleanup with a compatible execution arrangement OR an explicit finite operator profile with measured module/config and recoverable CLOSED rollback. This patch implements neither profile nor cleanup and does not claim the contradiction solved. Existing N1/R1 and external cleanup stay original.

Then qualify the single integrated route with the discovered existing Work receiver, real consented subscription/callback, saved producer, useful delivery/review and unsubscribe/native withdrawal/independent closure. No new receiver, V2/ARM, credentials, runtime activation or Max follows from this document. Root fresh design review before code.

## Required fixture compatibility
Mounted confirm_named+reservation cases must migrate their existing synthetic fixtures to complete immutable original identity/history, current grant and monitoring tables. Preserve existing custody-failure-stage and journal-retention assertions after the new authorization succeeds. Never add an authorization-free mounted fallback. Unchanged behavior applies to generic direct calls with no requestLease and mounted non-reservation modes.
