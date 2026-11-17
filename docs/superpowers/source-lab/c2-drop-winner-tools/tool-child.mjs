import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {initialEntryHarness,resolveDropSite} from './test/fixtures/finite-initial-entry-world.mjs';
import {checkScenario} from './check-scenarios.mjs';
import {exercise} from './model.mjs';
import {nativeControls} from './native-controls.mjs';
import {differential} from './differential.mjs';
const fixture=JSON.parse(await readFile('scenarios-63.json','utf8')),previous=JSON.parse(await readFile('scenarios.json','utf8'));
const selection=JSON.parse(await readFile('selection.json','utf8'));
const result={modelPass:0,modelFailed:null,compiler:'PENDING',distinctSites:[],nativeControls:0,differential:0,unsupported:null};
try{
 assert.deepStrictEqual(fixture.rows.slice(0,59),previous.rows);assert.equal(fixture.rows.length,63);
 for(const [i,row] of fixture.rows.entries()){
   try{await checkScenario(fixture.defaults,row,exercise);result.modelPass++;}catch{result.modelFailed=i+1;throw Error('MODEL');}
 }
 result.differential=differential(selection.selected);
 const measured=await initialEntryHarness('first-connection-publication',{coupledStages:true,dropCompilerOnly:true});
 assert.ok(measured.realNamespace&&measured.sameBytes&&measured.residentMatch,'COMPILER');
 result.distinctSites=measured.sites.usable.map(s=>s.label);
 assert.ok(new Set(result.distinctSites).size>=2,'COMPILER');
 for(const site of measured.sites.usable){
   const prep={},b={prep,siblingPrep:prep,realNamespace:true,qa:measured.qaHash,sibling:measured.qaHash,mountedQA:measured.qaHash,m:measured.mHash,mountedM:measured.mHash,sites:measured.sites.usable};
   const pair=[{...site.throw,script:'same-module'},{...site.call,script:'same-module'}];
   assert.equal(resolveDropSite(b,pair),site.label,'COMPILER');
   assert.equal(resolveDropSite(b,[pair[0],{...pair[1],column:pair[1].column+1}]),'UNKNOWN','COMPILER');
   assert.equal(resolveDropSite(b,[pair[0],{...pair[1],script:'foreign'}]),'UNKNOWN','COMPILER');
   assert.equal(resolveDropSite(b,[pair[0]]),'UNKNOWN','COMPILER');
   assert.equal(resolveDropSite(b,[pair[0],pair[0]]),'UNKNOWN','COMPILER');
 }
 result.compiler='PASS';
 result.nativeControls=await nativeControls(fixture);
}catch(e){
 result.unsupported=result.modelPass<63?'MODEL':!result.differential?'DIFFERENTIAL':result.compiler!=='PASS'?'COMPILER':'NATIVE_WIRE';
}
await writeFile('drop-child.json',JSON.stringify(result)+'\n',{flag:'wx',mode:0o600});
