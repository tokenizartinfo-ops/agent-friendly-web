import {ngSame,ngInt,N2_INDEX,N2_SELECTION,n2Replay,n2Read,n2ApiJoin,n2Crc32,n2PrivateProbeDelta,n2DecodePrivate,n2OptionsModelAccepted,n2OwnLoggerDescriptorAllowed} from './reader.mjs';
function n2JournalControls(v){
 const checks=[];for(const t of v.cases){let out=null;try{out=n2Replay(Buffer.from(t.records.map(r=>JSON.stringify(r)+'\n').join('')),v.binding,t.condition,t.native);}catch{}
 let pass=!!out===t.accepted;if(out&&t.expect){if(Object.hasOwn(t.expect,'openCall'))pass&&=out.host.openCall===t.expect.openCall;if(Object.hasOwn(t.expect,'originalActionError'))pass&&=ngSame(out.flow.at(-1).actionError,t.expect.originalActionError);if(Object.hasOwn(t.expect,'countError'))pass&&=ngSame(out.flow.at(-1).countError,t.expect.countError);}
 checks.push({id:t.id,pass,accepted:!!out});}
 const raw=v.base.records.map(r=>JSON.stringify(r)+'\n').join('');
 for(const id of v.rawRejects??[]){let bytes=Buffer.from(raw);if(id==='TORN')bytes=bytes.subarray(0,-1);if(id==='NONCANONICAL')bytes=Buffer.from(raw.replace('{','{ '));if(id==='DUPLICATE_JSON_KEY')bytes=Buffer.from(raw.replace('{"sequence":','{"sequence":9,"sequence":'));if(id==='INVALID_UTF8')bytes=Buffer.concat([bytes.subarray(0,2),Buffer.from([255]),bytes.subarray(3)]);if(id==='CRLF')bytes=Buffer.from(raw.replaceAll('\n','\r\n'));if(id==='EMPTY_LINE')bytes=Buffer.from(raw+'\n');if(id==='REORDER_KEYS')bytes=Buffer.from(raw.replace('"sequence":1,"elapsedMs":0','"elapsedMs":0,"sequence":1'));if(id==='OVER_BYTE_CAP')bytes=Buffer.alloc(32769,32);let accepted=false;try{accepted=!!n2Replay(bytes,v.binding,'normal',v.base.native);}catch{}checks.push({id,pass:!accepted,accepted});}
 return checks;
}
function n2PrivateUnitControls(messages,options,accessors){
 const checks=[];
 for(const t of messages.cases){let r;try{r=n2DecodePrivate(t.privateMessageText);}catch{r=null;}let pass=!!r&&r.recognized===t.expected.recognized;
  if(pass&&r.recognized){const f=t.expected.facts,p=r.facts;for(const k of ['closed','aborted','alive','wallExpired','monoExpired'])if(Object.hasOwn(f,k)&&f[k]!==p[k])pass=false;
   if(f.branchLabel!==p.tag||p.correlated!==null)pass=false;
   for(const [source,target]of [['wallComparedToLast','wallRegressed'],['monoComparedToLast','monoRegressed']])if(Object.hasOwn(f,source)&&f[source]!==null&&p[target]!==(f[source]==='earlier'))pass=false;
   for(const [source,target]of [['wallComparedToStart','wallRegressed'],['monoComparedToStart','monoRegressed']])if(Object.hasOwn(f,source)&&p[target]!==(f[source]==='earlier'))pass=false;
   if(JSON.stringify(p).includes('OWN_SYNTHETIC_PRIVATE_SENTINEL'))pass=false;
  }
  checks.push({id:'private-message/'+t.id,pass});
 }
 for(const t of options.cases)checks.push({id:'options-model/'+t.id,pass:n2OptionsModelAccepted(t)===t.expected.publicArgumentProof});
 for(const t of accessors.cases){let reads=0,writes=0;const diagnostic=()=>{},other=()=>{},d=t.descriptor,target={},holder=d.location==='prototype'?{}:target;if(d.location==='prototype')Object.setPrototypeOf(target,holder);
  if(d.kind==='accessor')Object.defineProperty(holder,'handleStructuredLogs',{get:d.getter?()=>{reads++;return undefined;}:undefined,set:d.setter?()=>{writes++;}:undefined,configurable:true});
  if(d.kind==='data')Object.defineProperty(holder,'handleStructuredLogs',{value:d.value==='undefined'?undefined:d.value==='DIAGNOSTIC_LOGGER_A'?diagnostic:other,writable:true,configurable:true});
  const accepted=n2OwnLoggerDescriptorAllowed(target,diagnostic);checks.push({id:'accessor/'+t.id,pass:accepted===t.expected.admissible&&reads===0&&writes===0});
 }
 return checks;
}

