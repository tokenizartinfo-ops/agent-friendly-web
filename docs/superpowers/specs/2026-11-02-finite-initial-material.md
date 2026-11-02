# C2-A initial material — exact contract PROPOSAL

BEFORE PRODUCT. Root selected bounded material A, but has not yet accepted this exact interface/record contract. BASE6038db5ffbdcaa3e3512f31e355e96dd20f52beb. Full preflight/refinements/Root scope: [report](../reports/2026-11-02-finite-initial-preparation-source-preflight.md). No product/test implementation in this documentation commit.

## Boundary and entry

A is an UNMOUNTED private factual constructor, not the initializer/publisher/UI/source-authority. Existing actor storage only. No new Worker/DO/Workflow binding/export/publicRPC/HTTP route/operation. Later B owns actual original native Workflow/issuer/effect admission, initial closed_ui publisher/journals/owner-source/allwriters. General unavailable seams stay unchanged; stored data never recreates authority.

Proposed lib/mcp-qa-finite-initial-material.mjs:
createPrivateQaFiniteInitialMaterial({ctx,env}) -> frozen {collect(refs,originalLease), assertCurrent(result,originalLease)}.
Exact constructor2keys; collect exactly2args, refs exactly {commandId} positive safeinteger. No callerM/QA/project/subject/goal/pins/URL/token/clock/provider/fact callback. M/tree from actual B1/C1 independent compiled constants; QAUUID from actual env.AFW_QA_VERSION.id. Constructor captures actual ctx.id/storage and methods, AFW_INDEPENDENT_CLOSURE/idFromName fixedactor afw-own-successor-closure-v1, RELEASE_DB/withSession, AFW_RELEASE_EVENTS_NODE, AFW_QA_VERSION object/id, fixed fetch/readtoken holder. Recheck after awaits. These are local coherence facts, NOT platform source/caller identity.

Result is DATA, brand minted only after this collector's actual ACK/readback and retained in the constructor's private result map tied to exact ctx/env/storage/originalLease. assertCurrent checks original lease, capturedholders, material/hash and exact candidatebytes; neither creates nor approves an effect. JSON/structuredClone/anotherconstructor/anotherlease/afterexpiry cannot recover the brand. No exported registration/setter/globalenv. Brand asserts this invocation's factual composition only, sourceIdentityVerified/scopeVerified/authorizesEffects stayfalse.

Proposed result exact {purpose:"afw.finite-initial-material-result.v1",material,originalContext,candidateBytes,sourceIdentityVerified:false,scopeVerified:false,authorizesEffects:false,completePackage:false,operationalReadiness:false}. material is script-free immutable record; originalContext rehydrates only B1script in-memory, candidateBytes defensive actualB1copy. Neverreturn this overRPC/HTTP/log/artifact. TestDO returns only sanitized resultmetadata.

Failure sanitizes to {status:"admin_pending",mayRetry:false,operationalReadiness:false}, no private error/provider/SQL text. Repeatcollect never rebuilds/replaces existingonce; readonlyreconciliation cannot issue new IDs/ACK or brand. LaterB independently reads/qualifies retainedmaterial asDATA; A does not implement that mounting.

## Original command and clock, no owner window

Fixed proposed future command /afw-qa-finite-prepare v1 <M> <canonicalQAUUID>, actual owner290715446/login tokenizartinfo-ops/typeUser/associationOWNER, repository tokenizartinfo-ops/agent-friendly-web, issue497. GH only exact /issues/comments/<commandId>. Exactbody; actual canonical ISO created_at/updated_at; require updated_at===created_at; issue_url fixed; no event/queuedAt fabrication. Before/after compare exact normalized evidence {commandId,body,createdAt,updatedAt,ownerId,repository,issueNumber}; repositoryId1347578006 remains sourcefixed and C1 checks actual repo. commandHash=H("afw.finite-initial-command.v1",evidence). Do not persist raw HTTPheaders/body beyond this public exactcommand projection. Actual initialcreate/command unauthorized inA sourcework.

