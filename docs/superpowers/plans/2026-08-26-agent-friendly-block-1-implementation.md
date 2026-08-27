# Agent Friendly Registry Block 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the first usable Agent Friendly Registry release with a progressive private intake, read-only domain verification, versioned public profiles, explicit evidence states, and Tokenizart as the first curated case.

**Architecture:** Keep the existing public scanner non-persistent and isolate private project state by the authenticated Sites user ID. Add D1 entities for site identity, domain claims, owner attestations, public profile versions, and explicitly saved scan observations; project public data through a sanitizer before publication. Serve the Registry as accessible HTML plus versioned JSON and real Markdown, while keeping every mutating connector outside this block.

**Tech Stack:** Next.js 16 App Router on vinext, React 19, Cloudflare Workers, Sites authentication, Cloudflare D1, Drizzle ORM, Node test runner, TypeScript 5.9, ESLint.

**Spec:** `docs/superpowers/specs/2026-08-26-agent-friendly-registry-and-publishing-bridge-v1-design.md`

## Global Constraints

- Canonical public origin: `https://agentfriendlyweb.dev`.
- The temporary Sites host must not appear in public discovery assets or canonical metadata.
- Public scans remain read-only and do not persist by default.
- Private data is always filtered by `oai-authenticated-user-id`; an email address alone is not an authorization boundary.
- Do not request, store, log, or return passwords, cookies, API keys, private keys, access tokens, payment data, or hosting credentials.
- Domain verification is observation-only: DNS TXT and HTTP well-known challenges; no DNS or origin writes.
- Domain challenges expire after 30 minutes and are single use; verified status expires after 90 days.
- A public profile requires a verified domain and a separate explicit owner publication confirmation.
- Public profile versions are immutable; publishing a new version supersedes but does not delete the previous version.
- Every public assertion is labeled `owner_declared`, `observed`, or `verified` with source and timestamp.
- Tokenizart release-candidate CLI, MCP, skills, and OKF assets must not be described as deployed production endpoints.
- Capsule publication, CLI mutation, GitHub App, WordPress plugin, Cloudflare Bridge, payments, and Atelier owner-scoped actions are outside Block 1.
- Every methodology, intake, scanner, projection, or verification behavior change starts with a failing Node test.
- Generate and inspect a Drizzle migration for every D1 schema change.
- Before publishing, run `npm test`, `npm run lint`, and `npm run build`.

## Precondition Already Satisfied

`agentfriendlyweb.dev` is registered, mapped to Sites, protected by an active TLS certificate, and validated by HTTP smoke tests. `test/public-origin.test.mjs` guards the canonical origin.

---

### Task 1: Expand and Sanitize the Private Intake Contract

**Files:**
- Modify: `lib/intake.mjs`
- Modify: `test/intake.test.mjs`

**Interfaces:**
- Consumes: the current `normalizeIntake(input)`, `completionForIntake(intake)`, and `nextQuestion(intake)` API.
- Produces: `normalizeIntake(input): ExpandedIntake`, `completionForIntake(intake): number`, `nextQuestion(intake): { field: string, prompt: string } | null`, and `publicAttestationDraft(intake): PublicAttestationDraft`.

- [x] **Step 1: Write failing normalization and projection tests**

Add these assertions to `test/intake.test.mjs`:

```js
test('normalizeIntake accepts publishing context and rejects secret-like input', () => {
  const result = normalizeIntake({
    organization: 'Museo Top',
    website: 'museotop.example',
    maintainerName: 'Proveedor Web',
    maintainerEmail: 'web@example.com',
    dnsProvider: 'Cloudflare',
    contentSources: ['catalogo', 'archivo'],
    desiredCapabilities: ['discovery', 'structured_content'],
    authorizedResources: ['llms', 'sitemap', 'jsonld'],
    publicationPreference: 'registry_first',
    crawlerSearchPolicy: 'allow',
    crawlerTrainingPolicy: 'reserve',
    approverName: 'Claudio',
    approverEmail: 'claudio@example.com',
    monitoringPreference: 'monthly',
    password: 'never-store-me',
    cloudflareApiToken: 'never-store-me-either',
  });

  assert.equal(result.website, 'https://museotop.example/');
  assert.deepEqual(result.authorizedResources, ['llms', 'sitemap', 'jsonld']);
  assert.equal(result.crawlerTrainingPolicy, 'reserve');
  assert.equal('password' in result, false);
  assert.equal('cloudflareApiToken' in result, false);
});

test('publicAttestationDraft exposes only owner-approved public fields', () => {
  const result = publicAttestationDraft(normalizeIntake({
    organization: 'Museo Top',
    website: 'museotop.example',
    audience: 'Coleccionistas',
    languages: ['Español'],
    maintainerEmail: 'private@example.com',
    notes: 'Private operational notes',
  }));

  assert.equal(result.organization, 'Museo Top');
  assert.equal(result.canonicalOrigin, 'https://museotop.example');
  assert.equal('maintainerEmail' in result, false);
  assert.equal('notes' in result, false);
});
```

