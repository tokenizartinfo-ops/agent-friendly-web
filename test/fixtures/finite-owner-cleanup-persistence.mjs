import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile,readdir,cp} from 'node:fs/promises';
import {resolve,join,relative} from 'node:path';
import {pathToFileURL} from 'node:url';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,downstreamOwnerReference,recordOwnerReference,cleanupMTransport,readCleanupM} from './finite-owner-cleanup.mjs';
import {createInitialEntrySynOutbound} from './finite-initial-entry-world.mjs';
import {plain,compileCleanupSdkOnlyWorker,compileFirstConnectionCandidate} from './finite-first-connection-publication.mjs';
import {build} from 'esbuild';

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
 if(data.variant!=='grant-before-link'){
  const ref=JSON.parse(data.facts.rows.find(([k])=>k.endsWith(':reference'))[1]),actual=data.sdkAfterExchange;assert(actual);
  assert.equal(actual.referenceHash,ref.recordHash);assert.equal(actual.selectorHash,sha(ref.sdkGrantId));assert.equal(actual.correlationHash,ref.correlationHash);
  assert.equal(actual.referenceExpiresAt,null);assert.equal(ref.expiresAt,null);assert(Number.isSafeInteger(actual.expiresAt));assert(Number.isSafeInteger(actual.tokenExpiresAt));
  assert.equal(data.sdkBeforeExchange.referenceHash,ref.recordHash);assert(Number.isSafeInteger(data.sdkBeforeExchange.nativeKVExpiration));
  if(!data.sdkOnlyBuild)assert(actual.expiresAt*1000<=data.plan.C0);
 }
 assert.equal(data.options.resourcePersistencePath,'$NATIVE_STATE');
 assert.equal(qa.kvNamespaces.AFW_FINITE_OWNER_OAUTH_KV,'first-connection-oauth');assert.equal(m.kvNamespaces.OAUTH_KV,'first-connection-oauth');
 assert.equal(data.kvProof.namespaceId,'first-connection-oauth');assert.equal(data.kvProof.expires,false);assert.equal(sha(data.kvProof.key),data.kvProof.keyHash);
 assert.equal(sha(qa.script),data.build.QA.sha256);assert.equal(sha(m.script),data.build.M.sha256);
 assert.equal(sha(await readFile(join(root,'graphs/qa-index.mjs'))),data.build.QA.sha256);
 assert.equal(sha(await readFile(join(root,'graphs/canary-index.mjs'))),data.build.M.sha256);
 if(data.sdkOnlyBuild){
  const extra=data.options.workers.find(w=>w.name==='sdk-only-first-connection');assert(extra);
  assert.equal(extra.kvNamespaces.OAUTH_KV,'first-connection-oauth');assert.equal(sha(extra.script),data.sdkOnlyBuild.sha256);
  const bytes=await readFile(join(root,'graphs/sdk-only-index.mjs'));assert.equal(bytes.length,data.sdkOnlyBuild.bytes);assert.equal(sha(bytes),data.sdkOnlyBuild.sha256);
  const meta=JSON.parse(await readFile(join(root,'graphs/sdk-only-metafile.json'),'utf8'));assert(Object.keys(meta.inputs).some(p=>p.includes('@cloudflare/workers-oauth-provider')));
  assert.equal(data.sdkOnlyBuild.callbackOmitted,true);assert.equal(data.sdkOnlyBuild.MAdmission,false);assert.equal(data.sdkOnlyBuild.refreshTokenTTL,0);
 }
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
export async function produceCheckpoint(root,{variant='principal',deferWait=false,sdkOnly=false}={}){
 assert(['principal','grant-before-link','notice-before-link'].includes(variant));
 const started=Number(process.env.AFW_JOB_STARTED_MS);assert(Number.isSafeInteger(started));
 assert(Date.now()-started<=90000,'do not open I0 without original 13min plus export margin');
 let f;
 try{
  f=await ownerReferenceFixture({after(){}},{cleanupCheckpoint:true});
  if(sdkOnly){
   assert.equal(variant,'principal');const extra=await compileCleanupSdkOnlyWorker();await f.mountCleanupSdkOnly(extra);f.cleanupSdkOnly=true;
   const initial=await plain(f.stub.ownerCleanupFacts()),original=JSON.parse(initial.rows.find(([k])=>k===P+'plan')[1]);
   assert(Date.now()<original.C0-300000,'late producer must wait without a live Root');
   f.cleanupOriginalIdentityToken=await f.enrollmentToken(f.source);
   await waitUntil(original.C0-300000);
   f.sdkOnlyBuild={worker:'sdk-only-first-connection',sha256:extra.sha256,bytes:extra.bytes,inputs:Object.keys(extra.metafile.inputs),callbackOmitted:true,MAdmission:false,accessTokenTTL:300,refreshTokenTTL:0,namespaceId:'first-connection-oauth'};
   const graphRoot='output/t2-native-graphs/'+f.firstConnectionBuild.QA.sha256;
   await writeFile(graphRoot+'/sdk-only-index.mjs',extra.script);await writeFile(graphRoot+'/sdk-only-metafile.json',json(extra.metafile));
  }
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
  const data={purpose:'afw.owner-cleanup-persisted-facts.syn.v1',plan,facts,kvProof,variant,partialBoundary,lateToken:f.cleanupToken??null,sdkBeforeExchange:f.sdkBeforeExchange??null,sdkAfterExchange:f.sdkAfterExchange??null,sdkOnlyBuild:f.sdkOnlyBuild??null,options:portableOptions(input.currentMountedOptions,input.persist),factory:input.factory,state:input.state,build:f.firstConnectionBuild,modeledProviderInput:{label:'MODELED PROVIDER INPUT',bootstrapStatus:'complete',recordedAt:Date.now(),realWorkflowTerminationProved:false}};
  if(sdkOnly)assert(Date.now()<plan.C0-120000,'g5 genuine notice/link must finish before original export');
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
  f.negative=await mf.getWorker('negative-first-connection');f.m=cleanupMTransport(mf,{currentMountedOptions:options,expectedModuleHash:data.build.M.sha256});if(data.sdkOnlyBuild)f.sdkOnly=await mf.getWorker('sdk-only-first-connection');f.kv=mKv;f.kvSemanticProof={keyHash:data.kvProof.keyHash,valueHash:data.kvProof.valueHash,bothAliases:true,expires:false};
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
 for(const variant of variants){const manifest=await produceCheckpoint(join(root,variant),{variant,deferWait:true,sdkOnly:group==='g5'});lineages.push({variant,path:variant,I0:manifest.I0,C0:manifest.C0,C1:manifest.C1,files:manifest.files.length});}
 const data={purpose:'afw.owner-cleanup-group.syn.v1',group,source:process.env.GITHUB_SHA,lineages,graphs:lineages.length*2+(group==='g5'?1:0),maxConcurrentNative:group==='g0'?1:2,operationalReadiness:false,PCoff:false};
 await writeFile(join(root,'group.json'),json(data));await waitUntil(Math.min(...lineages.map(l=>l.C0))-120000);
 assert(Date.now()<Number(process.env.AFW_JOB_STARTED_MS)+885000,'group export margin exhausted');console.info('R2 group checkpoint',json(data));
}
export async function verifyGroup(root){
 const data=JSON.parse(await readFile(join(root,'group.json'),'utf8'));assert.equal(data.source,process.env.GITHUB_SHA);
 assert(['g0','g1','g2','g3','g4','g5'].includes(data.group));
 assert.deepEqual(data.lineages.map(l=>l.path),data.group==='g1'?['grant-before-link','notice-before-link']:['principal']);
 assert.equal(data.graphs,data.lineages.length*2+(data.group==='g5'?1:0));
 for(const l of data.lineages){const {manifest,data:checkpoint}=await verifyCheckpoint(join(root,l.path));assert.equal(!!checkpoint.sdkOnlyBuild,data.group==='g5');assert.equal(manifest.I0,l.I0);assert.equal(manifest.C0,l.C0);assert.equal(manifest.C1,l.C1);}
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

/** Bind the already-required partial checkpoint into the g4 outcome envelope. */
export async function sealCleanupG4Outcome(root){
 const m=JSON.parse(await readFile(join(root,'evidence-manifest.json'),'utf8'));assert.equal(m.source,process.env.GITHUB_SHA);assert.equal(m.group,'g4');
 assert.deepEqual(m.files.map(f=>f.path).sort(),['green-g4.tap','held-sdk-delete.json','restart-own-uncertainty.json']);
 const bytes=await readFile(join(root,'g4-partial/manifest.json')),partial=JSON.parse(bytes);assert.equal(partial.source,m.source);
 m.partialCheckpoint={path:'g4-partial',manifestSha256:sha(bytes)};await writeFile(join(root,'evidence-manifest.json'),json(m));return m.partialCheckpoint;
}
/** Byte/manifest audit only: never opens Miniflare, SDK, a clock or a producer. */
export async function verifyCleanupG4Outcome(root,{expectedEvidenceSource=process.env.GITHUB_SHA,historicalArchive=false}={}){
 assert.match(expectedEvidenceSource,/^[a-f0-9]{40}$/);
 const m=JSON.parse(await readFile(join(root,'evidence-manifest.json'),'utf8')),names=['green-g4.tap','held-sdk-delete.json','restart-own-uncertainty.json'];
 assert.equal(m.source,expectedEvidenceSource);assert.equal(m.group,'g4');assert.equal(m.operationalReadiness,false);assert.equal(m.completePackage,false);assert.equal(m.PCoff,false);
 assert.deepEqual(m.files.map(f=>f.path).sort(),names);assert.deepEqual((await readdir(root)).sort(),['evidence-manifest.json','g4-partial',...names].sort());
 for(const f of m.files){assert(!f.path.includes('/')&&!f.path.includes('..'));const bytes=await readFile(join(root,f.path));assert.equal(bytes.length,f.bytes);assert.equal(sha(bytes),f.sha256);}
 const tap=await readFile(join(root,'green-g4.tap'),'utf8');for(const [key,value]of [['tests',2],['pass',2],['fail',0],['cancelled',0],['skipped',0],['todo',0]])assert(tap.includes('# '+key+' '+value+'\n'));
 const partialBytes=await readFile(join(root,'g4-partial/manifest.json')),descriptor={path:'g4-partial',manifestSha256:sha(partialBytes)};
 if(historicalArchive){assert.equal(expectedEvidenceSource,'818bc4d4e6fb1935e594951ba09d3f9536ba49d6');assert.equal(Object.hasOwn(m,'partialCheckpoint'),false,'historical envelope did not bind partial manifest');}
 else assert.deepEqual(m.partialCheckpoint,descriptor);
 const {manifest,data}=await verifyCheckpoint(join(root,'g4-partial'),{source:expectedEvidenceSource});assert.equal(data.checkpointKind,'partial-cleanup');
 const held=JSON.parse(await readFile(join(root,'held-sdk-delete.json'),'utf8')),restarted=JSON.parse(await readFile(join(root,'restart-own-uncertainty.json'),'utf8'));
 for(const v of [held,restarted]){assert.equal(v.source,expectedEvidenceSource);assert.equal(v.I0,data.plan.I0);assert.equal(v.C0,data.plan.C0);assert.equal(v.C1,data.plan.C1);assert.equal(v.receipt,null);assert.equal(v.operationalReadiness,false);}
 assert.equal(manifest.parentManifestSha256,held.recovery.manifestSha256);assert.equal(held.state.deliveries,1);assert.equal(restarted.state.deliveries,3);assert.equal(restarted.alarm,null);assert.equal(restarted.fault.deletes,0);
 const project=v=>({label:v.label,I0:v.I0,C0:v.C0,C1:v.C1,signal:v.signal,state:v.state.status,deliveries:v.state.deliveries,alarm:v.alarm,restores:v.restores,receiptHash:v.receipt?.recordHash??null,children:v.metrics.children.length,childMaxMs:Math.max(...v.metrics.children.map(c=>c.elapsedMs)),sqlCalls:v.metrics.sqlCalls,sqlElapsedMs:v.metrics.sqlElapsedMs,kvLists:v.metrics.kvLists,kvDeletes:v.metrics.kvDeletes,held:v.fault.held,released:v.fault.released,settled:v.fault.settled});
 return {label:historicalArchive?'historical g4 byte audit; original job remains failed':'g4 strict outcome readback',sourceArtifact:expectedEvidenceSource,sourceVerifier:process.env.GITHUB_SHA,partialCheckpoint:descriptor,partialFiles:manifest.files.length,parentManifestSha256:manifest.parentManifestSha256,historicalEnvelopeBoundPartial:!historicalArchive,manifestAndBytesVerified:true,nativeEffectsReproduced:false,openedI0:false,results:[project(held),project(restarted)],operationalReadiness:false,completePackage:false,PCoff:false};
}
/** Genuine short SYN producer/control: early disposal, never a C0 closure claim. */
export async function verifyCleanupMTransportPremises(){
 const sdkOnly=await compileCleanupSdkOnlyWorker();assert.equal(sdkOnly.sha256,'92f6554db082c30e83c6f7ae4700544ee7438f0da349b0dc2d70594d97efe66f','unchanged accepted SDK-only component');
 await mkdir('output/owner-cleanup',{recursive:true});await writeFile('output/owner-cleanup/sdk-only-current.mjs',sdkOnly.script);await writeFile('output/owner-cleanup/sdk-only-current-metafile.json',json(sdkOnly.metafile));
 let f,result;
 try{
  f=await ownerReferenceFixture({after(){}},{cleanupCheckpoint:true});
  const prepared=await prepareOwnerReference(f),response=await prepared.issue();assert.equal(response.status,302);await assertActualComplete(f,{reference:true});await downstreamOwnerReference(f,response,prepared);
  const {currentMountedOptions}=f.cleanupCheckpointInputs(),m=cleanupMTransport(f.mf,{currentMountedOptions,expectedModuleHash:f.firstConnectionBuild.M.sha256});
  const positive=await readCleanupM(m,f.cleanupToken.access_token,f.source.project.projectId);
  const denied=await m.fetch('https://delegated-canary.agentfriendlyweb.dev/mcp',{method:'POST',headers:{Authorization:'Bearer SYN-invalid-control',Host:'127.0.0.1','MF-Route-Override':'qa-first-connection','Content-Type':'application/json',Accept:'application/json, text/event-stream'},body:json({jsonrpc:'2.0',id:1,method:'initialize',params:{protocolVersion:'2025-03-26',capabilities:{},clientInfo:{name:'SYN-wrapper-negative',version:'1'}}})});
  const body=await denied.text();assert([401,403].includes(denied.status));assert(!body.includes(f.source.project.projectId));
  const facts=await plain(f.stub.ownerCleanupFacts()),plan=JSON.parse(facts.rows.find(([k])=>k===P+'plan')[1]);assert.equal(facts.signal.entered,0);assert(Date.now()<plan.C0);
  result={label:'SYN genuine I0 diagnostic; early dispose; not GREEN51',source:process.env.GITHUB_SHA,I0:plan.I0,C0:plan.C0,C1:plan.C1,nativeDbNow:facts.dbNow,openedI0:true,closureProved:false,fabricatedAdmission:false,positive,negative:{status:denied.status,bodyHash:sha(body),dataDenied:true},sdkOnly:{sha256:sdkOnly.sha256,bytes:sdkOnly.bytes,inputs:Object.keys(sdkOnly.metafile.inputs).length,priorHoldRun:42371140511,holdRepeated:false},expiry:f.sdkAfterExchange,operationalReadiness:false,completePackage:false,PCoff:false};
 }finally{if(f){await f.mf.dispose();await f.cleanup();}}
 result.disposedAt=Date.now();assert(result.disposedAt<result.C0);result.disposedBeforeC0=true;await writeCleanupEvidence('m-transport-preflight',result);return result;
}

/** Directed SDK component qualification, no AFW I0/alarm or business admission. */
export async function verifyCleanupQualificationPremises(){
 const candidate=await compileCleanupSdkOnlyWorker(),M=await compileFirstConnectionCandidate('c'.repeat(40),'d'.repeat(40));
 assert(Object.keys(candidate.metafile.inputs).some(p=>p.includes('@cloudflare/workers-oauth-provider')));
 assert(Object.hasOwn(M.metafile.inputs,'worker/mcp-own/finite.mjs'));
 const source=String.raw`
 import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
 const O='https://delegated-canary.agentfriendlyweb.dev',server=new OAuthAuthorizationServer({issuer:O,resources:[O+'/mcp'],scopesSupported:['afw:project:read'],accessTokenTTL:300,refreshTokenTTL:0,clientIdMetadataDocumentEnabled:false});
 export default{async fetch(request,env,ctx){
  if(new URL(request.url).pathname!=='/_component/authorize')return server.fetch(request,env,ctx);
  const api=server.getOAuthApi(env),input=await request.json();
  const client=await api.createClient({redirectUris:['https://client.example/cb'],clientName:'SYN SDK qualification component',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none'});
  const parsed=await api.parseAuthRequest(new Request(O+'/authorize?'+new URLSearchParams({client_id:client.clientId,redirect_uri:'https://client.example/cb',response_type:'code',scope:'afw:project:read',resource:O+'/mcp',state:'SYN-component',code_challenge:input.challenge,code_challenge_method:'S256'})));
  const result=await api.completeAuthorization({request:parsed,userId:'SYN-sdk-component',scope:parsed.scope,metadata:{afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash:'a'.repeat(64)}},props:{componentOnly:true},revokeExistingGrants:false});
  return Response.json({clientId:client.clientId,redirectTo:result.redirectTo});
 }};
`;
 const issuer=await build({bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],stdin:{contents:source,resolveDir:process.cwd()}});
 const base={modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],kvNamespaces:{OAUTH_KV:'SYN-sdk-component-only'},outboundService:async()=>new Response(null,{status:503})};
 await mkdir('output/owner-cleanup-preflight',{recursive:true});
 await writeFile('output/owner-cleanup-preflight/sdk-only-index.mjs',candidate.script);await writeFile('output/owner-cleanup-preflight/sdk-only-metafile.json',json(candidate.metafile));
 await writeFile('output/owner-cleanup-preflight/M-index.mjs',M.script);await writeFile('output/owner-cleanup-preflight/M-metafile.json',json(M.metafile));
 await writeFile('output/owner-cleanup-preflight/component-index.mjs',issuer.outputFiles[0].text);await writeFile('output/owner-cleanup-preflight/component-metafile.json',json(issuer.metafile));
 const mf=new Miniflare(convertV4MiniflareOptions({workers:[{...base,name:'sdk-component-issuer',script:issuer.outputFiles[0].text},{...base,name:'sdk-only-first-connection',script:candidate.script}]}));let negative,response;
 try{
  const O='https://delegated-canary.agentfriendlyweb.dev',owner=await mf.getWorker('sdk-component-issuer');negative=await mf.getWorker('sdk-only-first-connection');const kv=await mf.getKVNamespace('OAUTH_KV','sdk-component-issuer');
  const verifier='v'.repeat(64),challenge=createHash('sha256').update(verifier).digest('base64url');
  const auth=await owner.fetch(O+'/_component/authorize',{method:'POST',body:json({challenge})});assert.equal(auth.status,200);const data=await auth.json(),code=new URL(data.redirectTo).searchParams.get('code');assert(code);
  const listed=await kv.list({prefix:'grant:SYN-sdk-component:',limit:1});assert.equal(listed.keys.length,1);const key=listed.keys[0].name,before=JSON.parse(await kv.get(key));assert.equal(before.expiresAt,undefined);assert(Number.isSafeInteger(listed.keys[0].expiration));
  const tokenResponse=await owner.fetch(O+'/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:data.clientId,redirect_uri:'https://client.example/cb',resource:O+'/mcp',code,code_verifier:verifier})});assert.equal(tokenResponse.status,200);
  const token=await tokenResponse.json();assert.equal(typeof token.access_token,'string');assert.equal(token.refresh_token,undefined);assert.equal(token.expires_in,300);
  const after=JSON.parse(await kv.get(key));assert.equal(after.id,before.id);assert(Number.isSafeInteger(after.expiresAt));assert(after.expiresAt*1000>Date.now());assert.deepEqual(after.metadata,before.metadata);
  response=await negative.fetch(O+'/_fixture/sdk-only-exchange',{method:'POST',headers:{'Content-Type':'application/json'},body:json({subjectToken:token.access_token,sdkGrantId:before.id,clientId:data.clientId,correlationHash:'a'.repeat(64),referenceHash:'b'.repeat(64),C0:Date.now()+75000})});assert.equal(response.status,403);
  const held=await (await negative.fetch(O+'/_fixture/sdk-only-signal')).json();assert(held.reached&&held.retained&&!held.settled);assert.equal(held.logicalReason,'deadline');
  const busy=await negative.fetch(O+'/_fixture/sdk-only-exchange',{method:'POST'});assert.equal(busy.status,409);await busy.body?.cancel();
  const body=response.text();await waitUntil(held.rootStartedAt+80000);await negative.fetch(O+'/_fixture/sdk-only-release');assert.equal(await body,'SYN SDK-only denied');
  const settled=await (await negative.fetch(O+'/_fixture/sdk-only-signal')).json();assert(settled.settled&&!settled.retained);assert(settled.nativeReturned&&settled.sdkReturned);
  const result={purpose:'afw.cleanup-sdk-premises.component.syn.v1',source:process.env.GITHUB_SHA,noAFWI0:true,noBusinessAdmission:true,componentOnly:true,originalGrant:sha(before.id),preExchangeExpiresAt:null,codeKVExpiration:listed.keys[0].expiration,postExchangeExpiresAt:after.expiresAt,actualAccessTTL:token.expires_in,refreshAbsent:true,held,settled,M:{sha256:sha(M.bytes),bytes:M.bytes.length,inputs:Object.keys(M.metafile.inputs).length},SDKOnly:{sha256:candidate.sha256,bytes:candidate.bytes,inputs:Object.keys(candidate.metafile.inputs).length},operationalReadiness:false,completePackage:false,PCoff:false};
  await writeFile('output/owner-cleanup-preflight/result.json',json(result));console.info('R2 directed SDK premises',json(result));
 }catch(error){
  const signal=negative?await (await negative.fetch('https://delegated-canary.agentfriendlyweb.dev/_fixture/sdk-only-signal')).json().catch(()=>null):null;
  await writeFile('output/owner-cleanup-preflight/failure.json',json({source:process.env.GITHUB_SHA,noAFWI0:true,name:error.name,message:error.message,signal}));throw error;
 }finally{
  if(negative)await negative.fetch('https://delegated-canary.agentfriendlyweb.dev/_fixture/sdk-only-release').catch(()=>{});
  await mf.dispose();const files=await inventory('output/owner-cleanup-preflight');await writeFile('output/owner-cleanup-preflight/manifest.json',json({source:process.env.GITHUB_SHA,files}));
 }
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const [command,root='output/owner-cleanup/checkpoint-g0',group='g0']=process.argv.slice(2);
 if(command==='preflight')await verifyCleanupQualificationPremises();
 else if(command==='prepare')await produceCheckpoint(root);
 else if(command==='prepare-group')await produceGroup(group,root);
 else if(command==='verify-group')console.info('R2 group uploaded readback',json(await verifyGroup(root)));
 else if(command==='verify'){const {manifest}=await verifyCheckpoint(root);console.info('R2 artifact exact readback',json({source:manifest.source,files:manifest.files.length,C0:manifest.C0}));}
 else throw Error('SYN fixed checkpoint command');
}
