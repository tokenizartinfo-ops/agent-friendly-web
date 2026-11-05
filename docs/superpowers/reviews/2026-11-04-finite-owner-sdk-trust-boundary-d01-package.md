# D0.1 task review package

Repository: tokenizartinfo-ops/agent-friendly-web
BASE: 7067c850914353d720eac67e039216bd19ec1268
HEAD: 04e8bb0f77cb78b27c219b9fd703641018e8df12
Full BASE..HEAD scope, all 11 changed files. GitHub patches supply contextual hunks; read one focused complete function only if an actual hunk is cut off. SOURCE-only qualification; no runtime action.

## Commits
- 7f414d3e4dbda3209fb9ff39f718571a577ea744 test(finite): establish D0.1 exact QA SDK alias RED
- b26a16754549a5669923bb4b82c1c6483a91b34a feat(finite): declare exact QA owner OAuth KV source alias
- 9fe7e2f53f4e594879b3992e5751fe631c03ec60 test(finite): align compiler graph assertion with accepted phase reader
- 04e8bb0f77cb78b27c219b9fd703641018e8df12 docs(finite): record D0.1 source qualification and remove temporary gate

## Stat
- docs/superpowers/briefs/2026-11-04-finite-owner-sdk-trust-boundary-d01-preflight.es.md: +7 -0
- docs/superpowers/reports/2026-11-04-finite-owner-sdk-trust-boundary-d01.md: +47 -0
- lib/mcp-qa-finite-owner-sdk-binding-facts.mjs: +50 -0
- lib/mcp-qa-finite-profile.mjs: +2 -2
- test/mcp-qa-finite-bootstrap-compiler.test.mjs: +5 -2
- test/mcp-qa-finite-bootstrap.test.mjs: +10 -0
- test/mcp-qa-finite-initial-capsule-native.test.mjs: +9 -0
- test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs: +40 -0
- test/mcp-qa-finite-profile-native.test.mjs: +15 -0
- test/mcp-qa-finite-profile.test.mjs: +13 -0
- wrangler.independent-closure-qa.finite.jsonc: +6 -0

## Full available diff
### docs/superpowers/briefs/2026-11-04-finite-owner-sdk-trust-boundary-d01-preflight.es.md

```diff
@@ -0,0 +1,7 @@
+# D0.1 preflight — 2026-11-04
+- PROJECT: Agent Friendly Web; REPOSITORY: tokenizartinfo-ops/agent-friendly-web (ID 1347578006); ENVIRONMENT: candidate SOURCE branch feat/finite-native-cleanup-20261101; ORIGIN: GitHub connector; RESOURCE_TYPE: branch commit/tree; RESOURCE_ID: 7067c850914353d720eac67e039216bd19ec1268; ALLOWED_ACTION: D0.1 source/test/docs commit and credential-free Actions only.
+- Branch head read through Git ref equals exact accepted BASE 7067c850914353d720eac67e039216bd19ec1268; tree 6b1fbd2329d89e16415e65b4c6082114e58ae96d. No main/PR/deploy/provider contact.
+- Accepted phase-context first-primary reader and pure conversion are already in BASE; D0.1 consumes neither as authority. D0 design brief and linked exact access delta reviewed. D0.2/D0.3 inactive.
+- Proposal: exactly one qaLive alias AFW_FINITE_OWNER_OAUTH_KV to existing namespace 6b94ff702e504e14a7730cee73a0f6ff. This would grant namespace-wide QA Worker read/write on actual installation, not per-key or actor permissions. This commit creates SOURCE declarations only and carries no real binding, credential, operational authorization, or Entry.
+- M physical bindings and historical qaClosed/c570/M2607/pins remain fixed. Revised Q bootstrap/material/capsule must precede the single Entry. Old sealed Q cannot qualify after this change.
+- Rollback: revert only this task's branch commits by CAS to the preserved BASE after verifying no later legitimate work; do not reset other refs or delete historical resources. Source evidence is the commits, Actions runs and this record.
```

### docs/superpowers/reports/2026-11-04-finite-owner-sdk-trust-boundary-d01.md

