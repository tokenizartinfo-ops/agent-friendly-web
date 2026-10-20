// QA only: exact compiled public artifact in an ephemeral GitHub runner.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawn} from 'node:child_process';
import {mkdir,readFile,readdir,realpath,stat,writeFile,lstat} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const e=process.env,SOURCE='5a8376d5d70dbb007190cd2eae23b10651a70f49',ID=12289664737;
assert.equal(e.GITHUB_ACTIONS,'true');assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');
assert.equal(e.AFW_PREVIEW_SOURCE,SOURCE);assert.equal(e.AFW_PREVIEW_ARTIFACT,String(ID));
assert.match(e.AFW_QA_REVISION??'',/^[a-f0-9]{40}$/);
for(const key of ['CLOUDFLARE_API_TOKEN','CLOUDFLARE_API_KEY','CF_API_TOKEN','GH_TOKEN','GITHUB_TOKEN']) assert.ok(!e[key],'no cloud/admin credential in preview step');
const temp=await realpath(e.RUNNER_TEMP),root=await realpath(e.AFW_PREVIEW_ROOT);
assert.ok(root.startsWith(temp+path.sep),'artifact remains in runner temp');
const out=path.resolve('output/playwright/public-copy');await mkdir(out,{recursive:true});
const sha=(x)=>createHash('sha256').update(x).digest('hex');
const zip=await readFile(e.AFW_PREVIEW_ARCHIVE);
assert.ok(zip.length>0&&zip.length<=16777216);
assert.equal(sha(zip),'c9b53eaefa6b92818f480656da14017ac4564b25b56fc446f5e7e3ffe644e878');
const meta=JSON.parse(await readFile(e.AFW_PREVIEW_META,'utf8'));
assert.equal(meta.id,ID);assert.equal(meta.workflow_run.head_sha,SOURCE);
assert.equal(meta.workflow_run.id,39478721753);assert.equal(meta.expired,false);
assert.ok(Date.parse(meta.expires_at)>Date.now());
assert.equal(meta.digest,'sha256:'+sha(zip));
const copyBlobs={
 'lib/home-copy.mjs':'8c81f66a9362c67a14acec650285c94d98995298',
 'lib/home-markdown.mjs':'ea67b0d6055e647a6ad99d721a67d8dc79ac736e',
 'lib/public-guide.mjs':'86d4fe62a30623115c44deac3cb14a7764bf82c4',
 'lib/public-tools-copy.mjs':'365e5037125331a4616ed5d1519ca5d347b0da5a',
};
for(const [file,expected] of Object.entries(copyBlobs)){
 const b=await readFile(file),actual=createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex');
 assert.equal(actual,expected,'harness public source matches artifact source: '+file);
}
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
const sourceProof={kind:'compiled_public_preview',productRevision:SOURCE,harnessRevision:e.AFW_QA_REVISION,
 artifactId:ID,artifactRun:39478721753,archiveSha256:sha(zip),archiveBytes:zip.length,files:before.length,uncompressedBytes:total,expires:meta.expires_at,
 productionAcceptance:false,authenticationAcceptance:false,operationalReadiness:false};
await writeFile(path.join(out,'artifact-inventory.json'),JSON.stringify({...sourceProof,inventory:before},null,2));
console.log(JSON.stringify({...sourceProof,preflight:true}));
if(process.argv.includes('--preflight-only'))process.exit(0);

