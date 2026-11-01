import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
import {build} from 'esbuild';
test('actual v2 publication build produces bounded wrapper with exact sibling module imports',async()=>{
 const workflow=await readFile('.github/workflows/afw-qa-closed-observation-v2-qualification.yml','utf8');
 const match=workflow.match(/^          const built=await build\((\{[^\n]+\})\);$/m);assert.ok(match,'single actual workflow build options');assert.ok(match[1].length<=2048);
 const options=runInNewContext('('+match[1]+')',Object.create(null),{timeout:100}),built=await build(options),outputs=Object.values(built.metafile.outputs);
 const code=built.outputFiles[0].text,metadata={bytes:Buffer.byteLength(code),imports:outputs[0]?.imports,exports:outputs[0]?.exports};
 console.log('CLOSED_QUIESCENCE_V2_BUILD_BOUNDARY',JSON.stringify(metadata));
 assert.equal(outputs.length,1);
 assert.ok(!Object.keys(built.metafile.inputs).some(p=>/mcp-qa-(?:arm-eligibility|generation-ledger|generation-preparation|arm-observation)\.mjs$/.test(p)),'v2 bundle does not import ARM consumers or v1 observer');assert.ok(metadata.bytes<=131072,'fixed small-wrapper byte cap');
 assert.ok(metadata.imports.every(x=>x.external),'no unresolved/internal module');
 assert.deepEqual([...new Set(metadata.imports.map(x=>x.path))].sort(),['./closed-rollback.mjs','./closed-observation-context-v2.mjs','node:crypto'].sort(),'actual emitted imports must resolve as the three uploaded sibling modules');
 assert.deepEqual([...metadata.exports].sort(),['IndependentClosure','PrivateQaBootstrap','PrivateQaNamedConfirmation','PrivateQaPreregistration','default'].sort());
});
