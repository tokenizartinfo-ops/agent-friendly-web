# Coherent suite Task1 fix round1 scoped review package

This is a scoped fix review of F1–F7, not a second broad task review. All seven prior findings remain open pending reviewer disposition. ActualTask2 HELD.
Original brief: Rootdocsd3d6822a docs/superpowers/briefs/2026-11-13-coherent-suite-qualification-task1.md.
Fix1 brief and findings: Rootdocs6310892ec62d921f0a839e5256d281d5edc7ffbb docs/superpowers/briefs/2026-11-13-coherent-suite-task1-fix1.md and docs/superpowers/reviews/2026-11-13-coherent-suite-task1-review.md.
Latest applicable SPEC/rulings: Rootdocs1db1028a1ad60c0c1336e20db96c05646acc701d docs/superpowers/specs/2026-11-13-coherent-suite-qualification-design.md.
Full appended implementer report: Source0ade3837c379eda3db5d327a2c8d8e1d06f5265a docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md. Initial24731chars are exact; appendix36509chars maps each finding, commands, actual output and limitations.

## Complete fix sequence and scope

Previously reviewed closed Source38ddef2b431af0edbd5286622e4fa5398b845a17/tree9ad4552e/reportffe57366.
Previously reviewed preserved unqualified implementation: deff87f240f4e33750b459168d54b80cd6d2d54c (F7044f816d...).
Fixed inactive18183bd24aa3cbacb74119e54ef28d6671bd45d5/treec4b49299/F7d036c941c4f0a4dc8f23e7971feaa89402c4b13c,293584B.
Only fix1 overlay a99aa733962e9733294a6ba8755f749e35f26d93/tree6192d33f/F79a36ab33883099f8c9f40349821a7614336e5c86.
Restore0f80090e534fec781c2fbd37eda098c71e686f0a is exact pre-fix closed tree9ad4552e, parenta99aa733.
Final report-only0ade3837c379eda3db5d327a2c8d8e1d06f5265a/tree7634f0eb194889b0869b40d8828e4cf99b3b50bb, report7e92d4ef681772d912e6f8194011f28518883b5b/61240chars.

Root independently fetched full Source candidate/overlay, extracted four actual cat-heredocs and recomputed all body hashes with builtin crypto, compared exact same four bodies in overlay. Adapter42022B/b273f0a7e1aae7f9036b02b358dcfae38e977c1826bd79f1e79bee1f244f71ef; controls35122B/1a74b32453d6efa8443747a9462603cc8bcad5c1c847449c2002fad0b0a703bd; verifier13579B/d2c800bca5dbe834c957a6d54eb663f809891717df7132cc8819d8821c49fe48; SAFEZIP13305/b36 fixed; genericZIP33380/4ff44 fixed. No Source/private bytes executed or imported onPC.

## Independently verified current qualification

Sole fix1 run43399028588/attempt1 completed success; exact10terminal=8disabled/skipped+2KEYLESSsuccess. Controls131796961734, verifier131797057958.
Current approved SAFE14023878021:1389B/SHA27f8b22869723dbad9beb1af1a8bf17e91888eefdc150dc0a4ae14c32166ea98, expiry2026-11-20T09:10:10Z, result1666B/576af34d977c1c212a97037ba298639c72e100b06491e90a533172627416cce9, manifest265B/3fae2059958d8147e50937734434024226af0e29e61c8f49972a899e574332fc.
Root strict rawZIP/CRC/EOF/fatalUTF8/canonical/fullmanifest/context/pins/fourhash audits passed; exact6wrappercontrols passed;36closed phase records form18unique start/pass pairs, nofailed/open; syntax110shell/63Node INSPECTION ONLY; ZIP16passed. Actual Native/World/SDK/MF execution0, realkeyfalse. Readback verified/none/strict_current_safe_pair/producerpassed/acceptedtrue plus byte/digest triple and currentSource/run.
Final independent tree/ref/commit/report-prefix/main/62WF/fiveactive inventories verified:3196leaves/all3195initialleaves exact/R1reportexact/F7f7a71 exact/main0c9 unchanged/0closedcommit runs/fivebranchactive0. All five flagsfalse.

## Complete implementation fix patch: prior inactive deff87f2 → fixed inactive18183bd2

This is the actual temporary implementation delta the previous reviewer saw against the corrected implementation; using closed Source only would conceal the workflow because it is restored. Root patience diff 12hunks/598added/118deleted. Applied back to full prior candidate and reconstructed full293584B current candidate exactly. Valid full context10 patch, no truncation.

