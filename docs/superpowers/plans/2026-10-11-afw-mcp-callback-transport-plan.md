# Callback transport implementation

Base origin/main1f384332; branch feat/afw-mcp-callback-transport-20261011. Inline autonomous execution in existing isolated worktree. Preserve error.log and other projects. Design in ../specs/2026-10-11-afw-mcp-callback-transport-design.md.

1. Write test/mcp-callback-network.test.mjs for CIDR edges and URL normalization. Observe missing-module RED. Implement lib/mcp-callback-network.mjs using native isIP and integer CIDR comparisons, no dependency/API bypass. GREEN.
2. Write test/mcp-callback-transport.test.mjs, ephemeral OpenSSL test CA and esbuild import overlay only in test. Observe missing-transport RED. Implement lib/mcp-callback-transport.mjs with snapshot/Resolver/public pin/native HTTPS/fixed limits/hard deadline/cancellation and static failures. GREEN actual TLS bytes/hostname and negative cases.
3. Document runtime boundary and remaining gates, retain evidence under output/afw-mcp-callback-transport-ledger-20261011.md. One fresh branch reviewer at end under executing-plans; one correction pass for material issues, no repeated review loop.
4. Run proportionate focused tests then complete bounded2 suite/lint/build. Commit/push/PR; exacthead defaultLinuxCI required before integration. No cloud resources, callbacks to real accounts, endpoint capability advertisement or deployment in this source block. Update continuity with actual results.
