# Plan: Public MCP JSON ingress budget
Spec: docs/superpowers/specs/2026-10-24-public-mcp-json-budget-design.md
Base:94b563e85d475555369b3b66c45e3bc8afe07c00. Isolated GitHub branch fix/public-mcp-json-budget-20261024; use existing authorized cloud scratch for dependency-free focused tests and GitHub Actions for the full suite. No new local checkout/build.

1. Add behavioral tests to test/public-mcp-http.test.mjs BEFORE production code. Run node --test test/public-mcp-http.test.mjs against byte-exact current lib/public-mcp-http.mjs in owned cloud scratch. Expected RED: missing rejection for deep metadata, too many values, and depth65; other existing/boundary/string/parse cases pass.
2. Add only iterative structural inspection to prepareBoundedPublicMcpRequest after body collection. Keep32KiB, original bytes and invalid JSON protocol behavior. Run the same focused command; require all pass.
3. Open source-only PR; require npm test, npm run lint, npm run build through existing CI. Review depth64/65, values4096/4097, braces/UTF8 strings, malformed JSON, one iteration per value and no swallowed guard errors. Fresh whole-branch review; fix concrete findings with RED/GREEN.
4. Verify exact PR/head/tree/CI. Integrate source only when green/reviewed under standing authorization; record pending separate public release. Do not deploy main or mutate private runtimes.

Ledger: initial source review complete. RED observed in existing authorized cloud scratch: 8cases/5PASS/3FAIL, all three Missing expected rejection; unchanged baseline and RED receipt preserved. GREEN/full CI/fresh review pending. No shared interfaces beyond prepareBoundedPublicMcpRequest(request,maxBytes) -> Promise<Request> and existing PublicMcpHttpError. Existing caller mapping yields413 for the new error.
