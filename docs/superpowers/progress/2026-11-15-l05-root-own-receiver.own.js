function(wire,expected){
 const need=(v,m)=>{if(!v)throw Error("Root L05 observation: "+m);},same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const marker="AFW_L05_OBSERVATION/1 ",keys=["purpose","source","sourceTree","run","attempt","job","node","originalResult","probeCleanup","caseCleanup","firstSite","checkAtSite","eventAtCheck","stopClass","creatorSeen","shimSeen","wakeSeen","deadSeen","shimTerminalBeforeCleanup","kernelSite","kernelClass","markerAtOracle","markerAtCleanup","streams","nonclaims"];
 const claims=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"];
 const sites=["fixture","launch","ready","bind","pre_sleep","pre_interval","kill","creator_terminal","live_check","live_interval","early_event","writer_close","wake_dead_wait","order","event_identity","shim_terminal","marker","drain","streams","probe_cleanup","case_cleanup","none","unknown"];
 const kernel=["arm_set_verify","fd4_type_owner","fd4_read_mode","fd4_link_form","fd4_pid_tid","creator_ppid","stat_open","stat_read_close","stat_text","same_creator","arm_return","unknown"];
 const pick=(v,allowed,n)=>need(typeof v==="string"&&allowed.includes(v),n);
 need(typeof wire==="string"&&wire.length<=2048&&wire.startsWith(marker)&&wire.endsWith("\n")&&/^[\x20-\x7e]+\n$/.test(wire),"framing");
 const raw=wire.slice(marker.length,-1),r=JSON.parse(raw);need(r&&typeof r==="object"&&!Array.isArray(r)&&same(Object.keys(r),keys),"keys/order");need(JSON.stringify(r)===raw,"canonical JSON");
 need(r.purpose==="afw.l05.observation.v1","purpose");need(r.nonclaims&&typeof r.nonclaims==="object"&&!Array.isArray(r.nonclaims)&&same(Object.keys(r.nonclaims),claims)&&claims.every(k=>r.nonclaims[k]===false),"nonclaims");
 for(const k of ["originalResult","probeCleanup","caseCleanup"])pick(r[k],["passed","failed","unknown"],k);
 pick(r.firstSite,sites,"firstSite");pick(r.checkAtSite,["first","second","third","unknown"],"checkAtSite");pick(r.eventAtCheck,["wake","dead","unknown"],"eventAtCheck");pick(r.stopClass,["check_rejected","wait_expired","os_error","other","none","unknown"],"stopClass");
 for(const k of ["creatorSeen","shimSeen","wakeSeen","deadSeen","shimTerminalBeforeCleanup"])pick(r[k],["yes","no","unknown"],k);
 pick(r.kernelSite,kernel,"kernelSite");pick(r.kernelClass,["creator_dead","check_rejected","os_error","arm_return","unknown"],"kernelClass");
 for(const k of ["markerAtOracle","markerAtCleanup"])pick(r[k],["present","absent","unknown"],k);pick(r.streams,["empty","nonempty","unknown"],"streams");
 const ck=["source","sourceTree","run","attempt","job","node"],neutral=ck.every(k=>r[k]==="unknown");
 if(!neutral){need(expected&&/^[a-f0-9]{40}$/.test(expected.source)&&/^[a-f0-9]{40}$/.test(expected.sourceTree)&&/^[1-9][0-9]*$/.test(expected.run)&&expected.attempt===1&&expected.job==="readonly"&&expected.node==="22.23.4"&&Number.isSafeInteger(expected.jobId)&&expected.jobId>0,"external context");need(ck.every(k=>r[k]===expected[k]),"context binding");}
 else need(keys.slice(7,-1).every(k=>r[k]==="unknown"),"neutral measurements");
 if(r.stopClass==="check_rejected")need(!["none","unknown"].includes(r.firstSite)&&r.checkAtSite!=="unknown","original false-check attribution");
 if(r.firstSite==="none")need(r.stopClass==="none"&&r.originalResult==="passed"&&r.probeCleanup==="passed"&&r.caseCleanup==="passed","complete cursor");
 if(r.stopClass==="none")need(r.firstSite==="none"&&r.checkAtSite==="unknown"&&r.eventAtCheck==="unknown","none association");
 if(r.eventAtCheck!=="unknown")need(r.firstSite==="event_identity","event cursor");
 if(r.deadSeen==="yes")need(r.creatorSeen==="yes"&&r.shimSeen==="yes"&&r.wakeSeen==="yes","dead ordering");
 if(r.wakeSeen==="yes")need(r.creatorSeen==="yes"&&r.shimSeen==="yes","wake ordering");
 if(r.kernelClass==="creator_dead")need(r.kernelSite==="creator_ppid"&&r.deadSeen==="yes","original CreatorDead proof");
 if(r.kernelClass==="arm_return")need(r.kernelSite==="arm_return"&&r.deadSeen!=="yes","actual arm return");
 if(r.kernelSite==="arm_return")need(r.kernelClass==="arm_return","arm-site association");
 if(r.kernelClass==="check_rejected")need(!["unknown","arm_return"].includes(r.kernelSite),"kernel original check");
 if(r.kernelClass==="unknown")need(r.kernelSite==="unknown","unknown kernel attribution");
 if(r.originalResult==="passed"){need(["none","unknown","case_cleanup"].includes(r.firstSite)&&r.probeCleanup!=="failed"&&r.markerAtOracle!=="present"&&r.streams!=="nonempty"&&!["creatorSeen","shimSeen","wakeSeen","deadSeen","shimTerminalBeforeCleanup"].some(k=>r[k]==="no")&&["creator_dead","unknown"].includes(r.kernelClass),"original passed consistency");}
 return {accepted:true,contextObserved:!neutral,diagnosticOnly:true,qualified:false,NativeReleased:false,operationalReadiness:false,record:r};
}
