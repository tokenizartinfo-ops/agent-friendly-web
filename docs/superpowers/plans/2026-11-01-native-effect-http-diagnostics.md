# Native effect HTTP diagnostics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans task-by-task.

**Goal:** retain safe numerical evidence for native effect failures without changing their authority or cleanup.
**Architecture:** native-only fixed diagnostic accumulator in existing closed controller; old clone unchanged, bounded JSON decoding reuses original request budget.
**Tech Stack:** Node22, existing controller/ESM CLI/tests, GitHub Actions.
**Spec:** docs/superpowers/specs/2026-11-01-native-effect-http-diagnostics.md

## Global Constraints
- Exact five effects, no new request/target/mode/permission or mutation retry.
- Native additive effectHttp field only; old result/denial behavior unchanged.
- Actual status100..599/null; codes<=8uniqueints0..2147483647; no raw messages/body/headers/env.
- Error body<=8192B within SAME original5s/request/phase wall+mono+abort. No clock reset.
- Denied/unknown classification and known-rejection ownership protections remain.
- Source/CI only; oldfee050intent consumed; no fresh trial, owner grant, key, Max or PCoff.

## Review Focus
- HTTP error response that hangs or never cooperates cannot delay cleanup beyond original deadlines.
- HTTP200 success:false errors cannot become acknowledgement or retry.
- Unknown ACK remains uncertain despite later BASE state; numerical status is observation, not authority.
- Invalid code types/large arrays/private messages never reach artifacts.
- Telemetry added only to native; no old clone or nested v2 DTO breakage.

### Task1: real-controller RED/GREEN
Files: lib/mcp-qa-cloud-clone.mjs; test/mcp-qa-cloud-native-observation.test.mjs. No shared CI/AGENTS edits in implementer task.
- [ ] RED actual synthetic403 result lacks required effectHttp; cover all classes above with real controller.
- [ ] Implement fixed private accumulators, bounded native error-body decode, descriptor-safe numeric selection; freeze final owned maps/arrays.
- [ ] Run focused native+oldclone+actualCLI/workflow suites plus targeted eslint in secret-free Actions, explicit checkoutgithub.sha.
- [ ] Independent task review and fix loop. Return only owned source/test blobs; no runtime/source-main merge.

### Task2: composed source acceptance
- [ ] Compose onto accepted current main after parallel material-only source block, preserving its exact tree; add docs/ledger and CI coverage if needed.
- [ ] Full CI/lint/build, exact-head whole-branch review and accepted-tree check before merge.
- [ ] Record actual bounded result and remaining HTTP cause gap, without claiming403 or permission failure until primary evidence.
