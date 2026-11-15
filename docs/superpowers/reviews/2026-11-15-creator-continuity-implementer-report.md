# CC1 implementer report — immutable Source DATA preparation

Logical path: docs/superpowers/reviews/2026-11-15-creator-continuity-implementer-report.md
Status: DONE for DATA preparation only. Actual full104/four-mutant qualification and review PENDING Root. Original delivery fix-loop remains CLOSED5/5; I3 OPEN. No old round6, rerun, or positive substitution.

## Scope and custody

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT isolated GitHub Source DATA; ORIGIN https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web; RESOURCE_TYPE immutable Git blobs/trees/commits; RESOURCE_ID current CLOSED74e3300cfbe47ee4986303befb1ee3c3d099fc77/tree2df6eee9e653f81d25fd248441c46fb238279b2d; ALLOWED_ACTION bounded reads and inactive proposal objects only; ROLLBACK abandon proposal objects. No refs, runs, PRs, Source execution/compilation, local files, clones, dependencies, Chrome, Cloudflare, OAuth, Native, OriginalCLI, Main or Core writes.

Requirements read: brief7b21d30379c29947d9abf669dfc8feeae2b5803a, normal descriptor8196e3948ccb053c5de9dd958c21b4002bb76820 and repository AGENTSb67942223e5633011573f2a2165489afd9ff3f67 stable318–347. Root correction: controls-schema.json8586d4387a5fcd95b18d7c966cf841432330a789 is the unchanged normal literal; historical5462c75c schema bundle is not substituted.

Normal raw origin remains sourceParent bfa80fac58ecb60bb3c9bcd458da6f393b301f70 / sourceParentTree d17f87ef49892e6a4c0ec50dd2436b0697b9f45f. New derivationCurrent74e3300c is separate overlay metadata. Raw purpose and original top-level shape are preserved.

## Exact behavioral change represented as DATA

Only lifetime.py gains the following line immediately after the unique original hook, before prctl and any post-hook creator() read:

```python
 # AFW_LIFE_BEFORE_ARM
 if os.getppid()!=before[0]:raise CreatorDead()
 need(libc.prctl(1,signal.SIGKILL,0,0,0)==0 and death_get()==signal.SIGKILL)
 need(creator()==before)
```

before remains the original validated creator tuple captured before the hook. A changed parent raises the existing CreatorDead; equality still reaches both original death-signal checks and the full creator()==before check. All fd4 mode/uid/access/link/start checks, seal/body/kernel coherence, role allowlists, FIFO, fd5 inheritable fix, identity and timing literals are preserved.

Four changed helpers are lifetime.py and its coherent copied kernel pins in delivery-entry.sh, controls-entry.sh, missing-cwd-entry.sh. Remaining29 helpers are byteexact normalR5, including normal controllers, lifetime probe, parents, proof, schemas, matrix, anchor and data. No diagnostic L05 overlay, fd7 private notes, fd10/11 cursor, taint decoder, or diagnostic instrumentation was ported.

Six extras were inspected: five changed (bootstrap prelude/program/entry and inactive/active F7); image-cleanup.py remains byteexact. Per-file reversible STRING DATA diffs cover all four helpers and all six extras, including the unchanged empty diff.

## Fixed overlay and bootstrap

SAME preserves the entire immutable old2471214B prefix, not merely an earlier normal prefix. The append is10612B and contains the unique AFW-CREATOR-CONTINUITY-DATA-V1 nominal overlay. The old AFW-R3-DELIVERY-SUCCESSOR-R5-DATA-V1 carrier is reused byteexact; no repeated160KB carrier.

The private bootstrap first validates normal raw/gzip/carrier and original origin. It validates the entire old prefix, exact appended suffix, unique section boundaries, and exact overlay text hash. Its transformation is closed: one literal hook insertion, the three fixed entry names and their one _r3_kernel line, then target raw byte/hash/blob checks and the complete canonical33 helper pins. The only overlay snapshot is the single fixed compressed kernel DATA object with fixed size/hash/base64 hash and decompression equality to the modified literal. No externally selected patches, paths or code, callback, caller parent PID, generic overlay/loader/patcher or new exception authority.

