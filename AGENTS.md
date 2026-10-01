# Agent Friendly Web - agent instructions

## Scope

This repository implements Gabriel Mucchiut's public Agent Friendly Web initiative. Tokenizart is the first integral case, not the only supported organization.

## Canonical surfaces

- Latest production source after external evidence refresh: `66fc04c51b95812a7f0b4caf169ffc278d4d3608` (PR #137), Worker version `d09bcf52-6fae-4c34-bfec-40b715384205`. Receipt: `docs/AFW-EXTERNAL-AUDIT-2026-09-30.es.md`. Version overrides only prove a candidate when it is included in the active deployment, even at 0%; add it at 0% with the current version at 100%, verify candidate-specific content, then promote. An uploaded-only override silently falls back to active traffic. Preserve pilot bindings and D1. DNSSEC remains pending parent DS; do not claim a numeric external score increase.

- Current release provenance: `docs/AFW-GUIDED-RELEASE-2026-09-30.es.md`; previous releases remain dated evidence under `docs/`. Verify the active deployment again before publishing; a worktree HEAD alone does not represent the frozen production source.

- Latest runtime release: `docs/AFW-DELIVERY-NAVIGATION-RELEASE-2026-09-30.es.md` (PR #134, source 7c049da). Includes PR #130 observed file guidance and PR #132 saved updates read states. Owner manually confirmed MA-08 normal navigation/date and the historical-match guidance message; see `docs/AFW-UPDATES-MANUAL-ACCEPTANCE-2026-09-30.es.md`. Do not repeat those questions. Agent browser control, repeated-reopen UI and failed-read acceptance remain separate. MA-06/07 receipts remain valid; QA Access policy was withdrawn. Do not request OTP for a removed identity. Preserve comparison history on code rollback.

- `public_web`: `https://agentfriendlyweb.dev`, the only canonical public origin.
- `afw_private`: private paths and APIs use Cloudflare Access on an `agentfriendlyweb.dev` hostname or path.
- `afw_canary`: remote parity testing, when needed, uses a dedicated `agentfriendlyweb.dev` subdomain protected by Cloudflare Access.
- `afw_sites_legacy`: every `*.chatgpt.site` surface is retired and must not be deployed, restored, linked or used as staging.
- The canonical public runtime is the Cloudflare-native production Worker. The historical Sites binding receives no apex traffic and is retained temporarily only as bounded rollback evidence.
- Read the project boundary audit before changing remote infrastructure. Never infer the target from an open browser tab.

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
- Keep authenticated project data isolated by the verified Cloudflare Access subject and application audience.
- Do not add mutating tools without explicit identity, authorization, consent, idempotency, audit, and rollback design.
- Preserve SSRF, timeout, response-size, and redirect controls in the scanner.

## Engineering

- Add or update Node tests before changing methodology, intake normalization, scoring, or scanner detection.
- Generate and inspect D1 migrations when `db/schema.ts` changes.
- Run `npm test`, `npm run lint`, and `npm run build` before publishing.
- Keep documentation and UI claims aligned with actual runtime behavior.


## User accompaniment

- Gabriel requires continuous, empathetic guidance throughout the AFW journey: explain the next useful step and why it matters, structure supplied facts, help identify missing information, and allow unknowns to remain pending. Do not invent facts or equate selected improvements with publication permission. Keep help reachable; proposals remain reviewable before saving.

## Operational continuity

- Read `docs/AFW-OPERATING-ROADMAP.es.md` before choosing the next product block. MA-06 same-capsule delivery and MA-07 cross-write were checked; QA policy was withdrawn. Do not repeat the retired synthetic delivery or request OTP from that removed identity. Next: MA-08 private updates/guidance acceptance and remaining pilot API-goal acceptance, then the bounded first-client package. Revocation of an active B token remains unproven. Plans and local simulations do not prove deployed user outcomes.
- Prioritize a complete user outcome: confirmed goal, useful next turn, preserved decisions, proportional scope and verified delivery. Do not add messages/endpoints in place of fixing a broken state or contract.
- Use the browser explicitly authorized in the latest session for AFW private UI checks; Gabriel returned to his existing Chrome on 2026-09-30. Do not launch another Chrome instance or claim/close Tokenizart/Atelier tabs used by another chat. A control failure is not evidence of an expired session; do not request another login by default. If authentication is actually required, preserve the AFW tab and hand it to Gabriel; never request credentials in chat.
- Update the roadmap with evidence and the next block after closure. Preserve historical release receipts; avoid reconstructing the whole chat or vault. Ordinary authorized blocks continue without repeated permission requests.
