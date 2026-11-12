# Task1 independent review — initial failed candidate

SpecCompliance: FAIL. TaskQuality: CHANGES REQUIRED. Native remains held.
Reviewed frozen candidate6599b33dd71df6a61da25e5c9a35c1e299623433. Run43325790437/1 failed before the first named callback. The verifier and related tests were skipped. No SAFE artifact was produced. Closureefa4bd8b restored the original World as required. Reviewer /root/native_postack_task1_review, Astra/xhigh, read-only/no execution or mutation.

## Critical

C1. The composed transform misclassifies the expected mismatch.
The raw phase has five protocol predicates and one pair comparison. The existing compiler rewrites the first property read before invoking the diagnostic. The diagnostic then searches for literal canonical(pair.first) and counts the comparison as a sixth protocol predicate. Increasing the expected count would preserve the misclassification. Match the composed comparison structurally and preserve its original predicate, short-circuit evaluation, and error.
Anchors: lib/mcp-qa-finite-owner-phase-context.mjs706; World430/778; fixture43–48/78/155. Existing World20,203,430–431,569,613 instruments first as readMethod.

C2. The inactive adapter can certify an original R2 pass without the original assertions.
World marks the helper’s return as passed. The protected test subsequently checks completed writes,201inputs,correlations,expiration,unchanged foreign data,replay,pending work,response status and reference rows. The new single test omits those checks. Retain the R2-specific assertions on its one result.
Anchors: World1983; test/finite-post-ack-diagnostic.test.mjs23; protected test/mcp-qa-finite-budget-native.test.mjs103–113,120.

## Important

I1. Original outcome and diagnostic failure interfere.
World requires successful disposal and terminal capture to recognize a primary rejection. Selection or persistence can then throw before the original object is rethrown. Conversely, invalid observation throws from the command after a known success. Preserve the positively recorded business outcome and its error independently of every evidence operation.
Anchor: World1984–1996; fixed adapter contract returns normally on original success and rethrows same original object on failure, while proof/verifier own evidence failure.

I2. A pre-MF headroom refusal can enter Native sealing.
persistAttached becomes true before the final timing assertion. If that assertion throws, the manifest reports preallocationBlocked:false and sealNative encrypts the partial output. The protected harness has yet to construct MF. Track actual MF attachment separately from scratch ownership. Also reject a job start later than the official response time.
Anchors: World828/1994; fixture214–218; Native workflow45.

I3. The24callbacks do not prove the claimed observer behavior.
They extract raw functions and reapply the diagnostic, skipping the compiler composition that failed. Side-effect checks record names without verifying argument,receiver or promise identity. The pair and late controls do not exercise both settlement orders or a later operation in flight. Private tokens correctly reject ordinary forgeries,but two tokens can be issued for one callback,and the negative tests never replace a callback with a no-op through the real runner.
Anchors: fixture131–144;147–149;159–160;170–172. Missing/forged arrays alone are not no-op execution counterexamples.

I4. Emission and default-OFF proofs are incomplete.
The supplement accepts absent metafile inputs and arbitrary well-formed emitted/literal hashes,and omits closed version,field and enum checks. The two OFF builds are compared with each other,but their QA records are not compared to the ON build’s pre-diagnostic records. The model inventory is sealed in a directory later modified and no verifyBudgetArtifact readback consumes it.
Anchors: fixture74–80; World1958–1969; test15/World1994 later change sealed directory.

I5. The independent verifier accepts incomplete proof.
An empty offGraphs array satisfies its loop. Nested control flags,full emission fields,and model hashes are insufficiently checked. The Native result validator checks hash syntax without independently binding available SDK,lock,and transform pins to the checkout. Both workflows publish only the artifact ID,so the uploader digest is absent from the required three-way comparison. The Native verifier also lacks the assigned cipher ID and original command outcome needed for reconciliation.
Anchors: fixture198–208; contracts workflow16–17,106–110; Native workflow19–20,176–179,198–202,218–221.

## Minor (deferred; not a fix-loop extender)

M1. The OFF comparison relies on insertion order in maps populated by asynchronous module loads. Compare records by role and path after asserting uniqueness to avoid a scheduling-dependent false failure.
Anchors: World778–779,1959.

## Verified strengths

The lexical slot is consumed before the first await. The collector retains primitive records. The canonical N3 projection and known-answer vector are present. The candidate uses existing ownership and both configured worker checks,labels model hashes separately,and scopes the key to three terminating steps. The failed-run report accurately disclaims qualification. This review executed no code,read no private Native evidence and changed no resources.
