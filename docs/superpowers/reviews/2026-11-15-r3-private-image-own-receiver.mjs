function(wire,stepOutcome){
 const need=(v,m)=>{if(!v)throw Error("Root startup diagnostic: "+m);};
 const marker="AFW_R3_DELIVERY_PRIVATE_IMAGE_DIAGNOSTIC/1 ",stages=["unknown","setup_rejected","cwd_rejected","copy_setup_rejected","cwd_checked","python_entered","imports_ready","creator_checked","pdeath_checked","image_checked","exec_handoff","node_entered","binding_checked","bootstrap_admitted","input_which_failed","input_path_rejected","input_realpath_failed","input_open_failed","input_fstat_failed","input_regular_rejected","input_setid_rejected","input_execbits_rejected","input_owner_rejected","input_caps_nonempty","input_xattr_failed","input_uid_rejected","input_gid_rejected","input_close_failed","copy_root_rejected","copy_create_failed","copy_read_failed","copy_write_failed","copy_readonly_failed","copy_seek_failed","copy_hash_mismatch","copy_source_changed","copy_target_changed","copy_size_rejected","copy_time_exceeded","copy_mode_failed","copy_writer_close_failed","copy_unavailable","target_fstat_failed","target_regular_rejected","target_setid_rejected","target_execbits_rejected","target_owner_rejected","target_writebits_rejected","target_caps_nonempty","target_xattr_failed","target_uid_rejected","target_gid_rejected","target_dup2_failed","target_close_failed","target_identity_rejected"];
 need(["success","failure"].includes(stepOutcome),"step-outcome");
 need(typeof wire==="string"&&wire.length<=2048&&wire.startsWith(marker)&&wire.endsWith("\n")&&!wire.endsWith("\n\n"),"frame");
 const payload=wire.slice(marker.length,-1);need(/^[\x20-\x7e]+$/.test(payload),"ascii");
 const r=JSON.parse(payload);need(JSON.stringify(r)===payload,"canonical");
 const keys=["purpose","scope","result","lastObserved","controlsInvoked","originalCLIInvoked","nativeBusinessCases","qualification","privateImageCleanup","nonclaims"];
 const closed=(o,ks)=>o!==null&&typeof o==="object"&&!Array.isArray(o)&&Object.keys(o).length===ks.length&&ks.every(k=>Object.prototype.hasOwnProperty.call(o,k));
 need(closed(r,keys),"closed-record");
 need(r.purpose==="afw.r3-delivery.private-image-diagnostic.v1"&&r.scope==="source_initial_only","purpose-scope");
 need(["unavailable","bootstrap_admitted"].includes(r.result)&&stages.includes(r.lastObserved),"result-stage");
 need(r.controlsInvoked===0&&r.originalCLIInvoked===0&&r.nativeBusinessCases===0&&r.qualification===false,"no-work");
 const claims=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"];
 need(typeof r.privateImageCleanup==="boolean","private-image-cleanup");
 need(closed(r.nonclaims,claims)&&claims.every(k=>r.nonclaims[k]===false),"nonclaims");
 const admitted=r.result==="bootstrap_admitted";
 need(!admitted||(r.lastObserved==="bootstrap_admitted"&&r.privateImageCleanup===true),"admitted-stage-cleanup");
 need(admitted?(stepOutcome==="success"):(stepOutcome==="failure"),"outcome");
 return {accepted:true,bootstrapAdmitted:admitted,record:r,qualified:false,NativeReleased:false,operationalReadiness:false};
}
