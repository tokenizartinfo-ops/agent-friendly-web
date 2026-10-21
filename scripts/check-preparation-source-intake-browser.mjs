import {preparationComicAssetResponse} from '../lib/preparation-comic-font.mjs';
import {observePreparationComicGlyphs} from './lib/check-preparation-comic-glyphs.mjs';
// Synthetic renderer/HTML behavior QA ONLY, runner-local HTTP, no live identity/DB.
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {renderPreparationSourceIntakeView} from '../lib/preparation-source-intake-view.mjs';
const root=path.resolve(process.env.AFW_BROWSER_TOOLS??''),temp=path.resolve(process.env.RUNNER_TEMP??'');
assert.ok(process.env.AFW_BROWSER_TOOLS&&process.env.RUNNER_TEMP&&root.startsWith(temp+path.sep),'runner temp only');
assert.equal(JSON.parse(await readFile(path.join(root,'node_modules/playwright/package.json'),'utf8')).version,'1.64.1');
const {chromium}=await import(pathToFileURL(path.join(root,'node_modules/playwright/index.mjs')).href);
const csrf='a'.repeat(64)+'.'+'b'.repeat(64),nonce='a'.repeat(48),site='https://agentfriendlyweb.dev';
const modes={form_ready:200,source_created:200,source_already_recorded:200,source_not_recorded:200,source_conflict:409,unknown_ack:503,
 source_request_denied:403,source_paused:410,escaped:200};
