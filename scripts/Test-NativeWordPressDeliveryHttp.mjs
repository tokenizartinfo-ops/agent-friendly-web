import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { randomUUID, randomBytes, createHash } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';

// Disposable provider-assisted root-file handoff. Not an automatic CMS adapter.
const images = {
  wordpress: 'wordpress@sha256:30bff39330d1693b0ce13d32fc9b7bb67193064f040b7d60d3494e136fa599d4',
  mysql: 'mysql@sha256:3466ba4a4828aa8d46fb7c3bc16b67b781c98413cf4ea0fac6feaa6e881faa26'
};
const id = 'afw-wp-' + randomUUID();
const wp = id + '-web', db = id + '-db';
const password = randomBytes(24).toString('hex');
let dockerDiagnostic;
const docker = args => {
  try {
    return execFileSync('docker', args, { encoding: 'utf8', timeout: 120000,
      maxBuffer: 1048576, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (error) {
    dockerDiagnostic = { operation: args[0], status: error.status,
      // Only image/network bootstrap output, never exec commands or DB logs.
      detail: ['pull', 'network'].includes(args[0]) ? String(error.stderr ?? '').slice(0, 1500) : null };
    throw error;
  }
};
const php = code => docker(['exec', wp, 'php', '-r', code]);
const sha = value => createHash('sha256').update(value).digest('hex');
const files = { '/llms.txt': '# Synthetic AFW test\n', '/llms-full.txt': '# Synthetic AFW detail\n' };
const created = [];
let networkCreated = false, phase = 'bootstrap';
const started = performance.now();
const report = { contract: 'agentfriendly.native-wordpress-assisted.v1', status: 'running',
  automaticAdapterTested: false, wordpressTested: true, remoteMutation: false,
  images, checks: [], rollbackObservations: [],
  limits: ['Isolated WordPress 6.8.3 fixture, not production version parity',
    'Provider-assisted root files only; no plugin, remote authorization, CDN or batch atomicity'] };
try {
  assert.equal(process.platform, 'linux');
  assert.equal(process.argv.length, 2);
  assert.equal(process.env.GITHUB_ACTIONS, 'true', 'Only disposable GitHub runner');
  for (const image of Object.values(images)) docker(['pull', image]);
  docker(['network', 'create', '--internal', '--label', 'afw.rehearsal=' + id, id]);
  networkCreated = true;
  docker(['run', '-d', '--name', db, '--network', id, '--label', 'afw.rehearsal=' + id,
    '-e', 'MYSQL_ROOT_PASSWORD=' + password, '-e', 'MYSQL_DATABASE=wordpress', images.mysql]);
  created.push(db);
  docker(['run', '-d', '--name', wp, '--network', id, '--label', 'afw.rehearsal=' + id,
    '-p', '127.0.0.1::80', '-e', 'WORDPRESS_DB_HOST=' + db, '-e', 'WORDPRESS_DB_USER=root',
    '-e', 'WORDPRESS_DB_PASSWORD=' + password, '-e', 'WORDPRESS_DB_NAME=wordpress', images.wordpress]);
  created.push(wp);
  const binding = docker(['port', wp, '80/tcp']);
  assert.match(binding, /^127\.0\.0\.1:\d+$/);
  const origin = 'http://' + binding;
  let ready = false;
  for (let attempt = 0; attempt < 90; attempt++) {
    try {
      docker(['exec', db, 'mysql', '-uroot', '-p' + password, '-Dwordpress', '-e', 'SELECT 1']);
      docker(['exec', wp, 'test', '-f', '/var/www/html/wp-config.php']);
      ready = true; break;
    } catch { await delay(500); }
  }
  assert(ready, 'Database and WordPress bootstrap must finish');
  phase = 'install_synthetic_wordpress';
  const info = JSON.parse(php(`$_SERVER['HTTP_HOST']='${binding}'; $_SERVER['REQUEST_URI']='/';
    require '/var/www/html/wp-load.php'; require_once ABSPATH.'wp-admin/includes/upgrade.php';
    if(is_blog_installed()){throw new Exception('unexpected existing install');}
    wp_install('AFW Synthetic','afw-fixture','admin@afw.invalid',false,'',bin2hex(random_bytes(24)));
    update_option('home','${origin}'); update_option('siteurl','${origin}');
    echo json_encode(['version'=>get_bloginfo('version'),'name'=>get_option('blogname'),'php'=>PHP_VERSION]);`));
  assert.equal(info.version, '6.8.3'); report.wordpress = info.version; report.php = info.php;
  const request = async (path, method = 'GET') => {
    assert([...Object.keys(files), '/', '/afw-never-created.txt'].includes(path));
    const response = await fetch(origin + path, { method, redirect: 'manual', signal: AbortSignal.timeout(8000) });
    const chunks = []; let length = 0;
    if (response.body) for await (const chunk of response.body) {
      length += chunk.length; assert(length <= 1048576); chunks.push(chunk);
    }
    return { status: response.status, type: response.headers.get('content-type'), body: Buffer.concat(chunks) };
  };
  const home = await request('/'); assert.equal(home.status, 200);
  const indexHash = php("echo hash_file('sha256','/var/www/html/index.php');");
  phase = 'initial_absence';
  for (const path of Object.keys(files)) assert.equal((await request(path)).status, 404);
  phase = 'write_and_readback';
  for (const [path, body] of Object.entries(files)) {
    const encoded = Buffer.from(body).toString('base64');
    assert.equal(php(`$f=fopen('/var/www/html${path}','x'); if(!$f)exit(1); echo fwrite($f,base64_decode('${encoded}')); fclose($f);`), String(Buffer.byteLength(body)));
  }
  for (const [path, body] of Object.entries(files)) {
    const get = await request(path), head = await request(path, 'HEAD');
    assert.equal(get.status, 200); assert.equal(get.type?.split(';')[0], 'text/plain');
    assert.equal(sha(get.body), sha(body)); assert.equal(head.status, 200); assert.equal(head.body.length, 0);
    report.checks.push({ path, status: 200, sha256: sha(get.body), head: 200 });
  }
  phase = 'filesystem_rollback';
  for (const [path, body] of Object.entries(files)) {
    assert.equal(php(`if(hash_file('sha256','/var/www/html${path}')!=='${sha(body)}')exit(1); echo unlink('/var/www/html${path}')?'removed':'failed';`), 'removed');
  }
  phase = 'http_after_rollback';
  for (const path of [...Object.keys(files), '/afw-never-created.txt']) {
    const exists = php(`echo file_exists('/var/www/html${path}')?'yes':'no';`) === 'yes';
    const response = await request(path);
    report.rollbackObservations.push({ path, filesystemExists: exists, status: response.status });
    assert.equal(exists, false); assert.equal(response.status, 404);
  }
  report.homepage = (await request('/')).status; assert.equal(report.homepage, 200);
  assert.equal(php("echo hash_file('sha256','/var/www/html/index.php');"), indexHash);
  assert.equal(php("require '/var/www/html/wp-load.php'; echo get_option('blogname');"), info.name);
  report.rollback = 'verified_absent'; report.status = 'passed';
} catch (error) {
  report.status = 'failed'; report.phase = phase; process.exitCode = 1;
  report.dockerDiagnostic = dockerDiagnostic;
  // Never export exec error objects: command arguments contain ephemeral DB access.
  report.failure = { code: error.code === 'ERR_ASSERTION' ? 'assertion_failed' : 'runtime_failed',
    actual: typeof error.actual === 'number' ? error.actual : null,
    expected: typeof error.expected === 'number' ? error.expected : null };
} finally {
  let clean = true;
  for (const name of created.reverse()) {
    try {
      assert.equal(docker(['inspect', '--format', '{{index .Config.Labels "afw.rehearsal"}}', name]), id);
      docker(['rm', '-f', '-v', name]);
    } catch { clean = false; }
  }
  if (networkCreated) try { docker(['network', 'rm', id]); } catch { clean = false; }
  report.cleanupVerified = clean;
  if (!clean) { report.status = 'failed'; process.exitCode = 1; }
}
report.elapsedMs = Math.round(performance.now() - started);
console.log(JSON.stringify(report, null, 2));
