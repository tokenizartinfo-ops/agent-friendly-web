# C2 narrow Source diagnosis — candidate selectors and monitoring/policy hashes

14 November 2026. Repo tokenizartinfo-ops/agent-friendly-web. Current closed Source supplied by root: cfa6c0edf1725767f57933b9155f8fbf01e0e78f. Its lib directory was read as public Source DATA and confirms the production blob identities below; those blobs remain equal to the previously examined 8b1e2f production. Prior accepted report: 0c3ce18b3765bf1ed5148c9e846c2fe2e67931ef, preserved by Rootdocs 43cbd631/map da53950f.

Static technical provenance only, held in RAM. No code evaluation/import/execution/tests/dependencies/local Source, refs/runs/custody/CF/owner/runtime operations, implementation or capabilities. One unattached Markdown blob is the only persistence. No 24-field inventory or launcher redesign follows.

## Conclusion

selectors.programHash/sourceRevision must identify the CURRENT finite successor CANDIDATE: artifact a.programHash/a.sourceRevision, independently qualified against actual compiled Node program and successor manifest. They must NOT be copied from ownerPreparation.programContext, which deliberately records HISTORICAL o.original. Neither revision equality nor program-hash equality between those two identities may be assumed.

monitorHash can coherently reuse the existing hashFiniteOwnerEvidence('event', exact semantic projection of the original monitoring SQL grant row), already carried as NoticeLink.eventHash and ownerPreparation.connection.noticesHash. eventPlanHash can be defined as plain SHA256 of the exact installed AFW_DOSSIER_EVENTS_POLICY UTF-8 string; this remains a source projection rule to enforce because the inspected plan consumer checks hex only. withdrawalPolicyHash already has an explicit raw-policy SHA256 consumer and must use the exact installed withdrawal string.

A separate, concrete finite-contract contradiction must be resolved before a positive C2 producer: setup creates the narrow event/candidate interval T0/N1, actual native consumers equate selectors times to that interval, but the finite reducer demands the original monitoring authorization be contained INSIDE it. Original consent intentionally predates/outlives that event interval. The smallest coherent correction option is to KEEP candidate+T0/N1 selectors and all deadlines, and replace the incorrect authorization containment with exact original-row/hash linkage plus qualified authorization coverage/current-state checks. This is a design option requiring scoped contract review, NOT authorization to change code or remove guards.

## Exact evidence pins

All references below name exact blob + one-based lines through these aliases.

| Key | Source path | Blob |
| --- | --- | --- |
| IM | lib/mcp-qa-finite-initial-material.mjs | 8e2d3e4a75baabf1be5d12b6e2868ffc16599f78 |
| CR | lib/mcp-qa-finite-candidate-residency.mjs | 29373312a0e60ed6ca87ca3952dba751186662a8 |
| PH | lib/mcp-qa-finite-owner-phase-context.mjs | 7eb8f28760de60f143e487eeb6988705059a0a44 |
| OP | lib/mcp-qa-finite-owner-preparation.mjs | 152e730f83af7ef063b6b1db89f8b0a779c2b60e |
| PR | lib/mcp-qa-finite-preparation-records.mjs | e9b66f68b6dbabbfecc46072949a0d5d9f059141 |
| SET | lib/mcp-qa-finite-policy-setup.mjs | 34285e7c8ee3d9838763344edba2dcf6ce33da9b |
| PT | lib/mcp-qa-finite-policy-transport.mjs | fa1cb012d65acc0457f7263d01bb5fd88a0cb8a6 |
| SM | lib/mcp-successor-manifest.mjs | a5a70c51297e3675df60d80ec27790fd9fc42551 |
| RP | lib/mcp-release-operator-policy.mjs | 20518baf5f3ee05942ed56c8d5fab3fbe2f53976 |
| RT | lib/mcp-release-runtime.mjs | 585dcbda7d5403e1ddb37d697457cc0899e0d03b |
| CF | lib/mcp-qa-finite-confirmation.mjs | 530cbc2e1051431f07764ae7718c293982a66af2 |
| NP | lib/mcp-own-finite-primary.mjs | 7fa32e90ca6d47a75571cd64f8b199be330219df |
| SH | lib/mcp-own-successor-host.mjs | 54e621e4c87139d780f3fb2ac132c06b2f4446a6 |
| RED | lib/mcp-own-finite-reduction.mjs | 6ce7798ece537f41823c17186336b6f8ac08d90f |
| CH | lib/mcp-own-finite-cleanup-host.mjs | b77bba634c999e7a8a7d02aae8d81a4627ff5f4b |
| PF | lib/mcp-own-finite-cleanup-proof.mjs | 59f633d8dcdbfe508719a3530ccb52572396e0b3 |
| CP | lib/mcp-finite-cleanup-policy.mjs | 4c9e5a74715becec9d9e471244978f9f0fc88ce3 |
| CTL | lib/mcp-qa-finite-trial-control.mjs | 18996dc32972e3e33726b242e508d9635147a7e5 |
| EXT | lib/mcp-qa-finite-external-contract.mjs | ec405e82e29d99ec1c6311f894eba18c5a48e2c4 |
| MA | lib/dossier-monitoring-authority.mjs | 703b9d3cbb04bc5effff3f4ef8276cdb4cb95803 |
| EA | lib/dossier-event-rpc-authority.mjs | a8239dc554382d4df6b6d3c3cd0a5b345c2a1184 |
| ED | lib/dossier-event-policy-data.mjs | b984f9221272ff7554887c59a8ab7561cce28cae |
| WP | lib/mcp-own-permission-withdrawal-policy.mjs | eebc22f4232ad9caf2601ecb823fdfd233fb3e8c |
| WR | lib/mcp-own-permission-withdrawal.mjs | c0e3551c983e42104e6f2706a58fdc27bf746033 |
| WH | lib/mcp-own-permission-withdrawal-host.mjs | 5f3f950d008bc03b41ec3452e16333e33cf8afc5 |
| AG | lib/mcp-own-finite-admission-gate.mjs | d782a4cbc5b11b3c2009eb318a19e06430b28873 |

