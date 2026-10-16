const methods=new Set(['server/discover','events/list','tools/list','tools/call','initialize','other','oauth/token']);
const stages=new Set(['received','authenticated','authority_ready','authority_failed','catalog','catalog_failed','response','exception','broker_authorization_ready','broker_rpc_start','broker_rpc_returned','native_received','native_policy_ready','native_successor_ready','native_custody_ready','native_runtime_check','native_runtime_ready','native_host_ready','native_authorization_ready','native_closure_read','native_closure_ready','native_returned','native_failed']);
stages.add('authorization_header_present');stages.add('authorization_header_absent');
stages.add('events_enabled');stages.add('events_not_enabled');
for(const stage of ['native_runtime_options_invalid','native_runtime_inputs_invalid','native_runtime_window_invalid','native_runtime_context_invalid','native_runtime_identity_invalid','native_container_absent','native_container_start_unavailable','native_container_timeout_unavailable','native_container_intercept_unavailable','native_container_port_unavailable','native_container_destroy_unavailable'])stages.add(stage);
/** Private in-memory projection of Wrangler JSON stdout; never emit the input frame. */
export function createDiscoveryCapture({sourceRevision,startAt,expiresAt,now=Date.now,emit}){
 const fail=()=>{throw Error('Capture unavailable');};
 if(!/^[a-f0-9]{40}$/.test(sourceRevision)||!Number.isSafeInteger(startAt)||startAt<0||!Number.isSafeInteger(expiresAt)||expiresAt<=startAt||expiresAt-startAt>600000||typeof emit!=='function')fail();
 let buffer='',depth=0,quoted=false,escape=false,bytes=0,invocation=0,last=-1,closed=false;
 const stop=()=>{closed=true;buffer='';fail();};
 const current=()=>{const t=now();if(closed||!Number.isSafeInteger(t)||t<last||t<startAt||t>=expiresAt)stop();last=t;};
 const project=raw=>{
  let f;try{f=JSON.parse(raw);}catch{stop();}
  if(++invocation>100)stop();
  if(f?.scriptName!=='agent-friendly-web-delegated-canary'||!Array.isArray(f.logs))return;
  if(f.logs.length>100)stop();
  for(const log of f.logs){
   if(!Array.isArray(log?.message)||log.message.length!==1||typeof log.message[0]!=='string'||log.message[0].length>2048)continue;
   let r;try{r=JSON.parse(log.message[0]);}catch{continue;}
   if(!r||typeof r!=='object'||Array.isArray(r)||r.event!=='afw.mcp_discovery_diagnostic'||r.sourceRevision!==sourceRevision||!methods.has(r.method)||!stages.has(r.stage))continue;
   const keys=['event','sourceRevision','at','method','stage',...(r.stage==='catalog'?['count']:r.stage==='response'?['status']:[])];
   if(Object.keys(r).length!==keys.length||Object.keys(r).some(k=>!keys.includes(k)))continue;
   const t=Date.parse(r.at);if(typeof r.at!=='string'||!Number.isFinite(t)||t<startAt||t>=expiresAt||new Date(t).toISOString()!==r.at)continue;
   if(r.stage==='catalog'&&![0,1].includes(r.count)||r.stage==='response'&&(!Number.isInteger(r.status)||r.status<100||r.status>599))continue;
   current();const safe={invocation};for(const k of keys)safe[k]=r[k];emit(safe);
  }
 };
 return Object.freeze({push(chunk){
  current();if(typeof chunk!=='string')stop();bytes+=new TextEncoder().encode(chunk).length;if(bytes>1048576)stop();
  for(const c of chunk){
   if(depth===0){if(/\s/.test(c))continue;if(c!=='{')stop();buffer='{';depth=1;continue;}
   buffer+=c;if(buffer.length>262144)stop();
   if(quoted){if(escape)escape=false;else if(c==='\\')escape=true;else if(c==='"')quoted=false;}
   else if(c==='"')quoted=true;else if(c==='{')depth++;else if(c==='}')depth--;
   if(depth===0){const raw=buffer;buffer='';project(raw);}
  }
 },finish(){if(closed||depth!==0)stop();closed=true;buffer='';}});
}

