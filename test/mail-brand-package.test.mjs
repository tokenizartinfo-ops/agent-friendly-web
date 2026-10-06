import test from 'node:test';
import assert from 'node:assert/strict';
import { buildBrandPackage, verifyBrandPackage, brandPreview } from '../lib/mail-brand-package.mjs';

// A real one-pixel PNG, not arbitrary HTML or an agent-supplied attachment.
const png='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=';
function input(){return {to:'owner@example.com',subject:'Prueba propia AFW',panels:['header','robots','body','action','footer'].map(slot=>({slot,type:'image/png',content:png,alt:slot==='body'?'Hola <script>alert(1)</script> & gracias.':slot}))};}

test('brand package derives inert HTML and equivalent text from the same panels',async()=>{
  const result=await buildBrandPackage(input());
  assert.deepEqual(result.message.from,{email:'hello@agentfriendlyweb.dev',name:'AFW · Agent Friendly Web'});
  assert.equal(result.message.replyTo,'hello@agentfriendlyweb.dev');
  assert.equal(result.message.attachments[0].contentId,'afw-header');
  assert.match(result.message.html,/&lt;script&gt;alert\(1\)&lt;\/script&gt; &amp; gracias\./);
  assert.doesNotMatch(result.message.html,/<script|data:|https:\/\/(?!agentfriendlyweb\.dev)/);
  assert.match(result.message.text,/Hola <script>alert\(1\)<\/script> & gracias\./);
  assert.equal(result.message.attachments.length,5);
  assert.equal(await verifyBrandPackage(result),true);
});

test('approval fingerprint rejects modified HTML, recipient, text and image bytes',async()=>{
  const original=await buildBrandPackage(input());
  for(const field of ['html','to','text','image','alt','hash']){
    const modified=structuredClone(original);
    if(field==='image')modified.message.attachments[0].content=modified.message.attachments[0].content.replace('iVB','aVB');
    else if(field==='alt')modified.panels[0].alt='Different';
    else if(field==='hash')modified.hash='0'.repeat(64);
    else modified.message[field]+='changed';
    assert.equal(await verifyBrandPackage(modified),false,field);
  }
});

test('brand package rejects arbitrary fields, duplicate slots and noncanonical raster content',async()=>{
  for(const fault of ['html','duplicate','svg','base64','large','header','url']){
    const value=input();
    if(fault==='html')value.html='<script></script>';
    if(fault==='duplicate')value.panels[4].slot='header';
    if(fault==='svg')value.panels[0].type='image/svg+xml';
    if(fault==='base64')value.panels[0].content+='\n';
    if(fault==='large')value.panels[0].content='A'.repeat(1500000);
    if(fault==='header')value.subject+='\r\nBcc: somebody@example.com';
    if(fault==='url')value.actionUrl='https://evil.example/';
    await assert.rejects(buildBrandPackage(value),/invalid/);
  }
});

test('canonical approval survives input property order and owns a detached snapshot',async()=>{
  const value=input(), original=await buildBrandPackage(value);
  const reordered=await buildBrandPackage({panels:value.panels,subject:value.subject,to:value.to});
  assert.equal(original.hash,reordered.hash);
  value.panels[0].alt='changed after preparation';
  assert.equal(await verifyBrandPackage(original),true);
  assert.equal(Object.isFrozen(original.message.attachments[0]),true);
});

test('private preview embeds exact raster bytes without navigable links or network content',async()=>{
  const pack=await buildBrandPackage(input()),response=await brandPreview(pack);
  const html=await response.text();
  assert.match(html,/data:image\/png;base64,iVBOR/);
  assert.doesNotMatch(html,/href=|cid:|<script/);
  assert.match(response.headers.get('Content-Security-Policy'),/default-src 'none'/);
  assert.match(response.headers.get('Content-Security-Policy'),/sandbox/);
  assert.equal(response.headers.get('Cache-Control'),'no-store');
  const changed=structuredClone(pack);changed.message.html='<script>bad()</script>';
  await assert.rejects(brandPreview(changed),/invalid/);
});
