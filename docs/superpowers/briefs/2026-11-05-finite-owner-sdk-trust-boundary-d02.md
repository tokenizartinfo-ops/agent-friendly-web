# D0.2 — QA actual SDK and owned lexical recheck

5 November2026. SOURCE ACTIVE only in containingcommit; accepted D0.1 at04e8bb0f77cb78b27c219b9fd703641018e8df12, independentlyreviewed with143PASS+compiler1PASS. Root supplies containingcommit as actual executionBASE. ProjectAFW/repo tokenizartinfo-ops/agent-friendly-web(1347578006); branchfeat/finite-native-cleanup-20261101, sole productwriter. Readthisfirst; it is yourrequirements. Main spec docs/superpowers/specs/2026-11-04-finite-owner-sdk-trust-boundary.md plus owned-recheck supplement govern. D0.3tokencompat/newnoticeSQL/fullmount/actualaliasaccess remainINACTIVE.

## Global constraints copied from accepted plan

## Global constraints

- Product inspection BASE220b5bc323315b7f107967548fb8958c0f8234f2; root supplies accepted phase-context implementation BASE for execution. Do not follow the advancing product writer.
- ONE proposed QA binding: AFW_FINITE_OWNER_OAUTH_KV→existing6b94ff702e504e14a7730cee73a0f6ff; this is namespace-wide QA read/write access. No exclusive-holder/per-key-ACL claim.
- M physical bindings unchanged; revised qaLive adds one alias; historical qaClosed/c570, M2607 and QA_CLOUD_CLOSED_PINS unchanged. No old/new profile fallback or accepted flag/date change.
- Original capsule/material/bootstrap must bind revised Q BEFORE the one reserved Entry. No retrofitting a sealed occurrence, replacement Entry or clock reset.
- Original I0/C0/C1, technicalI0+300000, parent<=30s, child<=5s, commandBy-510000, nominal/launch clocks preserved. Untrusted metadata may narrow; not authenticate/widen.
- Actual SDK and original fence/consumption witnesses stay lexical in QA. No result DTO/registration/callback attestation or ordinary unfenced granting fallback.
- All current app observations use a new first-primary session with SELECT first and the original reserved UUID. No owner/client scans, SDK list/sweep/purge/client registration.
- No product public/private mount, provider publication, binding installation, credentials, API-token reuse, remote DDL, browser, local clone/build/tests or other-project action.
- Source ceiling2026-11-03T02:59:00Z expired. Fixture-only ceiling substitution is disclosed SYN evidence; SQLite clock remains native.
- operationalReadiness=false; completePackage=false; PCoff=false.



## Task contract

## Task D0.2 — Actual SDK + original issuer in one QA invocation

Starts only after D0.1 and the accepted first-phase reader. This replaces the old inactive Task A wire protocol; notice SQL remains a later task.

**Create:**
- lib/mcp-qa-finite-owner-oauth-forward.mjs — M fixed forwarding only.
- lib/mcp-qa-finite-owner-oauth-wire.mjs — strict one-path original-request grammar.
- lib/mcp-qa-finite-owner-oauth-qa.mjs — unmounted QA receiver, real SDK/env capture, independent original verifier, actual Unit2a sequence and local result records.
- lib/mcp-qa-finite-owner-issuer-provenance-records.mjs and lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs — bounded original journal (not present at inspection; implement only the revised local semantics).
- lib/mcp-qa-finite-owner-approved-ticket-facts.mjs — pure shared ticket/preconnection/approval predicates if still absent.
- test/mcp-qa-finite-owner-qa-sdk-native.test.mjs
- test/fixtures/finite-owner-qa-sdk.mjs

**Modify only after first-phase dependency acceptance:**
- lib/mcp-qa-finite-owner-phase-context.mjs — invoke qualifyFiniteOwnerSdkBindingFacts inside its private primary observation on actual QA metadata/qualified M configuration at both repeated observations; alias holder checks and actual local SDK journal inventory. Preserve public DTO shape; no credential/capability export.
- lib/mcp-qa-finite-owner-preparation.mjs — pure approved-ticket predicate extraction, preserving existing unavailable source/linkers and GET-only private continuation.
- test/fixtures/finite-initial-entry-world.mjs — minimal reuse of genuine source/journal APIs and isolated test entry; no ready DTO or positive source alias.

