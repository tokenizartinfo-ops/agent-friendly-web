# AFW dossier supervision CLI — source-only

Expose existing operations-client dossier methods through exactly three CLI commands:
`dossier-list`, `dossier-claim EVENT_ID REQUEST_ID`, `dossier-finish RUN_ID OUTCOME`.
Return existing signals/reservation/outcome nesting. Delegate all ID/outcome validation;
never generate IDs, retry, duplicate HTTP, or translate reviewed/superseded to resolved.
No server, transport, auth, scope, budget, runtime or frozen artifact changes.
Acceptance: real CLI with intercepted HTTP preserves exact paths, bodies, metadata,
explicit UUIDs and outcomes; invalid input sends nothing; lost ACK sends once and
recovery requires explicit same-requestId invocation. Not evidence of cloud delivery,
consent, useful review, native unsubscribe or PC-off. PR571 remains gated.
