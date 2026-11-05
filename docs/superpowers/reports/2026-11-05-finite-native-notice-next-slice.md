# Partial checkpoint — fixed GET ticket and private factual notice inventory

5 November 2026. **INCOMPLETE; owner requested stop and preservation for PC shutdown.** This closes only the current small checkpoint, not Task1 acceptance. No new unit, promotion, merge or runtime action is authorized by this report.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (1347578006, PUBLIC); ENVIRONMENT=GitHub source/credential-free Actions SYN; ORIGIN=GitHub App API; RESOURCE_TYPE=isolated source branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=bounded ten-path source task plus this report and temporary qualifier removal; ROLLBACK=own commits only, expected-head CAS, no foreign overwrite. No local clone, dependency install, build or test occurred.

## Revisions and preservation

- Execution BASE: `dc4edafc0b5e4ba440cd32a21dd3dd58024e811a`; BASE tree `91d023ce48bb2f5105140c788d3646c64c20bd4e`.
- Current codeHEAD: `2f2cbe4d2f9852d6717fcda59e23a5fc51fb9330`; code tree `4ed04ac1a74dc05b7e822f770c38d4ec6f9683d3`.
- Own checkpoints: RED1 `bab878c611006abf7a00a9b223bc478e203b7a38`; inventory + absent-GET scaffolds `b2069aba00535c60715b0f1fab4f4a4ca6520035`; schema grammar correction `2f2cbe4d2f9852d6717fcda59e23a5fc51fb9330`.
- reportHEAD and report tree mean the commit/tree containing this report and deleting the qualifier; their exact resulting IDs are returned in the root closing receipt. A report cannot embed its own commit hash.
- All three Actions jobs below are terminal. No rerun, cancellation, new dispatch, broad test, or runtime action was performed for this closure.
- The temporary `.github/workflows/afw-notice-get-qualification.yml` is removed in the report commit. Historical workflow content and evidence remain recoverable at the codeHEAD and run URLs.

## What is actually committed

Private observer now reads the accepted notice journal and exact seven-object monitoring schema, and queries tickets/events only for the original issuer UUID using fresh first-primary ALL reads. ALL requires success===true, an array and the cap; errors never become absent schema. Both snapshots include actual notice/schema/rows. The existing three-key reader and OAuth recheck reject own notice content.

This is **partial implementation, not fully qualified**. Only the two cases below were exercised. The three new GET modules are explicitly unavailable scaffolds, only for a causal RED. The new fixture opts in via `phase-context-sdk-token-notice-get`, installs the existing seven DDL definitions only in that SYN mode, and uses actual OAuth/SDK issuance and native D1/DO. No real schema was changed. The new test currently has two cases. No SDK/store/codec/journal production substitution was introduced.

| Path at codeHEAD | Blob |
| --- | --- |
| `lib/mcp-qa-finite-owner-notice-get-forward.mjs` | `fc1763e6aeb0f87674876a8a8fb2b8b6ce372f2e` |
| `lib/mcp-qa-finite-owner-notice-get-qa.mjs` | `e340887574b4cb34dbb4e5d44f08976ea923d6e7` |
| `lib/mcp-qa-finite-owner-notice-get-wire.mjs` | `a0a6c84f9ca61bc70db6e4f601eff5e54c934377` |
| `lib/mcp-qa-finite-owner-phase-context.mjs` | `ae95ceb6b262535d45b198bf70bb9cd021fc9f95` |
| `test/fixtures/finite-initial-entry-world.mjs` | `af29170068fe713a7a67a3ea20145636363f8bc8` |
| `test/fixtures/finite-owner-io-fanout.mjs` | `900172e1dd24662c354c0d3d48d4ed28a86c3a52` |
| `test/fixtures/finite-owner-notice-get.mjs` | `0ed6f9ac8b901596dc716fdbe2604d806369da83` |
| `test/fixtures/finite-owner-qa-sdk.mjs` | `53324ed7f04d126edf7240d4aa4cbc1ded19daf9` |
| `test/mcp-qa-finite-owner-notice-get-native.test.mjs` | `18201a9cbe0e20ec0f95a22cc366e53d50969873` |
| `test/mcp-qa-finite-owner-qa-sdk-native.test.mjs` | `fb645efe76fd007e64aed1c485ac98834ba7b729` |

