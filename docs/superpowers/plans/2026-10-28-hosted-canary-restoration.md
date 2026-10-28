# Hosted private canary restoration plan
Spec: docs/superpowers/specs/2026-10-28-hosted-canary-restoration.md
Base:56045cde0c58469fc519f4e0d9ab0b422553c983, PR631/mainCI40745900158 accepted.
Goal: mount the accepted restoration/handoff/transport in the existing private QA host under an original, revocable actor control; no new runtime resources.

Task1 tests and shared policy: behavioral/native host tests first, Workflow dispatch/config preservation tests; observe RED before implementing. Extract the exact common policy parser without changing accepted behavior.
Task2 private actor host: immutable arm/terminal withdraw/status control, original ctx/namespace and original finite leases; primary refresh/unknown ACK fences; compose existing handoff/provider/core/transport and forbid original RPC after captured history.
Task3 private wiring: retained host in IndependentClosure, separate Workflow ops with fixed actor/hash and original absolute sleep; all legacy behavior unchanged. Source flags false and cross-script original binding only; no runtime deployment.
Task4 full CI/package checks, fresh branch review/material RED-GREEN/full suite, exact source integration/main verification and checkpoint.
Review focus: terminal primary control and reentrancy/instance recreation; withdraw during in-flight provider/storage work; no authority or date renewal; ACK uncertainty/no retry; unchanged legacy QA and no public exposure; actual original/candidate/ctx identity; no original RPC after restoration; payload not selector. Explicitly qualify source/test scope rather than claim live native scheduling/withdrawal/PC-off.

Rulings: reuse existing namespace with a distinct fixed actor instead of adding infrastructure, conditional on native preservation tests and eventual rollback verification. Remote GitHub/Actions replaces local worktree/build under owner preference. Actor primary control, not a stale Workflow env snapshot, controls effects. Explicit withdraw does not roll back a dispatched provider request. Restoration-only host must fail if permissions/actor retirement are not already proved; do not add guessed grant mutation or native client capability.
