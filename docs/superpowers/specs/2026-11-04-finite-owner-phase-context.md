# Finite owner factual phase context — bounded next source slice

2026-11-04. DESIGN ONLY; no source implementation, build, test run, native qualification or runtime action is claimed.

## Boundary and decision

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web (1347578006); ENVIRONMENT GitHub source/docs; ORIGIN delegated-canary.agentfriendlyweb.dev, not contacted; RESOURCE_TYPE documentation branch; RESOURCE_ID docs/finite-phase-context-plan-20261104; ALLOWED_ACTION connected pinned-source reads and docs-only expected-head commits; ROLLBACK revert this documentation commit. Product baseline is aed54dab23b644481aed01cf6b5b94249ecf9f23 on feat/finite-native-cleanup-20261101, which this task does not write.

Read architecture report [preparatory native composition](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/b60f8328df195307df62610968055b84ea766043/docs/superpowers/reports/2026-11-04-preparatory-native-composition-design.md) first. This specification translates its factual-source boundary; it does not repeat Unit 2a or accepted Unit 2b.1, and does not implement SDK issuance, publication continuation or cleanup.

**Selected smallest unit:** a QA-only original-capsule context reader that qualifies closed_ui and the exact settled first connection publication (read_consent), plus validates any present original issuer/grant factual prefix without issuing or completing it. Later notices/finite publication prefixes return unavailable in this unit. Their exact required semantics are recorded below; no unsupported phase gets a success fixture.

This narrower finish is deliberate. At the pinned baseline, the strict initial reader rejects all stage approvals and policy-effect rows; the private QA adapter calls it lexically. A separate factual reader can remove that consumer dead end without mounting an effect. Completing notices/finite positive qualification would presently require a further private configuration decision and notice issuer correlation, beyond an independently reviewable first-source task.

## Global constraints

- The exact private envelope is {source,preconnectionId,capsuleHash}; validateFiniteOwnerSource keeps its strict inner grammar.
- Common/M must never import QA bootstrap or candidate-residency decoding modules.
- Strict standalone readPrivateQaFiniteInitialOwnerSource and its absence checks remain unchanged.
- Pending-only conduit, GET-only private continuation and private POST rejection remain unchanged.
- No SDK issuance, native mount, provider mutation, permission boolean, callback/DTO authority or new admission.
- Original I0/C0/C1, technical I0+300000, parent <=30000ms, child <=5000ms, commandBy-510000, nominal and launch clocks/counters remain unchanged.
- Historical2607/c570 and QA_CLOUD_CLOSED_PINS remain immutable; source ceiling2026-11-03T02:59:00Z is expired; single consuming Entry remains reserved.
- Exact candidate profile follows the eventually root-accepted incoming Request.signal qualification revision; no hardcoded old flag set or duplicate opt-in experiment.
- No activation before that source qualification and root review; no remote schema, permissions, tokens, OAuth, OTP, cron, Max or other-project action.

## Actual interfaces and separation

Inspected at the baseline:

- lib/mcp-qa-finite-owner-preparation-qa.mjs exports preparePrivateQaFiniteOwnerChoice({ctx,env,request},originalLease). Its lexical reader currently invokes readPrivateQaFiniteInitialOwnerSource({ctx,env,parent,...selector}).
- lib/mcp-qa-finite-owner-preparation.mjs already exports continuePrivateQaFiniteOwnerChoice({ctx,env,request},lease,readOwnedContext), rejects non-GET before calling the reader, retains the strict envelope, uses original A on first GET, and rechecks capsule/selector/source across awaits. Do not redo this accepted implementation or expose that lexical callback over transport.
- readPrivateQaFiniteInitialAnchors({ctx,env},originalLease) in lib/mcp-qa-finite-initial-anchors.mjs returns {capsule,entry,claim,selector,materialAck,material,plan,state,zero,records,actorId,alarm,anchors}. Its compiled descriptor is DATA, not actual residency, provider or credential qualification.
- readPrivateQaFinitePreparationCleanup(options,originalLease) is deliberately strict: it rejects policy-effect rows and later stage/grant/notice rows. Do not call the whole reader to qualify a later phase or loosen its cleanup contract.
- stageHistory(c,count) currently uses c.source and c.step, then compares currentPublication. Its caller reaches resolve. The new producer must not call stageHistory, readFiniteOwnerPreparationFacts, stageContext or resolve.
- createFinitePolicyEffectJournal(...).read(lease) returns {state,send,ack,receipt}; it performs a read-only storage transaction. Its decoded records alone are not proof of actual provider state.
- createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId},lease) supplies the existing exact reservation/freeze/operations inventory. Use this read method only; do not call issuer-store mutations or attempt to reconstruct private consumption/barrier witnesses.

