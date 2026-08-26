---
name: agent-friendly-web-audit
description: Audit public website discoverability, answerability and agent-facing tools with explicit evidence and standards status.
---

# Agent Friendly Web Audit

Use the public `POST /api/scan` endpoint with a single public HTTP/HTTPS `url`.

## Rules

1. Present observed evidence before recommendations.
2. Never call the AF score an official certification.
3. Do not request credentials or audit private hosts.
4. Treat llms.txt as a proposal and WebMCP as experimental.
5. Distinguish deployed tools from documentation, branches and roadmaps.
6. Ask the owner what technical control they have before recommending implementation.

## Example

```json
{
  "url": "https://example.org"
}
```

