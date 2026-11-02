# C3 finite admission — read-only preflight and race refinement

Source inspected by /root/finite_admission_preflight at ba452cffcf10def0263164a18551372ba15ffd82. No writes, tests, provider/runtime/private probe, callback, secret, grant or effect. Root read systematic-debugging and separately inspected exact custody/host functions. This is evidence/contract proposal, not implementation or runtime finding.

## Exact causal order

- mcp-own-durable-host.mjs57–68: subscription snapshot/authorization/closed check → receipts.preflight → invocation → custody.start → controller.subscribe(callback verification) → receipts.record → readReadiness.
- mcp-node-process-custody.mjs79–90: finite.beginAdmission marker precedes nativeD1 admission.93–100 D1 admission→encrypted custody reserved→starting.103 launch checks reservation too late.
- Custody45–55 admissionSQL checks originalgrant/latestconsent/absenceclosure/revoke/scope/time/window/deadline, NOT preparedreservation.
- mcp-successor-launch-gate29–35: optional launchmarker then authorization/deployment/retirement and launchclaimINSERT joins exact prepared budget1 reservation.
- mcp-successor-reservation26–35: reservationINSERT requires matching originalpredecessor admission/closure and GLOBAL admissionsCOUNT=1; premature secondadmission poisons intendedreservation.
- Host70–76 catch alwayscustody.close; custody144–159 LEFTJOIN explicitlyallows closure withnoadmission andrequests runtime.close. Early guard onlyinside custody.start stillcausesclosure; pretryguard alone stillfailsrace if laterprecheck/INSERT eligibilitychanges.
- worker/mcp-own/index30–40 doesn'tpassfiniteGate tohost; actualAfwNodeControl89–95 sameDOpath. Library-onlyfix doesnotestablishactualfinitewiring.
- mcp-own-finite-cleanup-host13–18 derives actualsourcegate fromvalidatedcontrol/ctx/storage/DB/namespace/version/primary/nominal; resolverstillfactorygated.
- mcp-own-finite-primary12–22 permitsnullreservation andhashesonread; omitscopeHash/predecessormatch.24–28settlementrowpresence isnotadmissionpermit.
- mcp-subscription-lifecycle153–173 stillreadinessbeforecallbackverification;150cloudReviewConfirmedfalse. SeparateC3 gate.

## Minimal proposed reservation checks (Root must rule before product)

Dedicated source-owned/module-branded finite admissionprecondition, noarguments/callerDTO/boolean/hashpermit. Derived fromactualfixedvalidatedcontrol+resolvedsuccessor. Checkexactslot/trial/scopehash/candidatecontainer/program/source/window/application/predecessorpins, prepared/budget1 state andoriginalpredecessor admission/closure, currentcontrol/source/primaryclock.

Host invokesprecondition BEFOREcleanup-on-failure try; custody.start repeatsBEFOREbeginAdmission foralternatefixedcompositions. ActualD1 admissionINSERT mustALSOjoin/EXISTS sameexactfixedreservationpredicate tocloseTOCTOU. Keepalloldgrant/consent/closure/scope/SQLtimechecks. NativeDOmarker andD1 aredifferentstores: no atomicityclaim/no markerreset/refund afterissued.

Historicalreservation.observed_at isnotnew30slifetime; currentlaunch'sfreshretirementobservationstaysseparate. Preserve retainFiniteWriterDeadline(gate117–123), double nominalchecks47–54/70, seals/N1/C1/originaldeadlines/unknownACK. No genericnewserver/routes/permissions.

## Trusted classification needed toavoidclosing a rejected attempt

PrivateWeakSet of provedno-admission errors scoped custodyinstance/currentstart; onlycustodyimplementationcanmint. Internalreader e.g.isKnownNoAdmissionFailure(error) recognizesonlyexistingbrand, notflags/DTOs. Custody.safe narrowlypreservesthatexacterrorobject, sanitizeseveryothererror; hostcatchskipsclosureONLYitsowncustodyrecognizesthebrand. Outerhost.safeALWAYSgenericpublicfailure. No nativebrand/code/state overRPC/HTTP.

Mintonly:
1 finitepreconditiondenial BEFOREbeginAdmission/admission/runtime, undertrustedfreshattemptstate. Existingunresolvedadmission/launchwriter/ambiguouspriorstate NOTsafe.
2 alladmissionexecutions inthisstart ACKed success===true ANDmeta.changes===0; nonepending/unknown, no runtimelaunch. Issuedfinite markerstaysspent/unresolved. Noretrypermission.

Actualclaimuses ordinaryINSERT…SELECT .run(), NOTORIGNORE/RETURNING/.first. Resolvedsuccess:true+changes0 proves THAT executionzerowrites; currentchanges!==1erroralone doesnot. Existingrowuniquenessconflictcanthrow: notzero. Exception/timeout/malformedresult/successfalse/changes1/postINSERTfail/lostACK/custodypersistfail/readinessfail/possibleruntime retainsordinarycleanup. Do notskipcleanup basedonpublicerrorname/code.

D1executionisinsidenativeDO.storage.transaction callback93–96. Trackallattempt evidenceOUTSIDEcallback; callbackrerunmustnotforgetpriorchanges1/unknown. Anyinserted/unknown permanentlydisqualifiesno-admissionbrandforthisstart. OnlyallACKzero/nopending/nolaunchqualifies.

## Focused future RED/GREEN

1 ActualnativeDO/D1 premature subscribe todayproducessecondadmissionorclosure andblocks subsequentreservation. GREENleavescompleteDO/D1snapshotunchanged,0launch/close/callback; intendedreservationstillinsertable.
2 Eachwrongfixedpin/missingrow/notyet/expired/control/consentrevocation/readfailure deniesbeforemarkers.
3 Hostprecheckpasses/custodyprecheckfails: no closure/close.
4 Bothprechecks pass/eligibilityexpires/actualINSERTACKzero: noadmission/closure/close/launch, DOmarker unresolved(no refund).
5 Throw/lostACK/malformed/successfalse: cleanupretained.
6 INSERTsuccess/laterfailure: cleanupretained.
7 DOtransactioncallbackrerun afterchanges1/unknown thenzero: unsafe/cleanupretained.
8 Existingunresolvedwritercannotmintbrand; forgedErrorcodes/DTOflagsnever suppresscleanup; publicresponsegeneric.
9 Validexactreservationpermitsoneadmission underoriginallease, launchretainsdeployment/retirementchecks. Ordinarynonfinitebehaviorpreserved.
10 Actualfinitehostwiring/factoryqualificationisowninggate; don'tclaimfromlibraryfixture. Callback-readiness/Save/earlywithdraw/receiver/fullpackage remainseparate.

Potential bounded files: mcp-own-finite-primary, finite-admission-gate, finite-cleanup-host, durable-host, node-process-custody; actualfinitewiring indexseparateprerequisite. Existingreservation/launchregressions notmodifiedbyinference. No exacttestpathsinspected; choosebyactualimports/testinventorybeforecode. OnewriterafterC2Astop; no implementationauthorizationfromthispreflight. operationalReadiness=false.
