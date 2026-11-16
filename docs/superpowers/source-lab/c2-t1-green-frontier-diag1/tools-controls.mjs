import test,{before,after} from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFile,writeFile,mkdir,mkdtemp,rm,lstat,realpath,rename,symlink} from 'node:fs/promises';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const nomination={
  "branch": "lab/afw-c2-source-20261116-green-frontier-diag1-tools",
  "message": "AFW-C2-GREEN-FRONTIER-DIAG1-TOOLS-ONEUSE-20261116",
  "workflow": ".github/workflows/afw-c2-green-frontier-diag1-tools.yml",
  "job": "c2-green-frontier-diag1-tools",
  "runner": "docs/superpowers/source-lab/c2-t1-green-frontier-diag1/tools-controls.mjs",
  "command": "node --test --test-reporter=tap --test-concurrency=1 docs/superpowers/source-lab/c2-t1-green-frontier-diag1/tools-controls.mjs",
  "artifact": {
    "name": "afw-c2-green-frontier-diag1-tools-proof",
    "path": "output/c2-green-frontier-diag1-tools-proof.json",
    "fileName": "c2-green-frontier-diag1-tools-proof.json",
    "retentionDays": 7
  },
  "node": "22.23.4",
  "runnerOS": "ubuntu-24.04",
  "jobTimeoutMinutes": 3,
  "testTimeoutMs": 10000,
  "permissions": "contents:read",
  "npmInstall": false,
  "SourceToolingExecutionOnly": true,
  "SourceBusinessExecution": false,
  "activationReleased": false
};
const base="6791ce1bab9372e206d3c7b42b3e1394dc6e0c68",baseTree="62e78926635d6b74f288d6c0d69e0f2516306989",repository="tokenizartinfo-ops/agent-friendly-web";
const sealedInputs=[
  {
    "file": "docs/superpowers/source-lab/c2-t1-green-frontier-diag1/tools-fixture-first.json",
    "bytes": 9632,
    "sha256": "2d66e480d2ea38fc78147f7ce2c28487f9cee290e100ab527c6cbb994b7bffd9",
    "blob": "70f228712cf9b7e6eef08e6d784316b174271106"
  },
  {
    "file": "docs/superpowers/source-lab/c2-t1-green-frontier-diag1/tools-positive-wire.json",
    "bytes": 22620,
    "sha256": "ae09d2798335a4c417a6088cf6f5dba7415141c0e0efad1e9e7b4f0a9f2aa75e",
    "blob": "1fb2e82835a547f434170939386852e2c6e32850"
  },
  {
    "file": "docs/superpowers/source-lab/c2-t1-green-frontier-diag1/tools-negative-wire.json",
    "bytes": 19764,
    "sha256": "5502a06eed2be7214bb063812bc20703cff6147fe3d4148ed2a1d76ce0bccf13",
    "blob": "928de8cd15789afc4d61b992601016377bdd7a7b"
  },
  {
    "file": "docs/superpowers/source-lab/c2-t1-green-frontier-diag1/mode-selection.json",
    "bytes": 3956,
    "sha256": "e596e1b7982a13d0fb0bf92d68907b2262496fae024cef149d7d297168596f99",
    "blob": "2cbdeb48255afbc1a1bf7745170541e8baab0e1d"
  },
  {
    "file": "docs/superpowers/source-lab/c2-t1-green-frontier-diag1/collection-adapters.mjs",
    "bytes": 9911,
    "sha256": "d608324a2270af11c0f371431079edb02bafa04a5bb0122150dd2203bd59c63c",
    "blob": "5c8123b9e66166a198add4a0593372cfef13a1db"
  },
  {
    "file": "docs/superpowers/source-lab/c2-t1-green-frontier-diag1/read-progress.mjs",
    "bytes": 5507,
    "sha256": "c9e0fa37a70a503ea172450abe5593bce98b4218905eb8fe0af26047986c003f",
    "blob": "62a31e3c16cc710c84ebfb5b0242abb00671363c"
  },
  {
    "file": "docs/superpowers/source-lab/c2-t1-green-frontier-diag1/diagnostic-driver.txt",
    "bytes": 3169,
    "sha256": "3363ff3be3fedb244f22f965be04925c579a3cfe33b7a718ec76428e3b4ca5bc",
    "blob": "9e29c5197207b03bdb4b10069089f37df289e88c"
  },
  {
    "file": "docs/superpowers/source-lab/c2-t1-green-frontier-diag1/progress-recorder.txt",
    "bytes": 3833,
    "sha256": "a3fb952458133453acde06ffe200c4b966f55e2472ea9c2263289e788be6e76e",
    "blob": "662ec8170bbfe81831b557824d1a466e722842d7"
  },
  {
    "file": "docs/superpowers/source-lab/c2-t1/body-07.txt",
    "bytes": 2785,
    "sha256": "678fc3c538f2fc29e70c41475794f58e5d690a7c7aae69b1b97ae9309a728b6b",
    "blob": "d4db10ee8a091434835a9ac28e0d607a5e9efd21"
  },
  {
    "file": ".github/workflows/afw-c2-green-frontier-diag1-tools.yml",
    "bytes": 1506,
    "sha256": "ebf30f07ee8600c49766cbaf1c0736234a87f4f27bd78e1cf555fca20a6f743a",
    "blob": "d46a7960d7b6196d863a3e97b8663c30b99ab469"
  }
];
const ids=["G20_D07_SIBLING","G20_MEASURE_TWO_REAL_TARGETS","G20_SECOND_LAUNCH_CUSTODY","G20_NATIVE_ETIMEDOUT_CAPTURE","G20_NATIVE_EXIT1_TORN_AND_FAULT","G20_WIRE_AND_ZIP_LENGTH"];

