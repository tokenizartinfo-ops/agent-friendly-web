# Private closure publisher qualification

29 October 2026. AFW only; source preparation, not live authority.

## Problem and choice
The owner-supplied publisher secret is preserved opaquely in inactive QA version9cb37f06. Storage and token metadata do not prove the private host can issue its closing deployment. The real successor restorer correctly requires retired permissions and physical stop; fabricating that handoff for a credential check would weaken the contract.

Add a distinct finite qualification mode to the existing private QA Workflow/DO. It reselects exactly the already-active CLOSED canary version at100%, which creates a real deployment record but changes no source, configuration or permission. Reuse the bounded reader implementation rather than introduce a second HTTP stack. The existing seven-GET reader retains its exact read-only operation and outputs; publisher mode has distinct policy, enable flag, journal prefix, Workflow/RPC names and receipt purpose.

## Contract
- Inputs: only canonical policy hash. Server policy operation qualify_closure_publisher; startAt/expiresAt maximum10minutes and exact canary/operator version, deployment, module and configuration pins. Flag AFW_MCP_PUBLISHER_PROBE_ENABLED defaults absent/false; policy AFW_MCP_PUBLISHER_PROBE_POLICY absent/empty. Secrets are existing AFW_MCP_CLOSURE_READ_TOKEN and AFW_MCP_CLOSURE_PUBLISH_TOKEN.
- Fixed QA actor afw-own-successor-closure-v1. No arbitrary URL, account, Worker, method, version, headers or caller credentials.
- Original30second wall+monotonic deadline, child5seconds, manual redirects, no cache, bounded4MiB responses; fresh flag/policy/key/actor/storage checks after awaits.
- Durable intent committed before network work; at most one POST per hash across concurrency/recreation/ACK loss. No retry or forced deployment. Replay yields historical/uncertain without HTTP or renewed timestamps.
- Before POST: existing seven snapshots match; canary/operator cron and tails empty; re-read selected canary deployment to detect drift. Any mismatch aborts write. Initial code/config closed validation includes all enabled flagsfalse and exact immutable pins.
- POST only fixed canary deployments, same closed version100%, unique annotation AFW closed publisher qualification <hash>. This is a real mutation even though source/config stay unchanged.
- Qualification requires acknowledged new UUID distinct from baseline, matching annotation and selection, then independent primary deployment readback with that UUID/annotation/version, immutable version fingerprint and empty active Containers. Lost ACK or inconclusive readback stays uncertain and never resends. External read-only reconciliation may inspect records later; this probe does not convert uncertainty into authority.
- Sanitized receipt: distinct purpose; qualified/blocked/uncertain/historical; original observedAt, observations and selectedDeploymentId; observedSnapshotOnly=false, mayRetry=false, operationalReadiness=false. No body, key, header, project answers or raw provider error.
- Native Workflow uses one retry0 step and primitive JSON RPC; public HTTP remains404. No successor, grant, OAuth, Container start/stop, alarm, cadence or Max access.

## Remote release boundary
PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT private QA; ORIGIN Cloudflare control plane; RESOURCE_TYPE existing Worker/Workflow; RESOURCE_ID agent-friendly-web-independent-closure-qa and afw-own-qa-private-bootstrap. ALLOWED_ACTION in this branch: source/tests/docs/CI only. ROLLBACK: unchanged main0ff199f and activeQA1eb/a777; no runtime change from merging. A separately recorded dated operation will pin fresh baselines and mount source closed before any finite qualification. Publisher key inherited opaquely from9cb; never c938 (unwanted Container attachment) or0c044 (invalid marker).

The deployment API has no atomic compare-and-swap: last read narrows drift but cannot exclude a concurrent external administrator. Operate under exclusive AFW mutation coordination, abort on observed drift, preserve unique receipt. No force or claim of transactional provider rollback.
