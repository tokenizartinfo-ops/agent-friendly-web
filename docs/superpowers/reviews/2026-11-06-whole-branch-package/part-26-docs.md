# Whole-branch review packet 26/26 — docs

PROJECT=AFW; repository=tokenizartinfo-ops/agent-friendly-web; SOURCE head=8b2380c9bcc9c383ec46590df1403eed19fd2659; tree=07079c8cc3670a6a1db51ca1daadbf3172c2d445; mergebase=f4ff51596be918e9d556f6765aeb0441133ff52f. Review index in this directory is authoritative for complete579file/954commit coverage. This packet contains full U10 diffs and exact blob provenance for 21 files; no runtime or merge authorization. Generated in cloud tool memory from pinned GitHub text, no local checkout/build.

## Packet manifest

- docs/superpowers/specs/2026-11-04-finite-closed-prearm-policy-conversion.md: ABSENT -> f6132add23014f68812149503dd73241d24fd145; full diff chars=21258
- docs/superpowers/specs/2026-11-04-finite-initial-owner-source.md: ABSENT -> d0b39bfa60223c7e48b79870015d0076cf2a241e; full diff chars=7894
- docs/superpowers/specs/2026-11-04-finite-known-profile-compatibility.md: ABSENT -> 1f556dec4e02b8926d4daf13ea72c1afd4ca8577; full diff chars=18367
- docs/superpowers/specs/2026-11-04-finite-owner-native-conduit.md: ABSENT -> 63a41d75a73152a925a6241ad4dff5cc139b775c; full diff chars=12836
- docs/superpowers/specs/2026-11-04-finite-owner-phase-context.md: ABSENT -> 088a9efd6999c2bfb3b156d76b511fcf6ed4aef8; full diff chars=22844
- docs/superpowers/specs/2026-11-04-finite-owner-sdk-owned-recheck.md: ABSENT -> 69f96dd39e69e11b8042aacb3d73ce36c8add39c; full diff chars=13813
- docs/superpowers/specs/2026-11-04-finite-owner-sdk-trust-boundary.md: ABSENT -> 4d9ed42d016da5a7113c1a6d28c341dc2e7343ab; full diff chars=30300
- docs/superpowers/specs/2026-11-04-finite-readonly-integration.md: ABSENT -> 027a423e57992014166a44c59f99db113a8430a1; full diff chars=3875
- docs/superpowers/specs/2026-11-04-finite-request-signal-opt-in.md: ABSENT -> c91cbfd4dbd4595c46e23b0265c5d5e42c7cdfac; full diff chars=7116
- docs/superpowers/specs/2026-11-04-owner-request-retention.md: ABSENT -> 2308c9b36a8a2138441fef8b9f58880c0ef91026; full diff chars=7384
- docs/superpowers/specs/2026-11-04-preparation-cleanup-enrollment.md: ABSENT -> a2f8b7214e64931587de303dc93a74485a177f00; full diff chars=14161
- docs/superpowers/specs/2026-11-04-preparatory-issuer-fence.md: ABSENT -> 1f22a1afc2da83c5c8c72bcc5844dfadcd9e4da3; full diff chars=18026
- docs/superpowers/specs/2026-11-04-single-live-pcoff-sequence.md: ABSENT -> 3d7dc69c4ccc4ec8c7e3268318a1a10fc79bb238; full diff chars=2444
- docs/superpowers/specs/2026-11-05-finite-native-first-connection-publication-design.md: ABSENT -> 0ac493fbc1f665cf3001e80f226c4c6e76aaf6c1; full diff chars=36962
- docs/superpowers/specs/2026-11-05-finite-native-notice-consent.md: ABSENT -> c990678135775ed9b3583e931fe97f8c9ef47238; full diff chars=26849
- docs/superpowers/specs/2026-11-05-finite-native-notice-link.md: ABSENT -> 439072471436fa84e959ed231f7d1c4df15adcef; full diff chars=18658
- docs/superpowers/specs/2026-11-05-finite-native-notice-next-slice.md: ABSENT -> ae426608d2ba892c1b20994321850c75dcd94301; full diff chars=22100
- docs/superpowers/specs/2026-11-05-finite-native-notice-provenance.md: ABSENT -> 35d31271f577c3c85d3499c8ca58783e6bcae259; full diff chars=15195
- docs/superpowers/specs/2026-11-05-finite-owner-exchange-continuity.md: ABSENT -> f45487ee7f5ada5233d01ab0af37ae2ca27d518d; full diff chars=13654
- docs/superpowers/specs/2026-11-05-finite-owner-io-fanout.md: ABSENT -> 6ede30e4b58a9a4a31270962e80e84ed54f8a004; full diff chars=15676
- docs/superpowers/specs/2026-11-05-finite-preparation-notice-store.md: ABSENT -> 8e6a62acaa90fe66f067a31c9df1fcf005611285; full diff chars=18019

## docs/superpowers/specs/2026-11-04-finite-closed-prearm-policy-conversion.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-04-finite-closed-prearm-policy-conversion.md b/docs/superpowers/specs/2026-11-04-finite-closed-prearm-policy-conversion.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-04-finite-closed-prearm-policy-conversion.md
@@ -0,0 +1,119 @@
+# Finite closed prearm and separate full-policy conversion
+
+2026-11-04. SOURCE DESIGN ONLY. This document decides the bounded configuration conversion; it does not implement or qualify a native publication.
+
+## Scope, evidence and decision
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT GitHub source/docs; ORIGIN delegated-canary.agentfriendlyweb.dev, not contacted; RESOURCE_TYPE docs branch; RESOURCE_ID docs/finite-closed-prearm-policy-conversion-20261104; ALLOWED_ACTION pinned-source reads and docs-only expected-head commit; ROLLBACK revert the documentation commit. Product inspected at e280a297f4c2ea3f38ea3fc4ac157439415708be, tree 0fb1d342bb8b210738765d6a4bcc14454b1714f8. A separate product writer owns compatibility; do not follow or write its advancing branch.
+
+Read the completed [causal diagnosis at 13688c4](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/13688c4c4ae02e2d3126fe39f4f75762f95d3890/docs/superpowers/reports/2026-11-04-finite-prearm-setup-dependency.md). This specification converts that decision into interfaces, rather than reopening the investigation. The [two-phase specification](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/3a0db69aa866621bc7df69b67a0a5aaa15c0788f/docs/superpowers/specs/2026-11-04-finite-owner-phase-context.md) and [plan](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/3a0db69aa866621bc7df69b67a0a5aaa15c0788f/docs/superpowers/plans/2026-11-04-finite-owner-phase-context.md) are dependencies, not implemented interfaces. Their closed_ui/read_consent scope stays intact.
+
+The third owner stage publishes the exact original M CLOSED preparation configuration, with a new ordered ConnectionReceipt. Only after that receipt, Selection/witness and the genuine original primary T0 may the actual PolicySetup derive construct and publish the distinct full canaryLive candidate. The latter has PolicyReceipt. Configuration equality to original M never permits skipping or replaying the third publication.
+
+The smallest independently reviewable implementation unit is a pure closed-prearm qualifier and full-configuration builder. It can be accepted before the missing notice/SDK/source work. Its later integration into the existing lexical derive is separately gated by a real producer and causal native harness. Its tests prove DATA shape and imported composition, not an owner timeline or permission. The source producer and its own-SEND recheck require a separate unit.
+
+## Fixed constraints
+
+- QA compatibility date is 2026-09-07; flags are exactly [nodejs_compat,enable_request_signal]. M flags are exactly [nodejs_compat,global_fetch_strictly_public,enable_request_signal], in that order.
+- Use the accepted finite APIs: finiteActivationConfigurationHash, createFiniteActivationObserver, validateFiniteReleaseOperatorBundle (confirm_named only), resolveFiniteNamedActivationPlan, validateFiniteNamedCancellationHistory, reserveFiniteReleaseSuccessor and runFiniteKnownCancellationReleaseWorkflow. Consume the independently accepted C3 role integration; do not implement compatibility again. In particular, do not turn derive's pre-upload publish validation into a forbidden finite publish operation.
+- Legacy strict APIs, historical2607/c570 and QA_CLOUD_CLOSED_PINS stay immutable. Historical rollback uses its explicitly selected historical codec. No generic old-or-new fallback, caller hash strategy or normalization.
+- No callback/authority DTO, new admission, SDK issuance, producer/mount, Entry, runtime, OAuth, OTP, Max, permissions, schema or clock extension.
+- Preserve original I0/C0/C1, I0+300000 technical horizon, parent <=30000ms, child <=5000ms, commandBy-510000, T0+50000 setup deadline and all nominal/launch budgets and counters.
+- source ceiling 2026-11-03T02:59:00Z is expired. operationalReadiness=false; completePackage=false; PCoff=false. Preserve the reserved single coordinated consuming PC-off occurrence.
+- No tests/build/deploy/provider/browser/credential action is authorized by this documentation task. Later source execution requires root acceptance and its exact accepted baseline.
+
+## Configuration domains
+
+| Domain | Configuration and receipt |
+| --- | --- |
+| Original M | Qualified original plan.configuration; all enabled flags false, four nominal policy strings empty, monitoring policy empty; original project/client, Access, expiry, limiter and persistent holders retained. Capsule pointer remains original initialBaseline forever. |
+| read_consent / notice_consent | Existing first-two-stage three-setting family only: AFW_DELEGATED_OAUTH_ENABLED, AFW_DOSSIER_MONITORING_OWNER_ENABLED, AFW_DOSSIER_MONITORING_OWNER_POLICY. No other binding/configuration/module change. |
+| Third finite stage | Exact original M configuration and same module bytes; distinct upload/deployment and ConnectionReceipt linked to the notices predecessor, original decision, grant and notice. source.phase=finite_prearm is historical preparation evidence, not full-policy installation. |
+| Later PolicySetup | Exact fixed full canaryLive template with six actual derive slots. Baseline is the exact third installed version/deployment/configuration/module; original initialBaseline and historical rollback remain separate. Full PolicyReceipt binds actual ACK IDs, publicStatic and private full hashes. |
+
+The conversion removes EXACTLY five preparation-only bindings: ACCESS_TEAM_DOMAIN, ACCESS_AUD, AFW_OAUTH_PILOT_EXPIRES_AT, DELEGATED_RATE_LIMITER, AFW_DOSSIER_MONITORING_OWNER_POLICY. DELEGATED_RATE_LIMITER is a ratelimit reference: removing it is an explicit reference change, not preservation of every physical binding. Preserve every DO namespace, KV namespace, D1 ID, secret name/inheritance source, version-metadata binding, exports/container declaration and module byte. Do not create a namespace, secret, limiter or container/image.
+
+The fixed full template changes only AFW_DOSSIER_EVENTS_ENABLED, AFW_DOSSIER_SUCCESSOR_ENABLED and AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED to true. OAuth/refresh/monitoring/save/schedule/retirement-read remain false. The four nominal policy slots plus project/client contain the six actual values from derive. Template typed privateSlot markers must never become provider metadata.
+
+## Pure interfaces and exact construction
+
+Create lib/mcp-qa-finite-prearm-profile.mjs:
+
+```js
+export function qualifyFinitePrearmConfiguration({
+  metadata, originalConfiguration
+}) // Readonly<normalized configuration>, or throw
+```
+
+Accept exactly these own enumerable DATA fields using existing finiteFields/finiteData; no accessors, symbols, prototypes, functions, env, bytes, clocks, leases or optional modes. Validate BOTH configurations with qualifyFiniteConnectionProfile({phase:'closed_ui',metadata:...}). Require deep canonical equality without sorting arrays or changing values. Return a deeply frozen detached configuration. This checks factual equality to the supplied original; the fixed QA source must independently qualify that original against capsule/plan/resident evidence. No caller object can attest its own provenance.
+
+Do not add finite_prearm to qualifyFiniteConnectionProfile, do not call the full projection for this configuration, and do not give empty private policy strings a success branch in projectFinitePublicConfiguration.
+
+Create lib/mcp-qa-finite-policy-configuration.mjs:
+
+```js
+export function buildFinitePolicySetupConfiguration({
+  prearmConfiguration, policies
+}) // Readonly<normalized full configuration>, or throw
+```
+
+This DATA builder does not receive or mint original source authority. Its prearm input must satisfy the closed_ui grammar. Original equality is the upstream fixed producer's obligation, checked by the separate qualifier. An input cannot become original just by being passed twice to that qualifier.
+
+policies has EXACTLY six own string fields: AFW_DOSSIER_EVENTS_POLICY, AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY, AFW_DOSSIER_RETIREMENT_POLICY, AFW_DOSSIER_SUCCESSOR_POLICY, AFW_OAUTH_PILOT_CLIENT_ID, AFW_OAUTH_PILOT_PROJECT_ID. No generated placeholders or caller-selected slot names. Preserve each input string verbatim. Reject empty strings and DATA over existing finiteData bounds; retirement remains <=4096 bytes. Client/project must equal the original closed configuration's values. Four policy strings must parse as JSON objects, not opaque placeholder words, arrays or scalar JSON. Reuse parseDossierEventPolicyFields(raw,true) and parseOwnPermissionWithdrawalPolicy(raw) for their existing grammars; parseDossierRetirementFields plus parseDossierEventPolicyFields(JSON.stringify(retired.policy),false) for retirement; successor must have exactly {scope,original,candidate,publication} DATA. These are grammar checks, not proof of genuine T0, grant, program or retirement provenance. Existing derive and future fixed sources retain all semantic/identity checks; do not create another resolver/namespace authority in the helper.
+
+Algorithm:
+
+1. Snapshot/validate inputs and qualify the closed preparation grammar. Obtain finitePublicProfileTemplate('canaryLive'); never copy or weaken its grammar.
+2. For each template binding, use its fixed value; for a privateSlot use exactly {name,type:'plain_text',text:policies[name]}. For every non-plain-text binding, first require exact equality with the original prearm holder and copy that qualified holder, including version_metadata. Fail rather than replacing a changed holder with the template's value.
+3. Use the template's exact non-binding fields, after equality with those already qualified in prearm. The output contains only template names; prove the input-minus-output name set is exactly the five listed above, with no added name. No type conversion of retained bindings.
+4. Call projectFinitePublicConfiguration({role:'canaryLive',metadata:configuration}); return frozen DATA. No receipts, hashes-as-approval, callback, lease or ready flags.
+
+Placeholders such as SYNTHETIC_PREARM, SYNTHETIC-PRIVATE-* or SYNTHETIC_QUALIFIED_ORIGINAL_RETIREMENT are not inputs to positive conversion tests. Structurally valid explicitly synthetic policy DATA can exercise the pure builder; it cannot prove private source provenance. The full projection remains a structural redaction grammar and is not rewritten to be a policy parser.
+
+## Existing derive integration and hash domains
+
+For the separately gated integration task, modify only lib/mcp-qa-finite-policy-setup.mjs's lexical derive(facts,refs,binding,env): import the builder, replace clone-and-six-slot-patch with buildFinitePolicySetupConfiguration({prearmConfiguration:source.baseline.configuration,policies}), and require candidate module descriptor/hash/length and bytes to match the qualified baseline M module. Keep original artifact/program/context, real primary T0, selected owner/grant/notice, cancellation and retirement derivation before the call. No export of derive or injected builder.
+
+The six strings remain produced in derive. T0 is material.primaryEvidence.T0 from the original issue-comment and seed lineage, never request Date.now(), fabricated future time or equality of timestamps. Events start at T0; successor candidate uses T0/N1; withdrawal C0/C1 and original notice sequence/revision/expiry retain their exact formulas. Retirement stays the qualified original retirement string, not a newly invented current policy.
+
+Keep source.baseline == exact third ConnectionReceipt (version, deployment, module and finite activation hash), and preserve selected/witness ordering: third completion <= selection/witness <= T0 < commandBy. The builder neither reads nor repairs this history. SetupContext.baseline stores that exact closed third pin, rollback stores the original qualified historical rollback, expectedFull hashes the full candidate. No schema expansion is needed for configuration shape. Existing strict codecs/consumers must accept these domains through C3's explicit finite-versus-historical selection; never remove their hash checks.
+
+Recompute full activation with finiteActivationConfigurationHash, restoration with restorationConfigurationHash, and existing canonical bindings hash in its unchanged domain. publicStatic remains finitePublicStaticExpectation('canaryLive'); do not assign it to prearm or use it instead of private full metadata. The full bindings hash MUST differ from prearm because of the five removals and flag/policy changes. Do not patch receipt hashes to conceal a mismatched configuration.
+
+### Existing derive checks versus missing producer guarantees
+
+At the pinned source, derive itself checks candidate script/module hash and length against material.seed.manifest, exact artifact revision/tree/sourceCheck, baseline/rollback byte hashes against their descriptors, original-context hash against selected preparation, original program/revision, baseline version/deployment/module/configuration hash against facts.receipt, exact scope/resource/namespace/original container correlation, successor/cancellation data and withdrawal policy grammar. It derives T0/N1/C0/C1 from material.primaryEvidence.T0 and notice fields from facts.notice. It checks retirement text is nonempty and <=4096 bytes; that alone is not retirement provenance. The proposed builder adds JSON grammar but cannot supply provenance either.
+
+readFiniteOwnerSetupFacts itself requires the original primary material/seed lineage, native T0 equality and queue/seed ordering; selected preparation without an existing binding; exact Selection publication witness <=T0; T0<commandBy; third completion before selection; current original owner/grant/notice facts via readPreparationFacts; and a final selected/source recheck. Its source dependency is presently unavailable.
+
+Future fixed sources must supply evidence those checks cannot manufacture: original capsule/plan configuration equality, actual resident/module provenance, genuine Workflow entry/primary command identity, current provider pointer/configuration, actual original issuer/grant/notice chain and correct writer ownership while setup changes the current pointer. Original-baseline-to-candidate byte identity is the explicit added derive assertion in the gated integration; baseline receipt hash equality alone does not prove the capsule-original module. The pure Task1 never reports any of these missing facts as established.
+
+## Consumer boundary and dependencies that stay closed
+
+| Consumer | Decision |
+| --- | --- |
+| Planned readPrivateQaFiniteOwnerContext and qualifyFiniteOwnerInstalledStage | Two-phase task remains unchanged and unavailable for notices/finite. A later extension must call the prearm qualifier with original anchors.plan.configuration and observed third metadata; require exact three ordered journals/receipts, real current grant/notice/issuer/audit, actual provider pointer/bytes and fresh original primary rechecks. A source.phase string alone never qualifies. |
+| readPrivateQaFiniteConnectionSource({ctx,env,preconnectionId,stage},lease) | Existing stub is not implemented here. Its future exact return remains {ownerSource,baseline,rollback,candidate,bytes,assertCurrent}; third candidate is original M closed config/bytes, predecessor is notices. Original plan comes from fixed QA anchors, not an input DTO. |
+| createFinitePolicyTransport({ctx,env}).run(refs,originalLease) | Pending-only fence and actual consumed-admission behavior remain. This unit does not enable finite publication or bypass initial-only enrollment/cleanup constraints. |
+| readPrivateQaFinitePolicySource({ctx,env,intentId,sourceRevision},originalLease) | Existing stub is not implemented. Future producer must return existing {native,ownerSource,originalContext,baseline,rollback,bytes,assertCurrent}; ownerSource retains original three-stage prearm history while current setup pointer advances only through that same live writer. |
+| readPrivateQaFinitePolicyEntry / actual SDK and notice issuer | Still unavailable/unqualified. Do not add a mount, write notices/grants, reconstruct authority from rows, or rename effectful work a pure helper. |
+| Cleanup collectors/journals/initial owner | Must eventually correlate both ConnectionReceipt and PolicyReceipt, each exact module/configuration/binding/metadata hash and predecessor, with retained original backup. No restore while either upload/deployment may still complete; preserve legitimate later activity and historical rows. No cleanup broadening is part of the small DATA unit. |
+
+**Separate own-SEND unit is required.** In pinned createFinitePolicySetupTransport, qualified(c) invokes source.assertCurrent before SEND, after journal.issue, after each ACK, after activation pointer change and around finish. A general reader that rejects every pending effect cannot service this closure. A generic allowPending, ownedWriter boolean or reconstructed stored-row writer would erase the fence. Design the later recheck inside the real consumed-admission/retained writer closure, with exact local operation position, SEND hash, unchanged original holders/lease and only its own ACK transition. Other readers stay unavailable while the writer is unresolved. No public API change to assertCurrent(c) or caller-selectable phase is granted here.
+
+Required future transition proof: before upload, original third pointer; during own upload SEND, same predecessor and exact owned SEND with no activation; after upload ACK, exact uploaded candidate but same pointer; during activation SEND, only that writer may reconcile uncertainty without a second POST; after actual activation ACK/readback, exact acknowledged full pointer/configuration; after finish, exact PolicyReceipt. An absent/lost/foreign ACK never advances this state. Held response body/cancel/failure remains retained; failure recovery must not release the writer merely because the caller returned. This is a separate real producer/transport unit, not an implementation task hidden in this plan.
+
+## Proof levels and closure
+
+The small unit requires causal DATA RED/GREEN: old clone-and-patch cannot produce the full profile from exact closed prearm; the new builder does, without placeholders, namespace changes or changing full projection. It may be accepted while detached. The integration task additionally requires actual compileFiniteNativeStaging metafile evidence that the existing setup consumer imports the builder and that common/M gains no QA bootstrap/residency path. It also requires a real producer/harness causal test reaching actual derive from closed third evidence; existing syntheticFacts aliases/placeholder fixtures cannot qualify it. Until that separate producer unit exists, integration is inactive.
+
+Before ANY later claim of positive owner flow, require genuine original three owner receipts and Selection preceding primary T0, actual derive and full PolicyReceipt after T0, source-specific grant/notice/SDK and own-SEND tests, and complete unknown-writer cleanup. The four setup-facts cases (normal, changed grant, changed project revision, changed selection) return only through that flow; current pending test remains.
+
+Separately required before prearm acceptance: exercise actual compiled M with exact closed configuration through OAuth/monitoring HTTP, event list/subscribe/consume, AfwNodeControl, successor/save/schedule and finite native entrypoints. Demonstrate zero new grant, reservation, claim, Container start and nominal effect; preserve initial/historical records and separately permitted reductions. A pure flag test or the existing limited legacy-denial native test is insufficient. The actual compiled fixture and its trace observations are a later bounded proof gate; they do not need an operational provider or new Entry.
+
+Documentation closure means the spec/plan/report are committed and root can review them. Pure source-unit closure later means meaningful pure tests and independent root acceptance. Integration closure additionally requires actual producer/derive RED/GREEN and changed import-graph checks. Neither closure means full source production, restoration, hosted operation or PC-off.
+
+
+## Root source activation scope
+
+Root independently accepted first-phase factual context atreportfe0af3605368d563c911f8e8a308584d3d292038 afterfixround1. This containing commit activates ONLYTask1 pureDATAcontract; Task2 remains INACTIVE. One productwriter,GitHub/credential-freeActions only. No realQAalias/SDKsource/notice/prearm orbindingchange is activated here. Exact actualBASE is supplied in dispatch. Purehelpersecret/holder descriptors are not custody,permission ormodulebyteproof. M/common gains no productionimport ofthesedetachedmodules inTask1; nofullcompilerrepeatisneededforthisdata-onlyunit. Futureactualderiveintegrationneedsitsownnative/graphproof. Allhistoricalpins,profiles,currentreader/strictcleanupandtimersunchanged.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-04-finite-initial-owner-source.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-04-finite-initial-owner-source.md b/docs/superpowers/specs/2026-11-04-finite-initial-owner-source.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-04-finite-initial-owner-source.md
@@ -0,0 +1,29 @@
+# Fixed factual initial owner source — source-only next unit
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT finite source branch/cloudCI; ORIGIN delegated-canary.agentfriendlyweb.dev; RESOURCE_TYPE fixed IndependentClosure actor factual reader; RESOURCE_ID afw-own-successor-closure-v1. ALLOWED_ACTION source implementation and credential-free synthetic/native tests. ROLLBACK revert source unit before promotion; no actual provider request/permission/deploy/command/owner consent.
+
+Prerequisites: immutable initial capsule source accepted and accepted readonly helper/hostA integrated/reviewed. Record actual primary BASE at dispatch. Do not redo those accepted tasks.
+
+Implement only an UNMOUNTED fixed factual reader (suggested lib/mcp-qa-finite-initial-owner-source.mjs, readPrivateQaFiniteInitialOwnerSource({ctx,env,parent,preconnectionId})). Return exact private envelope {source,preconnectionId,capsuleHash}. Validate source with unchanged validateFiniteOwnerSource grammar; envelope metadata does not alter the source DTO/snapshot hashing grammar. No caller URLs/tokens/capsules/context/time/lease factories/genericRPC or public selector. The input parent is the actual trusted request lease, never browser metadata. All native holders and fixed namespace/actor/source/QA version are validated.
+
+Read the fixed immutable capsule and correlated initial Entry/Claim/Selector/Material/Ack/Plan/Arm/ActivationSend/Ack/Completion; verify existing strict codecs, hashes and all same-lineage anchors. Parse old records factually without calling expired B1/A authority or minting another Entry. Respect material/capsule original preconnectionId; optional trusted requested ID must match. Do not generate another ID. Preserve originalcontextQ program/revision/hash; do not substitute M.
+
+Source phase closed_ui, currentPublication stage=null/receiptHash=null with actual M UUID/deployment, initialBaseline actual M module/configuration/bindings commitments qualified against existing consumer conventions. Historical2607 is rollback, never the initialBaseline. Cross-check capsule commitments with actual fresh fixed primary QA/canary deployment/version/module/configuration observations in synthetic/native API fixtures; root has not authorized live calls for this unit. Preserve version vs saved settings semantics; don't normalize unrelated saved data. Fresh primary project owner/revision matches retained InitialMaterial ownerSelection; no trusting user-supplied ownership.
+
+Window startedAt=I0 and expiresAt=C0=I0+900000, bounded by original custody; C1 remainsC0+180000. Capsule recorded before technical initialDeadline remains factual after I0+300000 until C0. This reader MUST NOT restart or revive initial technical authority. Original incoming request wall/monotonic budget<=30s and child<=5s retained, deadlines not refreshed; backward clock/abort/holder drift deny. Establish accepted readonly retention only inside this fixed factual entry, before reads; retain the whole async lifecycle/cancellation and actual pending operations through settlement. It is not publication admission and must not wrap later ticket/approval/provider writes.
+
+Check cleanup is still same pending armed plan/state/alarm atC0, no finite HEAD/handoff/transition or contradictory owner-stage publication. Repeat fixed current anchors before returning stable source. No changing observedAt in source: consumers compare repeated source exactly. No ticket/approval/admission/storage write/forwarding/provider write/cleanup authority effects. Existing readPrivateQaFiniteOwnerSource and three forwarding exports, native mount and owner HTTP remain unavailable.
+
+Identified next separate bridge (not implemented by this unit): owner-http currently creates30s lease then calls prepareFiniteOwnerChoice; child retains return promise unchanged when no ALS scope. Genuine stage admission is minted only after POST ticket/approval writes, and policy-transport opens owner scope afterward. Incoming readonly scope cannot safely wrap prepare/transport or be converted to authority. Later unit must establish non-authorizing request retention at actual HTTP entry, before body/source/identity/storage; retain GET ticket and POST approval writes; perform explicit handoff using genuine consumed stage admission, same outstanding set/holders/original lease with no delete/recreate gap. Approval POST must be blocked BEFORE consumeTicket until cleanup handoff qualified. FirstGET must use original A ID/envelope hash rather than fresh opaque preconnectionId; ticket/projectRef handles remain independently opaque.
+
+Tests: valid factual read aftertechnical300s/beforeC0; C0 expiry without renewedclock; exact stable envelope/unchanged sourcegrammar/Mvsrollback/Aidentity; missing/malformed/conflicting anchors/changed primaryownerrevision/cleanuptransition/wrong namespaceversionholders/ID/hash deny; original request/child deadline andabort/backwardclock; deferred actual read retained aftertimeout excludes conflictingowner/readonly work untilsettlement; zero writes/admission/forwards/effects; existing seams stayunavailable. Qualify focused groups and changed graph compiler, no localclone/build/deps or subagents. Actual historical baseline/holders/controllerUnitB/live custody/fullbranch/cloudtrial/PCoff remain gates. Report docs/superpowers/reports/2026-11-04-finite-initial-owner-source.md; operationalReadiness=false;completePackage=false.
+
+## Exact projection mappings confirmed before implementation
+
+InitialMaterial.ownerSelection carries subject, project, clientId, resource, goal, access(teamDomain/audience), limiter. Use its actual fixed validated data plus fresh primary ownership/revision; no missing-data invention.
+
+programContext.programHash = material.originalContext.original.programHash; programContext.sourceRevision = material.originalContext.original.sourceRevision. Do NOT substitute originalContext.artifact's program/revision (M candidate), even when a fixture makes values equal. programContext.originalContextHash = existing afw.finite-original-context.v1 digest of originalContext projection with script omitted from artifact. Stored material.originalContext already has the strict five-field artifact without script. This exact relation is required by mcp-qa-finite-policy-setup.mjs:71–73. Test unequal historical original vs new artifact identities.
+
+Capsule.configurationHash uses Plan/restorationConfigurationHash semantics. Owner source initialBaseline.configurationHash instead MUST use activationConfigurationHash of the SAME actual freshly qualified M configuration, as required by mcp-qa-finite-policy-transport.mjs:79–82. First validate actual configuration against capsule restoration commitment; then derive the owner projection's activation hash. These are intentionally different conventions: never just copy an unlike hash or rewrite historical records to force equality. initialBaseline.bindingsHash follows plain SHA of complete name-sorted, key-canonical bindings, matching capsule and policy expectedFull. moduleHash uses actual M bytes. Add tests showing both commitments are verified in their correct roles.
+
+Trial ordering follows docs/superpowers/specs/2026-11-04-single-live-pcoff-sequence.md: all non-consuming prerequisites first; reserve consuming Entry for ONE coordinated owned PC-off occurrence, whose attended bootstrap/owner decisions are phases of that same occurrence. No separate full PC-on rehearsal/reset/rearm. Original I0/T0 clocks unchanged; root must observe timely ARM before asking shutdown. Current expired ceiling remains a live gate.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-04-finite-known-profile-compatibility.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-04-finite-known-profile-compatibility.md b/docs/superpowers/specs/2026-11-04-finite-known-profile-compatibility.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-04-finite-known-profile-compatibility.md
@@ -0,0 +1,96 @@
+# Fixed finite candidate compatibility through Known cancellation
+
+4 November 2026. SOURCE DESIGN ONLY; root review/activation required before the held implementer resumes. No product edit, test, build, workflow dispatch or runtime operation occurred in this design task.
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT isolated GitHub documentation branch; ORIGIN delegated-canary.agentfriendlyweb.dev not contacted; RESOURCE_TYPE source compatibility design; RESOURCE_ID qaLive/canaryLive and fixed release pipeline; ALLOWED_ACTION documentation only. Source baseline bd923bab7225212e35e054b14c132de78195ec5e, tree b6fd94de88c796d5c8708b815b8db4e9595b6f92. Rollback this documentation ref to that parent; prospective implementation rollback is reverting the source unit before any separately authorized promotion.
+
+Amends the original finite-request-signal-opt-in spec/plan at aed54dab23b644481aed01cf6b5b94249ecf9f23 and implements the [root hash compatibility ruling at 5560af6f](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/5560af6f44ec7fe7a81c52b6fa7a608b41f5bbf1/docs/superpowers/specs/2026-11-04-finite-signal-hash-compatibility-ruling.md). The [technical checkpoint at 3fb1751c](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/3fb1751c901059c9acdb2a9f1de2f6470b9f3c41/docs/superpowers/reports/2026-11-04-finite-request-signal-opt-in-checkpoint.md) is subsequent documentation, not inspected product source.
+
+## Decision and smallest next task
+
+Implement one bounded compatibility unit with three separately reviewable source checkpoints: strict fixed candidate primitives; shared Known lifecycle adapters; finite consumer/role integration and final qualification. The smallest useful next source task is checkpoint 1. A hash-only change is an independently testable prerequisite, not a completed opt-in fix. Checkpoints 2 and 3 are necessary before candidate lifecycle qualification. No generic configuration framework or new business stage is introduced.
+
+Keep all existing legacy exports and old-pair positive lifecycle coverage. Add fixed finite exports only where modules need a distinct callable boundary. Internally share existing algorithms and structural checks; select an immutable module-owned legacy or finite strategy only inside private implementations. No exported core/factory accepts a strategy, profile, hash, validator, operation override or callback for choosing compatibility. No environment variable, DTO, successful-validation probe or flag-array inspection chooses a role.
+
+QA date2026-09-07 flags exactly ["nodejs_compat","enable_request_signal"]; M date2026-09-07 flags exactly ["nodejs_compat","global_fetch_strictly_public","enable_request_signal"]. Array order remains exact. M candidate activation hashing uses all actual flags. Historical M remains exactly ["nodejs_compat","global_fetch_strictly_public"], with identical canonicalization and digest. Neither hash accepts the other profile; no normalization. QA configuration continues its existing QA/static fingerprint rules; the new activation hash is specifically M, not a QA hasher.
+
+## Fixed interfaces
+
+Existing input/result shapes below mean the exact shapes and error/outcome behavior at the pinned source, not newly extensible DTOs.
+
+| Module | Added fixed export | Contract |
+| --- | --- | --- |
+| lib/mcp-activation-observer.mjs | finiteActivationConfigurationHash(value) -> string | Same seven configuration fields, structural/plain-data/execution/binding/size checks and SHA-256 canonical algorithm as activationConfigurationHash; exact new M triple only. |
+| same | createFiniteActivationObserver({versionId,deploymentId,namespaceId,applicationId,configuration,readCredential,fetchImpl=globalThis.fetch}={}) -> async (input,signal) -> observation | Same observer interface/result as createActivationObserver. Candidate validation applies both before any request and to observed metadata. Existing fixed readers, target validation, bytes, bracketed deployment, 5s clock and cancellation stay unchanged. |
+| lib/mcp-release-operator-policy.mjs | validateFiniteReleaseOperatorBundle(bundle) -> true | Fixed confirm_named only; all existing artifact, target, hash, plan, manifest, identity and window checks using finiteActivationConfigurationHash. Reject publish and confirm. Throws same sanitized policy error. |
+| same | resolveFiniteNamedActivationPlan(bundle,namespace) -> frozen {plan,current} | Same pure identity resolution and drift checks as legacy; calls finite validation, never namespace.get or a business effect. |
+| same | validateFiniteNamedCancellationHistory(bundle,raw) -> true | Same complete history/grant correlation, using finite bundle validation. No authorization created. |
+| lib/mcp-release-successor-reservation.mjs | reserveFiniteReleaseSuccessor({bundle,env,namespace,readCredential,fetchImpl=globalThis.fetch,now=Date.now,signal,observation,authorize,cancellationHistory}={}) -> Promise<existing reservation result> | Shared existing reservation body, with fixed finite bundle/resolver/history functions. Preserves retirement provider/custody checks, atomic INSERT, exact-own-row logic and finite gate. No new options or authority. |
+| lib/mcp-release-runtime.mjs | runFiniteKnownCancellationReleaseWorkflow(options) -> Promise<existing Known outcome> | options remains exact own-data {bundle,env,event,step}; fixed confirm_named candidate path; no fifth argument. Same original event, private request lease, primary snapshots, eligibility closure, hooks, clocks and terminal outcomes. |
+
+Keep activationConfigurationHash, createActivationObserver, validateReleaseOperatorBundle, resolveNamedActivationPlan, validateNamedCancellationHistory, reserveReleaseSuccessor, runKnownCancellationReleaseWorkflow, runReleaseWorkflow and runReleaseOperator unchanged in callable contract and strict legacy behavior. In particular, generic legacy publish/confirm semantics remain.
+
+Implement shared PRIVATE bodies in those same existing files. The activation snapshot/hash/observer body receives only module-owned fixed flag selection; policy bodies receive a module-owned fixed hash selection and fixed operation restriction; reservation body receives only its local fixed validator/resolver/history selection. Runtime defines its own frozen LEGACY_RELEASE and FINITE_RELEASE selections referencing the appropriate fixed exports. Private runKnownCancellationReleaseWorkflowImpl(profile,options), runReleaseWorkflowImpl(profile,options) and runReleaseOperatorImpl(profile,bundle,env,args,lease,observation,authorize,cancellationHistory) contain the current bodies. Existing public functions pass LEGACY_RELEASE; the one new public Known function passes FINITE_RELEASE. Pass the same private selection through every nested call. Do not export runFiniteReleaseWorkflow, runFiniteReleaseOperator, a strategy object, lease mint, registry or configurable helper.
+
+The current knownRequestLeases WeakSet, creation before first await and removal on settlement remain private and shared with the existing mechanism. Do not replace the lease by a serializable profile/approval token. Fixed finite reservation is necessary because its module independently revalidates bundle, history and named identity. Fixed finite observer is necessary because it independently validates both approved and actual provider configuration. A wrapper around legacy validation alone cannot work.
+
+## Exact consumer map at pinned source
+
+| Source and line anchor | Required selection |
+| --- | --- |
+| mcp-qa-finite-initial-owner-source:138 | New candidate hash for initialBaseline.configurationHash. |
+| mcp-qa-finite-preparation-cleanup:39 | New candidate hash for capsule/initial baseline correlation. |
+| mcp-qa-finite-policy-setup:74,91 | New candidate hash for baseline receipt and expectedFull.activationHash. |
+| mcp-qa-finite-policy-setup:75 | KEEP legacy validateReleaseOperatorBundle for configuration-free publish artifact validation; do not alias the entire import. |
+| mcp-qa-finite-policy-transport:31,69,109,166 | Candidate configuration validation/hash for phase baseline, Plan correlation and wire. |
+| mcp-qa-finite-policy-transport:160-164 | Existing private closed=false role is candidate/current; closed=true is historical rollback. Validate BOTH returned metadata and expected pin under that exact role. |
+| mcp-qa-finite-policy-transport:222 | Fixed finite resolver and history validation after installation. |
+| mcp-qa-finite-preparation-records:120 | Replace undifferentiated [baseline,rollback] activation validation: baseline uses finite; rollback uses legacy. Keep restoration hash and record schema/digests. |
+| mcp-qa-finite-profile:56 | canaryLive privateFull.activationAlgorithm becomes exact string "finiteActivationConfigurationHash"; qaLive remains null. |
+| mcp-qa-finite-confirmation:55,73 | Fixed finite bundle validator, then runFiniteKnownCancellationReleaseWorkflow with the same env/event/step identities and exactly four keys. |
+| mcp-release-runtime:174,181,243,262 | Selected Known bundle/resolver/history and private Workflow body. |
+| mcp-release-runtime:95,101,132 | Selected Workflow bundle/history and private Operator body. |
+| mcp-release-runtime:48,50,57,74,81 | Selected Operator bundle/history/resolver/observer/reservation. |
+| mcp-release-successor-reservation:14,16,20 | Selected bundle/history/resolver in shared reservation body. |
+
+All module paths in the table are under lib/ with .mjs suffix. Line numbers are source anchors, not future diff line numbers. Scoped inventory41925030772/job126907057963 plus41925236121/job126907778764 and inspected imports establish this map. Recheck only these symbols and direct changed consumers before source edits; do not rescan the entire vault.
+
+For transport, keep configuration(value) candidate-only. Add private historicalConfiguration(value) using the legacy hash after the same seven-field projection; share a private projection helper if useful. readVersion(pin,lease,closed=false) chooses those fixed functions from its pre-existing internal role, then compares both same-role activation hashes. The historical branch must never call candidate configuration() first. Wire is always candidate. Do not infer closed from flags; existing readVersion(rollback,c,true) is the historical caller. Keep qualifyFiniteWorkerVersion's exact restoration pin/module comparison and basiccompatibility check unchanged.
+
+For SetupContext, explicitly validate baseline and rollback by property name rather than order/probing. The stored schema and hash domains do not change; old sealed records are not migrated or rewritten. Historical pins and their module/configuration checks remain independent. Structural activation validation is not a substitute for exact historical source/pin qualification.
+
+## Preserved invariants
+
+- All18 Known hooks: workflow_admission; operator_credential; operator_primary_read; operator_primary_result; activation_before_read; activation_after_read; activation_before_attempt; activation_after_attempt; activation_before_receipt; activation_after_receipt; activation_before_acceptance; activation_complete; successor_rpc; successor_rpc_complete; successor_before_retirement; successor_after_retirement; successor_before_write; successor_after_write.
+- Original event.timestamp+70000 parent ceiling, source window, monotonic narrowing, hydration/primary/provider/retirement5s children and activation20s child. No fresh parent, Date.now offset, replacement budget, retry, cancellation RPC or deadline-only substitute.
+- Two matching first-primary snapshots, current exact grant and monitoring consent, complete unfiltered cancellation history, original identity and namespace drift checks, non-reentrant authorization, original one-use/no-replay semantics.
+- Actual native admission/cancellation/retention remain: sender503 is not physical completion; retained read/fetch/body/cancellation stays occupied through actual settlement. No production bridge/receiver/retention algorithm edit.
+- Existing RELEASE_TARGET, fixed URLs/resource scope and guarded effect order remain. No general outbound, new approval/token/DTO authority, provider write, Entry/DDL/permission/credential/OAuth/OTP/cron/Max, new native mount, producer or other-project changes.
+- Three mutable phase settings and all physical/secret bindings unchanged. Full prearm and closed_ui/read_consent/notice_consent keep exact candidate flags.
+- lib/mcp-qa-finite-historical-source.mjs, lib/mcp-qa-cloud-closed-pins.mjs, worker/independent-closure/closed-rollback.mjs, worker/mcp-own/closed-rollback.mjs and original2607/c570 configuration artifacts/pins remain byte-identical to aed54dab and the inspected baseline.
+- Source ceiling2026-11-03T02:59:00Z remains expired. operationalReadiness=false; completePackage=false; PCoff=false. No reset or use of the reserved occurrence.
+
+## Qualification without removing legacy coverage
+
+Keep existing positive native legacy builder/Known/Workflow/Operator/observer/reservation tests under original profiles and hashes. Update source-anchor-only instrumentation and exact exported-name assertions only for the fixed addition; keep their semantic assertions. Never turn legacy success cases into blocked/pending tests, replace all legacy fixtures with the new triple, or claim rejection-only tests preserve behavior.
+
+Add a parallel fixed finite native test fixture using a test-only WorkflowEntrypoint that directly forwards {bundle,env:this.env,event,step} to the actual runFiniteKnownCancellationReleaseWorkflow. Reuse the existing isolated D1/native Workflow/retirement rehearsal privately, with a separately named finite fixture entry that fixes candidate flags/hash and QA/M runtime flags; no production builder or mount changes. It may reuse the existing test build callback seam; no production hash/validator/authorizer substitution. The finite test-only wrapper is explicit synthetic qualification, not a new runtime mount. The existing legacy buildMcpReleaseOperator continues to produce and positively qualify the historical path.
+
+The finite fixture must reach confirmed, one attempt/receipt/acceptance and one prepared reservation with mayBoot=false, unchanged immutable history, exact grant and all18 hook witness. Its event is an actual native Date with original ID/payload; primary reads use actual isolated D1. Provider/custody replies remain SYN. Also test missing/expired current grant, foreign identity, extra cancellation, queue/projection expiry before credentials/provider/journals; revocation pre/post INSERT; foreign reservation race; lost acknowledgement; late outer settlement and restart without a second effect. Reuse shared test scenario definitions where practical, retaining distinct legacy/finite case names.
+
+The finite confirmation wrapper's existing source-spy test qualifies exact four-key/identity handoff to the new fixed function and candidate bundle validation. The real readPrivateQaFiniteConfirmationMaterial still intentionally returns unavailable. Its negative test must remain. A positive isolated Known lifecycle plus synthetic source handoff does not claim a mounted, complete finite lifecycle or package. No source provider replacement is allowed in product.
+
+The existing actual sender-FIRST native opt-in evidence41922611657/job126898694059 and strengthened retention41923415932/job126901464107 are preserved; no duplicate flag experiment. Rerun affected boundary cases at final source as regression only. Positive native evidence is not final compatibility acceptance until the new consumers pass.
+
+Relevant hash/observer/policy/role tests must cover old/new cross-rejection, missing/extra/wrong/reordered flags, exact date, legacy golden digest, candidate digest independently computed from actual flags, non-mutation, secret/accessor rejection, valid private binding changes changing the full digest while public projection stays stable, and mixed rollback role swaps rejecting before mutation. Historical files/pins are compared by blob identity.
+
+One final actual compileFiniteNativeStaging at the implementation codeHEAD must preserve file/template equality, original2MiB M/3MiB QA limits, exact finite entry exports, source-before/after, bootstrap source and candidate residency guards. Existing closed package failure is expected; legacy index build cannot substitute. Report exact HEAD/tree/modulebytes/hashes and distinguish codeHEAD from later reportHEAD.
+
+## Open factual checks, not design choices
+
+Runtime behavior and final byte budget are not established by this document. The checkpoint initial-upload native group had a timeout after52 subtests; it is unresolved, not a passing assertion suite or proof of a product defect. Isolate the affected file and record terminal results; diagnose it before claiming that acceptance, without increasing product clocks or converting success to pending. The C2 producer/material source remains unavailable and is outside this unit. No human design choice is needed for the fixed compatibility path; root must review and activate the held source work.
+
+
+## Root activation ruling — 4 November 2026
+
+Root self-reviewed the fixed interfaces, consumer map and three checkpoint boundaries. Checkpoint1 is activated first as a prerequisite to the held signal opt-in task; it does not close that parent task. Later checkpoints require their own review gate. The existing blocked writer remains idle, and root assigns a fresh sole writer for Checkpoint1. Existing legacy APIs and positive lifecycle coverage remain strict. No source flags, runtime/reservation or finite consumer changes belong to Checkpoint1 beyond its two explicit source modules. Report path is docs/superpowers/reports/2026-11-04-finite-known-profile-c1.md. The documentation-only boundary in the design becomes source/tests execution scope for the assigned checkpoint; all remote effects remain prohibited. No human product decision is missing.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-04-finite-owner-native-conduit.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-04-finite-owner-native-conduit.md b/docs/superpowers/specs/2026-11-04-finite-owner-native-conduit.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-04-finite-owner-native-conduit.md
@@ -0,0 +1,58 @@
+# Fixed native owner conduit and original selector — Unit2b.1
+
+SOURCE-ONLY. PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT isolated GitHub source/credential-free Actions; ORIGIN delegated-canary.agentfriendlyweb.dev NOT contacted; RESOURCE_TYPE unmounted fixed native conduit, request lifetime and QA-only choice adapter; RESOURCE_ID existing AFW_FINITE_TRIAL_CONTROL / QA070c4a7708eb4592a3ded7c117a88225 / actor afw-own-successor-closure-v1 as source identities; ALLOWED_ACTION source/tests/credential-free Miniflare qualification. ROLLBACK revert source before promotion. No runtime/provider/Entry/DDL/token/permission/OAuth/OTP/cron/Max action.
+
+## Selected boundary and prerequisite
+
+Unit2a accepted source efcdadec029d88c3258566a05d688d70f125e7fa; do not repeat138acceptedcases. Architecture b60f8328df195307df62610968055b84ea766043, docs/superpowers/reports/2026-11-04-preparatory-native-composition-design.md on docs/finite-owner-cleanup-design-20261104. Root/architect follow-up chose fixed QA-only adapter plus one named common implementation continuation to avoid importing QA bootstrap/residency into M/common graph.
+
+Deliver an UNMOUNTED pending-only conduit and exact original-A choice plumbing. Real finite default Worker/DO mounts, positive forms/POSTs, SDK/issuer/notice/phase-source/publication/cleanup composition remain later. Native fixture mounts exercise actual production conduit/receiver helpers at both Worker/DO ends, not a mocked forward function; fixture success is not deployed provenance. Do not quietly wire ordinary grants or change production worker defaults in this slice. Root narrows mounting to preserve closed behavior until full cleanup and native cancellation gates are met. No callback/DTO/readiness flag can enable a business action.
+
+## Original lifetime translation
+
+In lib/mcp-qa-finite-owner-preparation.mjs keep createFiniteOwnerRequestLease(request) and existing context/deadline APIs compatible. Add readFiniteOwnerRequestBoundary(lease) returning frozen strict own DATA {startedAt,deadline,remainingMs} ONLY from its registered actual root/descendant control. startedAt is original root wall entry; deadline is current clipped original absolute deadline; remainingMs is integer floor of min(remaining wall, remaining original monotonic budget), never >30000 or refreshed at send. No token/root/WeakMap identity serializes.
+
+Add createFiniteOwnerForwardedRequestLease(request,boundary), only for the fixed native receiving entry. Strict own-data exact fields, integer clocks, no getters/prototype/symbol extras. Deny future/backward/inconsistent starts, spans>30000, deadline<=now, remaining<=0 or >original span. New LOCAL request root/brand, not transported sender permission. Receiver end <=min(original absolute deadline, receipt wall+transmitted remainingMs, receipt wall+30000); monotonic receipt elapsed can only shorten. Keep actual incoming Request.signal linked; no clock-skew adjustment or new30s budget. Existing child<=5000 and same original end. finish aborts logical guards/deletes request admission; actual retained promises stay occupied until physical settlement. Clone/foreign expired boundary DATA creates no business authority.
+
+## Fixed pending native conduit
+
+Create lib/mcp-qa-finite-owner-native-bridge.mjs, no QA/bootstrap/residency imports. Export forwardFiniteOwnerChoice({request,env,ctx},originalLease). No caller URL/method/namespace/actor/version/phase/source/grantId/fetch/SQL/clock override. Only original canonical https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare GET/POST without query/hash. Fixed internal POST target https://afw-private.invalid/_finite-owner/choice; target is bookkeeping transport, not public origin/route.
+
+Capture actual env.AFW_FINITE_TRIAL_CONTROL namespace/idFromName/get/stub.fetch, exact actor name, env.AFW_FINITE_TRIAL_VERSION.id and actual M DB/OAUTH_KV/DELEGATED_RATE_LIMITER holders. Recheck across awaits. Never fake QA ctx.storage or env.RELEASE_DB in M. Retain whole actual native fetch/body/cancellation under the original parent before any race; use actual ctx.waitUntil where applicable, without claiming indefinite runtime survival or physical settlement from abort. Bounded original body once<=16384bytes, canonical metadata<=2048bytes, response<=16384bytes. Preserve known first HTTP/body error promptly while retaining its actual cancellation; do not overwrite with a later503 or synchronous cancel error. No raw credential/JWT/cookie/form in durable storage, logs or replies.
+
+Construct new Request, strip ALL caller x-afw-finite-* headers, overwrite fixed metadata from actual original lease/URL/method/version and server UUID correlation. Use exact header names x-afw-finite-boundary (canonical JSON boundary), x-afw-finite-original-method, x-afw-finite-original-url, x-afw-finite-version, x-afw-finite-request-id. Preserve only original Cf-Access-Jwt-Assertion, Origin, Cookie and Content-Type required by later fixed verifier, not arbitrary caller headers. Pass actual originalLease.signal explicitly. All target/action values are compiled fixed choices. Metadata is correlation/lifetime DATA, never caller approval.
+
+Create lib/mcp-qa-finite-owner-native-receiver.mjs exporting createFiniteOwnerNativeReceiver({ctx,env}) with fetch(request). Fixed actual actor/self namespace/holder capture and strict fixed path/POST/header shape; rejects unknown private headers, oversized metadata, malformed version/request UUID/originalURL/method/body. Establish translated local parent before body/storage/source I/O. Actual QA ctx.storage/env.RELEASE_DB holders remain native; keep existing observeFiniteOwnerRequestWork retention. Return bounded503 admin_pending/mayRetry:false/operationalReadiness:false; NEVER call choice adapter, create/consume ticket, SDK, Unit2a issuer or provider in this slice. No source envelope/headers/credentials in response. Unknown route404, malformed envelope400, unsupported source/holder/deadline503/403 as existing failure grammar permits. Pending conduit does not prove actual JWT/CSRF/currentM publication approval; that verifier remains mandatory before later positive dispatch. It cannot fall back to ordinary APIs.
+
+Do not add worker mounts, compatibility flags, profile changes or arbitrary dispatch registries. If actual receiver abort propagation is unsupported/inconclusive, preserve that explicit qualification blocker and keep business producer unavailable. Do not substitute an independent timer, generic cancellation RPC or claim sender rejection proves receiver cancellation.
+
+## QA-only original-context adapter
+
+Create lib/mcp-qa-finite-owner-preparation-qa.mjs with:
+preparePrivateQaFiniteOwnerChoice({ctx,env,request},originalLease).
+It lexically supplies (parent,preconnectionId)=>readPrivateQaFiniteInitialOwnerSource({ctx,env,parent,...exact optional selector}) and calls:
+continuePrivateQaFiniteOwnerChoice({ctx,env,request},originalLease,readOwnedContext)
+new internal export from common owner-preparation. This is fixed implementation callgraph, NOT HTTP/RPC field, dependency factory, registry or source authorization object. Do not move the factual reader into common owner-source.mjs. Keep ordinary prepareFiniteOwnerChoice(options,lease) two-argument API bound to unavailable source; extra arguments cannot select private continuation. Keep unavailable forward/source exports unchanged. No caller-supplied reader in worker/HTTP/RPC.
+
+Privately thread separate ownedContext through resolve/ticketContext/stageContext/private choice implementation; reject simultaneous setup-ownedSource/context overrides. Preserve existing trusted setup ownedSource path/signature. Validate exact envelope {source,preconnectionId,capsuleHash} (strict own data/hex), separately validateFiniteOwnerSource(source), retain association privately and compare source+selector+capsuleHash after every relevant await. Inner source grammar unchanged. Requested ticket selector MUST equal actual original A selector. First private GET uses envelope.preconnectionId, no opaque fallback/new occurrence; ticket handles/projectRef remain opaque. Initial factual reader remains strict closed_ui, not generalized to later stages or stage approvals. Positive real POST/form is not required/allowed here; later source producer is independently necessary.
+
+## Already-owner factual borrowing
+
+In observeFiniteFactualReadWork (lib/mcp-qa-finite-stage-work.mjs), additionally permit mode owner ONLY for SAME scopes.getStore()===outstanding entry, exact ctx/env/storage/RELEASE_DB/original request root, registered request lineage, current original and child guard and existing entry.admission.lease current. Preserve mode/admission, no new admission argument or readonly upgrade. Fresh request/foreign root/read-only/retired entry/holder drift denied. Retain same actual promises, no release on logical abort while work outstanding. This enables a factual recheck after genuine in-place adoption; by itself it does not make initial source reader accept later stage history.
+
+## Native tests and evidence
+
+Use existing Node22/lockfile/esbuild/Miniflare in GitHub, no local dependencies. Causal featureRED for absent forwarded lease/exact private selector or owner borrowing; earlier diagnostic syntax/hangs are NOT featureRED. Existing accepted cases need not rerun.
+
+1. Strict boundary/accessor rejection, real registered roots/descendants, 29s spent=><=1s receiver, earlier child end, backwards/future/expired/time-span fields, original abort/deadline, no serialized admission.
+2. Actual production bridge and pending receiver imported into two real native Worker/DO fixture ends. Verify fixed namespace/actor/path, caller private metadata overwritten, invalid method/origin/query denied, holder/version drift, sizes, response-error/cancel retention and zero business rows/provider calls. Synthetic fixture identities explicitly labeled.
+3. Native cancellation capability under EXACT unchanged profile dates/flags. Independently observe receiver.signal during held read and immediately before guarded mutation marker. Sender rejected fetch alone not proof. Preserve inconclusive/unsupported report and closed producer if the platform does not establish propagation. Any different flag/mechanism is separate reviewed design.
+4. Exact private originalA firstGET integration under actual initial-capsule fixture where feasible; envelope selector mismatch, capsuleHash change, malformed/accessor source, inner unknown fields rejected. Ticket/project refs unrelated; ordinary public export stays unavailable even if given third argument. General later-phase/positivePOST claims excluded.
+5. Genuine one-use admission then same-request adoption then factual borrow; clone/foreign root/ctx/storage/DB/admission expiry/readonly path denied; held actual read remains retained after logical finish until settlement. Do not substitute a success-shaped owner DTO for genuine adoption.
+6. Scoped existing owner request/initial-source/preparation regressions, lint before expensive tests, one changed-graph compile with correct finite entry if common/QA graph changes. Common/canary graph must not import QA bootstrap/residency due adapter; original compiler guards/limits immutable.
+
+Report exact BASE/code/reportHEAD/jobs/attempt/counts/warnings, root capability probe provenance/limitations, zero product mounts/remote effects and remaining positive composition gates. Remove temporary qualifiers. Fresh independent review before next source unit. Source ceiling2026-11-03T02:59:00Z unchanged/expired; operationalReadiness=false;completePackage=false;PCoff=false.
+
+
+## Root native preflight limitation
+Source diagnostic report docs/superpowers/reports/2026-11-04-native-signal-capability-preflight.md is INCONCLUSIVE. Instrumented runtime became ready, then mf.getWorker('sender') waited before any sender/receiver marker and even Node watchdog didnotadvance; jobcancelledatbound. Do not rerun that qualifier. Use existing successful mf.dispatchFetch pattern with sender as FIRST/default worker for the actual two-end product fixture. This is an evidence-driven different harness path, not a product timeout fix or changed configuration. Actual default Worker request-entry mounting remains later; this unit must not claim it has replaced ordinary finite granting fallback. Rootprobe syntax/YAML/timedoutattempts are not featureRED. Independent native cancellation qualification still required before any later business producer.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-04-finite-owner-phase-context.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-04-finite-owner-phase-context.md b/docs/superpowers/specs/2026-11-04-finite-owner-phase-context.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-04-finite-owner-phase-context.md
@@ -0,0 +1,141 @@
+# Finite owner factual phase context — bounded next source slice
+
+2026-11-04. DESIGN ONLY; no source implementation, build, test run, native qualification or runtime action is claimed.
+
+## Boundary and decision
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT GitHub source/docs; ORIGIN delegated-canary.agentfriendlyweb.dev, not contacted; RESOURCE_TYPE documentation branch; RESOURCE_ID docs/finite-phase-context-plan-20261104; ALLOWED_ACTION connected pinned-source reads and docs-only expected-head commits; ROLLBACK revert this documentation commit. Product baseline is aed54dab23b644481aed01cf6b5b94249ecf9f23 on feat/finite-native-cleanup-20261101, which this task does not write.
+
+Read architecture report [preparatory native composition](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/b60f8328df195307df62610968055b84ea766043/docs/superpowers/reports/2026-11-04-preparatory-native-composition-design.md) first. This specification translates its factual-source boundary; it does not repeat Unit 2a or accepted Unit 2b.1, and does not implement SDK issuance, publication continuation or cleanup.
+
+**Selected smallest unit:** a QA-only original-capsule context reader that qualifies closed_ui and the exact settled first connection publication (read_consent), plus validates any present original issuer/grant factual prefix without issuing or completing it. Later notices/finite publication prefixes return unavailable in this unit. Their exact required semantics are recorded below; no unsupported phase gets a success fixture.
+
+This narrower finish is deliberate. At the pinned baseline, the strict initial reader rejects all stage approvals and policy-effect rows; the private QA adapter calls it lexically. A separate factual reader can remove that consumer dead end without mounting an effect. Completing notices/finite positive qualification would presently require a further private configuration decision and notice issuer correlation, beyond an independently reviewable first-source task.
+
+## Global constraints
+
+- The exact private envelope is {source,preconnectionId,capsuleHash}; validateFiniteOwnerSource keeps its strict inner grammar.
+- Common/M must never import QA bootstrap or candidate-residency decoding modules.
+- Strict standalone readPrivateQaFiniteInitialOwnerSource and its absence checks remain unchanged.
+- Pending-only conduit, GET-only private continuation and private POST rejection remain unchanged.
+- No SDK issuance, native mount, provider mutation, permission boolean, callback/DTO authority or new admission.
+- Original I0/C0/C1, technical I0+300000, parent <=30000ms, child <=5000ms, commandBy-510000, nominal and launch clocks/counters remain unchanged.
+- Historical2607/c570 and QA_CLOUD_CLOSED_PINS remain immutable; source ceiling2026-11-03T02:59:00Z is expired; single consuming Entry remains reserved.
+- Exact candidate profile follows the eventually root-accepted incoming Request.signal qualification revision; no hardcoded old flag set or duplicate opt-in experiment.
+- No activation before that source qualification and root review; no remote schema, permissions, tokens, OAuth, OTP, cron, Max or other-project action.
+
+## Actual interfaces and separation
+
+Inspected at the baseline:
+
+- lib/mcp-qa-finite-owner-preparation-qa.mjs exports preparePrivateQaFiniteOwnerChoice({ctx,env,request},originalLease). Its lexical reader currently invokes readPrivateQaFiniteInitialOwnerSource({ctx,env,parent,...selector}).
+- lib/mcp-qa-finite-owner-preparation.mjs already exports continuePrivateQaFiniteOwnerChoice({ctx,env,request},lease,readOwnedContext), rejects non-GET before calling the reader, retains the strict envelope, uses original A on first GET, and rechecks capsule/selector/source across awaits. Do not redo this accepted implementation or expose that lexical callback over transport.
+- readPrivateQaFiniteInitialAnchors({ctx,env},originalLease) in lib/mcp-qa-finite-initial-anchors.mjs returns {capsule,entry,claim,selector,materialAck,material,plan,state,zero,records,actorId,alarm,anchors}. Its compiled descriptor is DATA, not actual residency, provider or credential qualification.
+- readPrivateQaFinitePreparationCleanup(options,originalLease) is deliberately strict: it rejects policy-effect rows and later stage/grant/notice rows. Do not call the whole reader to qualify a later phase or loosen its cleanup contract.
+- stageHistory(c,count) currently uses c.source and c.step, then compares currentPublication. Its caller reaches resolve. The new producer must not call stageHistory, readFiniteOwnerPreparationFacts, stageContext or resolve.
+- createFinitePolicyEffectJournal(...).read(lease) returns {state,send,ack,receipt}; it performs a read-only storage transaction. Its decoded records alone are not proof of actual provider state.
+- createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId},lease) supplies the existing exact reservation/freeze/operations inventory. Use this read method only; do not call issuer-store mutations or attempt to reconstruct private consumption/barrier witnesses.
+
+Add QA-only lib/mcp-qa-finite-owner-phase-context.mjs:
+
+```js
+export async function readPrivateQaFiniteOwnerContext(
+  {ctx,env,parent,preconnectionId = null}
+) // Promise<Readonly<{source,preconnectionId,capsuleHash}>>
+```
+
+Accept exactly those own data fields (selector may be omitted); reject accessors, extras, wrong selectors and unregistered request parents before external I/O. Selector is a consistency check against capsule/A, never a lookup fallback. Repeated reads can return fresh equal envelopes; no serialized envelope authorizes later work. On incomplete, conflicting or unsupported phase facts throw the existing-style unavailable error, allowing the fixed caller to remain pending; never return a weaker source or a success-shaped partial context.
+
+Change only the QA adapter's lexical import/call to this function. Keep lib/mcp-qa-finite-owner-source.mjs unavailable: changing its common export into a QA import would pull bootstrap/residency into M. Do not add runtime registration, dependency injection, URL-supplied phase or a generic source factory.
+
+Add a small pure shared module lib/mcp-qa-finite-owner-stage-facts.mjs:
+
+```js
+export function qualifyFiniteOwnerInstalledStage({
+  source, preconnection, sourceSnapshot, initialTicket, connection,
+  stage, stageApproval, approval, ticket, ticketUse,
+  upload, activation, predecessors, grantLink, noticeLink, observedAt
+}) // Readonly<ConnectionReceipt>, or throw
+```
+
+Add lib/mcp-qa-finite-preparation-enrollment-facts.mjs with the pure shared validator:
+
+```js
+export function qualifyFinitePreparationEnrollmentFacts({
+  anchors, enrollment, ack, preconnection, sourceSnapshot,
+  stageApproval, approval, ticket, ticketUse, projectRef
+}) // Readonly<{enrollment,ack}>, or throw; ack may be null
+```
+
+anchors is the DATA result of readPrivateQaFiniteInitialAnchors (without a new lease or capability). Other values use their existing codecs. Extract the strict cleanup reader's original capsule/plan/arm/completion/zero-state, subject/realm/project/client/resource, snapshot/decision/ticket-use, enrollment hash and ACK predicates into this helper. The strict reader retains its existing inventory, stage absence, cleanup-state and reread gates unchanged around the helper; the new context reader supplies its separately qualified phase inventory. Never add a relax/phase option to the strict reader. Neither helper returns permission.
+
+All arguments are strict DATA: source is the strict source grammar, preconnection/sourceSnapshot/tickets/approvals/links use existing preparation codecs; connection is ConnectionRef or null; upload/activation are exact {state,send,ack,receipt} observations; predecessors is the ordered preceding ConnectionReceipt array; links are exact records or null; observedAt is an integer observation time. No I/O, callback, lease, resolver, env, authority result or configurable policy. Extract existing stageHistory predicates for decision/ticket-use, source/subject/project, stage ordering, original predecessor, contextHash and both journals. Add receipt completedAt >= both ACK times, correct receipt module/configuration correlation checked by the QA caller, and exact original expiry bounds. Existing stageHistory still gathers its facts and performs its final currentPublication check, but uses this pure qualifier per stage. Its return shape and setup-ownedSource behavior remain unchanged.
+
+Do not export a general primary-reader factory. Fixed provider/D1 routines stay lexical in the QA context module. The new module may import the QA bootstrap/resident readers because only the QA adapter imports it. The common pure helper must not.
+
+## Factual derivation and bounded inventory
+
+Start from the genuine original incoming parent/root and accepted observeFiniteFactualReadWork. Capture real storage/actor/self namespace/RELEASE_DB/node/version/custody/fetch holders; check them and the original guard before and after every await. Use existing retained whole-operation behavior and child deadlines. Same-ambient genuine-owner borrow remains as accepted; no new admission argument, request root or readonly upgrade.
+
+Read the original anchors, require zero initial recovery state, unchanged alarm C0 and exactly the original six initial cleanup records. Deny any restore/freeze/cleanup progress, nominal trial head or source-selection. Narrow by original C0, actual credential expiry and actual owner/approval/permission expiries, never extending the parent.
+
+Validate the original retained backup using decodeFiniteInitialUploadRecord from lib/mcp-qa-finite-initial-upload-records.mjs: exact upload Receipt/Backup under afw.finite-initial-upload.v1:<plan.entryHash>:, manifestHash == plan.manifestHash, original material and candidate/configuration tuple, and historical baseline version/deployment. Read only the manifest's exact chunk indices (<=64, <=32768 bytes each, <=2097152 total), verify each chunk manifest/hash/size and assembled original module hash/length; validate raw/normalized configuration hashes with the existing immutable historical-pin codec. This is recoverable backup DATA, not a restore action or current restoration qualification. Include raw backup/chunk facts in the final consistency check.
+
+Qualify actual resident bytes against original capsule/plan and compiled revision/tree. Independently verify both token identities/expiry, current QA pointer and QA module/configuration against original Q. Qualify original M metadata/bytes/configuration against plan, even when it is no longer current. The initialBaseline is always capsule.activatedVersionId/deploymentId plus original module, finiteActivationConfigurationHash(plan.configuration) and original bindings hash. It must never become the latest receipt. Program context comes from material.originalContext.original and original-context hash, not the current artifact's program hash. Window remains {startedAt:capsule.I0,expiresAt:capsule.C0}.
+
+Use bounded exact record inventories with overflow-as-unavailable: current original A connection prefix (maximum16), policy-effect prefix (maximum32 plus overflow sentinel), preparation enrollment prefix (maximum2 plus sentinel), exact current issuer family through its existing bounded journal read. Validate every inventoried key; reject foreign identity, extra stages/keys, orphan ACK/receipt, failures, wrong writer-head or unknown SEND. Read referenced ticket/use/projectRef/approval/authorization/connection keys only after their exact IDs/hashes are derived. Re-read anchors, relevant raw inventory, provider pointer/configuration and primary facts before returning; any drift denies rather than retrying.
+
+Enrollment is optional before original approval; when present, decode Enrollment/Ack with the existing codecs and call qualifyFinitePreparationEnrollmentFacts for the exact original-anchor/preconnection/decision bindings shared with the strict cleanup reader. Do not invoke that reader for read_consent. A connection publication requires both exact enrollment and ACK. Enrollment without its ACK does not become publication permission. Data is not cleaned, repaired or rewritten by this reader.
+
+Each current owner/consent/grant/event/fence observation uses a NEW captured RELEASE_DB.withSession('first-primary') session with SELECT as its first query. A later read on the same session is not described as physically primary. Use fixed selectors derived from original A/issuer identity, never owner/client-wide recovery scans. Current owner/project/revision must match original material selection. Present AuthorizationLink, consent, issuer reservation, OPEN fence, consumed consent, grant, GrantLink and connection relation are independently compared against each other and original enrollment. Missing later facts do not fabricate them. Unknown issuer SEND/ACK or orphan business rows make the snapshot unavailable; consumed consent without a grant remains a terminal factual prefix, never repaired or reissued. Freeze/terminal fence/revoked/expired grant denies usable context.
+
+For a wholly absent issuer/grant prefix, read_consent is a publication fact only. For a present partial prefix, validate its actual rows and exact operation journal; a qualifying source still does not imply eligibility for notices or any grant action. GrantLink/relation without exact reserved grant/consent, or a second unrelated reserved identity, is rejected. Notice-specific journal operations are not added to Unit 2a by this task.
+
+## Phase predicates
+
+| Phase | Facts required | This task |
+| --- | --- | --- |
+| closed_ui | Actual pointer is original capsule M; no publication SEND/ACK/receipt; exact original ticket/approval/enrollment prefixes may exist; no grant/notice or nominal effects. | Produce context. Approval alone must not break the reader. |
+| read_consent | Exactly installed connection receipt after original M, upload ACK + activation SEND/ACK/receipt and original decision/enrollment; actual pointer/bytes/configuration match receipt. OAuth preparation enabled; monitoring/events/nominal writers disabled. | Produce context; validate present original issuer/grant prefixes without completing them. |
+| notice_consent | Exact connection then notices chain; exact current consumed authorization, reserved grant, GrantLink/relation; monitoring policy pins original grant/project/client and expiry; actual notice is separately required for next-stage eligibility. | Unavailable. No guessed monitoring issuer/notice authority. |
+| finite_prearm | Later separate design: three exact publications plus grant/notice/approval/audit facts and exact CLOSED third prearm. Genuine full private canaryLive policy is a DISTINCT later setup publication after primary T0; it cannot be required before Selection. | Unavailable. No prearm/full conversion is implemented here. |
+
+For the first connection publication, derive expected read_consent configuration by cloning original qualified plan.configuration and changing only AFW_DELEGATED_OAUTH_ENABLED to 'true'. The allowed mutable-field family for the first two preparation publications is AFW_DELEGATED_OAUTH_ENABLED, AFW_DOSSIER_MONITORING_OWNER_ENABLED and AFW_DOSSIER_MONITORING_OWNER_POLICY; all other configuration/binding bytes and module bytes remain exact. Qualify with qualifyFiniteConnectionProfile({phase:'read_consent',metadata}); compare actual activation configuration hash to the receipt and exact expected config. Do not use receipt hash equality as a substitute for full primary metadata.
+
+**Third-stage unresolved mismatch:** projectFinitePublicConfiguration({role:'canaryLive',metadata}) requires nonempty private-slot strings. The historical test fixture finite-connection-source.mjs inserts SYNTHETIC-PRIVATE-<name>; it does not prove empty prearm policy fields or nominal denial. Therefore this task must not synthesize a configuration that happens to pass the public projection or weaken its grammar. A later root-reviewed design must reconcile exact prearm private fields with actual candidate residency/public-static/full expectations and prove actual compiled denial. The historical fixture is test provenance, not a qualified source producer.
+
+## Later interfaces, explicitly excluded
+
+Future issuer/notice composition consumes the same private envelope and original selector lexically; it derives current owner/SDK/cookie/CSRF independently and uses the original lease. It cannot accept envelope data as approval. The existing readPrivateQaFiniteConnectionSource({ctx,env,preconnectionId,stage},lease) boundary still needs fixed {ownerSource,baseline,rollback,candidate,bytes,assertCurrent}; this task does not implement it.
+
+Own-in-flight publication recheck remains private inside the actual consumed-admission/retained writer closure. After its own SEND, the general reader remains unavailable; later writer code must recheck exact local journal, unchanged predecessor and live original admission at the precise operation position. No allowPending/allowOwnedWriter boolean, source option, reconstructed owner or externally callable recheck.
+
+Complete cleanup consumer, fixedPolicyEngine failure/cancellation correction, notice issuer extension, SDK uncertainty classification, three-stage positives and four setup-facts cases remain later. None is closed by this context reader.
+
+## Meaningful source verification and honest closure
+
+Use native workerd/DO/D1 fixtures with the actual context module, pure qualifier, record codecs and journals; inject only explicit synthetic external provider/custody responses and isolated initial material. Do not replace the reader/qualifiers or return ready/source DTOs. Construct first-stage test records through actual preparation/journal APIs; their synthetic origin must be labelled, never described as a genuine mounted owner publication. The runtime writer remains pending.
+
+Required proofs: original closed source; valid original approval/enrollment still closed; exact settled first chain read_consent; original baseline/program/window unchanged; wrong predecessor/context/ACK/receipt, unknown SEND, extra/orphan rows, QA drift, foreign actor/holder and fresh primary owner/revision/expiry drift deny; partial issuer prefixes cannot claim grant/notice; retained held fetch/body/cancel and original budget/abort; strict standalone reader still denies approvals/publications; later stage inputs deny. Assert unchanged business/storage snapshots and zero provider non-GETs during every context read. Native source test may seed evidence as fixture DATA; it must not claim end-to-end production of that evidence.
+
+Gate against the root-accepted candidate profile revision and exact cloud Actions run. Reuse existing conduit/POST/retention tests, but do not rerun the independent incoming-signal experiment as this task. Run one changed-graph compiler/residency check because QA imports change; assert common/M has no new QA bootstrap/residency edge. Keep source-only tests separate from future remote activation.
+
+Close only when the two supported phases pass meaningful native tests, all denials and pending guards remain, root review accepts the source diff/profile provenance, and exact head/run/check evidence is recorded. This closes factual context for the first publication, not notice/finite qualification, SDK/native production, restoration, PC-off or operationalReadiness.
+
+
+## Root self-review clarifications before implementation
+
+- An absent issuer reservation provides no reserved grant UUID to query. Do not invent a selector or scan all grants by owner/client to prove global absence. Validate every referenced original issuer/consent/grant/link row; with no issuer prefix, report only the factual publication phase, never global permission absence or next-stage eligibility. Unknown references and inconsistent related rows deny.
+- Use the actual existing preparation-store signature `{storage,now}` only lexically with captured native storage and the existing server clock; do not expose storage/clock injection in the new fixed context reader.
+- Deliver the implementation report at `docs/superpowers/reports/2026-11-04-finite-owner-phase-context.md`: exact BASE/code/report HEAD, causal failures, run/job/attempt and commands/counts/warnings, source/profile provenance and actual-versus-SYN limits. Remove temporary qualifiers. Root independent review is mandatory; no self-acceptance.
+
+
+## Root compatibility handoff and causal-cycle correction (4 November 2026)
+
+Checkpoint3 finite Known consumer integration is independently accepted at report949d84784e83f8859421242edeab3f68c5db93a3; its exact compilerhead is6d17d438becca708da5baae70129c73fc118bf98/treeb67e2d939637b07695b9cabe645aa879d96962ef. C1/C2/C3 each have separate clean task reviews. Original signal/profile slice is independently SpecPass / QualityApproved with six final patches and root composition acceptance. Root activates this task in the containing docs commit and supplies its actual source BASE. Do not start from the old architecture-inspection head or assign prior compiler hashes to a new tree.
+
+Use the accepted fixed `finiteActivationConfigurationHash` for original M preparation and first installed candidate configurations. Historical rollback metadata remains on the legacy fixed `activationConfigurationHash` through the already accepted explicit role consumers; no broad old-or-new fallback or normalization. Do not alter candidate flag/profile files or requalify incoming signal as an independent task.
+
+The later dependency report `docs/superpowers/reports/2026-11-04-finite-prearm-setup-dependency.md` supersedes the older proposed third-stage full-policy requirement: Selection precedes primary T0, and genuine full derive depends on that T0. A future exact CLOSED prearm and distinct full setup conversion need separate implementation/review; the two supported phases in this task do not close that gap. All notice/prearm inputs still return unavailable.
+
+Ruling: preparation reader and pure predicate extraction comprise one reviewed deliverable, using only the existing lexical QA adapter and one product writer. This creates no effect route. Fixed private DATA qualification does not authorize SDK issuance, native publication or cleanup. Cost if wrong: source rework on the feature branch; no remote effect is allowed by this handoff.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-04-finite-owner-sdk-owned-recheck.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-04-finite-owner-sdk-owned-recheck.md b/docs/superpowers/specs/2026-11-04-finite-owner-sdk-owned-recheck.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-04-finite-owner-sdk-owned-recheck.md
@@ -0,0 +1,111 @@
+# Finite owner SDK owned recheck — D0.2 supplement
+
+4 November 2026. DESIGN ONLY. Inspected product source **33fece006e8ccb74c6f91546002469d89939c059**, specifically the accepted 279-line [phase reader](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/33fece006e8ccb74c6f91546002469d89939c059/lib/mcp-qa-finite-owner-phase-context.mjs). Supplements [D0](2026-11-04-finite-owner-sdk-trust-boundary.md); changes no product code or operational access. A/B remain inactive until root integrates D0.
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT GitHub docs; RESOURCE_ID docs/finite-fenced-owner-issuer-notice-20261104; ALLOWED_ACTION fixed source reads and three new docs with expected-head CAS. Rollback is a docs revert. No advancing product reads, test/build/runtime/provider/binding/credential/DDL/Entry actions.
+
+## Decision: same-module lexical composition
+
+Keep one physical observation implementation in lib/mcp-qa-finite-owner-phase-context.mjs. Move its existing nested I/O/qualification blocks into non-exported fixed helpers in that same module. Add the fixed QA OAuth handler there, next to the unchanged strict reader export. The proposed oauth-qa.mjs retains the native receiver and imports that fixed handler. It does not receive raw observation frames or own-recheck capability.
+
+Exact interfaces:
+
+```js
+// Existing public-to-QA-module API; same input/output contract.
+export async function readPrivateQaFiniteOwnerContext(
+ {ctx, env, parent, preconnectionId} // preconnectionId remains optional
+); // -> frozen {source, preconnectionId, capsuleHash}
+
+// Fixed QA handler; receiver supplies genuine original registered lease.
+export async function handlePrivateQaFiniteOwnerOAuth(
+ {request, env, ctx}, originalLease
+); // -> Response
+
+// ALL following functions are module-private, not exported.
+async function observeOwnerPhasePair(
+ {ctx, env, parent, preconnectionId}
+); // -> private immutable ObservationPair DATA
+function qualifySettledOwnerPair(pair); // -> existing reader DTO or throw
+
+// Nested inside EACH actual handlePrivateQaFiniteOwnerOAuth invocation:
+async function recheckOwned(); // -> void; no caller arguments
+```
+
+There is no source factory, injected verifier, callback, mode, allowPending, ownedWriter flag, public recheck token, actor-wide continuation registry or method to hydrate state from journal rows. A new request has a new lexical stack and must pass qualifySettledOwnerPair before claiming any work.
+
+## One observation engine, two consumers
+
+Today facts, primary, issuerPrimary and qualify are nested inside the reader. issuerPrimary rejects SEND without ACK; qualify also performs actual store reads. Extract their I/O once. Keep common source/phase/identity validation separate from the final settled-operation rule. Do not duplicate the 279-line engine or run the strict reader and catch its denial as permission.
+
+observeOwnerPhasePair always performs the current capture/holder, original request-root/deadline, retention, two-snapshot and fresh-primary reads. It supplies no success/authorization flag. It does not accept expected journal deltas or a replacement source. Both consumers apply the SAME common validation to both snapshots, including receipt-dependent current configuration checks, before applying their final operation rules.
+
+Private DATA schema (never exported across modules, native RPC/HTTP, storage, logs or browser):
+
+```text
+ObservationPair = {first: ObservationSnapshot, second: ObservationSnapshot}
+ObservationSnapshot = {
+ sourceBase, preconnectionId, capsuleHash, anchor,
+ physical: {project, pointer, currentConfiguration, initialBaseline,
+            qaSdkBindingFacts},
+ preparation: {sourceSnapshot, ticket, ticketUse, projectRef,
+               preconnection, stageApproval, approval},
+ records: {inventory, effects, enrollment, issuer, sdk},
+ installed: {receipt, enrollment, ack},
+ issuerRows: {schema, fence, consent, grant, authorization,
+              grantLink, relation, connection}
+}
+```
+
+sourceBase uses the existing validateFiniteOwnerSource closed_ui shape. preparation fields are exactly existing decoded store records or null. inventory/effects/enrollment/sdk are immutable sorted [key,canonicalRecord] arrays, never mutable Maps. issuer uses the existing exact journal reader shape. schema and rows use the exact SELECT projections already in issuerPrimary. installed fields use existing enrollment/installed-stage codecs. qaSdkBindingFacts is D0.1's strict DATA alias/namespace/bindingHash tuple; it is not a capability. anchor is the current canonical anchors/backup/inventory/effects/enrollment/issuer commitment extended with the bounded SDK journal; it is equality evidence only. No function, Promise, native holder, token, SDK cookie/code/approved request, consumption or barrier witness is included.
+
+Preserve existing bounds: connection inventory at most16 (read17), effects at most32 (read33), enrollment at most2 (read3), issuer at most14 (read16), SDK at most8 records before notices (read9), each new SDK record at most16384 bytes. Preserve current backup2MiB and provider-response caps4500000/65536/8192 and canonical validation of all existing records. No widened JSON grammar or generic record bag. Frame lives only for the current comparison, is recursively frozen and discarded; it has no decoder/adoption API.
+
+Two snapshots must match the current complete anchor, qualified physical result, preparation records, issuer rows and SDK records, with normal time-dependent bounds checked independently at each snapshot. No source/metadata authority comes from a frame hash. The receiver cannot provide a frame.
+
+## Lexical ownership and exact delta
+
+On handler entry, call the shared engine and strict qualifier, verify actual original owner/form/SDK inputs as in D0.2, and capture an immutable settled baseline. GET/POST claims are still the original durable one-use operations. The handler captures the actual request object, registered root/deadline, ctx/env/native methods, QA alias, exact issuer store instance, original issuer identity and child leases. No new admission is minted.
+
+The fixed handler enters existing observeFiniteOwnerRequestWork({ctx,env,originalLease}, operation) exactly once, with readFiniteOwnerRequestContext(originalLease).root === originalLease, before source/SDK I/O. Its receiver creates the genuine forwarded root/finish lifecycle but does not create a second request scope. observeOwnerPhasePair retains the existing observeFiniteFactualReadWork borrowing of that exact ambient lineage; its clock closes without closing the original root. Existing retainFiniteOwnerStagePromise therefore retains the handler's SDK and all nested source/store operations in the same real scope. No change to stage-work.mjs, new retention admission, public scope selector or use of its read-only fallback to execute SDK is needed. Receiver finish closes the root after response/failure; outstanding actual promises remain retained under existing release rules.
+
+Only that executing stack maintains:
+- expected canonical journal/record inventory, initialized to the settled baseline;
+- exact fresh append outcomes and actual write/readback results;
+- the current real SDK Promise and its result/rejection, or actual Unit2a Promise/result;
+- the genuine consumption object and SAME store/SAME child lease until insertReadGrant consumes it;
+- a fixed local program position, advanced only by the hardcoded GET/POST sequence.
+
+The ledger is not an authority DTO and cannot be serialized or returned. Append succeeds for new work only on actual status recorded plus existing sync/readback; existing or uncertain stops this invocation. Do not inspect a matching row after an uncertain ACK and recover permission. Canonical bytes enter expected inventory only after that actual append outcome. Every other key/value must remain byte-identical to the settled baseline or an already accepted local write.
+
+recheckOwned takes no parameters. It closes over those objects, calls observeOwnerPhasePair under the unchanged original parent/active child deadline, applies common validation to BOTH snapshots, and compares the full observed inventory with its exact local ledger. No foreign/extra/missing/replaced record, freeze, cleanup operation, provider-effect change or reservation identity drift is accepted. It returns only void to the next fixed statement in the same handler.
+
+Its unresolved-operation rule is exact:
+1. **Own SEND recorded, effect not started:** only the exact just-appended SEND at the current program position may lack ACK. D1 rows must equal the previously qualified rows. This permits the same stack to invoke its single planned SDK/store call, not to issue downstream work.
+2. **Actual Promise pending:** retain it; no subsequent SDK call, grant, phase advance or success response. An internal diagnostic recheck cannot turn pending into resolved.
+3. **Actual Promise resolved, ACK not appended:** only the exact local result permits the next outcome append. For Unit2a, current exact rows must equal the actual returned result and expected transition; row equality never manufactures consumption. For SDK, no wire claim or KV row substitutes for the actual local result. Rejection/no_mutation/uncertain aborts the success sequence.
+4. **ACK/Observed durably appended:** compare exact record and current rows, then permit only the next fixed operation. General reader may again observe a fully settled intermediate prefix, but that observation does not continue this handler's witness chain.
+
+SDK begin runs before app reservation: its unresolved SEND is owned only by the current GET; a held begin cannot produce reservation/form or be claimed by a second GET. POST uses the settled GET prefix as baseline but calls its own actual approveConsent and later completeAuthorization. It never recreates the prior GET's live closure.
+
+For issuer operations the only accepted additions are the original reservation and open_fence/authorization on GET, consume/grant on POST, plus their ACKs and exact preparation links specified by D0.2. Freeze/close_fence/revoke_grant never become an owned forward delta. The existing Unit2a store, schema, native-time predicates, WeakMaps and genuine consumption witness remain unchanged.
+
+Full rechecks occur before the next effect and after its actual result before an ACK/success. The consume→grant chain still uses ONE actual child lease/store; its journal work and any full recheck fit inside the original <=5s child or fail closed. No new child for insertReadGrant, deadline extension, fallback reader or latency assumption is allowed. Parent remains <=30s and clipped to all original bounds.
+
+## Invariants preserved
+
+Common validation keeps original capsule/material/backup chunks/receipt, native residency/source pins, QA pointer/module/bindings and original/current M configuration/module/receipt, credential identity/expiry, exact owner revision, original I0/C0/C1 and actual alarm/cleanup state. Every current D1 observation uses a new first-primary session with SELECT first, never owner/client scans. Every awaited fetch/body/cancel and SDK/store promise retains its actual lifecycle.
+
+The read_consent receipt guard must run in BOTH snapshots: an installed connection receipt requires the exact enabled read_consent configuration and matching pointer/configuration hash; original CLOSED M with that receipt denies even if other hashes agree. Provider own-SEND is never accepted by this mechanism.
+
+Schema absence remains a factual allowed state only under the accepted absence rule: no issuer reservation/fence/grant link/relation. It grants no right to issue; Unit2a's actual preflight still requires its exact schema before mutation. Lone first-GET source inventory remains accepted only with the current absence rules for ticket/use/preconnection/enrollment/effects/issuer; adding SDK inventory must not accidentally turn that prefix into authority. An SDK SEND cannot be admitted at that incomplete prefix. No DDL is introduced.
+
+General reader always rejects unresolved SDK/issuer SEND, orphan ACK, foreign/extra SDK records and incomplete local outcomes. It cannot identify ownership from requestId, hashes, journal rows or matching metadata. Restart/new request must stop on pending records even when all copied correlation fields match.
+
+Late settlement may discharge retention only. It cannot append expired ACK, renew the original window, expose a code, recover a witness or prove global SDK/KV physical drain. D0 option2 and its proposed ONE QA OAuth KV alias remain unchanged; access is not installed by this design. Original uncertainty ruling and deployment-writer-unknown restore prohibition remain.
+
+Source ceiling2026-11-03T02:59:00Z remains expired. Fixture-only substitution is SYN, never eligibility. operationalReadiness=false; completePackage=false; PCoff=false.
+
+
+## Root D0.2 SOURCE activation — 5 November2026
+
+Latestcontainingcommitactivates ONLYD0.2plusowned-recheckamendment afterD0.1acceptance04e8bb0f. ActualexecutionBASEsuppliedindispatch. HistoricalD0.1-onlyactivation/unassignedwordingaboveisdatedhistory. D0.3/notices/fullmount/actualbinding/provider/credential/Entry remainINACTIVE. SourceSDKtestsareonlysyntheticnativequalification. Briefdocs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d02.md governsrootrulings andCASsinglewriter. No operationalreadiness.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-04-finite-owner-sdk-trust-boundary.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-04-finite-owner-sdk-trust-boundary.md b/docs/superpowers/specs/2026-11-04-finite-owner-sdk-trust-boundary.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-04-finite-owner-sdk-trust-boundary.md
@@ -0,0 +1,178 @@
+# Finite owner SDK trust boundary — concrete D0 design
+
+4 November 2026. DESIGN ONLY. Proposed replacement for the cross-fetch SDK-attestation sketch in [superseded inactive issuer/notice sketch](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/3411a6cd7d91e89452eb916d8a30bcc778255e87/docs/superpowers/specs/2026-11-04-finite-fenced-owner-issuer-notice.md). That plan's A/B remain INACTIVE until root accepts and integrates this D0 design. No source, test/build, binding, credential, namespace, provider, browser, DDL or Entry action is authorized/performed here.
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT GitHub docs; ORIGIN delegated-canary.agentfriendlyweb.dev not contacted; RESOURCE_TYPE docs branch; RESOURCE_ID docs/finite-fenced-owner-issuer-notice-20261104; ALLOWED_ACTION pinned source/official documentation reads and three docs via expected-head CAS; ROLLBACK revert this docs commit. Product BASE220b5bc323315b7f107967548fb8958c0f8234f2; no advancing product branch.
+
+## Decision
+
+**Recommend option2: execute actual SDK begin/approve/complete in the existing fixed QA actor, beside original Unit2a issuance.** M forwards the owner's request and relays the bounded response; it supplies no SDK-result claims. QA independently verifies owner/source/form and calls the actual SDK itself. No authenticated M attestation is necessary for SDK-result provenance.
+
+This is feasible in source with ONE additional QA KV binding alias to M's existing OAuth namespace. It is a new namespace-wide QA read/write capability, not a cosmetic refactor and not permission to install it. Root has expressed preference for this option conditional on these precise changes and proofs. No new key, secret, namespace, Worker, actor or controller is required by the selected design.
+
+## Grounded comparison
+
+| | Option1: SDK stays in M, signed result | Option2: actual SDK runs in QA (selected) |
+| --- | --- | --- |
+| Enforceable mechanism | Dedicated ECDSA P-256 signing key held only by reviewed M issuer code; QA verifies against exact public key, original request/operation tuple and durable one-use nonce. Signing occurs only after actual SDK result. | QA calls SDK helpers over native KV and keeps returned objects lexical; no endpoint accepts approvedRequestHash/completionHash as evidence. |
+| New access/custody | New M secret binding AFW_FINITE_OWNER_ISSUER_SIGNING_KEY, independently approved generation/load/revocation custody; QA public key pinned in source. No reuse of API tokens or existing event secrets. | One QA binding AFW_FINITE_OWNER_OAUTH_KV to existing namespace6b94ff702e504e14a7730cee73a0f6ff. New broad QA OAuth-state access; no new secret/namespace. |
+| Durable correlation | Original actor journal nonce per fixed operation, original A/root/request/SDK handle hash, result hash, expected grant hash, original source/M version and clipped deadline signed in a domain-separated envelope. Signature plus freshness/one-use/current owner/fence required. | Original actor journal records actual local intended call and local result. SDK approval object and Unit2a consumption witness never cross fetch, store instance or lease boundaries. |
+| Replay limit | Copied unsigned metadata cannot forge a result. A copied genuine signature proves that the trusted signer observed the result, not that its process is still alive. First replay of an unused valid signed operation may perform the same original action once. | Copied result messages are rejected. Every valid owner POST runs actual QA SDK validation; whole valid bearer request replay can race, with at most one original fenced grant. No claim to distinguish identical first submissions. |
+| Main cost | New secret lifecycle, signature canonicalization, exact signing-code/key custody assumption, extra cross-fetch state and partial ACKs. M's physical SDK settlement remains remote from QA. | QA bundle/import footprint and expanded access to existing OAuth KV; shared-KV consistency/latency can return unavailable/uncertain. SDK and D1 ordering are in one invocation. |
+| Old invariants changed | M physical binding set/initial upload's physical-binding rule, key custody and rollback need a new reviewed exception; QA verifier profile/source changes. | qaLive binding set/publicStatic/bootstrap provenance changes; M physical binding set and historical qaClosed stay unchanged. |
+
+Option1 is implementable cryptography, not a platform caller-ID claim. Cloudflare supports ECDSA sign/verify/importKey and Worker secret bindings ([Web Crypto](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/), [secrets](https://developers.cloudflare.com/workers/configuration/secrets/)). Its trust is the dedicated key's controlled holders and fixed signer code; a signature cannot attest an exclusive deployed version by itself. No unauthenticated signing endpoint, runtime key registry, generic callback or key provision is proposed. It is the alternative only if the owner rejects new QA namespace access; it is not implemented alongside option2.
+
+Option2 removes the provenance hop and keeps actual SDK/app permission ordering together. It has the smaller protocol, though its KV access footprint is broader. It requires the explicit access gate below rather than pretending current bindings suffice.
+
+## Exact SDK1.2.1 feasibility and limits
+
+Pinned package.json uses @cloudflare/workers-oauth-provider1.2.1. Official [ProviderEnv](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-provider.ts#L118) requires OAUTH_KV; [OAuthAuthorizationServer.getOAuthApi](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-provider.ts#L1784) is explicitly for custom code outside fetch dispatch. It creates helpers, not a public route. No ExecutionContext or M WorkerEntrypoint is required for those helper calls.
+
+QA constructs lexically:
+
+```js
+import { OAuthAuthorizationServer } from '@cloudflare/workers-oauth-provider';
+new OAuthAuthorizationServer({
+ issuer: 'https://delegated-canary.agentfriendlyweb.dev',
+ resources: ['https://delegated-canary.agentfriendlyweb.dev/mcp'],
+ scopesSupported: ['afw:project:read','afw:evidence:read'],
+ accessTokenTTL: 300,
+ clientIdMetadataDocumentEnabled: false
+}).getOAuthApi(Object.freeze({OAUTH_KV: capturedQaAlias}));
+```
+
+The minimal SDK env maps the actual captured native QA binding to the SDK's required property. It is not a fake KV implementation, a DB-holder substitution or a transported authority DTO. QA never calls this server's fetch, createClient, purgeExpiredData, refresh or revoke-all APIs. No QA token endpoint or callback is added.
+
+[parseAuthRequest/getClient](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-provider.ts#L6437) use the existing client registry in that KV with CIMD disabled; original fixed client/redirect/resource/S256/scopes are independently pinned by QA. No client scan/registration. [beginConsent/approveConsent](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-consent.ts#L189) create encrypted transaction state and validate handle-derived cookie/KV state; approve gets/deletes the transaction, which is not an atomic one-use store. The original D1 consume/fence remains the application one-use authority.
+
+[completeAuthorization](https://github.com/cloudflare/workers-oauth-provider/blob/v1.2.1/src/oauth-provider.ts#L6540) validates the actual approved request, creates its own SDK grant/code and encrypts props in KV. Force revokeExistingGrants:false; never list/sweep other SDK grants. App props remain exactly {applicationGrantId:originalReservedUuid,userId:originalOwner,projectId:originalProject}, metadata:{}, original approved scope. QA returns the actual result only after the guarded promise resolves and its local outcome journal ACK is durable; secrets/code/cookies remain transient.
+
+Cloudflare documents native [KV access from Durable Objects](https://developers.cloudflare.com/durable-objects/examples/use-kv-from-durable-objects/). This establishes platform feasibility, not current alias availability or exact compiled bundle qualification. [KV is eventually consistent](https://developers.cloudflare.com/kv/concepts/how-kv-works/); a new transaction/client/code may be unavailable at another location, including M's later exchange. Use actual errors/absence and retain uncertainty; no automatic begin/approve/complete retries, extra grace, code reissue or assumed propagation SLA.
+
+Pinned fixtures must be described accurately: test/fixtures/delegated-oauth-runtime.mjs exercises real SDK but uses Node SQLite and a Map KV; test/dossier-monitoring-oauth-native.test.mjs uses native workerd/D1/KV but seeds its application grant and substitutes a notice-link observer; test/delegated-capsule-preparation-oauth-native.test.mjs injects a token validator. None proves this proposed QA lexical full issuance. New two-end native SDK/KV/D1 tests are required.
+
+## Exact access delta and revised invariants
+
+Source identities, not an instruction to mutate them:
+
+- Account85d0d5dadac3341a564f22ce885e9eec.
+- Existing M agent-friendly-web-delegated-canary has OAUTH_KV →6b94ff702e504e14a7730cee73a0f6ff.
+- Existing QA agent-friendly-web-independent-closure-qa currently has NO OAuth KV binding.
+- Proposed qaLive metadata adds exactly {name:'AFW_FINITE_OWNER_OAUTH_KV',type:'kv_namespace',namespace_id:'6b94ff702e504e14a7730cee73a0f6ff'}.
+- Proposed finite QA Wrangler config adds exactly kv_namespaces:[{binding:'AFW_FINITE_OWNER_OAUTH_KV',id:'6b94ff702e504e14a7730cee73a0f6ff'}].
+- Same IndependentClosure actor afw-own-successor-closure-v1 and namespace070c4a7708eb4592a3ded7c117a88225. Same RELEASE_DB6a728254-1494-4039-802e-b39288a55fcc. No new namespace, DB, DDL, route, Workflow, schedule, secret or flag.
+
+The binding grants the QA Worker code access to the namespace, not only the chosen actor or keys. Other QA exports receive its environment, so lexical restrictions and whole changed-graph review matter. Do not claim per-key provider ACLs, exclusive KV access or no other same-account holders. M and any previously authorized holders may continue to exist. QA's source deliberately uses only exact original client/transaction/grant operations; the actual binding capability remains broader.
+
+The old phrase 'bindings unchanged' is amended narrowly: **M physical bindings unchanged; qaLive adds this one reviewed alias before the reserved occurrence; qaClosed/historical pins unchanged.** The initial M upload physical comparison in lib/mcp-qa-finite-initial-upload-wire.mjs requires no new exception for option2. Existing accepted compatibility date/flags remain as pinned, no old-or-new profile fallback.
+
+Source/template/provenance consequences:
+
+1. Modify lib/mcp-qa-finite-profile.mjs qaLive template and config, and wrangler.independent-closure-qa.finite.jsonc together. Exact profile count/hash changes; canaryLive template and wrangler.mcp-own.finite.jsonc binding set unchanged. Keep QA_CLOUD_CLOSED_PINS/c570 and M2607 immutable.
+2. scripts/build-finite-native-package.mjs already verifies checked-in config equals template and computes exact publicStatic per role. Rebuild at actual changed head; new QA source bytes/import graph/profile bindingsHash belong to that head. Keep2MiB M/3MiB QA limits and no common/M→QA decoder edge.
+3. lib/mcp-qa-finite-bootstrap-publication.mjs and bootstrap-record.mjs already derive exact qaLive publicStatic from the profile. A future revised bootstrap must bind the revised QA module+binding footprint to a new exact QA version/deployment and source head. Old bootstrap records must not be edited/relabelled; no version/hash fallback or automatic reuse of a prior tag.
+4. Original material embeds qaBootstrap; original capsule commits materialHash and qaVersionId. Capsule.bindingsHash is the M commitment, NOT a QA alias hash. No capsule schema relaxation/new field is needed: require the embedded qaBootstrap.publicStatic.bindingsHash and actual fresh QA metadata to match the revised exact profile, plus normal capsule→material→bootstrap linkage. A capsule created against prior Q cannot be used after adding the alias.
+5. The alias/candidate QA publication and matching bootstrap must be separately approved and established BEFORE the single original Entry/material/capsule is consumed. Never retrofit a sealed occurrence, mint a second Entry or restart I0/C0/C1. If a capsule already exists for the old QA tuple, source denies and this plan supplies no replacement authority.
+6. Add native alias holder capture/rechecks to the new QA SDK module; compare the actual metadata alias ID to original M's OAUTH_KV ID through the QA-only factual source module. The runtime KV object has no assumed introspectable namespace ID; native holder identity plus qualified provider metadata establish mapping under platform trust. Invoke qualifyFiniteOwnerSdkBindingFacts inside the QA phase source's private primary observation while its actual QA metadata and qualified M configuration are lexical, on both normal repeated observations. Do not add binding credentials or an authority-bearing result to the public source DTO; the exact profile and original bootstrap lineage already commit the mapping.
+7. Existing API read/publish custody probes prove only their existing identities/expiries; they do not prove this KV capability grant. Add an explicit access-review receipt in documentation recording approved QA alias→existing namespace, exact reviewed artifact/configuration, retained baseline and rollback. No API token is repurposed, expanded or claimed to be the SDK credential.
+
+## New fixed callgraph: reports disappear
+
+Create these unmounted internal modules; do not mount the default Worker/DO or enable private POST in this unit:
+
+```js
+// M: no SDK, grant selector or result input.
+forwardPrivateFiniteOwnerOAuth({request,env,ctx}, originalLease)
+// Promise<Response>; fixed original GET/POST /authorize only.
+
+// QA: actual native holders, lexical verifier/source/SDK/store.
+createPrivateQaFiniteOwnerOAuthReceiver({ctx,env})
+// frozen {fetch(request): Promise<Response>}
+
+handlePrivateQaFiniteOwnerOAuth({request,env,ctx}, originalLease)
+// Promise<Response>; private QA module called only by the receiver/test fixture.
+
+// Pure DATA equality, no capability.
+qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata})
+// frozen {alias:'AFW_FINITE_OWNER_OAUTH_KV',namespaceId,bindingHash}, or throw.
+```
+
+Files: lib/mcp-qa-finite-owner-oauth-forward.mjs, lib/mcp-qa-finite-owner-oauth-qa.mjs, lib/mcp-qa-finite-owner-oauth-wire.mjs, lib/mcp-qa-finite-owner-sdk-binding-facts.mjs. The QA SDK/issuer implementation uses existing original context/approved-ticket predicates and original Unit2a store. No generic registry, caller-supplied verifier/SDK/source callback or generic dispatch.
+
+Only native internal path /_finite-owner/authorize is proposed. The wire contains the original bounded UTF-8 form bytes, original allowed URL/method and the accepted narrow lifetime metadata; it has no SDK payload, approval hash, completion hash, grantId, phase or success boolean. Unknown internal paths, especially sdk-approve/read-grant/sdk-completed, return unavailable before effects. Original issuer/resource are fixed; reconstruct the SDK Request at the canonical public /authorize URL, not the private native URL. Duplicate/malformed URL/form/cookie fields, excess bytes and query on POST deny.
+
+M is untrusted for SDK/permission facts. QA verifies Access signature/expiry against the original source realm, original prep ticket/CSRF/source/owner/revision and actual SDK transaction cookie/state. Original URL/Origin text and correlation/version headers are consistency checks, not caller authentication. The native Request.signal and accepted duration clipping still apply. Start QA's genuine local lease before I/O, clip to sender remaining/deadline and own30s maximum then original source/identity bounds; received metadata can shorten but never widen the local/source window. It does not authenticate when M began. A copied/new request cannot resume a previously claimed original SDK operation or reset its durable one-use deadline.
+
+GET in ONE QA invocation:
+1. Verify original read_consent context, original approval/enrollment/owner and current exact client registry, canonical redirect/resource/S256/requested scopes.
+2. Durably claim the original begin attempt before actual SDK beginConsent, retaining its whole KV promise. Actual SDK handle/cookie remain lexical; persist only exact handle hash and bounded outcome.
+3. Original Unit2a reservation(server UUID)→OPEN fence→authorization INSERT→actual ACK/fresh primary→AuthorizationLink. No form before these actual results. GET form uses QA's actual transaction headers/handle, bounded HTML and no raw issuer journal.
+4. Any uncertain send/ACK/SDK write returns pending; no new begin or UUID. Routes remain unmounted in production.
+
+POST in ONE QA invocation:
+1. Read bounded exact form once. Independently verify original owner/form, unconsumed consent and reserved identity. Atomically claim the original approve operation so concurrent/restart requests cannot rerun it; actual KV delete remains non-atomic.
+2. Call actual api.approveConsent(request,handle,{scope}) with no remember. Returned approved.request never leaves QA before use. Independently compare fixed client/resource/redirect/PKCE/scope subset to original consent.
+3. Persist exact ExpectedGrant; original consumeAuthorization→insertReadGrant on SAME actual Unit2a store instance/SAME child lease/genuine unused consumption witness. The<=5s child includes necessary intermediate journal work. SQL uses actual native time and the original OPEN fence/owner/revision/expiry predicates. Never reconstruct a witness after a row read.
+4. Actual grant ACK/current original UUID→GrantLink/connection pair preserving genuine new-link ACK rule→local complete SEND→actual completeAuthorization with original props and revokeExistingGrants:false.
+5. Only actual resolved SDK result creates local SdkObserved record; it is never accepted as a request payload. Preserve local async retention to settlement; late result cannot write expired ACK, expose code or continue. Response relays actual bounded cookies/redirect only when original guard remains valid. Lost response/ACK never reissues a code.
+
+The previously proposed six cross-fetch SDK paths and SdkAck(reported) prerequisite protocol are removed from the selected design. Use the bounded journal's Root/SdkSend/ExpectedGrant shape if reviewed, but replace externally accepted reports with QA-local SdkObserved outcome records keyed by original operation. There is NO method appendSdkObserved(payloadFromM) or recovery that resumes an SDK call from its SEND. This replaces D0, not the original Unit2a fence.
+
+Checks around SDK calls guard application-controlled awaits, not every internal SDK KV await. The unmodified SDK may continue internal KV work after timeout; no claim of cancellation or physical drain follows from a lease, D1 fence or local result. Original app-grant SQL stays behind the actual Unit2a fence. Retain the real SDK promise and apply the existing opaque-uncertainty ruling to late results.
+
+Pure source reads remain unavailable on unresolved SDK/issuer SEND. The executing QA invocation may privately recheck its own exact local operation/journal delta and current source facts; no cross-invocation closure claim remains. Provider publication own-SEND continuation is still a different future task.
+
+## M token exchange compatibility
+
+The original public issuer, resource, existing client record, SDK version and KV namespace are unchanged. QA's completed SDK grant/code uses the same format that M's actual SDK reads. In lib/delegated-oauth-worker.mjs tokenExchangeCallback still reads props.applicationGrantId, checks original subject/client/resource/project/scopes/status/expiry and consumes exchange; boundedTokenResponse and MCP permission checks remain in force. QA does not emulate those callbacks or invent another token endpoint.
+
+Required native compatibility proof calls the actual M token endpoint/callback and bounded response code using a QA-issued code under synthetic test credentials. Confirm correct props, exact original application grant, zero refresh and denial after original grant revocation/expiry/fence cleanup. A QA SDK completion with a wrong namespace/props must fail the actual M exchange. KV propagation errors are unavailable/uncertain, never permission to issue a second grant/code.
+
+The future finite M route selector must intercept authorization/monitoring preparation before ordinary granting code and fail closed on missing QA alias/source/receiver. It must never call ordinary createConsent/consumeConsent/createGrant/revokeGrant catch as fallback. This design does not yet implement that public mount; isolated fixture can compose actual token-only dispatch without enabling ordinary authorization paths.
+
+## Hostile inputs and bearer replay limit
+
+- Copied mVersionId/requestId/body with fabricated SDK result fields or direct read-grant/sdk-completed paths cannot issue a grant or authoritative completion record. Those protocols do not exist.
+- Valid owner identity with invalid/missing SDK transaction cookie/handle/KV state denies before consume/grant. Hold actual QA approveConsent; a concurrent forged result or alternate request cannot bypass the held operation. Hold completeAuthorization KV write; forged completion cannot settle it or clear uncertainty.
+- A different native binding holder can submit requests; no exclusive holder is assumed. QA still performs the same original owner/source/SDK checks and one-use D1 ordering. Public metadata copying alone grants nothing.
+- **Complete bearer replay limitation:** if someone possesses a byte-identical valid owner Access assertion, prep/SDK cookies and approved form, the first such submission cannot be distinguished from the original human submission without an additional channel/transaction authentication mechanism. Option2 intentionally does not assert M identity. It may cause actual QA SDK approval and at most one original fenced app grant. Test this case explicitly; require real SDK execution, no second grant/complete, same original identity/window and no false physical-settlement claim. Do not label it 'zero effect' or human-presence proof. Credentials remain protected by the original transport/browser/custody assumptions.
+- Existing QA alias access adds another OAuth-state writer; reviewed QA code and authorized account administration are trusted. An arbitrary actor already able to alter native bindings/KV/provider code lies outside the untrusted-request proof. No claim of account-wide exclusive writers.
+
+## Separate operational access/rollback gate
+
+Additional access is precise and reviewable: authorize adding only AFW_FINITE_OWNER_OAUTH_KV on the exact new reviewed qaLive version to namespace6b94ff702e504e14a7730cee73a0f6ff, in account85d0d5dadac3341a564f22ce885e9eec, without modifying namespace data, M bindings or credentials. A future operator must verify current resource/configuration, access owner, exact artifact/profile/hash, full no-alias baseline and recovery material; obtain the applicable explicit operational authorization for that version/configuration. This document performs none of that.
+
+Prefer reversible source-only/closed candidate qualification first. Any later alias publication must have exact before/after metadata and an owned-pointer rollback to the retained closed QA configuration without this alias. Removing the alias removes only QA's reference; NEVER delete the KV namespace, clients, transaction/grant/token keys or prior M access. Retain legitimate later activity. Binding removal/rollback does not prove previously issued native KV operations settled; retain their exact uncertainty and existing original cleanup constraints.
+
+The finite occurrence cannot start until this revised source/access/bootstrap contract and the separate full mount/cleanup gate are accepted. No old sealed capsule can be upgraded to it; no second Entry/window is authorized. Historical pins, accepted flags, original I0/C0/C1, technicalI0+300000, commandBy-510000, nominal/launch clocks remain. Source ceiling2026-11-03T02:59:00Z remains expired. Conditional SDK uncertainty ruling unchanged; deployment writer unknown forbids restore. operationalReadiness=false; completePackage=false; PCoff=false.
+
+
+## Root source-design self-review clarifications (continuation)
+
+Root selects option2 as a technical architecture choice under the owner's delegated direction; the owner did not separately choose this comparison. This selects a SOURCE proposal, not a real new KV grant. D0.1/D0.2/D0.3 remain unassigned until the current factual task and earlier selected pure conversion task close. Exact later BASE will be supplied; inspected220b5bc is not a moving execution pin.
+
+- Metadata role clarity: mMetadata means the COMPLETE independently qualified ORIGINAL/CURRENT M PREPARATION configuration (closed_ui/read_consent, later exact notices), not the full private canaryLive projection. The binding DATA helper must not run the full canaryLive projector on that preparation shape, infer a phase from flags or try validators until one passes. Its narrow fact is unique QAalias/MOAUTH_KV identity equality; the fixed QA source already owns full phase/original/profile qualification. qaMetadata is complete actual QA configuration with its exact qaLive commitment. Add pure positives for original closed and current read_consent M inputs with the same namespace, plus swapped-role/wrong-ID denials.
+- Early SDK uncertainty is separate: if actual beginConsent KV work is held/unknown before Unit2a reservation/Identity exists, no existing terminal issuer fence may be claimed for that missing identity. Add an actual held-begin case: no form/authorization/app grant without real completion+ACK, late result past original deadline cannot start reservation/grant work or append expired ACK, promise retained through settlement. This source task must preserve uncertainty; it does not broaden the opaque-SDK restoration ruling. Complete cleanup must separately prove its early-prefix barrier/settlement condition before any restoration claim.
+- D0.3 qualifies existing behavior after D0.2 and changes tests only. Its valid exchange is expected to PASS once the prerequisite works; do not manufacture a RED or claim new implementation failure. Wrong-namespace/props/PKCE/revocation controls and actual late-completion denial are meaningful causality. D0.2 owns issuance tests, D0.3 alone creates the token-compatibility test file. No duplicate coverage-only full reruns.
+- Reuse the eventually accepted factual-reader fixture and its guarded initialization. Do not copy old220b5bc missing ordinary schema, rename/drop historical grant tables or patch production SQL time. The actual fixture-only expired-ceiling substitution remains explicitly SYN and cannot prove runtime/source eligibility.
+
+Root preflight: the original M→QA SDK report dependency is removed by lexical QA execution, not 'authenticated' by serializable metadata. Separate alias access/profile lineage, real local issuer behavior and token compatibility remain independently rejectable tasks. No unresolved dependency is silently renamed complete. Full mount/provider-publication/cleanup/PCoff stays separate.
+
+
+Public SDK import feasibility was verified against v1.2.1 package entrypoint (package.json3–6), tsdown ESM entry3–8, exported class1727–1752 and instancegetOAuthApi1784–1786; AFW already imports the named class in delegated-oauth-worker:1 and lockfile822–826 pins1.2.1. Use instance method, not differently shaped standalone getOAuthApi export. This is source/API evidence, not a new build/native qualification.
+
+
+## Root D0.1 SOURCE activation
+
+Currentcontainingcommitactivates ONLYD0.1after independentlyacceptedpureprearmTask1(report9fd0ff65) andfirstphasecontext(reportfe0af360). ActualBASEsuppliedindispatch. D0.2/D0.3/nativeissuer/notices/fullmount/cleanup andALLactualKVaccess/publication remainINACTIVE. ScopedGitHubsourceandcredential-freeActionsbuild/testareauthorizedforthisunit, notprovideroperations. DeclareexactQAaliasandstrictmappingDATA; preserveM/historicals/currentfactualreadercontracts. No newSDKcall/sourcebroker isimplementedhere. Root's laterowned-recheckdesignsupplementamendsD0.2only; donotimplementtheoldMresult-reportsketch.
+
+
+## Root D0.2 SOURCE activation — 5 November2026
+
+Latestcontainingcommitactivates ONLYD0.2plusowned-recheckamendment afterD0.1acceptance04e8bb0f. ActualexecutionBASEsuppliedindispatch. HistoricalD0.1-onlyactivation/unassignedwordingaboveisdatedhistory. D0.3/notices/fullmount/actualbinding/provider/credential/Entry remainINACTIVE. SourceSDKtestsareonlysyntheticnativequalification. Briefdocs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d02.md governsrootrulings andCASsinglewriter. No operationalreadiness.
+
+
+## Root D0.3 SOURCE activation — 5 November 2026
+
+This containing commit accepts D0.2 source at report d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72 after independent Pass/Approved review and activates only D0.3. Exact execution BASE supplied by root. Earlier ACTIVE/INACTIVE headers are dated history. Brief docs/superpowers/briefs/2026-11-05-finite-owner-sdk-trust-boundary-d03.md and preflight define the precise conditional scope amendment: valid existing exchange first, and ONLY if genuine negative proves missing redundant props checks, two privilege-reducing equality guards in existing M token callback before consumeExchange. No other production behavior, permission, SDK callback injection, schema, clock or mount changes. Live I/O feasibility remains unaccredited; audit proposals not activated.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-04-finite-readonly-integration.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-04-finite-readonly-integration.md b/docs/superpowers/specs/2026-11-04-finite-readonly-integration.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-04-finite-readonly-integration.md
@@ -0,0 +1,13 @@
+# Integration of accepted finite readonly source — next task brief
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated finite source branch/GitHubActions; ORIGIN delegated-canary.agentfriendlyweb.dev; RESOURCE_TYPE private finite source and synthetic fixtures; ALLOWED_ACTION source integration/credential-free cloud qualification only. ROLLBACK revert this unit before promotion; no provider/credentials/runtime/permissions/OAuth commands.
+
+Run only AFTER immutable capsule source has passed its own fresh review. Record current primary BASE at dispatch, not a stale remembered SHA. Target feat/finite-native-cleanup-20261101. Accepted incoming branch feat/finite-readonly-preflight-20261103 is pinned97a939037ed7a66b86a0a90c92c2b2ac2e957a68; original common ancestorce76c9ac3cfd5332ae8957dfd9eab8bebdccbb45. Do not edit incoming branch.
+
+Integrate accepted readonly helper and UnitA wrapper/test changes, not the temporary .github/workflows/finite-readonly-preflight-qualifier.yml. Relevant source/test files: lib/mcp-qa-finite-initial-custody-probe.mjs, lib/mcp-qa-finite-stage-work.mjs, scripts/qa-finite-pre-entry-custody-wrapper.mjs, test/fixtures/finite-initial-entry-world.mjs, test/mcp-qa-finite-initial-custody-probe-native.test.mjs, test/mcp-qa-finite-initial-scope.test.mjs, test/mcp-qa-finite-pre-entry-host-native.test.mjs. Preserve incoming report/spec/acceptance refs or copy their small docs; full diff packages remain recoverable on pinned branch. Avoid copying unneeded large packages. Preserve all current primary capsule/coordinator/lateHTTP/cancel changes. Shared fixture must be a true three-way reconciliation, not an overwrite; most incoming change adds fixed preEntryCustody method and leaves primary late-response/capsule faults intact. Inspect exact full diffs when implementing rather than relying solely on this description.
+
+Global constraints: same actual B1/A winner, immutable Entry/capsule, actual M vs historical rollback, original ceilings/deadlines/cleanup arm unchanged; outstanding HTTP lifecycle retained through body cancellation; readonlymode cannot become owner authority, independent <=15s scope and <=5s children, pending work excludes overlapping scope; fixed ctx/env/actor/source/binding/context/Workflow path and bounded strictly shaped receipt, H correlation not credential. Original reviewed administrative/binding trust model, concrete contrary drift matters. No arbitrary forwarding or new auth scheme.
+
+Qualify combined actual source behavior through existing native fixtures: accepted activation/capsule tests plus readonly preEntry/native Workflow and scope groups, shared fixture integrity, holders/deadlines/lostACK/retention/no provider replay. Exact historical395915B baseline qualification remains separate pre-promotion gate, not fabricated by synthetic tests. Compiler/residency changed graph required; full repository checks remain wholebranchpromotion stage. No repeating all suites once covering checks pass unless failure/new concern.
+
+Use existing temporary primary qualifier if needed while development; do not import incoming qualifier. All temporary qualifiers excluded at finalpromotion. No localclone/build/dependencies; source edits via GitHub expectedSHA and cloudActions. No subagents. Report exact BASE/incoming/finalHEAD, reconciliation, groups/commands/runs/artifacthashes, no new runtimeeffects and remaining actual-module/holder/UnitB/owner/cleanup/live gates. Report docs/superpowers/reports/2026-11-04-finite-readonly-integration.md. operationalReadiness=false;completePackage=false;PC-off pending.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-04-finite-request-signal-opt-in.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-04-finite-request-signal-opt-in.md b/docs/superpowers/specs/2026-11-04-finite-request-signal-opt-in.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-04-finite-request-signal-opt-in.md
@@ -0,0 +1,47 @@
+# Finite incoming Request.signal opt-in — source qualification
+
+SOURCE-ONLY. PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web(1347578006); ENVIRONMENT isolated feature source/credential-free GitHub Actions; ORIGIN delegated-canary.agentfriendlyweb.dev not contacted; RESOURCE_TYPE new finite candidate configuration and native qualification; RESOURCE_ID qaLive/canaryLive source templates only; ALLOWED_ACTION source/tests/closed compilation. ROLLBACK revert this source unit before promotion. No remote profile edit/deployment, Entry, schema, permission, token, OAuth/OTP, cron, Max or other-project action.
+
+## Concrete reason and chosen proposal
+
+Current pending-only native conduit Unit2b.1 is not positive business authorization. Its actual sender-FIRST Miniflare Worker→DO test at9fcd63d/run41916365932/job126877014754 independently observed receiver.signal.aborted=false during the held read AND immediately before its post-release product guard, while sender returned503. Thus original profiles do not qualify receiver cancellation. The earlier getWorker harness hang was inconclusive and is not this evidence.
+
+Architecture follow-up selects ONE bounded candidate opt-in, not a cancellation RPC or deadline-only substitute:
+- compatibility_date remains exactly2026-09-07 for both.
+- QA qaLive compatibility_flags exactly ["nodejs_compat","enable_request_signal"].
+- M canaryLive compatibility_flags exactly ["nodejs_compat","global_fetch_strictly_public","enable_request_signal"].
+- Do not add request_signal_passthrough or any other flag.
+[Official documentation](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#enable-requestsignal-for-incoming-requests) describes incoming signal opt-in before the future2026-11-17 default. Documentation is not proof it fixes this native DO path.
+
+This task's success requires actual receiver observation, not just matching JSON. If the exact opt-in still does not propagate cancellation, preserve an unqualified result and restore candidate flag edits before delivery rather than leave an unsupported “fix”. Report the original pending conduit unchanged; no business producer may be enabled. No automatic alternative mechanism or profile expansion is authorized by this unit.
+
+## Exact source scope
+
+Modify lib/mcp-qa-finite-profile.mjs BOTH templates and configs for qaLive and canaryLive. Modify wrangler.independent-closure-qa.finite.jsonc and wrangler.mcp-own.finite.jsonc to match. Update narrowly affected fixture/candidate expectations and the native cancellation qualification case only. No actual Worker entry/DO mount, user form, issuer SQL, native bridge wire, SDK, alarm or cleanup algorithm change.
+
+The change happens BEFORE new candidate upload/Plan/capsule sealing. Every phase closed_ui/read_consent/notice_consent and full prearm keeps the new fixed candidate flags. Existing three mutable preparation settings do not expand; do not accept both flag sets or mutate flags between phases. Do not rewrite any existing capsule/Plan/hash.
+
+Preserve historical rollback identities independently:
+- mcp-qa-finite-historical-source.mjs still hard-checks original2607 two flags and its exact pin/hash.
+- Originalc570 closed module/configuration and every QA_CLOUD_CLOSED_PINS entry stay byte-identical.
+- Never recompute/normalize a historical pin using the new candidate template.
+- qualifyFiniteWorkerVersion retains exact pinned hash plus existing basiccompatibility check; no broadened “old or new” branch.
+- Physical/secret bindings unchanged. buildFiniteInitialUpload already derives candidate config from canaryLive; its historical binding comparison remains exact. No new binding exception.
+
+Existing compiler must enforce file/template equality and recompute source commitments/bootstrap/residency from the new source. readFiniteQaBootstrapPublication must require the exact new QA profile/manifest, not reinterpret old deployed QA as this candidate. qualifyFiniteInitialUploadedVersion/qualifyFiniteConnectionProfile/initial records and factual readers continue their exact recorded configuration/hash checks. Native source qualification is not deployed adoption.
+
+## Required causal proof and acceptance
+
+Before implementation: selected native case expects actual receiver abort under original source profiles and FAILS with actualfalse. Reuse saved actual original-profile observation when useful but establish changed positive acceptance explicitly; no root harness syntax/timeout as RED. A fixture may use the proposed exact flags as an experiment first, labeled SYN configuration. Do not claim source candidate qualified until actual source files/templates match.
+
+After minimal source changes:
+1. Real production bridge/receiver helpers in actual sender-FIRST Worker→DO fixture at exact new source profiles. Abort sender during held actual receiving read; observe RECEIVER signal aborted while held, and its real translated lease guard denies after release before a guarded mutation marker. Explicit signal passing remains unchanged.
+2. Original elapsed budget/absolute deadline/receiver monotonic clipping still hold. No new30s/5s timer, Date.now offset, caller approval or skip.
+3. Retained read/fetch/body/cancellation remains occupied until actual settlement; abort is not physical completion. No business operation or readiness enabled.
+4. Missing/wrong/extra candidate flags rejected by exact config/profile/bootstrap/connection qualification. First two connection phases preserve exact candidate flags; third uses full static profile.
+5. Old2607/c570 accepted only against unchanged historical pins; feeding old flags to new candidate expectation fails. No pin rewrite, normalization or historical data edit. Compare affected historical files blob-identically to BASE.
+6. One actual compileFiniteNativeStaging on codeHEAD, original2MiB/3MiB limits/bootstrap/residency/source guards unchanged. Record exactHEAD/tree/modulebytes/hashes and no complete package/deployment claim. Legacy index.mjs build does not qualify finite entry.
+
+Run proportional selected boundary/native/config/initial-upload/phase/historical regressions, lint first. Existing138Unit2a and unrelated/full suites are not repeated without concrete changed-code concern. Preserve all earlier warnings/failures, no skipped acceptance case. Remove own temporary qualifier and deliver report docs/superpowers/reports/2026-11-04-finite-request-signal-opt-in.md, exactBASE/code/reportHEAD/jobs/attempts/counts, actualvsSYN and receiver evidence. Fresh independent source review before composition.
+
+operationalReadiness=false;completePackage=false;PCoff=false. Sourceceiling2026-11-03T02:59:00Z remains expired; no native credentials renewed. The one coordinated consuming occurrence remains reserved; no complete PC-on rehearsal/reset.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-04-owner-request-retention.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-04-owner-request-retention.md b/docs/superpowers/specs/2026-11-04-owner-request-retention.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-04-owner-request-retention.md
@@ -0,0 +1,42 @@
+# Native owner request retention — source-only design
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT finite source branch/GitHubActions; ORIGIN delegated-canary.agentfriendlyweb.dev; RESOURCE_TYPE private owner request bookkeeping and fixed stage callgraph; ALLOWED_ACTION source edits/credential-free synthetic/native tests; ROLLBACK revert source unit before promotion. No actual provider request, credentials/permissions/deployment/OAuth/Entry or owner consent. All public/native mounts and existing source/forward seams remain unavailable.
+
+## Problem and boundary
+
+Current owner-http creates the genuine30s request lease then calls prepareFiniteOwnerChoice. Pre-admission source/identity/body/ticket/approval children call retainFiniteOwnerStagePromise but without ALS scope it returns the promise unchanged. Genuine stage admission is minted only after ticket/approval writes and consumed by policy transport; owner scope opens too late for prior pending work. Add REQUEST RETENTION bookkeeping, not another permission or admission. Original reviewed native binding/callgraph trust applies; no new caller signature/token scheme.
+
+## Request lifetime and genuine lineage
+
+At actual createFiniteOwnerPreparationHost request entry, create the existing genuine parent once and establish an internal request retention scope BEFORE body/source/identity/storage I/O. Bind actual ctx/env/storage/RELEASE_DB holders and original parent; keep <=30s wall/monotonic and <=5s children, original abort and holder guards. Every actual pending read/write/body/cancellation lifecycle remains retained after logical timeout until actual settlement; no release gap when a late body read begins cancellation. Do not only track separate read/cancel fragments.
+
+Provide observeFiniteOwnerRequestWork({ctx,env,originalLease},operation) as internal bookkeeping with mode request. Parent aborted AND all retained promises settled is the release condition. An occupied different request/readonly/owner lineage rejects without replacing it. Whole host work and actual children share one set; finish never refreshes time or claims physical settlement.
+
+Maintain existing readFiniteOwnerRequestDeadline API, adding genuine private ancestry as needed. Provide readFiniteOwnerRequestContext(lease) returning frozen {root,deadline} only for the actual original request or internally registered descendants/proof leases. Register child/proof lineage when existing code creates them; effective deadline must be no wider than all ancestor/current identity/window bounds and child5s. Unknown JSON/shape-cloned leases must not acquire provenance. Finish invalidates root and all descendants by linkage. Preserve unbranded trusted Workflow/setup flows: do not turn every generic child parent into an owner request or break their existing guards.
+
+## Factual read compatibility
+
+Current initial factual reader requires a genuine original parent; existing resolver passes a child. Adapt through genuine tracked ancestry, not a newly constructed parent. Source request/child deadline remains original. A separate internal observeFiniteFactualReadWork may borrow an ALREADY ACTIVE same request entry only with actual ambient entry, matching holders and registered root, while preserving its active child guard. It changes no mode/admission. Without that ambient request, retain existing standalone readonly behavior on supplied actual lease. Another RPC/request cannot borrow a busy entry.
+
+Keep observeFiniteReadOnlyWork strict and unchanged for UnitA; readonly never converts into owner authority. Keep continueFiniteOwnerStageWork owner-only.
+
+## Genuine stage handoff
+
+Add explicit internal adoptFiniteOwnerRequestStageWork({ctx,env,admission,originalLease},operation), called by the owner branch of policy transport ONLY after its existing consumeFiniteOwnerStageAdmission succeeds. Preserve that real one-use WeakMap consumer and all authorization checks; DTOs/rows/history/headers cannot bypass it. Bookkeeping alone is not admission authentication. In-place request-to-owner handoff preserves the SAME entry/promise set/holders/root and adds the actual consumed admission; never delete/recreate or finish/restart the parent. Require actual ambient same request and same original parent/holders, live original and admission leases. Existing owner/B1 observe paths remain compatible. No readonly upgrade. When called without a request scope by an existing trusted standalone owner flow, preserve existing owner observer behavior with the actual consumed admission.
+
+## Approval still unavailable
+
+Until cleanup handoff is separately qualified, actual owner HTTP must return a simple pending view and no actionable approval form. GET/POST cannot lead to consumeTicket or stage publication. Enforce this on the actual host path before preparation/ticket consumption, with no caller boolean/env flag/new generic bypass. Keep the host unmounted; do not enable source/forward seam or new route. Internal/native fixtures may exercise existing prepareFiniteOwnerChoice and transport directly under request bookkeeping using their actual verified synthetic identity/ticket and real one-use admission; this qualifies components, not a live cleanup or permission. No synthetic approval is exposed as runtime capability.
+
+## Acceptance and constraints
+
+Tests must cover:
+1. Actual original root, genuine child/proof ancestry, shortened remaining budget, abort/backward clock/holder drift, cloned/foreign lease rejection; no new30s parent to adapt.
+2. Pre-admission actual source/identity/read and native GET ticket or POST approval write held after original timeout: competing requests/read-only/owner work excluded until settlement; no late approval/provider effect.
+3. Late streamed request body + held cancellation: registry stays occupied until cancellation settles; preserve first failure/deadline and size/Origin/CSRF/JWT guards.
+4. Genuine actual stage admission consumed by transport transitions same entry/set without a gap and uses unchanged clock; missing/DTO/replayed admission sends no provider request. Readonly cannot upgrade.
+5. Standalone factual reader and nested same-request reader work with true parent/child; other requests/holders cannot borrow; initial Capsule/A/M/Q/window/hash invariants preserved.
+6. Actual unmounted host GET/POST pending response has no approve form/ticket consumption; Source/forward/mount unavailable; no cleanup claim.
+7. Correct recorded Minor in initial-owner-source-native test: reset original project revision before mutating owner, so the owner denial is independently tested.
+
+No actual source/live eligibility established by synthetic fixtures. Expired source ceiling unchanged; I0/C0/C1/T0 unchanged. All temporary qualifiers absent before finalmainpromotion. One live occurrence reserved for coordinated PC-off, no partial Entry rehearsal/reset. Report exact source range/RED/GREEN/commands/results/hashes, any standalone-parent contract change and pending cleanup/native route/controller/actual-custody gates. operationalReadiness=false;completePackage=false.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-04-preparation-cleanup-enrollment.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-04-preparation-cleanup-enrollment.md b/docs/superpowers/specs/2026-11-04-preparation-cleanup-enrollment.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-04-preparation-cleanup-enrollment.md
@@ -0,0 +1,68 @@
+# Preparatory cleanup enrollment and forward fence — Unit 1
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT isolated finite source branch / credential-free GitHub Actions; ORIGIN delegated-canary.agentfriendlyweb.dev, not contacted. RESOURCE_TYPE fixed native QA actor source; RESOURCE_ID agent-friendly-web-independent-closure-qa / namespace070c4a7708eb4592a3ded7c117a88225 / actor afw-own-successor-closure-v1. ALLOWED_ACTION source edits and synthetic/native tests only. ROLLBACK revert this unit before separate promotion. No actual provider request, Entry, credential/permission/OAuth/deployment/cron/monitor/Max action.
+
+## Selected design and builder rulings
+Architecture: docs/finite-owner-cleanup-design-20261104 commit1db28efb87768cf724be56c7f941333fc2a4f71b, docs/superpowers/reports/2026-11-04-owner-cleanup-handoff-design.md. Keep the existing initial cleanup owner and ONE native alarm, then qualified preparatory reduction/restoration (Unit2) and atomic transfer to existing nominal guard (Unit3). Immediate nominal reuse lacks its full plan/grant/notice/factory; a second Workflow/alarm adds another owner; merely broadening the candidate UUID check leaves permissions or late effects behind. Owner delegated ordinary source choices and opted out of design question cycles.
+
+Independent builder check accepted with binding rulings:
+1. Actual admitted preconnectionId MUST equal immutable capsule.preconnectionId (original M/A selector). No optional dual-ID mapping, timestamp reconstruction or new occurrence. Generic first GET currently generates another opaque ID; it remains pending/unmounted. Later source composition must choose the factual original ID before opening it. Unit1 does not fix/mount that route.
+2. Even successful enrollment MUST return admin_pending before upload.issue, activation.issue or provider POST. Enrollment is cleanup DATA, not readiness or admission. Update old positive transport tests to the actual narrowed behavior; no caller/env flag or production bypass to preserve installed expectations. Reuse actual initial native capsule harness; source substitution alone is not proof of original-M linkage.
+
+## Goal and exact boundary
+Before the fixed connection transport can ever publish, retain a durable obligation for the original capsule and the actual first owner approval. This unit enrolls that obligation only AFTER existing consumeFiniteOwnerStageAdmission succeeds and existing request-to-owner adoption; it never issues or reconstructs an admission. Keep actual host pending and all source/forward/native owner mounts unavailable. Existing setup/B1/strict readonly paths stay compatible.
+
+At most one immutable enrollment for the capsule. Existing rows, unknown commits or lost ACKs cannot be deleted, repaired into success, reenrolled or replayed. An ACK is not cleanup-ready. All actual pending operations remain in the same original retained scope through settlement; no fresh parent, timer extension or new authority from a registry.
+
+## Records and interfaces
+Add lib/mcp-qa-finite-preparation-cleanup-records.mjs. Pure DATA exports:
+- FINITE_PREPARATION_CLEANUP_PREFIX = 'afw.finite-preparation-cleanup.v1:'.
+- sealFinitePreparationCleanupRecord(kind,input), encodeFinitePreparationCleanupRecord(kind,input), decodeFinitePreparationCleanupRecord(kind,raw).
+Kinds Enrollment and Ack only; storage suffixes enrollment and ack. Strict own-data, no accessors/prototypes/symbols/unknown fields, canonical roundtrip/domain SHA256, each serialized record <=8192bytes; reject before getters/toJSON. Use existing initial canonical/own/hash helpers where appropriate. Purpose is 'afw.finite-preparation-cleanup-'+kind.toLowerCase()+'.v1'; output includes purpose and recordHash.
+
+Enrollment input exact fields:
+capsuleHash,planHash,armAckHash,activationCompletionHash,entryHash,materialHash,sourceRevision,sourceTree,qaVersionId,initialInstanceId,actorId,preconnectionId,I0,C0,C1,readerId,publisherId,readerExpiresAt,publisherExpiresAt,manifestHash,baselineVersionId,baselineDeploymentId,ownerSourceHash,preconnectionHash,stageApprovalHash,configurationApprovalHash,issuedAt,deadline.
+Use existing hex40/hex64/UUID/initialInstanceId/time grammars. actorId is actual fixed actor's hex ID, not the slot label. Baseline/tokens match existing initial Plan fixed pins; no raw credentials. C0=I0+900000, C1=C0+180000, credential expiries>=C1. issuedAt<deadline<=C0 and deadline-issuedAt<=5000; actual private caller provides its EXISTING current child deadline, clipped by original request/identity/approval/source. Stored expiry is not live eligibility.
+Ack input exact fields: enrollmentHash,stateHash,alarmAt,acknowledgedAt. Runtime pairing requires exact Enrollment hash, original initial zero-delivery stateHash, alarmAt=C0, issuedAt<=acknowledgedAt<Enrollment.deadline. Ack itself is not a forward permit.
+
+Add lib/mcp-qa-finite-preparation-cleanup.mjs with fixed factual readPrivateQaFinitePreparationCleanup({ctx,env},originalLease). Returns null only when the separate prefix is wholly absent; otherwise returns frozen {enrollment,ack}, where ack may be null. Corruption/orphan/extra rows throw bounded failure. Reads actual ctx/env/storage/QA identity and the original initial anchors with existing codecs/resealing; no supplied source/clock/URL/token/pins or arbitrary callback. Factual only, not an exported enroller or readiness bool. Caller retains the whole actual helper operation and each actual native operation before races; helper does not invent another request clock. Capture/recheck actual holders and guard before/after awaits.
+
+The reader validates capsule linkage to initial Entry/Claim/Selector/materialAck/material and Plan/ArmAck/ActivationSend/ActivationAck/ActivationCompletion using existing codecs and capsule resealing, including exact M/Q/config/bindings linkage. Use the original zero-delivery State reconstructed with the existing State codec for capsule/ArmAck/Ack linkage; CURRENT cleanup state can legitimately have advanced for alarm recovery. Do not require current State==zero forever, or a second alarm delivery would strand recovery. Existing initial handler remains responsible for its bounded actual state chain/delivery counters. If common factual anchor reading is extracted, preserve existing owner reader behavior and cover it; do not copy its whole provider engine.
+
+## Private enrollment in the real transport
+Modify createFinitePolicyTransport.run in lib/mcp-qa-finite-policy-transport.mjs. Mandatory genuine consumer order is unchanged. Add PRIVATE nested enrollPreparationCleanup(childLease,childDeadline) using only captured admission, originalLease, actual ctx/env/storage, verified source and existing store records. Do not export an admission/enrollment mint. In Unit1 only refs.stage==='connection' may enroll; later stages deny with no new row/effect until Unit2.
+
+Require:
+- source.phase closed_ui; exact capsule original preconnectionId==refs.preconnectionId; actual sourceRevision/tree/QA actor/version/window/M current baseline match original capsule/Plan and freshly qualified source.
+- Actual Preconnection, OwnerSourceSnapshot, StageApproval and ConfigurationApproval codec records, matching original source/owner/project/client/resource/realm/baseline. ownerSourceHash is actual snapshot.sourceHash; preconnectionHash is verified stored pre.recordHash; stageApprovalHash matches consumed admission; configurationApprovalHash matches actual approval and pre.approvalHash. No caller-authored DTO or saved hash substitutes for the real consumer/source checks.
+- Current initial Plan/capsule/arm/completion exact, zero-delivery pending State, no nominal HEAD, no initial restore/SEND/receipt or preparatory/policy effects, actual alarm C0 unchanged, now before C0 and original current request/admission/source/custody holder guards.
+- Existing Enrollment/Ack must both be absent; unknown, partial or identical previous data never authorize a resumed writer.
+
+Within one real native transaction reread exact original anchor bytes and required owner records, exclude HEAD/cleanup begun/preexisting enrollment, then append Enrollment only. Require the actual final transaction return, storage.sync, exact Enrollment readback and getAlarm()==C0 under SAME existing child. Append Ack with a separate guarded immutable transaction only after that, then sync/exactreadback/alarm and holder checks. Do not set/delete/replace alarm or initial Plan/State/capsule/backup/journals. A commit/ACK uncertainty returns admin_pending and zero provider effects, retaining pending actual work. No saved row can recreate the consumed admission.
+
+After successful enrollment return existing transport's bounded pending outcome (operationalReadiness=false/mayRetryfalse) BEFORE ANY policy journal SEND or provider POST. Preserve the outer admission bookkeeping/result shape and real consumed admission; no effect is enabled by this unit. Retire the now-unreachable owner SEND segment rather than leave a misleading live positive route; the shared fixed engine and SEPARATE policy setup transport remain intact. Unit2 may reintroduce only the qualified owner publication continuation. Do not duplicate the old production engine in a test fixture.
+
+## Existing alarm obligation
+Integrate the fixed factual helper in lib/mcp-qa-finite-initial-cleanup.mjs. Keep the same existing initial handler; no second alarm handler/owner, generic dispatcher, ordinary index.mjs change or nominal HEAD bypass.
+- No initial or preparatory records: existing null delegation unchanged.
+- Preparatory records without initial anchors, corrupt/foreign/mismatched records, any policy journal SEND/ACK/receipt, unexpected permission linkage, or nominal HEAD: admin_pending; no restore/forward/retry.
+- Valid enrollment with ACK or with ACK absent/uncertain, exact unchanged closed_ui initial pointer and NO preparatory effects: preserve existing initial restoration path and SAME original delivery counter/C0/C1. This unit's production source prevents all owner forwards and actual M is closed_ui. It does not claim general permission cleanup. Preserve every unknown initial activation/restore barrier, foreign-pointer refusal, inventory/custody/backup/last100/config gates.
+- Compare original capsule/zero-state commitment separately from current recovery State so native reconstruction and second delivery do not reset or strand ownership.
+No read-only probe, enrollment or body timeout is physical settlement proof across isolates.
+
+## Native acceptance
+Use test/fixtures/finite-initial-entry-world.mjs to produce the genuine synthetic B1/A/M/capsule/plan/alarm, not a resealed caller DTO. Source/provider/custody/identity remain explicitly synthetic. A test-only internal ticket graph can be seeded through actual store APIs for ORIGINAL A selector, then actual signed synthetic owner POST/CSRF and existing WeakMap consumer must produce admission. Do not override crypto or add a production selector option. Generic first GET mismatch remains a negative test; correct source-derived first GET belongs later.
+Tests must cover:
+1. Meaningful RED: actual genuine consumed connection admission enrolls zero rows currently; new Unit1 must enroll once but stay pending with zero upload/activation SEND/POST.
+2. Exact original A/M selector vs foreign/random ID; source/project/owner/QA/root/holder/clock drift, clone/missing/replayed admission and readonly exclusion, no replacement of same promise set.
+3. Native transaction final throw/commit unknown and post-native-commit ACK hold, rejected/held sync, lost Enrollment/Ack readback/getAlarm ACK; no second enroll/SEND and competing scopes blocked until ACTUAL work settles. Do not use transaction-interior hold with release RPC (native input-gate deadlock).
+4. Prefix codecs reject wrong hash/prototype/accessor/unknown/over-cap and orphan Ack. Existing initial records unchanged byte-for-byte, same getAlarm C0; no new alarms/resources.
+5. Native reconstruction and existing alarm manual fixture invocation with valid enrollment/noAck, current delivery1/2, late slots and original C1; valid closed_ui recovery stays available; corrupt/foreign/enrollment plus issued policy/permission or HEAD refuses. Clearly label SYN/manual alarm event delivery.
+6. Existing production-path owner/connection transport positives become honest enrollment+pending/noPOST cases; preserve identity/CSRF/ticket/deadline/retention assertions. No bypass for historical installed expectations. Existing separate setup/B1/initial cleanup and readonly source unaffected.
+7. Actual pending owner host/no form/ticket remains, unavailable source/forward/native mounts unchanged. No Unit2 or nominal handoff success claimed.
+
+Source ceiling2026-11-03T02:59:00Z remains expired. TechnicalI0+300000,initialC0/C1,commandBy-510000,nominalC0n=T0+240000,C1n=T0+420000,R1=T0+480000,launchT0+150000 unchanged. One consuming occurrence reserved for coordinated PC-off, no partial or separate complete PC-on trial.
+
+Next finite units remain concrete: Unit2 exact authorization/readgrant/notice issuance correlation before writes, partial reduction + safe publication/restoration + source/selector composition; Unit3 atomic same-alarm nominal handoff; UnitB controlled preEntry controller/exactbaseline; wholebranch/fullchecks/actual custody/endpoint/ceiling/latency before ONE actual PC-off occurrence. No new credential needed for this source task.
+
+Report exact BASE/code/reportHEAD, RED/GREEN job/attempt/commands/counts, actual-vs-SYN, warnings and source/module hashes. Scope tests to changed code plus affected consumers and one final changed-graph compiler/residency check; no broad repeats. Temporary qualifier removed before report delivery/main. operationalReadiness=false;completePackage=false;PCoff=false.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-04-preparatory-issuer-fence.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-04-preparatory-issuer-fence.md b/docs/superpowers/specs/2026-11-04-preparatory-issuer-fence.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-04-preparatory-issuer-fence.md
@@ -0,0 +1,92 @@
+# Preparatory issuer fence and grant-only cleanup — Unit 2a
+
+SOURCE-ONLY. PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT isolated feature source/GitHub Actions; ORIGIN delegated-canary.agentfriendlyweb.dev not contacted; RESOURCE_TYPE fixed private QA SQL/journal components; RESOURCE_ID existing QA actor afw-own-successor-closure-v1 / QA namespace070c4a7708eb4592a3ded7c117a88225 and RELEASE_DB6a728254-1494-4039-802e-b39288a55fcc as source identities, NOT remote execution targets. ALLOWED_ACTION source/schema-file edits and credential-free native tests; ROLLBACK revert source unit before promotion. No remote DDL/schema install, provider, Entry, deployment, secret/permission/OTP/OAuth, cron, monitor, Max or other-project action.
+
+## Chosen design and scope
+Follow corrected architecture report docs/superpowers/reports/2026-11-04-preparatory-issuer-correlation-design.md at8e06dae155353374296bd2ba3ddb9fb55db68387 (separate docs branch). Independent builder check BUILDABLE; root selected one narrow monotonic D1 fence table, original SDK authHash/server grantUUID reservation, exact primary barrier then grant-only observation/reduction. Ordinary consent/grant APIs stay unchanged. No fabricated monitoring consent, scan by owner/client, new approval framework, generic database/provider callback or successful DTO authority.
+
+This is the UNMOUNTED fixed QA journal + SQL component. Fixtures may supply explicitly synthetic internal scope DATA; that proves ordering/recovery, NOT actual SDK approval/native M→QA provenance/owner consent. No runtime route, source/forward stub, worker mount or actual pending host is enabled. Unit2b later owns concrete source/selector/SDK/native forwarding/retention/notice composition and deployment cleanup; Unit3 owns the actual single-alarm handoff. Source ceiling remains2026-11-03T02:59:00Z expired. No source/live eligibility by a codec or fixture.
+
+## Clock and primary rulings
+Identity fixes original I0, forwardUntil=C0=I0+900000 and cleanupUntil=C1=C0+180000. Keep initial technicalI0+300000, commandBy-510000, nominalC0n=T0+240000/C1n=T0+420000/R1=T0+480000 and launchT0+150000 unchanged.
+Terminal fencing ONLY reduces permission. Table CHECK permits reserved_at<=fenced_at<original cleanup_until; it does NOT authorize timing. CURRENT prehandoff cleanup coordinator still requires initial C0. Only a future qualified immutable Unit3 handoff derives its earlier original C0n and clipped C1n for the private SQL window. Never accept a public caller clock/schedule or change forward_until/cleanup_until. Do not hardcode fenced_at>=initialC0 in storage: that would break earlier nominal cleanup. Before actual source composition these remain internal component DATA, not an authority API.
+Each actual statement gets the existing original guarded lease and a fixed {startedAt,deadline} window, <=5000ms, clipped by its parent's unchanged end, actual identity/approval/source/consent/grant expiry and appropriate forward/cleanup cutoff. No method constructs a new30s request, refreshes a deadline or treats abort as settlement.
+SQL execution time, not reserved JavaScript correlation time, is the mutation fence. Use native CAST(unixepoch('subsec')*1000 AS INTEGER) and explicit canonical ISO TEXT→epoch-ms conversion for existing expiry columns. Schema/store preflight must fail closed if required SQL clock/conversion/shape is unsupported; no JS-time fallback. Consent/grant expiry must be tested against SQL execution time IN EVERY mutating statement, not only expires_at>reservedConsumeAt. Canonical ISO strings and INTEGER milliseconds are different domains.
+Use captured env.RELEASE_DB.withSession('first-primary') for actual fixed operations; independent primary readback is a NEW first-primary session with the SELECT as first query. A first-primary session's later reads may use sequentially consistent replicas; do not claim they are all physically primary.
+Primary design references: [D1 sessions](https://developers.cloudflare.com/d1/worker-api/d1-database/), [D1 SQL](https://developers.cloudflare.com/d1/sql-api/sql-statements/), [SQLite time](https://www.sqlite.org/lang_datefunc.html). Native tests must qualify actual supported behavior; docs alone are not operational evidence.
+
+## Fixed data and journal
+Add lib/mcp-qa-finite-preparation-issuer-records.mjs. Export sealFinitePreparationIssuerRecord(kind,input), encodeFinitePreparationIssuerRecord(kind,input), decodeFinitePreparationIssuerRecord(kind,raw), FINITE_PREPARATION_ISSUER_PREFIX='afw.finite-preparation-issuer.v1:'. Canonical own-data/domain SHA256, <=16384bytes/record, reject prototypes/accessors/symbols/unknown fields/invalid timestamps before getters. Reuse existing canonical/own/hash helpers. DATA only.
+
+Identity exact fields:
+preconnectionId,enrollmentHash,capsuleHash,sourceRevision,qaVersionId,actorId,subject,accessRealmHash,projectId,projectRevision,clientId,resource,authorizationHash,grantId,requestedScopes,consentExpiresAt,I0,C0,C1,reservedAt,identityHash.
+Use existing hex40/64/UUID/project revision/source-origin/resource/scope grammars. resource fixed https://delegated-canary.agentfriendlyweb.dev/mcp. subject/project/client bounded200chars as existing records; requested scopes current read enum, no new scopes/default evidence. consentExpiresAt canonical ISO with reservedAt < parsed consentExpiresAt <=C0; reservedAt in[I0,C0). identityHash domain 'afw.finite-preparation-issuer-identity.v1' over all other exact fields. This hash is not a capability.
+
+Kinds, with purpose 'afw.finite-preparation-issuer-'+kind.toLowerCase()+'.v1' and recordHash:
+- Reservation: identity,requestHash,issuedAt,deadline. Same actual SDK handle HASH, one server-generated grant UUID for original preId, no raw handle/cookie/JWT/token/SDK output.
+- Send: identityHash,reservationHash,operation,requestId,requestHash,issuedAt,deadline. operation one of open_fence,authorization,consume,grant,close_fence,revoke_grant; requestId null except close_fence/revoke_grant UUID, reserved before issue.
+- Ack: sendHash,rowHash,outcome,observedAt. rowHash hex64 or null only for no_mutation; outcome applied/no_mutation. Actual database fields/rows determine ACK, not caller success.
+- Freeze: identityHash,reservationHash,frozenAt. Timing checked by fixed active cleanup owner, not codec data.
+
+Add createFinitePreparationIssuerJournal({ctx,env}) in lib/mcp-qa-finite-preparation-issuer-journal.mjs, closing actual native storage/actor/QA env holders. Key family prefix+preconnectionId+':' with reservation, operation+':send', operation+':ack', freeze. Fixed appendReservation/appendSend/appendAck/read/freeze methods accept strict records and original guarded lease, never arbitrary key/query/callback. Each append actual transaction final return→sync→exactreadback; no replacing/deleting an old record or reconstructing an issuing continuation from identical data. A single AuthorizationReservation; new request cannot select a fresh grantID for consumed/unknown original attempt. Exact journal signatures: appendReservation(record,lease), appendSend({preconnectionId,record},lease), appendAck({preconnectionId,operation,record},lease), read({preconnectionId},lease), freeze({preconnectionId,record},lease). read returns frozen {reservation,freeze,operations} with null-or-record values and fixed per-operation send/ack pairs; reject unrecognized keys/operations. Existing identical append is factual existing/denial, NEVER recorded as a fresh successful issuing continuation. Current source composer does not expose this factory as RPC. Component data is not actual admitted source; Unit2b must derive it from qualified original enrollment/capsule/owner/SDK path and generate the server UUID before actual reservation. Unit2a's fixture can generate that UUID internally; a codec or DATA argument does not prove actual SDK/native producer authorization.
+
+## Narrow source-only schema
+Create db/finite-preparation-issuer-fences.sql:
+finite_preparation_issuer_fences(
+ preconnection_id TEXT PRIMARY KEY,
+ authorization_hash TEXT UNIQUE NOT NULL,
+ grant_id TEXT UNIQUE NOT NULL,
+ enrollment_hash TEXT NOT NULL,
+ identity_hash TEXT NOT NULL,
+ reserved_at INTEGER NOT NULL,
+ forward_until INTEGER NOT NULL,
+ cleanup_until INTEGER NOT NULL,
+ fence_request_id TEXT NULL,
+ fenced_at INTEGER NULL
+).
+CHECK key/hash/UUID/time/paired-null grammars and forward_until<cleanup_until, reserved_at<forward_until, reserved_at<=fenced_at<cleanup_until when terminal. No foreign key to a not-yet-existing grant/consent: reservation precedes those business rows.
+Named triggers no_delete, immutable_identity and terminal_fence under this table prefix: no delete/immutable tuple change; fence fields may only move pairedNULL→terminal or remain identical, never reopen/change terminal identity/time. OPEN uses plain INSERT SELECT, never upsert/UPDATE/REPLACE. Late OPEN cannot undo closed-first tombstone. Inspect actual schema/trigger definitions in preflight, not names alone. No auto-install/fallback at runtime. Do not alter ordinary db/schema.ts or existing business-table semantics unless a concrete schema mismatch requires root ruling. Remote installation/preservation is separately pending.
+
+## Fixed QA SQL store interface
+Add createFinitePreparationIssuerStore({ctx,env}) in lib/mcp-qa-finite-preparation-issuer-store.mjs. Actual ctx/env/RELEASE_DB captured/rechecked; no supplied db/now/SQL/fetch/URL/token. Existing lease contract/retention applies before/after every actual await; caller can logically timeout while the actual operation stays retained. Factory itself is not business authorization and remains unmounted.
+Expose only these internal fixed methods, each (options,lease):
+- openFence({identity,window})
+- insertAuthorization({identity,window})
+- consumeAuthorization({identity,consumedAt,window})
+- insertReadGrant({identity,consumption,grant,window})
+- closeFence({identity,fenceRequestId,window})
+- reconcileFence({identity,fenceRequestId,window})
+- observeGrant({identity,barrier,expectedGrant,window})
+- revokeGrant({identity,barrier,observation,window})
+window={startedAt,deadline}. grant/expectedGrant exact {scopes,createdAt,expiresAt}; all dates canonical ISO, scope subset verified against exact reserved consent. No arbitrary targets/mutations; all SQL prepared and bound fixed tables/resource selectors.
+consumption is only the actual successful non-null UPDATE RETURNING result from THIS store instance/surviving invocation, privately recognized and one-use before grant issue; cloned/serialized/SELECT-reconstructed consumed rows cannot issue. This is a SQL continuation witness, not a new owner approval protocol. A consumed consent without grant is terminal valid, never repaired.
+barrier is only an actual acknowledged terminal row plus exact fresh-primary readback, or exact same-requestID primary reconciliation; privately recognized factual result tied to store/identity/holders. Cloned/open/foreign barrier cannot support absence/revocation. observation likewise actual exact read result, not supplied successful row DTO. No private witness can authorize an HTTP caller or survive serialization as a permission.
+
+All finite granting SQL requires exact unfenced row matching preId/authHash/reservedGrantId/enrollmentHash/identityHash and original times. Include current site_projects id/user_id/revision and original client/resource/scope/consent tuple where applicable:
+- OPEN INSERT SELECT before consent, SQLnow>=window.startedAt and<deadline and<C0; exact current owner/project/revision.
+- Consent INSERT SELECT into delegated_consent_sessions(handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at). kind authorize; scopes JSON exact reserved requested list; consumed_at ''. No replace/retry.
+- Consume UPDATE ... consumed_at=reserved canonical consumedAt WHERE exact tuple, consumed_at='', original expires_at exact, current owner/revision, actual SQLnow<consent expiry AND request deadline/C0; RETURNING exact actual fields. reservedConsumeAt is correlation only.
+- Grant INSERT SELECT reserved grant UUID FROM exact consumed consent + exact unfenced row + current owned project/revision; scopes approved subset of original scopes_json; created/expires exact reserved canonical values, expires<=consent/C0/original limits. Actual SQLnow<both consent and grant expiry AND original deadline/C0. Preserve exchanged_at default. Only genuine actual consumption witness proceeds. One attempted grant, no new ID/retry after unknown.
+- Terminal close-first upsert derives fenced_at from SQLnow, immutable row conflict predicate and same requestID, never clearing/replacing old terminal fields. It may insert terminal row even if original OPEN pending. SQLnow>=the PRIVATE current owner's original window.startedAt and<min(window.deadline,originalC1). No caller-provided :cleanupNow timestamp. Table permits earlier terminal reduction; actual source coordinator timing remains unmounted/qualified later.
+- Actual ACK+new first-primary exact readback required before any grant lookup/absence/revocation. Unknown ACK preserves same FenceSend; reconcile only its exact requestID/immutable tuple/server fencedAt. No new fence identity or automatic resending. Same-row primary serialized barrier orders issued grant SQL: before barrier committed and observable; after barrier cannot join unfenced row. Confirm in native tests, not from JS timers.
+- observeGrant queries ONLY original reserved UUID and validates exact consumed consent/original owner/project/client/resource/scopes/created/expires; no notice required. Only post-confirmed barrier can absent be meaningful. Foreign/new owner/revision/identity mismatch fails closed.
+- revokeGrant updates ONLY revoked_at of that exact immutable grant, SQL-generated canonical time, original cleanup window/confirmed fence/current owner/revision. Preserve legitimate exchanged_at and an existing revocation timestamp; report already_revoked instead of overwriting it. Do not fabricate consumption, alter original expiry or create monitoring consent.
+
+The store/schema preflight is fixed read-only SQL and must reject missing/tampered table/triggers/unsupported clock before effects. Ordinary createDelegatedOAuthStore remains unchanged and is NOT a fallback.
+
+## Integration boundary and native proof
+Do NOT mount producers or call SDK. Real M has AFW_FINITE_TRIAL_CONTROL→existing fixed QA, but a profile is not native provenance. Unit2b must prove actual sender/receiver, original deadline/abort/retention, actual SDK approve/CSRF and original A selector. Its granting branch must deny missing cookie/failed native hook rather than ordinary fallback; not implemented here.
+Add a conservative fixed initial-alarm refusal if issuer-prefix data exists while its full cleanup consumer is unqualified. No new alarm/handler, no restoration/permission claim from issuer data. Existing Unit1 enrollment/no-issuer exact closed_ui recovery remains unchanged. This prevents newly introduced unresolved issuer records being silently ignored; complete consumer belongs Unit2b.
+
+Tests via existing Node22 lock/Miniflare actual D1+DO:
+1. Strict records/schema triggers/clock preflight; OPEN vs closed-first in both orders; immutable identity/terminal/delete/collision rejection; no grant/consent invented by fence.
+2. Actual finite consent/consume/grant SQL queued beyond original statement D, consent expiry, grant expiry and C0; stale JS consumedAt does not bypass actual DBnow, ISO/integer never compared implicitly.
+3. Grant INSERT before barrier with response/DO link ACK held: exact reserved UUID found and revoked after confirmed barrier; no notice row required. After barrier grant INSERT mutates0, including delayed OPEN/consume/grant work. Unknown fence ACK/restart exact reconcile; never claim absent before confirmed primary barrier.
+4. Genuine actual UPDATE RETURNING witness only; clone/foreign/store/lease drift/replay/SELECT reconstruction denies grant. consumed/no grant terminal; no secondID/repair.
+5. Existing/revoked grant, foreign project/revision/client/resource/scopes/times; preserve legitimate exchanged_at/history; no broad scan or changes to unrelated rows.
+6. Native journal transaction final throw/post-native-commit hold/sync/readback loss: no subsequent SQL issue; actual pending work remains retained through settlement; no transaction-interior release deadlock.
+7. Record original capsule/enrollment selector linkage separately using genuine pre-Nov3 capsule fixtures where needed. Real SQL clock tests use current native database-time component rows and explicitly SYN internal identities, not a forged live capsule. Any clock substitution is SYN; no production clock injection/source ceiling renewal. No claim of full source/SDK/remote composition from component green.
+8. Initial alarm sees unknown issuer-prefix→admin_pending; no issuer rows→Unit1 existing recovery unaffected; ordinary OAuth/store tests unchanged.
+
+Meaningful RED for absent new SQL/fence feature, then actual native ordering/deadline/recovery assertions. Fixture parse/RPC failures are not causal RED. TDD may establish missing new interface/schema explicitly; do not substitute ordinary issuer as a fake production finite fallback.
+Report exact BASE/code/reportHEAD, RED/GREEN/commands/job/attempt/counts/warnings, actual-vs-SYN, SQL schema hash and unchanged existing-row checks. Scoped tests/lint; runtime graph only changes by alarm refusal, so relevant compiler check once if needed. Remove temporary qualifier before delivery; no full/unrelated repeats absent concern. operationalReadiness=false;completePackage=false;PCoff=false.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-04-single-live-pcoff-sequence.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-04-single-live-pcoff-sequence.md b/docs/superpowers/specs/2026-11-04-single-live-pcoff-sequence.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-04-single-live-pcoff-sequence.md
@@ -0,0 +1,16 @@
+# Current trial-sequence ruling — 4 November 2026
+
+This correction takes precedence over earlier continuation wording that implied a separate complete PC-on live rehearsal followed by another complete PC-off occurrence.
+
+Ruling: complete non-consuming closed/source/native/CI and permitted PC-on preflight first. Coordinate ONE fully prepared owned live occurrence as the actual PC-off trial. Its attended bootstrap, owner decisions, seed/private setup and later shutdown are phases of that same occurrence. Do not consume initial Entry for a partial trial or separate full PC-on rehearsal.
+
+Evidence at primary73c6b79430db10ed9eaa663c9625569d8f88aba6: initial-entry spec12–18 onefixedglobalEntry/neverdelete-replace-refund; initial-entry code107–111 only newly insertedEntry reachesA; material-store24–36 fixedonce/selector/ack; finite-trial-control151–154,271–276 exactHEAD andabsentstate; cleanup spec survivingwinner/no saveddatarearm. No existing factory supplies a second fresh claim aftercompletion/expiry. This is a plan correction, not a new generation mechanism or source-authority change.
+
+Before shutdown in the actual same occurrence: qualified seed/setup -> exact observer -> adoption/readiness -> launcher -> timely ARM, with root actually observing ARM by its originalbound. Launch remainsT0+150000, no sliding becausehumanhandofflate. InitialI0+300000, C0=I0+900000,C1=C0+180000 andbusinessT0 clocks distinct/unchanged. Complete honest reconciliation/restoration for sameoccurrence. Any later freshoccurrence would require a separate supported design/authorization, not reset/deletion/reuse.
+
+Source ceiling3Nov02:59UTC remains expired; current sourceeligibilityfalse. No actualEntry/seed/setup/launcher/ARM/OAuth/runtime call was executed for this ruling. operationalReadiness=false;completePackage=false;PC-off pending.
+
+Capsule source now independently accepted atbae6562/CI41873478253, acceptance+integrationbrief73c6b794. Feature-source readonly integration is the current implementer task. Unmounted factual owner source and dedicated pre-admission request retention/handoff remain subsequent source tasks; all must qualify BEFORE consuming initialEntry.
+
+---
+

~~~~~~~~~~

## docs/superpowers/specs/2026-11-05-finite-native-first-connection-publication-design.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-05-finite-native-first-connection-publication-design.md b/docs/superpowers/specs/2026-11-05-finite-native-first-connection-publication-design.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-05-finite-native-first-connection-publication-design.md
@@ -0,0 +1,283 @@
+# Primera publicación connection nativa: despacho inicial y cierre SOURCE
+
+2026-11-05 — **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED OPERATIVAMENTE**.
+
+Diseño aprobado en alcance por root, pendiente de lectura/preflight/BASE de ejecución. No es un plan ni autoriza implementación, Actions, provider, credenciales, mount operativo, main/merge o renovación. Inspección inmutable 953e7af1fc20b59c59d8e4a03dcf398d98165cf5. POST aceptado SOURCE en f62b6c8b; Link está fuera del pin como implementación y deberá reconciliarse únicamente cuando root entregue su aceptación. No seguir WIP.
+
+Repositorio público tokenizartinfo-ops/agent-friendly-web (1347578006). Este documento se guarda por GitHub connector en docs/finite-native-notice-receiver-design-20261105 desde 949418367234d44e7d633be87b12a20702a57d8b. Sólo documentación; rollback CAS de commits propios.
+
+## 1. Resultado único y decisiones cerradas
+
+La unidad futura debe producir el primer ConnectionReceipt real desde un POST humano: GET de elección → POST firmado/CSRF → aprobación persistida → admisión consumida en esa misma lease → enrollment existente → upload/ACK/readback → activation/ACK/pointer/config → receipt durable y par factual completo. El provider es SYN fijo en laboratorio; D1/DO, JWT, bodies, Promises, compilación y productores son reales. El predecessor positivo NO puede proceder de seedPhaseFacts, ACK prefabricado ni escritura directa de effects.
+
+El módulo canary desplegable contiene desde initial CLOSED el despacho finite. Su script no cambia al instalar connection: sólo AFW_DELEGATED_OAUTH_ENABLED pasa de false a true. Bytes, módulos, referencias físicas y todos los demás campos son idénticos. No editar cápsulas, hashes o manifest existentes para acomodar una compilación nueva. La prueba crea su lineage SYN original con esos bytes desde el principio; no representa renovar un lineage real.
+
+Root eligió connection porque notices-only dependería de una publicación connection todavía sintética. GET-only dejaría elección sin cierre; POST cerrado consumiría admisión irrecuperable. Se reutiliza el motor para notices en una unidad posterior, sin implementarla aquí. Cada etapa futura requerirá su propia aprobación/lease original; no conservar admisión entre peticiones.
+
+El despacho OAuth/notice ya calificado se integra como SOURCE desde origen. Ruling root: notice GET/POST prepara consentimiento, no instala stage notices. Se abre el conduit sólo tras OAuth=true; QA exige read_consent factual, grant/owner/JWT/CSRF/historia/techos. No depende de habilitar el flag ordinary monitoring; por eso no existe ciclo consentimiento→flag. Source/config no válidos, QA ausente o phase posterior no soportada deniegan. Nunca fallback a ordinary SQL.
+
+operationalReadiness=false; completePackage=false; PCoff=false. Tercer CLOSED, finite_prearm, publicación notices, selección/full setup, ARM, guard, suscripción, entrega y retirada útil quedan fuera.
+
+## 2. Evidencia que fija la arquitectura
+
+| Archivo en pin 953 | Líneas o frontera | Blob |
+| --- | --- | --- |
+| lib/mcp-qa-finite-owner-preparation.mjs | 39–45 admisión consume-only;198–261 choice;201–203 seam GET-only | 01ec291de2631a7cd7e527e2a567f44ac6067522 |
+| lib/mcp-qa-finite-policy-transport.mjs | 65–123 enrollment;124–135 owner pending;144–177 engine;181+ setup separado | 2262ae240990a2df6755944aa7958548d8679422 |
+| lib/mcp-qa-finite-owner-phase-context.mjs | 144–151 inventarios;186–219 primarias;350–388 effects/snapshot | f8948c0a2cc41a48773406a64fc9c863226f9b2d |
+| lib/mcp-qa-finite-stage-work.mjs | observe request/factual, adopt y retain | a89baeb2578856dadedf700f9d66e180eb09120e |
+| lib/mcp-qa-finite-owner-native-wire.mjs | target/origin/boundary y operación retenida | 42aa81f82b60bcc66a140f1358784108696f41e5 |
+| lib/mcp-qa-finite-owner-native-bridge.mjs | forward fijo que hoy siempre retorna pending | ccbf1e709a5afb48f80f285b12d7744ddda278ba |
+| lib/mcp-qa-finite-owner-native-receiver.mjs | receiver con holders/body pero negocio pending | c09bd715c0e84dfebde0b27de940886d573ba643 |
+| worker/mcp-own/finite.mjs | default ordinary heredado; clase cleanup preservada | baa374a2ed41cdb637c23357a3d9d5f3e4ae9d0b |
+| worker/independent-closure/finite.mjs | composición SOURCE; DO sin dispatch choice/OAuth/notice | bf32c10f01cd2cc4acda3b9cb4dc81f5eb422149 |
+| scripts/build-finite-native-package.mjs | 38–87 node→M→QA;90–99 complete package cerrado | e8a73ce9f541993657bf8bf4c9bd8d3b02b8598d |
+| lib/mcp-qa-finite-candidate-residency.mjs | reader sin argumentos, bytes/hash/tree compilados | 29373312a0e60ed6ca87ca3952dba751186662a8 |
+| test/fixtures/finite-owner-phase-context.mjs | 46–62 predecessor SYN, IDs/ACK escritos por fixture | f1ddbfff29b1d5e4da4dbf70c649e0df20582b46 |
+
+Contratos protegidos: ConnectionSend/Ack/Receipt y StageApproval existentes; qualifyFiniteOwnerInstalledStage; profile closed_ui/read_consent; policy journal issue/acknowledge/finish y writer-head. El helper de enrollment conserva el writer actual por extracción, no lo rediseña.
+
+El grafo compartido actual es owner-preparation → policy-setup → policy-transport. Entra en M. Por ello policy-transport NO puede importar phase-context ni candidate-residency. Ésta es la razón de separar dos helpers pequeños sin dependencias QA.
+
+## 3. Mapa de llamadas y mounts SOURCE exactos
+
+Grafo elegido:
+
+- M finite default → bridge choice / forward OAuth / forward notice → binding AFW_FINITE_TRIAL_CONTROL, actor fijo afw-own-successor-closure-v1.
+- QA IndependentClosure.fetch → receiver fijo según URL interna → handler correspondiente de phase-context.
+- Nuevo handler connection en phase-context → seam choice de owner-preparation → consumeFiniteOwnerStageAdmission → adoptFiniteOwnerRequestStageWork → fuente/frame léxicos + helper enrollment + engine fijo + journals Connection.
+- policy-transport antiguo y policy setup → mismos helpers compartidos; nunca importan phase-context.
+- QA incluye M residente compilado; M no incluye decoder/residencia QA ni un import de su propia bundle.
+
+### M finite.mjs
+
+Modificar únicamente el default wrapper de este perfil SOURCE, preservando AfwNodeControl, AfwOwnEventNode y sus restricciones legacy. No editar worker/mcp-own/index.mjs ni delegated-oauth-worker/ordinary handlers.
+
+Origen exacto https://delegated-canary.agentfriendlyweb.dev; mismo account/worker/namespace de perfiles existentes. Ningún hostname, flag, ruta administrativa, credential o namespace nuevo. Dispatch por pathname reconocido antes de delegar al worker heredado, de modo que URL/método/origin malformados nunca caigan a ordinary.
+
+| Entrada humana | Dispatch | Gate M adicional |
+| --- | --- | --- |
+| GET/POST /connections/finite-prepare, sin query/hash | forwardFiniteOwnerChoice existente | perfil finite compilado, binding/actor/version capturados; CLOSED o conexión existente se decide en QA |
+| GET/POST /authorize | forwardPrivateFiniteOwnerOAuth existente | AFW_DELEGATED_OAUTH_ENABLED==='true'; gramática existente |
+| GET /monitoring | forwardPrivateFiniteOwnerNoticeGet | OAuth true; QA read_consent actual |
+| POST /monitoring/grant | forwardPrivateFiniteOwnerNoticeConsent | OAuth true; QA decisión/CSRF actual |
+| /connections, /connections/revoke, /monitoring/revoke y métodos no admitidos de rutas anteriores | denegación fija | ningún fallback ordinary |
+
+/oauth/token y /mcp conservan SDK M existente bajo sus gates actuales; se demuestra compatibilidad D0.4 con bindings reales compartidos. No se implementa registro/clientes/refresh como parte de esta unidad ni se amplían rutas ordinary. No abrir rutas finitas por un simple OAuth=true de otro Worker: sólo wrapper finite, origen exacto, bindings/version/actor originales y calificación QA. Todo request finite crea su root de 30 s antes del primer IO; finish en finally después de terminar respuesta lógica, reteniendo trabajo nativo pendiente por el scope existente.
+
+En CLOSED las rutas OAuth/notice deniegan antes de efectos. Choice puede mostrar la decisión sólo si QA califica el initial CLOSED real, fuente/cápsula/alarm/Access/owner vigentes. Su existencia en bytes no habilita conexión.
+
+### QA finite.mjs
+
+Añadir override fetch sólo al IndependentClosure SOURCE. Las cuatro URLs son constantes ya existentes:
+- https://afw-private.invalid/_finite-owner/choice
+- https://afw-private.invalid/_finite-owner/authorize
+- https://afw-private.invalid/_finite-owner/monitoring
+- https://afw-private.invalid/_finite-owner/monitoring/grant
+
+Cada una llama al receiver fijo existente; choice dejará de retornar pending y llamará al nuevo handler. Método de transporte POST exacto; no RPC nuevo, selector de actor ni reader público ampliado. URLs del prefijo finite desconocidas deniegan; fuera de ese prefijo se conserva super.fetch. No cambiar default QA, workflows, alarm ni métodos iniciales.
+
+Los receivers crean la raíz QA local recortada al boundary M original, no una nueva ventana. Metadata de transporte es DATA: la identidad se verifica con JWT y la fuente con primarias/holders. QA comprueba versión M recibida contra pointer inicial real al entrar; tras su activación propia conserva esa versión de entrada como hecho histórico, no la reescribe para igualar el nuevo pointer.
+
+## 4. Choice y admisión humana
+
+Nuevo export de entrada fija en phase-context:
+handlePrivateQaFiniteOwnerConnection({request,env,ctx},originalLease) → Promise<Response>.
+Sólo estos argumentos; sin source, bytes, expected, admission, callback ni flags caller. El receiver choice lo invoca una vez. El root debe estar registrado y pertenecer al request original.
+
+Reusar continuePrivateQaFiniteOwnerChoice/choice. Se amplía el seam interno GET-only para admitir POST; el handler construye su reader factual léxico fijo y exige phase closed_ui/action connection. No se añade callback a HTTP/RPC ni un nuevo constructor de source. El reader interno existente sólo entrega {source,preconnectionId,capsuleHash}; pair/expected permanecen privados. preparePrivateQaFiniteOwnerChoice antiguo conserva su interfaz y resultado; este cambio no habilita su publicación genérica.
+
+Gramática choice en native-wire: origen/path/método exactos, GET sin body/query/hash; POST application/x-www-form-urlencoded, bytes <=1024, UTF-8 válido, escapes válidos y exactamente handle/projectRef/decision=approve, únicos y hex64 según choice. Cookie prepare única, handle matching; cookies ajenas válidas no son credenciales. Aplicar validación estricta de cookie-list equivalente al contrato POST aceptado, privada y sin parser configurable. Reusar lector real de 1024 bytes de notice-consent-body bajo alias local para POST choice; no cambiar sus métodos ni su semántica. GET usa lector acotado existente y exige cero bytes.
+
+Access firmado por verifyCloudflareAccessJwtWithExpiry, realm/audience de fuente; ownerSelection original, D1 first-primary owner/revisión, client/resource y periodo original. Origin exacto y CSRF handle/cookie/projectRef/decision se comprueban antes de consumir Ticket. Ningún permiso se deduce de subject en un DTO ni de callback.
+
+GET devuelve HTML fijo con goal/expiry y form de tres campos de choice, cookie __Host-afw-finite-prepare Secure/HttpOnly/SameSite=Strict/Path=/, Max-Age recortado. Renderizar sólo enums/hex/tiempos calificados; no IDs internos de provider/journal ni body upstream. POST mantiene cookie requerida por OAuth, no renueva expiración. POST retorna 200 sólo después del receipt/final pair; fallos 503 o error de entrada acotado. Texto: configuración de lectura preparada; lectura/avisos siguen decisiones separadas. No “suscripción lista”.
+
+M bridge debe transportar sólo HTML/headers permitidos de esa respuesta QA, con body <=16384 y no-store/CSP/referrer policy; no mantener el actual “siempre pending” en éxito, ni reflejar headers arbitrarios. Response no exitosa nunca se transforma en éxito.
+
+Tras choice POST status202, el handler exige stage==='connection' y preconnectionId original; consume admisión UNA vez bajo originalLease. Guarda el objeto exacto sólo en scope léxico y adopta stage-work existente. Resultados StageApproval/TicketUse no permiten reanudar tras finish/restart. Baseline de nueva elección/publicación deniega efectos/enrollment previos o aprobación connection ya consumida; GET público no se convierte en ruta de reintento de una publicación parcial.
+
+## 5. Fuente concreta sin factory ni DTO de autoridad
+
+Toda calificación ocurre dentro del handler junto a observeOwnerPhasePair. No implementar un source registry ni abrir readPrivateQaFiniteConnectionSource a valores caller: el stub antiguo permanece cerrado. El nuevo productor tiene fuente fija léxica, no una segunda vía configurable.
+
+Capturar ctx/storage/actor, namespace/self methods, RELEASE_DB/withSession/prepare, QA metadata, reader/publisher bindings, fetch y root/child. assertCurrent del scope comprueba identidad de referencias, expiraciones, failed absorbente y lease vigente antes/después de awaits. M/QA y DB/KV/DO se verifican con los validadores existentes, no sólo igualdad de env strings.
+
+Hechos originales:
+- readPrivateQaFiniteCandidate() y bootstrap expectations sin argumentos: sourceRevision/tree/program/bytes/hash exactos.
+- cápsula, initial plan/zero state/arm/activation completion, alarm C0, snapshot/source/ticket/approval originales.
+- ambos snapshots completos, owner real; current QA pointer/module/profile y M pointer/module/config.
+- reader/publisher IDs y expiraciones exactos del plan, comprobados por primarias; no asumir custodia actual desde el último informe.
+- ausencia de issuer/SDK/notice/grant/connection y effects al comienzo de primera conexión. Nada global/latest ajeno. Inventarios originales conservan caps.
+
+Paquete privado local del efecto (DATA, nunca exportado):
+baseline={versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,module:resident.module,configuration:plan.configuration}.
+candidate={module:resident.module,configuration:clone(baseline.configuration) con sólo OAuth=true}.
+bytes.baseline y bytes.candidate son copias defensivas del MISMO resident.bytes.
+rollback se obtiene del Backup/Chunks original exacto, con descriptor/hash/config/version/deployment históricos; nunca del último pointer.
+
+El baseline CLOSED inmediato es recuperable mediante plan/capsule/residencia con hashes exactos; el histórico mediante Backup/chunks/retainedIds. Antes de SEND se reconstruyen y comparan ambos materiales y se verifican las versiones/pointers necesarios. No se crea nueva tabla/registro de backup ni se sobreescribe el histórico. El snapshot/plan/capsule y bundle fuente preservados permiten reconstrucción factual, no autorización automática de rollback.
+
+El delta candidate exige igualdad completa salvo AFW_DELEGATED_OAUTH_ENABLED false→true. qualifyFiniteConnectionProfile(read_consent) adicional; monitoring flag permanece false y policy vacía. Módulo igual, flags restantes CLOSED, bindings físicos/Access/limiter/secret references exactos. Secret metadata sólo {name,type}; wire usa inherit del baseline CLOSED inmediato verificado, nunca valor de env ni BASE histórico hardcoded. Si falta material/hash/metadata válida, cero SEND.
+
+No mover sourceRevision/tree/capsule al nuevo commit por normalización. Cambiar este software obliga a construir la nueva prueba SOURCE desde su initial CLOSED propio. Promoción real/actualCloudSourceProof sigue separada y no puede utilizar el ceiling vencido.
+
+## 6. Helpers compartidos: firmas y ownership cerrados
+
+### Engine fijo, nuevo lib/mcp-qa-finite-fixed-policy-engine.mjs
+
+Extraer fixedPolicyEngine de policy-transport, conservando validadores/body limits y referencias capturadas. API interna:
+createFiniteFixedPolicyEngine({ctx,env},guard) → objeto frozen con:
+- describeUpload({configuration,baselineVersionId,bytes}) → DATA {method:'POST',path,body}; path literal de versions?deploy=false.
+- upload({configuration,baselineVersionId,bytes},lease) → Promise<resultado provider validado>.
+- describeActivation({versionId}) → DATA {method:'POST',path,body}; path literal de deployments.
+- activate({versionId},lease) → Promise<resultado provider validado>.
+- readPointer({versionId,deploymentId},lease) → Promise<void>.
+- readVersion({versionId,module,configuration},lease,closed=false) → Promise<metadata verificada>.
+
+No export de http(method,path,body), ROOT configurable, credential, transport callback ni wire de destino libre. ROOT/account/worker y métodos quedan literales dentro del módulo. describe sólo calcula el mismo body que ejecutará la operación; source/requestHash compara su canonical completo. upload/activate reconstruyen ese body fijo, validan UUID y material acotado, no reciben body/path externos. guard es exclusivamente el current-check léxico de los dos producers internos enumerados, no un verificador de permiso. El módulo no se reexporta desde entrypoints públicos ni acepta una aprobación por callback: admisión y fuente se consumen/verifican en cada producer antes de entrar. Engine y describe no fabrican capability. La existencia de estas operaciones internas no autoriza a otro caller a invocarlas; sólo el transporte setup existente y el handler connection las componen con sus controles originales.
+
+No dependencia en phase-context/residency. policy setup adopta estas operaciones fijas manteniendo payloads/paths y resultados actuales; no cambia su admisión ni Policy records. Cualquier diferencia de wire o captura es regresión, no refactor inocuo.
+
+Retener el trabajo real fetch→body read→cancel antes de races. Error conocido se señala sin esperar indefinidamente cancel, pero su completion real sigue retenido. Puede implementarse first-failure interno/race sin callback aprobador: sólo resolución normal del trabajo completo entrega resultado; fallo queda absorbente. No convertir Promise del timeout en “settled native”. Capturar fetch/tokens/holders y comprobarlos en cada borde. Límite de respuesta existente 4718592, sin redirects/cache inesperada; secret content/exports reconciliation desconocidos deniegan. Ningún log de tokens, script o body.
+
+### Enrollment fijo, nuevo lib/mcp-qa-finite-preparation-enrollment-writer.mjs
+
+Firma exacta:
+prepareFinitePreparationEnrollmentWrite(
+ {ctx,env,preconnectionId,stageApprovalHash,ownerSource,baseline,baselineBytes},
+ childLease,
+ childDeadline
+) → Promise<{recordEnrollment(),recordAck()}>.
+
+ownerSource/baseline son DATA copiada y validada, no source factory ni boolean de aprobación. El helper no consume admisión ni concede SEND. baselineBytes se copia defensivamente, verifica descriptor/hash, nunca se loguea/persiste/serializa. Captura nativos/anchors/ownerRows del código actual; no expone setters, ctx, source callback ni pair.
+
+childLease es la MISMA child capturada; childDeadline proviene de su apertura original, se recorta por sus límites/C0/pre/Access/approval y nunca por now+fresh. El objeto existe y se consume en la misma continuación. Se consume cada método antes de su primer await/efecto; segundo intento/orden incorrecto/fallo desconocido deniega.
+
+Orden exacto comparado con transport:65–123:
+1. Caller source/current antes de preparar; helper captura y valida anchors, ownerRows, baseline bytes y construye Enrollment/issuedAt/deadline igual.
+2. Caller source/current antes de recordEnrollment(). Éste hace la misma transaction, comparaciones de bytes/ausencias, append→sync→get/getAlarm y readPrivateQaFinitePreparationCleanup; exige enrollment exacto y ack null. Prepara en privado el Ack/acknowledgedAt en el mismo punto original, antes del siguiente recheck.
+3. Caller source/current antes de recordAck(). Éste persiste sólo ese Ack, repite transaction/sync/readback y lectura cleanup final; exige hash exacto.
+4. Caller recheck después de cada resultado; cada método retorna sólo los records factual verificados necesarios para expected.
+
+Keys, contenidos, chronology, alarm, zero state, exclusión de effects/otras etapas y comparación original en transaction no cambian. No regenerar Ack tras unknown ni aceptar existing como recuperación. El helper retiene IO reales en el mismo stage-work. El old transport conserva sus qualified calls en estos mismos puntos y termina pending como antes; nuevo handler ya consumió admisión y aplica sus rechecks. No duplicar las ~60 líneas ni importar QA en el grafo compartido.
+
+## 7. Observer y transiciones propias: ninguna autoridad transportable
+
+El reader común podrá describir prefijos connection parciales válidos como hechos; no calificarlos como instalados. Lector público de tres keys y entradas OAuth/notice exigen receipt connection completo como antes. En particular, effects no vacío sin receipt válido deniega en el reader público; nunca se proyecta closed_ui a partir de un journal parcial. PUBLIC no permite pending. Nuevos requests choice requieren baseline inicial limpio, por tanto no reanudan esas filas.
+
+Sin parámetros allowPending/expected/tolerate a APIs exportadas. El handler conserva referencias propias; el observer interno sólo devuelve facts privados. Extender el decode de effects a los estados estrictos del journal, con whitelist exacta por identidad connection original. No stages notices/finite, Failure desconocido, escritor ajeno ni extra rows. El writer-head debe ser el último SEND esperado, no cualquier ACK.
+
+Estados léxicos exhaustivos del productor:
+approved → enrollment-recorded → enrollment-ack-recorded → upload-send-recorded → upload-native-pending → upload-ack-recorded → upload-observed → activation-send-recorded → activation-native-pending → activation-ack-recorded → activation-observed → receipt-recorded → complete.
+Cualquier estado no enumerado deniega. Los dos native-pending no admiten recheck que convierta hechos externos en resultado propio. Errores de cualquier etapa fijan failed y cierran la continuación.
+
+Referencias separadas: ownAdmission; actual enrollment operations/results; ownUploadSend/actualUploadPromise/actualUploadResult/uploadSettled/ownUploadAck; ownActivationSend/actualActivationPromise/actualActivationResult/activationSettled/ownActivationAck; actual receipt write/sync/readback. Nunca sobrescribirlas con lecturas de journal. ACK se construye sólo de resultado nativo normal observado aquí.
+
+En cada recheck permitido, primero verificar coherencia de esas referencias y luego ambos snapshots completos contra expected. Aplicar a expected sólo la mutación comprobada:
+- enrollment/ack: records.enrollment, anchor.enrollment, installed.enrollment/ack.
+- SEND/ACK: records.effects + anchor.effects, orden/list y writer-head exactos.
+- activation observada: physical.pointer/currentConfiguration y derivación exacta qaSdkBindingFacts de metadata ya verificada; baseline inicial/sourceBase/capsule/QA permanecen iguales.
+- receipt: installed.receipt y receipt raw en effects.
+Todo el resto debe permanecer byte/canonical exacto, incluidas filas actual grant.exchanged_at y snapshots de owner/SDK si corresponden; no copiar pair entero como expected.
+
+Mientras upload está acknowledged pero sin activation, pointer sigue baseline. Después de activation ACK, pointer/config pueden ser únicamente los derivados de los resultados propios y candidato exacto. Observer parcial correlaciona upload ACK/version y activation ACK/deployment sin construir permiso; sólo handler con Promises reales tolera sus estados. Si activation result se pierde, no se lee pointer para fabricar ACK/receipt. qualifyFiniteOwnerInstalledStage sólo corre como instalada al existir receipt completo.
+
+El source/factual reader después de completion valida historial ACK bajo su deadline histórico, pero tiempo actual bajo C0/Access/permiso originales; no exige now anterior a cada ventana de efecto ya terminada. Esto preserva continuidad sin backfill.
+
+## 8. Secuencia temporal de efectos
+
+M y QA conservan root original <=30000 ms. Capturar entrada antes de leer bodies/source. Parent narrowing por Access firmado actual, pre/approval, C0 y expiraciones reader/publisher; no refrescar identidad/Access ni I0/C0/C1. Child <=5000 ms, siempre recortada al parent restante. C0=I0+900000; C1=C0+180000; fuente 2026-11-03T02:59Z vencida.
+
+Enrollment completo cabe en una child: source checks entre fases, helper y readbacks; no renovar para su Ack.
+
+Upload child: source/full recheck → describe request exacto → journal.issue recorded → sync/readback SEND → recheck propio → native upload → validar UUID/reconciliation → journal.acknowledge recorded → sync/readback ACK → readVersion candidate real y comprobar pointer baseline → recheck completo. SEND.issuedAt/deadline capturan esta child, requestHash usa dominio afw.finite-policy-request.v1 con method, path absoluto ROOT+path, body y baselineVersionId/baselineDeploymentId del request real, conforme engine actual. No retry ante unknown. Si los costes no caben, fallar y reportar; no reducir checks.
+
+Activation usa otra child dentro del MISMO parent/admisión, con plazo propio antes de SEND: source/current/full recheck y pointer baseline → issue/sync/readback → recheck → native activation → ACK/sync/readback → pointer/version/config reales → construir ConnectionReceipt → finish/sync/readback → par completo final y guard. completedAt y receipt finish deben seguir dentro del deadline de activation SEND. No trasladar receipt a nueva child para ganar tiempo.
+
+ConnectionSend campos existentes; identity={kind:'connection',preconnectionId,sourceRevision,stage:'connection',effect}. contextHash existente {preconnection,stageApproval,predecessors:[],grant:null,notice:null}. Receipt contiene baseline CLOSED IDs, versionId devuelto por upload, deploymentId devuelto por activation, moduleHash residente igual, configurationHash del candidato y completedAt real. Codec/hash existente sin campos nuevos.
+
+Durabilidad: journals no incorporan sync; el coordinador retiene sync capturado y readback exacto tras cada issue/ACK/finish. Requiere recorded. Las Promises de source/SQL/DO/provider/body/cancel/sync permanecen retenidas aunque gane timeout/abort. Estado durable incierto se conserva, sin borrado/compensación automática. stage-work sólo exclusión local, nunca physical drain o mutex distribuido.
+
+## 9. Filemap cerrado para convertir en plan
+
+Producto:
+1. worker/mcp-own/finite.mjs — wrapper dispatch SOURCE inicial, clases preservadas.
+2. worker/independent-closure/finite.mjs — dispatch fetch DO interno fijo.
+3. lib/mcp-qa-finite-owner-native-wire.mjs — gramática choice y respuesta acotada.
+4. lib/mcp-qa-finite-owner-native-bridge.mjs — forwarding choice con respuesta real validada.
+5. lib/mcp-qa-finite-owner-native-receiver.mjs — delegar choice al handler, conservar boundary/holders.
+6. lib/mcp-qa-finite-owner-preparation.mjs — permitir POST en seam interno existente; sin cambiar métodos ordinarios/decisiones.
+7. lib/mcp-qa-finite-owner-phase-context.mjs — handler connection, fuente léxica, estados factual parciales y finalización.
+8. lib/mcp-qa-finite-policy-transport.mjs — extraer engine/enrollment, old entrypoints conservan semántica.
+9. NUEVO lib/mcp-qa-finite-fixed-policy-engine.mjs — operaciones fijas internas.
+10. NUEVO lib/mcp-qa-finite-preparation-enrollment-writer.mjs — helper factual one-shot.
+
+Pruebas:
+11. NUEVO test/mcp-qa-finite-first-connection-publication-native.test.mjs.
+12. NUEVO test/mcp-qa-finite-first-connection-publication.test.mjs — grammar/wire/graph y contratos puros.
+13. NUEVO test/fixtures/finite-first-connection-publication.mjs — provider SYN registry/control e instrumentación negativa/passiva fija.
+14. test/fixtures/finite-initial-entry-world.mjs — modo dedicado que reutiliza upstream initial y monta bytes reales, sin seedPhaseFacts; conservar los modos previos.
+15. test/mcp-qa-finite-policy-transport.test.mjs — evidencia de extracción literal/fijos y old closed paths.
+16. test/mcp-qa-finite-owner-phase-context-native.test.mjs — parciales públicos cerrados y compatibilidad instalada.
+
+Helpers de test operan sobre f creado; fixture nuevo no importa world y no duplica setup. World importa helpers, nunca inversa. No callback aprobador, verifier fake, source factory ni escritura positiva directa de ConnectionSend/Ack/Receipt. Controles negativos entre invocaciones son sólo DATA; liberación de IO/streams en invocación original con deadline capturado.
+
+Protegidos: schemas/DDL/store/journals/records, OAuth SDK/ordinary handlers/authority, notice body/wire/forwards/receivers, source stubs, bootstrap/material/initial activation/cleanup semantics, perfiles/wrangler, build scripts y flags reales. Graph tests usan compilador existente sin cambiar su criterio ni declarar completePackage. Si la reconciliación Link exige otro path, root ajusta BASE/mapa antes de plan; writer no amplía solo.
+
+## 10. Matriz negativa obligatoria y aceptación nativa
+
+Cada fila exige comprobar el límite causal alcanzado y el primer efecto prohibido ausente. No basta cualquier rechazo previo. Resealed DATA negativos atraviesan codec/hash válidos antes del correlador objetivo.
+
+| Grupo | Variantes mínimas | Criterio |
+| --- | --- | --- |
+| Dispatch M | otro origen/Worker/profile, método/query/hash, ruta no soportada, flags cerrados, binding/actor/version incorrectos | cero ordinary SQL; sin fallback |
+| Dispatch QA | target/método/header extra/duplicate/boundary alterado, otro actor/QA | cero choice/approval/effect |
+| Identidad | firma/issuer/audience/subj/expiry; owner/revisión drift; Access menor | cero TicketUse/SEND |
+| Choice grammar | >1024/UTF8/escape/extra/duplicado/decision, cookie-list inválida o repetida, handle/projectRef mismatch, Origin | cierre antes de aprobación; body/cancel retenidos |
+| Ticket/approval | action/preconnection/source/project/realm diferentes, ya consumido, snapshot cambiado | ninguna admisión reutilizable |
+| Fuente | build/tree/module mismatch, current QA/M pointer/config, placeholder metadata, holders/fetch/credenciales cambiados | cero SEND o siguiente efecto |
+| Config/secret | flag extra, policy no vacía, physical ID/namespace/limiter/Access cambiado, secret value, inherit baseline incorrecto, módulo distinto | no upload |
+| Backup | chunk/manifest/hash/rawconfig/retainedIds/versión histórica ausentes o alterados | no upload; sin fallback latest |
+| Enrollment | unknown transaction/sync/readback, duplicate methods, callback retry, alarm/anchor drift, effects ajenos | no upload; historia conservada |
+| Admisión | otra lease/root/ctx/env, consumed twice, finish/restart, approval DATA prefill | no provider effect |
+| Upload SEND | preexistente/unknown/no ACK de issue, writer-head ajeno, held commit | no HTTP upload |
+| Upload result | lost/late/malformed UUID/reconciliation/HTTP/cache/oversize/body-cancel | no ACK reconstruido ni activation |
+| Upload readback | módulo/config distintos, pointer cambió antes de activation | no activation |
+| Activation SEND | unknown/existing/held, upload sin ACK, context/baseline discordantes | no HTTP activation |
+| Activation result | lost/late/malformed/foreign deployment/held body | no receipt; no buscar para “recuperar” ACK |
+| Activation readback | pointer/porcentaje/versión/config distintos, metadata secret content | no receipt |
+| Receipt | hash/links/times incorrectos, finish/sync/readback desconocidos, recheck final drift | sin 200; conservar efecto durable |
+| Tiempo | parent agotado antes de IO, child durante transaction/body, deadline histórico terminado, reloj hacia atrás | sin renovación/segunda escritura |
+| Pending | held fetch/read/cancel/DO después de abort, otro ingreso con lease SYN vigente | observer scope rechaza el segundo ingreso mientras retiene trabajo; exigir lease SYN nueva y vigente para aislar esa negativa, no lease ya abortada; no inferir drain |
+| Historial | replay después de éxito o pérdida de respuesta; filas ajenas/preparación posterior | sin duplicar ni reabrir; datos ajenos intactos |
+| Downstream | OAuth/notice en CLOSED y después de phase no soportada, native POST frente ordinary spy | sólo fixed QA cuando gates; ordinary SQL nunca |
+| Extracción/grafo | old transport/setup, bytes/wire unchanged, canary sin decoder QA/bootstrap | sin ciclo ni expansión de autoridad |
+
+GREEN principal sin instrumentación aprobadora:
+- Compilar el initial candidate con dispatcher desde origen y retener hashes/metafiles.
+- Producir initial CLOSED con el productor upstream SOURCE aceptado, bajo provider SYN fijo: sin seedFutureActivation ni receipt de activation prefabricado como sustituto. Declarar cuáles entradas históricas previas al upstream siguen siendo SYN; no atribuir a esta prueba un actualCloudSourceProof.
+- M/QA reales con scripts del build, provider SYN registry que registra requests reales y devuelve IDs nuevos; sin asignar f.phaseCurrent desde receipt prefabricada.
+- GET choice firmado real; formulario/cookie; POST de aprobación real.
+- Assert sequence nativa de todos efectos, resultado installed y readback de ConnectionReceipt exacto; ambos snapshots completos y script bytes iguales.
+- Desde ese predecessor producido, recorrer /authorize QA SDK → token M → MCP/D0.4 al menos una vez y notice GET/POST existente por dispatch fijo; no seedPhaseFacts. Esto verifica composición, no nueva semántica SDK/notice ni stage notices. Reconciliar Link aceptado antes del test final.
+- Frente al mismo script initial CLOSED, OAuth/notice deniegan; sobre config connection exacta, preparación de consentimiento llega a QA sin ordinary writer aunque monitoring flag siga false.
+- Preservar source C0/C1/alarm/retainedIds/filas ajenas y todos flags no autorizados.
+
+Provider registry SYN se basa en los bodies ejecutados: upload almacena bytes/config e inherit references verificadas; activation cambia sólo pointer registrado; GET retorna esa metadata. No devuelve “success=true” para saltar guard ni modifica source proofs del producto. Para QA module evidence usar bytes reales de esa composición, no export default{} como sustituto. El montaje del harness no altera artifacts M positivos; instrumentación pasiva/negativa se etiqueta con hashes separados.
+
+Cierre funcional único: receipt de connection nacido del POST original y downstream aceptado consumiéndolo sin predecessor seeded. No cerrar la unidad sólo con UI, approval DATA o tests codec.
+
+Regresiones proporcionales: suites native connection/preparation/phase tocadas; POST/GET/OAuth-D0.4 seleccionadas por mounts y fixture, y extracción policy transport/setup; nombres exactos y no cero matches verificados al crear plan sobre BASE. Reusar evidencia store/journals protegidos salvo fallo concreto. Graph/build finite es necesario por mounts/residencia, no standard build/all SDK/50 ms por rutina. No ejecutar nada desde este diseño.
+
+## 11. Costos, pruebas SOURCE y límites operativos
+
+Medir first-primary/SQL/DO get/list/transaction/sync, HTTP/body/cancel, pares/snapshots, fanout, bytes M/QA/gzip, graph y elapsed root/child en GREEN necesario. No heredar 98/112 ni cifras Link/POST. Pipeline SOURCE puede no caber en 30 s/5 s: se informa fallo causal y estado conservado, nunca se elimina recheck ni se amplía plazo para lograr éxito.
+
+Demostrable con proveedor SYN fijo: identidad JWT/CSRF, causalidad y orden de native Promises/SQL/DO, requestHash/wire, journal ACK de resultado observado, readback/config/module, igualdad de bytes, dispatch sin ordinary fallback, retención y límites de scope. No demuestra Cloudflare real, aceptación efectiva del API con custodia actual, residencia live/source proof, compatibilidad de rollback operativo, permisos, hosting o PC apagado.
+
+actualCloudSourceProof/promoción requieren autorización independiente con revisión exacta y evidencia actual de roles/pins/custodia/bytes/rollback. El ceiling de 3 nov permanece vencido; nada aquí lo rearma. El build global sigue completePackage=false y source authority pendiente. No alarma/cleanup nuevo, no cambio de owner/grant, no claims de suscripción/entrega por receipt.
+
+Rollback SOURCE sólo commits propios con CAS y protected blobs; nunca borrar journals, tickets, grants, version history o material original para ocultar incertidumbre. No restore provider automático dentro de este POST: preserva evidencia y devuelve estado pendiente sin retry.
+
+Root leerá este diseño y reconciliará Link aceptado antes de convertirlo en plan/brief/BASE. SDD futuro: un writer, root spec/quality y revisión autorizada; no ejecución ni agentes adicionales por este archivo.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-05-finite-native-notice-consent.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-05-finite-native-notice-consent.md b/docs/superpowers/specs/2026-11-05-finite-native-notice-consent.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-05-finite-native-notice-consent.md
@@ -0,0 +1,136 @@
+# POST humano de consentimiento nativo e inventario privado
+
+2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. Diseño para preflight, no autorización de implementación. Actualiza únicamente este diseño POST; los informes previos permanecen intactos. Inspección inicial dc4edafc0b5e4ba440cd32a21dd3dd58024e811a; reconciliación focalizada contra GET aceptado SOURCE f68797ca0ad083aa4e90be87c83b5f60f2aa691b/tree8f07c7e2bc98ab08f8a943f3c98bb9045b0af2b1. Código leído en cfe8f0ddde1d782757dd7e0d3160967f325df553; f687 añade cinco docs con producto idéntico según aceptación/readback root. Root acepta quality Approved with Minor/P3, sin Critical/Important; P3 cookie-list se difiere expresamente a POST, no está corregido. APIs GET reales coinciden con las propuestas. Sigue pendiente preflight root y futuro BASE de ejecución.
+
+## Resultado y alcance
+
+Una petición humana POST /monitoring/grant auténtica, recibida por M y QA fijos, verifica de nuevo identidad y CSRF, observa el ticket original y registra UNA decisión mediante el store nativo antes del ACK journal. Respuesta positiva únicamente después de dos snapshots completos iguales al frame esperado. La unidad incluye formulario GET activo sólo SOURCE. No monta rutas, no habilita avisos, suscripción, entrega, NoticeLink, nueva PhaseStage, source notices/finite, third CLOSED, ARM, hosting o PCoff. POST /monitoring/revoke y gestión posterior permanecen cerrados; el HTML no ofrece un control de retirada que este slice no implementa.
+
+Store y journal aceptados son dependencias protegidas. ACK DATA/hashes describen relaciones; no autentican persona ni prueban por sí solos ejecución SQL. El productor fixed QA conserva la Promise y el resultado SQL reales en su continuación privada; un GET previo no hereda autoridad humana al POST. No flags, reloj caller, identityDTO, allowPending, callback aprobador, raw pair exportado ni source factory.
+
+C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms; techo fuente2026-11-03T02:59Z vencido. Sin rearm/renew/retry. operationalReadiness=false; completePackage=false; PCoff=false.
+
+## Filemap cerrado reconciliado (no seguir WIP)
+
+1. lib/mcp-qa-finite-owner-phase-context.mjs: correlación privada de consent; baseline POST y handler fijo; activar HTML GET exclusivamente al aceptar toda esta unidad.
+2. lib/mcp-qa-finite-owner-notice-get-wire.mjs: conservar exports GET y añadir gramática/metadata POST fijas y validator privado cookie-list común GET+POST que resuelve P3.
+3. lib/mcp-qa-finite-owner-notice-get-forward.mjs: conservar export GET, añadir export Consent; compartir transporte dentro del archivo, selector privado constante de cada export.
+4. lib/mcp-qa-finite-owner-notice-get-qa.mjs: conservar receptor GET; añadir receptor Consent y compartir plumbing privado de lease/errores.
+5. NUEVO lib/mcp-qa-finite-owner-notice-consent-body.mjs: único lector de formulario de1024bytes con read/cancel reales retenidos. No cambiar native-wire global16384.
+6. NUEVO test/mcp-qa-finite-owner-notice-consent-native.test.mjs.
+7. test/fixtures/finite-owner-notice-get.mjs: extender gates/trace/inspect existentes para POST, sin segunda infraestructura ni fake resultado.
+8. test/fixtures/finite-owner-qa-sdk.mjs: routing SYN fijo de POST sólo dentro del opt-in noticeGet existente.
+9. test/mcp-qa-finite-owner-notice-get-native.test.mjs: actualizar formulario/POST ahora reconocido y cierre de replay; añadir pure grammar y nativo P3 cookies. Las negativas GET permanecen.
+10. test/fixtures/finite-owner-io-fanout.mjs: sólo categorías/markers de las llamadas nuevas si no las captura ya; no scheduler.
+
+No renombrar estos archivos en esta unidad: conserva imports GET y evita refactor masivo. El nombre get queda histórico, documentado con comentario breve. No nuevo mode de initial-entry ni DDL: reutilizar mode phase-context-sdk-token-notice-get. El world aceptado ya completa siete objetos monitoring en TODOS los modos phase-context y verifica conservación de cuatro DDL consent, tres eventos ajenos y dos grants (215–224, blobbfb918ebe15edc654de0e57d5aecf83757129b07). Conservar ese comportamiento; no reducirlo a noticeGet ni editar world. Ningún undécimo archivo implícito; diferencia nueva del BASE vuelve a root.
+
+Protegidos: store/journal/records/schema; authority y owner-http ordinarios; SDK/OAuth/native-wire/stage-work/lease; source stubs y entrypoints montados; package/config/workflows/mount/flags. Fixture no modifica bytes producto para lograr GREEN excepto cualificación SYN expresamente aprobada por root en su preflight futuro.
+
+## APIs fuente fijas
+
+Exports adicionales:
+- wire: finiteOwnerNoticeConsentTarget='https://afw-private.invalid/_finite-owner/monitoring/grant'.
+- wire: qualifyFiniteOwnerNoticeConsentRequest(request,bytes) -> frozen {method:'POST',url,handle}. handle es entrada no confiada, nunca autoridad.
+- wire: readFiniteOwnerNoticeConsentMetadata(headers) -> frozen {boundary,method:'POST',url,mVersionId,requestId}.
+- forward: forwardPrivateFiniteOwnerNoticeConsent({request,env,ctx},originalLease) -> Promise<Response>.
+- qa: createPrivateQaFiniteOwnerNoticeConsentReceiver({ctx,env}) -> frozen {fetch(request)->Promise<Response>}.
+- phase-context: handlePrivateQaFiniteOwnerNoticeConsent({request,env,ctx},originalLease) -> Promise<Response>.
+- body: readFiniteOwnerNoticeConsentBody(message,check,firstFailure) -> Promise<Uint8Array>. Últimos dos argumentos son guards/señal de fallo del ciclo ya poseído, patrón native-wire; jamás callbacks de aprobación. No acepta límite, identity, source o policy.
+
+No otros exports ni fábricas públicas. Shared transport private sólo elige literales GET/Consent desde estos exports; el caller no pasa kind/target/cap/permission. GET no acepta POST por fallback. QA Consent acepta únicamente transporte POST y target exacto; metadata exige original POST y URL finiteNativeOrigin+'/monitoring/grant' sin query/hash/userinfo. QA GET conserva su target/gramática.
+
+M comprueba root lease genuina, namespace/actor/version/holders como GET/OAuth. Copia sólo finiteNativePreservedHeaders, sobrescribe las cinco x-afw-finite metadata; boundary canónico y UUID/version fijos, límite metadata16384 heredado del contrato GET. Jamás conserva metadata del navegador. Fetch real redirect manual, signal original; respuesta elegible200 HTML UTF8/no-store, allowlist GET/OAuth existente; errores finiteNativePending con mayRetry:false y statuses seguros. No JWT/handle/source/rows en errores/logs. M y QA no son nuevos endpoints desplegados.
+
+## Grammar, cuerpo y retención
+
+Original Request real POST /monitoring/grant, Origin exactamente finiteNativeOrigin. Content-Type exactamente application/x-www-form-urlencoded, como formulario ordinario; no parámetros MIME. Body UTF8 fatal de1..1024bytes, rechazar escapes % malformados; URLSearchParams debe tener una única entrada handle, getAll(handle).length===1, valor /^[A-Za-z0-9_-]{43}$/. Nada decision/action/grant/sequence/expiry/project ni duplicados/extras. Cookie/assertion<=8192 y sin CRLF. NO copiar la grammar permisiva actual de GETwire11 ni modificar OAuth ordinario: aplicar el validator cookie-list privado compartido GET+POST definido abajo. Cookie __Host-afw-monitoring-owner única y valor43 válido; SHA256(cookieValor)===SHA256(handle)===reservation.ticket.handleHash. Prepare cookie se verifica separadamente.
+
+Cookie-list privado (sin export/config/opciones de autoridad): distinguir header ausente null de presente vacío. Ausente sigue permitido por grammar GET; QA exige prepare posteriormente. Presente vacío/OWS-only, segmento vacío inicial/intermedio/final o nombre repetido exacto (case-sensitive) deniega. Lista con OWS sólo exterior y separador exacto "; " de RFC6265§4.2.1; no trim genérico de nombres/valores ni filtrar segmentos. Cada par se divide en el PRIMER "=": el valor puede contener más "=". Nombre no vacío sólo ASCII HTTP token/tchar (ALPHA/DIGIT y ! # $ % & ' * + - . ^ _ backtick | ~), según [RFC9110§5.6.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.2). Valor vacío o secuencia de cookie-octet, opcionalmente entre DOS comillas dobles; dominio ASCII hex21,23–2B,2D–3A,3C–5B,5D–7E. Ni comillas interiores/solitarias, escape backslash, coma, semicolon, espacios/controles ni Unicode. Sin unquote/URLdecode/normalización al preservar headers. [RFC6265§4.1.1](https://www.rfc-editor.org/rfc/rfc6265.html#section-4.1.1), [§4.2.1](https://www.rfc-editor.org/rfc/rfc6265.html#section-4.2.1). Nombres desconocidos bien formados y valores legítimos como base64 con "=" o valor quoted se conservan. Las dos cookies propias siguen su formato emitido original sin comillas y hashes existentes: parser genérico válido no las autoriza.
+
+Lector específico se usa en M antes de fetch y en QA antes de baseline. Comprueba suma real de chunks, no Content-Length; abort/holder/overflow/UTF8 erróneo no llegan a store. Registro de Promise REAL del lector antes de race mediante retainFiniteOwnerStagePromise; finiteNativeOperation conserva la cadena real en waitUntil. Al fallar, firstFailure se señala pronto y se espera cancel real dentro de la misma cadena retenida. No void cancel, .text() ilimitado, tee/clone con rama sin consumir ni segunda lectura del body. Respuesta utiliza finiteNativeBytes existente16384. Cada operación captura failed=false; señal de fallo establece failed=true ANTES de rechazar; guards posteriores comprueban failed además de lease/holders. No continuar SQL/ACK tras fallo capturado aunque una Promise tardía resuelva.
+
+Contexto outstanding de stage-work bloquea un ingreso ajeno en mismo ctx hasta settlement real y abort de raíz. No atribuir exclusión al Set privado del journal ni usar lease ya abortada para demostrarla. Scope es local, no mutex distribuido ni physical drain.
+
+## Baseline privado y origen de confianza
+
+Dentro del patrón GET observeFiniteOwnerRequestWork + finiteNativeOperation, captura holders request/headers/ctx/env/DB/source bindings/version/fetch/SDK alias originales antes de await. Crear clock sólo desde readFiniteOwnerRequestDeadline, nunca desde ahora+budget. Reconstruir original Request desde metadata y bytes ya acotados.
+
+observeOwnerPhasePair sigue PRIVATE y devuelve dos snapshots completos iguales. Nuevo qualifyNoticeConsentBaseline(pair) PRIVATE usado sólo por handler POST:
+- original installed connection receipt válido, source proyectada read_consent exactamente como lines401–403 de GET aceptado, sin consultar qualifySettledOwnerPair público que exige notice vacío;
+- issuer original sin SEND desconocidos, SDK root/begin/approve/complete asentados/sin pending, GrantLink/relation/ConnectionRef actuales completos;
+- schema7 exacto en ambos snapshots, notice reservation original + ticket SEND + ACK applied, fila TicketRow14 completa exacta y hash coincidente; consent.send/ack=null, freeze=null y events=[];
+- Mversion===source.currentPublication.versionId; QA actor/version/publicación/pin originales/current del observer, owner/revision actuales, UUID de issuer reservation. No latestgrant ni COUNT global.
+No exporta pair/expected/continuación. expected=structuredClone(baseline.second) queda léxico. Puede obtener contexto privado {source,preconnectionId,capsuleHash} de esa proyección validada sin devolverlo a HTTP.
+
+Access de POST: verifyCloudflareAccessJwtWithExpiry con token del header original y source.access.teamDomain/audience del factual baseline; RS256/iss/aud/subject/exp del MISMO payload firmado (lib/cloudflare-access-identity.mjs:54–79,103–114), sin verifier/keySet/now inyectables. Realm=evidence('realm',{...source.access,origin:source.origin}); subjectHash=evidence('subject',{accessRealmHash:realm,subject:identity.subject}). Prepare cookie única __Host-afw-finite-prepare=[a-f0-9]{64}, SHA256(valor)===prep.ticket.ticketHash. qualifyFiniteOwnerApprovedTicket con currentTicket/ticket/use/pre/approval/sourceSnapshot originales, realm, subjectHash y Date.now real; identity.subject===ownerSelection.subject===issuer identity.subject===ConnectionRef.subject. La aprobación original de conexión se comprueba, pero la decisión de avisos es el POST actual de acción fija + CSRF actual.
+
+Reverificar el mismo JWT capturado tras observeTicket/recheck, antes de consent SEND; exigir mismo subject/expiry firmados, cookies/headers/holders intactos. Source current viene del recheck completo, nunca de opciones. Antes SQL repetir guard actual de expiración/holders y full recheck ya después SEND; no endpoint ni fetch nuevo de permiso. Ni JWKS cache ni expiración comprueban revocación externa instantánea de Access: el contrato real disponible es firma/exp y fuente actual, no una capacidad inventada.
+
+accessPOST=min(r.accessExpiresAt,pre.owner.accessExpiresAt,verified.expiresAt,C0). Si r.ticket.expiresAt>accessPOST negar ANTES SEND y sin observar/mutar bajo Common incompatible. No recortar ticket ni expiry histórico. Narrow padre por todos los techos originales: C0/pre/approval/ConnectionRef/consent/grant/Access/ticket.permissionExpiresAt. Ningún menor plazo crea permiso nuevo.
+
+## Common, journal y secuencia léxica
+
+r=reservation original validada. Common EXACTO {identity:r.identity,expectedGrant:r.expectedGrant,consumedAt:r.consumedAt,accessExpiresAt:accessPOST,preconnectionExpiresAt:r.preconnectionExpiresAt,window}. ticket=r.ticket intacto. Instancia store=createFinitePreparationIssuerStore({ctx,env}) y notice journal únicos del POST. La observación y INSERT comparten ESTA instancia/lease hija/Common/window idénticos; no necesariamente la instancia histórica GET.
+
+Una única child <=5000ms cubre observe→SEND→INSERT→ACK y rechecks; window.startedAt real al entrar, deadline=min(deadline hija original, todos los techos). No cerrar/recrear child entre observe e INSERT. Baseline/body/Access inicial consumen padre original<=30000ms, no presupuesto nuevo.
+
+Estados privados: baseline, ticket-observed, consent-send-recorded, consent-sql-pending, consent-sql-resolved, consent-ack-recorded; failed absorbente. Referencias separadas witness, ownSend, actualSqlPromise, actualSqlResult, sqlSettled; appendPromise nunca reemplaza SQL. No objeto estado transportable.
+
+1. Baseline y auth/CSRF válidos; recheck completo esperado.
+2. Entrar child; await store.observeMonitoringTicket({...Common,ticket:r.ticket},childLease). Guardar witness REAL status observed y comparar fila14 con expected.noticeRows.tickets[0]; null/error termina. Objeto clone/WeakMap de otra instancia no sirve; este witness acredita observación nativa, no humano.
+3. recheckConsentOwned() sin argumentos; segundo verify firmado y guards. Crear Send con purpose afw.finite-preparation-notice-send.v1, identityHash/reservationHash originales, operation='consent', accessExpiresAt=accessPOST, window, issuedAt=Date.now. decisionHash=initialHash('afw.finite-preparation-notice-decision.v1',{identityHash:r.identity.identityHash,ticketRequestId:r.ticket.requestId,handleHash:r.ticket.handleHash,method:'POST',path:'/monitoring/grant',action:'grant',issuedAt}). requestHash=initialHash('afw.finite-preparation-notice-request.v1',{operation:'consent',common:Common,ticket:r.ticket,decisionHash}). Sellar con codec existente.
+4. Retener appendSend({preconnectionId,record},childLease). Sólo status recorded/hash exacto continúa; existing/uncertain/error termina SIN INSERT. Actualizar únicamente expected.records.notice.operations.consent.send y expected.anchor.notice; guardar ownSend referencia creada aquí. recheck completo exige events=[].
+5. Guard actual inmediatamente antes de store.insertMonitoringConsent({...Common,ticketWitness:witness},MISMA childLease). Capturar su Promise REAL antes de race; sqlSettled=false. Nunca observar para adivinar resultado mientras pendiente. Native SQL revalida dueño/revisión/grant vivo/fence/consent consumed/window/Access/ticket/history0 en statement real.
+6. Tras resolver real, guardar resultado y sqlSettled=true; exigir applied y EventRow12 exacta según abajo. no_mutation/error no produce ACK ni éxito, no reintento. Actualizar sólo expected.noticeRows.events=[fila detached real]; recheck completo.
+7. ACK purpose afw.finite-preparation-notice-ack.v1, sendHash=ownSend.recordHash, outcome='applied', rowHash=initialHash('afw.finite-preparation-notice-row.v1',actualSqlResult.row), sequence=actualSqlResult.row.sequence, observedAt=Date.now<Send.window.deadline. appendAck({preconnectionId,operation:'consent',record},MISMA child); exigir recorded/hash; actualizar únicamente expected notice.ack/anchor; recheck completo. SQL Promise/result conservados hasta este punto y antes de responder200.
+8. Cerrar child y guard original/identity/failure inmediatamente antes de HTML. Fallo final puede dejar evento+ACK durables sin respuesta positiva: no compensación, no retry ni reconstrucción desde storage.
+
+recheckConsentOwned exige guards, issuer/SDK asentados, freeze ausente; si actualSqlPromise&&!sqlSettled deniega. Sólo posición y referencia ownSend creada/recorded aquí admiten su SEND pendiente; estado resolved/ack exige actualSqlPromise REAL resuelta y actualSqlResult. wait(observeOwnerPhasePair(...parent original...)) bajo activeChild, guards antes/después; canonical(first)===canonical(second)===canonical(expected ENTERO). No enmascarar timestamps ni partes. Grant.exchanged_at actual permanece completo, proyección histórica sólo en ACK issuer original. Native store guard failure absorbente y failed del handler no se resetean.
+
+## EventRow y ampliación factual mínima
+
+El observer sigue sin parámetros de tolerancia. Reusar consultas GET, cap schema8/DO list7/ticket2/event3, success===true y results Array antes de interpretar vacío, first-primary nueva con factual SELECT como primera sentencia. Schema parcial/malformado/error deniega. Schema totalmente ausente admite únicamente reader viejo vacío; POST exige schema listo antes de SEND. Scope prefijo propio/preconnection y grant UUID original; filas ajenas nunca se enumeran ni invalidan flujo.
+
+EventRow exacta, sin campos extra:
+{sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at}.
+sequence entero seguro>0 del RETURNING AUTOINCREMENT global, NO expectedSequence+1; grant_id/project_id/user_id/client_id/resource/revision igual identity original; action='grant'; purpose='afw.dossier-monitoring.v1'; request_id=ticket.requestId; expires_at=ticket.permissionExpiresAt absoluto original; issued_at entero nativo n.ms>=max(consentSend.window.startedAt,ticket.issuedAt), >=Send.issuedAt y <min(Send.window.deadline,ticket.permissionExpiresAt). Todas las columnas SQL/tipos, bytes snapshot y hash completos. Event expiry no depende de response time ni se renueva. Ticket expected_sequence permanece0; grants ajenos pueden elevar sequence global sin invalidar original.
+
+Retener correlaciones reservation/ticket GET existentes. Reemplazar sólo el rechazo incondicional de eventos/consent en noticePrimary por:
+- Sin consent SEND: events=[] y consent ACK ausente.
+- Consent SEND válido, ticket ACK applied y fila14 exacta: events=[] o una EventRow exacta como arriba si ACK ausente. Hecho privado incompleto, ninguna entrada pública lo admite.
+- ACK applied: EXACTAMENTE un evento, rowHash completo y sequence iguales a ACK; ACK observado>=Send.issuedAt, <Send.deadline; Event.issued_at<=ACK.observedAt.
+- ACK no_mutation: events=[] y hashes/sequence null; hecho de cierre, jamás baseline/retry. Productor POST de este slice no emite esta variante.
+- >1 evento original, revoke, evento sin SEND, otra request_id, discrepancia de cualquier campo/hash, unknown key, overflow o freeze deniega. No tomar sólo última fila. Retirada real deja evidencia intacta y deniega.
+Consent sólo se correlaciona si ticket ACK original cumple todas relaciones previas. Lectura de historia no concede nueva ventana: tiempo actual debe seguir dentro de techos actuales; ACK no extiende SEND ni store window.
+
+qualifySettledOwnerPair público y OAuth conservan rechazo a TODO notice/ticket/event del UUID/prefijo original. GET conserva baseline vacío y rechazo a consent; su continuación sólo tolera sus propias tres filas ticket, nunca evento/consent. Nunca se infiere etapa nueva desde cinco/seis filas.
+
+## HTML y errores
+
+GET SOURCE pasa a form method=post action=/monitoring/grant, hidden handle escapado, botón habilitado “Permitir avisos temporales”, CSP form-action 'self'. Texto: “Podés registrar un permiso temporal para avisos sobre este expediente. No cambia datos ni publica. El permiso vence en la fecha indicada. Registrar el permiso no confirma una suscripción, entrega ni revisión del asistente.” Mostrar expiry original y enlace fijo al expediente. Sin autosubmit/JS ni checkbox preaprobador. Cookie GET conserva atributos Secure/HttpOnly/SameSite=Strict/Path=/ y expiry original; no emitir un ticket nuevo por POST.
+POST200: “Registré tu decisión temporal. Esto no confirma que exista una suscripción ni que el asistente haya revisado el expediente.” Fecha original y enlace fijo al expediente. No enlace de retirada/revisión no implementado, no datos internos. No-store/nosniff/Referrer-Policy/CSP/frame-ancestors/base-uri como GET; form-action none en éxito sin formulario. Puede eliminar cookie monitoring con mismos atributos/Max-Age=0 tras éxito; no borrar prepare cookie/historia.
+Errores conservan respuesta pending saneada, sin recibo positivo ni instrucción automática de retry.
+
+## Costo y aceptación
+
+La ampliación factual de consent NO agrega consultas por snapshot sobre GET: mismos DO list y schema/ticket/event SELECT completos, sólo valida filas ya leídas. POST agrega recorrido completo propio: baseline y rechecks de pasos1,3,4,6,7 (6 pares previstos, incluyendo baseline; contabilizar implementación real), dos verificaciones Access, observe y INSERT nativos con sus preflights reales, dos appends journal con transaction/sync/readback. Por par con schema+identity, notice añade2DO list+6D1 respecto al reader preGET; no atribuirlos dos veces ni declarar totales98/112. Observar cantidades/sesiones/latencias/peak/graph reales en GREEN sin ampliar fanout2, 5s ni30s ni omitir snapshots/owner/SDK. Si no cabe, deniega y root decide; no quitar rechecks para hacer pasar test.
+
+## Negativos que aíslan correlación de fuentes
+
+La review GET advierte que corrupciones asentadas anteriores pueden fallar primero por codec/hash/linkage del journal. No atribuirles aislamiento de cada predicado. Casos POST deben partir de GET nativo exitoso (y POST exitoso sólo para caso evento), alterar únicamente DATA de prueba negativa y volver a sellar TODOS los enlaces afectados con sealFinitePreparationNoticeRecord y, para identity.sourceRevision, sealFinitePreparationIssuerRecord('Identity',...). No cambiar source real ni fabricar prefills positivos.
+
+Variantes mínimas independientes:
+- identity.sourceRevision distinta40hex + identityHash recalculado; conservar actor/QA/preconnection; notice Reservation resealed, ticket Send identityHash/reservationHash/requestHash actualizados y ACK.sendHash resealed. Issuer/source auténticos intactos -> comparación de identidad notice/issuer falla.
+- issuerReservationHash, originalGrantAckHash, grantLinkHash o connectionHash distinto64hex, UNA celda por variante; reseal Reservation→Send.reservationHash→ACK.sendHash. Los hechos originales issuer/GrantLink/ConnectionRef no cambian -> correlación296 falla.
+- ticket.requestId UUID diferente en Reservation; reseal Reservation, Send.requestHash sobre ticket alterado y ACK.sendHash. Ticket SQL real y ACK.rowHash original permanecen intactos -> expectedNoticeTicket/fila14 falla en301, no journal.
+- tras POST realmente exitoso, ACK consent.sequence entero positivo distinto del real; reseal ACK, manteniendo rowHash real y demás relaciones -> correlación evento/ACK falla; cero NUEVOS consent SEND/INSERT. Puede agregarse rowHash incorrecto64hex resealed como variante separada, sin afirmar que invalida codec.
+
+Precondición de cada negativa: codecs/encode/decode válidos y read real del journal con lease vigente devuelve inventario válido sin error; no basta sello local. Trace SYN pasivo en fixture marca entrada al bloque correlador pertinente y ausencia de salida normal, sin devolver pair/valores sensibles ni cambiar retorno/guards. Verificar que antes de ese bloque no hubo fallo y que sólo cambió la relación objetivo; de otro modo reportar rechazo no aislado y corregir fixture, nunca proclamar predicado probado. Para evento, observer debe llegar a validación event antes del rechazo público/baseline por history; no usar sólo “POST rechazó” como prueba. Luego petición POST real debe fallar ANTES de nuevo consent SEND/SQL, comparando deltas nativos; fuente/issuer/ticket/eventos reales e historia ajena byteexact. Este acceso SYN de corrupción no existe en producto, no aprobación ni replay permisivo.
+
+Pruebas nativas y regresiones literales en plan. GREEN debe usar JWT SYN realmente firmado, JWKS de fixture por red existente, GET nativo real previo, D1/DO/workerd reales; no prefill positivo ni verifier fake. Mutaciones negativas se rotulan SYN. Medición del mismo run aceptado; no repetir50ms/allSDK/build estándar sólo para cifras. Comparar bundle QA/M y entradas/metafiles reales del harness; nuevo reachability fuera de estos graphs requiere root.
+
+## Riesgos y handoff
+
+Carrera entre última lectura source y SQL no es transacción global. Store protege predicados SQL actuales; un cambio externo justo después del último read puede dejar evento durable y respuesta denegada al recheck. Conservar historia, no prometer impedir todo cambio de publicación simultáneo. Unknown ACK/SEND/error/cancel no autoriza replay; actor restart no recrea witness/continuación. Revocar grant de verdad hace fallar resolver ordinario con “Monitoring authorization unavailable”, no enabled:false; CLOSE sólo no revoca grant. No editar authority para acomodar assertion.
+GET aceptado quedó reconciliado a f68797ca (mismo producto cfe8f0dd). Root debe confirmar cualquier delta del futuro BASE, filemap/qualifier y permiso cloud específico, leer spec+plan completos y activar. El próximo qualifier podrá usar dos jobs credential-free paralelos (POST nativo y GET/regresiones), cada uno<=15min; es configuración futura de preflight, no permiso de ejecutar ahora. Rollback docs sólo commits propios con CAS; rollback producto sólo commits futuros propios sin borrar D1/DO/history. SOURCE acceptance no activa permisos humanos, fases o runtime.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-05-finite-native-notice-link.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-05-finite-native-notice-link.md b/docs/superpowers/specs/2026-11-05-finite-native-notice-link.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-05-finite-native-notice-link.md
@@ -0,0 +1,101 @@
+# NoticeLink nativo desde la continuación privada de consentimiento
+
+2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. Scope de diseño aprobado por root: link-only, misma child/continuación POST después de ACK y recheck reales. No ejecución hasta reconciliar POST aceptado, preflight root y futuro BASE. Contratos protegidos inspeccionados en 2f96acb45ec5477d559f85070aa438d2e2e00822. Reconciliación focalizada con POST candidato 5205d80216d9767c44762df4a181e1015e093a8e / tree 23309d147f8818e0232be215f42a77cf7ffe0e6a, POST aceptado SOURCE por root en f62b6c8b17412b812ae411bbc9cedad43b9ce501 (tree 50fec019ac7a341fd9dacf004f7dd7f95581cd71): Spec ✅ / Quality Approved, 0 Critical y 0 Important. Producto idéntico a 5205/e153. Link INACTIVE hasta preflight y futuro BASE. No se siguió WIP. Formulario GET SOURCE activo y corrección cookie P3 implementados en ese candidato; aceptación SOURCE informada por root; ningún mount.
+
+## Resultado y límites
+
+El mismo POST humano que obtiene un EventRow nativo y su ACK durable añade el NoticeLink existente, comprueba durabilidad/lectura real y revalida el frame entero antes de200. El link queda como hecho privado enlazado al consentimiento original. No nueva ruta/export/phase, fuente notice_consent/finite_prearm, NoticeLink como permiso, publicación, flag, suscripción, entrega, ARM, cleanup ni hosting. No backfill: consentimiento anterior sin continuación viva no puede producir link desde ACK histórico.
+
+C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms; techo fuente2026-11-03T02:59Z vencido. Extender MISMA child POST, sin reiniciarla ni mover SQL a otra ventana. Si no cabe, se informa/deniega conservando historia, no se quitan rechecks. operationalReadiness=false; completePackage=false; PCoff=false.
+
+## Filemap cerrado (cuatro archivos)
+
+1. lib/mcp-qa-finite-owner-phase-context.mjs: productor léxico al final del handler handlePrivateQaFiniteOwnerNoticeConsent real del candidato; único suffix inventory notice adicional; read/correlación/snapshot privados.
+2. test/fixtures/finite-owner-notice-get.mjs: extender fixture SYN existente para observar putLink/sync/readback y gates reales; corrupción negativa/no autoridad.
+3. NUEVO test/mcp-qa-finite-owner-notice-link-native.test.mjs: recorrido y negativos específicos.
+4. test/mcp-qa-finite-owner-notice-consent-native.test.mjs: adaptar principal 'native consent POST records original decision after actual ticket GET' a Link final y reforzar sólo los dos asserts de settlement indicados abajo; conservar corpus restante.
+
+No cambiar preparación-store/records, notice-store/journal, owner-preparation antiguo, stage/profile/source stubs, forward/wire/QA, OAuth/SDK, world/DDL, workflows/config/flags. No nuevos helpers/exported callbacks o fichero de framework. Nuevo BASE que cambie APIs/fixture requiere ajuste explícito root antes de ejecución; el writer no amplía mapa.
+
+## Contratos existentes, sin rediseño
+
+NoticeLink DATA exacta y sin purpose ni recordHash:
+{preconnectionId,grantHash,eventHash,sequence,acceptedAt}.
+preconnectionId/grantHash/eventHash son hex64; sequence entero seguro positivo; acceptedAt tiempo entero. Record codec existente: encodeFinitePreparationRecord('NoticeLink',record), decodeFinitePreparationRecord('NoticeLink',raw), hashFinitePreparationRecord('NoticeLink',record). Su dominio es afw.finite-notice-link.v1; no agregar campos de phase/ACK/lease/actor/human.
+
+createFiniteOwnerPreparationStore({storage:ctx.storage,now:Date.now}):
+- putLink({kind:'notice',record},lease) -> {status:'recorded'|'existing'|'uncertain',recordHash}; puede lanzar.
+- readLink({kind:'notice',preconnectionId},lease) -> {status:'observed'|'absent',record}.
+Key exacta connection-preparation:<original preconnectionId>:notice. Append-once; old byte-exact->existing, distinto->rechazo. putLink comprueba Preconnection y GrantLink actuales en transacción y acceptedAt dentro de sus límites; no valida por sí mismo SQL/Access/decisión. Su transaction NO incorpora storage.sync: la continuación debe esperar sync y readback explícitos además del ACK de putLink.
+
+Reutilizar issuerCapture=captureFinitePreparationIssuerContext({ctx,env}) de línea 756 y su verificación holders de 764. Crear preparación fija como preparationStore=createFiniteOwnerPreparationStore({storage:issuerCapture.storage,now:Date.now}) junto a journal/store de 800, sin opciones externas. Sync real: Reflect.apply(issuerCapture.sync,issuerCapture.storage,[]) retenido y esperado por wait; holders/check antes y después. Reutilizar prepEncode/prepHash/evidence imports existentes. No llamar recordFinitePreparationNotice({requestId,sequence},lease): requiere notice_consent, relee request y no conserva resultado SQL; forwardPrivateQaFiniteOwnerNotice sigue unavailable.
+
+## Proyección de evento: hash correcto
+
+Sea row=actualSqlResult.row ORIGINAL del store, ya validada/correlacionada por POST en ambos snapshots y en ACK consent. Proyección EXACTA:
+event={grantId:row.grant_id,projectId:row.project_id,subject:row.user_id,clientId:row.client_id,resource:row.resource,revision:row.revision,action:row.action,purpose:row.purpose,requestId:row.request_id,sequence:row.sequence,issuedAt:row.issued_at,expiresAt:row.expires_at}.
+
+eventHash=hashFiniteOwnerEvidence('event',event), dominio afw.finite-monitor-consent-event.v1. NO usar digest afw.finite-preparation-notice-row.v1 del ACK: ese hash cubre EventRow SQL con nombres snake_case y es distinto. Ambos se comprueban contra la MISMA fila real, sin rellenar uno desde el otro.
+grantHash=issuerRows.grantLink.grantHash===SHA256(original issuer identity.grantId); sequence=row.sequence real, no1/expectedSequence+1. acceptedAt=Date.now muestreado UNA vez después de ACK/recheck, en continuación viva; no es columna SQL ni caller timestamp. Debe ser>=consentAck.observedAt, >=row.issued_at y >=GrantLink.acceptedAt, <=Date.now al observar y <todos los techos vigentes. No cambia expiración original; link no tiene expiry propio.
+
+## Observer privado y snapshots completos
+
+Puntos reales en candidato: phase-context blob f8948c0a2cc41a48773406a64fc9c863226f9b2d, facts inventory prefix/list 17/size<=16, noticePrimary273–315, qualify373–374, snapshots376–388, qualifyNoticeConsentEvent395–400, qualifyNoticeConsentBaseline401–414, requireEmptyNotice416–419. POST ya correlaciona ConsentRow. Esta unidad sólo:
+1. Añadir 'notice' a whitelist existente del prefix original. Mantener list 17, size<=16 y demás inventarios/caps. No aceptar otra aprobación/efecto/stage por presencia de link.
+2. En qualify, usando getRecord existente, leer data.noticeLink=await getRecord('readLink',{kind:'notice',preconnectionId:capsule.preconnectionId},false), también cuando se espera ausente. Una lectura DO real adicional por snapshot. Require equivalencia presencia y encode byte-exact con f.inventory.get(prefix+'notice'); no inferir ausencia de error.
+3. Añadir noticeLink a lista privada snapshot.preparation (null ausente). records.inventory y anchor.inventory ya contienen la fila raw. No alterar anchor.notice (journal seis filas) ni noticeRows (schema/tickets/events). No nuevo campo público.
+4. En qualify, DESPUÉS de noticePrimary y ANTES de devolver q/snapshot, ejecutar correlación Link incluso si noticePrimary retornó temprano por esquema/issuer ausentes. Si noticeLink presente exigir:
+   - issuer/SDK completos y vigentes, GrantLink/relation/ConnectionRef originales, schema 7, ticket ACK applied/fila 14 exacta, consent SEND y ACK applied/fila 12 exacta, freeze ausente;
+   - l.preconnectionId===original, l.grantHash===actual GrantLink.grantHash===SHA256(original grant UUID);
+   - l.sequence===event.sequence===consentAck.sequence y eventHash===evidence('event',proyección de EventRow actual);
+   - acceptedAt>=max(consentAck.observedAt,event.issued_at,GrantLink.acceptedAt), acceptedAt<consentSend.window.deadline y acceptedAt<min(accessSEND,pre/approval/ConnectionRef/consent/grant/ticket/permission/C0), acceptedAt<=Date.now;
+   - tiempo actual todavía bajo los techos vigentes como POST; conservando exchanged_at actual y ACK histórico issuer separado.
+   Link sin event/ACK, no_mutation, revocación, orphan, mismatched identity/hash/sequence/time o evento extraño original deniega. No global COUNT/latest grant, sólo UUID/prefijo propio. Filas/prefijos de otros proyectos intactos.
+5. Sin link: seguir validando notice/event como POST; un consentimiento nativo asentado sin link es historia incompleta observacional, jamás apta para replay/backfill.
+6. requireEmptyNotice añade comprobación explícita de preparation.noticeLink. Público3keys/OAuth/GET permanecen cerrados frente a history/link propio. Baseline privado POST exige noticeLink===null Y estado ticket ACK/event0 original; un POST nuevo no puede completar link de consentimiento previo. SourceBase y proyección read_consent NO cambian por Link.
+
+Ambos snapshots completos se comparan entre sí y contra expected; no omitir filas/columns/owner/SDK/source ni normalizar grant.exchanged_at. Preparación.record/link hashes validan DATA; las correlaciones y current checks son responsabilidad del observer, nunca source factory.
+
+## Continuación productora exacta
+
+Punto exacto en candidato: línea 849, inmediatamente después de await recheckConsentOwned() y antes de activeChild=null. clock.child abre en 826; l, window y common son los originales de 826–829. actualSqlPromise/actualSqlResult/sqlSettled se asignan en 842–843; const ack y appendAckPromise/appendAckResult son reales en 846–848. HTML sigue fuera de la child en 852–853. No otra petición, lease, ventana o endpoint.
+
+Precondiciones privadas simultáneas:
+- identity/CSRF/prepare/approval originales del POST fueron verificados por servidor; headers/holders siguen idénticos y tiempo actual permitido;
+- actualSqlPromise REAL resuelta, sqlSettled=true, actualSqlResult.status==='applied'; EventRow exacta igual expected.noticeRows.events[0];
+- ownSend creado aquí y recorded, ownAck creado de ese resultado con appendAck recorded, recheck completo ya hecho;
+- expected.preparation.noticeLink===null y key ausente en inventory; failed=false.
+No param/callback/WeakMap nuevo admite estas condiciones. El candidato no conserva ownAck en el scope de recheckConsentOwned. Añadir ownAck=null a la declaración 801 y asignar ownAck=ack únicamente después del guard recorded/hash de appendAckResult en 848. Es el const ack realmente producido, nunca clon tomado del journal/expected. appendAckPromise y appendAckResult permanecen léxicos en la misma child; no transportarlos mediante DTO.
+
+1. Guard del parent+child+failure/holders/Access actual y recheck ya realizado tras ACK. Sample acceptedAt una vez y construir ownedNoticeLink cinco campos de referencias locales originales. Validar codec y relaciones anteriores antes de llamada.
+2. position='notice-link-pending'; linkSettled=false. Retener linkPromise REAL=preparationStore.putLink({kind:'notice',record:ownedNoticeLink},l) antes de race, sin sobrescribir actualSqlPromise/result/settled ni appendAckPromise. Await bajo wait/activeChild; require recorded y recordHash===prepHash('NoticeLink',ownedNoticeLink). existing/uncertain/error termina sin200, sin retry/read-to-recover.
+3. Guard; await Promise REAL de storage.sync usando método capturado y retain; luego readLink real en MISMA child, require observed + prepEncode byte-exact del record y hash esperado. Mantener linkPromise/result/referencia propias. No usar transacción ACK como sustituto de sync.
+4. Sólo tras sync/readback normales: linkSettled=true; actualizar expected.preparation.noticeLink=clone(record), insertar [prefix+'notice',prepEncode('NoticeLink',record)] en expected.records.inventory conservando orden, expected.anchor.inventory=clone(expected.records.inventory); ninguna otra celda. position='notice-link-recorded'.
+5. recheckConsentOwned() completo extendido: el candidato sólo valida SQL resuelto en los estados consent-sql-resolved y consent-ack-recorded (816–818). Enumerar exhaustivamente estados admitidos al recheck: baseline, ticket-observed, consent-send-recorded, consent-sql-resolved, consent-ack-recorded y notice-link-recorded. consent-sql-pending, notice-link-pending y cualquier desconocido deniegan antes del par. Los tres estados resueltos deben exigir actualSqlPromise, sqlSettled, actualSqlResult applied, EventRow byte-exact y qualifyNoticeConsentEvent; los dos posteriores al ACK también ownAck, sendHash/rowHash/sequence exactos y canonical(ownAck)===canonical(expected.records.notice.operations.consent.ack). notice-link-recorded exige además put recorded+sync/readback satisfactorios, linkSettled y exacta ownedNoticeLink. No dejar estados Link caer en el else genérico de 813. Await ambos snapshots completos, comparar canonical(first)===canonical(second)===canonical(expected). Sin rawpair exportado ni tolerancia desde parámetros.
+6. Guard final dentro child, cerrar child normalmente, guard original/failure/Access antes de200. Mantener respuesta POST humana sobre decisión temporal: no link hash/IDs internos ni “suscripción lista”. No autoavanzar fase o publicar.
+
+No journal SEND extra para Link: es append local one-shot existente; consent SEND/ACK nativos y baseline cerrado ya impiden otra continuación. Unknown Link commit puede dejar Link durable sin200: se conserva como hecho, no se completa/reintenta desde lectura ni se borra. ACK consent permanece histórico aunque link falle. No freeze automático ni nueva operación en journal6rows.
+
+## Refuerzo acotado del test Consent existente
+
+Carry obligatorio de precisión de tests, informado por root tras revisión POST (sin fix-loop ni cambio de producto): en 'native consent original window fences queued SQL' (158–162), después de noticeReleaseHeld exigir settlement observado antes de noticeInspect/asserts finales; en 'native consent abort retains SQL and forbids late ACK' (240–245), polling acotado debe terminar con assert explícito de noticeProbe().allowed===true, no agotarse silenciosamente. En ambos casos falla si no se observa settlement dentro del límite SYN existente; no ampliar ventana productiva, retención o timeout para conseguirlo. La admisión del probe acredita sólo ese scope local, no physical drain. Warnings de toolchain/harness quedan para review final, sin upgrades.
+
+## Fallo, retención y carreras
+
+Retener Promise reales de putLink/transaction/sync/readback y full snapshots antes de races. firstFailure/failed absorbentes POST siguen activos; guard comprueba holders antes/después awaits. Abort/expiry puede retornar denegación pronto mientras transacción/sync real sigue pendiente; scope local stage-work queda outstanding hasta settlement según contrato existente. No Set journal como mutex, no physical drain/distributed cancellation.
+
+current SQL/event/source checks antes y después del append no son atomicidad global D1+DO/control plane. Si revocación/cambio vence justo después del último read, puede quedar Link histórico y respuesta503; no declarar que Link otorga permiso tras revocación. Lectura posterior deniega. Evento SQL/ACK no se borran para aparentar rollback. CLOSE sólo no revoca grant; real revokeGrant cambia rechazo ordinario a Monitoring authorization unavailable, no enabled:false.
+
+## Downstream explícitamente cerrado
+
+Records ya contienen phases closed_ui/read_consent/notice_consent/finite_prearm; no inventar otra ni reinterpretarlas. notice_consent exige stage='notices', receipt de publicación real y profile exacto: monitoring owner flag/policy fija grant/project/client/expiry; qualifyFiniteOwnerInstalledStage exige StageApproval/TicketUse/upload/activation/predecessor connection. Link por sí solo NO acredita esa segunda publicación.
+
+stage='finite' requiere además NoticeLink y dos predecessors en stage-facts; final readFiniteOwnerPreparationFacts requiere source.finite_prearm y tres receipts. El tercer CLOSED/prearm y su posterior conversión a full setup son unidades posteriores; no ejecutar publication/config aquí. El profile de conexión actual sólo acepta closed_ui/read_consent/notice_consent: no derivar finite_prearm por label ni añadir trueflags. Link-only no requiere tercer CLOSED; hacerlo consumidor de una nueva fase sí ampliaría alcance prohibido.
+
+## Costos, aceptación y handoff
+
+Sin D1 SELECT nuevo: ticket/event/issuer/current/SDK provienen de pares completos POST existentes. Sí +1 DO readLink por snapshot (+2 por par) siempre, incluido estado vacío. Con link añade bytes de raw inventory + registro privado en snapshots, manteniendo caps. Productor suma transacción putLink, sync, readback y UN par completo adicional tras link; recheck postACK ya existente no se sustituye ni duplica innecesariamente. El reporte del candidato mide 6 pares/12 snapshots: objetivo estructural Link 7 pares/14 snapshots, sujeto a comprobación nativa; no afirmar medición antes del GREEN.
+
+Medir en mismo GREEN queries/DOops/get/list/transaction/sync/HTTPfanout/bytes/metafiles/childelapsed/parentelapsed. Referencia atribuida al reporte candidato blob 91c08e8cfd6f0eb954631c3e75ea4af66e4b33b5: child 775 ms/window 4999 ms, parent 1275 ms; 102 first-primary sessions, 120 SQL (64 first/56 all), DO get902/list108/sync2/transaction26, HTTP84/peak2/active0. No son presupuesto adicional ni cifras del futuro Link. No heredar 98/112 ni repetir 50 ms/all SDK/build estándar para métricas. No aumentar fanout 2/caps/plazos. Si deadline original impide completar, reportar con estado durable real y root decide unidad futura; no renovar.
+
+Plan especifica RED causal y GREEN nativo. JWT SYN realmente firmado, Access/CSRF originales, GET+POST y D1/DO reales, sin prefill positivo ni verifier fake. P3 cookie-list y corpus resealed están implementados en el candidato POST con revisión aprobada según root: conservarlos, preservar aceptación SOURCE y no editar wire/body. La evidencia POST50/GET37 es cobertura escalonada, no una única ejecución full. Root debe fijar preflight Link, BASE y permiso cloud. Propuesta de qualifier futuro: tres jobs independientes sin credenciales, cada uno ≤15 min: Link full, POST full, GET full+regresiones+lint. Root fija cap/partición en preflight; estos docs no autorizan workflow/dispatch ni reducir checks. Rollback sólo commits propios por CAS; nunca borrar Links/eventos/historia real. No ejecución por estos docs.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-05-finite-native-notice-next-slice.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-05-finite-native-notice-next-slice.md b/docs/superpowers/specs/2026-11-05-finite-native-notice-next-slice.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-05-finite-native-notice-next-slice.md
@@ -0,0 +1,139 @@
+# GET finite de ticket e inventario factual privado
+
+2026-11-05 · **INACTIVE / SOURCE ONLY / SYN / UNMOUNTED**. No ejecutar por esta spec. Root debe comprobar inclusión del journal aceptado, hacer preflight de este diseño y fijar BASE/HEAD futuro. Aceptación journal comunicada por root:2969a840860d47997132eb081d1e65376f3953e0/treed89ca7b6bc056473362159bd51a2cb1f955c8f03; no reejecutada por este diseño. Inspección04c49dcc48b37f7fe825daa6c1c0747c5822d74e, tree7b13cf0a4262f7d5d5b8695c3bda3875d63e0bef; rama docs propia no contiene esos cambios producto.
+
+## Unidad y límites
+
+GET /monitoring real→forward M fijo→QA fijo→Access/preconnection/grant originales→journal tres filas y ticket D1 original; antes de respuesta positiva, dos snapshots completos deben igualar el frame léxico de la propia operación. GET prepara ticket, nunca consentimiento. POST /monitoring/grant y /monitoring/revoke, NoticeLink, source notices/finite, third CLOSED, flags, mounts y rollout permanecen fuera.
+
+C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms; techo fuente2026-11-03T02:59Z vencido. No rearm, renew, reloj inyectado, budgets nuevos, callbacks aprobadores, DTO de autoridad ni allowPending. D0.4 conserva exchanged_at actual y proyección sólo para ACK histórico. Sin cambios de store/journal/SDK/autoridad/DDL. operationalReadiness=false; completePackage=false; PCoff=false.
+
+## Mapa de archivos cerrado
+
+Producto:
+1. Modificar lib/mcp-qa-finite-owner-phase-context.mjs: ampliar snapshots privados, mantener salida3keys; añadir un handler GET fijo en el mismo módulo.
+2. Crear lib/mcp-qa-finite-owner-notice-get-wire.mjs: grammar/metadata fijas, sin I/O.
+3. Crear lib/mcp-qa-finite-owner-notice-get-forward.mjs: M→QA sólo este GET, con transporte real retenido.
+4. Crear lib/mcp-qa-finite-owner-notice-get-qa.mjs: receiver QA de Request real, UNMOUNTED.
+
+Pruebas/fixture:
+5. Crear test/mcp-qa-finite-owner-notice-get-native.test.mjs.
+6. Crear test/fixtures/finite-owner-notice-get.mjs: extensión SYN específica, gates/trace/inspect saneado, sin reemplazar resultados producto.
+7. Modificar test/fixtures/finite-initial-entry-world.mjs: opt-in mode 'phase-context-sdk-token-notice-get', extensión fixture y siete DDL sólo ahí; todos los otros modos intactos.
+8. Modificar test/fixtures/finite-owner-qa-sdk.mjs: opción fixture noticeGet=false; en true routing SYN de M/QA a módulos nuevos, conservando OAuth/token/MCP reales.
+9. Modificar test/fixtures/finite-owner-io-fanout.mjs: instrumentar únicamente closures originales por markers únicos; observar nuevas consultas all/fresh-primary y no confundirlas con preflight/escrituras. No cambios en producto por acomodar observador.
+10. Modificar test/mcp-qa-finite-owner-qa-sdk-native.test.mjs: ajustar únicamente assertions métricas por lecturas nuevas medidas, sin quitar casos/gates/plazos.
+Ningún otro archivo por inferencia; ampliar mapa vuelve a root.
+
+## APIs fuente exactas
+
+Wire:
+- finiteOwnerNoticeGetTarget='https://afw-private.invalid/_finite-owner/monitoring';
+- qualifyFiniteOwnerNoticeGetRequest(request,bytes)→frozen {method:'GET',url};
+- readFiniteOwnerNoticeGetMetadata(headers)→frozen {boundary,method:'GET',url,mVersionId,requestId}.
+Reusar finiteNativeOrigin/Actor/Headers/PreservedHeaders/Uuid/Pending/Bytes/Operation. No redefinir origen/actor ni aceptar destino por parámetro. Header metadata exactamente las cinco claves x-afw-finite existentes, JSON boundary canónico, max16384bytes. Original URL exacta finiteNativeOrigin+'/monitoring', sin query/hash/userinfo; método GET y body0. Origin ausente o igual al origen; si presente distinto niega. Cookies/assertion<=8192 y sin CR/LF; nombres cookie sin duplicados/malformaciones. No opciones de identidad/decisión/sequence/grant en URL/body/headers.
+
+Forward:
+forwardPrivateFiniteOwnerNoticeGet({request,env,ctx},originalLease)→Promise<Response>.
+Mismo patrón OAuth, root request context genuino; AFW_FINITE_TRIAL_CONTROL por idFromName(finiteNativeActor), actorhex64, fetch, AFW_FINITE_TRIAL_VERSION UUID y holders estables. Verificar grammar antes de enviar; sobrescribir todas las metadata, jamás preservar x-afw-finite del navegador. Request privado POST con original-method GET, body vacío, original signal/deadline y redirect manual. Retener fetch/body/cancel reales. Sólo respuesta200 HTML elegible; demás mapping a finiteNativePending con statuses seguros existentes. Allowlist de headers igual OAuth; no callbacks, token DTO o host configurable.
+
+Receiver:
+createPrivateQaFiniteOwnerNoticeGetReceiver({ctx,env})→frozen {fetch(request)→Promise<Response>}.
+Sólo Request, target exacto y método de transporte POST. read metadata, createFiniteOwnerForwardedRequestLease, invocar handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},parent.lease), finally finish. URL incorrecta404/método405, fallos saneados. Receptor jamás crea autoridad desde boundary, metadata o versión; handler verifica fuente real.
+
+Handler nuevo exportado en phase-context:
+handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},originalLease)→Promise<Response>.
+Sólo parámetros indicados; no par/frame/source/identity/policy/current/now/keySet/allowPending. Conserva observeOwnerPhasePair PRIVATE. No exportar helper lector nuevo ni objetos-capacidad. El nuevo export es una entrada fixed Request que aplica controles completos, no constructor de hechos.
+
+## Inventario y schema dentro de observeOwnerPhasePair
+
+facts() llama createFinitePreparationNoticeJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},childLease) bajo child/retain/holders. Usa interfaz6filas aceptada por root, no caller DTO. Añadir f.notice y el mismo objeto canónico a f.anchor.notice; en snapshot.records.notice=f.notice. No eliminar/enmascarar ninguna otra celda ni desdoblar snapshots. Sólo prefijo propio de preconnection y UUID grant original: filas/prefijos ajenos no se cuentan ni se cambian.
+
+Añadir selectAll(sql,args,cap) PRIVATE, sólo usado por tres sentencias fuente fijas abajo. Nueva first-primary por consulta; preparar/bind/all como PRIMERA sentencia, retener Promise completa, verificar holder/métodos después de await, Array.isArray(results), length<=cap y own detached de filas. No callbacks ni SQL recibido de APIs. No reutilizar sesión de preflight. Mantener select original byte/conducta; ninguna lectura paralela nueva fuera del fanout existente.
+
+noticePrimary(f,data,issuerFacts) PRIVATE dentro del observer retorna {schema,tickets,events}:
+- schemaQuery: SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8; cap8. Ocho filas o cualquier cardinalidad1..6 niega. Cero→schema=null, tickets/events=[]; sólo válido con journal vacío. No suponer tablas ausentes a partir de error.
+- Siete filas→schema={objects:rows}; fields exactos type/name/tbl_name/sql; comparar cada definición FINITE_PREPARATION_MONITORING_SCHEMA usando mismo parser de type/name/table y normalización de whitespace/semicolon/CREATE IF NOT EXISTS del store. Extra objeto, SQL diferente, constraint/trigger/índice faltante niega. Snapshot conserva SQL real (normalización sólo compara, no borra diferencias entre snapshots).
+- Si no issuer.reservation.identity: journal debe estar vacío; no consultar filas por un grant inventado; devolver tablas completas/tickets/events vacíos. Historia de otros grants no se enumera.
+- Si existe identity y schema completo: SELECT las14 columnas TicketRow explícitas FROM dossier_monitoring_owner_tickets WHERE grant_id=? ORDER BY handle_hash LIMIT 2; cap2. Parámetro SIEMPRE identity.grantId original. >=2 niega.
+- SELECT las12 columnas ConsentRow explícitas FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3; cap3. Cualquier fila niega este slice; nunca seguir sobre subconjunto. Consulta completa de campos para detectar una transición material, no contador prefabricado.
+No SELECT *; nombres exactos del spec store (TicketRow14/ConsentRow12). No nuevo esquema ni PRAGMA aquí: full SQL idéntico califica estructura; INSERT mantiene preflight completo store incluyendo PRAGMA. Ausencia total permite reader viejo; GET exige siete objetos ANTES de appendReservation/appendSend. Nunca consumir journal para que el INSERT descubra schema ausente. Carrera schema tras última lectura sigue posible: store niega y SEND puede quedar consumido; no atomicidad global/repair/retry.
+
+Llamar noticePrimary después de issuerPrimary y correlaciones SDK de qualify; devolver noticeFacts y añadir snapshot.noticeRows=noticeFacts. Así igualdad canónica first/second incluye journal, schema, ticket y eventos además de todos los hechos previos. Nueva fuente sourceBase jamás se deriva de notices.
+
+## Predicados de noticePrimary
+
+Journal vacío significa reservation/freeze y ambos pares send/ack null, forma exacta validada por journal. Si hay tickets sin reservation: negar. Si no hay reservation, todos tickets/events vacíos; no reconstruir raíz desde SQL. Cualquier freeze o consent.send/ack niega esta unidad aun válido para codec; no lo convertir en permiso ni limpiar.
+
+Reservation requiere issuer.reservation, grant ACK applied, grant real activo, AuthorizationLink, GrantLink, relation, ConnectionRef, preconnection y SDK root/begin/approve/complete observados completos. Comparar:
+- canonical(r.identity)===canonical(issuer.reservation.identity);
+- r.issuerReservationHash===issuer.reservation.recordHash, r.originalGrantAckHash===issuer.operations.grant.ack.recordHash;
+- r.grantLinkHash===prepHash('GrantLink',issuerFacts.grantLink), r.connectionHash===prepHash('ConnectionRef',issuerFacts.connection);
+- r.expectedGrant=== {scopes:JSON.parse(currentGrant.scopes_json),createdAt:currentGrant.created_at,expiresAt:currentGrant.expires_at}, exact canonical;
+- r.consumedAt===issuerFacts.consent.consumed_at;
+- r.preconnectionExpiresAt===data.preconnection.expiresAt; r.accessExpiresAt<=min(data.preconnection.owner.accessExpiresAt,identity.C0), r.accessExpiresAt>r.issuedAt. No comparar con un JWT recuperado de storage;
+- r.issuedAt y Send/Ack históricos <=Date.now(); ticket expiry<=min(r.accessExpiresAt,r.preconnectionExpiresAt,data.approval.expiresAt,ConnectionRef.expiresAt,C0,consent/grant expiry). En esta lectura en curso Date.now()<ticket.permissionExpiresAt; clock.narrow a ese mínimo original.
+Journal ya valida sus propios hashes/orden/ventana/fields. Correlacionar de nuevo hechos reales sin reimplementar su codec.
+
+Fila ticket esperada deriva de r.identity y r.ticket exactamente como expectedTicket del store: subject/grant/project/client/resource/revision de identity, purpose='afw.dossier-monitoring-owner.v1', action='grant', hash/requestId/sequence/times del ticket. Comparar las14 columnas y tipos; ni forma ni hash bastan.
+- Sin ticket.send: tickets debe estar vacío.
+- Con ticket.send y sin ACK: tickets puede estar vacío o ser esa fila exacta. Es un hecho privado, NO admisión.
+- ACK applied: una fila exacta, rowHash===initialHash('afw.finite-preparation-notice-row.v1',fila) y sequence===null.
+- ACK no_mutation: tickets vacío, rowHash/sequence null. Cierre, nunca replay.
+Resultado contradicho o fila de otra solicitud del mismo grant niega. No tolerar un evento de consentimiento aunque el ticket sea correcto.
+
+## Cierre de lectores actuales
+
+qualifySettledOwnerPair niega cualquier contenido notice o ticket/evento de cada snapshot. Schema completo vacío NO es contenido notice; esquema ausente tampoco. Por tanto readPrivateQaFiniteOwnerContext conserva exactamente {source,preconnectionId,capsuleHash} y la fase closed_ui/read_consent existente en vacío. Sin fields nuevos públicos ni rama notices.
+
+El recheckOwned de OAuth exige notice vacío en ambos snapshots y sigue sus checks originales issuer/SDK pending. Su expected ya incluye notice/noticeRows vacíos; no actualiza esas celdas. No permitir que OAuth acepte un SEND ticket sólo porque sea válido para observer. Otros consumidores no obtienen excepción.
+
+## Handler GET: confianza y tiempos
+
+En observeFiniteOwnerRequestWork + finiteNativeOperation reales, capturar holders del patrón OAuth (request/headers/ctx/env/DB/alias/source bindings/version/fetch) antes de await. Usar createFiniteInitialLease con readFiniteOwnerRequestDeadline original y narrowing, sin crear budget desde Date.now. Reconstruir original GET desde metadata y bytes0; cualificar grammar.
+
+baseline=observeOwnerPhasePair({ctx,env,parent:originalLease}); qualifySettledOwnerPair(baseline) exige vacío. Requerir phase read_consent, Mversion===source.currentPublication.versionId, schema completo y cadena original grant+SDK completada. Source/actor/QA/realm/project provienen de baseline real, nunca del request. Exigir eventos0/tickets0, no cookie __Host-afw-monitoring-owner previa: no refresh/reissue.
+
+Verificar verifyCloudflareAccessJwtWithExpiry usando Cf-Access-Jwt-Assertion original y source.access.{teamDomain,audience}; firma/issuer/aud/subject/expiry del mismo payload. Sin accessVerifier/keySet/now configurables. Cookie __Host-afw-finite-prepare única con gramática y hash original. qualifyFiniteOwnerApprovedTicket sobre ticket/use/pre/approval/sourceSnapshot originales, realm/subjectHash existentes. Subject===material.ownerSelection.subject===issuer identity.subject y realm original; GrantLink/ConnectionRef actuales ya correlacionados. GET expresa solicitud de formulario, no decisión de avisos.
+
+accessExpiresAt=min(identity verificada.expiresAt,pre.owner.accessExpiresAt,C0); preconnectionExpiresAt=pre.expiresAt. Narrow padre también por pre/approval/ConnectionRef/consent/grant/Access. at=Date.now real; handle=randomBytes(32).toString('base64url'), requestId=crypto.randomUUID(); ticket.issuedAt=at,expectedSequence=0; ticket.expiresAt=ticket.permissionExpiresAt=min(at+600000,todos los techos anteriores). Si mínimo<=at, negar. Duración del permiso propuesto puede superar5000ms; no usar child.deadline como ticket expiry. Sólo handleHash y UUID al journal, nunca JWT/cookie/handle bruto/email.
+
+Reservation exacta del contrato con hashes originales, Common y ticket; issuedAt=Date.now posterior a at. No nueva identity, grant, ACK histórico o conexión. expected=structuredClone(baseline.second), nunca se retorna/pasa como parámetro externo.
+
+## Máquina léxica propia y rechecks
+
+Variables privadas: position, operation, actualPromise, actualResult, settled, activeChild; actualPromise/actualResult/settled pertenecen exclusivamente al INSERT SQL, no se sobrescriben al esperar el journal. Cada append usa su propia Promise retenida local y su resultado; se conservan referencias locales ownedReservation/ownedSend a los records creados por este handler; no globals/WeakMap de autoridad ni objeto de opción. recheckNoticeGetOwned() cierre sin argumentos:
+1. check holders/lease/identity expiry.
+2. Si hay actualPromise pendiente (!settled), negar; nunca lanzar lectura para inferir su resultado.
+3. Issuer/SDK deben seguir completos/sin pending original. Notice consent/freeze ausentes.
+4. position determina la única excepción propia; comprobar que el SEND es el mismo objeto/recordHash producido en esta invocación y recién reconocido, no leído de journal ajeno. Si position exige resultado, exigir actualPromise real, settled y actualResult.
+5. await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id})); wait usa clock.wait con activeChild cuando existe y guards antes/después, como OAuth. Ambos snapshots deben ser canónicamente iguales a expected ENTERO. No comparar sólo partes/omitir timestamps/masking. No llamar qualifySettledOwnerPair después de la primera escritura propia: su cierre público sigue deliberado.
+
+Secuencia exacta:
+- baseline y recheckNoticeGetOwned con expected vacío.
+- En child propia: retener appendReservation real; exigir status recorded y hash exacto; después de settle actualizar únicamente expected.records.notice.reservation y expected.anchor.notice; position='reservation-recorded'; recheck completo. existing/uncertain/fallo termina503 sin SQL.
+- Child ticket única: window.startedAt=Date.now al entrar; deadline=min(child original, todos los techos), duración<=5000. SEND exacto con Common/window de esta child, decisionHash=null. Retener appendSend; sólo recorded del journal→actualizar expected notice.send/anchor; position='ticket-send-recorded'; recheck completo con expected.tickets=[].
+- Tras check emitir UNA insertMonitoringTicket({...Common,ticket},activeChild) en la MISMA instancia store, guardar su Promise REAL antes de cualquier race; position='ticket-sql-pending', settled=false. No hay recheck durante pendiente.
+- Al resolver: actualResult es ese resultado nativo; settled=true; exigir status applied y14 columnas exactas; cualquier no_mutation/error termina503 sin ACK ni formulario. Actualizar expected.noticeRows.tickets=[structuredClone(actualResult.row)]; position='ticket-sql-resolved'; recheck completo acepta exclusivamente este SEND propio con el resultado real en stack. El status no_mutation del store no se convierte en éxito del flujo.
+- Dentro de misma child: construir ACK applied exclusivamente desde actualResult.row real, sequence=null y rowHash exacto; observedAt real<Send.deadline. Retener appendAck con variable distinta sin reemplazar la referencia SQL; require recorded; actualizar únicamente expected notice.ack/anchor; position='ticket-ack-recorded'; recheck completo. Después cerrar child, comprobar lease/identity original inmediatamente antes de construir/retornar pagina200.
+No llamada del journal ni del store recibe expected/position/result como autoridad. La referencia a SEND propio no viaja por HTTP. Persistir ACK no permite limpiar actualPromise antes del recheck final. Ante excepción no reconstruir ACK, reintentar INSERT, freeze automático ni cleanup; historial puede quedar parcial.
+
+Reservation y ticket SEND sin ACK causados por pérdida entre pasos cierran futuras solicitudes. Un GET ajeno no puede “continuar” la reserva. Dos GET concurrentes: scope original/exclusión de instancia más journal append-once; sólo uno recorded puede emitir SQL. No inferir exclusión global del pending privado del journal; statement SQL/cerca original decide carrera nativa.
+
+## Página y contrato cerrado de POST
+
+200 HTML UTF8/no-store, Referrer-Policy same-origin, nosniff, CSP nonce con default-src none; frame-ancestors none; base-uri none; form-action 'none'. Título 'Preparación de avisos'; texto exacto 'Preparé un formulario temporal. Todavía no diste permiso para avisos. El envío de este formulario aún no está habilitado.' Formulario con hidden handle (escapeado), botón disabled 'Permitir avisos temporales'; no action activa ni JavaScript/envío automático. Enlace fijo a https://agentfriendlyweb.dev/expediente.
+Cookie __Host-afw-monitoring-owner=handle; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=floor((ticket.expiresAt-Date.now())/1000), exigir>=1. No devolver IDs grant/subject/row/journal/source ni detalles internos.
+POST humano a /monitoring, /monitoring/grant o /monitoring/revoke se niega antes de cualquier journal/SQL, sin fallback ordinario. La existencia de esta página SOURCE no autoriza mount aislado ni acredita funcionalidad completa.
+
+## Costo, retención y aceptación
+
+Añadir una list journal por snapshot, una schema SELECT por snapshot, y dos SELECT por identity/schema completos. Par vacío schema ausente: +2DO list/+2D1; par con schema+identity: +2DO list/+6D1. Cada snapshot sigue todos los controles previos; journal.read es un list limit7, no seis gets separados. No alterar fanout credentials/QA/M, peak2, allSettled, body/cancel ni orden entre snapshots.
+
+Medir totals por baseline/reservation/SEND/SQL/ACK, D1first/all por nueva sesión, queries preflight aparte, DO list/transactions/sync/get y HTTP GET reales. No transferir98D1/112GET a este flujo. Cada recheck completo conserva dos snapshots; ni count inflado/omitido ni presupuesto ampliado. Padre30s e hija5s son aceptación real, incluida cola; No reejecutar50ms fanout sólo para recabar números si scheduler no cambia; usar control0 existente y nuevo GET con tiempos reales. Un fallo de presupuesto obliga volver a root, no relajar garantía. Failure técnico no se “corrige” alargando ventanas.
+
+Capturar graph/metafile/hash/bytes de bundles QA/M con perfiles existentes; phase importa notice journal, por lo que graph sí cambia. Root decide en preflight qué compilador estándar adicional corresponde al reachability real. No build/runtime local ni permisos de CI inferidos. stage-work retiene operación/fetch/body/cancel reales; unknownACK/abort no acreditan drain ni permiten restore.
+
+GREEN requiere GET real por los nuevos módulos y D1/DO reales, Access SYN firmado verificado (no verifier mock), issuer original emitido por QA real, y actual token/MCP original antes del GET como regresión D0.4. Provider/installed history siguen SYN rotulados como en harness existente, no source factory positivo ni mock de snapshot. RED causal tras esos prerequisitos y antes de ticket/ACK ausentes; import/bundle/schema error no vale.
+
+Regresiones seleccionadas por diff: phase-context vacío/settled/unknown/schema/owner; QA SDK GET/POST real, binding-cookie, drift y control fanout0; D0.4 actual exchange→read y drift de exchanged_at/owner. Reusar aceptación fijada de store/journal intactos; nuevo GET ejerce sus APIs reales. Comandos/casos exactos en plan. No repetir50ms, allSDK, full suite o builds sólo para métricas. Retener rollback de código; nunca DELETE filas históricas o alterar schema real. Después siguen POST real con CSRF/decisión original, source/NoticeLink/stages, reducción/drain/cleanup y mount/hosting separados.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-05-finite-native-notice-provenance.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-05-finite-native-notice-provenance.md b/docs/superpowers/specs/2026-11-05-finite-native-notice-provenance.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-05-finite-native-notice-provenance.md
@@ -0,0 +1,99 @@
+# Finite native notice provenance: journal acotado
+
+2026-11-05 · **INACTIVE, SOURCE ONLY, SYN**. Requiere lectura/preflight de root, aceptación previa del notice store y HEAD futuro explícito. No ejecutar a partir de este documento.
+
+## Resultado y exclusiones
+
+Añadir codec y journal DO independientes de avisos, con seis claves append-once, para correlacionar los dos INSERT nativos propuestos sin reconstruir permisos desde historia. No implementación de receiver, productor de etapas, lector phase, NoticeLink, schema, mount, cleanup, SDK, M, autoridad, CI permanente ni runtime.
+
+BASE de inspección=7a2a1c1ffa66b21ae0aa8ad7d0a5ef0c4a2441be; árbol616d1e6187e652f07c067683a12b40c564da78d8; repo tokenizartinfo-ops/agent-friendly-web ID1347578006 PUBLIC. El informe hermano explica la fuente confiada futura y sus huecos. Los tres métodos del store son frontera propuesta: insertMonitoringTicket, observeMonitoringTicket, insertMonitoringConsent; no se rediseñan. Los tests de composición sólo se habilitan tras aceptación de ese componente en HEAD futuro.
+
+C0=I0+900000; C1=C0+180000; padre<=30000ms; hija<=5000ms. Techo fuente2026-11-03T02:59Z vencido. Sin reloj inyectable, compensación, rearm, renovación, nueva identity/grant ni autoridad por JSON. operationalReadiness=false, completePackage=false, PCoff=false.
+
+## Archivos únicos de la futura unidad
+
+Crear lib/mcp-qa-finite-preparation-notice-records.mjs (DATA), lib/mcp-qa-finite-preparation-notice-journal.mjs (DO), test/mcp-qa-finite-preparation-notice-provenance.test.mjs (codec), test/mcp-qa-finite-preparation-notice-provenance-native.test.mjs y test/fixtures/finite-preparation-notice-provenance-worker.mjs (composición SYN).
+
+No modificar módulos existentes ni sus tests/fixtures. La nueva fixture usa exports públicos del store aceptado y constantes SQL existentes; no duplica lógica del producto ni prefija el grant positivo. DDL sólo en fixture; ninguna migración.
+
+Patrón de referencia: issuer-records blob50f9a013580a46ad1d445a240f47b7b2ce887d49; issuer-journal blob414450aa08f797bed5a41cf5cc697342785ce16b; fixture issuer blob0588897cc3fe29618ffaea1946e76896ade479d1. Reusar initialOwn/Fields/Canonical/Hash y validateFinitePreparationIssuerIdentity, issuerTime/Uuid/Iso/Scopes; no alterar sus semánticas. captureFinitePreparationIssuerContext({ctx,env}) aporta holders/leaseGuard/wait/transaction/sync/readback; no autentica negocio.
+
+## Esquema exacto
+
+Exportar FINITE_PREPARATION_NOTICE_PREFIX='afw.finite-preparation-notice.v1:' y FINITE_PREPARATION_NOTICE_OPERATIONS=Object.freeze(['ticket','consent']). Claves: prefix+preconnectionId+':' seguido por reservation, ticket:send, ticket:ack, consent:send, consent:ack, freeze. list limit7; >6, suffix extra, registro no canónico, huérfano o binding incoherente: error genérico. Inventario nunca ignora claves desconocidas.
+
+Tipos hex64 minúsculo, UUID/ISO/time usan validadores issuer. Cada record tiene purpose exacto 'afw.finite-preparation-notice-'+kind.toLowerCase()+'.v1' y recordHash=initialHash(purpose,campos sin recordHash). own/fields rechazan accessors, símbolos, prototipos, extras, sparse arrays, límites existentes antes de canonical; máximo16384bytes UTF8 por registro. encode valida/canoniza; decode exige raw===canonical(validado). Objetos devueltos detached y deep-frozen. Errores no incluyen payload, SQL, subject ni hashes.
+
+Reservation campos exactos (además purpose/recordHash):
+- identity: identidad issuer ORIGINAL íntegra validada, incluido identityHash;
+- issuerReservationHash, originalGrantAckHash, grantLinkHash, connectionHash: hex64. Último es hashFinitePreparationRecord('ConnectionRef',fila real original). Los anteriores son recordHash de issuer Reservation, issuer grant Ack y hashFinitePreparationRecord('GrantLink',fila real). No referencias nuevas ni grantHash alternativo;
+- expectedGrant: exactamente {scopes,createdAt,expiresAt}; issuerScopes; ISO canónicos; scopes subconjunto ordenado de identity.requestedScopes; createdAt>=consumedAt, expiresAt>createdAt y <=min(C0,consentExpiresAt,preconnectionExpiresAt);
+- consumedAt: ISO original, >=identity.reservedAt y <=expectedGrant.createdAt;
+- accessExpiresAt, preconnectionExpiresAt: issuerTime; ambos >issuedAt; accessExpiresAt<=preconnectionExpiresAt no se exige (son techos independientes), ambos se clampan por el receptor y no renuevan autoridad original;
+- ticket: exactamente {handleHash,requestId,expectedSequence,issuedAt,expiresAt,permissionExpiresAt}; hex64/UUID; expectedSequence===0; tiempos issuerTime; issuedAt>=max(identity.reservedAt,parse(createdAt),parse(consumedAt)); issuedAt<permissionExpiresAt<=expiresAt; expiresAt-issuedAt<=600000; expiresAt<=min(C0,parse(consentExpiresAt),parse(expectedGrant.expiresAt),accessExpiresAt,preconnectionExpiresAt);
+- issuedAt: issuerTime, >=ticket.issuedAt y <ticket.permissionExpiresAt. La reserva se crea después de generar ticket DATA y antes de ticket SEND.
+
+Send campos exactos: identityHash, reservationHash, operation, requestHash, accessExpiresAt, window, issuedAt, decisionHash.
+- operation ticket|consent; hashes hex64; window exactamente {startedAt,deadline}, issuerTime, 0<deadline-startedAt<=5000, startedAt>=reservation.issuedAt; issuedAt>=startedAt y <deadline.
+- deadline<=min(identity.C0,parse(identity.consentExpiresAt),parse(expectedGrant.expiresAt),accessExpiresAt,preconnectionExpiresAt,ticket.expiresAt,ticket.permissionExpiresAt). Ticket SQL nunca depende sólo de esa validación: el store revalida su propia cerca/reloj.
+- accessExpiresAt<=reservation.accessExpiresAt, >=ticket.expiresAt; ticket SEND exige igualdad con reservation.accessExpiresAt. Consent puede estrechar al Access POST verificado, nunca ampliar.
+- decisionHash===null para ticket. Para consent, hex64 igual a initialHash('afw.finite-preparation-notice-decision.v1',{identityHash,ticketRequestId:reservation.ticket.requestId,handleHash:reservation.ticket.handleHash,method:'POST',path:'/monitoring/grant',action:'grant',issuedAt}). Es checksum de decisión, NO prueba de CSRF ni firma.
+- Common deriva de reservation con accessExpiresAt de Send y window de Send. requestHash=initialHash('afw.finite-preparation-notice-request.v1',{operation,common:Common,ticket:reservation.ticket,decisionHash}). No serializa testigo; representa campos esperados.
+
+Ack campos exactos: sendHash,outcome,rowHash,sequence,observedAt.
+- outcome applied|no_mutation; rowHash hex64 para applied y null para no_mutation; no_mutation exige sequence===null.
+- applied ticket exige sequence===null; applied consent exige entero seguro >0 realmente retornado, NO expectedSequence+1.
+- observedAt issuerTime, send.issuedAt<=observedAt<send.window.deadline. Sin ACK tardío reconstruido.
+- rowHash=initialHash('afw.finite-preparation-notice-row.v1',fila exacta retornada):14 columnas SQL de TicketRow o12 de ConsentRow del spec store. El codec sólo verifica formato, journal sólo correlaciona; fixture/futuro receptor contrastan hash de resultado real y fila primaria. Rowhash no autentica escritor.
+
+Freeze campos exactos: identityHash,reservationHash,frozenAt. frozenAt issuerTime, >=reservation.issuedAt y <identity.C1. Marca bloqueo irreversible de progresión; no reloj nuevo, cierre de SQL ni recibo de drain.
+
+No persistir JWT, email, cookies, handle bruto, código OAuth, token, proyección secreta, witness ni lease. subject en identity es DATA privado de QA, no publicable; fixture usa exclusivamente SYN.
+
+## API y semántica del journal
+
+Exports codec: sealFinitePreparationNoticeRecord(kind,input), encodeFinitePreparationNoticeRecord(kind,input), decodeFinitePreparationNoticeRecord(kind,raw); kind Reservation|Send|Ack|Freeze. Factories DATA públicas no emiten autoridad.
+
+createFinitePreparationNoticeJournal({ctx,env}) con campos exactos devuelve:
+- appendReservation(record,lease);
+- appendSend({preconnectionId,record},lease);
+- appendAck({preconnectionId,operation,record},lease);
+- freeze({preconnectionId,record},lease);
+- read({preconnectionId},lease).
+
+Mutadores devuelven frozen {status:'recorded'|'existing'|'uncertain',recordHash}. read devuelve frozen {reservation:null|Reservation,freeze:null|Freeze,operations:{ticket:{send:null|Send,ack:null|Ack},consent:{send:null|Send,ack:null|Ack}}}. No field de authority, ready, drain ni callable capability. Forma inválida o lectura corrupta lanza Error('Finite preparation notice unavailable'); fallos dentro de append tras preparación se convierten en uncertain, igual patrón issuer.
+
+Cada append: snapshot/encode antes de await; capturar holders+lease guard; transacción real con lectura exhaustiva, comparación de clave inmutable y put único; aguardar retorno final de transacción, storage.sync y get exacto/canonical decode. Retener todas las Promises reales mediante capture.wait/retain. Si algo falla no declarar no_mutation del store. Guardar mismo contexto/actor/version por referencia, identity.actorId===captured.actorId y identity.qaVersionId===captured.qa; sustitución o mutación de holders niega.
+
+Transiciones validadas en read y dentro de transacción:
+1. Sólo reservation puede iniciar. Sin ella ningún otro dato.
+2. ticket SEND requiere reserva, no freeze ni ticket SEND previo para nueva escritura.
+3. ticket ACK requiere ticket SEND correspondiente. outcome no_mutation bloquea consent.
+4. consent SEND requiere ticket ACK applied, no consent SEND previo ni freeze; issuedAt>=ticket ACK.observedAt; identidad/reserva coinciden. Cada Send requestHash/decisionHash se recalcula con reserva.
+5. consent ACK requiere consent SEND correspondiente. Todos los enlaces y tiempos se validan.
+6. freeze requiere reserva y sus hashes exactos; congela nuevos SEND y ACK. Permite existir junto a historia completa/incompleta; no fabrica resolución.
+7. Repetición byte-idéntica de clave existente devuelve existing aun congelado; nunca reemplaza. Divergencia devuelve uncertain sin put. ACK nuevo tras freeze no se escribe. Lectura de historia válida no niega sólo por freeze o por C0 vencido: lease actual sigue exigido y los tiempos históricos deben ser coherentes.
+
+Un SEND sin ACK bloquea el siguiente SEND. El productor fijo no lo borra al timeout ni lo completa leyendo D1. No_mutation terminal no permite segundo ticket ni decisión para la misma preconnection. El journal no intenta congelar automáticamente tras fallar: si no se pudo persistir Freeze, el SEND durable sigue siendo el bloqueo. Reservation sin ticket SEND puede quedar huérfana; un futuro GET no reconstruye handle ni continúa desde existing Reservation.
+
+Límite explícito: como issuer-journal, appendAck valida DATA/enlaces, no la ejecución de SQL. Por sí solo no distingue un ACK fabricado por un caller con acceso interno. La garantía de procedencia requiere el futuro handler fijo: sólo su continuación léxica con actualPromise realmente resuelta puede producir ACK; tras excepción/fin de lease no hay recuperación por fila. Ningún test journal-only afirmará autenticación del caller o rechazo criptográfico de un ACK inventado. Freeze sí bloquea un ACK nuevo de cualquier caller.
+
+No nuevos SELECT D1 en journal. No afirmar que el journal valida el grant ACK o la identidad humana: los hashes se contrastarán con el productor QA fijo descrito en informe. Otro caller puede crear DATA válida pero no obtiene permisos; ningún producto consume todavía esta API. El único futuro caller autorizado será el handler léxico del receptor QA que obtenga actor/source/owner/preconnection del par factual, verifique Access firmado y cookie/CSRF original antes de SEND. No opción allowPending, trustCaller, accessVerifier o approval:true.
+
+## Fuente de autoridad y progreso posterior
+
+GET futuro: source/actor/QA version del par factual; verifyCloudflareAccessJwtWithExpiry con realm/audience del source; cookie prepare original y qualifyFiniteOwnerApprovedTicket; identidad contra ownerSelection/issuer; GrantLink y ConnectionRef reales; Access mínimo original/actual. Antes de guardar SEND se hace recheckOwned. POST repite estos controles y exige cookie monitoring única igual al handle del formulario, Origin y acción fija explícita; verifica que ticket no supere Access POST actual. Dos peticiones reciben leases distintos del ingreso real, jamás extienden C0.
+
+Sólo el callback fuente fijo que recibe recorded nuevo en stack continúa a un INSERT real; existing/uncertain no. En POST el mismo store/child/Common observa ticket y consume la referencia witness una sola vez; journal no recrea WeakMap. Esto se implementará después, junto con inventario factual de notices y su tolerancia léxica estricta para la propia operación pendiente. No se modifica ahora phase-context: aceptación de seis filas no cambia read_consent ni habilita notices/third CLOSED. Persistencia y API local no son consentimiento, source acceptance no es permiso HTTP.
+
+## Validación nativa futura y límites
+
+Codec: positivos mínimos; round-trip; keys extra/getter count0; prototipo/símbolos/sparse/bounds; hash incorrecto; expiry/relaciones imposibles; sequence global válida>1.
+
+DO real Miniflare + SQLite storage; D1 nativo en fixture. Crear grant por openFence→insertAuthorization→consumeAuthorization→insertReadGrant reales de misma instancia/lease. Luego journal reservation→ticket SEND recorded→insertMonitoringTicket real→ticket ACK; nueva instancia de journal para POST, observeMonitoringTicket real con store/lease del POST→consent SEND recorded→insertMonitoringConsent real→consent ACK. Registrar rowhash/sequence realmente devueltos y comparar filas; no ticket/consent DTO mock ni SQL prefijado positivo.
+
+Dos callers concurrentes append same SEND: exactamente uno recorded y sólo él emite un INSERT; otro existing no escribe. Conflicting ticket/reservation niega. Unknown SEND ACK en final transaction/sync/readback, SQL result perdido después de commit y Promise retenida después de abort: historia parcial, fixture no emite segundo SQL ni produce ACK desde una lectura con instancia nueva; el journal niega siguiente SEND sin predecesor ACK. Gate antes de efecto para probar causalidad; fallo de bundle/DDL no es RED.
+
+Freeze previo bloquea nuevos SEND/ACK; no borra eventos ni revoca. CLOSE con grant activo mantiene autoridad enabled:true; tras revokeGrant la autoridad real rechaza genéricamente, conservando evento. Este último ya es regresión store aceptada, no tarea para cambiar authority.
+
+No “drained” en API: stage-work tiene retención dentro de contexto/isolate; no acredita inventario durable entre RPCs. Tras reinicio, las filas bloquean replay, no prueban terminación física. Futuros cleanup/inventario mantienen cierre hasta evidencia propia completa. Rollback SOURCE de esta unidad revierte únicamente sus cinco archivos/commit con CAS; jamás borra journals ni D1 real. Sin proveedor, credenciales, DDL remoto, browser, permisos, publicación, merge o main.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-05-finite-owner-exchange-continuity.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-05-finite-owner-exchange-continuity.md b/docs/superpowers/specs/2026-11-05-finite-owner-exchange-continuity.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-05-finite-owner-exchange-continuity.md
@@ -0,0 +1,77 @@
+# Finite owner exchange continuity · D0.4
+
+2026-11-05 · DESIGN ONLY · INACTIVE. Root seleccionó este candidato antes del notice store; no es aprobación del owner ni activación de implementación.
+
+## Alcance
+
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT=GitHub source/docs; ORIGIN=https://delegated-canary.agentfriendlyweb.dev (no contactado); RESOURCE_TYPE=docs branch; RESOURCE_ID=docs/finite-native-notices-design-20261105; ALLOWED_ACTION=lecturas fijadas y estos tres documentos por expected-head CAS; ROLLBACK=revertir sólo el commit documental.
+
+Producto inspeccionado51c5db8e987755ccf2819ba861461916e0396943/árbol32dac80a5e30cad10ee6e9331d76f51cae1ef630. Padre documental44d0490a3c7a33ad483499a70696689597ebf2c6. Root suministrará el BASE de producto futuro después de revisar/aceptar fanout. No seguir su rama durante este diseño. El notice-store diseño se conserva INACTIVE.
+
+Objetivo único: permitir que la lectura factual real continúe después del consumo de código D0.3 sin alterar el ACK histórico del grant ni ocultar el estado mutable actual a las dos observaciones.
+
+## Causa confirmada y API disponible
+
+insertReadGrant devuelve las diez columnas de grant, incluida exchanged_at, inicialmente ''; issuerCall calcula sobre esa fila el ACK original completo ([lib/mcp-qa-finite-preparation-issuer-store.mjs:26–27](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-preparation-issuer-store.mjs#L26-L27), [lib/mcp-qa-finite-preparation-issuer-store.mjs:116–121](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-preparation-issuer-store.mjs#L116-L121), [lib/mcp-qa-finite-owner-phase-context.mjs:434–447](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-owner-phase-context.mjs#L434-L447)). El callback M real llama consumeExchange y cambia sólo exchanged_at en el UUID original ([lib/delegated-oauth-worker.mjs:73–94](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/delegated-oauth-worker.mjs#L73-L94), [lib/delegated-oauth-store.mjs:34–36](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/delegated-oauth-store.mjs#L34-L36)).
+
+issuerPrimary vuelve a seleccionar la fila actual, valida formato/no futuro y luego rowAck('grant',grant) compara toda la fila con el hash original. El cambio genuino de columna causa rechazo aunque el permiso original siga válido ([lib/mcp-qa-finite-owner-phase-context.mjs:212–231](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-owner-phase-context.mjs#L212-L231)). Ya hay un test D0.3 que prueba código QA→token M→MCP original y la columna no vacía, pero no una lectura factual después ([test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs:53–62](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs#L53-L62)).
+
+No hace falta API nueva: sdkReadCurrent() en la fixture crea el root real y llama readPrivateQaFiniteOwnerContext; captura error como {status:'unavailable'} ([test/fixtures/finite-owner-qa-sdk.mjs:68–71](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/test/fixtures/finite-owner-qa-sdk.mjs#L68-L71)). El lector de producción sigue exactamente readPrivateQaFiniteOwnerContext({ctx,env,parent[,preconnectionId]}) y devuelve únicamente {source,preconnectionId,capsuleHash}. No agregar argumentos, flags, factories ni exports.
+
+## Cambio de producción exacto
+
+Sólo dentro de issuerPrimary, antes de rowAck del grant:
+
+1. Conservar la fila SQL actual sin mutarla. Para exchanged_at permitir literal '' o un ISO UTC canónico que satisfaga existing iso (Date.parse entero seguro, por ello finito), parsed<=Date.now(), parsed>=Date.parse(grant.created_at) y parsed<Date.parse(grant.expires_at).
+2. Conservar todos los demás guards actuales de grant/auth/owner/revisión/UUID/scopes/created/expiry/fence/journals/tiempo. Usar el iso existente; no nueva función pública/clock ni nueva tolerancia.
+3. Sólo en el argumento de rowAck('grant',...), pasar una copia con exchanged_at:'' si hay grant, preservando su ausencia si no hay fila. Todos los otros campos quedan idénticos. No cambiar rowAck, el dominio hash, el ACK almacenado ni su rowHash/recordHash.
+4. issuerPrimary retorna el **grant actual original**, con exchanged_at real. Los frames issuerRows, canonical(pair.first)===canonical(pair.second) y recheckOwned contra expected mantienen la columna. No propagar la copia histórica a snapshot/return/expected ni normalizar otros campos.
+
+La proyección reconstruye únicamente la fila histórica que este issuer emitió; no es un permiso nuevo. Es coherente con la proyección histórica de consumed_at ya existente en rowAck('authorization',...). No altera el tratamiento de no SEND/no ACK/no_mutation o grant ausente: no construir un objeto con exchanged_at para una fila inexistente.
+
+Las dos observaciones y el recheck owned deben seguir comparando filas actuales completas ([lib/mcp-qa-finite-owner-phase-context.mjs:241](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-owner-phase-context.mjs#L241), [lib/mcp-qa-finite-owner-phase-context.mjs:302–335](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-owner-phase-context.mjs#L302-L335), [lib/mcp-qa-finite-owner-phase-context.mjs:388–399](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-owner-phase-context.mjs#L388-L399)). Un cambio temporal válido entre ellas debe negar. Ninguna columna acredita éxito final de token, SDK completo, consentimiento, entrega o consistencia global. El callback puede consumir antes de un fallo posterior.
+
+## Mapa cerrado
+
+| Archivo futuro | Cambio |
+| --- | --- |
+| lib/mcp-qa-finite-owner-phase-context.mjs | Sólo validación independiente exchanged_at y copia histórica local para rowAck grant; sin refactor/split |
+| test/mcp-qa-finite-owner-qa-sdk-token-compat-native.test.mjs | Casos D04 usando issued/exchange/readSummary/sdkReadCurrent/snapshot existentes; extensión pequeña de la prueba de complete pendiente |
+| test/fixtures/finite-initial-entry-world.mjs | Único hook SYN imprescindible de drift, en el seam existente f.phaseDrift/segunda observación del pointer; no método nuevo QA |
+
+El hook usa mode interno fijo 'exchange', f.exchangeDrift={grantId,exchangedAt} y el contador existente phaseObservation. Sólo en la segunda observación hace UPDATE nativo del UUID original con sentencia fija y bind; el test aporta DATA SYN de fallo. No reemplaza SELECT/row/hash/reader ni retorna frames inventados. La API productiva y sdkReadCurrent() permanecen intactas. Se usa el seam real ya situado entre las dos lecturas ([test/fixtures/finite-initial-entry-world.mjs:154](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/test/fixtures/finite-initial-entry-world.mjs#L154)). No modificar ordinary M, store, SDK, schema, permiso, reloj, source stub, notice, mount o transporte.
+
+## Aceptación causal y límites
+
+**Positivo D04 principal:** usar el mismo world/issued/exchange/readSummary D0.3, sin source alias. Después de issued, antes de token, sdkReadCurrent debe leer read_consent y exactamente las tres claves originales. Capturar bytes del grant:ack del preconnection original desde snapshot; decodificar el ACK con el codec original y conservar rowHash/recordHash. El hash de la fila grant pre-token debe igualar el rowHash.
+
+Ejecutar token M200 y MCP original positivo. Volver a leer grant nativo: exchanged_at no vacío, resto exacto, mismo UUID. Probar internamente que el hash de la fila actual difiere del ACK y el de {...filaActual,exchanged_at:''} coincide. Luego sdkReadCurrent debe seguir devolviendo read_consent con fuente/identity original y tres claves. ACK bytes/rowHash/recordHash y todos los journals permanecen idénticos antes/después; históricos intactos y sólo un grant añadido por issuer original. Guardar sólo assertions/flags saneados, no token/código/JWT/KV/filas completas.
+
+**RED antes del fix:** lo anterior llega a token/MCP positivos y al ACK histórico intacto; el último assert de fase falla porque sdkReadCurrent devuelve unavailable. La comparación de hashes/única diferencia y el source path fijado atribuyen la causa; no exponer un reason nuevo en producción ni inyectar un fallo. Un fallo de seed/SDK/fixture/build no cuenta como RED.
+
+**Negativos posteriores a intercambio válido:** en mundo aislado por caso, modificar sólo la fila nativa original de manera explícitamente SYN, después de token/MCP positivos. Exchanged inválido: texto no fecha, ISO equivalente no canónico, futuro canónico con margen60000ms y menor que expiry (assert precondición), created_at-1ms, exactamente expiry, expiry+1ms. Debe devolver unavailable, sin nuevo grant/ACK/journal. No tocar el reloj ni grant expiry para fabricar el caso. Límite inferior inclusivo: exchanged_at===created_at canónico estable puede pasar; dejarlo rotulado como mutación SYN válida, no prueba de exchange.
+
+Immutable tamper posterior a token: id/user_id/client_id/project_id/resource/scopes_json/created_at/expires_at y revoked_at; además owner/revisión actuales de site_projects. Cada caso debe seguir negando; no ajustar ACK, GrantLink ni SDK grant para coincidir. Para created/expiry elegir delta1ms que mantenga el resto de límites válidos, y afirmar la precondición; para id cambiado negar el lookup original sin fallback. Son corrupciones SYN, no grants nuevos emitidos. Históricos nunca se alteran.
+
+**Drift entre observaciones:** ambas versiones de exchanged_at deben ser individualmente válidas y diferentes. Elegir created_at si difiere del exchange real; si empatan, elegir exchange+1ms y esperar sólo al tick real necesario, con assert <=ahora y <expiry. Configurar phaseObservation=0/phaseDrift='exchange'/exchangeDrift y llamar sdkReadCurrent real. El hook debe ejecutarse exactamente en observación2; la lectura debe negar con ACK idéntico y fila actual realmente cambiada. Esto prueba que la copia histórica no borró exchanged_at de los frames. No afirmar detección de cambios posteriores a la última observación o de dos snapshots que coinciden en el mismo valor válido.
+
+**Strict pending:** extender en el archivo D0.3 el test de complete real retenido: cuando ya hay grant nativo activo y sdk_complete:send sin observed, antes de reducción y release, sdkReadCurrent debe seguir unavailable. Tras late completion/cierre permanece cerrado. Conservar los casos existentes de approve pendiente/unknown y strict owned recheck; ninguna opción allowPending. Los fixtures de mundo externo, Access y proveedor continúan SYN; QA/SDK/token/MCP/reader/store/journals usados en los casos positivos son los módulos reales.
+
+## Preflight/conflictos
+
+| Cuestión | Resolución |
+| --- | --- |
+| ISO existente frente a finitud | iso exige Date.parse safe integer y formato UTC exacto. Añadir sólo lower/upper bounds; no parser exportado |
+| ACK histórico frente a fila mutable | Copia de un campo sólo en rowAck; retorno/frame conservan fila actual |
+| expiry del exchange frente a no futuro | Si grant está vivo y exchange<=ahora, exchange<expiry se deduce; casos at/after prueban rechazo combinado, no aislamiento de predicates |
+| Mutation válida estable | Puede pasar; no es prueba de token ni permiso nuevo. Garantía limitada a estas observaciones |
+| DTO sin grant/frame | No ampliarlo. snapshot y seam SYN existente bastan para ACK/drift |
+| Drift sin seam nuevo productivo | Un branch fixture 'exchange' con UPDATE original bajo observación2; no factory/alias/callback productivo |
+| Ventanas reales vencidas | Tests SYN usan clocks nativos de su harness existente; no se compensa Date ni renueva fuente real |
+
+No se detectó conflicto de interfaz con este enfoque estrecho. Mantener C0/C1, padre<=30000ms e hija<=5000ms y el techo vencido2026-11-03T02:59Z. operationalReadiness=false; completePackage=false; PCoff=false. Store de avisos y todo downstream continúan INACTIVE. Root debe revisar/activar con BASE futuro aceptado; este diseño no ejecuta ningún paso.
+
+
+## Root D0.4 SOURCE activation — 5 November2026
+
+Containingcommitacceptsfanout90bb28b5afterindependentreview+fix1ADDRESSEDandactivatesONLYD0.4exchangecontinuity. EarlierDESIGNONLY/INACTIVEheadersareinspectionhistory. ActualexecutionBASEisthiscontainingcommitprovidedindispatch. Briefdocs/superpowers/briefs/2026-11-05-finite-owner-exchange-continuity.mdandrootpreflightgovern. StandingSDDsinglewriter/freshreview;own temporarycloudqualifierallowedremovedfinal,no productionworkflow. Preserveacceptedfanoutandfixturecorrections. NoticeSTORE/journal/receiver/fullsetup/cleanup/mount/Entry remainINACTIVE. No realalias/runtime/permissions/clockrenewal. operationalReadiness=false;completePackage=false;PCoff=false.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-05-finite-owner-io-fanout.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-05-finite-owner-io-fanout.md b/docs/superpowers/specs/2026-11-05-finite-owner-io-fanout.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-05-finite-owner-io-fanout.md
@@ -0,0 +1,101 @@
+# Finite owner I/O fanout — diseño acotado
+
+5 de noviembre de 2026. **DESIGN ONLY / INACTIVE.** Root seleccionó preparar esta opción conservadora; no se atribuye al usuario una aprobación de diseño ni se activa implementación. Root debe revisar este documento, el plan y el preflight antes de cualquier despacho SOURCE. Un solo escritor de producto; no intervenir en D0.3.
+
+## Base, alcance y resultado
+
+Fuente inspeccionada: **d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72**, D0.2 aceptado independientemente según root. Archivos principales: [phase-context](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/lib/mcp-qa-finite-owner-phase-context.mjs), [initial-lease](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/lib/mcp-qa-finite-initial-lease.mjs), [stage-work](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/lib/mcp-qa-finite-stage-work.mjs). La base de ejecución futura debe fijarse de nuevo después de D0.3; este pin de diseño no autoriza sobrescribirlo.
+
+Una sola unidad rechazable: reducir la profundidad serial de lecturas Cloudflare dentro de cada primary(), manteniendo exactamente sus llamadas y validaciones. No D1 batching, caché, reutilización de descriptores/módulos, renovación de relojes, dependencias, endpoints, opciones públicas, cambios de bindings ni modificación del store Unit2a.
+
+Resultado observable esperado: bajo un workload SYN de respuestas provider demoradas50ms, probar causalmente si la misma cadena original de consumo/grant termina dentro del hijo5s mediante concurrencia fija2. No prometer el positivo antes de medirlo. El ensayo no acredita latencia real.
+
+## Contrato y restricciones exactas
+
+- observeOwnerPhasePair({ctx, env, parent, preconnectionId?}) sigue privado, con idéntica firma, frame de datos y validación.
+- readPrivateQaFiniteOwnerContext(options) y handlePrivateQaFiniteOwnerOAuth({request,env,ctx},originalLease) conservan sus firmas/resultados y fronteras estrictas.
+- Máximo **2 actual provider fetch/body/cancel lifecycles** simultáneos. Constante estructural; no pool configurable, parámetro del caller, semaphore público ni capacidad exportada.
+- Hijo original **≤5000ms**; raíz original **≤30000ms**. Mismo clock absoluto/monotónico, expiraciones, activeChild, source/owner/lease/store/consumption witness y holders nativos.
+- Techo fuente **2026-11-03T02:59:00Z** sigue expirado. Sustitución de ceiling exclusivamente en el fixture SYN existente, nunca en producto o como permiso live.
+- Mantener ambos snapshots completos, frescos y cronológicos; original orden facts A→primary A→qualify A→primary B→facts B→qualify B→comparación completa.
+- No solapar snapshots, SDK calls, journals, SQL mutations ni rechecks diferentes. El SELECT ownedProject puede coincidir con una lectura provider QA dentro del mismo primary.
+- Cada SELECT factual actual sigue siendo primero en una sesión nueva first-primary; D1/preflight/SQL y todas las claves/proyecciones quedan sin cambio.
+- Provider requests mantienen GET, origen fijo, tokens originales, no-store/no-cache, HTTP/status/header/Date/body/length/JSON/cancel checks y caps **8192/65536/4500000B**.
+- No cambiar gramáticas, recuentos, bytes de módulo, backup≤2097152B, inventory16/read17, effects32/read33, enrollment2/read3, issuer14/read16, SDK8/read9/16384B por record.
+- operationalReadiness=false; completePackage=false; PCoff=false. Sin grant real, instalación, credenciales, permisos, Entry o acceso real.
+
+## Schedule fijo y joins cerrados
+
+Cada primary() tiene dos fases. La segunda empieza sólo si las dos credenciales se verificaron completamente y el clock/holders siguen vigentes.
+
+1. Iniciar juntos verify reader y verify publisher. Cada función espera su request completo, decodifica el mismo envelope/fields, y comprueba id, active, expires_on y not_before exactos. Un join espera ambos resultados; cualquier rechazo niega el primary. La expiración original se vuelve a comprobar por current(clock.lease) después del join. No basta con que HTTP200 haya llegado.
+2. Iniciar juntos dos ramas fijas:
+   - **QA:** deployment pointer→comparación esperada→versión QA exacta include=modules→validación íntegra del único módulo, configuración y campos.
+   - **M:** deployment pointer→versión inicial activada M include=modules→validación íntegra→ownedProject SELECT original→versión M actual include=modules si el pointer difiere→validación íntegra.
+3. Esperar ambas ramas completas y comprobar current(clock.lease). Sólo entonces componer qaMetadata, comprobar aliases/bindings QA/M actuales e iniciales mediante las dos llamadas originales a qualifyFiniteOwnerSdkBindingFacts y producir PhysicalObservation. Si una rama falla, no devolver datos de la ganadora ni ejecutar qualify del snapshot.
+
+Se conserva el orden interno M y el lugar del SELECT ownership. La versión inicial M usa capsule.activatedVersionId, no el backup histórico plan.baselineVersionId. Mc/Mo coinciden con resident.bytes sólo porque los qualifiers lo comprueban; ambos cuerpos se descargan y comprueban otra vez.
+
+**Interfaces privadas propuestas dentro del mismo observeOwnerPhasePair/run:**
+
+| Función | Entrada | Resultado local |
+| --- | --- | --- |
+| verifyCredential(token, id, expiresAt) | valores originales capturados; string,string,number | Promise<void>; mismas comprobaciones de credentials |
+| credentials() | ninguna | Promise<void>; join fijo de exactamente dos verifyCredential |
+| readQaPrimary() | ninguna; cierre lexical original | Promise<QaPrimaryData> |
+| readMPrimary() | ninguna; cierre lexical original | Promise<MPrimaryData> |
+| primary() | ninguna | Promise<PhysicalObservation> idéntico al actual |
+
+QaPrimaryData={qaMetadata}; qaMetadata es la misma proyección por configKeys obtenida sólo después de validar q completo.
+MPrimaryData={project,pointer,currentConfiguration,configuration,initialBaseline}; configuration es M inicial plenamente cualificado; ningún campo añade authority flags, witness, Promise o capacidad. PhysicalObservation conserva exactamente {project,pointer,currentConfiguration,qaSdkBindingFacts,initialBaseline}. Estas estructuras intermedias nunca salen del módulo, no se almacenan, no se aceptan como entrada ni pueden rehidratar la invocación.
+
+Usar joins de dos promesas retenidas con Promise.allSettled, comprobar dos fulfilled y descartar ambos datos si cualquiera rechazó. No generic parallel runner con callbacks arbitrarios. Crear ambas promesas a partir de closures fijas bajo el scope vigente antes de esperar, capturando también fallos síncronos como rechazo; retener la promesa de cada rama y la del join. No añadir retry. allSettled no acredita drenaje físico cuando un child.wait rechazó antes de que su operación subyacente terminase.
+
+La rama ganadora puede completar lecturas mientras la otra falla; eso no autoriza efectos. No se empieza otra fase/snapshot tras un rechazo. El cierre final de la observación sigue abortando su clock; no se afirma que ese abort cancele físicamente el proveedor.
+
+## Prueba de compatibilidad de leases y retención
+
+[createFiniteInitialLease L3–19](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/lib/mcp-qa-finite-initial-lease.mjs#L3) no tiene mutex ni slot child único. Cada llamada child crea sus propios began/m0/until/controller/alive/timer; until=min(end,began+5000). Las ramas sólo comparten end/holders y el conjunto pendingWork. Sus comprobaciones síncronas leen Date.now/performance.now sin backdating. Cerrar un hijo no cierra su hermano. Un padre abortado o vencido invalida ambos por check/propagación. **No hace falta modificar este archivo.**
+
+[phase L88–107](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/lib/mcp-qa-finite-owner-phase-context.mjs#L88) ya retiene el trabajo real de cada read child, fetch, stream.read y cancel. Una rama no pasa al siguiente request hasta terminar el anterior, incluido finally/cancel; si child.wait gana por timeout, la rama rechaza y nunca abre un request siguiente. Por ello dos ramas fijan el máximo2 incluso si una operación real permanece pendiente tras timeout. No reemplazar estas retenciones con la promesa raced del join.
+
+[stage-work L16–23, L67–89](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/d630a99d8bd30bbeaa5606a89dbd33ee58ce8b72/lib/mcp-qa-finite-stage-work.mjs#L16) usa un Set de promesas por scope AsyncLocalStorage. observeFiniteFactualReadWork toma prestado una vez el contexto ambient del mismo root, env, storage y db; las cadenas Promise creadas allí heredan ese scope. No se invoca de nuevo por rama, no se usa su fallback para emitir SDK y no se crean entradas paralelas de request. released sólo libera tras originalLease abortado y promises.size===0. **No hace falta modificar stage-work ni añadir admisión/scope selector.**
+
+El wait del handler sigue comprobando su activeChild original antes/después y compitiendo con ese mismo deadline; los read children no renuevan el hijo consume/grant. Cualquier resultado tardío sólo puede descargar retención. No ACK tardío, código, nueva mutación, reconstrucción de witness, reapertura ni drenaje global SDK/KV inferido.
+
+La prueba fuente hace plausible la concurrencia; las pruebas nativas exigidas abajo deben corroborarla. Si el runtime no conserva ese scope, se informa como bloqueo: no adaptar genéricamente leases ni inventar un nuevo linaje.
+
+## Profundidad temporal y volumen intacto
+
+Para read_consent instalado: serial=2 verify+2 QA+3 M=**7 slots provider por primary**. Fanout=1 slot verify+max(2 QA,3 M)=**4 slots provider**, con ownedProject en la rama M entre sus dos versiones. El modelo4 supone tiempos homogéneos; payloads y D1 pueden dominar. En closed_ui sin versión M adicional:6→3 slots, manteniendo6 llamadas.
+
+El mismo hijo consume/grant lleva16 primary (8 rechecks×2 snapshots): **112 GET invariables**, desglosados32 verify+32 deployments+48 versions, y profundidad nominal112→64. En [consumeSend.issuedAt,grantAck.observedAt]:84 GET; profundidad nominal84→48. La fecha grant ACK precede al append durable y último recheck: instrumentar todo el hijo, no sólo ese intervalo.
+
+No se reducen bytes, parse/hash/canonical work, observaciones DO ni consultas D1:80 SELECT factuales+16 preflight+2 mutaciones por hijo; total98 invocaciones D1. No reducir controles para mejorar el resultado.
+
+Workload50ms por GET simulado, después de preparación genuina: serial112×50=5600ms sólo de espera añadida, incompatible con5s; fanout64×50=3200ms más base/DO/D1/CPU/tail. Que este último quepa es **hipótesis**, no conclusión. Si no cabe, root decide la siguiente acción con tiempos reales SYN; no ajustar clocks ni buscar arbitrariamente un umbral verde.
+
+[Cloudflare limita seis conexiones esperando headers](https://developers.cloudflare.com/workers/platform/limits/#simultaneous-open-connections), con [semántica actualizada en abril2026](https://developers.cloudflare.com/changelog/post/2026-04-09-relaxed-connection-limiting/). Aquí el límite2 es más estricto y abarca el ciclo de cuerpo/cancel completo. Es independiente del límite del proveedor, compartido con la invocación; no implica capacidad reservada ni SLA.
+
+## Cualificación requerida
+
+Separar dos modos de evidencia:
+1. Positivo SDK real del fixture existente, sin wrappers de KV/SDK ni sustitución de resultados o frames. Conserva GET200, POST302, un grant/code, denegación de replay y uso original store/child.
+2. Diagnósticos I/O nativos con observadores sólo test y demora provider; no ejecutar los probes estrictos extra del modo sdk-observed dentro del ensayo112 porque añaden lecturas. El observador no puede llamar source/SDK/store para producir su evidencia.
+
+Delay mínimo50ms medido con reloj monotónico nativo, sin busy-spin ni fake timers, sólo para mocked GET del origen api.cloudflare.com, activado después de initial invoke material_recorded, restoreMethods, seedPhaseFacts, sdkReadCurrent y seed de cliente genuinos; para aislar consume/grant se activa después del GET/form válido y antes del POST. JWKS, ledger/GitHub, SQL/DO y SDK no reciben esa demora. Date se genera con reloj real al emitir headers; no monkeypatch Date.now/performance.now, no nowOffset durante el recorrido timed, no fake timers.
+
+Registrar sólo categorías de endpoint, método, índices ordinales/snapshot/branch, tiempos, bytes contados y estados, nunca token/headers/body/module/code/cookie ni datos owner. El conjunto permitido es verify-reader, verify-publisher, QA-deployment, QA-version, M-deployment, M-initial-version, M-current-version. Identidad de role se determina dentro del fixture con literales sintéticos ya conocidos, no imprimiendo Authorization. Contar ciclos reales desde fetch iniciado hasta consumo/cancelación realmente asentados; no cerrar el contador cuando termina el outboundService ni cuando headers llegan.
+
+Pruebas conductuales: concurrencia real2 y nunca>2; credentials terminadas antes de descriptor branches; QA/M se solapan pero las dependencias internas no; snapshots ordenados; multiset112 exacto en hijo exitoso y84 en intervalo; D1 y Unit2a intactos; rama retenida+hermana fallida, deriva de owner/pointer/module/config antes/después del join y entre snapshots; parent/native abort, late body/cancel y retención hasta asentamiento; no efectos/ACK por ganador parcial; queued SQL5100ms deniega bajo el mismo hijo. Antes/después de join significa ubicaciones causales observadas, no sleeps adivinados. Una deriva después del join del primer primary de la pareja debe ser observada por el siguiente checkpoint existente; no se promete detectar cambios posteriores al último punto observado ni atomicidad distribuida.
+
+Mantener pruebas de strict-reader y own-SEND, source variants closed/installed/no-schema/malformed/lone-source y modo/perfil SDK anterior sin modificaciones semánticas. Revisar observers existentes que asumían orden global serial; corregir su clasificación sólo con evidencia, sin rebajar assertions de producto.
+
+## Gate de ejecución futuro
+
+Plan asociado: [2026-11-05-finite-owner-io-fanout.md](../plans/2026-11-05-finite-owner-io-fanout.md). Preflight: [informe de diseño](../reports/2026-11-05-finite-owner-io-fanout-design.md). **INACTIVE** hasta decisión root y activación SOURCE concreta después de aceptar D0.3; no lanzar CI por este documento. La posterior medición live cerrada/no consumidora descrita en la auditoría de E/S sigue pendiente y requiere alcance autorizado separado. Nada aquí instala acceso ni acredita operación con PC apagado.
+
+
+## Root SOURCE activation — 5 November2026
+
+ContainingcommitacceptsD0.3c35716e6afterfreshSpecPass/QualityApproved; actualexecutionBASEisthiscontainingcommitprovidedindispatch. ActivatesONLYfanoutTask1withbriefdocs/superpowers/briefs/2026-11-05-finite-owner-io-fanout.md. OriginalINACTIVEdesignheadersaredatedhistory. Rootpreflightboundariesprevail: own temporaryscopedcloudqualifierallowed/removalfinal; no wholebranchtest/build/lint/newstandardcompilerifgraphstillunmountedunchanged. Noalias/runtime/Entry/credentials/sourceceilingrenewal. Oneproductwriter, fixed2lifecycles/allreads/original5s30s; operationalReadiness=false;completePackage=false;PCoff=false.

~~~~~~~~~~

## docs/superpowers/specs/2026-11-05-finite-preparation-notice-store.md

~~~~~~~~~~diff
diff --git a/docs/superpowers/specs/2026-11-05-finite-preparation-notice-store.md b/docs/superpowers/specs/2026-11-05-finite-preparation-notice-store.md
--- /dev/null
+++ b/docs/superpowers/specs/2026-11-05-finite-preparation-notice-store.md
@@ -0,0 +1,118 @@
+# Finite preparation notice store: componente nativo acotado
+
+2026-11-05 · DESIGN ONLY · Implementación INACTIVE hasta revisión de root y despacho con un HEAD aceptado futuro.
+
+## Alcance y baseline
+
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT=GitHub source/docs; ORIGIN=https://delegated-canary.agentfriendlyweb.dev (no contactado); RESOURCE_TYPE=docs branch; RESOURCE_ID=docs/finite-native-notices-design-20261105; ALLOWED_ACTION=lecturas fijadas y tres documentos nuevos por expected-head CAS; ROLLBACK=revertir únicamente el commit documental. Producto inspeccionado: 51c5db8e987755ccf2819ba861461916e0396943, árbol32dac80a5e30cad10ee6e9331d76f51cae1ef630. Padre documental673813d5f7da9467fe3a527ab810fec7d6f8cc63. No seguir al writer de fanout.
+
+Objetivo: añadir ticket y primer consentimiento de avisos cercados **en SQL nativo**, ligados al issuer y grant originales, con testigo de ticket de una sola utilización por instancia/lease. Es un componente interno, sin autoridad de identidad/consentimiento por recibir options. Permanece unmounted. No produce NoticeLink, fase factual, SDK report, journal, suscripción, envío ni capacidad pública.
+
+Preservar todos los métodos, SQL, esquemas, testigos, journals y blobs actuales del issuer. C0=I0+900000 y C1=C0+180000; padre original<=30000ms, operación hija<=5000ms; reloj nativo sin compensación. El techo fuente2026-11-03T02:59Z está vencido. operationalReadiness=false; completePackage=false; PCoff=false. Ninguna prueba de componente renueva ventanas reales.
+
+## Evidencia que determina la unidad
+
+El host ordinario hace INSERT VALUES del ticket y luego consentimiento; el forward finite se intenta **después** de ACK200. Sus guards JS no pueden cercar SQL en cola: [lib/dossier-monitoring-owner-http.mjs:58–75](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/dossier-monitoring-owner-http.mjs#L58-L75). El writer ordinario tiene owner/revisión/sequence y commitWindow nativo opcional, pero no cerca original; compara expiry de grant contra tiempos suministrados: [lib/dossier-monitoring-authority.mjs:43–54](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/dossier-monitoring-authority.mjs#L43-L54).
+
+La instancia existente ya captura holders QA/DB/lease y proporciona owner actual, reloj SQL, cerca y testigos por identidad: [lib/mcp-qa-finite-preparation-issuer-store.mjs:17–51](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-preparation-issuer-store.mjs#L17-L51), [lib/mcp-qa-finite-preparation-issuer-store.mjs:98–155](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/lib/mcp-qa-finite-preparation-issuer-store.mjs#L98-L155). Las tablas de avisos existentes aportan dominios, request uniqueness, AUTOINCREMENT global y triggers inmutables: [db/dossier-monitoring-owner-tickets.sql:1–19](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/db/dossier-monitoring-owner-tickets.sql#L1-L19), [db/dossier-monitoring-consent.sql:1–20](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/51c5db8e987755ccf2819ba861461916e0396943/db/dossier-monitoring-consent.sql#L1-L20).
+
+## Mapa de archivos cerrado
+
+| Acción futura | Archivo y responsabilidad |
+| --- | --- |
+| Modificar | lib/mcp-qa-finite-preparation-issuer-store.mjs: tres métodos nuevos, validación DATA local, testigos/attempts privados y preflight de avisos separado |
+| Modificar | test/fixtures/finite-preparation-issuer-worker.mjs: reutilizar issuer/SQL/lease/queue reales existentes; añadir sólo escenarios de avisos y fault gates |
+| Crear | test/mcp-qa-finite-preparation-notice-native.test.mjs: componente nativo causal y hostiles |
+
+No nueva tabla SQL, migración, schema helper separado, codec ni notice journal. Se añade en el **mismo** módulo issuer una única constante frozen FINITE_PREPARATION_MONITORING_SCHEMA con los siete DDL originales: cuatro de consent y tres de tickets, copiados de sus db/*.sql sin comentarios. Se exporta para la fixture y se contrasta en tests contra ambos archivos originales. Producción nunca ejecuta esos DDL.
+
+No cambiar host ordinario, phase-context, SDK/alias, source stubs, worker entrypoints, transporte, cleanup, config, permisos ni relojes. No ampliar el journal issuer ni sus seis operaciones.
+
+## DATA y firmas exactas
+
+Los tres métodos son miembros de createFinitePreparationIssuerStore({ctx,env}); no nueva factory ni constructor. Cada invocación exige arguments.length===2 y toma exactamente (input, originalLease). originalLease conserva el contrato existente {signal,assertCurrent} y se verifica por identidad, no por JSON.
+
+Common DATA tiene exactamente:
+- identity: validateFinitePreparationIssuerIdentity actual, sin cambios;
+- expectedGrant: exactamente {scopes,createdAt,expiresAt}, con grantData actual y relación createdAt>=consumedAt;
+- consumedAt: ISO UTC canónico del consumo original;
+- accessExpiresAt y preconnectionExpiresAt: enteros issuerTime, **techos DATA**, nunca prueba de Access/consentimiento;
+- window: exactamente {startedAt,deadline}, con reglas actuales de input/forward: startedAt>=identity.reservedAt, 0<deadline-startedAt<=5000 y deadline<=min(identity.C0,parse(identity.consentExpiresAt)).
+
+ticket DATA tiene exactamente {handleHash,requestId,expectedSequence,issuedAt,expiresAt,permissionExpiresAt}:
+- handleHash: hex minúsculo64; no handle bruto;
+- requestId: issuerUuid actual;
+- expectedSequence: entero **0**, porque sólo se soporta la primera decisión grant para ese UUID;
+- tiempos: issuerTime; issuedAt>=max(identity.reservedAt,parse(expectedGrant.createdAt),parse(consumedAt));
+- issuedAt<permissionExpiresAt<=expiresAt; expiresAt-issuedAt<=600000;
+- expiresAt<=min(identity.C0,parse(identity.consentExpiresAt),parse(expectedGrant.expiresAt),accessExpiresAt,preconnectionExpiresAt).
+
+Los techos deben ser posteriores a issuedAt y permanecer en su original C0; un caller futuro fijo debe acreditar Access original y actual/preconnection y negar un ticket incompatible con un techo actual más corto. No aceptar renovación de autoridad porque otro JWT expire más tarde. El componente sólo prueba las condiciones SQL bajo esos techos DATA.
+
+Firmas:
+1. insertMonitoringTicket({...Common,ticket},originalLease) -> Promise<{status:'applied',row:TicketRow}|{status:'no_mutation'}>.
+2. observeMonitoringTicket({...Common,ticket},originalLease) -> Promise<MonitoringTicketWitness|null>.
+3. insertMonitoringConsent({...Common,ticketWitness},originalLease) -> Promise<{status:'applied',row:ConsentRow}|{status:'no_mutation'}>.
+
+No otras claves/opciones/callbacks. Common se expande en cada objeto, no se introduce una propiedad common. El método3 NO recibe ticket DATA, requestId, sequence, action, expiresAt ni aprobación declarada adicionales: los toma del testigo nativo privado. MonitoringTicketWitness es el objeto frozen {status:'observed',row:TicketRow}; sólo esa referencia original está en un WeakMap privado. Su representación serializada es DATA sin capacidad.
+
+Snapshot antes del primer await con initialFields/initialOwn y descriptor extraction que excluya ticketWitness sin recorrerlo. DATA común+ticket<=16384 bytes canónicos; aplicar primero los límites existentes de initialOwn (profundidad24, nodos16384, cadena65536, array2048, total65536). Rechazar getters/símbolos/prototipos/claves extra/sparse arrays sin ejecutar accessors. No cambiar el helper input antiguo ni sus exclusiones; usar helper local nuevo para las tres firmas.
+
+## Filas, testigo y uso único
+
+TicketRow contiene exactamente los14 nombres SQL originales: handle_hash, request_id, user_id, grant_id, project_id, client_id, resource, purpose, action, revision, expected_sequence, issued_at, expires_at, permission_expires_at. Los seis últimos/identificadores se derivan de identity/ticket; purpose='afw.dossier-monitoring-owner.v1', action='grant'. No caller DTO contiene subject/grant/project/client/resource/purpose/action alternativos.
+
+ConsentRow contiene exactamente las12 columnas originales: sequence, grant_id, project_id, user_id, client_id, resource, revision, action, purpose, request_id, issued_at, expires_at. action='grant', purpose='afw.dossier-monitoring.v1'; request_id del ticket; issued_at=n.ms **nativo al ejecutar INSERT**; expires_at=permission_expires_at absoluto del ticket. sequence es el entero seguro positivo realmente devuelto, no un valor pronosticado.
+
+Resultados son snapshots detached/frozen de la fila realmente devuelta por RETURNING/SELECT; INSERT sin fila es no_mutation, no un ACK inventado. Observe hace SELECT condicional en **sesión nueva first-primary, como primera sentencia de esa sesión**, después de preflight en sesiones distintas. Coincidencia debe ser exacta con las14 columnas esperadas y las condiciones actuales. Sólo una fila así observada crea testigo; el resultado de INSERT no es testigo.
+
+El WeakMap liga objeto, fila detached, identityHash, expectedGrant completo, consumedAt, los dos techos, window y la **misma referencia lease**. Método3 exige igualdad exacta de ese Common y holder lineage y marca usado antes de cualquier preflight/await. No ampliar deadline respecto a la observación. Clon/JSON/reconstrucción/otra instancia/otra lease niegan antes del INSERT.
+
+Conservar attempts privados por identityHash para ticket INSERT y consentimiento INSERT; sólo un intento de cada uno por instancia. Un intento de consentimiento cierra cualquier posterior escritura de avisos para esa identidad en esa instancia. Cualquier fallo/ACK desconocido de una mutación bloquea ambas escrituras de avisos para esa identidad; no reconstruir éxito leyendo después. Observe fallido no crea testigo; observeMonitoringTicket también rechaza una identidad marcada failed y nunca reconstruye un testigo tras ACK desconocido en esa instancia. Los métodos originales close/reconcile/observeGrant/revokeGrant permanecen disponibles bajo sus reglas.
+
+El componente no ofrece idempotencia durable de múltiples tickets entre instancias ni resuelve replay tras ACK perdido entre RPCs: el journal/receptor fuente posterior debe hacerlo. Un nuevo store no puede consumir un testigo ajeno. No afirmar exclusión durable por un Set/WeakMap.
+
+## Condiciones SQL obligatorias
+
+Cada INSERT y el SELECT de observación debe componer **en esa sentencia**, con n.ms=CAST(unixepoch('subsec')*1000 AS INTEGER):
+- owner actual site_projects para identity.projectId/userId/revision;
+- cerca original de ocho columnas exactas, fenced_at/fence_request_id NULL;
+- autorización original por authorization_hash/owner/kind='authorize'/project/client/resource/scopes_json/consent expiry, consumed_at===consumedAt no vacío y canónico;
+- grant por identity.grantId, owner/project/client/resource, scopes_json===JSON.stringify(expectedGrant.scopes), created_at/expires_at exactos y canónicos, revoked_at=''; created_at>=consumedAt y <=n.ms;
+- exchanged_at vacío o ISO canónico con created_at<=exchanged_at<=n.ms y exchanged_at<grant expiry. No se recibe en expectedGrant ni se lo usa como prueba de emisión de token;
+- n.ms>=window.startedAt y ticket.issuedAt, n.ms<window.deadline, identity.C0, consent expiry, grant expiry, accessExpiresAt, preconnectionExpiresAt, ticket expiry y permission expiry;
+- para ese grant, MAX(sequence)===ticket.expectedSequence===0 y ausencia de cualquier evento previo. No sólo ausencia de revoke.
+
+Ticket INSERT deriva las14 columnas y usa INSERT SELECT RETURNING. No INSERT VALUES ordinario, callback beforeCommit, ON CONFLICT recovery ni fallback.
+
+Observe selecciona ticket por handle_hash/request_id exactos y contrasta las14 columnas completas junto a los predicates anteriores. Consent INSERT vuelve a unir esa fila exacta; no confía sólo en la observación anterior. Hace INSERT SELECT RETURNING de las12 columnas. Un owner/revisión/grant/cerca/ticket/sequence cambiado entre observe y commit debe negar en SQL, aunque el lease JS aún sea válido.
+
+El expiry de permiso permanece absoluto: **no** n.ms+ventana, nuevo C0 ni deadline hijo como expiry del permiso. El plazo de operación controla cuándo se puede escribir; el permiso puede durar más de5000ms pero nunca superar los techos originales. Las queries son point lookups por UUID/authorization hash/ticket hash e índice (grant_id,sequence); no listar otros grants/tickets ni buscar “latest grant”. sqlite_schema/PRAGMA sólo para los objetos declarados.
+
+Preflight de avisos llama al preflight issuer antiguo sin alterarlo, luego exige los siete objetos originales por nombre/tbl_name y SQL completo. Comparar normalización sólo de whitespace, semicolon terminal y el IF NOT EXISTS inicial que SQLite pueda omitir al guardar CREATE. Filtrar autoíndices internos con sql IS NULL; no excluir objetos extra con SQL para esas tablas. Verificar columnas/dominos por PRAGMA además de constraints/unique/índice/triggers por SQL exacto. No crear/reparar un objeto ausente. Métodos originales no requieren estas dos tablas nuevas para ellos.
+
+## Fallo, reducción y pruebas de aceptación
+
+Errores de forma/testigo/DB/reloj/lease se rechazan con error genérico saneado; no exponer SQL/binds/filas privadas. Excepción o respuesta retenida después de commit puede dejar una fila real y no dar éxito al caller. Retener la Promise nativa con el mecanismo existente; no afirmar que abort canceló SQL ni inventar no_mutation tras error.
+
+Barrera gana: CLOSE original serializado y primaria nueva; al liberar INSERT tardío de ticket/consentimiento no aparece nueva fila. Concesión gana: el evento real ya existe; CLOSE no lo borra ni retira un grant activo. Usar en la fixture los métodos originales closeFence→observeGrant→revokeGrant y createDossierMonitoringAuthorization real: tras CLOSE solo debe seguir enabled=true con grant activo; después de revokeGrant debe devolver enabled=false. El evento permanece. Es reducción del permiso de lectura que deshabilita esta autoridad, **no** retirada humana de avisos ni cleanup completo.
+
+Las pruebas sólo pueden llamar positivo al componente SYN: grant original creado mediante openFence→insertAuthorization→consumeAuthorization→insertReadGrant **reales**, misma instancia/lease y D1 nativo; sin prefijar el grant positivo. No alias/store mock ni DTO que sustituya un resultado del componente. Credenciales/identity/human son sintéticos explícitos. DDL ordinario sólo se instala en la fixture.
+
+Casos mínimos:
+- positivo con permiso >5000ms, ticket real→observación primaria nueva→consentimiento único; fila actual exacta, timestamp SQL y expiry absoluto; misma fila de grant, histórico ajeno preservado;
+- sequence global>1 con MAX por grant=0; primer grant se acepta sin exigir expected+1; segundo intento/fresh-store contra evento previo niega;
+- testigo clonado/reconstruido/otra instancia/otra lease, ticket alterado y cada Common diferente; DATA hostil/getter count0;
+- grant tuple/scopes/revoked/owner/revisión/consumed auth/cerca actuales alterados al gate antes de SQL, y sequence/evento competidor entre observe y INSERT: cero filas nuevas. Ticket DATA alterado niega al observar; UPDATE ordinario del ticket debe abortar por trigger. Para probar la comparación de fila en INSERT ante cambio posterior, un caso SYN explícito altera schema/ticket sólo después del preflight y antes de liberar SQL, y exige cero evento; no presentarlo como una mutación legítima posible bajo schema intacto;
+- schema ausente/tamper constraint/unique/índice/trigger/extra objeto, tipo o clock/ISO no soportados: negar antes de mutación;
+- SQL real retenido antes de ejecutar:5100ms con ventana<=5000 y casos cortos en que se elige por separado C0/consent/grant/Access/preconnection/ticket/permission como techo más temprano; reloj real, sin Date patch;
+- barrera gana frente a ambas escrituras y concesión gana con reducción por autoridad real;
+- error que pierde resultado SQL **después** del commit y hold de la Promise real después de commit/abort: fila real presente, rechazo/sin testigo utilizable, ningún segundo INSERT en esa instancia y ninguna reclamación de physical drain entre RPCs.
+
+Ceilings anidados impiden aislar temporalmente algunos predicates con inputs válidos: si C0 o Access es mínimo, ticket/permission también deben vencer no después. Cada caso debe registrar el techo elegido y el mínimo efectivo; no decir que probó independientemente un único predicado. Debe alcanzarse el gate antes de expiry (assert explícito); un timeout anterior al gate no califica. La prueba5100ms preserva un lease SYN padre<=30000ms y tiempos DATA largos; es la condición nativa de ventana la que debe evitar la fila, no un throw JS anterior a emitir SQL.
+
+## Pendientes y contrato de entrega
+
+El receptor fijo QA futuro es dueño del journal de seis filas, procedencia entre GET/POST, identidad/decisión humana y drain durable; permanece INACTIVE. También queda pendiente la proyección histórica del grant ACK frente a exchanged_at mutable descrita en el diagnóstico2.1. Este componente no cambia phase-context ni arregla ese conflicto, no exige reimplementar D0.3 y no acredita un flujo token→avisos.
+
+Después siguen lector notices/tercer CLOSED, tres receipts/Selection antes de T0 primario, connection/setup own-SEND y full setup Task2, retirada/cleanup completo, mount/ARM/hosted/PC-off. No activar por los tests de esta unidad. Root debe revisar diff/evidencia y activar en un HEAD exacto futuro. Diseño actual: operationalReadiness=false; completePackage=false; PCoff=false.

~~~~~~~~~~
