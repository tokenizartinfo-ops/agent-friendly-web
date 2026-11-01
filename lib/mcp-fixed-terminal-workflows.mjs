const fail=()=>{throw Error('Fixed AFW workflow inventory unavailable');};
export const AFW_FIXED_WORKFLOWS=Object.freeze([
 Object.freeze({name:'afw-release-administrative',id:'0ee9231b-8952-46bd-8124-a0c5dbb06dd0',script:'agent-friendly-web-release-operator',className:'AfwReleaseWorkflow'}),
 Object.freeze({name:'afw-own-qa-private-confirmation',id:'707e5440-2af3-4a0c-8fff-d40efc9895c4',script:'agent-friendly-web-independent-closure-qa',className:'PrivateQaNamedConfirmation'}),
 Object.freeze({name:'afw-own-qa-private-bootstrap',id:'06b6c3eb-ce59-4594-8b9e-2636977d56da',script:'agent-friendly-web-independent-closure-qa',className:'PrivateQaBootstrap'})
]);
function fields(v,keys,strict=true){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||strict&&Reflect.ownKeys(v).length!==keys.length)fail();
 const out={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(v,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[key]=d.value;}return out;
}
/** Fixed-resource read only. False excludes the bootstrap guard that is itself
 * performing canary closure. External QA editing must include bootstrap and
 * independently reject unregistered additional QA definitions. */
async function readFixedWorkflows(options,currentBootstrapId){
 let selfSeen=0;
 if(currentBootstrapId!==null&&(typeof currentBootstrapId!=='string'||!/^afw-qa-arm-[a-f0-9]{64}$/.test(currentBootstrapId)))fail();
 const keys=['read','assertCurrent','includeBootstrap'],p=fields(options,keys),{read,assertCurrent,includeBootstrap}=p;
 if(typeof read!=='function'||typeof assertCurrent!=='function'||typeof includeBootstrap!=='boolean')fail();
 const check=()=>{const c=fields(options,keys);if(keys.some(k=>c[k]!==p[k]))fail();assertCurrent();};
 const get=async(path,query)=>{check();const r=await read(path,query);check();return r;};
 const terminal=async spec=>{
  const f=(await get('/workflows/'+spec.name)).value;check();
  if(f.id!==spec.id||f.name!==spec.name||f.script_name!==spec.script||f.class_name!==spec.className||f.script_deleted===true||f.schedules!==undefined&&(!Array.isArray(f.schedules)||f.schedules.length))fail();
  const ids=new Set(),cursors=new Set();let cursor,total,pages,hasPages;
  for(let page=0;page<4;page++){
   const {value:rows,info}=await get('/workflows/'+spec.name+'/instances',{per_page:100,direction:'desc',...cursor?{cursor}:{}});check();if(!info)fail();
   fields(info,['per_page','count','total_count',...['page','total_pages','cursor'].filter(k=>Object.hasOwn(info,k))]);
   if(!Array.isArray(rows)||rows.length>100||info.per_page!==100||info.count!==rows.length||!Number.isSafeInteger(info.total_count)||info.total_count<0||info.page!==undefined&&info.page!==page+1||info.total_pages!==undefined&&(!Number.isSafeInteger(info.total_pages)||info.total_pages<page+1||info.total_pages>4))fail();
   for(const row of rows){const x=fields(row,['id','status','workflow_id'],false);if(x.workflow_id!==spec.id||typeof x.id!=='string'||!x.id.length||new TextEncoder().encode(x.id).length>128||ids.has(x.id))fail();const self=currentBootstrapId!==null&&spec.name==='afw-own-qa-private-bootstrap'&&x.id===currentBootstrapId;if(self){if(!['running','waiting'].includes(x.status))fail();selfSeen++;}else if(!['complete','errored','terminated'].includes(x.status))fail();ids.add(x.id);}
   if(page===0){total=info.total_count;pages=info.total_pages;hasPages=Object.hasOwn(info,'total_pages');}else if(info.total_count!==total||Object.hasOwn(info,'total_pages')!==hasPages||hasPages&&info.total_pages!==pages)fail();
   if(ids.size>total||total>400)fail();
   const next=info.cursor;
   if(next===undefined||next===''){if(info.total_count!==ids.size||info.total_pages!==undefined&&info.total_pages!==page+1)fail();return ids.size;}
   if(typeof next!=='string'||new TextEncoder().encode(next).length>1024||[...next].some(c=>c.charCodeAt(0)<=32||c.charCodeAt(0)===127)||cursors.has(next))fail();cursors.add(next);cursor=next;
  }fail();
 };
 check();const specs=includeBootstrap?AFW_FIXED_WORKFLOWS:AFW_FIXED_WORKFLOWS.slice(0,2),counts=[],width=currentBootstrapId===null?2:3;for(let i=0;i<specs.length;i+=width){counts.push(...await Promise.all(specs.slice(i,i+width).map(terminal)));check();}
 if(currentBootstrapId!==null&&selfSeen!==1)fail();
 return Object.freeze({purpose:currentBootstrapId===null?'afw.fixed-terminal-workflows.v1':'afw.arm-quiescent-workflows.v1',workflowCount:specs.length,instanceCount:counts.reduce((a,b)=>a+b,0),...currentBootstrapId===null?{}:{otherWorkflowsTerminal:true,currentBootstrapObserved:true},authorizesEffects:false,operationalReadiness:false});
}

/** Legacy closure/rollback remains strict: no running self exception. */
export async function readTerminalAfwWorkflows(options){return readFixedWorkflows(options,null);}
/** Only the native ARM wrapper may nominate its own exact instance. Workflow
 * API version_id is NOT a Worker UUID or execution provenance witness. */
