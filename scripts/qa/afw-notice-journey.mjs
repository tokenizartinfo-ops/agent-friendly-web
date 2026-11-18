import {spawn} from 'node:child_process';
import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';

const root = fileURLToPath(new URL('../../', import.meta.url));
const reporter = new URL('./afw-notice-journey-reporter.mjs', import.meta.url).href;
const stages = [
  [
    "subscription",
    "test/mcp-own-subscription-receipt.test.mjs",
    "first verified subscription preserves exact safe immutable receipt and rejects refresh"
  ],
  [
    "delivery",
    "test/mcp-subscription-lifecycle.test.mjs",
    "one durable delivery records HTTP receipt separately from cloud review and never repeats"
  ],
  [
    "review",
    "test/operations-notice-cycle.test.mjs",
    "terminal server review remains a dated reviewed result rather than idle or delivery success"
  ],
  [
    "withdrawal",
    "test/mcp-subscription-lifecycle.test.mjs",
    "private observation distinguishes expiry from actual unsubscribe without sending or changing history"
  ],
  [
    "retirement",
    "test/mcp-retirement-receipt-integration.test.mjs",
    "actual challenged helper chain accepts +21ms and yields caller-local physical evidence"
  ]
];
const stepLimitMs = 10000;
const retirementLimitMs = 2000;
const captureLimit = 16384;

function checkStage(path, name) {
  const escaped = name.replace(/[.*+?${}()|[\]\\]/g, '\\$&');
  const started = performance.now();
  const env = {PATH: process.env.PATH, LANG: 'C.UTF-8', TZ: 'UTC'};
  const child = spawn(process.execPath, [
    '--disable-warning=ExperimentalWarning',
    '--test', '--experimental-test-isolation=none', '--test-concurrency=1',
    '--test-reporter=' + reporter, '--test-reporter-destination=stdout',
    '--test-name-pattern=^' + escaped + '$', join(root, path),
  ], {cwd: root, env, stdio: ['ignore', 'pipe', 'pipe']});

  return new Promise(resolve => {
    const chunks = [];
    let stdoutBytes = 0;
    let stderrBytes = 0;
    let fault = null;
    let settled = false;
    let spawned = false;
    let exitResult = null;
    let retirementTimer;

    function finish(result) {
      if (settled) return;
      settled = true;
      clearTimeout(deadline);
      clearTimeout(retirementTimer);
      resolve(result);
    }

    function stop(reason) {
      if (retirementTimer) return;
      fault ??= reason;
      // Signal only the direct child owned by this supervisor.
      if (spawned && !exitResult) child.kill('SIGKILL');
      retirementTimer = setTimeout(() => {
        child.stdout.destroy();
        child.stderr.destroy();
        child.unref();
        finish({status: fault, workerClosed: false});
      }, retirementLimitMs);
    }

    const deadline = setTimeout(() => stop('deadline'), stepLimitMs);
    child.once('spawn', () => { spawned = true; });
    child.on('error', () => stop('worker_error'));
    child.once('exit', (code, signal) => { exitResult = {code, signal}; });
    child.stdout.on('data', chunk => {
      stdoutBytes += chunk.length;
      if (stdoutBytes > captureLimit) stop('stdout_limit');
      else chunks.push(chunk);
    });
    child.stderr.on('data', chunk => {
      stderrBytes += chunk.length;
      if (stderrBytes > captureLimit) stop('stderr_limit');
    });

    child.once('close', (code, signal) => {
      const elapsedMs = Math.ceil(performance.now() - started);
      const workerClosed = spawned && exitResult?.code === code && exitResult?.signal === signal;
      let status = fault ?? (code !== 0 || signal !== null ? 'worker_failed' : stderrBytes ? 'unexpected_stderr' : 'unverified_result');
      if (!fault && elapsedMs > stepLimitMs) status = 'deadline';
      else if (!fault && code === 0 && signal === null && stderrBytes === 0) {
        try {
          const output = new TextDecoder('utf-8', {fatal: true}).decode(Buffer.concat(chunks));
          const expected = JSON.stringify({
            results: [{name, passed: true}], summaries: 1, success: true,
          }) + '\n';
          if (output === expected) status = 'passed';
        } catch {
          // Malformed output remains unverified.
        }
      }
      finish({status, workerClosed, elapsedMs, exitCode: code, stderrBytes});
    });
  });
}

const results = [];
for (const [stage, path, name] of stages) {
  const result = await checkStage(path, name);
  results.push({stage, ...result});
  if (result.status !== 'passed' || !result.workerClosed) break;
}
const passed = results.length === stages.length && results.every(result => result.status === 'passed' && result.workerClosed);
const receipt = {
  schema: 'afw.notice-journey.component-check.v1',
  revision: process.env.GITHUB_SHA ?? null,
  observedAt: new Date().toISOString(),
  status: passed ? 'passed' : 'blocked',
  scope: 'synthetic_component_checks',
  results,
  operationalReadiness: false,
  pcOffVerified: false,
};
const line = JSON.stringify(receipt);
await writeFile(join(root, 'afw-notice-journey-result.json'), line + '\n', {flag: 'wx', mode: 0o600});
console.log('AFW_NOTICE_JOURNEY_RESULT ' + line);
if (!passed) process.exitCode = 1;
