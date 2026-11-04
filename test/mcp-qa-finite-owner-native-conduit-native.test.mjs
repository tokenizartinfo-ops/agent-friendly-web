import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
const O='https://delegated-canary.agentfriendlyweb.dev',V='11111111-1111-4111-8111-111111111111';
async function fixture(t){
 const profile=name=>JSON.parse(readFileSync(name,'utf8'));
 const m=profile('wrangler.mcp-own.finite.jsonc'),q=profile('wrangler.independent-closure-qa.finite.jsonc');
 const compile=async name=>(await build({entryPoints:['test/fixtures/finite-native-conduit-'+name+'.mjs'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*']})).outputFiles[0].text;
 const [sender,receiver]=await Promise.all([compile('sender'),compile('receiver')]);
 const mf=new Miniflare(convertV4MiniflareOptions({workers:[
  {name:'sender',modules:true,script:sender,compatibilityDate:m.compatibility_date,compatibilityFlags:m.compatibility_flags,
   durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'NativeReceiverFixture',scriptName:'receiver',useSQLite:true,uniqueKey:'SYN-native-conduit'}},
   d1Databases:{DB:'SYN-M'},kvNamespaces:['OAUTH_KV'],ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'99126',simple:{limit:1000,period:60}}},bindings:{AFW_FINITE_TRIAL_VERSION:{id:V}}},
  {name:'receiver',modules:true,script:receiver,compatibilityDate:q.compatibility_date,compatibilityFlags:q.compatibility_flags,
   durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'NativeReceiverFixture',useSQLite:true,uniqueKey:'SYN-native-conduit'}},d1Databases:{RELEASE_DB:'SYN-Q'},bindings:{AFW_QA_VERSION:{id:'22222222-2222-4222-8222-222222222222'}}}
 ]}));
 t.after(()=>mf.dispose());
 // Sender FIRST/default, direct established dispatchFetch path; no getWorker.
 const call=(path,options)=>mf.dispatchFetch(O+path,options);
 const state=async()=>{const r=await call('/fixture/state');return r.json();};
 const wait=async key=>{for(let n=0;n<100;n++){const s=await state();if(s[key])return s;await new Promise(r=>setTimeout(r,20));}assert.fail('bounded native marker missing: '+key);};
 return {call,state,wait,profiles:{sender:{date:m.compatibility_date,flags:m.compatibility_flags},receiver:{date:q.compatibility_date,flags:q.compatibility_flags}}};
}
test('actual fixed Worker to DO conduit stays pending and overwrites every caller private header',{timeout:20000},async t=>{
 const f=await fixture(t);
 const r=await f.call('/connections/finite-prepare',{headers:{'x-afw-finite-boundary':'SYN forged','x-afw-finite-extra':'SYN discard','x-afw-finite-version':'SYN forged','x-afw-finite-original-method':'DELETE','X-Caller-Arbitrary':'discard'}});
 assert.equal(r.status,503);assert.deepEqual(await r.json(),{status:'admin_pending',mayRetry:false,operationalReadiness:false});
 const s=await f.state();assert.equal(s.senderEntered,1);assert.equal(s.receiverEntered,1);assert.equal(s.businessRows,0);
 assert.deepEqual(s.privateHeaders,['x-afw-finite-boundary','x-afw-finite-original-method','x-afw-finite-original-url','x-afw-finite-request-id','x-afw-finite-version']);
 assert.equal(s.callerHeader,false);assert.equal(s.originalMethod,'GET');assert.equal(s.originalUrl,O+'/connections/finite-prepare');assert.equal(s.version,V);assert.equal(s.boundaryValid,true);
 for(const [path,options,status]of [['/connections/finite-prepare?x=1',{},404],['/connections/finite-prepare',{method:'DELETE'},405],['/connections/finite-prepare',{method:'POST',headers:{Origin:'https://other.invalid'},body:'SYN'},403]]){
  const rejected=await f.call(path,options);assert.equal(rejected.status,status);await rejected.body.cancel();
 }
 assert.equal((await f.state()).receiverEntered,1);console.log('native_two_ends_pending',JSON.stringify(f.profiles));
});
test('actual native signal capability observes receiver separately during held read and before guarded continuation',{timeout:20000},async t=>{
 const f=await fixture(t);await f.call('/fixture/hold');
 const pending=f.call('/connections/finite-prepare',{method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded'},body:'SYN=bounded'}).then(async r=>({status:r.status,body:await r.json()}),()=>({senderRejected:true}));
 await f.wait('held');await f.call('/fixture/abort');
 const sender=await pending,held=await f.state();
 await f.call('/fixture/release');const settled=await f.wait('settled');
 assert.equal(held.receiverEntered,1);assert.equal(settled.businessRows,0);
 assert.equal(typeof held.receiverAborted,'boolean');assert.equal(typeof settled.beforeGuardAborted,'boolean');
 const qualification=held.receiverAborted&&settled.beforeGuardAborted?'receiver_abort_observed':'receiver_abort_NOT_qualified';
 console.log('native_signal_capability',JSON.stringify({qualification,sender,receiverDuringHeldRead:held.receiverAborted,receiverBeforeGuard:settled.beforeGuardAborted,profiles:f.profiles,businessProducer:false}));
});
