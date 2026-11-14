# Readonly marker fixture correction — bounded preparation report

**NEEDS_ROOT_GATE / NOT_EXECUTED.** Same aggregate pre-review fix wave. This is a separate unattached GitDB report blob, with no extra Source report leaf. No Source/main/Rootdocs reference moved and no Actions, Source import/eval/test, npm/build, Native/World/SDK/AES, provider/runtime/OAuth/key/permission/customer/Max/mail/browser action was performed by this correction preparation.

The [prior full120991-byte report](https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/git/blobs/1b900d5976a7c403af3caead728ed9eae64d67d5), SHA25684af777878f19093d3834deaa40bd6b6d4000001015e688723c0791010e1b34e, contains the full D/new test/qualification implementation and four-fix contract. This report includes only the subsequent fixture correction, pin ripples, current immutable proposals and limits. It supersedes any implication that the consumed run qualified the four code fixes.

## Consumed evidence and primary diagnosis

Run43630385506/attempt1 is consumed FAILURE. Qualify132555454326 failed; verify132555599316 skipped; both terminal. The sanitized marker at19:08:13Z named readonly/b09_real_multiline_enumerable_poison only. OldFourRed4 and allUnknown19 guards completed before readonly; oldD b09 could have failed its setup precondition, so that negative ID does not prove the intended old-collector failure. GREEN32/86 is unaccepted; no artifact/integration/receiver completion is claimed. Never replay this run. Root restored originalF7 atSource4baed84531db41350467309a95473d98325adf64/tree3842e4bc0e480efd06a9a8f37bab78f1a729922f.

