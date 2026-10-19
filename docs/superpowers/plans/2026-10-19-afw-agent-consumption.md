# AFW agent consumption contracts — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans inline, followed by one fresh whole-branch review.

**Goal:** Implement the first internal, effect-free catalog, indicative quote and next-step projection from the approved AFW design.
**Architecture:** Three small pure modules share bounded descriptor-safe validators. No module is mounted by the web, MCP, A2A or a Worker.
**Tech Stack:** Existing Node22 ESM and node:test; built-in node:crypto for deterministic scope SHA256, no added packages.
**Spec:** docs/superpowers/specs/2026-10-19-afw-agent-consumption-design.md
**Execution:** Gabriel approved continuing all bounded blocks and cloud/GitHub execution on19oct. Use the existing isolated PR493 branch and GitHub Actions. No local checkout, build, install, clone or output; no workflow/secrets/runtime changes.

## Global constraints

- All results keep executionAllowed, chargeAllowed and publicationAllowed false; accepted output is not authority.
- Monetary examples are synthetic tests only, never a tariff. Unknown price returns null and fails closed.
- Currency/exponent come from a trusted host policy; this code does not verify policy approval provenance.
- Host authorization and runtime evidence must be resolved externally. Inputs to these functions are NOT new public API parameters.
- No network, filesystem, model, clock reads, timer, D1, side effects, payment, discount, persistence or deployment.
- Explicit now epoch-milliseconds; dates canonical UTC ISO with milliseconds. Validity uses start <= now < end; future observations cannot establish runtime readiness.
- Bounded inputs:32 catalog entries,64 policy lines,5 evidence refs; identifiers <=128 chars, descriptions <=280 chars, units1..1000000; integer monetary values and revisions must be safe, amounts nonnegative.
- Strict plain data records reject unknown keys, symbols and accessor properties without reading getters; nested arrays are bounded and dense.
- Published source/configuration, historical private receipts, permissions, rollback and Max are preserved.

## Interfaces and files

Create lib/agent-consumption-input.mjs: internal readRecord/readList, scalar/date validators and closed result projection; no exported authorization primitive.
Create lib/agent-consumption-catalog.mjs: describeAgentCatalog(input,{now}).
Create lib/agent-consumption-quote.mjs: previewAgentQuote(request,{catalog,policy,now}).
Create lib/agent-consumption-continuity.mjs: projectAgentNextStep(view,context,{now}).
Create test/agent-consumption-contract.test.mjs: fixtures explicitly synthetic; no real projects, prices, callbacks or credentials.
Update the spec only to link implementation evidence with its source-only limit; append a compact receipt under docs when accepted.

Catalog input: {revision,entries:[{operationId,contractVersion,purpose,effect,availability,verification,pricingState,unit}]}. Verification: {contractVersion,deploymentRef,observedAt,expiresAt}; absent/expired/future/mismatched proof downgrades verified_runtime to temporarily_unavailable. Effects read/prepare/write/publish; availability planned/source_only/verified_runtime/temporarily_unavailable/retired; pricing unpriced/explicitly_free/quoted.
Quote request: {operationId,contractVersion,serviceMode,scopeRef,scopeRevision,units,catalogRevision,maxTotalMinor}; serviceMode agentic/accompanied/hybrid. Policy: {revision,status,validFrom,validUntil,currency,minorUnitExponent,lines}; each line pins operationId,contractVersion,serviceMode,catalogRevision,unit,maxUnits,unitMinor,fixedMinor. No caller-supplied pricing fields.
Continuity view: {projectRef,revision,observedAt,expiresAt,nextStep,missingInput,evidenceRefs,capsuleRef}. NextStep: {id,kind,label,reason}, kinds provide_information/review/refresh/wait. Optional missingInput is null or {key,label}. Context: {authorized,principalRef,projectRef,expectedRevision,grantExpiresAt}, trusted host only.

## Review focus

- A stale or future observation must not advertise verified runtime.
- Zero or absent pricing must not silently become a free authorized operation.
- Float/overflow/extra quantity or caller-supplied policy must fail before producing a valid quote.
- Foreign, revoked, expired, conflicting or accessor-bearing views must expose no private content.
- A replayed pure preview is deterministic but does not implement durable deduplication, settlement or exactly-once external effects.

## Task1 — catalog boundary

- [ ] Commit this plan and meaningful behavior tests before implementation; absent modules are loaded as empty only when their exact files do not exist, producing assertion failures rather than swallowed import errors.
- [ ] Observe GitHub CI fail on the new behavior assertions; preserve run/head reference.
- [ ] Implement strict data validators and describeAgentCatalog; retain source_only as source_only, downgrade invalid freshness, reject duplicate operation IDs and invalid/oversized schemas.
- [ ] Test catalog closure/freshness/duplicate/accessor/bounds cases; no local execution.

## Task2 — indicative quote

- [ ] Implement previewAgentQuote using the normalized catalog and trusted policy. Require current catalog/operation/version/unit/mode and fresh approved policy.
- [ ] Compute fixed + units * unitMinor using integer-safe arithmetic, compare maxTotalMinor, and bound validity by policy and runtime evidence.
- [ ] Return deterministic SHA256 of canonical scope descriptor; include catalog/policy revision, currency/exponent, two explicit price lines and closed authority fields.
- [ ] Missing/unpriced policy returns pricing_unavailable and null; zero requires explicitly_free; mismatches, oversize/negative/fractional values, unknown keys and excess budget return sanitized blocked results.
- [ ] Exercise deterministic scope/order/change, valid fixture, assisted difference, zero/unknown/expiry/overflow/mismatch and mutation rejection cases.

## Task3 — next-step projection

- [ ] Validate trusted context before view; require authorized=true, exact project, current grant and expected revision.
- [ ] Validate observed/expiry dates, one brief typed nextStep, optional one missingInput, max5 opaque evidence refs and optional capsuleRef.
- [ ] Project only those bounded fields; never return principal, grant, whole answers or arbitrary payloads.
- [ ] Exercise positive next step and foreign/revoked/expired/future/conflicting/accessor/oversized/extra field cases.
- [ ] Observe full npm test/lint/build in existing GitHub CI; inspect exact head, no new hosted workflow required.

## Final acceptance

- [ ] Fresh read-only whole-branch review via GitHub source; no local clones/tests for reviewer.
- [ ] Fix substantive findings with regression RED/GREEN and recheck cloud CI.
- [ ] Record RED/GREEN/head/review and explicit unmounted scope in docs, update PR493 title/description around final result.
- [ ] Merge only after accepted exact-head checks and review, preserving verified production; no deploy, activation, payment or customer writes.

Ruling: conventional local scratch ledger is replaced by this remote plan and immutable Git/CI receipts because Gabriel explicitly requires minimizing local storage. Method and scope are already authorized; routine implementation choices remain within the approved first increment. Later runtime, pricing, payment and installation stages are not covered.
