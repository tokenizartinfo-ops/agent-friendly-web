import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
import {readRecord,readList,instant,clock as validWall,closed} from './agent-consumption-input.mjs';
import {createCapsulePreparationRequestLease,readCapsulePreparationRequestLease} from './capsule-preparation-request-lease.mjs';

const OPTIONS=['enabled','issuer','resource','redirectUri','operationId','startedAt','expiresAt','env','now','monotonic'];
const FLAGS=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DELEGATED_PREPARATION_ENABLED','AFW_DELEGATED_PREPARATION_ROUTER_ENABLED','AFW_DELEGATED_PREPARATION_CONNECTIONS_ENABLED'];
const SLOT='preparation-client',CONTRACT='afw.preparation.client-maintenance.v1';
const ROW=['operation_id','manifest_hash','claimed_at','client_id','observed_at','read_at'];
const CLIENT=['clientId','clientName','redirectUris','grantTypes','responseTypes','tokenEndpointAuthMethod','registrationDate',
 'logoUri','clientUri','policyUri','tosUri','jwksUri','i18n','contacts'];
const unavailable=()=>Error('Preparation client maintenance unavailable');
class Conflict extends Error {}
const result=(status,fields={})=>closed(status,{code:status==='confirmed'?'preparation_client_observed':status==='blocked'?'preparation_client_conflict':'preparation_client_unconfirmed',
 automaticRetry:false,authorizationGranted:false,operationalReadiness:false,...fields});
const sameOne=(value,expected)=>{const a=readList(value,1);return a?.length===1&&a[0]===expected;};
const hash=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),x=>x.toString(16).padStart(2,'0')).join('');

/** Trusted server-only maintenance composition. NOT a request handler or authority.
 * No runtime entry imports this module. Callers must separately prove custody,
 * dedicated resource identity, scoped authorization and recoverable configuration.
 */
