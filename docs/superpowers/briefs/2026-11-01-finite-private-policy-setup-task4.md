# Private policy setup Task4 — actual post-T0 setup operation

SOURCE ONLY. Root supplies exact accepted BASE after Task3 fresh review; never run from a historical report's codeHEAD. Read this brief first; it contains the requirements. One writer, no subagents or self-appointed reviewer. Do not implement Task5 or C3.

## Global constraints

- Source-only cloud work. No provider/private read, secret value, role/key/scope, OAuth action, deploy, DDL, live comment, occurrence, local dependencies/build or automatic recovery.
- Original connection window<=900000ms; each request parent<=30000ms including queue, child<=5000ms clipped by parent/window. commandBy=min(actualReadExpiry,noticeExpiry,AccessProofExpiry,approvalExpiry,connectionWindowEnd)-480000-30000. Never renew ten-minute grants.
- Post-T0 setupBy=T0+50000; adoption70s/ARM90s; original Known4args/18stages/70s/5s/20s and C0/C1/R1/history/uncertainty unchanged. No finite HEAD before all actual read-only eligibility checks.
- PREPARATION uses real qualified Access realm/limiter/client/project/window bindings and independent profile grammar. C1 finite profile keeps OAuth/monitoring-owner closed and currently lacks those Access bindings. Never fake env flags or claim it already handles MCP.
- Raw policy/context/JWT/cookies never logs/GHA/public artifacts; JWT/cookies never persist. Secret inheritance EXACT {name,type:'inherit',version_id:baselineVersionId}; no old_name/latest/omission/script-upload substitution.
- Initial preparation publication, custody/API permission, actual baseline bytes/privacy and future runbook approval remain gates. Root's20:39:33.726UTC historical version GETs prove shape only: QA31bindings/14false/two SQLite classes; canary29/8false/AfwOwnEventNodeSQLite/container execution; OP7/3false/no export. They prove no current pointer/source lineage/secret value/artifact availability. Qualify actual copy descriptors before use.
- Publisher metadata candidate only: root 20:45:01.750UTC exact-name account token 05718105dcdfc92e55cc3624172c2740, notBefore2026-10-28T03:00:00Z, expiry2026-11-03T02:59:00Z; one allow group 7e79ec33834341f28dd431ab73884400 on fixed canary script7d96bc137a854faa875ee0f160119810. AFW_MCP_CLOSURE_PUBLISH_TOKEN secret match/uploadability UNPROVED; future correct account verify and dated-policy trust mandatory, scopeVerified=false. Never substitute GHA9db or reader9aa; no repeat probe here.
- operationalReadiness=false. No additional namespace, credential, public QA ingress or general URL/RPC authority.


## Task4: actual post-T0 setup operation

**Create:** lib/mcp-qa-finite-policy-setup.mjs; test/mcp-qa-finite-policy-setup-native.test.mjs.
**Consumes:** selected owner record, readFiniteMaterialSeed, fixed source-authority/context, T1/T3.
**Produces:** createPrivateQaFinitePolicySetup({ctx,env}).run({intentId,sourceRevision})->StageOutcome<PolicyReceipt>; runFinitePrivatePolicySetup({env,event,step})->StageOutcome<PolicyReceipt>; no raw policies.

- [ ] RED: original owner/source/seed not complete, T0 pastcommandBy, changed grant/revision/selection, first HEAD touched, predicted new-version/terminal receipt, setup50s and child clipping, unknown prior SEND.
- [ ] Bind selected preparation once; derive raw policies/C0/C1 from primary originalT0, immutable original context and existing validators. Preserve actual full hashes separately from publicStatic; no caller plan/env clone. One upload then one activation, exact version secret inheritance, no nominal/Container.
- [ ] Require actual version/module/readback and context persistence before installed receipt. Later primary completed-success setup/output/writer/pointer qualification remains required; emitting a receipt cannot prove self-terminal.
- [ ] GREEN native Task4 plus seed/bridge/control tests and scoped lint; fresh review.


## Binding post-T0 specification

## Post-T0 setup and two-effect contract

