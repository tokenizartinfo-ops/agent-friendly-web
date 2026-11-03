# B2b: mounted initial closed-UI cleanup ownership

Root design decision, 2November2026. Same AFW source branch and existing resources. User delegated ordinary design/implementation choices and opted out of question cycles. SOURCE ONLY; no live initial command until full composition. This extends actual initial winner ownership, not another unmounted success adapter.

## Goal and approach

After B2a's actual inactive ACK/exact readback, the SAME surviving B1 invocation durably arms a cleanup owner using the existing fixed actor's native DO alarm, before any future activation is permitted. Its independent alarm handles only that exact closed_ui candidate and fixed historical baseline. It does not create a Workflow, service, namespace, credential, grant, Container or new source authority.

Alternatives: a new operation in existing AFW_QA_BOOTSTRAP adds child CREATE SEND/ACK/unknown/inventory machinery without improving this initial-only owner; ownerSource-first remains unavailable without cleanup; activation+allownerstages+cleanup together is too large a fault boundary. Select DO alarm in actual compiled finite subclass, preserve ordinary index.mjs.

## Existing contracts and fixed scope

Actual continuation: lib/mcp-qa-finite-initial-entry.mjs after private publishInitialClosedVersion. Refactor that PRIVATE function to return its own private actual preserved backup/ACK/verified receipt/config data, then call one private armInitialCleanup in the SAME winning invocation. No export/registry/caller-provided success DTO; safe material_recorded RPC remains unchanged and all authority/full/readiness flags false. Existing/unknown Entry/SEND or reconstructed records cannot arm or activate.

Actual mount: worker/independent-closure/finite.mjs IndependentClosure extends ordinary closed class. Override alarm() only here, using a new lib/mcp-qa-finite-initial-cleanup.mjs fixed ctx/env handler. If no initial owner exists, delegate super.alarm(). If an initial owner and nominal HEAD/alarm conflict, fail closed/admin_pending; never silently run both or overwrite/delete the other alarm. Ordinary index.mjs and nominal guard semantics/keys stay unchanged.

Fixed account85d0d5dadac3341a564f22ce885e9eec; actor afw-own-successor-closure-v1; QA namespace070c4a7708eb4592a3ded7c117a88225/current source-selected QA version. Only possible mutation is one canary deployment POST selecting exact baseline2607abae-cec3-4e35-89eb-8b8572262b54 at100%, baseline deployment7b5a3683-eb21-4f6c-95d4-639570595362. Operator855 and physicalD1/Container identities unchanged. Existing reader9aa97ad1fc9afe3021cf69ea497d5190/publisher05718105dcdfc92e55cc3624172c2740 in fixed native QA secrets; never alias GHA9db. No current remote operation by this source task.

## Clock decision

Keep technical setup eligibility I0+300000ms and original B1 base min(nativecreatedAt+30000,source ceiling,custody); children≤5000ms. Arming must finish under that unchanged parent. No stored plan renews setup/activation/owner permission.

Root selects precommitted CLEANUP-ONLY C0=I0+900000ms and C1=C0+180000ms, with at most three recovery deliveries at C0,C0+60000,C0+120000, each≤30000ms and clipped to ORIGINAL C1/custody/source ceiling. This is independent cleanup authority outliving the current closed UI's five-minute expiry; it does not extend that UI or any grant. Captured credential expiry and fixed source ceiling must cover C1 BEFORE arming; otherwise no positive arm. Ceiling remains3Nov2026 02:59UTC, no renewal. A late recovery can run only inside original C1 and its original remaining slots; no new C0/C1 or indefinite alarm.

A future unit must DELIBERATELY reconcile owner window (same original I0, ≤15minutes), current wire OAuth expiry at I0+5minutes, and cleanup handoff before any owner stage enables grants/notices/nominal work. This unit does not change that expiry or mount ownerSource. Existing OwnerPreparation commandBy+510s floor is a real later integration constraint, not satisfied by this unit.

## Actual durable arm

Predictable native prerequisites must fail before Entry: captured storage.getAlarm and required standard methods; do not consume Entry merely because a known missing method is discovered later. tx.setAlarm is checked inside its actual native transaction.

Require exact surviving entry/material/source/QA/candidate, actual producer assertion, private verified upload receipt, preserved baseline manifest/chunks, unchanged actual holders/loaded custody. Require no existing native alarm, no nominal HEAD, no initial owner/claim; do not erase or relabel legacy history. Persist distinct immutable bounded plan and pending state plus setAlarm(C0) inside ONE native transaction. Only its final successful return admits new ownership; no outer inserted flag. Await captured actual storage.sync, exact plan/state readbacks and getAlarm()==C0 before recording/returning a private arm ACK. Recheck no nominal conflict and original parent/source/custody. Unknown commit/sync/alarm ACK remains pending and never permits activation; a partially armed cleanup may still run independently. Never retry arming from saved DATA.

Plan binds entry/material/sourceRevision/tree/QA version/initialinstance/I0, exact uploaded candidate UUID/M bytes+hash/config hash, backup manifest/hash and baseline tuple, token IDs/expiry facts, cleanup-only original C0/C1. No raw script/secret/capability in plan or RPC; use existing bounded private backup chunks to recover exact baseline. New records strict own-data/no accessors/prototypes/unknown fields, ≤64KiB each; distinct keys and domain hashes.

