import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {execFileSync} from 'node:child_process';
let r3BootstrapAdmitted=false;
try{
 const e=process.env,sha=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
 const git=(...args)=>execFileSync('git',args,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
 const same='docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md',f7='.github/workflows/afw-finite-budget-qualification.yml';
 const image=fs.fstatSync(3),current=fs.statSync('/proc/self/exe');assert(image.isFile()&&image.uid===process.getuid()&&image.nlink===1&&(image.mode&0o7777)===0o500&&image.dev===current.dev&&image.ino===current.ino&&image.size===current.size);
 assert.equal(process.versions.node,'22.23.4');assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_JOB,'readonly');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_EVENT_NAME,'push');assert.equal(e.GITHUB_WORKFLOW_REF,'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101');
 for(const k of ['NODE_OPTIONS','NODE_PATH','AFW_SYN_CHECKPOINT_KEY','AFW_BUDGET_DIAGNOSTIC_CANDIDATE'])assert.equal(e[k],undefined);
 assert.equal(typeof e.GITHUB_SHA,'string');assert.equal(typeof e.GITHUB_RUN_ID,'string');assert.match(e.GITHUB_SHA,/^[a-f0-9]{40}$/);assert.match(e.GITHUB_RUN_ID,/^[1-9][0-9]{0,19}$/);assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(git('rev-parse','--show-toplevel'),fs.realpathSync('.'));assert.equal(process.cwd(),fs.realpathSync('.'));
 const sourceTree=git('rev-parse','HEAD^{tree}');assert.match(sourceTree,/^[a-f0-9]{40}$/);
 const tree=execFileSync('git',['ls-tree','-rz','--full-tree','HEAD'],{stdio:['ignore','pipe','pipe']});
 const rows=tree.toString('utf8').split('\0').filter(Boolean).map(x=>{const at=x.indexOf('\t');assert(at>0);return{tuple:x.slice(0,at),path:x.slice(at+1)};}).filter(x=>![same,f7].includes(x.path)).sort((a,b)=>Buffer.compare(Buffer.from(a.path),Buffer.from(b.path)));
 const core=Buffer.from(rows.map(x=>x.tuple+'\t'+x.path+'\0').join(''));assert.equal(rows.length,3201);assert.equal(core.length,324448);assert.equal(sha(core),'aefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703');execFileSync('git',['diff','--exit-code','HEAD','--'],{stdio:['ignore','pipe','pipe']});
 const st=fs.lstatSync(same);assert(st.isFile()&&!st.isSymbolicLink()&&st.size<=2600000);const bytes=fs.readFileSync(same);assert.equal(blob(bytes),git('rev-parse','HEAD:'+same));
 const prefix=bytes.subarray(0,2260109);assert.equal(prefix.length,2260109);assert.equal(sha(prefix),'9b49c2699725fa9148202d046bc3f050d151313061eae17bfa67494559476421');assert.equal(blob(prefix),'71fabddb7fcee9f436ce3ea95785c3a2ee5afe70');
 const text=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes),begin='<!-- AFW-R3-DELIVERY-SUCCESSOR-R5-DATA-V1:BEGIN -->',end='<!-- AFW-R3-DELIVERY-SUCCESSOR-R5-DATA-V1:END -->';assert.equal(text.split(begin).length,2);assert.equal(text.split(end).length,2);const first=text.indexOf(begin),last=text.indexOf(end);assert(last>first&&Buffer.byteLength(text.slice(0,first))>=prefix.length);
 const section=text.slice(first+begin.length,last);assert.match(section,/^\n[A-Za-z0-9+/=\n]+\n$/);const b64=section.replaceAll('\n',''),pins={"bytes":487208,"sha256":"087bba2182c131579e233f6c29daf1ee85e2aae41e77b66d6f93cc44cb5000c5","blob":"f9c8261c54f761b5c33ddc370dbe7b308648033b","compressed":{"bytes":120211,"sha256":"7e9aace1b1a3930a1a5234a2fdee5af68ebec77cc5b9818a6d342328047bf0e5","blob":"b3dfc078047bee03b5b42140783ee1dcf2409fd8"},"base64Characters":160284};assert.equal(b64.length,pins.base64Characters);assert(b64.length<=174764);const zip=Buffer.from(b64,'base64');assert.equal(zip.toString('base64'),b64);assert.equal(zip.length,pins.compressed.bytes);assert(zip.length<=131072);assert.equal(sha(zip),pins.compressed.sha256);assert.equal(blob(zip),pins.compressed.blob);
 const raw=gunzipSync(zip,{maxOutputLength:524288});assert.equal(raw.length,pins.bytes);assert.equal(sha(raw),pins.sha256);assert.equal(blob(raw),pins.blob);const wire=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(raw),payload=JSON.parse(wire);assert.equal(JSON.stringify(payload),wire);
 // Closed captured-original-creator continuity derivation; no caller patch/path/code.
 const ccPrefix=bytes.subarray(0,2471214);assert.equal(ccPrefix.length,2471214);assert.equal(sha(ccPrefix),'1ba61ebb62514c1bb2e5b7b6058dd5abad09ddc1d059483987262032e154928a');assert.equal(blob(ccPrefix),'2fcd79c7d0a2475f176dc03360df5980a58c3120');
 const ccSuffix=bytes.subarray(2471214,2481826);assert.equal(ccSuffix.length,10612);assert.equal(sha(ccSuffix),'cdfe4a0b495be82b9d2746a12f09a3cb24c100f940bb6cdbecaa0585f8a7fac5');
 const ccBegin='<!-- AFW-CREATOR-CONTINUITY-DATA-V1:BEGIN -->',ccEnd='<!-- AFW-CREATOR-CONTINUITY-DATA-V1:END -->';assert.equal(text.split(ccBegin).length,2);assert.equal(text.split(ccEnd).length,2);const ccFirst=text.indexOf(ccBegin),ccLast=text.indexOf(ccEnd);assert(ccLast>ccFirst&&Buffer.byteLength(text.slice(0,ccFirst))>=2471214);const ccOverlayText=text.slice(ccFirst+ccBegin.length,ccLast);assert.equal(sha(Buffer.from(ccOverlayText)),'a7e62d0ce31a094090c6b1524f34cc55b776a4938010a5ec1c310ca4ac6b712f');
 const ccOldKernel=payload.helpers['lifetime.py'];assert.equal(sha(Buffer.from(ccOldKernel)),'ae23b6e242cb41d3978b391c3bde1095ee7e0c0c717db98a598fe8fd9dcb2a27');assert.equal(ccOldKernel.split(" # AFW_LIFE_BEFORE_ARM\n").length,2);payload.helpers['lifetime.py']=ccOldKernel.replace(" # AFW_LIFE_BEFORE_ARM\n"," # AFW_LIFE_BEFORE_ARM\n if os.getppid()!=before[0]:raise CreatorDead()\n");
 const ccKernelPin=JSON.parse(ccOverlayText).kernelSnapshot;assert.deepEqual(Object.keys(ccKernelPin),['bytes','sha256','zipBytes','zipSha256','data','cap']);assert.equal(ccKernelPin.bytes,16073);assert.equal(ccKernelPin.cap,32768);assert.equal(ccKernelPin.sha256,'f2b319e2a98a0959e421e80d7f94662476508f2ae6bc7cff2f9c6f8f0e17a791');assert.equal(ccKernelPin.zipBytes,5078);assert.equal(ccKernelPin.zipSha256,'f0ef8e96c2f15251fbdbcb0abe801cbb981f5c97663233a0cae0520b261f29ed');assert.equal(sha(Buffer.from(ccKernelPin.data)),'1ba509cdcd9ecda3ae60b3db8f5876e1ddf17f5f9692bff77f113cef3e6356ef');const ccKernelZip=Buffer.from(ccKernelPin.data,'base64');assert.equal(ccKernelZip.toString('base64'),ccKernelPin.data);assert.equal(ccKernelZip.length,ccKernelPin.zipBytes);assert.equal(sha(ccKernelZip),ccKernelPin.zipSha256);assert.equal(gunzipSync(ccKernelZip,{maxOutputLength:32768}).toString('utf8'),payload.helpers['lifetime.py']);
 for(const name of ['delivery-entry.sh','controls-entry.sh','missing-cwd-entry.sh']){const prior=payload.helpers[name],lines=prior.split('\n').filter(line=>line.startsWith('_r3_kernel='));assert.equal(lines.length,1);const oldPin=JSON.parse(lines[0].slice('_r3_kernel='.length));assert.equal(oldPin.bytes,16025);assert.equal(oldPin.sha256,'ae23b6e242cb41d3978b391c3bde1095ee7e0c0c717db98a598fe8fd9dcb2a27');payload.helpers[name]=prior.replace(lines[0],'_r3_kernel='+JSON.stringify(ccKernelPin));}
 const ccResult=Buffer.from(JSON.stringify(payload));assert.equal(ccResult.length,487293);assert.equal(sha(ccResult),'dda3f25ef82cdf4e65814360b52aafa9ddf3ec2e57d1fa2f92e46466acfcd25b');assert.equal(blob(ccResult),'f23fcfebf3c72632327cf24babf2ff7ace22dae6');
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

 // Original raw origin, production18, remaining32 helpers and public wire remain pinned.
 assert.deepEqual(Object.keys(payload),['purpose','sourceParent','sourceParentTree','core','prefix','production','helpers']);assert.equal(payload.purpose,'afw.r3-delivery.successor-round5-data.v1');assert.equal(payload.sourceParent,'bfa80fac58ecb60bb3c9bcd458da6f393b301f70');assert.equal(payload.sourceParentTree,'d17f87ef49892e6a4c0ec50dd2436b0697b9f45f');assert.deepEqual(payload.core,{"count":3201,"bytes":324448,"sha256":"aefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703"});assert.deepEqual(payload.prefix,{"blob":"71fabddb7fcee9f436ce3ea95785c3a2ee5afe70","bytes":2260109,"sha256":"9b49c2699725fa9148202d046bc3f050d151313061eae17bfa67494559476421"});
 const prod=payload.production;assert.deepEqual(Object.keys(prod),['blob','bytes','sha256','count','setSha256','data']);assert.equal(prod.count,18);assert.equal(prod.blob,'b88ebef9a2aa979772d20bfb778cbfe463dc3011');assert.equal(prod.bytes,95518);assert.equal(prod.sha256,'cfcb0dc7992d27246dc785ef2991104f6715e61c9aa49cfddc0317b219e6ac91');assert.equal(prod.setSha256,'71b4454f4cd90f716852bbdbb44f686d7f46191e8d93f890c465a7cb5f29d9af');
 const frozen=Buffer.from(prod.data);assert.equal(frozen.length,prod.bytes);assert.equal(sha(frozen),prod.sha256);assert.equal(blob(frozen),prod.blob);const original=JSON.parse(prod.data);assert.equal(JSON.stringify(original)+'\n',prod.data);assert.equal(original.productionCount,18);assert.equal(Object.keys(original.programs).length,18);
 const originalPins={};for(const[name,p]of Object.entries(original.programs)){const b=Buffer.from(p.content);assert.deepEqual(Object.keys(p),['bytes','sha256','blob','content']);assert.equal(b.length,p.bytes);assert.equal(sha(b),p.sha256);assert.equal(blob(b),p.blob);originalPins[name]={bytes:p.bytes,sha256:p.sha256,blob:p.blob};}assert.equal(sha(Buffer.from(JSON.stringify(originalPins)+'\n')),prod.setSha256);
 // Frozen18 remain DATA. No production main/original readonly CLI/Native import, materialization or call.
 const expected={"io.mjs":{"bytes":1815,"sha256":"b7d4ee0b8786c52a26857a8e203a710017b40dc8f5636a1d387638b9ec78eb47","blob":"8bb9a8ab8ddf81689ee890252579c1fd41dfdf52"},"emitter.mjs":{"bytes":3511,"sha256":"02f80480dbc8bc8700d0ecf3a57e65f855954ca64b379d29eefdb75c6d7db760","blob":"f9eee51fbdb89d0e130f8137d6a48ae787904f66"},"source-provenance.mjs":{"bytes":6690,"sha256":"b4d0872044216a275458d14b838ecf57628780092767ea88910dce18585408ce","blob":"fc6b339e54bf0fe91ad73f9b744ab7d46df35b0d"},"raw-sample.mjs":{"bytes":4289,"sha256":"1b594a7768a69cba5db1f41e83eb2a941f6451c82584490fdb77ba1fea85e9fc","blob":"8cdabb2324ae97b04fa17350846e24d666cd3536"},"site-schema.json":{"bytes":12651,"sha256":"5b55423937bbe38a18f1bbb8196d8cd85336d81187810b8c5b5abe8a593c37fd","blob":"4871edc102386fe6db65c773e51c21ecb94897e3"},"site-map.json":{"bytes":6630,"sha256":"1be6536669654bcc8c181ed7057b189352bef9b0587eb75f4124500477e4f2fe","blob":"57c5a96710f0a2d97656b400882d8b4b4a1a7e2f"},"envelope-schema.json":{"bytes":5616,"sha256":"49c2a27cf977f0c9247fb8f20539fb29a9ca002294d86eeb0d9db8f876e090e5","blob":"90831bbc3035d944c4ae8f96d2cfa6b24362eb9f"},"boundary.py":{"bytes":12562,"sha256":"27274120076048fd6f63b122b5534d8d06e97a2d4cf36461c1f710c605accdf4","blob":"554a2b2d2a8e3f365533f0df3006bcce1e409698"},"delivery-schema.json":{"bytes":1380,"sha256":"d8332c8bf26c4224bd2a5da321dc50a28a2d6391b294bc262a438c2638fa2f60","blob":"ae706e0e659d0ee7647bbec8e6b3d9ebbcac3df8"},"unavailable-schema.json":{"bytes":1315,"sha256":"10d6dee3228f75a1ea09ebfa365287a460ec06537c8c0a3e3bb11702605806f9","blob":"4a310ddcef7b1b7bf0755bf56b760486254cf8c6"},"controls-schema.json":{"bytes":4681,"sha256":"2d0a4c404abfb107e44ab369f2998b1bbbbba2734cbf993acf8c8f2c0fe47d83","blob":"8586d4387a5fcd95b18d7c966cf841432330a789"},"matrix.json":{"bytes":24054,"sha256":"0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e","blob":"5b829c768ed3d7af03d5eb3f1870599d39bfd083"},"shape.mjs":{"bytes":843,"sha256":"82224496e7db35a1daf7168591cb2123edbb3242331a314680f13d05b3bfef5e","blob":"df49410ebf42b4fbc9a8c032f81a0edc8fb95d0b"},"control-proof.mjs":{"bytes":2206,"sha256":"a7318fd9452f0254fdb9ae1261040ab944ce2d56c443004579c51e55c2c63c71","blob":"ab38574f5fe697fd9f0d48f9ade065749f4a0c14"},"site-receiver.mjs":{"bytes":5460,"sha256":"0d346b88c9594c45ef207f9fa4b57c984d13a3e64943904f880e2e2b96377ad2","blob":"c2cf804b6d427b5fc40da2b7d1375785a0a2f459"},"normalized-sample.mjs":{"bytes":3987,"sha256":"2bee6afaa30f01f1f497512d595f24f3a0c92269e3b4ed7e2d2e349ae5b4419f","blob":"f7c2fefcc9df568a8453d876072a23a790b94fcd"},"witness.mjs":{"bytes":1044,"sha256":"336df41b1994c8a315e4f56d976ddd0c9922397c702a02869ac8d44f42a8629a","blob":"b207c0c9ea759a9a146783b8818276444bef155b"},"fixtures.json":{"bytes":7988,"sha256":"06b7dc9e63c178b6b823db1ee56049ce4d1406861df240ca2fbc119d2df45bc9","blob":"f29e76fd04627ebe5d1100007808610ebc240571"},"controls.mjs":{"bytes":32428,"sha256":"3c8b4e694154f6162b70d63d7e1d3de7c417a675db4a2e87880f2d964eca8c35","blob":"17e101dd8720312111b7dffb37f7edb8da41a0fd"},"examples.json":{"bytes":22739,"sha256":"4f8da5a563bb0498cc506d693421853777ba7efb67d42da44b1889e5fef7b945","blob":"6f28d4f4479fb093aec3188d21b1796fd7c3fff2"},"controls-boundary.py":{"bytes":12908,"sha256":"6e3dcd0c4f262a509b75499674375eaa3d91b9e83789f03689862f51734fc3d7","blob":"b6c39695cdca9963d083842b114b7e4fb59e6392"},"controls-unavailable-example.json":{"bytes":568,"sha256":"7544b33859efe6ba2f6f1789e709f89f5f94f08352dd4fe4b14d700b19b22644","blob":"beedc03c8066cef6e6a24914d5334f99183d014b"},"outer.mjs":{"bytes":25947,"sha256":"62f2faa1bff1a2aa2438e8c1794361910e44a6db9c632daa28185adc647bf515","blob":"c74d74879d6935c47d50b1233dad4027e6704365"},"delivery-entry.sh":{"bytes":24013,"sha256":"63b7e32a4291e5a1b2fc3753a5ae89758dcf0913f6f2bf2d558bc3a0dd9f2961","blob":"2477c393fbc7d9883894ef7299b4f749cc3857ab"},"controls-entry.sh":{"bytes":24058,"sha256":"e874d2de7710156e11726c7bd01626faa5351f94514cf0c42878e679981ad899","blob":"f0825d011a5e7942194a157a327ef7c42548180c"},"oracle.mjs":{"bytes":1877,"sha256":"37c8724ced0eaa42bd54aa01aef1af7c3a7107ff3e78243e1f3d04da841fa4d1","blob":"652201ebe699664b97a5bc3d7c815a02dd889805"},"lifetime.py":{"bytes":16073,"sha256":"f2b319e2a98a0959e421e80d7f94662476508f2ae6bc7cff2f9c6f8f0e17a791","blob":"765573c5eeaf83add464e94a8240dcd7a90786d0"},"delivery-outer.mjs":{"bytes":25986,"sha256":"d32eaeb8d09e1d50dd14195fecec7606d457004ea6f61084900b94547cc6899f","blob":"aac76e8c15a01cbb308ba63ad7dec19e2d5ebb76"},"controls-outer.mjs":{"bytes":25986,"sha256":"ada3cc7cf36a742d71c6ed12a7b5d15b91d56c4353aad02318a871ec370e4c35","blob":"e62dd9c4760da521b84f23b1c87855070767aac0"},"missing-cwd-entry.sh":{"bytes":24130,"sha256":"e625cd8b88726576b278099856bd6b3126c02da4f31c387ba49ced923a5fa9fc","blob":"3666fdd52620bd2a30bfa3e100897b2fab1610c1"},"race-creator.mjs":{"bytes":777,"sha256":"2657c30db6cff046599ff3d9cd2cdf7c3c312252b9636741627871d090372575","blob":"a6d47254adbf330a09b879a3a9b20ae4de476e73"},"lifetime-controls.py":{"bytes":12219,"sha256":"d67b5c8c8e127c359f8d2b5d7da30da809b8d91bfb77759df4bbf9ecaaf53c59","blob":"21b0b82242a76efd94d34fe1f722e04fda6cd489"},"authority-anchor.json":{"bytes":1964,"sha256":"e08d9864b16a1534b71344b817a6d3a78697d8d51af8ea798229a5f16d4b6407","blob":"1bed486f15a8743ef7c68470772835aaf4946a40"}},names=Object.keys(expected);assert.equal(names.length,33);assert.deepEqual(Object.keys(payload.helpers),names);
 for(const name of names){assert.match(name,/^[a-z0-9][a-z0-9.-]{0,63}$/);const content=payload.helpers[name];assert.equal(typeof content,'string');const b=Buffer.from(content),pin=expected[name];assert(b.length<=32768);assert.equal(b.length,pin.bytes);assert.equal(sha(b),pin.sha256);assert.equal(blob(b),pin.blob);}
 assert.equal(sha(Buffer.from(payload.helpers['matrix.json'])),expected['matrix.json'].sha256);assert.equal(expected['matrix.json'].blob,'5b829c768ed3d7af03d5eb3f1870599d39bfd083');
 assert.equal(fs.realpathSync(e.RUNNER_TEMP),e.RUNNER_TEMP);const temp=fs.lstatSync(e.RUNNER_TEMP);assert(temp.isDirectory()&&temp.uid===process.getuid()&&!(temp.mode&0o022));
 const root=e.RUNNER_TEMP+'/afw-r3-delivery';fs.mkdirSync(root,{mode:0o700});for(const name of names)fs.writeFileSync(root+'/'+name,payload.helpers[name],{mode:0o600,flag:'wx'});
 for(const name of names){const b=fs.readFileSync(root+'/'+name);assert.equal(b.length,expected[name].bytes);assert.equal(sha(b),expected[name].sha256);assert.equal(blob(b),expected[name].blob);}
 const context={purpose:'afw.r3-delivery.binding.v1',source:e.GITHUB_SHA,sourceTree,run:e.GITHUB_RUN_ID,attempt:1,job:'readonly',node:process.versions.node};fs.writeFileSync(root+'/context.json',JSON.stringify(context),{mode:0o600,flag:'wx'});r3BootstrapAdmitted=true;
}catch{}

