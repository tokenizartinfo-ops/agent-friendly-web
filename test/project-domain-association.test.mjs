import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/project-domain-association.mjs');
const project={id:'draft-a',userId:'owner-a',website:'https://example.org/page'};
const site={projectId:'original-a',userId:'owner-a',hostname:'example.org'};

test('a continuation reference requires the same current owner and a matching linked project',async()=>{
 const {projectDomainAssociation}=await load();let reads=0;
 const resolve=async(id,user)=>{reads++;assert.equal(id,'original-a');assert.equal(user,'owner-a');return{id,userId:user,website:'https://example.org/'};};
 assert.deepEqual(await projectDomainAssociation(project,'owner-a',site,resolve),{state:'own_other',origin:'https://example.org',projectId:'original-a'});
 assert.equal(reads,1);
 for(const linked of [null,{id:'original-a',userId:'owner-b',website:'https://example.org/'},{id:'wrong',userId:'owner-a',website:'https://example.org/'},{id:'original-a',userId:'owner-a',website:'https://other.example/'}])assert.deepEqual(await projectDomainAssociation(project,'owner-a',site,async()=>linked),{state:'other',origin:'https://example.org'});
});

test('a foreign association never exposes a project reference or queries its dossier',async()=>{
 const {projectDomainAssociation}=await load();
 const forbidden=async()=>{throw Error('foreign dossier lookup');};
 assert.deepEqual(await projectDomainAssociation(project,'owner-a',{...site,userId:'owner-b'},forbidden),{state:'other',origin:'https://example.org'});
 assert.deepEqual(await projectDomainAssociation(project,'owner-a',{...site,hostname:'other.example'},forbidden),{state:'other',origin:'https://example.org'});
 assert.deepEqual(await projectDomainAssociation(project,'owner-a',null,forbidden),{state:'available',origin:'https://example.org'});
 assert.deepEqual(await projectDomainAssociation(project,'owner-a',{...site,projectId:project.id},forbidden),{state:'current',origin:'https://example.org'});
 await assert.rejects(projectDomainAssociation(project,'owner-b',site,forbidden),/invalid_context/);
});

test('client association metadata is bounded and cannot inject a link or foreign reference',async()=>{
 const {normalizeDomainAssociation}=await load();
 assert.equal(normalizeDomainAssociation(undefined),null);
 const valid={state:'own_other',origin:'https://example.org',projectId:'original-a'};
 assert.deepEqual(normalizeDomainAssociation(valid),valid);
 for(const value of [{...valid,projectId:'https://foreign.example'},{...valid,origin:'http://localhost'},{...valid,extra:'private'},{state:'other',origin:valid.origin,projectId:'private-project'},{...valid,state:'unknown'}])assert.throws(()=>normalizeDomainAssociation(value),/invalid_domain_association/);
});
