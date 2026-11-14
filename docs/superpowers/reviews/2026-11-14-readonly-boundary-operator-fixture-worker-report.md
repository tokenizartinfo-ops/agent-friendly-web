# B09 operator-only fixture correction — bounded preparation delta

**NEEDS_ROOT_GATE / NOT_EXECUTED.** Same aggregate pre-review fix wave. One marker-mode operator token changes; all source assertions remain. This standalone unattached report blob adds no Source leaf. No Source/main/Rootdocs reference movement, qualification/Native/R1 run, Source import/eval/test, npm/build, provider/runtime/OAuth/key/permission/customer/Max/mail/browser action was performed by this preparation.

Prior implementation remains in [the aggregate full report](https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/git/blobs/1b900d5976a7c403af3caead728ed9eae64d67d5), [marker-constructor delta](https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/git/blobs/ac0bb80f8a40c2420204e9db81c427e6d705510a), and [bounded diagnostic carrier report](https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/git/blobs/1e3f36689a8f885a0329243255c83691575802e7). No full D/test/qualifier is duplicated here. Consumed qualification runs43630385506/1 and43631502691/1 remain failures, not accepted86.

## Observed diagnostic and concrete primary explanation

Root independently validated one closed diagnostic from run43632996599/attempt1, diagnose job132563511133 SUCCESS19:36:22UTC, including context/pins/all7false. Diagnostic fields supplied by Root:

```json
{
  "state": "observed_failure",
  "phase": "old_general",
  "errorclass": "assertion",
  "actual": null,
  "expected": null,
  "stats": {
    "markerExactCount": 1,
    "markerMentionCount": 2,
    "maxLineBytes": 115,
    "rawBytes": 1741,
    "oldGeneralCode": "unknown"
  }
}
```

Marker count and marker location assertions completed; the observed failure is old_general. The general projector must decline two marker mentions. Neither raw TAP nor raw error text/stack/header was read or returned by this worker. actual/expectednull does not disclose object/string values. Diagnostic collection success is not qualification or R1 business cause.

The secondary mention is in the TAP YAML **error** field, through the assertion's generated diff message. Official immutable Node22.23.4 chain:

