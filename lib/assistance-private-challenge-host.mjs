import {createPrivateCustodyChallenge} from './assistance-private-custody-challenge.mjs';
import {createPrivateChallengeIdentityVerifier} from './assistance-private-challenge-identity.mjs';
import {readOperationsServicePayload} from './operations-service-request-controls.mjs';
import {createRemoteJWKSet} from 'jose';
const fields=['enabled','origin','teamDomain','audience','clientId','principalRef','expiresAt','revision'];
const json=(value,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const fail=()=>{throw Error('Private challenge host unavailable');};
/** Compose with an operator-registered immutable preregistration. Read-only:
 * never registers, adopts closure history or supplies provisioning evidence.
 */
export function createPreregisteredExchangePreparation({preregistration,readInstallation}={}){
 return async identity=>{try{
  if(typeof preregistration?.read!=='function'||typeof readInstallation!=='function'||typeof identity?.principalRef!=='string'||!/^[0-9a-f]{64}$/.test(identity.principalRef))return false;
  const snapshot=JSON.stringify(readInstallation()),matches=p=>p?.approval?.identityRef===identity?.principalRef&&JSON.stringify(p)===snapshot;
  if(!matches(await preregistration.read()))return false;
  if(!matches(await preregistration.read()))return false;
  return JSON.stringify(readInstallation())===snapshot;
 }catch{return false;}};
}
/** Standalone host composition, deliberately not mounted/exported by any Worker.
 * issue/status/withdraw remain internal operator methods, never HTTP/RPC.
 * fetch authenticates and confirms, or explicitly requests a one-shot nonce
 * under prior administrative authority. It grants no provisioning/install power.
 */
export function createPrivateChallengeHost({storage,readInstallation,readIdentityConfig,keySet,limiter,now=Date.now,allowChallengeRequest=false,prepareExchange}={}){
 const administrative=createPrivateCustodyChallenge({storage,readInstallation,now});
 function config(){
  const value=readIdentityConfig();if(value&&typeof value.then==='function'){if(typeof value.catch==='function')void value.catch(()=>{});fail();}
  if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==fields.length||!fields.every(k=>Object.getOwnPropertyDescriptor(value,k)?.enumerable&&Object.hasOwn(Object.getOwnPropertyDescriptor(value,k),'value')&&['string','number','boolean'].includes(typeof value[k])))fail();
  return Object.freeze({...value});
 }
 let remote;
 const keys=policy=>{
  if(keySet)return keySet;
  if(typeof policy.teamDomain!=='string'||!/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(policy.teamDomain))fail();
  const issuer='https://'+policy.teamDomain;
  if(remote?.issuer!==issuer)remote={issuer,keySet:createRemoteJWKSet(new URL(issuer+'/cdn-cgi/access/certs'),{timeoutDuration:5000,cooldownDuration:30000})};
  return remote.keySet;
 };
 return Object.freeze({
  issue:()=>administrative.issue(),status:()=>administrative.status(),withdraw:()=>administrative.withdraw(),
  async fetch(request){try{
   if(typeof limiter?.limit!=='function'||typeof readIdentityConfig!=='function'||typeof now!=='function'||allowChallengeRequest===true&&typeof prepareExchange!=='function')return json({code:'unavailable'},503);
   let last=-1;
   const clock=()=>{const t=now();if(!Number.isSafeInteger(t)||t<0||t<last)fail();last=t;return t;};
   const initial=config(),snapshot=JSON.stringify(initial),verify=createPrivateChallengeIdentityVerifier({readConfig:config,keySet:keys(initial),now:clock}),identity=await verify(request);if(!identity)return json({code:'service_identity_required'},401);
   const checked=()=>{const t=clock();if(request.signal.aborted||JSON.stringify(config())!==snapshot||t>=identity.expiresAt)fail();return identity;};
   checked();const allowed=await limiter.limit({key:'afw-private-challenge:'+identity.principalRef});checked();if(allowed?.success!==true)return json({code:'try_later'},429);
   let body;try{body=await readOperationsServicePayload(request,1000);}catch(e){return json({code:'invalid_request'},e.status??400);}
   checked();
   const issuing=allowChallengeRequest===true&&body&&Object.getPrototypeOf(body)===Object.prototype&&Object.keys(body).length===1&&body.challenge==='request';
   const prepare=async()=>{
    checked();const pins=readInstallation();if(pins?.approval?.identityRef!==identity.principalRef)fail();
    if(await prepareExchange(Object.freeze({...identity}))!==true)fail();checked();
    if(readInstallation()?.approval?.identityRef!==identity.principalRef)fail();
   };
   if(allowChallengeRequest===true){
    if(!issuing&&(!body||Object.keys(body).length!==1||typeof body.nonce!=='string'||!/^[0-9a-f]{64}$/.test(body.nonce)))return json({code:'invalid_request'},400);
    await prepare();
   }
   const challenge=createPrivateCustodyChallenge({storage,readInstallation,now:clock,readServiceIdentity:checked});
   const result=issuing?await challenge.issue():await challenge.consume(body);checked();
   if(allowChallengeRequest===true)await prepare();checked();return result?json(result):json({code:'not_confirmed'},409);
  }catch{return json({code:'not_confirmed'},409);}},
 });
}
