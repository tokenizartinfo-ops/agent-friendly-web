# Agent Friendly Web Gate 6D.4D Private Human Privacy Pilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Probar una vez el ciclo de privacidad con la identidad y los datos propios de Gabriel en el canary privado, borrar los identificadores y volver a dejar la capacidad apagada.

**Architecture:** El piloto reutiliza la D1 canary y los modulos de privacidad ya verificados. La identidad y el email se obtienen exclusivamente del JWT firmado de Cloudflare Access; la API no acepta un email enviado por el browser. Una maquina de estados privada permite alta, exportacion, rectificacion de idioma, retiro y borrado, con un switch y una allowlist propios.

**Tech Stack:** Vinext, Cloudflare Workers, Cloudflare Access, D1, Node 22 test runner, Wrangler.

**Spec:** `docs/superpowers/specs/2026-09-03-agent-friendly-web-real-contact-privacy-lifecycle-v1-design.md` y `docs/superpowers/specs/2026-09-04-agent-friendly-web-gate-6d4d1-operating-position-v0-design.md`

## Global Constraints

- El entorno es exclusivamente `afw_canary` en `https://canary.agentfriendlyweb.dev`.
- Solo una identidad Access expresamente allowlisted puede ejecutar el piloto.
- El email proviene del claim verificado de Access; no se acepta en JSON, query string o formulario.
- Ningun email, nombre, JWT, cookie, token, secreto o valor de supresion se escribe en logs o evidencia.
- `AFW_REAL_CONTACT_ENABLED`, `AFW_PRIVACY_REQUESTS_ENABLED`, `AFW_RETENTION_JOBS_ENABLED` y `AFW_PRODUCT_UPDATES_ENABLED` permanecen en `false`.
- El switch nuevo `AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED` vale `false` en base, canary y produccion salvo la ventana humana aprobada.
- No se envia correo, no se crea propuesta, no se cobra, no se modifica un sitio y no se usa ningun recurso de Tokenizart.
- La prueba termina con el contacto en estado `erased`, la ruta deshabilitada y el switch remoto en `false`.
- No se afirma borrado absoluto de backups antes de vencer la ventana de D1 Time Travel; cualquier restore debe reaplicar el tombstone.

## File Structure

- `lib/private-human-privacy-pilot.mjs`: maquina de estados, persistencia acotada y frontera HTTP.
- `test/private-human-privacy-pilot.test.mjs`: comportamiento, idempotencia, orden y ausencia de filtraciones.
- `app/api/canary/private-human-privacy-pilot/route.ts`: adaptador API same-origin.
- `app/canary/private-human-privacy-pilot/route.ts`: UI privada de cinco pasos.
- `test/private-human-privacy-pilot-page.test.mjs`: limites estaticos de UI y rutas.
- `scripts/preflight-private-human-privacy-pilot-canary.mjs`: valida evidencia previa y flags.
- `test/private-human-privacy-pilot-preflight.test.mjs`: rechazos fail-closed del preflight.
- `wrangler.jsonc`: switch independiente y rate limiter canary.
- `package.json`: comando de preflight.
- `docs/BLOCK-6D4D-PRIVATE-HUMAN-PRIVACY-PILOT-2026-09-04.md`: recibo saneado del gate.

---

### Task 1: Private pilot state machine

**Files:**
- Create: `lib/private-human-privacy-pilot.mjs`
- Create: `test/private-human-privacy-pilot.test.mjs`

**Interfaces:**
- Consumes: `saveContactIntakeToD1`, `recordConsentLifecycleEventToD1`, `createPrivacyRequestToD1`, `applyContactErasureToD1`, `resolveContactStatusFromD1`.
- Produces: `PRIVATE_HUMAN_PRIVACY_PILOT_CONTRACT`, `runPrivateHumanPrivacyPilotAction(database, input, overrides)` and `createPrivateHumanPrivacyPilotHandler()`.

- [ ] **Step 1: Write the failing state-machine tests**

Cover exactly these actions and order:

```js
const actions = [
  'enroll',
  'inspect_export',
  'rectify_locale',
  'withdraw_requested_plan',
  'erase',
];

assert.equal(enroll.contactStatus, 'active');
assert.equal(exported.export.email, 'owner@example.com');
assert.equal(rectified.export.locale, 'en');
assert.equal(withdrawn.requestedPlanConsent, false);
assert.equal(erased.contactStatus, 'erased');
```

