# Finite private policy setup implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Preserve root dispatch: one scoped implementer, fresh reviewer, then next gate. Task implementers do not spawn subagents.

**Goal:** Implement authenticated pre-T0 connection preparation and one post-T0 private-policy setup without spending finite HEAD early or exposing private values.

**Architecture:** Actual Access/owned-primary evidence produces immutable private context; source-owned phase adapters alone own publication sends. Pure records/journals grant no execution authority. Preparation and finite profiles remain distinct.

**Tech Stack:** Existing Node>=22.18.0, ESM, workerd/Miniflare, native SQLite DO/D1, Wrangler/GitHub Actions; existing lockfile.

**Spec:** [accepted design](../specs/2026-11-01-finite-private-policy-setup.md) at ec08eda2f986fad608f7b1c113aa0dd877d378d8. Source inspected there; execution BASE is root's later qualified post-C1/Native5 revision, never presumed from this docs branch.

## Global constraints

- Source-only cloud work. No provider/private read, secret value, role/key/scope, OAuth action, deploy, DDL, live comment, occurrence, local dependencies/build or automatic recovery.
- Original connection window<=900000ms; each request parent<=30000ms including queue, child<=5000ms clipped by parent/window. commandBy=min(actualReadExpiry,noticeExpiry,AccessProofExpiry,approvalExpiry,connectionWindowEnd)-480000-30000. Never renew ten-minute grants.
- Post-T0 setupBy=T0+50000; adoption70s/ARM90s; original Known4args/18stages/70s/5s/20s and C0/C1/R1/history/uncertainty unchanged. No finite HEAD before all actual read-only eligibility checks.
- PREPARATION uses real qualified Access realm/limiter/client/project/window bindings and independent profile grammar. C1 finite profile keeps OAuth/monitoring-owner closed and currently lacks those Access bindings. Never fake env flags or claim it already handles MCP.
- Raw policy/context/JWT/cookies never logs/GHA/public artifacts; JWT/cookies never persist. Secret inheritance EXACT {name,type:'inherit',version_id:baselineVersionId}; no old_name/latest/omission/script-upload substitution.
- Initial preparation publication, custody/API permission, actual baseline bytes/privacy and future runbook approval remain gates. Root's20:39:33.726UTC historical version GETs prove shape only: QA31bindings/14false/two SQLite classes; canary29/8false/AfwOwnEventNodeSQLite/container execution; OP7/3false/no export. They prove no current pointer/source lineage/secret value/artifact availability. Qualify actual copy descriptors before use.
- Publisher metadata candidate only: root 20:45:01.750UTC exact-name account token 05718105dcdfc92e55cc3624172c2740, notBefore2026-10-28T03:00:00Z, expiry2026-11-03T02:59:00Z; one allow group 7e79ec33834341f28dd431ab73884400 on fixed canary script7d96bc137a854faa875ee0f160119810. AFW_MCP_CLOSURE_PUBLISH_TOKEN secret match/uploadability UNPROVED; future correct account verify and dated-policy trust mandatory, scopeVerified=false. Never substitute GHA9db or reader9aa; no repeat probe here.
- operationalReadiness=false. No additional namespace, credential, public QA ingress or general URL/RPC authority.

## Review focus and ordering

Task1 journal/data -> Task2 actual owner/ticket/consent producers -> Task3 private transport/preconnection phases -> Task4 post-T0 setup -> Task5 C2 mounts/primary composition. Root completes Native5 source before integration; shared source changes are sequentially assigned.

Pin these failures in owning tests: raw DTO falsely treated as authority(T1/2); latest-grant/changed selection(T2); omitted secret inheritance or late writer(T3); future-ACK receipt/expired consent(T3/4); changed project revision or fake runtime/Container capability(T5). No complete-package or live-ready claim from partial staging.

## Shared exact interfaces and types

All spec record schemas/purposes/limits remain exact: Preconnection, ConfigurationApproval, OwnerPreparation, Selection, Binding, GrantLink, NoticeLink, ConnectionSend/Ack/Receipt, PolicySend/Ack/Receipt. Decode rejects unknown/accessor/prototype/duplicate-key/noncanonical/bounds violations. Hashing excludes only each schema's named self-digest; ticketHash/subjectHash/requestHash remain committed inputs.

