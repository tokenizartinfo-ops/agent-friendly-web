/** Native Workers rate limits are per Cloudflare location and eventually consistent.
 * This bounds service admission, not a strict global concurrency/cost budget.
 * Use a dedicated binding; do not share the copilot namespace or trust client IP headers.
 */
export function createA2aRateLimit({binding,timeoutMs=1000}={}) {
 if(!Number.isInteger(timeoutMs)||timeoutMs<1||timeoutMs>2000)throw Error('Invalid limiter timeout');
 return async function rateLimit() {
  if(typeof binding?.limit!=='function')return false;
  let timer;
  try {
   const result=await Promise.race([
    Promise.resolve().then(()=>binding.limit({key:'afw-public-a2a-diagnostic-v1'})),
    new Promise(resolve=>{timer=setTimeout(()=>resolve(null),timeoutMs);}),
   ]);
   return result?.success===true;
  } catch {return false;}
  finally {clearTimeout(timer);}
 };
}
