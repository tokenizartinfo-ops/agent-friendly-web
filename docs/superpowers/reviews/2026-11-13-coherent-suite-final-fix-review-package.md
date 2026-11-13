# ONE final fix-wave — complete scoped re-review package

FixBASEe88ce70b8edd3bdc7bcda062b115578b3d26f1a1→HEAD08f5d5f203efef09999ea2f6f0e899637af0bdf4. Oneconsolidatedwave forFF-I1/FF-I2/FF-M1, onecoveringKEYLESS43425740095/1, noNative. Sourceexactclosed; actual43414661211remainsFAILED/unqualified. No furtherfixwave orNative actionreleased.

## Full four-commit list / netstat

```json
{
  "base": "e88ce70b8edd3bdc7bcda062b115578b3d26f1a1",
  "head": "08f5d5f203efef09999ea2f6f0e899637af0bdf4",
  "commits": [
    {
      "sha": "b5646538bb9f2d119e8943896990ac657d7bd518",
      "parents": [
        "e88ce70b8edd3bdc7bcda062b115578b3d26f1a1"
      ],
      "message": "Prepare final whole-plan helper fixes for aggregate receipt secret scope and needs capture"
    },
    {
      "sha": "4f382419ad483ae3cc214e1a49d1d09d4b5db947",
      "parents": [
        "b5646538bb9f2d119e8943896990ac657d7bd518"
      ],
      "message": "AFW COHERENT SUITE FINAL WAVE KEYLESS QUALIFICATION 20261113122954Z"
    },
    {
      "sha": "55b16c841b7212fc962273ce8dcdd74ded4170a0",
      "parents": [
        "4f382419ad483ae3cc214e1a49d1d09d4b5db947"
      ],
      "message": "Restore exact closed F7 after the sole final whole-plan KEYLESS fix qualification"
    },
    {
      "sha": "08f5d5f203efef09999ea2f6f0e899637af0bdf4",
      "parents": [
        "55b16c841b7212fc962273ce8dcdd74ded4170a0"
      ],
      "message": "Append final whole-plan fix wave corrections qualification and exact closure evidence"
    }
  ],
  "stat": [
    {
      "path": "docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md",
      "status": "modified",
      "additions": 317,
      "deletions": 0
    }
  ]
}
```

## Complete SCOPED helper implementation diff priorqualified23bda→newinactiveb564

Oldbodybytesbyteexactactualb849/template23bda; newb564bodybytesbyteexactcovering4f382. EntirepipelineoutsideFOURbodiesbyteexactbefore/after. Thiscomplete10hunk/173add/24deletediff includesallfixcodeandcontrols, notjustreport. RootindependentlyapplieddiffandroundtrippednewF7exact.

