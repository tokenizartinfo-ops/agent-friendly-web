# Successor retirement handoff design

## Intent and scope
Prepare the durable, private handoff needed by a future independent cloud administrative-restoration controller. The original successor's retirement RPC depends on its live event/successor configuration. Restoring the closed canary removes that context; the controller must capture the verified historical retirement before that restoration and subsequently recheck the same stopped provider instance without invoking the retired RPC.

This deliverable is source/CI only: one library and focused unit/native-storage tests. It does NOT restore deployments, withdraw permissions, stop processes, grant authority, register a host, bind storage, create a namespace, or activate a runtime. operationalReadiness remains false.

## Approaches and ruling
1. Call the original RPC after restoring the canary: rejected because the closed baseline preserves predecessor context, not the successor's temporary policy.
2. Keep the live canary indefinitely: rejected because the controller must prove a closed final administration.
3. Capture a write-once retirement record in independent private Durable Object storage, then surround two fixed provider reads with two storage reads: selected by the implementer under Gabriel's standing delegation. This separates historical custody from fresh physical observation; neither is permission to restore.

Existing assistance-independent-closure QA state belongs to another preparation flow and must not be repurposed. This module is unmounted, ready for a future separate private host.

## Contract
Export createSuccessorRetirementHandoff({storage, original, readCustody, readInstance, now=Date.now, timeoutMs=5000}). storage.transaction is server-owned private DO storage. original has exactly containerId, applicationId, programHash, sourceRevision; applicationId must equal RELEASE_TARGET.namespaceId. readCustody and readInstance are the same trusted, fixed primary callbacks used by createRetirementEvidenceReader. Caller-provided JSON is not custody provenance.

capture() first checks an existing record and never replaces it. For a new record it uses the actual createRetirementEvidenceReader (two custody reads around two primary provider reads) and records a bounded projection of the provider identity, image, started_at, stopped state, exit code and stopped timestamp. The returned reader evidence must agree with that provider projection. A single storage transaction writes the original evidence and instance. Concurrent identical captures can observe the existing record; different identity/generation/stop/start/closed times cannot replace it. Lost storage acknowledgement is uncertain and never automatically retries a write.

observe() does not call readCustody. It reads the original record, reads the exact same provider instance twice, then reads the original record again. It rejects missing/corrupt/reconfigured storage, changed starts/stops/image, live/foreign processes, getters/extra fields in stored DTOs, future timestamps and drift during awaits. The historical evidence may be older than thirty seconds: it remains explicitly dated. Fresh provider observations do not renew consent, permission or historical authority.

The only storage key is afw.successor-retirement-handoff.v1. Records are exact-schema plain JSON with copied/frozen nested projections. No token, policy, grant subject, arbitrary provider body, headers or raw error is stored/returned. No reset, delete or overwrite API is exported.

Each invocation has one original monotonic deadline <=5000ms including storage, primary reads and verification. Wall clock must never regress; timers abort callbacks through the supplied signal. Late readers cannot cause a write after expiry. A storage commit or external callback already in flight cannot be represented as cancelled; uncertainty stays explicit. Separate observe invocations are read-only and never extend the historical record.

## Results and authority
capture returns status recorded/already_recorded/blocked/uncertain, dated original capture information only. observe returns status retired_handoff_observed with the exact candidate, generation, original capturedAt, fresh observedAt, physicalStopVerified true, mayStartSuccessor false, mayRestoreAdministration false, operationalReadiness false. Failure never returns a positive physical-stop assertion. The future controller still needs its own finite authorization, fixed deployment/version/module/config pins, durable issued-before-effect journal and independent readback. This module never emits a dispatch permit.

## Validation and limits
RED before implementation, complete npm test/lint/build in GitHub Actions, plus actual Miniflare/workerd DO transaction/storage recreation acceptance. Synthetic provider/custody fixtures are not real Cloudflare permission/Container/D1 evidence. Fresh reviewer for the completed branch; fix material findings with RED/GREEN. No local dependencies, build or archive.

Physical proof and both application revocations are established by the trusted original custody path, not by accepting an arbitrary boolean. This layer preserves that qualified observation; platform native unsubscribe and administrative restoration remain separate pending gates.
