function(rawText,extras,normalRaw,normalSources){
 const need=(v,m)=>{if(!v)throw Error("CC1 Root DATA: "+m)},eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const p=JSON.parse(rawText);need(eq(Object.keys(p),Object.keys(normalRaw)),"rawkeys");
 for(const k of Object.keys(p))if(k!=="helpers")need(eq(p[k],normalRaw[k]),"metadata exact "+k);
 const names=Object.keys(normalRaw.helpers);need(eq(Object.keys(p.helpers),names)&&names.length===33,"33helpers");
 const anchor=" # AFW_LIFE_BEFORE_ARM\n",guard=" if os.getppid()!=before[0]:raise CreatorDead()\n";
 const old=normalRaw.helpers["lifetime.py"];need(old.split(anchor).length===2&&!old.includes(guard),"one anchor original");
 const kernel=old.replace(anchor,anchor+guard);need(p.helpers["lifetime.py"]===kernel,"one guard exact");
 const changed=names.filter(k=>p.helpers[k]!==normalRaw.helpers[k]);need(eq(changed,["delivery-entry.sh","controls-entry.sh","lifetime.py","missing-cwd-entry.sh"]),"exact4changed");
 const lines=t=>t.split("\n"),pinLine=(t,prefix)=>{const a=lines(t).filter(l=>l.startsWith(prefix));need(a.length===1,"one pin "+prefix);return a[0]};
 const kernelPin=pinLine(p.helpers["delivery-entry.sh"],"_r3_kernel=");
 const withoutKernel=t=>lines(t).filter(l=>!l.startsWith("_r3_kernel=")).join("\n");
 for(const name of ["delivery-entry.sh","controls-entry.sh","missing-cwd-entry.sh"]){
  need(withoutKernel(p.helpers[name])===withoutKernel(normalRaw.helpers[name]),"entryonlykernel "+name);
  need(pinLine(p.helpers[name],"_r3_kernel=")===kernelPin,"same seal "+name);
  need(p.helpers[name].includes(" os.set_inheritable(5,True)\n need(os.get_inheritable(5) is True)\n"),"fd5 preserved "+name);
 }
 need(typeof extras==="object"&&eq(Object.keys(extras),["bootstrap-prelude.mjs","bootstrap-program.mjs","bootstrap-entry.py","image-cleanup.py","inactive-f7.yml","active-f7.yml"]),"six extras");
 need(extras["image-cleanup.py"]===normalSources["image-cleanup.py"],"cleanup exact");
 const pin=JSON.parse(kernelPin.slice("_r3_kernel=".length));
 need(eq(Object.keys(pin),["bytes","sha256","zipBytes","zipSha256","data","cap"])&&pin.cap===32768,"fixed pin shape");
 need(pinLine(extras["bootstrap-entry.py"],"_r3_kernel=")===kernelPin,"bootstrap same seal");
 const stripPins=t=>lines(t).filter(l=>!l.startsWith("_r3_kernel=")&&!l.startsWith("_r3_module=")).join("\n");
 need(stripPins(extras["bootstrap-entry.py"])===stripPins(normalSources["bootstrap-entry.py"]),"bootstrap entry only2pins");
 return {accepted:true,helpers:33,changedHelpers:changed,kernel,pin,bootstrapModulePin:JSON.parse(pinLine(extras["bootstrap-entry.py"],"_r3_module=").slice("_r3_module=".length)),localSourceExecution:false,qualified:false,NativeReleased:false};
}