- [x] **Step 2: Run the focused test and confirm the red state**

Run: `node --test test/intake.test.mjs`

Expected: FAIL because expanded fields and `publicAttestationDraft` do not exist.

- [x] **Step 3: Implement the expanded allowlists and sanitized projection**

In `lib/intake.mjs`, add the exact fields below to `allowedFields` and normalize arrays with the existing `cleanList` helper:

```js
const listFields = new Set([
  'goals',
  'languages',
  'contentSources',
  'desiredCapabilities',
  'authorizedResources',
]);

const expandedFields = [
  'maintainerName',
  'maintainerEmail',
  'dnsProvider',
  'contentSources',
  'desiredCapabilities',
  'authorizedResources',
  'publicationPreference',
  'crawlerSearchPolicy',
  'crawlerTrainingPolicy',
  'approverName',
  'approverEmail',
  'monitoringPreference',
];
```

Export a `publicAttestationDraft` that returns only organization, canonical origin, site type, audience, languages, goals, public content sources, desired capabilities, authorized resources, and crawler policies. Convert the website to `new URL(intake.website).origin`; never include maintainer contacts, approver contacts, hosting notes, or free-form notes.

- [x] **Step 4: Keep completion progressive and deterministic**

Use these publication-decision fields after the existing eight basic fields:

```js
const publicationFields = [
  'publicationPreference',
  'crawlerSearchPolicy',
  'crawlerTrainingPolicy',
  'approverEmail',
];
```

`completionForIntake` must calculate completion over twelve decisions. `nextQuestion` must ask the existing basic questions first and then the four publication questions in the listed order.

- [x] **Step 5: Run the test and commit the contract**

Run: `node --test test/intake.test.mjs`

Expected: PASS.

Implementation note: the existing eight-field UI and D1 schema continue using the explicit `stage: 'basic'` compatibility mode until Tasks 2 and 4 persist and render the four publication decisions. This avoids presenting an unreachable 100% state during the migration.

```bash
git add lib/intake.mjs test/intake.test.mjs
git commit -m "feat: expand private registry intake contract"
```

---

### Task 2: Add the Block 1 D1 Data Model and Persistence

**Files:**
- Modify: `db/schema.ts`
- Modify: `app/api/projects/route.ts`
- Create: `test/schema.test.mjs`
- Create: `drizzle/0001_registry_block1.sql` through Drizzle generation
- Modify: `drizzle/meta/_journal.json` through Drizzle generation
- Create: the generated `drizzle/meta/0001_snapshot.json`

**Interfaces:**
- Consumes: `ExpandedIntake` from Task 1 and `getDb()` from `db/index.ts`.
- Produces: `registrySites`, `domainClaims`, `ownerAttestations`, `publicProfiles`, and `scanObservations` Drizzle tables; persisted expanded intake fields on `siteProjects`.

- [x] **Step 1: Write a failing schema contract test**

Create `test/schema.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Block 1 migration contains the registry boundary tables and private intake columns', async () => {
  const sql = await readFile('drizzle/0001_registry_block1.sql', 'utf8');
  for (const table of ['registry_sites', 'domain_claims', 'owner_attestations', 'public_profiles', 'scan_observations']) {
    assert.match(sql, new RegExp(`CREATE TABLE .${table}.`));
  }
  for (const column of ['maintainer_email', 'publication_preference', 'crawler_training_policy', 'approver_email']) {
    assert.match(sql, new RegExp(column));
  }
});
```

