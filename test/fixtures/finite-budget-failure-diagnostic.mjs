import {types} from 'node:util';

// Public source-site IDs are untrusted hints, never authenticated causes.
export const FIXED_BUDGET_FAILURE_CODES=Object.freeze(["unknown","assertion","EEXIST","ENOENT","EACCES","ENOSPC","ETIMEDOUT","custody_format","custody_limit","custody_size","custody_destination","custody_authentication","custody_io","custody_cleanup"]);
export const FIXED_BUDGET_FAILURE_SOURCES=Object.freeze([{"alias":"world","path":"test/fixtures/finite-budget-world.mjs","lines":[49,65,87,91,92,93,96,97,102,108,112,144,171,177,183,184,188,189,190,191,229,233,235,236,237,240,260,277,287,288,294,299,316,320,325,333,352,353,359,392,458,468,469,479,507,570,577,578,612,613,620,644,646,669,670,671,676,677,691,696,698,711,714,715,716,722,725,726,728,732,733,735,741,742,743,745,746,748,751,753,754,755,760,761,769,773,778,804,805,806,808,811,812,814,815,825,830,831,833,834,838,844,852,857,858,864,872,895,902,906,919,925,927,933,938,943,944,945,946,947,955,961,966,971,972,999,1005,1007,1014,1026,1028,1031,1040,1047,1050,1051,1052,1055,1056,1059,1060,1061,1062,1064,1072,1073,1074,1075,1076,1138,1139,1140,1145,1146,1150,1151,1152,1153,1158,1161,1168,1174,1176,1180,1181,1188,1190,1205,1214,1215,1217,1218,1219,1221,1222,1232,1236,1237,1242,1258,1265,1267,1269,1272,1275,1277,1282,1290,1300,1302,1303,1306,1308,1309,1310,1312,1313,1314,1315,1316,1317,1324,1334,1336,1344,1346,1349,1360,1365,1384,1396,1398,1409,1411,1413,1421,1422,1423,1424,1425,1436,1437,1442,1443,1457,1458,1459,1460,1461,1462,1463,1464,1466,1467,1473,1475,1476,1480,1481,1482,1483,1498,1499,1500,1501,1502,1506,1507,1508,1509,1510,1518,1520,1522,1529,1530,1531,1532,1543,1554,1558,1566,1567,1568,1575,1579,1585,1590,1591,1592,1593,1595,1596,1597,1599,1600,1613,1614,1616,1617,1618,1622,1626,1630,1633,1634,1638,1645,1647,1648,1649,1655,1682,1687,1688,1689,1699,1700,1706,1707,1713,1718,1727,1729,1744,1757,1779,1786,1788,1789,1790,1791,1796,1802,1805,1808,1811,1813,1814,1818,1820,1821,1822,1823,1825,1826,1828,1829,1830,1841,1844,1852,1853,1854,1855,1856,1859,1866,1879,1881,1885,1886,1889,1890,1891,1892,1893,1905,1912,1913,1931,1943,1948,1951,1953,1954,1956,1961,1965,1967,1969,1970,1971,1976,1978,1987,1988,1990,1994,1995,1996,1997,1998,1999,2000,2017,2035,2043,2044,2048,2053,2058,2059,2060,2061,2062,2063,2064,2065,2077,2079,2089,2090,2091]},{"alias":"native","path":"test/mcp-qa-finite-budget-native.test.mjs","lines":[11,15,26,29,58,62,77,78,79,80,81,82,83,86,88,89,94,95,96,106,107,108,109,110,111,112,113,115,116,117,118,120,129,130,131,132,133,134,135,136,137,138,139,141,142,143,145]},{"alias":"custody","path":"test/fixtures/finite-checkpoint-custody.mjs","lines":[20,22,51,76,293,302,310,321]},{"alias":"persistence","path":"test/fixtures/finite-owner-cleanup-persistence.mjs","lines":[18,20,25,26,27,28,29,31,32,35,36,37,39,40,41,42,43,45,46,47,48,49,50,52,53,54,55,56,59,64,65,66,71,72,73,78,80,88,90,97,98,100,104,108,113,114,115,121,124,128,131,139,141,145,146,147,151,153,165,166,167,169,174,178,183,188,191,192,193,194,195,199,201,211,212,213,218,220,221,222,223,225,226,227,229,230,237,243,244,251,252,257,261,262,264,265,271,272,295,296,297,298,299,300,301,302,303,304,309,319,321,323,324,325,327,331,372]},{"alias":"cleanup","path":"lib/mcp-qa-finite-owner-cleanup.mjs","lines":[41,42,49,609]},{"alias":"adapter","path":"test/fixtures/finite-owner-cleanup.mjs","lines":[15,19,34,73,96,97,101,104,106,107,108,110,111,112,117,118,119,120,121,122,126,128,133,134,138,144,147,150,153,154,156,157,160,174,178,182,183,184,187,189,193,202,203,204,205,206,208,209,211,212,213,219,220,222,225,231,235,274,290,302,303]}].map(row=>Object.freeze({...row,lines:Object.freeze(row.lines)})));
export const FIXED_BUDGET_FAILURE_SITES=Object.freeze(FIXED_BUDGET_FAILURE_SOURCES.flatMap(source=>source.lines.map(line=>Object.freeze({id:source.alias+'_'+line,alias:source.alias,path:source.path,line}))));
const codes=new Set(FIXED_BUDGET_FAILURE_CODES),sites=new Set(['unknown',...FIXED_BUDGET_FAILURE_SITES.map(row=>row.id)]);
const root='/home/runner/work/agent-friendly-web/agent-friendly-web/';
const locations=new Map(FIXED_BUDGET_FAILURE_SITES.flatMap(row=>[row.path,root+row.path,'file://'+root+row.path].map(path=>[path+':'+row.line,row.id])));
const approvedPaths=new Set(FIXED_BUDGET_FAILURE_SOURCES.flatMap(row=>[row.path,root+row.path,'file://'+root+row.path]));
const basenames=[...new Set(FIXED_BUDGET_FAILURE_SITES.map(row=>row.path.split('/').at(-1)))];
const unavailable=()=>({code:'unknown',site:'unknown'});
function stackValue(error,descriptor,readNativeStack){
 if(!descriptor)return undefined;
 if(Object.hasOwn(descriptor,'value'))return descriptor.value;
 // Decline every lazy representation, without calling even a supplied reader.
 throw null;
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
export function projectFixedBudgetFailure(error,readNativeStack){
 try{
  if(error===null||typeof error!=='object'||types.isProxy(error)||!types.isNativeError(error))return unavailable();
  const descriptors={};
  // Header fields are own DATA strings only. Multiline fields can forge frames.
  for(const key of ['name','message','code']){
   const descriptor=Object.getOwnPropertyDescriptor(error,key);
   if(descriptor&&!Object.hasOwn(descriptor,'value'))return unavailable();
   const value=descriptor?.value;
   if(value!==undefined&&(typeof value!=='string'||!boundedLines(value)||value.includes('\n')||value.includes('\r')))return unavailable();
   descriptors[key]=value;
  }
  const stack=stackValue(error,Object.getOwnPropertyDescriptor(error,'stack'),readNativeStack);
  if(stack!==undefined&&(typeof stack!=='string'||!boundedLines(stack)))return unavailable();
  const {code:rawCode,message}=descriptors;
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
