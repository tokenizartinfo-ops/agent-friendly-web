# AFW: adaptador remoto acotado para catálogo · 27oct2026

Depende del contrato puro aceptado en PR616/ed644810. No cambia el Worker ni activa permisos. Userausente hasta16:00Argentina: el trabajo de estePR será solo preparación/CI/pruebas sintéticas/lecturas.

## Alcance

Adaptador INTERNAL fijo a AFW/account/Worker/D1/KV/Workflow propios. No endpoint ni IOsaliente genérico. Datos y pin del llamador son confiables del operador: el adaptador debe validarlos contra API primaria antes de toda mutación. Solo cuatro fases: preflight(open o catalog), open, catalog y close. Ninguna llamada subscribe, confirm,reserve,Containerstart,WorkflowPUT/instance,cron,OAuthgrantwrite oOTP. Los planes metadata-only nunca acreditan consentimiento o activación.

Una ventana original<=10min. Cada llamada tiene presupuesto caller/monotónico<=110s; timeout cierra continuaciones pero no promete cancelar API. Mutaciones máximas por fase: un registro públicoKV de callback fijo y expiración original (open); una versión inactiva y una promoción (open/catalog); una restauración a versión cerrada exacta y retirada del registroKV SOLO si valor/metadata/plazo son los nuestros(close). RegistroKV no contienesecreto. UnknownACK nunca se repite: devolveruncertain, reconciliar por lectura. Verificarversion/hash/cfg/exportsybindings, punteros canary/OP/Workflow, esquema completo, ausencia cron/tails/activeinstances/Containers/reserva y selector propio antes de cada escritura.

El descriptor del contrato aporta .payload; nunca enviar maySubscribe/operationalReadiness a API nativa. El grant proviene de un único SELECT primario con JOINowner, proyecto/client/resourcefijos y creación en la ventana nueva; ambigüedad se bloquea. El permiso de avisos lo concede la persona luego desde UI. Catálogo no arranca DOni consume reserva(PR613); actual subscribe sigue condicionado a confirmación/reserva primaria genuina.

Cerrar debe seguir siendo posible después del deadlineoriginal. Restaurar no depende degrantactivo; lectura posterior debe distinguir hostcerrado, grantretirado/expirado y baja nativa(no probada). No borrar datos históricos ni cambiar credenciales. No CAS: recibo describirá snapshotsfechados, no garantía global.

## Verificación

Primero RED con ocho escenarios adversariales en API sintética y cero destinos reales. Luego implementación; una revisión independiente y una pasada de fixes. CI requerido, calificación primaria preflight contra60d/DEP519,OP2033/DEP302,Workflow1d99, sin mutaciones y sin abrir ventana. Nada live hasta regreso delowner, confirmación puntual y Accesscomprobado. Estado operativofalse.
