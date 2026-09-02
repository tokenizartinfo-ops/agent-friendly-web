# Agent Friendly Web Gate 6C.1 Email Inbound Canary Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar y comprobar la primera recepcion de correo de Agent Friendly Web mediante Cloudflare Email Routing, sin habilitar envio, respuestas automaticas, newsletter ni persistencia de cuerpos o adjuntos.

**Architecture:** Una libreria pura y un preflight CLI convierten el inventario remoto saneado en un plan determinista, fail-closed y metadata-only. Cloudflare Email Routing reenvia `hello@`, `hola@` y `ola@` a una unica direccion privada verificada; `no-reply@` se descarta y los aliases funcionales permanecen reservados. La mutacion remota se ejecuta solo despues del preflight, conserva un snapshot de reglas y DNS para rollback y termina con una prueba sintetica desde un remitente distinto del destino.

**Tech Stack:** Node.js 22 ESM, `node:test`, Cloudflare Email Routing REST API, Cloudflare DNS, Git/GitHub.

**Spec:** `docs/BLOCK-6C1-EMAIL-IDENTITY-AND-INBOUND-CANARY-DESIGN-2026-09-02.md`

## Global Constraints

- Proyecto remoto: `Agent Friendly Web`; repositorio: `tokenizartinfo-ops/agent-friendly-web`.
- Entorno: `afw_email_inbound_canary`; origen: `agentfriendlyweb.dev`.
- Direcciones activas en 6C.1: `hello@agentfriendlyweb.dev`, `hola@agentfriendlyweb.dev`, `ola@agentfriendlyweb.dev`.
- Direccion que falla cerrada: `no-reply@agentfriendlyweb.dev` mediante regla `drop`.
- `auditoria@`, `seguridad@` y `bajas@` permanecen documentadas como reservadas, no activas.
- La direccion privada de destino se proporciona solo en memoria a Cloudflare y nunca se escribe en Git, recibos, logs o salida del preflight.
- No se procesan ni persisten cuerpo, headers completos, adjuntos, credenciales ni contenido de mensajes.
- No se habilitan envio, respuesta automatica, newsletter, marketing, D1, RAG, CRM, MCP mutante ni Email Worker.
- Toda operacion remota conserva snapshot anterior, identificadores de reglas creadas y rollback exacto.
- Cloudflare exige una direccion de destino verificada antes de permitir una regla `forward`.

---

### Task 1: Contrato puro de planificacion y recibo

**Files:**
- Create: `lib/email-inbound-canary.mjs`
- Create: `test/email-inbound-canary.test.mjs`

**Interfaces:**
- Consumes: inventario remoto saneado sin direccion de destino.
- Produces: `buildEmailInboundCanaryPlan(input)`, `verifyEmailInboundCanaryReceipt(input)`, `EMAIL_INBOUND_CANARY_CONTRACT`, `ACTIVE_INBOUND_ALIASES`, `RESERVED_INBOUND_ALIASES`.

- [x] **Step 1: Write the failing planner tests**

```js
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ACTIVE_INBOUND_ALIASES,
  buildEmailInboundCanaryPlan,
  verifyEmailInboundCanaryReceipt,
} from '../lib/email-inbound-canary.mjs';

const baseline = {
  project: 'agent-friendly-web',
  repository: 'tokenizartinfo-ops/agent-friendly-web',
  environment: 'afw_email_inbound_canary',
  origin: 'agentfriendlyweb.dev',
  zoneId: '4b1a3fe4b6dcb81e9d6a633174c5939f',
  zoneStatus: 'active',
  routingStatus: 'unconfigured',
  routingEnabled: false,
  destinationPresent: false,
  destinationVerified: false,
  existingMailDns: [],
  existingRules: [],
};

test('prepares the exact inbound-only alias boundary', () => {
  const result = buildEmailInboundCanaryPlan(baseline);
  assert.equal(result.ok, true);
  assert.deepEqual(result.plan.activeAliases, ACTIVE_INBOUND_ALIASES);
  assert.equal(result.plan.state, 'destination_verification_required');
  assert.equal(result.plan.outboundEnabled, false);
  assert.equal(result.plan.persistenceEnabled, false);
});

test('fails closed for foreign projects, origins, MX conflicts or enabled unknown rules', () => {
  for (const input of [
    { ...baseline, project: 'tokenizart' },
    { ...baseline, origin: 'tokenizart.com' },
    { ...baseline, existingMailDns: [{ type: 'MX', contentClass: 'other_mx' }] },
    { ...baseline, existingRules: [{ id: 'foreign', enabled: true, managedByAfw: false }] },
  ]) assert.equal(buildEmailInboundCanaryPlan(input).ok, false);
});

test('accepts only a complete metadata-only synthetic receipt', () => {
  const result = verifyEmailInboundCanaryReceipt({
    contract: 'agent-friendly-web.email-inbound-canary.v1',
    testId: 'afw-email-canary-20260902-01',
    aliasResults: ACTIVE_INBOUND_ALIASES.map((alias) => ({ alias, deliveryCount: 1 })),
    noReplyDeliveryCount: 0,
    senderAllowlisted: true,
    responseSent: false,
    bodyPersisted: false,
    attachmentsPersisted: false,
    outboundConfigured: false,
  });
  assert.equal(result.ok, true);
  assert.equal(result.status, 'passed');
});
```

