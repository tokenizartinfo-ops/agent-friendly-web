import {c2V2CheckModeCases,c2V2ReadFrame,c2V2ReadBundle,c2OwnReduce,c2OwnReadGreen,c2OwnReadSource,c2OwnBytes,C2OWN_IDS} from './own-receiver.mjs';
function c2OwnControls(fixture,schema,sha256){
 const copy=x=>JSON.parse(JSON.stringify(x)),unpack=l=>JSON.parse(l.slice(l.indexOf(' ')+1)),pack=(l,v)=>l.slice(0,l.indexOf(' ')+1)+JSON.stringify(v)+'\n';
 const fixed=JSON.parse(JSON.stringify(fixture.baseFixture).replaceAll('c2-source-lab-v2','c2-source-lab-v2-fix1').replaceAll('AFW_C2_SOURCE_SYNTHETIC_V2','AFW_C2_SOURCE_SYNTHETIC_V2_FIX1').replaceAll('30634f2a8c173f670ed2b4cc33a8a8846ac54ad4b5b15d8cb6b17a1ca64acac3','c630dc5d213f8102ad5b36ae30e8251f14d6b9652207c6ab4044d57fc1b5f402'));
 let s=unpack(fixed.lines[0]);s.accepted=3;s.rejected=35;fixed.lines[0]=pack(fixed.lines[0],s);
 const results={schema:'afw.root-own-controls-result.v1',syntheticOnly:true,passed:[],failed:[],SourceQualified:false,Task1Pass:false,PCoff:false};
 const check=(id,fn,reject=false)=>{let ok;try{const v=fn();ok=reject?false:v!==false;}catch{ok=reject;}results[ok?'passed':'failed'].push(id);};
 const bundle=z=>c2V2ReadBundle(z.lines,z.context,z.admitted,c2V2ReadFrame,c2V2CheckModeCases);
 const frameEdit=(z,i,fn)=>{let v=unpack(z.lines[i]);fn(v);z.lines[i]=pack(z.lines[i],v);};
 const neg=(id,edit)=>check(id,()=>{let z=copy(fixed);edit(z);return bundle(z);},true);
 const editMode=(z,mi,fn)=>{let v=unpack(z.lines[mi+2]);fn(v.observation);z.lines[mi+2]=pack(z.lines[mi+2],v);frameEdit(z,7,r=>{r.observations[mi]=v.observation;});};
 const alter=x=>typeof x==='string'?x+'x':typeof x==='number'?x+1:typeof x==='boolean'?!x:null;
 check('VALID_UNCHANGED_FULL_BUNDLE',()=>bundle(fixed));
 for(let i=0;i<8;i++)neg('MISSING_FRAME_'+i,z=>z.lines.splice(i,1));
 neg('REORDER',z=>[z.lines[0],z.lines[1]]=[z.lines[1],z.lines[0]]);
 for(const k of Object.keys(fixed.context))neg('CONTEXT_'+k,z=>frameEdit(z,0,v=>v.context[k]=alter(v.context[k])));
 const w=unpack(fixed.lines[2]).observation.witness;
 for(const k of Object.keys(w))neg('WITNESS_'+k,z=>editMode(z,0,o=>o.witness[k]=alter(o.witness[k])));
 neg('NO_WITNESS',z=>editMode(z,0,o=>o.witness=null));
 neg('WITNESS_OTHER_MODE',z=>editMode(z,1,o=>o.witness=copy(w)));
 for(const k of ['mode','selectionHash','verdict','code','exitCode','totals','cases'])neg('MODE_'+k,z=>editMode(z,0,o=>o[k]=alter(o[k])));
 for(const k of Object.keys(unpack(fixed.lines[2]).observation.totals))neg('TOTAL_'+k,z=>editMode(z,0,o=>o.totals[k]++));
 neg('BASE_GENERIC_FAIL',z=>editMode(z,0,o=>{o.cases[0].status='fail';o.cases[0].code='TEST_FAILED';}));
 neg('MISSING_CASE',z=>editMode(z,1,o=>o.cases.pop()));
 neg('EXTRA_CASE',z=>editMode(z,1,o=>o.cases.push(copy(o.cases[0]))));
 neg('DUPLICATE_CASE',z=>editMode(z,1,o=>o.cases[1]=copy(o.cases[0])));
 neg('WRONG_PHASE',z=>editMode(z,1,o=>o.cases[0].phase='negative'));
 neg('INVENTED_COUNTS',z=>editMode(z,1,o=>o.cases[3].counters.upload=4));
 neg('MUTANT_WRONG_PREDICATE',z=>editMode(z,2,o=>{o.cases[10].status='pass';o.cases[10].code='OK';o.totals.pass++;o.totals.fail--;}));
 neg('GREEN_EXTRA_KEY_FAILED',z=>editMode(z,1,o=>{o.cases[10].status='fail';o.cases[10].code='TEST_FAILED';o.totals.pass--;o.totals.fail++;}));
 neg('REGRESSIONS_OMITTED',z=>z.lines.splice(5,1));
 neg('MUTANT_OMITTED',z=>z.lines.splice(4,1));
 neg('REGRESSION_DUPLICATE',z=>editMode(z,3,o=>o.cases[1]=copy(o.cases[0])));
 for(const k of Object.keys(unpack(fixed.lines[6])))neg('CUSTODY_'+k,z=>frameEdit(z,6,v=>v[k]=k==='checkedProcesses'?25:alter(v[k])));
 for(const k of Object.keys(unpack(fixed.lines[0])))neg('SYNTHETIC_'+k,z=>frameEdit(z,0,v=>v[k]=alter(v[k])));
 neg('ADMITTED_CHANGED',z=>frameEdit(z,7,v=>v.admitted[0].bytes++));
 for(const k of Object.keys(unpack(fixed.lines[7]).nonclaims))neg('NONCLAIM_'+k,z=>frameEdit(z,7,v=>v.nonclaims[k]=true));
 neg('EMBEDDED_OBSERVATION_CHANGED',z=>frameEdit(z,7,v=>v.observations[1].cases[19].counters.upload=1));
 neg('DUP_KEY',z=>z.lines[0]=z.lines[0].replace('{"schema":','{"schema":"bad","schema":'));
 neg('NONCANONICAL',z=>z.lines[0]=z.lines[0].replace('{','{ '));
 neg('DOUBLE_LINE',z=>z.lines[0]+=z.lines[0]);
 neg('NO_LF',z=>z.lines[0]=z.lines[0].slice(0,-1));
 neg('UNKNOWN_KEY',z=>frameEdit(z,0,v=>v.extra=1));
 for(const t of fixture.collisions)neg(t.id,z=>editMode(z,t.modeIndex,o=>o.cases[t.row].counters=copy(t.counters)));
 neg('HIERARCHY_ISOLATED',z=>editMode(z,2,o=>o.cases[19].counters={upload:0,activation:0,receipts:1}));
 neg('EARLY_GREEN_222',z=>editMode(z,1,o=>{for(let i=2;i<=10;i++)o.cases[i].counters={upload:2,activation:2,receipts:2};}));
 neg('ORDERED_ROW_ALIAS',z=>editMode(z,2,o=>{let c=o.cases[19];o.cases[19]={'id,status':c.id,phase:c.phase,counters:c.counters,code:c.code};}));
 const rows=[];
 const mark=(id,operation,edge)=>({sequence:rows.length+1,elapsedMs:rows.length,id,operation,edge,error:edge==='throw'?{name:'Error',code:null,site:null}:null});
 for(const id of C2OWN_IDS){for(const [operation,edge]of [['action','enter'],['action','return'],['count','enter'],['count','return']])rows.push(mark(id,operation,edge));}
 rows.push(mark('AFTER','close','enter'));rows.push(mark('AFTER','close','return'));
 const resequence=r=>r.map((x,i)=>({...x,sequence:i+1,elapsedMs:i}));
 const reduce=(r,condition='timeout',integrity='prefix',fault=false)=>c2OwnReduce(r,condition,integrity,fault);
 check('PROGRESS_NORMAL_PREFIX',()=>reduce(rows.slice(0,4),'normal').frontier==='between-cases');
 check('PROGRESS_TIMEOUT_ACTION',()=>reduce(rows.slice(0,5)).frontier==='action');
 check('PROGRESS_TIMEOUT_COUNT',()=>reduce(rows.slice(0,7)).frontier==='count');
 const overlap=resequence([rows[0],rows[80]]);
 check('PROGRESS_AFTER_OVERLAP',()=>{const r=reduce(overlap);return r.frontier==='case-and-after'&&r.afterOpen&&r.openCase.operation==='action';});
 check('PROGRESS_ALL_RETURNED_TIMEOUT',()=>reduce(rows).frontier==='post-teardown-process-exit');
 const closeDuring=resequence([rows[0],rows[80],rows[81],...rows.slice(1,80)]);
 check('PROGRESS_LEGAL_MULTIPLE_OPEN',()=>reduce(closeDuring).frontier==='post-teardown-process-exit');
 const thrown=copy(rows);thrown[1].edge='throw';thrown[1].error={name:'Error',code:null,site:null};
 check('PROGRESS_THROW_NO_NATIVE_INVENTION',()=>reduce(thrown).frontier==='post-settlement-process-exit');
 for(const [id,edit]of [
  ['MISSING',r=>r.splice(1,1)],['DUPLICATE',r=>r[1].sequence=1],['FOREIGN',r=>r[0].id='C2T1_FOREIGN'],
  ['OUT_OF_ORDER',r=>r[0].id=C2OWN_IDS[1]],['ELAPSED_DECREASE',r=>r[3].elapsedMs=0],
  ['ILLEGAL_RETURN',r=>r[0].edge='return'],['CASE_PARALLEL',r=>r[1]=copy(rows[4])],
  ['RAW_ERROR',r=>{r[1].edge='throw';r[1].error={name:'Error',code:null,site:null,message:'private'};}],
  ['AFTER_DUPLICATE',r=>r.push({...rows[80],sequence:83,elapsedMs:82})]
 ])check('PROGRESS_REJECT_'+id,()=>{let r=copy(rows);edit(r);return reduce(r);},true);
 check('PROGRESS_EMPTY_UNKNOWN',()=>reduce([],'timeout','empty').frontier==='unknown');
 check('PROGRESS_TORN_UNKNOWN',()=>reduce(rows.slice(0,5),'timeout','torn').frontier==='unknown');
 check('PROGRESS_AMBIGUOUS_UNKNOWN',()=>reduce(rows.slice(0,5),'timeout','ambiguous').openCase===null);
 check('PROGRESS_RECORDER_FAULT_UNKNOWN',()=>reduce(rows.slice(0,5),'timeout','prefix',true).frontier==='unknown');
 // All public shapes and transport are ordinary synthetic DATA. Never an actual Source occurrence.
 const ctx={...fixed.context,job:'c2-green-diag1'},cc={head:ctx.head,runId:ctx.runId,runAttempt:1,job:ctx.job,proposalIndexHash:ctx.proposalIndexHash};
 const custody={schema:'afw.c2-green-custody.v1',context:cc,parentNonRoot:true,preflightOwned:true,preflightRemoved:true,checkedLaunches:3,checkedProcesses:3,uidGidGroupsLoopbackMatched:true,ownRootVerified:true,ownTempRemoved:true};
 const witness=reduce(overlap),journalText=witness.events.map(e=>JSON.stringify(e)+'\n').join('');
 const observation={selectionHash:'ecb5037b4f3274c5afcab5bb2a7fdc4ca3795e450583db7b13e3eed98955d3f3',originalDriverBlob:'d4db10ee8a091434835a9ac28e0d607a5e9efd21',driverHash:'3363ff3be3fedb244f22f965be04925c579a3cfe33b7a718ec76428e3b4ca5bc',recorderHash:'271b9abeb806acaa5e6a1d35e6e72c77cf9b25bb5cad3603f0ccbb05745f7508',readerHash:'c9e0fa37a70a503ea172450abe5593bce98b4218905eb8fe0af26047986c003f',parserVectorsHash:'c630dc5d213f8102ad5b36ae30e8251f14d6b9652207c6ab4044d57fc1b5f402',progressVectorsHash:'71c979c34d8a9fc8fcce7e99463ca0479160b32620517e69849021715c21570b',capture:{exitCode:1,signal:'none',errorKind:'timeout',stdout:{bytes:100,sha256:'c'.repeat(64)},stderr:{bytes:0,sha256:sha256('')}},journal:{bytes:c2OwnBytes(journalText),sha256:sha256(journalText),stable:true,recorderFaultObserved:false},witness,native:{integrity:'prefix',cases:[]}};
 const nonclaims=unpack(fixed.lines[7]).nonclaims;
 const outcome={schema:'afw.c2-green-observation.v1',context:ctx,observation,custody,SourceQualified:false,Task1Pass:false,nonclaims};
 const syn={schema:'afw.c2-green-synthetic.v1',context:ctx,parserVectorsHash:observation.parserVectorsHash,progressVectorsHash:observation.progressVectorsHash,accepted:3,rejected:35,progressChecks:13};
 const names=['Read the exact one-use lab head','Use the fixed Node runtime','Install only the existing locked dependencies','Observe isolated proposal-green boundaries','Preserve the bounded green diagnostic'];
 const start='2026-11-16T08:00:00Z',end='2026-11-16T08:03:01Z';
 const expected={repository:ctx.repository,branch:'lab/afw-c2-source-20261116-t1-green-diag1',workflowPath:'.github/workflows/afw-c2-green-diag1.yml',oneUseMessage:'AFW-C2-SOURCE-T1-GREEN-DIAG1-ONEUSE-20261116',job:ctx.job,parent:ctx.baselineSource,head:ctx.head,tree:ctx.tree,runId:Number(ctx.runId),jobId:900002};
 const run={id:expected.runId,run_attempt:1,head_sha:ctx.head,head_branch:expected.branch,path:expected.workflowPath,event:'push',status:'completed',conclusion:'success',repository:{full_name:ctx.repository},head_repository:{full_name:ctx.repository}};
 const job={id:expected.jobId,run_id:run.id,run_attempt:1,head_sha:ctx.head,name:ctx.job,status:'completed',conclusion:'success',steps:names.map((name,i)=>({number:i+2,name,status:'completed',conclusion:'success',started_at:start,completed_at:end}))};
 const commit={sha:ctx.head,tree:{sha:ctx.tree},message:expected.oneUseMessage,parents:[{sha:ctx.baselineSource}]};
 const makeInput=()=>({run:copy(run),jobs:{total_count:1,jobs:[copy(job)]},commit:copy(commit),expected:copy(expected),transport:{runId:run.id,jobId:job.id,rawLog:''},artifact:{runId:run.id,jobId:job.id,listing:{total_count:1,artifacts:[{id:900003,name:'afw-c2-green-diag1',expired:false,size_in_bytes:1000,workflow_run:{id:run.id,head_sha:ctx.head,head_branch:expected.branch},digest:'sha256:'+'d'.repeat(64)}]},artifactId:900003,fileName:'c2-green-diag1.json',payloadText:'',archiveSha256:'d'.repeat(64)}});
 const build=(i,vals)=>{i.transport.rawLog=['##[group]Run node docs/superpowers/source-lab/c2-t1-green-diag1/run-c2-green-diag1.mjs','node docs/superpowers/source-lab/c2-t1-green-diag1/run-c2-green-diag1.mjs','##[endgroup]',...vals.map((v,n)=>['AFW_C2_GREEN_SYNTHETIC','AFW_C2_DEPENDENCY_CONTROL','AFW_C2_GREEN_CUSTODY','AFW_C2_GREEN_OUTCOME'][n]+' '+JSON.stringify(v))].map(l=>'2026-11-16T08:00:01.0000000Z '+l).join('\n')+'\n';i.artifact.payloadText=JSON.stringify(vals[3])+'\n';return i;};
 const vals=[syn,unpack(fixed.lines[1]),custody,outcome],diagnostic=build(makeInput(),vals);
 check('DIAGNOSTIC_VALID_OVERLAP_CAPTURE',()=>{const r=c2OwnReadGreen(diagnostic,schema,sha256);return r.SourceQualified===false&&r.Task1Pass===false&&r.PCoff===false&&r.frontier==='case-and-after';});
 const diagNeg=(id,edit)=>check('DIAG_'+id,()=>{let i=copy(diagnostic),v=copy(vals);edit(i,v);build(i,v);return c2OwnReadGreen(i,schema,sha256);},true);
 for(const key of Object.keys(observation).slice(0,7))diagNeg('HASH_'+key,(i,v)=>v[3].observation[key]='f'.repeat(64));
 diagNeg('CROSS_CONTEXT',(i,v)=>v[3].context.runId='900009');
 diagNeg('SOURCE_VERDICT_TRUE',(i,v)=>v[3].SourceQualified=true);
 diagNeg('TASK_VERDICT_TRUE',(i,v)=>v[3].Task1Pass=true);
 diagNeg('PCOFF_TRUE',(i,v)=>v[3].nonclaims.PCoff=true);
 diagNeg('CUSTODY_COPY_MISMATCH',(i,v)=>v[2].checkedProcesses=4);
 diagNeg('CUSTODY_NINE_PROCESS',(i,v)=>{v[2].checkedProcesses=9;v[3].custody=copy(v[2]);});
 diagNeg('CUSTODY_ROOT',(i,v)=>{v[2].parentNonRoot=false;v[3].custody=copy(v[2]);});
 diagNeg('JOURNAL_DIGEST',(i,v)=>v[3].observation.journal.sha256='f'.repeat(64));
 diagNeg('FRONTIER_INVENTED',(i,v)=>v[3].observation.witness.frontier='count');
 diagNeg('NATIVE_DUPLICATE',(i,v)=>v[3].observation.native.cases=[{id:C2OWN_IDS[0],status:'pass'},{id:C2OWN_IDS[0],status:'pass'}]);
 diagNeg('SPAWN_FAILURE',(i,v)=>v[3].observation.capture.errorKind='spawn-enoent');
 diagNeg('STDOUT_OVER_CAP',(i,v)=>v[3].observation.capture.stdout.bytes=1048577);
 diagNeg('CONTROL_COUNT',(i,v)=>v[0].rejected=34);
 diagNeg('CONTROL_HASH',(i,v)=>v[0].parserVectorsHash='f'.repeat(64));
 for(const [id,edit]of [
  ['RUN_ID',i=>i.run.id++],['RUN_HEAD',i=>i.run.head_sha='f'.repeat(40)],['RUN_BRANCH',i=>i.run.head_branch='other'],['RUN_ATTEMPT',i=>i.run.run_attempt=2],['RUN_EVENT',i=>i.run.event='workflow_dispatch'],['RUN_PATH',i=>i.run.path='other'],['RUN_STATUS',i=>i.run.status='in_progress'],['RUN_CONCLUSION',i=>i.run.conclusion='failure'],
  ['FOREIGN_REPO',i=>i.run.repository.full_name='other/repo'],['DUP_JOB',i=>{i.jobs.jobs.push(copy(i.jobs.jobs[0]));i.jobs.total_count=2;}],['JOB_ID',i=>i.jobs.jobs[0].id++],['JOB_RUN',i=>i.jobs.jobs[0].run_id++],['JOB_ATTEMPT',i=>i.jobs.jobs[0].run_attempt=2],['JOB_NAME',i=>i.jobs.jobs[0].name='other'],['JOB_HEAD',i=>i.jobs.jobs[0].head_sha='f'.repeat(40)],['JOB_STATUS',i=>i.jobs.jobs[0].status='in_progress'],['JOB_CONCLUSION',i=>i.jobs.jobs[0].conclusion='failure'],
  ['WRONG_TREE',i=>i.commit.tree.sha='f'.repeat(40)],['WRONG_MESSAGE',i=>i.commit.message='other'],['SECOND_PARENT',i=>i.commit.parents.push({sha:'f'.repeat(40)})],['MISSING_COMMAND',i=>i.jobs.jobs[0].steps.splice(3,1)],['SKIP_REQUIRED',i=>i.jobs.jobs[0].steps[3].conclusion='skipped'],['FAILED_SETUP',i=>i.jobs.jobs[0].steps[0].conclusion='failure'],['DUP_STEP',i=>i.jobs.jobs[0].steps.push(copy(i.jobs.jobs[0].steps[3]))],
  ['TRANSPORT_JOB',i=>i.transport.jobId++],['ARTIFACT_RUN',i=>i.artifact.listing.artifacts[0].workflow_run.id++],['ARTIFACT_HEAD',i=>i.artifact.listing.artifacts[0].workflow_run.head_sha='f'.repeat(40)],['ARTIFACT_DIGEST',i=>i.artifact.archiveSha256='f'.repeat(64)],['ARTIFACT_EXPIRED',i=>i.artifact.listing.artifacts[0].expired=true]
 ])check('API_'+id,()=>{const i=copy(diagnostic);edit(i);return c2OwnReadGreen(i,schema,sha256);},true);
 for(const [id,edit]of [
  ['MISSING_FRAME',i=>i.transport.rawLog=i.transport.rawLog.split('\n').filter(l=>!l.includes('AFW_C2_GREEN_CUSTODY')).join('\n')],
  ['DUP_FRAME',i=>i.transport.rawLog+=i.transport.rawLog.split('\n').find(l=>l.includes('AFW_C2_GREEN_OUTCOME'))+'\n'],
  ['WRONG_COMMAND',i=>i.transport.rawLog=i.transport.rawLog.replace('##[group]Run node','##[group]Run other')],
  ['UNWRAPPED',i=>i.transport.rawLog=i.transport.rawLog.replaceAll('2026-11-16T08:00:01.0000000Z ','')],
  ['OUTSIDE_STEP',i=>i.transport.rawLog=i.transport.rawLog.replaceAll('08:00:01','08:09:01')],
  ['ARTIFACT_BODY',i=>i.artifact.payloadText+=' ']
 ])check('TRANSPORT_'+id,()=>{const i=copy(diagnostic);edit(i);return c2OwnReadGreen(i,schema,sha256);},true);
 return {results,fixtures:{fixed,diagnostic,normalRows:rows,overlapRows:overlap}};
}
function c2OwnSourceAssemblyControls(finalFixtures,sha256){
 const copy=x=>JSON.parse(JSON.stringify(x)),i=copy(finalFixtures.diagnostic),f=finalFixtures.fixed;
 const rename=s=>s.replaceAll('lab/afw-c2-source-20261116-t1-green-diag1','lab/afw-c2-source-20261116-t1-v2-fix1').replaceAll('.github/workflows/afw-c2-green-diag1.yml','.github/workflows/afw-c2-source-lab-v2-fix1.yml').replaceAll('AFW-C2-SOURCE-T1-GREEN-DIAG1-ONEUSE-20261116','AFW-C2-OWNER-STAGES-SOURCE-T1-V2-FIX1-ONEUSE-20261116').replaceAll('c2-green-diag1','c2-source-lab-v2-fix1').replaceAll('Observe isolated proposal-green boundaries','Qualify isolated compiled Source data').replaceAll('Preserve the bounded green diagnostic','Preserve only the bounded sanitized Source receipt');
 const source=JSON.parse(rename(JSON.stringify(i)));
 source.expected.requiredSteps=source.jobs.jobs[0].steps.map(s=>s.name);
 const command='node docs/superpowers/source-lab/c2-t1-v2-fix1/run-c2-source-lab-v2-fix1.mjs';
 source.transport.rawLog=['##[group]Run '+command,command,'##[endgroup]',...f.lines.map(l=>l.slice(0,-1))].map(l=>'2026-11-16T08:00:01.0000000Z '+l).join('\n')+'\n';
 source.artifact.fileName='c2-source-lab-v2-fix1-receipt.json';source.artifact.payloadText=f.lines[7].slice(f.lines[7].indexOf(' ')+1);
 source.artifact.listing.artifacts[0].name='afw-c2-owner-stages-source-t1-v2-fix1-receipt';
 const result={syntheticOnly:true,passed:[],failed:[]};
 const check=(id,edit,negative=true)=>{let z=copy(source);if(edit)edit(z);let ok;try{c2OwnReadSource(z,f.admitted,sha256);ok=!negative;}catch{ok=negative;}result[ok?'passed':'failed'].push(id);};
 check('FULL_SOURCE_ASSEMBLY_VALID',null,false);
 for(const [id,edit]of [
 ['RUN_ID',z=>z.run.id++],['RUN_SHA',z=>z.run.head_sha='f'.repeat(40)],['RUN_BRANCH',z=>z.run.head_branch='other'],['RUN_ATTEMPT',z=>z.run.run_attempt=2],['RUN_EVENT',z=>z.run.event='workflow_dispatch'],['RUN_PATH',z=>z.run.path='other'],['RUN_STATUS',z=>z.run.status='in_progress'],['RUN_CONCLUSION',z=>z.run.conclusion='failure'],
 ['JOB_ID',z=>z.jobs.jobs[0].id++],['JOB_RUN',z=>z.jobs.jobs[0].run_id++],['JOB_ATTEMPT',z=>z.jobs.jobs[0].run_attempt=2],['JOB_NAME',z=>z.jobs.jobs[0].name='other'],['JOB_HEAD',z=>z.jobs.jobs[0].head_sha='f'.repeat(40)],['JOB_STATUS',z=>z.jobs.jobs[0].status='in_progress'],['JOB_CONCLUSION',z=>z.jobs.jobs[0].conclusion='failure'],
 ['FOREIGN_REPO',z=>z.run.repository.full_name='other/repo'],['DUP_JOB',z=>{z.jobs.jobs.push(copy(z.jobs.jobs[0]));z.jobs.total_count=2;}],['WRONG_TREE',z=>z.commit.tree.sha='f'.repeat(40)],['WRONG_MESSAGE',z=>z.commit.message='other'],['SECOND_PARENT',z=>z.commit.parents.push({sha:'f'.repeat(40)})],['MISSING_COMMAND',z=>z.jobs.jobs[0].steps.splice(3,1)],['SKIP_REQUIRED',z=>z.jobs.jobs[0].steps[3].conclusion='skipped'],['FAILED_SETUP',z=>z.jobs.jobs[0].steps[0].conclusion='failure'],['DUP_STEP',z=>z.jobs.jobs[0].steps.push(copy(z.jobs.jobs[0].steps[3]))],
 ['ARTIFACT_MISMATCH',z=>z.artifact.payloadText+=' '],['ARTIFACT_DIGEST',z=>z.artifact.archiveSha256='e'.repeat(64)],['STRIPPED_LOG',z=>z.transport.rawLog=z.transport.rawLog.replaceAll('2026-11-16T08:00:01.0000000Z ','')]
 ])check('SOURCE_'+id,edit);
 return {results:result,fixture:source};
}

export {c2OwnControls,c2OwnSourceAssemblyControls};
