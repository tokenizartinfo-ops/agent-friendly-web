import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import {createHash} from 'node:crypto';
import {gzipSync,gunzipSync} from 'node:zlib';
import {execFileSync} from 'node:child_process';
import {posix} from 'node:path';
try{
const e=process.env,sha=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
assert.equal(process.versions.node,'22.23.4');
assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_EVENT_NAME,'push');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(e.GITHUB_JOB,'readonly');
assert.equal(e.GITHUB_WORKFLOW_REF,'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101');
for(const key of ['NODE_OPTIONS','NODE_PATH','AFW_SYN_CHECKPOINT_KEY','AFW_BUDGET_DIAGNOSTIC_CANDIDATE'])assert.equal(e[key],undefined);
assert.match(e.GITHUB_SHA,/^[a-f0-9]{40}$/);assert.match(e.GITHUB_RUN_ID,/^[1-9][0-9]{0,19}$/);
const git=(...args)=>execFileSync('git',args,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(git('rev-parse','--show-toplevel'),fs.realpathSync('.'));assert.equal(process.cwd(),fs.realpathSync('.'));
assert.equal(git('log','-1','--format=%B'), 'AFW-Q1-SERIAL-LAB-V2-FIX4-ONEUSE-20261115');
const sourceTree=git('rev-parse','HEAD^{tree}');assert.match(sourceTree,/^[a-f0-9]{40}$/);
const same='docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md',f7='.github/workflows/afw-finite-budget-qualification.yml';
const tree=execFileSync('git',['ls-tree','-rz','--full-tree','HEAD'],{stdio:['ignore','pipe','pipe']});
const rows=tree.toString('utf8').split('\0').filter(Boolean).map(x=>{const at=x.indexOf('\t');assert(at>0);return{tuple:x.slice(0,at),path:x.slice(at+1)};}).filter(x=>![same,f7].includes(x.path)).sort((a,b)=>Buffer.compare(Buffer.from(a.path),Buffer.from(b.path)));
const core=Buffer.from(rows.map(x=>x.tuple+'\t'+x.path+'\0').join(''));assert.equal(rows.length,3201);assert.equal(core.length,324448);assert.equal(sha(core),'aefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703');execFileSync('git',['diff','--exit-code','HEAD','--'],{stdio:['ignore','pipe','pipe']});
const st=fs.lstatSync(same);assert(st.isFile()&&!st.isSymbolicLink()&&st.size<=2600000);const bytes=fs.readFileSync(same);assert.equal(blob(bytes),git('rev-parse','HEAD:'+same));
const fix1Prefix=bytes.subarray(0,2540300);assert.equal(fix1Prefix.length,2540300);assert.equal(sha(fix1Prefix),'3ceabc9462376ccfd94b8a368e1e66b1f229e652a402d93cd87d81dfeb45a18f');assert.equal(blob(fix1Prefix),'f4da9e3c3d000ca0e64674f83e7c54ff9306d389');
 const prefix=bytes.subarray(0,2260109);assert.equal(prefix.length,2260109);assert.equal(sha(prefix),'9b49c2699725fa9148202d046bc3f050d151313061eae17bfa67494559476421');assert.equal(blob(prefix),'71fabddb7fcee9f436ce3ea95785c3a2ee5afe70');
 const text=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes),begin='<!-- AFW-R3-DELIVERY-SUCCESSOR-R5-DATA-V1:BEGIN -->',end='<!-- AFW-R3-DELIVERY-SUCCESSOR-R5-DATA-V1:END -->';assert.equal(text.split(begin).length,2);assert.equal(text.split(end).length,2);const first=text.indexOf(begin),last=text.indexOf(end);assert(last>first&&Buffer.byteLength(text.slice(0,first))>=prefix.length);
 const section=text.slice(first+begin.length,last);assert.match(section,/^\n[A-Za-z0-9+/=\n]+\n$/);const b64=section.replaceAll('\n',''),pins={"bytes":487208,"sha256":"087bba2182c131579e233f6c29daf1ee85e2aae41e77b66d6f93cc44cb5000c5","blob":"f9c8261c54f761b5c33ddc370dbe7b308648033b","compressed":{"bytes":120211,"sha256":"7e9aace1b1a3930a1a5234a2fdee5af68ebec77cc5b9818a6d342328047bf0e5","blob":"b3dfc078047bee03b5b42140783ee1dcf2409fd8"},"base64Characters":160284};assert.equal(b64.length,pins.base64Characters);assert(b64.length<=174764);const zip=Buffer.from(b64,'base64');assert.equal(zip.toString('base64'),b64);assert.equal(zip.length,pins.compressed.bytes);assert(zip.length<=131072);assert.equal(sha(zip),pins.compressed.sha256);assert.equal(blob(zip),pins.compressed.blob);
 const raw=gunzipSync(zip,{maxOutputLength:524288});assert.equal(raw.length,pins.bytes);assert.equal(sha(raw),pins.sha256);assert.equal(blob(raw),pins.blob);const carrierJson=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(raw),payload=JSON.parse(carrierJson);assert.equal(JSON.stringify(payload),carrierJson);
 // Closed captured-original-creator continuity derivation; no caller patch/path/code.
 const ccPrefix=bytes.subarray(0,2471214);assert.equal(ccPrefix.length,2471214);assert.equal(sha(ccPrefix),'1ba61ebb62514c1bb2e5b7b6058dd5abad09ddc1d059483987262032e154928a');assert.equal(blob(ccPrefix),'2fcd79c7d0a2475f176dc03360df5980a58c3120');
 const ccSuffix=bytes.subarray(2471214,2481826);assert.equal(ccSuffix.length,10612);assert.equal(sha(ccSuffix),'cdfe4a0b495be82b9d2746a12f09a3cb24c100f940bb6cdbecaa0585f8a7fac5');
 const ccBegin='<!-- AFW-CREATOR-CONTINUITY-DATA-V1:BEGIN -->',ccEnd='<!-- AFW-CREATOR-CONTINUITY-DATA-V1:END -->';assert.equal(text.split(ccBegin).length,2);assert.equal(text.split(ccEnd).length,2);const ccFirst=text.indexOf(ccBegin),ccLast=text.indexOf(ccEnd);assert(ccLast>ccFirst&&Buffer.byteLength(text.slice(0,ccFirst))>=2471214);const ccOverlayText=text.slice(ccFirst+ccBegin.length,ccLast);assert.equal(sha(Buffer.from(ccOverlayText)),'a7e62d0ce31a094090c6b1524f34cc55b776a4938010a5ec1c310ca4ac6b712f');
 const ccOldKernel=payload.helpers['lifetime.py'];assert.equal(sha(Buffer.from(ccOldKernel)),'ae23b6e242cb41d3978b391c3bde1095ee7e0c0c717db98a598fe8fd9dcb2a27');assert.equal(ccOldKernel.split(" # AFW_LIFE_BEFORE_ARM\n").length,2);payload.helpers['lifetime.py']=ccOldKernel.replace(" # AFW_LIFE_BEFORE_ARM\n"," # AFW_LIFE_BEFORE_ARM\n if os.getppid()!=before[0]:raise CreatorDead()\n");
 const ccKernelPin=JSON.parse(ccOverlayText).kernelSnapshot;assert.deepEqual(Object.keys(ccKernelPin),['bytes','sha256','zipBytes','zipSha256','data','cap']);assert.equal(ccKernelPin.bytes,16073);assert.equal(ccKernelPin.cap,32768);assert.equal(ccKernelPin.sha256,'f2b319e2a98a0959e421e80d7f94662476508f2ae6bc7cff2f9c6f8f0e17a791');assert.equal(ccKernelPin.zipBytes,5078);assert.equal(ccKernelPin.zipSha256,'f0ef8e96c2f15251fbdbcb0abe801cbb981f5c97663233a0cae0520b261f29ed');assert.equal(sha(Buffer.from(ccKernelPin.data)),'1ba509cdcd9ecda3ae60b3db8f5876e1ddf17f5f9692bff77f113cef3e6356ef');const ccKernelZip=Buffer.from(ccKernelPin.data,'base64');assert.equal(ccKernelZip.toString('base64'),ccKernelPin.data);assert.equal(ccKernelZip.length,ccKernelPin.zipBytes);assert.equal(sha(ccKernelZip),ccKernelPin.zipSha256);assert.equal(gunzipSync(ccKernelZip,{maxOutputLength:32768}).toString('utf8'),payload.helpers['lifetime.py']);
 for(const name of ['delivery-entry.sh','controls-entry.sh','missing-cwd-entry.sh']){const prior=payload.helpers[name],lines=prior.split('\n').filter(line=>line.startsWith('_r3_kernel='));assert.equal(lines.length,1);const oldPin=JSON.parse(lines[0].slice('_r3_kernel='.length));assert.equal(oldPin.bytes,16025);assert.equal(oldPin.sha256,'ae23b6e242cb41d3978b391c3bde1095ee7e0c0c717db98a598fe8fd9dcb2a27');payload.helpers[name]=prior.replace(lines[0],'_r3_kernel='+JSON.stringify(ccKernelPin));}
 const ccResult=Buffer.from(JSON.stringify(payload));assert.equal(ccResult.length,487293);assert.equal(sha(ccResult),'dda3f25ef82cdf4e65814360b52aafa9ddf3ec2e57d1fa2f92e46466acfcd25b');assert.equal(blob(ccResult),'f23fcfebf3c72632327cf24babf2ff7ace22dae6');
