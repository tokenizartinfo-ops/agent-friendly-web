function(wire,ctx,schema){
 const need=(v,m)=>{if(!v)throw Error("Root A01 diagnostic: "+m);},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 need(ctx&&typeof ctx.source==="string"&&/^[a-f0-9]{40}$/.test(ctx.source)&&typeof ctx.sourceTree==="string"&&/^[a-f0-9]{40}$/.test(ctx.sourceTree)&&typeof ctx.run==="string"&&/^[1-9][0-9]{0,19}$/.test(ctx.run)&&ctx.attempt===1&&ctx.job==="readonly"&&ctx.node==="22.23.4","expected context");
 need(typeof wire==="string"&&wire.length<=2048&&/^[\x20-\x7e]+\n$/.test(wire),"ASCII single line");
 const marker="AFW_R3_DELIVERY_A01_DIAGNOSTIC/1 ";need(wire.startsWith(marker),"marker");
 const raw=wire.slice(marker.length,-1),r=JSON.parse(raw);need(JSON.stringify(r)===raw,"canonical");
 function shape(v,s){
  if(s.oneOf){let n=0;for(const a of s.oneOf)try{shape(v,a);n++;}catch{}need(n===1,"union");return;}
  if(s.enum){need(s.enum.some(a=>Object.is(a,v)),"enum");return;}
  if(s.type==="string"){need(typeof v==="string"&&new RegExp(s.pattern).test(v),"string");return;}
  if(s.type==="object"){need(v!==null&&typeof v==="object"&&!Array.isArray(v)&&s.additionalProperties===false&&eq(Object.keys(v),s.required),"ordered closed keys");for(const k of s.required)shape(v[k],s.properties[k]);return;}
  throw Error("Root unsupported schema");
 }shape(r,schema);
 const contextKeys=["source","sourceTree","run","attempt","job","node"],unknownContext=contextKeys.every(k=>r[k]==="unknown"),knownContext=contextKeys.every(k=>r[k]===ctx[k]);need(unknownContext||knownContext,"context binding");
 const fields=["phase","binding","atExec","exit","output","stderr"],unknownArm=a=>fields.every(k=>a[k]==="unknown"),neutral=a=>fields.slice(1).every(k=>a[k]==="unknown"),phases=["none","literal","bound","handoff","kernel","main_thread","creator","armed","bash_handoff"];
 function arm(a,isControl){
  if(a.phase==="unknown"){need(unknownArm(a),"neutral unknown");return;}
  if(a.phase==="not_run"){need(isControl&&neutral(a),"not run");return;}
  const rank=phases.indexOf(a.phase);need(rank>=0,"phase");
  if(rank<2)need(a.binding==="unknown","binding before bound");else need(a.binding!=="unknown","binding observed");
  if(rank<3)need(a.atExec==="unknown","flag before handoff");else{need(a.atExec!=="unknown","handoff flag");if(isControl)need(a.atExec==="inherit","control flag");else need(a.atExec===(a.binding.endsWith("_inherit")?"inherit":"cloexec"),"baseline unchanged flag");}
  if(rank>=4)need(a.atExec==="inherit","kernel requires inherited source");
  need(a.exit!=="unknown","observed exit");if(a.exit==="spawn_error")need(a.output==="unknown"&&a.stderr==="unknown","unmeasured failed capture");else need(a.output!=="unknown"&&a.stderr!=="unknown","terminal stream presence");
  if(a.output==="pair")need(a.phase==="bash_handoff"&&a.exit==="exit0"&&a.stderr==="empty","pair association");
  if(a.output.startsWith("fallback_"))need(a.phase==="bash_handoff"&&a.exit==="exit1"&&a.stderr==="empty","fallback association");
 }
 arm(r.baseline,false);arm(r.control,true);
 const trigger={phase:"handoff",binding:"same_cloexec",atExec:"cloexec",exit:"exit2",output:"empty",stderr:"present"},admitted=eq(r.baseline,trigger);
 if(unknownContext)need(unknownArm(r.baseline)&&unknownArm(r.control),"unavailable context arms");else need((r.control.phase==="not_run")===!admitted,"conditional control admission");
 let observation="unavailable_context";
 if(knownContext){observation=admitted?"undetermined":"control_not_admitted";if(admitted&&r.control.binding===r.baseline.binding&&r.control.atExec==="inherit"&&phases.indexOf(r.control.phase)>=4)observation=r.control.output==="pair"?"complete_a01_contrast":"kernel_handoff_contrast";}
 return {accepted:true,record:r,contextObserved:knownContext,controlAdmitted:knownContext&&admitted,observation,qualified:false,NativeReleased:false,historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
}