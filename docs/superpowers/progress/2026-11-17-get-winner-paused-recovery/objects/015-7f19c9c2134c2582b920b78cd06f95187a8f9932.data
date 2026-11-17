import { AssertionError } from 'node:assert';
import { createHash } from 'node:crypto';

const unknown = 'UNKNOWN';
const allowedCodes = ['ERR_MODULE_NOT_FOUND','ERR_PACKAGE_PATH_NOT_EXPORTED','ERR_REQUIRE_ESM','ERR_ASSERTION','ERR_INVALID_ARG_TYPE','ERR_INVALID_URL','ENOENT','EACCES','EPERM','ENOBUFS','ETIMEDOUT','ENOMEM','EAGAIN'];
const signals = ['SIGTERM','SIGKILL','SIGABRT','SIGSEGV','SIGINT','SIGPIPE'];
const classes = ['AssertionError','TypeError','RangeError','SyntaxError','Error',unknown];
const assertions = ['AFW_GET_POSITIVE_ROUTE_STATUS','AFW_GET_ORIGINAL_PENDING_HEADERS','AFW_GET_ORIGINAL_PENDING_BODY','AFW_GET_POSITIVE_ACTOR_ARRIVAL','AFW_GET_WINNER_EXPECTED_MARKER','AFW_GET_BASELINE_UNEXPECTED_MARKER'];
const files = {'native-red-child.mjs':'CHILD','startup-bootstrap.mjs':'BOOTSTRAP','test/fixtures/finite-first-connection-publication.mjs':'CANDIDATE'};
const steps = ['ADMISSION','MATERIALIZE','BEFORE_PROBES','BUDGET','SPAWN','AFTER_PROBES','FRESH_COUNT','FLAGS','CAPTURE','PREFLIGHT_RECEIPT','BOOTSTRAP','TARGET_READBACK','CHILD_RECEIPT','PUBLISH'];
const reasons = {admission:['ADMISSION_INVALID'],materialize:['MATERIALIZATION_INVALID','TARGET_DRIFT'],preflight:['PREFLIGHT_INVALID','CUSTODY_INVALID'],red:['LAUNCH_INVALID','CUSTODY_INVALID','CAPTURE_INVALID'],publish:['PUBLICATION_INVALID']};
const pinKeys = ['controller','bootstrap','helper','child','sourceIndex','fixtureIndex','startupFixtures'];
export const job = 'c2-get-winner-tools';
export const claims = {historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
const keys = (v,names) => !!v && typeof v==='object' && JSON.stringify(Object.keys(v))===JSON.stringify(names);
const num = (v,a,b) => Number.isSafeInteger(v) && v>=a && v<=b;
const known = (v,set) => v==null?'NONE':set.includes(v)?v:'OTHER';
const insist = v => { if (!v) throw Error('INVALID_TOOL_DIAGNOSTIC'); };
export const count = n => num(n,0,8)?n:unknown;
export const exactCount = n => n===1;

export function stream(v,cap) {
  const buffer=Buffer.isBuffer(v), present=v!=null, size=buffer?v.length:unknown;
  const withinCap=buffer && size<=cap;
  return {present,type:buffer?'BUFFER':present?'OTHER':'ABSENT',bytes:size,withinCap,
    sha256:withinCap?createHash('sha256').update(v).digest('hex'):unknown};
}
export function launch(child) {
  const status = child.status===null?null:num(child.status,-2147483648,2147483647)?child.status:unknown;
  return {status,signal:child.signal===undefined?unknown:known(child.signal,signals),
    error:child.error==null?'NONE':allowedCodes.includes(child.error.code)?child.error.code:'OTHER',
    stdout:stream(child.stdout,1048576),stderr:stream(child.stderr,65536)};
}
export const flagsMatch = (v,exit) => v.status===exit && v.signal==='NONE' && v.error==='NONE';
export const capturesMatch = v => v.stdout.withinCap && v.stderr.withinCap;

function site(stack,root) {
  if(typeof stack!=='string'||stack.length>32768)return unknown;
  const frame=stack.split('\n').find(s=>/^    at /.test(s));
  if(!frame)return unknown;
  for(const [file,token] of Object.entries(files)) {
    const url=new URL(file,root).href;
    const loc=/^(?:    at (?:.* \()?)(file:\/\/[^()\s]+):([1-9]\d{0,5}):([1-9]\d{0,5})\)?$/.exec(frame);
    if(loc && loc[1]===url)return {file:token,line:Number(loc[2]),column:Number(loc[3])};
  }
  return unknown;
}
export function exception(error,root) {
  try {
    const kind=error instanceof AssertionError?'AssertionError':error instanceof TypeError?'TypeError':error instanceof RangeError?'RangeError':error instanceof SyntaxError?'SyntaxError':error instanceof Error?'Error':unknown;
    const code=known(error?.code,allowedCodes);
    const message=typeof error?.message==='string'?error.message.split('\n',1)[0]:null;
    const e={kind,code,assertion:kind==='AssertionError' && code==='ERR_ASSERTION' && assertions.includes(message)?message:unknown,site:site(error?.stack,root)};
    if(e.kind==='AssertionError' && e.code==='ERR_ASSERTION' && e.site?.file==='CHILD' &&
        ['AFW_GET_POSITIVE_ROUTE_STATUS','AFW_GET_POSITIVE_ACTOR_ARRIVAL'].includes(e.assertion)) {
      const values={actual:error.actual,expected:error.expected};
      if(allowedValues(e,values))e.values=values;
    }
    return e;
  } catch { return {kind:unknown,code:'OTHER',assertion:unknown,site:unknown}; }
}
function allowedValues(e,v) {
  if(!keys(v,['actual','expected']) || e.kind!=='AssertionError' || e.code!=='ERR_ASSERTION' || e.site?.file!=='CHILD')return false;
  if(e.assertion==='AFW_GET_POSITIVE_ROUTE_STATUS' && e.site.line===59)
    return num(v.actual,100,599) && v.expected===413;
  return e.assertion==='AFW_GET_POSITIVE_ACTOR_ARRIVAL' && e.site.line===67 &&
    typeof v.actual==='boolean' && typeof v.expected==='boolean';
}
function safeException(e) {
  return (keys(e,['kind','code','assertion','site']) || (keys(e,['kind','code','assertion','site','values']) && allowedValues(e,e.values))) && classes.includes(e.kind) &&
    [...allowedCodes,'NONE','OTHER'].includes(e.code) && (e.assertion===unknown || (e.kind==='AssertionError' &&
      e.code==='ERR_ASSERTION' && assertions.includes(e.assertion))) &&
    (e.site===unknown || (keys(e.site,['file','line','column']) && Object.values(files).includes(e.site.file) &&
      num(e.site.line,1,999999) && num(e.site.column,1,999999)));
}
export function boot(entry,term) {
  const result=state=>({state,error:null});
  if(entry===false && term===null)return result('MISSING');
  if(entry===true && term===null)return result('ENTERED');
  if(entry===true && keys(term,['state','error'])) {
    if(term.state==='FULFILLED' && term.error===null)return result('FULFILLED');
    if(term.state==='REJECTED' && safeException(term.error))return {state:'REJECTED',error:term.error};
  }
  return result('MALFORMED');
}
function safeStream(v,limit) {
  if(!keys(v,['present','type','bytes','withinCap','sha256']))return false;
  if(v.type==='BUFFER')return v.present===true && num(v.bytes,0,Number.MAX_SAFE_INTEGER) &&
    v.withinCap===(v.bytes<=limit) && (v.withinCap?/^[a-f0-9]{64}$/.test(v.sha256):v.sha256===unknown);
  return ['ABSENT','OTHER'].includes(v.type) && v.present===(v.type==='OTHER') && v.bytes===unknown && v.withinCap===false && v.sha256===unknown;
}
function safeLaunch(v) {
  return v===null || (keys(v,['status','signal','error','stdout','stderr']) &&
    (v.status===null||v.status===unknown||num(v.status,-2147483648,2147483647)) &&
    [...signals,'OTHER','NONE',unknown].includes(v.signal) && [...allowedCodes,'OTHER','NONE'].includes(v.error) &&
    safeStream(v.stdout,1048576) && safeStream(v.stderr,65536));
}
export function bounded(text) { insist(Buffer.byteLength(text)<=4096); return text; }
export function diagnostic(context,pins,primary,cleanup,counts,children,bootstrap) {
  insist(keys(context,['head','tree','runId']) && /^[a-f0-9]{40}$/.test(context.head) && /^[a-f0-9]{40}$/.test(context.tree) && typeof context.runId==='string' && /^[1-9][0-9]{0,19}$/.test(context.runId));
  insist(keys(pins,pinKeys) && pinKeys.every(k=>typeof pins[k]==='string' && /^[a-f0-9]{40}$/.test(pins[k])));
  insist(primary===null || (keys(primary,['phase','substep','reason']) && Object.hasOwn(reasons,primary.phase) && reasons[primary.phase].includes(primary.reason) && steps.includes(primary.substep)));
  insist(['NOT_CREATED','REMOVED','FAILED'].includes(cleanup) && (primary!==null || cleanup==='FAILED'));
  insist(keys(counts,['preflight','red']) && Object.values(counts).every(n=>n===unknown || num(n,0,8)));
  insist(keys(children,['preflight','red']) && Object.values(children).every(safeLaunch));
  insist(keys(bootstrap,['state','error']) && (bootstrap.state==='REJECTED'?safeException(bootstrap.error):
    ['MISSING','MALFORMED','ENTERED','FULFILLED'].includes(bootstrap.state) && bootstrap.error===null));
  return bounded(JSON.stringify({schema:'AFW.GET_WINNER.STARTUP_DIAGNOSTIC/1',kind:'PREREQUISITE_FAILURE',...context,attempt:1,job,pins,primary,cleanup,counts,children,bootstrap,expectedRED:false,SourceQualified:false,Task1Pass:false,nonclaims:claims})+'\n');
}
