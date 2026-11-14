# Final whole-plan review package — sanitized failing-stage observations

## Identity and scope

AFWONLY repo tokenizartinfo-ops/agent-friendly-web/id1347578006. Plan docs/superpowers/plans/2026-11-13-sanitized-stage-observations.md, bindingdesign docs/superpowers/specs/2026-11-13-sanitized-stage-observations-design.md plus taskbriefs fix1/task2/task3. Sourceisolatedfeat/finite-native-cleanup-20261101; Rootdocsseparate. WHOLE UNIT Baseb5873e87d1f00ad10985171959e93015bc6045e3/treeaf758fa9→Head3bdefc9189c163173c324ae48c7ebb3ed3de70e8/tree78b93e18. Main0c9c475b3ebaa970fc11d628b40e50a90cceb727 unchanged. No productionpublication/CFmutations/OAuth/credentialcustody/Max/customerdata. All7nonclaimsfalse. This sourceunit deliveredqualifieddiagnostichelpersandoneinstrumentedwholeSYNattempt; it DID NOTresolveallbusinessfailures ormakeAFWreadyforPCoff. Live/privateNodebusiness/readinessremainingisrecordedbelow, not Sourceacceptance.

## Task/review/run inventory

Task1 initialqualification43504422934/1FAILED d12/d13 (blanketprepareStackTraceguardincompatiblewithNode22default); Sourceclosedbeforefix. Fix1 firsttrustedmodulecapture+lateprojector, controlledstartup/no arbitrarypre-capturecompromiseguarantee: run43511398408/1SUCCESS; GREEN42/42, allunknownstubRED14fails,14ZIP+13receiver=69logicalchecks; RootassignedSMALLSAFE14079075483 independentlystrictverified. Final03680f05, Task1combinedSpec✅/Approved/C0I0M0.
Task2 D/Amarkers+wrappers/Sourcepinripples: run43606148496/1SUCCESS,privacycanaryRED33/pass32/fail1; GREEN33/33,16integration(actualAexport+frozenparser),6receiver=55newlogicalchecks. Frozen14Znotrequalifiedseparately. RootassignedSMALLSAFE14118088928 independentlystrictverified (API-uploader-rawtriple/canonicalclosedpair/currentpins). Source77cff1a0, Task2combinedSpec✅/Approved/C0I0M0.
Task3 oneoriginalwholeSYNrun43608448872/1FAILED, all8jobs explicitlyterminal15:24:22UTC before Sourcewrite;5success,Readonlyfail,Bskipped,verifyfail; business16NOTaccepted. RootONLYliteral3assignedDIAG14119776284/14119682967/14119507842 independentlystrictverified; positive/redprepare rawsuccess+write_filescomplete/HTTP200. ReadonlycompoundrawFAILURE,sealcodecustody_limit/sitecustody_20; internalcase/exactcapunknown. SuiteSAFEabsent/acceptedfalse,NOname/historyfallback/download. Source3bdefc91 afterrestoree4aaf3da; Task3combinedSpec✅/Approved/C0I0M0 asobservedFAILEDtrial, not businesssuccess.

Allone-useSourceCAS exactgatedintent/attempt1; no rerun/overlay; all declaredjobsterminalbeforerestoration; rootfulltree/prefix audits. No parked/deferredMinor findings fromthree taskreviews. Initialruntimefix1wasqualifiedafterclosedfailure, not concurrentoverlay. A finalreviewdiff fixwave has NOT occurred.

## Full tree/provenance

Root completeuntruncatedbase3196→current3201leaves; exactly7declaredchangedpaths below (5newfiles+World2hunks+SAMEreportappend);62workflowblobs byte/mode/type exact. OriginalF7f7a71f1a restored aftereveryunit. Currenthead0runs/consumedhead1exactrun/5active0/main0c9 verified14nov15:34UTC. Evidence isdated, notfutureguarantee. Currentreport2a73df3c/445242B/SHA581d2d50c3ace260d3d64856a8a30cec4895affddaaeda30bdad1ae5cbbb2789 preservesALLbase310591B+everyintermediateprefix.

## Complete permanent diff Base→Head

