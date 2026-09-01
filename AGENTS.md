# Agent Friendly Web - agent instructions

## Scope

This repository implements Gabriel Mucchiut's public Agent Friendly Web initiative. Tokenizart is the first integral case, not the only supported organization.

## Canonical surfaces

- `public_web`: `https://agentfriendlyweb.dev`, the public Sites website. The committed `.openai/hosting.json` must always point to this project.
- `afw_contact_sites_legacy`: the private `tokenizart.chatgpt.site` project was retired on 2026-09-01 before any synthetic write. Do not deploy or use it as staging.
- `afw_contact_worker_legacy`: `https://contact-staging.agentfriendlyweb.dev` remains Access-protected, write-disabled and attached only to its isolated empty D1 while replacement/retirement is decided.
- `afw_canary`: any future remote canary must use a dedicated `agentfriendlyweb.dev` subdomain, Cloudflare Access and same-origin UI/API. It must not use `*.chatgpt.site`.
- Read the project boundary audit before changing this branch. Run `sites:assert:public` before every public Sites publication. Never infer the target from an open browser tab.

## Project boundary

- Active project: Agent Friendly Web.
- Canonical repository: `tokenizartinfo-ops/agent-friendly-web`.
- Tokenizart is a documented customer/case only. Its `tokenizart-*` repositories, Workers, D1, R2, Access apps, Companion, Copilot, Owner Live, Atelier, RAG and Secret Broker are forbidden deployment targets from this repository.
- The Cloudflare account, GitHub organization, authentication email and Sites workspace namespace are shared administrative containers, not proof of resource ownership.
- Before any remote action declare `PROJECT`, `REPOSITORY`, `ENVIRONMENT`, `ORIGIN`, `RESOURCE_TYPE`, `RESOURCE_ID`, `ALLOWED_ACTION` and `ROLLBACK`.

## Truth and standards

- Do not describe the AF-0 to AF-5 method as an official certification or industry standard.
- Treat `llms.txt` as a community proposal.
- Treat WebMCP as a W3C Community Group draft until its status changes.
- Only claim that an endpoint, MCP server, CLI, skill, payment rail, or integration exists after verifying its deployed surface.
- Separate observed evidence, owner declarations, recommendations, and future roadmap.

## Security

- Public scans are read-only.
- Never request or persist passwords, session cookies, API keys, private keys, tokens, or other credentials.
- Keep authenticated project data isolated by `oai-authenticated-user-id`.
- Do not add mutating tools without explicit identity, authorization, consent, idempotency, audit, and rollback design.
- Preserve SSRF, timeout, response-size, and redirect controls in the scanner.

## Engineering

- Add or update Node tests before changing methodology, intake normalization, scoring, or scanner detection.
- Generate and inspect D1 migrations when `db/schema.ts` changes.
- Run `npm test`, `npm run lint`, and `npm run build` before publishing.
- Keep documentation and UI claims aligned with actual runtime behavior.

