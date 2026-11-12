# Receipt inspector — partial preparation review

Candidate550051af7b7211db2915fe0644db03d89c2fd9ec, workflowe2b517dc, reportae020f10. This checkpoint is PREPARED_UNQUALIFIED, manual/disabled, with no job, artifact download, key use or decryption. The independent reviewer inspected the current decoder/parser/schema while the driver, fixtures and publication were still being built. This is not whole-job approval.

Open findings:
1. Blocking framing/generation: workflow148–155 places the closing heredoc inside sourceCandidate's RegExp. Replacement-text metacharacters injected CORE/comments/suffix into the program. The path escape also replaces the matched character incorrectly.
2. Important authentication gate: validatePublic229–241 admits derived case facts with innerInventoryVerified:false, and admits non-null derived fields in unauthenticated outputs. Every derived field must remain the complete UNKNOWN/null skeleton unless all cipher/auth/inventory/failure-identity gates pass.
3. Important TAP attribution:191–203 tracks only R names, permitting duplicate TAP numbers across distinct cases or wrapper/case records. Pending association survives unrelated lines and can attach a late block to an earlier case. Ambiguity must reject or becomeUNKNOWN.
4. Important scalar union:218 admits known:true/type:boolean/value:7, contradictory unknown/null variants, array hashes through regex coercion and incomplete byte/hash pairs. Validate exact typed unions and strict string digests.

The writer acknowledged all four and is applying callback insertion/final byte framing, fixed literal path scanning, full readiness gating, strict record association and exact scalar unions. Inert CURRENT-code negative fixtures are being added for all findings. None has been executed yet; no claimed fix verification. Final review must cover actual completed code, all drivers, fixtures, timeouts, cleanup and publication.

Partial positives: decoder checked exactly three names, local/central ranges, sizes and CRC; inner identity used the original failure manifest. These are static observations, not authentication of the actual payload. R1–R3 cause remainsUNKNOWN.
