import {build} from 'esbuild';
import {createHash} from 'node:crypto';
// SYN fixture composition only. Actual source/SDK/journals/Unit2a modules remain.
export function extendFiniteOwnerQaSdk(entry){
 const imports=`import {createPrivateQaFiniteOwnerOAuthReceiver} from './lib/mcp-qa-finite-owner-oauth-qa.mjs';\n`;
 const methods=`
 async fetch(request){return createPrivateQaFiniteOwnerOAuthReceiver({ctx:this.ctx,env:this.env}).fetch(request);}
 async sdkObservation(){return {rows:[...await this.ctx.storage.list({prefix:'afw.finite-owner-issuer-provenance.v1:'})],calls:this.sdkCalls??[]};}
 async sdkConfigure(mode='normal'){
  const kv=this.env.AFW_FINITE_OWNER_OAUTH_KV;this.sdkCalls=[];this.sdkMode=mode;this.sdkRelease=null;this.sdkRestore?.();
  const methods={get:kv.get,put:kv.put,delete:kv.delete,list:kv.list};this.sdkRestore=()=>{for(const key of Object.keys(methods))kv[key]=methods[key];};
  for(const key of Object.keys(methods))kv[key]=async(...args)=>{
   this.sdkCalls.push({method:key,prefix:String(args[0]).split(':')[0]});
   if(key==='list')throw Error('SYN prohibited SDK list');
   if(this.sdkMode==='miss'&&key==='get'&&String(args[0]).startsWith('client:'))return null;
   if(this.sdkMode==='error'&&key==='get')throw Error('SYN KV error');
   const actual=Reflect.apply(methods[key],kv,args);
   if(this.sdkMode==='hold-'+key){this.sdkMode='held';return actual.then(value=>new Promise(resolve=>{this.sdkRelease=()=>resolve(value);}));}
   return actual;
  };
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
export async function finiteOwnerSdkWorkers(qa){
 const source=`import {forwardPrivateFiniteOwnerOAuth} from './lib/mcp-qa-finite-owner-oauth-forward.mjs';
 import {createFiniteOwnerRequestLease} from './lib/mcp-qa-finite-owner-preparation.mjs';
 export default{async fetch(request,env,ctx){const root=createFiniteOwnerRequestLease(request);try{return await forwardPrivateFiniteOwnerOAuth({request,env,ctx},root.lease);}finally{root.finish();}}};`;
 const built=await build({stdin:{contents:source,resolveDir:process.cwd()},bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*']});
 console.info('D02 fixture M compiler',JSON.stringify({bytes:built.outputFiles[0].contents.length,sha256:createHash('sha256').update(built.outputFiles[0].contents).digest('hex'),inputs:Object.keys(built.metafile.inputs).length}));
 return {workers:[{...qa,name:'qa-sdk'},{
  name:'m-sdk',modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],
  kvNamespaces:{OAUTH_KV:'finite-sdk-shared'},
  bindings:{AFW_FINITE_TRIAL_VERSION:{id:'77777777-7777-4777-8777-777777777777'}},
  durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'Initial',scriptName:'qa-sdk',useSQLite:true,uniqueKey:'initial-c2a'}}
 }]};
}
export async function seedFiniteOwnerSdkClient(mf,source){
 const kv=await mf.getKVNamespace('OAUTH_KV','m-sdk');
 await kv.put('client:'+source.clientId,JSON.stringify({clientId:source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN native client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));
}
