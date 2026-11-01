import {createHash} from 'node:crypto';
import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
import {parseOwnPermissionWithdrawalPolicy} from './mcp-own-permission-withdrawal-policy.mjs';
import {createOwnPermissionsOnlyReduction,createOwnPermissionsOnlyObservation} from './mcp-own-permission-withdrawal.mjs';
import {finiteControlIdentity,finiteFields as fields,finiteHash as hash,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
const fail=()=>{throw Error('Finite native reduction unavailable');};
const sha=s=>createHash('sha256').update(s).digest('hex');
/** Separate original C1 cleanup authority. Live OAuth/N1 does not authorize or
 * prevent reduction. Native historical policy is read unchanged; no shadow env.
 * Every effect has its own candidate issued journal before one business send. */
export function createFiniteOwnReductionActions({ctx,env,control,program,programSourceRevision,close,now=Date.now}={}){
 const c=finiteControlIdentity(control),p=c.plan,storage=ctx?.storage,prefix='afw.own-finite-reduction.v1:'+p.intentId+':';
 if(typeof storage?.transaction!=='function'||typeof storage?.get!=='function'||typeof close!=='function'||typeof program!=='string'||sha(program)!==p.selectors.programHash||programSourceRevision!==p.selectors.sourceRevision||typeof now!=='function'||env?.AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED!=='true')fail();
 const raw=env.AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY,policy=parseOwnPermissionWithdrawalPolicy(raw);
 if(JSON.stringify(policy)!==raw||sha(raw)!==p.withdrawalPolicyHash||policy.containerId!==p.resources.containerId||policy.programHash!==p.selectors.programHash||policy.sourceRevision!==p.selectors.sourceRevision||policy.startAt!==p.C0||policy.expiresAt!==p.C1||policy.originalConsent.issuedAt<p.selectors.startAt||policy.originalConsent.expiresAt>p.selectors.expiresAt)fail();
 const native=readDossierEventHostPolicy({enabled:true,env,historical:true,now}),n=native.policy;
 if(['grantId','subject','projectId','clientId','resource','startAt','expiresAt'].some(k=>n[k]!==p.selectors[k])||n.containerId!==p.resources.containerId||ctx.id.toString()!==p.resources.containerId||native.pins.DB!==env.DB)fail();
 const current=()=>{native.current();const at=now();if(env.AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED!=='true'||env.AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY!==raw||ctx.storage!==storage||ctx.id.toString()!==p.resources.containerId||!time(at)||at<p.C0||at>=p.C1)fail();return at;};
 const options=clock=>({enabled:true,db:native.pins.DB,context:{grantId:n.grantId,subject:n.subject,projectId:n.projectId,clientId:n.clientId,resource:n.resource},originalConsent:policy.originalConsent,window:{startAt:p.C0,expiresAt:p.C1},requestId:policy.requestId,now:clock});
 const refs=value=>{const x=fields(value,['intentId','controlHash']);if(x.intentId!==p.intentId||x.controlHash!==c.controlHash)fail();current();};
 async function invoke(kind,send,value,assertParent=()=>{}){
  refs(value);if(typeof assertParent!=='function')fail();
  const entered=current(),mono=performance.now(),abort=new AbortController();let finished=false,timer;
  const check=()=>{assertParent();const at=current();if(finished||abort.signal.aborted||at<entered||at-entered>=30000||performance.now()-mono>=30000)fail();return at;};
  const key=prefix+kind;
  const observed=async()=>{
   check();const record=await storage.get(key);check();if(record===undefined)return null;
   fields(record,['purpose','intentId','controlHash','kind','phase','issuedAt','receipt','completedAt']);
   if(record.purpose!=='afw.own-finite-reduction.v1'||record.intentId!==p.intentId||record.controlHash!==c.controlHash||record.kind!==kind||!['issued','complete'].includes(record.phase)||!time(record.issuedAt)||record.issuedAt<p.C0||record.issuedAt>=p.C1)fail();
   if(kind==='withdraw'){
    // Independent primary facts may resolve a lost D1 ACK; never resend.
    const r=await createOwnPermissionsOnlyObservation(options(check)).observe();check();return r.permissionsWithdrawn===true?r:null;
   }
   if(record.phase!=='complete')return null;
   const r=fields(record.receipt,['closed','runtimeStopRequested']);if(r.closed!==true||r.runtimeStopRequested!==true||!time(record.completedAt)||record.completedAt<record.issuedAt||record.completedAt>=p.C1)fail();return r;
  };
  const work=async()=>{
   check();if(!send)return observed();
   const issued={purpose:'afw.own-finite-reduction.v1',intentId:p.intentId,controlHash:c.controlHash,kind,phase:'issued',issuedAt:check(),receipt:null,completedAt:null};
   await storage.transaction(async tx=>{check();if(await tx.get(key)!==undefined)fail();check();await tx.put(key,issued);check();});check();
   const receipt=kind==='withdraw'?await createOwnPermissionsOnlyReduction(options(check)).withdraw():await close({signal:abort.signal,assertCurrent:check,expiresAt:Math.min(p.C1,check()+5000)});
   check();if(kind==='withdraw'){if(receipt?.purpose!=='afw.own-permissions-only-reduction.v1'||receipt.permissionsWithdrawn!==true||receipt.runtimeStopRequested!==false)fail();}
   else {fields(receipt,['closed','runtimeStopRequested']);if(receipt.closed!==true||receipt.runtimeStopRequested!==true)fail();}
   const complete={...issued,phase:'complete',receipt,completedAt:check()};
   await storage.transaction(async tx=>{check();if(!same(await tx.get(key),issued))fail();check();await tx.put(key,complete);check();});check();
   const readback=await storage.get(key);check();if(hash(readback)!==hash(complete))fail();return receipt;
  };
  try{return await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;abort.abort();reject(Error('Finite reduction unavailable'));},Math.max(1,Math.min(30000,p.C1-entered)));})]);}
  finally{finished=true;abort.abort();clearTimeout(timer);}
 }
 return Object.freeze({
  withdraw:(value,assertParent)=>invoke('withdraw',true,value,assertParent),
  close:(value,assertParent)=>invoke('close',true,value,assertParent),
  read:async(value,assertParent)=>({withdraw:await invoke('withdraw',false,value,assertParent),close:await invoke('close',false,value,assertParent)})
 });
}
