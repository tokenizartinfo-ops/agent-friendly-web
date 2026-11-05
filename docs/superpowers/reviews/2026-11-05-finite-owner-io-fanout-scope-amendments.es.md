# I/O fanout — approved test-fixture scope amendment

5nov2026. Requirements amendment to brief at executionBASE51c5db8e987755ccf2819ba861461916e0396943. Root granted this source/test-only exception while same sole writer implement_owner_io_fanout remained active. Not an operational permission or new source unit.

## Additional allowed file

test/fixtures/finite-owner-phase-context.mjs ONLY the following two constructions in the accepted derived phase fixture:

1. Enrollment timestamps: sample actual Date.now once for issuedAt; set deadline=issuedAt+5000. Preserve actual native clock, exact codec and every source field/limit. Original code issuedAt:Date.now(),deadline:Date.now()+5000 can exceed the codec5000delta by crossing a millisecond. Original failing values were not logged, so causal explanation is source-inferred, not a measured original5001delta. This is distinct from the measured fanoutRED child5001ms.
2. Invocation-local one-response latch in the DERIVED phaseContextRead test fetch hook, gated ONLY to held-fetch/held-body/held-cancel modes. First actual response follows original hold/read/cancel behavior; sibling uses its original unmodified response. The inherited single-release controls and actual-work-settlement/foreign-root assertions remain. Never earlyreturn/bypass othermodehooks. Use exact-one source marker checks. No generic queue API/new RPC/drain claim/sourceguard change. This preserves old one-held-operation regression intent while new fanout tests independently qualify dual lifecycle retention.

No other changes to this file or its normal semantics are authorized by this exception. Source initial-lease/stage-work/store/requesthelper/SDK/guards remain unchanged. No cache, reordered snapshots, reduced read, changed SQL clock or public capability.

## Evidence / bounded continuation

At745fc2a, Actions42048550578/job127318088611: full SDK57PASS0FAIL0SKIP, including23fanout cases. Subsequent adjacent180scommand timedout124 after53PASS1fixture-setupFAIL across54completed phase cases; schema next was in-flight. Root read primary logs. Single-samplefix approved; failed owner case now reaches intended source/second-read ownerdenial.

Remaining-only051b3fa/Actions42051365596/job127328018113: phase27completed24PASS3FAIL0SKIP. Three original held fetch/body/cancel cases report actual work did not settle; concurrent credential siblings overwrite one inherited callback slot. This is test-helper incompatibility with the new concurrency; retained work staying occupied is the source contract to preserve. Root selected one-response latch because the old regression's intent is one held operation and dedicated fanout hostiles exercise siblings. No relaxation of the real-settlement assertion.

Continue only these3failed cases + one final uninstrumentedSDKpositive covering sharedseedfix + six unstarted affected files. Keep prior57SDK/53phase/24remainingphase evidence; do not fabricate all-one-head fullpass or repeat them merely for report formatting. The earlier0463cdb qualifier failedYAML beforejobs; jobs[]/0native0compiler is an infrastructure receipt, not productRED. Corrected bound/regex qualification only, no productclockchange. Exact final count/report must disclose a possible unlogged in-flight compiler in the timed-out phase case rather than invent precision or rerun for counts.

Root sends final review this amendment alongside complete BASE..HEAD scope. Later wholebranch CI remains separate; current operationalReadiness=false;completePackage=false;PCoff=false.
