# CC1 task review package — factored Source range and complete immutable diff references

Base74e3300cfbe47ee4986303befb1ee3c3d099fc77. Inactivee2df2bee, actual Source05d1a53692dc2b553620ff6267cef59cf36cf85c/treeb5a87f3b345a40df39282be4fe3705fd89d1c3ee. Actual Source run43740674443/1 pending at package draft; final evidence appended after terminal/closure. No other source commits, Core/Main unchanged.

Full10 reversible edit objects are preserved below and expose every source byte; rawf23fcfeb and source39manifest67e4898f expose all plaintext. This factored rendering removes compressed DATA line duplication only; Root independently decoded8snapshots, compared continuation, replayed10diffs bothways, verified39pins and exact four helpers/5extras. Review the actual logic plus derivation, not hash values as functional proof.

## Kernel full unified diff (10 context)
```diff
@@ -19,20 +19,21 @@
  try:raw=os.read(f,4097);need(len(raw)<=4096)
  finally:os.close(f)
  text=raw.decode('ascii');at=text.rfind(')');need(at>0 and text[:text.index('(')].strip()==str(pid));parts=text[at+2:].split();need(len(parts)>=20 and parts[0] not in ['Z','X'] and parts[19].isdigit())
  return pid,parts[19]
 def main_thread():
  link=os.readlink('/proc/thread-self');m=re.fullmatch(r'(?:/proc/)?([1-9][0-9]*)/task/([1-9][0-9]*)',link);need(m is not None and int(m[1])==int(m[2])==os.getpid())
 def arm():
  main_thread();before=creator()
  _r3diag('creator_checked')
  # AFW_LIFE_BEFORE_ARM
+ if os.getppid()!=before[0]:raise CreatorDead()
  need(libc.prctl(1,signal.SIGKILL,0,0,0)==0 and death_get()==signal.SIGKILL)
  need(creator()==before)
  _r3diag('pdeath_checked')
  return before
 def sealed_source(data,label,maximum):
  need(type(data) is bytes and 0<len(data)<=maximum and maximum in [32768,65536] and label in ['afw-r3-lifetime','afw-r3-module','afw-r3-parent','afw-r3-helper'])
  f=os.memfd_create(label,os.MFD_CLOEXEC|os.MFD_ALLOW_SEALING)
  try:
   at=0
   while at<len(data):
```

