import {preparationComicAssetResponse} from '../lib/preparation-comic-font.mjs';
import {observePreparationComicGlyphs} from './lib/check-preparation-comic-glyphs.mjs';
// Synthetic UI acceptance ONLY in an ephemeral GitHub Actions runner.
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {renderPreparationConsentView,renderPreparationConnectionSummary,renderPreparationConnectionsView,PREPARATION_CONSENT_STYLE} from '../lib/delegated-preparation-consent-view.mjs';

const toolRoot=process.env.AFW_BROWSER_TOOLS,runnerTemp=process.env.RUNNER_TEMP;
assert.ok(toolRoot&&runnerTemp&&path.isAbsolute(toolRoot),'runner tool directory is required');
const root=path.resolve(toolRoot),temp=path.resolve(runnerTemp);
assert.ok(root.startsWith(temp+path.sep),'browser package stays in runner temp');
const pkg=JSON.parse(await readFile(path.join(root,'node_modules/playwright/package.json'),'utf8'));
assert.equal(pkg.version,'1.64.1');
const {chromium}=await import(pathToFileURL(path.join(root,'node_modules/playwright/index.mjs')).href);
const T=Date.UTC(2026,9,20),handle='synthetic_ci_handle_0123456789',nonce='synthetic_style_nonce_0123456789';
const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
const languages=['es','en','pt'],modes=['drafts','read','expired','paused','escaped','connection','connections','connections-empty','connections-unavailable'];
function input(locale,mode){
 return {locale,projectName:mode==='escaped'?'<img src=x onerror="bad()">':'AFW · expediente sintético',
  clientName:'Asistente de ensayo',siteHost:'example.invalid',handle,styleNonce:nonce,
  policy:{enabled:mode!=='paused',requestedScopes:mode==='read'?[READ]:[READ,DRAFTS],
   transactionStartedAt:T,transactionExpiresAt:T+300000,trialStartedAt:T,trialExpiresAt:T+600000},
  clock:{now:mode==='expired'?T+300000:T+1000}};
}
// Fixed presentation DTOs, not live authorization or elapsed production time.
const connectionIds={active:'synthetic-active-0123456789',expired:'synthetic-expired-0123456789',retired:'synthetic-retired-0123456789'};
const connectionClient='Asistente de prueba <img src=x onerror="bad()"> — acompañamiento amable para revisar permisos';
function connectionView(locale,mode){
 const entries=mode==='connections-empty'||mode==='connections-unavailable'?[]:[
  {grantId:connectionIds.active,scopes:[READ],status:'active',expiresAt:T+300000},
  {grantId:connectionIds.expired,scopes:[READ,DRAFTS],status:'expired',expiresAt:T-1000},
  {grantId:connectionIds.retired,scopes:[READ],status:'revoked',expiresAt:T+300000},
 ];
 return renderPreparationConnectionsView({code:mode==='connections-unavailable'?'unavailable':'view_ready',
  locale,clientName:connectionClient,entries,handle,styleNonce:nonce,managementExpiresAt:T+600000});
}
const posts=[],connectionPosts=[],errors=[],external=[];
const server=createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://127.0.0.1');
 const asset=preparationComicAssetResponse(new Request('http://127.0.0.1'+req.url,{method:req.method}));
 if(asset){res.writeHead(asset.status,Object.fromEntries(asset.headers));res.end(Buffer.from(await asset.arrayBuffer()));return;}
  if(req.method==='GET'&&url.pathname==='/favicon.ico'){res.writeHead(204).end();return;}
  if(req.method==='POST'&&url.pathname==='/connections/revoke'){
   let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body,'utf8')>4096)throw Error('body bound');}
   const form=new URLSearchParams(body);assert.deepEqual([...form.keys()].sort(),['grant','handle']);
   assert.equal(form.get('handle'),handle);assert.ok([connectionIds.active,connectionIds.expired].includes(form.get('grant')));
   connectionPosts.push(form.get('grant'));
   res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
   res.end('<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Synthetic withdrawal receipt</title></head><body><main>received:'+form.get('grant')+'</main></body></html>');return;
  }
  if(req.method==='POST'&&url.pathname==='/authorize'){
   let body='';for await(const chunk of req){body+=chunk;if(body.length>4096)throw Error('body bound');}
   const form=new URLSearchParams(body);
   assert.deepEqual([...form.keys()].sort(),['decision','handle']);
   assert.equal(form.get('handle'),handle);assert.ok(['read','drafts','cancel'].includes(form.get('decision')));
   posts.push(form.get('decision'));
   res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
   res.end('<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Synthetic receipt</title></head><body><main>received:'+form.get('decision')+'</main></body></html>');return;
  }
  if(req.method!=='GET'||url.pathname!=='/'){res.writeHead(404).end();return;}
  const locale=url.searchParams.get('lang')??'es',mode=url.searchParams.get('mode')??'drafts';
  assert.ok(languages.includes(locale)&&modes.includes(mode));
  if(mode.startsWith('connections')){
   const view=connectionView(locale,mode);res.writeHead(view.status,view.headers);res.end(view.html);return;
  }
  const view=renderPreparationConsentView(input(locale,mode));
  if(mode==='connection'){
   const summary=renderPreparationConnectionSummary({locale,projectName:'AFW · expediente sintético',clientName:'Asistente de ensayo',
    scopes:[READ,DRAFTS],status:'revoked',expiresAt:T+300000});
   res.writeHead(200,view.headers);
   res.end('<!doctype html><html lang="'+locale+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>AFW</title><style nonce="'+nonce+'">'+PREPARATION_CONSENT_STYLE+'</style></head><body><main>'+summary.html+'</main></body></html>');return;
  }
  res.writeHead(view.status,view.headers);res.end(view.html);
 }catch{errors.push('synthetic_server_failure');res.writeHead(500).end('synthetic failure');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port,out='output/playwright';
await mkdir(out,{recursive:true});
let browser;const checks=[];
try{
 browser=await chromium.launch({headless:true});
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
  for(const locale of languages){
   const context=await browser.newContext({viewport,reducedMotion:'reduce'});
   try{
    await context.route('**/*',route=>{
     if(new URL(route.request().url()).origin===origin)return route.continue();
     external.push('blocked_external_request');return route.abort();
    });
    const page=await context.newPage();page.setDefaultTimeout(8000);
    page.on('pageerror',()=>errors.push('page_error'));
    page.on('console',msg=>{if(msg.type()==='error')errors.push('console_error');});
    // Expected 404 closed-state responses are tested separately without treating
    // their network status console diagnostic as a script/runtime failure.
    await page.goto(origin+'/?lang='+locale+'&mode=drafts');
    const glyphSamples=await Promise.all(['h1','p.guide','button'].map(selector=>observePreparationComicGlyphs(page,selector)));
    assert.equal(await page.locator('html').getAttribute('lang'),locale);
    assert.deepEqual(await page.locator('button').evaluateAll(nodes=>nodes.map(n=>n.value)),['read','drafts','cancel']);
    assert.equal(await page.locator('[checked],[selected],[autofocus]').count(),0);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true);
    assert.equal(await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),true);
    const rectangles=await page.locator('button').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};}));
    for(let i=0;i<rectangles.length;i++){
     const r=rectangles[i];assert.ok(r.h>=48&&r.w>=44&&r.x>=0&&r.x+r.w<=viewport.width+1);
     for(const s of rectangles.slice(i+1))assert.ok(r.x+r.w<=s.x||s.x+s.w<=r.x||r.y+r.h<=s.y||s.y+s.h<=r.y);
    }
    const sequence=[];
    for(let i=0;i<5;i++){
     await page.keyboard.press('Tab');
     sequence.push(await page.evaluate(()=>document.activeElement.getAttribute('data-focus')||document.activeElement.value));
    }
    assert.deepEqual(sequence,['skip','read','drafts','cancel','back']);
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(()=>document.activeElement.value),'cancel');
    assert.equal(await page.locator('button[value="cancel"]').evaluate(n=>getComputedStyle(n).outlineStyle),'solid');
    await page.screenshot({path:out+'/'+locale+'-'+viewport.width+'-consent.png',fullPage:true});
    await Promise.all([page.waitForURL(origin+'/authorize'),page.locator('button[value="read"]').click()]);
    assert.equal(await page.locator('main').textContent(),'received:read');
    checks.push({locale,width:viewport.width,case:'layout_keyboard_read_post',glyphSamples,passed:true});
   }finally{await context.close();}
  }
 }
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
  for(const locale of languages){
   const context=await browser.newContext({viewport,reducedMotion:'reduce'});
   try{
    await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():(external.push('blocked_external_request'),route.abort()));
    const page=await context.newPage();page.setDefaultTimeout(8000);
    page.on('pageerror',()=>errors.push('connections_page_error'));
    page.on('console',msg=>{if(msg.type()==='error')errors.push('connections_console_error');});
    const response=await page.goto(origin+'/?lang='+locale+'&mode=connections');assert.equal(response.status(),200);
    assert.equal(await page.locator('html').getAttribute('lang'),locale);
    assert.equal(await page.locator('img,script').count(),0);
    assert.ok((await page.locator('body').textContent()).includes(connectionClient));
    assert.equal(await page.locator('h2').count(),3);
    assert.equal(await page.locator('form').count(),2);
    assert.deepEqual(await page.locator('input[name="grant"]').evaluateAll(nodes=>nodes.map(n=>n.value)),[connectionIds.active,connectionIds.expired]);
    for(const form of await page.locator('form').all()){
     assert.equal(await form.getAttribute('method'),'post');assert.equal(await form.getAttribute('action'),'/connections/revoke');
     assert.deepEqual(await form.locator('input').evaluateAll(nodes=>nodes.map(n=>[n.type,n.name])),[['hidden','handle'],['hidden','grant']]);
    }
    assert.equal(await page.locator('[checked],[selected],[autofocus]').count(),0);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    // Computed family verifies declared/inherited branding, not installed glyph font.
    assert.equal(await page.locator('body,body *').evaluateAll(nodes=>nodes.filter(n=>{
     const r=n.getBoundingClientRect();return r.width>0&&r.height>0&&[...n.childNodes].some(c=>c.nodeType===3&&c.textContent.trim());
    }).every(n=>getComputedStyle(n).fontFamily.includes('Comic'))),true);
    const rects=await page.locator('button').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};}));
    for(let i=0;i<rects.length;i++){
     const r=rects[i];assert.ok(r.h>=48&&r.w>=44&&r.x>=0&&r.x+r.w<=viewport.width+1);
     for(const next of rects.slice(i+1))assert.ok(r.x+r.w<=next.x||next.x+next.w<=r.x||r.y+r.h<=next.y||next.y+next.h<=r.y);
    }
    const focus=[];
    for(let i=0;i<4;i++){
     await page.keyboard.press('Tab');focus.push(await page.evaluate(()=>{
      const el=document.activeElement;return el.getAttribute('data-focus')||el.closest('form')?.querySelector('[name="grant"]').value;
     }));
    }
    assert.deepEqual(focus,['skip',connectionIds.active,connectionIds.expired,'back']);
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.locator('button').nth(1).evaluate(n=>getComputedStyle(n).outlineStyle),'solid');
    await page.screenshot({path:out+'/'+locale+'-'+viewport.width+'-connections.png',fullPage:true});
    await Promise.all([page.waitForURL(origin+'/connections/revoke'),page.locator('button').first().click()]);
    assert.equal(await page.locator('main').textContent(),'received:'+connectionIds.active);
    checks.push({locale,width:viewport.width,case:'connections_layout_keyboard_branding_active_post',glyphSamples,passed:true});
   }finally{await context.close();}
  }
 }
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 try{
  await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():(external.push('blocked_external_request'),route.abort()));
  const page=await context.newPage();page.setDefaultTimeout(8000);page.on('pageerror',()=>errors.push('page_error'));
  for(const [mode,decision] of [['drafts','drafts'],['read','cancel']]){
   await page.goto(origin+'/?lang=es&mode='+mode);
   if(mode==='read')assert.deepEqual(await page.locator('button').evaluateAll(nodes=>nodes.map(n=>n.value)),['read','cancel']);
   await Promise.all([page.waitForURL(origin+'/authorize'),page.locator('button[value="'+decision+'"]').click()]);
   assert.equal(await page.locator('main').textContent(),'received:'+decision);
  }
  for(const mode of ['expired','paused']){
   await page.goto(origin+'/?lang=es&mode='+mode);assert.equal(await page.locator('form,input,button').count(),0);
   assert.equal(await page.locator('body').textContent().then(s=>s.includes('AFW · expediente sintético')),false);
   await page.screenshot({path:out+'/es-390-'+mode+'.png',fullPage:true});
  }
  await page.goto(origin+'/?lang=es&mode=escaped');assert.equal(await page.locator('img,script').count(),0);
  assert.ok((await page.locator('body').textContent()).includes('<img src=x onerror="bad()">'));
  await page.goto(origin+'/?lang=es&mode=connection');assert.equal(await page.locator('form,input,button').count(),0);
  assert.ok((await page.locator('body').textContent()).includes('Resumen y preparación de borradores'));
  await page.screenshot({path:out+'/es-390-connection.png',fullPage:true});
  checks.push({locale:'es',width:390,case:'draft_cancel_closed_escaped_summary',passed:true});
  await page.goto(origin+'/?lang=es&mode=connections');
  await Promise.all([page.waitForURL(origin+'/connections/revoke'),page.locator('button').nth(1).click()]);
  assert.equal(await page.locator('main').textContent(),'received:'+connectionIds.expired);
  for(const mode of ['connections-empty','connections-unavailable']){
   const response=await page.goto(origin+'/?lang=es&mode='+mode);
   assert.equal(response.status(),mode==='connections-empty'?200:404);
   assert.equal(await page.locator('form,input,button,img,script').count(),0);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   await page.screenshot({path:out+'/es-390-'+mode+'.png',fullPage:true});
  }
  checks.push({locale:'es',width:390,case:'connections_expired_post_empty_unavailable',passed:true});
 }finally{await context.close();}
 assert.equal(posts.filter(x=>x==='read').length,6);assert.equal(posts.filter(x=>x==='drafts').length,1);assert.equal(posts.filter(x=>x==='cancel').length,1);
 assert.equal(connectionPosts.filter(x=>x===connectionIds.active).length,6);
 assert.equal(connectionPosts.filter(x=>x===connectionIds.expired).length,1);
 assert.equal(connectionPosts.includes(connectionIds.retired),false);
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 const report={contract:'agentfriendly.preparation-view-qa.v1',sourceRevision:process.env.AFW_QA_REVISION??null,
  browser:browser.version(),playwright:pkg.version,checks,postCounts:{read:6,drafts:1,cancel:1,withdrawActive:6,withdrawExpired:1},
  connections:{presentationOnly:true,declaredFontPolicyOnly:false,glyphSamplesVerified:true,liveAuthorization:false,humanPixelReview:false},
  pageErrors:errors.length,externalRequests:external.length,syntheticOnly:true,productionConsent:false,operationalReadiness:false};
 await writeFile(out+'/receipt.json',JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({checks:checks.length,postCounts:report.postCounts,pageErrors:0,externalRequests:0,syntheticOnly:true}));
}finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}