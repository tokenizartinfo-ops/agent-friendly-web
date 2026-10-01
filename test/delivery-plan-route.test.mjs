import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { readBoundedJsonBody } from '../lib/bounded-json-body.mjs';

function harness() {
  let actor={userId:'owner'},saves=0;
  const schema={siteProjects:{id:'project_id',userId:'user_id'},publicationCapsules:{id:'capsule_id',projectId:'project_id'}};
  const rows={project_id:[{id:'p',userId:'owner'}],capsule_id:[{id:'c',projectId:'p'}]};
  const getDb=()=>({select:()=>({from:table=>({where:conditions=>({limit:async()=>rows[table.id].filter(row=>conditions.every(([field,value])=>row[{project_id:table===schema.siteProjects?'id':'projectId',user_id:'userId',capsule_id:'id'}[field]]===value))})})})});
  const imports={
    'cloudflare:workers':{env:{DB:{}}},'drizzle-orm':{and:(...conditions)=>conditions,eq:(field,value)=>[field,value]},
    '../../../../../../cloudflare-access-auth':{getCloudflareAccessUser:async()=>actor},
    '../../../../../../../db':{getDb},'../../../../../../../db/schema':schema,
    '../../../../../../../lib/bounded-json-body.mjs':{readBoundedJsonBody},
    '../../../../../../../lib/delivery-plan.mjs':{readDeliveryPlan:async()=>null,saveDeliveryPlan:async()=>{saves++;return {status:200,plan:{revision:1}};}},
  };
  const code=ts.transpileModule(readFileSync('app/api/projects/[projectId]/deployment-capsules/[capsuleId]/delivery-plan/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  const exports={};
  vm.runInNewContext(code,{exports,require:name=>{assert.ok(imports[name],name);return imports[name];},Response,URL});
  const request=(method,body={},options={})=>exports[method](new Request('https://agentfriendlyweb.dev/api/projects/p/deployment-capsules/c/delivery-plan',method==='PUT'?{method,headers:{origin:'https://agentfriendlyweb.dev','content-type':'application/json',...options.headers},body:JSON.stringify(body)}:{}),{params:Promise.resolve({projectId:options.projectId||'p',capsuleId:options.capsuleId||'c'})});
  return {request,actor:value=>{actor=value;},saves:()=>saves};
}
test('plan route denies anonymous, other owners, foreign capsules and cross-origin writes before persistence',async()=>{
  const h=harness();h.actor(null);assert.equal((await h.request('GET')).status,401);
  h.actor({userId:'other'});assert.equal((await h.request('GET')).status,404);
  h.actor({userId:'owner'});assert.equal((await h.request('GET',{}, {capsuleId:'foreign'})).status,404);
  assert.equal((await h.request('PUT',{}, {headers:{origin:'https://evil.invalid'}})).status,403);
  assert.equal((await h.request('PUT',{text:'x'.repeat(2100)})).status,413);
  assert.equal(h.saves(),0);
  const response=await h.request('PUT');assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'no-store');assert.equal(h.saves(),1);
});
