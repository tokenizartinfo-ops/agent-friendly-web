import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/dossier-date.mjs');
const instant='2026-09-30T20:31:41.302Z';
test('dossier dates display an unambiguous local hour with seconds and zone',async()=>{
 const {formatDossierDate}=await load();
 for(const locale of ['es','en','pt']){
  assert.match(formatDossierDate(instant,locale,'America/Argentina/Buenos_Aires'),/17:31:41/);
  assert.match(formatDossierDate(instant,locale,'UTC'),/20:31:41/);
  assert.match(formatDossierDate(instant,locale,'UTC'),/UTC/);
 }
});
test('midnight is zero hours and invalid dates do not become evidence',async()=>{
 const {formatDossierDate}=await load();
 assert.match(formatDossierDate('2026-10-18T00:00:00Z','es','UTC'),/00:00:00/);
 for(const value of ['',null,undefined,'not a date'])assert.equal(formatDossierDate(value,'es','UTC'),'');
});
