import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { open, lstat, realpath, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { progress, nativePrefix } from './read-progress.mjs';

const family = 'afw.c2-first-failure-post-diag2-';
export const markers = Object.freeze({
  custody: 'AFW_C2_FIRST_FAILURE_POST_DIAG2_CUSTODY',
  outcome: 'AFW_C2_FIRST_FAILURE_POST_DIAG2_OUTCOME',
  fault: 'AFW_C2_FIRST_FAILURE_POST_DIAG2_FAULT'
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
  return {capture,...facts,firstFailure:projectFirstFailure(child.stdout,facts,ids)};
}
export function encodeBody(value,limit) {
  const text=JSON.stringify(value);
  requireFact(typeof text==='string'&&Buffer.byteLength(text,'utf8')<=limit,'PUBLICATION_INVALID');
  return text;
}
const targetHashes=["02ee98da9239dd28948db664127c579ef69941e5e9c8151b1568527509815210","fc227b59b3b5815eadffbd582f018cbd3e64ceaa596f07bc21a2031f7cd1d6e9","644973221d5dbc3e9bdb87888840c28c370f3b1ed6dff2c89534c4de0e8642f8","7059b9ccc18fccd4da8dff42e9c04c4c7547afef9976852cbefbeef5175504f6","54e2261aac2bbe3d2446d7fa5911f2b921b4d8dc618943abd5d34e3f1125ca4b","5911698fe8de72441d125414f879d725a677dbc26f3c1a40cdcd2999b6d4b40b","f08b914a1e668ad36b4848d0b61cbe8b44dfb3e54bc747480564a8aacc587df4","678fc3c538f2fc29e70c41475794f58e5d690a7c7aae69b1b97ae9309a728b6b","ac74be106ec36a0dd093cfb542ba2e8dd2220ae89c8c49879b20c1910bbcb71e","2dc335761ac7f168532af37fd4128d2fc8b15c9b5b3072f377a9913e7b93829d","cbff758701ae58c915efdc2489f6b770b0f22224cedfc73fcfd28df026e1b8fa","d9895052eb50bf75ca1a14d743fac5c5e4c9b4cf22ae0b6460268f05878f26f7","0db45a29028284a886b7e2f46b4ef0f8834b9cfefdeed2fc026aa72694a7c8e8"];
const fixedPublication={"repository":"tokenizartinfo-ops/agent-friendly-web","baselineSource":"6791ce1bab9372e206d3c7b42b3e1394dc6e0c68","baselineTree":"62e78926635d6b74f288d6c0d69e0f2516306989","sourceIndexBlob":"e2ca46e8ecf98dd0d87f148068dd240b147db1ec","proposalIndexHash":"87049774b9728c99aa85c6a1d3eea5a16dc6e3412dea9f41a0cca984ee5325d7","selectionHash":"b1f3468699c1a8d5ed22fe3b618727ae549ba1634859356e43ec82f941e27afc","runAttempt":1,"job":"c2-first-failure-post-diag2","node":"v22.23.4"};
const allowedReasons=[["JOURNAL_UNRESOLVED","TARGET_NATIVE_UNAVAILABLE","COUNTER_UNAVAILABLE","SOURCE_ROW_UNAVAILABLE","ASSERTION_SCALARS_UNAVAILABLE","UNSUPPORTED_SCALARS","NATIVE_FORMAT_UNSUPPORTED","AMBIGUOUS_EVIDENCE","CONFLICTING_EVIDENCE","TRUNCATED_NATIVE"],["EARLIEST_THROW_DIFFERENT","EARLIER_NATIVE_FAILURE","TARGET_PASSED","NO_QUALIFYING_THROW"]];
function publication(context,o) {
  requireFact(Object.entries(fixedPublication).every(([k,v])=>context[k]===v),'PUBLICATION_INVALID');
  requireFact(keyOrder(o,['capture','journal','witness','unknownReason','firstThrowSequence','native','firstFailure']),'PUBLICATION_INVALID');
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
