import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const workflow=readFileSync(new URL('../.github/workflows/afw-named-confirmation-package.yml',import.meta.url),'utf8');

test('public package has no dispatch policy input or event-supplied policy channel',()=>{
 const dispatch=workflow.match(/  workflow_dispatch:[\s\S]*?(?=  pull_request:)/)?.[0];
 assert.ok(dispatch,'manual package entrypoint remains available');
 assert.doesNotMatch(dispatch,/inputs:|policy_json/);
 assert.doesNotMatch(workflow,/GITHUB_EVENT_PATH|event\.inputs|event\.inputs\?\.|policy_json/);
 assert.match(workflow,/inertNamedConfirmationPolicy\(artifact\)/);
});

test('public package retains reusable template, materializer and exact frozen artifact for private assembly',()=>{
 for(const file of ['template.mjs','template.json','materializer.mjs','frozen-artifact.json','private-template-build.json']){
  assert.ok(workflow.includes('source/output/mcp-release-confirmation/'+file),'missing public output '+file);
 }
 assert.match(workflow,/buildMcpPrivateConfirmationTemplate/);
 assert.match(workflow,/materializeMcpPrivateConfirmation/);
 assert.match(workflow,/retention-days: 7/);
 assert.match(workflow,/persist-credentials: false/);
 assert.doesNotMatch(workflow,/CLOUDFLARE_API_TOKEN|wrangler deploy|secrets\./);
});