- [x] **Step 2: Run the schema test and confirm the missing migration**

Run: `node --test test/schema.test.mjs`

Expected: FAIL with `ENOENT` for `drizzle/0001_registry_block1.sql`.

- [x] **Step 3: Extend `siteProjects` and add registry tables**

Add the twelve expanded fields to `siteProjects` using `text(...).notNull().default('')`, with list values stored as JSON text. Add these table responsibilities:

```ts
registrySites: {
  id, projectId, userId, hostname, canonicalOrigin,
  verificationStatus, visibility, createdAt, updatedAt
}
domainClaims: {
  id, siteId, projectId, userId, method, challengeName,
  challengeValue, status, expiresAt, verifiedAt, consumedAt,
  lastAttemptAt, attemptCount, createdAt
}
ownerAttestations: {
  id, siteId, projectId, userId, version, publicJson,
  status, approvedAt, revokedAt, createdAt
}
publicProfiles: {
  id, siteId, slug, version, contractVersion, profileJson,
  markdown, status, sourceAttestationId, publishedAt, createdAt
}
scanObservations: {
  id, siteId, projectId, userId, targetOrigin, evidenceJson,
  readinessJson, probesJson, checkedAt, createdAt
}
```

Use unique indexes for `registry_sites.project_id`, `registry_sites.hostname`, and `(public_profiles.slug, public_profiles.version)`. Use indexes for owner lookups, pending claims, latest observations, and latest published profiles. Keep challenge values and all private JSON out of public query helpers.

- [x] **Step 4: Generate and inspect the migration**

Run: `npx drizzle-kit generate --name registry_block1`

Expected: `drizzle/0001_registry_block1.sql` plus updated Drizzle metadata. Inspect the SQL and confirm that it only adds columns, tables, and indexes; it must not drop or rewrite `site_projects` or `project_events`.

- [x] **Step 5: Persist and present expanded project fields**

Update `app/api/projects/route.ts` so `present`, insert, and update map every expanded field. Continue filtering both selection and update by `siteProjects.userId === user.userId`. Event payloads contain only completion and field names, never field values.

- [x] **Step 6: Run tests, inspect migration, and commit**

Run:

```bash
node --test test/intake.test.mjs test/schema.test.mjs
npm run build
```

Expected: both tests PASS and the build succeeds.

```bash
git add db/schema.ts app/api/projects/route.ts drizzle test/schema.test.mjs
git commit -m "feat: add registry block one data model"
```

---

### Task 3: Implement Read-Only Domain Challenges

**Files:**
- Create: `lib/domain-verification.mjs`
- Create: `lib/public-network.mjs`
- Modify: `app/api/scan/route.ts`
- Create: `app/api/projects/[projectId]/domain-claims/route.ts`
- Create: `app/api/projects/[projectId]/domain-claims/[claimId]/verify/route.ts`
- Create: `test/domain-verification.test.mjs`
- Create: `test/public-network.test.mjs`

**Interfaces:**
- Consumes: authenticated project ownership, `domainClaims`, `registrySites`, scanner SSRF rules.
- Produces: `createDomainChallenge({ hostname, method, token, now })`, `evaluateDomainChallenge({ claim, dnsAnswers, httpBody, now })`, `assertPublicHostname(hostname, resolve)`, authenticated claim creation/listing, and authenticated verification.

- [x] **Step 1: Write failing pure verification tests**

Create `test/domain-verification.test.mjs` with these cases:

```js
test('DNS challenge matches one exact TXT value and consumes once', () => {
  const claim = createDomainChallenge({
    hostname: 'museo.example', method: 'dns_txt', token: 'abc123', now: '2026-08-26T12:00:00.000Z',
  });
  const result = evaluateDomainChallenge({
    claim, dnsAnswers: [claim.challengeValue], httpBody: '', now: '2026-08-26T12:10:00.000Z',
  });
  assert.equal(result.verified, true);
  assert.equal(result.nextStatus, 'verified');
});

test('expired or already consumed challenge fails closed', () => {
  const claim = createDomainChallenge({
    hostname: 'museo.example', method: 'http_file', token: 'abc123', now: '2026-08-26T12:00:00.000Z',
  });
  assert.equal(evaluateDomainChallenge({ ...fixtureFor(claim), now: '2026-08-26T12:31:00.000Z' }).verified, false);
  assert.equal(evaluateDomainChallenge({ ...fixtureFor({ ...claim, status: 'verified' }), now: '2026-08-26T12:10:00.000Z' }).verified, false);
});
```

