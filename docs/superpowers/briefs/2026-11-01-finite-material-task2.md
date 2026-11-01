# Task4B Task2 — fixed finite package resolver and bounded archive
SOURCE ONLY. No subagents. Read this first; requirements are the revised bootstrap correction/Task2 plan at source9304b0b0 and subsequent Task1 exact exports. Do not read full prior history.

## Scope and exact interfaces
Implement lib/mcp-qa-finite-package.mjs:
resolveFiniteNativePackage({sourceRevision,githubToken,fetchImpl=fetch,now=Date.now,signal}) -> immutable {build,manifest}.
Fixed public repository tokenizartinfo-ops/agent-friendly-web, ID1347578006. No caller repository/workflow/URL. Only read operations, existing GHA opaque token transport, never print token or signed URL. Validate exact40-lowerhex sourceRevision and bounded opaque credential, not a provider prefix format. A lookup result is factual source evidence, not runtime authority.

Source-qualified manifest interfaces now provided by lib/mcp-qa-finite-seed.mjs:
validateFinitePackageManifest, encodeFinitePackageManifest, hashFinitePackageManifest (shared domain afw.finite-native-manifest.v1\\n).
Reuse those helpers; do not copy canonicalization. The five role modules are qaLive,qaClosed,canaryLive,canaryClosed,operatorClosed, each index.mjs/max3145728 bytes. Role-specific source/tree stays distinct; historical operator is NOT relabeled current M. Structural assertions do not prove profile semantics; actual builder/qualified profile remains4C.

Create scripts/verify-qa-finite-archive.py using Python standard-library zipfile, invoked by bounded Node subprocess. No new dependencies. Fixed archive layout EXACT six files: manifest.json + each of the five <role>/index.mjs. Reject absolute/traversal/backslash/NUL/duplicate names, directories/symlinks/nonregular entries, extra files, encrypted/unsupported content, CRC errors, inconsistent or overflowing declared/actual expansion. Read/stream without extraction or module execution. Cap archive64MiB, expanded128MiB,64entries; tighter actual exact-six/module/manifest limits apply. Return only parsed canonical manifest plus hashes/sizes, bounded output; never print module bytes/paths outside fixed layout. Validate duplicate/noncanonical manifest JSON, strict codec semantics, each hash/size and primary digest. Root engineering call: archive transport only in GHA, not Worker.

## Fixed primary lookup
Workflow .github/workflows/afw-finite-native-package.yml, artifact afw-finite-native-package-<M>.
Only exact head M/main/event push/completed success/attempt1 from same repository and source-qualified workflow. List at most two100-run pages; require complete pagination/consistent totals/unique entries and EXACTLY ONE eligible run. Validate actual workflow path and committed workflow bytes/hash at M, actual source-tree primary, not caller assertions. Exact run artifact listing <=100 and complete; EXACTLY ONE unexpired exact-name artifact, correct run/repo/head, available sha256:<64hex> provider digest. Missing future workflow/artifact means unavailable, not fallback to closed/named packages; no build/rebuild dispatch.
Return build exact keys workflowPath,runId,attempt,artifactId,artifactName,artifactDigest,manifestHash as specified by codec; manifest must match M/tree/workflow and file bytes.

Download only the exact selected GitHub artifact API endpoint. Follow only the legitimate provider artifact redirect with HTTPS/source-validated host/path limits; no arbitrary caller URL, no redirect loop, no Authorization forwarded cross-origin, no signed URL in error/log. Use short bounded fetches/subprocess and parent abort; all time counts and any unknown/overflow/rate-limit/timeout fails closed. Use real bounded ZIP parser in tests, synthetic network only.

Modify lib/mcp-qa-finite-source.mjs ONLY to expose concrete package resolution at seed-material phase with explicit existing GitHub transport parameters, returning {build,manifest}. Other full material phases remain unavailable until4C. Do not fake a runtime plan or implement seed issuance/adoption in this task. Concrete package resolver cannot be a placeholder or injected success callback.

## TDD and evidence
Create test/mcp-qa-finite-package.test.mjs + test/finite_archive_test.py. Meaningful hosted RED then GREEN:
node --test test/mcp-qa-finite-package.test.mjs
python -m unittest discover -s test -p 'finite_archive_test.py'
Tests use REAL ZIP bytes through ACTUAL Python subprocess: zero/two runs, wrong source/event/main/path/attempt, overflow/incomplete/duplicate pages, expired/duplicate artifact, missing/bad digest, wrong manifest/tree/workflow/hash/module, private/extra manifest fields, historical role relabeling versus qualified source evidence, traversal/symlink/duplicate/CRC/bomb/extra archive file, native abort/timeout, credential non-forwarding and sanitized errors.
Also test the source constructor actually invokes this resolver, with no fixture fallback. Scoped ESLint and Python compile (cloud only); no full suite/repeat4A. Temporary branch-only qualifier no secrets/excluded integration. Do not leave a source-only fixture artifact presented as a live finite package.

## Constraints/report
Cloud GitHub/Actions only on existing isolated finite branch, CAS exact lease, no local files/deps/build. No CF/private/provider probe, live command, deploy, credentials/roles/OAuth/DDL, main merge, real occurrence or Max. Preserve original clocks/windows/fences and accepted changes.
Report docs/superpowers/reports/2026-11-01-finite-material-task2.md with BASE/code/docHEAD, exact hostedRED/GREEN/run/job/counts/commands/lint, source-only limitations. Append existing progress. Stop branch writes and return DONE/concerns for root's fresh review. 4C package production/profile/full native producer and Task5 remain pending; operationalReadiness=false.

## Root source-provenance ruling (Task2 implementation)
Task2 qualifies the exact package origin and committed workflow source at M, each descriptor's actual Git commit/tree, and archive bytes. This does not establish semantic authorization of a role. For this fixed trial operatorClosed.sourceRevision must differ from M; relabeling it M fails closed. No guessed historical expected hash/path or future receipt is introduced. The approved frozen operator/canary/QA provenance receipt, actual builder semantics and full profile qualification remain explicit Task4C gates before any package is eligible for live use. An absent finite build workflow or artifact remains unavailable. Synthetic primary-shaped workflow/ZIP fixtures are test inputs, never a live package or authority.