```diff
diff --git a/.github/workflows/afw-finite-budget-qualification.yml b/.github/workflows/afw-finite-budget-qualification.yml
--- a/.github/workflows/afw-finite-budget-qualification.yml
+++ b/.github/workflows/afw-finite-budget-qualification.yml
@@ -138,47 +138,84 @@
            const b=jobBlocks(text),deps={contracts:null,positive_prepare:['contracts'],positive_consume:['contracts','positive_prepare'],reduction_prepare:['contracts'],reduction_consume_a:['contracts','reduction_prepare'],readonly:['contracts'],reduction_consume_b:['contracts','readonly','reduction_prepare'],verify:LEGACY};
            for(const [name,expected]of Object.entries(deps)){
             need(typeof b[name]==='string');const dep=b[name].match(/^    needs: \[([^\]]*)\]$/m);
             same(dep?dep[1].split(',').map(x=>x.trim()):null,expected);
             same(Number(b[name].match(/^    timeout-minutes: (\d+)$/m)?.[1]),name==='contracts'||name==='verify'?2:name==='readonly'?7:15);
            }
            const peer=fixedStep(b.reduction_consume_b,'peer_download').text;
            need(peer.includes("'/actions/runs/'+e.GITHUB_RUN_ID+'/attempts/1/jobs?per_page=100'"));
            return true;
           }
+          function inspectStructuralYaml(text){
+           let scalarIndent=null;
+           for(const line of text.split('\n')){
+            const indent=line.match(/^ */)[0].length,blank=line.trim()==='';
+            if(scalarIndent!==null){
+             if(blank||indent>scalarIndent)continue;
+             scalarIndent=null;
+            }
+            if(blank||line.trimStart().startsWith('#'))continue;
+            need(!line.includes('\t'));
+            need(!/[&*][A-Za-z_]/.test(line)&&!/^ *<<\s*:/.test(line));
+            if(/:\s*[|>][+-]?\s*(?:#.*)?$/.test(line))scalarIndent=indent;
+           }
+          }
+          function fixedStepEnvironment(step){
+           const headers=[...step.text.matchAll(/^        env:([^\n]*)\n/gm)];same(headers.length,1);same(headers[0][1],'');
+           const start=headers[0].index+headers[0][0].length,entries=new Map();let offset=start;
+           for(const line of step.text.slice(start).split('\n')){
+            if(line===''){offset++;continue;}
+            if(!line.startsWith('          '))break;
+            const match=/^          ([A-Z_][A-Z0-9_]*): (.+)$/.exec(line);need(match&&!entries.has(match[1]));
+            entries.set(match[1],{value:match[2],valueStart:offset+10+match[1].length+2});offset+=line.length+1;
+           }
+           return entries;
+          }
           export function validateKeyScopes(text){
-           const blocks=jobBlocks(text),expected=new Map();
+           inspectStructuralYaml(text);
+           const blocks=jobBlocks(text),expected=new Set(),open='$'+'{{',close='}'+'}',context=['se','crets'].join(''),body=' '+context+'.AFW_SYN_CHECKPOINT_KEY ',canonical=open+body+close;
            for(const job of LEGACY.slice(1)){
-            for(const id of ['custody','seal','own_open'])expected.set(job+':'+id,true);
-            if(['positive_consume','reduction_consume_a','reduction_consume_b'].includes(job))expected.set(job+':producer_open',true);
+            for(const id of ['custody','seal','own_open'])expected.add(job+':'+id);
+            if(['positive_consume','reduction_consume_a','reduction_consume_b'].includes(job))expected.add(job+':producer_open');
            }
-           for(const {job}of PRIVATE_PEERS)expected.set('reduction_consume_b:peer_open_'+job,true);
+           for(const {job}of PRIVATE_PEERS)expected.add('reduction_consume_b:peer_open_'+job);
            same(expected.size,26);
-           const seen=new Set(),environments=[];
+           const root=[...text.matchAll(/^jobs:\n/gm)];same(root.length,1);
+           const sectionStart=root[0].index+root[0][0].length,positions=new Map([...text.slice(sectionStart).matchAll(/^  ([a-z_]+):\n/gm)].map(match=>[match[1],sectionStart+match.index]));
+           const seen=new Set(),approved=new Map(),environments=[];
            for(const [job,block]of Object.entries(blocks)){
-            need([...LEGACY,'verify','keyless_controls','keyless_verify'].includes(job));
+            need([...LEGACY,'verify','keyless_controls','keyless_verify'].includes(job));same(text.slice(positions.get(job),positions.get(job)+block.length),block);
             const first=block.indexOf('      - '),header=block.slice(0,first<0?block.length:first);
             need(!/^\s+AFW_SYN_CHECKPOINT_KEY:/m.test(header));
-            const association=header.match(/^    environment: (.+)$/m);
-            if(association)environments.push([job,association[1]]);
+            const association=header.match(/^    environment: (.+)$/m);if(association)environments.push([job,association[1]]);
             for(const step of jobSteps(block)){
              const keyLines=[...step.text.matchAll(/^(\s+)AFW_SYN_CHECKPOINT_KEY: (.+)$/gm)];
              if(keyLines.length===0)continue;
-             same(keyLines.length,1);same(keyLines[0][1].length,10);same(keyLines[0][2],'$'+'{{ secrets.AFW_SYN_CHECKPOINT_KEY }}');
+             same(keyLines.length,1);same(keyLines[0][1].length,10);same(keyLines[0][2],canonical);
              const identity=job+':'+step.id;need(expected.has(identity)&&!seen.has(identity));seen.add(identity);
              need(step.text.startsWith('      - name: Generic custody '));
-             need(!/\b(?:fetch|npm|copyFile|execFileSync|World|finite-budget-world|cp\(|node --test|GITHUB_TOKEN|GH_ARTIFACT_TOKEN)\b/.test(step.text));
-             need(step.text.includes('finite-checkpoint-custody.mjs'));
-            }
-           }
-           same(environments,LEGACY.slice(1).map(job=>[job,'afw-finite-syn-checkpoint']));
-           same([...seen].sort(),[...expected.keys()].sort());return true;
+             need(!/\b(?:fetch|npm|copyFile|execFileSync|World|finite-budget-world|cp\(|node --test|GITHUB_TOKEN|GH_ARTIFACT_TOKEN)\b/.test(step.text));need(step.text.includes('finite-checkpoint-custody.mjs'));
+             const entry=fixedStepEnvironment(step).get('AFW_SYN_CHECKPOINT_KEY');need(entry);same(entry.value,canonical);
+             const position=positions.get(job)+step.start+entry.valueStart;need(!approved.has(position));approved.set(position,{identity,end:position+canonical.length});
+            }
+           }
+           same(environments,LEGACY.slice(1).map(job=>[job,'afw-finite-syn-checkpoint']));same([...seen].sort(),[...expected].sort());same(approved.size,26);
+           let cursor=0,secretReferences=0;const matched=new Set();
+           for(;;){
+            const start=text.indexOf(open,cursor);if(start<0)break;
+            const end=text.indexOf(close,start+open.length);need(end>=0);const expression=text.slice(start+open.length,end);need(!expression.includes(open));
+            if(/secrets/i.test(expression)){
+             same(expression,body);const slot=approved.get(start);need(slot&&!matched.has(start));same(slot.end,end+close.length);matched.add(start);secretReferences++;
+            }
+            cursor=end+close.length;
+           }
+           same(secretReferences,26);same(matched.size,approved.size);return true;
           }
           const NATIVE_HASHES={positive_prepare:'a5fb9018a15148200d9f974d88fceddd7b969dd1da34aec5d1d177e627a4bb1f',positive_consume:'04372215e782289cf9f9369deb3e41b692c78c7ba69db390170edee7eeb5f1b5',reduction_prepare:'0884130dfd71b58991ab0a5810d45ceb86140ba1037eb3e69a61199bc813f3f5',reduction_consume_a:'cafaa1cfe677ea408c3bd0430d87aefbac615ec55ceb621f85f1b161d3354fe4',readonly:'b5fa881c10523d636b77a787b7e92bcc14bc64e13d658bd34476f00e1d4e9f0c',reduction_consume_b:'c0566bba404f2a61b8d22f0b80272e2b1322f4799ef14f248e28736511a1d378'};
           export function validateFixedCases(text){
            const blocks=jobBlocks(text);
            for(const [job,h]of Object.entries(NATIVE_HASHES)){
             const match=blocks[job].match(/      - name: Execute fixed [^\n]+\n[\s\S]*?(?=\n      - name:)/);need(match);same(sha(match[0]),h);
            }
            for(const [job,cases]of Object.entries({positive_prepare:['P1'],positive_consume:['P1'],reduction_prepare:['D1','D2','D3','D4'],reduction_consume_a:['D1','D2'],readonly:['R1','R2','R3'],reduction_consume_b:['D3','D4']}))same(blocks[job].match(/^      FIXED_CASES: '([^']+)'$/m)?.[1],JSON.stringify(cases));
            const seal=fixedStep(blocks.contracts,'pure_seal'),upload=fixedStep(blocks.contracts,'upload');need(seal.start<upload.start);const full=seal.text+upload.text;same(Buffer.byteLength(full),19458);same(sha(full),'8b239b4a5e7e4d5f424fef645a464e006c039a47763224902c4221bba2666231');return true;
           }
@@ -281,21 +318,21 @@
           }
           export function validateControls(v,expected={context:CONTEXT,sourcePins:PINS,programHashes:PROGRAM_HASHES}){
            fields(v,['purpose','context','sourcePins','programHashes','status','expected','completed','passed','failed','inventory','firstFailure','realCustodyKeyBound','NativeExecuted','SDKImported','MFAllocated',...Object.keys(FLAGS)]);common(v,expected);same(v.purpose,'afw.coherent-suite.controls.safe.v1');same(v.expected,6);same(v.inventory.map(x=>x.id),IDS);for(const x of v.inventory){fields(x,['id','status']);need(['passed','failed','not_executed'].includes(x.status));}for(const k of ['realCustodyKeyBound','NativeExecuted','SDKImported','MFAllocated'])same(v[k],false);const first=v.inventory.findIndex(x=>x.status!=='passed');if(first===-1){same([v.status,v.completed,v.passed,v.failed,v.firstFailure],['passed',6,6,0,null]);}else {same(v.inventory[first].status,'failed');same(v.inventory.slice(first+1).map(x=>x.status),Array(5-first).fill('not_executed'));same([v.status,v.completed,v.passed,v.failed,v.firstFailure],['failed',first+1,first,1,IDS[first]]);}return v;
           }
           export function makeManifest(kind,resultBytes,context){need(kind==='suite'||kind==='controls');return {purpose:kind==='suite'?'afw.coherent-suite-manifest.safe.v1':'afw.coherent-suite.controls-manifest.safe.v1',source:context.source,run:context.run,attempt:1,files:[{path:'result.json',bytes:resultBytes.length,sha256:sha(resultBytes)}]};}
           export async function publishPair(kind,result){
            requireKeyless();(kind==='suite'?validateSuite:validateControls)(result);const bytes=canonical(result),manifest=canonical(makeManifest(kind,bytes,result.context));need(bytes.length+manifest.length<=65536);const files=new Map([['result.json',bytes],['manifest.json',manifest]]),root=join(process.env.RUNNER_TEMP,kind==='suite'?'afw-suite-safe':'afw-suite-controls-safe');await mkdir(root,{mode:0o700,recursive:true});same((await readdir(root)).filter(x=>!['manifest.json','result.json'].includes(x)),[]);for(const [n,b]of files)await writeFile(join(root,n),b,{mode:0o600});same((await readdir(root)).sort(),['manifest.json','result.json']);return files;
           }
           
           export function validatePrivateReceiptCaps(files,kind){
-           const r=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(files.get('receipt.json'))),partial=['producer-failure','consumer-failure'].includes(kind);need(Number.isSafeInteger(r.fileCount)&&r.fileCount>=(partial?0:1)&&r.fileCount<=(partial?4096:512));need(Number.isSafeInteger(r.totalBytes)&&r.totalBytes>=0&&r.totalBytes<=(partial?512:128)*1048576);return r;
+           const r=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(files.get('receipt.json'))),partial=['producer-failure','consumer-failure'].includes(kind);need(Number.isSafeInteger(r.fileCount)&&r.fileCount>=(partial?0:1)&&r.fileCount<=4096);need(Number.isSafeInteger(r.totalBytes)&&r.totalBytes>=0&&r.totalBytes<=512*1048576);return r;
           }
           
           function validatePureReceipt(receipt){
            fields(receipt,['artifactId','zipSha256','manifestSha256','profiles','purePassed','beforeI0']);canonicalId(receipt.artifactId);hex(receipt.zipSha256);hex(receipt.manifestSha256);same(receipt.profiles,['positive','readonly','reduction_a']);same(receipt.purePassed,true);same(receipt.beforeI0,true);return receipt;
           }
           const fixedReceiptIO={write:(path,bytes,options)=>writeFile(path,bytes,options)};
           export async function finalizePureBinding(receipt,originalWork,io=fixedReceiptIO){
            requireKeyless();validatePureReceipt(receipt);need(typeof originalWork==='function');await originalWork();validatePureReceipt(receipt);
            await io.write(join(process.env.RUNNER_TEMP,'afw-native-private/pure-assignment.json'),JSON.stringify(receipt)+'\n',{flag:'wx',mode:0o600});return receipt;
           }
@@ -350,21 +387,21 @@
            if(outcomes.pureBinding==='success')pure=parseProjectionReceipt(await io.read(join(process.env.RUNNER_TEMP,'afw-native-private/pure-assignment.json')));
            if(outcomes.ownValidation==='success'&&assignment?.kind==='reduction-result-b'&&outcomes.native==='success'&&outcomes.aggregate==='success')proof=parseProjectionReceipt(await io.read(join(process.env.RUNNER_TEMP,'afw-native-private/suite-proof.json')));
            return {pure,assignment,proof};
           }
           NODE_SUITE_ADAPTER
           cat >"$RUNNER_TEMP/afw-suite-controls.mjs" <<'NODE_SUITE_CONTROLS'
           import assert from 'node:assert/strict';
           import {readFile,mkdir,readdir} from 'node:fs/promises';
           import {spawnSync} from 'node:child_process';
           import * as A from './afw-suite-adapter.mjs';
-          import {validatePair,verifyRoute,verifySeven,reconcileSuite,receiverControlsGuard} from './afw-suite-verifier.mjs';
+          import {validatePair,verifyRoute,verifySeven,reconcileSuite,receiverControlsGuard,captureNeeds,routeCapturedNeeds} from './afw-suite-verifier.mjs';
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
@@ -387,21 +424,21 @@
            for(let n=0;n<rows.length;n++){if(rows[n]!=='        run: |')continue;const lines=[];while(n+1<rows.length&&(rows[n+1].startsWith('          ')||rows[n+1]==='')){const next=rows[++n];lines.push(next===''?'':next.slice(10));}const script=lines.join('\n')+'\n',shell=spawnSync('bash',['-n'],{input:script,encoding:'utf8',maxBuffer:4096,timeout:10000});assert.equal(shell.status,0,'shell_wrapper_syntax');shellPrograms++;
             const re=/^(?:[A-Z_0-9]+=\S+ )?node --input-type=module <<'([A-Z_0-9]+)'[^\n]*\n/gm;let match;while((match=re.exec(script))){const start=re.lastIndex,end=script.indexOf('\n'+match[1]+'\n',start);assert(end>=start);const body=script.slice(start,end)+'\n',parsed=spawnSync(process.execPath,['--input-type=module','--check'],{input:body,encoding:'utf8',maxBuffer:4096,timeout:10000});assert.equal(parsed.status,0,'inline_module_syntax');nodePrograms++;re.lastIndex=end+match[1].length+2;}
            }
            for(const name of ['adapter','controls','verifier','safe-zip']){const parsed=spawnSync(process.execPath,['--check',process.env.RUNNER_TEMP+'/afw-suite-'+name+'.mjs'],{encoding:'utf8',maxBuffer:4096,timeout:10000});assert.equal(parsed.status,0,'helper_module_syntax');nodePrograms++;}
            assert(shellPrograms>30&&nodePrograms>20);console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SYNTAX/1',shellPrograms,nodePrograms,inspectedBodiesExecuted:false,NativeExecuted:false,SDKImported:false,MFAllocated:false,...A.FLAGS}));
           }
           async function cryptoControl(){
            assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
            const script="import assert from 'node:assert/strict';import {mkdir,writeFile,readFile} from 'node:fs/promises';import {sealDirectory,openDirectory} from '__MODULE__';const base=process.env.RUNNER_TEMP+'/afw-suite-inert-crypto',context={purpose:'afw.finite-checkpoint-custody.syn.v1',repository:process.env.GITHUB_REPOSITORY,ref:process.env.GITHUB_REF,sourceSha:process.env.GITHUB_SHA,runId:process.env.GITHUB_RUN_ID,runAttempt:1,kind:'reduction-result-b'};await mkdir(base,{mode:0o700});await mkdir(base+'/input',{mode:0o700});const bytes=Buffer.from('{\"inert\":true}\\n');await writeFile(base+'/input/proof.json',bytes);await sealDirectory({sourceDir:base+'/input',stagingDir:base+'/sealed',context});await openDirectory({stagingDir:base+'/sealed',destinationDir:base+'/opened',context});assert(bytes.equals(await readFile(base+'/opened/proof.json')));const b=await readFile(base+'/sealed/envelope.bin');b[b.length-1]^=1;await writeFile(base+'/sealed/envelope.bin',b);await assert.rejects(()=>openDirectory({stagingDir:base+'/sealed',destinationDir:base+'/bad',context}));";
            const moduleURL=new URL('file://'+process.cwd()+'/test/fixtures/finite-checkpoint-custody.mjs').href,result=spawnSync(process.execPath,['--input-type=module','-e',script.replace('__MODULE__',moduleURL)],{env:{PATH:process.env.PATH,RUNNER_TEMP:process.env.RUNNER_TEMP,GITHUB_REPOSITORY:A.CONTEXT.repository,GITHUB_REF:A.CONTEXT.ref,GITHUB_SHA:A.CONTEXT.source,GITHUB_RUN_ID:A.CONTEXT.run,GITHUB_RUN_ATTEMPT:'1',AFW_SYN_CHECKPOINT_KEY:'11'.repeat(32)},stdio:'pipe',timeout:30000,maxBuffer:4096});
-           assert.equal(result.status,0,'isolated_generic_crypto_control');const entries=new Map();for(const n of ['envelope.bin','manifest.json','receipt.json'])entries.set(n,await readFile(process.env.RUNNER_TEMP+'/afw-suite-inert-crypto/sealed/'+n));const raw=fixtureZip(entries),opened=A.decodePrivateZip(raw);assert.equal(opened.size,3);for(const [n,b]of entries)assert(b.equals(opened.get(n)));A.validatePrivateReceiptCaps(opened,'reduction-result-b');const corrupt=Buffer.from(raw);corrupt[30+Buffer.byteLength('envelope.bin')]^=1;reject(()=>A.decodePrivateZip(corrupt));reject(()=>A.validatePrivateReceiptCaps(new Map([['receipt.json',Buffer.from(JSON.stringify({fileCount:513,totalBytes:1}))]]),'reduction-result-b'));A.validatePrivateReceiptCaps(new Map([['receipt.json',Buffer.from(JSON.stringify({fileCount:0,totalBytes:0}))]]),'consumer-failure');assert.equal(result.error,undefined);assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
+           assert.equal(result.status,0,'isolated_generic_crypto_control');const entries=new Map();for(const n of ['envelope.bin','manifest.json','receipt.json'])entries.set(n,await readFile(process.env.RUNNER_TEMP+'/afw-suite-inert-crypto/sealed/'+n));const raw=fixtureZip(entries),opened=A.decodePrivateZip(raw);assert.equal(opened.size,3);for(const [n,b]of entries)assert(b.equals(opened.get(n)));A.validatePrivateReceiptCaps(opened,'reduction-result-b');const corrupt=Buffer.from(raw);corrupt[30+Buffer.byteLength('envelope.bin')]^=1;reject(()=>A.decodePrivateZip(corrupt));reject(()=>A.validatePrivateReceiptCaps(new Map([['receipt.json',Buffer.from(JSON.stringify({fileCount:4097,totalBytes:1}))]]),'reduction-result-b'));A.validatePrivateReceiptCaps(new Map([['receipt.json',Buffer.from(JSON.stringify({fileCount:0,totalBytes:0}))]]),'consumer-failure');assert.equal(result.error,undefined);assert.equal(process.env.AFW_SYN_CHECKPOINT_KEY,undefined);
           }
           
           function actualRegion(text,job,stepId=null){
            const re=new RegExp('^  '+job+':\\n','gm'),matches=[...text.matchAll(re)];assert.equal(matches.length,1);
            const begin=matches[0].index,next=/^  [a-z_]+:\n/gm;next.lastIndex=begin+matches[0][0].length;const end=next.exec(text)?.index??text.length;
            if(stepId===null)return {start:begin,end,text:text.slice(begin,end)};
            const block=text.slice(begin,end),parts=[...block.matchAll(/^      - /gm)],found=[];
            for(let n=0;n<parts.length;n++){const start=parts[n].index,finish=parts[n+1]?.index??block.length,s=block.slice(start,finish);if(new RegExp('^        id: '+stepId+'$','m').test(s))found.push({start:begin+start,end:begin+finish,text:s});}
            assert.equal(found.length,1);return found[0];
           }
@@ -457,20 +494,62 @@
            };
            const args={...fixture.args,id,uploaded},route=await verifyRoute(args,io);
            assert.equal(route.valid,null);assert.equal(route.readback.status,'unavailable');assert.equal(route.readback.reason,reason);assert.equal(route.readback.proof,'absent');assert.equal(route.readback.artifactId,artifactId);
            assert.equal(counts.safeMetadata,metadataStatus===null?0:1);assert.equal(counts.safeZip,0);assert.equal(counts.jobs,0);assert.deepEqual(counts.direct,[]);
            const reconciled=await reconcileSuite({route,jobInventory:null,needs:fixture.needs},io);
            assert.equal(reconciled.valid,null);assert.deepEqual(reconciled.readback,{...route.readback,upstream:'all_seven_success',accepted:false});
            assert.equal(counts.jobs,1);assert.equal(counts.safeMetadata,metadataStatus===null?0:1);assert.equal(counts.safeZip,0);
            assert.deepEqual(counts.direct.sort(),A.LEGACY.map(name=>fixture.needs[name].outputs['artifact-id']).sort());
            for(const key of ['rawZipBytes','rawZipSha256','resultBytes','resultSha256','manifestBytes','manifestSha256'])assert.equal(reconciled.readback[key],null);
           }
+          function secretFixture(style='canonical'){
+           const open='$'+'{{',close='}'+'}',context=['se','crets'].join(''),key='AFW_SYN_CHECKPOINT_KEY';
+           let body=context+'.'+key;
+           if(style==='bracket')body=context+"['"+key+"']";
+           if(style==='dynamic')body=context+'[env.KEY_NAME]';
+           if(style==='case')body=context.toUpperCase()+'.'+key;
+           if(style==='object')body='toJSON('+context+')';
+           return open+' '+body+' '+close;
+          }
+          function mutatePreamble(text,from,to){
+           const boundaries=[...text.matchAll(/^jobs:\n/gm)];assert.equal(boundaries.length,1);
+           const end=boundaries[0].index,original=text.slice(0,end),suffix=text.slice(end);
+           assert.equal(original.split(from).length-1,1);assert.notEqual(from,to);
+           const changed=original.replace(from,()=>to),result=changed+suffix;
+           assert.notEqual(changed,original);assert.equal(result.slice(changed.length),suffix);assert.equal(result.slice(0,changed.length),changed);return result;
+          }
+          function expectTextRejected(changed,validator){
+           assert.equal(typeof validator,'function');let invocations=0;
+           const invoke=value=>{invocations++;return validator(value);};
+           assert.throws(()=>invoke(changed));assert.equal(invocations,1);
+          }
+          function needsFixture(kind,outputs={},result='success'){
+           if(kind==='controls')return {keyless_controls:{result,outputs}};
+           const needs=completeNeeds();needs.reduction_consume_b={result,outputs};return needs;
+          }
+          async function captureRouteFixture(kind,raw,expected){
+           const counts={metadata:0,zip:0,source:0,jobs:0};
+           const io={
+            metadata:async()=>{counts.metadata++;if(expected.httpStatus)return {status:expected.httpStatus,value:null};throw Error('unexpected_artifact_metadata');},
+            zip:async()=>{counts.zip++;throw Error('unexpected_artifact_zip');},
+            source:async()=>{counts.source++;throw Error('unexpected_source_request');},
+            jobs:async()=>{counts.jobs++;throw Error('unexpected_job_request');}
+           };
+           const captured=captureNeeds({kind,raw}),route=await routeCapturedNeeds(captured,io);
+           assert.equal(captured.valid,expected.contextValid);assert.equal(route.valid,null);
+           assert.equal(route.readback.marker,'AFW_COHERENT_SUITE_READBACK/1');assert.equal(route.readback.status,'unavailable');assert.equal(route.readback.reason,expected.reason);assert.equal(route.readback.proof,'absent');assert.equal(route.readback.accepted,false);
+           assert.equal(route.readback.upstream,kind==='controls'?'not_applicable':'unverified');
+           assert.equal(route.readback.artifactId,expected.id??null);assert.equal(route.readback.uploadedDigest,expected.digest??null);
+           assert.deepEqual(counts,{metadata:expected.httpStatus?1:0,zip:0,source:0,jobs:0});
+           for(const key of ['metadataBytes','metadataDigest','rawZipBytes','rawZipSha256','resultBytes','resultSha256','manifestBytes','manifestSha256','expiresAt','producerStatus'])assert.equal(route.readback[key],null);
+           const line=JSON.stringify(route.readback)+'\n';assert(Buffer.byteLength(line)<=4096);assert.equal(line.split('\n').length,2);
+          }
           export async function runControls(){
            const inventory=CONTROL_IDS.map(id=>({id,status:'not_executed'})),expected={context:A.CONTEXT,sourcePins:A.PINS,programHashes:A.PROGRAM_HASHES};
            let firstFailure=null,currentFamily=null;
            const sub=async(id,fn)=>{
             console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SUBCASE/1',family:currentFamily,id,phase:'start',...A.FLAGS}));
             try{await fn();console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SUBCASE/1',family:currentFamily,id,phase:'passed',...A.FLAGS}));}
             catch{console.log(JSON.stringify({marker:'AFW_COHERENT_SUITE_SUBCASE/1',family:currentFamily,id,phase:'failed',...A.FLAGS}));throw Error('fixed_subcase_failed');}
            };
            const cases=[
            async()=>{
@@ -503,20 +582,34 @@
             });
            },
            async()=>{
             await sub('all_twenty_six_exact_crypto_step_bindings',async()=>{
              const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');A.validateKeyScopes(text);
              expectMutationRejected(text,'positive_prepare',null,'    environment: afw-finite-syn-checkpoint','    environment: changed',A.validateKeyScopes);
              expectMutationRejected(text,'positive_prepare','custody','        id: custody','        id: install_key_leak',A.validateKeyScopes);
              expectMutationRejected(text,'positive_prepare',null,'      AFW_BUDGET_GROUP: positive','      AFW_SYN_CHECKPOINT_KEY: exposed\n      AFW_BUDGET_GROUP: positive',A.validateKeyScopes);
              expectMutationRejected(text,'verify','suite_bootstrap','        shell: bash','        env:\n          AFW_SYN_CHECKPOINT_KEY: exposed\n        shell: bash',A.validateKeyScopes);
             });
+            await sub('global_secret_alias_and_outer_scope_references_rejected',async()=>{
+             const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8'),expression=secretFixture(),keyLine='          AFW_SYN_CHECKPOINT_KEY: '+expression;
+             A.validateKeyScopes(text);
+             expectMutationRejected(text,'positive_prepare','custody',keyLine,keyLine+'\n          OTHER_KEY: '+expression,A.validateKeyScopes);
+             expectMutationRejected(text,'positive_prepare',null,'      AFW_BUDGET_GROUP: positive','      OUTER_ALIAS: '+expression+'\n      AFW_BUDGET_GROUP: positive',A.validateKeyScopes);
+             const changed=mutatePreamble(text,'permissions:\n','env:\n  WORKFLOW_ALIAS: '+expression+'\npermissions:\n');expectTextRejected(changed,A.validateKeyScopes);
+            });
+            await sub('secret_run_and_ambiguous_context_references_rejected',async()=>{
+             const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8'),normal=secretFixture(),keyLine='          AFW_SYN_CHECKPOINT_KEY: '+normal;
+             expectMutationRejected(text,'positive_prepare','install','          umask 077\n','          umask 077\n          printf '+secretFixture()+'\n',A.validateKeyScopes);
+             for(const style of ['bracket','dynamic','case','object'])expectMutationRejected(text,'positive_prepare','custody',keyLine,'          AFW_SYN_CHECKPOINT_KEY: '+secretFixture(style),A.validateKeyScopes);
+             expectMutationRejected(text,'positive_prepare','custody','        env:\n','        env: &custody_alias\n',A.validateKeyScopes);
+             const preamble=text.slice(0,[...text.matchAll(/^jobs:\n/gm)][0].index),runName=preamble.match(/^run-name: .+$/m)[0],changed=mutatePreamble(text,runName,'run-name: '+secretFixture());expectTextRejected(changed,A.validateKeyScopes);
+            });
             await sub('inert_parent_environment_is_restored',async()=>{
              const before=process.env.AFW_SYN_CHECKPOINT_KEY;
              try{process.env.AFW_SYN_CHECKPOINT_KEY='INERT_SCOPE';reject(()=>A.requireKeyless());}
              finally{if(before===undefined)delete process.env.AFW_SYN_CHECKPOINT_KEY;else process.env.AFW_SYN_CHECKPOINT_KEY=before;}
              A.requireKeyless();
             });
            },
            async()=>{
             await sub('fixed_pins_native_tap_cases_and_complete_f8_action',async()=>{
              await A.validateSourcePins();const text=await readFile('.github/workflows/afw-finite-budget-qualification.yml','utf8');A.validateFixedCases(text);
@@ -538,20 +631,38 @@
              for(const [field,value]of [['id',102],['name','other'],['expired',true],['digest','sha256:'+'b'.repeat(64)],['expires_at','2000-01-01T00:00:00Z']]){const b=clone(m);b[field]=value;reject(()=>A.validateAssignedMetadata(b,assignment,'generic-private'));}
              for(const [field,value]of [['id',1],['head_sha','b'.repeat(40)],['head_branch','main']]){const b=clone(m);b.workflow_run[field]=value;reject(()=>A.validateAssignedMetadata(b,assignment,'generic-private'));}
              const p=pureFixture(),r={files:p.files,metadata:meta('contracts','pure','123',H),rawZipSha256:H};assert.equal(A.bindPure(r,p.assignment,p.manifestSha256).beforeI0,true);
              reject(()=>A.bindPure({...r,rawZipSha256:'b'.repeat(64)},p.assignment,p.manifestSha256));reject(()=>A.bindPure(r,p.assignment,'b'.repeat(64)));
              const changed=new Map(p.files);changed.set('preflight.json',Buffer.from('{}'));reject(()=>A.bindPure({...r,files:changed},p.assignment,p.manifestSha256));
             });
             await sub('generic_aead_zip3_and_reopened_proof_bytes',async()=>{
              await cryptoControl();const input=proofInput();assert.equal(A.validateReopenedSuite(input).counts.tests,16);
              reject(()=>A.validateReopenedSuite({...input,proofBytes:Buffer.from('{}')}));reject(()=>A.decodePrivateZip(Buffer.from('invalid')));
             });
+            await sub('whole_job_outer_receipt_accepts_multiple_synthetic_copies',async()=>{
+             await A.validateSourcePins();assert.equal(A.PINS.worldBlob,'0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b');
+             const syntheticCopies=[{fileCount:300,totalBytes:70*1048576},{fileCount:300,totalBytes:70*1048576}],ancillary={fileCount:4,totalBytes:2*1048576};
+             const totals=syntheticCopies.reduce((sum,row)=>({fileCount:sum.fileCount+row.fileCount,totalBytes:sum.totalBytes+row.totalBytes}),ancillary);
+             assert(totals.fileCount>512&&totals.totalBytes>128*1048576);
+             const files=new Map([['receipt.json',Buffer.from(JSON.stringify(totals))]]);
+             assert.deepEqual(A.validatePrivateReceiptCaps(files,'reduction-result-b'),totals);
+            });
+            await sub('whole_job_generic_receipt_boundaries_and_partial_zero',async()=>{
+             const files=value=>new Map([['receipt.json',Buffer.from(JSON.stringify(value))]]);
+             for(const kind of ['reduction-result-b','checkpoint','consumer-failure','producer-failure']){
+              assert.deepEqual(A.validatePrivateReceiptCaps(files({fileCount:4096,totalBytes:512*1048576}),kind),{fileCount:4096,totalBytes:512*1048576});
+              reject(()=>A.validatePrivateReceiptCaps(files({fileCount:4097,totalBytes:1}),kind));
+              reject(()=>A.validatePrivateReceiptCaps(files({fileCount:1,totalBytes:512*1048576+1}),kind));
+             }
+             for(const kind of ['consumer-failure','producer-failure'])assert.deepEqual(A.validatePrivateReceiptCaps(files({fileCount:0,totalBytes:0}),kind),{fileCount:0,totalBytes:0});
+             reject(()=>A.validatePrivateReceiptCaps(files({fileCount:0,totalBytes:0}),'reduction-result-b'));
+            });
             await sub('operation_raw_cap_edges_and_b_twenty_second_timeout',async()=>{
              const m=meta('positive_prepare','checkpoint','101',H),a={job:'positive_prepare',kind:'checkpoint',id:'101',zipSha256:H};
              for(const [operation,cap,ms]of [['generic-private',136314880,30000],['b-peer',134283264,20000],['pure',134283264,30000],['safe',131072,30000]]){
               const testJob=operation==='safe'?'controls':operation==='pure'?'contracts':'positive_prepare',testKind=testJob==='contracts'?'pure':testJob==='controls'?'controls':'checkpoint',assigned={job:testJob,kind:testKind,id:'101',zipSha256:H},bound=meta(testJob,testKind,'101',H);bound.size_in_bytes=cap;A.validateAssignedMetadata(bound,assigned,operation);bound.size_in_bytes=cap+1;reject(()=>A.validateAssignedMetadata(bound,assigned,operation));
               const calls=[];await A.rawAssigned('101',operation,{timeout:n=>{calls.push(n);return new AbortController().signal;},fetch:async(url,options)=>{assert.equal(url,'https://api.github.com/repos/'+A.CONTEXT.repository+'/actions/artifacts/101/zip');return new Response(Buffer.from('inert'));}});assert.deepEqual(calls,[ms]);
               assert.equal(A.checkedDownloadSize(cap-1,1,operation),cap);reject(()=>A.checkedDownloadSize(cap,1,operation));assert.equal((await A.collectPrivateBody(new Response(Buffer.from('inert')),operation,new AbortController().signal)).toString(),'inert');
              }
              reject(()=>A.operationLimits('arbitrary'));
             });
            },
@@ -656,20 +767,40 @@
             await sub('missing_safe_observes_attempt1_jobs_and_all_direct_metadata',async()=>{
              await unavailableSuiteCase({id:'',uploaded:'',reason:'publication_unavailable',artifactId:null});
             });
             await sub('id_only_safe_retains_id_without_safe_traffic',async()=>{
              await unavailableSuiteCase({id:'777',uploaded:'',reason:'invalid_evidence',artifactId:'777'});
             });
             await sub('other_malformed_partial_and_http_safe_routes_reconcile',async()=>{
              for(const fields of [{id:'',uploaded:H,artifactId:null},{id:'malformed',uploaded:H,artifactId:null},{id:'777',uploaded:'malformed',artifactId:'777'}])await unavailableSuiteCase({...fields,reason:'invalid_evidence'});
              for(const metadataStatus of [404,403,500])await unavailableSuiteCase({id:'777',uploaded:H,reason:metadataStatus===404?'publication_unavailable':'invalid_evidence',artifactId:'777',metadataStatus});
             });
+            await sub('actual_needs_capture_rejects_malformed_context_without_artifacts',async()=>{
+             for(const kind of ['suite','controls']){
+              const name=kind==='suite'?'reduction_consume_b':'keyless_controls',good=needsFixture(kind,{'safe-id':'777','safe-digest':H});
+              const malformed=[undefined,'not-json','{','null','[]'];
+              const missing=clone(good);delete missing[name];malformed.push(JSON.stringify(missing));
+              const extra=clone(good);extra.unexpected={result:'success',outputs:{}};malformed.push(JSON.stringify(extra));
+              for(const producer of [null,[],{result:'unknown',outputs:{}},{result:'success',outputs:null},{result:'success',outputs:[]},{result:'success',outputs:{'safe-id':777}},{result:'success',outputs:{},extra:true}]){
+               const value=clone(good);value[name]=producer;malformed.push(JSON.stringify(value));
+              }
+              if(kind==='suite'){const sibling=clone(good);sibling.contracts={result:'success',outputs:{count:1}};malformed.push(JSON.stringify(sibling));}
+              for(const raw of malformed)await captureRouteFixture(kind,raw,{contextValid:false,reason:'invalid_evidence'});
+             }
+            });
+            await sub('validated_needs_absence_partial_and_404_keep_route_meanings',async()=>{
+             for(const kind of ['suite','controls']){
+              for(const result of ['success','failure','skipped','cancelled'])await captureRouteFixture(kind,JSON.stringify(needsFixture(kind,{},result)),{contextValid:true,reason:'publication_unavailable'});
+              for(const [outputs,id,digest]of [[{'safe-id':'777'},'777',null],[{'safe-digest':H},null,H],[{'safe-id':'777','safe-digest':'malformed'},'777',null],[{'safe-id':'malformed','safe-digest':H},null,H]])await captureRouteFixture(kind,JSON.stringify(needsFixture(kind,outputs)),{contextValid:true,reason:'invalid_evidence',id,digest});
+              await captureRouteFixture(kind,JSON.stringify(needsFixture(kind,{'safe-id':'777','safe-digest':H})),{contextValid:true,reason:'publication_unavailable',id:'777',digest:H,httpStatus:404});
+             }
+            });
             await sub('final_current_metadata_source_run_and_direct_needs_edges',async()=>{
              const g=golden(),f=routeFixture(g),j=finalJobs();
              for(const field of ['head_sha','id','head_branch']){
               const badIO={...f.io,metadata:async artifactId=>{const r=await f.io.metadata(artifactId);if(artifactId!=='777'){r.value.workflow_run[field]=field==='id'?1:field==='head_sha'?'b'.repeat(40):'main';}return r;}};
               const closed=await reconcileSuite({route:await verifyRoute(f.args,f.io),jobInventory:j,needs:f.needs},badIO);assert.equal(closed.readback.accepted,false);assert.equal(closed.readback.upstream,'unverified');assert.equal(closed.readback.reason,'none');
              }
              const stale={...f.io,source:async()=>({object:{sha:'b'.repeat(40)}})};assert.equal((await reconcileSuite({route:await verifyRoute(f.args,f.io),jobInventory:j,needs:f.needs},stale)).readback.upstream,'unverified');
              const changed=clone(f.needs);changed.positive_consume.outputs['artifact-digest']='b'.repeat(64);assert.equal((await reconcileSuite({route:await verifyRoute(f.args,f.io),jobInventory:j,needs:changed},f.io)).readback.accepted,false);
              const wrongAttempt=clone(g);wrongAttempt.context.attempt=2;reject(()=>A.validateSuite(wrongAttempt,expected));
              for(const status of [404,403,500]){const r=await verifyRoute(f.args,{metadata:async()=>({status,value:null})});assert.equal(r.readback.artifactId,'777');assert.equal(r.readback.reason,status===404?'publication_unavailable':'invalid_evidence');assert.equal(r.readback.proof,'absent');}
@@ -713,20 +844,40 @@
           function unavailableRecord({kind,id,uploaded,expected},reason='invalid_evidence'){
            let artifactId=null,uploadedDigest=null;try{artifactId=A.canonicalId(id);}catch{}try{uploadedDigest=A.hex(uploaded);}catch{}
            return {marker:'AFW_COHERENT_SUITE_READBACK/1',kind,source:expected.context.source,run:expected.context.run,attempt:1,artifactId,uploadedDigest,status:'unavailable',reason,proof:'absent',metadataBytes:null,metadataDigest:null,rawZipBytes:null,rawZipSha256:null,resultBytes:null,resultSha256:null,manifestBytes:null,manifestSha256:null,expiresAt:null,producerStatus:null,upstream:kind==='controls'?'not_applicable':'unverified',accepted:false,programHashes:expected.programHashes,...A.FLAGS};
           }
           async function fixedJSON(path){
            A.need(path===JOBS_PATH||path===SOURCE_PATH);
            const r=await fetch('https://api.github.com/repos/'+A.CONTEXT.repository+path,{headers:{Authorization:'Bearer '+process.env.GH_ARTIFACT_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});
            A.same(r.status,200);return r.json();
           }
           const fixedGitHubIO={metadata:A.metadata,zip:id=>Z.downloadAssignedZip(id,process.env.GH_ARTIFACT_TOKEN),source:path=>fixedJSON(path),jobs:path=>fixedJSON(path)};
+          export function captureNeeds({kind,raw}){
+           A.need(kind==='suite'||kind==='controls');
+           const empty={kind,id:'',uploaded:'',expected:expectedCurrent()};
+           try{
+            A.need(typeof raw==='string');const needs=JSON.parse(raw),names=kind==='suite'?A.LEGACY:['keyless_controls'];A.fields(needs,names);
+            for(const name of names){
+             const entry=needs[name];A.fields(entry,['result','outputs']);A.need(['success','failure','skipped','cancelled'].includes(entry.result));
+             const outputs=entry.outputs;A.need(outputs!==null&&typeof outputs==='object'&&!Array.isArray(outputs));
+             const descriptors=Object.getOwnPropertyDescriptors(outputs);
+             for(const key of Reflect.ownKeys(descriptors)){const descriptor=descriptors[key];A.need(typeof key==='string'&&descriptor.enumerable&&Object.hasOwn(descriptor,'value')&&typeof descriptor.value==='string');}
+            }
+            const producer=needs[kind==='controls'?'keyless_controls':'reduction_consume_b'],outputs=producer.outputs;
+            const args={kind,id:Object.hasOwn(outputs,'safe-id')?outputs['safe-id']:'',uploaded:Object.hasOwn(outputs,'safe-digest')?outputs['safe-digest']:'',expected:expectedCurrent()};
+            return {valid:true,needs,args};
+           }catch{return {valid:false,needs:null,args:empty};}
+          }
+          export async function routeCapturedNeeds(captured,io=fixedGitHubIO){
+           if(!captured.valid)return {readback:unavailableRecord(captured.args),valid:null};
+           return verifyRoute(captured.args,io);
+          }
           export async function verifyRoute(args,io=fixedGitHubIO){
            const {kind,id,uploaded,expected}=args;A.need(kind==='suite'||kind==='controls');
            const readback=unavailableRecord(args);
            if(!id&&!uploaded){readback.reason='publication_unavailable';return {readback,valid:null};}
            if(!readback.artifactId||!readback.uploadedDigest)return {readback,valid:null};
            try{
             const response=await io.metadata(readback.artifactId);
             if(response.status===404){readback.reason='publication_unavailable';return {readback,valid:null};}
             A.same(response.status,200);
             const meta=A.validateAssignedMetadata(response.value,{job:kind,kind,id:readback.artifactId,zipSha256:readback.uploadedDigest},'safe');
@@ -837,29 +988,27 @@
              records.push({id:RECEIVER_IDS[n],status:partial[n].status});if(partial[n].status==='failed')break;
             }
             const first=records.findIndex(x=>x.status==='failed');
             if(first<0){if(records.length===16)records.pop();records.push({id:RECEIVER_IDS[records.length],status:'failed'});}
            }
            const inventory=RECEIVER_IDS.map((id,n)=>records[n]??{id,status:'not_executed'}),passed=inventory.filter(x=>x.status==='passed').length,failures=inventory.filter(x=>x.status==='failed').length;
            const record={marker:'AFW_COHERENT_SUITE_ZIP_CONTROLS/1',expected:16,completed:passed+failures,passed,failed:failures,inventory,...A.FLAGS};
            return {passed:!failed,record,failure:failed?unavailableRecord(args):null};
           }
           export async function verify(){
-           const kind=process.env.GITHUB_JOB==='keyless_verify'?'controls':'suite';let needs={};
-           try{needs=JSON.parse(process.env.AFW_SUITE_NEEDS);}catch{}
-           const upstream=needs[kind==='controls'?'keyless_controls':'reduction_consume_b'];
-           const args={kind,id:upstream?.outputs?.['safe-id']??'',uploaded:upstream?.outputs?.['safe-digest']??'',expected:expectedCurrent()};
+           const kind=process.env.GITHUB_JOB==='keyless_verify'?'controls':'suite',captured=captureNeeds({kind,raw:process.env.AFW_SUITE_NEEDS}),args=captured.args;
            try{
             await A.validateSourcePins();A.need(['verify','keyless_verify'].includes(process.env.GITHUB_JOB));
-            const guarded=await receiverControlsGuard(args);console.log(JSON.stringify(guarded.record));
+            if(!captured.valid)return (await routeCapturedNeeds(captured)).readback;
+            const needs=captured.needs,guarded=await receiverControlsGuard(args);console.log(JSON.stringify(guarded.record));
             if(!guarded.passed)return (await reconcileSuite({route:{readback:guarded.failure,valid:null},jobInventory:null,needs})).readback;
-            const route=await verifyRoute(args);
+            const route=await routeCapturedNeeds(captured);
             return (await reconcileSuite({route,jobInventory:null,needs})).readback;
            }catch{return unavailableRecord(args);}
           }
           if(process.argv[1]===import.meta.filename){
            const record=await verify(),line=JSON.stringify(record);
            if(Buffer.byteLength(line+'\n')<=4096){
             console.log(line);try{await writeFile(join(process.env.RUNNER_TEMP,'afw-suite-readback.json'),line+'\n',{mode:0o600});}catch{}
            }else console.log(JSON.stringify(unavailableRecord({kind:record.kind,id:record.artifactId??'',uploaded:record.uploadedDigest??'',expected:expectedCurrent()})));
            if(!record.accepted)process.exitCode=1;
           }
```

