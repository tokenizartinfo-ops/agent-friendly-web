function runC2RootRecordControls(receive,fixture,expected){
 const clone=x=>JSON.parse(JSON.stringify(x)), frame=x=>'AFW_C2_SOURCE_RECEIPT '+JSON.stringify(x)+'\n', done=[];
 const reject=(label,x)=>{let ok=false;try{receive(typeof x==='string'?x:frame(x),expected);}catch(e){ok=e.message==='C2_RECEIPT_UNQUALIFIED';}if(!ok)throw Error('OWN_CONTROL_NOT_REJECTED:'+label);done.push(label);};
 const change=(label,path,value,remove=false)=>{const x=clone(fixture);let o=x;for(const k of path.slice(0,-1))o=o[k];if(remove)delete o[path.at(-1)];else o[path.at(-1)]=value;reject(label,x);};
 const contextChanges={repository:'other/repo',baselineSource:'a'.repeat(40),baselineTree:'a'.repeat(40),proposalIndexHash:'b'.repeat(64),head:'c'.repeat(40),tree:'d'.repeat(40),runId:'999',runAttempt:2,job:'other',node:'v22.23.5'};
 const positive=receive(frame(fixture),expected);
 change('schema',['schema'],'unknown');change('unknown-top',['extra'],false);
 for(const [key,value]of Object.entries(contextChanges))change('context-'+key,['context',key],value);
 change('missing-context-key',['context','tree'],null,true);change('run-number',['context','runId'],100);change('run-leading-zero',['context','runId'],'0100');change('attempt-string',['context','runAttempt'],'1');
 for(const key of ['path','sha256','bytes'])change('admitted-'+key,['admitted',0,key],key==='bytes'?124:key==='path'?'lib/other.mjs':'d'.repeat(64));
 change('empty-admitted',['admitted'],[]);change('extra-admitted',['admitted'],[...fixture.admitted,clone(fixture.admitted[0])]);
 change('modes-reorder',['runs'],clone(fixture.runs).reverse());change('missing-mode',['runs'],clone(fixture.runs).slice(1));change('mode-label',['runs',0,'mode'],'other');change('baseline-exit0',['runs',0,'exitCode'],0);change('green-exit1',['runs',1,'exitCode'],1);change('green-qualified-false',['runs',1,'qualified'],false);change('green-qualified-string',['runs',1,'qualified'],'true');
 change('case-missing',['runs',1,'cases'],clone(fixture.runs[1].cases).slice(1));change('case-extra',['runs',1,'cases'],[...clone(fixture.runs[1].cases),clone(fixture.runs[1].cases[0])]);change('case-reorder',['runs',1,'cases'],clone(fixture.runs[1].cases).reverse());
 for(const [key,value]of [['id','other'],['status','skip'],['phase','oauth'],['code','CAPTURE_INVALID'],['extra','bad']])change('case-'+key,['runs',1,'cases',0,key],value);
 for(const [name,value]of [['negative',-1],['fraction',1.5],['overflow',4],['boolean',true],['string','1'],['null',null]])change('counter-'+name,['runs',1,'cases',0,'counters','upload'],value);
 change('counter-missing',['runs',1,'cases',0,'counters','upload'],null,true);change('counter-extra',['runs',1,'cases',0,'counters','other'],0);change('counter-hierarchy',['runs',1,'cases',0,'counters','receipts'],2);change('counter-main-reset',['runs',1,'cases',4,'counters'],{upload:0,activation:0,receipts:0});change('green-missing-stage3',['runs',1,'cases',15,'counters'],{upload:2,activation:2,receipts:2});
 {const x=clone(fixture);x.runs[1].cases[19].status='fail';x.runs[1].cases[19].code='TEST_FAILED';reject('green-hidden-failure',x);}
 {const x=clone(fixture);x.runs[0].cases[11].status='pass';x.runs[0].cases[11].code='OK';reject('baseline-no-causal-red',x);}
 {const x=clone(fixture);x.runs[0].cases[0].status='fail';x.runs[0].cases[0].code='TEST_FAILED';reject('baseline-no-connection',x);}
 {const x=clone(fixture);for(let i=0;i<17;i++)x.runs[0].cases[i].counters={upload:0,activation:0,receipts:0};reject('baseline-zero-as-missing',x);}
 {const x=clone(fixture);x.runs[2].cases[10].status='pass';x.runs[2].cases[10].code='OK';reject('mutant-missing-kill',x);}
 change('mutant-exit0',['runs',2,'exitCode'],0);change('regressions-missing',['regressions'],null,true);change('regressions-exit1',['regressions','exitCode'],1);change('regressions-exit-string',['regressions','exitCode'],'0');change('regressions-missing-case',['regressions','cases'],clone(fixture.regressions.cases).slice(1));change('regressions-extra-case',['regressions','cases'],[...clone(fixture.regressions.cases),clone(fixture.regressions.cases[0])]);change('regressions-reorder',['regressions','cases'],clone(fixture.regressions.cases).reverse());
 for(const [key,value]of [['id','OTHER'],['status','skip'],['code','TEST_FAILED'],['extra','bad']])change('regression-'+key,['regressions','cases',0,key],value);
 change('regression-selection-hash',['regressions','selectionHash'],'d'.repeat(64));change('invented-excluded',['regressions','excluded'],{count:0,sha256:'d'.repeat(64)});
 for(const key of Object.keys(fixture.nonclaims)){change('nonclaim-'+key,['nonclaims',key],true);}
 change('nonclaim-string',['nonclaims','PCoff'],'false');change('nonclaim-missing',['nonclaims','PCoff'],null,true);change('nonclaim-extra',['nonclaims','other'],false);
 const raw=frame(fixture);
 for(const [name,text]of [['no-LF',raw.slice(0,-1)],['double-LF',raw+'\n'],['duplicate-frame',raw+raw],['leading', 'note'+raw],['old-marker',raw.replace('AFW_C2_SOURCE_RECEIPT','OLD')],['spacing',raw.replace('{"schema":','{ "schema":')],['duplicate-key',raw.replace('{"schema":','{"schema":"bad","schema":')],['oversize','AFW_C2_SOURCE_RECEIPT '+JSON.stringify({...fixture,padding:'x'.repeat(24576)})+'\n'],['invalid','AFW_C2_SOURCE_RECEIPT {\n'],['surrogate','AFW_C2_SOURCE_RECEIPT '+String.fromCharCode(0xd800)+'\n']])reject(name,text);
 return {scope:'synthetic OWN controller only; no Source or actual API qualification',positive:1,negative:done.length,cases:done,positiveResult:positive};
}
