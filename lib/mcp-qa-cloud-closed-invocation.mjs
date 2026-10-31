import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
const fail=()=>{throw Error('Closed QA cloud invocation unavailable');};
function read(env,key){
 const d=Object.getOwnPropertyDescriptor(env,key);if(!d?.enumerable||!Object.hasOwn(d,'value')||typeof d.value!=='string')fail();return d.value;
}
function millis(value){if(!/^(0|[1-9]\d{0,15})$/.test(value))fail();const n=Number(value);if(!Number.isSafeInteger(n)||n<0||n>8640000000000000)fail();return n;}
/** No credential access or effects: validate a single ordinary manual cloud job.
 * Environment metadata is a run gate, not cryptographic proof of execution. */
export function parseQaCloudClosedInvocation({env,argv,now}){
 if(!env||typeof env!=='object'||!Array.isArray(argv)||argv.length||Reflect.ownKeys(argv).length!==1||typeof now!=='function')fail();
 for(const[k,v]of Object.entries({GITHUB_ACTIONS:'true',GITHUB_REPOSITORY:'tokenizartinfo-ops/agent-friendly-web',GITHUB_EVENT_NAME:'workflow_dispatch',GITHUB_REF:'refs/heads/main',GITHUB_RUN_ATTEMPT:'1',RUNNER_OS:'Linux',AFW_QA_CLOSED_ENVIRONMENT:'afw-qa-cloud-closed-rollback'}))if(read(env,k)!==v)fail();
 const sourceSha=read(env,'GITHUB_SHA'),runId=read(env,'GITHUB_RUN_ID'),operation=read(env,'AFW_QA_CLOSED_OPERATION'),sessionId=read(env,'AFW_QA_CLOSED_SESSION_ID'),startAt=millis(read(env,'AFW_QA_CLOSED_START_MS')),expiresAt=millis(read(env,'AFW_QA_CLOSED_EXPIRES_MS')),at=now();
 if(!/^[a-f0-9]{40}$/.test(sourceSha)||!/^[1-9]\d{0,19}$/.test(runId)||!['inspect','restore_known_closed_candidate'].includes(operation)||!/^[a-f0-9]{64}$/.test(sessionId)||!Number.isSafeInteger(at)||at<startAt||at>=expiresAt||expiresAt<=startAt||expiresAt-startAt>600000||operation==='restore_known_closed_candidate'&&expiresAt-at<180000)fail();
 return Object.freeze({operation,sourceSha,runId,plan:Object.freeze({purpose:'afw.qa-cloud-closed-rollback.v1',sessionId,startAt,expiresAt}),pins:QA_CLOUD_CLOSED_PINS});
}
