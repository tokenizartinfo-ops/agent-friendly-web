# Named confirmation cloud handoff implementation
Spec: docs/superpowers/specs/2026-10-28-named-confirmation-cloud-handoff.md.
1. Add spec/plan and focused tests to accepted base; wire existing package job focused test/PR path. Record one expected availability failure (no syntax failure).
2. Add separate lib/mcp-named-template-public-snapshot.mjs; preserve distinct operator/frozen source pins. Add public-only artifact and main-dispatch-only create-once preservation job. Source and CI remain closed.
3. Verify meaningful focused tests, exact historical rebuild/23native inert tests, full npm test/lint/build; perform one final read-only whole-branch review, record exclusions/deferred Minor findings and fix material findings with RED/GREEN once.
4. Merge exact reviewed head, verify unchanged source tree/mainCI, then dispatch existing workflow once in normal Chrome. Independently inspect immutable ref/commit/tree and new blob contents; verify all hashes, decode raw chunks and pure0/1 assembly without API requests. Never invoke the inert script. Record public receipt and remaining independent cleanup/subscription/PC-off gates; no new local source/build files.
