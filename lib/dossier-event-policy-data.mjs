// Pure private data grammar shared by live and historical hosts. No authority.
const fail=()=>{throw Error('Dossier event RPC unavailable');};
const id=x=>typeof x==='string'&&x.length>0&&x.length<=200&&x.trim()===x;
export function parseDossierEventPolicyFields(raw,named){
 if(typeof raw!=='string'||raw.length>4096)fail();const value=JSON.parse(raw),keys=['grantId','subject','projectId','clientId','resource',...(!named?['containerId']:[]),'startAt','expiresAt'];
 if(!value||Object.getPrototypeOf(value)!==Object.prototype)fail();
 const ds=Object.getOwnPropertyDescriptors(value),own=Reflect.ownKeys(ds);
 if(own.length!==keys.length||own.some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(ds[k],'value')||!ds[k].enumerable))fail();
 return Object.fromEntries(keys.map(k=>[k,ds[k].value]));
}
export function validateDossierEventPolicyData(p,{clientId,projectId,resource,issuer}){
 if(!['grantId','subject','projectId','clientId','resource'].every(k=>id(p[k]))||typeof p.containerId!=='string'||!/^[0-9a-f]{64}$/.test(p.containerId)||!Number.isSafeInteger(p.startAt)||p.startAt<0||!Number.isSafeInteger(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||p.clientId!==clientId||p.projectId!==projectId||p.resource!==resource||p.resource!==issuer+'/mcp'||new URL(issuer).origin!==issuer)fail();
}
export function parseDossierRetirementFields(raw){
 const unavailable=()=>{throw Error('Private retirement unavailable');};
 if(typeof raw!=='string'||raw.length>4096)unavailable();const parsed=JSON.parse(raw);
 if(!parsed||Object.getPrototypeOf(parsed)!==Object.prototype||typeof parsed.programHash!=='string'||!/^[0-9a-f]{64}$/.test(parsed.programHash)||typeof parsed.sourceRevision!=='string'||!/^[0-9a-f]{40}$/.test(parsed.sourceRevision))unavailable();
 const {programHash,sourceRevision,...policy}=parsed;return{programHash,sourceRevision,policy};
}
