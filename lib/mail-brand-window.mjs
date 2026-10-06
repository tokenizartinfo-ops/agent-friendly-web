/** Dedicated ten-minute trial fence. Does not renew identity or grant permission. */
export function mailBrandWindowOpen(config,now){
  if(config?.brandEnabled!==true)return true;
  if(!Number.isSafeInteger(now)||now<0)return false;
  const times=[config.brandStartsAt,config.brandExpiresAt];
  if(times.some(value=>typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)))return false;
  const [start,end]=times.map(Date.parse);
  if(!Number.isSafeInteger(start)||start<0||!Number.isSafeInteger(end)||end<=start||end-start>600000)return false;
  if(new Date(start).toISOString()!==times[0]||new Date(end).toISOString()!==times[1])return false;
  return now>=start&&now<end;
}
