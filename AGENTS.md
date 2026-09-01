# Agent Friendly Web - agent instructions

## Scope

This repository implements Gabriel Mucchiut's public Agent Friendly Web initiative. Tokenizart is the first integral case, not the only supported organization.

## Canonical surfaces

- `public_web`: `https://agentfriendlyweb.dev`, the public Sites website. The committed `.openai/hosting.json` must always point to this project.
- `contact_staging_ui`: the private `tokenizart.chatgpt.site` Sites project used only as the authenticated human test interface. It is not production and cannot write directly.
- `contact_staging_api`: `https://contact-staging.agentfriendlyweb.dev`, the Access-protected Cloudflare Worker API with an isolated D1 and kill switch. It never serves the human UI; `/health` is JSON only.
- Read `config/surface-environments.json` and run the matching `sites:assert:*` command before every Sites publication. Never infer the target from an open browser tab.

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

