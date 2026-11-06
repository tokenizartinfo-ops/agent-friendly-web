# Final whole-branch review — AFW, 6 November 2026

**Ready to merge closed SOURCE candidate? With fixes.**

The initial lifecycle has one Important physical-work-retention defect. Fix it before merging. The three Minor items below can remain explicitly tracked. This assessment does not authorize a merge, deployment, renewed source window, or runtime operation.

Reviewed range: f4ff51596be918e9d556f6765aeb0441133ff52f → 8b2380c9bcc9c383ec46590df1403eed19fd2659.

## Strengths

- Publication authority remains tied to the original continuation. Connection publication captures native holders, retains actual operations, compares complete source pairs, and permits only its own narrowly correlated journal transitions. Upload, activation and receipt completion precede the successful response. lib/mcp-qa-finite-owner-phase-context.mjs:481,560,589,609,621,633.
- The extracted engine preserves separation between logical failure and physical settlement. Sticky failure prevents subsequent operations, while actual response-body cancellation remains retained—including rejection before acquiring a reader. lib/mcp-qa-finite-fixed-policy-engine.mjs:24,38,52.
- Enrollment does not recreate authority from stored facts. Its writer checks captured native identities, rejects transaction callback re-entry, and requires transaction completion, synchronization and readback. lib/mcp-qa-finite-preparation-enrollment-writer.mjs:32,53,71.
- Issuer and notice SQL preserve ownership, exact grant identity and bounded time inside the write predicate. Consumption witnesses are private, single-use and lease-bound; monitoring consent requires the exact observed ticket and empty prior consent history. lib/mcp-qa-finite-preparation-issuer-store.mjs:49,197,223,230.
- Cleanup distinguishes evidence from execution returns. Restoration requires settled writer inventory and independent reconciliation; a close request is not presented as verified physical stop. lib/mcp-own-finite-cleanup-proof.mjs:9; lib/mcp-qa-finite-trial-guard.mjs:69.
- Qualification reporting preserves its limits: cancelled composite run, expected-failure controls, later single-principal qualification, corrected passive observer and copied-DATA checks. Task3 report:614,646,648,656.

## Consolidated findings

Critical: none identified.

### Important I1 — Retain acquired response bodies when validation fails before getReader()

Locations at reviewed HEAD:
- lib/mcp-qa-finite-bootstrap-native.mjs:37, cleanup44.
- lib/mcp-qa-finite-historical-source.mjs:210, cleanup219.
- lib/mcp-qa-finite-initial-material.mjs:45, cleanup52.

Problem: Each function awaits a response, checks the original lease and validates status/headers before assigning reader. Its finally cancels only when reader exists. An invalid response—or a response arriving after the original lease expires—therefore exits without retaining cancellation of its acquired body.

These are connected initial-lifecycle producers: initial-material.mjs:59–64 invokes the command, bootstrap and historical readers inside stage-work ownership. Once their retained promises settle and the original lease aborts, stage-work.mjs:8–22 can remove the outstanding entry while the abandoned body has no tracked settlement.

Impact: This breaks the explicit body/cancellation ownership guarantee and can allow a later observation scope after apparent drainage while earlier transport work remains unaccounted for. Durable one-shot fences still deny replayed publication. This is NOT an asserted authorization bypass. Aborting the fetch signal does not establish physical settlement.

Fix: Keep the acquired response in an enclosing variable. In every exit path, retain actual reader.cancel() or, when no reader was acquired, unlocked response.body.cancel(). Preserve prompt logical denial while retaining physical cleanup, following the established fixed-engine pattern.

Focused verification recommended: One parameterized native regression covering the three adapters with an invalid-header/status response and a late response, whose actual body cancellation remains held. Assert logical denial, cancellation entry, continued exclusion of another root until cancellation settles, and no subsequent IO/publication. Existing inspected tests cover malformed DATA, held fetches and storage continuations, not this pre-reader cancellation boundary. No test was run during review.

### Minor M-I — D03 negatives accept an unrelated generic denial

test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs:112, matrix135. deniedExchange accepts any400/401/503; the matrix does not supply optional expected error. Generic availability failure can satisfy a case intended to demonstrate a particular OAuth rejection. No-consumption assertion is useful but does not identify the rejection boundary. Fix: expected status/error per case, keeping intentional503 where appropriate. This is test precision, not evidence of a token-validation bypass.

### Minor M-II — Cleanup assertion can skip fixture disposal