I0=actualcommentcreated_at; initialDeadline=I0+300000 includingwholequeue. A receives original {signal,assertCurrent}, owns no renewedparent; total<=30s wall/mono/abort from collectorentry clipped originalparent/initialDeadline/currentcustody. Every child<=5s clippedsameparent; retain actualunderlying promises before races. C1/B2 each receive original narrowedlease, not an outer5s race for their whole multiread collection. NoWorkflow eventtimestamp in A; futureB adds actualeventcorrelation, no inventedqueuedAt. C1P0/Pend separate. Owner15min/read10min/T0 windows NOT created in A; no window field in records. LaterB anchors applicablewindow to actualoriginalcommand, never newstage/reread.

A GH budget exactly C1<=11 plus2originalcommandGET =<=13. CF existingC1 3 plus existingB2 3 =6, no publication/currentcanary claims. Additionalnative2B2legacytx/2B2D1queries plus2freshownedprojectqueries and newstorageclaim/material/ACKreadbacks. GitHub60/IP/hour/sharedquota andlatency remainavailabilitygates; failwithoutretry/key/proxy. C1no-cache unchanged. No10ownersessionbudget orHTTPsession implementation. Hypothetical53fullflow remainsUNQUALIFIED.

## Exact codecs and domains

Proposed lib/mcp-qa-finite-initial-material-records.mjs exports validate/encode/decode/hashFiniteInitialMaterialRecord(kind,value), fixed kinds InitialClaim, InitialMaterial, InitialSelector, InitialAck; no arbitrary domain/key. Own enumerable plain data, recursively sortedkeys, arrayorder preserved; reject getters/prototypes/symbols/extra keys, invalidIDs/times, cycles/depth>24/nodes>16384. Whole encodedrecord<=65536UTF8; InitialClaim<=8192, Selector/Ack<=2048. C(v)=canonicaldataJSON; H(d,v)=SHA256(UTF8(d+"\n"+C(v))). Hash excludes only a kind's selfhash. All dates safe nonnegative integer epochms; M/tree40hex; hashes/preconnection/trial/activation64hex; withdrawal/save canonicalUUID.

Intent exact {purpose:"afw.finite-initial-intent.v1",repository,commandId,sourceRevision,sourceTree,qaVersionId,initialInstanceId,I0,initialDeadline,goal}. fixedrepo, M/tree/C1/B1match, QAUUID actual; goalcontent, initialDeadline I0+300000. FuturefixedinstanceID=afw-finite-initial-+H("afw.finite-initial-instance.v1",{operation:"finite_initial_preparation",commandId,sourceRevision,qaVersionId}). Computation pure, NOmount/invocation. intentHash=H("afw.finite-initial-intent.v1",intent).

IDs exact {preconnectionId,trialId,activationKey,withdrawalRequestId,saveIdempotencyKey}; crypto32bytes first3, randomUUID last2, allocatedoncefororiginalclaim andretainedbeforematerialassembly. Originalactor once global; neverkeybyM/QA.

InitialClaim exact {purpose:"afw.finite-initial-claim.v1",intent,commandHash,ids,claimedAt,deadline,claimHash}; deadline<=min(collectororiginal30send,initialDeadline,custodyceiling), claimedAt>=I0 and<deadline; selfhashdomainpurpose.

InitialMaterial exact {purpose:"afw.finite-initial-material.v1",intent,claimHash,preconnectionId,qaBootstrap,historicalEvidence,ownerSelection,originalContext,observedAt,materialHash}. qaBootstrap exactvalidatedC1result DATA including record,recordHash,tagSha,primaryEvidence,currentPointer,observedAt/trustfalseflags; checkindependentM/tree/QA andC1records. No new cache authority. originalContext script-free projection below. preconnectionId=claimids, allnewintentions matchclaim. materialselfhashdomainpurpose.

InitialSelector exact {purpose:"afw.finite-initial-selector.v1",intentHash,claimHash,materialHash,sourceRevision,qaVersionId,preconnectionId}; allmatchstoredclaim/material.
InitialAck exact {purpose:"afw.finite-initial-material-ack.v1",intentHash,claimHash,materialHash,selectorHash,acknowledgedAt}; selectorHash=H(selectorpurpose,selector). Actualtimestamp sampled AFTER original material+selector transactionACK, neverreconstructed fromexisting/unknownoutcome; <originaldeadline.

## Storage and once semantics

Proposed lib/mcp-qa-finite-initial-material-store.mjs fixed keys in existingctx.storage only:
- afw.finite-initial-preparation.v1:once -> InitialClaim
- afw.finite-initial-preparation.v1:material:<materialHash> -> InitialMaterial
- afw.finite-initial-preparation.v1:selector -> InitialSelector
- afw.finite-initial-preparation.v1:ack -> InitialAck

