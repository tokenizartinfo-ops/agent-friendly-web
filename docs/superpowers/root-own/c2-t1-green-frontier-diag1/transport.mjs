import {G20_FIXED} from './fixed.mjs';
import {gBad,gObj,gKeys,gSame,gInt} from './shape.mjs';
function gTime(v){
 if(typeof v!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,9})?Z$/.test(v))gBad();
 const n=Date.parse(v);if(!Number.isFinite(n)||new Date(n).toISOString().slice(0,19)!==v.slice(0,19))gBad();return n;
}
function gApiJoin(run,jobs,commit,expected){
 const a=G20_FIXED,s=a.sourceNomination,keys=['repository','branch','workflowPath','oneUseMessage','job','parent','head','tree','runId','jobId','requiredSteps'];
 if(!gKeys(expected,keys)||expected.repository!=='tokenizartinfo-ops/agent-friendly-web'||expected.branch!==s.branch||expected.workflowPath!==s.workflow||expected.oneUseMessage!==s.message||expected.job!==s.job||expected.parent!==a.base||!gSame(expected.requiredSteps,a.sourceSteps)||![expected.head,expected.tree].every(x=>typeof x==='string'&&/^[a-f0-9]{40}$/.test(x))||!gInt(expected.runId,1,Number.MAX_SAFE_INTEGER)||!gInt(expected.jobId,1,Number.MAX_SAFE_INTEGER))gBad();
 if(!gObj(run)||run.id!==expected.runId||run.head_sha!==expected.head||run.head_branch!==expected.branch||run.run_attempt!==1||run.event!=='push'||run.path!==expected.workflowPath||run.status!=='completed'||run.conclusion!=='success'||run.repository?.full_name!==expected.repository||run.head_repository?.full_name!==expected.repository)gBad();
 if(!gObj(commit)||commit.sha!==expected.head||commit.tree?.sha!==expected.tree||commit.message!==expected.oneUseMessage||!Array.isArray(commit.parents)||commit.parents.length!==1||commit.parents[0]?.sha!==expected.parent)gBad();
 if(!gObj(jobs)||jobs.total_count!==1||!Array.isArray(jobs.jobs)||jobs.jobs.length!==1)gBad();
 const j=jobs.jobs[0];if(!gObj(j)||j.id!==expected.jobId||j.run_id!==expected.runId||j.run_attempt!==1||j.name!==expected.job||j.head_sha!==expected.head||j.status!=='completed'||j.conclusion!=='success'||!Array.isArray(j.steps)||!j.steps.length||j.steps.length>128)gBad();
 const rc=gTime(run.created_at),rs=gTime(run.run_started_at),re=gTime(run.updated_at),js=gTime(j.started_at),je=gTime(j.completed_at);
 if(!(rc<=rs&&rs<=js&&js<=je&&je<=re)||je-js>420000)gBad();
 const numbers=new Set(),names=new Set();for(const step of j.steps){
  if(!gObj(step)||!gInt(step.number,1,1000)||typeof step.name!=='string'||!step.name.length||numbers.has(step.number)||names.has(step.name)||step.status!=='completed'||!(step.conclusion==='success'||step.conclusion==='skipped'&&step.name==='Post Use the fixed Node runtime'))gBad();
  numbers.add(step.number);names.add(step.name);
  if(step.conclusion==='success'||step.started_at!=null||step.completed_at!=null){const ss=gTime(step.started_at),se=gTime(step.completed_at);if(ss<js||se>je||ss>se)gBad();}
 }
 const selected=a.sourceSteps.map(name=>{const found=j.steps.filter(x=>x.name===name);if(found.length!==1||found[0].conclusion!=='success')gBad();return found[0];});
 for(let i=0;i<selected.length;i++)if(i&&(selected[i].number<=selected[i-1].number||gTime(selected[i].started_at)<gTime(selected[i-1].completed_at)))gBad();
 const context={repository:expected.repository,baselineSource:a.base,baselineTree:a.baseTree,sourceIndexBlob:a.indexBlob,proposalIndexHash:a.indexHash,selectionHash:a.selectionHash,head:expected.head,tree:expected.tree,runId:String(expected.runId),runAttempt:1,job:s.job,node:'v22.23.4'};
 return {context,jobId:j.id,commandStepNumbers:selected.map(x=>x.number),commandStep:selected[3]};
}

