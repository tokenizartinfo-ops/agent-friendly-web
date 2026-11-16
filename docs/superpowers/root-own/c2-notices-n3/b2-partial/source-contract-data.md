{
  "schema": "afw.c2-notices-n3.early-contract.v1",
  "status": "OUTER_DATA_PENDING_ROOT_SEAL",
  "authority": {
    "brief": "5630c77bcd4130a0f2eae675ea2794d7c9df5b83",
    "spec": "6e33289827f12d7abc9f3b983e06c5f28b9f7432",
    "initialSpec": "798d4d4d1daaff6e6cddc0b4f5f78661bbaeece0",
    "bindingRuling": "5e14dbd44184611354d732690b1b7fb6d49fd9e4",
    "plan": "dd921c1daec574726c1d261f87897eb7c595e486",
    "rootSeal": "8a9d366868d4be5593866637417c356bf4783e1d",
    "semanticRuling": "9a31eef41d4e4a093f78aba636393cee0f3f50b0",
    "abortMatrix": "8b791e3431faf44be717e534afc11cad73692bbe",
    "prefixRuling": "d2831f0c1e3482550043413f60560d19be2eb4af"
  },
  "interface": "makeN3QaLedger():{note(rootRef:object|null,event):void,snapshot():SafeSnapshot}; n3QaLedger singleton resolved by one canonical QA module path test/fixtures/n3-qa-causal-ledger.mjs. note synchronous/nonthrowing/noRPC/no clocks; snapshot synchronous copied DATA, noauthorityread.",
  "privateDTO": {
    "binding": {
      "keys": [
        "type",
        "entity",
        "leaseRef",
        "promiseRef",
        "entityRef",
        "parentRef",
        "callRef",
        "role"
      ],
      "type": "bind",
      "entity": "scope|lease|promise|call",
      "notes": "Actualobjectrefs ornull ONLY. Scope explicitroot+originalouter registered from captured root/clock objects. Selectedeligibility original validated notices POST afterPH662. Helper newchild can resolve root through existing parentlease in leaseRef, and bind actual child entityRef parentRef; newpromise can resolve viaalreadyboundlease, entityRefactualp/callRef capturedoriginaloptions. Never rootresolvebycallRef/function/Error/string/ordinal alone. Private other-child role allowed pending exactactivationmarker; public only declaredrole."
    },
    "observation": {
      "keys": [
        "type",
        "kind",
        "site",
        "leaseRef",
        "promiseRef",
        "entityRef",
        "errorPresent",
        "errorRef",
        "cause"
      ],
      "type": "event",
      "kind": "fixed publicvocabulary",
      "errorPresent": "Explicitboolean, never Errortruthiness. errorRef opaque originalthrownobjectorprimitive, never readname/message/stack/value.",
      "cause": "explicit-finish|parent-abort|finally|unknown|null",
      "entityRef": "Actual affected leaseor null, NEVER independent rootresolver. Root resolves ONLY explicitroot or SAME alreadyboundleaseRef/promiseRef. ConflicttoanotherRoot ambiguous. An outoffocus affectedentity mayexportlease:null; firstscopeerror preserved and all retained identity/gapmetadata counts caps."
    },
    "nullRoot": "Only SAME alreadyboundactualleaseRef and/orpromiseRef resolve. Bothrefs differentroot/sharedpromisecrossroot ->ambiguous permanently; never firstassociation. Beforebinding staysunjoined; boundedperrefgapmetadata counts caps and later relevantgap preventscomplete; no retroactiveeventinsertion. No usableactualrefs ->no laterroot bytime.",
    "focus": "root,outer,activation,targetpair + targetpairchild with earliest RECORDEDcheck-threw; ifnone,firstobservedactualchild. SourceSequence totally orders ties, duplicate sequenceinvalid. Scope FIRSTRECORDEDlogicalerror independent of focus; preserve event/erroridentity or explicitunjoinedlease reference ifoutsidefocus. Primitivecontents/equality neveridentity. Root-scoped WeakMaps only.",
    "scopeUncertainty": "No join acrosssnapshots/realms/restarts/M. Sameordinals in two freshfactories areindependent; a publicsnapshot cannot authenticate privateobjectidentity itself. Knownproducer/nativehelper tests are proofboundary. A coherently relabelled entire publicgraph may be indistinguishable; do not claim absolute authentication.",
    "promiseSemantics": {
      "publicLease": "Canonical bound WORKscope, not actual retainer or physical ownership. retained/settlement-observed publicevent lease equals promise canonical workScope. Rootless event leaseRef can be captured parentclock lease; it resolves sameactualroot, never rewrites workscope.",
      "repeated": "First retained and first settlement observation immutable. Original repeated retain and original callbacks legitimate and folded; no extra reaction introduced, no double public settlement. Each original delete return true/false preserved exactly.",
      "binding": "Only explicit original-worksite binding establishes canonical workscope. Unknown binding→prefix/unjoined, never guess child from parent or ordinal. One p across differentactualroots→ambiguous.",
      "state": "joined needs one eligible scope AND usable unambiguous projection. eligible1 with unjoined fault/cap is valid; bindingambiguous can have eligible1 with another noneligible root.",
      "error": "kindobject is an opaque identity-tracked nonnull object OR function reference after root resolution. Every primitive type incl null/undefined has no identityordinal/content; functions never resolve a root.",
      "ordering": "Original OP abort observation is after controller.abort and nested listeners; root-abort publicnote need not precede parent-abort/close. Source order is observation order."
    }
  },
  "publicShape": {
    "snapshotOrder": [
      "schema",
      "state",
      "coverage",
      "reason",
      "eligible",
      "target",
      "focus",
      "leases",
      "promises",
      "errors",
      "events",
      "firstError",
      "cut"
    ],
    "focusOrder": [
      "mode",
      "pairChild",
      "selection"
    ],
    "leaseOrder": [
      "ordinal",
      "role",
      "parent",
      "firstClose"
    ],
    "promiseOrder": [
      "ordinal",
      "lease",
      "retained",
      "settlement"
    ],
    "errorTableOrder": [
      "ordinal",
      "first"
    ],
    "eventOrder": [
      "sequence",
      "kind",
      "site",
      "lease",
      "promise",
      "error",
      "cause"
    ],
    "errorOrder": [
      "present",
      "kind",
      "errorOrdinal"
    ],
    "recordOrder": [
      "sequence",
      "elapsedMs",
      "kind",
      "schema",
      "snapshot"
    ],
    "summaryOrder": [
      "state",
      "coverage",
      "reason",
      "target",
      "firstError",
      "focusChild",
      "events",
      "settlementsObserved",
      "interpretation"
    ],
    "record": "ONE causal record in existing journal, AFTER the afterprobe's snapshot acquisition, before NOTICES countenter. Record6144B includesouterenvelope/UTF8LF; fullsnapshot appears ONLY in witnessrecord, observation.causal is smallsummary. BEFOREsnapshot ignored, neverstitched.",
    "states": "Joined requires exactly one eligible actual scope AND a usable unambiguous projection. One eligible is NOT sufficient. eligible1+unjoined fault/cap is valid; AMBIGUOUS_BINDING can eligible1 when conflicting tracked root is noneligible. Multiple eligible roots remain ambiguous/MULTIPLE_ELIGIBLE. Fault/cap unknown snapshots have empty tables/events/nullcut; never choose first root.",
    "coverage": "Complete means declaredfocus throughcut only. Boundpaircomplete requires exactobserveOwnerPhasePair CALL-RETURNEDpromise firstretain/settlement andpairfirstclose/finally. Internalrunpromise excluded. Otherpromisehandlerobservationsandallancestorclosures notmandatory; missing meansunobserved, notpending/open/drained. Fullyobservedtargetthrowbeforepair-enter cancompletewithoutpair. Pair-enterunboundprefix/unknownUNBOUND. Targetunreached canretainobservedactivationwork; it is notabsenceofprioractivation.",
    "sourceOrder": "Source event.sequence1..4096 increasing unique, mayhavegaps from nonfocusedroutineevents. Tableslocalcontiguousordinal1..limits; parent acyclic and exactroot->outer->activation / root->pair->child fork. firstError points earliest presentthroweventinselectedscope, preserved evenoutsidefocus lease:null. Error table firsteventimmutable, onlyobjectkind getsordinal.",
    "replay": "Only exact FIRSTpostreceipt targetsitepostreceipt-check. One targetenter and atmostone targetreturn/throw. Pairenter aftertargetenter, parentroot. Promise .lease is canonical bound WORKscope, NOT captured actual retainer/physical ownership. retained/settlement-observed events use canonical workscope. Rootless captured parentlease+p resolve root only. Repeated original retain and original settled callbacks legitimate; public first retained/settlement facts immutable, no duplicate or owner drift. Unknown canonical binding prefix/unjoined, never infer actualretainer=child. Absence =unobserved. Close-call repeats allowed; atmostoneclosed-transitionperlease; firstClose pointsthatfirsttransition andneveroverwritten. Sharedabort causeunknown; no timer/racewinner field. Last selectedevent snapshot-cut atcut, noeventaftercut. Shape/semantic/canonical violationsreject, notdegradeforgeddata tovalidunknown.",
    "mandatory": "Include all relevantOBSERVED ancestorabort/firstclose andfirstscopeerror independentlyoffocus; neverinfermissingclosure. Publicroles singularroot/outer/activation/targetpair/selectedchild. Boundtargetpaircomplete requirescanonical exactcall-returnedp retained/settled +actualpairfirstclose. Pairenteredunboundexplicitprefix/unknown; prepairthrow maycomplete. Unknowncapacity/gaps neverquietlygreenrecut. Incompleteprojection exception d283 allows optionalroutine omission ONLYprefixPROJECTION_GAP; otherwise mandatoryasabove.",
    "unknowns": "Mjoin,rootsharedaborttrigger,exactracewinner,initiatingcause,historicalnormalbehaviour allunknown. Sourcefirstrecordederror is notfirstphysical/globalerror.",
    "abortOrdering": "OP note follows actual controller.abort; original nested listeners may emit parent-abort close before root-abort note. Receiver MUST allow that order. No initiating trigger, timer or exact racewinner inference.",
    "errorReference": "error.kind object means opaque identity-tracked nonnull object OR function; do not read Error properties. All primitives have presenttrue/kindprimitive/errorOrdinalnull, no value/equality identity. Functions never resolve roots.",
    "abortMatrix": "Exact matrix8b791e...: rootabortunknown postcontroller.abort; initialstopouter/pairunknownpostabort; childsharedabortinitial-child/unknownpostc.abort; childfinallyONLYchild-finally/finally. Pair/outerparentabortmarkerparent-abortAFTERclock.close/nestednotes; noextra closecall. Complete parentmarker requires earlier sameclockclosedtransition, explicitdeficitprefixmayremainunknown. rootfinish/root/explicitfinish only; factorycloseouter/pair/unknown only.",
    "boundedProjection": {
      "authority": "d2831f0c1e3482550043413f60560d19be2eb4af",
      "selection": "Choose actualfocus/FIRSTscopeerror over fullboundedprivateledger BEFORE pruning; neverchangefocus tofit.",
      "mandatory": [
        "first scope/target/pair markers; observed targetend/firstlogicalend",
        "FIRSTscopeerror; earliestfocusedcheck; exactaliases andfirstobjecterror references",
        "exactselectedpair CALL-RETURNEDp firstretained/settlement",
        "firstclosedtransition+firstclosecall forroot/outer/pair",
        "firstabort foractualsite/lease/cause",
        "atleastoneactualselectedchild event",
        "snapshot-cut"
      ],
      "order": [
        "omitnonpairpromise rows/events",
        "omitrepeatclose-call/repeatabort observations",
        "omitsecondarychecks exceptfirstscopeerror/earliestfocusedcheck",
        "omitchild-finally only ifstillneeded"
      ],
      "classification": "ANY observedomission→joined/prefix/PROJECTION_GAP, nevercomplete. Closeall refs/tables, preserve originalsequence andactualidentityalias. Ifmandatory+cut>24 orcanonicalrecord+LF>6144, unknown/unjoinedCAP_SNAPSHOT. No capraise, no captureC knownunabletorepresenttargetpath.",
      "evidence": "Literal31→24 andlateleaf variants BEFOREreducercode; actualoriginalcallbacks/unitcounts cloudmustproveactual result, not atextsimulationPASS."
    }
  },
  "N3Wire": {
    "markers": [
      "AFW_C2_NOTICES_N3_SYNTHETIC",
      "AFW_C2_DEPENDENCY_CONTROL",
      "AFW_C2_NOTICES_N3_CUSTODY",
      "AFW_C2_NOTICES_N3_OUTCOME"
    ],
    "fatal": "AFW_C2_NOTICES_N3_FRONTIER; anyfataldisqualifies successfulcapture",
    "syntax": "marker + ASCIIspace + canonicalJSON.stringify + LF; noTAP/rawError/privatepayload forwarding.",
    "core": "Carry exactN2native/count/blocked/HTTP/body/probe/custody/canonical/ZIP/API checks with reader280fa796 settlementbaseline+beforeguard. NewN3 context/job/schema/frame identities, nevernormalizeN2occurrence.",
    "binding": "context.proposalIndexHash remains frozen normal13hash. N3bindings.producerManifestHash SHA256(rawUTF8canonicalstaticmanifest). Manifest includes normalSourceIndexHash/selectionHash/contractHash/schemaHash/seamsHash/vectorsHash/driverHash/coupledHash/worldHash/helperHash/readerHash/loggerHash/slotHash/ledgerHash/transformHash; excludes runner/WF/index to avoidcircularity. Final index bindsmanifest+runner+WF. Caller Rootbindsactualhead/tree/run/job/attempt/API/knownproducer.",
    "compilation": {
      "M": "{bytes,sha256,argumentMatched:true}: current original M build/captured bytes compared to actual same original call arguments, never previousrun prediction.",
      "QA": "{bytes,sha256,deliberatelyChanged:true,inputManifestHash,inputs:[{id,before,after}]}. Five orderedids ledger,PH,OP,LEASE,STDIN; desc {bytes,sha256}; ledger.before=null (newmodule); other before are actual prepared QA inputs in same original build BEFORE N3 transform. InputManifestHash=SHA256(JSON.stringify(inputs) UTF8), noLF. ActualQA script bytes/hash are new; no extra normal compile/equalityclaim."
    },
    "coreEnvelopePending": "FullouterDTO defined additively by outerOrder/bindingorders and fullouter schema artifact. Executable bodies/finalproducerManifest bodyhashes still pending, so this is a protocol subpackage ONLY until Rootseal; no API/native/capture gate from drafts.",
    "outerOrder": [
      "schema",
      "context",
      "selectionHash",
      "bindings",
      "controls",
      "capture",
      "journal",
      "observation",
      "native",
      "custody",
      "compilation",
      "diagnosticToolingExecuted",
      "sourceBusinessExecuted",
      "SourceQualified",
      "Task1Pass",
      "nonclaims"
    ],
    "outcomeBindingOrder": [
      "driverHash",
      "helperHash",
      "readerHash",
      "slotHash",
      "fixtureHash",
      "vectorsHash",
      "loggerHash",
      "worldHash",
      "ledgerHash",
      "transformHash",
      "producerManifestHash"
    ],
    "journalBindingOrder": [
      "sourceIndexHash",
      "driverHash",
      "selectionHash",
      "helperHash",
      "readerHash",
      "slotHash",
      "loggerHash",
      "worldHash",
      "ledgerHash",
      "transformHash",
      "producerManifestHash"
    ],
    "controlsOrder": [
      "accepted",
      "rejected",
      "probeChecks",
      "roundtrips",
      "witnessRejected",
      "slotChecks",
      "guardAccepted",
      "guardRejected",
      "guardTransitions",
      "invarianceChecks",
      "guardRecordRejected",
      "vectorsHash",
      "causal"
    ],
    "controlsCausal": {
      "accepted": 31,
      "rejected": 32
    },
    "causalPlacement": "EnteredNOTICES: one afterProbe, then ONE causalrecord before countenter. BlockedNOTICES: no extra probe/causalrecord; summaryunjoined/PROBE_UNAVAILABLE. Honesttimeoutprefix maystop earlier. Any supplied malformed snapshot or record rejected CAUSAL_INVALID, not normalized to green. Actualunavailable/fault observation mayemit correctlytypedunknown snapshot; all Sourcefalse.",
    "runtimeLabels": "Actual captureC diagnosticToolingExecuted:true/sourceBusinessExecuted:true means only this isolated synthetic native Sourcebusinessworld. Native tool-onlyA proof labels diagnosticToolingExecuted:true/sourceBusinessExecuted:false. Neither operationalrealCF/PCoff/Task1PASS.",
    "manifestKeyOrder": [
      "schema",
      "normalSourceIndexHash",
      "selectionHash",
      "contractHash",
      "schemaHash",
      "seamsHash",
      "vectorsHash",
      "driverHash",
      "coupledHash",
      "worldHash",
      "helperHash",
      "readerHash",
      "loggerHash",
      "slotHash",
      "ledgerHash",
      "transformHash"
    ],
    "manifestSerialization": "SHA256(JSON.stringify(manifest) UTF8), noLF. contractHash binds this final fulloutercontract. schemaHash binds fullouterJSONschema; Rootseal/semantic/abort authorities named here and finalindex. Allbodyhashes exact rawUTF8. Finalindex additionally binds all controls/native fixtures/runner/WF/transitiveinputfiles not enumerated in this fixedmanifest; Root exacttreegate authenticates fulladmittedset. No placeholders accepted."
  },
  "limits": {
    "snapshotRecordBytes": 6144,
    "selectedLeases": 8,
    "selectedPromises": 4,
    "selectedErrors": 4,
    "selectedEvents": 24,
    "sourceSequence": 4096,
    "privateScopes": 16,
    "privateLeases": 128,
    "privatePromises": 64,
    "privateErrors": 64,
    "privateEvents": 256,
    "privateMetadataBytes": 65536,
    "probeBytes": 131072,
    "probeObservations": 2048,
    "probeCalls": 32,
    "probeBusiness": 64,
    "journalBytes": 32768,
    "journalRecords": 128,
    "outcomeBytes": 24576,
    "guardRecords": 8,
    "totalMs": 330000,
    "childMs": 180000,
    "caseMs": 120000,
    "jobMinutes": 7,
    "incomingMs": 30000,
    "childLeaseMs": 5000,
    "toolingJobMinutes": 3,
    "toolingCaseMs": 10000
  },
  "tests": "Literal31positive/32negative causal snapshots,32 actualhelper/seamcallbackunitplans BEFORE their corresponding code amendments. All native testsPENDING_ROOT_CLOUD. Core+8guard/journal/outcome worstsize remains finalnativecoverage, no SourcePASS claim. Root sealed causal subprotocol; fullouterenvelope pendingseal.",
  "SourceQualified": false,
  "Task1Pass": false,
  "nonclaims": {
    "historicalCauseProven": false,
    "receiptAuthenticated": false,
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false,
    "globalNativeDrainVerified": false,
    "sdkNamespaceEmptyVerified": false
  },
  "independentProgressAxes": "53b1c35d692fabcef1a1614e33edc8f794aa3cf0",
  "axisRule": "Target markers are inside SAME retained activation async callback around FIRST receipt-recorded await; logical coordinator terminal, target await terminal and exact pair-returned promise settlement are independent observations. Logical throw may precede late target terminal; unreached may retain activation work. First scope error remains immutable. Dedicated axis controls separate from fixed31/32 corpus.",
  "bindingImplementation": "Explicit captured originalLease binds outer clock immediately after existing creation, before eligibility; scope-enter/eligibility remains ONLY validated admitted notices POST. Other-pair records before eligibility are not selected or stored; no retrospective event replay. For target call-returned p, SAME existing PH703 callback extracts its original options literal, binds actual options callRef, calls original async observeOwnerPhasePair, then binds its exact returned p using explicit originalLease and same callRef to the already-bound target-pair lease. No extra read/callback/reaction/await or internal run-p substitution."
}
