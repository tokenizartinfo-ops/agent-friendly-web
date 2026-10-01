import { env } from 'cloudflare:workers';
import { and, eq } from 'drizzle-orm';
import { getCloudflareAccessUser } from '../../../../../../cloudflare-access-auth';
import { getDb } from '../../../../../../../db';
import { publicationCapsules, siteProjects } from '../../../../../../../db/schema';
import { readBoundedJsonBody } from '../../../../../../../lib/bounded-json-body.mjs';
import { readDeliveryPlan, saveDeliveryPlan } from '../../../../../../../lib/delivery-plan.mjs';
type Context={params:Promise<{projectId:string;capsuleId:string}>};
const headers={'cache-control':'no-store'};
const reply=(code:string,status:number)=>Response.json({code},{status,headers});
async function scopeFor(context:Context) {
  const user=await getCloudflareAccessUser();
  if(!user)return {code:'authentication_required',status:401} as const;
  const {projectId,capsuleId}=await context.params;
  const db=getDb();
  const [project]=await db.select().from(siteProjects).where(and(eq(siteProjects.id,projectId),eq(siteProjects.userId,user.userId))).limit(1);
  if(!project)return {code:'project_unavailable',status:404} as const;
  const [capsule]=await db.select().from(publicationCapsules).where(and(eq(publicationCapsules.id,capsuleId),eq(publicationCapsules.projectId,projectId))).limit(1);
  if(!capsule)return {code:'project_unavailable',status:404} as const;
  return {project,capsule,userId:user.userId};
}
export async function GET(_request:Request,context:Context) {
  const scope=await scopeFor(context);
  if('code' in scope)return reply(scope.code||'project_unavailable',scope.status||404);
  try{return Response.json({plan:await readDeliveryPlan(env.DB,scope)},{headers});}
  catch{return reply('delivery_plan_unavailable',503);}
}
export async function PUT(request:Request,context:Context) {
  const scope=await scopeFor(context);
  if('code' in scope)return reply(scope.code||'project_unavailable',scope.status||404);
  if(request.headers.get('origin')!==new URL(request.url).origin)return reply('invalid_origin',403);
  const body=await readBoundedJsonBody(request,{maxBytes:2048});
  if(!body.ok)return reply(body.code||'invalid_delivery_plan',body.status||400);
  try {
    const result=await saveDeliveryPlan(env.DB,scope,body.value);
    return Response.json(result,{status:result.status,headers});
  } catch{return reply('delivery_plan_save_unconfirmed',503);}
}
