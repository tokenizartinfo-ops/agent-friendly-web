import { deliveryAdvice } from './delivery-advisor.mjs';
const FIELDS = ['capability','responsible','revision','mutationKey','manifestSha256'];
export function validateDeliveryPlan(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length !== FIELDS.length || Object.keys(input).some(key=>!FIELDS.includes(key))
    || !deliveryAdvice(input.capability).method || !['owner','maintainer'].includes(input.responsible)
    || !Number.isSafeInteger(input.revision) || input.revision<0 || input.revision>=Number.MAX_SAFE_INTEGER
    || typeof input.mutationKey!=='string' || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(input.mutationKey)
    || typeof input.manifestSha256!=='string' || !/^[a-f0-9]{64}$/.test(input.manifestSha256)) return {ok:false};
  return {ok:true};
}
export function deliveryPlanAccess(user,project,capsule) {
  return Boolean(user?.userId && project?.id && user.userId===project.userId && capsule?.id && capsule.projectId===project.id);
}
function present(row) { return row ? {...JSON.parse(row.payload),revision:row.revision,updatedAt:row.updated_at} : null; }
async function rowFor(db,scope) {
  if(!deliveryPlanAccess({userId:scope.userId},scope.project,scope.capsule))return null;
  return db.prepare('SELECT * FROM delivery_plans WHERE capsule_id=? AND project_id=? AND user_id=?').bind(scope.capsule.id,scope.project.id,scope.userId).first();
}
export async function readDeliveryPlan(db,scope) { return present(await rowFor(db,scope)); }
export async function saveDeliveryPlan(db,scope,input,now=Date.now()) {
  if(!deliveryPlanAccess({userId:scope.userId},scope.project,scope.capsule))return {status:404,code:'project_unavailable'};
  if(!validateDeliveryPlan(input).ok)return {status:400,code:'invalid_delivery_plan'};
  const {capsule,project,userId}=scope;
  if(input.manifestSha256!==capsule.manifestSha256 || !Number.isFinite(Date.parse(capsule.expiresAt)) || Date.parse(capsule.expiresAt)<=now
    || !['owner_approval_pending','maintainer_approval_pending','approved_for_manual_handoff'].includes(capsule.status))return {status:409,code:'capsule_changed'};
  const plan={contract:'afw.delivery-plan.v1',projectId:project.id,capsuleId:capsule.id,manifestSha256:capsule.manifestSha256,
    capability:input.capability,method:deliveryAdvice(input.capability).method,responsible:input.responsible,
    maintainerStatus:input.responsible==='maintainer'?(project.maintainerEmail?'contact_declared':'contact_pending'):'not_required',
    capabilityEvidence:'owner_declared',accessStatus:'not_verified',authorization:'none',publicationStatus:'not_published'};
  const payload=JSON.stringify(plan),updatedAt=new Date(now).toISOString();
  const saved=input.revision===0
    ? await db.prepare('INSERT INTO delivery_plans(capsule_id,project_id,user_id,revision,mutation_key,payload,updated_at) VALUES (?,?,?,1,?,?,?) ON CONFLICT(capsule_id) DO NOTHING RETURNING *').bind(capsule.id,project.id,userId,input.mutationKey,payload,updatedAt).first()
    : await db.prepare('UPDATE delivery_plans SET revision=revision+1,mutation_key=?,payload=?,updated_at=? WHERE capsule_id=? AND project_id=? AND user_id=? AND revision=? RETURNING *').bind(input.mutationKey,payload,updatedAt,capsule.id,project.id,userId,input.revision).first();
  if(saved)return {status:200,plan:present(saved)};
  const current=await rowFor(db,scope);
  if(current?.mutation_key===input.mutationKey && current.payload===payload && current.revision===input.revision+1)return {status:200,plan:present(current),replayed:true};
  return {status:409,code:'delivery_plan_conflict',plan:present(current)};
}
