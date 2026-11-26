import { env } from 'cloudflare:workers';
import { getCloudflareAccessUser } from '../../../../cloudflare-access-auth';
import { createDossierConditionsHandler } from '../../../../../lib/dossier-conditions.mjs';

type Context = { params: Promise<{ projectId: string }> };

async function handle(request: Request, { params }: Context) {
  const { projectId } = await params;
  return createDossierConditionsHandler({
    db: env.DB,
    getIdentity: getCloudflareAccessUser,
    limiter: env.COPILOT_RATE_LIMIT,
  })(request, projectId);
}

export const GET = handle;
export const POST = handle;