Additional private Ticket EXACT {purpose:'afw.finite-owner-ticket.v1',ticketHash,subjectHash,sourceRevision,projectRef,connectionRef,preconnectionId,action,createdAt,expiresAt}; action connection|notices|finite, connectionRef null only before genuine grant. Opaque references are32-byte hex, no browser raw identity. TicketUse EXACT {purpose:'afw.finite-owner-ticket-use.v1',ticketHash,recordHash,consumedAt}; append-only.

Lease={signal,assertCurrent}; source-owned assertCurrent checks original wall+monotonic deadline/identity around every await. MutationObservation={status:'recorded'|'existing'|'uncertain',recordHash:string|null}; ReadObservation={status:'observed'|'absent',record:immutable|null}. Neither grants send authority. StageOutcome<R> is EXACT {status:'installed',receipt:R} or {status:'admin_pending',mayRetry:false,operationalReadiness:false}; no caller-success capability.

SetupContext EXACT {purpose:'afw.finite-policy-context.v1',intentId,sourceRevision,seedHash,preparationHash,selectionHash,bindingHash,T0,C0,C1,ownerPreparation,baselineProjectRevision,goal,saveIdempotencyKey,legacy,policies,baseline,rollback,expectedFull}. policies has exactly the six accepted private-slot names/string values. legacy uses the accepted private finite-plan legacy validator, never a new reduced history schema. baseline/rollback EXACT {versionId,deploymentId,module,configuration}; module uses the existing finite descriptor's actual name/sha256/bytes/exports grammar, configuration the actual activation/restoration field grammar with secret descriptors only. Codec checks shape; Task3 proves source/primary semantics; expectedFull EXACT {activationHash,restorationHash,bindingsHash}; new versionId belongs only to later actual receipt. <=64KiB/no modules/secrets.

createFiniteOwnerPreparationStore({storage,now}) exposes:
putPreconnection(record,lease); putTicket(ticket,lease); consumeTicket({ticketHash,recordHash},lease); putLink({kind:'grant'|'notice',record},lease); publishSelection({preparation,selection,expectedHeadHash},lease); bindSelection(binding,lease); putContext(context,lease) -> MutationObservation.
readSelected({sourceRevision},lease)->{preparation,selection,binding}|null, binding=null until bound; readContext({intentId,sourceRevision},lease)->SetupContext|null.
Keys are source-derived, never caller paths. publishSelection transaction appends exact preparation/selection and CAS head; bindSelection correlates originalT0/current selected hash once.

createFinitePolicyEffectJournal({storage,identity,now}) exposes issue(send,lease), acknowledge(ack,lease), finish(receipt,lease)->MutationObservation; markAdminPending({reasonCode,observedAt},lease)->MutationObservation; read(lease)->{state,send,ack,receipt}, state absent|issued|acknowledged|installed|admin_pending. identity is EXACT connection{kind:'connection',preconnectionId,sourceRevision,stage,effect} or policy{kind:'policy',intentId,sourceRevision,setupInstanceId,effect}; stage connection|notices|finite, effect upload|activation. Actual record types match identity; finish is activation-only and checks its sibling upload ACK. Failure EXACT {purpose:'afw.finite-policy-failure.v1',identityHash,reasonCode,observedAt}, reasonCode validation|claim_uncertain|provider_uncertain|deadline|conflict. Returns are factual only.

## Task1: strict private records and native journals

**Create:** lib/mcp-qa-finite-preparation-records.mjs, lib/mcp-qa-finite-preparation-store.mjs, lib/mcp-qa-finite-policy-journal.mjs; test/mcp-qa-finite-preparation-records.test.mjs, test/mcp-qa-finite-preparation-store-native.test.mjs, test/mcp-qa-finite-policy-journal-native.test.mjs; test/fixtures/finite-preparation-store-worker.mjs.
**Interfaces:** encodeFinitePreparationRecord(kind,value), decodeFinitePreparationRecord(kind,text), hashFinitePreparationRecord(kind,value), plus shared store/journal constructors. kind is the finite source enum of named record types above; no dispatch/transport/identity success.