const normal=JSON.parse(JSON.stringify(payload));
  const serialPrefix=bytes.subarray(0,2514447);
  assert.equal(serialPrefix.length,2514447);assert.equal(sha(serialPrefix),'ae7a7ed3d0cbd38149bfd284eaeb458fc696bede38976f509a801c40ced1b770');assert.equal(blob(serialPrefix),'af9eee4beb70ea89fef675cfc5bb99ec10811fc4');
  const serialAppend=bytes.subarray(2514447,2538602);assert.equal(serialAppend.length,24155);assert.equal(sha(serialAppend),'48e15b75dfdd3221681f262de02a462cf0edf43b6010264310cfa7180858438f');
  const serialBegin='<!-- AFW-SERIAL-ENTRY-PIN-DATA-V1:BEGIN -->',serialEnd='<!-- AFW-SERIAL-ENTRY-PIN-DATA-V1:END -->';assert.equal(text.split(serialBegin).length,2);assert.equal(text.split(serialEnd).length,2);
  const serialText=text.slice(text.indexOf(serialBegin)+serialBegin.length,text.indexOf(serialEnd));
  assert.equal(sha(Buffer.from(serialText)),'07567d1647505cbf671675f87b874b6afc0b18b5a9cbaa445496b1a9e69df20b');
  const serial=JSON.parse(serialText);assert.equal('\n'+JSON.stringify(serial)+'\n',serialText);
  assert.deepEqual(Object.keys(serial),['purpose','closedParent','closedTree','origin','baselinePrefix','normalHistory','overlay','unit','unitSchema','oneUseMessage','nonclaims']);
  assert.equal(serial.purpose,'afw.serial-entry-pin.append.v1');assert.equal(serial.closedParent,'3f23a9805a60d285a6272138765078e7da80e5eb');assert.equal(serial.closedTree,'a8c002728663bdcf67a6bc59d5c5f1232cb6384c');
  const serialOverlay=serial.overlay;assert.deepEqual(Object.keys(serialOverlay),['purpose','normalRaw','normalControls','candidateControls','span','candidateRaw','nonclaims']);assert.equal(serialOverlay.purpose,'afw.serial-entry-pin.overlay.v1');
  assert.deepEqual(Object.keys(serialOverlay.span),['from','to']);
  const serialOld=payload.helpers['controls.mjs'];assert.equal(sha(Buffer.from(serialOld)),'060c5b493d3c832efb057e786ccb622adfef0c14233cf5e394b053485981e7df');assert.equal(serialOld.split(serialOverlay.span.from).length,2);
  payload.helpers['controls.mjs']=serialOld.replace(serialOverlay.span.from,serialOverlay.span.to);
  const serialControls=Buffer.from(payload.helpers['controls.mjs']);assert.equal(serialControls.length,32428);assert.equal(sha(serialControls),'3c8b4e694154f6162b70d63d7e1d3de7c417a675db4a2e87880f2d964eca8c35');assert.equal(blob(serialControls),'17e101dd8720312111b7dffb37f7edb8da41a0fd');
  const serialResult=Buffer.from(JSON.stringify(payload));assert.equal(serialResult.length,487931);assert.equal(sha(serialResult),'f5fe1b3ecc0054ba1ce626c9140fc5899f4b35d0e8544181eb2606771b7220f8');assert.equal(blob(serialResult),'2716e7224ddee98690f457d0c48e6d096bd17024');

