# C2-B1 independent task review — round 0

Reviewer /root/review_initial_native_entry, sourceBASEf61ec7b2251672cc34016715c45dd3ecf085c14c..HEAD722a45ccd2eaf058bceb048158fe4db9d98a7b55, reviewpackage@f3d0f02ddbe190bcc75101de1470506808abbf67. Readonly, no tests/writes/provider actions.

SpecCompliance: FAIL — one pre-entry prerequisite gap.
TaskQuality: NeedsFixes.

Strengths: initial-entry99–114 correctly uses final transaction return, captured sync, exact readback, one actual A collection/assertion and post-A sync. initial-entry14–30,91–93,123–135 preserves absolute deadlines/bounded children/retained promises/amended wrapper-actor split. Native tests22–75 exercise concurrency/lostACK/retry/persistedrestart/sync; safe outputs33–35,114 nonauthorizing.

## Important — exact finding

lib/mcp-qa-finite-initial-entry.mjs:70–74,111 omits two required native method prerequisites: RELEASE_DB.withSession and AFW_RELEASE_EVENTS_NODE.idFromString. Actual A requires both immediately in lib/mcp-qa-finite-initial-material.mjs:17–18, but its constructor runs only after Entry is committed and synchronized. Missing either method therefore consumes the permanent entry before a failure that was detectable beforehand; restoration cannot recover admission. Capture, require and recheck both before the entry transaction. Extend the existing missing-holder cases at test/mcp-qa-finite-initial-entry-native.test.mjs:77–79 to assert absent/noncallable methods leave Entry absent, plus holder drift before CAS. This fails closed for effects but violates the pre-entry prerequisite requirement.

Critical:none.
Minor: report93 records baseline punycode/Actionshostwarnings/CIMDinfo. Deferred baseline maintenance, no rerun/config relaxation justified.

Named outside-diff checks: actualA17–41,90–93 forlease/prerequisitecompatibility (leasecompatible/gapabove); actualrecords13–34 exactown-data/command/M/UUIDgrammar. No broadcrawl.

Cannot verify operationally: actualWorkflowdelivery/providerdiskscheduling/livecustody/publisher gates outsidequalification, report99–107 explicit. No operationalapproval.

Reviewer reviewed13patches; Root actual run41530593619/head e95b/job125569445138/attempt1:68PASS/lintclean/artifacts0 accepted as evidence, not rerun.

## Root fix-round 1 instruction

Finding is load-bearing and accepted as concrete. Preserve original spec/ruling; no widening, refunded Entry or additional source feature. Same implementer fixes exact captured native methods/holder checks, adds meaningful missing/noncallable/changed-before-CAS tests, runs covering native entry tests and scoped lint. Compiler already passed; rerun fullgraph only if actual imports/runtime graph change creates an unresolved concern. Original reviewer will scope re-review to this finding/fixdiff. B1 notaccepted, C3product waits.

## Fix round 1 — scoped re-review and Root source acceptance

Same reviewer /root/review_initial_native_entry: ADDRESSED; SpecCompliancePASS; TaskQualityApproved. initial-entry70–74 captures/requires/rechecks both methods before transaction firstget/put. native test77–79,87–89 covers absent/noncallable/beforeCASdrift; fixture26 native transaction injection. NewCritical/Importantbreakage:none. Allsixpatches reviewedonce, no testrerun. PriorcompilermeasurementsONLYe95b.

Root independently verified actual run41532541570/head28d2bd6f977980944bb7288baba35a2fb547107d/attempt1/job125576141961:35PASS0fail/cancel/skip, scopedlintclean,artifacts0; fullcoveringcommand/logs andsixfilediffpresent. Prior broader41530593619 at e95b:68PASS andactualgraph/bytes remain datedsourceevidence, notnewsourcebytes. Source-only acceptance; exactnewcomposedpackage mustcompileagainatitsactualfutureHEAD.

Cannot-verify resolution: actualWorkflowdelivery/providerdiskscheduling/livecustody/publisher are explicitly outside B1's source contract and remain owningfuturegates; nooperationalapproval claimed. Sourcegovernancetrust/SYNboundaries/heldACKlimits/actor-onlynarrowing remainexplicit. Deferredminors: baseline dependency/host/SDKnoise and earlierA independentTask4canonicaloracle forintegration/finalreview. NoCritical/Importantopen.

Task C2-B1: complete (commits f61ec7b..23115f7, review clean after fixround1). Runtime/fullpackage/PCofffalse; Maxuntouched.