```diff
@@ -0,0 +1,47 @@
+# D0.1 — exact QA SDK alias SOURCE contract
+
+## Scope and provenance
+
+- Project: Agent Friendly Web; repository `tokenizartinfo-ops/agent-friendly-web`, ID `1347578006`; candidate branch `feat/finite-native-cleanup-20261101`. No main, PR, merge or runtime action.
+- BASE `7067c850914353d720eac67e039216bd19ec1268`, tree `6b1fbd2329d89e16415e65b4c6082114e58ae96d`. Code HEAD `9fe7e2f53f4e594879b3992e5751fe631c03ec60`, tree `ee2817c5d711b073a12ccd7fa2aef2f840e577f4`. This report and deletion of the temporary qualifier form a later docs/CI-only commit; its exact HEAD/tree are in GitHub commit metadata and handoff.
+- Preflight: `docs/superpowers/briefs/2026-11-04-finite-owner-sdk-trust-boundary-d01-preflight.es.md`. Root accepted the bounded D0.1 source task after the independently accepted first-primary reader/pure conversion at BASE. D0.2/D0.3 remain inactive.
+- ALLOWED_ACTION: source profile/config/helper, scoped tests, credential-free GitHub Actions. Source owner permissions unchanged. No Cloudflare/provider contact, real binding, namespace, secret, token, OAuth, OTP, SQL, SDK call, actor, route, POST, grant, Entry, deployment or rollback execution.
+
+## Exact access delta
+
+The qaLive source template and finite Wrangler config add exactly `AFW_FINITE_OWNER_OAUTH_KV` → existing `6b94ff702e504e14a7730cee73a0f6ff`. If installed later, this is **namespace-wide QA Worker read/write**, not a per-key or per-actor permission. This task supplies no actual capability or provider access-review receipt. M's physical OAUTH_KV and `wrangler.mcp-own.finite.jsonc` remain unchanged; `qaClosed/c570`, `canary/2607`, `QA_CLOUD_CLOSED_PINS`, source flags/date and historical records remain unchanged. BASE and code HEAD blobs for M Wrangler, historical pins, anchors, Entry records, effectful Entry, bootstrap source, candidate residency and phase-context are identical.
+
+`qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata})` returns only frozen `{alias,namespaceId,bindingHash}`. It snapshots bounded plain DATA without accessors, symbols or prototypes, requires the full exact qaLive configuration and one pinned QA KV alias, and checks a complete M preparation configuration with exactly one pinned `OAUTH_KV` and no extra KV/OAuth alias. Its hash domain is `afw.finite-owner-sdk-binding.v1` over canonical `{alias,namespaceId}`. It does not qualify M's private phase, read provider state, accept an SDK/env/caller verifier, or return authority. Current QA source must separately qualify the entire phase in a future unit.
+
+Revised QA bootstrap/publicStatic must be established **before** the one original Entry, material and capsule. Actual codecs reject an old sealed QA bootstrap binding commitment. Original material embeds `qaBootstrap.record.qaLive.publicStatic`; changing it changes `materialHash` and the capsule commitment. `capsule.bindingsHash` remains the M full-binding commitment only. No old Q relabel, in-place upgrade, fallback profile, second Entry or clock reset is authorized. The source ceiling `2026-11-03T02:59:00Z` remains expired; native fixtures use disclosed SYN ceiling/source envelopes and native SQLite time. `operationalReadiness=false`, `completePackage=false`, `PCoff=false`.
+
+## Cloud qualification
+
+All Actions used `ubuntu-24.04`, Node 22, `actions/checkout@v4` with `persist-credentials:false`, `contents:read`, `npm ci --ignore-scripts --no-audit --no-fund`; no cloud credentials were provided. The temporary workflow was `.github/workflows/afw-d01-source-qualifier.yml`, removed in the report commit.
+
+| Stage | Commit; run/job/attempt | Result |
+| --- | --- | --- |
+| RED `node --test test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs test/mcp-qa-finite-profile.test.mjs` | `7f414d3e4dbda3209fb9ff39f718571a577ea744`; [41945109093](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41945109093) / `126975258740` / 1 | npm ci passed; 9 pass, 3 causal fail: helper absent and QA alias absent. |
+| First GREEN scope + compiler | `b26a16754549a5669923bb4b82c1c6483a91b34a`; [41945530726](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41945530726) / `126976662473` / 1 | lint passed 0 errors/16 warnings; scoped 143 pass/0 fail; final compiler **gate failed** at existing test line 16. `compileFiniteNativeStaging` had returned, but the test wrongly required M to exclude pure Entry records already reachable at BASE. No compile hash was emitted for this failed gate. |
+| Corrected gate | `9fe7e2f53f4e594879b3992e5751fe631c03ec60`; [41946053720](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/41946053720) / `126978408579` / 1 | lint passed 0 errors/16 warnings; scoped 143 pass/0 fail/0 skip; compiler gate 1 pass/0 fail. |
+
+Root ruling on the failed gate: at BASE, `mcp-qa-finite-initial-anchors.mjs` already imports `decodeFiniteInitialEntry` from `mcp-qa-finite-initial-entry-records.mjs`, which imports pure material records. The Entry records module exports only pure hash/encode/decode DATA functions, with no I/O or authority. The compiler test now requires QA Entry and Entry records, permits the shared M DATA records, and still excludes the effectful `mcp-qa-finite-initial-entry.mjs` from M. Bootstrap-source/issuer, filesystem and esbuild graph exclusions remain. This is a correction of an obsolete test assertion, not evidence that the new alias changed the M import graph.
+
+Actual compile calls were counted from test entrypoints: no compile in RED; **two** in the first GREEN run (cached issuer fixture, then direct compiler call before failed assertion); **three** in the final GREEN run (cached issuer fixture, direct compiler call, then `buildFiniteNativePackage` internally calls the compiler again before its expected fail-closed rejection). Total **five** actual `compileFiniteNativeStaging` calls over both GREEN runs; no separate standalone build. The successful compiler metadata below is from the final exact clean code HEAD.
+
+## Final compiler and codec evidence
+
+| Role | Module bytes / limit | Actual module SHA-256 | Public static hashes |
+| --- | --- | --- | --- |
+| qaLive | 2,020,216 / 3,145,728 | `e0647b4df123733a44959a3a7c028826678f763cc76b885283ee6aed8b6102be` | configuration `3b74b975b31c48e89c10b244e89563c7ef923e0389bbba70c1e48a26176421f4`; profile `07e20e6999481a728387c03a261dfa7ab95d854850097f0f94b2cefd3a1519b4`; bindings `102e47683eda68256040840bac90ae81c4b335734690a459f8ce52ca3b1d16e4` |
+| canaryLive M | 1,951,873 / 2,097,152 | `0dd8bf287e1f18ec611c6c1d288952eaa026b847ec07fb006c4970d99cce36c3` | configuration `443c0eb833ba7b70419419533c72023b9e4c27f76f7f2faf33217b4591ad1b36`; profile `6203717476c095a0035bcfac8d38cf8f6f20bc105e23fac859eef1704525dccb`; bindings `9ac9576919b2a68da89c02cd6819f1246f27929e61754a46d804ec7dd9c2a169` |
+
+Compiler source revision `9fe7e2f53f4e594879b3992e5751fe631c03ec60`, source tree `ee2817c5d711b073a12ccd7fa2aef2f840e577f4`; metafile input counts QA 304, M 330. Checked-in QA Wrangler config equals the exact source template. Compiler checked workflow/CLI hashes in QA only, no forbidden node:fs output imports, no effectful M Entry/QA bootstrap issuer or esbuild import, and preserved fail-closed incomplete package. M module SHA at this HEAD is actual build evidence; no historical module hash was reused.
+
+Actual codec fixture in final GREEN run: revised QA public bindings hash `102e47683eda68256040840bac90ae81c4b335734690a459f8ce52ca3b1d16e4`; synthetic `materialHash=bcc63ed54642e56a096981993bbf33e877d9376a53b316061c0a35f281806ac2`; synthetic `capsuleHash=2457979db716b383e74903e97027fdc0c6339108b1c12103c984371a3d767387`; synthetic M `capsule.bindingsHash=06420ca93be6622eebd2ba6d42195b5d55512008119e7ea807292628e8ceec9e`. Fixture hashes vary with synthetic timing and do not attest a real Entry or publication. Original material/capsule domains are `afw.finite-initial-material.v1` and `afw.finite-initial-capsule.v1`.
+
+Warnings: 16 pre-existing repository lint warnings, 0 errors; npm deprecations for `@esbuild-kit/esm-loader@2.6.5`, `@esbuild-kit/core-utils@3.3.2`, `eslint@9.39.4`; Node `punycode` deprecation; Actions checkout/setup-node v4 Node 20 deprecation notice. No unrelated warning fixes.
+
+## Review and next boundary
+
+BASE→code HEAD diff is limited to QA profile/config, pure binding helper, scoped tests, temporary Actions qualifier and preflight. The qualifier is removed with this report. Self-review found no runtime import of the new helper, no changed M physical configuration/historical pins and no added operational path. Root's independent D0.1 acceptance/rejection remains pending. A later task must separately review actual provider alias grant and rollback/readback, establish a revised QA publication/bootstrap before a new original Entry, and implement D0.2/D0.3 only under their own scope. This report does not establish provider access, full phase qualification, SDK use, owner consent, operational readiness or PC-off.
```

### lib/mcp-qa-finite-owner-sdk-binding-facts.mjs

```diff
@@ -0,0 +1,50 @@
+import {createHash} from 'node:crypto';
+import {projectFinitePublicConfiguration} from './mcp-qa-finite-profile.mjs';
+
+const ALIAS='AFW_FINITE_OWNER_OAUTH_KV';
+const NAMESPACE_ID='6b94ff702e504e14a7730cee73a0f6ff';
+const CONFIG=['compatibility_date','compatibility_flags','main_module','usage_model','containers','exports','bindings'];
+const fail=()=>{throw Error('Finite owner SDK binding facts unavailable');};
+const canonical=v=>Array.isArray(v)?'['+v.map(canonical).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}':JSON.stringify(v);
+
+function own(value){
+ let nodes=0,bytes=0;
+ function copy(v,depth=0){
+  if(++nodes>4096||depth>20)fail();
+  if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isSafeInteger(v))return v;
+  if(typeof v==='string'){bytes+=Buffer.byteLength(v);if(bytes>262144)fail();return v;}
+  const array=Array.isArray(v);
+  if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==(array?Array.prototype:Object.prototype))fail();
+  const keys=Reflect.ownKeys(v),out=array?[]:{};
+  if(array&&(v.length>1024||keys.length!==v.length+1))fail();
+  for(const k of keys){
+   if(array&&k==='length')continue;
+   const d=Object.getOwnPropertyDescriptor(v,k);
+   if(typeof k!=='string'||['__proto__','constructor','prototype','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value')||array&&!/^(0|[1-9][0-9]*)$/.test(k))fail();
+   out[k]=copy(d.value,depth+1);
+  }
+  return out;
+ }
+ return copy(value);
+}
+
+/** Exact, bounded source DATA equality. It neither reads provider state nor grants access. */
+export function qualifyFiniteOwnerSdkBindingFacts(input){
+ const args=own(input);
+ if(!args||canonical(Object.keys(args).sort())!=='["mMetadata","qaMetadata"]')fail();
+ const qa=projectFinitePublicConfiguration({role:'qaLive',metadata:args.qaMetadata});
+ const m=args.mMetadata;
+ if(!m||canonical(Object.keys(m).sort())!==canonical([...CONFIG].sort())||!Array.isArray(m.compatibility_flags)||!Array.isArray(m.containers)||!Array.isArray(m.bindings)||!m.bindings.length||typeof m.compatibility_date!=='string'||typeof m.main_module!=='string'||typeof m.usage_model!=='string'||!m.exports||typeof m.exports!=='object')fail();
+ const q=qa.bindings.filter(b=>b.name===ALIAS);
+ if(q.length!==1||q[0].type!=='kv_namespace'||q[0].namespace_id!==NAMESPACE_ID||qa.bindings.filter(b=>b.type==='kv_namespace').length!==1)fail();
+ const names=new Set();let oauth=null;
+ for(const b of m.bindings){
+  if(!b||typeof b.name!=='string'||!b.name||names.has(b.name))fail();
+  names.add(b.name);
+  if(b.name==='OAUTH_KV')oauth=b;
+  else if(b.type==='kv_namespace'||/OAUTH.*KV|KV.*OAUTH/.test(b.name))fail();
+ }
+ if(!oauth||canonical(Object.keys(oauth).sort())!=='["name","namespace_id","type"]'||oauth.type!=='kv_namespace'||oauth.namespace_id!==NAMESPACE_ID||oauth.namespace_id!==q[0].namespace_id)fail();
+ const fact={alias:ALIAS,namespaceId:NAMESPACE_ID};
+ return Object.freeze({...fact,bindingHash:createHash('sha256').update('afw.finite-owner-sdk-binding.v1\n'+canonical(fact)).digest('hex')});
+}
```