- [x] **Step 2: Run the focused test and verify RED**

Run: `node --test test/email-inbound-canary.test.mjs`

Expected: FAIL because `lib/email-inbound-canary.mjs` does not exist.

- [x] **Step 3: Implement the minimal pure boundary**

Implement a closed input schema, stable SHA-256 plan ID, exact project/origin checks, conflict detection, explicit steps and rollback actions. The plan must expose only booleans, counts, aliases, public resource IDs and operation names.

```js
export const EMAIL_INBOUND_CANARY_CONTRACT = 'agent-friendly-web.email-inbound-canary.v1';
export const ACTIVE_INBOUND_ALIASES = Object.freeze([
  'hello@agentfriendlyweb.dev',
  'hola@agentfriendlyweb.dev',
  'ola@agentfriendlyweb.dev',
]);
export const RESERVED_INBOUND_ALIASES = Object.freeze([
  'auditoria@agentfriendlyweb.dev',
  'seguridad@agentfriendlyweb.dev',
  'bajas@agentfriendlyweb.dev',
]);
```

The returned plan must include `state`, `activeAliases`, `reservedAliases`, `blockedInboundAliases`, `outboundEnabled: false`, `persistenceEnabled: false`, `steps`, `rollback`, and `blockedActions`.

- [x] **Step 4: Run the focused test and verify GREEN**

Run: `node --test test/email-inbound-canary.test.mjs`

Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add lib/email-inbound-canary.mjs test/email-inbound-canary.test.mjs
git commit -m "feat: add inbound email canary planner"
```

### Task 2: Preflight CLI y contrato publico honesto

**Files:**
- Create: `scripts/preflight-email-inbound-canary.mjs`
- Create: `test/email-inbound-canary-preflight.test.mjs`
- Create: `public/.well-known/email-inbound-canary-contract.json`
- Modify: `package.json`

**Interfaces:**
- Consumes: archivo JSON de inventario saneado mediante `--input`.
- Produces: un unico documento JSON en stdout; exit code `0` para plan valido y `1` para frontera rechazada.

- [ ] **Step 1: Write failing CLI and public contract tests**

Test exact script registration `email:inbound:preflight`, JSON-only stdout, no destination address, `status: local_preflight_ready_remote_unconfigured`, active/reserved aliases and blocked outbound capabilities.

```js
assert.equal(pkg.scripts['email:inbound:preflight'], 'node scripts/preflight-email-inbound-canary.mjs');
assert.equal(contract.capabilities.inbound_routing, false);
assert.equal(contract.capabilities.outbound_sending, false);
assert.deepEqual(contract.active_aliases, [
  'hello@agentfriendlyweb.dev',
  'hola@agentfriendlyweb.dev',
  'ola@agentfriendlyweb.dev',
]);
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test test/email-inbound-canary-preflight.test.mjs`

Expected: FAIL because the CLI, script registration and contract do not exist.

- [ ] **Step 3: Implement CLI and contract**

The CLI reads one file, calls `buildEmailInboundCanaryPlan`, writes one JSON result, never accepts a destination address flag and never invokes the network. The public contract declares the observed state dated `2026-09-02` without exposing the private destination.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `node --test test/email-inbound-canary-preflight.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/preflight-email-inbound-canary.mjs test/email-inbound-canary-preflight.test.mjs public/.well-known/email-inbound-canary-contract.json package.json
git commit -m "feat: add email inbound canary preflight"
```

### Task 3: Evidencia local, runbook y documentacion de estado

**Files:**
- Create: `docs/evidence/email-inbound-canary-baseline-2026-09-02.json`
- Create: `docs/BLOCK-6C1-EMAIL-INBOUND-CANARY-RUNBOOK-2026-09-02.md`
- Modify: `docs/BLOCK-6C1-EMAIL-IDENTITY-AND-INBOUND-CANARY-DESIGN-2026-09-02.md`
- Modify: `docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md`
- Modify: `test/email-inbound-canary-preflight.test.mjs`

**Interfaces:**
- Consumes: baseline Cloudflare saneado y planner Task 1.
- Produces: inventario reproducible, comandos de preflight y rollback, estado `local_preflight_ready_remote_unconfigured`.

- [ ] **Step 1: Add failing documentation assertions**

Assert the baseline contains zone active, routing unconfigured, zero destinations, zero active rules and no current MX; assert the runbook declares the eight remote boundary fields, verification dependency, rule set, synthetic test and rollback order.

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test test/email-inbound-canary-preflight.test.mjs`

