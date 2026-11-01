# Control cloud: native closed metadata step
2026-11-01 · AFW only · preparation source, no live intent yet.

The old cloud clone route was actually accepted in issue497#6554215301 (PC ON). This branch adds a separate exact owner command:
`/afw-qa-native-observe-restore v1 <accepted-main-SHA>`.
Only repo1347578006/owner290715446/issue497/main/attempt1. It preserves the old command and every consumed intent.

The protected runner reads only exact historical BASEc570, qualifies its inherited/native behavior without credentials, and builds the fixed v2 wrapper. The committed pin is48388B/SHA5b06e2012d906269b6ad829f666d3d01fd197f6b4ea90f04bb6591dad4d18953, first cloud receipt41282383977 and checked41282445234. Its bytes omit sourceSHA/H because context is separate. A manifest is data; matching actual bytes, committed pin, source context and trusted exact checkout are all required. This is not attestation against a compromised runner.

Original comment time governs N1=+300s/R1=+480s, including queue and preparation. The effects entry creates one typed in-memory admission; the stateless preparer cannot claim or authorize writes. One atomic append-only GitHub claim precedes at most one inactive QA upload, one activation, one own metadata Workflow and one restore. Cleanup may terminate only its exact H once with rollback:false, never restart/delete. Workflow cleanup and Worker restoration are independent and bounded within original R1 (15s/40s/120s+5s reserves). A paused Workflow is preserved, without promising its environment survives restoring QA.

Uses ONLY the existing AFW_QA_CLOSED_TOKEN in afw-qa-cloud-closed-rollback. Its Workflow write eligibility is unproved. A403 stops nominal work and restores; no broader token, alternate endpoint or mutation retry. All modules/bindings/policies remain closed; no owner data, grants, OTP, subscribers, cron or Container execution. Source-only tests do not prove deployment.

A correlated v2 DTO can prove only native metadata observation. ARM eligibility, useful review, guard liveness, native withdrawal, operational readiness and PC-off remainfalse. Independent full primary readback after any future trial is still required. A fresh finite intent must be recorded after full CI and exact-head review; no previous command is reusable.

## Actual task evidence so far
- Admission RED41282309160 → GREEN41282344714,97PASS; task review0P1/P2.
- Wrapper RED41282318508; pin0 RED41282383977; GREEN41282445234/job124776936226,20PASS; task review0P1/P2.
- Root transport RED41282425757,22expectedfail; active-profile wiring diagnosed in41282632995; qualification41282835144,25PASS. Old clone route remains covered independently.
- Actual CLI/workflow qualification41282935047/job124778375024:57PASS0FAIL plus validator-bypass mutant RED; task review0P1/P2.
- Whole-branch/interim review identified3P2; fix7067e655 reproduced53PASS8FAIL then61PASS0FAIL (native+oldclone). Native alone34PASS, clone qualification35PASS. Scoped re-review closed all3P2+Minor, no newP1/P2. Two test-only lint bindings then renamed by original implementers; focused57/20PASS+ESLint verified in41283953447/41283956331. Final-head full CI remains required; no merge/live intent.
