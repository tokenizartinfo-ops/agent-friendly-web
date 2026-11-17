import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { readFile,writeFile,mkdir,mkdtemp,symlink,rm,lstat,readdir,realpath } from 'node:fs/promises';
import { dirname,join,resolve,sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const entered=Date.now(), end=entered+330000;
const config={
  "repo": "tokenizartinfo-ops/agent-friendly-web",
  "BASE": "6791ce1bab9372e206d3c7b42b3e1394dc6e0c68",
  "TREE": "62e78926635d6b74f288d6c0d69e0f2516306989",
  "branch": "lab/afw-c2-source-20261117-drop-winner-tools",
  "message": "AFW-C2-DROP-WINNER-TOOLS-ONEUSE-20261117",
  "job": "c2-drop-winner-tools",
  "runner": "docs/superpowers/source-lab/c2-drop-winner-tools/run-drop-winner-tools.mjs",
  "prefix": "docs/superpowers/source-lab/c2-drop-winner-tools/",
  "artifact": "output/drop-winner-tools.json",
  "childFile": "test/mcp-qa-finite-owner-three-stage-green-frontier-diag1-native.test.mjs",
  "selectHash": "09f9928830b63294f7ed27b00ea2a9593477fda2d6d0f7300e536faa5cd0bd27",
  "bootstrap": {
    "path": ".github/workflows/afw-finite-qa-bootstrap.yml",
    "bytes": 1844,
    "sha256": "ff64a890db1b55f8ed922e036673ebaf0a494c4833023bbc3317f28c6ededd14",
    "blob": "22f324e480dbe0295fe23fb7415328cba7952b1b",
    "fullReadback": true
  },
  "rootFiles": [
    "package-lock.json",
    "package.json",
    "tsconfig.json",
    "wrangler.a2a-canary.jsonc",
    "wrangler.a2a-production.jsonc",
    "wrangler.assistance-goal-context.jsonc",
    "wrangler.assistance-goal-context.qa.jsonc",
    "wrangler.assistance-supervision-producer.jsonc",
    "wrangler.contact.jsonc",
    "wrangler.delegated-canary.jsonc",
    "wrangler.delegated-real-pilot.example.jsonc",
    "wrangler.delegated-real-pilot.jsonc",
    "wrangler.delegated.jsonc",
    "wrangler.dossier-supervision-producer.jsonc",
    "wrangler.independent-closure-qa.finite.jsonc",
    "wrangler.independent-closure-qa.jsonc",
    "wrangler.independent-closure-qa.rollback.jsonc",
    "wrangler.mail-canary.jsonc",
    "wrangler.mcp-own-events.example.jsonc",
    "wrangler.mcp-own.finite.jsonc",
    "wrangler.mcp.jsonc",
    "wrangler.operations-manager.jsonc",
    "wrangler.operations-producer.jsonc",
    "wrangler.operations-review-qa.jsonc",
    "wrangler.operations-review.jsonc",
    "wrangler.operations-watchdog.jsonc",
    "wrangler.operations.jsonc",
    "wrangler.release-operator.jsonc"
  ],
  "transportRelease": null
};
const pins={
  "index": {
    "path": "docs/superpowers/source-lab/c2-t1-drop-winner-diag4/source-index.json",
    "blob": "fc5b71098da76696278765f43805f0f2a1953b22",
    "bytes": 11559,
    "sha256": "1da326e60821aec91c7635a227b42f14b0710a3a2d5fb6f8764722fbbaa3d141"
  },
  "selection": {
    "path": "docs/superpowers/source-lab/c2-t1-drop-winner-diag4/mode-selection.json",
    "blob": "8fe9907fb12fb71361819551df04c2830a78452b",
    "bytes": 5173,
    "sha256": "61c05384d3990612343e9a26ed413727ef869e39de5730082ea9d90a684e36c4"
  },
  "schema": {
    "path": "docs/superpowers/source-lab/c2-t1-drop-winner-diag4/frame-schema.json",
    "blob": "81be13ca960a143d565d55dd958b4e4ff24d3c96",
    "bytes": 34193,
    "sha256": "c612fe6d19707987aca278d99b77f621cddefe46184ceda22d4506406af1ac11"
  },
  "contract": {
    "path": "docs/superpowers/source-lab/c2-t1-drop-winner-diag4/protocol-contract.json",
    "blob": "6349fd2706b084e3c56309d6aac00a469310e73a",
    "bytes": 59226,
    "sha256": "1d2da1a8e853055f22cedbebb4dd813228f7641396409170c586805b6f2a9587"
  },
  "adapters": {
    "path": "docs/superpowers/source-lab/c2-t1-drop-winner-diag4/collection-adapters.mjs",
    "blob": "f1a26313b53079fa9a88340e15d86024d24f4cbf",
    "bytes": 35151,
    "sha256": "7a6adaefbaffab94258323fe214ad9d45f23816fed8a9e6f0d508cd03cdbf00e"
  },
  "reader": {
    "path": "docs/superpowers/source-lab/c2-t1-drop-winner-diag4/read-progress.mjs",
    "blob": "62a31e3c16cc710c84ebfb5b0242abb00671363c",
    "bytes": 5507,
    "sha256": "c9e0fa37a70a503ea172450abe5593bce98b4218905eb8fe0af26047986c003f"
  },
  "driver": {
    "path": "docs/superpowers/source-lab/c2-t1-drop-winner-diag4/diagnostic-driver.txt",
    "blob": "9e29c5197207b03bdb4b10069089f37df289e88c",
    "bytes": 3169,
    "sha256": "3363ff3be3fedb244f22f965be04925c579a3cfe33b7a718ec76428e3b4ca5bc"
  },
  "recorder": {
    "path": "docs/superpowers/source-lab/c2-t1-drop-winner-diag4/progress-recorder.txt",
    "blob": "662ec8170bbfe81831b557824d1a466e722842d7",
    "bytes": 3833,
    "sha256": "a3fb952458133453acde06ffe200c4b966f55e2472ea9c2263289e788be6e76e"
  },
  "guard": {
    "path": "docs/superpowers/source-lab/c2-t1/c2-source-custody-guard.mjs",
    "blob": "5d0f1ccc0bb1e7dcbebfd3ad2078eedd631a6efb",
    "bytes": 1208,
    "sha256": "c21d600503bee20abfacc36779c846a34e46023d921ef6d6ceb697abcef50ebf"
  },
  "preflight": {
    "path": "docs/superpowers/source-lab/c2-t1/c2-source-custody-preflight.mjs",
    "blob": "d311f579e95ab64a5f2d897d6c40f1fce784e8e2",
    "bytes": 417,
    "sha256": "3e548a2dc9527e72997bf147dedcab1b8c34f49848ece68cff498991f200a9ae"
  },
  "prevAdapter": {
    "path": "docs/superpowers/source-lab/c2-drop-winner-tools/r4-adapter.mjs",
    "mode": "100644",
    "type": "blob",
    "blob": "0465caea70e7a80aeb631fd73f267bb00dfc0f5d",
    "bytes": 32312,
    "sha256": "f484bbfaa879b7b0121a1ed2f0038ae358457ab636ca7e51c3c80678528448d6"
  },
  "oracle59": {
    "path": "docs/superpowers/source-lab/c2-drop-winner-tools/fixtures/scenarios.json",
    "mode": "100644",
    "type": "blob",
    "blob": "0625f0864da7c70f6a9b6abf0fb989c36fae22f6",
    "bytes": 15741,
    "sha256": "6f51b5c2cdf68fb98a15022de9b79a95dcc3c8081bb4e641626cda685322f665"
  },
  "seal59": {
    "path": "docs/superpowers/source-lab/c2-drop-winner-tools/fixtures/fixture-seal.json",
    "mode": "100644",
    "type": "blob",
    "blob": "b00113ce95aca4c1ab95dfa7cfdf83d298e839d1",
    "bytes": 3004,
    "sha256": "2c0227e4411358e03fcb439abf43391f4e2bcfe54669fa21d770efb88b28694e"
  },
  "suite": {
    "path": "docs/superpowers/source-lab/c2-drop-winner-tools/fixtures/check-scenarios.mjs",
    "mode": "100644",
    "type": "blob",
    "blob": "7ed4423a7ee9adba3ea6455111d88dd7d147165f",
    "bytes": 2103,
    "sha256": "bc4c9cebcfb098a60e5f6906f207343ece44a929dca9365aff016f844ed64da6"
  },
  "oracle63": {
    "path": "docs/superpowers/source-lab/c2-drop-winner-tools/fixtures/scenarios-63.json",
    "mode": "100644",
    "type": "blob",
    "blob": "a78efb5290deb184c70fc4282bf438d818d02588",
    "bytes": 17457,
    "sha256": "bb2383a06cb2c7a08ae248371b5ea06cbf597ee15689a98c4eba03cd64c0b709"
  },
  "model": {
    "path": "docs/superpowers/source-lab/c2-drop-winner-tools/model.mjs",
    "mode": "100644",
    "type": "blob",
    "blob": "430e97423c13df4b783ed90fe882f9e4eaa59386",
    "bytes": 7398,
    "sha256": "d6eeee3e2381747588f2bd45b9b934a38f0a6995a408730079a23eca56d043e3"
  },
  "nativeTool": {
    "path": "docs/superpowers/source-lab/c2-drop-winner-tools/native-controls.mjs",
    "mode": "100644",
    "type": "blob",
    "blob": "33fabf4ff364be6a0fb3d7f46cae8fd1aa2a3e5d",
    "bytes": 5683,
    "sha256": "3a708e993812d91668955d2a560f6f8a69a98cacc693506bdf3ed54cb466722f"
  },
  "differential": {
    "path": "docs/superpowers/source-lab/c2-drop-winner-tools/differential.mjs",
    "mode": "100644",
    "type": "blob",
    "blob": "5d5835da4f221adcda65339b2a30bbd123516772",
    "bytes": 2998,
    "sha256": "c3434c23e8abadf5d43d2d5c5e15614adc3d9f8a85a5d684e1fe6ec1fcd0b99d"
  },
  "toolChild": {
    "path": "docs/superpowers/source-lab/c2-drop-winner-tools/tool-child.mjs",
    "mode": "100644",
    "type": "blob",
    "blob": "cb26b8de8d97b3296d3c229b24ec5681aeaba65c",
    "bytes": 2454,
    "sha256": "9e57d1f7b5173b8f32ec8d1c802fff3ab57cadbfe369046c33b1dde9a88a238b"
  }
};
const flags={"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false};

const workspace=resolve(process.cwd()), node=process.execPath, uid=process.getuid(),gid=process.getgid();
const root=resolve(process.env.RUNNER_TEMP??''), parentEnv={PATH:dirname(node)+':/usr/bin:/bin:/usr/sbin:/sbin',HOME:root,LANG:'C.UTF-8',LC_ALL:'C.UTF-8'};
let phase='admission', context=null, fault=null, temp=null, tempInitial=null, target=null, adapters=null;
let beforeHashes, afterHashes, expected, observation, pfCount, greenCount;
const valid={admission:['ADMISSION_INVALID'],materialize:['MATERIALIZATION_INVALID','TARGET_DRIFT'],
  preflight:['PREFLIGHT_INVALID','CUSTODY_INVALID'],green:['LAUNCH_INVALID','CUSTODY_INVALID','CAPTURE_INVALID'],
  journal:['JOURNAL_INVALID','RECORDER_FAULT','TARGET_DRIFT'],native:['CAPTURE_INVALID','EVIDENCE_CONFLICT'],
  cleanup:['CLEANUP_INVALID','TARGET_DRIFT'],publish:['PUBLICATION_INVALID']};
const fail=(reason=valid[phase][0])=>{throw Object.assign(new Error(reason),{code:reason});};
const need=(condition,reason)=>{if(!condition)fail(reason);};
const remain=(limit)=>{const ms=end-Date.now();need(ms>0);return Math.max(1,Math.min(ms,limit));};
const digest=b=>createHash('sha256').update(b).digest('hex');
const gitBlob=b=>createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex');
const existsAbsent=async p=>{try{await lstat(p);}catch(e){if(e.code==='ENOENT')return;throw e;}fail();};
async function pinned(rootDir,pin) {
  const path=join(rootDir,pin.path);need((await lstat(path)).isFile() && await realpath(path)===resolve(path));
  const data=await readFile(path);
  need(data.length===pin.bytes&&gitBlob(data)===pin.blob&&digest(data)===pin.sha256);
  return data;
}
function hostCmd(cmd,args,max=1048576,input) {
  const result=spawnSync(cmd,args,{cwd:workspace,env:parentEnv,encoding:null,
    input,stdio:['pipe','pipe','pipe'],maxBuffer:max,timeout:remain(cmd==='tar'?30000:330000)});
  need(!result.error&&result.signal===null&&result.status===0&&Buffer.isBuffer(result.stdout)&&
    result.stdout.length<=max&&Buffer.isBuffer(result.stderr)&&result.stderr.length<=65536);
  return result.stdout;
}
const gitText=(...args)=>new TextDecoder('utf-8',{fatal:true}).decode(hostCmd('git',args)).trim();
async function materialize(index,files) {
  target=join(temp,'proposal-green'); await mkdir(target,{mode:0o700});
  const archive=hostCmd('git',['archive','--format=tar',config.BASE,'--','lib','worker','scripts','test','db','config',
    config.bootstrap.path,...config.rootFiles],33554432);
  hostCmd('tar',['-xf','-','-C',target],65536,archive);
  await pinned(target,config.bootstrap);
  for(const e of index.entries) {
    const destination=join(target,e.path), admitted=await pinned(workspace,{...e.after,path:e.dataPath});
    if(e.before) {
      const old=await readFile(destination);
      need((await lstat(destination)).isFile()&&old.length===e.before.bytes&&gitBlob(old)===e.before.blob);
    } else await existsAbsent(destination);
    await mkdir(dirname(destination),{recursive:true});
    await writeFile(destination,admitted,{flag:e.before?'w':'wx'});
  }
  await symlink(join(workspace,'node_modules'),join(target,'node_modules'),'dir');
  await writeFile(join(target,'c2-source-custody-guard.mjs'),files.guard,{flag:'wx'});
  await writeFile(join(target,'c2-source-custody-preflight.mjs'),files.preflight,{flag:'wx'});
}
let previous = new Map();
async function probeMap() {
  const dir=join(target,'custody-probes');
  let names;
  try{const stat=await lstat(dir);need(stat.isDirectory()&&stat.uid===uid&&stat.gid===gid,'CUSTODY_INVALID');names=await readdir(dir);}
  catch(e){if(e.code==='ENOENT')return new Map();throw e;}
  need(names.length<=8 && names.every(n=>/^[1-9][0-9]*\.json$/.test(n)),'CUSTODY_INVALID');
  const map=new Map();
  for(const name of names.sort()) {
    const path=join(dir,name), stat=await lstat(path), h=await adapters.readProbe(path);
    const last=await lstat(path);
    need(stat.dev===last.dev&&stat.ino===last.ino&&stat.size===last.size&&stat.ctimeMs===last.ctimeMs,'CUSTODY_INVALID');
    map.set(name,[last.dev,last.ino,h]);
  }
  return map;
}
async function checkedLaunch(args,limit) {
  const prior=await probeMap();
  need(adapters.same([...prior],[...previous]),'CUSTODY_INVALID');
  const env={PATH:parentEnv.PATH,HOME:temp,TMPDIR:temp,RUNNER_TEMP:temp,XDG_CACHE_HOME:join(temp,'cache'),
    XDG_CONFIG_HOME:join(temp,'config'),LANG:'C.UTF-8',LC_ALL:'C.UTF-8',CI:'true',NODE_ENV:'test',
    AFW_C2_DROP_WINNER:'1',AFW_C2_QA_TRANSPORT:'unverified',AFW_C2_M_TRANSPORT:'unverified',
    GITHUB_SHA:context.head,GITHUB_REPOSITORY:config.repo,AFW_C2_DIAG_ROOT:target,
    AFW_C2_DIAG_PARENT_UID:String(uid),AFW_C2_DIAG_PARENT_GID:String(gid)};
  const child=spawnSync('sudo',['-n','/usr/bin/env','-i',...Object.entries(env).map(([k,v])=>k+'='+v),
    'unshare','--net','/bin/sh','-c','uid="$1"; gid="$2"; shift 2; ip link set lo up && exec /usr/bin/setpriv --reuid "$uid" --regid "$gid" --clear-groups --no-new-privs "$@"',
    'c2-source',String(uid),String(gid),node,'--import',join(target,'c2-source-custody-guard.mjs'),...args],
    {cwd:target,env,encoding:null,maxBuffer:1048576,timeout:remain(limit),stdio:['ignore','pipe','pipe']});
  const after=await probeMap();
  for(const [key,v] of prior)need(adapters.same(after.get(key),v),'CUSTODY_INVALID');
  const fresh=adapters.freshProbes([...prior.keys()],[...after.keys()]);
  previous=after;
  return {child,fresh};
}
const checks={parentNonRoot:false,preflightOwned:false,preflightRemoved:false,uidGidGroupsLoopbackMatched:false,
  targetsBeforeMatched:false,targetsAfterMatched:false,journalOwnershipMatched:false,ownRootVerified:false,ownTempRemoved:false};
try {
  const e=process.env;
  need(process.argv.length===2&&process.version==='v22.23.4'&&Number.isSafeInteger(uid)&&uid>0&&Number.isSafeInteger(gid)&&gid>=0);
  need(e.GITHUB_REPOSITORY===config.repo&&e.GITHUB_EVENT_NAME==='push'&&e.GITHUB_REF==='refs/heads/'+config.branch
    &&e.GITHUB_JOB===config.job&&e.GITHUB_RUN_ATTEMPT==='1'&&/^[1-9][0-9]{0,19}$/.test(e.GITHUB_RUN_ID??'')
    &&/^[0-9a-f]{40}$/.test(e.GITHUB_SHA??'')&&e.RUNNER_TEMP&&root===await realpath(root)
    &&workspace===resolve(e.GITHUB_WORKSPACE??'')&&fileURLToPath(import.meta.url)===join(workspace,config.runner));
  need(gitText('rev-parse','HEAD')===e.GITHUB_SHA&&gitText('rev-parse','HEAD^')===config.BASE&&
    gitText('rev-parse',config.BASE+'^{tree}')===config.TREE&&gitText('show','-s','--format=%B','HEAD')===config.message);
  const tree=gitText('rev-parse','HEAD^{tree}');need(/^[0-9a-f]{40}$/.test(tree));
  const files={};for(const [key,pin]of Object.entries(pins))files[key]=await pinned(workspace,pin);
  const selection=JSON.parse(files.selection), index=JSON.parse(files.index);
  need(digest(Buffer.from(JSON.stringify(selection)))===config.selectHash&&index.entries.length===13
    &&index.context.baselineSource===config.BASE&&index.context.baselineTree===config.TREE
    &&index.context.repository===config.repo&&index.context.status==='SOURCE_TESTS_PENDING');
  for(const [i,entry] of index.entries.entries())need(entry.dataPath===(i>=8&&i<=10?"docs/superpowers/source-lab/c2-t1-drop-winner-diag4/":'docs/superpowers/source-lab/c2-t1/')+'body-'+String(i).padStart(2,'0')+'.txt');
  need(JSON.stringify(index.caseMap.map(x=>x.id))===JSON.stringify(selection.selected)&&selection.selected.length===20);
  const lock=await readFile(join(workspace,'package-lock.json'));
  need(lock.equals(hostCmd('git',['show',config.BASE+':package-lock.json']))&&JSON.parse(lock).packages?.['node_modules/@cloudflare/workers-oauth-provider']?.version==='1.2.1');
  adapters=await import('../c2-t1-drop-winner-diag4/collection-adapters.mjs');
  context={repository:config.repo,baselineSource:config.BASE,baselineTree:config.TREE,sourceIndexBlob:pins.index.blob,
    proposalIndexHash:pins.index.sha256,selectionHash:config.selectHash,head:e.GITHUB_SHA,tree,runId:e.GITHUB_RUN_ID,
    runAttempt:1,job:config.job,node:process.version};
  checks.parentNonRoot=true;
  phase='materialize';
  temp=await mkdtemp(join(root,'afw-green20-')); tempInitial=await lstat(temp);
  need(dirname(temp)===root&&tempInitial.isDirectory()&&tempInitial.uid===uid&&tempInitial.gid===gid);
  await materialize(index,files);
  await adapters.installSiblings(target,selection,files.driver,files.recorder);
  phase='preflight';
  const pf=await checkedLaunch([join(target,'c2-source-custody-preflight.mjs')],10000);
  pfCount=pf.fresh;
  need(!pf.child.error&&pf.child.signal===null&&pf.child.status===0&&
    pf.child.stdout?.equals(Buffer.from('AFW_C2_OAUTH_PREFLIGHT {"schema":"afw.c2-oauth-preflight.v1","written":true}\n'))&&pf.child.stderr?.length===0);
  const pd=join(target,'preflight-owned'),probe=join(pd,'probe'),st=await lstat(probe);
  need((await lstat(pd)).isDirectory()&&await realpath(probe)===probe&&st.isFile()&&st.nlink===1&&st.uid===uid&&st.gid===gid&&
    st.size===15&&(await readFile(probe)).equals(Buffer.from('C2_OAUTH_OWNED\n')));
  checks.preflightOwned=true;await rm(pd,{recursive:true,force:false});await existsAbsent(pd);checks.preflightRemoved=true;

  phase='materialize';
  const labFiles={'tool-child.mjs':'toolChild','model.mjs':'model','native-controls.mjs':'nativeTool','differential.mjs':'differential','scenarios-63.json':'oracle63','scenarios.json':'oracle59','check-scenarios.mjs':'suite','selection.json':'selection','old-adapter.mjs':'prevAdapter','new-adapter.mjs':'adapters','read-progress.mjs':'reader'};
  for(const [name,k] of Object.entries(labFiles))await writeFile(join(target,name),files[k],{flag:'wx',mode:0o600});
  beforeHashes=await adapters.measureTargets(target,index.entries);
  phase='green';const run=await checkedLaunch(['--experimental-vm-modules','tool-child.mjs'],180000);greenCount=run.fresh;
  need(!run.child.error&&run.child.status===0&&run.child.signal===null&&run.child.stdout?.length<=1048576&&run.child.stderr?.length<=65536);
  phase='materialize';afterHashes=await adapters.measureTargets(target,index.entries);need(adapters.same(beforeHashes,afterHashes));
  const path=join(target,'drop-child.json'),st=await lstat(path);need(st.isFile()&&st.nlink===1&&st.size<=2048&&st.mode%512===384&&st.uid===uid&&st.gid===gid&&await realpath(path)===path);
  const raw=await readFile(path,'utf8'),v=JSON.parse(raw);
  need(raw===JSON.stringify(v)+'\n'&&JSON.stringify(Object.keys(v))===JSON.stringify(['modelPass','modelFailed','compiler','distinctSites','nativeControls','differential','unsupported']));
  const sites=["S01:247","S00:743","S04:37","S04:43","S01:69","S01:95"];
  need(Number.isInteger(v.modelPass)&&v.modelPass>=0&&v.modelPass<=63&&(v.modelFailed===null||v.modelFailed===v.modelPass+1)&&
    ['PENDING','PASS'].includes(v.compiler)&&Array.isArray(v.distinctSites)&&v.distinctSites.length<=6&&new Set(v.distinctSites).size===v.distinctSites.length&&v.distinctSites.every(x=>sites.includes(x))&&
    [0,16].includes(v.nativeControls)&&[0,14].includes(v.differential)&&[null,'MODEL','DIFFERENTIAL','COMPILER','NATIVE_WIRE'].includes(v.unsupported));
  need(v.unsupported!==null||(v.modelPass===63&&v.modelFailed===null&&v.compiler==='PASS'&&v.distinctSites.length>=2&&v.nativeControls===16&&v.differential===14));
  observation=v;
} catch(error) {
  fault={phase,reason:valid[phase].includes(error?.code)?error.code:valid[phase][0]};
} finally {
  if(temp) {
    try {
      phase='cleanup';
      const s=await lstat(temp);
      need(tempInitial&&dirname(temp)===root&&await realpath(temp)===temp&&s.isDirectory()&&
        s.dev===tempInitial.dev&&s.ino===tempInitial.ino&&s.uid===uid&&s.gid===gid);
      checks.ownRootVerified=true;await rm(temp,{recursive:true,force:false});await existsAbsent(temp);checks.ownTempRemoved=true;
    } catch {fault={phase:'cleanup',reason:'CLEANUP_INVALID'};}
  }
}
if(!fault){
 try{
   const artifact={schema:'AFW.C2.DROP_WINNER_TOOLS/1',head:context.head,tree:context.tree,runId:context.runId,attempt:1,stage:observation.unsupported?'UNSUPPORTED':'TOOLING_ONLY',controls:observation,
     fixture59:pins.oracle59.blob,fixture63:pins.oracle63.blob,sourceIndex:pins.index.blob,preflightProcesses:pfCount,toolProcesses:greenCount,targetHashesRechecked:true,ownedTempRemoved:checks.ownTempRemoved,
     SourceQualified:false,Task1Pass:false,nonclaims:flags};
   const out=join(workspace,config.artifact),bytes=Buffer.from(JSON.stringify(artifact)+'\n');
   need(bytes.length<=4096&&Date.now()<end);await mkdir(dirname(out),{recursive:true});need(await realpath(dirname(out))===dirname(out));
   await writeFile(out,bytes,{flag:'wx',mode:0o600});need((await readFile(out)).equals(bytes));
   console.log(artifact.stage);
 }catch{fault={phase:'publish',reason:'PUBLICATION_INVALID'};}
}
if(fault){console.error('DROP_TOOLING_FAULT '+fault.phase);process.exitCode=1;}
