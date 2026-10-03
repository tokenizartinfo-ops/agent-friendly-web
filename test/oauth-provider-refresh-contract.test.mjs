import assert from 'node:assert/strict';
import test from 'node:test';
import { registerHooks } from 'node:module';
import { localOAuthFixture, exchange } from './fixtures/delegated-oauth-runtime.mjs';

const hook=registerHooks({resolve(s,c,next){return s==='cloudflare:workers'?{url:'data:text/javascript,export class WorkerEntrypoint {}',shortCircuit:true}:next(s,c);}});
const {OAuthAuthorizationServer}=await import('@cloudflare/workers-oauth-provider');
hook.deregister();

// Characterization of the installed provider, not AFW refresh enablement.
async function fixture(){
  const f=await localOAuthFixture(({issuer,resource})=>{
    const authorizationServer=new OAuthAuthorizationServer({issuer,resources:[resource],accessTokenTTL:300,
      tokenExchangeCallback:async()=>({accessTokenTTL:300,refreshTokenTTL:600})});
    return {authorizationServer,fetch:(r,e,c)=>authorizationServer.fetch(r,e,c)};
  });
  const api=f.worker.authorizationServer.getOAuthApi(f.env);
  await api.updateClient(f.client.clientId,{grantTypes:['authorization_code','refresh_token']});
  const verifier='a'.repeat(64);
  const challenge=Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier))).toString('base64url');
  const query=new URLSearchParams({response_type:'code',client_id:f.client.clientId,redirect_uri:'http://localhost:8950/callback',resource:f.resource,scope:'afw:project:read',state:'test',code_challenge:challenge,code_challenge_method:'S256'});
  const request=await api.parseAuthRequest(new Request(f.issuer+'/authorize?'+query));
  const completed=await api.completeAuthorization({request,userId:'owner-a',scope:['afw:project:read'],metadata:{},props:{},revokeExistingGrants:false});
  const response=await exchange(f,completed.redirectTo,verifier);
  assert.equal(response.status,200);
  const initial=await response.json();
  const refresh=token=>f.request('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'refresh_token',refresh_token:token,client_id:f.client.clientId,resource:f.resource})},null);
  return {...f,initial,refresh};
}

test('installed provider accepts the previous refresh credential again',async()=>{
  const f=await fixture();try{
    const first=await f.refresh(f.initial.refresh_token);assert.equal(first.status,200);
    const successor=await first.json();assert.notEqual(successor.refresh_token,f.initial.refresh_token);
    const retry=await f.refresh(f.initial.refresh_token);assert.equal(retry.status,200);
    const second=await retry.json();assert.notEqual(second.refresh_token,successor.refresh_token);
  }finally{f.close();}
});

test('installed provider can issue two successors for concurrent refresh requests',async()=>{
  const f=await fixture();try{
    const responses=await Promise.all([f.refresh(f.initial.refresh_token),f.refresh(f.initial.refresh_token)]);
    assert.deepEqual(responses.map(r=>r.status),[200,200]);
    const tokens=await Promise.all(responses.map(r=>r.json()));
    assert.notEqual(tokens[0].refresh_token,tokens[1].refresh_token);
  }finally{f.close();}
});
