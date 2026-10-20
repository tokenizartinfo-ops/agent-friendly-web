import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const module=await import('../scripts/preparation-schema-package.mjs').catch(()=>null);
const tables=["agent_capsule_preparations","copilot_working_drafts","delegated_access_grants","delegated_consent_sessions","delegated_preparation_consents","domain_claims","project_events","publication_capsules","registry_sites","scan_observations","site_projects"];
const load=async()=>{assert.equal(typeof module?.readPreparationSchemaPackage,'function','Missing isolated schema packager');return module.readPreparationSchemaPackage();};

test('preparation schema contains only its bounded D1 dependency closure and no data',async()=>{
 const p=await load();assert.deepEqual([...p.tables].sort(),tables);assert.ok(p.statements.length>tables.length);
 assert.equal(p.contract,'afw.preparation.schema-package.v1');assert.equal(p.activationReady,false);assert.equal(p.operationalReadiness,false);
 assert.equal(p.provisioningAllowed,false);assert.equal(p.recordsIncluded,false);
 const made=p.statements.filter(x=>x.kind==='table').map(x=>x.table).sort();assert.deepEqual(made,tables);
 for(const x of p.statements){assert.ok(tables.includes(x.table));assert.ok(['table','index','trigger','alter'].includes(x.kind));}
 for(const excluded of ['contact_leads','consent_receipts','copilot_consent_events','delegated_refresh_uses','delivery_plans','capsule_approvals'])assert.ok(!p.statements.some(x=>x.table===excluded));
});

test('schema package is deterministic and every source and statement carries provenance',async()=>{
 const p=await load(),second=await load();assert.deepEqual(p,second);
 assert.equal(p.sourceSetRevision,'d863055afb04ef8fb83606d974e094f0f6044154');
 assert.equal(createHash('sha256').update(p.schemaSql).digest('hex'),p.schemaSha256);
 for(const row of p.statements)assert.equal(createHash('sha256').update(row.sql).digest('hex'),row.sha256);
 assert.equal(p.sources.length,11);
 for(const row of p.sources){const bytes=await readFile(row.path);assert.equal(row.sha256,createHash('sha256').update(bytes).digest('hex'));assert.match(row.blobSha,/^[a-f0-9]{40}$/);}
});

test('source substitution missing input or widened input cannot yield a schema',async()=>{
 await load();
 const sources=Object.fromEntries(await Promise.all(module.PREPARATION_SCHEMA_INPUTS.map(async x=>[x.path,await readFile(x.path,'utf8')])));
 assert.equal(typeof module.buildPreparationSchemaPackage,'function');
 const [first]=module.PREPARATION_SCHEMA_INPUTS;
 assert.throws(()=>module.buildPreparationSchemaPackage({...sources,[first.path]:sources[first.path]+'\n-- drift'}));
 const missing={...sources};delete missing[first.path];assert.throws(()=>module.buildPreparationSchemaPackage(missing));
 assert.throws(()=>module.buildPreparationSchemaPackage({...sources,'drizzle/9999_other.sql':'CREATE TABLE unrelated(id TEXT)'}));
});

test('multi-statement trigger bodies remain intact and preserve append-only and revision fences',async()=>{
 const p=await load();
 for(const name of ['site_projects_legacy_revision_fence','agent_capsule_preparations_immutable','agent_capsule_preparations_no_delete','delegated_preparation_consents_immutable','delegated_preparation_consents_grant','delegated_preparation_consents_no_delete']){
  const row=p.statements.find(x=>x.kind==='trigger'&&x.name===name);assert.ok(row,name);assert.match(row.sql,/BEGIN[\s\S]+END;/);
 }
 const grant=p.statements.find(x=>x.name==='delegated_preparation_consents_grant');assert.match(grant.sql,/INSERT INTO delegated_access_grants/);
 const altered=p.statements.filter(x=>x.kind==='alter');assert.ok(altered.some(x=>/exchanged_at/.test(x.sql)));assert.ok(altered.some(x=>/session_json/.test(x.sql)));
});

test('a consumer cannot mutate the source allowlist or another generated package',async()=>{
 const p=await load();assert.ok(Object.isFrozen(module.PREPARATION_SCHEMA_INPUTS));
 assert.throws(()=>{module.PREPARATION_SCHEMA_INPUTS[0].path='other.sql';});
 p.tables.push('unrelated');p.statements[0].sql='DROP TABLE site_projects;';
 const next=await load();assert.deepEqual([...next.tables].sort(),tables);assert.ok(!next.statements.some(x=>x.sql==='DROP TABLE site_projects;'));
});