## Program lineage: exact producer → consumer chain

| Identity/boundary | Existing fact | Semantic consequence |
| --- | --- | --- |
| Historical predecessor | IM 65–79 obtains manifest.original and validates historical admission/container/program/revision. It constructs originalContext with BOTH current artifact and historical original. PH 230–232 sets programContext.programHash/sourceRevision FROM material.originalContext.original and hashes the whole originalContext. OP 435 carries that source programContext unchanged into preparation. | ownerPreparation.programContext's pair is the HISTORICAL predecessor, while its originalContextHash commits the larger context containing both identities. Current sourceRevision elsewhere in preparation does not rewrite this historical pair. |
| Current compiled candidate | CR 8,19–29 requires SHA256(actual compiled __AFW_NODE_PROGRAM__)=resident.programHash, while separately checking actual Worker module bytes/hash and current revision/tree. IM 78–86 constructs current artifact from this candidate. SET 62–65 checks artifact/script/candidate bytes/seed descriptor/current source, then 73 checks o.original against the historical preparation.programContext. | a.programHash is the Node-program hash, NOT a.workerHash or QA moduleHash. The exact original-context join preserves historical identity rather than asserting it equals a. |
| Successor/withdrawal | SET 78–87 constructs candidate from a.programHash/a.sourceRevision with T0/N1, resolves it against separate original, and writes withdrawal for resolved.candidate.containerId with the SAME a pair. SM 13–21 keeps original/candidate separate and derives a DISTINCT candidate actor. | selectors must use the resolved candidate pair and actor. Historical predecessor remains the predecessor in successor/retirement evidence. |
| Known confirmation bundle | PT 119–121 builds confirm_named bundle with current artifact a and ACTUAL installed observation/configuration. RP 30–40 requires manifest.candidate.programHash/sourceRevision=a pair; RP 46–52 resolves it alongside distinct historical original. CF 54–60 validates exact bundle/hash/source/native binding and 63–73 hands its twice-qualified bundle to Known. RT 255–273 builds eligibility with original:first.original AND candidate:resolved.candidate. | Known intentionally consumes BOTH identities. Making selectors historical would not align them; it would disagree with the candidate the confirmed bundle reserves/admits. |
| Actual reservation/admission/process | NP 22–29 checks first-primary reservation/admission/closure program_hash/source_revision against selectors. NP 42–57 hashes actual native program against selectors, checks programSourceRevision, and compares resolved.candidate to selectors. NP 65–72 joins historical predecessor separately from current candidate in the native SQL constraint. SH 24–36 independently verifies current native program/candidate and uses historical original only for predecessor retirement. | This is decisive consumer evidence: selectors pair = current candidate pair. No equality between historical/current pairs is required or justified. |
| Cleanup/proof | RED 13–17 requires actual native program and installed withdrawal policy pair equal selectors. CH 24–26 constructs handoff for the process being retired using selectors; PF 32–33 checks that pair in handoff. CP 12 and EXT 39–42 project selectors pair into cleanup policy/external proofIdentity. | The argument named original in CH's retirement helper means the CURRENT finite process being retired, not originalContext.original. This naming must not collapse the two lineages. |

