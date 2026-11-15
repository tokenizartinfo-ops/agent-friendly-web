# Q1S Task1 — fix1 scoped re-review package

Fixbase previousreviewedSourceba064871e4a8e655a2a25aea3bd7219fdd286cd1; fixSource d58803469eef47866ede083ddb6a1ce9b22e4c13/tree6d018efd09dc7071e6cac428692fa4d23d57b1dd. Currentclosed dace0ec995e1f89599d3c1faf72b018db82e67a1/tree0ee8006a9b7f6461c4bd3d51e5c99ac8dcf4d3ec. Source-only fix1/5, olddelivery5/5separateclosed. NoSource/runtime/main/Core/Nativeauthoritytoreviewer.

Originalbrief89c86307; bindingfixbrief8114f3404b06087928eab4318f64b000f41753ff. Originalreviewa1ffca40e633ac7c00222383cb0030717b0af531. Fullappend-onlyreportwithactualcommands/output3ce3968097aa03f6f917565cd1002fe7a933329c, oldprefixcaaa90d0retained. Fixindex7479d7dbacf2e340d2b6aea448852a44790b801b. Bothblockingfindingsbelow; MinorM1originalVFSresetdeferredanduntouched.

## Findings — verbatim
1. **Critical — duplicate module binding prevents every unit assertion.** `unit-loader.mjs:59` redeclares the `const wire` of line 26 in the same try block (immutable loader fc82133f1f7339c2dfa7ddbbe99066151235830e; deployed `.github/workflows/afw-finite-budget-qualification.yml:104`, first declaration at line 71). The parser rejects the whole module before even the input guards run. This is the failure on the actual attempt. Give the decoded carrier JSON and returned unit frame distinct bindings and update their consumers; regenerate dependent artifacts. Cover the **assembled YAML heredoc**, not just the source fragments: a focused DATA regression should reject these colliding declarations in the consumed fixture and check the distinct names and use sites in both corrected loader and rendered workflow. That is a construction check, not an execution result. Only a separately authorized fresh gate on the corrected material can establish a valid unit frame and independently joined step conclusion; never retry the consumed head.

2. **Important — parse/startup diagnostics bypass the fixed stderr boundary.** `.github/workflows/afw-finite-budget-qualification.yml:45` launches Node directly with inherited stderr. The sanitizer at `unit-loader.mjs:72` cannot run when the module fails to parse. Renaming the duplicate repairs this particular parser error but leaves future parse/startup failures free to print offending Source lines/stacks; there is no 4096-byte bound or fixed failure marker at this outer boundary. The actual receipt establishes the parser diagnostic, not a leak of a secret or an observed cap overrun. Have the shell own the fixed failure marker and nonzero result for the Node invocation, suppressing raw child diagnostics without buffering them into logs. Keep valid stdout unchanged. Focused covering test for a permitted future validation context: a harmless malformed synthetic loader or child returning nonzero with oversized stderr must yield only the fixed error marker, no success frame, nonzero exit, and full104 ineligible. Check ordinary assertion failure and valid one-frame pass retain their behavior.


## Actual covering results and scope
# Q1S fix1 — actual Root receipt

{"purpose":"afw.serial-pin.fix1.actual-root-receipt.v1","source":"d58803469eef47866ede083ddb6a1ce9b22e4c13","sourceTree":"6d018efd09dc7071e6cac428692fa4d23d57b1dd","run":43762213703,"attempt":1,"jobId":132959307956,"job":"readonly","node":"22.23.4","conclusions":{"run":"failure","job":"failure","checkout":"success","setupNode":"success","boundary":"success","unit":"success","full104":"failure"},"boundaryControlsPassed":true,"unitControlsPassed":true,"preparation":{"caseInputs":520,"retargetCalls":1020,"renderedEntries":3060,"normalPinComputations":6120,"candidatePinComputations":626,"byteEquivalent":true,"readOrderPreserved":true,"mutants":{"M_LENGTH":"killed","M_SECOND":"killed","M_RECOMPUTE":"killed"},"syntheticOnly":true},"controls":{"accepted":true,"qualified":false,"baseline":{"expected":104,"passed":104,"failed":0,"unknown":0},"mutants":[{"id":"M_RAW","expectedFailedIds":["D02"],"actualFailedIds":["D02"],"result":"passed"},{"id":"M_PROVENANCE","expectedFailedIds":["P06"],"actualFailedIds":["P06"],"result":"unknown"},{"id":"M_OUTPUT","expectedFailedIds":["B05","U01"],"actualFailedIds":[],"result":"unknown"},{"id":"M_ASSOC","expectedFailedIds":["S01"],"actualFailedIds":[],"result":"unknown"}],"cleanup":{"complete":true,"failedInstances":[],"unknownInstances":[]}},"actualComplete520Proven":false,"currentUnknownCause":"not established by v1 summary; do not infer attempted mutant prefixes or reuse old408","sourceTiming":{"boundary":"2026-11-15T21:10:47Z..21:10:48Z","unit":"2026-11-15T21:10:48Z..21:10:59Z","full104":"2026-11-15T21:10:59Z..21:12:13Z","durationIsNotCauseProof":true},"receivers":{"boundary":"e1f19ada413d8dafc6fb20b9a62aa7e4a558aba6","unit":"af32d2b55898003dbb1db1fc7f7140f47101e920","controls":"38749c663f4dd58fbb5f1a3c940a3820c4ff5100","joint":"a1c901bda145a0f24d9f25b0772731f1ab43dc86","jointEligible":false},"frames":{"boundary":1,"unit":1,"controls":1,"unavailable":0,"stepMapping":[{"kind":"boundary","line":202,"step":4,"header":149,"nextHeader":203,"time":"2026-11-15T21:10:48.1313620Z"},{"kind":"unit","line":294,"step":5,"header":203,"nextHeader":295,"time":"2026-11-15T21:10:59.5944247Z"},{"kind":"controls","line":410,"step":6,"header":295,"nextHeader":null,"time":"2026-11-15T21:12:13.4015346Z"}]},"logsFetchedOnce":true,"OriginalCLIInvoked":0,"nativeBusinessCases":0,"nonclaims":{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}}

The two preflight steps passed in the actual fixed context. All104 baseline cases and the complete M_RAW mutant group passed their expected oracles. Remaining mutant summaries are unknown, with no new direct admission observation; full520 qualification is not established. The serial-cache path has now had its one materially changed full occurrence and is retired as a qualification strategy. Preserve the useful computation/equivalence result, do not retry the same Source or infer phase attempt counts/timing cause. After Source closure, scoped fix1 review and a new explicit qualification design/version are required. No Cloudflare/runtime/OriginalCLI/Native release.

Rootstrictactuale1/af32observedbothPASS, actualunitbyteequiv and6120->626 observed;104baselinePASS, M_RAWwholegroupPASS, remainingunknown. Fullqualification/I3NOTestablishedandcurrentunknowncausenotobserved. APIsteps4boundary/5unitSUCCESS and6fullFAILURE, run/jobFAILURE. ThreeuniqueactualframeslocatedaftermatchingRunheaderandbeforethenext/APIstep,Source/tree/run/contextmatch. LogsconsumedONCE; norefetch/rerun. C1/I1coveringtestsaretheactualboundary+unitsteps, notallfullqualification. Allchildfixturestdoutcapturednotforwarded; fourboundarycaseoutcomesclosedPASS. SourceclosedwithoriginalF7/fullSAME192f884c8df658b7e22dd4f67207fd376a4b216f2569436B/SHA7e93b5ab25e76421334183ae3681044a574f6c6e603790c9aa85d3a737a67c77, Main/Coreunchanged/fivequeues0/headruns0. NoNativeOriginalCLI.

