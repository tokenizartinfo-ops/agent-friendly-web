// Independent Root fixture-preflight parser only.
export default function(wire,ctx,approved){
 const need=(v,m)=>{if(!v)throw Error("Root serial-v2 preflight: "+m);},same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 need(typeof wire==="string"&&wire.length+"AFW_Q1_SERIAL_LAB_PREFLIGHT/2 ".length+1<=2048&&/^[\x20-\x7e]+$/.test(wire),"wire");
 const r=JSON.parse(wire);need(JSON.stringify(r)===wire,"canonical");
 const keys=["purpose","source","sourceTree","run","attempt","job","node","policySha256","schemaSha256","driverSha256","tests","fixtureOnly","nativeBusinessCases","nonclaims"];
 need(same(Object.keys(r),keys)&&r.purpose==="afw.q1.serial-source-lab.preflight.v2","shape");
 for(const key of ["source","sourceTree","run","attempt","job","node"])need(r[key]===ctx[key],"context");
 need(ctx.attempt===1&&ctx.job==="readonly"&&ctx.node==="22.23.4"&&/^[a-f0-9]{40}$/.test(ctx.source)&&/^[a-f0-9]{40}$/.test(ctx.sourceTree)&&/^[1-9][0-9]{0,19}$/.test(ctx.run),"expected_context");
 need(r.policySha256===approved.policySha256&&r.schemaSha256===approved.schemaSha256&&r.driverSha256===approved.driver.sha256,"pins");
 const tests=["isolation-original33","nested-T01","seal-and-import","trace-order/missing-nonkill/duplicateordinal/unknown-exception-inflight","timing-refusal-inner/outer/late","cleanup-uncertain","context-and-frame","fixedstderr/malformedstdout"];
 need(r.tests!==null&&typeof r.tests==="object"&&!Array.isArray(r.tests)&&same(Object.keys(r.tests),tests)&&Object.values(r.tests).every(x=>x==="passed"),"tests");
 const flags=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"];
 need(r.fixtureOnly===true&&r.nativeBusinessCases===0&&r.nonclaims!==null&&typeof r.nonclaims==="object"&&same(Object.keys(r.nonclaims),flags)&&Object.values(r.nonclaims).every(x=>x===false),"nonclaims");
 return{accepted:true,fixtureOnly:true,record:r,NativeReleased:false,operationalReadiness:false};
};
