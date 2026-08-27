// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { runPublicAudit } from '../../../lib/public-audit.mjs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { url?: string };
    return Response.json(await runPublicAudit(body.url), { headers: { 'cache-control': 'no-store' } });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'No se pudo realizar la auditoria.' },
      { status: 400, headers: { 'cache-control': 'no-store' } },
    );
  }
}
