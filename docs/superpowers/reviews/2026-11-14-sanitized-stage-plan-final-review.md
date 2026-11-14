# Revisión final del plan AFW — 2026-11-14
Reviewer: /root/stage_diag_final_review, gpt-6-astra/xhigh. Solo lectura, ningún objeto/ref/Source ejecutado.
Base b5873e87d1f00ad10985171959e93015bc6045e3 → Source3bdefc9189c163173c324ae48c7ebb3ed3de70e8.
Inputs: docs/superpowers/reviews/2026-11-14-sanitized-stage-plan-final-review-package.md @12de2c06850cd962a9d2d39535418bb7577e1efd.
Verdict: Ready for Source Integration WITH FIXES; C0/I5/M1. No broad review repeats.

## Hallazgos completos
I1 runtime:68 — Identidad del getter/prepareStackTrace no evita un CallSite.prototype[Symbol.toPrimitive] instalado DESPUÉS de captura. Node22.23.4 defaultPrepareStackTrace usa ArrayPrototypeJoin(trace), que coerce frames. Garantizar conversión controlada o declinar accessor sin mutar formatter global. Fresh child must restore original formatter before projection and require hook counter0.
Primary: https://github.com/nodejs/node/blob/v22.23.4/lib/internal/errors.js#L88-L103 .
I2 projector:25–54 — Error real con message x\n    at synthetic (test/fixtures/finite-checkpoint-custody.mjs:20:1) puede poner primer frame falso antes de frames reales; d11 solo stack QUE EMPIEZA con at no cubre. Excluir cabecera completa o siteunknown ante campos multilínea; cubrir name y campos de cabecera de coded errors.
I3 D:95–105 — lstat regular→open(O_RDONLY|O_NOFOLLOW) puede bloquear si archivo cambia a FIFO sin escritor. Añadir O_NONBLOCK y mantener descriptor checks ANTES de read. Probar FIFO real con timeout independiente.
I4 candidate2c390 F7:1882/1899 y otros2jobs — summary_pair/summary_upload bloqueantes pueden volver fallido productor válido y omitir consumidores por fallo diagnóstico. Continue-on-error EXCLUSIVAMENTE esos6steps, upload solo si pair válido; ausencias unavailable. Probar fallos pair/upload contra política frozen; mantener actual_outcome original.
I5 D:59–84 — Error [ENOENT]: custody_limit contiene códigos incompatibles, hoy publica ENOENT. AssertionError [EACCES] también. Validar clase/código explícito/mensaje antes del ownedError. Conflictos unknown incluso con canonical marker válido.
M1 D:109 — línea interior A coincide con prefijo parcial y descarta evidencia válida. Limitar comprobación de prefijos truncados a bordes; probar ruido interior y prefixinicial.

## Evidencia y límites
Task1 qualification69 y Task2 qualification55 logical controls, negativos+Rootsmallreceipts. Native43608448872/1 failed, positivos/reducción write_files200, readonlycompoundfail+seal custody_limit/custody20, Bskipped, noSuite; business16NOaceptación. Ningún hallazgo se atribuye como causa observada del ensayo. Fullrestoration/F7/62WF/prefix/singleattempt preserved.
Exact readonly R1/2/3/cap y NativeNodeoutcomes siguen desconocidos; no condición live/PCoff acreditada. I1 evalúa alteración postcapture; precapture compromise sigue fuera.
Root recibió informe completo en texto. El reviewer NO movió refs.

## Adjudicación Root antes de fix
I1–I5/M1 aceptados tras lectura de Source y de Node oficial; no se descartan por guards actuales. UNA ola agregada y UNA rereviewscoped; no nuevoNative trial.
Ruling: retirar la lectura lazy de accessor en vez de tratar de probar seguros todos los hooks V8 mutables. Mantener export/interfaz readNativeStack como refusal fija sin tocar error ni ejecutar getter; real VM native errores declinan como unknown. El módulo no captura ni cambia globals. DATA-stack y enums siguen soportados. Supersede requisito d12/d13 finite-site real de Fix1 y rulings53–58 SOLOpara esa vía. Cost if wrong: menor precisión de diagnóstico, compensable con diagnóstico de logs acotado; ningún businessassert/cap relajado.
