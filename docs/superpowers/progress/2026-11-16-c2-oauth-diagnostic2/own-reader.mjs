function c2OAuthIndependentRead(raw,expected,baseReader){
 const bad=()=>{throw Error('C2_OAUTH_INDEPENDENT_DIAGNOSTIC_REJECTED');};
 const obj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v),keys=(v,k)=>obj(v)&&Object.keys(v).join(',')===k,same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const bytes=s=>encodeURIComponent(s).replace(/%[A-Fa-f0-9]{2}|./g,'x').length;
 if(typeof raw!=='string'||bytes(raw)>24576||!raw.endsWith('\n')||typeof baseReader!=='function')bad();
 let v;try{v=JSON.parse(raw.slice(0,-1));}catch{bad();}
 if(JSON.stringify(v)+'\n'!==raw||!keys(v,'schema,context,phase,SourceQualified,Task1Pass,diagnosticCaptureValid,capture,operations,lifecycle,cases,auxiliaryEvents,joins,custody,cleanup,nonclaims')||v.schema!=='afw.c2-oauth-independent-diagnostic.v1'||typeof v.diagnosticCaptureValid!=='boolean')bad();
 const common={schema:'afw.c2-oauth-diagnostic.v1',context:v.context,phase:v.phase,SourceQualified:v.SourceQualified,Task1Pass:v.Task1Pass,diagnosticCaptureValid:false,capture:v.capture,cases:v.cases,auxiliaryEvents:v.auxiliaryEvents,custody:v.custody,cleanup:v.cleanup,nonclaims:v.nonclaims};
 baseReader(JSON.stringify(common)+'\n',expected);
 const checkError=e=>{if(e===null)bad();baseReader(JSON.stringify({...common,cases:[],auxiliaryEvents:[{schema:'afw.c2-oauth-event.v1',id:null,status:'fail',casePhase:null,skip:false,todo:false,definition:null,error:e,sanitized:true}]})+'\n',expected);};
 const ids=['C2T1_CONNECTION','C2T1_OAUTH'],phaseSet=['initial','connection-action','connection-counter','between-cases','oauth-action','oauth-counter','complete'];
 if(!Array.isArray(v.operations)||v.operations.length>4||!Array.isArray(v.lifecycle)||v.lifecycle.length>2)bad();
 for(const x of v.operations){
  if(!keys(x,'schema,sequence,id,operation,status,error,sanitized')||x.schema!=='afw.c2-oauth-operation.v1'||!ids.includes(x.id)||!['action','counter'].includes(x.operation)||!['returned','threw'].includes(x.status)||x.sanitized!==true)bad();
  if(x.status==='threw')checkError(x.error);else if(x.error!==null)bad();
 }
 for(const x of v.lifecycle){
  if(!keys(x,'schema,sequence,hook,driverPhase,status,error,sanitized')||x.schema!=='afw.c2-oauth-lifecycle.v1'||x.hook!=='after'||!phaseSet.includes(x.driverPhase)||!['entered','close-returned','close-threw'].includes(x.status)||x.sanitized!==true)bad();
  if(x.status==='close-threw')checkError(x.error);else if(x.error!==null)bad();
 }
 const all=[...v.operations,...v.lifecycle].sort((a,b)=>a.sequence-b.sequence);
 if(all.some((x,i)=>!Number.isSafeInteger(x.sequence)||x.sequence!==i+1)||v.operations.some((x,i)=>i>0&&x.sequence<=v.operations[i-1].sequence)||v.lifecycle.some((x,i)=>i>0&&x.sequence<=v.lifecycle[i-1].sequence))bad();
 const order=ids.flatMap(id=>['action','counter'].map(operation=>({id,operation})));
 const operationOrderValid=v.operations.length===4&&v.operations.every((x,i)=>x.id===order[i].id&&x.operation===order[i].operation);
 const lifecycleValid=v.lifecycle.length===2&&v.lifecycle[0].status==='entered'&&['close-returned','close-threw'].includes(v.lifecycle[1].status);
 const nativeJoinValid=operationOrderValid&&v.cases.length===2&&v.cases.every((c,i)=>{const thrown=v.operations.slice(i*2,i*2+2).find(x=>x.status==='threw');return thrown?c.status==='fail'&&same(c.error,thrown.error):c.status==='pass'&&c.error===null;});
 const auxiliaryValid=lifecycleValid&&(v.lifecycle[1].status==='close-threw'?v.auxiliaryEvents.length===1&&v.auxiliaryEvents[0].status==='fail'&&same(v.auxiliaryEvents[0].error,v.lifecycle[1].error):v.auxiliaryEvents.length===0);
 const c=v.capture,cap=!!(c?.stdout&&c?.stderr)&&c.complete&&c.errorKind==='none'&&c.signal==='none'&&[0,1].includes(c.exitCode)&&c.stderr.bytes===0;
 const exitJoinValid=cap&&c.exitCode===(v.cases.some(x=>x.status==='fail')||v.auxiliaryEvents.length?1:0);
 if(!keys(v.joins,'operationOrderValid,lifecycleValid,nativeJoinValid,exitJoinValid')||!same(v.joins,{operationOrderValid,lifecycleValid,nativeJoinValid,exitJoinValid}))bad();
 const u=v.custody,pre=u.preflightCapture;
 const ownValid=all.length===6&&operationOrderValid&&lifecycleValid&&nativeJoinValid&&auxiliaryValid&&exitJoinValid&&u.parentNonRoot&&u.observedGuardRecords>=2&&u.uidGidAndGroupsAndLoopbackMatched&&u.preflightOwned&&u.preflightRemoved&&u.custodyFilesOwned&&pre?.complete&&pre.exitCode===0&&v.cleanup.success&&v.phase==='custody-observation';
 if(v.diagnosticCaptureValid&&!ownValid)bad();
 return {report:v,ownDiagnosticValid:v.diagnosticCaptureValid&&!!ownValid,SourceQualified:false,Task1Pass:false};
}