Do not edit production Worker/DO entrypoints, pending-only bridge/receiver, ordinary delegated-oauth-worker/store, Unit2a store/fence schema, actual cleanup alarm or provider writer. The separate full mounting gate later replaces finite authorization fallback; this task's product routes remain closed.

**Interfaces:**
- forwardPrivateFiniteOwnerOAuth({request,env,ctx},originalLease) -> Promise<Response>.
- createPrivateQaFiniteOwnerOAuthReceiver({ctx,env}) -> frozen {fetch(request):Promise<Response>}.
- handlePrivateQaFiniteOwnerOAuth({request,env,ctx},originalLease) -> Promise<Response>, called only lexically in QA receiver.
- Existing actual source reader, original issuer journal/store and retained child/request helpers are consumed unchanged.
- All result records use seal/encode/decodeFiniteOwnerIssuerProvenanceRecord(kind,input) and createFiniteOwnerIssuerProvenanceJournal({ctx,env}); durable journal methods take DATA, not a caller result proof.

**Local record contract:** retain original Root, SdkSend and ExpectedGrant fields from the prior spec. Replace SdkAck(report) with SdkObserved {purpose,sendHash,resultHash,observedAt,outcome:'resolved',recordHash}, keyed <sdk operation>:observed. Fixed domain afw.finite-owner-sdk-observed.v1; strict canonical own data<=16384bytes. Only private QA code after awaiting its captured actual SDK Promise creates these records. No HTTP/RPC method accepts them. SdkSend is an intended call, not proof of dispatch; SdkObserved reports that exact local call's result, not global KV propagation/token visibility/drain. Same original bounds/maximum8 records before notices; unknown/extra/orphan/wrong operation denies. SDK operation duplicates never invoke SDK again, including a restart with an unresolved SEND.

- [ ] **Step 1 — Write local-result/wire RED.** Strict native path /_finite-owner/authorize only, original GET/POST /authorize, body<=16384, private metadata overwrite, fixed origin and exact allowed query/form/header shapes. Former sdk-begin/sdk-approve/read-grant/sdk-complete/sdk-completed/report payloads deny before I/O. Source helper absence/behavior is causal RED.
- [ ] **Step 2 — Write native real-code RED.** Two actual native workers use one shared synthetic KV namespace: M.OAUTH_KV and QA.AFW_FINITE_OWNER_OAUTH_KV map to that same fixture namespace; QA uses original native DO/RELEASE_DB. Invoke actual SDK1.2.1, actual original source/record/store functions. Existing native fixtures' source substitutions are not a valid positive source. Label only external Access/provider/custody/material/ceiling test inputs SYN. Seed client registry only in isolated fixture, never invoke product registration.
- [ ] **Step 3 — Run cloud RED.** `node --test test/mcp-qa-finite-owner-qa-sdk-native.test.mjs`. Native test must actually enter the intended source path and fail for missing QA SDK/issuer behavior, not because assertions read prefilled grants.
- [ ] **Step 4 — Implement lexical QA SDK holder capture.** Capture actual env.AFW_FINITE_OWNER_OAUTH_KV and get/put/delete/list functions, actor/storage/version/DB/retention holders, exact source metadata mapping; check before/after every application-controlled await. The SDK's own internal KV awaits are not newly fenced or cancellable; retain its whole actual promise and preserve opaque late-write uncertainty. Construct only fixed OAuthAuthorizationServer options and minimal SDK env {OAUTH_KV:capturedAlias}. No callbacks/SDK/env supplied over transport and no public SDK server.fetch in QA.
- [ ] **Step 5 — Implement one-invocation GET.** Actual SDK parse/describe/begin with durable original claim; original Unit2a reservation/open/authorization+ACK/readback/link before form. No returned success on failed source/consent/current owner/SDK/journal/SQL. No repeat begin after unknown ACK.
- [ ] **Step 6 — Implement one-invocation POST.** Actual original owner/form/ticket checks→one-use local approve claim→actual SDK approve→ExpectedGrant→same-store/same-child genuine consume/grant→actual grant/link→actual SDK complete/revokeExistingGrants:false→local result/response. Original scopes/props exact. Every SQL current observation fresh SELECT-first; no new grant ID, ordinary store fallback or SDK result supplied by M.
- [ ] **Step 7 — Implement M forwarder/QA receiver fixture only.** One native request/response; no six-path result protocol. Use original bounded bytes, signal and accepted clipped lifetime. Preserve actual SDK Set-Cookie/redirect transiently in bounded response after original guards; no log/durable code. No product fetch mount or readiness switch.
- [ ] **Step 8 — Run focused native GREEN with all causal cases below.** Retain failed earlier heads and actual run/job/attempt/commands/counts. No fixture authority replacement or reinterpretation of complete bearer replay as a denial.

