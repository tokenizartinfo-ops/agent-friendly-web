import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {readObservationSnapshot} from '../lib/observation-read-client.mjs';

test('a failed private read can be retried without invoking an audit or write',async()=>{
 const requests=[];
 const transport=async(url,options)=>{
  requests.push({url,options});
  if(requests.length===1)return new Response('unavailable',{status:503});
  return Response.json({observation:{id:'saved'},history:[{id:'saved',score:0}]});
 };
 await assert.rejects(readObservationSnapshot('owner-project',transport),/observation_read_unavailable/);
 const result=await readObservationSnapshot('owner-project',transport);
 assert.equal(result.observation.id,'saved');
 assert.equal(result.history[0].score,0);
 assert.deepEqual(requests.map(item=>item.options.method),['GET','GET']);
 assert.ok(requests.every(item=>item.options.cache==='no-store'&&item.options.redirect==='error'));
 assert.ok(requests.every(item=>item.url==='/api/projects/owner-project/observations'));
});

test('the private UI exposes a separate read retry instead of reusing the save action',async()=>{
 const source=await readFile('app/components/intake-workspace.tsx','utf8');
 assert.match(source,/readObservationSnapshot\(projectId,request,controller\.signal\)/);
 assert.match(source,/setObservationLoadAttempt\(value=>value\+1\)/);
 assert.match(source,/Reintentar consulta guardada/);
 assert.match(source,/onClick=\{saveObservation\}/);
});
