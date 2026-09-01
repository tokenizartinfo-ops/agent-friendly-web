# Agent Friendly Web Contact Worker Frontier v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir y desplegar en estado OFF una frontera Worker privada para Gate 6B con identidad Access firmada, CORS exacto, rate limiting nativo, Turnstile obligatorio y D1 aislada.

**Architecture:** Un Worker independiente compone modulos puros para identidad, politica HTTP y persistencia. El kill switch se evalua antes de identidad, limiter y cuerpo; cuando se habilite en un gate posterior, la identidad se deriva exclusivamente de un JWT Access verificado y la persistencia ocurre solo despues del rate limiter, validacion acotada y Turnstile server-side.

**Tech Stack:** Cloudflare Workers, Wrangler 4.92.0, Cloudflare Access JWT, `jose` 6.2.10, Workers Rate Limiting binding, D1, Node test runner.

**Spec:** `docs/superpowers/specs/2026-08-31-agent-friendly-web-contact-worker-frontier-v1-design.md`

## Global Constraints

- `POST /api/contact-intake` publico conserva `503 contact_capture_disabled`.
- El Worker staging usa `CONTACT_STAGING_WRITES_ENABLED=false` durante todo este plan.
- No se ejecuta escritura sintetica, correo, CRM, pago, webhook ni contacto real.
- No se confia en headers de email o usuario sin JWT Access valido.
- El cuerpo se lee despues de host, CORS, kill switch, identidad, bindings y limiter.
- Ninguna respuesta o log contiene JWT, cookie, token Turnstile, secret, email completo o cuerpo.
- El hostname API y el hostname del widget Turnstile son configuraciones separadas.
- Toda configuracion ausente falla cerrada.

---

### Task 1: Verificador de identidad Cloudflare Access

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `lib/cloudflare-access-identity.mjs`
- Create: `test/cloudflare-access-identity.test.mjs`

**Interfaces:**
- Produces: `verifyCloudflareAccessJwt({ token, teamDomain, audience, keySet }) -> Promise<{ ok: true, identity: { userId, email } } | { ok: false, code }>`
- Consumes: `jwtVerify` and `createRemoteJWKSet` from `jose`.

- [ ] **Step 1: Add `jose` as a direct dependency**

Run: `npm install jose@6.2.10 --save-exact`

- [ ] **Step 2: Write failing identity tests**

Use a generated RS256 key pair and signed tokens. Cover valid token plus wrong audience, wrong issuer, expiration, missing email and missing subject. Assert every failure returns only `contact_staging_identity_required`.

```js
const result = await verifyCloudflareAccessJwt({
  token,
  teamDomain: 'tokenizart.cloudflareaccess.com',
  audience: 'contact-staging-audience',
  keySet: publicKey,
});
assert.deepEqual(result, {
  ok: true,
  identity: { userId: 'owner-1', email: 'owner@example.com' },
});
```

- [ ] **Step 3: Run the test and verify RED**

Run: `node --test test/cloudflare-access-identity.test.mjs`

Expected: FAIL because `lib/cloudflare-access-identity.mjs` does not exist.

- [ ] **Step 4: Implement bounded JWT verification**

Normalize only a bare team hostname ending in `.cloudflareaccess.com`, construct an HTTPS issuer and cached remote JWKS, then call `jwtVerify` with exact issuer and audience. Accept only non-empty `sub` and normalized email claims; return no raw claims.

- [ ] **Step 5: Run the focused test and full suite**

Run: `node --test test/cloudflare-access-identity.test.mjs && npm test`

