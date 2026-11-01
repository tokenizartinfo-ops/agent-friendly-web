# Native closed ARM HTTP observation

PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web; source base dac95e89e1c66d5c68c8eac39a9e5028a938e7bc. Source-only first; runtime publication requires a separately recorded finite intent, primary pins, recoverable c570 rollback and independent closure readback.

## Purpose
Qualify the accepted PR683 read-only CF adapter in an actual native Bootstrap, before requesting another ten-minute owner grant or implementing ARM. This is a technical observation, not ARM, an event subscription, a guard or PC-off acceptance. A timeout/failure is useful dated evidence, never a repair or credential diagnosis.

## Contract
An internal runPrivateQaArmObservation({env,event,step,context,pins,fetchImpl,now}) composes createPrivateQaArmHttpAdapters. Trusted source supplies immutable canary/operator pins and an immutable finite context {purpose,id,sourceRevision,baselineVersionId,baselineModuleHash,startAt,expiresAt}. It accepts only operation inspect_arm_quiescence + observationId and exact native instance afw-qa-arm-ID. The ID is independently domain-separated from all nominal bundle IDs. No caller URLs, policies, credentials or resource selection.
All fourteen QA flags must be literal false, all seven policies empty. Capture actual AFW_QA_VERSION metadata and native execution pin, context/pins, credential and consumers. Reject additions to QA flag set, getters, malformed inputs, source/dependency drift, stale/future timestamp, abort and clock rollback.
Capture monotonic origin before wall time. One absolute end is min(native event timestamp + 5000, compiled context expiry); no later callback may refresh it. Within ONE Step.do (zero retries), run the two accepted snapshots with the same absolute plan and AbortSignal. External module bytes are checked once; mutable inventories twice. Full consumer fence runs before/after every await and again after Promise.race and Step settlement. Capture Step.do once and use Reflect.apply; cached result without local execution is blocked.
Metadata-only <=2048-byte result with status observed/blocked, safe adapter diagnostic, source/runtime identity on success, GET count and elapsed time, and all effects/guard/withdrawal/readiness/retry flags false. No code, bindings, credentials, raw policies, private literals, HTTP bodies or arbitrary exception text.
The wrapper overrides ONLY this distinct Bootstrap operation; other run branches, DO classes, alarm, constructor and default404 inherit exact closed baseline. No D1/KV/storage writes, new bindings, grant, reservation, Container start, cron, callback or subscription.

## Tests and acceptance
TDD: missing helper/real native wrapper positives fail first, then actual Workflow with synthetic fixed CF responses completes both snapshots. Verify stale/future event, cached Step result, wall/monotonic deadline, full settlement drift, credential/metadata/profile drift, HTTP403/timeout, fixed GET origins and sanitization. No weakening original5s or historical fences.
Native fixture can select exact immutable baseline via existing AFW_QA_INSPECTION_BASE_MODULE validation; current-source fixture is not proof of baseline provenance. No real remote execution from ordinary CI.
Source review and focused/full tests, lint/build and package checks must pass before merge. Actual native observation is separate, finite, one-use and must restore c570 even on a negative technical result.

## Existing schema receipt
QA D1 676ca49e-af71-4f2f-a12d-11f13de78a51 now contains the additive PR687 draft schema. Intent AFW-QA-DRAFT-SCHEMA-20261101T002312000Z consumed. Independent read 00:25:55.437UTC preserved old88 schema hash c21aba5391a3ec90e57a8b928717dd967dca943ca6dfef32f56e66058569722a, exact5 new objects, total93, packet/draft0 and primary0writes. Do NOT repeat CREATE. Dossier D1 untouched. Source PR689 accepted dac95e89, tree7eaef786, mainCI41255895809 success; PR CI41255193045 4354PASS0FAIL1 existingSKIP, lint0errors14 existingwarnings. PR689 is not published.
