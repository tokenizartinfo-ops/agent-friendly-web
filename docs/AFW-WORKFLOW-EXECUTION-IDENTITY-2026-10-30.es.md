# AFW · Workflow execution identity diagnostic — 30 October 2026

Status: closed diagnostic; operationalReadiness=false. Source baseline96b8896b3f543ca53c9576fc3c741bdecdbaa545 (tree5403e051458a4ed005b342db9b266c88d5965e62). No product/runtime change authorized by this receipt alone.

## Evidence and its limit

The real synthetic trial7305 ended with named confirmation19fc blocked before step0. Its exact immutable bundle and plan hash validated independently after closure. Guardd56 automatically revoked the reading and monitoring grants at16:41UTC; the guard’s dispatch result was uncertain, event count was0 and successor reservation count was0. No receiver subscription/task was created. The guard was subsequently withdrawn, preserving its record and dispatch history. These are separate outcomes; neither native unsubscribe, physical process stop nor PC-off was demonstrated.

The operational sequence had selected the finite named operator3730, declared Workflow8113, and restored closed operator855 BEFORE starting named confirmation. The pure bundle check cannot establish which module/bindings the Workflow actually used. Public Workflow version metadata does not expose a Worker version pin.

A finite two-instance, no-effect characterization tested the module assumption. Source template and protocol were registered before effects in issue497#6528314093. The first comparison deadline elapsed during continuity before the second instance existed; closure was recorded in6528483840. The expired comparison amendment6528532804 retained the original payload deadline and second-instance budget, adding a new administrative closure deadline. Independent review accepted the revised classification and bound.

| Record | A control | Expired B comparison |
| --- | --- | --- |
| Worker version selected |8fc3417f-2a34-4f4c-b1e1-708c1307c0a7|761056f3-f277-4293-a0d3-fa0857d642ec|
| SHA256 / bytes |47a98d6de1abdd8275d018f42c93a0fd17afae73f50b999fa3d2b5a574cf9aef /1332|833c781444843457f28781c6543efe99a506f3a23ed07baaedb41fa31ab3995d /1332|
| Instance |afw-version-probe-a-0f110c2c67c10b0b0a43d739|afw-version-probe-b-0f110c2c67c10b0b0a43d739|
| Start / end UTC |16:53:42.185 /16:53:42.255|17:02:06.146 /17:02:06.218|
| API instance versionId |f96fb3c2-f1fc-4ea2-853e-1a31162ad51c|f96fb3c2-f1fc-4ea2-853e-1a31162ad51c|
| Literal output |observed, sourceMarkerA, bindingMarkerA, operatorEnabledfalse, workflowEnabledfalse|blocked, sourceMarkerB|
| Steps / final state |0 / complete|0 / complete|

Before B, A was selected and Workflow65087eac declared; B was then selected WITHOUT redeclaring the Workflow. The B source retained the original notAfter16:57:50.183UTC, already expired; it returned before reading this.env. Both modules had no outgoing fetch, D1, RPC, Container, OAuth, save or event operation. HTTP was always404; existing release flags remainedfalse. No new credentials, permissions or human window were used.

**Established:** the returned Workflow versionId alone did not freeze the executed module. The new instance ran sourceB after the Worker selection changed.
**Not established:** B's runtime bindings, global platform semantics for every workflow, or the sole cause of the real named-confirmation rejection. A generic blocked result would have been inconclusive; the positive B marker is the evidence.

## Verified closure

17:02:21UTC: restore exact operator855dc5c1-e757-49aa-a6f5-cb02f8d03ea4 at100%, deployment979026f8-9be0-439e-86d5-8bc493217f41; closed Workflow definition31a5cbd4-1ab1-4ac2-8ba9-592016682b40.
17:02:41UTC primary readback:

- Operator module31f28ee68c870450c6b814fa3713f02ad7233500552157915a7bd2e928777b51,1971922bytes,7bindings,3flagsfalse.
- Canary2607abae/module315cc3b3,1830202bytes,29bindings,8flagsfalse; deployment7b5a3683 unchanged.
- QA78af4f79/modulea7d40b81,462861bytes,20bindings,6flagsfalse; deploymentceaf7251 unchanged.
- All three cron/tail inventories empty; own Container active instances empty.
- Full paginated administrative Workflow list12/12 and QA list6/6 terminal; no deletion/reset or restart.
- Administrative comparison started17:01:55.808UTC and closed before17:06:55.808UTC; payload deadline was never renewed.

During the closure of A, the first restore-definition PUT was rejected400 because concurrency was scalar. Schema correction to concurrency:{limit:1} succeeded; no instance/effect was retried. This is not a provider incident or credential failure.

## Consequences for the next preparation

Do not repeat19fc/d56 or accepted closed publication75ae. Do not use an old human consent, reset the singleton reservation, rename the actor or delete the withdrawn guard record. Do not infer readiness from CI or WorkflowversionId.

The current code requires both an exact closed operator deployment/hash/config in guard dispatch/reduction/restoration and an executable finite named operator for confirmation. Restoring the closed version creates a NEW deployment UUID and cannot preserve the earlier deployment pin. The lifecycle must make these phases explicit before another human test. The fixed guard control also needs a reviewed, history-preserving continuation contract; a withdrawn prior record is not an empty slot.

Primary cloud evidence: [trial closure](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6528223100), [A closure](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6528483840), [expired amendment](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6528532804), [A/B result](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6528565955).

References: [Workers versions/deployments](https://developers.cloudflare.com/workers/versions-and-deployments/), [rollbacks create new deployments](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/), [Workflow API](https://developers.cloudflare.com/api/resources/workflows/). Native results above are the source for this specific behavior; documentation is not treated as a missing provenance guarantee.
