# Agent Friendly Web Email Outbound Canary v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** prepare a deterministic, local-only outbound email canary preflight for Agent Friendly Web while keeping Cloudflare DNS, billing, bindings and email delivery disabled.

**Architecture:** a pure module validates a sanitized Cloudflare inventory, derives the remote readiness state and verifies a future metadata-only canary receipt. A local CLI reads one JSON evidence file and emits one JSON plan; a public contract and roadmaps expose only capabilities that are actually verified.

**Tech Stack:** Node.js 22 ESM, `node:test`, JSON public contracts, Markdown evidence and Cloudflare Email Service documentation.

**Spec:** `docs/superpowers/specs/2026-09-02-agent-friendly-web-email-outbound-canary-v1-design.md`

## Global Constraints

- Project is exactly `agent-friendly-web`; repository is exactly `tokenizartinfo-ops/agent-friendly-web`.
- Environment is exactly `afw_email_outbound_canary`; origin is exactly `agentfriendlyweb.dev`.
- Provider is fixed to `cloudflare_email_service`; sender and reply-to are fixed to `hello@agentfriendlyweb.dev`.
- The only destination identifier is `verified_destination_1`; no destination address may enter code, evidence or output.
- No network, DNS mutation, billing change, binding, deploy, message send or message persistence is implemented.
- Marketing, newsletter, automatic replies and arbitrary recipients remain disabled.
- The first public state is `provider_selected_remote_unconfigured`.

---

### Task 1: Pure outbound canary policy and receipt verifier

**Files:**
- Create: `test/email-outbound-canary.test.mjs`
- Create: `lib/email-outbound-canary.mjs`

**Interfaces:**
- Consumes: sanitized Cloudflare account, zone, plan, sending-domain and DNS-preview metadata.
- Produces: `buildEmailOutboundCanaryPlan(input)` and `verifyEmailOutboundCanaryReceipt(input)`.

- [ ] **Step 1: Write the failing policy tests**

Create tests that import the missing module and assert:

```js
const result = buildEmailOutboundCanaryPlan(baseline);
assert.equal(result.ok, true);
assert.equal(result.plan.state, 'provider_selected_remote_unconfigured');
assert.equal(result.plan.providerConfigured, false);
assert.equal(result.plan.outboundEnabled, false);
assert.equal(result.plan.cost.verifiedDestinationCanaryUsd, 0);
assert.equal(result.plan.cost.arbitraryRecipientsRequireWorkersPaid, true);
```

Add table tests that reject a Tokenizart boundary, private destination fields, body/HTML/headers/attachments, raw DNS content, unknown fields, conflicts and an invalid record inventory.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test test/email-outbound-canary.test.mjs`

Expected: failure because `lib/email-outbound-canary.mjs` does not exist.

- [ ] **Step 3: Implement the smallest pure policy**

Export:

```js
export const EMAIL_OUTBOUND_CANARY_CONTRACT = 'agent-friendly-web.email-outbound-canary.v1';
export function buildEmailOutboundCanaryPlan(input = {}) {}
export function verifyEmailOutboundCanaryReceipt(input = {}) {}
```

Use exact-key allowlists, stable failure codes and a SHA-256 plan ID. Return only sanitized fields, pending remote steps with `networkMutation: false`, rollback metadata and blocked actions. The receipt verifier must require one human-approved delivery and reject all message content or automation.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node --test test/email-outbound-canary.test.mjs`

Expected: all focused tests pass.

### Task 2: Local JSON preflight and public contract

**Files:**
- Create: `scripts/preflight-email-outbound-canary.mjs`
- Create: `test/email-outbound-canary-preflight.test.mjs`
- Create: `public/.well-known/email-outbound-canary-contract.json`
- Create: `docs/evidence/email-outbound-canary-baseline-2026-09-02.json`
- Modify: `package.json`
- Modify: `public/.well-known/email-operations-contract.json`
- Modify: `test/email-operations-contract.test.mjs`

