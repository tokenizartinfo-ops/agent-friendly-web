// Root-gated tooling-only native graph. No npm, Miniflare or Source business request.
import test,{after as nativeAfter} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const REPO='tokenizartinfo-ops/agent-friendly-web',BASE='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68',TREE='62e78926635d6b74f288d6c0d69e0f2516306989';
const PREFIX='docs/superpowers/source-lab/c2-t1-notices-n3-firstlimit-w1-tool',JOB='c2-notices-n3-firstlimit-w1-tool',REF='refs/heads/lab/afw-c2-source-20261116-notices-n3-firstlimit-w1-tool',MESSAGE='AFW-C2-N3-FIRSTLIMIT-W1-TOOL-ONEUSE-20261116';
const INPUTS=[{"file":"n3-qa-ledger.mjs","bytes":17134,"sha256":"190523e50bf39c23190c895833d50ef40af069436b670f81fc5c6478e0bafe2b","blob":"68f1c25ee67fa63b7d83d64435923548040ca813"},{"file":"n3-qa-compiler.mjs","bytes":12699,"sha256":"d6b007ac9ad44b76a493f494d0b0c4a6a1180c18574a1f139e36c9a3abfa9dd2","blob":"6198cc0656ed66487e25abee67847190cf92d1b5"},{"file":"n3-unit-controls.mjs","bytes":21907,"sha256":"8bf6a9f33a46c15f24e04b89fd6b6068b8197cb4eb9aea42c41ce7b0a1916076","blob":"e987e103122b3318638d7a5e57bd6e41df81cd8d"},{"file":"n3-reader.mjs","bytes":31798,"sha256":"bdb227d557e058da7c7df3f5d7c2ff04663afaa09714c479a8f7e810634cd4c5","blob":"83b62b4dc84bdde7b1c7d343b328a3e3f09c0626"},{"file":"n3-trace-reader.mjs","bytes":11567,"sha256":"e4d7ca27660a979dcfc018f0585bdd0ae647e158c0792d0e49f72666580f1829","blob":"4878edb13dad6a9421c457cc850a370d75b84b1c"},{"file":"n3-core-controls.mjs","bytes":13179,"sha256":"fa77a9c7509d8645e78e913181a27fc4e556fd2f0e07dbf377b2965960371b95","blob":"ef73fa56b9b6dd9acacffbe25522f9e0e7ad2542"},{"file":"n3-trace-controls.mjs","bytes":854,"sha256":"ae170334b83432764f36e8ead26159207c3324f62b8d0c3ce46232795836f758","blob":"adff3fbc4649f95389b03896ff82bc7ed538c516"},{"file":"n3-logger.mjs","bytes":8370,"sha256":"e2fe1fd58cfe5c1959643c80a2efe6c3fa43982bde7b2da2b5ef06612e1fe6d3","blob":"4eeaad011444e566f2e0cc99bd897e4a01848a77"},{"file":"n3-slot.mjs","bytes":2072,"sha256":"d4a82b40841cc9277f3cdd1c1355f95fcd4e00cc283fa73d54266c08f982247a","blob":"6507ca2410ac27606f4996e97a91736c5e14b615"},{"file":"n3-vectors.json","bytes":915177,"sha256":"dcd3c592e568e046a837873609cdecd11dddf2d9bf5271788df2710f18db0cdf","blob":"ce6aa394580a0c26e5fe5c9006cafe06db109530"},{"file":"n3-reducer-vectors.json","bytes":43673,"sha256":"acb3cd09a2514fc92eaf9e9302e0bec6a2276151d857b53a2a888cbd2e68f2c9","blob":"8881c57552b88cd757579b6de120e1f4fca0304c"},{"file":"schema.json","bytes":29785,"sha256":"2e44cb86b98dd052a643b0d1ee157a7d072ddf2185895893067770758089e6eb","blob":"1c336fe190816b46223546971afcf34b2c216089"},{"file":"normal-lease.txt","bytes":2257,"sha256":"a5310b6f1ea8a34e173292b9e72ecf329840211985bdb043d5154b4d434bc03e","blob":"a9cc083baae71c89af2f6436c00571dc8e7a20c9"},{"file":"normal-op.txt","bytes":45576,"sha256":"fc227b59b3b5815eadffbd582f018cbd3e64ceaa596f07bc21a2031f7cd1d6e9","blob":"cfbfb1656d4a013b40e770ee8335d5e1eb85a908"},{"file":"normal-phase.txt","bytes":148547,"sha256":"02ee98da9239dd28948db664127c579ef69941e5e9c8151b1568527509815210","blob":"a9d70b416579e3ab6e8c5f02ec2a9b94227c43e5"},{"file":"normal-publication.txt","bytes":61073,"sha256":"2dc335761ac7f168532af37fd4128d2fc8b15c9b5b3072f377a9913e7b93829d","blob":"3e1d4c2695dce2d13ba064274ba441c4ce9447c3"},{"file":"normal-world.txt","bytes":88519,"sha256":"79a135fbc9897463b566624a4662946089b8b5fd25baeda368663ff65be3cdc7","blob":"9e7f89e3a0b5112323cd80a960daa03eb1f9e1b5"},{"file":"observer-world.txt","bytes":89873,"sha256":"7dc4442f09b8ced3a317237a3d9c746d4bc2082f097207907db519455c1849b9","blob":"a21a3614f0cd6b21ce37b99690043507ea105a23"},{"file":"contract.json","bytes":19539,"sha256":"d8260b4e7280d36416e6a1731fcc8135e381684508d22b7d0d9ad258dfb9f886","blob":"40e93f21d6564e2a0bbe9a4ace266d992a357718"},{"file":"seams.json","bytes":14141,"sha256":"d6e41eaf3f811a82eeb38f97f1c7e5aa0ab1ae081616e5b221e75ac09720e3b5","blob":"ac4b57435939d0d4c6c2d2d03086bc7ffd4d6640"},{"file":"n3-unfocused-routine-vectors.json","bytes":1325,"sha256":"6d2655b173310765608610e69b47d1b667bd27b83197678dded4dc66b53e660d","blob":"c26bdbaa9d94df8c1e3a3f281d631180023af020"},{"file":"fix2-vectors.json","bytes":23700,"sha256":"bfff8d3388ac157986677c79fa151582e9bd08929ccde54c1bf5f33175fad45b","blob":"7e4cae13603483c46e5e8ca7872290d00eb1de3a"},{"file":"tooling-fix2-contract.json","bytes":4291,"sha256":"db1ff3cc391800c0996b8e686c808534429dcfd0a1056e29f6306e70d498ec78","blob":"ae8c5d4984902f5b81e8016fa2fe4b548ba68d95"},{"file":"ph-anchor-audit.json","bytes":12743,"sha256":"e04ac361d61f80f7b1476c2843818373526c25af5c240776935c14d13c02e5fa","blob":"9b858f9bd542dcb2b56ac52f85af951e87afe685"},{"file":"n3-census-controls.mjs","bytes":10186,"sha256":"4554f4fe3021de40946fd4ff9352a20b8b1a1dfa41dda2727005f6262264a393","blob":"671579d000853ea8cbdf20d0a36d37264dd9cfc3"},{"file":"census-vectors.json","bytes":11850,"sha256":"979ac9aff672470252c7d79225025bac6462f88fc2c0ecd903c6ee8416237ba2","blob":"40938228fef16fb64f855cb3f3a2e41069222037"},{"file":"census-contract.json","bytes":9092,"sha256":"ff2a82520fb1cd69aa7d29f1a19a1df2ba00cb685be0847f16877537e222aa55","blob":"d255278df50c70f2b8f09b3b1ed217fa059e22dd"},{"file":"census-selection.json","bytes":3809,"sha256":"971776a9bdb14459d82eaceb649fe85565e3866d3be3fc9cccdeebcc7d8e8700","blob":"fb241bc06204e5d1401822ad92679ec20665391d"},{"file":"legacy-ledger.mjs","bytes":16602,"sha256":"b23473dd06df58cd7390207f5ba5a8100992957092711b57a52b0930b59d0bf1","blob":"d9d3a0af3b6f1e6738957f703e368f19852cdce8"},{"file":"r4-vectors.json","bytes":8496,"sha256":"6080058e4e855a4ba63efc49042a64b2731af2ac13c70b4b2d779874d06a781a","blob":"d21ab3437f7a8057ccc8c3bfa2c08c246464bad8"},{"file":"r4-controls.mjs","bytes":7350,"sha256":"6c2697673561162669ac724afd427025270e8b0a1d437140a5ba9505100f9eaa","blob":"5c37c0c7dfe1206241b8877571184a00fa799b62"},{"file":"before-red.mjs","bytes":1171,"sha256":"e123666909f47d95e03208890cb2adc808685d0b202e5b4089b001dba7029990","blob":"9746c641eef82bcfa57fd48bceec59267547ce19"},{"file":"r4-selection.json","bytes":5189,"sha256":"fbf76015ca498a2a73229b907c661ba0d6580da6ed1ac0ae73c9e846325297aa","blob":"870f0847593656cbf38b2b22695b29fb86124e98"},{"file":"w1-reader.mjs","bytes":33254,"sha256":"56abe20c95ba5d324a2b72da096b0caaad6f2f8f0e4c3f198c7db64eb7fa5d57","blob":"9b75551431c10362dc92c87dd9af41e87b8fb67d"},{"file":"w1-trace-reader.mjs","bytes":11825,"sha256":"868723b34cfcc1b8247279f02f5a20ab774dc8cf813d1b02337fdf039194d009","blob":"fbcf1427819146075f6b4736a5386bbdfc1f0fc2"},{"file":"w1-native-vectors.json","bytes":5368,"sha256":"19fb57d62a60d00845d1c4885cbdfca477b413c2c1f2ef7dc7355ba1f34ce3a7","blob":"58b14b6af5dddc78693a1fd313d42834049af103"},{"file":"first-limit-vectors.json","bytes":17556,"sha256":"be94a9381b937ab655e8a0bd652dc4d6bbe2f21b2449b23d49f609ad9a0efe26","blob":"bd8bfae45c75ce498aab5a6bbb7258cdec185e0a"},{"file":"w1-selection.json","bytes":2626,"sha256":"91490adc8fa64c654e4706cdbc7fe6c71596b4c323cc9788a5170a746afade07","blob":"c1601719648fc4992fe520ef051b89852a6216f5"},{"file":"calibration-ledger.mjs","bytes":17033,"sha256":"a034da7e1dfaeb020105fa2820a7b3f05f5d2791f4de267e1fba5a087077d177","blob":"59ad15b7fd23697645bfa928c2c6127386e18422"},{"file":"w1-controls.mjs","bytes":9600,"sha256":"03f39f3b2df679417fd35878cb4ac4b314b1b87813cf184f4c1c57a2421877bc","blob":"f9276823815d48f0fbc16ffd22a8d9dd0b5dba80"},{"file":"w1-schema.json","bytes":30988,"sha256":"3dd4d6e5757c789d284e75e5430774ed2d660a87339b8bfd77d628b3c22c6690","blob":"19378e2d858bfb1c60a6368fc614ebf1fad7c875"}],IDS=["N3_CORE_CONTROLS","N3_CAUSAL_LITERALS","N3_TIMEOUT_PREFIX_CONTROLS","N3_AXIS_LITERALS","N3_SCHEMA_SELECTION_CONSTS","N3_NOTE_SYNC_NO_RPC","N3_ORIGINAL_NULL","N3_ORIGINAL_UNDEFINED","N3_ORIGINAL_FALSE","N3_ORIGINAL_ZERO","N3_ORIGINAL_EMPTY_STRING","N3_ORIGINAL_OBJECT","N3_PROMISE_IDENTITY","N3_EXISTING_SETTLED_HANDLER","N3_ROOT_IDENTITY","N3_REALM_RESET","N3_CROSS_SCOPE_LEASE","N3_SHARED_PROMISE","N3_NULL_BOUND_REF","N3_PREBIND_GAP","N3_PAIR_FORK","N3_FIRST_TARGET_ONLY","N3_SCOPE_ERROR_A_CHILD_B","N3_REPEATED_CLOSE","N3_CUT_LATE_SETTLEMENT","N3_SINK_FAULT","N3_PRIVATE_CAP","N3_SNAPSHOT_CAP","N3_WORST_SIZE","N3_REPEATED_RETAIN_FIRST_OBSERVATION","N3_ABORT_NESTED_OBSERVER_ORDER","N3_BOUND_PAIR_COVERAGE","N3_PREPAIR_FAILURE_AND_UNBOUND","N3_ACTUAL_CHILD_ABORT_MATRIX","N3_ACTUAL_PARENT_ABORT_MATRIX","N3_NESTED_ABORT_ORDER","N3_UNREACHED_ACTIVATION","N3_ORIGINAL_RACE_AXES","N3_ORIGINAL_REDUCER_CALLBACKS","N3_REVERSIBLES","N3_MAX_ENVELOPE_SIZE","N3_CENSUS_ROOT17","N3_CENSUS_IDENTITY129","N3_CENSUS_GAP_PROMOTION_AT128","N3_CENSUS_PROBE_BEFORE_ELIGIBLE","N3_CENSUS_FRESH_GET_POST_BOUNDS","N3_CENSUS_REPEAT_AND_HONEST_CAP","R4_EXACT_RELEVANT","R4_OTHER_ERROR","R4_OTHER_CLEAN","R4_NO_BORROW_AND_STICKY","R4_VALIDATION","R4_BELOW_AND_DEFAULT","W1_ROOT16_FIRST_FAULT","W1_GAP_NEW128","W1_LEASE_NEW128","W1_LEGACY_SAME_GAP_CALIBRATION","W1_OTHER_PRIVATE_CUT","W1_PRECEDENCE_AND_DEFAULT","W1_EXISTING_PROBE_METHOD","W1_REPLAY_LITERAL_GRID","W1_COHERENT_PROFILE"];
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
let imported;try{imported=await Promise.all([import('./n3-core-controls.mjs'),import('./n3-trace-controls.mjs'),import('./n3-reader.mjs'),import('./n3-unit-controls.mjs'),import('./n3-qa-compiler.mjs'),import('./n3-census-controls.mjs'),import('./r4-controls.mjs'),import('./w1-controls.mjs')]);}catch{throw Error('N3_TOOLING_IMPORT_INVALID');}
const [{runControls},{runTraceControls},{readObservation,nativeJoin,n3TraceReplay,safeWitness,verifyWitness},{unitCases,runAxisCallback,runReducerCallbacks,readSetupPhase},{transformN3Phase,transformN3Entry},{censusCases,readCensusSetupPhase},{repairCases},{firstLimitCases}]=imported;
const vectors=JSON.parse(await readFile(new URL('./n3-vectors.json',import.meta.url),'utf8')),schema=JSON.parse(await readFile(new URL('./schema.json',import.meta.url),'utf8'));
const censusVectors=JSON.parse(await readFile(new URL('./census-vectors.json',import.meta.url),'utf8')),censusRows=new Map();
const repairRows=new Map(),firstLimitRows=new Map();
const beforeRed=JSON.parse(await readFile('output/r4-before.json','utf8'));
const beforeTap=JSON.parse(await readFile('output/r4-before-tap.json','utf8'));
assert.deepEqual(beforeRed,{"schema":"afw.c2-notices-n3.r4-before-red.v1","ledger":"d9d3a0af3b6f1e6738957f703e368f19852cdce8","rows":[{"id":"BEFORE_R4_EXACT_RELEVANT","code":"R4_EXACT_RELEVANT_EXPECTED_JOIN","observed":{"state":"unjoined","coverage":"unknown","reason":"CAP_PRIVATE","eligible":0,"target":"unknown","firstError":null,"events":[],"cut":null},"desired":{"state":"joined","coverage":"prefix","reason":"PREBIND_GAP","eligible":1,"firstError":null,"events":["scope-enter","snapshot-cut"],"cut":2}},{"id":"BEFORE_R4_OTHER_ERROR","code":"R4_OTHER_ERROR_EXPECTED_PREFIX","observed":{"state":"unjoined","coverage":"unknown","reason":"CAP_PRIVATE","eligible":1,"target":"unknown","firstError":null,"events":[],"cut":null},"desired":{"state":"joined","coverage":"prefix","reason":"PREBIND_GAP","eligible":1,"firstError":null,"events":["scope-enter","snapshot-cut"],"cut":2}},{"id":"BEFORE_R4_OTHER_CLEAN","code":"R4_OTHER_CLEAN_EXPECTED_COMPLETE","observed":{"state":"unjoined","coverage":"unknown","reason":"CAP_PRIVATE","eligible":1,"target":"unknown","firstError":null,"events":[],"cut":null},"desired":{"state":"joined","coverage":"complete","reason":"OK","eligible":1,"firstError":null,"events":["scope-enter","snapshot-cut"],"cut":2}}]});
assert.equal(beforeTap.head,context.head);assert.equal(beforeTap.runId,context.runId);
assert.equal(beforeTap.exitCode,1);assert.equal(beforeTap.tests,3);assert.equal(beforeTap.fail,3);
assert.equal(beforeTap.pass,0);assert.match(beforeTap.sha256,/^[0-9a-f]{64}$/);
assert.equal(censusVectors.cases.length,6);exactCensusIds();
function exactCensusIds(){assert.deepEqual(censusCases.map(x=>x[0]),IDS.slice(41,47));assert.deepEqual(censusVectors.ids,IDS.slice(0,47));}
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
 if(diagnosed.has(id)||diagnosed.size>=62)return;
 const phase=readSetupPhase(error)??readCensusSetupPhase(error)??(id==='N3_REVERSIBLES'?'reversibles':'case-body');
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
  const requireUnique=c=>{assert.equal(c.newRequired,1);assert.equal(c.newMatches,c.newRequired);};
  for(const c of fix.cases)requireUnique(c);
  let badOracleRejected=false;try{requireUnique({newMatches:2,newRequired:1});}catch{badOracleRejected=true;}assert(badOracleRejected);
  for(const c of fix.cases.slice(1)){const input=c.file.blob===fix.cases[0].file.blob?scope:await readFile(new URL('./normal-world.txt',import.meta.url),'utf8');assert.equal(input.split(c.oldNeedle).length-1,c.oldMatches);assert.equal(input.split(c.newNeedle).length-1,c.newRequired);assert.equal(c.newRequired,1);}
  const audit=fix.tableAudit;
  const checkPhaseAnchors=(source,mode)=>{
   const start=source.indexOf(handlerStart),end=source.indexOf(handlerEnd,start);assert(start>=0&&end>start);
   const handler=source.slice(start,end);
   for(const row of audit.raw){
    const input=row.scope==='global'?source:handler,count=input.split(row.needle).length-1;
    assert.equal(count,mode==='raw'?row.rawCount:row.preparedExpectedCount);
    if(row.id==='ACTIVATION'){assert.equal(count,2);let rejected=false;try{assert.equal(count,1);}catch{rejected=true;}assert(rejected);continue;} // historical nonunique selector is a negative, NEVER active
    if(row.id==='RAW_CATCH'||row.id==='PREPARED_CATCH'){assert.equal(count,row.id===(mode==='raw'?'RAW_CATCH':'PREPARED_CATCH')?1:0);continue;}
    assert.equal(row.required,1);assert.equal(count,row.required);
   }
  };
  for(const row of audit.preparer.anchors){assert.equal(row.count,1);assert.equal(raw.split(row.needle).length-1,1);}
  for(const row of audit.preparer.correlators){const matches=raw.split('\n').filter(line=>line.includes(row.first)&&line.includes(row.second));assert.equal(matches.length,1);assert(matches[0].endsWith('fail();'));}
  checkPhaseAnchors(raw,'raw');
  const repaired=transformN3Phase(raw);
  assert.equal(repaired.contents.split(clock).length-1,4);
  assert.equal(repaired.contents.slice(repaired.contents.indexOf(handlerEnd)),raw.slice(raw.indexOf(handlerEnd)));
  const upload='await withChild(async(l,end)=>{\n     await recheckOwned();await engine.readPointer(baseline,l);\n     ownUploadSend=sendFor(\'upload\',engine.describeUpload(uploadInput),end);';assert.equal(raw.split(upload).length-1,1);assert.equal(repaired.contents.split(upload).length-1,1); // all three later handlers unchanged byte-for-byte
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
  const normalPH=await readFile(new URL('./normal-phase.txt',import.meta.url),'utf8'),preparedPH=original.instrumentFirstConnection(normalPH,{mutation:null});
  checkPhaseAnchors(preparedPH,'prepared');const ph=transformN3Phase(preparedPH);
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
 ,...censusCases.map(([id,work],i)=>[id,async t=>{const vector=censusVectors.cases[i];assert.equal(vector.id,id);const observed=await work(t,vector);assert.equal(observed.id,id);censusRows.set(id,observed);}]),
 ...repairCases.map(([id,work])=>[id,async t=>{const observed=await work(t);assert.equal(observed.id,id);repairRows.set(id,observed);}]),
 ...firstLimitCases.map(([id,work])=>[id,async t=>{const observed=await work(t);assert.equal(observed.id,id);firstLimitRows.set(id,observed);}])
];
exact(jobs.map(x=>x[0]),IDS);
nativeAfter(async()=>{
 ended=true;
 const results=IDS.map(id=>rows.get(id)??{id,status:'unobserved',code:'UNOBSERVED'});
 const proof={schema:'afw.c2-notices-n3.r4-firstlimit-tool-proof.v1',context,inputHashes,ids:IDS,results,allToolingBodiesReturned:results.every(r=>r.status==='pass'),core,causal,reducer,census:IDS.slice(41,47).map(id=>censusRows.get(id)??{id,observation:null}),beforeRed,beforeTap,atomic:IDS.slice(47,53).map(id=>repairRows.get(id)??{id,observation:null}),firstLimits:IDS.slice(53).map(id=>firstLimitRows.get(id)??{id,observation:null}),diagnosticToolingExecuted:true,sourceBusinessExecuted:false,SourceQualified:false,Task1Pass:false,nonclaims:{historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}};
 const bytes=JSON.stringify(proof)+'\n';if(Buffer.byteLength(bytes)>24576)throw Error('N3_TOOLING_PROOF_LIMIT');
 await mkdir('output',{recursive:true});await writeFile('output/c2-notices-n3-firstlimit-w1-tool.json',bytes,{flag:'wx'});
 process.stdout.write('AFW_C2_N3_TOOLING_PROOF '+bytes);
});
for(const [id,work]of jobs)test(id,{timeout:10000},async t=>{
 try{await work(t);if(!ended)rows.set(id,{id,status:'pass',code:'OK'});}
 catch(error){diagnose(id,error);if(!ended)rows.set(id,{id,status:'fail',code:'CONTROL_INVALID'});throw Error('N3_TOOLING_CONTROL_INVALID');}
});