## Exact unit-loader diff with context
```diff
--- a/unit-loader.mjs
+++ b/unit-loader.mjs
@@ -8,66 +8,67 @@
 const e=process.env,sha=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
 assert.equal(process.versions.node,'22.23.4');
 assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_EVENT_NAME,'push');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(e.GITHUB_JOB,'readonly');
 assert.equal(e.GITHUB_WORKFLOW_REF,'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101');
 for(const key of ['NODE_OPTIONS','NODE_PATH','AFW_SYN_CHECKPOINT_KEY','AFW_BUDGET_DIAGNOSTIC_CANDIDATE'])assert.equal(e[key],undefined);
 assert.match(e.GITHUB_SHA,/^[a-f0-9]{40}$/);assert.match(e.GITHUB_RUN_ID,/^[1-9][0-9]{0,19}$/);
 const git=(...args)=>execFileSync('git',args,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
 assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(git('rev-parse','--show-toplevel'),fs.realpathSync('.'));assert.equal(process.cwd(),fs.realpathSync('.'));
-assert.equal(git('log','-1','--format=%B'), 'AFW-SERIAL-PIN-QUALIFICATION-ONEUSE-20261115');
-const sourceTree=git('rev-parse','HEAD^{tree}');assert.match(sourceTree,/^[a-f0-9]{40}$/);
-const same='docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md',f7='.github/workflows/afw-finite-budget-qualification.yml';
-const tree=execFileSync('git',['ls-tree','-rz','--full-tree','HEAD'],{stdio:['ignore','pipe','pipe']});
-const rows=tree.toString('utf8').split('\0').filter(Boolean).map(x=>{const at=x.indexOf('\t');assert(at>0);return{tuple:x.slice(0,at),path:x.slice(at+1)};}).filter(x=>![same,f7].includes(x.path)).sort((a,b)=>Buffer.compare(Buffer.from(a.path),Buffer.from(b.path)));
-const core=Buffer.from(rows.map(x=>x.tuple+'\t'+x.path+'\0').join(''));assert.equal(rows.length,3201);assert.equal(core.length,324448);assert.equal(sha(core),'aefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703');execFileSync('git',['diff','--exit-code','HEAD','--'],{stdio:['ignore','pipe','pipe']});
-const st=fs.lstatSync(same);assert(st.isFile()&&!st.isSymbolicLink()&&st.size<=2600000);const bytes=fs.readFileSync(same);assert.equal(blob(bytes),git('rev-parse','HEAD:'+same));
- const prefix=bytes.subarray(0,2260109);assert.equal(prefix.length,2260109);assert.equal(sha(prefix),'9b49c2699725fa9148202d046bc3f050d151313061eae17bfa67494559476421');assert.equal(blob(prefix),'71fabddb7fcee9f436ce3ea95785c3a2ee5afe70');
- const text=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes),begin='<!-- AFW-R3-DELIVERY-SUCCESSOR-R5-DATA-V1:BEGIN -->',end='<!-- AFW-R3-DELIVERY-SUCCESSOR-R5-DATA-V1:END -->';assert.equal(text.split(begin).length,2);assert.equal(text.split(end).length,2);const first=text.indexOf(begin),last=text.indexOf(end);assert(last>first&&Buffer.byteLength(text.slice(0,first))>=prefix.length);
- const section=text.slice(first+begin.length,last);assert.match(section,/^\n[A-Za-z0-9+/=\n]+\n$/);const b64=section.replaceAll('\n',''),pins={"bytes":487208,"sha256":"087bba2182c131579e233f6c29daf1ee85e2aae41e77b66d6f93cc44cb5000c5","blob":"f9c8261c54f761b5c33ddc370dbe7b308648033b","compressed":{"bytes":120211,"sha256":"7e9aace1b1a3930a1a5234a2fdee5af68ebec77cc5b9818a6d342328047bf0e5","blob":"b3dfc078047bee03b5b42140783ee1dcf2409fd8"},"base64Characters":160284};assert.equal(b64.length,pins.base64Characters);assert(b64.length<=174764);const zip=Buffer.from(b64,'base64');assert.equal(zip.toString('base64'),b64);assert.equal(zip.length,pins.compressed.bytes);assert(zip.length<=131072);assert.equal(sha(zip),pins.compressed.sha256);assert.equal(blob(zip),pins.compressed.blob);
- const raw=gunzipSync(zip,{maxOutputLength:524288});assert.equal(raw.length,pins.bytes);assert.equal(sha(raw),pins.sha256);assert.equal(blob(raw),pins.blob);const wire=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(raw),payload=JSON.parse(wire);assert.equal(JSON.stringify(payload),wire);
- // Closed captured-original-creator continuity derivation; no caller patch/path/code.
- const ccPrefix=bytes.subarray(0,2471214);assert.equal(ccPrefix.length,2471214);assert.equal(sha(ccPrefix),'1ba61ebb62514c1bb2e5b7b6058dd5abad09ddc1d059483987262032e154928a');assert.equal(blob(ccPrefix),'2fcd79c7d0a2475f176dc03360df5980a58c3120');
- const ccSuffix=bytes.subarray(2471214,2481826);assert.equal(ccSuffix.length,10612);assert.equal(sha(ccSuffix),'cdfe4a0b495be82b9d2746a12f09a3cb24c100f940bb6cdbecaa0585f8a7fac5');
- const ccBegin='<!-- AFW-CREATOR-CONTINUITY-DATA-V1:BEGIN -->',ccEnd='<!-- AFW-CREATOR-CONTINUITY-DATA-V1:END -->';assert.equal(text.split(ccBegin).length,2);assert.equal(text.split(ccEnd).length,2);const ccFirst=text.indexOf(ccBegin),ccLast=text.indexOf(ccEnd);assert(ccLast>ccFirst&&Buffer.byteLength(text.slice(0,ccFirst))>=2471214);const ccOverlayText=text.slice(ccFirst+ccBegin.length,ccLast);assert.equal(sha(Buffer.from(ccOverlayText)),'a7e62d0ce31a094090c6b1524f34cc55b776a4938010a5ec1c310ca4ac6b712f');
- const ccOldKernel=payload.helpers['lifetime.py'];assert.equal(sha(Buffer.from(ccOldKernel)),'ae23b6e242cb41d3978b391c3bde1095ee7e0c0c717db98a598fe8fd9dcb2a27');assert.equal(ccOldKernel.split(" # AFW_LIFE_BEFORE_ARM\n").length,2);payload.helpers['lifetime.py']=ccOldKernel.replace(" # AFW_LIFE_BEFORE_ARM\n"," # AFW_LIFE_BEFORE_ARM\n if os.getppid()!=before[0]:raise CreatorDead()\n");
- const ccKernelPin=JSON.parse(ccOverlayText).kernelSnapshot;assert.deepEqual(Object.keys(ccKernelPin),['bytes','sha256','zipBytes','zipSha256','data','cap']);assert.equal(ccKernelPin.bytes,16073);assert.equal(ccKernelPin.cap,32768);assert.equal(ccKernelPin.sha256,'f2b319e2a98a0959e421e80d7f94662476508f2ae6bc7cff2f9c6f8f0e17a791');assert.equal(ccKernelPin.zipBytes,5078);assert.equal(ccKernelPin.zipSha256,'f0ef8e96c2f15251fbdbcb0abe801cbb981f5c97663233a0cae0520b261f29ed');assert.equal(sha(Buffer.from(ccKernelPin.data)),'1ba509cdcd9ecda3ae60b3db8f5876e1ddf17f5f9692bff77f113cef3e6356ef');const ccKernelZip=Buffer.from(ccKernelPin.data,'base64');assert.equal(ccKernelZip.toString('base64'),ccKernelPin.data);assert.equal(ccKernelZip.length,ccKernelPin.zipBytes);assert.equal(sha(ccKernelZip),ccKernelPin.zipSha256);assert.equal(gunzipSync(ccKernelZip,{maxOutputLength:32768}).toString('utf8'),payload.helpers['lifetime.py']);
- for(const name of ['delivery-entry.sh','controls-entry.sh','missing-cwd-entry.sh']){const prior=payload.helpers[name],lines=prior.split('\n').filter(line=>line.startsWith('_r3_kernel='));assert.equal(lines.length,1);const oldPin=JSON.parse(lines[0].slice('_r3_kernel='.length));assert.equal(oldPin.bytes,16025);assert.equal(oldPin.sha256,'ae23b6e242cb41d3978b391c3bde1095ee7e0c0c717db98a598fe8fd9dcb2a27');payload.helpers[name]=prior.replace(lines[0],'_r3_kernel='+JSON.stringify(ccKernelPin));}
- const ccResult=Buffer.from(JSON.stringify(payload));assert.equal(ccResult.length,487293);assert.equal(sha(ccResult),'dda3f25ef82cdf4e65814360b52aafa9ddf3ec2e57d1fa2f92e46466acfcd25b');assert.equal(blob(ccResult),'f23fcfebf3c72632327cf24babf2ff7ace22dae6');
-const normal=JSON.parse(JSON.stringify(payload));
-  const serialPrefix=bytes.subarray(0,2514447);
-  assert.equal(serialPrefix.length,2514447);assert.equal(sha(serialPrefix),'ae7a7ed3d0cbd38149bfd284eaeb458fc696bede38976f509a801c40ced1b770');assert.equal(blob(serialPrefix),'af9eee4beb70ea89fef675cfc5bb99ec10811fc4');
-  const serialAppend=bytes.subarray(2514447,2538602);assert.equal(serialAppend.length,24155);assert.equal(sha(serialAppend),'48e15b75dfdd3221681f262de02a462cf0edf43b6010264310cfa7180858438f');
-  const serialBegin='<!-- AFW-SERIAL-ENTRY-PIN-DATA-V1:BEGIN -->',serialEnd='<!-- AFW-SERIAL-ENTRY-PIN-DATA-V1:END -->';assert.equal(text.split(serialBegin).length,2);assert.equal(text.split(serialEnd).length,2);
-  const serialText=text.slice(text.indexOf(serialBegin)+serialBegin.length,text.indexOf(serialEnd));
-  assert.equal(sha(Buffer.from(serialText)),'07567d1647505cbf671675f87b874b6afc0b18b5a9cbaa445496b1a9e69df20b');
-  const serial=JSON.parse(serialText);assert.equal('\n'+JSON.stringify(serial)+'\n',serialText);
-  assert.deepEqual(Object.keys(serial),['purpose','closedParent','closedTree','origin','baselinePrefix','normalHistory','overlay','unit','unitSchema','oneUseMessage','nonclaims']);
-  assert.equal(serial.purpose,'afw.serial-entry-pin.append.v1');assert.equal(serial.closedParent,'3f23a9805a60d285a6272138765078e7da80e5eb');assert.equal(serial.closedTree,'a8c002728663bdcf67a6bc59d5c5f1232cb6384c');
-  const serialOverlay=serial.overlay;assert.deepEqual(Object.keys(serialOverlay),['purpose','normalRaw','normalControls','candidateControls','span','candidateRaw','nonclaims']);assert.equal(serialOverlay.purpose,'afw.serial-entry-pin.overlay.v1');
-  assert.deepEqual(Object.keys(serialOverlay.span),['from','to']);
-  const serialOld=payload.helpers['controls.mjs'];assert.equal(sha(Buffer.from(serialOld)),'060c5b493d3c832efb057e786ccb622adfef0c14233cf5e394b053485981e7df');assert.equal(serialOld.split(serialOverlay.span.from).length,2);
-  payload.helpers['controls.mjs']=serialOld.replace(serialOverlay.span.from,serialOverlay.span.to);
-  const serialControls=Buffer.from(payload.helpers['controls.mjs']);assert.equal(serialControls.length,32428);assert.equal(sha(serialControls),'3c8b4e694154f6162b70d63d7e1d3de7c417a675db4a2e87880f2d964eca8c35');assert.equal(blob(serialControls),'17e101dd8720312111b7dffb37f7edb8da41a0fd');
-  const serialResult=Buffer.from(JSON.stringify(payload));assert.equal(serialResult.length,487931);assert.equal(sha(serialResult),'f5fe1b3ecc0054ba1ce626c9140fc5899f4b35d0e8544181eb2606771b7220f8');assert.equal(blob(serialResult),'2716e7224ddee98690f457d0c48e6d096bd17024');
-
-const candidate=payload;
-assert.deepEqual(Object.keys(serial.unit),['blob','bytes','sha256','kind','cap','code']);assert.equal(serial.unit.cap,32768);assert.equal(serial.unit.kind,'github-only-unit');
-assert.equal(Buffer.byteLength(serial.unit.code),17454);assert.equal(serial.unit.bytes,17454);assert.equal(sha(serial.unit.code),'1ad51c019123e57d6a663921337f91a6cdd667798f04bafd3e3230b78c181039');assert.equal(blob(Buffer.from(serial.unit.code)),'c8ab01ecb2e569fd8908c8edc22a630664c08ee7');assert(serial.unit.bytes<=32768);
-assert.deepEqual(Object.keys(serial.unitSchema),['blob','bytes','sha256','kind','cap','schema']);assert.equal(serial.unitSchema.cap,32768);
-const schemaText=JSON.stringify(serial.unitSchema.schema);assert.equal(Buffer.byteLength(schemaText),1927);assert.equal(sha(schemaText),'4ccead174e6782f89072083ca06c15966d6c4ce0ef4e13625f393964c433320e');assert.equal(blob(Buffer.from(schemaText)),'300a3d8739532f8fbb67bd97480ee0fd366f835e');
-const unit=await import('data:text/javascript;base64,'+Buffer.from(serial.unit.code).toString('base64'));
-assert.deepEqual(Object.keys(unit),['serialPinUnit']);
-const wire=unit.serialPinUnit({assert,createHash,gzipSync,posix,normal,candidate,source:e.GITHUB_SHA,sourceTree,run:e.GITHUB_RUN_ID});
-assert.equal(typeof wire,'string');assert(Buffer.byteLength(wire)<=2048);assert(/^[\x00-\x7f]*$/.test(wire));assert.equal(wire.split('\n').length,2);assert(wire.endsWith('\n'));
-const frame='AFW_SERIAL_ENTRY_PIN_UNIT/1 ';assert(wire.startsWith(frame));
-const data=JSON.parse(wire.slice(frame.length));assert.equal(frame+JSON.stringify(data)+'\n',wire);
-function validate(value,schema){
- if(Object.hasOwn(schema,'const')){assert.deepEqual(value,schema.const);return;}
- if(schema.type==='object'){assert(value&&typeof value==='object'&&!Array.isArray(value));assert.equal(schema.additionalProperties,false);assert.deepEqual(Object.keys(value),schema.required);assert.deepEqual(Object.keys(schema.properties),schema.required);for(const key of schema.required)validate(value[key],schema.properties[key]);return;}
- assert.equal(schema.type,'string');assert.equal(typeof value,'string');assert(new RegExp(schema.pattern).test(value));
-}
-validate(data,serial.unitSchema.schema);
-assert.equal(data.source,e.GITHUB_SHA);assert.equal(data.sourceTree,sourceTree);assert.equal(data.run,e.GITHUB_RUN_ID);
-process.stdout.write(wire);
-
-}catch{process.stderr.write('AFW_SERIAL_ENTRY_PIN_UNIT_FAILED\n');process.exitCode=1;}
+assert.equal(git('log','-1','--format=%B'), 'AFW-SERIAL-PIN-QUALIFICATION-FIX1-ONEUSE-20261115');
+const sourceTree=git('rev-parse','HEAD^{tree}');assert.match(sourceTree,/^[a-f0-9]{40}$/);
+const same='docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md',f7='.github/workflows/afw-finite-budget-qualification.yml';
+const tree=execFileSync('git',['ls-tree','-rz','--full-tree','HEAD'],{stdio:['ignore','pipe','pipe']});
+const rows=tree.toString('utf8').split('\0').filter(Boolean).map(x=>{const at=x.indexOf('\t');assert(at>0);return{tuple:x.slice(0,at),path:x.slice(at+1)};}).filter(x=>![same,f7].includes(x.path)).sort((a,b)=>Buffer.compare(Buffer.from(a.path),Buffer.from(b.path)));
+const core=Buffer.from(rows.map(x=>x.tuple+'\t'+x.path+'\0').join(''));assert.equal(rows.length,3201);assert.equal(core.length,324448);assert.equal(sha(core),'aefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703');execFileSync('git',['diff','--exit-code','HEAD','--'],{stdio:['ignore','pipe','pipe']});
+const st=fs.lstatSync(same);assert(st.isFile()&&!st.isSymbolicLink()&&st.size<=2600000);const bytes=fs.readFileSync(same);assert.equal(blob(bytes),git('rev-parse','HEAD:'+same));
+const fix1Prefix=bytes.subarray(0,2540300);assert.equal(fix1Prefix.length,2540300);assert.equal(sha(fix1Prefix),'3ceabc9462376ccfd94b8a368e1e66b1f229e652a402d93cd87d81dfeb45a18f');assert.equal(blob(fix1Prefix),'f4da9e3c3d000ca0e64674f83e7c54ff9306d389');
+ const prefix=bytes.subarray(0,2260109);assert.equal(prefix.length,2260109);assert.equal(sha(prefix),'9b49c2699725fa9148202d046bc3f050d151313061eae17bfa67494559476421');assert.equal(blob(prefix),'71fabddb7fcee9f436ce3ea95785c3a2ee5afe70');
+ const text=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes),begin='<!-- AFW-R3-DELIVERY-SUCCESSOR-R5-DATA-V1:BEGIN -->',end='<!-- AFW-R3-DELIVERY-SUCCESSOR-R5-DATA-V1:END -->';assert.equal(text.split(begin).length,2);assert.equal(text.split(end).length,2);const first=text.indexOf(begin),last=text.indexOf(end);assert(last>first&&Buffer.byteLength(text.slice(0,first))>=prefix.length);
+ const section=text.slice(first+begin.length,last);assert.match(section,/^\n[A-Za-z0-9+/=\n]+\n$/);const b64=section.replaceAll('\n',''),pins={"bytes":487208,"sha256":"087bba2182c131579e233f6c29daf1ee85e2aae41e77b66d6f93cc44cb5000c5","blob":"f9c8261c54f761b5c33ddc370dbe7b308648033b","compressed":{"bytes":120211,"sha256":"7e9aace1b1a3930a1a5234a2fdee5af68ebec77cc5b9818a6d342328047bf0e5","blob":"b3dfc078047bee03b5b42140783ee1dcf2409fd8"},"base64Characters":160284};assert.equal(b64.length,pins.base64Characters);assert(b64.length<=174764);const zip=Buffer.from(b64,'base64');assert.equal(zip.toString('base64'),b64);assert.equal(zip.length,pins.compressed.bytes);assert(zip.length<=131072);assert.equal(sha(zip),pins.compressed.sha256);assert.equal(blob(zip),pins.compressed.blob);
+ const raw=gunzipSync(zip,{maxOutputLength:524288});assert.equal(raw.length,pins.bytes);assert.equal(sha(raw),pins.sha256);assert.equal(blob(raw),pins.blob);const carrierJson=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(raw),payload=JSON.parse(carrierJson);assert.equal(JSON.stringify(payload),carrierJson);
+ // Closed captured-original-creator continuity derivation; no caller patch/path/code.
+ const ccPrefix=bytes.subarray(0,2471214);assert.equal(ccPrefix.length,2471214);assert.equal(sha(ccPrefix),'1ba61ebb62514c1bb2e5b7b6058dd5abad09ddc1d059483987262032e154928a');assert.equal(blob(ccPrefix),'2fcd79c7d0a2475f176dc03360df5980a58c3120');
+ const ccSuffix=bytes.subarray(2471214,2481826);assert.equal(ccSuffix.length,10612);assert.equal(sha(ccSuffix),'cdfe4a0b495be82b9d2746a12f09a3cb24c100f940bb6cdbecaa0585f8a7fac5');
+ const ccBegin='<!-- AFW-CREATOR-CONTINUITY-DATA-V1:BEGIN -->',ccEnd='<!-- AFW-CREATOR-CONTINUITY-DATA-V1:END -->';assert.equal(text.split(ccBegin).length,2);assert.equal(text.split(ccEnd).length,2);const ccFirst=text.indexOf(ccBegin),ccLast=text.indexOf(ccEnd);assert(ccLast>ccFirst&&Buffer.byteLength(text.slice(0,ccFirst))>=2471214);const ccOverlayText=text.slice(ccFirst+ccBegin.length,ccLast);assert.equal(sha(Buffer.from(ccOverlayText)),'a7e62d0ce31a094090c6b1524f34cc55b776a4938010a5ec1c310ca4ac6b712f');
+ const ccOldKernel=payload.helpers['lifetime.py'];assert.equal(sha(Buffer.from(ccOldKernel)),'ae23b6e242cb41d3978b391c3bde1095ee7e0c0c717db98a598fe8fd9dcb2a27');assert.equal(ccOldKernel.split(" # AFW_LIFE_BEFORE_ARM\n").length,2);payload.helpers['lifetime.py']=ccOldKernel.replace(" # AFW_LIFE_BEFORE_ARM\n"," # AFW_LIFE_BEFORE_ARM\n if os.getppid()!=before[0]:raise CreatorDead()\n");
+ const ccKernelPin=JSON.parse(ccOverlayText).kernelSnapshot;assert.deepEqual(Object.keys(ccKernelPin),['bytes','sha256','zipBytes','zipSha256','data','cap']);assert.equal(ccKernelPin.bytes,16073);assert.equal(ccKernelPin.cap,32768);assert.equal(ccKernelPin.sha256,'f2b319e2a98a0959e421e80d7f94662476508f2ae6bc7cff2f9c6f8f0e17a791');assert.equal(ccKernelPin.zipBytes,5078);assert.equal(ccKernelPin.zipSha256,'f0ef8e96c2f15251fbdbcb0abe801cbb981f5c97663233a0cae0520b261f29ed');assert.equal(sha(Buffer.from(ccKernelPin.data)),'1ba509cdcd9ecda3ae60b3db8f5876e1ddf17f5f9692bff77f113cef3e6356ef');const ccKernelZip=Buffer.from(ccKernelPin.data,'base64');assert.equal(ccKernelZip.toString('base64'),ccKernelPin.data);assert.equal(ccKernelZip.length,ccKernelPin.zipBytes);assert.equal(sha(ccKernelZip),ccKernelPin.zipSha256);assert.equal(gunzipSync(ccKernelZip,{maxOutputLength:32768}).toString('utf8'),payload.helpers['lifetime.py']);
+ for(const name of ['delivery-entry.sh','controls-entry.sh','missing-cwd-entry.sh']){const prior=payload.helpers[name],lines=prior.split('\n').filter(line=>line.startsWith('_r3_kernel='));assert.equal(lines.length,1);const oldPin=JSON.parse(lines[0].slice('_r3_kernel='.length));assert.equal(oldPin.bytes,16025);assert.equal(oldPin.sha256,'ae23b6e242cb41d3978b391c3bde1095ee7e0c0c717db98a598fe8fd9dcb2a27');payload.helpers[name]=prior.replace(lines[0],'_r3_kernel='+JSON.stringify(ccKernelPin));}
+ const ccResult=Buffer.from(JSON.stringify(payload));assert.equal(ccResult.length,487293);assert.equal(sha(ccResult),'dda3f25ef82cdf4e65814360b52aafa9ddf3ec2e57d1fa2f92e46466acfcd25b');assert.equal(blob(ccResult),'f23fcfebf3c72632327cf24babf2ff7ace22dae6');
+const normal=JSON.parse(JSON.stringify(payload));
+  const serialPrefix=bytes.subarray(0,2514447);
+  assert.equal(serialPrefix.length,2514447);assert.equal(sha(serialPrefix),'ae7a7ed3d0cbd38149bfd284eaeb458fc696bede38976f509a801c40ced1b770');assert.equal(blob(serialPrefix),'af9eee4beb70ea89fef675cfc5bb99ec10811fc4');
+  const serialAppend=bytes.subarray(2514447,2538602);assert.equal(serialAppend.length,24155);assert.equal(sha(serialAppend),'48e15b75dfdd3221681f262de02a462cf0edf43b6010264310cfa7180858438f');
+  const serialBegin='<!-- AFW-SERIAL-ENTRY-PIN-DATA-V1:BEGIN -->',serialEnd='<!-- AFW-SERIAL-ENTRY-PIN-DATA-V1:END -->';assert.equal(text.split(serialBegin).length,2);assert.equal(text.split(serialEnd).length,2);
+  const serialText=text.slice(text.indexOf(serialBegin)+serialBegin.length,text.indexOf(serialEnd));
+  assert.equal(sha(Buffer.from(serialText)),'07567d1647505cbf671675f87b874b6afc0b18b5a9cbaa445496b1a9e69df20b');
+  const serial=JSON.parse(serialText);assert.equal('\n'+JSON.stringify(serial)+'\n',serialText);
+  assert.deepEqual(Object.keys(serial),['purpose','closedParent','closedTree','origin','baselinePrefix','normalHistory','overlay','unit','unitSchema','oneUseMessage','nonclaims']);
+  assert.equal(serial.purpose,'afw.serial-entry-pin.append.v1');assert.equal(serial.closedParent,'3f23a9805a60d285a6272138765078e7da80e5eb');assert.equal(serial.closedTree,'a8c002728663bdcf67a6bc59d5c5f1232cb6384c');
+  const serialOverlay=serial.overlay;assert.deepEqual(Object.keys(serialOverlay),['purpose','normalRaw','normalControls','candidateControls','span','candidateRaw','nonclaims']);assert.equal(serialOverlay.purpose,'afw.serial-entry-pin.overlay.v1');
+  assert.deepEqual(Object.keys(serialOverlay.span),['from','to']);
+  const serialOld=payload.helpers['controls.mjs'];assert.equal(sha(Buffer.from(serialOld)),'060c5b493d3c832efb057e786ccb622adfef0c14233cf5e394b053485981e7df');assert.equal(serialOld.split(serialOverlay.span.from).length,2);
+  payload.helpers['controls.mjs']=serialOld.replace(serialOverlay.span.from,serialOverlay.span.to);
+  const serialControls=Buffer.from(payload.helpers['controls.mjs']);assert.equal(serialControls.length,32428);assert.equal(sha(serialControls),'3c8b4e694154f6162b70d63d7e1d3de7c417a675db4a2e87880f2d964eca8c35');assert.equal(blob(serialControls),'17e101dd8720312111b7dffb37f7edb8da41a0fd');
+  const serialResult=Buffer.from(JSON.stringify(payload));assert.equal(serialResult.length,487931);assert.equal(sha(serialResult),'f5fe1b3ecc0054ba1ce626c9140fc5899f4b35d0e8544181eb2606771b7220f8');assert.equal(blob(serialResult),'2716e7224ddee98690f457d0c48e6d096bd17024');
+
+const candidate=payload;
+assert.deepEqual(Object.keys(serial.unit),['blob','bytes','sha256','kind','cap','code']);assert.equal(serial.unit.cap,32768);assert.equal(serial.unit.kind,'github-only-unit');
+assert.equal(Buffer.byteLength(serial.unit.code),17454);assert.equal(serial.unit.bytes,17454);assert.equal(sha(serial.unit.code),'1ad51c019123e57d6a663921337f91a6cdd667798f04bafd3e3230b78c181039');assert.equal(blob(Buffer.from(serial.unit.code)),'c8ab01ecb2e569fd8908c8edc22a630664c08ee7');assert(serial.unit.bytes<=32768);
+assert.deepEqual(Object.keys(serial.unitSchema),['blob','bytes','sha256','kind','cap','schema']);assert.equal(serial.unitSchema.cap,32768);
+const schemaText=JSON.stringify(serial.unitSchema.schema);assert.equal(Buffer.byteLength(schemaText),1927);assert.equal(sha(schemaText),'4ccead174e6782f89072083ca06c15966d6c4ce0ef4e13625f393964c433320e');assert.equal(blob(Buffer.from(schemaText)),'300a3d8739532f8fbb67bd97480ee0fd366f835e');
+const unit=await import('data:text/javascript;base64,'+Buffer.from(serial.unit.code).toString('base64'));
+assert.deepEqual(Object.keys(unit),['serialPinUnit']);
+const unitFrame=unit.serialPinUnit({assert,createHash,gzipSync,posix,normal,candidate,source:e.GITHUB_SHA,sourceTree,run:e.GITHUB_RUN_ID});
+assert.equal(typeof unitFrame,'string');assert(Buffer.byteLength(unitFrame)<=2048);assert(/^[\x00-\x7f]*$/.test(unitFrame));assert.equal(unitFrame.split('\n').length,2);assert(unitFrame.endsWith('\n'));
+const frame='AFW_SERIAL_ENTRY_PIN_UNIT/1 ';assert(unitFrame.startsWith(frame));
+const data=JSON.parse(unitFrame.slice(frame.length));assert.equal(frame+JSON.stringify(data)+'\n',unitFrame);
+function validate(value,schema){
+ if(Object.hasOwn(schema,'const')){assert.deepEqual(value,schema.const);return;}
+ if(schema.type==='object'){assert(value&&typeof value==='object'&&!Array.isArray(value));assert.equal(schema.additionalProperties,false);assert.deepEqual(Object.keys(value),schema.required);assert.deepEqual(Object.keys(schema.properties),schema.required);for(const key of schema.required)validate(value[key],schema.properties[key]);return;}
+ assert.equal(schema.type,'string');assert.equal(typeof value,'string');assert(new RegExp(schema.pattern).test(value));
+}
+validate(data,serial.unitSchema.schema);
+assert.equal(data.source,e.GITHUB_SHA);assert.equal(data.sourceTree,sourceTree);assert.equal(data.run,e.GITHUB_RUN_ID);
+process.stdout.write(unitFrame);
+
+}catch{process.exitCode=1;}
 
```

