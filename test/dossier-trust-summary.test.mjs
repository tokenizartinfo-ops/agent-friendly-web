import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/dossier-trust-summary.mjs');
const saved={website:'https://example.com',organization:'Example',cms:'WordPress',control:'unknown'};
const base={saved,draft:saved,revision:4,now:Date.parse('2026-10-18T12:00:00Z')};
test('a reviewed suggestion remains a declaration, not verified website data',async()=>{
 const {dossierTrustSummary}=await load();
 const result=dossierTrustSummary({...base,fields:{cms:{revision:3,savedAt:'2026-10-17T12:00:00Z',source:'copilot_reviewed'}}});
 assert.equal(result.items.find(row=>row.field==='cms').kind,'copilot_reviewed');
 assert.equal(result.declarationsVerified,false);
 assert.equal(result.items.some(row=>row.field==='control'),false);
 assert.ok(!JSON.stringify(result).includes('WordPress'));
});
test('changed draft values never inherit a saved attribution',async()=>{
 const {dossierTrustSummary}=await load();
 const result=dossierTrustSummary({...base,draft:{...saved,cms:'Wix'},fields:{cms:{revision:4,savedAt:'2026-10-17T12:00:00Z',source:'copilot_reviewed'}}});
 assert.equal(result.items.find(row=>row.field==='cms').kind,'draft');
 assert.equal(result.items.find(row=>row.field==='cms').savedAt,null);
});
test('invalid or future history cannot label data as saved or reviewed',async()=>{
 const {dossierTrustSummary}=await load();
 for(const metadata of [{revision:9,savedAt:'2026-10-17T12:00:00Z'},{revision:1,savedAt:'invalid'},{revision:1,savedAt:'2027-01-01T00:00:00Z'}]){
  const row=dossierTrustSummary({...base,fields:{cms:{...metadata,source:'copilot_reviewed'}}}).items.find(row=>row.field==='cms');
  assert.equal(row.kind,'owner_declared');assert.equal(row.savedAt,null);
 }
});
test('public observations retain their date and current origin without verifying declarations',async()=>{
 const {dossierTrustSummary}=await load();
 const observation={target:'https://example.com/about',checkedAt:'2026-10-17T12:00:00Z'};
 assert.equal(dossierTrustSummary({...base,observation}).observation.checkedAt,observation.checkedAt);
 for(const extra of [{observation:{...observation,target:'https://other.example'}},{draft:{...saved,website:'https://changed.example'},observation},{observation:{...observation,checkedAt:'invalid'}}])assert.equal(dossierTrustSummary({...base,...extra}).observation,null);
});
