# Agent Friendly Web - agent instructions

## Scope

This repository implements Gabriel Mucchiut's public Agent Friendly Web initiative. Tokenizart is the first integral case, not the only supported organization.

## Canonical surfaces

- Independent public A2A runtime: `agent-friendly-web-a2a`, source `ee62698`, version `3238969a-d5e8-45c6-9417-fc19452b762a`, verified2026-10-02. Receipt and rollback: `docs/AFW-A2A-PUBLIC-RELEASE-2026-10-02.es.md`. This is not the web/private Worker release. External all/apiApp5/5,12PASS/4FAIL; no numeric score returned. Preserve private Access and do not advertise OAuth until real client acceptance.

- Latest production source: `4788e5a4caed7d57bd783201ffb6bd43da02c8c9`, Worker version `00861678-d968-41d3-be85-180896a321b7`, 100%. Receipt: `docs/AFW-DELIVERY-PLAN-RELEASE-2026-10-01.es.md`. Delivery planning, saved reload and concurrent-tab rejection were accepted in Canary; production artifact/Access smoke passed after measured deployment propagation. Preserve existing Access/copilot pilot and D1; migrations 0011–0013 applied. Code rollback is `d09bcf52-6fae-4c34-bfec-40b715384205` preserving tables/data. Version overrides only prove a candidate included in the active deployment, even at 0%. Verify a specific new asset hash before promotion and again on normal traffic after bounded convergence (30s budget), not solely immediate CLI success. Read the receipt before calling a transient asset 404 a failed build. External audit evidence remains `docs/AFW-EXTERNAL-AUDIT-2026-09-30.es.md`; this release does not prove a numeric score increase or DNSSEC resolution.

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

- Latest minimum-consent release: `docs/AFW-MINIMUM-CONSENT-2026-10-03.es.md`, PR198/source8c34b519, CI731/lint/build passed and independent review complete. Actual Chrome consent shows summary by default and optional unchecked evidence, without URL editing; cancelled without a new grant. Real pilot closed8dfb4024-14fa-4d7d-be33-229b16e5c652; canary closed74b2447c-062e-4060-944b-49106745469c, both100%/flagsfalse/six endpoints404. No active grants. This supersedes older closed version pointers, not their dated evidence. Next `docs/AFW-DELEGATED-OPENING-PLAN-2026-10-03.es.md`: recovery and controlled service before apex discovery/customer opening. Do not repeat accepted cloud renewal, edit scopes in URLs or infer permanent management/access.

- Start with `docs/AFW-REFRESH-ACCEPTANCE-2026-10-03.es.md` and the top checkpoint in `docs/AFW-OPERATING-ROADMAP.es.md`. The dated bullets below are historical receipts, not cumulative pending tasks. PR195/source8fdd8cf implements bounded refresh; CI730 passed. Synthetic AND own-dossier summary ChatGPT renewals after all previous tokens expired passed; withdrawals returned client UNAUTHORIZED/oauth_token_invalid_grant before MCP, not an observed MCP403. Canary restored closed7375e5e6-acda-44d4-a53c-55de7b74ffa1; real pilot restored closed9421a851-926b-4b0e-b47e-091e909e6e1e at100%22:16:03UTC, flagsfalse/three endpoints404. Production migration0014 applied; five projects/two revoked grants preserved, zero active grants. This does not enable commercial OAuth, private evidence scope or apex discovery. Next fix minimum-scope consent without URL editing and conversational recovery; never reuse old consent URLs or infer a grant from the connector badge. A retired connection must not be reconnected automatically; choose Ahora no after withdrawal and record the exact result. Do not invent the owner's missing dossier goal or equate intake17% with an AF score.

- Latest real read acceptance: `docs/AFW-REAL-READ-ACCEPTANCE-2026-10-03.es.md`. Own-dossier summary read from ChatGPT cloud and denial after disconnect with a live token passed. Grant revoked; real service restored closed 4db09f45-c082-44b1-ab6f-d019467c9178 at 100%, metadata/MCP404. Earlier pending OTP/consent entries are historical. Do not repeat accepted human checks or equate draft completion17% with an AF/external score. Next renewal/expiry experience before persistent/customer access; private real evidence scope and apex discovery remain separate.

