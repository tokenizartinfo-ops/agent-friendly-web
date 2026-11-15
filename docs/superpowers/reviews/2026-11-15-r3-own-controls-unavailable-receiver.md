# AFW — receptor Root para controles no disponibles

Función propia Root, fijada antes de una ejecución nueva. Blob `91d9339be63ca5ff5a39fe69f01a54b4f38bb657`. Aceptar un informe de indisponibilidad conserva todas las mediciones como desconocidas y nunca libera Native. No ejecuta Source.

```javascript
function(wire,expected){
 const need=(v,m)=>{if(!v)throw Error("Root controls unavailable: "+m);};
 need(Number.isSafeInteger(expected)&&expected>0,"expected-count");
 need(typeof wire==="string"&&wire.length<=8192&&/^[\x20-\x7e]+$/.test(wire),"wire");
 const r=JSON.parse(wire);need(JSON.stringify(r)===wire,"canonical");
 const keys=["purpose","reason","source","sourceTree","run","attempt","job","node","allPassed","expected","passed","failed","unknown","results","mutants","nativeBusinessCases","nonclaims"];
 const eqKeys=(o,ks)=>o!==null&&typeof o==="object"&&!Array.isArray(o)&&Object.keys(o).length===ks.length&&ks.every(k=>Object.prototype.hasOwnProperty.call(o,k));
 need(eqKeys(r,keys),"closed-record");
 need(r.purpose==="afw.r3-delivery.controls-unavailable.v1","purpose");
 need(["outer_startup_unavailable","setup_unavailable","binding_unavailable","helper_unavailable","parent_unavailable","record_invalid"].includes(r.reason),"reason");
 for(const k of ["source","sourceTree","run","attempt","job","node","allPassed","passed","failed","unknown","results","mutants"])need(r[k]==="unknown","unknown-"+k);
 need(r.expected===expected&&r.nativeBusinessCases===0,"counts");
 const claims=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"];
 need(eqKeys(r.nonclaims,claims)&&claims.every(k=>r.nonclaims[k]===false),"nonclaims");
 return {accepted:true,qualified:false,reason:r.reason,record:r,NativeReleased:false};
}
```

Pruebas propias:

```json
{
  "positive": 6,
  "negative": 14,
  "SourceExecuted": false
}
```

El receptor de informes completos también admite el peor caso de 500 limpiezas desconocidas dentro del tope, sin calificar:

```json
{
  "bytes": 11737,
  "cap": 24576,
  "cleanupInstances": 500,
  "accepted": true,
  "qualified": false,
  "SourceExecuted": false
}
```
