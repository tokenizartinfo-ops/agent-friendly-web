import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile,writeFile } from 'node:fs/promises';
import { modelControls } from './model-get-controls.mjs';
import { factoryModelControls } from './factory-get-model-controls.mjs';
import { ordinaryNativeControls } from './native-get-ordinary-controls.mjs';
const hash=value=>createHash('sha256').update(value).digest('hex');
const schedule=JSON.parse(await readFile('partial-tool-schedule.json','utf8'));
const model=await modelControls(),factory=await factoryModelControls();
const ids=[...model.ids,...factory.ids];
assert.deepEqual(ids,schedule.modelIds);
assert.equal(model.normalization,214);assert.equal(model.coordinates,9);
assert.equal(model.composedHost.length,34);assert.equal(model.boundaryIds.length,4);
assert.equal(factory.ids.length,26);assert.equal(factory.native,false);
assert.equal(model.native,false);assert.equal(model.parentCanonicalReplacementIntegrity,false);
const native=await ordinaryNativeControls();
assert.deepEqual(native.ids,schedule.ordinaryIds);assert.notEqual(native.off.sha256,native.on.sha256);
const result={group:'ordinary-model',modelCount:ids.length,modelIdsSha256:hash(JSON.stringify(ids)),
 nativeLogicalCount:native.ids.length,nativeIdsSha256:hash(JSON.stringify(native.ids)),nativeDispatches:15,
 off:native.off,on:native.on,disposed:true,parentCanonicalReplacementIntegrity:false,SourceQualified:false,Task1Pass:false};
assert.equal(result.modelIdsSha256,schedule.hashes.modelIds);assert.equal(result.nativeIdsSha256,schedule.hashes.ordinaryIds);
const raw=JSON.stringify(result)+'\n';assert(Buffer.byteLength(raw)<=2048);
await writeFile('tool-child.json',raw,{flag:'wx',mode:0o600});