Protected blobs at codeHEAD, unchanged from BASE:

- `lib/mcp-qa-finite-preparation-issuer-store.mjs`: `efc25b2af9c80b8eb27cffe219544e974002293e`.
- `lib/mcp-qa-finite-preparation-notice-journal.mjs`: `b9c15aba18e2442a0ed864b8afd5e86313c5e470`.
- `lib/mcp-qa-finite-preparation-notice-records.mjs`: `8c9386b27109cd056d3f70d91ab3cb6c6f40b4e9`.

The ordinary M source, SDK source, schema/config/hosts and source stubs remain outside the changed map. Existing accepted store4016c13d and journal2969a840 acceptance was reused; no 147-store/33-issuer/journal repetition was run.

## Primary evidence: all runs, including failed prerequisites

All attempts are attempt 1; checkout persisted credentials=false, contents permission=read, Ubuntu24.04, Node22.23.4, npm10.9.9. Each job used `npm ci --ignore-scripts --no-audit --no-fund`, max job15min. No product30s/5s clock was extended.

1. **Valid causal RED1.** HEAD `bab878c611006abf7a00a9b223bc478e203b7a38`; [run42078935862](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42078935862), [job127426529616](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42078935862/job/127426529616). Exact command:
   `node --test --test-name-pattern='^inventory own negative' test/mcp-qa-finite-owner-notice-get-native.test.mjs`.
   TAP tests1/pass0/fail1/cancel0/skip0, duration14124.220083ms. The file at that HEAD contained one case. Actual QA GET/POST emitted the original native grant; schema7/notice0/tickets0/events0 and original read_consent reader passed before adding a SYN negative unknown key under the own preconnection notice prefix. BASE reader ignored it: status undefined versus expected unavailable at line30. No bundle/fixture/deadline failure was called RED.

2. **Implementation/escaping defect, NOT valid RED2.** HEAD `b2069aba00535c60715b0f1fab4f4a4ca6520035`; [run42079302582](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42079302582), [job127427807189](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42079302582/job/127427807189). Exact command:
   `node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs`.
   TAP tests2/pass0/fail2/cancel0/skip0, duration9543.875255ms. Both stopped at initial reader3keys prerequisite (actual status unavailable); no absent-GET causal claim. Inspection found literal double-escaped whitespace/name regexes in the schema comparison. Corrected those lexical regexes in the next own commit; no clock, validator bypass or positive fake was added.

3. **Small corrected checkpoint: inventory GREEN + valid causal RED2.** HEAD `2f2cbe4d2f9852d6717fcda59e23a5fc51fb9330`; [run42079702545](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42079702545), [job127429219590](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42079702545/job/127429219590). Exact command:
   `node --test test/mcp-qa-finite-owner-notice-get-native.test.mjs`.
   TAP tests2/pass1/fail1/cancel0/skip0, duration19553.299179ms. Inventory own negative test PASS. Principal case reached actual QA code→actual M token exchange→actual MCP read_project_summary→actual D0.4 three-key/read_consent reader; preserved actual exchanged_at. Complete schema7 and empty own notice/ticket/event prerequisites passed. Missing GET scaffold then returned503 versus200, exact assertion: `fixed GET missing after actual prerequisites; tickets=0 journal=0`. This is the valid causal RED2. No GREEN GET exists.

## Compiler/cost facts and their limits

The actual QA/M harness compilers ran as part of these tests (ten compiler invocations total, no extra build just for hashes). Existing compatibility profiles were qa-sdk 2026-09-07/nodejs_compat/enable_request_signal and m-sdk with additional global_fetch_strictly_public. Captured existing compiler lines:

