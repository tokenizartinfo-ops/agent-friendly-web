function(wire,ctx,matrix,evidence=null){
 const need=(v,m)=>{if(!v)throw Error("Root MA1: "+m)},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),ints=x=>Number.isInteger(x)&&!Object.is(x,-0);
 const marker="AFW_MA1_ADMISSION/1 ",mh="0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e",ids=["baseline","M_RAW","M_PROVENANCE","M_OUTPUT","M_ASSOC"],nk=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"],keys=["purpose","source","sourceTree","run","attempt","job","node","matrixSha256","exceptionAt","phases","nonclaims"];
 need(typeof wire==="string"&&wire.length<=1024&&wire.startsWith(marker)&&wire.endsWith("\n")&&!wire.slice(0,-1).includes("\n")&&/^[\x20-\x7e]*\n$/.test(wire),"frame");
 const raw=wire.slice(marker.length,-1),r=JSON.parse(raw);need(JSON.stringify(r)===raw&&eq(Object.keys(r),keys),"canonical keys");need(r.purpose==="afw.ma1.admission.v1"&&r.nonclaims&&eq(Object.keys(r.nonclaims),nk)&&nk.every(k=>r.nonclaims[k]===false),"purpose/nonclaims");
 const unavailable=()=>({accepted:true,available:false,measurementEligible:false,qualified:false,NativeReleased:false,operationalReadiness:false,record:r});
 if(keys.slice(1,-1).every(k=>r[k]==="unknown"))return unavailable();
 need(/^[a-f0-9]{40}$/.test(r.source)&&/^[a-f0-9]{40}$/.test(r.sourceTree)&&typeof r.run==="string"&&/^[1-9][0-9]{0,19}$/.test(r.run)&&r.attempt===1&&r.job==="readonly"&&r.node==="22.23.4"&&r.matrixSha256===mh,"context");
 need(ctx&&["source","sourceTree","run","attempt","job","node"].every(k=>r[k]===ctx[k]),"context match");
 need(["none","preflight",...ids].includes(r.exceptionAt)&&Array.isArray(r.phases)&&r.phases.length===5,"phase shape");
 let stopped=r.exceptionAt==="preflight",innerStop=false,sawCatch=stopped;
 for(let i=0;i<5;i++){
  const t=r.phases[i];need(Array.isArray(t)&&t.length===6&&t[0]===ids[i]&&["untouched","gate","entered"].includes(t[1]),"phase order/state");
  const [id,state,a,u,b,c]=t;need(ints(a)&&ints(u)&&a>=0&&a<=104&&u>=0&&u<=a&&typeof b==="boolean"&&typeof c==="boolean","phase fields");
  const ex=r.exceptionAt===id;
  if(stopped){need(eq(t,[id,"untouched",0,0,false,false]),"stopped suffix");continue;}
  need(state!=="untouched"&&(i!==0||state==="entered"),"selected phase");
  if(innerStop)need(state==="gate","monotonic next gate");
  if(state==="gate"){
   need(i>0&&a===0&&u===0&&!c,"gate shape");need((b&&!ex)||(!b&&ex),"gate reason");stopped=true;innerStop=false;
  }else{
   need(!innerStop,"entered after inner stop");if(c)need(a===104&&!b,"complete implies exhausted");if(b)need(a<104&&!c,"row break prefix");
   if(!b&&!c)need(ex,"incomplete catch");if(i===0&&ex)need(!b&&!c,"baseline catch placement");
   innerStop=b&&!ex;stopped=ex;
  }
  if(ex)sawCatch=true;
 }
 need(r.exceptionAt==="none"?!sawCatch:sawCatch,"catch location");
 const out={accepted:true,available:true,measurementEligible:false,qualified:false,NativeReleased:false,operationalReadiness:false,record:r};
 if(evidence===null)return out;
 need(matrix&&Array.isArray(matrix.ordered)&&matrix.ordered.length===104&&Array.isArray(matrix.mutants)&&matrix.mutants.length===4,"matrix");
 need(eq(matrix.ordered.map(x=>x.id),["A01","A02","A03","A04","D01","D02","D03","D04","D05","D06","D07","D08","D09","D10","D11","D12","D13","P01","P02","P03","P04","P05","P06","P07","P08","P09","P10","P11","P12","P13","P14","P15","P16","P17","P18","P19","P20","P21","P22","P23","P24","P25","F01","F02","F03","F04","F05","F06","F07","F08","F09","B01","B02","B03","B04","B05","B06","B07","B08","B09","B10","B11","B12","B13","W01","W02","C01","C02","C03","C04","C05","D14","P26","F10","E01","E02","E03","E04","E05","E06","O01","O02","O03","O04","O05","S01","E07","T01","F11","A05","U01","U02","U03","U04","H01","L01","L02","L03","L04","L05","E08","E09","E10","E11"])&&eq(matrix.mutants.map(x=>[x.id,x.expectedFailedIds]),[["M_RAW",["D02"]],["M_PROVENANCE",["P06"]],["M_OUTPUT",["B05","U01"]],["M_ASSOC",["S01"]]]),"pinned matrix identities");
 const ac=evidence.original;need(ac&&ac.accepted===true&&ac.record&&["source","sourceTree","run","attempt","job","node","matrixSha256"].every(k=>ac.record[k]===r[k]),"original contextual");
 const o=ac.record,ordered=matrix.ordered.map(x=>x.id);need(o.results?.length===104&&o.results.every((x,i)=>x.id===ordered[i]&&["passed","failed","unknown"].includes(x.result))&&o.mutants?.length===4,"original rows");
 const [_,bs,ba,bu,bb,bc]=r.phases[0],unknownPrefix=o.results.slice(0,ba).filter(x=>x.result==="unknown").length;
 need(o.results.slice(ba).every(x=>x.result==="unknown"),"baseline unattempted unknown");
 if(r.exceptionAt==="baseline"){need(unknownPrefix===bu||(ba>0&&unknownPrefix===bu+1&&o.results[ba-1].result==="unknown"),"baseline catch join");}else need(unknownPrefix===bu,"baseline unknown join");
 for(let i=1;i<5;i++){
  const [id,s,a,u,b,c]=r.phases[i],m=o.mutants[i-1],spec=matrix.mutants[i-1];need(m.id===id&&spec.id===id&&eq(m.expectedFailedIds,spec.expectedFailedIds),"mutant identity");
  need(Array.isArray(m.actualFailedIds)&&m.actualFailedIds.length<=a-u&&m.actualFailedIds.every(x=>ordered.slice(0,a).includes(x)),"mutant failed prefix");
  const expected=m.actualFailedIds.filter(x=>ordered.includes(x)).slice().sort((x,y)=>ordered.indexOf(x)-ordered.indexOf(y));need(eq(expected,m.actualFailedIds)&&new Set(expected).size===expected.length,"mutant failure order");
  if(s!=="entered"){need(m.result==="unknown"&&m.actualFailedIds.length===0,"unentered original");continue;}
  const ex=r.exceptionAt===id,normal=(u>0||b)?"unknown":c?(eq(m.actualFailedIds,spec.expectedFailedIds)?"passed":"failed"):"unknown";
  if(!ex)need(m.result===normal,"mutant normal join");
  else if(!b&&!c)need(m.result==="unknown"&&m.actualFailedIds.length===0,"mutant in-loop catch initial");
  else need(m.result==="unknown"||m.result===normal,"mutant post-loop catch join");
 }
 const attempted=new Set();for(let i=0;i<5;i++)for(const id of ordered.slice(0,r.phases[i][2]))attempted.add(ids[i]+":"+id);
 need(o.cleanup&&Array.isArray(o.cleanup.failedInstances)&&Array.isArray(o.cleanup.unknownInstances)&&[...o.cleanup.failedInstances,...o.cleanup.unknownInstances].every(x=>attempted.has(x)),"cleanup attempted only");
 const run=evidence.run,jobs=evidence.jobs,commit=evidence.commit;
 need(ints(ctx.jobId)&&ctx.jobId>0&&run&&String(run.id)===r.run&&run.head_sha===r.source&&run.run_attempt===1&&run.event==="push"&&run.path===".github/workflows/afw-finite-budget-qualification.yml"&&run.status==="completed"&&typeof run.conclusion==="string"&&run.conclusion!=="","run metadata");
 need(commit&&commit.sha===r.source&&commit.tree?.sha===r.sourceTree,"Source tree metadata");
 need(Array.isArray(jobs)&&jobs.length===1&&jobs[0].id===ctx.jobId&&jobs[0].run_id===run.id&&jobs[0].name==="readonly"&&jobs[0].status==="completed"&&typeof jobs[0].conclusion==="string"&&jobs[0].conclusion!=="","job metadata");
 const steps=jobs[0].steps;need(Array.isArray(steps),"steps");const originals=steps.filter(s=>s.name==="Run declared full104 controls only"),readers=steps.filter(s=>s.name==="Read fixed MA1 admission observation");
 need(originals.length===1&&readers.length===1,"unique steps");const os=originals[0],rs=readers[0];const units=steps.filter(s=>s.name==="Check fixed MA1 reader controls");need(units.length===1&&units[0].status==="completed"&&units[0].conclusion==="success"&&ints(units[0].number)&&units[0].number<os.number,"reader cloud controls step");
 need(os.status==="completed"&&["success","failure"].includes(os.conclusion)&&rs.status==="completed"&&rs.conclusion==="success"&&ints(os.number)&&ints(rs.number)&&os.number<rs.number,"step binding");
 need(Array.isArray(evidence.readerFrames)&&evidence.readerFrames.length===1&&evidence.readerFrames[0]===wire&&evidence.readerFrameStepNumber===rs.number&&Array.isArray(evidence.originalFrames)&&evidence.originalFrames.length===1&&evidence.originalFrameStepNumber===os.number,"actual step frames");
 need(evidence.originalFrames[0]==="AFW_R3_DELIVERY_CONTROLS/1 "+JSON.stringify(o)+"\n","actual original frame equals accepted record");
 need(run.repository?.id===1347578006&&run.repository?.full_name==="tokenizartinfo-ops/agent-friendly-web"&&run.head_branch==="feat/finite-native-cleanup-20261101","API repository/ref");
 need(!(run.conclusion==="success"&&jobs[0].conclusion!=="success")&&!(jobs[0].conclusion==="success"&&os.conclusion!=="success"),"conclusion consistency");
 need(evidence.repository==="tokenizartinfo-ops/agent-friendly-web"&&evidence.repositoryId===1347578006&&evidence.ref==="refs/heads/feat/finite-native-cleanup-20261101","fixed origin");
 out.measurementEligible=true;out.observedAdmissionPhases=r.phases.filter(t=>t[4]).map(t=>t[0]);return out;
}
