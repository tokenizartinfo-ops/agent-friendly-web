# Agent Friendly Web public guide v1

**Date:** 2026-08-27
**Status:** approved for implementation
**Canonical route:** `https://agentfriendlyweb.dev/guia`

## Purpose

The public guide helps a non-technical visitor understand Agent Friendly Web, choose a useful next step and find the public evidence behind each answer. It complements the intake prototype at `/asistente`; it does not replace it or turn a conversation into an intake record.

The first release is deterministic, client-side and ephemeral. Its goal is to validate conversational continuity, information architecture and usability before introducing a model, voice, persistence or authenticated context.

## Product boundaries

The guide may:

- explain Agent Friendly Web, AF-0 to AF-5, audits, AEO, crawler policies, Registry, OKF, CLI, skills, the Tokenizart case and roadmap boundaries;
- adapt an answer to `simple`, `standard` or `detailed` depth;
- understand direct continuations such as `si`, `dale`, `continua`, `mas simple` and `mas detalle` using the immediately preceding guide state;
- ask one focused clarification when the request is ambiguous;
- offer up to three clickable follow-up choices and one primary next step;
- cite public, versioned Agent Friendly Web resources.

The guide may not:

- save or transmit the conversation;
- access an authenticated expediente, account, email or payment method;
- execute the CLI, an audit, a deployment, a publication or a website mutation;
- request or accept passwords, cookies, tokens, private keys, API keys or payment data;
- invent prices, guarantees, certifications, rankings, indexing results or capabilities;
- claim that MCP, A2A, WebMCP, voice or x402 are deployed.

## Separation from `/asistente`

`/guia` answers questions and directs the visitor. `/asistente` transforms rough organization notes into field-scoped proposals for human review. A visible transition may link from the guide to the assistant, but no conversation content is copied automatically.

## Conversation contract

The deterministic engine receives:

```json
{
  "message": "si, dale",
  "context": {
    "topic": "af_levels",
    "mode": "standard",
    "pending_follow_up": "audit_first_step"
  }
}
```

It returns:

```json
{
  "contract": "agent-friendly-web.public-guide-turn.v1",
  "topic": "audit_first_step",
  "mode": "standard",
  "answer": "...",
  "quick_replies": ["Auditar mi sitio", "Ver AF-0 a AF-5"],
  "sources": [{ "title": "Metodologia", "url": "/metodologia" }],
  "next_context": {
    "topic": "audit_first_step",
    "mode": "standard",
    "pending_follow_up": "audit_process"
  }
}
```

Only allowlisted topic and source identifiers may appear. The UI owns the visible message history in React memory. Reloading or closing the page clears it.

## Topic catalogue

The first catalogue covers:

1. product overview and who benefits;
2. AF-0 to AF-5 maturity;
3. public read-only audit and evidence;
4. AEO and crawler policies;
5. `robots.txt`, sitemap, `llms.txt`, `llms-full.txt` and structured data;
6. Registry and domain verification;
7. controlled intake and authenticated expediente;
8. public OKF knowledge;
9. read-only CLI and public skill;
10. Tokenizart as the first integral case;
11. security, privacy and prohibited secrets;
12. pricing and commercial boundaries;
13. roadmap boundaries for MCP, A2A, WebMCP, voice and x402;
14. navigation and recommended first steps.

Each topic defines a simple, standard and detailed answer, public sources, suggested replies and a single pending follow-up anchor.

## Continuity rules

1. A strong explicit topic in the current message overrides prior context.
2. `si`, `dale`, `continua`, `mostrame` and equivalent acknowledgements resolve the previous `pending_follow_up`.
3. `mas simple` and `sin tecnicismos` preserve the topic and switch to simple mode.
4. `mas detalle`, `profundiza` and equivalent requests preserve the topic and switch to detailed mode.
5. If no prior anchor exists, a referential reply asks one short clarification instead of selecting a generic topic.
6. The engine never carries context across page reloads.

## Security and failure behaviour

Likely credentials fail closed. The response asks the visitor to remove them and does not echo the submitted text. Requests to pay, publish, deploy, modify a site or access private data receive a boundary explanation and a safe route to the relevant human workflow.

Unknown questions return a compact clarification with three supported areas. They do not fall back to a generic marketing response.

## Human interface

The page uses the approved Agent Friendly Web comic language:

- near-black ink, warm paper and restrained sepia;
- one guide robot and selectable HTML speech bubbles;
- a stable chat area with no nested decorative cards;
- visible source links after each guide answer;
- quick-reply controls below the answer;
- a sticky composer on long conversations;
- `Enter` sends and `Shift+Enter` creates a new line;
- a visible `Reiniciar` command clears only local React state;
- desktop and mobile layouts preserve reading order and focus order.

The interface states clearly that the guide is deterministic, public and non-persistent. It links to `/asistente` only when the visitor wants help preparing information.

## Public discovery

The release publishes:

- `/guia`;
- `/.well-known/public-guide-contract.json` as a project convention, not an official standard;
- links from the header, footer, human site map, sitemap, `llms.txt`, `llms-full.txt`, AI Catalog and readiness manifest.

The capability remains `prototype` until the production URL and contract are verified. It may be promoted to `deployed` only in a separate post-verification commit.

## Deferred capabilities

Model-backed answers, authenticated expediente context, transfer of approved fields, multilingual dialogue, voice, email, audit execution, payments and remote actions remain separate roadmap gates. A future model-backed version must retain the deterministic topic contract as a verifier and fallback.

## Acceptance criteria

1. A greeting explains what the guide is and offers a clear first choice.
2. Explicit questions about each catalogue topic receive a relevant answer and source.
3. `si, dale` follows the previous offer instead of resetting the conversation.
4. `mas simple` shortens the current topic without changing subject.
5. Credential-like input is blocked without echoing it.
6. Requests for actions remain read-only and link to the appropriate workflow.
7. No browser storage, cookies, fetch calls or persistence APIs are used.
8. The composer supports Enter and Shift+Enter.
9. Desktop and mobile have no horizontal overflow, overlapping controls or cropped text.
10. Discovery resources describe the actual deployed status without claiming MCP, A2A or autonomous execution.
