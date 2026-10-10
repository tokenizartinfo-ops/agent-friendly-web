# Agent Friendly Web authentication and authorization

Status observed: 2026-09-02

This document describes the authentication boundaries that actually exist on
`https://agentfriendlyweb.dev`. It is project documentation, not an official
authentication discovery standard.

## Public access

The public website, public audit API, public read-only MCP server, Registry
profiles, OpenAPI document, skills and public knowledge files do not require a
login. Public access does not grant access to a private dossier and does not
permit website mutation.

## Human access to private routes

Cloudflare Access protects these route families:

- `/expediente*`
- `/capsula/*`
- `/api/projects`
- `/api/projects/*`

The current pilot uses an allowlisted email address and a one-time code sent
by Cloudflare Access. It does not require a ChatGPT
account or a reusable Agent Friendly Web password.

After the edge admits a request, the application verifies the signed
Cloudflare Access JWT, issuer and application audience. The application derives
the private actor from the verified token and fails closed when verification
does not succeed.

## Public tools and agents

The public MCP endpoint at `https://mcp.agentfriendlyweb.dev/mcp` is stateless
and read-only. It uses no owner identity, private dossier or delegated website
permission. The public audit API is similarly bounded to public evidence.

OAuth 2.1, OpenID Connect discovery, Protected Resource Metadata and A2A agent
authorization are not deployed. No client should infer private or write access
from this document.

## Planned authorization boundary

If Agent Friendly Web later exposes owner-scoped tools, the design will require
short-lived scoped authorization, explicit owner consent, audience binding,
revocation, idempotency and metadata-only audit records. Human browser sessions,
administrative access and agent credentials will remain separate.

## Credential handling

Agent Friendly Web does not ask users to place passwords, API keys, private
keys, session cookies or payment credentials in forms, prompts or publication
capsules. A future credential broker or provider connection must expose bounded
capabilities rather than returning secret values to an agent.

## Canonical references

- Infrastructure status: https://agentfriendlyweb.dev/.well-known/infrastructure-status.json
- Readiness status: https://agentfriendlyweb.dev/.well-known/agent-readiness.json
- Security policy: https://agentfriendlyweb.dev/.well-known/security.txt
- Public MCP card: https://agentfriendlyweb.dev/.well-known/mcp/server-card.json
- Cloudflare Access one-time PIN documentation: https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/
