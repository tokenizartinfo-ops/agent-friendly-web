# Agent Friendly Web public guide v1 implementation plan

**Goal:** release a deterministic, cited and ephemeral public guide at `/guia` without changing the intake, expediente or production mutation boundaries.

## Task 1: Lock the deterministic contract

- Add failing tests for explicit topic routing, acknowledgement continuity, simple/detailed modes, ambiguous input and blocked credentials.
- Add failing contract tests for no persistence, no external model, no actions and allowlisted sources.
- Implement `lib/public-guide.mjs` with a frozen topic catalogue and pure `respondToPublicGuide` function.
- Run the focused tests.

## Task 2: Build the public conversation interface

- Add failing UI contract tests for the route, client-side engine, Enter/Shift+Enter, reset, clickable quick replies, visible sources and absence of storage/fetch APIs.
- Add `app/components/public-guide-chat.tsx`.
- Add `app/guia/page.tsx` with metadata and the shared header/footer.
- Add comic guide styles to `app/globals.css`, including responsive and reduced-motion behaviour.
- Run the focused UI tests.

## Task 3: Publish the machine-readable boundary

- Add `public/.well-known/public-guide-contract.json` with `prototype` status.
- Add failing discovery tests for `/guia`, contract links and truthful capability status.
- Update header, footer, site map, sitemap, `llms.txt`, `llms-full.txt`, AI Catalog and readiness.
- Keep MCP, A2A, voice, payments and autonomous actions planned or research-only.

## Task 4: Validate the release candidate

- Run `npm test`, `npm run lint` and `npm run build`.
- Run Playwright checks at 1440x900 and 390x844.
- Verify keyboard navigation, Enter/Shift+Enter, long-message scrolling, sources, reset and reduced-motion support.
- Confirm no cookies, localStorage, sessionStorage, remote guide requests or console errors.
- Run an independent code review against `main` and resolve valid findings.

## Task 5: Publish and close the gate

- Open a focused PR and require green CI.
- Merge the release candidate.
- Publish a candidate Sites version and verify `/guia` plus the contract by exact URL.
- Promote status from `prototype` to `deployed` only after production verification.
- Publish the final Sites version from the exact promoted commit.
- Record commit, Sites versions, checks, rollback version and remaining limits in a release receipt.

## Rollback

Rollback is the previously verified Sites version. The guide owns no durable data, so rollback requires no data migration or conversation cleanup.
