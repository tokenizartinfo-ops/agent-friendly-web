import {decodeJwt} from 'jose';
import {verifyCloudflareAccessJwt} from './cloudflare-access-identity.mjs';
const teamDomainPattern=/^(?=.{1,253}$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.cloudflareaccess\.com$/;

/** Prepared identity resolver only: no route, policy, review write or deployment.
 * config and keySet are trusted server dependencies, never request body fields.
 * The review audience must be distinct from the reception service audience.
 */
export async function resolveOperationsReviewOperator(request,config,{keySet,now=Date.now}={}){
 try{
  const valid=(value,max)=>typeof value==='string'&&value.length>0&&value.length<=max&&value.trim()===value;
  const subjectPin=valid(config?.subject,200),opaquePin=typeof config?.operatorId==='string'&&/^operator-[a-f0-9]{64}$/.test(config.operatorId);
  if(config?.enabled!==true||subjectPin===opaquePin||(!subjectPin&&config.subject!==undefined)||(!opaquePin&&config.operatorId!==undefined)||!valid(config.audience,512)||!valid(config.consumerAudience,512)||config.audience===config.consumerAudience)return {ok:false};
  const origin=new URL(config.origin);
  if(origin.protocol!=='https:'||!origin.hostname.endsWith('.agentfriendlyweb.dev')||origin.port||origin.origin!==config.origin||new URL(request.url).origin!==config.origin)return {ok:false};
  const time=now();if(!Number.isSafeInteger(time)||time<0||!Number.isFinite(new Date(time).getTime()))return {ok:false};
  const teamDomain=typeof config.teamDomain==='string'?config.teamDomain.trim().toLowerCase().replace(/\.$/,''):'';
  if(!teamDomainPattern.test(teamDomain))return {ok:false};
  const token=request.headers.get('Cf-Access-Jwt-Assertion');
  const verified=await verifyCloudflareAccessJwt({token,teamDomain,audience:config.audience,keySet});
  if(!verified.ok||(subjectPin&&verified.identity.userId!==config.subject))return {ok:false};
  const claims=decodeJwt(token),audiences=Array.isArray(claims.aud)?claims.aud:[claims.aud];
  if(audiences.length!==1||audiences[0]!==config.audience||claims.sub!==verified.identity.userId||!Number.isSafeInteger(claims.exp)||claims.exp<=Math.floor(time/1000))return {ok:false};
  const input=JSON.stringify(['afw-operations-review-operator-v1',teamDomain,config.audience,claims.sub]);
  const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(input));
  const operatorId='operator-'+Array.from(new Uint8Array(bytes),value=>value.toString(16).padStart(2,'0')).join('');
  if(opaquePin&&operatorId!==config.operatorId)return {ok:false};
  return {ok:true,operatorId};
 }catch{return {ok:false};}
}
