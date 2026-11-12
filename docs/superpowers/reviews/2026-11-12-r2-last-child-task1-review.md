# Task1 independent implementation review — 0 Critical / 1 Important / 1 Minor

Reviewer /root/bounded_plan_final_review (same Astra/xhigh preflight reviewer), full Task1 range2957681e..6c4b13c2, package606b525f. No Source/private/runtime changes. Task2 HELD.

## Important — binding legacy R2 oversize negative is shadowed

Verbatim reviewer finding: «En complete_partial, la prueba sustituye la fila R2 por oversize y conserva el certificado anterior con estado present. Esa contradicción basta para rechazar el resultado, de modo que la prueba seguiría pasando si desapareciera la protección contra exceso de tamaño en R2. El código actual sí comprueba ambas filas. Para cerrar el hallazgo, usar el certificado canónico not_examined y verificar que productor y verificador aceptan el mismo resultado parcial con missing o invalid y lo rechazan con oversize, regenerando el manifiesto en cada caso.»

WF6c4b13c2 line846 vs validateLastChild606–607/668; legacyC4 line794. This is a promised qualification gap, not an observed production logic defect. Reviewer verified semantic feasibility, enum projection, single parse, rejection sanitization, time/cleanup/current identity and seven shared body equality; logical12-hunk patch and119-line report reconstructed.

Root ruling: binding SPEC requires retained negative assertions. ACCEPT Important. Fix round1/5 must repair SAME complete_partial control with coherent R2 certificate and comparative otherwise-identical missing/invalid/oversize cases, real producerTransportAccepted/validateSupplementPair and fresh manifest. No production logic change warranted. Current prior KEYLESS permit consumed; this code change justifies a DISTINCT explicitly bounded qualification permit, never replay/repair under old permit.

## Minor — deferred, must reach final review

Verbatim reviewer finding: «Las pruebas positivas entregan al coordinador un resultado construido en memoria. La única llamada de prueba al lector real de ambos archivos usa un R1 sobredimensionado. Una pareja sintética válida en disco cubriría el paso del certificado R2 desde el lector hasta el coordinador.»

WF808/821/837, reader713. Task1: minor (deferred): positive real fixed-file R2→reader→coordinator seam fixture absent; current actual projector/reader/coordinator contracts and guards reviewed, no defect observed. Minor does not enter fix loop or widen its diff. Final whole-plan review must triage it before any downstream Native promotion. Task2 sole read-only Original projection remains separately held; no readiness inference.
