import {open, mkdir, writeFile} from 'node:fs/promises';
import {constants} from 'node:fs';
import {isAbsolute, join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {performance} from 'node:perf_hooks';
import {runQaBootstrapCustodyInspection} from '../lib/mcp-qa-bootstrap-custody-inspection.mjs';

const blocked = () => ({
  purpose: 'afw.qa-bootstrap-custody-inspection.v1', status: 'blocked', failure: 'entry_denied',
  observedAt: null, sourceRevision: null, commentId: null, runId: null,
  tokenId: null, tokenStatus: null, notBefore: null, expiresAt: null, expectedTokenMatch: null,
  readOnly: true, scopeVerified: false, workflowCreateVerified: false,
  operationalReadiness: false, mayRetry: false, httpStatus: null, errorCodes: [],
  responseSchema: null, responseShape: null,
});
let result = blocked(), lastWall = Date.now(), lastMono = performance.now(), end, monoEnd;
const current = () => {
  const wall = Date.now(), mono = performance.now();
  if (wall < lastWall || mono < lastMono || (end !== undefined && (wall >= end || mono >= monoEnd))) throw new Error();
  lastWall = wall; lastMono = mono;
  return {wall, mono};
};
try {
  if (process.argv.length !== 2 || process.env.GITHUB_ACTIONS !== 'true') throw new Error();
  if (process.env.GITHUB_SERVER_URL !== 'https://github.com' || process.env.GITHUB_API_URL !== 'https://api.github.com') throw new Error();
  const revision = process.env.GITHUB_SHA;
  if (!/^[a-f0-9]{40}$/.test(revision ?? '')) throw new Error();
  const actual = execFileSync('git', ['rev-parse', 'HEAD'], {encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 1000, maxBuffer: 128}).trim();
  const origin = execFileSync('git', ['remote', 'get-url', 'origin'], {encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 1000, maxBuffer: 256}).trim();
  if (actual !== revision || origin !== 'https://github.com/tokenizartinfo-ops/agent-friendly-web') throw new Error();
  current();
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (typeof eventPath !== 'string' || !isAbsolute(eventPath)) throw new Error();
  const handle = await open(eventPath, constants.O_RDONLY | constants.O_NOFOLLOW);
  let event;
  try {
    current();
    const info = await handle.stat(); current();
    if (!info.isFile() || info.size > 1048576) throw new Error();
    const bytes = Buffer.alloc(1048577);
    const {bytesRead} = await handle.read(bytes, 0, bytes.length, 0); current();
    if (bytesRead > 1048576) throw new Error();
    event = JSON.parse(new TextDecoder('utf-8', {fatal: true}).decode(bytes.subarray(0, bytesRead)));
  } finally {
    await handle.close(); current();
  }
  const start = current(), created = Date.parse(event?.comment?.created_at);
  if (!Number.isFinite(created) || created > start.wall || start.wall - created >= 300000) throw new Error();
  end = created + 300000; monoEnd = start.mono + end - start.wall;
  current();
  result = await runQaBootstrapCustodyInspection({
    event,
    context: {
      repository: process.env.GITHUB_REPOSITORY, repositoryId: process.env.GITHUB_REPOSITORY_ID,
      repositoryOwner: process.env.GITHUB_REPOSITORY_OWNER, repositoryOwnerId: process.env.GITHUB_REPOSITORY_OWNER_ID,
      actor: process.env.GITHUB_ACTOR, actorId: process.env.GITHUB_ACTOR_ID,
      ref: process.env.GITHUB_REF, eventName: process.env.GITHUB_EVENT_NAME,
      runId: process.env.GITHUB_RUN_ID, runAttempt: process.env.GITHUB_RUN_ATTEMPT, sourceRevision: revision,
    },
    now: {wall: () => current().wall, monotonic: () => current().mono},
    readCredential: () => process.env.AFW_QA_CLOSED_TOKEN,
  });
  current();
} catch {
  result = blocked();
}
try {
  // New fixed directory and exclusive file prevent artifact symlink following.
  const directory = 'afw-qa-bootstrap-custody-inspection';
  await mkdir(directory, {mode: 0o700});
  try { current(); } catch { result = blocked(); }
  const path = join(directory, 'result.json'), text = JSON.stringify(result) + '\n';
  if (Buffer.byteLength(text) > 4096) throw new Error();
  await writeFile(path, text, {flag: 'wx', mode: 0o600});
  try { current(); } catch {
    result = blocked();
    await writeFile(path, JSON.stringify(result) + '\n', {flag: 'w', mode: 0o600});
  }
  if (result.status !== 'verified') process.exitCode = 1;
} catch {
  process.exitCode = 1;
}
// No stdout/stderr, provider messages, environment or credentials.
