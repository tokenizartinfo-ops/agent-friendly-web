# Closed QA cloud admission and writer queue
2026-11-01 · source preparation, no live lifecycle handler

Read-only cloud acceptance remains issue497#6553342931: main0efb6f1, command6553225480, Actions41271895208,25GET/closed at04:08:46.798UTC. The PC was on.

This first implementation block adds ONLY exact owner admission for the separately named future /afw-qa-deploy-observe-restore command, original nominalN1/cleanupR1 clocks, and a fixed GitHub append-only once-only claim helper. No workflow listens for that new command yet. No Cloudflare transport is added. Claim metadata never grants owner-data or effect authority.

IntentH includes domain/repository/comment/source/createdAt, excludes runID. The helper consumes before POSTing one refs/tags/afw-qa-closed-rollback/H at the exact source. Duplicate/403/network/timeout/unknownACK never refund it. Claim receipt must match exact ref/type/SHA; unrecognized or late replies cannot authorize the later controller. Independent cleanup checks retain the original wall and monotonic ends even after nominal failure; clock rollback poisons both.

The existing closed rollback writer now uses queue:max with cancel-in-progress:false. Official GitHub docs checked01Nov describe up to100 pending runs without replacing the previous pending run: https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency . A new secret-free pull_request qualification job exercises that exact queue syntax in Actions. It does not dispatch the historical consumed restore workflow. Default ordering or a queue does not guarantee restoration or protect against external editors.

Design treea636deff independently reviewed0P1/P2. Initial RED CI41274006145/job124752370724: sealed14PASS; focused1089PASS/17FAIL for absent positive admission/claim/clock implementation and absent queue qualification file. Negative cases passing on a missing API are not guard proof; require positive/negative GREEN with implementation. Three additional concurrency/monotonic/noncooperative transport tests follow.

Next block: reviewed fixed deploy/observe/restore controller with separate nominal/cleanup transport, finite effect counters, primary ownership checks, retained ACK uncertainty and independent final closed readback. No new live intent/claim/token/OAuth/Max/PC-off accepted by this source change. Owner unavailable until12:45UTC; do not request intervention before then. OperationalReadiness=false.