Bootstrap module copy decompresses to the exact fixed program; its prefix equals the fixed prelude. Both workflows embed the exact fixed entry. Inactive job remains false; no ref points to the inactive candidate. Active DATA retains the same controls-only job, environment, Node22.23.4, seven-minute ceiling and step Run declared full104 controls only, with exact one-use message AFW-CREATOR-CONTINUITY-CONTROLS-ONEUSE-20261115. Root alone controls any future activation/restoration of originalF7f7a71f1a0fa4f5ddf069ff411f008a098455e5cc.

## Real immutable objects and measured caps

Candidate commit e2df2beebaec3d7770958f122b63c4c1d041a50e; tree ff334b17340d9d62a674b1085a39cddfd6ab1430; sole parent74e3300cfbe47ee4986303befb1ee3c3d099fc77. API recursive-tree readback is untruncated and confirms exactly two changed leaves: F7fedb0b3d34bc8d4fc4097460732c01f771b1ad4f and SAMEf8bfa4f965f7a8fc6d4df55ed337ee77d1cae4ed. All3201 other leaves remain324448 canonical NUL bytes / SHA256aefb08c118db0e099833b8f1065779949be6bc8c1978eb828c26728ef0840703. Main0c9c475b3ebaa970fc11d628b40e50a90cceb727 was not changed.

| Artifact | Real blob | Bytes / cap |
| --- | --- | --- |
| resulting raw | f23fcfebf3c72632327cf24babf2ff7ace22dae6 | 487293 / 524288 |
| resulting gzip | 8c93b2980bbf5ea37fc927b049991fcd79688877 | 120228 / 131072 |
| resulting base64 mirror | a4c6a854a3d318e6d65505b5227ede5a4de3d769 | 160304 / 174764 |
| canonical33 helper manifest | 4f6d2738a0d116aaf8114fc4b5640110f6bafb03 | 5293 |
| canonical39 source manifest | 67e4898f68996a4b3f9310ca5b4c98244086d729 | 7625 |
| lifetime.py | 765573c5eeaf83add464e94a8240dcd7a90786d0 | 16073 / 32768 |
| delivery-entry.sh | 2477c393fbc7d9883894ef7299b4f749cc3857ab | 24013 / 32768 |
| controls-entry.sh | f0825d011a5e7942194a157a327ef7c42548180c | 24058 / 32768 |
| missing-cwd-entry.sh | 3666fdd52620bd2a30bfa3e100897b2fab1610c1 | 24130 / 32768 |
| bootstrap-prelude.mjs | decd33bf2bc63db3d3c891c6cbc5aeae2b69056b | 16503 / 32768 |
| bootstrap-program.mjs | 6997a425eca4b66309b51ea19db6597e13a8f262 | 42707 / 65536 |
| bootstrap-entry.py | 4a7aa3fdc3ed64a4c5887da7a9fd298335d1d667 | 30471 / 32768 |
| image-cleanup.py unchanged | 8b21083aa516439b63a6e99c059d82de76e8a443 | 1828 / 32768 |
| inactive F7 | fedb0b3d34bc8d4fc4097460732c01f771b1ad4f | 38484 / 73728 |
| active F7 DATA | cb3199f2a0e3f24096c73587eb8351ba63940250 | 38752 / 73728 |
| append | 6cd37ea3db9f11f4b1bfa0917b2fe40d8b1b5ca1 | 10612 |
| overlay JSON | 24de15b28ac076b448c0f375b2344e3d21464e99 | 10088 |
| full SAME | f8bfa4f965f7a8fc6d4df55ed337ee77d1cae4ed | 2481826 / 2600000 |
| preparation checks final | 3bdfdf8d04467919577f956c4f930aa28b0cecc1 | bounded JSON |
| reversible10-diff index | 547f48f00f096c8e621b0ff4985c44725e0f257b | bounded JSON |

Baseline raw f9c8261c54f761b5c33ddc370dbe7b308648033b /487208B/SHA256087bba2182c131579e233f6c29daf1ee85e2aae41e77b66d6f93cc44cb5000c5.
Baseline gzip b3dfc078047bee03b5b42140783ee1dcf2409fd8 /120211B/SHA2567e9aace1b1a3930a1a5234a2fdee5af68ebec77cc5b9818a6d342328047bf0e5.
Baseline mirror8e800f077e5bd620737e18faf3ac3465b15497cf /160284B/SHA256a0918aa0f77e8d88f498a05c879e9c60db1b5a5ec5929533741785a1a33e0b3d.
Target raw SHA256dda3f25ef82cdf4e65814360b52aafa9ddf3ec2e57d1fa2f92e46466acfcd25b; gzip SHA256f761c1e54084d88a6601f3d151181dc0d52a46b819c0fefb88ef1856612d404a; mirror SHA256dc5e46de4e92af13cf7a97115ad284b80f00673bb71704be858f52502ab9cfeb.
Old wholeprefix2fcd79c7d0a2475f176dc03360df5980a58c3120 /2471214B/SHA2561ba61ebb62514c1bb2e5b7b6058dd5abad09ddc1d059483987262032e154928a.
Full SAME SHA2562c76454307a963ae5ca8bf42346143e58cb6e0b0624850486b20f244bb1f2f42. Append SHA256cdfe4a0b495be82b9d2746a12f09a3cb24c100f940bb6cdbecaa0585f8a7fac5.

