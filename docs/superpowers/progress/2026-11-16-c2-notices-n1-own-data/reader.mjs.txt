const ngObj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const ngKeys=(v,a)=>ngObj(v)&&Object.keys(v).length===a.length&&Object.keys(v).every((k,i)=>k===a[i]);
const ngInt=(v,a,b)=>Number.isSafeInteger(v)&&v>=a&&v<=b;
const ngSame=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const ngBad=()=>{throw Error('ROOT_NEXT_GET_DATA_REJECTED');};
function ngTime(v){
 if(typeof v!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,9})?Z$/.test(v))ngBad();
 const n=Date.parse(v);if(!Number.isFinite(n)||new Date(n).toISOString().slice(0,19)!==v.slice(0,19))ngBad();return n;
}
function ngLogFrames(raw,joined,command,markers){
 if(typeof raw!=='string'||Buffer.byteLength(raw,'utf8')>4194304||typeof command!=='string'||!Array.isArray(markers)||markers.length!==4||new Set(markers).size!==4)ngBad();
 const start=ngTime(joined.commandStep.started_at)-1000,end=ngTime(joined.commandStep.completed_at)+1000,frames=[];
 let group=false,commandSeen=0,closed=false,window=false;
 for(const row of raw.split('\n')){
  if(!row)continue;const m=/^(\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d+Z) (.*)$/.exec(row);
  if(!m){if(row.includes('AFW_C2_'))ngBad();continue}
  const line=m[2];
  if(line==='##[group]Run '+command){
   const t=ngTime(m[1]);if(++commandSeen!==1||group||t<start||t>end)ngBad();group=true;window=true;continue;
  }
  if(group&&line==='##[endgroup]'){closed=true;group=false;continue;}
  if(closed&&line.startsWith('##[group]'))window=false;
  if(line.includes('AFW_C2_')&&!line.startsWith('AFW_C2_'))ngBad();
  if(line.startsWith('AFW_C2_')){
   const t=ngTime(m[1]);if(!window||!closed||commandSeen!==1||t<start||t>end)ngBad();frames.push(line);
  }
 }
 if(commandSeen!==1||!closed||frames.length!==4)ngBad();
 return frames.map((line,i)=>{
  const prefix=markers[i]+' ';if(!line.startsWith(prefix))ngBad();
  const rawValue=line.slice(prefix.length);if(Buffer.byteLength(rawValue,'utf8')>(i===3?24576:2048))ngBad();
  let value;try{value=JSON.parse(rawValue);}catch{ngBad();}
  if(JSON.stringify(value)!==rawValue)ngBad();return value;
 });
}

function ngSchema(value,node,document){
 if(!ngObj(node))return false;
 if(node.$ref){if(typeof node.$ref!=='string'||!node.$ref.startsWith('#/$defs/'))return false;return ngSchema(value,document.$defs[node.$ref.slice(8)],document);}
 if(Object.hasOwn(node,'const')&&!ngSame(value,node.const))return false;
 if(node.enum&&!node.enum.some(v=>ngSame(v,value)))return false;
 if(node.anyOf&&!node.anyOf.some(s=>ngSchema(value,s,document)))return false;
 if(node.oneOf&&node.oneOf.filter(s=>ngSchema(value,s,document)).length!==1)return false;
 if(node.allOf&&!node.allOf.every(s=>ngSchema(value,s,document)))return false;
 const isType=(v,t)=>t==='object'?ngObj(v):t==='array'?Array.isArray(v):t==='integer'?Number.isSafeInteger(v):t==='number'?typeof v==='number'&&Number.isFinite(v):t==='string'?typeof v==='string':t==='null'?v===null:t==='boolean'?typeof v==='boolean':false;
 if(node.type&&!(Array.isArray(node.type)?node.type.some(t=>isType(value,t)):isType(value,node.type)))return false;
 if(node.properties&&ngObj(value)){
  const names=Object.keys(node.properties);
  if(node.additionalProperties===false&&Object.keys(value).some(k=>!names.includes(k)))return false;
  if(node.required&&!node.required.every(k=>Object.hasOwn(value,k)))return false;
  if(node.required?.length===names.length&&node.additionalProperties===false&&!ngKeys(value,names))return false;
  for(const k of names)if(Object.hasOwn(value,k)&&!ngSchema(value[k],node.properties[k],document))return false;
 }
 if(typeof value==='number'&&(node.minimum!==undefined&&value<node.minimum||node.maximum!==undefined&&value>node.maximum))return false;
 if(typeof value==='string'&&node.pattern&&!new RegExp(node.pattern).test(value))return false;
 if(Array.isArray(value)){
  if(node.minItems!==undefined&&value.length<node.minItems||node.maxItems!==undefined&&value.length>node.maxItems)return false;
  for(let i=0;i<value.length;i++){const rule=node.prefixItems?.[i]??node.items;if(rule===false||rule&&!ngSchema(value[i],rule,document))return false;}
 }
 return true;
}

