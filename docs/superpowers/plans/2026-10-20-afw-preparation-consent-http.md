# Authenticated preparation consent HTTP adapter implementation plan
> For agentic workers: use superpowers:executing-plans inline; one fresh whole-branch review.
Goal: source-only GET/POST /authorize joining existing Access verifier, SDK, persisted choice and view.
Architecture: detached default-closed adapter reuses original lease/store/policy/view; CI-only wrapper reuses actual code/token/MCP fixture. No production entrypoint or AS registration change.
Tech Stack: JavaScript, OAuth provider1.2.1, jose, Miniflare/workerd/D1, existing GitHub Actions.
Spec: ../specs/2026-10-20-afw-preparation-consent-http.md

## Global constraints
AFW only; GitHub API edits/Actions tests, no local clone/build/install/container/download.
Original5s request / profile<=600000ms / input4096bytes / output32768bytes; no refreshed window.
Source rollback reviewed revert; no DDL/drizzle/credential/live permission/worker/deploy action. G2CLOSED/noOTP, operationalReadiness=false.
Owner requested autonomous consecutive source work: inherited architecture and this bounded source adapter may proceed without repeated design/merge prompts. Remote consent/rollout remain separate concrete gates.

## Rulings and interfaces
Ruling: implement only /authorize now, not silently expand current read Worker — avoids mixing live client scopes; cost: production AS/token/refresh/connections integration still unaccepted.
Ruling: one new CI wrapper may expose original fixture context, leaving existing tests/production unchanged — reuses actual SDK token callback and MCP mount instead of duplicating them; cost: CI wrapper is not a deployable host.
Ruling: real ephemeral signed Access assertions + existing verifier/local public key — no fake identity success; cost: remote JWKS/Cloudflare issuance remain unqualified.
Ruling: use store inspect for current admission receipt and source fences; no duplicate grant admission algorithm.
Ruling: uncertain admission is not known-owned; only fresh acknowledged admission can schedule cleanup. One cleanup attempt bounded2s, no promise of remote closure.
Ruling: remote isolated branch/spec/plan/PR/issue ledger substitutes local worktree/sdd scripts under cloud-first owner preference.
Interfaces: original opaque lease -> store/control; SDK original request -> hash/store; verified subject -> primary owned row/policy; receipt -> existing view/code; known-own grant -> existing scoped revoker.

## Review focus
- Same host after one expired request must permit a later valid original-profile request; config drift stays terminal.
- SDK callback CSP cannot block registered redirect or admit a wildcard/foreign origin.
- Unknown DB ACK cannot code-complete or revoke a competing winner.
- Late Access/SDK work cannot start subsequent application actions after request closes.
- Cleanup timeout cannot turn an unknown revocation into a success claim.

## Tasks
1. [ ] Add native characterization/tests first (test/delegated-preparation-consent-http-native.test.mjs + CI fixture); missing factory produces a deliberate feature-absent assertion, no bundler/import-error-only RED. Existing source not changed yet. Existing Actions npm test -> expected RED.
2. [ ] Implement lib/delegated-preparation-consent-http.mjs and wire ONLY CI wrapper. Reuse original fixture SDK context via a CI-only export. Existing full Actions tests/lint/five builds -> expected GREEN.
3. [ ] One most-capable fresh-context whole-branch review. Important/Critical one RED->fix/GREEN pass; Minor ledger/defer. No reviewer loop.
4. [ ] Exact tested/reviewed tree merge with expected SHA; fresh mainCI/artifact metadata only; issue497 closes ledger. No docs-only retest churn.

Ruling: the server cannot know a network acknowledgment lost after response handoff; cleanup applies to SDK completion failure/detected pre-handoff abort only — no client-receipt claim.

## Stop/continuity
No real login/OTP/grant renewal, active G2 reuse, Container/event/guard/PC-off test, Max data/mail or support-monitor restart. New operational trial requires current inventory/recovery, new client/profile, source provenance and human consent. This source increment alone never satisfies those gates.

## Observed RED
35adc22af07225207c3ca7616e4a1dc81d3d2174/CI39417064451/job118608556323:2370PASS/1FAIL/1existingSKIP. New parent fails the explicit missing-factory assertion before bundle; all existing tests remain green. This is feature-absence RED, NOT individual guard mutation evidence. Full native crypto/SDK cases must pass after implementation.
