import { env } from 'cloudflare:workers';
// @ts-expect-error Shared ESM handler is exercised directly by Node tests.
import privateHumanPrivacyPilotHandler from '../../../../lib/private-human-privacy-pilot.mjs';

export async function POST(request: Request) {
  return privateHumanPrivacyPilotHandler(request, env);
}
