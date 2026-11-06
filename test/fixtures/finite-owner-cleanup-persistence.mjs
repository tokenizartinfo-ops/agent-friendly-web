import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile,readdir,cp} from 'node:fs/promises';
import {resolve,join,relative} from 'node:path';
import {pathToFileURL} from 'node:url';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,downstreamOwnerReference,recordOwnerReference} from './finite-owner-cleanup.mjs';
import {createInitialEntrySynOutbound} from './finite-initial-entry-world.mjs';
import {plain} from './finite-first-connection-publication.mjs';

const P='afw.finite-initial-cleanup.v1:',sha=x=>createHash('sha256').update(x).digest('hex');
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const json=x=>JSON.stringify(x,null,2);
export const principalName='R2 original alarm restores the produced current cycle at real C0';
export async function waitUntil(at){while(Date.now()<at)await pause(Math.min(1000,at-Date.now()));}
function beneath(root,path){const rel=relative(resolve(root),resolve(path));assert(rel&&!rel.startsWith('..')&&!resolve(rel).startsWith('/../'));return resolve(path);}
async function inventory(root){
 const files=[];async function walk(dir){for(const item of await readdir(dir,{withFileTypes:true})){const path=join(dir,item.name);assert(!item.isSymbolicLink(),'SYN evidence cannot contain symlink');if(item.isDirectory())await walk(path);else{assert(item.isFile());const b=await readFile(path);files.push({path:relative(root,path).replaceAll('\\','/'),bytes:b.length,sha256:sha(b)});}}}
 await walk(root);return files.sort((a,b)=>a.path.localeCompare(b.path));
}
export async function verifyCheckpoint(root,{source=process.env.GITHUB_SHA}={}){
 const manifest=JSON.parse(await readFile(join(root,'manifest.json'),'utf8'));
 assert.equal(manifest.purpose,'afw.owner-cleanup-checkpoint.syn.v1');assert.equal(manifest.source,source);
 assert.equal(manifest.operationalReadiness,false);assert.equal(manifest.completePackage,false);assert.equal(manifest.PCoff,false);
 const actual=(await inventory(root)).filter(f=>f.path!=='manifest.json');assert.deepEqual(actual,manifest.files);
 for(const [kind,pattern]of [['D1',/state\/.*d1\/.*\.sqlite$/],['DO',/state\/.*do\/.*qa-first-connection.*\.sqlite$/],['KV',/state\/.*kv\/.*\.sqlite$/]])assert(actual.some(f=>pattern.test(f.path)),'native persisted '+kind+' sqlite required');
 for(const name of ['graphs/metafiles.json','graphs/canary-index.mjs','graphs/qa-index.mjs','checkpoint.json'])assert(actual.some(f=>f.path===name),'required evidence '+name);
 const data=JSON.parse(await readFile(join(root,'checkpoint.json'),'utf8'));
 assert.equal(data.plan.C0,data.plan.I0+900000);assert.equal(data.plan.C1,data.plan.C0+180000);if(data.checkpointKind==='partial-cleanup'){assert.equal(data.facts.alarm,data.plan.C0+60000);assert.equal(JSON.parse(data.facts.rows.find(([k])=>k===P+'state')[1]).deliveries,1);}else assert.equal(data.facts.alarm,data.plan.C0);
 if(data.checkpointKind!=='partial-cleanup')assert.equal(data.facts.signal.entered,0);assert.equal(data.state.nowOffset,0);assert.equal(data.modeledProviderInput.label,'MODELED PROVIDER INPUT');
 const qa=data.options.workers.find(w=>w.name==='qa-first-connection'),m=data.options.workers.find(w=>w.name==='canary-first-connection');
 assert.equal(data.options.resourcePersistencePath,'$NATIVE_STATE');
 assert.equal(qa.kvNamespaces.AFW_FINITE_OWNER_OAUTH_KV,'first-connection-oauth');assert.equal(m.kvNamespaces.OAUTH_KV,'first-connection-oauth');
 assert.equal(data.kvProof.namespaceId,'first-connection-oauth');assert.equal(data.kvProof.expires,false);assert.equal(sha(data.kvProof.key),data.kvProof.keyHash);
 assert.equal(sha(qa.script),data.build.QA.sha256);assert.equal(sha(m.script),data.build.M.sha256);
 assert.equal(sha(await readFile(join(root,'graphs/qa-index.mjs'))),data.build.QA.sha256);
 assert.equal(sha(await readFile(join(root,'graphs/canary-index.mjs'))),data.build.M.sha256);
 const graph=JSON.parse(await readFile(join(root,'graphs/metafiles.json'),'utf8'));
 assert(Object.hasOwn(graph.M.inputs,'worker/mcp-own/finite.mjs'));assert(Object.keys(graph.QA.inputs).some(p=>p.endsWith('mcp-qa-finite-owner-cleanup.mjs')));
 return {manifest,data};
}
function portableOptions(options,persist){
 return JSON.parse(JSON.stringify(options,(key,value)=>{
  if(key==='outboundService'){assert.equal(typeof value,'function');return undefined;}
  if(key==='resourcePersistencePath'){assert.equal(value,persist);return '$NATIVE_STATE';}
  assert.notEqual(typeof value,'function','unrecognized executable checkpoint field '+key);
  return value;
 }));
}
export async function produceCheckpoint(root,{variant='principal',deferWait=false}={}){
 assert(['principal','grant-before-link','notice-before-link'].includes(variant));
 const started=Number(process.env.AFW_JOB_STARTED_MS);assert(Number.isSafeInteger(started));
 assert(Date.now()-started<=90000,'do not open I0 without original 13min plus export margin');
 let f;
 try{
  f=await ownerReferenceFixture({after(){}},{cleanupCheckpoint:true});
  const prepared=await prepareOwnerReference(f);
  if(variant==='grant-before-link')await f.stub.ownerCleanupFault(variant);
  const response=await prepared.issue();
  if(variant==='grant-before-link'){
   assert.notEqual(response.status,302);await response.body?.cancel();
   const rows=await plain(f.stub.snapshot()),native=await plain(f.stub.ownerCleanupNativeRows());assert(native.grant);assert(!rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':grant')));
  }else{assert.equal(response.status,302);await assertActualComplete(f,{reference:true});await downstreamOwnerReference(f,response,prepared,{cleanupPartial:variant==='notice-before-link'});}
  const partialBoundary=variant==='principal'?null:await plain(f.stub.ownerCleanupFaultFacts());if(partialBoundary)assert.equal(partialBoundary.sqlWrites,1);
  await f.stub.ownerCleanupReset();
  await recordOwnerReference(f,'r2-produced-'+variant);
  await f.stub.ownerReferenceControl('released');await f.stub.firstConnectionRestore();await f.stub.restoreMethods();
  const facts=await plain(f.stub.ownerCleanupFacts()),plan=JSON.parse(facts.rows.find(([k])=>k===P+'plan')[1]);
  assert.equal(facts.signal.entered,0);assert.equal(facts.alarm,plan.C0);assert(facts.dbNow<plan.C0);assert(Math.abs(facts.dbNow-facts.wall)<=1000);
  assert(plan.C0-120000<started+870000,'original checkpoint wait must fit job budget');
  if(variant!=='grant-before-link')assert(facts.rows.some(([k])=>k.endsWith(':reference')));assert.equal(facts.rows.some(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':notice')),variant==='principal');
  // MODELED PROVIDER INPUT, not evidence of actual Cloudflare Workflow termination.
  f.inventoryMode='terminal';
  const input=f.cleanupCheckpointInputs();input.state.inventoryMode='terminal';
  input.state.providerRegistry.versions[plan.baselineVersionId]=structuredClone(input.factory.x.metadata);
  input.state.cleanupRestorePlan=plan;
  const clientKey='client:'+f.source.clientId,client=await f.kv.get(clientKey);assert.equal(typeof client,'string');assert.equal(JSON.parse(client).clientId,f.source.clientId);
  const kvProof={purpose:'afw.same-oauth-kv-client.syn.v1',key:clientKey,keyHash:sha(clientKey),valueHash:sha(client),expires:false,namespaceId:'first-connection-oauth'};
  const data={purpose:'afw.owner-cleanup-persisted-facts.syn.v1',plan,facts,kvProof,variant,partialBoundary,lateToken:f.cleanupToken??null,options:portableOptions(input.currentMountedOptions,input.persist),factory:input.factory,state:input.state,build:f.firstConnectionBuild,modeledProviderInput:{label:'MODELED PROVIDER INPUT',bootstrapStatus:'complete',recordedAt:Date.now(),realWorkflowTerminationProved:false}};
  await f.mf.dispose();f.disposedForCheckpoint=true;
  await mkdir(root,{recursive:true});await cp(input.persist,join(root,'state'),{recursive:true,errorOnExist:true,force:false});
  await cp('output/t2-native-graphs/'+f.firstConnectionBuild.QA.sha256,join(root,'graphs'),{recursive:true,errorOnExist:true,force:false});
  await writeFile(join(root,'checkpoint.json'),json(data));
  const files=await inventory(root),manifest={purpose:'afw.owner-cleanup-checkpoint.syn.v1',source:process.env.GITHUB_SHA,I0:plan.I0,C0:plan.C0,C1:plan.C1,files,nativeClock: facts.dbNow,operationalReadiness:false,completePackage:false,PCoff:false,custodyReal:false};
  await writeFile(join(root,'manifest.json'),json(manifest));await verifyCheckpoint(root);
  console.info('R2 checkpoint produced',json({source:manifest.source,I0:plan.I0,C0:plan.C0,C1:plan.C1,nativeDbNow:facts.dbNow,files:files.length,manifestSha256:sha(await readFile(join(root,'manifest.json'))),modeledProviderInput:data.modeledProviderInput}));
  await f.cleanup();if(!deferWait)await waitUntil(plan.C0-120000);
  assert(Date.now()<started+885000,'export/upload margin exhausted');
  return manifest;
 }finally{if(f&&!f.disposedForCheckpoint){await f.mf.dispose();await f.cleanup();}}
}
export async function recoverCheckpoint(root,{label='principal',restart=false}={}){
 const {data,manifest}=await verifyCheckpoint(root);
 if(!restart)assert(Date.now()+30000<data.plan.C0,'native recovery requires >=30s original pre-C0 margin');
 else assert(Date.now()+10000<data.plan.C1,'native restart requires original C1 margin');
 const dest=beneath('output',join('output','r2-native-'+label));await mkdir(dest,{recursive:true});
 await cp(join(root,'state'),join(dest,'state'),{recursive:true,errorOnExist:true,force:false});
 const originalFiles=manifest.files.filter(x=>x.path.startsWith('state/')).map(x=>({...x,path:x.path.slice(6)}));
 assert.deepEqual(await inventory(join(dest,'state')),originalFiles);
 const options=JSON.parse(JSON.stringify(data.options)),f={...structuredClone(data.state),nowOffset:0};
 const factory=data.factory,map=new Map(factory.w.map),w={pointer:factory.w.pointer,get:async p=>{assert(map.has(p),'fixed SYN provider missing original path');return structuredClone(map.get(p));}};
 const outbound=createInitialEntrySynOutbound({...factory,w,f,built:{outputFiles:[{contents:Buffer.from(factory.qaScript)}]},cleanupCheckpoint:true});
 options.resourcePersistencePath=join(dest,'state');
 for(const worker of options.workers){
  if(worker.resourcePersistencePath==='$NATIVE_STATE')worker.resourcePersistencePath=join(dest,'state');
  worker.outboundService=worker.name==='qa-first-connection'?outbound:async()=>new Response(null,{status:503});
 }
 const entered=Date.now(),mf=new Miniflare(convertV4MiniflareOptions(options));f.mf=mf;
 try{
  const bindings=await mf.getBindings('qa-first-connection');f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));f.db=await mf.getD1Database('RELEASE_DB','qa-first-connection');
  const current=await plain(f.stub.ownerCleanupFacts());
  if(!restart){assert.equal(current.alarm,data.plan.C0);assert.equal(current.signal.entered,0);assert(Date.now()<data.plan.C0);}
  assert(Math.abs(current.dbNow-current.wall)<=1000);assert(current.dbNow>=data.facts.dbNow);
  assert.deepEqual(current.rows,data.facts.rows,'cold load preserves original native rows exactly before alarm');
  const mKv=await mf.getKVNamespace('OAUTH_KV','canary-first-connection'),qaKv=await mf.getKVNamespace('AFW_FINITE_OWNER_OAUTH_KV','qa-first-connection');
  for(const kv of [mKv,qaKv]){const value=await kv.get(data.kvProof.key);assert.equal(typeof value,'string');assert.equal(sha(value),data.kvProof.valueHash,'same non-expirable client after cold load');}
  f.negative=await mf.getWorker('negative-first-connection');f.kv=mKv;f.kvSemanticProof={keyHash:data.kvProof.keyHash,valueHash:data.kvProof.valueHash,bothAliases:true,expires:false};
  await f.stub.ownerCleanupFault('normal');
  f.plan=data.plan;f.checkpoint=data;f.directory=dest;f.recovery={entered,ready:Date.now(),nativeDbNow:current.dbNow,manifestSha256:sha(await readFile(join(root,'manifest.json')))};
  return f;
 }catch(error){await mf.dispose();throw error;}
}
export async function observeOriginalAlarm(f,{settled=1}={}){
 const until=f.plan.C1;
 for(;;){const signal=await plain(f.stub.ownerCleanupSignal());if(signal.settled>=settled){assert(signal.at>=f.plan.C0);return await plain(f.stub.ownerCleanupFacts());}assert(Date.now()<until,'original native alarm observation deadline');await pause(250);}
}
export async function writeCleanupEvidence(name,value){await mkdir('output/owner-cleanup',{recursive:true});await writeFile('output/owner-cleanup/'+name+'.json',json(value));}

