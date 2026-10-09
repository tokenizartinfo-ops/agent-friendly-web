import {createRemoteJWKSet,jwtVerify} from 'jose';
const ORIGIN='https://operations-manager.agentfriendlyweb.dev',PATH='/assistance/custody/confirm';
const fields=['enabled','origin','teamDomain','audience','clientId','principalRef','expiresAt','revision'];
const time=t=>Number.isSafeInteger(t)&&t>=0&&t<=8640000000000000;
const fail=()=>{throw Error('Private service identity unavailable');};
function policy(v){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==fields.length||!fields.every(k=>Object.getOwnPropertyDescriptor(v,k)?.enumerable&&Object.hasOwn(Object.getOwnPropertyDescriptor(v,k),'value')))fail();
 if(v.enabled!==true||!Number.isSafeInteger(v.revision)||v.revision<1||v.origin!==ORIGIN||typeof v.teamDomain!=='string'||!/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(v.teamDomain)||!['audience','clientId'].every(k=>typeof v[k]==='string'&&v[k].length>0&&v[k].length<=(k==='audience'?512:200))||typeof v.principalRef!=='string'||!/^[0-9a-f]{64}$/.test(v.principalRef)||!time(v.expiresAt))fail();
 return Object.freeze({...v});
}
/** Internal verifier only: trusted host config/key resolver, no mounted route.
 * Signed service authentication is not revocation, provisioning or cloud custody.
 * Host must monotonically advance revision for every withdrawal/regrant/change.
 * Never return or persist the JWT, claims, client credentials or verification errors.
 */
export function createPrivateChallengeIdentityVerifier({readConfig,keySet,now=Date.now}={}){
 const keys=new Map();
 return async request=>{try{
  if(typeof readConfig!=='function'||typeof now!=='function')fail();
  const read=()=>{const value=readConfig();if(value&&typeof value.then==='function'){if(typeof value.catch==='function')void value.catch(()=>{});fail();}return policy(value);};
  const initial=read(),snapshot=JSON.stringify(fields.map(k=>initial[k]));let last=-1;
  const check=()=>{const current=read();if(JSON.stringify(fields.map(k=>current[k]))!==snapshot||request.signal.aborted)fail();const t=now();if(!time(t)||t<last||t>=initial.expiresAt)fail();last=t;return t;};
  const url=new URL(request.url);
  if(url.origin!==ORIGIN||url.pathname!==PATH||url.search||request.method!=='POST'||request.headers.has('Origin')||request.headers.has('Sec-Fetch-Site'))fail();
  const token=request.headers.get('Cf-Access-Jwt-Assertion');if(!token||token.length>16384)fail();
  const start=check(),issuer='https://'+initial.teamDomain;
  if(!keySet&&!keys.has(issuer))keys.set(issuer,createRemoteJWKSet(new URL(issuer+'/cdn-cgi/access/certs'),{timeoutDuration:5000,cooldownDuration:30000}));
  const {payload}=await jwtVerify(token,keySet||keys.get(issuer),{issuer,audience:initial.audience,algorithms:['RS256'],requiredClaims:['exp','iat','sub','common_name','type'],currentDate:new Date(start)});
  const end=check(),audiences=Array.isArray(payload.aud)?payload.aud:[payload.aud],expiry=payload.exp*1000,issued=payload.iat*1000;
  if(audiences.length!==1||audiences[0]!==initial.audience||payload.type!=='app'||payload.sub!==''||payload.common_name!==initial.clientId||!time(expiry)||!time(issued)||issued>start||issued>=expiry||expiry<=end)fail();
  return {principalRef:initial.principalRef,expiresAt:Math.min(expiry,initial.expiresAt)};
 }catch{return null;}};
}