Also assert duplicate actions are write-free, out-of-order actions fail with `private_human_privacy_pilot_step_invalid`, unknown fields fail, another actor cannot resolve the record, and error messages never contain `@`, SQL, JWT or provider details.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test test/private-human-privacy-pilot.test.mjs`

Expected: FAIL because `lib/private-human-privacy-pilot.mjs` does not exist.

- [ ] **Step 3: Implement the minimal state machine**

Use this input boundary:

```js
{
  action: 'enroll' | 'inspect_export' | 'rectify_locale' |
    'withdraw_requested_plan' | 'erase',
  actorRefHash: string,
  email: string,
  locale: 'es' | 'en' | 'pt',
  suppressionHmacKey: string,
}
```

Derive stable UUID-compatible idempotency keys from the contract, actor hash and action. Persist only the Access email, blank optional profile fields, `agentfriendlyweb.dev`, objective `request_pilot`, source `direct` and consent `requested_plan`. Return PII only for `inspect_export` and `rectify_locale`; all other responses expose status and counts only.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node --test test/private-human-privacy-pilot.test.mjs`

Expected: all tests PASS with zero skipped or cancelled.

- [ ] **Step 5: Commit**

```bash
git add -- lib/private-human-privacy-pilot.mjs test/private-human-privacy-pilot.test.mjs
git commit -m "feat: add private human privacy pilot state machine"
```

### Task 2: Access-bound HTTP route

**Files:**
- Create: `app/api/canary/private-human-privacy-pilot/route.ts`
- Modify: `lib/private-human-privacy-pilot.mjs`
- Modify: `test/private-human-privacy-pilot.test.mjs`

**Interfaces:**
- Consumes: `verifyCloudflareAccessJwt`, `hashAccessSubject`, `readBoundedJsonBody` and the Task 1 state machine.
- Produces: `POST /api/canary/private-human-privacy-pilot`.

- [ ] **Step 1: Write failing HTTP tests**

Assert that the route:

```js
assert.equal(noJwt.status, 401);
assert.equal(wrongSubject.status, 403);
assert.equal(disabled.status, 404);
assert.equal(await success.json().then((v) => v.step), 'enroll');
```

Also assert exact HTTPS origin and hostname, POST-only behavior, 8 KiB body limit, rate limiting, no caching, exact request fields `{ contract, action, locale, confirmation }`, and email derivation from the verified JWT rather than the request body.

- [ ] **Step 2: Run and verify RED**

Run: `node --test test/private-human-privacy-pilot.test.mjs`

Expected: FAIL because the HTTP handler is not implemented.

- [ ] **Step 3: Implement the HTTP boundary and route adapter**

The handler must require:

```text
contract=agent-friendly-web.private-human-privacy-pilot.v1
confirmation=own_data_private_pilot
AFW_CANARY_DIAGNOSTICS_ENABLED=true
AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED=true
```

It must verify the JWT signature, issuer and audience; hash `identity.userId`; check the existing private canary subject allowlist; and pass `identity.email` directly to the state machine without logging or echoing it except in the authenticated export response.

- [ ] **Step 4: Run and verify GREEN**

Run: `node --test test/private-human-privacy-pilot.test.mjs`

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add -- lib/private-human-privacy-pilot.mjs test/private-human-privacy-pilot.test.mjs app/api/canary/private-human-privacy-pilot/route.ts
git commit -m "feat: protect private privacy pilot with Access"
```

### Task 3: Five-step private UI

**Files:**
- Create: `app/canary/private-human-privacy-pilot/route.ts`
- Create: `test/private-human-privacy-pilot-page.test.mjs`

**Interfaces:**
- Consumes: Task 2 POST endpoint.
- Produces: a noindex, no-store human UI with one enabled action at a time.

- [ ] **Step 1: Write the failing page tests**

Assert the page has five labelled steps, only a locale selector, no email/name/text input, no external scripts, `X-Robots-Tag: noindex, nofollow`, Access verification and no links from the public sitemap.

- [ ] **Step 2: Run and verify RED**

Run: `node --test test/private-human-privacy-pilot-page.test.mjs`

Expected: FAIL because the private page does not exist.

- [ ] **Step 3: Implement the minimal UI**

Render these actions in order:

```text
1. Registrar mis datos de prueba
2. Ver mi exportacion
3. Cambiar mi idioma
4. Retirar el consentimiento de respuesta
5. Borrar mis datos
```

The browser generates no identifier other than the fixed action request. It stores no PII in local storage or session storage. After erase, disable all buttons and show a sane status without the email.

- [ ] **Step 4: Run and verify GREEN**

Run: `node --test test/private-human-privacy-pilot-page.test.mjs`

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add -- app/canary/private-human-privacy-pilot/route.ts test/private-human-privacy-pilot-page.test.mjs
git commit -m "feat: add private human privacy pilot UI"
```

