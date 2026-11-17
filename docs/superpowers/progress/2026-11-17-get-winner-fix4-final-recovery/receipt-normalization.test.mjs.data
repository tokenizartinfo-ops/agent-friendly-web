import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { normalizeReceipt } from './receipt-normalization.mjs';

const hexA='1'.repeat(64),hexB='2'.repeat(64);
const resident=(sha256=hexA)=>({sha256,bytes:1});
const component=()=>({...resident(),compressedSha256:hexA,compressedBytes:1});
const sha=data=>createHash('sha256').update(data).digest('hex');
const dependencies={need:assert.ok,pins:{componentWireOff:{sha256:hexA},componentWireOn:{sha256:hexB},componentStage:{sha256:hexA}},digest:sha};
const schedule={hashes:{modelIds:hexA,ordinaryIds:hexB},retentionIds:[],faultIds:[],transportIds:[]};
const ordinary={off:resident(),on:resident(hexB)};
const files={retentionFixture:JSON.stringify({rows:[{id:'test',expected:{}}],orders:{held:[]},snapshots:[]}),
 faultFixture:JSON.stringify({rows:[{id:'test'}]}),
 faultSeams:JSON.stringify({rows:[false,true].map(enabled=>({id:'test',enabled,name:'test',preimage:{sha256:hexA},after:{sha256:hexB,bytes:1}}))}),
 transportFixture:JSON.stringify({rows:[{id:'one'},{id:'two'}]})};
function example(group) {
 if(group==='ordinary-model')return {group,modelCount:287,modelIdsSha256:hexA,nativeLogicalCount:8,
  nativeIdsSha256:hexB,nativeDispatches:15,off:resident(),on:resident(hexB),disposed:true,
  parentCanonicalReplacementIntegrity:false,SourceQualified:false,Task1Pass:false};
 if(group==='retention'){
  const expected=sha(Buffer.from(JSON.stringify({id:'test',events:[],snapshots:[],checks:{}})));
  return {native:{off:component(),on:component(),results:[{offSha256:expected,onSha256:expected},{},{},{}]}};
 }
 const pair=()=>({off:{...ordinary.off,transportSha256:hexA},on:{...ordinary.on,transportSha256:hexB}});
 return {faults:{residents:[{off:resident(),on:resident(hexB)}]},transport:{residents:[pair(),pair()]}};
}
const paths={
 'ordinary-model':['off.sha256','on.sha256'],
 retention:['native.off.sha256','native.on.sha256','native.off.compressedSha256','native.on.compressedSha256','native.results.0.offSha256','native.results.0.onSha256'],
 'fault-transport':['faults.residents.0.off.sha256','faults.residents.0.on.sha256','transport.residents.0.off.sha256','transport.residents.0.on.sha256','transport.residents.0.off.transportSha256','transport.residents.0.on.transportSha256']
};
test('parent receipt preserves approved primitive digest in a format-only ordinary control',()=>{
 const value=example('ordinary-model');
 assert.deepEqual(normalizeReceipt('ordinary-model',value,schedule,files,ordinary,dependencies),value);
});
for(const [group,fields] of Object.entries(paths))for(const field of fields) {
 test('parent rejects wrong JSON digest at '+group+' '+field,()=>{
  for(const bad of [[hexA],1,true,{},null,'A'.repeat(64),hexA.slice(1),hexA+'\n']) {
   const value=example(group),keys=field.split('.'),name=keys.pop();
   const item=keys.reduce((o,k)=>o[k],value);
   item[name]=bad;
   assert.throws(()=>normalizeReceipt(group,value,schedule,files,ordinary,dependencies),
    e=>e instanceof TypeError&&e.code==='AFW_RECEIPT_DIGEST');
  }
 });
}
