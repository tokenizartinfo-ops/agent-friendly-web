# Cierre administrativo compatible con el proveedor

El GET puntual real de Cloudflare observado el 9 de octubre omitió `name`; el listado de tokens sí lo aporta. El cierre anterior requería ese campo en el GET y podía quedar sin comprobación, aunque las pruebas con respuestas sintéticas completas pasaran.

La corrección obtiene el nombre únicamente de la fila con el ID exacto en un listado independiente y completo de la cuenta fijada. Compara metadata estable, versión y estado con la respuesta puntual; el nombre debe coincidir además con el aprobado cuando se prepara la desactivación. Una diferencia, inventario incompleto o retiro del catálogo impiden modificar el token. No se restaura un nombre por inferencia.

El listado usa solo GET al origen fijo, hasta cuatro páginas de cien filas y 256 KiB por respuesta. Comparte credencial privada, señal y plazo total del transporte original; cancela también un cuerpo bloqueado cuando vence el plazo. El consumidor no elige cuenta, consulta ni ruta del listado. No se entregan credenciales ni el inventario al navegador.

La desactivación conserva el fence persistente existente: ante pérdida de respuesta, la reconciliación lee el estado y no repite PUT. La prueba nativa SQLite reconstruye el coordinador, omite el nombre en los GET y verifica una única modificación incluso después de esa pérdida.

## Evidencia y límites

Preparación de fuente del 10 de octubre, sobre `857b088eb186278c8a9b6dd493d87c4687ff657c` (PR370 integrado). La lectura real previa está registrada en `output/afw-private-provider-version-actual-20261009.json`; corresponde a una identidad histórica retirada y no autoriza reutilizarla.

La regresión específica cubre cierre, diferencias de nombre/versión/estado, inventario incompleto/duplicado, dos páginas, retiro durante lectura, pérdida de respuesta y cancelación del cuerpo en ambos transportes. Los resultados finales de regresión, lint, build y revisión se guardan en el ledger local `output/afw-provider-name-closure-ledger-20261010.md`.

Este bloque no despliega ni activa un ensayo, no acredita custodia exclusiva global y no demuestra ejecución con PC apagada. Continúan pendientes la correlación de originales cloud y diario primario, el productor de reserva y el fence de instalación coordinada; después se hará el ensayo propio con PC encendida y una ocurrencia alojada antes del intervalo de apagado acordado. El piloto de Max mantiene su preview, aprobación y consentimiento separados.