Add QA-only lib/mcp-qa-finite-owner-phase-context.mjs:

```js
export async function readPrivateQaFiniteOwnerContext(
  {ctx,env,parent,preconnectionId = null}
) // Promise<Readonly<{source,preconnectionId,capsuleHash}>>
```

Accept exactly those own data fields (selector may be omitted); reject accessors, extras, wrong selectors and unregistered request parents before external I/O. Selector is a consistency check against capsule/A, never a lookup fallback. Repeated reads can return fresh equal envelopes; no serialized envelope authorizes later work. On incomplete, conflicting or unsupported phase facts throw the existing-style unavailable error, allowing the fixed caller to remain pending; never return a weaker source or a success-shaped partial context.

Change only the QA adapter's lexical import/call to this function. Keep lib/mcp-qa-finite-owner-source.mjs unavailable: changing its common export into a QA import would pull bootstrap/residency into M. Do not add runtime registration, dependency injection, URL-supplied phase or a generic source factory.

Add a small pure shared module lib/mcp-qa-finite-owner-stage-facts.mjs:

```js
export function qualifyFiniteOwnerInstalledStage({
  source, preconnection, sourceSnapshot, initialTicket, connection,
  stage, stageApproval, approval, ticket, ticketUse,
  upload, activation, predecessors, grantLink, noticeLink, observedAt
}) // Readonly<ConnectionReceipt>, or throw
```

Add lib/mcp-qa-finite-preparation-enrollment-facts.mjs with the pure shared validator:

```js
export function qualifyFinitePreparationEnrollmentFacts({
  anchors, enrollment, ack, preconnection, sourceSnapshot,
  stageApproval, approval, ticket, ticketUse, projectRef
}) // Readonly<{enrollment,ack}>, or throw; ack may be null
```

anchors is the DATA result of readPrivateQaFiniteInitialAnchors (without a new lease or capability). Other values use their existing codecs. Extract the strict cleanup reader's original capsule/plan/arm/completion/zero-state, subject/realm/project/client/resource, snapshot/decision/ticket-use, enrollment hash and ACK predicates into this helper. The strict reader retains its existing inventory, stage absence, cleanup-state and reread gates unchanged around the helper; the new context reader supplies its separately qualified phase inventory. Never add a relax/phase option to the strict reader. Neither helper returns permission.

All arguments are strict DATA: source is the strict source grammar, preconnection/sourceSnapshot/tickets/approvals/links use existing preparation codecs; connection is ConnectionRef or null; upload/activation are exact {state,send,ack,receipt} observations; predecessors is the ordered preceding ConnectionReceipt array; links are exact records or null; observedAt is an integer observation time. No I/O, callback, lease, resolver, env, authority result or configurable policy. Extract existing stageHistory predicates for decision/ticket-use, source/subject/project, stage ordering, original predecessor, contextHash and both journals. Add receipt completedAt >= both ACK times, correct receipt module/configuration correlation checked by the QA caller, and exact original expiry bounds. Existing stageHistory still gathers its facts and performs its final currentPublication check, but uses this pure qualifier per stage. Its return shape and setup-ownedSource behavior remain unchanged.

Do not export a general primary-reader factory. Fixed provider/D1 routines stay lexical in the QA context module. The new module may import the QA bootstrap/resident readers because only the QA adapter imports it. The common pure helper must not.

## Factual derivation and bounded inventory

Start from the genuine original incoming parent/root and accepted observeFiniteFactualReadWork. Capture real storage/actor/self namespace/RELEASE_DB/node/version/custody/fetch holders; check them and the original guard before and after every await. Use existing retained whole-operation behavior and child deadlines. Same-ambient genuine-owner borrow remains as accepted; no new admission argument, request root or readonly upgrade.

