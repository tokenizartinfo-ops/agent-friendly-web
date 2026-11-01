import {createHash} from 'node:crypto';
const states=new WeakMap();
/** HTTP header safety/budget only. GitHub validates opaque credentials; no token-format identity. */
export function isQaGithubBearerTransportValue(value){return typeof value==='string'&&value.length>0&&value.length<=8192&&!/[^\x21-\x7e]/.test(value);}
const fail=()=>{throw Error('Closed QA lifecycle admission unavailable');};
function own(v,k){if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
function exact(v,keys){if(!v||Reflect.ownKeys(v).length!==keys.length)fail();return Object.fromEntries(keys.map(k=>[k,own(v,k)]));}
const actor=v=>own(v,'id')===290715446&&own(v,'login')==='tokenizartinfo-ops'&&own(v,'type')==='User';
/** Internal admission metadata only; the CLI binds runner context and event file. */
export function validateQaLifecycleCommand(options){
 const mono=performance.now();
 const {event,context,now}=exact(options,['event','context','now']);if(typeof now!=='function')fail();
 const c=exact(context,['repository','repositoryId','ref','eventName','runId','runAttempt','sourceRevision']),at=now();
 if(!Number.isSafeInteger(at)||at<0||c.repository!=='tokenizartinfo-ops/agent-friendly-web'||c.repositoryId!=='1347578006'||c.ref!=='refs/heads/main'||c.eventName!=='issue_comment'||c.runAttempt!=='1'||typeof c.runId!=='string'||!/^[1-9][0-9]{0,19}$/.test(c.runId)||typeof c.sourceRevision!=='string'||!/^[a-f0-9]{40}$/.test(c.sourceRevision))fail();
 if(own(event,'action')!=='created')fail();
 const repo=own(event,'repository'),issue=own(event,'issue'),comment=own(event,'comment'),sender=own(event,'sender');
 if(own(repo,'id')!==1347578006||own(repo,'full_name')!==c.repository||own(issue,'number')!==497||Object.hasOwn(issue,'pull_request')||!actor(own(comment,'user'))||!actor(sender)||own(comment,'author_association')!=='OWNER')fail();
 const id=own(comment,'id'),body=own(comment,'body'),rawDate=own(comment,'created_at'),created=typeof rawDate==='string'?Date.parse(rawDate):NaN;
 if(!Number.isSafeInteger(id)||id<1||body!=='/afw-qa-deploy-observe-restore v1 '+c.sourceRevision||!Number.isSafeInteger(created)||created<0||created>at||at-created>=300000)fail();
 if(!Number.isFinite(mono)||mono<0)fail();
 const expiresAt=created+300000,cleanupExpiresAt=expiresAt+180000;
 const intentId=createHash('sha256').update('afw.qa-closed-lifecycle-command.v1\n1347578006\n'+id+'\n'+c.sourceRevision+'\n'+created).digest('hex');
 const admission=Object.freeze({purpose:'afw.qa-closed-lifecycle-command.v1',sourceRevision:c.sourceRevision,commentId:String(id),runId:c.runId,createdAt:created,admittedAt:at,expiresAt,cleanupExpiresAt,intentId,readOnly:false,authorizesEffects:false,operationalReadiness:false,mayRetry:false});
 states.set(admission,{now,wall:at,mono,origin:mono,nominalEnd:mono+(expiresAt-at),cleanupEnd:mono+(cleanupExpiresAt-at),poisoned:false,claimStarted:false,claimAck:false});
 return admission;
}
/** Trusted controller guard. A nominal failure never refreshes or consumes the separate cleanup clock. */
export function assertQaLifecycleWindow(admission,phase,minimumRemaining=0){
 const s=states.get(admission);if(!s||s.poisoned||!['nominal','cleanup'].includes(phase)||!Number.isSafeInteger(minimumRemaining)||minimumRemaining<0||minimumRemaining>180000)fail();
 let wall,mono;try{wall=s.now();mono=performance.now();}catch{s.poisoned=true;fail();}
 if(!Number.isSafeInteger(wall)||wall<s.wall||!Number.isFinite(mono)||mono<s.mono){s.poisoned=true;fail();}s.wall=wall;s.mono=mono;
 const end=phase==='nominal'?admission.expiresAt:admission.cleanupExpiresAt,monoEnd=phase==='nominal'?s.nominalEnd:s.cleanupEnd;
 if(wall>=end||mono>=monoEnd||end-wall<minimumRemaining||monoEnd-mono<minimumRemaining)fail();
 return admission;
}
/** Remaining time from the SAME original wall/monotonic ends; never a new lease. */
export function remainingQaLifecycleWindow(admission,phase){
 assertQaLifecycleWindow(admission,phase);const s=states.get(admission);
 return Math.min((phase==='nominal'?admission.expiresAt:admission.cleanupExpiresAt)-s.wall,(phase==='nominal'?s.nominalEnd:s.cleanupEnd)-s.mono);
}
export function assertQaLifecycleClaim(admission){
 if(!states.get(admission)?.claimAck)fail();return assertQaLifecycleWindow(admission,'nominal');
}
/** Fixed GitHub append-only reservation only. No Cloudflare transport or mutation capability. */
export async function claimQaLifecycleOnce(options){
 let timer,reader,stop;const abort=new AbortController();let s;
 try{
  const {admission,credential,fetchImpl}=exact(options,['admission','credential','fetchImpl']);
  assertQaLifecycleWindow(admission,'nominal',180000);s=states.get(admission);
  if(s.claimStarted||!isQaGithubBearerTransportValue(credential)||typeof fetchImpl!=='function')fail();
  // Consume before the request; unknown ACK,409,abort or parse failure never refunds it.
  s.claimStarted=true;const began=s.wall,mono=s.mono,ref='refs/tags/afw-qa-closed-rollback/'+admission.intentId;
  const check=()=>{assertQaLifecycleWindow(admission,'nominal');if(abort.signal.aborted||s.wall-began>=5000||s.mono-mono>=5000)fail();};
  const stopped=new Promise((_,reject)=>{stop=()=>{abort.abort();reject(Error('Closed QA claim stopped'));};timer=setTimeout(stop,5000);});
  const work=async()=>{
   check();
   const r=await fetchImpl('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/git/refs',{method:'POST',redirect:'error',cache:'no-store',signal:abort.signal,headers:{Authorization:'Bearer '+credential,Accept:'application/vnd.github+json','Content-Type':'application/json','X-GitHub-Api-Version':'2022-11-28','Cache-Control':'no-cache'},body:JSON.stringify({ref,sha:admission.sourceRevision})});
   check();if(!(r instanceof Response)||r.status!==201)fail();
   const date=Date.parse(r.headers.get('date')??'');
   if(!Number.isFinite(date)||Math.abs(s.wall-date)>5000||r.headers.has('age')&&r.headers.get('age')!=='0'||!(r.headers.get('content-type')??'').toLowerCase().startsWith('application/json'))fail();
   const length=r.headers.get('content-length');if(length!==null&&(!/^\d+$/.test(length)||Number(length)>8192)||!r.body)fail();
   reader=r.body.getReader();let bytes=0;const chunks=[];
   while(true){check();const b=await reader.read();check();if(b.done)break;if(!(b.value instanceof Uint8Array)||(bytes+=b.value.length)>8192)fail();chunks.push(b.value);}
   const v=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,bytes)));check();
   if(own(v,'ref')!==ref||own(own(v,'object'),'type')!=='commit'||own(own(v,'object'),'sha')!==admission.sourceRevision)fail();
   return true;
  };
  await Promise.race([work(),stopped]);check();s.claimAck=true;
  return Object.freeze({purpose:'afw.qa-closed-lifecycle-claim.v1',intentId:admission.intentId,sourceRevision:admission.sourceRevision,commentId:admission.commentId,claimed:true,authorizesEffects:false,operationalReadiness:false,mayRetry:false});
 }catch{fail();}
 finally{clearTimeout(timer);abort.abort();if(reader)void reader.cancel().catch(()=>{});}
}