export function createPreparationClientMaintenance(options){
 const cfg=readRecord(options,OPTIONS);if(!cfg||cfg.enabled!==true)return null;
 const now=cfg.now??(()=>Date.now()),mono=cfg.monotonic??(()=>performance.now());
 let start,end,db,kv,withSession,kvMethods,api,methods,clientName,lastWall,lastTick,initialWall,initialTick;
 try{
  const issuer=new URL(cfg.issuer),redirect=new URL(cfg.redirectUri);
  start=instant(cfg.startedAt);end=instant(cfg.expiresAt);
  if(issuer.protocol!=='https:'||issuer.origin!==cfg.issuer||cfg.resource!==cfg.issuer+'/mcp'
   ||redirect.protocol!=='https:'||redirect.hostname!=='chatgpt.com'||redirect.port||redirect.username||redirect.password||redirect.search||redirect.hash
   ||!(redirect.pathname==='/connector_platform_oauth_redirect'||/^\/connector\/oauth\/[A-Za-z0-9_-]{1,128}$/.test(redirect.pathname))
   ||redirect.href!==cfg.redirectUri||typeof cfg.operationId!=='string'||!/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(cfg.operationId)
   ||!validWall(start)||!validWall(end)||end<=start||end-start>600000||typeof now!=='function'||typeof mono!=='function'
   ||!cfg.env||typeof cfg.env!=='object'||FLAGS.some(k=>cfg.env[k]!=='false'))throw unavailable();
  db=cfg.env.DB;kv=cfg.env.OAUTH_KV;withSession=db?.withSession;kvMethods={get:kv?.get,list:kv?.list,put:kv?.put};
  if(typeof withSession!=='function'||Object.values(kvMethods).some(x=>typeof x!=='function'))throw unavailable();
  clientName='AFW preparation '+cfg.operationId;
  lastWall=now();lastTick=mono();initialWall=lastWall;initialTick=lastTick;
  if(!validWall(lastWall)||!Number.isFinite(lastTick)||lastTick<0||lastWall<start||lastWall>=end)throw unavailable();
  const server=new OAuthAuthorizationServer({issuer:cfg.issuer,resources:[cfg.resource],clientIdMetadataDocumentEnabled:false,
   clientRegistrationCallback:()=>({code:'access_denied',description:'Registration unavailable',status:403})});
  api=server.getOAuthApi(cfg.env);methods={create:api.createClient,list:api.listClients,lookup:api.lookupClient};
  if(Object.values(methods).some(x=>typeof x!=='function'))throw unavailable();
 }catch{throw unavailable();}
 let invalidated=false;
 function current(){
  if(invalidated)throw unavailable();
  try{
   const live=readRecord(options,OPTIONS),wall=now(),tick=mono();
   if(!live||!OPTIONS.every(k=>live[k]===cfg[k])||cfg.env.DB!==db||cfg.env.OAUTH_KV!==kv||db.withSession!==withSession
    ||FLAGS.some(k=>cfg.env[k]!=='false')||Object.keys(kvMethods).some(k=>kv[k]!==kvMethods[k])
    ||api.createClient!==methods.create||api.listClients!==methods.list||api.lookupClient!==methods.lookup
    ||!validWall(wall)||!Number.isFinite(tick)||wall<lastWall||tick<lastTick||tick-initialTick>=end-initialWall||wall<start||wall>=end)throw unavailable();
   lastWall=wall;lastTick=tick;return {wall,tick};
  }catch{invalidated=true;throw unavailable();}
 }
 function matchesClient(value){
  const c=readRecord(value,CLIENT);
  return c&&typeof c.clientId==='string'&&/^[A-Za-z0-9_-]{16,128}$/.test(c.clientId)&&c.clientName===clientName
   &&sameOne(c.redirectUris,cfg.redirectUri)&&sameOne(c.grantTypes,'authorization_code')&&sameOne(c.responseTypes,'code')
   &&c.tokenEndpointAuthMethod==='none'&&Number.isSafeInteger(c.registrationDate)&&c.registrationDate>=0
   &&CLIENT.slice(7).every(k=>c[k]===undefined)?c:null;
 }
 async function execute(create,args){
  if(args.length)return result('blocked');
  let control;
  try{
   current();
   const lease=createCapsulePreparationRequestLease({now:()=>current().wall,monotonic:()=>current().tick});
   control=readCapsulePreparationRequestLease(lease);
   let primaryDeadline=Infinity;
   const checked=()=>{const c=current();if(c.tick>=primaryDeadline)throw unavailable();return c;};
   const wait=async work=>{checked();const value=await control.wait(()=>{checked();return work();});checked();return value;};
   const manifestHash=await wait(()=>hash(JSON.stringify([CONTRACT,cfg.operationId,cfg.issuer,cfg.resource,cfg.redirectUri,clientName,cfg.startedAt,cfg.expiresAt,'authorization_code','code','none'])));
   const session=withSession.call(db,'first-primary');
   const serverClock=async()=>{
    const anchor=checked().tick;
    const stamp=await wait(()=>session.prepare("SELECT strftime('%Y-%m-%dT%H:%M:%fZ','now') AS at").bind().first());
    const at=instant(stamp?.at);if(!validWall(at)||at<start||at>=end)throw unavailable();
    primaryDeadline=Math.min(primaryDeadline,anchor+(end-at));checked();return at;
   };
   await serverClock();
   const read=async()=>{
    const row=await wait(()=>session.prepare("SELECT operation_id,manifest_hash,claimed_at,client_id,observed_at,strftime('%Y-%m-%dT%H:%M:%fZ','now') AS read_at FROM preparation_client_bootstrap WHERE slot_id=? AND julianday('now')>=julianday(?) AND julianday('now')<julianday(?) LIMIT 1").bind(SLOT,cfg.startedAt,cfg.expiresAt).first());
    if(row===null)return null;
    const r=readRecord(row,ROW),readAt=instant(r?.read_at),claimed=instant(r?.claimed_at),observed=r?.observed_at===null?null:instant(r?.observed_at);
    if(!r||r.operation_id!==cfg.operationId||r.manifest_hash!==manifestHash||!validWall(readAt)||readAt<start||readAt>=end||!validWall(claimed)||claimed<start||claimed>=end||claimed>readAt
     ||!((r.client_id===null&&r.observed_at===null)||(typeof r.client_id==='string'&&/^[A-Za-z0-9_-]{16,128}$/.test(r.client_id)&&validWall(observed)&&observed>=claimed&&observed<end&&observed<=readAt)))throw new Conflict();
    return r;
   };
   const inventory=async()=>{
    const raw=await wait(()=>methods.list.call(api,{limit:2})),r=readRecord(raw,['items','cursor']),items=readList(r?.items,2);
    if(!r||!items||r.cursor!==undefined)return null;
    return items;
   };
   const observe=async row=>{
    const items=await inventory();if(!items||items.length!==1)return result('unconfirmed');
    const c=matchesClient(items[0]);if(!c||(row.client_id!==null&&row.client_id!==c.clientId))return result('unconfirmed');
    const looked=matchesClient(await wait(()=>methods.lookup.call(api,c.clientId)));
    if(!looked||looked.clientId!==c.clientId)return result('unconfirmed');
    if(row.client_id===null){
     await wait(()=>session.prepare("UPDATE preparation_client_bootstrap SET client_id=?,observed_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE slot_id=? AND operation_id=? AND manifest_hash=? AND client_id IS NULL AND julianday('now')>=julianday(?) AND julianday('now')<julianday(?)")
      .bind(c.clientId,SLOT,cfg.operationId,manifestHash,cfg.startedAt,cfg.expiresAt).run());
    }
    const saved=await read();if(!saved||saved.client_id!==c.clientId)return result('unconfirmed');
    const final=matchesClient(await wait(()=>methods.lookup.call(api,c.clientId)));
    if(!final||final.clientId!==c.clientId)return result('unconfirmed');
    const observed=await serverClock();checked();control.check();
    return result('confirmed',{contract:CONTRACT,operationId:cfg.operationId,manifestHash,clientId:c.clientId,
     redirectUri:cfg.redirectUri,configuredResource:cfg.resource,observedAt:new Date(observed).toISOString(),clientRegistrationObserved:true});
   };
   let row=await read();
   if(row)return await observe(row);
   if(!create)return result('unconfirmed');
   const before=await inventory();if(!before)return result('unconfirmed');if(before.length)return result('blocked');
   const claim=await wait(()=>session.prepare("INSERT INTO preparation_client_bootstrap(slot_id,operation_id,manifest_hash,claimed_at) SELECT ?,?,?,strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE julianday('now')>=julianday(?) AND julianday('now')<julianday(?) ON CONFLICT(slot_id) DO NOTHING")
    .bind(SLOT,cfg.operationId,manifestHash,cfg.startedAt,cfg.expiresAt).run());
   // Only an acknowledged winning INSERT admits create. Unknown ACK spends the
   // slot conservatively; neither metadata invisibility nor a fresh factory retries.
   row=await read();
   if(claim?.meta?.changes!==1)return row?await observe(row):result('unconfirmed');
   if(!row||row.client_id!==null)return result('unconfirmed');
   const created=await wait(()=>methods.create.call(api,{clientName,redirectUris:[cfg.redirectUri],grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none'}));
   if(!matchesClient(created))return result('unconfirmed');
   return await observe(row);
  }catch(e){return result(e instanceof Conflict?'blocked':'unconfirmed');}
  finally{control?.close();}
 }
 return Object.freeze({register(...args){return execute(true,args);},reconcile(...args){return execute(false,args);}});
}
