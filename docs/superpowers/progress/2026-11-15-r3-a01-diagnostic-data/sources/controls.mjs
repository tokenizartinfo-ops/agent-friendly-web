// Round1 controls-only: no production main/Native/readonly CLI imports or calls.
import {readFileSync,writeFileSync,mkdirSync,mkdtempSync,chmodSync,unlinkSync,renameSync,symlinkSync,linkSync,rmSync,realpathSync,openSync,closeSync,statSync,fstatSync,lstatSync,readdirSync,constants} from 'node:fs';
import {join,dirname,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {performance} from 'node:perf_hooks';
import {gzipSync} from 'node:zlib';
function entryPin(bytes){const zipped=gzipSync(bytes,{level:9,mtime:0}),hash=b=>createHash('sha256').update(b).digest('hex');return{bytes:bytes.length,sha256:hash(bytes),zipBytes:zipped.length,zipSha256:hash(zipped),data:zipped.toString('base64'),cap:32768};}
function retargetEntries(t){
 const kernel=readFileSync(join(t.own,'lifetime.py'));
 for(const [entry,module]of[['delivery-entry.sh','delivery-outer.mjs'],['controls-entry.sh','controls-outer.mjs'],['missing-cwd-entry.sh','delivery-outer.mjs']]){
  let text=pristine[entry].toString('utf8');
  for(const[key,bytes]of[['_r3_kernel',kernel],['_r3_module',readFileSync(join(t.own,module))]]){
   const lines=text.split('\n').filter(x=>x.startsWith(key+'='));if(lines.length!==1)throw 1;
   text=text.replace(lines[0],key+'='+JSON.stringify(entryPin(bytes)));
  }
  writeFileSync(join(t.own,entry),text,{mode:0o600});
 }
}

import {jsonFixed} from './io.mjs';
import {accepts} from './oracle.mjs';
const controlDeadline=performance.now()+90000;
const admitCase=()=>performance.now()+20000<=controlDeadline;
const e=process.env,home=join(e.RUNNER_TEMP,'afw-r3-delivery'),c=jsonFixed(e.RUNNER_TEMP,['afw-r3-delivery','context.json'],2048);
const matrix=JSON.parse(readFileSync(join(home,'matrix.json'),'utf8')),fixtures=JSON.parse(readFileSync(join(home,'fixtures.json'),'utf8'));
const clone=x=>JSON.parse(JSON.stringify(x)),canary=matrix.privateCanary,names=["io.mjs","emitter.mjs","source-provenance.mjs","raw-sample.mjs","site-schema.json","site-map.json","envelope-schema.json","boundary.py","delivery-schema.json","unavailable-schema.json","controls-schema.json","matrix.json","shape.mjs","control-proof.mjs","site-receiver.mjs","normalized-sample.mjs","witness.mjs","fixtures.json","controls.mjs","examples.json","controls-boundary.py","controls-unavailable-example.json","outer.mjs","delivery-entry.sh","controls-entry.sh","oracle.mjs","lifetime.py","delivery-outer.mjs","controls-outer.mjs","missing-cwd-entry.sh","race-creator.mjs","lifetime-controls.py","authority-anchor.json"],fb={"purpose":"afw.r3-delivery.unavailable.v1","reason":"outer_startup_unavailable","source":"unknown","sourceTree":"unknown","run":"unknown","attempt":"unknown","job":"unknown","node":"unknown","controls":"unknown","availability":"unavailable","sourceQualified":false,"collectionComplete":"unknown","sampleObserved":"unknown","nonclaims":{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}};
const controlsFallback=JSON.parse(pristineUnavailable());
function pristineUnavailable(){return readFileSync(join(home,'controls-unavailable-example.json'),'utf8');}
const ctx={source:c.source,sourceTree:c.sourceTree,run:c.run,attempt:1,job:'readonly',node:'22.23.4'};
const count=matrix.ordered.length;
const report={purpose:'afw.r3-delivery.controls.v1',...ctx,matrixSha256:'0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e',allPassed:false,expected:count,passed:0,failed:0,unknown:count,results:matrix.ordered.map(x=>({id:x.id,result:'unknown'})),mutants:matrix.mutants.map(x=>({id:x.id,expectedFailedIds:x.expectedFailedIds,actualFailedIds:[],result:'unknown'})),nativeBusinessCases:0,nonclaims:clone(fixtures.controlsReport.nonclaims),cleanup:{complete:false,failedInstances:[],unknownInstances:[]}};
const pristine=Object.freeze(Object.fromEntries(names.map(name=>[name,readFileSync(join(home,name))])));
const launcherEntry=pristine['delivery-entry.sh'].toString('utf8'),launcherBegin="<<'AFW_R3_LITERAL_PY'\n",launcherEnd='\nAFW_R3_LITERAL_PY\n';
if(launcherEntry.split(launcherBegin).length!==2||launcherEntry.split(launcherEnd).length!==2)throw 1;
const pristineLauncher=launcherEntry.split(launcherBegin)[1].split(launcherEnd)[0]+'\n';
let sandbox;const live=new Map(),external=new Map();
const put=(p,s)=>writeFileSync(p,s,{mode:0o600,flag:'wx'});
function build(instance){
 if(!sandbox){sandbox=mkdtempSync(join(e.RUNNER_TEMP,'afw-r3-delivery-controls-r1-'));chmodSync(sandbox,0o700);}
 const base=mkdtempSync(join(sandbox,'case-'));live.set(instance,base);
 const cwd=join(base,'work'),temp=join(base,'temp'),own=join(temp,'afw-r3-delivery'),siteRoot=join(temp,'afw-site');
 mkdirSync(cwd,{mode:0o700});mkdirSync(own,{recursive:true,mode:0o700});mkdirSync(siteRoot,{mode:0o700});
 for(const name of names)put(join(own,name),pristine[name]);
 const binding={purpose:'afw.r3-delivery.binding.v1',...ctx};put(join(own,'context.json'),JSON.stringify(binding));
 const proof=clone(fixtures.controlsReport);Object.assign(proof,ctx);put(join(own,'controls-report.json'),JSON.stringify(proof));
 const sample=clone(fixtures.sample);Object.assign(sample,{source:ctx.source,run:ctx.run});sample.sample.inputSeeded=true;sample.sample.seedEntries=201;sample.sample.lists=1;sample.sample.gets=0;sample.sample.nativeInvoked=1;
 const site=clone(fixtures.site);Object.assign(site,{source:ctx.source,sourceTree:ctx.sourceTree,run:ctx.run});
 const sampleDir=join(cwd,'output','finite-budget','readonly','R3');mkdirSync(sampleDir,{recursive:true,mode:0o700});
 const file=join(sampleDir,'r3-existing-sample.json'),siteFile=join(siteRoot,'public-result.json');
 return{base,cwd,temp,own,file,siteFile,sample,site,binding,instance,env:{PATH:e.PATH,HOME:e.HOME,CI:'true',LANG:'C.UTF-8',TZ:'UTC',RUNNER_TEMP:temp,GITHUB_REPOSITORY:'tokenizartinfo-ops/agent-friendly-web',GITHUB_REPOSITORY_ID:'1347578006',GITHUB_REF:'refs/heads/feat/finite-native-cleanup-20261101',GITHUB_SHA:ctx.source,GITHUB_RUN_ID:ctx.run,GITHUB_RUN_ATTEMPT:'1',GITHUB_JOB:'readonly'}};
}
function runRole(t,role,withControl=false){
 if(role!=='case-delivery'||typeof withControl!=='boolean')throw 1;
 const slot='  # A01_CONTROL_SLOT';
 if(pristineLauncher.split(slot).length!==2)throw 1;
 const input=withControl?pristineLauncher.replace(slot,'  os.set_inheritable(5,True)'):pristineLauncher;
 let creator,helper;
 try{
  creator=openSync('/proc/thread-self',constants.O_RDONLY|constants.O_DIRECTORY);helper=openSync(t.own,constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW);
  // Original sync launcher/slots 0..7. Private fd8 closes before Bash. Strict diagnostic aggregate cap.
  return spawnSync('/usr/bin/python3',['-I','-S','-',role],{input,cwd:t.cwd,env:t.env,stdio:['pipe','pipe','pipe',3,creator,'ignore',helper,helper,'pipe'],timeout:5000,killSignal:'SIGKILL',maxBuffer:4096});
 }finally{if(creator!==undefined)closeSync(creator);if(helper!==undefined)closeSync(helper);}
}
function change(t,scenario){
 let raw=null,omitSample=false,omitSite=false,after=()=>{},spools=[];
 const rewrite=(name,content)=>writeFileSync(join(t.own,name),content,{mode:0o600});
 if(scenario==='observed-unknown'||scenario==='not-observed'){t.sample=clone(fixtures.sample);t.sample.source=ctx.source;t.sample.run=ctx.run;if(scenario==='not-observed')t.sample.sampleState='not_observed';}
 if(scenario==='partial-full-provenance'){t.site.stage='unknown';t.site.collectionComplete=false;t.site.readonly.valid=false;t.site.readonly.state='unknown';t.site.readonly.summary=null;}
 if(scenario==='sample-missing')omitSample=true;
 if(scenario==='sample-private-field')t.sample.private=canary;
 if(scenario==='sample-source')t.sample.source='3333333333333333333333333333333333333333';
 if(scenario==='sample-run')t.sample.run='99999';
 if(scenario==='sample-attempt')t.sample.attempt=2;
 if(scenario==='sample-case')t.sample.case='R2';
 if(scenario==='sample-counter-bound')t.sample.sample.nativeInvoked=203;
 if(scenario==='source-missing')omitSite=true;
 if(scenario==='source-private-field')t.site.private=canary;
 if(scenario==='source-context')t.site.run='99999';
 if(scenario==='source-tree')t.site.sourceTree='3333333333333333333333333333333333333333';
 if(scenario==='source-node')t.site.node='22.0.0';
 if(scenario==='source-partial-no-after'){t.site.stage='unknown';t.site.collectionComplete=false;t.site.readonly=null;t.site.usableLocationCount=0;t.site.sourceProof.worldAfterVerified=false;}
 for(const k of ['mapVerified','worldBeforeVerified','nativeBeforeVerified','worldAfterVerified','nativeAfterVerified','originalBodiesUnchanged'])if(scenario==='source-'+k)t.site.sourceProof[k]=false;
 const prog={'verified':'verified','count':'count','set':'setSha256','expanded':'payloadExpandedSha256','core':'coreGitVerified','prefix':'prefixVerified'};
 for(const [suffix,key]of Object.entries(prog))if(scenario==='source-program-'+suffix)t.site.programProof[key]=key==='count'?17:['setSha256','payloadExpandedSha256'].includes(key)?'0'.repeat(64):false;
 if(scenario==='source-controls-passed')t.site.controls.passed=false;
 if(scenario==='source-controls-count')t.site.controls.count=5;
 if(scenario==='source-controls-shape')t.site.controls.usableShape=false;
 if(scenario==='source-pure')t.site.pure.passed=false;
 if(scenario==='source-profile')t.site.profile.passed=false;
 if(scenario==='source-cli-not-started'){t.site.businessCommand={started:false,ended:false,exitCode:null,signal:'none'};t.site.readonly=null;t.site.stage='hold';t.site.collectionComplete=false;t.site.usableLocationCount=0;}
 if(scenario==='source-cli-not-ended'){t.site.businessCommand.ended=false;t.site.businessCommand.exitCode=null;t.site.businessCommand.signal='unknown';t.site.stage='unknown';t.site.collectionComplete=false;t.site.readonly=null;t.site.usableLocationCount=0;}
 raw=JSON.stringify(t.sample)+'\n';
 if(scenario==='sample-missing-lf')raw=raw.slice(0,-1);
 if(scenario==='sample-extra-lf')raw+='\n';
 if(scenario==='sample-noncanonical')raw=raw.replace('{"purpose"', '{ "purpose"');
 if(scenario==='sample-overcap')raw=' '.repeat(4097);
 if(scenario==='sample-duplicate-keys')raw=raw.replace('{"purpose"', '{"attempt":1,"purpose"');
 if(scenario==='sample-invalid-utf8')raw=Buffer.from([0xff,10]);
 if(scenario==='sample-bom')raw=Buffer.concat([Buffer.from([0xef,0xbb,0xbf]),Buffer.from(raw)]);
 if(scenario==='source-bom')t.siteBOM=true;
 if(!omitSample)put(t.file,raw);
 if(!omitSite)put(t.siteFile,(t.siteBOM?'\uFEFF':'')+JSON.stringify(t.site));
 if(scenario==='sample-symlink'){renameSync(t.file,t.file+'.target');symlinkSync(t.file+'.target',t.file);}
 if(scenario==='sample-hardlink')linkSync(t.file,t.file+'.link');
 if(scenario==='sample-fifo'){unlinkSync(t.file);const r=runRole(t,'make-fifo',{timeout:3000});if(r.error||r.status!==0)throw 1;}
 if(scenario==='sample-mode')chmodSync(t.file,0);
 if(scenario==='sample-parent-symlink'){renameSync(dirname(t.file),dirname(t.file)+'-real');symlinkSync(dirname(t.file)+'-real',dirname(t.file));}
 if(scenario==='binding-missing')unlinkSync(join(t.own,'context.json'));
 if(scenario==='binding-unknown-context')t.env.GITHUB_SHA='unknown';
 if(scenario==='source-mode')chmodSync(t.siteFile,0o644);
 if(scenario==='source-symlink'){renameSync(t.siteFile,t.siteFile+'.target');symlinkSync(t.siteFile+'.target',t.siteFile);}
 if(scenario==='stale-marker-public-private-spools'||scenario==='uncreatable-spools'){
  const spool=join(t.temp,'afw-r3-observer');mkdirSync(spool,{mode:0o700});
  const text='AFW_R3_EXISTING_SAMPLE/1 '+JSON.stringify({...t.sample,private:canary})+'\n';
  for(const name of ['collection-public.log','collection-private.log']){const p=join(spool,name);put(p,text);spools.push({path:p,bytes:Buffer.from(text)});}
  if(scenario==='uncreatable-spools'){chmodSync(spool,0o500);const denied=join(t.base,'denied');mkdirSync(denied,{mode:0o000});t.env.TMPDIR=denied;}
 }
 if(scenario==='node-startup-failure')rewrite('emitter.mjs','this is invalid '+canary);
 if(scenario==='node-import-failure')rewrite('emitter.mjs',"import './missing-private-canary-module.mjs';\n");
 if(scenario==='child-private-stdout'){
  const d={purpose:'afw.r3-delivery.result.v1',...ctx,controls:'passed',availability:'available',sourceQualified:true,collectionComplete:true,sampleObserved:true,reason:'none',nonclaims:clone(fixtures.controlsReport.nonclaims),private:canary};
  const envelope={purpose:'afw.r3-delivery.envelope.v1',sample:t.sample,delivery:d};
  rewrite('emitter.mjs','process.stdout.write('+JSON.stringify(JSON.stringify(envelope)+'\n')+');');
 }
 if(scenario==='child-two-lines')rewrite('emitter.mjs',"process.stdout.write('{}\\n{}\\n');");
 if(scenario==='child-oversize-stdout')rewrite('emitter.mjs','process.stdout.write('+JSON.stringify(canary)+'.repeat(2048));');
 if(scenario==='child-oversize-stderr')rewrite('emitter.mjs','process.stderr.write('+JSON.stringify(canary)+'.repeat(2048));');
 if(scenario==='child-truncated')rewrite('emitter.mjs',"process.stdout.write('{\"purpose\":');");
 if(scenario==='child-status-failure-stale-marker')rewrite('emitter.mjs','process.stdout.write('+JSON.stringify('AFW_R3_EXISTING_SAMPLE/1 '+canary+'\n')+');process.exitCode=1;');
 if(scenario==='parent-import-failure')rewrite('boundary.py','import missing_private_canary_import\n');
 if(scenario==='interpreter-failure')rewrite('delivery-outer.mjs',readFileSync(join(t.own,'delivery-outer.mjs'),'utf8').replace("r3Spawn('/usr/bin/python3'","r3Spawn('/unavailable/private-canary-python'"));

 if(scenario.startsWith('proof-')){
  const path=join(t.own,'controls-report.json');if(scenario==='proof-missing')unlinkSync(path);
  else{const r=JSON.parse(readFileSync(path,'utf8'));if(scenario==='proof-false'){r.allPassed=false;r.passed=count-1;r.failed=1;r.unknown=0;r.results=matrix.ordered.map((x,i)=>({id:x.id,result:i===0?'failed':'passed'}));}if(scenario==='proof-context')r.source='3'.repeat(40);if(scenario==='proof-matrixhash')r.matrixSha256='0'.repeat(64);if(scenario==='proof-orderedID')[r.results[0],r.results[1]]=[r.results[1],r.results[0]];writeFileSync(path,JSON.stringify(r),{mode:0o600});}
 }
 if(scenario==='binding-bom'){const path=join(t.own,'context.json');writeFileSync(path,Buffer.concat([Buffer.from([0xef,0xbb,0xbf]),readFileSync(path)]),{mode:0o600});}
 if(['joint-context-executable-substitution','post-admission-context-substitution','current-image-retained'].includes(scenario)){
  const fake=join(t.own,'substitution.sh'),marker=join(t.own,'substitution-executed.marker'),quote=x=>"'"+x.replaceAll("'","'\"'\"'")+"'";
  t.executionMarker=marker;const script="#!/bin/sh\nprintf '%s\\n' "+quote(canary)+" > "+quote(marker)+"\nprintf '%s\\n' "+quote(canary)+"\n";put(fake,script);chmodSync(fake,0o700);
  const ns=statSync(fake,{bigint:true}),bad={...t.binding,nodeExec:fake,nodeIdentity:{dev:String(ns.dev),ino:String(ns.ino),size:String(ns.size),mtimeNs:String(ns.mtimeNs)}};
  if(scenario==='joint-context-executable-substitution')writeFileSync(join(t.own,'context.json'),JSON.stringify(bad),{mode:0o600});
  if(scenario==='post-admission-context-substitution')rewrite('delivery-outer.mjs',readFileSync(join(t.own,'delivery-outer.mjs'),'utf8').replace('// AFW_POST_ADMISSION_CONTROL_HOOK',"r3fs.writeFileSync(base+'/afw-r3-delivery/context.json',"+JSON.stringify(JSON.stringify(bad))+",{mode:0o600});r3fs.renameSync(base+'/afw-r3-delivery/substitution.sh',base+'/afw-r3-delivery/replaced.sh');r3fs.writeFileSync(base+'/afw-r3-delivery/substitution.sh',"+JSON.stringify(script)+",{mode:0o700});"));
  if(scenario==='current-image-retained')rewrite('delivery-outer.mjs',readFileSync(join(t.own,'delivery-outer.mjs'),'utf8').replace('// AFW_POST_ADMISSION_CONTROL_HOOK',"r3fs.renameSync(base+'/afw-r3-delivery/substitution.sh',base+'/afw-r3-delivery/replaced.sh');r3fs.writeFileSync(base+'/afw-r3-delivery/substitution.sh',"+JSON.stringify(script)+",{mode:0o700});"));
 }
 if(scenario==='parent-helper-missing')unlinkSync(join(t.own,'boundary.py'));
 if(scenario==='unset-runner-temp')delete t.env.RUNNER_TEMP;
 if(scenario==='outer-node-startup-failure'){const text=readFileSync(join(t.own,'lifetime.py'),'utf8'),from='os.execve(3,args,dict(os.environ))';if(text.split(from).length!==2)throw 1;rewrite('lifetime.py',text.replace(from,'os.execve(-1,args,dict(os.environ))'));}
 if(scenario==='child-impossible-not-observed'){
  const sample=clone(t.sample);sample.sampleState='not_observed';sample.sample.inputSeeded=true;sample.sample.seedEntries=201;
  const delivery={purpose:'afw.r3-delivery.result.v1',...ctx,controls:'passed',availability:'available',sourceQualified:true,collectionComplete:true,sampleObserved:false,reason:'none',nonclaims:clone(fixtures.controlsReport.nonclaims)};
  rewrite('emitter.mjs','process.stdout.write('+JSON.stringify(JSON.stringify({purpose:'afw.r3-delivery.envelope.v1',sample,delivery})+'\n')+');');
 }
 if(scenario==='delivered-failed-controls-report'||scenario==='prestart-controls-module'){
  const r=clone(fixtures.controlsReport);Object.assign(r,ctx);r.allPassed=false;r.mutants[2].actualFailedIds=['A01','B05'];r.mutants[2].result='failed';t.failedReport=r;
  rewrite('controls.mjs','process.stdout.write('+JSON.stringify(JSON.stringify(r)+'\n')+');process.exitCode=23;');
 }
 if(scenario==='harness-total-budget-expired'){
  const path=join(t.own,'controls.mjs'),text=readFileSync(path,'utf8'),from='\nconst controlDeadline=performance.now()+90000;\n',to='\nconst controlDeadline=performance.now()-1;\n';
  if(text.split(from).length!==2)throw 1;writeFileSync(path,text.replace(from,to),{mode:0o600});unlinkSync(join(t.own,'controls-report.json'));
  const r=clone(fixtures.controlsReport);Object.assign(r,ctx);r.allPassed=false;r.passed=0;r.failed=0;r.unknown=matrix.ordered.length;r.results=matrix.ordered.map(x=>({id:x.id,result:'unknown'}));r.mutants=matrix.mutants.map(x=>({id:x.id,expectedFailedIds:x.expectedFailedIds,actualFailedIds:[],result:'unknown'}));t.failedReport=r;
 }
 if(scenario==='delivery-authority-rewrite'){
  t.site.programProof.count=17;writeFileSync(t.siteFile,JSON.stringify(t.site),{mode:0o600});
  const d={purpose:'afw.r3-delivery.result.v1',...ctx,controls:'passed',availability:'unavailable',sourceQualified:false,collectionComplete:'unknown',sampleObserved:'unknown',reason:'source_invalid',nonclaims:clone(fixtures.controlsReport.nonclaims),private:canary};
  const program="import json\np='/proc/self/fd/6/delivery-schema.json'\ns=json.load(open(p));s['required'].append('private');s['properties']['private']={'enum':["+JSON.stringify(canary)+"]}\nopen(p,'w').write(json.dumps(s,separators=(',',':')))\nprint("+JSON.stringify('AFW_R3_DELIVERY/1 '+JSON.stringify(d))+")\nraise SystemExit(23)\n";
  rewrite('boundary.py',program);
 }
 if(scenario==='report-matrix-authority-rewrite'){
  const r=clone(fixtures.controlsReport);Object.assign(r,ctx);[r.results[0],r.results[1]]=[r.results[1],r.results[0]];r.private=canary;
  const program="import json\np='/proc/self/fd/6/controls-schema.json'\ns=json.load(open(p));s['required'].append('private');s['properties']['private']={'enum':["+JSON.stringify(canary)+"]};open(p,'w').write(json.dumps(s,separators=(',',':')))\np='/proc/self/fd/6/matrix.json'\nm=json.load(open(p));m['ordered'][0],m['ordered'][1]=m['ordered'][1],m['ordered'][0];open(p,'w').write(json.dumps(m,separators=(',',':')))\nprint("+JSON.stringify('AFW_R3_DELIVERY_CONTROLS/1 '+JSON.stringify(r))+")\n";
  rewrite('controls-boundary.py',program);
 }
 if(scenario==='fresh-source-proof-rewrite'){
  const fresh=clone(t.site);t.site.programProof.count=17;writeFileSync(t.siteFile,JSON.stringify(t.site),{mode:0o600});
  const d={purpose:'afw.r3-delivery.result.v1',...ctx,controls:'passed',availability:'available',sourceQualified:true,collectionComplete:true,sampleObserved:true,reason:'none',nonclaims:clone(fixtures.controlsReport.nonclaims)};
  const wire='AFW_R3_EXISTING_SAMPLE/1 '+JSON.stringify(t.sample)+'\nAFW_R3_DELIVERY/1 '+JSON.stringify(d)+'\n';
  const program="import os\np=os.environ['RUNNER_TEMP']+'/afw-site/public-result.json'\nopen(p,'w').write("+JSON.stringify(JSON.stringify(fresh))+")\nprint("+JSON.stringify(wire)+",end='')\n";
  rewrite('boundary.py',program);
 }
 if(scenario==='all-authority-files-replaced'){
  const d={purpose:'afw.r3-delivery.result.v1',...ctx,controls:'passed',availability:'available',sourceQualified:true,collectionComplete:true,sampleObserved:true,reason:'none',nonclaims:clone(fixtures.controlsReport.nonclaims)};
  const wire='AFW_R3_EXISTING_SAMPLE/1 '+JSON.stringify(t.sample)+'\nAFW_R3_DELIVERY/1 '+JSON.stringify(d)+'\n';
  const assets=['site-schema.json','site-map.json','envelope-schema.json','delivery-schema.json','unavailable-schema.json','controls-schema.json','matrix.json','fixtures.json','examples.json','controls-unavailable-example.json'];
  const program="for name in "+JSON.stringify(assets)+":\n open('/proc/self/fd/6/'+name,'w').write('{}')\nprint("+JSON.stringify(wire)+",end='')\n";
  rewrite('boundary.py',program);
 }
 if(scenario==='binding-array-tree'){
  const path=join(t.own,'context.json'),bad={...t.binding,sourceTree:[ctx.sourceTree]};writeFileSync(path,JSON.stringify(bad),{mode:0o600});t.executionMarker=join(t.own,'delegation.marker');
  rewrite('boundary.py',"with open('/proc/self/fd/6/delegation.marker','x') as out:out.write('unexpected')\nraise SystemExit(1)\n");
 }
 if(scenario==='pinned-site-schema-lf'){
  const raw=readFileSync(join(t.own,'site-schema.json'));if(raw.at(-1)!==10||raw.at(-2)===10||Buffer.from(JSON.stringify(JSON.parse(raw))+'\n').compare(raw)!==0)throw 1;
 }
 if(scenario==='external-hardlink-cleanup'){
  const outside=join(sandbox,'external-'+String(external.size)),bytes=Buffer.from('AFW_OWN_EXTERNAL_INODE');
  const fd=openSync(outside,constants.O_WRONLY|constants.O_CREAT|constants.O_EXCL|constants.O_NOFOLLOW,0o600);external.set(t.instance,{path:outside,fd,bytes,proof:null});
  writeFileSync(fd,bytes);chmodSync(outside,0o440);linkSync(outside,join(t.cwd,'outside-inode-link'));const st=fstatSync(fd);external.get(t.instance).proof={mode:st.mode,dev:st.dev,ino:st.ino};
 }
 if(scenario.startsWith('prestart-')){
  const shim=scenario.endsWith('-shim'),controls=scenario.includes('-controls-'),name=shim?'lifetime.py':controls?'controls-outer.mjs':'delivery-outer.mjs';
  t.executionMarker=join(t.own,'prestart-executed.marker');
  rewrite(name,shim?"import os\nwith open("+JSON.stringify(t.executionMarker)+",'x') as f:f.write('unexpected')\nos.write(1,"+JSON.stringify(canary+'\n')+".encode())\n":'import{writeFileSync}from"node:fs";writeFileSync('+JSON.stringify(t.executionMarker)+',"unexpected",{flag:"wx"});process.stdout.write('+JSON.stringify(canary+'\n')+');\n');
 }else retargetEntries(t);
 return {after,spools};
}
const neutral=()=>({phase:'unknown',binding:'unknown',atExec:'unknown',exit:'unknown',output:'unknown',stderr:'unknown'});
const signature={phase:'handoff',binding:'same_cloexec',atExec:'cloexec',exit:'exit2',output:'empty',stderr:'present'};
function classify(r,t,row,withControl){
 const a=neutral(),out=r.stdout,err=r.stderr,trace=r.output?.[8];
 // On error/overflow/missing capture, discard all buffers without inspecting partial bytes.
 if(r.error||!Buffer.isBuffer(out)||!Buffer.isBuffer(err)||!Buffer.isBuffer(trace)||
    out.length>8192||err.length>4096||trace.length>8||out.length+err.length+trace.length>4096)return a;
 if(!(Number.isInteger(r.status)&&r.status>=0&&r.status<=255&&r.signal===null)&&
    !(r.status===null&&typeof r.signal==='string'&&r.signal.length>0))return a;
 const marks=trace.toString('latin1');
 const bindings={c:'same_cloexec',i:'same_inherit',C:'other_cloexec',I:'other_inherit'};
 // Match only whole, ordered prefixes with no repeat, gaps or trailing bytes.
 if(/[^LciCI+KTCAB-]/.test(marks)||!/^(?:L(?:[ciCI](?:[+-](?:K(?:T(?:C(?:AB?)?)?)?)?)?)?)?$/.test(marks))return a;
 const phases=['none','literal','bound','handoff','kernel','main_thread','creator','armed','bash_handoff'];
 a.phase=phases[marks.length];
 if(marks.length>=2)a.binding=bindings[marks[1]];
 if(marks.length>=3){
  a.atExec=marks[2]==='+'?'inherit':'cloexec';
  if((withControl&&a.atExec!=='inherit')||(!withControl&&a.atExec!==(a.binding.endsWith('_inherit')?'inherit':'cloexec'))||(marks.length>=4&&a.atExec!=='inherit'))return neutral();
 }
 a.exit=r.status===null?'signal':r.status===0?'exit0':r.status===1?'exit1':r.status===2?'exit2':'exit_other';
 a.stderr=err.length?'present':'empty';a.output=out.length?'other':'empty';
 if(out.length&&a.phase==='bash_handoff'&&a.stderr==='empty'){
  const actual=out.toString('latin1');
  if(accepts(actual,r.status,row.expected,ctx,t.sample,undefined,fb,controlsFallback))a.output='pair';
  else for(const [reason,label] of Object.entries({outer_startup_unavailable:'fallback_start',binding_unavailable:'fallback_binding',helper_unavailable:'fallback_helper',parent_unavailable:'fallback_parent',record_invalid:'fallback_record'})){
   if(accepts(actual,r.status,{kind:'fallback',entry:'delivery',reason,status:1},ctx,t.sample,undefined,fb,controlsFallback)){a.output=label;break;}
  }
 }
 return a;
}
function executeOne(row,withControl){
 if(!admitCase())return neutral();
 try{
  const t=build(withControl?'control:A01':'baseline:A01');
  retargetEntries(t);
  change(t,row.scenario);
  const r=runRole(t,'case-delivery',withControl);
  return classify(r,t,row,withControl);
 }catch{return neutral();}
}
let baseline=neutral(),control={...neutral(),phase:'not_run'};
try{
 const image=fstatSync(3),current=statSync('/proc/self/exe');
 if(process.versions.node!=='22.23.4'||c.source!==e.GITHUB_SHA||c.run!==e.GITHUB_RUN_ID||image.dev!==current.dev||image.ino!==current.ino)throw 1;
 if(createHash('sha256').update(readFileSync(join(home,'matrix.json'))).digest('hex')!==report.matrixSha256)throw 1;
 const row=matrix.ordered[0];if(row.id!=='A01'||row.scenario!=='observed-known'||row.expected.kind!=='pair'||row.expected.status!==0)throw 1;
 baseline=executeOne(row,false);
 if(JSON.stringify(baseline)===JSON.stringify(signature))control=executeOne(row,true);
}catch{}
const diagnostic={purpose:'afw.r3-delivery.a01-diagnostic.v1',...ctx,case:'A01',baseline,control,originalCLIInvoked:0,nativeBusinessCases:0,nonclaims:fb.nonclaims};
// Only the private controls parent can receive this buffer. Retain case state until VM teardown.
const bytes=Buffer.from(JSON.stringify(diagnostic)+'\n');
process.exitCode=23;
if(bytes.length<=2048)process.stdout.write(bytes);
