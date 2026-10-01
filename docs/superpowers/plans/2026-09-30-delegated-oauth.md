# AFW delegated OAuth local flow

Approved design: `docs/AFW-OAUTH-A2A-PROPOSAL-2026-09-30.es.md`. Execute sequentially using existing TDD and verification skills. The owner requested continuation after freeing disk space.

Goal: a complete local Authorization Code/PKCE flow, human consent for one owned project, private MCP reads and immediate AFW disconnect. Preserve public MCP and production access.

Architecture: Workers OAuth Provider 1.2.1 handles protocol and encrypted/hashed token storage in KV. Separate authorization/resource roles run in an isolated adapter; D1 is authoritative for application grants and consumed consent handles. No cookies or raw tokens in D1. Identity is verified through the existing Access JWT verifier. Tool context comes only from the resource server's validated token. No private production route or discovery is published in this block.

1. Tests first: SQLite grant/consent store ownership, expiry and single-use consumption; add schema and generate migration, never apply remotely by inference.
2. Tests first: real provider authorization + PKCE with a pre-registered public test client, signed synthetic Access identity, cookie-bound consent and project selection; wrong user/client/redirect, no consent, expired/reused handles, scope escalation and wrong resource denied. No refresh tokens in the first pilot; access token five minutes, application grant ten minutes.
3. Private MCP resource: two read-only tools, per-request server/context, validate audience, scopes and live D1 grant. Human connection screen issues browser-bound revoke nonce tied to subject; disconnect updates D1 synchronously. Standard client token revocation must also revoke the application grant when a valid pilot token/client pair is supplied.
4. Local Worker entry/config: disabled by default, local KV/D1 only, no production routes/IDs, public workers.dev/preview disabled. Test end-to-end in Node with actual SDK/provider and SQLite, then Wrangler local runtime where possible. Persist grant/revoke evidence without raw tokens or cookies. Production canary needs a dedicated Access app, pilot client and owner acceptance before public claims.
5. Full tests/lint/build, independent review, PR and operational receipt. No changes to external score or A2A availability.

Security invariants: no open client registration or CIMD; require pilot client allowlist, exact redirects and S256; identity/consent/project checked again before code issuance; consumed application handles are atomic in D1; unknown metadata/host/body rejected; D1 outages fail closed; no debug logs of requests or errors containing credentials. Human actions require same origin and non-reusable nonce/cookie, and data reads never create scans, infer, save dossier fields or deploy.
