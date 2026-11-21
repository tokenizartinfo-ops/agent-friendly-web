import assert from 'node:assert/strict';
import {readFiniteR2Archive,storeFiniteR2Bundle} from '../lib/mcp-qa-finite-r2-object.mjs';
import {createHash} from 'node:crypto';
import {gzipSync} from 'node:zlib';
import {execFile} from 'node:child_process';
import {isDeepStrictEqual,promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {readFile,mkdir,writeFile,realpath,mkdtemp,unlink,rmdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {verifyMcpReleaseSource} from './mcp-release-source.mjs';
import {buildMcpNodeProgram} from './build-mcp-node-program.mjs';
import {encodeFiniteStagingPackageLayout} from '../lib/mcp-qa-finite-seed.mjs';
import {finiteWranglerProfileTemplate,finitePublicStaticExpectation,finitePublicProfileTemplate,qualifyHistoricalClosedVersionProfile} from '../lib/mcp-qa-finite-profile.mjs';
import {QA_CLOUD_CLOSED_PINS} from '../lib/mcp-qa-cloud-closed-pins.mjs';
const exec=promisify(execFile),hash=x=>createHash('sha256').update(x).digest('hex');
const fail=()=>{throw Error('Finite native package unavailable');};
const workflow='.github/workflows/afw-finite-native-package.yml';
const bootstrapPaths={workflowHash:'.github/workflows/afw-finite-qa-bootstrap.yml',cliHash:'scripts/run-qa-finite-bootstrap.mjs'};
// Acyclic residency: nodeM -> canaryM -> QA; never embed QA/package hashes.
const roles=['canaryLive','qaLive'];
const paths={qaLive:'wrangler.independent-closure-qa.finite.jsonc',canaryLive:'wrangler.mcp-own.finite.jsonc'};
const expectedExports={qaLive:['IndependentClosure','PrivateQaBootstrap','PrivateQaCatalog','PrivateQaNamedConfirmation','PrivateQaPreregistration','default','observePrivateQa'],canaryLive:['AfwNodeControl','AfwOwnEventNode','default']};
const custodyProbePath='qaCustodyProbe/index.mjs';
const custodyProbeEntry='scripts/qa-finite-pre-entry-custody-wrapper.mjs';
const historicalInputPath='scripts/mcp-finite-r2-historical-inputs.json';
const closedPinPath='lib/mcp-qa-cloud-closed-pins.mjs';
const archiveVerifier='scripts/verify-qa-finite-archive.py';
const releaseRoles=['qaLive','qaClosed','canaryLive','canaryClosed','operatorClosed'];
const historicalKeys={qaClosed:'qaClosed',canaryClosed:'canary',operatorClosed:'operator'};
const sha256Hex=value=>typeof value==='string'&&/^[a-f0-9]{64}$/.test(value);
async function historicalInputLocator(cwd,sourceRevision){
 const pinBlob=(await exec('git',['rev-parse',sourceRevision+':'+closedPinPath],{cwd,encoding:'utf8',timeout:10000})).stdout.trim();
 const text=await readFile(resolve(cwd,historicalInputPath),'utf8');
 if(Buffer.byteLength(text)>24576)fail();
 const ref=JSON.parse(text);
 const keys=['purpose','bucket','objectKey','archiveSha256','archiveBytes','receiptSha256','providerSourcePin','preservedAtUTC','inputs'];
 if(!ref||Object.keys(ref).sort().join(',')!==keys.sort().join(',')||
    ref.purpose!=='afw.finite-r2-historical-inputs.v1'||ref.bucket!=='afw-release-backups'||
    ref.providerSourcePin!=='26213123304eea25e652a52d808d25b7e0e3475e'||ref.providerSourcePin!==pinBlob||
    !sha256Hex(ref.archiveSha256)||!sha256Hex(ref.receiptSha256)||
    !Number.isSafeInteger(ref.archiveBytes)||ref.archiveBytes<1||ref.archiveBytes>67108864||
    ref.objectKey!=='historical-v1/sha256-'+ref.archiveSha256+'.zip'||
    typeof ref.preservedAtUTC!=='string'||new Date(ref.preservedAtUTC).toISOString()!==ref.preservedAtUTC)fail();
 assert.deepEqual(Object.keys(ref.inputs).sort(),Object.keys(historicalKeys).sort());
 for(const [role,key] of Object.entries(historicalKeys)){
  const item=ref.inputs[role],pin=QA_CLOUD_CLOSED_PINS[key];
  if(!sha256Hex(item?.metadataSha256))fail();
  assert.deepEqual(item,{versionId:pin.id,moduleName:pin.module.name,moduleBytes:pin.module.bytes,
   moduleSha256:pin.module.sha256,configurationSha256:pin.configurationHash,metadataSha256:item.metadataSha256});
 }
 return {purpose:ref.purpose,archiveSha256:ref.archiveSha256,archiveBytes:ref.archiveBytes,
  receiptSha256:ref.receiptSha256,providerSourcePin:ref.providerSourcePin,archiveReadByCompiler:false};
}
function options(v){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==2)fail();
 for(const k of ['cwd','sourceRevision']){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value')||typeof d.value!=='string')fail();}
 if(!/^[a-f0-9]{40}$/.test(v.sourceRevision))fail();return v;
}
async function exactTrackedBytes(cwd,revision,path){
 const bytes=await readFile(resolve(cwd,path));
 const tracked=(await exec('git',['show',revision+':'+path],{cwd,encoding:null,timeout:10000,maxBuffer:1048576})).stdout;
 if(!bytes.equals(tracked))fail();
 return bytes;
}
async function inputs(cwd,revision){
 const result={};
 const origin=(await exec('git',['remote','get-url','origin'],{cwd,encoding:'utf8',timeout:10000})).stdout.trim();
 if(!['https://github.com/tokenizartinfo-ops/agent-friendly-web','https://github.com/tokenizartinfo-ops/agent-friendly-web.git'].includes(origin))fail();
 for(const path of [workflow,historicalInputPath,closedPinPath,archiveVerifier,...Object.values(paths),...Object.values(bootstrapPaths)]){
  const bytes=await exactTrackedBytes(cwd,revision,path);
  result[path]=hash(bytes);
  const role=roles.find(r=>paths[r]===path);if(role)assert.deepEqual(JSON.parse(bytes),finiteWranglerProfileTemplate(role));
 }return result;
}
async function compileQaCustodyProbeTemplate(cwd,sourceRevision,sourceTree){
 const assemblyInputs=['./closed-rollback.mjs','./pre-entry-custody-context.mjs'];
 const expectedExports=['IndependentClosure','PrivateQaBootstrap','PrivateQaNamedConfirmation','PrivateQaPreregistration','default'];
 const compiled=await build({absWorkingDir:cwd,entryPoints:[custodyProbeEntry],bundle:true,write:false,
  format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*',...assemblyInputs],
  legalComments:'none',sourcemap:false,minifyWhitespace:true,metafile:true});
 const outputs=Object.values(compiled.metafile.outputs);
 if(outputs.length!==1||compiled.outputFiles.length!==1||!compiled.metafile.inputs[custodyProbeEntry]||
    !compiled.metafile.inputs['lib/mcp-qa-finite-initial-custody-profile.mjs'])fail();
 const output=outputs[0],imports=output.imports.map(item=>item.path);
 assert.deepEqual(output.exports.slice().sort(),expectedExports);
 if(!assemblyInputs.every(path=>imports.includes(path))||
    output.imports.some(item=>!item.external||item.kind!=='import-statement'||
     ![...assemblyInputs,'node:async_hooks','node:crypto'].includes(item.path)))fail();
 const content=Buffer.from(compiled.outputFiles[0].contents);
 if(!content.length||content.length>1048576)fail();
 return {content,descriptor:Object.freeze({purpose:'afw.qa-custody-probe-template.v1',
  sourceRevision,sourceTree,module:{name:'index.mjs',bytes:content.length,sha256:hash(content),exports:expectedExports},
  assemblyInputs,authorizesEffects:false,operationalReadiness:false})};
}

/** Real compiler staging, deliberately NOT a package or deployment attestation.
 * No provider, private policy, callback, caller pins or readiness flag accepted. */
export async function compileFiniteNativeStaging(input){
 try{
  const {cwd:requestedCwd,sourceRevision}=options(input),cwd=await realpath(requestedCwd);
  // Imported Node builder resolves its source beside this compiler. Restrict
  // the exported API to that same physical checkout before any compilation;
  // use the canonical path throughout so a caller alias cannot retarget inputs.
  if(cwd!==await realpath(fileURLToPath(new URL('..',import.meta.url))))fail();
  const before=await verifyMcpReleaseSource({cwd,sourceRevision}),inputBefore=await inputs(cwd,sourceRevision);
  const historicalInput=await historicalInputLocator(cwd,sourceRevision);
  const node=await buildMcpNodeProgram(),files={},modules={},metafiles={};
  if(hash(node.program)!==node.programHash)fail();
  let candidateResidency;
  for(const role of roles){
   const config=finiteWranglerProfileTemplate(role),entry=config.main;
   if(role==='qaLive'&&!candidateResidency)fail();
   // Preserve the module byte budget while keeping source and bundle identifiers readable.
   const compiled=await build({absWorkingDir:cwd,entryPoints:[entry],bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',sourcemap:false,minifyWhitespace:true,metafile:true,define:{
    'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(sourceRevision),
    'globalThis.__AFW_NODE_SOURCE_REVISION__':JSON.stringify(sourceRevision),
    'globalThis.__AFW_NODE_PROGRAM__':JSON.stringify(node.program),
    'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify('finite_trial_event'),
    ...(role==='qaLive'?{
     'globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__':JSON.stringify(candidateResidency),
     'globalThis.__AFW_FINITE_SOURCE_TREE__':JSON.stringify(before.tree),
     'globalThis.__AFW_FINITE_BOOTSTRAP_SOURCE__':JSON.stringify({sourceRevision,sourceTree:before.tree,...Object.fromEntries(Object.entries(bootstrapPaths).map(([k,p])=>[k,inputBefore[p]]))}),
    }:{}),
   }});
   const out=Object.values(compiled.metafile.outputs);
   if(compiled.outputFiles.length!==1||out.length!==1)fail();
   assert.deepEqual(out[0].exports.slice().sort(),expectedExports[role]);
   const original=role==='qaLive'?'worker/independent-closure/index.mjs':'worker/mcp-own/index.mjs';
   if(!compiled.metafile.inputs[entry]||!compiled.metafile.inputs[original])fail();
   const bytes=compiled.outputFiles[0].contents;
   const bootstrapInput='lib/mcp-qa-finite-bootstrap-source.mjs';
   if(role==='qaLive'){
    if(!compiled.metafile.inputs[bootstrapInput]||Object.values(bootstrapPaths).some(p=>!Buffer.from(bytes).includes(Buffer.from(inputBefore[p]))))fail();
   }else if(compiled.metafile.inputs[bootstrapInput])fail();
   if(Object.keys(compiled.metafile.inputs).some(p=>['bootstrap-issuer','build-finite-native-package','node_modules/esbuild'].some(name=>p.includes(name))))fail();
   if(bytes.length<1||bytes.length>(role==='canaryLive'?2097152:3145728))fail();
   const decoder='lib/mcp-qa-finite-candidate-residency.mjs';
   if(role==='canaryLive'){
    if(compiled.metafile.inputs[decoder])fail();
    const compressed=gzipSync(bytes,{level:9,mtime:0});
    if(compressed.length>2098176)fail();
    candidateResidency=Object.freeze({purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision,sourceTree:before.tree,sourceCheck:'git-inputs-before-after-v1',programHash:node.programHash,module:Object.freeze({name:'index.mjs',sha256:hash(bytes),bytes:bytes.length}),compressedSha256:hash(compressed),compressedBytes:compressed.length,content:compressed.toString('base64')});
   }else if(!compiled.metafile.inputs[decoder]||!Buffer.from(bytes).includes(Buffer.from(candidateResidency.content)))fail();
   files[role+'/index.mjs']=Buffer.from(bytes);
   modules[role]={provenance:{kind:'compiled-source.v1',sourceRevision,sourceTree:before.tree},module:{name:'index.mjs',sha256:hash(bytes),bytes:bytes.length,exports:out[0].exports.slice().sort()},publicStatic:finitePublicStaticExpectation(role)};
   metafiles[role]=compiled.metafile;
  }
  const probe=await compileQaCustodyProbeTemplate(cwd,sourceRevision,before.tree);
  files[custodyProbePath]=probe.content;
  const after=await verifyMcpReleaseSource({cwd,sourceRevision});assert.deepEqual(after,before);assert.deepEqual(await inputs(cwd,sourceRevision),inputBefore);
  return {purpose:'afw.finite-native-compiler-staging.v1',sourceRevision,sourceTree:after.tree,historicalInput,sourceCheck:'git-inputs-and-configuration-before-after-v1',buildWorkflowHash:inputBefore[workflow],bootstrapSource:{sourceRevision,sourceTree:after.tree,...Object.fromEntries(Object.entries(bootstrapPaths).map(([k,p])=>[k,inputBefore[p]]))},modules,files,metafiles,candidateResidency,custodyProbeTemplate:probe.descriptor,completePackage:false,operationalReadiness:false};
 }catch{fail();}
}
function privateVerifier(cwd,mode,input,maxBuffer){
 return new Promise((accept,reject)=>{
  const interpreter=process.platform==='win32'?'python':'python3';
  const child=execFile(interpreter,['-I','-B',resolve(cwd,archiveVerifier),...(mode?[mode]:[])],{
   cwd,timeout:30000,maxBuffer,encoding:'buffer',windowsHide:true
  },(error,stdout,stderr)=>{
   if(error||stderr.length){reject(Error('Finite private compiler draft unavailable'));return;}
   accept(stdout);
  });
  child.stdin.on('error',()=>reject(Error('Finite private compiler draft unavailable')));
  child.stdin.end(input);
 });
}
// Reuse the native Workflow/DO test against the archived QA program, with
// fixture credentials and intercepted provider replies. The test never
// receives the signed R2 URL or a Cloudflare credential.
async function verifyArchivedQaCustodyProbe({cwd,sourceRevision,sourceTree},moduleBytes){
 const fixture='test/mcp-qa-finite-pre-entry-host-native.test.mjs';
 const source={cwd,sourceRevision};
 const check=async()=>{
  assert.equal((await verifyMcpReleaseSource(source)).tree,sourceTree);
  await exactTrackedBytes(cwd,sourceRevision,fixture);
 };
 await check();
 const pin=QA_CLOUD_CLOSED_PINS.qaClosed.module;
 if(moduleBytes.byteLength!==pin.bytes||hash(moduleBytes)!==pin.sha256)fail();
 const dir=await mkdtemp(resolve(tmpdir(),'afw-qa-custody-'));
 const path=resolve(dir,'closed-rollback.mjs');
 try{
  await writeFile(path,moduleBytes,{mode:0o600,flag:'wx'});
  const environment=Object.fromEntries(['PATH','SystemRoot','TMPDIR','TMP','TEMP']
   .filter(k=>typeof process.env[k]==='string').map(k=>[k,process.env[k]]));
  const {stdout}=await exec(process.execPath,['--test','--test-reporter=tap',fixture],{
   cwd,env:{...environment,AFW_REQUIRE_EXACT_BASELINE:'1',AFW_QA_INSPECTION_BASE_MODULE:path},
   encoding:'utf8',timeout:90000,maxBuffer:262144,windowsHide:true
  });
  await check();
  const lines=stdout.split(/\r?\n/);
  const baseline=lines.find(line=>line.startsWith('# CUSTODY_HOST_BASELINE '));
  const expected='# CUSTODY_HOST_BASELINE '+JSON.stringify({mode:'exact',bytes:pin.bytes,sha256:pin.sha256});
  const count=Number(lines.find(line=>line.startsWith('# tests '))?.slice(8));
  if(baseline!==expected||!Number.isSafeInteger(count)||count<2||!lines.includes('# pass '+count)||
     !lines.includes('# fail 0')||!lines.includes('# skipped 0')||
     !lines.some(line=>/^ok \d+ - fixed native Workflow reaches actual custody actor/.test(line))||
     !lines.some(line=>/^ok \d+ - loaded wrong credential identity fails closed/.test(line)))fail();
  return Object.freeze({baselineSha256:pin.sha256,testsPassed:count,syntheticProvider:true,
   loadedCloudCredentialObserved:false,operationalReadiness:false});
 }catch{throw Error('Archived QA custody rehearsal unavailable');}
 finally{
  try{
   try{await unlink(path);}catch(error){if(error.code!=='ENOENT')throw error;}
   finally{await rmdir(dir);}
  }catch{throw Error('Archived QA custody rehearsal cleanup unavailable');}
 }
}

/** Verify the v2 ZIP layout with real module bytes, returning only readback evidence.
 * A pending native guard is represented in the private manifest as false. */
export async function verifyFiniteReleaseLayout({cwd,manifest,modules}){
 if(!modules||Object.keys(modules).length!==releaseRoles.length)fail();
 const manifestBytes=Buffer.from(encodeFiniteStagingPackageLayout(manifest),'utf8');
 if(!manifestBytes.length||manifestBytes.length>24576)fail();
 const inputs=[manifestBytes,...releaseRoles.map(role=>{
  const bytes=modules[role];
  if(!(bytes instanceof Uint8Array)||bytes.byteLength<1||bytes.byteLength>3145728)fail();
  return bytes;
 })];
 const header=Buffer.alloc(inputs.length*4);
 inputs.forEach((bytes,index)=>header.writeUInt32LE(bytes.byteLength,index*4));
 const zip=await privateVerifier(cwd,'--assemble-release-package',Buffer.concat([header,...inputs]),64*1024*1024);
 const readback=JSON.parse(await privateVerifier(cwd,null,zip,65536));
 if(readback.manifestText!==manifestBytes.toString('utf8')||Object.keys(readback.files).length!==releaseRoles.length)fail();
 for(const role of releaseRoles){
  const {name,sha256,bytes}=manifest.modules[role].module;
  assert.deepEqual(readback.files[role+'/'+name],{sha256,bytes});
 }
 return Object.freeze({archiveSha256:hash(zip),archiveBytes:zip.length,moduleCount:releaseRoles.length,
  completePackage:false,operationalReadiness:false});
}

/** The digest and rollback configuration are verified before the binary
 * publisher can use the same immutable frame. */
async function verifyPrivateFiniteCompilerDraft({cwd,sourceRevision},readArchive,{emit=false}={}){
 const built=await compileFiniteNativeStaging({cwd,sourceRevision}),expected=built.historicalInput.archiveBytes;
 let length=0;const chunks=[];
 for await(const part of await readArchive()){
  if(!(part instanceof Uint8Array)||(length+=part.byteLength)>expected)fail();chunks.push(part);
 }
 const archive=Buffer.concat(chunks,length);
 if(length!==expected||hash(archive)!==built.historicalInput.archiveSha256)fail();
 const canary=Buffer.from(built.files['canaryLive/index.mjs']),qa=Buffer.from(built.files['qaLive/index.mjs']);
 const modules=Object.fromEntries(roles.map(role=>[role,built.modules[role].module]));
 const manifest=Buffer.from(JSON.stringify({purpose:built.purpose,sourceRevision:built.sourceRevision,sourceTree:built.sourceTree,
  historicalInput:built.historicalInput,modules,completePackage:false,operationalReadiness:false}));
 const head=Buffer.alloc(16);[archive,canary,qa,manifest].forEach((item,i)=>head.writeUInt32LE(item.length,i*4));
 const frame=Buffer.concat([head,archive,canary,qa,manifest]);
 const parsed=JSON.parse(await privateVerifier(cwd,'--inspect-rollback-compiler-draft',frame,65536));
 if(parsed.purpose!=='afw.finite-native-private-draft.v1'||parsed.sourceRevision!==built.sourceRevision||
    parsed.sourceTree!==built.sourceTree||parsed.historicalArchiveSha256!==built.historicalInput.archiveSha256||
    parsed.moduleCount!==5||parsed.completePackage!==false||parsed.operationalReadiness!==false||!sha256Hex(parsed.draftSha256))fail();
 const allModules={...modules,...Object.fromEntries(Object.entries(historicalKeys).map(([role,key])=>[role,QA_CLOUD_CLOSED_PINS[key].module]))};
 const files=Object.fromEntries(Object.entries(allModules).map(([role,module])=>[role+'/'+module.name,{sha256:module.sha256,bytes:module.bytes}]));
 assert.deepEqual(parsed.files,files);
 const {privateMetadata,...receipt}=parsed;
 if(!privateMetadata||Object.keys(privateMetadata).length!==Object.keys(historicalKeys).length)fail();
 const rollbackProfiles={};
 for(const role of Object.keys(historicalKeys)){
  const metadata=privateMetadata[role];
  rollbackProfiles[role]=qualifyHistoricalClosedVersionProfile(role,metadata);
  if(role==='operatorClosed')continue;
  const liveRole=role==='qaClosed'?'qaLive':'canaryLive';
  const liveProfile=finitePublicProfileTemplate(liveRole);
  const closedNamespaces=metadata.bindings.filter(binding=>binding.type==='durable_object_namespace');
  for(const closed of closedNamespaces){
   const found=liveProfile.bindings.find(binding=>binding.name===closed.name);
   if(!isDeepStrictEqual(found,closed))fail();
   if(!closed.script_name){
    if(metadata.exports?.[closed.class_name]?.type!=='durable-object'||
       metadata.exports[closed.class_name].storage!=='sqlite'||
       !built.modules[liveRole].module.exports.includes(closed.class_name))fail();
   }
  }
 }
 // Keep the pinned historical bytes inside the verifier and Workerd process.
 const orderedClosedRoles=['qaClosed','canaryClosed','operatorClosed'];
 const rollbackByteLength=orderedClosedRoles.reduce((length,role)=>length+allModules[role].bytes,0);
 const historicalModules=await privateVerifier(cwd,'--emit-pinned-rollback-modules',archive,rollbackByteLength);
 if(historicalModules.length!==rollbackByteLength)fail();
 const [{verifyFiniteStagingMounts},{verifyFiniteRollbackMounts,verifyExpiredQaCustodyTemplate}]=await Promise.all([
  import('./verify-finite-native-staging.mjs'),import('./verify-finite-native-rollback.mjs')
 ]);
 const currentMounts=await verifyFiniteStagingMounts(built);
 const {moduleExports,...rollbackMounts}=await verifyFiniteRollbackMounts(historicalModules,privateMetadata);
 for(const role of orderedClosedRoles){
  const names=moduleExports[role];
  rollbackProfiles[role]={...rollbackProfiles[role],exportCount:names.length,
   exportNamesHash:hash('afw.finite-historical-module-exports.v1\n'+JSON.stringify(names))};
 }
 // The archive rehearsal uses the exact closed modules that were just mounted.
 const layoutModules={qaLive:qa,canaryLive:canary},layoutDescriptors={...built.modules};
 let rollbackOffset=0;
 for(const role of orderedClosedRoles){
  const key=historicalKeys[role],modulePin=allModules[role],profile=rollbackProfiles[role];
  layoutModules[role]=historicalModules.subarray(rollbackOffset,rollbackOffset+modulePin.bytes);
  rollbackOffset+=modulePin.bytes;
  layoutDescriptors[role]={
   provenance:{kind:'historical-content-pin.v1',receiptPath:closedPinPath,receiptBlobSha:built.historicalInput.providerSourcePin,
    receiptKey:key,versionId:profile.versionId},
   module:{...modulePin,exports:moduleExports[role]},publicStatic:profile.publicStatic
  };
 }
 const releaseLayout=await verifyFiniteReleaseLayout({cwd,modules:layoutModules,manifest:{
  purpose:'afw.finite-native-package.v2',sourceRevision:built.sourceRevision,sourceTree:built.sourceTree,
  sourceCheck:built.sourceCheck,buildWorkflowHash:built.buildWorkflowHash,modules:layoutDescriptors,
  compatibility:{qaClassesPreserved:true,qaNamespacesPreserved:true,canaryClassesPreserved:true,canaryNamespacesPreserved:true,
   closedEntrypointsDenied:true,legacyContainmentQualified:false}
 }});
 const custodyRehearsal=await verifyArchivedQaCustodyProbe({cwd,sourceRevision:built.sourceRevision,sourceTree:built.sourceTree},
  layoutModules.qaClosed);
 const expiredCustodyTemplate=await verifyExpiredQaCustodyTemplate({staging:built,
  baseline:layoutModules.qaClosed,metadata:privateMetadata.qaClosed});
 // Pin what the subsequent native qualification must prove against this
 // exact draft. The archived mount and synthetic token cannot attest QA.
 const preEntry={purpose:'afw.finite-package-pre-entry.v1',
  sourceRevision:built.sourceRevision,sourceTree:built.sourceTree,
  releaseZipSha256:releaseLayout.archiveSha256,
  qaCandidateModuleSha256:built.modules.qaLive.module.sha256,
  qaCustodyProbeTemplateSha256:built.custodyProbeTemplate.module.sha256,
  rollbackArchiveSha256:built.historicalInput.archiveSha256,
  rollbackReceiptSha256:built.historicalInput.receiptSha256,
  qaRollbackVersionId:rollbackProfiles.qaClosed.versionId,
  qaRollbackModuleSha256:layoutDescriptors.qaClosed.module.sha256};
 const verified={...receipt,rollbackProfiles,nativeMounts:{current:currentMounts,rollback:rollbackMounts},
  custodyRehearsal,expiredCustodyTemplate,releaseLayout,
  preEntry:Object.freeze({...preEntry,qualificationHash:hash(JSON.stringify(preEntry)),
   status:'pending_native_qualification',authorizesDeployment:false})};
 if(!emit)return verified;
 const bundle=await privateVerifier(cwd,'--emit-private-compiler-bundle',frame,64*1024*1024);
 if(bundle.length!==receipt.draftBytes||hash(bundle)!==receipt.draftSha256)fail();
 return {verified,bundle};
}
/** Complete-package boundary. Deliberately no positive path until separately
 * reviewed historical input custody/privacy and actual native mounts qualify.
 * Class exports and successful compilation are insufficient evidence. */
export async function buildFiniteNativePackage(input){
 options(input);
 await compileFiniteNativeStaging(input);
 // The staged receipt identifies a verified private R2 archive. This build does
 // not read its bytes. Native material/guard mounts, receiver and rollback
 // compatibility still need independent qualification before package output.
 fail();
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const mode=process.argv[2],staging=mode==='--staging',emit=mode==='--emit-private-r2';
 const fromR2=mode==='--verify-r2-draft'||emit,privateDraft=mode==='--verify-private-draft'||fromR2;
 if(!((staging||privateDraft)&&process.argv.length===4||!staging&&!privateDraft&&process.argv.length===3))fail();
 const sourceRevision=process.argv[staging||privateDraft?3:2],cwd=fileURLToPath(new URL('..',import.meta.url));
 // Keep the signed URLs in the CLI alone. Git, Python and Workerd may
 // inherit the process environment, and none needs access to R2.
 const backupReadUrl=process.env.AFW_R2_BACKUPS_READ_URL;
 const bundleWriteUrl=process.env.AFW_R2_BUNDLE_WRITE_URL;
 const bundleReadUrl=process.env.AFW_R2_BUNDLE_READ_URL;
 delete process.env.AFW_R2_BACKUPS_READ_URL;
 delete process.env.AFW_R2_BUNDLE_WRITE_URL;
 delete process.env.AFW_R2_BUNDLE_READ_URL;
 if(privateDraft){
  const result=await verifyPrivateFiniteCompilerDraft({cwd,sourceRevision},fromR2?async()=>(
   await readFiniteR2Archive({credential:backupReadUrl,signal:AbortSignal.timeout(15000)})
  ).body:()=>process.stdin,{emit});
  const receipt=emit?{...result.verified,privateR2Bundle:await storeFiniteR2Bundle({
   sourceRevision,bytes:result.bundle,writeCredential:bundleWriteUrl,
   readCredential:bundleReadUrl,signal:AbortSignal.timeout(30000)
  }),authorizesDeployment:false}:result;
  process.stdout.write(JSON.stringify(receipt)+'\n');
 }else{
  const built=staging?await compileFiniteNativeStaging({cwd,sourceRevision}):await buildFiniteNativePackage({cwd,sourceRevision});
  let nativeMount;
  if(staging){
   const {verifyFiniteStagingMounts}=await import('./verify-finite-native-staging.mjs');
   nativeMount=await verifyFiniteStagingMounts(built);
   process.stdout.write(JSON.stringify({sourceRevision,nativeMount,custodyProbeTemplate:built.custodyProbeTemplate})+'\n');
  }
  // Separate isolated staging namespace; never eligible artifact name/layout.
  const root=resolve(cwd,staging?'output/finite-native-staging':'output/finite-native-package');
  for(const [path,bytes] of Object.entries(built.files)){const target=resolve(root,path);await mkdir(resolve(target,'..'),{recursive:true});await writeFile(target,bytes);}
  if(staging){const evidence={...built,nativeMount};delete evidence.files;delete evidence.metafiles;evidence.candidateResidency={...built.candidateResidency};delete evidence.candidateResidency.content;await writeFile(resolve(root,'staging.json'),JSON.stringify(evidence,null,2)+'\n');}
 }
}
