// Native preview of the already qualified e62 public ZIP, in the ephemeral CI runner.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir,realpath,stat,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(path.join(process.env.RUNNER_TEMP,'afw-browser/node_modules/playwright/index.mjs')).href);

const env=process.env;
assert.equal(env.GITHUB_ACTIONS,'true');
assert.equal(env.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');
for(const name of ['CLOUDFLARE_API_TOKEN','CLOUDFLARE_API_KEY','CF_API_TOKEN','GH_TOKEN','GITHUB_TOKEN'])assert.ok(!env[name]);
const temp=await realpath(env.RUNNER_TEMP);
const root=await realpath('dist');
const entry=path.join(root,'server/index.js'),assets=path.join(root,'client');
assert.ok((await stat(entry)).isFile());
assert.ok((await stat(assets)).isDirectory());
const work=path.join(temp,'afw-case-preview-runtime');
await mkdir(work,{recursive:true});
const config=path.join(work,'preview.json');
await writeFile(config,JSON.stringify({
 name:'afw-e62-preview-ci',main:entry,compatibility_date:'2026-09-01',
 compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],no_bundle:true,find_additional_modules:true,
 rules:[{type:'ESModule',globs:['**/*.js','**/*.mjs'],fallthrough:true}],
 assets:{directory:assets,binding:'ASSETS',run_worker_first:false,not_found_handling:'none'},
 d1_databases:[{binding:'DB',database_name:'afw-preview-local',database_id:'00000000-0000-4000-8000-000000000528'}],
 dev:{ip:'127.0.0.1',port:8897},
},null,2));
const childEnv={PATH:env.PATH,HOME:env.HOME,TMPDIR:temp,CI:'true',NO_COLOR:'1',
 WRANGLER_SEND_METRICS:'false',XDG_CONFIG_HOME:path.join(work,'empty-cli-config')};
const cli=path.resolve('node_modules/wrangler/bin/wrangler.js');
const child=spawn(process.execPath,[cli,'dev','--local','--config',config,'--ip','127.0.0.1','--port','8897',
 '--no-bundle','--log-level','warn','--persist-to',path.join(work,'state')],{cwd:work,env:childEnv,stdio:['ignore','pipe','pipe']});
child.stdout.resume();child.stderr.resume();
let failed=false;
child.on('error',()=>{failed=true;});
child.on('exit',()=>{failed=true;});
const base='http://127.0.0.1:8897',pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
try{
 const until=Date.now()+45000;let ready=false;
 while(Date.now()<until&&!failed){
  try{const r=await fetch(base+'/',{redirect:'manual',signal:AbortSignal.timeout(2000)});await r.body?.cancel();if(r.status===200){ready=true;break;}}catch{}
  await pause(200);
 }
 assert.ok(ready,'qualified native preview must start');

 const output=path.resolve('case-visual-artifacts');await mkdir(output,{recursive:true});
 const browser=await chromium.launch({headless:true});
 const checks=[];
 try{
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
 const context=await browser.newContext({viewport,reducedMotion:'reduce'});
 const page=await context.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
 await page.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
 const response=await page.goto(base+'/casos/tokenizart',{waitUntil:'networkidle'});
 assert.equal(response.status(),200);assert.equal(await page.locator('#afw-main-content').count(),1);assert.equal(await page.locator('h1').count(),1);
 assert.deepEqual(await page.locator('[data-current-metric] strong').allTextContents(),['87','87','95']);
 assert.equal(await page.locator('#previous-measurements').getAttribute('open'),null);
 assert.equal(await page.locator('#previous-measurements table').isVisible(),false);
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 assert.equal(overflow,false,'horizontal overflow at '+viewport.width);
 assert.deepEqual(errors,[]);
 await page.screenshot({path:path.join(output,'case-'+viewport.width+'.png'),fullPage:true});
 await page.screenshot({path:path.join(output,'viewport-'+viewport.width+'.png')});
 const history=page.locator('#previous-measurements summary');await history.focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('#previous-measurements table').isVisible(),true);
 await page.screenshot({path:path.join(output,'expanded-'+viewport.width+'.png'),fullPage:true});
 await history.focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('#previous-measurements table').isVisible(),false);
 checks.push({viewport,overflow,errors,currentScores:[87,87,95],historyKeyboardToggle:true});
 await context.close();
 }
 }finally{await browser.close();}
 await writeFile(path.join(output,'summary.json'),JSON.stringify({sourceRevision:env.GITHUB_SHA,checks,productionMutation:false},null,2));
}finally{child.kill('SIGTERM');}
