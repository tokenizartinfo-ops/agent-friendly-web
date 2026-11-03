# Ventana del titular de la preparación finita

BASE b44fb3ccff94a87d0955bbf25dd1c549d329615e. Código y prueba e966527af2d0ecd053000ddcb6c2e538ea0a1b09.

La configuración de la versión inicial cerrada fija AFW_OAUTH_PILOT_EXPIRES_AT al tiempo inicial I0 más 900 segundos. Antes se fijaba al plazo técnico de 300 segundos, insuficiente para el presupuesto posterior de commandBy más 510 segundos. El cambio conserva I0 como origen, C0 en I0+900 s y C1 en I0+1080 s. La duración del permiso delegado, su revocación y los límites de identidad y custodia conservan sus validaciones. La configuración permanece cerrada y la carga sigue siendo inactiva.

Prueba nativa con la implementación anterior: commit c60377f9cb4db27e3839cba28209fec052a4d632, run 41634008245, job 125910462293, 82 PASS y una única falla esperada por la diferencia entre I0+300 e I0+900. El mismo flujo con la corrección, run 41634555467, registró 83 PASS consumidores, 45 PASS focalizadas y 23 PASS compilación/residencia, cero fallos, cancelaciones u omisiones. Lint acotado pasó y no hubo artefactos. La prueba usa workerd y datos sintéticos. Persisten advertencias previas del toolchain y mensajes de disposers en fixtures.

Esta unidad no produce activación, cápsula ni acceso del titular. Antes de emitir una activación aún hay que componer las comprobaciones de writers, inventario, custodia y publicación primaria en la misma invocación finita, guardar SEND/ACK y comprobar la publicación. El lector histórico y el puente QA producen evidencia factual, no autorización de efectos. El techo de fuente y credenciales venció el 3 de noviembre a las 02:59 UTC; antes de cualquier ensayo real se debe reconciliar una vigencia nueva y verificar el lector nativo.
