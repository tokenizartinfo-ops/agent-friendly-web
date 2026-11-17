import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile, writeFile, appendFile, mkdir } from 'node:fs/promises';
import { checkScenario, expectedRed } from './check-scenarios.mjs';

const prefix = "docs/superpowers/source-lab/c2-drop-winner-tools/fixtures/";
const base = '6791ce1bab9372e206d3c7b42b3e1394dc6e0c68';
const suiteInputs = [{"path":"docs/superpowers/source-lab/c2-drop-winner-tools/fixtures/scenarios.json","mode":"100644","bytes":15741,"sha256":"6f51b5c2cdf68fb98a15022de9b79a95dcc3c8081bb4e641626cda685322f665","blob":"0625f0864da7c70f6a9b6abf0fb989c36fae22f6"},{"path":"docs/superpowers/source-lab/c2-drop-winner-tools/fixtures/fixture-seal.json","mode":"100644","bytes":3004,"sha256":"2c0227e4411358e03fcb439abf43391f4e2bcfe54669fa21d770efb88b28694e","blob":"b00113ce95aca4c1ab95dfa7cfdf83d298e839d1"},{"path":"docs/superpowers/source-lab/c2-drop-winner-tools/fixtures/check-scenarios.mjs","mode":"100644","bytes":2103,"sha256":"bc4c9cebcfb098a60e5f6906f207343ece44a929dca9365aff016f844ed64da6","blob":"7ed4423a7ee9adba3ea6455111d88dd7d147165f"}];
const workflow = '.github/workflows/afw-c2-drop-winner-fixtures.yml';
const git = (...args) => execFileSync('git', args, {encoding:'utf8', stdio:['ignore','pipe','pipe'], maxBuffer:1048576});
const h = (x, y) => createHash(x).update(y).digest('hex');
const headerNames = ['x-afw-lab-qa-denial', 'x-afw-lab-m-denial'];

async function admission() {
  assert.equal(process.version, 'v22.23.4');
  for (const [key, value] of Object.entries({
    GITHUB_ACTIONS:'true', GITHUB_REPOSITORY:'tokenizartinfo-ops/agent-friendly-web', GITHUB_EVENT_NAME:'push',
    GITHUB_REF:'refs/heads/lab/afw-c2-source-20261117-drop-winner-fixtures', GITHUB_RUN_ATTEMPT:'1', GITHUB_JOB:'c2-drop-winner-fixtures'
  })) assert.equal(process.env[key], value);
  const head = git('rev-parse','HEAD').trim();
  assert.match(head, /^[0-9a-f]{40}$/);
  assert.equal(head, process.env.GITHUB_SHA);
  assert.equal(git('rev-list','--parents','-n','1',head).trim(), head + ' ' + base);
  assert.equal(git('log','-1','--format=%B').trimEnd(), 'AFW-C2-DROP-WINNER-FIXTURES-ONEUSE-20261117');
  const allowed = [...suiteInputs.map(x => x.path),prefix+'run-red.mjs',workflow].sort();
  const lines = git('diff','--no-renames','--name-status',base,head).trimEnd().split('\n').sort();
  assert.deepStrictEqual(lines,allowed.map(x=>'A\t'+x).sort());
  for (const d of suiteInputs) {
    const data = await readFile(d.path);
    assert.equal(data.length,d.bytes);
    assert.equal(h('sha256',data),d.sha256);
    assert.equal(h('sha1',Buffer.concat([Buffer.from('blob '+d.bytes+'\0'),data])),d.blob);
  }
  return head;
}

