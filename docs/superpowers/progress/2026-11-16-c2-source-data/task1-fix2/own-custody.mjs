function c2SourceCustodyRead(frame,expected){
 const bad=()=>{throw Error('C2_SOURCE_CUSTODY_UNQUALIFIED');},marker='AFW_C2_SOURCE_CUSTODY ';
 const obj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
 if(typeof frame!=='string'||!frame.startsWith(marker)||!frame.endsWith('\n')||frame.slice(0,-1).includes('\n')||encodeURIComponent(frame).replace(/%[A-Fa-f0-9]{2}|./g,'x').length>1024)bad();
 let v;try{v=JSON.parse(frame.slice(marker.length,-1));}catch{bad();}
 if(JSON.stringify(v)!==frame.slice(marker.length,-1)||!obj(v)||Object.keys(v).join(',')!=='schema,context,parentNonRoot,preflightOwned,preflightRemoved,checkedLaunches,checkedProcesses,uidGidGroupsLoopbackMatched,ownRootVerified,ownTempRemoved'||v.schema!=='afw.c2-source-custody.v1')bad();
 if(!obj(v.context)||Object.keys(v.context).join(',')!=='head,runId,runAttempt,job,proposalIndexHash'||JSON.stringify(v.context)!==JSON.stringify(expected))bad();
 if(!/^[a-f0-9]{40}$/.test(v.context.head)||!/^[1-9][0-9]*$/.test(v.context.runId)||v.context.runAttempt!==1||v.context.job!=='c2-source-lab'||!/^[a-f0-9]{64}$/.test(v.context.proposalIndexHash))bad();
 if(!['parentNonRoot','preflightOwned','preflightRemoved','uidGidGroupsLoopbackMatched','ownRootVerified','ownTempRemoved'].every(k=>v[k]===true)||v.checkedLaunches!==6||!Number.isSafeInteger(v.checkedProcesses)||v.checkedProcesses<6||v.checkedProcesses>24)bad();
 return v;
}