# Finite closed prearm and separate full-policy conversion

2026-11-04. SOURCE DESIGN ONLY. This document decides the bounded configuration conversion; it does not implement or qualify a native publication.

## Scope, evidence and decision

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT GitHub source/docs; ORIGIN delegated-canary.agentfriendlyweb.dev, not contacted; RESOURCE_TYPE docs branch; RESOURCE_ID docs/finite-closed-prearm-policy-conversion-20261104; ALLOWED_ACTION pinned-source reads and docs-only expected-head commit; ROLLBACK revert the documentation commit. Product inspected at e280a297f4c2ea3f38ea3fc4ac157439415708be, tree 0fb1d342bb8b210738765d6a4bcc14454b1714f8. A separate product writer owns compatibility; do not follow or write its advancing branch.

Read the completed [causal diagnosis at 13688c4](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/13688c4c4ae02e2d3126fe39f4f75762f95d3890/docs/superpowers/reports/2026-11-04-finite-prearm-setup-dependency.md). This specification converts that decision into interfaces, rather than reopening the investigation. The [two-phase specification](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/3a0db69aa866621bc7df69b67a0a5aaa15c0788f/docs/superpowers/specs/2026-11-04-finite-owner-phase-context.md) and [plan](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/3a0db69aa866621bc7df69b67a0a5aaa15c0788f/docs/superpowers/plans/2026-11-04-finite-owner-phase-context.md) are dependencies, not implemented interfaces. Their closed_ui/read_consent scope stays intact.

The third owner stage publishes the exact original M CLOSED preparation configuration, with a new ordered ConnectionReceipt. Only after that receipt, Selection/witness and the genuine original primary T0 may the actual PolicySetup derive construct and publish the distinct full canaryLive candidate. The latter has PolicyReceipt. Configuration equality to original M never permits skipping or replaying the third publication.

The smallest independently reviewable implementation unit is a pure closed-prearm qualifier and full-configuration builder. It can be accepted before the missing notice/SDK/source work. Its later integration into the existing lexical derive is separately gated by a real producer and causal native harness. Its tests prove DATA shape and imported composition, not an owner timeline or permission. The source producer and its own-SEND recheck require a separate unit.

## Fixed constraints

- QA compatibility date is 2026-09-07; flags are exactly [nodejs_compat,enable_request_signal]. M flags are exactly [nodejs_compat,global_fetch_strictly_public,enable_request_signal], in that order.
- Use the accepted finite APIs: finiteActivationConfigurationHash, createFiniteActivationObserver, validateFiniteReleaseOperatorBundle (confirm_named only), resolveFiniteNamedActivationPlan, validateFiniteNamedCancellationHistory, reserveFiniteReleaseSuccessor and runFiniteKnownCancellationReleaseWorkflow. Consume the independently accepted C3 role integration; do not implement compatibility again. In particular, do not turn derive's pre-upload publish validation into a forbidden finite publish operation.
- Legacy strict APIs, historical2607/c570 and QA_CLOUD_CLOSED_PINS stay immutable. Historical rollback uses its explicitly selected historical codec. No generic old-or-new fallback, caller hash strategy or normalization.
- No callback/authority DTO, new admission, SDK issuance, producer/mount, Entry, runtime, OAuth, OTP, Max, permissions, schema or clock extension.
- Preserve original I0/C0/C1, I0+300000 technical horizon, parent <=30000ms, child <=5000ms, commandBy-510000, T0+50000 setup deadline and all nominal/launch budgets and counters.
- source ceiling 2026-11-03T02:59:00Z is expired. operationalReadiness=false; completePackage=false; PCoff=false. Preserve the reserved single coordinated consuming PC-off occurrence.
- No tests/build/deploy/provider/browser/credential action is authorized by this documentation task. Later source execution requires root acceptance and its exact accepted baseline.

## Configuration domains

| Domain | Configuration and receipt |
| --- | --- |
| Original M | Qualified original plan.configuration; all enabled flags false, four nominal policy strings empty, monitoring policy empty; original project/client, Access, expiry, limiter and persistent holders retained. Capsule pointer remains original initialBaseline forever. |
| read_consent / notice_consent | Existing first-two-stage three-setting family only: AFW_DELEGATED_OAUTH_ENABLED, AFW_DOSSIER_MONITORING_OWNER_ENABLED, AFW_DOSSIER_MONITORING_OWNER_POLICY. No other binding/configuration/module change. |
| Third finite stage | Exact original M configuration and same module bytes; distinct upload/deployment and ConnectionReceipt linked to the notices predecessor, original decision, grant and notice. source.phase=finite_prearm is historical preparation evidence, not full-policy installation. |
| Later PolicySetup | Exact fixed full canaryLive template with six actual derive slots. Baseline is the exact third installed version/deployment/configuration/module; original initialBaseline and historical rollback remain separate. Full PolicyReceipt binds actual ACK IDs, publicStatic and private full hashes. |

