import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/mcp-own-worker-execution.mjs');
const exportsMap={AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}};
const attachment={class_name:'AfwOwnEventNode',name:'agent-friendly-web-delegated-canary-afwowneventnode'};

test('own execution metadata normalizes only the known attachment, without making one for a closed legacy version',async()=>{
 const {snapshotOwnWorkerExecution}=await load();
 assert.deepEqual(snapshotOwnWorkerExecution({exports:exportsMap}),{exports:exportsMap,containers:[]});
 for(const entry of [attachment,{class_name:'AfwOwnEventNode'}])assert.deepEqual(snapshotOwnWorkerExecution({exports:exportsMap,containers:[entry]}),{exports:exportsMap,containers:[attachment]});
 const named={default:{type:'worker'},AfwNodeControl:{type:'worker'},...exportsMap};
 assert.deepEqual(snapshotOwnWorkerExecution({exports:named,containers:[attachment]}).exports,named);
});

test('foreign, duplicate or lifecycle-changing execution declarations fail closed',async()=>{
 const {snapshotOwnWorkerExecution}=await load();
 for(const containers of [[{...attachment,class_name:'Foreign'}],[{...attachment,name:'foreign'}],[attachment,attachment],[{...attachment,image:'other'}],{},null])assert.throws(()=>snapshotOwnWorkerExecution({exports:exportsMap,containers}));
 for(const exports of [{...exportsMap,Foreign:{type:'worker'}},{AfwOwnEventNode:{type:'durable-object',storage:'sqlite',state:'deleted'}},{AfwOwnEventNode:{type:'durable-object',storage:'legacy-kv'}},{...exportsMap,AfwNodeControl:{type:'worker'}},{...exportsMap,default:{type:'worker',cache:{enabled:true}},AfwNodeControl:{type:'worker'}}])assert.throws(()=>snapshotOwnWorkerExecution({exports,containers:[attachment]}));
 let reads=0;assert.throws(()=>snapshotOwnWorkerExecution({exports:exportsMap,containers:[{get class_name(){reads++;return 'AfwOwnEventNode';}}]}));assert.equal(reads,0);
});
