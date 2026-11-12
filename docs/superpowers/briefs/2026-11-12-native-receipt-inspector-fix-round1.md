# Inspector preparation — fix round 1/5 and one keyless covering check

PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT keyless GitHub Actions checks only; ORIGIN feat/finite-native-cleanup-20261101; RESOURCE_TYPE scoped inactive diagnostic workflow; RESOURCE_ID FIX_BASE954bcbccf4f9a66655598addaa9b69cbd8213585/tree9a003dc17d68c1f2524e39af4cd5fe986ce43f71. Same original writer, only workflow+appendreport, all3188otherblobs/modes unchanged.

## Findings to fix
**Important — un timeout explícito puede acabar en un job verde.** Si proyección y limpieza terminan, pero el tiempo combinado supera 15 segundos, el driver persiste `status:'rejected'` y `failure.reason:'parse_timeout'`. Las fases pueden seguir siendo `projected` y `complete`. El publicador usa esas fases para emitir `inspection-valid=true`, sin comprobar el rechazo ni el tiempo, y el gate terminal acepta ese valor. El resultado seguro de fallo debe poder publicarse y dejar la inspección fallida.

**Important — el readback comprueba el formato del digest, pero no su correspondencia con la subida.** Verifica ID asignado, nombre, run, revisión, rama y ventana de retención. Cualquier digest con formato `sha256:` y 64 dígitos hexadecimales satisface la condición. Compararlo con `steps.artifact.outputs.artifact-digest` completaría la comprobación con el mismo GET de metadatos. El límite de 64 KiB de esa respuesta también se comprueba después de haberla cargado entera.

Root accepts both. Keep current timeout/rejection semantics; do not loosen/remove a deadline to get green. The final inspection-valid decision must require actual accepted status, no failure, all integrity/identity/readiness/phase and cleanup conditions. A schema-valid rejected receipt may publish safely but must fail the job.

Compare the exact same assigned artifact's remote digest with the validated upload action digest (normalize the known sha256 prefix explicitly, never coercion). Enforce the64KiB metadata response cap while streaming, before accumulating/parsing, under the fixed request timeout. Same singleGET, no retry or artifact payload readback. ID/name/run/head/ref/retention checks remain.

Ruling M1: fix current guard fixtures to fail exactly one of four readiness gates while the other three remaintrue; exercise non-null derived fields against that single missing gate. This fulfills the original required independent negatives, no feature expansion. M2 counts-invalid-vs-missing remains recorded minor/deferred; no new changes for it.

## One keyless controls job before re-review
Original brief prohibited any actual ciphertext/key before review. Root now authorizes ONE NEW keyless controls-only attempt1 <=2min to verify the amended code, not the receipt inspection.
- Add current-code regressions for rejected parse_timeout with apparently completed phases, other non-none failure, matching/mismatching/malformed digest, and streamed metadata over-cap. Test the SAME final-verdict/readback helpers used by actual publication/readback, not a mirror predicate.
- Preserve original exact954 counterexamples as read-only RED facts. Prefer finite paired old/current predicate checks tied to pinned source; if only static RED is available, label it STATIC and never claim executedRED. No additional job beyond this covering entitlement.
- Run all current inert fixtures with an exact declared count/ID inventory, current decoder/parser/schema and new regression checks. No actualAFWSource import, SDK, I0, native work, private artifact, originalAAD opening, production API or key.
- The temporary controls workflow must contain NO environment/secrets/key references, and must have only one scoped Source-push/attempt1 controls job. Execute current generated code+fixtures; do NOT include or execute download/open/project-original steps. Code used by fixtures matches the final prepared inspector apart from mode/guards and the explicitly untouched real-data integration.
- Publish only closed controls result+manifest (counts/knownIDs/hash-only failure), purpose clearly labelled CONTROLS, not original Rcase evidence. RawTAP/code/logs private. AssignedID/digest/complete safe inventory readback required; no raw or native payload.
- Freeze controls SHA through terminal. Any unexpected failure: preserve safe proof, restore EXACTsafe f7a71 complete7manualfalse/report/readbacks/zeroactive and STOP. No repair/retry.
- Allpass: reconcile the COMPLETE amended receipt-inspector workflow MANUAL/noinputs/noPush/jobfalse, not just a controls-only skeleton. All original real-data drivers/59+named checks/publication/readback must be present. Preserve code equality for covered helpers, append commands/output/counts/IDs/limits/sections-not-executed, full ref/tree/protected scope/zeroactive, thenSTOP.

The original encrypted readonly receipt remains untouched. No real inspection/key/decryption or Native16 retry is authorized. Root will build FULL954..final scoped re-review for I5/I6/M1 and new breakage. Only a clean independent result can lead to a separate single actual-inspection release.
