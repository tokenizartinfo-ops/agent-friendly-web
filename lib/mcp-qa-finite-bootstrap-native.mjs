import {BOOTSTRAP,bootstrapFields,bootstrapHex,bootstrapUuid,bootstrapCanonical,bootstrapFreeze,decodeFiniteQaBootstrap} from './mcp-qa-finite-bootstrap-record.mjs';
import {readFiniteQaBootstrapSourceExpectations} from './mcp-qa-finite-bootstrap-source.mjs';
import {readFiniteQaBootstrapPrimary} from './mcp-qa-finite-bootstrap-primary.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {finiteQaPointer} from './mcp-qa-finite-publication.mjs';
import {retainFiniteOwnerStagePromise} from './mcp-qa-finite-stage-work.mjs';
const CF='https://api.cloudflare.com/client/v4/accounts/'+BOOTSTRAP.accountId,GH='https://api.github.com/repos/'+BOOTSTRAP.repository;
const TOKEN='9aa97ad1fc9afe3021cf69ea497d5190',CEILING=Date.parse('2026-11-03T02:59:00Z'),SLOT='afw-own-successor-closure-v1';
const fail=()=>{throw Error('Finite QA bootstrap native evidence unavailable');};
function ownFields(v,keys){bootstrapFields(v,keys);for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();}return v;}
/** UNMOUNTED private factual reader. Local holders/literals are not source
 * identity authority. Ref governance is explicitly trusted, not proved.
 * No GHA token, QA version/content GET, private window or capability minted. */