The conversion removes EXACTLY five preparation-only bindings: ACCESS_TEAM_DOMAIN, ACCESS_AUD, AFW_OAUTH_PILOT_EXPIRES_AT, DELEGATED_RATE_LIMITER, AFW_DOSSIER_MONITORING_OWNER_POLICY. DELEGATED_RATE_LIMITER is a ratelimit reference: removing it is an explicit reference change, not preservation of every physical binding. Preserve every DO namespace, KV namespace, D1 ID, secret name/inheritance source, version-metadata binding, exports/container declaration and module byte. Do not create a namespace, secret, limiter or container/image.

The fixed full template changes only AFW_DOSSIER_EVENTS_ENABLED, AFW_DOSSIER_SUCCESSOR_ENABLED and AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED to true. OAuth/refresh/monitoring/save/schedule/retirement-read remain false. The four nominal policy slots plus project/client contain the six actual values from derive. Template typed privateSlot markers must never become provider metadata.

## Pure interfaces and exact construction

Create lib/mcp-qa-finite-prearm-profile.mjs:

```js
export function qualifyFinitePrearmConfiguration({
  metadata, originalConfiguration
}) // Readonly<normalized configuration>, or throw
```

Accept exactly these own enumerable DATA fields using existing finiteFields/finiteData; no accessors, symbols, prototypes, functions, env, bytes, clocks, leases or optional modes. Validate BOTH configurations with qualifyFiniteConnectionProfile({phase:'closed_ui',metadata:...}). Require deep canonical equality without sorting arrays or changing values. Return a deeply frozen detached configuration. This checks factual equality to the supplied original; the fixed QA source must independently qualify that original against capsule/plan/resident evidence. No caller object can attest its own provenance.

Do not add finite_prearm to qualifyFiniteConnectionProfile, do not call the full projection for this configuration, and do not give empty private policy strings a success branch in projectFinitePublicConfiguration.

Create lib/mcp-qa-finite-policy-configuration.mjs:

```js
export function buildFinitePolicySetupConfiguration({
  prearmConfiguration, policies
}) // Readonly<normalized full configuration>, or throw
```

This DATA builder does not receive or mint original source authority. Its prearm input must satisfy the closed_ui grammar. Original equality is the upstream fixed producer's obligation, checked by the separate qualifier. An input cannot become original just by being passed twice to that qualifier.

policies has EXACTLY six own string fields: AFW_DOSSIER_EVENTS_POLICY, AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY, AFW_DOSSIER_RETIREMENT_POLICY, AFW_DOSSIER_SUCCESSOR_POLICY, AFW_OAUTH_PILOT_CLIENT_ID, AFW_OAUTH_PILOT_PROJECT_ID. No generated placeholders or caller-selected slot names. Preserve each input string verbatim. Reject empty strings and DATA over existing finiteData bounds; retirement remains <=4096 bytes. Client/project must equal the original closed configuration's values. Four policy strings must parse as JSON objects, not opaque placeholder words, arrays or scalar JSON. Reuse parseDossierEventPolicyFields(raw,true) and parseOwnPermissionWithdrawalPolicy(raw) for their existing grammars; parseDossierRetirementFields plus parseDossierEventPolicyFields(JSON.stringify(retired.policy),false) for retirement; successor must have exactly {scope,original,candidate,publication} DATA. These are grammar checks, not proof of genuine T0, grant, program or retirement provenance. Existing derive and future fixed sources retain all semantic/identity checks; do not create another resolver/namespace authority in the helper.

Algorithm:

1. Snapshot/validate inputs and qualify the closed preparation grammar. Obtain finitePublicProfileTemplate('canaryLive'); never copy or weaken its grammar.
2. For each template binding, use its fixed value; for a privateSlot use exactly {name,type:'plain_text',text:policies[name]}. For every non-plain-text binding, first require exact equality with the original prearm holder and copy that qualified holder, including version_metadata. Fail rather than replacing a changed holder with the template's value.
3. Use the template's exact non-binding fields, after equality with those already qualified in prearm. The output contains only template names; prove the input-minus-output name set is exactly the five listed above, with no added name. No type conversion of retained bindings.
4. Call projectFinitePublicConfiguration({role:'canaryLive',metadata:configuration}); return frozen DATA. No receipts, hashes-as-approval, callback, lease or ready flags.

