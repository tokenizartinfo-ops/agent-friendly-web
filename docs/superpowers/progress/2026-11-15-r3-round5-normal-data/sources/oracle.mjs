// Independent exact wire oracle: no formatter/receiver imports.
export function accepts(raw,status,expected,context,sample,failedReport,deliveryFallback,controlsFallback){
 const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 if(typeof raw!=='string'||!(/^[\x20-\x7e\n]*$/.test(raw))||!raw.endsWith('\n')||raw.endsWith('\n\n')||status!==expected.status)return false;
 const canonicalLine=(marker,value)=>marker+' '+JSON.stringify(value)+'\n';
 if(expected.kind==='fallback')return expected.entry==='controls'?raw===canonicalLine('AFW_R3_DELIVERY_CONTROLS_UNAVAILABLE/1',{...controlsFallback,reason:expected.reason}):raw===canonicalLine('AFW_R3_DELIVERY_UNAVAILABLE/1',{...deliveryFallback,reason:expected.reason});
 if(['controls-failed','controls-exhausted'].includes(expected.kind))return raw===canonicalLine('AFW_R3_DELIVERY_CONTROLS/1',failedReport);
 if(!['pair','delivery'].includes(expected.kind))return false;
 const nonclaims={historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
 const d={purpose:'afw.r3-delivery.result.v1',...context,controls:'passed',availability:expected.kind==='pair'?'available':'unavailable',sourceQualified:expected.sourceQualified,collectionComplete:expected.collectionComplete,sampleObserved:expected.sampleObserved,reason:expected.reason,nonclaims};
 const wire=(expected.kind==='pair'?canonicalLine('AFW_R3_EXISTING_SAMPLE/1',sample):'')+canonicalLine('AFW_R3_DELIVERY/1',d);
 if(raw!==wire)return false;
 // Independently require every emitted JSON object to occupy its exact one line.
 const lines=raw.slice(0,-1).split('\n');
 try{for(const line of lines){const text=line.slice(line.indexOf(' ')+1);if(JSON.stringify(JSON.parse(text))!==text)return false;}}catch{return false;}
 return eq(raw,wire);
}
