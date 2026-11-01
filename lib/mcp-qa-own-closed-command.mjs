const fail=()=>{throw Error('Own closed command unavailable');};
function own(v,k){if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
function exact(v,keys){if(!v||Reflect.ownKeys(v).length!==keys.length)fail();return Object.fromEntries(keys.map(k=>[k,own(v,k)]));}
const actor=v=>own(v,'id')===290715446&&own(v,'login')==='tokenizartinfo-ops'&&own(v,'type')==='User';
/** Internal admission metadata only; the CLI binds runner context and event file. */
export function validateOwnClosedReadbackCommand(options){
 const {event,context,now}=exact(options,['event','context','now']);if(typeof now!=='function')fail();
 const c=exact(context,['repository','repositoryId','ref','eventName','runId','runAttempt','sourceRevision']),at=now();
 if(!Number.isSafeInteger(at)||at<0||c.repository!=='tokenizartinfo-ops/agent-friendly-web'||c.repositoryId!=='1347578006'||c.ref!=='refs/heads/main'||c.eventName!=='issue_comment'||c.runAttempt!=='1'||typeof c.runId!=='string'||!/^[1-9][0-9]{0,19}$/.test(c.runId)||typeof c.sourceRevision!=='string'||!/^[a-f0-9]{40}$/.test(c.sourceRevision))fail();
 if(own(event,'action')!=='created')fail();
 const repo=own(event,'repository'),issue=own(event,'issue'),comment=own(event,'comment'),sender=own(event,'sender');
 if(own(repo,'id')!==1347578006||own(repo,'full_name')!==c.repository||own(issue,'number')!==497||Object.hasOwn(issue,'pull_request')||!actor(own(comment,'user'))||!actor(sender)||own(comment,'author_association')!=='OWNER')fail();
 const id=own(comment,'id'),body=own(comment,'body'),rawDate=own(comment,'created_at'),created=typeof rawDate==='string'?Date.parse(rawDate):NaN;
 if(!Number.isSafeInteger(id)||id<1||body!=='/afw-own-closed-readback v1 '+c.sourceRevision||!Number.isSafeInteger(created)||created<0||created>at||at-created>=300000)fail();
 return Object.freeze({purpose:'afw.own-closed-readback-command.v1',sourceRevision:c.sourceRevision,commentId:String(id),runId:c.runId,createdAt:created,admittedAt:at,readOnly:true,authorizesEffects:false,operationalReadiness:false,mayRetry:false});
}
