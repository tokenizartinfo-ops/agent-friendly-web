import { createHomeMarkdownResponse } from '../../lib/home-markdown.mjs';

export async function GET() {
  return createHomeMarkdownResponse();
}
