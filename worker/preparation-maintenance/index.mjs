import {WorkerEntrypoint} from 'cloudflare:workers';
import {readRecord,closed} from '../../lib/agent-consumption-input.mjs';
import {createPreparationClientMaintenance} from '../../lib/preparation-client-maintenance.mjs';

const ENABLE='AFW_PREPARATION_CLIENT_MAINTENANCE_ENABLED',POLICY='AFW_PREPARATION_CLIENT_MAINTENANCE_POLICY';
const CONFIG=[ENABLE,POLICY,'AFW_OAUTH_ISSUER','AFW_OAUTH_RESOURCE'];
const KEYS=['redirectUri','operationId','startedAt','expiresAt'];
const unavailable=(status='unconfirmed')=>closed(status,{code:'preparation_client_maintenance_unavailable',
 automaticRetry:false,authorizationGranted:false,operationalReadiness:false});

/** Internal service-binding capability only. No HTTP operation or caller config.
 * A future deployment must separately authorize its binding consumers/resources.
 */
export default class PreparationClientMaintenance extends WorkerEntrypoint {
 fetch(){return Response.json(unavailable(),{status:404,headers:{'Cache-Control':'no-store'}});}
 register(...args){return this.#run('register',args);}
 reconcile(...args){return this.#run('reconcile',args);}
 async #run(method,args){
  if(args.length)return unavailable('blocked');
  try{
   const env=this.env;
   if(env?.[ENABLE]!=='true')return unavailable();
   const pins=Object.fromEntries(CONFIG.map(k=>[k,env[k]]));
   let invalidated=false;
   const current=()=>{
    if(invalidated||!CONFIG.every(k=>env[k]===pins[k])){invalidated=true;throw Error('Maintenance unavailable');}
   };
   const raw=pins[POLICY];
   if(typeof raw!=='string'||raw.length>2048||new TextEncoder().encode(raw).length>2048)return unavailable();
   const policy=readRecord(JSON.parse(raw),KEYS);
   if(!policy)return unavailable();
   current();
   const helper=createPreparationClientMaintenance({enabled:true,issuer:pins.AFW_OAUTH_ISSUER,resource:pins.AFW_OAUTH_RESOURCE,
    ...policy,env,now:()=>{current();return Date.now();},monotonic:()=>{current();return performance.now();}});
   if(!helper)return unavailable();
   const result=await helper[method]();current();return result;
  }catch{return unavailable();}
 }
}