export async function readArmQuiescentAfwWorkflows(options){
 const keys=['read','assertCurrent','currentBootstrapId'],p=fields(options,keys),{read,assertCurrent,currentBootstrapId}=p;
 const check=()=>{const c=fields(options,keys);if(keys.some(k=>c[k]!==p[k]))fail();assertCurrent();};
 check();return readFixedWorkflows({read,assertCurrent:check,includeBootstrap:true},currentBootstrapId);
}

/** Finite-only inventory. Every fixed definition AND the account definition list
 * is enumerated. Exceptions identify an exact instance, never a whole class. */
export async function readFiniteTrialAfwWorkflows(options){
 const keys=['read','assertCurrent','phase','confirmationId','observerId','qualifiedExecution'],o=fields(options,keys),{read,assertCurrent,phase,confirmationId,observerId,qualifiedExecution:q}=o;
 if(typeof read!=='function'||typeof assertCurrent!=='function'||!['arm','nominal','canary_restore','qa_restore'].includes(phase)||!/^afw-release-[a-f0-9]{64}$/.test(confirmationId)||typeof observerId!=='string'||!observerId.length||observerId.length>128||observerId===confirmationId)fail();
 fields(q,['intentId','controlHash','sourceRevision','moduleHash','confirmationId','observerId','admissionHash']);
 if(typeof q.intentId!=='string'||!q.intentId.length||!(/^[a-f0-9]{64}$/).test(q.controlHash)||!(/^[a-f0-9]{40}$/).test(q.sourceRevision)||!(/^[a-f0-9]{64}$/).test(q.moduleHash)||!(/^[a-f0-9]{64}$/).test(q.admissionHash)||q.confirmationId!==confirmationId||q.observerId!==observerId)fail();
 const check=()=>{if(keys.some(k=>options[k]!==o[k]))fail();assertCurrent();};
 const get=async(path,query)=>{check();const r=await read(path,query);check();return r;};
 const definitions=await get('/workflows',{per_page:100,page:1}),info=definitions.info;
 if(!Array.isArray(definitions.value)||definitions.value.length!==AFW_FIXED_WORKFLOWS.length||!info||info.count!==definitions.value.length||info.total_count!==definitions.value.length||info.per_page!==100||info.page!==undefined&&info.page!==1||info.total_pages!==undefined&&info.total_pages!==1||info.cursor)fail();
 const names=new Set();for(const row of definitions.value){const spec=AFW_FIXED_WORKFLOWS.find(s=>s.name===row.name);if(!spec||names.has(row.name)||row.id!==spec.id||row.script_name!==spec.script||row.class_name!==spec.className)fail();names.add(row.name);}
 let confirmationSeen=0,observerSeen=0,totalCount=0;const journal=[];
 for(const spec of AFW_FIXED_WORKFLOWS){
  const f=(await get('/workflows/'+spec.name)).value;if(f.id!==spec.id||f.name!==spec.name||f.script_name!==spec.script||f.class_name!==spec.className||f.script_deleted===true||f.schedules!==undefined&&(!Array.isArray(f.schedules)||f.schedules.length))fail();
  let cursor,total;const seen=new Set(),cursors=new Set();
  for(let page=0;page<4;page++){
   const {value:rows,info:i}=await get('/workflows/'+spec.name+'/instances',{per_page:100,direction:'desc',...(cursor?{cursor}:{})});
   if(!Array.isArray(rows)||rows.length>100||!i||i.per_page!==100||i.count!==rows.length||!Number.isSafeInteger(i.total_count)||i.total_count<0||i.total_count>400||i.page!==undefined&&i.page!==page+1||i.total_pages!==undefined&&(!Number.isSafeInteger(i.total_pages)||i.total_pages<page+1||i.total_pages>4))fail();
   if(total===undefined)total=i.total_count;else if(total!==i.total_count)fail();
   for(const row of rows){
    const x=fields(row,['id','status','workflow_id'],false);if(x.workflow_id!==spec.id||typeof x.id!=='string'||x.id.length<1||x.id.length>128||seen.has(x.id))fail();seen.add(x.id);
    const nominal=spec.className==='PrivateQaNamedConfirmation'&&x.id===confirmationId,observer=spec.className==='PrivateQaBootstrap'&&x.id===observerId;
    if(nominal)confirmationSeen++;if(observer)observerSeen++;
    const active=['running','waiting'].includes(x.status),terminal=['complete','errored','terminated'].includes(x.status);
    if(nominal&&['arm','nominal'].includes(phase)){if(!active&&!terminal)fail();}
    else if(observer&&phase!=='qa_restore'){if(!active&&x.status!=='complete')fail();}
    else if(observer){if(x.status!=='complete')fail();}
    else if(!terminal)fail();
    journal.push({definition:spec.id,id:x.id,status:x.status});
   }
   const next=i.cursor;if(next===undefined||next===''){if(seen.size!==total||i.total_pages!==undefined&&i.total_pages!==page+1)fail();break;}
   if(page===3||typeof next!=='string'||next.length>1024||cursors.has(next))fail();cursors.add(next);cursor=next;
  }totalCount+=seen.size;
 }
 if(confirmationSeen!==1||observerSeen!==1)fail();check();
 return Object.freeze({purpose:'afw.finite-phase-workflows.v1',phase,workflowCount:3,instanceCount:totalCount,confirmationId,observerId,qualifiedExecution:q,instances:Object.freeze(journal),authorizesEffects:false,operationalReadiness:false});
}
