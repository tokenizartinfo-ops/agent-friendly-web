# Execution ledger — plan: docs/superpowers/plans/2026-10-30-retired-rpc-receipt.md

- Baseline c5f9d8f33e2e279135086265d3fd4f0e7f428013; source-only isolated GitHub branch. No local checkout or build. Tasks 1→2 share the two helper signatures and exact result shapes.
- Ruling: use the isolated GitHub branch and this durable ledger instead of local sdd scripts/worktree — owner requires cloud-first work; no local filesystem artifact is needed. Cost if wrong: less local tooling automation, not wider authority.
- Ruling: explicit late cleanup is guaranteed only in a live execution context; native cleanup/cancellation owns a terminated context — no callback can execute after its context ends. Integration must provide a lifetime owner if it needs observed post-response cleanup. Cost if wrong: integration cannot claim cleanup based solely on this primitive.
- Task 1 in progress: RED unit tests before implementation; both production helpers stay unmounted.
