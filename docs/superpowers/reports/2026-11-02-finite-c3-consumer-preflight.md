# C3 read-only source and consumer preflight — 2026-11-02

SOURCE investigation only at immutable dd4773a38a54a4f7611b1829b7cd79f7d8b6a0b1. Agent /root/finite_c3_readonly_preflight. No writes/tests/provider/auth/local/credential operations by investigator. Root records findings while B2writerSTOP; no C3 implementation authorized.

## lib/delegated-oauth-worker.mjs

Lines 114–143,204,231–236,295–319. GlobalOAuthfalse blocksSDK/MCP andownerconnections/revoke. NeedcompiledfiniteexistinggrantSDKresource+separateownerrevokeonlymount; noauth/token/register/refresh/envclone/flagtrue.

## lib/delegated-project-mcp.mjs + delegated-project-read.mjs

Lines 26–70 /44–94. read_project_summary({}), read_saved_evidence({})extraevidencescope, read_project_next_step({expectedRevision?})trustedcontinuity; allread, notSave.

## lib/delegated-continuity-host.mjs

Lines 7–35. OwnOAuthtrue+continuitytrue gate; outerroutebypassalone insufficient; actualprivatefinitecapability withoriginalparent/freshprimary needed.

## lib/delegated-dossier-events.mjs + dossier-event-rpc-authority.mjs

Lines 19–42 /35–56. events/list, events/subscribe({name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url,secret},ttlMs?,cursor?}), events/unsubscribe({name,arguments,delivery:{mode:'webhook',url}}); subscribe needsnotice; unsubscribeOAuthstillvalid butnotlivecatalog. Currentidentitycheckedbefore/afteractualRPC.

## worker/mcp-own/index.mjs + mcp-own-durable-host.mjs

Lines 30–46,67–68,86,89–95 /22,36,46–47. #host missing actualoptionalfiniteGate, affectsactualsubscribeandAfwNodeControl.consume; passsourceproducedcurrentcontrolgate actualhost inclalternatepaths; maintainlegacydelivery/scheduleddenial.

## lib/mcp-own-finite-admission-gate.mjs

Lines 15–89. Nativejournal protectsreservation/admission/launch ONLY; notHTTPMCPauth/ownerwithdraw. Missingactualsource/currentwritersstillT5.

## lib/dossier-monitoring-owner-http.mjs

Lines 32–74. ActualJWTexpiry/Origin/Strictnonce/currentsequence and recordDossierMonitoringConsent revokeexpectedrevision/sequence/requestId/commitWindow/beforeCommit. GenericGETcanregrant, finiteMUSTrevokeonly.

## lib/mcp-own-finite-reduction.mjs + worker/mcp-own/finite.mjs

Lines 11–19,41 /6–8. Auto reductionC0<=now<C1 notearlyowner; bothlegacywithdrawalRPCdenied. Needdistinctauthenticatedearlyreductionauthority. Withdrawal/close stoprequest≠physicalproof.

## lib/mcp-own-synthetic-save.mjs + synthetic-save-host.mjs

Lines 20–47 /10–22. saveOwnSyntheticGoal(options,{expectedRevision,idempotencyKey,goal})discovery|content atomicupdate+eventidempotentrecovery. LegacyHTTPflags/key unavailable; sourceoperation-specificfixedSavecapabilityONLY, noReadscopewrite.

## lib/mcp-qa-finite-confirmation.mjs + confirmation-source.mjs

Lines 41–75 /4–6. Nativeoriginaleventmountreadmaterialtwice→exactrunKnownCancellationReleaseWorkflow({bundle,env,event,step})fourargs18stages70s/5/20; producerstillunavailableT5.

## lib/mcp-subscription-lifecycle.mjs

Lines 140–150. cloudReviewConfirmed:false. HTTPack/catalognotusefulturn. Actualcurrentconsumertool/callback/environmentnotverified; absenceinventoryNOTplatformunsupported.

## Recommended boundary

Narrowcompiledfinitecomposition sharingactualSDK/read/events/domainprimitives + source-ownedfixedcapabilities. SmallestnextsourceafterRoot/T5: existinggrantread + authenticatedrevokeonlyHTTP throughactualSDK→handler→D1 tests. SeparatefollowonfiniteGate/Save/capture/delivery/physicalsettlement. No wrapperenvtrue/globalflagrelax.

Actualcompiledhandler globalOAuthfalse finitevalidSDKread; ordinaryclosed; wrongowner/client/resource/source/revoked/delay/deadline; readnomutation/evidenceoptional; ownerOrigin/Strictnoncebad/replaydenial; earlywithdrawbeforeC0andafterreadinactive; noticesseparate; unknownACKreadbackonly. FollowactualWorker/DO/D1 finiteGate subscribe/consume/callbackverification→delivery→nativeunsubscribe/physicalsettlement.

