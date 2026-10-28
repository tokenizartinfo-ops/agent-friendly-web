# Fixed restoration transport plan

Spec: docs/superpowers/specs/2026-10-28-canary-restoration-transport.md
Goal: supply core629's missing bounded authenticated Cloudflare capability without a generic API bridge.
Files: lib/mcp-canary-restoration-transport.mjs; test/mcp-canary-restoration-transport.test.mjs.

1. Commit spec/plan and behavioral tests first; observe missing-module RED.
2. Implement strict private control/endpoint/body validation, reader/publisher separation and one-attempt write fence.
3. Implement original lease/abort/final fences and bounded uncached/unredirected response parsing/secret-value exclusion.
4. Full cloud CI and package builds; one fresh branch review; material findings RED/GREEN/full CI, minors ledgered.
5. Integrate accepted source and exact main CI. Host/wakeup/native withdrawal remain separate.

Review focus: arbitrary target/extra input/accessors must have zero credential/network calls; write ACK uncertainty and late credential completion cannot retry; streaming/cache/redirect/error handling must not leak secrets or accept stale/late data; exact pins and original authority cannot change across awaits; env/secret metadata projection must not return credential values.
Ruling: GitHub isolated branch/Actions replaces local skill workspace under owner cloud-first delegation. Existing issue497/PR ledger records evidence. No token is created/read from current accounts and no live API is invoked by this source block. Rollback is revert of the carrying source PR.
