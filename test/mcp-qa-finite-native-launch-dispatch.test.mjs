import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {AFW_FIXED_WORKFLOWS} from '../lib/mcp-fixed-terminal-workflows.mjs';
import {finiteLauncherInstanceId} from '../lib/mcp-qa-finite-launch-records.mjs';

const sourceRevision='4'.repeat(40),intentId='a'.repeat(64),controlHash='b'.repeat(64);
const exact={intentId,sourceRevision,controlHash},instanceId=finiteLauncherInstanceId({intentId,sourceRevision});
const slot='afw-own-successor-closure-v1',actorId='e'.repeat(64),versionId='cccccccc-cccc-4ccc-8ccc-cccccccccccc';
const prefix='afw.qa-finite-native-launcher-dispatch.v1:',now=Date.now,T0=now()-60000,originalAt=T0+540000;
const definition=AFW_FIXED_WORKFLOWS.find(w=>w.className==='PrivateQaBootstrap');
const qualified={
 external:{},setupReceiptHash:'c'.repeat(64),
 initialAnchors:{plan:{recordHash:'d'.repeat(64),C0:originalAt},alarm:originalAt},
 control:{controlHash,planHash:'1'.repeat(64),plan:{T0,intentId,source:{revision:sourceRevision},deployments:{qaLive:{versionId}},
  workflows:{launcher:instanceId},launchPolicy:{armAckBy:T0+90000}}},
};

const stubs={
 'mcp-qa-finite-admission-primary':'export const readPrivateQaFiniteAdmissionPrimary = input => globalThis.afwDispatchFixture.admission(input);',
 'mcp-qa-finite-prelaunch-check':'export const readPrivateQaFinitePrelaunch = () => globalThis.afwDispatchFixture.preflight();',
 'mcp-qa-finite-launch-source':'export const assertPrivateQaFiniteLaunchDispatchWired = () => globalThis.afwDispatchFixture.checkOperations();',
 'mcp-qa-finite-trial-guard':'export const assertPrivateQaFiniteNativeGuardMounted = () => globalThis.afwDispatchFixture.checkGuard();',
 'mcp-qa-finite-shared-origin':'export const readPrivateQaFiniteSharedOrigin = () => globalThis.afwDispatchFixture.origin();',
 'mcp-qa-finite-launch-ready':'export const readPrivateQaFiniteLaunchReady = () => globalThis.afwDispatchFixture.ready();',
 'mcp-qa-finite-launch-permission':'export const createPrivateQaFiniteLaunchPermission = () => globalThis.afwDispatchFixture.permit;',
};
const result=await build({entryPoints:['lib/mcp-qa-finite-launch-origin.mjs'],bundle:true,write:false,format:'esm',platform:'node',
 banner:{js:"import {createRequire} from 'node:module';const require=createRequire(process.cwd()+'/package.json');"},
 define:{'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(sourceRevision)},plugins:[{name:'native-source-evidence-test-only',
 setup(bundler){
  bundler.onResolve({filter:/^\.\/mcp-qa-finite-(shared-origin|launch-ready|launch-permission|launch-source|trial-guard|prelaunch-check|admission-primary)\.mjs$/},
   ({path,importer})=>{
    if(/(launch-source|trial-guard)\.mjs$/.test(path)&&!importer.endsWith('mcp-qa-finite-launch-origin.mjs'))return;
    return {path:path.slice(2,-4),namespace:'synthetic-primary'};
   });
  bundler.onLoad({filter:/.*/,namespace:'synthetic-primary'},({path})=>({contents:stubs[path]}));
 }}]});
