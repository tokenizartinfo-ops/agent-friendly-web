# Task2 native preparation — architecture prequalification

2026-11-12 06:56:10 UTC. Reviewer /root/budget_native_prequalification_review (gpt-6-astra/high), readonly; reviewed full BASE7852..3590/all7paths/package07fd7b29 and four binding briefs. No tests, nativeI0, Sourcewrites or activation. Spec NOTAPPROVED; Quality NEEDSFIXES. Native16HELD/all7false.

## Critical

F1. Observers detach on reduction setup. recoverCheckpoint installs ownerCleanupFault(normal); new finiteBudgetReduction invokes old restore, installs adapter then ownerCleanupFault(normal) invokes same stillassigned old restore again and replaces get/list/delete with rawmethods. Counters D1/D2 disconnect, D3 may acceptemptycounterfacts, D4 cannot see heldACKs. Compilepreflight/disposercontrol do not exercise this ordering. Source cleanupfixture301, existing19–22; persistence171. Rootprimary causalread independentlyconfirms oldclosure remainsassigned. Required preservefixednewcounter/hold through actualnormalwrapper setup, withactualorderregression/noI0 first.

## Important

F2. R3 reads actualElapsedMs from snapshot captured BEFORE releasing heldACKs; it is written in actual lookup work finally aftersettlement, so correctpendingpath mayreturnNULL. D4 maxelapsed over allchildrenafterC0 can attribute anotherchild. Originaldeadlineexpiration and lateractualsettlement must be separate evidence of SAMEchild. world949–968/1015–1018, cleanupfixture103.

F3. Populatedqueue verdict accepts stale sample. queue.length recorded afterpush/beforepump notdequeue; queuedAtHold caninherit1 fromalreadyenteredoperation. Haveactive/family/time butassertonly>0. R3/D4 needcausalactualqueuedwhilecapacity2occupied/evidencecurrentwhenholdsestablish, withoutbusinessbehaviorchange. world648–664, adaptercleanup301.

F4. R2/D3 canpassfrompriorunrelatedfailure. R2 acceptsnon302/zeroReference/uppertops evenzeroIO. D3 acceptsSDKfailurebeforesecondpage, grantpresent andanythingnotcomplete. uncertainSendRetried derivedalarmdeliverycountdoesnotcountSEND/SDKattemptswithinthatdelivery. Needcausalevidenceoriginalbudgetboundaryreached, durablepending andactualSEND/attempts. nativetest105–116/133–142, world1011–1018.

F5. Readonly canlosefixtureandevidence. ownerReferenceFixture canreject AFTERregisteringcleanup butfassignmentnevercompletes; if(f)finallyskipscallback =>liveMFduringsubsequentcase. Successclones/persistsepochsBEFOREcallbackterminalcapture;nativeDBtemporaryremovedbycleanupandcustodycopiesonlyoutput. Producerfailurebeforeexportalsooutsideoutputcustody. Needownsafefailure/terminalnativeevidencepreservationBEFOREdispose/deleteandcleanupregisteredcallbacksregardlessfassignment. cleanupfixture114–122/world939–972/initialentryworld196/workflow1056–1065. Actualcrypto doesnotrecovermissingdata. Source/testseam scopeextension ifneededmustbeproposed/readbackbeforemutation; no productionexpansion.

F6. Authenticatedinneridentitypartial. Producerbindingbeforemountomitsjob/lane/commandSucceeded/repository/ref/sourceTreevscheckout; peeraggregatealsoomitsjob/lane. Needallfixedidentityfieldsbeforemountandaggregate, includingmappedproducerlaneandactualtree. workflow849–857/1307–1310.

F7. Bpeerwaitonly15*2s mayrejectvalidnativequalificationwithindependentP1/producerclocks; DAGpermits>30sgap. Pollcount/waittimefactsnotpersisted. Postnative/disposalhasownfinitejobbudget; chooseboundedpostnativebudgetconsistentactual15minjob, preservetimes/countswithoutclockrefresh. workflow1277–1284.

## Minor deferred for finalreview

M1. Paired disposer discardsallbutfirstfailure; disposalerrorcanmaskoriginalmountfailure. Controlcovers3individualfirstfixturefaults, notexplicitnormal/multiplefailures. world1026–1052/1074–1076. Allphaseattemptsdooccur. DeferunlessdirectlyaffectedbyF5, thenpreserveallprivatefailureswhilekeepingfirstactualidentity.
M2. Aggregaterequires5distinctRootshashes,butrequirement5genuineoccurrences/10rolegraphmountrecords requiresprovenance, notuniquehash. workflow1326–1330. Carrytofinalreview; do not silentlytreatfivehashesasindependence.

## Strengths and pending runtime verification

Production/SDK/dependencies/configpreserved. Actualapi.revokeGrantstructuralcall/awaitpreserved; closedcustodykindsenum/crosskind/tampertests. PairedallSettledcatchlatesibling;Bstartsreadonly+reductionproducer; ownterminalfutureacknowledged; preflightsnotcalled16green. Manualworkflow404onmainwasreported; Rootalreadyusesonefixedselfpathpushactivationonsourceafterrelease, no maincatalogchange.

Afterfixandre-review, actualonecoherent16/7terminaljobs/firstattempt/samefrozenSHAstillrequired:5genuinefixtures10M-QAmountprovenance,originalRoot30s/child5s/I0/C0/C1/SDK/Reference;causalR/Dinputs/pages/hold/queue/deadlines/SEND/observed/receipt/pending;4Dsamecheckpoint/exactID/digest/bothaliases/4readytimes<=sameC0-30s/A-Boverlap;producerstart/export/realjobintervals/disposition;all7dprivateartifacts/authinnerinventorysameIDandclosedsummaryhash;RootfinalBterminalreadback. FinalTask2review/global296reviewremain. Allreadinessflagsfalse.
