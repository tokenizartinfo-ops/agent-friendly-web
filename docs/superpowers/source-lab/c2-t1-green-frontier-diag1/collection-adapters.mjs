import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { open, lstat, realpath, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { progress, nativePrefix } from './read-progress.mjs';

const family = 'afw.c2-green20-frontier-diag1-';
export const markers = Object.freeze({
  custody: 'AFW_C2_GREEN20_FRONTIER_DIAG1_CUSTODY',
  outcome: 'AFW_C2_GREEN20_FRONTIER_DIAG1_OUTCOME',
  fault: 'AFW_C2_GREEN20_FRONTIER_DIAG1_FAULT'
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
  return {capture,journal,witness,unknownReason:reason,
    firstThrowSequence:witness.events.find(e=>e.edge==='throw')?.sequence??null,native};
}
export function encodeBody(value,limit) {
  const text=JSON.stringify(value);
  requireFact(typeof text==='string'&&Buffer.byteLength(text,'utf8')<=limit,'PUBLICATION_INVALID');
  return text;
}
export function successPacket(context,custody,beforeSha256,afterSha256,expected,observation) {
  requireFact(expected.length===13&&same(beforeSha256,expected)&&same(afterSha256,expected),'TARGET_DRIFT');
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