Read the original anchors, require zero initial recovery state, unchanged alarm C0 and exactly the original six initial cleanup records. Deny any restore/freeze/cleanup progress, nominal trial head or source-selection. Narrow by original C0, actual credential expiry and actual owner/approval/permission expiries, never extending the parent.

Validate the original retained backup using decodeFiniteInitialUploadRecord from lib/mcp-qa-finite-initial-upload-records.mjs: exact upload Receipt/Backup under afw.finite-initial-upload.v1:<plan.entryHash>:, manifestHash == plan.manifestHash, original material and candidate/configuration tuple, and historical baseline version/deployment. Read only the manifest's exact chunk indices (<=64, <=32768 bytes each, <=2097152 total), verify each chunk manifest/hash/size and assembled original module hash/length; validate raw/normalized configuration hashes with the existing immutable historical-pin codec. This is recoverable backup DATA, not a restore action or current restoration qualification. Include raw backup/chunk facts in the final consistency check.

Qualify actual resident bytes against original capsule/plan and compiled revision/tree. Independently verify both token identities/expiry, current QA pointer and QA module/configuration against original Q. Qualify original M metadata/bytes/configuration against plan, even when it is no longer current. The initialBaseline is always capsule.activatedVersionId/deploymentId plus original module, activationConfigurationHash(plan.configuration) and original bindings hash. It must never become the latest receipt. Program context comes from material.originalContext.original and original-context hash, not the current artifact's program hash. Window remains {startedAt:capsule.I0,expiresAt:capsule.C0}.

Use bounded exact record inventories with overflow-as-unavailable: current original A connection prefix (maximum16), policy-effect prefix (maximum32 plus overflow sentinel), preparation enrollment prefix (maximum2 plus sentinel), exact current issuer family through its existing bounded journal read. Validate every inventoried key; reject foreign identity, extra stages/keys, orphan ACK/receipt, failures, wrong writer-head or unknown SEND. Read referenced ticket/use/projectRef/approval/authorization/connection keys only after their exact IDs/hashes are derived. Re-read anchors, relevant raw inventory, provider pointer/configuration and primary facts before returning; any drift denies rather than retrying.

Enrollment is optional before original approval; when present, decode Enrollment/Ack with the existing codecs and call qualifyFinitePreparationEnrollmentFacts for the exact original-anchor/preconnection/decision bindings shared with the strict cleanup reader. Do not invoke that reader for read_consent. A connection publication requires both exact enrollment and ACK. Enrollment without its ACK does not become publication permission. Data is not cleaned, repaired or rewritten by this reader.

Each current owner/consent/grant/event/fence observation uses a NEW captured RELEASE_DB.withSession('first-primary') session with SELECT as its first query. A later read on the same session is not described as physically primary. Use fixed selectors derived from original A/issuer identity, never owner/client-wide recovery scans. Current owner/project/revision must match original material selection. Present AuthorizationLink, consent, issuer reservation, OPEN fence, consumed consent, grant, GrantLink and connection relation are independently compared against each other and original enrollment. Missing later facts do not fabricate them. Unknown issuer SEND/ACK or orphan business rows make the snapshot unavailable; consumed consent without a grant remains a terminal factual prefix, never repaired or reissued. Freeze/terminal fence/revoked/expired grant denies usable context.

For a wholly absent issuer/grant prefix, read_consent is a publication fact only. For a present partial prefix, validate its actual rows and exact operation journal; a qualifying source still does not imply eligibility for notices or any grant action. GrantLink/relation without exact reserved grant/consent, or a second unrelated reserved identity, is rejected. Notice-specific journal operations are not added to Unit 2a by this task.

## Phase predicates

| Phase | Facts required | This task |
| --- | --- | --- |
| closed_ui | Actual pointer is original capsule M; no publication SEND/ACK/receipt; exact original ticket/approval/enrollment prefixes may exist; no grant/notice or nominal effects. | Produce context. Approval alone must not break the reader. |
| read_consent | Exactly installed connection receipt after original M, upload ACK + activation SEND/ACK/receipt and original decision/enrollment; actual pointer/bytes/configuration match receipt. OAuth preparation enabled; monitoring/events/nominal writers disabled. | Produce context; validate present original issuer/grant prefixes without completing them. |
| notice_consent | Exact connection then notices chain; exact current consumed authorization, reserved grant, GrantLink/relation; monitoring policy pins original grant/project/client and expiry; actual notice is separately required for next-stage eligibility. | Unavailable. No guessed monitoring issuer/notice authority. |
| finite_prearm | Three exact publications + grant/notice/approval/audit facts; actual third-stage resident bytes and full canaryLive/public-static + private-full configuration; compiled prearm must deny nominal work until separate setup/handoff. | Unavailable. Never call qualifyFiniteConnectionProfile with this phase. |

