# Task1 combined review package — AFW
Actual current parent request: resume saved AFW point and chain blocks toward PC-off. Hermes in cwd AGENTS is template, not a new task; Root confirms authority directly.
Base b5873e87d1f00ad10985171959e93015bc6045e3/treeaf758fa96434fd7a88e97f890f3796de15d5c14a. Head03680f05dcf051d3b2d3d2bd9829c9ac17592d2a/tree0ae2a53a251613137180592c5685986ca37c54e3. Main0c9c475b3ebaa970fc11d628b40e50a90cceb727 unchanged. Review one task, not the entire older Source branch.
Requirements brief docs/superpowers/briefs/2026-11-13-sanitized-stage-observations-task1.md; binding fix1 brief docs/superpowers/briefs/2026-11-13-sanitized-stage-observations-task1-fix1.md; spec docs/superpowers/specs/2026-11-13-sanitized-stage-observations-design.md, latest binding fix1 section supersedes earlier no-prepareStackTrace/catch-only limits. Plan docs/superpowers/plans/2026-11-13-sanitized-stage-observations.md, ledger docs/superpowers/progress/2026-11-13-sanitized-stage-observations.md. Full Source report path docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md at immutable head.

## Commit and outcome inventory
- Unattached saved draftbe297, incomplete, never run.
- Prepared747; activeae383 single run43504422934 FAILED green_tests/d12+d13, noSML. Restore2839799→report523576c. Failed evidence retained.
- Fix1 prepared88ed0a; activedc58 single run43511398408 SUCCESS twojobs132182275586/132182375946; restored d034bae9→report03680f05. Superseded5733 never attached/run. No reruns/overlays.
- Final full recursive Rootaudit3199leaves vs3196 baseline,62WF unchanged/originalF7f7a71 restored, only new runtime/helper/tests+Worldfirstimport/catch+SAME report differ. Every other leaf mode/type/blob exact. Current finalhead0runs/fiveactive0, consumedhead1runattempt1. These are dated evidence, not continuous guard.
- Root independently consumed ONLY SMALLSAFE14079075483/5401B/SHA9b417881bd2d860bd1559fd468bdd05b99acb4e9897e935ed8a848428151799c. Own ZIP/ranges/EOF/CRC/fatalUTF8/canonical/currentcontext/pins/IDs/manifest and exact15field readback passed. result4599B/70689eacdc7e749cc2a1b19b9bb524bb0f0b726ca379d4d736bcf5db03e94c4b; manifest548B/ff41096ec40042be098152f75bb3d96d601160c60f902aefd8789bbc8ba43eaa.
- Actual fixed42 test families GREEN42/42; all-unknown stub RED42/pass28/fail14 (deliberate stub, not old business failure), ZIP14/role13. NativeError/AssertionError actual accessors qualified; fresh late substitutions/getter/proxy/identical-text closure/globalError/preload refusal covered. Allseven readiness/nonclaim flags false. No World/SDK/Native/business run, provider/runtime/permissions/keys/main publication, owner action or PCoff.

## Important design rulings for calibration
Node22 itself installs Error.prepareStackTrace; blanket rejection caused native tests to fail. Default reference captured synchronously in FIRST trusted World dependency; later rechecked by identity/attributes without override. Controlled startup/no unverified preloads is explicit; arbitrary code BEFORE capture outside guarantee. No name/text whitelist. World first import + catch only, exact original byte reconstruction and +1 line map. Late pure projector verified by Gitblob before same-bytes dataURL import; optional reader is lexical trusted Source function, never error data/public API. Native accessor calls require that reader; data stacks/log projection remain pure. Input context is pinned SYN fixtures, not arbitrary Node programs. Actual World path integration/16case Native remains Task3, not falsely accepted in Task1.
Review privacy/getter/coercion/Node22 compatibility and meaningful test/receiver evidence; do not add a fresh general sandbox or task2feature to this scope. Read once, combined spec+quality verdict; no local Source execution, no tests/reruns, no Source/private/Native/contracts logs/artifacts, no writes/subagents. Name any concrete outside-diff check before doing it.

