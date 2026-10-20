import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {summarizeEfficiencyTrial} from './trial-ledger.mjs';
export function buildTrialDemo(){
 const categories=['consumer','afw','persistence','verification','human','recipe'];
 const cases=Array.from({length:5},(_,i)=>({caseRef:'example-case-'+i,variant:'afw',conditionsRef:'example-conditions-'+i,
  outcome:i<2?'accepted':'failed',acceptanceRef:i<2?'example-acceptance-'+i:null}));
 const observations=cases.flatMap((c,i)=>categories.map(category=>({observationRef:'example-'+i+'-'+category,caseRef:c.caseRef,variant:c.variant,
  category,attemptRef:category==='consumer'?'example-attempt-'+i:null,observedAt:'2026-10-20T17:00:00.000Z',
  costMicros:category==='consumer'?10000000:0,costBasis:category==='consumer'?'observed_variable':'not_applicable',
  costRef:category==='consumer'?'fictional-cost-'+i:null,usage:null,usageRef:null})));
 return {synthetic:true,label:'Aritmética ficticia en unidades TST; no es moneda/tarifa aprobada, costo observado ni ahorro medido.',
  summary:summarizeEfficiencyTrial({contract:'afw.efficiency-observations.v1',trialRef:'fictional-trial',currency:'TST',mode:'synthetic',cases,observations})};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))process.stdout.write(JSON.stringify(buildTrialDemo(),null,2)+'\n');
