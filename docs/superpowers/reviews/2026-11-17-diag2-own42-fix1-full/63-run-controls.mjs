import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync,mkdirSync,realpathSync} from 'node:fs';
import {resolve,relative,sep} from 'node:path';
import {execFileSync} from 'node:child_process';
import test from 'node:test';
import {inflateRawSync} from 'node:zlib';
import {checkOne} from './controls.mjs';
import {d2ModelRead} from './reader.mjs';
import {g20Trusted} from './transport.mjs';
import {gSchema} from './shape.mjs';
import {G20_FIXED,G20_SCHEMA,D2_ACTUAL_EDGES,D2_ACTUAL_EDGES_HASH,D2_MODEL_EDGES,D2_MODEL_EDGES_HASH} from './fixed.mjs';
// Only independent OWN code runs. Every producer body is DATA; no Source helpers or business imports.
const PREFIX="docs/superpowers/root-own/c2-t1-first-failure-post-diag2-fix1/",WF=".github/workflows/afw-c2-own-first-failure-post-diag2-fix1.yml",ROOT=realpathSync(process.cwd());
const hash=x=>createHash('sha256').update(x).digest('hex'),blob=x=>createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex');
const read=path=>{assert(path.startsWith(PREFIX)||path===WF);const p=resolve(ROOT,path),r=relative(ROOT,p);assert(r&&!r.startsWith('..'+sep)&&r!=='..'&&!r.startsWith(sep));return readFileSync(p);};
const json=name=>JSON.parse(read(PREFIX+name).toString('utf8'));
const git=(...args)=>execFileSync('git',args,{cwd:ROOT,encoding:'utf8',maxBuffer:1048576}).trim();
assert.equal(process.version,'v22.23.4');assert.equal(process.platform,'linux');
assert.equal(process.env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');
assert.equal(process.env.GITHUB_REF,"refs/heads/lab/afw-c2-own-receiver-20261117-first-failure-post-diag2-fix1");assert.equal(process.env.GITHUB_EVENT_NAME,'push');
assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.env.GITHUB_JOB,"c2-own-first-failure-post-diag2-fix1");
assert.match(process.env.GITHUB_RUN_ID??'',/^[1-9][0-9]*$/);
const head=git('rev-parse','HEAD'),tree=git('rev-parse','HEAD^{tree}'),parents=git('show','-s','--format=%P','HEAD').split(' ');
assert.equal(head,process.env.GITHUB_SHA);assert.deepEqual(parents,['6791ce1bab9372e206d3c7b42b3e1394dc6e0c68']);
assert.equal(git('show','-s','--format=%B','HEAD'),"AFW-C2-OWN-FIRST-FAILURE-POST-DIAG2-FIX1-ONEUSE-20261117");
const graphBytes=read(PREFIX+'native-graph.json');assert.equal(hash(graphBytes),"10656580bb8a51f1306bcc6be46192e1537a5e0634c35eeb6ec45cd70da1c450");
const graph=JSON.parse(graphBytes),bindings=[];assert.equal(graph.nativeCount,42);assert.equal(graph.receiverEvaluations,44);assert.equal(graph.files.length,62);
for(const e of graph.files){assert.equal(e.mode,'100644');const b=read(e.path);assert.equal(b.length,e.bytes);assert.equal(hash(b),e.sha256);assert.equal(blob(b),e.gitBlob);bindings.push({path:e.path,bytes:b.length,sha256:hash(b),gitBlob:blob(b)});}
for(const path of [PREFIX+'native-graph.json',PREFIX+'run-controls.mjs']){const b=read(path);bindings.push({path,bytes:b.length,sha256:hash(b),gitBlob:blob(b)});}
assert.deepEqual(json('data/frame-schema.json'),G20_SCHEMA);
assert.equal(hash(JSON.stringify(json('data/mode-selection.json'))),G20_FIXED.selectionHash);
assert.deepEqual(json('data/protocol-contract.json').sourceNomination.requiredSteps,G20_FIXED.sourceSteps);
const actual=json('data/actual-source-admission.json'),model=json('model-admission.json');
assert.equal(actual.actualExpectedSourceContext,null);assert.deepEqual(actual.bodyEdges,D2_ACTUAL_EDGES);assert.equal(actual.bodyEdgesHash,D2_ACTUAL_EDGES_HASH);
assert.equal(model.actualExpectedSourceContext,null);assert.deepEqual(model.bodyEdges,D2_MODEL_EDGES);assert.equal(model.bodyEdgesHash,D2_MODEL_EDGES_HASH);
for(const b of [actual,model])g20Trusted({expected:null,bodyEdges:b.bodyEdges,bodyEdgesHash:b.bodyEdgesHash},hash);
const selection=json('selection.json'),ids=json('expected-42.json'),old=json('original-expected-40.json');
assert.equal(selection.entrypoint,'d2ModelRead');assert.equal(selection.nativeCount,42);assert.equal(selection.receiverEvaluations,44);
assert.deepEqual(selection.groups.map(g=>g.id),ids.nativeIds);assert.deepEqual(ids.nativeIds.slice(0,40),old.cases.map(c=>c.id));
assert.equal(ids.nativeIds.length,42);assert.equal(new Set(ids.nativeIds).size,42);assert.equal(hash(JSON.stringify(ids.nativeIds)),graph.idsHash);
assert.equal(selection.groups.reduce((n,g)=>n+g.fixtures.length,0),44);
const groups=selection.groups.map(g=>({id:g.id,fixtures:g.fixtures.map(path=>json(path))}));
assert.equal(new Set(groups.flatMap(g=>g.fixtures.map(f=>f.id))).size,44);
assert.equal(hash(JSON.stringify(groups.flatMap(g=>g.fixtures.map(f=>f.id)))),graph.receiverIdsHash);
const inflate=b=>inflateRawSync(b,{maxOutputLength:24577,info:true}),observed=[],evaluations=[];
for(const group of groups)await test(group.id,{timeout:10000},()=>{
 let failure;
 for(const fixture of group.fixtures){
  try{const v=checkOne(d2ModelRead,fixture,hash,inflate);evaluations.push({id:fixture.id,passed:true,accepted:v.accepted,state:v.state,reason:v.reason});}
  catch(error){evaluations.push({id:fixture.id,passed:false,accepted:null,state:null,reason:null});failure??=error;}
 }
 observed.push({id:group.id,passed:!failure});if(failure)throw failure;
});
assert.deepEqual(observed.map(r=>r.id),ids.nativeIds);
const nativePassed=observed.filter(r=>r.passed).length,receiverPassed=evaluations.filter(r=>r.passed).length,admitted=evaluations.filter(r=>r.passed&&r.accepted).length,rejected=evaluations.filter(r=>r.passed&&r.accepted===false).length;
const proof={schema:'afw.own-first-failure-post-diag2-fix1.native-proof.v1',context:{repository:process.env.GITHUB_REPOSITORY,branch:process.env.GITHUB_REF.slice(11),head,tree,parent:parents[0],runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:process.env.GITHUB_JOB,node:process.version},counts:{expectedNative:42,observedNative:observed.length,passedNative:nativePassed,failedNative:observed.length-nativePassed,cancelled:0,skipped:0,todo:0,missing:42-observed.length,extra:0,duplicate:observed.length-new Set(observed.map(r=>r.id)).size,expectedReceiver:44,observedReceiver:evaluations.length,passedReceiver:receiverPassed,failedReceiver:evaluations.length-receiverPassed,admitted,rejected},idsHash:hash(JSON.stringify(observed.map(r=>r.id))),receiverIdsHash:hash(JSON.stringify(evaluations.map(r=>r.id))),bindings,evaluations,entrypoint:'d2ModelRead',actualProducerBodyDataMatched:true,ownModelsExecuted:true,actualSourceExecution:false,finalSourceBinding:false,SourceQualified:false,Task1Pass:false,nonclaims:JSON.parse(JSON.stringify(G20_FIXED.nonclaims))};
assert(gSchema(proof,json('proof-schema.json'),json('proof-schema.json')));
const text=JSON.stringify(proof)+'\n';assert(Buffer.byteLength(text)<=24576);
mkdirSync(resolve(ROOT,'output'),{recursive:true});writeFileSync(resolve(ROOT,"output/c2-own-first-failure-post-diag2-fix1.json"),text);
console.log('AFW_C2_OWN_FIRST_FAILURE_POST_DIAG2_FIX1_PROOF '+JSON.stringify(proof));
