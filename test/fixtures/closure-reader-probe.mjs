import {restorationFixture,fixtureConfigHash,digest,W,OP,ROOT,APP} from './canary-restoration.mjs';
export {W,OP,ROOT,APP};
export function readerFixture({at=Date.UTC(2026,9,28,22)}={}){
 const f=restorationFixture({at});f.state.canary={id:f.ids.closedDep,strategy:'percentage',versions:[{version_id:f.ids.closed,percentage:100}]};
 const policy={operation:'inspect_closure_reader',startAt:at-1000,expiresAt:at+120000,canary:{versionId:f.ids.closed,deploymentId:f.ids.closedDep,moduleHash:f.policy.closed.moduleHash,moduleBytes:f.policy.closed.moduleBytes,configurationHash:fixtureConfigHash(f.state.closed)},operator:{...f.policy.operator}};
 const raw=JSON.stringify(policy),calls=[],ctx={storage:f.storage,id:{toString:()=>'9'.repeat(64)}};
 const env={AFW_MCP_READER_PROBE_ENABLED:'true',AFW_MCP_READER_PROBE_POLICY:raw,AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-reader-token',AFW_INDEPENDENT_CLOSURE:{idFromName:name=>{if(name!=='afw-own-successor-closure-v1')throw Error('Wrong private actor');return{toString:()=>'9'.repeat(64)};}}};
 const fetchImpl=async(url,init)=>{
  calls.push({url,init});const u=new URL(url);if(u.origin!=='https://api.cloudflare.com'||init.method!=='GET'||init.redirect!=='manual'||init.cache!=='no-store'||init.headers.Authorization!=='Bearer synthetic-reader-token'||init.body!==undefined)throw Error('Unexpected request');
  const response=await f.request({method:init.method,path:u.pathname.replace('/client/v4',''),query:Object.fromEntries([...u.searchParams].map(([k,v])=>[k,k==='per_page'?Number(v):v]))});const{status,...body}=response;return Response.json(body,{status});
 };
 return{f,policy,env,ctx,hash:digest(raw),calls,options:{env,ctx,now:f.options.now,fetchImpl},advance:f.advance};
}