// Original Root OWN N1 journal FSM. Normative record schema is DATA only.
const N1_IDS=['N1_CONNECTION','N1_OAUTH','N1_PHASE','N1_NOTICES'];
const N1_INDEX='0681cadc774fcddf7a009e86e24b22fa879857af1e900f6143d23c2d7eaa9be7';
const N1_SELECTION='fae234be9a7462b6065fdbfeaf0ddea0d0e086d434145750823a9894b988ad0f';
const N1_RECORD_RULE={"oneOf":[{"type":"object","properties":{"sequence":{"type":"integer","minimum":1,"maximum":128},"elapsedMs":{"type":"integer","minimum":0,"maximum":180000},"kind":{"const":"binding"},"sourceIndexHash":{"const":"0681cadc774fcddf7a009e86e24b22fa879857af1e900f6143d23c2d7eaa9be7"},"driverHash":{"type":"string","pattern":"^[a-f0-9]{64}$"},"selectionHash":{"const":"fae234be9a7462b6065fdbfeaf0ddea0d0e086d434145750823a9894b988ad0f"},"helperHash":{"type":"string","pattern":"^[a-f0-9]{64}$"},"readerHash":{"type":"string","pattern":"^[a-f0-9]{64}$"},"slotHash":{"type":"string","pattern":"^[a-f0-9]{64}$"}},"required":["sequence","elapsedMs","kind","sourceIndexHash","driverHash","selectionHash","helperHash","readerHash","slotHash"],"additionalProperties":false},{"type":"object","properties":{"sequence":{"type":"integer","minimum":1,"maximum":128},"elapsedMs":{"type":"integer","minimum":0,"maximum":180000},"kind":{"const":"flow"},"id":{"enum":["N1_CONNECTION","N1_OAUTH","N1_PHASE","N1_NOTICES"]},"operation":{"enum":["action","count"]},"edge":{"enum":["enter","return","throw"]},"error":{"anyOf":[{"type":"object","properties":{"name":{"enum":[null,"AssertionError","Error","TypeError","RangeError","SyntaxError","AggregateError","AbortError","TimeoutError"]},"code":{"enum":[null,"ERR_ASSERTION","ERR_TEST_FAILURE","ABORT_ERR","ETIMEDOUT","ENOENT","ERR_MODULE_NOT_FOUND","ECONNRESET","ERR_INVALID_ARG_TYPE"]},"site":{"anyOf":[{"type":"object","properties":{"file":{"enum":["S00","S01","S02","S03","S04","S05","S06","S07","S08","S09","S10","S11","S12","D07","D08"]},"line":{"type":"integer","minimum":1,"maximum":999999},"column":{"type":"integer","minimum":1,"maximum":999999}},"required":["file","line","column"],"additionalProperties":false},{"type":"null"}]}},"required":["name","code","site"],"additionalProperties":false},{"type":"null"}]},"counters":{"anyOf":[{"type":"object","properties":{"upload":{"type":"integer","minimum":0,"maximum":3},"activation":{"type":"integer","minimum":0,"maximum":3},"receipts":{"type":"integer","minimum":0,"maximum":3}},"required":["upload","activation","receipts"],"additionalProperties":false},{"type":"null"}]}},"required":["sequence","elapsedMs","kind","id","operation","edge","error","counters"],"additionalProperties":false},{"type":"object","properties":{"sequence":{"type":"integer","minimum":1,"maximum":128},"elapsedMs":{"type":"integer","minimum":0,"maximum":180000},"kind":{"const":"blocked"},"id":{"enum":["N1_CONNECTION","N1_OAUTH","N1_PHASE","N1_NOTICES"]},"code":{"const":"PREREQUISITE_BLOCKED"},"workEntered":{"const":false}},"required":["sequence","elapsedMs","kind","id","code","workEntered"],"additionalProperties":false},{"type":"object","properties":{"sequence":{"type":"integer","minimum":1,"maximum":128},"elapsedMs":{"type":"integer","minimum":0,"maximum":180000},"kind":{"const":"http"},"operation":{"enum":["notices-get","notices-post"]},"edge":{"enum":["enter","response","return","throw"]},"status":{"anyOf":[{"type":"integer","minimum":100,"maximum":599},{"type":"null"}]},"bodySettled":{"anyOf":[{"type":"boolean"},{"type":"null"}]},"error":{"anyOf":[{"type":"object","properties":{"name":{"enum":[null,"AssertionError","Error","TypeError","RangeError","SyntaxError","AggregateError","AbortError","TimeoutError"]},"code":{"enum":[null,"ERR_ASSERTION","ERR_TEST_FAILURE","ABORT_ERR","ETIMEDOUT","ENOENT","ERR_MODULE_NOT_FOUND","ECONNRESET","ERR_INVALID_ARG_TYPE"]},"site":{"anyOf":[{"type":"object","properties":{"file":{"enum":["S00","S01","S02","S03","S04","S05","S06","S07","S08","S09","S10","S11","S12","D07","D08"]},"line":{"type":"integer","minimum":1,"maximum":999999},"column":{"type":"integer","minimum":1,"maximum":999999}},"required":["file","line","column"],"additionalProperties":false},{"type":"null"}]}},"required":["name","code","site"],"additionalProperties":false},{"type":"null"}]}},"required":["sequence","elapsedMs","kind","operation","edge","status","bodySettled","error"],"additionalProperties":false},{"type":"object","properties":{"sequence":{"type":"integer","minimum":1,"maximum":128},"elapsedMs":{"type":"integer","minimum":0,"maximum":180000},"kind":{"const":"probe"},"stage":{"enum":["before","after"]},"state":{"enum":["observed","unavailable","ambiguous"]},"newFailures":{"anyOf":[{"type":"integer","minimum":0,"maximum":8},{"type":"null"}]},"correlated":{"const":null},"position":{"enum":[null,"entry","approved","enrollment-recorded","enrollment-ack-recorded","upload-send-recorded","upload-native-pending","upload-ack-recorded","upload-observed","activation-send-recorded","activation-native-pending","activation-ack-recorded","activation-observed","receipt-recorded","complete","failed"]},"correlators":{"type":"array","items":{"enum":["preparation","ticket-map","source-snapshot","connection-history","publication-pointer","receipt-physical-hash","writer-head"]},"maxItems":7},"sites":{"type":"array","items":{"type":"object","properties":{"file":{"enum":["S00","S01","S02","S03","S04","S05","S06","S07","S08","S09","S10","S11","S12","D07","D08"]},"line":{"type":"integer","minimum":1,"maximum":999999},"column":{"type":"integer","minimum":1,"maximum":999999}},"required":["file","line","column"],"additionalProperties":false},"maxItems":6},"guardOrigin":{"const":"unknown"},"summary":{"type":"object","properties":{"consumedTicket":{"anyOf":[{"type":"boolean"},{"type":"null"}]},"stageApproval":{"anyOf":[{"type":"boolean"},{"type":"null"}]},"receiptCount":{"anyOf":[{"type":"integer","minimum":0,"maximum":3},{"type":"null"}]}},"required":["consumedTicket","stageApproval","receiptCount"],"additionalProperties":false}},"required":["sequence","elapsedMs","kind","stage","state","newFailures","correlated","position","correlators","sites","guardOrigin","summary"],"additionalProperties":false},{"type":"object","properties":{"sequence":{"type":"integer","minimum":1,"maximum":128},"elapsedMs":{"type":"integer","minimum":0,"maximum":180000},"kind":{"const":"after"},"edge":{"enum":["enter","return","throw"]},"error":{"anyOf":[{"type":"object","properties":{"name":{"enum":[null,"AssertionError","Error","TypeError","RangeError","SyntaxError","AggregateError","AbortError","TimeoutError"]},"code":{"enum":[null,"ERR_ASSERTION","ERR_TEST_FAILURE","ABORT_ERR","ETIMEDOUT","ENOENT","ERR_MODULE_NOT_FOUND","ECONNRESET","ERR_INVALID_ARG_TYPE"]},"site":{"anyOf":[{"type":"object","properties":{"file":{"enum":["S00","S01","S02","S03","S04","S05","S06","S07","S08","S09","S10","S11","S12","D07","D08"]},"line":{"type":"integer","minimum":1,"maximum":999999},"column":{"type":"integer","minimum":1,"maximum":999999}},"required":["file","line","column"],"additionalProperties":false},{"type":"null"}]}},"required":["name","code","site"],"additionalProperties":false},{"type":"null"}]}},"required":["sequence","elapsedMs","kind","edge","error"],"additionalProperties":false}]};
const n1DigestValue=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v);
const n1Counters=c=>ngKeys(c,['upload','activation','receipts'])&&[c.upload,c.activation,c.receipts].every(v=>ngInt(v,0,3))&&c.receipts<=c.activation&&c.activation<=c.upload;
function n1ProbeShape(p){
 if(!ngKeys(p,['stage','state','newFailures','correlated','position','correlators','sites','guardOrigin','summary'])||p.correlated!==null||p.guardOrigin!=='unknown'||new Set(p.correlators).size!==p.correlators.length||new Set(p.sites.map(s=>JSON.stringify(s))).size!==p.sites.length)ngBad();
 const empty=p.position===null&&!p.correlators.length&&!p.sites.length,unknown=Object.values(p.summary).every(v=>v===null);
 if(p.stage==='before'){if(p.state==='ambiguous'||p.newFailures!==null||!empty||!unknown)ngBad();return;}
 if(p.state==='unavailable'){if(p.newFailures!==null||!empty||!unknown)ngBad();}
 else if(p.state==='ambiguous'){if(!ngInt(p.newFailures,2,8)||!empty)ngBad();}
 else if(p.state!=='observed'||!ngInt(p.newFailures,0,1)||p.newFailures===0&&(p.position!==null||p.sites.length))ngBad();
}
function n1Native(value,flow,after,complete,condition){
 if(!ngKeys(value,['integrity','cases','sourceFileFailure'])||!['complete','prefix'].includes(value.integrity)||!Array.isArray(value.cases)||value.cases.length>4||typeof value.sourceFileFailure!=='boolean'||value.integrity!==(value.cases.length===4?'complete':'prefix')||value.sourceFileFailure&&after!=='threw')ngBad();
 if(complete&&(value.integrity!=='complete'||value.sourceFileFailure!==(after==='threw')))ngBad();
 for(let i=0;i<value.cases.length;i++){
  const n=value.cases[i],f=flow[i];
  if(!ngKeys(n,['id','status','code','workEntered'])||n.id!==N1_IDS[i]||!f||n.workEntered!==f.workEntered||!['pass','fail'].includes(n.status))ngBad();
  if(f.action==='blocked'){if(n.status!=='fail'||n.code!=='PREREQUISITE_BLOCKED'||n.workEntered!==false)ngBad();continue;}
  if(!['returned','threw'].includes(f.action)||!['returned','threw'].includes(f.count)||n.code!==(n.status==='pass'?'OK':'TEST_FAILED')||n.status!==(f.action==='threw'||f.count==='threw'?'fail':'pass'))ngBad();
 }
}
function n1Replay(raw,binding,condition,native){
 if(!ngKeys(binding,['sourceIndexHash','driverHash','selectionHash','helperHash','readerHash','slotHash'])||!Object.values(binding).every(n1DigestValue)||binding.sourceIndexHash!==N1_INDEX||binding.selectionHash!==N1_SELECTION||!['normal','timeout'].includes(condition)||!(typeof raw==='string'||Buffer.isBuffer(raw)))ngBad();
 const bytes=typeof raw==='string'?Buffer.from(raw,'utf8'):raw;if(bytes.length>32768)ngBad();
 let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{ngBad();}
 if(!text.endsWith('\n'))ngBad();const lines=text.slice(0,-1).split('\n');if(lines.length<1||lines.length>128)ngBad();
 const flow=[],http=[],probes=[];let cursor=0,phase=0,poisoned=false,after='unobserved',last=0;
 const rows=lines.map((line,i)=>{let r;try{r=JSON.parse(line);}catch{ngBad();}if(JSON.stringify(r)!==line||!ngSchema(r,N1_RECORD_RULE,N1_RECORD_RULE)||r.sequence!==i+1||r.elapsedMs<last)ngBad();last=r.elapsedMs;return r;});
 const first=rows[0];if(first.kind!=='binding'||!Object.keys(binding).every(k=>first[k]===binding[k]))ngBad();
 for(const r of rows.slice(1)){
  if(r.kind==='binding')ngBad();
  if(r.kind==='blocked'){
   if(cursor>=4||phase!==0||!poisoned||after!=='unobserved'||r.id!==N1_IDS[cursor]||r.code!=='PREREQUISITE_BLOCKED'||r.workEntered!==false)ngBad();
   flow.push({id:r.id,workEntered:false,action:'blocked',count:'unobserved',actionError:null,countError:null,counters:null});cursor++;continue;
  }
  if(r.kind==='flow'){
   if(cursor>=4||after!=='unobserved'||r.id!==N1_IDS[cursor]||r.operation!==(phase<2?'action':'count')||(phase%2===0?r.edge!=='enter':!['return','throw'].includes(r.edge))||(r.edge==='throw'?r.error===null:r.error!==null)||!(r.operation==='count'&&r.edge==='return'?n1Counters(r.counters):r.counters===null))ngBad();
   if(phase===0){if(poisoned)ngBad();flow.push({id:r.id,workEntered:true,action:'entered',count:'unobserved',actionError:null,countError:null,counters:null});}
   const f=flow.at(-1);
   if(phase===1){
    if(cursor===3){
     // A settled awaited action cannot leave one of its actual HTTP operations open.
     if(!probes.some(p=>p.stage==='before')||http.some(h=>h.completion==='entered'))ngBad();
     if(r.edge==='return'&&!(http.length===2&&http.every(h=>h.completion==='returned'&&h.status===200&&h.bodySettled===true)))ngBad();
    }
    f.action=r.edge==='return'?'returned':'threw';f.actionError=r.error;
    if(r.edge==='throw')poisoned=true;
   }
   if(phase===2){if(cursor===3&&!probes.some(p=>p.stage==='after'))ngBad();f.count='entered';}
   if(phase===3){
    f.count=r.edge==='return'?'returned':'threw';f.countError=r.error;f.counters=r.counters;
    if(r.edge==='throw')poisoned=true;
    if(f.action==='returned'&&r.edge==='return'){const expected=cursor===3?2:1;if([r.counters.upload,r.counters.activation,r.counters.receipts].some(v=>v!==expected))ngBad();}
   }
   phase++;if(phase===4){phase=0;cursor++;}continue;
  }
  if(r.kind==='http'){
   if(cursor!==3||phase!==1||after!=='unobserved'||!probes.some(p=>p.stage==='before')||(r.edge==='throw'?r.error===null:r.error!==null))ngBad();
   const h=http.find(h=>h.operation===r.operation);
   if(r.edge==='enter'){
    if(h||r.status!==null||r.bodySettled!==null||r.operation==='notices-get'&&http.length!==0||r.operation==='notices-post'&&!(http.length===1&&http[0].operation==='notices-get'&&http[0].completion==='returned'&&http[0].status===200&&http[0].bodySettled===true))ngBad();
    http.push({operation:r.operation,entered:true,response:false,status:null,bodySettled:null,completion:'entered'});continue;
   }
   if(!h||h.completion!=='entered')ngBad();
   if(r.edge==='response'){if(h.response||r.status===null||r.bodySettled!==null)ngBad();h.response=true;h.status=r.status;}
   else if(r.edge==='return'){if(!h.response||r.status!==h.status||r.bodySettled!==true)ngBad();h.completion='returned';h.bodySettled=true;}
   else if(r.edge==='throw'){if(r.status!==h.status||r.bodySettled!==(h.response?false:null))ngBad();h.completion='threw';h.bodySettled=r.bodySettled;}
   else ngBad();continue;
  }
  if(r.kind==='probe'){
   if(cursor!==3||after!=='unobserved')ngBad();const p=Object.fromEntries(Object.entries(r).slice(3));n1ProbeShape(p);
   if(p.stage==='before'){if(phase!==1||probes.length||http.length)ngBad();}
   else{if(phase!==2||probes.length!==1||probes[0].stage!=='before'||probes[0].state==='unavailable'&&p.state!=='unavailable')ngBad();}
   probes.push(p);continue;
  }
  if(r.kind==='after'){
   if(cursor!==4||phase!==0||(r.edge==='throw'?r.error===null:r.error!==null))ngBad();
   if(r.edge==='enter'){if(after!=='unobserved')ngBad();after='entered';}
   else{if(after!=='entered'||!['return','throw'].includes(r.edge))ngBad();after=r.edge==='return'?'returned':'threw';}
   continue;
  }
  ngBad();
 }
 const complete=cursor===4&&phase===0&&['returned','threw'].includes(after);
 if(!complete&&condition!=='timeout')ngBad();n1Native(native,flow,after,complete,condition);
 return {valid:true,code:'OK',integrity:complete?'complete':'prefix',flow,http,probes,after};
}
function n1UnknownProbe(){return {state:'unavailable',newFailures:null,correlated:null,position:null,correlators:[],sites:[],guardOrigin:'unknown',summary:{consumedTicket:null,stageApproval:null,receiptCount:null}};}
function n1PrivateProbeDelta(before,after,root,ticketHash=null){
 const bounded=v=>{try{const s=JSON.stringify(v);if(Buffer.byteLength(s)>131072)return null;const x=JSON.parse(s);return ngObj(x)&&Array.isArray(x.observation)&&x.observation.length<=2048&&Array.isArray(x.calls)&&x.calls.length<=32&&Array.isArray(x.business)&&x.business.length<=64&&x.business.every(v=>typeof v==='string'&&v.length<=256)?x:null;}catch{return null;}};
 const a=bounded(before),b=bounded(after),unknown=n1UnknownProbe();
 if(!a||!b||!ngSame(b.observation.slice(0,a.observation.length),a.observation)||!ngSame(b.calls.slice(0,a.calls.length),a.calls))return unknown;
 const delta=b.observation.slice(a.observation.length),failures=delta.filter(v=>v?.kind==='connection-failure'),receiptCount=b.business.filter(v=>v.startsWith('afw.finite-policy-effect.v1:')&&v.endsWith(':receipt')).length;
 if(failures.length>8||receiptCount>3)return unknown;
 const summary={consumedTicket:n1DigestValue(ticketHash)?b.business.includes('owner-ticket:'+ticketHash+':use'):null,stageApproval:b.business.some(v=>/^connection-preparation:[a-f0-9]{64}:notices:approval$/.test(v)),receiptCount};
 if(failures.length>1)return {...unknown,state:'ambiguous',newFailures:failures.length,summary};
 const rule=N1_RECORD_RULE.oneOf.find(v=>v.properties.kind.const==='probe'),positions=rule.properties.position.enum,labels=rule.properties.correlators.items.enum;
 const one=failures[0],sites=[],relative=['lib/mcp-qa-finite-owner-phase-context.mjs','lib/mcp-qa-finite-owner-preparation.mjs','lib/mcp-qa-finite-owner-native-receiver.mjs','worker/mcp-own/finite.mjs','lib/mcp-qa-finite-owner-cleanup-scope.mjs','lib/mcp-qa-finite-owner-cleanup.mjs','lib/mcp-qa-finite-initial-cleanup.mjs','test/mcp-qa-finite-owner-three-stage-native.test.mjs','test/fixtures/finite-coupled-native.mjs','test/fixtures/finite-first-connection-publication.mjs','test/fixtures/finite-initial-entry-world.mjs','test/mcp-qa-finite-first-connection-publication-native.test.mjs','lib/mcp-qa-finite-owner-notice-get-forward.mjs'];
 if(typeof root==='string'&&root.startsWith('/')&&!root.endsWith('/')&&Array.isArray(one?.frames)&&one.frames.length<=32)for(const frame of one.frames){
  if(typeof frame!=='string'||frame.length>4096)continue;const m=/^    at .*?((?:file:\/\/\/|\/)[^()\r\n]+):([1-9]\d{0,5}):([1-9]\d{0,5})\)?$/.exec(frame);if(!m)continue;
  const i=relative.findIndex(v=>m[1]===root+'/'+v||m[1]==='file://'+root+'/'+v);if(i<0)continue;
  const s={file:i===7?'D07':i===8?'D08':'S'+String(i).padStart(2,'0'),line:Number(m[2]),column:Number(m[3])};
  if(!sites.some(v=>ngSame(v,s)))sites.push(s);if(sites.length===6)break;
 }
 return {...unknown,state:'observed',newFailures:failures.length,position:positions.includes(one?.position)?one.position:null,correlators:[...new Set(delta.filter(v=>v?.kind==='correlator'&&labels.includes(v.name)).map(v=>v.name))],sites,summary};
}
function n1ApiJoin(input,expected,admission){
 if(!ngKeys(input,['run','jobs','commit'])||!ngKeys(expected,['repository','branch','workflowPath','oneUseMessage','job','parent','head','tree','runId','jobId']))ngBad();
 const e=expected,r=input.run,c=input.commit,js=input.jobs;
 if(e.repository!=='tokenizartinfo-ops/agent-friendly-web'||e.branch!=='lab/afw-c2-source-20261116-t1-notices-n1'||e.workflowPath!=='.github/workflows/afw-c2-notices-n1.yml'||e.oneUseMessage!=='AFW-C2-T1-NOTICES-N1-ONEUSE-20261116'||e.job!=='c2-notices-n1'||e.parent!=='6791ce1bab9372e206d3c7b42b3e1394dc6e0c68'||![e.head,e.tree].every(x=>typeof x==='string'&&/^[a-f0-9]{40}$/.test(x))||!ngInt(e.runId,1,Number.MAX_SAFE_INTEGER)||!ngInt(e.jobId,1,Number.MAX_SAFE_INTEGER))ngBad();
 if(!ngObj(r)||r.id!==e.runId||r.run_attempt!==1||r.head_sha!==e.head||r.head_branch!==e.branch||r.path!==e.workflowPath||r.event!=='push'||r.status!=='completed'||r.conclusion!=='success'||r.repository?.full_name!==e.repository||r.head_repository?.full_name!==e.repository)ngBad();
 if(!ngObj(c)||c.sha!==e.head||c.tree?.sha!==e.tree||c.message!==e.oneUseMessage||!Array.isArray(c.parents)||c.parents.length!==1||c.parents[0].sha!==e.parent)ngBad();
 if(!ngObj(js)||js.total_count!==1||!Array.isArray(js.jobs)||js.jobs.length!==1)ngBad();
 const j=js.jobs[0];
 if(!ngObj(j)||j.id!==e.jobId||j.run_id!==e.runId||j.run_attempt!==1||j.head_sha!==e.head||j.name!==e.job||j.status!=='completed'||j.conclusion!=='success'||!Array.isArray(j.steps)||new Set(j.steps.map(s=>s.number)).size!==j.steps.length)ngBad();
 const start=ngTime(j.started_at),end=ngTime(j.completed_at),runStart=ngTime(r.run_started_at),runEnd=ngTime(r.updated_at);if(runEnd<runStart||start<runStart||end>runEnd||end<start||end-start>420000)ngBad();
 if(!ngObj(admission)||!Array.isArray(admission.requiredSteps)||admission.requiredSteps.length!==5||new Set(admission.requiredSteps).size!==5||admission.requiredSteps.some(x=>typeof x!=='string'||!x.length)||admission.commandStep!==admission.requiredSteps[3])ngBad();
 let number=0,previousEnd=start,command=null;
 for(const step of j.steps){
  if(!ngObj(step)||!ngInt(step.number,1,100)||typeof step.name!=='string'||step.status!=='completed'||!(step.conclusion==='success'||step.name==='Post '+admission.requiredSteps[1]&&step.conclusion==='skipped'))ngBad();
 }
 for(const name of admission.requiredSteps){
  const found=j.steps.filter(s=>s.name===name);if(found.length!==1)ngBad();const step=found[0],a=ngTime(step.started_at),b=ngTime(step.completed_at);
  if(step.number<=number||step.conclusion!=='success'||a<start||b>end||b<a||a<previousEnd)ngBad();
  number=step.number;previousEnd=b;if(name===admission.commandStep)command=step;
 }
 if(!command)ngBad();
 return {context:{repository:e.repository,baselineSource:e.parent,baselineTree:'62e78926635d6b74f288d6c0d69e0f2516306989',proposalIndexHash:'0681cadc774fcddf7a009e86e24b22fa879857af1e900f6143d23c2d7eaa9be7',head:e.head,tree:e.tree,runId:String(e.runId),runAttempt:1,job:e.job,node:'v22.23.4'},jobId:j.id,commandStep:command};
}
function n1Crc32(bytes){let crc=0xffffffff;for(const x of bytes){crc^=x;for(let k=0;k<8;k++)crc=crc&1?(crc>>>1)^0xedb88320:crc>>>1;}return (crc^0xffffffff)>>>0;}
function n1ZipPayload(base64,name,inflate){
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
 if(!Buffer.isBuffer(payload)||payload.length!==length||n1Crc32(payload)!==crc)ngBad();return {archive:z,payload};
}
function n1Read(input,schema,admission,hash,inflate){
 if(!ngKeys(input,['run','jobs','commit','expected','transport','artifact'])||typeof hash!=='function'||hash(JSON.stringify(schema))!=='a9fa9f4deff4070307c2502b3675305cbbc61e3dd4de4a3ee1d9fac1fa232730'||hash(JSON.stringify(admission))!=='5df376faffbade90de75c8624d90a2b7d8c21ba138410da12f407a23c64d6956')ngBad();
 const joined=n1ApiJoin({run:input.run,jobs:input.jobs,commit:input.commit},input.expected,admission),t=input.transport;
 if(!ngKeys(t,['runId','jobId','rawLog'])||t.runId!==input.run.id||t.jobId!==joined.jobId)ngBad();
 const frames=ngLogFrames(t.rawLog,joined,'node docs/superpowers/source-lab/c2-t1-notices-n1/run-c2-notices-n1.mjs',['AFW_C2_NOTICES_N1_SYNTHETIC','AFW_C2_DEPENDENCY_CONTROL','AFW_C2_NOTICES_N1_CUSTODY','AFW_C2_NOTICES_N1_OUTCOME']);
 const [synthetic,dependency,custody,outcome]=frames;
 if(!ngSchema(outcome,schema,schema)||!ngSame(outcome.context,joined.context)||outcome.selectionHash!==N1_SELECTION||!ngSame(outcome.bindings,admission.bindings)||!ngSame(outcome.controls,admission.controls)||!ngSame(synthetic,{schema:'afw.c2-notices-n1.synthetic.v1',context:joined.context,selectionHash:N1_SELECTION,...admission.controls})||!ngSame(dependency,{schema:'afw.c2-bootstrap-dependency-control.v1',id:'BOOTSTRAP_DEPENDENCY_ABSENT',status:'pass',observation:'EXPECTED_ENOENT'}))ngBad();
 if(!ngSame(custody,outcome.custody)||custody.schema!=='afw.c2-notices-n1.custody.v1'||!ngSame(custody.context,{head:joined.context.head,runId:joined.context.runId,runAttempt:1,job:'c2-notices-n1',proposalIndexHash:N1_INDEX})||custody.checkedLaunches!==3||!ngInt(custody.checkedProcesses,3,24)||!['parentNonRoot','preflightOwned','preflightRemoved','uidGidGroupsLoopbackMatched','ownRootVerified','ownTempRemoved'].every(k=>custody[k]===true))ngBad();
 const c=outcome.capture,j=outcome.journal,w=j.witness;
 if(!(c.errorKind==='timeout'||c.errorKind==='none'&&c.signal==='none'&&[0,1].includes(c.exitCode))||c.stdout===null||c.stderr===null||!j.stable||j.recorderFaultObserved||!['complete','prefix'].includes(w.integrity)||outcome.observation.valid!==true||outcome.observation.code!=='OK')ngBad();
 const raw=w.records.map(r=>JSON.stringify(r)+'\n').join('');
 if(Buffer.byteLength(raw,'utf8')!==w.prefixBytes||hash(raw)!==w.prefixSha256||j.bytes!==w.prefixBytes||j.sha256!==w.prefixSha256)ngBad();
 const binding={sourceIndexHash:N1_INDEX,driverHash:admission.bindings.driverHash,selectionHash:N1_SELECTION,helperHash:admission.bindings.helperHash,readerHash:admission.bindings.readerHash,slotHash:admission.bindings.slotHash};
 const replay=n1Replay(Buffer.from(raw),binding,c.errorKind==='timeout'?'timeout':'normal',outcome.native);
 if(!ngSame(replay,outcome.observation)||replay.integrity!==w.integrity)ngBad();
 if(c.errorKind==='none'&&outcome.native.integrity==='complete'&&c.exitCode!==(outcome.native.cases.some(n=>n.status==='fail')||outcome.native.sourceFileFailure?1:0))ngBad();
 const a=input.artifact;
 if(!ngKeys(a,['runId','jobId','listing','artifactId','fileName','archiveBase64','payloadText'])||a.runId!==input.run.id||a.jobId!==joined.jobId||a.fileName!=='c2-notices-n1.json'||a.payloadText!==JSON.stringify(outcome)+'\n'||Buffer.byteLength(a.payloadText)>24577||a.listing?.total_count!==1||!Array.isArray(a.listing.artifacts)||a.listing.artifacts.length!==1)ngBad();
 const item=a.listing.artifacts[0],zip=n1ZipPayload(a.archiveBase64,a.fileName,inflate);
 if(item.id!==a.artifactId||!ngInt(item.id,1,Number.MAX_SAFE_INTEGER)||item.name!=='afw-c2-notices-n1'||item.expired!==false||item.size_in_bytes!==zip.archive.length||item.workflow_run?.id!==input.run.id||item.workflow_run?.head_sha!==input.expected.head||item.workflow_run?.head_branch!==input.expected.branch||item.digest!=='sha256:'+hash(zip.archive)||!zip.payload.equals(Buffer.from(a.payloadText)))ngBad();
 return {diagnosticCaptureAccepted:true,context:joined.context,jobId:joined.jobId,commandStepNumber:joined.commandStep.number,observation:replay,native:outcome.native,capture:c,artifact:{id:item.id,archiveBytes:zip.archive.length,archiveSha256:hash(zip.archive),payloadBytes:zip.payload.length,payloadSha256:hash(zip.payload)},SourceQualified:false,Task1Pass:false,nonclaims:{historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}};
}

export {n1Replay,n1Native,n1ProbeShape,n1PrivateProbeDelta,n1Read,n1ApiJoin,n1ZipPayload,n1Crc32,ngTime,ngSchema,ngSame,N1_IDS,N1_INDEX,N1_SELECTION};