Expected: FAIL because baseline and runbook are absent.

- [ ] **Step 3: Add sanitized baseline and runbook**

The baseline must contain:

```json
{
  "project": "agent-friendly-web",
  "repository": "tokenizartinfo-ops/agent-friendly-web",
  "environment": "afw_email_inbound_canary",
  "origin": "agentfriendlyweb.dev",
  "zoneId": "4b1a3fe4b6dcb81e9d6a633174c5939f",
  "zoneStatus": "active",
  "routingStatus": "unconfigured",
  "routingEnabled": false,
  "destinationPresent": false,
  "destinationVerified": false,
  "existingMailDns": [],
  "existingRules": []
}
```

The runbook must state the exact safe order: snapshot, destination creation, human verification, preflight, Email Routing DNS enablement, three forward rules, one drop rule, synthetic messages, receipt verification, and rollback if any check fails.

- [ ] **Step 4: Execute local preflight and tests**

Run: `npm run email:inbound:preflight -- --input docs/evidence/email-inbound-canary-baseline-2026-09-02.json`

Expected: JSON with `ok: true` and `state: destination_verification_required`.

Run: `node --test test/email-inbound-canary*.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add docs/evidence/email-inbound-canary-baseline-2026-09-02.json docs/BLOCK-6C1-EMAIL-INBOUND-CANARY-RUNBOOK-2026-09-02.md docs/BLOCK-6C1-EMAIL-IDENTITY-AND-INBOUND-CANARY-DESIGN-2026-09-02.md docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md test/email-inbound-canary-preflight.test.mjs
git commit -m "docs: add inbound email canary runbook"
```

### Task 4: Cloudflare destination verification checkpoint

**Files:**
- Modify after observation: `docs/evidence/email-inbound-canary-baseline-2026-09-02.json`

**Interfaces:**
- Consumes: connected Cloudflare account, private destination supplied outside Git.
- Produces: one Cloudflare destination ID and `destinationVerified: true`; no message content or private address in repository.

- [ ] **Step 1: Declare the remote boundary in the execution log**

```text
PROJECT=Agent Friendly Web
REPOSITORY=tokenizartinfo-ops/agent-friendly-web
ENVIRONMENT=afw_email_inbound_canary
ORIGIN=agentfriendlyweb.dev
RESOURCE_TYPE=Cloudflare Email Routing destination address
RESOURCE_ID=account-scoped destination created for AFW
ALLOWED_ACTION=create destination and observe verification state
ROLLBACK=delete destination only if it was created by this gate and no rule references it
```

- [ ] **Step 2: Re-read account destinations**

Call `GET /accounts/{account_id}/email/routing/addresses`. Compare in memory with the approved private destination and return only present/verified booleans and the public resource ID.

- [ ] **Step 3: Create the destination if absent**

Call `POST /accounts/{account_id}/email/routing/addresses` with the private destination supplied out of band. This sends Cloudflare's verification message; do not create rules yet.

- [ ] **Step 4: Complete and verify the checkpoint**

Open the Cloudflare verification link from the private destination inbox, then repeat the account GET. Continue only when Cloudflare reports a non-null `verified` timestamp.

- [ ] **Step 5: Update the sanitized baseline**

Set only `destinationPresent: true`, `destinationVerified: true`, and `destinationId` to the Cloudflare resource ID. Do not write the address.

- [ ] **Step 6: Re-run preflight**

Run: `npm run email:inbound:preflight -- --input docs/evidence/email-inbound-canary-baseline-2026-09-02.json`

Expected: JSON with `ok: true` and `state: ready_to_apply`.

### Task 5: Enable routing, create bounded rules and test reception

