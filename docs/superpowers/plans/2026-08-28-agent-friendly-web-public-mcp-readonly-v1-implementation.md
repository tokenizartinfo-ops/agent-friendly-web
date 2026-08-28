# Agent Friendly Web Public MCP Read-Only v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar en `agentfriendlyweb.dev/mcp` un servidor MCP remoto stateless con cuatro tools y cuatro resources estrictamente publicos y read-only.

**Architecture:** Un modulo de dominio ESM puro produce envelopes, valida inputs y adapta auditoria, Registry, metodologia y OKF. Un factory TypeScript registra esas capacidades en el SDK MCP v2; la route Vinext aplica limites HTTP y delega al handler stateless oficial de Cloudflare. El descubrimiento publico se promueve unicamente despues de validar el candidato con un cliente MCP real.

**Tech Stack:** TypeScript 5.9, ESM, Node test runner, `@modelcontextprotocol/server` v2, `agents` `createMcpHandler`, Zod 4, Vinext, Cloudflare Workers/Sites.

**Spec:** `docs/superpowers/specs/2026-08-28-agent-friendly-web-public-mcp-readonly-v1-design.md`

## Global Constraints

- MCP preferido `2026-07-28`, stateless, Streamable HTTP, `POST /mcp`.
- Exactamente cuatro tools y cuatro resources publicos.
- Cero sesiones aplicativas, credenciales, escritura, persistencia D1 o mutaciones remotas.
- Body HTTP maximo 32 KiB y `Content-Type: application/json`.
- Reutilizar controles SSRF, timeout, bytes y redirects del auditor existente.
- OKF v1 solo verifica `https://agentfriendlyweb.dev/okf/v0.2`.
- Registry solo devuelve perfiles publicados.
- No anunciar MCP como desplegado hasta cerrar el cliente real contra produccion.

---

### Task 1: Contrato de dominio MCP y handlers read-only

**Files:**
- Create: `lib/public-mcp.mjs`
- Create: `test/public-mcp-domain.test.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `MCP_TOOL_NAMES`, `MCP_RESOURCE_URIS`, `createMcpResult`, `executePublicMcpTool`, `readPublicMcpResource`.
- Consumes: `runPublicAudit`, `getPublishedProfile` through injection, `verifyRemoteOkf`, methodology constants.

- [ ] **Step 1: Add dependencies and failing domain tests**

Add exact compatible dependency versions for `@modelcontextprotocol/server`, `agents` and `zod`. Test deterministic tool/resource order, successful methodology, audit delegation, Registry published-profile passthrough and canonical OKF verification.

- [ ] **Step 2: Run the domain test and verify RED**

Run: `node --test test/public-mcp-domain.test.mjs`  
Expected: FAIL because `lib/public-mcp.mjs` does not exist.

- [ ] **Step 3: Implement the minimum domain adapter**

Implement stable envelopes under `agent-friendly-web.mcp-result.v1`, input validation, source links, blocked actions and dependency injection. Keep output serializable and bounded.

- [ ] **Step 4: Run the domain test and regression**

Run: `node --test test/public-mcp-domain.test.mjs` then `npm test`  
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json lib/public-mcp.mjs test/public-mcp-domain.test.mjs
git commit -m "feat(mcp): add public read-only domain contract"
```

### Task 2: SDK server factory and protocol route

**Files:**
- Create: `lib/public-mcp-server.mjs`
- Create: `app/mcp/route.ts`
- Create: `test/public-mcp-protocol.test.mjs`
- Create: `test/public-mcp-route-contract.test.mjs`

**Interfaces:**
- Consumes: `executePublicMcpTool`, `readPublicMcpResource`, `getPublishedProfile`.
- Produces: `createPublicMcpServer(dependencies?)`, route `POST /mcp`.

- [ ] **Step 1: Write failing protocol and route tests**

Require exact tool annotations, exact resource URIs, successful calls through an in-memory SDK client, 405 for non-POST, 415 for non-JSON and 413 for bodies above 32 KiB.

- [ ] **Step 2: Run focused tests and verify RED**

Run: `node --test test/public-mcp-protocol.test.mjs test/public-mcp-route-contract.test.mjs`  
Expected: FAIL because factory and route do not exist.

- [ ] **Step 3: Register tools/resources and add route guard**

Create a fresh `McpServer` per request. Register tools alphabetically with Zod schemas and read-only annotations. Adapt domain results to `structuredContent` plus text. Wrap `createMcpHandler` behind request method, content-type and content-length guards.

- [ ] **Step 4: Run focused and full tests**

