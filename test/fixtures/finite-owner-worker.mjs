import * as ownerPreparation from '../../lib/mcp-qa-finite-owner-preparation.mjs';
import {createDelegatedOAuthStore} from '../../lib/delegated-oauth-store.mjs';
import {recordDossierMonitoringConsent} from '../../lib/dossier-monitoring-authority.mjs';
import {DurableObject} from 'cloudflare:workers';
import {createFiniteOwnerComponentHost} from './finite-owner-component-host.mjs';
import * as stageWork from '../../lib/mcp-qa-finite-stage-work.mjs';
import {createFiniteOwnerPreparationHost} from '../../lib/mcp-qa-finite-owner-http.mjs';
import {createFiniteOwnerPreparationStore} from '../../lib/mcp-qa-finite-preparation-store.mjs';
import {createFiniteOwnerRequestLease,readFiniteOwnerPreparation,recordFinitePreparationGrant,recordFinitePreparationNotice,recordFinitePreparationAuthorization} from '../../lib/mcp-qa-finite-owner-preparation.mjs';
const origin='https://delegated-canary.agentfriendlyweb.dev';
const H='a'.repeat(64),M='b'.repeat(40),U='11111111-1111-4111-8111-111111111111';
export class FiniteOwnerFixture extends DurableObject{
 async fetch(request){
  const path=new URL(request.url).pathname;

  if(path==='/fixture/pending-host')return createFiniteOwnerPreparationHost({ctx:this.ctx,env:this.env}).fetch(new Request(origin+'/connections/finite-prepare',{method:request.method==='POST'?'POST':'GET',headers:request.headers,body:request.method==='POST'?'decision=approve':undefined}));
  if(path==='/fixture/request-state')return Response.json({held:!!this.requestGate?.held,cancelHeld:!!this.requestGate?.cancelHeld,settled:!!this.requestGate?.settled,denied:this.requestGate?.denied??null});
  if(path==='/fixture/request-release'){this.requestGate?.release?.();return Response.json({released:true});}
  if(path==='/fixture/request-probe'){
   const p=createFiniteOwnerRequestLease(request),ctx=this.requestCtx??this.ctx;
   const probe=fn=>{try{return fn(),true;}catch{return false;}};
   const observer=stageWork.observeFiniteOwnerRequestWork;
   const admission={lease:p.lease};
   let requestAllowed=false,readAllowed=false,ownerAllowed=false;
   try{requestAllowed=await observer({ctx,env:this.env,originalLease:p.lease},async()=>true);}catch{}
   try{readAllowed=await stageWork.observeFiniteReadOnlyWork({ctx,env:this.env,originalLease:p.lease},async()=>true);}catch{}
   try{ownerAllowed=await stageWork.observeFiniteOwnerStageWork({ctx,env:this.env,originalLease:p.lease,admission},async()=>true);}catch{}
   p.finish();return Response.json({requestAllowed,readAllowed,ownerAllowed,continueAllowed:probe(()=>stageWork.continueFiniteOwnerStageWork({ctx,env:this.env,originalLease:p.lease},async()=>true))});
  }
  if(path==='/fixture/request-prepare'){
   const input=await request.json(),actual=this.ctx.storage,gate={held:false,cancelHeld:false,settled:false};this.requestGate=gate;
   const wait=()=>new Promise(resolve=>{gate.held=true;gate.release=()=>{gate.settled=true;resolve();};});
   const storage={get:async(...a)=>{const v=await actual.get(...a);if(input.mode==='source'&&!gate.held&&a[0]==='fixture:source')await wait();return v;},put:(...a)=>actual.put(...a),transaction:async fn=>{
    if(input.mode==='ticket'||input.mode==='approval'){
     let target=false;const wrapped=tx=>fn({get:(...a)=>tx.get(...a),put:(key,...a)=>{if(input.mode==='ticket'?key.startsWith('owner-ticket:')&&!key.endsWith(':use'):key.startsWith('connection-approval:'))target=true;return tx.put(key,...a);}});
     const v=await actual.transaction(wrapped);if(target&&!gate.held)await wait();return v;
    }return actual.transaction(fn);
   }};
   const ctx={id:this.ctx.id,storage,requestLineage:[]};this.requestCtx=ctx;
   let body=input.body;
   if(input.mode==='body')body=new ReadableStream({pull(controller){return new Promise(resolve=>{gate.held=true;gate.release=()=>{controller.enqueue(new Uint8Array([104]));resolve();};});},cancel(){gate.cancelHeld=true;return new Promise(resolve=>{gate.release=()=>{gate.settled=true;resolve();};});}});
   if(input.mode==='oversize')body=new ReadableStream({start(controller){controller.enqueue(new Uint8Array(1025));},cancel(){gate.cancelHeld=true;return new Promise(resolve=>{gate.release=()=>{gate.settled=true;resolve();};});}});
   const original=new Request(origin+'/connections/finite-prepare',{method:input.method??'GET',headers:input.headers,body}),parent=createFiniteOwnerRequestLease(original);ctx.requestRoot=parent.lease;
   const observer=stageWork.observeFiniteOwnerRequestWork;
   try{return await observer({ctx,env:this.env,originalLease:parent.lease},async()=>{try{return Response.json({result:await ownerPreparation.prepareFiniteOwnerChoice({ctx,env:this.env,request:original},parent.lease),lineage:ctx.requestLineage});}catch(e){gate.denied=true;return Response.json({rejected:true,status:e.status??503});}finally{parent.finish();}});}
   finally{parent.finish();}
  }

  if(path==='/fixture/admission'){
   const input=await request.json(),original=new Request(input.url,{method:'POST',headers:input.headers,body:input.body}),parent=ownerPreparation.createFiniteOwnerRequestLease(original);
   let result,first=false,second=false,wrong=false,expired=false,qualified=false,deadlineBound=false,cloneDenied=false,finishedDenied=false;
   try{const end=ownerPreparation.readFiniteOwnerRequestDeadline(parent.lease);deadlineBound=Number.isSafeInteger(end)&&end>Date.now()&&end<=Date.now()+30000;}catch{}
   try{ownerPreparation.readFiniteOwnerRequestDeadline({...parent.lease});}catch{cloneDenied=true;}
   try{
    result=await ownerPreparation.prepareFiniteOwnerChoice({ctx:this.ctx,env:this.env,request:original},parent.lease);
    const refs={ctx:this.ctx,env:this.env,preconnectionId:result.preconnectionId,stage:result.stage};
    if(input.finish)parent.finish();
    if(input.wrong)try{ownerPreparation.consumeFiniteOwnerStageAdmission({...refs,preconnectionId:'e'.repeat(64)},parent.lease);wrong=true;}catch{}
    try{const admission=ownerPreparation.consumeFiniteOwnerStageAdmission(refs,parent.lease);admission.lease.assertCurrent();first=true;qualified=Object.isFrozen(admission)&&admission.ownerSource.actorId===this.ctx.id.toString()&&/^[a-f0-9]{64}$/.test(admission.stageApprovalHash);}catch{}
    try{ownerPreparation.consumeFiniteOwnerStageAdmission(refs,parent.lease);second=true;}catch{}
    parent.finish();
    expired=parent.lease.signal.aborted;
    try{ownerPreparation.readFiniteOwnerRequestDeadline(parent.lease);}catch{finishedDenied=true;}
    return Response.json({prepared:result.status===202,first,second,wrong,expired,qualified,deadlineBound,cloneDenied,finishedDenied});
   }catch{return Response.json({rejected:true});}finally{parent.finish();}
  }
  if(path==='/fixture/init'){
   const at=Date.now(),source={sourceRevision:M,actorId:this.ctx.id.toString(),qaNamespaceId:'c'.repeat(32),qaVersionId:U,origin,phase:'closed_ui',access:{teamDomain:'finite-fixture.cloudflareaccess.com',audience:'finite-owner'},clientId:'synthetic-client',resource:origin+'/mcp',project:{projectId:'synthetic-owned',revision:1,synthetic:true},goal:'discovery',programContext:{programHash:H,sourceRevision:'d'.repeat(40),originalContextHash:H},initialBaseline:{versionId:U,deploymentId:U,moduleHash:H,configurationHash:H,bindingsHash:H},currentPublication:{stage:null,versionId:U,deploymentId:U,receiptHash:null},window:{startedAt:at-100,expiresAt:at+899000}};
   await this.ctx.storage.put('fixture:source',source);
   return Response.json({initialized:true});
  }
  if(path==='/fixture/delay'){await this.ctx.storage.put('fixture:delay',{...await request.json(),calls:0,fired:false});return Response.json({configured:true});}
  if(path==='/fixture/delay-state')return Response.json(await this.ctx.storage.get('fixture:delay'));
  if(path==='/fixture/source'){
   const source=await this.ctx.storage.get('fixture:source'),changes=await request.json();
   await this.ctx.storage.put('fixture:source',{...source,...changes});return Response.json({changed:true});
  }
  if(path==='/fixture/rows'){
   const rows=[...await this.ctx.storage.list()].filter(([k])=>!k.startsWith('fixture:'));
   return Response.json(rows);
  }
  if(path==='/fixture/store'){
   const {method,arg,loseAck}=await request.json(),actual=this.ctx.storage,storage=loseAck?{get:(...a)=>actual.get(...a),transaction:async fn=>{await actual.transaction(fn);throw Error('synthetic lost pair ACK');}}:actual,store=createFiniteOwnerPreparationStore({storage,now:Date.now}),lease={signal:new AbortController().signal,assertCurrent(){}};
   try{return Response.json({result:await store[method](arg,lease)});}catch{return Response.json({rejected:true});}
  }
  if(path==='/fixture/read'){
   const input=await request.json();try{return Response.json({result:await readFiniteOwnerPreparation({ctx:this.ctx,env:this.env,...input,signal:request.signal})});}catch{return Response.json({rejected:true});}
  }
  if(path==='/fixture/monitoring'){
   const input=await request.json(),now=Date.now();
   return Response.json(await recordDossierMonitoringConsent({db:this.env.RELEASE_DB,subject:'owner',grantId:'accepted-grant',projectId:'synthetic-owned',expectedRevision:1,expectedSequence:input.expectedSequence,requestId:input.requestId,action:input.action,now,expiresAt:input.expiresAt,expectedClientId:'synthetic-client',expectedResource:origin+'/mcp'}));
  }
  if(path==='/fixture/held-child'){
   const parent=createFiniteOwnerRequestLease(request);
   try{
    const {mode,authorizationHash,secondHash,url,headers}=await request.json(),actual=this.ctx.storage;
    let releaseFirst,releaseSecond,secondEnteredResolve,firstSettledResolve,firstCommitted=false,transactions=0;
    const firstGate=new Promise(resolve=>{releaseFirst=resolve;}),secondGate=new Promise(resolve=>{releaseSecond=resolve;});
    const secondEntered=new Promise(resolve=>{secondEnteredResolve=resolve;}),firstSettled=new Promise(resolve=>{firstSettledResolve=resolve;});
    const storage={get:(...a)=>actual.get(...a),put:(...a)=>actual.put(...a),transaction:async fn=>{
     const number=++transactions;
     if(number===1){
      try{
       if(mode==='before')await firstGate;
       const result=await actual.transaction(fn);firstCommitted=true;
       if(mode==='after')await firstGate;
       return result;
      }finally{firstSettledResolve();}
     }
     if(number===2){secondEnteredResolve();await secondGate;}
     return actual.transaction(fn);
    }};
    const ctx={id:this.ctx.id,storage},original=()=>new Request(url,{headers});
    let hookRejected=false;
    try{await recordFinitePreparationAuthorization({ctx,env:this.env,request:original(),authorizationHash},parent.lease);}catch{hookRejected=true;}
    parent.lease.assertCurrent();
    const now=new Date().toISOString(),grantStore=createDelegatedOAuthStore(this.env.RELEASE_DB.withSession('first-primary'));
    const consumed=await grantStore.consumeConsent(authorizationHash,'owner','authorize',now);
    await grantStore.createGrant({grantId:'held-child-grant',subject:'owner',clientId:'synthetic-client',projectId:'synthetic-owned',resource:origin+'/mcp',scopes:['afw:project:read'],createdAt:now,expiresAt:new Date(Date.now()+300000).toISOString()});
    // A later child of the SAME still-live parent remains outstanding while the
    // first one resumes; mutable shared current-child aliases must not revive it.
    const second=recordFinitePreparationAuthorization({ctx,env:this.env,request:original(),authorizationHash:secondHash},parent.lease).then(r=>({result:r}),()=>({rejected:true}));
    await secondEntered;await new Promise(resolve=>setTimeout(resolve,1000));
    parent.lease.assertCurrent();const committedBeforeRelease=firstCommitted;
    releaseFirst();await firstSettled;
    releaseSecond();const secondResult=await second;
    parent.lease.assertCurrent();
    const first=await actual.get('connection-authorization:'+authorizationHash),other=await actual.get('connection-authorization:'+secondHash);
    const grant=await createDelegatedOAuthStore(this.env.RELEASE_DB.withSession('first-primary')).getGrant('held-child-grant');
    return Response.json({hookRejected,transactions,parentAlive:true,committedBeforeRelease,firstPresent:first!==undefined,secondPresent:other!==undefined,secondStatus:secondResult.result?.status,consumed:!!consumed,grantActive:grant?.status==='active'&&!grant.revokedAt});
   }finally{parent.finish();}
  }
  if(path==='/fixture/link'){
   const {kind,grantId,requestId,sequence,authorizationHash,url,headers,body,expired}=await request.json();
   const original=new Request(url,{method:body?'POST':'GET',headers,body:body||undefined});
   const lease={signal:new AbortController().signal,assertCurrent(){if(expired)throw Error('expired original parent');}};
   try{const op={grant:recordFinitePreparationGrant,notice:recordFinitePreparationNotice,authorization:recordFinitePreparationAuthorization}[kind];
    return Response.json({result:await op({ctx:this.ctx,env:this.env,request:original,...(kind==='grant'?{grantId}:kind==='notice'?{requestId,sequence}:{authorizationHash})},lease)});
   }catch{return Response.json({rejected:true});}
  }
  let ctx=this.ctx;
  if(request.headers.get('X-Fixture-Lose-Ack')==='true'){
   const actual=this.ctx.storage;let lost=false;
   const storage={get:(...a)=>actual.get(...a),transaction:async fn=>{const result=await actual.transaction(fn);if(!lost){lost=true;throw Error('synthetic lost native transaction acknowledgement');}return result;}};
   ctx={id:this.ctx.id,storage};
  }
  return createFiniteOwnerComponentHost({ctx,env:this.env}).fetch(request);
 }
}
const worker={fetch(request,env){
 const name=request.headers.get('X-Fixture-Actor')||'owner';
 return env.FIXTURE.get(env.FIXTURE.idFromName(name)).fetch(request);
}};

export default worker;
