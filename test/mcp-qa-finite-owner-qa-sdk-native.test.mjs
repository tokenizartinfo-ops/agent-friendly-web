import test from 'node:test';
import assert from 'node:assert/strict';

// Missing-feature RED is deliberately separate from a native pending-operation
// RED: absence of these modules does not claim that an SDK call was entered.
async function feature(path,names){
 const m=await import(path).catch(error=>{if(error.code==='ERR_MODULE_NOT_FOUND'&&error.message.includes(path.split('/').at(-1)))return {};throw error;});
 for(const name of names)assert.equal(typeof m[name],'function','missing D0.2 helper: '+name);
 return m;
}
test('D0.2 local resolved result has a strict domain and rejects the removed reported ACK',async()=>{
 const {sealFiniteOwnerIssuerProvenanceRecord:seal,encodeFiniteOwnerIssuerProvenanceRecord:encode,decodeFiniteOwnerIssuerProvenanceRecord:decode}=await feature('../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs',['sealFiniteOwnerIssuerProvenanceRecord','encodeFiniteOwnerIssuerProvenanceRecord','decodeFiniteOwnerIssuerProvenanceRecord']);
 const input={purpose:'afw.finite-owner-sdk-observed.v1',sendHash:'a'.repeat(64),resultHash:'b'.repeat(64),observedAt:100,outcome:'resolved'};
 const record=seal('SdkObserved',input),raw=encode('SdkObserved',record);
 assert.deepEqual(decode('SdkObserved',raw),record);
 for(const extra of [{reported:true},{code:'never durable'},{operation:'sdk_complete'},{outcome:'reported'}])assert.throws(()=>seal('SdkObserved',{...input,...extra}));
 assert.throws(()=>seal('SdkAck',input));
 assert.throws(()=>decode('SdkObserved',raw+' '));
 assert.throws(()=>seal('SdkObserved',Object.defineProperty({...input},'resultHash',{enumerable:true,get(){throw Error('accessor ran');}})),error=>!error.message.includes('accessor ran'));
});
test('D0.2 fixed original authorization grammar denies old result paths and payloads',async()=>{
 const {qualifyFiniteOwnerOAuthRequest:qualify}=await feature('../lib/mcp-qa-finite-owner-oauth-wire.mjs',['qualifyFiniteOwnerOAuthRequest']);
 const origin='https://delegated-canary.agentfriendlyweb.dev';
 const url=origin+'/authorize?client_id=c&redirect_uri=https%3A%2F%2Fclient.example%2Fcb&response_type=code&resource='+encodeURIComponent(origin+'/mcp')+'&scope=afw%3Aproject%3Aread&state=s&code_challenge='+'a'.repeat(43)+'&code_challenge_method=S256';
 const get=new Request(url);assert.equal(qualify(get,new Uint8Array()).method,'GET');
 for(const path of ['/read-grant','/sdk-completed','/sdk-complete','/sdk-begin','/sdk-approve'])assert.throws(()=>qualify(new Request(origin+path),new Uint8Array()));
 assert.throws(()=>qualify(new Request(url+'&resultHash='+'b'.repeat(64)),new Uint8Array()));
 assert.throws(()=>qualify(new Request(url+'&client_id=c'),new Uint8Array()));
 const headers={Origin:origin,'Content-Type':'application/x-www-form-urlencoded'};
 const post=new Request(origin+'/authorize',{method:'POST',headers});
 const form='handle='+'a'.repeat(43)+'&decision=approve&scope=afw%3Aproject%3Aread';
 assert.equal(qualify(post,new TextEncoder().encode(form)).method,'POST');
 for(const suffix of ['&sdkCompleted=true','&resultHash=x','&decision=approve'])assert.throws(()=>qualify(post,new TextEncoder().encode(form+suffix)));
 assert.throws(()=>qualify(post,new Uint8Array(16385)));
});