The test file defines `fixtureFor(claim)` to place the expected value in the DNS or HTTP input according to `claim.method`.

- [x] **Step 2: Run the tests and confirm the missing module**

Run: `node --test test/domain-verification.test.mjs`

Expected: FAIL because `lib/domain-verification.mjs` does not exist.

- [x] **Step 3: Implement challenge creation and evaluation**

Use these constants and paths:

```js
export const CLAIM_TTL_MS = 30 * 60 * 1000;
export const VERIFIED_TTL_MS = 90 * 24 * 60 * 60 * 1000;
export const HTTP_CHALLENGE_PATH = '/.well-known/agent-friendly-owner.json';
```

DNS uses `_agentfriendly-challenge.${hostname}` and value `agentfriendly-domain-verification=${token}`. HTTP expects JSON with `contract: "agentfriendly.domain-claim.v1"`, the exact hostname, and the exact token. Evaluation rejects mismatched hostname, expired claim, non-pending status, malformed JSON, and reused claims.

- [x] **Step 4: Extract the scanner network guard without changing behavior**

Move public DNS resolution, timeout, response-size limit, and manual-redirect fetch into `lib/public-network.mjs`. Export:

```js
assertPublicHostname(hostname, resolveDns = defaultResolveDns): Promise<void>
fetchLimitedPublicUrl(url, options = {}): Promise<{ status, contentType, link, body, bytes }>
resolvePublicTxt(name): Promise<string[]>
```

Keep the 8-second timeout, 250,000-byte limit, manual redirects, public A/AAAA requirement, and private-IP rejection. Update `app/api/scan/route.ts` to consume those helpers and confirm its existing scanner tests remain unchanged.

- [x] **Step 5: Add authenticated claim APIs**

`POST /api/projects/{projectId}/domain-claims` accepts `{ "method": "dns_txt" }` or `{ "method": "http_file" }`, verifies project ownership, derives the hostname from the saved website, invalidates older pending claims for the same project, and returns the challenge instructions. Generate the token with 32 cryptographically random bytes encoded as base64url.

`GET /api/projects/{projectId}/domain-claims` returns the latest claim for the authenticated owner.

`POST /api/projects/{projectId}/domain-claims/{claimId}/verify` performs only the declared DNS or HTTP read, enforces one attempt per 10 seconds and a maximum of 10 attempts, updates the claim and `registrySites.verificationStatus` atomically, and records a metadata-only `domain_claim_verified` or `domain_claim_failed` event.

- [x] **Step 6: Run focused and regression tests, then commit**

Run:

```bash
node --test test/domain-verification.test.mjs test/public-network.test.mjs test/scanner.test.mjs
npm test
```

Expected: PASS with no scanner score changes.

Verification completed on 2026-08-27: focused tests, full regression, lint, and the production build passed. The global standalone `tsc --noEmit` command remains red only on pre-existing JavaScript inference issues outside Task 3; it reports no Task 3 paths. No remote D1 migration, DNS change, deployment, profile publication, or external write was executed.

```bash
git add lib/domain-verification.mjs lib/public-network.mjs app/api/scan/route.ts app/api/projects test
git commit -m "feat: add read only domain verification"
```

---

### Task 4: Build the Expanded Human Intake and Verification UI

**Files:**
- Modify: `app/components/intake-workspace.tsx`
- Modify: `app/globals.css`
- Create: `test/intake-ui-contract.test.mjs`

**Interfaces:**
- Consumes: expanded `/api/projects` fields and domain-claim endpoints from Tasks 2 and 3.
- Produces: progressive form sections, domain challenge instructions, status labels, and explicit publication readiness without publishing.

- [x] **Step 1: Write a failing UI contract test**

