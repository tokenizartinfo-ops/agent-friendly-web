import {n3TraceReplay,n3CausalReplay} from './trace-reader.mjs';
const ngBad=()=>{throw Error('OWN_N3_B1_MODEL_REJECTED');};
function n3ModelCrc(bytes){let crc=0xffffffff;for(const x of bytes){crc^=x;for(let k=0;k<8;k++)crc=crc&1?(crc>>>1)^0xedb88320:crc>>>1;}return (crc^0xffffffff)>>>0;}
function n3ModelZip(base64,name,inflate){
 if(typeof base64!=='string'||base64.length>1500000)ngBad();const z=Buffer.from(base64,'base64');if(z.toString('base64')!==base64||z.length<22||z.length>1048576)ngBad();
 let e=-1;for(let p=z.length-22;p>=Math.max(0,z.length-65557);p--)if(z.readUInt32LE(p)===0x06054b50&&p+22+z.readUInt16LE(p+20)===z.length){e=p;break;}
 if(e<0||z.readUInt16LE(e+4)!==0||z.readUInt16LE(e+6)!==0||z.readUInt16LE(e+8)!==1||z.readUInt16LE(e+10)!==1)ngBad();
 const size=z.readUInt32LE(e+12),c=z.readUInt32LE(e+16);if(c+size!==e||size<46||c<30||z.readUInt32LE(c)!==0x02014b50)ngBad();
 const flags=z.readUInt16LE(c+8),method=z.readUInt16LE(c+10),crc=z.readUInt32LE(c+16),compressed=z.readUInt32LE(c+20),length=z.readUInt32LE(c+24),nl=z.readUInt16LE(c+28),el=z.readUInt16LE(c+30),cl=z.readUInt16LE(c+32),local=z.readUInt32LE(c+42);
 if(flags&~0x80e||![0,8].includes(method)||length<1||length>24577||compressed>1048576||46+nl+el+cl!==size||z.readUInt16LE(c+34)!==0||local!==0||((z.readUInt32LE(c+38)>>>16)&0xf000)!==0&&((z.readUInt32LE(c+38)>>>16)&0xf000)!==0x8000)ngBad();
 if(z.subarray(c+46,c+46+nl).toString('utf8')!==name||z.readUInt32LE(0)!==0x04034b50||z.readUInt16LE(6)!==flags||z.readUInt16LE(8)!==method)ngBad();
 const lnl=z.readUInt16LE(26),lel=z.readUInt16LE(28),start=30+lnl+lel,end=start+compressed;
 if(z.subarray(30,30+lnl).toString('utf8')!==name||end>c)ngBad();
 if(flags&8){let d=end;if(c-d===16&&z.readUInt32LE(d)===0x08074b50)d+=4;if(c-d!==12||z.readUInt32LE(d)!==crc||z.readUInt32LE(d+4)!==compressed||z.readUInt32LE(d+8)!==length)ngBad();}
 else if(end!==c||z.readUInt32LE(14)!==crc||z.readUInt32LE(18)!==compressed||z.readUInt32LE(22)!==length)ngBad();
 let payload;if(method===0)payload=z.subarray(start,end);else{if(typeof inflate!=='function')ngBad();try{payload=inflate(z.subarray(start,end),{maxOutputLength:24577});}catch{ngBad();}}
 if(!Buffer.isBuffer(payload)||payload.length!==length||n3ModelCrc(payload)!==crc)ngBad();return {archive:z,payload};
}


function n3TraceLiteralControls(v,replay){
 const checks=[];
 for(const t of v.positives){let result=null;try{result=replay(t.snapshot);}catch{}checks.push({id:'OWN/'+t.id,pass:result!==null&&JSON.stringify(result)===JSON.stringify(t.expected),accepted:result!==null});}
 for(const t of v.negatives){let accepted=false;try{accepted=replay(t.snapshot)!==null;}catch{}checks.push({id:'OWN/'+t.id,pass:!accepted,accepted});}
 return checks;
}
function n3SealedDataControls(v,replay){
 const checks=[];for(const [rows,accepted]of [[v.positives,true],[v.negatives,false]])for(const t of rows){let got=false;try{got=replay(t.snapshot)!==null;}catch{}checks.push({id:'SEALED_DATA/'+t.id,pass:got===accepted,accepted:got});}return checks;
}
function n3JsonBoundaryControls(v,replay){
 const checks=[];
 for(const id of ['ARRAY_NONENUMERABLE_TOJSON','ARRAY_INHERITED_TOJSON','OBJECT_INHERITED_TOJSON']){
  const s=structuredClone(v.positives[0].snapshot);let calls=0;
  const toJSON=()=>{calls++;return [];};
  if(id==='ARRAY_NONENUMERABLE_TOJSON')Object.defineProperty(s.events,'toJSON',{value:toJSON,enumerable:false});
  if(id==='ARRAY_INHERITED_TOJSON'){const proto=Object.create(Object.getPrototypeOf(s.events));Object.defineProperty(proto,'toJSON',{value:toJSON});Object.setPrototypeOf(s.events,proto);}
  if(id==='OBJECT_INHERITED_TOJSON'){const proto=Object.create(null);Object.defineProperty(proto,'toJSON',{value:toJSON});Object.setPrototypeOf(s,proto);}
  let accepted=false;try{accepted=replay(s)!==null;}catch{}checks.push({id:'JSON_MODEL/'+id,pass:!accepted&&calls===0,accepted,callbackCalls:calls});
 }return checks;
}

