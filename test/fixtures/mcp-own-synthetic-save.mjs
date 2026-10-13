import {createHash} from 'node:crypto';
import {fixture} from './mcp-own-durable-host.mjs';
import {createOwnDurableEventHost} from '../../lib/mcp-own-durable-host.mjs';
export async function syntheticSaveFixture(fixtureOptions){
 const f=fixture(fixtureOptions);f.grant();f.db.exec("ALTER TABLE site_projects ADD COLUMN goals_json TEXT DEFAULT '[]'; ALTER TABLE site_projects ADD COLUMN updated_at TEXT DEFAULT ''; CREATE TABLE project_events(id TEXT NOT NULL PRIMARY KEY,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);");
 f.config.db.batch=async statements=>{f.db.exec('BEGIN');try{const out=[];for(const s of statements)out.push(await s.run());f.db.exec('COMMIT');return out;}catch(e){f.db.exec('ROLLBACK');throw e;}};
 const host=createOwnDurableEventHost(f.config);f.setHost(host);await host.subscribe({name:'afw.dossier.changed',arguments:{projectRef:await host.list()},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')}});
 const options={enabled:true,db:f.config.db,context:f.config.context,projectId:f.config.projectId,containerId:'a'.repeat(64),programHash:createHash('sha256').update(f.config.program).digest('hex'),sourceRevision:f.config.sourceRevision,window:f.config.window,now:f.config.now,beforeCommit:async()=>true};
 return{...f,host,options};
}
