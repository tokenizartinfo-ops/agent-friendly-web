const C={"repo":"tokenizartinfo-ops/agent-friendly-web","base":"6791ce1bab9372e206d3c7b42b3e1394dc6e0c68","baseTree":"62e78926635d6b74f288d6c0d69e0f2516306989","branch":"lab/afw-c2-source-20261117-first-failure-diag2-toy","workflow":".github/workflows/afw-c2-first-failure-diag2-toy.yml","message":"AFW-C2-FIRST-FAILURE-POST-DIAG2-TOY-ONEUSE-20261117","job":"c2-first-failure-diag2-toy","node":"v22.23.4","paths":["docs/superpowers/source-lab/c2-first-failure-post-diag2-toy/toy.mjs","docs/superpowers/source-lab/c2-first-failure-post-diag2-toy/expected.json","docs/superpowers/source-lab/c2-first-failure-post-diag2-toy/proof.schema.json",".github/workflows/afw-c2-first-failure-diag2-toy.yml","docs/superpowers/source-lab/c2-first-failure-post-diag2-toy/run-toy.mjs"],"output":"output/c2-first-failure-post-diag2-toy-proof.json","pins":[{"path":"docs/superpowers/source-lab/c2-first-failure-post-diag2-toy/toy.mjs","bytes":1628,"sha256":"988b241402d628d86c1a2513af80ba14be22540cc2c97925e8e81837f4ee5d69","gitBlob":"559b4c3480c3a404a41a180ae2a8dfa6afe9ade5"},{"path":"docs/superpowers/source-lab/c2-first-failure-post-diag2-toy/expected.json","bytes":39555,"sha256":"bbb2070d49b21ab9d4f19f95421ff00d147be465e10e5e40909368704dae281d","gitBlob":"e8bef167b07052e5b4274b7d9fbe5f3b2301cb54"},{"path":"docs/superpowers/source-lab/c2-first-failure-post-diag2-toy/proof.schema.json","bytes":9501,"sha256":"6bc487ec1dadaa80ab20a8f84abeb590ceeefde762502749728d9b1167f06246","gitBlob":"050f58f2d3221419c751ff1c8d0a8757dfdf270f"},{"path":".github/workflows/afw-c2-first-failure-diag2-toy.yml","bytes":1445,"sha256":"c5671a683cabb858d55669808fec771f86a7d84f92044135410b339da610c5ff","gitBlob":"85d677764a3176839a23cdc95aa7568a78869c9e"}]};
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFile,writeFile,lstat,realpath,mkdtemp,mkdir,chmod,rm} from 'node:fs/promises';
import {resolve,join,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const entered=performance.now(),deadline=entered+10000;
const workspace=resolve(process.cwd()),node=process.execPath;
let phase='admission',temp=null,tempIdentity=null,context=null,fault=null,result=null,inputs;
const flags={historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
const sha=b=>createHash('sha256').update(b).digest('hex');
const gitBlob=b=>createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex');
const need=(ok,code)=>{if(!ok)throw Object.assign(new Error(code),{code});};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const remain=limit=>{const r=Math.floor(deadline-performance.now());need(r>0,'TOY_TIMEOUT');return Math.min(r,limit);};
const text=b=>new TextDecoder('utf-8',{fatal:true}).decode(b);
const hostEnv={PATH:dirname(node)+':/usr/bin:/bin',LANG:'C.UTF-8',LC_ALL:'C.UTF-8'};
function git(...args){
 const r=spawnSync('git',args,{cwd:workspace,env:hostEnv,encoding:null,timeout:remain(2000),maxBuffer:8192,stdio:['ignore','pipe','pipe']});
 need(!r.error&&r.signal===null&&r.status===0&&Buffer.isBuffer(r.stdout)&&r.stdout.length<=8192&&Buffer.isBuffer(r.stderr)&&r.stderr.length===0,'GIT_CONTEXT_INVALID');
 return text(r.stdout).trim();
}
async function measured(path,pin){
 const absolute=resolve(workspace,path);
 need(absolute.startsWith(workspace+sep)&&await realpath(absolute)===absolute,'INPUT_PATH_INVALID');
 const a=await lstat(absolute),b=await readFile(absolute),z=await lstat(absolute);
 need(a.isFile()&&a.nlink===1&&z.isFile()&&z.nlink===1&&a.dev===z.dev&&a.ino===z.ino&&a.size===z.size&&a.mtimeMs===z.mtimeMs&&a.ctimeMs===z.ctimeMs&&b.length===a.size,'INPUT_STABILITY_INVALID');
 const h={path,bytes:b.length,sha256:sha(b),gitBlob:gitBlob(b)};
 if(pin)need(h.bytes===pin.bytes&&h.sha256===pin.sha256&&h.gitBlob===pin.gitBlob,'INPUT_PIN_INVALID');
 return {h,b};
}
// A narrow observer of this exact synthetic toy, never a Source collector/parser.
function observe(child,expected){
 need(!child.error&&child.signal===null&&child.status===1,'CHILD_EXIT_INVALID');
 need(Buffer.isBuffer(child.stdout)&&child.stdout.length>0&&child.stdout.length<=16384&&Buffer.isBuffer(child.stderr)&&child.stderr.length===0,'CHILD_STREAM_INVALID');
 const raw=text(child.stdout);
 need(Buffer.from(raw).equals(child.stdout)&&raw.endsWith('\n')&&!raw.includes('\r')&&!raw.startsWith('\ufeff'),'TOY_UTF8_INVALID');
 const lines=raw.slice(0,-1).split('\n');
 need(lines[0]==='TAP version 13','TOY_HEADER_INVALID');
 const sourceIndices=[],sourceRows=[];
 for(let i=0;i<lines.length;i++)if(lines[i].startsWith('# C2SOURCE ')){
  const value=lines[i].slice(11),row=JSON.parse(value);
  need(JSON.stringify(row)===value,'SOURCE_CANONICAL_INVALID');
  sourceIndices.push(i+1);sourceRows.push(row);
 }
 need(same(sourceRows,expected.expectedSourceRows),'SOURCE_ROWS_INVALID');
 const nativeCases=[];let started=null,target=null;
 for(let i=1;i<lines.length;i++){
  const line=lines[i];
  if(line.startsWith('# Subtest: ')){
   need(started===null&&line.slice(11)===expected.selected[nativeCases.length],'TOY_SUBTEST_INVALID');
   started={id:line.slice(11),line:i+1};
  }else if(/^(?:not )?ok\b/.test(line)){
   const m=/^(not )?ok ([1-9]\d*) - (C2T1_[A-Z_]+)$/.exec(line),ordinal=nativeCases.length+1;
   need(m&&started&&m[2]===String(ordinal)&&m[3]===started.id&&m[3]===expected.selected[ordinal-1],'TOY_RESULT_INVALID');
   need(lines[i+1]==='  ---','TOY_DETAILS_INVALID');
   let end=i+2;while(end<lines.length&&lines[end]!=='  ...')end++;
   need(end<lines.length,'TOY_DETAILS_INVALID');
   const block=lines.slice(i+2,end);
   need(block.every(v=>v===''||v.startsWith('  ')),'TOY_DETAILS_INVALID');
   const status=m[1]?'fail':'pass';nativeCases.push({id:m[3],status});
   if(ordinal===12){
    const one=key=>{const found=block.map((v,j)=>({v,line:i+3+j})).filter(x=>x.v.startsWith('  '+key+':'));need(found.length===1,'TOY_ASSERTION_AMBIGUOUS');return found[0];};
    const scalar=key=>{const v=one(key),m=new RegExp('^  '+key+': ([1-9][0-9]*)$').exec(v.v);need(m&&Number.isSafeInteger(Number(m[1]))&&String(Number(m[1]))===m[1],'TOY_ASSERTION_SCALAR_INVALID');return Number(m[1]);};
    const string=key=>{const v=one(key),m=new RegExp('^  '+key+": '([^']+)'$").exec(v.v);need(m,'TOY_ASSERTION_STRING_INVALID');return m[1];};
    const assertion={ordinal,id:m[3],failureType:string('failureType'),code:string('code'),name:string('name'),actual:scalar('actual'),expected:scalar('expected'),operator:string('operator')};
    need(same(assertion,expected.expectedAssertion),'TOY_ASSERTION_INVALID');
    target={assertion,layout:{sourceRowLine:sourceIndices[11],subtestLine:started.line,resultLine:i+1,diagnosticStartLine:i+2,diagnosticEndLine:end+1,expectedLine:one('expected').line,actualLine:one('actual').line,operatorLine:one('operator').line}};
   }
   started=null;i=end;
  }else need(!/^[ \t]+(?:# Subtest: |(?:not )?ok )/.test(line),'TOY_NESTED_INVALID');
 }
 need(started===null&&same(nativeCases,expected.expectedNativeCases)&&target,'TOY_CASES_INVALID');
 need(lines.filter(v=>v==='1..20').length===1&&lines.filter(v=>/^1\.\./.test(v)).length===1,'TOY_PLAN_INVALID');
 const totals={};
 for(const key of Object.keys(expected.expectedTotals)){
  const found=lines.filter(v=>v.startsWith('# '+key+' '));
  need(found.length===1&&new RegExp('^# '+key+' (0|[1-9][0-9]*)$').test(found[0]),'TOY_TOTALS_INVALID');
  totals[key]=Number(found[0].slice(key.length+3));
 }
 need(same(totals,expected.expectedTotals)&&lines.filter(v=>/^# duration_ms (0|[1-9][0-9]*)(?:\.[0-9]+)?$/.test(v)).length===1,'TOY_TOTALS_INVALID');
 return {raw,facts:{nativeCases,sourceRows,totals,assertion:target.assertion},layout:target.layout};
}
try{
 need(process.platform==='linux'&&process.version===C.node&&process.getuid()>0,'RUNTIME_INVALID');
 need(process.env.GITHUB_ACTIONS==='true'&&process.env.GITHUB_REPOSITORY===C.repo&&process.env.GITHUB_EVENT_NAME==='push'&&process.env.GITHUB_REF==='refs/heads/'+C.branch&&process.env.GITHUB_RUN_ATTEMPT==='1'&&process.env.GITHUB_JOB===C.job&&/^[1-9][0-9]*$/.test(process.env.GITHUB_RUN_ID??'')&&/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA??''),'NOMINATION_INVALID');
 need(git('rev-parse','HEAD')===process.env.GITHUB_SHA&&git('log','-1','--format=%B')===C.message,'HEAD_INVALID');
 const chain=git('rev-list','--parents','-n','1','HEAD').split(' ');
 need(chain.length===2&&chain[1]===C.base&&git('rev-parse',C.base+'^{tree}')===C.baseTree,'PARENT_INVALID');
 const origin=git('config','--get','remote.origin.url');
 need(origin==='https://github.com/'+C.repo||origin==='https://github.com/'+C.repo+'.git','ORIGIN_INVALID');
 need(git('status','--porcelain','--untracked-files=no')==='','WORKTREE_INVALID');
 context={repository:C.repo,baseline:C.base,baselineTree:C.baseTree,branch:C.branch,workflow:C.workflow,message:C.message,head:chain[0],tree:git('rev-parse','HEAD^{tree}'),runId:process.env.GITHUB_RUN_ID,runAttempt:1,job:C.job,node:process.version};
 need(/^[a-f0-9]{40}$/.test(context.tree)&&fileURLToPath(import.meta.url)===resolve(workspace,C.paths[4]),'RUNNER_PATH_INVALID');
 const loaded=[];
 for(const pin of C.pins){need(git('ls-files','--error-unmatch',pin.path)===pin.path,'TRACKED_INPUT_INVALID');loaded.push(await measured(pin.path,pin));}
 need(git('ls-files','--error-unmatch',C.paths[4])===C.paths[4],'TRACKED_INPUT_INVALID');
 loaded.push(await measured(C.paths[4]));
 inputs=loaded.map(v=>v.h);
 const expected=JSON.parse(text(loaded[1].b));
 need(expected.schema==='afw.c2-first-failure-post-diag2-toy-expected.v1'&&expected.toyBytes===inputs[0].bytes&&expected.toySha256===inputs[0].sha256,'FIXTURE_INVALID');
 JSON.parse(text(loaded[2].b));
 phase='literal-controls';
 const fixtureControls=[];
 for(const control of expected.controls){
  let accepted=false;try{observe({status:control.exitCode,signal:null,stdout:Buffer.from(control.stdoutUtf8),stderr:Buffer.alloc(0)},expected);accepted=true;}catch{}
  need(accepted===(control.want==='ACCEPT'),'LITERAL_CONTROL_FAILED');
  fixtureControls.push({id:control.id,status:'pass'});
 }
 phase='owned-toy';
 const rawRoot=process.env.RUNNER_TEMP;
 need(typeof rawRoot==='string'&&rawRoot.length>1,'TEMP_ROOT_INVALID');
 const root=await realpath(resolve(rawRoot)),rootStat=await lstat(root);
 need(rootStat.isDirectory(),'TEMP_ROOT_INVALID');
 temp=await mkdtemp(join(root,'afw-first-failure-diag2-toy-'));
 await chmod(temp,0o700);tempIdentity=await lstat(temp);
 need(dirname(temp)===root&&await realpath(temp)===temp&&tempIdentity.isDirectory()&&tempIdentity.uid===process.getuid()&&tempIdentity.gid===process.getgid(),'TEMP_OWNERSHIP_INVALID');
 const childPath=join(temp,'toy.mjs');
 await writeFile(childPath,loaded[0].b,{flag:'wx',mode:0o600});
 need((await readFile(childPath)).equals(loaded[0].b),'TOY_COPY_INVALID');
 const env={PATH:hostEnv.PATH,HOME:temp,TMPDIR:temp,RUNNER_TEMP:temp,LANG:'C.UTF-8',LC_ALL:'C.UTF-8',NODE_ENV:'test'};
 const childEntered=performance.now();
 const child=spawnSync(node,['--test','--test-reporter=tap','--test-concurrency=1',childPath],{cwd:temp,env,encoding:null,timeout:remain(10000),maxBuffer:16384,stdio:['ignore','pipe','pipe']});
 const childElapsedMs=Math.floor(performance.now()-childEntered);
 phase='actual-toy-observation';
 const observed=observe(child,expected);
 need((await readFile(childPath)).equals(loaded[0].b),'TOY_COPY_INVALID');
 for(let i=0;i<C.paths.length;i++)need(same((await measured(C.paths[i],inputs[i])).h,inputs[i]),'INPUT_DRIFT');
 need(git('status','--porcelain','--untracked-files=no')==='','WORKTREE_INVALID');
 result={fixtureControls,capture:{exitCode:child.status,signal:'none',errorKind:'none',stdout:{bytes:child.stdout.length,sha256:sha(child.stdout)},stderr:{bytes:0,sha256:sha(child.stderr)}},rawTAP:observed.raw,facts:observed.facts,layout:observed.layout,childElapsedMs};
}catch(error){fault={phase,code:typeof error?.code==='string'&&/^[A-Z_]+$/.test(error.code)?error.code:'TOY_PACKET_INVALID'};}
finally{
 if(temp){
  try{
   const s=await lstat(temp);
   need(tempIdentity&&s.isDirectory()&&await realpath(temp)===temp&&s.dev===tempIdentity.dev&&s.ino===tempIdentity.ino&&s.uid===process.getuid()&&s.gid===process.getgid(),'TEMP_CLEANUP_INVALID');
   await rm(temp,{recursive:true,force:false});
   let absent=false;try{await lstat(temp);}catch(e){absent=e.code==='ENOENT';}
   need(absent,'TEMP_CLEANUP_INVALID');
  }catch{fault={phase:'cleanup',code:'TEMP_CLEANUP_INVALID'};}
 }
}
if(!fault){
 try{
  phase='publication';
  const parentElapsedMs=Math.floor(performance.now()-entered);
  need(result&&parentElapsedMs<=10000,'TOY_TIMEOUT');
  const proof={schema:'afw.c2-first-failure-post-diag2-toy-proof.v1',context,inputs,fixtureControls:result.fixtureControls,capture:result.capture,rawTAP:result.rawTAP,facts:result.facts,layout:result.layout,timing:{parentElapsedMs,childElapsedMs:result.childElapsedMs},cleanup:{ownedTempIdentityVerified:true,ownTempRemoved:true},toyExecuted:true,SourceCollectorExecuted:false,SourceBusinessExecuted:false,SourceQualified:false,Task1Pass:false,nonclaims:flags};
  const payload=Buffer.from(JSON.stringify(proof)+'\n');
  need(payload.length<=24576&&Buffer.from(proof.rawTAP).length===proof.capture.stdout.bytes&&sha(Buffer.from(proof.rawTAP))===proof.capture.stdout.sha256,'PROOF_SIZE_OR_RAW_INVALID');
  const destination=resolve(workspace,C.output),out=dirname(destination);
  need(destination.startsWith(workspace+sep),'OUTPUT_PATH_INVALID');
  await mkdir(out,{recursive:true});
  need(await realpath(out)===out,'OUTPUT_PATH_INVALID');
  await writeFile(destination,payload,{flag:'wx',mode:0o600});
  need((await readFile(destination)).equals(payload)&&performance.now()<deadline,'PUBLICATION_INVALID');
  process.stdout.write('AFW_C2_FIRST_FAILURE_POST_DIAG2_TOY_PROOF '+payload.toString('utf8'));
 }catch{fault={phase:'publication',code:'PUBLICATION_INVALID'};}
}
if(fault){
 process.exitCode=1;
 process.stderr.write('AFW_C2_FIRST_FAILURE_POST_DIAG2_TOY_FAULT '+JSON.stringify({schema:'afw.c2-first-failure-post-diag2-toy-fault.v1',phase:fault.phase,code:fault.code,SourceCollectorExecuted:false,SourceBusinessExecuted:false,SourceQualified:false,Task1Pass:false,nonclaims:flags})+'\n');
}
