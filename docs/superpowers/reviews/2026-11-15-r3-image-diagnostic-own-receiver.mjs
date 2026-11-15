function(wire,stepOutcome){
 const need=(v,m)=>{if(!v)throw Error("Root startup diagnostic: "+m);};
 const marker="AFW_R3_DELIVERY_IMAGE_DIAGNOSTIC/1 ",stages=["unknown","setup_rejected","cwd_rejected","cwd_checked","python_entered","imports_ready","creator_checked","pdeath_checked","image_checked","exec_handoff","node_entered","binding_checked","bootstrap_admitted","image_which_failed","image_path_rejected","image_realpath_failed","image_open_failed","image_fstat_failed","image_regular_rejected","image_setid_rejected","image_execbits_rejected","image_owner_rejected","image_writebits_rejected","image_caps_present","image_xattr_failed","image_uid_rejected","image_gid_rejected","image_dup2_failed","image_close_failed"];
 need(["success","failure"].includes(stepOutcome),"step-outcome");
 need(typeof wire==="string"&&wire.length<=2048&&wire.startsWith(marker)&&wire.endsWith("\n")&&!wire.endsWith("\n\n"),"frame");
 const payload=wire.slice(marker.length,-1);need(/^[\x20-\x7e]+$/.test(payload),"ascii");
 const r=JSON.parse(payload);need(JSON.stringify(r)===payload,"canonical");
 const keys=["purpose","scope","result","lastObserved","controlsInvoked","originalCLIInvoked","nativeBusinessCases","qualification","nonclaims"];
 const closed=(o,ks)=>o!==null&&typeof o==="object"&&!Array.isArray(o)&&Object.keys(o).length===ks.length&&ks.every(k=>Object.prototype.hasOwnProperty.call(o,k));
 need(closed(r,keys),"closed-record");
 need(r.purpose==="afw.r3-delivery.image-diagnostic.v1"&&r.scope==="source_initial_only","purpose-scope");
 need(["unavailable","bootstrap_admitted"].includes(r.result)&&stages.includes(r.lastObserved),"result-stage");
 need(r.controlsInvoked===0&&r.originalCLIInvoked===0&&r.nativeBusinessCases===0&&r.qualification===false,"no-work");
 const claims=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"];
 need(closed(r.nonclaims,claims)&&claims.every(k=>r.nonclaims[k]===false),"nonclaims");
 const admitted=r.result==="bootstrap_admitted";
 need(!admitted||r.lastObserved==="bootstrap_admitted","admitted-stage");
 need(admitted?(stepOutcome==="success"):(stepOutcome==="failure"),"outcome");
 return {accepted:true,bootstrapAdmitted:admitted,record:r,qualified:false,NativeReleased:false,operationalReadiness:false};
}