- [ ] RED: wrong private fields/hash domains/cyclic/future-ACK records fail; native concurrent selection CAS yields one winner; pointer away/back afterT0 rejects; cross-intent binding blocked; consumed ticket/lost storage ACK never resets; issue-before-send records survive reconstruction. Assert zero fetch/Workflow/HEAD calls.
- [ ] Run hosted Task1 command below and retain genuine behavioral failure.
- [ ] Implement exact codecs and transactions using actual DO storage; copy/freeze returned records, preserve all existing keys/history and uncertain outcomes. No runtime mount or production capability minted.
- [ ] GREEN native SQLite tests and scoped lint; commit/report and stop for fresh review.

## Task2: actual Access owner selection and genuine consent links

**Create:** lib/mcp-qa-finite-owner-preparation.mjs, lib/mcp-qa-finite-owner-http.mjs; test/mcp-qa-finite-owner-preparation-native.test.mjs.
**Modify:** scoped source integrations in lib/delegated-oauth-worker.mjs and lib/dossier-monitoring-owner-http.mjs, preserving ordinary flows/default closure.
**Consumes:** T1; verifyCloudflareAccessJwtWithExpiry; createDelegatedOAuthStore(db).getGrant; createDelegatedProjectRepository({db,grantStore}).getOwnedProject; lib/dossier-monitoring-authority.mjs recordDossierMonitoringConsent.
**Produces:** createFiniteOwnerPreparationHost({ctx,env}).fetch(request)->bounded Response; internal readFiniteOwnerPreparation({ctx,env,sourceRevision,intentId?,signal})->{preparation,selection,binding}|throw. Constructors resolve fixed source dependencies, not caller verifier/pins. Internal recordFinitePreparationGrant({ctx,env,request,grantId},lease) and recordFinitePreparationNotice({ctx,env,request,requestId,sequence},lease) return MutationObservation; request is the bounded preserved original request, other fields actual server-created grant/ack values. They reconstruct/link exact transaction evidence and fresh primary rows, never accept arbitrary external DTOs.

- [ ] RED with real signature-verified synthetic JWT/JWKS and actual ephemeral D1: source/audience/owner/origin/cookie/ticket mismatch; no grant needed for initial owned-project choice; exact newly accepted grant versus latest; consent/notice revocation; sourceM pointer changed; raw IDs rejected.
- [ ] Implement fixed /connections/finite-prepare request grammar and plain human purpose/bounds. QA independently verifies forwarded original request; source-qualified binding holders only. Every logical primary read uses fresh db.withSession('first-primary'); do not mistake listConsentProjects ORDER BY for selection.
- [ ] Add fixed source calls after genuine createGrant+completeAuthorization success and after acknowledged monitoring consent. Produce GrantLink/NoticeLink only from original transaction plus exact current primary reread; no generic success callback/registration. Monitoring acknowledgement contains sequence/action/expiresAt, not eventHash: compute eventHash from the exact requestId/sequence primary row. Link failure keeps setup unavailable; never repeat grant creation or change ordinary consent/revocation semantics. Existing functions validate/create genuine consent, not provisioning. Missing publisher stage remains unavailable, not simulated success: Task2 tests prove authentication/records, not publication; Task3 supplies the fixed producer without caller registration.
- [ ] GREEN T2 and existing OAuth/monitoring native suites; scoped lint; fresh review. Ordinary read permission never becomes configuration authority.

## Task3: fixed private transport and three preconnection stages

**Create:** lib/mcp-qa-finite-policy-transport.mjs, lib/mcp-qa-finite-connection-profile.mjs, lib/mcp-qa-finite-connection-preparation.mjs; modify Task2 owner host to call this actual fixed producer; test/mcp-qa-finite-policy-transport.test.mjs, test/mcp-qa-finite-connection-preparation-native.test.mjs.
**Consumes:** T1/T2 plus source-approved module/profile/actual custody.
**Produces:** qualifyFiniteConnectionProfile({phase,metadata})->immutable exact expectations; createFiniteConnectionPreparation({ctx,env}).run({preconnectionId,stage},lease)->StageOutcome<ConnectionReceipt>. Source privately constructs transport; no exported send-capability mint.

