# Root independent R1 SMALLSAFE metadata audit

Purpose: prepare Task2 validation while Task1 P4 correction runs. This is Root-owned metadata code, not AFW Source, and has never imported/executed Source. Uses only the approved two-JSON SMALLSAFE already bounded by a separate strict ZIP/CRC/path/range/UTF8/EOF auditor. It never downloads Original cipher/plain, key, MODEL or actual producer logs. Baseline is the previously approved public wrapper from historical run43313662894; all prior facts are deep-compared after excluding only current inspector source/run, timing values and new purpose. Whole R2 certificate and both ownerReference rows must remain identical. Five readiness flags remain false.

Synthetic qualification: one accepted synthetic pair; nine rejected mutations (old R2 certificate, old reference row, readiness, enum, false none, current source, Original context, extra property, manifest byte length). These are tests of Root's own audit only, not actual projection or Source qualification. Expected source/run must come from independent GitHub metadata for a future separately released run.

```javascript
function auditR1ActualSafe(safe, expected, baseline) {
 const assert=requireAssert, crypto=metadataCrypto;
 const exact=(o,ks,label)=>assert.deepStrictEqual(Object.keys(o).sort(),[...ks].sort(),label);
 assert.equal(safe.completeInventory,true);
 assert.equal(safe.files.length,2);
 const files=new Map(safe.files.map(x=>[x.name,x]));
 assert.deepStrictEqual([...files.keys()].sort(),['manifest.json','result.json']);
 const rf=files.get('result.json'), mf=files.get('manifest.json');
 assert.ok(rf.bytes+mf.bytes<=65536); assert.ok(safe.zipBytes<=131072);
 const r=rf.value, m=mf.value;
 exact(m,['purpose','inspectorSource','inspectorRun','attempt','files'],'manifest keys');
 assert.equal(m.purpose,'afw.readonly-http-frontier-manifest.safe.v1');
 assert.equal(m.inspectorSource,expected.source); assert.equal(m.inspectorRun,String(expected.run)); assert.equal(m.attempt,1);
 assert.equal(m.files.length,1); exact(m.files[0],['path','bytes','sha256'],'manifest entry keys');
 assert.equal(m.files[0].path,'result.json'); assert.equal(m.files[0].bytes,rf.bytes); assert.equal(m.files[0].sha256,rf.sha256);
 exact(r,[...Object.keys(baseline),'httpFrontier'],'result keys');
 assert.equal(r.purpose,'afw.readonly-http-frontier.safe.v1');
 exact(r.httpFrontier,['r1FirstRejectedPredicate'],'frontier keys');
 const predicate=r.httpFrontier.r1FirstRejectedPredicate;
 assert.ok(['none','array_type','record_limit','row_type','elapsed_ms','body_guard_ms','unknown'].includes(predicate));
 const old=structuredClone(baseline), current=structuredClone(r); delete current.httpFrontier; current.purpose=old.purpose;
 const inspector=current.inspection.inspector;
 assert.equal(inspector.source,expected.source); assert.equal(inspector.run,String(expected.run)); assert.equal(inspector.attempt,1);
 assert.equal(inspector.repository,'tokenizartinfo-ops/agent-friendly-web');
 assert.equal(inspector.ref,'refs/heads/feat/finite-native-cleanup-20261101');
 assert.equal(inspector.node,'22.23.4');
 assert.deepStrictEqual(current.inspection.originalContext,old.inspection.originalContext);
 assert.deepStrictEqual(current.inspection.artifact,old.inspection.artifact);
 assert.equal(current.inspection.authentication.authenticated,true);
 assert.equal(current.inspection.authentication.innerInventoryVerified,true);
 assert.equal(current.inspection.authentication.fileCount,128); assert.equal(current.inspection.authentication.totalBytes,298888337);
 exact(current.inspection.timings,Object.keys(old.inspection.timings),'timing keys');
 for(const v of Object.values(current.inspection.timings)) assert.ok(Number.isFinite(v)&&v>=0);
 delete current.inspection.timings; delete old.inspection.timings;
 delete current.inspection.inspector.source; delete old.inspection.inspector.source;
 delete current.inspection.inspector.run; delete old.inspection.inspector.run;
 assert.deepStrictEqual(current,old,'all prior public facts must be byte-value equivalent except actual inspector context/timings/purpose');
 const r1=r.ownerReference.find(x=>x.case==='R1'),group=r.referenceStage.r1FirstRejectedGroup;
 if(predicate==='none') assert.ok(r1.status==='present'&&group==='none');
 else if(predicate!=='unknown') assert.ok(r1.status==='invalid'&&group==='http');
 for(const flag of ['operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified']) {
  assert.equal(r[flag],false); assert.equal(r.inspection[flag],false);
 }
 return {currentSource:expected.source,run:String(expected.run),attempt:1,zipCRCInventoryAndManifest:true,
  originalAuthenticated:true,allPriorPublicFactsEqual:true,r1Status:r1.status,oldRejectedGroup:group,r1FirstRejectedPredicate:predicate,
  completeR2CertificateEqual:true,RawDownloadedToRoot:false,NativeExecuted:false,allFiveFalse:true};
}
```

Bindings `requireAssert` and `metadataCrypto` refer only to Node built-ins in Root's own metadata session. Parsed SAFE structures come from the separate strict ZIP reader. Original source/run/authentication/inventory values are compared against immutable public baseline, not rewritten. Task2 still HELD pending Task1 CLEAN and separate finite release.