**Interfaces:**
- Consumes: `buildEmailOutboundCanaryPlan(input)` from Task 1 and one local evidence path.
- Produces: `runEmailOutboundCanaryPreflight(inputPath)` and package script `email:outbound:preflight`.

- [ ] **Step 1: Write failing CLI and contract tests**

Assert the exact package script:

```js
assert.equal(
  pkg.scripts['email:outbound:preflight'],
  'node scripts/preflight-email-outbound-canary.mjs --input',
);
assert.equal(pkg.scripts['email:outbound:send'], undefined);
assert.equal(pkg.scripts['email:outbound:apply'], undefined);
```

Execute the CLI against the evidence file and assert one JSON output, `provider_selected_remote_unconfigured`, six missing DNS records, zero conflicts and no address outside `agentfriendlyweb.dev`. Assert the public contract keeps outbound sending, arbitrary recipients, marketing and automation false.

- [ ] **Step 2: Run focused tests and verify RED**

Run: `node --test test/email-outbound-canary-preflight.test.mjs test/email-operations-contract.test.mjs`

Expected: failure because the CLI, evidence and public contract do not exist.

- [ ] **Step 3: Implement CLI, evidence and contracts**

The CLI must follow the inbound preflight pattern: accept only `--input <path>`, parse JSON, call the pure module, print one JSON object and exit `1` on closed failure. Record only account/zone IDs, `null` quota/usage, empty sending subdomains, record names/types/status/content classes, missing count and conflict count; omit DKIM values and all private destinations.

Update the aggregate contract with `outbound_provider_selected: true` and a link to the dedicated contract while preserving `outbound_sending: false` and `email_provider_configured: false`.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `node --test test/email-outbound-canary*.test.mjs test/email-operations-contract.test.mjs`

Expected: all focused tests pass.

### Task 3: Operational documentation, roadmaps and verification

**Files:**
- Create: `docs/BLOCK-6C2-EMAIL-OUTBOUND-CANARY-LOCAL-GATE-2026-09-02.md`
- Modify: `docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md`
- Modify: `docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`
- Modify outside Git: `C:/Users/gabri/Obsidian/segundo cerebro tokenizart/12-AI-Agents-Hermes/Projects/Agent-Friendly-Web.md`

**Interfaces:**
- Consumes: verified tests and sanitized evidence from Tasks 1 and 2.
- Produces: a human-readable gate record and a clear boundary for Gate 6C.2B.

- [ ] **Step 1: Extend failing documentation assertions**

Add assertions to `test/email-outbound-canary-preflight.test.mjs` that require the boundary fields `PROJECT`, `REPOSITORY`, `ENVIRONMENT`, `ORIGIN`, `RESOURCE_TYPE`, `RESOURCE_ID`, `ALLOWED_ACTION`, `ROLLBACK`, official pricing references and the explicit absence of remote activation.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test test/email-outbound-canary-preflight.test.mjs`

Expected: failure because the Gate 6C.2A document is absent.

- [ ] **Step 3: Write the gate record and reconcile roadmaps**

Document the provider decision, the sanitized baseline, current costs, state machine, blocked actions and rollback. Mark the next gate as two remote approvals: domain/DNS onboarding, then one human verified-destination canary. Update the private Obsidian project note without copying secrets or private addresses.

- [ ] **Step 4: Run complete verification**

Run:

```text
node --test test/email-outbound-canary*.test.mjs test/email-operations-contract.test.mjs
npm test
npm run lint
npm run build
git diff --check
```

Expected: all tests, lint and build pass; `git diff --check` reports no whitespace errors.

- [ ] **Step 5: Scan and publish only the Draft PR update**

Search changed files for private email destinations, credentials, DKIM contents, API keys and unrelated Tokenizart runtime references. Commit and push the branch, update Draft PR `#49`, and do not merge, deploy, alter billing, apply DNS or send email.
