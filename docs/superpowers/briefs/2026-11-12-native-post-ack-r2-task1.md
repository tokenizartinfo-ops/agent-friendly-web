# Native post-ACK R2 — Task 1 exact requirements and one KEYLESS release

Read this first. This brief is the sole task requirements package. No need to read the full plan or old chat. The complete binding SPEC is included below. Independent Astra preflight at f8ab3ca2 resolved N1–N4; this Root brief releases IMPLEMENTATION and exactly ONE KEYLESS contracts workflow attempt 1, NOT Native.

PROJECT=AFW
REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006)
ENVIRONMENT=isolated Source branch / SYN GitHubActions
ORIGIN=GitHub connector
RESOURCE_TYPE=Git trees/blobs/commits/ref + finite KEYLESS workflow
RESOURCE_ID=feat/finite-native-cleanup-20261101; exact six paths below
ALLOWED_ACTION=implement Task1, qualify once 7+2 keyless, close both new workflows, append report and STOP
ROLLBACK=restore exact original World blob and close both new workflows using CAS if this task fails; preserve all unique evidence/history, no force/reset/retry. F7 never changes.

## Starting lease and six-path scope

BASE=408e82abe63178319862c99c3c24684e2258296d
TREE=552faa898d2bb049680ddd3fabf12cf9770a84d4
main=0c9c475b3ebaa970fc11d628b40e50a90cceb727
ORIGINAL_WORLD_BLOB=5fb78c057b7e80260ae683abf4af892767ce110e (218113 chars)
F7_PATH=.github/workflows/afw-finite-budget-qualification.yml
F7_BLOB=f7a71f1a0fa4f5ddf069ff411f008a098455e5cc (126209 chars, seven jobs false, manual/noinputs/nopush)
REPORT_PATH=docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md
REPORT_BASE_BLOB=f9ec93f51a9a16f53081633c89cf8cfaf069fd56 (507875 chars)
LOCK_BLOB=36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b (445991 chars)
All 3190 old leaves except World+REPORT are protected byte-for-byte (3188). Create exactly four new files:
- test/fixtures/finite-post-ack-diagnostic.mjs
- test/finite-post-ack-diagnostic.test.mjs
- .github/workflows/afw-r2-post-ack-contracts.yml
- .github/workflows/afw-r2-post-ack-diagnostic.yml
Expected final tree=3194 leaves; compare full nontruncated recursive trees, not only diffs.

Full readback before CAS: Source/base/tree, original full World/F7/report, all protected leaves, main and active workflow status counts queued/in_progress/waiting/pending/requested all zero. Preserve git objects for rollback. Search AGENTS.md before reading and read relevant stable Project boundary/Security/Engineering/continuity instructions; historical receipts are dated only. New files absent. Inspect ALL workflow event matches and relevant package scripts before first push: report preexisting inert/keyless CI separately; no automatic Native permitted. If new file default inclusion could allocate Native, stop and ask Root for a ruling before mutation.

All Source work CLOUD: GitHub Git database CAS and Actions. No local clone, npm/deps, build, Node import/eval/execution of Source, native execution, downloads or temporary Source files on Gabriel's PC. You may assemble authored code/public Source STRINGDATA and hash/parse framing in bounded memory using Node REPL; Source execution/tests only GitHub runner. Runner-owned temporary files are allowed and removed safely. Rootdocs branch is Root's; DO NOT write it. No other project resources or production target.

## Sole KEYLESS execution permit

After implementation/self-review, release exactly ONE run of afw-r2-post-ack-contracts.yml on the exact branch, push event/attempt1, producer7min + independent verifier2min. No environment/AFW checkpoint key/SDK runtime/Miniflare/I0/Native. Exactly 24 IDs and callback-own postassertion exactly-once witness; no skipped/forged/no-op qualifications. Command:
AFW_POST_ACK_MODE=controls node --test --test-concurrency=1 test/finite-post-ack-diagnostic.test.mjs
Use current exact lock/Node22.23.4 and relevant existing inert compiler/observer/facet controls only. No full native suite or existing readonly three-R test. Static RED against missing baseline exports is permitted and labeled STATIC; actual GREEN is this one GitHub run only.

Prepare afw-r2-post-ack-diagnostic.yml COMPLETE and REVIEWABLE but manual/noinputs/nopush/ALL jobs false throughout Task1. F7 unchanged seven false. No key, MF or I0 at any time in Task1. No permission to activate Native, even on contracts PASS.

Before actual KEYLESS push freeze candidate and record all current file hashes. ONE activation/event run-label/gates switch only for contracts job; wait BOTH terminal. No Re-run jobs/retry/rerun/second qualification if failure. ANY failure: preserve safe evidence, close both new workflows/F7 protected, full ref/tree/files/main/zero-active readback, STOP and report. Root handles a separate scoped fix-loop/permit. Do not silently repair and consume another run.

After successful qualification restore contracts workflow to manual/noinputs/nopush/all jobs false; Native workflow remains inactive. Preserve all report history verbatim. New Source files and WF bodies stay reviewable; no merge/PR/main/deploy/publish. Final full readback and active five-state counts zero, STOP. Native Task2 requires CLEAN independent task review + a NEW separate Root brief/fresh executor.

## Builder interfaces / evidence expectations