- RED1: D02 fixture QA compiler {"bytes":1706500,"sha256":"8c2ca7e1183d2fe3f8212566c2791256479d29110c0d3681d1d6200663da0d29","inputs":320}
- RED1: D02 fixture M compiler {"bytes":1671443,"sha256":"f0b31e17cb31207a010e7fee6bb8b52b69856d3d409916687539677bff3d939d","inputs":300}
- escaping defect: D02 fixture QA compiler {"bytes":1726758,"sha256":"1ced02bee9fdeb0823fb5cbc3cdc40370110d4127bfc8713c59daf55308db058","inputs":323}
- escaping defect: D02 fixture M compiler {"bytes":1672050,"sha256":"2a68ecbe12403a25a1eff003c05d76d1c7793b360d405407eb6cc422c2a6b0b2","inputs":301}
- escaping defect: D02 fixture QA compiler {"bytes":1726758,"sha256":"122f69611d53dbbc8e4c9211c1dd69617f0bf264ede44d01c255225932c4973d","inputs":323}
- escaping defect: D02 fixture M compiler {"bytes":1672050,"sha256":"2a68ecbe12403a25a1eff003c05d76d1c7793b360d405407eb6cc422c2a6b0b2","inputs":301}
- corrected checkpoint: D02 fixture QA compiler {"bytes":1726755,"sha256":"20fb455e1e6c53b89ac9d607719e6b6964fb217d6a6aadc34883f4c79edf8e8c","inputs":323}
- corrected checkpoint: D02 fixture M compiler {"bytes":1672050,"sha256":"2a68ecbe12403a25a1eff003c05d76d1c7793b360d405407eb6cc422c2a6b0b2","inputs":301}
- corrected checkpoint: D02 fixture QA compiler {"bytes":1726755,"sha256":"4e856b69be04d6774ed6ee361397fe06ecdff22135c337d8ccf8938deec8f7ad","inputs":323}
- corrected checkpoint: D02 fixture M compiler {"bytes":1672050,"sha256":"2a68ecbe12403a25a1eff003c05d76d1c7793b360d405407eb6cc422c2a6b0b2","inputs":301}

QA hashes can differ between harnesses because their explicit SYN material contains generated original timestamps/keys. Metafile input counts above are factual compiler observations, **not full graph/reachability acceptance**. Full actual metafile preservation, graph comparison, compiler input hashes, and new GET I/O metrics remain undone. No standard compiler was added; standard entrypoints are unchanged and phase remains unmounted.

No claim of total D1/DO/HTTP/body/cancel cost, new GET peak2, parent30s fit, child5s fit or retained work/drain acceptance is made. Old 98D1/112GET totals are not applied here. The inventory implementation introduces the planned journal list and schema/targeted ALL reads, but their aggregate metrics and sessions/order assertions have not yet been qualified. No50ms/allSDK/store/journal repeated checks were run.

## Checks not run and work to resume

The owner stopped work after the small checkpoint; Task1 is not DONE. Before resuming verify current branch/ref/tree against this report and current authorization; do not blindly replay a run.

- Implement and review fixed wire/forward/QA receiver and GET lexical state machine; preserve schema7 before reservation/SEND, actual SQL Promise/result until final whole-snapshot recheck, owned SEND references and separate journal append references.
- Convert the principal RED2 into a real GET GREEN, exact14-column ticket plus three journal rows, HTML disabled/noJS/form-action none, Strict cookie, all three human POST routes closed before journal/SQL, no mounting or ordinary fallback.
- Add remaining contract negatives/adversaries: absent/full-empty/partial/tampered schema; foreign history; grammar/Access/cookies/expiry; row/journal/correlation corruption; concurrent own continuation; real SQL pending/settled gates; unknown/lost ACK; snapshot drift; native5s queue/CLOSE; retained body/cancel/SQL work. Current foreign-prefix fixture method is present but not tested.
- Adapt I/O observers only through unique/restricted lexical markers; current planned GET draft adds a second OAuth-like handler and will make naive global marker matching ambiguous. No existing observer guards/scheduler/gates were changed.
- Run whole new native file, whole pure phase file, selected phase-native16/SDK-native6/D04token4 with actual TAP nonzero/count checks, and targeted ten-file lint. None of those regression groups or lint have run at this checkpoint. No assurance about those results is implied by the single inventory PASS.
- Preserve actual QA/M metafiles/hash/bytes/input reachability and measure all new I/O/cost/child-parent gates without enlarging30s/5s. Unexpected standard graph edge requires root scope ruling before broader checks.
- Root must inspect full BASE diff and obtain fresh independent spec/quality review before accepting this unit. No review has accepted the inventory implementation here.

