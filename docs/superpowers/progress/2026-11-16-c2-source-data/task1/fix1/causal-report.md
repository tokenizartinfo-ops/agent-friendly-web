# C2 Task1 fix1 · causal investigation and bounded diagnostic DATA

Status: SOURCE_TESTS_PENDING / SourceQualified=false.

## Observed failure, preserved

Read only the existing primary evidence95a2a6321ad5503fa9ca0c1ef447678889d6ee28. Original run43800561259/attempt1/job133079544014, head8b6dc45a1fb69d15b3d7863c8781635cb6aca461: locked install succeeded; Source step03:51:18–03:51:20UTC failed with only phase baseline-red/CAPTURE_INVALID and zero canonical receipt. Logs had already been read once by Root; this implementer did NOT fetch/refetch/replay logs or run. Closed lab9dc7703dfbe8a422858dc0c2626aa2f14c579adf/treec4c86968 and retired WF remain untouched. No branch/ref/tree/commit/run/PR/Core/Main/runtime change.

Applied systematic-debugging. No Source eval/import/compile/syntax/tests/files locally, no dependencies/builds/clones. Only GitHub bounded immutable reads and RAM string/JSON/builtin hashes. Product/test SourceIndexe20ae5a991a291004c3a8dde098031865c1e4c13 and all13 bodies stay EXACTLY frozen; no product fix is proposed from a timing hypothesis.

## Proven dependency defect, not an invented first observed error

The fixed runner8732cce3fb989eeafa7d30f895611a9f5c018654 archives only lib,worker,scripts,test,db,config and fixed root config files. It omits .github.

The active actual constructor is:
createFiniteCoupledOwnerWorld.open → initialEntryHarness('first-connection-publication') → compileFirstConnectionCandidate → bootstrapWorld.

Actual fixture bootstrapWorld blob02092a0ee7a5f566632ecd7ae461386d6bdde047 line9 unconditionally calls readFile(BOOTSTRAP.workflowPath,'utf8') before readFile(BOOTSTRAP.cliPath) and returning fixture data. BOOTSTRAP record8030ed7c405d4727d84a26ef8bafcb03c1a409d8 fixes workflowPath='.github/workflows/afw-finite-qa-bootstrap.yml', cliPath='scripts/run-qa-finite-bootstrap.mjs'.

The known immutable base tree62e78926635d6b74f288d6c0d69e0f2516306989 contains bootstrap workflow blob22f324e480dbe0295fe23fb7415328cba7952b1b,1844B,SHA256ff64a890db1b55f8ed922e036673ebaf0a494c4833023bbc3317f28c6ededd14. Read in full as DATA. Since target starts as a fresh mkdtemp and no fixture/runner writes .github, this path cannot exist in that runner materialization. Thus an exact required file-read dependency is deterministically missing if the actual constructor reaches that point.

This does NOT prove it was the first actual error in43800561259. The generic CAPTURE_INVALID could also hide launch failure, file-level load failure, parser/frame failure or counter validation. No attribution from two seconds alone.

The bootstrap workflow is DISTINCT from original I3F7 afw-finite-budget-qualification.yml (f7a71...). Neither workflow is executed by this proposal. Only the exact bootstrap file becomes data available under RUNNER_TEMP to the existing fixture hash reader.

## Other immediate reads/imports reviewed

