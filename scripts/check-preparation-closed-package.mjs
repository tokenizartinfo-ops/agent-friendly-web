// Exact candidate and retained rollback artifacts + synthetic closed profile only. No bootstrap, identity, KV/D1, real OAuth or network client.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
const root=new URL('../output/preparation-canary-release/',import.meta.url);
assert.equal(process.env.GITHUB_ACTIONS,'true');
assert.equal(process.env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');
const profile=JSON.parse(await readFile(new URL('wrangler.closed.json',root),'utf8'));
const receipt=JSON.parse(await readFile(new URL('receipt.json',root),'utf8'));
assert.equal(profile.name,'agent-friendly-web-preparation-canary');assert.equal(profile.workers_dev,false);assert.equal(profile.preview_urls,false);
assert.equal(profile.keep_vars,false);assert.equal(profile.compatibility_date,'2026-09-07');
assert.deepEqual(profile.compatibility_flags,['nodejs_compat']);
assert.equal(receipt.rollbackKind,'retained_build_artifact');
assert.notEqual(receipt.sourceRevision,receipt.rollbackSourceRevision);
assert.equal(receipt.hostedRollbackPerformed,false);
assert.deepEqual(profile.vars,{AFW_DELEGATED_PREPARATION_ROUTER_ENABLED:'false',AFW_DELEGATED_PREPARATION_CONNECTIONS_ENABLED:'false',AFW_DELEGATED_OAUTH_ENABLED:'false',AFW_DELEGATED_PREPARATION_ENABLED:'false'});
const sha=b=>createHash('sha256').update(b).digest('hex'),cases=[];
const paths=['/','/authorize','/oauth/token','/mcp','/connections','/connections/revoke','/.well-known/oauth-authorization-server','/oauth/register','/source','/source/identity','/source/new'];
for(const filename of ['index.mjs','rollback.mjs']){
 const bytes=await readFile(new URL(filename,root));
 assert.equal(sha(bytes),filename==='index.mjs'?receipt.workerHash:receipt.rollbackHash);
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,script:bytes.toString('utf8'),
  compatibilityDate:profile.compatibility_date,compatibilityFlags:profile.compatibility_flags,bindings:profile.vars}));
 try{
  for(const path of paths)for(const method of ['GET','POST']){
   const r=await runtime.dispatchFetch('https://example.invalid'+path,{method,...(method==='POST'?{body:'not JSON'}:{})});
   assert.equal(r.status,404);assert.equal(r.headers.get('Cache-Control'),'no-store');
   assert.deepEqual(await r.json(),{code:'preparation_route_unavailable',executionAllowed:false,chargeAllowed:false,publicationAllowed:false});
   cases.push({source:filename,path,method,status:r.status,closed:true});
  }
 }finally{await runtime.dispose();}
 assert.equal(sha(await readFile(new URL(filename,root))),sha(bytes));
}
assert.equal(cases.length,44);
const result={checkedAt:new Date().toISOString(),cases,tests:cases.length,compiledBytesUnchanged:true,rollbackBytesUnchanged:true,
 nativeClosedQualified:true,remoteMutations:0,hostedIdentityAcceptance:false,activationReady:false,operationalReadiness:false,
 scope:'native isolated closed candidate and retained rollback modules only; no hosted HTTP/config/schema/client/consent/events, actual hosted rollback or PC-off'};
receipt.nativeClosedQualified=true;
receipt.nativeClosedReceipt='native-closed.json';
receipt.closedUploadReady=false;
receipt.nextGate='review and fresh exact-target check; closed publication and baseline recovery need separate remote receipts';
await writeFile(new URL('native-closed.json',root),JSON.stringify(result,null,2)+'\n');
await writeFile(new URL('receipt.json',root),JSON.stringify(receipt,null,2)+'\n');
console.log(JSON.stringify({tests:cases.length,nativeClosedQualified:true,compiledBytesUnchanged:true,remoteMutations:0,activationReady:false,operationalReadiness:false}));
