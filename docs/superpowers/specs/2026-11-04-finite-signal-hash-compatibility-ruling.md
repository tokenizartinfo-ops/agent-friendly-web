# Root ruling: finite candidate hash compatibility

4 November 2026. Amendment to the active finite-request-signal-opt-in source task. No remote operation is authorized by this ruling.

The exact incoming-signal opt-in produced native receiverDuringHeldRead=true and receiverBeforeGuard=true in Actions41922611657/job126898694059 at d2e5d8c. That is a positive native milestone, not final candidate or runtime acceptance. Follow-up source regressions exposed a real pre-existing compatibility assumption: mcp-activation-observer.snapshot accepts only the historical M flag pair. Finite setup/transport hash new candidate configurations through that API, and the shared named-plan resolver validates the bundle through the same legacy hash. A simple import alias would also mis-handle readVersion's historical rollback role.

## Decision

Expand this source task only as needed to support its exact new candidate flags through fixed hash and named-plan validation. Preserve all existing legacy exports and their strict old-pair contract. Add separately named fixed finite-candidate exports using shared PRIVATE structural validation, not a public profile/hash callback or automatic old-or-new acceptance. Candidate hash includes the actual new flag triple in its canonical digest; never normalize it to the old pair. Old digests must remain identical.

The finite transport's existing internal closed/rollback distinction may select the legacy hash for historical rollback and the fixed candidate hash for current/new finite versions. Both input metadata and expected configuration use the same exact role. Do not infer a role from whether an input happens to validate. Inventory all finite uses of activationConfigurationHash, validateReleaseOperatorBundle, resolveNamedActivationPlan and validateNamedCancellationHistory before editing; initial-source/record/native-control consumers may also require the fixed candidate path. Generic legacy consumers stay unchanged.

Historical source checks for2607, c570 closed modules/configurations and every QA_CLOUD_CLOSED_PINS entry remain byte-identical. Do not broaden the historical reader, phase profile grammar, three-mutable-setting invariant, binding exceptions or readiness. The allowed additions are fixed candidate validation exports and verified finite call-site selection only. Do not fix unrelated HTTP engine behavior, mount a producer or change original clocks in this task.

## Required evidence

- Legacy hash/observer/bundle/resolver/history APIs still reject the new triple; their old-pair results and historical digests stay unchanged.
- Fixed finite APIs reject old pair, missing/extra/wrong flags and hash actual candidate configuration. No cross-role fallback.
- Mixed readVersion roles are covered: current/candidate new flags, rollback historical old flags. Named finite plan/history validation uses the fixed new path while legacy validation stays strict.
- Original positive native milestone remains preserved; repeat only cases affected by subsequent source/configuration changes. Run relevant candidate/setup/connection/initial-source and legacy regressions, with exact head attribution and no blind full-suite reruns.
- One final actual finite compiler after the compatibility changes, original limits/source/bootstrap/residency guards unchanged. No module hash applies to a later documentation head by implication.

This is a necessary compatibility correction to a concrete failing consumer, not a general configuration framework. The implementation report must record the expanded file map, root ruling, actual tests/failures and remaining limits. Fresh independent source review remains mandatory. operationalReadiness=false;completePackage=false;PCoff=false. No provider/runtime/Entry/DDL/credentials/permissions/OAuth/OTP/cron/Max or other-project effect.
