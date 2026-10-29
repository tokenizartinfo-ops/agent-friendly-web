# Implementation plan
Design: docs/superpowers/specs/2026-10-29-private-permission-withdrawal.md.
1. RED: strict fixed-context tests, SQLite isolation/audit/idempotency/failure/clock tests on GitHub Actions.
2. GREEN: internal unmounted reduction factory; use existing monitoring writer, guarded read UPDATE, bounded original close and primary reconciliation.
3. Native: real workerd D1 + DO custody across close/restart; preserve false native/physical claims.
4. Full CI, one independent code review, fix material findings, merge, source checkpoint. No live opening from this plan.
