// Finite trial-specific inventory, outside the legacy closed-observation bundle.
import {AFW_FIXED_WORKFLOWS} from './mcp-fixed-terminal-workflows.mjs';
import {readPrivateFiniteLaunchObservation} from './mcp-qa-finite-launch-inventory.mjs';
import {finiteLauncherInstanceId,hashFiniteLaunchRecord} from './mcp-qa-finite-launch-records.mjs';
import {finiteHash} from './mcp-finite-evidence.mjs';
import {decodeFiniteInitialEntry,encodeFiniteInitialEntry} from './mcp-qa-finite-initial-entry-records.mjs';
const fail=()=>{throw Error('Fixed AFW workflow inventory unavailable');};
function fields(v,keys,strict=true){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||strict&&Reflect.ownKeys(v).length!==keys.length)fail();
 const out={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(v,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[key]=d.value;}return out;
}

/** Finite-only inventory. Every fixed definition AND the account definition list
 * is enumerated. Exceptions identify an exact instance, never a whole class. */
/** INTERNAL complete fixed enumeration; no active/absent exception is decided here. */
export async function readFiniteAfwWorkflowInventory(options){
 const keys=['read','assertCurrent'],o=fields(options,keys),{read,assertCurrent}=o;
 if(typeof read!=='function'||typeof assertCurrent!=='function')fail();
 const check=()=>{if(keys.some(k=>options[k]!==o[k]))fail();assertCurrent();};
 const get=async(path,query)=>{check();const r=await read(path,query);check();return r;};
 const afwScripts=new Set([...AFW_FIXED_WORKFLOWS.map(spec=>spec.script),'agent-friendly-web-delegated-canary']);
 const ids=new Set(),names=new Set();let reported;
 for(let page=1;page<=4;page++){
  const {value:rows,info}=await get('/workflows',{per_page:100,page});
  if(!Array.isArray(rows)||rows.length>100||info?.count!==rows.length||info.per_page!==100||
     !Number.isSafeInteger(info.total_count)||info.total_count<0||info.total_count>400||
     info.page!==undefined&&info.page!==page||info.total_pages!==undefined&&(!Number.isSafeInteger(info.total_pages)||info.total_pages<page||info.total_pages>4)||
     info.cursor!==undefined&&info.cursor!=='')fail();
  reported??=info.total_count;
  if(reported!==info.total_count)fail();
  for(const row of rows){
   if(typeof row?.id!=='string'||!row.id||row.id.length>128||ids.has(row.id)||typeof row.script_name!=='string'||!row.script_name)fail();
   ids.add(row.id);
   const spec=AFW_FIXED_WORKFLOWS.find(x=>x.id===row.id||x.name===row.name);
   if(!spec&&!afwScripts.has(row.script_name))continue;
   if(!spec||names.has(spec.name)||spec.id!==row.id||spec.name!==row.name||spec.script!==row.script_name||spec.className!==row.class_name||
      row.script_deleted===true||row.schedules!==undefined&&(!Array.isArray(row.schedules)||row.schedules.length))fail();
   names.add(spec.name);
  }
  if(ids.size===reported){
   if(names.size!==AFW_FIXED_WORKFLOWS.length||info.total_pages!==undefined&&info.total_pages!==page)fail();
   break;
  }
  if(ids.size>reported||rows.length!==100||page===4)fail();
 }
 let totalCount=0;const journal=[];
 for(const spec of AFW_FIXED_WORKFLOWS){
  const f=(await get('/workflows/'+spec.name)).value;if(f.id!==spec.id||f.name!==spec.name||f.script_name!==spec.script||f.class_name!==spec.className||f.script_deleted===true||f.schedules!==undefined&&(!Array.isArray(f.schedules)||f.schedules.length))fail();
  let cursor,total,pages,hasPages;const seen=new Set(),cursors=new Set();
  for(let page=0;page<4;page++){
   const {value:rows,info:i}=await get('/workflows/'+spec.name+'/instances',{per_page:100,direction:'desc',...(cursor?{cursor}:{})});
   if(!Array.isArray(rows)||rows.length>100||!i||i.per_page!==100||i.count!==rows.length||!Number.isSafeInteger(i.total_count)||i.total_count<0||i.total_count>400||i.page!==undefined&&i.page!==page+1||i.total_pages!==undefined&&(!Number.isSafeInteger(i.total_pages)||i.total_pages<page+1||i.total_pages>4))fail();
   if(total===undefined){total=i.total_count;pages=i.total_pages;hasPages=Object.hasOwn(i,'total_pages');}else if(total!==i.total_count||Object.hasOwn(i,'total_pages')!==hasPages||hasPages&&pages!==i.total_pages)fail();
   for(const row of rows){
    const x=fields(row,['id','status','workflow_id'],false);if(x.workflow_id!==spec.id||typeof x.id!=='string'||x.id.length<1||x.id.length>128||seen.has(x.id))fail();seen.add(x.id);
    journal.push({definition:spec.id,id:x.id,status:x.status});
   }
   const next=i.cursor;if(next===undefined||next===''){if(seen.size!==total||i.total_pages!==undefined&&i.total_pages!==page+1)fail();break;}
   if(page===3||typeof next!=='string'||!next.length||next.length>1024||/[\x00-\x20\x7f]/.test(next)||cursors.has(next))fail();cursors.add(next);cursor=next;
  }totalCount+=seen.size;
 }

 check();return Object.freeze({workflowCount:3,instanceCount:totalCount,instances:Object.freeze(journal.map(Object.freeze))});
}
/** Factual initial-only inventory. The caller retains and checks the original
 * entry lease. This observation grants no right to emit an activation. */
