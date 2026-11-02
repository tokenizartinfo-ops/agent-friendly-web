import {BOOTSTRAP,bootstrapFields} from './mcp-qa-finite-bootstrap-record.mjs';
const states=new WeakMap(),fail=()=>{throw Error('Finite QA bootstrap admission unavailable');};
const own=(v,k)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;};
function exact(v,keys){bootstrapFields(v,keys);for(const k of keys)own(v,k);return v;}
const actor=a=>own(a,'id')===BOOTSTRAP.ownerId&&own(a,'login')==='tokenizartinfo-ops'&&own(a,'type')==='User';
export function validateQaBootstrapCommand(input){
 const {event,context:c,now}=exact(input,['event','context','now']);exact(c,['repository','repositoryId','ref','eventName','runId','runAttempt','sourceRevision']);
 if(typeof now!=='function')fail();const at=now(),mono=performance.now();
 if(!Number.isSafeInteger(at)||at<0||!Number.isFinite(mono)||c.repository!==BOOTSTRAP.repository||c.repositoryId!==String(BOOTSTRAP.repositoryId)||c.ref!=='refs/heads/main'||c.eventName!=='issue_comment'||c.runAttempt!=='1'||typeof c.runId!=='string'||!/^[1-9][0-9]{0,15}$/.test(c.runId)||typeof c.sourceRevision!=='string'||!/^[a-f0-9]{40}$/.test(c.sourceRevision)||own(event,'action')!=='created')fail();
 const repo=own(event,'repository'),issue=own(event,'issue'),comment=own(event,'comment');
 if(own(repo,'id')!==BOOTSTRAP.repositoryId||own(repo,'full_name')!==BOOTSTRAP.repository||own(issue,'number')!==497||Object.hasOwn(issue,'pull_request')||!actor(own(comment,'user'))||!actor(own(event,'sender'))||own(comment,'author_association')!=='OWNER'||own(comment,'body')!=='/afw-qa-finite-bootstrap v1 '+c.sourceRevision)fail();
 const commandId=own(comment,'id'),raw=own(comment,'created_at'),P0=typeof raw==='string'?Date.parse(raw):NaN,Pend=P0+300000;
 if(!Number.isSafeInteger(commandId)||commandId<1||!Number.isSafeInteger(P0)||P0<0||P0>at||at>=Pend)fail();
 const a=Object.freeze({purpose:'afw.finite-qa-bootstrap-command.v1',sourceRevision:c.sourceRevision,commandId,runId:Number(c.runId),P0,Pend,authorizesEffects:false,operationalReadiness:false,mayRetry:false});
 states.set(a,{now,wall:at,mono,monoEnd:mono+Pend-at,poisoned:false});return a;
}
export function assertQaBootstrapAdmission(a){
 const s=states.get(a);if(!s||s.poisoned)fail();
 const wall=s.now(),mono=performance.now();if(!Number.isSafeInteger(wall)||wall<s.wall||!Number.isFinite(mono)||mono<s.mono||wall>=a.Pend||mono>=s.monoEnd){s.poisoned=true;fail();}s.wall=wall;s.mono=mono;return a;
}
