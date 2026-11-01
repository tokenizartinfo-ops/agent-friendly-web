import {createHash} from 'node:crypto';
import {QA_CLOUD_CLOSED_PINS as P} from './mcp-qa-cloud-closed-pins.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
import * as wf from './mcp-fixed-terminal-workflows.mjs';
const fail=()=>{throw Error('Own closed readback unavailable');};
function fields(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();return Object.fromEntries(keys.map(k=>{const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return[k,d.value];}));}
/** Trusted Node wrapper supplies GET-only request and clock; no resource selectors. */
export async function readOwnClosedRuntime(options){
 const origin=performance.now(),{request,now}=fields(options,['request','now']);if(typeof request!=='function'||typeof now!=='function'||!Number.isFinite(origin)||origin<0)fail();
 const accountId='85d0d5dadac3341a564f22ce885e9eec',cloudflare={request},pins=Object.freeze({qa:P.qaClosed,canary:P.canary,operator:P.operator});
const root='/accounts/'+accountId,QA='agent-friendly-web-independent-closure-qa',started=now();let reads=0,lastWall=started,lastMono=origin;if(!Number.isSafeInteger(started)||started<0)fail();
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(x);
const check=()=>{const n=fields(options,['request','now']),wall=now(),mono=performance.now();if(n.request!==request||n.now!==now||!Number.isSafeInteger(wall)||wall<0||wall<lastWall||wall-started>=120000||!Number.isFinite(mono)||mono<lastMono||mono-origin>=120000||reads>128)fail();lastWall=wall;lastMono=mono;return wall;};
const digest=async raw=>createHash('sha256').update(raw).digest('hex');
const read=async(path,query)=>{check();reads++;const e=await cloudflare.request({method:'GET',path:root+path,query});check();const family=path==='/workers/durable_objects/namespaces';if(e.success!==true||!(Array.isArray(e.errors)&&e.errors.length===0||family&&e.errors===null)||!(Array.isArray(e.messages)&&e.messages.length===0||family&&e.messages===null))fail();return {value:e.result,info:e.result_info};};
const active=async name=>{const {value:v}=await read('/workers/scripts/'+name+'/deployments',{per_page:1});if(!Array.isArray(v?.deployments)||v.deployments.length!==1)fail();const d=v.deployments[0];if(!uuid(d.id)||d.strategy!=='percentage'||d.versions?.length!==1||d.versions[0].percentage!==100||!uuid(d.versions[0].version_id))fail();return {versionId:d.versions[0].version_id,deploymentId:d.id};};
const names=Object.values(pins).map(p=>p.name),before={};
for(const [role,p] of Object.entries(pins)){const a=await active(p.name);if(a.versionId!==p.id||p.deploymentId&&a.deploymentId!==p.deploymentId)fail();before[role]=a;}
const profiles={};
for(const [role,p] of Object.entries(pins)){
 const {value:v}=await read('/workers/workers/'+p.name+'/versions/'+p.id,{include:'modules'});
 if(v?.id!==p.id||v.main_module!==p.module.name||!Array.isArray(v.modules)||v.modules.length!==1||!Array.isArray(v.bindings)||v.bindings.length!==p.bindingCount||!Array.isArray(v.urls)||v.urls.length)fail();
 const m=v.modules[0];if(m.name!==p.module.name||m.content_type!=='application/javascript+module'||typeof m.content_base64!=='string')fail();
 const b=Buffer.from(m.content_base64,'base64');if(b.toString('base64')!==m.content_base64||b.length!==p.module.bytes||await digest(b)!==p.module.sha256)fail();
 const seen=new Set();for(const binding of v.bindings){if(typeof binding.name!=='string'||seen.has(binding.name))fail();seen.add(binding.name);if(binding.type==='secret_text'&&(Object.keys(binding).length!==2||Object.keys(binding).some(k=>!['name','type'].includes(k))))fail();}
 const flags=v.bindings.filter(b=>b.name.startsWith('AFW_')&&b.name.endsWith('_ENABLED'));if(flags.length!==p.flagCount||flags.some(b=>b.type!=='plain_text'||b.text!=='false'))fail();
 if(restorationConfigurationHash(v)!==p.configurationHash)fail();
 profiles[role]={versionId:p.id,moduleHash:p.module.sha256,configurationHash:p.configurationHash,bindingCount:p.bindingCount,closedFlagCount:p.flagCount};
}
const empty=(rows,info,cursor=false)=>{if(!Array.isArray(rows)||rows.length)fail();if(info===undefined){if(cursor)fail();return;}const allowed=['per_page','page','total_pages','count','total_count','cursor','next_cursor','next_page_token','page_token','has_more'];if(!info||typeof info!=='object'||Object.keys(info).some(k=>!allowed.includes(k))||cursor&&info.per_page!==100||info.page!==undefined&&info.page!==1||info.total_pages!==undefined&&![0,1].includes(info.total_pages)||['count','total_count'].some(k=>info[k]!==undefined&&info[k]!==0)||['cursor','next_cursor','next_page_token','page_token'].some(k=>info[k]!==undefined&&info[k]!=='')||info.has_more!==undefined&&info.has_more!==false)fail();};
for(const name of names)for(const part of ['schedules','tails']){const r=await read('/workers/scripts/'+name+'/'+part);empty(Array.isArray(r.value)?r.value:r.value?.schedules,r.info);}
const exposure=(await read('/workers/scripts/'+QA+'/subdomain')).value;if(exposure?.enabled!==false||exposure?.previews_enabled!==false)fail();
const container=await read('/containers/applications/d6fc71552de7494a863aca20365a572d/instances-v2',{state:'active',per_page:100});empty(container.value,container.info,true);
const namespaces=await read('/workers/durable_objects/namespaces',{page:1,per_page:1000}),ni=namespaces.info;
if(!Array.isArray(namespaces.value)||namespaces.value.length>1000||!ni||Object.keys(ni).some(k=>!['page','per_page','count','total_count','total_pages'].includes(k))||ni.page!==1||ni.per_page!==1000||ni.count!==namespaces.value.length||ni.total_count!==namespaces.value.length||ni.total_pages!==undefined&&ni.total_pages!==1)fail();
const own=namespaces.value.filter(n=>n.script===QA),expected={IndependentClosure:'070c4a7708eb4592a3ded7c117a88225',PrivateQaPreregistration:'6f30104244424152b800bc64d5f4cfac'};
if(own.length!==2||own.some(n=>typeof n.class!=='string'||!Object.hasOwn(expected,n.class)||n.id!==expected[n.class]||n.use_sqlite!==true)||new Set(own.map(n=>n.id)).size!==2)fail();
const ownedDefinitions=new Set(),registryIds=new Set();let total,pages,hasPages,count=0;
for(let page=1;page<=4;page++){
 const {value:rows,info}=await read('/workflows',{page,per_page:100});
 if(!Array.isArray(rows)||rows.length>100||!info||Object.keys(info).some(k=>!['page','per_page','count','total_count','total_pages','cursor'].includes(k))||info.page!==page||info.per_page!==100||info.count!==rows.length||!Number.isSafeInteger(info.total_count)||info.total_count<0||info.total_count>400||info.total_pages!==undefined&&(!Number.isSafeInteger(info.total_pages)||info.total_pages<page||info.total_pages>4)||info.cursor!==undefined&&info.cursor!=='')fail();
 if(page===1){total=info.total_count;pages=info.total_pages;hasPages=Object.hasOwn(info,'total_pages');}else if(info.total_count!==total||Object.hasOwn(info,'total_pages')!==hasPages||hasPages&&info.total_pages!==pages)fail();
 for(const row of rows){if(!uuid(row?.id)||typeof row.name!=='string'||typeof row.script_name!=='string'||typeof row.class_name!=='string'||registryIds.has(row.id))fail();registryIds.add(row.id);if(names.includes(row.script_name)){const spec=wf.AFW_FIXED_WORKFLOWS.find(s=>s.script===row.script_name&&s.id===row.id);if(!spec||row.name!==spec.name||row.class_name!==spec.className||row.script_deleted===true||row.schedules!==undefined&&(!Array.isArray(row.schedules)||row.schedules.length))fail();ownedDefinitions.add(row.id);}}
 count+=rows.length;if(count===info.total_count){if(info.total_pages!==undefined&&info.total_pages!==page||ownedDefinitions.size!==3)fail();break;}if(page===4||count>info.total_count||rows.length!==100)fail();
}
const workflows=await wf.readTerminalAfwWorkflows({read,assertCurrent:check,includeBootstrap:true});
for(const [role,p]of Object.entries(pins)){const a=await active(p.name);if(a.versionId!==before[role].versionId||a.deploymentId!==before[role].deploymentId)fail();}
const at=check();return {purpose:'afw.own-closed-readback.v1',status:'closed',observedAt:new Date(at).toISOString(),profiles,deployments:before,allOwnWorkflowsTerminal:true,workflowInstances:workflows.instanceCount,ownNamespacesPreserved:true,ownContainerEmpty:true,qaExposureDisabled:true,cronAndTailsEmpty:true,reads,readOnly:true,authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false};
}
