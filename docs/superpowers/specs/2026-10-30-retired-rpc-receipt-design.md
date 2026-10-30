# Challenged retired-RPC receipt preparation
Status: source preparation only. Nothing is mounted or promoted.

## Evidence and scope
The real Workflow `afw-release-de218a824a97c980de614acb41ac667bda85fcb799dab82444a8f25118792e9c` ended uncertain on 30 October 2026 with a remote observation 21ms ahead of the caller's recorded receipt. All permissions/runtime were closed; no successor reservation was made. This demonstrates the rejecting boundary, not physical clock skew or a Cloudflare defect. Official timer semantics: https://developers.cloudflare.com/workers/runtime-apis/performance/ .

Prepare a small, unmounted protocol primitive before changing any admission or retirement reader. This is the first deliverable in the causal-freshness investigation, not a deployed fix.

## Decision and alternatives
My engineering choice: a fresh, single-call, unpredictable challenge echoed by the fixed original RPC, with observation freshness checked inside the observer's own clock domain and the reply bounded by the caller's original deadline. Preserve the original observation verbatim.
An arbitrary skew allowance weakens an unexplained boundary. Rewriting the remote timestamp destroys provenance. Neither is included.
The legacy strict reader and every current runtime call remain unchanged in this deliverable.

## Interface
Add `lib/mcp-retired-rpc-receipt.mjs`.
- `createRetiredRpcReceipt({challenge, observe, now=Date.now, timeoutMs=5000})`: server-side read-only helper. Challenge is exactly 64 lowercase hexadecimal characters. Call trusted `observe({signal})` once. Snapshot the existing retired observation grammar. Require original identity fields/hashes/flags and valid times; require its observedAt to lie between admission and completion in THIS server clock domain. Preserve all fields. Deadline is at most 5000ms, cannot renew. Return exactly `{purpose:'afw.retired-rpc-receipt.v1',challenge,observation}`.
- `readRetiredRpcReceipt({invoke, assertCurrent, now=Date.now, signal, timeoutMs=5000})`: client-side read-only helper. Generate the challenge with node:crypto randomBytes(32). Call the trusted fixed-target `invoke(challenge, signal)` once; verify the echoed challenge, exact wrapper and existing observation snapshot, parent authority before/after, original abort/deadline, and local clock non-regression. Return the unmodified observation and caller-local sentAt/receivedAt in an explicitly labeled receipt object. Do not compare or normalize remote observedAt against either local time.
No selectors, credentials, callbacks, grants, namespace creation, D1 writes, process start or native subscription capability.

## Failure and lifecycle
Reject malformed/extra keys/accessors, wrong challenge/purpose/identity grammar, remote observations outside the server's own call interval, expired/aborted calls and late acknowledgements. Handle the native non-enumerable Symbol.dispose boundary using data descriptors only. Release borrowed RPC results on every outcome, including results arriving after timeout; disposer failure prevents acceptance. Never retry. Existing raw observation checks remain strict.
Both helpers must stay unmounted: no Worker export or production caller changes.

## Acceptance
RED first on the missing module, then focused unit and native workerd tests in GitHub. Cover independent frozen caller/server clocks including +21ms, wrong/replayed challenge, old raw payload, stale-in-server observation, local regression, abort/deadline and exactly-once disposal (including late RPC values). Full existing CI and independent review before merge. No deployment or human window follows automatically.

## Later integration gate
A separate reviewed change must trace original reservation, successor admission, physical retirement handoff and D1 SQL time domains together. The current SQL future/freshness predicates remain unchanged. Do not claim the complete clock issue fixed by this primitive or infer that it is safe to remove those predicates.
