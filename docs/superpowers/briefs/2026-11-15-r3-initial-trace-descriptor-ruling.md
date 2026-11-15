# AFW R3 — decisión acotada para corregir la custodia del canal inicial

Fecha: 2026-11-15. ProyectoAFW; repositoriotokenizartinfo-ops/agent-friendly-web; Sourcefeat/finite-native-cleanup-20261101 CERRADO4e278875259211809ac82b0d1978b4e9bf1764ed; treeb5cb56145c5f45277eaa6497123ef5f497a13ced.

## Decisión

Se acepta corregir un defecto de observabilidad del diagnóstico inicial: no crearFD10/11 persistentes dentro de una redirección temporal de un comando compuesto. El análisis estático del implementador identifica una colisión posible con la custodia interna de Bash cuando el primer descriptor libre≥10 es10/11. La documentación GNU advierte conflictos con descriptores>9. No conocemos el layout ni el build Bash de la ocurrencia43705239006/1, por lo que NO se atribuye su unknown ni el fallo histórico debootstrap a ese mecanismo.

El mismo implementador, misma ronda3, puede preparar únicamente una propuesta DATA inicial ajustada. No habilita full104, otros arreglos, ejecución ni mutación de Source. Root revisará el delta y gateará una única ocurrencia distinta, si cumple.

## Delta permitido

1. Establecer stderr de esta shell de paso permanentemente en `/dev/null` ANTES de asignar los descriptores de la traza, con manejo cerrado si no se puede. Sin redirección temporal de un compuesto envolviendo la asignación.
2. Crear reader10 RO y writer11 append mediante simple `if exec 10<... 11>>...; then`, conservando el mismo archivo privado/unlinked/identidad/posición y cierre. No elegir números altos al azar, asignar relay/coproceso/residente ni capturar stderr crudo.
3. Rebasear solamente procedencia y comprobación de prefijo contra el cierre actual. SAMEprevio4e7295f5708407c1cc7ab2074ff3c95a6977b337 completo1725347B/SHA256624c039ec20f3f833516733d664404f5a39eea55fbd0af25a24293a0a52ea29e. No duplicar el archivoR2/base64: se recupera su bloque histórico dentro del prefijo actual con pins históricos intactos.
4. Mensaje único nuevo: `AFW-R3-STARTUP-DIAGNOSTIC-TRACEFD-ONEUSE-20261115`. Candidata hija directa4e278; exactamenteF7+SAME; Core3201/324448B/aef y18/Main intactos. Inactiva nunca se activa directamente.
5. Conservar literalmente el commonouterR2 8a74fe67af2c1a870b9964f0f5c17c2514986e36, todas las definiciones/imports del programa inicial para preservar superficie de parseo, y NINGUNA invocación terminal de controles/helperscapturados/CLI/Native. El diagnóstico sigue siendo initial-only; una traza regular no es autoridad válida durante futuros capturados.

## Contrato y límites sin cambio

Marker/purpose/schema/orden10eventos/finalformatter y receptorRoot a2da se conservan, resultbootstrap_admitted requiere status0+traza completa válida. Un único wirefinal≤2048, traza≤256, controles/CLI/Native0, qualificationfalse y siete no-acreditadosfalse. No nueva señal de causa ni texto/rutas/PIDs/env/excepciones crudos. Programa/F7tipados≤65536 y piezas/helper≤32768; raw≤400500, SAME≤1800000, gzip≤98304, base64≤131072. Medir y detener propuesta ante exceso, sin truncar. Los demás tiempos/caps permanecen.

## Entrega y gate

Entregar7fuentes+manifiesto+raw/gzip/mirror+patchreversible+F7inactivo/activo+SAMEappend y candidata/reporteappend-only a1a4c456925508e59d5d1e41c2176e9606ef0d91f. CotejosRoot deben demostrar que solo cambian los puntos permitidos y el rebase; el resto es byte exacto. No pruebas Source locales ni nuevas pruebas remotas por el implementador. Root ejecutará solo después de lectura fresca de ref/Main/árbol/pins/cincoactivos0 y preparará cierre originalF7+SAMEcompleto antes de cualquier continuación.

Si la observación sigueunknown, NO retry automático: preservar/cerrar y decidir con evidencia qué instrumento mínimo permite discriminarlo. Si admitebootstrap, cerrar/restaurar primero y luego rebasear full104 en un gate separado. No Native/Gate2/C2 liberados por este permiso.

No cambiosruntimeCloudflare, permisos, claves, OAuth, OTP, cron, Containers, correo oMax. operationalReadiness/PCoff y demás no-acreditadosfalse. Sin intervenciónGabriel antes11:30UTC.
