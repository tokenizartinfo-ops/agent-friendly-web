import {prepareCatalogDiscoveryWindow,createCatalogDiscoveryClient,inspectCatalogDiscoveryArtifact,inspectCatalogDiscoveryGrant,createCatalogDiscoveryVersion} from './catalog-discovery-trial-contract.mjs';
const CONTROL_TARGET=Object.freeze({account:'85d0d5dadac3341a564f22ce885e9eec',worker:'agent-friendly-web-delegated-canary',operator:'agent-friendly-web-release-operator',workflow:'afw-release-administrative',workflowId:'0ee9231b-8952-46bd-8124-a0c5dbb06dd0',db:'6a728254-1494-4039-802e-b39288a55fcc',kv:'6b94ff702e504e14a7730cee73a0f6ff',application:'d6fc71552de7494a863aca20365a572d',client:'afw-chatgpt-pilot-20261003',project:'oauth-canary-owner',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp'});
const CONTROL_KEYS=['compatibility_date','compatibility_flags','containers','exports','limits','placement','usage_model','cache_options','assets','package_dependencies'];
const CONTROL_GRANTS_SQL="SELECT g.id,g.user_id,p.user_id AS project_owner,g.client_id,g.project_id,g.resource,g.scopes_json,g.created_at,g.expires_at,g.exchanged_at,g.revoked_at,(SELECT COUNT(*) FROM dossier_node_process_closures c WHERE c.grant_id=g.id) AS closure_count FROM delegated_access_grants g JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id WHERE g.project_id=? AND g.client_id=? AND g.resource=? AND g.created_at>=? AND g.created_at<? ORDER BY g.created_at DESC,g.id DESC LIMIT 2";
const CONTROL_COUNTS_SQL="SELECT (SELECT COUNT(*) FROM dossier_successor_reservations WHERE slot=?) reserved,(SELECT COUNT(*) FROM delegated_access_grants WHERE project_id=? AND client_id=? AND resource=? AND revoked_at='' AND expires_at>?) active_grants";

/** INTERNAL fixed-target operator only. No endpoint or consent/admission authority.
 * Caller owns its accepted pin/primary baseline. Unknown writes are NEVER retried.
 * API cancellation and CAS are unavailable; receipts describe dated snapshots.
 */
export async function runCatalogDiscoveryControl(input,context={}){
 const t=CONTROL_TARGET,R='/accounts/'+t.account,W=t.worker,OP=t.operator,F=t.workflow;
 const mutations={clientPut:0,versionPost:0,deploymentPost:0,clientDelete:0};
 let send;
 let stage='input',terminal=false,invocationDeadlineReached=false,apiReads=0,selects=0,registryObservations=0,registryRechecks=0,candidate=null,liveDeployment=null,intendedConfigurationHash=null,catalogDispatchBefore=null,p,now,mono,lastW,lastM,endM,timeout;
 const fail=()=>{throw Error('Own catalog control unavailable');};
 const hex=(x,n)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x),uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(x);
 const canon=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a.localeCompare(b))):x);
 const hash=async x=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',typeof x==='string'?new TextEncoder().encode(x):x))).map(x=>x.toString(16).padStart(2,'0')).join('');
 const exact=(x,keys)=>{if(!x||Object.getPrototypeOf(x)!==Object.prototype)fail();const d=Object.getOwnPropertyDescriptors(x);if(Reflect.ownKeys(d).length!==keys.length||keys.some(k=>!d[k]?.enumerable||!Object.hasOwn(d[k],'value')))fail();return Object.fromEntries(keys.map(k=>[k,d[k].value]));};
 const result=(status,extra={})=>({status,phase:p?.phase??null,stage,checkedAt:new Date().toISOString(),candidate,liveDeployment,configurationHash:intendedConfigurationHash,apiReads,selects,registryObservations,registryRechecks,mutations:{...mutations},mayRetry:false,observedSnapshotOnly:true,apiCancellationSupported:false,operationalReadiness:false,...invocationDeadlineReached?{deadlineExceeded:true}:{},...extra});
 const anyWrite=()=>Object.values(mutations).some(Boolean);
 try{
  p=structuredClone(exact(input,['mode','phase','window','baseline','live']));
  if(!['preflight','live'].includes(p.mode)||!['open','catalog','close'].includes(p.phase)||context.accountId!==t.account||typeof context.request!=='function')fail();
  exact(p.window,['startAt','expiresAt','trialId']);exact(p.baseline,['pin','configurationHash','canaryDeployment','operatorVersion','operatorDeployment','operatorHash','operatorBytes','operatorConfigurationHash','workflowVersion']);
  const b=p.baseline;if(!['canaryDeployment','operatorVersion','operatorDeployment','workflowVersion'].every(k=>uuid(b[k]))||!hex(b.configurationHash,64)||!hex(b.operatorHash,64)||!hex(b.operatorConfigurationHash,64)||!Number.isSafeInteger(b.operatorBytes)||b.operatorBytes<1||b.operatorBytes>2097152)fail();
  if(p.live!==null){exact(p.live,['versionId','deploymentId','configurationHash']);if(!uuid(p.live.versionId)||!uuid(p.live.deploymentId)||!hex(p.live.configurationHash,64)||p.live.versionId===b.pin.baseVersionId)fail();}
  if(p.phase==='open'&&p.live!==null||p.phase==='catalog'&&p.live===null)fail();
  send=context.request;now=context.now??Date.now;mono=context.monotonic??(()=>performance.now());timeout=context.timeoutMs??110000;
  if(typeof now!=='function'||typeof mono!=='function'||!Number.isSafeInteger(timeout)||timeout<1||timeout>110000)fail();
  lastW=now();lastM=mono();endM=lastM+timeout;
  if(!Number.isSafeInteger(lastW)||lastW<0||!Number.isFinite(lastM))fail();
 }catch{return result('blocked');}
 const check=()=>{
  const w=now(),m=mono();if(Number.isFinite(m)&&Number.isFinite(endM)&&endM>lastM&&m>=endM)invocationDeadlineReached=true;if(terminal||context.request!==send||context.accountId!==t.account||!Number.isSafeInteger(w)||w<0||!Number.isFinite(m)||w<lastW||m<lastM||m>=endM)fail();
  if(p.mode==='live'&&p.phase!=='close'&&(w<p.window.startAt||w>=p.window.expiresAt))fail();
  if(p.phase==='catalog'&&catalogDispatchBefore!==null&&w>=catalogDispatchBefore)fail();lastW=w;lastM=m;return w;
 };
 const envelope=r=>{if(r?.success!==true||!Number.isInteger(r.status)||r.status<200||r.status>=300||r.errors!=null&&(!Array.isArray(r.errors)||r.errors.length))fail();return r.result;};
 const call=async(o,kind='read')=>{
  const w=check();if(kind==='select'){if(++selects>10||o.method!=='POST'||o.path!==R+'/d1/database/'+t.db+'/query'||!o.body.sql.startsWith('SELECT '))fail();}
  else if(kind==='read'){if(++apiReads>64||!['GET','POST'].includes(o.method)||o.method==='POST'&&!o.path.endsWith('/bulk/get'))fail();}
  else{if(p.mode!=='live'||!Object.hasOwn(mutations,kind)||mutations[kind]!==0||p.phase!=='close'&&w>=p.window.expiresAt-90000)fail();mutations[kind]=1;}
  const r=await send(o);check();envelope(r);return structuredClone(r);
 };
 const get=(suffix,query)=>call({method:'GET',path:R+suffix,...query?{query}:{}});
 const current=async n=>{const r=envelope(await get('/workers/scripts/'+n+'/deployments'));return(Array.isArray(r)?r:r?.deployments)?.[0];};
 const pointer=(d,v,id)=>{if(d?.id!==id||!uuid(d.id)||d.strategy!=='percentage'||d.versions?.length!==1||d.versions[0].version_id!==v||d.versions[0].percentage!==100)fail();};
 const fingerprint=async v=>{const c={};for(const k of CONTROL_KEYS)if(Object.hasOwn(v,k))c[k]=v[k];if(!Array.isArray(v.bindings))fail();c.bindings=v.bindings.map(x=>x.type==='secret_text'?{name:x.name,type:x.type}:x).sort((a,b)=>a.name.localeCompare(b.name));return hash(canon(c));};
 const moduleProof=async(v,id,expectedHash,bytes,configurationHash)=>{
  if(v?.id!==id||v.main_module!=='index.mjs'||v.modules?.length!==1||v.modules[0].name!=='index.mjs'||v.modules[0].content_type!=='application/javascript+module'||typeof v.modules[0].content_base64!=='string'||!Array.isArray(v.urls)||v.urls.length)fail();
  const raw=Uint8Array.from(atob(v.modules[0].content_base64),x=>x.charCodeAt(0));if(raw.length!==bytes||await hash(raw)!==expectedHash||await fingerprint(v)!==configurationHash)fail();check();return v;
 };
 const version=async(n,id)=>envelope(await get('/workers/workers/'+n+'/versions/'+id,{include:'modules'}));
 const complete=(r,optionalTotal=false)=>{
  const rows=envelope(r),i=r.result_info;if(!Array.isArray(rows)||!i||i.per_page!==100||i.count!==rows.length||rows.length>100||i.cursor||i.next_cursor||i.has_more!==undefined&&i.has_more!==false||i.page!==undefined&&i.page!==1||i.total_pages!==undefined&&i.total_pages!==1)fail();
  if(optionalTotal){if(i.page!==1||i.total_pages!==1||i.total_count!==undefined&&i.total_count!==rows.length)fail();}else if(i.total_count!==rows.length)fail();return rows;
 };
 const passive=async()=>{
  const f=envelope(await get('/workflows/'+F));if(f?.id!==t.workflowId||f.name!==F||f.script_name!==OP||f.class_name!=='AfwReleaseWorkflow'||f.script_deleted===true||f.schedules!==undefined&&(!Array.isArray(f.schedules)||f.schedules.length))fail();
  const vs=complete(await get('/workflows/'+F+'/versions',{page:1,per_page:100}),true),v=vs[0];if(v?.id!==p.baseline.workflowVersion||v.workflow_id!==t.workflowId||v.class_name!=='AfwReleaseWorkflow'||canon(v.limits)!==canon({steps:1})||canon(v.concurrency)!==canon({limit:1})||canon(v.default_retention)!==canon({success_retention:259200000,error_retention:259200000}))fail();
  const xs=complete(await get('/workflows/'+F+'/instances',{per_page:100,direction:'desc'}));const ids=new Set();for(const x of xs){const id=x.id??x.instance_id;if(typeof id!=='string'||!id.length||id.length>128||ids.has(id)||x.id!==undefined&&x.instance_id!==undefined&&x.id!==x.instance_id||!['complete','terminated','errored'].includes(x.status))fail();ids.add(id);}
  const cr=await get('/containers/applications/'+t.application+'/instances-v2',{state:'active',per_page:100}),cs=envelope(cr);if(!Array.isArray(cs)||cs.length||cr.result_info?.cursor||cr.result_info?.next_cursor||cr.result_info?.count!==undefined&&cr.result_info.count!==0||cr.result_info?.total_count!==undefined&&cr.result_info.total_count!==0)fail();
  for(const n of [W,OP])for(const part of ['schedules','tails']){const r=envelope(await get('/workers/scripts/'+n+'/'+part)),rows=Array.isArray(r)?r:r?.[part];if(!Array.isArray(rows)||rows.length)fail();}
 };
 const counts=async()=>{
  const r=envelope(await call({method:'POST',path:R+'/d1/database/'+t.db+'/query',body:{sql:CONTROL_COUNTS_SQL,params:['afw.own-successor.v1',t.project,t.client,t.resource,new Date(check()).toISOString()]}},'select'));
  const d=r?.[0];if(!Array.isArray(r)||r.length!==1||d.success!==true||d.results?.length!==1)fail();const x=d.results[0];if(x.reserved!==0||!Number.isSafeInteger(x.active_grants)||x.active_grants<0)fail();return x;
 };
 const assertPointers=async expected=>{pointer(await current(W),expected.versionId,expected.deploymentId);pointer(await current(OP),p.baseline.operatorVersion,p.baseline.operatorDeployment);};
 const noTag=async tag=>{
  let page=1,total=null,seen=new Set();
  for(;;){const r=await get('/workers/workers/'+W+'/versions',{page,per_page:100}),rows=envelope(r),i=r.result_info;if(!Array.isArray(rows)||!i||i.page!==page||i.per_page!==100||i.count!==rows.length||!Number.isSafeInteger(i.total_count)||i.total_count<0||i.cursor||i.next_cursor)fail();const pages=Math.max(1,Math.ceil(i.total_count/100));if(pages>10||i.total_pages!==undefined&&i.total_pages!==pages||rows.length!==Math.min(100,Math.max(0,i.total_count-(page-1)*100))||total!==null&&total!==i.total_count)fail();total=i.total_count;
   for(const v of rows){if(!uuid(v.id)||seen.has(v.id)||v.annotations?.['workers/tag']===tag)fail();seen.add(v.id);}if(page===pages)break;page++;
  }if(seen.size!==total)fail();
 };
 const clientKey='client:'+t.client,kv=R+'/storage/kv/namespaces/'+t.kv;
 const readClient=async()=>{const r=envelope(await call({method:'POST',path:kv+'/bulk/get',body:{keys:[clientKey],type:'json',withMetadata:true}}));if(!r?.values||Object.keys(r.values).length!==1||!Object.hasOwn(r.values,clientKey))fail();return r.values[clientKey];};
 let expectedClient=null,clientMetadata=null,base=null,baseVersion=null,window=null,expectedCurrent=null;
 const ownedClient=actual=>{if(!actual||canon(actual.value)!==canon(expectedClient.value)||actual.expiration!==expectedClient.expiration||canon(actual.metadata)!==canon(clientMetadata))fail();};
 // KV visibility is eventual. Observe only after an acknowledged single write;
 // never repeat that write, accept a foreign record, or renew any deadline.
 const observeRegistry=async(present,observationStage=present?'registry_readback':'client_delete_readback')=>{
  for(let n=0;n<9;n++){
   stage=observationStage;check();registryObservations++;
   const actual=await readClient();
   if(actual!==null){ownedClient(actual);if(present)return;}
   else if(!present)return;
   const w=check();
   if(n===8||registryRechecks>=8||endM-lastM<=7500||p.phase!=='close'&&w+7500>=p.window.expiresAt-90000){stage=observationStage+'_timeout';fail();}
   registryRechecks++;await new Promise(resolve=>setTimeout(resolve,7500));check();
  }
 };
 const expectedConfig=async payload=>{
  const c={};for(const k of CONTROL_KEYS)if(Object.hasOwn(payload,k))c[k]=payload[k];
  c.bindings=payload.bindings.map(x=>{if(x.type!=='inherit')return structuredClone(x);if(x.version_id!==p.baseline.pin.baseVersionId)fail();const old=baseVersion.bindings.find(y=>y.name===x.name);if(!old)fail();return structuredClone(old);});return fingerprint(c);
 };
 const promotion=async(id,previous)=>{
  const a=envelope(await call({method:'POST',path:R+'/workers/scripts/'+W+'/deployments',body:{strategy:'percentage',versions:[{version_id:id,percentage:100}],annotations:{'workers/message':'AFW finite catalog trial; rollback '+p.baseline.pin.baseVersionId}}},'deploymentPost'));
  if(!uuid(a?.id)||a.id===previous)fail();const d=await current(W);pointer(d,id,a.id);if(a.strategy!==undefined&&a.strategy!=='percentage'||a.versions!==undefined&&(a.versions.length!==1||a.versions[0].version_id!==id||a.versions[0].percentage!==100))fail();liveDeployment=d.id;return d.id;
 };
 const work=async()=>{try{
  check();stage='closed_material';baseVersion=await version(W,p.baseline.pin.baseVersionId);base=await inspectCatalogDiscoveryArtifact({v:baseVersion,pin:p.baseline.pin,configurationHash:p.baseline.configurationHash});check();
  const op=await moduleProof(await version(OP,p.baseline.operatorVersion),p.baseline.operatorVersion,p.baseline.operatorHash,p.baseline.operatorBytes,p.baseline.operatorConfigurationHash);const opFlags=op.bindings?.filter(x=>/^AFW_.*_ENABLED$/.test(x.name));if(op.bindings?.length!==7||opFlags?.length!==3||opFlags.some(x=>x.type!=='plain_text'||x.text!=='false'))fail();
  const closed={versionId:p.baseline.pin.baseVersionId,deploymentId:p.baseline.canaryDeployment};
  const observed=await current(W);let alreadyClosed=false;
  if(p.phase==='close'&&observed?.versions?.length===1&&observed.versions[0].version_id===closed.versionId&&observed.versions[0].percentage===100){if(!uuid(observed.id))fail();closed.deploymentId=observed.id;alreadyClosed=true;}
  expectedCurrent=alreadyClosed||p.phase==='open'?closed:p.live;if(!expectedCurrent)fail();await assertPointers(expectedCurrent);
  if(!alreadyClosed&&p.phase!=='open'){const v=await moduleProof(await version(W,p.live.versionId),p.live.versionId,p.baseline.pin.workerHash,p.baseline.pin.workerBytes,p.live.configurationHash);const tag=v.annotations?.['workers/tag'];if(!['oauth','catalog'].some(x=>tag==='afw-catalog-discovery-'+p.window.trialId.slice(0,16)+'-'+x))fail();}
  await passive();const c=await counts();if(p.phase==='open'&&c.active_grants!==0)fail();
  // Reconstructing public registry data for closure never renews its deadline.
  const initial=p.mode==='preflight'||p.phase==='close'?p.window.startAt:check();
  window=prepareCatalogDiscoveryWindow(p.window,{now:initial});expectedClient=createCatalogDiscoveryClient(window,{now:initial});clientMetadata={purpose:'afw.catalog-discovery-public-client.v1',trialId:p.window.trialId,valueHash:await hash(canon(expectedClient.value))};check();
  const existing=p.phase==='catalog'?null:await readClient();if(p.phase==='open'&&existing!==null)fail();
  if(p.phase==='close'){
   stage='close_admission';await assertPointers(expectedCurrent);await passive();
   if(p.mode==='preflight')return result('preflight_passed',{alreadyClosed});
   if(!alreadyClosed)await promotion(closed.versionId,expectedCurrent.deploymentId);else liveDeployment=closed.deploymentId;
   stage='closed_readback';pointer(await current(W),closed.versionId,liveDeployment);await moduleProof(await version(W,closed.versionId),closed.versionId,p.baseline.pin.workerHash,p.baseline.pin.workerBytes,p.baseline.configurationHash);await passive();pointer(await current(OP),p.baseline.operatorVersion,p.baseline.operatorDeployment);
   stage='client_cleanup';const record=await readClient();if(record!==null){ownedClient(record);await call({method:'DELETE',path:kv+'/values/'+encodeURIComponent(clientKey)},'clientDelete');await observeRegistry(false);}
   const end=await counts();pointer(await current(W),closed.versionId,liveDeployment);
   return result(alreadyClosed?'already_closed':'closed',{versionId:closed.versionId,deploymentId:liveDeployment,configurationHash:p.baseline.configurationHash,activeOwnGrants:end.active_grants,permissionWithdrawalProven:false});
  }
  let grant;
  const readPrimaryGrant=async()=>{
   const rows=envelope(await call({method:'POST',path:R+'/d1/database/'+t.db+'/query',body:{sql:CONTROL_GRANTS_SQL,params:[t.project,t.client,t.resource,new Date(p.window.startAt).toISOString(),new Date(p.window.expiresAt).toISOString()]}},'select'));
   if(!Array.isArray(rows)||rows.length!==1||rows[0].success!==true)fail();
   return inspectCatalogDiscoveryGrant({rows:rows[0].results,window,now:check()});
  };
  const phaseGrantSnapshot=async()=>{
   const observed=await counts();if(observed.active_grants!==(p.phase==='open'?0:1))fail();
   if(p.phase==='catalog'){const current=await readPrimaryGrant();if(canon(current)!==canon(grant))fail();}
   return observed;
  };
  if(p.phase==='catalog'){
   stage='primary_grant';await observeRegistry(true,'catalog_registry_readback');stage='primary_grant';if(c.active_grants!==1)fail();grant=await readPrimaryGrant();catalogDispatchBefore=grant.catalogDispatchBefore;
  }
  stage='payload';const descriptor=createCatalogDiscoveryVersion({stage:p.phase==='open'?'oauth':'catalog',base,window,...grant?{grant}:{},now:p.mode==='preflight'?p.window.startAt:check()}),payload=descriptor.payload,configurationHash=await expectedConfig(payload);intendedConfigurationHash=configurationHash;check();await noTag(payload.annotations['workers/tag']);
  if(p.mode==='preflight')return result('preflight_passed',{configurationHash});
  if(p.phase==='open'){
   // The host is still the verified closed base. This write registers only
   // public client metadata; fresh passive admission is at the version effect.
   stage='registry_admission';await assertPointers(expectedCurrent);if((await counts()).active_grants!==0||await readClient()!==null)fail();
   const a=envelope(await call({method:'PUT',path:kv+'/bulk',body:[{key:expectedClient.key,value:JSON.stringify(expectedClient.value),expiration:expectedClient.expiration,metadata:clientMetadata}]},'clientPut'));
   stage='registry_acknowledgement';if(a?.successful_key_count!==1||!Array.isArray(a.unsuccessful_keys)||a.unsuccessful_keys.length)fail();await observeRegistry(true);
  }
  // The fixed version/passive/promotion/readback tail needs35 API reads. Do not
  // create a version when pagination and visibility observations spent them.
  stage='version_budget_admission';if(apiReads+35>64)fail();
  stage='version_admission';await observeRegistry(true,'version_registry_readback');stage='version_admission';await passive();await assertPointers(expectedCurrent);await phaseGrantSnapshot();
  stage='version_budget_admission';if(apiReads+24>64)fail();
  stage='inactive_version';const made=envelope(await call({method:'POST',path:R+'/workers/workers/'+W+'/versions',query:{deploy:false},body:payload},'versionPost'));candidate=made?.id;
  if(!uuid(candidate)||candidate===closed.versionId||made.exports_reconciliation!==undefined&&(!made.exports_reconciliation||Object.values(made.exports_reconciliation).some(x=>!Array.isArray(x)||x.length)))fail();
  const newV=await moduleProof(await version(W,candidate),candidate,p.baseline.pin.workerHash,p.baseline.pin.workerBytes,configurationHash);if(newV.bindings?.length!==33||newV.annotations?.['workers/tag']!==payload.annotations['workers/tag'])fail();
  stage='promotion_admission';await observeRegistry(true,'promotion_registry_readback');stage='promotion_admission';await assertPointers(expectedCurrent);await passive();await phaseGrantSnapshot();
  stage='promotion_budget_admission';if(apiReads+12>64)fail();
  stage='promotion';const deploymentId=await promotion(candidate,expectedCurrent.deploymentId);
  stage='primary_readback';await moduleProof(await version(W,candidate),candidate,p.baseline.pin.workerHash,p.baseline.pin.workerBytes,configurationHash);await passive();await phaseGrantSnapshot();pointer(await current(OP),p.baseline.operatorVersion,p.baseline.operatorDeployment);pointer(await current(W),candidate,deploymentId);
  return result(p.phase==='open'?'opened':'catalog_attached',{versionId:candidate,deploymentId,configurationHash,originalExpiresAt:p.window.expiresAt,...grant?{catalogDispatchBefore:grant.catalogDispatchBefore}:{}});
 }catch{return result(anyWrite()?'uncertain':'blocked');}};
 let timer;try{return await Promise.race([work(),new Promise(resolve=>{timer=setTimeout(()=>{invocationDeadlineReached=true;terminal=true;resolve(result(anyWrite()?'uncertain':'blocked',{deadlineExceeded:true}));},timeout);})]);}finally{clearTimeout(timer);terminal=true;}
}