## New boundary-program full body (line1 first comment)
```javascript
// Fix1 covering controls. Authored STRING first; future Root GitHub gate only.
export function loaderBoundaryControls({assert,createHash,gunzipSync,spawnSync,workflowText,fix,context,env}) {
 const hash=b=>createHash('sha256').update(b).digest('hex');
 const blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
 const verify=(bytes,p)=>{assert.equal(bytes.length,p.bytes);assert.equal(hash(bytes),p.sha256);assert.equal(blob(bytes),p.blob);};
 const name='Check serial entry pin reuse',marker='AFW_SERIAL_PIN_UNIT';
 const stepStart='      - name: '+name+'\n',nextStep='      - name: Run declared full104 controls only\n';
 const once=(text,needle)=>{assert.equal(text.split(needle).length,2);return text.indexOf(needle);};
 const stepFromFull=text=>{const start=once(text,stepStart),end=once(text,nextStep);assert(end>start);return text.slice(start,end);};
 function heredoc(step,opening){
  const start=once(step,opening)+opening.length,end=once(step,'          '+marker+'\n');assert(end>start);
  const indented=step.slice(start,end);assert(indented.endsWith('\n'));
  const rows=indented.slice(0,-1).split('\n');assert(rows.every(x=>x.startsWith('          ')));
  return rows.map(x=>x.slice(10)).join('\n')+'\n';
 }
 const badOpening="          node --input-type=module <<'AFW_SERIAL_PIN_UNIT'\n";
 const goodOpening="          if node --input-type=module 2>/dev/null <<'AFW_SERIAL_PIN_UNIT'\n";
 const zip=Buffer.from(fix.badStep.data,'base64');
 assert.equal(zip.toString('base64'),fix.badStep.data);assert.equal(zip.length,fix.badStep.zipBytes);assert.equal(hash(zip),fix.badStep.zipSha256);
 const badBytes=gunzipSync(zip,{maxOutputLength:32768});verify(badBytes,fix.badStep);
 const badStep=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(badBytes);
 assert(badStep.startsWith(stepStart));assert(badStep.endsWith('          AFW_SERIAL_PIN_UNIT\n'));
 assert.equal(fix.badStep.sourceWorkflow.blob,'757f95ff72ead519a01e3ecaead2bd2925b35189');
 assert.equal(fix.badStep.sourceWorkflow.bytes,53811);
 assert.equal(fix.badStep.offsetBytes+fix.badStep.bytes,fix.badStep.endBytes);
 assert.equal(fix.badStep.nextStep,nextStep);assert.equal(fix.badStep.separatorLF,1);
 const badBody=heredoc(badStep,badOpening),badLoader=badBody.slice(0,-1);
 assert(badLoader.endsWith('\n'));assert.equal(badBody,badLoader+'\n');
 verify(Buffer.from(badLoader),fix.badLoader);
 assert.equal(blob(Buffer.from(badLoader)),'fc82133f1f7339c2dfa7ddbbe99066151235830e');
 // Fixed construction control only. No Source compilation occurs in this check.
 assert.equal((badLoader.match(/\bconst wire\b/g)??[]).length,2);
 assert.equal((badBody.match(/\bconst wire\b/g)??[]).length,2);
 const goodZip=Buffer.from(fix.goodLoader.data,'base64');assert.equal(goodZip.toString('base64'),fix.goodLoader.data);assert.equal(goodZip.length,fix.goodLoader.zipBytes);assert(goodZip.length<=fix.goodLoader.zipCap&&fix.goodLoader.zipCap===32768);assert.equal(hash(goodZip),fix.goodLoader.zipSha256);
 const goodBytes=gunzipSync(goodZip,{maxOutputLength:32768});verify(goodBytes,fix.goodLoader);const nominatedGoodLoader=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(goodBytes);
 const correctedStep=stepFromFull(workflowText);
 const correctedBody=heredoc(correctedStep,goodOpening),correctedLoader=correctedBody.slice(0,-1);
 verify(Buffer.from(correctedLoader),fix.goodLoader);assert.equal(correctedBody,nominatedGoodLoader+'\n');
 function correctedBindings(text){
  assert.equal((text.match(/\bconst wire\b/g)??[]).length,0);
  assert.equal((text.match(/\bconst carrierJson\b/g)??[]).length,1);
  assert.equal((text.match(/\bconst unitFrame\b/g)??[]).length,1);
  for(const needle of ['payload=JSON.parse(carrierJson)','assert.equal(JSON.stringify(payload),carrierJson)','const unitFrame=unit.serialPinUnit(','typeof unitFrame','Buffer.byteLength(unitFrame)','unitFrame.split(','unitFrame.endsWith(','unitFrame.startsWith(','unitFrame.slice(','process.stdout.write(unitFrame)'])once(text,needle);
  assert(text.includes("assert.equal(frame+JSON.stringify(data)+'\\n',unitFrame)"));
 }
 correctedBindings(correctedLoader);correctedBindings(correctedBody);
 assert.equal(correctedLoader,nominatedGoodLoader);
 assert(correctedLoader.includes("'AFW-SERIAL-PIN-QUALIFICATION-FIX1-ONEUSE-20261115'"));
 // The actual checked-out YAML determines both the invocation and complete status wrapper.
 const run='        run: |\n',runStart=once(correctedStep,run)+run.length;
 const runRows=correctedStep.slice(runStart).replace(/\n$/,'').split('\n');assert(runRows.every(x=>x.startsWith('          ')));
 const exactShell=runRows.map(x=>x.slice(10)).join('\n')+'\n';
 const payloadBody=correctedBody;
 assert.equal(exactShell.split(payloadBody).length,2);
 assert(exactShell.includes("if node --input-type=module 2>/dev/null <<'AFW_SERIAL_PIN_UNIT'"));
 assert(exactShell.endsWith("AFW_SERIAL_PIN_UNIT\nthen\n  :\nelse\n  printf '%s\\n' 'AFW_SERIAL_ENTRY_PIN_UNIT_FAILED' >&2\n  exit 1\nfi\n"));
 const fullGate="if: \u0024{{ always() && steps.loaderBoundary.conclusion == 'success' && steps.serialPins.conclusion == 'success' && steps.checkout.outcome == 'success' && steps.node.outcome == 'success' }}";
 assert(workflowText.includes(fullGate));
 assert(correctedStep.includes("steps.loaderBoundary.conclusion == 'success'"));
 const fullEligible=(boundary,serial)=>boundary==='success'&&serial==='success';
 assert.equal(fullEligible('success','success'),true);assert.equal(fullEligible('failure','success'),false);
 const fixedMarker='AFW_SERIAL_ENTRY_PIN_UNIT_FAILED\n';
 const fixtureFrame='AFW_SERIAL_ENTRY_PIN_UNIT/1 {"fixtureOnly":true}\n';
 const fixtures=[
  {name:'syntaxFailure',program:'const harmlessBinding=1;\nconst harmlessBinding=2;\n',ok:false},
  {name:'oversizedStderrFailure',program:"process.stderr.write('HARMLESS_DIAGNOSTIC'.repeat(512));process.exitCode=7;\n",ok:false},
  {name:'assertionFailure',program:"import assert from 'node:assert/strict';assert.equal(1,2);\n",ok:false},
  {name:'singleFrameSuccess',program:'process.stdout.write('+JSON.stringify(fixtureFrame)+');\n',ok:true}
 ];
 const outcomes={};
 assert.equal(fixtures.length,4);assert.equal(typeof env.PATH,'string');assert(env.PATH.length<=4096&&!env.PATH.includes('\0'));
 for(const fixture of fixtures){
  const script=exactShell.replace(payloadBody,fixture.program);
  const result=spawnSync('/bin/bash',['--noprofile','--norc','-c',script],{env:{PATH:env.PATH,HOME:'/nonexistent',CI:'true',LANG:'C.UTF-8',TZ:'UTC'},stdio:['ignore','pipe','pipe'],encoding:'utf8',timeout:5000,maxBuffer:4096,killSignal:'SIGKILL'});
  assert.equal(result.error,undefined);assert.equal(result.signal,null);
  assert(Buffer.byteLength(result.stdout)<=4096);assert(Buffer.byteLength(result.stderr)<=4096);
  if(fixture.ok){assert.equal(result.status,0);assert.equal(result.stdout,fixtureFrame);assert.equal(result.stderr,'');assert.equal(fullEligible('success','success'),true);}
  else{assert(Number.isInteger(result.status)&&result.status!==0);assert.equal(result.stdout,'');assert.equal(result.stderr,fixedMarker);assert.equal(fullEligible('success','failure'),false);}
  outcomes[fixture.name]='passed';
 }
 // Synthetic unit-like fixture stdout is captured above and is never forwarded/logged.
 const summary={purpose:'afw.serial-loader.boundary-unit.v1',source:context.source,sourceTree:context.sourceTree,run:context.run,attempt:1,job:'readonly',node:'22.23.4',baselineBindingControl:'rejected',correctedBindingControl:'passed',syntaxFailure:outcomes.syntaxFailure,oversizedStderrFailure:outcomes.oversizedStderrFailure,assertionFailure:outcomes.assertionFailure,singleFrameSuccess:outcomes.singleFrameSuccess,fixtureOnly:true,nativeBusinessCases:0,nonclaims:{historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}};
 const frame='AFW_SERIAL_LOADER_BOUNDARY_UNIT/1 '+JSON.stringify(summary)+'\n';assert(/^[\x00-\x7f]*$/.test(frame));assert(Buffer.byteLength(frame)<=2048);return frame;
}
```