Minimum projection choice: retain o.original unchanged for historical preparation/audit/Known predecessor; obtain selectors.programHash/sourceRevision from the qualified a/resolved.candidate pair; prove their equality to actual native program and installed successor/withdrawal policies. Assert deliberate unequal historical/current pair fixtures in any later non-consuming contract qualification. A builder must fail closed if it only has historical programContext or cannot qualify current bytes/provenance.

## Hash derivation and domain distinctions

| Plan field | Existing provenance/consumer | Narrow coherent source rule |
| --- | --- | --- |
| monitorHash | OP 347–352 maps original unrevoked SQL monitoring row to exact semantic event. OP 370 records NoticeLink.eventHash; OP 402–405 checks it against the row and grant; OP 435 carries noticesHash. PH 424–440 independently checks NoticeLink against the original SQL row, sequence, issuer/notice ACK chain and exact purpose/scope. PR 144–162 validates the semantic event and hashes domain afw.finite-monitor-consent-event.v1 + newline + JSON.stringify(copied/sorted event). CTL 112–113 and AG 49–52 consume equality with monitorHash, not a different digest scheme. | Reuse PR.hashFiniteOwnerEvidence('event', exact qualified semantic row) and require equality to NoticeLink.eventHash/ownerPreparation.connection.noticesHash. Fields: grantId, projectId, subject, clientId, resource, revision, action, purpose, requestId, sequence, issuedAt, expiresAt. This is NOT hash(raw snake_case row), hash(NoticeLink), an ACK hash, or a newly observed revoke event. Immutable original identity persists when current validity changes. |
| eventPlanHash | SET 82–88 creates the exact events JSON string and places it unchanged in candidate configuration. PT 113–127 verifies actual installed version/pointer/context and records installed receipt/full configuration commitments. CTL 69–70 requires only hex for eventPlanHash; no alternative digest formula is imposed by the inspected finite consumers. EA 14–28/ED 4–12 parse the installed string and ADD resolved containerId for native policy checks. | Define plain SHA256 over the exact installed AFW_DOSSIER_EVENTS_POLICY UTF-8 string derived by SET, after confirming actual installed text equals SetupContext.policies text. Do NOT hash the parsed/enriched native policy (extra containerId), all selectors, entire context, bundle or an independently reserialized equivalent object. The explicit plan assignment remains a producer contract decision, not an already enforced source fact. |
| withdrawalPolicyHash | SET 84–88 creates exact withdrawal JSON, including originalConsent, resolved candidate and C0/C1, and installs it unchanged. RED 14–15 explicitly requires JSON.stringify(parsedPolicy)=raw and SHA256(raw)=plan.withdrawalPolicyHash. WP 12–19 defines exact fields/order. CP 12–16 includes that hash in the existing derived cleanup policy. | Plain SHA256 of that exact installed AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY UTF-8 string is already consumer-proven. Preserve bytes and nested original consent. No domain prefix, normalization, sorted-record hash or hash of only originalConsent. |

Different existing monitoring domain: MA 9,81–83 computes public/private lifecycle permissionRef from SHA256(JSON.stringify(['afw.dossier-monitoring.v1','permission',grantId,sequence,issuedAt,consentExpires])). It is an opaque authorization projection, not monitorHash; no traced consumer equates them. Likewise PR's consentHash and NoticeLink/PolicyReceipt/SetupContext record digests have distinct domains. No new universal hash helper should overwrite these differences.

## Concrete window contradiction: absent constructor versus actual equalities

SET does NOT construct selectors. CTL 82–83 would syntactically permit any bounded selectors interval containing T0. However the actual fixed native consumers impose additional equalities:

- SET 78/82 fixes candidate AND events startAt=T0, expiresAt=N1=T0+300000.
- NP 53–57 requires installed event-policy AND resolved candidate startAt/expiresAt equal selectors; NP 55 also passes selectors interval into current successor host. RED 16–17 requires historical event-policy times equal selectors. Thus with the existing SET policies these consumers force selectors=[T0,N1]; this is not an invented SET selector assignment.
- OP 431–433 sets permissionExpiresAt=min(actual read-grant expiry, original monitoring-event expiry) and commandBy=min(permissionExpiresAt, owner Access, final approval, source window, preconnection expiry)-510000; setup T0 must be STRICTLY before commandBy. Consequently the original monitoring expiry is STRICTLY greater than T0+510000.
- SET 84 preserves that original event expiry verbatim in withdrawalPolicy.originalConsent.expiresAt.
- RED 15 rejects originalConsent.expiresAt>selectors.expiresAt. Combined with the preceding consumers, it would require original monitor expiry<=T0+300000, contradicting the >T0+510000 requirement. RED also rejects originalConsent.issuedAt<selectors.startAt even though original owner consent is established before the later command.