No DDL/newnamespace/resource/list/scan/historyrewrite/deletion. Preserve exact5B2historicalkeys/allD1history and firstfinitehead. Collectorreads exact afw.qa-finite-trial.v1:head and requiresabsent beforeclaim andbeforepublicationofmaterial; neverwritesit.

Flow: fixedcurrentholders+B1compiledidentity+originalcommandbefore; claimtransaction checksglobalonce/selector/ackabsent andfiniteHEADabsent, allocatesIDs in invocation memo (reuse if transactioncallback internallyreentered), appendsclaim; actualACK then independentexactclaimreadback; thenactualC1/B2+freshownedrow/materialderivation+secondfreshownedrow+commandafter; holder/lease checks; atomicwrite-once material+selector withclaimmatch/absentexisting; actualACK; separatelyappendInitialAck with sampledACKtime; exactreadbackofallfourrecords; onlythenprivatefactualresultbrand.

No effectSEND inA: only storageattempt/ACK observations. Ifoncealreadyexists, failadmin_pending beforeC1/B2/newIDs. Conflicting/malformed/partialexistingrecords deny. No caller retry, overwrite, replacement, rollback/delete, secondclaim/newIDs afterunknownACK. Retain actualstoragepromises on timeout; timeout/abort!=rolledback orphysicalsettlement. ACKrecord failure leaves retainedfacts but no successfuloriginalresult/brand. Readerforreconciliation, ifneeded, is fixed privatefacts-only and cannotmintACK/redoassembly.

## Actual factual composition

CallactualreadPrivateQaFiniteCandidate(), readPrivateQaFiniteBootstrap({ctx,env},lease), readPrivateQaFiniteHistoricalSource({ctx,env},lease). No wholesale facts substitution, callbackinjection or oldhashreuse.

Historicalartifact frozen315/source2a477 distinct from Qmanifest+D1 and M/B1. Parse actual B2.bindings.successorPolicy with existingexactmanifest/resolver, notreturnDTOtrust. Qoriginal/scope exactvalidatedmanifest andB2originaladmission/closure match. New artifact is actualB1 {sourceRevision,sourceTree,programHash,workerHash,sourceCheck}; script omitted only in storage. fatalUTF8B1script matchesbytes/hash/size.

ownerSelection exact {subject,project:{projectId,revision,synthetic:true},clientId,resource,goal,access:{teamDomain,audience},limiter}. Values from approvedexactpinnedold2607configuration+B2originalscope/admission, samefreshownedDBrow. goalcontent; synthetic:true sourcepolicyfortheapprovedfixedowntestonly. New RELEASE_DB.first-primary getOwnedProject twice sameID/subject/currentpositive revision; rows muststayexacton {id,userId,revision}. No labels/email/arbitrarycallerid. ActualAccessbinding ACCESS_TEAM_DOMAIN/ACCESS_AUD andDELEGATED_RATE_LIMITER fromsamequalifiedconfiguration; strict connection-profile grammar/domain/audience/namespace/limit/period, missingfails. limiterexact {name:"DELEGATED_RATE_LIMITER",type:"ratelimit",namespace_id,simple:{limit,period}}. Noinventedexpiry/newgrant/window.

originalContext exact10 {artifact,scope,original,publication,cancellations,retirementPolicy,withdrawalRequestId,saveIdempotencyKey,legacy,trialId} frompolicy-setup61. publication {artifactKey,workerHash,activationKey}; artifactKey=SHA256(JSON.stringify([fixedaccount,fixedcanary,B1workerHash])) peractualTask4; activation/trial/withdrawal/save fromclaim. scope/original actualoldmanifest, cancellations actualB2history, retirementPolicy exactoldvalidatedrawstring. Fulllegacy uses acceptedreaderoriginbelow. First validate the ACTUAL codec-decoded stored projection with existing finiteData: whole projection<=32768UTF8/depth12/nodes2048, inside the separate wholematerial64KiB cap. originalContextHash=H("afw.finite-original-context.v1",finiteData(storedprojection)), preserving actual Task4 sorted digest semantics. Qprogram/source remainoriginal, artifactM remainscandidate. No speculativecanarybaseline/currentpublication/publicstatic/fullmaterialmanifest.