## Full task diff (including appended report)

```diff
diff --git a/test/fixtures/finite-budget-failure-runtime.mjs b/test/fixtures/finite-budget-failure-runtime.mjs
new file mode 100644
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
```

```diff
diff --git a/test/fixtures/finite-budget-failure-diagnostic.mjs b/test/fixtures/finite-budget-failure-diagnostic.mjs
new file mode 100644
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
```

```diff
diff --git a/test/finite-budget-failure-diagnostic.test.mjs b/test/finite-budget-failure-diagnostic.test.mjs
new file mode 100644
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
```

### World exact scope
```diff
@@ -1,10 +1,11 @@
+import {readNativeStack as readFixedBudgetNativeStack} from './finite-budget-failure-runtime.mjs';
 import assert from 'node:assert/strict';
 import {readFile,writeFile,mkdir,readdir,copyFile,cp,rm} from 'node:fs/promises';
 import {createHash} from 'node:crypto';
 import {AsyncLocalStorage} from 'node:async_hooks';
 import {mkdirSync,writeFileSync} from 'node:fs';
 import {types as fixedNodeTypes} from 'node:util';
 import {resolve,relative,join,dirname} from 'node:path';
 import {pathToFileURL} from 'node:url';
 import ts from 'typescript';
 import {budgetReaderSiteCount} from './finite-budget-diagnostics.mjs';
@@ -1923,21 +1924,21 @@
   else if(command==='prepare-positive')await prepareBudgetProducer('positive',root);
   else if(command==='prepare-reduction')await prepareBudgetProducer('reduction',root);
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
  const built=await build({...options,plugins:[compiler.plugin(replay)]});assert.equal(built.errors.length,0);return {bytes:Buffer.from(built.outputFiles[0].contents),records:compiler.records(),metafile:built.metafile};
 }

```

### SAME report full append range
```diff
@@ -2716,3 +2716,448 @@
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

```

## Transient successful qualification code (restored F7, execution evidence)
F7e4ba3f88/46384B/SHA2a72b5896c95e028fedf41db4ad3a01604d66dbd3665f851bbab962ba3b17210, two fixed push jobs/attempt1/exact commit message/repoID/ref/workflow_ref, three-minute timeouts/read-onlypermissions/Node22.23.4, no AFW secrets/environment/npm/World/Native. All four programs hash-gated before import. Frozen generic Z13305B/b36c40 unchanged, 14 controls; no need re-read it. Q/S/V shown for concrete test/receiver evidence risk; not permanent-source diff.

