# Complete inspector preparation review — inactive

Candidate954bcbcc/WF97b37fec/report6f1a0604. Same independent reviewer read the full current workflow and integration, with no execution/key/payload access.

I1 framing/literal locator, I2 all-four readiness/UNKNOWN skeleton gate, I3 unique TAP record/immediate diagnostic association and I4 exact scalar/hash union are ADDRESSED. Final source ranges:148–153/409–414;528–533;187–203;500–510.

## Open Important findings — verbatim
**Important — un timeout explícito puede acabar en un job verde.** Si proyección y limpieza terminan, pero el tiempo combinado supera 15 segundos, el driver persiste `status:'rejected'` y `failure.reason:'parse_timeout'`. Las fases pueden seguir siendo `projected` y `complete`. El publicador usa esas fases para emitir `inspection-valid=true`, sin comprobar el rechazo ni el tiempo, y el gate terminal acepta ese valor. El resultado seguro de fallo debe poder publicarse y dejar la inspección fallida.
Evidence: workflow333–339 and545–549.

**Important — el readback comprueba el formato del digest, pero no su correspondencia con la subida.** Verifica ID asignado, nombre, run, revisión, rama y ventana de retención. Cualquier digest con formato `sha256:` y 64 dígitos hexadecimales satisface la condición. Compararlo con `steps.artifact.outputs.artifact-digest` completaría la comprobación con el mismo GET de metadatos. El límite de 64 KiB de esa respuesta también se comprueba después de haberla cargado entera.
Evidence: workflow569–585.

## Minor observations
M1: four authentication-gate tests overlap because every mutant also sets failureIdentity.verified=false. Current validator is correct, but these tests cannot independently catch deletion of ZIP/auth/inventory checks (391–399).
M2: invalid business-counts JSON is rendered as missing through projectCounts(null), losing useful distinction while values remainunknown (324).

Root ruling: I5/I6 enter one scoped fix round. The guard-regression coverage in M1 is already required by brief6d184914, so fix the tiny fixtures within this round: one gate false at a time, other gates admitted. M2 is nonblocking/deferred and must remain visible to final review; it must not extend this loop.

The exact artifact/ZIP size+digest, original1978/432292/1/consumer-failure context, protected helper, order before key and two-file public publication were statically correct. Fifty-nine controls remain UNEXECUTED and original RcauseUNKNOWN. Keep PREPARED_UNQUALIFIED.