```diff
--- a/.github/workflows/afw-finite-budget-qualification.yml
+++ b/.github/workflows/afw-finite-budget-qualification.yml
@@ -72,56 +72,156 @@
           export function hex(v,n=64){need(typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v));return v;}
           export function requireKeyless(){need(process.env.AFW_SYN_CHECKPOINT_KEY===undefined);}
           function git(...args){return execFileSync('git',args,{encoding:'utf8'}).trim();}
           const PATHS={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           export async function validateSourcePins(){
            requireKeyless();same(PINS,SOURCE_PINS);same(process.versions.node,'22.23.4');same(process.env.GITHUB_REPOSITORY,CONTEXT.repository);same(process.env.GITHUB_REPOSITORY_ID,CONTEXT.repositoryId);same(process.env.GITHUB_REF,CONTEXT.ref);same(process.env.GITHUB_RUN_ID,CONTEXT.run);same(process.env.GITHUB_RUN_ATTEMPT,'1');same(git('rev-parse','HEAD'),CONTEXT.source);same(git('rev-parse','HEAD^{tree}'),CONTEXT.tree);same(git('rev-parse','HEAD:.github/workflows/afw-finite-budget-qualification.yml'),CONTEXT.workflowBlob);
            for(const [k,p]of Object.entries(PATHS))same(git('rev-parse','HEAD:'+p),PINS[k]);const lock=JSON.parse(await readFile('package-lock.json','utf8'));same(lock.packages['node_modules/@cloudflare/workers-oauth-provider'].version,PINS.sdkVersion);
            const map={adapter:'afw-suite-adapter.mjs',controls:'afw-suite-controls.mjs',verifier:'afw-suite-verifier.mjs',safeZip:'afw-suite-safe-zip.mjs'};for(const [k,p]of Object.entries(map))same(sha(await readFile(join(process.env.RUNNER_TEMP,p))),PROGRAM_HASHES[k]);return {context:CONTEXT,sourcePins:PINS,programHashes:PROGRAM_HASHES};
           }
           export function artifactName(job){return job==='contracts'?'finite-budget-fixed-preparation-'+CONTEXT.source:job==='suite'||job==='controls'?'afw-coherent-suite-'+(job==='controls'?'controls-':'')+'safe-'+CONTEXT.run+'-1':'finite-budget-'+job+'-'+CONTEXT.source+'-'+CONTEXT.run;}
-          export function validateAssignedMetadata(meta,expected){
-           fields(expected,['job','kind','id','zipSha256']);canonicalId(expected.id);hex(expected.zipSha256);need(['contracts',...LEGACY.slice(1),'suite','controls'].includes(expected.job));same(String(meta.id),expected.id);need(Number.isSafeInteger(meta.id));same(meta.name,artifactName(expected.job));same(meta.expired,false);same(meta.digest,'sha256:'+expected.zipSha256);same(String(meta.workflow_run.id),CONTEXT.run);same(meta.workflow_run.head_sha,CONTEXT.source);same(meta.workflow_run.head_branch,CONTEXT.ref.slice(11));need(Number.isSafeInteger(meta.size_in_bytes)&&meta.size_in_bytes>0&&meta.size_in_bytes<=(expected.job==='suite'||expected.job==='controls'?131072:134283264));need(typeof meta.expires_at==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(meta.expires_at)&&Number.isFinite(Date.parse(meta.expires_at))&&Date.parse(meta.expires_at)>Date.now());return meta;
-          }
-          export async function metadata(id){canonicalId(id);const r=await fetch('https://api.github.com/repos/'+CONTEXT.repository+'/actions/artifacts/'+id,{headers:{Authorization:'Bearer '+process.env.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});return {status:r.status,value:r.status===200?await r.json():null};}
-          export async function rawAssigned(id,cap){
-           canonicalId(id);const signal=AbortSignal.timeout(30000),r=await fetch('https://api.github.com/repos/'+CONTEXT.repository+'/actions/artifacts/'+id+'/zip',{headers:{Authorization:'Bearer '+process.env.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal});need(r.status===200&&r.body);const reader=r.body.getReader(),parts=[];let n=0;try{for(;;){const v=await reader.read();if(v.done)break;n+=v.value.byteLength;need(n<=cap);parts.push(Buffer.from(v.value));}}catch(e){await reader.cancel().catch(()=>{});throw e;}need(!signal.aborted);return Buffer.concat(parts);
+          export function operationLimits(operation){
+           const limits={
+            'generic-private':{raw:136314880,timeout:30000},
+            'b-peer':{raw:134283264,timeout:20000},
+            pure:{raw:134283264,timeout:30000},
+            safe:{raw:131072,timeout:30000}
+           };
+           need(Object.hasOwn(limits,operation));return limits[operation];
+          }
+          export function validateAssignedMetadata(meta,expected,operation='generic-private'){
+           fields(expected,['job','kind','id','zipSha256']);canonicalId(expected.id);hex(expected.zipSha256);
+           need(['contracts',...LEGACY.slice(1),'suite','controls'].includes(expected.job));
+           const limits=operationLimits(operation);
+           same(String(meta.id),expected.id);need(Number.isSafeInteger(meta.id));same(meta.name,artifactName(expected.job));same(meta.expired,false);same(meta.digest,'sha256:'+expected.zipSha256);
+           same(String(meta.workflow_run.id),CONTEXT.run);same(meta.workflow_run.head_sha,CONTEXT.source);same(meta.workflow_run.head_branch,CONTEXT.ref.slice(11));
+           need(Number.isSafeInteger(meta.size_in_bytes)&&meta.size_in_bytes>0&&meta.size_in_bytes<=limits.raw);
+           need(typeof meta.expires_at==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(meta.expires_at)&&Number.isFinite(Date.parse(meta.expires_at))&&Date.parse(meta.expires_at)>Date.now());
+           return meta;
+          }
+          export async function metadata(id){
+           canonicalId(id);const r=await fetch('https://api.github.com/repos/'+CONTEXT.repository+'/actions/artifacts/'+id,{headers:{Authorization:'Bearer '+process.env.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});
+           return {status:r.status,value:r.status===200?await r.json():null};
+          }
+          export function checkedDownloadSize(total,chunkBytes,operation){
+           need(Number.isSafeInteger(total)&&total>=0&&Number.isSafeInteger(chunkBytes)&&chunkBytes>=0);
+           const cap=operationLimits(operation).raw;need(total<=cap&&chunkBytes<=cap-total);return total+chunkBytes;
+          }
+          export async function collectPrivateBody(response,operation,signal){
+           const limits=operationLimits(operation);need(response.status===200&&response.body);
+           const reader=response.body.getReader(),parts=[];let total=0;
+           try{
+            for(;;){const item=await reader.read();if(item.done)break;need(item.value instanceof Uint8Array);total=checkedDownloadSize(total,item.value.byteLength,operation);parts.push(Buffer.from(item.value));}
+           }catch(error){await reader.cancel().catch(()=>{});throw error;}
+           need(!signal.aborted);return Buffer.concat(parts);
+          }
+          const fixedPrivateIO={fetch:(url,options)=>fetch(url,options),timeout:ms=>AbortSignal.timeout(ms)};
+          export async function rawAssigned(id,operation='generic-private',io=fixedPrivateIO){
+           canonicalId(id);const limits=operationLimits(operation),signal=io.timeout(limits.timeout);
+           const response=await io.fetch('https://api.github.com/repos/'+CONTEXT.repository+'/actions/artifacts/'+id+'/zip',{headers:{Authorization:'Bearer '+process.env.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal});
+           return collectPrivateBody(response,operation,signal);
           }
           export function validatePeerInventory(inventory,observedAt){
            need(Number.isSafeInteger(observedAt)&&observedAt>0);same(inventory.total_count,inventory.jobs.length);need(inventory.jobs.length===7||inventory.jobs.length===8);const names=inventory.jobs.map(x=>x.name);same(new Set(names).size,names.length);same(new Set(inventory.jobs.map(x=>canonicalId(String(x.id)))).size,names.length);same(names.filter(x=>x!=='verify').sort(),LEGACY.slice().sort());const receiver=inventory.jobs.find(x=>x.name==='verify');if(receiver){need(['pending','queued','waiting','requested'].includes(receiver.status));same(receiver.conclusion,null);}
-           const peers=LEGACY.slice(0,6).map(n=>inventory.jobs.find(j=>j.name===n)),self=inventory.jobs.find(j=>j.name==='reduction_consume_b');for(const p of peers){same(p.status,'completed');same(p.conclusion,'success');}same(self.status,'in_progress');same(self.conclusion,null);
+           const peers=LEGACY.slice(0,6).map(n=>inventory.jobs.find(j=>j.name===n)),self=inventory.jobs.find(j=>j.name==='reduction_consume_b');for(const p of peers){same(p.status,'completed');same(p.conclusion,'success');}same(self.status,'in_progress');same(self.conclusion,null);for(const peer of peers){const start=Date.parse(peer.started_at),end=Date.parse(peer.completed_at);need(Number.isSafeInteger(start)&&Number.isSafeInteger(end)&&start>0&&end>=start&&end<=observedAt);}
            const events=LEGACY.slice(1).flatMap(n=>{const j=inventory.jobs.find(x=>x.name===n),start=Date.parse(j.started_at),end=n==='reduction_consume_b'?observedAt:Date.parse(j.completed_at);need(Number.isSafeInteger(start)&&Number.isSafeInteger(end)&&start>0&&end>=start&&end<=observedAt);return [{at:start,delta:1},{at:end,delta:-1}];}).sort((a,b)=>a.at-b.at||a.delta-b.delta);let active=0,peak=0;for(const e of events){active+=e.delta;need(active>=0);peak=Math.max(peak,active);}same(active,0);need(peak>=1&&peak<=3);return {peerJobs:peers.map(x=>({name:x.name,jobId:String(x.id),status:x.status,conclusion:x.conclusion})),selfJob:{name:self.name,jobId:String(self.id),status:self.status,conclusion:self.conclusion},observedNativeJobPeak:peak};
           }
-          function jobBlocks(text){const matches=[...text.matchAll(/^  ([a-z_]+):\n/gm)];return Object.fromEntries(matches.map((m,n)=>[m[1],text.slice(m.index,matches[n+1]?.index??text.length)]));}
+          function jobBlocks(text){
+           const headers=[...text.matchAll(/^jobs:\n/gm)];same(headers.length,1);const section=text.slice(headers[0].index+headers[0][0].length),matches=[...section.matchAll(/^  ([a-z_]+):\n/gm)];
+           return Object.fromEntries(matches.map((m,n)=>[m[1],section.slice(m.index,matches[n+1]?.index??section.length)]));
+          }
+          function jobSteps(block){
+           const matches=[...block.matchAll(/^      - /gm)];
+           return matches.map((m,n)=>{const text=block.slice(m.index,matches[n+1]?.index??block.length),id=text.match(/^        id: ([a-z_]+)$/m)?.[1]??null;return {text,id,start:m.index};});
+          }
+          function fixedStep(block,id){const matches=jobSteps(block).filter(x=>x.id===id);same(matches.length,1);return matches[0];}
           export function validateWorkflow(text){
            const b=jobBlocks(text),deps={contracts:null,positive_prepare:['contracts'],positive_consume:['contracts','positive_prepare'],reduction_prepare:['contracts'],reduction_consume_a:['contracts','reduction_prepare'],readonly:['contracts'],reduction_consume_b:['contracts','readonly','reduction_prepare'],verify:LEGACY};
-           for(const [name,expected]of Object.entries(deps)){need(typeof b[name]==='string');const dep=b[name].match(/^    needs: \[([^\]]*)\]$/m);same(dep?dep[1].split(',').map(x=>x.trim()):null,expected);const timeout=Number(b[name].match(/^    timeout-minutes: (\d+)$/m)?.[1]);same(timeout,name==='contracts'||name==='verify'?2:name==='readonly'?7:15);}
+           for(const [name,expected]of Object.entries(deps)){
+            need(typeof b[name]==='string');const dep=b[name].match(/^    needs: \[([^\]]*)\]$/m);
+            same(dep?dep[1].split(',').map(x=>x.trim()):null,expected);
+            same(Number(b[name].match(/^    timeout-minutes: (\d+)$/m)?.[1]),name==='contracts'||name==='verify'?2:name==='readonly'?7:15);
+           }
+           const peer=fixedStep(b.reduction_consume_b,'peer_download').text;
+           need(peer.includes("'/actions/runs/'+e.GITHUB_RUN_ID+'/attempts/1/jobs?per_page=100'"));
            return true;
           }
           export function validateKeyScopes(text){
-           const blocks=jobBlocks(text);same((text.match(/^    environment: afw-finite-syn-checkpoint$/gm)??[]).length,6);
-           for(const name of LEGACY){const b=blocks[name];need(b);need(!/^      AFW_SYN_CHECKPOINT_KEY:/m.test(b));for(const part of b.split(/^      - /m).slice(1)){if(!/^          AFW_SYN_CHECKPOINT_KEY:/m.test(part))continue;need(part.startsWith('name: Generic custody '));need(!/\b(?:fetch|npm|copyFile|execFileSync|World|finite-budget-world|cp\(|node --test|GITHUB_TOKEN|GH_ARTIFACT_TOKEN)\b/.test(part));need(/finite-checkpoint-custody\.mjs/.test(part));}}
-           const bound=[...text.matchAll(/^          AFW_SYN_CHECKPOINT_KEY: \$\{\{ secrets\.AFW_SYN_CHECKPOINT_KEY \}\}$/gm)].length;same(bound,26);return true;
+           const blocks=jobBlocks(text),expected=new Map();
+           for(const job of LEGACY.slice(1)){
+            for(const id of ['custody','seal','own_open'])expected.set(job+':'+id,true);
+            if(['positive_consume','reduction_consume_a','reduction_consume_b'].includes(job))expected.set(job+':producer_open',true);
+           }
+           for(const {job}of PRIVATE_PEERS)expected.set('reduction_consume_b:peer_open_'+job,true);
+           same(expected.size,26);
+           const seen=new Set(),environments=[];
+           for(const [job,block]of Object.entries(blocks)){
+            need([...LEGACY,'verify','keyless_controls','keyless_verify'].includes(job));
+            const first=block.indexOf('      - '),header=block.slice(0,first<0?block.length:first);
+            need(!/^\s+AFW_SYN_CHECKPOINT_KEY:/m.test(header));
+            const association=header.match(/^    environment: (.+)$/m);
+            if(association)environments.push([job,association[1]]);
+            for(const step of jobSteps(block)){
+             const keyLines=[...step.text.matchAll(/^(\s+)AFW_SYN_CHECKPOINT_KEY: (.+)$/gm)];
+             if(keyLines.length===0)continue;
+             same(keyLines.length,1);same(keyLines[0][1].length,10);same(keyLines[0][2],'$'+'{{ secrets.AFW_SYN_CHECKPOINT_KEY }}');
+             const identity=job+':'+step.id;need(expected.has(identity)&&!seen.has(identity));seen.add(identity);
+             need(step.text.startsWith('      - name: Generic custody '));
+             need(!/\b(?:fetch|npm|copyFile|execFileSync|World|finite-budget-world|cp\(|node --test|GITHUB_TOKEN|GH_ARTIFACT_TOKEN)\b/.test(step.text));
+             need(step.text.includes('finite-checkpoint-custody.mjs'));
+            }
+           }
+           same(environments,LEGACY.slice(1).map(job=>[job,'afw-finite-syn-checkpoint']));
+           same([...seen].sort(),[...expected.keys()].sort());return true;
           }
           const NATIVE_HASHES={positive_prepare:'a5fb9018a15148200d9f974d88fceddd7b969dd1da34aec5d1d177e627a4bb1f',positive_consume:'04372215e782289cf9f9369deb3e41b692c78c7ba69db390170edee7eeb5f1b5',reduction_prepare:'0884130dfd71b58991ab0a5810d45ceb86140ba1037eb3e69a61199bc813f3f5',reduction_consume_a:'cafaa1cfe677ea408c3bd0430d87aefbac615ec55ceb621f85f1b161d3354fe4',readonly:'b5fa881c10523d636b77a787b7e92bcc14bc64e13d658bd34476f00e1d4e9f0c',reduction_consume_b:'c0566bba404f2a61b8d22f0b80272e2b1322f4799ef14f248e28736511a1d378'};
           export function validateFixedCases(text){
-           const first=text.split("<<'NODE_SUITE_ADAPTER'\n");same(first.length,2);const body=first[1].split('\n          NODE_SUITE_ADAPTER\n')[0].split('\n').map(x=>{need(x.startsWith('          '));return x.slice(10);}).join('\n')+'\n';same(sha(body),PROGRAM_HASHES.adapter);
-           const blocks=jobBlocks(text);for(const [job,h]of Object.entries(NATIVE_HASHES)){const m=blocks[job].match(/      - name: Execute fixed [^\n]+\n[\s\S]*?(?=\n      - name:)/);need(m);same(sha(m[0]),h);}
+           const blocks=jobBlocks(text);
+           for(const [job,h]of Object.entries(NATIVE_HASHES)){
+            const match=blocks[job].match(/      - name: Execute fixed [^\n]+\n[\s\S]*?(?=\n      - name:)/);need(match);same(sha(match[0]),h);
+           }
            for(const [job,cases]of Object.entries({positive_prepare:['P1'],positive_consume:['P1'],reduction_prepare:['D1','D2','D3','D4'],reduction_consume_a:['D1','D2'],readonly:['R1','R2','R3'],reduction_consume_b:['D3','D4']}))same(blocks[job].match(/^      FIXED_CASES: '([^']+)'$/m)?.[1],JSON.stringify(cases));
-           const pure=text.split('          /'+'/ AFW_CLOSED_PURE_SEALER_V2:')[1]?.split('\n          NODE\n')[0];need(pure);same(sha('// AFW_CLOSED_PURE_SEALER_V2:'+pure+'\n'),'6ec22a8af7b314feb6a47afc54bffa3bffac184ed7d56108711e18a17f04106a');need(/name: finite-budget-fixed-preparation-\$\{\{ github.sha \}\}/.test(blocks.contracts));need(/path: \$\{\{ runner.temp \}\}\/afw-pure-public\//.test(blocks.contracts));need(text.includes('C0MinusI0Ms:900000,C1MinusC0Ms:180000'));return true;
+           const seal=fixedStep(blocks.contracts,'pure_seal'),upload=fixedStep(blocks.contracts,'upload');need(seal.start<upload.start);const full=seal.text+upload.text;same(Buffer.byteLength(full),19458);same(sha(full),'8b239b4a5e7e4d5f424fef645a464e006c039a47763224902c4221bba2666231');return true;
+          }
+          export function validatePublicationGates(text){
+           const b=jobBlocks(text).reduction_consume_b,pair=fixedStep(b,'summary_pair'),upload=fixedStep(b,'summary_upload'),truth=fixedStep(b,'actual_outcome'),aggregate=fixedStep(b,'aggregate');
+           same(pair.text.match(/^        if: (.+)$/m)?.[1],"always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'");
+           same(upload.text.match(/^        if: (.+)$/m)?.[1],"always() && !cancelled() && steps.summary_pair.outcome == 'success'");
+           same(truth.text.match(/^        if: (.+)$/m)?.[1],"always() && !cancelled()");
+           need(pair.start<upload.start&&upload.start<truth.start);
+           for(const statement of ["test '$"+"{{ steps.native.outcome }}' = success","test '$"+"{{ steps.aggregate.outcome }}' = success","test '$"+"{{ steps.own_verified.outcome }}' = success","test '$"+"{{ steps.summary_pair.outputs.status }}' = passed","test '$"+"{{ steps.summary_upload.outcome }}' = success"])need(truth.text.includes(statement));
+           need(pair.text.includes('A.projectSuiteOutcome('));need(!pair.text.includes('A.makeSuite('));
+           same(aggregate.text.match(/^        if: (.+)$/m)?.[1],"always() && !cancelled() && steps.suite_bootstrap.outcome == 'success' && steps.native.outcome == 'success'");
+           const world=aggregate.text.indexOf("from './test/fixtures/finite-budget-world.mjs'");
+           need(world>0);
+           for(const id of ['peer_download',...PRIVATE_PEERS.map(x=>'peer_open_'+x.job)]){
+            const check="test '$"+"{{ steps."+id+".outcome }}' = success";need(aggregate.text.indexOf(check)>=0&&aggregate.text.indexOf(check)<world);
+           }
+           return true;
+          }
+          export function validatePureBindingSteps(text){
+           const blocks=jobBlocks(text);
+           for(const job of LEGACY.slice(1)){
+            const body=fixedStep(blocks[job],'pure_binding').text,start=body.indexOf('await A.finalizePureBinding(binding,async()=>{'),verify=body.indexOf("await verifyBudgetArtifact(root,'pure',e.PURE_ID)"),copy=body.indexOf("await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json')"),end=body.indexOf('});',copy);
+            need(start>=0&&verify>start&&copy>verify&&end>copy);need(!body.includes('pure-assignment.json'));
+           }
+           const pair=fixedStep(blocks.reduction_consume_b,'summary_pair').text;
+           need(pair.includes('PURE_BINDING_OUTCOME: $'+'{{ steps.pure_binding.outcome }}'));
+           for(const [key,id]of Object.entries({NATIVE_OUTCOME:'native',AGGREGATE_OUTCOME:'aggregate',OWN_METADATA_OUTCOME:'own_metadata',OWN_OPEN_OUTCOME:'own_open',OWN_VERIFIED_OUTCOME:'own_verified'}))need(pair.includes(key+': $'+'{{ steps.'+id+'.outcome }}'));
+           return true;
           }
           export function bindPure(readback,assignment,manifestSha256){
-           validateAssignedMetadata(readback.metadata,assignment);same(assignment.job,'contracts');same(assignment.kind,'pure');hex(manifestSha256);same(readback.rawZipSha256,assignment.zipSha256);need(readback.files instanceof Map);const files=readback.files;for(const b of files.values())need(Buffer.isBuffer(b)&&b.length<=2097152);const get=n=>{const b=files.get(n);need(b);return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(b));},m=get('budget-artifact.json');same(sha(files.get('budget-artifact.json')),manifestSha256);same(m.purpose,'afw.finite-budget-artifact.syn.v1');same(m.kind,'pure');same(m.source,CONTEXT.source);same(m.run,CONTEXT.run);same(m.attempt,'1');for(const k of ['operationalReadiness','completePackage','PCoff'])same(m[k],false);same(m.files,[...files].filter(([p])=>p!=='budget-artifact.json').map(([path,b])=>({path,bytes:b.length,sha256:sha(b)})).sort((a,b)=>a.path.localeCompare(b.path)));
+           validateAssignedMetadata(readback.metadata,assignment,'pure');same(assignment.job,'contracts');same(assignment.kind,'pure');hex(manifestSha256);same(readback.rawZipSha256,assignment.zipSha256);need(readback.files instanceof Map);const files=readback.files;for(const b of files.values())need(Buffer.isBuffer(b)&&b.length<=2097152);const get=n=>{const b=files.get(n);need(b);return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(b));},m=get('budget-artifact.json');same(sha(files.get('budget-artifact.json')),manifestSha256);same(m.purpose,'afw.finite-budget-artifact.syn.v1');same(m.kind,'pure');same(m.source,CONTEXT.source);same(m.run,CONTEXT.run);same(m.attempt,'1');for(const k of ['operationalReadiness','completePackage','PCoff'])same(m[k],false);same(m.files,[...files].filter(([p])=>p!=='budget-artifact.json').map(([path,b])=>({path,bytes:b.length,sha256:sha(b)})).sort((a,b)=>a.path.localeCompare(b.path)));
            const status=get('status.json');same(status.status,'pure_passed');same(status.source,CONTEXT.source);same(status.run,CONTEXT.run);same(status.attempt,'1');same(status.validationFailures,[]);same(status.outcomes,{PURE_TEST_OUTCOME:'success',CONTROLS_OUTCOME:'success',PREFLIGHT_OUTCOME:'success'});same(get('q-counts.json'),{tests:8,pass:8,fail:0,cancelled:0,skipped:0,todo:0});const controls=get('controls.json');same(controls.passed,true);same(controls.groups.map(x=>x.group),['F1','F2','F3','F4','F5','F6','F7','F8']);need(controls.groups.every(x=>x.passed===true));const d=get('diagnostics.json'),profiles=['positive','readonly','reduction_a'];same(d.allPassed,true);same(d.profiles.map(x=>x.profile),profiles);for(const [n,group]of profiles.entries()){const p=get('preflight-'+group+'.json'),diag=d.profiles[n];same(p.group,group);same(p.source,CONTEXT.source);same(p.run,CONTEXT.run);same(p.attempt,'1');same(p.additionalSYN.length,n?3:0);same(diag.additionalSYNCount,n?3:0);same(diag.passed,true);same(diag.stage,'complete');for(const x of [p,diag]){same(x.I0Opened,false);same(x.nativeExecutionProduced,false);}}for(const x of [status,controls,d]){same(x.I0Opened,false);same(x.nativeExecutionProduced,false);}need(files.get('preflight.json').equals(files.get('preflight-positive.json')));return {artifactId:assignment.id,zipSha256:assignment.zipSha256,manifestSha256,profiles,purePassed:true,beforeI0:true};
           }
           export async function bindPureCurrent(assignment,manifestSha256){
-           requireKeyless();const m=await metadata(assignment.id);same(m.status,200);validateAssignedMetadata(m.value,assignment);const raw=await rawAssigned(assignment.id,134283264);same(raw.length,m.value.size_in_bytes);same(sha(raw),assignment.zipSha256);const files=new Map(),root=join(process.env.RUNNER_TEMP,'afw-prior-pure');for(const n of (await readdir(root)).sort()){need(/^[a-z0-9_-]+\.json$/.test(n));const st=await lstat(join(root,n));need(st.isFile()&&st.nlink===1&&st.size<=2097152);files.set(n,await readFile(join(root,n)));}return bindPure({metadata:m.value,files,rawZipSha256:sha(raw)},assignment,manifestSha256);
+           requireKeyless();const m=await metadata(assignment.id);same(m.status,200);validateAssignedMetadata(m.value,assignment,'pure');const raw=await rawAssigned(assignment.id,'pure');same(raw.length,m.value.size_in_bytes);same(sha(raw),assignment.zipSha256);const files=new Map(),root=join(process.env.RUNNER_TEMP,'afw-prior-pure');for(const n of (await readdir(root)).sort()){need(/^[a-z0-9_-]+\.json$/.test(n));const st=await lstat(join(root,n));need(st.isFile()&&st.nlink===1&&st.size<=2097152);files.set(n,await readFile(join(root,n)));}return bindPure({metadata:m.value,files,rawZipSha256:sha(raw)},assignment,manifestSha256);
           }
           const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;
           function rangeEnd(start,length,limit){need(Number.isSafeInteger(limit)&&Number.isSafeInteger(start)&&Number.isSafeInteger(length)&&start>=0&&length>=0&&start<=limit&&length<=limit-start);return start+length;}
           const crcTable=Uint32Array.from({length:256},(_,n)=>{let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
           const crc32=b=>{let c=0xffffffff;for(const x of b)c=crcTable[(c^x)&255]^(c>>>8);return(c^0xffffffff)>>>0;};
           // Generic single-disk classic ZIP3 framing derived from the protected custody reader; no R2 model or CLI.
           export function decodePrivateZip(bytes){
            need(Buffer.isBuffer(bytes)&&bytes.length>=22&&bytes.length<=PRIVATE_CAP);const limit=bytes.length,end=limit-22,u16=n=>bytes.readUInt16LE(n),u32=n=>bytes.readUInt32LE(n),tuple=n=>[u32(n),u32(n+4),u32(n+8)],eq=(a,b)=>a.every((v,i)=>v===b[i]);
            need(u32(end)===0x06054b50&&u16(end+4)===0&&u16(end+6)===0&&u16(end+8)===3&&u16(end+10)===3&&u16(end+20)===0);
            const central=u32(end+16);same(rangeEnd(central,u32(end+12),end),end);let cursor=central;const members=[],remaining=new Set(['envelope.bin','manifest.json','receipt.json']);
@@ -129,37 +229,37 @@
            for(let i=0;i<3;i++){rangeEnd(cursor,46,end);need(u32(cursor)===0x02014b50);const a=cursor+46,b=rangeEnd(a,u16(cursor+28),end),c=rangeEnd(b,u16(cursor+30),end),finish=rangeEnd(c,u16(cursor+32),end),raw=bytes.subarray(a,b),name=new TextDecoder('utf-8',{fatal:true}).decode(raw);need(Buffer.from(name).equals(raw)&&remaining.delete(name)&&u16(cursor+32)===0&&u16(cursor+34)===0);
            const flags=u16(cursor+8),method=u16(cursor+10),sizes=tuple(cursor+16),local=u32(cursor+42),attrs=u32(cursor+38),kind=attrs>>>16&0xf000;need((kind===0||kind===0x8000)&&(attrs&0x10)===0&&(method===0||method===8)&&(flags&~(method===8?0x080e:0x0808))===0&&sizes[1]!==0xffffffff&&sizes[2]!==0xffffffff&&local!==0xffffffff);need(sizes[2]<=(name==='envelope.bin'?128*MiB:4096));if(method===0)same(sizes[1],sizes[2]);extras(b,c);members.push({name,raw,flags,method,sizes,local,version:u16(cursor+6),time:u32(cursor+12)});cursor=finish;}
            same(cursor,end);same(remaining.size,0);members.sort((a,b)=>a.local-b.local);let last=0,total=0;const result=new Map();
            for(const m of members){const {local,raw,flags,method,sizes}=m;same(last,local);rangeEnd(local,30,central);need(u32(local)===0x04034b50&&u16(local+4)===m.version&&u16(local+6)===flags&&u16(local+8)===method&&u32(local+10)===m.time);const ls=tuple(local+14),descriptor=(flags&8)!==0;need(ls.every((v,i)=>v===sizes[i]||(descriptor&&v===0)));const a=local+30,b=rangeEnd(a,u16(local+26),central);need(bytes.subarray(a,b).equals(raw));const start=rangeEnd(b,u16(local+28),central);extras(b,start);last=rangeEnd(start,sizes[1],central);
            if(descriptor){rangeEnd(last,12,central);const bare=eq(tuple(last),sizes),signed=central-last>=16&&u32(last)===0x08074b50&&eq(tuple(last+4),sizes);need(bare!==signed);last=rangeEnd(last,signed?16:12,central);}
            const input=bytes.subarray(start,start+sizes[1]),data=method===0?input:inflateRawSync(input,{maxOutputLength:m.name==='envelope.bin'?128*MiB:4096});same(data.length,sizes[2]);same(crc32(data),sizes[0]);total+=data.length;need(total<=EXPANDED_CAP);result.set(m.name,data);}
            same(last,central);return result;
           }
           
           export async function assignedPrivate(binding,destination){
-           requireKeyless();const fixed={producer:'afw-producer-envelope',own:'afw-native-readback',...Object.fromEntries(PRIVATE_PEERS.map(x=>[x.job,'afw-qualification-peer-proof/'+x.job+'-sealed']))};need(Object.hasOwn(fixed,destination));const r=await metadata(binding.id);same(r.status,200);validateAssignedMetadata(r.value,binding);const bytes=await rawAssigned(binding.id,134283264);same(bytes.length,r.value.size_in_bytes);same(sha(bytes),binding.zipSha256);const files=decodePrivateZip(bytes);validatePrivateReceiptCaps(files,binding.kind);const dir=join(process.env.RUNNER_TEMP,fixed[destination]);await mkdir(dir,{mode:0o700});for(const [n,b]of files)await writeFile(join(dir,n),b,{flag:'wx',mode:0o600});return {binding,metadata:r.value,rawZipBytes:bytes.length,rawZipSha256:sha(bytes)};
+           requireKeyless();const fixed={producer:'afw-producer-envelope',own:'afw-native-readback',...Object.fromEntries(PRIVATE_PEERS.map(x=>[x.job,'afw-qualification-peer-proof/'+x.job+'-sealed']))};need(Object.hasOwn(fixed,destination));const r=await metadata(binding.id);same(r.status,200);validateAssignedMetadata(r.value,binding,'generic-private');const bytes=await rawAssigned(binding.id,'generic-private');same(bytes.length,r.value.size_in_bytes);same(sha(bytes),binding.zipSha256);const files=decodePrivateZip(bytes);validatePrivateReceiptCaps(files,binding.kind);const dir=join(process.env.RUNNER_TEMP,fixed[destination]);await mkdir(dir,{mode:0o700});for(const [n,b]of files)await writeFile(join(dir,n),b,{flag:'wx',mode:0o600});return {binding,metadata:r.value,rawZipBytes:bytes.length,rawZipSha256:sha(bytes)};
           }
           const JOB_CONFIG={positive_prepare:{role:'producer',group:'positive',lane:'positive',kind:'checkpoint',cases:['P1']},positive_consume:{role:'consumer',group:'positive',lane:'positive',kind:'positive-result',cases:['P1']},reduction_prepare:{role:'producer',group:'reduction_a',lane:'reduction',kind:'reduction-checkpoint',cases:['D1','D2','D3','D4']},reduction_consume_a:{role:'consumer',group:'reduction_a',lane:'reduction_a',kind:'reduction-result-a',cases:['D1','D2']},readonly:{role:'consumer',group:'readonly',lane:'readonly',kind:'readonly-result',cases:['R1','R2','R3']},reduction_consume_b:{role:'consumer',group:'reduction_b',lane:'reduction_b',kind:'reduction-result-b',cases:['D3','D4']}};
           export function manifestIdentity(job,kind){const cfg=JOB_CONFIG[job];return {purpose:'afw.fixed-budget-job.syn.v1',repository:CONTEXT.repository,ref:CONTEXT.ref,source:CONTEXT.source,sourceTree:CONTEXT.tree,run:CONTEXT.run,attempt:1,job,role:cfg.role,kind,group:cfg.group,lane:cfg.lane,cases:cfg.cases,commandSucceeded:kind===cfg.kind,jobStarted:1,sealedAt:2,...FLAGS};}
           export function validateInnerManifest(manifest,binding){
            const cfg=JOB_CONFIG[binding.job];need(cfg);fields(manifest,['purpose','repository','ref','source','sourceTree','run','attempt','job','role','kind','group','lane','cases','commandSucceeded','jobStarted','sealedAt',...Object.keys(FLAGS)]);
            const success=binding.kind===cfg.kind;need(success||binding.kind===(cfg.role==='producer'?'producer-failure':'consumer-failure'));const expected=manifestIdentity(binding.job,binding.kind);for(const k of Object.keys(expected).filter(k=>!['jobStarted','sealedAt'].includes(k)))same(manifest[k],expected[k]);need(Number.isSafeInteger(manifest.jobStarted)&&manifest.jobStarted>0&&Number.isSafeInteger(manifest.sealedAt)&&manifest.sealedAt>=manifest.jobStarted);return success;
           }
           export function validateReopenedSuite({proofBytes,originalProofBytes,originalManifestBytes,reopenedManifestBytes,ownBinding,expectedContext,expectedPeers}){
            same(expectedContext,CONTEXT);same(ownBinding.job,'reduction_consume_b');same(ownBinding.kind,'reduction-result-b');canonicalId(ownBinding.id);hex(ownBinding.zipSha256);need(Buffer.isBuffer(proofBytes)&&Buffer.isBuffer(originalProofBytes)&&proofBytes.equals(originalProofBytes));need(Buffer.isBuffer(originalManifestBytes)&&Buffer.isBuffer(reopenedManifestBytes)&&originalManifestBytes.equals(reopenedManifestBytes));validateInnerManifest(JSON.parse(reopenedManifestBytes),ownBinding);fields(expectedPeers,['pure','peers']);fields(expectedPeers.pure,['artifactId','zipSha256']);canonicalId(expectedPeers.pure.artifactId);hex(expectedPeers.pure.zipSha256);same(expectedPeers.peers.map(x=>({job:x.job,kind:x.kind})),PRIVATE_PEERS);for(const x of expectedPeers.peers){fields(x,['job','kind','artifactId','zipSha256']);canonicalId(x.artifactId);hex(x.zipSha256);}
-           const p=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(proofBytes));fields(p,['purpose','source','run','attempt','businessCounts','Q','R','D','P','lineages','occurrenceProof','consumerOverlap','receipts','jobs','observedNativeJobPeak','nativeJobBound','miniflarePerJobBound','globalMiniflareBound','requiresRootAllTerminalReadback',...Object.keys(FLAGS)]);same(p.purpose,'afw.fixed-budget-coherent-private-proof.syn.v1');same(p.source,CONTEXT.source);same(p.run,CONTEXT.run);same(p.attempt,1);same(p.businessCounts,{tests:16,pass:16,fail:0,cancelled:0,skipped:0,todo:0});same([p.Q,p.P,p.R,p.D],[8,1,3,4]);same(p.lineages.map(x=>x.kind),['positive','reduction','R1','R2','R3']);
+           const p=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(proofBytes));fields(p,['purpose','source','run','attempt','observedAt','businessCounts','Q','R','D','P','lineages','occurrenceProof','consumerOverlap','receipts','jobs','observedNativeJobPeak','nativeJobBound','miniflarePerJobBound','globalMiniflareBound','requiresRootAllTerminalReadback',...Object.keys(FLAGS)]);same(p.purpose,'afw.fixed-budget-coherent-private-proof.syn.v1');same(p.source,CONTEXT.source);same(p.run,CONTEXT.run);same(p.attempt,1);same(p.businessCounts,{tests:16,pass:16,fail:0,cancelled:0,skipped:0,todo:0});same([p.Q,p.P,p.R,p.D],[8,1,3,4]);same(p.lineages.map(x=>x.kind),['positive','reduction','R1','R2','R3']);
            for(const l of p.lineages){need(Number.isSafeInteger(l.I0)&&l.I0>0);same(l.C0,l.I0+900000);same(l.C1,l.C0+180000);hex(l.sdkRootHash);same(l.graphs.map(x=>x.role).sort(),['M','QA']);for(const x of l.graphs)hex(x.sha256);}
-           same(p.occurrenceProof.length,5);for(const [n,o]of p.occurrenceProof.entries()){same(o.occurrence,n+1);need(typeof o.caseName==='string'&&o.caseName.length>0);need(Number.isSafeInteger(o.allocationOrdinal)&&o.allocationOrdinal>0);same(o.graphs.length,2);same(o.graphs.map(x=>x.role).sort(),['M','QA']);for(const g of o.graphs){same(g.mounted,true);same(g.sha256,p.lineages[n].graphs.find(x=>x.role===g.role).sha256);}}
+           same(p.occurrenceProof.map(x=>x.caseName),['positive_producer','reduction_producer','R1','R2','R3']);same(p.occurrenceProof.length,5);for(const [n,o]of p.occurrenceProof.entries()){same(o.occurrence,n+1);need(typeof o.caseName==='string'&&o.caseName.length>0);need(Number.isSafeInteger(o.allocationOrdinal)&&o.allocationOrdinal>0);same(o.graphs.length,2);same(o.graphs.map(x=>x.role).sort(),['M','QA']);for(const g of o.graphs){same(g.mounted,true);same(g.sha256,p.lineages[n].graphs.find(x=>x.role===g.role).sha256);}}
            const overlap=p.consumerOverlap;fields(overlap,['aStart','aEnd','bStart','bEnd','allFourReady','C0']);for(const n of Object.values(overlap))need(Number.isSafeInteger(n)&&n>0);need(overlap.aStart<overlap.aEnd&&overlap.bStart<overlap.bEnd&&Math.max(overlap.aStart,overlap.bStart)<Math.min(overlap.aEnd,overlap.bEnd));same(overlap.C0,p.lineages[1].C0);need(overlap.allFourReady<=overlap.C0-30000);
            same(p.receipts.length,6);const wanted=[{job:'contracts',kind:'pure',...expectedPeers.pure},...expectedPeers.peers];for(const [n,r]of p.receipts.entries()){fields(r,['artifactId','digest','name','kind']);same(r.artifactId,wanted[n].artifactId);same(r.digest,'sha256:'+wanted[n].zipSha256);same(r.kind,wanted[n].kind);same(r.name,artifactName(wanted[n].job));}
-           const inventory={total_count:p.jobs.length,jobs:p.jobs.map(j=>{fields(j,['id','name','status','conclusion','startedAt','completedAt']);return {...j,started_at:j.startedAt,completed_at:j.completedAt};})},at=Date.parse(inventory.jobs.find(x=>x.name==='reduction_consume_b')?.started_at)+780000;const observation=validatePeerInventory(inventory,at);need(Number.isSafeInteger(p.observedNativeJobPeak)&&p.observedNativeJobPeak>=1&&p.observedNativeJobPeak<=3);same([p.nativeJobBound,p.miniflarePerJobBound,p.globalMiniflareBound],[3,2,6]);same(p.requiresRootAllTerminalReadback,true);for(const k of Object.keys(FLAGS))same(p[k],false);
-           return {counts:{Q:p.Q,P:p.P,R:p.R,D:p.D,native:p.P+p.R+p.D,...p.businessCounts},cases:['P1','R1','R2','R3','D1','D2','D3','D4'],lineages:p.lineages.length,graphs:p.lineages.flatMap(x=>x.graphs).length,replicaOverlap:true,allFourReadyBeforeC0Minus30s:true,sharedReductionClock:true,C0MinusI0Ms:900000,C1MinusC0Ms:180000,observedNativeJobPeak:p.observedNativeJobPeak,nativeJobBound:p.nativeJobBound,miniflarePerJobBound:p.miniflarePerJobBound,globalMiniflareBound:p.globalMiniflareBound,privateProofSha256:sha(proofBytes),peerJobs:observation.peerJobs,selfJob:observation.selfJob,peerArtifacts:expectedPeers.peers,requiresRootAllTerminalReadback:true};
+           const inventory={total_count:p.jobs.length,jobs:p.jobs.map(j=>{fields(j,['id','name','status','conclusion','startedAt','completedAt']);return {...j,started_at:j.startedAt,completed_at:j.completedAt};})};need(Number.isSafeInteger(p.observedAt)&&p.observedAt>0);const ownManifest=JSON.parse(reopenedManifestBytes),self=inventory.jobs.find(x=>x.name==='reduction_consume_b');need(Date.parse(self.started_at)<=p.observedAt&&p.observedAt<=ownManifest.sealedAt);const observation=validatePeerInventory(inventory,p.observedAt);same(p.observedNativeJobPeak,observation.observedNativeJobPeak);same([p.nativeJobBound,p.miniflarePerJobBound,p.globalMiniflareBound],[3,2,6]);same(p.requiresRootAllTerminalReadback,true);for(const k of Object.keys(FLAGS))same(p[k],false);
+           return {counts:{Q:p.Q,P:p.P,R:p.R,D:p.D,native:p.P+p.R+p.D,...p.businessCounts},cases:['P1','R1','R2','R3','D1','D2','D3','D4'],lineages:p.lineages.length,graphs:p.lineages.flatMap(x=>x.graphs).length,replicaOverlap:true,allFourReadyBeforeC0Minus30s:true,sharedReductionClock:true,C0MinusI0Ms:900000,C1MinusC0Ms:180000,observedNativeJobPeak:observation.observedNativeJobPeak,nativeJobBound:p.nativeJobBound,miniflarePerJobBound:p.miniflarePerJobBound,globalMiniflareBound:p.globalMiniflareBound,privateProofSha256:sha(proofBytes),peerJobs:observation.peerJobs,selfJob:observation.selfJob,peerArtifacts:expectedPeers.peers,requiresRootAllTerminalReadback:true};
           }
           function common(value,expected){
            fields(value.context,['repository','repositoryId','ref','source','tree','workflowBlob','run','attempt','node']);same(value.context,expected.context);same(value.context.repository,'tokenizartinfo-ops/agent-friendly-web');same(value.context.repositoryId,'1347578006');same(value.context.ref,'refs/heads/feat/finite-native-cleanup-20261101');same(value.context.attempt,1);same(value.context.node,'22.23.4');for(const k of ['source','tree','workflowBlob'])hex(value.context[k],40);canonicalId(value.context.run);fields(value.sourcePins,Object.keys(SOURCE_PINS));same(value.sourcePins,SOURCE_PINS);same(value.sourcePins,expected.sourcePins);fields(value.programHashes,['adapter','controls','verifier','safeZip']);same(value.programHashes,expected.programHashes);for(const h of Object.values(value.programHashes))hex(h);same(value.programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');same(new Set(Object.values(value.programHashes)).size,4);for(const f of Object.keys(FLAGS))same(value[f],false);
           }
           function validateProof(p){
            fields(p,['counts','cases','lineages','graphs','replicaOverlap','allFourReadyBeforeC0Minus30s','sharedReductionClock','C0MinusI0Ms','C1MinusC0Ms','observedNativeJobPeak','nativeJobBound','miniflarePerJobBound','globalMiniflareBound','privateProofSha256','peerJobs','selfJob','peerArtifacts','requiresRootAllTerminalReadback']);same(p.counts,{Q:8,P:1,R:3,D:4,native:8,tests:16,pass:16,fail:0,cancelled:0,skipped:0,todo:0});same(p.cases,['P1','R1','R2','R3','D1','D2','D3','D4']);same(p.lineages,5);same(p.graphs,10);for(const k of ['replicaOverlap','allFourReadyBeforeC0Minus30s','sharedReductionClock','requiresRootAllTerminalReadback'])same(p[k],true);same(p.C0MinusI0Ms,900000);same(p.C1MinusC0Ms,180000);need(Number.isSafeInteger(p.observedNativeJobPeak)&&p.observedNativeJobPeak>=1&&p.observedNativeJobPeak<=3);same([p.nativeJobBound,p.miniflarePerJobBound,p.globalMiniflareBound],[3,2,6]);hex(p.privateProofSha256);same(p.peerJobs.map(x=>x.name),LEGACY.slice(0,6));for(const j of p.peerJobs){fields(j,['name','jobId','status','conclusion']);canonicalId(j.jobId);same(j.status,'completed');same(j.conclusion,'success');}fields(p.selfJob,['name','jobId','status','conclusion']);same(p.selfJob.name,'reduction_consume_b');canonicalId(p.selfJob.jobId);same(p.selfJob.status,'in_progress');same(p.selfJob.conclusion,null);same(new Set([...p.peerJobs,p.selfJob].map(x=>x.jobId)).size,7);same(p.peerArtifacts.map(x=>({job:x.job,kind:x.kind})),PRIVATE_PEERS);for(const r of p.peerArtifacts){fields(r,['job','kind','artifactId','zipSha256']);canonicalId(r.artifactId);hex(r.zipSha256);}same(new Set(p.peerArtifacts.map(x=>x.artifactId)).size,5);
           }
           function deriveFailure(v){
            if(v.command==='failed')return {stage:'native_b',reason:'command_failed'};
            if(v.pure===null)return {stage:'pure',reason:'pure_unverified'};
@@ -183,141 +283,479 @@
            fields(v,['purpose','context','sourcePins','programHashes','status','expected','completed','passed','failed','inventory','firstFailure','realCustodyKeyBound','NativeExecuted','SDKImported','MFAllocated',...Object.keys(FLAGS)]);common(v,expected);same(v.purpose,'afw.coherent-suite.controls.safe.v1');same(v.expected,6);same(v.inventory.map(x=>x.id),IDS);for(const x of v.inventory){fields(x,['id','status']);need(['passed','failed','not_executed'].includes(x.status));}for(const k of ['realCustodyKeyBound','NativeExecuted','SDKImported','MFAllocated'])same(v[k],false);const first=v.inventory.findIndex(x=>x.status!=='passed');if(first===-1){same([v.status,v.completed,v.passed,v.failed,v.firstFailure],['passed',6,6,0,null]);}else {same(v.inventory[first].status,'failed');same(v.inventory.slice(first+1).map(x=>x.status),Array(5-first).fill('not_executed'));same([v.status,v.completed,v.passed,v.failed,v.firstFailure],['failed',first+1,first,1,IDS[first]]);}return v;
           }
           export function makeManifest(kind,resultBytes,context){need(kind==='suite'||kind==='controls');return {purpose:kind==='suite'?'afw.coherent-suite-manifest.safe.v1':'afw.coherent-suite.controls-manifest.safe.v1',source:context.source,run:context.run,attempt:1,files:[{path:'result.json',bytes:resultBytes.length,sha256:sha(resultBytes)}]};}
           export async function publishPair(kind,result){
            requireKeyless();(kind==='suite'?validateSuite:validateControls)(result);const bytes=canonical(result),manifest=canonical(makeManifest(kind,bytes,result.context));need(bytes.length+manifest.length<=65536);const files=new Map([['result.json',bytes],['manifest.json',manifest]]),root=join(process.env.RUNNER_TEMP,kind==='suite'?'afw-suite-safe':'afw-suite-controls-safe');await mkdir(root,{mode:0o700,recursive:true});same((await readdir(root)).filter(x=>!['manifest.json','result.json'].includes(x)),[]);for(const [n,b]of files)await writeFile(join(root,n),b,{mode:0o600});same((await readdir(root)).sort(),['manifest.json','result.json']);return files;
           }
           
           export function validatePrivateReceiptCaps(files,kind){
            const r=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(files.get('receipt.json'))),partial=['producer-failure','consumer-failure'].includes(kind);need(Number.isSafeInteger(r.fileCount)&&r.fileCount>=(partial?0:1)&&r.fileCount<=(partial?4096:512));need(Number.isSafeInteger(r.totalBytes)&&r.totalBytes>=0&&r.totalBytes<=(partial?512:128)*1048576);return r;
           }
+          
+          function validatePureReceipt(receipt){
+           fields(receipt,['artifactId','zipSha256','manifestSha256','profiles','purePassed','beforeI0']);canonicalId(receipt.artifactId);hex(receipt.zipSha256);hex(receipt.manifestSha256);same(receipt.profiles,['positive','readonly','reduction_a']);same(receipt.purePassed,true);same(receipt.beforeI0,true);return receipt;
+          }
+          const fixedReceiptIO={write:(path,bytes,options)=>writeFile(path,bytes,options)};
+          export async function finalizePureBinding(receipt,originalWork,io=fixedReceiptIO){
+           requireKeyless();validatePureReceipt(receipt);need(typeof originalWork==='function');await originalWork();validatePureReceipt(receipt);
+           await io.write(join(process.env.RUNNER_TEMP,'afw-native-private/pure-assignment.json'),JSON.stringify(receipt)+'\n',{flag:'wx',mode:0o600});return receipt;
+          }
+          export function projectSuiteOutcome({outcomes,receipts}){
+           fields(outcomes,['pureBinding','native','aggregate','ownMetadata','ownOpen','ownValidation']);
+           fields(receipts,['pure','assignment','proof']);
+           const allowed=['success','failure','skipped','cancelled','not_observed'];
+           for(const value of Object.values(outcomes))need(allowed.includes(value));
+           const observed=value=>value==='success'||value==='failure';
+           const pure=outcomes.pureBinding==='success'&&receipts.pure!==null?validatePureReceipt(receipts.pure):null;
+           if(pure===null)need(!observed(outcomes.native)&&!observed(outcomes.aggregate));
+           const command=pure===null||!observed(outcomes.native)?'not_observed':outcomes.native==='success'?'passed':'failed';
+           if(command!=='passed')need(!observed(outcomes.aggregate));
+           const aggregate=command!=='passed'?'not_observed':outcomes.aggregate==='success'?'verified':outcomes.aggregate==='failure'?'unverified':'not_observed';
+           let assignment=receipts.assignment;
+           if(assignment!==null){
+            fields(assignment,['id','zipSha256','kind']);canonicalId(assignment.id);hex(assignment.zipSha256);
+            same(assignment.kind,command==='passed'&&aggregate==='verified'?'reduction-result-b':'consumer-failure');
+           }
+           if(outcomes.ownMetadata==='success')need(assignment!==null);
+           if(outcomes.ownOpen==='success')same(outcomes.ownMetadata,'success');
+           if(outcomes.ownValidation==='success')same(outcomes.ownOpen,'success');
+           const custody=assignment===null?{state:'unavailable',artifact:null}:{state:outcomes.ownValidation==='success'?'reopened':'assigned',artifact:assignment};
+           let proof=null,failure=null;
+           if(command==='failed')failure={stage:'native_b',reason:'command_failed'};
+           else if(pure===null)failure={stage:'pure',reason:'pure_unverified'};
+           else if(command==='not_observed')failure={stage:'native_b',reason:'not_observed'};
+           else if(aggregate==='not_observed')failure={stage:'aggregate',reason:'not_observed'};
+           else if(aggregate==='unverified')failure={stage:'aggregate',reason:'evidence_unverified'};
+           else if(assignment===null||outcomes.ownMetadata!=='success')failure={stage:'custody',reason:'assignment_unverified'};
+           else if(outcomes.ownOpen!=='success')failure={stage:'custody',reason:'reopen_unverified'};
+           else if(outcomes.ownValidation!=='success')failure={stage:'custody',reason:'proof_unverified'};
+           else {need(receipts.proof!==null);proof=receipts.proof;}
+           return makeSuite({context:CONTEXT,sourcePins:PINS,programHashes:PROGRAM_HASHES,command,aggregate,pure,custody,proof,failure});
+          }
           NODE_SUITE_ADAPTER
           cat >"$RUNNER_TEMP/afw-suite-controls.mjs" <<'NODE_SUITE_CONTROLS'
           import assert from 'node:assert/strict';
           import {readFile,mkdir,readdir} from 'node:fs/promises';
           import {spawnSync} from 'node:child_process';
           import * as A from './afw-suite-adapter.mjs';
-          import {validatePair,verifyRoute,verifySeven} from './afw-suite-verifier.mjs';
+          import {validatePair,verifyRoute,verifySeven,reconcileSuite,receiverControlsGuard} from './afw-suite-verifier.mjs';
           export const CONTROL_IDS=Object.freeze(['dag_peer_inventory','key_scope','fixed_case_counts','metadata_custody_binding','incomplete_or_contradictory','coherent_current_pair']);
           const clone=v=>structuredClone(v),reject=f=>assert.throws(f),H='a'.repeat(64),id=n=>String(100+n);
           function jobs(){return A.LEGACY.map((name,n)=>({id:100+n,name,status:n===6?'in_progress':'completed',conclusion:n===6?null:'success',started_at:new Date(1700000000000+n*10000).toISOString(),completed_at:n===6?null:new Date(1700000009000+n*10000).toISOString()}));}
           function meta(job,kind,artifactId,digest){return {id:Number(artifactId),name:A.artifactName(job),expired:false,digest:'sha256:'+digest,size_in_bytes:300,expires_at:new Date(Date.now()+86400000).toISOString(),workflow_run:{id:Number(A.CONTEXT.run),head_sha:A.CONTEXT.source,head_branch:A.CONTEXT.ref.slice(11)}};}
           function pureFixture(){
            const files=new Map(),put=(n,v)=>files.set(n,Buffer.from(JSON.stringify(v))),common={source:A.CONTEXT.source,run:A.CONTEXT.run,attempt:'1'};
            put('q-counts.json',{tests:8,pass:8,fail:0,cancelled:0,skipped:0,todo:0});put('status.json',{...common,status:'pure_passed',outcomes:{PURE_TEST_OUTCOME:'success',CONTROLS_OUTCOME:'success',PREFLIGHT_OUTCOME:'success'},validationFailures:[],I0Opened:false,nativeExecutionProduced:false});put('controls.json',{...common,passed:true,groups:Array.from({length:8},(_,n)=>({group:'F'+(n+1),passed:true})),I0Opened:false,nativeExecutionProduced:false});
            const profiles=['positive','readonly','reduction_a'];put('diagnostics.json',{...common,allPassed:true,I0Opened:false,nativeExecutionProduced:false,profiles:profiles.map((profile,n)=>({profile,stage:'complete',passed:true,I0Opened:false,nativeExecutionProduced:false,additionalSYNCount:n?3:0}))});for(const [n,group]of profiles.entries())put('preflight-'+group+'.json',{...common,group,I0Opened:false,nativeExecutionProduced:false,additionalSYN:Array.from({length:n?3:0},()=>({inert:true}))});files.set('preflight.json',files.get('preflight-positive.json'));put('budget-artifact.json',{purpose:'afw.finite-budget-artifact.syn.v1',...common,kind:'pure',files:[...files].map(([path,b])=>({path,bytes:b.length,sha256:A.sha(b)})).sort((a,b)=>a.path.localeCompare(b.path)),operationalReadiness:false,completePackage:false,PCoff:false});
            return {files,assignment:{job:'contracts',kind:'pure',id:'123',zipSha256:H},manifestSha256:A.sha(files.get('budget-artifact.json'))};
           }
           function golden(){
            const peers=jobs(),proof={counts:{Q:8,P:1,R:3,D:4,native:8,tests:16,pass:16,fail:0,cancelled:0,skipped:0,todo:0},cases:['P1','R1','R2','R3','D1','D2','D3','D4'],lineages:5,graphs:10,replicaOverlap:true,allFourReadyBeforeC0Minus30s:true,sharedReductionClock:true,C0MinusI0Ms:900000,C1MinusC0Ms:180000,observedNativeJobPeak:1,nativeJobBound:3,miniflarePerJobBound:2,globalMiniflareBound:6,privateProofSha256:H,peerJobs:peers.slice(0,6).map(x=>({name:x.name,jobId:String(x.id),status:x.status,conclusion:x.conclusion})),selfJob:{name:'reduction_consume_b',jobId:'106',status:'in_progress',conclusion:null},peerArtifacts:A.PRIVATE_PEERS.map((x,n)=>({job:x.job,kind:x.kind,artifactId:id(n),zipSha256:H})),requiresRootAllTerminalReadback:true};
            return A.makeSuite({context:A.CONTEXT,sourcePins:A.PINS,programHashes:A.PROGRAM_HASHES,command:'passed',aggregate:'verified',pure:{artifactId:'123',zipSha256:H,manifestSha256:H,profiles:['positive','readonly','reduction_a'],purePassed:true,beforeI0:true},custody:{state:'reopened',artifact:{id:'222',zipSha256:H,kind:'reduction-result-b'}},proof,failure:null});
           }
           function privateProof(){
            const peer=jobs(),graphs=[{role:'M',sha256:H},{role:'QA',sha256:H}];
-           return {purpose:'afw.fixed-budget-coherent-private-proof.syn.v1',source:A.CONTEXT.source,run:A.CONTEXT.run,attempt:1,businessCounts:{tests:16,pass:16,fail:0,cancelled:0,skipped:0,todo:0},Q:8,R:3,D:4,P:1,lineages:['positive','reduction','R1','R2','R3'].map(kind=>({kind,I0:100000,C0:1000000,C1:1180000,sdkRootHash:H,graphs})),occurrenceProof:['positive','reduction','R1','R2','R3'].map((caseName,n)=>({occurrence:n+1,caseName,allocationOrdinal:1,graphs:graphs.map(x=>({...x,mounted:true}))})),consumerOverlap:{aStart:200000,aEnd:800000,bStart:250000,bEnd:850000,allFourReady:900000,C0:1000000},receipts:[{artifactId:'123',digest:'sha256:'+H,name:A.artifactName('contracts'),kind:'pure'},...A.PRIVATE_PEERS.map((x,n)=>({artifactId:id(n),digest:'sha256:'+H,name:A.artifactName(x.job),kind:x.kind}))],jobs:peer.map(x=>({id:x.id,name:x.name,status:x.status,conclusion:x.conclusion,startedAt:x.started_at,completedAt:x.completed_at})),observedNativeJobPeak:1,nativeJobBound:3,miniflarePerJobBound:2,globalMiniflareBound:6,requiresRootAllTerminalReadback:true,...A.FLAGS};
+           return {purpose:'afw.fixed-budget-coherent-private-proof.syn.v1',source:A.CONTEXT.source,run:A.CONTEXT.run,attempt:1,observedAt:1700000070000,businessCounts:{tests:16,pass:16,fail:0,cancelled:0,skipped:0,todo:0},Q:8,R:3,D:4,P:1,lineages:['positive','reduction','R1','R2','R3'].map(kind=>({kind,I0:100000,C0:1000000,C1:1180000,sdkRootHash:H,graphs})),occurrenceProof:['positive_producer','reduction_producer','R1','R2','R3'].map((caseName,n)=>({occurrence:n+1,caseName,allocationOrdinal:1,graphs:graphs.map(x=>({...x,mounted:true}))})),consumerOverlap:{aStart:200000,aEnd:800000,bStart:250000,bEnd:850000,allFourReady:900000,C0:1000000},receipts:[{artifactId:'123',digest:'sha256:'+H,name:A.artifactName('contracts'),kind:'pure'},...A.PRIVATE_PEERS.map((x,n)=>({artifactId:id(n),digest:'sha256:'+H,name:A.artifactName(x.job),kind:x.kind}))],jobs:peer.map(x=>({id:x.id,name:x.name,status:x.status,conclusion:x.conclusion,startedAt:x.started_at,completedAt:x.completed_at})),observedNativeJobPeak:1,nativeJobBound:3,miniflarePerJobBound:2,globalMiniflareBound:6,requiresRootAllTerminalReadback:true,...A.FLAGS};
           }
           function fixtureZip(files){
            const crc=b=>{let c=0xffffffff;for(const v of b){c^=v;for(let n=0;n<8;n++)c=c&1?0xedb88320^(c>>>1):c>>>1;}return (c^0xffffffff)>>>0;},local=[],central=[];let offset=0;
            for(const [name,data]of files){const n=Buffer.from(name),l=Buffer.alloc(30),c=Buffer.alloc(46),h=crc(data);l.writeUInt32LE(0x04034b50);l.writeUInt16LE(20,4);l.writeUInt32LE(h,14);l.writeUInt32LE(data.length,18);l.writeUInt32LE(data.length,22);l.writeUInt16LE(n.length,26);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt32LE(h,16);c.writeUInt32LE(data.length,20);c.writeUInt32LE(data.length,24);c.writeUInt16LE(n.length,28);c.writeUInt32LE(offset,42);local.push(l,n,data);central.push(c,n);offset+=30+n.length+data.length;}
            const dir=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(files.size,8);end.writeUInt16LE(files.size,10);end.writeUInt32LE(dir.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...local,dir,end]);
           }
           async function syntaxControls(text){
            let shellPrograms=0,nodePrograms=0;
            const rows=text.split('\n');
            for(let n=0;n<rows.length;n++){if(rows[n]!=='        run: |')continue;const lines=[];while(n+1<rows.length&&(rows[n+1].startsWith('          ')||rows[n+1]==='')){const next=rows[++n];lines.push(next===''?'':next.slice(10));}const script=lines.join('\n')+'\n',shell=spawnSync('bash',['-n'],{input:script,encoding:'utf8',maxBuffer:4096,timeout:10000});assert.equal(shell.status,0,'shell_wrapper_syntax');shellPrograms++;
             const re=/^(?:[A-Z_0-9]+=\S+ )?node --input-type=module <<'([A-Z_0-9]+)'[^\n]*\n/gm;let match;while((match=re.exec(script))){const start=re.lastIndex,end=script.indexOf('\n'+match[1]+'\n',start);assert(end>=start);const body=script.slice(start,end)+'\n',parsed=spawnSync(process.execPath,['--input-type=module','--check'],{input:body,encoding:'utf8',maxBuffer:4096,timeout:10000});assert.equal(parsed.status,0,'inline_module_syntax');nodePrograms++;re.lastIndex=end+match[1].length+2;}
            }
            for(const name of ['adapter','controls','verifier','safe-zip']){const parsed=spawnSync(process.execPath,['--check',process.env.RUNNER_TEMP+'/afw-suite-'+name+'.mjs'],{encoding:'utf8',maxBuffer:4096,timeout:10000});assert.equal(parsed.status,0,'helper_module_syntax');nodePrograms++;}
-           assert(shellPrograms>30&&nodePrograms>20);console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SYNTAX/1',shellPrograms,nodePrograms,SourceExecuted:false,NativeExecuted:false,SDKImported:false,MFAllocated:false,...A.FLAGS}));
+           assert(shellPrograms>30&&nodePrograms>20);console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SYNTAX/1',shellPrograms,nodePrograms,inspectedBodiesExecuted:false,NativeExecuted:false,SDKImported:false,MFAllocated:false,...A.FLAGS}));
           }
           async function cryptoControl(){
            assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
            const script="import assert from 'node:assert/strict';import {mkdir,writeFile,readFile} from 'node:fs/promises';import {sealDirectory,openDirectory} from '__MODULE__';const base=process.env.RUNNER_TEMP+'/afw-suite-inert-crypto',context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,sourceSha:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,kind:'reduction-result-b'};await mkdir(base,{mode:0o700});await mkdir(base+'/input',{mode:0o700});const bytes=Buffer.from('{\"inert\":true}\\n');await writeFile(base+'/input/proof.json',bytes);await sealDirectory({sourceDir:base+'/input',stagingDir:base+'/sealed',context});await openDirectory({stagingDir:base+'/sealed',destinationDir:base+'/opened',context});assert(bytes.equals(await readFile(base+'/opened/proof.json')));const b=await readFile(base+'/sealed/envelope.bin');b[b.length-1]^=1;await writeFile(base+'/sealed/envelope.bin',b);await assert.rejects(()=>openDirectory({stagingDir:base+'/sealed',destinationDir:base+'/bad',context}));";
            const moduleURL=new URL('file://'+process.cwd()+'/test/fixtures/finite-checkpoint-custody.mjs').href,result=spawnSync(process.execPath,['--input-type=module','-e',script.replace('__MODULE__',moduleURL)],{env:{PATH:process.env.PATH,RUNNER_TEMP:process.env.RUNNER_TEMP,GITHUB_REPOSITORY:A.CONTEXT.repository,GITHUB_REF:A.CONTEXT.ref,GITHUB_SHA:A.CONTEXT.source,GITHUB_RUN_ID:A.CONTEXT.run,GITHUB_RUN_ATTEMPT:'1',AFW_SYN_CHECKPOINT_KEY:'11'.repeat(32)},stdio:'pipe',timeout:30000,maxBuffer:4096});
            assert.equal(result.status,0,'isolated_generic_crypto_control');const entries=new Map();for(const n of ['envelope.bin','manifest.json','receipt.json'])entries.set(n,await readFile(process.env.RUNNER_TEMP+'/afw-suite-inert-crypto/sealed/'+n));const raw=fixtureZip(entries),opened=A.decodePrivateZip(raw);assert.equal(opened.size,3);for(const [n,b]of entries)assert(b.equals(opened.get(n)));A.validatePrivateReceiptCaps(opened,'reduction-result-b');const corrupt=Buffer.from(raw);corrupt[30+Buffer.byteLength('envelope.bin')]^=1;reject(()=>A.decodePrivateZip(corrupt));reject(()=>A.validatePrivateReceiptCaps(new Map([['receipt.json',Buffer.from(JSON.stringify({fileCount:513,totalBytes:1}))]]),'reduction-result-b'));A.validatePrivateReceiptCaps(new Map([['receipt.json',Buffer.from(JSON.stringify({fileCount:0,totalBytes:0}))]]),'consumer-failure');assert.equal(result.error,undefined);assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
           }
+          
+          function actualRegion(text,job,stepId=null){
+           const re=new RegExp('^  '+job+':\\n','gm'),matches=[...text.matchAll(re)];assert.equal(matches.length,1);
+           const begin=matches[0].index,next=/^  [a-z_]+:\n/gm;next.lastIndex=begin+matches[0][0].length;const end=next.exec(text)?.index??text.length;
+           if(stepId===null)return {start:begin,end,text:text.slice(begin,end)};
+           const block=text.slice(begin,end),parts=[...block.matchAll(/^      - /gm)],found=[];
+           for(let n=0;n<parts.length;n++){const start=parts[n].index,finish=parts[n+1]?.index??block.length,s=block.slice(start,finish);if(new RegExp('^        id: '+stepId+'$','m').test(s))found.push({start:begin+start,end:begin+finish,text:s});}
+           assert.equal(found.length,1);return found[0];
+          }
+          function mutateActual(text,job,stepId,from,to){
+           const r=actualRegion(text,job,stepId);assert.notEqual(from,to);assert.equal(r.text.split(from).length-1,1);
+           const changed=r.text.replace(from,to);assert.notEqual(changed,r.text);
+           const result=text.slice(0,r.start)+changed+text.slice(r.end),now=actualRegion(result,job,stepId);
+           assert.equal(result.slice(0,now.start),text.slice(0,r.start));assert.equal(result.slice(now.end),text.slice(r.end));assert.equal(now.text,changed);return result;
+          }
+          function completeNeeds(g=golden()){
+           return Object.fromEntries(A.LEGACY.map(name=>[name,{result:'success',outputs:name==='contracts'?{'artifact-id':g.pure.artifactId,'artifact-digest':g.pure.zipSha256,'manifest-sha256':g.pure.manifestSha256}:(()=>{const a=name==='reduction_consume_b'?{artifactId:g.custody.artifact.id,zipSha256:g.custody.artifact.zipSha256,kind:g.custody.artifact.kind}:g.proof.peerArtifacts.find(x=>x.job===name);return {'artifact-id':a.artifactId,'artifact-digest':a.zipSha256,kind:a.kind};})()}]));
+          }
+          function finalJobs(){
+           const terminal=jobs().map(x=>({...x,status:'completed',conclusion:'success',completed_at:new Date(1700000070000).toISOString()}));
+           return {total_count:8,jobs:[...terminal,{id:999,name:'verify',status:'in_progress',conclusion:null,started_at:new Date(1700000071000).toISOString(),completed_at:null}]};
+          }
+          function actualOutcomes(overrides={}){return {pureBinding:'success',native:'success',aggregate:'success',ownMetadata:'success',ownOpen:'success',ownValidation:'success',...overrides};}
+          function actualReceipts(g=golden()){return {pure:g.pure,assignment:g.custody.artifact,proof:g.proof};}
+          function proofInput(p=privateProof()){
+           const bytes=Buffer.from(JSON.stringify(p,null,2)),manifest=Buffer.from(JSON.stringify({...A.manifestIdentity('reduction_consume_b','reduction-result-b'),jobStarted:1700000000000,sealedAt:1700000080000}));
+           return {proofBytes:bytes,originalProofBytes:bytes,originalManifestBytes:manifest,reopenedManifestBytes:manifest,ownBinding:{job:'reduction_consume_b',kind:'reduction-result-b',id:'222',zipSha256:H},expectedContext:A.CONTEXT,expectedPeers:{pure:{artifactId:'123',zipSha256:H},peers:golden().proof.peerArtifacts}};
+          }
+          function routeFixture(result,kind='suite',needs=completeNeeds()){
+           const bytes=A.canonical(result),files=new Map([['result.json',bytes],['manifest.json',A.canonical(A.makeManifest(kind,bytes,A.CONTEXT))]]),zip=fixtureZip(files),digest=A.sha(zip),safeMeta=meta(kind,kind,'777',digest);safeMeta.size_in_bytes=zip.length;
+           const calls=[],io={
+            metadata:async artifactId=>{calls.push(artifactId);if(artifactId==='777')return {status:200,value:safeMeta};for(const job of A.LEGACY){const o=needs[job].outputs;if(o['artifact-id']===artifactId)return {status:200,value:meta(job,job==='contracts'?'pure':o.kind,artifactId,o['artifact-digest'])};}return {status:404,value:null};},
+            zip:async()=>zip,
+            source:async()=>({object:{sha:A.CONTEXT.source}}),
+            jobs:async path=>{assert.equal(path,'/actions/runs/'+A.CONTEXT.run+'/attempts/1/jobs?per_page=100');return finalJobs();}
+           };
+           return {args:{kind,id:'777',uploaded:digest,expected:{context:A.CONTEXT,sourcePins:A.PINS,programHashes:A.PROGRAM_HASHES}},io,calls,files,safeMeta,needs};
+          }
           export async function runControls(){
-           const inventory=CONTROL_IDS.map(id=>({id,status:'not_executed'})),expected={context:A.CONTEXT,sourcePins:A.PINS,programHashes:A.PROGRAM_HASHES};let firstFailure=null;
+           const inventory=CONTROL_IDS.map(id=>({id,status:'not_executed'})),expected={context:A.CONTEXT,sourcePins:A.PINS,programHashes:A.PROGRAM_HASHES};
+           let firstFailure=null,currentFamily=null;
+           const sub=async(id,fn)=>{
+            console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SUBCASE/1',family:currentFamily,id,phase:'start',...A.FLAGS}));
+            try{await fn();console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SUBCASE/1',family:currentFamily,id,phase:'passed',...A.FLAGS}));}
+            catch{console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SUBCASE/1',family:currentFamily,id,phase:'failed',...A.FLAGS}));throw Error('fixed_subcase_failed');}
+           };
            const cases=[
-           async()=>{const j=jobs(),at=1700000070000;assert.equal(A.validatePeerInventory({total_count:7,jobs:j},at).observedNativeJobPeak,1);for(const status of ['pending','queued','waiting','requested'])A.validatePeerInventory({total_count:8,jobs:[...j,{id:999,name:'verify',status,conclusion:null}]},at);for(const list of [j.slice(1),[...j,j[0]],[...j,{id:999,name:'extra',status:'queued'}],[...j,{id:999,name:'verify',status:'in_progress',conclusion:null}]])reject(()=>A.validatePeerInventory({total_count:list.length,jobs:list},at));const bad=clone(j);bad[1].started_at='invalid';reject(()=>A.validatePeerInventory({total_count:7,jobs:bad},at));bad[1]=clone(j[1]);bad[1].completed_at=new Date(1).toISOString();reject(()=>A.validatePeerInventory({total_count:7,jobs:bad},at));const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');A.validateWorkflow(text);reject(()=>A.validateWorkflow(text.replace('needs: [contracts, readonly, reduction_prepare]','needs: [contracts, readonly, reduction_prepare, reduction_consume_a]')));},
-           async()=>{const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');A.validateKeyScopes(text);reject(()=>A.validateKeyScopes(text.replace('      AFW_BUDGET_GROUP: positive','      AFW_SYN_CHECKPOINT_KEY: exposed\n      AFW_BUDGET_GROUP: positive')));reject(()=>A.validateKeyScopes(text.replace('environment: afw-finite-syn-checkpoint','environment: changed')));const before=process.env.AFW_SYN_CHECKPOINT_KEY;try{process.env.AFW_SYN_CHECKPOINT_KEY='INERT_SCOPE';reject(()=>A.requireKeyless());}finally{if(before===undefined)delete process.env.AFW_SYN_CHECKPOINT_KEY;else process.env.AFW_SYN_CHECKPOINT_KEY=before;}A.requireKeyless();},
-           async()=>{await A.validateSourcePins();const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');A.validateFixedCases(text);await syntaxControls(text);for(const [from,to]of [["AFW_EXPECTED_CASES=3","AFW_EXPECTED_CASES=4"],["FIXED_CASES: '[\"D3\",\"D4\"]'","FIXED_CASES: '[\"D3\"]'"],['C0MinusI0Ms:900000','C0MinusI0Ms:900001']])reject(()=>A.validateFixedCases(text.replace(from,to)));},
-           async()=>{const m=meta('positive_prepare','checkpoint','101',H),assignment={job:'positive_prepare',kind:'checkpoint',id:'101',zipSha256:H};A.validateAssignedMetadata(m,assignment);for(const [field,value]of [['id',102],['name','other'],['expired',true],['digest','sha256:'+'b'.repeat(64)],['expires_at','2000-01-01T00:00:00.000Z']]){const b=clone(m);b[field]=value;reject(()=>A.validateAssignedMetadata(b,assignment));}for(const [field,value]of [['id',1],['head_sha','b'.repeat(40)],['head_branch','main']]){const b=clone(m);b.workflow_run[field]=value;reject(()=>A.validateAssignedMetadata(b,assignment));}const p=pureFixture(),readback={files:p.files,metadata:meta('contracts','pure','123',H),rawZipSha256:H};assert.equal(A.bindPure(readback,p.assignment,p.manifestSha256).beforeI0,true);reject(()=>A.bindPure({...readback,rawZipSha256:'b'.repeat(64)},p.assignment,p.manifestSha256));reject(()=>A.bindPure(readback,p.assignment,'b'.repeat(64)));const changed=new Map(p.files);changed.set('preflight.json',Buffer.from('{}'));reject(()=>A.bindPure({...readback,files:changed},p.assignment,p.manifestSha256));await cryptoControl();const proof=privateProof(),bytes=Buffer.from(JSON.stringify(proof,null,2)),manifest=Buffer.from(JSON.stringify(A.manifestIdentity('reduction_consume_b','reduction-result-b'))),input={proofBytes:bytes,originalProofBytes:bytes,originalManifestBytes:manifest,reopenedManifestBytes:manifest,ownBinding:{job:'reduction_consume_b',kind:'reduction-result-b',id:'222',zipSha256:H},expectedContext:A.CONTEXT,expectedPeers:{pure:{artifactId:'123',zipSha256:H},peers:golden().proof.peerArtifacts}};assert.equal(A.validateReopenedSuite(input).counts.tests,16);reject(()=>A.validateReopenedSuite({...input,proofBytes:Buffer.from('{}')}));const p2=clone(proof);p2.consumerOverlap.bStart=900000;const bb=Buffer.from(JSON.stringify(p2));reject(()=>A.validateReopenedSuite({...input,proofBytes:bb,originalProofBytes:bb}));reject(()=>A.decodePrivateZip(Buffer.from('invalid')));},
-           async()=>{const g=golden();for(const [command,aggregate,stage,reason]of [['not_observed','not_observed','native_b','not_observed'],['passed','not_observed','aggregate','not_observed'],['passed','unverified','aggregate','evidence_unverified']]){const value=A.makeSuite({...g,command,aggregate,custody:{state:'assigned',artifact:{id:'222',zipSha256:H,kind:'consumer-failure'}},proof:null,failure:{stage,reason}});assert.equal(value.status,'unavailable');assert.equal(value.custody.artifact.id,'222');}const failed=A.makeSuite({...g,command:'failed',aggregate:'not_observed',custody:{state:'assigned',artifact:{id:'222',zipSha256:H,kind:'consumer-failure'}},proof:null,failure:{stage:'native_b',reason:'command_failed'}});assert.equal(failed.status,'failed');for(const custody of [{state:'assigned',artifact:{id:'222',kind:'consumer-failure'}},{state:'unavailable',artifact:{id:'222',zipSha256:H,kind:'consumer-failure'}}])reject(()=>A.makeSuite({...g,custody}));for(const status of [404,403,500]){const r=await verifyRoute({kind:'suite',id:'222',uploaded:H,expected},{metadata:async()=>({status,value:null})});assert.equal(r.readback.artifactId,'222');assert.equal(r.readback.reason,status===404?'publication_unavailable':'invalid_evidence');assert.equal(r.readback.accepted,false);}const absentIO={metadata:async()=>{throw Error('must_not_fetch');}},missing=await verifyRoute({kind:'suite',id:'',uploaded:'',expected},absentIO);assert.equal(missing.readback.reason,'publication_unavailable');const partial=await verifyRoute({kind:'suite',id:'222',uploaded:'',expected},absentIO);assert.equal(partial.readback.artifactId,'222');assert.equal(partial.readback.reason,'invalid_evidence');reject(()=>A.validateSuite({...g,operationalReadiness:true},expected));},
-           async()=>{const g=golden(),pair=await A.publishPair('suite',g);assert.equal(validatePair(pair,'suite',expected).status,'passed');const needs=Object.fromEntries(A.LEGACY.map(name=>[name,{result:'success',outputs:name==='contracts'?{'artifact-id':g.pure.artifactId,'artifact-digest':g.pure.zipSha256,'manifest-sha256':g.pure.manifestSha256}:(()=>{const a=name==='reduction_consume_b'?{artifactId:g.custody.artifact.id,zipSha256:H,kind:g.custody.artifact.kind}:g.proof.peerArtifacts.find(x=>x.job===name);return {'artifact-id':a.artifactId,'artifact-digest':a.zipSha256,kind:a.kind};})()}])),terminal=jobs().map(x=>({...x,status:'completed',conclusion:'success',completed_at:new Date(1700000070000).toISOString()})),all={total_count:8,jobs:[...terminal,{id:999,name:'verify',status:'in_progress',conclusion:null}]};assert.equal(verifySeven(all,needs,g).accepted,true);const badNeeds=clone(needs);badNeeds.contracts.outputs['artifact-digest']='b'.repeat(64);reject(()=>verifySeven(all,badNeeds,g));for(const flag of Object.keys(A.FLAGS))reject(()=>A.validateSuite({...g,[flag]:true},expected));for(const [field,value]of [['source','b'.repeat(40)],['run','1'],['tree','b'.repeat(40)],['workflowBlob','b'.repeat(40)],['repository','other'],['repositoryId','1'],['node','22.0.0']])reject(()=>A.validateSuite({...g,context:{...g.context,[field]:value}},expected));for(const pin of Object.keys(A.PINS))reject(()=>A.validateSuite({...g,sourcePins:{...g.sourcePins,[pin]:'bad'}},expected));for(const field of ['lineages','graphs','C0MinusI0Ms','C1MinusC0Ms','observedNativeJobPeak'])reject(()=>A.validateSuite({...g,proof:{...g.proof,[field]:0}},expected));for(const counts of ['Q','P','R','D','native','tests','pass','fail'])reject(()=>A.validateSuite({...g,proof:{...g.proof,counts:{...g.proof.counts,[counts]:99}}},expected));reject(()=>A.validateSuite({...g,pure:{...g.pure,profiles:['readonly','positive','reduction_a']}},expected));reject(()=>A.validateSuite({...g,extra:true},expected));reject(()=>A.validateSuite({...g,status:'failed'},expected));reject(()=>A.validateSuite({...g,proof:{...g.proof,peerJobs:[...g.proof.peerJobs.slice(1),{name:'verify',jobId:'999',status:'completed',conclusion:'success'}]}},expected));const corrupted=new Map(pair);corrupted.set('result.json',Buffer.from('{}\n'));reject(()=>validatePair(corrupted,'suite',expected));assert.deepEqual((await readdir(process.env.RUNNER_TEMP+'/afw-suite-safe')).sort(),['manifest.json','result.json']);}
+           async()=>{
+            await sub('b_inventory_optional_nonexecuting_receiver',async()=>{
+             const j=jobs(),at=1700000070000;assert.equal(A.validatePeerInventory({total_count:7,jobs:j},at).observedNativeJobPeak,1);
+             for(const status of ['pending','queued','waiting','requested'])A.validatePeerInventory({total_count:8,jobs:[...j,{id:999,name:'verify',status,conclusion:null}]},at);
+             const three=clone(j);three[0].completed_at=new Date(1700000069000).toISOString();
+             for(const n of [1,2,3]){three[n].started_at=new Date(1700000010000).toISOString();three[n].completed_at=new Date(1700000040000).toISOString();}
+             assert.equal(A.validatePeerInventory({total_count:7,jobs:three},at).observedNativeJobPeak,3);
+             const four=clone(three);four[4].started_at=new Date(1700000020000).toISOString();reject(()=>A.validatePeerInventory({total_count:7,jobs:four},at));
+             for(const list of [j.slice(1),[...j,j[0]],[...j,{id:999,name:'extra',status:'queued'}],[...j,{id:999,name:'verify',status:'in_progress',conclusion:null}]])reject(()=>A.validatePeerInventory({total_count:list.length,jobs:list},at));
+             const bad=clone(j);bad[1].started_at='invalid';reject(()=>A.validatePeerInventory({total_count:7,jobs:bad},at));
+            });
+            await sub('actual_b_dependency_and_attempt_endpoint_targets',async()=>{
+             const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');A.validateWorkflow(text);
+             reject(()=>A.validateWorkflow(mutateActual(text,'reduction_consume_b',null,'    needs: [contracts, readonly, reduction_prepare]','    needs: [contracts, readonly, reduction_prepare, reduction_consume_a]')));
+             reject(()=>A.validateWorkflow(mutateActual(text,'reduction_consume_b','peer_download',"/attempts/1/jobs?per_page=100","/jobs?per_page=100")));
+            });
+           },
+           async()=>{
+            await sub('all_twenty_six_exact_crypto_step_bindings',async()=>{
+             const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');A.validateKeyScopes(text);
+             reject(()=>A.validateKeyScopes(mutateActual(text,'positive_prepare',null,'    environment: afw-finite-syn-checkpoint','    environment: changed')));
+             reject(()=>A.validateKeyScopes(mutateActual(text,'positive_prepare','custody','        id: custody','        id: install_key_leak')));
+             reject(()=>A.validateKeyScopes(mutateActual(text,'positive_prepare',null,'      AFW_BUDGET_GROUP: positive','      AFW_SYN_CHECKPOINT_KEY: exposed\n      AFW_BUDGET_GROUP: positive')));
+             reject(()=>A.validateKeyScopes(mutateActual(text,'verify','suite_bootstrap','        shell: bash','        env:\n          AFW_SYN_CHECKPOINT_KEY: exposed\n        shell: bash')));
+            });
+            await sub('inert_parent_environment_is_restored',async()=>{
+             const before=process.env.AFW_SYN_CHECKPOINT_KEY;
+             try{process.env.AFW_SYN_CHECKPOINT_KEY='INERT_SCOPE';reject(()=>A.requireKeyless());}
+             finally{if(before===undefined)delete process.env.AFW_SYN_CHECKPOINT_KEY;else process.env.AFW_SYN_CHECKPOINT_KEY=before;}
+             A.requireKeyless();
+            });
+           },
+           async()=>{
+            await sub('fixed_pins_native_tap_cases_and_complete_f8_action',async()=>{
+             await A.validateSourcePins();const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');A.validateFixedCases(text);
+             reject(()=>A.validateFixedCases(mutateActual(text,'readonly','native','AFW_EXPECTED_CASES=3','AFW_EXPECTED_CASES=4')));
+             reject(()=>A.validateFixedCases(mutateActual(text,'reduction_consume_b',null,"      FIXED_CASES: '[\"D3\",\"D4\"]'","      FIXED_CASES: '[\"D3\"]'")));
+             for(const [from,to]of [['uses: actions/upload-artifact@v4','uses: actions/upload-artifact@v3'],['retention-days: 7','retention-days: 1'],['if-no-files-found: error','if-no-files-found: warn'],['name: finite-budget-fixed-preparation-','name: changed-'],['path: $'+'{{ runner.temp }}/afw-pure-public/','path: $'+'{{ runner.temp }}/changed/']])reject(()=>A.validateFixedCases(mutateActual(text,'contracts','upload',from,to)));
+            });
+            await sub('private_original_clocks_and_owned_case_identities',async()=>{
+             const good=A.validateReopenedSuite(proofInput());assert.equal(good.observedNativeJobPeak,1);
+             for(const mutate of [p=>p.lineages[0].C0++,p=>p.lineages[0].C1++,p=>p.occurrenceProof[0].caseName='positive',p=>p.occurrenceProof[1].caseName='reduction',p=>p.observedNativeJobPeak=2,p=>p.observedAt=1700000050000,p=>p.observedAt=1700000090000,p=>p.jobs[1].completedAt=new Date(1700000075000).toISOString(),p=>p.jobs[0].completedAt=new Date(1700000075000).toISOString(),p=>p.consumerOverlap.bStart=900000,p=>p.lineages[0].graphs.pop()]){
+              const p=privateProof();mutate(p);reject(()=>A.validateReopenedSuite(proofInput(p)));
+             }
+            });
+            await sub('all_rewritten_shell_and_node_bodies_compile_only',async()=>syntaxControls(await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8')));
+           },
+           async()=>{
+            await sub('metadata_current_identity_and_complete_pure_binding',async()=>{
+             const m=meta('positive_prepare','checkpoint','101',H),assignment={job:'positive_prepare',kind:'checkpoint',id:'101',zipSha256:H};A.validateAssignedMetadata(m,assignment,'generic-private');
+             for(const [field,value]of [['id',102],['name','other'],['expired',true],['digest','sha256:'+'b'.repeat(64)],['expires_at','2000-01-01T00:00:00Z']]){const b=clone(m);b[field]=value;reject(()=>A.validateAssignedMetadata(b,assignment,'generic-private'));}
+             for(const [field,value]of [['id',1],['head_sha','b'.repeat(40)],['head_branch','main']]){const b=clone(m);b.workflow_run[field]=value;reject(()=>A.validateAssignedMetadata(b,assignment,'generic-private'));}
+             const p=pureFixture(),r={files:p.files,metadata:meta('contracts','pure','123',H),rawZipSha256:H};assert.equal(A.bindPure(r,p.assignment,p.manifestSha256).beforeI0,true);
+             reject(()=>A.bindPure({...r,rawZipSha256:'b'.repeat(64)},p.assignment,p.manifestSha256));reject(()=>A.bindPure(r,p.assignment,'b'.repeat(64)));
+             const changed=new Map(p.files);changed.set('preflight.json',Buffer.from('{}'));reject(()=>A.bindPure({...r,files:changed},p.assignment,p.manifestSha256));
+            });
+            await sub('generic_aead_zip3_and_reopened_proof_bytes',async()=>{
+             await cryptoControl();const input=proofInput();assert.equal(A.validateReopenedSuite(input).counts.tests,16);
+             reject(()=>A.validateReopenedSuite({...input,proofBytes:Buffer.from('{}')}));reject(()=>A.decodePrivateZip(Buffer.from('invalid')));
+            });
+            await sub('operation_raw_cap_edges_and_b_twenty_second_timeout',async()=>{
+             const m=meta('positive_prepare','checkpoint','101',H),a={job:'positive_prepare',kind:'checkpoint',id:'101',zipSha256:H};
+             for(const [operation,cap,ms]of [['generic-private',136314880,30000],['b-peer',134283264,20000],['pure',134283264,30000],['safe',131072,30000]]){
+              const testJob=operation==='safe'?'controls':operation==='pure'?'contracts':'positive_prepare',testKind=testJob==='contracts'?'pure':testJob==='controls'?'controls':'checkpoint',assigned={job:testJob,kind:testKind,id:'101',zipSha256:H},bound=meta(testJob,testKind,'101',H);bound.size_in_bytes=cap;A.validateAssignedMetadata(bound,assigned,operation);bound.size_in_bytes=cap+1;reject(()=>A.validateAssignedMetadata(bound,assigned,operation));
+              const calls=[];await A.rawAssigned('101',operation,{timeout:n=>{calls.push(n);return new AbortController().signal;},fetch:async(url,options)=>{assert.equal(url,'https://api.github.com/repos/'+A.CONTEXT.repository+'/actions/artifacts/101/zip');return new Response(Buffer.from('inert'));}});assert.deepEqual(calls,[ms]);
+              assert.equal(A.checkedDownloadSize(cap-1,1,operation),cap);reject(()=>A.checkedDownloadSize(cap,1,operation));assert.equal((await A.collectPrivateBody(new Response(Buffer.from('inert')),operation,new AbortController().signal)).toString(),'inert');
+             }
+             reject(()=>A.operationLimits('arbitrary'));
+            });
+           },
+           async()=>{
+            await sub('pure_receipt_commits_after_original_stage_success_only',async()=>{
+             const p=pureFixture(),receipt=A.bindPure({files:p.files,metadata:meta('contracts','pure','123',H),rawZipSha256:H},p.assignment,p.manifestSha256),writes=[];
+             const io={write:async(...args)=>writes.push(args)};
+             await assert.rejects(()=>A.finalizePureBinding(receipt,async()=>{throw Error('inert_original_stage_failure');},io));assert.equal(writes.length,0);
+             await A.finalizePureBinding(receipt,async()=>{},io);assert.equal(writes.length,1);assert.equal(writes[0][0],process.env.RUNNER_TEMP+'/afw-native-private/pure-assignment.json');assert.equal(writes[0][1],JSON.stringify(receipt)+'\n');assert.deepEqual(writes[0][2],{flag:'wx',mode:0o600});
+             const leftover=actualReceipts(),o=actualOutcomes({pureBinding:'failure',native:'skipped',aggregate:'skipped',ownMetadata:'skipped',ownOpen:'skipped',ownValidation:'skipped'});leftover.assignment=null;leftover.proof=null;
+             const unavailable=A.projectSuiteOutcome({outcomes:o,receipts:leftover});assert.equal(unavailable.pure,null);assert.deepEqual(unavailable.failure,{stage:'pure',reason:'pure_unverified'});
+             reject(()=>A.projectSuiteOutcome({outcomes:{...o,native:'success'},receipts:leftover}));
+            });
+            await sub('shared_projection_observed_failures_and_retained_assignment',async()=>{
+             const g=golden();assert.equal(A.projectSuiteOutcome({outcomes:actualOutcomes(),receipts:actualReceipts(g)}).status,'passed');
+             for(const [field,reason]of [['ownMetadata','assignment_unverified'],['ownOpen','reopen_unverified'],['ownValidation','proof_unverified']]){
+              const outcomes=actualOutcomes(),receipts=actualReceipts();outcomes[field]='failure';if(field==='ownMetadata'){outcomes.ownOpen='skipped';outcomes.ownValidation='skipped';}if(field==='ownOpen')outcomes.ownValidation='skipped';receipts.proof=null;
+              const r=A.projectSuiteOutcome({outcomes,receipts});assert.equal(r.custody.artifact.id,'222');assert.equal(r.custody.state,'assigned');assert.equal(r.failure.reason,reason);
+             }
+             for(const native of ['skipped','cancelled','not_observed']){
+              const receipts=actualReceipts();receipts.assignment.kind='consumer-failure';receipts.proof=null;
+              const value=A.projectSuiteOutcome({outcomes:actualOutcomes({native,aggregate:'skipped',ownMetadata:'skipped',ownOpen:'skipped',ownValidation:'skipped'}),receipts});assert.equal(value.command,'not_observed');assert.equal(value.aggregate,'not_observed');assert.equal(value.failure.reason,'not_observed');
+             }
+             for(const [aggregate,reason]of [['skipped','not_observed'],['failure','evidence_unverified']]){
+              const receipts=actualReceipts();receipts.assignment.kind='consumer-failure';receipts.proof=null;
+              const r=A.projectSuiteOutcome({outcomes:actualOutcomes({aggregate,ownMetadata:'skipped',ownOpen:'skipped',ownValidation:'skipped'}),receipts});assert.equal(r.command,'passed');assert.equal(r.aggregate,aggregate==='failure'?'unverified':'not_observed');assert.equal(r.failure.reason,reason);assert.equal(r.custody.artifact.id,'222');
+             }
+             const receipts=actualReceipts();receipts.assignment.kind='consumer-failure';receipts.proof=null;const failed=A.projectSuiteOutcome({outcomes:actualOutcomes({native:'failure',aggregate:'skipped',ownMetadata:'skipped',ownOpen:'skipped',ownValidation:'skipped'}),receipts});assert.equal(failed.status,'failed');assert.equal(failed.failure.reason,'command_failed');
+             reject(()=>A.projectSuiteOutcome({outcomes:actualOutcomes({native:'skipped'}),receipts:actualReceipts()}));
+            });
+            await sub('actual_publication_guards_order_and_full_pure_gate',async()=>{
+             const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');A.validatePublicationGates(text);A.validatePureBindingSteps(text);
+             reject(()=>A.validatePublicationGates(mutateActual(text,'reduction_consume_b','summary_pair',"if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'","if: steps.aggregate.outcome == 'success'")));
+             reject(()=>A.validatePublicationGates(mutateActual(text,'reduction_consume_b','summary_upload',"steps.summary_pair.outcome == 'success'","steps.native.outcome == 'success'")));
+             reject(()=>A.validatePublicationGates(mutateActual(text,'reduction_consume_b','actual_outcome',"test '$"+"{{ steps.summary_pair.outputs.status }}' = passed","test true")));
+             reject(()=>A.validatePureBindingSteps(mutateActual(text,'reduction_consume_b','summary_pair',"PURE_BINDING_OUTCOME: $"+"{{ steps.pure_binding.outcome }}","PURE_BINDING_OUTCOME: success")));
+            });
+            await sub('valid_failed_pair_and_receiver_self_control_failure_record',async()=>{
+             const r={purpose:'afw.coherent-suite.controls.safe.v1',...expected,status:'failed',expected:6,completed:1,passed:0,failed:1,inventory:A.IDS.map((id,n)=>({id,status:n?'not_executed':'failed'})),firstFailure:A.IDS[0],realCustodyKeyBound:false,NativeExecuted:false,SDKImported:false,MFAllocated:false,...A.FLAGS},f=routeFixture(r,'controls'),route=await verifyRoute(f.args,f.io),closed=await reconcileSuite({route,jobInventory:null,needs:{keyless_controls:{result:'failure',outputs:{'safe-id':'777','safe-digest':f.args.uploaded}}}},f.io);
+             assert.equal(closed.readback.status,'verified');assert.equal(closed.readback.reason,'none');assert.equal(closed.readback.proof,'strict_current_safe_pair');assert.equal(closed.readback.accepted,false);
+             const guarded=await receiverControlsGuard(f.args,async()=>{throw Error('inert_self_control_failure');});
+             assert.equal(guarded.passed,false);assert.equal(guarded.failure.artifactId,'777');assert.equal(guarded.failure.uploadedDigest,f.args.uploaded);assert.equal(guarded.failure.status,'unavailable');assert.equal(guarded.failure.reason,'invalid_evidence');assert.equal(guarded.failure.proof,'absent');assert.equal(guarded.failure.rawZipSha256,null);assert.equal(guarded.failure.accepted,false);assert(Buffer.byteLength(JSON.stringify(guarded.failure)+'\n')<=4096);
+            });
+           },
+           async()=>{
+            await sub('same_full_suite_route_projection_and_final_reconciliation',async()=>{
+             const suite=A.projectSuiteOutcome({outcomes:actualOutcomes(),receipts:actualReceipts()}),pair=await A.publishPair('suite',suite);assert.equal(validatePair(pair,'suite',expected).status,'passed');
+             const f=routeFixture(suite),route=await verifyRoute(f.args,f.io),closed=await reconcileSuite({route,jobInventory:null,needs:f.needs},f.io);
+             assert.equal(closed.readback.accepted,true);assert.equal(closed.readback.upstream,'all_seven_success');assert.equal(closed.readback.reason,'none');assert.deepEqual(f.calls.slice(1).sort(),A.LEGACY.map(j=>f.needs[j].outputs['artifact-id']).sort());
+             for(const mutate of [jobs=>{jobs.jobs=jobs.jobs.filter(x=>x.name!=='verify');jobs.total_count=7;},jobs=>{jobs.jobs.find(x=>x.name==='verify').status='queued';},jobs=>{jobs.jobs[0].status='in_progress';jobs.jobs[0].conclusion=null;}]){
+              const j=finalJobs();mutate(j);const rejected=await reconcileSuite({route:await verifyRoute(f.args,f.io),jobInventory:j,needs:f.needs},f.io);assert.equal(rejected.readback.accepted,false);assert.equal(rejected.readback.upstream,'unverified');assert.equal(rejected.readback.reason,'none');
+             }
+            });
+            await sub('nonpass_reconciles_all_available_assignments',async()=>{
+             const g=golden(),needs=completeNeeds(g),receipts=actualReceipts(g);receipts.assignment.kind='consumer-failure';receipts.proof=null;needs.reduction_consume_b.result='failure';needs.reduction_consume_b.outputs.kind='consumer-failure';
+             const suite=A.projectSuiteOutcome({outcomes:actualOutcomes({native:'failure',aggregate:'skipped',ownMetadata:'skipped',ownOpen:'skipped',ownValidation:'skipped'}),receipts}),f=routeFixture(suite,'suite',needs),j=finalJobs();j.jobs.find(x=>x.name==='reduction_consume_b').conclusion='failure';
+             const route=await verifyRoute(f.args,f.io),closed=await reconcileSuite({route,jobInventory:j,needs},f.io);
+             assert.equal(closed.readback.accepted,false);assert.equal(closed.readback.upstream,'not_all_seven_success');assert.equal(closed.readback.reason,'none');assert.deepEqual(f.calls.slice(1).sort(),A.LEGACY.map(n=>needs[n].outputs['artifact-id']).sort());
+             const noOutputs=clone(needs);noOutputs.positive_consume.outputs={};const missing=await reconcileSuite({route:await verifyRoute(f.args,f.io),jobInventory:j,needs:noOutputs},f.io);assert.equal(missing.readback.accepted,false);
+            });
+            await sub('final_current_metadata_source_run_and_direct_needs_edges',async()=>{
+             const g=golden(),f=routeFixture(g),j=finalJobs();
+             for(const field of ['head_sha','id','head_branch']){
+              const badIO={...f.io,metadata:async artifactId=>{const r=await f.io.metadata(artifactId);if(artifactId!=='777'){r.value.workflow_run[field]=field==='id'?1:field==='head_sha'?'b'.repeat(40):'main';}return r;}};
+              const closed=await reconcileSuite({route:await verifyRoute(f.args,f.io),jobInventory:j,needs:f.needs},badIO);assert.equal(closed.readback.accepted,false);assert.equal(closed.readback.upstream,'unverified');assert.equal(closed.readback.reason,'none');
+             }
+             const stale={...f.io,source:async()=>({object:{sha:'b'.repeat(40)}})};assert.equal((await reconcileSuite({route:await verifyRoute(f.args,f.io),jobInventory:j,needs:f.needs},stale)).readback.upstream,'unverified');
+             const changed=clone(f.needs);changed.positive_consume.outputs['artifact-digest']='b'.repeat(64);assert.equal((await reconcileSuite({route:await verifyRoute(f.args,f.io),jobInventory:j,needs:changed},f.io)).readback.accepted,false);
+             const wrongAttempt=clone(g);wrongAttempt.context.attempt=2;reject(()=>A.validateSuite(wrongAttempt,expected));
+             for(const status of [404,403,500]){const r=await verifyRoute(f.args,{metadata:async()=>({status,value:null})});assert.equal(r.readback.artifactId,'777');assert.equal(r.readback.reason,status===404?'publication_unavailable':'invalid_evidence');assert.equal(r.readback.proof,'absent');}
+            });
+            await sub('closed_schema_flags_profiles_counts_and_extra_fields',async()=>{
+             const g=golden();for(const flag of Object.keys(A.FLAGS))reject(()=>A.validateSuite({...g,[flag]:true},expected));
+             for(const [field,value]of [['source','b'.repeat(40)],['run','1'],['tree','b'.repeat(40)],['workflowBlob','b'.repeat(40)],['repository','other'],['repositoryId','1'],['node','22.0.0']])reject(()=>A.validateSuite({...g,context:{...g.context,[field]:value}},expected));
+             for(const pin of Object.keys(A.PINS))reject(()=>A.validateSuite({...g,sourcePins:{...g.sourcePins,[pin]:'bad'}},expected));
+             for(const field of ['lineages','graphs','C0MinusI0Ms','C1MinusC0Ms','observedNativeJobPeak'])reject(()=>A.validateSuite({...g,proof:{...g.proof,[field]:0}},expected));
+             for(const field of ['Q','P','R','D','native','tests','pass','fail'])reject(()=>A.validateSuite({...g,proof:{...g.proof,counts:{...g.proof.counts,[field]:99}}},expected));
+             reject(()=>A.validateSuite({...g,pure:{...g.pure,profiles:['readonly','positive','reduction_a']}},expected));reject(()=>A.validateSuite({...g,extra:true},expected));reject(()=>A.validateSuite({...g,status:'failed'},expected));
+             const files=await A.publishPair('suite',g),corrupt=new Map(files);corrupt.set('result.json',Buffer.from('{}\n'));reject(()=>validatePair(corrupt,'suite',expected));assert.deepEqual((await readdir(process.env.RUNNER_TEMP+'/afw-suite-safe')).sort(),['manifest.json','result.json']);
+            });
+           }
            ];
-           for(let n=0;n<cases.length;n++){try{await cases[n]();inventory[n].status='passed';}catch{inventory[n].status='failed';firstFailure=CONTROL_IDS[n];break;}}
+           for(let n=0;n<cases.length;n++){
+            currentFamily=CONTROL_IDS[n];
+            try{await cases[n]();inventory[n].status='passed';}
+            catch{inventory[n].status='failed';firstFailure=CONTROL_IDS[n];break;}
+           }
            const passed=inventory.filter(x=>x.status==='passed').length,failed=firstFailure?1:0,result={purpose:'afw.coherent-suite.controls.safe.v1',...expected,status:firstFailure?'failed':'passed',expected:6,completed:passed+failed,passed,failed,inventory,firstFailure,realCustodyKeyBound:false,NativeExecuted:false,SDKImported:false,MFAllocated:false,...A.FLAGS};
-           A.validateControls(result,expected);await A.publishPair('controls',result);console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_CONTROLS/1',status:result.status,expected:6,completed:result.completed,passed,failed,inventory,firstFailure,...A.FLAGS}));return result;
+           A.validateControls(result,expected);await A.publishPair('controls',result);
+           console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_CONTROLS/1',status:result.status,expected:6,completed:result.completed,passed,failed,inventory,firstFailure,...A.FLAGS}));return result;
           }
           if(process.argv[1]===import.meta.filename){try{const r=await runControls();if(r.status!=='passed')process.exitCode=1;}catch{console.log('AFW_COHERENT_CONTROLS_UNAVAILABLE');process.exitCode=1;}}
           NODE_SUITE_CONTROLS
           cat >"$RUNNER_TEMP/afw-suite-verifier.mjs" <<'NODE_SUITE_VERIFIER'
-          import assert from 'node:assert/strict';
-          import {readFile,writeFile} from 'node:fs/promises';
+          import {writeFile} from 'node:fs/promises';
           import {join} from 'node:path';
           import * as A from './afw-suite-adapter.mjs';
           import * as Z from './afw-suite-safe-zip.mjs';
           const expectedCurrent=()=>({context:A.CONTEXT,sourcePins:A.PINS,programHashes:A.PROGRAM_HASHES});
+          export const JOBS_PATH='/actions/runs/'+A.CONTEXT.run+'/attempts/1/jobs?per_page=100';
+          const SOURCE_PATH='/git/ref/heads/feat/finite-native-cleanup-20261101';
           export function validatePair(files,kind,expected){
-           A.need(files instanceof Map);A.same([...files.keys()].sort(),['manifest.json','result.json']);const resultBytes=files.get('result.json'),manifestBytes=files.get('manifest.json');A.need(resultBytes.length+manifestBytes.length<=65536);const result=A.parseCanonical(resultBytes),manifest=A.parseCanonical(manifestBytes);A.same(manifest,A.makeManifest(kind,resultBytes,expected.context));(kind==='suite'?A.validateSuite:A.validateControls)(result,expected);return result;
-          }
-          const fixedGitHubIO={metadata:A.metadata,zip:id=>Z.downloadAssignedZip(id,process.env.GH_ARTIFACT_TOKEN)};
-          export async function verifyRoute({kind,id,uploaded,expected},io=fixedGitHubIO){
-           A.need(kind==='suite'||kind==='controls');let artifactId=null,uploadedDigest=null;try{artifactId=A.canonicalId(id);}catch{}try{uploadedDigest=A.hex(uploaded);}catch{}
-           const readback={marker:'AFW_COHERENT_SUITE_READBACK/1',kind,source:expected.context.source,run:expected.context.run,attempt:1,artifactId,uploadedDigest,status:'unavailable',reason:'invalid_evidence',proof:'absent',metadataBytes:null,metadataDigest:null,rawZipBytes:null,rawZipSha256:null,resultBytes:null,resultSha256:null,manifestBytes:null,manifestSha256:null,expiresAt:null,producerStatus:null,upstream:kind==='controls'?'not_applicable':'unverified',accepted:false,programHashes:expected.programHashes,...A.FLAGS};
-           if(!id&&!uploaded){readback.reason='publication_unavailable';return {readback,valid:null};}if(!artifactId||!uploadedDigest)return {readback,valid:null};
+           A.need(files instanceof Map);A.same([...files.keys()].sort(),['manifest.json','result.json']);
+           const resultBytes=files.get('result.json'),manifestBytes=files.get('manifest.json');A.need(resultBytes.length+manifestBytes.length<=65536);
+           const result=A.parseCanonical(resultBytes),manifest=A.parseCanonical(manifestBytes);A.same(manifest,A.makeManifest(kind,resultBytes,expected.context));
+           (kind==='suite'?A.validateSuite:A.validateControls)(result,expected);return result;
+          }
+          function unavailableRecord({kind,id,uploaded,expected},reason='invalid_evidence'){
+           let artifactId=null,uploadedDigest=null;try{artifactId=A.canonicalId(id);}catch{}try{uploadedDigest=A.hex(uploaded);}catch{}
+           return {marker:'AFW_COHERENT_SUITE_READBACK/1',kind,source:expected.context.source,run:expected.context.run,attempt:1,artifactId,uploadedDigest,status:'unavailable',reason,proof:'absent',metadataBytes:null,metadataDigest:null,rawZipBytes:null,rawZipSha256:null,resultBytes:null,resultSha256:null,manifestBytes:null,manifestSha256:null,expiresAt:null,producerStatus:null,upstream:kind==='controls'?'not_applicable':'unverified',accepted:false,programHashes:expected.programHashes,...A.FLAGS};
+          }
+          async function fixedJSON(path){
+           A.need(path===JOBS_PATH||path===SOURCE_PATH);
+           const r=await fetch('https://api.github.com/repos/'+A.CONTEXT.repository+path,{headers:{Authorization:'Bearer '+process.env.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});
+           A.same(r.status,200);return r.json();
+          }
+          const fixedGitHubIO={metadata:A.metadata,zip:id=>Z.downloadAssignedZip(id,process.env.GH_ARTIFACT_TOKEN),source:path=>fixedJSON(path),jobs:path=>fixedJSON(path)};
+          export async function verifyRoute(args,io=fixedGitHubIO){
+           const {kind,id,uploaded,expected}=args;A.need(kind==='suite'||kind==='controls');
+           const readback=unavailableRecord(args);
+           if(!id&&!uploaded){readback.reason='publication_unavailable';return {readback,valid:null};}
+           if(!readback.artifactId||!readback.uploadedDigest)return {readback,valid:null};
            try{
-            const response=await io.metadata(artifactId);if(response.status===404){readback.reason='publication_unavailable';return {readback,valid:null};}A.same(response.status,200);const meta=A.validateAssignedMetadata(response.value,{job:kind,kind,id:artifactId,zipSha256:uploadedDigest}),bytes=await io.zip(artifactId);Z.bindRawZip(bytes,meta.size_in_bytes,uploadedDigest,meta.digest);const pair=Z.decodeSafePair(bytes),result=validatePair(pair,kind,expected);
-            Object.assign(readback,{status:'verified',reason:'none',proof:'strict_current_safe_pair',metadataBytes:meta.size_in_bytes,metadataDigest:meta.digest,rawZipBytes:bytes.length,rawZipSha256:A.sha(bytes),resultBytes:pair.get('result.json').length,resultSha256:A.sha(pair.get('result.json')),manifestBytes:pair.get('manifest.json').length,manifestSha256:A.sha(pair.get('manifest.json')),expiresAt:meta.expires_at,producerStatus:result.status,accepted:kind==='controls'&&result.status==='passed'});
+            const response=await io.metadata(readback.artifactId);
+            if(response.status===404){readback.reason='publication_unavailable';return {readback,valid:null};}
+            A.same(response.status,200);
+            const meta=A.validateAssignedMetadata(response.value,{job:kind,kind,id:readback.artifactId,zipSha256:readback.uploadedDigest},'safe');
+            const bytes=await io.zip(readback.artifactId);Z.bindRawZip(bytes,meta.size_in_bytes,readback.uploadedDigest,meta.digest);
+            const pair=Z.decodeSafePair(bytes),result=validatePair(pair,kind,expected);
+            Object.assign(readback,{status:'verified',reason:'none',proof:'strict_current_safe_pair',metadataBytes:meta.size_in_bytes,metadataDigest:meta.digest,rawZipBytes:bytes.length,rawZipSha256:A.sha(bytes),resultBytes:pair.get('result.json').length,resultSha256:A.sha(pair.get('result.json')),manifestBytes:pair.get('manifest.json').length,manifestSha256:A.sha(pair.get('manifest.json')),expiresAt:meta.expires_at,producerStatus:result.status,accepted:false});
             return {readback,valid:result};
            }catch{return {readback,valid:null};}
           }
           export function verifySeven(jobInventory,needs,result){
-           A.same(jobInventory.total_count,jobInventory.jobs.length);A.need(jobInventory.jobs.length===7||jobInventory.jobs.length===8);const names=jobInventory.jobs.map(x=>x.name);A.same(new Set(names).size,names.length);A.same(new Set(jobInventory.jobs.map(x=>A.canonicalId(String(x.id)))).size,names.length);A.same(names.filter(n=>n!=='verify').sort(),A.LEGACY.slice().sort());const receiver=jobInventory.jobs.find(x=>x.name==='verify');if(receiver){A.need(['pending','queued','waiting','requested','in_progress'].includes(receiver.status));A.same(receiver.conclusion,null);}A.fields(needs,A.LEGACY);
-           const legacy=A.LEGACY.map(n=>jobInventory.jobs.find(x=>x.name===n)),sevenTerminal=legacy.every(x=>x.status==='completed'),sevenSuccess=sevenTerminal&&legacy.every(x=>x.conclusion==='success'&&needs[x.name].result==='success');
-           if(result.status==='passed'){
-            A.need(sevenSuccess);const refs=[{job:'contracts',artifactId:result.pure.artifactId,zipSha256:result.pure.zipSha256,manifestSha256:result.pure.manifestSha256},...result.proof.peerArtifacts,{job:'reduction_consume_b',artifactId:result.custody.artifact.id,zipSha256:result.custody.artifact.zipSha256,kind:result.custody.artifact.kind}];
-            for(const r of refs){const outputs=needs[r.job].outputs;A.same(outputs['artifact-id'],r.artifactId);A.same(outputs['artifact-digest'],r.zipSha256);if(r.job==='contracts')A.same(outputs['manifest-sha256'],r.manifestSha256);else A.same(outputs.kind,r.kind);}
-            for(const j of [...result.proof.peerJobs,result.proof.selfJob])A.same(String(legacy.find(x=>x.name===j.name).id),j.jobId);
-           }
+           A.same(jobInventory.total_count,8);A.same(jobInventory.jobs.length,8);
+           const names=jobInventory.jobs.map(x=>x.name);A.same(new Set(names).size,8);
+           A.same(new Set(jobInventory.jobs.map(x=>A.canonicalId(String(x.id)))).size,8);A.same(names.slice().sort(),[...A.LEGACY,'verify'].sort());
+           const receiver=jobInventory.jobs.find(x=>x.name==='verify');A.same(receiver.status,'in_progress');A.same(receiver.conclusion,null);
+           A.fields(needs,A.LEGACY);
+           const legacy=A.LEGACY.map(name=>jobInventory.jobs.find(x=>x.name===name));
+           for(const job of legacy){A.need(['success','failure','skipped','cancelled'].includes(needs[job.name]?.result));if(job.status==='completed'&&['success','failure','skipped','cancelled'].includes(job.conclusion))A.same(needs[job.name].result,job.conclusion);}
+           const sevenTerminal=legacy.every(x=>x.status==='completed');
+           const sevenSuccess=sevenTerminal&&legacy.every(x=>x.conclusion==='success'&&needs[x.name].result==='success');
+           if(result.proof)for(const j of [...result.proof.peerJobs,result.proof.selfJob])A.same(String(legacy.find(x=>x.name===j.name).id),j.jobId);
            return {accepted:result.status==='passed'&&sevenSuccess,sevenTerminal,sevenSuccess};
           }
+          function directAssignments(needs){
+           const complete=[],byJob=new Map();let allComplete=true;
+           for(const job of A.LEGACY){
+            const outputs=needs[job]?.outputs??{},id=outputs['artifact-id']??'',digest=outputs['artifact-digest']??'',kind=job==='contracts'?'pure':outputs.kind??'';
+            try{
+             A.canonicalId(id);A.hex(digest);
+             if(job==='contracts'){try{A.hex(outputs['manifest-sha256']);}catch{allComplete=false;}}
+             else {
+              const expected=job==='reduction_consume_b'?'reduction-result-b':A.PRIVATE_PEERS.find(x=>x.job===job).kind;
+              const failure=['positive_prepare','reduction_prepare'].includes(job)?'producer-failure':'consumer-failure';
+              A.need(kind===expected||kind===failure);
+             }
+             const assignment={job,kind,id,zipSha256:digest};complete.push(assignment);byJob.set(job,{...assignment,manifestSha256:outputs['manifest-sha256']??null});
+            }catch{allComplete=false;}
+           }
+           return {complete,byJob,allComplete};
+          }
+          function publicRefsAligned(result,byJob){
+           const refs=[];
+           if(result.pure)refs.push({job:'contracts',id:result.pure.artifactId,zipSha256:result.pure.zipSha256,manifestSha256:result.pure.manifestSha256});
+           if(result.proof)refs.push(...result.proof.peerArtifacts.map(x=>({job:x.job,id:x.artifactId,zipSha256:x.zipSha256,kind:x.kind})));
+           if(result.custody.artifact)refs.push({job:'reduction_consume_b',...result.custody.artifact});
+           let aligned=true;
+           for(const ref of refs){const assigned=byJob.get(ref.job);if(!assigned||assigned.id!==ref.id||assigned.zipSha256!==ref.zipSha256||ref.job==='contracts'&&assigned.manifestSha256!==ref.manifestSha256||ref.job!=='contracts'&&assigned.kind!==ref.kind)aligned=false;}
+           return aligned;
+          }
+          export async function reconcileSuite({route,jobInventory,needs},io=fixedGitHubIO){
+           const readback={...route.readback},valid=route.valid;
+           if(valid===null)return {readback,valid};
+           readback.accepted=false;
+           try{
+            const ref=await io.source(SOURCE_PATH);A.same(ref.object.sha,A.CONTEXT.source);
+            if(readback.kind==='controls'){
+             const upstream=needs.keyless_controls;
+             A.need(upstream&&upstream.outputs);A.same(upstream.outputs['safe-id'],readback.artifactId);A.same(upstream.outputs['safe-digest'],readback.uploadedDigest);
+             readback.accepted=valid.status==='passed'&&upstream.result==='success';return {readback,valid};
+            }
+            let observation=null;
+            try{const jobs=jobInventory??await io.jobs(JOBS_PATH);observation=verifySeven(jobs,needs,valid);}catch{}
+            readback.upstream=observation?.sevenTerminal?(observation.sevenSuccess?'all_seven_success':'not_all_seven_success'):'unverified';
+            const assignments=directAssignments(needs);let metadataAligned=true;
+            for(const assignment of assignments.complete){
+             try{const response=await io.metadata(assignment.id);A.same(response.status,200);A.validateAssignedMetadata(response.value,assignment,assignment.job==='contracts'?'pure':'generic-private');}
+             catch{metadataAligned=false;}
+            }
+            const aligned=publicRefsAligned(valid,assignments.byJob);
+            if(observation?.sevenSuccess&&(!assignments.allComplete||!metadataAligned||!aligned))readback.upstream='unverified';
+            readback.accepted=valid.status==='passed'&&observation?.accepted===true&&assignments.allComplete&&metadataAligned&&aligned;
+           }catch{readback.accepted=false;if(readback.kind==='suite')readback.upstream='unverified';}
+           return {readback,valid};
+          }
           function fixtureZip(files){
            const crc=b=>{let c=0xffffffff;for(const v of b){c^=v;for(let n=0;n<8;n++)c=c&1?0xedb88320^(c>>>1):c>>>1;}return (c^0xffffffff)>>>0;},local=[],central=[];let offset=0;
            for(const [name,data]of files){const n=Buffer.from(name),l=Buffer.alloc(30),c=Buffer.alloc(46),h=crc(data);l.writeUInt32LE(0x04034b50);l.writeUInt16LE(20,4);l.writeUInt32LE(h,14);l.writeUInt32LE(data.length,18);l.writeUInt32LE(data.length,22);l.writeUInt16LE(n.length,26);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt32LE(h,16);c.writeUInt32LE(data.length,20);c.writeUInt32LE(data.length,24);c.writeUInt16LE(n.length,28);c.writeUInt32LE(offset,42);local.push(l,n,data);central.push(c,n);offset+=30+n.length+data.length;}
            const dir=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(2,8);end.writeUInt16LE(2,10);end.writeUInt32LE(dir.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...local,dir,end]);
           }
+          
+          const RECEIVER_IDS=[...Z.ZIP_CONTROL_IDS,'receiver_capture_current_pair','receiver_rejection_no_zip_claim'];
           async function receiverControls(){
-           const records=await Z.runZipControls(),expected=expectedCurrent(),result={purpose:'afw.coherent-suite.controls.safe.v1',...expected,status:'passed',expected:6,completed:6,passed:6,failed:0,inventory:A.IDS.map(id=>({id,status:'passed'})),firstFailure:null,realCustodyKeyBound:false,NativeExecuted:false,SDKImported:false,MFAllocated:false,...A.FLAGS},rb=A.canonical(result),files=new Map([['result.json',rb],['manifest.json',A.canonical(A.makeManifest('controls',rb,A.CONTEXT))]]),bytes=fixtureZip(files),digest=A.sha(bytes),meta={id:777,name:A.artifactName('controls'),expired:false,digest:'sha256:'+digest,size_in_bytes:bytes.length,expires_at:new Date(Date.now()+86400000).toISOString(),workflow_run:{id:Number(A.CONTEXT.run),head_sha:A.CONTEXT.source,head_branch:A.CONTEXT.ref.slice(11)}};
-           const route={kind:'controls',id:'777',uploaded:digest,expected},io={metadata:async()=>({status:200,value:meta}),zip:async()=>bytes},good=await verifyRoute(route,io);A.same(good.readback.accepted,true);A.same(good.readback.rawZipSha256,digest);records.push({id:'receiver_capture_current_pair',status:'passed'});
-           const bad=await verifyRoute({...route,uploaded:'b'.repeat(64)},io);A.same(bad.readback.accepted,false);A.same(bad.readback.proof,'absent');A.same(bad.readback.rawZipSha256,null);A.same(bad.readback.artifactId,'777');records.push({id:'receiver_rejection_no_zip_claim',status:'passed'});A.same(records.length,16);return records;
+           let records=[];
+           try{records=await Z.runZipControls();}catch(error){throw Object.assign(Error('receiver_control_failed'),{results:error.results});}
+           const expected=expectedCurrent(),result={purpose:'afw.coherent-suite.controls.safe.v1',...expected,status:'passed',expected:6,completed:6,passed:6,failed:0,inventory:A.IDS.map(id=>({id,status:'passed'})),firstFailure:null,realCustodyKeyBound:false,NativeExecuted:false,SDKImported:false,MFAllocated:false,...A.FLAGS};
+           const rb=A.canonical(result),files=new Map([['result.json',rb],['manifest.json',A.canonical(A.makeManifest('controls',rb,A.CONTEXT))]]),bytes=fixtureZip(files),digest=A.sha(bytes);
+           const meta={id:777,name:A.artifactName('controls'),expired:false,digest:'sha256:'+digest,size_in_bytes:bytes.length,expires_at:new Date(Date.now()+86400000).toISOString(),workflow_run:{id:Number(A.CONTEXT.run),head_sha:A.CONTEXT.source,head_branch:A.CONTEXT.ref.slice(11)}};
+           const args={kind:'controls',id:'777',uploaded:digest,expected},io={metadata:async()=>({status:200,value:meta}),zip:async()=>bytes};
+           try{
+            const good=await verifyRoute(args,io);A.same(good.valid.status,'passed');A.same(good.readback.status,'verified');A.same(good.readback.rawZipSha256,digest);
+            records.push({id:RECEIVER_IDS[14],status:'passed'});
+           }catch{throw Object.assign(Error('receiver_control_failed'),{results:[...records,{id:RECEIVER_IDS[14],status:'failed'}]});}
+           try{
+            const bad=await verifyRoute({...args,uploaded:'b'.repeat(64)},io);A.same(bad.readback.accepted,false);A.same(bad.readback.proof,'absent');A.same(bad.readback.rawZipSha256,null);A.same(bad.readback.artifactId,'777');
+            records.push({id:RECEIVER_IDS[15],status:'passed'});
+           }catch{throw Object.assign(Error('receiver_control_failed'),{results:[...records,{id:RECEIVER_IDS[15],status:'failed'}]});}
+           A.same(records.length,16);return records;
           }
-          async function fixedJSON(path){
-           A.need(path==='/actions/runs/'+A.CONTEXT.run+'/jobs?per_page=100'||path==='/git/ref/heads/feat/finite-native-cleanup-20261101');const r=await fetch('https://api.github.com/repos/'+A.CONTEXT.repository+path,{headers:{Authorization:'Bearer '+process.env.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});A.same(r.status,200);return r.json();
+          export async function receiverControlsGuard(args,checks=receiverControls){
+           let records,failed=false;
+           try{
+            records=await checks();A.same(records.map(x=>x.id),RECEIVER_IDS);A.need(records.every(x=>x.status==='passed'));
+           }catch(error){
+            failed=true;records=[];
+            const partial=Array.isArray(error?.results)?error.results:[];
+            for(let n=0;n<partial.length&&n<16;n++){
+             if(partial[n]?.id!==RECEIVER_IDS[n]||!['passed','failed'].includes(partial[n].status))break;
+             records.push({id:RECEIVER_IDS[n],status:partial[n].status});if(partial[n].status==='failed')break;
+            }
+            const first=records.findIndex(x=>x.status==='failed');
+            if(first<0){if(records.length===16)records.pop();records.push({id:RECEIVER_IDS[records.length],status:'failed'});}
+           }
+           const inventory=RECEIVER_IDS.map((id,n)=>records[n]??{id,status:'not_executed'}),passed=inventory.filter(x=>x.status==='passed').length,failures=inventory.filter(x=>x.status==='failed').length;
+           const record={marker:'AFW_COHERENT_SUITE_ZIP_CONTROLS/1',expected:16,completed:passed+failures,passed,failed:failures,inventory,...A.FLAGS};
+           return {passed:!failed,record,failure:failed?unavailableRecord(args):null};
           }
           export async function verify(){
-           await A.validateSourcePins();const records=await receiverControls();console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_ZIP_CONTROLS/1',expected:16,completed:16,passed:16,failed:0,inventory:records,...A.FLAGS}));
-           const kind=process.env.GITHUB_JOB==='keyless_verify'?'controls':'suite',needs=JSON.parse(process.env.AFW_SUITE_NEEDS),upstream=needs[kind==='controls'?'keyless_controls':'reduction_consume_b'];const route=await verifyRoute({kind,id:upstream?.outputs?.['safe-id']??'',uploaded:upstream?.outputs?.['safe-digest']??'',expected:expectedCurrent()});
-           if(route.valid){
-            try{
-             const ref=await fixedJSON('/git/ref/heads/feat/finite-native-cleanup-20261101');A.same(ref.object.sha,A.CONTEXT.source);
-             if(kind==='controls'){A.same(upstream.result,'success');A.same(route.valid.status,'passed');}
-             else {
-              const jobs=await fixedJSON('/actions/runs/'+A.CONTEXT.run+'/jobs?per_page=100'),seven=verifySeven(jobs,needs,route.valid);route.readback.upstream=seven.sevenSuccess?'all_seven_success':'not_all_seven_success';route.readback.accepted=seven.accepted;
-              const refs=[];if(route.valid.pure)refs.push({job:'contracts',kind:'pure',id:route.valid.pure.artifactId,zipSha256:route.valid.pure.zipSha256});if(route.valid.proof)refs.push(...route.valid.proof.peerArtifacts.map(x=>({job:x.job,kind:x.kind,id:x.artifactId,zipSha256:x.zipSha256})));if(route.valid.custody.artifact)refs.push({job:'reduction_consume_b',...route.valid.custody.artifact});for(const r of refs){A.same(needs[r.job].outputs['artifact-id'],r.id);A.same(needs[r.job].outputs['artifact-digest'],r.zipSha256);if(r.job==='contracts')A.same(needs[r.job].outputs['manifest-sha256'],route.valid.pure.manifestSha256);else A.same(needs[r.job].outputs.kind,r.kind);const m=await A.metadata(r.id);A.same(m.status,200);A.validateAssignedMetadata(m.value,r);}
-             }
-            }catch{route.readback.accepted=false;route.readback.reason='invalid_evidence';route.readback.upstream=kind==='suite'?'unverified':'not_applicable';}
-           }
-           const line=JSON.stringify(route.readback);A.need(Buffer.byteLength(line+'\n')<=4096);console.log(line);await writeFile(join(process.env.RUNNER_TEMP,'afw-suite-readback.json'),line+'\n',{mode:0o600});if(!route.readback.accepted)process.exitCode=1;return route.readback;
-          }
-          if(process.argv[1]===import.meta.filename){try{await verify();}catch{console.log('AFW_COHERENT_VERIFIER_UNAVAILABLE');process.exitCode=1;}}
+           const kind=process.env.GITHUB_JOB==='keyless_verify'?'controls':'suite';let needs={};
+           try{needs=JSON.parse(process.env.AFW_SUITE_NEEDS);}catch{}
+           const upstream=needs[kind==='controls'?'keyless_controls':'reduction_consume_b'];
+           const args={kind,id:upstream?.outputs?.['safe-id']??'',uploaded:upstream?.outputs?.['safe-digest']??'',expected:expectedCurrent()};
+           try{
+            await A.validateSourcePins();A.need(['verify','keyless_verify'].includes(process.env.GITHUB_JOB));
+            const guarded=await receiverControlsGuard(args);console.log(JSON.stringify(guarded.record));
+            if(!guarded.passed)return guarded.failure;
+            const route=await verifyRoute(args);
+            return (await reconcileSuite({route,jobInventory:null,needs})).readback;
+           }catch{return unavailableRecord(args);}
+          }
+          if(process.argv[1]===import.meta.filename){
+           const record=await verify(),line=JSON.stringify(record);
+           if(Buffer.byteLength(line+'\n')<=4096){
+            console.log(line);try{await writeFile(join(process.env.RUNNER_TEMP,'afw-suite-readback.json'),line+'\n',{mode:0o600});}catch{}
+           }else console.log(JSON.stringify(unavailableRecord({kind:record.kind,id:record.artifactId??'',uploaded:record.uploadedDigest??'',expected:expectedCurrent()})));
+           if(!record.accepted)process.exitCode=1;
+          }
           NODE_SUITE_VERIFIER
           cat >"$RUNNER_TEMP/afw-suite-safe-zip.mjs" <<'NODE_SAFE_ZIP'
           import assert from 'node:assert/strict';
           import {createHash} from 'node:crypto';
           import {inflateRawSync,deflateRawSync} from 'node:zlib';
           export class SafeZipRejected extends Error{constructor(reason){super(reason);this.reason=reason;}}
           const Rejected=SafeZipRejected,need=(ok,reason)=>{if(!ok)throw new SafeZipRejected(reason);},NAMES=['result.json','manifest.json'],CAPS={'result.json':65536,'manifest.json':65536};
           const utf8=b=>{const s=new TextDecoder('utf-8',{fatal:true}).decode(b);need(Buffer.from(s).equals(b),'zip_utf8');return s;};
           export const zipSha=b=>createHash('sha256').update(b).digest('hex');
           export function bindRawZip(bytes,size,uploaded,metadataDigest){
@@ -826,25 +1264,30 @@
         env:
           PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
           PURE_DIGEST: ${{ needs.contracts.outputs.artifact-digest }}
           PURE_MANIFEST_SHA: ${{ needs.contracts.outputs.manifest-sha256 }}
           GH_ARTIFACT_TOKEN: ${{ github.token }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
-          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
-          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';const A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');const binding=await A.bindPureCurrent({job:'contracts',kind:'pure',id:e.PURE_ID,zipSha256:e.PURE_DIGEST},e.PURE_MANIFEST_SHA);await (await import('node:fs/promises')).writeFile(e.RUNNER_TEMP+'/afw-native-private/pure-assignment.json',JSON.stringify(binding));await verifyBudgetArtifact(root,'pure',e.PURE_ID);
-          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
-          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
-          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
+          import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
+          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure',A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');
+          const binding=await A.bindPureCurrent({job:'contracts',kind:'pure',id:e.PURE_ID,zipSha256:e.PURE_DIGEST},e.PURE_MANIFEST_SHA);
+          await A.finalizePureBinding(binding,async()=>{
+           await verifyBudgetArtifact(root,'pure',e.PURE_ID);
+           const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
+           const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
+           await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          });
           NODE
           printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
           
       - name: Execute fixed positive_prepare once
         id: native
         continue-on-error: true
         shell: bash
         run: |
           set -euo pipefail
           umask 077
@@ -1038,25 +1481,30 @@
         env:
           PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
           PURE_DIGEST: ${{ needs.contracts.outputs.artifact-digest }}
           PURE_MANIFEST_SHA: ${{ needs.contracts.outputs.manifest-sha256 }}
           GH_ARTIFACT_TOKEN: ${{ github.token }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
-          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
-          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';const A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');const binding=await A.bindPureCurrent({job:'contracts',kind:'pure',id:e.PURE_ID,zipSha256:e.PURE_DIGEST},e.PURE_MANIFEST_SHA);await (await import('node:fs/promises')).writeFile(e.RUNNER_TEMP+'/afw-native-private/pure-assignment.json',JSON.stringify(binding));await verifyBudgetArtifact(root,'pure',e.PURE_ID);
-          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
-          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
-          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
+          import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
+          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure',A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');
+          const binding=await A.bindPureCurrent({job:'contracts',kind:'pure',id:e.PURE_ID,zipSha256:e.PURE_DIGEST},e.PURE_MANIFEST_SHA);
+          await A.finalizePureBinding(binding,async()=>{
+           await verifyBudgetArtifact(root,'pure',e.PURE_ID);
+           const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
+           const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
+           await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          });
           NODE
           printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
           
       - name: Validate assigned producer metadata and raw ZIP3 without key
         id: producer_metadata
         env:
           PRODUCER_ID: ${{ needs.positive_prepare.outputs.artifact-id }}
           PRODUCER_DIGEST: ${{ needs.positive_prepare.outputs.artifact-digest }}
           PRODUCER_KIND: ${{ needs.positive_prepare.outputs.kind }}
           GH_ARTIFACT_TOKEN: ${{ github.token }}
@@ -1308,25 +1756,30 @@
         env:
           PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
           PURE_DIGEST: ${{ needs.contracts.outputs.artifact-digest }}
           PURE_MANIFEST_SHA: ${{ needs.contracts.outputs.manifest-sha256 }}
           GH_ARTIFACT_TOKEN: ${{ github.token }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
-          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
-          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';const A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');const binding=await A.bindPureCurrent({job:'contracts',kind:'pure',id:e.PURE_ID,zipSha256:e.PURE_DIGEST},e.PURE_MANIFEST_SHA);await (await import('node:fs/promises')).writeFile(e.RUNNER_TEMP+'/afw-native-private/pure-assignment.json',JSON.stringify(binding));await verifyBudgetArtifact(root,'pure',e.PURE_ID);
-          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
-          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
-          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
+          import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
+          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure',A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');
+          const binding=await A.bindPureCurrent({job:'contracts',kind:'pure',id:e.PURE_ID,zipSha256:e.PURE_DIGEST},e.PURE_MANIFEST_SHA);
+          await A.finalizePureBinding(binding,async()=>{
+           await verifyBudgetArtifact(root,'pure',e.PURE_ID);
+           const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
+           const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
+           await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          });
           NODE
           printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
           
       - name: Execute fixed reduction_prepare once
         id: native
         continue-on-error: true
         shell: bash
         run: |
           set -euo pipefail
           umask 077
@@ -1520,25 +1973,30 @@
         env:
           PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
           PURE_DIGEST: ${{ needs.contracts.outputs.artifact-digest }}
           PURE_MANIFEST_SHA: ${{ needs.contracts.outputs.manifest-sha256 }}
           GH_ARTIFACT_TOKEN: ${{ github.token }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
-          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
-          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';const A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');const binding=await A.bindPureCurrent({job:'contracts',kind:'pure',id:e.PURE_ID,zipSha256:e.PURE_DIGEST},e.PURE_MANIFEST_SHA);await (await import('node:fs/promises')).writeFile(e.RUNNER_TEMP+'/afw-native-private/pure-assignment.json',JSON.stringify(binding));await verifyBudgetArtifact(root,'pure',e.PURE_ID);
-          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
-          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
-          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
+          import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
+          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure',A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');
+          const binding=await A.bindPureCurrent({job:'contracts',kind:'pure',id:e.PURE_ID,zipSha256:e.PURE_DIGEST},e.PURE_MANIFEST_SHA);
+          await A.finalizePureBinding(binding,async()=>{
+           await verifyBudgetArtifact(root,'pure',e.PURE_ID);
+           const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
+           const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
+           await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          });
           NODE
           printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
           
       - name: Validate assigned producer metadata and raw ZIP3 without key
         id: producer_metadata
         env:
           PRODUCER_ID: ${{ needs.reduction_prepare.outputs.artifact-id }}
           PRODUCER_DIGEST: ${{ needs.reduction_prepare.outputs.artifact-digest }}
           PRODUCER_KIND: ${{ needs.reduction_prepare.outputs.kind }}
           GH_ARTIFACT_TOKEN: ${{ github.token }}
@@ -1790,25 +2248,30 @@
         env:
           PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
           PURE_DIGEST: ${{ needs.contracts.outputs.artifact-digest }}
           PURE_MANIFEST_SHA: ${{ needs.contracts.outputs.manifest-sha256 }}
           GH_ARTIFACT_TOKEN: ${{ github.token }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
-          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
-          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';const A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');const binding=await A.bindPureCurrent({job:'contracts',kind:'pure',id:e.PURE_ID,zipSha256:e.PURE_DIGEST},e.PURE_MANIFEST_SHA);await (await import('node:fs/promises')).writeFile(e.RUNNER_TEMP+'/afw-native-private/pure-assignment.json',JSON.stringify(binding));await verifyBudgetArtifact(root,'pure',e.PURE_ID);
-          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
-          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
-          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
+          import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
+          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure',A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');
+          const binding=await A.bindPureCurrent({job:'contracts',kind:'pure',id:e.PURE_ID,zipSha256:e.PURE_DIGEST},e.PURE_MANIFEST_SHA);
+          await A.finalizePureBinding(binding,async()=>{
+           await verifyBudgetArtifact(root,'pure',e.PURE_ID);
+           const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
+           const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
+           await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          });
           NODE
           printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
           
       - name: Execute fixed readonly once
         id: native
         continue-on-error: true
         shell: bash
         run: |
           set -euo pipefail
           umask 077
@@ -2010,25 +2473,30 @@
         env:
           PURE_ID: ${{ needs.contracts.outputs.artifact-id }}
           PURE_DIGEST: ${{ needs.contracts.outputs.artifact-digest }}
           PURE_MANIFEST_SHA: ${{ needs.contracts.outputs.manifest-sha256 }}
           GH_ARTIFACT_TOKEN: ${{ github.token }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/pure-binding.log" 2>&1
-          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
-          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure';const A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');const binding=await A.bindPureCurrent({job:'contracts',kind:'pure',id:e.PURE_ID,zipSha256:e.PURE_DIGEST},e.PURE_MANIFEST_SHA);await (await import('node:fs/promises')).writeFile(e.RUNNER_TEMP+'/afw-native-private/pure-assignment.json',JSON.stringify(binding));await verifyBudgetArtifact(root,'pure',e.PURE_ID);
-          const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
-          const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
-          await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          import {verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
+          import {mkdir,copyFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
+          const e=process.env,root=e.RUNNER_TEMP+'/afw-prior-pure',A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');
+          const binding=await A.bindPureCurrent({job:'contracts',kind:'pure',id:e.PURE_ID,zipSha256:e.PURE_DIGEST},e.PURE_MANIFEST_SHA);
+          await A.finalizePureBinding(binding,async()=>{
+           await verifyBudgetArtifact(root,'pure',e.PURE_ID);
+           const group=e.AFW_BUDGET_GROUP==='reduction_b'?'reduction_a':e.AFW_BUDGET_GROUP;
+           const preflight=JSON.parse(await readFile(root+'/preflight-'+group+'.json','utf8'));assert.equal(preflight.group,group);assert.equal(preflight.I0Opened,false);
+           await mkdir('output/finite-budget/prior-pure',{recursive:true});await copyFile(root+'/preflight-'+group+'.json','output/finite-budget/prior-pure/preflight.json');
+          });
           NODE
           printf 'AFW_BUDGET_PREFLIGHT=output/finite-budget/prior-pure/preflight.json\n' >>"$GITHUB_ENV"
           
       - name: Validate assigned producer metadata and raw ZIP3 without key
         id: producer_metadata
         env:
           PRODUCER_ID: ${{ needs.reduction_prepare.outputs.artifact-id }}
           PRODUCER_DIGEST: ${{ needs.reduction_prepare.outputs.artifact-digest }}
           PRODUCER_KIND: ${{ needs.reduction_prepare.outputs.kind }}
           GH_ARTIFACT_TOKEN: ${{ github.token }}
@@ -2121,88 +2589,99 @@
            let primary=null;
            try{record.enteredFetch=true;record.outcome='in_progress';const r=await fetch('https://api.github.com/repos/'+repo+path,{headers:{Authorization:'Bearer '+e.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(timeoutMs)});record.status=r.status;assert.equal(r.status,200);const value=await r.json();record.outcome='fulfilled';return value;}
            catch(error){primary=error;record.outcome='rejected';throw error;}
            finally{record.finishedAt=Date.now();record.remainingAfter=pollDeadline-record.finishedAt;try{await persistPoll();}catch(error){if(!primary)throw error;}}
           };
           const sameRef=await request('/git/ref/heads/feat/finite-native-cleanup-20261101');assert.equal(sameRef.object.sha,e.GITHUB_SHA,'qualification Source stayed frozen');
           await mkdir(root,{mode:0o700});let inventory,jobInventory;
           await collectFixedBudgetPeers({startedAt:Number(e.AFW_JOB_STARTED_MS),read:async timeoutMs=>{
            pollQueryAttempts++;pollPhase='peer_poll';pollTimeoutMs=timeoutMs;await persistPoll();inventory=await request('/actions/runs/'+e.GITHUB_RUN_ID+'/artifacts?per_page=100');assert(inventory.total_count<=100);
            const expected=['finite-budget-fixed-preparation-'+e.GITHUB_SHA,...fixed.map(x=>'finite-budget-'+x.job+'-'+e.GITHUB_SHA+'-'+e.GITHUB_RUN_ID)];
-           jobInventory=await request('/actions/runs/'+e.GITHUB_RUN_ID+'/jobs?per_page=100');assert.equal(jobInventory.total_count,jobInventory.jobs.length);const names=jobInventory.jobs.map(x=>x.name);assert.equal(new Set(names).size,names.length);assert.deepEqual(names.filter(x=>x!=='verify').sort(),A.LEGACY.slice().sort());const receiver=jobInventory.jobs.find(x=>x.name==='verify');if(receiver){assert(['pending','queued','waiting','requested'].includes(receiver.status));assert.equal(receiver.conclusion,null);}
+           jobInventory=await request('/actions/runs/'+e.GITHUB_RUN_ID+'/attempts/1/jobs?per_page=100');assert.equal(jobInventory.total_count,jobInventory.jobs.length);const names=jobInventory.jobs.map(x=>x.name);assert.equal(new Set(names).size,names.length);assert.deepEqual(names.filter(x=>x!=='verify').sort(),A.LEGACY.slice().sort());const receiver=jobInventory.jobs.find(x=>x.name==='verify');if(receiver){assert(['pending','queued','waiting','requested'].includes(receiver.status));assert.equal(receiver.conclusion,null);}
            const terminalPeers=jobInventory.jobs.filter(job=>A.LEGACY.slice(0,6).includes(job.name)&&job.status==='completed'&&job.conclusion==='success').length;
            return {ready:expected.every(name=>inventory.artifacts.filter(a=>a.name===name).length===1)&&terminalPeers===6,artifactCount:inventory.total_count,terminalPeers};
           },sleep:ms=>new Promise(resolve=>setTimeout(resolve,ms)),persist:persistPoll});
           pollPhase='peer_identity';
-          A.validatePeerInventory(jobInventory,Date.now());
+          const observedAt=Date.now();A.validatePeerInventory(jobInventory,observedAt);
           const bindings=[],receipts=[];
           const pureBinding=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-native-private/pure-assignment.json','utf8'));
           const expected=[{job:'contracts',kind:'pure',artifactId:pureBinding.artifactId,digest:pureBinding.zipSha256},...fixed.map(x=>{const matches=inventory.artifacts.filter(a=>a.name===A.artifactName(x.job));assert.equal(matches.length,1);return {...x,artifactId:String(matches[0].id),digest:matches[0].digest?.slice(7)};})];
           for(const cfg of expected){
-           const binding={job:cfg.job,kind:cfg.kind,id:cfg.artifactId,zipSha256:cfg.digest},artifact=await request('/actions/artifacts/'+cfg.artifactId);A.validateAssignedMetadata(artifact,binding);const raw=await A.rawAssigned(cfg.artifactId,134283264);assert.equal(raw.length,artifact.size_in_bytes);assert.equal(sha(raw),cfg.digest);
+           const binding={job:cfg.job,kind:cfg.kind,id:cfg.artifactId,zipSha256:cfg.digest},artifact=await request('/actions/artifacts/'+cfg.artifactId);A.validateAssignedMetadata(artifact,binding,'b-peer');const raw=await A.rawAssigned(cfg.artifactId,'b-peer');assert.equal(raw.length,artifact.size_in_bytes);assert.equal(sha(raw),cfg.digest);
            if(cfg.job!=='contracts'){const directory=root+'/'+cfg.job+'-sealed';await mkdir(directory,{mode:0o700});const zipFiles=A.decodePrivateZip(raw);A.validatePrivateReceiptCaps(zipFiles,cfg.kind);for(const [name,bytes]of zipFiles)await writeFile(directory+'/'+name,bytes,{flag:'wx',mode:0o600});bindings.push({...cfg,artifact});}
            receipts.push({artifactId:cfg.artifactId,digest:'sha256:'+cfg.digest,name:A.artifactName(cfg.job),kind:cfg.kind});
           }
-          await writeFile(e.RUNNER_TEMP+'/afw-native-private/peer-bindings.json',JSON.stringify(bindings));await writeFile(e.RUNNER_TEMP+'/afw-native-private/peer-receipts.json',JSON.stringify(receipts));await writeFile(e.RUNNER_TEMP+'/afw-native-private/peer-jobs.json',JSON.stringify(jobInventory));
+          await writeFile(e.RUNNER_TEMP+'/afw-native-private/peer-bindings.json',JSON.stringify(bindings));await writeFile(e.RUNNER_TEMP+'/afw-native-private/peer-receipts.json',JSON.stringify(receipts));await writeFile(e.RUNNER_TEMP+'/afw-native-private/peer-jobs.json',JSON.stringify({...jobInventory,observedAt}));
           NODE
       - name: Generic custody peer positive_prepare open
         id: peer_open_positive_prepare
+        if: steps.peer_download.outcome == 'success'
         env:
           AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node test/fixtures/finite-checkpoint-custody.mjs open checkpoint "$RUNNER_TEMP/afw-qualification-peer-proof/positive_prepare-sealed" "$RUNNER_TEMP/afw-qualification-peer-proof/positive_prepare-opened" >"$RUNNER_TEMP/afw-native-private/logs/peer-open-positive_prepare.log" 2>&1
       - name: Generic custody peer positive_consume open
         id: peer_open_positive_consume
+        if: steps.peer_download.outcome == 'success'
         env:
           AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node test/fixtures/finite-checkpoint-custody.mjs open positive-result "$RUNNER_TEMP/afw-qualification-peer-proof/positive_consume-sealed" "$RUNNER_TEMP/afw-qualification-peer-proof/positive_consume-opened" >"$RUNNER_TEMP/afw-native-private/logs/peer-open-positive_consume.log" 2>&1
       - name: Generic custody peer reduction_prepare open
         id: peer_open_reduction_prepare
+        if: steps.peer_download.outcome == 'success'
         env:
           AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node test/fixtures/finite-checkpoint-custody.mjs open reduction-checkpoint "$RUNNER_TEMP/afw-qualification-peer-proof/reduction_prepare-sealed" "$RUNNER_TEMP/afw-qualification-peer-proof/reduction_prepare-opened" >"$RUNNER_TEMP/afw-native-private/logs/peer-open-reduction_prepare.log" 2>&1
       - name: Generic custody peer reduction_consume_a open
         id: peer_open_reduction_consume_a
+        if: steps.peer_download.outcome == 'success'
         env:
           AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node test/fixtures/finite-checkpoint-custody.mjs open reduction-result-a "$RUNNER_TEMP/afw-qualification-peer-proof/reduction_consume_a-sealed" "$RUNNER_TEMP/afw-qualification-peer-proof/reduction_consume_a-opened" >"$RUNNER_TEMP/afw-native-private/logs/peer-open-reduction_consume_a.log" 2>&1
       - name: Generic custody peer readonly open
         id: peer_open_readonly
+        if: steps.peer_download.outcome == 'success'
         env:
           AFW_SYN_CHECKPOINT_KEY: ${{ secrets.AFW_SYN_CHECKPOINT_KEY }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node test/fixtures/finite-checkpoint-custody.mjs open readonly-result "$RUNNER_TEMP/afw-qualification-peer-proof/readonly-sealed" "$RUNNER_TEMP/afw-qualification-peer-proof/readonly-opened" >"$RUNNER_TEMP/afw-native-private/logs/peer-open-readonly.log" 2>&1
       - name: Verify coherent original sixteen-case evidence before sealing
         id: aggregate
-        if: steps.native.outcome == 'success' && steps.peer_open_readonly.outcome == 'success'
+        if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success' && steps.native.outcome == 'success'
         shell: bash
         run: |
           set -euo pipefail
           umask 077
+          test '${{ steps.peer_download.outcome }}' = success
+          test '${{ steps.peer_open_positive_prepare.outcome }}' = success
+          test '${{ steps.peer_open_positive_consume.outcome }}' = success
+          test '${{ steps.peer_open_reduction_prepare.outcome }}' = success
+          test '${{ steps.peer_open_reduction_consume_a.outcome }}' = success
+          test '${{ steps.peer_open_readonly.outcome }}' = success
           node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/aggregate.log" 2>&1
           import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {execFileSync} from 'node:child_process';import {createHash} from 'node:crypto';
           import {validateFixedBudgetJobManifest,verifyBudgetArtifact} from './test/fixtures/finite-budget-world.mjs';
           const A=await import(process.env.RUNNER_TEMP+'/afw-suite-adapter.mjs'),e=process.env,sha=b=>createHash('sha256').update(b).digest('hex'),repo=e.GITHUB_REPOSITORY,root=e.RUNNER_TEMP+'/afw-qualification-peer-proof',jobInventory=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-native-private/peer-jobs.json','utf8')),bindings=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-native-private/peer-bindings.json','utf8')),receipts=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-native-private/peer-receipts.json','utf8'));
           const fixed=[{job:'positive_prepare',kind:'checkpoint',role:'producer',group:'positive',cases:['P1']},{job:'positive_consume',kind:'positive-result',role:'consumer',group:'positive',cases:['P1']},{job:'reduction_prepare',kind:'reduction-checkpoint',role:'producer',group:'reduction_a',cases:['D1','D2','D3','D4']},{job:'reduction_consume_a',kind:'reduction-result-a',role:'consumer',group:'reduction_a',cases:['D1','D2']},{job:'readonly',kind:'readonly-result',role:'consumer',group:'readonly',cases:['R1','R2','R3']}],opened=new Map();
           async function download(name,kind){const b=bindings.find(x=>A.artifactName(x.job)===name);assert(b&&b.kind===kind);return {directory:root+'/'+b.job+'-opened',artifact:b.artifact};}
           const pureBinding=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-native-private/pure-assignment.json','utf8')),pure={directory:e.RUNNER_TEMP+'/afw-prior-pure',artifact:{id:Number(pureBinding.artifactId)}};await verifyBudgetArtifact(pure.directory,'pure',pureBinding.artifactId);
           const counts=async file=>{const value=JSON.parse(await readFile(file,'utf8'));assert.equal(value.fail,0);assert.equal(value.cancelled,0);assert.equal(value.skipped,0);assert.equal(value.todo,0);assert.equal(value.tests,value.pass);return value;};
           const pureCounts=JSON.parse(await readFile(pure.directory+'/q-counts.json','utf8'));assert.deepEqual(pureCounts,{tests:8,pass:8,fail:0,cancelled:0,skipped:0,todo:0});
           const pureDiagnostic=JSON.parse(await readFile(pure.directory+'/diagnostics.json','utf8'));assert.equal(pureDiagnostic.allPassed,true);assert(pureDiagnostic.profiles.every(profile=>profile.I0Opened===false&&profile.nativeExecutionProduced===false));assert.equal(pureDiagnostic.profiles.find(p=>p.profile==='positive').additionalSYNCount,0);
@@ -2229,23 +2708,23 @@
           assert(Math.max(aStart,bStart)<Math.min(aEnd,bEnd),'actual consumer replica intervals overlap');
           const rResults=await Promise.all(['R1','R2','R3'].map(name=>readResult(readonly.directory,'readonly',name)));
           function checkpointLineage(data,kind){const rootRow=data.facts.rows.find(([key])=>key.startsWith('afw.finite-owner-issuer-provenance.v1:')&&key.endsWith(':root'));assert(rootRow);const sdk=JSON.parse(rootRow[1]);assert.equal(sdk.I0,data.plan.I0);assert.equal(sdk.C0,data.plan.C0);assert.equal(sdk.C1,data.plan.C1);return {kind,I0:sdk.I0,C0:sdk.C0,C1:sdk.C1,sdkRootHash:sdk.recordHash,graphs:[{role:'M',sha256:data.build.M.sha256},{role:'QA',sha256:data.build.QA.sha256}]};}
           const lineages=[checkpointLineage(positiveCheckpoint,'positive'),checkpointLineage(reductionCheckpoint,'reduction'),...rResults.map(result=>{assert(result.lineage);return {...result.lineage,kind:result.caseName};})];
           assert.equal(lineages.length,5);assert.deepEqual(lineages.map(x=>x.kind),['positive','reduction','R1','R2','R3']);assert.equal(lineages.flatMap(x=>x.graphs).length,10);
           const positiveOwnership=JSON.parse(await readFile(opened.get('positive_prepare').directory+'/output/finite-budget/owned/positive_producer/ownership.json','utf8')),reductionOwnership=JSON.parse(await readFile(producer.directory+'/output/finite-budget/owned/reduction_producer/ownership.json','utf8'));
           const occurrenceOwners=[positiveOwnership,reductionOwnership,...rResults.map(v=>v.ownership)];assert.equal(occurrenceOwners.length,5);
           const occurrenceProof=occurrenceOwners.map((value,index)=>{assert.equal(value.complete,true);assert.equal(value.records.length,1);const record=value.records[0];assert.equal(record.kind,'initial');assert(record.events.includes('miniflare-attached'));assert(record.events.includes('fixture-attached'));assert.equal(record.graphs.length,2);assert.deepEqual(record.graphs.map(g=>g.role).sort(),['M','QA']);for(const graph of record.graphs){assert.equal(graph.mounted,true);assert.equal(graph.sha256,lineages[index].graphs.find(g=>g.role===graph.role).sha256);}return {occurrence:index+1,caseName:value.caseName,allocationOrdinal:record.ordinal,graphs:record.graphs};});assert.equal(occurrenceProof.flatMap(v=>v.graphs).length,10);
 
           for(const l of lineages){assert.equal(l.C0,l.I0+900000);assert.equal(l.C1,l.C0+180000);assert.deepEqual(l.graphs.map(g=>g.role).sort(),['M','QA']);for(const graph of l.graphs)assert.match(graph.sha256,/^[a-f0-9]{64}$/);}
-          const jobs=jobInventory;const peerObservation=A.validatePeerInventory(jobs,Date.now());
+          const jobs=jobInventory,observedAt=jobs.observedAt;const peerObservation=A.validatePeerInventory(jobs,observedAt);
           const observedNativeJobPeak=peerObservation.observedNativeJobPeak;
-          const summary={purpose:'afw.fixed-budget-coherent-private-proof.syn.v1',source:e.GITHUB_SHA,run:e.GITHUB_RUN_ID,attempt:1,businessCounts:{tests:16,pass:16,fail:0,cancelled:0,skipped:0,todo:0},Q:8,R:3,D:4,P:1,lineages,occurrenceProof,consumerOverlap:{aStart,aEnd,bStart,bEnd,allFourReady:Math.max(...allD.map(x=>x.recovery.pairReady)),C0:reductionCheckpoint.plan.C0},receipts,jobs:jobs.jobs.filter(job=>A.LEGACY.includes(job.name)).map(job=>({id:job.id,name:job.name,status:job.status,conclusion:job.conclusion,startedAt:job.started_at,completedAt:job.completed_at})),observedNativeJobPeak,nativeJobBound:3,miniflarePerJobBound:2,globalMiniflareBound:6,requiresRootAllTerminalReadback:true,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
+          const summary={purpose:'afw.fixed-budget-coherent-private-proof.syn.v1',source:e.GITHUB_SHA,run:e.GITHUB_RUN_ID,attempt:1,observedAt,businessCounts:{tests:16,pass:16,fail:0,cancelled:0,skipped:0,todo:0},Q:8,R:3,D:4,P:1,lineages,occurrenceProof,consumerOverlap:{aStart,aEnd,bStart,bEnd,allFourReady:Math.max(...allD.map(x=>x.recovery.pairReady)),C0:reductionCheckpoint.plan.C0},receipts,jobs:jobs.jobs.filter(job=>A.LEGACY.includes(job.name)).map(job=>({id:job.id,name:job.name,status:job.status,conclusion:job.conclusion,startedAt:job.started_at,completedAt:job.completed_at})),observedNativeJobPeak,nativeJobBound:3,miniflarePerJobBound:2,globalMiniflareBound:6,requiresRootAllTerminalReadback:true,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false};
           const privateBytes=Buffer.from(JSON.stringify(summary,null,2));await writeFile(e.RUNNER_TEMP+'/afw-native-private/coherent-proof.json',privateBytes);await writeFile(e.RUNNER_TEMP+'/afw-native-private/private-proof-sha256',sha(privateBytes)+'\n');
           NODE
       - name: Prepare complete private inventory and legacy manifest without key
         id: seal_prepare
         if: always() && !cancelled() && steps.custody.outcome == 'success'
         env:
           COMMAND_OK: ${{ steps.native.outcome == 'success' && steps.aggregate.outcome == 'success' }}
           SUCCESS_KIND: reduction-result-b
           FAILURE_KIND: consumer-failure
         shell: bash
@@ -2325,42 +2804,43 @@
           const context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:e.GITHUB_REPOSITORY,ref:e.GITHUB_REF,sourceSha:e.GITHUB_SHA,runId:e.GITHUB_RUN_ID,runAttempt:1,kind:e.OWN_KIND};
           const original=await readFile(e.RUNNER_TEMP+'/afw-native-private/job-manifest.json'),restored=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/job-manifest.json');assert(original.equals(restored));const A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs'),manifest=JSON.parse(restored),binding={job:e.GITHUB_JOB,kind:e.OWN_KIND,id:e.OWN_ARTIFACT_ID,zipSha256:e.OWN_DIGEST};if(A.validateInnerManifest(manifest,binding))validateFixedBudgetJobManifest(manifest,{job:e.GITHUB_JOB,sourceTree:A.CONTEXT.tree,artifactId:e.OWN_ARTIFACT_ID,digest:e.OWN_DIGEST,context});
           if(e.OWN_KIND==='reduction-result-b'){const originalProofBytes=await readFile(e.RUNNER_TEMP+'/afw-native-private/coherent-proof.json'),proofBytes=await readFile(e.RUNNER_TEMP+'/afw-native-reopened/coherent-proof.json'),captured=(await readFile(e.RUNNER_TEMP+'/afw-native-private/private-proof-sha256','utf8')).trim();assert.equal(A.sha(originalProofBytes),captured);assert.equal(A.sha(proofBytes),captured);const peers=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-native-private/peer-bindings.json','utf8')),pure=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-native-private/pure-assignment.json','utf8')),proof=A.validateReopenedSuite({proofBytes,originalProofBytes,originalManifestBytes:original,reopenedManifestBytes:restored,ownBinding:binding,expectedContext:A.CONTEXT,expectedPeers:{pure:{artifactId:pure.artifactId,zipSha256:pure.zipSha256},peers:peers.map(x=>({job:x.job,kind:x.kind,artifactId:x.artifactId,zipSha256:x.digest}))}});await (await import('node:fs/promises')).writeFile(e.RUNNER_TEMP+'/afw-native-private/suite-proof.json',JSON.stringify(proof));}
           NODE
           printf 'native_same_id_verified artifact_id=%s kind=%s\n' "$OWN_ARTIFACT_ID" "$OWN_KIND"
           
       - name: Publish truthful current suite SAFE before the final truth guard
         id: summary_pair
         if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'
         env:
+          PURE_BINDING_OUTCOME: ${{ steps.pure_binding.outcome }}
           NATIVE_OUTCOME: ${{ steps.native.outcome }}
           AGGREGATE_OUTCOME: ${{ steps.aggregate.outcome }}
-          PEER_DOWNLOAD_OUTCOME: ${{ steps.peer_download.outcome }}
-          PEER_OPENS: ${{ steps.peer_open_positive_prepare.outcome }},${{ steps.peer_open_positive_consume.outcome }},${{ steps.peer_open_reduction_prepare.outcome }},${{ steps.peer_open_reduction_consume_a.outcome }},${{ steps.peer_open_readonly.outcome }}
           OWN_METADATA_OUTCOME: ${{ steps.own_metadata.outcome }}
           OWN_OPEN_OUTCOME: ${{ steps.own_open.outcome }}
           OWN_VERIFIED_OUTCOME: ${{ steps.own_verified.outcome }}
           NATIVE_ID: ${{ steps.upload.outputs.artifact-id }}
           NATIVE_DIGEST: ${{ steps.upload.outputs.artifact-digest }}
           NATIVE_KIND: ${{ steps.seal.outputs.kind }}
         shell: bash
         run: |
           set -euo pipefail
           umask 077
           node --input-type=module <<'NODE' >"$RUNNER_TEMP/afw-native-private/logs/safe-publication.log" 2>&1
-          import {readFile,writeFile} from 'node:fs/promises';const e=process.env,A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');await A.validateSourcePins();
-          let pure=null;try{pure=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-native-private/pure-assignment.json','utf8'));}catch{}
-          const command=pure===null||!['success','failure'].includes(e.NATIVE_OUTCOME)?'not_observed':e.NATIVE_OUTCOME==='success'?'passed':'failed',aggregate=command!=='passed'?'not_observed':e.AGGREGATE_OUTCOME==='success'?'verified':[e.AGGREGATE_OUTCOME,e.PEER_DOWNLOAD_OUTCOME,...e.PEER_OPENS.split(',')].includes('failure')?'unverified':'not_observed';
-          let artifact=null;try{A.canonicalId(e.NATIVE_ID);A.hex(e.NATIVE_DIGEST);A.need(['reduction-result-b','consumer-failure'].includes(e.NATIVE_KIND));artifact={id:e.NATIVE_ID,zipSha256:e.NATIVE_DIGEST,kind:e.NATIVE_KIND};}catch{}
-          const custody=artifact===null?{state:'unavailable',artifact:null}:{state:e.OWN_VERIFIED_OUTCOME==='success'?'reopened':'assigned',artifact};
-          let proof=null,failure=null;if(command==='failed')failure={stage:'native_b',reason:'command_failed'};else if(pure===null)failure={stage:'pure',reason:'pure_unverified'};else if(command==='not_observed')failure={stage:'native_b',reason:'not_observed'};else if(aggregate==='not_observed')failure={stage:'aggregate',reason:'not_observed'};else if(aggregate==='unverified')failure={stage:'aggregate',reason:'evidence_unverified'};else if(custody.state==='unavailable'||e.OWN_METADATA_OUTCOME!=='success')failure={stage:'custody',reason:'assignment_unverified'};else if(e.OWN_OPEN_OUTCOME!=='success')failure={stage:'custody',reason:'reopen_unverified'};else if(e.OWN_VERIFIED_OUTCOME!=='success')failure={stage:'custody',reason:'proof_unverified'};else proof=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-native-private/suite-proof.json','utf8'));
-          const result=A.makeSuite({context:A.CONTEXT,sourcePins:A.PINS,programHashes:A.PROGRAM_HASHES,command,aggregate,pure,custody,proof,failure});await A.publishPair('suite',result);await writeFile(e.GITHUB_OUTPUT,'status='+result.status+'\n',{flag:'a'});
+          import {readFile,writeFile} from 'node:fs/promises';
+          const e=process.env,A=await import(e.RUNNER_TEMP+'/afw-suite-adapter.mjs');await A.validateSourcePins();
+          const readOptional=async name=>{try{return JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-native-private/'+name,'utf8'));}catch(error){if(error.code==='ENOENT')return null;throw error;}};
+          const pure=await readOptional('pure-assignment.json'),proof=await readOptional('suite-proof.json');
+          let assignment=null;
+          try{A.canonicalId(e.NATIVE_ID);A.hex(e.NATIVE_DIGEST);A.need(['reduction-result-b','consumer-failure'].includes(e.NATIVE_KIND));assignment={id:e.NATIVE_ID,zipSha256:e.NATIVE_DIGEST,kind:e.NATIVE_KIND};}catch{}
+          const outcomes={pureBinding:e.PURE_BINDING_OUTCOME,native:e.NATIVE_OUTCOME,aggregate:e.AGGREGATE_OUTCOME,ownMetadata:e.OWN_METADATA_OUTCOME,ownOpen:e.OWN_OPEN_OUTCOME,ownValidation:e.OWN_VERIFIED_OUTCOME};
+          const result=A.projectSuiteOutcome({outcomes,receipts:{pure,assignment,proof}});
+          await A.publishPair('suite',result);await writeFile(e.GITHUB_OUTPUT,'status='+result.status+'\n',{flag:'a'});
           NODE
       - name: Upload current two-JSON suite SAFE only
         id: summary_upload
         if: always() && !cancelled() && steps.summary_pair.outcome == 'success'
         uses: actions/upload-artifact@v4
         with:
           name: afw-coherent-suite-safe-${{ github.run_id }}-1
           path: ${{ runner.temp }}/afw-suite-safe/
           retention-days: 7
           if-no-files-found: error
```

