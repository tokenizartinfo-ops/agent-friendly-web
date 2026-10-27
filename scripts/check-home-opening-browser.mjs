// QA only: current branch compiled home in an ephemeral GitHub runner.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawn,execFileSync} from 'node:child_process';
import {connect as connectSocket} from 'node:net';
import {mkdir,readFile,readdir,realpath,stat,writeFile,lstat} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const e=process.env,SOURCE=e.AFW_QA_REVISION;
assert.equal(e.GITHUB_ACTIONS,'true');assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');
assert.match(SOURCE??'',/^[a-f0-9]{40}$/);
assert.equal(execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),SOURCE);
for(const key of ['CLOUDFLARE_API_TOKEN','CLOUDFLARE_API_KEY','CF_API_TOKEN','GH_TOKEN','GITHUB_TOKEN']) assert.ok(!e[key],'no cloud/admin credential in preview step');
const temp=await realpath(e.RUNNER_TEMP),root=await realpath('dist');
const out=path.resolve('output/playwright/home-opening');await mkdir(out,{recursive:true});
const sha=(x)=>createHash('sha256').update(x).digest('hex');
const entry=path.join(root,'server/index.js'),assets=path.join(root,'client');
assert.ok((await stat(entry)).isFile());assert.ok((await stat(assets)).isDirectory());
let total=0;
async function inventory(dir,rows=[]){
 for(const name of (await readdir(dir)).sort()){
  const file=path.join(dir,name),s=await lstat(file);
  assert.ok(!s.isSymbolicLink(),'no artifact symlink');
  if(s.isDirectory())await inventory(file,rows);
  else{assert.ok(s.isFile()&&s.size<=8388608);total+=s.size;assert.ok(total<=67108864);
   rows.push({path:path.relative(root,file).split(path.sep).join('/'),bytes:s.size,sha256:sha(await readFile(file))});assert.ok(rows.length<=1024);}
 }return rows;
}
const before=await inventory(root);
const sourceProof={kind:'compiled_home_opening_preview',sourceRevision:SOURCE,
 files:before.length,uncompressedBytes:total,
 productionAcceptance:false,authenticationAcceptance:false,operationalReadiness:false};
await writeFile(path.join(out,'artifact-inventory.json'),JSON.stringify({...sourceProof,inventory:before},null,2));
console.log(JSON.stringify({...sourceProof,preflight:true}));

