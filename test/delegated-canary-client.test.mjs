import assert from 'node:assert/strict';
import test from 'node:test';
import {createCanaryAuthorization,acceptCanaryCallback,CANARY_ISSUER,CANARY_CALLBACK} from '../lib/delegated-canary-client.mjs';
test('canary client creates fresh PKCE/state and accepts only its exact issuer/state/callback',()=>{
  const a=createCanaryAuthorization(),b=createCanaryAuthorization();assert.notEqual(a.state,b.state);assert.notEqual(a.verifier,b.verifier);
  assert.ok(a.verifier.length>=43);const auth=new URL(a.url);assert.equal(auth.searchParams.get('code_challenge_method'),'S256');
  const callback=CANARY_CALLBACK+'?'+new URLSearchParams({state:a.state,iss:CANARY_ISSUER,code:'synthetic-code'});
  assert.equal(acceptCanaryCallback(callback,a.state),'synthetic-code');
  assert.equal(acceptCanaryCallback(callback,b.state),null);
  assert.equal(acceptCanaryCallback(callback.replace('localhost','attacker.invalid'),a.state),null);
  assert.equal(acceptCanaryCallback(callback.replace('/callback','/other'),a.state),null);
  assert.equal(acceptCanaryCallback(callback+'&state='+a.state,a.state),null);
  assert.equal(acceptCanaryCallback(callback+'&error=denied',a.state),null);
  assert.equal(acceptCanaryCallback('http://localhost:8794http://attacker.invalid',a.state),null);
});