One existing PrivateQaBootstrap instance: payload EXACT {operation:'finite_private_policy_setup',intentId,sourceRevision}; ID afw-finite-policy- plus SHA256('afw.finite-private-policy-setup.v1\n'+canonical({intentId,sourceRevision})). No caller policy/clock/selector. runFinitePrivatePolicySetup({env,event,step}) calls only fixed IndependentClosure.setupFinitePrivatePolicy(refs); createPrivateQaFinitePolicySetup({ctx,env}).run(refs) owns dependencies privately. Proposed lib/mcp-qa-finite-policy-setup.mjs and policy-transport.mjs, mounted in finite entrypoints. All caller paths/source/native provenance qualify; IDs alone do not authenticate.

After original seed primary success, attended operator creates setup once; lost ACK is exact GET-only. Derive C0=T0+240000/C1=T0+420000 from original GitHub T0. Snapshot private raw context BEFORE upload under afw.qa-finite-policy-setup.v1:<intentId>:context, <=64KiB without modules. Include original revision/goal/save identity, owner/consents/program/legacy evidence, preparation/selection/binding hashes, baseline/rollback pins, exact six private values and intended full fingerprints. Later Save/revoke never substitutes latest rows; fresh authorization can deny effects without rewriting snapshot.

Preserve actual Known/resolveNamedActivationPlan raw gates and original fourargs/18stages/70s/5s/20s. EVENTS/SUCCESSOR/withdrawal derive from original context/T0; withdrawal exactlyC0/C1. Historical retirement meaning stays qualified; project/client stay pre-T0 identities. Replace only approved private slots. Unknown fields fail; no env clone, private GHA/compiled policy or fabricated canary version/ctx.container capability.

Existing canary-only publisher must qualify actual identity/account/expiry/operations independently; Editor/old closed probe proves neither upload capability nor fresh scope equivalence. Fixed account85d0d5dadac3341a564f22ce885e9eec/canary agent-friendly-web-delegated-canary paths: POST /workers/workers/<canary>/versions?deploy=false; POST /workers/scripts/<canary>/deployments. Reads fixed exact baseline/new/rollback versions, pointer, custody and exposure/execution; no general URLs.