## Bootstrap prelude full unified diff (10 context, includes all overlay logic and complete pin maps)
```diff
@@ -14,23 +14,32 @@
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
+ // Closed captured-original-creator continuity derivation; no caller patch/path/code.
+ const ccPrefix=bytes.subarray(0,2471214);assert.equal(ccPrefix.length,2471214);assert.equal(sha(ccPrefix),'1ba61ebb62514c1bb2e5b7b6058dd5abad09ddc1d059483987262032e154928a');assert.equal(blob(ccPrefix),'2fcd79c7d0a2475f176dc03360df5980a58c3120');
+ const ccSuffix=bytes.subarray(2471214);assert.equal(ccSuffix.length,10612);assert.equal(sha(ccSuffix),'cdfe4a0b495be82b9d2746a12f09a3cb24c100f940bb6cdbecaa0585f8a7fac5');
+ const ccBegin='<!-- AFW-CREATOR-CONTINUITY-DATA-V1:BEGIN -->',ccEnd='<!-- AFW-CREATOR-CONTINUITY-DATA-V1:END -->';assert.equal(text.split(ccBegin).length,2);assert.equal(text.split(ccEnd).length,2);const ccFirst=text.indexOf(ccBegin),ccLast=text.indexOf(ccEnd);assert(ccLast>ccFirst&&Buffer.byteLength(text.slice(0,ccFirst))>=2471214);const ccOverlayText=text.slice(ccFirst+ccBegin.length,ccLast);assert.equal(sha(Buffer.from(ccOverlayText)),'a7e62d0ce31a094090c6b1524f34cc55b776a4938010a5ec1c310ca4ac6b712f');
+ const ccOldKernel=payload.helpers['lifetime.py'];assert.equal(sha(Buffer.from(ccOldKernel)),'ae23b6e242cb41d3978b391c3bde1095ee7e0c0c717db98a598fe8fd9dcb2a27');assert.equal(ccOldKernel.split(" # AFW_LIFE_BEFORE_ARM\n").length,2);payload.helpers['lifetime.py']=ccOldKernel.replace(" # AFW_LIFE_BEFORE_ARM\n"," # AFW_LIFE_BEFORE_ARM\n if os.getppid()!=before[0]:raise CreatorDead()\n");
+ const ccKernelPin=JSON.parse(ccOverlayText).kernelSnapshot;assert.deepEqual(Object.keys(ccKernelPin),['bytes','sha256','zipBytes','zipSha256','data','cap']);assert.equal(ccKernelPin.bytes,16073);assert.equal(ccKernelPin.cap,32768);assert.equal(ccKernelPin.sha256,'f2b319e2a98a0959e421e80d7f94662476508f2ae6bc7cff2f9c6f8f0e17a791');assert.equal(ccKernelPin.zipBytes,5078);assert.equal(ccKernelPin.zipSha256,'f0ef8e96c2f15251fbdbcb0abe801cbb981f5c97663233a0cae0520b261f29ed');assert.equal(sha(Buffer.from(ccKernelPin.data)),'1ba509cdcd9ecda3ae60b3db8f5876e1ddf17f5f9692bff77f113cef3e6356ef');const ccKernelZip=Buffer.from(ccKernelPin.data,'base64');assert.equal(ccKernelZip.toString('base64'),ccKernelPin.data);assert.equal(ccKernelZip.length,ccKernelPin.zipBytes);assert.equal(sha(ccKernelZip),ccKernelPin.zipSha256);assert.equal(gunzipSync(ccKernelZip,{maxOutputLength:32768}).toString('utf8'),payload.helpers['lifetime.py']);
+ for(const name of ['delivery-entry.sh','controls-entry.sh','missing-cwd-entry.sh']){const prior=payload.helpers[name],lines=prior.split('\n').filter(line=>line.startsWith('_r3_kernel='));assert.equal(lines.length,1);const oldPin=JSON.parse(lines[0].slice('_r3_kernel='.length));assert.equal(oldPin.bytes,16025);assert.equal(oldPin.sha256,'ae23b6e242cb41d3978b391c3bde1095ee7e0c0c717db98a598fe8fd9dcb2a27');payload.helpers[name]=prior.replace(lines[0],'_r3_kernel='+JSON.stringify(ccKernelPin));}
+ const ccResult=Buffer.from(JSON.stringify(payload));assert.equal(ccResult.length,487293);assert.equal(sha(ccResult),'dda3f25ef82cdf4e65814360b52aafa9ddf3ec2e57d1fa2f92e46466acfcd25b');assert.equal(blob(ccResult),'f23fcfebf3c72632327cf24babf2ff7ace22dae6');
+ // Original raw origin, production18, remaining29 helpers and public wire remain pinned.
  assert.deepEqual(Object.keys(payload),['purpose','sourceParent','sourceParentTree','core','prefix','production','helpers']);assert.equal(payload.purpose,'afw.r3-delivery.successor-round5-data.v1');assert.equal(payload.sourceParent,'bfa80fac58ecb60bb3c9bcd458da6f393b301f70');assert.equal(payload.sourceParentTree,'d17f87ef49892e6a4c0ec50dd2436b0697b9f45f');assert.deepEqual(payload.core,{"count":3201,"bytes":324448,"sha256":"aefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703"});assert.deepEqual(payload.prefix,{"blob":"71fabddb7fcee9f436ce3ea95785c3a2ee5afe70","bytes":2260109,"sha256":"9b49c2699725fa9148202d046bc3f050d151313061eae17bfa67494559476421"});
  const prod=payload.production;assert.deepEqual(Object.keys(prod),['blob','bytes','sha256','count','setSha256','data']);assert.equal(prod.count,18);assert.equal(prod.blob,'b88ebef9a2aa979772d20bfb778cbfe463dc3011');assert.equal(prod.bytes,95518);assert.equal(prod.sha256,'cfcb0dc7992d27246dc785ef2991104f6715e61c9aa49cfddc0317b219e6ac91');assert.equal(prod.setSha256,'71b4454f4cd90f716852bbdbb44f686d7f46191e8d93f890c465a7cb5f29d9af');
  const frozen=Buffer.from(prod.data);assert.equal(frozen.length,prod.bytes);assert.equal(sha(frozen),prod.sha256);assert.equal(blob(frozen),prod.blob);const original=JSON.parse(prod.data);assert.equal(JSON.stringify(original)+'\n',prod.data);assert.equal(original.productionCount,18);assert.equal(Object.keys(original.programs).length,18);
  const originalPins={};for(const[name,p]of Object.entries(original.programs)){const b=Buffer.from(p.content);assert.deepEqual(Object.keys(p),['bytes','sha256','blob','content']);assert.equal(b.length,p.bytes);assert.equal(sha(b),p.sha256);assert.equal(blob(b),p.blob);originalPins[name]={bytes:p.bytes,sha256:p.sha256,blob:p.blob};}assert.equal(sha(Buffer.from(JSON.stringify(originalPins)+'\n')),prod.setSha256);
  // Frozen18 remain DATA. No production main/original readonly CLI/Native import, materialization or call.
- const expected={"io.mjs":{"bytes":1815,"sha256":"b7d4ee0b8786c52a26857a8e203a710017b40dc8f5636a1d387638b9ec78eb47","blob":"8bb9a8ab8ddf81689ee890252579c1fd41dfdf52"},"emitter.mjs":{"bytes":3511,"sha256":"02f80480dbc8bc8700d0ecf3a57e65f855954ca64b379d29eefdb75c6d7db760","blob":"f9eee51fbdb89d0e130f8137d6a48ae787904f66"},"source-provenance.mjs":{"bytes":6690,"sha256":"b4d0872044216a275458d14b838ecf57628780092767ea88910dce18585408ce","blob":"fc6b339e54bf0fe91ad73f9b744ab7d46df35b0d"},"raw-sample.mjs":{"bytes":4289,"sha256":"1b594a7768a69cba5db1f41e83eb2a941f6451c82584490fdb77ba1fea85e9fc","blob":"8cdabb2324ae97b04fa17350846e24d666cd3536"},"site-schema.json":{"bytes":12651,"sha256":"5b55423937bbe38a18f1bbb8196d8cd85336d81187810b8c5b5abe8a593c37fd","blob":"4871edc102386fe6db65c773e51c21ecb94897e3"},"site-map.json":{"bytes":6630,"sha256":"1be6536669654bcc8c181ed7057b189352bef9b0587eb75f4124500477e4f2fe","blob":"57c5a96710f0a2d97656b400882d8b4b4a1a7e2f"},"envelope-schema.json":{"bytes":5616,"sha256":"49c2a27cf977f0c9247fb8f20539fb29a9ca002294d86eeb0d9db8f876e090e5","blob":"90831bbc3035d944c4ae8f96d2cfa6b24362eb9f"},"boundary.py":{"bytes":12562,"sha256":"27274120076048fd6f63b122b5534d8d06e97a2d4cf36461c1f710c605accdf4","blob":"554a2b2d2a8e3f365533f0df3006bcce1e409698"},"delivery-schema.json":{"bytes":1380,"sha256":"d8332c8bf26c4224bd2a5da321dc50a28a2d6391b294bc262a438c2638fa2f60","blob":"ae706e0e659d0ee7647bbec8e6b3d9ebbcac3df8"},"unavailable-schema.json":{"bytes":1315,"sha256":"10d6dee3228f75a1ea09ebfa365287a460ec06537c8c0a3e3bb11702605806f9","blob":"4a310ddcef7b1b7bf0755bf56b760486254cf8c6"},"controls-schema.json":{"bytes":4681,"sha256":"2d0a4c404abfb107e44ab369f2998b1bbbbba2734cbf993acf8c8f2c0fe47d83","blob":"8586d4387a5fcd95b18d7c966cf841432330a789"},"matrix.json":{"bytes":24054,"sha256":"0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e","blob":"5b829c768ed3d7af03d5eb3f1870599d39bfd083"},"shape.mjs":{"bytes":843,"sha256":"82224496e7db35a1daf7168591cb2123edbb3242331a314680f13d05b3bfef5e","blob":"df49410ebf42b4fbc9a8c032f81a0edc8fb95d0b"},"control-proof.mjs":{"bytes":2206,"sha256":"a7318fd9452f0254fdb9ae1261040ab944ce2d56c443004579c51e55c2c63c71","blob":"ab38574f5fe697fd9f0d48f9ade065749f4a0c14"},"site-receiver.mjs":{"bytes":5460,"sha256":"0d346b88c9594c45ef207f9fa4b57c984d13a3e64943904f880e2e2b96377ad2","blob":"c2cf804b6d427b5fc40da2b7d1375785a0a2f459"},"normalized-sample.mjs":{"bytes":3987,"sha256":"2bee6afaa30f01f1f497512d595f24f3a0c92269e3b4ed7e2d2e349ae5b4419f","blob":"f7c2fefcc9df568a8453d876072a23a790b94fcd"},"witness.mjs":{"bytes":1044,"sha256":"336df41b1994c8a315e4f56d976ddd0c9922397c702a02869ac8d44f42a8629a","blob":"b207c0c9ea759a9a146783b8818276444bef155b"},"fixtures.json":{"bytes":7988,"sha256":"06b7dc9e63c178b6b823db1ee56049ce4d1406861df240ca2fbc119d2df45bc9","blob":"f29e76fd04627ebe5d1100007808610ebc240571"},"controls.mjs":{"bytes":31799,"sha256":"060c5b493d3c832efb057e786ccb622adfef0c14233cf5e394b053485981e7df","blob":"b9b58c4a22f04b177f92dcbf8841cfc77f648c86"},"examples.json":{"bytes":22739,"sha256":"4f8da5a563bb0498cc506d693421853777ba7efb67d42da44b1889e5fef7b945","blob":"6f28d4f4479fb093aec3188d21b1796fd7c3fff2"},"controls-boundary.py":{"bytes":12908,"sha256":"6e3dcd0c4f262a509b75499674375eaa3d91b9e83789f03689862f51734fc3d7","blob":"b6c39695cdca9963d083842b114b7e4fb59e6392"},"controls-unavailable-example.json":{"bytes":568,"sha256":"7544b33859efe6ba2f6f1789e709f89f5f94f08352dd4fe4b14d700b19b22644","blob":"beedc03c8066cef6e6a24914d5334f99183d014b"},"outer.mjs":{"bytes":25947,"sha256":"62f2faa1bff1a2aa2438e8c1794361910e44a6db9c632daa28185adc647bf515","blob":"c74d74879d6935c47d50b1233dad4027e6704365"},"delivery-entry.sh":{"bytes":24001,"sha256":"3939353266b5045bd3c80bd6a6a379bfe6d44ad9264c42120b4c93829ff536cc","blob":"7ccc96503fb2f6a8aef73ed3352c9e35d73e2aeb"},"controls-entry.sh":{"bytes":24046,"sha256":"e7cacf9f8d5b7fc0af3e70c50131b316b8930d7016fa7c70d3914a176c3accae","blob":"4334648780a97997798b3d2128c14b529845aedd"},"oracle.mjs":{"bytes":1877,"sha256":"37c8724ced0eaa42bd54aa01aef1af7c3a7107ff3e78243e1f3d04da841fa4d1","blob":"652201ebe699664b97a5bc3d7c815a02dd889805"},"lifetime.py":{"bytes":16025,"sha256":"ae23b6e242cb41d3978b391c3bde1095ee7e0c0c717db98a598fe8fd9dcb2a27","blob":"8f54bc78915b8166732bd1bf94166db90b47aec0"},"delivery-outer.mjs":{"bytes":25986,"sha256":"d32eaeb8d09e1d50dd14195fecec7606d457004ea6f61084900b94547cc6899f","blob":"aac76e8c15a01cbb308ba63ad7dec19e2d5ebb76"},"controls-outer.mjs":{"bytes":25986,"sha256":"ada3cc7cf36a742d71c6ed12a7b5d15b91d56c4353aad02318a871ec370e4c35","blob":"e62dd9c4760da521b84f23b1c87855070767aac0"},"missing-cwd-entry.sh":{"bytes":24118,"sha256":"7633134c3e87036b7aa381b9f4efe8290e1639906e57c119b9607d6de68a99ea","blob":"c19542226782b00d78133132d6027ff0426a1e5c"},"race-creator.mjs":{"bytes":777,"sha256":"2657c30db6cff046599ff3d9cd2cdf7c3c312252b9636741627871d090372575","blob":"a6d47254adbf330a09b879a3a9b20ae4de476e73"},"lifetime-controls.py":{"bytes":12219,"sha256":"d67b5c8c8e127c359f8d2b5d7da30da809b8d91bfb77759df4bbf9ecaaf53c59","blob":"21b0b82242a76efd94d34fe1f722e04fda6cd489"},"authority-anchor.json":{"bytes":1964,"sha256":"e08d9864b16a1534b71344b817a6d3a78697d8d51af8ea798229a5f16d4b6407","blob":"1bed486f15a8743ef7c68470772835aaf4946a40"}},names=Object.keys(expected);assert.equal(names.length,33);assert.deepEqual(Object.keys(payload.helpers),names);
+ const expected={"io.mjs":{"bytes":1815,"sha256":"b7d4ee0b8786c52a26857a8e203a710017b40dc8f5636a1d387638b9ec78eb47","blob":"8bb9a8ab8ddf81689ee890252579c1fd41dfdf52"},"emitter.mjs":{"bytes":3511,"sha256":"02f80480dbc8bc8700d0ecf3a57e65f855954ca64b379d29eefdb75c6d7db760","blob":"f9eee51fbdb89d0e130f8137d6a48ae787904f66"},"source-provenance.mjs":{"bytes":6690,"sha256":"b4d0872044216a275458d14b838ecf57628780092767ea88910dce18585408ce","blob":"fc6b339e54bf0fe91ad73f9b744ab7d46df35b0d"},"raw-sample.mjs":{"bytes":4289,"sha256":"1b594a7768a69cba5db1f41e83eb2a941f6451c82584490fdb77ba1fea85e9fc","blob":"8cdabb2324ae97b04fa17350846e24d666cd3536"},"site-schema.json":{"bytes":12651,"sha256":"5b55423937bbe38a18f1bbb8196d8cd85336d81187810b8c5b5abe8a593c37fd","blob":"4871edc102386fe6db65c773e51c21ecb94897e3"},"site-map.json":{"bytes":6630,"sha256":"1be6536669654bcc8c181ed7057b189352bef9b0587eb75f4124500477e4f2fe","blob":"57c5a96710f0a2d97656b400882d8b4b4a1a7e2f"},"envelope-schema.json":{"bytes":5616,"sha256":"49c2a27cf977f0c9247fb8f20539fb29a9ca002294d86eeb0d9db8f876e090e5","blob":"90831bbc3035d944c4ae8f96d2cfa6b24362eb9f"},"boundary.py":{"bytes":12562,"sha256":"27274120076048fd6f63b122b5534d8d06e97a2d4cf36461c1f710c605accdf4","blob":"554a2b2d2a8e3f365533f0df3006bcce1e409698"},"delivery-schema.json":{"bytes":1380,"sha256":"d8332c8bf26c4224bd2a5da321dc50a28a2d6391b294bc262a438c2638fa2f60","blob":"ae706e0e659d0ee7647bbec8e6b3d9ebbcac3df8"},"unavailable-schema.json":{"bytes":1315,"sha256":"10d6dee3228f75a1ea09ebfa365287a460ec06537c8c0a3e3bb11702605806f9","blob":"4a310ddcef7b1b7bf0755bf56b760486254cf8c6"},"controls-schema.json":{"bytes":4681,"sha256":"2d0a4c404abfb107e44ab369f2998b1bbbbba2734cbf993acf8c8f2c0fe47d83","blob":"8586d4387a5fcd95b18d7c966cf841432330a789"},"matrix.json":{"bytes":24054,"sha256":"0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e","blob":"5b829c768ed3d7af03d5eb3f1870599d39bfd083"},"shape.mjs":{"bytes":843,"sha256":"82224496e7db35a1daf7168591cb2123edbb3242331a314680f13d05b3bfef5e","blob":"df49410ebf42b4fbc9a8c032f81a0edc8fb95d0b"},"control-proof.mjs":{"bytes":2206,"sha256":"a7318fd9452f0254fdb9ae1261040ab944ce2d56c443004579c51e55c2c63c71","blob":"ab38574f5fe697fd9f0d48f9ade065749f4a0c14"},"site-receiver.mjs":{"bytes":5460,"sha256":"0d346b88c9594c45ef207f9fa4b57c984d13a3e64943904f880e2e2b96377ad2","blob":"c2cf804b6d427b5fc40da2b7d1375785a0a2f459"},"normalized-sample.mjs":{"bytes":3987,"sha256":"2bee6afaa30f01f1f497512d595f24f3a0c92269e3b4ed7e2d2e349ae5b4419f","blob":"f7c2fefcc9df568a8453d876072a23a790b94fcd"},"witness.mjs":{"bytes":1044,"sha256":"336df41b1994c8a315e4f56d976ddd0c9922397c702a02869ac8d44f42a8629a","blob":"b207c0c9ea759a9a146783b8818276444bef155b"},"fixtures.json":{"bytes":7988,"sha256":"06b7dc9e63c178b6b823db1ee56049ce4d1406861df240ca2fbc119d2df45bc9","blob":"f29e76fd04627ebe5d1100007808610ebc240571"},"controls.mjs":{"bytes":31799,"sha256":"060c5b493d3c832efb057e786ccb622adfef0c14233cf5e394b053485981e7df","blob":"b9b58c4a22f04b177f92dcbf8841cfc77f648c86"},"examples.json":{"bytes":22739,"sha256":"4f8da5a563bb0498cc506d693421853777ba7efb67d42da44b1889e5fef7b945","blob":"6f28d4f4479fb093aec3188d21b1796fd7c3fff2"},"controls-boundary.py":{"bytes":12908,"sha256":"6e3dcd0c4f262a509b75499674375eaa3d91b9e83789f03689862f51734fc3d7","blob":"b6c39695cdca9963d083842b114b7e4fb59e6392"},"controls-unavailable-example.json":{"bytes":568,"sha256":"7544b33859efe6ba2f6f1789e709f89f5f94f08352dd4fe4b14d700b19b22644","blob":"beedc03c8066cef6e6a24914d5334f99183d014b"},"outer.mjs":{"bytes":25947,"sha256":"62f2faa1bff1a2aa2438e8c1794361910e44a6db9c632daa28185adc647bf515","blob":"c74d74879d6935c47d50b1233dad4027e6704365"},"delivery-entry.sh":{"bytes":24013,"sha256":"63b7e32a4291e5a1b2fc3753a5ae89758dcf0913f6f2bf2d558bc3a0dd9f2961","blob":"2477c393fbc7d9883894ef7299b4f749cc3857ab"},"controls-entry.sh":{"bytes":24058,"sha256":"e874d2de7710156e11726c7bd01626faa5351f94514cf0c42878e679981ad899","blob":"f0825d011a5e7942194a157a327ef7c42548180c"},"oracle.mjs":{"bytes":1877,"sha256":"37c8724ced0eaa42bd54aa01aef1af7c3a7107ff3e78243e1f3d04da841fa4d1","blob":"652201ebe699664b97a5bc3d7c815a02dd889805"},"lifetime.py":{"bytes":16073,"sha256":"f2b319e2a98a0959e421e80d7f94662476508f2ae6bc7cff2f9c6f8f0e17a791","blob":"765573c5eeaf83add464e94a8240dcd7a90786d0"},"delivery-outer.mjs":{"bytes":25986,"sha256":"d32eaeb8d09e1d50dd14195fecec7606d457004ea6f61084900b94547cc6899f","blob":"aac76e8c15a01cbb308ba63ad7dec19e2d5ebb76"},"controls-outer.mjs":{"bytes":25986,"sha256":"ada3cc7cf36a742d71c6ed12a7b5d15b91d56c4353aad02318a871ec370e4c35","blob":"e62dd9c4760da521b84f23b1c87855070767aac0"},"missing-cwd-entry.sh":{"bytes":24130,"sha256":"e625cd8b88726576b278099856bd6b3126c02da4f31c387ba49ced923a5fa9fc","blob":"3666fdd52620bd2a30bfa3e100897b2fab1610c1"},"race-creator.mjs":{"bytes":777,"sha256":"2657c30db6cff046599ff3d9cd2cdf7c3c312252b9636741627871d090372575","blob":"a6d47254adbf330a09b879a3a9b20ae4de476e73"},"lifetime-controls.py":{"bytes":12219,"sha256":"d67b5c8c8e127c359f8d2b5d7da30da809b8d91bfb77759df4bbf9ecaaf53c59","blob":"21b0b82242a76efd94d34fe1f722e04fda6cd489"},"authority-anchor.json":{"bytes":1964,"sha256":"e08d9864b16a1534b71344b817a6d3a78697d8d51af8ea798229a5f16d4b6407","blob":"1bed486f15a8743ef7c68470772835aaf4946a40"}},names=Object.keys(expected);assert.equal(names.length,33);assert.deepEqual(Object.keys(payload.helpers),names);
  for(const name of names){assert.match(name,/^[a-z0-9][a-z0-9.-]{0,63}$/);const content=payload.helpers[name];assert.equal(typeof content,'string');const b=Buffer.from(content),pin=expected[name];assert(b.length<=32768);assert.equal(b.length,pin.bytes);assert.equal(sha(b),pin.sha256);assert.equal(blob(b),pin.blob);}
  assert.equal(sha(Buffer.from(payload.helpers['matrix.json'])),expected['matrix.json'].sha256);assert.equal(expected['matrix.json'].blob,'5b829c768ed3d7af03d5eb3f1870599d39bfd083');
  assert.equal(fs.realpathSync(e.RUNNER_TEMP),e.RUNNER_TEMP);const temp=fs.lstatSync(e.RUNNER_TEMP);assert(temp.isDirectory()&&temp.uid===process.getuid()&&!(temp.mode&0o022));
  const root=e.RUNNER_TEMP+'/afw-r3-delivery';fs.mkdirSync(root,{mode:0o700});for(const name of names)fs.writeFileSync(root+'/'+name,payload.helpers[name],{mode:0o600,flag:'wx'});
  for(const name of names){const b=fs.readFileSync(root+'/'+name);assert.equal(b.length,expected[name].bytes);assert.equal(sha(b),expected[name].sha256);assert.equal(blob(b),expected[name].blob);}
  const context={purpose:'afw.r3-delivery.binding.v1',source:e.GITHUB_SHA,sourceTree,run:e.GITHUB_RUN_ID,attempt:1,job:'readonly',node:process.versions.node};fs.writeFileSync(root+'/context.json',JSON.stringify(context),{mode:0o600,flag:'wx'});r3BootstrapAdmitted=true;
 }catch{}
```

