# Named-phase primary eligibility —31 October 2026

AFW source-only increment after PR668; no runtime mounting, D1 capability deployment, remote SQL or grants.

ARM requires global reservation zero. A named confirmation must later finish after its OWN immutable reservation exists; reusing the ARM predicate would reject its successful insert. Add a separate read-only createPrivateQaNamedEligibility with strict server-fixed db/original/candidate/window/history/clock and bounded check(parentSignal). No selectors, SQL or callbacks from event payload.

One first-primary SELECT: original admission and matching physical closure, global admissions1, exact known cancellation history and current unrevoked single-read-scope OAuth/monitor grant. Candidate and window dates must match exactly; window grant must equal history currentGrant. Both local and primary SQL require startAt<=now<expiresAt.

Reservations: global0 OR exactly1 matching slot/stateprepared/budget1, trial, four predecessor fields, application, candidate container/program/source/scope, start/expiry, and original closedAt. Require integer times; closed/stopped<=observed<=reserved<=SQL_now, reserved within the named window, reserved-observed<=30000. Do not require current-observed<=30000 again: it was freshness at reservation. applicationId with zero rows remains an external pin, not a D1 proof.

Presence does not prove acknowledged INSERT. Lost ACK remains uncertain; no retry, resubscribe, reservation refund or reset. Candidate admission turns this reader false; launch/delivery/cleanup have different phase authority. This reader never proves liveness, physical stop or execution authorization. Named generation fence, source/config correlation and independent guard remain required; cleanup must work despite grant revocation through separate controls.

RED loadable closed placeholder; unit clocks/abort/DTO/drift and native original schema/known NULL history. Native zero and own reservation succeed; ARM remains zero-only; foreign row or grant/monitor/history changes fail with immutable reservation and history preserved. Independent review, complete suite/lint/build and exact accepted tree. Rollback is source-only revert.
