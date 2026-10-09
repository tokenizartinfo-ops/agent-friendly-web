import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPair,SignJWT} from 'jose';
import {manifest} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
import {createPrivateQaPreregistration} from '../lib/assistance-private-qa-preregistration.mjs';
const load=()=>import('../lib/assistance-private-challenge-host.mjs');
const {privateKey,publicKey}=await generateKeyPair('RS256');
async function fixture(){
 const m=manifest(),approval={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 const {registration:r}=await qaAdministrationFixture({createdAt:m.startAt,closeAt:m.deadline,expiresAt:m.deadline+10000});
 r.contract='afw-qa-closure-approval/v2';r.plan.occurrenceId=m.occurrenceId;r.approvalDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});r.plan.baselineRef=await computeQaClosureBaselineRef(r);
 let config={enabled:true,origin:'https://operations-manager.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'synthetic-challenge',clientId:'synthetic.access',principalRef:approval.identityRef,expiresAt:m.deadline,revision:1},values=new Map(),hook;
 const storage={get:async k=>structuredClone(values.get(k)),transaction:async fn=>{const next=new Map(values),result=await fn({get:async k=>structuredClone(next.get(k)),put:async(k,v)=>{next.set(k,structuredClone(v));if(hook)await hook();}});values=next;return result;}};
 const options={storage,readInstallation:()=>({registration:r,approval}),readIdentityConfig:()=>config,keySet:publicKey,limiter:{limit:async()=>({success:true})},now:()=>m.startAt};
 const jwt=await new SignJWT({type:'app',sub:'',common_name:config.clientId}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+config.teamDomain).setAudience(config.audience).setIssuedAt(Math.floor(m.startAt/1000)).setExpirationTime(Math.floor(m.deadline/1000)).sign(privateKey);
 const req=(body,token=jwt)=>new Request(config.origin+'/assistance/custody/confirm',{method:'POST',headers:{'content-type':'application/json','Cf-Access-Jwt-Assertion':token},body:JSON.stringify(body)});
 return {options,req,jwt,config,r,change:()=>config={...config,revision:config.revision+1},hook:v=>hook=v};
}
test('signed host confirms only one use and exposes no installation operation',async()=>{
 const f=await fixture(),{createPrivateChallengeHost}=await load(),h=createPrivateChallengeHost(f.options),issued=await h.issue();
 assert.deepEqual(Object.keys(h),['issue','status','withdraw','fetch']);const res=await h.fetch(f.req({nonce:issued.nonce}));assert.equal(res.status,200);assert.equal(res.headers.get('cache-control'),'no-store');assert.equal((await res.json()).state,'confirmed');assert.equal((await h.fetch(f.req({nonce:issued.nonce}))).status,409);assert.equal((await h.status()).state,'confirmed');
});
test('missing authentication foreign caller fields and withdrawal cannot confirm',async()=>{
 const f=await fixture(),{createPrivateChallengeHost}=await load(),h=createPrivateChallengeHost(f.options),issued=await h.issue();
 assert.equal((await h.fetch(f.req({nonce:issued.nonce},'garbage'))).status,401);assert.equal((await h.fetch(f.req({nonce:issued.nonce,principalRef:f.config.principalRef}))).status,409);assert.equal((await h.status()).state,'issued');assert.equal(await h.withdraw(),true);assert.equal((await h.fetch(f.req({nonce:issued.nonce}))).status,409);
});
test('host config withdrawal after limiter and during commit denies success',async()=>{
 for(const mode of ['limiter','commit']){const f=await fixture(),{createPrivateChallengeHost}=await load();if(mode==='limiter')f.options.limiter={limit:async()=>{f.change();return {success:true};}};const h=createPrivateChallengeHost(f.options),issued=await h.issue();if(mode==='commit')f.hook(()=>f.change());assert.equal((await h.fetch(f.req({nonce:issued.nonce}))).status,409);assert.equal((await h.status()).state,'issued');}
});
test('missing limiter and wrong path stay closed; oversized body never consumes',async()=>{
 const f=await fixture(),{createPrivateChallengeHost}=await load(),h=createPrivateChallengeHost(f.options),issued=await h.issue();
 assert.equal((await createPrivateChallengeHost({...f.options,limiter:null}).fetch(f.req({nonce:issued.nonce}))).status,503);assert.equal((await h.fetch(new Request(f.config.origin+'/assistance/custody/issue',{method:'POST'}))).status,401);assert.equal((await h.fetch(f.req({nonce:issued.nonce,extra:'x'.repeat(2000)}))).status,413);assert.equal((await h.status()).state,'issued');
});
test('an incomplete authenticated body times out without consuming the challenge',async()=>{
 const f=await fixture(),{createPrivateChallengeHost}=await load(),h=createPrivateChallengeHost(f.options);await h.issue();let canceled=false;
 const req=new Request(f.config.origin+'/assistance/custody/confirm',{method:'POST',headers:{'content-type':'application/json','Cf-Access-Jwt-Assertion':f.jwt},body:new ReadableStream({cancel(){canceled=true;}}),duplex:'half'});
 assert.equal((await h.fetch(req)).status,408);assert.equal(canceled,true);assert.equal((await h.status()).state,'issued');
});
test('clock reversal between signed verification and confirmation never consumes',async()=>{
 const f=await fixture(),{createPrivateChallengeHost}=await load(),h=createPrivateChallengeHost(f.options),issued=await h.issue();let calls=0;
 const backwards=createPrivateChallengeHost({...f.options,now:()=>f.r.provisioning.createdAt+(++calls<=2?1000:500)});
 assert.equal((await backwards.fetch(f.req({nonce:issued.nonce}))).status,409);assert.equal((await h.status()).state,'issued');
});