### Q
```js
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {join} from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import * as S from './afw-diagnostic-receiver.mjs';
import * as Z from './afw-suite-safe-zip.mjs';

const git=args=>execFileSync('git',args,{encoding:'utf8'}).trim();
const blob=bytes=>createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');
let stage='pins',failedIds=[];
async function main(){
 assert.equal(process.versions.node,'22.23.4');assert.equal(process.env.NODE_OPTIONS,undefined);assert.deepEqual(process.execArgv,[]);assert.equal(process.env.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(process.env.GITHUB_JOB,'qualify');assert.equal(process.env.GITHUB_RUN_ATTEMPT,'1');
 const context={repository:process.env.GITHUB_REPOSITORY,repositoryId:process.env.GITHUB_REPOSITORY_ID,ref:process.env.GITHUB_REF,source:process.env.GITHUB_SHA,tree:git(['rev-parse','HEAD^{tree}']),workflowBlob:git(['rev-parse','HEAD:.github/workflows/afw-finite-budget-qualification.yml']),run:process.env.GITHUB_RUN_ID,attempt:Number(process.env.GITHUB_RUN_ATTEMPT),node:process.versions.node};S.validateContext(context);assert.equal(git(['rev-parse','HEAD']),context.source);
 for(const pin of [S.PINS.runtime,S.PINS.helper,S.PINS.tests,S.PINS.world]){const bytes=await readFile(pin.path);assert.equal(bytes.length,pin.bytes);assert.equal(blob(bytes),pin.blob);assert.equal(S.sha(bytes),pin.sha256);}
 assert.equal((await readFile(new URL('./afw-suite-safe-zip.mjs',import.meta.url))).length,13305);
 assert.equal(S.sha(await readFile(new URL('./afw-suite-safe-zip.mjs',import.meta.url))),'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');
 stage='catalog';
 const helperBytes=await readFile(S.PINS.helper.path),D=await import('data:text/javascript;base64,'+helperBytes.toString('base64'));
 const catalogPins=[{"alias":"world","path":"test/fixtures/finite-budget-world.mjs","blob":"0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b"},{"alias":"native","path":"test/mcp-qa-finite-budget-native.test.mjs","blob":"533dafb5df5f8e57442c5b9029dc8dec6dded434"},{"alias":"custody","path":"test/fixtures/finite-checkpoint-custody.mjs","blob":"4d05b5ec0f7b074be88ef9733a47c984b0212351"},{"alias":"persistence","path":"test/fixtures/finite-owner-cleanup-persistence.mjs","blob":"e0dda1fd3d66c1864fd0b20f873c7fc0c452f6d8"},{"alias":"cleanup","path":"lib/mcp-qa-finite-owner-cleanup.mjs","blob":"1a5a2583d266179cdd89f799c64199f29044fec5"},{"alias":"adapter","path":"test/fixtures/finite-owner-cleanup.mjs","blob":"2f5dad6c306fac1be2f11845bef640bb204ad572"}],extraLines={"world":[960,965],"native":[78,83],"custody":[20,22,302,321],"persistence":[72,100,128,131,139,141],"cleanup":[41,42],"adapter":[128,133,134]};
 const catalog=[];for(const pin of catalogPins){let text=(await readFile(pin.path)).toString('utf8');if(pin.alias==='world'){const first="import {readNativeStack as readFixedBudgetNativeStack} from './finite-budget-failure-runtime.mjs';\n",actual=" setImmediate(()=>{main().catch(async error=>{console.error('SYN fixed budget command failed');process.exitCode=1;try{if(process.argv[2]==='prepare-positive'&&process.env.GITHUB_JOB==='positive_prepare'){const bytes=await readFile(new URL('./finite-budget-failure-diagnostic.mjs',import.meta.url));const blob=createHash('sha1').update('blob '+bytes.length+'\\0').update(bytes).digest('hex');if(blob!=='6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f')return;const {projectFixedBudgetFailure}=await import('data:text/javascript;base64,'+bytes.toString('base64'));console.error('AFW_SYN_FAILURE/1 '+JSON.stringify(projectFixedBudgetFailure(error,readFixedBudgetNativeStack)));}}catch{}});});",original=" setImmediate(()=>{main().catch(()=>{console.error('SYN fixed budget command failed');process.exitCode=1;});});";assert(text.startsWith(first));const count=text.split('\n').length;text=text.slice(first.length);assert.equal(text.split(actual).length,2);assert.equal(actual.includes('\n'),false);assert.equal(original.includes('\n'),false);text=text.replace(actual,()=>original);assert.equal(text.split('\n').length,count-1);}assert.equal(blob(Buffer.from(text)),pin.blob);const lines=[...new Set([...text.split('\n').flatMap((line,i)=>/\bassert(?:\.|\s*\()|\bthrow\b/.test(line)?[i+1]:[]),...extraLines[pin.alias]])].map(line=>pin.alias==='world'?line+1:line).sort((a,b)=>a-b);catalog.push({alias:pin.alias,path:pin.path,lines});}assert.deepEqual(D.FIXED_BUDGET_FAILURE_SOURCES,catalog);
 stage='red_tests';
 const directory=join(process.env.RUNNER_TEMP,'afw-diagnostic-task1-red'),fixtures=join(directory,'test','fixtures');await mkdir(fixtures,{recursive:true,mode:0o700});
 const stub="export const projectFixedBudgetFailure=()=>({code:'unknown',site:'unknown'});\nexport const projectFixedBudgetLog=()=>({code:'unknown',site:'unknown'});\n";
 await writeFile(join(fixtures,'finite-budget-failure-diagnostic.mjs'),stub,{flag:'wx',mode:0o600});
 await writeFile(join(fixtures,'finite-budget-failure-runtime.mjs'),await readFile(S.PINS.runtime.path),{flag:'wx',mode:0o600});
 await writeFile(join(directory,'test','finite-budget-failure-diagnostic.test.mjs'),await readFile(S.PINS.tests.path),{flag:'wx',mode:0o600});
 const run=(file,real=false)=>{const child=spawnSync(process.execPath,['--test','--test-reporter=tap',file],{encoding:'utf8',timeout:60000,maxBuffer:1048576});if(real&&typeof child.stdout==='string'){const observed=new Set([...child.stdout.matchAll(/^not ok \d+ - (d\d+_[^\n]+)$/gm)].map(match=>match[1]));failedIds=S.DIAGNOSTIC_IDS.filter(id=>observed.has(id));}assert.equal(child.error,undefined);assert.equal(child.signal,null);assert.equal(child.stderr,'');const counts={exit:child.status};for(const key of ['tests','pass','fail','cancelled','skipped','todo']){const found=[...child.stdout.matchAll(new RegExp('^# '+key+' (\\d+)$','gm'))];assert.equal(found.length,1);counts[key]=Number(found[0][1]);}assert.deepEqual([...child.stdout.matchAll(/^(?:not )?ok \d+ - (d\d+_[^\n]+)$/gm)].map(match=>match[1]),S.DIAGNOSTIC_IDS);return counts;};
 const red=run(join(directory,'test','finite-budget-failure-diagnostic.test.mjs'));assert.equal(red.exit,1);assert(red.fail>0&&red.pass>0);
 stage='green_tests';
 const green=run(S.PINS.tests.path,true);assert.equal(green.exit,0);assert.equal(green.fail,0);assert.equal(green.pass,S.DIAGNOSTIC_IDS.length);
 stage='pins';
 for(const pin of [S.PINS.runtime,S.PINS.helper,S.PINS.tests,S.PINS.world])assert.equal(S.sha(await readFile(pin.path)),pin.sha256);
 stage='zip_controls';
 const zip=await Z.runZipControls();
 stage='receiver_controls';
 const receiver=S.runReceiverControls(context);
 stage='pair';
 const kind=value=>{const descriptor=Object.getOwnPropertyDescriptor(value,'stack');return !descriptor?'absent':Object.hasOwn(descriptor,'value')?'data':'accessor';};
 let assertion;try{assert.equal(1,2,'SYN descriptor fixture');}catch(error){assertion=error;}
 const value={purpose:'afw.sanitized-stage-observations.task1.qualification.syn.v1',role:'independent-zero-afw-key-diagnostic-qualification',context,pins:S.PINS,tests:{red,green},controls:{diagnosticIds:S.DIAGNOSTIC_IDS,zip,receiver},nativeDescriptors:{errorStack:kind(new Error('SYN descriptor fixture')),assertionStack:kind(assertion)},nonclaims:S.NONCLAIMS};
 const files=S.pair(value);S.validatePair(files,context);
 const output=join(process.env.RUNNER_TEMP,'afw-diagnostic-task1-SMALLSAFE');await mkdir(output,{mode:0o700});for(const [name,bytes]of files)await writeFile(join(output,name),bytes,{flag:'wx',mode:0o600});
 console.log('AFW_DIAGNOSTIC_QUALIFIED/1 '+JSON.stringify({tests:green.tests,redFail:red.fail,zip:zip.length,receiver:receiver.length}));
}
main().catch(()=>{console.error('AFW_DIAGNOSTIC_QUALIFICATION_FAILED/1 '+JSON.stringify({stage,failedIds}));process.exitCode=1;});
```

