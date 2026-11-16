// Tooling-only finite synthetic controls. No Miniflare, Source world, install or business IO.
import test,{after} from 'node:test';
import {createHash} from 'node:crypto';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const BASE='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68',BASE_TREE='62e78926635d6b74f288d6c0d69e0f2516306989';
const REPO='tokenizartinfo-ops/agent-friendly-web',BRANCH='refs/heads/lab/afw-c2-source-20261116-n2-parser-fix2',MESSAGE='AFW-C2-N2-PARSER-FIX2-ONEUSE-20261116',JOB='c2-n2-parser-fix2',PREFIX='docs/superpowers/source-lab/c2-n2-parser-fix2/';
const PINS={"oldReader":{"file":"n2-reader-old.mjs","bytes":19356,"sha256":"34b32c4634384d65df27f1f69fcd45c4b8f709ce8efbe92f7d169ec8d17052dc","blob":"09e1bd61a6f132d1a7d029535d4b34b67ef42524"},"reader":{"file":"n2-reader.mjs","bytes":19416,"sha256":"6cdc6569cff0676770f41ce4f794affe68c68ccbccb5cde154d513945b7bb849","blob":"280fa796ad74d4451cab3d84e230d37dd31bad11"},"oldControls":{"file":"n2-controls-old.mjs","bytes":13183,"sha256":"de52f5a2bd418e5ae96c5c126a71af5da7bc082f8a4076f8834dd1ffa54f7ec9","blob":"107ef2659bc23eb81f07d1441c5c9d1770d54458"},"controls":{"file":"n2-controls.mjs","bytes":13179,"sha256":"35d5367308cca0b18f9337194fa80fd38b698a0dc3c91fb275bfd2200b491980","blob":"e04c7649cec44f4e6a4e9b6287c938bc5c3811b3"},"logger":{"file":"n2-logger.mjs","bytes":8370,"sha256":"64f5bc4ae951d13a6ead8d2dc28b0b0ff13ffdcf01f3d621e17dab07203d865c","blob":"92420acc2306b62943ae80d14b889871c9a3957c"},"slot":{"file":"n2-slot.mjs","bytes":2072,"sha256":"d4a82b40841cc9277f3cdd1c1355f95fcd4e00cc283fa73d54266c08f982247a","blob":"6507ca2410ac27606f4996e97a91736c5e14b615"},"vectors":{"file":"synthetic-vectors.json","bytes":78151,"sha256":"cd4d4a0174be09c8dcae12c6a3b222de0d5f7151d2b0b94dd30f9caa5b6eedad","blob":"04b72e0d24b2841970cbab46223e98ae2cab0156"},"timeoutVectors":{"file":"timeout-vectors.json","bytes":162739,"sha256":"cb2480007dbf79968962c957d6dde7c2b103a8fca2a17280fd9d3f789083f97b","blob":"98ada8d8a67fa65d7e7b11bd26cc54f9397af3d9"}},IDS=["P2_ADMISSION","P2_NO_BASELINE_THROW","P2_BASELINE_NO_BEFORE_THROW","P2_NO_BASELINE_RETURN","P2_BASELINE_NO_BEFORE_RETURN","P2_OPEN_BEFORE_BASELINE","P2_OPEN_BASELINE","P2_GET_ENTER_PENDING","P2_GET_BODY_PENDING","P2_POST_ENTER_PENDING","P2_POST_BODY_PENDING","P2_SETTLED_FAILURE_PREFIX","P2_SETTLED_SUCCESS_PREFIX","P2_EXISTING_CONTROLS_OLD","P2_EXISTING_CONTROLS_NEW"];
const sha=x=>createHash('sha256').update(x).digest('hex');
const blob=x=>createHash('sha1').update('blob '+x.length+'\0').update(x).digest('hex');
const check=x=>{if(!x)throw Error('N2_PARSER_CONTROL_INVALID');};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const root=resolve(process.cwd()),here=dirname(fileURLToPath(import.meta.url));
const facts=IDS.map(id=>({id,status:'unobserved',code:'UNOBSERVED'})),vectorFacts=[];
let context=null,oldModule,newModule,oldControls,newControls,vectors,timeoutVectors,oldCounts=null,newCounts=null;
const run=(id,work)=>test(id,{timeout:10000},async()=>{const fact=facts.find(f=>f.id===id);try{await work();fact.status='pass';fact.code='OK';}catch{fact.status='fail';fact.code='CONTROL_INVALID';throw Error('N2_PARSER_CONTROL_INVALID');}});
function git(args){const env={PATH:'/usr/bin:/bin',HOME:process.env.RUNNER_TEMP??'/tmp',LANG:'C.UTF-8',LC_ALL:'C.UTF-8',GIT_CONFIG_NOSYSTEM:'1',GIT_CONFIG_GLOBAL:'/dev/null'};return execFileSync('git',args,{cwd:root,env,encoding:'utf8',timeout:5000,maxBuffer:65536,stdio:['ignore','pipe','pipe']}).trim();}
async function admitted(role){const p=PINS[role],b=await readFile(join(here,p.file));check(b.length===p.bytes&&sha(b)===p.sha256&&blob(b)===p.blob);return b;}
function invoke(module,input){
 const raw=Buffer.from(input.records.map(r=>JSON.stringify(r)+'\n').join(''));
 const observation=module.readObservation(raw,input.binding,input.condition,input.writerFault),native=structuredClone(input.native);
 const joined=module.nativeJoin(observation,native),witness=module.safeWitness(raw,input.binding,input.condition,input.writerFault);
 return {valid:observation.valid,code:observation.code,integrity:observation.integrity,joined,witness,native};
}
run('P2_ADMISSION',async()=>{
 check(process.argv.length===2&&process.version==='v22.23.4'&&root===resolve(process.env.GITHUB_WORKSPACE??'')&&here===resolve(root,PREFIX)&&process.env.GITHUB_REPOSITORY===REPO&&process.env.GITHUB_EVENT_NAME==='push'&&process.env.GITHUB_REF===BRANCH&&process.env.GITHUB_RUN_ATTEMPT==='1'&&process.env.GITHUB_JOB===JOB&&/^[1-9][0-9]*$/.test(process.env.GITHUB_RUN_ID??'')&&/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA??''));
 check(git(['rev-parse','HEAD'])===process.env.GITHUB_SHA&&git(['rev-parse','HEAD^'])===BASE&&git(['rev-parse',BASE+'^{tree}'])===BASE_TREE&&git(['show','-s','--format=%B','HEAD'])===MESSAGE);
 const tree=git(['rev-parse','HEAD^{tree}']);check(/^[a-f0-9]{40}$/.test(tree));
 const expectedPaths=[...Object.values(PINS).map(p=>PREFIX+p.file),PREFIX+'run-controls.mjs','.github/workflows/afw-c2-n2-parser-fix2.yml'].sort();
 check(same(git(['diff','--name-status',BASE,'HEAD']).split('\n').map(line=>{const [status,path,...extra]=line.split('\t');check(status==='A'&&extra.length===0);return path;}).sort(),expectedPaths));
 context={repository:REPO,baselineSource:BASE,baselineTree:BASE_TREE,head:process.env.GITHUB_SHA,parent:BASE,tree,runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:JOB,node:process.version};
 for(const role of Object.keys(PINS))await admitted(role);
 vectors=JSON.parse(await admitted('vectors'));timeoutVectors=JSON.parse(await admitted('timeoutVectors'));
 check(timeoutVectors.schema==='afw.c2-n2-parser-fix2.vectors.v1'&&timeoutVectors.syntheticOnly===true&&timeoutVectors.notSourceEvidence===true&&timeoutVectors.expectedCaseCount===12&&same(timeoutVectors.cases.map(c=>c.id),IDS.slice(1,-2)));
 oldModule=await import('./n2-reader-old.mjs');newModule=await import('./n2-reader.mjs');oldControls=await import('./n2-controls-old.mjs');newControls=await import('./n2-controls.mjs');
});
for(const id of IDS.slice(1,-2))run(id,async()=>{
 check(context&&oldModule&&newModule&&timeoutVectors);
 const input=timeoutVectors.cases.find(c=>c.id===id),expected=input.expected,result=invoke(newModule,input);
 check(result.valid===expected.valid&&result.code===expected.code&&result.joined===expected.joined);
 if(expected.valid)check(result.integrity===expected.integrity&&newModule.verifyWitness(result.witness)&&result.witness.records.length===input.records.length);
 else check(result.witness.integrity==='unknown'&&result.witness.records.length===0&&result.witness.prefixBytes===0);
 let oldAccepted=null,oldJoined=null;
 if(expected.old){const old=invoke(oldModule,input);oldAccepted=old.valid;oldJoined=old.joined;check(old.valid===expected.old.valid&&old.code===expected.old.code&&old.joined===expected.old.joined&&old.integrity===expected.old.integrity&&oldModule.verifyWitness(old.witness)&&old.witness.integrity==='prefix');}
 vectorFacts.push({id,valid:result.valid,code:result.code,integrity:result.integrity,joined:result.joined,oldAccepted,oldJoined});
});
run('P2_EXISTING_CONTROLS_OLD',async()=>{check(oldControls&&vectors);oldCounts=await oldControls.runControls(vectors);check(same(oldCounts,timeoutVectors.existingControlCounts));});
run('P2_EXISTING_CONTROLS_NEW',async()=>{check(newControls&&vectors);newCounts=await newControls.runControls(vectors);check(same(newCounts,timeoutVectors.existingControlCounts));});
after(async()=>{
 try{
 const all=!!context&&facts.every(f=>f.status==='pass')&&vectorFacts.length===12&&oldCounts!==null&&newCounts!==null;
 const bindings={...Object.fromEntries(Object.entries(PINS).map(([k,p])=>[k,p.sha256])),runnerHash:sha(await readFile(fileURLToPath(import.meta.url)))};
 const proof={schema:'afw.c2-n2-parser-fix2.proof.v1',context,bindings,cases:facts,vectors:vectorFacts,controlCounts:{old:oldCounts,new:newCounts},diagnosticToolingExecuted:true,sourceBusinessExecuted:false,toolingControlsPassed:all,SourceQualified:false,Task1Pass:false,nonclaims:{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}};
 const text=JSON.stringify(proof);if(Buffer.byteLength(text)+1>8192)throw Error('N2_PARSER_CONTROL_INVALID');
 await mkdir(join(root,'output'),{recursive:true});await writeFile(join(root,'output/c2-n2-parser-fix2.json'),text+'\n',{flag:'wx'});
 process.stdout.write('AFW_C2_N2_PARSER_FIX2_PROOF '+text+'\n');
 if(!all)throw Error('N2_PARSER_CONTROL_INVALID');
 }catch{process.stdout.write('AFW_C2_N2_PARSER_FIX2_FRONTIER '+JSON.stringify({code:'PROOF_INVALID'})+'\n');throw Error('N2_PARSER_CONTROL_INVALID');}
});