Warnings preserved, not fixed: npm deprecated @esbuild-kit/esm-loader2.6.5 and core-utils3.3.2, eslint9.39.4 deprecation, setup punycode DEP0040, CIMD/compatibility warning in SYN QA, RPC stub disposal warning (RED1 and corrected checkpoint), checkout/setup-node Node20-to24 runner warning and git initial branch hint. No credential diagnosis follows from them. MinorD03 OAuth error precision, fanout cleanup and toolchain triage remain separate existing concerns.

## Authority and historical limits

SOURCE ONLY/UNMOUNTED. Existing provider/profile/history fixtures are explicitly SYN; actual cryptographic verification and native workerd/D1/DO/SDK/token/MCP calls above do not prove live Cloudflare operation or hosting fit. Source ceiling2026-11-03T02:59Z remains expired, no renewal/rearm. GET is preparation, not notice consent. No new consent, source notices, phase, NoticeLink, human POST, mount, alias, Entry, real DDL, OAuth/OTP/token/role, cron, Container, Max, main or merge.

Current native fact in the valid RED2 case: original issued/exchanged active grant; seven monitoring schema objects; own tickets0/events0/notice0 after missing GET. No ticket SEND/ACK exists. Unknown SQL/journal outcomes and retained work have not been newly exercised; do not reconstruct ACKs, cleanup rows, infer drain or retry from SELECT. Historical application grants were not deleted.

operationalReadiness=false; completePackage=false; PCoff=false. PC shutdown is the owner's convenience request, not an accepted PC-off operational trial.

## APPENDIX — BORRADOR NO VERIFICADO / NO EJECUTAR / NO FUENTE

The following serializable in-memory draft was preserved because the owner requested saving all work. **It was never applied to source, compiled, linted, tested or reviewed. It carries no authority and is not a runnable patch.** Resume from the committed causal RED2; review every line against the brief before considering these snippets. No source result or positive SQL producer was substituted in the committed tests.

Proposed extra imports and handler append for phase-context (the accepted committed inventory body is not duplicated):

