function atBarrier(signal, work) {
 // Only the component uses this rejection observer. Fulfillment before the signal is an error.
 return Promise.race([signal.promise, work.then(() => {
  throw new Error('AFW_RETENTION_WORK_ENDED_BEFORE_BARRIER');
 })]);
}
export async function withOwnedComponentWork(run, releases, getOwned) {
 let primaryFailed=false;
 try {
  return await run();
 } catch(error) {
  primaryFailed=true;
  throw error;
 } finally {
  const failures=[];
  for(const release of releases) {
   try { release(); } catch(error) { failures.push(error); }
  }
  try { await Promise.allSettled(getOwned()); }
  catch(error) { failures.push(error); }
  if(!primaryFailed&&failures.length)throw failures[0];
 }
}
export function componentBarriers(entered,cancelEntered) {
 return {entry:outer=>atBarrier(entered,outer),cancel:actual=>atBarrier(cancelEntered,actual)};
}
