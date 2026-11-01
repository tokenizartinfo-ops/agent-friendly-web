# Private stored-generation reader Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: use superpowers:subagent-driven-development task by task. Owner authorized cloud-first chained execution and waived intermediate design questions.

**Goal:** select validated historical generation facts without weakening HEAD-only authority.
**Architecture:** one narrow private snapshot helper reusing the existing ledger traversal; one unmounted pinned reader comparing two full lineage commitments under the original <=5s lease.
**Tech:** Node22, current native fixtures/Miniflare in secret-free GitHub Actions; GitHub versioned ledger.
**Spec:** docs/superpowers/specs/2026-11-01-private-stored-generation-reader.md

## Global constraints
Source/CI only; no live trial, endpoint, Worker import/config, DDL/data, role/key/grant/OTP, scheduler or Max. Preserve existing result shapes and read/readRetained/readArmed/named authorization. Local clock/pin checks are not external module/config provenance. Never relax original parent budget or compensate future comment timestamps.

## Review focus
- INFO HEAD commitments omit mutable CONTROL; compare the entire validated chain.
- Historical UUID/source are facts, not current reader identity or authority.
- Bootstrap data must be revalidated by the SAME primary transaction/traversal; no alternate chain parser or selector mode.
- Two snapshots and final settlement must share wall/mono/parent budget and withinWindow classification.
- A private reader result cannot become a cleanup capability or public diagnostic.

### Task1 — narrow ledger snapshot and unmounted pinned reader
Files: modify lib/mcp-qa-generation-ledger.mjs; create lib/mcp-qa-stored-generation-reader.mjs and test/mcp-qa-stored-generation-reader.test.mjs. Add fixture changes only if needed, preserve unrelated source/tests.
- [ ] Inspect exact baseline and relevant AGENTS sections.
- [ ] Add failing tests using actual existing ledger fixtures; verify RED in secret-free Actions before implementation.
- [ ] Implement the narrow snapshot helper by reusing createMetadataReader, strict owned commitment/output and private reader from spec.
- [ ] Include meaningful mutation/clock/parent/lineage tests, historical identity separation and unchanged current/retained/named authority rejection.
- [ ] GREEN focused tests: node --test test/mcp-qa-stored-generation-reader.test.mjs test/mcp-qa-generation-ledger.test.mjs test/mcp-qa-generation-resolver.test.mjs test/mcp-qa-generation-authorization.test.mjs (verify actual existing filenames before constructing job).
- [ ] Run targeted ESLint and related existing native observer/preparation suites.
- [ ] Independent fresh task review; fix findings and scoped re-review.

### Task2 — source integration and exact-tree acceptance
Files: spec/plan/progress ledger, concise AFW private selection note and additive dated AGENTS prefix. No source-of-truth history rewrite.
- [ ] Compose only reviewed source/test blobs onto current accepted main, preserving runtime source and consumed intent facts.
- [ ] Full CI/lint/five package builds; verify reviewed head tree equals actual CI checkout tree.
- [ ] Fresh whole-branch review; fix findings and scoped re-review.
- [ ] With existing owner integration authorization, merge by expected head only after checks/reviews; verify accepted main tree.
- [ ] Record exact tests/source/reviews and unresolved runtime gates in issue497. No operational promotion implied.

## Execution method and rollback
Use cloud-isolated GitHub branches; no local clone/worktree/build/deps/temp. Preserve parent SHA/tree and all external work. Source rollback is a reviewed additive revert; never reset main or runtime. Optional task qualification workflow is branch-only and must be excluded from final composition unless independently justified. No secrets or live resources in qualification.