```javascript
import {readFiniteOwnerNoticeGetMetadata,qualifyFiniteOwnerNoticeGetRequest} from './mcp-qa-finite-owner-notice-get-wire.mjs';
import {sealFinitePreparationNoticeRecord as noticeSeal} from './mcp-qa-finite-preparation-notice-records.mjs';

/** UNMOUNTED fixed GET. Only this invocation can retain its own SQL result. */
export async function handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},originalLease){
 let clock,onAbort;
 try{
  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async firstFailure=>{
   const received=readFiniteOwnerNoticeGetMetadata(request.headers);
   const issuerCapture=captureFinitePreparationIssuerContext({ctx,env});
   const alias=env.AFW_FINITE_OWNER_OAUTH_KV,methods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
   const db=env.RELEASE_DB,dbPrepare=db?.prepare,node=env.AFW_RELEASE_EVENTS_NODE,nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get};
   const self=env.AFW_INDEPENDENT_CLOSURE,selfGet=self?.get,metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
   const headers=request.headers,signal=request.signal,url=request.url,method=request.method,headerBytes=canonical([...headers]);
   if([...Object.values(methods),...Object.values(nodeMethods),dbPrepare,selfGet].some(v=>typeof v!=='function'))fail();
   let identity=null,activeChild=null;
   const holders=()=>{
    current(originalLease);issuerCapture.holders();
    if(env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.RELEASE_DB!==db||db.prepare!==dbPrepare||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(k=>node[k]!==nodeMethods[k])||env.AFW_INDEPENDENT_CLOSURE!==self||self.get!==selfGet||env.AFW_QA_VERSION!==metadata||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher||request.headers!==headers||request.signal!==signal||request.url!==url||request.method!==method||canonical([...headers])!==headerBytes)fail();
    if(identity&&Date.now()>=identity.expiresAt)fail();
   };
   clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);
   onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});
   const check=()=>{current(clock.lease);if(activeChild)current(activeChild);};
   const wait=async promise=>{check();const result=await clock.wait(retain(promise),activeChild??clock.lease);check();return result;};
   const bytes=await wait(finiteNativeBytes(request,check,firstFailure));check();
   const original=new Request(received.url,{method:received.method,headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});
   qualifyFiniteOwnerNoticeGetRequest(original,bytes);
   const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);
   if(context.source.phase!=='read_consent'||received.mVersionId!==context.source.currentPublication.versionId||!baseline.second.noticeRows.schema)fail();
   const expected=structuredClone(baseline.second),source=context.source,id=context.preconnectionId;
   const capsule=expected.anchor.anchors.capsule,prep=expected.preparation;
   clock.narrow(Math.min(capsule.C0,prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,prep.approval.expiresAt));
   const verified=await wait(verifyCloudflareAccessJwtWithExpiry({token:original.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
   if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);
   const rawCookies=(original.headers.get('Cookie')??'').split(';').map(s=>s.trim()),cookie=rawCookies.filter(s=>s.startsWith('__Host-afw-finite-prepare='));
   if(cookie.length!==1||!/^__Host-afw-finite-prepare=[a-f0-9]{64}$/.test(cookie[0])||sha(cookie[0].slice('__Host-afw-finite-prepare='.length))!==prep.ticket.ticketHash)fail();
   const realm=evidence('realm',{...source.access,origin:source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:identity.subject});
   qualifyFiniteOwnerApprovedTicket({source,identity,currentTicket:prep.ticket,ticket:prep.ticket,use:prep.ticketUse,pre:prep.preconnection,approval:prep.approval,snapshot:prep.sourceSnapshot,realm,subjectHash,observedAt:Date.now()});
   if(identity.subject!==expected.anchor.anchors.material.ownerSelection.subject||identity.subject!==expected.records.issuer.reservation?.identity.subject)fail();
   const issuer=expected.records.issuer,rows=expected.issuerRows,i=issuer.reservation?.identity;
   if(!i||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection||issuer.operations.grant.ack?.outcome!=='applied')fail();
   const sdkPrefix='afw.finite-owner-issuer-provenance.v1:'+id+':';
   const sdkNames=new Set(expected.records.sdk.map(([key])=>key));
   if(!['root','grant','sdk_begin:observed','sdk_approve:observed','sdk_complete:observed'].every(k=>sdkNames.has(sdkPrefix+k)))fail();
   if(rawCookies.some(v=>v.startsWith('__Host-afw-monitoring-owner=')))fail();
   const accessExpiresAt=Math.min(identity.expiresAt,prep.preconnection.owner.accessExpiresAt,i.C0),preconnectionExpiresAt=prep.preconnection.expiresAt;
   const permissionCeiling=Math.min(accessExpiresAt,preconnectionExpiresAt,prep.approval.expiresAt,rows.connection.expiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(rows.grant.expires_at));
   clock.narrow(permissionCeiling);
   const at=Date.now(),handle=randomBytes(32).toString('base64url'),expiresAt=Math.min(at+600000,permissionCeiling);
   if(expiresAt<=at)fail();
   const ticket={handleHash:sha(handle),requestId:crypto.randomUUID(),expectedSequence:0,issuedAt:at,expiresAt,permissionExpiresAt:expiresAt};
   const expectedGrant={scopes:JSON.parse(rows.grant.scopes_json),createdAt:rows.grant.created_at,expiresAt:rows.grant.expires_at},consumedAt=rows.consent.consumed_at;
   const journal=noticeJournal({ctx,env}),store=createFinitePreparationIssuerStore({ctx,env});
   let position='baseline',operation=null,actualPromise=null,actualResult=null,settled=false,ownedReservation=null,ownedSend=null;
   const anchor=()=>{expected.anchor.notice=structuredClone(expected.records.notice);};
   async function recheckNoticeGetOwned(){
    check();
    if(actualPromise&&!settled)fail();
    for(const v of Object.values(expected.records.issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
    const names=new Set(expected.records.sdk.map(([key])=>key));
    for(const [key]of expected.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
    const n=expected.records.notice;
    if(n.freeze||n.operations.consent.send||n.operations.consent.ack)fail();
    if(position==='baseline'){requireEmptyNotice(expected);if(ownedReservation||ownedSend||operation)fail();}
    else{
     if(!ownedReservation||canonical(n.reservation)!==canonical(ownedReservation))fail();
     if(position!=='reservation-recorded'){
      if(operation!=='ticket'||!ownedSend||canonical(n.operations.ticket.send)!==canonical(ownedSend)||ownedSend.reservationHash!==ownedReservation.recordHash)fail();
      if(['ticket-sql-resolved','ticket-ack-recorded'].includes(position)&&(!actualPromise||!settled||actualResult?.status!=='applied'||canonical(actualResult.row)!==canonical(expectedNoticeTicket(i,ticket))))fail();
     }
    }
    const pair=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
    if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();
    check();
   }
   await recheckNoticeGetOwned();
   await clock.child((l)=>retain((async()=>{
    activeChild=l;check();
    const record=noticeSeal('Reservation',{purpose:'afw.finite-preparation-notice-reservation.v1',identity:i,issuerReservationHash:issuer.reservation.recordHash,originalGrantAckHash:issuer.operations.grant.ack.recordHash,grantLinkHash:prepHash('GrantLink',rows.grantLink),connectionHash:prepHash('ConnectionRef',rows.connection),expectedGrant,consumedAt,accessExpiresAt,preconnectionExpiresAt,ticket,issuedAt:Date.now()});
    const appendPromise=retain(journal.appendReservation(record,l)),appendResult=await wait(appendPromise);
    if(appendResult?.status!=='recorded'||appendResult.recordHash!==record.recordHash)fail();
    ownedReservation=record;expected.records.notice.reservation=structuredClone(record);anchor();position='reservation-recorded';
    await recheckNoticeGetOwned();activeChild=null;
   })()));
   await clock.child((l,deadline)=>retain((async()=>{
    activeChild=l;check();
    const window={startedAt:Date.now(),deadline:Math.min(deadline,permissionCeiling)};
    const common={identity:i,expectedGrant,consumedAt,accessExpiresAt,preconnectionExpiresAt,window};
    const send=noticeSeal('Send',{purpose:'afw.finite-preparation-notice-send.v1',identityHash:i.identityHash,reservationHash:ownedReservation.recordHash,operation:'ticket',requestHash:digest('afw.finite-preparation-notice-request.v1',{operation:'ticket',common,ticket,decisionHash:null}),accessExpiresAt,window,issuedAt:Date.now(),decisionHash:null});
    const appendSendPromise=retain(journal.appendSend({preconnectionId:id,record:send},l)),appendSendResult=await wait(appendSendPromise);
    if(appendSendResult?.status!=='recorded'||appendSendResult.recordHash!==send.recordHash)fail();
    ownedSend=send;operation='ticket';expected.records.notice.operations.ticket.send=structuredClone(send);anchor();position='ticket-send-recorded';await recheckNoticeGetOwned();check();
    position='ticket-sql-pending';settled=false;
    actualPromise=retain(store.insertMonitoringTicket({...common,ticket},l));
    actualResult=await wait(actualPromise);settled=true;
    if(actualResult?.status!=='applied'||canonical(actualResult.row)!==canonical(expectedNoticeTicket(i,ticket)))fail();
    expected.noticeRows.tickets=[structuredClone(actualResult.row)];position='ticket-sql-resolved';await recheckNoticeGetOwned();check();
    const ack=noticeSeal('Ack',{purpose:'afw.finite-preparation-notice-ack.v1',sendHash:ownedSend.recordHash,outcome:'applied',rowHash:digest('afw.finite-preparation-notice-row.v1',actualResult.row),sequence:null,observedAt:Date.now()});
    const appendAckPromise=retain(journal.appendAck({preconnectionId:id,operation:'ticket',record:ack},l)),appendAckResult=await wait(appendAckPromise);
    if(appendAckResult?.status!=='recorded'||appendAckResult.recordHash!==ack.recordHash)fail();
    expected.records.notice.operations.ticket.ack=structuredClone(ack);anchor();position='ticket-ack-recorded';await recheckNoticeGetOwned();activeChild=null;
   })()));
   check();
   const maxAge=Math.floor((ticket.expiresAt-Date.now())/1000);if(maxAge<1)fail();
   const escaped=handle.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),nonce=randomBytes(18).toString('base64url');
   const html='<!doctype html><html lang="es"><meta charset="utf-8"><title>Preparación de avisos</title><body><h1>Preparación de avisos</h1><p>Preparé un formulario temporal. Todavía no diste permiso para avisos. El envío de este formulario aún no está habilitado.</p><form><input type="hidden" name="handle" value="'+escaped+'"><button type="button" disabled>Permitir avisos temporales</button></form><a href="https://agentfriendlyweb.dev/expediente">Volver al expediente</a></body></html>';
   check();return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=UTF-8','Cache-Control':'no-store','Referrer-Policy':'same-origin','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; script-src 'nonce-"+nonce+"'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",'Set-Cookie':'__Host-afw-monitoring-owner='+handle+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age='+maxAge}});
  }));
 }catch{return pending();}finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
}

```