## Native alarm ownership and restoration boundary

Export only the fixed alarm handler needed by finite.mjs, with actual ctx/env, no supplied clock/URL/token/pins/callback facts. It re-derives compiled source/actor/current QA metadata, captures/rechecks actual storage/env/fetch/credential holders, verifies loaded token IDs/status/original expiry through fixed endpoints, checks source ceiling and original plan time. Independent invocation clock is cleanup-only, not a renewed forward lease. Retain actual native/storage/fetch/body promises before racing them; abort/timer/disposal is not settlement.

Persist next bounded delivery/exhausted state BEFORE effects, never reset delivery count after restart. Default no initial plan returns null for delegation. Corrupt/pending/conflicting ownership returns bounded admin_pending; no arbitrary fallback to a different guard. Keep every old unknown outcome.

Use existing fixed all-AFW Workflow inventory helper with exact definitions/complete pagination and zero active instances for this alarm path; no whole-definition self exception. The alarm is not a Workflow. Verify own Container active inventory empty, canary/operator cron/tails empty, operator exact closed baseline, actual native read endpoints. These checks are factual, not universal drain. Preserve historical dispatch uncertainty; dated primary/source analysis in reports/2026-11-02-finite-historical-writer-qualification.es.md rules out the particular30Octguard restorePOST, not all writers. Current relevant writer/activation source checks remain mandatory.

Initial activation journal contract is owned by this initial family, in distinct immutable SEND/ACK/completion keys, NEVER the later connection/policy or nominal journals. This unit DEFINES and validates the recovery inputs but DOES NOT write a forward deployment SEND or implement activation. Future writer must bind the same plan/entry/material/candidate/body/annotation/original deadline and write completion only after its actual single request has settled and exact current readback is acknowledged. No caller success object or synthetic production writer.

- No activation SEND and exact fixed baseline still selected: record dated never_activated/closed observation only after original forward deadline and complete relevant inventory checks. This does not settle an issued unknown action.
- Existing SEND without definite settled actual ACK/completion, pending underlying forward work, missing or contradictory state: admin_pending/reconcile reads only, never fabricate completion or resend activation/restore. A later baseline snapshot alone cannot settle a possibly late initial activation POST.
- Exact own activation ACK/completion and primary pointer to THAT candidate UUID/deployment/annotation, with exact closed_ui config/M/allflagsfalse and no grants/notices/nominal handoff: eligible only for the precommitted fixed baseline restore after all gates. Foreign deployment or changed profile stops; no blind override/adoption.

Qualify actual baseline bytes/config against preserved backup, exact immutable pin and current deployable-version eligibility (GET by UUID alone is insufficient for last100 eligibility). No latest/dynamic baseline. Preserve exact secret descriptors/resource identities; no write of secret values or re-upload of baseline required.

Durable restore SEND once → actual sync/readback/current checks → one fixed POST /workers/scripts/agent-friendly-web-delegated-canary/deployments with baseline100% and deterministic annotation. Store actual server ACK UUID, exact primary post-readback, final receipt and sync. Any issued unknown restore is reconcile-only on later deliveries; no second POST, no deletion or overwrite of foreign pointer. Same original C1, parent≤30s/children≤5s. No transport helper may start a fresh45s clock. All outputs bounded/factual, operationalReadiness=false.

No business/grant/Container cleanup is claimed. Future enabling must first establish qualified handoff/extension to a cleanup owner that covers those effects; owner-source and stage writers remain unavailable. QA restoration remains the separately qualified external finalizer's responsibility; publisher057 may not edit QA. Do not claim autonomous total closure from this initial canary owner.

## Source qualification

Actual Worker→DO/native SQLite/D1 entry/A/upload/arm; persisted setAlarm/getAlarm ownership across native reconstruction; actual finite alarm override and nominal delegation/collision; strict records and exact serialized outbound restoration through native fixture. External provider/custody/source approval remain explicit SYN. If platform harness cannot cause genuine native alarm delivery within a bounded test, explicitly name manual fixture invocation/SYN event delivery rather than claiming a live native alarm.

Meaningful RED before implementation for actual missing arm/alarm behavior. Cover final-transaction retry/unknown return, held/rejected sync, lost getAlarm ACK, parent expiry, source/token/holder drift, preexisting alarm/HEAD, restart/deliveries, late pending activation/restore, no SEND versus orphan/foreign pointer, exact candidate/allfalse/backup/last100 mismatch, no literal secret/resource change, and same RPC privacy. Existing B1/B2a/historical/profile/nominal-guard relevant tests preserved. One exact final compiler/residency build for changed graph, canary≤2MiB/QA≤3MiB; no issuer/compiler/fs/esbuild in runtime graphs. HostedNode22/lock only, temporary qualifier no secrets/artifacts/deploy and excluded from integration.

Report exact revisions/tree/run/job/attempt/commands/results/actual-vs-SYN/limits/CAS/ref/all file readbacks, then STOP for fresh spec+quality review. No main/provider/livecommand/WorkflowCREATE/upload/deploy/grant/OAuth/role/token/cron/Max/mail/chat/automation action. No local source/dependencies/builds/temp/processes. operationalReadiness=false;completePackage=false;PCoff=false.
