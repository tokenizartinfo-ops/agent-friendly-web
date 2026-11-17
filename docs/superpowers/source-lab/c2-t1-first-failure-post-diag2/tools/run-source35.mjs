import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFile,writeFile,lstat,realpath,mkdir} from 'node:fs/promises';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const c={
  "repository": "tokenizartinfo-ops/agent-friendly-web",
  "base": "6791ce1bab9372e206d3c7b42b3e1394dc6e0c68",
  "baselineTree": "62e78926635d6b74f288d6c0d69e0f2516306989",
  "branch": "lab/afw-c2-source-20261117-first-failure-diag2-tools",
  "message": "AFW-C2-FIRST-FAILURE-POST-DIAG2-TOOLS-ONEUSE-20261117",
  "job": "c2-first-failure-post-diag2-tools",
  "runner": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/tools/run-source35.mjs",
  "workflow": ".github/workflows/afw-c2-first-failure-post-diag2-tools.yml",
  "child": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/tools/source35.test.mjs",
  "corpus": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/tools/source-c1.json",
  "seal": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/tools/fixture-first.json",
  "output": "output/c2-first-failure-post-diag2-tools.json",
  "marker": "AFW_C2_FIRST_FAILURE_POST_DIAG2_TOOLS",
  "schema": "afw.c2-first-failure-post-diag2-tools.v1",
  "caseMarker": "AFW_DIAG2_PROJECTED",
  "ids": [
    "S01_KNOWN_503_COUNTS_222",
    "S02_KNOWN_429_PARTIAL",
    "S03_KNOWN_599_BOUNDS_ONLY",
    "S04_MISSING_SOURCE",
    "S05_DUPLICATE_SOURCE",
    "S06_SOURCE_STATUS_CONFLICT",
    "S07_SOURCE_WRONG_PHASE",
    "S08_SOURCE_WRONG_CODE",
    "S09_SOURCE_EXTRA_KEY",
    "S10_SOURCE_NONCANONICAL",
    "S11_MISSING_SCALAR",
    "S12_DUPLICATE_SCALAR",
    "S13_SCALAR_MESSAGE_FAKE",
    "S14_SCALAR_NESTED_FAKE",
    "S15_SCALAR_STRING",
    "S16_SCALAR_FLOAT",
    "S17_SCALAR_600",
    "S18_SCALAR_200_CONFLICT",
    "S19_WRONG_EXPECTED",
    "S20_COUNTER_RANGE",
    "S21_WRONG_OPERATOR",
    "S22_WRONG_NATIVE_ORDINAL",
    "S23_NESTED_TARGET_PAIR",
    "S24_TORN_CANDIDATE",
    "S25_CRLF_UNSUPPORTED",
    "S26_SOURCE_WRONG_ORDER",
    "S27_EARLIEST_WRONG_SITE",
    "S28_COUNTER_THROW",
    "S29_COUNTER_OPEN",
    "S30_VALID_CANDIDATE_LATER_TORN",
    "S31_EARLIER_NATIVE_FAILURE",
    "S32_TARGET_PASS",
    "S33_NO_QUALIFYING_THROW",
    "S34_TARGET_RESULT_MISSING",
    "S35_TARGET_THROW_NOT_IN_VALIDATED_PREFIX"
  ],
  "nonclaims": {
    "historicalCauseProven": false,
    "receiptAuthenticated": false,
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false,
    "globalNativeDrainVerified": false,
    "sdkNamespaceEmptyVerified": false
  }
};
const inputs=[
  {
    "path": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/mode-selection.json",
    "mode": "100644",
    "type": "blob",
    "blob": "5a554a8fb75439f1549d03baf29be09572fdddac",
    "bytes": 4070,
    "sha256": "7c49cca538925c8da454f82b0f35468bbdcd5577c05893966f91719064df822e"
  },
  {
    "path": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/frame-schema.json",
    "mode": "100644",
    "type": "blob",
    "blob": "90e52e44f2364355c6a25daccb4684ed41ba0f7e",
    "bytes": 26400,
    "sha256": "9b325f9aff785f6861c436f8a84b3bb65ea0ed8c2c57a2ec819f5cd153b8b2eb"
  },
  {
    "path": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/protocol-contract.json",
    "mode": "100644",
    "type": "blob",
    "blob": "59ab8f6af35f43807ba68084dd6bcdc09f649d0e",
    "bytes": 41095,
    "sha256": "7244fde1d8383114022831038fb242e76e9fb26526f3b3f6be57f8236771d389"
  },
  {
    "path": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/collection-adapters.mjs",
    "mode": "100644",
    "type": "blob",
    "blob": "9f457450ba1e7a746117fc1498922972613df789",
    "bytes": 20195,
    "sha256": "e0b52ef0bcafa707b0586246e0cf4c7c76f05699a11fd593af3b51da2c74e48e"
  },
  {
    "path": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/read-progress.mjs",
    "mode": "100644",
    "type": "blob",
    "blob": "62a31e3c16cc710c84ebfb5b0242abb00671363c",
    "bytes": 5507,
    "sha256": "c9e0fa37a70a503ea172450abe5593bce98b4218905eb8fe0af26047986c003f"
  },
  {
    "path": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/tools/source-c1.json",
    "mode": "100644",
    "type": "blob",
    "blob": "8e30344042e65b888d1f912a9a375d365f3e5c4e",
    "bytes": 237110,
    "sha256": "1b99b19904c748fe7fee0afd34638470a99427b0fcf43c03ef69626e389779b1"
  },
  {
    "path": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/tools/fixture-first.json",
    "mode": "100644",
    "type": "blob",
    "blob": "d1b79ae4c7987fcc8f876ffd6f7d211bb2970465",
    "bytes": 17929,
    "sha256": "e4bb383ae6acfdf844463188398ca6642981ec6a3427258a67a76fcc44ab5998"
  },
  {
    "path": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/tools/source-index.json",
    "mode": "100644",
    "type": "blob",
    "blob": "e2ca46e8ecf98dd0d87f148068dd240b147db1ec",
    "bytes": 11467,
    "sha256": "87049774b9728c99aa85c6a1d3eea5a16dc6e3412dea9f41a0cca984ee5325d7"
  },
  {
    "path": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/tools/legacy/collection-adapters.mjs",
    "mode": "100644",
    "type": "blob",
    "blob": "5c8123b9e66166a198add4a0593372cfef13a1db",
    "bytes": 9911,
    "sha256": "d608324a2270af11c0f371431079edb02bafa04a5bb0122150dd2203bd59c63c"
  },
  {
    "path": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/tools/legacy/read-progress.mjs",
    "mode": "100644",
    "type": "blob",
    "blob": "62a31e3c16cc710c84ebfb5b0242abb00671363c",
    "bytes": 5507,
    "sha256": "c9e0fa37a70a503ea172450abe5593bce98b4218905eb8fe0af26047986c003f"
  },
  {
    "path": "docs/superpowers/source-lab/c2-t1-first-failure-post-diag2/tools/source35.test.mjs",
    "mode": "100644",
    "type": "blob",
    "blob": "763b04a5d358528beca961920af9aaadeced0101",
    "bytes": 7154,
    "sha256": "7a35ae0ac86a0047fe85982a756b6779bc8c9cde381bce442361698ec7324cad"
  }
];
const workflow={"path":".github/workflows/afw-c2-first-failure-post-diag2-tools.yml","mode":"100644","type":"blob","bytes":1459,"sha256":"839062f469a741b1f0934a1fa02cf8838cfda7eabbf8a52ef876dd298af648a5","blob":"74ae2a7bded33eff15d29b4f3f436c2403968e31"};

