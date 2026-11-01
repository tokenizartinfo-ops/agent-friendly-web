# AFW bootstrap custody inspection implementation plan

> For agentic workers: use superpowers:subagent-driven-development or executing-plans; fresh review and source CI before merge.
Goal: inspect the actual protected job token identity without changing any cloud runtime/access.
Architecture: small fixed read-only inspector + CLI entry + owner-only comment workflow, independently mergeable from pending finite guard branch.
Tech: Node22 builtins, GitHubActions, fixed Cloudflare self-verify API.
Spec: ../specs/2026-11-01-qa-bootstrap-custody-inspection.md

## Global constraints
Cloud-only; no mutation except isolated GitHub source/tests/reports. Existing secret/environment only. No token value or arbitrary selectors. Original command5min and request5s ends, no retries/clock compensation. Token metadata is not workflow permission or readiness.

## Task1 — complete read-only inspection and source qualification
Create lib/mcp-qa-bootstrap-custody-inspection.mjs, scripts/qa-bootstrap-custody-inspection.mjs, .github/workflows/afw-qa-bootstrap-custody-inspection.yml, test/mcp-qa-bootstrap-custody-inspection.test.mjs. Keep these standalone; do not edit finite-guard files or main. Reuse established strict helpers only when that preserves the new fixed command/GET-only scope; no generic kind selector.

Internal interface: runQaBootstrapCustodyInspection({event,context,readCredential,fetchImpl,now,signal}) returns the spec bounded DTO; readCredential is lazy and only the CLI supplies ()=>process.env.AFW_QA_CLOSED_TOKEN. Pure fixed GET helper may be exported for future finalizer reuse if it carries no authority claim or arbitrary selector. CLI accepts no arguments, validates actual GitHub environment/event file safely, writes ONLY fixed sanitized result artifact, no error detail/environment output. Workflow exact command prefix/source, owner/context/main/created/attempt1, existing protected env, read-only permissions and max5min.

- [ ] TDD RED: fake fixed GET collector records zero credential reads/requests for wrong owner, source, issue/PR, sender/action, attempt/branch, future/stale/reversal/abort. Success/mismatch/expired/disabled/missing-expiry yield truthful bounded metadata, never credentials.
- [ ] GREEN minimal implementation: exact endpoint, no redirect/retry/body; opaque safe header; bounded read and original lease after every await/return. Test held fetch/body/deadline, oversized/malformed/unknown response/getters, 40110000, stale Date/cache, malicious error text/credential sentinel absent from output.
- [ ] Source workflow/CLI conformance tests: only GET/core, fixedenv/secret/artifact, no schedule/newscope/no arbitrary inputs, no secret before admission. Meaningful tests, no test-for-every-line.
- [ ] Exact branch-only Actions qualifier focused tests+scopedlint (temporary, exclude integration); nearby admission tests if shared imports; no fullsuite each edit. Root later runs normalPR/fullCI.
- [ ] Commit/self-review/report docs/superpowers/reports/2026-11-01-qa-bootstrap-custody-inspection.md + ledger samebasename under progress. Record exact BASE/code/run/job/REDGREEN/counts/limits and temp qualifier exclusion. No live inspection dispatch before source review/CI/merge.

## Preflight
Single task interfaces library→CLI→fixedworkflow; CLI alone supplies existing secret lazily, event guard precedes read. No shared files with finite guard Task2; branch from maincd13, so may implement while guardreview runs. Read-only GET cannot activateAFW or fix401. Source revert is rollback; no runtime rollback required. Root accepted this bounded spec; no additional brainstorming/human choice needed.

## Review focus
Auth before secret; late read cannot return verified; unknown expiry truthful; response/error never leaks; worker-scoped token identity not advertised as Workflow permission. Add the focused tests above.
