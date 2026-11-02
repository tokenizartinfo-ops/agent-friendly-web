# Finite native RPC boundary preflight — 2 November 2026

Readonly integration inspection by /root/review_initial_native_entry at ae7afdb8820b509f761ac026d311f9c39ed8b0db after accepted B1. No writes, tests, provider calls or C3 review. Existing native fixtures inspected, not rerun or represented as fresh passing evidence.

## Result

No demonstrable disposer/parser mismatch in the concrete fixed-RPC consumers inspected. Cloudflare system-adds a disposer to object RPC results. Client Symbol.dispose is synchronous and does NOT prove server settlement: https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/#disposing-rpc-objects-disposes-stubs-that-are-part-of-that-object .

| Boundary | Actual parser | Existing qualification / limitation |
|---|---|---|
| Gate beginFiniteTrialReservation/settleFiniteTrialReservation, admission-gate107–110 | Raw envelope returned without disposal. successor-reservation31,35 reads status; only nested claim reaches strict exact at gate119. No demonstrated top-level symbol rejection. | Gate tests local; cleanup-native30–44,56 uses fixture→Response.json, not this client. |
| observeRetiredReceipt, release-successor-reservation39 | Local value box→readRetiredRpcReceipt descriptor normalizer accepts ONLY documented disposer and disposes finally; retired-rpc-receipt12–28 / retired-rpc-observation8–31. | Actual Worker→DO fixture and native lifecycle/invalid-result disposal inspected at retired-rpc-receipt-native32–36,48–74. |
| prepare/readFiniteNominalLaunch/createFiniteNominalChild, finite-launcher26,29,44 | metadata8 structuredClone then dispose before strict fields/record/data. Compatible factual DTO boundary. | finite-launcher-native12–41,49–64 exercises native RPC/class/binding; source facts/scheduling controls SYN. Do not infer live engine delivery from this inspection. |
| previewFiniteTrialMaterial, finite-observer37 | metadata12 clone/dispose→validatePreview/finiteData/finiteFields19. Compatible. | finite-observer-native32–34,70–79 native RPC fixture, preview producer explicitly SYN. |
| CleanupProofHead/RetainedCleanupProof/CleanupCompletion/claimQaRestore/FinalPrimary, observer47–59 | Every result metadata-normalized before status/claim/data checks. Compatible. | Same observer fixture, actual claim journal/D1, external source facts SYN. |
| setupFinitePrivatePolicy, policy-setup135–144 | Actor result cloned/disposed140 before fields/codec144. Compatible. | finite-policy-setup-worker57,69–76 actual Worker→DO; event/step/source qualification SYN. |

## Owning integration limits

Reservation client's undisposed raw envelope is lifecycle maintenance, not a demonstrated parser failure/capability leak. Defer to integration/final review; don't introduce a permissive shared parser or claim physical drain.

cleanup-collector12–16 strictly fields() nativeProof.ready()/observe() callback results without normalization, but production fixed-RPC mount was NOT established. Future fixed adapter forwarding raw readFiniteTrialCleanupReadiness/observeFiniteTrialCleanup must handle the native boundary; current JSON test bypasses this collector. This is an owning future adapter test requirement, not a currently mounted transport defect.

Confirmation/launch/adoption/source-authority seams inspected remain unavailable constructors, not demonstrated RPC consumers. Their future wiring is unqualified. No additional product fix or trial is justified solely by this read-only inspection.

operationalReadiness=false; completePackage=false; PCoff=false.
