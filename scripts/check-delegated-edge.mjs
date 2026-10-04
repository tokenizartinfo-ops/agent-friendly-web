import {checkDelegatedEdge} from '../lib/delegated-edge-health.mjs';
if(process.argv.length!==2)throw Error('This check accepts no URL, credentials or mode override');
const results=[];
for(const service of ['canary','real-pilot'])results.push(await checkDelegatedEdge({service,expected:'closed'}));
console.log(JSON.stringify({ok:results.every(row=>row.ok),results},null,2));
if(results.some(row=>!row.ok))process.exitCode=1;