This is a static contract inconsistency, independent of the current expired Source ceiling or any provider availability. Neither an arbitrary selector window nor changing a hash can satisfy it. It must not be hidden by claiming SET creates selectors or by manufacturing consent/timestamps.

## Smallest coherent correction option — diagnosis, not implementation

KEEP selectors as the candidate's narrow finite event identity/window, T0/N1, matching current native admission/successor consumers. Keep the separate ORIGINAL read/monitor authorization interval in the already existing qualified owner/notice chain and withdrawal.originalConsent. Keep commandBy's 510000 margin, all T0/N1/C0/C1/R1 deadlines, original parent/monotonic limits, same actor/program/source, issued journals and one-send/reconciliation rules.

Replace ONLY the erroneous original-authorization-inside-event containment at RED 15 with a positive, exact provenance/coverage contract, never bare deletion:

1. Match the same original monitoring grant SQL row to the qualified original read grant/owner/project/client/resource, original sequence/revision/issued/expires/action/purpose AND original monitoring request_id. Recompute the full PR event digest and require plan.monitorHash, NoticeLink.eventHash and preparation.noticesHash to agree. Preserve withdrawalPolicyHash/raw-policy linkage and the actual originalConsent tuple from that same row.
2. Prove original read+monitor authorization covers the finite event interval and the qualified commandBy/cleanup basis. Do not extend, renew or reinterpret any expiry; OP's existing stronger margin remains unchanged. Nominal first-primary validity/unrevoked checks remain mandatory. Cleanup remains reduction-only under C0/C1 and original scope even after its own successful revoke.
3. Reuse WR's existing original-row and terminal-state machinery rather than making an authorization cache. WR 85–110 joins exact grant/owner/project/client/resource plus original sequence/revision/issued/expires/action/purpose to the ORIGINAL grant row, separately reads latest monitoring state and permits an observed later revoke. WR 111–116 validates already-revoked read state. WR 132–138 and 178–182 require two stable primary readbacks; 149–168 performs append/CAS/idempotent revoke and read withdrawal under SQL cleanup deadlines. RED 21–49 retains issued-before-effect, original assertParent, bounded waiting and reconcile-only uncertain outcomes.

Specific missing guard: current RED constructor does not compare p.monitorHash with the COMPLETE original event row. WR's original tuple SQL does not include original monitoring request_id or recompute that full event digest. C2 must explicitly qualify that missing linkage at the fixed source/native boundary and keep it current around effects; a passed hash equality alone is not proof. policy.requestId is the NEW retained withdrawal UUID (SET 84), NOT the original monitor row's request_id. Conflating them would target the wrong idempotency history.

Current unrevoked facts are required for nominal authorization and at setup/ARM. They must not become a cleanup requirement after successful reduction: WR intentionally accepts a later revoke so lost ACKs and already-completed reductions can reconcile without resend. Original monitoring ROW identity remains fixed while current authorization may be false. No cleanup receipt certifies physical stop; WR 15–18 keeps those flags false, and existing finite close/proof machinery remains separate.

Alternative and risk: redefining selectors as the broad permission interval could also separate the concepts, but would require a wider coordinated review of NP 26,44–57,91, RED 17 and successor/event window callers, with explicit T0/N1 limits restored at every nominal operation. Merely changing selector values could lengthen candidate admission or fail the existing equality checks. Keeping existing finite selectors plus a positively qualified original-consent linkage is the smaller correction boundary. WH 47–48 has similar historical containment in the separate legacy withdrawal host; the finite CH→RED→WR path does not call WH, and this report grants no change to that legacy path.

Any later deterministic qualification should distinguish historical/current program pairs and event/authorization intervals deliberately; reject changed original row, monitoring request ID/hash, raw installed policy bytes, foreign actor or program, changed grant/notice scope, caller timestamps and uncertain issued-state replay. Qualifying rejection/consistency would remain Source-only, not live consent, current custody, runtime or PC-off evidence.

No implementation, contract change, deletion/relabel, reopened/renewed authority, new capability, extra trial or current-primary claim is authorized or performed.
