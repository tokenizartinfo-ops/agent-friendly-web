import test from 'node:test';
import assert from 'node:assert/strict';
let api;try{api=await import('../lib/mcp-qa-finite-bootstrap-primary.mjs');}catch{/* expected absent-product RED */}
const world=async()=>{assert.equal(typeof api?.readFiniteQaBootstrapPrimary,'function');return (await import('./fixtures/finite-bootstrap-world.mjs')).bootstrapWorld();};
const read=f=>api.readFiniteQaBootstrapPrimary({get:f.get,record:f.record,phase:'reader',now:Date.now,expected:f.expected});
test('primary reader qualifies actual successful step/job facts after issuer deadline',async()=>{
 const f=await world();const p=await api.readFiniteQaBootstrapPrimary({get:f.get,record:f.record,phase:'reader',now:()=>f.record.Pend+1000,expected:f.expected});
 assert.equal(p.jobId,789);assert(p.jobCompletedAt<f.record.Pend);
});
for(const mode of ['owner','body','repo','branch','workflow','attempt','run-not-complete','job-not-complete','step-not-complete','step-name','step-time','job-time','future-completion','source-tree','source-file','file-size','file-blob','expected-hash','main','duplicate-job','truncated-jobs','observation-before-step'])test('primary rejects '+mode,async()=>{
 const f=await world(),r=f.record;
 if(mode==='owner')f.comment.user.id=1;
 if(mode==='body')f.comment.body+=' ';
 if(mode==='repo')f.run.repository.id=1;
 if(mode==='branch')f.run.head_branch='other';
 if(mode==='workflow')f.run.path='.github/workflows/other.yml';
 if(mode==='attempt')f.run.run_attempt=2;
 if(mode==='run-not-complete')f.run.status='in_progress';
 if(mode==='job-not-complete')f.job.status='in_progress';
 if(mode==='step-not-complete')f.step.status='in_progress';
 if(mode==='step-name')f.step.name='seed-material';
 if(mode==='step-time')f.step.started_at=new Date(r.P0-1).toISOString();
 if(mode==='job-time')f.job.completed_at=new Date(r.Pend).toISOString();
 if(mode==='future-completion')f.job.completed_at=new Date(Date.now()+10000).toISOString();
 if(mode==='source-tree')f.map.get('/git/commits/'+r.sourceRevision).tree.sha='0'.repeat(40);
 const file=f.map.get('/contents/'+r.workflowPath+'?ref='+r.sourceRevision);
 if(mode==='source-file')file.content=Buffer.from('other').toString('base64');
 if(mode==='file-size')file.size++;
 if(mode==='file-blob')file.sha='0'.repeat(40);
 if(mode==='expected-hash')f.expected.workflowHash='0'.repeat(64);
 if(mode==='main')f.map.get('/git/ref/heads/main').object.sha='0'.repeat(40);
 const jobs=f.map.get('/actions/runs/456/attempts/1/jobs?per_page=100');
 if(mode==='duplicate-job'){jobs.jobs.push(structuredClone(f.job));jobs.total_count++;}
 if(mode==='truncated-jobs')jobs.total_count++;
 if(mode==='observation-before-step')r.observedAt=r.stepStartedAt-1;
 await assert.rejects(read(f));
});
test('issuer cannot claim its own future step/job completion',async()=>{
 const f=await world();
 await assert.rejects(api.readFiniteQaBootstrapPrimary({get:f.get,record:f.record,phase:'issuer',now:Date.now,expected:f.expected}));
 f.issuer();f.record.observedAt=Date.now();
 const p=await api.readFiniteQaBootstrapPrimary({get:f.get,record:f.record,phase:'issuer',now:Date.now,expected:f.expected});
 assert.equal(p.stepCompletedAt,undefined);
 await assert.rejects(read(f));
});