## New boundary-loader full body (line1 first import)
```javascript
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {spawnSync,execFileSync} from 'node:child_process';
try{
 const e=process.env,hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
 assert.equal(process.versions.node,'22.23.4');assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_EVENT_NAME,'push');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(e.GITHUB_JOB,'readonly');assert.equal(e.GITHUB_WORKFLOW_REF,'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101');
 for(const key of ['NODE_OPTIONS','NODE_PATH','AFW_SYN_CHECKPOINT_KEY','AFW_BUDGET_DIAGNOSTIC_CANDIDATE'])assert.equal(e[key],undefined);
 assert.match(e.GITHUB_SHA,/^[a-f0-9]{40}$/);assert.match(e.GITHUB_RUN_ID,/^[1-9][0-9]{0,19}$/);
 const git=(...args)=>execFileSync('git',args,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
 assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(git('rev-parse','--show-toplevel'),fs.realpathSync('.'));assert.equal(process.cwd(),fs.realpathSync('.'));assert.equal(git('log','-1','--format=%B'),'AFW-SERIAL-PIN-QUALIFICATION-FIX1-ONEUSE-20261115');
 const sourceTree=git('rev-parse','HEAD^{tree}');assert.match(sourceTree,/^[a-f0-9]{40}$/);
 const samePath='docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md',workflowPath='.github/workflows/afw-finite-budget-qualification.yml';
 const ss=fs.lstatSync(samePath);assert(ss.isFile()&&!ss.isSymbolicLink()&&ss.size<=2600000);
 const documentBytes=fs.readFileSync(samePath);assert.equal(blob(documentBytes),git('rev-parse','HEAD:'+samePath));
 const prior=documentBytes.subarray(0,2540300);assert.equal(prior.length,2540300);assert.equal(hash(prior),'3ceabc9462376ccfd94b8a368e1e66b1f229e652a402d93cd87d81dfeb45a18f');assert.equal(blob(prior),'f4da9e3c3d000ca0e64674f83e7c54ff9306d389');
 const append=documentBytes.subarray(2540300,2566139);assert.equal(append.length,25839);assert.equal(hash(append),'10fab58ec82d2dad29e245a6ce9e607b7be33cdc04f21a882a508829bcf44c71');
 const documentText=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(documentBytes),begin='<!-- AFW-SERIAL-ENTRY-PIN-FIX1-DATA-V1:BEGIN -->',end='<!-- AFW-SERIAL-ENTRY-PIN-FIX1-DATA-V1:END -->';assert.equal(documentText.split(begin).length,2);assert.equal(documentText.split(end).length,2);
 const fixSectionText=documentText.slice(documentText.indexOf(begin)+begin.length,documentText.indexOf(end));assert.equal(hash(fixSectionText),'74b035c20aa82e09af1b8ee25852aff8f2e9809a74d671d11f1da3e62b9dcb38');
 const fix=JSON.parse(fixSectionText);assert.equal('\n'+JSON.stringify(fix)+'\n',fixSectionText);
 assert.deepEqual(Object.keys(fix),['purpose','closedParent','closedTree','prefix','oneUseMessage','baseIndex','review','redReceipt','badStep','badLoader','goodLoader','boundaryProgram','boundarySchema','unchanged','minorM1','nonclaims']);
 assert.equal(fix.purpose,'afw.serial-entry-pin.fix1-data.v1');assert.equal(fix.closedParent,'a128bde0a3b3cf354a3a8ba751a5b8ebcefec72b');assert.equal(fix.closedTree,'4b6fb8d7f4072b1099b8f562a75e74ae78d9d2a1');assert.equal(fix.oneUseMessage,'AFW-SERIAL-PIN-QUALIFICATION-FIX1-ONEUSE-20261115');
 const program=fix.boundaryProgram;assert.equal(program.cap,32768);assert.equal(program.bytes,8111);assert.equal(Buffer.byteLength(program.code),program.bytes);assert.equal(hash(program.code),'c0911f371ba5a8f6a1b6f457caeef777db0185f5bff3b16ea4cec289f6bcb8c9');assert.equal(blob(Buffer.from(program.code)),'12442bebf3e4af0192e86f360cd3ef316c6d8f87');
 const schema=fix.boundarySchema.schema,schemaText=JSON.stringify(schema);assert.equal(Buffer.byteLength(schemaText),1486);assert.equal(hash(schemaText),'757b57a70245840a6b7e24c2cad90afcda86083220eef8f09ebd422dc1870810');
 const ws=fs.lstatSync(workflowPath);assert(ws.isFile()&&!ws.isSymbolicLink()&&ws.size<=73728);const workflowBytes=fs.readFileSync(workflowPath);assert.equal(blob(workflowBytes),git('rev-parse','HEAD:'+workflowPath));const workflowText=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(workflowBytes);
 const boundary=await import('data:text/javascript;base64,'+Buffer.from(program.code).toString('base64'));assert.deepEqual(Object.keys(boundary),['loaderBoundaryControls']);
 const context={source:e.GITHUB_SHA,sourceTree,run:e.GITHUB_RUN_ID};
 const boundaryWire=boundary.loaderBoundaryControls({assert,createHash,gunzipSync,spawnSync,workflowText,fix,context,env:{PATH:e.PATH}});
 assert.equal(typeof boundaryWire,'string');assert(Buffer.byteLength(boundaryWire)<=2048);assert(/^[\x00-\x7f]*$/.test(boundaryWire));assert.equal(boundaryWire.split('\n').length,2);
 const prefix='AFW_SERIAL_LOADER_BOUNDARY_UNIT/1 ';assert(boundaryWire.startsWith(prefix));const summary=JSON.parse(boundaryWire.slice(prefix.length));assert.equal(prefix+JSON.stringify(summary)+'\n',boundaryWire);
 function validate(value,shape){if(Object.hasOwn(shape,'const')){assert.deepEqual(value,shape.const);return;}if(shape.type==='object'){assert(value&&typeof value==='object'&&!Array.isArray(value));assert.equal(shape.additionalProperties,false);assert.deepEqual(Object.keys(value),shape.required);assert.deepEqual(Object.keys(shape.properties),shape.required);for(const key of shape.required)validate(value[key],shape.properties[key]);return;}assert.equal(shape.type,'string');assert.equal(typeof value,'string');assert(new RegExp(shape.pattern).test(value));}
 validate(summary,schema);assert.equal(summary.source,e.GITHUB_SHA);assert.equal(summary.sourceTree,sourceTree);assert.equal(summary.run,e.GITHUB_RUN_ID);
 process.stdout.write(boundaryWire);
}catch{process.exitCode=1;}
```