const root=process.cwd(),env=process.env, here=fileURLToPath(import.meta.url);
const safe={PATH:env.PATH,LANG:'C.UTF-8',LC_ALL:'C.UTF-8',NO_COLOR:'1'};
const sha=b=>createHash('sha256').update(b).digest('hex');
const gitSha=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
function git(...args) {
  const p=spawnSync('git',args,{cwd:root,env:safe,encoding:'utf8',timeout:10000,maxBuffer:262144});
  assert.ok(p.status===0&&!p.error&&p.signal===null&&p.stderr==='');
  return p.stdout.trimEnd();
}
async function measure(path) {
  const file=join(root,path),stat=await lstat(file);
  assert.ok(stat.isFile()&&stat.nlink===1&&stat.size<=524288&&await realpath(file)===file);
  const b=await readFile(file), blob=gitSha(b);
  assert.equal(git('ls-tree','HEAD','--',path),'100644 blob '+blob+'\t'+path);
  return {path,mode:'100644',type:'blob',blob,bytes:b.length,sha256:sha(b)};
}
const unique=(lines,line)=>lines.filter(x=>x===line).length===1;
async function main(){
  assert.ok(process.argv.length===2&&process.version==='v22.23.4'&&process.platform==='linux'&&env.RUNNER_OS==='Linux');
  assert.ok(root===resolve(env.GITHUB_WORKSPACE)&&here===join(root,c.runner));
  assert.ok(env.GITHUB_REPOSITORY===c.repository&&env.GITHUB_EVENT_NAME==='push'&&env.GITHUB_REF==='refs/heads/'+c.branch&&
    env.GITHUB_JOB===c.job&&env.GITHUB_RUN_ATTEMPT==='1'&&/^[1-9]\d{0,19}$/.test(env.GITHUB_RUN_ID??'')&&/^[a-f0-9]{40}$/.test(env.GITHUB_SHA??''));
  assert.equal(git('rev-parse','HEAD'),env.GITHUB_SHA);
  assert.equal(git('rev-parse','HEAD^'),c.base);
  assert.equal(git('rev-parse',c.base+'^{tree}'),c.baselineTree);
  assert.equal(git('show','-s','--format=%B','HEAD'),c.message);
  const tree=git('rev-parse','HEAD^{tree}');assert.match(tree,/^[a-f0-9]{40}$/);
  const paths=[...inputs.map(x=>x.path),c.runner,c.workflow];
  assert.deepEqual(git('diff','--no-renames','--name-status',c.base,'HEAD').split('\n').sort(),paths.map(x=>'A\t'+x).sort());
  const graph=[];
  for(const pin of inputs){const m=await measure(pin.path);assert.deepEqual(m,pin);graph.push(m);}
  graph.push(await measure(c.runner));
  const wf=await measure(c.workflow);assert.deepEqual(wf,workflow);graph.push(wf);
  const fixture=JSON.parse(await readFile(join(root,c.corpus))).sourceLiteralCorpus;
  const seal=JSON.parse(await readFile(join(root,c.seal)));
  assert.deepEqual(fixture.cases.map(x=>x.id),c.ids);assert.equal(c.ids.length,35);
  assert.equal(sha(Buffer.from(JSON.stringify(fixture))),seal.componentSeals.sourceCorpusSha256);
  const args=['--test','--test-reporter=tap','--test-concurrency=1','--test-timeout=10000',c.child];
  const p=spawnSync(process.execPath,args,{cwd:root,env:safe,stdio:['ignore','pipe','pipe'],encoding:null,
    timeout:105000,maxBuffer:1048576});
  assert.ok(Buffer.isBuffer(p.stdout)&&Buffer.isBuffer(p.stderr)&&p.stdout.length<=1048576&&p.stderr.length<=65536);
  const raw=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(p.stdout);
  assert.ok(raw.startsWith('TAP version 13\n')&&raw.endsWith('\n')&&!raw.includes('\r'));
  const lines=raw.split('\n'), pairs=[], reports=[];
  let started=null;
  for(const line of lines){
    if(line.startsWith('# Subtest: ')){assert.equal(started,null);started=line.slice(11);assert.equal(started,c.ids[pairs.length]);}
    else if(/^(?:not )?ok\b/.test(line)){
      const idx=pairs.length,id=c.ids[idx];assert.equal(started,id);
      if(line==='not ok '+(idx+1)+' - '+id)process.stderr.write('AFW_SOURCE35_FAILED '+id+'\n');
      assert.equal(line,'ok '+(idx+1)+' - '+id);
      pairs.push(line);started=null;
    }else if(line.startsWith('# '+c.caseMarker+' ')){
      const val=line.slice(c.caseMarker.length+3),row=JSON.parse(val);
      assert.equal(JSON.stringify(row),val);
      reports.push(row);
    }
  }
  assert.ok(p.status===0&&p.signal===null&&!p.error&&p.stderr.length===0&&started===null);
  assert.equal(pairs.length,35);assert.equal(reports.length,35);
  for(const l of ['1..35','# tests 35','# suites 0','# pass 35','# fail 0','# cancelled 0','# skipped 0','# todo 0'])
    assert.ok(unique(lines,l));
  const rows=[];
  for(const [i,row] of reports.entries()){
    const v=fixture.cases[i],expected=v.expected,projectionSha256=sha(Buffer.from(JSON.stringify(expected)));
    const legacy=i===0?{inheritedFieldsMatched:6,oldFirstFailurePresent:false,oldFitsNewObservation:false}:null;
    assert.deepEqual(row,{id:v.id,state:expected.state,reason:expected.reason,projectionSha256,checks:i===0?18:10,legacy});
    rows.push({id:v.id,native:pairs[i],state:row.state,reason:row.reason,projectionSha256:row.projectionSha256,checks:row.checks});
  }
  const context={repository:c.repository,baselineSource:c.base,baselineTree:c.baselineTree,head:env.GITHUB_SHA,tree,
    runId:env.GITHUB_RUN_ID,runAttempt:1,job:c.job,node:process.version};
  const proof={schema:c.schema,context,orderedSourceGraph:graph,fixtureFirstBlob:inputs.find(x=>x.path===c.seal).blob,
    corpusSha256:seal.componentSeals.sourceCorpusSha256,ids:c.ids,results:rows,
    native:{tests:35,pass:35,fail:0,cancelled:0,skipped:0,todo:0,subchecks:rows.reduce((n,r)=>n+r.checks,0),
      stdoutBytes:p.stdout.length,stdoutSha256:sha(p.stdout),stderrBytes:p.stderr.length,stderrSha256:sha(p.stderr)},
    legacyS01:reports[0].legacy,SourceQualified:false,Task1Pass:false,nonclaims:c.nonclaims};
  const body=JSON.stringify(proof),payload=Buffer.from(body+'\n'),file=join(root,c.output),dir=dirname(file);
  assert.ok(payload.length<=24576);
  await mkdir(dir,{recursive:true});assert.equal(await realpath(dir),dir);
  await writeFile(file,payload,{flag:'wx',mode:0o600});assert.ok((await readFile(file)).equals(payload));
  process.stdout.write(c.marker+' '+body+'\n');
}
main().catch(()=>{process.stderr.write('AFW_SOURCE35_TOOLS_REJECTED\n');process.exitCode=1;});