- [ ] RED: all exact inherited binding descriptors include baseline UUID in requestHash; latest/omitted/renamed secret rejected. Lost/late version ACK never activates, foreign pointer blocks, stage replay/404 cannot resend; current baseline/rollback bytes/resources/exposure drift denies.
- [ ] Implement fixed Workers Beta upload and fixed100%activation only. Original admitted invocation+source evidence+NEW durable claim ACK permits one send; journal boolean/hash alone cannot. Keep outstanding remote writes on unknown timeout.
- [ ] Implement independent closed_ui/read_consent/notice_consent templates with exact Access audience/team/limiter/resource IDs qualified from approved private baseline, no invented constants. First two preserve preparation code; third uses actual qualified finite package bytes, closes OAuth/monitoring owner and records final preparation only after ACK/readback. Bound fifteen-minute window and each30s/5s parent.
- [ ] GREEN native stage path using actual bound source constructors and explicitly synthetic CF/custody provenance. No actual credential/API probe; unknown actual custody/baseline stays unavailable. Fresh review.

## Task4: actual post-T0 setup operation

**Create:** lib/mcp-qa-finite-policy-setup.mjs; test/mcp-qa-finite-policy-setup-native.test.mjs.
**Consumes:** selected owner record, readFiniteMaterialSeed, fixed source-authority/context, T1/T3.
**Produces:** createPrivateQaFinitePolicySetup({ctx,env}).run({intentId,sourceRevision})->StageOutcome<PolicyReceipt>; runFinitePrivatePolicySetup({env,event,step})->StageOutcome<PolicyReceipt>; no raw policies.

- [ ] RED: original owner/source/seed not complete, T0 pastcommandBy, changed grant/revision/selection, first HEAD touched, predicted new-version/terminal receipt, setup50s and child clipping, unknown prior SEND.
- [ ] Bind selected preparation once; derive raw policies/C0/C1 from primary originalT0, immutable original context and existing validators. Preserve actual full hashes separately from publicStatic; no caller plan/env clone. One upload then one activation, exact version secret inheritance, no nominal/Container.
- [ ] Require actual version/module/readback and context persistence before installed receipt. Later primary completed-success setup/output/writer/pointer qualification remains required; emitting a receipt cannot prove self-terminal.
- [ ] GREEN native Task4 plus seed/bridge/control tests and scoped lint; fresh review.

## Task5: C2 mounts, retained primary and final dependency gate

**Modify:** worker/mcp-own/connection-preparation.mjs(new), worker/independent-closure/finite.mjs and actual existing classes; source-authority and planned lib/mcp-qa-finite-material.mjs. Create test/mcp-qa-finite-preparation-mount-native.test.mjs.
**Produces:** readPrivateQaFiniteSetupContext({ctx,env,intentId,sourceRevision,signal})->immutable {context,receipt}; planned createPrivateQaFiniteMaterial({ctx,env,refs})->EXACT {controlOptions,readFinalPrimary,custody}. These are planned owned producers, not already available APIs.

- [ ] RED actual Worker->QA DO->D1+Workflow mounts: independent Access proof, private data never in outputs; missing actual binding/custody/profile denies before effects; ctx.container/class/source mismatch denies prepare; Save/revoke changes current rows but cannot replace immutable baseline; all pre/post-T0 writers block restoration until settled.
- [ ] Install only fixed source constructors with actual ctx/env and proven binding provenance. Initial preparation entry is independent of global OAuth gate; protect original request forwarding and fixed actor. Integrate Native5 completed setup prerequisite and36 absolute2s adoption slots through70s/ARM90s without another active-instance exception.
- [ ] Explicit C3 dependency: delegated-oauth-worker:135 returns before /mcp when OAuth=false; :194 needs Access/limiter/pins absent from C1 finite profile. C3 must separately implement/review a narrow finite HTTP/resource-only existing-grant route with current finite control, preserving default closure; no env clone/true-flag bypass/new OAuth/server here. This plan cannot certify the full business route.
- [ ] GREEN mounted native path and affected existing tests/scoped lint/dry-run generated profiles. Root composes full-suite/review after Native5/C2/C3; actual promotion/publication/privacy/custody/consent remain separate.

## Commands, evidence and handoff