## Corrected workflow through full104 run header (complete changed shell/step region)
```yaml
name: AFW serial entry pin full104 controls
run-name: AFW serial entry pin full104 controls ONEUSE ${{ github.sha }}
on:
  push:
    branches:
      - feat/finite-native-cleanup-20261101
    paths:
      - .github/workflows/afw-finite-budget-qualification.yml
permissions:
  contents: read
concurrency:
  group: afw-finite-budget-qualification
  cancel-in-progress: false
# Inactive DATA. Controls only; original readonly CLI/Native HELD.
# R3 helpers materialized DATA; original18 remain DATA; I3 remains OPEN.
# Action-runtime warning M02 deferred; exact mandated pins unchanged.
jobs:
  readonly:
    if: ${{ github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.event_name == 'push' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 && github.event.head_commit.message == 'AFW-SERIAL-PIN-QUALIFICATION-FIX1-ONEUSE-20261115' }}
    runs-on: ubuntu-24.04
    timeout-minutes: 7
    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262
        id: checkout
        with:
          repository: tokenizartinfo-ops/agent-friendly-web
          ref: ${{ github.sha }}
          persist-credentials: false
          fetch-depth: 1
      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020
        id: node
        with:
          node-version: '22.23.4'
      - name: Check serial loader boundary controls
        id: loaderBoundary
        if: ${{ success() && steps.checkout.outcome == 'success' && steps.node.outcome == 'success' }}
        shell: bash
        run: |
          set -euo pipefail
          umask 077
          if test -n "${NODE_OPTIONS+x}" || test -n "${NODE_PATH+x}" || test -n "${AFW_SYN_CHECKPOINT_KEY+x}" || test -n "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"; then
            printf '%s\n' 'AFW_SERIAL_LOADER_BOUNDARY_UNIT_FAILED' >&2
            exit 1
          fi
          if node --input-type=module 2>/dev/null <<'AFW_SERIAL_LOADER_BOUNDARY_UNIT'
          import assert from 'node:assert/strict';
          import * as fs from 'node:fs';
          import {createHash} from 'node:crypto';
          import {gunzipSync} from 'node:zlib';
          import {spawnSync,execFileSync} from 'node:child_process';
          try{
           const e=process.env,hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(process.versions.node,'22.23.4');assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_EVENT_NAME,'push');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(e.GITHUB_JOB,'readonly');assert.equal(e.GITHUB_WORKFLOW_REF,'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-finite-budget-qualification.yml@refs/heads/feat/finite-native-cleanup-20261101');
           for(const key of ['NODE_OPTIONS','NODE_PATH','AFW_SYN_CHECKPOINT_KEY','AFW_BUDGET_DIAGNOSTIC_CANDIDATE'])assert.equal(e[key],undefined);
           assert.match(e.GITHUB_SHA,/^[a-f0-9]{40}$/);assert.match(e.GITHUB_RUN_ID,/^[1-9][0-9]{0,19}$/);
           const git=(...args)=>execFileSync('git',args,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
           assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(git('rev-parse','--show-toplevel'),fs.realpathSync('.'));assert.equal(process.cwd(),fs.realpathSync('.'));assert.equal(git('log','-1','--format=%B'),'AFW-SERIAL-PIN-QUALIFICATION-FIX1-ONEUSE-20261115');
           const sourceTree=git('rev-parse','HEAD^{tree}');assert.match(sourceTree,/^[a-f0-9]{40}$/);
           const samePath='docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md',workflowPath='.github/workflows/afw-finite-budget-qualification.yml';
           const ss=fs.lstatSync(samePath);assert(ss.isFile()&&!ss.isSymbolicLink()&&ss.size<=2600000);
           const documentBytes=fs.readFileSync(samePath);assert.equal(blob(documentBytes),git('rev-parse','HEAD:'+samePath));
           const prior=documentBytes.subarray(0,2540300);assert.equal(prior.length,2540300);assert.equal(hash(prior),'3ceabc9462376ccfd94b8a368e1e66b1f229e652a402d93cd87d81dfeb45a18f');assert.equal(blob(prior),'f4da9e3c3d000ca0e64674f83e7c54ff9306d389');
           const append=documentBytes.subarray(2540300,2566139);assert.equal(append.length,25839);assert.equal(hash(append),'10fab58ec82d2dad29e245a6ce9e607b7be33cdc04f21a882a508829bcf44c71');
           const documentText=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(documentBytes),begin='<!-- AFW-SERIAL-ENTRY-PIN-FIX1-DATA-V1:BEGIN -->',end='<!-- AFW-SERIAL-ENTRY-PIN-FIX1-DATA-V1:END -->';assert.equal(documentText.split(begin).length,2);assert.equal(documentText.split(end).length,2);
           const fixSectionText=documentText.slice(documentText.indexOf(begin)+begin.length,documentText.indexOf(end));assert.equal(hash(fixSectionText),'74b035c20aa82e09af1b8ee25852aff8f2e9809a74d671d11f1da3e62b9dcb38');
           const fix=JSON.parse(fixSectionText);assert.equal('\n'+JSON.stringify(fix)+'\n',fixSectionText);
           assert.deepEqual(Object.keys(fix),['purpose','closedParent','closedTree','prefix','oneUseMessage','baseIndex','review','redReceipt','badStep','badLoader','goodLoader','boundaryProgram','boundarySchema','unchanged','minorM1','nonclaims']);
           assert.equal(fix.purpose,'afw.serial-entry-pin.fix1-data.v1');assert.equal(fix.closedParent,'a128bde0a3b3cf354a3a8ba751a5b8ebcefec72b');assert.equal(fix.closedTree,'4b6fb8d7f4072b1099b8f562a75e74ae78d9d2a1');assert.equal(fix.oneUseMessage,'AFW-SERIAL-PIN-QUALIFICATION-FIX1-ONEUSE-20261115');
           const program=fix.boundaryProgram;assert.equal(program.cap,32768);assert.equal(program.bytes,8111);assert.equal(Buffer.byteLength(program.code),program.bytes);assert.equal(hash(program.code),'c0911f371ba5a8f6a1b6f457caeef777db0185f5bff3b16ea4cec289f6bcb8c9');assert.equal(blob(Buffer.from(program.code)),'12442bebf3e4af0192e86f360cd3ef316c6d8f87');
           const schema=fix.boundarySchema.schema,schemaText=JSON.stringify(schema);assert.equal(Buffer.byteLength(schemaText),1486);assert.equal(hash(schemaText),'757b57a70245840a6b7e24c2cad90afcda86083220eef8f09ebd422dc1870810');
           const ws=fs.lstatSync(workflowPath);assert(ws.isFile()&&!ws.isSymbolicLink()&&ws.size<=73728);const workflowBytes=fs.readFileSync(workflowPath);assert.equal(blob(workflowBytes),git('rev-parse','HEAD:'+workflowPath));const workflowText=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(workflowBytes);
           const boundary=await import('data:text/javascript;base64,'+Buffer.from(program.code).toString('base64'));assert.deepEqual(Object.keys(boundary),['loaderBoundaryControls']);
           const context={source:e.GITHUB_SHA,sourceTree,run:e.GITHUB_RUN_ID};
           const boundaryWire=boundary.loaderBoundaryControls({assert,createHash,gunzipSync,spawnSync,workflowText,fix,context,env:{PATH:e.PATH}});
           assert.equal(typeof boundaryWire,'string');assert(Buffer.byteLength(boundaryWire)<=2048);assert(/^[\x00-\x7f]*$/.test(boundaryWire));assert.equal(boundaryWire.split('\n').length,2);
           const prefix='AFW_SERIAL_LOADER_BOUNDARY_UNIT/1 ';assert(boundaryWire.startsWith(prefix));const summary=JSON.parse(boundaryWire.slice(prefix.length));assert.equal(prefix+JSON.stringify(summary)+'\n',boundaryWire);
           function validate(value,shape){if(Object.hasOwn(shape,'const')){assert.deepEqual(value,shape.const);return;}if(shape.type==='object'){assert(value&&typeof value==='object'&&!Array.isArray(value));assert.equal(shape.additionalProperties,false);assert.deepEqual(Object.keys(value),shape.required);assert.deepEqual(Object.keys(shape.properties),shape.required);for(const key of shape.required)validate(value[key],shape.properties[key]);return;}assert.equal(shape.type,'string');assert.equal(typeof value,'string');assert(new RegExp(shape.pattern).test(value));}
           validate(summary,schema);assert.equal(summary.source,e.GITHUB_SHA);assert.equal(summary.sourceTree,sourceTree);assert.equal(summary.run,e.GITHUB_RUN_ID);
           process.stdout.write(boundaryWire);
          }catch{process.exitCode=1;}
          
          AFW_SERIAL_LOADER_BOUNDARY_UNIT
          then
            :
          else
            printf '%s\n' 'AFW_SERIAL_LOADER_BOUNDARY_UNIT_FAILED' >&2
            exit 1
          fi
      - name: Check serial entry pin reuse
        id: serialPins
        if: ${{ success() && steps.loaderBoundary.conclusion == 'success' && steps.checkout.outcome == 'success' && steps.node.outcome == 'success' }}
        shell: bash
        run: |
          set -euo pipefail
          umask 077
          if test -n "${NODE_OPTIONS+x}" || test -n "${NODE_PATH+x}" || test -n "${AFW_SYN_CHECKPOINT_KEY+x}" || test -n "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"; then
            printf '%s\n' 'AFW_SERIAL_ENTRY_PIN_UNIT_FAILED' >&2
            exit 1
          fi
          if node --input-type=module 2>/dev/null <<'AFW_SERIAL_PIN_UNIT'
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
          assert.equal(git('log','-1','--format=%B'), 'AFW-SERIAL-PIN-QUALIFICATION-FIX1-ONEUSE-20261115');
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
          
          AFW_SERIAL_PIN_UNIT
          then
            :
          else
            printf '%s\n' 'AFW_SERIAL_ENTRY_PIN_UNIT_FAILED' >&2
            exit 1
          fi
      - name: Run declared full104 controls only
        if: ${{ always() && steps.loaderBoundary.conclusion == 'success' && steps.serialPins.conclusion == 'success' && steps.checkout.outcome == 'success' && steps.node.outcome == 'success' }}
        shell: bash
        env:
          AFW_CHECKOUT_OUTCOME: ${{ steps.checkout.outcome }}
          AFW_NODE_OUTCOME: ${{ steps.node.outcome }}
        run: |
          set +e
          umask 077
          if test "${AFW_CHECKOUT_OUTCOME-}" != success || test "${AFW_NODE_OUTCOME-}" != success || test -n "${NODE_OPTIONS+x}" || test -n "${NODE_PATH+x}" || test -n "${AFW_SYN_CHECKPOINT_KEY+x}" || test -n "${AFW_BUDGET_DIAGNOSTIC_CANDIDATE+x}"; then
            printf '%s\n' 'AFW_R3_DELIVERY_CONTROLS_UNAVAILABLE/1 {"purpose":"afw.r3-delivery.controls-unavailable.v1","reason":"setup_unavailable","source":"unknown","sourceTree":"unknown","run":"unknown","attempt":"unknown","job":"unknown","node":"unknown","allPassed":"unknown","expected":104,"passed":"unknown","failed":"unknown","unknown":"unknown","results":"unknown","mutants":"unknown","nativeBusinessCases":0,"nonclaims":{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}}' 2>/dev/null; exit 1
          fi
          if ! { test -d "${PWD-}" && pwd -P >/dev/null; } 2>/dev/null; then
            printf '%s\n' 'AFW_R3_DELIVERY_CONTROLS_UNAVAILABLE/1 {"purpose":"afw.r3-delivery.controls-unavailable.v1","reason":"outer_startup_unavailable","source":"unknown","sourceTree":"unknown","run":"unknown","attempt":"unknown","job":"unknown","node":"unknown","allPassed":"unknown","expected":104,"passed":"unknown","failed":"unknown","unknown":"unknown","results":"unknown","mutants":"unknown","nativeBusinessCases":0,"nonclaims":{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}}' 2>/dev/null; exit 1
          fi
          if ! exec 2>/dev/null; then
            printf '%s\n' 'AFW_R3_DELIVERY_CONTROLS_UNAVAILABLE/1 {"purpose":"afw.r3-delivery.controls-unavailable.v1","reason":"setup_unavailable","source":"unknown","sourceTree":"unknown","run":"unknown","attempt":"unknown","job":"unknown","node":"unknown","allPassed":"unknown","expected":104,"passed":"unknown","failed":"unknown","unknown":"unknown","results":"unknown","mutants":"unknown","nativeBusinessCases":0,"nonclaims":{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}}' 2>/dev/null; exit 1
          fi
          r3_image_ready=0
          r3_image_root=
          if test -n "${RUNNER_TEMP-}" && test -d "${RUNNER_TEMP-}"; then
            r3_image_root=$(/usr/bin/mktemp -d -- "${RUNNER_TEMP%/}/afw-r3-node.XXXXXXXX")
            case "$r3_image_root" in
              "${RUNNER_TEMP%/}"/afw-r3-node.????????)
                if exec 9<"$r3_image_root"; then r3_image_ready=1; fi
                ;;
            esac
          fi
          unset r3_image_root
          if test "$r3_image_ready" != 1; then
            printf '%s\n' 'AFW_R3_DELIVERY_CONTROLS_UNAVAILABLE/1 {"purpose":"afw.r3-delivery.controls-unavailable.v1","reason":"setup_unavailable","source":"unknown","sourceTree":"unknown","run":"unknown","attempt":"unknown","job":"unknown","node":"unknown","allPassed":"unknown","expected":104,"passed":"unknown","failed":"unknown","unknown":"unknown","results":"unknown","mutants":"unknown","nativeBusinessCases":0,"nonclaims":{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}}' 2>/dev/null; exit 1
          fi
          exec 4</proc/thread-self
          /usr/bin/python3 -I -S /proc/self/fd/5 bootstrap-initial 5<<'AFW_R3_CONTROLS_ENTRY'
          # Fixed Source literal: verified module/kernel snapshots only, no caller code/path selection.
          import os,sys,stat,fcntl,base64,zlib,hashlib
          def need(v):
           if not v:raise ValueError()
          def sealed_source(data,label,maximum):
           need(type(data) is bytes and 0<len(data)<=maximum and maximum in [32768,65536] and label in ['afw-r3-lifetime','afw-r3-module','afw-r3-parent','afw-r3-helper'])
           f=os.memfd_create(label,os.MFD_CLOEXEC|os.MFD_ALLOW_SEALING)
           try:
            at=0
            while at<len(data):
             n=os.write(f,memoryview(data)[at:]);need(n>0);at+=n
            os.fchmod(f,0o400);os.lseek(f,0,os.SEEK_SET)
            seals=fcntl.F_SEAL_WRITE|fcntl.F_SEAL_GROW|fcntl.F_SEAL_SHRINK|fcntl.F_SEAL_SEAL
            fcntl.fcntl(f,fcntl.F_ADD_SEALS,seals);need(fcntl.fcntl(f,fcntl.F_GET_SEALS)&seals==seals)
            return f
           except BaseException:os.close(f);raise
          def unpack(pin):
```
Noexistinghelper/unit/matrix/oracle/process/cleanup/clocks changed. Among39sourcesonly2workflowextraschanged; source39manifest309e5d20 exacthasheschecked. Entirecurrentf4prefixplusclosedfixsection; Rootcaughtplainloaderhistoricalmarkerduplicationinworking949beforeSource, finalusescompressedloader snapshot. Sixhistorical+fixpairdelimiterssingleacrossfinalfullreadback, no countwaiver. ActualoldbadYAMLstepUTF8offset1347..15248/rootcheckedagainstfull757 andderivedbadloaderfc82133f; currentassembledbodybyteequalgoodloader+knownseparatorLF. All33helpers/remaining37sourceentries/raw/gzip/unitc8 unchanged. NoarbitrarySourcepermissionorbudgetextension.

