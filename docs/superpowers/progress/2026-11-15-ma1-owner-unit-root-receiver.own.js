function(wire,ctx,evidence=null){
 const need=(v,m)=>{if(!v)throw Error("Root MA1 owner unit: "+m)},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),int=x=>Number.isInteger(x)&&x>0;
 const marker="AFW_MA1_READER_OWNER_UNIT/1 ",keys=["purpose","source","sourceTree","run","attempt","job","node","readerSha256","mutantSha256","normalOwner","stableWrongOwner","deletedOwnerGuard","targetedMutantControl","identityContinuity","nonclaims"],nk=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"];
 need(typeof wire==="string"&&wire.length<=2048&&wire.startsWith(marker)&&wire.endsWith("\n")&&!wire.slice(0,-1).includes("\n")&&/^[\x20-\x7e]*\n$/.test(wire),"frame");const raw=wire.slice(marker.length,-1),r=JSON.parse(raw);need(JSON.stringify(r)===raw&&eq(Object.keys(r),keys),"canonical ordered keys");need(r.purpose==="afw.ma1.reader-owner-unit.v1"&&r.nonclaims&&eq(Object.keys(r.nonclaims),nk)&&nk.every(k=>r.nonclaims[k]===false),"purpose/nonclaims");
 const out={accepted:true,contextObserved:false,unitControlsPassed:false,qualified:false,NativeReleased:false,operationalReadiness:false,record:r};
 if(keys.slice(1,-1).every(k=>r[k]==="unknown"))return out;
 need(typeof r.source==="string"&&typeof r.sourceTree==="string"&&/^[a-f0-9]{40}$/.test(r.source)&&/^[a-f0-9]{40}$/.test(r.sourceTree)&&typeof r.run==="string"&&/^[1-9][0-9]{0,19}$/.test(r.run)&&r.attempt===1&&r.job==="readonly"&&r.node==="22.23.4","context");need(ctx&&["source","sourceTree","run","attempt","job","node"].every(k=>r[k]===ctx[k]),"context match");
 const facts={readerSha256:"30a0e0ce3c31b4d59b3371babd749282f8e8cad60f13493bab68c2b94bbe2165",mutantSha256:"ab99a8fc2af7fc3521b8869183c39718ea72fba68c6b1b6ff7513bc5ec88541d",normalOwner:"returned_fixture",stableWrongOwner:"rejected",deletedOwnerGuard:"returned_fixture",targetedMutantControl:"failed",identityContinuity:"coherent"};need(Object.keys(facts).every(k=>r[k]===facts[k]),"causal facts");
 if(evidence===null)return out;
 const run=evidence.run,jobs=evidence.jobs,c=evidence.commit;
 need(int(ctx.jobId)&&run&&String(run.id)===r.run&&run.head_sha===r.source&&run.run_attempt===1&&run.event==="push"&&run.path===".github/workflows/afw-finite-budget-qualification.yml"&&run.head_branch==="feat/finite-native-cleanup-20261101"&&run.status==="completed"&&run.conclusion==="success","run");
 need(run.repository?.id===1347578006&&run.repository?.full_name==="tokenizartinfo-ops/agent-friendly-web","repo");
 need(c&&c.sha===r.source&&c.tree?.sha===r.sourceTree&&c.message==="AFW-MA1-READER-OWNER-UNIT-ONEUSE-20261115","commit");
 need(Array.isArray(jobs)&&jobs.length===1&&jobs[0].id===ctx.jobId&&jobs[0].run_id===run.id&&jobs[0].name==="readonly"&&jobs[0].status==="completed"&&jobs[0].conclusion==="success","job");const steps=jobs[0].steps;need(Array.isArray(steps),"steps");
 const a=steps.filter(s=>s.name==="Check fixed MA1 reader controls"),b=steps.filter(s=>s.name==="Check stable MA1 leaf owner control");need(a.length===1&&b.length===1&&a[0].status==="completed"&&a[0].conclusion==="success"&&b[0].status==="completed"&&b[0].conclusion==="success"&&int(a[0].number)&&int(b[0].number)&&a[0].number<b[0].number,"step");
 need(!steps.some(s=>["Run declared full104 controls only","Read fixed MA1 admission observation"].includes(s.name)),"unit only");
 need(eq(evidence.existingFrames,["MA1_READER_CONTROLS/1 passed=40\n"])&&evidence.existingFrameStepNumber===a[0].number&&eq(evidence.targetedFrames,[wire])&&evidence.targetedFrameStepNumber===b[0].number,"actual frames");
 out.contextObserved=true;out.unitControlsPassed=true;return out;
}