Hosted Node 22: npm ci --ignore-scripts --no-audit --no-fund.
T1: node --test test/mcp-qa-finite-preparation-records.test.mjs test/mcp-qa-finite-preparation-store-native.test.mjs test/mcp-qa-finite-policy-journal-native.test.mjs.
T2: node --test test/mcp-qa-finite-owner-preparation-native.test.mjs test/cloudflare-access-identity-expiry.test.mjs test/delegated-oauth-flow.test.mjs test/dossier-monitoring-oauth-native.test.mjs test/dossier-monitoring-owner-native.test.mjs.
T3: node --test test/mcp-qa-finite-policy-transport.test.mjs test/mcp-qa-finite-connection-preparation-native.test.mjs test/mcp-canary-restoration-transport.test.mjs.
T4: node --test test/mcp-qa-finite-policy-setup-native.test.mjs test/mcp-qa-finite-seed-http.test.mjs test/mcp-qa-finite-publication-bridge.test.mjs test/mcp-qa-finite-trial-control-native.test.mjs.
T5: node --test test/mcp-qa-finite-preparation-mount-native.test.mjs test/mcp-qa-finite-read-rpc-native.test.mjs test/mcp-own-finite-entrypoints-native.test.mjs; affected Native5 tests after root integration.
Each task npx eslint with exact changed JS paths recorded in its report. Only generated-byte Wrangler --dry-run --no-bundle for affected profiles; no provider calls. Temporary qualifier branch-only/excluded integration.

Report docs/superpowers/reports/2026-11-01-finite-private-policy-setup-taskN.md; append existing finite progress ledger. Record exact BASE/code/docHEAD, RED/GREEN commands/run/job/counts, source/fixture limits, remaining gates, CAS/readback and fresh review. First brief ../briefs/2026-11-01-finite-private-policy-setup-task1.md. Stop writes at each gate; no extra agents from briefs. This plan authorizes no implementation/runtime action until root dispatches the scoped task.


## Root C2 Task1 exact-contract rulings (2026-11-02, before implementation)

Source-only BASE 6c3b0f951d2c7a63cbf9abfd4aea81222bf1cd9a. Root approved narrow read-only validatePrivateQaFiniteLegacy({legacy,T0}) in mcp-qa-finite-trial-control.mjs, factoring the exact existing previous-field/hash/source validator and reusing legacy(plan,T0); exact own-data pair, immutable legacy only. No fabricated full plan/weaker duplicate; old finite-control native command joins GREEN. Baseline/rollback module is actual validateFiniteModule EXACT {name,sha256,bytes}; exports belong to configuration.exports/profile qualification, never a fourth descriptor field. Configuration is checked with actual activationConfigurationHash (seven keys, secret_text name/type only) AND separately fingerprinted with restorationConfigurationHash. Full source/binding correctness remains T3/T5.

GrantLink and NoticeLink keep exact spec field lists WITHOUT purpose/selfhash. Their digest domains are afw.finite-grant-link.v1 and afw.finite-notice-link.v1 plus newline plus ASCII-key-sorted canonical full record. ConnectionRef map likewise has no purpose/selfhash; domain afw.finite-connection-ref.v1. Other record domains use actual purpose and exclude only their named selfdigest. Root accepted explicit fail-closed RED shells with actual SQLite mounts and behavioral assertions; missing dependencies/syntax/mounts are not qualifying RED. No positive authority placeholder.


Root C2 Task1 additional exactness ruling: policies has exactly AFW_DOSSIER_EVENTS_POLICY, AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY, AFW_DOSSIER_RETIREMENT_POLICY, AFW_DOSSIER_SUCCESSOR_POLICY, AFW_OAUTH_PILOT_CLIENT_ID and AFW_OAUTH_PILOT_PROJECT_ID. Project digest is SHA256('afw.finite-owner-project.v1\n'+ASCII-canonical exact {projectId,revision,synthetic}). Standalone ConfigurationApproval checks digest shape; embedded OwnerPreparation checks exact project digest/source/goal. Optional narrow hashFiniteOwnerPreparationProject factual helper confers no authorization. Preconnection approvalHash remains a T2 source correlation to actual stored ConfigurationApproval.


Root C2 Task1 identity ruling: Failure.identityHash and journal key derive SHA256('afw.finite-policy-effect-identity.v1\n'+ASCII-canonical EXACT validated identity union INCLUDING kind/effect). Connection union is {kind:'connection',preconnectionId,sourceRevision,stage,effect}; policy union is {kind:'policy',intentId,sourceRevision,setupInstanceId,effect}. Sibling upload replaces only effect with literal upload and hashes same union/domain. No caller key or omitted dimension; afw.finite-connection-stage.v1 remains separate. Shared factual identity helper may be exported; digest never creates send authority. Unknown/late SEND remains outstanding.
