import {w1TraceReplay,w1CausalReplay} from './trace-reader.mjs';
import {w1Read,w1ZipPayload} from './reader.mjs';
import {n3TraceReplay as defaultTrace} from '../c2-notices-n3/models-fix2/trace-reader.mjs';
// Original OWN literal control adapter; no Source code import.
function wLiteralControls(data,replay){return [...data.positives.map(t=>({...t,want:true})),...data.negatives.map(t=>({...t,want:false}))].map(t=>{let accepted=false;try{const result=replay(t.snapshot);accepted=!t.expected||JSON.stringify(result)===JSON.stringify(t.expected);}catch{}return {id:t.id,pass:accepted===t.want,accepted};});}


function wFullControls(data,read,hash,inflate){return data.cases.map(t=>{let accepted=false,error=null;try{accepted=read(t.input,t.trustedOverride===undefined?data.trustedModel:t.trustedOverride,hash,inflate).diagnosticCaptureAccepted===true;}catch(e){error=e.message;}return {id:t.id,pass:accepted===t.accepted,accepted,...(accepted===t.accepted?{}:{error})};});}
function wBoundaryControls(data,zip,read,liveTrace,defaultTrace,full,hash,inflate){
 const rows=[],check=(id,fn)=>{let pass=false;try{pass=fn()===true;}catch{}rows.push({id,pass});};
 check('BOUND/INFO_BUFFER_ONLY_REJECTED',()=>{try{zip(data.validDeflate,data.name,(b,o)=>inflate(b,{maxOutputLength:o.maxOutputLength}));return false;}catch{return true;}});
 check('BOUND/BOUNDED_INFO_REQUEST',()=>{let seen=null;const r=zip(data.validDeflate,data.name,(b,o)=>{seen=o;return inflate(b,o);});return Buffer.isBuffer(r.payload)&&seen.info===true&&seen.maxOutputLength===24576;});
 check('BOUND/MAX24576_STORED',()=>zip(data.maxStored,data.name,()=>{throw Error('STORED_MUST_NOT_INFLATE');}).payload.length===24576);
 check('BOUND/MAX24576_DEFLATE',()=>zip(data.maxDeflate,data.name,inflate).payload.length===24576);
 check('BOUND/DECLARED24577_REJECT_BEFORE_INFLATE',()=>{let called=false,accepted=false;try{accepted=!!zip(data.overDeclared,data.name,(b,o)=>{called=true;return inflate(b,o);});}catch{}return !accepted&&!called;});
 check('BOUND/LYING24576_OVERFLOW_BOUNDED',()=>{let bounded=false,accepted=false;try{accepted=!!zip(data.lyingLength,data.name,(b,o)=>{try{return inflate(b,o);}catch(e){bounded=o.info===true&&o.maxOutputLength===24576&&e.code==='ERR_BUFFER_TOO_LARGE';throw e;}});}catch{}return !accepted&&bounded;});
 check('PROFILE/DEFAULT_GENERIC_PRESERVED_LIVE_REJECTS',()=>{let live=false;try{liveTrace(data.genericDefault);live=true;}catch{}return defaultTrace(data.genericDefault).reason==='CAP_PRIVATE'&&!live;});
 check('PROFILE/SAME_INNER_ID_EXPLICIT_VERSIONED_MODULE',()=>{let old=false;try{defaultTrace(data.refined);old=true;}catch{}return liveTrace(data.refined).reason==='CAP_PRIVATE_ROOT16'&&!old&&data.refined.schema===data.genericDefault.schema;});
 check('STATE/NO_CROSS_CALL_UNAVAILABLE_ALIAS',()=>{const t=full.cases.find(t=>t.id==='HTTP/HONEST_OPEN_POST_TIMEOUT_PREFIX'),a=read(t.input,full.trustedModel,hash,inflate);a.observation.causal.target='OWN_CALLER_MUTATION';const b=read(t.input,full.trustedModel,hash,inflate);return b.observation.causal.target==='unknown'&&a.observation.causal!==b.observation.causal;});
 return rows;
}
function w1AllControls(data,hash,inflate){
 const groups={ownLiterals:wLiteralControls(data.own,w1TraceReplay),mandatory:wLiteralControls({positives:data.source.positive.map(t=>({id:t.id,snapshot:t.snapshot,expected:t.summary})),negatives:data.source.negative},w1TraceReplay),derived:wLiteralControls(data.derived,w1TraceReplay),full:wFullControls(data.full,w1Read,hash,inflate),boundaries:wBoundaryControls(data.boundary,w1ZipPayload,w1Read,w1TraceReplay,defaultTrace,data.full,hash,inflate)};
 const record={sequence:1,elapsedMs:0,kind:'causal',schema:'afw.c2-notices-n3.causal-record.v1',snapshot:data.source.positive[0].snapshot},raw=JSON.stringify(record)+'\n';let strictRaw=false;
 try{const a=w1CausalReplay(raw),b=w1CausalReplay(Buffer.from(raw));const bad=[raw.slice(0,-1),Buffer.from([255,10]),Buffer.alloc(6145,65)].every(value=>{try{w1CausalReplay(value);return false;}catch{return true;}});strictRaw=a.reason==='CAP_PRIVATE_ROOT16'&&JSON.stringify(a)===JSON.stringify(b)&&bad;}catch{}
 groups.boundaries.push({id:'RAW/CANONICAL_RECORD_UTF8_LF_AND6144_CAP',pass:strictRaw});
 return {groups,checks:Object.entries(groups).flatMap(([group,rows])=>rows.map(row=>({...row,id:group+'/'+row.id})))};
}
export {w1AllControls};
