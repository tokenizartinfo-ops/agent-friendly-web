import { randomBytes,createHash } from 'node:crypto';
export const CANARY_ISSUER='https://delegated-canary.agentfriendlyweb.dev';
export const CANARY_CLIENT='afw-canary-loopback-20261001';
export const CANARY_CALLBACK='http://localhost:8794/callback';
export function createCanaryAuthorization(){
  const verifier=randomBytes(32).toString('base64url'),state=randomBytes(32).toString('base64url');
  const params=new URLSearchParams({response_type:'code',client_id:CANARY_CLIENT,redirect_uri:CANARY_CALLBACK,
    resource:CANARY_ISSUER+'/mcp',scope:'afw:project:read afw:evidence:read',project:'oauth-canary-owner',state,
    code_challenge:createHash('sha256').update(verifier).digest('base64url'),code_challenge_method:'S256'});
  return {verifier,state,url:CANARY_ISSUER+'/authorize?'+params};
}
export function acceptCanaryCallback(url,state){
  let value;try{value=new URL(url);}catch{return null;}
  if(value.origin!==new URL(CANARY_CALLBACK).origin||value.pathname!=='/callback'||
    value.searchParams.getAll('state').length!==1||value.searchParams.get('state')!==state||
    value.searchParams.getAll('iss').length!==1||value.searchParams.get('iss')!==CANARY_ISSUER||
    value.searchParams.has('error')||value.searchParams.getAll('code').length!==1)return null;
  const code=value.searchParams.get('code');return code&&code.length<=4096?code:null;
}
