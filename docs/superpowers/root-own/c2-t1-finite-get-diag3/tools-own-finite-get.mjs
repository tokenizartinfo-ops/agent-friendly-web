import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,dirname,relative,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {inflateRawSync} from 'node:zlib';
import {execFileSync} from 'node:child_process';

const PREFIX='docs/superpowers/root-own/c2-t1-finite-get-diag3/';
const GRAPH_SHA='41fbed67bad14bb9157e05b1445179ff829036fb167b6f856d67e940fd8ef1ee';
const ROOT=resolve(process.env.GITHUB_WORKSPACE||'.'),SELF=fileURLToPath(import.meta.url);
const hash=x=>createHash('sha256').update(x).digest('hex');
const gitHash=x=>createHash('sha1').update(Buffer.from('blob '+x.length+'\0')).update(x).digest('hex');
const git=(...args)=>execFileSync('git',args,{cwd:ROOT,encoding:'utf8',timeout:5000,maxBuffer:4194304}).trim();
const safePath=path=>{const p=resolve(ROOT,path);assert(p.startsWith(ROOT+sep));return p;};
const read=path=>readFileSync(safePath(path));
const startedUTC=new Date().toISOString();
assert.equal(process.version,'v22.23.4');assert.equal(process.platform,'linux');
assert.equal(process.env.GITHUB_ACTIONS,'true');
assert.equal(process.env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');
assert.equal(process.env.GITHUB_EVENT_NAME,'push');
assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1');
assert(/^[1-9][0-9]*$/.test(process.env.GITHUB_RUN_ID||''));
const graphBytes=read(PREFIX+'native-graph.json');assert.equal(hash(graphBytes),GRAPH_SHA);
const graph=JSON.parse(graphBytes.toString('utf8')),nom=graph.nomination;
assert.equal(process.env.GITHUB_REF,'refs/heads/'+nom.branch);
assert.equal(process.env.GITHUB_JOB,nom.job);
assert.equal(process.env.GITHUB_WORKFLOW_REF,'tokenizartinfo-ops/agent-friendly-web/'+nom.workflow+'@refs/heads/'+nom.branch);
const head=git('rev-parse','HEAD'),tree=git('rev-parse','HEAD^{tree}');
assert(/^[0-9a-f]{40}$/.test(head)&&/^[0-9a-f]{40}$/.test(tree));
assert.equal(process.env.GITHUB_SHA,head);assert.equal(git('show','-s','--format=%B','HEAD'),nom.message);
assert.deepEqual(git('rev-list','--parents','-n','1','HEAD').split(' '),[head,'6791ce1bab9372e206d3c7b42b3e1394dc6e0c68']);
assert.equal(relative(ROOT,SELF).split(sep).join('/'),nom.runner);
assert.equal(graph.files.length,93);
const files=new Map();
for(const e of graph.files){
 assert(!files.has(e.path));assert(e.path.startsWith('docs/superpowers/root-own/')||e.path===nom.workflow);
 const body=read(e.path);assert.equal(body.length,e.bytes);assert.equal(hash(body),e.sha256);assert.equal(gitHash(body),e.blob);
 assert.equal(e.mode,'100644');assert.equal(e.type,'blob');files.set(e.path,body);
}
const treeRows=git('ls-tree','-r','HEAD','--',...graph.files.map(e=>e.path)).split('\n');
const treeMap=new Map(treeRows.map(line=>{const m=/^(100644) blob ([0-9a-f]{40})\t(.+)$/.exec(line);assert(m);return[m[3],m[2]];}));
assert.equal(treeMap.size,graph.files.length);
for(const e of graph.files)assert.equal(treeMap.get(e.path),e.blob);
const selection=JSON.parse(files.get(PREFIX+'selection.json').toString('utf8'));
const schema=JSON.parse(files.get(PREFIX+'proof-schema.json').toString('utf8'));
assert.equal(selection.fixtures.length,73);assert.equal(selection.groups.length,8);
assert.equal(new Set(selection.fixtures.map(f=>f.id)).size,73);
assert.deepEqual(selection.groups.map(g=>g.id),[
 'FG3_OWN_D2_COMPAT','FG3_OWN_FINITE_GET_KNOWN','FG3_OWN_FINITE_GET_INDEPENDENCE','FG3_OWN_FINITE_GET_POINTERS',
 'FG3_OWN_FINITE_GET_VISIBLE_BLOCKERS','FG3_OWN_FINITE_GET_STREAM_CONSISTENCY','FG3_OWN_FINITE_GET_WIRE','FG3_OWN_FINITE_GET_CALLER_BINDING'
]);
const {runEvaluation}=await import('./controls.mjs');
const {gSchema}=await import('./legacy/shape.mjs');
const results=new Map(),physicalIds=[],nativeIds=[];let failed=false;
for(const group of selection.groups){
 await test(group.id,{timeout:10000,concurrency:false},()=>{
  try{
   for(const id of group.cases){
    const begin=process.hrtime.bigint(),entry=selection.fixtures.find(f=>f.id===id);
    assert(entry&&entry.group===group.id);assert(!results.has(id));
    const fixture=JSON.parse(files.get(entry.path).toString('utf8'));assert.equal(fixture.id,id);
    const actual=runEvaluation(fixture,entry.family,hash,(bytes,options)=>inflateRawSync(bytes,options));
    assert.equal(actual.id,id);results.set(id,actual);physicalIds.push(id);
    assert(process.hrtime.bigint()-begin<=10000000000n);
   }
   nativeIds.push(group.id);
  }catch(error){failed=true;throw error;}
 });
}
after(()=>{
 assert.equal(failed,false);assert.equal(results.size,73);assert.equal(nativeIds.length,8);
 assert.deepEqual(physicalIds,selection.physicalGroupedEvaluationIds);
 const ordered=selection.canonicalEvaluationIds.map(id=>{assert(results.has(id));return results.get(id);});
 const admitted=ordered.filter(r=>r.accepted).length;assert.equal(admitted,32);assert.equal(ordered.length-admitted,41);
 const proof={
  schema:'afw.c2-own-finite-get-diag3-tools-proof.v1',
  context:{repository:'tokenizartinfo-ops/agent-friendly-web',branch:nom.branch,workflow:nom.workflow,message:nom.message,head,tree,runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:nom.job,node:process.version,platform:process.platform,startedUTC,completedUTC:new Date().toISOString()},
  graphSha256:GRAPH_SHA,runnerSha256:hash(readFileSync(SELF)),
  selectionSha256:hash(files.get(PREFIX+'selection.json')),proofSchemaSha256:hash(files.get(PREFIX+'proof-schema.json')),
  idsSha256:hash(JSON.stringify(ordered.map(r=>r.id))),resultsSha256:hash(JSON.stringify(ordered)),
  physicalIdsSha256:hash(JSON.stringify(physicalIds)),nativeIds,
  counts:{nativeGroups:8,receiverEvaluations:73,matched:73,admit:32,reject:41,fail:0,skip:0,todo:0,cancelled:0},
  results:ordered,ownModelsExecuted:true,actualSourceExecution:false,actualEntryQualifiedByModels:false,finalSourceBinding:false,SourceQualified:false,Task1Pass:false,
  nonclaims:{historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}
 };
 assert.equal(proof.idsSha256,selection.canonicalIdsSha256);assert(gSchema(proof,schema,schema));
 const body=JSON.stringify(proof)+'\n';assert(Buffer.byteLength(body)<=24576);
 const output=safePath(nom.artifact.path);mkdirSync(dirname(output),{recursive:true});writeFileSync(output,body,{flag:'wx'});
 console.log('AFW_C2_OWN_FINITE_GET_DIAG3_PROOF '+JSON.stringify(proof));
});