### S
```js
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

export const PINS={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"tests":{"path":"test/finite-budget-failure-diagnostic.test.mjs","bytes":18677,"sha256":"34e802afb65b6f3780e6a20b928d012ab3428f95389107c311345d5b3bd76d1d","blob":"8b1580b5cd46e29da2006ab21921f84cc50e8aec"},"world":{"path":"test/fixtures/finite-budget-world.mjs","bytes":243656,"sha256":"05e50e17420c42f65f8c8c450efc6dd37f9ae429a32a070c9043ab0a50548238","blob":"43aad5bddd844d591572c5868b73697dfd3463f9"},"zip":{"bytes":13305,"sha256":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"}};
export const DIAGNOSTIC_IDS=["d01_exact_system_codes","d02_assertion_data_fields","d03_exact_custody_messages","d04_no_code_prefix_inference","d05_exact_custody_message_only","d06_every_finite_public_site","d07_relative_public_frame","d08_no_free_paths","d09_no_free_line_or_columns","d10_normal_chain_and_ambiguous_frame","d11_message_cannot_forge_frame","d12_real_vm_native_error","d13_real_vm_assertion","d14_getters_never_called","d15_proxy_traps_never_called","d16_revoked_proxy","d17_arbitrary_objects_no_coercion","d18_error_private_fields_ignored","d19_huge_error_stack","d20_long_error_line","d21_canonical_fixed_log","d22_all_log_codes_and_sites","d23_log_secrets_not_echoed","d24_log_closed_schema","d25_log_exact_enum_only","d26_log_duplicate_json_fields","d27_log_ambiguous_or_repeated_markers","d28_log_truncation","d29_log_marker_forgery","d30_log_utf8_byte_limit","d31_log_line_limit","d32_log_count_limit","d33_nonstring_logs_no_coercion","d34_fresh_closed_results","d35_fresh_default_formatter_preserved","d36_fresh_formatter_getter_before_helper","d37_fresh_formatter_proxy_before_helper","d38_fresh_identical_text_different_closure","d39_fresh_global_Error_getter_before_helper","d40_fresh_global_Error_proxy_before_helper","d41_fresh_global_Error_constructor_before_helper","d42_fresh_startup_options_refused"];
export const ZIP_IDS=["zip_valid_store_crc_vector","zip_valid_deflate","zip_signed_unsigned_descriptors","zip_wrong_size","zip_wrong_upload_sha","zip_wrong_metadata_sha","zip_extra_entry","zip_duplicate_entry","zip_traversal_entry","zip_symlink","zip_bad_crc","zip_noncontiguous_ranges","zip_declared_and_inflate_caps","download_stream_redirect_auth_bounds"];
export const RECEIVER_IDS=Object.freeze(['receiver_valid_pair','receiver_noncanonical_json','receiver_duplicate_json_field','receiver_extra_json_file','receiver_result_hash','receiver_wrong_context','receiver_wrong_source_pin','receiver_true_nonclaim','receiver_counts_fail_closed','receiver_unknown_controls','receiver_native_descriptor_closed','receiver_utf8_fatal','receiver_wrong_runtime_pin']);
export const NONCLAIMS=Object.freeze({historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
export const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
export const canonical=value=>Buffer.from(JSON.stringify(value)+'\n');
const same=(a,b)=>assert.deepEqual(a,b);
const fields=(value,keys)=>{assert(value!==null&&typeof value==='object'&&!Array.isArray(value));same(Object.keys(value),keys);};
const statuses=ids=>ids.map(id=>({id,status:'passed'}));
export function validateContext(context){
 fields(context,['repository','repositoryId','ref','source','tree','workflowBlob','run','attempt','node']);
 same(context.repository,'tokenizartinfo-ops/agent-friendly-web');same(context.repositoryId,'1347578006');same(context.ref,'refs/heads/feat/finite-native-cleanup-20261101');
 for(const key of ['source','tree','workflowBlob'])assert.match(context[key],/^[a-f0-9]{40}$/);
 assert.match(context.run,/^[1-9][0-9]*$/);same(context.attempt,1);same(context.node,'22.23.4');
}
function counts(value,red){
 fields(value,['exit','tests','pass','fail','cancelled','skipped','todo']);
 for(const key of Object.keys(value))assert(Number.isSafeInteger(value[key])&&value[key]>=0);
 same(value.tests,DIAGNOSTIC_IDS.length);same(value.pass+value.fail,value.tests);for(const key of ['cancelled','skipped','todo'])same(value[key],0);
 if(red){same(value.exit,1);assert(value.fail>0&&value.pass>0);}else{same(value.exit,0);same(value.pass,value.tests);same(value.fail,0);}
}
function result(value,context){
 fields(value,['purpose','role','context','pins','tests','controls','nativeDescriptors','nonclaims']);
 same(value.purpose,'afw.sanitized-stage-observations.task1.qualification.syn.v1');same(value.role,'independent-zero-afw-key-diagnostic-qualification');
 validateContext(value.context);same(value.context,context);same(value.pins,PINS);
 fields(value.tests,['red','green']);counts(value.tests.red,true);counts(value.tests.green,false);
 fields(value.controls,['diagnosticIds','zip','receiver']);same(value.controls.diagnosticIds,DIAGNOSTIC_IDS);same(value.controls.zip,statuses(ZIP_IDS));same(value.controls.receiver,statuses(RECEIVER_IDS));
 fields(value.nativeDescriptors,['errorStack','assertionStack']);for(const kind of Object.values(value.nativeDescriptors))assert(['data','accessor','absent'].includes(kind));
 same(value.nonclaims,NONCLAIMS);
}
function parse(bytes){
 assert(Buffer.isBuffer(bytes)&&bytes.length>0&&bytes.length<=65536);
 const text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(text).equals(bytes));
 const value=JSON.parse(text);assert(canonical(value).equals(bytes));return value;
}
export function pair(value){
 const bytes=canonical(value),manifest={purpose:'afw.sanitized-stage-observations.task1.manifest.syn.v1',context:value.context,files:[{path:'result.json',bytes:bytes.length,sha256:sha(bytes)}]};
 return new Map([['result.json',bytes],['manifest.json',canonical(manifest)]]);
}
export function validatePair(files,context){
 validateContext(context);assert(files instanceof Map);same([...files.keys()].sort(),['manifest.json','result.json']);assert([...files.values()].reduce((n,b)=>n+b.length,0)<=65536);
 const value=parse(files.get('result.json')),manifest=parse(files.get('manifest.json'));result(value,context);
 fields(manifest,['purpose','context','files']);same(manifest.purpose,'afw.sanitized-stage-observations.task1.manifest.syn.v1');same(manifest.context,context);
 same(manifest.files,[{path:'result.json',bytes:files.get('result.json').length,sha256:sha(files.get('result.json'))}]);
 return value;
}
export function runReceiverControls(context){
 const results=[],record=(id,fn)=>{fn();results.push({id,status:'passed'});},clone=value=>JSON.parse(JSON.stringify(value));
 const fixture={purpose:'afw.sanitized-stage-observations.task1.qualification.syn.v1',role:'independent-zero-afw-key-diagnostic-qualification',context,pins:PINS,tests:{red:{exit:1,tests:DIAGNOSTIC_IDS.length,pass:DIAGNOSTIC_IDS.length-1,fail:1,cancelled:0,skipped:0,todo:0},green:{exit:0,tests:DIAGNOSTIC_IDS.length,pass:DIAGNOSTIC_IDS.length,fail:0,cancelled:0,skipped:0,todo:0}},controls:{diagnosticIds:DIAGNOSTIC_IDS,zip:statuses(ZIP_IDS),receiver:statuses(RECEIVER_IDS)},nativeDescriptors:{errorStack:'accessor',assertionStack:'accessor'},nonclaims:NONCLAIMS};
 const reject=mutate=>{const value=clone(fixture);mutate(value);assert.throws(()=>validatePair(pair(value),context));};
 record(RECEIVER_IDS[0],()=>same(validatePair(pair(fixture),context),fixture));
 record(RECEIVER_IDS[1],()=>{const files=pair(fixture);files.set('result.json',Buffer.from(JSON.stringify(fixture,null,2)+'\n'));assert.throws(()=>validatePair(files,context));});
 record(RECEIVER_IDS[2],()=>{const files=pair(fixture);files.set('result.json',Buffer.from(files.get('result.json').toString().replace('{"purpose":','{"purpose":"duplicate","purpose":')));assert.throws(()=>validatePair(files,context));});
 record(RECEIVER_IDS[3],()=>{const files=pair(fixture);files.set('extra.json',Buffer.from('{}'));assert.throws(()=>validatePair(files,context));});
 record(RECEIVER_IDS[4],()=>{const files=pair(fixture),manifest=JSON.parse(files.get('manifest.json'));manifest.files[0].sha256='a'.repeat(64);files.set('manifest.json',canonical(manifest));assert.throws(()=>validatePair(files,context));});
 record(RECEIVER_IDS[5],()=>reject(value=>{value.context=clone(context);value.context.run=context.run==='1'?'2':'1';}));
 record(RECEIVER_IDS[6],()=>reject(value=>{value.pins=clone(PINS);value.pins.helper.sha256='b'.repeat(64);}));
 record(RECEIVER_IDS[7],()=>reject(value=>{value.nonclaims={...NONCLAIMS,PCoff:true};}));
 record(RECEIVER_IDS[8],()=>reject(value=>{value.tests.green.fail=1;value.tests.green.pass--;}));
 record(RECEIVER_IDS[9],()=>reject(value=>{value.controls.diagnosticIds=[...DIAGNOSTIC_IDS,'unknown_control'];}));
 record(RECEIVER_IDS[10],()=>reject(value=>{value.nativeDescriptors.errorStack='called_getter';}));
 record(RECEIVER_IDS[11],()=>{const files=pair(fixture);files.set('result.json',Buffer.from([0xff]));assert.throws(()=>validatePair(files,context));});
 record(RECEIVER_IDS[12],()=>reject(value=>{value.pins=clone(PINS);value.pins.runtime.sha256='c'.repeat(64);}));
 return results;
}
```

