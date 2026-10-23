# Plan — one source-only task

1. Preserve private evidence; isolate clean e3 checkout and use installed dependencies.
2. Add CLI integration tests using fetchImpl interception, observe valid commands RED
   with Invalid operational command before implementation; keep RED log private.
3. Add only three delegating CLI branches, document usage and runtime prerequisites.
4. Run targeted GREEN, npm test, npm run lint and npm run build in cloud; report exact
   failures/warnings/skips. Review diff, commit source-only and propose PR, never merge.
5. Preserve logs and rollback via the task commit/patch; no remote runtime actions.