The complete SPEC below and N1–N4 bind. You may settle routine implementation choices consistent with it, documenting them; ask Root for a concrete missing contract rather than guessing or expanding paths.
- Plain SDK/lib/lock/default F7 unchanged; no arbitrary new transform/case/destination API.
- Original SDK exact package1.2.1 dist251149B SHA bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80.
- Default OFF byte identity must compare ORIGINAL World and candidate at IDENTICAL compile identity/defines on the runner, no historical GITHUB_SHA spoof or MF. Diagnostic ON only two declared QA emissions, M unchanged and Node module excluded from Worker metafile.
- Same local error object/calls/args/receiver/short-circuit/retention/root and child deadlines. No mutable activeMetric association. One-shot local scope consumed before first await.
- New safe contract is distinct from prior readonly projection; old R1/R2 SAFE bundle is historical and must not be downloaded/replayed or treated as current Native.
- Existing AFW_SYN_CHECKPOINT_KEY may appear only in future Native key-preflight/seal/open steps; trusted runner / absent Native env binding is the claim, not independent isolation. Root could not inspect environment-secret metadata because connector endpoint is unsupported; no evidence key missing/expired. Do not request rotation, broader permission or user paste. Task1 needs NO key.
- Current-job headroom must use official current Actions metadata/Date and conservative elapsed age/margins; current-identity compile preflight before actual MF; unavailable remains unavailable. No fake 120-second fresh timer.
- Exact 24 control registry/witness and fixed observation hash vector must actually execute within named controls. No nested definition registration false-green; compare real current transforms/selector, not mirrors.
- Contracts SAFE proof is exactly two JSON files, <=65536 combined and ZIP<=131072, full real result manifest/current context/program hashes. Root will download only that small proof. Include source/code/provenance/default identity/emission evidence in closed proof or precise Source report as appropriate, no Worker code dump/private payload in safe proof.
- Native pipeline AEAD code should reuse protected helper APIs; no copied giant sealer, no public plaintext/private logs or raw source evidence upload. Original failure and certificate validity independent; inspection includes producer AND verifier.
- No unnecessary generalization, refactor, new section project, additional control IDs or parallel implementers.

## Report contract — append only to REPORT_PATH

Section heading: Native post-ACK R2 Task1 — initial implementation and KEYLESS qualification.
Full report: what implemented; exact source/commit/tree/blob/hash/size inventory and commands; STATIC RED if used, ACTUAL GREEN run/attempt/job IDs/outcomes; exact 24 control record+witness; relevant other inert controls; artifacts IDs/bytes/digests/expiry; baseline OFF same-identity proof, SDK/raw/protected pins, exactly two emissions/M unchanged; current profile/sealer; complete inactive Native commands/custody/outcome/headroom/limitations; original and final event/job gate inventories; complete before/after report prefix preservation/protected tree/main/zero-active readback; self-review findings, limitations and NOT EXECUTED (Native, CF runtime, PC-off, Max). No secrets, raw private failure data or full logs. You may inspect this KEYLESS producer's bounded closed control output; future Native producer logs are private and cannot be read via MCP.

Reply under15lines ONLY Status DONE|DONE_WITH_CONCERNS|BLOCKED|NEEDS_CONTEXT, created commits, one-line actual tests, concerns and Source report reference. For NEEDS_CONTEXT/BLOCKED give concrete uncertainty. No subagents/reviewers. Root separately reviews; your self-review is not approval.

## Task 1 extracted with binding N5 correction

### Task1: Implement observer/compiler integration and qualify KEYLESS; prepare INACTIVE Native pipeline

**Files:** Modify test/fixtures/finite-budget-world.mjs; appendSourceReport; create test/fixtures/finite-post-ack-diagnostic.mjs, test/finite-post-ack-diagnostic.test.mjs, .github/workflows/afw-r2-post-ack-contracts.yml, .github/workflows/afw-r2-post-ack-diagnostic.yml.
**Interfaces:** Consumesbaselineworld/SDK/compiler/ownership/sealers; producesfixtureexports andworldpreflightPostAckDiagnostic()/runPostAckR2Diagnostic() EXACTSPEC, typedSAFEschema/24ControlRecord, closedcurrentNativeworkflow. Noarbitrarymodule/case/transform/destinationAPI.
- [ ] VerifyfullSourcebase/tree/protectedpins/main/allWorkfloweventmatches/newpaths/noautomaticNative; preservefulloriginalworld/F7/report/gitobjects+rollback.
- [ ] Add24namedcurrent-codecontrolassertionsperSPEC BEFORENativeimplementation; staticbaselineREDallowedwhereexportsabsent, documenthonestly.
- [ ] Implementpurefixturetransform/observer/schema/selector/VMcontrols withlocalerroridentity/one-shotctx/SAMEoriginalcalls/effects, noNode-moduleinWorkergraph. Build closedprofile/supplementalsealer.
- [ ] IntegrateWorldviafixedNodeprofile/preflight+R2adapter, baselineOFFgraphbytes sameSource/defines, ONexact2QAemissions; terminalSnapshotextensionONLYexistingRPC andafterunwindextraction; preserveNativeerror.
- [ ] ImplementsingletestfileMODEdefaultcontrols24/noNative, explicitnative_r2_onceexact1R2testtimeout120s+CIgates. Addno-op/missing/skippedcompletioncounterexamples, allocationtrap andallReviewFocustests.
- [ ] ImplementcontractsWFnoenvironment/secrets, ONE7minproducer+2minverifier; SAFEproof2JSON; NativeWFcompletebutALLfalse/manual/noinputs/nopush,7+2envkeyONLYseal/opensteps, headroomgate/currentpreflight/singleR2/nativeexit+custody/SAFEindependentverifier.
- [ ] RunONEexplicitlyreleasedcontractsqualificationGitHubpush/attempt1; commandcontrols AFW_POST_ACK_MODE=controls node --test --test-concurrency=1 test/finite-post-ack-diagnostic.test.mjs; require24uniquepassed/no skips+24postassertionexactonce+existingrelevantinertcompiler/observer/facetchecks, mfAllocatedfalse/I0false. NoSDKruntime/Native.
- [ ] Preservecommands/actualoutputs/artifactmetadata/hashes/currentSource/graphbyteidentity+2emissionproof inSourceReport; disablecontractsWF manual/allfalse, NativeWFstillfalse/F7unchanged; fullref/files/tree/protected/main/0activeSTOP.
- [ ] IndependentfullTask1review+scopedfixloopifneeded (originalimplementerround1–3); NO NativeuntilCLEAN+separaterelease.