Expected: focused tests and all existing tests PASS.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json lib/cloudflare-access-identity.mjs test/cloudflare-access-identity.test.mjs
git commit -m "feat: verify cloudflare access identity"
```

---

### Task 2: Politica Worker, CORS y clave opaca de rate limiting

**Files:**
- Create: `lib/contact-worker-policy.mjs`
- Create: `test/contact-worker-policy.test.mjs`

**Interfaces:**
- Produces: `readContactWorkerPolicy(env)`.
- Produces: `evaluateContactWorkerRequest(policy, request)`.
- Produces: `createOpaqueRateLimitKey(userId, pathname) -> Promise<string>`.
- Consumes: identidad ya verificada; nunca toma identidad del cuerpo.

- [ ] **Step 1: Write failing policy tests**

Cover exact API host, exact HTTPS form origin, separate widget host, `OPTIONS`, rejected wildcard, missing `Origin`, wrong path/method, kill switch OFF and deterministic SHA-256 key without user ID literal.

```js
const policy = readContactWorkerPolicy(rawEnv);
assert.equal(policy.apiHost, 'contact-staging.agentfriendlyweb.dev');
assert.equal(policy.formOrigin, 'https://agent-friendly-web-contact-staging.tokenizart.chatgpt.site');
assert.equal(policy.widgetHost, 'agent-friendly-web-contact-staging.tokenizart.chatgpt.site');
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test test/contact-worker-policy.test.mjs`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the pure policy module**

Accept only one API host, one HTTPS origin and one widget host. Return stable codes for unavailable route, forbidden origin, method not allowed and kill switch closed. Build CORS headers with exact origin, `Vary: Origin` and `Cache-Control: no-store`. Hash `userId + pathname` with SHA-256 and prefix `contact:`.

- [ ] **Step 4: Run focused and full tests**

Run: `node --test test/contact-worker-policy.test.mjs && npm test`

- [ ] **Step 5: Commit**

```bash
git add lib/contact-worker-policy.mjs test/contact-worker-policy.test.mjs
git commit -m "feat: add contact worker policy"
```

---

### Task 3: Persistencia D1 inyectable

**Files:**
- Create: `lib/contact-d1-store.mjs`
- Create: `test/contact-d1-store.test.mjs`

**Interfaces:**
- Produces: `saveContactIntakeToD1(db, intake) -> Promise<{ leadId, duplicate, conflict }>`.
- Consumes: un objeto ya normalizado por `validateContactIntake`.

- [ ] **Step 1: Write failing D1 adapter tests**

Build a bounded fake with `prepare().bind().first()` and `batch()`. Cover first insert, same idempotency key and hash, conflicting reuse and failed batch followed by re-read. Assert Turnstile token is never bound.

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test test/contact-d1-store.test.mjs`

Expected: FAIL because the adapter does not exist.

- [ ] **Step 3: Implement the minimal adapter**

Reuse the canonical SHA-256 input order from `lib/contact-store.ts`. Prepare one lead insert and one receipt insert per consent purpose, call `db.batch`, and resolve unique-key races with one re-read. Do not log intake or database errors.

- [ ] **Step 4: Run focused and full tests**

Run: `node --test test/contact-d1-store.test.mjs && npm test`

- [ ] **Step 5: Commit**

```bash
git add lib/contact-d1-store.mjs test/contact-d1-store.test.mjs
git commit -m "feat: add isolated contact d1 store"
```

---

### Task 4: Worker fail-closed y configuracion Wrangler

**Files:**
- Create: `worker/contact/index.mjs`
- Create: `wrangler.contact.jsonc`
- Create: `test/contact-worker.test.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: `verifyCloudflareAccessJwt`, `readContactWorkerPolicy`, `createOpaqueRateLimitKey`, `processStagingContactRequest`, `readBoundedJsonBody`, `processContactRequest`, `verifyTurnstileToken`, `saveContactIntakeToD1`.
- Produces: Worker `fetch(request, env)` with `GET /health`, `OPTIONS` and `POST /api/contact-intake` only.

- [ ] **Step 1: Write failing Worker tests**

Import a factory `createContactWorker(dependencies)` and cover health, wrong host, wrong origin, OFF response before JWT/limiter/body, invalid JWT, unallowlisted email, missing bindings, limiter 429 and one fully injected success path. Assert calls occur in the specified order.

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test test/contact-worker.test.mjs`

Expected: FAIL because the Worker does not exist.

- [ ] **Step 3: Implement the Worker factory and default export**