Draft replacement for `lib/mcp-qa-finite-owner-notice-get-wire.mjs` — NOT APPLIED:

```javascript
import {finiteNativeOrigin as origin,finiteNativeHeaders,finiteNativeUuid,finiteNativeFailure as fail} from './mcp-qa-finite-owner-native-wire.mjs';
export const finiteOwnerNoticeGetTarget='https://afw-private.invalid/_finite-owner/monitoring';
const max=16384;
export function qualifyFiniteOwnerNoticeGetRequest(request,bytes){
 if(!(request instanceof Request)||!(bytes instanceof Uint8Array)||bytes.length||request.url.length>max)fail(400);
 if(request.url!==origin+'/monitoring')fail(404);
 if(request.method!=='GET')fail(405);
 const from=request.headers.get('Origin');if(from!==null&&from!==origin)fail(403);
 const cookie=request.headers.get('Cookie')??'',assertion=request.headers.get('Cf-Access-Jwt-Assertion')??'';
 if(cookie.length>8192||assertion.length>8192||/[\r\n]/.test(cookie+assertion))fail(400);
 const names=new Set();for(const part of cookie.split(';').filter(x=>x.trim())){const match=/^\s*([^=\s]+)=([^;\s]*)\s*$/.exec(part);if(!match||names.has(match[1]))fail(400);names.add(match[1]);}
 return Object.freeze({method:'GET',url:request.url});
}
export function readFiniteOwnerNoticeGetMetadata(headers){
 const entries=[...headers].filter(([key])=>key.startsWith('x-afw-finite-'));
 if(entries.length!==finiteNativeHeaders.length||entries.some(([key])=>!finiteNativeHeaders.includes(key))||Buffer.byteLength(JSON.stringify(entries))>max)fail(400);
 const raw=headers.get('x-afw-finite-boundary');let boundary;try{boundary=JSON.parse(raw);}catch{fail(400);}
 if(!boundary||!['startedAt','deadline','remainingMs'].every(k=>Number.isSafeInteger(boundary[k]))||JSON.stringify({startedAt:boundary.startedAt,deadline:boundary.deadline,remainingMs:boundary.remainingMs})!==raw)fail(400);
 const method=headers.get('x-afw-finite-original-method'),url=headers.get('x-afw-finite-original-url'),mVersionId=headers.get('x-afw-finite-version'),requestId=headers.get('x-afw-finite-request-id');
 if(method!=='GET'||url!==origin+'/monitoring'||!finiteNativeUuid(mVersionId)||!finiteNativeUuid(requestId))fail(400);
 return Object.freeze({boundary,method:'GET',url,mVersionId,requestId});
}
```

