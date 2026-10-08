# Autoridad antes de las escrituras de cierre D1

El adaptador interno `createClosureD1Actions` permite una callback de servidor
`authorizeWrite(plan)` para consultar nuevamente la autoridad después de las
lecturas primarias y antes de despachar cada escritura. Solo `true` permite
continuar; denegación, resultado incierto o excepción impiden la escritura.
El plan entregado a la callback es una copia inmutable del plan configurado.

La revocación consulta la autoridad antes del INSERT. El cierre del journal usa
`beforeCloseAuthorize` después de leer su último estado, vuelve a comprobar el
reloj y conserva `beforeCloseCommit` síncrono justo antes del batch atómico.
Cambiar el plan de entrada o retroceder el reloj durante la espera también
impide escribir. Un journal ya completado conserva su estado y no requiere una
nueva escritura. Los consumidores anteriores pueden omitir estas callbacks;
su omisión no demuestra autoridad administrativa ni habilita un runtime.

La callback debe construirse en el servidor con autoridad primaria y consultas
acotadas. Este bloque agrega el punto de control; todavía no conecta el catálogo
QA con el digest completo de la aprobación D1. Tampoco demuestra una transacción
distribuida entre retirada de catálogo y D1: verifica autoridad antes del despacho,
no impide una retirada posterior a ese despacho.

La prueba nativa local verifica permiso denegado, incierto, excepción, cambios de
reloj y entrada, autorización positiva, preservación terminal y recuperación de
respuesta perdida. Las 20 pruebas seleccionadas pasaron. No hay migración ni
activación remota, custodia alojada, adopción cloud o aceptación con PC apagado.

Siguiente bloque: registro QA V2 con digest de aprobación completo y actor privado
que componga estas guardas con D1 primaria, catálogo compartido y recuperación
administrativa GET. El piloto de Max continúa pendiente de esos controles y de
la preview editorial y aprobación del owner.
