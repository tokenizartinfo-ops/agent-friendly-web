function c2V2ReadFrame(line,expected,admitted,checkCases){
 const reject=()=>{throw Error('C2_V2_RECEIPT_UNQUALIFIED');};
 const keys=(v,k)=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).join(',')===k;
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const bytes=s=>encodeURIComponent(s).replace(/%[A-Fa-f0-9]{2}|./g,'x').length;
 const constants={repository:'tokenizartinfo-ops/agent-friendly-web',baselineSource:'6791ce1bab9372e206d3c7b42b3e1394dc6e0c68',baselineTree:'62e78926635d6b74f288d6c0d69e0f2516306989',proposalIndexHash:'b0af9ed81c8e7b21a35a3a8a08ca7b465b4549c625b20fcc883b1982ff97db03'};
 if(!keys(expected,'repository,baselineSource,baselineTree,proposalIndexHash,head,tree,runId,runAttempt,job,node')||!Object.entries(constants).every(([k,v])=>expected[k]===v)||!/^[a-f0-9]{40}$/.test(expected.head)||!/^[a-f0-9]{40}$/.test(expected.tree)||!/^[1-9][0-9]*$/.test(expected.runId)||expected.runAttempt!==1||expected.job!=='c2-source-lab-v2'||expected.node!=='v22.23.4')reject();
 const kinds={AFW_C2_SOURCE_SYNTHETIC_V2:['synthetic',2048],AFW_C2_DEPENDENCY_CONTROL:['dependency',1024],AFW_C2_SOURCE_MODE_V2:['mode',12288],AFW_C2_SOURCE_CUSTODY_V2:['custody',1024],AFW_C2_SOURCE_RECEIPT_V2:['receipt',24576]};
 if(typeof line!=='string'||!line.endsWith('\n')||line.slice(0,-1).includes('\n'))reject();
 const at=line.indexOf(' '),marker=line.slice(0,at),kind=kinds[marker],body=line.slice(at+1,-1);
 if(!kind||bytes(body)>kind[1])reject();
 let value;try{value=JSON.parse(body);}catch{reject();}
 if(body!==JSON.stringify(value))reject();
 const hashes=['7daaeb72f174744ecc11e234f899c75ed5a17daa1e820271e015bf179e9aac6b','ecb5037b4f3274c5afcab5bb2a7fdc4ca3795e450583db7b13e3eed98955d3f3','7b77711a74b39e7e4381dc66fa7044c31d532b9f52a118f5990df3c9246ed29e','e2100bd28bf4143ed768ce5f0441baa42f7b19a14fc1c28249f68dfa961a68d6'];
 const modes=['baseline-red','proposal-green','mutant-prefix','regressions'];
 const witness={caseId:'C2T1_NOTICES',phase:'notices',failureType:'testCodeFailure',code:'ERR_ASSERTION',operator:'strictEqual',definitionFile:'S07',definitionBlob:'d4db10ee8a091434835a9ac28e0d607a5e9efd21',definitionLine:6,actionLine:36,fixtureFile:'S08',fixtureBlob:'65933f3ebd753859a3b341f684b46d11f5c43a5a',function:'choose',line:18,method:'GET',route:'/connections/finite-prepare',boundary:'before-form-parse-and-post',actual:503,expected:200};
 const observation=o=>{
  if(!keys(o,'mode,selectionHash,verdict,code,exitCode,totals,cases,witness'))reject();
  const n=modes.indexOf(o.mode);
  if(n<0||o.selectionHash!==hashes[n]||o.verdict!=='qualified'||o.code!=='OK'||!Array.isArray(o.cases))reject();
  if(n===3){
   if(o.exitCode!==0||o.cases.length!==11)reject();
   for(let i=0;i<11;i++){const c=o.cases[i];if(!keys(c,'id,status,code')||c.id!=='C2T1_REG_'+String(i+1).padStart(2,'0')||c.status!=='pass'||c.code!=='OK')reject();}
  }else{checkCases(o.mode,o.cases,o.exitCode);}
  if(n===0?!same(o.witness,witness):o.witness!==null)reject();
  const count=o.cases.length,passed=o.cases.filter(c=>c.status==='pass').length;
  if(!same(o.totals,{plan:count,tests:count,suites:0,pass:passed,fail:count-passed,cancelled:0,skipped:0,todo:0}))reject();
 };
 const checkContext=()=>{if(!same(value.context,expected))reject();};
 if(kind[0]==='dependency'){
  if(!same(value,{schema:'afw.c2-bootstrap-dependency-control.v1',id:'BOOTSTRAP_DEPENDENCY_ABSENT',status:'pass',observation:'EXPECTED_ENOENT'}))reject();
 }else if(kind[0]==='synthetic'){
  if(!keys(value,'schema,context,vectorsHash,accepted,rejected')||value.schema!=='afw.c2-source-synthetic.v2'||value.vectorsHash!=='30634f2a8c173f670ed2b4cc33a8a8846ac54ad4b5b15d8cb6b17a1ca64acac3'||value.accepted!==1||value.rejected!==30)reject();checkContext();
 }else if(kind[0]==='custody'){
  if(!keys(value,'schema,context,parentNonRoot,preflightOwned,preflightRemoved,checkedLaunches,checkedProcesses,uidGidGroupsLoopbackMatched,ownRootVerified,ownTempRemoved')||value.schema!=='afw.c2-source-custody.v2'||!same(value.context,{head:expected.head,runId:expected.runId,runAttempt:1,job:expected.job,proposalIndexHash:expected.proposalIndexHash})||value.checkedLaunches!==6||!Number.isSafeInteger(value.checkedProcesses)||value.checkedProcesses<6||value.checkedProcesses>24||!['parentNonRoot','preflightOwned','preflightRemoved','uidGidGroupsLoopbackMatched','ownRootVerified','ownTempRemoved'].every(k=>value[k]===true))reject();
 }else if(kind[0]==='mode'){
  if(!keys(value,'schema,context,observation')||value.schema!=='afw.c2-source-mode.v2')reject();checkContext();observation(value.observation);
 }else{
  if(!keys(value,'schema,context,admitted,observations,nonclaims')||value.schema!=='afw.c2-source-lab-receipt.v2')reject();checkContext();
  if(!Array.isArray(admitted)||admitted.length!==13||!same(value.admitted,admitted)||!Array.isArray(value.observations)||value.observations.length!==4)reject();
  for(let i=0;i<4;i++){if(value.observations[i].mode!==modes[i])reject();observation(value.observations[i]);}
  if(!same(value.nonclaims,{historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}))reject();
 }
 return {kind:kind[0],value};
}