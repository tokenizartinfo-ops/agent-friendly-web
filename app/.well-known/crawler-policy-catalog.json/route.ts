// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { crawlerCatalogPayload } from '../../../lib/crawler-catalog.mjs';

export async function GET() {
  return Response.json(crawlerCatalogPayload(), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
