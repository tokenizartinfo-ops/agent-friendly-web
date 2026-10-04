import assert from 'node:assert/strict';
import test from 'node:test';
import { Client, InMemoryTransport } from '@modelcontextprotocol/client';
import { createDelegatedProjectMcpServer } from '../lib/delegated-project-mcp.mjs';

test('MCP client gets only grant-scoped read tools, strict arguments and revocable access',async()=>{
  const now='2026-09-30T18:00:00Z',resource='https://private.example.invalid/mcp';
  const context={grantId:'g',subject:'a',clientId:'c',resource,scopes:['afw:project:read','afw:evidence:read']};
  const grant={...context,projectId:'p',status:'active',revokedAt:null,expiresAt:'2026-09-30T19:00:00Z'};
  let authorized=true,unavailable=false,reads=0;
  const repository={getGrant:async()=>grant,getOwnedProject:async()=>{reads++;return {id:'p',userId:'a',organization:'A',website:'https://a.example',intake:{},revision:1,completion:0,updatedAt:now,status:'draft'};},listCurrentObservations:async()=>[]};
  const server=createDelegatedProjectMcpServer({resource,repository,now:()=>now,resolveAuthorization:async()=>{if(unavailable)throw Error('temporary');return authorized?{context,projectId:'p'}:null;}});
  const client=new Client({name:'afw-local-delegated-test',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
  const [ct,st]=InMemoryTransport.createLinkedPair();
  await server.connect(st);await client.connect(ct);
  try {
    const tools=await client.listTools();
    assert.deepEqual(tools.tools.map(x=>x.name).sort(),['read_project_summary','read_saved_evidence']);
    for(const tool of tools.tools){assert.equal(tool.annotations.readOnlyHint,true);assert.equal(tool.annotations.openWorldHint,false);assert.equal(tool.inputSchema.additionalProperties,false);}
    assert.deepEqual(tools.tools.find(x=>x.name==='read_project_summary')._meta.securitySchemes,[{type:'oauth2',scopes:['afw:project:read']}]);
    assert.deepEqual(tools.tools.find(x=>x.name==='read_saved_evidence')._meta.securitySchemes,[{type:'oauth2',scopes:['afw:project:read','afw:evidence:read']}]);
    const summary=await client.callTool({name:'read_project_summary',arguments:{}});
    assert.equal(summary.structuredContent.data.id,'p');assert.equal(summary.isError,undefined);
    const evidence=await client.callTool({name:'read_saved_evidence',arguments:{}});
    assert.deepEqual(evidence.structuredContent.data.history,[]);
    const beforeScope=reads;
    context.scopes=['afw:project:read'];
    const scopeDenied=await client.callTool({name:'read_saved_evidence',arguments:{}});
    assert.equal(scopeDenied.structuredContent.code,'insufficient_scope');
    assert.equal(scopeDenied.structuredContent.recovery.automaticReconnect,false);
    assert.equal(scopeDenied.structuredContent.recovery.action,'review_optional_scope');
    assert.equal(reads,beforeScope);
    assert.deepEqual(scopeDenied._meta['mcp/www_authenticate'],['Bearer resource_metadata="https://private.example.invalid/.well-known/oauth-protected-resource/mcp", error="insufficient_scope", error_description="Evidence read requires additional consent", scope="afw:project:read afw:evidence:read"']);
    context.scopes=['afw:project:read','afw:evidence:read'];
    const before=reads;
    const foreign=await client.callTool({name:'read_project_summary',arguments:{projectId:'other'}});
    assert.equal(foreign.isError,true);assert.equal(reads,before);
    grant.revokedAt=now;
    const revoked=await client.callTool({name:'read_project_summary',arguments:{}});
    assert.equal(revoked.isError,true);assert.equal(revoked.structuredContent.code,'delegated_access_denied');
    assert.equal(revoked._meta,undefined);
    assert.equal(revoked.structuredContent.recovery.action,'review_connection');
    assert.equal(revoked.structuredContent.recovery.causeConfirmed,false);
    assert.equal(revoked.structuredContent.recovery.lastKnownContext,'historical_only');
    assert.match(revoked.content[0].text,/última pregunta/);
    assert.equal(revoked.structuredContent.data,undefined);
    authorized=false;
    const anonymous=await client.callTool({name:'read_project_summary',arguments:{}});
    assert.equal(anonymous.isError,true);assert.equal(anonymous.structuredContent.status,401);
    unavailable=true;
    const temporary=await client.callTool({name:'read_project_summary',arguments:{}});
    assert.equal(temporary.structuredContent.status,503);
    assert.equal(temporary.structuredContent.recovery.action,'retry_read');
    assert.equal(temporary.structuredContent.recovery.causeConfirmed,false);
    assert.equal(temporary._meta,undefined);
    assert.equal(temporary.structuredContent.data,undefined);
    assert.equal(reads,before);
  } finally {await client.close();await server.close();}
});

test('missing trusted resolver refuses server construction',()=>{
  assert.throws(()=>createDelegatedProjectMcpServer({}),/authorization resolver/i);
});
