import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { runCloudflareNativeSmoke, CLOUD_NATIVE_SMOKE_ROUTES } from './smoke-cloudflare-native-local.mjs';

const ORIGIN='https://agentfriendlyweb.dev';
const OVERRIDE='agent-friendly-web-web-production="1772ceae-7e8d-4dbc-bc1d-0ade956a3e45"';
const ASSETS=[
  {
    "path": "/.well-known/agent-readiness.json",
    "bytes": 9055,
    "sha256": "9eeac1d632dea81c23174e50faca9fbc576f20a3d7f4997f1b3c056e9e02286a"
  },
  {
    "path": "/.well-known/email-operations-contract.json",
    "bytes": 3508,
    "sha256": "d44ef2f90243adf82fe84fb7c4ef7a524fc1eb5d3d01c4b602b8056fddaf1bfc"
  },
  {
    "path": "/_next/static/6ae73b70-e65e-4d3a-9e01-32ef3b4938e6/_buildManifest.js",
    "bytes": 159,
    "sha256": "47f02b34be6dc481257b6efce4c19e19111f37ef5c437f8ffed44f0da97fa9bb"
  },
  {
    "path": "/_next/static/6ae73b70-e65e-4d3a-9e01-32ef3b4938e6/_ssgManifest.js",
    "bytes": 76,
    "sha256": "653f3e53e89b4f8548ff86c19e92bb3c6b84b6be7485a320b1e00893ed877479"
  }
];
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const meta=(id,value)=>JSON.stringify({jsonrpc:'2.0',id,method:'tools/list',params:{_meta:{probe:value}}});
function nested(arrays){let v=0;for(let i=0;i<arrays;i++)v=[v];return v;}
export const bodies=Object.freeze({
 depth65:meta(3,nested(61)),depth64:meta(3,nested(60)),
 values4097:meta(4,Array(4090).fill(0)),values4096:meta(4,Array(4089).fill(0)),
 invalid:'{"jsonrpc":',
 initialize:JSON.stringify({jsonrpc:'2.0',id:1,method:'initialize',params:{protocolVersion:'2024-11-05',capabilities:{},clientInfo:{name:'afw-public-acceptance',version:'1'}}}),
 toolsList:JSON.stringify({jsonrpc:'2.0',id:2,method:'tools/list'}),
});
const allowedBodies=new Set(Object.values(bodies));
const allowedGets=new Set([...CLOUD_NATIVE_SMOKE_ROUTES.map(x=>x.path),...ASSETS.map(x=>x.path)]);
export function makeGuardedFetch({mode,notAfter,fetchImpl=fetch}){
 if(!['baseline','stage0','normal'].includes(mode)||!Number.isSafeInteger(notAfter)||notAfter<=Date.now()||notAfter-Date.now()>(mode==='normal'?30000:60000))throw Error('observation_scope');
 const absolute=AbortSignal.timeout(notAfter-Date.now());let count=0;
 return async(input,init={})=>{
  const url=new URL(input);
  if(url.origin!==ORIGIN||url.username||url.password||url.search||url.hash||absolute.aborted||Date.now()>=notAfter)throw Error('request_scope_or_deadline');
  if(!(init.method==='GET'&&allowedGets.has(url.pathname))&&!(mode!=='baseline'&&init.method==='POST'&&url.pathname==='/mcp'&&allowedBodies.has(init.body)))throw Error('method_path_or_body_denied');
  const headers=new Headers(init.headers);
  for(const [name]of headers)if(!['accept','content-type'].includes(name.toLowerCase()))throw Error('caller_header_denied');
  if(mode==='stage0')headers.set('Cloudflare-Workers-Version-Overrides',OVERRIDE);
  if(++count>50)throw Error('request_count_limit');
  return fetchImpl(url,{...init,headers,credentials:'omit',redirect:'manual',
   signal:AbortSignal.any([absolute,AbortSignal.timeout(Math.max(1,Math.min(10000,notAfter-Date.now()))),...(init.signal?[init.signal]:[])])});
 };
}
export async function readCapped(response){
 const reader=response.body?.getReader();const chunks=[];let size=0;
 if(reader)try{
  for(;;){const x=await reader.read();if(x.done)break;size+=x.value.byteLength;
   if(size>524288){void reader.cancel().catch(()=>{});throw Error('response_cap');}chunks.push(x.value);}
 }finally{reader.releaseLock();}
 return Buffer.concat(chunks);
}
function decodeProtocol(bytes,contentType){
 const mime=String(contentType).split(';')[0].trim().toLowerCase();
 const text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
 let value;
 if(mime==='application/json')value=JSON.parse(text);
 else if(mime==='text/event-stream'){
  const frames=[];let data=[],event='message',hasData=false,count=0;
  const lines=text.replace(/\r\n?/g,'\n').split('\n');
  if(lines.pop()!=='')throw Error('truncated_event_line');
  for(const line of lines){
   if(line===''){
    if(hasData){
     if(++count>8)throw Error('event_limit');
     const raw=data.join('\n');
     if(raw.trim()){
      if(event!==''&&event!=='message')throw Error('unexpected_event');
      frames.push(JSON.parse(raw));
     }
    }
    data=[];event='message';hasData=false;continue;
   }
   if(line.startsWith(':'))continue;
   const colon=line.indexOf(':');const field=colon<0?line:line.slice(0,colon);
   let part=colon<0?'':line.slice(colon+1);if(part.startsWith(' '))part=part.slice(1);
   if(field==='data'){hasData=true;data.push(part);}
   else if(field==='event')event=part;
   // SSE id/retry/unknown fields never trigger resumption or another request.
  }
  if(hasData||frames.length!==1)throw Error('incomplete_or_ambiguous_events');
  value=frames[0];
 }else throw Error('unexpected_response_mime');
 if(!value||typeof value!=='object'||Array.isArray(value))throw Error('rpc_response_shape');
 return value;
}
export function protocolResult(name,status,bytes,contentType='application/json'){
 let json;let decoded=false;
 try{json=decodeProtocol(bytes,contentType);decoded=true;}catch{/* Decoding failures remain failed checks. */}
 const code=json?.error?.code;const complex=code==='request_too_complex';let ok=false;
 if(name==='depth65'||name==='values4097')ok=status===413&&complex;
 else if(name==='depth64'||name==='values4096'){
  const expectedId=name==='depth64'?3:4;
  ok=!complex&&((status===200&&json?.id===expectedId&&!!json.result&&!json.error)||(status===400&&code===-32600));
 }else if(name==='invalid')ok=status===400&&[-32700,-32600].includes(code);
 else{
  const expectedId=name==='initialize'?1:2;
  ok=status===200&&json?.jsonrpc==='2.0'&&json?.id===expectedId&&!!json.result&&!json.error;
  if(name==='toolsList')ok=ok&&Array.isArray(json.result.tools);
 }
 const media=String(contentType).split(';')[0].trim().toLowerCase();
 return {name,status,bytes:bytes.length,contentType:media==='application/json'?'json':media==='text/event-stream'?'sse':'other',
  errorCode:typeof code==='number'||complex?code:null,ok:Boolean(decoded&&ok)};
}
export async function observePublic({mode,notAfter,fetchImpl=fetch}){
 const guarded=makeGuardedFetch({mode,notAfter,fetchImpl});
 const startedAt=new Date().toISOString();const probes=[];
 const smokePromise=runCloudflareNativeSmoke({baseUrl:ORIGIN,mode:'public-edge',fetchImpl:guarded});
 async function asset(expected){
  try{const response=await guarded(ORIGIN+expected.path,{method:'GET'});
   const bytes=await readCapped(response);const digest=sha(bytes);
   return {path:expected.path,status:response.status,bytes:bytes.length,sha256:digest,ok:response.status===200&&bytes.length===expected.bytes&&digest===expected.sha256};
  }catch{return {path:expected.path,status:0,ok:false,error:'request_body_or_deadline_failure'};}
 }
 let assets=[],protocols=[];
 if(mode!=='baseline'){
  // Unique manifest404 permits only finite GET convergence; it never retries a POST.
  const unique=ASSETS.find(x=>x.path.endsWith('/_buildManifest.js'));
  const probeEnd=notAfter-(mode==='normal'?8000:15000);
  let probe;
  for(let n=0;n<20;n++){
   probe=await asset(unique);probes.push({...probe,checkedAt:new Date().toISOString()});
   if(probe.ok||probe.status!==404||Date.now()+1000>=probeEnd)break;
   await new Promise(resolve=>setTimeout(resolve,Math.min(1000,Math.max(1,probeEnd-Date.now()))));
  }
  assets=[probe,...await Promise.all(ASSETS.filter(x=>x!==unique).map(asset))];
  if(probe.ok){
   protocols=await Promise.all(Object.entries(bodies).map(async([name,body])=>{
    try{const response=await guarded(ORIGIN+'/mcp',{method:'POST',headers:{accept:'application/json, text/event-stream','content-type':'application/json'},body});
     return protocolResult(name,response.status,await readCapped(response),response.headers.get('content-type')||'');
    }catch{return {name,status:0,ok:false,error:'request_body_or_deadline_failure'};}
   }));
  }
 }
 const smoke=await smokePromise;
 for(const check of smoke.checks)if(check.error)check.error=check.status===0?'request_body_or_deadline_failure':'contract_failed';
 return {kind:'fixed_public_json_acceptance',mode,origin:ORIGIN,startedAt,finishedAt:new Date().toISOString(),notAfter,
  smoke,assets,protocols,convergenceProbes:probes,postRetries:0,redirectsFollowed:false,operationalReadiness:false,
  ok:Date.now()<=notAfter&&smoke.ok&&(mode==='baseline'||(assets.length===4&&assets.every(x=>x.ok)&&protocols.length===7&&protocols.every(x=>x.ok)))};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
 const mode=process.argv[2];const notAfter=Number(process.argv[3]);
 try{const report=await observePublic({mode,notAfter});process.stdout.write(JSON.stringify(report)+'\n');}
 catch{process.stdout.write(JSON.stringify({mode,ok:false,error:'observation_unavailable',operationalReadiness:false})+'\n');}
}
