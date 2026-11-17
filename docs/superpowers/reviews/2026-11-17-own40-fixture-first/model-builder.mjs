// OWN DIAG2 literal model materializer DATA. No Source or receiver/parser imports.
// Produces synthetic fixtures only; never observes a process, service, file, provider, or actual Git run.
const mCopy=x=>JSON.parse(JSON.stringify(x));
function mCrc(bytes){let n=0xffffffff;for(const b of bytes){n^=b;for(let i=0;i<8;i++)n=n&1?(n>>>1)^0xedb88320:n>>>1;}return(n^0xffffffff)>>>0;}
function mZip(payload,name,options,deflate){
 const p=Buffer.from(payload),n=Buffer.from(name),method=options.method??8,dd=options.dd??true,signed=options.signed!==false,crc=mCrc(p);
 let compressed=method===8?deflate(p):p;if(options.tail)compressed=Buffer.concat([compressed,Buffer.from('deadbeef','hex')]);
 const version=options.version??20,flags=dd?8:0,l=Buffer.alloc(30);l.writeUInt32LE(0x04034b50);l.writeUInt16LE(version,4);l.writeUInt16LE(flags,6);l.writeUInt16LE(method,8);l.writeUInt16LE(n.length,26);
 if(!dd||options.match){l.writeUInt32LE(crc,14);l.writeUInt32LE(compressed.length,18);l.writeUInt32LE(p.length,22);}
 let descriptor=Buffer.alloc(0);if(dd){descriptor=Buffer.alloc(signed?16:12);const offset=signed?4:0;if(signed)descriptor.writeUInt32LE(0x08074b50);descriptor.writeUInt32LE(crc,offset);descriptor.writeUInt32LE(compressed.length,offset+4);descriptor.writeUInt32LE(p.length,offset+8);}
 const c=Buffer.alloc(46);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(version,6);c.writeUInt16LE(flags,8);c.writeUInt16LE(method,10);c.writeUInt32LE(crc,16);c.writeUInt32LE(compressed.length,20);c.writeUInt32LE(p.length,24);c.writeUInt16LE(n.length,28);
 const central=Buffer.concat([c,n]),position=l.length+n.length+compressed.length+descriptor.length,end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(1,8);end.writeUInt16LE(1,10);end.writeUInt32LE(central.length,12);end.writeUInt32LE(position,16);
 return {archive:Buffer.concat([l,n,compressed,descriptor,central,end]),payload:p,crc32:crc.toString(16).padStart(8,'0'),compressedBytes:compressed.length,method,descriptor:dd?(signed?'signed':'unsigned'):'none',version};
}
function mAdmission(config,hash,pin){
 const {orderedBodyModelDraft,...base}=mCopy(config),a=base,s=a.sourceNomination,modelBodies={};
 for(const role of ['collector','runner','workflow'])modelBodies[role]=JSON.stringify({syntheticOnly:true,notSourceCode:true,role,finalRootPin:null})+'\n';
 const bodyEdges=orderedBodyModelDraft.map(e=>{
  if(e.blob!==null)return mCopy(e);
  const role=e.path===s.workflow?'workflow':e.path===s.runner?'runner':'collector',data=pin(modelBodies[role]);
  return {path:e.path,mode:e.mode,type:e.type,blob:data.gitSha,bytes:data.bytes,sha256:data.sha256};
 });
 return {...a,bodyEdges,bodyEdgesHash:hash(JSON.stringify(bodyEdges)),modelBodies,selectionHash:a.familyData.selection.canonicalSha256,finalSourceBinding:false};
}
function mEvents(ids){
 const rows=[];for(const id of ids)for(const[operation,edge]of[['action','enter'],['action','return'],['count','enter'],['count','return']])rows.push({sequence:rows.length+1,elapsedMs:1000+(rows.length+1)*13,id,operation,edge,error:null});
 for(const edge of ['enter','return'])rows.push({sequence:rows.length+1,elapsedMs:1000+(rows.length+1)*13,id:'AFTER',operation:'close',edge,error:null});
 return rows;
}
function mError(line=41){return {name:'AssertionError',code:'ERR_ASSERTION',site:{file:'S08',line,column:12}};}
function mFirstFailure(spec){
 if(spec.expected.firstFailureState==='KNOWN')return {schema:'afw.c2-first-failure-post-diag2.v1',state:'KNOWN',reason:'TARGET_POST_ASSERTION',throwSequence:46,source:{id:'C2T1_NOTICES',status:'fail',phase:'notices',counters:mCopy(spec.knownScalars.counters),code:'TEST_FAILED'},assertion:{actual:spec.knownScalars.actual,expected:200}};
 return {schema:'afw.c2-first-failure-post-diag2.v1',state:spec.expected.firstFailureState??'KNOWN',reason:spec.expected.firstFailureReason??'TARGET_POST_ASSERTION',throwSequence:spec.expected.accepted?null:46,source:spec.expected.accepted?null:{id:'C2T1_NOTICES',status:'fail',phase:'notices',counters:{upload:2,activation:2,receipts:2},code:'TEST_FAILED'},assertion:spec.expected.accepted?null:{actual:503,expected:200}};
}
function mBuild(admission,spec,hash,deflate){
 const a=admission,s=a.sourceNomination,key=spec.id.slice(7),ids=a.selected,rows=mEvents(ids);rows[45].edge='throw';rows[45].error=mError();
 let count=77,nativeCount=19,integrity='prefix',frontier='action',openCase={id:ids[19],operation:'action'},afterOpen=false,suffix='',unknownReason=null,errorKind='timeout',exitCode=1;
 const native=ids.map((id,i)=>({id,status:i===11?'fail':'pass'}));let ff=mFirstFailure(spec),zipOptions={};
 if(key==='K02')zipOptions={method:0,dd:false,version:10};
 if(key==='K03')zipOptions={method:8,dd:true,signed:false};
 if(key==='K05')zipOptions={method:8,dd:false};
 if(key==='K06'){integrity='torn';frontier='unknown';openCase=null;suffix='{';unknownReason='JOURNAL_TORN';zipOptions={dd:true,match:true};}
 if(key==='A01'){rows[45].edge='return';rows[45].error=null;count=49;nativeCount=12;native[11].status='pass';openCase={id:ids[12],operation:'action'};}
 if(key==='A02'){rows[45].edge='return';rows[45].error=null;count=82;nativeCount=20;native[11].status='fail';integrity='complete';frontier='all-settled';openCase=null;errorKind='none';exitCode=1;}
 if(key==='A03'){rows[41].edge='throw';rows[41].error=mError();native[10].status='fail';}
 if(key==='A04'){rows[45].edge='return';rows[45].error=null;rows[47].edge='throw';rows[47].error=mError(65);}
 if(key==='A05')native[0].status='fail';
 if(key==='A06')rows[45].error=mError(42);
 if(key==='U01'){count=48;nativeCount=12;rows[47].edge='throw';rows[47].error=mError(65);frontier='between-cases';openCase=null;}
 if(key==='U02'){count=47;nativeCount=11;frontier='count';openCase={id:ids[11],operation:'count'};}
 if(key==='U03'){count=48;nativeCount=11;frontier='between-cases';openCase=null;}
 if(key==='U04'){count=44;nativeCount=11;frontier='between-cases';openCase=null;}
 if(key==='R01')ff.throwSequence=42;
 if(key==='R02'){count=48;nativeCount=11;frontier='between-cases';openCase=null;}
 if(key==='R03')native[11].status='pass';
 if(key==='R04')ff.source.id='C2T1_MONITOR';
 if(key==='R05')ff.source.phase='connection';
 if(key==='R06')ff.source.code='OK';
 if(key==='R07')ff.assertion.actual=200;
 if(key==='R08')ff.assertion.actual=99;
 if(key==='R09')ff.assertion.actual=600;
 if(key==='R10')ff.assertion.actual='503';
 if(key==='R11')ff.rogue='SYNTHETIC_EXTRA_FIELD';
 if(key==='R12'){ff={schema:'afw.c2-first-failure-post-diag2.v1',state:'UNKNOWN',reason:'SOURCE_ROW_UNAVAILABLE',throwSequence:null,source:{id:'C2T1_NOTICES',status:'fail',phase:'notices',counters:{upload:2,activation:2,receipts:2},code:'TEST_FAILED'},assertion:null};}
 if(key==='R13')ff.source.counters.upload=4;
 if(key==='R14')ff.source.counters.extra=1;
 if(key==='R15')native[0].status='fail';
 if(key==='F06')zipOptions={method:8,dd:true,tail:true};
 const events=rows.slice(0,count),nativeCases=native.slice(0,nativeCount),journalText=events.map(e=>JSON.stringify(e)+'\n').join('')+suffix,first=events.find(e=>e.edge==='throw')?.sequence??null;
 // Synthetic RAW is fixture-only hash provenance; receiver input never contains or parses this text.
 const phases=['connection','oauth','negative','negative','negative','negative','negative','negative','negative','negative','negative','notices','monitor','monitor','scope','finite','selection','negative','negative','negative'];
 let stdout='TAP version 13\n';
 for(let i=0;i<nativeCases.length;i++){
  const row=nativeCases[i],isThrow=events.some(e=>e.id===row.id&&e.operation==='action'&&e.edge==='throw'),counterThrow=events.some(e=>e.id===row.id&&e.operation==='count'&&e.edge==='throw');
  stdout+='# Subtest: '+row.id+'\n';
  if(!counterThrow&&!(i===11&&['U05','U01','U02'].includes(key))){
   const counters=i===11?(spec.knownScalars?.counters??{upload:2,activation:2,receipts:2}):{upload:1,activation:1,receipts:1};
   const source={id:row.id,status:isThrow?'fail':'pass',phase:phases[i],counters,code:isThrow?'TEST_FAILED':'OK'};
   stdout+='# C2SOURCE '+JSON.stringify(source)+'\n';if(i===11&&key==='U08')stdout+='# C2SOURCE '+JSON.stringify(source)+'\n';
  }
  stdout+=(row.status==='pass'?'ok':'not ok')+' '+(i+1)+' - '+row.id+'\n';
  if(i===11&&row.status==='fail'){
   stdout+="  ---\n  duration_ms: 1\n  type: 'test'\n  failureType: 'testCodeFailure'\n  error: 'SYNTHETIC_PRIVATE_SENTINEL'\n  code: 'ERR_ASSERTION'\n  name: 'AssertionError'\n";
   if(key!=='U06')stdout+='  expected: 200\n  actual: '+(spec.knownScalars?.actual??503)+'\n';
   stdout+="  operator: 'strictEqual'\n  stack: |-\n    SYNTHETIC_PRIVATE_STACK_NOT_ACTUAL\n  ...\n";
  }
 }
 const expected={repository:'tokenizartinfo-ops/agent-friendly-web',branch:s.branch,workflowPath:s.workflow,oneUseMessage:s.message,job:s.job,parent:a.base,head:a.syntheticIds.head,tree:a.syntheticIds.tree,runId:a.syntheticIds.runId,jobId:a.syntheticIds.jobId,requiredSteps:mCopy(a.sourceSteps)};
 const context={repository:expected.repository,baselineSource:a.base,baselineTree:a.baseTree,sourceIndexBlob:a.acceptedSource13.blob,proposalIndexHash:a.acceptedSource13.sha256,selectionHash:a.selectionHash,head:expected.head,tree:expected.tree,runId:String(expected.runId),runAttempt:1,job:s.job,node:'v22.23.4'};
 const custody={schema:'afw.c2-first-failure-post-diag2-custody.v1',context:mCopy(context),parentNonRoot:true,preflightOwned:true,preflightRemoved:true,checkedLaunches:2,preflightProcesses:1,greenProcesses:1,checkedProcesses:2,uidGidGroupsLoopbackMatched:true,targetsBeforeMatched:true,targetsAfterMatched:true,journalOwnershipMatched:true,ownRootVerified:true,ownTempRemoved:true};
 const outcome={schema:'afw.c2-first-failure-post-diag2-outcome.v1',context:mCopy(context),diagnosticCollectionComplete:true,nativeQualification:false,sourceReads:{beforeSha256:a.acceptedSource13.triples.map(t=>t.sha256),afterSha256:a.acceptedSource13.triples.map(t=>t.sha256)},observation:{capture:{exitCode,signal:'none',errorKind,stdout:{bytes:Buffer.byteLength(stdout),sha256:hash(stdout)},stderr:{bytes:0,sha256:hash('')}},journal:{bytes:Buffer.byteLength(journalText),sha256:hash(journalText),stable:true,recorderFaultObserved:false},witness:{integrity,frontier,events,openCase,afterOpen},unknownReason,firstThrowSequence:first,native:{integrity:nativeCount?'prefix':'empty',cases:nativeCases},firstFailure:ff},custody:mCopy(custody),SourceQualified:false,Task1Pass:false,nonclaims:mCopy(a.nonclaims)};
 if(key==='F04'){custody.checkedLaunches=3;outcome.custody=mCopy(custody);}
 if(key==='F05')outcome.sourceReads.afterSha256[10]='f'.repeat(64);
 const trusted={expected:mCopy(expected),bodyEdges:mCopy(a.bodyEdges),bodyEdgesHash:a.bodyEdgesHash},run={id:expected.runId,run_attempt:1,head_sha:expected.head,head_branch:expected.branch,path:expected.workflowPath,event:'push',status:'completed',conclusion:'success',repository:{full_name:expected.repository},head_repository:{full_name:expected.repository},created_at:'2039-07-08T00:59:59Z',run_started_at:'2039-07-08T01:00:00Z',updated_at:'2039-07-08T01:04:21Z'};
 const starts=['01:00:00','01:00:05','01:00:10','01:00:30','01:03:40'],ends=['01:00:05','01:00:10','01:00:30','01:03:40','01:04:15'],steps=expected.requiredSteps.map((name,i)=>({number:i+2,name,status:'completed',conclusion:'success',started_at:'2039-07-08T'+starts[i]+'Z',completed_at:'2039-07-08T'+ends[i]+'Z'}));
 const item={id:a.syntheticIds.artifactId,name:s.artifact.name,expired:false,size_in_bytes:0,created_at:'2039-07-08T01:04:10Z',expires_at:'2039-07-15T01:04:10Z',workflow_run:{id:expected.runId,head_sha:expected.head,head_branch:expected.branch},digest:''};
 const input={run,jobs:{total_count:1,jobs:[{id:expected.jobId,run_id:expected.runId,run_attempt:1,head_sha:expected.head,name:expected.job,status:'completed',conclusion:'success',started_at:'2039-07-08T01:00:00Z',completed_at:'2039-07-08T01:04:20Z',steps}]},commit:{sha:expected.head,tree:{sha:expected.tree},message:expected.oneUseMessage,parents:[{sha:expected.parent}]},tree:{sha:expected.tree,truncated:false,tree:a.bodyEdges.map(e=>({path:e.path,mode:e.mode,type:e.type,sha:e.blob,size:e.bytes})).concat([{path:'test/fixtures/finite-first-connection-publication.mjs',mode:'100644',type:'blob',sha:'cede301c3e9cd95716ae2134f938dbb1d940e7a9',size:57864}])},transport:{runId:expected.runId,jobId:expected.jobId,rawLog:''},artifact:{runId:expected.runId,jobId:expected.jobId,listing:{total_count:1,artifacts:[item]},artifactId:item.id,fileName:s.artifact.fileName,archiveBase64:'',payloadText:''}};
 if(key==='F01'){const h='3'.repeat(40),t='4'.repeat(40);run.head_sha=h;input.jobs.jobs[0].head_sha=h;input.commit.sha=h;input.commit.tree.sha=t;input.tree.sha=t;custody.context.head=h;custody.context.tree=t;outcome.context.head=h;outcome.context.tree=t;outcome.custody=mCopy(custody);item.workflow_run.head_sha=h;}
 if(key==='F02')input.tree.tree.push(mCopy(input.tree.tree[0]));
 const payload=JSON.stringify(outcome)+'\n',zip=mZip(payload,s.artifact.fileName,zipOptions,deflate);input.artifact.archiveBase64=zip.archive.toString('base64');input.artifact.payloadText=payload;item.size_in_bytes=zip.archive.length;item.digest='sha256:'+hash(zip.archive);
 const command=s.command,lines=['##[group]Run '+command,command,'##[endgroup]','AFW_C2_FIRST_FAILURE_POST_DIAG2_CUSTODY '+JSON.stringify(custody),'AFW_C2_FIRST_FAILURE_POST_DIAG2_OUTCOME '+JSON.stringify(outcome)],stamps=['01:00:30','01:00:30','01:00:30',key==='F03'?'01:09:35':'01:03:35',key==='F03'?'01:09:36':'01:03:36'];
 input.transport.rawLog=lines.map((line,i)=>'2039-07-08T'+stamps[i]+'.0000000Z '+line).join('\n')+'\n';
 return {schema:'AFW-DIAG2-OWN-COMPLETE-LITERAL-FIXTURE/1',id:spec.id,syntheticOnly:true,actualExpectedSourceContext:null,modelAdmissionRef:'model-admission.json',expected:mCopy(spec.expected),input,trusted,fixtureOnlyWitness:{syntheticChildStdoutUtf8:stdout,syntheticJournalUtf8:journalText,container:{payloadBytes:zip.payload.length,payloadSha256:hash(zip.payload),archiveBytes:zip.archive.length,archiveSha256:hash(zip.archive),crc32:zip.crc32,compressedBytes:zip.compressedBytes,method:zip.method,descriptor:zip.descriptor,version:zip.version},limit:'Synthetic hash provenance DATA only; never feed raw model buffers to receiver or count them as Source parser/native coverage. All model Git/API identities are fictional; BASE3203 preservation remains separate Root static gate.'},SourceQualified:false,Task1Pass:false,nonclaims:mCopy(a.nonclaims)};
}
export {mAdmission,mBuild};