const workspace=process.cwd(),file=fileURLToPath(import.meta.url),tempParent=process.env.RUNNER_TEMP;
let temp,identity,selection,fixtures,positive,negative,adapter,context,inputs,bodies;
const actualChecks=ids.map(()=>[]),completed=[];
const git=(...args)=>{const r=spawnSync('git',args,{cwd:workspace,encoding:'utf8',maxBuffer:65536,timeout:3000});
  assert.equal(r.error,undefined);assert.equal(r.status,0);return r.stdout.trim();};
function identityOf(file,data) {return {file,bytes:data.length,sha256:createHash('sha256').update(data).digest('hex'),
  blob:createHash('sha1').update(Buffer.from('blob '+data.length+'\0')).update(data).digest('hex')};}
before(async()=>{
  assert.equal(process.version,'v22.23.4');assert.equal(process.getuid()>0,true);
  assert.equal(process.env.GITHUB_REPOSITORY,repository);assert.equal(process.env.GITHUB_REF,'refs/heads/'+nomination.branch);
  assert.equal(process.env.GITHUB_JOB,nomination.job);assert.equal(process.env.GITHUB_EVENT_NAME,'push');
  assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1');assert.match(process.env.GITHUB_RUN_ID,/^[1-9][0-9]*$/);
  assert.equal(file,join(workspace,nomination.runner));assert.equal(workspace,process.env.GITHUB_WORKSPACE);
  assert.equal(git('rev-parse','HEAD^'),base);assert.equal(git('rev-parse',base+'^{tree}'),baseTree);
  assert.equal(git('show','-s','--format=%B','HEAD'),nomination.message);const head=git('rev-parse','HEAD');
  assert.equal(head,process.env.GITHUB_SHA);const tree=git('rev-parse','HEAD^{tree}');assert.match(tree,/^[0-9a-f]{40}$/);
  context={repository,parent:base,head,tree,runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:nomination.job,node:process.version};
  bodies=[];inputs=[];
  for(const pin of sealedInputs) {
    const path=join(workspace,pin.file);assert.equal(await realpath(path),path);
    const raw=await readFile(path),real=identityOf(pin.file,raw);assert.deepEqual(real,pin);bodies.push(raw);inputs.push(real);
  }
  inputs.push(identityOf(nomination.runner,await readFile(file)));
  fixtures=JSON.parse(bodies[0]);positive=JSON.parse(bodies[1]);negative=JSON.parse(bodies[2]);selection=JSON.parse(bodies[3]);
  assert.deepEqual(fixtures.nativeTestIds,ids);
  assert.equal(await realpath(tempParent),tempParent);
  temp=await mkdtemp(join(tempParent,'afw-green20-controls-'));identity=await lstat(temp);
  assert.equal(identity.uid,process.getuid());assert.equal(identity.gid,process.getgid());
  adapter=await import('./collection-adapters.mjs');
});
const parsed=line=>JSON.parse(line.slice(line.indexOf(' ')+1));
const toolCase=(i,work)=>test(ids[i],{timeout:10000,concurrency:false},async()=>{
  const check=async(name,action)=>{
    assert.equal(name,fixtures.assertionNames[i][actualChecks[i].length]);
    await action();actualChecks[i].push(name);
  };
  await work(check);assert.deepEqual(actualChecks[i],fixtures.assertionNames[i]);completed.push(ids[i]);
});
function asChild(example) {
  const c=parsed(example.outcomeLine).observation.capture;
  return {status:c.exitCode,signal:c.signal==='none'?null:c.signal,
    error:c.errorKind==='timeout'?Object.assign(new Error('fixture'),{code:'ETIMEDOUT'}):undefined,
    stdout:Buffer.from(example.rawSample.stdout),stderr:Buffer.from(example.rawSample.stderr)};
}
function observe(example) {
  return adapter.collectObservation(asChild(example),Buffer.from(example.rawSample.journal),selection.selected);
}
function fixturePacket(example) {
  const o=parsed(example.outcomeLine),c=parsed(example.custodyLine);
  const custody=adapter.custodyFrame(o.context,c.preflightProcesses,c.greenProcesses,c);
  return adapter.successPacket(o.context,custody,o.sourceReads.beforeSha256,o.sourceReads.afterSha256,
    o.sourceReads.beforeSha256,observe(example));
}
toolCase(0,async check=>{
  const dir=join(temp,'driver'),original=join(dir,selection.originalDriver.path);
  await mkdir(dirname(original),{recursive:true});await writeFile(original,bodies[8],{flag:'wx'});
  await check('identicalRegistrationTail',async()=>assert.equal(await adapter.installSiblings(dir,selection,bodies[6],bodies[7]),
    selection.registrationTail.sha256));
  await check('siblingExclusive',()=>assert.rejects(adapter.installSiblings(dir,selection,bodies[6],bodies[7]),{code:'EEXIST'}));
  await check('beforeOriginalUntouched',async()=>assert.deepEqual(await readFile(original),bodies[8]));
  await check('wrongAliasDenied',async()=>{const altered=structuredClone(selection);altered.aliases[7].path=selection.originalDriver.path;
    await assert.rejects(adapter.verifySiblings(dir,altered),{code:'TARGET_DRIFT'});});
});
toolCase(1,async check=>{
  const dir=join(temp,'measure'),rows=fixtures.measurementInputs;
  for(const r of rows){const path=join(dir,r.path);await mkdir(dirname(path),{recursive:true});
    await writeFile(path,r.text,{flag:'wx',mode:0o600});}
  const entries=rows.map(r=>({path:r.path,after:{bytes:r.bytes,git:r.git,sha256:r.sha256}}));
  const exp=rows.map(r=>r.sha256);
  await check('firstDiskRead',async()=>assert.deepEqual(await adapter.measureTargets(dir,entries),exp));
  await check('secondDiskRead',async()=>assert.deepEqual(await adapter.measureTargets(dir,entries),exp));
  const changed=join(dir,rows[8].path);
  await check('postMutationDenied',async()=>{await writeFile(changed,rows[8].text.replace('08','18'));
    await assert.rejects(adapter.measureTargets(dir,entries),{code:'TARGET_DRIFT'});});
  await check('symlinkDenied',async()=>{await rm(changed);const shadow=changed+'.other';await writeFile(shadow,rows[8].text);
    await symlink(shadow,changed);await assert.rejects(adapter.measureTargets(dir,entries),{code:'TARGET_DRIFT'});});
});
toolCase(2,async check=>{
  const c=parsed(positive.cases[0].custodyLine),mk=(a,b)=>adapter.custodyFrame(c.context,a,b,c);
  await check('onePlusOne',()=>assert.deepEqual(mk(1,1),c));
  await check('onePlusSeven',()=>assert.equal(mk(1,7).checkedProcesses,8));
  await check('zeroDenied',()=>assert.throws(()=>mk(0,1),{code:'CUSTODY_INVALID'}));
  await check('nineDenied',()=>assert.throws(()=>mk(2,7),{code:'CUSTODY_INVALID'}));
  await check('duplicateOrLostDenied',()=>{assert.equal(adapter.freshProbes(['1.json'],['1.json','2.json']),1);
    assert.throws(()=>adapter.freshProbes(['1.json'],['2.json']),{code:'CUSTODY_INVALID'});
    assert.throws(()=>adapter.freshProbes([],['1.json','1.json']),{code:'CUSTODY_INVALID'});});
  await check('badProbeDenied',async()=>{const f=join(temp,'bad-probe');await writeFile(f,'{}\n',{mode:0o600});
    await assert.rejects(adapter.readProbe(f),{code:'CUSTODY_INVALID'});});
});
toolCase(3,async check=>{
  const a=positive.cases[0],b=positive.cases[2];
  await check('actualPositivePair',()=>{const out=fixturePacket(a);
    assert.equal(out.custodyLine,a.custodyLine);assert.equal(out.outcomeLine,a.outcomeLine);});
  await check('timeoutRetainsNativePrefix',()=>{const o=observe(a);assert.equal(o.capture.errorKind,'timeout');
    assert.deepEqual(o.native.cases,[{id:selection.selected[0],status:'pass'}]);assert.equal(o.witness.openCase.id,selection.selected[1]);});
  await check('timeoutEmpty',()=>assert.equal(fixturePacket(b).outcomeLine,b.outcomeLine));
  await check('unexpectedSignalDenied',()=>assert.throws(()=>adapter.collectObservation({...asChild(a),error:undefined,
    signal:'SIGTERM'},Buffer.alloc(0),selection.selected),{code:'CAPTURE_INVALID'}));
  await check('oversizeStreamDenied',()=>assert.throws(()=>adapter.collectObservation({...asChild(a),stdout:Buffer.alloc(1048577)},
    Buffer.alloc(0),selection.selected),{code:'CAPTURE_INVALID'}));
});
toolCase(4,async check=>{
  const ex=positive.cases[1],a=positive.cases[0],raw=Buffer.from(a.rawSample.journal),child=asChild(a);
  await check('exit1TornNativePair',()=>assert.equal(fixturePacket(ex).outcomeLine,ex.outcomeLine));
  await check('stableMalformedUnknown',()=>{const o=adapter.collectObservation(child,Buffer.concat([raw,Buffer.from('{}\n')]),selection.selected);
    assert.equal(o.unknownReason,'JOURNAL_INVALID_RECORD');assert.equal(o.witness.frontier,'unknown');assert.equal(o.witness.events.length,5);});
  await check('stableRecorderFaultUnknown',()=>{const o=adapter.collectObservation({...child,stderr:Buffer.from('AFW_C2_GREEN_RECORDER_FAULT\n')},raw,selection.selected);
    assert.equal(o.unknownReason,'RECORDER_FAULT');assert.equal(o.witness.openCase,null);assert.equal(o.witness.events.length,5);});
  await check('firstThrowSequence',()=>assert.equal(observe(ex).firstThrowSequence,6));
  await check('n2ConflictDenied',()=>{const n=negative.fullRejectedPairs[0];
    assert.throws(()=>adapter.collectObservation({...asChild(ex),stdout:Buffer.from(n.nativeStdoutFixture)},
      Buffer.from(ex.rawSample.journal),selection.selected),{code:'EVIDENCE_CONFLICT'});});
  await check('unstableOrReplacedFileDenied',async()=>{
    const path=join(temp,'journal.ndjson'),id=await adapter.createJournal(path);await writeFile(path,raw,{flag:'a'});
    assert.deepEqual(await adapter.readJournal(path,id),raw);
    await rename(path,path+'.old');await writeFile(path,raw,{flag:'wx',mode:0o600});
    await assert.rejects(adapter.readJournal(path,id),{code:'JOURNAL_INVALID'});});
});
toolCase(5,async check=>{
  const a=positive.cases[0],out=fixturePacket(a),o=parsed(a.outcomeLine);
  await check('twoCanonicalFrames',()=>assert.deepEqual([out.custodyLine,out.outcomeLine],[a.custodyLine,a.outcomeLine]));
  await check('artifactEqualsBodyLF',()=>assert.equal(out.payload,JSON.stringify(o)+'\n'));
  await check('body24576Accepted',()=>{const b=adapter.encodeBody('a'.repeat(24574),24576);
    assert.equal(Buffer.byteLength(b+'\n'),24577);});
  await check('body24577Rejected',()=>assert.throws(()=>adapter.encodeBody('a'.repeat(24575),24576),{code:'PUBLICATION_INVALID'}));
  await check('sourceReadsMismatchDenied',()=>{const stale=parsed(negative.fullRejectedPairs[1].outcomeLine);
    assert.throws(()=>adapter.successPacket(o.context,o.custody,stale.sourceReads.beforeSha256,stale.sourceReads.afterSha256,
      o.sourceReads.beforeSha256,o.observation),{code:'TARGET_DRIFT'});});
  await check('faultSeparate',()=>assert.equal(adapter.faultLine(o.context,'journal','JOURNAL_INVALID'),negative.validInfraExample.line));
});
after(async()=>{
  if(temp){
    const st=await lstat(temp);
    assert.equal(dirname(temp),resolve(tempParent));assert.equal(await realpath(temp),temp);
    assert.equal(st.uid,identity.uid);assert.equal(st.dev,identity.dev);assert.equal(st.ino,identity.ino);
    await rm(temp,{recursive:true,force:false});await assert.rejects(lstat(temp),{code:'ENOENT'});
  }
  if(completed.length!==ids.length)return;
  assert.deepEqual(completed,ids);assert.deepEqual(actualChecks,fixtures.assertionNames);
  const proof={schema:'afw.c2-green20-frontier-diag1-tools-proof.v1',context,inputs,ids:completed,checks:actualChecks,
    nativeTestsCompleted:completed.length,assertionsCompleted:actualChecks.flat().length,tempRemoved:true,
    SourceToolingExecutionOnly:true,SourceBusinessExecution:false,SourceQualified:false,Task1Pass:false,nonclaims:fixtures.nonclaims};
  const body=JSON.stringify(proof);assert(Buffer.byteLength(body)<=24576);const file=join(workspace,nomination.artifact.path);
  await mkdir(dirname(file),{recursive:true});assert.equal(await realpath(dirname(file)),dirname(file));
  await writeFile(file,body+'\n',{flag:'wx',mode:0o600});assert.equal(await readFile(file,'utf8'),body+'\n');
  console.log('AFW_C2_GREEN20_FRONTIER_DIAG1_TOOLS_PROOF '+body);
});
