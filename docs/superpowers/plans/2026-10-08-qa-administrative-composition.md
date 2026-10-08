# Administrative composition plan

1. Write failing shared-fixture tests for catalog plan/hash authority, bounded transport, full readback and issued-only recovery.
2. Export existing strict QA registration validator, then add lib/assistance-qa-administrative-composition.mjs without altering runtime entrypoint or historical readback.
3. Native workerd SQLite coordinator test: synthetic provider executes PUT then loses acknowledgment; reconstruction recovers by GET, one PUT total.
4. Focused tests/lint/diff, independent review and exact CI before integration. Save full D1 approval/custody/hosted acceptance gates separately.