### lib/mcp-qa-finite-profile.mjs

```diff
@@ -18,8 +18,8 @@ function snapshot(v,depth=0,budget={nodes:0,bytes:0}){
 }
 // Reviewed live source templates. Typed markers are NOT provider metadata and
 // must never be passed to activationConfigurationHash/Known or deployed as vars.
-const templates=freeze({"qaLive":{"compatibility_date":"2026-09-07","compatibility_flags":["nodejs_compat","enable_request_signal"],"main_module":"index.mjs","usage_model":"standard","containers":[],"exports":["IndependentClosure","PrivateQaBootstrap","PrivateQaCatalog","PrivateQaNamedConfirmation","PrivateQaPreregistration","default","observePrivateQa"],"bindings":[{"name":"AFW_INDEPENDENT_CLOSURE","class_name":"IndependentClosure","type":"durable_object_namespace","namespace_id":"070c4a7708eb4592a3ded7c117a88225"},{"name":"AFW_MCP_CLOSURE_DISPATCH_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_CLOSURE_DISPATCH_POLICY","type":"plain_text","text":""},{"name":"AFW_MCP_CLOSURE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_CLOSURE_NODE","class_name":"AfwOwnEventNode","script_name":"agent-friendly-web-delegated-canary","type":"durable_object_namespace","namespace_id":"d6fc71552de7494a863aca20365a572d"},{"name":"AFW_MCP_CLOSURE_POLICY","type":"plain_text","text":""},{"name":"AFW_MCP_CLOSURE_PUBLISH_TOKEN","type":"secret_text"},{"name":"AFW_MCP_CLOSURE_READ_TOKEN","type":"secret_text"},{"name":"AFW_MCP_CLOSURE_REDUCTION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_PUBLISHER_PROBE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_PUBLISHER_PROBE_POLICY","type":"plain_text","text":""},{"name":"AFW_MCP_READER_PROBE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_READER_PROBE_POLICY","type":"plain_text","text":""},{"name":"AFW_QA_BOOTSTRAP","type":"workflow","workflow_name":"afw-own-qa-private-bootstrap","class_name":"PrivateQaBootstrap"},{"name":"AFW_QA_BOOTSTRAP_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_CHALLENGE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_CHALLENGE_IDENTITY","type":"plain_text","text":""},{"name":"AFW_QA_DB","type":"d1","id":"676ca49e-af71-4f2f-a12d-11f13de78a51"},{"name":"AFW_QA_DOSSIER_DB","type":"d1","id":"6a728254-1494-4039-802e-b39288a55fcc"},{"name":"AFW_QA_HTTP_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_HTTP_POLICY","type":"plain_text","text":""},{"name":"AFW_QA_INSTALLATION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_NAMED_CONFIRMATION","type":"workflow","workflow_name":"afw-own-qa-private-confirmation","class_name":"PrivateQaNamedConfirmation"},{"name":"AFW_QA_OCCURRENCE_RATE_LIMITER","type":"ratelimit","namespace_id":"2026101003","simple":{"limit":10,"period":60}},{"name":"AFW_QA_ORIGINALS_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_PREREGISTRATION","type":"plain_text","text":""},{"name":"AFW_QA_PREREGISTRY","class_name":"PrivateQaPreregistration","type":"durable_object_namespace","namespace_id":"6f30104244424152b800bc64d5f4cfac"},{"name":"AFW_QA_PRIMARY_ADMISSION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_PRIMARY_CATALOG_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_PRIMARY_RESERVATION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_PROVIDER_OBSERVATION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_VERSION","type":"version_metadata"},{"name":"AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_RELEASE_EVENTS_NODE","class_name":"AfwOwnEventNode","script_name":"agent-friendly-web-delegated-canary","type":"durable_object_namespace","namespace_id":"d6fc71552de7494a863aca20365a572d"},{"name":"AFW_RELEASE_OPERATOR_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_RELEASE_WORKFLOW_ENABLED","type":"plain_text","text":"true"},{"name":"RELEASE_DB","type":"d1","id":"6a728254-1494-4039-802e-b39288a55fcc"}]},"canaryLive":{"compatibility_date":"2026-09-07","compatibility_flags":["nodejs_compat","global_fetch_strictly_public","enable_request_signal"],"main_module":"index.mjs","usage_model":"standard","containers":[{"class_name":"AfwOwnEventNode","name":"agent-friendly-web-delegated-canary-afwowneventnode"}],"exports":{"default":{"type":"worker"},"AfwNodeControl":{"type":"worker"},"AfwOwnEventNode":{"type":"durable-object","storage":"sqlite","container":"agent-friendly-web-delegated-canary-afwowneventnode"}},"bindings":[{"name":"AFW_DELEGATED_OAUTH_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_EVENTS_CUSTODY_KEY","type":"secret_text"},{"name":"AFW_DOSSIER_EVENTS_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_DOSSIER_EVENTS_NODE","class_name":"AfwOwnEventNode","type":"durable_object_namespace","namespace_id":"d6fc71552de7494a863aca20365a572d"},{"name":"AFW_DOSSIER_EVENTS_NODE_NAME","type":"plain_text","text":"afw-own-event-first-successor-v1"},{"name":"AFW_DOSSIER_EVENTS_POLICY","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"events-policy"}},{"name":"AFW_DOSSIER_EVENTS_PROJECTION_SECRET","type":"secret_text"},{"name":"AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_MONITORING_OWNER_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_OWN_SAVE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"withdrawal-policy"}},{"name":"AFW_DOSSIER_RETIREMENT_POLICY","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"retirement-policy"}},{"name":"AFW_DOSSIER_RETIREMENT_READ_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_SUCCESSOR_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_DOSSIER_SUCCESSOR_POLICY","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"successor-policy"}},{"name":"AFW_FINITE_TRIAL_CONTROL","class_name":"IndependentClosure","script_name":"agent-friendly-web-independent-closure-qa","type":"durable_object_namespace","namespace_id":"070c4a7708eb4592a3ded7c117a88225"},{"name":"AFW_FINITE_TRIAL_VERSION","type":"version_metadata"},{"name":"AFW_OAUTH_ISSUER","type":"plain_text","text":"https://delegated-canary.agentfriendlyweb.dev"},{"name":"AFW_OAUTH_PILOT_CLIENT_ID","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"client-id"}},{"name":"AFW_OAUTH_PILOT_PROJECT_ID","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"project-id"}},{"name":"AFW_OAUTH_REFRESH_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_OAUTH_RESOURCE","type":"plain_text","text":"https://delegated-canary.agentfriendlyweb.dev/mcp"},{"name":"AFW_OAUTH_SERVICE_MODE","type":"plain_text","text":"window"},{"name":"DB","type":"d1","id":"6a728254-1494-4039-802e-b39288a55fcc"},{"name":"OAUTH_KV","type":"kv_namespace","namespace_id":"6b94ff702e504e14a7730cee73a0f6ff"}]}});
-const configs=freeze({"qaLive":{"name":"agent-friendly-web-independent-closure-qa","account_id":"85d0d5dadac3341a564f22ce885e9eec","main":"worker/independent-closure/finite.mjs","compatibility_date":"2026-09-07","workers_dev":false,"preview_urls":false,"routes":[],"triggers":{"crons":[]},"durable_objects":{"bindings":[{"name":"AFW_INDEPENDENT_CLOSURE","class_name":"IndependentClosure"},{"name":"AFW_QA_PREREGISTRY","class_name":"PrivateQaPreregistration"},{"name":"AFW_MCP_CLOSURE_NODE","class_name":"AfwOwnEventNode","script_name":"agent-friendly-web-delegated-canary"},{"name":"AFW_RELEASE_EVENTS_NODE","class_name":"AfwOwnEventNode","script_name":"agent-friendly-web-delegated-canary"}]},"migrations":[{"tag":"afw-own-qa-closed-v1","new_sqlite_classes":["IndependentClosure"]},{"tag":"afw-private-preregistry-v1","new_sqlite_classes":["PrivateQaPreregistration"]}],"d1_databases":[{"database_id":"676ca49e-af71-4f2f-a12d-11f13de78a51","database_name":"agent-friendly-web-independent-closure-qa","binding":"AFW_QA_DB"},{"binding":"RELEASE_DB","database_name":"agent-friendly-web-delegated-canary","database_id":"6a728254-1494-4039-802e-b39288a55fcc"},{"binding":"AFW_QA_DOSSIER_DB","database_name":"agent-friendly-web-delegated-canary","database_id":"6a728254-1494-4039-802e-b39288a55fcc"}],"workflows":[{"name":"afw-own-qa-private-bootstrap","binding":"AFW_QA_BOOTSTRAP","class_name":"PrivateQaBootstrap"},{"name":"afw-own-qa-private-confirmation","binding":"AFW_QA_NAMED_CONFIRMATION","class_name":"PrivateQaNamedConfirmation"}],"ratelimits":[{"name":"AFW_QA_OCCURRENCE_RATE_LIMITER","namespace_id":"2026101003","simple":{"limit":10,"period":60}}],"vars":{"AFW_QA_HTTP_ENABLED":"false","AFW_QA_HTTP_POLICY":"","AFW_QA_BOOTSTRAP_ENABLED":"false","AFW_QA_PREREGISTRATION":"","AFW_QA_CHALLENGE_ENABLED":"false","AFW_QA_CHALLENGE_IDENTITY":"","AFW_MCP_CLOSURE_ENABLED":"false","AFW_MCP_CLOSURE_POLICY":"","AFW_MCP_READER_PROBE_ENABLED":"false","AFW_MCP_READER_PROBE_POLICY":"","AFW_MCP_PUBLISHER_PROBE_ENABLED":"false","AFW_MCP_PUBLISHER_PROBE_POLICY":"","AFW_MCP_CLOSURE_DISPATCH_ENABLED":"false","AFW_MCP_CLOSURE_DISPATCH_POLICY":"","AFW_QA_ORIGINALS_ENABLED":"false","AFW_QA_PROVIDER_OBSERVATION_ENABLED":"false","AFW_QA_PRIMARY_RESERVATION_ENABLED":"false","AFW_QA_INSTALLATION_ENABLED":"false","AFW_QA_PRIMARY_CATALOG_ENABLED":"false","AFW_QA_PRIMARY_ADMISSION_ENABLED":"false","AFW_MCP_CLOSURE_REDUCTION_ENABLED":"false","AFW_RELEASE_OPERATOR_ENABLED":"true","AFW_RELEASE_WORKFLOW_ENABLED":"true","AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED":"true","AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED":"true"},"compatibility_flags":["nodejs_compat","enable_request_signal"],"version_metadata":{"binding":"AFW_QA_VERSION"},"tail_consumers":[]},"canaryLive":{"name":"agent-friendly-web-delegated-canary","account_id":"85d0d5dadac3341a564f22ce885e9eec","main":"worker/mcp-own/finite.mjs","compatibility_date":"2026-09-07","compatibility_flags":["nodejs_compat","global_fetch_strictly_public","enable_request_signal"],"workers_dev":false,"preview_urls":false,"routes":[],"triggers":{"crons":[]},"tail_consumers":[],"observability":{"enabled":false},"vars":{"AFW_DELEGATED_OAUTH_ENABLED":"false","AFW_OAUTH_REFRESH_ENABLED":"false","AFW_OAUTH_SERVICE_MODE":"window","AFW_OAUTH_ISSUER":"https://delegated-canary.agentfriendlyweb.dev","AFW_OAUTH_RESOURCE":"https://delegated-canary.agentfriendlyweb.dev/mcp","AFW_DOSSIER_EVENTS_ENABLED":"true","AFW_DOSSIER_SUCCESSOR_ENABLED":"true","AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED":"true","AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED":"false","AFW_DOSSIER_RETIREMENT_READ_ENABLED":"false","AFW_DOSSIER_OWN_SAVE_ENABLED":"false","AFW_DOSSIER_MONITORING_OWNER_ENABLED":"false","AFW_DOSSIER_EVENTS_NODE_NAME":"afw-own-event-first-successor-v1"},"d1_databases":[{"binding":"DB","database_name":"agent-friendly-web-delegated-canary","database_id":"6a728254-1494-4039-802e-b39288a55fcc"}],"kv_namespaces":[{"binding":"OAUTH_KV","id":"6b94ff702e504e14a7730cee73a0f6ff"}],"durable_objects":{"bindings":[{"name":"AFW_DOSSIER_EVENTS_NODE","class_name":"AfwOwnEventNode"},{"name":"AFW_FINITE_TRIAL_CONTROL","class_name":"IndependentClosure","script_name":"agent-friendly-web-independent-closure-qa"}]},"version_metadata":{"binding":"AFW_FINITE_TRIAL_VERSION"},"exports":{"default":{"type":"worker"},"AfwNodeControl":{"type":"worker"},"AfwOwnEventNode":{"type":"durable-object","storage":"sqlite","container":"agent-friendly-web-delegated-canary-afwowneventnode"}},"unsafe":{"metadata":{"exports":{"default":{"type":"worker"},"AfwNodeControl":{"type":"worker"},"AfwOwnEventNode":{"type":"durable-object","storage":"sqlite","container":"agent-friendly-web-delegated-canary-afwowneventnode"}},"containers":[{"class_name":"AfwOwnEventNode"}]}}}});
+const templates=freeze({"qaLive":{"compatibility_date":"2026-09-07","compatibility_flags":["nodejs_compat","enable_request_signal"],"main_module":"index.mjs","usage_model":"standard","containers":[],"exports":["IndependentClosure","PrivateQaBootstrap","PrivateQaCatalog","PrivateQaNamedConfirmation","PrivateQaPreregistration","default","observePrivateQa"],"bindings":[{"name":"AFW_FINITE_OWNER_OAUTH_KV","type":"kv_namespace","namespace_id":"6b94ff702e504e14a7730cee73a0f6ff"},{"name":"AFW_INDEPENDENT_CLOSURE","class_name":"IndependentClosure","type":"durable_object_namespace","namespace_id":"070c4a7708eb4592a3ded7c117a88225"},{"name":"AFW_MCP_CLOSURE_DISPATCH_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_CLOSURE_DISPATCH_POLICY","type":"plain_text","text":""},{"name":"AFW_MCP_CLOSURE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_CLOSURE_NODE","class_name":"AfwOwnEventNode","script_name":"agent-friendly-web-delegated-canary","type":"durable_object_namespace","namespace_id":"d6fc71552de7494a863aca20365a572d"},{"name":"AFW_MCP_CLOSURE_POLICY","type":"plain_text","text":""},{"name":"AFW_MCP_CLOSURE_PUBLISH_TOKEN","type":"secret_text"},{"name":"AFW_MCP_CLOSURE_READ_TOKEN","type":"secret_text"},{"name":"AFW_MCP_CLOSURE_REDUCTION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_PUBLISHER_PROBE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_PUBLISHER_PROBE_POLICY","type":"plain_text","text":""},{"name":"AFW_MCP_READER_PROBE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_MCP_READER_PROBE_POLICY","type":"plain_text","text":""},{"name":"AFW_QA_BOOTSTRAP","type":"workflow","workflow_name":"afw-own-qa-private-bootstrap","class_name":"PrivateQaBootstrap"},{"name":"AFW_QA_BOOTSTRAP_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_CHALLENGE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_CHALLENGE_IDENTITY","type":"plain_text","text":""},{"name":"AFW_QA_DB","type":"d1","id":"676ca49e-af71-4f2f-a12d-11f13de78a51"},{"name":"AFW_QA_DOSSIER_DB","type":"d1","id":"6a728254-1494-4039-802e-b39288a55fcc"},{"name":"AFW_QA_HTTP_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_HTTP_POLICY","type":"plain_text","text":""},{"name":"AFW_QA_INSTALLATION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_NAMED_CONFIRMATION","type":"workflow","workflow_name":"afw-own-qa-private-confirmation","class_name":"PrivateQaNamedConfirmation"},{"name":"AFW_QA_OCCURRENCE_RATE_LIMITER","type":"ratelimit","namespace_id":"2026101003","simple":{"limit":10,"period":60}},{"name":"AFW_QA_ORIGINALS_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_PREREGISTRATION","type":"plain_text","text":""},{"name":"AFW_QA_PREREGISTRY","class_name":"PrivateQaPreregistration","type":"durable_object_namespace","namespace_id":"6f30104244424152b800bc64d5f4cfac"},{"name":"AFW_QA_PRIMARY_ADMISSION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_PRIMARY_CATALOG_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_PRIMARY_RESERVATION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_PROVIDER_OBSERVATION_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_QA_VERSION","type":"version_metadata"},{"name":"AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_RELEASE_EVENTS_NODE","class_name":"AfwOwnEventNode","script_name":"agent-friendly-web-delegated-canary","type":"durable_object_namespace","namespace_id":"d6fc71552de7494a863aca20365a572d"},{"name":"AFW_RELEASE_OPERATOR_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_RELEASE_WORKFLOW_ENABLED","type":"plain_text","text":"true"},{"name":"RELEASE_DB","type":"d1","id":"6a728254-1494-4039-802e-b39288a55fcc"}]},"canaryLive":{"compatibility_date":"2026-09-07","compatibility_flags":["nodejs_compat","global_fetch_strictly_public","enable_request_signal"],"main_module":"index.mjs","usage_model":"standard","containers":[{"class_name":"AfwOwnEventNode","name":"agent-friendly-web-delegated-canary-afwowneventnode"}],"exports":{"default":{"type":"worker"},"AfwNodeControl":{"type":"worker"},"AfwOwnEventNode":{"type":"durable-object","storage":"sqlite","container":"agent-friendly-web-delegated-canary-afwowneventnode"}},"bindings":[{"name":"AFW_DELEGATED_OAUTH_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_EVENTS_CUSTODY_KEY","type":"secret_text"},{"name":"AFW_DOSSIER_EVENTS_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_DOSSIER_EVENTS_NODE","class_name":"AfwOwnEventNode","type":"durable_object_namespace","namespace_id":"d6fc71552de7494a863aca20365a572d"},{"name":"AFW_DOSSIER_EVENTS_NODE_NAME","type":"plain_text","text":"afw-own-event-first-successor-v1"},{"name":"AFW_DOSSIER_EVENTS_POLICY","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"events-policy"}},{"name":"AFW_DOSSIER_EVENTS_PROJECTION_SECRET","type":"secret_text"},{"name":"AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_MONITORING_OWNER_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_OWN_SAVE_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"withdrawal-policy"}},{"name":"AFW_DOSSIER_RETIREMENT_POLICY","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"retirement-policy"}},{"name":"AFW_DOSSIER_RETIREMENT_READ_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_DOSSIER_SUCCESSOR_ENABLED","type":"plain_text","text":"true"},{"name":"AFW_DOSSIER_SUCCESSOR_POLICY","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"successor-policy"}},{"name":"AFW_FINITE_TRIAL_CONTROL","class_name":"IndependentClosure","script_name":"agent-friendly-web-independent-closure-qa","type":"durable_object_namespace","namespace_id":"070c4a7708eb4592a3ded7c117a88225"},{"name":"AFW_FINITE_TRIAL_VERSION","type":"version_metadata"},{"name":"AFW_OAUTH_ISSUER","type":"plain_text","text":"https://delegated-canary.agentfriendlyweb.dev"},{"name":"AFW_OAUTH_PILOT_CLIENT_ID","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"client-id"}},{"name":"AFW_OAUTH_PILOT_PROJECT_ID","type":"plain_text","privateSlot":{"purpose":"afw.finite-private-slot.v1","kind":"project-id"}},{"name":"AFW_OAUTH_REFRESH_ENABLED","type":"plain_text","text":"false"},{"name":"AFW_OAUTH_RESOURCE","type":"plain_text","text":"https://delegated-canary.agentfriendlyweb.dev/mcp"},{"name":"AFW_OAUTH_SERVICE_MODE","type":"plain_text","text":"window"},{"name":"DB","type":"d1","id":"6a728254-1494-4039-802e-b39288a55fcc"},{"name":"OAUTH_KV","type":"kv_namespace","namespace_id":"6b94ff702e504e14a7730cee73a0f6ff"}]}});
+const configs=freeze({"qaLive":{"name":"agent-friendly-web-independent-closure-qa","account_id":"85d0d5dadac3341a564f22ce885e9eec","main":"worker/independent-closure/finite.mjs","compatibility_date":"2026-09-07","workers_dev":false,"preview_urls":false,"routes":[],"triggers":{"crons":[]},"durable_objects":{"bindings":[{"name":"AFW_INDEPENDENT_CLOSURE","class_name":"IndependentClosure"},{"name":"AFW_QA_PREREGISTRY","class_name":"PrivateQaPreregistration"},{"name":"AFW_MCP_CLOSURE_NODE","class_name":"AfwOwnEventNode","script_name":"agent-friendly-web-delegated-canary"},{"name":"AFW_RELEASE_EVENTS_NODE","class_name":"AfwOwnEventNode","script_name":"agent-friendly-web-delegated-canary"}]},"migrations":[{"tag":"afw-own-qa-closed-v1","new_sqlite_classes":["IndependentClosure"]},{"tag":"afw-private-preregistry-v1","new_sqlite_classes":["PrivateQaPreregistration"]}],"d1_databases":[{"database_id":"676ca49e-af71-4f2f-a12d-11f13de78a51","database_name":"agent-friendly-web-independent-closure-qa","binding":"AFW_QA_DB"},{"binding":"RELEASE_DB","database_name":"agent-friendly-web-delegated-canary","database_id":"6a728254-1494-4039-802e-b39288a55fcc"},{"binding":"AFW_QA_DOSSIER_DB","database_name":"agent-friendly-web-delegated-canary","database_id":"6a728254-1494-4039-802e-b39288a55fcc"}],"kv_namespaces":[{"binding":"AFW_FINITE_OWNER_OAUTH_KV","id":"6b94ff702e504e14a7730cee73a0f6ff"}],"workflows":[{"name":"afw-own-qa-private-bootstrap","binding":"AFW_QA_BOOTSTRAP","class_name":"PrivateQaBootstrap"},{"name":"afw-own-qa-private-confirmation","binding":"AFW_QA_NAMED_CONFIRMATION","class_name":"PrivateQaNamedConfirmation"}],"ratelimits":[{"name":"AFW_QA_OCCURRENCE_RATE_LIMITER","namespace_id":"2026101003","simple":{"limit":10,"period":60}}],"vars":{"AFW_QA_HTTP_ENABLED":"false","AFW_QA_HTTP_POLICY":"","AFW_QA_BOOTSTRAP_ENABLED":"false","AFW_QA_PREREGISTRATION":"","AFW_QA_CHALLENGE_ENABLED":"false","AFW_QA_CHALLENGE_IDENTITY":"","AFW_MCP_CLOSURE_ENABLED":"false","AFW_MCP_CLOSURE_POLICY":"","AFW_MCP_READER_PROBE_ENABLED":"false","AFW_MCP_READER_PROBE_POLICY":"","AFW_MCP_PUBLISHER_PROBE_ENABLED":"false","AFW_MCP_PUBLISHER_PROBE_POLICY":"","AFW_MCP_CLOSURE_DISPATCH_ENABLED":"false","AFW_MCP_CLOSURE_DISPATCH_POLICY":"","AFW_QA_ORIGINALS_ENABLED":"false","AFW_QA_PROVIDER_OBSERVATION_ENABLED":"false","AFW_QA_PRIMARY_RESERVATION_ENABLED":"false","AFW_QA_INSTALLATION_ENABLED":"false","AFW_QA_PRIMARY_CATALOG_ENABLED":"false","AFW_QA_PRIMARY_ADMISSION_ENABLED":"false","AFW_MCP_CLOSURE_REDUCTION_ENABLED":"false","AFW_RELEASE_OPERATOR_ENABLED":"true","AFW_RELEASE_WORKFLOW_ENABLED":"true","AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED":"true","AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED":"true"},"compatibility_flags":["nodejs_compat","enable_request_signal"],"version_metadata":{"binding":"AFW_QA_VERSION"},"tail_consumers":[]},"canaryLive":{"name":"agent-friendly-web-delegated-canary","account_id":"85d0d5dadac3341a564f22ce885e9eec","main":"worker/mcp-own/finite.mjs","compatibility_date":"2026-09-07","compatibility_flags":["nodejs_compat","global_fetch_strictly_public","enable_request_signal"],"workers_dev":false,"preview_urls":false,"routes":[],"triggers":{"crons":[]},"tail_consumers":[],"observability":{"enabled":false},"vars":{"AFW_DELEGATED_OAUTH_ENABLED":"false","AFW_OAUTH_REFRESH_ENABLED":"false","AFW_OAUTH_SERVICE_MODE":"window","AFW_OAUTH_ISSUER":"https://delegated-canary.agentfriendlyweb.dev","AFW_OAUTH_RESOURCE":"https://delegated-canary.agentfriendlyweb.dev/mcp","AFW_DOSSIER_EVENTS_ENABLED":"true","AFW_DOSSIER_SUCCESSOR_ENABLED":"true","AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED":"true","AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED":"false","AFW_DOSSIER_RETIREMENT_READ_ENABLED":"false","AFW_DOSSIER_OWN_SAVE_ENABLED":"false","AFW_DOSSIER_MONITORING_OWNER_ENABLED":"false","AFW_DOSSIER_EVENTS_NODE_NAME":"afw-own-event-first-successor-v1"},"d1_databases":[{"binding":"DB","database_name":"agent-friendly-web-delegated-canary","database_id":"6a728254-1494-4039-802e-b39288a55fcc"}],"kv_namespaces":[{"binding":"OAUTH_KV","id":"6b94ff702e504e14a7730cee73a0f6ff"}],"durable_objects":{"bindings":[{"name":"AFW_DOSSIER_EVENTS_NODE","class_name":"AfwOwnEventNode"},{"name":"AFW_FINITE_TRIAL_CONTROL","class_name":"IndependentClosure","script_name":"agent-friendly-web-independent-closure-qa"}]},"version_metadata":{"binding":"AFW_FINITE_TRIAL_VERSION"},"exports":{"default":{"type":"worker"},"AfwNodeControl":{"type":"worker"},"AfwOwnEventNode":{"type":"durable-object","storage":"sqlite","container":"agent-friendly-web-delegated-canary-afwowneventnode"}},"unsafe":{"metadata":{"exports":{"default":{"type":"worker"},"AfwNodeControl":{"type":"worker"},"AfwOwnEventNode":{"type":"durable-object","storage":"sqlite","container":"agent-friendly-web-delegated-canary-afwowneventnode"}},"containers":[{"class_name":"AfwOwnEventNode"}]}}}});
 export function finitePublicProfileTemplate(role){if(typeof role!=='string'||!Object.hasOwn(templates,role))fail();return templates[role];}
 export function finiteWranglerProfileTemplate(role){if(typeof role!=='string'||!Object.hasOwn(configs,role))fail();return configs[role];}
 export function projectFinitePublicConfiguration(input){
```