Required cases:
1. **Actual GET then POST:** real SDK transaction in shared KV, exact original authorization hash/reserved app UUID, actual returned consumption witness, one app grant and actual SDK grant/code with original props. Assert complete called only after actual app grant ACK.
2. **Forged old result path, before first success:** same mVersionId/requestId/body/source metadata and valid owner identity at /read-grant or /sdk-completed yields unavailable and no SDK/journal/D1 effect. These paths must not exist.
3. **Real approve held:** hold actual KV read/delete used by QA SDK. Inject fabricated result fields/direct old path plus another request. No grant/completion until actual SDK succeeds; another request cannot borrow live request occupancy or original claim.
4. **Real complete held:** hold actual KV put; forged sdk-completed cannot append local SdkObserved, return code, advance phase or clear retained promise. After deadline eventual settlement cannot extend effects or append late ACK.
5. **Bearer limits separated:** copied public metadata/form with invalid/missing actual SDK cookie/state denies. Byte-identical full valid owner+SDK credentials racing first submission may win, but must invoke real SDK and yield at most one original consume/grant/complete. Assert this limit explicitly, no human-presence or M-identity claim.
6. **Replay/restart:** durable SEND/unknown ACK followed by new request/recreated actor cannot resume SDK work or reconstruct Unit2a witness. Already completed replay creates zero additional grant/code and cannot revoke the winner.
7. **Original lifetime:** elapsed29s leaves<=1s, native abort, C0/consent/grant/owner expiry, method/holder drift and retained body/cancel/SDK promises; no child/parent renewal, no first-primary reuse claim. SQL real execution time rejects queued stale writes.
8. **KV consistency:** simulate exact native call returning miss/error/stale transaction to actual SDK; no substitute provider/source/approval. Unavailable outcome creates no new attempt. Duplicate KV-visible transaction still cannot duplicate D1 grant. A missing acknowledged code on M is not repaired/reissued.
9. **Original mapping:** wrong QA alias namespace, missing binding, same-shaped holder replacement, changed actual QA/M profile or old capsule denies before SDK/app writes. Test extra alias/other same-account binding input does not imply trust.
10. **History preservation:** no SDK list/purge/createClient, no other grant/token mutation, original historical D1 rows unchanged. Local resolved SDK result distinguishes result from global KV visibility.

- [ ] **Step 9 — Scoped regressions and exact source graph.** Run new native suite plus affected original issuer, context, conduit/retention and setup-facts pending suites. Scoped lint. The unmounted component fixture's compiled graph is recorded separately; standard product bundle still lacks a positive mount. Exact final mounted SDK graph/QA3MiB budget must be qualified later at full mount gate, not inferred from test compilation.
- [ ] **Step 10 — CAS source checkpoint and root review.** Rewrite prior Task A spec/interface on accepted branch to selected QA-local design, remove report endpoints, record exact access proposal and retained limits. This is source acceptance only; A/B activation/integration is root's decision.