const posts=[],errors=[],external=[],checks=[];
function view(code,organization='Agent Friendly Web'){
 const status=modes[code]??200;
 return {status,rendered:renderPreparationSourceIntakeView({status,code:code==='escaped'?'form_ready':code,
  styleNonce:nonce,csrfToken:csrf,website:site,organization,expiresAt:Date.UTC(2026,9,22,15),
  projectRef:['source_created','source_already_recorded'].includes(code)?'project-'+'1'.repeat(64):null})};
}
const server=createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://127.0.0.1');
 const asset=preparationComicAssetResponse(new Request('http://127.0.0.1'+req.url,{method:req.method}));
 if(asset){res.writeHead(asset.status,Object.fromEntries(asset.headers));res.end(Buffer.from(await asset.arrayBuffer()));return;}
  if(url.pathname==='/favicon.ico'){res.writeHead(204).end();return;}
  let result;
  if(req.method==='GET'&&url.pathname==='/'&&Object.hasOwn(modes,url.searchParams.get('mode'))){
   const mode=url.searchParams.get('mode');
   result=view(mode,mode==='escaped'?'<img src=x onerror="bad()"> '+ 'Organización '.repeat(10):'Agent Friendly Web');
  }else if(req.method==='POST'&&url.pathname==='/source/new'){
   let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>4096)throw Error('bound');}
   const f=new URLSearchParams(raw);assert.equal(f.get('csrf'),csrf);assert.equal(f.get('website'),site);
   assert.ok(['save','inspect'].includes(f.get('decision')));posts.push({decision:f.get('decision'),confirmed:f.get('confirmCreate')==='yes'});
   result=view(f.get('decision')==='inspect'?'source_not_recorded':f.get('confirmCreate')==='yes'?'source_created':'source_request_invalid',f.get('organization'));
   if(f.get('decision')==='save'&&f.get('confirmCreate')!=='yes'){
    result={status:400,rendered:renderPreparationSourceIntakeView({status:400,code:'source_request_invalid',styleNonce:nonce})};
   }
  }else{res.writeHead(404).end();return;}
  res.writeHead(result.status,{...result.rendered.headers,'Cache-Control':'no-store'});res.end(result.rendered.html);
 }catch{res.writeHead(500).end('Synthetic check failed');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port,out=path.resolve('output/playwright/source-intake');
await mkdir(out,{recursive:true});let browser;
try{
 browser=await chromium.launch();
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
  const context=await browser.newContext({viewport,reducedMotion:'reduce'}),page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith(origin+'/'))external.push(r.url());});
  for(const [mode,status]of Object.entries(modes)){
   const response=await page.goto(origin+'/?mode='+mode,{waitUntil:'networkidle'});assert.equal(response.status(),status);
   const glyphSamples=await Promise.all(['h1','p.guide',...(status===200?['label','button']:[])].map(selector=>observePreparationComicGlyphs(page,selector)));
   const layout=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,font:getComputedStyle(document.body).fontFamily,
    reduced:matchMedia('(prefers-reduced-motion: reduce)').matches}));
   assert.equal(layout.overflow,false);assert.match(layout.font,/Comic Sans MS/);assert.equal(layout.reduced,true);
   assert.equal(await page.locator('script,img').count(),0);
   if(status===200){
    assert.equal(await page.locator('form').count(),1);assert.equal(await page.locator('[name=confirmCreate]').isChecked(),false);
    assert.equal(await page.locator('#source-site').evaluate(el=>el.readOnly),true);
    assert.equal(await page.locator('[value=inspect]').evaluate(el=>el.formNoValidate),true);
   }else{assert.equal(await page.locator('form').count(),0);assert.ok(!(await page.content()).includes(csrf));}
   await page.keyboard.press('Tab');assert.equal(await page.locator('.skip').evaluate(el=>el===document.activeElement),true);
   await page.keyboard.press('Enter');assert.equal(await page.locator('main').evaluate(el=>el===document.activeElement),true);
   if(status===200){
    for(const selector of ['#source-site','#source-org','[name=confirmCreate]','button[value=save]','button[value=inspect]']){
     await page.keyboard.press('Tab');assert.equal(await page.locator(selector).evaluate(el=>el===document.activeElement),true,selector);
    }
   }
   let screenshot=null;if(['form_ready','unknown_ack','escaped'].includes(mode)){screenshot=mode+'-'+viewport.width+'.png';await page.screenshot({path:path.join(out,screenshot),fullPage:true});}
   checks.push({mode,status,viewport,overflow:false,glyphSamples,keyboard:true,reducedMotion:true,screenshot});
  }
  await page.goto(origin+'/?mode=form_ready');const before=posts.length;
  await page.locator('button[value=save]').click();await page.waitForTimeout(100);
  assert.equal(posts.length,before,'unchecked save must be stopped by native required validation');
  assert.equal(await page.locator('[name=confirmCreate]').evaluate(el=>el.checkValidity()),false);
  await Promise.all([page.waitForURL(origin+'/source/new'),page.locator('button[value=inspect]').click()]);
  assert.equal(posts.at(-1).decision,'inspect');assert.equal(posts.at(-1).confirmed,false);
  assert.equal(await page.locator('[data-result-code]').getAttribute('data-result-code'),'source_not_recorded');
  await page.goto(origin+'/?mode=form_ready');await page.locator('[name=confirmCreate]').check();
  await Promise.all([page.waitForURL(origin+'/source/new'),page.locator('button[value=save]').click()]);
  assert.deepEqual(posts.at(-1),{decision:'save',confirmed:true});
  assert.equal(await page.locator('[data-result-code]').getAttribute('data-result-code'),'source_created');
  await context.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 const receipt={contract:'afw.preparation-source-intake-browser.v1',sourceRevision:process.env.AFW_QA_REVISION,syntheticOnly:true,
  checks,posts,errors:0,externalRequests:0,sourceRowsCreated:false,actualAuthorization:false,operationalReadiness:false};
 assert.match(receipt.sourceRevision,/^[a-f0-9]{40}$/);
 await writeFile(path.join(out,'receipt.json'),JSON.stringify(receipt,null,2)+'\n');
 console.log(JSON.stringify({checks:checks.length,screenshots:checks.filter(x=>x.screenshot).length,posts:posts.length,
  pageErrors:0,externalRequests:0,syntheticOnly:true,operationalReadiness:false}));
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