const tools=await realpath(e.AFW_BROWSER_TOOLS);assert.ok(tools.startsWith(temp+path.sep));
assert.equal(JSON.parse(await readFile(path.join(tools,'node_modules/playwright/package.json'),'utf8')).version,'1.64.1');
const {chromium}=await import(pathToFileURL(path.join(tools,'node_modules/playwright/index.mjs')).href);
const {COMIC_HOME_COPY}=await import('../lib/home-copy.mjs');
const {publicToolsCopy}=await import('../lib/public-tools-copy.mjs');
const {respondToPublicGuide,PUBLIC_GUIDE_INITIAL_CONTEXT}=await import('../lib/public-guide.mjs');
const {localizedPath}=await import('../lib/site-i18n.mjs');
const work=path.join(temp,'afw-public-copy-native');await mkdir(work,{recursive:true});
const config=path.join(work,'preview.json');
await writeFile(config,JSON.stringify({
 name:'afw-public-copy-ci',main:entry,compatibility_date:'2026-09-01',
 compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],no_bundle:true,find_additional_modules:true,
 rules:[{type:'ESModule',globs:['**/*.js','**/*.mjs'],fallthrough:true}],
 assets:{directory:assets,binding:'ASSETS',run_worker_first:false,not_found_handling:'none'},
 d1_databases:[{binding:'DB',database_name:'afw-copy-preview-local',database_id:'00000000-0000-4000-8000-000000000527'}],
 dev:{ip:'127.0.0.1',port:8897},
},null,2));
const childEnv={PATH:e.PATH,HOME:e.HOME,TMPDIR:temp,CI:'true',NO_COLOR:'1',WRANGLER_SEND_METRICS:'false',XDG_CONFIG_HOME:path.join(work,'empty-cli-config')};
const cli=path.resolve('node_modules/wrangler/bin/wrangler.js');
const native=spawn(process.execPath,[cli,'dev','--local','--config',config,'--ip','127.0.0.1','--port','8897','--no-bundle','--log-level','warn','--persist-to',path.join(work,'state')],{cwd:work,env:childEnv,stdio:['ignore','pipe','pipe']});
let nativeLog='',nativeError=null,exited=false;
const collect=b=>{nativeLog=(nativeLog+b.toString()).slice(-24000);};
native.stdout.on('data',collect);native.stderr.on('data',collect);
native.on('error',x=>{nativeError=x;});native.on('exit',()=>{exited=true;});
const base='http://127.0.0.1:8897',pause=ms=>new Promise(r=>setTimeout(r,ms));
const captures=[],cases=[],errors=[],blocked=[],httpErrors=[];let browser;
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
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
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
   const home=await page.goto(base+(localizedPath('home',locale)||'/'),{waitUntil:'networkidle',timeout:30000});
   assert.equal(home.status(),200);await page.evaluate(()=>document.fonts.ready);
   await capture(page,'home-'+label);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('.comic-call-body > p').innerText(),COMIC_HOME_COPY[locale].intro);
   assert.equal(await page.locator('main').getAttribute('lang'),locale);
   const dimensions=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
   assert.ok(dimensions.scroll<=dimensions.width,'home has no horizontal overflow: '+label);
   const primary=page.locator('.comic-call-actions a').first(),secondary=page.locator('.comic-call-actions a').nth(1);
   assert.equal(await primary.getAttribute('href'),'#tu-primer-paso');
   const action=await primary.boundingBox();assert.ok(action&&action.y>=0&&action.y+action.height<=viewport.height,'home explanation action fits first viewport: '+label);
   await primary.focus();await page.keyboard.press('Tab');
   assert.ok(await secondary.evaluate(el=>document.activeElement===el),'home secondary link follows primary by keyboard');
   await primary.focus();await page.keyboard.press('Enter');
   await page.waitForFunction(()=>{const r=document.getElementById('tu-primer-paso')?.getBoundingClientRect();return r&&r.top>=-1&&r.top<innerHeight;},null,{timeout:5000});
   assert.equal(await page.locator('.home-service-start > a').first().getAttribute('href'),localizedPath('dossier',locale));
   const guide=await page.goto(base+localizedPath('guide',locale),{waitUntil:'networkidle',timeout:30000});
   assert.equal(guide.status(),200);await page.evaluate(()=>document.fonts.ready);
   await capture(page,'guide-initial-'+label);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('main').getAttribute('lang'),locale);
   assert.equal(await page.locator('.public-guide-hero > div > p').first().innerText(),publicToolsCopy(locale).guide.intro);
   assert.equal(await page.locator('.public-guide-message.is-guide').count(),1);
   const input=page.locator('#public-guide-input');await input.focus();
   const message=locale==='es'?'Quiero saber por dónde empezar':locale==='en'?'I want to know where to start':'Quero saber por onde começar';
   await input.fill(message);await page.keyboard.press('Enter');
   await page.waitForFunction(()=>document.querySelectorAll('.public-guide-message.is-guide').length===2,null,{timeout:5000});
   const answer=respondToPublicGuide({locale,message,context:PUBLIC_GUIDE_INITIAL_CONTEXT});
   assert.equal(await page.locator('.public-guide-message.is-guide .public-guide-bubble > p').last().innerText(),answer.answer);
   assert.equal(await input.inputValue(),'');
   const guideDimensions=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
   assert.ok(guideDimensions.scroll<=guideDimensions.width,'guide has no horizontal overflow: '+label);
   await page.locator('.public-guide-tool').scrollIntoViewIfNeeded();
   await capture(page,'guide-answer-'+label);
   cases.push({locale,viewport,home:true,guide:true,answerTopic:answer.topic,keyboard:true,reducedMotion:true,overflow:false});
   await context.close();
  }
 }
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
  await page.setContent('<!doctype html><meta charset="utf-8"><style>body{margin:12px;background:#eee;font:14px sans-serif}section{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}figure{margin:0;background:white}figcaption{padding:6px}img{display:block;width:100%;height:auto}</style><h1>AFW · compiled artifact '+SOURCE.slice(0,8)+' · '+width+'px</h1><section>'+tiles.join('')+'</section>');
  await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
  await page.screenshot({path:path.join(out,'contact-'+width+'.jpg'),type:'jpeg',quality:80,fullPage:true});
  await context.close();
 }
 await writeFile(path.join(out,'receipt.json'),JSON.stringify({...sourceProof,checkedAt:new Date().toISOString(),cases,captures,errors,blocked,httpErrors,artifactUnchanged:true,limits:'isolated compiled UI only; not Cloudflare hosting, private flow, full accessibility or PC-off'},null,2));
 console.log(JSON.stringify({...sourceProof,cases:cases.length,screenshots:captures.length,artifactUnchanged:true}));
}catch(err){
 await writeFile(path.join(out,'failure.json'),JSON.stringify({...sourceProof,error:String(err).slice(0,600),cases,captures,errors,blocked,httpErrors},null,2));
 throw err;
}finally{
 await browser?.close();
 native.kill('SIGTERM');for(let n=0;n<30&&!exited;n++)await pause(100);
 if(!exited)native.kill('SIGKILL');
 await writeFile(path.join(out,'native-preview.log'),nativeLog.replace(/\x1b\[[0-9;]*m/g,''));
}
