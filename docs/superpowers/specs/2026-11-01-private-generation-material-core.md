# Private generation material core — bounded source refactor
2026-11-01 · AFW · source/CI only · proposal for next already-planned ARM prerequisite

## Grounding and chosen approach
Pinned source main1b3409ee72cb26d902b086ce8ccb017004730654 already has immutable draft grammar/reader, literal legacy materializer, original/historical primary readers and a read-only native preparation host. It does not have a draft producer/channel or production generation ARM host.
The older ARM Task2 has two integration traps: it conflates namedBundleHash with generationPlanHash, and current prepare() must reject all V2 records, so it cannot be reused after ledger pending CAS or under prepared_idle.
Choose extraction of a private PURE material core from the current preparation host. Preserve the closed host and all its I/O/lease checks. Duplicating the full algorithm would diverge; weakening closed(env)/empty-V2 would violate its accepted purpose.
This block adds neither an ARM host nor a prepared_idle variant, writer, endpoint or authority. Those are later separately reviewed contracts.

## Identity domains
namedBundleHash selects afw_qa_generation_drafts_v1. It is recomputed by existing assemblePrivateQaNamedPacket from the artifact and named policy; preserve original artifact field order and frozen315 bytes.
generationPlanHash is recomputed by that assembler from the exact canonical capsule under afw.qa-generation-plan.v2. The capsule bundleHash must equal namedBundleHash.
Never alias, relabel or use one digest as the other. Ledger/retained resolution remains generation-plan keyed. Native before-ARM arguments must eventually be named-bundle keyed.

## Exact core interface
New lib/mcp-qa-generation-material.mjs exports:
assemblePrivateQaGenerationDraftMaterial({
 namedBundleHash,draftJson,legacySnapshot,artifact,receipt,historicalContext,namespace,at
})
All exact own data fields. Synchronous only; no Promise, I/O, storage, clock acquisition, host selector, callback authorization, policy override or execution pin.
Inputs are private server-owned data: legacySnapshot literal shape {control,journals}; historicalContext and compiled artifact/receipt retain their original validators and order; namespace is the existing native namespace binding consumed by the packet assembler. at is the caller's already-checked instant and is not authority.

Algorithm is moved, not reinvented, from createPrivateQaGenerationPreparation.prepare:
- decode canonical bounded seven-field draft;
- materialize literal legacy predecessor with its old control and four journals, historical named/dispatch declarations and at;
- validate confirm_named policy using exact frozen artifact, require its canonical JSON;
- derive capsule using actual policy/event/grant reference and declared cancellation/closure hashes; construct packet; existing assembler recomputes/checks commitments and two hash domains;
- compare original container/application/program/source identity against the historical named declaration.

Return a frozen private result with exact keys:
purpose:'afw.qa-generation-draft-material.v1',
packetJson,capsuleJson,namedBundleHash,generationPlanHash,packetHash,
original,historicalScope,historicalCandidate,window,
retainedUncertainty:true,authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false.
Private fields are NOT a public DTO or a fresh consent/history/zero-reservation/provenance witness. Deep literal owned copies of returned data avoid retaining mutable policy objects. No secrets/raw values in tests' error output.

## Existing host invariants MUST remain
Modify only preparation host composition to call this core and use returned original/historicalScope/historicalCandidate/window for existing primary readers.
Keep all14false/7empty checks, complete actual legacy/V2 inventory, fixed actor/source/native UUID, explicit QA vs dossier DB identity, compiled artifact/historical contexts, original parent wall/monotonic<=5s lease (native enqueue included), all stable binding-method checks, actual D1 original/historical correlation, reread of exact draft and full literal legacy/journals after awaits, and final recipient settlement fences.
Do not move or omit snapshot capture/empty-V2 checks. Never introduce a facade filtering V2 away. No child clock reset, cached Step admission, new write or public RPC return fields. Existing preparation private result and public receipt bytes/fields stay semantically identical.

## Future dependency gates, outside this block
A trusted immutable draft channel must still authenticate/fix private own input, schema/source, consumed-before-send create-only INSERT and read reconciliation after unknown ACK, without overwrite/delete/upsert or manufactured fresh scope. Installed-empty tables are not a generation; no live D1 writes authorized here.
ARM later needs a fixed prepared_idle host (three exact closure flags true, eleven false and seven empty policies), independently correlated QA module/config/source/native UUID, primary current scope/history/zero reservation, two actual quiescence snapshots and ledger's exact pending lineage before/after CAS. It must reconstruct private material under its own lease rather than call closed prepare() after pending. Task1 HTTP does not check QA code/profile and explicitly returns qaCodeProvenanceVerified:false; native v2 metadata observation is NOT ARM.
Nominal later reconstructs from retained capsule plus immutable draft; this core does not populate afw_qa_named_packets_v1. Do not add a packet writer to ARM. Guard, generation journals, retained cleanup/finalizer, useful authorized review, native withdrawal and integrated PC-off remain pending.

## Verification and acceptance
Meaningful composite unit tests with actual existing validators/assembler and accepted frozen fixture: positive exact material and same result through preparation, both distinct hashes, wrong domain/key, mutated canonical draft, original identity mismatch, retained issued/complete uncertainty, field order and boundary/accessor rejection.
Run existing generation preparation unit/native, materializer, assembly and historical/original pin tests in Actions; preserve the accepted allfalse/any-V2 negatives and post-await/final-settlement failures. Native real DO/D1/Workflow tests qualify host composition, not live scope or hosting.
Use TDD cloud-only, no local clone/deps/build. Independent exact-head review + full CI before source merge. No runtime publication, profile change, credentials, grant/OTP, D1 write, scheduler, Max or PC-off claim.