### test/mcp-qa-finite-bootstrap-compiler.test.mjs

```diff
@@ -13,10 +13,13 @@ test('real compiler binds exact tracked workflow/CLI hashes in QA only and exclu
   const hash=sha(await readFile(path));assert.equal(r.bootstrapSource[key],hash);assert(r.files['qaLive/index.mjs'].includes(Buffer.from(hash)));assert(!r.files['canaryLive/index.mjs'].includes(Buffer.from(hash)));
  }
  assert(r.metafiles.qaLive.inputs['lib/mcp-qa-finite-bootstrap-source.mjs']);
- for(const path of ['lib/mcp-qa-finite-initial-entry.mjs','lib/mcp-qa-finite-initial-entry-records.mjs']){assert(r.metafiles.qaLive.inputs[path]);assert.equal(r.metafiles.canaryLive.inputs[path],undefined);}
+ for(const path of ['lib/mcp-qa-finite-initial-entry.mjs','lib/mcp-qa-finite-initial-entry-records.mjs'])assert(r.metafiles.qaLive.inputs[path]);
+ assert.equal(r.metafiles.canaryLive.inputs['lib/mcp-qa-finite-initial-entry.mjs'],undefined);
+ // Accepted M phase-context reads the original capsule codec; it imports Entry records as DATA only.
+ assert(r.metafiles.canaryLive.inputs['lib/mcp-qa-finite-initial-entry-records.mjs']);
  for(const role of ['qaLive','canaryLive'])for(const output of Object.values(r.metafiles[role].outputs))assert(output.imports.every(x=>!/^node:fs(?:\/|$)/.test(x.path)),'no filesystem import in runtime graph');assert(!r.metafiles.canaryLive.inputs['lib/mcp-qa-finite-bootstrap-source.mjs']);
  for(const role of ['qaLive','canaryLive'])assert(Object.keys(r.metafiles[role].inputs).every(x=>!x.includes('bootstrap-issuer')&&!x.includes('build-finite-native-package')&&!x.includes('node_modules/esbuild')));
  assert.equal(r.completePackage,false);assert.equal(r.manifest,undefined);
- console.log('ACTUAL compiler bytes QA='+r.files['qaLive/index.mjs'].length+' canary='+r.files['canaryLive/index.mjs'].length);
+ console.log('D0.1 ACTUAL compiler '+JSON.stringify({sourceRevision:r.sourceRevision,sourceTree:r.sourceTree,qa:{bytes:r.files['qaLive/index.mjs'].length,sha256:sha(r.files['qaLive/index.mjs']),publicStatic:r.modules.qaLive.publicStatic,inputs:Object.keys(r.metafiles.qaLive.inputs).length},m:{bytes:r.files['canaryLive/index.mjs'].length,sha256:sha(r.files['canaryLive/index.mjs']),publicStatic:r.modules.canaryLive.publicStatic,inputs:Object.keys(r.metafiles.canaryLive.inputs).length},completePackage:r.completePackage,operationalReadiness:r.operationalReadiness}));
  await assert.rejects(buildFiniteNativePackage({cwd:process.cwd(),sourceRevision:M}));
 });
```

