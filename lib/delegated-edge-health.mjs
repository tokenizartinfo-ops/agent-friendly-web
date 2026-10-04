const origins=Object.freeze({canary:'https://delegated-canary.agentfriendlyweb.dev','real-pilot':'https://delegated-pilot.agentfriendlyweb.dev'});
async function metadata(response) {
  if(!(response.headers.get('content-type')||'').startsWith('application/json')||!response.body)throw Error('Invalid metadata');
  const reader=response.body.getReader();let size=0,text='';const decoder=new TextDecoder();
  try {for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>16384)throw Error('Metadata too large');text+=decoder.decode(value,{stream:true});}return JSON.parse(text+decoder.decode());}
  finally {try{await reader.cancel();}catch{/* Best effort; never log bodies. */}}
}

/** Public edge probe only: never authenticates or reads a dossier. */
export async function checkDelegatedEdge({service,expected='closed',fetchImpl=fetch,now=()=>new Date().toISOString()}={}) {
  if(!Object.hasOwn(origins,service??''))throw Error('Unknown service');
  if(!['closed','available'].includes(expected))throw Error('Unknown expectation');
  const origin=origins[service],checks=[];
  for(const path of ['/mcp','/.well-known/oauth-authorization-server','/.well-known/oauth-protected-resource/mcp']) {
    let status=null,pass=false,reason='network_unavailable';
    try {
      const response=await fetchImpl(origin+path,{method:'GET',redirect:'error',signal:AbortSignal.timeout(5000)});
      status=response.status;
      if(expected==='closed'){pass=status===404;reason=pass?'closed':'unexpected_edge_status';void response.body?.cancel().catch(()=>{});}
      else if(path==='/mcp'){pass=status===401;reason=pass?'authentication_required':'unexpected_edge_status';void response.body?.cancel().catch(()=>{});}
      else if(status!==200){reason='metadata_unavailable';void response.body?.cancel().catch(()=>{});}
      else {
        const value=await metadata(response);
        pass=path.includes('authorization-server')
          ? value.issuer===origin&&value.authorization_endpoint===origin+'/authorize'&&value.token_endpoint===origin+'/oauth/token'&&Array.isArray(value.code_challenge_methods_supported)&&value.code_challenge_methods_supported.includes('S256')&&Array.isArray(value.token_endpoint_auth_methods_supported)&&value.token_endpoint_auth_methods_supported.includes('none')
          : value.resource===origin+'/mcp'&&Array.isArray(value.authorization_servers)&&value.authorization_servers.length===1&&value.authorization_servers[0]===origin;
        reason=pass?'metadata_valid':'metadata_mismatch';
      }
    } catch {reason=status===200?'metadata_invalid':'network_unavailable';}
    checks.push({path,status,pass,reason});
  }
  return {service,origin,expected,checkedAt:now(),ok:checks.every(row=>row.pass),privateReadVerified:false,checks};
}
