# C1 PRE-T0 QA provenance — independent task review

Reviewed BASE a609c1f3296177f73468ca8c708b9333330f1d32 through DocHEAD b7ca96be80da939ad906c52e5b2ab900e901e4cd/code d22d5366069ff569e428bc051a3e524f93abeed0. Fresh independent reviewer /root/review_pre_t0_qa_provenance, read-only compare package, no test rerun/provider action.

Spec Compliance: FAIL. Task Quality: NEEDS FIXES. Critical0, Important1(P2), Minor0.

## Open finding (review text)

[P2] The final reconciliation imposes an unintended five-second publication deadline after consuming the attempt. mcp-qa-finite-bootstrap-primary.mjs:32 rejects whenever the original QA observation is over five seconds old. The issuer repeats that check after creating and reading back the immutable-locator ref, at mcp-qa-finite-bootstrap-issuer.mjs:49. Thus several individually valid sub-five-second requests can take six seconds collectively, remain well inside Pend, successfully create the tag/ref, and then fail the job solely because the original observation aged. Native subsequently rejects the failed job; the existing ref and no-replacement rule prevent another bootstrap for that QA UUID. This adds an undocumented deadline beyond the selected P0/Pend contract and can unnecessarily consume a publication. Fix: distinguish fresh response validation from historical observation validation. Preserve original observedAt and its step/Pend correlation through post-write reconciliation; do not require that historical observation to remain less than five seconds old. Add one targeted issuer regression with cumulative post-observation latency exceeding five seconds, every individual read within its limit, and original Pend still live. No retry, deadline extension, or record timestamp rewriting is needed.

## Strengths cited by reviewer

Exact own-data traversal/canonical bounded public record (record:7,21–34); issuer cap spent beforePOST and exact ACK/readbacks, no resend/reset (issuer:39); in-progress issuer versus completed-success reader primary (primary:23); actual native read promises retained before cancellation race, supported token+deployment-only CF reads and explicit false authority/governance assumptions (native:35,48–64); secret metadata values rejected BEFORE fingerprint, actual compiler-byte correspondence (publication:18); actual issuer/compiler/native DO tests with explicitly SYN external boundaries.

Single focused outside-diff check: mcp-qa-finite-seed-wire.mjs:8 original admission before/after awaits,5s child timeout/cancellation. That does not justify cumulative observedAt age.

## Cannot-verify items — Root owning-scope resolution

1. Original remaining parent in later owning constructor: genuine FUTURE integration gate, not claimed implemented by unmountedC1. Future readPrivateQaFiniteOwnerSource MUST test a held child across a PARTIALLY CONSUMED original deadline, prompt rejection, retained actual work/no subsequentreads. C2 preflight brief budget/current-source table carries it. Do not use C1 tests as production-source/cancellation proof.
2. Unchanged full-package/source-authority closures and complete compiler/profile checks: Root already inspected unavailable source-authority/owner-source and full compiler boundary atC1BASE, actual compare changes neither authority seam. Root independently verified81+34PASS/lint/artifacts0 for currentcode, including affected realcompiler/profile/residency. Preserve these source facts; later whole-branch/fullpackage dependency review remains required and C1 does not approve it.
3. Actual permissions/response compatibility/publication/runtime/PCoff: explicitly outside source unit, no claim of completion. Native/GHA production trustapproval expiry unchanged; actual verification belongs to later separately authorized preparation. No freshprobe/window now.

## Root ruling / fix round1 before code

Ruling: accept P2 as a genuine source correctness gap. Original P0/Pend and per-request response freshness/5s transport remain; remove the undocumented requirement that the HISTORICAL QA observation stays younger than5s through POST/readbacks/finalprimary. observedAt must remain original, not regenerated/backdated; validate it is finite and within actual original step/Pend/not future when relevant. Native reader still requires genuine completed-success at original step/job deadlines. No retry, reset, replacement, wider role, new public purpose or owner clock.

Original implementer owns round1 with focused actual issuer regression cumulative post-observation latency>5s, each child<5s, originalPend stillvalid, unchangedrecord timestamp, exactly2POST and oncecap/unknownACK guarantees. Actual newbehaviorRED beforefix, thenGREEN issuer+affectedprimary tests/scopedlint; no reflexcompiler/native rerun unless dependency changes. No weakeningtests/runtime probes. Same reviewer re-reviews only b7ca96be..fixDocHEAD plus thisP2/newdiffbreakage. Source-only; no acceptance yet.


## Scoped re-review round1 — APPROVED, source only

Same reviewer assessed previousDocHEADb7ca96be..fixDocHEADf933dc192c8a8c2d13cd1f3580a7e6a9042a34c1. P2 ADDRESSED: primary:35 now checks safe integer/originalstep/Pend/notfuture, no cumulativeage5s. Issuer test:91 measures actualelapsed6518ms/maxrequest653ms, exactly2POST, unchangedoriginaltimestamp/P0/Pend andzeroextraHTTPonrepeat. No introduced Critical/Important/Minor breakage. No rerun. Remainingparent/provider/runtime owninggates explicitly separate.

Root independently verified exact actualGREEN41513188777/job125509965448/attempt1/head21087916f3967b92ec0ef7f6905aeaa5642c8511:48PASS0fail/cancel/skip, lintsuccess/artifacts0, actual regressionoutput6518ms/maxrequest653ms/exact2POST/timestampunchanged. Previous actual81+34PASS remains applicable to unchangedotherlogic. Root accepts C1 SOURCE ONLY; no tag/dispatch/publication/window/runtime acceptance. Task5/C3/fullpackage/PCoff remain incomplete.