export async function produceGroup(group,root){
 assert(['g0','g1','g2','g3','g4','g5'].includes(group));await mkdir(root,{recursive:true});
 const variants=group==='g1'?['grant-before-link','notice-before-link']:['principal'],lineages=[];
 for(const variant of variants){const manifest=await produceCheckpoint(join(root,variant),{variant,deferWait:true});lineages.push({variant,path:variant,I0:manifest.I0,C0:manifest.C0,C1:manifest.C1,files:manifest.files.length});}
 const data={purpose:'afw.owner-cleanup-group.syn.v1',group,source:process.env.GITHUB_SHA,lineages,graphs:lineages.length*2,maxConcurrentNative:group==='g0'?1:2,operationalReadiness:false,PCoff:false};
 await writeFile(join(root,'group.json'),json(data));await waitUntil(Math.min(...lineages.map(l=>l.C0))-120000);
 assert(Date.now()<Number(process.env.AFW_JOB_STARTED_MS)+885000,'group export margin exhausted');console.info('R2 group checkpoint',json(data));
}
export async function verifyGroup(root){
 const data=JSON.parse(await readFile(join(root,'group.json'),'utf8'));assert.equal(data.source,process.env.GITHUB_SHA);
 for(const l of data.lineages){const {manifest}=await verifyCheckpoint(join(root,l.path));assert.equal(manifest.I0,l.I0);assert.equal(manifest.C0,l.C0);assert.equal(manifest.C1,l.C1);}
 return data;
}
export async function persistPartialCleanup(f,root){
 const facts=await plain(f.stub.ownerCleanupFacts()),state=JSON.parse(facts.rows.find(([k])=>k===P+'state')[1]);assert.equal(state.deliveries,1);assert.notEqual(state.status,'complete');assert.equal(facts.alarm,f.plan.C0+60000);
 const data={...f.checkpoint,facts,checkpointKind:'partial-cleanup',state:Object.fromEntries(Object.keys(f.checkpoint.state).map(k=>[k,structuredClone(f[k])]))};
 assert(data.state.nowOffset===0);await f.mf.dispose();f.disposed=true;
 await mkdir(root,{recursive:true});await cp(join(f.directory,'state'),join(root,'state'),{recursive:true,errorOnExist:true,force:false});
 await cp(join(process.env.AFW_R2_CHECKPOINT??'output/owner-cleanup/checkpoint-g4','principal','graphs'),join(root,'graphs'),{recursive:true,errorOnExist:true,force:false});
 await writeFile(join(root,'checkpoint.json'),json(data));
 const files=await inventory(root),manifest={purpose:'afw.owner-cleanup-checkpoint.syn.v1',source:process.env.GITHUB_SHA,I0:f.plan.I0,C0:f.plan.C0,C1:f.plan.C1,files,nativeClock:facts.dbNow,operationalReadiness:false,completePackage:false,PCoff:false,custodyReal:false,parentManifestSha256:f.recovery.manifestSha256};
 await writeFile(join(root,'manifest.json'),json(manifest));await verifyCheckpoint(root);return manifest;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const [command,root='output/owner-cleanup/checkpoint-g0',group='g0']=process.argv.slice(2);
 if(command==='prepare')await produceCheckpoint(root);
 else if(command==='prepare-group')await produceGroup(group,root);
 else if(command==='verify-group')console.info('R2 group uploaded readback',json(await verifyGroup(root)));
 else if(command==='verify'){const {manifest}=await verifyCheckpoint(root);console.info('R2 artifact exact readback',json({source:manifest.source,files:manifest.files.length,C0:manifest.C0}));}
 else throw Error('SYN fixed checkpoint command');
}
