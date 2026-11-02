# C3 premature finite admission — refinement for implementation

Source-only ruling; no runtime repair, new grant, owner window, native launch or provider action. Extends reports/2026-11-02-finite-admission-preflight.md. The source race is established there; no speculative credential/provider attribution.

## Outcome and boundary

A premature finite subscribe must not insert the second admission or closure and poison the later prepared reservation. A launch guard alone is too late. A JavaScript early check alone leaves a D1 race. Preserve cleanup for every unknown admission result or possible process. Existing ordinary/nonfinite behavior, grant/consent/SQL time fences, original finite writer lease and settlement/reduction semantics stay intact.

Only bounded library composition is selected initially; actual Worker finiteGate wiring remains a separately qualified owning gate. Callback readiness, Save, useful receiver turn, early withdrawal and full publication package are separate.

## Native source, lazy admission, cleanup independence

createFiniteNativePrimaryReader accepts optional all-or-none nativeAdmission:{ctx,env,program,programSourceRevision}. Capture and validate actual fixed bindings, control identity, program/source and DB equivalence; no request facts/callbacks/SQL/clock overrides beyond the existing internal constructor. Return a private source-specific admissionSource with provenance tied to this DB/control/candidate, never a caller-enrolled callback-shaped object or generic registration.

Existing read/reservation/admission/launch settlement readers remain available without admission authority. New admissionSource is not a ready permit. IMPORTANT: resolve readOwnSuccessorHost/resolveSuccessorPreparation/current LAZILY on admission use. Constructors also serve cleanup after Save/revocation/N1; requiring a live grant/window there would break reductions, sealing, physical retirement and historical observations. No recursion through cleanup factory to resolve an admission source. Exact resolver dependencies and closed behavior must be verified before code.

Existing createFiniteAdmissionGate exact options gain admissionSource. Its private record holds the source helper. Internal assertFinitePreparedAdmission(gate) and finiteAdmissionInsertConstraint(gate,internallyCreatedManifest,originalIssuedLease) use that existing brand; neither accepts SQL, reservation DTO, ready flag or arbitrary callback.

Native cleanup factory supplies actual ctx/env/nativeCleanup program and revision into this source, then the gate. Source validates the actual fixed successor policy, resolved candidate trial/container/program/source/window and original application against finite control. Preserve current-holder/source checks around each admission query and before generating SQL constraints. Settlement hashes never grant admission.

## Fixed prepared-reservation D1 constraint

Use source-owned literal predicates/parameter order, not caller SQL. The existing admission INSERT...SELECT must additionally EXISTS the actual prepared successor reservation joined to its matching original predecessor admission and closure. Preserve all original admission grant/owner/consent/revocation/closure/scope/time predicates.

The reservation joins original admission by predecessor container/generation/program/source/image cloudflare/debian-trixie and closure by actual grant/container/generation/program/source/image. Predicate requires slot afw.own-successor.v1, resolved trial/scopeHash/original application, predecessor pins, candidate container/program/source, exact start/expiry, matching closed_at, state prepared, budget1, T0<=reserved_at<=SQL_NOW and start<=SQL_NOW<expiry. The generation comes from the actual joins, not a fabricated parameter. No global admissionsCOUNT=1 here; that is reservation creation's separate condition.

Read additionally clips SQL_NOW to min(N1,candidate.expiry,selectors.expiry). INSERT adds manifest.expiry<=reservation.expiry and SQL_NOW<min(manifest.expiry,original issued lease.deadline), with reservation aliases INSIDE EXISTS. Use actual D1 millisecond expression, not JavaScript Date.now. A historical reservation observed_at never creates a renewed 30-second lifetime. Existing launch retains fresh retirement/deployment checks.

Only successful cardinality-checked first-primary query can establish missing/not-eligible reservation as definite denial. Read error/malformed result is ambiguous, never a ready or safe-zero permit.

## Cleanup routing: trusted private classification

