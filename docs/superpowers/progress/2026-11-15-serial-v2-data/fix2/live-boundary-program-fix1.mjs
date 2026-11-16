// Fix1 covering controls. Authored STRING first; future Root GitHub gate only.
export function loaderBoundaryControls({assert,createHash,gunzipSync,spawnSync,workflowText,fix,compat,context,env}) {
 const hash=b=>createHash('sha256').update(b).digest('hex');
 const blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
 const verify=(bytes,p)=>{assert.equal(bytes.length,p.bytes);assert.equal(hash(bytes),p.sha256);assert.equal(blob(bytes),p.blob);};
 const name='Check serial entry pin reuse',marker='AFW_SERIAL_PIN_UNIT';
 const stepStart='      - name: '+name+'\n',nextStep='      - name: Run declared full104 controls only\n';
 const once=(text,needle)=>{assert.equal(text.split(needle).length,2);return text.indexOf(needle);};
 const stepFromFull=text=>{const start=once(text,stepStart),end=once(text,nextStep);assert(end>start);return text.slice(start,end);};
 function heredoc(step,opening){
  const start=once(step,opening)+opening.length,end=once(step,'          '+marker+'\n');assert(end>start);
  const indented=step.slice(start,end);assert(indented.endsWith('\n'));
  const rows=indented.slice(0,-1).split('\n');assert(rows.every(x=>x.startsWith('          ')));
  return rows.map(x=>x.slice(10)).join('\n')+'\n';
 }
 const badOpening="          node --input-type=module <<'AFW_SERIAL_PIN_UNIT'\n";
 const goodOpening="          if node --input-type=module 2>/dev/null <<'AFW_SERIAL_PIN_UNIT'\n";
 const zip=Buffer.from(fix.badStep.data,'base64');
 assert.equal(zip.toString('base64'),fix.badStep.data);assert.equal(zip.length,fix.badStep.zipBytes);assert.equal(hash(zip),fix.badStep.zipSha256);
 const badBytes=gunzipSync(zip,{maxOutputLength:32768});verify(badBytes,fix.badStep);
 const badStep=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(badBytes);
 assert(badStep.startsWith(stepStart));assert(badStep.endsWith('          AFW_SERIAL_PIN_UNIT\n'));
 assert.equal(fix.badStep.sourceWorkflow.blob,'757f95ff72ead519a01e3ecaead2bd2925b35189');
 assert.equal(fix.badStep.sourceWorkflow.bytes,53811);
 assert.equal(fix.badStep.offsetBytes+fix.badStep.bytes,fix.badStep.endBytes);
 assert.equal(fix.badStep.nextStep,nextStep);assert.equal(fix.badStep.separatorLF,1);
 const badBody=heredoc(badStep,badOpening),badLoader=badBody.slice(0,-1);
 assert(badLoader.endsWith('\n'));assert.equal(badBody,badLoader+'\n');
 verify(Buffer.from(badLoader),fix.badLoader);
 assert.equal(blob(Buffer.from(badLoader)),'fc82133f1f7339c2dfa7ddbbe99066151235830e');
 // Fixed construction control only. No Source compilation occurs in this check.
 assert.equal((badLoader.match(/\bconst wire\b/g)??[]).length,2);
 assert.equal((badBody.match(/\bconst wire\b/g)??[]).length,2);
 const goodZip=Buffer.from(fix.goodLoader.data,'base64');assert.equal(goodZip.toString('base64'),fix.goodLoader.data);assert.equal(goodZip.length,fix.goodLoader.zipBytes);assert(goodZip.length<=fix.goodLoader.zipCap&&fix.goodLoader.zipCap===32768);assert.equal(hash(goodZip),fix.goodLoader.zipSha256);
 const goodBytes=gunzipSync(goodZip,{maxOutputLength:32768});verify(goodBytes,fix.goodLoader);const nominatedGoodLoader=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(goodBytes);
 const correctedStep=stepFromFull(workflowText);
 const correctedBody=heredoc(correctedStep,goodOpening),correctedLoader=correctedBody.slice(0,-1);
 assert.equal(nominatedGoodLoader.split(compat.head.from).length,2);const nominatedLiveLoader=nominatedGoodLoader.replace(compat.head.from,compat.head.to);verify(Buffer.from(nominatedLiveLoader),compat.liveUnit);verify(Buffer.from(correctedLoader),compat.liveUnit);assert.equal(correctedBody,nominatedLiveLoader+'\n');
 function correctedBindings(text){
  assert.equal((text.match(/\bconst wire\b/g)??[]).length,0);
  assert.equal((text.match(/\bconst carrierJson\b/g)??[]).length,1);
  assert.equal((text.match(/\bconst unitFrame\b/g)??[]).length,1);
  for(const needle of ['payload=JSON.parse(carrierJson)','assert.equal(JSON.stringify(payload),carrierJson)','const unitFrame=unit.serialPinUnit(','typeof unitFrame','Buffer.byteLength(unitFrame)','unitFrame.split(','unitFrame.endsWith(','unitFrame.startsWith(','unitFrame.slice(','process.stdout.write(unitFrame)'])once(text,needle);
  assert(text.includes("assert.equal(frame+JSON.stringify(data)+'\\n',unitFrame)"));
 }
 correctedBindings(correctedLoader);correctedBindings(correctedBody);
 assert.equal(correctedLoader,nominatedLiveLoader);
 assert(correctedLoader.includes("'AFW-Q1-SERIAL-LAB-V2-FIX2-ONEUSE-20261115'"));
 // The actual checked-out YAML determines both the invocation and complete status wrapper.
 const run='        run: |\n',runStart=once(correctedStep,run)+run.length;
 const runRows=correctedStep.slice(runStart).replace(/\n$/,'').split('\n');assert(runRows.every(x=>x.startsWith('          ')));
 const exactShell=runRows.map(x=>x.slice(10)).join('\n')+'\n';
 const payloadBody=correctedBody;
 assert.equal(exactShell.split(payloadBody).length,2);
 assert(exactShell.includes("if node --input-type=module 2>/dev/null <<'AFW_SERIAL_PIN_UNIT'"));
 assert(exactShell.endsWith("AFW_SERIAL_PIN_UNIT\nthen\n  :\nelse\n  printf '%s\\n' 'AFW_SERIAL_ENTRY_PIN_UNIT_FAILED' >&2\n  exit 1\nfi\n"));
 const fullGate="if: \u0024{{ always() && steps.loaderBoundary.conclusion == 'success' && steps.serialPins.conclusion == 'success' && steps.checkout.outcome == 'success' && steps.node.outcome == 'success' }}";
 assert(workflowText.includes(fullGate));
 assert(correctedStep.includes("steps.loaderBoundary.conclusion == 'success'"));
 const fullEligible=(boundary,serial)=>boundary==='success'&&serial==='success';
 assert.equal(fullEligible('success','success'),true);assert.equal(fullEligible('failure','success'),false);
 const fixedMarker='AFW_SERIAL_ENTRY_PIN_UNIT_FAILED\n';
 const fixtureFrame='AFW_SERIAL_ENTRY_PIN_UNIT/1 {"fixtureOnly":true}\n';
 const fixtures=[
  {name:'syntaxFailure',program:'const harmlessBinding=1;\nconst harmlessBinding=2;\n',ok:false},
  {name:'oversizedStderrFailure',program:"process.stderr.write('HARMLESS_DIAGNOSTIC'.repeat(512));process.exitCode=7;\n",ok:false},
  {name:'assertionFailure',program:"import assert from 'node:assert/strict';assert.equal(1,2);\n",ok:false},
  {name:'singleFrameSuccess',program:'process.stdout.write('+JSON.stringify(fixtureFrame)+');\n',ok:true}
 ];
 const outcomes={};
 assert.equal(fixtures.length,4);assert.equal(typeof env.PATH,'string');assert(env.PATH.length<=4096&&!env.PATH.includes('\0'));
 for(const fixture of fixtures){
  const script=exactShell.replace(payloadBody,fixture.program);
  const result=spawnSync('/bin/bash',['--noprofile','--norc','-c',script],{env:{PATH:env.PATH,HOME:'/nonexistent',CI:'true',LANG:'C.UTF-8',TZ:'UTC'},stdio:['ignore','pipe','pipe'],encoding:'utf8',timeout:5000,maxBuffer:4096,killSignal:'SIGKILL'});
  assert.equal(result.error,undefined);assert.equal(result.signal,null);
  assert(Buffer.byteLength(result.stdout)<=4096);assert(Buffer.byteLength(result.stderr)<=4096);
  if(fixture.ok){assert.equal(result.status,0);assert.equal(result.stdout,fixtureFrame);assert.equal(result.stderr,'');assert.equal(fullEligible('success','success'),true);}
  else{assert(Number.isInteger(result.status)&&result.status!==0);assert.equal(result.stdout,'');assert.equal(result.stderr,fixedMarker);assert.equal(fullEligible('success','failure'),false);}
  outcomes[fixture.name]='passed';
 }
 // Synthetic unit-like fixture stdout is captured above and is never forwarded/logged.
 const summary={purpose:'afw.serial-loader.boundary-unit.v1',source:context.source,sourceTree:context.sourceTree,run:context.run,attempt:1,job:'readonly',node:'22.23.4',baselineBindingControl:'rejected',correctedBindingControl:'passed',syntaxFailure:outcomes.syntaxFailure,oversizedStderrFailure:outcomes.oversizedStderrFailure,assertionFailure:outcomes.assertionFailure,singleFrameSuccess:outcomes.singleFrameSuccess,fixtureOnly:true,nativeBusinessCases:0,nonclaims:{historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}};
 const frame='AFW_SERIAL_LOADER_BOUNDARY_UNIT/1 '+JSON.stringify(summary)+'\n';assert(/^[\x00-\x7f]*$/.test(frame));assert(Buffer.byteLength(frame)<=2048);return frame;
}
