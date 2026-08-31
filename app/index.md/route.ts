// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { createHomeMarkdownResponse } from '../../lib/home-markdown.mjs';

export async function GET() {
  return createHomeMarkdownResponse();
}