function n2PrivateControls(v){const out=[],check=(id,fn)=>{let pass=false;try{pass=fn()===true;}catch{}out.push({id,pass});};for(const t of v.privateProbeControls)check(t.id,()=>{const p=n2PrivateProbeDelta(t.before,t.after,'/own');return Object.entries(t.expected).every(([k,value])=>ngSame(p[k],value))&&p.correlated===null&&p.guardOrigin==='unknown';});const empty={observation:[],calls:[],business:[]},hash='a'.repeat(64);
 check('PRIVATE_SINGLE_SAFE_SITE',()=>{const p=n2PrivateProbeDelta(empty,{...empty,observation:[{kind:'connection-failure',position:'approved',frames:['    at choose (/own/test/fixtures/finite-coupled-native.mjs:45:7)']}]},'/own');return p.state==='observed'&&p.newFailures===1&&p.position==='approved'&&ngSame(p.sites,[{file:'D08',line:45,column:7}])&&p.correlated===null;});
 check('PRIVATE_IGNORE_NEW_PHASE_FAILURE',()=>{const p=n2PrivateProbeDelta(empty,{...empty,observation:[{kind:'failure',position:'approved',frames:[]}]},'/own');return p.newFailures===0&&p.position===null&&p.sites.length===0;});
 check('PRIVATE_CALL_PREFIX_DRIFT',()=>n2PrivateProbeDelta({...empty,calls:[{x:1}]},{...empty,calls:[{x:2}]},'/own').state==='unavailable');
 check('PRIVATE_UNKNOWN_NO_STALE_SUMMARY',()=>{const p=n2PrivateProbeDelta({...empty,business:['afw.finite-policy-effect.v1:old:receipt']},{...empty,business:[null]},'/own');return p.state==='unavailable'&&Object.values(p.summary).every(v=>v===null);});
 check('PRIVATE_FACTS_ONLY_KNOWN_KEYS',()=>{const p=n2PrivateProbeDelta(empty,{...empty,business:['owner-ticket:'+hash+':use','connection-preparation:'+hash+':notices:approval','afw.finite-policy-effect.v1:known:receipt']},'/own',hash);return ngSame(p.summary,{consumedTicket:true,stageApproval:true,receiptCount:1});});
 check('PRIVATE_UNKNOWN_HANDLE_NOT_FALSE',()=>n2PrivateProbeDelta(empty,empty,'/own').summary.consumedTicket===null);
 check('PRIVATE_FOREIGN_SUFFIX_SITE_IGNORED',()=>n2PrivateProbeDelta(empty,{...empty,observation:[{kind:'connection-failure',position:'approved',frames:['    at choose (/foreign/own/test/fixtures/finite-coupled-native.mjs:45:7)']}]},'/own').sites.length===0);
 check('PRIVATE_OVER_CAP_UNKNOWN',()=>n2PrivateProbeDelta(empty,{...empty,observation:[{x:'x'.repeat(131073)}]},'/own').state==='unavailable');
 check('PRIVATE_TOO_MANY_FAILURES_UNKNOWN',()=>n2PrivateProbeDelta(empty,{...empty,observation:Array.from({length:9},()=>({kind:'connection-failure',position:'entry',frames:[]}))},'/own').state==='unavailable');
 return out;}

