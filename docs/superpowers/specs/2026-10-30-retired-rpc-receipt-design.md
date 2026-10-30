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
- `createRetiredRpcReceipt({challenge, observe, now=Date.now, timeoutMs=5000})`: server-side read-only helper. Challenge is exactly 64 lowercase hexadecimal characters. Call trusted `observe({signal})` once. A direct returned observation is inspected synchronously; an asynchronous adapter must return a genuine native Promise resolving exactly `{value:observation}`, boxed before promise resolution. Snapshot the existing retired observation grammar. Require original identity fields/hashes/flags and valid times; require its observedAt to lie between admission and completion in THIS server clock domain. Preserve all fields. Deadline is at most 5000ms, cannot renew. Return exactly `{purpose:'afw.retired-rpc-receipt.v1',challenge,observation}`.
- `readRetiredRpcReceipt({invoke, assertCurrent, now=Date.now, signal, timeoutMs=5000})`: client-side read-only helper. Generate the challenge with node:crypto randomBytes(32). Call the trusted fixed-target `invoke(challenge, signal)` once. Direct returned domain objects are inspected synchronously. Asynchronous adapters must return a genuine native Promise resolving exactly `{value:domainReceipt}`; the adapter constructs this plain box before promise resolution, so the domain object's `then` descriptor cannot be assimilated. Arbitrary thenables and unboxed asynchronous payloads are denied. The trusted adapter owns any native-transport processing before the helper sees data and must not consume/assimilate an unvalidated domain object; verify the echoed challenge, exact wrapper and existing observation snapshot, parent authority before/after (`assertCurrent` must throw when authority is absent), original abort/deadline, and local clock non-regression. Return exactly `{observation,local:{sentAt,receivedAt}}`, freezing both levels. These local times are explicitly caller-local. Do not compare or normalize remote observedAt against either local time.
No selectors, credentials, callbacks, grants, namespace creation, D1 writes, process start or native subscription capability.

## Failure and lifecycle
Reject malformed/extra keys/accessors, wrong challenge/purpose/identity grammar, remote observations outside the server's own call interval, expired/aborted calls and late acknowledgements. Handle the native non-enumerable Symbol.dispose boundary using data descriptors only. Release borrowed RPC results on every observed outcome; while the execution context remains alive, attach cleanup to late results after timeout. When the native context ends, require native RPC context cleanup/cancellation rather than claiming JavaScript continuations still execute. A future mounted caller must supply a lifetime owner if explicit post-response cleanup must be observed. Disposer failure before acceptance prevents acceptance; late cleanup errors are contained and never resurrect a result. Never retry. Existing raw observation checks remain strict.
Both helpers must stay unmounted: no Worker export or production caller changes.

## Acceptance
RED first on the missing module, then focused unit and native workerd tests in GitHub. Cover independent frozen caller/server clocks including +21ms, wrong/replayed challenge, old raw payload, stale-in-server observation, local regression, abort/deadline and exactly-once disposal (including late RPC values). Full existing CI and independent review before merge. No deployment or human window follows automatically.

## Later integration gate
A separate reviewed change must trace original reservation, successor admission, physical retirement handoff and D1 SQL time domains together. The current SQL future/freshness predicates remain unchanged. Do not claim the complete clock issue fixed by this primitive or infer that it is safe to remove those predicates.