// No observer, marker, stack classifier, transport authentication, or join code.
// A QA fulfillment is received by M; its non-ok status creates the original
// stub-denial error; an independent parent catch normalizes the response to 503.
// This is only a controlled missing-observability MODEL; never the Source case.
async function baseline(i) {
  const qaRequest = new Request(i.url, {method:i.method, body:'synthetic form'});
  const parentRequest = new Request(i.url,{method:i.method,body:'synthetic form'});
  const headers = () => new Headers([i.unchangedHeader]);
  const make = (body,status) => new Response(body,{status,headers:headers()});
  const receive = async r => new Response(await r.arrayBuffer(),{status:r.status,headers:r.headers});
  let qaAtM,qaEntryCount=0,stubDenials=0,finished=0;
  const denial = new Error('MODEL_STUB_NON_OK');
  const qaFetch = r => {
    assert.strictEqual(r,qaRequest);
    qaEntryCount++;
    return Promise.resolve(make(i.qaBody,i.qaStatus));
  };
  const parentFetch = r => {
    assert.strictEqual(r,parentRequest);
    return qaFetch(qaRequest).then(receive).then(actual => {
      assert.ok(actual instanceof Response);
      qaAtM=actual;
      if (!actual.ok) { stubDenials++; throw denial; }
      throw new Error('UNEXPECTED_QA_OK');
    }).catch(err => {
      assert.strictEqual(err,denial,'ORIGINAL_STUB_ERROR_REQUIRED');
      return make(i.outerBody,i.outerStatus);
    }).finally(()=>{finished++;});
  };
  const original = parentFetch(parentRequest);
  assert.ok(original instanceof Promise);
  const atHost = await original.then(receive);
  assert.deepStrictEqual([qaEntryCount,stubDenials,finished],[1,1,1]);
  for (const [r,status,body] of [[qaAtM,i.qaStatus,i.qaBody],[atHost,i.outerStatus,i.outerBody]]) {
    assert.ok(r instanceof Response);
    assert.equal(r.status,status);
    assert.equal(await r.clone().text(),body);
    assert.equal(r.headers.get(i.unchangedHeader[0]),i.unchangedHeader[1]);
    for (const key of headerNames) assert.equal(r.headers.has(key),false);
  }
  return {qaAtM,atHost};
}
async function main() {
  const head=await admission();
  const fixture=JSON.parse(await readFile(suiteInputs[0].path,'utf8'));
  const seal=JSON.parse(await readFile(suiteInputs[1].path,'utf8'));
  assert.deepStrictEqual(fixture.rows.map(x=>x.id),seal.canonicalOrder);
  assert.equal(fixture.rows.length,59);
  const row=fixture.rows[0];
  assert.equal(row.id,'qa-m-host-positive');
  let failure;
  try { await checkScenario(fixture.defaults,row,baseline); } catch(e) {failure=e;}
  assert.ok(failure instanceof assert.AssertionError,'POSITIVE_DID_NOT_RAISE_EXPECTED_ASSERTION');
  assert.equal(failure.code,'ERR_ASSERTION');
  assert.equal(failure.operator,'deepStrictEqual');
  assert.equal(failure.message.split('\n')[0],expectedRed);
  assert.deepStrictEqual(failure.expected,row.expected);
  assert.deepStrictEqual(failure.actual,{qaMarker:null,mMarker:null,site:'UNKNOWN',outer:'UNKNOWN',publicSite:'UNKNOWN'});
  const proof={schema:'AFW.C2.DROP_WINNER_RED/1',scope:'SYNTHETIC_MODEL_ONLY',outcome:'EXPECTED_RED_OBSERVED',
    scenario:row.id,assertion:expectedRed,kind:'AssertionError',code:'ERR_ASSERTION',operator:'deepStrictEqual',
    observed:{qaMarkerPresent:false,mMarkerPresent:false,site:'UNKNOWN',outer:'UNKNOWN',publicSite:'UNKNOWN'},
    preserved:{qaStatus:403,outerStatus:503,bodyAndOrdinaryHeader:true,originalStubErrorCaught:true,finallyOnce:true},
    fixtureCount:59,executed:1,notExecuted:58,head,base,attempt:1,
    runId:process.env.GITHUB_RUN_ID,fixtureBlob:suiteInputs[0].blob,sealBlob:suiteInputs[1].blob,
    SourceQualified:false,Task1Pass:false,nonclaims:{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}};
  assert.match(proof.runId,/^[1-9][0-9]{0,19}$/);
  const bytes=Buffer.from(JSON.stringify(proof)+'\n');
  assert.ok(bytes.length<=2048);
  await mkdir('output',{recursive:true});
  await writeFile('output/drop-winner-fixtures.json',bytes,{flag:'wx'});
  await appendFile(process.env.GITHUB_OUTPUT,'receipt=expected-red\n');
  console.log('EXPECTED_RED_OBSERVED: AFW_C2_POSITIVE_QA_M_HOST_MARKER_JOIN');
  process.exitCode=1;
}
main().catch(()=>{console.error('FIXTURE_HARNESS_FAULT: no admitted RED receipt');process.exitCode=2;});
