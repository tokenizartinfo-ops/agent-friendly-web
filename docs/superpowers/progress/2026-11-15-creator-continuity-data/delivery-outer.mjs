// Trusted outer: builtins only until the closed output boundary.
import * as r3fs from 'node:fs';
import {TextDecoder as R3Decoder} from 'node:util';
import {spawn as r3Spawn} from 'node:child_process';
import {createHash as r3Hash} from 'node:crypto';
const r3FallbackDelivery={"purpose":"afw.r3-delivery.unavailable.v1","reason":"outer_startup_unavailable","source":"unknown","sourceTree":"unknown","run":"unknown","attempt":"unknown","job":"unknown","node":"unknown","controls":"unknown","availability":"unavailable","sourceQualified":false,"collectionComplete":"unknown","sampleObserved":"unknown","nonclaims":{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}},r3FallbackControls={"purpose":"afw.r3-delivery.controls-unavailable.v1","reason":"outer_startup_unavailable","source":"unknown","sourceTree":"unknown","run":"unknown","attempt":"unknown","job":"unknown","node":"unknown","allPassed":"unknown","expected":104,"passed":"unknown","failed":"unknown","unknown":"unknown","results":"unknown","mutants":"unknown","nativeBusinessCases":0,"nonclaims":{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}};
async function runDelivery(){return await r3Outer('delivery');}
async function runControls(){return await r3Outer('controls');}
async function r3Outer(kind){
 let stage='binding_unavailable',image,creatorHandle,helperHandle,publishing=false;
 const emit=(record,marker)=>{const b=Buffer.from(marker+' '+JSON.stringify(record)+'\n');publishing=true;if(r3fs.writeSync(1,b)!==b.length)throw 1;};
 const fallback=reason=>{emit({...(kind==='controls'?r3FallbackControls:r3FallbackDelivery),reason},kind==='controls'?'AFW_R3_DELIVERY_CONTROLS_UNAVAILABLE/1':'AFW_R3_DELIVERY_UNAVAILABLE/1');return 23;};
 try{
  const {openSync,fstatSync,readSync,closeSync,constants}=r3fs,TextDecoder=R3Decoder;
  const invalid=()=>{const e=new Error();e.code='AFW_INVALID';return e;};
const uid=process.getuid(),dirFlags=constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW;
function checked(fd,directory){const s=fstatSync(fd);if((directory?!s.isDirectory():!s.isFile())||s.uid!==uid||(s.mode&0o022)!==0||(!directory&&(s.nlink!==1||(s.mode&0o077)!==0)))throw invalid();return s;}
function readFixed(base,parts,max){
 let fd,leaf;
 try{fd=openSync(base,dirFlags);checked(fd,true);for(const part of parts.slice(0,-1)){if(!/^[a-zA-Z0-9.-]+$/.test(part))throw invalid();const next=openSync('/proc/self/fd/'+fd+'/'+part,dirFlags);try{checked(next,true);}catch(e){closeSync(next);throw e;}closeSync(fd);fd=next;}
 leaf=openSync('/proc/self/fd/'+fd+'/'+parts.at(-1),constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);const before=checked(leaf,false);if(before.size>max)throw invalid();
 const out=Buffer.alloc(max+1);let offset=0;while(offset<out.length){const n=readSync(leaf,out,offset,out.length-offset,null);if(n===0)break;offset+=n;}const after=checked(leaf,false);
 if(offset>max||offset!==before.size||before.dev!==after.dev||before.ino!==after.ino||before.size!==after.size||before.mtimeMs!==after.mtimeMs||before.ctimeMs!==after.ctimeMs)throw invalid();
 // ignoreBOM:true PRESERVES U+FEFF; ASCII/canonical receivers must reject it.
 try{return new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(out.subarray(0,offset));}catch{throw invalid();}
 }finally{if(leaf!==undefined)closeSync(leaf);if(fd!==undefined)closeSync(fd);}
}
function jsonFixed(base,parts,max){const raw=readFixed(base,parts,max),v=JSON.parse(raw);if(JSON.stringify(v)!==raw)throw invalid();return v;}

  function shape(v,s){
 const need=x=>{if(!x)throw 1;};
 if(s.anyOf){let count=0;for(const one of s.anyOf)try{shape(v,one);count++;}catch{}need(count===1);return;}
 if(s.enum){need(s.enum.some(x=>Object.is(x,v)));return;}
 if(s.type==='null'){need(v===null);return;}
 if(s.type==='integer'){need(Number.isSafeInteger(v)&&v>=s.minimum&&v<=s.maximum);return;}
 if(s.type==='string'){need(typeof v==='string'&&new RegExp(s.pattern).test(v));return;}
 if(s.type==='array'){need(Array.isArray(v)&&v.length>=s.minItems&&v.length<=s.maxItems);for(const x of v)shape(x,s.items);return;}
 if(s.type==='object'){need(v&&typeof v==='object'&&!Array.isArray(v)&&s.additionalProperties===false&&JSON.stringify(Object.keys(v).sort())===JSON.stringify(s.required.slice().sort()));for(const k of s.required)shape(v[k],s.properties[k]);return;}throw 1;
}

  const need=x=>{if(!x)throw 1;},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const base=process.env.RUNNER_TEMP,e=process.env;
  need(process.versions.node==='22.23.4'&&typeof base==='string'&&base.startsWith('/')&&base.length<=4096&&!base.includes('\0')&&r3fs.realpathSync(base)===base);
  const own=openSync(base+'/afw-r3-delivery',constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW);try{const s=fstatSync(own);need(s.isDirectory()&&s.uid===process.getuid()&&!(s.mode&0o077));}finally{closeSync(own);}
  const boundImage=fstatSync(3),runningImage=r3fs.statSync('/proc/self/exe');need(boundImage.isFile()&&boundImage.dev===runningImage.dev&&boundImage.ino===runningImage.ino&&boundImage.size===runningImage.size);
  const c=jsonFixed(base,['afw-r3-delivery','context.json'],2048);
  need(['purpose','source','sourceTree','run','job','node'].every(k=>typeof c[k]==='string')&&eq(Object.keys(c),['purpose','source','sourceTree','run','attempt','job','node'])&&c.purpose==='afw.r3-delivery.binding.v1'&&c.node==='22.23.4'&&c.attempt===1&&c.job==='readonly'&&/^[a-f0-9]{40}$/.test(c.source)&&/^[a-f0-9]{40}$/.test(c.sourceTree)&&/^[1-9][0-9]{0,19}$/.test(c.run));
  for(const[k,v]of Object.entries({GITHUB_SHA:c.source,GITHUB_RUN_ID:c.run,GITHUB_RUN_ATTEMPT:'1',GITHUB_JOB:'readonly',GITHUB_REPOSITORY:'tokenizartinfo-ops/agent-friendly-web',GITHUB_REPOSITORY_ID:'1347578006',GITHUB_REF:'refs/heads/feat/finite-native-cleanup-20261101'}))need(e[k]===v);
  const ctx={source:c.source,tree:c.sourceTree,run:c.run,attempt:1,job:'readonly'};
  // Immutable Source-code authority; NOT a child-readable authority-file load.
  const R3_AUTHORITY_ANCHOR={"site-schema.json":{"bytes":12651,"sha256":"5b55423937bbe38a18f1bbb8196d8cd85336d81187810b8c5b5abe8a593c37fd","blob":"4871edc102386fe6db65c773e51c21ecb94897e3","framing":"canonical-json+lf"},"site-map.json":{"bytes":6630,"sha256":"1be6536669654bcc8c181ed7057b189352bef9b0587eb75f4124500477e4f2fe","blob":"57c5a96710f0a2d97656b400882d8b4b4a1a7e2f","framing":"canonical-json"},"envelope-schema.json":{"bytes":5616,"sha256":"49c2a27cf977f0c9247fb8f20539fb29a9ca002294d86eeb0d9db8f876e090e5","blob":"90831bbc3035d944c4ae8f96d2cfa6b24362eb9f","framing":"canonical-json"},"delivery-schema.json":{"bytes":1380,"sha256":"d8332c8bf26c4224bd2a5da321dc50a28a2d6391b294bc262a438c2638fa2f60","blob":"ae706e0e659d0ee7647bbec8e6b3d9ebbcac3df8","framing":"canonical-json"},"unavailable-schema.json":{"bytes":1315,"sha256":"10d6dee3228f75a1ea09ebfa365287a460ec06537c8c0a3e3bb11702605806f9","blob":"4a310ddcef7b1b7bf0755bf56b760486254cf8c6","framing":"canonical-json"},"controls-schema.json":{"bytes":4681,"sha256":"2d0a4c404abfb107e44ab369f2998b1bbbbba2734cbf993acf8c8f2c0fe47d83","blob":"8586d4387a5fcd95b18d7c966cf841432330a789","framing":"canonical-json"},"matrix.json":{"bytes":24054,"sha256":"0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e","blob":"5b829c768ed3d7af03d5eb3f1870599d39bfd083","framing":"canonical-json"},"fixtures.json":{"bytes":7988,"sha256":"06b7dc9e63c178b6b823db1ee56049ce4d1406861df240ca2fbc119d2df45bc9","blob":"f29e76fd04627ebe5d1100007808610ebc240571","framing":"canonical-json"},"examples.json":{"bytes":22739,"sha256":"4f8da5a563bb0498cc506d693421853777ba7efb67d42da44b1889e5fef7b945","blob":"6f28d4f4479fb093aec3188d21b1796fd7c3fff2","framing":"canonical-json"},"controls-unavailable-example.json":{"bytes":568,"sha256":"7544b33859efe6ba2f6f1789e709f89f5f94f08352dd4fe4b14d700b19b22644","blob":"beedc03c8066cef6e6a24914d5334f99183d014b","framing":"canonical-json"}};
  const freeze=v=>{if(v&&typeof v==='object'){for(const x of Object.values(v))freeze(x);Object.freeze(v);}return v;},authority={};
  for(const[name,pin]of Object.entries(R3_AUTHORITY_ANCHOR)){
   const raw=readFixed(base,['afw-r3-delivery',name],pin.bytes),bytes=Buffer.from(raw);
   need(bytes.length===pin.bytes&&r3Hash('sha256').update(bytes).digest('hex')===pin.sha256&&r3Hash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex')===pin.blob);
   const parsed=JSON.parse(raw),framed=JSON.stringify(parsed)+(pin.framing==='canonical-json+lf'?'\n':'');need(raw===framed);authority[name]=freeze(parsed);
  }freeze(authority);
  const checkContext=r=>{for(const k of ['source','sourceTree','run','attempt','job','node'])need(r[k]===c[k]);};
  const matrix=authority['matrix.json'],reportSchema=authority['controls-schema.json'],ids=matrix.ordered.map(x=>x.id),mutants=matrix.mutants;
  function report(r){
   shape(r,reportSchema);checkContext(r);need(r.matrixSha256===R3_AUTHORITY_ANCHOR['matrix.json'].sha256&&r.expected===ids.length&&r.nativeBusinessCases===0&&eq(r.results.map(x=>x.id),ids)&&eq(r.mutants.map(x=>x.id),mutants.map(x=>x.id)));
   for(const name of ['passed','failed','unknown'])need(r[name]===r.results.filter(x=>x.result===name).length);
   for(let i=0;i<mutants.length;i++){const x=r.mutants[i],wanted=mutants[i];need(eq(x.expectedFailedIds,wanted.expectedFailedIds));need(eq(x.actualFailedIds,ids.filter(id=>x.actualFailedIds.includes(id)))&&new Set(x.actualFailedIds).size===x.actualFailedIds.length);if(x.result==='passed')need(eq(x.actualFailedIds,wanted.expectedFailedIds));if(x.result==='failed')need(!eq(x.actualFailedIds,wanted.expectedFailedIds));}
   const order=['baseline',...mutants.map(x=>x.id)].flatMap(group=>ids.map(id=>group+':'+id)),cl=r.cleanup;
   for(const k of ['failedInstances','unknownInstances'])need(eq(cl[k],order.filter(id=>cl[k].includes(id)))&&new Set(cl[k]).size===cl[k].length);need(!cl.failedInstances.some(id=>cl.unknownInstances.includes(id)));
   const passed=r.passed===ids.length&&r.failed===0&&r.unknown===0&&r.mutants.every(x=>x.result==='passed')&&cl.complete===true&&cl.failedInstances.length===0&&cl.unknownInstances.length===0;
   need(r.allPassed===passed);return passed;
  }
  const admitSource=function(wire,ctx,schema,expected,aliases){
 const admitted=(function(wire,ctx,schema,expected,aliases){
 const need=(x,m)=>{if(!x)throw Error("site:"+m);},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function shape(v,s){if(s.anyOf){need(s.anyOf.filter(t=>{try{shape(v,t);return true;}catch{return false;}}).length===1,"union");return;}if(s.enum){need(s.enum.some(x=>Object.is(v,x)),"enum");return;}switch(s.type){case"null":need(v===null,"null");break;case"boolean":need(typeof v==="boolean","boolean");break;case"integer":need(Number.isSafeInteger(v)&&v>=s.minimum&&v<=s.maximum,"integer");break;case"string":need(typeof v==="string"&&new RegExp(s.pattern).test(v),"string");break;case"array":need(Array.isArray(v)&&v.length>=s.minItems&&v.length<=s.maxItems,"array");v.forEach(x=>shape(x,s.items));break;case"object":need(v&&typeof v==="object"&&!Array.isArray(v)&&s.additionalProperties===false&&eq(Object.keys(v).sort(),s.required.slice().sort()),"keys");s.required.forEach(k=>shape(v[k],s.properties[k]));break;default:throw Error("schema");}}
 need(typeof wire==="string"&&wire.length<=16384&&/^[\x20-\x7E]*$/.test(wire),"wire");const r=JSON.parse(wire);need(JSON.stringify(r)===wire,"canonical");shape(r,schema);
 need(ctx.attempt===1&&r.attempt===ctx.attempt&&ctx.job==="readonly"&&r.job===ctx.job&&r.source===ctx.source&&r.run===String(ctx.run),"context");
 need(r.sourceTree===null||r.sourceTree===ctx.tree,"tree");
 for(const k of["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"])need(r[k]===false,k);
 const n=r.businessCommand,p=r.sourceProof,proof=r.programProof;
 need(p.mapBlob==="57c5a96710f0a2d97656b400882d8b4b4a1a7e2f"&&p.mapSha256==="1be6536669654bcc8c181ed7057b189352bef9b0587eb75f4124500477e4f2fe","map");
 if(r.controls.passed)need(r.controls.count===6&&r.controls.expected===6&&r.controls.usableShape&&r.controls.usableColumns,"controls");
 if(r.pure.passed)need(r.controls.passed&&r.pure.cases===8&&r.pure.expected===8,"pure");
 if(r.profile.passed)need(r.pure.passed&&r.profile.group==="readonly","profile");
 if(n.started===true){need(r.node==="22.23.4"&&r.sourceTree===ctx.tree&&proof.verified&&proof.count===18&&proof.setSha256===expected.programSet&&proof.payloadExpandedSha256===expected.expanded&&proof.coreGitVerified&&proof.prefixVerified,"programproof");need(p.mapVerified&&p.worldBeforeVerified&&p.nativeBeforeVerified&&r.controls.passed&&r.pure.passed&&r.profile.passed,"nativegates");}
 else need(n.ended===false&&n.exitCode===null&&r.readonly===null,"notobserved");
 if(n.ended)need(n.started===true,"ended");
 if(["SIGTERM","SIGKILL","SIGINT"].includes(n.signal))need(n.started===true&&n.ended===true,"signalclosed");
 if(n.started===false)need(n.signal==="none","nostartsignal");
 if(n.started===null)need(n.signal==="unknown","unknownstartsignal");
 if(n.exitCode!==null)need(n.ended&&n.signal==="none","exit");
 const q=r.readonly;let known=0;
 if(q){
  need(eq(q.rows.map(x=>x.case),["R1","R2","R3"]),"rows");
  for(const row of q.rows)need((row.result==="failed")===(row.error!==null),"rowerror");
  for(const error of[...q.rows.map(x=>x.error),q.precase?.error].filter(Boolean)){need(error.sourceSite==="unknown"||aliases.includes(error.sourceSite),"alias");if(error.causeCode!=="ERR_ASSERTION")need(error.sourceSite==="unknown","nonassert");if(error.sourceSite!=="unknown")known++;}
  const first=q.precase?{target:"native_file",error:q.precase.error}:q.rows.filter(x=>x.result==="failed").map(x=>({target:x.case,error:x.error}))[0]??null;
  need(eq(q.firstFailure,first),"first");
  if(q.valid){
   need(q.ended&&n.ended&&n.signal==="none"&&q.summary!==null&&q.state!=="unknown","validend");
   for(const error of [...q.rows.map(x=>x.error),q.precase?.error].filter(Boolean))need(!["testTimeoutFailure","cancelledByParent","testAborted"].includes(error.wrapperFailureType),"cancelledcoverage");
   const file=q.state==="file_failure";if(file)need(q.precase?.result==="failed"&&q.rows.every(x=>x.result==="not_observed"),"file");else need(q.precase===null&&q.rows.every(x=>["passed","failed"].includes(x.result)),"cases");
   const pass=file?0:q.rows.filter(x=>x.result==="passed").length,fail=file?1:3-pass,counts={cancelled:0,failed:fail,passed:pass,skipped:0,suites:0,tests:file?1:3,todo:0,topLevel:file?1:3};
   for(const[k,v]of Object.entries(counts))need(q.summary.counts[k]===v,"counts"+k);
   need(q.summary.success===(fail===0)&&q.state===(file?"file_failure":fail?"case_failure":"all_pass")&&(n.exitCode===0)===(fail===0),"result");
  }else need(q.state==="unknown"&&q.summary===null,"unknownstream");
 }
 if(known>0)need(p.mapVerified&&p.worldBeforeVerified&&p.nativeBeforeVerified&&p.worldAfterVerified&&p.nativeAfterVerified&&p.originalBodiesUnchanged,"usableprovenance");
 need(r.usableLocationCount===known,"locationcount");need(r.collectionComplete===(r.stage==="complete"),"coverage");
 if(r.stage==="complete")need(n.started===true&&n.ended&&n.signal==="none"&&Number.isSafeInteger(n.exitCode)&&q?.valid&&p.mapVerified&&p.worldBeforeVerified&&p.nativeBeforeVerified&&p.worldAfterVerified&&p.nativeAfterVerified&&p.originalBodiesUnchanged,"complete");
 if(r.stage==="hold")need(n.started===false,"hold");
 return{record:r,diagnosticCollectionComplete:r.collectionComplete,usableLocationCount:known,commandExitedZero:n.ended&&n.exitCode===0&&n.signal==="none",historicalCauseProven:false,operationalReadiness:false,PCoff:false};
})(wire,ctx,schema,expected,aliases),r=admitted.record;
 const need=(x,m)=>{if(!x)throw Error('Root readonly provenance: '+m);};
 need(r.sourceTree===ctx.tree&&r.node==='22.23.4'&&['complete','unknown'].includes(r.stage),'context-stage');
 const p=r.programProof,s=r.sourceProof,n=r.businessCommand;
 need(p.verified===true&&p.count===18&&p.setSha256===expected.programSet&&p.payloadExpandedSha256===expected.expanded&&p.coreGitVerified===true&&p.prefixVerified===true,'all-program-proofs');
 need(['mapVerified','worldBeforeVerified','nativeBeforeVerified','worldAfterVerified','nativeAfterVerified','originalBodiesUnchanged'].every(k=>s[k]===true),'all-source-proofs');
 need(r.controls.passed===true&&r.controls.count===6&&r.controls.expected===6&&r.controls.usableShape===true&&r.controls.usableColumns===true,'controls');
 need(r.pure.passed===true&&r.pure.cases===8&&r.pure.expected===8&&r.profile.passed===true&&r.profile.group==='readonly','pure-profile');
 need(n.started===true&&n.ended===true&&['none','SIGTERM','SIGKILL','SIGINT'].includes(n.signal),'original-command-terminal');
 return {...admitted,sourceQualifiedForSample:true,NativePassClaimed:false};
}
,admitSample=function(wire,ctx){
 const need=(v,m)=>{if(!v)throw Error("r3sample:"+m);},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const keys=(v,ks)=>need(v&&typeof v==="object"&&!Array.isArray(v)&&eq(Object.keys(v).sort(),ks.slice().sort()),"keys");
 const one=(v,vs)=>vs.some(x=>Object.is(x,v)),u="unknown",count=(v,max,min=0)=>v===u||Number.isSafeInteger(v)&&v>=min&&v<=max;
 need(typeof wire==="string"&&wire.length<=4096&&/^[\x20-\x7E\n]*$/.test(wire),"wire");
 const r=JSON.parse(wire);need(wire===JSON.stringify(r)||wire===JSON.stringify(r)+"\n","canonical");
 keys(r,["purpose","source","run","attempt","case","sampleState","sample","nonclaims"]);
 need(r.purpose==="afw.r3-existing-sample.syn.v1"&&r.case==="R3"&&ctx.attempt===1&&r.attempt===1&&r.source===ctx.source&&r.run===String(ctx.run)&&/^[a-f0-9]{40}$/.test(r.source)&&/^[1-9][0-9]{0,19}$/.test(r.run),"context");
 need(ctx.sourceQualified===true,"sourceproof");need(one(r.sampleState,["observed","not_observed"]),"state");
 const fs=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"];keys(r.nonclaims,fs);fs.forEach(k=>need(r.nonclaims[k]===false,k));
 const s=r.sample,bs=["observerInvalid","queueObserverInvalid","sdkObserverInvalid","childAbortSeen","parentAliveAtAbort","workPendingAtAbort","sameWorkWaitError"],ks=["inputSeeded","seedEntries","lists","gets","nativeInvoked","nativeSettled","nativeRejected","nativeUnsettled","outwardPending","heldNativeSettled",...bs,"selectedChildCount","selectedChildOrdinal","selectedChildFamily","childWorkStatus","childWaitStatus","queueCount","lastQueueFamily","lastQueueChild","lastQueueActive","lastQueueQueued","lastQueueMethod","heldOperationCount","phase"];keys(s,ks);
 need(one(s.inputSeeded,[true,false,u]),"seed");need(count(s.seedEntries,201),"entries");bs.forEach(k=>need(one(s[k],[true,false,u]),k));
 for(const[k,max,min]of[["lists",2,0],["gets",200,0],["nativeInvoked",202,0],["nativeSettled",202,0],["nativeRejected",202,0],["nativeUnsettled",2,0],["outwardPending",2,0],["heldNativeSettled",2,0],["selectedChildOrdinal",65535,1],["queueCount",512,0],["lastQueueChild",65535,1],["lastQueueQueued",200,0]])need(count(s[k],max,min),k);
 need(one(s.selectedChildCount,[0,1,"multiple",u]),"children");need(one(s.selectedChildFamily,[1,2,u]),"family");for(const k of ["childWorkStatus","childWaitStatus"])need(one(s[k],["unregistered","pending","fulfilled","rejected",u]),k);
 for(const k of ["lastQueueFamily","lastQueueActive"])need(one(s[k],[1,2,u]),k);need(one(s.lastQueueMethod,["get","list","delete",u]),"method");need(one(s.heldOperationCount,[0,1,2,"multiple",u]),"held");
 keys(s.phase,["completeWrites","completeNormal","lookupStage","authorizePostFinally"]);for(const k of["completeWrites","completeNormal"])need(one(s.phase[k],[0,1,"multiple",u]),k);need(one(s.phase.lookupStage,["not_seen","entered","exited",u]),"lookup");need(one(s.phase.authorizePostFinally,["not_seen","one","multiple",u]),"postfinally");
 if(s.selectedChildCount!==1)for(const k of ["selectedChildOrdinal","selectedChildFamily","childWorkStatus","childWaitStatus","childAbortSeen","parentAliveAtAbort","workPendingAtAbort","sameWorkWaitError"])need(s[k]===u,"childassociation");
 if(s.queueCount===0||s.queueCount===u)for(const k of ["lastQueueFamily","lastQueueChild","lastQueueActive","lastQueueQueued","lastQueueMethod"])need(s[k]===u,"queueassociation");
 if(s.inputSeeded!==true)need(s.seedEntries===u,"seedassociation");
 if(s.inputSeeded===true)need(Number.isSafeInteger(s.seedEntries)&&s.seedEntries>=0&&s.seedEntries<=201,"seedmarker");
 if(r.sampleState==="not_observed"){for(const k of ks.filter(x=>x!=="phase"))need(s[k]===u,"absence");for(const v of Object.values(s.phase))need(v===u,"phaseabsence");}
 return {record:r,sourceQualified:true,sampleObserved:r.sampleState==="observed",historicalCauseProven:false,operationalReadiness:false,PCoff:false};
}
;
;

  let controlsBefore=false,sourceBefore=null;
  if(kind==='delivery'){
   try{controlsBefore=report(jsonFixed(base,['afw-r3-delivery','controls-report.json'],24576));}catch{}
   try{sourceBefore=admitSource(readFixed(base,['afw-site','public-result.json'],16384),ctx,authority['site-schema.json'],{programSet:'71b4454f4cd90f716852bbdbb44f686d7f46191e8d93f890c465a7cb5f29d9af',expanded:'cfcb0dc7992d27246dc785ef2991104f6715e61c9aa49cfddc0317b219e6ac91'},authority['site-map.json'].spans.map(x=>x.alias));}catch{}
  }
  // CURRENT kernel image, independent of all child-readable context/path data.
  image=openSync('/proc/self/exe',constants.O_RDONLY);const actual=fstatSync(image),current=r3fs.statSync('/proc/self/exe');need(actual.isFile()&&actual.dev===current.dev&&actual.ino===current.ino&&actual.size===current.size);
  // AFW_POST_ADMISSION_CONTROL_HOOK
  stage='helper_unavailable';const parentSnapshot=Buffer.from(readFixed(base,['afw-r3-delivery',kind==='controls'?'controls-boundary.py':'boundary.py'],32768));readFixed(base,['afw-r3-delivery','lifetime.py'],32768);
  creatorHandle=openSync('/proc/thread-self',constants.O_RDONLY|constants.O_DIRECTORY);helperHandle=openSync(base+'/afw-r3-delivery',constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW);
  const env={};for(const k of ['PATH','HOME','RUNNER_TEMP','CI','LANG','TZ','GITHUB_REPOSITORY','GITHUB_REPOSITORY_ID','GITHUB_REF','GITHUB_SHA','GITHUB_RUN_ID','GITHUB_RUN_ATTEMPT','GITHUB_JOB','GITHUB_WORKFLOW_REF'])if(e[k]!==undefined)env[k]=e[k];
  stage='parent_unavailable';
  const captured=await new Promise(resolve=>{
   let child,done=false,overflow=false,out=Buffer.alloc(0),err=Buffer.alloc(0),timer;
   const finish=(code=null,signal='unknown')=>{if(done)return;done=true;clearTimeout(timer);resolve({code,signal,out,err,overflow});};
   const stop=()=>{try{child?.kill('SIGKILL');}catch{}};
   try{child=r3Spawn('/usr/bin/python3',['-I','-S','/proc/self/fd/5',kind==='controls'?'parent-controls':'parent-delivery'],{env,stdio:['pipe','pipe','pipe',image,creatorHandle,5,helperHandle]});}catch{finish();return;}
   child.stdin.on('error',()=>{});child.stdin.end(parentSnapshot);
   const retain=(which,chunk,cap)=>{const prior=which==='out'?out:err,kept=Buffer.concat([prior,chunk.subarray(0,cap+1-prior.length)]);if(which==='out')out=kept;else err=kept;if(prior.length+chunk.length>cap){overflow=true;stop();}};
   child.stdout.on('data',b=>retain('out',b,kind==='controls'?24576:8192));child.stderr.on('data',b=>retain('err',b,4096));child.on('error',()=>{stop();finish();});child.on('close',(code,signal)=>finish(code,signal??'none'));
   timer=setTimeout(()=>{overflow=true;stop();},kind==='controls'?110000:4000);
  });
  need(!captured.overflow&&captured.err.length===0&&captured.signal==='none'&&[0,23].includes(captured.code));
  stage='record_invalid';
  const raw=new R3Decoder('utf-8',{fatal:true,ignoreBOM:true}).decode(captured.out);need(/^[\x20-\x7e\n]*$/.test(raw));
  const lines=raw.split('\n');need(lines.pop()===''&&lines.every(x=>x.length>0));
  const parse=(line,marker)=>{need(line.startsWith(marker+' '));const text=line.slice(marker.length+1),v=JSON.parse(text);need(JSON.stringify(v)===text);return v;};
  if(kind==='controls'){
   need(lines.length===1);const r=parse(lines[0],'AFW_R3_DELIVERY_CONTROLS/1'),passed=report(r);need(captured.code===(passed?0:23));emit(r,'AFW_R3_DELIVERY_CONTROLS/1');return passed?0:23;
  }
  need(controlsBefore);
  const d=parse(lines.at(-1),'AFW_R3_DELIVERY/1');shape(d,authority['delivery-schema.json']);checkContext(d);
  if(d.sourceQualified)need(sourceBefore?.sourceQualifiedForSample===true&&d.collectionComplete===sourceBefore.diagnosticCollectionComplete);
  if(d.availability==='available'){
   need(lines.length===2&&captured.code===0&&d.sourceQualified===true&&d.reason==='none');const s=parse(lines[0],'AFW_R3_EXISTING_SAMPLE/1');shape(s,authority['envelope-schema.json'].properties.sample.anyOf[0]);
   // Final independent normalized association/absence authority, BEFORE any write.
   admitSample(JSON.stringify(s),{...ctx,sourceQualified:true});
   need(d.sampleObserved===(s.sampleState==='observed'));const b=Buffer.from(raw);publishing=true;need(r3fs.writeSync(1,b)===b.length);return 0;
  }
  need(lines.length===1&&captured.code===23&&d.sampleObserved==='unknown'&&d.reason!=='none');
  if(d.sourceQualified)need(['sample_missing','sample_invalid','io_unavailable'].includes(d.reason)&&typeof d.collectionComplete==='boolean');
  else need(['source_missing','source_invalid','io_unavailable'].includes(d.reason)&&d.collectionComplete==='unknown');
  emit(d,'AFW_R3_DELIVERY/1');return 23;
 }catch{if(publishing)return 23;return fallback(stage);}finally{for(const fd of[image,creatorHandle,helperHandle])if(fd!==undefined)try{r3fs.closeSync(fd);}catch{}}
}

process.exitCode=await runDelivery();