function n3RawRecordControls(data,readRecord,want){
 const checks=[];for(const t of data.cases){let result=null;try{result=readRecord(t.text);}catch{}checks.push({id:'RAW/'+t.id,pass:t.accepted?result!==null&&JSON.stringify(result)===JSON.stringify(want):result===null,accepted:result!==null});}
 const good=Buffer.from(data.cases[0].text),bad=Buffer.from(good);bad[data.invalidUtf8.corruptByteIndex]=255;let accepted=false;try{accepted=readRecord(bad)!==null;}catch{}checks.push({id:'RAW/INVALID_UTF8',pass:!accepted,accepted});return checks;
}
function n3SyntheticTransportControls(v,readRecord,hash){
 const checks=[];for(const t of v.cases){let transportValid=false,accepted=false;try{
  const m=t.metadata,zip=n3ModelZip(t.archiveBase64,'own-b1-causal.json',null),bytes=Buffer.from(t.recordText);
  transportValid=zip.payload.equals(bytes)&&m.recordBytes===bytes.length&&m.recordSha256===hash(bytes)&&m.witnessBytes===bytes.length&&m.witnessSha256===hash(bytes)&&m.frameBytes===Buffer.byteLength(t.frameText)&&m.frameSha256===hash(t.frameText)&&t.frameText==='OWN_SYNTHETIC_N3_B1_TRACE '+t.recordText&&m.payloadSha256===hash(zip.payload)&&m.archiveBytes===zip.archive.length&&m.archiveSha256===hash(zip.archive)&&m.crc32===n3ModelCrc(zip.payload);
  if(transportValid)try{accepted=readRecord(bytes)!==null;}catch{}
 }catch{}
 checks.push({id:'SYNTHETIC_TRANSPORT/'+t.id,pass:transportValid&&accepted===t.accepted,transportValid,accepted});}return checks;
}
function n3IsolationControls(v,replay,readRecord){
 const checks=[],base=v.positives[0],reject=(id,input)=>{let rejected=false;try{replay(input);}catch{rejected=true;}checks.push({id:'BOUNDARY/'+id,pass:rejected});};
 reject('NO_CROSS_SNAPSHOT_ARRAY',[base.snapshot,structuredClone(base.snapshot)]);
 reject('NO_BEFORE_AFTER_STITCH',{before:base.snapshot,after:structuredClone(base.snapshot)});
 reject('NO_FOREIGN_REALM_WRAPPER',{realm:'M',snapshot:base.snapshot});
 const before=JSON.stringify(base.snapshot),a=replay(base.snapshot),b=replay(structuredClone(base.snapshot));
 checks.push({id:'BOUNDARY/RESET_EQUAL_ORDINAL_SEPARATE_CALLS',pass:JSON.stringify(a)===JSON.stringify(b)&&a!==b&&JSON.stringify(base.snapshot)===before&&a.interpretation==='unknown'});
 const frozen=structuredClone(base.snapshot),freeze=x=>{if(x&&typeof x==='object'){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
 let immutable=false;try{immutable=JSON.stringify(replay(freeze(frozen)))===JSON.stringify(base.expected)&&JSON.stringify(frozen)===before;}catch{}
 checks.push({id:'BOUNDARY/INPUT_NOT_MUTATED',pass:immutable});
 let reads=0;const accessor=structuredClone(base.snapshot);Object.defineProperty(accessor,'state',{enumerable:true,get(){reads++;return 'joined';}});
 let rejected=false;try{replay(accessor);}catch{rejected=true;}checks.push({id:'BOUNDARY/PUBLIC_ACCESSOR_REJECT_WITHOUT_INVOCATION',pass:rejected&&reads===0});
 const privateRecord={sequence:7,elapsedMs:123,kind:'causal',schema:'afw.c2-notices-n3.causal-record.v1',snapshot:structuredClone(base.snapshot)};privateRecord.snapshot.privateValue='OWN_N3_PRIVATE_SENTINEL';let message='';try{readRecord(privateRecord);}catch(error){message=String(error?.message??'');}checks.push({id:'BOUNDARY/REJECTION_DOES_NOT_FORWARD_PRIVATE_PAYLOAD',pass:!!message&&!message.includes('OWN_N3_PRIVATE_SENTINEL')});
 return checks;
}
function n3B1AllControls(own,sealed,raw,transport,hash,ruling,rulingTransport){
 const groups={literal:n3TraceLiteralControls(own,n3TraceReplay),sealedData:n3SealedDataControls(sealed,n3TraceReplay),rawRecord:n3RawRecordControls(raw,n3CausalReplay,own.positives[0].expected),syntheticTransport:n3SyntheticTransportControls(transport,n3CausalReplay,hash),boundaries:n3IsolationControls(own,n3TraceReplay,n3CausalReplay),jsonModels:n3JsonBoundaryControls(own,n3TraceReplay),ruling:n3TraceLiteralControls(ruling,n3TraceReplay),rulingTransport:n3SyntheticTransportControls(rulingTransport,n3CausalReplay,hash)};
 return {groups,checks:Object.values(groups).flat()};
}

function n3AbortFix1Controls(own,sealed,raw,transport,hash,ruling,rulingTransport,abort){
 const suite=n3B1AllControls(own,sealed,raw,transport,hash,ruling,rulingTransport);
 suite.groups.abortMatrix=n3TraceLiteralControls(abort,n3TraceReplay);suite.checks.push(...suite.groups.abortMatrix);return suite;
}
export {n3B1AllControls,n3AbortFix1Controls};
