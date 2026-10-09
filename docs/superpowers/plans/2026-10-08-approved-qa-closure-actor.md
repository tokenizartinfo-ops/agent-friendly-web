# Implementation plan

1. Add RED tests for valid full composition, mismatch/withdrawal, timeout and
   recovery. Pin immutable full approval and registration before asynchronous work.
2. Add internal async factory with fresh bounded primary correlation; optional
   first-primary session, existing D1 authorizeWrite and administrative scope.
3. Compose existing alarm actor; no alternate coordinator, public mount or SQL.
4. Native SQLite DO + D1: actual revocation/stop, lost synthetic provider PUT,
   reconstruction and primary GET-only receipt, one PUT total. Verify deny before
   writes after withdrawal/custody and preserve completed journal.
5. Proportionate tests/lint, independent review, exact source CI, integrate and
   save continuity. No remote mutation/adoption/PC-off/customer readiness claim.
