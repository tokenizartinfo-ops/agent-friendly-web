import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { open, lstat, realpath, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { progress, nativePrefix } from './read-progress.mjs';

const family = 'afw.c2-get-winner-observation1-';
export const markers = Object.freeze({
  custody: 'AFW_C2_GET_WINNER_OBSERVATION1_CUSTODY',
  outcome: 'AFW_C2_GET_WINNER_OBSERVATION1_OUTCOME',
  fault: 'AFW_C2_GET_WINNER_OBSERVATION1_FAULT'
});
export const flags = Object.freeze({
  historicalCauseProven: false, receiptAuthenticated: false, operationalReadiness: false,
  completePackage: false, PCoff: false, globalNativeDrainVerified: false, sdkNamespaceEmptyVerified: false
});
export function requireFact(condition, code) {
  if (!condition) throw Object.assign(new Error(code), { code });
}
export const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
export const sha = bytes => createHash('sha256').update(bytes).digest('hex');
export function hashes(bytes) {
  return { bytes: bytes.length, sha256: sha(bytes),
    git: createHash('sha1').update(Buffer.from('blob ' + bytes.length + '\0')).update(bytes).digest('hex') };
}
export function match(bytes, pin, code) {
  const actual = hashes(bytes);
  requireFact(actual.bytes === pin.bytes && actual.git === (pin.blob ?? pin.git)
    && actual.sha256 === pin.sha256, code);
  return actual;
}
const numberIn = (n, lo, hi) => Number.isSafeInteger(n) && n >= lo && n <= hi;
const sameInode = (a,b) => a.dev === b.dev && a.ino === b.ino;
const stable = (a,b) => sameInode(a,b) && a.size === b.size &&
  a.mtimeMs === b.mtimeMs && a.ctimeMs === b.ctimeMs;
const privateFile = v => v.isFile() && v.nlink === 1 && (v.mode & 0o777) === 0o600 &&
  v.uid === process.getuid() && v.gid === process.getgid();

// Read the actual inode and check its path again after reading; a replaced/torn file
// is different from a stable file ending in a partial journal record.
async function measuredRead(path, limit, code, identity = null, privateMode = false) {
  let handle;
  try {
    requireFact(await realpath(path) === resolve(path), code);
    handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
    const before = await handle.stat();
    requireFact(before.isFile() && before.nlink === 1 && numberIn(before.size,0,limit)
      && (!identity || sameInode(identity,before)) && (!privateMode || privateFile(before)), code);
    const data = Buffer.alloc(before.size);
    let offset = 0;
    while (offset < data.length) {
      const {bytesRead} = await handle.read(data,offset,data.length-offset,offset);
      requireFact(bytesRead > 0,code);
      offset += bytesRead;
    }
    const after = await handle.stat(), named = await lstat(path);
    requireFact(stable(before,after) && stable(after,named) && (!privateMode || privateFile(named)),code);
    return data;
  } catch { throw Object.assign(new Error(code), {code}); }
  finally { if (handle) await handle.close(); }
}
export async function measureTargets(root, entries) {
  requireFact(entries.length === 13 && new Set(entries.map(e=>e.path)).size === 13,'TARGET_DRIFT');
  const observed = [];
  for (const entry of entries) {
    const bytes = await measuredRead(join(root,entry.path),entry.after.bytes,'TARGET_DRIFT');
    observed.push(match(bytes,entry.after,'TARGET_DRIFT').sha256);
  }
  return observed;
}
export async function verifySiblings(root, selection) {
  const spec = selection.registrationTail, d = selection.driver, s = selection.originalDriver;
  const original = await measuredRead(join(root,s.path),s.bytes,'TARGET_DRIFT');
  const driver = await measuredRead(join(root,d.path),d.bytes,'TARGET_DRIFT');
  const recorder = await measuredRead(join(root,selection.recorder.path),selection.recorder.bytes,'TARGET_DRIFT');
  match(original,s,'TARGET_DRIFT'); match(driver,d,'TARGET_DRIFT'); match(recorder,selection.recorder,'TARGET_DRIFT');
  const a=original.subarray(spec.originalOffset), b=driver.subarray(spec.driverOffset);
  requireFact(d.path !== s.path && a.length === spec.bytes && a.equals(b) && sha(a) === spec.sha256,'TARGET_DRIFT');
  const alias=selection.aliases.filter(x=>x.id==='D07');
  requireFact(alias.length===1 && alias[0].path===d.path && alias[0].blob===d.git,'TARGET_DRIFT');
  return spec.sha256;
}
export async function installSiblings(root,selection,driver,recorder) {
  match(driver,selection.driver,'TARGET_DRIFT'); match(recorder,selection.recorder,'TARGET_DRIFT');
  requireFact(selection.driver.path!==selection.originalDriver.path,'TARGET_DRIFT');
  await writeFile(join(root,selection.driver.path),driver,{flag:'wx',mode:0o600});
  await writeFile(join(root,selection.recorder.path),recorder,{flag:'wx',mode:0o600});
  return verifySiblings(root,selection);
}
export async function createJournal(path) {
  const h=await open(path,constants.O_CREAT|constants.O_EXCL|constants.O_WRONLY|constants.O_NOFOLLOW,0o600);
  try {
    const s=await h.stat();
    requireFact(privateFile(s)&&s.size===0,'JOURNAL_INVALID');
    return s;
  } finally { await h.close(); }
}
export const readJournal = (path,initial) => measuredRead(path,32768,'JOURNAL_INVALID',initial,true);
export async function readProbe(path) {
  const raw=await measuredRead(path,1024,'CUSTODY_INVALID',null,true);
  const expected={schema:'afw.c2-oauth-custody.v1',uidMatches:true,gidMatches:true,groupsCleared:true,loopbackOnly:true};
  requireFact(raw.equals(Buffer.from(JSON.stringify(expected)+'\n')),'CUSTODY_INVALID');
  return sha(raw);
}
export function freshProbes(before,after) {
  const valid=names=>Array.isArray(names)&&names.length<=8&&new Set(names).size===names.length&&
    names.every(n=>/^[1-9][0-9]*\.json$/.test(n));
  requireFact(valid(before)&&valid(after)&&before.every(n=>after.includes(n)),'CUSTODY_INVALID');
  const count=after.filter(n=>!before.includes(n)).length;
  requireFact(count>=1 && count<=7,'CUSTODY_INVALID');
  return count;
}
export function custodyFrame(context,preflightProcesses,greenProcesses,checks) {
  const count=preflightProcesses+greenProcesses;
  requireFact(numberIn(preflightProcesses,1,7)&&numberIn(greenProcesses,1,7)&&numberIn(count,2,8),'CUSTODY_INVALID');
  for (const key of ['parentNonRoot','preflightOwned','preflightRemoved','uidGidGroupsLoopbackMatched',
    'targetsBeforeMatched','targetsAfterMatched','journalOwnershipMatched','ownRootVerified','ownTempRemoved'])
    requireFact(checks[key]===true,'CUSTODY_INVALID');
  return {schema:family+'custody.v1',context,parentNonRoot:checks.parentNonRoot,
    preflightOwned:checks.preflightOwned,preflightRemoved:checks.preflightRemoved,checkedLaunches:2,
    preflightProcesses,greenProcesses,checkedProcesses:count,uidGidGroupsLoopbackMatched:checks.uidGidGroupsLoopbackMatched,
    targetsBeforeMatched:checks.targetsBeforeMatched,targetsAfterMatched:checks.targetsAfterMatched,
    journalOwnershipMatched:checks.journalOwnershipMatched,ownRootVerified:checks.ownRootVerified,ownTempRemoved:checks.ownTempRemoved};
}
const targetId = 'C2T1_NOTICES', projectionSchema = 'afw.c2-first-failure-post-diag2.v1';
const sourceKeys = ['id','status','phase','counters','code'], counterKeys = ['upload','activation','receipts'];
const keyOrder = (o, keys) => o !== null && typeof o === 'object' && !Array.isArray(o) && same(Object.keys(o),keys);
const emptyProjection = (state,reason) => ({schema:projectionSchema,state,reason,throwSequence:null,source:null,assertion:null});
const unknown = reason => emptyProjection('UNKNOWN',reason);
const outside = reason => emptyProjection('NOT_APPLICABLE',reason);
const targetThrow = e => e?.id===targetId && e.operation==='action' && e.edge==='throw' &&
  e.error?.name==='AssertionError' && e.error.code==='ERR_ASSERTION' &&
  same(e.error.site,{file:'S08',line:41,column:12});
const prevPhases = ['connection','oauth',...Array(9).fill('negative'),'notices'];

// C2SOURCE and the flat TAP result stream have separate ordering. Never take a
// console row inside diagnostic text, or an assertion from another result block.
function targetFromWire(lines,ids) {
  let diagnostic=false, owner=null, targetBlocks=0, fields=null, closed=false, layout=false, duplicate=false;
  let next=0, lastRow=-1, targetRow=null, sourceError=null;
  const seenRows=new Set();
  for(const line of lines) {
    if(line==='  ---') {
      if(diagnostic || owner===null) layout=true;
      if(owner===targetId) { if(++targetBlocks!==1) duplicate=true; fields=new Map(); }
      diagnostic=true;
      continue;
    }
    if(line==='  ...') {
      if(!diagnostic) layout=true;
      if(diagnostic && owner===targetId) closed=true;
      diagnostic=false;
      continue;
    }
    if(diagnostic) {
      if(!line.startsWith('    ') && line!=='') {
        if(!line.startsWith('  ')) {layout=true;continue;}
        if(owner===targetId) {
          const m=/^  ([A-Za-z_][A-Za-z0-9_]*):(?: (.*))?$/.exec(line);
          if(!m) {layout=true;continue;}
          const [,key,value]=m;
          if(fields.has(key)) duplicate=true;
          fields.set(key,value??'');
        }
      }
      continue;
    }
    if(line.startsWith('# Subtest: ')) {owner=null;continue;}
    const pair=/^(?:not )?ok [1-9]\d* - (C2T1_[A-Z_]+)$/.exec(line);
    if(pair) {owner=pair[1];continue;}
    if(!line.startsWith('# C2SOURCE ')) continue;
    const encoded=line.slice(11);
    let row;
    try {
      row=JSON.parse(encoded);
      if(!keyOrder(row,sourceKeys)||!keyOrder(row.counters,counterKeys)||JSON.stringify(row)!==encoded) throw 0;
    } catch {sourceError='AMBIGUOUS_EVIDENCE';continue;}
    const pos=ids.indexOf(row.id);
    if(pos<0||seenRows.has(row.id)||pos<=lastRow||(pos<=11 && pos!==next)) {
      sourceError='AMBIGUOUS_EVIDENCE';
    }
    seenRows.add(row.id); lastRow=pos;
    if(pos<=11 && pos>=0) {
      next=pos+1;
      if(pos===11) targetRow=row;
      if(sourceError!=='AMBIGUOUS_EVIDENCE') {
        const passed=pos!==11;
        if(row.status!==(passed?'pass':'fail') || row.code!==(passed?'OK':'TEST_FAILED') || row.phase!==prevPhases[pos])
          sourceError='CONFLICTING_EVIDENCE';
        else if(!sourceError && !counterKeys.every(k=>numberIn(row.counters[k],0,3))) sourceError='UNSUPPORTED_SCALARS';
      }
    }
  }
  if(diagnostic && owner===targetId) return unknown('TRUNCATED_NATIVE');
  if(layout) return unknown('NATIVE_FORMAT_UNSUPPORTED');
  if(sourceError) return unknown(sourceError);
  if(!targetRow) return unknown('SOURCE_ROW_UNAVAILABLE');
  if(duplicate) return unknown('AMBIGUOUS_EVIDENCE');
  if(!fields || !closed) return unknown('ASSERTION_SCALARS_UNAVAILABLE');
  const tags={failureType:"'testCodeFailure'",code:"'ERR_ASSERTION'",name:"'AssertionError'",operator:"'strictEqual'"};
  for(const [key,expected] of Object.entries(tags)) {
    if(!fields.has(key)) return unknown('NATIVE_FORMAT_UNSUPPORTED');
    if(fields.get(key)!==expected) return unknown('CONFLICTING_EVIDENCE');
  }
  if(!fields.has('actual')||!fields.has('expected')) return unknown('ASSERTION_SCALARS_UNAVAILABLE');
  // Only calibrated top-level scalar fields. Nested map/text content is opaque.
  if(fields.get('type')!=="'test'" || !/^\d+(?:\.\d+)?$/.test(fields.get('duration_ms')??'') ||
     !fields.has('location') || fields.get('error')!=='|-' || fields.get('stack')!=='|-' ||
     [...fields.keys()].some(k=>!['duration_ms','type','location','failureType','error','code','name',
       'expected','actual','operator','stack'].includes(k))) return unknown('NATIVE_FORMAT_UNSUPPORTED');
  const [actual,expected]=['actual','expected'].map(key=>{
    const scalar=fields.get(key);
    return /^(?:0|[1-9]\d*)$/.test(scalar) ? Number(scalar) : NaN;
  });
  if(!numberIn(actual,100,599)||!Number.isSafeInteger(expected)) return unknown('UNSUPPORTED_SCALARS');
  if(actual===200||expected!==200) return unknown('CONFLICTING_EVIDENCE');
  return {source:targetRow,assertion:{actual,expected}};
}

// Only called with the validated monotonic prefix from read-progress. The
// projector never reconstructs a missing operation or reads any external data.
export function projectFirstFailure(stdout,facts,ids) {
  const {witness,native,firstThrowSequence}=facts, events=witness.events, first=events.find(e=>e.edge==='throw');
  requireFact((first?.sequence??null)===firstThrowSequence && ids.length===20 && ids[11]===targetId,'EVIDENCE_CONFLICT');
  const settled=(id,op,edge)=>events.some(e=>e.id===id&&e.operation===op&&e.edge===edge);
  if(first && !targetThrow(first)) return outside('EARLIEST_THROW_DIFFERENT');
  const earlier=native.cases.slice(0,11), target=native.cases[11];
  if(earlier.some(e=>e.status==='fail')) return outside('EARLIER_NATIVE_FAILURE');
  if(target?.id===targetId && target.status==='pass')
    return settled(targetId,'action','return') && settled(targetId,'count','return') ?
      outside('TARGET_PASSED') : unknown('JOURNAL_UNRESOLVED');
  if(!first) return witness.integrity==='complete' ? outside('NO_QUALIFYING_THROW') : unknown('JOURNAL_UNRESOLVED');
  if(!ids.slice(0,11).every(id=>settled(id,'action','return')&&settled(id,'count','return')))
    return unknown('JOURNAL_UNRESOLVED');
  if(!settled(targetId,'count','enter')||!settled(targetId,'count','return')) return unknown('COUNTER_UNAVAILABLE');
  if(native.integrity==='torn') return unknown('TRUNCATED_NATIVE');
  let text;
  try {text=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(stdout);}
  catch {return unknown('NATIVE_FORMAT_UNSUPPORTED');}
  if(/[\r\t\0]/.test(text) || (text!==''&&!text.startsWith('TAP version 13\n'))) return unknown('NATIVE_FORMAT_UNSUPPORTED');
  if(native.integrity==='ambiguous') return unknown('AMBIGUOUS_EVIDENCE');
  if(earlier.length!==11 || !target || target.id!==targetId || target.status!=='fail') return unknown('TARGET_NATIVE_UNAVAILABLE');
  const parsed=targetFromWire(text.split('\n'),ids);
  if(parsed.state) return parsed;
  return {schema:projectionSchema,state:'KNOWN',reason:'TARGET_POST_ASSERTION',throwSequence:first.sequence,
    source:parsed.source,assertion:parsed.assertion};
}

const finiteSchema='afw.c2-finite-get-diag3.v1';
const monitorId='C2T1_MONITOR', scopeId='C2T1_SCOPE_MISSING';
const fullPhases=[...prevPhases,'monitor','monitor','scope','finite','selection','negative','negative','negative'];
const bucketValues=['0','1','2+','UNKNOWN'];
const missedHttp=(reason,state='UNKNOWN')=>({state,reason,throwSequence:null,actual:null,expected:null});
const missedCount=reason=>({value:'UNKNOWN',reason,countSequence:null});
const scopeThrow=e=>e?.id===scopeId&&e.operation==='action'&&e.edge==='throw'&&e.error?.name==='AssertionError'&&
 e.error.code==='ERR_ASSERTION'&&same(e.error.site,{file:'S08',line:18,column:143});

function finiteJournal(facts,ids,ordinal) {
 const events=facts.witness.events;
 const id=ids[ordinal-1],prior=ids.slice(0,ordinal-1);
 const settled=(key,op,edge)=>events.find(e=>e.id===key&&e.operation===op&&e.edge===edge);
 const priorReturned=prior.every(k=>settled(k,'action','return')&&settled(k,'count','return'));
 const returned=settled(id,'count','return'),action=settled(id,'action','return')??settled(id,'action','throw');
 const joined=priorReturned&&returned&&action&&(ordinal!==14||action.edge==='return')&&
   !events.some(e=>e.id==='AFTER'&&e.sequence<returned.sequence);
 let reason=null;
 if(!joined)reason='JOURNAL_UNRESOLVED';
 else if(facts.native.integrity!=='prefix'||facts.native.cases.length<ordinal||
   !prior.every((k,i)=>facts.native.cases[i]?.id===k&&facts.native.cases[i].status==='pass')||
   facts.native.cases[ordinal-1]?.id!==id||
   facts.native.cases[ordinal-1]?.status!==(action.edge==='return'?'pass':'fail'))reason='NATIVE_UNJOINED';
 return {reason,returned,priorReturned,action};
}

function finiteCandidate(facts,ids,join) {
 const first=facts.witness.events.find(e=>e.edge==='throw'),native=facts.native;
 if(first&&!scopeThrow(first))return missedHttp('EARLIEST_THROW_DIFFERENT','NOT_APPLICABLE');
 if(native.cases.slice(0,14).some(r=>r.status==='fail'))return missedHttp('EARLIER_NATIVE_FAILURE','NOT_APPLICABLE');
 if(native.cases[14]?.status==='pass')return join.action?.edge==='return'&&join.returned?
  missedHttp('TARGET_PASSED','NOT_APPLICABLE'):missedHttp('JOURNAL_UNRESOLVED');
 if(!first)return facts.witness.integrity==='complete'?missedHttp('NO_QUALIFYING_THROW','NOT_APPLICABLE'):missedHttp('JOURNAL_UNRESOLVED');
 if(!join.priorReturned)return missedHttp('JOURNAL_UNRESOLVED');
 if(!join.returned)return missedHttp('COUNTER_UNAVAILABLE');
 if(native.integrity==='torn')return missedHttp('TRUNCATED_NATIVE');
 if(native.integrity==='ambiguous')return missedHttp('AMBIGUOUS_EVIDENCE');
 if(native.integrity!=='prefix'||native.cases[14]?.id!==ids[14]||native.cases[14]?.status!=='fail')return missedHttp('TARGET_NATIVE_UNAVAILABLE');
 return null;
}

function scanFiniteWire(stdout,ids,native) {
 const errors=[],markers=new Map(),rows=new Map();
 let last=-1,markerLast=0,markerCount=0,invalidMarker=false,getRaw=null;
 let diag=false,owner=null,blockCount=0,fields=null,closed=false,duplicate=false,layout=false;
 const sourceError=(index,reason)=>errors.push({index,reason});
 let text;
 try{text=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(stdout);}catch{}
 if(typeof text!=='string'||(text!==''&&!text.startsWith('TAP version 13\n'))||/[\t\r\0]/.test(text)){
  return {unsupportedEnvelope:true,rowError:()=> 'NATIVE_FORMAT_UNSUPPORTED',invalidMarker:true,markers,assertionError:'NATIVE_FORMAT_UNSUPPORTED'};
 }
 for(const line of text.split('\n')){
  if(line==='  ---'){
   if(diag||!owner)layout=true;
   if(owner===scopeId){if(++blockCount!==1)duplicate=true;fields=new Map();}
   diag=true;continue;
  }
  if(line==='  ...'){if(!diag)layout=true;if(owner===scopeId)closed=true;diag=false;continue;}
  if(diag){
   if(line&&!line.startsWith('    ')){
    if(!line.startsWith('  ')){layout=true;continue;}
    if(owner===scopeId){
     const m=/^  ([A-Za-z_][A-Za-z0-9_]*):(?: (.*))?$/.exec(line);
     if(!m){layout=true;continue;}
     if(fields.has(m[1]))duplicate=true;
     fields.set(m[1],m[2]??'');
    }
   }
   continue;
  }
  if(line.startsWith('# Subtest: ')){owner=null;continue;}
  const pair=/^(?:not )?ok [1-9]\d* - (C2T1_[A-Z_]+)$/.exec(line);
  if(pair){owner=pair[1];continue;}
  if(line.startsWith('# C2FT4')){
   try{
    if(++markerCount>2||!line.startsWith('# C2FT4 ')||Buffer.byteLength(line)+1>96)throw 0;
    const body=line.slice(8),m=JSON.parse(body);
    if(!keyOrder(m,['id','value','w','s','h'])||JSON.stringify(m)!==body||m.id!==scopeId||!bucketValues.includes(m.value))throw 0;
    if(m.w==='U'?m.s!==0||m.h!==0:normalizeGetWinner(m.w,m.s,m.h,m.h).winner==='UNKNOWN')throw 0;
    if(markers.has(15)||markerLast>=15||last!==13)throw 0;
    markers.set(15,m.value);markerLast=15;getRaw=m;
   }catch{invalidMarker=true;getRaw=null;}
   continue;
  }
  if(line.startsWith('# C2FT3')){
   try{
    if(++markerCount>2||!line.startsWith('# C2FT3 ')||Buffer.byteLength(line)+1>96)throw 0;
    const body=line.slice(8),m=JSON.parse(body);
    if(!keyOrder(m,['id','value'])||JSON.stringify(m)!==body||!bucketValues.includes(m.value))throw 0;
    const ordinal=m.id===monitorId?14:m.id===scopeId?15:0;
    if(!ordinal||markers.has(ordinal)||ordinal<=markerLast||last!==ordinal-2)throw 0;
    markers.set(ordinal,m.value);markerLast=ordinal;
   }catch{invalidMarker=true;}
   continue;
  }
  if(!line.startsWith('# C2SOURCE '))continue;
  const body=line.slice(11);
  let r;
  try{r=JSON.parse(body);}catch{sourceError(0,'AMBIGUOUS_EVIDENCE');continue;}
  const pos=ids.indexOf(r?.id);
  if(pos<0){sourceError(0,'AMBIGUOUS_EVIDENCE');continue;}
  if(rows.has(pos)||pos<=last)sourceError(pos,'AMBIGUOUS_EVIDENCE');
  if(pos>last+1)sourceError(last+1,'AMBIGUOUS_EVIDENCE');
  last=pos;
  rows.set(pos,r);
  if(!keyOrder(r,sourceKeys)||!keyOrder(r.counters,counterKeys)||JSON.stringify(r)!==body)
   sourceError(pos,'AMBIGUOUS_EVIDENCE');
  else if(r.phase!==fullPhases[pos]||!['pass','fail'].includes(r.status)||r.code!==(r.status==='pass'?'OK':'TEST_FAILED')||
    (native.cases[pos]&&r.status!==native.cases[pos].status))sourceError(pos,'CONFLICTING_EVIDENCE');
  else if(!counterKeys.every(k=>numberIn(r.counters[k],0,3)))sourceError(pos,'UNSUPPORTED_SCALARS');
 }
 for(const ordinal of markers.keys())if(!rows.has(ordinal-1))invalidMarker=true;
 const rowError=n=>{
  const within=errors.filter(e=>e.index<n);
  for(const reason of ['AMBIGUOUS_EVIDENCE','CONFLICTING_EVIDENCE','UNSUPPORTED_SCALARS'])
   if(within.some(e=>e.reason===reason))return reason;
  return rows.has(n-1)?null:'SOURCE_ROW_UNAVAILABLE';
 };
 const assertionError=diag&&owner===scopeId?'TRUNCATED_NATIVE':layout?'NATIVE_FORMAT_UNSUPPORTED':null;
 return {rowError,markers,invalidMarker,assertionError,fields,closed,duplicate,getRaw};
}

function finiteAssertion(scan,sequence) {
 if(scan.assertionError)return missedHttp(scan.assertionError);
 const sourceError=scan.rowError(15);
 if(sourceError)return missedHttp(sourceError);
 const {duplicate,fields,closed}=scan;
  if(duplicate) return missedHttp('AMBIGUOUS_EVIDENCE');
  if(!fields || !closed) return missedHttp('ASSERTION_SCALARS_UNAVAILABLE');
  const tags={failureType:"'testCodeFailure'",code:"'ERR_ASSERTION'",name:"'AssertionError'",operator:"'strictEqual'"};
  for(const [key,expected] of Object.entries(tags)) {
    if(!fields.has(key)) return missedHttp('NATIVE_FORMAT_UNSUPPORTED');
    if(fields.get(key)!==expected) return missedHttp('CONFLICTING_EVIDENCE');
  }
  if(!fields.has('actual')||!fields.has('expected')) return missedHttp('ASSERTION_SCALARS_UNAVAILABLE');
  // Only calibrated top-level scalar fields. Nested map/text content is opaque.
  if(fields.get('type')!=="'test'" || !/^\d+(?:\.\d+)?$/.test(fields.get('duration_ms')??'') ||
     !fields.has('location') || fields.get('error')!=='|-' || fields.get('stack')!=='|-' ||
     [...fields.keys()].some(k=>!['duration_ms','type','location','failureType','error','code','name',
       'expected','actual','operator','stack'].includes(k))) return missedHttp('NATIVE_FORMAT_UNSUPPORTED');
  const [actual,expected]=['actual','expected'].map(key=>{
    const scalar=fields.get(key);
    return /^(?:0|[1-9]\d*)$/.test(scalar) ? Number(scalar) : NaN;
  });
  if(!numberIn(actual,100,599)||!Number.isSafeInteger(expected)) return missedHttp('UNSUPPORTED_SCALARS');
  if(actual===200||expected!==200) return missedHttp('CONFLICTING_EVIDENCE');
 return {state:'KNOWN',reason:'TARGET_GET_ASSERTION',throwSequence:sequence,actual,expected};
}

function finiteSample(join,scan,ordinal){
 if(join.reason)return missedCount(join.reason);
 if(scan.rowError(ordinal))return missedCount('SOURCE_UNJOINED');
 if(scan.invalidMarker)return missedCount('MARKER_STREAM_INVALID');
 if(!scan.markers.has(ordinal))return missedCount('MARKER_UNAVAILABLE');
 const value=scan.markers.get(ordinal);
 return value==='UNKNOWN'?missedCount('SNAPSHOT_INVALID'):{value,reason:'JOINED_SNAPSHOT',countSequence:join.returned.sequence};
}

function rawDependentExclusion(projection){
 return projection?.state==='UNKNOWN'&&['AMBIGUOUS_EVIDENCE','TARGET_NATIVE_UNAVAILABLE'].includes(projection.reason);
}

function projectFiniteGet(stdout,facts,ids) {
 requireFact(ids.length===20&&ids[13]===monitorId&&ids[14]===scopeId,'EVIDENCE_CONFLICT');
 const monitor=finiteJournal(facts,ids,14),scope=finiteJournal(facts,ids,15);
 const outside=finiteCandidate(facts,ids,scope);
 const needsEnvelope=rawDependentExclusion(outside);
 const scan=outside&&!needsEnvelope&&monitor.reason&&scope.reason?null:scanFiniteWire(stdout,ids,facts.native);
 const http=needsEnvelope&&scan.unsupportedEnvelope?missedHttp('NATIVE_FORMAT_UNSUPPORTED'):outside??finiteAssertion(scan,facts.firstThrowSequence);
 return {schema:finiteSchema,http,
  afterMonitor:finiteSample(monitor,scan,14),afterScopeMissing:finiteSample(scope,scan,15)};
}


const dropUnknown=()=>({case:'15:firstDROP',site:'UNKNOWN',outer:'UNKNOWN',publicSite:'UNKNOWN'});
function validDrop(d){
  const sites=["S01:247","S00:743","S04:37","S04:43","S01:69","S01:95","UNKNOWN"],outer=["QA_MARKED_STUB_NON_OK","STUB_NON_OK","DEADLINE_OR_ABORT","UNKNOWN"];
  return keyOrder(d,['case','site','outer','publicSite'])&&d.case==='15:firstDROP'&&sites.includes(d.site)&&outer.includes(d.outer)&&sites.includes(d.publicSite)&&
    (d.publicSite==='UNKNOWN'||d.publicSite===d.site&&d.outer==='QA_MARKED_STUB_NON_OK');
}
function dropEligibility(facts,ids){
  const w=facts.witness,n=facts.native;
  if(facts.unknownReason!==null||!['prefix','complete'].includes(w.integrity)||n.integrity!=='prefix'||n.cases.length<14)return null;
  const prior=ids.slice(0,14);
  for(const [i,id] of prior.entries()){
    if(n.cases[i].id!==id||n.cases[i].status!=='pass')return null;
    for(const [j,[operation,edge]] of [['action','enter'],['action','return'],['count','enter'],['count','return']].entries()){
      const e=w.events[4*i+j];
      if(!e||e.id!==id||e.operation!==operation||e.edge!==edge||e.error!==null)return null;
    }
  }
  const entered=w.events[56];
  if(!entered||entered.id!==ids[14]||entered.operation!=='action'||entered.edge!=='enter'||entered.error!==null)return null;
  if(!finiteJournal(facts,ids,15).reason)return 'closed15';
  if(w.integrity==='prefix'&&w.events.length===57&&!w.afterOpen&&w.openCase?.id===ids[14]&&w.openCase.operation==='action'&&n.cases.length===14)return 'open15';
  return null;
}
function projectDrop(stdout,facts,ids){
  const un=dropUnknown(),window=dropEligibility(facts,ids);
  if(!window)return un;
  let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(stdout);}catch{return un;}
  const lines=text.split('\n'),matches=lines.filter(x=>x.includes('C2DW4'));
  if(matches.length!==1||!matches[0].startsWith('# C2DW4 ')||!text.includes(matches[0]+'\n'))return un;
  const scan=scanFiniteWire(stdout,ids,facts.native);if(scan.rowError(window==='closed15'?15:14))return un;
  const at=lines.indexOf(matches[0]),before=lines.findIndex(x=>x.startsWith('# C2SOURCE {"id":"'+ids[13]+'",')),after=lines.findIndex(x=>x.startsWith('# C2SOURCE {"id":"'+ids[14]+'",'));
  if(before<0||before>=at)return un;
  if(window==='closed15'&&at>=after)return un;
  if(window==='open15'&&lines.slice(before+1).some(x=>x.startsWith('# C2SOURCE')))return un;
  const payload=matches[0].slice(8);
  if(Buffer.byteLength(payload)>512)return un;
  try{const d=JSON.parse(payload);return JSON.stringify(d)===payload&&validDrop(d)?d:un;}catch{return un;}
}

