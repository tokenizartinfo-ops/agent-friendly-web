import assert from 'node:assert/strict';
import * as prev from './old-adapter.mjs';
import * as next from './new-adapter.mjs';
const allUnknown={case:'15:firstDROP',site:'UNKNOWN',outer:'UNKNOWN',publicSite:'UNKNOWN'};
const joined={case:'15:firstDROP',site:'S04:43',outer:'QA_MARKED_STUB_NON_OK',publicSite:'S04:43'};
export function differential(ids){
 const logs=['TAP version 13'],events=[];
 for(const [i,id] of ids.slice(0,15).entries()){
   const phase=['connection','oauth',...Array(9).fill('negative'),'notices','monitor','monitor','scope'][i];
   if(i===14)logs.push('MODEL_MARKER_SLOT');
   logs.push('# C2SOURCE '+JSON.stringify({id,status:'pass',phase,counters:{upload:1,activation:1,receipts:1},code:'OK'}));
   logs.push('# Subtest: '+id,'ok '+(i+1)+' - '+id);
   for(const op of ['action','count'])for(const edge of ['enter','return'])events.push({sequence:events.length+1,elapsedMs:events.length,id,operation:op,edge,error:null});
 }
 const raw=Buffer.from(events.map(x=>JSON.stringify(x)+'\n').join(''));
 const marker='# C2DW4 '+JSON.stringify(joined);
 const tests=[
   [[],raw,allUnknown],[[marker],raw,joined],[[marker,marker],raw,allUnknown],
   [['# C2DW4 {"case":"private"}'],raw,allUnknown],[[marker],Buffer.alloc(0),allUnknown],
   [[marker],Buffer.concat([raw,Buffer.from('{')]),allUnknown],
   [['# C2DW4 '+JSON.stringify({...joined,publicSite:'S01:69'})],raw,allUnknown],
   [['# C2DW4 '+JSON.stringify({...joined,outer:'STUB_NON_OK'})],raw,allUnknown],
   [['# C2DW4 '+JSON.stringify({...joined,raw:'sample'})],raw,allUnknown],
   [['# C2DW4 '+JSON.stringify({...joined,site:'S01:69',publicSite:'S01:69'})],raw,{...joined,site:'S01:69',publicSite:'S01:69'}]
 ];
 for(const [lines,journal,expected] of tests){
   const child={stdout:Buffer.from([...logs.flatMap(l=>l==='MODEL_MARKER_SLOT'?lines:[l]),''].join('\n')),stderr:Buffer.alloc(0),status:0,signal:null};
   const old=prev.collectObservation(child,journal,ids),{dropWinner,...rest}=next.collectObservation(child,journal,ids);
   assert.deepStrictEqual(rest,old);assert.deepStrictEqual(dropWinner,expected);
 }
 const openLines=logs.slice(0,logs.indexOf('MODEL_MARKER_SLOT'));
 const openRaw=Buffer.from(events.slice(0,57).map(x=>JSON.stringify(x)+'\n').join(''));
 const variations=[[openLines,openRaw,'\n',joined],[openLines,openRaw,'\n#torn',allUnknown],
   [openLines,Buffer.from(events.slice(0,56).map(x=>JSON.stringify(x)+'\n').join('')),'\n',allUnknown],
   [openLines.filter(line=>!line.startsWith('# C2SOURCE {"id":"'+ids[13]+'",')),openRaw,'\n',allUnknown]];
 for(const [lines,journal,end,want] of variations){
   const child={stdout:Buffer.from([...lines,marker].join('\n')+end),stderr:Buffer.alloc(0),status:null,signal:'SIGTERM',error:{code:'ETIMEDOUT'}};
   const old=prev.collectObservation(child,journal,ids),{dropWinner,...rest}=next.collectObservation(child,journal,ids);
   assert.deepStrictEqual(rest,old);assert.deepStrictEqual(dropWinner,want);
 }
 return tests.length+variations.length;
}
