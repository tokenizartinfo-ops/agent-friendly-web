# Original custody clock observation implementation plan
> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan inline.

**Goal:** Measure the original actor/operator clock boundary without repeating confirmation or granting authority.
**Architecture:** One private default-off Workflow mode, same existing operator and original namespace. Two read-only RPC samples; original five-second creation lease.
**Tech Stack:** JavaScript ESM, Node tests, native workerd/Workflow in GitHub Actions.
**Spec:** docs/superpowers/specs/2026-10-29-original-custody-clock.md

## Global constraints
No normal admission change, no retry, no direct DB/credential/fetch/Container capability, no grants, no new namespace, no runtime change from source CI. Fixed original actor; two RPC calls;120000ms policy cap;5000ms whole original attempt cap. Cloud-only source/builds.

## Review focus
- Future samples remain measurements and never become retirement proof.
- Delayed/replayed native steps retain original timestamp/deadline.
- Late RPC results are disposed and cannot change returned output.
- Competing modes/binding/policy withdrawal block before further reads.
- Unknown fields/getters/forged cached results cannot escape the exact bounded result schema.

## Task1: private clock diagnostic and native routing
Files: create lib/mcp-release-custody-clock-observation.mjs; test/mcp-release-custody-clock-observation.test.mjs; test/mcp-release-custody-clock-observation-native.test.mjs. Modify worker/mcp-release/index.mjs and .github/workflows/ci.yml. Set default vars in wrangler.release-operator.jsonc.
Interface: runReleaseCustodyClockObservation({env,event,step,now=Date.now,monotonicNow=()=>performance.now()}); default mode off. Policy and result per spec.
- [ ] Write availability/behavior tests and record expected RED in Actions.
- [ ] Implement minimal sampler and route before other private modes; preserve default404 and normal admission.
- [ ] Prove unit cases plus actual native Workflow/RPC disposal and no outbound network in Actions.
- [ ] Run full tests/lint/build and exact operator build; one fresh-context whole-branch review; address material findings.
- [ ] Merge only reviewed green head, verify main, preserve closed build/rollback. Do not run native probe from CI.

## Ledger
Base ba65e507749627d884b5da79379fa4bf117cd453; isolated branch diag/original-custody-clock-20261029. Initial preparation. No remote probe or repair of clock comparison. Consumed plan c061 remains terminal. Diagnostic output may guide a later fix; it does not justify a tolerance.

RED Actions40960451217/job123751524741 at21:47UTC: exact availability assertion undefined vs function failed before implementation; other cases skipped while module absent. No syntax/import error used as the RED result. Proceed with minimal source implementation and native test.

Review1a5ab362:0Critical/1Important/1Minor. Important: add real native held-RPC late-disposal and delayed-step qualification. Minor: recheck event identity/payload/schedule across awaits. First full suite3353PASS/0FAIL/1skip; lint found prohibited test variable module, renamed clockModule in this test-only pass. New mutation test must fail before production fence changes; native lifecycle tests extend qualification without changing admission.
