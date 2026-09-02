import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import test from 'node:test';

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function filesUnder(path) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) return [];
  return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const child = join(absolute, entry.name);
    return entry.isDirectory()
      ? filesUnder(relative(root, child))
      : statSync(child).isFile()
        ? [relative(root, child)]
        : [];
  });
}

test('runtime is Cloudflare-native and cannot silently fall back to Sites', () => {
  const packageJson = JSON.parse(read('package.json'));
  const vite = read('vite.config.ts');

  assert.equal(existsSync(join(root, '.openai', 'hosting.json')), false);
  assert.equal(packageJson.devDependencies?.['@openai/sites-vite-plugin'], undefined);
  assert.doesNotMatch(vite, /@openai\/sites-vite-plugin|\bsites\(\)/);
  assert.match(vite, /@cloudflare\/vite-plugin/);
});

test('active application identity contains no Sites authentication headers', () => {
  const activeFiles = [...filesUnder('app'), ...filesUnder('lib')]
    .filter((path) => /\.(?:mjs|ts|tsx)$/.test(path));

  for (const path of activeFiles) {
    const source = read(path);
    assert.doesNotMatch(source, /oai-authenticated-|ChatGPTUser|getChatGPTUser|requireChatGPTUser/, path);
  }
});

test('active remote configuration never points at a chatgpt.site origin', () => {
  const configurationFiles = readdirSync(root)
    .filter((name) => /^wrangler\..+\.jsonc$/.test(name));

  for (const path of configurationFiles) {
    assert.doesNotMatch(read(path), /\.chatgpt\.site/i, path);
  }
});

test('public discovery exposes the active Cloudflare production state without stale migration claims', () => {
  const status = JSON.parse(read('public/.well-known/infrastructure-status.json'));
  assert.equal(status.canonical_origin, 'https://agentfriendlyweb.dev');
  assert.equal(status.public_runtime.state, 'cloudflare_native_production');
  assert.equal(status.public_runtime.provider, 'Cloudflare Workers');
  assert.equal(status.public_runtime.public_traffic_percent, 100);
  assert.equal(status.production.worker_deployed, true);
  assert.equal(status.production.apex_custom_domain_attached, true);
  assert.equal(status.production.private_access_enforced, true);
  assert.deepEqual(status.production.private_access_routes, ['/expediente*', '/capsula/*', '/api/projects', '/api/projects/*']);
  assert.equal(status.production.migrations_applied, 6);
  assert.equal(status.production.functional_table_count, 13);
  assert.equal(status.production.functional_row_count, 0);
  assert.equal(status.production.public_smoke, 'passed');
  assert.equal(status.canary.state, 'retained_access_protected');
  assert.equal(status.canary.public_traffic_percent, 0);
  assert.equal(status.legacy_sites.state, 'rollback_retained_without_apex');
  assert.equal(status.legacy_sites.receives_apex_traffic, false);
  assert.equal(status.project_boundaries.tokenizart_runtime_dependency, false);
  assert.ok(status.retired_surfaces.every((surface) => surface.operational_use === false));

  const publicKnowledge = [
    'public/llms.txt',
    'public/llms-full.txt',
    'public/.well-known/agent-readiness.json',
    'public/.well-known/ai-catalog.json',
    'public/.well-known/ard.json',
    'public/okf/v0.2/discovery/public-audit.md',
    'public/okf/v0.2/discovery/public-discovery-resources.md',
  ].map(read).join('\n');

  assert.match(publicKnowledge, /https:\/\/agentfriendlyweb\.dev\/\.well-known\/infrastructure-status\.json/);
  assert.match(publicKnowledge, /private `\/expediente\*`, `\/capsula\/\*`, `\/api\/projects` and `\/api\/projects\/\*` routes/i);
  assert.doesNotMatch(publicKnowledge, /Sign in with ChatGPT|identidad de Sites|oai-authenticated-/i);
  assert.doesNotMatch(publicKnowledge, /transitional legacy Sites runtime|candidate with 0% traffic|production cutover remains a separate gate/i);

  const robots = read('public/robots.txt');
  assert.doesNotMatch(robots, /\/signin-with-chatgpt|\/contact-staging|\/api\/staging/i);
});

test('active repository guidance describes Workers as production and Sites only as rollback evidence', () => {
  const allowedSitesLines = {
    'README.md': [
      'El origen publico canonico es [agentfriendlyweb.dev](https://agentfriendlyweb.dev/). Desde el 2 de septiembre de 2026, el 100% del trafico publico se sirve mediante el Worker Cloudflare-native propio, con DNS, TLS y rutas privadas protegidas por Cloudflare Access. El antiguo binding de Sites no recibe trafico del dominio y se conserva temporalmente solo como evidencia de rollback.',
    ],
    'AGENTS.md': [
      '- `afw_sites_legacy`: every `*.chatgpt.site` surface is retired and must not be deployed, restored, linked or used as staging.',
      '- The canonical public runtime is the Cloudflare-native production Worker. The historical Sites binding receives no apex traffic and is retained temporarily only as bounded rollback evidence.',
      '- The Cloudflare account, GitHub organization, authentication email and Sites workspace namespace are shared administrative containers, not proof of resource ownership.',
    ],
  };

  for (const path of ['README.md', 'AGENTS.md']) {
    const guidance = read(path);
    assert.match(guidance, /Cloudflare-native/i, path);
    assert.match(guidance, /\bWorkers?\b/i, path);
    assert.match(guidance, /Sites.*rollback/i, path);
    const sitesLines = guidance.split(/\r?\n/).filter((value) => /Sites/i.test(value));
    assert.deepEqual(sitesLines, allowedSitesLines[path], path);
  }
});

test('the roadmap no longer lists the completed public-origin migration as planned work', () => {
  const roadmap = read('docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md');
  const planned = roadmap.split('### Planificado')[1]?.split('### Investigacion')[0] || '';
  assert.doesNotMatch(planned, /migracion del origen publico a un Worker Cloudflare-native/i);
  assert.doesNotMatch(roadmap, /continua disponible sobre un runtime Sites transitorio/i);
  assert.doesNotMatch(roadmap, /gate inmediato es \*\*migrar el origen/i);
  assert.match(roadmap, /Worker Cloudflare-native productivo.*100% del trafico publico/i);
  assert.match(roadmap, /bundle publico OKF v0\.2 con 15 conceptos/i);
});

test('the production receipt records exact Access coverage and separates local comparison from remote checks', () => {
  const receipt = JSON.parse(read('docs/evidence/cloudflare-native-production-cutover-receipt.json'));
  assert.deepEqual(receipt.access.private_destinations, [
    'agentfriendlyweb.dev/expediente*',
    'agentfriendlyweb.dev/capsula/*',
    'agentfriendlyweb.dev/api/projects',
    'agentfriendlyweb.dev/api/projects/*',
  ]);
  assert.deepEqual(receipt.verification.origin_comparison, {
    baseline_origin_before_cutover: 'https://agentfriendlyweb.dev',
    local_candidate_origin: 'http://127.0.0.1:8788',
    remote_release_origin: 'https://release.agentfriendlyweb.dev',
    local_semantic_status: 'passed',
    local_semantic_critical_failures: 0,
    remote_release_anonymous_access_smoke: 'passed',
    remote_release_authenticated_html: 'passed',
  });
});
