import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync,mkdirSync,realpathSync} from 'node:fs';
import {resolve,relative,sep} from 'node:path';
import {execFileSync} from 'node:child_process';
import test from 'node:test';
import {deflateRawSync,inflateRawSync} from 'node:zlib';
import {makeOwnFullCases} from './own-controls.mjs';
import {C230_ADMISSION} from './admission.mjs';
// Root activates this OWN-only graph. No npm, Source imports, eval, compilation or runtime traffic.
const PREFIX='docs/superpowers/root-own/c2-t1-full-c230-v3/';
const ROOT=realpathSync(process.cwd());
const hash=x=>createHash('sha256').update(x).digest('hex');
const gitBlob=x=>createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex');
const read=path=>{assert.equal(typeof path,'string');const p=resolve(ROOT,path),r=relative(ROOT,p);assert(r&&!r.startsWith('..'+sep)&&r!=='..'&&!r.startsWith(sep));return readFileSync(p);};
const json=path=>JSON.parse(read(PREFIX+path).toString('utf8'));
const git=(...args)=>execFileSync('git',args,{cwd:ROOT,encoding:'utf8',maxBuffer:1048576}).trim();
assert.equal(process.version,'v22.23.4');assert.equal(process.platform,'linux');
assert.equal(process.env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');
assert.equal(process.env.GITHUB_REF,'refs/heads/lab/afw-c2-own-receiver-20261116-full-task1-c230-v3');
assert.equal(process.env.GITHUB_EVENT_NAME,'push');assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1');
assert.equal(process.env.GITHUB_JOB,'c2-full-task1-c230-own-v3');
assert.match(process.env.GITHUB_RUN_ID??'',/^[1-9][0-9]*$/);
const head=git('rev-parse','HEAD'),tree=git('rev-parse','HEAD^{tree}'),parents=git('show','-s','--format=%P','HEAD').split(' ');
assert.equal(head,process.env.GITHUB_SHA);assert.match(head,/^[a-f0-9]{40}$/);assert.match(tree,/^[a-f0-9]{40}$/);
assert.deepEqual(parents,['6791ce1bab9372e206d3c7b42b3e1394dc6e0c68']);
assert.equal(git('show','-s','--format=%B','HEAD'),'AFW-C2-FULL-TASK1-C230-OWN-V3-ONEUSE-20261116');
const graphRaw=read(PREFIX+'native-graph.json');
assert.equal(hash(graphRaw),'5b6998bce893c99cf9b7ba513a0a2b614a1e0d77fdf38b017a54e0576b18b91c');
const graph=JSON.parse(graphRaw.toString('utf8')),bindings=[];
assert.equal(graph.expectedControls,370);assert.equal(graph.idsHash,'5737f76ef490aa43eff78c4ec146c398c15ce3bff6da684906324a301702fa24');
assert.equal(graph.files.length,23);
for(const entry of graph.files){
 const body=read(entry.path);assert.equal(body.length,entry.bytes);assert.equal(hash(body),entry.sha256);assert.equal(gitBlob(body),entry.gitBlob);
 bindings.push({path:entry.path,bytes:body.length,sha256:hash(body),gitBlob:gitBlob(body)});
}
for(const path of [PREFIX+'native-graph.json',PREFIX+'run-controls.mjs']){
 const body=read(path);bindings.push({path,bytes:body.length,sha256:hash(body),gitBlob:gitBlob(body)});
}
const sourceIndex=json('data/source-index.json'),qualifier=json('data/qualifier.json'),schema=json('data/frame-schema.json'),selection=json('data/mode-selection.json');
assert.deepEqual(sourceIndex.entries.map(e=>({path:e.path,sha256:e.after.sha256,bytes:e.after.bytes})),C230_ADMISSION.admitted);
assert.deepEqual(schema.$defs.receipt.properties.admitted.const,C230_ADMISSION.admitted);
assert.deepEqual([...qualifier.inherited17,...qualifier.newFutureQualificationPaths8].map(e=>({path:e.path,mode:'100644',type:'blob',sha:e.blob,bytes:e.bytes,sha256:e.sha256})),C230_ADMISSION.edges);
assert.deepEqual(selection.modes.map(v=>hash(JSON.stringify(v))),C230_ADMISSION.selectionHashes.slice(0,3));
assert(Object.isFrozen(C230_ADMISSION)&&Object.isFrozen(C230_ADMISSION.edges));
const seed=json('fixture-seed.json'),plans=json('fixture-first-cases.json'),expected=json('expected-ids.json');
assert.equal(seed.syntheticOnly,true);assert.equal(plans.syntheticOnly,true);
const cases=makeOwnFullCases(seed,plans,json('legacy/fixture-first.json'),json('legacy/diagnostic-schema.json'),json('legacy/fix2-vectors.json'),hash,deflateRawSync,inflateRawSync);
assert.equal(cases.length,370);assert.deepEqual(cases.map(c=>c.id),expected.ids);assert.equal(new Set(expected.ids).size,370);
assert.equal(hash(JSON.stringify(expected.ids)),'5737f76ef490aa43eff78c4ec146c398c15ce3bff6da684906324a301702fa24');
const observed=[];
for(const c of cases)await test(c.id,{timeout:10000},()=>{
 try{c.run();observed.push({id:c.id,passed:true});}catch(error){observed.push({id:c.id,passed:false});throw error;}
});
assert.deepEqual(observed.map(r=>r.id),expected.ids);
const passed=observed.filter(r=>r.passed).length,failed=observed.length-passed;
const proof={
 schema:'afw.own-full-c230.native-proof.v1',
 context:{repository:process.env.GITHUB_REPOSITORY,branch:process.env.GITHUB_REF.slice(11),head,tree,parent:parents[0],runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:process.env.GITHUB_JOB,node:process.version},
 counts:{expected:370,observed:observed.length,passed,failed,cancelled:0,skipped:0,todo:0,missing:0,extra:0,duplicate:observed.length-new Set(observed.map(r=>r.id)).size},
 idsHash:hash(JSON.stringify(observed.map(r=>r.id))),bindings,
 ownModelsExecuted:true,actualSourceExecution:false,finalSourceBinding:false,SourceQualified:false,Task1Pass:false,
 nonclaims:{historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}
};
const encoded=JSON.stringify(proof)+'\n';assert(Buffer.byteLength(encoded,'utf8')<=24576);
mkdirSync(resolve(ROOT,'output'),{recursive:true});writeFileSync(resolve(ROOT,'output/c2-full-task1-c230-own-v3-proof.json'),encoded);
console.log('AFW_C2_FULL_C230_OWN_PROOF '+JSON.stringify(proof));
