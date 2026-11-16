// Root-gated tooling-only native graph. No npm, Miniflare or Source business request.
import test,{after as nativeAfter} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const REPO='tokenizartinfo-ops/agent-friendly-web',BASE='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68',TREE='62e78926635d6b74f288d6c0d69e0f2516306989';
const PREFIX='docs/superpowers/source-lab/c2-t1-notices-n3-controls-fix1',JOB='c2-notices-n3-controls-fix1',REF='refs/heads/lab/afw-c2-source-20261116-notices-n3-controls-fix1',MESSAGE='AFW-C2-N3-CONTROLS-FIX1-ONEUSE-20261116';
const INPUTS=[{"file":"n3-qa-ledger.mjs","bytes":16602,"sha256":"b23473dd06df58cd7390207f5ba5a8100992957092711b57a52b0930b59d0bf1","blob":"d9d3a0af3b6f1e6738957f703e368f19852cdce8"},{"file":"n3-qa-compiler.mjs","bytes":12498,"sha256":"6eadf1ace39751e61a196c7180205b021aa5f703cbc6d1a8d26e6fa4959d9cfc","blob":"3652e73d858a0958aaf50f34781043d6c910717f"},{"file":"n3-unit-controls.mjs","bytes":21884,"sha256":"72b202db49738c95ffa07af7d6d8d3d58ded0b4850e1a346c5e2d95cff0f48db","blob":"f8fc10631071207af883c34d25eff4f472862d61"},{"file":"n3-reader.mjs","bytes":31798,"sha256":"bdb227d557e058da7c7df3f5d7c2ff04663afaa09714c479a8f7e810634cd4c5","blob":"83b62b4dc84bdde7b1c7d343b328a3e3f09c0626"},{"file":"n3-trace-reader.mjs","bytes":11567,"sha256":"e4d7ca27660a979dcfc018f0585bdd0ae647e158c0792d0e49f72666580f1829","blob":"4878edb13dad6a9421c457cc850a370d75b84b1c"},{"file":"n3-core-controls.mjs","bytes":13179,"sha256":"fa77a9c7509d8645e78e913181a27fc4e556fd2f0e07dbf377b2965960371b95","blob":"ef73fa56b9b6dd9acacffbe25522f9e0e7ad2542"},{"file":"n3-trace-controls.mjs","bytes":854,"sha256":"ae170334b83432764f36e8ead26159207c3324f62b8d0c3ce46232795836f758","blob":"adff3fbc4649f95389b03896ff82bc7ed538c516"},{"file":"n3-logger.mjs","bytes":8370,"sha256":"e2fe1fd58cfe5c1959643c80a2efe6c3fa43982bde7b2da2b5ef06612e1fe6d3","blob":"4eeaad011444e566f2e0cc99bd897e4a01848a77"},{"file":"n3-slot.mjs","bytes":2072,"sha256":"d4a82b40841cc9277f3cdd1c1355f95fcd4e00cc283fa73d54266c08f982247a","blob":"6507ca2410ac27606f4996e97a91736c5e14b615"},{"file":"n3-vectors.json","bytes":915177,"sha256":"dcd3c592e568e046a837873609cdecd11dddf2d9bf5271788df2710f18db0cdf","blob":"ce6aa394580a0c26e5fe5c9006cafe06db109530"},{"file":"n3-reducer-vectors.json","bytes":43673,"sha256":"acb3cd09a2514fc92eaf9e9302e0bec6a2276151d857b53a2a888cbd2e68f2c9","blob":"8881c57552b88cd757579b6de120e1f4fca0304c"},{"file":"schema.json","bytes":29785,"sha256":"2e44cb86b98dd052a643b0d1ee157a7d072ddf2185895893067770758089e6eb","blob":"1c336fe190816b46223546971afcf34b2c216089"},{"file":"normal-lease.txt","bytes":2257,"sha256":"a5310b6f1ea8a34e173292b9e72ecf329840211985bdb043d5154b4d434bc03e","blob":"a9cc083baae71c89af2f6436c00571dc8e7a20c9"},{"file":"normal-op.txt","bytes":45576,"sha256":"fc227b59b3b5815eadffbd582f018cbd3e64ceaa596f07bc21a2031f7cd1d6e9","blob":"cfbfb1656d4a013b40e770ee8335d5e1eb85a908"},{"file":"normal-phase.txt","bytes":148547,"sha256":"02ee98da9239dd28948db664127c579ef69941e5e9c8151b1568527509815210","blob":"a9d70b416579e3ab6e8c5f02ec2a9b94227c43e5"},{"file":"normal-publication.txt","bytes":61073,"sha256":"2dc335761ac7f168532af37fd4128d2fc8b15c9b5b3072f377a9913e7b93829d","blob":"3e1d4c2695dce2d13ba064274ba441c4ce9447c3"},{"file":"normal-world.txt","bytes":88519,"sha256":"79a135fbc9897463b566624a4662946089b8b5fd25baeda368663ff65be3cdc7","blob":"9e7f89e3a0b5112323cd80a960daa03eb1f9e1b5"},{"file":"observer-world.txt","bytes":89873,"sha256":"7dc4442f09b8ced3a317237a3d9c746d4bc2082f097207907db519455c1849b9","blob":"a21a3614f0cd6b21ce37b99690043507ea105a23"},{"file":"contract.json","bytes":19539,"sha256":"d8260b4e7280d36416e6a1731fcc8135e381684508d22b7d0d9ad258dfb9f886","blob":"40e93f21d6564e2a0bbe9a4ace266d992a357718"},{"file":"seams.json","bytes":14141,"sha256":"d6e41eaf3f811a82eeb38f97f1c7e5aa0ab1ae081616e5b221e75ac09720e3b5","blob":"ac4b57435939d0d4c6c2d2d03086bc7ffd4d6640"},{"file":"n3-unfocused-routine-vectors.json","bytes":1325,"sha256":"6d2655b173310765608610e69b47d1b667bd27b83197678dded4dc66b53e660d","blob":"c26bdbaa9d94df8c1e3a3f281d631180023af020"},{"file":"fix2-vectors.json","bytes":8830,"sha256":"af6a04728a9ebc12908fa52d275e0d290e3efcdac82dcd8f602aa38d1009b41a","blob":"905dddca73b4a423bac3d6bf036ef0ca214605c4"},{"file":"tooling-fix1-contract.json","bytes":4848,"sha256":"b0cf936da09b2121d480b7f82460464fc29715ae3e76956334e800867addbaae","blob":"e02737a1626d3487f5a32e19e6ef6a7d04c8866e"}],IDS=["N3_CORE_CONTROLS","N3_CAUSAL_LITERALS","N3_TIMEOUT_PREFIX_CONTROLS","N3_AXIS_LITERALS","N3_SCHEMA_SELECTION_CONSTS","N3_NOTE_SYNC_NO_RPC","N3_ORIGINAL_NULL","N3_ORIGINAL_UNDEFINED","N3_ORIGINAL_FALSE","N3_ORIGINAL_ZERO","N3_ORIGINAL_EMPTY_STRING","N3_ORIGINAL_OBJECT","N3_PROMISE_IDENTITY","N3_EXISTING_SETTLED_HANDLER","N3_ROOT_IDENTITY","N3_REALM_RESET","N3_CROSS_SCOPE_LEASE","N3_SHARED_PROMISE","N3_NULL_BOUND_REF","N3_PREBIND_GAP","N3_PAIR_FORK","N3_FIRST_TARGET_ONLY","N3_SCOPE_ERROR_A_CHILD_B","N3_REPEATED_CLOSE","N3_CUT_LATE_SETTLEMENT","N3_SINK_FAULT","N3_PRIVATE_CAP","N3_SNAPSHOT_CAP","N3_WORST_SIZE","N3_REPEATED_RETAIN_FIRST_OBSERVATION","N3_ABORT_NESTED_OBSERVER_ORDER","N3_BOUND_PAIR_COVERAGE","N3_PREPAIR_FAILURE_AND_UNBOUND","N3_ACTUAL_CHILD_ABORT_MATRIX","N3_ACTUAL_PARENT_ABORT_MATRIX","N3_NESTED_ABORT_ORDER","N3_UNREACHED_ACTIVATION","N3_ORIGINAL_RACE_AXES","N3_ORIGINAL_REDUCER_CALLBACKS","N3_REVERSIBLES","N3_MAX_ENVELOPE_SIZE"];
const sha=b=>createHash('sha256').update(b).digest('hex'),gitBlob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
const fail=()=>{throw Error('N3_TOOLING_ADMISSION_INVALID');};
const git=args=>execFileSync('git',args,{encoding:'utf8',maxBuffer:1048576,timeout:10000,env:{PATH:process.env.PATH,HOME:process.env.RUNNER_TEMP,LANG:'C.UTF-8',LC_ALL:'C.UTF-8'}}).trim();
const context=(()=>{
 if(process.version!=='v22.23.4'||process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_EVENT_NAME!=='push'||process.env.GITHUB_REF!==REF||process.env.GITHUB_JOB!==JOB||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]*$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA??'')||resolve(process.cwd())!==resolve(process.env.GITHUB_WORKSPACE??'')||fileURLToPath(import.meta.url)!==join(resolve(process.cwd()),PREFIX,'run-controls.mjs'))fail();
 if(git(['rev-parse','HEAD'])!==process.env.GITHUB_SHA||git(['rev-parse','HEAD^'])!==BASE||git(['rev-parse',BASE+'^{tree}'])!==TREE||git(['show','-s','--format=%B','HEAD'])!==MESSAGE)fail();
 return {repository:REPO,baselineSource:BASE,baselineTree:TREE,head:process.env.GITHUB_SHA,tree:git(['rev-parse','HEAD^{tree}']),runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:JOB,node:process.version};
})();
const inputHashes=[];
for(const p of INPUTS){
 const b=await readFile(new URL('./'+p.file,import.meta.url));
 if(b.length!==p.bytes||sha(b)!==p.sha256||gitBlob(b)!==p.blob)fail();
 inputHashes.push({file:p.file,bytes:b.length,sha256:sha(b)});
}
let imported;try{imported=await Promise.all([import('./n3-core-controls.mjs'),import('./n3-trace-controls.mjs'),import('./n3-reader.mjs'),import('./n3-unit-controls.mjs'),import('./n3-qa-compiler.mjs')]);}catch{throw Error('N3_TOOLING_IMPORT_INVALID');}
const [{runControls},{runTraceControls},{readObservation,nativeJoin,n3TraceReplay,safeWitness,verifyWitness},{unitCases,runAxisCallback,runReducerCallbacks,readSetupPhase},{transformN3Phase,transformN3Entry}]=imported;
const vectors=JSON.parse(await readFile(new URL('./n3-vectors.json',import.meta.url),'utf8')),schema=JSON.parse(await readFile(new URL('./schema.json',import.meta.url),'utf8'));
let core=null,causal=null,reducer=null,ended=false;
const rows=new Map();
const exact=(a,b)=>assert.equal(JSON.stringify(a),JSON.stringify(b));