Create `test/intake-ui-contract.test.mjs` that reads `app/components/intake-workspace.tsx` and asserts the presence of labels `Mantenedor actual`, `Proveedor DNS`, `Politica de busqueda`, `Uso para entrenamiento`, `Responsable de aprobacion`, `Verificar dominio`, and the warning `No publica el perfil automaticamente`.

- [x] **Step 2: Run the contract test and confirm the missing controls**

Run: `node --test test/intake-ui-contract.test.mjs`

Expected: FAIL on the first missing label.

- [x] **Step 3: Add four progressive sections**

Add sections in this order:

1. `Contenido disponible`: multi-select for catalog, services, FAQ, documentation, policies, API/tool documentation.
2. `Capacidades y recursos`: desired capabilities and authorized proposed resources; authorization here means draft scope, not write permission.
3. `Publicacion y crawlers`: publication preference, search policy, training policy, monitoring preference.
4. `Responsables y control`: maintainer name/email, DNS provider, approver name/email.

Keep autosave at 900 ms, update the decision counter to twelve, and maintain responsive dimensions without nesting cards.

- [x] **Step 4: Add domain verification as an explicit separate action**

Show the normalized domain, current status (`Sin verificar`, `Pendiente`, `Verificado hasta fecha`, `Vencido`), method selector, challenge copy button, and `Comprobar ahora` button. Do not automatically create or verify a challenge during autosave. After success, explain that verification proves temporary domain control but grants no write access.

- [x] **Step 5: Run UI checks and commit**

Run:

```bash
node --test test/intake-ui-contract.test.mjs
npm run lint
npm run build
```

Expected: PASS and successful build.

Verified locally on 2026-08-27: 56 tests passed, ESLint completed without errors, the vinext production build succeeded, the authenticated form restored all 12 decisions and its pending domain claim after reload, stale instructions disappeared after changing the saved hostname, and Playwright found no horizontal overflow or clipped buttons at 1440x900 and 390x844. Only local D1 migrations were used for browser QA; no remote infrastructure was modified.

```bash
git add app/components/intake-workspace.tsx app/globals.css test/intake-ui-contract.test.mjs
git commit -m "feat: add progressive registry intake workspace"
```

---

### Task 5: Project and Publish Immutable Public Profiles

**Files:**
- Create: `lib/public-profile.mjs`
- Create: `lib/registry-store.ts`
- Create: `app/api/projects/[projectId]/publish-profile/route.ts`
- Create: `app/registry/page.tsx`
- Create: `app/registry/[slug]/page.tsx`
- Create: `app/registry/[slug]/profile.json/route.ts`
- Create: `app/registry/[slug]/profile.md/route.ts`
- Modify: `app/components/site-header.tsx`
- Modify: `app/sitemap.ts`
- Create: `test/public-profile.test.mjs`
- Create: `test/registry-route-contract.test.mjs`

**Interfaces:**
- Consumes: verified `registrySites`, expanded private project, latest explicit observation, and `publicAttestationDraft`.
- Produces: `buildPublicProfile(input): agentfriendly.public-profile.v1`, `renderPublicProfileMarkdown(profile): string`, `listPublishedProfiles()`, `getPublishedProfile(slug, version?)`, and an owner-only publication endpoint.

- [x] **Step 1: Write failing projection tests**

Create `test/public-profile.test.mjs`:

```js
test('public projection labels provenance and omits private fields', () => {
  const profile = buildPublicProfile(profileFixture);
  assert.equal(profile.contract, 'agentfriendly.public-profile.v1');
  assert.equal(profile.verification.status, 'verified');
  assert.equal(profile.assertions.organization.state, 'owner_declared');
  assert.equal(profile.assertions.canonicalOrigin.state, 'verified');
  assert.equal(profile.assertions.readiness.state, 'observed');
  assert.equal(JSON.stringify(profile).includes('private@example.com'), false);
  assert.equal(JSON.stringify(profile).includes('Private operational notes'), false);
});

test('markdown renderer emits real markdown with source dates', () => {
  const markdown = renderPublicProfileMarkdown(buildPublicProfile(profileFixture));
  assert.match(markdown, /^# Museo Top/m);
  assert.match(markdown, /Owner declared/);
  assert.match(markdown, /Observed/);
  assert.match(markdown, /Verified/);
});
```

