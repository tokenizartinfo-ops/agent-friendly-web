import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile, writeFile, lstat, realpath, readlink} from 'node:fs/promises';
import {networkInterfaces} from 'node:os';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = process.env.AFW_HOST_ROOT;
const mode = process.env.AFW_HOST_MODE;
assert.ok(['old', 'candidate'].includes(mode));
assert.equal(await realpath(root), root);
assert.equal(process.getuid(), Number(process.env.AFW_HOST_UID));
assert.ok(process.getuid() > 0 && process.getgid() === Number(process.env.AFW_HOST_GID));
assert.ok(process.getgroups().every(gid => gid === process.getgid()));
assert.notEqual(await readlink('/proc/self/ns/net'), process.env.AFW_HOST_PARENT_NET);
assert.ok(Object.values(networkInterfaces()).flat().every(address => address.internal));
const target = join(root, mode);
const proofDir = join(root, 'facts-' + mode);
const spec = JSON.parse(await readFile(join(here, 'fixture-first.json'), 'utf8'));
const targets = JSON.parse(await readFile(join(here, 'targets.json'), 'utf8'));
const {createInitialEntrySynOutbound} = await import(pathToFileURL(join(target, 'test/fixtures/finite-initial-entry-world.mjs')));
const {CF} = await import(pathToFileURL(join(target, 'test/fixtures/finite-bootstrap-world.mjs')));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const key = spec.sample;
const freshPhase = 'host-json-synthetic';
const clockHeaders = ['content-type', 'date', 'x-ratelimit-remaining'];

