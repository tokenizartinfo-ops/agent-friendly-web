# Private named packet mounted diagnostic — 2026-10-31

Project AFW; source-only preparation. Baseline main 5d05e877b6bb6dbd32891869ba4477de7d69b27d.

## Scope and acceptance
Mount a dedicated metadata-only `observe_named_packet` operation in PrivateQaNamedConfirmation and a fixed-actor `readOwnQaNamedPacket(namedBundleHash)` RPC. Its Workflow ID is `afw-qa-named-preflight-` plus that bundle hash. Existing closed-context diagnostics remain unchanged; nominal `{planHash}` remains unavailable. This is an ARMED-generation diagnostic, never a before-ARM readiness certificate.

Only a trusted build-time artifact/receipt context can supply code. A missing context blocks before storage/D1/network. Caller inputs carry one hash, no code, policy, authority or runtime identity. Read primary HEAD then INFO; correlate bundle hash to the capsule; use the existing complete generation resolver; read the immutable isolated QA_DB packet; semantically assemble; revalidate the current generation and original capsule. One original at-most-five-second wall and monotonic lease covers the whole chain, including settlement. No writes, provider, credential or dossier reads. The assembler only resolves fixed node IDs, never node.get.

Accept exact closed14false or prepared-idle3true/other11false profiles; all seven legacy policy values empty. Profile names describe configuration only. Native UUID, source, namespace, storage and binding identities remain pinned. A prepared profile does not make the legacy closed-context diagnostic report closed.

Return <=2048 bytes of fixed metadata and commitments, all authority, guard-liveness, readiness and retry fields false. No raw packet, grant, policy, script or history through RPC or Workflow results. Tests must exercise invalid/crossed hashes, mutation after awaits, withdrawal and deadline races, native actual classes with synthetic isolated D1 and no outbound. Synthetic fixtures prove coherence, not frozen315 provenance.

## Follow-on build gate
A separate explicit QA artifact context build will verify the exact frozen315 receipt and source before/after, retain original JSON order and use a dedicated <=3MiB combined QA cap. Existing 1MiB closed-context and public/legacy caps remain unchanged. No production artifact context or remote publication is authorized by this diagnostic commit. No schema install, ARM, grant, reservation, nominal instance, consumer or first-successor budget is spent.

## Verification and recovery
Cloud CI only, no local install/build. Preserve current closed module/configuration and finite qualified external recovery. Merge only after focused/native/package/full CI and independent review. Source rollback is reverting the isolated commit; runtime is untouched. operationalReadiness=false.
