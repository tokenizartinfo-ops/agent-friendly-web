// TEST DATA only. Never import from production, full20, admission or evidence capture.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
const manifestPin={"path":"docs/superpowers/source-lab/c2-get-winner-dependent/test-corpus-transformation.json","mode":"100644","type":"blob","kind":"TEST_ONLY_TRANSFORMATION_MANIFEST","blob":"bd0e668fcf2edb2ebf8d39f62ec0e98aaaba910e","bytes":13144,"sha256":"758b315ca3d70a22d415ac20aafb371adf96ed7d6713b20b8692e70922df0b42","fullReadback":true};
const digest=(name,value)=>createHash(name).update(value).digest('hex');
function match(raw,pin) {
 assert(Buffer.isBuffer(raw));
 assert.equal(raw.length,pin.bytes);assert.equal(digest('sha256',raw),pin.sha256);
 const git=createHash('sha1').update(Buffer.from('blob '+raw.length+'\0')).update(raw).digest('hex');
 assert.equal(git,pin.blob);
}
export function adaptFrozenCorpus(kind,raw,manifestRaw) {
 match(manifestRaw,manifestPin);
 const manifest=JSON.parse(manifestRaw.toString('utf8'));
 const spec=manifest.corpora.find(c=>c.kind===kind);
 assert(spec);match(raw,spec.input);
 const data=JSON.parse(raw.toString('utf8'));
 const beforeExpected=kind==='host'?JSON.stringify(data.rows.map(r=>r.expected)):null;
 if(kind==='host')assert.deepEqual(data.rows.map(r=>r.id),spec.rowIds);
 for(const op of spec.operations) {
  let parent=data;
  for(const key of op.path.slice(0,-1)){assert(Object.hasOwn(parent,key));parent=parent[key];}
  const key=op.path.at(-1);assert(Object.hasOwn(parent,key));assert.deepEqual(parent[key],op.before);
  parent[key]={...op.after};
 }
 if(kind==='host')assert.equal(JSON.stringify(data.rows.map(r=>r.expected)),beforeExpected);
 const output=Buffer.from(JSON.stringify(data)+'\n');match(output,spec.output);
 return output;
}