- scripts/run-qa-finite-bootstrap.mjs e67e8fd7b3b530e852a520a0ea4b61e21d498d48,1305B is already covered by scripts archive. bootstrapWorld reads its text; it does not import/execute the CLI.
- initialEntryWorld active readFile calls consume lib/*.mjs including original material/lease/source/engine files; these are archived. buildMcpNodeProgram8bb56bb45bde5dbe7a440af3edd6c171dacd7a4c reads worker/mcp-node/server.mjs932754a046c0eb47da8b9a054c31ccaa6f87b699; it imports relative lib/mcp-node-http-server.mjs522fb817adb9504105ad81c3619a15d6086906d9. These nominated prefixes are covered.
- firstConnection fixture's onLoad reads worker/mcp-own/index.mjs and actual lib sources, covered.
- initialHistory74f9ca6470d596c0da1247bb9d9f464a80b9ec78 reads db/dossier-node-process.sql and db/dossier-monitoring-consent.sql, both under archived db.
- The actual imported budget helper's descriptor JSON is within test/fixtures and covered. No budget logic/history was executed or changed. Static inspection of imports/data reads is not a proof of every transitive package/runtime dependency.
- Dependency installation success alone does not prove a native child launched. No other missing file is demonstrated by the available evidence; no other materialization/product change is included.

## Minimum material change

1. Add ONLY .github/workflows/afw-finite-qa-bootstrap.yml to the same fixed archive argument list. After extraction, require exact1844B/Git blob/SHA256 above. No broad .github copying, workflow execution, token, permissions, live provider action or dependency upgrade.
2. Retain old runner8732... and WF80b2b1428fee9065cbc9385b655f10c6ef3ebb3e as complete before preimages. New runner/WF use Root-nominated lab/afw-c2-source-20261116-t1-fix1 and AFW-C2-OWNER-STAGES-SOURCE-T1-FIX1-ONEUSE-20261116. Base6791/tree62e and SourceIndex/hash remain unchanged.
3. Before main baseline, import and call the ACTUAL existing bootstrapWorld() once from a fresh empty cwd inside the same keyless network-isolated child. Only actual ENOENT for exact BOOTSTRAP.workflowPath passes the dependency absence control. Unexpected success/error or extra stderr/output fails closed. It does not count as any of20 Source cases and cannot stand in for baseline connection/OAuth success. Corrected materialization then permits unchanged actual main tests to run from their proper cwd.
4. Preserve the existing acceptance predicates. Add only bounded static diagnostic observation at existing launch/TAP/frames/counters boundaries. Source bodies, test assertions, clocks, case IDs, three modes,11 selected regressions, receipt schema and meaningful qualification are unchanged.

## What the new diagnostic discriminates

- launch: native status/signal/spawn-error class, actual captured bytes/hash or unavailable. Missing/denied command, timeout, buffer cap, abnormal signal and invalid native result no longer collapse into an unlocated catch.
- TAP: known native result count, first failed known ID if actually observed, and whether the fixed Source test file itself failed. No raw test names/paths/output/assertions are published.
- frames: count of observed known Source frame markers plus strict existing canonical parser checks. Missing/unrecognized/extra/malformed frame never becomes a case outcome.
- counters: current strict actual-counter schema/range/order checks. Null/unavailable initialization counters cannot be invented as zero or copied from another case.
- Bounded marker kinds ENOENT/module-not-found/assertion/syntax are only whitelisted literal observations from captured TAP, not authenticated root-cause claims. Native exit metadata and hashes remain diagnostic, never global physical settlement.

Entire diagnostic frame<=2048UTF8B (new nominated diagnostic cap; existing capture/receipt/product limits unchanged). It contains enum phase/frontier/code, bounded native exit/signal/errorKind, bytes/hash stdout/stderr, and known IDs/counters only when observed. Otherwise null. Cleanup resets capture so a prior child's data is not attributed to cleanup failure. No error.message, stack, assertion, arbitrary path, TAP, cookie, nonce, header, JWT or private body leaves RAM.

The separate dependency-control record is canonical, bounded<=256B, forwarded only from actual validated child output. It is a named diagnostic observation, not a fake Source case or positive fallback receipt. Any diagnostic/error or failed absence control blocks qualification. Successful Source receipt remains impossible unless unchanged actual red/green/mutant/regression predicates pass.

## Pending gate and remaining uncertainty

Root must review/admit exact schema, runner/WF identities, fixed dependency hash, new branch/message and inherited triggers before ONE new material head/attempt1 occurrence. No same-head replay is requested or authorized here. Maintain7min job,330s runner,32MiB archive,1MiB/64KiB captures,24576B Source receipt, fixed Node22.23.4/SDK1.2.1, sudo env-i/unshare+lo guard. Small negative read control shares the existing budget; it does not expand a product clock.

The new observation can prove where a remaining startup/capture/Source failure occurs, or allow actual unchanged Source qualification to proceed. It cannot retroactively recover raw observations from43800561259, prove the first actual error there, repair a product by inference, or authorize live/native operation.

All seven remain false: historicalCauseProven,receiptAuthenticated,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified.
