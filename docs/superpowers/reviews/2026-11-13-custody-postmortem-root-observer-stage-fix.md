# Root metadata-only observer correction

Not Sourceimplementation. Whole-review I1exposedanalogousstagecoercioninindependentRootobserver. Originaltypedmetadatafixtureone-elementarraymetadata_httpwasaccepted; requireprimitiveSTRINGbeforeObject.hasOwn. CurrentactualstrictSAFEvalidstringsrevalidatedunchanged. Tests:
```json
{
  "oldCounterexampleConfirmed": true,
  "currentStrictSafePositive": 1,
  "negativeRejected": 6,
  "metadataFixturesOnly": true,
  "SourceExecuted": false,
  "actualEvidenceUnchanged": true
}
```
Exactownfunctiondelta:
```diff
-must(Object.hasOwn(patterns,t.stage),'stage enum');
+must(typeof t.stage==='string'&&Object.hasOwn(patterns,t.stage),'stage enum');
```
NoSourceexecuted/privatebytes/testSourceimport; metadatafixturesonly. Currenttarget103/354960272and96/344974155same.
