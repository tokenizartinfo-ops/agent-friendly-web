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
  "branch": "lab/afw-c2-get-winner-20261117-fixtures",
  "message": "AFW-C2-GET-WINNER-FIXTURES-ONEUSE-20261117",
  "job": "c2-get-winner-fixtures",
  "runner": "docs/superpowers/source-lab/c2-get-winner-dependent/run-get-winner-red.mjs",
  "prefix": "docs/superpowers/source-lab/c2-get-winner-dependent/",
  "artifact": "output/get-winner-red.json",
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
  "child": {
    "path": "docs/superpowers/source-lab/c2-get-winner-dependent/native-red-child.mjs",
    "blob": "faa9e8250f3afd65f187342cc4280e23fc482af1",
    "bytes": 4703,
    "sha256": "9ae7283a10cf5fb7b68ac28d35e1c0c108dc3434ca4638bf8ce824117f322c22"
  },
  "fixtureIndex": {
    "path": "docs/superpowers/source-lab/c2-get-winner-dependent/fixture-index.json",
    "blob": "eefd23a6f730a830a1d2e537c12abf25fb5baded",
    "bytes": 5692,
    "sha256": "7e00829424196e1faa5c13299545130d1464f63ae23e08c9c70a46eb45fdf513"
  }
};
const flags={"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false};

const workspace=resolve(process.cwd()), node=process.execPath, uid=process.getuid(),gid=process.getgid();
const root=resolve(process.env.RUNNER_TEMP??''), parentEnv={PATH:dirname(node)+':/usr/bin:/bin:/usr/sbin:/sbin',HOME:root,LANG:'C.UTF-8',LC_ALL:'C.UTF-8'};
let phase='admission', context=null, fault=null, temp=null, tempInitial=null, target=null, adapters=null;
let beforeHashes, afterHashes, expected, observation, pfCount, redCount;
const valid={admission:['ADMISSION_INVALID'],materialize:['MATERIALIZATION_INVALID','TARGET_DRIFT'],
  preflight:['PREFLIGHT_INVALID','CUSTODY_INVALID'],red:['LAUNCH_INVALID','CUSTODY_INVALID','CAPTURE_INVALID'],
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
  target=join(temp,'get-red'); await mkdir(target,{mode:0o700});
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
  const index = JSON.parse(files.index);
  need(index.entries.length === 13 && index.context.baselineSource === config.BASE &&
    index.context.baselineTree === config.TREE && index.context.repository === config.repo);
  const fixtureIndex = JSON.parse(files.fixtureIndex);
  need(fixtureIndex.total === 315 && fixtureIndex.sections.length === 4);
  for (const entry of fixtureIndex.edges) await pinned(workspace, entry);
  const lock = await readFile(join(workspace, 'package-lock.json'));
  need(gitBlob(lock) === '36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b' && lock.equals(hostCmd('git',['show',config.BASE+':package-lock.json'])));
  adapters = await import('../c2-t1-drop-winner-diag4/collection-adapters.mjs');
  context = {head:e.GITHUB_SHA, tree, runId:e.GITHUB_RUN_ID};
  checks.parentNonRoot=true;
  phase='materialize';
  temp=await mkdtemp(join(root,'afw-get-red-')); tempInitial=await lstat(temp);
  need(dirname(temp)===root&&tempInitial.isDirectory()&&tempInitial.uid===uid&&tempInitial.gid===gid);
  await materialize(index,files);
  phase='preflight';
  const pf=await checkedLaunch([join(target,'c2-source-custody-preflight.mjs')],10000);
  pfCount=pf.fresh;
  need(!pf.child.error&&pf.child.signal===null&&pf.child.status===0&&
    pf.child.stdout?.equals(Buffer.from('AFW_C2_OAUTH_PREFLIGHT {"schema":"afw.c2-oauth-preflight.v1","written":true}\n'))&&pf.child.stderr?.length===0);
  const pd=join(target,'preflight-owned'),probe=join(pd,'probe'),st=await lstat(probe);
  need((await lstat(pd)).isDirectory()&&await realpath(probe)===probe&&st.isFile()&&st.nlink===1&&st.uid===uid&&st.gid===gid&&
    st.size===15&&(await readFile(probe)).equals(Buffer.from('C2_OAUTH_OWNED\n')));
  checks.preflightOwned=true;await rm(pd,{recursive:true,force:false});await existsAbsent(pd);checks.preflightRemoved=true;

  phase = 'materialize';
  await writeFile(join(target,'native-red-child.mjs'), files.child, {flag:'wx',mode:0o600});
  beforeHashes = await adapters.measureTargets(target,index.entries);
  phase = 'red';
  const run = await checkedLaunch(['native-red-child.mjs'],120000);
  redCount = run.fresh;
  need(pfCount === 1 && redCount === 1 && !run.child.error && run.child.status === 41 && run.child.signal === null &&
    run.child.stdout?.length <= 1048576 && run.child.stderr?.length <= 65536);
  phase = 'materialize';
  afterHashes = await adapters.measureTargets(target,index.entries);
  need(adapters.same(beforeHashes,afterHashes));
  const path = join(target,'red-child.json'), redStat = await lstat(path);
  need(redStat.isFile() && redStat.nlink === 1 && redStat.size <= 1024 && redStat.mode % 512 === 384 &&
    redStat.uid === uid && redStat.gid === gid && await realpath(path) === path);
  const raw = await readFile(path,'utf8'), v = JSON.parse(raw);
  need(/^[a-f0-9]{64}$/.test(v.residentSha256) && Number.isSafeInteger(v.residentBytes) && v.residentBytes > 0);
  const expected = {assertion:'AFW_GET_WINNER_EXPECTED_MARKER',actual:null,expected:'g1.413.S.413',
    residentSha256:v.residentSha256,residentBytes:v.residentBytes,dispatched:1,originalActorArrived:true,
    status:413,originalBodyMatched:true,miniflareDisposed:true};
  need(raw === JSON.stringify(expected)+'\n');
  observation = expected;
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
   const artifact = {schema:'AFW.GET_WINNER.RED/1',head:context.head,tree:context.tree,runId:context.runId,
     attempt:1,job:config.job,stage:'EXPECTED_RED',observation,childExit:41,fixtureIndex:pins.fixtureIndex.blob,
     sourceIndex:pins.index.blob,preflightProcesses:pfCount,toolProcesses:redCount,targetHashesRechecked:true,
     ownedTempRemoved:checks.ownTempRemoved,SourceQualified:false,Task1Pass:false,nonclaims:flags};
   const out=join(workspace,config.artifact),bytes=Buffer.from(JSON.stringify(artifact)+'\n');
   need(bytes.length<=4096&&Date.now()<end);await mkdir(dirname(out),{recursive:true});need(await realpath(dirname(out))===dirname(out));
   await writeFile(out,bytes,{flag:'wx',mode:0o600});need((await readFile(out)).equals(bytes));
   console.error('AFW_GET_WINNER_EXPECTED_MARKER');
   process.exitCode = 41;
 } catch { fault={phase:'publish',reason:'PUBLICATION_INVALID'}; }
}
if (fault) { console.error('GET_RED_PREREQUISITE '+fault.phase+' '+fault.reason); process.exitCode = 1; }