For EVERY pre/post-T0 upload, each inherited secret is EXACT {name,type:'inherit',version_id:baselineVersionId}; no old_name, omission or latest. Pin the actual qualified stage baseline UUID and complete descriptor vector into requestHash and SEND; recheck baseline pointer before sending. Never read/copy secret values. The [Workers Beta API](https://developers.cloudflare.com/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/create/) supports explicit inheritance-version IDs on this route; do not substitute script upload.

Post-T0 keys context/upload-send/upload-ack/activation-send/activation-ack/receipt/failure are append-only. Derived states prepared/upload_issued/uploaded/activation_issued/installed or admin_pending. SEND EXACT {purpose,intentId,sourceRevision,setupInstanceId,contextHash,effect,requestHash,issuedAt,deadline}; purpose afw.finite-policy-send.v1, effect upload|activation. ACK EXACT {purpose,sendHash,resourceId,acknowledgedAt}; purpose afw.finite-policy-ack.v1, actual UUID. Pre-T0 SEND EXACT {purpose,preconnectionId,sourceRevision,stage,contextHash,effect,baselineVersionId,baselineDeploymentId,requestHash,issuedAt,deadline}, purpose afw.finite-connection-send.v1; ACK uses the same ACK fields with purpose afw.finite-connection-ack.v1. Stage receipt EXACT {purpose,preconnectionId,sourceRevision,stage,baselineVersionId,baselineDeploymentId,versionId,deploymentId,moduleHash,configurationHash,completedAt,receiptHash}, purpose afw.finite-connection-installed.v1. Link all three receipts and actual consent links into final auditHash. Receipt timestamps follow actual ACK/readback, never predicted completion.

Only acknowledged/read-back durable NEW SEND grants the same uninterrupted invocation one send. Reconstruct/late/unknown ACK/provider404 never refunds. Only fresh acknowledged new-version actual bytes/publicStatic/full-metadata qualification permits activation. Changed/foreign pointer denies; no atomic provider CAS claimed. Outstanding writes remain in inventory.

Installed receipt EXACT {purpose,intentId,sourceRevision,setupInstanceId,qaVersionId,seedHash,contextHash,baselineVersionId,baselineDeploymentId,versionId,deploymentId,moduleHash,publicStaticHash,activationHash,restorationHash,bindingsHash,installedAt,receiptHash}; purpose afw.finite-policy-installed.v1, <=8192bytes, canonical domain hash. Actual full algorithms stay distinct. Private context/receipt readback precede output. installed cannot attest its own future Workflow terminal: later primary completed-success/output/pointer/writer correlation is mandatory before observer creation/preview or control.prepare.


## Accepted dependencies and pending provenance

Use accepted Task1 actual factual store/journal, Task2 actual owner/consent reader, and Task3 actual fixed publication pipeline and exact secret projection. Those data/facts never mint permission. Read only their actual required interfaces/report sections; do not replay earlier work. Actor-wide writer head and unresolved/held actual promise rules apply to the SAME publisher, across connection and policy identities. finite-trial HEAD remains separate and untouched.

The Task3 exported transport consumes original owner-POST admission and cannot be used to invent native setup authority. Propose the smallest exact fixed native source/admission/material contract before affected code. It must bind actual native ctx/env/original entry, original command/seed/selection+publication witness/binding/current owner facts, same M/QA, native setup instance, current pointer/custody/byte/exposure/writer qualification. Missing actual qualification stays default unavailable until Task5; no public override registry/caller success DTO.

Original operation deadline must include queue and forwarding, not restart at the DO. Cloudflare documents WorkflowEvent.timestamp as actual triggered Date and its instanceId/workflowName; GET instance schema has queued/start ISO timestamps, not created_on. Exact clock-provenance relationship needs a source contract/ruling before code; do not infer caller timestamp authority or use a fresh setup30 after forwarding. Original native parent starts before IO, narrows only, each effect child begins BEFORE SEND storage/readback and shares <=5s across claim/network/ACK. No new five seconds after claim. No original owner-HTTP deadline getter used for native setup.

Persist immutable original SetupContext before upload. Changes of current owner Save/revoke may deny new effects but cannot overwrite original baseline/project revision/goal/program/history/context. Preparation binding uses exact current selection+actual publication witness<=T0. Missing/uncertain/replayed binding cannot mint a NEW effects admission. T0 is real owner GitHub comment.created_at, never observedNow/event time.

Derive exact six private slots via current accepted full policy validators and actual source namespace/program/history; no weakened Known/resolveNamedActivationPlan, clone-env, new scopes/consent, predicted new UUID or future terminal receipt. Baseline/new/rollback publicStatic/full hashes stay distinct. Only actual timely upload ACK plus new immutable version bytes+metadata qualifies activation. Receipt after actual activation ACK/readback+context readback; later primary completed setup/output/pointer/writer correlation remains another gate.

No actual provider/private read, stored credential verification/rotation/paste, permissions/OAuth/OTP/window, runtime/DDL/deploy/cron/Container, GitHub live command/finite HEAD, Max, local clones/source/dependencies/build/temp or main merge. Hosted meaningful native RED then GREEN and scoped lint only; no full-suite reruns absent new concrete failure. Reuse branch-only no-secrets/no-artifacts temporary qualifier, EXCLUDED integration.

Report docs/superpowers/reports/2026-11-01-finite-private-policy-setup-task4.md; append finite ledger. Include BASE/code/docHEAD/CAS/readback, exact RED/GREEN runs/jobs/attempts/counts/commands, selfreview and actual-vs-synthetic source limits. STOP WRITES for Root fresh spec+quality review.

## Primary clock references checked by Root (source-only)

- https://developers.cloudflare.com/workflows/build/events-and-parameters/
- https://developers.cloudflare.com/workflows/build/workers-api/
- https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/get/

Native WorkflowEvent.timestamp is the triggered Date; instance metadata exposes queued/start. No actual setup instance was read and no equality was established by this documentation lookup. Clock/admission contract must be resolved before product code, preserving original deadlines.

## Concrete command-boundary integration check

Task3 pre-T0 readers readFiniteOwnerPreparationFacts/current selected reader currently reject observed Date.now>=commandBy (owner-preparation.mjs370/383 at423c1bf). The immutable selection spec instead requires selectedAt<=actual original T0<commandBy. Setup may legitimately execute after commandBy while actual grants/window/R1/operation deadlines remain current. Resolve this before product changes: preserve strict pre-T0 reader behavior, introduce only a fixed actual native-source-qualified post-T0 factual path with original binding/witness/T0 provenance (no caller T0/bypass flag/renewed clock), and cover a real command just before commandBy processed after it as well as command at/after commandBy denied. This is a concrete T4 integration gate, not permission to weaken grant/owner/scope/Save/revocation/selection checks.

Task3 dependencies to preserve: programContext.sourceRevision is the actual program revision and may differ from runtime/sourceM. Match actual programHash/revision/originalContextHash to primary and current exact selected project/goal; never force equality to M, switch to latest program, or change the captured original context. Baseline/candidate modules use actual descriptor {name,sha256,bytes}; configuration exports/profile and full activation/restoration fingerprints remain separate qualifications.

## Root integration preflight

## Root C2 Task4 integration preflight (2026-11-02, before source work)

Ruling: preserve strict pre-T0 selection/approval behavior while implementing a fixed native-source-qualified post-T0 factual path. Immutable selection requires selectedAt<=actual original T0<commandBy. A command just before commandBy may validly be processed after it while current permission/R1/setup/original-parent bounds still hold; never use observedNow<commandBy as a substitute for original command chronology. No caller T0/bypass boolean or refreshed parent/consent. T4 must propose the smallest exact actual native-entry/source/admission/material table before affected code; owning T5 source qualifiers may remain unavailable, not fake positive DTOs.

The original native setup clock must include forwarding/queue and clip all child/SEND/ACK work. Official WorkflowEvent timestamp is the native triggered Date; fixed instance GET schema exposes queued/start, not created_on. No equality between those clocks was verified by the documentation lookup. Resolve source-owned provenance/narrowing before code, not a fresh30s in a later DO or a caller deadline argument. Actual four Known args/18stages/70s/5s/20s and setupBy50/ARM90 remain unchanged.

Original pre-T0 ownerSource.currentPublication/ConnectionReceipt sequence is historical preparation provenance after the approved post-T0 policy activation, not permission to report the old prearm pointer as the current provider pointer. Native setup/prepare must separately qualify the actual current pointer/config/code against SetupContext/PolicyReceipt and fresh owned-primary facts, preserving original selection/snapshot/receipts. Use the narrowly expected own transition after actual ACK/readback, no rewritten baseline, new preparation-stage enum or generic pointer bypass. Propose exact contract before code.

Source material-residency gate remains T5: compiler currently has single qaLive/canaryLive outputs; native QA has no GitHub download credential. Root considered a possible canary-first compiler DAG with QA-only compressed M-qualified canary bytes, but this is NOT selected/implemented/authority and requires exact design/size/privacy/hash-cycle qualification. No new key/public artifact/general module RPC by inference.

C3 current-source preflight at423c1bf/bcf54a5c: delegated-oauth-worker143 returns paused on OAuth=false before ordinary owner connections/revoke295–319; monitoring has its own gate144. Separately qualify narrow existing-grant business/early withdrawal before live; C0 cleanup does not establish early owner withdrawal. This is future C3 work, not a reopened Task3 review.

References checked without resource probes: https://developers.cloudflare.com/workflows/build/events-and-parameters/ ; https://developers.cloudflare.com/workflows/build/workers-api/ ; https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/get/ .

Use actual accepted shared mcp-qa-finite-stage-work.mjs for denial/retention where appropriate, without reusing owner-POST admission as native setup authority. Source-owned native admission/clock must be separately constructed and scoped. Read relevant actual Task3 source/interfaces/report fix appendix; do not replay Task3 tests or reimplement the fixed publisher. Any shared fixed transport extension requires a precise native contract before affected code, never a generic send callback.
