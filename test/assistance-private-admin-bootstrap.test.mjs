import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/assistance-private-admin-bootstrap.mjs');
const ref='a'.repeat(64),params={operation:'register',recordRef:ref};
test('private install Workflow invokes fixed installer without retries and persists only pending',async()=>{
 const {createPrivateAdminBootstrap}=await load();
 for(const state of ['pending','dispatch_attempted']){
  const f=fixture();let calls=0;
  f.options.install=async()=>{calls++;return {state,recordRef:ref,admissionId:'must-not-persist'};};
  const request={operation:'install',recordRef:ref};
  assert.deepEqual(await createPrivateAdminBootstrap(f.options).run(JSON.stringify(request),f.step),{contract:'afw-private-admin-bootstrap/v1',state:'installation_pending'});
  assert.equal(calls,1);assert.equal(f.calls(),0);assert.equal(f.steps(),1);
  assert.equal((await createPrivateAdminBootstrap(f.options).run({...request,admissionId:'caller'},f.step)).state,'unavailable');assert.equal(calls,1);
 }
});
test('private install denies lost ACK, withdrawal and malformed results without reconstruction',async()=>{
 const {createPrivateAdminBootstrap}=await load();
 for(const mode of ['lost','withdraw','malformed','missing']){
  const f=fixture();let calls=0;
  if(mode!=='missing')f.options.install=async()=>{calls++;if(mode==='lost')throw Error('secret');if(mode==='withdraw')f.change({enabled:false});return {state:mode==='malformed'?'installed':'dispatch_attempted'};};
  assert.equal((await createPrivateAdminBootstrap(f.options).run({operation:'install',recordRef:ref},f.step)).state,'unavailable');
  assert.equal(calls,mode==='missing'?0:1);
 }
 const f=fixture();f.options.install=async()=>{throw Error('cached step must not invoke');};
 assert.equal((await createPrivateAdminBootstrap(f.options).run({operation:'install',recordRef:ref},{do:async()=> 'installation_pending'})).state,'installation_pending');
 f.change({enabled:false});assert.equal((await createPrivateAdminBootstrap(f.options).run({operation:'install',recordRef:ref},{do:async()=> 'installation_pending'})).state,'unavailable');
});
function fixture(){let control={enabled:true,recordRef:ref,closeAt:2000},calls=0,steps=0,hook;const options={readControl:()=>control,now:()=>1000,readRegistered:async()=>true,register:async r=>{calls++;assert.equal(r,ref);if(hook)await hook();return true;}};const step={do:async(name,config,fn)=>{steps++;assert.equal(config.retries.limit,0);assert.equal(config.timeout,'20 seconds');return fn();}};return{options,step,calls:()=>calls,steps:()=>steps,change:v=>control={...control,...v},hook:v=>hook=v};}
test('only exact operator request under live control can register once',async()=>{const f=fixture(),{createPrivateAdminBootstrap}=await load();assert.deepEqual(await createPrivateAdminBootstrap(f.options).run(params,f.step),{contract:'afw-private-admin-bootstrap/v1',state:'registered'});assert.equal(f.calls(),1);assert.equal(f.steps(),1);});
test('disabled missing expired and foreign control never call actor',async()=>{const{createPrivateAdminBootstrap}=await load();for(const change of[{enabled:false},{recordRef:'b'.repeat(64)},{closeAt:1000}]){const f=fixture();f.change(change);assert.equal((await createPrivateAdminBootstrap(f.options).run(params,f.step)).state,'unavailable');assert.equal(f.calls(),0);}const f=fixture();assert.equal((await createPrivateAdminBootstrap(f.options).run({...params,pins:{}},f.step)).state,'unavailable');assert.equal(f.calls(),0);});
test('uncertain acknowledgment is terminal without retry or recovery mutation',async()=>{const f=fixture(),{createPrivateAdminBootstrap}=await load();f.hook(()=>{throw Error('lost ACK');});assert.equal((await createPrivateAdminBootstrap(f.options).run(params,f.step)).state,'unavailable');assert.equal(f.calls(),1);assert.equal(f.steps(),1);});
test('control withdrawn after actor writes suppresses successful result',async()=>{const f=fixture(),{createPrivateAdminBootstrap}=await load();f.hook(()=>f.change({enabled:false}));assert.equal((await createPrivateAdminBootstrap(f.options).run(params,f.step)).state,'unavailable');assert.equal(f.calls(),1);});

test('cached step success does not authorize a withdrawn current registration',async()=>{const f=fixture(),{createPrivateAdminBootstrap}=await load();f.options.readRegistered=async()=>false;const step={do:async()=>true};assert.equal((await createPrivateAdminBootstrap(f.options).run(params,step)).state,'unavailable');assert.equal(f.calls(),0);});

test('control-plane JSON string parameters are decoded without accepting extra authority',async()=>{const f=fixture(),{createPrivateAdminBootstrap}=await load(),h=createPrivateAdminBootstrap(f.options);assert.equal((await h.run(JSON.stringify(params),f.step)).state,'registered');assert.equal((await h.run(JSON.stringify({...params,pins:{}}),f.step)).state,'unavailable');assert.equal((await h.run('invalid JSON',f.step)).state,'unavailable');assert.equal((await h.run(' '.repeat(1000),f.step)).state,'unavailable');assert.equal(f.calls(),1);});

test('administrative originals string operation uses bounded single step and independent readback',async()=>{const f=fixture(),{createPrivateAdminBootstrap}=await load();let writes=0;const originals={context:{sourceRef:'1'.repeat(64)},execution:{sourceRef:'2'.repeat(64)}};f.options.appendOriginals=async(r,seq,o)=>{writes++;assert.equal(r,ref);assert.equal(seq,0);assert.deepEqual(o,originals);return true;};f.options.readOriginals=async()=>({originals,correlation:{recordRef:ref,state:'observed'}});const request=JSON.stringify({operation:'originals',recordRef:ref,expectedSequence:0,originals});assert.equal((await createPrivateAdminBootstrap(f.options).run(request,f.step)).state,'originals_recorded');assert.equal(writes,1);assert.equal(f.calls(),0);f.options.readOriginals=async()=>null;assert.equal((await createPrivateAdminBootstrap(f.options).run(request,{do:async()=>true})).state,'unavailable');assert.equal(writes,1);});
