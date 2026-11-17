function checkedDigest(value) {
 if(typeof value !== 'string' || value.length !== 64 || /[^0-9a-f]/.test(value)) {
  throw Object.assign(new TypeError('Invalid receipt digest'),{code:'AFW_RECEIPT_DIGEST'});
 }
 return value;
}
export function normalizeReceipt(group,value,schedule,files,ordinary,{need,pins,digest}) {
function resident(value,extra={}) {
 need(value&&Number.isSafeInteger(value.bytes)&&value.bytes>0);
 checkedDigest(value.sha256);
 return {sha256:value.sha256,bytes:value.bytes,...extra};
}

 let normalized;
 if(group==='ordinary-model') {
  normalized={group,modelCount:287,modelIdsSha256:schedule.hashes.modelIds,
   nativeLogicalCount:8,nativeIdsSha256:schedule.hashes.ordinaryIds,nativeDispatches:15,
   off:resident(value.off),on:resident(value.on),disposed:true,
   parentCanonicalReplacementIntegrity:false,SourceQualified:false,Task1Pass:false};
  need(value.off.sha256!==value.on.sha256);
 } else if(group==='retention') {
  const v=value.native,fixture=JSON.parse(files.retentionFixture);
  const component=(item,wire)=>{
   checkedDigest(item.compressedSha256);
   need(Number.isSafeInteger(item.compressedBytes)&&item.compressedBytes>0);
   return resident(item,{compressedSha256:item.compressedSha256,compressedBytes:item.compressedBytes,
    preparedWireSha256:wire.sha256,stageWorkSha256:pins.componentStage.sha256});
  };
  need(Array.isArray(v.results)&&v.results.length===4);
  const results=fixture.rows.map((row,index)=>{
   const item=v.results[index],order=row.id==='abort_before_late_actual'?'lateAbort':row.id==='timer_before_late_actual'?'lateTimer':'held';
   const output={id:row.id,events:fixture.orders[order],snapshots:fixture.snapshots,checks:row.expected};
   const sha=digest(Buffer.from(JSON.stringify(output)));
   // Native handler emits compact JSON without a transport LF.
   need(checkedDigest(item.offSha256)===sha&&checkedDigest(item.onSha256)===sha);
   return {id:row.id,offSha256:sha,onSha256:sha,output};
  });
  normalized={group,native:{ids:schedule.retentionIds,off:component(v.off,pins.componentWireOff),on:component(v.on,pins.componentWireOn),results,
   evidence:'NATIVE_COMPONENT_AND_TOOL_WAITUNTIL_SPY',platformWaitUntilLifecycle:false,ordinaryRouteIntegration:false},
   disposed:true,SourceQualified:false,Task1Pass:false};
 } else {
  need(group==='fault-transport');
  const v=value.faults,t=value.transport,seams=JSON.parse(files.faultSeams),fixture=JSON.parse(files.faultFixture);
  need(Array.isArray(v.residents)&&v.residents.length===fixture.rows.length);
  const residents=fixture.rows.map((row,index)=>{
   const item=v.residents[index],pair={id:row.id};
   for(const variant of ['off','on']) {
    const seam=seams.rows.find(s=>s.id===row.id&&s.enabled===(variant==='on'));
    pair[variant]=resident(item[variant],{seam:{id:row.id,enabled:variant==='on',name:seam.name,
     preimageSha256:seam.preimage.sha256,afterSha256:seam.after.sha256,afterBytes:seam.after.bytes}});
   }
   return pair;
  });
  const transports=JSON.parse(files.transportFixture);
  need(Array.isArray(t.residents)&&t.residents.length===2);
  const transported=transports.rows.map((row,index)=>{
   const item=t.residents[index],pair={id:row.id};
   for(const variant of ['off','on']){
    checkedDigest(item[variant].transportSha256);
    pair[variant]=resident(item[variant],{transportSha256:item[variant].transportSha256});
    need(item[variant].sha256===ordinary[variant].sha256&&item[variant].bytes===ordinary[variant].bytes);
   }
   return pair;
  });
  normalized={group,faults:{ids:schedule.faultIds,residents,scope:'TEST_ONLY_FIXED_M_SOURCE_FAULTS',ordinaryCompilerUnchanged:true,disposed:true},
   transport:{ids:schedule.transportIds,residents:transported,scope:'EXACT_ORDINARY_M_THEN_FIXED_NATIVE_TRANSPORT',directRoute:false,disposed:true},
   SourceQualified:false,Task1Pass:false};
 }
 need(JSON.stringify(value)===JSON.stringify(normalized));
 return normalized;
}
