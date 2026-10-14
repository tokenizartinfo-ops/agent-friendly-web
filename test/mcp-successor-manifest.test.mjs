import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/mcp-successor-manifest.mjs');
function fixture(){
 const now=Date.now(),id='f'.repeat(64);
 const scope={accountId:'1'.repeat(32),workerName:'agent-friendly-web-delegated-canary',namespaceId:'2'.repeat(32),applicationId:'own-app',ownerRef:'3'.repeat(64),projectRef:'4'.repeat(64),resource:'https://delegated-canary.agentfriendlyweb.dev/mcp'};
 const original={containerId:'a'.repeat(64),applicationId:scope.applicationId,programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)};
 const candidate={trialId:'d'.repeat(64),programHash:'e'.repeat(64),sourceRevision:'6'.repeat(40),startAt:now,expiresAt:now+60000,budget:1};
 const namespace={idFromName(name){assert.equal(name,'afw-own-event-first-successor-v1');return{toString:()=>id};},idFromString(value){assert.equal(value,id);return{toString:()=>id};},get(){assert.fail('must not instantiate');}};
 return{scope,original,candidate,namespace};
}
test('fixed server scope resolves actor without creating it and hashes canonical manifest',async()=>{
 const {resolveSuccessorPreparation}=await load(),f=fixture(),a=resolveSuccessorPreparation(f);
 assert.equal(a.candidate.containerId,'f'.repeat(64));assert.equal(a.candidate.scopeHash.length,64);assert.equal(a.mayBoot,false);
 const shuffled=Object.fromEntries(Object.entries(f.scope).reverse());assert.equal(resolveSuccessorPreparation({...f,scope:shuffled}).candidate.scopeHash,a.candidate.scopeHash);
 for(const key of ['accountId','namespaceId','ownerRef','projectRef']){const altered={...f,scope:{...f.scope,[key]:'7'.repeat(f.scope[key].length)}};assert.notEqual(resolveSuccessorPreparation(altered).candidate.scopeHash,a.candidate.scopeHash);}
 f.scope.ownerRef='8'.repeat(64);assert.equal(a.manifest.scope.ownerRef,'3'.repeat(64));assert.equal(Object.isFrozen(a.manifest.scope),true);
});
test('foreign environment, arbitrary actor, different app and invalid roundtrip fail closed',async()=>{
 const {resolveSuccessorPreparation}=await load();for(const change of [f=>f.scope.workerName='production',f=>f.scope.resource='https://tokenizart.com/mcp',f=>f.original.applicationId='other',f=>f.candidate.containerId='9'.repeat(64),f=>f.candidate.budget=2,f=>f.candidate.expiresAt+=600000,f=>f.namespace.idFromString=()=>({toString:()=> '0'.repeat(64)}),f=>f.namespace.idFromName=()=>({toString:()=> f.original.containerId})]){const f=fixture();change(f);assert.throws(()=>resolveSuccessorPreparation(f));}
});

test('manifest commits candidate and predecessor revisions and rejects coercion/accessors',async()=>{
 const {resolveSuccessorPreparation}=await load(),f=fixture(),hash=resolveSuccessorPreparation(f).candidate.scopeHash;
 for(const [part,key,value] of [['candidate','trialId','7'.repeat(64)],['candidate','programHash','7'.repeat(64)],['candidate','sourceRevision','7'.repeat(40)],['candidate','startAt',f.candidate.startAt+1],['candidate','expiresAt',f.candidate.expiresAt-1],['original','sourceRevision','7'.repeat(40)],['original','programHash','7'.repeat(64)]])assert.notEqual(resolveSuccessorPreparation({...f,[part]:{...f[part],[key]:value}}).candidate.scopeHash,hash);
 let read=false;const scope={...f.scope};Object.defineProperty(scope,'ownerRef',{enumerable:true,get(){read=true;return f.scope.ownerRef;}});assert.throws(()=>resolveSuccessorPreparation({...f,scope}));assert.equal(read,false);
 assert.throws(()=>resolveSuccessorPreparation({...f,scope:{...f.scope,accountId:{toString:()=>f.scope.accountId}}}));
});
