// AFW serial entry-pin unit v1. GitHub-only; no case process is started.
// Inputs are fixed Source DATA decoded by the F7-owned loader.
export function serialPinUnit({assert,createHash,gzipSync,posix,normal,candidate,source,sourceTree,run}) {
 const digest=b=>createHash('sha256').update(b).digest('hex');
 const old=normal.helpers['controls.mjs'],next=candidate.helpers['controls.mjs'];
 assert.equal(digest(old),'060c5b493d3c832efb057e786ccb622adfef0c14233cf5e394b053485981e7df');
 assert.equal(Object.keys(normal.helpers).length,33);
 assert.deepEqual(Object.keys(normal),Object.keys(candidate));
 const changed=Object.keys(normal.helpers).filter(k=>normal.helpers[k]!==candidate.helpers[k]);
 assert.deepEqual(changed,['controls.mjs']);
 const clone=x=>JSON.parse(JSON.stringify(x));
 const once=(s,needle)=>{assert.equal(s.split(needle).length,2,needle);return s.indexOf(needle);};
 const slice=(s,start,end)=>s.slice(once(s,start),once(s,end));
 const pinStart='function entryPin(bytes){',retargetStart='function retargetEntries(t){';
 // Both versions retain exact entryPin; candidate adds private selection between functions.
 const pinBody=old.slice(once(old,pinStart),once(old,'\nfunction retargetEntries(t){'));
 const nextPinBody=next.slice(once(next,pinStart),once(next,'\nconst pristinePins='));
 assert.equal(nextPinBody,pinBody);
 const oldRegion=slice(old,retargetStart,"\n\nimport {jsonFixed}");
 const newRegion=slice(next,'const pristinePins=',"\n\nimport {jsonFixed}");
 const before=old.slice(0,old.indexOf(retargetStart)),after=old.slice(old.indexOf("\n\nimport {jsonFixed}"));
 assert.equal(next,before+newRegion+'\n'+after.slice(1));
 const build=slice(old,'function build(instance){','\nfunction runRole(');
 const change=slice(old,'function change(t,scenario){','\nfunction cleanupOwn(');
 const prepare=slice(old,' const t=build(instance);let staged;',"\n if(row.expected.kind==='lifetime')");
 assert.equal(slice(next,'function build(instance){','\nfunction runRole('),build);
 assert.equal(slice(next,'function change(t,scenario){','\nfunction cleanupOwn('),change);
 assert.equal(slice(next,' const t=build(instance);let staged;',"\n if(row.expected.kind==='lifetime')"),prepare);
 const deadline='\nconst controlDeadline=performance.now()+90000;\n';
 once(old,deadline);once(next,deadline);
 assert.equal(old.slice(old.indexOf('function cleanupOwn(')),next.slice(next.indexOf('function cleanupOwn(')));
 const matrix=JSON.parse(normal.helpers['matrix.json']),fixtures=JSON.parse(normal.helpers['fixtures.json']);
 assert.equal(matrix.ordered.length,104);assert.equal(matrix.mutants.length,4);
 assert.deepEqual(matrix.mutants.map(m=>m.id),['M_RAW','M_PROVENANCE','M_OUTPUT','M_ASSOC']);
 const entries=['delivery-entry.sh','controls-entry.sh','missing-cwd-entry.sh'];
 const names=Object.keys(normal.helpers),groups=[null,...matrix.mutants.map(m=>m.id)];
 // Root ruling: unchanged change body; strict synthetic make-fifo dependency only.
 // The actual role function is neither extracted nor evaluated.
 const fifoFrom="const r=runRole(t,'make-fifo',{timeout:3000});if(r.error||r.status!==0)throw 1;";
 once(change,fifoFrom);
 const preparedChange=change; // Root ruling: unchanged Source body, synthetic dependency only.
 const boundary=prepare+'\n return {t,staged};';
 assert(!boundary.includes('runRole(')&&!boundary.includes('counterexample('));
 // A tiny bounded filesystem models preparation operations, inode links and permission metadata.
 // It has no node:fs dependency, host path access, process creation or oracle implementation.
 function memoryFS() {
  const files=new Map(),fds=new Map(),log=[];let serial=0,fdSerial=9,reads=0,hook=null;
  const clean=p=>{assert.equal(typeof p,'string');const q=posix.normalize(p);assert(q==='/unit'||q.startsWith('/unit/'));return q;};
  const locate=(p,follow=true)=>{let q=clean(p);for(let n=0;n<16;n++){const parts=q.split('/');let changed=false;for(let i=2;i<=parts.length;i++){const key=parts.slice(0,i).join('/'),item=files.get(key);if(item?.type==='symlink'&&(follow||i<parts.length)){q=posix.join(item.target,...parts.slice(i));changed=true;break;}}if(!changed)return q;}throw Error('symlink loop');};
  const get=(p,follow=true)=>{const key=locate(p,follow),v=files.get(key);if(!v)throw Object.assign(Error('ENOENT'),{code:'ENOENT'});return v;};
  const inode=(type,mode,bytes=Buffer.alloc(0))=>({id:++serial,type,mode,bytes:Buffer.from(bytes)});
  const stats=p=>{const v=typeof p==='number'?fds.get(p):get(p);assert(v);return{dev:1,ino:v.id,size:v.bytes.length,mtimeNs:1000+nothing(v),mode:v.mode};};
  const nothing=()=>0;
  const api={
   readFileSync(p,encoding){log.push(['read',p]);reads++;if(hook){const v=hook(p,reads,api);if(v!==undefined)return encoding?Buffer.from(v).toString(encoding):Buffer.from(v);}const v=get(p);assert.equal(v.type,'file');return encoding?v.bytes.toString(encoding):Buffer.from(v.bytes);},
   writeFileSync(p,data,options={}){const b=Buffer.from(data);if(typeof p==='number'){const v=fds.get(p);assert(v);v.bytes=b;return;}const q=locate(p);log.push(['write',p]);let v=files.get(q);if(options.flag==='wx'&&v)throw Error('EEXIST');if(!v){v=inode('file',options.mode??0o666);files.set(q,v);}assert.equal(v.type,'file');v.bytes=b;},
   mkdirSync(p,{recursive=false,mode=0o777}={}){const q=clean(p);if(recursive){const bits=q.split('/');for(let i=2;i<=bits.length;i++){const path=bits.slice(0,i).join('/');if(!files.has(path))files.set(path,inode('dir',mode));}}else{assert(!files.has(q));files.set(q,inode('dir',mode));}},
   mkdtempSync(p){const q=clean(p)+String(++serial).padStart(6,'0');assert(!files.has(q));files.set(q,inode('dir',0o700));return q;},
   chmodSync(p,mode){get(p).mode=mode;},
   unlinkSync(p){assert(files.delete(locate(p,false)));},
   renameSync(from,to){const a=locate(from,false),b=clean(to);assert(files.has(a));for(const[k,v]of [...files])if(k===a||k.startsWith(a+'/')){files.delete(k);files.set(b+k.slice(a.length),v);}},
   symlinkSync(target,p){files.set(clean(p),{...inode('symlink',0o777),target:clean(target)});},
   linkSync(a,b){assert(!files.has(clean(b)));files.set(clean(b),get(a));},
   openSync(p,flags,mode){const q=clean(p);assert(!files.has(q));const v=inode('file',mode);files.set(q,v);const fd=++fdSerial;fds.set(fd,v);return fd;},
   statSync:stats,fstatSync:stats,
   makePreparationFIFO(p){assert(!files.has(clean(p)));files.set(clean(p),inode('fifo',0o600));},
   reset(){files.clear();fds.clear();log.length=0;fdSerial=9;reads=0;hook=null;},
   snapshot(){assert(files.size<=128);return [...files].sort(([a],[b])=>a.localeCompare(b)).map(([path,v])=>({path,type:v.type,mode:v.mode,ino:v.id,target:v.target??null,bytes:v.bytes.toString('base64')}));},
   log,files,setHook(value){hook=value;},clearLog(){log.length=0;reads=0;},
  };
  return api;
 }
 const fsKeys=['readFileSync','writeFileSync','mkdirSync','mkdtempSync','chmodSync','unlinkSync','renameSync','symlinkSync','linkSync','openSync','statSync','fstatSync','makePreparationFIFO'];
 function harness(text,variant=null) {
  const fs=memoryFS(),pristine=Object.fromEntries(names.map(n=>[n,Buffer.from(n==='controls.mjs'?text:normal.helpers[n])]));
  let calculations=0,calls=0;const checkpoints=[];
  let region=text===old?oldRegion:newRegion;
  const recipes={
   M_LENGTH:["bytes.equals(pristine[name])","bytes.length===pristine[name].length"],
   M_SECOND:["deliveryBytes!==undefined&&bytes.equals(deliveryBytes)","deliveryBytes!==undefined"],
   M_RECOMPUTE:["const serialized=key==='_r3_kernel'?(kernelPin??=selectPin(name,bytes)):\n    module==='delivery-outer.mjs'&&deliveryBytes!==undefined&&bytes.equals(deliveryBytes)?deliveryPin:selectPin(name,bytes);","const serialized=JSON.stringify(entryPin(bytes));"],
  };
  if(variant){const[from,to]=recipes[variant];once(region,from);region=region.replace(from,to);}
  // Sole Source evaluation point, reached only when the GitHub preflight invokes this export.
  const sourceText=pinBody+'\n'+region+'\n'+build+'\n'+preparedChange+
   '\nfunction prepareCase(row,mutant,instance){'+boundary+'\n}\nreturn {retargetEntries,prepareCase,build,change};';
  const ctx={source:'1'.repeat(40),sourceTree:'2'.repeat(40),run:'12345',attempt:1,job:'readonly',node:'22.23.4'};
  const env={RUNNER_TEMP:'/unit',PATH:'/synthetic/path',HOME:'/unit/home'};
  const put=(p,s)=>fs.writeFileSync(p,s,{mode:0o600,flag:'wx'});
  let retargetResult;
  const factory=new Function(...fsKeys,'join','dirname','createHash','gzipSync','Buffer','pristine','e','ctx','fixtures','matrix','names','canary','count','clone','put','live','external','constants','observe','runRole', 
   'let sandbox;\n'+sourceText.replaceAll('function retargetEntries(t){','function retargetEntriesActual(t){')+
   '\nfunction retargetEntries(t){const start=observe.before(t);try{return retargetEntriesActual(t);}finally{observe.after(t,start);}}');
  const preparationRole=(t,role,options)=>{assert.equal(role,'make-fifo');assert.deepEqual(options,{timeout:3000});assert.equal(t.file,posix.join(t.cwd,'output','finite-budget','readonly','R3','r3-existing-sample.json'));assert.equal(t.own,posix.join(t.temp,'afw-r3-delivery'));fs.makePreparationFIFO(t.file);return{error:undefined,status:0};};
  assert.throws(()=>preparationRole({},'case-delivery',{timeout:3000}));
  assert.throws(()=>preparationRole({},'make-fifo',{timeout:1}));
  const observe={before(t){calls++;return fs.log.length;},after(t,start){const log=fs.log.slice(start).map(x=>[...x]);checkpoints.push({own:t.own,log,entries:entries.map(n=>{const item=fs.files.get(posix.join(t.own,n));return{bytes:item.bytes.toString('base64'),mode:item.mode};})});}};
  retargetResult=factory(...fsKeys.map(k=>fs[k]),posix.join,posix.dirname,createHash,(b,o)=>{calculations++;return gzipSync(b,o);},Buffer,pristine,env,ctx,fixtures,matrix,names,matrix.privateCanary,matrix.ordered.length,clone,put,new Map(),new Map(),{O_WRONLY:1,O_CREAT:64,O_EXCL:128,O_NOFOLLOW:131072},observe,preparationRole);
  return{...retargetResult,fs,pristine,checkpoints,get calculations(){return calculations;},get calls(){return calls;},reset(){fs.reset();checkpoints.length=0;},newCase(id='edge'){fs.reset();for(const name of names)fs.writeFileSync('/unit/own/'+name,pristine[name],{mode:0o600});return{own:'/unit/own',instance:id};}};
 }
 const left=harness(old),right=harness(next);
 const snap=h=>h.fs.snapshot().map(x=>{if(x.path.endsWith('/controls.mjs')&&x.type==='file'){const text=Buffer.from(x.bytes,'base64').toString();x.bytes=Buffer.from(text.replace(newRegion,oldRegion)).toString('base64');}return x;});
 function pins(checkpoint) {
  for(const entry of checkpoint.entries) {
   assert.equal(entry.mode,0o600);const text=Buffer.from(entry.bytes,'base64').toString('utf8');
   for(const key of ['_r3_kernel','_r3_module']){
    const lines=text.split('\n').filter(line=>line.startsWith(key+'='));assert.equal(lines.length,1);
    const p=JSON.parse(lines[0].slice(key.length+1));assert.deepEqual(Object.keys(p),['bytes','sha256','zipBytes','zipSha256','data','cap']);
    const zip=Buffer.from(p.data,'base64');assert.equal(zip.length,p.zipBytes);assert.equal(digest(zip),p.zipSha256);
   }
  }
 }
 let cases=0,rendered=0;const pathControls=[];
 for(const mutant of groups)for(const row of matrix.ordered){
  left.reset();right.reset();
  const instance=(mutant??'baseline')+':'+row.id;
  const a=left.prepareCase(row,mutant,instance),b=right.prepareCase(row,mutant,instance);
  assert.equal(a.t.own,b.t.own);
  assert.deepEqual(left.checkpoints,right.checkpoints,instance);
  assert.equal(left.checkpoints.length,row.scenario.startsWith('prestart-')?1:2);
  for(const point of left.checkpoints){pins(point);rendered+=3;}
  // Includes all mutation-written files, markers, spools, modes and inode relationships.
  assert.deepEqual(snap(left),snap(right),instance);
  for(const point of right.checkpoints){
   const own=point.own;
   assert.deepEqual(point.log,[['read',own+'/lifetime.py'],['read',own+'/delivery-outer.mjs'],['write',own+'/delivery-entry.sh'],['read',own+'/controls-outer.mjs'],['write',own+'/controls-entry.sh'],['read',own+'/delivery-outer.mjs'],['write',own+'/missing-cwd-entry.sh']]);
  }
  if(['E02','E06'].includes(row.id)){
   pathControls.push(b.t.own);
   const body=b.t.own+'/delivery-outer.mjs',text=right.fs.readFileSync(body,'utf8');
   assert(right.fs.files.has(b.t.own+'/substitution.sh'));assert(text.includes(b.t.executionMarker));
   assert(text.includes("base+'/afw-r3-delivery/substitution.sh'"));assert(text.includes("base+'/afw-r3-delivery/replaced.sh'"));
  }
  if(row.id==='E05')assert(right.fs.readFileSync(b.t.own+'/lifetime.py','utf8').includes('os.execve(-1,args,dict(os.environ))'));
  if(row.id==='T01'){const body=right.fs.readFileSync(b.t.own+'/controls.mjs','utf8');assert(!body.includes(deadline));once(body,'\nconst controlDeadline=performance.now()-1;\n');}
  cases++;
 }
 assert.equal(pathControls.length,10);assert.equal(new Set(pathControls).size,10);
 assert.equal(cases,520);assert.equal(left.calls,1020);assert.equal(right.calls,1020);assert.equal(rendered,3060);
 assert.equal(left.calculations,6120);assert.equal(right.calculations,626);
 // Byte equality edge suite; each side sees identical captured filesystem reads.
 function byteEquivalent(a,b){try{assert.deepEqual(a,b);}catch(error){error.serialUnitByteEquivalence=true;throw error;}}
 function edgePair(variant=null) {
  const a=harness(old),b=harness(next,variant);
  function compare(edit=()=>{},hook=null,expectError=false){
   const ta=a.newCase(),tb=b.newCase();edit(a,ta);edit(b,tb);
   a.fs.clearLog();b.fs.clearLog();
   if(hook){a.fs.setHook(hook());b.fs.setHook(hook());}
   let ae,be;try{a.retargetEntries(ta);}catch(e){ae=true;}try{b.retargetEntries(tb);}catch(e){be=true;}
   assert.equal(Boolean(ae),expectError);assert.equal(Boolean(be),expectError);
   byteEquivalent(a.checkpoints.at(-1),b.checkpoints.at(-1));
  }
  compare();
  compare((h,t)=>{const p=t.own+'/delivery-outer.mjs',v=h.fs.readFileSync(p);v[0]^=1;h.fs.writeFileSync(p,v);}); // same length, unequal contents
  // Same process slots survive changed input and reversion.
  compare();compare((h,t)=>h.fs.writeFileSync(t.own+'/lifetime.py','altered kernel'));compare();
  compare(()=>{},()=>{let seen=0;return p=>{if(p.endsWith('/delivery-outer.mjs')&&++seen===2)return Buffer.from('different second delivery read');};});
  compare(()=>{},()=>p=>{if(p.endsWith('/controls-outer.mjs'))throw Error('unavailable read');},true);
  compare(()=>{},()=>{let seen=0;return p=>{if(p.endsWith('/delivery-outer.mjs')&&++seen===2)throw Error('second delivery unavailable');};},true);
  for(const name of entries)for(const key of ['_r3_kernel','_r3_module'])for(const duplicate of [false,true]){
   // Private pristine entry literals are instrumented only in this isolated test harness.
   const pa=a.pristine[name],pb=b.pristine[name];
   const corrupt=buf=>{const text=buf.toString(),line=text.split('\n').find(s=>s.startsWith(key+'='));assert(line);return Buffer.from(text.replace(line,duplicate?line+'\n'+line:'# missing '+key));};
   a.pristine[name]=corrupt(pa);b.pristine[name]=corrupt(pb);
   compare(()=>{},null,true);a.pristine[name]=pa;b.pristine[name]=pb;
  }
  return true;
 }
 edgePair();
 const killed={};
 for(const id of ['M_LENGTH','M_SECOND']){let red=false;try{edgePair(id);}catch(error){if(!error.serialUnitByteEquivalence)throw error;red=true;}assert(red,id);killed[id]='killed';}
 // Always-recompute must preserve all bytes on the complete corpus, but fail work count.
 const slow=harness(next,'M_RECOMPUTE'),reference=harness(old);
 for(const mutant of groups)for(const row of matrix.ordered){
  slow.reset();reference.reset();const instance=(mutant??'baseline')+':'+row.id;
  slow.prepareCase(row,mutant,instance);reference.prepareCase(row,mutant,instance);
  assert.deepEqual(slow.checkpoints,reference.checkpoints);
  assert.deepEqual(snap(slow),snap(reference));
 }
 assert.equal(slow.calculations,6120);assert.throws(()=>assert.equal(slow.calculations,626));killed.M_RECOMPUTE='killed';
 // Exact source admission predicate under controlled expired time: no build or prepare call.
 const admission=slice(old,'\nconst controlDeadline=performance.now()+90000;','\nconst e=process.env').slice(1);
 assert.equal(admission,'const controlDeadline=performance.now()+90000;\nconst admitCase=()=>performance.now()+20000<=controlDeadline;');
 let builds=0;const admitted=new Function('performance',admission.replace('performance.now()+90000','performance.now()-1')+'\nreturn admitCase();')({now:()=>1234});
 if(admitted)builds++;assert.equal(builds,0);assert.equal(admitted,false);
 const result={purpose:'afw.serial-entry-pin.unit.v1',source,sourceTree,run,attempt:1,job:'readonly',node:'22.23.4',normalSha256:digest(old),candidateSha256:digest(next),caseInputs:cases,retargetCalls:right.calls,renderedEntries:rendered,normalPinComputations:left.calculations,candidatePinComputations:right.calculations,byteEquivalence:true,readOrderPreserved:true,edgeControls:'passed',mutants:killed,nativeBusinessCases:0,nonclaims:{historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false}};
 const wire='AFW_SERIAL_ENTRY_PIN_UNIT/1 '+JSON.stringify(result)+'\n';
 assert(/^[\x00-\x7f]*$/.test(wire));assert(Buffer.byteLength(wire)<=2048);return wire;
}