const DIAGNOSTIC_MARKER='AFW_C2_N3_TOOLING_DIAGNOSTIC ',DIAGNOSTIC_PHASES=['fixture-read','ledger-import','lease-transform','lease-import','op-transform','root-import','phase-transform','root-setup','case-body','reversibles'],diagnosed=new Set();
function parseDiagnostic(line){
 if(typeof line!=='string'||Buffer.byteLength(line)>256||!line.startsWith(DIAGNOSTIC_MARKER)||!line.endsWith('\n'))return null;
 let value;try{value=JSON.parse(line.slice(DIAGNOSTIC_MARKER.length,-1));}catch{return null;}
 if(!value||typeof value!=='object'||Array.isArray(value)||JSON.stringify(Object.keys(value))!==JSON.stringify(['schema','id','phase','code'])||value.schema!=='afw.c2-notices-n3.tooling-diagnostic.v1'||!IDS.includes(value.id)||!DIAGNOSTIC_PHASES.includes(value.phase)||value.code!=='CONTROL_INVALID'||DIAGNOSTIC_MARKER+JSON.stringify(value)+'\n'!==line)return null;
 return value;
}
function diagnose(id,error){
 if(diagnosed.has(id)||diagnosed.size>=41)return;
 const phase=readSetupPhase(error)??(id==='N3_REVERSIBLES'?'reversibles':'case-body');
 const line=DIAGNOSTIC_MARKER+JSON.stringify({schema:'afw.c2-notices-n3.tooling-diagnostic.v1',id,phase,code:'CONTROL_INVALID'})+'\n';
 if(!parseDiagnostic(line))return;diagnosed.add(id);process.stderr.write(line);
}
const jobs=[
 ['N3_CORE_CONTROLS',async()=>{core=await runControls(vectors.core);exact(core,{accepted:6,rejected:21,probeChecks:3,roundtrips:6,witnessRejected:2,slotChecks:5,guardAccepted:3,guardRejected:7,guardTransitions:6,invarianceChecks:10,guardRecordRejected:12});}],
 ['N3_CAUSAL_LITERALS',async()=>{causal=runTraceControls(vectors.causal);exact(causal,{accepted:31,rejected:32});}],
 ['N3_TIMEOUT_PREFIX_CONTROLS',async()=>{assert.equal(vectors.timeout.cases.length,12);for(const c of vectors.timeout.cases){const raw=Buffer.from(c.records.map(r=>JSON.stringify(r)+'\n').join('')),r=readObservation(raw,c.binding,c.condition,c.writerFault);assert.equal(r.valid,c.expected.valid);assert.equal(r.code,c.expected.code);assert.equal(r.integrity,c.expected.integrity);assert.equal(nativeJoin(r,c.native),c.expected.joined);}}],
 ['N3_AXIS_LITERALS',async()=>{for(const c of [...vectors.axes.positives,...vectors.axes.negatives])assert.equal(n3TraceReplay(c.snapshot).valid,c.expected==='accept');assert.equal(vectors.axes.positives.length,3);assert.equal(vectors.axes.negatives.length,3);}],
 ['N3_SCHEMA_SELECTION_CONSTS',async()=>{const top=schema.properties.selectionHash.const,binding=schema.properties.journal.properties.witness.properties.records.items.oneOf[0].properties.selectionHash.const;const current='fa42fdb50fd0b3a04e1cdfe903a8de56bdb0ddf4e51cbbd5f570895a6bfcff8c';assert.equal(top,current);assert.equal(binding,current);for(const c of vectors.selectionFix.cases){const actual=c.pointer==='/properties/selectionHash'?top:binding;assert.equal(c.input===actual,c.newExpected);assert.equal(c.input===c.oldConst,c.oldModelAccepts);}}],
 ...unitCases,
 ['N3_ORIGINAL_RACE_AXES',runAxisCallback],
 ['N3_ORIGINAL_REDUCER_CALLBACKS',async t=>{reducer=await runReducerCallbacks(t);}],
 ['N3_REVERSIBLES',async()=>{
  const fix=JSON.parse(await readFile(new URL('./fix2-vectors.json',import.meta.url),'utf8'));
  assert.equal(fix.cases.length,5);
  for(const c of fix.diagnosticCases)assert.equal(parseDiagnostic(c.line)!==null,c.expected);
  let getter=0;const forged=Object.defineProperty({},'n3SetupPhase',{enumerable:true,get(){getter++;throw Error('FORBIDDEN_ACCESSOR');}});
  assert.equal(readSetupPhase(forged),null);assert.equal(getter,0);
  for(const id of IDS)for(const phase of DIAGNOSTIC_PHASES){const line=DIAGNOSTIC_MARKER+JSON.stringify({schema:'afw.c2-notices-n3.tooling-diagnostic.v1',id,phase,code:'CONTROL_INVALID'})+'\n';assert(Buffer.byteLength(line)<=256);assert(parseDiagnostic(line));}
  const handlerStart='export async function handlePrivateQaFiniteOwnerChoice(',handlerEnd='/** Fixed unmounted QA implementation.',clock=fix.cases[0].oldNeedle;
  const raw=await readFile(new URL('./normal-phase.txt',import.meta.url),'utf8'),scope=raw.slice(raw.indexOf(handlerStart),raw.indexOf(handlerEnd,raw.indexOf(handlerStart)));
  assert.equal(raw.split(clock).length-1,4);assert.equal(scope.split(clock).length-1,1);
  for(const c of fix.cases.slice(1)){const input=c.file.blob===fix.cases[0].file.blob?scope:await readFile(new URL('./normal-world.txt',import.meta.url),'utf8');assert.equal(input.split(c.oldNeedle).length-1,c.oldMatches);assert.equal(input.split(c.newNeedle).length-1,c.newMatches);}
  const repaired=transformN3Phase(raw);
  assert.equal(repaired.contents.split(clock).length-1,4);
  assert.equal(repaired.contents.slice(repaired.contents.indexOf(handlerEnd)),raw.slice(raw.indexOf(handlerEnd))); // all three later handlers unchanged byte-for-byte
  for(const damaged of [raw.replace(handlerStart,'MISSING_HANDLER('),raw.replace(handlerEnd,'MISSING_END'),raw+'\n'+handlerStart]){let rejected=false;try{transformN3Phase(damaged);}catch{rejected=true;}assert(rejected);}
  const reverse=(source,edits)=>{for(const e of [...edits].reverse()){if(e.at==='prefix'){assert(source.startsWith(e.after));source=source.slice(e.after.length);}else{assert.equal(source.split(e.after).length,2);source=source.replace(e.after,()=>e.before);}}return source;};
  const {transformN3Lease,transformN3Op}=await import('./n3-qa-compiler.mjs');
  for(const [file,transform]of [['normal-lease.txt',transformN3Lease],['normal-op.txt',transformN3Op],['normal-phase.txt',transformN3Phase]]){
   const before=await readFile(new URL('./'+file,import.meta.url),'utf8'),result=transform(before);assert.equal(reverse(result.contents,result.edits),before);
  }
  const publication=await readFile(new URL('./normal-publication.txt',import.meta.url),'utf8'),method=publication.split('\n').find(x=>x.startsWith(' async firstConnectionProbe(){')).trim(),entry=transformN3Entry(method);assert.equal(reverse(entry.contents,entry.edits),method);
  const oldWorld=await readFile(new URL('./normal-world.txt',import.meta.url),'utf8'),newWorld=await readFile(new URL('./observer-world.txt',import.meta.url),'utf8');
  const originalTransform=publication.slice(publication.indexOf('export function instrumentFirstConnection(source,'),publication.indexOf('export function instrumentFirstConnectionEngine(source)'));
  assert(originalTransform.startsWith('export function instrumentFirstConnection(source,'));
  const original=await import('data:text/javascript;base64,'+Buffer.from("import assert from 'node:assert/strict';\n"+originalTransform).toString('base64'));
  const normalPH=await readFile(new URL('./normal-phase.txt',import.meta.url),'utf8'),preparedPH=original.instrumentFirstConnection(normalPH,{mutation:null}),ph=transformN3Phase(preparedPH);
  assert.equal(reverse(ph.contents,ph.edits),preparedPH);
  const prepareStart=oldWorld.indexOf("   const holder='holders();const at=Date.now()'"),prepareEnd=oldWorld.indexOf("   sources.set('mcp-qa-finite-initial-lease.mjs',lease);",prepareStart);
  assert(prepareStart>=0&&prepareEnd>prepareStart);
  const originalLeaseTransform=await import('data:text/javascript;base64,'+Buffer.from("import assert from 'node:assert/strict';\nexport function prepare(lease){\n"+oldWorld.slice(prepareStart,prepareEnd)+"\nreturn lease;}").toString('base64'));
  const normalLease=await readFile(new URL('./normal-lease.txt',import.meta.url),'utf8'),preparedLease=originalLeaseTransform.prepare(normalLease),lease=transformN3Lease(preparedLease);
  assert.equal(reverse(lease.contents,lease.edits),preparedLease);

  const mline=s=>s.split('\n').filter(x=>x.includes("mark('M-compile-start')")||x.includes('const program=firstCandidate?.program')).join('\n');
  assert.equal(mline(newWorld),mline(oldWorld));assert.equal(newWorld.split('const built=await build(').length,2);
 }],
 ['N3_MAX_ENVELOPE_SIZE',async()=>{
  const max=vectors.reducer.cases.map(x=>x.expected).sort((a,b)=>Buffer.byteLength(JSON.stringify(b))-Buffer.byteLength(JSON.stringify(a)))[0];
  const record={sequence:128,elapsedMs:180000,kind:'causal',schema:'afw.c2-notices-n3.causal-record.v1',snapshot:max};
  assert(Buffer.byteLength(JSON.stringify(record)+'\n')<=6144);
  const records=structuredClone(vectors.core.base.records),at=records.findIndex(r=>r.kind==='causal');
  assert(at>=0);records[at]={...records[at],snapshot:max};
  const guardAt=records.findIndex(r=>r.kind==='http'&&r.operation==='notices-post'&&r.edge==='response');
  const guards=Array.from({length:8},(_,i)=>({sequence:0,elapsedMs:0,kind:'guard',guardSequence:i+1,tag:'initial-parent-clock',window:'notices-post',closed:false,aborted:false,alive:null,wallExpired:false,monoExpired:false,wallRegressed:false,monoRegressed:false,correlated:null}));
  records.splice(guardAt,0,...guards);records.at(-1).newGuards=8;
  records.forEach((r,i)=>{r.sequence=i+1;r.elapsedMs=180000-records.length+i;});
  const journal=Buffer.from(records.map(r=>JSON.stringify(r)+'\n').join(''));
  assert(records.length<=128);assert(journal.length<=32768);
  const observation=readObservation(journal,vectors.core.binding,'normal',false),witness=safeWitness(journal,vectors.core.binding,'normal',false);
  assert(observation.valid);assert(verifyWitness(witness));assert.equal(witness.records.length,records.length);assert.equal(witness.prefixSha256,sha(journal));
  const d={bytes:33554432,sha256:'a'.repeat(64)},inputs=['ledger','PH','OP','LEASE','STDIN'].map((id,i)=>({id,before:i?{...d,sha256:'b'.repeat(64)}:null,after:{...d}}));
  const compilation={M:{...d,argumentMatched:true},QA:{...d,deliberatelyChanged:true,inputManifestHash:sha(JSON.stringify(inputs)),inputs}};
  const cx={repository:REPO,baselineSource:BASE,baselineTree:TREE,proposalIndexHash:'a'.repeat(64),head:'b'.repeat(40),tree:'c'.repeat(40),runId:'9'.repeat(20),runAttempt:1,job:'c2-notices-n3',node:'v22.23.4'};
  const bindings=Object.fromEntries(['driverHash','helperHash','readerHash','slotHash','fixtureHash','vectorsHash','loggerHash','worldHash','ledgerHash','transformHash','producerManifestHash'].map(k=>[k,'d'.repeat(64)]));
  const custody={schema:'afw.c2-notices-n3.custody.v1',context:{head:cx.head,runId:cx.runId,runAttempt:1,job:cx.job,proposalIndexHash:cx.proposalIndexHash},parentNonRoot:true,preflightOwned:true,preflightRemoved:true,checkedLaunches:3,checkedProcesses:24,uidGidGroupsLoopbackMatched:true,ownRootVerified:true,ownTempRemoved:true};
  const outcome={schema:'afw.c2-notices-n3.observation.v1',context:cx,selectionHash:'fa42fdb50fd0b3a04e1cdfe903a8de56bdb0ddf4e51cbbd5f570895a6bfcff8c',bindings,controls:{...core,vectorsHash:'e'.repeat(64),causal:{accepted:31,rejected:32}},capture:{exitCode:0,signal:'none',errorKind:'none',stdout:{bytes:1048576,sha256:'f'.repeat(64)},stderr:{bytes:65536,sha256:'f'.repeat(64)}},journal:{bytes:journal.length,sha256:sha(journal),stable:true,recorderFaultObserved:false,witness},observation,native:{integrity:'complete',cases:vectors.core.base.native,sourceFileFailure:false},custody,compilation,diagnosticToolingExecuted:true,sourceBusinessExecuted:true,SourceQualified:false,Task1Pass:false,nonclaims:{historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}};
  assert(Buffer.byteLength(JSON.stringify(outcome)+'\n')<=24576);
 }]
];
exact(jobs.map(x=>x[0]),IDS);
nativeAfter(async()=>{
 ended=true;
 const results=IDS.map(id=>rows.get(id)??{id,status:'unobserved',code:'UNOBSERVED'});
 const proof={schema:'afw.c2-notices-n3.tooling-proof.v1',context,inputHashes,ids:IDS,results,allToolingBodiesReturned:results.every(r=>r.status==='pass'),core,causal,reducer,diagnosticToolingExecuted:true,sourceBusinessExecuted:false,SourceQualified:false,Task1Pass:false,nonclaims:{historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}};
 const bytes=JSON.stringify(proof)+'\n';if(Buffer.byteLength(bytes)>24576)throw Error('N3_TOOLING_PROOF_LIMIT');
 await mkdir('output',{recursive:true});await writeFile('output/c2-notices-n3-tooling.json',bytes,{flag:'wx'});
 process.stdout.write('AFW_C2_N3_TOOLING_PROOF '+bytes);
});
for(const [id,work]of jobs)test(id,{timeout:10000},async t=>{
 try{await work(t);if(!ended)rows.set(id,{id,status:'pass',code:'OK'});}
 catch(error){diagnose(id,error);if(!ended)rows.set(id,{id,status:'fail',code:'CONTROL_INVALID'});throw Error('N3_TOOLING_CONTROL_INVALID');}
});
