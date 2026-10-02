import { verifyCloudflareAccessJwt } from './cloudflare-access-identity.mjs';
import { decodeJwt } from 'jose';

/** Internal resolver, not a deployed route. Configuration and keySet are server-only.
 * Does not authorize customer projects or autonomous mail sending.
 */
export async function resolveMailOperator(request,config,{keySet}={}) {
  try {
    if (!config || typeof config.subject!=='string' || !config.subject.trim() || config.subject.length>200 || typeof config.audience!=='string' || !config.audience.trim()) return {ok:false};
    const expected=new URL(config.origin);
    if (expected.protocol!=='https:' || !expected.hostname.endsWith('.agentfriendlyweb.dev') || expected.origin!==config.origin || expected.port || new URL(request.url).origin!==config.origin) return {ok:false};
    const verified=await verifyCloudflareAccessJwt({token:request.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:config.teamDomain,audience:config.audience,keySet});
    if (!verified.ok || verified.identity.userId!==config.subject) return {ok:false};
    // Generic verification checks exp when present; this operator requires it.
    const claims=decodeJwt(request.headers.get('Cf-Access-Jwt-Assertion'));
    if (!Number.isSafeInteger(claims.exp) || claims.exp<=Math.floor(Date.now()/1000)) return {ok:false};
    const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(['afw-mail-operator-v1',config.teamDomain,config.audience,verified.identity.userId])));
    return {ok:true,actorRef:'actor-'+Array.from(new Uint8Array(bytes),x=>x.toString(16).padStart(2,'0')).join('')};
  } catch {return {ok:false};}
}
