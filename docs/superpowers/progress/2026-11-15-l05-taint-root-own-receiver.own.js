function(wire,expected){
 const need=(v,m)=>{if(!v)throw Error("Root L05 taint controls: "+m);},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const marker="AFW_L05_TAINT_CONTROLS/1 ",keys=["purpose","source","sourceTree","run","attempt","job","node","ids","originalExpectedFailureIds","originalResults","fixedResults","controlsPassed","originalL05Occurrences","originalCLI","native","nonclaims"];
 const ids=["valid_note","valid_wait","buffer_limit","cumulative_limit","partial_abort","partial_eof","duplicate_note","malformed_note","ordinary_ready","summary_sink","undemuxed_partial"],red=["buffer_limit","cumulative_limit","partial_abort","undemuxed_partial"],claims=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"];
 need(typeof wire==="string"&&wire.length<=4096&&wire.startsWith(marker)&&/^[\x20-\x7e]+\n$/.test(wire),"framing");
 const raw=wire.slice(marker.length,-1),r=JSON.parse(raw);need(r&&typeof r==="object"&&!Array.isArray(r)&&eq(Object.keys(r),keys)&&JSON.stringify(r)===raw,"keys/canonical");
 need(r.purpose==="afw.l05-taint-controls.v1"&&eq(r.ids,ids)&&eq(r.originalExpectedFailureIds,red),"identity");
 for(const k of ["originalResults","fixedResults"])need(Array.isArray(r[k])&&r[k].length===ids.length&&r[k].every(x=>typeof x==="string"&&["passed","failed","unknown"].includes(x)),k);
 need(typeof r.controlsPassed==="boolean","boolean");for(const k of ["originalL05Occurrences","originalCLI","native"])need(typeof r[k]==="number"&&r[k]===0,k);
 need(r.nonclaims&&typeof r.nonclaims==="object"&&!Array.isArray(r.nonclaims)&&eq(Object.keys(r.nonclaims),claims)&&claims.every(k=>r.nonclaims[k]===false),"nonclaims");
 const ck=["source","sourceTree","run","attempt","job","node"],neutral=ck.every(k=>r[k]==="unknown");
 if(neutral)need(r.originalResults.every(x=>x==="unknown")&&r.fixedResults.every(x=>x==="unknown")&&r.controlsPassed===false,"neutral");
 else{need(expected&&/^[a-f0-9]{40}$/.test(expected.source)&&/^[a-f0-9]{40}$/.test(expected.sourceTree)&&/^[1-9][0-9]*$/.test(expected.run)&&expected.attempt===1&&expected.job==="readonly"&&expected.node==="22.23.4"&&Number.isSafeInteger(expected.jobId)&&expected.jobId>0,"external context");need(ck.every(k=>r[k]===expected[k]),"binding");}
 const green=!neutral&&r.originalResults.every((x,i)=>x===(red.includes(ids[i])?"failed":"passed"))&&r.fixedResults.every(x=>x==="passed");need(r.controlsPassed===green,"result truth");
 return{accepted:true,contextObserved:!neutral,unitControlsPassed:green,qualified:false,NativeReleased:false,operationalReadiness:false,record:r};
}
