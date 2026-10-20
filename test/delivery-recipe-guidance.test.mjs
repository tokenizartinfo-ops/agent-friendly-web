import test from 'node:test';
import assert from 'node:assert/strict';
import {deliveryInstructions} from '../lib/delivery-instructions.mjs';

test('a selected installation capability yields a bounded recipe used by the existing handoff',()=>{
 const plugin=deliveryInstructions({capability:'cms_plugin',cms:'WordPress'});
 const files=deliveryInstructions({capability:'hosting_files',hosting:'DonWeb'});
 const source=deliveryInstructions({capability:'repository'});
 for(const result of [plugin,files,source]){
  assert.ok(result.recipe,'A method-specific recipe must reach the handoff');
  assert.equal(result.recipe.id,result.method);
  assert.equal(result.authorization,'none');assert.equal(result.publishes,false);
  assert.ok(result.text.includes(result.recipe.question));
  for(const key of ['prepare','evidence','pause'])assert.ok(result.text.includes(result.recipe[key]),key+' must reach the copyable handoff');
 }
 assert.notEqual(plugin.recipe.prepare,files.recipe.prepare);
 assert.notEqual(files.recipe.evidence,source.recipe.evidence);
 assert.match(plugin.recipe.prepare,/plugin|paquete/i);
 assert.match(files.recipe.prepare,/carpeta|dominio/i);
 assert.match(source.recipe.evidence,/revisión.*publicada|desplegada/i);
});

test('CMS editing and unknown access lead to a maintainer instead of an installer',()=>{
 for(const [capability,id]of [['cms_edit','maintainer_handoff'],['maintainer','maintainer_handoff'],['unknown','identify_maintainer']]){
  const r=deliveryInstructions({capability,cms:'WordPress'});
  assert.equal(r.recipe?.id,id);
  assert.match(r.recipe.question,/quién|quien/i);
  assert.match(r.recipe.prepare,/contraseñas|acceso general/i);
  assert.equal(r.authorization,'none');assert.equal(r.publishes,false);
 }
});

test('the handoff separates an uncertain write from a repeat and preserves later legitimate work',()=>{
 for(const capability of ['cms_edit','cms_plugin','hosting_files','repository','maintainer','unknown']){
  const r=deliveryInstructions({capability});
  assert.ok(r.recipe);
  assert.match(r.recipe.pause,/incierto|confirmar|conflicto|desconocido|no responde/i);
  assert.match(r.text,/posteriores/);
  assert.equal(r.steps.length,7);
 }
});

test('each supported language includes complete method guidance without gaining authority',()=>{
 for(const locale of ['es','en','pt'])for(const capability of ['cms_edit','cms_plugin','hosting_files','repository','maintainer','unknown']){
  const r=deliveryInstructions({capability,locale});
  assert.ok(r.recipe);
  for(const key of ['question','prepare','evidence','pause']){
   assert.equal(typeof r.recipe[key],'string');assert.ok(r.recipe[key].length>20);
   assert.ok(r.text.includes(r.recipe[key]));
  }
  assert.equal(r.authorization,'none');assert.equal(r.publishes,false);
 }
});

test('provider hints and untrusted input cannot choose a recipe or leak into instructions',()=>{
 const marker='PRIVATE_UNTRUSTED_VALUE_451';
 for(const capability of [undefined,'Hostinger','DonWeb','wordpress','<script>'+marker+'</script>',{capability:'repository'}]){
  const r=deliveryInstructions({capability,cms:marker,hosting:marker});
  assert.equal(r.method,null);assert.equal(r.recipe,null);
  assert.ok(!r.text.includes(marker));
 }
 const unknown=deliveryInstructions({capability:'unknown',hosting:'Hostinger'});
 assert.equal(unknown.recipe.id,'identify_maintainer');
 assert.equal(unknown.authorization,'none');
});
