import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const label = 'AFW_OWN_D4_RECEIPT_COMPONENT_REQUIRED';
const output = 'output/own-drop-winner-fixtures.json';
const env = process.env;
assert.equal(process.version, 'v22.23.4');
assert.equal(process.platform, 'linux');
assert.equal(env.GITHUB_REPOSITORY, 'tokenizartinfo-ops/agent-friendly-web');
assert.equal(env.GITHUB_EVENT_NAME, 'push');
assert.equal(env.GITHUB_RUN_ATTEMPT, '1');
assert.equal(env.GITHUB_REF, 'refs/heads/lab/afw-c2-own-20261117-drop-winner-fixtures');
assert.equal(env.GITHUB_JOB, 'own-drop-winner-fixtures');
assert.equal(env.GITHUB_WORKFLOW_REF, 'tokenizartinfo-ops/agent-friendly-web/.github/workflows/afw-c2-own-drop-winner-fixtures.yml@refs/heads/lab/afw-c2-own-20261117-drop-winner-fixtures');
assert.match(env.GITHUB_SHA, /^[a-f0-9]{40}$/);
assert.match(env.GITHUB_RUN_ID, /^[1-9][0-9]*$/);
assert.ok(!existsSync(output), 'fresh receipt destination');
const child = spawnSync(process.execPath, [fileURLToPath(new URL('./d3-component-required.test.mjs', import.meta.url))], {
  timeout: 90000, killSignal: 'SIGKILL', maxBuffer: 60000, encoding: 'utf8'
});
if (child.error || child.signal || child.status !== 1) throw Error('unexpected native test termination');
assert.equal(child.stdout, 'AFW_OWN_STAGE_A D3_MODEL_ADMIT_57_14_25 G20_OWN_UNQUALIFIED ' + label + '\n', 'named assertion evidence');
assert.match(child.stderr, /AssertionError \[ERR_ASSERTION\]: AFW_OWN_D4_RECEIPT_COMPONENT_REQUIRED(?:\r?\n|$)/);
const record = {
  schema: 'AFW.OWN5.STAGE_A.RED/1', observedAssertionError: label, errorCode: 'ERR_ASSERTION',
  baseline: { reader: 'ddaa91771171abf0dba6110184b06e631849c2ec', entry: 'd3ModelRead', admitted: true,
    bindingKind: 'MODELED_ONLY', matchedBodyEdges: 25, witnessEvents: 57, nativeRows: 14 },
  twin: { onlySemanticAddition: 'observation.dropWinner', oldError: 'G20_OWN_UNQUALIFIED' },
  repository: env.GITHUB_REPOSITORY, head: env.GITHUB_SHA, runId: env.GITHUB_RUN_ID,
  attempt: 1, job: env.GITHUB_JOB, scope: 'SYNTHETIC_MODEL_ONLY',
  SourceQualified: false, Task1Pass: false, nativeQualification: false, finalSourceBinding: false,
  nonclaims: {"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}
};
const bytes = JSON.stringify(record) + '\n';
assert.ok(Buffer.byteLength(bytes) <= 2048);
mkdirSync('output', { recursive: true });
writeFileSync(output, bytes, { flag: 'wx' });
process.stderr.write('Observed AssertionError [ERR_ASSERTION]: ' + label + '\n');
process.exitCode = 1;