export async function readFiniteInitialAfwWorkflows(options){
 const keys=['read','assertCurrent','entry'],o=fields(options,keys),{read,assertCurrent,entry}=o;
 if(typeof read!=='function'||typeof assertCurrent!=='function')fail();
 const raw=encodeFiniteInitialEntry(entry),initial=decodeFiniteInitialEntry(raw);
 const check=()=>{
  const current=fields(options,keys);
  if(keys.some(k=>current[k]!==o[k])||encodeFiniteInitialEntry(entry)!==raw||Date.now()>=initial.operationDeadline)fail();
  assertCurrent();
 };
 check();
 const inventory=await readFiniteAfwWorkflowInventory({read,assertCurrent:check});check();
 let currentInitialObserved=0;
 for(const row of inventory.instances){
  const self=row.definition===AFW_FIXED_WORKFLOWS[2].id&&row.id===initial.initialInstanceId;
  if(self){if(!['running','waiting'].includes(row.status))fail();currentInitialObserved++;}
  else if(!['complete','errored','terminated'].includes(row.status))fail();
 }
 if(currentInitialObserved!==1)fail();
 check();
 return Object.freeze({purpose:'afw.finite-initial-workflows.v1',workflowCount:inventory.workflowCount,instanceCount:inventory.instanceCount,currentInitialObserved:true,otherWorkflowsTerminal:true,authorizesEffects:false,operationalReadiness:false});
}
function execution(q,confirmationId,observerId,launcherId){
 fields(q,['intentId','controlHash','sourceRevision','moduleHash','confirmationId','observerId','admissionHash',...(launcherId===undefined?[]:['launcherId'])]);
 if(typeof q.intentId!=='string'||!q.intentId.length||!(/^[a-f0-9]{64}$/).test(q.controlHash)||!(/^[a-f0-9]{40}$/).test(q.sourceRevision)||!(/^[a-f0-9]{64}$/).test(q.moduleHash)||!(/^[a-f0-9]{64}$/).test(q.admissionHash)||q.confirmationId!==confirmationId||q.observerId!==observerId||launcherId!==undefined&&q.launcherId!==launcherId)fail();
}
function phaseInventory({inventory,phase,confirmationId,observerId,qualifiedExecution:q,launcherId,allowMissing=false}){
 execution(q,confirmationId,observerId,launcherId);
 let confirmationSeen=0,observerSeen=0,launcherSeen=0;
 for(const x of inventory.instances){
  const nominal=x.definition===AFW_FIXED_WORKFLOWS[1].id&&x.id===confirmationId,observer=x.definition===AFW_FIXED_WORKFLOWS[2].id&&x.id===observerId,launcher=launcherId!==undefined&&x.definition===AFW_FIXED_WORKFLOWS[2].id&&x.id===launcherId;
  if(nominal)confirmationSeen++;if(observer)observerSeen++;if(launcher)launcherSeen++;
  const active=['running','waiting'].includes(x.status),terminal=['complete','errored','terminated'].includes(x.status);
  if(nominal&&['arm','nominal'].includes(phase)){if(!active&&!terminal)fail();}
  else if(launcher&&['arm','prelaunch'].includes(phase)){if(!active)fail();}
  else if(observer&&phase!=='qa_restore'){if(!active&&x.status!=='complete')fail();}
  else if(observer){if(x.status!=='complete')fail();}
  else if(!terminal)fail();
 }
 if(confirmationSeen!==(allowMissing?0:1)||observerSeen!==1||launcherSeen>1||launcherId!==undefined&&['prelaunch','nominal','canary_restore','qa_restore'].includes(phase)&&launcherSeen!==1)fail();
 return Object.freeze({purpose:'afw.finite-phase-workflows.v1',phase,...inventory,confirmationId,observerId,qualifiedExecution:q,authorizesEffects:false,operationalReadiness:false});
}
/** Existing public/raw validator remains strict: it cannot accept absence evidence. */
export async function readFiniteTrialAfwWorkflows(options){
 const keys=['read','assertCurrent','phase','confirmationId','observerId','qualifiedExecution'],o=fields(options,keys),{read,assertCurrent,phase,confirmationId,observerId,qualifiedExecution}=o;
 if(typeof read!=='function'||typeof assertCurrent!=='function'||!['arm','nominal','canary_restore','qa_restore'].includes(phase)||!/^afw-release-[a-f0-9]{64}$/.test(confirmationId)||typeof observerId!=='string'||!observerId.length||observerId.length>128||observerId===confirmationId)fail();
 execution(qualifiedExecution,confirmationId,observerId);
 const check=()=>{if(keys.some(k=>options[k]!==o[k]))fail();assertCurrent();};
 const inventory=await readFiniteAfwWorkflowInventory({read,assertCurrent:check});check();
 return phaseInventory({inventory,phase,confirmationId,observerId,qualifiedExecution});
}
/** Finite source phase composition. The ordinary reader above is unchanged;
 * absence still requires the private coordinator path, never this interface. */