- [x] **Step 2: Run the projection test and confirm the missing module**

Run: `node --test test/public-profile.test.mjs`

Expected: FAIL because `lib/public-profile.mjs` does not exist.

- [x] **Step 3: Implement the public contract and Markdown renderer**

The JSON root contains:

```js
{
  contract: 'agentfriendly.public-profile.v1',
  slug, version, publishedAt, canonicalUrl,
  organization, sectors, audiences, languages, publicSources,
  declaredCapabilities, observedResources, verification,
  readiness, assertions, historyUrl, limits
}
```

Every `assertions` entry contains `{ value, state, source, observedAt }`. Remove undefined values and reject free-form HTML. Markdown uses headings, bullet lists, direct source links, state labels, dates, and limits; it contains no embedded HTML or private contact data.

- [x] **Step 4: Implement an owner-only publication transaction**

`POST /api/projects/{projectId}/publish-profile` requires:

```json
{
  "contract": "agentfriendly.owner-attestation.v1",
  "confirmPublicProjection": true,
  "expectedDomain": "museo.example"
}
```

Reject unauthenticated users, project mismatch, unverified or expired domain, hostname mismatch, and false confirmation. In one D1 batch, insert an approved owner attestation, insert `public_profiles` at `max(version)+1`, mark the previous published version `superseded`, set site visibility to `public`, and append a metadata-only project event.

- [x] **Step 5: Add public Registry routes**

Implement:

- `/registry`: searchable HTML list by organization, domain, sector, language, AF level, and verification status.
- `/registry/{slug}`: accessible detail with provenance badges and links to machine formats.
- `/registry/{slug}/profile.json`: `application/json; charset=utf-8`, immutable cache for a specific version and a short cache for latest.
- `/registry/{slug}/profile.md`: `text/markdown; charset=utf-8` with the same version and evidence.

Return 404 for unknown or unpublished profiles. Never return draft, revoked, or superseded versions from the latest route; allow a specific historical version only when it was once published.

- [x] **Step 6: Update navigation and sitemap, then commit**

Run:

```bash
node --test test/public-profile.test.mjs test/registry-route-contract.test.mjs
npm test
npm run lint
npm run build
```

Expected: all commands pass and `/registry` appears in the build.

Verification completed locally on 2026-08-27: the focused projection and route-contract tests passed, the full 62-test suite passed, ESLint passed, and the production build included `/registry`, `/registry/:slug`, and the JSON/Markdown routes. No D1 migration, domain claim, public profile, deployment, DNS change, or external write was executed.

```bash
git add lib/public-profile.mjs lib/registry-store.ts app/api/projects app/registry app/components/site-header.tsx app/sitemap.ts test
git commit -m "feat: publish versioned agent friendly profiles"
```

---

### Task 6: Save Explicit Owner Audit Observations Without Changing the Public Scanner

**Files:**
- Create: `lib/public-audit.mjs`
- Modify: `app/api/scan/route.ts`
- Create: `app/api/projects/[projectId]/observations/route.ts`
- Modify: `app/components/intake-workspace.tsx`
- Create: `test/public-audit.test.mjs`
- Create: `test/observation-contract.test.mjs`

**Interfaces:**
- Consumes: public network helpers, current scanner analyzers and methodology, authenticated project ownership.
- Produces: `runPublicAudit(url): AuditResult`, unchanged public `/api/scan`, and explicit owner-only observation persistence.

- [x] **Step 1: Write a failing sanitization test**

Create `test/public-audit.test.mjs` that verifies `sanitizeObservation(audit)` retains target, checkedAt, evidence, readiness, and probe metadata but removes probe bodies, response headers other than content type/link, stack traces, and raw errors.

- [x] **Step 2: Extract the current scan orchestration**

Move the probe list and readiness assembly from `app/api/scan/route.ts` to `lib/public-audit.mjs`. Keep paths, content negotiation, limits, scoring, and user agent unchanged. The public route calls `runPublicAudit` and still writes nothing.

- [x] **Step 3: Add explicit authenticated persistence**

`POST /api/projects/{projectId}/observations` accepts `{ "confirmSave": true }`, reads the saved project URL, runs the same public audit, sanitizes it, inserts `scanObservations`, and appends `scan_observation_saved` with observation ID and score only. Reject false confirmation, unauthenticated callers, and projects owned by another user.