### test/mcp-qa-finite-bootstrap.test.mjs

```diff
@@ -1,6 +1,7 @@
 import test from 'node:test';
 import assert from 'node:assert/strict';
 import {finitePublicStaticExpectation,finitePublicProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';
+import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
 let recordApi,admissionApi;
 try{recordApi=await import('../lib/mcp-qa-finite-bootstrap-record.mjs');}catch{/* behavioral RED: product absent */}
 try{admissionApi=await import('../lib/mcp-qa-finite-bootstrap-admission.mjs');}catch{/* behavioral RED: product absent */}
@@ -64,3 +65,12 @@ for(const mutation of ['owner','repo','branch','attempt','event','issue','pull-r
  if(mutation==='expired')c.event.comment.created_at=new Date(Date.now()-300000).toISOString();
  assert.throws(()=>admissionApi.validateQaBootstrapCommand(c));
 });
+
+test('D0.1 old sealed QA public binding commitment is rejected by actual bootstrap codec',()=>{
+ const old=record(),qa=finitePublicProfileTemplate('qaLive');
+ const prior=qa.bindings.filter(x=>x.name!=='AFW_FINITE_OWNER_OAUTH_KV');
+ const oldHash=initialHash('afw.finite-public-bindings.v1',prior);
+ assert.notEqual(oldHash,old.qaLive.publicStatic.bindingsHash);
+ old.qaLive.publicStatic={...old.qaLive.publicStatic,bindingsHash:oldHash};
+ assert.throws(()=>recordApi.encodeFiniteQaBootstrap(old));
+});
```

