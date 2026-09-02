# Agent Friendly Web / Tokenizart Project Boundary Audit

Date: 2026-09-01

## Decision

Agent Friendly Web and Tokenizart share administrative infrastructure but remain separate products. The private `*.tokenizart.chatgpt.site` contact staging surface is retired and must not be used again. The interrupted Gate 6B.3 produced no lead or consent receipt.

## Verified Agent Friendly Web resources

| Resource | Identifier | State |
| --- | --- | --- |
| public web | `agent-friendly-web-web-production` / `https://agentfriendlyweb.dev` | active Cloudflare-native production; private routes behind Access; D1 migrated and empty |
| protected release | `release.agentfriendlyweb.dev` | same production Worker behind Access; rollback detach/reattach verified; 0% apex traffic |
| Sites rollback legacy | `appgdom_6a8f665d5bc881919ac5fbdd05f69cbd` | binding and validation retained temporarily; no apex traffic |
| Cloudflare-native web canary | `agent-friendly-web-web-canary` / `canary.agentfriendlyweb.dev` | deployed behind Access with isolated migrated D1; 0% public-origin traffic; authenticated HTML and responsive parity verified; rollback prepared |
| public MCP | `agent-friendly-web-public-mcp` / `https://mcp.agentfriendlyweb.dev` | active, read-only, no D1 |
| contact Worker legacy | `agent-friendly-web-contact-staging-frontier` | retirement evidence only; Access protected, writes OFF |
| contact D1 legacy | `agent-friendly-web-contact-staging-frontier` | retirement evidence only; isolated, zero leads and zero receipts |
| private Sites contact UI | `agent-friendly-web-contact-staging.tokenizart.chatgpt.site` | retired and restored to its closed version |

## Verified Tokenizart resources kept outside this repository

- Workers `tokenizart-companion-agent*`, `tokenizart-rag-api*`, `tokenizart-atelier-demo-staging` and `tokenizart-secret-broker-staging`;
- D1 databases `tokenizart-companion-memory*`, `tokenizart-rag-citations*`, `tokenizart-owner-live-audit-staging` and `tokenizart-secret-broker-audit-staging`;
- custom origins `companion.tokenizart.info`, `companion-staging.tokenizart.info` and `demo-atelier-staging.tokenizart.info`;
- repositories `tokenizart-cloudflare-ai`, `tokenizart-agentic`, `tokenizart-platform-flows`, `tokenizart-secrets-control-plane` and all other `tokenizart-*` product repositories.

Tokenizart references under `docs/TOKENIZART-*`, `public/cases/tokenizart`, `registry/builtin/tokenizart.v1.json` and `/casos/tokenizart` are case documentation only. They do not authorize runtime or data dependencies.

## Root cause

1. The Sites workspace namespace inserts `tokenizart` into every technical Sites URL.
2. One local repository had GitHub, public Sites and private Sites remotes.
3. Both products use the same Cloudflare account and operator identity.
4. Unqualified use of the word `staging` made unrelated surfaces sound equivalent.

No cross-project Worker, D1 or custom-domain binding was observed.

## New operating rule

Normal AFW testing uses local fixtures and CI. A remote canary is exceptional and must use `canary.agentfriendlyweb.dev`, Cloudflare Access, same-origin UI/API, isolated AFW storage, a bounded lifetime and prepared rollback. `*.chatgpt.site` is not an AFW staging, preview, authentication or rollback target. The dated public ledger is `https://agentfriendlyweb.dev/.well-known/infrastructure-status.json`.

## Status of PR #39

PR #39 is superseded by this decision and must not be merged in its current form. Its corrected surface-separation work remains useful evidence, but the private Sites dependency must be removed in a new design before implementation resumes.