- [x] **Step 4: Add a human action to the expediente**

Add `Auditar y guardar observacion` with explanatory copy: the public scanner normally does not store results; this action saves one dated, sanitized observation to the private expediente. Display last observation date and score, without marking owner declarations as observed.

- [x] **Step 5: Run full regression and commit**

Run:

```bash
node --test test/public-audit.test.mjs test/observation-contract.test.mjs test/scanner.test.mjs test/methodology.test.mjs
npm test
npm run lint
npm run build
```

Expected: scanner scores remain unchanged and all tests pass.

Verification completed locally on 2026-08-27: focused sanitization/scanner tests passed, the full 67-test suite passed, ESLint passed, and the production build included the authenticated observation route. The public scanner remains non-persistent. No public scan was executed, no observation was saved remotely, and no D1 migration or deployment was applied.

```bash
git add lib/public-audit.mjs app/api/scan/route.ts app/api/projects app/components/intake-workspace.tsx test
git commit -m "feat: save explicit owner audit observations"
```

---

### Task 7: Publish Tokenizart as the First Curated Registry Case

**Files:**
- Create: `registry/builtin/tokenizart.v1.json`
- Create: `registry/builtin/index.ts`
- Modify: `lib/registry-store.ts`
- Modify: `app/casos/tokenizart/page.tsx`
- Modify: `public/cases/tokenizart/manifest.json`
- Create: `test/tokenizart-registry-profile.test.mjs`

**Interfaces:**
- Consumes: public Tokenizart case files and the Registry profile contract.
- Produces: immutable built-in profile `tokenizart` version 1, merged read-only with D1-published profiles.

- [x] **Step 1: Write a failing curated-profile test**

The test loads `registry/builtin/tokenizart.v1.json` and asserts:

```js
assert.equal(profile.contract, 'agentfriendly.public-profile.v1');
assert.equal(profile.slug, 'tokenizart');
assert.equal(profile.version, 1);
assert.equal(profile.assertions.primarySite.value, 'https://tokenizart.com/');
assert.equal(profile.assertions.operatingPlatform.value, 'https://atelier.tokenizart.com/');
assert.equal(profile.assertions.operatingPlatform.state, 'owner_declared');
assert.equal(JSON.stringify(profile).includes('production MCP'), false);
assert.equal(JSON.stringify(profile).includes('100% agent friendly'), false);
```

- [x] **Step 2: Build the curated profile from verified public sources**

Use `docs/TOKENIZART-CASE-2026-08-26.md` and `public/cases/tokenizart/manifest.json` as provenance. Distinguish Tokenizart corporate/public presence from Atelier operating platform. Mark the Agent Friendly Web audit as observed, owner-first philosophy as owner-declared, and only deployed HTTP resources as observed. Label CLI, MCP, skills, OKF, Owner Live, x402/MPP, and mutating tools by their actual maturity or omit them from available capabilities.

- [x] **Step 3: Merge built-ins and D1 profiles deterministically**

`listPublishedProfiles()` returns built-ins plus latest D1 profiles, sorted by organization and slug. `getPublishedProfile('tokenizart')` returns the built-in record unless a later founder-approved built-in version exists. A D1 user profile cannot override a built-in slug.

- [x] **Step 4: Link the existing case and machine manifest to Registry**

Add visible links between `/casos/tokenizart`, `/registry/tokenizart`, JSON, and Markdown. Update the manifest with the canonical Registry URLs; do not change historical audit values.

- [x] **Step 5: Run tests and commit**

Run:

```bash
node --test test/tokenizart-registry-profile.test.mjs test/public-profile.test.mjs test/registry-route-contract.test.mjs
npm test
npm run lint
npm run build
```

Expected: all commands pass.

Verification completed locally on 2026-08-27: the curated profile tests passed, the full 70-test suite passed, ESLint passed, and the production build resolved the built-in profile without D1 slug replacement. No remote profile, migration, Registry release, DNS change, or deployment was executed.

```bash
git add registry lib/registry-store.ts app/casos/tokenizart/page.tsx public/cases/tokenizart/manifest.json test
git commit -m "feat: add tokenizart registry case"
```