test/mcp-qa-finite-owner-qa-sdk-native.test.mjs:86. If ioRelease or ioWait(active===0) rejects, execution skips sdkReleaseHeld, Miniflare disposal and temporary cleanup. Failed test can leave work/resources and contaminate diagnosis. Fix: nested try/finally so cleanup runs even when drainage assertion fails. Preserve failure; disposal is not physical-drain proof.

### Minor M-III — M3 second same-engine operation remains untested

test/mcp-qa-finite-policy-transport.test.mjs:83. Test invokes activate once, holds cancellation and checksPOSTcount1, but does not attempt another operation on that same engine while cancellation is pending. Sticky failure looks correct, distinction remains unproved. Task3 foreign-root retention differs. Fix: attemptsecondoperation before releasing cancellation, require rejection/noextraPOST, keep cancellation-settlement assertions.

## Deferred-item disposition

- M1: Two historical initial SDKreadCurrent failures unexplained/unreproduced; preserve open reliability evidence. Later success/staticreview supplies no root cause.
- M2: npm/Actions/CIMD/RPC/disposal warnings remain maintenance debt, ownership unknown; no incidental upgrades/invented functional defect.
- M3: Open as MinorM-III.
- M4: CLOSED by current code inspection. Old ambiguous wrong-profile label replaced with oauth-open; separate genuine wrong-profile case compiles ordinary entrypoint. F1:127,134,333.
- Consent161/244 settlement and P3cookies: no new named compositionrisk; not reopened.
- Task3 publication-order I1: repaired correlated native-order assertion remains addressed; no duplicatefinding.

## Recommendations

1. One focused fix wave for ImportantI1 and its causal regression. No rerun of accepted broad suites just to reproduce verdicts.
2. Provider feasibility remains explicit PROMOTIONgate: reported~1736SYN CFrequests/~1.877GBJSON make capacity/deadline fit load-bearing. Before promotion establish credential-bucket sharing, cumulative quota headroom, per-request fanout/bytes, latency under unchanged Root/child deadlines and rejection after partial effect. Include ingress rejection before expensive source fanout. If intended shared default bucket insufficient, architecture or approved capacity must change; weakening consistency/expandingclocks is not a remedy.
3. Preserve source/window and readiness fences. Expiredsource and unavailable downstream producers are deliberate boundaries.

## Coverage and evidence limits

- Complete954commit/579pathmanifest and all26packets, not truncatedcompare. All productpaths received structural/API/import screening; deepinspectionfollowed authority/lifecycle/storage/cancellation/sharedruntimecomposition.
- Deepinspection: dispatch/mounts, signedownerpreparation, sourcepair/publication, issuer/noticecontinuations, initialmaterial/activation/cleanup, enrollment, stageworkretention, sharedprocesscustody/reservation/release/withdrawal, cleanupproof/restoration, archiveinspection, workflows/migrations/profiles.
- Risk-based review, NOT line-by-line approval of all579files. Remainingcodec/helperdetails, everyassertion in159testfiles and everyhistoricalstatement in278docs were NOTindependentlyrederived. Historicalreviews wereevidence, notinstructions orsubstitutesforinspectedcode.
- Targeted maincomparison: no changed-path overlap with main's7commits beyondmergebase. No merged-tree build/dynamicintegrationcheck.
- No tests/builds/runtime requests/artifactdownloads/localcheckout/mutations duringreview.
- 167positives remain evidenceatD11, notallrerunatlaterobserverfixture. Laterprincipal/lint scoped.
- Callbackretry remains disclosedstatic/compositionalexception, notdynamicPASS.

## Declined to judge

1. ThirdCLOSED/noticespublication/prearm/fullsetup: downstreamofcompletedcurrentplan.
2. Actualsubscription/usefuldelivery/nativewithdrawal/PCoff: notestablishedbyclosedSOURCE/SYN.
3. Completerestorationafternewconnection/issuer/noticestates: existinginitialcleanupdeliberatelyrefusesstatesbeyondqualifiedboundary; laterlifecyclerequiresseparateplan/evidence.
4. LiveCFquotas/latency/buckettopology/permissions/currentresources: unobserved; SYNprovesneitherlivesuccessnor429.
5. Currentdeploymentprovenance/recoverability/currentcustodyvalidity: historicalobservations/compiledspecs don'testablishcurrentruntime.
6. NativeCodexCloudproxyreadiness: notestablishedbyActions/supportreply.
7. M1/M2rootcauses: insufficientcausalevidence, nospeculation.
8. Successfulmerge/postmergeexecution: nonewasperformedorsimulated.

