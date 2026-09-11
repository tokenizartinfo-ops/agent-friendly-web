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
    '-e', 'WORDPRESS_DB_HOST=' + db, '-e', 'WORDPRESS_DB_USER=root',
    '-e', 'WORDPRESS_DB_PASSWORD=' + password, '-e', 'WORDPRESS_DB_NAME=wordpress', images.wordpress]);
  created.push(wp);
  const binding = '127.0.0.1';
  const origin = 'http://' + binding;
  report.httpClient = 'PHP cURL to loopback Apache inside isolated container';
  let ready = false;
  for (let attempt = 0; attempt < 90; attempt++) {
    try {
      // MySQL entrypoint's temporary init server has sockets but no networking.
      docker(['exec', db, 'mysql', '--protocol=TCP', '-h127.0.0.1', '-uroot', '-p' + password, '-Dwordpress', '-e', 'SELECT 1']);
      docker(['exec', wp, 'test', '-f', '/var/www/html/wp-config.php']);
      ready = true; break;
    } catch { await delay(500); }
  }
  assert(ready, 'Database and WordPress bootstrap must finish');
  phase = 'install_synthetic_wordpress';
  const info = JSON.parse(php(`define('WP_INSTALLING',true);
    $_SERVER['HTTP_HOST']='${binding}'; $_SERVER['REQUEST_URI']='/';
    require '/var/www/html/wp-load.php'; require_once ABSPATH.'wp-admin/includes/upgrade.php';
    if(is_blog_installed()){throw new Exception('unexpected existing install');}
    wp_install('AFW Synthetic','afw-fixture','admin@afw.invalid',false,'',bin2hex(random_bytes(24)));
    update_option('home','${origin}'); update_option('siteurl','${origin}');
    echo json_encode(['version'=>get_bloginfo('version'),'name'=>get_option('blogname'),'php'=>PHP_VERSION]);`));
  assert.equal(info.version, '6.8.3'); report.wordpress = info.version; report.php = info.php;
  const request = async (path, method = 'GET') => {
    assert([...Object.keys(files), '/', '/afw-never-created.txt'].includes(path));
    assert(['GET', 'HEAD'].includes(method));
    const response = JSON.parse(php(`$body=''; $c=curl_init('${origin}${path}');
      curl_setopt_array($c,[CURLOPT_FOLLOWLOCATION=>false,CURLOPT_TIMEOUT=>8,
        CURLOPT_NOBODY=>${method === 'HEAD' ? 'true' : 'false'},
        CURLOPT_WRITEFUNCTION=>function($c,$chunk)use(&$body){
          if(strlen($body)+strlen($chunk)>1048576)return 0; $body.=$chunk; return strlen($chunk);
        }]);
      if(curl_exec($c)===false)exit(1);
      echo json_encode(['status'=>curl_getinfo($c,CURLINFO_HTTP_CODE),
        'type'=>curl_getinfo($c,CURLINFO_CONTENT_TYPE),'body'=>base64_encode($body)]); curl_close($c);`));
    return { ...response, body: Buffer.from(response.body, 'base64') };
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
  phase = 'backup_existing_pair';
  const backups = {}, updated = {};
  for (const [path, body] of Object.entries(files)) {
    backups[path] = Buffer.from(php(`echo base64_encode(file_get_contents('/var/www/html${path}'));`), 'base64');
    assert.equal(sha(backups[path]), sha(body));
    updated[path] = Buffer.from(body.replaceAll('\n', '\r\n') + 'Revision 2: caf\u00e9 / a\u00e7\u00e3o\r\n');
    assert.notEqual(sha(updated[path]), sha(backups[path]));
  }
  // Assisted single-writer fixture only: this check/write is NOT a remote CAS.
  const replaceExpected = (path, expectedHash, bytes) => {
    assert(Object.hasOwn(files, path)); assert.match(expectedHash, /^[a-f0-9]{64}$/);
    const encoded = bytes.toString('base64');
    return php(`$p='/var/www/html${path}';
      if(!is_file($p)||hash_file('sha256',$p)!=='${expectedHash}'){echo 'conflict';exit;}
      $b=base64_decode('${encoded}'); $n=file_put_contents($p,$b);
      if($n!==strlen($b))exit(1); echo 'written';`);
  };
  const verifyBytes = async (path, bytes) => {
    const get = await request(path), head = await request(path, 'HEAD');
    assert.equal(get.status, 200); assert.equal(get.type?.split(';')[0], 'text/plain');
    assert.equal(sha(get.body), sha(bytes)); assert.equal(head.status, 200); assert.equal(head.body.length, 0);
    assert.equal(php(`echo hash_file('sha256','/var/www/html${path}');`), sha(bytes));
    return sha(get.body);
  };
  phase = 'reject_stale_update';
  assert.equal(replaceExpected('/llms.txt', '0'.repeat(64), updated['/llms.txt']), 'conflict');
  for (const path of Object.keys(files)) await verifyBytes(path, backups[path]);
  report.conflictRejected = true;
  phase = 'update_existing_pair';
  for (const path of Object.keys(files)) assert.equal(replaceExpected(path, sha(backups[path]), updated[path]), 'written');
  report.updateChecks = [];
  for (const path of Object.keys(files)) {
    report.updateChecks.push({ path, beforeSha256: sha(backups[path]), updatedSha256: await verifyBytes(path, updated[path]) });
  }
  phase = 'reject_stale_restore';
  assert.equal(replaceExpected('/llms-full.txt', sha(backups['/llms-full.txt']), backups['/llms-full.txt']), 'conflict');
  for (const path of Object.keys(files)) await verifyBytes(path, updated[path]);
  report.staleRestoreRejected = true;
  phase = 'restore_previous_pair';
  for (const path of Object.keys(files)) assert.equal(replaceExpected(path, sha(updated[path]), backups[path]), 'written');
  for (const check of report.updateChecks) check.restoredSha256 = await verifyBytes(check.path, backups[check.path]);
  report.updateRollback = 'verified_previous_bytes';
  phase = 'persistent_backup_and_partial_interruption';
  const privateDir = '/tmp/' + id + '-backup';
  // Every php() call is a fresh process. Recovery receives no original file bytes.
  const save = `$save=function($p,$b,$mode){$f=fopen($p,$mode); if(!$f)exit(1);
    if(fwrite($f,$b)!==strlen($b)||!fflush($f)||!fsync($f))exit(1); fclose($f);};`;
  const nextEncoded = Buffer.from(JSON.stringify(Object.fromEntries(
    Object.entries(updated).map(([path, bytes]) => [path, bytes.toString('base64')])
  ))).toString('base64');
  php(`${save}
    if(!mkdir('${privateDir}',0700))exit(1); umask(0077);
    $next=json_decode(base64_decode('${nextEncoded}'),true,512,JSON_THROW_ON_ERROR); $m=[];
    foreach(['/llms.txt','/llms-full.txt'] as $path){
      $old=file_get_contents('/var/www/html'.$path); $new=base64_decode($next[$path],true);
      $save('${privateDir}'.$path,$old,'x'); $save('${privateDir}'.$path.'.next',$new,'x');
      $m[$path]=['before'=>hash('sha256',$old),'after'=>hash('sha256',$new)];
    }
    $save('${privateDir}/manifest.json',json_encode($m),'x');`);
  let interruptionExit;
  try {
    php(`${save}
      $m=json_decode(file_get_contents('${privateDir}/manifest.json'),true);
      if(hash_file('sha256','/var/www/html/llms.txt')!==$m['/llms.txt']['before'])exit(1);
      $save('/var/www/html/llms.txt',file_get_contents('${privateDir}/llms.txt.next'),'w');
      exit(86);`);
  } catch (error) { interruptionExit = error.status; }
  assert.equal(interruptionExit, 86);
  dockerDiagnostic = undefined; // Planned exit is not a Docker bootstrap failure.
  await verifyBytes('/llms.txt', updated['/llms.txt']);
  await verifyBytes('/llms-full.txt', backups['/llms-full.txt']);
  const recoveryCode = `${save}
    $result=['status'=>'blocked','writes'=>0,'files'=>[]];
    try {
      $m=json_decode(file_get_contents('${privateDir}/manifest.json'),true,512,JSON_THROW_ON_ERROR);
      $plan=[];
      foreach(['/llms.txt','/llms-full.txt'] as $path){
        $result['files'][$path]='not_changed';
        $old=file_get_contents('${privateDir}'.$path);
        $hash=hash_file('sha256','/var/www/html'.$path);
        if(hash('sha256',$old)!==$m[$path]['before']||
          !in_array($hash,[$m[$path]['before'],$m[$path]['after']],true)){
          $result['files'][$path]='blocked'; throw new Exception('conflict');
        }
        $plan[$path]=['bytes'=>$old,'current'=>$hash];
      }
      foreach($plan as $path=>$item){
        if(hash_file('sha256','/var/www/html'.$path)!==$item['current'])throw new Exception('conflict');
        if($item['current']!==$m[$path]['before']){
          $save('/var/www/html'.$path,$item['bytes'],'w'); $result['writes']++;
          $result['files'][$path]='restored';
        } else $result['files'][$path]='already_original';
        if(hash_file('sha256','/var/www/html'.$path)!==$m[$path]['before'])throw new Exception('verify');
      }
      $result['status']='restored';
    } catch(Throwable $e){$result['status']=$result['writes']?'partial':'blocked';}
    echo json_encode($result);`;
  const recovery = () => JSON.parse(php(recoveryCode));
  report.interruptedRecovery = { interruptionExit, status: 'pending', httpChecks: [] };
  phase = 'persistent_corrupt_backup_guard';
  php("file_put_contents('" + privateDir + "/llms-full.txt','damaged');");
  const corrupt = recovery();
  assert.equal(corrupt.status, 'blocked'); assert.equal(corrupt.writes, 0);
  await verifyBytes('/llms.txt', updated['/llms.txt']);
  await verifyBytes('/llms-full.txt', backups['/llms-full.txt']);
  report.interruptedRecovery.corruptBackupRejected = true;
  // Repair only the synthetic fixture from its still-original second document.
  php(`copy('/var/www/html/llms-full.txt','${privateDir}/llms-full.txt');`);
  phase = 'persistent_third_party_guard';
  php("file_put_contents('/var/www/html/llms-full.txt','Synthetic third-party edit');");
  const conflict = recovery();
  assert.equal(conflict.status, 'blocked'); assert.equal(conflict.writes, 0);
  await verifyBytes('/llms.txt', updated['/llms.txt']);
  await verifyBytes('/llms-full.txt', Buffer.from('Synthetic third-party edit'));
  report.interruptedRecovery.thirdPartyRejected = true;
  php(`copy('${privateDir}/llms-full.txt','/var/www/html/llms-full.txt');`);
  phase = 'persistent_fresh_process_recovery';
  const recovered = recovery();
  assert.equal(recovered.status, 'restored'); assert.equal(recovered.writes, 1);
  assert.deepEqual(recovered.files, { '/llms.txt': 'restored', '/llms-full.txt': 'already_original' });
  for (const path of Object.keys(files)) {
    report.interruptedRecovery.httpChecks.push({ path,
      restoredSha256: await verifyBytes(path, backups[path]), beforeSha256: sha(backups[path]),
      get: 200, head: 200 });
  }
  const repeated = recovery();
  assert.equal(repeated.status, 'restored'); assert.equal(repeated.writes, 0);
  report.interruptedRecovery.repeatWrites = repeated.writes;
  report.interruptedRecovery.files = recovered.files;
  report.interruptedRecovery.status = 'verified_previous_bytes';
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
