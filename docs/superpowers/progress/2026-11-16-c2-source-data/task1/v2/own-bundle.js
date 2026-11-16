function c2V2ReadBundle(lines,expected,admitted,readFrame,checkCases){
 if(!Array.isArray(lines)||lines.length!==8)throw Error('C2_V2_BUNDLE_UNQUALIFIED');
 const parsed=lines.map(line=>readFrame(line,expected,admitted,checkCases));
 if(parsed.map(p=>p.kind).join(',')!=='synthetic,dependency,mode,mode,mode,mode,custody,receipt')throw Error('C2_V2_BUNDLE_UNQUALIFIED');
 const receipt=parsed[7].value;
 if(JSON.stringify(parsed.slice(2,6).map(p=>p.value.observation))!==JSON.stringify(receipt.observations))throw Error('C2_V2_BUNDLE_UNQUALIFIED');
 return receipt;
}