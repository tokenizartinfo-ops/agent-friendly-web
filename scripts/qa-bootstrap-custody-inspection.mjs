import {open, mkdir, writeFile} from 'node:fs/promises';
import {constants} from 'node:fs';
import {isAbsolute, join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {runQaBootstrapCustodyInspection} from '../lib/mcp-qa-bootstrap-custody-inspection.mjs';

try {
  if (process.argv.length !== 2 || process.env.GITHUB_ACTIONS !== 'true') throw new Error();
  if (process.env.GITHUB_SERVER_URL !== 'https://github.com' || process.env.GITHUB_API_URL !== 'https://api.github.com') throw new Error();
  const revision = process.env.GITHUB_SHA;
  if (!/^[a-f0-9]{40}$/.test(revision ?? '')) throw new Error();
  const actual = execFileSync('git', ['rev-parse', 'HEAD'], {encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 1000, maxBuffer: 128}).trim();
  const origin = execFileSync('git', ['remote', 'get-url', 'origin'], {encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 1000, maxBuffer: 256}).trim();
  if (actual !== revision || origin !== 'https://github.com/tokenizartinfo-ops/agent-friendly-web') throw new Error();
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (typeof eventPath !== 'string' || !isAbsolute(eventPath)) throw new Error();
  const handle = await open(eventPath, constants.O_RDONLY | constants.O_NOFOLLOW);
  let event;
  try {
    const info = await handle.stat();
    if (!info.isFile() || info.size > 1048576) throw new Error();
    const bytes = Buffer.alloc(1048577);
    const {bytesRead} = await handle.read(bytes, 0, bytes.length, 0);
    if (bytesRead > 1048576) throw new Error();
    event = JSON.parse(new TextDecoder('utf-8', {fatal: true}).decode(bytes.subarray(0, bytesRead)));
  } finally {
    await handle.close();
  }
  const result = await runQaBootstrapCustodyInspection({
    event,
    context: {
      repository: process.env.GITHUB_REPOSITORY, repositoryId: process.env.GITHUB_REPOSITORY_ID,
      repositoryOwner: process.env.GITHUB_REPOSITORY_OWNER, repositoryOwnerId: process.env.GITHUB_REPOSITORY_OWNER_ID,
      actor: process.env.GITHUB_ACTOR, actorId: process.env.GITHUB_ACTOR_ID,
      ref: process.env.GITHUB_REF, eventName: process.env.GITHUB_EVENT_NAME,
      runId: process.env.GITHUB_RUN_ID, runAttempt: process.env.GITHUB_RUN_ATTEMPT, sourceRevision: revision,
    },
    readCredential: () => process.env.AFW_QA_CLOSED_TOKEN,
  });
  const text = JSON.stringify(result) + '\n';
  if (Buffer.byteLength(text) > 4096) throw new Error();
  // A new fixed directory prevents following pre-existing artifact symlinks.
  const directory = 'afw-qa-bootstrap-custody-inspection';
  await mkdir(directory, {mode: 0o700});
  await writeFile(join(directory, 'result.json'), text, {flag: 'wx', mode: 0o600});
  if (result.status !== 'verified') process.exitCode = 1;
} catch {
  // No stdout/stderr, provider messages, environment or credentials.
  process.exitCode = 1;
}