## Complete activation-only patch: fixed inactive → only fix1 overlay

Root roundtrip verified; helper bodies unchanged; all actual8remainfalse.

```diff
--- a/.github/workflows/afw-finite-budget-qualification.yml
+++ b/.github/workflows/afw-finite-budget-qualification.yml
@@ -1,14 +1,16 @@
 name: AFW finite budget qualification
-run-name: AFW coherent suite qualification HELD ${{ github.sha }}
+run-name: AFW coherent suite FIX1 KEYLESS qualification ${{ github.sha }}
 on:
-  workflow_dispatch:
+  push:
+    branches: [feat/finite-native-cleanup-20261101]
+    paths: [.github/workflows/afw-finite-budget-qualification.yml]
 permissions:
   contents: read
   actions: read
 concurrency:
   group: afw-finite-budget-qualification
   cancel-in-progress: false
 # PREPARATION ONLY. Every job remains literally false pending Root review.
 # PREPARATION ONLY: all eight actual jobs are literally false; actual Native suite remains HELD.
 jobs:
   contracts:
@@ -2884,18 +2886,136 @@
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
           const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
           NODE_SUITE_BOOTSTRAP
       - name: Verify all seven current direct outputs and the current SAFE pair
+        env:
+          GH_ARTIFACT_TOKEN: ${{ github.token }}
+          AFW_SUITE_NEEDS: ${{ toJSON(needs) }}
+        shell: bash
+        run: |
+          set -euo pipefail
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          node "$RUNNER_TEMP/afw-suite-verifier.mjs"
+  keyless_controls:
+    if: ${{ github.event_name == 'push' && github.event.head_commit.message == 'AFW COHERENT SUITE FIX1 KEYLESS QUALIFICATION 20261113090936Z' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    runs-on: ubuntu-24.04
+    timeout-minutes: 7
+    outputs:
+      safe-id: ${{ steps.summary_upload.outputs.artifact-id }}
+      safe-digest: ${{ steps.summary_upload.outputs.artifact-digest }}
+    steps:
+      - uses: actions/checkout@v4
+        with:
+          repository: tokenizartinfo-ops/agent-friendly-web
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - name: Materialize current Source-bound suite programs before import
+        id: suite_bootstrap
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
+          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
+          const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
+          assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
+          const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
+          const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
+          for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
+          assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
+          const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
+          const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
+          NODE_SUITE_BOOTSTRAP
+      - name: Execute six direct shared-seam controls without Native
+        id: controls
+        continue-on-error: true
+        shell: bash
+        run: |
+          set -euo pipefail
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          result=0
+          node "$RUNNER_TEMP/afw-suite-controls.mjs" || result=$?
+          printf 'exit=%s\n' "$result" >>"$GITHUB_OUTPUT"
+          test "$result" = 0
+      - name: Validate the truthful current controls pair before upload
+        id: pair_written
+        if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'
+        shell: bash
+        run: |
+          set -euo pipefail
+          node --input-type=module <<'NODE'
+          import {readFile,writeFile} from 'node:fs/promises';
+          try{const A=await import(process.env.RUNNER_TEMP+'/afw-suite-adapter.mjs'),V=await import(process.env.RUNNER_TEMP+'/afw-suite-verifier.mjs'),root=process.env.RUNNER_TEMP+'/afw-suite-controls-safe',pair=new Map();for(const n of ['result.json','manifest.json'])pair.set(n,await readFile(root+'/'+n));const result=V.validatePair(pair,'controls',{context:A.CONTEXT,sourcePins:A.PINS,programHashes:A.PROGRAM_HASHES});await writeFile(process.env.GITHUB_OUTPUT,'status='+result.status+'\n',{flag:'a'});}catch{console.log('controls_pair_unavailable');process.exitCode=1;}
+          NODE
+      - name: Upload only the closed two-JSON controls SAFE
+        id: summary_upload
+        if: always() && !cancelled() && steps.pair_written.outcome == 'success'
+        uses: actions/upload-artifact@v4
+        with:
+          name: afw-coherent-suite-controls-safe-${{ github.run_id }}-1
+          path: ${{ runner.temp }}/afw-suite-controls-safe/
+          retention-days: 7
+          if-no-files-found: error
+      - name: Require all six controls and their truthful publication
+        if: always() && !cancelled()
+        shell: bash
+        run: |
+          test '${{ steps.controls.outcome }}' = success
+          test '${{ steps.pair_written.outputs.status }}' = passed
+          test '${{ steps.summary_upload.outcome }}' = success
+  keyless_verify:
+    if: ${{ always() && github.event_name == 'push' && github.event.head_commit.message == 'AFW COHERENT SUITE FIX1 KEYLESS QUALIFICATION 20261113090936Z' && github.repository == 'tokenizartinfo-ops/agent-friendly-web' && github.ref == 'refs/heads/feat/finite-native-cleanup-20261101' && github.run_attempt == 1 }}
+    needs: [keyless_controls]
+    runs-on: ubuntu-24.04
+    timeout-minutes: 2
+    steps:
+      - uses: actions/checkout@v4
+        with:
+          repository: tokenizartinfo-ops/agent-friendly-web
+          ref: ${{ github.sha }}
+          persist-credentials: false
+          fetch-depth: 1
+      - uses: actions/setup-node@v4
+        with:
+          node-version: '22.23.4'
+      - name: Materialize current Source-bound suite programs before import
+        id: suite_bootstrap
+        shell: bash
+        run: |
+          set -euo pipefail
+          umask 077
+          test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+          node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
+          import assert from 'node:assert/strict';import {readFile,writeFile} from 'node:fs/promises';import {join} from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
+          const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
+          assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
+          const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
+          const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
+          for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
+          assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
+          const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
+          const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
+          NODE_SUITE_BOOTSTRAP
+      - name: Verify the current controls SAFE and all sixteen ZIP receiver controls
         env:
           GH_ARTIFACT_TOKEN: ${{ github.token }}
           AFW_SUITE_NEEDS: ${{ toJSON(needs) }}
         shell: bash
         run: |
           set -euo pipefail
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node "$RUNNER_TEMP/afw-suite-verifier.mjs"
```