Draft replacement for `lib/mcp-qa-finite-owner-notice-get-forward.mjs` — NOT APPLIED:

```javascript
import {readFiniteOwnerRequestContext,readFiniteOwnerRequestBoundary} from './mcp-qa-finite-owner-preparation.mjs';
import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
import {finiteNativeFailure as fail,finiteNativeUuid} from './mcp-qa-finite-owner-native-wire.mjs';
import {finiteNativeActor,finiteNativePreservedHeaders,finiteNativeOperation,finiteNativeBytes,finiteNativePending as pending} from './mcp-qa-finite-owner-native-wire.mjs';
import {finiteOwnerNoticeGetTarget,qualifyFiniteOwnerNoticeGetRequest,readFiniteOwnerNoticeGetMetadata} from './mcp-qa-finite-owner-notice-get-wire.mjs';
/** Unmounted forwarding only. Transport metadata never asserts SDK results. */
export async function forwardPrivateFiniteOwnerNoticeGet({request,env,ctx},originalLease){
 try{
  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
  const namespace=env?.AFW_FINITE_TRIAL_CONTROL,idFromName=namespace?.idFromName,get=namespace?.get,metadata=env?.AFW_FINITE_TRIAL_VERSION,version=metadata?.id;
  if([idFromName,get].some(v=>typeof v!=='function')||!finiteNativeUuid(version))fail();
  const id=Reflect.apply(idFromName,namespace,[finiteNativeActor]),actor=id.toString(),stub=Reflect.apply(get,namespace,[id]),fetcher=stub?.fetch;
  if(!/^[a-f0-9]{64}$/.test(actor)||typeof fetcher!=='function')fail();
  const check=()=>{originalLease.assertCurrent();if(env.AFW_FINITE_TRIAL_CONTROL!==namespace||namespace.idFromName!==idFromName||namespace.get!==get||Reflect.apply(idFromName,namespace,[finiteNativeActor]).toString()!==actor||stub.fetch!==fetcher||env.AFW_FINITE_TRIAL_VERSION!==metadata||metadata.id!==version)fail();};
  check();
  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async first=>{
   const bytes=await finiteNativeBytes(request,check,first);check();qualifyFiniteOwnerNoticeGetRequest(request,bytes);
   const headers=new Headers();for(const name of finiteNativePreservedHeaders){const value=request.headers.get(name);if(value!==null)headers.set(name,value);}
   headers.set('x-afw-finite-boundary',JSON.stringify(readFiniteOwnerRequestBoundary(originalLease)));
   headers.set('x-afw-finite-original-method',request.method);headers.set('x-afw-finite-original-url',request.url);
   headers.set('x-afw-finite-version',version);headers.set('x-afw-finite-request-id',crypto.randomUUID());
   readFiniteOwnerNoticeGetMetadata(headers);check();
   const response=await Reflect.apply(fetcher,stub,[new Request(finiteOwnerNoticeGetTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]);check();
   const body=await finiteNativeBytes(response,check,first,503);check();
   if(response.status!==200)return pending([400,401,403,404,405,413,429].includes(response.status)?response.status:503);
   if(!/^text\/html(?:;|$)/i.test(response.headers.get('content-type')??''))fail();
   const output=new Headers({'Cache-Control':'no-store'});
   for(const [key,value]of response.headers){if(!['content-type','content-security-policy','referrer-policy','location','set-cookie','cache-control','x-frame-options','x-content-type-options'].includes(key)||value.length>8192)fail();output.append(key,value);}
   check();return new Response(body,{status:response.status,headers:output});
  }));
 }catch{return pending();}
}
```

Draft replacement for `lib/mcp-qa-finite-owner-notice-get-qa.mjs` — NOT APPLIED:

```javascript
import {finiteNativePending as pending} from './mcp-qa-finite-owner-native-wire.mjs';
import {createFiniteOwnerForwardedRequestLease} from './mcp-qa-finite-owner-preparation.mjs';
import {finiteOwnerNoticeGetTarget,readFiniteOwnerNoticeGetMetadata} from './mcp-qa-finite-owner-notice-get-wire.mjs';
import {handlePrivateQaFiniteOwnerNoticeGet} from './mcp-qa-finite-owner-phase-context.mjs';
export function createPrivateQaFiniteOwnerNoticeGetReceiver({ctx,env}){
 return Object.freeze({async fetch(request){
  let parent;
  try{
   if(!(request instanceof Request)||request.url!==finiteOwnerNoticeGetTarget)return pending(404);
   if(request.method!=='POST')return pending(405);
   const metadata=readFiniteOwnerNoticeGetMetadata(request.headers);
   parent=createFiniteOwnerForwardedRequestLease(request,metadata.boundary);
   return await handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},parent.lease);
  }catch{return pending();}finally{parent?.finish();}
 }});
}
```