function world(jwk, firstConnection = true) {
  const f = {providerPhase: freshPhase, providerRegistry: {requests: [], versions: {}}, uploads: [null, null],
    activations: [], requests: [], nowOffset: 0, oldGuardMode: 'http-401'};
  // The original dispatcher compares this fixture ID before reaching the version and 401 routes.
  const opPin = {id: 'host-unselected-operator-version'};
  const callback = createInitialEntrySynOutbound({f, firstConnection, jwk, opPin, mode: 'normal'});
  return {f, callback};
}
function version(content) {
  return {id: key.versionId, modules: [{name: 'index.mjs', content_type: key.moduleContentType, content_base64: content}]};
}
async function readActual(w, url, fakeProvider = false) {
  const start = Date.now();
  const headers = fakeProvider ? {Authorization: 'Bearer synthetic-native-reader'} : {};
  // Local function invocation only. The URL is an inert dispatch input to the fixture.
  const response = await w.callback(new Request(url, {headers}));
  const bytes = Buffer.from(await response.arrayBuffer());
  return {bytes, response, start, end: Date.now(), url};
}
function expectWire(got, raw, expected, family, status = 200) {
  const bytes = Buffer.from(raw, 'utf8');
  assert.equal(bytes.length, expected.bytes);
  assert.equal(sha(bytes), expected.sha256);
  assert.ok(got.bytes.equals(bytes), 'exact response bytes');
  assert.equal(got.response.status, status);
  assert.equal(got.response.statusText, '');
  const date = got.response.headers.get('date');
  const headers = [['content-type', 'application/json']];
  if (family !== 'certs') {
    assert.ok(date && Number.isFinite(Date.parse(date)));
    const time = Date.parse(date);
    assert.equal(new Date(time).toUTCString(), date);
    assert.ok(time >= Math.floor(got.start / 1000) * 1000 && time <= Math.floor(got.end / 1000) * 1000);
    headers.push(['date', date]);
    if (family === 'version') headers.push(['x-ratelimit-remaining', key.headers.remaining]);
  }
  assert.deepEqual([...got.response.headers], headers);
  return {bytes: got.bytes.length, sha256: sha(got.bytes), status: got.response.status,
    statusText: got.response.statusText, headers: headers.map(([name]) => name)};
}
function expectedRow(url, observation) {
  const at = new URL(url);
  return {phase: freshPhase, host: at.host, method: 'GET', path: at.pathname, status: observation.status,
    bytes: observation.bytes, sha256: observation.sha256};
}
function expectLedger(w, url, observation, index) {
  assert.deepEqual(w.f.providerRegistry.responses[index], expectedRow(url, observation));
  assert.deepEqual(w.f.providerRegistry.requests[index], {phase: freshPhase, url, method: 'GET'});
}
function certify(i, work) {
  test(spec.nativeIds[i], {timeout: 10000}, async () => {
    const checks = [], observed = {};
    const check = async (name, action) => {
      assert.equal(spec.checks[i][checks.length], name);
      await action();
      checks.push(name);
    };
    try {
      await work(check, observed);
      assert.deepEqual(checks, spec.checks[i]);
    } finally {
      const row = {id: spec.nativeIds[i], mode, checks, observed};
      await writeFile(join(proofDir, String(i) + '.json'), JSON.stringify(row) + '\n', {flag: 'wx', mode: 0o600});
    }
  });
}
const unicode = {bytes: key.unicodeBytes, sha256: key.unicodeSha256};
certify(0, async (check, fact) => {
  let calls = 0;
  const jwk = {toJSON() { calls++; return key.unicodeJwk; }};
  const w = world(jwk);
  const got = await readActual(w, key.certsUrl);
  await check('countedActualCallback', () => {
    assert.equal(w.f.providerRegistry.requests.length, 1);
    assert.equal(w.f.providerRegistry.responses.length, 1);
    fact.actualCalls = calls;
    assert.ok(calls >= 1);
  });
  await check('canonicalUnicodeBodyAndTrace', () => {
    fact.wire = expectWire(got, key.unicodeBody, unicode, 'certs');
    expectLedger(w, key.certsUrl, fact.wire, 0);
  });
  await check('singleSerialization', () => assert.equal(calls, 1, 'HOST_ENCODE_ONCE singleSerialization'));
});
certify(1, async (check, fact) => {
  await check('largeModuleBodyHeadersAndTrace', async () => {
    const w = world(key.unicodeJwk);
    const content = key.large.moduleCharacter.repeat(key.large.repeat);
    w.f.providerRegistry.versions[key.versionId] = version(content);
    const got = await readActual(w, key.versionUrl, true);
    fact.large = expectWire(got, key.large.wirePrefix + content + key.large.wireSuffix, key.large, 'version');
    assert.deepEqual(fact.large.headers, clockHeaders);
    expectLedger(w, key.versionUrl, fact.large, 0);
  });
  await check('deniedWorkflow401BodyHeadersAndTrace', async () => {
    const w = world(key.unicodeJwk), url = CF + key.denied.suffix;
    const got = await readActual(w, url, true);
    fact.denied = expectWire(got, key.denied.wire, key.denied, 'denied', key.denied.status);
    expectLedger(w, url, fact.denied, 0);
  });
  await check('nonFirstConnectionOneNativeSerialization', async () => {
    let calls = 0;
    const w = world({toJSON() { calls++; return key.unicodeJwk; }}, false);
    const got = await readActual(w, key.certsUrl);
    fact.ordinary = expectWire(got, key.unicodeBody, unicode, 'certs');
    assert.equal(calls, 1);
    assert.deepEqual(w.f.providerRegistry.requests, []);
    assert.equal(w.f.providerRegistry.responses, undefined);
    fact.ordinaryCalls = calls;
  });
});
certify(2, async (check, fact) => {
  const w = world(key.unicodeJwk);
  const item = version(key.fresh[0].moduleValue);
  w.f.providerRegistry.versions[key.versionId] = item;
  const history = [];
  fact.hashes = [];
  for (const [i, source] of [0, 1, 0].entries()) {
    const vector = key.fresh[source];
    const name = ['initialVersionObserved', 'sameObjectSameUrlChanged', 'sameObjectSameUrlRestored'][i];
    await check(name, async () => {
      item.modules[0].content_base64 = vector.moduleValue;
      assert.equal(w.f.providerRegistry.versions[key.versionId], item);
      const got = await readActual(w, key.versionUrl, true);
      const wire = expectWire(got, vector.wire, vector, 'version');
      expectLedger(w, key.versionUrl, wire, i);
      fact.hashes.push(wire.sha256);
      history.push(expectedRow(key.versionUrl, wire));
    });
  }
  await check('priorRowsRemainExact', () => {
    assert.deepEqual(w.f.providerRegistry.responses, history);
    assert.equal(w.f.providerRegistry.requests.length, 3);
    assert.notEqual(fact.hashes[0], fact.hashes[1]);
    assert.equal(fact.hashes[0], fact.hashes[2]);
  });
});
certify(3, async (check, fact) => {
  let poison = false;
  const w = world({toJSON() { return poison ? 1n : key.unicodeJwk; }});
  const first = await readActual(w, key.certsUrl);
  const firstWire = expectWire(first, key.unicodeBody, unicode, 'certs');
  await check('failedSerializationNoAppend', async () => {
    poison = true;
    const prior = structuredClone(w.f.providerRegistry.responses);
    await assert.rejects(readActual(w, key.certsUrl), TypeError);
    assert.deepEqual(w.f.providerRegistry.responses, prior);
    assert.equal(w.f.providerRegistry.requests.length, 2);
    fact.errorType = 'TypeError';
    fact.failedAppends = w.f.providerRegistry.responses.length - prior.length;
  });
  await check('subsequentCallRemainsFresh', async () => {
    poison = false;
    const got = await readActual(w, key.certsUrl);
    const wire = expectWire(got, key.unicodeBody, unicode, 'certs');
    assert.deepEqual(wire, firstWire);
    assert.deepEqual(w.f.providerRegistry.responses, [expectedRow(key.certsUrl, wire), expectedRow(key.certsUrl, wire)]);
    assert.equal(w.f.providerRegistry.requests.length, 3);
    fact.afterFailure = wire.sha256;
  });
  await check('targets13VerifiedAndOnlyS10Changed', async () => {
    fact.targetHashes = [];
    const changed = [];
    for (const row of targets.rows) {
      const hashes = [];
      for (const flavor of ['old', 'candidate']) {
        const file = resolve(root, flavor, row.path);
        assert.ok(file.startsWith(resolve(root, flavor) + '/'));
        assert.equal(await realpath(file), file);
        const s = await lstat(file);
        assert.ok(s.isFile() && !s.isSymbolicLink());
        const data = await readFile(file);
        assert.equal(data.length, row[flavor].bytes);
        const digest = sha(data);
        assert.equal(digest, row[flavor].sha256);
        hashes.push(digest);
      }
      if (hashes[0] !== hashes[1]) changed.push(row.path);
      fact.targetHashes.push(hashes[mode === 'old' ? 0 : 1]);
    }
    assert.equal(fact.targetHashes.length, 13);
    assert.deepEqual(changed, ['test/fixtures/finite-initial-entry-world.mjs']);
  });
});