## Complete net report append: previously reviewed closed Source38ddef2b → current closed0ade3837

F7 restoration exact preceding closed tree. Therefore the only persistent change is this report append. Root roundtrip verified complete prefix and full61240characters.

```diff
--- a/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
+++ b/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
@@ -224,10 +224,289 @@
 
 Main remained `0c9c475b3ebaa970fc11d628b40e50a90cceb727`. All mutations used expected-tip CAS; no force, main/PR/merge, credential, Cloudflare API/runtime, OAuth/OTP, permission, mail or Max operation occurred. No local Source file, worktree, clone, dependency installation, build, Source eval/import/execution or Native/SDK/Miniflare execution was used. Public Source strings, hashing and metadata were held in RAM; the actual qualification ran only in GitHub Actions.
 
 All five flags remain exactly false:
 
 ```json
 {"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
 ```
 
 **STOP after restoration, this new report and final preservation readbacks. No auto-retry.**
+
+
+# Fix round 1/5 — newly released single KEYLESS qualification
+
+Date: 2026-11-13 UTC. Result: **DONE; covering KEYLESS qualification PASSED; original task review still required; Task 2 HELD**.
+
+This is an explicit new Root release after the preceding failure and independent review, not an automatic retry. The entire preceding 24731-character report, blob `ffe573665eba243be3204c6f1d4ab2c635a6e9df`, is preserved byte-for-byte as this report's prefix. The initial failure, its records and its limitations above are not rewritten.
+
+## Fix authority, boundaries and immutable package
+
+Root released fix round1/5 against immutable Rootdocs `6310892ec62d921f0a839e5256d281d5edc7ffbb`: brief `docs/superpowers/briefs/2026-11-13-coherent-suite-task1-fix1.md`, appended binding SPEC and the full independent F1–F7 review. The aggregate-entry clarification is durable at `0125ad91c808120f087e6f2ebeb6a37c1de8752d`; the minimal finalizePureBinding seam clarification is durable at `1db1028a1ad60c0c1336e20db96c05646acc701d`.
+
+The applicable resource declaration remains PROJECT AFW / REPOSITORY tokenizartinfo-ops/agent-friendly-web / ID1347578006 / Source branch feat/finite-native-cleanup-20261101 / GitHub API origin. Allowed mutations were temporary F7 and append-only SAME suite report, one newly authorized KEYLESS run, exact restoration, preservation readbacks and STOP. Actual Native/World/SDK/Miniflare execution, actual custody key, Cloudflare/runtime, OAuth/OTP, credentials/permissions, main, PR/merge, mail and Max were outside this unit.
+
+| Fix checkpoint | Commit | Tree / F7 |
+| --- | --- | --- |
+| Closed fix BASE | `38ddef2b431af0edbd5286622e4fa5398b845a17` | tree `9ad4552e0136adb5c11d567f1686d56d1b5e24cf`;3196 leaves; report prefix ffe57366 |
+| Inactive fix candidate | `18183bd24aa3cbacb74119e54ef28d6671bd45d5` | tree `c4b49299478ffcb6c76553789d45324398fcb66f`; F7 `d036c941c4f0a4dc8f23e7971feaa89402c4b13c` |
+| Single fix overlay | `a99aa733962e9733294a6ba8755f749e35f26d93` | tree `6192d33f27a95ea4545c90f4437a717f09b32cd4`; F7 `9a36ab33883099f8c9f40349821a7614336e5c86` |
+| Exact restoration | `0f80090e534fec781c2fbd37eda098c71e686f0a` | tree `9ad4552e0136adb5c11d567f1686d56d1b5e24cf`; exact original F7 and report prefix |
+
+Inactive F7: 293584 bytes / SHA256 `d3ae143c3bbd26b3143546306d52db99882aa4e689e67ef28d7ed7ec4520c444`. The complete candidate was remotely preserved, then fetched back and compared exactly. Root independently recomputed the four body hashes from this immutable candidate before the overlay.
+
+| Helper | Bytes | SHA256 |
+| --- | ---: | --- |
+| adapter | 42022 | `b273f0a7e1aae7f9036b02b358dcfae38e977c1826bd79f1e79bee1f244f71ef` |
+| controls | 35122 | `1a74b32453d6efa8443747a9462603cc8bcad5c1c847449c2002fad0b0a703bd` |
+| verifier | 13579 | `d2c800bca5dbe834c957a6d54eb663f809891717df7132cc8819d8821c49fe48` |
+| SAFEZIP | 13305 | `b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d` |
+
+The four helper bodies are exactly the same in inactive candidate and qualification overlay. The fixed four-heredoc Source bootstrap, complete workflow Git-blob binding, protected Source pins, Node22.23.4 and exclusive fixed runner files remain. Both actual KEYLESS bootstraps passed and emitted these exact hashes.
+
+Qualified ZIP3 remains exactly3380 bytes / SHA256 `4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8`. SAFEZIP remains exactly13305 bytes / SHA256 `b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d`. Neither generic body was edited. No R1 typed business oracle was reused.
+
+Complete scoped review references:
+
+- [Closed fix BASE through inactive fix candidate](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/38ddef2b431af0edbd5286622e4fa5398b845a17...18183bd24aa3cbacb74119e54ef28d6671bd45d5)
+- [Prior inactive candidate through fixed inactive candidate](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/deff87f240f4e33750b459168d54b80cd6d2d54c...18183bd24aa3cbacb74119e54ef28d6671bd45d5)
+- [Fixed full inactive F7](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/18183bd24aa3cbacb74119e54ef28d6671bd45d5/.github/workflows/afw-finite-budget-qualification.yml)
+- [Exact candidate-to-overlay diff](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/18183bd24aa3cbacb74119e54ef28d6671bd45d5...a99aa733962e9733294a6ba8755f749e35f26d93)
+- [Overlay-to-restoration diff](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/a99aa733962e9733294a6ba8755f749e35f26d93...0f80090e534fec781c2fbd37eda098c71e686f0a)
+- [Fix BASE through restoration, exact source equality](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/38ddef2b431af0edbd5286622e4fa5398b845a17...0f80090e534fec781c2fbd37eda098c71e686f0a)
+
+This append's own final commit/tree are identified by the final CAS/readback delivered to Root, rather than recursively embedded in the report content.
+
+## Finding-to-fix mapping and covering seams
+
+All seven Important findings were implemented and covered by this qualification. None was adjudicated away or parked. Their final disposition belongs to the original independent reviewer's scoped re-review.
+
+| Finding | Concrete source change | Executed covering evidence |
+| --- | --- | --- |
+| F1: mutation self-shadowing | Actual job headers are selected by anchored names; actual steps by unique fixed IDs. Every mutation requires exactly one target, proves the target changed and proves the surrounding Source bytes remained unchanged. Validator helper bodies and hashes cannot substitute for the behavioral target. | Actual B needs and attempt endpoint, actual environment/key step identities, readonly TAP count, B cases and every F8 upload property reject their targeted bad edits. |
+| F2: early pure receipt | New minimal shared finalizePureBinding invokes the unchanged original keyless World verification/profile selection/materialization closure, then exclusively writes the fixed receipt. All six actual pure_binding steps use it. Public projection also requires captured pure_binding success. | Real bindPure succeeds on inert input; rejecting inert original-stage closure produces zero writes; successful closure produces exactly one fixed exclusive0600 write. A leftover valid receipt with failed pure step projects pure=null, and observed Native after failed pure is rejected. |
+| F3: observation/peak/ownership | Original private coherent-proof adds only authenticated observedAt. B captures Date.now once with its successful final inventory, uses that observation for the sweep and stores it. Reopen recomputes peak from the authenticated inventory and exact observedAt, requires captured equality and projects the recomputed peak. Own start<=observation<=sealedAt and every observed peer end<=observation are checked. Actual ownership order is positive_producer,reduction_producer,R1,R2,R3. | Positive private proof accepted; contradictory captured peak2 against computed1 rejected; early/late observation, future peer endings, wrong ownership identities, altered protected clock deltas, overlap and graph inventory rejected. Native-only peak3/4 and tie ordering tested with inert job metadata. |
+| F4: final inventory/nonpass reconciliation | B retains its separate early seven-plus-optional-nonexecuting-receiver rule. Final verifySeven requires exact8 unique jobs with verify in_progress and seven legacy identities. Both Jobs call sites use current-run attempts/1/jobs. New shared reconcileSuite inspects every complete available direct needs assignment even when public proof is null and validates current by-ID metadata without private downloads. | Complete passed route accepted; absent/queued receiver and nonterminal legacy observations produce upstream unverified; terminal failed B produces not_all_seven_success. Nonpass fixture proves all7 available assignments were checked, including5 peers. Missing outputs are never fabricated. Source/run/head/ref/direct-output mismatches reject acceptance. |
+| F5: pair validity vs producer result | Once strict transport/schema is verified, status verified / reason none / strict proof is retained for valid nonpass or unverified upstream. accepted/upstream carry rejection. Receiver-control failure after trusted bootstrap returns the same closed <=4096B unavailable/invalid_evidence/absent record, retaining known SAFE ID/digest and no ZIP claims. | Real route+reconciliation on a valid failed controls pair returns verified/none/strict/acceptedfalse. A direct self-control failure exercises the actual guard, checks retained assignment, null ZIP claim, exact closed failure semantics and byte bound. Actual published passed pair returns acceptedtrue. |
+| F6: untested real decisions | Added adapter projectSuiteOutcome over exact six captured outcomes and validated receipts; actual B publisher calls it. Added verifier reconcileSuite; actual verify calls it with fixed IO. Real validators bind each of26 key steps to its exact job/step, check actual always guards/order/final truth tests, the complete original F8 action block and pure gate wiring. Fixed named subcase phase diagnostics localize failures without public schema changes. | Same publication/route/reconciliation seams exercised with native/aggregate/metadata/open/inner/skipped/cancelled outcomes, retained assignments, all actual26 key scopes, full F8 mutations, publication guard edits, final metadata and schema contradictions. 18 named subcases each logged start+passed. |
+| F7: operation cap/timeout drift | Fixed trusted operation enum: b-peer raw134283264/20000ms; generic-private raw136314880/30000ms; pure134283264/30000ms; SMALLSAFE131072/30000ms. Metadata GET timeout remains10000ms. assignedPrivate own/producer uses generic-private; B's5 peers and raw pure use b-peer. Shared checkedDownloadSize is used by the actual bounded stream collector. | Exact metadata cap accepted/cap+1 rejected for every domain; shared size accumulator accepts exact edge/rejects edge+1 without large allocation; inert streams exercise real reader; injected internal timeout capture proves20000 vs30000. Arbitrary operation rejected. |
+
+M1's elected improvement is implemented within F1/F6: fixed subcase IDs emit only family, ID, phase and false flags. No exception, raw value or private path is emitted. The six-ID public controls DTO remains unchanged.
+
+The fixed internal projection API is:
+
+```text
+projectSuiteOutcome({
+  outcomes:{pureBinding,native,aggregate,ownMetadata,ownOpen,ownValidation},
+  receipts:{pure,assignment,proof}
+}) -> existing exact SuiteResult
+```
+
+Each outcome is success|failure|skipped|cancelled|not_observed. Actual wrapper env bindings read only the six fixed GHA step IDs. Assignment is preserved even after metadata/open/inner failure. A failed pure step cannot confer verification from a leftover file; contradictory observed Native is rejected. Native-step failure remains distinct from the legacy native+aggregate composite used by the original private manifest.
+
+The split aggregate entry now uses scoped always()+!cancelled()+trusted bootstrap+native success, then checks every fixed peer collector/open prerequisite before any World import or aggregate read. A failed prerequisite yields an entered aggregate failure/evidence_unverified; skipped aggregate remains not_observed. It does not fabricate an outcome or call World on missing inputs.
+
+All actual entry points use fixed IO and fixed Source closures. Test capture IO/inert callbacks are internal control seams only; there is no CLI/env path, transport, cap, timeout or fixture override in the actual entry. The unchanged original business oracle remains the real World path; the shared helpers own orchestration, projection, custody and reconciliation decisions.
+
+## Preserved business pipeline and scope
+
+The six original Native/TAP command blocks were compared as complete Source strings and remain byte-for-byte exact. The full original F8 sealer-through-upload block is also exact:19458 bytes/SHA256 `8b239b4a5e7e4d5f424fef645a464e006c039a47763224902c4221bba2666231`; the protected World/F8 literal itself remains unchanged under its original blob pin. F8 controls now check the entire actual block and mutate the real upload action version/name/path/retention/error behavior.
+
+Original seven-job DAG, timeouts, six environments, protected tests/assertions/World, R120s/P-D300s, root30s/child5s, C0=I0+900000 and C1=C0+180000 remain unchanged. No A/positive dependency was added to B. Legacy B composite COMMAND_OK remains Native success AND aggregate success; public command still observes the full original Native+TAP step separately.
+
+All eight actual candidate jobs remain literally false; inactive candidate is manual/no-input/no-push. Existing actual key is confined to26 expected generic crypto steps, with zero job-level key bindings. Pure binding, World semantics, metadata/raw reads, installation, manifest/copy preparation, projection and verifier remain keyless. The original five-lineage/ten-graph/ownership/all-D/overlap/deadline business proof is not replaced with a typed case oracle.
+
+One new private-only observedAt field was authorized; no public timestamp or DTO field was added. The exact original/reopened private proof bytes, captured hash and authenticated reopen path bind that observation. No self-artifact ID is inserted into the private proof.
+
+Generic custody limits and protected modules are unchanged. The operation-specific reader restores the generic-private130MiB raw domain while preserving B's tighter original raw cap and20-second timeout. Pure per-JSON2097152, ZIP3 expanded134225920 and SMALLSAFE combined65536 remain separate.
+
+## Sole fix qualification and exact ten outcomes
+
+[Actions43399028588 / attempt1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43399028588)
+
+- Source `a99aa733962e9733294a6ba8755f749e35f26d93`.
+- Unique message `AFW COHERENT SUITE FIX1 KEYLESS QUALIFICATION 20261113090936Z`.
+- One self-path push on fixed Source branch, attempt1, eight disabled actual jobs plus two active KEYLESS jobs;7+2minute limits.
+- Completed **success**. Exactly10 jobs positively materialized and terminal: **8 skipped + 2 success**.
+- Source remained frozen at this overlay through completion and all10 terminal jobs.
+- No second fix-round run, rerun, cap increase, clock change or actual Native activation occurred.
+
+| Job | Job ID | Outcome |
+| --- | --- | --- |
+| contracts | 131796963528 | skipped |
+| positive_prepare | 131796964335 | skipped |
+| positive_consume | 131796964201 | skipped |
+| reduction_prepare | 131796964223 | skipped |
+| reduction_consume_a | 131796965152 | skipped |
+| readonly | 131796964343 | skipped |
+| reduction_consume_b | 131796965674 | skipped |
+| verify | 131796965512 | skipped |
+| keyless_controls | 131796961734 | success |
+| keyless_verify | 131797057958 | success |
+
+Actual covering commands were executed only on GitHub-hosted Ubuntu:
+
+```text
+# Both jobs: checkout exact Source; setup Node22.23.4.
+test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
+# Fixed git HEAD/tree/F7/pin reads and builtin hashing; fixed0600 program materialization.
+
+# keyless_controls7min:
+node "$RUNNER_TEMP/afw-suite-controls.mjs"
+# The shell captures its exit, validates exact pair and uploads controls SAFE,
+# then requires controls success + pair status passed + upload success.
+
+# Within fixed_case_counts, inspection only:
+bash -n                         # via spawnSync, each Source run body supplied on stdin
+node --input-type=module --check # inline module bodies on stdin, no imports executed
+node --check "$RUNNER_TEMP/afw-suite-adapter.mjs"
+node --check "$RUNNER_TEMP/afw-suite-controls.mjs"
+node --check "$RUNNER_TEMP/afw-suite-verifier.mjs"
+node --check "$RUNNER_TEMP/afw-suite-safe-zip.mjs"
+
+# Within metadata_custody_binding:
+node --input-type=module -e <fixed generic-custody inert fixture program>
+# Isolated subprocess only; fixed inert32-byte key; generic custody module/builtins;
+# real seal/open equality and corrupted-envelope rejection, captured exit0.
+
+# keyless_verify2min:
+node "$RUNNER_TEMP/afw-suite-verifier.mjs"
+# Unchanged14 ZIP controls +2 receiver seams, then real current SAFE route.
+```
+
+There was no npm/install or unrelated full project suite. This is the explicitly stated covering qualification, not original Native execution. Controls were amended first, then implementation and static self-review; the single authorized cloud run is the executed evidence. No pre-implementation RED or local Source execution is claimed.
+
+## Exact executed outputs, subcases and phases
+
+Wrapper controls: **6 expected / 6 completed / 6 passed / 0 failed**. First failure null. All six fixed inventory IDs passed.
+
+Named subcases: **18 started / 18 passed / 0 failed**,36 phase records; no open start. The table records actual paired phases:
+
+| Family | Fixed subcase ID | Observed phases |
+| --- | --- | --- |
+| dag_peer_inventory | b_inventory_optional_nonexecuting_receiver | start + passed |
+| dag_peer_inventory | actual_b_dependency_and_attempt_endpoint_targets | start + passed |
+| key_scope | all_twenty_six_exact_crypto_step_bindings | start + passed |
+| key_scope | inert_parent_environment_is_restored | start + passed |
+| fixed_case_counts | fixed_pins_native_tap_cases_and_complete_f8_action | start + passed |
+| fixed_case_counts | private_original_clocks_and_owned_case_identities | start + passed |
+| fixed_case_counts | all_rewritten_shell_and_node_bodies_compile_only | start + passed |
+| metadata_custody_binding | metadata_current_identity_and_complete_pure_binding | start + passed |
+| metadata_custody_binding | generic_aead_zip3_and_reopened_proof_bytes | start + passed |
+| metadata_custody_binding | operation_raw_cap_edges_and_b_twenty_second_timeout | start + passed |
+| incomplete_or_contradictory | pure_receipt_commits_after_original_stage_success_only | start + passed |
+| incomplete_or_contradictory | shared_projection_observed_failures_and_retained_assignment | start + passed |
+| incomplete_or_contradictory | actual_publication_guards_order_and_full_pure_gate | start + passed |
+| incomplete_or_contradictory | valid_failed_pair_and_receiver_self_control_failure_record | start + passed |
+| coherent_current_pair | same_full_suite_route_projection_and_final_reconciliation | start + passed |
+| coherent_current_pair | nonpass_reconciles_all_available_assignments | start + passed |
+| coherent_current_pair | final_current_metadata_source_run_and_direct_needs_edges | start + passed |
+| coherent_current_pair | closed_schema_flags_profiles_counts_and_extra_fields | start + passed |
+
+Runner compile-only inspection: **110 shell programs and63 Node programs** passed. Inspected bodies were not executed by those syntax commands. The wrapper helper and inert-control code itself did execute as authorized KEYLESS code. Original World/Native/SDK modules were never imported/executed; no Miniflare allocation or actual key binding occurred.
+
+Separate ZIP/receiver controls: **16 expected / 16 completed / 16 passed / 0 failed**. The injected receiver self-control failure above was a negative wrapper seam test, not an actual failure of these16 controls.
+
+Exact syntax output:
+
+```json
+{"marker":"AFW_COHERENT_SUITE_SYNTAX/1","shellPrograms":110,"nodePrograms":63,"inspectedBodiesExecuted":false,"NativeExecuted":false,"SDKImported":false,"MFAllocated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+Exact six-control output:
+
+```json
+{"marker":"AFW_COHERENT_SUITE_CONTROLS/1","status":"passed","expected":6,"completed":6,"passed":6,"failed":0,"inventory":[{"id":"dag_peer_inventory","status":"passed"},{"id":"key_scope","status":"passed"},{"id":"fixed_case_counts","status":"passed"},{"id":"metadata_custody_binding","status":"passed"},{"id":"incomplete_or_contradictory","status":"passed"},{"id":"coherent_current_pair","status":"passed"}],"firstFailure":null,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+Exact36 bounded subcase phase records:
+
+```jsonl
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"b_inventory_optional_nonexecuting_receiver","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"b_inventory_optional_nonexecuting_receiver","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"actual_b_dependency_and_attempt_endpoint_targets","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"actual_b_dependency_and_attempt_endpoint_targets","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"key_scope","id":"all_twenty_six_exact_crypto_step_bindings","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"key_scope","id":"all_twenty_six_exact_crypto_step_bindings","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"key_scope","id":"inert_parent_environment_is_restored","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"key_scope","id":"inert_parent_environment_is_restored","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"fixed_case_counts","id":"fixed_pins_native_tap_cases_and_complete_f8_action","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"fixed_case_counts","id":"fixed_pins_native_tap_cases_and_complete_f8_action","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"fixed_case_counts","id":"private_original_clocks_and_owned_case_identities","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"fixed_case_counts","id":"private_original_clocks_and_owned_case_identities","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"fixed_case_counts","id":"all_rewritten_shell_and_node_bodies_compile_only","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"fixed_case_counts","id":"all_rewritten_shell_and_node_bodies_compile_only","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"metadata_current_identity_and_complete_pure_binding","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"metadata_current_identity_and_complete_pure_binding","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"generic_aead_zip3_and_reopened_proof_bytes","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"generic_aead_zip3_and_reopened_proof_bytes","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"operation_raw_cap_edges_and_b_twenty_second_timeout","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"operation_raw_cap_edges_and_b_twenty_second_timeout","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"pure_receipt_commits_after_original_stage_success_only","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"pure_receipt_commits_after_original_stage_success_only","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"shared_projection_observed_failures_and_retained_assignment","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"shared_projection_observed_failures_and_retained_assignment","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"actual_publication_guards_order_and_full_pure_gate","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"actual_publication_guards_order_and_full_pure_gate","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"valid_failed_pair_and_receiver_self_control_failure_record","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"valid_failed_pair_and_receiver_self_control_failure_record","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"same_full_suite_route_projection_and_final_reconciliation","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"same_full_suite_route_projection_and_final_reconciliation","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"nonpass_reconciles_all_available_assignments","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"nonpass_reconciles_all_available_assignments","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"final_current_metadata_source_run_and_direct_needs_edges","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"final_current_metadata_source_run_and_direct_needs_edges","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"closed_schema_flags_profiles_counts_and_extra_fields","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"closed_schema_flags_profiles_counts_and_extra_fields","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+Exact ZIP output:
+
+```json
+{"marker":"AFW_COHERENT_SUITE_ZIP_CONTROLS/1","expected":16,"completed":16,"passed":16,"failed":0,"inventory":[{"id":"zip_valid_store_crc_vector","status":"passed"},{"id":"zip_valid_deflate","status":"passed"},{"id":"zip_signed_unsigned_descriptors","status":"passed"},{"id":"zip_wrong_size","status":"passed"},{"id":"zip_wrong_upload_sha","status":"passed"},{"id":"zip_wrong_metadata_sha","status":"passed"},{"id":"zip_extra_entry","status":"passed"},{"id":"zip_duplicate_entry","status":"passed"},{"id":"zip_traversal_entry","status":"passed"},{"id":"zip_symlink","status":"passed"},{"id":"zip_bad_crc","status":"passed"},{"id":"zip_noncontiguous_ranges","status":"passed"},{"id":"zip_declared_and_inflate_caps","status":"passed"},{"id":"download_stream_redirect_auth_bounds","status":"passed"},{"id":"receiver_capture_current_pair","status":"passed"},{"id":"receiver_rejection_no_zip_claim","status":"passed"}],"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+## Current approved controls SAFE and readback
+
+Only one artifact was published by this fix run; no readback artifact was added. The current SAFE contains exactly result.json and manifest.json.
+
+| Field | Observed value |
+| --- | --- |
+| Name | afw-coherent-suite-controls-safe-43399028588-1 |
+| Assigned ID | `14023878021` |
+| Uploaded/API/raw SHA256 | `27f8b22869723dbad9beb1af1a8bf17e91888eefdc150dc0a4ae14c32166ea98` |
+| ZIP bytes | 1389 |
+| Result bytes/SHA256 |1666 / `576af34d977c1c212a97037ba298639c72e100b06491e90a533172627416cce9` |
+| Manifest bytes/SHA256 |265 / `3fae2059958d8147e50937734434024226af0e29e61c8f49972a899e574332fc` |
+| Expiry |2026-11-20T09:10:10Z |
+| Producer status |passed |
+| Pair status/reason/proof |verified / none / strict_current_safe_pair |
+| Accepted/upstream |true / not_applicable |
+
+Root independently downloaded and strictly checked the current ZIP/CRC/digest/canonical JSON/full manifest/context/four program hashes and closed6/6 DTO. Root also independently checked producer job success, exact10 terminal outcomes, the36 paired subcase phases, syntax110/63, ZIP16 and the current readback record.
+
+Exact emitted <=4096B readback:
+
+```json
+{"marker":"AFW_COHERENT_SUITE_READBACK/1","kind":"controls","source":"a99aa733962e9733294a6ba8755f749e35f26d93","run":"43399028588","attempt":1,"artifactId":"14023878021","uploadedDigest":"27f8b22869723dbad9beb1af1a8bf17e91888eefdc150dc0a4ae14c32166ea98","status":"verified","reason":"none","proof":"strict_current_safe_pair","metadataBytes":1389,"metadataDigest":"sha256:27f8b22869723dbad9beb1af1a8bf17e91888eefdc150dc0a4ae14c32166ea98","rawZipBytes":1389,"rawZipSha256":"27f8b22869723dbad9beb1af1a8bf17e91888eefdc150dc0a4ae14c32166ea98","resultBytes":1666,"resultSha256":"576af34d977c1c212a97037ba298639c72e100b06491e90a533172627416cce9","manifestBytes":265,"manifestSha256":"3fae2059958d8147e50937734434024226af0e29e61c8f49972a899e574332fc","expiresAt":"2026-11-20T09:10:10Z","producerStatus":"passed","upstream":"not_applicable","accepted":true,"programHashes":{"adapter":"b273f0a7e1aae7f9036b02b358dcfae38e977c1826bd79f1e79bee1f244f71ef","controls":"1a74b32453d6efa8443747a9462603cc8bcad5c1c847449c2002fad0b0a703bd","verifier":"d2c800bca5dbe834c957a6d54eb663f809891717df7132cc8819d8821c49fe48","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"},"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+Only current approved SAFE metadata and bounded KEYLESS records were returned. No actual private artifact, private proof/model/cipher/plaintext, producer logs, actual key or owner data were fetched or exposed. Inert generic custody fixtures stayed runner-only.
+
+## Restoration, append preservation and next gate
+
+Before rollback, completed success and exact10 terminal jobs were positively read. All five Source-branch active status inventories (queued/in_progress/waiting/pending/requested) were0; the frozen tip was still a99aa733. Original F7 was reread from immutable fix BASE and matched its original blob and body before mutation.
+
+Exact restoration commit `0f80090e534fec781c2fbd37eda098c71e686f0a` points to closed fix BASE tree `9ad4552e0136adb5c11d567f1686d56d1b5e24cf`. F7 was independently fetched back as exact `f7a71f1a0fa4f5ddf069ff411f008a098455e5cc`,126209 bytes/SHA256 `1e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a`, original manual/no-input/no-push/seven false&& guards. The pre-fix report was also read back as exact ffe57366 /24731-character prefix before this append.
+
+The overlay recursive tree was positively read with truncated:false,3196 leaves, unchanged report prefix and no changes to any of the original3195 leaves except temporary F7. Restoration restores that last leaf exactly. This append changes only the existing suite report leaf, retaining its complete prefix; final target remains3196 leaves. All original3195 BASE leaves/type/mode/blob, all62 workflows and protected R1 report remain exact. Main remains `0c9c475b3ebaa970fc11d628b40e50a90cceb727`. The final report CAS is followed by full current tree/ref/F7/report-prefix/main/62WF/five-active readbacks, delivered compactly to Root. No force or unknown mutation was retried.
+
+Fresh scoped re-review by the original task reviewer is the next gate. The covering run passed, but this writer does not adjudicate F1–F7 closed or release Task2. No actual eight-job run follows automatically. Original Native business cases executed in this unit: **0**. Planned original suite remains Q8+Native8=16 total, distinct from6 wrapper families,18 subcases and16 ZIP controls.
+
+All five flags remain exactly false:
+
+```json
+{"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+**STOP after exact restoration, this prefix-preserving append and final readbacks. Actual Task2 HELD; no auto-retry.**
```
