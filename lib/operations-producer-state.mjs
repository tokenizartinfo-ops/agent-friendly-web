const INTERVAL=900000,LEASE=300000;
export function producerFreshness(row,now=Date.now()) {
  if(!Number.isFinite(now))throw Error('Invalid clock');
  return {silent:!row||!row.observed_at||now<row.observed_at||now-row.observed_at>INTERVAL,deliveryStale:!row||!row.confirmed_at||now<row.confirmed_at||now-row.confirmed_at>INTERVAL};
}
export function createProducerState(db) {
  return {
    async claim(target,now) {
      const token=crypto.randomUUID();
      const row=await db.prepare(`INSERT INTO operations_probe_state(resource,lease_token,lease_until) VALUES (?,?,?)
        ON CONFLICT(resource) DO UPDATE SET lease_token=excluded.lease_token,lease_until=excluded.lease_until
        WHERE lease_until<=? RETURNING *`).bind(target.resource,token,now+LEASE,now).first();
      return row?{...row,target,token}:null;
    },
    shouldDeliver(lease,result,now) {
      return result==='failed'||lease.delivery_pending!==0||lease.version!==lease.target.version||lease.expected!==lease.target.expected||lease.last_result!==result||producerFreshness(lease,now).deliveryStale;
    },
    async finish(lease,{result,confirmed,suppressed=false},now) {
      const row=await db.prepare(`UPDATE operations_probe_state SET observed_at=?,
        version=CASE WHEN ? THEN ? ELSE version END,expected=CASE WHEN ? THEN ? ELSE expected END,
        confirmed_at=CASE WHEN ? THEN ? ELSE confirmed_at END,last_result=CASE WHEN ? THEN ? ELSE last_result END,
        delivery_pending=CASE WHEN ? THEN 0 WHEN ? THEN delivery_pending ELSE 1 END,lease_token=NULL,lease_until=0
        WHERE resource=? AND lease_token=? AND lease_until>? AND observed_at<=? RETURNING resource`)
        .bind(now,confirmed?1:0,lease.target.version,confirmed?1:0,lease.target.expected,confirmed?1:0,now,confirmed?1:0,result,confirmed?1:0,suppressed?1:0,lease.target.resource,lease.token,now,now).first();
      return Boolean(row);
    }
  };
}
