import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID,createHash} from 'node:crypto';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {createPublicationJournal} from '../lib/mcp-publication-journal.mjs';
import {createActivationJournal} from '../lib/mcp-activation-journal.mjs';
import {createActivationObserver,activationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
import {createPublicationDeploymentReader} from '../lib/mcp-publication-deployment-reader.mjs';
test('provider assigns IDs after configuration is fixed; primary activation enables exact version reading',async()=>{
 const db=new DatabaseSync(':memory:');try{
 for(const name of ['publication','activation'])db.exec(readFileSync('db/dossier-'+name+'-receipt.sql','utf8'));
 const adapter={withSession(mode){assert.equal(mode,'first-primary');return this;},prepare(sql){return{bind(...args){return{first:async()=>db.prepare(sql).get(...args),run:async()=>({success:true,meta:{changes:Number(db.prepare(sql).run(...args).changes)}})};}};}};
 const script='export default {}',accountId='a'.repeat(32),namespaceId='b'.repeat(32),workerName='agent-friendly-web-delegated-canary',artifact={script,sourceRevision:'c'.repeat(40),sourceTree:'d'.repeat(40),programHash:'e'.repeat(64),workerHash:createHash('sha256').update(script).digest('hex'),sourceCheck:'git-inputs-before-after-v1'};let closedVersion;
 const receipt=await createPublicationJournal({db:adapter,accountId,workerName,artifact,upload:async()=>({versionId:closedVersion=randomUUID()}),readVersion:async()=>({id:closedVersion,etag:'f'.repeat(64)})}).publish(new AbortController().signal);
 const activationKey='1'.repeat(64),trialId='2'.repeat(64),scopeHash='3'.repeat(64),at=Date.now();
 const configuration={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',exports:{AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},bindings:[{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:namespaceId,class_name:'AfwOwnEventNode'},{name:'AFW_DOSSIER_SUCCESSOR_POLICY',type:'plain_text',text:JSON.stringify({publication:{artifactKey:receipt.artifactKey,workerHash:artifact.workerHash,activationKey}})}],usage_model:'standard',containers:[]};
 const configurationHash=activationConfigurationHash(configuration),frozenConfig=JSON.stringify(configuration);
 // Simulated provider creates these only AFTER the entire config is frozen.
 const activeVersion=randomUUID(),deploymentId=randomUUID(),etag='4'.repeat(64);assert.equal(frozenConfig.includes(activeVersion)||frozenConfig.includes(deploymentId),false);
 let currentVersion=activeVersion;
 const fetchImpl=async(url,init)=>{assert.equal(init.method,'GET');let result;
 if(url.endsWith('/deployments'))result={deployments:[{id:deploymentId,strategy:'percentage',versions:[{version_id:currentVersion,percentage:100}]}]};
 else if(url.includes('/containers/'))result={id:'app',account_id:accountId,scheduling_policy:'durable_object',durable_objects:{namespace_id:namespaceId}};
 else if(url.includes('/scripts/'))result={id:activeVersion,resources:{script:{etag},bindings:[configuration.bindings[0]]}};
 else result={id:activeVersion,...configuration,modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(script).toString('base64')}]};
 return Response.json({success:true,errors:[],result});};
 const readCredential=async()=>'synthetic_read_only_token',activation={activationKey,trialId,startAt:at-1000,expiresAt:at+60000};
 const opts={db:adapter,artifactKey:receipt.artifactKey,activation,expected:{accountId,workerName,sourceRevision:artifact.sourceRevision,programHash:artifact.programHash,workerHash:artifact.workerHash},deployment:{namespaceId,applicationId:'app',scopeHash},fetchImpl,readCredential};
 await assert.rejects(createPublicationDeploymentReader(opts));
 const observe=createActivationObserver({configuration,versionId:activeVersion,deploymentId,namespaceId,applicationId:'app',fetchImpl,readCredential});
 await createActivationJournal({db:adapter,plan:{...activation,artifactKey:receipt.artifactKey,scopeHash,configurationHash},observe}).confirm(new AbortController().signal);
 const reader=await createPublicationDeploymentReader(opts);assert.equal((await reader({signal:new AbortController().signal})).scopeHash,scopeHash);
 assert.equal(db.prepare('SELECT version_id FROM dossier_publication_receipts').get().version_id,closedVersion);
 currentVersion=randomUUID();await assert.rejects(reader({signal:new AbortController().signal}));
 await assert.rejects(createPublicationDeploymentReader({...opts,activation:{...activation,trialId:'0'.repeat(64)}}));
 }finally{db.close();}
});
