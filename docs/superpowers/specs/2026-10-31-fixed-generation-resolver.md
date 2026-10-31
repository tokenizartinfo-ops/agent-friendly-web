# Fixed private QA generation resolver

AFW only. Approved named Workflow/generation integration, source increment31Oct2026. Base059f2f81 (PR674); finite closed GHA restoration qualified separately by run41223000676. No runtime promotion, grant, D1 binding, ARM, Workflow instance or successor budget use.

## Mounted read-only boundary

IndependentClosure.readOwnQaGeneration(planHash) accepts exactly one lowercase64hex hash, never a capsule, UUID, source, callback, env or selector. The host fixes the existing afw-own-successor-closure-v1 actor and its current storage/namespace identities. Constructor receives the QA source revision from the existing build-injected constant, not the request.

Read fixed primary HEAD first, require its generation-plan hash to equal the caller's narrowing constraint, then derive immutable INFO from that primary hash to recover the server capsule. Never select arbitrary INFO from the caller. Verify its exact schema, capsule size/hash and stored execution metadata. Then reuse the complete existing generation observer to check HEAD, INFO/CONTROL and bounded full lineage/scan consistency. Require current HEAD armed, within its original window, stored durable_object context, stored source equal compiled source and stored UUID equal native AFW_QA_VERSION. Reuse createPrivateQaExecutionPin before accepting.

One original wall+monotonic lease (<=5s) covers bootstrap lookup AND the full observer. Abort/late results or identity changes never extend it. No storage put/delete, network, provider token, D1, callbacks, ARM or effect authority. Return primitive JSON<=2048bytes; metadata flags authorizesEffects/guardLivenessVerified/operationalReadiness/mayRetry remain false. Blocked responses reveal no capsule/grant/rows/error text. Missing metadata or nominal payloads remain closed. Historical observation remains in the existing library; this named-facing RPC only resolves the current armed generation.

## Hash domains

expectedGenerationPlanHash narrows the domain-separated generation capsule hash, NOT the named Workflow payload planHash (SHA256 of nominal bundle JSON). The capsule bundleHash links those identities in the future complete server capsule; never treat them as interchangeable.

## Limits

An internal hash and stored/native UUID agreement are coherence checks, not independent source provenance or authorization. Root still must correlate actual module/config/bindings before ARM; a complete fixed capsule must bind nominal bundle/policy/history, and primary grant/reservation fences plus cleanup/finalizer remain separate. The nominal Workflow continues its existing closed diagnostic only in this increment. No new binding or route is introduced.

## Verification

RED/GREEN unit tests cover strict input, canonical primary capsule, current/foreign identity, absent/pending/withdrawn/expired/foreign HEAD, corruption/orphans, original deadline, hung bootstrap/observer, late results and env/storage mutation. Real workerd test invokes the actual IndependentClosure RPC, seeds only synthetic native storage via test subclass, preserves history, returns JSON metadata, rejects foreign actor/version and proves zero outbound. Existing closed Workflow/build and generation/native suites remain green. CI/source evidence does not establish remote mounting or PC-off.
