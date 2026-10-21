import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const issuer='https://preparation-canary.agentfriendlyweb.dev';
const config=()=>({issuer,projectId:'project-a',clientId:'_-ci-sdk-client'});
test('closed preparation client draft configuration',async t=>{
 let source;try{source=await readFile('lib/preparation-client-draft.mjs','utf8');}catch(e){if(e.code!=='ENOENT')throw e;}
 assert.ok(source,'missing preparation client draft builder');
 const {buildPreparationClientDraft:build}=await import('../lib/preparation-client-draft.mjs');
 function closed(r){for(const k of ['createAllowed','registrationVerified','sourceVerified','consentGranted','authorizationGranted','operationalReadiness','executionAllowed','chargeAllowed','publicationAllowed'])assert.equal(r[k],false);}
 await t.test('exact source-required project query and supplied public-client MCP stanza',()=>{
  const r=build(config());closed(r);assert.equal(r.status,'draft_only');assert.equal(r.pkceMethod,'S256');assert.equal(r.callbackValidationRequired,true);
  assert.deepEqual(r.mcpServer,{type:'streamable-http',url:issuer+'/mcp',extensions:{'com.openai':{auth:{
   type:'oauth',client:{mode:'provided',clientId:'_-ci-sdk-client',tokenEndpointAuthMethod:'none'},
   authorizationUrl:issuer+'/authorize?project=project-a',tokenUrl:issuer+'/oauth/token',authorizationServerBase:issuer,
   resource:issuer+'/mcp',baseScopes:['afw:project:read'],defaultScopes:['afw:capsule:prepare'],oidcEnabled:false
  }}}});
  const a=r.mcpServer.extensions['com.openai'].auth,u=new URL(a.authorizationUrl);
  assert.deepEqual([...u.searchParams],[['project','project-a']]);assert.equal(u.origin,issuer);assert.equal(u.pathname,'/authorize');
  assert.equal(Object.hasOwn(a.client,'clientSecret'),false);assert.equal(Object.hasOwn(a,'registrationUrl'),false);
  assert.equal(Object.hasOwn(a,'redirectUri'),false);assert.equal(Object.hasOwn(a,'state'),false);assert.equal(Object.hasOwn(a,'codeChallenge'),false);
 });
 await t.test('every returned layer is immutable and input mutation cannot retarget the draft',()=>{
  const p=config(),r=build(p),m=r.mcpServer,a=m.extensions['com.openai'].auth;
  for(const v of [r,m,m.extensions,m.extensions['com.openai'],a,a.client,a.baseScopes,a.defaultScopes])assert.equal(Object.isFrozen(v),true);
  p.projectId='other';p.clientId='changed';assert.equal(new URL(a.authorizationUrl).searchParams.get('project'),'project-a');assert.equal(a.client.clientId,'_-ci-sdk-client');
 });
 await t.test('opaque project references are encoded exactly once',()=>{
  const r=build({...config(),projectId:'project:own._-1'});closed(r);
  const u=new URL(r.mcpServer.extensions['com.openai'].auth.authorizationUrl);assert.equal(u.searchParams.get('project'),'project:own._-1');assert.equal(u.searchParams.size,1);
 });
 const bad=[
  {issuer:issuer+'/'},{issuer:'https://agentfriendlyweb.dev'},{issuer:'https://preparation-canary.agentfriendlyweb.dev.evil.invalid'},
  {issuer:'http://preparation-canary.agentfriendlyweb.dev'},{projectId:'a&scope=evil'},{projectId:''},{projectId:'a'.repeat(129)},
  {clientId:''},{clientId:'x?secret=PRIVATE'},{clientSecret:'PRIVATE'},{scope:'afw:evidence:read'},{callback:'https://evil.invalid'},
  {projectId:undefined},{actor:'owner'}
 ];
 for(let i=0;i<bad.length;i++)await t.test('unsafe or extra configuration '+i+' stays blocked without echo',()=>{
  const r=build({...config(),...bad[i]});closed(r);assert.equal(r.status,'blocked');assert.equal(r.mcpServer,null);assert.doesNotMatch(JSON.stringify(r),/PRIVATE|evil/);
 });
 await t.test('accessors and non-record inputs never become configuration',()=>{
  let reads=0;const p=config();Object.defineProperty(p,'projectId',{get(){reads++;throw Error('PRIVATE');},enumerable:true});
  for(const value of [p,null,[],new Date(),{...config(),get unknown(){reads++;throw Error('PRIVATE');}}]){
   const r=build(value);closed(r);assert.equal(r.status,'blocked');assert.equal(r.mcpServer,null);
  }assert.equal(reads,0);
 });
});