Placeholders such as SYNTHETIC_PREARM, SYNTHETIC-PRIVATE-* or SYNTHETIC_QUALIFIED_ORIGINAL_RETIREMENT are not inputs to positive conversion tests. Structurally valid explicitly synthetic policy DATA can exercise the pure builder; it cannot prove private source provenance. The full projection remains a structural redaction grammar and is not rewritten to be a policy parser.

## Existing derive integration and hash domains

For the separately gated integration task, modify only lib/mcp-qa-finite-policy-setup.mjs's lexical derive(facts,refs,binding,env): import the builder, replace clone-and-six-slot-patch with buildFinitePolicySetupConfiguration({prearmConfiguration:source.baseline.configuration,policies}), and require candidate module descriptor/hash/length and bytes to match the qualified baseline M module. Keep original artifact/program/context, real primary T0, selected owner/grant/notice, cancellation and retirement derivation before the call. No export of derive or injected builder.

The six strings remain produced in derive. T0 is material.primaryEvidence.T0 from the original issue-comment and seed lineage, never request Date.now(), fabricated future time or equality of timestamps. Events start at T0; successor candidate uses T0/N1; withdrawal C0/C1 and original notice sequence/revision/expiry retain their exact formulas. Retirement stays the qualified original retirement string, not a newly invented current policy.

Keep source.baseline == exact third ConnectionReceipt (version, deployment, module and finite activation hash), and preserve selected/witness ordering: third completion <= selection/witness <= T0 < commandBy. The builder neither reads nor repairs this history. SetupContext.baseline stores that exact closed third pin, rollback stores the original qualified historical rollback, expectedFull hashes the full candidate. No schema expansion is needed for configuration shape. Existing strict codecs/consumers must accept these domains through C3's explicit finite-versus-historical selection; never remove their hash checks.

Recompute full activation with finiteActivationConfigurationHash, restoration with restorationConfigurationHash, and existing canonical bindings hash in its unchanged domain. publicStatic remains finitePublicStaticExpectation('canaryLive'); do not assign it to prearm or use it instead of private full metadata. The full bindings hash MUST differ from prearm because of the five removals and flag/policy changes. Do not patch receipt hashes to conceal a mismatched configuration.

### Existing derive checks versus missing producer guarantees

At the pinned source, derive itself checks candidate script/module hash and length against material.seed.manifest, exact artifact revision/tree/sourceCheck, baseline/rollback byte hashes against their descriptors, original-context hash against selected preparation, original program/revision, baseline version/deployment/module/configuration hash against facts.receipt, exact scope/resource/namespace/original container correlation, successor/cancellation data and withdrawal policy grammar. It derives T0/N1/C0/C1 from material.primaryEvidence.T0 and notice fields from facts.notice. It checks retirement text is nonempty and <=4096 bytes; that alone is not retirement provenance. The proposed builder adds JSON grammar but cannot supply provenance either.

readFiniteOwnerSetupFacts itself requires the original primary material/seed lineage, native T0 equality and queue/seed ordering; selected preparation without an existing binding; exact Selection publication witness <=T0; T0<commandBy; third completion before selection; current original owner/grant/notice facts via readPreparationFacts; and a final selected/source recheck. Its source dependency is presently unavailable.

Future fixed sources must supply evidence those checks cannot manufacture: original capsule/plan configuration equality, actual resident/module provenance, genuine Workflow entry/primary command identity, current provider pointer/configuration, actual original issuer/grant/notice chain and correct writer ownership while setup changes the current pointer. Original-baseline-to-candidate byte identity is the explicit added derive assertion in the gated integration; baseline receipt hash equality alone does not prove the capsule-original module. The pure Task1 never reports any of these missing facts as established.

## Consumer boundary and dependencies that stay closed