function n2MakeZip(payload,deflate=null,descriptor=false){
 const body=Buffer.from(payload),name=Buffer.from('c2-notices-n2.json'),compressed=deflate?deflate(body):body,method=deflate?8:0,flags=descriptor?8:0,crc=n2Crc32(body),local=Buffer.alloc(30),central=Buffer.alloc(46),end=Buffer.alloc(22);
 local.writeUInt32LE(0x04034b50);local.writeUInt16LE(20,4);local.writeUInt16LE(flags,6);local.writeUInt16LE(method,8);local.writeUInt16LE(name.length,26);
 if(!descriptor){local.writeUInt32LE(crc,14);local.writeUInt32LE(compressed.length,18);local.writeUInt32LE(body.length,22);}
 const dd=Buffer.alloc(descriptor?16:0);if(descriptor){dd.writeUInt32LE(0x08074b50);dd.writeUInt32LE(crc,4);dd.writeUInt32LE(compressed.length,8);dd.writeUInt32LE(body.length,12);}
 central.writeUInt32LE(0x02014b50);central.writeUInt16LE(20,4);central.writeUInt16LE(20,6);central.writeUInt16LE(flags,8);central.writeUInt16LE(method,10);central.writeUInt32LE(crc,16);central.writeUInt32LE(compressed.length,20);central.writeUInt32LE(body.length,24);central.writeUInt16LE(name.length,28);
 const offset=local.length+name.length+compressed.length+dd.length;end.writeUInt32LE(0x06054b50);end.writeUInt16LE(1,8);end.writeUInt16LE(1,10);end.writeUInt32LE(central.length+name.length,12);end.writeUInt32LE(offset,16);
 return Buffer.concat([local,name,compressed,dd,central,name,end]);
}
function n2FullFixture(v,schema,admission,hash,inflate){
 const expected={repository:'tokenizartinfo-ops/agent-friendly-web',branch:'lab/afw-c2-source-20261116-t1-notices-n2',workflowPath:'.github/workflows/afw-c2-notices-n2.yml',oneUseMessage:'AFW-C2-T1-NOTICES-N2-ONEUSE-20261116',job:'c2-notices-n2',parent:'6791ce1bab9372e206d3c7b42b3e1394dc6e0c68',head:'1'.repeat(40),tree:'2'.repeat(40),runId:101,jobId:102};
 const run={id:101,run_attempt:1,head_sha:expected.head,head_branch:expected.branch,path:expected.workflowPath,event:'push',status:'completed',conclusion:'success',repository:{full_name:expected.repository},head_repository:{full_name:expected.repository},run_started_at:'2026-11-16T10:00:00Z',updated_at:'2026-11-16T10:00:07Z'};
 const jobs={total_count:1,jobs:[{id:102,run_id:101,run_attempt:1,head_sha:expected.head,name:expected.job,status:'completed',conclusion:'success',started_at:'2026-11-16T10:00:00Z',completed_at:'2026-11-16T10:00:06Z',steps:admission.requiredSteps.map((name,i)=>({number:i+2,name,status:'completed',conclusion:'success',started_at:'2026-11-16T10:00:0'+i+'Z',completed_at:'2026-11-16T10:00:0'+(i+1)+'Z'}))}]};
 const commit={sha:expected.head,tree:{sha:expected.tree},message:expected.oneUseMessage,parents:[{sha:expected.parent}]},context=n2ApiJoin({run,jobs,commit},expected,admission).context;
 const records=structuredClone(v.base.records),binding={sourceIndexHash:N2_INDEX,driverHash:admission.bindings.driverHash,selectionHash:N2_SELECTION,helperHash:admission.bindings.helperHash,readerHash:admission.bindings.readerHash,slotHash:admission.bindings.slotHash,loggerHash:admission.bindings.loggerHash,worldHash:admission.bindings.worldHash};Object.assign(records[0],binding);
 const raw=records.map(r=>JSON.stringify(r)+'\n').join(''),observation=n2Replay(raw,binding,'normal',v.base.native);
 const custody={schema:'afw.c2-notices-n2.custody.v1',context:{head:context.head,runId:context.runId,runAttempt:1,job:context.job,proposalIndexHash:N2_INDEX},parentNonRoot:true,preflightOwned:true,preflightRemoved:true,checkedLaunches:3,checkedProcesses:3,uidGidGroupsLoopbackMatched:true,ownRootVerified:true,ownTempRemoved:true};
 const outcome={schema:'afw.c2-notices-n2.observation.v1',context,selectionHash:N2_SELECTION,bindings:structuredClone(admission.bindings),controls:structuredClone(admission.controls),capture:{exitCode:0,signal:'none',errorKind:'none',stdout:{bytes:5000,sha256:'a'.repeat(64)},stderr:{bytes:0,sha256:hash('')}},journal:{bytes:Buffer.byteLength(raw),sha256:hash(raw),stable:true,recorderFaultObserved:false,witness:{integrity:'complete',records,prefixBytes:Buffer.byteLength(raw),prefixSha256:hash(raw)}},observation,native:structuredClone(v.base.native),custody,SourceQualified:false,Task1Pass:false,nonclaims:{historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}};
 const input={run,jobs,commit,expected,transport:{runId:101,jobId:102,rawLog:''},artifact:{runId:101,jobId:102,listing:{total_count:1,artifacts:[{id:103,name:'afw-c2-notices-n2',expired:false,size_in_bytes:0,workflow_run:{id:101,head_sha:expected.head,head_branch:expected.branch},digest:''}]},artifactId:103,fileName:'c2-notices-n2.json',archiveBase64:'',payloadText:''}};
 n2Rewire(input,outcome,admission,hash);return {input,outcome,binding};
}
function n2Rewire(input,outcome,admission,hash,deflate=null,descriptor=false){
 const syn={schema:'afw.c2-notices-n2.synthetic.v1',context:outcome.context,selectionHash:N2_SELECTION,...admission.controls},dep={schema:'afw.c2-bootstrap-dependency-control.v1',id:'BOOTSTRAP_DEPENDENCY_ABSENT',status:'pass',observation:'EXPECTED_ENOENT'};
 const markers=['AFW_C2_NOTICES_N2_SYNTHETIC','AFW_C2_DEPENDENCY_CONTROL','AFW_C2_NOTICES_N2_CUSTODY','AFW_C2_NOTICES_N2_OUTCOME'],values=[syn,dep,outcome.custody,outcome];
 input.transport.rawLog=['2026-11-16T10:00:03.001Z ##[group]Run node docs/superpowers/source-lab/c2-t1-notices-n2/run-c2-notices-n2.mjs','2026-11-16T10:00:03.002Z ##[endgroup]',...values.map((value,i)=>'2026-11-16T10:00:03.'+(100+i)+'Z '+markers[i]+' '+JSON.stringify(value))].join('\n')+'\n';
 const payload=JSON.stringify(outcome)+'\n',zip=n2MakeZip(payload,deflate,descriptor);input.artifact.payloadText=payload;input.artifact.archiveBase64=zip.toString('base64');input.artifact.listing.artifacts[0].size_in_bytes=zip.length;input.artifact.listing.artifacts[0].digest='sha256:'+hash(zip);return input;
}
function n2RefreshWitness(outcome,hash){const w=outcome.journal.witness,raw=w.records.map(r=>JSON.stringify(r)+'\n').join('');w.prefixBytes=Buffer.byteLength(raw);w.prefixSha256=hash(raw);outcome.journal.bytes=w.prefixBytes;outcome.journal.sha256=w.prefixSha256;}
function n2FullControls(v,schema,admission,hash,inflate,deflate){
 const base=n2FullFixture(v,schema,admission,hash,inflate),results=[];
 const check=(id,want,fn)=>{let accepted=false;try{const r=fn();accepted=r!==false;}catch{}results.push({id,pass:accepted===want,accepted});};
 const consume=i=>n2Read(i,schema,admission,hash,inflate);
 check('ZIP_CRC_KNOWN_VECTOR',true,()=>n2Crc32(Buffer.from('123456789'))===0xcbf43926);
 check('FULL_VALID_STORED_ZIP',true,()=>consume(base.input));
 for(const [id,compressed,dd]of [['FULL_VALID_DEFLATE_ZIP',true,false],['FULL_VALID_DESCRIPTOR_ZIP',true,true]])check(id,true,()=>{const i=structuredClone(base.input);n2Rewire(i,base.outcome,admission,hash,compressed?deflate:null,dd);return consume(i);});
 for(const t of v.cases.filter(c=>c.accepted))check('FULL_'+t.id,true,()=>{const x=structuredClone(t),o=structuredClone(base.outcome),i=structuredClone(base.input);Object.assign(x.records[0],base.binding);const raw=x.records.map(r=>JSON.stringify(r)+'\n').join('');o.native=x.native;o.observation=n2Replay(raw,base.binding,x.condition,x.native);o.journal.witness.records=x.records;o.journal.witness.integrity=o.observation.integrity;n2RefreshWitness(o,hash);o.capture.errorKind=x.condition==='timeout'?'timeout':'none';o.capture.exitCode=x.native.cases.some(n=>n.status==='fail')||x.native.sourceFileFailure||x.condition==='timeout'?1:0;n2Rewire(i,o,admission,hash);return consume(i);});
 const mutateOutcome=(id,fn)=>check(id,false,()=>{const i=structuredClone(base.input),o=structuredClone(base.outcome);fn(o);n2Rewire(i,o,admission,hash);return consume(i);});
 for(const [id,path,value]of [
 ['SOURCE_QUALIFIED',['SourceQualified'],true],['TASK1',['Task1Pass'],true],['PCOFF',['nonclaims','PCoff'],true],['CONTEXT',['context','head'],'3'.repeat(40)],['BINDING',['bindings','helperHash'],'3'.repeat(64)],['SELECTION',['selectionHash'],'3'.repeat(64)],['CONTROLS',['controls','rejected'],20],['CUSTODY_ROOT',['custody','parentNonRoot'],false],['CUSTODY_LAUNCHES',['custody','checkedLaunches'],2],['CUSTODY_PROCESS_CAP',['custody','checkedProcesses'],25],['CLEANUP',['custody','ownTempRemoved'],false],['JOURNAL_UNSTABLE',['journal','stable'],false],['RECORDER_FAULT',['journal','recorderFaultObserved'],true],['JOURNAL_HASH',['journal','sha256'],'3'.repeat(64)],['WITNESS_BYTES',['journal','witness','prefixBytes'],1],['WITNESS_HASH',['journal','witness','prefixSha256'],'3'.repeat(64)],['PROJECTION',['observation','http',1,'status'],503],['ACTION_ERROR_MASKING',['observation','flow',3,'actionError'],{name:'Error',code:null,site:null}],['NATIVE_FALSE_WORK',['native','cases',3,'workEntered'],false],['CAPTURE_SPAWN',['capture','errorKind'],'spawn-enoent'],['CAPTURE_EXIT',['capture','exitCode'],1]
 ])mutateOutcome(id,o=>{let p=o;for(const k of path.slice(0,-1))p=p[k];p[path.at(-1)]=value;});
 for(const [id,path,value]of [
 ['RUN_ID',['run','id'],104],['RUN_HEAD',['run','head_sha'],'3'.repeat(40)],['RUN_BRANCH',['run','head_branch'],'other'],['RUN_WORKFLOW',['run','path'],'other.yml'],['RUN_EVENT',['run','event'],'workflow_dispatch'],['RUN_ATTEMPT',['run','run_attempt'],2],['RUN_FAILURE',['run','conclusion'],'failure'],['FOREIGN_REPO',['run','repository','full_name'],'other/repo'],['FOREIGN_HEAD_REPO',['run','head_repository','full_name'],'other/repo'],
 ['RUN_NAN',['run','run_started_at'],'2026-99-16T10:00:00Z'],['RUN_BOUNDS',['run','updated_at'],'2026-11-16T10:00:02Z'],['JOB_ID',['jobs','jobs',0,'id'],105],['JOB_RUN',['jobs','jobs',0,'run_id'],105],['JOB_HEAD',['jobs','jobs',0,'head_sha'],'3'.repeat(40)],['JOB_NAME',['jobs','jobs',0,'name'],'other'],['JOB_ATTEMPT',['jobs','jobs',0,'run_attempt'],2],['JOB_FAILED',['jobs','jobs',0,'conclusion'],'failure'],['JOB_COUNT',['jobs','total_count'],2],['JOB_CALENDAR',['jobs','jobs',0,'started_at'],'2026-02-31T10:00:00Z'],['STEP_NAN',['jobs','jobs',0,'steps',3,'started_at'],'2026-99-16T10:00:03Z'],['STEP_TIME',['jobs','jobs',0,'steps',3,'completed_at'],'2026-11-16T10:00:09Z'],['STEP_SKIP',['jobs','jobs',0,'steps',3,'conclusion'],'skipped'],['STEP_NAME',['jobs','jobs',0,'steps',3,'name'],'other'],['STEP_DUP_NUMBER',['jobs','jobs',0,'steps',3,'number'],2],
 ['COMMIT_TREE',['commit','tree','sha'],'3'.repeat(40)],['COMMIT_MSG',['commit','message'],'other'],['COMMIT_PARENT',['commit','parents',0,'sha'],'3'.repeat(40)],['TRANSPORT_JOB',['transport','jobId'],105],['ARTIFACT_ID',['artifact','artifactId'],105],['ARTIFACT_JOB',['artifact','jobId'],105],['ARTIFACT_RUN',['artifact','runId'],105],['ARTIFACT_FILENAME',['artifact','fileName'],'wrong.json'],['ARTIFACT_DIGEST',['artifact','listing','artifacts',0,'digest'],'sha256:'+'3'.repeat(64)],['ARTIFACT_SIZE',['artifact','listing','artifacts',0,'size_in_bytes'],1],['ARTIFACT_EXPIRED',['artifact','listing','artifacts',0,'expired'],true],['ARTIFACT_HEAD',['artifact','listing','artifacts',0,'workflow_run','head_sha'],'3'.repeat(40)],['ARTIFACT_COUNT',['artifact','listing','total_count'],2],['PAYLOAD_CHANGED',['artifact','payloadText'],'{}\n']
 ])check(id,false,()=>{const i=structuredClone(base.input);let p=i;for(const k of path.slice(0,-1))p=p[k];p[path.at(-1)]=value;return consume(i);});
 for(const [id,edit]of [
 ['LOG_INVALID_HEADER',s=>s.replace('2026-11-16T10:00:03.001Z','2026-99-16T10:00:03.001Z')],['LOG_INVALID_FRAME',s=>s.replace('2026-11-16T10:00:03.100Z','2026-99-16T10:00:03.100Z')],['LOG_OUTSIDE_TIME',s=>s.replace('2026-11-16T10:00:03.100Z','2026-11-16T10:09:03.100Z')],['LOG_NO_TIMESTAMP',s=>s.replaceAll(/2026-11-16T10:00:03\.\d+Z /g,'')],['LOG_LITERAL_ECHO',s=>s.replace('AFW_C2_NOTICES_N2_SYNTHETIC ','echo AFW_C2_NOTICES_N2_SYNTHETIC ')],['LOG_WRONG_COMMAND',s=>s.replace('##[group]Run node','##[group]Run other')],['LOG_FRONTIER',s=>s+'2026-11-16T10:00:03.900Z AFW_C2_NOTICES_N2_FRONTIER {}\n'],['LOG_DUPLICATE',s=>s+s.split('\n').find(l=>l.includes('AFW_C2_NOTICES_N2_OUTCOME '))+'\n'],['LOG_MISSING',s=>s.split('\n').filter(l=>!l.includes('AFW_C2_NOTICES_N2_CUSTODY ')).join('\n')]
 ])check(id,false,()=>{const i=structuredClone(base.input);i.transport.rawLog=edit(i.transport.rawLog);return consume(i);});
 for(const id of ['ZIP_CRC','ZIP_PATH','ZIP_MULTI_ENTRY','ZIP_PAYLOAD_BYTE','ZIP_CENTRAL_BOUNDS','ZIP_TRUNCATED','ZIP_ENCRYPTED'])check(id,false,()=>{const i=structuredClone(base.input),z=Buffer.from(i.artifact.archiveBase64,'base64');if(id==='ZIP_CRC')z[14]^=1;if(id==='ZIP_PATH')z[30]=120;if(id==='ZIP_MULTI_ENTRY')z.writeUInt16LE(2,z.length-12);if(id==='ZIP_PAYLOAD_BYTE')z[50]^=1;if(id==='ZIP_CENTRAL_BOUNDS')z.writeUInt32LE(z.length+1,z.length-6);if(id==='ZIP_TRUNCATED')z[z.length-22]=0;if(id==='ZIP_ENCRYPTED')z.writeUInt16LE(1,6);i.artifact.archiveBase64=z.toString('base64');i.artifact.listing.artifacts[0].digest='sha256:'+hash(z);return consume(i);});
 check('SCHEMA_SWAP',false,()=>n2Read(base.input,{type:'object'},admission,hash,inflate));check('ADMISSION_SWAP',false,()=>n2Read(base.input,schema,{...admission,commandStep:'other'},hash,inflate));
 return {checks:results,fixture:base};
}


