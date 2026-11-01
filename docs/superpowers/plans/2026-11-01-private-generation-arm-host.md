# Private first-generation ARM host Implementation Plan
> **For agentic workers:** REQUIRED SUB-SKILL use superpowers:subagent-driven-development task by task.

Goal: implement missing first-generation ARM composition with real existing ledger and primary checks, within an explicit UNMOUNTED same-request trust boundary.
Architecture: one private fixed host, existing draft/material/pins/history/eligibility/HTTP/ledger; no mutable transport ingress or new HTTP mode.
Spec: docs/superpowers/specs/2026-11-01-private-generation-arm-host.md
Baseline accepted dff68b84573119b3f56dba45ec31045339276f2e. Owner delegated technical choices, cloud-first and chained execution; no intermediate questions.

## Global constraints
SOURCE/secret-free CI only. No runtime/import/mount/config, DDL/data, keys/grants/OTP/Max/consumer/guard. Native invocation is required trusted declaration, not proven Workflow origin. Local parent clock/abort is a prerequisite, not a new cross-RPC monotonic lease. No new five-second allowance, no legacy/V2 hiding, no global reset or automatic retry. Keep .prepare() unchanged.

## Review focus
- Ledger.pending may exist after first eligibility; reread only literal five legacy records, never call closed .prepare or filter V2.
- An uncertain transaction may have committed; never claim timeout means no armed row or return blocked after unknown handoff.
- Caller declaration/presence of nominated bootstrap does not establish native invocation provenance.
- Mixed namedBundleHash/generationPlanHash must fail; fresh own permission/history/reservation is checked twice.
- Actual source/package provenance and native queue-inclusive mutable ingress are deferred, explicitly not certified.

### Task1 — private ARM host plus directed composition
Create lib/mcp-qa-generation-arm.mjs and test/mcp-qa-generation-arm.test.mjs. Minimal fixed shared pure/read-only helpers may be factored ONLY if semantics and existing closed preparation remain unchanged; prefer existing primitives over duplicated domain validation.
- [x] RED meaningful missing-host API/composition tests in remote secret-free Actions before source.
- [x] Implement exact ten-option/2arg contract and real declared inputs/profile/identity/parent fences.
- [x] Compose existing draft/material/primary/historical/eligibility/HTTP/ledger and rereads; no injected authorization/HTTP reader escape hatch.
- [x] GREEN focused host plus existing ledger/material/preparation/eligibility/HTTP suites and targetESLint.
- [x] Add test-only actual DO/D1 composition, including after-CAS reservation/revocation and uncertain ACK retaining rows; identity/context declaration explicitly synthetic.
- [x] Fresh independent task review, fix/re-review any findings.

### Task2 — documentation and exact-tree acceptance
Update this spec/plan/progress and concise source note; additive older native-quiescence plan/spec reconciliation and AGENTS prefix. No production wiring/config edits.
- [ ] Preserve source vs runtime distinctions and original already-installed EMPTY schemas; no reapplyDDL.
- [ ] Full CI/lint/five existing packages, separate frozen315 checks, exact reviewed head/tree vs actual CI checkout.
- [ ] Fresh whole-branch review, then expected-head merge under existing owner authorization and accepted-main tree readback.
- [ ] Issue497 exact source/check/test/uncertainty receipt; no live readiness or nominal effects.

## Execution/rollback
GitHub isolated source branches, Actions only, no local source/temp/build/clone/deps. Optional branch qualification workflow is secret-free and excluded from final composition. Preserve parents and other branches; rollback source only by reviewed additive revert. This plan authorizes no runtime restoration or live trial by itself.