## Integrated amendment — mandatory, not a second task

Read docs/superpowers/specs/2026-11-04-finite-owner-sdk-owned-recheck.md and its samebasename plan. SAMEphase-context module owns one private observeOwnerPhasePair engine and strictqualifySettledOwnerPair, unchanged readPrivateQaFiniteOwnerContextDTO plus fixedhandlePrivateQaFiniteOwnerOAuth. oauth-qa holdsreceiver only. nestedzeroargrecheckOwned captures actual request/root/store/SDKPromise/result/childwitness/exactfreshappendledger/programposition. No crossmoduleframeexport/injectedsource/verifier/callback/mode/allowPending/actorregistry/row-reconstructedownership. Newrequest mustpassstrictsettledbaseline. Observe one genuine request scope viaexistingobserveFiniteOwnerRequestWork; factualsourceborrowssameambientlineage, no stage-work APIchange. Commonguards/receiptqualification onbothsnapshots, currentprimarySELECTfirst/originalUUID/holders/nativeclocks unchanged. SDKactualpromise retainedtosettlement; lateSDKsettlementcannotACK/progress/response. Same-store/samechild<=5s consumptionwitness untilinsertReadGrant; noreadbasedreconstruction/newchildrenewal. Pureframehasnoholders, witness, SDKcookies/code/token orpendingPromise and isneverstored/transmitted.

## Root exact local record contract (extract only; old report protocol superseded)

Prefix afw.finite-owner-issuer-provenance.v1:<originalA>:. Strict canonicalownDATA/domain-separatedSHA256, no extras/accessors/symbols/prototypes; eachrecord<=16384bytes; SDKinventorymaximum8 before notices(read9), boundedoriginalprefixonly; storage transaction/sync/exactreadback. Keys:root; sdk_begin:send/observed; sdk_approve:send/observed; sdk_complete:send/observed; grant. Eachrecordpurpose,recordHash plus:
- Root: preconnectionId,capsuleHash,enrollmentHash,sourceRevision,actorId,qaVersionId,mVersionId,originalConnectionReceiptHash,I0,C0,C1,createdAt.
- SdkSend: rootHash,operation,originalRequestId,originalRequestHash,issuedAt,deadline,bindingHash (authrequesthashforbegin, originalauthorizationHashforapprove,expectedGrantHashforcomplete).
- SdkObserved: sendHash,resultHash,observedAt,outcome:'resolved'; fixed domain afw.finite-owner-sdk-observed.v1. ONLYactualcapturedQAresultafterawaitcreatesrecord; no requestacceptsrecord/report. ObservedAt>=send.issuedAt and<send.deadline.
- ExpectedGrant: rootHash,identityHash,reservationHash,authorizationHash,grantId,approvedRequestHash,scopes,createdAt,expiresAt.
Root/sendrecorddoesnotproveactualdispatch or permission. No SdkAck(reported), noticeTicket, reportendpoint orgenericappend(payloadFromM). CanonicalSDKrequesthashcontainsboundedclient/redirect/resource/PKCE/scopes/state but rawpayload/handle/cookie/code/token/encryptedprops/rawredirectneverdurable/logged. RequestIdserverUUID; anyoriginalhandleHash43charbase64url32randombytes isHASHcommitmentnotpermission. OriginalUnit2aIdentity/Reservationareauthorityinputs; noextraappUUID.

## Root preflight rulings — binding

