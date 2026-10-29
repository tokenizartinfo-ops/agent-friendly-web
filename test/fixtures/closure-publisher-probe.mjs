import {readerFixture,ROOT,W,OP,APP} from './closure-reader-probe.mjs';
import {digest} from './canary-restoration.mjs';
export {ROOT,W,OP,APP};
export function publisherFixture(options){
 const f=readerFixture(options);
 f.policy.operation='qualify_closure_publisher';
 const raw=JSON.stringify(f.policy);f.hash=digest(raw);
 f.env.AFW_MCP_PUBLISHER_PROBE_ENABLED='true';f.env.AFW_MCP_PUBLISHER_PROBE_POLICY=raw;f.env.AFW_MCP_READER_PROBE_ENABLED='false';
 f.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='synthetic-publisher-token';
 const next='77777777-7777-4777-8777-777777777777';
 f.options.fetchImpl=async(url,init)=>{
  f.calls.push({url,init});const u=new URL(url),write=init.method==='POST';
  if(u.origin!=='https://api.cloudflare.com'||!['GET','POST'].includes(init.method)||init.redirect!=='manual'||init.cache!=='no-store'||init.headers.Authorization!=='Bearer '+(write?'synthetic-publisher-token':'synthetic-reader-token'))throw Error('Unexpected request');
  if(write){
   if(u.pathname!=='/client/v4'+ROOT+'/workers/scripts/'+W+'/deployments'||u.search)throw Error('Foreign write');
   const body=JSON.parse(init.body);
   if(body.strategy!=='percentage'||body.versions.length!==1||body.versions[0].version_id!==f.policy.canary.versionId||body.versions[0].percentage!==100||body.annotations['workers/message']!=='AFW closed publisher qualification '+f.hash)throw Error('Wrong write');
   await f.f.request({method:'POST',path:ROOT+'/workers/scripts/'+W+'/deployments',body});
   f.f.state.canary={id:next,strategy:'percentage',versions:[{version_id:f.policy.canary.versionId,percentage:100}],annotations:body.annotations};
   return Response.json({success:true,errors:[],result:{id:next}});
  }
  if(init.body!==undefined)throw Error('Unexpected read body');
  const response=await f.f.request({method:'GET',path:u.pathname.replace('/client/v4',''),query:Object.fromEntries([...u.searchParams].map(([k,v])=>[k,k==='per_page'?Number(v):v]))});
  const{status,...body}=response;return Response.json(body,{status});
 };
 f.nextDeployment=next;return f;
}
