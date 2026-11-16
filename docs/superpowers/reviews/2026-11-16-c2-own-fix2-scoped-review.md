# AFW C2 OWN fix2: independent scoped N1/N2 re-review

Authority: immutable brief e485803add7012c89a4e2bf3b1c1bce380976b96; exact findings a279a930e3b0a89f186137b299fa20e8d44f6cf3; implementation scope 830b354469e6ab50f405f4d92efb73042ee49a90. Repository: tokenizartinfo-ops/agent-friendly-web. This is a static N1/N2 fix-diff review only. Source/business behavior and whole-product qualification are out of scope.

Scoped spec verdict: PASS.
Scoped quality verdict: PASS.
N1: ADDRESSED.
N2: ADDRESSED.
New actionable breakage found in the fix diff: NONE.

N1: own-receiver.mjs f7994836872bcd00d19f6cead7ad1667fe16e44d:217,223 rejects non-finite parsed timestamps before accepting the exact diagnostic command header or any AFW_C2 frame. The invalid-month NaN bypass is closed at both sites. Existing command identity, uniqueness, closed-group and step-time checks remain. Vectors 6e5929efbd58acd113bfdf5813fe2670a6cccca4 contain separate one-edit month-99 header/frame negatives. Their other input content stays consistent; the frame negative edits only that physical timestamp.

N2: same module:249-250 adds a narrow cross-projection rejection after the journal reducer, witness equality, journal digest and native ID/order validation. For a stable journal, a native PASS is rejected when the validated events record an action/count throw for that exact case ID. It does not invent a native result, infer PASS from returns, require native completion, or reject native FAIL just because both operations returned. AFTER/close alone cannot match the action/count condition or a named case ID. Four new negatives include action-throw/PASS and count-throw/PASS with matching outcome frame and artifact copies. Six positive vectors cover each throw without a native result, each throw with native FAIL, native FAIL despite two returns, and AFTER throw beside a named PASS. The appended controls call the actual consumer and require accepted diagnostic nonclaims for positives.

Read complete receiver and changed controls as text, both full preimages aec1fbf336d5774f465756ecc1b7e06492244e0f / 56a362d16725fd2bb8fcb9e727276c79a2b920ff, and full reversible diff 50856ee83bcf04ee166e5d6f4c9670ac15d97556. Static text comparison confirms exactly three receiver insertions, totaling 316 bytes, and a 758-byte controls append in 1d04d617be16f9e84e6f1b57ff48347ae91b267e. All other receiver bytes and the complete prior controls prefix are identical. Thus the counter repairs, future Source identity/selection and Source-assembly implementation/control scope remain unchanged. Inspected all ten new JSON vectors as data, including their complete common input and structural differences; no code from the packet was executed.

Preserved evidence: red 73ea15f372f728182936c1414479856365d1be93 records the four negative vectors accepted by the preimage; result 084acca4ac976c6adf25279d539c30ad9438e67b records all ten fixed controls and the preserved 187+28. Actual cloud evidence 733821261bafa9d254a897019ff388db4edf5688 binds head d6a78b4f8916ae27b3357e2283b709e72e57a333, tree 9517e15d55a2b414babd71562b199af0809a0454, gate c7925c2764d204b7b7ad989bf5a97858455aeb7b, run 43825106734/1, job 133156965041, step 4 at 2026-11-16T07:37:23Z-07:37:24Z. Its canonical frame records native moduleGraphLoaded=true, 187+28+10=225 controls, failed=0, SourceExecuted=false. This review consumes that preserved occurrence; it does not claim a fresh execution or independent log re-fetch.

No tests, evaluation, compilation, imports, Source files/execution, dependencies, files on disk, operational refs/runs, runtime, Cloudflare, browser, credentials or subagents were used by this review. Only immutable GitHub reads and creation/readback of this report. No out-of-scope observation is being promoted into a requirement. Root owns preservation and operations.

ActualSource=false; SourceExecuted=false; SourceQualified=false; Task1Pass=false; PCoff=false. This PASS closes only scoped N1/N2 review and does not qualify Source, prove business behavior, authorize runtime activity or establish unattended operation.
