import {readFiniteQaBootstrapSourceExpectations} from './mcp-qa-finite-bootstrap-source.mjs';
import {readPrivateQaFiniteCandidate} from './mcp-qa-finite-candidate-residency.mjs';
import {createPrivateQaFiniteInitialMaterial} from './mcp-qa-finite-initial-material.mjs';
import {initialFields as fields,initialOwn as own,initialCanonical as canonical,initialHash as hash,initialHex as hex,initialInstanceId} from './mcp-qa-finite-initial-material-records.mjs';
import {hashFiniteInitialEntry,encodeFiniteInitialEntry,decodeFiniteInitialEntry} from './mcp-qa-finite-initial-entry-records.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {finiteQaPointer} from './mcp-qa-finite-publication.mjs';
const GH='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web',CF='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec';
const CEILING=Date.parse('2026-11-03T02:59:00Z'),KEY='afw.finite-initial-preparation.v1:entry',SLOT='afw-own-successor-closure-v1',WORKFLOW='afw-own-qa-private-bootstrap';
const fail=()=>{throw Error('Finite initial entry unavailable');},pending=()=>Object.freeze({status:'admin_pending',mayRetry:false,operationalReadiness:false});
const nativeTime=Date.prototype.getTime,refKeys=['commandId','sourceRevision','qaVersionId','initialInstanceId','workflowName','createdAt'];
const current=l=>{l.assertCurrent();if(l.signal.aborted)fail();};
/** Original absolute lifetime, independent pending-promise retention; no capability. */
function clock(deadline,holders){
 const entered=Date.now(),mono=performance.now(),controller=new AbortController(),pendingWork=new Set();
 let end=Math.min(deadline,CEILING),last=entered,lastMono=mono,closed=false,timer;
 const stop=()=>controller.abort();
 const check=()=>{holders();const at=Date.now(),m=performance.now();if(closed||controller.signal.aborted||!Number.isSafeInteger(at)||at<last||at>=end||!Number.isFinite(m)||m<lastMono||m-mono>=end-entered)fail();last=at;lastMono=m;return at;};
 const lease=Object.freeze({signal:controller.signal,assertCurrent:check});
 const retain=p=>{pendingWork.add(p);const settled=()=>pendingWork.delete(p);p.then(settled,settled);return p;};
 const narrow=until=>{check();if(!Number.isSafeInteger(until))fail();end=Math.min(end,until);clearTimeout(timer);check();timer=setTimeout(stop,Math.max(1,end-Date.now()));};
 const wait=async(p,l=lease)=>{let abort;try{return await Promise.race([retain(p),new Promise((_,reject)=>{abort=()=>reject(Error('Finite initial expired'));l.signal.addEventListener('abort',abort,{once:true});if(l.signal.aborted)abort();})]).then(v=>{current(l);return v;});}finally{l.signal.removeEventListener('abort',abort);}};
 const child=async work=>{
  check();const began=Date.now(),m0=performance.now(),until=Math.min(end,began+5000),c=new AbortController();let alive=true,t;
  const abort=()=>c.abort();controller.signal.addEventListener('abort',abort,{once:true});t=setTimeout(abort,Math.max(1,until-Date.now()));
  const l=Object.freeze({signal:c.signal,assertCurrent(){check();if(!alive||c.signal.aborted||Date.now()>=until||performance.now()-m0>=until-began)fail();}});
  const actual=retain(Promise.resolve().then(()=>{current(l);return work(l);}));
  try{return await wait(actual,l);}finally{alive=false;clearTimeout(t);controller.signal.removeEventListener('abort',abort);c.abort();}
 };
 narrow(end);return{lease,child,wait,narrow,close(){closed=true;clearTimeout(timer);stop();}};
}
function refs(value){const r=own(fields(value,refKeys));if(r.initialInstanceId!==initialInstanceId(r)||r.workflowName!==WORKFLOW||!Number.isSafeInteger(r.createdAt)||r.createdAt<0||r.createdAt>Date.now())fail();return r;}
function safe(value,r){
 const v=own(fields(value,['status','entryHash','materialHash','sourceRevision','qaVersionId','authorizesEffects','completePackage','operationalReadiness']));
 if(v.status!=='material_recorded'||!hex(v.entryHash)||!hex(v.materialHash)||v.sourceRevision!==r.sourceRevision||v.qaVersionId!==r.qaVersionId||v.authorizesEffects!==false||v.completePackage!==false||v.operationalReadiness!==false)fail();return v;
}
/** Fixed source-owned actor continuation; transported native fields are correlation DATA. */
export function createPrivateQaFiniteInitialEntry(options){
 fields(options,['ctx','env']);const {ctx,env}=options;
 return Object.freeze({async run(input){
  let parent;
  try{
   const r=refs(input),storage=ctx?.storage,transaction=storage?.transaction,get=storage?.get,sync=storage?.sync,actorId=ctx?.id,toString=actorId?.toString,self=env?.AFW_INDEPENDENT_CLOSURE,idFromName=self?.idFromName,namespaceGet=self?.get,metadata=env?.AFW_QA_VERSION,qaVersionId=metadata?.id,db=env?.RELEASE_DB,node=env?.AFW_RELEASE_EVENTS_NODE,credential=env?.AFW_MCP_CLOSURE_READ_TOKEN,fetcher=globalThis.fetch;
   if([transaction,get,sync,toString,idFromName,namespaceGet,fetcher].some(x=>typeof x!=='function')||typeof credential!=='string'||credential.length<1||credential.length>8192||/[^\x21-\x7e]/.test(credential))fail();
   const expected=readFiniteQaBootstrapSourceExpectations(),candidate=readPrivateQaFiniteCandidate(),actor=Reflect.apply(toString,actorId,[]);
   if(!hex(actor)||self.idFromName(SLOT).toString()!==actor||r.sourceRevision!==expected.sourceRevision||qaVersionId!==r.qaVersionId||candidate.sourceRevision!==expected.sourceRevision||candidate.sourceTree!==expected.sourceTree)fail();
   const holders=()=>{if(options.ctx!==ctx||options.env!==env||ctx.storage!==storage||storage.transaction!==transaction||storage.get!==get||storage.sync!==sync||ctx.id!==actorId||actorId.toString!==toString||Reflect.apply(toString,actorId,[])!==actor||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||self.get!==namespaceGet||self.idFromName(SLOT).toString()!==actor||env.AFW_QA_VERSION!==metadata||metadata.id!==qaVersionId||env.RELEASE_DB!==db||env.AFW_RELEASE_EVENTS_NODE!==node||env.AFW_MCP_CLOSURE_READ_TOKEN!==credential||globalThis.fetch!==fetcher)fail();};
   parent=clock(r.createdAt+30000,holders);const lease=parent.lease;
   const request=(base,path,cap)=>parent.child(async l=>{
    const response=await fetcher(base+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:l.signal,headers:{Accept:'application/json','Cache-Control':'no-cache',...base===CF?{Authorization:'Bearer '+credential}:{'X-GitHub-Api-Version':'2022-11-28'}}});current(l);let reader;
    try{
     const date=Date.parse(response?.headers?.get('date')??''),length=response?.headers?.get('content-length'),remaining=response?.headers?.get('x-ratelimit-remaining');
     if(!(response instanceof Response)||response.status!==200||response.redirected||!response.body||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||response.headers.has('age')&&response.headers.get('age')!=='0'||response.headers.has('retry-after')||response.headers.has('link')||['HIT','STALE','REVALIDATED','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||!(response.headers.get('content-type')??'').startsWith('application/json')||length!==null&&(!/^\d+$/.test(length)||Number(length)>cap)||remaining!==null&&(!/^\d+$/.test(remaining)||Number(remaining)<1))fail();
     reader=response.body.getReader();let size=0;const chunks=[];
     for(;;){const v=await reader.read();current(l);if(v.done)break;if(!(v.value instanceof Uint8Array)||(size+=v.value.length)>cap)fail();chunks.push(v.value);}
     if(length!==null&&Number(length)!==size)fail();return{value:JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),date};
    }finally{if(reader)void reader.cancel().catch(()=>{});else if(response?.body&&!response.body.locked)void response.body.cancel().catch(()=>{});}
   });
   const command=async()=>{
    const v=(await request(GH,'/issues/comments/'+r.commandId,16384)).value,I0=Date.parse(v.created_at);current(lease);
    if(v.id!==r.commandId||v.body!=='/afw-qa-finite-prepare v1 '+expected.sourceRevision+' '+qaVersionId||v.user?.id!==290715446||v.user.login!=='tokenizartinfo-ops'||v.user.type!=='User'||v.author_association!=='OWNER'||v.issue_url!==GH+'/issues/497'||!Number.isSafeInteger(I0)||I0<0||![new Date(I0).toISOString(),new Date(I0).toISOString().replace('.000Z','Z')].includes(v.created_at)||v.updated_at!==v.created_at||I0>r.createdAt||Date.now()>=I0+300000)fail();
    return own({commandId:r.commandId,body:v.body,createdAt:I0,updatedAt:I0,ownerId:290715446,repository:'tokenizartinfo-ops/agent-friendly-web',issueNumber:497});
   };
   const first=await command();parent.narrow(first.createdAt+300000);
   const token=finiteCfEnvelope((await request(CF,'/tokens/verify',8192)).value);fields(token,['id','status','expires_on',...Object.hasOwn(token,'not_before')?['not_before']:[]]);
   const expiry=Date.parse(token.expires_on);if(token.id!=='9aa97ad1fc9afe3021cf69ea497d5190'||token.status!=='active'||!Number.isSafeInteger(expiry)||token.not_before!=null&&(!Number.isSafeInteger(Date.parse(token.not_before))||Date.parse(token.not_before)>Date.now()))fail();parent.narrow(expiry);
   const main=(await request(GH,'/git/ref/heads/main',16384)).value;
   if(main.ref!=='refs/heads/main'||main.object?.type!=='commit'||main.object.sha!==expected.sourceRevision)fail();
   const pointer=finiteQaPointer(await request(CF,'/workers/scripts/agent-friendly-web-independent-closure-qa/deployments?per_page=1',65536));if(pointer.versionId!==qaVersionId)fail();
   const body={purpose:'afw.finite-initial-entry.v1',commandId:r.commandId,commandHash:hash('afw.finite-initial-command.v1',first),sourceRevision:expected.sourceRevision,sourceTree:expected.sourceTree,qaVersionId,initialInstanceId:r.initialInstanceId,workflowName:WORKFLOW,createdAt:r.createdAt,I0:first.createdAt,initialDeadline:first.createdAt+300000,operationDeadline:Math.min(first.createdAt+300000,r.createdAt+30000,CEILING)};
   const record={...body,entryHash:hashFiniteInitialEntry(body)},raw=encodeFiniteInitialEntry(record);
   const inserted=await parent.child(l=>Reflect.apply(transaction,storage,[async tx=>{
    const tg=tx.get,tp=tx.put;const check=()=>{current(l);if(tx.get!==tg||tx.put!==tp)fail();};
    check();const old=await Reflect.apply(tg,tx,[KEY]);check();
    if(old!==undefined){decodeFiniteInitialEntry(old);if(old!==raw)fail();return false;}
    for(const key of ['afw.finite-initial-preparation.v1:once','afw.finite-initial-preparation.v1:selector','afw.finite-initial-preparation.v1:ack','afw.qa-finite-trial.v1:head']){if(await Reflect.apply(tg,tx,[key])!==undefined)fail();check();}
    await Reflect.apply(tp,tx,[KEY,raw]);check();return true;
   }]));
   if(inserted!==true)return pending();
   await parent.child(()=>Reflect.apply(sync,storage,[]));
   const readback=await parent.child(()=>Reflect.apply(get,storage,[KEY]));if(readback!==raw)fail();decodeFiniteInitialEntry(readback);
   if(canonical(await command())!==canonical(first))fail();current(lease);
   // Only this surviving ACKed/durable invocation reaches A; no exported admission.
   const producer=createPrivateQaFiniteInitialMaterial({ctx,env}),result=await parent.wait(producer.collect({commandId:r.commandId},lease));
   producer.assertCurrent(result,lease);
   await parent.child(()=>Reflect.apply(sync,storage,[]));producer.assertCurrent(result,lease);current(lease);
   return safe({status:'material_recorded',entryHash:record.entryHash,materialHash:result.material.materialHash,sourceRevision:expected.sourceRevision,qaVersionId,authorizesEffects:false,completePackage:false,operationalReadiness:false},r);
  }catch{return pending();}finally{parent?.close();}
 }});
}
export const FINITE_INITIAL_PREPARATION_OPERATION='finite_initial_preparation';
/** Real Workflow.run event; account/binding governance, not cryptographic RPC caller proof. */
export async function runPrivateQaFiniteInitialPreparation({env,event,step}){
 let parent;
 try{
  const timestamp=event.timestamp,createdAt=Reflect.apply(nativeTime,timestamp,[]),payload=event.payload,p=own(fields(payload,['operation','commandId','sourceRevision','qaVersionId'])),stepDo=step?.do,self=env?.AFW_INDEPENDENT_CLOSURE,metadata=env?.AFW_QA_VERSION,qaVersionId=metadata?.id;
  const r=refs({commandId:p.commandId,sourceRevision:p.sourceRevision,qaVersionId:p.qaVersionId,initialInstanceId:event.instanceId,workflowName:event.workflowName,createdAt});
  if(p.operation!==FINITE_INITIAL_PREPARATION_OPERATION||event.schedule!==undefined||typeof stepDo!=='function'||qaVersionId!==r.qaVersionId||r.sourceRevision!==readFiniteQaBootstrapSourceExpectations().sourceRevision)fail();
  const holders=()=>{if(event.timestamp!==timestamp||Reflect.apply(nativeTime,timestamp,[])!==createdAt||event.payload!==payload||canonical(own(fields(payload,['operation','commandId','sourceRevision','qaVersionId'])))!==canonical(p)||event.instanceId!==r.initialInstanceId||event.workflowName!==WORKFLOW||event.schedule!==undefined||step.do!==stepDo||env.AFW_INDEPENDENT_CLOSURE!==self||env.AFW_QA_VERSION!==metadata||metadata.id!==qaVersionId)fail();};
  parent=clock(createdAt+30000,holders);
  const actor=self.get(self.idFromName(SLOT)),method=actor.prepareFiniteInitialMaterial;if(typeof method!=='function')fail();
  const value=await parent.wait(Promise.resolve().then(()=>Reflect.apply(stepDo,step,['finite-initial-preparation',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'30 seconds'},async()=>{
   current(parent.lease);const result=await parent.wait(Promise.resolve().then(()=>Reflect.apply(method,actor,[r])));current(parent.lease);return result?.status==='material_recorded'?safe(result,r):pending();
  }])));
  current(parent.lease);return value?.status==='material_recorded'?safe(value,r):pending();
 }catch{return pending();}finally{parent?.close();}
}