## Preparation verification and self-review

PASS DATA-only checks: canonical normal raw and all33 old helper pins; exact four changes; origin and frozen production18 byte preservation; original typed33/39 kind/cap preservation; all caps; compression roundtrip of three helper kernels plus bootstrap kernel and program; prelude/program and workflow composition; exact inactive gate and active one-use marker; ten forward/reverse STRING diff replays; exact wholeprefix hash; API candidate two-leaf readback; canonical Core inventory unchanged. No source syntax check, compilation, tests or process behavior was executed locally or by this implementer. Preparatory DATA checks do not qualify controls.

Spec self-review: the requested captured-original-creator predicate is the sole kernel behavior change; equality preserves all prior validation. Quality self-review: snapshot pins are coherent; fixed bootstrap validates tampering via baseline, prefix, suffix, overlay and target pins. The hash-bound snapshot is DATA, never externally supplied transformation authority. Source and operational evidence remain separate.

All104 IDs/order/skips and four mutants are unchanged. Exact killsets M_RAW[D02], M_PROVENANCE[P06], M_OUTPUT[B05,U01], M_ASSOC[S01]. No budget, timeout, cap, maxBuffer, expected result, public wire or strict Root387 receiver changes. Original private copy256MiB/chunk1MiB/cooperative15s retains its stated limitation: no D-state hard bound.

Root-verifiable readback commands (read-only GitHub API/data inspection; these are instructions, not executed Source tests):
- GET /repos/tokenizartinfo-ops/agent-friendly-web/git/commits/e2df2beebaec3d7770958f122b63c4c1d041a50e; verify parent74e and treeff334b17340d9d62a674b1085a39cddfd6ab1430.
- GET /repos/tokenizartinfo-ops/agent-friendly-web/git/trees/ff334b17340d9d62a674b1085a39cddfd6ab1430?recursive=1; compare closed tree2df6eee9, require exactly F7/SAME changes.
- GET /repos/tokenizartinfo-ops/agent-friendly-web/git/blobs/<each listed real SHA>; verify Git blob framing, bytes/SHA256 and canonical33/39 manifests.
- Verify fullSAME[0:2471214] hashes to old wholeprefix2fcd; remaining10612B equals append6cd37ea3; require unique normal carrier and continuity sections.
- DATA-replay all10 reversible diffs; decode every copied literal and verify exact kernel/program strings, original33/39 caps, origin and production18; apply the closed fixed insertion/repins to normal raw and require target f23fcfeb.
- Root then independently preflights Source DATA and, only under Root authorization, runs the actual declared full104/four mutants in GitHub and checks consumer104 plus strict Source/run/job/step SUCCESS joint receipt before review. RootOwn84aac8de9bb686d4130fbb46a1ca8bede1c943d6, Root38749c663f4dd58fbb5f1a3c940a3820c4ff5100 and jointa1c901bda145a0f24d9f25b0772731f1ab43dc86 remain applicable.

## Remaining concerns and claims

Actual normalR5 historical result remains103PASS/1L05FAIL/0unknown, regression RED. The consumed single observation supports wake yes/dead no and post-EOF compound fd4_type_owner/check_rejected only; it establishes neither individual failing operand nor historical cause/lifetime escape. Diagnostic I1 decoder scoped review is separate; conservative deferred minors were not added here.

Actual new104/four-mutant tests, strict actual receipt and scoped review remain PENDING. No operational qualification, Main integration, Native release or run consumption is claimed. No additional task/agent spawned.

historicalCauseProven=false; receiptAuthenticated=false; operationalReadiness=false; completePackage=false; PCoff=false; globalNativeDrainVerified=false; sdkNamespaceEmptyVerified=false.