test('authenticated challenge request is default-denied and explicit bootstrap remains one-shot',async()=>{const f=await fixture(),{createPrivateChallengeHost}=await load();assert.equal((await createPrivateChallengeHost(f.options).fetch(f.req({challenge:'request'}))).status,409);let prepared=0;const h=createPrivateChallengeHost({...f.options,allowChallengeRequest:true,prepareExchange:async()=>{prepared++;return true;}});const response=await h.fetch(f.req({challenge:'request'}));assert.equal(response.status,200);const issued=await response.json();assert.match(issued.nonce,/^[0-9a-f]{64}$/);assert.equal((await h.fetch(f.req({nonce:issued.nonce}))).status,200);assert.equal((await h.fetch(f.req({challenge:'request'}))).status,409);assert.ok(prepared>=4);});
test('bootstrap never prepares for foreign JWT and denies missing authority or principal mismatch',async()=>{const f=await fixture(),{createPrivateChallengeHost}=await load();let calls=0;const opts={...f.options,allowChallengeRequest:true,prepareExchange:async()=>{calls++;return true;}};assert.equal((await createPrivateChallengeHost(opts).fetch(f.req({challenge:'request'},'invalid'))).status,401);assert.equal(calls,0);assert.equal((await createPrivateChallengeHost({...opts,prepareExchange:undefined}).fetch(f.req({challenge:'request'}))).status,503);f.config.principalRef='f'.repeat(64);assert.equal((await createPrivateChallengeHost(opts).fetch(f.req({challenge:'request'}))).status,409);assert.equal(calls,0);});
test('withdrawn preregistration after issuance suppresses nonce and cannot reissue',async()=>{const f=await fixture(),{createPrivateChallengeHost}=await load();let active=true;const h=createPrivateChallengeHost({...f.options,allowChallengeRequest:true,prepareExchange:async()=>active});f.hook(()=>{active=false;});assert.equal((await h.fetch(f.req({challenge:'request'}))).status,409);assert.equal((await h.status()).state,'issued');f.hook(undefined);active=true;assert.equal((await h.fetch(f.req({challenge:'request'}))).status,409);});

test('real preregistration preparation requires prior operator registration and respects permanent withdrawal',async()=>{
 const f=await fixture(),{createPrivateChallengeHost,createPreregisteredExchangePreparation}=await load();
 const preregistration=createPrivateQaPreregistration({storage:f.options.storage,readPreregistration:f.options.readInstallation,now:f.options.now});
 const prepareExchange=createPreregisteredExchangePreparation({preregistration,readInstallation:f.options.readInstallation});
 const h=createPrivateChallengeHost({...f.options,allowChallengeRequest:true,prepareExchange});
 assert.equal((await h.fetch(f.req({challenge:'request'}))).status,409);
 assert.equal(await preregistration.readForClosure(),null);
 assert.equal(await preregistration.register(),true);
 const response=await h.fetch(f.req({challenge:'request'}));assert.equal(response.status,200);
 const issued=await response.json();assert.equal(await preregistration.withdraw(),true);
 assert.equal((await h.fetch(f.req({nonce:issued.nonce}))).status,409);
 assert.equal((await h.fetch(f.req({challenge:'request'}))).status,409);
 assert.ok(await preregistration.readForClosure());assert.equal((await h.status()).state,'issued');
});

test('preregistered preparation rejects mismatching current pins and missing current read',async()=>{
 const f=await fixture(),{createPreregisteredExchangePreparation}=await load();
 const preregistration=createPrivateQaPreregistration({storage:f.options.storage,readPreregistration:f.options.readInstallation,now:f.options.now});assert.equal(await preregistration.register(),true);
 const identity={principalRef:f.config.principalRef};
 const prepare=createPreregisteredExchangePreparation({preregistration,readInstallation:f.options.readInstallation});assert.equal(await prepare(identity),true);assert.equal(await prepare({principalRef:'f'.repeat(64)}),false);
 const other=structuredClone(f.options.readInstallation());other.approval.planRevision++;
 assert.equal(await createPreregisteredExchangePreparation({preregistration,readInstallation:()=>other})(identity),false);
 assert.equal(await createPreregisteredExchangePreparation({preregistration:{readForClosure:preregistration.readForClosure},readInstallation:f.options.readInstallation})(identity),false);
});