## Factored entry delivery-entry.sh
Non-pin-line diff: (empty, exact equality of all non-pin lines)
Full reversible diff blob: aa8cefc3de954efca00177e504b0d8726233c231. Kernel snapshot now765573c5/16073B/SHAf2b319e2; three module bodies unchanged, bootstrap module6997a425/42707B/SHA c9b3cbf4. All8verified independently; fd5 fix byteexact.

## Factored entry controls-entry.sh
Non-pin-line diff: (empty, exact equality of all non-pin lines)
Full reversible diff blob: f54a1aa0092561d3e1a0c2ac715c753e97656650. Kernel snapshot now765573c5/16073B/SHAf2b319e2; three module bodies unchanged, bootstrap module6997a425/42707B/SHA c9b3cbf4. All8verified independently; fd5 fix byteexact.

## Factored entry missing-cwd-entry.sh
Non-pin-line diff: (empty, exact equality of all non-pin lines)
Full reversible diff blob: 4ec6acaa44195f0cdc071ef285a51184cb0f7acb. Kernel snapshot now765573c5/16073B/SHAf2b319e2; three module bodies unchanged, bootstrap module6997a425/42707B/SHA c9b3cbf4. All8verified independently; fd5 fix byteexact.

## Factored entry bootstrap-entry.py
Non-pin-line diff: (empty, exact equality of all non-pin lines)
Full reversible diff blob: 25c4d9aa1d07d2b07c15105d22372ac67867f034. Kernel snapshot now765573c5/16073B/SHAf2b319e2; three module bodies unchanged, bootstrap module6997a425/42707B/SHA c9b3cbf4. All8verified independently; fd5 fix byteexact.