historicalEvidence exact {purpose:"afw.finite-historical-evidence.v1",reader:{sourceRevision:M,sourceTree},artifactReceiptHash,metadataProofHash,bindingsHash,legacyHash,historyHash}; H domains respectively afw.finite-historical-artifact-receipt.v1/metadata-proof.v1/bindings.v1/legacy.v1/history.v1 appliedactualB2 exactfields asfullpreflight. sourceHash=H(evidencepurpose,evidence); fulllegacy={...B2.legacy,sourceRevision:M,sourceHash}. Reader-origin only, neveroldruntimeorigin; downstreamsamecommitment. Oldretirementhistoricalsemantics preserved/flagfalse, no newT0/newgrant transformation, nophysicalstopclaim.

## Proposed evidence plan before product

HostedNode22/existinglockfile/contents:read temporarybranch+pathqualifier, nosecrets/artifacts/deploy/docs-onlytrigger; EXCLUDEDintegration. No localdeps/build/provider/resources. MeaningfulRED thenactualGREEN nativeDO/storage/D1 realB1/B2/C1productioncomposition underexplicitSYN CF/GH/custody/fixed-testsourcepins boundary; no wholefactualreadersuccessDTO. TestWorker invokesprivateconstructor inactualDO andexports sanitizedassertions only. UseactualcompiledB1residency/testcompilefixture andactualC1nativeparser/primary andactualB2metadata/historyquery; productionceilings unchanged; separateexpirydenial reproducible.

Tests: commandwrongowner/repo/issue/body/edited/time/source/QA; holderdrift/wrongactor/DB; aborted/backward/expiredoriginalclock/childtimeout; exact13GH6CFbounds/noautomaticretries; B1bytes/Q-oldartifact-M distinctions; realAccess/limiter/currentownership/revision/missingslots; oldretirementnotrewritten; exactreaderorigin/projection/selfhash/size/prototype rejection. Concurrent/replayedclaim/newM/QA/unknownACK/latecommits/partialmaterialselectorACK: no newIDs/resend/brand; alloldkeys/D1history/finiteHEADpreserved; originalIDsequalprojection. Copy/replayresultdifferentconstructor/lease/expiredlease deniesfactualbrand and noAPIgrants effectauthority. Positivepath actualallfourreadbacks no window/publication/sourceauthority.

Only affectednewtests+directdependencies andlint; broadB1/B2/C1 reruns if implementationactuallychangesdependencies. RecordactualvsSYN boundaries/commands/counts/run/job/attempt/head/artifacts0 plusCAS/ref/allfile readbacks. STOP forindependentspec/qualityreview. No completePackage/readiness/PCoff claim.


## Root exact-contract acceptance and corrected bounds clarification — 2026-11-02, BEFORE product

Root accepts ba452cffcf10def0263164a18551372ba15ffd82 contract with this clarification. Initial review mistakenly described Task4 original-context digest as unsorted schema-order JSON and requested a shared helper; Root independently rechecked policy-setup.mjs:18–19,72–73 and WITHDREW that assertion/helper request. Actual v1 digest recursively sorts keys, AFTER existing finiteData validation. Preserve it exactly; do not invent a sorted-vs-Task4 hash difference or change v1 meaning.

Required correction ONLY: stored script-free originalContext must pass the existing finiteData bounds (whole projection<=32768 UTF8 bytes, depth<=12, nodes<=2048) even though the enclosing material may be<=65536. Then use existing sorted domain hash afw.finite-original-context.v1. Verify actual codec-decoded material.originalContext after canonical roundtrip; rehydrate script only from B1. Regression must demonstrate actual Task4 digest equivalence and projection32KiB overflow rejection despite totalmaterial<64KiB. Default leave Task4 product unchanged, no shared helper or reflex Task4 rerun.

Exact C2-A contract is now APPROVED subject this recorded clarification. Proceed sole writer with meaningful hosted RED→GREEN, actual native full B1/B2/C1 fixture composition under explicit external SYN boundaries, and mandatory partially consumed original-parent held-child test with actual timer/abort/retained promise/no after-deadline writes. All unmounted/factual/no-effects/no-source-authority/no-owner-window scope remains unchanged. No additional permission required for this bounded source/test implementation. Fresh review after report remains mandatory.