const tools=await realpath(e.AFW_BROWSER_TOOLS);assert.ok(tools.startsWith(temp+path.sep));
assert.equal(JSON.parse(await readFile(path.join(tools,'node_modules/playwright/package.json'),'utf8')).version,'1.64.1');
const {chromium}=await import(pathToFileURL(path.join(tools,'node_modules/playwright/index.mjs')).href);
const {HOME_VALUE_COPY,COMIC_HOME_COPY}=await import('../lib/home-copy.mjs');
const {localizedPath}=await import('../lib/site-i18n.mjs');
const work=path.join(temp,'afw-home-opening-native');await mkdir(work,{recursive:true});
const config=path.join(work,'preview.json');
await writeFile(config,JSON.stringify({
 name:'afw-home-opening-ci',main:entry,compatibility_date:'2026-09-01',
 compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],no_bundle:true,find_additional_modules:true,
 rules:[{type:'ESModule',globs:['**/*.js','**/*.mjs'],fallthrough:true}],
 assets:{directory:assets,binding:'ASSETS',run_worker_first:false,not_found_handling:'none'},
 d1_databases:[{binding:'DB',database_name:'afw-copy-preview-local',database_id:'00000000-0000-4000-8000-000000000528'}],
 dev:{ip:'127.0.0.1',port:8896},
},null,2));
const childEnv={PATH:e.PATH,HOME:e.HOME,TMPDIR:temp,CI:'true',NO_COLOR:'1',WRANGLER_SEND_METRICS:'false',XDG_CONFIG_HOME:path.join(work,'empty-cli-config')};
const cli=path.resolve('node_modules/wrangler/bin/wrangler.js');
const native=spawn(process.execPath,[cli,'dev','--local','--config',config,'--ip','127.0.0.1','--port','8896','--no-bundle','--log-level','warn','--persist-to',path.join(work,'state')],{cwd:work,env:childEnv,stdio:['ignore','pipe','pipe']});
let nativeLog='',nativeError=null,exited=false;
const collect=b=>{nativeLog=(nativeLog+b.toString()).slice(-24000);};
native.stdout.on('data',collect);native.stderr.on('data',collect);
native.on('error',x=>{nativeError=x;});native.on('exit',()=>{exited=true;});
const base='http://127.0.0.1:8896',pause=ms=>new Promise(r=>setTimeout(r,ms));
const captures=[],cases=[],errors=[],blocked=[],httpErrors=[],visibilityFailures=[],geometry=[];let browser;
const capture=async(page,name)=>{const file=name+'.jpg';await page.screenshot({path:path.join(out,file),type:'jpeg',quality:76,fullPage:false});captures.push(file);};
try{
 const until=Date.now()+45000;let ready=false;
 while(Date.now()<until){
  if(nativeError)throw nativeError;if(exited)throw Error('native preview exited before readiness');
  try{const r=await fetch(base+'/',{redirect:'manual',signal:AbortSignal.timeout(2000)});await r.body?.cancel();if(r.status===200){ready=true;break;}}catch{}
  await pause(200);
 }
 assert.ok(ready,'compiled native preview must return public HTML');
 browser=await chromium.launch({headless:true,env:childEnv});
 for(const viewport of [{width:1440,height:900},{width:390,height:844},{width:621,height:900},{width:768,height:1024},{width:820,height:1180},{width:961,height:900}]){
  for(const locale of ['es','en','pt']){
   const context=await browser.newContext({viewport,reducedMotion:'reduce',serviceWorkers:'block'});
   await context.route('**/*',async route=>{
    const req=route.request(),u=new URL(req.url());
    if((u.origin===base||u.protocol==='data:')&&req.method()==='GET')return route.continue();
    blocked.push({method:req.method(),origin:u.origin,path:u.pathname});return route.abort();
   });
   const page=await context.newPage();
   page.on('pageerror',x=>errors.push(String(x).slice(0,350)));
   page.on('console',m=>{if(m.type()==='error')errors.push(m.text().slice(0,350));});
   page.on('response',r=>{if(r.status()>=400)httpErrors.push({status:r.status(),path:new URL(r.url()).pathname});});
   const label=locale+'-'+viewport.width;
   const response=await page.goto(base+localizedPath('home',locale),{waitUntil:'networkidle',timeout:30000});
   assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
   await capture(page,'home-start-'+label);
   assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('main').getAttribute('lang'),locale);
   const art=page.locator('.comic-call-art'),balloons=page.locator('.comic-call-bubble');
   assert.equal(await balloons.count(),2);
   assert.deepEqual(await balloons.allTextContents(),COMIC_HOME_COPY[locale].dialogue);
   const image=await art.evaluate(el=>({complete:el.complete,width:el.naturalWidth,height:el.naturalHeight,src:el.currentSrc}));
   assert.equal(image.complete,true);assert.equal(image.width,1672);assert.equal(image.height,941);
   assert.ok(image.src.endsWith('/images/agent-friendly-call-robots-screen.webp'));
   const artBox=await art.boundingBox(),captionBox=await page.locator('.comic-call-dialogue').boundingBox(),titleBox=await page.locator('h1').boundingBox();
   assert.ok(artBox&&titleBox&&artBox.y+artBox.height<=titleBox.y,'scene precedes title: '+label);
   for(let n=0;n<2;n++){
    const box=await balloons.nth(n).boundingBox();
    assert.ok(box&&box.x>=0&&box.x+box.width<=viewport.width,'dialogue fits horizontal viewport: '+label);
    const text=await balloons.nth(n).evaluate(el=>{
     const box=el.getBoundingClientRect(),range=document.createRange();range.selectNodeContents(el);
     const rects=[...range.getClientRects()].map(r=>({left:r.left,right:r.right,top:r.top,bottom:r.bottom}));
     return {clientHeight:el.clientHeight,scrollHeight:el.scrollHeight,
      pseudoBottom:getComputedStyle(el,'::after').bottom,
      textInside:rects.length>0&&rects.every(r=>r.left>=box.left+1&&r.right<=box.right-1&&r.top>=box.top+1&&r.bottom<=box.bottom-1),
      box:{left:box.left,right:box.right,top:box.top,bottom:box.bottom},rects};
    });
    geometry.push({case:label,balloon:n,...text});
    if(!text.textInside)visibilityFailures.push({case:label,kind:'dialogue_text_outside_bubble',balloon:n,text});
   }
   if(viewport.width===390)assert.ok(captionBox.y+captionBox.height<=artBox.y+1,'mobile dialogue stays above the full illustration: '+label);
   else if(captionBox.y+captionBox.height>artBox.y+artBox.height*0.29)visibilityFailures.push({case:label,kind:'dialogue_over_robot_faces',captionBox,artBox});
   const order=await page.locator('main').evaluate(el=>['.home-value-intro','#ruta-de-madurez','#tu-primer-paso','#auditar'].map(selector=>el.querySelector(selector).getBoundingClientRect().top+scrollY));
   assert.ok(order.every((v,n)=>n===0||v>order[n-1]),'offer, layers, first step and audit keep approved visual order: '+label);
   assert.equal(await page.locator('#home-value-title').innerText(),HOME_VALUE_COPY[locale].title);
   assert.ok((await page.locator('.maturity-map-guidance').innerText()).length>0);
   const dimensions=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches}));
   assert.ok(dimensions.scroll<=dimensions.width,'home has no horizontal overflow: '+label);assert.equal(dimensions.reduced,true);
   await page.locator('#que-hacemos').scrollIntoViewIfNeeded();await capture(page,'home-offer-'+label);
   await page.locator('#ruta-de-madurez').scrollIntoViewIfNeeded();await capture(page,'home-layers-'+label);
   const action=page.locator('.comic-call-actions a').first();assert.equal(await action.getAttribute('href'),'#tu-primer-paso');
   await action.focus();await page.keyboard.press('Enter');
   await page.waitForFunction(()=>location.hash==='#tu-primer-paso',null,{timeout:5000});
   const firstHeading=await page.locator('#home-service-title').boundingBox(),header=await page.locator('.site-header').boundingBox();
   assert.ok(firstHeading&&header&&firstHeading.y>=header.y+header.height&&firstHeading.y+firstHeading.height<=viewport.height,'keyboard action reveals the guided first step below navigation: '+label);
   const entry=page.locator('.home-service-start > a').first();
   assert.equal(await entry.getAttribute('href'),localizedPath('dossier',locale));
   assert.equal(await entry.getAttribute('aria-describedby'),'home-entry-access');
   assert.ok((await page.locator('#home-entry-access').innerText()).length>0);
   await capture(page,'home-first-step-'+label);
   cases.push({locale,viewport,sceneFirst:true,readableDialogues:!visibilityFailures.some(f=>f.case===label),fullImage:true,offerBeforeLayers:true,privateEntryCaveat:true,keyboard:true,reducedMotion:true,overflow:false});
   await context.close();
  }
 }
 assert.deepEqual(visibilityFailures,[],'dialogue text and balloons must stay inside their available visible areas');
 assert.deepEqual(blocked,[],'no request outside isolated GET preview');
 assert.deepEqual(errors,[],'no browser error');assert.deepEqual(httpErrors,[],'public preview assets/routes available');
 total=0;assert.deepEqual(await inventory(root),before,'compiled artifact unchanged by preview');
 // Contact sheets are labeled thumbnails of the real screenshots, not new page designs.
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width:1500,height:width===390?1850:1100},serviceWorkers:'block'});
  const page=await context.newPage();
  const tiles=[];
  for(const name of captures.filter(n=>n.endsWith('-'+width+'.jpg'))){
   tiles.push('<figure><figcaption>'+name+'</figcaption><img src="data:image/jpeg;base64,'+(await readFile(path.join(out,name))).toString('base64')+'"></figure>');
  }
  await page.setContent('<!doctype html><meta charset="utf-8"><style>body{margin:12px;background:#eee;font:14px sans-serif}section{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}figure{margin:0;background:white}figcaption{padding:6px}img{display:block;width:100%;height:auto}</style><h1>AFW · current compiled home '+SOURCE.slice(0,8)+' · '+width+'px</h1><section>'+tiles.join('')+'</section>');
  await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
  await page.screenshot({path:path.join(out,'contact-'+width+'.jpg'),type:'jpeg',quality:80,fullPage:true});
  await context.close();
 }
 await writeFile(path.join(out,'receipt.json'),JSON.stringify({...sourceProof,checkedAt:new Date().toISOString(),cases,captures,errors,blocked,httpErrors,geometry,artifactUnchanged:true,limits:'isolated compiled UI only; not Cloudflare hosting, private flow, full accessibility or PC-off'},null,2));
 console.log(JSON.stringify({...sourceProof,cases:cases.length,screenshots:captures.length,artifactUnchanged:true}));
}catch(err){
 await writeFile(path.join(out,'failure.json'),JSON.stringify({...sourceProof,error:String(err).slice(0,600),cases,captures,errors,blocked,httpErrors,visibilityFailures,geometry},null,2));
 throw err;
}finally{
 try{await browser?.close();}finally{
  native.kill('SIGTERM');for(let n=0;n<30&&!exited;n++)await pause(100);
  if(!exited)native.kill('SIGKILL');
  let portClosed=false;
  for(let n=0;n<10&&!portClosed;n++){
   portClosed=await new Promise(resolve=>{
    const socket=connectSocket({host:'127.0.0.1',port:8896});
    socket.once('connect',()=>{socket.destroy();resolve(false);});
    socket.once('error',err=>{socket.destroy();resolve(err.code==='ECONNREFUSED');});
    socket.setTimeout(1000,()=>{socket.destroy();resolve(false);});
   });
   if(!portClosed)await pause(100);
  }
  await writeFile(path.join(out,'cleanup.json'),JSON.stringify({nativeExited:exited,loopbackPortClosed:portClosed,scope:'owned runner process only'},null,2));
  await writeFile(path.join(out,'native-preview.log'),nativeLog.replace(/\x1b\[[0-9;]*m/g,''));
  assert.ok(exited&&portClosed,'owned native preview must terminate and release its loopback port');
 }
}
