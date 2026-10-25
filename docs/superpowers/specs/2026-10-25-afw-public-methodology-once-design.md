# AFW public methodology once — design

Date:2026-10-25. PROJECT AFW; repository tokenizartinfo-ops/agent-friendly-web. Source-only QA preparation from main3007d90619bfdc0d370f5b303cc931850d4cbf9a; runtime app d3b638a4 is unchanged. Owner requests autonomous cloud-first progress; questions opted out. This document records root's implementation choice, not new runtime authority.

## Purpose and decision
The accepted public release proves initialization/catalog and complexity guards, not a useful tools/call. Work helper preflight on25oct18:49UTC sent0 requests because its effective network allowance was unverifiable; admission6401685618 is CLOSED. Do not relax or bypass that environment.
Use a separate manual GitHub Actions check, as an existing authorized execution surface for public AFW observations. Alternatives: native AFW Operations remains blocked by its proxy; local execution would burden the owner's PC and would not prove a cloud observation; the broad release smoke would audit a third-party site and exceed this scope. No new service, SDK, dependency, credential or product feature.

## Fixed scope
- Normal public traffic to https://agentfriendlyweb.dev/mcp only. No version override, cookies, auth, redirects, external targets, GET/OPTIONS/DELETE, private dossier, model call, audit, payment or publication.
- One ordered legacy-compatible MCP sequence: initialize(id1,protocol2024-11-05), notifications/initialized(noid), tools/list(id2), tools/call(id3,get_afw_methodology,{section:"overview"}).
- At most4 POSTs; counters advance before send; stop at first failure, never retry or resume. Check server name and negotiated known protocol before continuing; fail closed if a session is required. The catalog must declare the tool read-only, non-destructive and closed-world.
- Original integer UTC window supplied only at manual dispatch, <=600000ms wide; defaults0/1 deliberately closed. Start must already have arrived; no renewal. Each response including its body <=10000ms; whole sequence <=30000ms and original expiry; response<=65536bytes, total<=262144bytes.
- Read/parse JSON or finite SSE with exactly one correlated RPC2.0 result; malformed UTF8, duplicate/missing/wrongid/error/event/truncation/size/deadline all fail closed. Notification requires202/204 and empty body.
- Useful result must match public contract/version/tool/status/input, generated_at near the observer clock (not time attestation), six AF0–5 levels, nonempty categories, fixed public sources, nonempty limits and blocked actions. It must say this is a proprietary methodology, not official certification or industry standard.
- Receipt contains only bounded metadata, boolean checks, counts, bytes, UTC and SHA256 of JSON.stringify(structuredContent), never raw bodies/headers/error strings/proxy/credentials. A useful public result does not prove other tools, tokens saved, prices, SLA, private events or PC-off.
- Manual workflow on exact repository/main, attempt1 only, contents:read, no secrets, no scheduler. PR runs fixtures only. No dependencies installation; Node built-ins. Live failure still uploads only the sanitized result for7days. GitHub job context is provenance, not authentication authority inferred from caller-controlled env strings. No durable cross-run lock promised; root admits only one run and never uses rerun.
- Root must verify the active public deployment before and after a separately admitted future run; a source build does not prove it executed.

## Closure / preservation
Changed files: observer script, its tests, manual workflow, this spec and plan. Public app, accepted activation/observer, packages, existing workflows and private resources unchanged. Rollback is a source-only revert of these new files; no runtime action to reverse. Abort streams and exit after the bounded attempt; no persistent process or scheduled guard. Gate OpenAI18196140/Container02382110, uncertain private plans, PC-off and Max remain independent.