Run: focused tests, `npm test`, `npm run lint`, `npm run build`  
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/public-mcp-server.ts app/mcp/route.ts test/public-mcp-protocol.test.mjs test/public-mcp-route-contract.test.mjs
git commit -m "feat(mcp): expose stateless streamable HTTP server"
```

### Task 3: Candidate contracts and human documentation

**Files:**
- Create: `public/.well-known/mcp/server-card.json`
- Create: `public/.well-known/mcp.json`
- Create: `public/schemas/mcp-result.v1.json`
- Create: `app/mcp-readonly/page.tsx`
- Create: `test/public-mcp-discovery.test.mjs`
- Modify: `app/api-catalog/route.ts`
- Modify: `app/sitemap.ts`
- Modify: `app/mapa-del-sitio/page.tsx`
- Modify: `app/components/site-header.tsx`
- Modify: `app/components/site-footer.tsx`
- Modify: `public/.well-known/agent-readiness.json`
- Modify: `public/.well-known/ai-catalog.json`
- Modify: `public/llms.txt`
- Modify: `public/llms-full.txt`

**Interfaces:**
- Produces: public contract/schema/page with `release_candidate` status.

- [ ] **Step 1: Write failing discovery tests**

Require endpoint, protocol version, auth boundary, exact tools/resources, human explanation, real links and no claims of A2A, WebMCP, writes, private expedients or owner MCP.

- [ ] **Step 2: Run discovery test and verify RED**

Run: `node --test test/public-mcp-discovery.test.mjs`  
Expected: FAIL on missing assets and links.

- [ ] **Step 3: Add candidate discovery surfaces**

Publish the server card and project alias with `release_candidate`; add schema and human page; link them from machine and human catalogs. Keep readiness at `release_candidate` until remote client verification.

- [ ] **Step 4: Run tests, lint and build**

Run: `npm test && npm run lint && npm run build`  
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add app public test/public-mcp-discovery.test.mjs
git commit -m "docs(mcp): publish read-only candidate contracts"
```

### Task 4: Review, candidate deployment and real-client verification

**Files:**
- Create: `docs/BLOCK-4C-MCP-CANDIDATE-2026-08-28.md`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`

**Interfaces:**
- Produces: candidate receipt and reproducible evidence.

- [ ] **Step 1: Run independent review**

Review diff against `main`, threat model and protocol surface. Resolve findings before publication.

- [ ] **Step 2: Run final local verification**

Run `npm test`, `npm run lint`, `npm run build` and a local MCP client covering list/call/read plus negative HTTP cases.

- [ ] **Step 3: Open PR and wait for CI**

Push the feature branch, open PR, verify all checks and merge only when green.

- [ ] **Step 4: Deploy a non-promoted Site version**

Package the exact merge commit and create a candidate Site version without changing the canonical production assignment. Record version and rollback.

- [ ] **Step 5: Test candidate with a real MCP client**

Verify discovery, exact catalogs, four positive tool calls, four resources, malformed JSON, private target, invalid slug/version, unapproved OKF release, unknown tool, non-POST and oversized body.

- [ ] **Step 6: Commit candidate receipt**

Record client/version, outputs summarized, limitations and NO-GO conditions.

### Task 5: Promotion to deployed and production receipt

**Files:**
- Modify: `public/.well-known/mcp/server-card.json`
- Modify: `public/.well-known/mcp.json`
- Modify: `public/.well-known/agent-readiness.json`
- Modify: `public/llms.txt`
- Modify: `public/llms-full.txt`
- Modify: `docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md`
- Create: `docs/BLOCK-4C-MCP-RELEASE-2026-08-28.md`

**Interfaces:**
- Produces: coherent deployed capability ledger and release receipt.

- [ ] **Step 1: Write failing deployed-status assertions**

Require every status surface to agree on `deployed`, canonical endpoint and exact capabilities.

- [ ] **Step 2: Promote documentation only after candidate evidence**

Change status from `release_candidate` to `deployed`; do not alter tool behavior in this commit.

- [ ] **Step 3: Run complete verification and merge promotion PR**

Run tests/lint/build, merge green PR and package exact commit.

- [ ] **Step 4: Deploy production and re-run real-client tests**

Promote the verified version, then call `https://agentfriendlyweb.dev/mcp` with the same client matrix. Re-audit the origin and verify MCP evidence appears without false A2A/WebMCP/payment signals.

- [ ] **Step 5: Record rollback and close**

Document Site version, commit, previous rollback version, endpoint evidence and remaining boundaries. Confirm `main` clean and synchronized.

## Self-review

- Spec coverage: tools, resources, transport, auth boundary, SSRF, abuse, isolation, discovery, tests, deployment and rollback all have tasks.
- Placeholder scan: no implementation placeholders or ambiguous future code paths remain.
- Type consistency: domain adapter, SDK factory and route names are identical across tasks.
- Scope: A2A, WebMCP, plugins, payments, voice, email, private expedients and Tokenizart Owner Live remain separate blocks.
