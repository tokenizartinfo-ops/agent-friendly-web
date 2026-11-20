// Internal initial-phase lease mechanism. Authority and absolute ceiling remain fixed by each caller.
const current=(l,fail)=>{l.assertCurrent();if(l.signal.aborted)fail();};
export function createFiniteInitialLease(deadline,ceiling,holders,fail){
 const entered=Date.now(),mono=performance.now(),controller=new AbortController(),pendingWork=new Set();
 let end=Math.min(deadline,ceiling),last=entered,lastMono=mono,closed=false,timer;
 const stop=()=>controller.abort();
 const check=()=>{holders();const at=Date.now(),m=performance.now();if(closed||controller.signal.aborted||!Number.isSafeInteger(at)||at<last||at>=end||!Number.isFinite(m)||m<lastMono||m-mono>=end-entered)fail();last=at;lastMono=m;return at;};
 const lease=Object.freeze({signal:controller.signal,assertCurrent:check});
 const retain=p=>{pendingWork.add(p);const settled=()=>pendingWork.delete(p);p.then(settled,settled);return p;};
 const narrow=until=>{check();if(!Number.isSafeInteger(until))fail();end=Math.min(end,until);clearTimeout(timer);check();timer=setTimeout(stop,Math.max(1,end-Date.now()));};
 const wait=async(p,l=lease)=>{let abort;try{return await Promise.race([retain(p),new Promise((_,reject)=>{abort=()=>reject(Error('Finite initial expired'));l.signal.addEventListener('abort',abort,{once:true});if(l.signal.aborted)abort();})]).then(v=>{current(l,fail);return v;});}finally{l.signal.removeEventListener('abort',abort);}};
 const child=async work=>{
  check();const began=Date.now(),m0=performance.now(),until=Math.min(end,began+5000),c=new AbortController();let alive=true,t;
  const abort=()=>c.abort();controller.signal.addEventListener('abort',abort,{once:true});t=setTimeout(abort,Math.max(1,until-Date.now()));
  const l=Object.freeze({signal:c.signal,assertCurrent(){check();if(!alive||c.signal.aborted||Date.now()>=until||performance.now()-m0>=until-began)fail();}});
  let actual;
  try{current(l,fail);actual=work(l,until);if(!actual||typeof actual.then!=='function')fail();retain(actual);return await wait(actual,l);}finally{alive=false;clearTimeout(t);controller.signal.removeEventListener('abort',abort);c.abort();}
 };
 narrow(end);return{lease,child,wait,narrow,retain,end(){check();return end;},close(){closed=true;clearTimeout(timer);stop();}};
}
