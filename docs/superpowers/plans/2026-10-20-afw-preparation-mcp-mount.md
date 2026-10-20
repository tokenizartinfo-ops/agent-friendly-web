# SDD ledger — guarded preparation MCP mount
Spec: ../specs/2026-10-20-afw-preparation-mcp-mount.md
Based07cc4690fd1929c10cfde83fbce6a97fd4c6afa/tree910a568bd7ec307805d57b6a881fd01981dc5f0d. GitHub/Actions ONLY. Existing source roadmap Step4. Executing-plans/TDD inline; one fresh most-capable whole-branch review. Critical/Important one RED->fix/GREEN pass, Minor defer.

## Rulings/preflight
Ruling: extract actual business composition into a detached mount rather than accept arbitrary server factories — reuse existing repository/host/registrar and constrain scope/context — cost if wrong: future host must adapt this small interface, no live caller affected.
Ruling: trusted validateAccessToken factory remains server-owned; actual SDK used in native fixture — no API can turn client JSON into a verifier — cost: production AS/Access integration still needs its own approval/qualification.
Ruling: bounded2000ms waitUntil cleanup grace is privilege-reducing only, no original5s budget extension or remote closure claim — late-connect requires a second close — cost: an unresponsive dependency can outlive observed cleanup, never certify it closed.
Ruling: fixture-only SDK method wrappers hold real async work and forward real methods; no success mock — cost: composition evidence is synthetic transport testing, not production/human proof.
Ruling: remote isolated branch/spec/plan/PR/issue ledger substitutes local worktree/sdd scripts by owner cloud-first preference.
Interface rows: HTTP original opaque lease -> OAuth host budget (must preserve identity); SDK verified context -> existing projection/host/repository (no header authority); real MCP server -> both JSON transports (same primary authority); pending auth/connect -> final cleanup (closed gate + no reset).

## Tasks
1. Add actual SDK native behavior tests/probes first, run full CI RED; record exact failure/cascade. No source import-error-only acceptance.
2. Implement detached mount, replace CI-only inline mcp composition with it, add fixture-only hold/release/stats forwarding real SDK methods. No production importer/config/DDL changes.
3. Existing full Actions tests/lint/five builds and applicable release build-only; review once, ledger rulings/deferred findings; critical fixes RED/GREEN once.
4. Exact tested tree merge, fresh mainCI/artifact metadata/no download, issue497 receipt closes ledger. Source rollback reviewed revert.

## Closure
Only source/runner mount and late-work safety. G2CLOSED/noOTP; human host/migration/finite real preparation test and Container/event/nativewithdrawal/PCoff/Max unaccepted. operationalReadiness=false. No support mail/body/OTP/keys or remote operations in this block.

## Observed RED
f5e29d5cbba7cbd392cdcc5c8064a51ee9ff454b/CI39359154625/job118420957853:2357PASS/7FAIL/1existingSKIP. Six new subcases fail (disabled probe404, two held-auth/held-connect/config drift wrongly resolve instead of reject, missing real validation telemetry); parent aggregate is seventh. Existing behavior passes, including new actual-schema characterization. Implementation follows, no import-error-only RED.
Ruling: local request lease failure must not poison a reusable mount; only observed configuration/global clock drift latches its configuration closed. Cost if wrong: a new request within the same original finite profile could be denied unnecessarily, never granted extra time.
