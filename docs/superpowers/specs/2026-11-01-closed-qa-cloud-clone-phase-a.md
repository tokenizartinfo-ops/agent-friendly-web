# Phase A — literal CLOSED QA clone from cloud, observation and restoration
2026-11-01 · supplements the larger lifecycle spec; ONLY this phase is implemented next.

## Why this bounded step
The existing AFW_QA_CLOSED_TOKEN is active through2026-11-08T02:59:59Z. Primary metadata04:46:19UTC confirms Individual Workers Editor only for QAa95b775a624d4b8cbc81ac5198e14805, content read only for canary7d96bc137a854faa875ee0f160119810 and operatoreeb065ef40144ef1af6c5f75e7ab6b12, plus account Workers metadata/Containers read. Worker-name/ID mapping was independently read04:47:30UTC. No key value was read or moved.
Cloudflare's current schema accepts Individual Workers Editor for version/deployment POST, while Workflow creation lists Workers Scripts Write. This is an eligibility discrepancy to respect, NOT a proved403. Do not broaden permissions. Native v2 diagnostic2117 is already accepted and is not repeated.

## Fixed phase-A behavior
Exact owner command /afw-qa-deploy-observe-restore v1 <mainSHA> uses the reviewed696 admission/claim gates and originalN1/R1. A separate issue_comment-created workflow uses existing private environment/secret, contents:write only for append-only claim and queue:max/cancel-in-progress:false in the same rollback writer group. No npm dependencies, local files on Gabriel's PC, new credential, grant, WorkflowPOST, wrapper or policy.

1. Fresh official public status gate (bounded read-only), then full existing25GET closed preflight.
2. Stable claim H before any CF POST. Nominal write margin>=180s.
3. Fetch exact BASEc570 and verify known module395915B/hash4b557/configa8c8,31bindings/14false/7empty. Upload ONE inactive literal copy: same single module, selected configuration and every binding inherited from exactBASE; deploy=false, no migration/settings/URL changes. Version annotation workers/tag=H and fixed message.
4. Require candidate native UUID different from BASE, exact tag/module/configuration, and BASE deployment unchanged. ACK unknown means no activation; byte equality cannot identify the owning clone.
5. Immediately verify own/external active pointers. Activate candidate at100% once with fixed deployment message containing H. Verify candidate AND deployment UUID AND message from primary API; verify exact code/configuration again. This observes the CONTROL PLANE ONLY, not runtime execution or env.AFW_QA_VERSION.
6. Finally, restore exact BASE once ONLY if primary candidate/version/deployment ownership is resolved immediately beforehand. Known candidate UUID plus exact H annotations resolve ownership even after a lost activation ACK; uncertainty remains. A foreign pointer/conflicting deployment annotation blocks overwrite. GET→POST is not CAS. If upload unexpectedly activates this exact candidate with matching ownership, skip normal activation and enter cleanup; never count success.
7. Fresh independent full GET-only closed readback of all3 resources before R1. Success requires known ACKs for all expected effects, observed exact candidate, acknowledged restore and complete final proof. Otherwise blocked/uncertain metadata with no retry. Merely reading BASE after unknown activation does not exclude late application.

All three effect counters(upload,activate,restore) consume BEFOREsend; maximum1each. No retry/refund/delete. API is fixed-account/QA only; public status never receives the credential. Cleanup has independent abort/failed transport state ending at originalR1; nominal abort/expiry cannot disable it or refresh its deadline. All final reads end byR1. A killed runner may leave an all-false identical-code candidate active; restoration then remains unproved. No guaranteed guard or scheduling claim.

## Acceptance
Synthetic transport tests exercise happy path and 403, unknownACK at each POST, unexpected activation, duplicate delivery/claim, expired clocks, foreign pointers, mismatched tags, malformed modules/configuration, no secret output, cleanup and final readback failure. Exact-head code review and full CI precede merge. A NEW concrete finite live intent and fresh primary/provider checks precede posting the exact command through the existing cloud chat. Never reuse prior consumed readback/restore/diagnostic intents.

OperationalReadiness=false. No ARM/useful native event/withdrawal/PC-off/Max acceptance. Owner unavailable until12:45UTC.
