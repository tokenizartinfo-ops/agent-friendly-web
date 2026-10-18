import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/delivery-instructions.mjs');
test('WordPress editor access does not imply root-file or plugin access',async()=>{
 const {deliveryInstructions}=await load();
 const result=deliveryInstructions({capability:'cms_edit',cms:'WordPress'});
 assert.equal(result.platform,'wordpress');assert.equal(result.method,'maintainer_handoff');
 assert.match(result.text,/raíz|root/);assert.equal(result.authorization,'none');assert.equal(result.publishes,false);
});
test('hosting and repository routes require target, backup, exact version and verification',async()=>{
 const {deliveryInstructions}=await load();
 for(const [capability,hosting,platform] of [['hosting_files','DonWeb','donweb'],['hosting_files','Hostinger','hostinger'],['repository','','generic']]){
  const result=deliveryInstructions({capability,hosting});assert.equal(result.platform,platform);
  for(const id of ['target','backup','review','verify','rollback'])assert.ok(result.steps.some(step=>step.id===id));
 }
});
test('unknown access asks for a maintainer; private input cannot become instructions',async()=>{
 const {deliveryInstructions}=await load();
 const result=deliveryInstructions({capability:'unknown',cms:'<script>bad()</script>',hosting:'secret-value'});
 assert.equal(result.method,'identify_maintainer');assert.equal(result.platform,'generic');
 assert.ok(!result.text.includes('secret-value'));assert.ok(!result.text.includes('<script>'));
 assert.equal(deliveryInstructions({capability:'arbitrary'}).method,null);
});
test('all supported locales retain the permission boundary and exact steps',async()=>{
 const {deliveryInstructions}=await load();
 for(const locale of ['es','en','pt']){
  const result=deliveryInstructions({capability:'cms_plugin',cms:'WordPress',locale});
  assert.equal(result.authorization,'none');assert.equal(result.publishes,false);
  assert.ok(result.text.includes('WordPress'));assert.equal(result.steps.length,7);
 }
});