## Complete full-source fixrange report append diff (132654prefixexact)

```diff
diff --git a/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md b/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
--- a/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
+++ b/docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
@@ -1041,10 +1041,327 @@
 
 ### Exact restoration, report preservation and STOP
 
 Frozen Source b8497734 and original rollback bytes/blob were positively rechecked after run completion/all8terminal. Restoration commit `db7603193ee72d0752203078fbfadaeb38fbbf15` directly parents activationb8497734 and points to exact pre-activation closed tree `c66911bd0bc2b229852b024dcb46cd28d6136b01`. CAS expectedb8497734/no force succeeded. Fresh ref/commit/F7/report reads confirmed restorationtip/tree, exact original F7blobf7a71f1a0fa4f5ddf069ff411f008a098455e5cc and bytes, original manual/no-input/no-push/sevenfalse&& guards, and exact unmodified6e112294/100977-character prior report before this append. Five scoped branch-active inventories were positively0 after restoration.
 
 This appendix is the only final leaf delta from the closed715ac94e tree and preserves the entire100977-character/100991-byte prefix. Final publication uses a new report blob/tree/commit followed by CAS expecteddb760319, no force. The final publication commit/tree/blob cannot name themselves inside their own content; their exact IDs and post-publication full recursive/readback results are recorded in the executor's completion receipt and Root's independent metadata/review record. Required final check:3196 total leaves; initial3195 leaf/type/mode/blob exact; report sole allowed delta; originalF7/62workflows/R1report exact; main0c9 unchanged; exact reportprefix; five active inventories0; only one actual currentSource run/attempt1 and no restoration/report-triggered runs. No completion is released until those positive readbacks pass.
 
 Tool/check trace: GitHub fetch pinned brief/spec/AGENTS/candidate/rollback/report/ref/full recursive trees; built-in RAM hash and exact inverse-overlay/body comparison; GitDB create_blob→create_tree→create_commit→update_ref(expectedsha,forcefalse); read exact activationref/tree/run; bounded <=40s sleeps and GET run plus `/attempts/1/jobs?per_page=100` while Source frozen; positive exact8terminal verification; KEYLESS verify log only; complete current-run artifact metadata/actualSAFE-name inventory; recheckfrozenref+rollback; GitDB restorationcommit+CAS and readback; append-only report; final recursive/ref/main/active/run/reportreadbacks. Initial oversized RAM-transfer tool call was rejected before execution; bounded public-string chunks then succeeded. The rejected direct artifact metadata route made no successful metadata/by-ID or archive read; complete allowed run metadata established the inventory. Neither connector limitation altered Source, schema, clocks, key scopes or the number of runs.
 
 No rerun, repair, diagnostic execution, new key/permission, deployment, broadening or next-scope release. Exact outcome: actual suite FAILED/UNQUALIFIED, SAFE absent; Source restored; confidential producer evidence remains runner/Actions-custodied and unread. Fresh Task2 review and whole-plan review belong to Root after this executor STOP. All five flags remain exactlyfalse: operationalReadiness, completePackage, PCoff, globalNativeDrainVerified, sdkNamespaceEmptyVerified. This run does not establish real AFW operation with the PC off.
+
+
+# Final whole-plan fix wave — FF-I1, FF-I2, FF-M1
+
+Date: 2026-11-13 UTC. Result: **DONE_WITH_CONCERNS: one covering KEYLESS qualification PASSED; actual suite43414661211/1 remains FAILED/unqualified; no Native retry.**
+
+This is the one consolidated final whole-plan wave released by Root, not an ordinary Task1 fix round or a new actual Native execution. The authoritative starting point was CLOSED `e88ce70b8edd3bdc7bcda062b115578b3d26f1a1`, not the earlier715a checkpoint. Its entire132654-character report is preserved as an exact prefix of this file. That prefix is132708 UTF-8 bytes, blob `2b283b80b864cf0bdd9d659043e54ec7c81868ef`, SHA256 `93f2d04e9e20a098295e84dc1f79ec9f15a34ff8bc2f05e589ea99f7037f3fd8`; it was reread and independently hashed in this wave.
+
+## Historical correction: whole-job totals are not per-copy limits
+
+The earlier characterization of a normal successful WHOLE job envelope as at most512 files/128MiB was wrong. The protected World1..512-files/128MiB checks apply to one record.persist snapshot/copy. Generic custody computes its receipt across the complete sourceDir, which includes multiple outputs/copies and ancillary manifests, programs and logs. Its original whole-package maximum is4096 files/512MiB plain bytes.
+
+This wave applies those original generic totals to the outer receipt: successful package fileCount>=1, partial/failure package fileCount>=0, both <=4096 and totalBytes<=512MiB. The original World per-copy limit, generic custody module, independent ZIP/envelope/download/JSON limits and all clocks remain unchanged. Prior statements and test records are preserved above, not edited retrospectively. The earlier aggregate513-reject control is replaced by generic4097-reject and positive multiple-copy aggregation coverage.
+
+This correction does **not** identify the cause of the historical actual custody failures. No private counts, error values or producer logs were read. The reviewer noted that this outer check was not reached in readonly seal. Actual suite43414661211/1 remains failed and unqualified; no provider, credential or runtime cause is inferred from the new source correction.
+
+## Authority and exact allowed scope
+
+The released brief, binding SPEC final section and complete whole-plan findings were read at immutable Rootdocs `ace45f3e804ce2c8ea7b57b0ba6f46cbf4446d9c`:
+
+- `docs/superpowers/briefs/2026-11-13-coherent-suite-final-fix-wave.md`
+- `docs/superpowers/specs/2026-11-13-coherent-suite-qualification-design.md`
+- `docs/superpowers/reviews/2026-11-13-coherent-suite-whole-review.md`
+
+Root's precise FF-M1 shared-entry ruling is durable in the same SPEC at `93fec5055b672e0eff95da092dfbdeab7de84973`: exact full7/1 outer keys, every entry's exact result/outputs data shape, string-valued outputs with partial/empty allowed, Suite upstream unverified for invalid context and controls upstream not_applicable. No public schema or enum was added.
+
+PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web, ID1347578006; Source branch feat/finite-native-cleanup-20261101; GitHub API origin. Sole writer in this wave was this Source implementer; Task2 executor had stopped and Root independently confirmed closed BASE. Only temporary F7, SAME report append and ONE covering KEYLESS qualification were authorized. No subagents, second wave, extra qualification, Native/World/SDK/Miniflare or actual key in qualification, Cloudflare/API/runtime, permissions/credentials/OAuth/OTP, mail/Max/main/PR/merge, other chats or automations.
+
+All work was cloud GitDB/CAS/Actions. Public Source strings/hash/metadata were held in RAM; no local Source files, clone, worktree, dependency install, build, Source eval/import/execution or private artifact download was used.
+
+## Immutable candidate, overlay, restoration and complete review references
+
+| Checkpoint | Commit | Tree / F7 |
+| --- | --- | --- |
+| Authoritative closed BASE | `e88ce70b8edd3bdc7bcda062b115578b3d26f1a1` | tree `31aa47c288c8877133941447e3e8e8bb7984f53f`;3196 leaves; report2b283b80 |
+| New inactive candidate | `b5646538bb9f2d119e8943896990ac657d7bd518` | tree `5ed68e1b4677a79ed48703a055d4eae78f459c42`; F7 `be579ea23392d5df063458356765e2969244ee38` |
+| Sole covering overlay | `4f382419ad483ae3cc214e1a49d1d09d4b5db947` | tree `45f38baf35c2a78410407fcb51d86c823d566d4a`; F7 `1e68d7aadeb48db5840465692f7d95a501326903` |
+| Exact restoration | `55b16c841b7212fc962273ce8dcdd74ded4170a0` | tree `31aa47c288c8877133941447e3e8e8bb7984f53f`; exact F7 and132654-character prefix |
+
+New inactive F7: 317620 bytes / SHA256 `d1e028a2c4d82eef31cd95fd031dcb7dc98ed89893401c86a2dd80dd3f33ba3e`. It was fetched back and compared exactly before qualification. Source used the preserved23bda inactive implementation only as the starting text, never as the current branch tip.
+
+| Source-bound helper | Bytes | SHA256 |
+| --- | ---: | --- |
+| adapter |45798| `70e2a1e781ea9ece677c2fb05bc5bf25418b2999124400676884a3ebbe0b04a9` |
+| controls |51492| `25d28b9955fa99eb35d9877b87fe99a2cfbd81219343b3f7695501f875454abe` |
+| verifier |15099| `94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf` |
+| SAFEZIP |13305| `b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d` |
+
+All four body strings are byte-exact between the new inactive candidate and its covering overlay. Root independently recomputed their hashes from both sources. Qualified generic ZIP3 remains exactly3380 bytes/SHA256 `4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8`; SAFEZIP remains exactly13305 bytes/SHA256 `b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d`.
+
+Removing ONLY the four heredoc body strings from prior23bda and newb564 yields whole-pipeline byte equality. This was checked by the Source writer and independently by Root: original26 actual crypto operations, six Native/TAP blocks, F8 sealer/upload, wrappers, original DAG, timeouts, six environments, World/SDK/source pins,900000/180000 clock deltas and original business oracles are unchanged.
+
+Complete review package:
+
+- [Closed BASE through new inactive candidate](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/e88ce70b8edd3bdc7bcda062b115578b3d26f1a1...b5646538bb9f2d119e8943896990ac657d7bd518)
+- [Prior23bda implementation through this scoped helper delta](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/23bda9c98ebb9faa636c59d46b20ab40c50e38a9...b5646538bb9f2d119e8943896990ac657d7bd518)
+- [Full new inactive F7](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/b5646538bb9f2d119e8943896990ac657d7bd518/.github/workflows/afw-finite-budget-qualification.yml)
+- [Exact inactive-to-covering-overlay diff](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/b5646538bb9f2d119e8943896990ac657d7bd518...4f382419ad483ae3cc214e1a49d1d09d4b5db947)
+- [Covering overlay through exact restoration](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/4f382419ad483ae3cc214e1a49d1d09d4b5db947...55b16c841b7212fc962273ce8dcdd74ded4170a0)
+- [BASE through restoration, exact source equality](https://github.com/tokenizartinfo-ops/agent-friendly-web/compare/e88ce70b8edd3bdc7bcda062b115578b3d26f1a1...55b16c841b7212fc962273ce8dcdd74ded4170a0)
+
+The final append commit/tree are supplied in the closing delivery/readback, not recursively embedded in this report.
+
+## Three findings corrected through actual shared helpers
+
+| Finding | Production correction | Covering evidence |
+| --- | --- | --- |
+| FF-I1 Important | validatePrivateReceiptCaps now validates original whole-job generic4096-files/512MiB totals for successful and partial envelopes; successful>=1 and partial>=0. It no longer applies the World per-copy512/128 bound to the aggregate. | Actual outer validator accepts synthetic two-copy aggregation604 files/142MiB; generic4096/512MiB exact boundary accepts for success/failure kinds;4097 files or512MiB+1 reject; partial0 accepts and successful0 rejects. Protected World blob pin is asserted, with no World import or shadow oracle. |
+| FF-I2 Important | validateKeyScopes inspects ALL actual GitHub secret-context expressions across the complete workflow, including pre-jobs text and run scalars. Every such expression must be exact canonical reference at one approved job/crypto-step/env/AFW_SYN_CHECKPOINT_KEY value byte position. The expected26 bindings remain. Strict current structural YAML/step-env proof rejects aliases/anchors, merges, noncanonical or ambiguous scope without a new parser dependency. | Positive current workflow passes with exactly26 actual references. Extra alias in crypto env, outer job alias, pre-jobs workflow alias, run-scalar reference, bracket/dynamic/case/context-object expressions, YAML anchor and workflow run-name reference reject through the real validator. Fixture expression tokens are assembled at runtime; the workflow source has zero extra fixture secret-context expressions. |
+| FF-M1 Minor | New shared captureNeeds validates JSON, exact7 LEGACY or1 controls outer keys and EVERY exact result/outputs entry before producer lookup. Result is one of four GHA outcomes; outputs is nonnull/nonarray own data with string values, including empty/partial strings. Shared routeCapturedNeeds and actual verify use this capture path. Invalid context returns bounded invalid_evidence/absent/acceptedfalse with no artifact access, rather than empty-output classification or a null lookup exception. | Both kinds exercise non-JSON/null/array/missing/extra/malformed producer and sibling context with zero metadata/ZIP/source/jobs IO. Valid outputs{} retain publication_unavailable, including skipped producer; partial valid context retains known IDs/digests and invalid_evidence; fixed404 remains publication_unavailable. Closed record and<=4096B bound are asserted. |
+
+The existing actual candidate had26 approved effective key bindings and no observed key leak. FF-I2 corrected the control's coverage guarantee; no compromise or need for new credentials is inferred.
+
+The actual new needs interface is internal only:
+
+```text
+captureNeeds({kind,raw}) -> {valid,needs,args}
+routeCapturedNeeds(captured, io=fixedGitHubIO) -> existing {readback,valid}
+```
+
+Actual verify captures first, performs trusted source checks, and uses that same route seam on invalid and valid input. It never indexes a producer from unvalidated null/array/outer context. Invalid unreadable context does not fabricate a known artifact ID from its untrusted contents. Valid partial producer outputs preserve known canonical ID/digest through the existing route. Suite invalid context upstream stays unverified; controls stays not_applicable because the seven-job graph does not apply. Legitimate absence and fixed404 are distinct from malformed context. No public fields, enums or schemas changed.
+
+The global key checker maps the exact canonical reference to a proven step.env position, then scans the WHOLE raw workflow, so an alias or pre-jobs/run reference cannot hide behind the26 expected variable declarations. Source fixture builders split the GitHub expression opener and context tokens until runtime; there is no helper-source interpolation of the actual custody key. Actual crypto bodies are untouched and no afw-finite-syn-checkpoint environment was active in this run.
+
+## Sole covering qualification
+
+[Actions43425740095 / attempt1](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/43425740095)
+
+- Source `4f382419ad483ae3cc214e1a49d1d09d4b5db947`.
+- One-use exact message `AFW COHERENT SUITE FINAL WAVE KEYLESS QUALIFICATION 20261113122954Z`.
+- One fixed-branch F7-self-path push; attempt1; four new current source-bound body hashes.
+- Exactly10 declared/materialized/terminal jobs: **8 skipped + 2 success**; run completed **success**.
+- keyless_controls7min and keyless_verify2min only. Original actual eight stayed literal false and never executed.
+- Source remained frozen through completed run and all10 terminal jobs. No extra attempt, Native execution or follow-on wave.
+
+| Job | Job ID | Outcome |
+| --- | --- | --- |
+| contracts | 131886589722 | skipped |
+| positive_prepare | 131886590490 | skipped |
+| positive_consume | 131886591797 | skipped |
+| reduction_prepare | 131886591399 | skipped |
+| reduction_consume_a | 131886591719 | skipped |
+| readonly | 131886591635 | skipped |
+| reduction_consume_b | 131886591602 | skipped |
+| verify | 131886592495 | skipped |
+| keyless_controls | 131886587822 | success |
+| keyless_verify | 131886830205 | success |
+
+Actual covering commands on GitHub-hosted Ubuntu:
+
+```text
+# Both jobs: checkout exact Source, Node22.23.4, current Source-bound bootstrap.
+test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
+node --input-type=module <<'NODE_SUITE_BOOTSTRAP'
+# Fixed repository/id/ref/attempt/HEAD/tree/full-F7-Gitblob/pins; fixed0600 body files.
+
+# keyless_controls:
+node "$RUNNER_TEMP/afw-suite-controls.mjs"
+# Captured exit; strict two-JSON pair validation; single controls SAFE upload; final truth guard.
+
+# Inspection only inside fixed_case_counts:
+bash -n                         # each actual run body on stdin
+node --input-type=module --check # inline module bodies on stdin
+node --check "$RUNNER_TEMP/afw-suite-adapter.mjs"
+node --check "$RUNNER_TEMP/afw-suite-controls.mjs"
+node --check "$RUNNER_TEMP/afw-suite-verifier.mjs"
+node --check "$RUNNER_TEMP/afw-suite-safe-zip.mjs"
+
+# Existing isolated generic-crypto fixture:
+node --input-type=module -e <fixed inert generic-custody fixture program>
+# Only an inert32-byte fixture key in the subprocess, no actual key/World/SDK/Native.
+
+# keyless_verify:
+node "$RUNNER_TEMP/afw-suite-verifier.mjs"
+# Unchanged14 ZIP controls +2 receiver seams; then real current controls SAFE route.
+```
+
+Covering controls were written first. No pre-implementation RED execution, local Source execution, unrelated full project suite or invented test evidence is claimed. No npm/dependencies or actual Native suite ran. Inert receipt descriptors are metadata fixtures only, not huge copies or a replacement World oracle.
+
+## Accurate new and updated control inventory
+
+Observed: **6/6 wrapper families passed**, **32/32 named subcases**, **64 paired start/pass records**,0 failed/open. Compile-only inspection passed **110 shell +63 Node programs**. Separate ZIP/receiver controls passed **16/16**.
+
+New subcases:6. Retained named subcases:26. Within the retained inventory, generic_aead_zip3_and_reopened_proof_bytes was updated from aggregate513 rejection to generic4097 rejection, and all_twenty_six_exact_crypto_step_bindings now drives the stronger global shared validator. All prior regression controls remain.
+
+The two needs subcases contain fixed vectors of29 invalid-context fixtures and18 valid absence/partial/404 fixtures across suite and controls. These are inert capture-to-route fixture invocations within the two named subcases, not additional workflows/business cases or separately emitted case records. The emitted phase records below remain the actual subcase-level evidence.
+
+| Family | Subcase | Scope | Observed |
+| --- | --- | --- | --- |
+| dag_peer_inventory | b_inventory_optional_nonexecuting_receiver | retained | start + passed |
+| dag_peer_inventory | mutation_setup_failure_cannot_count_as_validator_rejection | retained | start + passed |
+| dag_peer_inventory | actual_b_dependency_and_attempt_endpoint_targets | retained | start + passed |
+| key_scope | all_twenty_six_exact_crypto_step_bindings | updated | start + passed |
+| key_scope | global_secret_alias_and_outer_scope_references_rejected | new | start + passed |
+| key_scope | secret_run_and_ambiguous_context_references_rejected | new | start + passed |
+| key_scope | inert_parent_environment_is_restored | retained | start + passed |
+| fixed_case_counts | fixed_pins_native_tap_cases_and_complete_f8_action | retained | start + passed |
+| fixed_case_counts | private_original_clocks_and_owned_case_identities | retained | start + passed |
+| fixed_case_counts | all_rewritten_shell_and_node_bodies_compile_only | retained | start + passed |
+| metadata_custody_binding | metadata_current_identity_and_complete_pure_binding | retained | start + passed |
+| metadata_custody_binding | generic_aead_zip3_and_reopened_proof_bytes | updated | start + passed |
+| metadata_custody_binding | whole_job_outer_receipt_accepts_multiple_synthetic_copies | new | start + passed |
+| metadata_custody_binding | whole_job_generic_receipt_boundaries_and_partial_zero | new | start + passed |
+| metadata_custody_binding | operation_raw_cap_edges_and_b_twenty_second_timeout | retained | start + passed |
+| incomplete_or_contradictory | pure_receipt_commits_after_original_stage_success_only | retained | start + passed |
+| incomplete_or_contradictory | eligible_projection_receipts_load_and_parse_failures | retained | start + passed |
+| incomplete_or_contradictory | failed_pure_receipt_write_is_not_read_and_retains_assignment | retained | start + passed |
+| incomplete_or_contradictory | failed_proof_receipt_write_is_not_read_after_open | retained | start + passed |
+| incomplete_or_contradictory | shared_projection_observed_failures_and_retained_assignment | retained | start + passed |
+| incomplete_or_contradictory | failure_kind_proof_remains_ineligible_after_validation | retained | start + passed |
+| incomplete_or_contradictory | actual_publication_guards_order_and_full_pure_gate | retained | start + passed |
+| incomplete_or_contradictory | valid_failed_pair_and_receiver_self_control_failure_record | retained | start + passed |
+| coherent_current_pair | same_full_suite_route_projection_and_final_reconciliation | retained | start + passed |
+| coherent_current_pair | nonpass_reconciles_all_available_assignments | retained | start + passed |
+| coherent_current_pair | missing_safe_observes_attempt1_jobs_and_all_direct_metadata | retained | start + passed |
+| coherent_current_pair | id_only_safe_retains_id_without_safe_traffic | retained | start + passed |
+| coherent_current_pair | other_malformed_partial_and_http_safe_routes_reconcile | retained | start + passed |
+| coherent_current_pair | actual_needs_capture_rejects_malformed_context_without_artifacts | new | start + passed |
+| coherent_current_pair | validated_needs_absence_partial_and_404_keep_route_meanings | new | start + passed |
+| coherent_current_pair | final_current_metadata_source_run_and_direct_needs_edges | retained | start + passed |
+| coherent_current_pair | closed_schema_flags_profiles_counts_and_extra_fields | retained | start + passed |
+
+The new outer-receipt positive fixture declares two individually plausible synthetic copy descriptors300 files/70MiB each plus ancillary4 files/2MiB; the aggregate is604 files/142MiB. It invokes the real outer validator and asserts the unchanged World source pin, without importing or implementing a second World validator. Generic boundary tests use small JSON descriptors, not huge allocation.
+
+The new global scope tests assemble expression tokens at runtime before source-string mutations; selection/target/boundary checks still complete outside expected-validator assertions. The positive actual workflow has exactly26 actual secret-context references and all must map to the approved positions. No actual additional secret expression was inserted in helper fixture source.
+
+The needs cases invoke actual captureNeeds and routeCapturedNeeds with fixed IO counters. Malformed context cannot be mistaken for proven absent outputs; legitimate skipped producers with outputs{} are accepted as context and classified as unavailable publication. The actual valid qualification path also exercises the same capture against real GHA needs and the current controls SAFE.
+
+Exact compile-only output:
+
+```json
+{"marker":"AFW_COHERENT_SUITE_SYNTAX/1","shellPrograms":110,"nodePrograms":63,"inspectedBodiesExecuted":false,"NativeExecuted":false,"SDKImported":false,"MFAllocated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+Exact six-family output:
+
+```json
+{"marker":"AFW_COHERENT_SUITE_CONTROLS/1","status":"passed","expected":6,"completed":6,"passed":6,"failed":0,"inventory":[{"id":"dag_peer_inventory","status":"passed"},{"id":"key_scope","status":"passed"},{"id":"fixed_case_counts","status":"passed"},{"id":"metadata_custody_binding","status":"passed"},{"id":"incomplete_or_contradictory","status":"passed"},{"id":"coherent_current_pair","status":"passed"}],"firstFailure":null,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+Exact64 bounded subcase phase records:
+
+```jsonl
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"b_inventory_optional_nonexecuting_receiver","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"b_inventory_optional_nonexecuting_receiver","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"mutation_setup_failure_cannot_count_as_validator_rejection","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"mutation_setup_failure_cannot_count_as_validator_rejection","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"actual_b_dependency_and_attempt_endpoint_targets","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"dag_peer_inventory","id":"actual_b_dependency_and_attempt_endpoint_targets","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"key_scope","id":"all_twenty_six_exact_crypto_step_bindings","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"key_scope","id":"all_twenty_six_exact_crypto_step_bindings","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"key_scope","id":"global_secret_alias_and_outer_scope_references_rejected","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"key_scope","id":"global_secret_alias_and_outer_scope_references_rejected","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"key_scope","id":"secret_run_and_ambiguous_context_references_rejected","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"key_scope","id":"secret_run_and_ambiguous_context_references_rejected","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
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
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"whole_job_outer_receipt_accepts_multiple_synthetic_copies","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"whole_job_outer_receipt_accepts_multiple_synthetic_copies","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"whole_job_generic_receipt_boundaries_and_partial_zero","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"whole_job_generic_receipt_boundaries_and_partial_zero","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"operation_raw_cap_edges_and_b_twenty_second_timeout","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"metadata_custody_binding","id":"operation_raw_cap_edges_and_b_twenty_second_timeout","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"pure_receipt_commits_after_original_stage_success_only","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"pure_receipt_commits_after_original_stage_success_only","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"eligible_projection_receipts_load_and_parse_failures","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"eligible_projection_receipts_load_and_parse_failures","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"failed_pure_receipt_write_is_not_read_and_retains_assignment","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"failed_pure_receipt_write_is_not_read_and_retains_assignment","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"failed_proof_receipt_write_is_not_read_after_open","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"failed_proof_receipt_write_is_not_read_after_open","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"shared_projection_observed_failures_and_retained_assignment","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"shared_projection_observed_failures_and_retained_assignment","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"failure_kind_proof_remains_ineligible_after_validation","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"failure_kind_proof_remains_ineligible_after_validation","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"actual_publication_guards_order_and_full_pure_gate","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"actual_publication_guards_order_and_full_pure_gate","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"valid_failed_pair_and_receiver_self_control_failure_record","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"incomplete_or_contradictory","id":"valid_failed_pair_and_receiver_self_control_failure_record","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"same_full_suite_route_projection_and_final_reconciliation","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"same_full_suite_route_projection_and_final_reconciliation","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"nonpass_reconciles_all_available_assignments","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"nonpass_reconciles_all_available_assignments","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"missing_safe_observes_attempt1_jobs_and_all_direct_metadata","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"missing_safe_observes_attempt1_jobs_and_all_direct_metadata","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"id_only_safe_retains_id_without_safe_traffic","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"id_only_safe_retains_id_without_safe_traffic","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"other_malformed_partial_and_http_safe_routes_reconcile","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"other_malformed_partial_and_http_safe_routes_reconcile","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"actual_needs_capture_rejects_malformed_context_without_artifacts","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"actual_needs_capture_rejects_malformed_context_without_artifacts","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"validated_needs_absence_partial_and_404_keep_route_meanings","phase":"start","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+{"marker":"AFW_COHERENT_SUITE_SUBCASE/1","family":"coherent_current_pair","id":"validated_needs_absence_partial_and_404_keep_route_meanings","phase":"passed","operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
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
+## Current SMALLSAFE and independent readback
+
+Only one artifact was published by this run. It contains exactly result.json and manifest.json; no new readback artifact.
+
+| Field | Observed |
+| --- | --- |
+| Name |afw-coherent-suite-controls-safe-43425740095-1 |
+| Assigned ID | `14037046667` |
+| Uploaded/API/raw SHA256 | `759148353c4fed51be11db85163afe4301b864301de290e90c9ceb96dc96385b` |
+| ZIP bytes |1392 |
+| Result bytes/SHA256 |1666 / `333af0ec16160e270aef4c0252d111fbfd21786993d39b928250be34f1e2e5d8` |
+| Manifest bytes/SHA256 |265 / `444324796e1731aaab41843a13da181cdc3e22ae3fea31cb06c46555befd2597` |
+| Expires |2026-11-20T12:30:54Z |
+| Producer / accepted |passed / true |
+| Pair |verified / none / strict_current_safe_pair |
+| Upstream |not_applicable |
+
+Root independently downloaded ONLY this current1392B approved SAFE and validated ZIP/CRC/ranges/EOF/fatal UTF8/canonical2JSON/full manifest, metadata-upload-body SHA triple, context/pins/four hashes,6-family result,32 paired subcases,16 ZIP controls and the exact accepted readback. No private Native artifact, model, plaintext/cipher, producer logs, actual key or owner data was fetched in this wave.
+
+Exact current <=4096B readback:
+
+```json
+{"marker":"AFW_COHERENT_SUITE_READBACK/1","kind":"controls","source":"4f382419ad483ae3cc214e1a49d1d09d4b5db947","run":"43425740095","attempt":1,"artifactId":"14037046667","uploadedDigest":"759148353c4fed51be11db85163afe4301b864301de290e90c9ceb96dc96385b","status":"verified","reason":"none","proof":"strict_current_safe_pair","metadataBytes":1392,"metadataDigest":"sha256:759148353c4fed51be11db85163afe4301b864301de290e90c9ceb96dc96385b","rawZipBytes":1392,"rawZipSha256":"759148353c4fed51be11db85163afe4301b864301de290e90c9ceb96dc96385b","resultBytes":1666,"resultSha256":"333af0ec16160e270aef4c0252d111fbfd21786993d39b928250be34f1e2e5d8","manifestBytes":265,"manifestSha256":"444324796e1731aaab41843a13da181cdc3e22ae3fea31cb06c46555befd2597","expiresAt":"2026-11-20T12:30:54Z","producerStatus":"passed","upstream":"not_applicable","accepted":true,"programHashes":{"adapter":"70e2a1e781ea9ece677c2fb05bc5bf25418b2999124400676884a3ebbe0b04a9","controls":"25d28b9955fa99eb35d9877b87fe99a2cfbd81219343b3f7695501f875454abe","verifier":"94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf","safeZip":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"},"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+## Exact restoration, append preservation and STOP
+
+Before rollback: completed success and all10 exact terminal jobs were positively read, all five Source branch active inventories were0, frozen Source was still4f382419, and original F7 was reread and compared as recoverable from authoritative BASE.
+
+Restoration commit `55b16c841b7212fc962273ce8dcdd74ded4170a0` points exactly to BASE tree `31aa47c288c8877133941447e3e8e8bb7984f53f`. Its F7 was fetched back as exact `f7a71f1a0fa4f5ddf069ff411f008a098455e5cc`,126209 bytes/SHA256 `1e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a`, original manual/no-input/no-push/seven false guards. Report prefix was separately reread as exact2b283b80/132654 characters/132708 bytes/SHA93f2d04e before this append.
+
+The covering overlay recursive tree was positively read truncated:false/3196 leaves, with all original3195 leaves unchanged except temporary F7, and exact report-prefix blob2b283b80. Restoration restores that last original leaf. This append changes only the existing suite-report leaf and preserves the complete authoritative132654-character prefix; final remains3196 leaves, all original3195 type/mode/blob and62 workflows exact. Main `0c9c475b3ebaa970fc11d628b40e50a90cceb727` and protected R1 report remain unchanged. Final report CAS is followed by full tree/ref/report-prefix/F7/main/62WF/five-active and completed-attempt readbacks, delivered compactly to Root. All ref updates used expected-tip CAS; no force or uncertain mutation retry.
+
+Root will perform one scoped re-review of these three findings and regressions. This writer does not adjudicate the whole plan clean or authorize another run. Actual suite43414661211/1 remains FAILED/unqualified, its custody failure causes remain UNKNOWN, P1/D1–D4/joint proof remain unqualified, and global drain/SDK namespace/production/external delivery/PC-off remain unproved.
+
+All five flags remain exactly false:
+
+```json
+{"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
+```
+
+**STOP after exact restoration, this prefix-preserving append and final readbacks. No second wave, extra qualification or Native retry.**
```

## Binding clarifications / original findings

Readoriginalfindings docs/superpowers/reviews/2026-11-13-coherent-suite-whole-review.md. Wholejobreceiptmax4096files/512MiB(success>=1,partial>=0) matchesoriginalgenericcrypto, Worldpercopy512/128unchanged. Globalallworkflowsecret-contextrefs exact26approvedcanonicalslots; noactualleakobserved. Needsfull7/1outerandentrydataobjects/resultenum/stringoutputsvalidatedbeforesafeIDlookup; partial/emptyallowed; malformedSuiteupstreamunverified/controlskindnot_applicable/invalid_evidence/noIO. ExactsharedclarificationSPEC93fec5055b672e0eff95da092dfbdeab7de84973. No publicschema/enum changes.

## Root independent current SAFE and execution audit

```json
{
  "source": "4f382419ad483ae3cc214e1a49d1d09d4b5db947",
  "tree": "45f38baf35c2a78410407fcb51d86c823d566d4a",
  "workflowBlob": "1e68d7aadeb48db5840465692f7d95a501326903",
  "run": "43425740095",
  "attempt": 1,
  "runConclusion": "success",
  "jobs": [
    {
      "id": 131886587822,
      "name": "keyless_controls",
      "status": "completed",
      "conclusion": "success"
    },
    {
      "id": 131886589722,
      "name": "contracts",
      "status": "completed",
      "conclusion": "skipped"
    },
    {
      "id": 131886590490,
      "name": "positive_prepare",
      "status": "completed",
      "conclusion": "skipped"
    },
    {
      "id": 131886591399,
      "name": "reduction_prepare",
      "status": "completed",
      "conclusion": "skipped"
    },
    {
      "id": 131886591602,
      "name": "reduction_consume_b",
      "status": "completed",
      "conclusion": "skipped"
    },
    {
      "id": 131886591635,
      "name": "readonly",
      "status": "completed",
      "conclusion": "skipped"
    },
    {
      "id": 131886591719,
      "name": "reduction_consume_a",
      "status": "completed",
      "conclusion": "skipped"
    },
    {
      "id": 131886591797,
      "name": "positive_consume",
      "status": "completed",
      "conclusion": "skipped"
    },
    {
      "id": 131886592495,
      "name": "verify",
      "status": "completed",
      "conclusion": "skipped"
    },
    {
      "id": 131886830205,
      "name": "keyless_verify",
      "status": "completed",
      "conclusion": "success"
    }
  ],
  "programHashes": {
    "adapter": "70e2a1e781ea9ece677c2fb05bc5bf25418b2999124400676884a3ebbe0b04a9",
    "controls": "25d28b9955fa99eb35d9877b87fe99a2cfbd81219343b3f7695501f875454abe",
    "verifier": "94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf",
    "safeZip": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"
  },
  "candidateBodyBytes": {
    "adapter": 45798,
    "controls": 51492,
    "verifier": 15099,
    "safeZip": 13305
  },
  "fourBodiesBetweenCandidateAndActualExact": true,
  "pipelineOutsideFourExact": true,
  "qualifiedZIP3": {
    "bytes": 3380,
    "sha256": "4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8"
  },
  "strictSafe": {
    "artifactId": "14037046667",
    "bytes": 1392,
    "sha256": "759148353c4fed51be11db85163afe4301b864301de290e90c9ceb96dc96385b",
    "files": [
      {
        "name": "manifest.json",
        "bytes": 265,
        "sha256": "444324796e1731aaab41843a13da181cdc3e22ae3fea31cb06c46555befd2597",
        "value": {
          "purpose": "afw.coherent-suite.controls-manifest.safe.v1",
          "source": "4f382419ad483ae3cc214e1a49d1d09d4b5db947",
          "run": "43425740095",
          "attempt": 1,
          "files": [
            {
              "path": "result.json",
              "bytes": 1666,
              "sha256": "333af0ec16160e270aef4c0252d111fbfd21786993d39b928250be34f1e2e5d8"
            }
          ]
        }
      },
      {
        "name": "result.json",
        "bytes": 1666,
        "sha256": "333af0ec16160e270aef4c0252d111fbfd21786993d39b928250be34f1e2e5d8",
        "value": {
          "purpose": "afw.coherent-suite.controls.safe.v1",
          "context": {
            "repository": "tokenizartinfo-ops/agent-friendly-web",
            "repositoryId": "1347578006",
            "ref": "refs/heads/feat/finite-native-cleanup-20261101",
            "source": "4f382419ad483ae3cc214e1a49d1d09d4b5db947",
            "tree": "45f38baf35c2a78410407fcb51d86c823d566d4a",
            "workflowBlob": "1e68d7aadeb48db5840465692f7d95a501326903",
            "run": "43425740095",
            "attempt": 1,
            "node": "22.23.4"
          },
          "sourcePins": {
            "pureTestBlob": "1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8",
            "nativeTestBlob": "533dafb5df5f8e57442c5b9029dc8dec6dded434",
            "worldBlob": "0631f9a44cbb37bec3ed1a2c3dc09ee93b86661b",
            "custodyBlob": "4d05b5ec0f7b074be88ef9733a47c984b0212351",
            "lockBlob": "36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b",
            "sdkVersion": "1.2.1"
          },
          "programHashes": {
            "adapter": "70e2a1e781ea9ece677c2fb05bc5bf25418b2999124400676884a3ebbe0b04a9",
            "controls": "25d28b9955fa99eb35d9877b87fe99a2cfbd81219343b3f7695501f875454abe",
            "verifier": "94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf",
            "safeZip": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"
          },
          "status": "passed",
          "expected": 6,
          "completed": 6,
          "passed": 6,
          "failed": 0,
          "inventory": [
            {
              "id": "dag_peer_inventory",
              "status": "passed"
            },
            {
              "id": "key_scope",
              "status": "passed"
            },
            {
              "id": "fixed_case_counts",
              "status": "passed"
            },
            {
              "id": "metadata_custody_binding",
              "status": "passed"
            },
            {
              "id": "incomplete_or_contradictory",
              "status": "passed"
            },
            {
              "id": "coherent_current_pair",
              "status": "passed"
            }
          ],
          "firstFailure": null,
          "realCustodyKeyBound": false,
          "NativeExecuted": false,
          "SDKImported": false,
          "MFAllocated": false,
          "operationalReadiness": false,
          "completePackage": false,
          "PCoff": false,
          "globalNativeDrainVerified": false,
          "sdkNamespaceEmptyVerified": false
        }
      }
    ]
  },
  "controls": {
    "artifactId": "14037046667",
    "status": "passed",
    "controls": 6,
    "passed": 6,
    "failed": 0,
    "strictMetadataVerified": true,
    "NativeExecuted": false,
    "source": "4f382419ad483ae3cc214e1a49d1d09d4b5db947",
    "run": "43425740095",
    "operationalReadiness": false,
    "PCoff": false
  },
  "subcases": {
    "records": 64,
    "subcases": 32,
    "passed": 32,
    "failed": 0,
    "open": 0,
    "failureIds": []
  },
  "closedRecordAudit": {
    "source": "4f382419ad483ae3cc214e1a49d1d09d4b5db947",
    "run": "43425740095",
    "kind": "controls",
    "artifactId": "14037046667",
    "transportVerified": true,
    "accepted": true,
    "producerStatus": "passed",
    "upstream": "not_applicable",
    "operationalReadiness": false,
    "PCoff": false
  },
  "keylessVerifierRecords": [
    {
      "marker": "AFW_COHERENT_SUITE_ZIP_CONTROLS/1",
      "expected": 16,
      "completed": 16,
      "passed": 16,
      "failed": 0,
      "inventory": [
        {
          "id": "zip_valid_store_crc_vector",
          "status": "passed"
        },
        {
          "id": "zip_valid_deflate",
          "status": "passed"
        },
        {
          "id": "zip_signed_unsigned_descriptors",
          "status": "passed"
        },
        {
          "id": "zip_wrong_size",
          "status": "passed"
        },
        {
          "id": "zip_wrong_upload_sha",
          "status": "passed"
        },
        {
          "id": "zip_wrong_metadata_sha",
          "status": "passed"
        },
        {
          "id": "zip_extra_entry",
          "status": "passed"
        },
        {
          "id": "zip_duplicate_entry",
          "status": "passed"
        },
        {
          "id": "zip_traversal_entry",
          "status": "passed"
        },
        {
          "id": "zip_symlink",
          "status": "passed"
        },
        {
          "id": "zip_bad_crc",
          "status": "passed"
        },
        {
          "id": "zip_noncontiguous_ranges",
          "status": "passed"
        },
        {
          "id": "zip_declared_and_inflate_caps",
          "status": "passed"
        },
        {
          "id": "download_stream_redirect_auth_bounds",
          "status": "passed"
        },
        {
          "id": "receiver_capture_current_pair",
          "status": "passed"
        },
        {
          "id": "receiver_rejection_no_zip_claim",
          "status": "passed"
        }
      ],
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_READBACK/1",
      "kind": "controls",
      "source": "4f382419ad483ae3cc214e1a49d1d09d4b5db947",
      "run": "43425740095",
      "attempt": 1,
      "artifactId": "14037046667",
      "uploadedDigest": "759148353c4fed51be11db85163afe4301b864301de290e90c9ceb96dc96385b",
      "status": "verified",
      "reason": "none",
      "proof": "strict_current_safe_pair",
      "metadataBytes": 1392,
      "metadataDigest": "sha256:759148353c4fed51be11db85163afe4301b864301de290e90c9ceb96dc96385b",
      "rawZipBytes": 1392,
      "rawZipSha256": "759148353c4fed51be11db85163afe4301b864301de290e90c9ceb96dc96385b",
      "resultBytes": 1666,
      "resultSha256": "333af0ec16160e270aef4c0252d111fbfd21786993d39b928250be34f1e2e5d8",
      "manifestBytes": 265,
      "manifestSha256": "444324796e1731aaab41843a13da181cdc3e22ae3fea31cb06c46555befd2597",
      "expiresAt": "2026-11-20T12:30:54Z",
      "producerStatus": "passed",
      "upstream": "not_applicable",
      "accepted": true,
      "programHashes": {
        "adapter": "70e2a1e781ea9ece677c2fb05bc5bf25418b2999124400676884a3ebbe0b04a9",
        "controls": "25d28b9955fa99eb35d9877b87fe99a2cfbd81219343b3f7695501f875454abe",
        "verifier": "94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf",
        "safeZip": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"
      },
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    }
  ],
  "syntaxAndCaseRecords": [
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "dag_peer_inventory",
      "id": "b_inventory_optional_nonexecuting_receiver",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "dag_peer_inventory",
      "id": "b_inventory_optional_nonexecuting_receiver",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "dag_peer_inventory",
      "id": "mutation_setup_failure_cannot_count_as_validator_rejection",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "dag_peer_inventory",
      "id": "mutation_setup_failure_cannot_count_as_validator_rejection",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "dag_peer_inventory",
      "id": "actual_b_dependency_and_attempt_endpoint_targets",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "dag_peer_inventory",
      "id": "actual_b_dependency_and_attempt_endpoint_targets",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "key_scope",
      "id": "all_twenty_six_exact_crypto_step_bindings",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "key_scope",
      "id": "all_twenty_six_exact_crypto_step_bindings",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "key_scope",
      "id": "global_secret_alias_and_outer_scope_references_rejected",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "key_scope",
      "id": "global_secret_alias_and_outer_scope_references_rejected",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "key_scope",
      "id": "secret_run_and_ambiguous_context_references_rejected",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "key_scope",
      "id": "secret_run_and_ambiguous_context_references_rejected",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "key_scope",
      "id": "inert_parent_environment_is_restored",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "key_scope",
      "id": "inert_parent_environment_is_restored",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "fixed_case_counts",
      "id": "fixed_pins_native_tap_cases_and_complete_f8_action",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "fixed_case_counts",
      "id": "fixed_pins_native_tap_cases_and_complete_f8_action",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "fixed_case_counts",
      "id": "private_original_clocks_and_owned_case_identities",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "fixed_case_counts",
      "id": "private_original_clocks_and_owned_case_identities",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "fixed_case_counts",
      "id": "all_rewritten_shell_and_node_bodies_compile_only",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SYNTAX/1",
      "shellPrograms": 110,
      "nodePrograms": 63,
      "inspectedBodiesExecuted": false,
      "NativeExecuted": false,
      "SDKImported": false,
      "MFAllocated": false,
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "fixed_case_counts",
      "id": "all_rewritten_shell_and_node_bodies_compile_only",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "metadata_custody_binding",
      "id": "metadata_current_identity_and_complete_pure_binding",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "metadata_custody_binding",
      "id": "metadata_current_identity_and_complete_pure_binding",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "metadata_custody_binding",
      "id": "generic_aead_zip3_and_reopened_proof_bytes",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "metadata_custody_binding",
      "id": "generic_aead_zip3_and_reopened_proof_bytes",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "metadata_custody_binding",
      "id": "whole_job_outer_receipt_accepts_multiple_synthetic_copies",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "metadata_custody_binding",
      "id": "whole_job_outer_receipt_accepts_multiple_synthetic_copies",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "metadata_custody_binding",
      "id": "whole_job_generic_receipt_boundaries_and_partial_zero",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "metadata_custody_binding",
      "id": "whole_job_generic_receipt_boundaries_and_partial_zero",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "metadata_custody_binding",
      "id": "operation_raw_cap_edges_and_b_twenty_second_timeout",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "metadata_custody_binding",
      "id": "operation_raw_cap_edges_and_b_twenty_second_timeout",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "pure_receipt_commits_after_original_stage_success_only",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "pure_receipt_commits_after_original_stage_success_only",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "eligible_projection_receipts_load_and_parse_failures",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "eligible_projection_receipts_load_and_parse_failures",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "failed_pure_receipt_write_is_not_read_and_retains_assignment",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "failed_pure_receipt_write_is_not_read_and_retains_assignment",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "failed_proof_receipt_write_is_not_read_after_open",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "failed_proof_receipt_write_is_not_read_after_open",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "shared_projection_observed_failures_and_retained_assignment",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "shared_projection_observed_failures_and_retained_assignment",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "failure_kind_proof_remains_ineligible_after_validation",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "failure_kind_proof_remains_ineligible_after_validation",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "actual_publication_guards_order_and_full_pure_gate",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "actual_publication_guards_order_and_full_pure_gate",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "valid_failed_pair_and_receiver_self_control_failure_record",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "incomplete_or_contradictory",
      "id": "valid_failed_pair_and_receiver_self_control_failure_record",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "same_full_suite_route_projection_and_final_reconciliation",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "same_full_suite_route_projection_and_final_reconciliation",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "nonpass_reconciles_all_available_assignments",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "nonpass_reconciles_all_available_assignments",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "missing_safe_observes_attempt1_jobs_and_all_direct_metadata",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "missing_safe_observes_attempt1_jobs_and_all_direct_metadata",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "id_only_safe_retains_id_without_safe_traffic",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "id_only_safe_retains_id_without_safe_traffic",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "other_malformed_partial_and_http_safe_routes_reconcile",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "other_malformed_partial_and_http_safe_routes_reconcile",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "actual_needs_capture_rejects_malformed_context_without_artifacts",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "actual_needs_capture_rejects_malformed_context_without_artifacts",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "validated_needs_absence_partial_and_404_keep_route_meanings",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "validated_needs_absence_partial_and_404_keep_route_meanings",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "final_current_metadata_source_run_and_direct_needs_edges",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "final_current_metadata_source_run_and_direct_needs_edges",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "closed_schema_flags_profiles_counts_and_extra_fields",
      "phase": "start",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_SUBCASE/1",
      "family": "coherent_current_pair",
      "id": "closed_schema_flags_profiles_counts_and_extra_fields",
      "phase": "passed",
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    },
    {
      "marker": "AFW_COHERENT_SUITE_CONTROLS/1",
      "status": "passed",
      "expected": 6,
      "completed": 6,
      "passed": 6,
      "failed": 0,
      "inventory": [
        {
          "id": "dag_peer_inventory",
          "status": "passed"
        },
        {
          "id": "key_scope",
          "status": "passed"
        },
        {
          "id": "fixed_case_counts",
          "status": "passed"
        },
        {
          "id": "metadata_custody_binding",
          "status": "passed"
        },
        {
          "id": "incomplete_or_contradictory",
          "status": "passed"
        },
        {
          "id": "coherent_current_pair",
          "status": "passed"
        }
      ],
      "firstFailure": null,
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    }
  ]
}
```

## Exact closure Root independent readback

```json
{
  "source": "08f5d5f203efef09999ea2f6f0e899637af0bdf4",
  "tree": "d86acb49d2026d2207eeb35ff97f728dc014e7d9",
  "prior3195LeavesExact": true,
  "leaves": 3196,
  "soleNewReport": "docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md",
  "reportSha": "a74aaaee7ac5ab5e3c42cc9d36e0c8395a17b1c6",
  "reportChars": 177489,
  "F7exact": true,
  "mainUnchanged": true,
  "runId": "43425740095",
  "runSource": "4f382419ad483ae3cc214e1a49d1d09d4b5db947",
  "runCompleted": true,
  "allDeclaredJobsTerminal": true,
  "declaredJobs": 10,
  "fiveBranchActiveStatusesZero": true,
  "all62WorkflowBlobsExact": true,
  "providerRuntimeRead": false,
  "operationalReadiness": false,
  "PCoff": false,
  "restore": "55b16c841b7212fc962273ce8dcdd74ded4170a0",
  "restoreParent": "4f382419ad483ae3cc214e1a49d1d09d4b5db947",
  "restoreTreeExactPreWave": "31aa47c288c8877133941447e3e8e8bb7984f53f",
  "prefixChars": 132654,
  "fullReportHash": {
    "bytes": 177547,
    "sha256": "0f0de84240db9b600cc3e75efcbfed5b2cb1b24dba4e9d693bdf295fc4d5344f",
    "blob": "a74aaaee7ac5ab5e3c42cc9d36e0c8395a17b1c6"
  },
  "closedCommitRuns": 0
}
```

## Review scope

VerdictFF-I1,FF-I2,FF-M1 addressed/not and newCritical/ImportantregressionsintroducedbyTHISfixonly. Out-of-scopeobservationsnonblockinglistedseparately. No redoingunchangedwholeplan/tests or broadeningtoNative/runtime. CurrentKEYLESSpassisevidenceforcorrectedhelpersonly; no P1/Djointproof/readonlyseal/realAFW/PC-offrepairclaimed. NoSource/permissions/runtime/mainpromotion orsecondfixwaveauthorizedbyreview.
