import {createHash} from 'node:crypto';
import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {observeOwnRetiredCustody} from './mcp-own-retirement-host.mjs';
const NAME='afw-own-event-first-successor-v1',SLOT='afw.own-successor.v1';
const fail=()=>{throw Error('Private successor retirement unavailable');};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const exact=(v,keys)=>{if(!v||![Object.prototype,null].includes(Object.getPrototypeOf(v))||Reflect.ownKeys(v).length!==keys.length)fail();const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);};
const names=['AFW_DOSSIER_SUCCESSOR_RETIREMENT_READ_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_POLICY','AFW_DOSSIER_EVENTS_NODE_NAME','AFW_DOSSIER_SUCCESSOR_ENABLED','AFW_DOSSIER_SUCCESSOR_POLICY','AFW_DOSSIER_RETIREMENT_READ_ENABLED','AFW_DOSSIER_RETIREMENT_POLICY','AFW_OAUTH_ISSUER','AFW_OAUTH_RESOURCE','AFW_OAUTH_PILOT_CLIENT_ID','AFW_OAUTH_PILOT_PROJECT_ID','DB','AFW_DOSSIER_EVENTS_PROJECTION_SECRET','AFW_DOSSIER_EVENTS_CUSTODY_KEY','AFW_DOSSIER_EVENTS_NODE'];
const columns=['slot','trial_id','predecessor_container_id','predecessor_generation','predecessor_program_hash','predecessor_source_revision','application_id','container_id','program_hash','source_revision','scope_hash','start_at','expires_at','budget','closed_at','stopped_at','observed_at','reserved_at','state'];
/** Private historical readback of the one named successor. No Container/runtime,
 * provider credential, mutation, caller selector or replacement original policy.
 * Native sealed withdrawal and physical-stop evidence remain separate gates. */
export async function observeOwnSuccessorRetiredCustody({env,ctx,program,sourceRevision,now=Date.now}={}){
 if(env?.AFW_DOSSIER_SUCCESSOR_RETIREMENT_READ_ENABLED!=='true')fail();
 let timer,finished=false,last=-1;const end=performance.now()+5000;
 try{
  if(typeof now!=='function'||typeof program!=='string'||!program.length||!hex(sourceRevision,40))fail();
  const clock=()=>{const n=now(),m=performance.now();if(finished||!Number.isFinite(m)||m>=end||!time(n)||n<last)fail();last=n;return n;};
  const pins=Object.freeze(Object.fromEntries(names.map(k=>[k,env[k]]))),c=readDossierEventHostPolicy({enabled:true,env,historical:true,now:clock}),p=c.policy,namespace=pins.AFW_DOSSIER_EVENTS_NODE;
  if(pins.AFW_DOSSIER_EVENTS_NODE_NAME!==NAME||typeof pins.AFW_DOSSIER_SUCCESSOR_POLICY!=='string'||pins.AFW_DOSSIER_SUCCESSOR_POLICY.length>8192||typeof pins.DB?.withSession!=='function')fail();
  const raw=exact(JSON.parse(pins.AFW_DOSSIER_SUCCESSOR_POLICY),['scope','original','candidate','publication']),publication=exact(raw.publication,['artifactKey','workerHash','activationKey']);
  if(!Object.values(publication).every(v=>hex(v,64)))fail();
  const resolved=resolveSuccessorPreparation({scope:raw.scope,original:raw.original,candidate:raw.candidate,namespace}),candidate=resolved.candidate,original=resolved.original;
  if(candidate.containerId!==p.containerId||candidate.programHash!==createHash('sha256').update(program).digest('hex')||candidate.sourceRevision!==sourceRevision||candidate.startAt!==p.startAt||candidate.expiresAt!==p.expiresAt||resolved.manifest.scope.resource!==p.resource)fail();
  const storage=ctx.storage,transaction=storage?.transaction,id=ctx.id,primary=pins.DB.withSession('first-primary'),prepare=primary?.prepare;
  if(typeof transaction!=='function'||typeof prepare!=='function')fail();
  const current=()=>{c.current();if(!names.every(k=>env[k]===pins[k])||ctx.storage!==storage||storage.transaction!==transaction||ctx.id!==id||id.toString()!==p.containerId||primary.prepare!==prepare)fail();clock();};current();
  const readReservation=async()=>{
   current();const rawRow=await primary.prepare('SELECT '+columns.join(',')+' FROM dossier_successor_reservations WHERE slot=?').bind(SLOT).first();current();
   const r=exact(rawRow,columns),expected={slot:SLOT,trial_id:candidate.trialId,predecessor_container_id:original.containerId,predecessor_program_hash:original.programHash,predecessor_source_revision:original.sourceRevision,application_id:original.applicationId,container_id:candidate.containerId,program_hash:candidate.programHash,source_revision:candidate.sourceRevision,scope_hash:candidate.scopeHash,start_at:candidate.startAt,expires_at:candidate.expiresAt,budget:1,state:'prepared'};
   if(Object.keys(expected).some(k=>r[k]!==expected[k])||!hex(r.predecessor_generation,64)||!['closed_at','stopped_at','observed_at','reserved_at'].every(k=>time(r[k]))||r.closed_at>r.observed_at||r.stopped_at>r.observed_at||r.observed_at>r.reserved_at||r.reserved_at-r.observed_at>30000||r.reserved_at<candidate.startAt||r.reserved_at>=candidate.expiresAt||r.reserved_at>clock())fail();
   return r;
  };
  // Explicit shadow is private to this read. The original retirement policy in
  // env remains untouched, including when its flag/policy are absent or closed.
  const shadow={...pins,AFW_DOSSIER_RETIREMENT_READ_ENABLED:'true',AFW_DOSSIER_RETIREMENT_POLICY:JSON.stringify({...p,programHash:candidate.programHash,sourceRevision})};
  const work=async()=>{const before=await readReservation();current();const result=await observeOwnRetiredCustody({env:shadow,ctx,now:clock});current();const after=await readReservation();if(JSON.stringify(before)!==JSON.stringify(after))fail();current();return result;};
  return await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Private successor retirement unavailable')),5000);})]);
 }catch{fail();}finally{finished=true;clearTimeout(timer);}
}
