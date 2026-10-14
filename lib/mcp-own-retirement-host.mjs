import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
import {createRetiredCustodyReader} from './mcp-retired-custody-reader.mjs';
const fail=()=>{throw Error('Private retirement unavailable');};
const names=['AFW_DOSSIER_RETIREMENT_READ_ENABLED','AFW_DOSSIER_RETIREMENT_POLICY','AFW_OAUTH_ISSUER','AFW_OAUTH_RESOURCE','AFW_OAUTH_PILOT_CLIENT_ID','AFW_OAUTH_PILOT_PROJECT_ID','DB','AFW_DOSSIER_EVENTS_PROJECTION_SECRET','AFW_DOSSIER_EVENTS_CUSTODY_KEY','AFW_DOSSIER_EVENTS_NODE'];
/** Private server-fixed original custody, independent of live Events policy.
 * No Container/runtime capability, HTTP route, selector or permission renewal. */
export async function observeOwnRetiredCustody({env,ctx,now=Date.now}){
 if(env?.AFW_DOSSIER_RETIREMENT_READ_ENABLED!=='true')fail();
 const pins=Object.freeze(Object.fromEntries(names.map(k=>[k,env[k]]))),raw=pins.AFW_DOSSIER_RETIREMENT_POLICY;
 if(typeof raw!=='string'||raw.length>4096)fail();const parsed=JSON.parse(raw);
 if(!parsed||Object.getPrototypeOf(parsed)!==Object.prototype||typeof parsed.programHash!=='string'||!/^[0-9a-f]{64}$/.test(parsed.programHash)||typeof parsed.sourceRevision!=='string'||!/^[0-9a-f]{40}$/.test(parsed.sourceRevision))fail();
 const {programHash,sourceRevision,...policy}=parsed;
 const shadow={...pins,AFW_DOSSIER_EVENTS_ENABLED:'false',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(policy)};
 const c=readDossierEventHostPolicy({enabled:true,env:shadow,historical:true,now}),p=c.policy;
 const storage=ctx.storage,transaction=storage?.transaction,id=ctx.id;
 const current=()=>{c.current();if(!names.every(k=>env[k]===pins[k])||ctx.storage!==storage||storage.transaction!==transaction||ctx.id!==id||id.toString()!==p.containerId||pins.AFW_DOSSIER_EVENTS_NODE.idFromString(p.containerId).toString()!==p.containerId)fail();};current();
 const secret=pins.AFW_DOSSIER_EVENTS_CUSTODY_KEY;if(typeof secret!=='string'||secret.length!==44)fail();const key=Buffer.from(secret,'base64');if(key.length!==32||key.toString('base64')!==secret){key.fill(0);fail();}
 let reader;try{reader=createRetiredCustodyReader({db:pins.DB,context:{grantId:p.grantId,subject:p.subject,clientId:p.clientId,resource:p.resource,scopes:['afw:project:read']},projectId:p.projectId,projectionSecret:pins.AFW_DOSSIER_EVENTS_PROJECTION_SECRET,storage,custodyKey:key,containerId:p.containerId,programHash,sourceRevision,image:'cloudflare/debian-trixie',window:{startAt:p.startAt,expiresAt:p.expiresAt},now});}finally{key.fill(0);}
 current();const result=await reader.observeRetired();current();return result;
}
