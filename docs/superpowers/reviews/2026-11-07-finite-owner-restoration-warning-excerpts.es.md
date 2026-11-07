# AFW — preserved warning excerpts for the combined gate

7 November 2026. Existing run42381567231, testedSource d6e9ffa81088ce92b6e071cc6f99d77e4738e7ce. Read-only extraction from primary logs already fetched; no rerun, upgrade, runtime action or claim that warnings are resolved. This answers the Task2 review's request for exact visible messages, not their final severity or origin.

## DEP0040

Job prepare_g0/128430089997, decoded log line 153. [Existing job](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128430089997). Process PID is normalized; message text otherwise preserved.

> (node:PID) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.

## DEP0169

Job prepare_g0/128430089997, decoded log line 163. [Existing job](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128430089997). Process PID is normalized; message text otherwise preserved.

> (node:PID) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.

## DEP0005

Job prepare_g0/128430089997, decoded log line 622. [Existing job](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128430089997). Process PID is normalized; message text otherwise preserved.

> (node:PID) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.

## CIMD

Job prepare_g0/128430089997, decoded log line 432. [Existing job](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128430089997). Process PID is normalized; message text otherwise preserved.

> CIMD (Client ID Metadata Document) is disabled: add '"compatibility_flags": ["global_fetch_strictly_public"]' to your wrangler.jsonc to enable. See: https://developers.cloudflare.com/workers/configuration/compatibility-flags/\#global-fetch-strictly-public

## RPC stub

Job prepare_g0/128430089997, decoded log line 440. [Existing job](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128430089997). Process PID is normalized; message text otherwise preserved.

> An RPC stub was not disposed properly. You must call dispose() on all stubs in order to let the other side know that you are no longer using them. You cannot rely on the garbage collector for this because it may take arbitrarily long before actually collecting unreachable objects. As a shortcut, calling dispose() on the result of an RPC call disposes all stubs within it.

## Actions Node20

Job prepare_g0/128430089997, decoded log line 711. [Existing job](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42381567231/job/128430089997). Process PID is normalized; message text otherwise preserved.

> Node.js 20 is deprecated. The following actions target Node.js 20 but are being forced to run on Node.js 24: actions/checkout@v4, actions/download-artifact@v4, actions/setup-node@v4, actions/upload-artifact@v4. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/

## Interpretation and limits

These are warning/noise observations from the test runner, not proof that a live service failed. The SDK/fixture/action attribution and severity still need the combined review. The RPC-disposal message warrants its own concrete lifetime assessment; it is not silently treated as harmless. No code/compatibility flag is changed because a log suggests doing so. Pinned dependency and profile rules remain in force.

Task2 review MinorM3 and Task1RM4 remain tracked. Detailed JSON artifacts preserve the data omitted by truncated diagnostic console lines; artifact recovery is not permission to claim clean output. No customer/owner values or credentials are included here. operationalReadiness=false;completePackage=false;PCoff=false.