| Consumer | Decision |
| --- | --- |
| Planned readPrivateQaFiniteOwnerContext and qualifyFiniteOwnerInstalledStage | Two-phase task remains unchanged and unavailable for notices/finite. A later extension must call the prearm qualifier with original anchors.plan.configuration and observed third metadata; require exact three ordered journals/receipts, real current grant/notice/issuer/audit, actual provider pointer/bytes and fresh original primary rechecks. A source.phase string alone never qualifies. |
| readPrivateQaFiniteConnectionSource({ctx,env,preconnectionId,stage},lease) | Existing stub is not implemented here. Its future exact return remains {ownerSource,baseline,rollback,candidate,bytes,assertCurrent}; third candidate is original M closed config/bytes, predecessor is notices. Original plan comes from fixed QA anchors, not an input DTO. |
| createFinitePolicyTransport({ctx,env}).run(refs,originalLease) | Pending-only fence and actual consumed-admission behavior remain. This unit does not enable finite publication or bypass initial-only enrollment/cleanup constraints. |
| readPrivateQaFinitePolicySource({ctx,env,intentId,sourceRevision},originalLease) | Existing stub is not implemented. Future producer must return existing {native,ownerSource,originalContext,baseline,rollback,bytes,assertCurrent}; ownerSource retains original three-stage prearm history while current setup pointer advances only through that same live writer. |
| readPrivateQaFinitePolicyEntry / actual SDK and notice issuer | Still unavailable/unqualified. Do not add a mount, write notices/grants, reconstruct authority from rows, or rename effectful work a pure helper. |
| Cleanup collectors/journals/initial owner | Must eventually correlate both ConnectionReceipt and PolicyReceipt, each exact module/configuration/binding/metadata hash and predecessor, with retained original backup. No restore while either upload/deployment may still complete; preserve legitimate later activity and historical rows. No cleanup broadening is part of the small DATA unit. |

**Separate own-SEND unit is required.** In pinned createFinitePolicySetupTransport, qualified(c) invokes source.assertCurrent before SEND, after journal.issue, after each ACK, after activation pointer change and around finish. A general reader that rejects every pending effect cannot service this closure. A generic allowPending, ownedWriter boolean or reconstructed stored-row writer would erase the fence. Design the later recheck inside the real consumed-admission/retained writer closure, with exact local operation position, SEND hash, unchanged original holders/lease and only its own ACK transition. Other readers stay unavailable while the writer is unresolved. No public API change to assertCurrent(c) or caller-selectable phase is granted here.

Required future transition proof: before upload, original third pointer; during own upload SEND, same predecessor and exact owned SEND with no activation; after upload ACK, exact uploaded candidate but same pointer; during activation SEND, only that writer may reconcile uncertainty without a second POST; after actual activation ACK/readback, exact acknowledged full pointer/configuration; after finish, exact PolicyReceipt. An absent/lost/foreign ACK never advances this state. Held response body/cancel/failure remains retained; failure recovery must not release the writer merely because the caller returned. This is a separate real producer/transport unit, not an implementation task hidden in this plan.

## Proof levels and closure

The small unit requires causal DATA RED/GREEN: old clone-and-patch cannot produce the full profile from exact closed prearm; the new builder does, without placeholders, namespace changes or changing full projection. It may be accepted while detached. The integration task additionally requires actual compileFiniteNativeStaging metafile evidence that the existing setup consumer imports the builder and that common/M gains no QA bootstrap/residency path. It also requires a real producer/harness causal test reaching actual derive from closed third evidence; existing syntheticFacts aliases/placeholder fixtures cannot qualify it. Until that separate producer unit exists, integration is inactive.

Before ANY later claim of positive owner flow, require genuine original three owner receipts and Selection preceding primary T0, actual derive and full PolicyReceipt after T0, source-specific grant/notice/SDK and own-SEND tests, and complete unknown-writer cleanup. The four setup-facts cases (normal, changed grant, changed project revision, changed selection) return only through that flow; current pending test remains.

Separately required before prearm acceptance: exercise actual compiled M with exact closed configuration through OAuth/monitoring HTTP, event list/subscribe/consume, AfwNodeControl, successor/save/schedule and finite native entrypoints. Demonstrate zero new grant, reservation, claim, Container start and nominal effect; preserve initial/historical records and separately permitted reductions. A pure flag test or the existing limited legacy-denial native test is insufficient. The actual compiled fixture and its trace observations are a later bounded proof gate; they do not need an operational provider or new Entry.

Documentation closure means the spec/plan/report are committed and root can review them. Pure source-unit closure later means meaningful pure tests and independent root acceptance. Integration closure additionally requires actual producer/derive RED/GREEN and changed import-graph checks. Neither closure means full source production, restoration, hosted operation or PC-off.


## Root source activation scope

Root independently accepted first-phase factual context atreportfe0af3605368d563c911f8e8a308584d3d292038 afterfixround1. This containing commit activates ONLYTask1 pureDATAcontract; Task2 remains INACTIVE. One productwriter,GitHub/credential-freeActions only. No realQAalias/SDKsource/notice/prearm orbindingchange is activated here. Exact actualBASE is supplied in dispatch. Purehelpersecret/holder descriptors are not custody,permission ormodulebyteproof. M/common gains no productionimport ofthesedetachedmodules inTask1; nofullcompilerrepeatisneededforthisdata-onlyunit. Futureactualderiveintegrationneedsitsownnative/graphproof. Allhistoricalpins,profiles,currentreader/strictcleanupandtimersunchanged.
