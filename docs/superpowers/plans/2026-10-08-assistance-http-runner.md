# AFW finite HTTP runner implementation plan

> For agentic workers: use superpowers:executing-plans task by task. Owner authorized consecutive local implementation; review remains required before merge.

**Goal:** Connect the reviewed six-phase counter to canonical HTTP transport without retries or hidden recovery requests.

**Architecture:** A trusted host supplies fresh cloud observations. The runner independently validates its immutable owner manifest, pins, margins and every correlated reply inside the counted callback. Server approvals and effects remain authoritative in D1, with no VM attestation claimed.

**Spec:** docs/superpowers/specs/2026-10-08-assistance-occurrence-http-qa-design.md

**Constraints:** Six normal HTTP sends and at most one stop; six normal observations maximum; fixed origin, 1024-byte requests, 8192-byte replies, ten-second abortable transport. No mounting, remote activation, customer reads, credentials persisted, scheduler or recovery queries.

## Task: internal runner and meaningful regression tests

Files: create lib/assistance-http-occurrence.mjs and test/assistance-http-occurrence.test.mjs. Reuse lib/operations-http-transport.mjs and lib/assistance-occurrence-transport-budget.mjs.

- [ ] Write failing tests: six correlated replies complete; a malformed or lost finish consumes the attempt and permits only one stop; stale/mismatched host evidence prevents the next send; timeout and reversed clock stop; mutated caller manifest cannot extend authorization.
- [ ] Run and preserve red result before creating product module.
- [ ] Implement exact envelope version, occurrenceId, phase, sequence, planDigest and typed result checks inside the callback. Create/admit result is literal accepted; list has one exact signal; claim has eventId/requestId/runId/expiresAt; finish has intervention_required or superseded; stop is literal stopped.
- [ ] Count the failed send before invoking transport. Failure before any send makes no stop request. Once create was attempted, at most one stop may be attempted if credential lifetime can contain its timeout. Stop is ledger closure only; do not describe it as administrative restoration.
- [ ] Preserve old runner/checkpoint API unchanged; run targeted legacy and canonical client tests.
- [ ] Independent review, full tests/lint/build and CI; only then merge. Real host observer and ordinary cloud source adoption remain operational gates.

## Review focus

Invalid HTTP200 finish must not mark completed. An observer result is trusted only as a host dependency, never from an HTTP request. Expired business window may permit a stop but cannot extend work. Source/pins in the manifest are owner authorization; server cannot attest checkout. Counters are per invocation; D1 prevents repeat effects across instances.