export async function readPrivateQaFiniteBootstrap(options,originalLease){
 let controller,timer,stop,parent,finished=false,effectiveExpiry=CEILING;
 try{
  if(arguments.length!==2)fail();ownFields(options,['ctx','env']);ownFields(originalLease,['signal','assertCurrent']);
  const {ctx,env}=options,{signal,assertCurrent}=originalLease,expected=readFiniteQaBootstrapSourceExpectations();
  if(!(signal instanceof AbortSignal)||typeof assertCurrent!=='function')fail();parent=signal;
  const actor=ctx?.id,stringify=actor?.toString,storage=ctx?.storage,self=env?.AFW_INDEPENDENT_CLOSURE,idFromName=self?.idFromName,version=env?.AFW_QA_VERSION,id=version?.id,credential=env?.AFW_MCP_CLOSURE_READ_TOKEN,fetcher=globalThis.fetch;
  if(!storage||typeof stringify!=='function'||typeof idFromName!=='function'||typeof fetcher!=='function'||!bootstrapUuid(id)||typeof credential!=='string'||credential.length<1||credential.length>8192||/[^\x21-\x7e]/.test(credential))fail();
  const actorId=Reflect.apply(stringify,actor,[]);if(!bootstrapHex(actorId)||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId)fail();
  const entered=Date.now(),origin=performance.now();let lastWall=entered,lastMono=origin,cfCount=0,ghCount=0,ghBytes=0,cfBytes=0;
  controller=new AbortController();stop=()=>controller.abort();signal.addEventListener('abort',stop,{once:true});if(signal.aborted)stop();timer=setTimeout(stop,30000);
  const check=()=>{
   assertCurrent();const at=Date.now(),mono=performance.now();
   if(finished||signal.aborted||controller.signal.aborted||!Number.isSafeInteger(at)||at<lastWall||at-entered>=30000||at>=effectiveExpiry||!Number.isFinite(mono)||mono<lastMono||mono-origin>=30000)fail();lastWall=at;lastMono=mono;
   if(options.ctx!==ctx||options.env!==env||originalLease.signal!==signal||originalLease.assertCurrent!==assertCurrent||ctx.id!==actor||actor.toString!==stringify||ctx.storage!==storage||Reflect.apply(stringify,actor,[])!==actorId||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId||env.AFW_QA_VERSION!==version||version.id!==id||env.AFW_MCP_CLOSURE_READ_TOKEN!==credential||globalThis.fetch!==fetcher)fail();return at;
  };
  const request=async(service,path,cap=262144)=>{
   check();if(service==='cf'?++cfCount>3:++ghCount>11)fail();
   const child=new AbortController(),began=Date.now(),mono=performance.now();let active=true,on,t,reader;
   const current=()=>{check();if(!active||child.signal.aborted||Date.now()-began>=5000||performance.now()-mono>=5000)fail();};
   const stopped=new Promise((_,reject)=>{on=()=>{active=false;child.abort();reject(Error('Finite QA bootstrap native read stopped'));};controller.signal.addEventListener('abort',on,{once:true});t=setTimeout(on,5000);});
   const actual=retainFiniteOwnerStagePromise(Promise.resolve().then(async()=>{
    try{
     current();const r=await fetcher((service==='cf'?CF:GH)+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:child.signal,headers:{Accept:'application/json','Cache-Control':'no-cache',...service==='cf'?{Authorization:'Bearer '+credential}:{'X-GitHub-Api-Version':'2022-11-28'}}});current();
     const date=Date.parse(r?.headers?.get('date')??''),length=r?.headers?.get('content-length');
     if(!(r instanceof Response)||r.status!==200||!r.body||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||r.headers.has('age')&&r.headers.get('age')!=='0'||r.headers.has('retry-after')||r.headers.get('x-ratelimit-remaining')==='0'||r.headers.has('link')||['HIT','STALE','REVALIDATED','UPDATING'].includes(r.headers.get('cf-cache-status')?.toUpperCase())||!(r.headers.get('content-type')??'').startsWith('application/json')||length!==null&&(!/^\d+$/.test(length)||Number(length)>cap))fail();
     reader=r.body.getReader();let size=0;const chunks=[];
     for(;;){current();const v=await reader.read();current();if(v.done)break;if(!(v.value instanceof Uint8Array)||(size+=v.value.length)>cap)fail();chunks.push(v.value);}
     if(length!==null&&Number(length)!==size)fail();if(service==='cf'?(cfBytes+=size)>262144:(ghBytes+=size)>2097152)fail();
     const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));current();return {value,date};
    }finally{if(reader)retainFiniteOwnerStagePromise(reader.cancel()).catch(()=>{});}
   }));
   try{const result=await Promise.race([actual,stopped]);current();return result;}finally{active=false;clearTimeout(t);controller.signal.removeEventListener('abort',on);child.abort();}
  };
  check();
  const token=finiteCfEnvelope((await request('cf','/tokens/verify',8192)).value);check();
  bootstrapFields(token,['id','status','expires_on',...Object.hasOwn(token,'not_before')?['not_before']:[]]);
  const expiry=Date.parse(token.expires_on);if(token.id!==TOKEN||token.status!=='active'||!Number.isSafeInteger(expiry)||expiry<=check()||token.not_before!=null&&(!Number.isSafeInteger(Date.parse(token.not_before))||Date.parse(token.not_before)>check()))fail();
  effectiveExpiry=Math.min(expiry,CEILING);check();
  const pointerPath='/workers/scripts/'+BOOTSTRAP.workerName+'/deployments?per_page=1',before=finiteQaPointer(await request('cf',pointerPath,65536));check();if(before.versionId!==id)fail();
  const get=async p=>(await request('gh',p)).value,refPath='/git/ref/tags/afw-finite-bootstrap/'+id,refName='refs/tags/afw-finite-bootstrap/'+id;
  const ref=await get(refPath);check();if(ref.ref!==refName||ref.object?.type!=='tag'||!bootstrapHex(ref.object.sha,40))fail();
  const tagSha=ref.object.sha,tag=await get('/git/tags/'+tagSha);check();
  if(tag.sha!==tagSha||tag.tag!=='afw-finite-bootstrap-'+id||tag.object?.type!=='commit'||tag.object.sha!==expected.sourceRevision)fail();
  const {record,recordHash}=decodeFiniteQaBootstrap(tag.message);
  if(record.sourceRevision!==expected.sourceRevision||record.sourceTree!==expected.sourceTree||record.qaLive.versionId!==id||record.qaLive.deploymentId!==before.deploymentId)fail();
  const primaryEvidence=await readFiniteQaBootstrapPrimary({get,record,phase:'reader',now:Date.now,expected});check();
  const [main,currentRef]=await Promise.all([get('/git/ref/heads/main'),get(refPath)]);check();
  if(main.ref!=='refs/heads/main'||main.object?.type!=='commit'||main.object.sha!==expected.sourceRevision||currentRef.ref!==refName||currentRef.object?.type!=='tag'||currentRef.object.sha!==tagSha)fail();
  const after=finiteQaPointer(await request('cf',pointerPath,65536));check();if(bootstrapCanonical(after)!==bootstrapCanonical(before))fail();
  return bootstrapFreeze({purpose:'afw.finite-qa-bootstrap-evidence.v1',record,recordHash,tagSha,primaryEvidence,currentPointer:after,observedAt:check(),qaPublicationBridgeVerified:true,qaCodeProvenanceVerified:false,sourceIdentityVerified:false,scopeVerified:false,authorizesEffects:false,operationalReadiness:false,completePackage:false,repositoryWriterTrustAssumed:true,historicalRefNonmutationVerified:false});
 }catch{fail();}finally{finished=true;clearTimeout(timer);parent?.removeEventListener('abort',stop);controller?.abort();}
}
