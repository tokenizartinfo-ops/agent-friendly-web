// CI ONLY: actual SDK/D1/KV with injected storage ACK faults; NEVER a runtime entry.
import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
import {createPreparationClientMaintenance} from '../../lib/preparation-client-maintenance.mjs';
let host,options,mode='',offset=0,writes=0,claimWrites=0,releasePut;
const issuer='https://preparation.example.invalid',resource=issuer+'/mcp';
const flags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DELEGATED_PREPARATION_ENABLED','AFW_DELEGATED_PREPARATION_ROUTER_ENABLED','AFW_DELEGATED_PREPARATION_CONNECTIONS_ENABLED'];
function ready(env){
 if(host)return;
 const kv={
  get:(...a)=>env.OAUTH_KV.get(...a),
  list:async(...a)=>mode==='invisible'?{keys:[],list_complete:true}:mode==='incomplete'?{keys:[],list_complete:false,cursor:'ci-incomplete'}:env.OAUTH_KV.list(...a),
  async put(key,value,extra){
   await env.OAUTH_KV.put(key,value,extra);
   if(!key.startsWith('client:'))return;
   writes++;
   if(mode==='sdk-ack-loss')throw Error('PRIVATE provider ACK detail must not escape');
   if(mode==='sdk-late')await new Promise(resolve=>{releasePut=resolve;});
   if(mode==='sdk-drift')options.env[flags[0]]='true';
  },
  delete:(...a)=>env.OAUTH_KV.delete(...a),
 };
 const wrapSession=session=>({prepare(sql){
  const stmt=session.prepare(sql);
  return{bind(...args){
   const bound=stmt.bind(...args);
   return{first:(...a)=>bound.first(...a),all:()=>bound.all(),async run(){
    const result=await bound.run();
    if(sql.startsWith('INSERT INTO preparation_client_bootstrap')){
     claimWrites+=result.meta.changes;
     if(mode==='claim-ack-loss')throw Error('PRIVATE SQL ACK detail must not escape');
    }
    return result;
   }};
  }};
 }});
 const db={withSession:kind=>wrapSession(env.DB.withSession(kind))};
 const start=Date.now()-1000;
 options={enabled:true,issuer,resource,redirectUri:'https://chatgpt.com/connector/oauth/ci_callback_1',operationId:'ci-preparation-1',
  startedAt:new Date(start).toISOString(),expiresAt:new Date(start+600000).toISOString(),env:{DB:db,OAUTH_KV:kv,...Object.fromEntries(flags.map(k=>[k,'false']))},
  now:()=>Date.now()+offset,monotonic:()=>performance.now()+offset};
 host=createPreparationClientMaintenance(options);
}
export default {async fetch(request,env){
 const path=new URL(request.url).pathname;
 if(path==='/__ci/default'){
  let touched=0;const disabled={enabled:false};Object.defineProperty(disabled,'env',{enumerable:true,get(){touched++;throw Error();}});
  return Response.json({defaultClosed:createPreparationClientMaintenance()===null,disabledClosed:createPreparationClientMaintenance(disabled)===null,touched});
 }
 ready(env);
 if(path==='/__ci/register')return Response.json(await host.register());
 if(path==='/__ci/reconcile')return Response.json(await host.reconcile());
 if(path==='/__ci/mode'){mode=(await request.json()).mode;return Response.json({set:true});}
 if(path==='/__ci/recreate'){host=createPreparationClientMaintenance(options);return Response.json({created:true});}
 if(path==='/__ci/expire'){offset=700000;return Response.json({expired:true});}
 if(path==='/__ci/flip'){options.env[flags[0]]='true';return Response.json({flipped:true});}
 if(path==='/__ci/restore'){options.env[flags[0]]='false';return Response.json({restored:true});}
 if(path==='/__ci/change-operation'){options={...options,operationId:'ci-preparation-other'};host=createPreparationClientMaintenance(options);return Response.json({changed:true});}
 if(path==='/__ci/release'){releasePut?.();releasePut=undefined;return Response.json({released:true});}
 if(path==='/__ci/invalid'){
  const failures=[];
  for(const changes of [
   {redirectUri:'http://127.0.0.1/callback'},{redirectUri:'https://chatgpt.com/connector/oauth/ci?x=1'},
   {redirectUri:'https://other.invalid/callback'},{resource:issuer+'/other'},
   {startedAt:new Date(Date.now()-700000).toISOString()},{operationId:''},
  ]){try{createPreparationClientMaintenance({...options,...changes});failures.push(false);}catch{failures.push(true);}}
  return Response.json({failures});
 }
 if(path==='/__ci/tamper'||path==='/__ci/duplicate'){
  const api=new OAuthAuthorizationServer({issuer,resources:[resource],clientIdMetadataDocumentEnabled:false}).getOAuthApi(options.env);
  const list=await api.listClients({limit:2}),client=list.items[0];
  if(path==='/__ci/tamper')await api.updateClient(client.clientId,{redirectUris:['https://chatgpt.com/connector/oauth/wrong']});
  else await api.createClient({clientName:client.clientName,redirectUris:client.redirectUris,grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none'});
  return Response.json({changed:true});
 }
 if(path==='/__ci/stats'){
  const keys=await env.OAUTH_KV.list();
  return Response.json({writes,claimWrites,keyNames:keys.keys.map(k=>k.name),row:await env.DB.withSession('first-primary').prepare('SELECT * FROM preparation_client_bootstrap').first()});
 }
 return new Response(null,{status:404});
}};
