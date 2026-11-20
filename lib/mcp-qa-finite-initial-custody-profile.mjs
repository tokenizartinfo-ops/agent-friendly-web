import {finiteFields as fields,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';

const fail=()=>{throw Error('Finite initial custody unavailable');};
const legacy=Object.freeze({
 startAt:0,endAt:Date.parse('2026-11-03T02:59:00Z'),
 reader:Object.freeze({id:'9aa97ad1fc9afe3021cf69ea497d5190',expiresAt:null}),
 publisher:Object.freeze({id:'05718105dcdfc92e55cc3624172c2740',expiresAt:null}),
});

function checkedRole(value){
 const role=fields(value,['id','expiresAt']);
 if(!hex(role.id,32)||!time(role.expiresAt))fail();
 return role;
}

export function createFiniteInitialCustodySelector(approved){
 if(!Array.isArray(approved))fail();
 const profiles=[legacy],used=new Set([legacy.reader.id,legacy.publisher.id]);
 for(const value of approved){
  const {startAt,endAt,reader,publisher}=fields(value,['startAt','endAt','reader','publisher']);
  const r=checkedRole(reader),p=checkedRole(publisher);
  if(!time(startAt)||!time(endAt)||startAt<profiles.at(-1).endAt||endAt<=startAt||
     endAt>Math.min(r.expiresAt,p.expiresAt)||r.id===p.id||used.has(r.id)||used.has(p.id))fail();
  used.add(r.id);used.add(p.id);
  profiles.push(Object.freeze({startAt,endAt,reader:r,publisher:p}));
 }
 return occurredAt=>{
  if(!time(occurredAt))fail();
  const profile=profiles.find(value=>occurredAt>=value.startAt&&occurredAt<value.endAt);
  if(!profile)fail();
  return profile;
 };
}

// A renewal enters this list only after the identities, permission scopes and
// expiry have been verified for the private QA deployment.
const approvedRenewals=Object.freeze([{"startAt":1795126763368,"endAt":1795748399000,"reader":{"id":"cc9aeb666b3616232df10a17598ced52","expiresAt":1795748399000},"publisher":{"id":"0821b27a745d1ef581b445c75311711b","expiresAt":1795748399000}}]);
export const finiteInitialCustodyAt=createFiniteInitialCustodySelector(approvedRenewals);

export function assertFiniteInitialToken(result,role,at){
 const expires=Date.parse(result.expires_on);
 const notBefore=result.not_before==null?null:Date.parse(result.not_before);
 if(!time(at)||result.id!==role.id||result.status!=='active'||!time(expires)||
    expires<=at||role.expiresAt!==null&&expires!==role.expiresAt||
    notBefore!==null&&(!time(notBefore)||notBefore>at))fail();
 return expires;
}

export function assertFiniteInitialCleanupCustody(record,select=finiteInitialCustodyAt){
 const profile=select(record.I0);
 const {reader,publisher}=profile;
 if(record.readerId!==reader.id||record.publisherId!==publisher.id||
    !time(record.C1)||!time(record.readerExpiresAt)||!time(record.publisherExpiresAt)||
    Math.min(record.readerExpiresAt,record.publisherExpiresAt)<record.C1||
    reader.expiresAt!==null&&(record.readerExpiresAt!==reader.expiresAt||
      record.publisherExpiresAt!==publisher.expiresAt||record.C1>profile.endAt))fail();
}