// Trusted outer: builtins only until the closed output boundary.
import * as r3fs from 'node:fs';
import {TextDecoder as R3Decoder} from 'node:util';
import {spawn as r3Spawn} from 'node:child_process';
import {createHash as r3Hash} from 'node:crypto';
const r3FallbackDelivery={"purpose":"afw.r3-delivery.unavailable.v1","reason":"outer_startup_unavailable","source":"unknown","sourceTree":"unknown","run":"unknown","attempt":"unknown","job":"unknown","node":"unknown","controls":"unknown","availability":"unavailable","sourceQualified":false,"collectionComplete":"unknown","sampleObserved":"unknown","nonclaims":{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}},r3FallbackControls={"purpose":"afw.r3-delivery.controls-unavailable.v1","reason":"outer_startup_unavailable","source":"unknown","sourceTree":"unknown","run":"unknown","attempt":"unknown","job":"unknown","node":"unknown","allPassed":"unknown","expected":104,"passed":"unknown","failed":"unknown","unknown":"unknown","results":"unknown","mutants":"unknown","nativeBusinessCases":0,"nonclaims":{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}};
async function runDelivery(){return await r3Outer('delivery');}
async function runControls(){return await r3Outer('controls');}
async function r3Outer(kind){
 let stage='binding_unavailable',image,creatorHandle,helperHandle,publishing=false;
 const emit=(record,marker)=>{const b=Buffer.from(marker+' '+JSON.stringify(record)+'\n');publishing=true;if(r3fs.writeSync(1,b)!==b.length)throw 1;};
 const fallback=reason=>{emit({...(kind==='controls'?r3FallbackControls:r3FallbackDelivery),reason},kind==='controls'?'AFW_R3_DELIVERY_CONTROLS_UNAVAILABLE/1':'AFW_R3_DELIVERY_UNAVAILABLE/1');return 23;};
 try{
  const {openSync,fstatSync,readSync,closeSync,constants}=r3fs,TextDecoder=R3Decoder;
  const invalid=()=>{const e=new Error();e.code='AFW_INVALID';return e;};
const uid=process.getuid(),dirFlags=constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW;
function checked(fd,directory){const s=fstatSync(fd);if((directory?!s.isDirectory():!s.isFile())||s.uid!==uid||(s.mode&0o022)!==0||(!directory&&(s.nlink!==1||(s.mode&0o077)!==0)))throw invalid();return s;}
function readFixed(base,parts,max){
 let fd,leaf;
 try{fd=openSync(base,dirFlags);checked(fd,true);for(const part of parts.slice(0,-1)){if(!/^[a-zA-Z0-9.-]+$/.test(part))throw invalid();const next=openSync('/proc/self/fd/'+fd+'/'+part,dirFlags);try{checked(next,true);}catch(e){closeSync(next);throw e;}closeSync(fd);fd=next;}
 leaf=openSync('/proc/self/fd/'+fd+'/'+parts.at(-1),constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);const before=checked(leaf,false);if(before.size>max)throw invalid();
 const out=Buffer.alloc(max+1);let offset=0;while(offset<out.length){const n=readSync(leaf,out,offset,out.length-offset,null);if(n===0)break;offset+=n;}const after=checked(leaf,false);
 if(offset>max||offset!==before.size||before.dev!==after.dev||before.ino!==after.ino||before.size!==after.size||before.mtimeMs!==after.mtimeMs||before.ctimeMs!==after.ctimeMs)throw invalid();
 // ignoreBOM:true PRESERVES U+FEFF; ASCII/canonical receivers must reject it.
 try{return new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(out.subarray(0,offset));}catch{throw invalid();}
 }finally{if(leaf!==undefined)closeSync(leaf);if(fd!==undefined)closeSync(fd);}
}
function jsonFixed(base,parts,max){const raw=readFixed(base,parts,max),v=JSON.parse(raw);if(JSON.stringify(v)!==raw)throw invalid();return v;}

  function shape(v,s){
 const need=x=>{if(!x)throw 1;};
 if(s.anyOf){let count=0;for(const one of s.anyOf)try{shape(v,one);count++;}catch{}need(count===1);return;}
 if(s.enum){need(s.enum.some(x=>Object.is(x,v)));return;}
 if(s.type==='null'){need(v===null);return;}
 if(s.type==='integer'){need(Number.isSafeInteger(v)&&v>=s.minimum&&v<=s.maximum);return;}
 if(s.type==='string'){need(typeof v==='string'&&new RegExp(s.pattern).test(v));return;}
 if(s.type==='array'){need(Array.isArray(v)&&v.length>=s.minItems&&v.length<=s.maxItems);for(const x of v)shape(x,s.items);return;}
 if(s.type==='object'){need(v&&typeof v==='object'&&!Array.isArray(v)&&s.additionalProperties===false&&JSON.stringify(Object.keys(v).sort())===JSON.stringify(s.required.slice().sort()));for(const k of s.required)shape(v[k],s.properties[k]);return;}throw 1;
}

  const need=x=>{if(!x)throw 1;},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const base=process.env.RUNNER_TEMP,e=process.env;
  need(process.versions.node==='22.23.4'&&typeof base==='string'&&base.startsWith('/')&&base.length<=4096&&!base.includes('\0')&&r3fs.realpathSync(base)===base);
  const own=openSync(base+'/afw-r3-delivery',constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW);try{const s=fstatSync(own);need(s.isDirectory()&&s.uid===process.getuid()&&!(s.mode&0o077));}finally{closeSync(own);}
  const boundImage=fstatSync(3),runningImage=r3fs.statSync('/proc/self/exe');need(boundImage.isFile()&&boundImage.dev===runningImage.dev&&boundImage.ino===runningImage.ino&&boundImage.size===runningImage.size);
  const c=jsonFixed(base,['afw-r3-delivery','context.json'],2048);
  need(['purpose','source','sourceTree','run','job','node'].every(k=>typeof c[k]==='string')&&eq(Object.keys(c),['purpose','source','sourceTree','run','attempt','job','node'])&&c.purpose==='afw.r3-delivery.binding.v1'&&c.node==='22.23.4'&&c.attempt===1&&c.job==='readonly'&&/^[a-f0-9]{40}$/.test(c.source)&&/^[a-f0-9]{40}$/.test(c.sourceTree)&&/^[1-9][0-9]{0,19}$/.test(c.run));
  for(const[k,v]of Object.entries({GITHUB_SHA:c.source,GITHUB_RUN_ID:c.run,GITHUB_RUN_ATTEMPT:'1',GITHUB_JOB:'readonly',GITHUB_REPOSITORY:'tokenizartinfo-ops/agent-friendly-web',GITHUB_REPOSITORY_ID:'1347578006',GITHUB_REF:'refs/heads/feat/finite-native-cleanup-20261101'}))need(e[k]===v);
  const ctx={source:c.source,tree:c.sourceTree,run:c.run,attempt:1,job:'readonly'};
  // Immutable Source-code authority; NOT a child-readable authority-file load.
  const R3_AUTHORITY_ANCHOR={"site-schema.json":{"bytes":12651,"sha256":"5b55423937bbe38a18f1bbb8196d8cd85336d81187810b8c5b5abe8a593c37fd","blob":"4871edc102386fe6db65c773e51c21ecb94897e3","framing":"canonical-json+lf"},"site-map.json":{"bytes":6630,"sha256":"1be6536669654bcc8c181ed7057b189352bef9b0587eb75f4124500477e4f2fe","blob":"57c5a96710f0a2d97656b400882d8b4b4a1a7e2f","framing":"canonical-json"},"envelope-schema.json":{"bytes":5616,"sha256":"49c2a27cf977f0c9247fb8f20539fb29a9ca002294d86eeb0d9db8f876e090e5","blob":"90831bbc3035d944c4ae8f96d2cfa6b24362eb9f","framing":"canonical-json"},"delivery-schema.json":{"bytes":1380,"sha256":"d8332c8bf26c4224bd2a5da321dc50a28a2d6391b294bc262a438c2638fa2f60","blob":"ae706e0e659d0ee7647bbec8e6b3d9ebbcac3df8","framing":"canonical-json"},"unavailable-schema.json":{"bytes":1315,"sha256":"10d6dee3228f75a1ea09ebfa365287a460ec06537c8c0a3e3bb11702605806f9","blob":"4a310ddcef7b1b7bf0755bf56b760486254cf8c6","framing":"canonical-json"},"controls-schema.json":{"bytes":4681,"sha256":"2d0a4c404abfb107e44ab369f2998b1bbbbba2734cbf993acf8c8f2c0fe47d83","blob":"8586d4387a5fcd95b18d7c966cf841432330a789","framing":"canonical-json"},"matrix.json":{"bytes":24054,"sha256":"0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e","blob":"5b829c768ed3d7af03d5eb3f1870599d39bfd083","framing":"canonical-json"},"fixtures.json":{"bytes":7988,"sha256":"06b7dc9e63c178b6b823db1ee56049ce4d1406861df240ca2fbc119d2df45bc9","blob":"f29e76fd04627ebe5d1100007808610ebc240571","framing":"canonical-json"},"examples.json":{"bytes":22739,"sha256":"4f8da5a563bb0498cc506d693421853777ba7efb67d42da44b1889e5fef7b945","blob":"6f28d4f4479fb093aec3188d21b1796fd7c3fff2","framing":"canonical-json"},"controls-unavailable-example.json":{"bytes":568,"sha256":"7544b33859efe6ba2f6f1789e709f89f5f94f08352dd4fe4b14d700b19b22644","blob":"beedc03c8066cef6e6a24914d5334f99183d014b","framing":"canonical-json"}};
  const freeze=v=>{if(v&&typeof v==='object'){for(const x of Object.values(v))freeze(x);Object.freeze(v);}return v;},authority={};
  for(const[name,pin]of Object.entries(R3_AUTHORITY_ANCHOR)){
   const raw=readFixed(base,['afw-r3-delivery',name],pin.bytes),bytes=Buffer.from(raw);
   need(bytes.length===pin.bytes&&r3Hash('sha256').update(bytes).digest('hex')===pin.sha256&&r3Hash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex')===pin.blob);
   const parsed=JSON.parse(raw),framed=JSON.stringify(parsed)+(pin.framing==='canonical-json+lf'?'\n':'');need(raw===framed);authority[name]=freeze(parsed);
  }freeze(authority);
  const checkContext=r=>{for(const k of ['source','sourceTree','run','attempt','job','node'])need(r[k]===c[k]);};
  const matrix=authority['matrix.json'],reportSchema=authority['controls-schema.json'],ids=matrix.ordered.map(x=>x.id),mutants=matrix.mutants;
  function report(r){
   shape(r,reportSchema);checkContext(r);need(r.matrixSha256===R3_AUTHORITY_ANCHOR['matrix.json'].sha256&&r.expected===ids.length&&r.nativeBusinessCases===0&&eq(r.results.map(x=>x.id),ids)&&eq(r.mutants.map(x=>x.id),mutants.map(x=>x.id)));
   for(const name of ['passed','failed','unknown'])need(r[name]===r.results.filter(x=>x.result===name).length);
   for(let i=0;i<mutants.length;i++){const x=r.mutants[i],wanted=mutants[i];need(eq(x.expectedFailedIds,wanted.expectedFailedIds));need(eq(x.actualFailedIds,ids.filter(id=>x.actualFailedIds.includes(id)))&&new Set(x.actualFailedIds).size===x.actualFailedIds.length);if(x.result==='passed')need(eq(x.actualFailedIds,wanted.expectedFailedIds));if(x.result==='failed')need(!eq(x.actualFailedIds,wanted.expectedFailedIds));}
   const order=['baseline',...mutants.map(x=>x.id)].flatMap(group=>ids.map(id=>group+':'+id)),cl=r.cleanup;
   for(const k of ['failedInstances','unknownInstances'])need(eq(cl[k],order.filter(id=>cl[k].includes(id)))&&new Set(cl[k]).size===cl[k].length);need(!cl.failedInstances.some(id=>cl.unknownInstances.includes(id)));
   const passed=r.passed===ids.length&&r.failed===0&&r.unknown===0&&r.mutants.every(x=>x.result==='passed')&&cl.complete===true&&cl.failedInstances.length===0&&cl.unknownInstances.length===0;
   need(r.allPassed===passed);return passed;
  }
  const admitSource=function(wire,ctx,schema,expected,aliases){
 const admitted=(function(wire,ctx,schema,expected,aliases){
 const need=(x,m)=>{if(!x)throw Error("site:"+m);},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function shape(v,s){if(s.anyOf){need(s.anyOf.filter(t=>{try{shape(v,t);return true;}catch{return false;}}).length===1,"union");return;}if(s.enum){need(s.enum.some(x=>Object.is(v,x)),"enum");return;}switch(s.type){case"null":need(v===null,"null");break;case"boolean":need(typeof v==="boolean","boolean");break;case"integer":need(Number.isSafeInteger(v)&&v>=s.minimum&&v<=s.maximum,"integer");break;case"string":need(typeof v==="string"&&new RegExp(s.pattern).test(v),"string");break;case"array":need(Array.isArray(v)&&v.length>=s.minItems&&v.length<=s.maxItems,"array");v.forEach(x=>shape(x,s.items));break;case"object":need(v&&typeof v==="object"&&!Array.isArray(v)&&s.additionalProperties===false&&eq(Object.keys(v).sort(),s.required.slice().sort()),"keys");s.required.forEach(k=>shape(v[k],s.properties[k]));break;default:throw Error("schema");}}
 need(typeof wire==="string"&&wire.length<=16384&&/^[\x20-\x7E]*$/.test(wire),"wire");const r=JSON.parse(wire);need(JSON.stringify(r)===wire,"canonical");shape(r,schema);
 need(ctx.attempt===1&&r.attempt===ctx.attempt&&ctx.job==="readonly"&&r.job===ctx.job&&r.source===ctx.source&&r.run===String(ctx.run),"context");
 need(r.sourceTree===null||r.sourceTree===ctx.tree,"tree");
 for(const k of["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"])need(r[k]===false,k);
 const n=r.businessCommand,p=r.sourceProof,proof=r.programProof;
 need(p.mapBlob==="57c5a96710f0a2d97656b400882d8b4b4a1a7e2f"&&p.mapSha256==="1be6536669654bcc8c181ed7057b189352bef9b0587eb75f4124500477e4f2fe","map");
 if(r.controls.passed)need(r.controls.count===6&&r.controls.expected===6&&r.controls.usableShape&&r.controls.usableColumns,"controls");
 if(r.pure.passed)need(r.controls.passed&&r.pure.cases===8&&r.pure.expected===8,"pure");
 if(r.profile.passed)need(r.pure.passed&&r.profile.group==="readonly","profile");
 if(n.started===true){need(r.node==="22.23.4"&&r.sourceTree===ctx.tree&&proof.verified&&proof.count===18&&proof.setSha256===expected.programSet&&proof.payloadExpandedSha256===expected.expanded&&proof.coreGitVerified&&proof.prefixVerified,"programproof");need(p.mapVerified&&p.worldBeforeVerified&&p.nativeBeforeVerified&&r.controls.passed&&r.pure.passed&&r.profile.passed,"nativegates");}
 else need(n.ended===false&&n.exitCode===null&&r.readonly===null,"notobserved");
 if(n.ended)need(n.started===true,"ended");
 if(["SIGTERM","SIGKILL","SIGINT"].includes(n.signal))need(n.started===true&&n.ended===true,"signalclosed");
 if(n.started===false)need(n.signal==="none","nostartsignal");
 if(n.started===null)need(n.signal==="unknown","unknownstartsignal");
 if(n.exitCode!==null)need(n.ended&&n.signal==="none","exit");
 const q=r.readonly;let known=0;
 if(q){
  need(eq(q.rows.map(x=>x.case),["R1","R2","R3"]),"rows");
  for(const row of q.rows)need((row.result==="failed")===(row.error!==null),"rowerror");
  for(const error of[...q.rows.map(x=>x.error),q.precase?.error].filter(Boolean)){need(error.sourceSite==="unknown"||aliases.includes(error.sourceSite),"alias");if(error.causeCode!=="ERR_ASSERTION")need(error.sourceSite==="unknown","nonassert");if(error.sourceSite!=="unknown")known++;}
  const first=q.precase?{target:"native_file",error:q.precase.error}:q.rows.filter(x=>x.result==="failed").map(x=>({target:x.case,error:x.error}))[0]??null;
  need(eq(q.firstFailure,first),"first");
  if(q.valid){
   need(q.ended&&n.ended&&n.signal==="none"&&q.summary!==null&&q.state!=="unknown","validend");
   for(const error of [...q.rows.map(x=>x.error),q.precase?.error].filter(Boolean))need(!["testTimeoutFailure","cancelledByParent","testAborted"].includes(error.wrapperFailureType),"cancelledcoverage");
   const file=q.state==="file_failure";if(file)need(q.precase?.result==="failed"&&q.rows.every(x=>x.result==="not_observed"),"file");else need(q.precase===null&&q.rows.every(x=>["passed","failed"].includes(x.result)),"cases");
   const pass=file?0:q.rows.filter(x=>x.result==="passed").length,fail=file?1:3-pass,counts={cancelled:0,failed:fail,passed:pass,skipped:0,suites:0,tests:file?1:3,todo:0,topLevel:file?1:3};
   for(const[k,v]of Object.entries(counts))need(q.summary.counts[k]===v,"counts"+k);
   need(q.summary.success===(fail===0)&&q.state===(file?"file_failure":fail?"case_failure":"all_pass")&&(n.exitCode===0)===(fail===0),"result");
  }else need(q.state==="unknown"&&q.summary===null,"unknownstream");
 }
 if(known>0)need(p.mapVerified&&p.worldBeforeVerified&&p.nativeBeforeVerified&&p.worldAfterVerified&&p.nativeAfterVerified&&p.originalBodiesUnchanged,"usableprovenance");
 need(r.usableLocationCount===known,"locationcount");need(r.collectionComplete===(r.stage==="complete"),"coverage");
 if(r.stage==="complete")need(n.started===true&&n.ended&&n.signal==="none"&&Number.isSafeInteger(n.exitCode)&&q?.valid&&p.mapVerified&&p.worldBeforeVerified&&p.nativeBeforeVerified&&p.worldAfterVerified&&p.nativeAfterVerified&&p.originalBodiesUnchanged,"complete");
 if(r.stage==="hold")need(n.started===false,"hold");
 return{record:r,diagnosticCollectionComplete:r.collectionComplete,usableLocationCount:known,commandExitedZero:n.ended&&n.exitCode===0&&n.signal==="none",historicalCauseProven:false,operationalReadiness:false,PCoff:false};
})(wire,ctx,schema,expected,aliases),r=admitted.record;
 const need=(x,m)=>{if(!x)throw Error('Root readonly provenance: '+m);};
 need(r.sourceTree===ctx.tree&&r.node==='22.23.4'&&['complete','unknown'].includes(r.stage),'context-stage');
 const p=r.programProof,s=r.sourceProof,n=r.businessCommand;
 need(p.verified===true&&p.count===18&&p.setSha256===expected.programSet&&p.payloadExpandedSha256===expected.expanded&&p.coreGitVerified===true&&p.prefixVerified===true,'all-program-proofs');
 need(['mapVerified','worldBeforeVerified','nativeBeforeVerified','worldAfterVerified','nativeAfterVerified','originalBodiesUnchanged'].every(k=>s[k]===true),'all-source-proofs');
 need(r.controls.passed===true&&r.controls.count===6&&r.controls.expected===6&&r.controls.usableShape===true&&r.controls.usableColumns===true,'controls');
 need(r.pure.passed===true&&r.pure.cases===8&&r.pure.expected===8&&r.profile.passed===true&&r.profile.group==='readonly','pure-profile');
 need(n.started===true&&n.ended===true&&['none','SIGTERM','SIGKILL','SIGINT'].includes(n.signal),'original-command-terminal');
 return {...admitted,sourceQualifiedForSample:true,NativePassClaimed:false};
}
,admitSample=function(wire,ctx){
 const need=(v,m)=>{if(!v)throw Error("r3sample:"+m);},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const keys=(v,ks)=>need(v&&typeof v==="object"&&!Array.isArray(v)&&eq(Object.keys(v).sort(),ks.slice().sort()),"keys");
 const one=(v,vs)=>vs.some(x=>Object.is(x,v)),u="unknown",count=(v,max,min=0)=>v===u||Number.isSafeInteger(v)&&v>=min&&v<=max;
 need(typeof wire==="string"&&wire.length<=4096&&/^[\x20-\x7E\n]*$/.test(wire),"wire");
 const r=JSON.parse(wire);need(wire===JSON.stringify(r)||wire===JSON.stringify(r)+"\n","canonical");
 keys(r,["purpose","source","run","attempt","case","sampleState","sample","nonclaims"]);
 need(r.purpose==="afw.r3-existing-sample.syn.v1"&&r.case==="R3"&&ctx.attempt===1&&r.attempt===1&&r.source===ctx.source&&r.run===String(ctx.run)&&/^[a-f0-9]{40}$/.test(r.source)&&/^[1-9][0-9]{0,19}$/.test(r.run),"context");
 need(ctx.sourceQualified===true,"sourceproof");need(one(r.sampleState,["observed","not_observed"]),"state");
 const fs=["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"];keys(r.nonclaims,fs);fs.forEach(k=>need(r.nonclaims[k]===false,k));
 const s=r.sample,bs=["observerInvalid","queueObserverInvalid","sdkObserverInvalid","childAbortSeen","parentAliveAtAbort","workPendingAtAbort","sameWorkWaitError"],ks=["inputSeeded","seedEntries","lists","gets","nativeInvoked","nativeSettled","nativeRejected","nativeUnsettled","outwardPending","heldNativeSettled",...bs,"selectedChildCount","selectedChildOrdinal","selectedChildFamily","childWorkStatus","childWaitStatus","queueCount","lastQueueFamily","lastQueueChild","lastQueueActive","lastQueueQueued","lastQueueMethod","heldOperationCount","phase"];keys(s,ks);
 need(one(s.inputSeeded,[true,false,u]),"seed");need(count(s.seedEntries,201),"entries");bs.forEach(k=>need(one(s[k],[true,false,u]),k));
 for(const[k,max,min]of[["lists",2,0],["gets",200,0],["nativeInvoked",202,0],["nativeSettled",202,0],["nativeRejected",202,0],["nativeUnsettled",2,0],["outwardPending",2,0],["heldNativeSettled",2,0],["selectedChildOrdinal",65535,1],["queueCount",512,0],["lastQueueChild",65535,1],["lastQueueQueued",200,0]])need(count(s[k],max,min),k);
 need(one(s.selectedChildCount,[0,1,"multiple",u]),"children");need(one(s.selectedChildFamily,[1,2,u]),"family");for(const k of ["childWorkStatus","childWaitStatus"])need(one(s[k],["unregistered","pending","fulfilled","rejected",u]),k);
 for(const k of ["lastQueueFamily","lastQueueActive"])need(one(s[k],[1,2,u]),k);need(one(s.lastQueueMethod,["get","list","delete",u]),"method");need(one(s.heldOperationCount,[0,1,2,"multiple",u]),"held");
 keys(s.phase,["completeWrites","completeNormal","lookupStage","authorizePostFinally"]);for(const k of["completeWrites","completeNormal"])need(one(s.phase[k],[0,1,"multiple",u]),k);need(one(s.phase.lookupStage,["not_seen","entered","exited",u]),"lookup");need(one(s.phase.authorizePostFinally,["not_seen","one","multiple",u]),"postfinally");
 if(s.selectedChildCount!==1)for(const k of ["selectedChildOrdinal","selectedChildFamily","childWorkStatus","childWaitStatus","childAbortSeen","parentAliveAtAbort","workPendingAtAbort","sameWorkWaitError"])need(s[k]===u,"childassociation");
 if(s.queueCount===0||s.queueCount===u)for(const k of ["lastQueueFamily","lastQueueChild","lastQueueActive","lastQueueQueued","lastQueueMethod"])need(s[k]===u,"queueassociation");
 if(s.inputSeeded!==true)need(s.seedEntries===u,"seedassociation");
 if(s.inputSeeded===true)need(Number.isSafeInteger(s.seedEntries)&&s.seedEntries>=0&&s.seedEntries<=201,"seedmarker");
 if(r.sampleState==="not_observed"){for(const k of ks.filter(x=>x!=="phase"))need(s[k]===u,"absence");for(const v of Object.values(s.phase))need(v===u,"phaseabsence");}
 return {record:r,sourceQualified:true,sampleObserved:r.sampleState==="observed",historicalCauseProven:false,operationalReadiness:false,PCoff:false};
}
;
;

  let controlsBefore=false,sourceBefore=null;
  if(kind==='delivery'){
   try{controlsBefore=report(jsonFixed(base,['afw-r3-delivery','controls-report.json'],24576));}catch{}
   try{sourceBefore=admitSource(readFixed(base,['afw-site','public-result.json'],16384),ctx,authority['site-schema.json'],{programSet:'71b4454f4cd90f716852bbdbb44f686d7f46191e8d93f890c465a7cb5f29d9af',expanded:'cfcb0dc7992d27246dc785ef2991104f6715e61c9aa49cfddc0317b219e6ac91'},authority['site-map.json'].spans.map(x=>x.alias));}catch{}
  }
  // CURRENT kernel image, independent of all child-readable context/path data.
  image=openSync('/proc/self/exe',constants.O_RDONLY);const actual=fstatSync(image),current=r3fs.statSync('/proc/self/exe');need(actual.isFile()&&actual.dev===current.dev&&actual.ino===current.ino&&actual.size===current.size);
  // AFW_POST_ADMISSION_CONTROL_HOOK
  stage='helper_unavailable';const parentSnapshot=Buffer.from(readFixed(base,['afw-r3-delivery',kind==='controls'?'controls-boundary.py':'boundary.py'],32768));readFixed(base,['afw-r3-delivery','lifetime.py'],32768);
  creatorHandle=openSync('/proc/thread-self',constants.O_RDONLY|constants.O_DIRECTORY);helperHandle=openSync(base+'/afw-r3-delivery',constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW);
  const env={};for(const k of ['PATH','HOME','RUNNER_TEMP','CI','LANG','TZ','GITHUB_REPOSITORY','GITHUB_REPOSITORY_ID','GITHUB_REF','GITHUB_SHA','GITHUB_RUN_ID','GITHUB_RUN_ATTEMPT','GITHUB_JOB','GITHUB_WORKFLOW_REF'])if(e[k]!==undefined)env[k]=e[k];
  stage='parent_unavailable';
  const captured=await new Promise(resolve=>{
   let child,done=false,overflow=false,out=Buffer.alloc(0),err=Buffer.alloc(0),timer;
   const finish=(code=null,signal='unknown')=>{if(done)return;done=true;clearTimeout(timer);resolve({code,signal,out,err,overflow});};
   const stop=()=>{try{child?.kill('SIGKILL');}catch{}};
   try{child=r3Spawn('/usr/bin/python3',['-I','-S','/proc/self/fd/5',kind==='controls'?'parent-controls':'parent-delivery'],{env,stdio:['pipe','pipe','pipe',image,creatorHandle,5,helperHandle]});}catch{finish();return;}
   child.stdin.on('error',()=>{});child.stdin.end(parentSnapshot);
   const retain=(which,chunk,cap)=>{const prior=which==='out'?out:err,kept=Buffer.concat([prior,chunk.subarray(0,cap+1-prior.length)]);if(which==='out')out=kept;else err=kept;if(prior.length+chunk.length>cap){overflow=true;stop();}};
   child.stdout.on('data',b=>retain('out',b,kind==='controls'?24576:8192));child.stderr.on('data',b=>retain('err',b,4096));child.on('error',()=>{stop();finish();});child.on('close',(code,signal)=>finish(code,signal??'none'));
   timer=setTimeout(()=>{overflow=true;stop();},kind==='controls'?110000:4000);
  });
  need(!captured.overflow&&captured.err.length===0&&captured.signal==='none'&&[0,23].includes(captured.code));
  stage='record_invalid';
  const raw=new R3Decoder('utf-8',{fatal:true,ignoreBOM:true}).decode(captured.out);need(/^[\x20-\x7e\n]*$/.test(raw));
  const lines=raw.split('\n');need(lines.pop()===''&&lines.every(x=>x.length>0));
  const parse=(line,marker)=>{need(line.startsWith(marker+' '));const text=line.slice(marker.length+1),v=JSON.parse(text);need(JSON.stringify(v)===text);return v;};
  if(kind==='controls'){
   need(lines.length===1);const r=parse(lines[0],'AFW_R3_DELIVERY_CONTROLS/1'),passed=report(r);need(captured.code===(passed?0:23));emit(r,'AFW_R3_DELIVERY_CONTROLS/1');return passed?0:23;
  }
  need(controlsBefore);
  const d=parse(lines.at(-1),'AFW_R3_DELIVERY/1');shape(d,authority['delivery-schema.json']);checkContext(d);
  if(d.sourceQualified)need(sourceBefore?.sourceQualifiedForSample===true&&d.collectionComplete===sourceBefore.diagnosticCollectionComplete);
  if(d.availability==='available'){
   need(lines.length===2&&captured.code===0&&d.sourceQualified===true&&d.reason==='none');const s=parse(lines[0],'AFW_R3_EXISTING_SAMPLE/1');shape(s,authority['envelope-schema.json'].properties.sample.anyOf[0]);
   // Final independent normalized association/absence authority, BEFORE any write.
   admitSample(JSON.stringify(s),{...ctx,sourceQualified:true});
   need(d.sampleObserved===(s.sampleState==='observed'));const b=Buffer.from(raw);publishing=true;need(r3fs.writeSync(1,b)===b.length);return 0;
  }
  need(lines.length===1&&captured.code===23&&d.sampleObserved==='unknown'&&d.reason!=='none');
  if(d.sourceQualified)need(['sample_missing','sample_invalid','io_unavailable'].includes(d.reason)&&typeof d.collectionComplete==='boolean');
  else need(['source_missing','source_invalid','io_unavailable'].includes(d.reason)&&d.collectionComplete==='unknown');
  emit(d,'AFW_R3_DELIVERY/1');return 23;
 }catch{if(publishing)return 23;return fallback(stage);}finally{for(const fd of[image,creatorHandle,helperHandle])if(fd!==undefined)try{r3fs.closeSync(fd);}catch{}}
}

if(r3BootstrapAdmitted)process.exitCode=await runControls();
else{const b=Buffer.from('AFW_R3_DELIVERY_CONTROLS_UNAVAILABLE/1 '+JSON.stringify({...r3FallbackControls,reason:'setup_unavailable'})+'\n');try{r3fs.writeSync(1,b);}catch{}process.exitCode=23;}