const candidate=payload;
assert.deepEqual(Object.keys(serial.unit),['blob','bytes','sha256','kind','cap','code']);assert.equal(serial.unit.cap,32768);assert.equal(serial.unit.kind,'github-only-unit');
assert.equal(Buffer.byteLength(serial.unit.code),17454);assert.equal(serial.unit.bytes,17454);assert.equal(sha(serial.unit.code),'1ad51c019123e57d6a663921337f91a6cdd667798f04bafd3e3230b78c181039');assert.equal(blob(Buffer.from(serial.unit.code)),'c8ab01ecb2e569fd8908c8edc22a630664c08ee7');assert(serial.unit.bytes<=32768);
assert.deepEqual(Object.keys(serial.unitSchema),['blob','bytes','sha256','kind','cap','schema']);assert.equal(serial.unitSchema.cap,32768);
const schemaText=JSON.stringify(serial.unitSchema.schema);assert.equal(Buffer.byteLength(schemaText),1927);assert.equal(sha(schemaText),'4ccead174e6782f89072083ca06c15966d6c4ce0ef4e13625f393964c433320e');assert.equal(blob(Buffer.from(schemaText)),'300a3d8739532f8fbb67bd97480ee0fd366f835e');
const unit=await import('data:text/javascript;base64,'+Buffer.from(serial.unit.code).toString('base64'));
assert.deepEqual(Object.keys(unit),['serialPinUnit']);
const unitFrame=unit.serialPinUnit({assert,createHash,gzipSync,posix,normal,candidate,source:e.GITHUB_SHA,sourceTree,run:e.GITHUB_RUN_ID});
assert.equal(typeof unitFrame,'string');assert(Buffer.byteLength(unitFrame)<=2048);assert(/^[\x00-\x7f]*$/.test(unitFrame));assert.equal(unitFrame.split('\n').length,2);assert(unitFrame.endsWith('\n'));
const frame='AFW_SERIAL_ENTRY_PIN_UNIT/1 ';assert(unitFrame.startsWith(frame));
const data=JSON.parse(unitFrame.slice(frame.length));assert.equal(frame+JSON.stringify(data)+'\n',unitFrame);
function validate(value,schema){
 if(Object.hasOwn(schema,'const')){assert.deepEqual(value,schema.const);return;}
 if(schema.type==='object'){assert(value&&typeof value==='object'&&!Array.isArray(value));assert.equal(schema.additionalProperties,false);assert.deepEqual(Object.keys(value),schema.required);assert.deepEqual(Object.keys(schema.properties),schema.required);for(const key of schema.required)validate(value[key],schema.properties[key]);return;}
 assert.equal(schema.type,'string');assert.equal(typeof value,'string');assert(new RegExp(schema.pattern).test(value));
}
validate(data,serial.unitSchema.schema);
assert.equal(data.source,e.GITHUB_SHA);assert.equal(data.sourceTree,sourceTree);assert.equal(data.run,e.GITHUB_RUN_ID);
process.stdout.write(unitFrame);

}catch{process.exitCode=1;}