The closedSOURCEdesign has substantial safeguards, but ImportantI1contradicts physicalretention. Fixbeforemerge; correctiondoesnotremoveevidencelimitsorauthorizepromotion.

## Root disposition and owner shutdown checkpoint

Root independently verified the three reader snippets at8b: response declaredinside try, post-fetchcurrent/status/header checks precede getReader, finally tracks onlyreader.cancel. Exactblobs: bootstrapac0d14ebb5a986e2611e9ddbd72592541c9a4c28; historical3f0bf487efd72aa2356fd9982f98a938d328e72d; materialc0ee5315563764979ed2c681c71b2dbc5515203d. ImportantI1confirmed;0addressed/1open. CurrentNativeConnectionTask3 remainsaccepted; globalSource is WITHFIXES, notreadytomerge.

Ruling: Earlier Task3's bootstrap/material protection was its task-boundary isolation; finalwholebranchreviewnowidentified an older defect that violates the binding retention contract. The next singlefixwave may make the smallest Source-only correction in these3readers and coveringnative tests/fixtures, retaining all other authority/interfaces/successsemantics. No genericHTTP/authoritycallbacks/schema/profile/runtimechanges. Costifwrong: an overbroadcleanup/refactorcouldchangeauthority/clock/successbehavior; scope/protectedblobs and causalnativeRED/GREEN mustexposeit. Thisruling is NOT adispatch: ownerrequestedshutdown, nofixwavehasstarted.

Declined-to-judge Root rulings:
1. Carrydownstreamproducerwork forward as explicitnextplan; notcomplete/byinference. Costifignored: laterstepscouldbuildonabsentproducers.
2. Keepreadinessfalse untilrealcloudsubscription/delivery/withdrawal/PCoffproof. Costiffalselyclosed: claimautonomywithoutactualdelivery.
3. Requirecompleteboundedautonomousrestorationforconnection/issuer/noticestates BEFORE openingtheirrealtrial. Existinginitialcleanuprefusalisintentional; don'trelaxittoforceclose. Costifignored: trialcouldoutliveguardorrestorethewrongstate.
4. Makeproviderfeasibility/currentaccountproof a separate operationalgate, notspeculativeratelimitdiagnosis. Costifignored: partialeffects/limitscouldbreaktheliveflow.
5. Recheckcurrentdeployment/recoverablebackup/custodybeforeanymutation; sourcetime3Novexpired. Costifignored: staleidentityorrollbackassumption.
6. NativeCodexCloudreadinessrequiresitsowncurrentboundedproof; Actionsnotasubstitute. Costifignored: PCoffconsumerunavailable.
7. PreserveM1/M2unknowns; scopeddiagnosisonnewcausalevidence, noincidentaluptake/suppression. Costifignored: reliabilitynoisehiddenorworkwasted.
8. Mainmerge/postmergechecks remainunperformed/unapprovedbythisreview. Costifignored: mergequality/runtimeclaimswithoutintegrationevidence.

MinorM-I/M-II/M-IIIdeferred, ownerRootfollowup; keepM1/M2open andM4closedwithrefs. ONEfinalfixwave andONEscopedre-review afterresume; nofixerperfinding, noMinorfixwave, noacceptedbroadsuiterun. Suggested coveringfiles: test/mcp-qa-finite-bootstrap-native.test.mjs, test/mcp-qa-finite-historical-source-native.test.mjs, test/mcp-qa-finite-initial-material-native.test.mjs (reuseactualnativefixtures; addanarrowparameterizedfileonlyifitavoidsduplicateharness). Freezeexactscope/counts beforequalifier≤15min/read-only/no secrets. Prove acquiredactualbody, logicaldenial, cancellationentry/realpendingPromise, liveother-rootexclusionuntilsettlement, nofollowingIO/publication; coverearlyvalidationandlateacquisition. Don'tclipcleanupbyexpiredbusinessdeadlineorpretendabort/drainareequal.

Owner asks6Novfinishcurrentblock/saveandpausebeforePCshutdown. ReviewblockCOMPLETE; nextfixnotstarted. SOURCEFROZEN8b2380c9bcc9c383ec46590df1403eed19fd2659; noactiveSourcewriters. operationalReadiness=false;completePackage=false;PCoff=false. No remote resources/permissions/tokens/OAuth/cron/Containers/consumers/Max changed in this block; currentactualruntime state is not inferred. All heavy build/test wasActions; no local clone/deps/build/test/temp artifacts.
