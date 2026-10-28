# Native retirement-handoff committed ACK-loss qualification

Spec: docs/superpowers/specs/2026-10-28-successor-retirement-handoff.md (PR628).
Base: f429f72898215a7cd472a0fa626d4ebdba48e5fb, after PR629/mainCI40739023084 accepted.

## Goal and boundaries
Close the explicitly deferred native storage ACK-loss qualification for the existing private handoff. Test-only: no production code, host, deployment, credentials, grant, reservation, namespace, actor or real Container is added. Use GitHub branch/Actions, no local checkout/dependencies/build. Original custody/provider/clock stay synthetic.

## Steps
1. Extend the existing workerd/Miniflare test with a CI-only adapter around actual SQLite DO transactions. Forward get/put unchanged and throw only AFTER a transaction with a real put successfully commits.
2. Require capture to return uncertain with physicalStopVerified=false; independently read the persisted native record and original capturedAt.
3. Recreate the isolate with original custody explicitly absent, disable ACK fault, and require read-only re-observation of the same provider process and original capturedAt. Verify later capture returns already_recorded without provider reads or a changed private-record digest.
4. Run full Actions test/lint/build and package checks. This qualifies a previously omitted boundary, not a production defect repair; do not fabricate a missing-feature RED.
5. One fresh read-only branch review; material findings follow RED/GREEN, minors ledgered. Integrate only after full CI, verify exact main tree and CI.

## Rulings
Remote branch/Actions replaces local skill worktree/ledger under owner cloud-first delegation. Existing issue497/PR ledger is the durable checkpoint. This native test proves committed storage survives ACK loss/recreation, not real custody/revocations, a provider's process retirement, native unsubscribe or PC-off. No new live attempt is justified by a green result.