function n2PrivateArrivalModel(t){
 const records=[];let fault=false,excluded=0;
 for(const a of t.arrivals){const text=a.message.literalTag+' '+a.message.serializedPayload,p=n2DecodePrivate(text);if(!p.recognized)continue;if(a.ordinal<=t.baselineArrivalOrdinal){excluded++;continue;}
  if(!ngInt(a.nodeElapsed,0,180000)||records.length===8){fault=true;continue;}
  records.push({arrivalOrdinal:a.ordinal,elapsedMs:a.nodeElapsed,window:a.nodeWindow,...p.facts});
 }
 return {records,excluded,fault,interpretation:'unknown',correlated:null};
}
function n2ContainedDiagnostic(sink,value){try{sink(value);}catch{}}
function n2PrivateExtraControls(messages,options){
 const checks=[];
 for(const t of messages.deliveryCases){const r=n2PrivateArrivalModel(t),e=t.expected;let pass=r.interpretation==='unknown'&&r.correlated===null;
  if(Object.hasOwn(e,'newRecords'))pass&&=r.records.length===e.newRecords;
  if(e.branchLabels)pass&&=ngSame(r.records.map(g=>g.tag),e.branchLabels);
  if(e.distinctBranchLabels!==undefined)pass&&=new Set(r.records.map(g=>g.tag)).size===e.distinctBranchLabels;
  if(e.nodeAssociation)pass&&=r.records.every(g=>g.window===e.nodeAssociation);
  if(e.withinCap!==undefined)pass&&=r.fault===!e.withinCap;
  if(e.safeState)pass&&=r.fault;
  pass&&=!JSON.stringify(r).includes('OWN_SYNTHETIC_PRIVATE_SENTINEL');
  checks.push({id:'private-arrival/'+t.id,pass});
 }
 for(const t of messages.errorPreservation){
  const values={null:null,undefined:undefined,false:false,zero:0,'empty-string':'','object-identity':{}},original=values[t.originalThrow.kind];let caught=false,actual;
  try{try{throw original;}catch(error){n2ContainedDiagnostic(()=>{throw Error(t.diagnosticFault.kind);},null);throw error;}}catch(error){caught=true;actual=error;}
  checks.push({id:'original-error-model/'+t.id,pass:caught&&Object.is(actual,original)});
 }
 for(const t of options.hookSafety){const x=t.input;let pass;
  if(t.expected.admissible!==undefined)pass=(x.callbackReturns==='undefined'&&x.awaitCount===0&&x.rpcCount===0&&x.rawForwardCount===0)===t.expected.admissible;
  else{let threw=false;try{n2ContainedDiagnostic(()=>{throw Error(x.sinkErrorRef);},null);}catch{threw=true;}pass=!threw&&x.originalErrorRef===t.expected.actualWorkErrorRef;}
  checks.push({id:'callback-model/'+t.id,pass});
 }
 return checks;
}
function n2CoherentControls(v,schema,admission,hash,inflate){return v.cases.map(t=>{let accepted=false;try{accepted=n2Read(t.input,schema,admission,hash,inflate).diagnosticCaptureAccepted===true;}catch{}return {id:t.id,pass:accepted===t.accepted,accepted};});}
function n2ExtraZipControls(v,schema,admission,hash,inflate,deflate){
 const base=n2FullFixture(v,schema,admission,hash,inflate),checks=[];
 for(const id of ['ZIP_DESCRIPTOR_NO_SIGNATURE','ZIP_DESCRIPTOR_CRC','ZIP_DESCRIPTOR_SIZE','ZIP_LOCAL_NAME','ZIP_CENTRAL_NAME','ZIP_ZERO_ENTRY','ZIP_MULTIDISK','ZIP64_LENGTH','ZIP_EXTRA_TRAILER','ZIP_NONCANONICAL_BASE64']){
  const input=structuredClone(base.input);n2Rewire(input,base.outcome,admission,hash,deflate,true);let z=Buffer.from(input.artifact.archiveBase64,'base64'),e=z.length-22,c=z.readUInt32LE(e+16),d=c-16;
  if(id==='ZIP_DESCRIPTOR_NO_SIGNATURE'){z=Buffer.concat([z.subarray(0,d),z.subarray(d+4)]);z.writeUInt32LE(c-4,z.length-6);}
  if(id==='ZIP_DESCRIPTOR_CRC')z[d+4]^=1;
  if(id==='ZIP_DESCRIPTOR_SIZE')z[d+8]^=1;
  if(id==='ZIP_LOCAL_NAME')z[30]^=1;
  if(id==='ZIP_CENTRAL_NAME')z[c+46]^=1;
  if(id==='ZIP_ZERO_ENTRY')z.writeUInt16LE(0,e+8);
  if(id==='ZIP_MULTIDISK')z.writeUInt16LE(1,e+4);
  if(id==='ZIP64_LENGTH')z.writeUInt32LE(0xffffffff,c+24);
  if(id==='ZIP_EXTRA_TRAILER')z=Buffer.concat([z,Buffer.from('x')]);
  input.artifact.archiveBase64=z.toString('base64')+(id==='ZIP_NONCANONICAL_BASE64'?'\n':'');input.artifact.listing.artifacts[0].size_in_bytes=z.length;input.artifact.listing.artifacts[0].digest='sha256:'+hash(z);
  let accepted=false;try{accepted=n2Read(input,schema,admission,hash,inflate).diagnosticCaptureAccepted;}catch{}checks.push({id,pass:accepted===(id==='ZIP_DESCRIPTOR_NO_SIGNATURE'),accepted});
 }return checks;
}
function n2AllControls(data,schema,admission,hash,inflate,deflate){
 const groups={journal:n2JournalControls(data.journal),generic:n2JournalControls(data.generic),privateModels:n2PrivateUnitControls(data.messages,data.options,data.accessors),deliveryErrorModels:n2PrivateExtraControls(data.messages,data.options),privateProbe:n2PrivateControls(data.privateProbe),fullInput:n2FullControls(data.journal,schema,admission,hash,inflate,deflate).checks,coherent:n2CoherentControls(data.coherent,schema,admission,hash,inflate),zipFormats:n2ExtraZipControls(data.journal,schema,admission,hash,inflate,deflate)};
 const checks=Object.entries(groups).flatMap(([group,rows])=>rows.map(c=>({...c,id:group+'/'+c.id})));return {groups,checks};
}
export {n2AllControls};