export async function readFiniteLaunchTrialAfwWorkflows(options){
 const keys=['read','assertCurrent','phase','confirmationId','observerId','launcherId','qualifiedExecution'],o=fields(options,keys),{read,assertCurrent,phase,confirmationId,observerId,launcherId,qualifiedExecution:q}=o;
 if(typeof read!=='function'||typeof assertCurrent!=='function'||!['nominal','canary_restore','qa_restore'].includes(phase)||!/^afw-release-[a-f0-9]{64}$/.test(confirmationId)||typeof observerId!=='string'||!observerId.length||observerId.length>128||observerId===confirmationId||launcherId===observerId||launcherId!==finiteLauncherInstanceId({intentId:q.intentId,sourceRevision:q.sourceRevision}))fail();
 execution(q,confirmationId,observerId,launcherId);
 const check=()=>{if(keys.some(k=>options[k]!==o[k]))fail();assertCurrent();};
 const inventory=await readFiniteAfwWorkflowInventory({read,assertCurrent:check});check();
 return phaseInventory({inventory,phase,confirmationId,observerId,launcherId,qualifiedExecution:q});
}
/** INTERNAL synchronous consumption of actual decoded storage plus fixed source
 * provenance. Only the source inventory calls this under its coordinator; returned
 * data is never a capability and no public parser accepts it as authority. */
export function consumePrivateFiniteLaunchInventory(token){
 const {inventory,snapshot,execution:q,observedAt}=readPrivateFiniteLaunchObservation(token);
 const {plan:p,planHash,controlHash}=snapshot.control;
 if(q.intentId!==p.intentId||q.controlHash!==controlHash||q.sourceRevision!==p.source.revision||q.moduleHash!==p.source.moduleHash||q.confirmationId!==p.workflows.confirmation||q.observerId!==p.workflows.bootstrap||q.launcherId!==p.workflows.launcher||snapshot.sealed||snapshot.cleanupStarted||snapshot.state?.withdrawnAt!==undefined&&snapshot.state?.withdrawnAt!==null)fail();
 const identity={intentId:p.intentId,finitePlanHash:planHash,controlHash,sourceRevision:p.source.revision,qaVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,launcherId:p.workflows.launcher,nominalId:p.workflows.confirmation};
 if(snapshot.send){
  execution(q,p.workflows.confirmation,p.workflows.bootstrap,p.workflows.launcher);
  // SEND with absent provider instance stays unresolved, never never-issued.
  return Object.freeze({kind:'issued',...identity,sendHash:hashFiniteLaunchRecord(snapshot.send),...(snapshot.ack?{ackHash:hashFiniteLaunchRecord(snapshot.ack)}:{}),provider:inventory.instances.find(x=>x.definition===AFW_FIXED_WORKFLOWS[1].id&&x.id===p.workflows.confirmation)??null,observedAt});
 }
 if(snapshot.ack)fail();
 const phase=snapshot.prepared?'prelaunch':'arm';
 if(!Number.isSafeInteger(observedAt)||observedAt<p.T0||observedAt>=p.launchPolicy.lastCreateAt||phase==='arm'&&observedAt>p.launchPolicy.armAckBy||phase==='prelaunch'&&(!snapshot.nominalClaim||snapshot.guard?.state!=='armed'||snapshot.guard.deliveries!==0||snapshot.guard.nextAt!==p.C0||snapshot.alarm!==p.C0||snapshot.state?.phase!=='armed'))fail();
 phaseInventory({inventory,phase,confirmationId:p.workflows.confirmation,observerId:p.workflows.bootstrap,qualifiedExecution:q,launcherId:p.workflows.launcher,allowMissing:true});
 return Object.freeze({kind:'never_issued',...identity,phase,journalSnapshotHash:snapshot.journalSnapshotHash,controlSnapshotHash:snapshot.controlSnapshotHash,inventoryHash:finiteHash(inventory),observedAt});
}
