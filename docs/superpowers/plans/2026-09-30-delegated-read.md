# AFW delegated read implementation plan

> **For agentic workers:** Use superpowers:executing-plans sequentially. The owner approved the architecture and asked to proceed; do not create parallel agents or require repeated approval for ordinary implementation.

**Goal:** Enforce private read-only grants bound to a verified OAuth subject, client, resource and AFW project before exposing a private MCP service.

**Architecture:** First build a transport-independent authorization/read service with owner-scoped D1 queries and a minimal response projection. An OAuth adapter must supply verified context, and each tool call rereads a live grant; a bearer string or client-supplied identity cannot authorize this service. Preserve the anonymous public MCP and production pilot.

**Tech Stack:** Existing Node tests, JavaScript modules, D1/SQLite, existing MCP SDK. Workers OAuth Provider 1.2.1 evaluated for the later adapter; do not install it or publish metadata until its flow is integrated and tested.

**Spec:** `docs/AFW-OAUTH-A2A-PROPOSAL-2026-09-30.es.md`, approved by the owner in this chat.

## Global constraints

- Read saved data only. No scan, inference, write, publication or user-directory tool.
- Validate user/client/project/resource, expiry, revocation and required scopes on every call. Database errors deny access.
- Tenant scope comes from a persisted grant, not arbitrary request arguments. Existing project ownership must still match the grant's verified subject.
- Return only selected project summary and dated observation summaries for the current website origin. Do not return notes, email, drafts, credentials or full raw audit payloads.
- No remote deployment, permissions change or claim of OAuth/A2A availability from this first service block.

## Review focus

Missing authorization context; mismatched client/resource/project; revoked/expired grants between repeated calls; website changes leaving old observations; unexpected fields or malformed stored values.

### Task 1: authorization and bounded private service

**Files:** Create `lib/delegated-project-read.mjs`, `test/delegated-project-read.test.mjs`.

**Interfaces:** `readDelegatedProject({context, projectId, operation, repository, now})`. Context is provided only by a verified OAuth adapter, with `grantId`, `subject`, `clientId`, `resource`, `scopes`. Repository has `getGrant`, `getOwnedProject`, `listCurrentObservations`; all return persisted, owner-scoped data. Operations: `project_summary` and `saved_evidence`.

- [x] Write rejection, cross-tenant, revocation and data-projection tests; run and confirm failure.
- [x] Implement authorization and field projection; run focused tests.
- [x] Add owner-scoped D1 adapter (`lib/delegated-project-repository.mjs`) and SQL tests, including real SQLite integration. Grant storage will be supplied by the OAuth integration; no new table/migration until its final schema is reviewed.
- [x] Verify error handling and unknown operation denial; never log input or database errors.

### Task 2: MCP adapter and local protocol checks

**Files:** Create `lib/delegated-project-mcp.mjs`, `test/delegated-project-mcp.test.mjs`.

- [x] Register two read-only tools with strict empty inputs; use the grant project resolved by the trusted adapter.
- [x] Exercise an MCP client/server exchange for successful minimal reads and denied requests; repeat after revocation.
- [x] Run full tests, lint and build. Local 619 tests passed; clean PR139 CI run36799153517 passed tests/lint/build. Independent focused review found no actionable issues. Record source, limitations, next adapter steps and criteria in the roadmap. PR139 does not enable a production service.

### Next OAuth adapter block

Ruling: began evaluating the adapter after the first nine tests passed; selected library version 1.2.1 from current primary docs. Installation failed for lack of disk space without modifying the dependency manifest/lock. No adapter code or protocol endpoints were added. Full 619 tests pass; local lint is blocked by partial dependency installation. Use clean CI before integrating and restore local dependencies before continuing.

Implement and test Workers OAuth Provider 1.2.1 with pre-registered pilot client, code/PKCE, consent via verified Access identity, authoritative grant persistence/revocation, resource binding and session disconnect. Create grant schema/migration together with this adapter. Verify local protocol end-to-end then isolated canary; only after this flow works publish discovery metadata and auth.md. Actual client authentication by the owner may be needed for the final canary acceptance, not the local service work.
