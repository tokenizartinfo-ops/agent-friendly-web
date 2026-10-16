const names=['AFW_MCP_DISCOVERY_DIAGNOSTIC_ENABLED','AFW_MCP_DISCOVERY_DIAGNOSTIC_START_AT','AFW_MCP_DISCOVERY_DIAGNOSTIC_EXPIRES_AT'];
const stages=new Set(['received','authenticated','authority_ready','authority_failed','catalog','catalog_failed','response','exception','broker_authorization_ready','broker_rpc_start','broker_rpc_returned','native_received','native_policy_ready','native_successor_ready','native_custody_ready','native_runtime_check','native_runtime_ready','native_host_ready','native_authorization_ready','native_closure_read','native_closure_ready','native_returned','native_failed']);
const methods=new Set(['server/discover','events/list','tools/list','tools/call','initialize']);
const silent=Object.freeze({record(){}});
export async function observeMcpDiscoveryRequest(options,handle){
 const diagnostic=createMcpDiscoveryDiagnostic(options);diagnostic.record('received');
 try{const response=await handle(diagnostic);diagnostic.record('response',{status:response?.status});return response;}
 catch(error){diagnostic.record('exception');throw error;}
}
/** Called only inside the already authenticated OAuth resource handler. */
export async function observeMcpEventAuthority(diagnostic,create){
 diagnostic.record('authenticated');
 let authority;try{authority=await create();diagnostic.record('authority_ready');}
 catch(error){diagnostic.record('authority_failed');throw error;}
 return {...authority,async list(){
  try{const result=await authority.list();diagnostic.record('catalog',{count:result===null?0:1});return result;}
  catch(error){diagnostic.record('catalog_failed');throw error;}
 }};
}
/** Bounded own-QA diagnostics. Never inspect bodies, credentials or error text. */
export function createMcpDiscoveryDiagnostic({env,request,sourceRevision,now=Date.now,emit=row=>console.info(JSON.stringify(row))}){
 try{
  if(env?.AFW_MCP_DISCOVERY_DIAGNOSTIC_ENABLED!=='true'||!/^[0-9a-f]{40}$/.test(sourceRevision)||new URL(request.url).pathname!=='/mcp'||request.method!=='POST')return silent;
  const raw=request.headers.get('Mcp-Method');
  return createBoundedDiagnostic({env,sourceRevision,method:methods.has(raw)?raw:'other',now,emit});
 }catch{return silent;}
}
/** Server-internal fixed list RPC only. No caller-selected method or payload. */
export function createMcpRpcCatalogDiagnostic({env,sourceRevision,now=Date.now,emit=row=>console.info(JSON.stringify(row))}){
 return createBoundedDiagnostic({env,sourceRevision,method:'events/list',now,emit});
}
function createBoundedDiagnostic({env,sourceRevision,method,now,emit}){
 try{
  if(env?.AFW_MCP_DISCOVERY_DIAGNOSTIC_ENABLED!=='true'||!/^[0-9a-f]{40}$/.test(sourceRevision))return silent;
  const pins=names.map(n=>env[n]);
  if(!pins.slice(1).every(v=>typeof v==='string'&&/^(0|[1-9][0-9]*)$/.test(v)))return silent;
  const start=Number(pins[1]),end=Number(pins[2]);
  if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||end<=start||end-start>600000)return silent;
  let last=-1;
  return Object.freeze({record(stage,detail={}){
   try{
    const time=now();if(!Number.isSafeInteger(time)||time<last||time<start||time>=end||!names.every((n,i)=>env[n]===pins[i])||!stages.has(stage))return;
    last=time;
    const row={event:'afw.mcp_discovery_diagnostic',sourceRevision,at:new Date(time).toISOString(),method,stage};
    if(stage==='response'&&Number.isInteger(detail.status)&&detail.status>=100&&detail.status<=599)row.status=detail.status;
    if(stage==='catalog'&&[0,1].includes(detail.count))row.count=detail.count;
    emit(row);
   }catch{/* Diagnostics cannot change application behavior. */}
  }});
 }catch{return silent;}
}
