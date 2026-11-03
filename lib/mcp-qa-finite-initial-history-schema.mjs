import {initialFields as fields} from './mcp-qa-finite-initial-material-records.mjs';
import {retainFiniteOwnerStagePromise} from './mcp-qa-finite-stage-work.mjs';
const fail=()=>{throw Error('Finite initial history schema unavailable');};
const expected=Object.freeze({
 dossier_node_process_no_update:Object.freeze({table:'dossier_node_process_admissions',sql:"CREATE TRIGGER dossier_node_process_no_update BEFORE UPDATE ON dossier_node_process_admissions BEGIN SELECT RAISE(ABORT,'immutable_node_process_admission'); END"}),
 dossier_node_process_no_delete:Object.freeze({table:'dossier_node_process_admissions',sql:"CREATE TRIGGER dossier_node_process_no_delete BEFORE DELETE ON dossier_node_process_admissions BEGIN SELECT RAISE(ABORT,'immutable_node_process_admission'); END"}),
 dossier_node_process_close_no_update:Object.freeze({table:'dossier_node_process_closures',sql:"CREATE TRIGGER dossier_node_process_close_no_update BEFORE UPDATE ON dossier_node_process_closures BEGIN SELECT RAISE(ABORT,'immutable_node_process_closure'); END"}),
 dossier_node_process_close_no_delete:Object.freeze({table:'dossier_node_process_closures',sql:"CREATE TRIGGER dossier_node_process_close_no_delete BEFORE DELETE ON dossier_node_process_closures BEGIN SELECT RAISE(ABORT,'immutable_node_process_closure'); END"})
});
const query="SELECT name,tbl_name,sql FROM sqlite_schema WHERE type='trigger' AND name IN ('dossier_node_process_no_update','dossier_node_process_no_delete','dossier_node_process_close_no_update','dossier_node_process_close_no_delete') ORDER BY name";
const normalize=sql=>sql.trim().replace(/\s+/g,' ').replace(/;$/,'').replace(/^CREATE TRIGGER IF NOT EXISTS /,'CREATE TRIGGER ');
/** Fixed native D1 schema read. The result is a current observation, not proof
 * of past enforcement or authority to send any request. */
export async function readFiniteInitialHistorySchema(options,originalLease){
 fields(options,['env']);fields(originalLease,['signal','assertCurrent']);
 const {env}=options,{signal,assertCurrent}=originalLease,db=env?.RELEASE_DB,withSession=db?.withSession;
 if(!(signal instanceof AbortSignal)||typeof assertCurrent!=='function'||typeof withSession!=='function')fail();
 const entered=Date.now(),mono=performance.now();let active=true,timer,onAbort;
 const check=()=>{
  if(!active||signal.aborted||Date.now()<entered||Date.now()-entered>=5000||performance.now()<mono||performance.now()-mono>=5000||options.env!==env||env.RELEASE_DB!==db||db.withSession!==withSession||originalLease.signal!==signal||originalLease.assertCurrent!==assertCurrent)fail();
  assertCurrent();
 };
 const stopped=new Promise((_,reject)=>{onAbort=()=>{active=false;reject(Error('Finite initial history schema unavailable'));};signal.addEventListener('abort',onAbort,{once:true});timer=setTimeout(onAbort,5000);});
 try{
  check();
  const actual=retainFiniteOwnerStagePromise(Promise.resolve().then(async()=>{
   check();const session=Reflect.apply(withSession,db,['first-primary']),prepare=session?.prepare;if(typeof prepare!=='function')fail();
   const statement=Reflect.apply(prepare,session,[query]),all=statement?.all;if(typeof all!=='function')fail();
   const result=await Reflect.apply(all,statement,[]);check();
   if(session.prepare!==prepare||statement.all!==all||result?.success!==true||!Array.isArray(result.results)||result.results.length!==4)fail();
   const seen=new Set();
   for(const row of result.results){
    fields(row,['name','tbl_name','sql']);
    const spec=expected[row.name];if(!spec||seen.has(row.name)||row.tbl_name!==spec.table||typeof row.sql!=='string'||row.sql.length>2048||normalize(row.sql)!==spec.sql)fail();
    seen.add(row.name);
   }
   check();return Object.freeze({purpose:'afw.finite-initial-history-schema.v1',schemaVerified:true,triggerCount:seen.size,authorizesEffects:false,operationalReadiness:false});
  }));
  const result=await Promise.race([actual,stopped]);check();return result;
 }finally{active=false;clearTimeout(timer);signal.removeEventListener('abort',onAbort);}
}