const stream = b=>({bytes:b.length,sha256:sha(b)});
export function collectObservation(child,raw,ids) {
  requireFact(Buffer.isBuffer(raw)&&raw.length<=32768,'JOURNAL_INVALID');
  requireFact(Buffer.isBuffer(child.stdout)&&child.stdout.length<=1048576&&
    Buffer.isBuffer(child.stderr)&&child.stderr.length<=65536,'CAPTURE_INVALID');
  const timeout=child.error?.code==='ETIMEDOUT';
  requireFact(timeout||(!child.error&&child.signal===null&&[0,1].includes(child.status)),'CAPTURE_INVALID');
  const known=['SIGTERM','SIGKILL','SIGABRT','SIGSEGV','SIGINT','SIGHUP','SIGPIPE'];
  const signal=child.signal===null?'none':known.includes(child.signal)?child.signal:
    typeof child.signal==='string'?'other':'unavailable';
  const capture={exitCode:numberIn(child.status,0,255)?child.status:null,signal,
    errorKind:timeout?'timeout':'none',stdout:stream(child.stdout),stderr:stream(child.stderr)};
  const fault=[child.stdout,child.stderr].some(b=>/^(?:# )?AFW_C2_GREEN_RECORDER_FAULT$/m.test(b.toString('utf8')));
  const journal={...stream(raw),stable:true,recorderFaultObserved:fault};
  const witness=progress(raw,ids,timeout?'timeout':'normal',fault);
  const native=nativePrefix(child.stdout,ids);
  const reason=fault?'RECORDER_FAULT':({empty:'JOURNAL_EMPTY',torn:'JOURNAL_TORN',ambiguous:'JOURNAL_INVALID_RECORD'}[witness.integrity]??null);
  requireFact(!native.cases.some(n=>n.status==='pass' && witness.events.some(e=>
    e.id===n.id && (e.operation==='action'||e.operation==='count') && e.edge==='throw')),'EVIDENCE_CONFLICT');
  const facts={journal,witness,unknownReason:reason,
    firstThrowSequence:witness.events.find(e=>e.edge==='throw')?.sequence??null,native};
  const finiteGet=projectFiniteGet(child.stdout,facts,ids);
  return {capture,...facts,firstFailure:projectFirstFailure(child.stdout,facts,ids),finiteGet,dropWinner:projectDrop(child.stdout,facts,ids),getWinner:projectGetWinner(child.stdout,facts,ids,finiteGet)};
}
export function encodeBody(value,limit) {
  const text=JSON.stringify(value);
  requireFact(typeof text==='string'&&Buffer.byteLength(text,'utf8')<=limit,'PUBLICATION_INVALID');
  return text;
}
const targetHashes=["02ee98da9239dd28948db664127c579ef69941e5e9c8151b1568527509815210","fc227b59b3b5815eadffbd582f018cbd3e64ceaa596f07bc21a2031f7cd1d6e9","644973221d5dbc3e9bdb87888840c28c370f3b1ed6dff2c89534c4de0e8642f8","7059b9ccc18fccd4da8dff42e9c04c4c7547afef9976852cbefbeef5175504f6","54e2261aac2bbe3d2446d7fa5911f2b921b4d8dc618943abd5d34e3f1125ca4b","5911698fe8de72441d125414f879d725a677dbc26f3c1a40cdcd2999b6d4b40b","f08b914a1e668ad36b4848d0b61cbe8b44dfb3e54bc747480564a8aacc587df4","678fc3c538f2fc29e70c41475794f58e5d690a7c7aae69b1b97ae9309a728b6b","75ff602cecc209575fb967e63469facbbb47ef6335a2a1ccad66710225002046","a615fbc760cd3a6b3a337a4592196d3cd807650df875865f0f8204f2d4d73f80","7c8680d6b86b1ccc0acdcfecb4d8e4312e6d6971f36b00bd6dcf88c289309604","d9895052eb50bf75ca1a14d743fac5c5e4c9b4cf22ae0b6460268f05878f26f7","0db45a29028284a886b7e2f46b4ef0f8834b9cfefdeed2fc026aa72694a7c8e8"];
const fixedPublication={"repository":"tokenizartinfo-ops/agent-friendly-web","baselineSource":"6791ce1bab9372e206d3c7b42b3e1394dc6e0c68","baselineTree":"62e78926635d6b74f288d6c0d69e0f2516306989","sourceIndexBlob":"adf5e3d04562a34718cce9a04ccb480bc70fa694","proposalIndexHash":"86b346adf2a4a73f3c7cf96ad4c2991deacddd9b695dc2365757f97bc79e4153","selectionHash":"fb6ced1bf3690203191d271d268745b86a1fab3cbcb4174d8bec6362ff5a49fd","runAttempt":1,"job":"c2-get-winner-diagnostic1","node":"v22.23.4"};
const allowedReasons=[["JOURNAL_UNRESOLVED","TARGET_NATIVE_UNAVAILABLE","COUNTER_UNAVAILABLE","SOURCE_ROW_UNAVAILABLE","ASSERTION_SCALARS_UNAVAILABLE","UNSUPPORTED_SCALARS","NATIVE_FORMAT_UNSUPPORTED","AMBIGUOUS_EVIDENCE","CONFLICTING_EVIDENCE","TRUNCATED_NATIVE"],["EARLIEST_THROW_DIFFERENT","EARLIER_NATIVE_FAILURE","TARGET_PASSED","NO_QUALIFYING_THROW"]];
const selectionIds=["C2T1_CONNECTION","C2T1_OAUTH","C2T1_HANDLE","C2T1_PROJECTREF","C2T1_SUBJECT","C2T1_PHASE_RENAME","C2T1_SOURCE_BYTES","C2T1_APPROVAL","C2T1_PREDECESSOR","C2T1_GRANT_REVOKED","C2T1_EXTRA_KEY","C2T1_NOTICES","C2T1_MONITOR_COOKIE","C2T1_MONITOR","C2T1_SCOPE_MISSING","C2T1_FINITE","C2T1_SELECTION","C2T1_LOST_ACK_DUPLICATE","C2T1_UNRESOLVED_WRITER","C2T1_OWN_PROMISE"];
function checkFinitePublication(o){
 const f=o.finiteGet,ok=x=>requireFact(x,'PUBLICATION_INVALID');
 ok(keyOrder(f,['schema','http','afterMonitor','afterScopeMissing'])&&f.schema===finiteSchema);
 const h=f.http,monitor=finiteJournal(o,selectionIds,14),scope=finiteJournal(o,selectionIds,15);
 const outside=finiteCandidate(o,selectionIds,scope);
 ok(keyOrder(h,['state','reason','throwSequence','actual','expected']));
 if(outside)ok(same(h,outside)||(rawDependentExclusion(outside)&&same(h,missedHttp('NATIVE_FORMAT_UNSUPPORTED'))));
 else if(h.state==='KNOWN'){
  ok(h.reason==='TARGET_GET_ASSERTION'&&h.throwSequence===o.firstThrowSequence&&numberIn(h.throwSequence,1,128)&&
     numberIn(h.actual,100,599)&&h.actual!==200&&h.expected===200);
 }else{
  ok(h.state==='UNKNOWN'&&allowedReasons[0].includes(h.reason)&&
     !['JOURNAL_UNRESOLVED','COUNTER_UNAVAILABLE','TARGET_NATIVE_UNAVAILABLE'].includes(h.reason)&&
     h.throwSequence===null&&h.actual===null&&h.expected===null);
 }
 const counts=[f.afterMonitor,f.afterScopeMissing],joins=[monitor,scope];
 for(const [i,c] of counts.entries()){
  ok(keyOrder(c,['value','reason','countSequence']));
  const j=joins[i];
  if(j.reason){ok(same(c,missedCount(j.reason)));continue;}
  if(c.value==='UNKNOWN'){
   ok(c.countSequence===null&&['SOURCE_UNJOINED','MARKER_STREAM_INVALID','MARKER_UNAVAILABLE','SNAPSHOT_INVALID'].includes(c.reason));
   if(h.state==='KNOWN')ok(c.reason!=='SOURCE_UNJOINED');
  }else ok(['0','1','2+'].includes(c.value)&&c.reason==='JOINED_SNAPSHOT'&&c.countSequence===j.returned.sequence);
 }
 if(counts.some(c=>c.reason==='MARKER_STREAM_INVALID'))
  ok(counts.every(c=>['MARKER_STREAM_INVALID','JOURNAL_UNRESOLVED','NATIVE_UNJOINED','SOURCE_UNJOINED'].includes(c.reason)));
 // The sample reasons describe a Source-row gate that precedes marker parsing.
 function prefixClaim(sample) {
  if(sample.reason==='SOURCE_UNJOINED')return false;
  if(['JOINED_SNAPSHOT','MARKER_STREAM_INVALID','MARKER_UNAVAILABLE','SNAPSHOT_INVALID'].includes(sample.reason))return true;
  return null;
 }
 const sample14=prefixClaim(f.afterMonitor),sample15=prefixClaim(f.afterScopeMissing);
 let http15=null;
 if(h.state==='KNOWN'||h.reason==='ASSERTION_SCALARS_UNAVAILABLE')http15=true;
 else if(h.reason==='SOURCE_ROW_UNAVAILABLE')http15=false;
 ok(http15===null||sample15===null||http15===sample15);
 if(http15===true||sample15===true)ok(sample14!==false);
 encodeBody(f,512);
}

function publication(context,o) {
  requireFact(Object.entries(fixedPublication).every(([k,v])=>context[k]===v),'PUBLICATION_INVALID');
  requireFact(keyOrder(o,['capture','journal','witness','unknownReason','firstThrowSequence','native','firstFailure','finiteGet','dropWinner','getWinner']),'PUBLICATION_INVALID');
  const f=o.firstFailure;
  requireFact(keyOrder(f,['schema','state','reason','throwSequence','source','assertion']) &&
    f.schema===projectionSchema,'PUBLICATION_INVALID');
  if(f.state==='KNOWN') {
    const r=f.source,a=f.assertion;
    requireFact(f.reason==='TARGET_POST_ASSERTION' && numberIn(f.throwSequence,1,128) &&
      o.firstThrowSequence===f.throwSequence && targetThrow(o.witness.events.find(e=>e.edge==='throw')) &&
      keyOrder(r,sourceKeys) && r.id===targetId && r.status==='fail' && r.phase==='notices' && r.code==='TEST_FAILED' &&
      keyOrder(r.counters,counterKeys) && counterKeys.every(k=>numberIn(r.counters[k],0,3)) &&
      keyOrder(a,['actual','expected']) && a.expected===200 && numberIn(a.actual,100,599) && a.actual!==200,
      'PUBLICATION_INVALID');
  } else {
    const reasons=f.state==='UNKNOWN'?allowedReasons[0]:f.state==='NOT_APPLICABLE'?allowedReasons[1]:[];
    requireFact(reasons.includes(f.reason) && f.throwSequence===null && f.source===null && f.assertion===null,'PUBLICATION_INVALID');
  }
  encodeBody(f,512);
  checkFinitePublication(o);
  requireFact(validDrop(o.dropWinner)&&(dropEligibility(o,selectionIds)!==null||same(o.dropWinner,dropUnknown())),'PUBLICATION_INVALID');
  encodeBody(o.dropWinner,512);
  checkGetPublication(o);encodeBody(o.getWinner,512);
}
export function successPacket(context,custody,beforeSha256,afterSha256,expected,observation) {
  publication(context,observation);
  requireFact(same(expected,targetHashes)&&same(beforeSha256,expected)&&same(afterSha256,expected),'TARGET_DRIFT');
  requireFact(same(context,custody.context),'CUSTODY_INVALID');
  const body={schema:family+'outcome.v1',context,diagnosticCollectionComplete:true,nativeQualification:false,
    sourceReads:{beforeSha256,afterSha256},observation,custody,SourceQualified:false,Task1Pass:false,nonclaims:flags};
  const c=encodeBody(custody,1024), o=encodeBody(body,24576);
  return {custodyLine:markers.custody+' '+c+'\n',outcomeLine:markers.outcome+' '+o+'\n',payload:o+'\n'};
}
export function faultLine(context,phase,reason) {
  const body={schema:family+'fault.v1',context,phase,reason,diagnosticCollectionComplete:false,
    nativeQualification:false,SourceQualified:false,Task1Pass:false,nonclaims:flags};
  return markers.fault+' '+encodeBody(body,2048)+'\n';
}

export function normalizeGetWinner(w,s,h,actual) {
  const unknown={case:'15:firstFiniteGET',winner:'UNKNOWN',stubStatus:'UNKNOWN',qaLastCompleted:'UNKNOWN'};
  if(!Number.isInteger(s)||!Number.isInteger(h)||!Number.isInteger(actual)||h!==actual)return unknown;
  const allowed=w==='L'||w==='V'?h===503&&s===0:w==='S' &&
    (s===0?h===503:s>=400&&s<=599&&h===([400,401,403,404,405,413,429].includes(s)?s:503));
  if(!allowed)return unknown;
  return {case:'15:firstFiniteGET',winner:{L:'DEADLINE_OR_ABORT',S:'STUB_NON_OK',V:'POST_STUB_VALIDATION'}[w],
    stubStatus:w==='S'&&s!==0?s:'UNKNOWN',qaLastCompleted:'UNKNOWN'};
}
const getUnknown=()=>({case:'15:firstFiniteGET',winner:'UNKNOWN',stubStatus:'UNKNOWN',qaLastCompleted:'UNKNOWN'});
function getEligibility(facts,ids,http) {
  if(facts.unknownReason!==null||!['prefix','complete'].includes(facts.witness.integrity)||
    dropEligibility(facts,ids)!=='closed15'||finiteJournal(facts,ids,15).reason||
    facts.native.cases[14]?.status!=='fail')return false;
  const first=facts.witness.events.find(e=>e.edge==='throw');
  return scopeThrow(first)&&http.state==='KNOWN'&&http.reason==='TARGET_GET_ASSERTION'&&http.expected===200&&
    http.throwSequence===first.sequence&&http.throwSequence===facts.firstThrowSequence&&
    Number.isInteger(http.actual)&&http.actual>=100&&http.actual<=599&&http.actual!==200;
}
export function projectGetWinner(stdout,facts,ids,finiteGet) {
  if(!getEligibility(facts,ids,finiteGet.http))return getUnknown();
  const scan=scanFiniteWire(stdout,ids,facts.native);
  if(scan.unsupportedEnvelope||scan.rowError(15)||scan.invalidMarker||!scan.getRaw)return getUnknown();
  const {w,s,h}=scan.getRaw;
  return normalizeGetWinner(w,s,h,finiteGet.http.actual);
}
function checkGetPublication(o) {
  const g=o.getWinner;
  requireFact(keyOrder(g,['case','winner','stubStatus','qaLastCompleted'])&&g.case==='15:firstFiniteGET'&&
    g.qaLastCompleted==='UNKNOWN','PUBLICATION_INVALID');
  if(g.winner==='UNKNOWN'){requireFact(same(g,getUnknown()),'PUBLICATION_INVALID');return;}
  const w={DEADLINE_OR_ABORT:'L',STUB_NON_OK:'S',POST_STUB_VALIDATION:'V'}[g.winner];
  const s=g.stubStatus==='UNKNOWN'?0:g.stubStatus;
  requireFact(getEligibility(o,selectionIds,o.finiteGet.http)&&
    same(g,normalizeGetWinner(w,s,o.finiteGet.http.actual,o.finiteGet.http.actual)),'PUBLICATION_INVALID');
}