- Real own-dossier pilot provisioned: `docs/AFW-REAL-READ-CLOSED-RELEASE-2026-10-03.es.md`, config `wrangler.delegated-real-pilot.jsonc`. Closed rollback 4db09f45-c082-44b1-ab6f-d019467c9178; bounded candidate 89193ca7-124c-4cf7-8a7d-3676d40f7f6e closes 2026-10-03T20:25:00Z. Separate KV/Access/client and server project pin verified; administrative identity correlation passed, not session JWT acceptance. ChatGPT constructor reached new Access verification; owner OTP and specific real consent pending. Do not repeat synthetic acceptance, recreate connector, use old OTP, or advertise apex OAuth. Check actual deployment/deadline first and restore closed after acceptance or interrupted window; preserve production data.

- Latest delegated ChatGPT acceptance: `docs/AFW-EVIDENCE-WINDOW-2026-10-03.es.md`. Incremental evidence consent, dated synthetic read and denial after revocation with a live token passed; both renewed grants revoked and canary restored closed. Do not repeat synthetic acceptance or equate it with production access. Real-pilot preparation: `docs/AFW-REAL-READ-PILOT-2026-10-03.es.md`; four schema checks passed on production without reading/writing rows. The example configuration is closed and incomplete, not an existing service. Require a server project pin and verified identity/resources before a real pilot.

- Delivery experience: read `docs/AFW-DELIVERY-EXPERIENCE.es.md` before choosing a CMS/hosting delivery method. It contains dated, sanitized Tokenizart/Atelier case evidence, unresolved external-auditor differences and scoped maintainer/access procedures. Provider names do not establish capabilities. Do not inject historical customer facts into a new dossier or claim this knowledge is deployed in the customer copilot.

- Delegated OAuth synthetic edge acceptance is complete: `docs/AFW-OAUTH-ACCEPTANCE-2026-10-01.es.md`. The actual MCP client observed denial after human disconnect while its token was still valid; both canary grants are revoked. Canary is now disabled (version `4775ff39-b406-4f62-8eaa-d4d336a80446`), D1/KV preserved, production unchanged. Older pending revocation statements describe previous tests and do not supersede this receipt. Next prepare a compatible explicit client and useful real-project read pilot; do not enable production, widen scopes or advertise apex discovery from synthetic acceptance.

- Read `docs/AFW-OPERATING-ROADMAP.es.md` before choosing the next product block. MA-06 same-capsule delivery and MA-07 cross-write were checked; QA policy was withdrawn. Do not repeat the retired synthetic delivery or request OTP from that removed identity. Next: MA-08 private updates/guidance acceptance and remaining pilot API-goal acceptance, then the bounded first-client package. Revocation of an active B token remains unproven. Plans and local simulations do not prove deployed user outcomes.
- Prioritize a complete user outcome: confirmed goal, useful next turn, preserved decisions, proportional scope and verified delivery. Do not add messages/endpoints in place of fixing a broken state or contract.
- Use the browser explicitly authorized in the latest session for AFW private UI checks; Gabriel returned to his existing Chrome on 2026-09-30. Do not launch another Chrome instance or claim/close Tokenizart/Atelier tabs used by another chat. A control failure is not evidence of an expired session; do not request another login by default. If authentication is actually required, preserve the AFW tab and hand it to Gabriel; never request credentials in chat.
- Update the roadmap with evidence and the next block after closure. Preserve historical release receipts; avoid reconstructing the whole chat or vault. Ordinary authorized blocks continue without repeated permission requests.
- Latest delegated closed release: source 01303902e56291c19602afa4fc766dc62c35e855 / PR193, version 5d412e32-0f56-4dce-9088-60a941aa7015 at 100%, verified2026-10-03T20:29:08Z. OAuth disabled/deadline expired, pin and D1/KV retained, MCP/metadata404. CI723 passed. Receipt: docs/AFW-CONNECTION-EXPIRY-2026-10-03.es.md. Earlier closed versions remain rollback/history. No automatic refresh exists; read docs/AFW-RENEWAL-CONTRACT-2026-10-03.es.md before implementing it. Do not repeat completed human acceptance or reopen merely for documentation.

- Latest refresh preparation release: docs/AFW-REFRESH-CLOSED-RELEASE-2026-10-03.es.md. PR195/source8fdd8cf, CI730 passed. Real pilot closed9421a851-926b-4b0e-b47e-091e909e6e1e and synthetic closed7375e5e6-acda-44d4-a53c-55de7b74ffa1 at100%, OAuth/refreshfalse, metadata/MCP404. Additive0014 schema exists ONLY in synthetic D1; five revoked grants/two projects preserved. Do not apply whole web migration chain there or infer production schema/refresh acceptance. Next new cycle from ChatGPT; earlier human acceptance remains valid only for its original no-refresh flow.