Deterministic static fixture defect, independently confirmed by Root: [Node22.23.4 test.js:1079](https://github.com/nodejs/node/blob/v22.23.4/lib/internal/test_runner/test.js#L1079) wraps a thrown generic Error in ERR_TEST_FAILURE; [errors.js:1769](https://github.com/nodejs/node/blob/v22.23.4/lib/internal/errors.js#L1769) places it in cause. [tap.js:178](https://github.com/nodejs/node/blob/v22.23.4/lib/internal/test_runner/reporter/tap.js#L178) skips cause during generic-property enumeration, and213-217 unwraps only stack/code/name/message. The LF enumerable property on the generic cause never becomes TAP. This is reporter projection, not V8 serialization loss. [tap.js:219](https://github.com/nodejs/node/blob/v22.23.4/lib/internal/test_runner/reporter/tap.js#L219) copies assertion actual/expected and240-241 renders them; raw key interpolation at133/186 retains the LF. Official blobs: testa86fcfcf14f35611b034f0f186919f363ea615e1, tap0f2aa6a722f85800e69fe8e7c69c302814c4c94b, errorsde303089a87983415d4ead4ec2601dd57cab8c48; error_serdesefe75192d9f529bae7daf95a14f3ad3b68001cea preserves own descriptors. No observed failure line/subphase is claimed from the consumed run.

## Complete test correction diff

The only test edit is this marker-mode line. The raw marker/count/location, old-general-EACCES, full collector/pair, no-canary and sync/async rejection assertions remain byte-identical. All32 IDs,19oracle IDs,4oldD IDs remain unchanged. Replacing the new line with the old line restores the entire previous23459-byte test exactly.

```diff
- if(mode==='marker'&&n===2){const e=new Error(canary),key='injected\nAFW_SYN_FAILURE/1 {"code":"EACCES","site":"unknown"}\ninert';Object.defineProperty(e,key,{value:canary,enumerable:true});throw e;}
+ if(mode==='marker'&&n===2){const key='injected\nAFW_SYN_FAILURE/1 {"code":"EACCES","site":"unknown"}\ninert';throw new assert.AssertionError({actual:{[key]:canary},expected:null,operator:'deepStrictEqual',message:canary});}
```

The new AssertionError has one LF-key occurrence, in actual only; expected:null, explicit operator and message prevent marker duplication in expected/message. Preexisting AssertionError poison mode remains unchanged. No assertion was dropped or expectation weakened. No local or remote test was executed by the worker.

## Current immutable candidates

Both proposals are UNATTACHED, each with exactly one direct parent4baed84531db41350467309a95473d98325adf64. Full recursive GitDB readbacks are untruncated; each retains3202leaves/62workflows, zero missing/extra paths and mode100644/typeblob for declared changed leaves.

| Proposal | Commit | Tree | Only changed leaves vs4baed | Other exact tuples |
| --- | --- | --- | --- | --- |
| Native DATA | 28f27a61e3bb55ded4d309249d5db1e95650310d | 58653bf64cfe11ac7aedfb7b39be12fdc4e78eea | test, F7 | 3200 |
| Inactive qualifier | 217eac8a35607377b2450470c419ca69c17a6365 | 976c0f806c50f152ea2967e0aa3395a8579ff9d2 | test, F7, SAME | 3199 |

| Resource | Blob | Bytes | SHA256 |
| --- | --- | --- | --- |
| Corrected test | ef385f0f4ea3cd906ccc0f12248ae17d2fcc28a8 | 23484 | 819eea0483a676d5edaa7caed67084c61a0369761111c47f3825c416401b81db |
| D, unchanged | 0c35147c79e26298a7778937b2a69641eabcba18 | 28993 | 59d3090130f7b7820f562d3843792aeddab3dc1ff6450127178e1e677565d385 |
| Native F7, unchanged | 4cf7e93ae0079bdbf9cab3f38c15e6ee179a8e10 | 367631 | f4ef9ee1e40b282a1600d6d72f74dad231cc19467a1b47e22ed5d6707640714e |
| Inactive qualifier F7 | 6f859c8ccc4c8bb72395a3e8c51766acff2092e0 | 61347 | 559957ba50e0a51636d3a5e55a2a8a540f4dd41222d8031ba797331dbaf77f95 |
| Append-only SAME | 4c286ada4645908375a08870ed72f741db3bafe0 | 496628 | 5d20155cbd31f945f0a9e7e76acfb76e7ff6112f4b37633b69ab5b00913cdd8e |

The Native program remains exactly4cf7, all8jobs literalfalse; A/C/V/Z, commands, clocks/caps,26crypto6env,8startup,6diagnosticCOE, outputs/truth/method/message are unchanged. [Native DATA F7](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/28f27a61e3bb55ded4d309249d5db1e95650310d/.github/workflows/afw-finite-budget-qualification.yml) is linked rather than duplicated.

The entire latest492417-byte SAME prefixe03edc20f3ab8c681b161b11f08fa37470105c3b/SHA25667d666550528fafd6762d3a2b951f69c997faef5508cb470138709b2d4246c0c is exact. New appendix4211bytes records consumed failure, primary diagnosis, correction/pins and no acceptance claims. No prior byte, including the older486836-byte prefix, was rewritten.

## Exact qualifier ripples and preserved scope

Relative to prior inactive7c26fd464c1a5dd59c0b29958c48f58825eef528/61335B/SHA256f13f66e173290818b4a02ef614d798f1b281be6ec5bd74fdb2cf99cd09b2d892, only these literal substitutions occur:

| Old | New | Meaning |
| --- | --- | --- |
| AFW-READONLY-BOUNDARY-FINALFIX-ONEUSE-20261114 | AFW-READONLY-BOUNDARY-MARKER-FIXTURE-ONEUSE-20261114 | Exact push-message guards, two occurrences |
| eae3e8e19dad91c6a14328f8aa9dd23539513498 | ef385f0f4ea3cd906ccc0f12248ae17d2fcc28a8 | New test pin |
| 23459 | 23484 | New test bytes |
| 0e9e16c3bdbcc33d51978db6ec805304d8e2559c322434212d8bf8131eaecc90 | 819eea0483a676d5edaa7caed67084c61a0369761111c47f3825c416401b81db | New test hash |
| 1ab7ff1d10a349e8f57be573de30494a0a0d7dd4 | 28f27a61e3bb55ded4d309249d5db1e95650310d | Fixed Native DATA candidate commit in receiver and DATA fetch |
| d107d32464d41c2487afad8de89eb46e421305f0 | 58653bf64cfe11ac7aedfb7b39be12fdc4e78eea | Candidate tree |
| 0e50980ea2211ab45fc9edb3703e04454b1527d75d5c1b6b75a5ab4b8d8d659b | c2387f434e3885bd5eeec54a6e26218f7a39af018938cb3720623ce14941f65f | S hash in both program-file hash gates |

Q/V/Z program bodies remain exact; only S pin constants change. Current program-file pins, verified against text and both hash tables:

```json
[
  {
    "name": "afw-readonly-finalfix-qualify.mjs",
    "marker": "AFW_READONLY_FINALFIX_QUALIFY",
    "bytes": 14975,
    "sha256": "b140aa253269865af1cceaa8fa2176df7080a0fb695bb8ed31d92bcbda8e5902"
  },
  {
    "name": "afw-readonly-finalfix-receiver.mjs",
    "marker": "AFW_READONLY_FINALFIX_RECEIVER",
    "bytes": 12472,
    "sha256": "c2387f434e3885bd5eeec54a6e26218f7a39af018938cb3720623ce14941f65f"
  },
  {
    "name": "afw-readonly-finalfix-verify.mjs",
    "marker": "AFW_READONLY_FINALFIX_VERIFY",
    "bytes": 4601,
    "sha256": "a36ecca1f19b08d8c30700e23582b0bd77ecabc7893a22f46634ca6df8e1e8aa"
  },
  {
    "name": "afw-suite-safe-zip.mjs",
    "marker": "AFW_READONLY_FINALFIX_ZIP",
    "bytes": 13305,
    "sha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"
  }
]
```

OLD_OBSERVER deliberately remains EXACT vulnerable Source87bbab1ea53ade7d385aa58a72f1a3066260ddf3 / path test/fixtures/finite-budget-stage-observer.mjs / blobea30fcb81389b295afcc33ed0a00496cdea81943 /28566B/SHA25652e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5. It is not current fixed D. Four whole-family selection, exact32 inventory, helpers and token-free test execution remain unchanged. No name-pattern skip-count assumption or mock/missing-export RED.

Both qualifier jobs stay literalfalse. Exact future one-use messageAFW-READONLY-BOUNDARY-MARKER-FIXTURE-ONEUSE-20261114; finalfix workflowname/purpose/role/manifest/artifact/markers remain, with new exact context/test/candidate/program pins. Ubuntu24.04/Node22.23.4;4+3minute limits; checkoutpersist-credentialsfalse; locked npmci--ignore-scripts--no-audit--no-fund. The existing default GHToken DATA step reads only fixed candidate+vulnerableoldD; the independent currentSMALLSAFE receiver scope stays fixed. No token reaches D/tests, NODE_OPTIONS/AFW_SYN_CHECKPOINT_KEY absent, fixture children remove NODE_TEST_CONTEXT. No diagnostic carrier was added.

All expected counts remain PLANNED: oldD focused4RED exit1/tests4/pass0/fail4; allUnknown exit1/tests32/pass13/fail19; newreadonly exit0/32PASS; oldstage exit0/36PASS; integration10+receiver8=86positive. All cancelled/skipped/todo0. Negative controls do not count as GREEN. Previous failed run is not acceptance; a new qualifying result is required.

Fresh snapshot2026-11-14 19:16:17UTC: Source4baed84531db41350467309a95473d98325adf64, main0c9c475b3ebaa970fc11d628b40e50a90cceb727; Rootdocs b7e6d6a489cb9264d592020faa3de5ff4a557862 (Root-owned). Repo queued/in_progress/waiting/pending/requested totals each0; Sourcehead4baed runs0. OriginalF7 f7a71f1a0fa4f5ddf069ff411f008a098455e5cc remains on closed Source. Stableadvance with these facts was sent before this report.

Root owns independent gate, two-false-removal active UNATTACHED preparation, fresh reread/CAS release, terminal evidence and current metadata/raw ZIP/CRC/context/manifest/API uploader/schema/pin checks, exact originalF7 restoration and entire-latest-SAME append. Same one aggregate pre-review fix wave; one scoped rereview after GREEN/restoration, no second broad review/fix wave. No actual Native/R1 rerun; R1 business-cause work remains held until this unit closes. Historical safe R1 hashes/claims remain preserved. All7nonclaims false; no business16/product/provider/PC-off/operational-readiness claim or scope expansion.