1. [assertion_error.js:46-49](https://github.com/nodejs/node/blob/v22.23.4/lib/internal/assert/assertion_error.js#L46) includes deepStrictEqual in kMethodsWithCustomMessageDiff. [269-273](https://github.com/nodejs/node/blob/v22.23.4/lib/internal/assert/assertion_error.js#L269) calls createErrDiff even when message is explicit.
2. [createErrDiff:190-193](https://github.com/nodejs/node/blob/v22.23.4/lib/internal/assert/assertion_error.js#L190) inspects actual/expected;232-235 appends the inspected diff to the message. The LF key consequently occurs in the inspected key text.
3. [tap.js:217/227](https://github.com/nodejs/node/blob/v22.23.4/lib/internal/test_runner/reporter/tap.js#L217) takes cause.message and renders it under error. That inspected representation contributes the noncanonical marker mention. [240-241](https://github.com/nodejs/node/blob/v22.23.4/lib/internal/test_runner/reporter/tap.js#L240) renders actual separately; raw key interpolation133/186 supplies the one canonical marker line. Stack handling249-270 keeps only at-frames, so the secondary field is not stack or expected.

This primary-code inference explains Root's observed1exact/2mentions without claiming a raw line was observed. Official blobs: assertion_error.js5dbf1e7a3413808e743cc9755ee1d16ee246766f, tap.js0f2aa6a722f85800e69fe8e7c69c302814c4c94b. The earlier assumption that explicit message alone suppressed the diff was incorrect.

## Complete code delta

Marker mode ONLY:

```diff
- if(mode==='marker'&&n===2){const key='injected\nAFW_SYN_FAILURE/1 {"code":"EACCES","site":"unknown"}\ninert';throw new assert.AssertionError({actual:{[key]:canary},expected:null,operator:'deepStrictEqual',message:canary});}
+ if(mode==='marker'&&n===2){const key='injected\nAFW_SYN_FAILURE/1 {"code":"EACCES","site":"unknown"}\ninert';throw new assert.AssertionError({actual:{[key]:canary},expected:null,operator:'fail',message:canary});}
```

fail is absent from the custom-message diff set, so explicit message selects super(String(message)) and removes the inspected-key mention from error. actual still contains exactly one LF key, expected stays null, and TAP still renders the canonical line. [Node lib/assert.js:190-198](https://github.com/nodejs/node/blob/v22.23.4/lib/assert.js#L190) uses fail as AssertionError's own default operator; its blob is f2ce5e9c0752e865dbf3e483dc0bf72e41643404.

No projector behavior or assertion is weakened. Poison-mode deepStrictEqual is untouched. All count/location/old-general-EACCES/full-collector/pair/repacked-contradiction assertions remain exact, as do32IDs/19allUnknownIDs/4oldDREDIDs. Reverse of this single marker-line token substitution restores the complete ef385f0f4ea3cd906ccc0f12248ae17d2fcc28a8 test text exactly. The expected one canonical line/one overall mention is a reasoned fixture property, not an executed result of this preparation.

## Immutable proposals and pins

Both unattached proposals have exactly one direct parent68538634f9565223fd23728b0e69f6ae2dc4f43c, base treea46fd0a71ea899dcddbea0fec5c3e970f74ec5eb. Full recursive readbacks are untruncated:3202leaves/62workflows each, zero missing/extra paths, all declared entries mode100644/typeblob.

| Proposal | Commit | Tree | Only changed leaves vs685 | Other exact tuples |
| --- | --- | --- | --- | --- |
| Native DATA | fc02dd4105512f0e29716f4c72e031d0910b1692 | 15d48bbac771b63173d9e89828b53773a0199057 | test, F7 | 3200 |
| Inactive qualifier | 3732024880e9732c4c596216fc7daf69b9c6d3b1 | 668c7f4e62c4e547a6191374591c5de22e8618a5 | test, F7, SAME | 3199 |

| Object | Blob | Bytes | SHA256 |
| --- | --- | --- | --- |
| Corrected test | dcd8a8b31838e3b1baf34dfd8e7ccbbd26ba7fca | 23473 | b43cc35686d0cdac04816164a89fb6d80bfbd282f93f5edc8dbd67f2e935337c |
| D unchanged | 0c35147c79e26298a7778937b2a69641eabcba18 | 28993 | 59d3090130f7b7820f562d3843792aeddab3dc1ff6450127178e1e677565d385 |
| Native F7 unchanged | 4cf7e93ae0079bdbf9cab3f38c15e6ee179a8e10 | 367631 | f4ef9ee1e40b282a1600d6d72f74dad231cc19467a1b47e22ed5d6707640714e |
| Inactive qualifier F7 | 2c24a016b5a091f9ab7a7c1c2c7507cc1fe44bc8 | 61333 | 31bbbb4aa3516480f02160ee880da9417c0add804a157274d4d20968f43bd556 |
| SAME append-only | 7bc3711075e8ed304bdae607e150584312c25b92 | 506921 | 10e3204447f19c28e07c9cce19a30b055f4223376ec350ca270b52d51a07453e |

Entire latest502674B SAME prefix822e3d7dbd0536c888cd1aacd7d6c7d88e73e8cc/SHA256938e57aa7bf95cedd133f0aba12a756388684eb1d3f19c872ad498d0ccc869dd is exact. Appendix4247bytes records actual closed diagnostic, primary explanation and inactive proposal. All earlier prefixes, receipts and failures remain preserved.

Native F74cf7 stays exactly unchanged, all8jobs literalfalse; A/C/V/Z, frozen parser forms, six Native commands, clocks/caps,26crypto6env,8startup,6diagnosticCOE, outputs/truth/method/message stay exact. [New Native DATA candidate](https://github.com/tokenizartinfo-ops/agent-friendly-web/blob/fc02dd4105512f0e29716f4c72e031d0910b1692/.github/workflows/afw-finite-budget-qualification.yml) is linked rather than duplicated. No actual Native/R1 run is part of this fix.

## Exact qualifier ripple boundary

The prior61347B full qualification carrier6f859c8ccc4c8bb72395a3e8c51766acff2092e0 is used as fixed DATA, not replayed. Whole-text reverse to it is exact after ONLY these substitutions (plus its S program SHA in the two file-hash tables):

```json
[
  [
    "AFW-READONLY-BOUNDARY-MARKER-FIXTURE-ONEUSE-20261114",
    "AFW-READONLY-B09-OPERATOR-FIX-ONEUSE-20261114"
  ],
  [
    "ef385f0f4ea3cd906ccc0f12248ae17d2fcc28a8",
    "dcd8a8b31838e3b1baf34dfd8e7ccbbd26ba7fca"
  ],
  [
    "23484",
    "23473"
  ],
  [
    "819eea0483a676d5edaa7caed67084c61a0369761111c47f3825c416401b81db",
    "b43cc35686d0cdac04816164a89fb6d80bfbd282f93f5edc8dbd67f2e935337c"
  ],
  [
    "28f27a61e3bb55ded4d309249d5db1e95650310d",
    "fc02dd4105512f0e29716f4c72e031d0910b1692"
  ],
  [
    "58653bf64cfe11ac7aedfb7b39be12fdc4e78eea",
    "15d48bbac771b63173d9e89828b53773a0199057"
  ]
]
```

S hash c2387f434e3885bd5eeec54a6e26218f7a39af018938cb3720623ce14941f65f becomes58a5461652845d716a40f8877e1218771a52313b59d30569dc5e6f1ceaa285a7. Only S pin constants change. Q/V/Z bodies remain byte-exact; both program-file hash tables agree with:

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
    "sha256": "58a5461652845d716a40f8877e1218771a52313b59d30569dc5e6f1ceaa285a7"
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

OLD_OBSERVER remains EXACT vulnerable Source87bbab1ea53ade7d385aa58a72f1a3066260ddf3/path test/fixtures/finite-budget-stage-observer.mjs/blobea30fcb81389b295afcc33ed0a00496cdea81943/28566B/SHA25652e644056fad256686d3763f0be96d9334a69c95318a3fb957763d2f97d5dfd5. Do not replace it with current fixed D.

Two qualifier jobs remain literalfalse. Exact future one-use push messageAFW-READONLY-B09-OPERATOR-FIX-ONEUSE-20261114. Finalfix name/purpose/role/manifest/artifact/markers are retained with new exact source/test/candidate/S program pins. Ubuntu24.04/Node22.23.4,4+3minute limits, credential-free checkout, existing lock npmci--ignore-scripts--no-audit--no-fund and fixed default GitHub token DATA-fetch/currentSMALLSAFE receiver scope remain unchanged. Token never enters D/tests. NODE_OPTIONS/AFW_SYN_CHECKPOINT_KEY absent; fixture children remove NODE_TEST_CONTEXT.

All counts remain PLANNED: oldD focused4RED exit1/tests4/pass0/fail4; allUnknown exit1/tests32/pass13/fail19; newreadonly exit0/32PASS; oldstage exit0/36PASS; integration10+receiver8=86positive. cancelled/skipped/todo0. Negative controls do not count as GREEN. Nothing in the prior failed qualifications or successful diagnostic substitutes for actual qualification.

Fresh19:42:17UTC snapshot: Source68538634f9565223fd23728b0e69f6ae2dc4f43c/main0c9c475b3ebaa970fc11d628b40e50a90cceb727; Rootdocs5e67791ddce3a8868633c91f1ccaf64dd06e7646 (Root-owned). Repo queued/in_progress/waiting/pending/requested each0. Source685/qualifier3732/Nativefc02 each0headruns. OriginalF7 f7a71f1a0fa4f5ddf069ff411f008a098455e5cc stays on closed Source. Stableadvance with these facts preceded this report.

Root owns independent inactive gate, active unattached two-false-removal derivative, fresh current reread and one CAS release; require both jobs positively terminal and validate current metadata/rawZIP/CRC/uploader/context/canonical schema/manifest/pins in Root's independent receiver. Restore exact originalF7 and every undeclared leaf, preserve entire latest SAME while appending actual receipts, then perform one scoped rereview of the aggregate four fixes/tests/coupled Native pins. No second broad review/fix wave. All7nonclaims false; no business16, product/provider/readiness or PC-off claim. R1 mutation/rerun remains held until aggregate closure.
