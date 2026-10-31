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
export async function readTerminalAfwWorkflows(options){
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
   for(const row of rows){const x=fields(row,['id','status','workflow_id'],false);if(x.workflow_id!==spec.id||typeof x.id!=='string'||!x.id.length||new TextEncoder().encode(x.id).length>128||!['complete','errored','terminated'].includes(x.status)||ids.has(x.id))fail();ids.add(x.id);}
   if(page===0){total=info.total_count;pages=info.total_pages;hasPages=Object.hasOwn(info,'total_pages');}else if(info.total_count!==total||Object.hasOwn(info,'total_pages')!==hasPages||hasPages&&info.total_pages!==pages)fail();
   if(ids.size>total||total>400)fail();
   const next=info.cursor;
   if(next===undefined||next===''){if(info.total_count!==ids.size||info.total_pages!==undefined&&info.total_pages!==page+1)fail();return ids.size;}
   if(typeof next!=='string'||new TextEncoder().encode(next).length>1024||[...next].some(c=>c.charCodeAt(0)<=32||c.charCodeAt(0)===127)||cursors.has(next))fail();cursors.add(next);cursor=next;
  }fail();
 };
 check();const specs=includeBootstrap?AFW_FIXED_WORKFLOWS:AFW_FIXED_WORKFLOWS.slice(0,2),counts=[];for(let i=0;i<specs.length;i+=2){counts.push(...await Promise.all(specs.slice(i,i+2).map(terminal)));check();}
 return Object.freeze({purpose:'afw.fixed-terminal-workflows.v1',workflowCount:specs.length,instanceCount:counts.reduce((a,b)=>a+b,0),authorizesEffects:false,operationalReadiness:false});
}
