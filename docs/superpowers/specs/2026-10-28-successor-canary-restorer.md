# Fixed canary restoration coordinator design

## Intent
Prepare the administrative restoration core needed after the original successor has been retired and its qualified handoff durably recorded. Restore only the fixed AFW canary to one approved, already-existing closed version, while the ordinary release operator remains on its separately pinned closed version. No self-redeployment or cross-Worker secret inheritance is assumed.

Scope is source and CI only. No production importer, host, credential, namespace, alarm, deployment, grant, reservation or trial is installed by this change. Native unsubscribe, application withdrawal, actor stop, closed fallback for unknown retirement and actual hosting remain separate gates. This core never increases access or starts a successor, and never claims operational readiness.

## Approach and rulings
A dual-Worker restorer would need broader editing authority and self-deployment reasoning. A PC-local finalizer cannot establish PC-off independence. Choose a detached canary-only coordinator: the operator must already be independently restored closed before this final phase. This is the implementer's decision under Gabriel's standing delegation.
Use a remote isolated Git branch/Actions, not a new local worktree/dependency/build. Source base98cabbf6; source rollback is revert of the carrying PR. Existing runtime and records remain untouched.

## Interfaces and private authority
Export createSuccessorCanaryRestorer({storage,namespace,readControl,readHandoff,request,now=Date.now,timeoutMs=30000}). advance() accepts no caller arguments. All dependencies are trusted server-owned capabilities, never public JSON. readControl() synchronously returns exactly {enabled,policy}; enabled must be true and policy a bounded canonical JSON string. A false control returns blocked before storage, namespace, handoff or provider access.

Policy shape: {operation:'restore_canary',startAt,expiresAt,candidate,live,closed,operator}. Original window is at most ten minutes. candidate has exactly containerId,applicationId,programHash,sourceRevision. application is RELEASE_TARGET.namespaceId; the real private namespace must resolve afw-own-event-first-successor-v1 to exactly that containerId and round-trip idFromString. live has versionId,deploymentId,configurationHash. closed has versionId,moduleHash,moduleBytes,configurationHash. operator has the same closed fields plus deploymentId. All IDs/hashes/byte bounds are strict; live version differs from closed version.

readHandoff({signal}) must call the actual private PR628 observe path, not accept an external assertion. Its exact status/candidate/generation/original dates/physicalStopVerified are validated, original capturedAt is never renewed, and each returned observedAt must be current (<=5000ms). A stable proof hash excluding only fresh observedAt binds the issued and completed journal entries. mayRestoreAdministration=false from the handoff remains intact: the separate finite private control, not that DTO, authorizes this single restoration.

request receives only fixed Cloudflare account/resource paths and exact request specs, with cancellation signal. A future authenticated fixed-origin, bounded, no-cache/no-redirect transport must implement it. It is not mounted here. Provider responses are untrusted mutable JSON: snapshot data descriptors deeply before asynchronous boundaries. Never log/store version bodies, bindings, credentials, provider errors or control policy.

## Primary qualification
Read exact selected canary/operator deployment pointers. GET exact live, prepared closed and operator version metadata including modules. Verify module bytes/SHA256, supported private own-canary execution attachment, exact expected configuration fingerprint, empty preview URLs, fixed DB/KV/DO resources and no secret values. Closed canary has29bindings/eight false AFW flags including six required consumer/OAuth flags; operator has seven bindings/three exact false ordinary flags, original D1/DO and no KV/Containers. Live and closed canary share the approved compiled module; configuration differs by the finite trial only.

Export restorationConfigurationHash(metadata) for preparing reviewed policy pins. It hashes 'afw.canary-restoration-configuration.v1\\n' plus canonical JSON of the present configuration keys compatibility_date,compatibility_flags,main_module,containers,exports,limits,placement,usage_model,cache_options,assets,package_dependencies and bindings sorted by name. Secret bindings contain name/type only. This hash is a fingerprint, not approval.

Inspect both scripts' schedules/tails, fixed administrative Workflow ID/class/script, a complete bounded page of terminal instances, and the original Container application's empty active-instance result. Missing/ambiguous pagination fails closed. These are dated observations, not an atomic multi-resource snapshot.

## Durable effect protocol
Storage key afw.successor-canary-restoration.v1 contains exact {purpose,planHash,phase,proofHash,issuedAt,deploymentId,completedAt}. No row means no previous effect. After qualification and a second stable fresh handoff, atomically write phase issued BEFORE dispatching the single deployment POST. If another invocation or row exists, do not issue a competing effect. Recheck exact selected pointers and handoff after the claim, then issue only:
POST /accounts/<fixed>/workers/scripts/agent-friendly-web-delegated-canary/deployments
{strategy:'percentage',versions:[{version_id:<approved closed>,percentage:100}],annotations:{'workers/message':<fixed-purpose plan hash>}}.

Validate ACK's generated deployment ID and independently re-read selected pointers, exact closed module/configuration, unchanged closed operator, passive resources and same handoff before journaling complete. A complete row allows only fresh read-only re-observation of those exact pointers. An issued row is permanently uncertain for this API: it may observe the closed pointer but never repeats the POST or upgrades the row automatically. No reset/delete/reconfigure API exists. Unknown storage ACK before dispatch emits no POST; unknown provider ACK and late results preserve issued uncertainty. Unknown final journal ACK can later be resolved by reading an already-complete record without another provider write.

No CAS is offered by deployment POST. An exclusive approved window and immediate before/after pointer checks are required; concurrent third-party writes cannot be described as prevented atomically.

## Time and results
One original administrative lease <=30000ms, capped by the original absolute policy expiry, covers all awaits/crypto/storage/reads/write/readback. Wall and monotonic clocks cannot regress; control string is rechecked at every boundary. Fresh handoff reads retain their independent PR628 <=5000ms lease. This longer metadata-only administrative lease does not extend OAuth/monitoring consent. Timer and signal do not prove cancellation of an already-issued provider/storage effect. Final continuation must recheck time.
Statuses blocked/uncertain/closed_observed_uncertain/restored_observed; every outcome has mayRetry=false,mayStartSuccessor=false,nativeWithdrawalVerified=false,operationalReadiness=false. A restoration receipt is not native unsubscribe or PC-off proof.

## Validation
Behavioral RED before implementation. Actual fixed API request/body/selection behavior tested against controlled primary envelopes, all failure paths asserting no repeated writes. Native workerd/DO storage qualifies concurrency, instance recreation, committed storage ACK loss and provider ACK loss with synthetic authority/provider metadata. It does not prove real authorization, provider deployment, original D1/Container retirement, human consent or PC-off. Full npm test/lint/build in Actions; one fresh whole-branch review, material findings RED/GREEN, minor findings recorded.