### V
```js
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import * as S from './afw-diagnostic-receiver.mjs';
import * as Z from './afw-suite-safe-zip.mjs';

const git=args=>execFileSync('git',args,{encoding:'utf8'}).trim();
async function main(){
 const env=process.env;assert.equal(process.versions.node,'22.23.4');assert.equal(env.NODE_OPTIONS,undefined);assert.equal(env.GITHUB_JOB,'verify');assert.equal(env.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(env.GITHUB_RUN_ATTEMPT,'1');
 const context={repository:env.GITHUB_REPOSITORY,repositoryId:env.GITHUB_REPOSITORY_ID,ref:env.GITHUB_REF,source:env.GITHUB_SHA,tree:git(['rev-parse','HEAD^{tree}']),workflowBlob:git(['rev-parse','HEAD:.github/workflows/afw-finite-budget-qualification.yml']),run:env.GITHUB_RUN_ID,attempt:Number(env.GITHUB_RUN_ATTEMPT),node:process.versions.node};S.validateContext(context);assert.equal(git(['rev-parse','HEAD']),context.source);assert.equal(env.QUALIFY_RESULT,'success');
 for(const pin of [S.PINS.runtime,S.PINS.helper,S.PINS.tests,S.PINS.world]){const bytes=await readFile(pin.path);assert.equal(bytes.length,pin.bytes);assert.equal(S.sha(bytes),pin.sha256);}
 const zipControls=await Z.runZipControls(),receiverControls=S.runReceiverControls(context);
 const id=env.QUALIFY_ARTIFACT_ID,digest=env.QUALIFY_ARTIFACT_DIGEST,token=env.GH_ARTIFACT_TOKEN;assert.match(id,/^[1-9][0-9]*$/);assert.match(digest,/^[a-f0-9]{64}$/);assert(typeof token==='string'&&token.length>0);
 async function json(path){const response=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web'+path,{redirect:'error',headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(15000)});assert.equal(response.status,200);assert(response.body);const parts=[],reader=response.body.getReader();let size=0;try{for(;;){const item=await reader.read();if(item.done)break;size+=item.value.byteLength;assert(size<=65536);parts.push(Buffer.from(item.value));}}catch(error){try{await reader.cancel();}catch{}throw error;}return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(parts)));}
 const run=await json('/actions/runs/'+context.run);assert.equal(run.id,Number(context.run));assert.equal(run.run_attempt,1);assert.equal(run.head_sha,context.source);assert.equal(run.head_branch,'feat/finite-native-cleanup-20261101');assert.equal(run.event,env.GITHUB_EVENT_NAME);assert.equal(run.path,'.github/workflows/afw-finite-budget-qualification.yml');assert.equal(run.repository.id,1347578006);assert.equal(run.head_repository.id,1347578006);
 const metadata=await json('/actions/artifacts/'+id),name='diagnostic-task1-SMALLSAFE-'+context.source+'-'+context.run;
 assert.equal(metadata.id,Number(id));assert.equal(metadata.name,name);assert.equal(metadata.expired,false);assert.equal(metadata.digest,'sha256:'+digest);assert(Number.isSafeInteger(metadata.size_in_bytes)&&metadata.size_in_bytes>0&&metadata.size_in_bytes<=65536);
 assert.equal(metadata.workflow_run.id,Number(context.run));assert.equal(metadata.workflow_run.repository_id,1347578006);assert.equal(metadata.workflow_run.head_repository_id,1347578006);assert.equal(metadata.workflow_run.head_branch,'feat/finite-native-cleanup-20261101');assert.equal(metadata.workflow_run.head_sha,context.source);
 const created=Date.parse(metadata.created_at),expires=Date.parse(metadata.expires_at);assert(Number.isFinite(created)&&Number.isFinite(expires)&&created<=Date.now()+60000&&expires>Date.now()&&expires-created<=604860000);
 const bytes=await Z.downloadAssignedZip(id,token);assert(bytes.length<=65536);const rawSha=Z.bindRawZip(bytes,metadata.size_in_bytes,digest,metadata.digest),files=Z.decodeSafePair(bytes),value=S.validatePair(files,context);
 assert.equal(zipControls.length,S.ZIP_IDS.length);assert.equal(receiverControls.length,S.RECEIVER_IDS.length);
 console.log('AFW_DIAGNOSTIC_SMALLSAFE/1 '+JSON.stringify({context,artifactId:id,uploadedDigest:digest,metadataSize:metadata.size_in_bytes,rawBytes:bytes.length,rawSha256:rawSha,resultBytes:files.get('result.json').length,resultSha256:S.sha(files.get('result.json')),manifestBytes:files.get('manifest.json').length,manifestSha256:S.sha(files.get('manifest.json')),tests:value.tests,zipControls:zipControls.length,receiverControls:receiverControls.length,nativeDescriptors:value.nativeDescriptors,nonclaims:S.NONCLAIMS}));
}
main().catch(()=>{console.error('AFW_DIAGNOSTIC_RECEIVER_FAILED/1');process.exitCode=1;});
```
