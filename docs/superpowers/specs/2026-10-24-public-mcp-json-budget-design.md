# Public MCP JSON ingress budget — 2026-10-24

Source-only hardening of lib/public-mcp-http.mjs, shared by app/mcp/route.ts and worker/mcp/index.mjs. The existing32KiB reader admits arbitrarily nested valid JSON within that byte cap. Do not claim a demonstrated exploit, SDK vulnerability fix, live release or solution to Codex networking.

Decision by root under the owner's delegated routine choices: after the byte-bounded read, parse for inspection and walk JSON values iteratively, rejecting HTTP413/request_too_complex above64 value levels or4096 total values. Root value has depth1 and counts as one. Object keys are not separate values; arrays and objects count. Exactly-at-limit JSON remains admissible. Preserve original bytes/headers and all existing size/media/method/host/SSRF/auth rules. Invalid JSON remains unchanged for the SDK's existing protocol parser/error. No SDK/dependency update, new endpoint or private runtime changes.

Alternatives considered: rely only on32KiB (does not bound nesting); add lexical bracket counts (misreads strings/escapes); iterative inspection of parsed JSON (chosen, bounded work without recursion). Limits are conservative engineering choices, not a user requirement or MCP standard. Response sanitizer and slow-stream lifetime are separate scopes.

Close with observed RED against the unchanged reader, GREEN against the candidate, boundary/string/malformed-JSON compatibility tests, full CI tests/lint/build and fresh source review. Runtime publication remains separate.