const {schedulePrivateQaFiniteNominalLauncher:schedule}=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
async function use(t,mode){
 const rows=new Map(),read=async key=>rows.get(key),lookups=[],sends=[];
 let alarm=originalAt,committed=false,synced=false,permits=0;
 const originalFetch=globalThis.fetch;
 globalThis.fetch=async(url,opts)=>{
  lookups.push({url,method:opts.method});
  return Response.json({success:true,errors:[],messages:[],result:{id:definition.id,name:definition.name,
   script_name:definition.script,class_name:definition.className,schedules:[]}},{headers:{date:new Date(now()).toUTCString()}});
 };
 globalThis.afwDispatchFixture={
  async admission(input){
   if(mode==='admission-refused')throw Error('synthetic owner scope unavailable');
   return {permission:await input.readPermission()};
  },
  async preflight(){if(mode==='preflight-drift')throw Error('synthetic preflight drift');return {status:'verified'};},
  checkOperations(){if(mode==='missing-operations')throw Error('native launch operations unavailable');},
  checkGuard(){if(mode==='missing-guard')throw Error('native cleanup guard unavailable');},
  origin:async()=>qualified,
  ready:async()=>{if(mode==='not-ready')throw Error('synthetic READY absent');return {planHash:qualified.control.planHash,evidenceHash:'2'.repeat(64)};},
  permit:async()=>{permits++;if(permits===2&&mode==='late-alarm')alarm++;
   return {valid:true,expiresAt:T0+720000};},
 };
 t.after(()=>{globalThis.fetch=originalFetch;delete globalThis.afwDispatchFixture;});
 const storage={get:read,getAlarm:async()=>alarm,sync:async()=>{assert(committed);synced=true;},
  transaction:async fn=>{
   const staged=new Map();
   const value=await fn({get:read,getAlarm:async()=>alarm,put:async(k,v)=>staged.set(k,v)});
   for(const [k,v] of staged)rows.set(k,v);
   committed=true;return value;
  }};
 const actor={toString:()=>actorId},env={AFW_QA_VERSION:{id:versionId},AFW_INDEPENDENT_CLOSURE:{idFromName:name=>{
  assert.equal(name,slot);return actor;
 }},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-test-reader',AFW_QA_BOOTSTRAP:{async create(opts){
  sends.push(opts);assert(synced);assert.equal(rows.get(prefix+instanceId).controlHash,controlHash);
  if(mode==='lost-ack')throw Error('synthetic lost ACK');return {id:opts.id};
 }}};
 return {run:refs=>schedule({ctx:{storage,id:actor},env,refs:refs??exact,now}),rows,lookups,sends};
}
test('native scheduler creates exactly one after the original alarm and durable dispatch journal',async t=>{
 const f=await use(t);
 assert.equal((await f.run()).status,'acknowledged');
 assert.equal((await f.run()).status,'recorded');
 assert.equal(f.rows.size,1);
 assert.deepEqual(f.sends,[{id:instanceId,params:{operation:'finite_nominal_launcher',intentId,sourceRevision}}]);
 assert(f.lookups.every(x=>x.method==='GET'&&x.url.endsWith('/workflows/'+definition.name)));
});
test('absence of exact READY or mismatched control cannot write a dispatch record',async t=>{
 const f=await use(t,'not-ready');
 assert.equal((await f.run()).status,'pending');
 assert.equal((await f.run({...exact,controlHash:'f'.repeat(64)})).status,'pending');
 assert.equal(f.sends.length,0);assert.equal(f.rows.size,0);
});
test('late alarm change and missing acknowledgement do not grant a second send',async t=>{
 await t.test('late alarm change denies send even after the journal commits',async sub=>{
  const f=await use(sub,'late-alarm');assert.equal((await f.run()).status,'uncertain');
  assert.equal(f.rows.size,1);assert.equal(f.sends.length,0);
 });
 await t.test('lost acknowledgement leaves a durable record that cannot replay create',async sub=>{
  const f=await use(sub,'lost-ack');assert.equal((await f.run()).status,'uncertain');
  assert.equal((await f.run()).status,'recorded');assert.equal(f.sends.length,1);
 });
});

for(const mode of ['missing-operations','missing-guard'])test('READY does not dispatch when '+mode,async t=>{
 const f=await use(t,mode);
 assert.equal((await f.run()).status,'pending');
 assert.equal(f.rows.size,0);
 assert.equal(f.sends.length,0);
});

test('candidate preflight refusal stops dispatch before the journal',async t=>{
 const f=await use(t,'preflight-drift');
 assert.equal((await f.run()).status,'pending');
 assert.equal(f.rows.size,0);assert.equal(f.sends.length,0);
});

test('first-primary admission refusal stops the QA launch before any dispatch write',async t=>{
 const f=await use(t,'admission-refused');
 assert.equal((await f.run()).status,'pending');
 assert.equal(f.rows.size,0);assert.equal(f.sends.length,0);
});