## Generated bootstrap/workflow relation
bootstrap-program new prelude is exact prefix at0; entire continuation after that prefix byteexact to normalR5. BothF7 Pythonhere-docs exactly new bootstrap-entry, all otherF7 bytes equal normalR5 after only declared workflow title/message renames. Node22.23.4/actions pins/readonly/step/clocks unchanged. inactiveif false; activeexactrepo/ref/push/attempt1/message. imagecleanup unchanged.

## Complete immutable diff index
{
  "delivery-entry.sh": "aa8cefc3de954efca00177e504b0d8726233c231",
  "controls-entry.sh": "f54a1aa0092561d3e1a0c2ac715c753e97656650",
  "lifetime.py": "e20fd63643db0a3fdec8fc7f7910e83212c86ed3",
  "missing-cwd-entry.sh": "4ec6acaa44195f0cdc071ef285a51184cb0f7acb",
  "bootstrap-prelude.mjs": "f0057335014f38ab8bc520fdbe60c9d0e97b2230",
  "bootstrap-program.mjs": "d3178d039c612cd6ecd30564bf0ecbb88e1ad105",
  "bootstrap-entry.py": "25c4d9aa1d07d2b07c15105d22372ac67867f034",
  "image-cleanup.py": "e1b34421f5ca6d8286349a05b9cf9470b0d8aeec",
  "inactive-f7.yml": "c23dbd0c11453a02ecb8bfadc13a16a4ceb6c82d",
  "active-f7.yml": "5fa9d3bd139d7f0b806cc0207782cd187177ff80"
}

