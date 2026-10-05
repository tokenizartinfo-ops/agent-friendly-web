import {readFileSync} from 'node:fs';
import {operationsDb} from './operations-db.mjs';
export function reviewContextDb(now){
 const s=operationsDb();
 for(const name of ['consumer-state','watchdog-state','watchdog-inbox','notice-reservations','notice-reviews'])s.sqlite.exec(readFileSync(new URL(`../../worker/operations/${name}.sql`,import.meta.url),'utf8'));
 const runId=crypto.randomUUID(),resource='afw_delegated_canary';
 s.sqlite.prepare('INSERT INTO operations_watchdog_state VALUES (?,?,?,?,?,?)').run(resource,now-500,now-500,'paused','healthy',2);
 s.sqlite.prepare('INSERT INTO operations_watchdog_outbox VALUES (?,?,?,?,?)').run(resource,1,'attention','["delivery_pending"]',now-10000);
 s.sqlite.prepare('INSERT INTO operations_watchdog_inbox VALUES (?,?,?,?,?,?)').run(resource,1,'attention','["delivery_pending"]',now-10000,now-10000);
 s.sqlite.prepare('INSERT INTO operations_notice_reservations VALUES (?,?,?,?,?,?,?,?)').run(runId,crypto.randomUUID(),resource,1,now-10000,now-1000,now-1000,'superseded');
 return {...s,runId,resource,env:{OPERATIONS_STATE_DB:s.db,AFW_OPERATIONS_REVIEWS_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+300000).toISOString()}};
}
