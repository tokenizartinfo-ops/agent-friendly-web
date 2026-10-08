import {readFileSync} from 'node:fs';
import {generateKeyPair,SignJWT} from 'jose';
import {fixture,observation} from './occurrence-operations.mjs';
import {createOccurrenceApprovalCatalog} from '../../lib/assistance-occurrence-approvals.mjs';
export const adapter=await import('../../lib/assistance-occurrence-http.mjs').catch(()=>({}));
export const digestModule=await import('../../lib/assistance-occurrence-digest.mjs').catch(()=>({}));
const {privateKey,publicKey}=await generateKeyPair('RS256');
export const origin='https://operations-manager.agentfriendlyweb.dev';
export async function signed(auth,patch={},aud=auth.audience,sub=''){return new SignJWT({type:'app',common_name:auth.clientId,...patch}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+auth.teamDomain).setAudience(aud).setSubject(sub).setExpirationTime(patch.exp??'5m').sign(privateKey);}
export async function httpFixture(){
 const f=fixture();f.a.exec(readFileSync('worker/operations/assistance-occurrences-v2.sql','utf8'));f.a.exec(readFileSync('worker/operations/assistance-occurrences-v2-reservation-fence.sql','utf8'));
 const policy={mode:'QA_OCCURRENCE_EXCLUSIVE',auth:{enabled:true,origin,teamDomain:'test.cloudflareaccess.com',audience:'qa-operations-only',clientId:'synthetic-service.access'},principalRef:'c'.repeat(64),enrollments:[{enrollmentRef:'d'.repeat(64),projectRef:f.m.signal.projectRef}],serverConfigVersion:'0'.repeat(64),admissionRevision:1,serverDeadline:f.m.serverDeadline,qaBindingRef:'f'.repeat(64)};
 policy.serverConfigVersion=await adapter.computeOccurrenceServerConfigVersion(policy);
 const approval={manifest:f.m,identityRef:policy.principalRef,enrollmentRef:policy.enrollments[0].enrollmentRef,serverConfigVersion:policy.serverConfigVersion,planRevision:1};const catalog=createOccurrenceApprovalCatalog({db:f.db});await catalog.approve(approval);let current=policy,limitCalls=0;
 const jwt=await signed(policy.auth);const options={db:f.db,readPolicy:()=>current,keySet:publicKey,limiter:{limit:async()=>{limitCalls++;return {success:true};}}};
 const makeRequest=(path,body,token=jwt,extras={})=>new Request(origin+path,{method:'POST',headers:{'content-type':'application/json','Cf-Access-Jwt-Assertion':token,...extras},body:JSON.stringify(body)});
 const handler=adapter.createOccurrenceHttpAdapter(options),calls=[];
 const fetchImpl=async request=>{calls.push(new URL(request.url).pathname);const headers=new Headers(request.headers);headers.set('Cf-Access-Jwt-Assertion',jwt);return handler(new Request(request,{headers}));};
 return {...f,policy,approval,catalog,jwt,options,handler,makeRequest,fetchImpl,calls,limitCalls:()=>limitCalls,setPolicy:p=>{current=p;},cloud:()=>({...observation(f.m,Date.now()-100),checkoutClean:true}),planDigest:await digestModule.computeOccurrencePlanDigest({manifest:f.m,identityRef:policy.principalRef,admissionContract:'server-v1',approval})};
}