For the first connection publication, derive expected read_consent configuration by cloning original qualified plan.configuration and changing only AFW_DELEGATED_OAUTH_ENABLED to 'true'. The allowed mutable-field family for the first two preparation publications is AFW_DELEGATED_OAUTH_ENABLED, AFW_DOSSIER_MONITORING_OWNER_ENABLED and AFW_DOSSIER_MONITORING_OWNER_POLICY; all other configuration/binding bytes and module bytes remain exact. Qualify with qualifyFiniteConnectionProfile({phase:'read_consent',metadata}); compare actual activation configuration hash to the receipt and exact expected config. Do not use receipt hash equality as a substitute for full primary metadata.

**Third-stage unresolved mismatch:** projectFinitePublicConfiguration({role:'canaryLive',metadata}) requires nonempty private-slot strings. The historical test fixture finite-connection-source.mjs inserts SYNTHETIC-PRIVATE-<name>; it does not prove empty prearm policy fields or nominal denial. Therefore this task must not synthesize a configuration that happens to pass the public projection or weaken its grammar. A later root-reviewed design must reconcile exact prearm private fields with actual candidate residency/public-static/full expectations and prove actual compiled denial. The historical fixture is test provenance, not a qualified source producer.

## Later interfaces, explicitly excluded

Future issuer/notice composition consumes the same private envelope and original selector lexically; it derives current owner/SDK/cookie/CSRF independently and uses the original lease. It cannot accept envelope data as approval. The existing readPrivateQaFiniteConnectionSource({ctx,env,preconnectionId,stage},lease) boundary still needs fixed {ownerSource,baseline,rollback,candidate,bytes,assertCurrent}; this task does not implement it.

Own-in-flight publication recheck remains private inside the actual consumed-admission/retained writer closure. After its own SEND, the general reader remains unavailable; later writer code must recheck exact local journal, unchanged predecessor and live original admission at the precise operation position. No allowPending/allowOwnedWriter boolean, source option, reconstructed owner or externally callable recheck.

Complete cleanup consumer, fixedPolicyEngine failure/cancellation correction, notice issuer extension, SDK uncertainty classification, three-stage positives and four setup-facts cases remain later. None is closed by this context reader.

## Meaningful source verification and honest closure

Use native workerd/DO/D1 fixtures with the actual context module, pure qualifier, record codecs and journals; inject only explicit synthetic external provider/custody responses and isolated initial material. Do not replace the reader/qualifiers or return ready/source DTOs. Construct first-stage test records through actual preparation/journal APIs; their synthetic origin must be labelled, never described as a genuine mounted owner publication. The runtime writer remains pending.

Required proofs: original closed source; valid original approval/enrollment still closed; exact settled first chain read_consent; original baseline/program/window unchanged; wrong predecessor/context/ACK/receipt, unknown SEND, extra/orphan rows, QA drift, foreign actor/holder and fresh primary owner/revision/expiry drift deny; partial issuer prefixes cannot claim grant/notice; retained held fetch/body/cancel and original budget/abort; strict standalone reader still denies approvals/publications; later stage inputs deny. Assert unchanged business/storage snapshots and zero provider non-GETs during every context read. Native source test may seed evidence as fixture DATA; it must not claim end-to-end production of that evidence.

Gate against the root-accepted candidate profile revision and exact cloud Actions run. Reuse existing conduit/POST/retention tests, but do not rerun the independent incoming-signal experiment as this task. Run one changed-graph compiler/residency check because QA imports change; assert common/M has no new QA bootstrap/residency edge. Keep source-only tests separate from future remote activation.

Close only when the two supported phases pass meaningful native tests, all denials and pending guards remain, root review accepts the source diff/profile provenance, and exact head/run/check evidence is recorded. This closes factual context for the first publication, not notice/finite qualification, SDK/native production, restoration, PC-off or operationalReadiness.
