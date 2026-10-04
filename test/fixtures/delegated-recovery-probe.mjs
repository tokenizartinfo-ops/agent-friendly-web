// QA adapter only. No production entrypoint imports this module.
const issuer='https://delegated-canary.agentfriendlyweb.dev';
export function createRecoveryProbe(base,{now=()=>Date.now()}={}) {
  return {async fetch(request,env,ctx) {
    const deadline=Date.parse(env.AFW_OAUTH_PILOT_EXPIRES_AT);
    const remaining=deadline-now();
    const url=new URL(request.url);
    if(env.AFW_DELEGATED_OAUTH_ENABLED!=='true'||env.AFW_OAUTH_ISSUER!==issuer||
       env.AFW_OAUTH_RESOURCE!==issuer+'/mcp'||env.AFW_OAUTH_PILOT_CLIENT_ID!=='afw-chatgpt-pilot-20261003'||
       !Number.isFinite(remaining)||remaining<=0||remaining>900000||url.origin!==issuer||
       url.pathname!=='/mcp'||request.method!=='POST')return base.fetch(request,env,ctx);
    let rpc;try{rpc=await request.clone().json();}catch{return base.fetch(request,env,ctx);}
    if(rpc.method!=='tools/call'||rpc.params?.name!=='read_project_summary')return base.fetch(request,env,ctx);
    const db=env.DB;
    const isolated={...env,DB:{prepare(sql){
      if(/^\s*SELECT\b/i.test(sql)&&/\bFROM\s+site_projects\b/i.test(sql))throw Error('synthetic read outage');
      return db.prepare(sql);
    }}};
    return base.fetch(request,isolated,ctx);
  }};
}
