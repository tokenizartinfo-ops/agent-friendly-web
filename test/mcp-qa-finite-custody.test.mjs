import test from 'node:test';
import assert from 'node:assert/strict';
import {finiteGhaCustody,verifyFiniteGhaCustody,finiteCfEnvelope} from '../lib/mcp-qa-finite-custody.mjs';
test('account selfverify uses SOURCE receipt and informational null message without scope claim',async()=>{
 const custody=finiteGhaCustody(),at=Date.parse('2026-11-01T18:00:00Z'),paths=[];
 const result=await verifyFiniteGhaCustody({custody,check:()=>{},now:()=>at,R1:at+480000,request:async path=>{paths.push(path);return {value:{success:true,errors:[],messages:[{code:10000,message:'Valid',type:null}],result:{id:custody.id,status:'active',expires_on:new Date(custody.expiresAt).toISOString(),not_before:null}}};}});
 assert.deepEqual(paths,['/accounts/85d0d5dadac3341a564f22ce885e9eec/tokens/verify']);assert.equal(result.scopeVerified,false);
});
for(const mode of ['id','inactive','expiry','notbefore','receipt','groups','hash','malformed-message'])test('account custody rejects '+mode,async()=>{
 const custody=structuredClone(finiteGhaCustody()),at=Date.parse('2026-11-01T18:00:00Z');
 const result={id:custody.id,status:'active',expires_on:new Date(custody.expiresAt).toISOString(),not_before:null};
 if(mode==='id')result.id='a'.repeat(32);if(mode==='inactive')result.status='disabled';if(mode==='expiry')result.expires_on=new Date(at).toISOString();if(mode==='notbefore')result.not_before=new Date(at+1).toISOString();
 if(mode==='receipt')custody.id='a'.repeat(32);if(mode==='groups')custody.permissionGroupIds.pop();if(mode==='hash')custody.policyHash='0'.repeat(64);
 await assert.rejects(verifyFiniteGhaCustody({custody,check:()=>{},now:()=>at,R1:at+480000,request:async()=>({value:{success:true,errors:[],messages:mode==='malformed-message'?[{code:10000,message:'ok',token:'private'}]:[],result}})}));
});
test('malformed envelope cannot leak provider extras',()=>{for(const value of [{success:true,errors:[],messages:null,result:{}},{success:true,errors:[],messages:[],result:{},token:'secret'}])assert.throws(()=>finiteCfEnvelope(value));});

test('finite QA custody accepts the renewed protected identity and refuses the expired identity',async()=>{
 const custody=finiteGhaCustody(),now=Date.parse("2026-11-19T21:09:24.181Z");
 assert.equal(custody.id,"388f5d1678e6760a973bd319136112e0");
 assert.equal(custody.expiresAt,Date.parse("2026-11-27T02:59:59Z"));
 assert.equal(custody.policyHash,"0b2e8815e00c5e7c4379dc528cfbdefa8a611c15ae7d5cb39b0b64ce2594b9d2");
 const request=result=>async()=>({value:{success:true,errors:[],messages:[],result}});
 const setup={custody,check:()=>{},now:()=>now,R1:now+480000};
 const active={id:custody.id,status:'active',expires_on:"2026-11-27T02:59:59Z"};
 assert.equal((await verifyFiniteGhaCustody({...setup,request:request(active)})).scopeVerified,false);
 await assert.rejects(verifyFiniteGhaCustody({...setup,request:request({...active,id:'9db7901af95faf07e6f7ef378045328e'})}));
});