diff --git a/test/fixtures/finite-budget-failure-runtime.mjs b/test/fixtures/finite-budget-failure-runtime.mjs
new file mode100644
--- /dev/null
+++ b/test/fixtures/finite-budget-failure-runtime.mjs
@@ -0,0 +1,70 @@
+import {types} from 'node:util';
+import {AssertionError} from 'node:assert/strict';
+import process from 'node:process';
+
+// First trusted Source dependency; pre-capture arbitrary code is outside this contract.
+const globalObject=globalThis,descriptor=Object.getOwnPropertyDescriptor,prototype=Object.getPrototypeOf,own=Object.hasOwn,apply=Reflect.apply;
+const isProxy=types.isProxy,isNativeError=types.isNativeError,isArray=Array.isArray,byteLength=Buffer.byteLength;
+const objectPrototype=Object.prototype;
+function sameDescriptor(a,b){
+ if(!a||!b)return a===b;
+ for(const key of ['value','writable','get','set','enumerable','configurable']){if(own(a,key)!==own(b,key))return false;if(own(a,key)&&a[key]!==b[key])return false;}
+ return true;
+}
+function data(value){return value&&own(value,'value');}
+function bounded(value){return typeof value==='string'&&value.length<=65536&&byteLength(value,'utf8')<=65536;}
+function startupAllowed(){
+ if(process.versions.node!=='22.23.4')return false;
+ const env=descriptor(process,'env'),args=descriptor(process,'execArgv');
+ if(!data(env)||!env.value||isProxy(env.value)||!data(args)||!isArray(args.value)||isProxy(args.value))return false;
+ const option=descriptor(env.value,'NODE_OPTIONS');if(option&&(!data(option)||(option.value!==undefined&&option.value!=='')))return false;
+ const length=descriptor(args.value,'length');if(!data(length)||!Number.isSafeInteger(length.value)||length.value>16)return false;
+ for(let index=0;index<length.value;index++){const entry=descriptor(args.value,String(index));if(!data(entry)||!['--experimental-vm-modules','--test','--test-reporter=tap','--input-type=module'].includes(entry.value))return false;}
+ return true;
+}
+function capture(){
+ try{
+  if(!startupAllowed())return null;
+  const globalError=descriptor(globalObject,'Error');if(!data(globalError)||typeof globalError.value!=='function'||isProxy(globalError.value))return null;
+  const ErrorConstructor=globalError.value,errorPrototypeProperty=descriptor(ErrorConstructor,'prototype'),assertionPrototypeProperty=descriptor(AssertionError,'prototype');
+  if(!data(errorPrototypeProperty)||!data(assertionPrototypeProperty))return null;
+  const errorPrototype=errorPrototypeProperty.value,assertionPrototype=assertionPrototypeProperty.value;
+  if(!errorPrototype||!assertionPrototype||isProxy(errorPrototype)||isProxy(assertionPrototype)||prototype(errorPrototype)!==objectPrototype||prototype(assertionPrototype)!==errorPrototype)return null;
+  const constructors=[];for(let cursor=ErrorConstructor;cursor!==null;cursor=prototype(cursor)){
+   if(isProxy(cursor))return null;const formatting=descriptor(cursor,'prepareStackTrace');
+   if(cursor===ErrorConstructor){if(!data(formatting)||typeof formatting.value!=='function'||isProxy(formatting.value)||formatting.enumerable||!formatting.writable||!formatting.configurable)return null;}
+   else if(formatting)return null;
+   constructors.push({object:cursor,parent:prototype(cursor),formatting});
+  }
+  const limit=descriptor(ErrorConstructor,'stackTraceLimit');if(!data(limit)||typeof limit.value!=='number'||!Number.isFinite(limit.value))return null;
+  const keys=['name','message','toString','constructor','code',Symbol.toStringTag],prototypes=[];
+  for(const object of [errorPrototype,assertionPrototype,objectPrototype]){
+   if(isProxy(object))return null;const fields=keys.map(key=>[key,descriptor(object,key)]);
+   for(const [key,value]of fields){if(!value)continue;if(key===Symbol.toStringTag||!data(value))return null;if((key==='name'||key==='message'||key==='code')&&value.value!==undefined&&!bounded(value.value))return null;if((key==='toString'||key==='constructor')&&(typeof value.value!=='function'||isProxy(value.value)))return null;}
+   prototypes.push({object,parent:prototype(object),fields});
+  }
+  const sample=new ErrorConstructor();if(!isNativeError(sample)||isProxy(sample))return null;
+  const stack=descriptor(sample,'stack');if(!stack||data(stack)||typeof stack.get!=='function'||typeof stack.set!=='function'||isProxy(stack.get)||isProxy(stack.set))return null;
+  return {globalError,ErrorConstructor,errorPrototype,assertionPrototype,errorPrototypeProperty,assertionPrototypeProperty,constructors,prototypes,limit,stack};
+ }catch{return null;}
+}
+const trusted=capture();
+export function readNativeStack(error){
+ try{
+  if(!trusted||!startupAllowed()||!sameDescriptor(descriptor(globalObject,'Error'),trusted.globalError))throw null;
+  if(error===null||typeof error!=='object'||isProxy(error)||!isNativeError(error))throw null;
+  if(!sameDescriptor(descriptor(trusted.ErrorConstructor,'prototype'),trusted.errorPrototypeProperty)||!sameDescriptor(descriptor(AssertionError,'prototype'),trusted.assertionPrototypeProperty)||!sameDescriptor(descriptor(trusted.ErrorConstructor,'stackTraceLimit'),trusted.limit))throw null;
+  const parent=prototype(error);if(parent!==trusted.errorPrototype&&parent!==trusted.assertionPrototype)throw null;
+  for(const entry of trusted.constructors)if(isProxy(entry.object)||prototype(entry.object)!==entry.parent||!sameDescriptor(descriptor(entry.object,'prepareStackTrace'),entry.formatting))throw null;
+  for(const entry of trusted.prototypes){
+   if(isProxy(entry.object)||prototype(entry.object)!==entry.parent)throw null;
+   for(const [key,value]of entry.fields)if(!sameDescriptor(descriptor(entry.object,key),value))throw null;
+  }
+  for(const key of ['name','message','code']){
+   const value=descriptor(error,key);if(value&&(!data(value)||(value.value!==undefined&&!bounded(value.value))))throw null;
+  }
+  for(const key of ['toString','constructor',Symbol.toStringTag])if(descriptor(error,key))throw null;
+  const stack=descriptor(error,'stack');if(!sameDescriptor(stack,trusted.stack))throw null;
+  const text=apply(trusted.stack.get,error,[]);if(!bounded(text))throw null;return text;
+ }catch{throw null;}
+}
diff --git a/test/fixtures/finite-budget-failure-diagnostic.mjs b/test/fixtures/finite-budget-failure-diagnostic.mjs
new file mode100644
--- /dev/null
+++ b/test/fixtures/finite-budget-failure-diagnostic.mjs
@@ -0,0 +1,67 @@
+import {types} from 'node:util';
+
+// Public source-site IDs are untrusted hints, never authenticated causes.
+export const FIXED_BUDGET_FAILURE_CODES=Object.freeze(["unknown","assertion","EEXIST","ENOENT","EACCES","ENOSPC","ETIMEDOUT","custody_format","custody_limit","custody_size","custody_destination","custody_authentication","custody_io","custody_cleanup"]);
+export const FIXED_BUDGET_FAILURE_SOURCES=Object.freeze([{"alias":"world","path":"test/fixtures/finite-budget-world.mjs","lines":[49,65,87,91,92,93,96,97,102,108,112,144,171,177,183,184,188,189,190,191,229,233,235,236,237,240,260,277,287,288,294,299,316,320,325,333,352,353,359,392,458,468,469,479,507,570,577,578,612,613,620,644,646,669,670,671,676,677,691,696,698,711,714,715,716,722,725,726,728,732,733,735,741,742,743,745,746,748,751,753,754,755,760,761,769,773,778,804,805,806,808,811,812,814,815,825,830,831,833,834,838,844,852,857,858,864,872,895,902,906,919,925,927,933,938,943,944,945,946,947,955,961,966,971,972,999,1005,1007,1014,1026,1028,1031,1040,1047,1050,1051,1052,1055,1056,1059,1060,1061,1062,1064,1072,1073,1074,1075,1076,1138,1139,1140,1145,1146,1150,1151,1152,1153,1158,1161,1168,1174,1176,1180,1181,1188,1190,1205,1214,1215,1217,1218,1219,1221,1222,1232,1236,1237,1242,1258,1265,1267,1269,1272,1275,1277,1282,1290,1300,1302,1303,1306,1308,1309,1310,1312,1313,1314,1315,1316,1317,1324,1334,1336,1344,1346,1349,1360,1365,1384,1396,1398,1409,1411,1413,1421,1422,1423,1424,1425,1436,1437,1442,1443,1457,1458,1459,1460,1461,1462,1463,1464,1466,1467,1473,1475,1476,1480,1481,1482,1483,1498,1499,1500,1501,1502,1506,1507,1508,1509,1510,1518,1520,1522,1529,1530,1531,1532,1543,1554,1558,1566,1567,1568,1575,1579,1585,1590,1591,1592,1593,1595,1596,1597,1599,1600,1613,1614,1616,1617,1618,1622,1626,1630,1633,1634,1638,1645,1647,1648,1649,1655,1682,1687,1688,1689,1699,1700,1706,1707,1713,1718,1727,1729,1744,1757,1779,1786,1788,1789,1790,1791,1796,1802,1805,1808,1811,1813,1814,1818,1820,1821,1822,1823,1825,1826,1828,1829,1830,1841,1844,1852,1853,1854,1855,1856,1859,1866,1879,1881,1885,1886,1889,1890,1891,1892,1893,1905,1912,1913,1931,1943,1948,1951,1953,1954,1956,1961,1965,1967,1969,1970,1971,1976,1978,1987,1988,1990,1994,1995,1996,1997,1998,1999,2000,2017,2035,2043,2044,2048,2053,2058,2059,2060,2061,2062,2063,2064,2065,2077,2079,2089,2090,2091]},{"alias":"native","path":"test/mcp-qa-finite-budget-native.test.mjs","lines":[11,15,26,29,58,62,77,78,79,80,81,82,83,86,88,89,94,95,96,106,107,108,109,110,111,112,113,115,116,117,118,120,129,130,131,132,133,134,135,136,137,138,139,141,142,143,145]},{"alias":"custody","path":"test/fixtures/finite-checkpoint-custody.mjs","lines":[20,22,51,76,293,302,310,321]},{"alias":"persistence","path":"test/fixtures/finite-owner-cleanup-persistence.mjs","lines":[18,20,25,26,27,28,29,31,32,35,36,37,39,40,41,42,43,45,46,47,48,49,50,52,53,54,55,56,59,64,65,66,71,72,73,78,80,88,90,97,98,100,104,108,113,114,115,121,124,128,131,139,141,145,146,147,151,153,165,166,167,169,174,178,183,188,191,192,193,194,195,199,201,211,212,213,218,220,221,222,223,225,226,227,229,230,237,243,244,251,252,257,261,262,264,265,271,272,295,296,297,298,299,300,301,302,303,304,309,319,321,323,324,325,327,331,372]},{"alias":"cleanup","path":"lib/mcp-qa-finite-owner-cleanup.mjs","lines":[41,42,49,609]},{"alias":"adapter","path":"test/fixtures/finite-owner-cleanup.mjs","lines":[15,19,34,73,96,97,101,104,106,107,108,110,111,112,117,118,119,120,121,122,126,128,133,134,138,144,147,150,153,154,156,157,160,174,178,182,183,184,187,189,193,202,203,204,205,206,208,209,211,212,213,219,220,222,225,231,235,274,290,302,303]}].map(row=>Object.freeze({...row,lines:Object.freeze(row.lines)})));
+export const FIXED_BUDGET_FAILURE_SITES=Object.freeze(FIXED_BUDGET_FAILURE_SOURCES.flatMap(source=>source.lines.map(line=>Object.freeze({id:source.alias+'_'+line,alias:source.alias,path:source.path,line}))));
+const codes=new Set(FIXED_BUDGET_FAILURE_CODES),sites=new Set(['unknown',...FIXED_BUDGET_FAILURE_SITES.map(row=>row.id)]);
+const root='/home/runner/work/agent-friendly-web/agent-friendly-web/';
+const locations=new Map(FIXED_BUDGET_FAILURE_SITES.flatMap(row=>[row.path,root+row.path,'file://'+root+row.path].map(path=>[path+':'+row.line,row.id])));
+const approvedPaths=new Set(FIXED_BUDGET_FAILURE_SOURCES.flatMap(row=>[row.path,root+row.path,'file://'+root+row.path]));
+const basenames=[...new Set(FIXED_BUDGET_FAILURE_SITES.map(row=>row.path.split('/').at(-1)))];
+const unavailable=()=>({code:'unknown',site:'unknown'});
+function stackValue(error,descriptor,readNativeStack){
+ if(!descriptor)return undefined;
+ if(Object.hasOwn(descriptor,'value'))return descriptor.value;
+ if(typeof readNativeStack!=='function'||types.isProxy(readNativeStack))throw null;
+ return readNativeStack(error);
+}
+function boundedLines(text){
+ if(typeof text!=='string'||text.length>65536||Buffer.byteLength(text,'utf8')>65536)return null;
+ const lines=text.split('\n');if(lines.at(-1)==='')lines.pop();
+ if(lines.length>4096||lines.some(line=>line.length>1024||Buffer.byteLength(line,'utf8')>1024||line.includes('\r')))return null;
+ return lines;
+}
+function sourceSite(stack){
+ const lines=boundedLines(stack);if(!lines||!lines.length||/^ {4}at /.test(lines[0]))return 'unknown';
+ for(const line of lines.slice(1)){
+  if(!/^ {4}at /.test(line))continue;
+  const match=/^ {4}at (?:async )?(?:new )?(?:(?:[A-Za-z0-9_$.[\]<>]+) \(([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3})\)|([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3}))$/.exec(line);
+  if(!match){if(basenames.some(name=>line.includes(name)))return 'unknown';continue;}
+  const path=match[1]??match[4],number=match[2]??match[5],site=locations.get(path+':'+number);
+  if(site)return site;
+  if(!approvedPaths.has(path)&&basenames.some(name=>path.includes(name)))return 'unknown';
+ }
+ return 'unknown';
+}
+export function projectFixedBudgetFailure(error,readNativeStack){
+ try{
+  if(error===null||typeof error!=='object'||types.isProxy(error)||!types.isNativeError(error))return unavailable();
+  const descriptors={};for(const key of ['code','message','stack']){
+   const descriptor=Object.getOwnPropertyDescriptor(error,key);
+   if(key==='stack'){descriptors[key]=stackValue(error,descriptor,readNativeStack);continue;}
+   if(descriptor&&!Object.hasOwn(descriptor,'value'))return unavailable();
+   descriptors[key]=descriptor?.value;
+   if(descriptors[key]!==undefined&&!boundedLines(descriptors[key]))return unavailable();
+  }
+  const {code:rawCode,message,stack}=descriptors;
+  if((rawCode!==undefined&&typeof rawCode!=='string')||(message!==undefined&&typeof message!=='string')||(stack!==undefined&&typeof stack!=='string'))return unavailable();
+  if([rawCode,message,stack].some(value=>value!==undefined&&!boundedLines(value)))return unavailable();
+  let code='unknown';
+  if(rawCode==='ERR_ASSERTION')code='assertion';
+  else if(['EEXIST','ENOENT','EACCES','ENOSPC','ETIMEDOUT'].includes(rawCode))code=rawCode;
+  else if(['custody_format','custody_limit','custody_size','custody_destination','custody_authentication','custody_io','custody_cleanup'].includes(message))code=message;
+  return {code,site:stack===undefined?'unknown':sourceSite(stack)};
+ }catch{return unavailable();}
+}
+export function projectFixedBudgetLog(text){
+ try{
+  const lines=boundedLines(text);if(!lines||!text.endsWith('\n'))return unavailable();
+  const markers=lines.filter(line=>line.includes('AFW_SYN_FAILURE/1'));
+  if(markers.length!==1||!markers[0].startsWith('AFW_SYN_FAILURE/1 '))return unavailable();
+  const source=markers[0].slice('AFW_SYN_FAILURE/1 '.length),value=JSON.parse(source);
+  if(value===null||typeof value!=='object'||Array.isArray(value)||JSON.stringify(Object.keys(value))!=='["code","site"]'||JSON.stringify(value)!==source)return unavailable();
+  if(!codes.has(value.code)||!sites.has(value.site))return unavailable();
+  return {code:value.code,site:value.site};
+ }catch{return unavailable();}
+}
diff --git a/test/finite-budget-failure-diagnostic.test.mjs b/test/finite-budget-failure-diagnostic.test.mjs
new file mode100644
--- /dev/null
+++ b/test/finite-budget-failure-diagnostic.test.mjs
@@ -0,0 +1,80 @@
+import {readNativeStack} from './fixtures/finite-budget-failure-runtime.mjs';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {Script} from 'node:vm';
+import {spawnSync} from 'node:child_process';
+import {projectFixedBudgetFailure as projectFailure,projectFixedBudgetLog as log} from './fixtures/finite-budget-failure-diagnostic.mjs';
+
+const failure=error=>projectFailure(error,readNativeStack);
+const unknown={code:'unknown',site:'unknown'};
+const publicSites=[{"alias":"world","path":"test/fixtures/finite-budget-world.mjs","lines":[49,65,87,91,92,93,96,97,102,108,112,144,171,177,183,184,188,189,190,191,229,233,235,236,237,240,260,277,287,288,294,299,316,320,325,333,352,353,359,392,458,468,469,479,507,570,577,578,612,613,620,644,646,669,670,671,676,677,691,696,698,711,714,715,716,722,725,726,728,732,733,735,741,742,743,745,746,748,751,753,754,755,760,761,769,773,778,804,805,806,808,811,812,814,815,825,830,831,833,834,838,844,852,857,858,864,872,895,902,906,919,925,927,933,938,943,944,945,946,947,955,961,966,971,972,999,1005,1007,1014,1026,1028,1031,1040,1047,1050,1051,1052,1055,1056,1059,1060,1061,1062,1064,1072,1073,1074,1075,1076,1138,1139,1140,1145,1146,1150,1151,1152,1153,1158,1161,1168,1174,1176,1180,1181,1188,1190,1205,1214,1215,1217,1218,1219,1221,1222,1232,1236,1237,1242,1258,1265,1267,1269,1272,1275,1277,1282,1290,1300,1302,1303,1306,1308,1309,1310,1312,1313,1314,1315,1316,1317,1324,1334,1336,1344,1346,1349,1360,1365,1384,1396,1398,1409,1411,1413,1421,1422,1423,1424,1425,1436,1437,1442,1443,1457,1458,1459,1460,1461,1462,1463,1464,1466,1467,1473,1475,1476,1480,1481,1482,1483,1498,1499,1500,1501,1502,1506,1507,1508,1509,1510,1518,1520,1522,1529,1530,1531,1532,1543,1554,1558,1566,1567,1568,1575,1579,1585,1590,1591,1592,1593,1595,1596,1597,1599,1600,1613,1614,1616,1617,1618,1622,1626,1630,1633,1634,1638,1645,1647,1648,1649,1655,1682,1687,1688,1689,1699,1700,1706,1707,1713,1718,1727,1729,1744,1757,1779,1786,1788,1789,1790,1791,1796,1802,1805,1808,1811,1813,1814,1818,1820,1821,1822,1823,1825,1826,1828,1829,1830,1841,1844,1852,1853,1854,1855,1856,1859,1866,1879,1881,1885,1886,1889,1890,1891,1892,1893,1905,1912,1913,1931,1943,1948,1951,1953,1954,1956,1961,1965,1967,1969,1970,1971,1976,1978,1987,1988,1990,1994,1995,1996,1997,1998,1999,2000,2017,2035,2043,2044,2048,2053,2058,2059,2060,2061,2062,2063,2064,2065,2077,2079,2089,2090,2091]},{"alias":"native","path":"test/mcp-qa-finite-budget-native.test.mjs","lines":[11,15,26,29,58,62,77,78,79,80,81,82,83,86,88,89,94,95,96,106,107,108,109,110,111,112,113,115,116,117,118,120,129,130,131,132,133,134,135,136,137,138,139,141,142,143,145]},{"alias":"custody","path":"test/fixtures/finite-checkpoint-custody.mjs","lines":[20,22,51,76,293,302,310,321]},{"alias":"persistence","path":"test/fixtures/finite-owner-cleanup-persistence.mjs","lines":[18,20,25,26,27,28,29,31,32,35,36,37,39,40,41,42,43,45,46,47,48,49,50,52,53,54,55,56,59,64,65,66,71,72,73,78,80,88,90,97,98,100,104,108,113,114,115,121,124,128,131,139,141,145,146,147,151,153,165,166,167,169,174,178,183,188,191,192,193,194,195,199,201,211,212,213,218,220,221,222,223,225,226,227,229,230,237,243,244,251,252,257,261,262,264,265,271,272,295,296,297,298,299,300,301,302,303,304,309,319,321,323,324,325,327,331,372]},{"alias":"cleanup","path":"lib/mcp-qa-finite-owner-cleanup.mjs","lines":[41,42,49,609]},{"alias":"adapter","path":"test/fixtures/finite-owner-cleanup.mjs","lines":[15,19,34,73,96,97,101,104,106,107,108,110,111,112,117,118,119,120,121,122,126,128,133,134,138,144,147,150,153,154,156,157,160,174,178,182,183,184,187,189,193,202,203,204,205,206,208,209,211,212,213,219,220,222,225,231,235,274,290,302,303]}].flatMap(source=>source.lines.map(line=>({path:source.path,line,id:source.alias+'_'+line})));
+const publicRoot='/home/runner/work/agent-friendly-web/agent-friendly-web/';
+const first='test/fixtures/finite-owner-cleanup-persistence.mjs',site='persistence_100';
+const frame=(path=first,line=100,column=1)=>'    at synthetic (file://'+publicRoot+path+':'+line+':'+column+')';
+const error=(code,stack='Error: SYN private text\n'+frame())=>{const value=new Error('SYN private text');Object.defineProperty(value,'stack',{value:stack,writable:true,configurable:true});if(code!==undefined)value.code=code;return value;};
+const line=value=>'AFW_SYN_FAILURE/1 '+JSON.stringify(value)+'\n';
+const fixed=value=>{assert.deepEqual(Object.keys(value),['code','site']);assert.equal(typeof value.code,'string');assert.equal(typeof value.site,'string');assert(!JSON.stringify(value).includes('SYN_PRIVATE'));};
+
+test('d01_exact_system_codes',()=>{for(const code of ['EEXIST','ENOENT','EACCES','ENOSPC','ETIMEDOUT'])assert.deepEqual(failure(error(code)),{code,site});});
+test('d02_assertion_data_fields',()=>assert.deepEqual(failure(error('ERR_ASSERTION')),{code:'assertion',site}));
+test('d03_exact_custody_messages',()=>{for(const suffix of ['format','limit','size','destination','authentication','io','cleanup']){const value=error();value.message='custody_'+suffix;assert.deepEqual(failure(value),{code:'custody_'+suffix,site});}});
+test('d04_no_code_prefix_inference',()=>{for(const code of ['ENOENT_suffix','ERR_ASSERTION_suffix','custody_io_suffix','SYN_PRIVATE'])assert.deepEqual(failure(error(code)),{code:'unknown',site});});
+test('d05_exact_custody_message_only',()=>{for(const message of ['custody_path','prefix custody_io','custody_io SYN_PRIVATE']){const value=error();value.message=message;assert.deepEqual(failure(value),{code:'unknown',site});}});
+test('d06_every_finite_public_site',()=>{const rows=publicSites;for(const row of rows)assert.deepEqual(failure(error('ENOENT','Error: SYN_PRIVATE\n'+frame(row.path,row.line))),{code:'ENOENT',site:row.id});});
+test('d07_relative_public_frame',()=>assert.deepEqual(failure(error('EACCES','Error: SYN_PRIVATE\n    at synthetic ('+first+':100:2)')),{code:'EACCES',site}));
+test('d08_no_free_paths',()=>{for(const path of ['/evil/'+first,publicRoot+'../'+first,'/tmp/finite-owner-cleanup-persistence.mjs','https://evil.invalid/'+first])assert.equal(failure(error('ENOENT','Error: SYN_PRIVATE\n    at synthetic ('+path+':100:1)')).site,'unknown');});
+test('d09_no_free_line_or_columns',()=>{for(const [number,column]of [[0,1],[99,1],[101,1],[999999999,1],[100,0],[100,10000]])assert.equal(failure(error('ENOENT','Error: SYN_PRIVATE\n'+frame(first,number,column))).site,'unknown');});
+test('d10_normal_chain_and_ambiguous_frame',()=>{assert.equal(failure(error('ENOENT','Error: SYN_PRIVATE\n'+frame()+'\n'+frame(first,128))).site,site);assert.equal(failure(error('ENOENT','Error: SYN_PRIVATE\n'+frame().slice(0,-1)+' '+frame(first,128)+')')).site,'unknown');});
+test('d11_message_cannot_forge_frame',()=>assert.deepEqual(failure(error(undefined,frame())),unknown));
+test('d12_real_vm_native_error',()=>{let value;try{new Script('throw new Error("SYN_PRIVATE native error")',{filename:first,lineOffset:99}).runInNewContext({Error});}catch(caught){value=caught;}assert(value);const descriptor=Object.getOwnPropertyDescriptor(value,'stack');assert(['value','get'].some(key=>Object.hasOwn(descriptor,key)));assert.deepEqual(failure(value),{code:'unknown',site});});
+test('d13_real_vm_assertion',()=>{let value;try{new Script('assert.equal(1,2,"SYN_PRIVATE assertion")',{filename:first,lineOffset:99}).runInNewContext({assert});}catch(caught){value=caught;}assert(value);assert.deepEqual(failure(value),{code:'assertion',site});});
+test('d14_getters_never_called',()=>{for(const key of ['code','message','stack']){let calls=0;const value=error('ENOENT');Object.defineProperty(value,key,{get(){calls++;throw Error('SYN_PRIVATE getter');}});assert.deepEqual(failure(value),unknown);assert.equal(calls,0);}
+ for(const key of ['name','message','toString','constructor']){let calls=0;const value=new Error('SYN_PRIVATE'),saved=Object.getOwnPropertyDescriptor(Error.prototype,key);try{Object.defineProperty(Error.prototype,key,{get(){calls++;throw Error('SYN_PRIVATE');},configurable:true});assert.deepEqual(failure(value),unknown);assert.equal(calls,0);}finally{Object.defineProperty(Error.prototype,key,saved);}}
+ {
+  let branded;try{Buffer.from(1);}catch(error){branded=error;}assert(branded);
+  const symbols=new Set();for(let cursor=branded;cursor!==null;cursor=Object.getPrototypeOf(cursor))for(const key of Object.getOwnPropertySymbols(cursor))symbols.add(key);
+  assert(symbols.size>0);let calls=0;const value=new Error('SYN_PRIVATE inherited code'),saved=Object.getOwnPropertyDescriptor(Error.prototype,'code');assert.equal(Object.hasOwn(value,'code'),false);
+  for(const key of symbols)Object.defineProperty(value,key,{value:true,configurable:true});
+  try{Object.defineProperty(Error.prototype,'code',{get(){calls++;throw null;},configurable:true});assert.deepEqual(failure(value),unknown);assert.equal(calls,0);}
+  finally{if(saved)Object.defineProperty(Error.prototype,'code',saved);else delete Error.prototype.code;}
+ }
+ for(const accessor of [false,true]){let calls=0;const value=new Error('SYN_PRIVATE'),saved=Object.getOwnPropertyDescriptor(Error,'prepareStackTrace');try{Object.defineProperty(Error,'prepareStackTrace',accessor?{get(){calls++;throw Error('SYN_PRIVATE');},configurable:true}:{value(){calls++;return 'SYN_PRIVATE';},configurable:true});assert.deepEqual(failure(value),unknown);assert.equal(calls,0);}finally{if(saved)Object.defineProperty(Error,'prepareStackTrace',saved);else delete Error.prepareStackTrace;}}
+});
+test('d15_proxy_traps_never_called',()=>{let calls=0;const value=new Proxy(error('ENOENT'),{get(){calls++;throw Error('SYN_PRIVATE');},getOwnPropertyDescriptor(){calls++;throw Error('SYN_PRIVATE');},getPrototypeOf(){calls++;throw Error('SYN_PRIVATE');},ownKeys(){calls++;throw Error('SYN_PRIVATE');}});assert.deepEqual(failure(value),unknown);assert.equal(calls,0);});
+test('d16_revoked_proxy',()=>{const {proxy,revoke}=Proxy.revocable(error('ENOENT'),{});revoke();assert.deepEqual(failure(proxy),unknown);});
+test('d17_arbitrary_objects_no_coercion',()=>{let calls=0;for(const value of [null,undefined,1,true,'SYN_PRIVATE',{},[],Object.create(null),{code:'ENOENT',stack:'Error\n'+frame(),toString(){calls++;return 'SYN_PRIVATE';}}])assert.deepEqual(failure(value),unknown);assert.equal(calls,0);});
+test('d18_error_private_fields_ignored',()=>{let calls=0;const value=error('ENOENT');value.actual='SYN_PRIVATE actual';value.expected='SYN_PRIVATE expected';value.toJSON=()=>{calls++;throw Error('SYN_PRIVATE');};Object.defineProperty(value,'name',{get(){calls++;throw Error('SYN_PRIVATE');}});const observed=failure(value);assert.deepEqual(observed,{code:'ENOENT',site});fixed(observed);assert.equal(calls,0);});
+test('d19_huge_error_stack',()=>assert.deepEqual(failure(error('ENOENT','SYN_PRIVATE'.repeat(7000))),unknown));
+test('d20_long_error_line',()=>assert.deepEqual(failure(error('ENOENT','Error: '+'.'.repeat(1025)+'\n'+frame())),unknown));
+test('d21_canonical_fixed_log',()=>assert.deepEqual(log('SYN_PRIVATE arbitrary unrelated\n'+line({code:'ENOENT',site})),{code:'ENOENT',site}));
+test('d22_all_log_codes_and_sites',()=>{for(const code of ["unknown","assertion","EEXIST","ENOENT","EACCES","ENOSPC","ETIMEDOUT","custody_format","custody_limit","custody_size","custody_destination","custody_authentication","custody_io","custody_cleanup"])assert.deepEqual(log(line({code,site})),{code,site});for(const row of publicSites)assert.deepEqual(log(line({code:'unknown',site:row.id})),{code:'unknown',site:row.id});});
+test('d23_log_secrets_not_echoed',()=>{const observed=log('SYN_PRIVATE assertion actual=private expected=private\n');assert.deepEqual(observed,unknown);fixed(observed);});
+test('d24_log_closed_schema',()=>{for(const value of [{code:'ENOENT',site,actual:'SYN_PRIVATE'},{site,code:'ENOENT'},{code:'ENOENT'},['ENOENT',site],null,{code:'ENOENT',site:1}])assert.deepEqual(log(line(value)),unknown);});
+test('d25_log_exact_enum_only',()=>{for(const value of [{code:'ERR_ASSERTION',site},{code:'ENOENT_suffix',site},{code:'ENOENT',site:first+':100'},{code:'ENOENT',site:'persistence_100_suffix'}])assert.deepEqual(log(line(value)),unknown);});
+test('d26_log_duplicate_json_fields',()=>assert.deepEqual(log('AFW_SYN_FAILURE/1 {"code":"ENOENT","code":"EACCES","site":"persistence_100"}\n'),unknown));
+test('d27_log_ambiguous_or_repeated_markers',()=>{for(const text of [line({code:'ENOENT',site})+line({code:'EACCES',site}),line({code:'ENOENT',site}).repeat(2)])assert.deepEqual(log(text),unknown);});
+test('d28_log_truncation',()=>{for(const text of ['AFW_SYN_FAILURE/1 {"code":"ENOENT"',line({code:'ENOENT',site}).trimEnd(),line({code:'ENOENT',site})+'SYN_PRIVATE unfinished'])assert.deepEqual(log(text),unknown);});
+test('d29_log_marker_forgery',()=>{for(const text of ['prefix '+line({code:'ENOENT',site}),'AFW_SYN_FAILURE/1  {"code":"ENOENT","site":"persistence_100"}\n','AFW_SYN_FAILURE/1 {"code":"ENOENT","site":"persistence_100"}\r\n'])assert.deepEqual(log(text),unknown);});
+test('d30_log_utf8_byte_limit',()=>assert.deepEqual(log('é'.repeat(32768)+'\n'+line({code:'ENOENT',site})),unknown));
+test('d31_log_line_limit',()=>assert.deepEqual(log('.'.repeat(1025)+'\n'+line({code:'ENOENT',site})),unknown));
+test('d32_log_count_limit',()=>assert.deepEqual(log('\n'.repeat(4096)+line({code:'ENOENT',site})),unknown));
+test('d33_nonstring_logs_no_coercion',()=>{let calls=0;for(const value of [null,undefined,{},[],new String(line({code:'ENOENT',site})),{toString(){calls++;return line({code:'ENOENT',site});}}])assert.deepEqual(log(value),unknown);assert.equal(calls,0);});
+test('d34_fresh_closed_results',()=>{const native=new Error('SYN_PRIVATE');assert.deepEqual(projectFailure(native),unknown);const firstResult=failure(null);firstResult.code='SYN_PRIVATE';assert.deepEqual(failure(null),unknown);assert.deepEqual(log(line({code:'unknown',site:'unknown'})),unknown);fixed(failure(error('ENOENT')));});
+
+const runtimeURL=new URL('./fixtures/finite-budget-failure-runtime.mjs',import.meta.url).href;
+const helperURL=new URL('./fixtures/finite-budget-failure-diagnostic.mjs',import.meta.url).href;
+function freshChild(mode,{nodeOptions,preload=false}={}){
+ const source="import assert from 'node:assert/strict';\nimport {Script} from 'node:vm';\nconst mode=__MODE__,runtimeURL=__RUNTIME_URL__,helperURL=__HELPER_URL__;\nconst {readNativeStack}=await import(runtimeURL);\nconst GlobalError=Error,globalDescriptor=Object.getOwnPropertyDescriptor(globalThis,'Error'),formatterDescriptor=Object.getOwnPropertyDescriptor(GlobalError,'prepareStackTrace');\nassert.equal(process.versions.node,'22.23.4');assert(formatterDescriptor&&Object.hasOwn(formatterDescriptor,'value'));assert.equal(typeof formatterDescriptor.value,'function');\nlet value;try{new Script('throw new Error(\"SYN_PRIVATE fresh native\")',{filename:'test/fixtures/finite-owner-cleanup-persistence.mjs',lineOffset:99}).runInNewContext({Error:GlobalError});}catch(error){value=error;}assert(value);\nlet calls=0;\nif(mode==='formatter_getter')Object.defineProperty(GlobalError,'prepareStackTrace',{get(){calls++;return formatterDescriptor.value;},configurable:true});\nif(mode==='formatter_proxy'){const proxy=new Proxy(formatterDescriptor.value,{apply(){calls++;return 'SYN_PRIVATE';},get(){calls++;throw null;},getOwnPropertyDescriptor(){calls++;throw null;},getPrototypeOf(){calls++;throw null;},ownKeys(){calls++;throw null;}});Object.defineProperty(GlobalError,'prepareStackTrace',{...formatterDescriptor,value:proxy});}\nif(mode==='formatter_lookalike'){\n const text=Function.prototype.toString.call(formatterDescriptor.value);\n const replica=Function('internalPrepareStackTrace','return ('+text+')')(()=>{calls++;return 'SYN_PRIVATE';});\n assert.equal(Function.prototype.toString.call(replica),text);assert.notEqual(replica,formatterDescriptor.value);\n Object.defineProperty(GlobalError,'prepareStackTrace',{...formatterDescriptor,value:replica});\n}\nif(mode==='Error_getter')Object.defineProperty(globalThis,'Error',{get(){calls++;return GlobalError;},configurable:true});\nif(mode==='Error_proxy'){const proxy=new Proxy(GlobalError,{construct(){calls++;throw null;},apply(){calls++;throw null;},get(){calls++;throw null;},getOwnPropertyDescriptor(){calls++;throw null;},getPrototypeOf(){calls++;throw null;}});Object.defineProperty(globalThis,'Error',{...globalDescriptor,value:proxy});}\nif(mode==='Error_constructor'){function Substitute(){calls++;return new GlobalError('SYN_PRIVATE');}Object.defineProperty(globalThis,'Error',{...globalDescriptor,value:Substitute});}\nconst beforeGlobal=Object.getOwnPropertyDescriptor(globalThis,'Error'),beforeFormatter=Object.getOwnPropertyDescriptor(GlobalError,'prepareStackTrace');\nconst {projectFixedBudgetFailure}=await import(helperURL);\nconst actual=projectFixedBudgetFailure(value,readNativeStack);\nassert.deepEqual(actual,mode==='default'?{code:'unknown',site:'persistence_100'}:{code:'unknown',site:'unknown'});assert.equal(calls,0);\nassert.deepEqual(Object.getOwnPropertyDescriptor(globalThis,'Error'),beforeGlobal);assert.deepEqual(Object.getOwnPropertyDescriptor(GlobalError,'prepareStackTrace'),beforeFormatter);\nif(mode==='default'){assert.deepEqual(beforeGlobal,globalDescriptor);assert.deepEqual(beforeFormatter,formatterDescriptor);}\nconsole.log('{\"ok\":true}');\n".replaceAll('__MODE__',()=>JSON.stringify(mode)).replaceAll('__RUNTIME_URL__',()=>JSON.stringify(runtimeURL)).replaceAll('__HELPER_URL__',()=>JSON.stringify(helperURL));
+ const env={...process.env};delete env.NODE_OPTIONS;if(nodeOptions!==undefined)env.NODE_OPTIONS=nodeOptions;
+ const args=[...(preload?['--require','node:util']:[]),'--input-type=module'];
+ const child=spawnSync(process.execPath,args,{input:source,encoding:'utf8',timeout:15000,maxBuffer:65536,env});
+ assert.equal(child.error,undefined);assert.equal(child.signal,null);assert.equal(child.status,0);assert.equal(child.stderr,'');assert.equal(child.stdout,'{"ok":true}\n');
+}
+test('d35_fresh_default_formatter_preserved',()=>freshChild('default'));
+test('d36_fresh_formatter_getter_before_helper',()=>freshChild('formatter_getter'));
+test('d37_fresh_formatter_proxy_before_helper',()=>freshChild('formatter_proxy'));
+test('d38_fresh_identical_text_different_closure',()=>freshChild('formatter_lookalike'));
+test('d39_fresh_global_Error_getter_before_helper',()=>freshChild('Error_getter'));
+test('d40_fresh_global_Error_proxy_before_helper',()=>freshChild('Error_proxy'));
+test('d41_fresh_global_Error_constructor_before_helper',()=>freshChild('Error_constructor'));
+test('d42_fresh_startup_options_refused',()=>{freshChild('unsafe_startup',{nodeOptions:'--no-warnings'});freshChild('unsafe_startup',{preload:true});});
diff --git a/test/fixtures/finite-budget-stage-observer.mjs b/test/fixtures/finite-budget-stage-observer.mjs
new file mode100644
--- /dev/null
+++ b/test/fixtures/finite-budget-stage-observer.mjs
@@ -0,0 +1,168 @@
+import assert from 'node:assert/strict';
+import * as fs from 'node:fs/promises';
+import {constants} from 'node:fs';
+import {createHash} from 'node:crypto';
+import {join,resolve,parse,sep,isAbsolute} from 'node:path';
+
+// Source-only observations are unauthenticated location hints. A pending stage can
+// also be caused by process termination; it never establishes a business cause.
+export const STAGES=Object.freeze(['metadata_get','metadata_validation','raw_download','raw_binding','zip_decode','receipt_caps','mkdir','write_files']);
+export const JOBS=Object.freeze(['positive_prepare','reduction_prepare','readonly']);
+export const NEEDS=Object.freeze(['contracts','positive_prepare','positive_consume','reduction_prepare','reduction_consume_a','readonly','reduction_consume_b']);
+export const NONCLAIMS=Object.freeze({historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
+const FILES=Object.freeze([['command','command-output.log'],['seal','seal-custody.log'],['metadata','own-metadata.log'],['count','tap-check.log']]);
+const AVAILABILITY=Object.freeze(['available','missing','oversized','unsafe','racing','malformed','truncated','unavailable']);
+const OUTCOMES=Object.freeze(['success','failure','skipped','cancelled','not_observed']);
+const COUNT=Object.freeze(['not_observed','coded_assertion','unknown']);
+const CONTEXT_KEYS=['repository','repositoryId','ref','source','tree','workflowBlob','run','attempt','node'];
+const sha=b=>createHash('sha256').update(b).digest('hex');
+const canonical=v=>Buffer.from(JSON.stringify(v)+'\n');
+const same=(a,b)=>assert.deepEqual(a,b,'stage_evidence_rejected');
+const fields=(v,keys)=>{assert(v!==null&&typeof v==='object'&&!Array.isArray(v),'stage_evidence_rejected');same(Object.keys(v),keys);};
+const unknown=()=>({code:'unknown',site:'unknown'});
+const noStage=()=>({state:'not_observed',stage:null});
+const unknownStage=()=>({state:'unknown',stage:null});
+function marker(line,prefix,keys){
+ assert(line.startsWith(prefix+' '),'stage_evidence_rejected');
+ const raw=line.slice(prefix.length+1),v=JSON.parse(raw);fields(v,keys);same(JSON.stringify(v),raw);return v;
+}
+function linesOf(text){
+ assert(typeof text==='string'&&Buffer.byteLength(text)<=65536,'stage_evidence_rejected');
+ assert(text===''||text.endsWith('\n'),'stage_evidence_rejected');
+ const lines=text===''?[]:text.slice(0,-1).split('\n');
+ assert(lines.length<=4096&&lines.every(l=>Buffer.byteLength(l)<=1024&&!l.includes('\r')),'stage_evidence_rejected');return lines;
+}
+function stages(lines){
+ let next=0,pending=false,status=null,seen=false;
+ try{
+  for(const line of lines){
+   if(line.includes('AFW_SYN_STAGE/1')){
+    seen=true;const v=marker(line,'AFW_SYN_STAGE/1',['stage','state']);
+    assert(next<STAGES.length&&v.stage===STAGES[next],'stage_evidence_rejected');
+    if(v.state==='start'){assert(!pending,'stage_evidence_rejected');pending=true;}
+    else{same(v.state,'complete');assert(pending,'stage_evidence_rejected');pending=false;next++;}
+   }else if(line.includes('AFW_SYN_HTTP/1')){
+    const v=marker(line,'AFW_SYN_HTTP/1',['status']);
+    assert(next===0&&pending&&status===null&&Number.isInteger(v.status)&&v.status>=100&&v.status<=599,'stage_evidence_rejected');status=v.status;
+   }
+  }
+  if(!seen)return {stage:noStage(),http:null};
+  if(pending)return {stage:{state:'pending',stage:STAGES[next]},http:status};
+  if(next===STAGES.length)return {stage:{state:'complete',stage:STAGES.at(-1)},http:status};
+  return {stage:unknownStage(),http:null};
+ }catch{return {stage:unknownStage(),http:null};}
+}
+function legacy(lines,P){
+ const codes=P.FIXED_BUDGET_FAILURE_CODES;
+ const observations=[];
+ for(let n=0;n<lines.length;n++){
+  const line=lines[n],header=/^(Error|AssertionError|CustodyError)(?: \[(ERR_ASSERTION|EEXIST|ENOENT|EACCES|ENOSPC|ETIMEDOUT)\])?: (.*)$/.exec(line);
+  if(!header)continue;
+  const message=header[3];let code=header[2]??null,custody=null;
+  if(codes.includes(message)&&message.startsWith('custody_'))custody=message;
+  const system=/^(EEXIST|ENOENT|EACCES|ENOSPC|ETIMEDOUT): /.exec(message);if(system){if(code&&code!==system[1])return {value:unknown(),count:2};code=system[1];}
+  if(header[1]==='CustodyError'&&(!custody||code!==null))continue;
+  if(header[1]==='AssertionError'&&code===null)code='ERR_ASSERTION';
+  if(!code&&!custody)continue;
+  const frames=[];let unrecognizedSourceFrame=false;
+  for(let k=n+1;k<lines.length&&/^ {4}at /.test(lines[k]);k++){
+   const match=/^ {4}at (?:async )?(?:new )?(?:(?:[A-Za-z0-9_$.[\]<>]+) \(([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3})\)|([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3}))$/.exec(lines[k]);
+   if(!match){if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>lines[k].includes(s.path.split('/').at(-1))))unrecognizedSourceFrame=true;continue;}
+   const path=match[1]??match[4],root='/home/runner/work/agent-friendly-web/agent-friendly-web/';
+   if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>[s.path,root+s.path,'file://'+root+s.path].includes(path)))frames.push(lines[k]);else if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>path.includes(s.path.split('/').at(-1))))unrecognizedSourceFrame=true;
+  }
+  // This is an owned Error with DATA properties, never an Error from a private log.
+  const owned=new Error();Object.defineProperties(owned,{message:{value:custody??'',configurable:true},code:{value:code??undefined,configurable:true},stack:{value:'Error\n'+(unrecognizedSourceFrame?'':frames.join('\n')),configurable:true}});
+  observations.push(P.projectFixedBudgetFailure(owned));
+ }
+ return {value:observations.length===1?observations[0]:unknown(),count:observations.length};
+}
+export function projectLogText(text,P){
+ try{
+  const lines=linesOf(text),observation=stages(lines),canonicalMarkers=lines.filter(l=>l.includes('AFW_SYN_FAILURE/1'));
+  const old=legacy(lines,P);let failure=old.value;
+  if(canonicalMarkers.length){failure=P.projectFixedBudgetLog(text);if(old.count>1||old.count===1&&JSON.stringify(old.value)!==JSON.stringify(failure))failure=unknown();}
+  return {failure,stage:observation.stage,http:observation.http};
+ }catch{return {failure:unknown(),stage:unknownStage(),http:null};}
+}
+function identity(st){return [st.dev,st.ino,st.mode,st.nlink,st.size,st.mtimeMs,st.ctimeMs];}
+function regular(st){return st.isFile()&&st.nlink===1&&Number.isSafeInteger(st.size)&&st.size>=0;}
+async function controlledRoot(root,io){
+ assert(typeof root==='string'&&isAbsolute(root)&&resolve(root)===root,'stage_evidence_rejected');
+ const base=parse(root).root,parts=root.slice(base.length).split(sep).filter(Boolean),identities=[];let current=base;
+ for(const part of parts){current=join(current,part);const st=await io.lstat(current);assert(st.isDirectory()&&!st.isSymbolicLink(),'stage_evidence_rejected');same(await io.realpath(current),current);identities.push([st.dev,st.ino,st.mode]);}return identities;
+}
+async function readOwned(root,name,io){
+ let fd;const path=join(root,name);
+ try{
+  const parents=await controlledRoot(root,io),before=await io.lstat(path);if(!regular(before)||before.isSymbolicLink())return {availability:'unsafe'};
+  if(before.size>1048576)return {availability:'oversized'};
+  fd=await io.open(path,constants.O_RDONLY|constants.O_NOFOLLOW);const initial=await fd.stat();
+  if(!regular(initial)||JSON.stringify(identity(initial))!==JSON.stringify(identity(before)))return {availability:'racing'};
+  const size=Math.min(initial.size,65536),bytes=Buffer.alloc(size),read=await fd.read(bytes,0,size,initial.size-size);
+  const after=await fd.stat(),pathAfter=await io.lstat(path);let parentStable=false;try{parentStable=JSON.stringify(parents)===JSON.stringify(await controlledRoot(root,io));}catch{}
+  if(!parentStable||read.bytesRead!==size||JSON.stringify(identity(initial))!==JSON.stringify(identity(after))||JSON.stringify(identity(after))!==JSON.stringify(identity(pathAfter)))return {availability:'racing'};
+  if(initial.size>65536)return {availability:'truncated'};
+  if(size&&bytes[size-1]!==10)return {availability:'truncated'};
+  let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(text).equals(bytes));linesOf(text);}catch{return {availability:'malformed'};}
+  // A partial marker at either edge is unavailable, including an initial prefix.
+  for(const line of text.split('\n'))for(const prefix of ['AFW_SYN_STAGE/1','AFW_SYN_HTTP/1','AFW_SYN_FAILURE/1'])if(line&&prefix.startsWith(line)&&line!==prefix)return {availability:'truncated'};
+  return {availability:'available',text};
+ }catch(error){const code=Object.getOwnPropertyDescriptor(error??{},'code')?.value;return {availability:code==='ENOENT'?'missing':['ELOOP','ENOTDIR'].includes(code)?'unsafe':'unavailable'};}
+ finally{if(fd)try{await fd.close();}catch{}}
+}
+// Explicit library-only test boundary: an owned synthetic root/IO can be passed
+// here. Production collection below exposes no root, IO, argv or env path override.
+export async function collectOwnedLogRoot(root,P,io=fs){
+ let safe=true;try{await controlledRoot(root,io);}catch{safe=false;}
+ const logs=[],observations=[];
+ for(const [log,name]of FILES){
+  const read=safe?await readOwned(root,name,io):{availability:'unsafe'},v=read.availability==='available'?projectLogText(read.text,P):{failure:unknown(),stage:unknownStage(),http:null};
+  logs.push({log,availability:read.availability,code:v.failure.code,site:v.failure.site});observations.push(v);
+ }
+ const metadata=observations[2],count=logs[3];
+ return {logs,stage:logs[2].availability==='available'?metadata.stage:unknownStage(),http:logs[2].availability==='available'?metadata.http:null,countCheck:count.availability==='missing'||count.availability==='available'&&count.code==='unknown'&&observations[3].stage.state==='not_observed'?'not_observed':count.availability==='available'&&count.code==='assertion'?'coded_assertion':'unknown'};
+}
+async function projector(){
+ const bytes=await fs.readFile(join(process.cwd(),'test/fixtures/finite-budget-failure-diagnostic.mjs'));
+ same(bytes.length,7927);same(sha(bytes),'97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2');
+ same(createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),'6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f');
+ return import('data:text/javascript;base64,'+bytes.toString('base64'));
+}
+export async function collectFixedStagePair({context,job,rawOutcome}){
+ const e=process.env;assert(e.NODE_OPTIONS===undefined&&e.AFW_SYN_CHECKPOINT_KEY===undefined&&e.GH_ARTIFACT_TOKEN===undefined,'stage_evidence_rejected');
+ assert(typeof e.RUNNER_TEMP==='string'&&isAbsolute(e.RUNNER_TEMP),'stage_evidence_rejected');
+ const P=await projector(),pair=makeStagePair({context,job,rawOutcome,observation:await collectOwnedLogRoot(join(e.RUNNER_TEMP,'afw-native-private','logs'),P)});validateStagePairWithProjector(pair,context,job,P);return pair;
+}
+function validateContext(v){fields(v,CONTEXT_KEYS);same(v.repository,'tokenizartinfo-ops/agent-friendly-web');same(v.repositoryId,'1347578006');same(v.ref,'refs/heads/feat/finite-native-cleanup-20261101');for(const k of ['source','tree','workflowBlob'])assert(/^[a-f0-9]{40}$/.test(v[k]));assert(/^[1-9][0-9]*$/.test(v.run));same(v.attempt,1);same(v.node,'22.23.4');}
+function validateValue(v,context,job,P){
+ fields(v,['purpose','context','job','rawOutcome','logs','stage','http','countCheck','nonclaims']);same(v.purpose,'afw.sanitized-stage-observations.syn.v1');validateContext(v.context);same(v.context,context);same(v.job,job);assert(JOBS.includes(v.job)&&OUTCOMES.includes(v.rawOutcome));
+ same(v.logs.length,4);for(const [n,row]of v.logs.entries()){fields(row,['log','availability','code','site']);same(row.log,FILES[n][0]);assert(AVAILABILITY.includes(row.availability));assert(typeof row.code==='string'&&P.FIXED_BUDGET_FAILURE_CODES.includes(row.code));assert(row.site==='unknown'||P.FIXED_BUDGET_FAILURE_SITES.some(s=>s.id===row.site));if(row.availability!=='available')same({code:row.code,site:row.site},unknown());}
+ fields(v.stage,['state','stage']);assert(['not_observed','unknown','pending','complete'].includes(v.stage.state));if(['unknown','not_observed'].includes(v.stage.state))same(v.stage.stage,null);else assert(STAGES.includes(v.stage.stage));if(v.stage.state==='complete')same(v.stage.stage,'write_files');
+ assert(v.http===null||Number.isInteger(v.http)&&v.http>=100&&v.http<=599);assert(COUNT.includes(v.countCheck));if(job!=='readonly')same(v.countCheck,'not_observed');same(v.nonclaims,NONCLAIMS);
+}
+export function makeStagePair({context,job,rawOutcome,observation}){
+ validateContext(context);assert(JOBS.includes(job)&&OUTCOMES.includes(rawOutcome));
+ const value={purpose:'afw.sanitized-stage-observations.syn.v1',context,job,rawOutcome,logs:observation.logs,stage:observation.stage,http:observation.http,countCheck:job==='readonly'?observation.countCheck:'not_observed',nonclaims:NONCLAIMS};
+ const bytes=canonical(value),manifest=canonical({purpose:'afw.sanitized-stage-observations.manifest.syn.v1',context,job,files:[{path:'result.json',bytes:bytes.length,sha256:sha(bytes)}]});
+ assert(bytes.length+manifest.length<=16384,'stage_evidence_rejected');return new Map([['result.json',bytes],['manifest.json',manifest]]);
+}
+export async function validateStagePair(files,context,job){
+ return validateStagePairWithProjector(files,context,job,await projector());
+}
+export function validateStagePairWithProjector(files,context,job,P){
+ validateContext(context);assert(files instanceof Map);same([...files.keys()],['result.json','manifest.json']);assert([...files.values()].every(Buffer.isBuffer));assert([...files.values()].reduce((n,b)=>n+b.length,0)<=16384);
+ const read=b=>{const s=new TextDecoder('utf-8',{fatal:true}).decode(b),v=JSON.parse(s);assert(canonical(v).equals(b));return v;};
+ const value=read(files.get('result.json')),manifest=read(files.get('manifest.json'));validateValue(value,context,job,P);
+ fields(manifest,['purpose','context','job','files']);same(manifest.purpose,'afw.sanitized-stage-observations.manifest.syn.v1');same(manifest.context,context);same(manifest.job,job);same(manifest.files,[{path:'result.json',bytes:files.get('result.json').length,sha256:sha(files.get('result.json'))}]);return value;
+}
+const unavailableAssignments=()=>JOBS.map(job=>({job,state:'unavailable',artifactId:null,zipSha256:null}));
+export function projectAssignments(text){
+ const unavailable=unavailableAssignments();
+ try{
+  assert(typeof text==='string'&&Buffer.byteLength(text)<=65536);const needs=JSON.parse(text);assert(needs&&typeof needs==='object'&&!Array.isArray(needs));same(Object.keys(needs).sort(),NEEDS.slice().sort());
+  const result=JOBS.map(job=>{const v=needs[job];assert(v&&typeof v==='object'&&!Array.isArray(v));same(Object.keys(v).sort(),['outputs','result']);assert(OUTCOMES.includes(v.result));assert(v.outputs!==null&&typeof v.outputs==='object'&&!Array.isArray(v.outputs));const id=v.outputs['safe-id'],digest=v.outputs['safe-digest'];if(typeof id!=='string'||!/^[1-9][0-9]*$/.test(id)||!Number.isSafeInteger(Number(id))||String(Number(id))!==id||typeof digest!=='string'||!/^[a-f0-9]{64}$/.test(digest))return unavailable.find(x=>x.job===job);return {job,state:'assigned',artifactId:id,zipSha256:digest};});
+  const ids=result.filter(x=>x.state==='assigned').map(x=>x.artifactId);if(new Set(ids).size!==ids.length)return unavailable;return result;
+ }catch{return unavailable;}
+}
+export function assignmentLine(text){return 'AFW_STAGE_DIAGNOSTIC_ASSIGNMENTS '+JSON.stringify(projectAssignments(text));}
diff --git a/test/finite-budget-stage-observer.test.mjs b/test/finite-budget-stage-observer.test.mjs
new file mode100644
--- /dev/null
+++ b/test/finite-budget-stage-observer.test.mjs
@@ -0,0 +1,50 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import * as fs from 'node:fs/promises';
+import {join} from 'node:path';
+import {tmpdir} from 'node:os';
+import * as D from './fixtures/finite-budget-stage-observer.mjs';
+import * as P from './fixtures/finite-budget-failure-diagnostic.mjs';
+
+const context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/feat/finite-native-cleanup-20261101',source:'a'.repeat(40),tree:'b'.repeat(40),workflowBlob:'c'.repeat(40),run:'123',attempt:1,node:'22.23.4'};
+const stage=(s,state)=>'AFW_SYN_STAGE/1 '+JSON.stringify({stage:s,state})+'\n';
+const http=n=>'AFW_SYN_HTTP/1 '+JSON.stringify({status:n})+'\n';
+const failure=(code='EACCES',site='custody_20')=>'AFW_SYN_FAILURE/1 '+JSON.stringify({code,site})+'\n';
+const chain=()=>D.STAGES.map((s,i)=>stage(s,'start')+(i===0?http(403):'')+stage(s,'complete')).join('');
+const text=s=>D.projectLogText(s,P);
+const unknown={code:'unknown',site:'unknown'};
+async function owned(fn){const root=await fs.mkdtemp(join(tmpdir(),'afw-stage-owned-'));try{return await fn(root);}finally{assert(root.startsWith(join(tmpdir(),'afw-stage-owned-')));await fs.rm(root,{recursive:true,force:true});}}
+const collect=(root,io)=>D.collectOwnedLogRoot(root,P,io);
+test('s01_exact_stage_chain',()=>assert.deepEqual(text(chain()).stage,{state:'complete',stage:'write_files'}));
+test('s02_one_pending_stage',()=>assert.deepEqual(text(stage('metadata_get','start')).stage,{state:'pending',stage:'metadata_get'}));
+test('s03_every_pending_stage',()=>{for(let i=0;i<D.STAGES.length;i++){const s=D.STAGES.slice(0,i).map(x=>stage(x,'start')+stage(x,'complete')).join('')+stage(D.STAGES[i],'start');assert.deepEqual(text(s).stage,{state:'pending',stage:D.STAGES[i]});}});
+test('s04_no_observations',()=>{assert.deepEqual(text('private unrelated text\n').stage,{state:'not_observed',stage:null});assert.deepEqual(text('').failure,unknown);});
+test('s05_sequence_gap',()=>assert.equal(text(stage('raw_download','start')).stage.state,'unknown'));
+test('s06_duplicate_stage',()=>assert.equal(text(stage('metadata_get','start').repeat(2)).stage.state,'unknown'));
+test('s07_conflicting_completion',()=>assert.equal(text(stage('metadata_get','complete')).stage.state,'unknown'));
+test('s08_marker_canonical_schema',()=>{for(const s of ['AFW_SYN_STAGE/1 {"state":"start","stage":"metadata_get"}\n','AFW_SYN_STAGE/1 {"stage":"metadata_get","state":"start","secret":"PRIVATE"}\n','AFW_SYN_STAGE/1 {"stage":"metadata_get","stage":"metadata_get","state":"start"}\n','AFW_SYN_STAGE/1 {"stage":"other","state":"start"}\n'])assert.equal(text(s).stage.state,'unknown');});
+test('s09_http_bounded_only',()=>{for(const n of [100,200,403,599])assert.equal(text(stage('metadata_get','start')+http(n)).http,n);for(const n of [99,600,200.5])assert.equal(text(stage('metadata_get','start')+http(n)).http,null);});
+test('s10_http_conflicts',()=>{for(const s of [http(200),stage('metadata_get','start')+http(200)+http(403),stage('metadata_get','start')+'AFW_SYN_HTTP/1 {"status":200,"body":"PRIVATE"}\n']){assert.equal(text(s).http,null);assert.equal(text(s).stage.state,'unknown');}});
+test('s11_canonical_failure_only',()=>assert.deepEqual(text(failure()).failure,{code:'EACCES',site:'custody_20'}));
+test('s12_legacy_system_code',()=>assert.deepEqual(text("Error: EEXIST: PRIVATE\n    at seal (test/fixtures/finite-checkpoint-custody.mjs:20:1)\n").failure,{code:'EEXIST',site:'custody_20'}));
+test('s13_legacy_custody_enum',()=>{for(const code of P.FIXED_BUDGET_FAILURE_CODES.filter(x=>x.startsWith('custody_')))assert.equal(text('CustodyError: '+code+'\n').failure.code,code);});
+test('s14_legacy_assertion',()=>assert.deepEqual(text("AssertionError [ERR_ASSERTION]: PRIVATE\n    at test/fixtures/finite-owner-cleanup-persistence.mjs:100:1\n").failure,{code:'assertion',site:'persistence_100'}));
+test('s15_legacy_private_frame_rejected',()=>assert.deepEqual(text('Error: EACCES: PRIVATE\n    at seal (/private/finite-checkpoint-custody.mjs:20:1)\n').failure,{code:'EACCES',site:'unknown'}));
+test('s16_failure_conflict',()=>assert.deepEqual(text(failure()+failure('ENOSPC')).failure,unknown));
+test('s17_no_message_or_path_echo',()=>{const value=text('Error: EACCES: SECRET_PRIVATE_URL_TOKEN\n    at seal (/private/secret.mjs:20:1)\n');const s=JSON.stringify(value);for(const needle of ['SECRET','PRIVATE','URL','TOKEN','secret.mjs','message','stack'])assert(!s.includes(needle));});
+test('s18_code_token_not_substring',()=>{for(const s of ['Error: myEACCES: PRIVATE\n','Error: custody_format_suffix\n','private EACCES\n'])assert.deepEqual(text(s).failure,unknown);});
+test('s19_missing_logs',async()=>owned(async root=>{const v=await collect(root);assert(v.logs.every(x=>x.availability==='missing'));}));
+test('s20_real_files_and_closed_pair',async()=>owned(async root=>{await fs.writeFile(join(root,'own-metadata.log'),chain());await fs.writeFile(join(root,'command-output.log'),failure());const observation=await collect(root),pair=D.makeStagePair({context,job:'positive_prepare',rawOutcome:'failure',observation});assert(pair instanceof Map);const v=D.validateStagePairWithProjector(pair,context,'positive_prepare',P);assert.equal(v.http,403);assert.equal(v.rawOutcome,'failure');assert.deepEqual(Object.keys(v),['purpose','context','job','rawOutcome','logs','stage','http','countCheck','nonclaims']);assert([...pair.values()].reduce((n,b)=>n+b.length,0)<=16384);}));
+test('s21_symlink_file',async()=>owned(async root=>{await fs.writeFile(join(root,'target'),'PRIVATE\n');await fs.symlink(join(root,'target'),join(root,'command-output.log'));assert.equal((await collect(root)).logs[0].availability,'unsafe');}));
+test('s22_symlink_parent',async()=>owned(async root=>{await fs.mkdir(join(root,'real'));await fs.symlink(join(root,'real'),join(root,'alias'));assert((await collect(join(root,'alias'))).logs.every(x=>x.availability==='unsafe'));}));
+test('s23_hardlink_rejected',async()=>owned(async root=>{await fs.writeFile(join(root,'target'),'PRIVATE\n');await fs.link(join(root,'target'),join(root,'command-output.log'));assert.equal((await collect(root)).logs[0].availability,'unsafe');}));
+test('s24_file_bound',async()=>owned(async root=>{await fs.writeFile(join(root,'command-output.log'),Buffer.alloc(1048577,10));assert.equal((await collect(root)).logs[0].availability,'oversized');}));
+test('s25_tail_truncation_and_marker_prefix',async()=>owned(async root=>{await fs.writeFile(join(root,'command-output.log'),'AFW_SYN_STA');assert.equal((await collect(root)).logs[0].availability,'truncated');await fs.writeFile(join(root,'command-output.log'),'x\n'.repeat(40000)+failure());assert.equal((await collect(root)).logs[0].availability,'truncated');}));
+test('s26_malformed_utf8_and_lines',async()=>owned(async root=>{for(const b of [Buffer.from([255,10]),Buffer.from('x'.repeat(1025)+'\n'),Buffer.from('\n'.repeat(4097)),Buffer.from('x\r\n')]){await fs.writeFile(join(root,'command-output.log'),b);assert.equal((await collect(root)).logs[0].availability,'malformed');}}));
+test('s27_fd_path_race',async()=>owned(async root=>{await fs.writeFile(join(root,'command-output.log'),failure());let once=false;const io={...fs,lstat:async p=>{const value=await fs.lstat(p);if(p===join(root,'command-output.log')&&!once){once=true;await fs.rename(p,join(root,'previous'));await fs.writeFile(p,'replacement\n');}return value;}};assert.equal((await collect(root,io)).logs[0].availability,'racing');}));
+test('s28_fd_mutation_race',async()=>owned(async root=>{const path=join(root,'command-output.log');await fs.writeFile(path,failure());const io={...fs,open:async(...args)=>{const fd=await fs.open(...args);return {stat:()=>fd.stat(),read:async(...a)=>{const value=await fd.read(...a);await fs.appendFile(path,'changed\n');return value;},close:()=>fd.close()};}};assert.equal((await collect(root,io)).logs[0].availability,'racing');}));
+test('s29_readonly_aggregate_truth',async()=>owned(async root=>{await fs.writeFile(join(root,'tap-check.log'),"AssertionError [ERR_ASSERTION]: PRIVATE\n");const obs=await collect(root),v=D.validateStagePairWithProjector(D.makeStagePair({context,job:'readonly',rawOutcome:'failure',observation:obs}),context,'readonly',P);assert.equal(v.rawOutcome,'failure');assert.equal(v.countCheck,'coded_assertion');assert(!JSON.stringify(v).includes('nodeTestFailed'));}));
+test('s30_pair_fail_closed',async()=>owned(async root=>{const p=D.makeStagePair({context,job:'readonly',rawOutcome:'success',observation:await collect(root)});for(const mutate of [v=>v.nonclaims.PCoff=true,v=>v.privateId='123',v=>v.rawOutcome='node_failed',v=>v.logs[0].code='PRIVATE']){const q=new Map(p),v=JSON.parse(q.get('result.json'));mutate(v);q.set('result.json',Buffer.from(JSON.stringify(v)+'\n'));assert.throws(()=>D.validateStagePairWithProjector(q,context,'readonly',P));}assert.throws(()=>D.makeStagePair({context,job:'positive_consume',rawOutcome:'success',observation:{}}));}));
+test('s31_exact_assignment_projection',()=>{const needs=Object.fromEntries(D.NEEDS.map(job=>[job,{result:'failure',outputs:{}}]));for(const [i,job]of D.JOBS.entries())needs[job].outputs={'safe-id':String(i+1),'safe-digest':'a'.repeat(64)};const v=D.projectAssignments(JSON.stringify(needs));assert.deepEqual(v,D.JOBS.map((job,i)=>({job,state:'assigned',artifactId:String(i+1),zipSha256:'a'.repeat(64)})));assert(D.assignmentLine(JSON.stringify(needs)).startsWith('AFW_STAGE_DIAGNOSTIC_ASSIGNMENTS '));});
+test('s32_assignment_unavailability_no_borrow',()=>{for(const s of ['PRIVATE','{}','x'.repeat(65537)])assert(D.projectAssignments(s).every(x=>x.state==='unavailable'));const needs=Object.fromEntries(D.NEEDS.map(job=>[job,{result:'success',outputs:{'artifact-id':'999','artifact-digest':'b'.repeat(64)}}]));assert(D.projectAssignments(JSON.stringify(needs)).every(x=>x.state==='unavailable'));for(const job of D.JOBS)needs[job].outputs={'safe-id':'1','safe-digest':'a'.repeat(64)};assert(D.projectAssignments(JSON.stringify(needs)).every(x=>x.state==='unavailable'));});
+test('s33_production_token_not_inherited',async()=>{const previous=process.env.GH_ARTIFACT_TOKEN;process.env.GH_ARTIFACT_TOKEN='SYN_INERT';try{await assert.rejects(()=>D.collectFixedStagePair({context,job:'readonly',rawOutcome:'failure'}));}finally{if(previous===undefined)delete process.env.GH_ARTIFACT_TOKEN;else process.env.GH_ARTIFACT_TOKEN=previous;}});
diff --git a/test/fixtures/finite-budget-world.mjs b/test/fixtures/finite-budget-world.mjs
--- a/test/fixtures/finite-budget-world.mjs
+++ b/test/fixtures/finite-budget-world.mjs
@@ -1,8 +1,9 @@
+import {readNativeStack as readFixedBudgetNativeStack} from './finite-budget-failure-runtime.mjs';
 import assert from 'node:assert/strict';
 import {readFile,writeFile,mkdir,readdir,copyFile,cp,rm} from 'node:fs/promises';
 import {createHash} from 'node:crypto';
 import {AsyncLocalStorage} from 'node:async_hooks';
 import {mkdirSync,writeFileSync} from 'node:fs';
 import {types as fixedNodeTypes} from 'node:util';
 import {resolve,relative,join,dirname} from 'node:path';
 import {pathToFileURL} from 'node:url';
