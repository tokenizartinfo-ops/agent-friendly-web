# AFW — investigación readonly, fase1 — 2026-11-14
Estado: investigación de solo lectura. NO nueva implementación, activación, ensayo Native ni cambio de límites autorizado por este documento.

## Evidencia observada
Source actual cerrado3bdefc9189c163173c324ae48c7ebb3ed3de70e8; Native43608448872/1 consumido. Diagnósticos exactos y hashes en docs/superpowers/progress/2026-11-14-sanitized-stage-task3-observations.es.md.
Readonly rawOutcome failure se refiere al paso COMPUESTO NodeTAP +validacióncount+escriturabusiness-counts. Command log disponible, código/sitiounknown; sello custody_limit/custody_20; metadata/countlogmissing; SuiteSAFEausente. NO sabemos R1/R2/R3, bareNodeoutcome, ni cuálcap.
La ola de fixesI1–I5/M1 corrige defectos de observación/integración comprobados en Source; NO se ha demostrado que causaran este fallo.

## Lectura Source que acota el siguiente paso
Native test blob533dafb5df5f8e57442c5b9029dc8dec6dded434 contiene tres nombresfijos R1/R2/R3 fixed original SDK readonly budget; cadauno120000ms. Assertionsespecíficas verifican cuotas, referencias, drenaje, causalidad y deadlines. No se relajan.
World43aad5bddd844d591572c5868b73697dfd3463f9, runBudgetReadonlyCase1167–1201, separa R1permiso/referencia, R2frontera negativa, R3colas/ACK/deadline. Los pathsderesultadoprivado no son entradaRoot.
Nodecomando originalredirige TAP a logs/command-output.log; count-checksolo ejecuta si Node sale0 por set-e. Por eso rawfailure no equivale a un test identificado y countmissingnoesunfallodeparser demostrado.
SealDirectory328–343 en custodyblob4d05b5ec0f7b074be88ef9733a47c984b0212351 ejecuta inventario→cifrado→inspectPacket→receipt→writeClosed→verifyPublic. Los guards de inspectPacket TAMBIÉN pueden participar durante SELLADO; no descartarlos por llamarse unseal/inspect.
Sitiospublicos limit relevantes: regular101; inventario135 (countOtotal, mismo sitio, no diferenciarlos por inferencia); registroJSON150; header173; JSONL177; envelope179/188; inventarioinspección215; expandido250; líneainspección254. La pila pública usada hoy devuelvefail20; exactguard no está en el vocabulario actualde631sitios.
No se sabe cuál se activó. No aumentar128KiB/128MiB/512MiB/768MiB/4096 ni retirar ningún guard.

## Alternativas consideradas — decisiones de investigación, no implementación
1. Repetir todo8jobs idéntico: descartado, sin información nueva y con esperas deliberadas≈13min de dospreparadores.
2. Rootleer logsprivados/archivos/cipherarchives: fuera del alcance, descartado. No obtenerlos ni asumir que metadata permite hacerlo.
3. Reprocesar después delrun los logs por otrojob: elTAPyseal están redirigidos a archivosrunner, no consta artefactopúblicoasignado que lospreserve; no asumirque logsREST contenganesosarchivos o crear acceso retrospectivo.
4. Preferencia técnica a diseñar DESPUÉS de finalfixqualificado/revisado: observadoracotado de casosTAPfijos y guard-categoriescustody, generado/probado con TAP REALsintéticoNode22 enGitHub, sinmensajes/actual/expected/paths. Después UNA prueba enfocada readonly manteniendo comandos/assert/caps originales. Es una propuesta, NO unrun released.
Los resultados del parser serían observaciones noautenticadas; jamás sustituyen conteos/aserciones originales ni prueban causahistórica. Fuentesdesconocidas→unknown, sinadivinar.
Antes de ejecutar: diseñocontratoexacto, regresionesprivacidad/ambigüedad/truncamiento, revisión, pins, Rootinactive/activegate, lease/oneuse/restauración. Intentoreadonlynoesbusiness16niPCoff. Otros5jobs no deben ejecutarseotra vez sin necesidad.

## Continuidad
Ahora:/root/stage_diag_final_fix preparasoloinactiveSourcewavecon6hallazgos. Source3bde/main0c9/62WFcerrados. LuegoRootgate→qualificaciónGitHubsinclaves→restauración→rereviewscoped. Siguientecausareadonlysiguependiente.
No ownerintervention actualmente. SinconsultaCF/runtime/OAuth/keys/Max/mail. Los siete nonclaims permanecenfalse.


## Formato primario comprobado — Node22.23.4, 14nov16:31UTC
Fuente oficial exacta: https://github.com/nodejs/node/blob/v22.23.4/lib/internal/test_runner/reporter/tap.js (reportTest64–79,reportDetails81–95,jsToYaml120–254). Lecturaweb, sin ejecutarSource.
El reporterescapa nombres y salidas de consola; los resultados de caso son líneasTAP, mientras el error se distribuye en campos YAML. El campo stack elimina la cabecera y el prefijo at de sus frames. Por eso un lector diseñado para cabeceras Error/AssertionError no identifica necesariamente el fallo TAP, aunque el archivo esté disponible. Esto explica una brecha del DIAGNÓSTICO; no prueba la causa del fallo readonly.
Diseño futuro: reconocer solo los tres nombres exactos y/o el fallo de archivo público fijo; asociar cada bloque de detalles a su resultado, ignorando error/actual/expected y contenido anidado. Recuperar solo códigos/sitios públicos finitos. Validar con salidasTAP REALES sintéticas de esa versión (mensajes multilínea, campos de datos que simulen stack, excepciones antes de registrar casos, truncamiento/conflicto/duplicados). No ejecutar logs como código ni usar parserYAML genérico. Seguir limitado a16KiB de pareja/64KiBporlog/1MiBarchivo, sin más permisos.
La corrección final ya se cualificó en43615497152/1 con94GREEN y se restauróSource410b3701; rereviewscopedpendiente. Este registro sigue siendo investigación, no autoriza nuevaejecución.
