# AFW — receptores Root del diagnóstico inicial

Contrato fijado antes del productor. No ejecutan Source; diagnóstico de bootstrap no equivale a calificación de controles ni readiness.

Receptor wire `a2da3cb46ee5b3a67c728ca109c6bbe978e28016`:

```javascript
function(wire,stepOutcome){
 const need=(v,m)=>{if(!v)throw Error("Root startup diagnostic: "+m);};
 const marker="AFW_R3_DELIVERY_STARTUP_DIAGNOSTIC/1 ",stages=["unknown","setup_rejected","cwd_rejected","cwd_checked","python_entered","imports_ready","creator_checked","pdeath_checked","image_checked","exec_handoff","node_entered","binding_checked","bootstrap_admitted"];
 need(["success","failure"].includes(stepOutcome),"step-outcome");
 need(typeof wire==="string"&&wire.length<=2048&&wire.startsWith(marker)&&wire.endsWith("\n")&&!wire.endsWith("\n\n"),"frame");
 const payload=wire.slice(marker.length,-1);need(/^[\x20-\x7e]+$/.test(payload),"ascii");
 const r=JSON.parse(payload);need(JSON.stringify(r)===payload,"canonical");
 const keys=["purpose","scope","result","lastObserved","controlsInvoked","originalCLIInvoked","nativeBusinessCases","qualification","nonclaims"];
 const closed=(o,ks)=>o!==null&&typeof o==="object"&&!Array.isArray(o)&&Object.keys(o).length===ks.length&&ks.every(k=>Object.prototype.hasOwnProperty.call(o,k));
 need(closed(r,keys),"closed-record");
 need(r.purpose==="afw.r3-delivery.startup-diagnostic.v1"&&r.scope==="source_initial_only","purpose-scope");
 need(["unavailable","bootstrap_admitted"].includes(r.result)&&stages.includes(r.lastObserved),"result-stage");
 need(r.controlsInvoked===0&&r.originalCLIInvoked===0&&r.nativeBusinessCases===0&&r.qualification===false,"no-work");
 const claims=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"];
 need(closed(r.nonclaims,claims)&&claims.every(k=>r.nonclaims[k]===false),"nonclaims");
 const admitted=r.result==="bootstrap_admitted";
 need(!admitted||r.lastObserved==="bootstrap_admitted","admitted-stage");
 need(admitted?(stepOutcome==="success"):(stepOutcome==="failure"),"outcome");
 return {accepted:true,bootstrapAdmitted:admitted,record:r,qualified:false,NativeReleased:false,operationalReadiness:false};
}
```

Receptor de traza `08f0acb71a17947e985eb36f12ebcfc25d14b8e1`:

```javascript
function(raw){
 const stages=["cwd_checked","python_entered","imports_ready","creator_checked","pdeath_checked","image_checked","exec_handoff","node_entered","binding_checked","bootstrap_admitted"];
 if(typeof raw!=="string"||raw.length===0||raw.length>256||!raw.endsWith("\n")||!/^[a-z_\n]+$/.test(raw))return "unknown";
 const rows=raw.slice(0,-1).split("\n");if(rows.length>stages.length||!rows.every((x,i)=>x===stages[i]))return "unknown";
 return rows.at(-1);
}
```

```json
{
  "positive": 7,
  "negative": 20,
  "tracePositive": 10,
  "traceNegative": 11,
  "SourceExecuted": false,
  "NativeReleased": false
}
```
