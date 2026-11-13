# AFW — sanitized observations at failing SYN boundaries
Status: proposed diagnostic design, NOT Source/run release. Parent request is AFW "ok, continua": chain useful work toward an eventual PC-off trial. No Hermes/Tokenizart scope.

## Evidence and result
Closed Source b5873e87d1f00ad10985171959e93015bc6045e3; main remains 0c9c475b3ebaa970fc11d628b40e50a90cceb727.
Historical run43477409062/1: contracts passed; positive native raw outcome failed (producer-failure); reduction prepare raw outcome success; readonly raw outcome unknown. Readonly seal failed and two producer own_metadata composite steps failed. REST post-continue-on-error conclusion does not prove raw outcome. Current zero-key run43488583034/1 accepted both retained outer archives and 25 controls: this does not identify the historical failing substage.
Goal: obtain bounded observations of actual native outcome and failure location/code without exposing log text, private values, envelopes or masterkey. No speculative behavior fix or raised caps.

## Approaches and Root decision
1. Blind repeat: rejected, no materially better evidence.
2. Decrypt retained archives under a new one-key forensic role: rejected for now; introduces new key role and still cannot recover readonly's missing archive.
3. Add a small zero-key sanitizer to the existing SYN workflow, qualify privacy/compatibility first, then separately release one materially instrumented original whole-suite attempt. Recommended/selected under owner's continuous autonomous-work instruction.

## Frozen boundaries
Existing Source four programs A/C/V/Z remain byte exact: A62999/d76ca29a35725fcee1b8858ebfafce003679a6b62362f76a34fe288c5a7a24d9; C63195/a41c417ea624e1a277f326356c8c95184ed7e24cfa42dab32decd731b970f612; V15099/94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf; Z13305/b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d.
Five protected test/World/custody/lock blobs unchanged. All original 8 jobs/needs/timeouts/Native commands/26 cryptographic key placements/6 environments/clocks/caps/concurrency unchanged. No key to the sanitizer. No new environment, secret, outbound sink, native capability or runtime deployment.
Root/executor may inspect only public source, metadata and specifically assigned SMALLSAFE, never native/contract logs, private archive bytes, models or values. Sanitizer operates on private runner files ONLY inside GitHub.

## Proposed integration, pending builder proof
Add fifth small source-carried helper D, independent hash gate before import; no changes to four frozen programs. In positive_prepare/reduction_prepare/readonly add summary_pair + summary_upload near final assertions, using existing registered step.if expressions and safe-id/safe-digest output forms. Existing verify toJSON(needs) should expose only assigned safe IDs/digests despite failed producer jobs; no separate public raw log.
D gets raw native outcome through existing env.NATIVE_OUTCOME form. Exact source validates approved job and provenance. Read only fixed native-private/logs/{command-output,seal-custody,own-metadata}.log, no CLI/env path override. If manifest needed, project only literal raw outcome, never copy its content.
Return current context, job, raw outcome, fixed stage enum, bounded code enum or unknown, and at most fixed public source aliases + source-range-checked line/column. Never message, stack text, absolute path, assertion actual/expected, variable, ciphertext or private name. Stack/code observations are untrusted hints, NOT authenticated root-cause proof.
Regular file, no symlink, nlink1, before/after same inode/size/timestamps; fixed <=64KiB tail from <=1MiB regular file; oversize/missing/race/malformed/unknown => typed unavailability, no retries. Read failures must not weaken or convert original job outcome. Diagnostic pair <=16KiB combined, fixed closed schema/canonical JSON/hash manifest, assigned bounded artifact.
Collector must not inherit AFW_SYN_CHECKPOINT_KEY or GH_ARTIFACT_TOKEN, use network, call World/SDK/Native/AES or execute source logs. Public alias/line allowlist derives from pinned public source only; builder settles minimal exact code enums and frame grammar.

## Qualification and release separation
First task: implement sanitizer, meaningful privacy/failure fixtures and static actual A.validateKeyScopes against integrated 8-job candidate in a zero-key GitHub qualification. No masterkey reference in executable qualification role. Temporary F7 carrier remains closed/manual until Root's independent exact readback and separate one-use release. Restore original F7/tree and append only same report.
Second task only after reviewed qualification: inactive original8 candidate plus D integration, Root independent exact source gate, one-use whole native attempt. Never rerun consumed runs; Source freeze until all declared jobs terminal; restore full preunit tree then append same report. A stage failure is not business acceptance.
All seven diagnostic/readiness flags remain false. Even a passing SYN suite does not prove real AFW notice/review/withdrawal/autoclose, autonomous trigger or PC-off.

## Builder questions
Prove actual frozen decoded key-scope AST admits this addition without changing A/forms, including dormant fifth helper and added outputs. Can existing verify safely surface assignments for failed jobs? Does real source use the proposed fixed files and preserve diagnostic access after failure? What smallest implementation gives exact failed-boundary hints without exposing data or changing crypto/Native timing? Prefer a smaller design if source constraints require it. No implementation or run under this document.
