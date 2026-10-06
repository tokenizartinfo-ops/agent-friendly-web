import test from 'node:test';
import assert from 'node:assert/strict';
import { mailReviewPage } from '../lib/mail-review-page.mjs';
import { runInNewContext } from 'node:vm';
test('private review shell keeps mail out of HTML and confines requests to same origin',async()=>{
  const response=mailReviewPage('reply-1');
  assert.equal(response.headers.get('Cache-Control'),'no-store');
  const html=await response.text();
  assert.match(html,/textContent/);
  assert.doesNotMatch(html,/innerHTML|https?:\/\//);
  assert.match(html,/Aprobar este mensaje/);
  assert.match(html,/Retirar permiso/);
  assert.match(response.headers.get('Content-Security-Policy'),/connect-src 'self'/);
  assert.match(html,/no confirma su envío/i);
});
test('invalid opaque key cannot enter page markup',()=>{
  assert.throws(()=>mailReviewPage('<script>alert(1)</script>'));
});
test('review interaction displays hostile text inertly and does not retry a failed approval',async()=>{
  const html=await mailReviewPage('reply-1').text();
  const nodes=Object.fromEntries(['status','message','to','subject','text','approve','revoke','refresh'].map(id=>[id,{disabled:false,hidden:true,textContent:''}]));
  const calls=[];
  runInNewContext(html.match(/<script nonce="[^"]+">([\s\S]*?)<\/script>/)[1],{
    document:{getElementById:id=>nodes[id]},
    fetch:async(path,options)=>{calls.push({path,options});return path.startsWith('/review/')?{ok:true,json:async()=>({state:'draft',contentHash:'a'.repeat(64),content:{to:'own@example.com',subject:'<img onerror=alert(1)>',text:'<script>secret()</script>'}})}:{ok:false};},
  });
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(nodes.subject.textContent,'<img onerror=alert(1)>');
  assert.equal(nodes.approve.disabled,false);
  assert.equal(nodes.revoke.disabled,true);
  await nodes.approve.onclick();
  assert.equal(calls.filter(x=>x.path==='/approve').length,1);
  assert.equal(JSON.parse(calls[1].options.body).contentHash,'a'.repeat(64));
  assert.equal(nodes.approve.disabled,true);
  assert.match(nodes.status.textContent,/No pude confirmar/);
});

test('brand review cannot approve when its exact visual preview cannot be loaded',async()=>{
  const html=await mailReviewPage('reply-1').text();
  const nodes=Object.fromEntries(['status','message','to','subject','text','preview','brand-note','approve','revoke','refresh'].map(id=>[id,{disabled:false,hidden:true,textContent:'',removeAttribute(){}}]));
  const calls=[];
  runInNewContext(html.match(/<script nonce="[^"]+">([\s\S]*?)<\/script>/)[1],{
    document:{getElementById:id=>nodes[id]},
    fetch:async path=>{calls.push(path);return path.startsWith('/review/')?{ok:true,json:async()=>({state:'draft',contentHash:'a'.repeat(64),content:{to:'own@example.com',subject:'Own',text:'Alternative',brand:{version:'afw-comic-panels-v1'}}})}:{ok:false};},
  });
  await new Promise(resolve=>setImmediate(resolve));
  assert.deepEqual(calls,['/review/reply-1','/preview/reply-1']);
  assert.equal(nodes.approve.disabled,true);
  assert.equal(nodes.preview.hidden,true);
  assert.match(nodes.status.textContent,/No pude confirmar/);
});
