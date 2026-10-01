import assert from 'node:assert/strict';
import test from 'node:test';
import { Client, InMemoryTransport } from '@modelcontextprotocol/client';
import { createDelegatedProjectMcpServer } from '../lib/delegated-project-mcp.mjs';

test('MCP client gets only grant-scoped read tools, strict arguments and revocable access',async()=>{
  const now='2026-09-30T18:00:00Z',resource='https://private.example.invalid/mcp';
  const context={grantId:'g',subject:'a',clientId:'c',resource,scopes:['afw:project:read','afw:evidence:read']};
  const grant={...context,projectId:'p',status:'active',revokedAt:null,expiresAt:'2026-09-30T19:00:00Z'};
  let authorized=true,reads=0;
  const repository={getGrant:async()=>grant,getOwnedProject:async()=>{reads++;return {id:'p',userId:'a',organization:'A',website:'https://a.example',intake:{},revision:1,completion:0,updatedAt:now,status:'draft'};},listCurrentObservations:async()=>[]};
  const server=createDelegatedProjectMcpServer({resource,repository,now:()=>now,resolveAuthorization:async()=>authorized?{context,projectId:'p'}:null});
  const client=new Client({name:'afw-local-delegated-test',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
  const [ct,st]=InMemoryTransport.createLinkedPair();
  await server.connect(st);await client.connect(ct);
  try {
    const tools=await client.listTools();
    assert.deepEqual(tools.tools.map(x=>x.name).sort(),['read_project_summary','read_saved_evidence']);
    for(const tool of tools.tools){assert.equal(tool.annotations.readOnlyHint,true);assert.equal(tool.annotations.openWorldHint,false);assert.equal(tool.inputSchema.additionalProperties,false);}
    const summary=await client.callTool({name:'read_project_summary',arguments:{}});
    assert.equal(summary.structuredContent.data.id,'p');assert.equal(summary.isError,undefined);
    const evidence=await client.callTool({name:'read_saved_evidence',arguments:{}});
    assert.deepEqual(evidence.structuredContent.data.history,[]);
    const before=reads;
    const foreign=await client.callTool({name:'read_project_summary',arguments:{projectId:'other'}});
    assert.equal(foreign.isError,true);assert.equal(reads,before);
    grant.revokedAt=now;
    const revoked=await client.callTool({name:'read_project_summary',arguments:{}});
    assert.equal(revoked.isError,true);assert.equal(revoked.structuredContent.code,'delegated_access_denied');
    authorized=false;
    const anonymous=await client.callTool({name:'read_project_summary',arguments:{}});
    assert.equal(anonymous.isError,true);assert.equal(anonymous.structuredContent.status,401);
  } finally {await client.close();await server.close();}
});

test('missing trusted resolver refuses server construction',()=>{
  assert.throws(()=>createDelegatedProjectMcpServer({}),/authorization resolver/i);
});
