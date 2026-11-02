# Task5-B2-AB independent review — initial round

Fresh reviewer /root/review_private_policy_task5_b2_ab. BASE70408e380551ac7dc70d3e88ec9f5b75172fbe75 → HEADbd9cb210721213b06a8c762c5e96000bf11f11c1; code5b087d0a3090935327b7aee37bcad175bbac4be4. All11patches. SOURCE specPASS scoped factual producer; qualityNEEDS_FIXES. OneP2:

**[P2] Native qualification becomes permanently red after the approved custody ceiling.** test/mcp-qa-finite-historical-source-native.test.mjs:65–72 substitutes historical commitments but leaves production CEILING unchanged and supplies fixed synthetic token expiry. Harness uses live Date.now()/D1time. At2026-11-03T02:59:00Z reader rejects before provider reads; positives fail; production-pin negative expects metadata but gets deadline. Passing pre-ceiling run cannot answer future failure.

Fix TEST-ONLY custody/time boundary for reproducible qualification after that date; preserve exact production approved ceiling. Add focused assertion unmodified production ceiling denies at expiry. No approval extension/callerclock/pin override. Reviewer did not execute tests.

Strengths: fixedlocator/custody/actualhash/normalizationwitness/falseauthority, secretrejectbeforehash, Q/frozen/M separation, wholecensus discrepancies/foreign/missing/overflow/perrowcancelprovenance. own() preservesstoredkeyorder and actualpredecessor JSON.stringifyhash semantics; no reorderdefect. Sharedgrammar guards/retirementtarget preserved. Localretention accurate, notremoteproof.
Named unchanged reads: committedhistoricalcontext/predecessor/hash/restorationparser/stagework/originalpins/successorparser/configfingerprint. No broadcrawl/writes/local/provider/auth/workflows/retests. Root actualfinal41497210626/job125455183793/attempt1 code5b087:21+256+28PASS/lintsuccess/artifacts0 separatelyverified. Source tests notruntime.

Later ownership: actualsourceidentity/custodyscope/historicalslotavailability/bootstrapQAbridge/writers/mounts/C3/deploy/PCoff unchanged. Root keeps B2-AB acceptance PENDING until fix round1 and scoped rereview.

## Scoped re-review, round 1 — accepted

The original reviewer /root/review_private_policy_task5_b2_ab inspected bd9cb210721213b06a8c762c5e96000bf11f11c1 through fbe117a63ae1e55f64c104e274aa90f9df28118d. P2: ADDRESSED. Fix: APPROVED. No new actionable breakage.

Regular fixtures replace the exact synthetic custody datum while preserving real elapsed, D1 and lease clocks. The production historical-pin negative reaches metadata. The separate unchanged production-ceiling controls deny at expiry with zero calls; no 1 ms IO requirement or production approval change is implied.

Root independently verified run41500276455/job125465668561/attempt1, headf68d360a:22PASS, zero fail/cancel/skip, successful lint, artifacts0. No broad retest was needed for a fixture-only fix. The earlier source dependency qualification remains dated evidence.

The C3 preflight document was outside this scoped re-review. B2-AB source is accepted; Task5/C3/runtime remain incomplete and operationalReadiness=false.
