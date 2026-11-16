function c2RootFix1Diagnostic(frame){
 const bad=()=>{throw Error('C2_DIAGNOSTIC_UNQUALIFIED');};
 const keys=(x,ks)=>{if(x===null||typeof x!=='object'||Array.isArray(x)||JSON.stringify(Object.keys(x))!==JSON.stringify(ks))bad();};
 const size=s=>{try{return encodeURIComponent(s).replace(/%[A-Fa-f0-9]{2}|./g,'x').length;}catch{bad();}};
 const marker='AFW_C2_SOURCE_DIAGNOSTIC ';
 if(typeof frame!=='string'||!frame.startsWith(marker)||!frame.endsWith('\n')||frame.slice(0,-1).includes('\n')||size(frame)>2048)bad();
 let x;const raw=frame.slice(marker.length,-1);try{x=JSON.parse(raw);}catch{bad();}if(JSON.stringify(x)!==raw)bad();
 keys(x,['phase','frontier','code','capture']);
 if(!['admission','materialize','baseline-red','proposal-green','mutant-prefix','regressions','cleanup'].includes(x.phase)||!['launch','TAP','frames','counters'].includes(x.frontier)||x.code!=='CAPTURE_INVALID')bad();
 if(x.capture!==null){
  const c=x.capture;keys(c,['exitCode','signal','errorKind','complete','stdout','stderr','observed']);
  if(c.exitCode!==null&&(!Number.isInteger(c.exitCode)||c.exitCode<0||c.exitCode>255)||!['none','SIGTERM','SIGKILL','SIGABRT','SIGSEGV','SIGINT','SIGHUP','SIGPIPE','other','unavailable'].includes(c.signal)||!['none','spawn-enoent','spawn-eacces','spawn-eperm','timeout','buffer-limit','spawn-other'].includes(c.errorKind)||typeof c.complete!=='boolean')bad();
  for(const o of [c.stdout,c.stderr])if(o!==null){keys(o,['bytes','sha256']);if(!Number.isSafeInteger(o.bytes)||o.bytes<0||o.bytes>33554432||typeof o.sha256!=='string'||!/^[a-f0-9]{64}$/.test(o.sha256))bad();}
  if(c.observed!==null){
   const o=c.observed;keys(o,['tapResults','knownResults','knownFrames','firstKnownFailure','sourceFileFailure','dependencyOutcome','errorKinds']);
   for(const [k,max]of [['tapResults',128],['knownResults',31],['knownFrames',20]])if(!Number.isInteger(o[k])||o[k]<0||o[k]>max)bad();
   const ids=['CONNECTION','OAUTH','HANDLE','PROJECTREF','SUBJECT','PHASE_RENAME','SOURCE_BYTES','APPROVAL','PREDECESSOR','GRANT_REVOKED','EXTRA_KEY','NOTICES','MONITOR_COOKIE','MONITOR','SCOPE_MISSING','FINITE','SELECTION','LOST_ACK_DUPLICATE','UNRESOLVED_WRITER','OWN_PROMISE'].map(s=>'C2T1_'+s).concat(Array.from({length:11},(_,i)=>'C2T1_REG_'+String(i+1).padStart(2,'0')));
   if(o.firstKnownFailure!==null&&!ids.includes(o.firstKnownFailure)||typeof o.sourceFileFailure!=='boolean'||![null,'EXPECTED_ENOENT','UNEXPECTED_SUCCESS','UNEXPECTED_ERROR'].includes(o.dependencyOutcome)||!Array.isArray(o.errorKinds)||o.errorKinds.length>4||new Set(o.errorKinds).size!==o.errorKinds.length||o.errorKinds.some(v=>!['file-not-found','module-not-found','assertion','syntax'].includes(v)))bad();
  }else if(c.complete)bad();
 }
 return {diagnostic:x,SourceQualified:false,firstHistoricalCauseProven:false,operationalReadiness:false,PCoff:false};
}
