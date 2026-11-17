import assert, { AssertionError } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { count, exactCount, stream, launch, flagsMatch, capturesMatch, exception, boot, diagnostic, bounded } from './startup-diagnostics.mjs';
const bytes=await readFile(new URL('./startup-control-fixtures.json',import.meta.url));
assert.equal(createHash('sha256').update(bytes).digest('hex'),'9d8b538acd4f33f13ccc3959dfa82cc1c89f74ab681fe3f79db458e464fdcc2f');
const {rows}=JSON.parse(bytes);
assert.equal(rows.length,46);
assert.equal(new Set(rows.map(row=>row.id)).size,46);
const root=new URL('file:///synthetic-fixture/');
const value=v=>v===null||v==='absent'?null:v==='empty'?Buffer.alloc(0):v==='abc'?Buffer.from('abc'):
  typeof v==='number'?Buffer.alloc(v):'PRIVATE_SENTINEL';
function makeException(i) {
  const e=i.cls==='AssertionError'?new AssertionError({message:i.msg,actual:1,expected:2,operator:'strictEqual'}):
    i.cls==='TypeError'?new TypeError(i.msg):new Error(i.msg);
  if(i.code!==null)e.code=i.code;
  e.stack='PRIVATE_SENTINEL\n    at fn ('+(i.site==='child'?new URL('native-red-child.mjs',root).href:'file:///private/foreign/native-red-child.mjs')+':59:3)';
  return exception(e,root);
}
function frame(input, bad=false) {
  const ctx={head:'a'.repeat(40),tree:'b'.repeat(40),runId:'100'};
  const pins=Object.fromEntries(['controller','bootstrap','helper','child','sourceIndex','fixtureIndex','startupFixtures'].map(k=>[k,'c'.repeat(40)]));
  const primary=bad?{phase:'red',substep:'FLAGS',reason:'LAUNCH_INVALID'}:input.primary;
  if(bad && input.field==='runId')ctx.runId=input.val;
  if(bad && input.field==='substep')primary.substep=input.val;
  return diagnostic(ctx,pins,primary,bad?'FAILED':input.cleanup,{preflight:1,red:'UNKNOWN'},
    {preflight:null,red:launch({status:1,signal:null,error:{code:'PRIVATE_SENTINEL'},stdout:Buffer.from('PRIVATE_SENTINEL'),stderr:Buffer.alloc(0)})},boot(false,null));
}
for(const {id,unit,input:i,expected:w} of rows) {
  let out;
  switch(unit) {
    case 'boot': out=boot(i.entry,i.term); break;
    case 'exception': out=makeException(i); break;
    case 'assertValues': {
      const e=new AssertionError({message:i.msg,actual:i.actual,expected:i.expected,operator:'strictEqual'});
      const line=i.msg==='AFW_GET_POSITIVE_ACTOR_ARRIVAL'?67:59;
      e.stack='AssertionError\n    at fn ('+new URL('native-red-child.mjs',root).href+':'+line+':3)';
      const mapped=exception(e,root);
      assert(!JSON.stringify(mapped).includes('PRIVATE_SENTINEL'),id);
      assert.deepEqual(boot(true,{state:'REJECTED',error:mapped}),{state:'REJECTED',error:mapped},id);
      out=mapped.values??null; break;
    }
    case 'stream': out=stream(value(i.val),i.limit); break;
    case 'count': out={value:count(i.count),accepted:exactCount(i.count)}; break;
    case 'launch': {
      const v=launch({status:i.status,signal:i.signal,error:i.code===null?undefined:{code:i.code},stdout:value(i.ou),stderr:value(i.er)});
      out={status:v.status,signal:v.signal,error:v.error,flags:flagsMatch(v,41),buffers:capturesMatch(v)}; break;
    }
    case 'frame': {
      const raw=frame(i), v=JSON.parse(raw);
      assert.equal(v.expectedRED,false,id);
      assert.equal(v.SourceQualified,false,id);
      assert.equal(v.Task1Pass,false,id);
      assert.deepEqual(Object.values(v.nonclaims),Array(7).fill(false),id);
      assert.equal(v.schema,'AFW.GET_WINNER.STARTUP_DIAGNOSTIC/1',id);
      assert.equal(v.kind,'PREREQUISITE_FAILURE',id);
      assert(!raw.includes(w.forbidden) && Buffer.byteLength(raw)<=w.maximum,id);
      assert.equal(raw,JSON.stringify(v)+'\n',id);
      assert.deepEqual(v.primary,w.primary,id);
      assert.equal(v.cleanup,w.cleanup,id);
      continue;
    }
    case 'invalidFrame': assert.throws(()=>frame(i,true),/INVALID_TOOL_DIAGNOSTIC/,id); continue;
    case 'byteCap': assert.throws(()=>bounded('x'.repeat(i.len)),/INVALID_TOOL_DIAGNOSTIC/,id); continue;
    default: assert.fail(id);
  }
  assert.deepEqual(out,w,id);
  assert(!JSON.stringify(out).includes('PRIVATE_SENTINEL'),id);
}
console.log('STARTUP_HELPER_CONTROLS_46_OK');
