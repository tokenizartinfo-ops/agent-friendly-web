import {createHash} from 'node:crypto';
import {createPrivateQaExecutionPin} from './mcp-qa-execution-identity.mjs';
import {createPrivateQaGenerationResolver} from './mcp-qa-generation-resolver.mjs';
import {parsePrivateQaGenerationCapsule} from './mcp-qa-generation-ledger.mjs';
import {createPrivateQaNamedPacketReader} from './mcp-qa-named-packet-reader.mjs';
import {assemblePrivateQaNamedPacket} from './mcp-qa-named-packet-assembly.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from './mcp-qa-closed-context.mjs';
const compiledRevision=typeof globalThis.__AFW_QA_SOURCE_REVISION__==='string'?globalThis.__AFW_QA_SOURCE_REVISION__:'';
// One occurrence only: a future verified builder must provide this private slot.
const compiledArtifactContext=globalThis.__AFW_QA_NAMED_ARTIFACT_CONTEXT__??null;
const PURPOSE='afw.qa-named-packet-observation.v1',HEAD='afw.qa-generation-head.v2',INFO='afw.qa-generation-info.v2:',SLOT='afw-own-successor-closure-v1';
const policies=['AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_CHALLENGE_IDENTITY','AFW_MCP_CLOSURE_POLICY','AFW_MCP_READER_PROBE_POLICY','AFW_MCP_PUBLISHER_PROBE_POLICY','AFW_MCP_CLOSURE_DISPATCH_POLICY'];
const prepared=['AFW_MCP_CLOSURE_ENABLED','AFW_MCP_CLOSURE_DISPATCH_ENABLED','AFW_MCP_CLOSURE_REDUCTION_ENABLED'];
const fail=()=>{throw Error('Private QA packet diagnostic unavailable');};
const hash=s=>createHash('sha256').update(s).digest('hex');
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const blocked=()=>JSON.stringify({purpose:PURPOSE,status:'blocked',authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false,mayRetry:false});
function data(v,k){if(!v||typeof v!=='object')fail();const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
function fields(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();return Object.fromEntries(keys.map(k=>[k,data(v,k)]));}
function profile(env){
 const flags=PRIVATE_QA_CLOSED_FLAGS.map(k=>data(env,k));
 for(const k of Object.keys(env))if(/^AFW_(QA|MCP)_.*_ENABLED$/.test(k)&&!PRIVATE_QA_CLOSED_FLAGS.includes(k))fail();
 for(const k of policies)if(data(env,k)!=='')fail();
 if(flags.every(v=>v==='false'))return 'closed';
 if(PRIVATE_QA_CLOSED_FLAGS.every((k,i)=>flags[i]===(prepared.includes(k)?'true':'false')))return 'prepared_idle';
 fail();
}
function lease(env,sourceRevision,context,now,timeoutMs){
 const entered=now(),origin=performance.now();let lastWall=entered,lastMono=origin,finished=false;
 if(!time(entered)||entered+timeoutMs>8640000000000000||!Number.isFinite(origin)||origin<0)fail();
 const metadata=data(env,'AFW_QA_VERSION'),version=data(metadata,'id'),pin=createPrivateQaExecutionPin({env,expectedVersionId:version,sourceRevision,context}),initialProfile=profile(env);
 const current=()=>{const at=now(),mono=performance.now();if(finished||!time(at)||at<lastWall||at>=entered+timeoutMs||!Number.isFinite(mono)||mono<lastMono||mono>=origin+timeoutMs||data(env,'AFW_QA_VERSION')!==metadata||profile(env)!==initialProfile)fail();pin.assertCurrent();lastWall=at;lastMono=mono;return at;};
 current();return{current,remaining(){current();return Math.floor(Math.min(entered+timeoutMs-lastWall,origin+timeoutMs-lastMono));},finish(){finished=true;},version,profile:initialProfile};
}
const receiptKeys=['purpose','status','namedBundleHash','generationPlanHash','packetHash','runtimeVersionId','sourceRevision','artifactSourceRevision','artifactWorkerHash','configurationProfile','allClosed','context','authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'];
function metadata(raw,expected,source,version,configurationProfile){
 if(typeof raw!=='string'||Buffer.byteLength(raw)>2048)fail();const r=fields(JSON.parse(raw),receiptKeys);
 if(r.purpose!==PURPOSE||r.status!=='observed'||r.namedBundleHash!==expected||!hex(r.generationPlanHash)||!hex(r.packetHash)||!hex(r.artifactSourceRevision,40)||!hex(r.artifactWorkerHash)||r.runtimeVersionId!==version||r.sourceRevision!==source||r.configurationProfile!==configurationProfile||r.allClosed!==(configurationProfile==='closed')||r.context!=='durable_object'||['authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'].some(k=>r[k]!==false))fail();return r;
}
/** Internal constructor fixes trusted code. The RPC only accepts a bundle hash.
 * This diagnostic requires an already ARMED generation. It is not before-ARM
 * readiness, source provenance, guard liveness or any effect authorization. */
export function createPrivateQaNamedPreflight(options){
 const keys=['env','ctx','sourceRevision','artifactContext','now','timeoutMs'],pinned=fields(options,keys),{env,ctx,sourceRevision,artifactContext,now,timeoutMs}=pinned;
 if(!env||!ctx||!hex(sourceRevision,40)||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 async function read(args){
  if(args.length!==1||!hex(args[0]))return blocked();
  let l,timer;const controller=new AbortController();
  try{
   // Absent compiled context fails before primary storage or D1 is touched.
   const c=fields(artifactContext,['artifact','receipt']),contextFingerprint=JSON.stringify(c);
   const a=fields(c.artifact,['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck']);
   const artifact=Object.freeze(Object.fromEntries(Object.keys(c.artifact).map(k=>[k,a[k]]))),receipt=Object.freeze({...fields(c.receipt,['baseVersionId','artifactKey','sourceRevision','sourceTree','programHash','workerHash','workerBytes','sourceCheck'])});
   if(typeof artifact.script!=='string'||Buffer.byteLength(artifact.script)>2097152)fail();
   l=lease(env,sourceRevision,'durable_object',now,timeoutMs);
   const storage=ctx.storage,transaction=storage?.transaction,id=ctx.id,idString=id?.toString,self=data(env,'AFW_INDEPENDENT_CLOSURE'),select=self?.idFromName,node=data(env,'AFW_MCP_CLOSURE_NODE'),nodeName=node?.idFromName,nodeString=node?.idFromString,db=data(env,'AFW_QA_DB');
   if(typeof transaction!=='function'||typeof idString!=='function'||typeof select!=='function'||typeof nodeName!=='function'||typeof nodeString!=='function')fail();
   const actorId=Reflect.apply(idString,id,[]);if(!hex(actorId))fail();
   const current=()=>{const at=l.current(),v=fields(options,keys);if(keys.some(k=>v[k]!==pinned[k])||JSON.stringify(artifactContext)!==contextFingerprint||ctx.storage!==storage||storage.transaction!==transaction||ctx.id!==id||id.toString!==idString||data(env,'AFW_INDEPENDENT_CLOSURE')!==self||self.idFromName!==select||Reflect.apply(idString,id,[])!==actorId||Reflect.apply(select,self,[SLOT]).toString()!==actorId||data(env,'AFW_MCP_CLOSURE_NODE')!==node||node.idFromName!==nodeName||node.idFromString!==nodeString||data(env,'AFW_QA_DB')!==db)fail();return at;};
   const primary=async()=>{current();const r=await Reflect.apply(transaction,storage,[async t=>{const get=t?.get;if(typeof get!=='function')fail();const checked=()=>{current();if(t.get!==get)fail();};checked();const h=fields(await Reflect.apply(get,t,[HEAD]),['purpose','sequence','planHash','infoHash']);checked();if(h.purpose!==HEAD||!hex(h.planHash)||!hex(h.infoHash)||!Number.isSafeInteger(h.sequence)||h.sequence<1||h.sequence>32)fail();const i=fields(await Reflect.apply(get,t,[INFO+h.planHash]),['purpose','sequence','planHash','capsule','execution','preparedAt']);checked();if(i.purpose!=='afw.qa-generation-info.v2'||i.sequence!==h.sequence||i.planHash!==h.planHash||typeof i.capsule!=='string'||hash('afw.qa-generation-plan.v2\n'+i.capsule)!==h.planHash||parsePrivateQaGenerationCapsule(i.capsule).bundleHash!==args[0])fail();return{head:h,capsule:i.capsule};}]);current();return r;};
   const generation=async snapshot=>{current();const remaining=l.remaining();if(remaining<1)fail();const raw=await createPrivateQaGenerationResolver({env,ctx,sourceRevision,now:current,timeoutMs:remaining}).read(snapshot.head.planHash);current();if(typeof raw!=='string'||Buffer.byteLength(raw)>2048)fail();const r=JSON.parse(raw);if(r.status!=='armed'||r.isHead!==true||r.withinWindow!==true||r.planHash!==snapshot.head.planHash||r.infoHash!==snapshot.head.infoHash||r.sequence!==snapshot.head.sequence||r.runtimeVersionId!==l.version||r.sourceRevision!==sourceRevision||r.authorizesEffects!==false||r.guardLivenessVerified!==false||r.operationalReadiness!==false||r.mayRetry!==false)fail();};
   const work=async()=>{try{
    current();const first=await primary();await generation(first);current();
    const remaining=l.remaining();if(remaining<1)fail();const packetJson=await createPrivateQaNamedPacketReader({db,now:current,timeoutMs:remaining}).read(first.head.planHash,controller.signal);current();if(!packetJson)fail();
    const assembled=assemblePrivateQaNamedPacket({packetJson,expectedCapsule:first.capsule,artifact,receipt,namespace:node});current();
    if(assembled.namedBundleHash!==args[0]||assembled.generationPlanHash!==first.head.planHash)fail();
    await generation(first);const final=await primary();current();if(JSON.stringify(final)!==JSON.stringify(first))fail();
    const result={purpose:PURPOSE,status:'observed',namedBundleHash:assembled.namedBundleHash,generationPlanHash:assembled.generationPlanHash,packetHash:assembled.packetHash,runtimeVersionId:l.version,sourceRevision,artifactSourceRevision:artifact.sourceRevision,artifactWorkerHash:artifact.workerHash,configurationProfile:l.profile,allClosed:l.profile==='closed',context:'durable_object',authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false,mayRetry:false};
    const raw=JSON.stringify(result);metadata(raw,args[0],sourceRevision,l.version,l.profile);current();return raw;
   }catch{return blocked();}};
   const deadline=new Promise(resolve=>{timer=setTimeout(()=>{l.finish();controller.abort();resolve(blocked());},Math.max(1,l.remaining()));});
   const result=await Promise.race([deadline,work()]);current();return result;
  }catch{return blocked();}finally{clearTimeout(timer);controller.abort();l?.finish();}
 }
 return Object.freeze({read(...args){return read(args);}});
}
export async function readPrivateQaNamedPacket({env,ctx,args}){
 try{return await createPrivateQaNamedPreflight({env,ctx,sourceRevision:compiledRevision,artifactContext:compiledArtifactContext,now:Date.now,timeoutMs:5000}).read(...args);}catch{return blocked();}
}
/** Separate diagnostic ID/payload; nominal {planHash} remains unmounted. */
export async function runPrivateQaNamedPacketObservation({env,event,step}){
 let l,timer;
 try{
  const raw=event?.payload;if(typeof raw==='string'&&Buffer.byteLength(raw)>256)fail();
  const p=fields(typeof raw==='string'?JSON.parse(raw):raw,['operation','namedBundleHash']);
  if(p.operation!=='observe_named_packet'||!hex(p.namedBundleHash)||event.instanceId!=='afw-qa-named-preflight-'+p.namedBundleHash||typeof step?.do!=='function'||!compiledArtifactContext)fail();
  l=lease(env,compiledRevision,'workflow',Date.now,5000);
  const ns=data(env,'AFW_INDEPENDENT_CLOSURE'),select=ns?.idFromName,get=ns?.get,stepDo=step.do;if(typeof select!=='function'||typeof get!=='function')fail();let executedHere=false;
  const current=()=>{l.current();if(data(env,'AFW_INDEPENDENT_CLOSURE')!==ns||ns.idFromName!==select||ns.get!==get||step.do!==stepDo)fail();};
  const work=async()=>{current();const actor=await step.do('observe-current-named-packet',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'5 seconds'},async()=>{executedHere=true;current();const stub=Reflect.apply(get,ns,[Reflect.apply(select,ns,[SLOT])]),result=await stub.readOwnQaNamedPacket(p.namedBundleHash);current();return metadata(result,p.namedBundleHash,compiledRevision,l.version,l.profile);});current();if(!executedHere)fail();const r=metadata(JSON.stringify(actor),p.namedBundleHash,compiledRevision,l.version,l.profile),result={...r,context:'workflow',actorContext:r.context};if(Buffer.byteLength(JSON.stringify(result))>2048)fail();current();return result;};
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{l.finish();reject(Error('Private QA diagnostic expired'));},Math.max(1,l.remaining()));});
  const result=await Promise.race([deadline,work()]);current();return result;
 }catch{return JSON.parse(blocked());}finally{clearTimeout(timer);l?.finish();}
}
