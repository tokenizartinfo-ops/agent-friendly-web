# Coherent suite Task1 independent review

Spec verdict: FAIL. Task-quality verdict: changes required. Task2 HELD. Reviewer coherent_suite_task1_review read the immutable full package, Source text and bounded records without execution/mutation.

Strengths: independently compared six original Native/TAP blocks and F8 sealer-through-upload byte-exact; original DAG/six environments/eight disabled actual jobs; scoped KEYLESS overlay; exact Source closure3196/prior3195/62WF/main. One run43392961036/1 failed8skip+2fail; first wrapper0/1/5unexecuted, ZIP16pass, Native0.

No Critical incident or actual Native exposure observed.

## F1 — Important: The negative controls mutate their own code.

The first B-needs match is on L241, before the actual dependency on L1919. The first environment match is in the validator on L101, before the first actual association on L740. The first AFW_EXPECTED_CASES=3 is in the controls on L243, before the real command on L1816. The clock mutation hits the adapter on L110, so its self-hash alone can reject the edit. Scope each mutation to an identified job and step, require exactly one target, and check that the intended field changed before invoking the validator. These are statically established defects. The run did not identify which subcase failed first.

Primary references: inactive deff87f240f4e33750b459168d54b80cd6d2d54c/.github/workflows/afw-finite-budget-qualification.yml at cited lines; F3 also protected World L962–965; F7 also BASE0479 F7 L1422–1426.

## F2 — Important: B persists verified pure evidence too early.

L2021 writes pure-assignment.json before verifyBudgetArtifact; the profile selection and materialization follow. L2351–2355 treats the file as sufficient proof. Failure in those later operations can publish purePassed:true and a primary failure of native_b/not_observed. Write the verified receipt after the whole binding step succeeds and require its successful outcome when projecting pure. Add a control in which the adapter checks succeed and the original verification fails.

Primary references: inactive deff87f240f4e33750b459168d54b80cd6d2d54c/.github/workflows/afw-finite-budget-qualification.yml at cited lines; F3 also protected World L962–965; F7 also BASE0479 F7 L1422–1426.

## F3 — Important: Reopening does not independently verify the reported peak or the fixed ownership identities.

L154 substitutes B.started_at + 780000 for the observation timestamp, computes a sweep, then discards its peak and publishes the supplied integer. A contradictory peak anywhere in 1..3 can pass. L151 accepts any nonempty ownership case name. The positive fixture actually uses positive and reduction, while the original World records positive_producer and reduction_producer. Capture one real timestamp with the successful inventory and carry it through an explicitly agreed private-only evidence field or authenticated sidecar. Recompute using that timestamp, require peak equality and publish the recomputed value. Validate the five actual case identities in order. Keep the polling deadline, protected clocks and public schema unchanged.

Primary references: inactive deff87f240f4e33750b459168d54b80cd6d2d54c/.github/workflows/afw-finite-budget-qualification.yml at cited lines; F3 also protected World L962–965; F7 also BASE0479 F7 L1422–1426.

## F4 — Important: The final verifier applies early-inventory rules and skips evidence on nonpass.

verifySeven accepts an absent, pending or queued receiver while the receiver itself is running. L306 discards sevenTerminal, so incomplete legacy observations become not_all_seven_success. L307 derives the refs to inspect from the public proof. All nonpass results have proof:null, so the five peer output assignments escape metadata reconciliation even when present in direct needs. Both Jobs lookups also use the run-level latest-attempt endpoint. Use the explicit attempt-1 endpoint, require the executing verifier and seven terminal legacy identities at final readback, and reconcile every available direct assignment while distinguishing missing evidence from observed job failures. Retain the separate optional-receiver rule for B’s earlier observation.

Primary references: inactive deff87f240f4e33750b459168d54b80cd6d2d54c/.github/workflows/afw-finite-budget-qualification.yml at cited lines; F3 also protected World L962–965; F7 also BASE0479 F7 L1422–1426.

## F5 — Important: The emitted receiver record conflates verified transport with producer failure.

L304 throws for a valid failed controls pair. L309 overwrites reason with invalid_evidence, producing the contradictory record observed in the run. Keep verified / none / strict_current_safe_pair, set accepted:false and fail the job. Also handle failures from receiverControls() within the bounded-record lifecycle. Currently they reach the L313 catch and emit only an unstructured marker. Add direct coverage of a verified failed pair and a receiver-control failure.

Primary references: inactive deff87f240f4e33750b459168d54b80cd6d2d54c/.github/workflows/afw-finite-budget-qualification.yml at cited lines; F3 also protected World L962–965; F7 also BASE0479 F7 L1422–1426.

## F6 — Important: The six control families leave mandatory decisions untested.

The key-scope check counts exact spellings across the file, checks only legacy jobs and does not associate each of the 26 bindings with its expected job/step. The F8 functional check tests only two text fragments. The state-table control never exercises the actual always() publication gates or skipped-step outcome mapping. The final control tests a positive suite pair via validatePair and verifySeven separately, bypassing suite verifyRoute and the final metadata loop. Move the real projection and final reconciliation decisions into the existing Source-bound helpers. Drive those same entry points with fixed inert inputs and targeted changes to guards, step outcomes, assignments, metadata and receiver presence.

Primary references: inactive deff87f240f4e33750b459168d54b80cd6d2d54c/.github/workflows/afw-finite-budget-qualification.yml at cited lines; F3 also protected World L962–965; F7 also BASE0479 F7 L1422–1426.

## F7 — Important: Artifact bounds drift across call sites.

B’s original peer ZIP download had a 20-second timeout. The shared reader sets 30 seconds, and B calls it for six archives. The adapter also applies B’s tighter 134283264 raw cap to every private metadata check and every assignedPrivate call, narrowing the generic ZIP3 domain specified as 136314880. Restore the B-specific timeout and select the limit by operation, retaining the separate pure and SAFE limits.

Primary references: inactive deff87f240f4e33750b459168d54b80cd6d2d54c/.github/workflows/afw-finite-budget-qualification.yml at cited lines; F3 also protected World L962–965; F7 also BASE0479 F7 L1422–1426.

## M1 — Minor

Several distinct checks occupy a single line, and the family-level catch discards the identity of the failed assertion. Give subcases fixed internal names and format the control bodies across multiple lines. A bounded KEYLESS diagnostic can identify the failing subcase while preserving the six-ID public DTO and excluding raw evidence. Controls L238–250.