function g20Trusted(t,hash){
 if(!gKeys(t,['expected','bodyEdges','bodyEdgesHash'])||!Array.isArray(t.bodyEdges)||t.bodyEdges.length<25||t.bodyEdges.length>64||hash(JSON.stringify(t.bodyEdges))!==t.bodyEdgesHash)gBad();
 const map=new Map();for(const e of t.bodyEdges){
  if(!gKeys(e,['path','mode','type','blob','bytes','sha256'])||typeof e.path!=='string'||map.has(e.path)||e.mode!=='100644'||e.type!=='blob'||!/^[a-f0-9]{40}$/.test(e.blob)||!/^[a-f0-9]{64}$/.test(e.sha256)||!gInt(e.bytes,1,33554432))gBad();
  if(!G20_FIXED.knownEdges.some(k=>k.path===e.path)&&!e.path.startsWith(G20_FIXED.sourceNomination.prefix)&&e.path!==G20_FIXED.sourceNomination.workflow)gBad();
  map.set(e.path,e);
 }
 for(const e of G20_FIXED.knownEdges)if(!gSame(map.get(e.path),e))gBad();
 for(const path of G20_FIXED.mandatoryPaths)if(!map.has(path))gBad();
 return map;
}
function g20Tree(tree,expected,edges){
 if(!gObj(tree)||tree.sha!==expected.tree||tree.truncated!==false||!Array.isArray(tree.tree)||tree.tree.length>8192||Buffer.byteLength(JSON.stringify(tree))>4194304)gBad();
 const map=new Map();for(const e of tree.tree){if(!gObj(e)||typeof e.path!=='string'||!e.path.length||e.path.length>2048||e.path.startsWith('/')||e.path.includes('\\')||e.path.split('/').some(x=>!x||x==='.'||x==='..')||map.has(e.path))gBad();map.set(e.path,e);}
 for(const [path,known] of edges){const e=map.get(path);if(!e||e.type!=='blob'||e.mode!==known.mode||e.sha!==known.blob||Object.hasOwn(e,'size')&&e.size!==known.bytes)gBad();}
 for(const path of map.keys())if((path.startsWith('docs/superpowers/source-lab/c2-t1/')||path.startsWith(G20_FIXED.sourceNomination.prefix))&&!edges.has(path))gBad();
 if(map.has('test/fixtures/finite-coupled-native.mjs'))gBad();
 const baseS09=map.get('test/fixtures/finite-first-connection-publication.mjs');if(!baseS09||baseS09.type!=='blob'||baseS09.mode!=='100644'||baseS09.sha!=='cede301c3e9cd95716ae2134f938dbb1d940e7a9'||Object.hasOwn(baseS09,'size')&&baseS09.size!==57864)gBad();
 return {matchedBodyEdges:edges.size};
}
function g20Log(raw,joined){
 if(typeof raw!=='string'||Buffer.byteLength(raw)>4194304||!raw.endsWith('\n'))gBad();
 const start=gTime(joined.commandStep.started_at)-1000,end=gTime(joined.commandStep.completed_at)+1000,command=G20_FIXED.sourceNomination.command,frames=[];
 let opened=false,closed=false,window=false,seen=0;
 for(const row of raw.split('\n')){
  if(!row)continue;const m=/^(\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,9})?Z) (.*)$/.exec(row);
  if(!m){if(row.includes('AFW_C2_')||row.includes('##[group]Run '+command))gBad();continue;}
  const stamp=gTime(m[1]),line=m[2],inside=stamp>=start&&stamp<=end;
  if(line==='##[group]Run '+command){if(++seen!==1||opened||!inside)gBad();opened=true;window=true;continue;}
  if(opened&&line==='##[endgroup]'){if(!inside)gBad();opened=false;closed=true;continue;}
  if(closed&&line.startsWith('##[group]'))window=false;
  if(line.includes('AFW_C2_')){if(!line.startsWith('AFW_C2_')||!inside||!closed||!window||seen!==1)gBad();frames.push(line);}
 }
 if(seen!==1||opened||!closed||frames.length!==2)gBad();return frames;
}
function gZipExtra(bytes,start,length){
 const end=start+length;if(!Number.isSafeInteger(end)||start<0||end>bytes.length)gBad();
 while(start<end){
  if(end-start<4)gBad();const id=bytes.readUInt16LE(start),size=bytes.readUInt16LE(start+2);start+=4;
  if(id===0x0001||size>end-start)gBad();start+=size;
 }
}
function gCrc32(bytes){let crc=0xffffffff;for(const x of bytes){crc^=x;for(let k=0;k<8;k++)crc=crc&1?(crc>>>1)^0xedb88320:crc>>>1;}return (crc^0xffffffff)>>>0;}
function gZipPayload(base64,name,inflate){
 if(typeof base64!=='string'||base64.length>1500000)gBad();const z=Buffer.from(base64,'base64');if(z.toString('base64')!==base64||z.length<22||z.length>1048576)gBad();
 let e=-1;for(let p=z.length-22;p>=Math.max(0,z.length-65557);p--)if(z.readUInt32LE(p)===0x06054b50&&p+22+z.readUInt16LE(p+20)===z.length){e=p;break;}
 if(e<0||z.readUInt16LE(e+4)!==0||z.readUInt16LE(e+6)!==0||z.readUInt16LE(e+8)!==1||z.readUInt16LE(e+10)!==1)gBad();
 const size=z.readUInt32LE(e+12),c=z.readUInt32LE(e+16);if(c+size!==e||size<46||c<30||z.readUInt32LE(c)!==0x02014b50)gBad();
 const flags=z.readUInt16LE(c+8),method=z.readUInt16LE(c+10),crc=z.readUInt32LE(c+16),compressed=z.readUInt32LE(c+20),length=z.readUInt32LE(c+24),nl=z.readUInt16LE(c+28),el=z.readUInt16LE(c+30),cl=z.readUInt16LE(c+32),local=z.readUInt32LE(c+42);
 if(flags&~0x80e||![0,8].includes(method)||length<1||length>24577||compressed>1048576||46+nl+el+cl!==size||z.readUInt16LE(c+34)!==0||local!==0||((z.readUInt32LE(c+38)>>>16)&0xf000)!==0&&((z.readUInt32LE(c+38)>>>16)&0xf000)!==0x8000)gBad();
 const version=z.readUInt16LE(c+6);if(z.readUInt16LE(4)!==version||!(method===0?[10,20].includes(version):version===20))gBad();
 gZipExtra(z,c+46+nl,el);
 if(z.subarray(c+46,c+46+nl).toString('utf8')!==name||z.readUInt32LE(0)!==0x04034b50||z.readUInt16LE(6)!==flags||z.readUInt16LE(8)!==method)gBad();
 const lnl=z.readUInt16LE(26),lel=z.readUInt16LE(28),start=30+lnl+lel,end=start+compressed;
 if(z.subarray(30,30+lnl).toString('utf8')!==name||end>c)gBad();
 gZipExtra(z,30+lnl,lel);
 if(flags&8){for(const [offset,wanted] of [[14,crc],[18,compressed],[22,length]]){const value=z.readUInt32LE(offset);if(value!==0&&value!==wanted)gBad();}let d=end;if(c-d===16&&z.readUInt32LE(d)===0x08074b50)d+=4;if(c-d!==12||z.readUInt32LE(d)!==crc||z.readUInt32LE(d+4)!==compressed||z.readUInt32LE(d+8)!==length)gBad();}
 else if(end!==c||z.readUInt32LE(14)!==crc||z.readUInt32LE(18)!==compressed||z.readUInt32LE(22)!==length)gBad();
 let payload;if(method===0)payload=z.subarray(start,end);else{
  if(typeof inflate!=='function')gBad();let decoded;
  try{decoded=inflate(z.subarray(start,end),{maxOutputLength:24577,info:true});}catch{gBad();}
  if(!gObj(decoded)||!Buffer.isBuffer(decoded.buffer)||!decoded.engine||!Number.isSafeInteger(decoded.engine.bytesWritten)||decoded.engine.bytesWritten!==compressed)gBad();
  payload=decoded.buffer;
 }
 if(!Buffer.isBuffer(payload)||payload.length!==length||gCrc32(payload)!==crc)gBad();return {archive:z,payload};
}



export {gTime,gApiJoin,g20Trusted,g20Tree,g20Log,gZipPayload,gCrc32};