## Typed39 full manifest
{"io.mjs":{"blob":"8bb9a8ab8ddf81689ee890252579c1fd41dfdf52","bytes":1815,"sha256":"b7d4ee0b8786c52a26857a8e203a710017b40dc8f5636a1d387638b9ec78eb47","kind":"literal_piece","cap":32768},"emitter.mjs":{"blob":"f9eee51fbdb89d0e130f8137d6a48ae787904f66","bytes":3511,"sha256":"02f80480dbc8bc8700d0ecf3a57e65f855954ca64b379d29eefdb75c6d7db760","kind":"literal_piece","cap":32768},"source-provenance.mjs":{"blob":"fc6b339e54bf0fe91ad73f9b744ab7d46df35b0d","bytes":6690,"sha256":"b4d0872044216a275458d14b838ecf57628780092767ea88910dce18585408ce","kind":"literal_piece","cap":32768},"raw-sample.mjs":{"blob":"8cdabb2324ae97b04fa17350846e24d666cd3536","bytes":4289,"sha256":"1b594a7768a69cba5db1f41e83eb2a941f6451c82584490fdb77ba1fea85e9fc","kind":"literal_piece","cap":32768},"site-schema.json":{"blob":"4871edc102386fe6db65c773e51c21ecb94897e3","bytes":12651,"sha256":"5b55423937bbe38a18f1bbb8196d8cd85336d81187810b8c5b5abe8a593c37fd","kind":"literal_piece","cap":32768},"site-map.json":{"blob":"57c5a96710f0a2d97656b400882d8b4b4a1a7e2f","bytes":6630,"sha256":"1be6536669654bcc8c181ed7057b189352bef9b0587eb75f4124500477e4f2fe","kind":"literal_piece","cap":32768},"envelope-schema.json":{"blob":"90831bbc3035d944c4ae8f96d2cfa6b24362eb9f","bytes":5616,"sha256":"49c2a27cf977f0c9247fb8f20539fb29a9ca002294d86eeb0d9db8f876e090e5","kind":"literal_piece","cap":32768},"boundary.py":{"blob":"554a2b2d2a8e3f365533f0df3006bcce1e409698","bytes":12562,"sha256":"27274120076048fd6f63b122b5534d8d06e97a2d4cf36461c1f710c605accdf4","kind":"literal_piece","cap":32768},"delivery-schema.json":{"blob":"ae706e0e659d0ee7647bbec8e6b3d9ebbcac3df8","bytes":1380,"sha256":"d8332c8bf26c4224bd2a5da321dc50a28a2d6391b294bc262a438c2638fa2f60","kind":"literal_piece","cap":32768},"unavailable-schema.json":{"blob":"4a310ddcef7b1b7bf0755bf56b760486254cf8c6","bytes":1315,"sha256":"10d6dee3228f75a1ea09ebfa365287a460ec06537c8c0a3e3bb11702605806f9","kind":"literal_piece","cap":32768},"controls-schema.json":{"blob":"8586d4387a5fcd95b18d7c966cf841432330a789","bytes":4681,"sha256":"2d0a4c404abfb107e44ab369f2998b1bbbbba2734cbf993acf8c8f2c0fe47d83","kind":"literal_piece","cap":32768},"matrix.json":{"blob":"5b829c768ed3d7af03d5eb3f1870599d39bfd083","bytes":24054,"sha256":"0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e","kind":"literal_piece","cap":32768},"shape.mjs":{"blob":"df49410ebf42b4fbc9a8c032f81a0edc8fb95d0b","bytes":843,"sha256":"82224496e7db35a1daf7168591cb2123edbb3242331a314680f13d05b3bfef5e","kind":"literal_piece","cap":32768},"control-proof.mjs":{"blob":"ab38574f5fe697fd9f0d48f9ade065749f4a0c14","bytes":2206,"sha256":"a7318fd9452f0254fdb9ae1261040ab944ce2d56c443004579c51e55c2c63c71","kind":"literal_piece","cap":32768},"site-receiver.mjs":{"blob":"c2cf804b6d427b5fc40da2b7d1375785a0a2f459","bytes":5460,"sha256":"0d346b88c9594c45ef207f9fa4b57c984d13a3e64943904f880e2e2b96377ad2","kind":"literal_piece","cap":32768},"normalized-sample.mjs":{"blob":"f7c2fefcc9df568a8453d876072a23a790b94fcd","bytes":3987,"sha256":"2bee6afaa30f01f1f497512d595f24f3a0c92269e3b4ed7e2d2e349ae5b4419f","kind":"literal_piece","cap":32768},"witness.mjs":{"blob":"b207c0c9ea759a9a146783b8818276444bef155b","bytes":1044,"sha256":"336df41b1994c8a315e4f56d976ddd0c9922397c702a02869ac8d44f42a8629a","kind":"literal_piece","cap":32768},"fixtures.json":{"blob":"f29e76fd04627ebe5d1100007808610ebc240571","bytes":7988,"sha256":"06b7dc9e63c178b6b823db1ee56049ce4d1406861df240ca2fbc119d2df45bc9","kind":"literal_piece","cap":32768},"controls.mjs":{"blob":"b9b58c4a22f04b177f92dcbf8841cfc77f648c86","bytes":31799,"sha256":"060c5b493d3c832efb057e786ccb622adfef0c14233cf5e394b053485981e7df","kind":"literal_piece","cap":32768},"examples.json":{"blob":"6f28d4f4479fb093aec3188d21b1796fd7c3fff2","bytes":22739,"sha256":"4f8da5a563bb0498cc506d693421853777ba7efb67d42da44b1889e5fef7b945","kind":"literal_piece","cap":32768},"controls-boundary.py":{"blob":"b6c39695cdca9963d083842b114b7e4fb59e6392","bytes":12908,"sha256":"6e3dcd0c4f262a509b75499674375eaa3d91b9e83789f03689862f51734fc3d7","kind":"literal_piece","cap":32768},"controls-unavailable-example.json":{"blob":"beedc03c8066cef6e6a24914d5334f99183d014b","bytes":568,"sha256":"7544b33859efe6ba2f6f1789e709f89f5f94f08352dd4fe4b14d700b19b22644","kind":"literal_piece","cap":32768},"outer.mjs":{"blob":"c74d74879d6935c47d50b1233dad4027e6704365","bytes":25947,"sha256":"62f2faa1bff1a2aa2438e8c1794361910e44a6db9c632daa28185adc647bf515","kind":"literal_piece","cap":32768},"delivery-entry.sh":{"blob":"2477c393fbc7d9883894ef7299b4f749cc3857ab","bytes":24013,"sha256":"63b7e32a4291e5a1b2fc3753a5ae89758dcf0913f6f2bf2d558bc3a0dd9f2961","kind":"literal_piece","cap":32768},"controls-entry.sh":{"blob":"f0825d011a5e7942194a157a327ef7c42548180c","bytes":24058,"sha256":"e874d2de7710156e11726c7bd01626faa5351f94514cf0c42878e679981ad899","kind":"literal_piece","cap":32768},"oracle.mjs":{"blob":"652201ebe699664b97a5bc3d7c815a02dd889805","bytes":1877,"sha256":"37c8724ced0eaa42bd54aa01aef1af7c3a7107ff3e78243e1f3d04da841fa4d1","kind":"literal_piece","cap":32768},"lifetime.py":{"blob":"765573c5eeaf83add464e94a8240dcd7a90786d0","bytes":16073,"sha256":"f2b319e2a98a0959e421e80d7f94662476508f2ae6bc7cff2f9c6f8f0e17a791","kind":"literal_piece","cap":32768},"delivery-outer.mjs":{"blob":"aac76e8c15a01cbb308ba63ad7dec19e2d5ebb76","bytes":25986,"sha256":"d32eaeb8d09e1d50dd14195fecec7606d457004ea6f61084900b94547cc6899f","kind":"literal_piece","cap":32768},"controls-outer.mjs":{"blob":"e62dd9c4760da521b84f23b1c87855070767aac0","bytes":25986,"sha256":"ada3cc7cf36a742d71c6ed12a7b5d15b91d56c4353aad02318a871ec370e4c35","kind":"literal_piece","cap":32768},"missing-cwd-entry.sh":{"blob":"3666fdd52620bd2a30bfa3e100897b2fab1610c1","bytes":24130,"sha256":"e625cd8b88726576b278099856bd6b3126c02da4f31c387ba49ced923a5fa9fc","kind":"literal_piece","cap":32768},"race-creator.mjs":{"blob":"a6d47254adbf330a09b879a3a9b20ae4de476e73","bytes":777,"sha256":"2657c30db6cff046599ff3d9cd2cdf7c3c312252b9636741627871d090372575","kind":"literal_piece","cap":32768},"lifetime-controls.py":{"blob":"21b0b82242a76efd94d34fe1f722e04fda6cd489","bytes":12219,"sha256":"d67b5c8c8e127c359f8d2b5d7da30da809b8d91bfb77759df4bbf9ecaaf53c59","kind":"literal_piece","cap":32768},"authority-anchor.json":{"blob":"1bed486f15a8743ef7c68470772835aaf4946a40","bytes":1964,"sha256":"e08d9864b16a1534b71344b817a6d3a78697d8d51af8ea798229a5f16d4b6407","kind":"literal_piece","cap":32768},"bootstrap-prelude.mjs":{"blob":"decd33bf2bc63db3d3c891c6cbc5aeae2b69056b","bytes":16503,"sha256":"a9f6daeb27b2e63e1305bbf981f410e205815cdc4c513d0f5b4f43d4a1a17b1a","kind":"literal_piece","cap":32768},"bootstrap-program.mjs":{"blob":"6997a425eca4b66309b51ea19db6597e13a8f262","bytes":42707,"sha256":"c9b3cbf466232907677f8b63c2d62a7afca0cde4189c9f33264b470221a4a240","kind":"bootstrap_program","cap":65536},"bootstrap-entry.py":{"blob":"4a7aa3fdc3ed64a4c5887da7a9fd298335d1d667","bytes":30471,"sha256":"f36b1ebe70f71567de5832f0f24e8c93f05a83fb21eb6d6dc16c3fc4eeacf623","kind":"literal_piece","cap":32768},"image-cleanup.py":{"blob":"8b21083aa516439b63a6e99c059d82de76e8a443","bytes":1828,"sha256":"41fba6da9182935e7580bcdeabc41c4f47d307fea8cfabfd1b4ff7427cc9bd50","kind":"literal_piece","cap":32768},"inactive-f7.yml":{"blob":"fedb0b3d34bc8d4fc4097460732c01f771b1ad4f","bytes":38484,"sha256":"a7e7c380328e8f24a9e03eb033c120ffbb86110e98b1ed0dfd57bc3761a42a68","kind":"workflow","cap":73728},"active-f7.yml":{"blob":"cb3199f2a0e3f24096c73587eb8351ba63940250","bytes":38752,"sha256":"209b97e83aa3b33e8bb4e64ab704636ffcbdc65e1d14399157c6ac5e429d732d","kind":"workflow","cap":73728}}

