import test from 'node:test';
import assert from 'node:assert/strict';
const api=await import('../lib/mcp-qa-own-closed-command.mjs').catch(()=>({}));
function fixture(){const at=Date.now(),sha='a'.repeat(40);return{at,event:{repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:{id:290715446,login:'tokenizartinfo-ops',type:'User'},comment:{id:6550000001,body:'/afw-own-closed-readback v1 '+sha,created_at:new Date(at-1000).toISOString(),author_association:'OWNER',user:{id:290715446,login:'tokenizartinfo-ops',type:'User'}}},context:{repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'41200000001',runAttempt:'1',sourceRevision:sha}};}
const run=f=>{assert.equal(typeof api.validateOwnClosedReadbackCommand,'function');return api.validateOwnClosedReadbackCommand({event:f.event,context:f.context,now:()=>f.at});};
test('owner exact command yields data-only source/comment/run admission',()=>{const f=fixture(),r=run(f);assert.equal(r.purpose,'afw.own-closed-readback-command.v1');assert.equal(r.sourceRevision,f.context.sourceRevision);assert.equal(r.commentId,'6550000001');assert.equal(r.runId,f.context.runId);assert.equal(r.readOnly,true);for(const k of ['authorizesEffects','operationalReadiness','mayRetry'])assert.equal(r[k],false);assert.ok(Object.isFrozen(r));assert.equal(JSON.stringify(r).includes('/afw-'),false);});
for(const [name,attack]of Object.entries({
 'repository':f=>{f.event.repository.id=1;},'repository name':f=>{f.context.repository='other/repo';},
 'issue':f=>{f.event.issue.number=498;},'PR':f=>{f.event.issue.pull_request=null;},
 'author':f=>{f.event.comment.user.id=1;},'author login':f=>{f.event.comment.user.login='someone';},
 'sender':f=>{f.event.sender.id=1;},'sender login':f=>{f.event.sender.login='someone';},
 'bot':f=>{f.event.comment.user.type='Bot';},'association':f=>{f.event.comment.author_association='CONTRIBUTOR';},
 'event':f=>{f.context.eventName='issue_comment_edited';},'branch':f=>{f.context.ref='refs/heads/feature';},
 'rerun':f=>{f.context.runAttempt='2';},'source':f=>{f.event.comment.body='/afw-own-closed-readback v1 '+'b'.repeat(40);},
 'mode':f=>{f.event.comment.body='/afw-own-closed-readback v2 '+'a'.repeat(40);},
 'newline':f=>{f.event.comment.body+='\n';},'shell body':f=>{f.event.comment.body+='; echo PRIVATE';},
 'expired event':f=>{f.event.comment.created_at=new Date(f.at-300000).toISOString();},
 'future event':f=>{f.event.comment.created_at=new Date(f.at+1).toISOString();},
 'comment id':f=>{f.event.comment.id=0;},'unknown context selector':f=>{f.context.url='https://example.com';},
 'accessor':f=>{Object.defineProperty(f.event.comment,'body',{enumerable:true,get(){throw Error('PRIVATE');}});}
}))test('command rejects '+name,()=>{const f=fixture();attack(f);assert.throws(()=>run(f));});
test('five-minute event admission accepts299999ms but not300000ms',()=>{for(const age of [299999,300000]){const f=fixture();f.event.comment.created_at=new Date(f.at-age).toISOString();if(age===299999)assert.equal(run(f).readOnly,true);else assert.throws(()=>run(f));}});
