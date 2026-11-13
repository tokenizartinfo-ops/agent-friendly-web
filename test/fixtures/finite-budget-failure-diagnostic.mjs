import {types} from 'node:util';
import {AssertionError} from 'node:assert/strict';

// Public source-site IDs are untrusted hints, never authenticated causes.
export const FIXED_BUDGET_FAILURE_CODES=Object.freeze(["unknown","assertion","EEXIST","ENOENT","EACCES","ENOSPC","ETIMEDOUT","custody_format","custody_limit","custody_size","custody_destination","custody_authentication","custody_io","custody_cleanup"]);
export const FIXED_BUDGET_FAILURE_SOURCES=Object.freeze([{"alias":"world","path":"test/fixtures/finite-budget-world.mjs","lines":[48,64,86,90,91,92,95,96,101,107,111,143,170,176,182,183,187,188,189,190,228,232,234,235,236,239,259,276,286,287,293,298,315,319,324,332,351,352,358,391,457,467,468,478,506,569,576,577,611,612,619,643,645,668,669,670,675,676,690,695,697,710,713,714,715,721,724,725,727,731,732,734,740,741,742,744,745,747,750,752,753,754,759,760,768,772,777,803,804,805,807,810,811,813,814,824,829,830,832,833,837,843,851,856,857,863,871,894,901,905,918,924,926,932,937,942,943,944,945,946,954,960,965,970,971,998,1004,1006,1013,1025,1027,1030,1039,1046,1049,1050,1051,1054,1055,1058,1059,1060,1061,1063,1071,1072,1073,1074,1075,1137,1138,1139,1144,1145,1149,1150,1151,1152,1157,1160,1167,1173,1175,1179,1180,1187,1189,1204,1213,1214,1216,1217,1218,1220,1221,1231,1235,1236,1241,1257,1264,1266,1268,1271,1274,1276,1281,1289,1299,1301,1302,1305,1307,1308,1309,1311,1312,1313,1314,1315,1316,1323,1333,1335,1343,1345,1348,1359,1364,1383,1395,1397,1408,1410,1412,1420,1421,1422,1423,1424,1435,1436,1441,1442,1456,1457,1458,1459,1460,1461,1462,1463,1465,1466,1472,1474,1475,1479,1480,1481,1482,1497,1498,1499,1500,1501,1505,1506,1507,1508,1509,1517,1519,1521,1528,1529,1530,1531,1542,1553,1557,1565,1566,1567,1574,1578,1584,1589,1590,1591,1592,1594,1595,1596,1598,1599,1612,1613,1615,1616,1617,1621,1625,1629,1632,1633,1637,1644,1646,1647,1648,1654,1681,1686,1687,1688,1698,1699,1705,1706,1712,1717,1726,1728,1743,1756,1778,1785,1787,1788,1789,1790,1795,1801,1804,1807,1810,1812,1813,1817,1819,1820,1821,1822,1824,1825,1827,1828,1829,1840,1843,1851,1852,1853,1854,1855,1858,1865,1878,1880,1884,1885,1888,1889,1890,1891,1892,1904,1911,1912,1930,1942,1947,1950,1952,1953,1955,1960,1964,1966,1968,1969,1970,1975,1977,1986,1987,1989,1993,1994,1995,1996,1997,1998,1999,2016,2034,2042,2043,2047,2052,2057,2058,2059,2060,2061,2062,2063,2064,2076,2078,2088,2089,2090]},{"alias":"native","path":"test/mcp-qa-finite-budget-native.test.mjs","lines":[11,15,26,29,58,62,77,78,79,80,81,82,83,86,88,89,94,95,96,106,107,108,109,110,111,112,113,115,116,117,118,120,129,130,131,132,133,134,135,136,137,138,139,141,142,143,145]},{"alias":"custody","path":"test/fixtures/finite-checkpoint-custody.mjs","lines":[20,22,51,76,293,302,310,321]},{"alias":"persistence","path":"test/fixtures/finite-owner-cleanup-persistence.mjs","lines":[18,20,25,26,27,28,29,31,32,35,36,37,39,40,41,42,43,45,46,47,48,49,50,52,53,54,55,56,59,64,65,66,71,72,73,78,80,88,90,97,98,100,104,108,113,114,115,121,124,128,131,139,141,145,146,147,151,153,165,166,167,169,174,178,183,188,191,192,193,194,195,199,201,211,212,213,218,220,221,222,223,225,226,227,229,230,237,243,244,251,252,257,261,262,264,265,271,272,295,296,297,298,299,300,301,302,303,304,309,319,321,323,324,325,327,331,372]},{"alias":"cleanup","path":"lib/mcp-qa-finite-owner-cleanup.mjs","lines":[41,42,49,609]},{"alias":"adapter","path":"test/fixtures/finite-owner-cleanup.mjs","lines":[15,19,34,73,96,97,101,104,106,107,108,110,111,112,117,118,119,120,121,122,126,128,133,134,138,144,147,150,153,154,156,157,160,174,178,182,183,184,187,189,193,202,203,204,205,206,208,209,211,212,213,219,220,222,225,231,235,274,290,302,303]}].map(row=>Object.freeze({...row,lines:Object.freeze(row.lines)})));
export const FIXED_BUDGET_FAILURE_SITES=Object.freeze(FIXED_BUDGET_FAILURE_SOURCES.flatMap(source=>source.lines.map(line=>Object.freeze({id:source.alias+'_'+line,alias:source.alias,path:source.path,line}))));
const codes=new Set(FIXED_BUDGET_FAILURE_CODES),sites=new Set(['unknown',...FIXED_BUDGET_FAILURE_SITES.map(row=>row.id)]);
const root='/home/runner/work/agent-friendly-web/agent-friendly-web/';
const locations=new Map(FIXED_BUDGET_FAILURE_SITES.flatMap(row=>[row.path,root+row.path,'file://'+root+row.path].map(path=>[path+':'+row.line,row.id])));
const approvedPaths=new Set(FIXED_BUDGET_FAILURE_SOURCES.flatMap(row=>[row.path,root+row.path,'file://'+root+row.path]));
const basenames=[...new Set(FIXED_BUDGET_FAILURE_SITES.map(row=>row.path.split('/').at(-1)))];
const unavailable=()=>({code:'unknown',site:'unknown'});
const errorConstructor=Error,errorPrototype=Error.prototype,assertionPrototype=AssertionError.prototype,objectPrototype=Object.prototype;
const nativeStack=Object.getOwnPropertyDescriptor(new Error(),'stack');
const errorToString=Object.getOwnPropertyDescriptor(errorPrototype,'toString')?.value;
const assertionToString=Object.getOwnPropertyDescriptor(assertionPrototype,'toString');
const objectToString=Object.getOwnPropertyDescriptor(objectPrototype,'toString')?.value;
function safeNativeFormatting(error){
 if(Object.getPrototypeOf(error)!==errorPrototype&&Object.getPrototypeOf(error)!==assertionPrototype)return false;
 if(Object.getPrototypeOf(assertionPrototype)!==errorPrototype||Object.getPrototypeOf(errorPrototype)!==objectPrototype)return false;
 for(let cursor=error;cursor!==null;cursor=Object.getPrototypeOf(cursor)){
  if(types.isProxy(cursor))return false;
  for(const key of ['name','message']){const descriptor=Object.getOwnPropertyDescriptor(cursor,key);if(descriptor&&(!Object.hasOwn(descriptor,'value')||typeof descriptor.value!=='string'||!boundedLines(descriptor.value)))return false;}
  if(Object.getOwnPropertyDescriptor(cursor,Symbol.toStringTag))return false;
  const constructor=Object.getOwnPropertyDescriptor(cursor,'constructor');
  if(cursor===error&&constructor)return false;
  if(cursor!==error&&constructor&&(!Object.hasOwn(constructor,'value')||constructor.value!==(cursor===errorPrototype?errorConstructor:cursor===assertionPrototype?AssertionError:Object)))return false;
  const formatting=Object.getOwnPropertyDescriptor(cursor,'toString');
  if(cursor===error&&formatting)return false;
  if(cursor===errorPrototype&&(!formatting||formatting.value!==errorToString||!Object.hasOwn(formatting,'value')))return false;
  if(cursor===assertionPrototype&&(formatting?.value!==assertionToString?.value||!!formatting!==!!assertionToString||(formatting&&!Object.hasOwn(formatting,'value'))))return false;
  if(cursor===objectPrototype&&(!formatting||formatting.value!==objectToString||!Object.hasOwn(formatting,'value')))return false;
 }
 for(let cursor=errorConstructor;cursor!==null;cursor=Object.getPrototypeOf(cursor)){
  if(types.isProxy(cursor)||Object.getOwnPropertyDescriptor(cursor,'prepareStackTrace'))return false;
 }
 return true;
}
function stackValue(error,descriptor){
 if(!descriptor)return undefined;
 if(Object.hasOwn(descriptor,'value'))return descriptor.value;
 if(!nativeStack||typeof nativeStack.get!=='function'||descriptor.get!==nativeStack.get||descriptor.set!==nativeStack.set||!safeNativeFormatting(error))throw null;
 return Reflect.apply(nativeStack.get,error,[]);
}
function boundedLines(text){
 if(typeof text!=='string'||text.length>65536||Buffer.byteLength(text,'utf8')>65536)return null;
 const lines=text.split('\n');if(lines.at(-1)==='')lines.pop();
 if(lines.length>4096||lines.some(line=>line.length>1024||Buffer.byteLength(line,'utf8')>1024||line.includes('\r')))return null;
 return lines;
}
function sourceSite(stack){
 const lines=boundedLines(stack);if(!lines||!lines.length||/^ {4}at /.test(lines[0]))return 'unknown';
 for(const line of lines.slice(1)){
  if(!/^ {4}at /.test(line))continue;
  const match=/^ {4}at (?:async )?(?:new )?(?:(?:[A-Za-z0-9_$.[\]<>]+) \(([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3})\)|([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3}))$/.exec(line);
  if(!match){if(basenames.some(name=>line.includes(name)))return 'unknown';continue;}
  const path=match[1]??match[4],number=match[2]??match[5],site=locations.get(path+':'+number);
  if(site)return site;
  if(!approvedPaths.has(path)&&basenames.some(name=>path.includes(name)))return 'unknown';
 }
 return 'unknown';
}
export function projectFixedBudgetFailure(error){
 try{
  if(error===null||typeof error!=='object'||types.isProxy(error)||!types.isNativeError(error))return unavailable();
  const descriptors={};for(const key of ['code','message','stack']){
   const descriptor=Object.getOwnPropertyDescriptor(error,key);
   if(key==='stack'){descriptors[key]=stackValue(error,descriptor);continue;}
   if(descriptor&&!Object.hasOwn(descriptor,'value'))return unavailable();
   descriptors[key]=descriptor?.value;
   if(descriptors[key]!==undefined&&!boundedLines(descriptors[key]))return unavailable();
  }
  const {code:rawCode,message,stack}=descriptors;
  if((rawCode!==undefined&&typeof rawCode!=='string')||(message!==undefined&&typeof message!=='string')||(stack!==undefined&&typeof stack!=='string'))return unavailable();
  if([rawCode,message,stack].some(value=>value!==undefined&&!boundedLines(value)))return unavailable();
  let code='unknown';
  if(rawCode==='ERR_ASSERTION')code='assertion';
  else if(['EEXIST','ENOENT','EACCES','ENOSPC','ETIMEDOUT'].includes(rawCode))code=rawCode;
  else if(['custody_format','custody_limit','custody_size','custody_destination','custody_authentication','custody_io','custody_cleanup'].includes(message))code=message;
  return {code,site:stack===undefined?'unknown':sourceSite(stack)};
 }catch{return unavailable();}
}
export function projectFixedBudgetLog(text){
 try{
  const lines=boundedLines(text);if(!lines||!text.endsWith('\n'))return unavailable();
  const markers=lines.filter(line=>line.includes('AFW_SYN_FAILURE/1'));
  if(markers.length!==1||!markers[0].startsWith('AFW_SYN_FAILURE/1 '))return unavailable();
  const source=markers[0].slice('AFW_SYN_FAILURE/1 '.length),value=JSON.parse(source);
  if(value===null||typeof value!=='object'||Array.isArray(value)||JSON.stringify(Object.keys(value))!=='["code","site"]'||JSON.stringify(value)!==source)return unavailable();
  if(!codes.has(value.code)||!sites.has(value.site))return unavailable();
  return {code:value.code,site:value.site};
 }catch{return unavailable();}
}