## Full binding SPEC including N1–N5

# Design — ONE R2 SYN Native post-ACK diagnostic

## Intent, evidence and approach decision

OverallAFWgoalNative16/fullcloudflow/PCoff/MaxremainsPENDING. Reference-stageplanCOMPLETE/finalAstraCLEAN, Source408e82abe63178319862c99c3c24684e2258296d exactF7all7false/main0c9c475b/protected3188/0active. Primary43313662894 onlyprovesR1firstrejectingreceiptgrouphttp andR2lastrecordedhelperentrygrant, oldrows+WHOLEcertunchanged: child5/5018abort/settled→issuer-ack/9entries/lastpair706. Nooperation-specificACK/cause/drain.
Publicresearch provesexpectedSQLrow/issuerACK/anchorAREadvancedbeforechecks, historicalACKfieldsnormalized; noobviousdeterministicbaseline-updatebug. ExistingselectedRawepochs reducesguarderrors/discardsexacterrors andomits__t3Observation.failframes, soexactrecheckrejectioncannotberecoveredfromcurrent2fileprojection.
Rootconsidered: (a) repeatNative16unchanged — noaddedcausaldiscriminator/unnecessaryresources; (b) keepcoarseRawprojections — cannotrestoremissingtypederror; (c) ONE R2SYNdiagnostic withfixture-onlytypedpostACKboundary. RootCHOOSES(c) underuserexplicitcontinuousAFWSYN/cloud-firstdecisiondelegation/optoutquestions; notclaimofuserdesigningimplementation. Nohuman/browser/OTP/newcredentialsneededforpreparation. ThisdocisPROPOSED, NOTSourceorNativepermit.
Costifwrong: Source/reviewrework orinstrumentedfailure/no-reproduction, timingoverheadcaninfluence5s; noCFremote/userbusinessresources. EvenvalidcertificateonlylocatesCURRENTinstrumentedrejectionboundary, nothistoricalcause/nativefix/16qualification.

## Resources and immutable inherited pins