### test/mcp-qa-finite-initial-capsule-native.test.mjs

```diff
@@ -2,6 +2,7 @@ import test from 'node:test';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
 import {initialCanonical as canonical,initialHash,hashFiniteInitialMaterialRecord} from '../lib/mcp-qa-finite-initial-material-records.mjs';
+import {finitePublicProfileTemplate,finitePublicStaticExpectation} from '../lib/mcp-qa-finite-profile.mjs';
 import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
 const P='afw.finite-initial-preparation.v1:',C='afw.finite-initial-cleanup.v1:',KEY=P+'capsule',get=(rows,key)=>rows.find(([k])=>k===key)?.[1];
 async function using(fn,mode='normal'){const f=await initialEntryHarness(mode);try{await f.stub.configure('normal');await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
@@ -13,6 +14,14 @@ test('capsule binds actual M and exact A journals once, survives restart and lea
  assert.equal(await invoke(f),'material_recorded');
  const rows=await f.stub.snapshot(),raw=get(rows,KEY),v=JSON.parse(raw),m=JSON.parse(get(rows,P+'material:'+v.materialHash)),ack=JSON.parse(get(rows,P+'ack')),selector=JSON.parse(get(rows,P+'selector')),plan=JSON.parse(get(rows,C+'plan')),completion=JSON.parse(get(rows,C+'activation-completion'));
  assert.equal(v.purpose,'afw.finite-initial-capsule.v1');assert.equal(v.activatedVersionId,'55555555-5555-4555-8555-555555555555');assert.equal(v.activatedDeploymentId,completion.deploymentId);assert.notEqual(v.activatedVersionId,f.x.pin.id);assert.notEqual(v.activatedDeploymentId,f.x.pin.deploymentId);
+ assert.deepEqual(m.qaBootstrap.record.qaLive.publicStatic,finitePublicStaticExpectation('qaLive'));
+ const prior=finitePublicProfileTemplate('qaLive').bindings.filter(b=>b.name!=='AFW_FINITE_OWNER_OAUTH_KV');
+ const oldHash=initialHash('afw.finite-public-bindings.v1',prior);
+ assert.notEqual(oldHash,m.qaBootstrap.record.qaLive.publicStatic.bindingsHash);
+ const oldMaterial=structuredClone(m);
+ oldMaterial.qaBootstrap.record.qaLive.publicStatic.bindingsHash=oldHash;
+ assert.throws(()=>hashFiniteInitialMaterialRecord('InitialMaterial',oldMaterial));
+ console.log('D0.1 actual codec lineage '+JSON.stringify({qaBindingsHash:m.qaBootstrap.record.qaLive.publicStatic.bindingsHash,materialHash:v.materialHash,capsuleHash:v.capsuleHash,mBindingsHash:v.bindingsHash}));
  assert.equal(v.selectorHash,hashFiniteInitialMaterialRecord('InitialSelector',selector));assert.equal(v.materialAckHash,hashFiniteInitialMaterialRecord('InitialAck',ack));assert.equal(v.preconnectionId,m.preconnectionId);assert.equal(v.qaVersionId,m.qaBootstrap.currentPointer.versionId);assert.equal(v.qaDeploymentId,m.qaBootstrap.currentPointer.deploymentId);
  assert.equal(v.bindingsHash,createHash('sha256').update(canonical([...plan.configuration.bindings].sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0))).digest('hex'));
  assert.equal(v.moduleHash,f.resident.module.sha256);assert.notEqual(v.moduleHash,f.x.pin.module.sha256);assert.equal(v.C0,v.I0+900000);assert.equal(v.C1,v.C0+180000);assert.ok(v.recordedAt>=completion.observedAt&&v.recordedAt<v.initialDeadline);
```

