import {build} from 'esbuild';
import {createHash} from 'node:crypto';
// SYN fixture composition only. Actual source/SDK/journals/Unit2a modules remain.
export function extendFiniteOwnerQaSdk(entry){
 const imports=`import {createPrivateQaFiniteOwnerOAuthReceiver} from './lib/mcp-qa-finite-owner-oauth-qa.mjs';\n`;
 const methods=`
 async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}
 async sdkObservation(){return {held:!!this.sdkRelease,probes:globalThis.__d02Probes??[],primary:this.sdkPrimary??[],rows:[...await this.ctx.storage.list({prefix:'afw.finite-owner-issuer-provenance.v1:'})],calls:this.sdkCalls??[]};}
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
 async sdkReplaceHolder(){const kv=this.env.AFW_FINITE_OWNER_OAUTH_KV,original=kv.get;kv.get=(...args)=>Reflect.apply(original,kv,args);}
 async sdkAliasAbsent(absent){if(absent){this.sdkAlias=this.env.AFW_FINITE_OWNER_OAUTH_KV;this.env.AFW_FINITE_OWNER_OAUTH_KV=undefined;}else this.env.AFW_FINITE_OWNER_OAUTH_KV=this.sdkAlias;}
 async sdkPrimaryObserve(){
  this.sdkPrimary=[];const db=this.env.RELEASE_DB,original=db.withSession;
  db.withSession=constraint=>{const session=Reflect.apply(original,db,[constraint]),prepare=session.prepare,queries=[];this.sdkPrimary.push({constraint,queries});session.prepare=sql=>{queries.push(sql);return Reflect.apply(prepare,session,[sql]);};return session;};
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
 // Ticket fixture is external SYN approval DATA, generated through genuine store.
 // It must match a real bounded preparation cookie, never a positive source alias.
 const old="ticketHash='7'.repeat(64)",replacement="ticketHash=phaseRawSha('a'.repeat(64))";
 if(!entry.includes(old))throw Error('SYN exact phase seed changed');
 return imports+entry.replace(old,replacement).replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
}
export async function finiteOwnerSdkWorkers(qa,{observed=false}={}){
 let source=`import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
 import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
 export default{async fetch(request,env,ctx){const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}}};`;
 if(observed)source=source.replace("export default{async fetch(request,env,ctx){const root=",`let active,delay=0;export default{async fetch(request,env,ctx){const path=new URL(request.url).pathname;if(path==='/fixture/abort'){active?.abort();return new Response(null,{status:204});}if(path==='/fixture/elapsed'){delay=29000;return new Response(null,{status:204});}const control=new AbortController();request.signal.addEventListener('abort',()=>control.abort(),{once:true});request=new Request(request,{signal:control.signal});active=control;const root=`).replace("try{return await forward", "try{const elapsed=delay;delay=0;if(elapsed)await new Promise(resolve=>setTimeout(resolve,elapsed));return await forward").replace("finally{root.finish();}", "finally{root.finish();if(active===control)active=null;}");
 const built=await build({stdin:{contents:source,resolveDir:process.cwd()},bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*']});
 console.info('D02 fixture M compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:createHash('sha256').update(built.outputFiles[0].contents).digest('hex'),inputs:Object.keys(built.metafile.inputs).length}));
 return {...(qa.resourcePersistencePath?{resourcePersistencePath:qa.resourcePersistencePath}:{}),workers:[{...qa,name:'qa-sdk'},{
  name:'m-sdk',modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
  kvNamespaces:{OAUTH_KV:'finite-sdk-shared'},
  bindings:{AFW_FINITE_TRIAL_VERSION:{id:'77777777-7777-4777-8777-777777777777'}},
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
 const probe=kind=>`let strictUnavailable=false;try{await readPrivateQaFiniteOwnerContext({ctx,env,parent:originalLease});}catch{strictUnavailable=true;}(globalThis.__d02Probes??=[]).push({kind:'${kind}',op,strictUnavailable});`;
 once("await sdkAppend('SdkSend',send,op);await recheckOwned();check();","await sdkAppend('SdkSend',send,op);"+probe('sdk')+"await recheckOwned();check();");
 once("await issuerAppend('Send',send,op);await recheckOwned();check();","await issuerAppend('Send',send,op);"+probe('issuer')+"await recheckOwned();check();");
 once("if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();","if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();(globalThis.__d02Probes??=[]).push({kind:'consumption',sameChild:consumptionChild===l,sameStore:consumptionStore===store,remainingMs:w.deadline-Date.now(),windowMs:w.deadline-w.startedAt});");
 return source;
}