---

### Task 8: Security, Human QA, Migration Gate, and Public Release

**Files:**
- Modify: `docs/SECURITY.md`
- Modify: `docs/SPECIFICATION.es.md`
- Modify: `docs/TOKENIZART-CASE-2026-08-26.md`
- Modify: `README.md`
- Create: `docs/BLOCK-1-RELEASE-CHECKLIST-2026-08-26.md`

**Interfaces:**
- Consumes: all Block 1 tasks and generated D1 migration.
- Produces: auditable release evidence, deployed Registry, and an explicit rollback point.

- [x] **Step 1: Run negative API tests locally**

Verify these exact outcomes:

- unauthenticated project, claim, observation, and publication routes return 401;
- a different authenticated user receives 404 or 403 without learning whether the project exists;
- a private/reserved IP or redirect target is rejected;
- a mismatched, expired, repeated, or over-attempted challenge fails closed;
- publication without a verified current domain returns 409;
- false `confirmPublicProjection` returns 400;
- secret-like fields never appear in project events, observations, profiles, JSON, Markdown, or logs.

- [x] **Step 2: Inspect migration and package boundaries**

Run:

```bash
git diff HEAD~1 -- drizzle/ db/schema.ts
npm run db:generate
git diff --check
npm test
npm run lint
npm run build
```

Expected: no second unexpected migration, no destructive SQL, no whitespace errors, all tests pass, and the production build includes D1 migrations in the Sites package.

- [ ] **Step 3: Perform human browser QA on the saved version**

Use one authenticated owner and one unauthenticated window. Verify desktop at 1440x900 and mobile at 390x844:

1. `/`, `/metodologia`, `/casos/tokenizart`, and `/registry` are readable without login.
2. `/expediente` requests login and returns to `https://agentfriendlyweb.dev/callback`.
3. Autosave restores only the authenticated user's project.
4. Domain instructions are understandable without technical vocabulary.
5. Verification does not imply publication; publication shows the exact public projection first.
6. Registry filters, provenance badges, JSON, and Markdown work without horizontal overflow.
7. Tokenizart links distinguish `tokenizart.com` from `atelier.tokenizart.com`.

- [x] **Step 4: Save and deploy one Sites version**

Push the exact validated commit to the configured Sites source branch using a short-lived per-command credential. Package the successful build with the Sites `package-site.sh` helper, save one version with that commit SHA, and deploy that saved version publicly only under the already-approved public access policy.

- [x] **Step 5: Execute post-deployment smoke tests**

Require HTTP 200 and correct content types for:

```text
https://agentfriendlyweb.dev/
https://agentfriendlyweb.dev/robots.txt
https://agentfriendlyweb.dev/llms.txt
https://agentfriendlyweb.dev/llms-full.txt
https://agentfriendlyweb.dev/sitemap.xml
https://agentfriendlyweb.dev/openapi.json
https://agentfriendlyweb.dev/registry
https://agentfriendlyweb.dev/registry/tokenizart
https://agentfriendlyweb.dev/registry/tokenizart/profile.json
https://agentfriendlyweb.dev/registry/tokenizart/profile.md
```

Confirm that public assets contain `https://agentfriendlyweb.dev` and do not contain `agent-friendly-web.tokenizart.chatgpt.site`. Confirm `/expediente` redirects to authenticated access rather than exposing private content.

- [x] **Step 6: Record release and rollback evidence**

Write the deployed Sites version number, commit SHA, migration name, deployment ID, smoke timestamp, observed status, and previous working Sites version into `docs/BLOCK-1-RELEASE-CHECKLIST-2026-08-26.md`. Rollback means redeploying the previous saved Sites version; do not reverse a D1 migration destructively. Add a forward migration for any schema correction.

- [ ] **Step 7: Commit release documentation**

```bash
git add README.md docs
git commit -m "docs: record registry block one release"
```

## Final Gate

Block 1 is complete only when the domain is active, all tests pass, the D1 migration is non-destructive, the Tokenizart profile is available in HTML/JSON/Markdown, private data isolation and negative tests pass, and post-deployment smoke evidence is recorded. Completion does not authorize Block 2 or any connector mutation.