@@ -1925,17 +1926,17 @@
   else if(command==='verify-reduction')await verifyBudgetCheckpoint('reduction',root);
   else if(command==='verify-pair-disposer')await verifyFixedPairDisposer();
   else if(command==='verify-native-preparation-round1')await verifyNativePreparationRound1();
   else if(command==='verify-positive')await verifyBudgetCheckpoint('positive',root);
   else if(command==='inspect-budget-graphs')await inspectBudgetCompilation(root);
   else throw Error('SYN budget command unsupported before I0');
  };
  // Finish this module before command work imports fixtures that import it.
- setImmediate(()=>{main().catch(()=>{console.error('SYN fixed budget command failed');process.exitCode=1;});});
+ setImmediate(()=>{main().catch(async error=>{console.error('SYN fixed budget command failed');process.exitCode=1;try{if(process.argv[2]==='prepare-positive'&&process.env.GITHUB_JOB==='positive_prepare'){const bytes=await readFile(new URL('./finite-budget-failure-diagnostic.mjs',import.meta.url));const blob=createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');if(blob!=='6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f')return;const {projectFixedBudgetFailure}=await import('data:text/javascript;base64,'+bytes.toString('base64'));console.error('AFW_SYN_FAILURE/1 '+JSON.stringify(projectFixedBudgetFailure(error,readFixedBudgetNativeStack)));}}catch{}});});
 }
 
 
 // Post-ACK diagnostic: Node-only fixed adapters. Default compiler path is unchanged.
 async function replayPostAckBuild(captured,compiler){
  const {build}=await import('esbuild'),options={...captured.options};delete options.plugins;
  const input=options.stdin?captured.inputs.get('<stdin>'):null;if(input)options.stdin={...options.stdin,contents:await compiler.entry(input.contents)};
  const replay={name:'post-ack-fixed-input-replay',setup(b){b.onLoad({filter:/.*/},args=>{const value=captured.inputs.get(args.path)??captured.inputs.get(objectPath(args.path));return value?{...value}:undefined;});}};
diff --git a/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md b/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
--- a/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
+++ b/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
@@ -2711,8 +2711,1007 @@
 
 Source stayed frozen until run completed and BOTH jobs were terminal success. Exact restoration commit edfa03ac6e90e15badecd5ec59bab1a66a6cf0e6, parent beb1f6c83954f47de4cacf9add62c6a8a17a75e3, points to EXACT fresh preunit tree e24f2a269faa177f34f1494ea833e9091d5e202c. Its non-force Source CAS succeeded; independent commit/ref readbacks matched before this append. Original F7 f7a71f1a0fa4f5ddf069ff411f008a098455e5cc was fully read back byte-equal: 126209 bytes/SHA256 1e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a.
 
 A complete recursive comparison of the restored tree excluding this SAME report against original 3195-leaf tree 8942513f440fd25b188c196090e790a561bdb688 found ZERO leaf differences. Full original 3195 files, all 62 workflows and five protected source pins remained intact. The complete report prefix was checked unchanged before append. Main remained 0c9c475b3ebaa970fc11d628b40e50a90cceb727. The consumed diagnostic head had exactly one run/attempt 1; restored head had zero runs; in_progress/queued/waiting/requested/pending lists were all zero in closure readback. Final append is report-only on the restored baseline and requires final complete-tree/ref/prefix/run readbacks.
 
 Validation was proportional: public Source and hashes in RAM, GitHub GitDB mutations, this single bounded cloud control/inspection/receiver run, Root's single assigned SmallSAFE validation and exact closure comparisons. No local Source files, clones, dependencies, builds, Source imports/execution or tests were used; no private content or source bodies are copied into this report.
 
 Executor self-review found no unresolved implementation concern in the finite diagnostic scope. Root's independent inactive/active gates passed; combined task/final review remains a separate closure step and is not claimed by this paragraph. Current retained compatibility passes; original immediate HTTP/composite write, positive Native failure and missing readonly seal causes remain unresolved. No autofix, rerun, additional Native cycle, traffic, repair, subscription/useful delivery/review/withdrawal/autoclose/PC-off acceptance or Max action is licensed by this result.
+
+
+## 2026-11-13 — Task1 INCOMPLETE UNATTACHED preparation checkpoint
+
+Owner requested saving before a few-minute disconnect, without closing anything. This checkpoint is inert public Source preparation only. Source branch remains b5873e87d1f00ad10985171959e93015bc6045e3, baseline tree af758fa96434fd7a88e97f890f3796de15d5c14a; main remains 0c9c475b3ebaa970fc11d628b40e50a90cceb727. No Source ref update, run, test execution, local Source evaluation/file/dependency/build, Native/World/SDK/private-log/archive/key/runtime operation occurred.
+
+The helper and 34 focused test families are drafted. Catalog selection is the deterministic raw public-line token expression /\bassert(?:\.|\s*\()|\bthrow\b/ plus explicitly named public boundary lines. Six pinned source files yield 631 finite alias_line IDs: world394, native47, custody8, persistence117, cleanup4, adapter61. Current Root ruling selects the first/innermost valid public frame of an ordinary stack chain, while malformed/multi-match individual frames and conflicting explicit markers remain unknown.
+
+Root further required support for actual Node22 native stack accessors through exact intrinsic getter identity, no proxy/custom getter/name/message/prototype-formatting/prepareStackTrace invocation. The intrinsic-identity guard and actual VM Error/AssertionError tests are drafted but unexecuted and unqualified. This is NOT a passing privacy/location qualification.
+
+Known incomplete items at save:
+- The newest helper has a sourceSite conditional with an unmatched parenthesis from draft substitution; correct and inspect before sealing.
+- World is still the prior single-line catch draft, with an obsolete helper pin. Refresh its helper Git blob pin after final helper bytes and re-hash World. Only old line1933 is permitted to change; preserve physical line numbering.
+- Q/S/V templates still contain unsubstituted __PINS__/catalog/control placeholders. They are preserved as COMMENTED DATA in this checkpoint F7; no qualification code is executable in this carrier. Both jobs are literal false, manual/inputfree, and merely exit1 if incorrectly forced.
+- Need finalize current canonical result.json+manifest.json schema/receiver, hash gates, upload/assignment, exact two-job inactive qualification, tests RED all-unknown stub/GREEN actual helper, and Root independent exact-source gate.
+- No qualification or activation is released. After resume, finish public-string preparation, create a NEW inactive unattached candidate, return its complete pins/schema/diffs to Root, and HOLD for a separate one-use activation release.
+
+Original F7 restoration remains blob f7a71f1a0fa4f5ddf069ff411f008a098455e5cc,126209B/SHA2561e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a. This report preserves exact prior b4bcbad28c7ab5b3313c97eb54c0145b5c957f77 prefix:310494 characters,310591 bytes,SHA256e95f3b0016053270ef8610662e7381a2feb4819f0fc4e1d36b5cd1dfb8bab15d. Checkpoint commit is UNATTACHED and does not establish any Source head or execution evidence.
+
+The commented F7 stores the Q/S/V drafts and exact frozen generic Z (13305B/SHA256b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d), public catalog input pins, explicit extra lines, 34 IDs and old/current catch strings. No private content is included. Rootdocs brief/spec/plan ref e889f89d73ee039df50757e8ec0287d749aa6786 supplies exact requirements. All historicalCauseProven,receiptAuthenticated,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified claims remain false.
+
+## 2026-11-13 — Task1 resumed: complete INACTIVE preparation, qualification HELD
+
+This append resumes the exact saved unattached draft be297ada3c97e0b6b99dd10fb8c16113bc157cf3/tree f0c45608ed306bcb271472f0f48de1a332598e21. Owner returned and asked to resume. Root verified the same Source b5873e87d1f00ad10985171959e93015bc6045e3/main 0c9c475b3ebaa970fc11d628b40e50a90cceb727 and five active Actions collections zero before resuming preparation. This is NOT an activation release or an executed qualification. Source branch is untouched. Rootdocs resume reference 9b1e5ac28b29423aa713ba0d8943ee0d8e02c5a7 and exact brief/spec/Task1 remain applicable. No Task2 work occurred.
+
+### Declared scope and immutable public source pins
+
+PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; repository ID1347578006; ENVIRONMENT Source-only inactive GitDB preparation; ORIGIN GitHub; RESOURCE_TYPE unattached blobs/tree/commit; RESOURCE_ID Source baseline b5873e87d1f00ad10985171959e93015bc6045e3/tree af758fa96434fd7a88e97f890f3796de15d5c14a; ALLOWED_ACTION prepare only. Neither Source attach nor Actions run is released. No local Source file, evaluation, dependency install, build or test execution; public strings were constructed, compared and hashed only as data. No private log/artifact/model/key/runtime access, credentials, native operation, Cloudflare operation, owner data, relay or external message is involved.
+
+Permanent code changes are exactly new pure helper, new focused tests, and World's existing line1933 catch body. F7 is a transient independent zero-AFW-key qualification carrier, not the original 26-key suite client. The same report is append-only. Every other leaf/mode/type/blob is inherited unchanged from the exact baseline tree; main is outside this unit.
+
+| Public source | Git blob | Bytes | SHA256 |
+|---|---|---:|---|
+| helper | 7ca7eb56811eadaef06e686aeaf444f3fc7a5c2e | 10306 | 2c84dce4c13c4f5d8522f60d28397723ddf311b240436c4b11fff50950beea2d |
+| tests | 65deb058efd66d7b3bcd8efd68cc450e1f37592a | 12791 | 68585ad22837bb7a08670d2aa4cecb1fa01a122c5998230e984fbb7a501f6c50 |
+| world | ba426c76afb2f23b2fe79cd49ef49004cbbfe834 | 243530 | 2740e257b7e1023aeb61c10482d3edc21efd546a6565232acac5b468b257718f |
+| zip | frozen generic Z | 13305 | b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d |
+| inactive F7 | 071764cdb9927e8dc2d3ebfcd239c10f0d21ed88 | 43869 | 40a7a9eb567fa276f344748cce017558322aa7dbe60b8bc9ea297241424d2bb7 |
+
+Original World blob0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b is deliberately changed; it must NOT be described as unchanged. World's physical line count remains2098, and only existing line1933 differs. Catch first preserves generic console.error and exitCode1. Extra observation is restricted to argv command prepare-positive AND GITHUB_JOB positive_prepare. It reads the fixed helper URL, hashes exact Git-blob header+bytes with SHA1, checks helper blob7ca7eb56811eadaef06e686aeaf444f3fc7a5c2e, then imports those same verified bytes using data:text/javascript;base64. Diagnostic failures are swallowed; no exception message/stack/value is emitted. World emits at most a fixed AFW_SYN_FAILURE/1 JSON {code,site} line from the pure projector.
+
+Exact scoped World diff at old/current line1933:
+```diff
+- setImmediate(()=>{main().catch(()=>{console.error('SYN fixed budget command failed');process.exitCode=1;});});
++ setImmediate(()=>{main().catch(async error=>{console.error('SYN fixed budget command failed');process.exitCode=1;try{if(process.argv[2]==='prepare-positive'&&process.env.GITHUB_JOB==='positive_prepare'){const bytes=await readFile(new URL('./finite-budget-failure-diagnostic.mjs',import.meta.url));const blob=createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');if(blob!=='7ca7eb56811eadaef06e686aeaf444f3fc7a5c2e')return;const {projectFixedBudgetFailure}=await import('data:text/javascript;base64,'+bytes.toString('base64'));console.error('AFW_SYN_FAILURE/1 '+JSON.stringify(projectFixedBudgetFailure(error)));}}catch{}});});
+```
+
+### Pure helper and actual native-stack safety
+
+Exports projectFixedBudgetFailure(error) and projectFixedBudgetLog(text), each returns exactly fresh {code,site}. Code enum is ["unknown","assertion","EEXIST","ENOENT","EACCES","ENOSPC","ETIMEDOUT","custody_format","custody_limit","custody_size","custody_destination","custody_authentication","custody_io","custody_cleanup"]. Site is unknown or one of631 static alias_line IDs. No free path, column, numeric value, arbitrary property name, message, stack, actual/expected, private name or serialized error is returned. Both functions fail to fixed unknown on malformed/oversized/unsupported input. Log cap65536 UTF8 bytes, each line1024 bytes, maximum4096 lines; only one exact canonical AFW_SYN_FAILURE/1 record ending in newline is accepted. Conflicting/repeated/truncated/forged records fail closed. Future Task2 markers are not parsed.
+
+Descriptor reads reject proxy/native-error impostors and error-supplied getters without invoking them. Code/message bounds are checked before a native stack getter can format them. A stack DATA descriptor is parsed directly. An accessor stack is accepted only when getter AND setter identities equal those captured from a pristine native Error, the input is a non-proxy native Error/AssertionError with exact admitted prototypes, name/message remain primitive bounded data, formatting/constructor descriptors are admitted identities, Symbol.toStringTag hooks are absent, and no prepareStackTrace property exists anywhere on the Error constructor chain. Only the captured intrinsic getter is invoked. Custom getter/proxy/prototype formatting/prepareStackTrace cases must have side-effect counters0. Native support is NOT presumed: cloud d12/d13 MUST prove actual VM-thrown native Error and AssertionError project to persistence_100. A safe unknown for all actual native stacks will fail qualification, not masquerade as useful location capture.
+
+Parser chooses the first/innermost valid finite public frame in a normal call chain, permits ordinary async/new frame prefixes, and never returns columns/paths. A malformed or multi-match public frame is unavailable; unknown numeric/public sites remain unavailable. Recognized sites/codes are untrusted observations, not authenticated causal proof.
+
+Catalog selection is deterministic raw public-line token matching /\bassert(?:\.|\s*\()|\bthrow\b/ plus the already named public async IO/unwind/return-call boundaries below. Raw matching is intentionally syntactic, so text inside a source string/comment may be selected; every selected line is still a finite real line of the exact pinned public source. It does not claim AST executable coverage. No unpinned file is admitted. Qualification recomputes this exact catalog from source bytes. For World it replaces the exact single-line new catch with the exact old catch, asserts no line-count delta, and proves the reconstructed old Git blob0631f9a4 before deriving the original631-site table. This avoids circular helper/World hashes while retaining physical line mapping.
+
+| Alias | Exact public source | Original source Git blob | Selected lines | Explicit extra lines |
+|---|---|---|---:|---|
+| world | test/fixtures/finite-budget-world.mjs | 0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b | 394 | 960,965 |
+| native | test/mcp-qa-finite-budget-native.test.mjs | 533dafb5df5f8e57442c5b9029dc8dec6dded434 | 47 | 78,83 |
+| custody | test/fixtures/finite-checkpoint-custody.mjs | 4d05b5ec0f7b074be88ef9733a47c984b0212351 | 8 | 20,22,302,321 |
+| persistence | test/fixtures/finite-owner-cleanup-persistence.mjs | e0dda1fd3d66c1864fd0b20f873c7fc0c452f6d8 | 117 | 72,100,128,131,139,141 |
+| cleanup | lib/mcp-qa-finite-owner-cleanup.mjs | 1a5a2583d266179cdd89f799c64199f29044fec5 | 4 | 41,42 |
+| adapter | test/fixtures/finite-owner-cleanup.mjs | 2f5dad6c306fac1be2f11845bef640bb204ad572 | 61 | 128,133,134 |
+
+### Inactive qualification carrier and strict current SMALLSAFE role
+
+F7 is manual workflow_dispatch, input-free, no push trigger, two finite jobs qualify and verify, Node22.23.4, ubuntu24.04, three-minute limits, read-only contents/actions permissions, fixed concurrency/cancel-in-progress false, and BOTH literal false guards. Guards also pin repository name/ID, Source ref, attempt1, workflow name/manual event, and a fixed future one-use commit-message sentinel. No environment or secrets.* reference; no npm, World import/execution, SDK, Native, I0, AES, original key programs or provider request. github.token exists ONLY in verifier transfer env for current same-repository run/artifact metadata and assigned raw ZIP download. No new credential/custody is created. Current prepare carrier cannot execute even if merely attached; the independent Root gate and separate active one-use carrier readback/release remain necessary.
+
+Four public source-carried programs are written by qualify and extracted by verify from the SAME checkout F7; every program is SHA256-gated before import/execute. Z is the exact frozen generic ZIP utility from historical9927aea/F7 b6a000da, never the old role-specific client.
+- Q qualify7045B/SHA811edfe71f26552ad18ba8e9ca0265e0138f16f389468864f507eaeb0eae9c77.
+- S role receiver8794B/SHA1c2940f5ca11a4da77a75d42c3a96db8604b1f8859ef7461ad665486baeb9cf0.
+- V verify4540B/SHA1940a2fa6a1315143a476b65b3a4b12036c9deb16655d51a86a71a248d73f944.
+- Z13305B/SHAb36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d.
+
+Q verifies helper/test/World Git-blob, bytes and SHA pins before tests, verifies source catalog and native representation, copies the SAME focused test bytes into a private runner-only red directory and substitutes a two-function all-unknown stub. Stub RED must actually exit1 with both passing and failing cases, exact34 known test IDs and genuine TAP counts. Then checked-out REAL helper/test must exit0 with34/34 pass, fail/cancelled/skipped/todo0. Failed real tests fail the whole qualification; missing/malformed counts or IDs also fail it. Hashes are rechecked after tests. No legacy business failure is executed or represented as TDD RED.
+
+Q runs14 frozen generic ZIP controls and12 new role receiver controls, validates its own canonical pair and uploads ONLY result.json and manifest.json in a current-run SMALLSAFE artifact, no other files, raw and expanded combined caps65536. Retention7days, compression0, no overwrite. verify receives ONLY declared qualify artifact-id/digest outputs; no artifact name search/fallback, historical substitution or borrowed needs.
+
+Result JSON closed keys in canonical order:
+purpose,role,context,pins,tests,controls,nativeDescriptors,nonclaims.
+purpose=afw.sanitized-stage-observations.task1.qualification.syn.v1; role=independent-zero-afw-key-diagnostic-qualification.
+context exact keys repository,repositoryId,ref,source,tree,workflowBlob,run,attempt,node; current GitHub revision/tree/F7/run/attempt1/Node22.23.4 are required.
+pins are the exact static helper/tests/World/Z entries above.
+tests.red and tests.green exact keys exit,tests,pass,fail,cancelled,skipped,todo; all are integer counts, pass+fail=tests34.
+controls exact keys diagnosticIds,zip,receiver; all IDs and statuses must equal the fixed successful lists.
+nativeDescriptors exact keys errorStack,assertionStack; each is data/accessor/absent; actual location support is separately forced by positive test assertions.
+nonclaims exact keys historicalCauseProven,receiptAuthenticated,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified, all false.
+
+Manifest JSON closed keys purpose,context,files; purpose=afw.sanitized-stage-observations.task1.manifest.syn.v1; exact same context; files is exactly one result.json record with actual byte size and SHA256. Both JSON files require fatal UTF8 decode, byte round trip and exact canonical JSON plus single final newline. Duplicate JSON keys, extras/order/whitespace, unexpected IDs/counts/pins/context/nonclaims are rejected.
+
+V independently checks current run metadata source/ref/repository/event/path/attempt; assigned artifact ID/name/source/run/repository/head branch/head SHA/expiry/size/API digest; download raw size <=65536, uploader digest == API digest == raw SHA256; Z strict exact-two-entry ZIP including central/local consistency, supported descriptors, contiguous nonoverlapping ranges, EOF/no extras, no duplicate/traversal/symlink, inflate caps, CRC per entry and known-vector controls. V then verifies complete role schema, manifest hash, context and source pins, runs the same14+12 receiver controls, and emits ONLY fixed AFW_DIAGNOSTIC_SMALLSAFE/1 assigned-ID/digest/sizes/hashes/context/counts/nativeDescriptor/false-nonclaim fields. It never prints raw API/log/JSON failure content or token.
+
+### Exact planned control inventory — not executed
+
+34 diagnostic families:
+- d01_exact_system_codes
+- d02_assertion_data_fields
+- d03_exact_custody_messages
+- d04_no_code_prefix_inference
+- d05_exact_custody_message_only
+- d06_every_finite_public_site
+- d07_relative_public_frame
+- d08_no_free_paths
+- d09_no_free_line_or_columns
+- d10_normal_chain_and_ambiguous_frame
+- d11_message_cannot_forge_frame
+- d12_real_vm_native_error
+- d13_real_vm_assertion
+- d14_getters_never_called
+- d15_proxy_traps_never_called
+- d16_revoked_proxy
+- d17_arbitrary_objects_no_coercion
+- d18_error_private_fields_ignored
+- d19_huge_error_stack
+- d20_long_error_line
+- d21_canonical_fixed_log
+- d22_all_log_codes_and_sites
+- d23_log_secrets_not_echoed
+- d24_log_closed_schema
+- d25_log_exact_enum_only
+- d26_log_duplicate_json_fields
+- d27_log_ambiguous_or_repeated_markers
+- d28_log_truncation
+- d29_log_marker_forgery
+- d30_log_utf8_byte_limit
+- d31_log_line_limit
+- d32_log_count_limit
+- d33_nonstring_logs_no_coercion
+- d34_fresh_closed_results
+
+14 unchanged Z controls:
+- zip_valid_store_crc_vector
+- zip_valid_deflate
+- zip_signed_unsigned_descriptors
+- zip_wrong_size
+- zip_wrong_upload_sha
+- zip_wrong_metadata_sha
+- zip_extra_entry
+- zip_duplicate_entry
+- zip_traversal_entry
+- zip_symlink
+- zip_bad_crc
+- zip_noncontiguous_ranges
+- zip_declared_and_inflate_caps
+- download_stream_redirect_auth_bounds
+
+12 role receiver controls:
+- receiver_valid_pair
+- receiver_noncanonical_json
+- receiver_duplicate_json_field
+- receiver_extra_json_file
+- receiver_result_hash
+- receiver_wrong_context
+- receiver_wrong_source_pin
+- receiver_true_nonclaim
+- receiver_counts_fail_closed
+- receiver_unknown_controls
+- receiver_native_descriptor_closed
+- receiver_utf8_fatal
+
+### Verification state, self-review and next gate
+
+Public strings/data hashes and exact scoped World reconstruction/line count were checked during preparation. The known saved draft syntax issue, stale helper pin and qualification placeholders are resolved in this proposed inactive candidate. No code was evaluated/imported/tested locally. No cloud test/run has occurred in Task1, so RED/GREEN, actual Node22 accessor support, schema controls and qualification SUCCESS are all PENDING. Native compatibility is a required cloud gate, not a local-host inference.
+
+Self-review was limited to the prepared public sources, explicit diff/pins, closed schema/control list and cloud-only carrier. Full report preserves exact prior Source report b4bcbad28c7ab5b3313c97eb54c0145b5c957f77 (310494chars/310591B/SHAe95f3b0016053270ef8610662e7381a2feb4819f0fc4e1d36b5cd1dfb8bab15d) AND the saved checkpoint append. Only this SAME report is extended. Original F7 f7a71f1a0fa4f5ddf069ff411f008a098455e5cc,126209B/SHA1e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a remains the exact rollback target.
+
+Next: Root independently exact-reads inactive commit/tree/F7/helper/tests/World and report, reconciles only the five declared leaves, and decides a separate one-use activation release. No Source attachment, push/dispatch, run, rerun, fix overlay, Task2 or actual Native attempt is licensed by preparation. If released later, Source freezes until BOTH jobs terminal; executor restores exact original F7 and every undeclared baseline leaf, retains the explicit helper/test/World changes, appends actual evidence to this report and performs full ref/tree/prefix/62-workflow/run closure readbacks. All seven nonclaims remain false regardless of privacy/source qualification outcome.
+
+## 2026-11-13 — preactivation Q failure observation, revised ACTIVE proposal HELD
+
+Root independently checked inactive747f182 and the first active proposal5733fd130fb4e750d52749a7bb6717b3812fc0b6, including all code/data hashes, exact World line1933-only reconstruction, frozen Z,3198 leaves/62 workflows and five declared baseline differences. Neither proposal was attached or run. The first active proposal5733 is superseded and remains unused.
+
+Root identified one named risk before releasing Source: Q discarded all failure details and upload would skip, making an early Node22 test failure opaque. This grouped Source-only edit changes ONLY Q observation plus its two carrier SHA gates; helper/tests/World/S/V/Z remain byte-exact. Both original success-only result/manifest schemas remain unchanged. No tests, qualification, Source attach, dispatch, run, rerun, Native, private log/artifact/key/runtime action is released or claimed here.
+
+Revised Q7482B/Gitblob0e00da7b2f69d703fb7cad68177c2a74015d2565/SHA256b0de66c1d84c5b1d628c6a4c245c902908d350de57402fbb26f14d7d54ab0b97 tracks only a local fixed stage enum:
+pins,catalog,red_tests,green_tests,zip_controls,receiver_controls,pair.
+Before actual REAL test TAP is captured, failedIds remains[]; intentional all-unknown stub RED never populates it. When real TAP is captured, only exact not-ok names that match the fixed34 S.DIAGNOSTIC_IDS vocabulary can be selected; output is the static vocabulary filtered in its fixed order, with no arbitrary copied child string. Partial/unknown input cannot add another ID. Child stdout/stderr/error text, assertions, paths, actual/expected and values are never printed. Q still exits1 and produces no success-only pair if real tests or prerequisites fail.
+
+The sole failure output is canonical:
+AFW_DIAGNOSTIC_QUALIFICATION_FAILED/1 {"stage":"<one fixed enum>","failedIds":[]}
+with fixed-vocabulary IDs only where real TAP was captured. The property order is exactly stage,failedIds. This marker does not claim a private business failure or authenticated root cause.
+
+Root's explicit scope ruling authorizes reading ONLY the current zero-AFW-key qualify job log to extract/validate this exact fixed marker if needed. That role contains public Source and synthetic pure fixtures with no World/Native/private data/key execution. This narrow ruling does NOT authorize Native/contracts/producer logs, any historical log/archive/model or another role. An absent/malformed marker remains unknown; no error-text fallback.
+
+Revised active F7 blob88d4ba26c5337322a382f2c7c3dc024ec39d230b,45088B/SHA2560c3e4905f78afdcd21844936f837e1eaed938abb7e1db28d211e9cacfd203c17 keeps the exact unused push message AFW-DIAGNOSTIC-TASK1-ONEUSE-20261113, Source branch, repositoryID/name, attempt1, workflow name/ref, both push shell-role checks and workflow_ref assertions from the reviewed first active proposal. Q is the only changed carried program; S8794/V4540/Z13305 and their SHA256 pins remain unchanged. Program payloads were compared as public strings, not executed.
+
+The revised ACTIVE proposal is an UNATTACHED child of inactive747f182118d20d20eabc6cc0546dc2fbce6b4674, deliberately outside superseded5733 ancestry. It changes only F7 and this SAME append-only report relative to inactive preparation. All original Source report and saved draft prefixes remain exact. Root still must independently exact-read this new proposal and explicitly release one no-force expected-head CAS from Sourceb5873e87 before any attachment or run. Source freeze, both-jobs-terminal requirement, exact original F7 restoration and declared helper/test/World retention remain unchanged. All seven nonclaims remain false.
+
+## 2026-11-13 — Task1 one-use zero-key qualification FAILED; Source restored
+
+Status: qualification FAILED, actual native stack-to-site support NOT qualified. The released attempt is consumed and closed. Task1 is not accepted and Task2/Native/business/runtime remain HELD. Scoped helper/test/World bytes are preserved for diagnosis only; they are not a qualified adoption baseline.
+
+### Exact release, preflight, activation and terminal observation
+
+Root's explicit one-use release is recorded in Rootdocs c31dfbe42e41ad0949f9826a42fe0f14cffda120. It permitted sole Source executor CAS only from b5873e87d1f00ad10985171959e93015bc6045e3 to ae383d2890d247d9c694be6deec59853a26bdec2, exact message AFW-DIAGNOSTIC-TASK1-ONEUSE-20261113. Fresh preflight positively rechecked Source lease, main0c9c475b3ebaa970fc11d628b40e50a90cceb727, all five active-status collections0 and exact readable original F7 rollback bytes. One no-force expected-head CAS returned success and was reconciled by current Source readback and exactly one new push run. No retry, second activation, dispatch, rerun or fix overlay occurred; superseded5733 remained unused.
+
+Activated source ae383d2890d247d9c694be6deec59853a26bdec2/tree dc2d42f1983c4bed0e9da5d698ba458e6847ee45/F7 blob88d4ba26c5337322a382f2c7c3dc024ec39d230b,45088B/SHA2560c3e4905f78afdcd21844936f837e1eaed938abb7e1db28d211e9cacfd203c17. Unique current run43504422934/attempt1, repositoryID1347578006, exact Source branch, event push, fixed F7 path; created/started2026-11-13T20:45:07Z. Run completed/failure20:45:21Z. Source remained frozen throughout both declared jobs.
+
+| Declared job | Job ID | Started UTC | Completed UTC | Terminal conclusion |
+|---|---:|---|---|---|
+| qualify |132158226251|20:45:10|20:45:20|failure|
+| verify |132158337220|20:45:20|20:45:20|skipped|
+
+Qualify setup, exact-role assertions, checkout, fixed Node setup and materialize/hash gate steps succeeded. Step6 “Qualify exact helper tests with all-unknown RED and real GREEN” failed. Upload skipped; verifier had no steps and was terminal/skipped. Fresh metadata rechecked both declared jobs completed before any Source restoration. Later artifact API metadata returned exactly0 artifacts. There is no assigned/published/received SMALLSAFE and no result/manifest/receiver acceptance to claim.
+
+### Bounded independent failure evidence and TDD outcome
+
+Under the explicit current zero-key qualifier-marker ruling, Root independently read ONLY the allowed fixed marker from qualify job132158226251 and supplied this exact observation:
+```json
+{"stage":"green_tests","failedIds":["d12_real_vm_native_error","d13_real_vm_assertion"]}
+```
+No executor downloaded or inspected Native/contracts/producer logs, private logs/archive/model/key or error text. No child stdout/stderr/error/assertion value was copied into this report. The fixed marker is a stage/test observation, not an authenticated root cause.
+
+Executed Q command: node "$RUNNER_TEMP/afw-diagnostic-qualify.mjs", with the pinned Q7482B/SHA256b0de66c1d84c5b1d628c6a4c245c902908d350de57402fbb26f14d7d54ab0b97 program. Its actual child commands use node --test --test-reporter=tap against the private runner-only copy with all-unknown stub, then against test/finite-budget-failure-diagnostic.test.mjs with the checked-out real helper. The source was not executed locally.
+
+RED evidence is bounded to Q's verified control flow: it reached green_tests only after the all-unknown stub test invocation, fixed known-ID/TAP parsing and required exit1 plus mixed pass/fail checks completed. Actual numerical RED counts were not exported before failure, so none are invented here. This was deliberate pure helper stub RED, not execution of any historical business failure.
+
+GREEN failed. The two independently extracted fixed failed IDs are d12_real_vm_native_error and d13_real_vm_assertion. These test families require actual Node-native Error and AssertionError from pure VM/source-filename fixtures to project to persistence_100. The actual assertion difference/representation/fixture cause is not contained in the permitted marker and remains UNKNOWN. Do not infer that the projector returned unknown, that the getter was rejected, that a particular frame syntax caused it, or that the other diagnostic families passed; no such values/counts were published. Q reached this stage after its exact Node22.23.4/pins/catalog prerequisites, but native stack-to-site compatibility was not qualified.
+
+Q did not reach ZIP controls, role receiver controls or pair publication. The success-only schemas stayed closed, verify skipped, and workflow failure preserved the real test failure. No ZIP14/receiver12/privacy/native/SDK/World/Native-case acceptance is credited to this attempt. No npm/full suite/contract/native operation or local execution was performed under this restricted zero-AFW-key role. No test was weakened or source overlaid after failure.
+
+### Exact restoration and complete pre-append readbacks
+
+After independently terminal job metadata and a fresh exact frozen-head lease read, executor created restore commit2839799ff7f1b1778fa59ab3ad069fff4b282e0a, parent ae383d2890d247d9c694be6deec59853a26bdec2, tree ee02925f3d61ae666856664a07ff193b972f882f. It changed ONLY F7 back to original blobf7a71f1a0fa4f5ddf069ff411f008a098455e5cc. One no-force expected-head restoration CAS succeeded and Source readback reconciled exactly2839799f. Original F7 was fully fetched and byte-equal:126209B/SHA2561e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a, original manual/inputfree/no-push/seven false job guards.
+
+A complete recursive mode/type/blob comparison of original baseline treeaf758fa96434fd7a88e97f890f3796de15d5c14a and restored treeee02925f was performed on public metadata in memory, with both API responses explicitly untruncated. Baseline3196 leaves; closed3198 leaves; all62 workflows unchanged; ZERO workflow changes; ZERO undeclared changes. Exactly four intentional differences remain: new helper7ca7eb56811eadaef06e686aeaf444f3fc7a5c2e, new tests65deb058efd66d7b3bcd8efd68cc450e1f37592a, deliberately modified Worldba426c76afb2f23b2fe79cd49ef49004cbbfe834 and this SAME append-only report. Every other preunit leaf/mode/type/blob is exact. World is still only old physical line1933 changed, not an unchanged original World.
+
+Pre-append full report fetch remained exact7f327153bf70ae46f457474220e5c5adb69c123f:334071chars/334176B/SHA256ca3a374a5e529a2cdd2c388084204101a7e7823dd703901db93e7cfc4f266872. This final append preserves that entire prefix, which already preserves original310494chars/310591B b4bcbad2 and saved checkpoint append. No prior report text is rewritten.
+
+Pre-append closure inventories positively proved: consumed ae383 head exactly1 completed failure run43504422934/attempt1; restored2839799 head0 runs; current run artifact metadata0; in_progress,pending,queued,requested,waiting each0; main remains0c9c475b3ebaa970fc11d628b40e50a90cceb727. The final report-only commit must preserve this restored tree outside the SAME report and is followed by full final Source/ref/tree/prefix/62-workflow/one-run/closed-zero-run/five-zero-status readbacks.
+
+Self-review finding is explicit and unresolved: real VM Error/AssertionError location capture is not qualified. Further diagnosis must isolate the actual Node representation/fixture mismatch using a separately reviewed bounded source-only unit; this consumed attempt cannot be rerun or overlaid. No Task2 integration, original Native suite, deployment, runtime/credential/owner action, real AFW notice/review/withdrawal/autoclose or PC-off acceptance follows from this failure. All historicalCauseProven,receiptAuthenticated,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified remain false.
+
+## 2026-11-13 — Task1 fix1 INACTIVE preparation; no new run released
+
+Base is CLOSED Source523576c8a1a55303ab3e085ac05693b816838190/tree68225f5b43fe39a33171ffa2b418d99df6a306b1, main0c9c475b3ebaa970fc11d628b40e50a90cceb727. This append preserves full prior reportc569b4ea309b2602ca8dcd8699f6ab5bbec11a04,341870chars/341981B/SHA25634ca2cd3c36cff53488426499224ad82fe2b0a285319b3a75da2f630c6a46715. Original43504422934/1 remains consumed/FAILED; no rerun/overlay or old Source intent is reused.
+
+Root released FIX1 PREPARATION ONLY in exact brief docs/superpowers/briefs/2026-11-13-sanitized-stage-observations-task1-fix1.md and binding spec/ledger at Rootdocs b4904aa5fc9ce89b3e0f2603984a4ea8714a40d1. PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web/1347578006; environment Source-only unattached GitDB preparation; origin GitHub; resource current Source base above; allowed action prepare only. Source attach/run remain HELD for a new exact Root gate and separate one-use release under AFW-DIAGNOSTIC-TASK1-FIX1-ONEUSE-20261113.
+
+### Compatibility finding and trusted-startup boundary
+
+The prior failure marker established green_tests failures d12/d13, without raw assertion values. Subsequent official Node22 source confirms a compatibility deficit: bootstrap installs a data-valued default prepareStackTrace function, while the prior blanket guard rejected any such property. This Source finding is separate from unobserved cloud assertion details and does not qualify a repair. References: [Node22.23.4 realm bootstrap](https://github.com/nodejs/node/blob/v22.23.4/lib/internal/bootstrap/realm.js), [Node22.23.4 error formatting](https://github.com/nodejs/node/blob/v22.23.4/lib/internal/errors.js). The default formatting path can read name,code,message on Node-branded errors, so inherited code descriptors are included in the guard/counter controls.
+
+Root/Astra ruled that a function name, source text, lookalike closure or late-catch snapshot cannot authenticate the initial formatter. Fix1 instead captures the actual default descriptor/reference synchronously in the FIRST trusted World dependency, before thirdparty Source dependency evaluation. Only trusted pinned SYN code under controlled Node22.23.4 startup is covered. Arbitrary code substitution before that first capture is OUTSIDE the guarantee. This is not generic compromised-process security; no formatter is deleted, overwritten or temporarily disabled.
+
+Runtime startup fails closed unless Node22.23.4 is exact, NODE_OPTIONS is absent/empty, and process execArgv contains only the explicitly admitted non-preload flags --experimental-vm-modules,--test,--test-reporter=tap,--input-type=module. Qualification is stricter at its entry: both shell roles require NODE_OPTIONS unset before any Node bootstrap, and Q requires execArgv empty. The stdin-module flag is used only by fixed pinned fresh-child test input; it is not an authorization to execute arbitrary input. Preload/reflection fixtures below do not claim protection against arbitrary code that already ran before capture.
+
+### Exact proposed Source pins and World allowance
+
+| Source component | Git blob | Bytes | SHA256 |
+|---|---|---:|---|
+| runtime | 8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd | 5863 | 34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9 |
+| helper | 6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f | 7927 | 97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2 |
+| tests | 8b1580b5cd46e29da2006ab21921f84cc50e8aec | 18677 | 34e802afb65b6f3780e6a20b928d012ab3428f95389107c311345d5b3bd76d1d |
+| world | 43aad5bddd844d591572c5868b73697dfd3463f9 | 243656 | 05e50e17420c42f65f8c8c450efc6dd37f9ae429a32a070c9043ab0a50548238 |
+| zip | frozen Z | 13305 | b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d |
+| inactive FIX1 F7 | 4369c46741dd85ae3ce934d307e064defb45fc07 | 46383 | 96c11c25c03d90b81a9690854146d993d09f83a758f1abd48504698a5352227d |
+
+Add only test/fixtures/finite-budget-failure-runtime.mjs; modify helper, focused tests and ONLY World's first import+scoped catch. F7 is transient; this SAME report is append-only. All other Source leaves/modes/types/blobs inherit the exact closed base. Proposed leaf count3199, workflows62. No local Source files/evaluation/import/test/build/clone/dependencies; public strings and tree/hash data only. No npm/World/SDK/Native/provider/private log/archive/model/key/owner/runtime operation, external message, Source attachment or run occurred.
+
+World first physical line is exactly:
+```js
+import {readNativeStack as readFixedBudgetNativeStack} from './finite-budget-failure-runtime.mjs';
+```
+Current catch is physical line1934:
+```js
+ setImmediate(()=>{main().catch(async error=>{console.error('SYN fixed budget command failed');process.exitCode=1;try{if(process.argv[2]==='prepare-positive'&&process.env.GITHUB_JOB==='positive_prepare'){const bytes=await readFile(new URL('./finite-budget-failure-diagnostic.mjs',import.meta.url));const blob=createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');if(blob!=='6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f')return;const {projectFixedBudgetFailure}=await import('data:text/javascript;base64,'+bytes.toString('base64'));console.error('AFW_SYN_FAILURE/1 '+JSON.stringify(projectFixedBudgetFailure(error,readFixedBudgetNativeStack)));}}catch{}});});
+```
+Only those two hunks differ from the closed Worldba426c76; all original pre-Task1 World bytes reconstruct after stripping the exact first import and replacing the exact catch with the original line1933. OriginalWorld0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b reconstructs byte-for-byte, with exactly+1 physical line in current World. Generic error message and exit1 remain first. Only prepare-positive/positive_prepare can emit the fixed failure DTO. Helper Git blob6b5b9f89 is checked over exact file bytes before importing those SAME bytes via dataURL, and the reader is passed from the lexical first static import. No reader is read from an error property, global registry or mutable callback slot.
+
+### Early runtime and late pure projector
+
+Runtime imports ONLY node:util,node:assert/strict,node:process. No filesystem/network/key/World/SDK/Native dependency or await. It captures trusted intrinsic reflection/type primitives, global Error DATA descriptor/reference, Error/AssertionError prototype descriptors, actual default prepareStackTrace data function/reference+attributes along constructor chain, stackTraceLimit descriptor and the native stack getter/setter descriptor. Capture refuses accessor/proxy/unadmitted baseline shapes without invoking them. Captured state remains lexical/private; runtime exports only readNativeStack.
+
+Before any native getter call, runtime rechecks startup assumptions; exact current global Error descriptor/ref; current original prototype property/parent chains; exact captured default formatter descriptor/ref/attributes at each constructor-chain object; exact name/message/code/toString/constructor/Symbol.toStringTag descriptors on admitted original prototypes; primitive bounded own name/message/code data and absence of own formatting/constructor/tag hooks; exact native stack getter/setter descriptor. No name/text whitelist or unconditional function acceptance. Refusal throws only fixed null sentinel. Native raw stack text stays internal between reader and projector, never output/serialized by this role. No globals are mutated by runtime/projector.
+
+Late helper imports only node:util and contains ZERO Error/AssertionError/global formatter snapshot/new Error reads at import. Accessor stacks require OPTIONAL second argument readNativeStack from the trusted lexical caller; absence or proxy callback refuses as unknown. Error input cannot supply that function. Data stacks and fixed canonical log DTO parsing retain their old contract, bounds and fourteen exact code enums. Both public projections return only fresh {code,site} fixed vocabulary. No message, stack, arbitrary number/path/column/property/error serialization is public.
+
+Catalog remains631 finite source-site IDs over the same six pinned public files. Deterministic original raw assert/throw token matching plus previously declared extra boundaries is unchanged. Q strips first import, reconstructs original World bytes/blob and asserts exactly+1 line, then adds1 ONLY to World selected lines/IDs. Other aliases and persistence_100 remain unchanged.
+
+| Alias | Pinned original public source | Original blob | Selected sites | Current line offset |
+|---|---|---|---:|---|
+| world | test/fixtures/finite-budget-world.mjs | 0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b | 394 | +1 after original reconstruction |
+| native | test/mcp-qa-finite-budget-native.test.mjs | 533dafb5df5f8e57442c5b9029dc8dec6dded434 | 47 | 0 |
+| custody | test/fixtures/finite-checkpoint-custody.mjs | 4d05b5ec0f7b074be88ef9733a47c984b0212351 | 8 | 0 |
+| persistence | test/fixtures/finite-owner-cleanup-persistence.mjs | e0dda1fd3d66c1864fd0b20f873c7fc0c452f6d8 | 117 | 0 |
+| cleanup | lib/mcp-qa-finite-owner-cleanup.mjs | 1a5a2583d266179cdd89f799c64199f29044fec5 | 4 | 0 |
+| adapter | test/fixtures/finite-owner-cleanup.mjs | 2f5dad6c306fac1be2f11845bef640bb204ad572 | 61 | 0 |
+
+### Tests-first draft and exact new fixture boundary
+
+Original34 families are retained, with native d12/d13 still mandatory positive persistence_100 outcomes. Main test module imports runtime first, then passes that lexical reader to helper. d34 additionally proves absent reader declines an actual native accessor. d14 extends owned/prototype getter counters through the runtime and includes inherited Error.prototype.code with NO own code on the error. It obtains brand symbol KEYS from a trusted builtin-produced Node error without reading symbol getter values, defines data true on a genuine ordinary Error, and requires unknown/counter0. Removing the inherited-code guard would allow the default Node formatting branch to hit the getter; no arbitrary coercion or symbol hook is invoked by the test setup.
+
+Eight new FRESH child-process families are fixed public stdin-module programs, with no file writer/network/provider. Each child captures runtime before any replacement, creates a genuine error before global Error substitution, imports projector AFTER replacement, then requires unknown/counter0 and unchanged global descriptors. The default positive child requires actual Node default DATA formatter/function, real native site capture and exact descriptor preservation; there is no conditional skip.
+- Default formatter preserved.
+- Formatter getter after capture/before helper import, counter0.
+- Formatter function Proxy after capture/before import, all traps0.
+- Actual default formatter function TEXT cloned into a DIFFERENT closure, exact text equality but different reference; malicious closure counter0/unknown. This clone runs only as a controlled CLOUD test fixture. Runtime never uses name/text as identity.
+- Global Error getter substitution before helper import, counter0.
+- Global Error constructor Proxy substitution before helper import, all traps0.
+- Global Error different constructor substitution before helper import, constructor calls0.
+- Startup refusal for nonempty NODE_OPTIONS (--no-warnings) and --require node:util (builtin-only preload fixture, not arbitrary-before-capture protection).
+
+Exact42 diagnostic family IDs:
+- d01_exact_system_codes
+- d02_assertion_data_fields
+- d03_exact_custody_messages
+- d04_no_code_prefix_inference
+- d05_exact_custody_message_only
+- d06_every_finite_public_site
+- d07_relative_public_frame
+- d08_no_free_paths
+- d09_no_free_line_or_columns
+- d10_normal_chain_and_ambiguous_frame
+- d11_message_cannot_forge_frame
+- d12_real_vm_native_error
+- d13_real_vm_assertion
+- d14_getters_never_called
+- d15_proxy_traps_never_called
+- d16_revoked_proxy
+- d17_arbitrary_objects_no_coercion
+- d18_error_private_fields_ignored
+- d19_huge_error_stack
+- d20_long_error_line
+- d21_canonical_fixed_log
+- d22_all_log_codes_and_sites
+- d23_log_secrets_not_echoed
+- d24_log_closed_schema
+- d25_log_exact_enum_only
+- d26_log_duplicate_json_fields
+- d27_log_ambiguous_or_repeated_markers
+- d28_log_truncation
+- d29_log_marker_forgery
+- d30_log_utf8_byte_limit
+- d31_log_line_limit
+- d32_log_count_limit
+- d33_nonstring_logs_no_coercion
+- d34_fresh_closed_results
+- d35_fresh_default_formatter_preserved
+- d36_fresh_formatter_getter_before_helper
+- d37_fresh_formatter_proxy_before_helper
+- d38_fresh_identical_text_different_closure
+- d39_fresh_global_Error_getter_before_helper
+- d40_fresh_global_Error_proxy_before_helper
+- d41_fresh_global_Error_constructor_before_helper
+- d42_fresh_startup_options_refused
+
+No test has been executed for FIX1. These positive/negative assertions must be qualified in the new cloud run before any compatibility/privacy success is claimed. Q RED fixture copies the ACTUAL runtime module into the private red test fixture beside the SAME test bytes and an all-unknown helper stub. RED must fail positive behavior, not a missing runtime import. Real GREEN must pass all42, with actual native-positive tests and fresh substitution counters intact.
+
+### Updated independent zero-key qualification/schema
+
+Inactive carrier stays manual/inputfree/no-push, BOTH literal false guards, exact repositoryID/name/ref/workflow/workflow_ref/manual/attempt1/FIX1 future message, two jobs qualify+verify with three-minute limits, Node22.23.4, read-only contents/actions. Both scope shells assert unset NODE_OPTIONS. No secrets.* or GitHub environment. github.token remains confined to current same-repository run/artifact metadata+assigned raw ZIP transfer in verify. This remains an independent zero-AFW-key diagnostic role, not the26-key suite client.
+
+Source-carried programs are hash-gated before use; Q now pins runtime/helper/tests/World and copies runtime into RED, enforces exact startup, proves original World reconstruction/+1 catalog mapping, runs42families then14frozenZ+13role receiver controls. V also pins runtime. Exact program pins:
+- Q7925B/SHA25658ecf65ec65e1ba21204bcc56e2d04023ccf62e7824b612d2495a1441dc71a42.
+- S9491B/SHA2564891e42c02b1fb99aef81fce1adc5a88c34549f202d702d540d627177dbce4ae.
+- V4555B/SHA256eab05b842647de9b296c2eaf0f182b12ceda1094d19333dca8f26903d8ef87d5.
+- Z remains EXACT13305B/SHA256b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d.
+
+Success-only result/manifest canonical2JSON purpose/context/closed schema and strict metadata/raw ZIP/digest/context checks remain as previously specified, with exact pins object now runtime,helper,tests,world,zip, diagnostic vocabulary42 and receiver vocabulary13. Test counts are exact42 with green pass42/fail0/cancelled0/skipped0/todo0, RED exit1/mixed pass+fail/exact42 IDs. Controls statuses remain fixed passed only. A new receiver_wrong_runtime_pin negative control proves runtime SHA cannot be changed. All69 unique planned diagnostic+ZIP+role families are source controls, not business/Native acceptance. Z parsing/downloading/generic14control bytes are unchanged. Canonical SMALLSAFE pair and raw ZIP caps remain65536; retention7days; only literal declared outputs assign current artifact ID/digest; no historical/name fallback.
+
+Role receiver exact13 IDs:
+- receiver_valid_pair
+- receiver_noncanonical_json
+- receiver_duplicate_json_field
+- receiver_extra_json_file
+- receiver_result_hash
+- receiver_wrong_context
+- receiver_wrong_source_pin
+- receiver_true_nonclaim
+- receiver_counts_fail_closed
+- receiver_unknown_controls
+- receiver_native_descriptor_closed
+- receiver_utf8_fatal
+- receiver_wrong_runtime_pin
+Generic Z exact14 IDs remain the prior frozen list. Q fixed stage enum and fixed AFW_DIAGNOSTIC_QUALIFICATION_FAILED/1 {stage,failedIds} remain intact, now filtering only the exact42 IDs if actual real TAP was captured. No child stdout/stderr/error/values are printed. A real failure still exits1 and publishes no false success. Current zero-key marker extraction is distinct from forbidden Native/contracts/producer logs.
+
+Self-review during preparation checked source-string scopes/pins, no late Error snapshot, reader provenance, no formatter override, first import+catch reconstruction, line offset, exact carrier programs/guards and prefix preservation. No local Source execution or new Actions qualification occurred. The actual Node22 capture compatibility and all42fresh/control outcomes remain UNVERIFIED; the failed prior run is not repurposed as acceptance.
+
+Next: Root independently exact-reads this inactive unattached candidate and all new pins/schema/42+14+13 control lists. Only after a separate active proposal gate and NEW FIX1 one-use release may Source be attached. Never attach/rerun oldae383/5733/43504422934. On any future outcome Source freezes through BOTH terminal jobs, original F7f7a71/all undeclared leaves restore, explicit intended runtime/helper/test/World bytes remain, and the SAME report gets actual evidence/full closure readbacks. No Task2, Native/runtime/provider/PC-off action is released; allseven nonclaims remain false.
+
+## 2026-11-13 — Task1 FIX1 zero-key qualification SUCCESS; exact Source closure
+
+Qualification status: SUCCESS for the declared pure Node/source fixtures and current SMALLSAFE receiver only. Actual Node22 native accessor-to-finite-site positivity and declared privacy/substitution controls passed. Combined Task1 spec/quality review is the next separate Root gate; Task2/Native/runtime/PC-off remain HELD. This source qualification does not establish historical business cause or operational readiness.
+
+### One-use release, unique current run and both terminal jobs
+
+Root exact FIX1 gate/release is recorded in Rootdocs be245401b9784d759ecda6cee22c8b560402d633. Authorized sole Source executor no-force expected-head CAS was only523576c8a1a55303ab3e085ac05693b816838190→dc58ab16cadc62bc6a1c91e55564fafb7da24824, message AFW-DIAGNOSTIC-TASK1-FIX1-ONEUSE-20261113. Preflight CLI metadata briefly yielded; no mutation was attempted during that read-only wait. Fresh complete Source lease/main/fiveactive0 checks and full original rollback F7 bytes then passed before ONE CAS. CAS returned success and was reconciled by exact Source readback and ONE current push run. No ambiguous mutation/retry/second activation/dispatch/rerun/fix overlay occurred. Original43504422934 and oldae383/5733 intents stayed consumed/unused as previously documented.
+
+Activated current source dc58ab16cadc62bc6a1c91e55564fafb7da24824, tree20cfc99a40bd7487138114bd3d3c4fe956f6c0e0, F7e4ba3f88fde8dee51a8f53848f8f142494d19cac,46384B/SHA2562a72b5896c95e028fedf41db4ad3a01604d66dbd3665f851bbab962ba3b17210. Q/S/V/Z/runtime/helper/tests/World were byte-exact to the independently reviewed inactive fix1 pins; only active header/guard/shell push transformation differed.
+
+Unique run43511398408/attempt1, repositoryID1347578006, event push, exact Source branch and F7 path, created/started2026-11-13T21:31:09Z; terminal success21:31:33Z. Source remained frozen until BOTH declared jobs were terminal, with no writes or source overlay during the run.
+
+| Job | ID | Started UTC | Completed UTC | Conclusion |
+|---|---:|---|---|---|
+|qualify|132182275586|21:31:12|21:31:21|success|
+|verify|132182375946|21:31:24|21:31:33|success|
+
+Qualify role assertions/checkout/fixed Node/materialize+hash/actual RED+GREEN/SMALLSAFE upload all succeeded. Verify role assertions/checkout/fixed Node/same-carrier extraction+hash/current assigned metadata+raw ZIP+canonical pair checks all succeeded. Fresh job metadata re-proved both complete before restoration. Node startup scope checks were part of actual successful jobs; Node22.23.4 is the declared current context, not a local-host extrapolation.
+
+### Actual RED/GREEN and control evidence
+
+Executed current Q command node "$RUNNER_TEMP/afw-diagnostic-qualify.mjs" under its pinned7925B/SHA58ecf65ec65e1ba21204bcc56e2d04023ccf62e7824b612d2495a1441dc71a42. Child commands were node --test --test-reporter=tap against the actual runtime+same-test private RED fixture with an all-unknown helper, followed by the checked-out REAL helper/runtime/test. No World/Native/SDK/provider/business failure was executed.
+
+Root independently accepted the canonical current pair with these actual counts:
+| Invocation/control family | Total | Pass | Fail | Exit/meaning |
+|---|---:|---:|---:|---|
+| all-unknown stub RED |42|28|14|exit1, expected positive-behavior deficits|
+| real helper/runtime GREEN |42|42|0|exit0|
+| frozen generic ZIP |14|14|0|fixed generic controls|
+| role receiver |13|13|0|includes wrong-runtime-pin rejection|
+
+Both test invocations cancelled/skipped/todo0. The RED fixture included the ACTUAL runtime module, so it was not an absent-import failure. Current69 logical diagnostic+ZIP+receiver families passed their expected conditions; the14 RED failures are intentional stub failures, not failed real tests. Fixed IDs/pins/full inventories match the proposal, with no conditional native-positive skip and no weakened assertion. V's separate current receiver checks also succeeded.
+
+Current result nativeDescriptors is exactly {errorStack:"accessor",assertionStack:"accessor"}. Thus d12/d13 passed against ACTUAL Node22 accessor stacks using the early reader, including real VM Error/AssertionError→persistence_100. Fresh default formatter preservation, getter/proxy/exact-text-different-closure replacement after capture/before projector import, Error-global getter/proxy/constructor substitution, inherited code getter/Node-brand case and startup-refusal controls passed their fixed unknown/counter0 or positive expectations. This acceptance is confined to pinned trusted startup/source conditions. It does not prove arbitrary before-capture compromise safety, all possible Error subclasses or production failure location.
+
+All42 diagnostic IDs,14Z IDs and13 receiver IDs are the exact inventories documented in the preceding proposal; Root independently verified the entire current inventories/statuses. No child raw TAP/error/assertion/message/stack or private value is copied into this report.
+
+### Independent Root SMALLSAFE verification, exact current artifact only
+
+Root independently verified actual run/both success, exact assigned artifact metadata and fixed verify receipt; downloaded ONLY assigned SMALLSAFE14079075483; then independently checked strict exact-two-entry ZIP/CRC/ranges/EOF/bounds, fatal UTF8/canonical closed schemas/current context+pins+manifest and complete ID inventories. Executor separately read METADATA ONLY to reconcile the assigned identity and no other current artifact; no private archive/model/Native/contracts/producer log was accessed.
+
+| Current assigned item | Bytes | SHA256 |
+|---|---:|---|
+| raw artifact ZIP14079075483 |5401|9b417881bd2d860bd1559fd468bdd05b99acb4e9897e935ed8a848428151799c|
+| result.json |4599|70689eacdc7e749cc2a1b19b9bb524bb0f0b726ca379d4d736bcf5db03e94c4b|
+| manifest.json |548|ff41096ec40042be098152f75bb3d96d601160c60f902aefd8789bbc8ba43eaa|
+
+Expanded pair total5147B; raw5401B; both within65536 caps. Artifact API inventory exactly1, name diagnostic-task1-SMALLSAFE-dc58ab16cadc62bc6a1c91e55564fafb7da24824-43511398408, expiredfalse, created2026-11-13T21:31:18Z, expires2026-11-20T21:31:18Z, digestsha256:9b417881bd2d860bd1559fd468bdd05b99acb4e9897e935ed8a848428151799c; workflow_run repository/headRepository1347578006, headSource dc58ab16, exact branch/run43511398408. Uploader/API/raw digest binding and manifest result-byte/hash binding passed in current V and independent Root verification. No old artifact/name fallback or borrowed assignment was used.
+
+Qualified current context: repository tokenizartinfo-ops/agent-friendly-web; repositoryId "1347578006"; ref refs/heads/feat/finite-native-cleanup-20261101; source dc58ab16cadc62bc6a1c91e55564fafb7da24824; tree20cfc99a40bd7487138114bd3d3c4fe956f6c0e0; workflowBlob e4ba3f88fde8dee51a8f53848f8f142494d19cac; run "43511398408"; attempt1; node22.23.4. Runtime83878947/helper6b5b9f89/tests8b1580b5/World43aad5bd and frozenZ full pins are exactly the preceding proposal. Artifact/receiver transport validation is separate from historical business custody authentication; receiptAuthenticated remains false.
+
+### Exact F7 restoration and full closure before final report append
+
+After fresh exact frozen-source lease and two-terminal-job metadata, executor created restoration commitd034bae9a649892807e1aabe94c9f8fc3b443f79, parentdc58ab16, tree13d70e2849af605596d29d00b45524175c20d0ec. Only F7 changed back to original blobf7a71f1a0fa4f5ddf069ff411f008a098455e5cc; no-force expected-head CAS succeeded and exact Source readback reconciled. Original F7 was fully fetched and byte-equal126209B/SHA1e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a, original manual/inputfree/no-push/seven false guards.
+
+Complete recursive mode/type/blob comparison between pre-FIX1 closed tree68225f5b43fe39a33171ffa2b418d99df6a306b1 and restoration13d70e proved both responses untruncated,3198→3199 leaves, ALL62 workflows unchanged, ZERO workflow changes and ZERO undeclared changes. Exactly five deliberate paths differ: new runtime8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd, helper6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f, tests8b1580b5cd46e29da2006ab21921f84cc50e8aec, World43aad5bddd844d591572c5868b73697dfd3463f9 and this SAME report. World has only first import+catch, exactly+1 line; every other preunit source leaf/mode/type/blob is exact. New runtime is deliberate, not an undeclared restoration exception.
+
+Full pre-append report fetch exactly0951e40a96b230b37f55b9e9c88b1a31888eb696,358935chars/359048B/SHAe08410135541cc2f408310b87a4d3f3b4f1695f3e723a26cc6a9e195b4401b0c was verified before this append. This preserves its full prefix, including original341981B report before FIX1 and all older checkpoint/failure evidence. No history is rewritten.
+
+Pre-append inventories positively proved consumed dc58 head exactly1 completed success run43511398408/attempt1; restorationd034 head0runs; current artifact inventory exactly assigned14079075483; main0c9c475b3ebaa970fc11d628b40e50a90cceb727; in_progress,pending,queued,requested,waiting each0. Final SAME-report-only append is followed by full Source/ref/tree/prefix/62-workflow/head1run/closed0run/fiveactive0 readbacks. No runtime resources, credentials, grants, subscription, notice/review/withdrawal/autoclose, repair, deployment or owner action were introduced.
+
+Executor self-review found no additional unresolved concern within this fixed Source qualification scope; before-capture substitution/compromised-process limitation remains explicit. Combined Task1 review belongs to Root and is pending; no Task2 or Native attempt begins from this paragraph. All historicalCauseProven,receiptAuthenticated,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified remain false.
+
+
+## 2026-11-14 — Task2 integrated stage observations: INACTIVE PREPARATION; READY for independent Root gate
+
+Authority: Rootdocs `b70af1ed140f499f78478c9b948bd45144f8063c`, binding `docs/superpowers/briefs/2026-11-13-sanitized-stage-observations-task2.md`. Preparation permits GitDB blobs/trees/unattached commits/proposals only. Attaching Source, qualification, Native, runtime and provider effects remain HELD. This section reports authored Source DATA and readbacks, not passing tests. Task1 and all consumed qualifications remain closed and were not repeated. No local Source files, clone, imports/evaluation, tests, npm or build were used; in-memory builtin hashing operated only on literal fetched/authored text.
+
+Identity: PROJECT AFW; repository `tokenizartinfo-ops/agent-friendly-web` / `1347578006`; environment GitHub Source preparation; origin GitHub plugin; resource type unattached Git objects; authorized action preparation only. Sole Source branch `feat/finite-native-cleanup-20261101` remains at base `03680f05dcf051d3b2d3d2bd9829c9ac17592d2a`, tree `0ae2a53a251613137180592c5685986ca37c54e3`. Main readback remains `0c9c475b3ebaa970fc11d628b40e50a90cceb727`. Original F7 rollback is blob `f7a71f1a0fa4f5ddf069ff411f008a098455e5cc`,126209B. Root alone owns Rootdocs. This SAME Source report is append-only.
+
+### Exact immutable candidate and zero-key proposal
+
+Integrated eight-job candidate DATA commit `2c390b182f6889e79480e7b1618f41af8d1e0d22`, tree `735c681809f4b53e3d8d675ca04b39c441a0e219`, F7 blob `53d9732130e96e75aa5e26038ac8b162c6032b30`, 367124B/SHA256 `70ebdecad41f59b12f4057aa5607b715e75b1f828c38368c7c960fa1617e0553`. All eight registered job guards contain literal false. The candidate is never attached or invoked by Task2; the two-job qualifier reads its ONE fixed same-repository contents endpoint at the above commit, validates Gitblob/bytes/SHA/fatal UTF8 and treats the result as DATA. Its 367124B body is below the frozen parser cap524288B. Candidate is linked by exact commit/blob instead of a base64 report copy.
+
+Two-job inactive F7 blob `9eed3689ac4a8c12dfe734b115f09b5a31c7a8ab`, 54468B/SHA256 `bc98f0153a687d6f53a8cd68769854325b94072f559bc3595136457286b313d4`; qualify and verify each have literal false job guards. A resulting unattached proposal commit/tree is assigned in READY_FOR_ROOT_GATE and independently read back. Proposed NEW activation message is exactly `AFW-STAGE-TASK2-ONEUSE-20261114`. Root must first exact-read this inactive proposal, then separately exact-gate an active proposal before a one-use Source CAS is released; this appendix grants no attach authority. There is no workflow_dispatch, no AFW secret expression or environment, no Native/World/SDK/AES invocation in the qualifier. Standard github.token is scoped only to the fixed candidate contents read and current assigned artifact transfer; Q/D tests and diagnostic collector do not inherit it.
+
+Source module pins (all100644/blob):
+
+| Role | Path | Gitblob | Bytes | SHA256 |
+|---|---|---|---:|---|
+|runtime|`test/fixtures/finite-budget-failure-runtime.mjs`|`8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd`|5863|`34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9`|
+|helper|`test/fixtures/finite-budget-failure-diagnostic.mjs`|`6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f`|7927|`97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2`|
+|observer|`test/fixtures/finite-budget-stage-observer.mjs`|`0197111834354a1e911b977a765b161591d48b18`|15604|`1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851`|
+|tests|`test/finite-budget-stage-observer.test.mjs`|`57dfbcfae29c8492acd1767693cc6fccdde45f7e`|10425|`f206f685401be501cb9320286dea7638baa8d8f2cac5c6f796b5851da073bf8c`|
+|World,unchanged|`test/fixtures/finite-budget-world.mjs`|`43aad5bddd844d591572c5868b73697dfd3463f9`|243656|`05e50e17420c42f65f8c8c450efc6dd37f9ae429a32a070c9043ab0a50548238`|
+
+Integrated program pins:
+
+| Program | Gitblob | Bytes | SHA256 |
+|---|---|---:|---|
+|adapter|`d815dc64d2a1dab5804bae3ca5578c2ee6cad3d6`|63917|`3c36b155aab486f82fb9b89f55e0b61ffe01be4a7502350391784195e552b6d0`|
+|controls|`026ceb8ac0135abbd84eefdc853a21d7e5d0351a`|63195|`1f2d53a7ae00b215634c0d6c9aaa40134e725d561d4334ef827ca54a418df261`|
+|verifier|`d2b64db1ff7d4b916bc20902f268b806c0341e73`|15099|`94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf`|
+|safeZip|`5450dec2ffb37a90c9454fc802453ea50cd31278`|13305|`b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d`|
+
+Frozen original A62999B/d76ca29a35725fcee1b8858ebfafce003679a6b62362f76a34fe288c5a7a24d9 and C63195B/a41c417ea624e1a277f326356c8c95184ed7e24cfa42dab32decd731b970f612 were extracted as DATA from9927aea624c9269e293e644934423e88aa88f109. V15099B and Z13305B remain byte-exact. A differs only in the World pin literal and assignedPrivate observations; C differs only in the World pin literal. The complete frozen decoded key-scope parser/forms region remains20587B/SHA2564ab84021b6fcd0afdeb8b3875fa513b31a78c335c5856c9c3811e71b98fb1b7c. SOURCE_PINS remains its original five blob pins plus sdkVersion, with only World changing to the already qualified43aad5bd. Runtime/helper/observer validation is a separate bootstrap pin set. All six Native command bodies, fixed cases, eight jobs/needs/timeouts, caps, clocks and concurrency are preserved as candidate DATA; actual A.validateKeyScopes and A.validateFixedCases will run only after authorized cloud release.
+
+Task2 carrier program pins (Q/S/V/Z):
+
+| Program | Gitblob | Bytes | SHA256 |
+|---|---|---:|---|
+|Q|`7586325fead17a2d62e0e4398e3c3ca60470dd57`|13680|`7288879518302a5626aec57337f623e567cae9e500af5a8ffd8d9ed762bbc72d`|
+|S|`08a1b03b9a221ebb9fb192e6dc81ec86db20290e`|8165|`dcfe48047a1ee6538caf902c8f277ab813dd894efa8a1a8992a44ad928319dfc`|
+|V|`417977e8eed76854d803d983abd29e9561fc6119`|4481|`23da5dc25ec0b091588bf24de3ef6f492b8bcc9f6d97b018c296589e7c79fc21`|
+|Z|`5450dec2ffb37a90c9454fc802453ea50cd31278`|13305|`b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d`|
+
+### Observation contract and boundaries
+
+A.assignedPrivate emits constant canonical `AFW_SYN_STAGE/1 {"stage":...,"state":...}` only for destination own and job positive_prepare/reduction_prepare. Ordered stages are metadata_get,metadata_validation,raw_download,raw_binding,zip_decode,receipt_caps,mkdir,write_files; state is exactly start/complete. Complete is emitted only after the original operation returns, with no change to its order/caps or thrown error. Marker output failure is nonthrowing. Immediately after metadata() returns, the same eligible calls emit `AFW_SYN_HTTP/1 {"status":integer100..599}`; this never authenticates a credential or explains an error. Because metadata() includes JSON decode, a200 decode exception leaves metadata_get pending and HTTPnull. No marker is added to other destinations/jobs.
+
+D uses builtins only; it never imports World/SDK/runtime/AES or opens a network. Production entry `collectFixedStagePair` fixes RUNNER_TEMP/afw-native-private/logs and the four names command-output.log,seal-custody.log,own-metadata.log,tap-check.log. It rejects inherited GH_ARTIFACT_TOKEN, AFW_SYN_CHECKPOINT_KEY or NODE_OPTIONS. Explicit library-only `collectOwnedLogRoot(root,P,io)` admits an owned synthetic root/IO for focused tests; production exposes no argv/env free-path override. Reads verify absolute controlled realpath parents before/after, no symlink, regular nlink1, O_NOFOLLOW FD, FD/path dev/ino/mode/nlink/size/mtime/ctime identities. File cap1MiB; read tail cap65536B; line cap1024B; line count4096. A file larger than the tail is conservatively typed truncated; incomplete final lines/initial marker prefixes, malformed UTF8/lines, races, links and absent files produce typed unavailability/unknown without retries or private text. These conservative omissions are not diagnoses.
+
+Exact per-log availability enum: available,missing,oversized,unsafe,racing,malformed,truncated,unavailable. Rows use only fixed aliases command,seal,metadata,count. code uses the unchanged helper14 enum; site uses unknown or one of its631 fixed public site IDs. The collector accepts exactly canonical one-record AFW_SYN_FAILURE/1 via the pure helper. Explicit bounded legacy recognizers accept Error/AssertionError and the REAL exact CustodyError header for existing custody_* messages only; finite codes and normal approved public frames are projected through an owned Error with DATA message/code/stack, without any native reader/private error/getter. Unknown/conflicting observations return unknown; no message,actual,expected,stack,path,input,ID,URL,header,body,token or private text survives.
+
+Stage sequencing requires the exact ordered start+complete chain, allowing only one pending final start. Gaps, duplicates or conflicts yield unknown. Pending is an unauthenticated location hint that can be left by process termination. The readonly rawOutcome retains the literal aggregate steps.native.outcome: that step includes Node --test, count assertions and business-counts write. It never becomes a claim that Node test failed. countCheck enum is exactly not_observed,coded_assertion,unknown; an optional recognized assertion in the fixed count log is only a coded assertion observation. No new SEAL_OUTCOME expression is introduced.
+
+The production canonical two-JSON pair has COMBINED cap16384B. Exact result key order:
+
+```json
+["purpose","context","job","rawOutcome","logs","stage","http","countCheck","nonclaims"]
+```
+
+purpose=`afw.sanitized-stage-observations.syn.v1`; context exact nine keys repository,repositoryId,ref,source,tree,workflowBlob,run,attempt,node, with fixed AFW repo/ID/ref,40lowerhex source/tree/workflowBlob,positive canonical run,attempt1,node22.23.4. job exactly positive_prepare,reduction_prepare,readonly; rawOutcome success,failure,skipped,cancelled,not_observed. logs exactly four ordered `{log,availability,code,site}` rows as above. stage exact `{state,stage}` with state not_observed/unknown/pending/complete; stage null for unknown/not_observed, one of eight stages for pending, write_files for complete. http integer100..599 or null. countCheck as above, forced not_observed for other jobs. nonclaims exact seven false values below. Manifest exact keys purpose,context,job,files; purpose=`afw.sanitized-stage-observations.manifest.syn.v1`; files exactly[{path:'result.json',bytes:actualResultBytes,sha256:actualResultSHA}]. Canonical JSON requires exact key order and a single trailing LF, fatal UTF8 and no extra file/field. Payload contains no artifact ID/private artifact name.
+
+Three new summary_pair/summary_upload sequences precede the unchanged original truth assertions and use existing registered always&&!cancelled/suite_bootstrap success guards. Only safe-id/safe-digest outputs are added. Artifact names have fixed job slug+github.sha/run_id, never github.job. Each of the8 bootstraps verifies exact Gitblob+bytes+SHA for runtime/helper/D before later World work; relevant imports use the checked bytes as data URLs, independently from the original five-pin binding. Frozen V remains untouched. A separate final registered always step in verify uses AFW_SUITE_NEEDS/toJSON(needs) and D's pure helper to print exactly one `AFW_STAGE_DIAGNOSTIC_ASSIGNMENTS ` canonical line. Its three ordered rows are `{job,state,artifactId,zipSha256}`: assigned canonical positive safe ID+64hex digest, or unavailable/null/null. Missing/invalid/duplicate IDs yield unavailable; no artifact-id fallback, raw needs log or borrowed output. Root may consume that future fixed metadata line only; Native activation remains outside Task2.
+
+### Planned authorized cloud qualification and fixed IDs; NOT EXECUTED
+
+Controlled Node22.23.4, no NODE_OPTIONS/preloads. Locked `npm ci --ignore-scripts --no-audit --no-fund` is only in the future GitHub qualify job with the existing lock. Q command is `node "$RUNNER_TEMP/afw-stage-qualify.mjs"`; child commands are `node --test --test-reporter=tap <owned RED copy of exact test>` and `node --test --test-reporter=tap test/finite-budget-stage-observer.test.mjs`. The privacy RED stub reexports the real verified D bytes and intentionally adds a fixed private canary only to projectLogText; expected RED33tests/32pass/1fail/exit1. Real GREEN expects33/33/0/exit0; both cancelled/skipped/todo0. These are expectations, not observed results. Original Task1 tests,32key-scope cases,14frozen generic ZIP controls and old runs are not repeated.
+
+Q imports the exact extracted A bytes and directly calls its EXISTING assignedPrivate export, with synthetic fixed-endpoint fetch, inert ZIP3 bytes and owned filesystem. There is no A export addition or executable source transformation. Focused controls cover both eligible producers, metadata JSON-decode exception (pending/HTTPnull),403 observation (pending metadata_validation), each later pending stage, preserved sentinel identity, silent ineligible destinations/jobs and nonthrowing observation sink. A builtin filesystem write stub is restored immediately, with synthetic paths only. The parser negative control inserts a secret reference in the diagnostic env as DATA and requires the unchanged A parser to reject it. No real private archive is fetched.
+
+Focused D test IDs:
+
+```json
+["s01_exact_stage_chain","s02_one_pending_stage","s03_every_pending_stage","s04_no_observations","s05_sequence_gap","s06_duplicate_stage","s07_conflicting_completion","s08_marker_canonical_schema","s09_http_bounded_only","s10_http_conflicts","s11_canonical_failure_only","s12_legacy_system_code","s13_legacy_custody_enum","s14_legacy_assertion","s15_legacy_private_frame_rejected","s16_failure_conflict","s17_no_message_or_path_echo","s18_code_token_not_substring","s19_missing_logs","s20_real_files_and_closed_pair","s21_symlink_file","s22_symlink_parent","s23_hardlink_rejected","s24_file_bound","s25_tail_truncation_and_marker_prefix","s26_malformed_utf8_and_lines","s27_fd_path_race","s28_fd_mutation_race","s29_readonly_aggregate_truth","s30_pair_fail_closed","s31_exact_assignment_projection","s32_assignment_unavailability_no_borrow","s33_production_token_not_inherited"]
+```
+
+Integration IDs:
+
+```json
+["i01_integrated_key_scope","i02_exact_fixed_cases","i03_diagnostic_key_reference_rejected","i04_actual_assigned_success","i05_metadata_decode_pending","i06_http_status_observation","i07_raw_download_pending","i08_raw_binding_pending","i09_zip_decode_pending","i10_receipt_caps_pending","i11_mkdir_pending","i12_write_files_pending","i13_other_destinations_silent","i14_observation_sink_nonthrowing","i15_frozen_parser_and_programs","i16_eight_job_dag_and_bootstrap"]
+```
+
+Task2 receiver IDs:
+
+```json
+["r01_task2_closed_pair","r02_integrated_candidate_pin","r03_current_test_inventory","r04_all_seven_nonclaims","r05_current_context","r06_manifest_byte_binding"]
+```
+
+Qualifier result exact ordered keys purpose,role,context,pins,candidate,programs,tests,controls,nonclaims; purpose=`afw.sanitized-stage-observations.task2.qualification.syn.v1`; role=`independent-zero-afw-key-stage-qualification`; context current qualification's nine-field provenance; pins/candidate/programs exactly the tables above. tests={red,green}, each exact{exit,tests,pass,fail,cancelled,skipped,todo}; tests counts fixed33, RED exit1/mixed pass+fail, GREEN exit0/pass33/fail0, all cancelled/skipped/todo0. controls exact{testIds,integration,receiver}; IDs fixed inventories above, all16+6 statuses must be passed. Manifest purpose=`afw.sanitized-stage-observations.task2.manifest.syn.v1`, keys purpose,context,files, one exact result.json byte/hash binding. Pair/raw caps65536. Frozen Z supplies strict two-entry ZIP/CRC/ranges/EOF decoding and assigned transport; current uploader/API/raw digest triple, metadata workflow provenance/expiry and current context/pins must all match. Standard token never enters the diagnostic role. Only assigned stage-task2-SMALLSAFE-<current source>-<current run> can be consumed; no name/history fallback. Root independently verifies the assigned SMALLSAFE after any released run.
+
+Fixed qualification failure line: `AFW_STAGE_QUALIFICATION_FAILED/1 {"stage":...,"failedIds":[...]}`. Stage enum pins,red_tests,green_tests,integration,receiver,pair,candidate_fetch,locked_install; failedIds are filtered to the33focused or16integration IDs only. Q never prints child TAP, assertions, errors or private values. Root may extract this typed line only from the zero-key qualify role. V success metadata prefix is AFW_STAGE_SMALLSAFE/1; V failure is fixed AFW_STAGE_RECEIVER_FAILED/1. No artifact exists and no red/green count, outcome or upload success is claimed at preparation.
+
+### Preservation, readbacks and remaining gate
+
+Before this append, the ENTIRE SAME report text was fetched and builtin-hashed: blob890a0d5ce244713ab04515087dcddb4181d2dbfb,368869B/SHA256344d81629a5a8860ef685d8b9fb12b123b9935dfbf21bcb66596d716ba681626. The new text is exactly that full prefix plus this appendix. Source/main refs, Source head0runs and all five in_progress,pending,queued,requested,waiting inventories0 were read via GitHub plugin immediately before proposal creation. Complete baseline/candidate recursive trees were untruncated,3360→3362entries; baseline leaves3199; all62workflows present. Candidate changes exactly F7 plus the new D/test paths, each100644/blob. Qualification proposal additionally changes only this SAME report; a full tree diff/readback is required before READY and after any future restoration. Original rollbackF7 remains baseline; no branch was moved during preparation.
+
+The preliminary unreferenced candidatec035d551b44607af0a01c0a54c657743fc1cca82 and old D/test pinsc79cbb09/e2988494 were preparation-only and superseded before any attach by Root's concrete CustodyError/token-inheritance corrections. Only candidate2c390b182f6889e79480e7b1618f41af8d1e0d22 and the new01971118/57dfbcfa pins above belong to this proposal. None ran. These identifiers record authorship history only, not authority.
+
+Self-review so far is Source/DATA inspection only: schema is closed, production and explicit synthetic-root boundaries are distinguished, all real header/token constraints are included, clocks/commands/parser/V/Z preserve their pins, and no unapproved destination or effect was introduced. Actual Node22 filesystem behavior, builtin stub synchronization, RED/GREEN, actual A parser/fixed cases/markers and current upload/receiver outcomes remain UNVERIFIED until a separately gated one-use cloud run. If cloud fails, record only the fixed stage/IDs, freeze until BOTH jobs terminal, and seek a fresh scoped correction/release; do not silently weaken gates or rerun. Following any released run, restore originalF7 and every undeclared leaf, keep intentional D/tests, append actual test command/counts/IDs/current provenance/artifact metadata and full Source/main/62workflow/head-run/fiveactive/prefix readbacks here. Task2 combined review belongs to Root; no broad review is claimed here.
+
+All seven nonclaims stay exactly:
+
+```json
+{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+
+## 2026-11-14 — Task2 zero-key qualification SUCCESS; original F7 restored and Source closed
+
+Status: actual Task2 pure Node/source qualification and independent current SMALLSAFE verification succeeded. This establishes the declared observer/privacy/filesystem/parser/synthetic adapter controls only. Task2 combined spec/quality review remains a separate Root gate. Task3/Native, provider/runtime, business acceptance and PC-off remain HELD; all seven nonclaims remain false.
+
+### Exact one-use release and two terminal jobs
+
+Root inactive gate is preserved in Rootdocs1adad35eebd2339b6dd35c82182327f27a773d18; the exact active gate/ONE-USE RELEASE is preserved in Rootdocsfbfe3929142da695511eed8a60357fbbe4b18b2b and its ledger. Only the authorized two false&& qualifiers were removed from inactive4ccd96065037f6adb9cb5e890212f63dbe4928b1 to prepare activeb07d1b65d6e448eb353f79e31bffc3ccecdb1182; every Q/S/V/Z byte, source/candidate/program pin, schema,33+16+6 inventory and report stayed unchanged. Native candidate2c390b182f6889e79480e7b1618f41af8d1e0d22 remained unattached DATA throughout.
+
+After fresh exact Source/main/active0run/fiveactive0 and F7 readbacks, sole executor issued ONE no-force expected-head activation CAS03680f05dcf051d3b2d3d2bd9829c9ac17592d2a→b07d1b65d6e448eb353f79e31bffc3ccecdb1182, exact message AFW-STAGE-TASK2-ONEUSE-20261114. GitHub returned success:true and independent ref readback reconciled the ACK. Initial run inventory0 was propagation only; no second CAS/dispatch/rerun/overlay was attempted. Source remained frozen until BOTH declared jobs were positively terminal.
+
+Activated tree2f2241728455aa43774082fb0f36a3f88c295023; F7e3419cde630aeabb72f0d8d2e45a1f6f22f73750,54450B/SHA256ae6754ac0b0c4123e450d4a62975f8762010154e91babc29f36b638b8075e805. Unique run43606148496/attempt1, push, repo/headRepo1347578006, exact Source branch and .github/workflows/afw-finite-budget-qualification.yml, created/started2026-11-14T14:41:11Z, completed success with final run update14:41:51Z.
+
+| Job | Exact ID | Started UTC | Completed UTC | Conclusion |
+|---|---:|---|---|---|
+|qualify|132481098711|2026-11-14T14:41:14Z|2026-11-14T14:41:43Z|success|
+|verify|132481232642|2026-11-14T14:41:44Z|2026-11-14T14:41:50Z|success|
+
+The current jobs actually completed source-role assertions, exact checkout, controlled Node22.23.4, four-carrier hash materialization, fixed candidate DATA fetch, locked npm ci --ignore-scripts --no-audit --no-fund, Q qualification and current SMALLSAFE upload. V actually completed same-carrier extraction/hash, assigned metadata/raw ZIP/canonical pair/current provenance checks. These are cloud results, not local or inferred operational acceptance.
+
+### Actual RED/GREEN and integration outcome
+
+Current Q was exactly13680B/SHA2567288879518302a5626aec57337f623e567cae9e500af5a8ffd8d9ed762bbc72d, command node "$RUNNER_TEMP/afw-stage-qualify.mjs". It executed node --test --test-reporter=tap against the owned privacy-RED copy of the exact33-ID test file and the actual test/finite-budget-stage-observer.test.mjs. The RED stub reexported SAME verified D bytes and deliberately added the fixed private canary to projectLogText; the GREEN used the actual observer. Raw child TAP/assertions/errors/private text were captured only internally and were never emitted or copied here.
+
+| Current invocation/control family | Tests/checks | Pass | Fail | Exit / acceptance |
+|---|---:|---:|---:|---|
+| privacy RED |33|32|1|exit1, expected privacy deficit|
+| real D GREEN |33|33|0|exit0|
+| candidate/actual adapter integration |16|16|0|all fixed statuses passed|
+| Task2 receiver |6|6|0|all fixed statuses passed|
+
+Both RED/GREEN had cancelled0,skipped0,todo0. Exact33 focused IDs,16 integration IDs and6 receiver IDs are the complete fixed inventories in the preceding inactive proposal and current immutable carrier S. Root independently verified their exact inventories/statuses. GREEN33+integration16+receiver6=55 logical checks; this does not count the intentional RED failure as a failed real implementation. Task1 tests, previous keyscope cases and frozen generic ZIP control suite were not rerun.
+
+The real cloud results cover actual filesystem regular/link/size/tail/malformed/race handling, privacy projection and canonical schema, conservative stage/HTTP sequences, readonly aggregate outcome/count observation and ID-only assignment behavior. The production collector's GH_ARTIFACT_TOKEN rejection and real CustodyError custody_* header tests passed. Actual unchanged A.assignedPrivate export was invoked directly with synthetic fetch/ZIP/filesystem only: both eligible producer success cases, JSON-decode pending/HTTPnull, bounded403 metadata-validation observation, raw-download/raw-binding/ZIP/receipt/mkdir/write pending cases, original sentinel error preservation, other destination/job silence and nonthrowing observation sink passed. Temporary builtin write stub was restored. No real private archive, World/Native/SDK/AES or provider process was executed.
+
+Actual frozen A.validateKeyScopes and A.validateFixedCases accepted the exact367124B integrated candidate DATA; diagnostic key-reference negative control was rejected. The original decoded parser/forms region and frozen V/Z pins passed; eight-job DAG/timeouts, six exact Native command bodies and the separate eight-bootstrap diagnostic source pins were checked as DATA only. No Native command was invoked. These outcomes qualify the authored source under fixed test conditions; they do not prove arbitrary process compromise resistance or historical business failure cause.
+
+### Independent Root SMALLSAFE and assigned artifact binding
+
+Root independently completed SMALLSAFE verification at2026-11-14T14:43:44UTC, reading ONLY assigned artifact14118088928 and fixed verifier metadata. Executor read artifact METADATA ONLY and did not download any ZIP. No private/producer/Native/contracts log or archive was consumed.
+
+Unique current artifact name stage-task2-SMALLSAFE-b07d1b65d6e448eb353f79e31bffc3ccecdb1182-43606148496; expiredfalse; created2026-11-14T14:41:39Z; expires2026-11-21T14:41:38Z. Metadata workflow_run is43606148496/repository1347578006/headRepository1347578006/headBranchfeat/finite-native-cleanup-20261101/headSourceb07d1b65d6e448eb353f79e31bffc3ccecdb1182. Root independently matched the literal current uploader assignment, API metadata and raw ZIP digest triple; no historical/name fallback or borrowed output was used.
+
+| Assigned item | Exact bytes | SHA256 | CRC32 |
+|---|---:|---|---|
+| raw ZIP14118088928 |5494|63bc4be3d26ba55cd5f24eab96244694deeaf4af4aca55bcae50ee81ddab2f54|ZIP container|
+|result.json|4692|629798df5567bb1a99ab37da968685b6591ab78928eb4553165308a96ee6991e|332ac7c4|
+|manifest.json|548|cc27659c8de242ce21789700ccf177603516ad5a6dd910d1dedf700c44d7babc|53f12cee|
+
+Combined expanded pair5240B and raw5494B are within65536. Root's independent strict two-entry ZIP/ranges/EOF/CRC known-vector/fatalUTF8/canonical closed result/manifest checks passed. All nine current context fields, complete source pins, immutable candidate pin, four integrated program pins,33+16+6 inventories, manifest result byte/hash binding, seven false nonclaims and exact16-field fixed verify receipt passed. Artifact transport integrity is separate from historical custody authentication; receiptAuthenticated remains false.
+
+Qualified current context is exactly repository tokenizartinfo-ops/agent-friendly-web; repositoryId"1347578006"; ref refs/heads/feat/finite-native-cleanup-20261101; sourceb07d1b65d6e448eb353f79e31bffc3ccecdb1182; tree2f2241728455aa43774082fb0f36a3f88c295023; workflowBlobe3419cde630aeabb72f0d8d2e45a1f6f22f73750; run"43606148496"; attempt1; node"22.23.4". Qualified D0197111834354a1e911b977a765b161591d48b18/tests57dfbcfae29c8492acd1767693cc6fccdde45f7e and runtime/helper/World/candidate/A/C/V/Z/Q/S/V pins are exactly the preceding immutable proposal. The integrated candidate was never attached or executed.
+
+### Full restoration, report prefix and closure evidence
+
+After fresh exact active-source lease and two completed-success job readbacks, restoration commitbe55a74e7a940b754132e7337624cad3f947170e, parentb07d1b65d6e448eb353f79e31bffc3ccecdb1182, tree9924b772ca2493157ab72e2f20aaf15821732b99 restored only F7 to original blobf7a71f1a0fa4f5ddf069ff411f008a098455e5cc. A no-force expected-head restoration CAS returned success:true and exact branch readback reconciled it. The complete restored F7 was fetched, byte-equal126209B/SHA2561e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a, with its original closed manual/no-push configuration.
+
+Full recursive baseline/restored tree responses were untruncated,3360→3362entries; all62workflow blobs/modes/types were exact to the baseline, with ZERO workflow or undeclared leaf changes. Exactly three deliberate paths remained different: new D01971118, new tests57dfbcfa and this SAME report. Existing runtime/helper/World and every other baseline leaf/mode/type remained byte-exact. Source was not rewritten while either job was running.
+
+The entire pre-append SAME report was fetched as blob7251670fc93353c591cfcf8ee7837b5f0f2d3d65,388105B/SHA256334036cdad55beaaf09200ede9f2a09d9ee1d468c3fa5dff5019d5564aa7a752 and confirmed byte-equal after restoration. This append preserves that ENTIRE388105B prefix, including the complete368869B earlier history and inactive Task2 proposal. No earlier result or authorization was overwritten.
+
+Pre-append fresh primary inventories proved consumed qualifierheadb07d exactlyONE completed success run43606148496/attempt1; restoredheadbe55 zero runs; candidate2c390 zero runs; main exact0c9c475b3ebaa970fc11d628b40e50a90cceb727; in_progress,pending,queued,requested,waiting each0. This final report-only commit is followed by exact Source/ref/tree/full report-prefix/F7/62workflow/consumed-head1/current-head0/candidate0/fiveactive0 readbacks. Any unexpected change would be reported before DONE, without overwriting another writer.
+
+Executor self-review checked authorization/CAS reconciliation and freeze, exact pin/schema/test inventories, actual cloud evidence versus nonclaims, fixed artifact assignment and independent Root verification, full original F7 restoration, complete baseline-tree preservation and append-only historical prefix. No additional unresolved concern was identified within this bounded Task2 source qualification. Conservative unavailability, unauthenticated location hints and process-compromise/historical-cause limitations remain explicit. Root owns the pending combined Task2 review. No Task3/Native, deployment, permission/key/OAuth, runtime, private data or PC-off authority follows from this result.
+
+All historicalCauseProven,receiptAuthenticated,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified remain false.
+
+
+## 2026-11-14 — Task3 original whole SYN: INACTIVE UNATTACHED PREPARATION; Root gate HELD
+
+Status at 2026-11-14T15:00:12Z: preparation only. No Source ref was moved, no workflow was dispatched, no run/rerun was requested and no Native program was executed. This is the next materially instrumented original whole-SYN proposal after Task1 and Task2 COMPLETE/CLEAR. It is not AFW operational acceptance or PC-off evidence. All seven nonclaims remain false.
+
+### Authority, exact target and preserved prefix
+
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web, repositoryId1347578006; ENVIRONMENT=GitHub GitDB preparation only, future finite SYN Actions run HELD; ORIGIN=GitHub plugin/API for this exact repository; RESOURCE_TYPE=unattached Git blob/tree/commit proposal; RESOURCE_ID=sole Source branch feat/finite-native-cleanup-20261101; ALLOWED_ACTION=read exact source/ref/tree/report, create inactive UNATTACHED proposal objects changing only F7 and this SAME report; ROLLBACK=leave refs untouched now, and after any separately released future trial restore original F7 plus all undeclared baseline leaves, retaining only this report append. Rootdocs docs/finite-pcoff-continuation-20261103 is Root-only and was not written by this executor.
+
+Binding brief is docs/superpowers/briefs/2026-11-14-sanitized-stage-observations-task3.md in Rootdocs03f60ca1198f0ca76b1520b5296048319e4bb2e0, clarified at Rootdocs5279d9f7d808332bdc91803b061dec7b8723ed2f/blob82619d7d4185527c23db6900fa24fac9dc698885. Scope AGENTS.md at Source base was read; there is no more-specific AGENTS path in the complete baseline tree. The Hermes/Tokenizart context does not change the AFW task or its resources.
+
+Fresh primary Source ref read was exactly 77cff1a07df0d2b41145137dd1cdd1b5627463b6, treeed8f813bd4cac718733c75043127a68da4c721e3; main was exactly0c9c475b3ebaa970fc11d628b40e50a90cceb727. The baseline recursive Git tree is untruncated,3362entries,3201leaves including62workflow blobs. Every baseline leaf/mode/type is protected except transient F7 and this SAME report. Closed baseline F7 is .github/workflows/afw-finite-budget-qualification.yml, blobf7a71f1a0fa4f5ddf069ff411f008a098455e5cc,126209B/SHA2561e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a. It remains the restoration target.
+
+The ENTIRE pre-append report was fetched and byte-hashed as blobc4f993a6f53649b3e4a4e7cae2f5f2128d62a85d,398970B/SHA2567ec0c35c9346c3a569549410c1a11bd9ee967048f98ea708078939294d56d0de. This proposal is exactly that full398970B prefix followed by this appendix; no historical result, actual qualification evidence or authorization was rewritten. Git identities of the complete inactive proposal are emitted by the subsequent GitDB create/readback package to Root; this appendix cannot embed the hash of its own containing commit. Parent of that complete proposal must remain exactly77cff1a07df0d2b41145137dd1cdd1b5627463b6, without moving any ref.
+
+### Qualified DATA source and exact allowed delta
+
+Task2 integrated Native candidate2c390b182f6889e79480e7b1618f41af8d1e0d22/tree735c681809f4b53e3d8d675ca04b39c441a0e219 was fetched only as DATA. Its F7 blob53d9732130e96e75aa5e26038ac8b162c6032b30,367124B/SHA25670ebdecad41f59b12f4057aa5607b715e75b1f828c38368c7c960fa1617e0553 matches the brief. It was never attached or run. Task2 actual run43606148496/attempt1 and independent Root SMALLSAFE14118088928 qualified that earlier candidate under the declared zero-key controls; they do not qualify this new F7 byte-for-byte. No consumed intent/head/run is reused.
+
+New inactive F7 is blob1e4c2f5ec9c19d36ccf1b372963c96e234e899c9,367388B/SHA25633473971cca42150a268776722301b40e50fb4e18e04e37ff555674d5ad01b53. It is copied from the qualified DATA with exactly these16 textual changes:
+1. In all eight existing job guards only, replace old literal AFW STAGE OBSERVATIONS NATIVE HELD 20261114 with exact new literal AFW-STAGE-TASK3-NATIVE-ONEUSE-20261114. All eight existing false && prefixes remain. The final verify keeps its existing false && always() && guard shape.
+2. Immediately before the existing node --input-type=module <<'NODE_SUITE_BOOTSTRAP' command of each of the eight existing suite_bootstrap steps, insert exactly the shell line below, keeping every prior guard/line/order.
+
+```bash
+          test -z "${NODE_OPTIONS+x}"
+```
+
+The exact new line refuses even an explicitly set empty NODE_OPTIONS before that bootstrap's first Node entry. It enforces the Task1 trusted-startup precondition and does not broaden that trust boundary or make a general process-compromise claim. No CLI/preload option, KEY_SCOPE_PRECHECK byte or key environment was changed. Inactive has exactly8falseguards/8new-message guards/8startup additions. A string-level inverse of ONLY those eight literal changes and eight inserted lines reproduces the complete367124B qualified F7 byte-for-byte. Thus all other text, comments, assertion bodies, guards, steps, dependency/output/permission/env/timing data and frozen parser/forms are unchanged. This comparison is DATA inspection, not parser execution or a new passing qualification.
+
+### Frozen programs, pins, six Native blocks and graph
+
+All four embedded program bodies were extracted as text, preserving deindentation and trailing LF, and hashed without import/eval/execution. Exact A/C/V/Z bytes and hashes are unchanged:
+
+|Program|Bytes|SHA256|Git blob of body|
+|---|---:|---|---|
+|A|63917|3c36b155aab486f82fb9b89f55e0b61ffe01be4a7502350391784195e552b6d0|d815dc64d2a1dab5804bae3ca5578c2ee6cad3d6|
+|C|63195|1f2d53a7ae00b215634c0d6c9aaa40134e725d561d4334ef827ca54a418df261|026ceb8ac0135abbd84eefdc853a21d7e5d0351a|
+|V|15099|94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf|d2b64db1ff7d4b916bc20902f268b806c0341e73|
+|Z|13305|b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d|5450dec2ffb37a90c9454fc802453ea50cd31278|
+
+The qualified World/runtime/helper/D/Dtests source blobs remain exact baseline leaves. SHA256 values below are the binding brief's frozen content pins; their blob/size identities were read from the full baseline tree and their existing bootstrap declarations remain unchanged through the whole-workflow inverse proof.
+
+|Pin|Path|Git blob|Bytes|SHA256|
+|---|---|---|---:|---|
+|World|test/fixtures/finite-budget-world.mjs|43aad5bddd844d591572c5868b73697dfd3463f9|243656|05e50e17420c42f65f8c8c450efc6dd37f9ae429a32a070c9043ab0a50548238|
+|runtime|test/fixtures/finite-budget-failure-runtime.mjs|8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd|5863|34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9|
+|helper|test/fixtures/finite-budget-failure-diagnostic.mjs|6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f|7927|97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2|
+|D|test/fixtures/finite-budget-stage-observer.mjs|0197111834354a1e911b977a765b161591d48b18|15604|1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851|
+|Dtests|test/finite-budget-stage-observer.test.mjs|57dfbcfae29c8492acd1767693cc6fccdde45f7e|10425|f206f685401be501cb9320286dea7638baa8d8f2cac5c6f796b5851da073bf8c|
+
+Existing five-pin binding remains pureTestBlob1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8, nativeTestBlob533dafb5df5f8e57442c5b9029dc8dec6dded434, worldBlob43aad5bddd844d591572c5868b73697dfd3463f9, custodyBlob4d05b5ec0f7b074be88ef9733a47c984b0212351 and lockBlob36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b, SDK1.2.1. All eight bootstraps retain independent exact runtime/helper/D blob+bytes+SHA checks and the existing verified observer byte transport. No source pin was changed to obtain a result.
+
+The six original Native step blocks below include their exact existing step header, env, shell/run content and terminating text before the next step. Each is unchanged by the sixteen allowed edits. These hashes record the original complete blocks as DATA; no command ran.
+
+|Native job block|Bytes|SHA256|Git blob of block|
+|---|---:|---|---|
+|positive_prepare|360|a5fb9018a15148200d9f974d88fceddd7b969dd1da34aec5d1d177e627a4bb1f|e4d289df7fc4cb3b326a739d0cbbc1491c985fd0|
+|positive_consume|1259|04372215e782289cf9f9369deb3e41b692c78c7ba69db390170edee7eeb5f1b5|7b8d268af609632fbecbfa9304efad1b8207b153|
+|reduction_prepare|362|0884130dfd71b58991ab0a5810d45ceb86140ba1037eb3e69a61199bc813f3f5|ff19f87a2167cab59475fa5d9a0e90e0c41c4850|
+|reduction_consume_a|1262|cafaa1cfe677ea408c3bd0430d87aefbac615ec55ceb621f85f1b161d3354fe4|3793543f16f3ae3eb85458763b9a4e2ec76149d3|
+|readonly|1164|b5fa881c10523d636b77a787b7e92bcc14bc64e13d658bd34476f00e1d4e9f0c|d0990f3d9edf9b4ca757fc65b1cfd87376d9fa1c|
+|reduction_consume_b|1262|c0566bba404f2a61b8d22f0b80272e2b1322f4799ef14f248e28736511a1d378|4715c7fcc12c939d44d5bad8128b4bdca9cdc56b|
+
+All eight declared jobs, needs/timeouts and key placements are unchanged. Secret references remain ONLY the26generic crypto slots across the same six native jobs/environments,0contracts/verify. No value was read/copied and custody did not change.
+
+|Declared job|Original needs|Timeout minutes|Frozen crypto slots|New startup absence check|
+|---|---|---:|---:|---|
+|contracts|none|2|0|yes|
+|positive_prepare|[contracts]|15|3|yes|
+|positive_consume|[contracts, positive_prepare]|15|4|yes|
+|reduction_prepare|[contracts]|15|3|yes|
+|reduction_consume_a|[contracts, reduction_prepare]|15|4|yes|
+|readonly|[contracts]|7|3|yes|
+|reduction_consume_b|[contracts, readonly, reduction_prepare]|15|9|yes|
+|verify|[contracts, positive_prepare, positive_consume, reduction_prepare, reduction_consume_a, readonly, reduction_consume_b]|2|0|yes|
+
+All clocks/caps/delays/cancellation semantics stay original: R120s, P-D300s, root30s, child5s; I0-to-C0 900000ms; C0-to-C1 180000ms; peakNative3, Miniflareperjob2/global6. Original concurrency group afw-finite-budget-qualification and cancel-in-progress:false remain unchanged. NativeScope, closure and provider assertions are original. Business acceptance remains Q8+Native8=16TOTAL, never16Native. No extra or separate Task1/Task2/old32keyscope/14Z requalification is planned or authorized. ALL checks inherently invoked by the frozen full pipeline remain: in particular V runs its original14ZIP+2receiver controls once inside the future original trial. They are separate from business Q8+Native8, and V is not rewritten to omit them. The unchanged actual contracts/parser will validate the final Source workflow before Q8/Native if Root later releases the one-use attempt.
+
+### Observation, acceptance, activation and closure contract
+
+The already-qualified three diagnostic summary pair/uploader sequences and safe-id/safe-digest outputs remain exact. Their eligible producers are positive_prepare,reduction_prepare,readonly. Existing source guards and original truth assertions are not weakened. The final verify projection remains exactly AFW_STAGE_DIAGNOSTIC_ASSIGNMENTS with three ordered rows: explicit current numeric artifact ID+64hex ZIP SHA, or unavailable/null/null. Missing/invalid/duplicate producer outputs stay unavailable; no name/history fallback, borrowed job/run output or fabricated assignment is permitted. SuiteSAFE is separate and a partial diagnostic success cannot establish whole-suite acceptance.
+
+Root alone may independently consume the literal current assigned three diagnostic pairs and literal assigned SuiteSAFE, after exact current run/attempt/job/repository/head/context/name/bytes/digest/manifest/schema binding. Executor observes compact GitHub run/job/step/artifact metadata only, never Native/contracts/producer logs or private cipher/model archives. No checkpoint key copy, private archive download/open, log download, CFAPI/provider/runtime operation, Max, OAuth/OTP/mail, owner action or credential/custody change is authorized. Existing previously-custodied synthetic key can be used only by the unchanged26crypto slots of the existing pipeline AFTER an exact Root one-use release.
+
+This inactive commit must first receive Root independent gate. Only if Root asks, a separate ACTIVE UNATTACHED proposal may remove ONLY8falseguard prefixes, with exact commit message AFW-STAGE-TASK3-NATIVE-ONEUSE-20261114 and all other text/programs/pins/report held. That remains HELD for a separate exact Root gate and ONE-USE RELEASE. No SourceCAS, attach, workflow_dispatch, old intent, rerun or activation follows from this preparation or its successful object creation.
+
+After a future exact release only: fresh closed Source lease, one no-force expected-head CAS to the exact approved active commit, reconcile the ACK and find UNIQUE workflow/ref/head run with attempt1. Unknown ACK or initial0run is not permission to repeat CAS/dispatch/rerun/overlay. Source freezes until ALL EIGHT DECLARED jobs are positively terminal; absent/unknown is not terminal. Record exact started/endedUTC, immutable source/tree/F7/programs, run/attempt/jobs/current artifact metadata and actual raw outcomes only if exposed. REST continue-on-error conclusion may differ from raw Native outcome. No failed/missing16checks can be reported as an accepted full suite.
+
+Once all8terminal, fresh Source lease and restore original F7 plus every undeclared baseline leaf; only this SAME report append survives. Preserve the ENTIRE active-proposal report prefix, append exact outcomes/Root sanitized acceptance/current metadata and closure readbacks. Required closure includes untruncated full baseline/current tree diff, all62workflow identities, main unchanged, consumed head exactly1run/attempt1, final head0runs and all five in_progress,pending,queued,requested,waiting inventories0. A failed frozen trial permits reporting/restoration, not a fix overlay or another run. A cause-location hint, pending stage, HTTP code or site is unauthenticated and is not historical cause or a credentials diagnosis.
+
+### Preparation verification and current limits
+
+Full baseline tree and complete historical report were inspected remotely through the GitHub plugin. Source head77cff returned0runs and each of the five Source active-state inventories returned0. Main and Source were read explicitly. Workflow data-only verification established all16allowed text edits by exact inverse equality; four program hashes match every binding brief value, all eight new guards remain false, eight bootstrap checks precede only the assigned Node commands,26keyslots remain across exactly6jobs, the eight-job DAG/timeouts and six Native blocks remain exact. Full inactive GitDB tree/commit/report readbacks follow before READY and must show exactly F7 plus this SAME report changed, no deleted/added baseline leaf and no other workflow change. A later gate cannot infer validity from this narrative alone.
+
+No extra tests, Node import/eval, source execution, local Source files/clone/npm/build, remote Actions run, key-scope replay, architecture review or runtime/provider access was performed. Task1/Task2 actual controls remain their prior dated evidence. New workflow parser acceptance, Q8/Native8 outcomes, diagnostic assignments, SuiteSAFE acceptance, actual execution clocks and Root artifact checks are UNKNOWN / NOT RUN at this preparation checkpoint. Runtime/native activation is HELD. No Source ref changed during preparation.
+
+All seven flags remain exactly:
+
+```json
+{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+
+## 2026-11-14 — Task3 original whole SYN attempt FAILED / CONSUMED; exact Source restoration
+
+Status: the ONE released materially instrumented original full SYN attempt completed as an observed FAILED trial. Business Q8+Native8=16 was NOT accepted. Three current assigned tiny diagnostic pairs passed Root's independent strict transport/schema/provenance verification; SuiteSAFE was unavailable and no full-suite package was accepted. This is source/synthetic observation only, not real AFW operational or PC-off evidence. No further fix, overlay, rerun or trial is authorized by this result.
+
+### Exact gate, one-use activation, provenance and freeze
+
+Root INACTIVE gate PASS is preserved in Rootdocs20f870513323543d94689d7c2ab66291c7388586/ledger. The independent exact active gate and ONE-USE SYN RELEASE are preserved in Rootdocs6cd215bc3b2b117a42372497effc0b94df8ddd89/ledger. Sole executor was released to perform expected77cff1a07df0d2b41145137dd1cdd1b5627463b6 -> ONLYc44db8cf2d08bdbb15287026e3ca93c3155ae5f1, with exact commit message AFW-STAGE-TASK3-NATIVE-ONEUSE-20261114.
+
+Inactive16d7c94e641a039fe5bf4c66b8bf00bbaa1cfeda/treeb5924f655522da74c046dad98a44fa60edcd03c2, parent77cff, contains the preceding full proposal. Activec44db8cf2d08bdbb15287026e3ca93c3155ae5f1, parent16d7c94e, tree049314b0962089400424dc25e80a488320eee893, differs ONLY by removing the8false&& job-guard prefixes. Exact active F7 is blob9614b64c67a293118fb5983868699abac5fd16bd,367316B/SHA256641482474579a238652f384b013dbc5bb216b170d4144737fad4dda1063bc4c0. Eight explicit shell NODE_OPTIONS absence guards remain immediately before the existing suite_bootstrap Node commands. The four original A/C/V/Z programs, World/runtime/helper/D/Dtests and five source pins, six Native blocks,26crypto slots across six original jobs/environments, eight-job DAG/timeouts, clocks/caps/delays/concurrency/cancellation and every other text byte remain as in the preceding proposal. No source, credential or custody correction was made during the attempt.
+
+Fresh activation preflight at15:07:09UTC verified Source77cff, main0c9c475b3ebaa970fc11d628b40e50a90cceb727, exact activehead0runs and all five Source active-state inventories0. Executor issued exactly ONE no-force activation CAS with expected77cff to c44db8cf. It returned success:true, and an independent ref readback reconciled the ACK to exactlyc44db8cf. No second activation/CAS/dispatch/rerun/old intent or overlay was attempted. Source stayed frozen through all eight declared terminal jobs; absent jobs were treated as unknown until their explicit records appeared.
+
+Unique current run43608448872/attempt1, workflow410564082, path .github/workflows/afw-finite-budget-qualification.yml, eventpush, exact Source branch feat/finite-native-cleanup-20261101, repositoryId/headRepositoryId1347578006, headc44db8cf. Run created/started2026-11-14T15:07:23Z. Last declared job completed2026-11-14T15:24:22Z; final run metadata is completed/failure with updated_at2026-11-14T15:24:23Z, observed completed in the15:24:34UTC read. GitHub does not expose a separate run completed_at here; updated_at is recorded as metadata, not silently substituted for such a field.
+
+Current nine-field diagnostic context verified by Root is repository tokenizartinfo-ops/agent-friendly-web; repositoryId"1347578006"; ref refs/heads/feat/finite-native-cleanup-20261101; sourcec44db8cf2d08bdbb15287026e3ca93c3155ae5f1; tree049314b0962089400424dc25e80a488320eee893; workflowBlob9614b64c67a293118fb5983868699abac5fd16bd; run"43608448872"; attempt1; node"22.23.4".
+
+### All eight current terminal jobs and actual execution boundary
+
+|Declared job|Exact job ID|Started UTC|Completed UTC|API status/conclusion|
+|---|---:|---|---|---|
+|contracts|132488025732|2026-11-14T15:07:25Z|2026-11-14T15:08:11Z|completed/success|
+|positive_prepare|132488245845|2026-11-14T15:08:16Z|2026-11-14T15:22:09Z|completed/success|
+|positive_consume|132492136639|2026-11-14T15:22:14Z|2026-11-14T15:24:03Z|completed/success|
+|reduction_prepare|132488245736|2026-11-14T15:08:16Z|2026-11-14T15:22:00Z|completed/success|
+|reduction_consume_a|132492091570|2026-11-14T15:22:05Z|2026-11-14T15:24:10Z|completed/success|
+|readonly|132488245757|2026-11-14T15:08:15Z|2026-11-14T15:11:24Z|completed/failure|
+|reduction_consume_b|132492093014|2026-11-14T15:22:01Z|2026-11-14T15:22:00Z|completed/skipped|
+|verify|132492710716|2026-11-14T15:24:13Z|2026-11-14T15:24:22Z|completed/failure|
+
+For reduction_consume_b, GitHub returned started15:22:01Z and completed15:22:00Z in the skipped record. Both literal metadata values are retained; no clock compensation, duration inference or rewritten timestamp is applied. Every declared job is explicitly completed; reduction_consume_b is skipped, not a missing/assumed terminal job.
+
+Contracts metadata shows decoded key-scope validation, fixed syntax/lint/inactive-module/eight-contract step, fixed preparation controls, three-profile preflight and retained same-ID inventory all completed/success in this exact workflow. This is metadata evidence, not an independently exposed test-count record. The actual frozen parser accepted this final Source carrier in the current contracts step. No separate Task1/Task2/old32keyscope/14Z requalification run was executed. Frozen V and its inherent14ZIP+2receiver code remained intact in this original trial; no assertion about those checks passing follows merely from their presence or the failed V step.
+
+Five declared Native step blocks executed; reduction_consume_b's sixth block did not run because that job was explicitly skipped. REST gives completed/success for the readonly Execute fixed readonly once step, but this step uses continue-on-error and Root's qualified diagnostic reports rawOutcome FAILURE. Therefore REST success is not evidence of a successful raw readonly command. No Q8/Native8 per-test inventory, missing count or suite total is manufactured from job/step metadata. The frozen whole acceptance failed, and business16 remains NOT accepted.
+
+Readonly failed its Generic custody seal step and its original Preserve actual command and custody outcome assertion. Its original encrypted upload, metadata/open/semantic steps were skipped. The diagnostic pair publication and upload still completed/success before the original truth guard, as designed. The five successful job conclusions and the two successful producer diagnostics do not substitute for seven successful upstream jobs or for final SuiteSAFE acceptance.
+
+Current producer Native blocks ran about13minutes according to their step metadata. Source inspection by Root found the frozen produceCheckpoint default deferWait=false and waitUntil(C0-120000), which explains the planned wait structure; a long producer step is not evidence of a Cloudflare incident. This trial did not access real CF/provider runtime. No historical cause is inferred.
+
+### Root independent current tiny diagnostic evidence
+
+At2026-11-14T15:26:49UTC Root independently consumed ONLY the THREE literal assignments from this current final verify metadata. Root checked exact current API metadata/name/job/9-field context, uploader/API/raw digest binding, strict two-entry ZIP/ranges/EOF/CRC/fatalUTF8, canonical closed pair/schema, allowed pins/vocabulary, manifest binding and16KiB bound. All three passed those checks. Executor read artifact METADATA ONLY and did not download a diagnostic/private ZIP or any job log. Root read only permitted final verify metadata plus these assigned tiny pairs; no private/Native/contracts/producer log or archive was consumed by this evidence path.
+
+|Literal assigned diagnostic job|Artifact ID|Raw ZIP bytes|Raw ZIP SHA256|Metadata created UTC|Metadata expires UTC|
+|---|---:|---:|---|---|---|
+|positive_prepare|14119776284|1217|c3dddc0ebeb48fbd897f683b2b205d6b25588df66bd72c8afc26c8f974dda3a9|2026-11-14T15:22:06Z|2026-11-21T15:22:06Z|
+|reduction_prepare|14119682967|1219|4b1287d69ed7c17be542b560e7eb1fd4ead948492a9b378d8a0c9ab8e5c421cb|2026-11-14T15:21:57Z|2026-11-21T15:21:57Z|
+|readonly|14119507842|1211|95eada759d9157a8739049b8371624808fae8c6fd0646e5ca007d7a65672ff30|2026-11-14T15:11:21Z|2026-11-21T15:11:20Z|
+
+All three API expired=false and metadata workflow_run bound run43608448872/repository1347578006/headRepository1347578006/branchfeat/finite-native-cleanup-20261101/headc44db8cf. Exact names are afw-stage-<literal job>-safe-c44db8cf2d08bdbb15287026e3ca93c3155ae5f1-43608448872. They were consumed because of explicit current assignments, never selected by name/history fallback. Full inner result/manifest byte/hash/CRC details and exact canonical result records are preserved in [Root's immutable independent receipt](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/e8e0f8d82c3ab607b12310531e429cd59b8fda1b/docs/superpowers/progress/2026-11-14-sanitized-stage-task3-observations.es.md), Rootdocse8e0f8d82c3ab607b12310531e429cd59b8fda1b. The lowercase code is exactly custody_limit; no uppercase enum is introduced. Executor does not reconstruct unexposed inner fields.
+
+Root's sanitized accepted content is exactly bounded as follows:
+- positive_prepare: rawOutcome success; stage complete at write_files; HTTP200. Command/seal/metadata logs available with unknown codes; count log missing. Missing counts are not treated as observed.
+- reduction_prepare: rawOutcome success; stage complete at write_files; HTTP200. Command/seal/metadata logs available with unknown codes; count log missing. The successful stage chain is a location observation, not whole-suite acceptance.
+- readonly: rawOutcome FAILURE; command log available/codeunknown/siteunknown. Seal log available/codecustody_limit/sitecustody_20. Metadata and count logs MISSING; stageunknown/HTTPnull/countChecknot_observed. No exact limit kind, key/credential fault or historical cause is established. This does not distinguish a Node test failure from the aggregate raw command failure, and does not explain any earlier consumed run.
+
+No missing marker, field or output was filled from another job/run. No exception message, file path, private record, secret or unapproved metadata was projected into the diagnostic report. Stage/HTTP/site remain unauthenticated location hints. Strict transport/provenance verification does not make receiptAuthenticated or historicalCauseProven true.
+
+### Exact unavailable SuiteSAFE and business nonacceptance
+
+Root received the current literal SuiteREADBACK with artifactIdnull, digestnull, statusunavailable, reasonpublication_unavailable, proofabsent, upstreamnot_all_seven_success and acceptedfalse. No SuiteSAFE download occurred and no artifact name/history fallback or private artifact substitution was attempted. Current artifact metadata listed eight artifacts, but existence/names do not assign a SuiteSAFE. Partial diagnostic success does not create the absent accepted package.
+
+Business Q8+Native8=16 is NOT accepted. Per-test actual counts remain unavailable where not exposed by allowed current proof. Frozen V rejected the incomplete upstream set; this is not a passing receiver or full-suite result. No real notice/review/withdrawal/autoclose/autonomous host/PC-off claim, owner power-off request, key-scope expansion, deployment or follow-up trial follows.
+
+### Exact restoration, complete prefix and final closure
+
+After ALL8declared jobs were explicitly completed, fresh Source lease read exactlyc44db8cf and main remained0c9c475b. Restoration commite4aaf3da8b589f0908f542aa0d434b4b53f18c3a, parentc44db8cf, treecc718f2c6dd97fbf71bf1e8f0ac500d0f61621ee, restored original F7 blobf7a71f1a0fa4f5ddf069ff411f008a098455e5cc. A single no-force expected-active restoration CAS returned success:true and independent ref readback reconciled exacte4aaf3da. Full original F7 was fetched and byte-equal126209B/SHA2561e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a, with its original closed manual/no-push configuration.
+
+Complete baseline/restored recursive trees are both untruncated3362entries/3201leaves. Every baseline leaf/mode/type is exact except this SAME report; all62workflow blobs/modes/types, including F7, are exact originals. No new/deleted Source leaf or undeclared change survives. Existing World/runtime/helper/D/Dtests and every other baseline artifact were not altered. Rootdocs was not written by executor.
+
+The ENTIRE active-proposal report prefix was fetched before restoration and after restoration as blob5f96b5c8797a46e8ab406ba9ee64e021143686f8,414375B/SHA25645646ee370398fadb7824ee3ee8a1177c4f1fa61e6ac168ad3197b5f93b111ae. Both complete texts are byte-equal. This outcome appendix is added after that ENTIRE414375B prefix, including all398970B prior history and the full inactive proposal. No earlier actuals, authorization or concern was rewritten.
+
+Fresh pre-append readbacks at2026-11-14T15:29:46UTC verified restored Sourcee4aaf3da; main exact0c9c475b3ebaa970fc11d628b40e50a90cceb727; consumedc44db8cf exactlyONE completed/failure run43608448872/attempt1; restoredheade4aaf3da0runs; in_progress,pending,queued,requested,waiting each0. Final report-only commit will be followed by exact ref/tree/full-prefix/F7/all62WF/currenthead0runs/consumedhead1attempt1/fiveactive0 readbacks. Its own content-addressed identity is reported by the final tool receipt and Root closure record rather than a circular self-hash inside this appendix.
+
+Executor self-review checked exact authorization/one-use CAS and ACK reconciliation, Source freeze until all8terminal, immutable programs/pins/commands/clocks and current observation versus missing proof, raw readonly outcome versus continue-on-error REST presentation, Root-only assigned tiny artifact access, all3201baselineleaves/62WF restoration and full414375B append prefix. No additional Source fix was attempted. Remaining limits are explicit: failed whole suite; unavailable SuiteSAFE and count observations; no exact custody-limit kind or Node-test/aggregate distinction; no historical cause, authenticated receipt, physical global drain, SDK namespace emptiness, operational readiness or PC-off proof. Root owns combined Task3 review and subsequent whole-plan final review.
+
+All seven flags remain exactly:
+
+```json
+{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+### Complete current API step metadata (no logs)
+
+These are only REST step status/conclusion/timestamp records from current run43608448872/attempt1. They are retained verbatim as metadata and do not override the qualified raw readonly FAILURE or unavailable count/SuiteSAFE proof.
+
+
+#### contracts — current API step metadata
+
+|Step|Exact name|Status/conclusion|Started UTC|Completed UTC|
+|---:|---|---|---|---|
+|1|Set up job|completed/success|2026-11-14T15:07:26Z|2026-11-14T15:07:29Z|
+|2|Require the fixed AFW source and first attempt|completed/success|2026-11-14T15:07:29Z|2026-11-14T15:07:29Z|
+|3|Checkout this exact revision|completed/success|2026-11-14T15:07:29Z|2026-11-14T15:07:34Z|
+|4|Use Node 22|completed/success|2026-11-14T15:07:34Z|2026-11-14T15:07:38Z|
+|5|Preserve the four immutable Source helper bodies|completed/success|2026-11-14T15:07:38Z|2026-11-14T15:07:38Z|
+|6|Materialize current Source-bound suite programs before import|completed/success|2026-11-14T15:07:38Z|2026-11-14T15:07:38Z|
+|7|Install the locked fixture dependencies|completed/success|2026-11-14T15:07:38Z|2026-11-14T15:07:50Z|
+|8|Validate decoded key scope before any orchestration|completed/success|2026-11-14T15:07:50Z|2026-11-14T15:07:50Z|
+|9|Check fixed fixture syntax, lint, inactive module and eight contracts|completed/success|2026-11-14T15:07:50Z|2026-11-14T15:07:57Z|
+|10|Execute all fixed preparation controls once without I0|completed/success|2026-11-14T15:07:57Z|2026-11-14T15:08:01Z|
+|11|Strict three-profile preflight with safe failure DTO|completed/success|2026-11-14T15:08:01Z|2026-11-14T15:08:08Z|
+|12|Seal a closed pure evidence directory|completed/success|2026-11-14T15:08:08Z|2026-11-14T15:08:08Z|
+|13|Upload finite-budget-pure only|completed/success|2026-11-14T15:08:08Z|2026-11-14T15:08:09Z|
+|14|Download pure_receipt by exact ID attempt 1|completed/success|2026-11-14T15:08:09Z|2026-11-14T15:08:09Z|
+|15|Wait 2s before pure_receipt retrieval 2|completed/skipped|2026-11-14T15:08:09Z|2026-11-14T15:08:09Z|
+|16|Download pure_receipt by exact ID attempt 2|completed/skipped|2026-11-14T15:08:09Z|2026-11-14T15:08:09Z|
+|17|Wait 5s before pure_receipt retrieval 3|completed/skipped|2026-11-14T15:08:09Z|2026-11-14T15:08:09Z|
+|18|Download pure_receipt by exact ID attempt 3|completed/skipped|2026-11-14T15:08:09Z|2026-11-14T15:08:09Z|
+|19|Verify exact same-ID pure inventory|completed/success|2026-11-14T15:08:09Z|2026-11-14T15:08:09Z|
+|20|Print verified closed profile diagnostic|completed/success|2026-11-14T15:08:09Z|2026-11-14T15:08:09Z|
+|21|Require all covering profiles and retained readback|completed/success|2026-11-14T15:08:09Z|2026-11-14T15:08:09Z|
+|41|Post Use Node 22|completed/success|2026-11-14T15:08:09Z|2026-11-14T15:08:09Z|
+|42|Post Checkout this exact revision|completed/success|2026-11-14T15:08:09Z|2026-11-14T15:08:10Z|
+|43|Complete job|completed/success|2026-11-14T15:08:10Z|2026-11-14T15:08:10Z|
+
+
+#### positive_prepare — current API step metadata
+
+|Step|Exact name|Status/conclusion|Started UTC|Completed UTC|
+|---:|---|---|---|---|
+|1|Set up job|completed/success|2026-11-14T15:08:17Z|2026-11-14T15:08:18Z|
+|2|Require fixed scope before any native work|completed/success|2026-11-14T15:08:18Z|2026-11-14T15:08:18Z|
+|3|Run actions/checkout@v4|completed/success|2026-11-14T15:08:18Z|2026-11-14T15:08:20Z|
+|4|Run actions/setup-node@v4|completed/success|2026-11-14T15:08:20Z|2026-11-14T15:08:20Z|
+|5|Materialize current Source-bound suite programs before import|completed/success|2026-11-14T15:08:20Z|2026-11-14T15:08:20Z|
+|6|Install exact lock without custody key|completed/success|2026-11-14T15:08:20Z|2026-11-14T15:08:37Z|
+|7|Generic custody key-preflight|completed/success|2026-11-14T15:08:37Z|2026-11-14T15:08:37Z|
+|8|Download exact contracts artifact|completed/success|2026-11-14T15:08:37Z|2026-11-14T15:08:38Z|
+|9|Verify prior pure inventory and select fixed graph profile|completed/success|2026-11-14T15:08:38Z|2026-11-14T15:08:39Z|
+|10|Execute fixed positive_prepare once|completed/success|2026-11-14T15:08:39Z|2026-11-14T15:21:41Z|
+|11|Prepare complete private inventory and legacy manifest without key|completed/success|2026-11-14T15:21:41Z|2026-11-14T15:21:41Z|
+|12|Generic custody seal|completed/success|2026-11-14T15:21:41Z|2026-11-14T15:21:53Z|
+|13|Upload encrypted envelope and closed receipts only|completed/success|2026-11-14T15:21:53Z|2026-11-14T15:21:55Z|
+|14|Validate own assigned metadata and raw ZIP3 without key|completed/success|2026-11-14T15:21:55Z|2026-11-14T15:21:57Z|
+|15|Generic custody own open|completed/success|2026-11-14T15:21:57Z|2026-11-14T15:22:05Z|
+|16|Validate own original manifest and World semantics without key|completed/success|2026-11-14T15:22:05Z|2026-11-14T15:22:06Z|
+|17|Publish bounded stage observations before original truth assertions|completed/success|2026-11-14T15:22:06Z|2026-11-14T15:22:06Z|
+|18|Upload fixed positive_prepare diagnostic pair only|completed/success|2026-11-14T15:22:06Z|2026-11-14T15:22:07Z|
+|19|Preserve actual command and custody outcome|completed/success|2026-11-14T15:22:07Z|2026-11-14T15:22:07Z|
+|37|Post Run actions/setup-node@v4|completed/success|2026-11-14T15:22:07Z|2026-11-14T15:22:07Z|
+|38|Post Run actions/checkout@v4|completed/success|2026-11-14T15:22:07Z|2026-11-14T15:22:07Z|
+|39|Complete job|completed/success|2026-11-14T15:22:07Z|2026-11-14T15:22:07Z|
+
+
+#### positive_consume — current API step metadata
+
+|Step|Exact name|Status/conclusion|Started UTC|Completed UTC|
+|---:|---|---|---|---|
+|1|Set up job|completed/success|2026-11-14T15:22:14Z|2026-11-14T15:22:15Z|
+|2|Require fixed scope before any native work|completed/success|2026-11-14T15:22:15Z|2026-11-14T15:22:15Z|
+|3|Run actions/checkout@v4|completed/success|2026-11-14T15:22:15Z|2026-11-14T15:22:17Z|
+|4|Run actions/setup-node@v4|completed/success|2026-11-14T15:22:17Z|2026-11-14T15:22:18Z|
+|5|Materialize current Source-bound suite programs before import|completed/success|2026-11-14T15:22:18Z|2026-11-14T15:22:18Z|
+|6|Install exact lock without custody key|completed/success|2026-11-14T15:22:18Z|2026-11-14T15:22:28Z|
+|7|Generic custody key-preflight|completed/success|2026-11-14T15:22:28Z|2026-11-14T15:22:28Z|
+|8|Download exact contracts artifact|completed/success|2026-11-14T15:22:28Z|2026-11-14T15:22:29Z|
+|9|Verify prior pure inventory and select fixed graph profile|completed/success|2026-11-14T15:22:29Z|2026-11-14T15:22:30Z|
+|10|Validate assigned producer metadata and raw ZIP3 without key|completed/success|2026-11-14T15:22:30Z|2026-11-14T15:22:32Z|
+|11|Generic custody producer open|completed/success|2026-11-14T15:22:32Z|2026-11-14T15:22:35Z|
+|12|Validate original producer World semantics without key|completed/success|2026-11-14T15:22:35Z|2026-11-14T15:22:36Z|
+|13|Execute fixed positive_consume once|completed/success|2026-11-14T15:22:36Z|2026-11-14T15:23:47Z|
+|14|Prepare complete private inventory and legacy manifest without key|completed/success|2026-11-14T15:23:47Z|2026-11-14T15:23:49Z|
+|15|Generic custody seal|completed/success|2026-11-14T15:23:49Z|2026-11-14T15:23:54Z|
+|16|Upload encrypted envelope and closed receipts only|completed/success|2026-11-14T15:23:54Z|2026-11-14T15:23:55Z|
+|17|Validate own assigned metadata and raw ZIP3 without key|completed/success|2026-11-14T15:23:55Z|2026-11-14T15:23:57Z|
+|18|Generic custody own open|completed/success|2026-11-14T15:23:57Z|2026-11-14T15:24:00Z|
+|19|Validate own original manifest and World semantics without key|completed/success|2026-11-14T15:24:00Z|2026-11-14T15:24:00Z|
+|20|Preserve actual command and custody outcome|completed/success|2026-11-14T15:24:00Z|2026-11-14T15:24:00Z|
+|39|Post Run actions/setup-node@v4|completed/success|2026-11-14T15:24:00Z|2026-11-14T15:24:01Z|
+|40|Post Run actions/checkout@v4|completed/success|2026-11-14T15:24:01Z|2026-11-14T15:24:01Z|
+|41|Complete job|completed/success|2026-11-14T15:24:01Z|2026-11-14T15:24:01Z|
+
+
+#### reduction_prepare — current API step metadata
+
+|Step|Exact name|Status/conclusion|Started UTC|Completed UTC|
+|---:|---|---|---|---|
+|1|Set up job|completed/success|2026-11-14T15:08:16Z|2026-11-14T15:08:17Z|
+|2|Require fixed scope before any native work|completed/success|2026-11-14T15:08:17Z|2026-11-14T15:08:17Z|
+|3|Run actions/checkout@v4|completed/success|2026-11-14T15:08:17Z|2026-11-14T15:08:19Z|
+|4|Run actions/setup-node@v4|completed/success|2026-11-14T15:08:19Z|2026-11-14T15:08:20Z|
+|5|Materialize current Source-bound suite programs before import|completed/success|2026-11-14T15:08:20Z|2026-11-14T15:08:20Z|
+|6|Install exact lock without custody key|completed/success|2026-11-14T15:08:20Z|2026-11-14T15:08:34Z|
+|7|Generic custody key-preflight|completed/success|2026-11-14T15:08:34Z|2026-11-14T15:08:34Z|
+|8|Download exact contracts artifact|completed/success|2026-11-14T15:08:34Z|2026-11-14T15:08:35Z|
+|9|Verify prior pure inventory and select fixed graph profile|completed/success|2026-11-14T15:08:35Z|2026-11-14T15:08:35Z|
+|10|Execute fixed reduction_prepare once|completed/success|2026-11-14T15:08:35Z|2026-11-14T15:21:37Z|
+|11|Prepare complete private inventory and legacy manifest without key|completed/success|2026-11-14T15:21:37Z|2026-11-14T15:21:38Z|
+|12|Generic custody seal|completed/success|2026-11-14T15:21:38Z|2026-11-14T15:21:47Z|
+|13|Upload encrypted envelope and closed receipts only|completed/success|2026-11-14T15:21:47Z|2026-11-14T15:21:49Z|
+|14|Validate own assigned metadata and raw ZIP3 without key|completed/success|2026-11-14T15:21:49Z|2026-11-14T15:21:50Z|
+|15|Generic custody own open|completed/success|2026-11-14T15:21:50Z|2026-11-14T15:21:56Z|
+|16|Validate own original manifest and World semantics without key|completed/success|2026-11-14T15:21:56Z|2026-11-14T15:21:57Z|
+|17|Publish bounded stage observations before original truth assertions|completed/success|2026-11-14T15:21:57Z|2026-11-14T15:21:57Z|
+|18|Upload fixed reduction_prepare diagnostic pair only|completed/success|2026-11-14T15:21:57Z|2026-11-14T15:21:58Z|
+|19|Preserve actual command and custody outcome|completed/success|2026-11-14T15:21:58Z|2026-11-14T15:21:58Z|
+|37|Post Run actions/setup-node@v4|completed/success|2026-11-14T15:21:58Z|2026-11-14T15:21:58Z|
+|38|Post Run actions/checkout@v4|completed/success|2026-11-14T15:21:58Z|2026-11-14T15:21:58Z|
+|39|Complete job|completed/success|2026-11-14T15:21:58Z|2026-11-14T15:21:58Z|
+
+
+#### reduction_consume_a — current API step metadata
+
+|Step|Exact name|Status/conclusion|Started UTC|Completed UTC|
+|---:|---|---|---|---|
+|1|Set up job|completed/success|2026-11-14T15:22:05Z|2026-11-14T15:22:08Z|
+|2|Require fixed scope before any native work|completed/success|2026-11-14T15:22:08Z|2026-11-14T15:22:08Z|
+|3|Run actions/checkout@v4|completed/success|2026-11-14T15:22:08Z|2026-11-14T15:22:13Z|
+|4|Run actions/setup-node@v4|completed/success|2026-11-14T15:22:13Z|2026-11-14T15:22:16Z|
+|5|Materialize current Source-bound suite programs before import|completed/success|2026-11-14T15:22:16Z|2026-11-14T15:22:16Z|
+|6|Install exact lock without custody key|completed/success|2026-11-14T15:22:16Z|2026-11-14T15:22:28Z|
+|7|Generic custody key-preflight|completed/success|2026-11-14T15:22:28Z|2026-11-14T15:22:28Z|
+|8|Download exact contracts artifact|completed/success|2026-11-14T15:22:28Z|2026-11-14T15:22:29Z|
+|9|Verify prior pure inventory and select fixed graph profile|completed/success|2026-11-14T15:22:29Z|2026-11-14T15:22:30Z|
+|10|Validate assigned producer metadata and raw ZIP3 without key|completed/success|2026-11-14T15:22:30Z|2026-11-14T15:22:31Z|
+|11|Generic custody producer open|completed/success|2026-11-14T15:22:31Z|2026-11-14T15:22:37Z|
+|12|Validate original producer World semantics without key|completed/success|2026-11-14T15:22:37Z|2026-11-14T15:22:37Z|
+|13|Execute fixed reduction_consume_a once|completed/success|2026-11-14T15:22:37Z|2026-11-14T15:23:46Z|
+|14|Prepare complete private inventory and legacy manifest without key|completed/success|2026-11-14T15:23:46Z|2026-11-14T15:23:47Z|
+|15|Generic custody seal|completed/success|2026-11-14T15:23:47Z|2026-11-14T15:23:57Z|
+|16|Upload encrypted envelope and closed receipts only|completed/success|2026-11-14T15:23:57Z|2026-11-14T15:23:59Z|
+|17|Validate own assigned metadata and raw ZIP3 without key|completed/success|2026-11-14T15:23:59Z|2026-11-14T15:24:00Z|
+|18|Generic custody own open|completed/success|2026-11-14T15:24:00Z|2026-11-14T15:24:08Z|
+|19|Validate own original manifest and World semantics without key|completed/success|2026-11-14T15:24:08Z|2026-11-14T15:24:08Z|
+|20|Preserve actual command and custody outcome|completed/success|2026-11-14T15:24:08Z|2026-11-14T15:24:08Z|
+|39|Post Run actions/setup-node@v4|completed/success|2026-11-14T15:24:08Z|2026-11-14T15:24:08Z|
+|40|Post Run actions/checkout@v4|completed/success|2026-11-14T15:24:08Z|2026-11-14T15:24:08Z|
+|41|Complete job|completed/success|2026-11-14T15:24:08Z|2026-11-14T15:24:08Z|
+
+
+#### readonly — current API step metadata
+
+|Step|Exact name|Status/conclusion|Started UTC|Completed UTC|
+|---:|---|---|---|---|
+|1|Set up job|completed/success|2026-11-14T15:08:16Z|2026-11-14T15:08:17Z|
+|2|Require fixed scope before any native work|completed/success|2026-11-14T15:08:17Z|2026-11-14T15:08:17Z|
+|3|Run actions/checkout@v4|completed/success|2026-11-14T15:08:17Z|2026-11-14T15:08:19Z|
+|4|Run actions/setup-node@v4|completed/success|2026-11-14T15:08:19Z|2026-11-14T15:08:20Z|
+|5|Materialize current Source-bound suite programs before import|completed/success|2026-11-14T15:08:20Z|2026-11-14T15:08:20Z|
+|6|Install exact lock without custody key|completed/success|2026-11-14T15:08:20Z|2026-11-14T15:08:32Z|
+|7|Generic custody key-preflight|completed/success|2026-11-14T15:08:32Z|2026-11-14T15:08:32Z|
+|8|Download exact contracts artifact|completed/success|2026-11-14T15:08:32Z|2026-11-14T15:08:33Z|
+|9|Verify prior pure inventory and select fixed graph profile|completed/success|2026-11-14T15:08:33Z|2026-11-14T15:08:34Z|
+|10|Execute fixed readonly once|completed/success|2026-11-14T15:08:34Z|2026-11-14T15:11:16Z|
+|11|Prepare complete private inventory and legacy manifest without key|completed/success|2026-11-14T15:11:16Z|2026-11-14T15:11:20Z|
+|12|Generic custody seal|completed/failure|2026-11-14T15:11:20Z|2026-11-14T15:11:20Z|
+|13|Upload encrypted envelope and closed receipts only|completed/skipped|2026-11-14T15:11:20Z|2026-11-14T15:11:20Z|
+|14|Validate own assigned metadata and raw ZIP3 without key|completed/skipped|2026-11-14T15:11:20Z|2026-11-14T15:11:20Z|
+|15|Generic custody own open|completed/skipped|2026-11-14T15:11:20Z|2026-11-14T15:11:20Z|
+|16|Validate own original manifest and World semantics without key|completed/skipped|2026-11-14T15:11:20Z|2026-11-14T15:11:20Z|
+|17|Publish bounded stage observations before original truth assertions|completed/success|2026-11-14T15:11:20Z|2026-11-14T15:11:20Z|
+|18|Upload fixed readonly diagnostic pair only|completed/success|2026-11-14T15:11:20Z|2026-11-14T15:11:21Z|
+|19|Preserve actual command and custody outcome|completed/failure|2026-11-14T15:11:21Z|2026-11-14T15:11:21Z|
+|37|Post Run actions/setup-node@v4|completed/skipped|2026-11-14T15:11:21Z|2026-11-14T15:11:21Z|
+|38|Post Run actions/checkout@v4|completed/success|2026-11-14T15:11:21Z|2026-11-14T15:11:21Z|
+|39|Complete job|completed/success|2026-11-14T15:11:21Z|2026-11-14T15:11:21Z|
+
+
+#### reduction_consume_b — current API step metadata
+
+GitHub returned an empty steps array for this explicitly completed/skipped job.
+
+
+#### verify — current API step metadata
+
+|Step|Exact name|Status/conclusion|Started UTC|Completed UTC|
+|---:|---|---|---|---|
+|1|Set up job|completed/success|2026-11-14T15:24:13Z|2026-11-14T15:24:14Z|
+|2|Run actions/checkout@v4|completed/success|2026-11-14T15:24:14Z|2026-11-14T15:24:16Z|
+|3|Run actions/setup-node@v4|completed/success|2026-11-14T15:24:16Z|2026-11-14T15:24:17Z|
+|4|Materialize current Source-bound suite programs before import|completed/success|2026-11-14T15:24:17Z|2026-11-14T15:24:18Z|
+|5|Verify all seven current direct outputs and the current SAFE pair|completed/failure|2026-11-14T15:24:18Z|2026-11-14T15:24:19Z|
+|6|Project only the three declared diagnostic assignments|completed/success|2026-11-14T15:24:19Z|2026-11-14T15:24:19Z|
+|11|Post Run actions/setup-node@v4|completed/skipped|2026-11-14T15:24:19Z|2026-11-14T15:24:19Z|
+|12|Post Run actions/checkout@v4|completed/success|2026-11-14T15:24:19Z|2026-11-14T15:24:20Z|
+|13|Complete job|completed/success|2026-11-14T15:24:20Z|2026-11-14T15:24:20Z|
+

## Integration surfaces / exact transient sources

PermanentF7restored; transientprograms remainreachableimmutableGitcommits andhashedreporttablesabove. Task1fix1qualificationdc58ab16/F7e4ba3f88: pureQ/S/VandfrozenZ, noWorld/SDK/Native/env/npm invocation. FullimmutableTask1reviewpackagec63076a4/docs/superpowers/reviews/2026-11-13-sanitized-stage-task1-review-package.md containsQ/S/V+changedfiles; no need re-run.
Task2qualificationb07d1b65/F7e3419cde and NativeDATA2c390/F753d97321: samefourNativeA/C/V/Zprograms; A changedonlyassignedPrivate+Worldpin; C onlyWorldpin; V/Zexact. Runtime/helper/Dpinchecks all8bootstraps beforeNative; checkedDbytesrehash beforedataURLimport;3summarypairs/uploads+safeoutputs; finalID-onlyassignmentprojection. FullimmutableTask2packagefde9a7bf/docs/superpowers/reviews/2026-11-14-sanitized-stage-task2-review-package.md includesactualQ/S/V+completeNative2c390diff. A frozenparser/forms+26keys6envactualqualification passed.
Task3c44db8cf/F79614b64c: 8newintentguards/8NODE_OPTIONSshellabsencechecks; allotherNativeDATA2c390bytesunchanged. Its8originalcommands/deps/timeouts/clocks/caps/protocols remain. FullTask3packageede8e598/docs/superpowers/reviews/2026-11-14-sanitized-stage-task3-review-package.md containsfullworkflowdelta+actualRoot13krecord. No wholebusinessproof accepted.

These interfaces needcross-taskreview: earlytrustedcapture→latehelperWorldscopedcatch; fixedsitecatalogWorld+1line; DlegacyownDATAerrorprojection throughqualifiedhelper; NodeTAPreadonlycompoundoutcomevsprivatecodederrors; actualfrozenkeyscope/pins→3summaries/IDprojection; failedproduceroutputunavailability; boundedsamebytesimport/readback/currentcontext; closure/prefix and sourceauthority. Inspect immutableexternalcaller/codeonly for a concrete risk you identify; source files are readable, execution/private logs not allowed.

## Known pending investigation / source boundary

Readonlyrawstepfailureandcustody_limit arecurrentobservations, notexactcause. ExistingD recognizescanonicalAFW failure/normalcodedNodeheaders; it does not exposeTAPpercaseoutcomes orwhichcustodylimit. Metadata/countlogsmissing; cannotinferR1/2/3 orbareNodetestresult. Productstillneedsreadonlydiagnosis/correctiveproof, completeSYNbusiness16, realcloudnotice/review/withdrawal/autoclose andintegratedPCoff. All7flagsfalseevenifSYNlaterpasses. NoCFincident/repair/statusclaimfromthisunit. NoRootGoalcompleteclaim. Any observationhelper limitations orintegrationdefects remainreviewable ontheirmerits, independentlyofpriorreviews.

## Reviews and rulings

Task1reviewRootdocs34307fb3/Task1reviewfile; Task2review03f60ca1; Task3reviewrecordinthisRootdocscommit. LedgerallRulinglines preservedatdocs/superpowers/progress/2026-11-13-sanitized-stage-observations.md; no parkedfindings. No localsddworkspacecreated(cloudGitDBisolationbyownerpreference), no deletion/mainmerge/deploy intendedduringreview. Branchremainsisolatedwhile businessfailure investigated. FinalreviewonlyONCE forwholeunit; oneaggregatefixwave+scopedrereview ifneeded. ReturnclearverdictwithC/I/M file:line andlistbehaviorsdeclinedtojudge+reason; no testsrerun/Sourceexecution/writes/subagents/private downloads.
