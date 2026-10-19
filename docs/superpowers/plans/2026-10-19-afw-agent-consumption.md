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
- Bounded inputs:32 catalog entries,64 policy lines,5 evidence refs; identifiers <=128 chars, descriptions <=280 chars, units1..1000000; integer monetary values and revisions must be safe, amounts nonnegative. Currency exponent0..4; explicit clock0..8640000000000000ms.
- Strict plain data records reject unknown keys, symbols and accessor properties without reading getters; nested arrays are bounded and dense. Reject oversized array length before key enumeration and oversized record key count before reading value descriptors; this is not a hostile-Proxy sandbox.
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

- [x] Commit this plan and meaningful behavior tests before implementation; absent modules are loaded as empty only when their exact files do not exist, producing assertion failures rather than swallowed import errors.
- [x] Observe GitHub CI fail on the new behavior assertions; preserve run/head reference.
- [x] Implement strict data validators and describeAgentCatalog; retain source_only as source_only, downgrade invalid freshness, reject duplicate operation IDs and invalid/oversized schemas.
- [x] Test catalog closure/freshness/duplicate/accessor/bounds cases; no local execution.

## Task2 — indicative quote

- [x] Implement previewAgentQuote using the normalized catalog and trusted policy. Require current catalog/operation/version/unit/mode and fresh approved policy.
- [x] Compute fixed + units * unitMinor using integer-safe arithmetic, compare maxTotalMinor, and bound validity by policy and runtime evidence.
- [x] Return deterministic SHA256 of canonical scope descriptor; include catalog/policy revision, currency/exponent, two explicit price lines and closed authority fields.
- [x] Missing/unpriced policy returns pricing_unavailable and null; zero requires explicitly_free; mismatches, oversize/negative/fractional values, unknown keys and excess budget return sanitized blocked results.
- [x] Exercise deterministic scope/order/change, valid fixture, assisted difference, zero/unknown/expiry/overflow/mismatch and mutation rejection cases.

## Task3 — next-step projection

- [x] Validate trusted context before view; require authorized=true, exact project, current grant and expected revision.
- [x] Validate observed/expiry dates, one brief typed nextStep, optional one missingInput, max5 opaque evidence refs and optional capsuleRef.
- [x] Project only those bounded fields; never return principal, grant, whole answers or arbitrary payloads.
- [x] Exercise positive next step and foreign/revoked/expired/future/conflicting/accessor/oversized/extra field cases.
- [x] Observe full npm test/lint/build in existing GitHub CI; inspect exact head, no new hosted workflow required.

## Final acceptance

- [x] Fresh read-only whole-branch review via GitHub source; no local clones/tests for reviewer.
- [x] Fix substantive findings with regression RED/GREEN and recheck cloud CI.
- [x] Record RED/GREEN/head/review and explicit unmounted scope in docs, update PR493 title/description around final result.
- [x] Prepare the exact-head integration gate: require accepted cloud checks and review before merging, preserving verified production; no deploy, activation, payment or customer writes. The resulting merge is recorded in PR493, not assumed by this checkbox.

Ruling: conventional local scratch ledger is replaced by this remote plan and immutable Git/CI receipts because Gabriel explicitly requires minimizing local storage. Method and scope are already authorized; routine implementation choices remain within the approved first increment. Later runtime, pricing, payment and installation stages are not covered.

## Execution receipt — 19 October2026

Initial RED: b3ad2af38e3ba805e2b483b4f697ed5d7b67a73d / Actions39260813969,26new assertion failures,2037pass/1skip and no unrelated failure. First GREEN:8b1471283d5490db20deae709f4e30e508040cc7 /39261625832,2063pass/0fail/1skip; lint/build succeeded.

Fresh source review found P2 (descriptor allocation before size checks). Regression RED:cc970b2112de87769011f99439d41d7ef7eee48a /39262296870,exactly2new failures/2063pass/1skip. Corrected head00961b24333de8cb3c8543f4f4233cb4a55bdf19 /39262836791:2065pass/0fail/1skip, lint0errors/2warnings in unchanged files, build succeeded. Same reviewer confirmed P2 resolved/no new source findings. Final documentation carrier must retain the same code/test blobs and pass its own CI/review before merge. Final integration status and exact accepted head are recorded on PR493.

[Source-only scope and continuation](../../AFW-AGENT-CONSUMPTION-CONTRACTS-2026-10-19.es.md). No local tests/build/clone/output; no deployment, price policy, payment, grants, real dossier or PC-off acceptance. The28new behavior tests use synthetic fixtures. Later stages remain outside this increment.
