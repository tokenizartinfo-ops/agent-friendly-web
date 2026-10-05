const resources=['afw_delegated_canary','afw_delegated_real_pilot'];
const issues=new Set(['checkpoint_missing','checkpoint_invalid','clock_invalid','configuration_changed','observation_stale','delivery_pending','delivery_stale','service_failed']);
const exact=(value,keys)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===keys.length&&keys.every(key=>Object.hasOwn(value,key));
function normalize(observation,now){
 const invalid=()=>{throw Error('Invalid watchdog observation');};
 if(!Number.isSafeInteger(now)||now<0||!Number.isFinite(new Date(now).getTime())||!exact(observation,['paused','checkedAt','resources'])||typeof observation.paused!=='boolean'||typeof observation.checkedAt!=='string'||!Array.isArray(observation.resources))invalid();
 const time=Date.parse(observation.checkedAt);
 if(!Number.isSafeInteger(time)||time<0||new Date(time).toISOString()!==observation.checkedAt||time>now)invalid();
 if(observation.paused){if(observation.resources.length)invalid();return {time,rows:resources.map(resource=>({resource,condition:'paused'}))};}
 if(observation.resources.length!==resources.length)invalid();
 const rows=observation.resources.map(row=>{
  if(!exact(row,['resource','issues'])||!resources.includes(row.resource)||!Array.isArray(row.issues)||row.issues.length>issues.size||row.issues.some(issue=>!issues.has(issue))||new Set(row.issues).size!==row.issues.length)invalid();
  return {resource:row.resource,condition:row.issues.length?JSON.stringify([...row.issues].sort()):'healthy'};
 });
 if(new Set(rows.map(row=>row.resource)).size!==resources.length)invalid();
 return {time,rows};
}

/** Server-owned watchdog output only. Transactional outbox is not a delivered alert.
 * No runtime, scheduler, customer data, external effects or repair permission here.
 */
export async function recordWatchdogObservation(db,observation,{now=Date.now()}={}){
 const {time,rows}=normalize(observation,now);
 try{
  const statements=[];
  for(const {resource,condition} of rows){
   statements.push(db.prepare(`INSERT INTO operations_watchdog_state
    (resource,checked_at,changed_at,condition,previous_condition,revision) VALUES (?,?,?,?,'',1)
    ON CONFLICT(resource) DO UPDATE SET checked_at=excluded.checked_at,
    previous_condition=CASE WHEN condition<>excluded.condition THEN condition ELSE previous_condition END,
    changed_at=CASE WHEN condition<>excluded.condition THEN excluded.checked_at ELSE changed_at END,
    revision=revision+CASE WHEN condition<>excluded.condition THEN 1 ELSE 0 END,
    condition=excluded.condition WHERE excluded.checked_at>checked_at`).bind(resource,time,time,condition));
   statements.push(db.prepare(`INSERT INTO operations_watchdog_outbox
    (resource,revision,kind,condition,observed_at)
    SELECT resource,revision,CASE WHEN condition='healthy' THEN 'recovered' ELSE 'attention' END,condition,changed_at
    FROM operations_watchdog_state WHERE resource=? AND checked_at=? AND changed_at=?
    AND condition<>'paused' AND (condition<>'healthy' OR previous_condition NOT IN ('','healthy','paused'))
    ON CONFLICT(resource,revision) DO NOTHING`).bind(resource,time,time));
  }
  const result=await db.batch(statements);
  return {updates:result.filter((_,index)=>index%2===0).reduce((sum,row)=>sum+row.meta.changes,0),notices:result.filter((_,index)=>index%2===1).reduce((sum,row)=>sum+row.meta.changes,0)};
 }catch{throw Error('Watchdog transition storage unavailable');}
}