### test/mcp-qa-finite-owner-sdk-binding-facts.test.mjs

```diff
@@ -0,0 +1,40 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {finitePublicProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';
+let api;try{api=await import('../lib/mcp-qa-finite-owner-sdk-binding-facts.mjs');}catch{/* missing helper is causal RED */}
+const alias='AFW_FINITE_OWNER_OAUTH_KV',id='6b94ff702e504e14a7730cee73a0f6ff';
+const canonical=v=>Array.isArray(v)?'['+v.map(canonical).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}':JSON.stringify(v);
+function metadata(){
+ const qaMetadata=structuredClone(finitePublicProfileTemplate('qaLive'));
+ const mMetadata=structuredClone(finitePublicProfileTemplate('canaryLive'));
+ mMetadata.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='false';
+ return {qaMetadata,mMetadata};
+}
+test('D0.1 strict DATA maps exact QA alias to original M KV under closed/read M preparation',()=>{
+ assert.equal(typeof api?.qualifyFiniteOwnerSdkBindingFacts,'function');
+ for(const flag of ['false','true']){
+  const v=metadata();v.mMetadata.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text=flag;
+  const f=api.qualifyFiniteOwnerSdkBindingFacts(v);
+  assert.deepEqual(f,{alias,namespaceId:id,bindingHash:createHash('sha256').update('afw.finite-owner-sdk-binding.v1\n'+canonical({alias,namespaceId:id})).digest('hex')});
+  assert(Object.isFrozen(f));assert.equal(Object.keys(f).length,3);
+ }
+});
+test('D0.1 wrong roles, namespace drift, extra alias, fake profile and hostile DATA deny',()=>{
+ assert.equal(typeof api?.qualifyFiniteOwnerSdkBindingFacts,'function');
+ const good=metadata();
+ const denied=[
+  {...good,qaMetadata:good.mMetadata,mMetadata:good.qaMetadata},
+  {...good,qaMetadata:{...good.qaMetadata,bindings:good.qaMetadata.bindings.filter(b=>b.name!==alias)}},
+  {...good,qaMetadata:{...good.qaMetadata,bindings:good.qaMetadata.bindings.map(b=>b.name===alias?{...b,namespace_id:'0'.repeat(32)}:b)}},
+  {...good,mMetadata:{...good.mMetadata,bindings:good.mMetadata.bindings.map(b=>b.name==='OAUTH_KV'?{...b,namespace_id:'0'.repeat(32)}:b)}},
+  {...good,qaMetadata:{...good.qaMetadata,bindings:[...good.qaMetadata.bindings,{name:'EXTRA_OAUTH_KV',type:'kv_namespace',namespace_id:id}]}},
+  {...good,mMetadata:{...good.mMetadata,bindings:[...good.mMetadata.bindings,{name:'OAUTH_KV',type:'kv_namespace',namespace_id:id}]}},
+  {...good,qaMetadata:{...good.qaMetadata,compatibility_date:'2026-09-08'}},
+  {...good,qaMetadata:Object.assign(Object.create({}),good.qaMetadata)},
+  {...good,qaMetadata:{...good.qaMetadata,[Symbol('extra')]:true}},
+ ];
+ for(const v of denied)assert.throws(()=>api.qualifyFiniteOwnerSdkBindingFacts(v));
+ let reads=0;const hostile=metadata();Object.defineProperty(hostile.qaMetadata.bindings[0],'name',{enumerable:true,get(){reads++;return alias;}});
+ assert.throws(()=>api.qualifyFiniteOwnerSdkBindingFacts(hostile));assert.equal(reads,0);
+});
```