1. Implementation integrates whole D0.2, not disconnectedobservationrefactor. Existingphaseengineisnow~34.5kchars, keepONEphysicalobservationengine; no cloned279lineengine. Extractcommonfactsandstrictsettlement privatelywithinnamespecifiedmodule. No sourcecontractwidening. FullDTOstillfrozen3keys.
2. qaMetadata/mMetadata bindingfactsisnarrowstrictDATA, notphaseauth. Mpreporiginal/currentclosed/readconfig mustindependentlyqualifythroughactualfactualsource. ExactQAalias/mapping/profilelineageD0.1 alreadyaccepted; no furtherprofile/bindingchanges.
3. NativeRED wordingconflict: baselinehasnoSDKhandler/journal. Do not invent a preexistingSDKprefix rejection or claim an absentmodule/fixturebooterror is a causalnativeRED. First wire/record/helper RED may prove missingfunctionality. Then demonstrateactualSDK+source behavior at genuinependingprefix as soonasminimalnativecompositionexists; preservecausaltest/diff/state andlabelwhichbehaviorfails, before implementingownedcontinuation. Requiredfinalnativepositiveusesactualsource/SDK/Unit2a, no readyDTO/prefilledgrant/substitutedpositives. No separateinterimacceptance/disconnectedtask.
4. Actualbegin canstartBEFOREissuerreservation; heldbeginwithnoIdentityhasno claimedterminalissuerfence. It retainsuncertainty; latebegin cannotreserve/form/grant. Do not extendopaqueSDKrestorationruling.
5. Pureapprovedticketextractiononlyifstillabsent at actualBASE. Reuseexistingstage/enrollmentfacts and exactoriginalauthorization/grantlinklogic. No ordinarydelegategrantfallback or modifyingUnit2a store/journal/schema. Needconcretecouplingchange? stopandaskROOTwithexactpath/failure/smallestproposalbeforewidening.
6. Reuseacceptedguardedfixtureinitialization: ordinaryschema/defaults beforehistoricalFKs/data, awaitMiniflaredisposeoninitfailure. No historicaltablerename/drop, productionSQLclockpatch, sourcepositivealias or testonlyproductionbypass. Fixtureprovider/Access/custody/material/expiredceiling substitutions remainexplicitSYN.
7. D0.3ONLYcreates tokencompatibilitytestfile afterthisunit; notpartofD0.2. D0.2actualissuancepositiveyes. Mordinarytokenstore/workerunchanged. New modulesunmounted, public/privatefetchroutesremainclosed. Unknown/oldreportpathdenialsareagainstnewfixtureonly, notnewliveendpoint.
8. Testproportionatelycloudonly: scopedlintbeforecostlynativegroups; one finalaffectedheadregressions inclacceptedreader/issuer/nativeconduit/retention relevantcases. No repeatedalreadyacceptedwholeupload/signals/fullrepo tests withoutconcretefailure. ActualstandardcompileFiniteNativeStaginggateafterchangedQAreadergraphatfinalhead; itsgraphstillunmountedSDKhandlermaytreeshake, reportstandardvsfixturegraphseparately. CountEVERYactualcompileentrypointcall inclnestednativefixture/buildFiniteNativePackage. Preserve2MiBM/3MiBQA; no fixturebyteoutput/secrets. Do notclaimfullmountgraphorcompletePackage.
9. UseboundedcredentialfreeActions onUbuntu24.04/Node22, contents:read, checkoutpersist-credentials:false; npmci--ignore-scripts--no-audit--no-fund, originalnativeclockbudgets. Temporaryownbranchpathscopedqualifieronly; removeOWNqualifierwithfinalreport. CAScheckbranchbeforeeverywrite; nootherproductwriter/no subagents. No localclone/build/npm/deps/tests/largefiles/provider/browser/OTP/token/DDL/runtime/networkcallstoAFW.

## Delivery

Report docs/superpowers/reports/2026-11-05-finite-owner-sdk-trust-boundary-d02.md. IncludeexactBASE/code/reportHEAD/tree, fullscopeandremainingclosedgates, causalRED/GREENcommands/run/job/attempt/counts/warnings, actualvsSYNperfixture, currentDTO/regressionlineage, realSDKmethods/order/sharedKV/rawbearerlimit, witness/store/child proof, eachrequiredhostilecase+retention/lateoutcome, role-specificgraph/bytes/hashes+compilecount andlimits. Disclosefailures/fixturescorrections. Nooperationalclaim. ReturnDONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED + reportref/exactSHAs/one-linequalificationonly. Do notspawnreviewer; ROOT owns independentreviewafterfullBASEdiff. Rootwillchainnextunitonlyafteracceptance.