### Task 4: Disabled configuration and preflight

**Files:**
- Modify: `wrangler.jsonc`
- Modify: `package.json`
- Create: `scripts/preflight-private-human-privacy-pilot-canary.mjs`
- Create: `test/private-human-privacy-pilot-preflight.test.mjs`
- Regenerate: `worker-configuration.d.ts`

**Interfaces:**
- Consumes: sanitized JSON metadata captured before a remote run.
- Produces: `npm run privacy:human-pilot:preflight -- --input <path>`.

- [ ] **Step 1: Write failing configuration and preflight tests**

Require `AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED="false"` in base, canary and production. The preflight must reject missing migrations, non-canary D1 IDs, production Worker names, absent Access, more than one allowlisted subject hash, public privacy flags not false, PII-like fields and unknown metadata keys.

- [ ] **Step 2: Run and verify RED**

Run: `node --test test/private-human-privacy-pilot-preflight.test.mjs`

Expected: FAIL because the script and config switch do not exist.

- [ ] **Step 3: Implement disabled config and strict preflight**

Add the new switch as `false` in all environments and add a canary-only rate limiter binding named `AFW_PRIVATE_HUMAN_PRIVACY_RATE_LIMITER`. The preflight output is exactly:

```json
{
  "ready": true,
  "code": "private_human_privacy_pilot_ready",
  "environment": "afw_canary",
  "realContactPublic": false,
  "productUpdates": false
}
```

- [ ] **Step 4: Verify focused and full suites**

Run:

```bash
node --test test/private-human-privacy-pilot-preflight.test.mjs
npm test
npm run lint
npm run build
npm run web:deploy:dry-run
```

Expected: every command exits `0`; tests report zero failures; lint reports zero errors.

- [ ] **Step 5: Commit**

```bash
git add -- wrangler.jsonc package.json worker-configuration.d.ts scripts/preflight-private-human-privacy-pilot-canary.mjs test/private-human-privacy-pilot-preflight.test.mjs
git commit -m "chore: prepare disabled human privacy canary"
```

### Task 5: One controlled canary run and closure

**Files:**
- Create: `docs/BLOCK-6D4D-PRIVATE-HUMAN-PRIVACY-PILOT-2026-09-04.md`
- Create: `docs/evidence/private-human-privacy-pilot-canary-2026-09-04.json`
- Modify: `docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`

**Interfaces:**
- Consumes: a Cloudflare D1 Time Travel bookmark, preflight evidence and the authenticated five-step UI.
- Produces: a sanitized gate receipt and a final disabled runtime.

- [ ] **Step 1: Capture rollback and preflight evidence**

Declare the remote context with `PROJECT=Agent Friendly Web`, `REPOSITORY=tokenizartinfo-ops/agent-friendly-web`, `ENVIRONMENT=afw_canary`, `ORIGIN=https://canary.agentfriendlyweb.dev`, the exact Worker and D1 IDs, allowed action and Time Travel rollback bookmark. Run the preflight before any flag change.

- [ ] **Step 2: Deploy with the pilot switch OFF**

Run full verification, deploy only `agent-friendly-web-web-canary`, and confirm anonymous requests redirect to Access while authenticated requests receive `404` from the disabled pilot route.

- [ ] **Step 3: Open one bounded human window**

Set only `AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED=true` for the canary version. Do not change public flags. Gabriel signs in through Access and executes the five visible steps once.

- [ ] **Step 4: Verify erasure and close immediately**

Confirm through metadata-only queries that one pilot contact is `erased`, direct identifier fields are blank, CRM cannot resolve it, the consent withdrawal exists and deletion replay is write-free. Return the pilot switch to `false`, deploy the closed version and confirm the endpoint returns `404`.

- [ ] **Step 5: Record sanitized evidence and commit**

Evidence may contain counts, hashes, Worker/D1 IDs, timestamps, commit SHA and result codes. It must not contain email, Access subject, JWT, cookies, secrets, names or raw rows.

```bash
git add -- docs/BLOCK-6D4D-PRIVATE-HUMAN-PRIVACY-PILOT-2026-09-04.md docs/evidence/private-human-privacy-pilot-canary-2026-09-04.json docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md
git commit -m "docs: close private human privacy pilot"
```

Gate 6D.4D closes only when the remote endpoint is disabled again. It does not authorize Gate 6D.4E, public contact capture, newsletter, payment, proposal automation or customer data.
