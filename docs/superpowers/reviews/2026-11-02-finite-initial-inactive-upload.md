# B2a inactive upload — fresh review

Reviewed BASE c4696911f8895ae605da0512c77dc8d1a0e5acd0 through 046a2c8fcb5a6882a52b5eabfa58f0522ee75719 using full package at 39f0b726. Reviewer /root/review_initial_inactive_upload: Spec PASS; Quality NeedsFixes; no Critical.

## Important — fix round 1/5

Duplicated historical qualification logic — lib/mcp-qa-finite-historical-source.mjs:88–94 duplicates :99–105 verbatim: configuration validation, module shape/base64 decoding, byte/hash pins, receipt identity and historical source linkage. This creates two copies of the exact trust boundary that must remain aligned. Extract one pure internal qualification function and have both callers consume it; retain their different output/policy responsibilities. No present behavioral divergence was found, but the reviewer rubric explicitly classifies verbatim logic-block duplication as Important.

Root ruling: real maintainability gap at the trust boundary, no conflict with binding spec; enter fix loop. Original implementer owns code, covering historical/upload-wire tests and report status correction. No runtime/main changes.

## Minor

- Baseline dependency/action warnings: deferred for final whole-branch triage; no suppression or unrelated upgrades.
- Report status says implementation in progress despite completed handoff: correct in fix report.

## Scope and limits

All 13 patches inspected; additional bounded codec/profile contexts checked. Existing revision-separated primary qualification accepted without aggregation. No tests/provider/writes by reviewer. Live acceptance, custody, production-size latency, activation/rollback and readiness remain unverified owning gates. operationalReadiness=false; completePackage=false; PCoff=false.

## Fix round 1/5 — same-reviewer verdict

Spec PASS; Quality Approved. Important ADDRESSED: historical-source87–104 one private qualifier, both consumers retain output/policy responsibilities; no export/authority. Stale statusMinor ADDRESSED. ExistingwarningsMinor DEFERRED/nonblocking. NewCritical/Important/Minor NONE. Nativeparitytest175–221 validates sharedaccept/reject anddistinctlegacybehavior. Rootverifiedactual41548928626/job125631300881/attempt1/code56c04288:36+9PASS0fail/cancel/skip/lintclean/artifacts0. No reviewer rerun/mutation. Previous5705 compilermeasurements remainpreviousheadonly. ROOT ACCEPTS SOURCE unit, alloperationalclaimsfalse.