## Brief/report/material
Brief9bec063cce6de47be74fe072fc500289d53ccaf7; adopted spec72d17e46d0d7e0683f31c3e2bb3556302a209044. Actor report0ff9fcf5d9be2c40faab421be8b6d2e3b68ffad6. Full index1a40f535b1e9d25c327a3ca02c337f807f3db382. All61objects Rootdocs0160f599. Full candidateSAMEf8bfa4f9/2481826B preserves2471214B prefix. Caps raw524288/gzip131072/base64174764/helper32768/bootstrap65536/workflow73728/report24576/SAME2600000; schema8586d438literal fixed,5462c75c historicalbundle. Matrix5b829c76/104 unchanged; fourfixedmutants unchanged. Sevenclaimsfalse always.


## FINAL actual evidence (supersedes draft pending status)
Fullactualreceipt:
```json
{
  "purpose": "afw.root.creator-continuity.actual-receipt.v1",
  "at": "2026-11-15 17:24:42 UTC",
  "source": "05d1a53692dc2b553620ff6267cef59cf36cf85c",
  "sourceTree": "b5a87f3b345a40df39282be4fe3705fd89d1c3ee",
  "run": 43740674443,
  "attempt": 1,
  "job": 132892914334,
  "jobName": "readonly",
  "step": "Run declared full104 controls only",
  "node": "22.23.4",
  "SourceRunConclusion": "failure",
  "SourceJobConclusion": "failure",
  "RootReceiver": "38749c663f4dd58fbb5f1a3c940a3820c4ff5100",
  "accepted": true,
  "controlsQualified": false,
  "record": {
    "purpose": "afw.r3-delivery.controls.v1",
    "source": "05d1a53692dc2b553620ff6267cef59cf36cf85c",
    "sourceTree": "b5a87f3b345a40df39282be4fe3705fd89d1c3ee",
    "run": "43740674443",
    "attempt": 1,
    "job": "readonly",
    "node": "22.23.4",
    "matrixSha256": "0ba8de6a133574e19678004b0f1c7e8c6a4121b3e02086e4f36454a7ed01dd6e",
    "allPassed": false,
    "expected": 104,
    "passed": 104,
    "failed": 0,
    "unknown": 0,
    "results": [
      {
        "id": "A01",
        "result": "passed"
      },
      {
        "id": "A02",
        "result": "passed"
      },
      {
        "id": "A03",
        "result": "passed"
      },
      {
        "id": "A04",
        "result": "passed"
      },
      {
        "id": "D01",
        "result": "passed"
      },
      {
        "id": "D02",
        "result": "passed"
      },
      {
        "id": "D03",
        "result": "passed"
      },
      {
        "id": "D04",
        "result": "passed"
      },
      {
        "id": "D05",
        "result": "passed"
      },
      {
        "id": "D06",
        "result": "passed"
      },
      {
        "id": "D07",
        "result": "passed"
      },
      {
        "id": "D08",
        "result": "passed"
      },
      {
        "id": "D09",
        "result": "passed"
      },
      {
        "id": "D10",
        "result": "passed"
      },
      {
        "id": "D11",
        "result": "passed"
      },
      {
        "id": "D12",
        "result": "passed"
      },
      {
        "id": "D13",
        "result": "passed"
      },
      {
        "id": "P01",
        "result": "passed"
      },
      {
        "id": "P02",
        "result": "passed"
      },
      {
        "id": "P03",
        "result": "passed"
      },
      {
        "id": "P04",
        "result": "passed"
      },
      {
        "id": "P05",
        "result": "passed"
      },
      {
        "id": "P06",
        "result": "passed"
      },
      {
        "id": "P07",
        "result": "passed"
      },
      {
        "id": "P08",
        "result": "passed"
      },
      {
        "id": "P09",
        "result": "passed"
      },
      {
        "id": "P10",
        "result": "passed"
      },
      {
        "id": "P11",
        "result": "passed"
      },
      {
        "id": "P12",
        "result": "passed"
      },
      {
        "id": "P13",
        "result": "passed"
      },
      {
        "id": "P14",
        "result": "passed"
      },
      {
        "id": "P15",
        "result": "passed"
      },
      {
        "id": "P16",
        "result": "passed"
      },
      {
        "id": "P17",
        "result": "passed"
      },
      {
        "id": "P18",
        "result": "passed"
      },
      {
        "id": "P19",
        "result": "passed"
      },
      {
        "id": "P20",
        "result": "passed"
      },
      {
        "id": "P21",
        "result": "passed"
      },
      {
        "id": "P22",
        "result": "passed"
      },
      {
        "id": "P23",
        "result": "passed"
      },
      {
        "id": "P24",
        "result": "passed"
      },
      {
        "id": "P25",
        "result": "passed"
      },
      {
        "id": "F01",
        "result": "passed"
      },
      {
        "id": "F02",
        "result": "passed"
      },
      {
        "id": "F03",
        "result": "passed"
      },
      {
        "id": "F04",
        "result": "passed"
      },
      {
        "id": "F05",
        "result": "passed"
      },
      {
        "id": "F06",
        "result": "passed"
      },
      {
        "id": "F07",
        "result": "passed"
      },
      {
        "id": "F08",
        "result": "passed"
      },
      {
        "id": "F09",
        "result": "passed"
      },
      {
        "id": "B01",
        "result": "passed"
      },
      {
        "id": "B02",
        "result": "passed"
      },
      {
        "id": "B03",
        "result": "passed"
      },
      {
        "id": "B04",
        "result": "passed"
      },
      {
        "id": "B05",
        "result": "passed"
      },
      {
        "id": "B06",
        "result": "passed"
      },
      {
        "id": "B07",
        "result": "passed"
      },
      {
        "id": "B08",
        "result": "passed"
      },
      {
        "id": "B09",
        "result": "passed"
      },
      {
        "id": "B10",
        "result": "passed"
      },
      {
        "id": "B11",
        "result": "passed"
      },
      {
        "id": "B12",
        "result": "passed"
      },
      {
        "id": "B13",
        "result": "passed"
      },
      {
        "id": "W01",
        "result": "passed"
      },
      {
        "id": "W02",
        "result": "passed"
      },
      {
        "id": "C01",
        "result": "passed"
      },
      {
        "id": "C02",
        "result": "passed"
      },
      {
        "id": "C03",
        "result": "passed"
      },
      {
        "id": "C04",
        "result": "passed"
      },
      {
        "id": "C05",
        "result": "passed"
      },
      {
        "id": "D14",
        "result": "passed"
      },
      {
        "id": "P26",
        "result": "passed"
      },
      {
        "id": "F10",
        "result": "passed"
      },
      {
        "id": "E01",
        "result": "passed"
      },
      {
        "id": "E02",
        "result": "passed"
      },
      {
        "id": "E03",
        "result": "passed"
      },
      {
        "id": "E04",
        "result": "passed"
      },
      {
        "id": "E05",
        "result": "passed"
      },
      {
        "id": "E06",
        "result": "passed"
      },
      {
        "id": "O01",
        "result": "passed"
      },
      {
        "id": "O02",
        "result": "passed"
      },
      {
        "id": "O03",
        "result": "passed"
      },
      {
        "id": "O04",
        "result": "passed"
      },
      {
        "id": "O05",
        "result": "passed"
      },
      {
        "id": "S01",
        "result": "passed"
      },
      {
        "id": "E07",
        "result": "passed"
      },
      {
        "id": "T01",
        "result": "passed"
      },
      {
        "id": "F11",
        "result": "passed"
      },
      {
        "id": "A05",
        "result": "passed"
      },
      {
        "id": "U01",
        "result": "passed"
      },
      {
        "id": "U02",
        "result": "passed"
      },
      {
        "id": "U03",
        "result": "passed"
      },
      {
        "id": "U04",
        "result": "passed"
      },
      {
        "id": "H01",
        "result": "passed"
      },
      {
        "id": "L01",
        "result": "passed"
      },
      {
        "id": "L02",
        "result": "passed"
      },
      {
        "id": "L03",
        "result": "passed"
      },
      {
        "id": "L04",
        "result": "passed"
      },
      {
        "id": "L05",
        "result": "passed"
      },
      {
        "id": "E08",
        "result": "passed"
      },
      {
        "id": "E09",
        "result": "passed"
      },
      {
        "id": "E10",
        "result": "passed"
      },
      {
        "id": "E11",
        "result": "passed"
      }
    ],
    "mutants": [
      {
        "id": "M_RAW",
        "expectedFailedIds": [
          "D02"
        ],
        "actualFailedIds": [
          "D02"
        ],
        "result": "passed"
      },
      {
        "id": "M_PROVENANCE",
        "expectedFailedIds": [
          "P06"
        ],
        "actualFailedIds": [
          "P06"
        ],
        "result": "unknown"
      },
      {
        "id": "M_OUTPUT",
        "expectedFailedIds": [
          "B05",
          "U01"
        ],
        "actualFailedIds": [],
        "result": "unknown"
      },
      {
        "id": "M_ASSOC",
        "expectedFailedIds": [
          "S01"
        ],
        "actualFailedIds": [],
        "result": "unknown"
      }
    ],
    "nativeBusinessCases": 0,
    "nonclaims": {
      "historicalCauseProven": false,
      "receiptAuthenticated": false,
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    "cleanup": {
      "complete": true,
      "failedInstances": [],
      "unknownInstances": []
    }
  },
  "joint": {
    "accepted": true,
    "controlsQualified": false,
    "jobQualified": false,
    "reviewEvidenceEligible": false,
    "reason": "controls_not_qualified",
    "NativeReleased": false,
    "operationalReadiness": false
  },
  "interpretation": "Actual baseline104passed/0failed/0unknown including L05; M_RAW passed exactD02; M_PROVENANCE unknown with actualFailedP06; M_OUTPUT/M_ASSOC unknown. Actual wire does not identify their underlying cause/per-case attempt coverage, so no budget/provider/credential inference. Whole qualification remains HELD. No automaticrerun, timer widening, skip, unknown substitution, Native or originalCLI. Kernel behavior new observation scoped only to this Source/run.",
  "nonclaims": {
    "historicalCauseProven": false,
    "receiptAuthenticated": false,
    "operationalReadiness": false,
    "completePackage": false,
    "PCoff": false,
    "globalNativeDrainVerified": false,
    "sdkNamespaceEmptyVerified": false
  }
}
```
Closureverified Sourceba7de48c7fff34b9921b67c22e9d88549c642249/treea7ffddf95f0bdfd6ba2b541d82c4b6917992e996, completeSAME2de216ee2492132B; originalF7/fullCore/Main/fiveactive0/closedheadruns0. New Source consumed. No API auth/Native/runtime/readiness/globaldrain/PCoff claim. Scoped task review required for BOTH spec compliance and quality. Do not rerun tests or execute Source locally; actuals attached. Deferred L05 diagnostic minors in reviewerafec2162 remain recorded and separate source projections, not normalR5 fields.
