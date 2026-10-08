# Recuperación por lectura del cierre

## Preparación aceptada localmente
El coordinador dispone de `reconcile()` y una capacidad opcional confiable `readIssuedReceipt`. Una lectura confirmada del paso ambiguo avanza solo ese paso por CAS; no vuelve a ejecutar la escritura ni ejecuta el siguiente paso. Sin respuesta verificable mantiene `issued`. La restauración administrativa debe tener su propia constancia `restored`; revocación o cierre del ledger no la sustituyen.

14 pruebas focales pasaron con runtime local workerd: lectura simultánea no salta pasos; respuesta incorrecta o ausente no desbloquea; pérdida de almacenamiento antes de commit conserva issued; commit confirmado en almacenamiento con acknowledgment perdido permite continuar sin replay; dos alarmas locales no duplican efectos. Lint del módulo y ambos tests exit0.

La suite local del bloque inicial, antes del último caso de cobertura, terminó1232casos:1229 aprobados,1 fallo,2 omisiones de plataforma. El fallo fue el arranque de workerd/SQLite en un ensayo ajeno sin modificaciones: `SQLITE_IOERR_WRITE`, no una aserción del coordinador. Ese caso ejecutado después en aislamiento pasó1/1. Su causa interna no quedó determinada; el espacio libre medido14,88GiB no permite atribuirlo a disco lleno. No se modificaron pruebas, controles, fixtures ni aislamientos para ocultarlo. Logs: `output/afw-closure-readback-full-test-20261008.log` y `output/afw-closure-readback-native-io-recheck-20261008.log`. CI final exacta sigue gate para merge.

## Límites y ruta
La lectura real de proveedor todavía requiere adaptadores server-owned que comprueben plan, paso, baseline y recursos efectivos. El callback del fixture es sintético; un contador no demuestra revocación Cloudflare. No hay credenciales, rutas, Worker o alarmas remotas activados por este bloque. No se demostró reinicio del proceso workerd ni PC-off.

PR332 quedó integrada en main1e534824b8d789a564b107682a30b7d190806b0c con CI37812464767 sobre ef5041b. El chat cloud ordinario conservó su fuente8b9a4c8/pub6ac7ba5; leyó el nuevo diseño desde GitHub y confirmó que no dispone de capacidad administrativa Cloudflare. Recibo `/workspace/work/afw-independent-closure-review-2026-10-08.json`, turno01a11c6e final/cursor20. No confundir revisión read-only de fuente preparada con adopción de una publicación nueva.

Antes del piloto de Max: adaptadores/custodia actor independiente, QA propia con recepción/ACK/devolución visible y readback de cierre, nueva publicación/adopción ordinaria, ensayo integrado PC-off y preview/aprobación del correo. Chrome perdió el control durante esta comprobación; se pidió reconexión una vez, sin claves ni cuenta nueva. Ninguna invitación a Max enviada.
