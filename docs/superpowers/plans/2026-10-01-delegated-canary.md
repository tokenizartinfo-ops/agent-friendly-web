# AFW isolated OAuth canary

Base: PR140 merged `5f60a236e45524fcec91c897d839cfa694a3d38d`. Approved continuation: prepare real consent acceptance without changing production access.

1. Add/test bounded pilot lifetime and edge request rate guard. Keep local fixture behavior unchanged when no pilot lifetime is configured. Add a small loopback client: PKCE/state in RAM, exact localhost callback, tokens in RAM only, no credential logging/files; read synthetic project and wait for human disconnect to prove denial.
2. Create dedicated AFW D1/KV and Access application for `delegated-canary.agentfriendlyweb.dev`; human destinations only `/authorize`, `/connections`, `/connections/revoke`. No public data without OAuth; no new permission on production. Pre-register one public client with the exact loopback callback.
3. Apply only the new OAuth migrations and a minimal synthetic project schema/data. Read only the existing authorized owner's opaque subject from the production pilot to bind synthetic rows; never copy dossier content or email. Add synthetic second-subject row to prove project mismatch if useful.
4. Config: isolated IDs, workers.dev/preview false, no logs of request credentials, deadline 24h, request limiter, only new hostname. Deploy disabled first, confirm closed, then enable and check real challenge/discovery + Access redirects. No discovery on public apex. Preserve source revision and Worker IDs/rollback procedure.
5. Tests/lint/CI build/review, update roadmap/receipt, PR. Then hand exact canary URL to owner in existing authorized Chrome for login/consent. Do not claim completed edge authenticated acceptance before user action.

Ruling: dated September boundary audit describes the original `canary.agentfriendlyweb.dev`; use a separate dedicated AFW hostname here to preserve that existing full-web canary and isolate Access audiences. This matches current AGENTS.md dedicated-subdomain boundary. Cost limited to one Worker, one KV namespace and one D1 under existing account; no paid add-on or external model call. Rate limit is not a global spend cap. Rollback: disable this new Worker and detach its new domain; preserve synthetic evidence pending review, never alter production.

Storage: no new heavy local build/download. Use installed dependencies and GitHub CI. Retire the temporary service after acceptance; do not delete shared documentation or source.