Native=realSDKinsideworkerd/Miniflare ONGitHubUbuntu24.04/Node22.23.4. NOTCloudflareremoteruntime. QAoutboundSYNmapsGH/CF/JWKS, Moutbound503, noexternalfetchfallback. Realnetworknpm+GitHubcheckout/Actions/artifactsONLY. NoCFtokens/policies/cron/Containers/Workerdeploy/OAuth/realcustomers/Max/mail.
SDK@cloudflare/workers-oauth-provider1.2.1 dist/oauth-provider.js251149B SHA256bb2b85243221906d1705653a82678dab2f0020a14ef8faa7d86d764890610e80;44KVsites. LockGitblob36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b445991chars; MF5.20260831.0-alpha/workerd1.20260831.1/esbuild0.28.2/TS5.9.3/Wrangler4.128.0dependencyONLY. No dependencyupgrade.
BaseWorldGitblob5fb78c057b7e80260ae683abf4af892767ce110e218113chars; basecleanup2f5dad6c306fac1be2f11845bef640bb204ad572; initialWorlda7b730dc9be336528f0971544099f79d05758b1a; descriptorsbe695028e4c12c3cb7d3b7bf2c5f2e7508f3db15.
F7 .github/workflows/afw-finite-budget-qualification.yml MUSTremainbyteexactf7a71f1a0fa4f5ddf069ff411f008a098455e5cc126209chars/all7false/manual. rawlib/*, SDK, lock, cleanup/initialWorld/descriptors/budgetdiagnostics/custodyhelperUNCHANGED.
I0=nominalSYNpreparationcommentcreated/COMMAND9001, notjobstart; preserveC0=I0+900000/C1=C0+180000, root30s/child5s/scopepeak2/lists2/gets200. ONE R2 Native job, ONEinitialMFallocation(M+QA); noothercases/recovery/restarts/nextallocationifdisposaluncertain. OriginalNative16=Q8+R3+D4+P1 not16Workers; no16rerunfromthisplan.

## File map and Source scope

ExistingmodifyONLY:
1 test/fixtures/finite-budget-world.mjs — opt-inNode-onlyprofile/compiler+supplementalpreflight+fixedR2adapter/extraction; NORMALbehavior+prepared/emittedgraphs unchanged.
2 APPEND docs/superpowers/reports/2026-11-07-finite-native-budget-qualification-task2.md — everyprior507875charpreserved.
CreateONLY:
3 test/fixtures/finite-post-ack-diagnostic.mjs — Node-onlytransform/literal/schema/selector/VMcontrols; MUSTNOTimportworld(circular), neverenterWorkergraphs.
4 test/finite-post-ack-diagnostic.test.mjs — controlsMODEdefault, exactlyONE NativeR2testONLYexplicitauthorizednative_r2_onceMODE; noNativeR1/R3registrations/patternskips.
5 .github/workflows/afw-r2-post-ack-contracts.yml — separateKEYLESS7+2 qualification; finalmanual/noinputs/nopush/alljobsfalse.
6 .github/workflows/afw-r2-post-ack-diagnostic.yml — separateNativeproducer7+independentverifier2, initially/finalmanual/noinputs/nopush/alljobsfalse.
TwoWFs areRootchoice tokeepKEYLESSnoenvironment/secrets andno unreviewedmode-switch afterqualification. ExistingF7protected. Old3190leaves: onlyworld/reportmutable,3188protected inclF7;4newfiles=>3194whencomplete. NootherSourcepath/main/PR/merge/runtimechange.
UseexistingisolatedSourcebranch feat/finite-native-cleanup-20261101/cloudGitdatabaseexpected_shaCAS; noPCSourceexecution/clones/deps/build/files. BeforewriteinspectALLEVENTmatchesfornewpaths/ref: preexistingKEYLESSCI permitted/logged, ANYautomaticNativebesidestargetforbidden/STOP. F7/allnewNativegatesfalse duringpreparation.
Rootdocsseparate. EveryTaskneedsnewexactRootbrief; noautodispatch/retries.

## Module interfaces and profile

Fixtureexports:
POST_ACK_PROFILE='r2-post-ack-v1';
transformPostAckEmission({role,modulePath,source,identity}) -> {source,record:null|PostAckEmissionRecord}, ONLYfixedQAphase-contextand<stdin>, rejectunexpectedprofile/sites;
validatePostAckSupplement({records,baseline,identity,metafile}) -> verifiedsupplement;
selectPostAckCertificate({snapshots,mountedProvenance,originalR2Outcome,context}) -> SafeObservation;
validatePostAckResult(value,expectedContext) -> value;
runPostAckObserverControls() -> exact24ControlRecord.
WorldexportsONLYtwofixedadapters:
preflightPostAckDiagnostic() -> DiagnosticPreflight;
runPostAckR2Diagnostic() -> writesfixedownedSAFEobservationafterunwind, returnsnormallyonoriginalR2success, rethrowsSAMEoriginalR2erroronfailure.
No exportsWeakMap/errors/fullsnapshots; noarbitrarytransform/module/case/destinationarg. NodeAsyncLocalStoragefixedprofilecontextmayisolatecompilerparallelism; oldAFW_BUDGET_DIAGNOSTIC_CANDIDATE remainsrejected.
TestMODEempty/controls=>24KEYLESSonly; native_r2_once=>ONEtestR2onlystrictrepo/ref/workflow/attempt1gates. UnknownMODErejectsbeforeMF/I0. NativeentryinvokesrunBudgetReadonlyCase('R2')EXACTLYonce, NEVERold3Rtestfile/filter.

## Default byteidentity and diagnostic emission/provenance

ProfileOFF: same loaders/raw/prepared/emittedM+QAbytes+originaladditionalSYNrecords, no diagnosticcodeinsideWorkergraphs. Comparebaseline408worldandcandidateOFFunderIDENTICALcompileidentity/defines; graphsembedtestRevision, soold/newcommitSHAcomparisonisINVALID.
ProfileON: Mbyteexactbaseline, QAraw/preparedunchanged, original3additionalSYNobjectsunchanged. OnlyTWOpost-baselineQAemissionsdeclared: phase-context and<stdin> budgetSnapshot. NewclosedpostAckSYNrecordseparatefromoriginaladditionalSYN:
purpose/version/profile/path/phaseafter-baseline/baselinebytes+SHA/emittedbytes+SHA/transform-literalSHA/exactsites/enums+fields/businessAuthorityfalse/addsAwait0/addsPromise0/addsNativeCall0/changesRetentionfalse.
CompilerMUSTverifyduringNativecurrentSource/run/attempt, unchangedSDK/raw/preparedpins/counts,exact2emissions+metafileNode-moduleabsence,expectedsiteinventory and actual captured build inputs/outputs under N5; unknownsite/no-match/multiple-match fails the relevant preallocation or pre-mount gate.
DoNOTembedQAgraphhashinitsownQAgraph(selfreference). IsolateemitstypedrecordONLY; NodeattachesverifiedmountedSDK/M/QA/transform/preflighthashes.
Stage1 hashes are tied to their captured compile inputs and Source identity. Stage2 MUST rerun current-identity PURE preflight before MF/I0 to qualify SDK/raw/transform/site-inventory pins, explicitly labeling graphs MODEL ONLY. Actual Native graphs use legitimate allocated IDs and current fixture data; verify their captured inputs/outputs and retained mounted options under N5, never compare their full digest to modeled preflight. Never rewrite GITHUB_SHA, time, namespace IDs, history or fixture ceilings. No Native authority from pure preflight.

## Causal observer, no behavior replacement

InstrumentONLYEXACTissuerCall site after awaitedissuerAppend('Ack',ack,op)returns andbeforeexisting awaitrecheckOwned(). CaptureopFROMTHATlexicalissuerCall, onlyconsume/granteligible.
PerHANDLERlocalone-shotslotsetaroundEXISTINGawaitrecheckOwned, consumedSYNCHRONOUSLYatfirststatementofrecheckOwned intoCONSTctx, slotclearedBEFOREfirstawait. Finallyclear/restoreonlyowntoken; don'treadmutablecontextatemission. Nested/unrelatedcallsduringawaitcannotinheritctx. NoactiveMetric/last-stepcoupling. Eachctxownordinal1..32 atinvocationSTART(notbudgetchildordinal); collectorgetsCLOSEDprimitivesonly, noError/contextrefs. Overflow/duplicate/foreign/stale/orderambiguityinvalid.
Observeexistingboundarieswithoutreorderingorcopyinglogic:
entry_check initialcheckcall;
notice_guard requireEmptyNotice;
protocol_invariant explicitoriginalfalseinvariant->fail;
pair_wait original awaitwait(observeOwnerPhasePair(...));
expected_mismatch ONLYexplicitoriginalcomparisonfalse->fail;
exit_check finalcheckcall;
unknown otherwise.
AssociateidentityofEXACTerror emittedbyoriginalguard/call withcapturedctx; outerpostACKcatchmustseesameErrorbeforequalification. Incidentalcanonical()/getter/typeexceptionsMUSTNOTbelabeledexplicitexpected_mismatch/protocolrejection. No stringmatchingarbitrarymessage/code/stack. ObserverfailuremarksqualityinvalidONLY, neverreplaces/throwsinsteadoforiginalreturn/error; rethrowSAMEoriginalobject.
Noaddedawait/.then/Promise/nativecall/getter/SQLread/args/receiver/retain/recheck. Existingpredicateexpressions/order/shortcircuit/effects/deadlines/authorityunchanged. Synchronousobservationalcostremainsrisk, soinstrumentedtimeoutdoesnotprovehistoricalcause. pair_waitisCALLBOUNDARYnotunderlyingcause; pairrejectvswaitabortorderingambiguous=>unknowncause, noleaseinstrumentation/cancel-by-guess.
Moduleglobalcollectoronlyclosedrecords+boundedcounts, neveractiveinvocation/errorrefs. Terminalsnapshotmustproveinitializedprofile/completecapture/nooverflow/pendingeligiblecontexts0; absenceofrecordwithoutqualifiedsnapshotNOTnot_observed.

## Retrieval/selection and SAFE schema

ExtendONLYdiagnosticemittedInitial.budgetSnapshot()return withclosedpostAckDiagnostic; reuseexistingattachBudgetEpochCapture'sQAterminal-owned-before-disposecapture. NoRPC/route/newNativecall. NodeafterEXISTINGunwindselectsQAownedallocation/currentprofile, validatescaptureidentity/freshness/quality/provenance. NoextraRPC/latepoll/secondMF. Missing/stale/foreign/incomplete=>unavailable/invalid, notfallbacktoearlierepoch.
RootselectionchoiceUNIQUEqualifiedeligibleREJECTION, notcollectorarrival/first-by-timestamp. Exactonequalifiedrejection=>observed; zeroWITHqualifiedcompletecapture=>not_observed; multiple/ambiguous/overflow=>invalid. Owninvocationordinalnotowner-referencechild5. Noerror/privateSource/nonceidentifiersoutput.
SAFEresultEXACTkeys:
purpose='afw.native-post-ack-r2.safe.v1';
status observed|not_observed|invalid|unavailable;
context {repository,ref,source,run,attempt:1,case:'R2'} currentexecution;
provenance {status:verified|unavailable,sdkPackage:'@cloudflare/workers-oauth-provider@1.2.1',sdkFileSha256,lockSha256,mGraphSha256,qaGraphSha256,transformSha256,preflightSha256};
selection unique_qualified_rejection|none;
invocationOrdinal;
operation consume|grant|unknown;
ackReturned;postAckEntered;
outcome rejected|unknown;
boundary entry_check|notice_guard|protocol_invariant|pair_wait|expected_mismatch|exit_check|unknown;
quality qualified|incomplete|invalid;
originalR2Outcome passed|failed|unavailable;
custody {status:verified|unavailable,artifactId,zipSha256,observationSha256,reopenVerified};
SAME5flagsoperationalReadiness/completePackage/PCoff/globalNativeDrainVerified/sdkNamespaceEmptyVerifiedALLfalse.
Nullables: allprovenancehashes64lowerhexifverified, otherwiseALLnull; invocationOrdinal1..32observedonlyotherwiseNULL; ackReturned/postAckEnteredTRUEobservedotherwiseNULL; operationconsume/grantobservedotherwiseunknown; outcomerejectedobservedotherwiseunknown; selectionuniqueobservedotherwisenone; boundaryANYenumobserved(includingunknown), otherwiseunknown. observedrequiresqualityqualified+verifiedprovenance+sameerrorctxproof; not_observedrequiresqualityqualified+verifiedprovenance+completequalifiedemptyselection; invalidqualityinvalid/unavailablequalityincompleteallobservationunknowns. originalR2Outcomeindependent, failedcaseCANobserved/not_observed; neverrewritepass.
custodyverified=>positive-decimalartifactIdstring,64hexzip+observationSHA,reopenVerifiedtrue; unavailable=>nullfields/false. ValidDIAGNOSTICacceptancerequiresprovenanceANDcustodyverified; otherwiseinconclusiveevenifobserverfactavailable. observationSHAhashescanonicalclosedobservation/context/provenancePREcustody, avoidingcipherartifactselfreference.
Strictwhole-resultmanifestpurposeafw.native-post-ack-r2-manifest.safe.v1/contextcurrent/files[{path:result.json,bytes,sha256}], exactly2JSON/combined<=65536/rawZIP<=131072/tripleSHA/currentmetadata/CRC/paths/etc independentlyverified. NOerrors/codes/stacks/SQL/grants/tokens/epochs/timestamps/Sourceprivatevalues/freefields.

## Ownership, fresh Native outcome and custody

OnlyexistingownedGitHubSYNresources, oneR2allocation; preservewithFixedBudgetOwnerrelease/restore/callback/terminalcapture/archiveinventory+hash-before-delete/disposeonce/uncertainblocksnextallocation. NodeadapterNEVERexportsWeakMap/error/snapshots. CaptureSAFEevenifcaseassertfailsbeforefull-result; NodeentrytestRETHROWSoriginalR2error afterexistingunwind. Originalassertion/expectedcapnotchangedtopass. NativejobnativeStepfailurepreserved; workflowcontinuescustodyunderalways thenfinalproducerexitmatchesoriginalfailure. IndependentverifiermayvalidatecertificatewhileNativeworkflowFAILS; nevercallthatR2/Native16PASS.
Freshdataset, NOTpreviousOriginalcheckpointreplay/download. Nativeproducer7min/test120s; ensure>=240sverifiedjobheadroomBEFOREMF/I0 (120case+120custody), elseblock/unavailable.Nokey/MF/I0duringcontrols/preflight, nobudgetextension. Existingclocksemanticsunchanged; unknownheadroomblocks, nooffsetcompensation.
ReusesealBudgetArtifact/verifyBudgetArtifactforcompilationprovenanceONLY, notconfusedwithAEADcustody.
AEADexistingsealDirectory/openDirectory purposeafw.finite-checkpoint-custody.syn.v1 withNEWcurrentrepo/ref/source/run/attempt1,kindreadonly-resultifsucceeded/consumer-failureiffailed; privatejob-manifesthasNEWdiagnosticpurpose/cases['R2']/diagnosticOnlytrue, NOTold3Rqualificationmanifest. SealFULLownedNativepayload/logs/storage+closedobservation; uploadONLYenvelope.bin/manifest.json/receipt.json7days; sameassignedartifactreopen+innerobservationSHA+inventoryverifiedINRUNNERONLY.
AFW_SYN_CHECKPOINT_KEY existingafw-finite-syn-checkpoint ONLYkey-preflight/seal/opensteps, NEVERjobenv/Nativeprocess/KEYLESSverifier. No newtoken/secret/permission/CFservice. SAFEbundlepublishedAFTERcustodywithreceiptcurrentcipherArtifactID/digest/observationhash; nootherpublicRawpayload. Root/MCP/localNEVERdownloadcipher/key/plain/privateproducerlogs. KeylessverifieronlySMALLSAFE+encryptedmetadata, noprivateopen. RealR2outcomemetadataandcustodymustagree.
AfterTask2ANYoutcomeSourceallnewWFsmanual/noinputs/nopush/alljobsfalse; originalF7unchanged7false. Fullref/body/report/tree/protected/main/active0STOP. No automaticNative16/retry/recovery/newMF/productiondeployment/subscription/PCoff/Max.

## Exact KEYLESS controls and gates

24fixedIDs:
off_graphs,sdk_pins,profile_scope,sites_exact,sealer_graph,lexical_op,one_shot,nested_scope,late_scope,entry_check,notice_guard,protocol_guard,pair_wait,expected_mismatch,exit_check,unbranded,same_error,observer_throws,same_effects,pair_orders,no_rejection,overflow,schema,provenance.
UseCURRENTtransform/compiler/observer/selector, NOTmirrors. VMfakeNativebindingsonly, MF/I0allocationtrapzero. SAMEerrors/args/receiver/callorder/promise/retentioncounts; nestedslotone-shot+latecrossop; controlledmodelvalid/mismatch; incidentalcanonicalthrowunknown; observerthrowsno-opcannotchangeNative; pairreject/abortbothorderspreserveoriginal+unknownambiguity; zero/multiple/foreign/overflow snapshots; wrongSource/run/attempt/SDK/sites/graph/preflight/stage; SDK/lib/F7tamperingreject.
BaselineOFFvsoriginal408worldSAMEidentity/definesallprepared/emittedM/QAbytes+original3recordsEXACT; ONonly2declaredQAemissions/Munchanged/Node-moduleabsentmetafile.Sealerrejectswrongbaselines/extras/missing/profile.GenericCIeventinventoryverifiesnoautomaticNative.
All24registeredMODULEscopeBEFOREsinglepass; FIXED24-IDexpectedregistry+callback-ownpostassertioncompletiontokens/oncebarrier+missing/skipped/no-opcounterexamples; proofonlyafterall24execute. PreserveboundedrecordAFW_POST_ACK_CONTROLS/1 exactexpected24/completed/pass/fail/inventory/firstFailure +fivefalseflags/nativeExecutedfalse/mfAllocatedfalse/I0Createdfalse, <=2048B; no fakeGreen/unregisterednewtests. Relevantexistinginertobserver/facet/compilercontrolsproportional, no fullNativecases.
StaticbaselineREDonlyallowed; currentGREENmustexecuteGitHubKEYLESS.
Task1exactbriefwillreleaseONEcontractsworkflowpush/attempt1KEYLESS7+2, noenv/key/SDKruntime/MF/I0/native; reportpreexistingKEYLESSCIseparately. Failureallnewgatesfalse/F7protected/fullreads0activeSTOP/norepair. PASScompleteNativeworkflowINACTIVE/reviewableallcode/commands/digests/controls/artifacts/defaultgraphsproof.
Task2separatefreshsoleexecutorONLYafterCLEAN+Rootbrief, ONE NativeR2workflow7+2; reruncurrentidentitypurepreflightbeforeMF; allcodebyteexactapprovedexceptallowedactivationgates/event/runlabel. ThencloseANYoutcomeSTOP. No NativeexecutionauthorityfromthisSPEC.

## Binding preflight rulings — 12 November 2026 (override any ambiguous earlier shorthand)

### Ruling N1 — step binding, no independent same-runner isolation claim

The required guarantee is ABSENCE of AFW_SYN_CHECKPOINT_KEY from the Native command/process environment and from KEYLESS controls/verifier. This same-job pipeline does NOT establish an independent trust boundary against an earlier malicious same-runner process, filesystem modification, or host compromise. Do not call it strict key isolation or infer such a guarantee from step scoping. AEAD and same-ID reopen verify archive integrity/custody under the trusted, reviewed, pinned Source/runner threat model; they do not certify that stronger confidentiality claim.

Exactly THREE steps may receive the existing key: key-preflight (before Native), seal, and same-ID open/readback. No job-level binding, GITHUB_ENV persistence, argument, log, artifact key material, Native-command variable or callback. Each helper terminates; no own background process remains. No separate runner/raw handoff/new service is authorized. Task1 checks these bindings and reports this limitation explicitly; no new isolation-ready flag is introduced. This resolves Important N1 without adding infrastructure or a broader credential scope.

### Ruling N2 — original outcome, failure and unavailable custody

originalR2Outcome is passed/failed ONLY when the exact R2 adapter has positively recorded its original completion/rejection after existing unwind. An exit code, cancellation, absent file, killed command or skipped step alone is NOT proof of R2 failure. Otherwise originalR2Outcome=unavailable, SAFE status=unavailable, quality=incomplete, selection=none, observation fields null/unknown, custody.status=unavailable and all custody receipt fields null/false, irrespective of any partial record.

Known passed maps AEAD kind readonly-result; known failed maps consumer-failure. A skipped/blocked preallocation run has no Native payload and performs no Native sealing; it may emit an unavailable SAFE and must fail/remain inconclusive. If Native started but no qualified original outcome survives, partial payload MAY be quarantined using the EXISTING consumer-failure AEAD kind as a PRODUCER evidence-failure archive, with private diagnostic job-manifest originalR2Outcome=unavailable and diagnosticOnly=true. That kind does NOT assert R2 failure. It cannot yield custody verified or a valid Native certificate; SAFE fields remain unavailable and Source report records only opaque archive metadata and this limitation. No new AEAD kind, raw handoff or public payload is permitted. Interruption that prevents custody is recorded as unknown/lost evidence, never preservation success.

A known passed/failed case with sealing, reopen, digest or independent verifier failure remains evidence failure/inconclusive. Known original failure always keeps producer failure even if certificate verifier succeeds. Known original success may finish green only if provenance, custody and independent SAFE verification all succeed; certificate status invalid/unavailable never qualifies. Final evidence verdict must inspect BOTH producer and verifier. No coercing unknown to failed or failed to passed.

### Ruling N3 — exact observationSha256 bytes and controls

Build a NEW ordinary object in this exact insertion order, copying only validated data:
purpose,status,context,provenance,selection,invocationOrdinal,operation,ackReturned,postAckEntered,outcome,boundary,quality,originalR2Outcome,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified.
Nested context order: repository,ref,source,run,attempt,case.
Nested provenance order: status,sdkPackage,sdkFileSha256,lockSha256,mGraphSha256,qaGraphSha256,transformSha256,preflightSha256.
Validate closed schema first, including ASCII-only strings, current identity, integers/nulls/enums and all five false flags. Observation projection EXCLUDES custody entirely. Hash UTF-8 bytes of JSON.stringify(rebuiltProjection), no indentation, BOM, trailing newline, optional fields, alternate key order or Unicode normalization. It includes originalR2Outcome and current context/provenance. Receiving JSON key order does not affect the rebuilt projection. Do not hash an arbitrary input object's serialization.

Fixed synthetic hash known-answer vector (FORMAT ONLY; not runtime/provenance evidence):
```json
{"purpose":"afw.native-post-ack-r2.safe.v1","status":"observed","context":{"repository":"tokenizartinfo-ops/agent-friendly-web","ref":"refs/heads/feat/finite-native-cleanup-20261101","source":"0000000000000000000000000000000000000000","run":"1","attempt":1,"case":"R2"},"provenance":{"status":"verified","sdkPackage":"@cloudflare/workers-oauth-provider@1.2.1","sdkFileSha256":"0000000000000000000000000000000000000000000000000000000000000000","lockSha256":"0000000000000000000000000000000000000000000000000000000000000000","mGraphSha256":"0000000000000000000000000000000000000000000000000000000000000000","qaGraphSha256":"0000000000000000000000000000000000000000000000000000000000000000","transformSha256":"0000000000000000000000000000000000000000000000000000000000000000","preflightSha256":"0000000000000000000000000000000000000000000000000000000000000000"},"selection":"unique_qualified_rejection","invocationOrdinal":1,"operation":"grant","ackReturned":true,"postAckEntered":true,"outcome":"rejected","boundary":"expected_mismatch","quality":"qualified","originalR2Outcome":"failed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
```
Expected bytes=1221; SHA256=47a77ac116e8d5514defb5fa615de87bf01e16968d30254a8754f389be59a005.
Within existing schema/provenance control IDs, test this exact vector, reordered input yielding identical rebuilt bytes, and changed original outcome/context/provenance yielding mismatch. Test unavailable/blocked/no-outcome and successful-R2/custody-failure logic. No extra control IDs or tests by count inflation.

### Ruling N4 — conservative current job headroom

The 7-minute Native job and >=240-second preallocation headroom remain fixed. Installation plus preflight have at most 180 seconds, less conservative margins. A fresh timer at script/test/preflight entry is insufficient. Bind current job identity/run/source/attempt to the GitHub current job started_at and approved seven-minute timeout, using a single bounded current Actions metadata read with official response Date and elapsed request/observation age. Compute a conservative DEADLINE LOWER BOUND (started_at precision rounded earlier) and NOW UPPER BOUND (official Date precision rounded later plus full request/monotonic observation age, and local wall clock if later); reject contradictory/stale/unknown timing, future start or missing exact job identity. No historical offset compensation. Recompute conservatively immediately before MF/I0, include all already elapsed setup, and block Native as unavailable if headroom is unknown or <240s. A KEYLESS sample is not a Native timing proof. No extra Native allocation or extended timeout follows a blocked gate.

Default OFF baseline and candidate compile comparisons use the same explicit identity/defines, no mutation/spoof of GITHUB_SHA; inability to perform that comparison is an unresolved preflight rather than equivalence. These rulings are binding at Task1 review and Task2 release.

## Binding N5 — model preflight versus actual configured build provenance

Root and independent Astra reviewer confirmed a design defect before Source writes: protected initial-entry harness creates MF at line44, uses actual namespace IDs at49 versus modeled compile-only IDs, then builds M and sets COMMAND9001.created_at/I0 at53 and approval=Date.now()+86400000 at54. Dynamic history, CEILING and virtual sources enter QA at68–75/125–129. Two compilations can differ with identical Source/ref. This N5 OVERRIDES ALL previous full-graph equality or “actual QA validation before I0” language in SPEC, PLAN and brief.

1. Before allocation, current-identity PURE preflight qualifies the pinned SDK/raw source/transform/profile/sites/schema/sealer with modeled compile inputs. All modeled graph hashes must be labeled MODEL ONLY, never asserted as expected actual Native graph hashes. No MF/I0 created; unchanged stable pins and two allowed emissions are enforceable.
2. During the single actual allocation, Node-only compiler context captures the real raw/prepared/emitted inputs, exact defines and output bytes under the legitimate dynamic inputs. Existing World createBudgetCompiler('M'/'QA') plugin onEnd is an allowed seam: validate exact two QA diagnostic emissions, baseline plus supplement, immutable SDK/raw/lib/lock/site counts and Node-module absence on the actual outputs BEFORE QA mounting/setOptions and before the first business invocation. Do not rewrite protected harness on disk or in memory, clocks/deadlines, approval, IDs, histories, source context or mounted bundle.
3. Actual QA onEnd is AFTER original I0 assignment, so all original C0=I0+900000/C1=C0+180000 and test/root/child timing keep counting normally. Never claim actual QA validation occurred before I0. N4 headroom remains checked before MF/I0: current metadata may be obtained earlier and its age conservatively updated synchronously at existing owned record.attachPersist (harness41→MF44 has no intervening await). Attach ownership/persist path BEFORE any gate throw so the existing outer unwind can preserve an owned partial archive. The existing pre-MF path copies/verifies that archive but does NOT prove deletion of its original temporary directory. Unknown headroom blocks; no later timer restart.
4. f.firstConnectionBuild is recorded BEFORE options conversion/setOptions, so equality with onEnd alone proves BUILD equality only. The existing World owner-closure checks (baseline around829 and1180–81) already compare BOTH named workers' retained mounted-option script bytes against firstConnectionBuild. Reuse that proof together with successful mount/harness return, exact current allocation identity and completed existing lifecycle; no extra runtime RPC/request. If any is absent, provenance cannot be verified. Do not call retained options a runtime readback or remote attestation.
5. SAFE provenance mGraphSha256/qaGraphSha256 are hashes of the actual captured build/configured worker bytes, qualified by mounted-options/ownership evidence above. preflightSha256 identifies the current model/transform qualification document, NOT a prediction/equality claim for Native bundles. All SDK/lock/transform/preflight/context pins still required. “verified” is this bounded source/build/configuration provenance under the trusted runner; it is not an independent runtime/remote attestation.
6. KEYLESS off_graphs comparison must feed ORIGINAL408 baseline and candidate OFF the EXACT SAME once-captured prepared/raw/virtual inputs and defines; never compare independently timed harness builds. VM/fake bindings and capture/rebuild are Node-only controls on GitHub, no MF/I0 and no protected-source mutation. Diagnostic actual-build/provenance controls must reject incorrect mount options, role, source/allocation identity, incomplete lifecycle, extra/missing emissions and misuse of model hash as actual. Use existing off_graphs/sealer_graph/provenance IDs, no extra control count or file scope.

No new Native call, Worker emission beyond the fixed two, protected file edit or test budget. Task1 builder remains held until Root issues the revised brief; Native remains separately held until Task1 implementation CLEAN.

## Pre-MF preservation correction

The protected close path at World885–887 verifies an owned partial copy but does not delete the original preassignment directory; the harness delete callback is installed later. Do not claim removed scratch, MF disposal, native drain or namespace emptiness for a blocked attachPersist path. This task does not broaden into changing global cleanup semantics. Preserve the verified copy, record the remaining owned runner scratch as unverified deletion, keep originalR2Outcome unavailable/no Native certificate and all readiness false. GitHub-runner lifetime cleanup is not a verified application cleanup receipt. This corrects documentation only; future cleanup repair would need its own scoped code/test decision.

## Defensive task boundary and sole-writer reassignment

This is ordinary diagnosis of our own pre-existing SYN functional R2 harness. It creates no exploit or new attack input, changes no security guard, authorization, token scope, grant, credential or rejection into success, and targets no external OAuth service. Existing .invalid/synthetic fixtures and explicit SYN HTTP/provider/JWKS maps run only in our own GitHub runner; the proposed diagnostic is passive observation of the same original functional control flow and same errors. Task1 does not execute that R2 or any Miniflare instance; its only execution is inert VM/current-Source compiler/control tests.

A previous implementer declined the future inactive R2 workflow integration, construing it as a reproducer of a security vulnerability. Root independently assessed the actual scope as authorized owned-sandbox functional debugging; no vulnerability exploit, bypass, third-party scan or misuse is requested. That refusal and its useful technical findings are preserved in the ledger, not hidden. If a specific operation would exceed the defensive bounds above, raise it explicitly before mutation; do not fabricate success or implement a forbidden effect. All independent code review and gates remain required.

A fresh standard integration implementer is sole Source writer. All previous actors STOPPED, Source still BASE408, no run consumed. No security control is relaxed by this reassignment; same six paths, same one KEYLESS attempt and Native remains HELD. User scope provenance is quoted in the ledger from this exact AFW chat: latest “continua”, preceding “avanza con todos los bloques y etapas que faltan para AFW este listo para hacer la prueba final en la nube con el ordenador apagado” and explicit authorization for diagnostic SYN trials. The unrelated cwd AGENTS background does not replace AFW with Hermes.

Pre-MF correction: existing outer close copies/verifies the partial archive but does not delete the original directory. Do not broaden into global cleanup repair or claim removal/disposal. That path remains unavailable/inconclusive under N2/N5.
