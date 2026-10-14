import {readFile,writeFile} from 'node:fs/promises';
import {resolve,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const fail=()=>{throw Error('Own monitoring draft unavailable');};
const id=x=>typeof x==='string'&&x.length>0&&x.length<=200&&x.trim()===x;
const date=s=>{if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(s))fail();const t=Date.parse(s);if(!Number.isSafeInteger(t)||new Date(t).toISOString()!==s)fail();return t;};
/** DRAFT ONLY. Caller supplies scoped primary metadata; this is not proof
 * of its provenance, owner consent, live runtime or authority to deploy. */
export function prepareOwnMonitorConfig({grantResultJson,configJson,now=Date.now()}={}){
 try{
  if(typeof grantResultJson!=='string'||grantResultJson.length>65536||typeof configJson!=='string'||configJson.length>32768||!Number.isSafeInteger(now)||now<0)fail();
  const result=JSON.parse(grantResultJson),c=JSON.parse(configJson),g=result[0]?.results?.[0],v=c.vars;
  if(result.length!==1||result[0]?.success!==true||result[0]?.meta?.served_by_primary!==true||result[0]?.results?.length!==1||!g||!v||!['id','user_id'].every(k=>id(g[k])))fail();
  // The fixed own namespace is a single attempt, not a reusable login slot.
  // These totals must come from the same primary SELECT, across the own DB,
  // not a WHERE grant_id filter that would hide a previously consumed grant.
  if(['original_admissions','original_closures','original_receipts'].some(k=>g[k]!==0))fail();
  if(g.client_id!=='afw-chatgpt-pilot-20261003'||g.project_id!=='oauth-canary-owner'||g.resource!=='https://delegated-canary.agentfriendlyweb.dev/mcp'||g.scopes_json!=='["afw:project:read"]'||g.revoked_at!=='')fail();
  const startAt=date(g.created_at),originalEnd=date(g.expires_at),serviceEnd=date(v.AFW_OAUTH_PILOT_EXPIRES_AT),expiresAt=Math.min(originalEnd,serviceEnd);
  if(startAt>now||originalEnd<=startAt||originalEnd-startAt>600000||expiresAt<=now)fail();
  if(c.name!=='agent-friendly-web-delegated-canary'||c.account_id!=='85d0d5dadac3341a564f22ce885e9eec'||typeof c.main!=='string'||c.workers_dev!==false||c.preview_urls!==false||c.routes?.length!==1||c.routes[0].pattern!=='delegated-canary.agentfriendlyweb.dev'||c.routes[0].custom_domain!==true||c.d1_databases?.length!==1||c.d1_databases[0].binding!=='DB'||c.d1_databases[0].database_id!=='6a728254-1494-4039-802e-b39288a55fcc'||c.kv_namespaces?.length!==1||c.kv_namespaces[0].binding!=='OAUTH_KV'||c.kv_namespaces[0].id!=='6b94ff702e504e14a7730cee73a0f6ff')fail();
  const nodes=c.durable_objects?.bindings;if(nodes?.length!==1||nodes[0].name!=='AFW_DOSSIER_EVENTS_NODE'||nodes[0].class_name!=='AfwOwnEventNode'||nodes[0].script_name!==undefined||v.AFW_DOSSIER_EVENTS_NODE_NAME!=='afw-own-event-one-occurrence-v1')fail();
  if(v.AFW_OAUTH_ISSUER!=='https://delegated-canary.agentfriendlyweb.dev'||v.AFW_OAUTH_RESOURCE!==g.resource||v.AFW_OAUTH_PILOT_CLIENT_ID!==g.client_id||v.AFW_OAUTH_PILOT_PROJECT_ID!==g.project_id||v.AFW_DELEGATED_OAUTH_ENABLED!=='true'||v.AFW_OAUTH_SERVICE_MODE!=='window'||v.AFW_OAUTH_REFRESH_ENABLED!=='false'||['AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED'].some(k=>v[k]!=='false')||['AFW_DOSSIER_EVENTS_POLICY','AFW_DOSSIER_MONITORING_OWNER_POLICY','AFW_DOSSIER_EVENTS_SCHEDULE','AFW_DOSSIER_EVENTS_CUSTODY_KEY','AFW_DOSSIER_EVENTS_PROJECTION_SECRET'].some(k=>Object.hasOwn(v,k)))fail();
  const mode=v.AFW_DOSSIER_EVENTS_SCHEDULE_MODE??'exact',crons=c.triggers?.crons??[];
  if(!Array.isArray(crons)||!['exact','stable-minute'].includes(mode)||(mode==='stable-minute'?(crons.length!==1||crons[0]!=='* * * * *'):crons.length!==0))fail();
  v.AFW_DOSSIER_MONITORING_OWNER_ENABLED='true';v.AFW_DOSSIER_EVENTS_ENABLED='true';
  v.AFW_DOSSIER_MONITORING_OWNER_POLICY=JSON.stringify({grantId:g.id,projectId:g.project_id,clientId:g.client_id,startAt,expiresAt});
  v.AFW_DOSSIER_EVENTS_POLICY=JSON.stringify({grantId:g.id,subject:g.user_id,projectId:g.project_id,clientId:g.client_id,resource:g.resource,startAt,expiresAt});
  return{config:c,summary:{startAt:new Date(startAt).toISOString(),expiresAt:new Date(expiresAt).toISOString(),scope:'afw:project:read',noConsentCreated:true}};
 }catch{fail();}
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  if(process.argv.length!==4||JSON.parse(await readFile('package.json','utf8')).name!=='agent-friendly-web')fail();
  const root=resolve('output')+sep,input=resolve(process.argv[2]),output=resolve(process.argv[3]);if(!input.startsWith(root)||!output.startsWith(root)||input===output)fail();
  let raw='';for await(const part of process.stdin){raw+=part;if(raw.length>65536)fail();}
  const prepared=prepareOwnMonitorConfig({grantResultJson:raw,configJson:await readFile(input,'utf8')});
  await writeFile(output,JSON.stringify(prepared.config,null,2),{flag:'wx'});process.stdout.write(JSON.stringify(prepared.summary)+'\n');
 }catch{process.stderr.write('Own monitoring draft unavailable; no deploy or consent performed.\n');process.exitCode=1;}
}