## Concrete timing dependencies

- lib/mcp-own-durable-host.mjs:57–68 — subscribe→receipts.preflight→custody.start→controller.subscribe(callbackverify)→receiptpersist→readiness. mcp-subscription-lifecycle155,169–173 checksnodeReadiness beforecallbackverification. No split callback-only preauthorization mode.
- lib/mcp-node-process-custody.mjs:79–90,93–103 — beginAdmission beforeactualadmissionINSERT; actualadmissionwritten BEFORE successorlaunch discoversmissingreservation.
- lib/mcp-own-finite-admission-gate.mjs + finite-trial-control.mjs:47–54 /296–306 — Admission requires actualarmedcontrol/withdrawnAtnull/nominalclaim/currentnotice. prepare→guardarm→claimEffectnominal actuallaunch88–101. No preHEADcallback success viafiniteGate.
- lib/mcp-release-runtime.mjs + successor-reservation.mjs + successor-launch-gate.mjs:77–82,121–138 /29–36 /29–42 — Nominal150–160s→runReleaseOperator→activationconfirm→reserveReleaseSuccessor writespreparedbudget1 reservation. Launchjoinsreservationprepared/budget1. PrematuresubscribeafterARM butbeforenominalreserve canINSERTadmissionthenfail; reservationexpectsglobaladmissioncount1, so it canblocklaterreserve. C3 requires rejection BEFOREmarkers/D1write ifreservationnotproven.
- lib/delegated-dossier-events.mjs + dossier-monitoring-authority.mjs + permission-withdrawal.mjs:37–42 /72–78 /145–176 — Actualclientunsubscribe stillrequiresOAuthactive g.revoked_at=='' andunexpired; noticecatalognotrequired. Serverunsubscribe→custody.close atdurablehost109. C0withdrawnotices thenreadcouldpreventlaterclientunsubscribe. Servercleanup/stoprequest≠clientnativeunsubscribe orphysicalstop.

Actual sequence beforePCoff: ARMclaim→nominal+reservation→subscribe/Container/callback→receipt/readiness→poweroff→Save/event. No provenbarrier delayingSave/eventuntilcallbackanduseroff, no guaranteedlatencies, nofirstHEADPConreplay. Root must inspect actualKnown18stage ordering for existingreadiness barrier before changinganyclock/stage. Timing/artifact/context sourceplan assumptions need explicitRootruling; no clockchange approved.

Root inspected actual mcp-release-runtime.mjs atBASE: runKnownCancellationReleaseWorkflow preserves fourargs/18hooks/70s and confirms activation/reservation; no Saveproducer appears in that inspected path. Finite CLI admission/seed-material/admit/poll/restore likewise does not itself trigger Save. A source-authorized Save producer and client-ready/PC-off timing relation must be designed explicitly; do not assume fixed Save timing, add a callback, shift clocks or mutate Known by inference. Read grant never authorizes Save; reader plugin promises noediting. Prefer separate preapproved operator-domain action, not a hidden write tool in read-only plugin. These are cross-task design gates, not effects performed.

## Official consumer route (Root verification)

Root searched and actually opened [OpenAI MCP Events](https://developers.openai.com/plugins/build/mcp-events) on2Nov2026. It documents Workweb, WorkdesktopCloud and dots; ChatGPT supplies callbackURL/signingsecret during events/subscribe. Its test path requires actual subscription, callbackverification, delivery, useful response and unsubscribe. This establishes a supported client route, not actual AFW account/chat/AFWOperations environment binding or PCoff. Absence of a tool in current session does not prove platform unsupported. No callback/key/chat/subscription/automation created by this research.

## Required fixes / later gates

Premature subscribe needs rejection BEFORE newadmission/markers if exactpreparedreservation absent; don't use it as harmless probe. Client-native unsubscribe must occur while OAuth/readgrant stillvalid; noticewithdrawal alone permits conceptualunsubscribe but readrevocation blocks it. Serverteardown and Containerclose request are separate from clientunsubscribe and physicalstop. Current source doesn'tprove a safe shutdown interval; preserve original150/160,C0/C1,N1/R1/firstHEAD and require a concrete sequence before an actualtrial. B2 factual readers don't supply controlauthority; Task5 source/custody/privatecontext/all-writer constructors stillmissing. C3 read/revoke-only compiledcomposition is nextboundedproposedunit after prerequisitequalification, with finiteGate/Save/capture/delivery followons. No main/runtime/resources/permissions/grants/Max changed. operationalReadiness=false, PCoff=false.