## Closed fix envelope metadata (code supplied above; compressed bodies omitted from this human view, exact full artifact is preserved)
{"purpose":"afw.serial-entry-pin.fix1-data.v1","closedParent":"a128bde0a3b3cf354a3a8ba751a5b8ebcefec72b","closedTree":"4b6fb8d7f4072b1099b8f562a75e74ae78d9d2a1","prefix":{"blob":"f4da9e3c3d000ca0e64674f83e7c54ff9306d389","bytes":2540300,"sha256":"3ceabc9462376ccfd94b8a368e1e66b1f229e652a402d93cd87d81dfeb45a18f"},"oneUseMessage":"AFW-SERIAL-PIN-QUALIFICATION-FIX1-ONEUSE-20261115","badStep":{"blob":"87aac9f1261f4ee4e136687466ab49e60a92e555","bytes":13901,"sha256":"f24280b1082964a1d138d2e8c746b8ee5c3ffe4b98352df94d5b11f48f6982a5","zipBytes":5055,"zipSha256":"5c779bfba3fe367cc27ee8b90cc49b7c003c59e1d7556f63f6a405e3dbd0269e","data":"[exact compressed DATA in fullSAME b2b89b64]","offsetBytes":1347,"endBytes":15248,"sourceWorkflow":{"blob":"757f95ff72ead519a01e3ecaead2bd2925b35189","bytes":53811,"sha256":"568a45559b1fbf05ec294c0c8c4bf2c87a809b0c7330a7d4867428ee86918eba"},"start":"      - name: Check serial entry pin reuse\n","nextStep":"      - name: Run declared full104 controls only\n","indentSpaces":10,"separatorLF":1},"badLoader":{"blob":"fc82133f1f7339c2dfa7ddbbe99066151235830e","bytes":12566,"sha256":"e9d0949d3b2207fc66d59d842fcdda21e1853d70a2cf88d2906b396c61a0824e"},"goodLoader":{"blob":"462749f6a2b4800bdc85dd4b12b3463fb58f07c9","bytes":12838,"sha256":"8170a27196a3ffc6bed4aef0aff6623d9f0e7aa73f95aea6a09cc0efd3a8192d","kind":"unit-loader-gzip-snapshot","cap":32768,"zipCap":32768,"zipBytes":4880,"zipSha256":"c8646bfd5fe62feeb65f031d60c11041e78e7cf33a892b2934dd5a6fc7de0595","data":"[exact compressed DATA in fullSAME b2b89b64]"},"boundaryProgram":{"blob":"12442bebf3e4af0192e86f360cd3ef316c6d8f87","bytes":8111},"boundarySchema":{"blob":"c949233bdf0086d919cbf2210f20d138524b5026","bytes":1486,"sha256":"757b57a70245840a6b7e24c2cad90afcda86083220eef8f09ebd422dc1870810","kind":"closed-boundary-schema","cap":32768,"schema":{"$schema":"https://json-schema.org/draft/2020-12/schema","type":"object","additionalProperties":false,"required":["purpose","source","sourceTree","run","attempt","job","node","baselineBindingControl","correctedBindingControl","syntaxFailure","oversizedStderrFailure","assertionFailure","singleFrameSuccess","fixtureOnly","nativeBusinessCases","nonclaims"],"properties":{"purpose":{"const":"afw.serial-loader.boundary-unit.v1"},"source":{"type":"string","pattern":"^[a-f0-9]{40}$"},"sourceTree":{"type":"string","pattern":"^[a-f0-9]{40}$"},"run":{"type":"string","pattern":"^[1-9][0-9]{0,19}$"},"attempt":{"const":1},"job":{"const":"readonly"},"node":{"const":"22.23.4"},"baselineBindingControl":{"const":"rejected"},"correctedBindingControl":{"const":"passed"},"syntaxFailure":{"const":"passed"},"oversizedStderrFailure":{"const":"passed"},"assertionFailure":{"const":"passed"},"singleFrameSuccess":{"const":"passed"},"fixtureOnly":{"const":true},"nativeBusinessCases":{"const":0},"nonclaims":{"type":"object","additionalProperties":false,"required":["historicalCauseProven","receiptAuthenticated","operationalReadiness","completePackage","PCoff","globalNativeDrainVerified","sdkNamespaceEmptyVerified"],"properties":{"historicalCauseProven":{"const":false},"receiptAuthenticated":{"const":false},"operationalReadiness":{"const":false},"completePackage":{"const":false},"PCoff":{"const":false},"globalNativeDrainVerified":{"const":false},"sdkNamespaceEmptyVerified":{"const":false}}}}}},"unchanged":{"unit":"c8ab01ecb2e569fd8908c8edc22a630664c08ee7","controls":"17e101dd8720312111b7dffb37f7edb8da41a0fd","raw":"2716e7224ddee98690f457d0c48e6d096bd17024"}}

