import {preparationComicAssetResponse} from '../lib/preparation-comic-font.mjs';
import {observePreparationComicGlyphs} from './lib/check-preparation-comic-glyphs.mjs';
// Synthetic presentation QA in an ephemeral GitHub Actions runner only.
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {renderPreparationSourceSessionView} from '../lib/preparation-source-session-view.mjs';
const root=path.resolve(process.env.AFW_BROWSER_TOOLS??''),temp=path.resolve(process.env.RUNNER_TEMP??'');
assert.ok(process.env.AFW_BROWSER_TOOLS&&process.env.RUNNER_TEMP&&root.startsWith(temp+path.sep),'runner temp tools required');
const pkg=JSON.parse(await readFile(path.join(root,'node_modules/playwright/package.json'),'utf8'));assert.equal(pkg.version,'1.64.1');
const {chromium}=await import(pathToFileURL(path.join(root,'node_modules/playwright/index.mjs')).href);

/** Read actual glyph use in this synthetic Chromium page. A CSS font-family
 * declaration alone is not evidence that the corresponding font rendered.
 * This samples only the guide paragraph, never certifies the whole corpus. */
const modes=['bootstrap','pinned','400','401','403','404','405','410','429','503'],errors=[],external=[],checks=[];
const server=createServer(async(req,res)=>{
 const url=new URL(req.url,'http://127.0.0.1');
 const asset=preparationComicAssetResponse(new Request('http://127.0.0.1'+req.url,{method:req.method}));
 if(asset){res.writeHead(asset.status,Object.fromEntries(asset.headers));res.end(Buffer.from(await asset.arrayBuffer()));return;}
 if(url.pathname==='/favicon.ico'){res.writeHead(204).end();return;}
 const mode=url.searchParams.get('mode');if(req.method!=='GET'||url.pathname!=='/'||!modes.includes(mode)){res.writeHead(404).end();return;}
 const status=['bootstrap','pinned'].includes(mode)?200:Number(mode);
 const view=renderPreparationSourceSessionView({status,expiresAt:Date.UTC(2026,9,22,15),serverSubjectPinned:mode==='pinned',styleNonce:'a'.repeat(48)});
 res.writeHead(status,{...view.headers,'Cache-Control':'no-store'});res.end(view.html);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port,out=path.resolve('output/playwright/source-session');
await mkdir(out,{recursive:true});let browser;
try{
 browser=await chromium.launch();
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
  const context=await browser.newContext({viewport,reducedMotion:'reduce'}),page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  page.on('request',request=>{if(!request.url().startsWith(origin+'/'))external.push(request.url());});
  for(const mode of modes){
   const response=await page.goto(origin+'/?mode='+mode,{waitUntil:'networkidle'});
   const expected=['bootstrap','pinned'].includes(mode)?200:Number(mode);
   assert.equal(response.status(),expected);assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('script,form,button,img').count(),0);
   assert.equal(await page.locator('.back').getAttribute('href'),'https://agentfriendlyweb.dev/expediente');
   const layout=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,
    font:getComputedStyle(document.body).fontFamily,paper:getComputedStyle(document.body).backgroundColor,
    reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,animation:getComputedStyle(document.querySelector('main')).animationName}));
   assert.ok(layout.scroll<=layout.width,mode+' overflow '+viewport.width);
   assert.match(layout.font,/Comic Sans MS/);assert.equal(layout.paper,'rgb(243, 234, 219)');assert.equal(layout.reduced,true);assert.equal(layout.animation,'none');
   if(expected===200){assert.equal(await page.locator('ol li').count(),3);assert.match(await page.locator('main').innerText(),/no crea un expediente ni conecta a tu asistente/);}
   if(mode==='410')assert.match(await page.locator('h1').innerText(),/Esta prueba está en pausa/);
   await page.keyboard.press('Tab');assert.equal(await page.locator('.skip').evaluate(el=>el===document.activeElement),true);
   await page.keyboard.press('Enter');assert.equal(await page.locator('main').evaluate(el=>el===document.activeElement),true);
   await page.keyboard.press('Tab');assert.equal(await page.locator('.back').evaluate(el=>el===document.activeElement),true);
   let screenshot=null;
   if(['bootstrap','pinned','410'].includes(mode)){screenshot=mode+'-'+viewport.width+'.png';await page.screenshot({path:path.join(out,screenshot),fullPage:true});}
   const glyphSample=await observePreparationComicGlyphs(page,'p.guide');
   const headingGlyphs=await observePreparationComicGlyphs(page,'h1');
   assert.equal(glyphSample.comicFamilyObserved,true,'guide must render comic glyphs on a runner without installed comic fonts');
   checks.push({mode,status:response.status(),viewport,overflow:false,declaredComicFontStack:true,glyphSample,headingGlyphs,keyboard:true,reducedMotion:true,screenshot});
  }
  await context.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 const receipt={contract:'afw.preparation-source-session-ui-qa.v1',sourceRevision:process.env.AFW_QA_REVISION,
  synthetic:true,checks,fontEvidenceScope:'guide paragraph in the current synthetic Chromium runner only',comicCorpusCertified:false,
  errors:errors.length,externalRequests:external.length,actualAuthorization:false,operationalReadiness:false};
 assert.match(receipt.sourceRevision,/^[a-f0-9]{40}$/);
 await writeFile(path.join(out,'receipt.json'),JSON.stringify(receipt,null,2)+'\n');
 console.log(JSON.stringify({checks:checks.length,screenshots:checks.filter(x=>x.screenshot).length,
  sampledFontFamilies:[...new Set(checks.flatMap(check=>check.glyphSample.families))].sort(),
  comicGuideSamples:checks.filter(check=>check.glyphSample.comicFamilyObserved).length,comicCorpusCertified:false,
  errors:0,externalRequests:0,operationalReadiness:false}));
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