The default dependencies use `jose`, native rate limiter, Turnstile and D1. The factory permits Node tests without remote calls. Responses contain stable codes and metadata-only health; unexpected errors become `503 contact_staging_misconfigured`.

- [ ] **Step 4: Add Wrangler configuration and scripts**

`wrangler.contact.jsonc` uses Worker name `agent-friendly-web-contact-staging-frontier`, compatibility date `2026-08-31`, a staging rate limiter namespace unique to this repository, D1 name `agent-friendly-web-contact-staging-frontier`, migrations directory `drizzle`, and no production environment. Static vars keep writes false. Add:

```json
"contact:dev": "wrangler dev --config wrangler.contact.jsonc --env staging --port 8792",
"contact:deploy:dry-run": "wrangler deploy --config wrangler.contact.jsonc --env staging --dry-run",
"contact:deploy:staging": "wrangler deploy --config wrangler.contact.jsonc --env staging"
```

- [ ] **Step 5: Run tests, lint, build and Wrangler dry-run**

Run:

```bash
node --test test/contact-worker.test.mjs
npm test
npm run lint
npm run build
npm run contact:deploy:dry-run
```

- [ ] **Step 6: Commit**

```bash
git add worker/contact/index.mjs wrangler.contact.jsonc test/contact-worker.test.mjs package.json package-lock.json
git commit -m "feat: add private contact worker frontier"
```

---

### Task 5: Documentar, revisar e integrar 6B.1

**Files:**
- Create: `docs/BLOCK-6B1-CONTACT-WORKER-LOCAL-2026-08-31.md`
- Modify: `docs/BLOCK-6B-CONTACT-STAGING-ALLOWLIST-V1.md`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`

**Interfaces:**
- Produces: recibo local y runbook remoto OFF.

- [ ] **Step 1: Documentar resultados reales**

Record exact test counts, lint/build, dry-run, bindings declarados, estado OFF, ausencia de secrets y ausencia de datos. Separate codigo preparado from remote infrastructure.

- [ ] **Step 2: Run final verification**

Run:

```bash
git diff --check
npm test
npm run lint
npm run build
npm run contact:deploy:dry-run
git status --short
```

- [ ] **Step 3: Commit, push and open PR**

```bash
git add docs
git commit -m "docs: record contact worker local gate"
git push -u origin feat/contact-worker-frontier-impl-v1
gh pr create --base main --head feat/contact-worker-frontier-impl-v1
```

- [ ] **Step 4: Review and merge only after CI**

Require GitHub CI green and inspect the complete diff for secrets, public-route changes and accidental write enablement.

---

### Task 6: Desplegar subgate 6B.2 remoto OFF

**Files:**
- Modify after evidence: `docs/BLOCK-6B2-CONTACT-WORKER-REMOTE-OFF.md`

**Interfaces:**
- Consumes: merged Worker source and approved Cloudflare account.
- Produces: Worker staging reachable only through Access, D1 migrated and empty, writes false.

- [ ] **Step 1: Crear recursos sin abrir escrituras**

Deploy the staging Worker with automatic D1 provisioning and native rate limiting. Configure the custom hostname, an Access application with one allowed email, exact issuer/audience values, Turnstile test widget and secrets through Cloudflare controls. Keep `CONTACT_STAGING_WRITES_ENABLED=false`.

- [ ] **Step 2: Apply migrations and inspect read-only state**

Apply `drizzle/0000` through `0005` to the Worker D1. Query only schema and row counts; require zero `contact_leads` and zero `consent_receipts`.

- [ ] **Step 3: Run remote negative smokes**

Confirm anonymous Access denial, wrong origin denial, OFF response before body, public endpoint unchanged and no rows. Do not submit a valid form.

- [ ] **Step 4: Record rollback and remote evidence**

Document Worker version, config hash, D1 migration state, Access boundary, negative responses and zero rows without recording tokens, secrets, email values or audience tags.

- [ ] **Step 5: Stop before synthetic write**

Subgate 6B.3 requires una nueva aprobacion explicita para abrir el kill switch y ejecutar una unica solicitud sintetica e idempotente.