## Full exact forward/reverse fix diff artifacts
{"index":{"blob":"77e464da75da1f5ceedd8118f95d716742aa0b82","bytes":2231,"sha256":"b51c103bf2c097b7ab5f0bf834236d04f6fb0048b35377b84e8fdea4d7e0a02d","kind":"fix1-diff-index","cap":24576},"artifacts":{"unit-loader.mjs.reversible.json":{"blob":"116b0f2451c5b1f2baf3223f1de1067323aef0f1","bytes":30238,"sha256":"7fa17a8e5d4ca5791f5d775a9f1df036a967e14efb9aea7e099a7bb294490da8","kind":"fix1-reversible-data-diff","cap":262144},"inactive-f7.yml.reversible.json":{"blob":"a5ba11db93fcd1f0ae05e8067f35e24d2aabcf40","bytes":47946,"sha256":"fe8637d831d132a257da95ae0e8309786d222dd8c1d5f34fa99b4d32a8b73bc6","kind":"fix1-reversible-data-diff","cap":262144},"active-f7.yml.reversible.json":{"blob":"677180b6148080b0e466189e9ad17fc5349fde96","bytes":49307,"sha256":"8eb20401c4ed5fb20d70e04a02c39cbd932f91ddc0d57a3e73c47cb9c071eb89","kind":"fix1-reversible-data-diff","cap":262144},"source-manifest.json.reversible.json":{"blob":"d010596b5707d288200386c6f60d8e4e41bd546e","bytes":1333,"sha256":"f5cd033a3a16d1f042c6e0b3138908591b64d8810ba207a8cf3f716c7c89cd52","kind":"fix1-reversible-data-diff","cap":262144},"same-append.reversible.json":{"blob":"fb82631e6487a4002cc87bffb1567505c0104e88","bytes":34993,"sha256":"1ce39a46aaf37092e53a117dee8201947dc9db70fff1c78292462cf6fd17e5ff","kind":"fix1-reversible-data-diff","cap":262144},"original-f7-to-active.reversible.json":{"blob":"f3ed129a1da01a627243a2139d518a3c6570348a","bytes":250796,"sha256":"e5832eb9b66599529c7f948033dee536f09941e68c02bbd9bb964dac7e663dc0","kind":"fix1-reversible-data-diff","cap":262144}},"normalBase":"Exact reviewed baseIndex a989: loaderfc82133f/F7off6d16/active757/Source39daad.","sameBase":"Entire current f4 prefix including RED/closure receipt.","originalF7Recovery":"Originalf7a71→newactive; preserve whole SAME/receipt.","forwardReverseValidation":"exact byte reconstruction checked as STRING/DATA only; no Source executed"}
AllsixcheckedexactinbothdirectionsbyRootDATAonly. Oldreportprefix/WholecurrentSAME preserved; no truncation/minification, actualSourcecapsstayfixed.Raw524288/gzip131072/base64174764/helper32768/bootstrap65536/workflow73728/report24576/SAME2600000/delivery8192/stderr4096/sample4096/site16384/context2048/maxBuffer32768. Additionaltestcodeoutside33/39<=32768 each, Data-diffs<=262144. Onejob7min/Node22.23.4/actionpins/readonly/pushattempt1 andnewexactoneUseMessage retained. Childfixturetimeout5000/maxBuffer4096 onlyfixedfourcases.Sourceprivatedata/stacksrawstderrdiscarded byshell; successoneframeunchanged.

## Scope/authority
VerdicteachpreviousCritical/Important ADDRESSEDorNOT withfile:line, checkfixdiffonlyfornewbreakage; unchangedcodeobservationsseparate. StaticSTRING/DATAinspectiononly,noSourcecodeeval/import/compile/syntax/tests locally/cloud, noSourcecandidate/ref/run/PR/provider/browser/OAuth/credentials/OriginalCLI/Native, noagents. Immutablecumulative reviewreportcreate_blob permitted; retainentirea1ffca40reportprefix andappendfix1verdicts, do noteditoldfindings. Logicalreport docs/superpowers/reviews/2026-11-15-serial-pin-task-review.md. Roothandlesanynextfix/scope.Allsevennonclaimsfalse. Noqualification/PCoffclaimfrompreflightPASS.
