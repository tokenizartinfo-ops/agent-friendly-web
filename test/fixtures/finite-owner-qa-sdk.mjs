import {build} from 'esbuild';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
// SYN fixture composition only. Actual source/SDK/journals/Unit2a modules remain.
export function extendFiniteOwnerQaSdk(entry,{observed=false}={}){
 const imports=`import {sealFiniteOwnerIssuerProvenanceRecord as sdkSeal,encodeFiniteOwnerIssuerProvenanceRecord as sdkEncode} from './lib/mcp-qa-finite-owner-issuer-provenance-records.mjs';\nimport {createPrivateQaFiniteOwnerOAuthReceiver} from './lib/mcp-qa-finite-owner-oauth-qa.mjs';\n`;
 let methods=`
 async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}
 async sdkObservation(){return {queue:this.sdkQueue??null,signals:this.sdkSignals??null,leaseSignals:globalThis.__d02QaSignals??null,held:!!this.sdkRelease,probes:globalThis.__d02Probes??[],primary:this.sdkPrimary??[],rows:[...await this.ctx.storage.list({prefix:'afw.finite-owner-issuer-provenance.v1:'})],calls:this.sdkCalls??[]};}
 async sdkConfigure(mode='normal'){
  globalThis.__d02Probes=[];

  const kv=this.env.AFW_FINITE_OWNER_OAUTH_KV;this.sdkCalls=[];this.sdkMode=mode;this.sdkRelease=null;this.sdkRestore?.();
  const methods={get:kv.get,put:kv.put,delete:kv.delete,list:kv.list};this.sdkRestore=()=>{for(const key of Object.keys(methods))kv[key]=methods[key];};
  for(const key of Object.keys(methods))kv[key]=async(...args)=>{
   const call={method:key,prefix:String(args[0]).split(':')[0]};this.sdkCalls.push(call);
   if(key==='put'&&String(args[0]).startsWith('grant:'))call.actualGrantAck=[...await this.ctx.storage.list({prefix:'afw.finite-preparation-issuer.v1:'})].some(([k])=>k.endsWith(':grant:ack'));
   if(this.sdkMode==='stale'&&key==='get'&&String(args[0]).startsWith('transaction:'))return null;
   if(key==='list')throw Error('SYN prohibited SDK list');
   if(this.sdkMode==='miss'&&key==='get'&&String(args[0]).startsWith('client:'))return null;
   if(this.sdkMode==='error'&&key==='get')throw Error('SYN KV error');
   const actual=Reflect.apply(methods[key],kv,args);
   if(this.sdkMode==='hold-'+key){this.sdkMode='held';return actual.then(value=>new Promise(resolve=>{this.sdkRelease=()=>resolve(value);}));}
   return actual;
  };
 }
 async sdkCorrupt(kind){
  const rows=[...await this.ctx.storage.list()],capsule=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]),id=capsule.preconnectionId,sp='afw.finite-owner-issuer-provenance.v1:'+id+':',ip='afw.finite-preparation-issuer.v1:'+id+':';
  if(kind==='sdk-extra')await this.ctx.storage.put(sp+'unknown','SYN forbidden extra');
  else if(kind==='sdk-observed'){const send=JSON.parse(await this.ctx.storage.get(sp+'sdk_begin:send'));await this.ctx.storage.put(sp+'sdk_begin:observed',sdkEncode('SdkObserved',sdkSeal('SdkObserved',{purpose:'afw.finite-owner-sdk-observed.v1',sendHash:send.recordHash,resultHash:'f'.repeat(64),observedAt:Date.now(),outcome:'resolved'})));}
  else if(kind==='issuer-extra')await this.ctx.storage.put(ip+'unknown','SYN forbidden extra');
  else if(kind==='issuer-freeze'){const r=JSON.parse(await this.ctx.storage.get(ip+'reservation'));await this.ctx.storage.put(ip+'freeze',phaseEncodeIssuer('Freeze',phaseSealIssuer('Freeze',{purpose:'afw.finite-preparation-issuer-freeze.v1',identityHash:r.identity.identityHash,reservationHash:r.recordHash,frozenAt:Date.now()})));}
  else if(kind==='policy-send'){const ack=rows.find(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':ack'));if(!ack)throw Error('SYN policy ACK missing');await this.ctx.storage.delete(ack[0]);}
  else if(kind==='absent-schema')await this.env.RELEASE_DB.prepare('DROP TABLE finite_preparation_issuer_fences').run();
  else throw Error('SYN unknown fault');await this.ctx.storage.sync();
 }
 async sdkGrants(){return (await this.env.RELEASE_DB.prepare('SELECT * FROM delegated_access_grants ORDER BY id').all()).results;}
 async sdkGrant(id){if(!/^[a-f0-9-]{36}$/.test(id))throw Error('SYN UUID');return this.env.RELEASE_DB.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(id).first();}
 async sdkReplaceHolder(){const kv=this.env.AFW_FINITE_OWNER_OAUTH_KV,original=kv.get;kv.get=(...args)=>Reflect.apply(original,kv,args);}
 async sdkAliasAbsent(absent){if(absent){this.sdkAlias=this.env.AFW_FINITE_OWNER_OAUTH_KV;this.env.AFW_FINITE_OWNER_OAUTH_KV=undefined;}else this.env.AFW_FINITE_OWNER_OAUTH_KV=this.sdkAlias;}
 async sdkPrimaryObserve(){
  this.sdkPrimary=[];const db=this.env.RELEASE_DB,original=db.withSession;
  db.withSession=constraint=>{const session=Reflect.apply(original,db,[constraint]),prepare=session.prepare,queries=[];this.sdkPrimary.push({constraint,queries});session.prepare=sql=>{queries.push(sql);const statement=Reflect.apply(prepare,session,[sql]);
   if(this.sdkMode==='queue-grant'&&sql.includes('INSERT INTO delegated_access_grants')||this.sdkMode==='queue-open'&&sql.includes('INSERT INTO finite_preparation_issuer_fences')){
    this.sdkMode='queued';const seen=this.sdkQueue={entered:false,returned:false,rowAbsent:null};return {bind(...args){const bound=statement.bind(...args);return {async first(){seen.entered=true;await new Promise(resolve=>setTimeout(resolve,5100));const row=await bound.first();seen.returned=true;seen.rowAbsent=row===null;return row;}};}};
   }return statement;};return session;};
 }
 async sdkOldPath(path,headers={},body=''){
  if(!['/read-grant','/sdk-completed','/sdk-complete','/sdk-begin','/sdk-approve'].includes(path))throw Error('SYN path');
  const h=new Headers(headers),at=Date.now();h.set('x-afw-finite-boundary',JSON.stringify({startedAt:at,deadline:at+30000,remainingMs:30000}));h.set('x-afw-finite-original-method','POST');h.set('x-afw-finite-original-url','https://delegated-canary.agentfriendlyweb.dev/authorize');h.set('x-afw-finite-version','77777777-7777-4777-8777-777777777777');h.set('x-afw-finite-request-id','77777777-7777-4777-8777-777777777777');
  const response=await createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(new Request('https://afw-private.invalid/_finite-owner'+path,{method:'POST',headers:h,body}));await response.body?.cancel();return response.status;
 }
 async sdkReleaseHeld(){this.sdkRelease?.();this.sdkRelease=null;}
 async sdkReadCurrent(){
  const parent=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/authorize'));
  try{return await readPrivateQaFiniteOwnerContext({ctx:this.ctx,env:this.env,parent:parent.lease});}catch{return {status:'unavailable'};}finally{parent.finish();}
 }
`;
 if(observed)methods=methods.replace("async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}", "async fetch(request){this.sdkSignals={entryAborted:request.signal.aborted,abortObserved:false,settled:false,settledAborted:null};const seen=this.sdkSignals;request.signal.addEventListener('abort',()=>{seen.abortObserved=true;},{once:true});try{return await createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}finally{seen.settled=true;seen.settledAborted=request.signal.aborted;}}");
 // Ticket fixture is external SYN approval DATA, generated through genuine store.
 // It must match a real bounded preparation cookie, never a positive source alias.
 const old="ticketHash='7'.repeat(64)",replacement="ticketHash=phaseRawSha('a'.repeat(64))";
 if(!entry.includes(old))throw Error('SYN exact phase seed changed');
 return imports+entry.replace(old,replacement).replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
}
export async function finiteOwnerSdkWorkers(qa,{observed=false,token=false}={}){
 const mProfile=finiteWranglerProfileTemplate('canaryLive');let outgoingInstrumentations=0;
 let source=`import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
 import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
 export default{async fetch(request,env,ctx){const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}}};`;
 if(token)source=`import {createDelegatedOAuthWorker} from './lib/delegated-oauth-worker.mjs';
 import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
 import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
 const issuer='https://delegated-canary.agentfriendlyweb.dev',worker=createDelegatedOAuthWorker({issuer,resource:issuer+'/mcp'});let tokenPins=null;
 export default{async fetch(request,env,ctx){
  const path=new URL(request.url).pathname;
  if(path==='/fixture/token-config'&&request.method==='POST'){
   const pins=await request.json();tokenPins={AFW_OAUTH_PILOT_CLIENT_ID:pins.clientId,AFW_OAUTH_PILOT_PROJECT_ID:pins.projectId,AFW_OAUTH_PILOT_EXPIRES_AT:pins.expiresAt};return new Response(null,{status:204});
  }
  if(path==='/oauth/token'||path==='/mcp')return worker.fetch(request,{...env,...tokenPins},ctx);
  if(path!=='/authorize')return new Response(null,{status:404});
  const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}
 }};`;
 if(observed)source=source.replace("export default{async fetch(request,env,ctx){const root=",`let active,activeRoot,delay=0;export default{async fetch(request,env,ctx){const path=new URL(request.url).pathname;if(path==='/fixture/signal-state')return Response.json(globalThis.__d02M??{});if(path==='/fixture/abort'){active?.abort();return new Response(null,{status:204});}if(path==='/fixture/abort-root'){activeRoot?.finish();return new Response(null,{status:204});}if(path==='/fixture/elapsed'){delay=29000;return new Response(null,{status:204});}const seen=globalThis.__d02M={incomingEntryAborted:request.signal.aborted,incomingAbortObserved:false,rootAbortObserved:false};request.signal.addEventListener('abort',()=>{seen.incomingAbortObserved=true;},{once:true});const control=new AbortController();request.signal.addEventListener('abort',()=>control.abort(),{once:true});request=new Request(request,{signal:control.signal});active=control;const root=`).replace("try{return await forward", "activeRoot=root;globalThis.__d02M.rootEntryAborted=root.lease.signal.aborted;root.lease.signal.addEventListener('abort',()=>{globalThis.__d02M.rootAbortObserved=true;},{once:true});try{const elapsed=delay;delay=0;if(elapsed)await new Promise(resolve=>setTimeout(resolve,elapsed));return await forward").replace("finally{root.finish();}", "finally{root.finish();if(active===control)active=null;if(activeRoot===root)activeRoot=null;}");
 const plugins=observed?[{name:'SYN-signal-observation',setup(b){b.onLoad({filter:/mcp-qa-finite-owner-oauth-forward\.mjs$/},async args=>{
  outgoingInstrumentations++;let contents=await readFile(args.path,'utf8');const needle="const response=await Reflect.apply(fetcher,stub,[new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal})]);check();";
  if(contents.split(needle).length!==2)throw Error('SYN outgoing observation changed');
  contents=contents.replace(needle,"const outgoing=new Request(finiteOwnerOAuthTarget,{method:'POST',redirect:'manual',headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});globalThis.__d02M.outgoingEntryAborted=outgoing.signal.aborted;globalThis.__d02M.outgoingAbortObserved=false;outgoing.signal.addEventListener('abort',()=>{globalThis.__d02M.outgoingAbortObserved=true;},{once:true});const response=await Reflect.apply(fetcher,stub,[outgoing]);check();");
  return {contents,loader:'js'};
 });}}]:[];
 const built=await build({plugins,stdin:{contents:source,resolveDir:process.cwd()},bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*']});
 if(observed&&outgoingInstrumentations!==1)throw Error('SYN outgoing observer not installed exactly once');
 console.info('D02 fixture M compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:createHash('sha256').update(built.outputFiles[0].contents).digest('hex'),inputs:Object.keys(built.metafile.inputs).length}));
 return {...(qa.resourcePersistencePath?{resourcePersistencePath:qa.resourcePersistencePath}:{}),workers:[{...qa,name:'qa-sdk'},{
  name:'m-sdk',modules:true,script:built.outputFiles[0].text,compatibilityDate:mProfile.compatibility_date,compatibilityFlags:mProfile.compatibility_flags,
  kvNamespaces:{OAUTH_KV:'finite-sdk-shared'},
  ...(token?{d1Databases:{DB:qa.d1Databases.RELEASE_DB},ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'99123',simple:{limit:1000,period:60}}}}:{}),
  bindings:{...(token?{AFW_DELEGATED_OAUTH_ENABLED:'true',AFW_OAUTH_REFRESH_ENABLED:'false',AFW_OAUTH_SERVICE_MODE:'window',AFW_DOSSIER_EVENTS_ENABLED:'false'}:{}),AFW_FINITE_TRIAL_VERSION:{id:'77777777-7777-4777-8777-777777777777'}},
  durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'Initial',scriptName:'qa-sdk',useSQLite:true,uniqueKey:'initial-c2a'}}
 }].reverse()};
}
export async function seedFiniteOwnerSdkClient(mf,source){
 const kv=await mf.getKVNamespace('OAUTH_KV','m-sdk');
 await kv.put('client:'+source.clientId,JSON.stringify({clientId:source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN native client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));
}

/** Fixed read-only observation in the same genuine request scope, used only in
 * hostile fixtures. No witness/root/source result leaves the lexical stack. */
export function instrumentFiniteOwnerQaSdk(source){
 const once=(needle,replacement)=>{if(source.split(needle).length!==2)throw Error('SYN observation point changed');source=source.replace(needle,replacement);};
 once("onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});","globalThis.__d02QaSignals={entryAborted:originalLease.signal.aborted,abortObserved:false,sdkSettledAborted:null};const signalSeen=globalThis.__d02QaSignals;onAbort=()=>{signalSeen.abortObserved=true;clock.close();};originalLease.signal.addEventListener('abort',onAbort,{once:true});");
 once("actualPromise=retain(Promise.resolve().then(()=>{check();return call();}));position='sdk-pending';","actualPromise=retain(Promise.resolve().then(()=>{check();return call();}).then(value=>{signalSeen.sdkSettledAborted=originalLease.signal.aborted;return value;}));position='sdk-pending';");
 const probe=kind=>`let strictUnavailable=false;try{await readPrivateQaFiniteOwnerContext({ctx,env,parent:originalLease});}catch{strictUnavailable=true;}(globalThis.__d02Probes??=[]).push({kind:'${kind}',op,strictUnavailable});`;
 once("await sdkAppend('SdkSend',send,op);await recheckOwned();check();","await sdkAppend('SdkSend',send,op);"+probe('sdk')+"await recheckOwned();check();");
 once("await issuerAppend('Send',send,op);await recheckOwned();check();","await issuerAppend('Send',send,op);"+probe('issuer')+"await recheckOwned();check();");
 once("if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();","if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();(globalThis.__d02Probes??=[]).push({kind:'consumption',sameChild:consumptionChild===l,sameStore:consumptionStore===store,remainingMs:w.deadline-Date.now(),windowMs:w.deadline-w.startedAt});");
 return source;
}

/** Read-only audit of this test's actual SDK1.2.1 encrypted grant. This public
 * wrapping constant and HMAC/AES-KW/AES-GCM format are from pinned
 * cloudflare/workers-oauth-provider v1.2.1 src/oauth-provider.ts:6334-6408.
 * No token exchange, SDK substitute, code logging or production key access. */
export async function readSyntheticIssuedGrantProps(code,grant){
 const publicWrappingConstant=new Uint8Array([0x22,0x7e,0x26,0x86,0x8d,0xf1,0xe1,0x6d,0x80,0x70,0xea,0x17,0x97,0x5b,0x47,0xa6,0x82,0x18,0xfa,0x87,0x28,0xae,0xde,0x85,0xb5,0x1d,0x4a,0xd9,0x96,0xca,0xca,0x43]);
 const hmac=await crypto.subtle.importKey('raw',publicWrappingConstant,{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const material=await crypto.subtle.sign('HMAC',hmac,new TextEncoder().encode(code));
 const wrapping=await crypto.subtle.importKey('raw',material,{name:'AES-KW'},false,['unwrapKey']);
 const key=await crypto.subtle.unwrapKey('raw',Buffer.from(grant.authCodeWrappedKey,'base64'),wrapping,{name:'AES-KW'},{name:'AES-GCM'},false,['decrypt']);
 const bytes=await crypto.subtle.decrypt({name:'AES-GCM',iv:new Uint8Array(12)},key,Buffer.from(grant.encryptedProps,'base64'));
 return JSON.parse(new TextDecoder().decode(bytes));
}
