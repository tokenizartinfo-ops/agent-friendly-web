# Shared finite release runtime — design

Decision30oct2026, source baseline96b8896b. Owner delegated implementation choices and continuous cloud-first work. This first increment extracts execution logic without changing authority or deploying it.

## Why

Native evidence in AFW-WORKFLOW-EXECUTION-IDENTITY-2026-10-30.es.md invalidates treating Workflow.versionId as an executable module pin. The current guard requires exact closed operator855 while named confirmation requires an operative module. Reordering the existing steps cannot satisfy both contracts or restore the original deployment UUID.

Recommended eventual integration: a separate named-confirmation Workflow class in the existing finite QA host, keeping the operator and its exact closed deployment stable. It reuses the existing read credential, uses a minimal server-owned capability adapter and adds an explicitly approved/pinned canary D1 binding separately from AFW_QA_DB. Guard and confirmator remain independent of the canary, but share QA deployment/failure domain; do not describe them as isolated from each other.

Alternatives considered: exact finite-operator profile plus final operator rollback adds guard profiles, another journal/POST and potentially edit custody; a dedicated executor adds a Worker and custodies. The QA class avoids both, subject to native tests, module-size qualification and compatible closed rollback. No such class/binding/permission is added by this extraction.

## This increment

Create lib/mcp-release-runtime.mjs with no Cloudflare classes or ambient bundle global. Move existing namedObservation and execution implementation intact, parameterizing bundle explicitly:

- runReleaseOperator(bundle, env, args, lease?, observation?) -> Promise of the existing bounded result.
- runReleaseWorkflow({bundle,env,event,step}) -> Promise of the existing Workflow outcome.

worker/mcp-release/index.mjs keeps its unique build-time bundle token, closed HTTP404, public class names, observation-mode dispatch and existing RPC signatures. Its wrappers pass the internal bundle to the runtime. Shared execution uses only the explicitly selected bundle; an ambient foreign bundle is not a fallback.

Preserve current parsers, flags, payload/instance identity, expiry/monotonic lease, SQL predicates, budget1, provider checks, effect order, unknown-ACK behavior and result field grammar. No new options, transport, capability, public endpoint, callback or secret lookup. Preserve template build token exactly once.

## Verification and later gates

A native Miniflare fixture invokes the shared helper from a different Workflow class with an explicit bundle and no trusted ambient global. Require a real local D1 journal/receipt for one synthetic publication, no extra effect on restart, and no reads/writes for closed/expired/foreign payload cases. Existing release Workflow, reservation and publication tests must remain green; full cloud CI, lint and build follow.

This is NOT the QA integration or a fix for the consumed guard. Before another human window: reviewed QA-only confirm_named wrapper, deferred minimal capability adapter, guard armed fence across awaits, additive history-preserving generation with reconciliation of uncertain effects, passive inventory of the new named Workflow, qualified artifact size and compatible rollback, closed cloud module/binding provenance, then one fresh human consent. Do not replay19fc/d56 or delete/rename/reset fixed actor/history. operationalReadiness=false.
