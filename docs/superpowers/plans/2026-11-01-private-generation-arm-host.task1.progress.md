# Task1 — private first-generation ARM host
Project AFW; repository tokenizartinfo-ops/agent-friendly-web. Source-only branch feat/private-generation-arm-host-20261101; base79a850af6e71ef1beb9fd06c93a9d7f58854ff05/tree616b9c433702ab8748d1ffdd52ce0498afbf26ea.
Production host remains UNMOUNTED/unimported. No configuration, entrypoint, HTTP mode, existing preparation or ledger changed.

## Evidence
- RED389889928e4b011edfe9a893148e43bca2e66297/treea4f64fcdd9405a632aa1419192631e9f918cb923: Actions41292933577/job124807758244,45tests/0pass/45fail. Expected missing_host/function assertions, before source.
- Native REDcb6ca61e1c4ec5a562e4eb367c51e68628e16654: Actions41293002829/job124807967056,51tests/0pass/51fail, before source.
- First source GREEN6852a6b3d695ab8703e45aa7275c38675c2e145a: Actions41293121445/job124808314697,51host+nativePASS and169existingPASS,0FAIL/0SKIP. Focused lint0errors/1test-fixturewarning, corrected subsequently.
- Additional directed late pending/armed commit ACK, clock exhaustion after armed commit, final settlement drift, one-shot concurrency, native getter rejection and remaining budget cases added in bb813eaf4cde1bdbcbeaf4a351992ead5a3d7c66; final verification pending.

## Qualification boundary
Actual existing material/original/historical/eligibility/fixed HTTP adapters and ledger are composed. Native fixture executes real isolated DO transactions and separate D1 databases, including actual global reservation and current-grant revocation after pendingCAS, abort and lost pending/armed ACKs. Native invocation, namespace identity, version metadata and provider HTTP responses are SYNTHETIC. No external module/source/config provenance, Workflow-origin, cross-RPC monotonic lease, physical cancellation, nominal authorization or PC-off proof.

No local source/temp/build/clone/dependencies; source blobs through GitHub and tests in secret-free Actions only. Branch-only .github/workflows/afw-private-generation-arm-source.yml MUST BE EXCLUDED from root final composition. Parent will compose reviewed Task1 blobs onto newer main (stored-reader PR706 independent), then fresh review/fullCI/packages/frozen315/exact-tree acceptance. No rebase, main merge or runtime mutation here. operationalReadiness=false; owner unavailable before12:45UTC.
