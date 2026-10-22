const OWN_ENTRYPOINT = 'e69f54927eea4c618415ddcba72d2b54';
const OWN_RULE = 'a7f8805cdc9241d2beed5bb998acaec2';
const MANAGED = 'efb7b8c949ac4650a09736fc376e9aee';
const PHASE = 'http_request_firewall_managed';
const REF = 'afw_public_read_managed_trial_v1';
const ROOT = ['entrypoint', 'catalog', 'bots'];
const ENTRY = ['id', 'name', 'description', 'kind', 'phase', 'source', 'version', 'last_updated', 'rules'];
const RULE = ['id', 'action', 'action_parameters', 'description', 'enabled', 'expression', 'ref', 'version', 'last_updated'];
const CATALOG = ['id', 'kind', 'phase', 'version'];
const BOTS = ['enable_js', 'sbfm_definitely_automated', 'sbfm_likely_automated', 'sbfm_verified_bots', 'sbfm_static_resource_protection', 'ai_bots_protection'];
const text = (v, max, min = 0) => typeof v === 'string' && v.length >= min && v.length <= max;
const id = v => typeof v === 'string' && /^[0-9a-f]{32}$/.test(v);
const token = v => typeof v === 'string' && /^[a-z0-9_]{1,64}$/.test(v);
const version = v => typeof v === 'string' && /^(0|[1-9][0-9]{0,18})$/.test(v);
const timestamp = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,9})?Z$/.test(v) && Number.isFinite(Date.parse(v));

// Inputs are JSON projections, not arbitrary live objects or provider responses.
function record(v, keys) {
  if (v === null || typeof v !== 'object' || Array.isArray(v)) return false;
  const proto = Object.getPrototypeOf(v);
  if (proto !== Object.prototype && proto !== null) return false;
  const descriptors = Object.getOwnPropertyDescriptors(v);
  const names = Reflect.ownKeys(descriptors);
  return names.length === keys.length && names.every(k =>
    typeof k === 'string' && keys.includes(k) && 'value' in descriptors[k] && descriptors[k].enumerable);
}
function list(v, max) {
  if (!Array.isArray(v) || Object.getPrototypeOf(v) !== Array.prototype) return false;
  const descriptors = Object.getOwnPropertyDescriptors(v);
  const n = descriptors.length?.value;
  if (!Number.isSafeInteger(n) || n < 0 || n > max || Reflect.ownKeys(descriptors).length !== n + 1) return false;
  return Array.from({ length: n }, (_, i) => descriptors[String(i)]).every(d => d && 'value' in d && d.enumerable);
}
function rule(v) {
  return record(v, RULE) && id(v.id) && token(v.action) &&
    record(v.action_parameters, ['id', 'overrides', 'version']) &&
    id(v.action_parameters.id) && v.action_parameters.version === 'latest' &&
    record(v.action_parameters.overrides, ['action']) && token(v.action_parameters.overrides.action) &&
    text(v.description, 1024) && typeof v.enabled === 'boolean' && text(v.expression, 4096, 1) &&
    text(v.ref, 128, 1) && version(v.version) && timestamp(v.last_updated);
}
function entry(v) {
  return record(v, ENTRY) && id(v.id) && text(v.name, 128) && text(v.description, 1024) &&
    token(v.kind) && token(v.phase) && token(v.source) && version(v.version) &&
    timestamp(v.last_updated) && list(v.rules, 50) && v.rules.every(rule);
}
function catalog(v) {
  return list(v, 50) && v.every(r => record(r, CATALOG) && id(r.id) && token(r.kind) && token(r.phase) && version(r.version)) &&
    new Set(v.map(r => r.id)).size === v.length;
}
function bots(v) {
  if (!record(v, BOTS)) return false;
  return BOTS.every(k => v[k] === null || (['enable_js', 'sbfm_static_resource_protection'].includes(k) ?
    typeof v[k] === 'boolean' : token(v[k])));
}
function baseline(v) {
  if (!record(v, ROOT) || !entry(v.entrypoint) || !catalog(v.catalog) || !bots(v.bots)) return false;
  const e = v.entrypoint; const r = e.rules[0];
  const own = v.catalog.find(x => x.id === OWN_ENTRYPOINT);
  return e.id === OWN_ENTRYPOINT && e.kind === 'zone' && e.phase === PHASE && e.source === 'firewall_managed' &&
    e.rules.length === 1 && r.id === OWN_RULE && r.ref === REF && r.enabled === false && r.action === 'execute' &&
    r.action_parameters.id === MANAGED && r.action_parameters.overrides.action === 'block' &&
    own?.kind === e.kind && own.phase === e.phase && own.version === e.version &&
    v.catalog.some(x => x.id === MANAGED && x.kind === 'managed' && x.phase === PHASE);
}
function canonical(v) {
  if (v === null || typeof v !== 'object') return JSON.stringify(v);
  if (Array.isArray(v)) return '[' + v.map(canonical).join(',') + ']';
  return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + canonical(v[k])).join(',') + '}';
}
const same = (a, b) => canonical(a) === canonical(b);

// A match is diagnostic only: no account, freshness, lease or mutation authority.
export function diagnosePublicWafSnapshot(expected, observed, checkedAt) {
  const issues = [];
  const add = (component, field) => issues.push({ component, field });
  let date = null;
  try {
    if (timestamp(checkedAt)) date = checkedAt;
    else add('snapshot', 'checkedAt');
    if (!baseline(expected)) add('expected', 'schema');
    else if (!record(observed, ROOT)) add('snapshot', 'schema');
    else {
      if (!entry(observed.entrypoint)) add('entrypoint', 'schema');
      else {
        for (const k of ENTRY.filter(k => k !== 'rules')) {
          if (!same(expected.entrypoint[k], observed.entrypoint[k])) add('entrypoint', k);
        }
        if (expected.entrypoint.rules.length !== observed.entrypoint.rules.length) add('entrypoint', 'rules');
        else for (const k of RULE) {
          if (!same(expected.entrypoint.rules[0][k], observed.entrypoint.rules[0][k])) add('entrypoint', 'rules.0.' + k);
        }
      }
      if (!catalog(observed.catalog)) add('catalog', 'schema');
      else {
        const a = [...expected.catalog].sort((x, y) => x.id.localeCompare(y.id));
        const b = [...observed.catalog].sort((x, y) => x.id.localeCompare(y.id));
        if (!same(a.map(x => x.id), b.map(x => x.id))) add('catalog', 'membership');
        else if (!same(a, b)) add('catalog', 'metadata');
      }
      if (!bots(observed.bots)) add('bots', 'schema');
      else for (const k of BOTS) {
        if (expected.bots[k] !== observed.bots[k]) add('bots', k);
      }
    }
  } catch {
    // Never copy exception text, unknown property names or configuration values.
    add('snapshot', 'schema');
  }
  return Object.freeze({
    contract_version: 'agentfriendly.public-waf-snapshot.v1',
    checked_at: date,
    snapshotMatches: issues.length === 0,
    issues: Object.freeze(issues.map(issue => Object.freeze(issue))),
    mutationAllowed: false,
    wafEnforcementAccepted: false,
    operationalReadiness: false,
    pcOffAccepted: false,
  });
}
