import { knownGoalCodes } from './copilot-goal-contract.mjs';
const hash = /^[0-9a-f]{64}$/;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const siteTypes = new Set(['','artist','gallery','museum','institution','commerce','other']);
const exact = (value, keys) => value && typeof value === 'object' && !Array.isArray(value)
  && Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value,key));
const time = value => Number.isSafeInteger(value) && value >= 0 && Number.isFinite(new Date(value).getTime());
const identifier = value => typeof value === 'string' && value.length > 0 && value.length <= 256;
const fail = () => { throw Error('Invalid assistance goal context'); };

// Pure preparation only. Callers must independently authenticate service identity,
// resolve all inputs from authoritative server records and recheck before delivery.
// This projection cannot create permission, read D1, transport data or activate a service.
export function projectAssistanceGoalContext({grant,lease,project,authority,now} = {}) {
  if (!exact(grant,['version','purpose','scope','projectId','userId','eventId','sequence','issuedAt','expiresAt'])
    || !exact(lease,['eventId','projectRef','runId','projectId','userId','revision','topic','expiresAt'])
    || !exact(authority,['granted','sequence']) || !project || !time(now)
    || grant.version !== 'afw.assistance-goals-consent.v1' || grant.purpose !== 'orientation'
    || grant.scope !== 'goal-guidance' || lease.topic !== 'orientation'
    || !identifier(grant.projectId) || !identifier(grant.userId)
    || project.id !== grant.projectId || lease.projectId !== grant.projectId
    || project.userId !== grant.userId || lease.userId !== grant.userId
    || !hash.test(grant.eventId) || lease.eventId !== grant.eventId
    || !hash.test(lease.projectRef) || !uuid.test(lease.runId)
    || !Number.isSafeInteger(lease.revision) || lease.revision < 1 || project.revision !== lease.revision
    || authority.granted !== true || !Number.isSafeInteger(grant.sequence) || grant.sequence < 1
    || authority.sequence !== grant.sequence || !time(grant.issuedAt) || !time(grant.expiresAt)
    || !time(lease.expiresAt) || grant.issuedAt > now || grant.expiresAt <= now || lease.expiresAt <= now
    || grant.expiresAt <= grant.issuedAt || grant.expiresAt - grant.issuedAt > 600000
    || !siteTypes.has(project.siteType) || typeof project.goalsJson !== 'string' || project.goalsJson.length > 256) fail();
  let goals;
  try { goals = JSON.parse(project.goalsJson); } catch { fail(); }
  if (!Array.isArray(goals) || goals.length > 5 || knownGoalCodes(goals).length !== goals.length) fail();
  return { version:'afw.assistance-goal-context.v1',eventId:lease.eventId,projectRef:lease.projectRef,
    runId:lease.runId,revision:lease.revision,expiresAt:Math.min(grant.expiresAt,lease.expiresAt),
    declarations:{siteType:project.siteType,goals:[...goals]},evidenceStatus:'owner_declared',operationsAuthorized:false };
}
