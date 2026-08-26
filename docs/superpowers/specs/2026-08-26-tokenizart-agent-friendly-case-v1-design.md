# Tokenizart Agent-Friendly Case v1 - Design

**Date:** 2026-08-26

**Owner:** Gabriel Mucchiut

**Implementation:** Agent Friendly Web, incubated within Tokenizart

**Status:** Approved design, implementation in progress

## Objective

Turn Tokenizart into the first end-to-end validation case for the Agent Friendly Web method. The implementation must make public knowledge easier to discover, quote and verify without representing private or unreleased capabilities as production services.

## Product boundaries

The public website explains the ecosystem and points to verifiable resources. Atelier is Tokenizart's operating application: it is where authenticated users prepare artworks or unique objects and perform the actions available to their account.

The following boundaries stay separate:

1. Public knowledge and discovery: public Level 5 content, `robots.txt`, sitemaps, structured data, `llms.txt`, references and documented read-only tools.
2. Release-candidate tools: CLI, MCP contracts, skills and OKF exports in `tokenizart-agentic`; these are not production endpoints until their publication gates pass.
3. Owner Live: authenticated owner or delegated-manager context with consent, scopes and metadata-only audit. It is not part of the public auditor.
4. Mutations: Mint, Certify, NFC, transfer, vouchers, privacy, uploads and wallet signing remain outside this public release.

## Architecture

```text
Human or agent
      |
      +--> tokenizart.com
      |      public identity, explanations, sources, shop and discovery files
      |
      +--> atelier.tokenizart.com
      |      authenticated operating application and public views selected by owners
      |
      +--> tokenizart-agentic
      |      versioned CLI, MCP contracts, skills and OKF release candidates
      |
      +--> Owner Live bridge
             separate identity, consent, scopes, audit and feature flags
```

Agent Friendly Web audits only the public surface. It records observed evidence, publishes an installation package and reruns the same tests after each controlled release.

## Release model

- **P0, editorial baseline:** descriptions, language, canonical URLs, headings, JSON-LD and answer-ready public pages.
- **P1, machine-readable baseline:** `llms.txt`, `llms-full.txt`, sitemaps, crawler policy and useful Link headers.
- **P2, real tool discovery:** publish only versioned OpenAPI, MCP cards and skill indexes backed by reachable services or documents.
- **P3, delegated use:** identity, consent, scope, revocation and audit for read-only owner tools.
- **P4, transactions:** separately approved actions and payment protocols with idempotency, confirmation and rollback.

## Security decisions

- Public crawlers receive public Level 5 content only.
- The recommended initial Content Signals policy is `search=yes`, `ai-input=yes`, `ai-train=no`.
- `robots.txt` is not a privacy control. Private content remains behind authentication and must not be placed in public discovery files.
- No fake MCP, OpenAPI, skill or payment endpoint is published to improve a score.
- Cloudflare proxying of Atelier is not part of this release and requires separate production approval.

## Acceptance criteria

1. Baselines for Tokenizart, Atelier and Agent Friendly Web are dated and reproducible.
2. Candidate files are downloadable and contain no secrets or owner data.
3. A non-technical installation runbook assigns work to Gabriel, Leonardo, Leandro and Codex.
4. Scanner diagnostics detect current MCP server cards, Agent Skills indexes, API/AI catalogs and crawler policy signals.
5. Public case page distinguishes observed, prepared, release-candidate and blocked states.
6. Tests, lint, build and browser QA pass before publishing.