### test/mcp-qa-finite-profile-native.test.mjs

```diff
@@ -66,3 +66,18 @@ test('actual finite QA class constructs fixed actor and retains closed diagnosti
   assert.equal(r.material,false);
  }finally{await mf.dispose();}
 });
+
+test('D0.1 checked-in QA Wrangler exactly matches revised source; historical and M pins stay fixed',async()=>{
+ const {readFile}=await import('node:fs/promises');
+ const {finiteWranglerProfileTemplate,finitePublicProfileTemplate}=await import('../lib/mcp-qa-finite-profile.mjs');
+ const {QA_CLOUD_CLOSED_PINS}=await import('../lib/mcp-qa-cloud-closed-pins.mjs');
+ const qa=JSON.parse(await readFile('wrangler.independent-closure-qa.finite.jsonc','utf8'));
+ assert.deepEqual(qa,finiteWranglerProfileTemplate('qaLive'));
+ assert.deepEqual(qa.kv_namespaces,[{binding:'AFW_FINITE_OWNER_OAUTH_KV',id:'6b94ff702e504e14a7730cee73a0f6ff'}]);
+ assert.equal(finitePublicProfileTemplate('qaLive').bindings.filter(b=>b.type==='kv_namespace').length,1);
+ assert.deepEqual(finiteWranglerProfileTemplate('canaryLive').kv_namespaces,[{binding:'OAUTH_KV',id:'6b94ff702e504e14a7730cee73a0f6ff'}]);
+ assert.equal(finitePublicProfileTemplate('canaryLive').bindings.some(b=>b.name==='AFW_FINITE_OWNER_OAUTH_KV'),false);
+ assert.equal(QA_CLOUD_CLOSED_PINS.qaClosed.id,'c570b60b-95dc-48e1-89f3-9c4651691dbc');
+ assert.equal(QA_CLOUD_CLOSED_PINS.qaClosed.bindingCount,31);
+ assert.equal(QA_CLOUD_CLOSED_PINS.canary.id,'2607abae-cec3-4e35-89eb-8b8572262b54');
+});
```

### test/mcp-qa-finite-profile.test.mjs

```diff
@@ -131,3 +131,16 @@ test('candidate descriptor declares fixed finite activation while QA remains nul
   assert.equal(descriptor.privateFull.activationAlgorithm,role==='canaryLive'?'finiteActivationConfigurationHash':null);
  }
 });
+
+test('D0.1 exact QA SDK alias changes only qaLive source contract',()=>{
+ const q=api.finitePublicProfileTemplate('qaLive');
+ const m=api.finitePublicProfileTemplate('canaryLive');
+ const alias={name:'AFW_FINITE_OWNER_OAUTH_KV',type:'kv_namespace',namespace_id:'6b94ff702e504e14a7730cee73a0f6ff'};
+ assert.deepEqual(q.bindings.filter(b=>b.name===alias.name),[alias]);
+ assert.deepEqual(m.bindings.filter(b=>b.type==='kv_namespace'),[{name:'OAUTH_KV',type:'kv_namespace',namespace_id:alias.namespace_id}]);
+ const config=api.finiteWranglerProfileTemplate('qaLive');
+ assert.deepEqual(config.kv_namespaces,[{binding:alias.name,id:alias.namespace_id}]);
+ assert.deepEqual(api.projectFinitePublicConfiguration({role:'qaLive',metadata:q}),q);
+ const changed=structuredClone(q);changed.bindings.find(b=>b.name===alias.name).namespace_id='0'.repeat(32);
+ assert.throws(()=>api.projectFinitePublicConfiguration({role:'qaLive',metadata:changed}));
+});
```

### wrangler.independent-closure-qa.finite.jsonc

```diff
@@ -62,6 +62,12 @@
       "database_id": "6a728254-1494-4039-802e-b39288a55fcc"
     }
   ],
+  "kv_namespaces": [
+    {
+      "binding": "AFW_FINITE_OWNER_OAUTH_KV",
+      "id": "6b94ff702e504e14a7730cee73a0f6ff"
+    }
+  ],
   "workflows": [
     {
       "name": "afw-own-qa-private-bootstrap",
```

## Root verified final Actions
Run41946053720/job126978408579/attempt1 succeeded, actual codeHEAD9fe7e2f53f4e594879b3992e5751fe631c03ec60/treeee2817c5d711b073a12ccd7fa2aef2f840e577f4. Scoped143PASS0FAIL0skip; compilergate1PASS0FAIL; ESLint0errors16existingwarnings. Original caps unchanged. Exact logs independently fetched by root; report gives hashes and fiveactualcompilerinvocations. FinalreportHEAD04e8bb0f changes only report+qualifierremoval relativetestedcode.

## Root graph ruling context (a decision to review, not an instruction to approve)
At pinnedBASE, initial-anchors imports decodeFiniteInitialEntry from initial-entry-records, which imports material-records; entryrecords exports pureDATA hash/encode/decode only. Original compiler test incorrectly paired effectfulEntry exclusion with purecodec exclusion in M. Root allowed minimal testonly separation. Relevant sourceblobs unchanged BASE..HEAD. Durable ruling: docs/superpowers/reviews/2026-11-04-sdk-alias-shared-codec-graph-ruling.md at rootdocs1ef8a4c9990654d0341b372bb864a4a5afc53056. Verify remaining effectful exclusions and assess this adjustment on merits.
