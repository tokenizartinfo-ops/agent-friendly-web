function(wire,ctx,evidence=null){
 const need=(v,m)=>{if(!v)throw Error("Root serial pin unit: "+m)},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),int=x=>Number.isSafeInteger(x)&&x>0;
 const marker="AFW_SERIAL_ENTRY_PIN_UNIT/1 ",keys=["purpose","source","sourceTree","run","attempt","job","node","normalSha256","candidateSha256","caseInputs","retargetCalls","renderedEntries","normalPinComputations","candidatePinComputations","byteEquivalence","readOrderPreserved","edgeControls","mutants","nativeBusinessCases","nonclaims"],nk=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"];
 need(typeof wire==="string"&&wire.length<=2048&&wire.startsWith(marker)&&wire.endsWith("\n")&&!wire.slice(0,-1).includes("\n")&&/^[\x20-\x7e]*\n$/.test(wire),"frame");
 const raw=wire.slice(marker.length,-1),r=JSON.parse(raw);need(r&&eq(Object.keys(r),keys)&&JSON.stringify(r)===raw,"canonical ordered shape");
 need(r.purpose==="afw.serial-entry-pin.unit.v1"&&r.nonclaims&&eq(Object.keys(r.nonclaims),nk)&&nk.every(k=>r.nonclaims[k]===false),"purpose/nonclaims");
 need(/^[a-f0-9]{40}$/.test(r.source)&&/^[a-f0-9]{40}$/.test(r.sourceTree)&&typeof r.source==="string"&&typeof r.sourceTree==="string"&&typeof r.run==="string"&&/^[1-9][0-9]{0,19}$/.test(r.run)&&int(Number(r.run)),"identity grammar");
 need(r.attempt===1&&r.job==="readonly"&&r.node==="22.23.4"&&r.normalSha256==="060c5b493d3c832efb057e786ccb622adfef0c14233cf5e394b053485981e7df"&&typeof r.candidateSha256==="string"&&/^[a-f0-9]{64}$/.test(r.candidateSha256),"pins/context");
 for(const k of ["source","sourceTree","run","attempt","job","node","candidateSha256"])need(r[k]===ctx[k],"expected "+k);
 need(r.caseInputs===520&&r.retargetCalls===1020&&r.renderedEntries===3060&&r.normalPinComputations===6120&&r.candidatePinComputations===626&&r.byteEquivalence===true&&r.readOrderPreserved===true&&r.edgeControls==="passed"&&r.nativeBusinessCases===0,"unit facts");
 need(r.mutants&&eq(Object.keys(r.mutants),["M_LENGTH","M_SECOND","M_RECOMPUTE"])&&Object.values(r.mutants).every(x=>x==="killed"),"negative variants");
 const out={accepted:true,contextObserved:false,unitControlsPassed:false,qualified:false,NativeReleased:false,operationalReadiness:false,record:r};
 if(evidence===null)return out;
 const run=evidence.run,commit=evidence.commit,jobs=evidence.jobs;
 need(run&&run.id===Number(ctx.run)&&run.run_attempt===1&&run.head_sha===ctx.source&&run.head_branch==="feat/finite-native-cleanup-20261101"&&run.path===".github/workflows/afw-finite-budget-qualification.yml"&&run.event==="push"&&run.status==="completed"&&typeof run.conclusion==="string"&&run.conclusion.length>0,"API run");
 need(commit&&commit.sha===ctx.source&&commit.tree?.sha===ctx.sourceTree,"API tree");
 need(Array.isArray(jobs)&&jobs.length===1&&int(ctx.jobId),"one actual job");
 const job=jobs[0];need(job.id===ctx.jobId&&job.name==="readonly"&&job.run_id===run.id&&job.run_attempt===1&&job.head_sha===ctx.source&&job.status==="completed"&&typeof job.conclusion==="string"&&job.conclusion.length>0,"API job");
 need(Array.isArray(job.steps),"steps");
 const one=name=>{const a=job.steps.filter(s=>s.name===name);need(a.length===1,"unique "+name);return a[0]};
 const checkout=one("Run actions/checkout@11d5960a326750d5838078e36cf38b85af677262"),node=one("Run actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020"),unit=one("Check serial entry pin reuse"),full=one("Run declared full104 controls only");
 need([checkout,node,unit].every(s=>s.status==="completed"&&s.conclusion==="success"&&int(s.number))&&checkout.number<node.number&&node.number<unit.number&&unit.number<full.number,"setup and unit step");
 need(Array.isArray(evidence.unitFrames)&&eq(evidence.unitFrames,[wire])&&evidence.unitFrameStepNumber===unit.number,"unique exact unit frame and step");
 out.contextObserved=true;out.unitControlsPassed=true;return out;
}
