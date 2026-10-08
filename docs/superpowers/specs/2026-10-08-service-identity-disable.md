# Exact service identity disable action

AFW internal preparation on a521a3a. Standing owner authorization covers native implementation and review; no new access, credential, deployment or customer action.

Prepare a server-only capability that can PUT only `{enabled:false,name:<primary approved name>}` to one exclusively owned QA Access service token after a fixed occurrence deadline. It must never send duration, rotation, previous-secret expiry, settings or policy fields. The trusted transport and administrative custody remain separate gates; this module does not grant either.

Pin account, token UUID, occurrence, baseline reference, deadline and a digest of stable primary token metadata. Stable metadata excludes enabled and observational updated/last-seen timestamps; all other fields, including versions/expiry/client identity, remain in the digest. Finite token metadata is required and credential-bearing GET results rejected. A changed input, clock regression, malformed result or digest mismatch denies writes. Recheck immediately before PUT after all asynchronous work.

Reserve a local issued fence synchronously before dispatch. No retry after uncertain PUT; reconstructing this adapter requires the coordinator's persistent issued fence and must not authorize a second PUT. Primary GET after successful PUT must establish disabled and unchanged metadata. Lost acknowledgements are reconciled through a separate GET-only method. A disabled result proves only the identity state, never complete administrative restoration, policy rollback or PC-off.

No shared-resource mutation. A disposable disabled-to-disabled provider trial on8oct observed that omitted name is replaced while duration/expiry/version are retained; the QA token was deleted and primary absence verified. Preserve the name from the validated primary snapshot and require a trusted server exclusiveQa:true declaration. This is not provider CAS or proof of exclusivity: the future approval catalog must establish it. The corrected body and active-to-disabled effect still need their own disposable trial before hosted use.