**Files:**
- Create: `docs/evidence/email-inbound-canary-application-2026-09-02.json`
- Create: `docs/evidence/email-inbound-canary-receipt-2026-09-02.json`
- Modify: `public/.well-known/email-inbound-canary-contract.json`
- Modify: `public/.well-known/email-operations-contract.json`
- Modify: `docs/BLOCK-6C1-EMAIL-IDENTITY-AND-INBOUND-CANARY-DESIGN-2026-09-02.md`
- Modify: `test/email-inbound-canary-preflight.test.mjs`

**Interfaces:**
- Consumes: verified destination ID, ready preflight, Cloudflare zone ID.
- Produces: Email Routing ready, three forward rule IDs, one drop rule ID, metadata-only synthetic receipt and public truthful status.

- [ ] **Step 1: Capture a fresh pre-mutation snapshot**

Read Email Routing settings, required DNS diff, current MX/TXT records, routing rules and destination verification. Abort if any data differs materially from Task 4 or an unknown enabled rule appears.

- [ ] **Step 2: Enable Email Routing DNS**

Call `POST /zones/{zone_id}/email/routing/dns` with `{ "name": "agentfriendlyweb.dev" }`. Re-read settings and DNS; require `enabled: true`, `status: ready` and only Cloudflare-provided MX/SPF changes.

- [ ] **Step 3: Create exact routing rules**

For each active alias call `POST /zones/{zone_id}/email/routing/rules` with one literal `to` matcher and one `forward` action to the verified destination. Create a fourth rule for `no-reply@agentfriendlyweb.dev` with one literal matcher and one `drop` action. Do not enable catch-all.

- [ ] **Step 4: Verify the remote rule set**

Re-read all rules. Require exactly one enabled AFW rule per active alias, one enabled drop rule for `no-reply@`, no enabled catch-all and no Worker action.

- [ ] **Step 5: Run the synthetic reception test**

From a separate approved sender, send one non-sensitive message per active alias using a unique test ID. Confirm exactly one arrival for each. Send one message to `no-reply@` and confirm no delivery. Do not reply and do not attach files.

- [ ] **Step 6: Verify metadata-only receipt**

Run `verifyEmailInboundCanaryReceipt` against a local receipt containing only test ID, aliases, counts and booleans. Require `status: passed`; otherwise execute rollback immediately.

- [ ] **Step 7: Record sanitized evidence and update public truth**

The application evidence contains Cloudflare resource IDs, state transitions and DNS record classes, never the destination address. Set public contracts to `inbound_canary_verified` only after the receipt passes; keep `outbound_sending`, `automatic_replies`, `message_body_processing` and `attachment_processing` false.

- [ ] **Step 8: Test the rollback procedure without deleting the successful canary**

Demonstrate rollback as a dry-run from the captured snapshot: disable/delete only the four created rules, then disable Email Routing DNS only if no pre-existing mail records existed. Store the ordered actions and matching resource IDs. Do not execute rollback after a passing test unless an anomaly appears.

### Task 6: Full verification and review boundary

**Files:**
- Modify: `docs/superpowers/plans/2026-09-02-agent-friendly-web-gate-6c1-email-inbound-canary.md`

**Interfaces:**
- Consumes: completed local implementation and remote evidence.
- Produces: reviewable branch with no secrets and a truthful gate status.

- [ ] **Step 1: Run focused verification**

Run: `node --test test/email-inbound-canary*.test.mjs test/email-operations*.test.mjs test/company-building-capital-roadmap.test.mjs`

Expected: PASS.

- [ ] **Step 2: Run full verification**

Run: `npm test`

Expected: all tests pass.

Run: `npm run lint`

Expected: zero errors; pre-existing warnings are reported separately.

Run: `npm run build`

Expected: exit code `0`.

- [ ] **Step 3: Scan for leaked secrets and private destination**

Run: `rg -n "tokenizart\.info@gmail\.com|password|api[_ -]?key|private[_ -]?key|BEGIN .*PRIVATE KEY" lib scripts test docs public package.json`

Expected: no private destination in Gate 6C.1 implementation or evidence and no secret literals. Existing educational references are reviewed manually.

- [ ] **Step 4: Review diff and repository boundary**

Run: `git diff --check`

Run: `git status --short`

Run: `git diff --stat HEAD~3..HEAD`

Expected: only Agent Friendly Web files are changed; no Tokenizart runtime, repository or credential file appears.

- [ ] **Step 5: Commit final truthful status**

```bash
git add docs public test
git commit -m "docs: record verified inbound email canary"
```

- [ ] **Step 6: Push and open a Draft PR**

Push the isolated branch and create a Draft PR whose body states: inbound only, destination private, no outbound provider, no newsletter, no message persistence, test evidence, rollback and Gate 6C.2 excluded.