One per-custody/current-start private error brand, minted only inside that implementation. Internal isKnownNoAdmissionFailure(error) recognizes only that invocation's existing private object; never public error text/code/boolean/DTO. Custody safe wrapper preserves ONLY this exact object, sanitizes others; host catch skips custody.close ONLY on recognition by its own custody. Outer host safe always emits existing generic failure.

Precondition guards belong INSIDE routing that applies this classification, before beginAdmission/admission/runtime; not a generic pre-try throw that accidentally avoids cleanup. Repeat at custody boundary for alternative trusted compositions.

Brand only:
1. Source-owned fresh-attempt observations establish no prior unresolved admission/launch/custody/finite writer, then definite precondition denial occurs before beginAdmission/admission/runtime.
2. Every actual D1 execution in this start resolved success===true and meta.changes===0, none pending/unknown, no possible launch.

The finite marker, if issued, remains spent/unresolved; no reset/refund/retry permission. Actual ordinary INSERT...SELECT .run() is retained, not ORIGNORE/RETURNING/.first. Thrown uniqueness error is NOT acknowledged zero. success:false/missing or malformed metadata/changes1/lost ACK/post-insert authorization or custody persistence/readiness failure/possible runtime all retain cleanup. Later read showing no row is not proof of zero writes.

D1 execution lives inside a retriable DO.storage.transaction callback. Cumulative pending/unknown/inserted evidence must live OUTSIDE callback. A later rerun with changes0 cannot erase any earlier changes1, unknown or pending operation. Keep underlying operation retention and original clocks, no new admission lifetime.

## Focused qualification

Use actual workerd SQLite DO and D1, actual host/custody/gate/primary/reservation composition, explicit SYN source/custody/approval/runtime boundaries. Meaningful RED must demonstrate the current premature-admission/closure race and atomic SQL gap, not a missing import alone.

- Missing reservation premature subscribe leaves complete DO/D1 snapshots unchanged, zero launch/close/callback, and intended reservation later remains insertable.
- Wrong exact source/control/predecessor/scope/trial/application/candidate/window/budget/state and not-yet/expired reservation deny before markers.
- Host guard passes then custody guard denies: trusted fresh case skips close, ambiguous prior state retains cleanup.
- Both pass but reservation/consent/time changes before INSERT: ACK success/changes0 skips close, marker remains unresolved.
- Throw/lost ACK/malformed/successfalse or changes1/later failure retain cleanup.
- Callback reruns changes1/unknown then0 still retain cleanup; pending underlying promise never treated as settled.
- Existing unresolved admission/launch/custody cannot mint safe brand; forged public Error/DTO cannot suppress close.
- Valid reservation admits at most once under original lease; existing launch fences unchanged.
- Construction and historical read/seal/close/reduction remain possible after Save/revoke/N1, while admission denies.
- Ordinary nonfinite paths unchanged; actual Worker mount still unavailable unless explicitly separately qualified.

Source acceptance never establishes active grant, physical process settlement, subscription, useful cloud review, native unsubscribe or PC-off. operationalReadiness=false; completePackage=false; PCoff=false.


## Confirmed lazy call-path delta (read-only followup)

At44dde8d: cleanup-host18,23–40 constructs primary/gate before exposing settlement, seal, withdrawal, close and retirement. finite-primary10–26 has historical reads without live-grant/N1 cutoff. finite-admission-gate45,58–70,74–80 separates begin/N1 from settle/seal/C1. successor-host17–27 validates enabled policy/current bindings and creates provider adapters; these must be resolved only on admission use. worker/mcp-own/index23–28,30–34,73–81 deliberately uses deferred close and historical bypass.

Minimum private source methods assertPrepared() and insertConstraint(manifest,originalLease), fresh on each invocation. They must not call #finite, #host, cleanup factory/resolver or nativeCleanup.close. No successful readiness cache. Existing read/settle/seal must never invoke this helper. This explicitly supersedes the read-only agent's earlier eager-constructor proposal.
