function c2OAuthDiagnosticRead(raw,expected){
 const bad=()=>{throw Error('C2_OAUTH_DIAGNOSTIC_REJECTED');};
 const obj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
 const keys=(v,s)=>obj(v)&&Object.keys(v).join(',')===s;
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const bool=v=>typeof v==='boolean';
 const uint=(v,m)=>Number.isSafeInteger(v)&&v>=0&&v<=m;
 const size=s=>encodeURIComponent(s).replace(/%[A-Fa-f0-9]{2}|./g,'x').length;
 if(typeof raw!=='string'||size(raw)>24576||!raw.endsWith('\n'))bad();
 let v;try{v=JSON.parse(raw.slice(0,-1));}catch{bad();}
 if(JSON.stringify(v)+'\n'!==raw||!keys(v,'schema,context,phase,SourceQualified,Task1Pass,diagnosticCaptureValid,capture,cases,auxiliaryEvents,custody,cleanup,nonclaims')||v.schema!=='afw.c2-oauth-diagnostic.v1'||v.SourceQualified!==false||v.Task1Pass!==false||!bool(v.diagnosticCaptureValid))bad();
 if(!['admission','materialize','custody-preflight','connection-oauth','custody-observation'].includes(v.phase))bad();
 if(!same(v.context,expected))bad();
 const checkCapture=c=>{
  if(c===null)return;
  if(!keys(c,'exitCode,signal,errorKind,complete,stdout,stderr')||!(c.exitCode===null||uint(c.exitCode,255))||!['none','SIGTERM','SIGKILL','SIGABRT','SIGSEGV','SIGINT','SIGHUP','SIGPIPE','other'].includes(c.signal)||!['none','timeout','buffer-limit','spawn-enoent','spawn-eacces','spawn-eperm','spawn-other'].includes(c.errorKind)||!bool(c.complete))bad();
  for(const [name,max]of [['stdout',1048576],['stderr',65536]]){const b=c[name];if(b!==null&&(!keys(b,'bytes,sha256')||!uint(b.bytes,max)||typeof b.sha256!=='string'||!/^[a-f0-9]{64}$/.test(b.sha256)))bad();}
  if(c.complete!==(c.exitCode!==null&&c.errorKind==='none'&&c.signal==='none'))bad();
 };
 checkCapture(v.capture);
 const position=p=>p===null||keys(p,'fileId,line,column')&&/^S(0[0-9]|1[0-2])$/.test(p.fileId)&&Number.isSafeInteger(p.line)&&p.line>0&&p.line<=5000&&Number.isSafeInteger(p.column)&&p.column>0&&p.column<=16384;
 const phases={62:'oauth-context',63:'oauth-kv',64:'oauth-client-registration',65:'oauth-get',66:'oauth-get',67:'oauth-post',68:'oauth-post',69:'oauth-sdk-observation'};
 const ids=['C2T1_CONNECTION','C2T1_OAUTH'];
 const event=(c,id)=>{
  if(!keys(c,'schema,id,status,casePhase,skip,todo,definition,error,sanitized')||c.schema!=='afw.c2-oauth-event.v1'||c.id!==id||!['pass','fail'].includes(c.status)||c.casePhase!==(id===null?null:id===ids[0]?'connection':'oauth')||c.skip!==false||c.todo!==false||c.sanitized!==true||!position(c.definition))bad();
  const e=c.error;
  if(c.status==='pass'&&e!==null||c.status==='fail'&&e===null)bad();
  if(e===null)return;
  if(!keys(e,'kind,code,position,sitePhase,httpActual,httpExpected,booleanActual,booleanExpected')||!['Error','TypeError','AssertionError','SyntaxError','RangeError','AbortError','other','unavailable'].includes(e.kind)||![null,'ERR_ASSERTION','ERR_TEST_FAILURE','ENOENT','EACCES','EPERM','ERR_MODULE_NOT_FOUND','ETIMEDOUT','ERR_INVALID_ARG_TYPE','ERR_STREAM_PREMATURE_CLOSE','other'].includes(e.code)||!position(e.position)||e.sitePhase!==(e.position?.fileId==='S08'?(phases[e.position.line]??null):null))bad();
  for(const k of ['httpActual','httpExpected'])if(e[k]!==null&&!(Number.isSafeInteger(e[k])&&e[k]>=100&&e[k]<=599))bad();
  for(const k of ['booleanActual','booleanExpected'])if(e[k]!==null&&!bool(e[k]))bad();
  if(e.httpExpected!==null&&![200,302].includes(e.httpExpected)||e.httpActual!==null&&e.httpExpected===null)bad();
 };
 if(!Array.isArray(v.cases)||v.cases.length>2||!Array.isArray(v.auxiliaryEvents)||v.auxiliaryEvents.length>4)bad();
 v.cases.forEach((c,i)=>event(c,ids[i]));v.auxiliaryEvents.forEach(c=>event(c,null));
 if(!keys(v.custody,'parentNonRoot,observedGuardRecords,uidGidAndGroupsAndLoopbackMatched,preflightCapture,preflightOwned,preflightRemoved,custodyFilesOwned')||!uint(v.custody.observedGuardRecords,8)||!['parentNonRoot','uidGidAndGroupsAndLoopbackMatched','preflightOwned','preflightRemoved','custodyFilesOwned'].every(k=>bool(v.custody[k])))bad();
 checkCapture(v.custody.preflightCapture);
 if(!keys(v.cleanup,'attempted,ownRootVerified,success,errorKind')||!['attempted','ownRootVerified','success'].every(k=>bool(v.cleanup[k]))||![null,'EACCES','EPERM','ENOTEMPTY','EBUSY','ENOENT','other'].includes(v.cleanup.errorKind))bad();
 if(v.cleanup.success&&(!v.cleanup.attempted||!v.cleanup.ownRootVerified||v.cleanup.errorKind!==null))bad();
 if(!keys(v.nonclaims,'historicalCauseProven,receiptAuthenticated,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified')||Object.values(v.nonclaims).some(x=>x!==false))bad();
 if(v.diagnosticCaptureValid&&!(v.cases.length===2&&v.capture?.stdout&&v.capture?.stderr&&['none','timeout'].includes(v.capture.errorKind)&&v.custody.parentNonRoot&&v.custody.observedGuardRecords>=2&&v.custody.uidGidAndGroupsAndLoopbackMatched&&v.custody.preflightOwned&&v.custody.preflightRemoved&&v.custody.custodyFilesOwned&&v.custody.preflightCapture?.complete&&v.custody.preflightCapture.exitCode===0&&v.cleanup.success))bad();
 return v;
}