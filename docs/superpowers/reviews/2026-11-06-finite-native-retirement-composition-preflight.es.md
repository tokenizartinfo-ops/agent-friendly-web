# AFW — preflight del retiro de la conexión y avisos actuales

2026-11-06 UTC. SOURCE inspeccionada7aab233741b09f8873bf04831ca2fa9a9c2b1c4d, sin modificaciones. Este bloque identifica reutilización y requisitos para el próximo diseño integral: no implementa otro componente aislado, no abre alarm/ensayo ni declara restauración completa.

## Componentes ya existentes que no hay que reconstruir

El store fijo createFinitePreparationIssuerStore, blobefc25b2af9c80b8eb27cffe219544e974002293e, tiene closeFence/reconcileFence/observeGrant/revokeGrant (lib/mcp-qa-finite-preparation-issuer-store.mjs:237–268). Cierra el fence primario, correlaciona la identidad reservada, observa sólo su UUID original y revoca mediante UPDATE RETURNING propio. Conserva identidad/historia/exchanged_at y una revocación previa. Las barreras/observaciones son testigos locales de la misma instancia/lease, no objetos reconstruibles desde JSON.

La especificación specs/2026-11-04-preparatory-issuer-fence.md/blob1f22a1afc2da83c5c8c72bcc5844dfadcd9e4da3 ya exige: barrera serializada confirmada antes de afirmar ausencia o revocación, mismo requestID ante ACK desconocido, nada de grant nuevo/notice ficticio/escaneo amplio/storeOAuthordinario. Mantener esos contratos en el consumidor completo. Su componente verde no demuestra la composición posterior ni instala schema remoto.

El alarm inicial existente sigue limitado y rechaza obligaciones issuer; el helper de preparación sólo recupera su frontera inicial. Reutilizar owner/alarm/C0/C1/delivery counter y material de rollback; no convertir el helper en un permiso genérico para estados posteriores ni montar un scheduler nuevo. El traspaso al guard nominal será atómico bajo ese mismo owner/alarm, según las especificaciones vigentes.

## Dos identificadores distintos que el retiro debe relacionar

La invocación actual de AFW (owner-phase-context:828–833) da al SDK props.applicationGrantId=i.grantId y metadata={}; el resultado nativo observado sólo se verifica como redirect y se registra mediante su hash. El grantUUID de AFW está en D1 y en ExpectedGrant; eso no lo convierte en el ID interno generado por el SDK.

Verificación de versión, no upgrade:
- package-lock de AFW fija @cloudflare/workers-oauth-provider1.2.1 e integridad existente sha512-5bw7JJI9Nd4ArHfNnvTF8H2OpSbA2GbqTmX80ly47h7dR+atgjFsn9Wfz+biKlAKClTEUYE0KAr791RkED41VA==.
- Tag público oficial v1.2.1→tag32cf23c928350715999c73bd2f4b04f023c868a0→commit1fafae23a0328f49ec3a30c433dfbe502ab3d1a6. package.json en ese commit declara1.2.1 (blob0f9d277394d91f67073a236fd07195691f2ba02e).
- [Fuente SDK fijada](https://github.com/cloudflare/workers-oauth-provider/blob/1fafae23a0328f49ec3a30c433dfbe502ab3d1a6/src/oauth-provider.ts), blob10274b62aad09ea0e9d058cc1e3d41a9f8cb7d97. No se descargó/ejecutó el tarball para auditar su equivalencia byte a byte; el tag es evidencia primaria de esa versión, no una nueva build de AFW.

El SDK genera su propio ID y cifra props. completeAuthorization retorna el redirect, no un objeto de grant. listUserGrants entrega resúmenes con metadata, no los props descifrados; su paginación no prueba ausencia cuando quedan páginas. revokeGrant recibe IDSDK yuserId y elimina tokens paginados antes del grant. Esas operaciones no tienen por sí solas el presupuesto ni la autoridad del ciclo AFW. Referencias del código fijado:834,948–956,1567–1611,6603–6649,6963–7014,7079–7120.

Conclusión de diseño: no pasar a revokeGrant el UUID de D1 ni elegir por user/client/nombre/“último”. Tampoco introducir un barrido de usuarios, rotación, purgeExpiredData, borrado amplio de KV o copia de códigos/tokens al controlador. Se necesita correlación exacta con el efecto original antes de cualquier retiro interno SDK. El consumidor debe distinguir la revocación efectiva del permiso de datos AFW, el retiro de avisos y el retiro operativo del SDK; una no demuestra automáticamente las otras.

## Requisitos verificables del próximo bloque integral

1. Inventariar el ciclo desde los journals y anchors originales: antes de enrollment; enrollment/ACK incierto; upload/activation parciales; ConnectionReceipt; issuer reserva/consent/grant/link; SDK begin/approve/complete y resultados desconocidos; ticket/consent/NoticeLink. Incluir filas ajenas, cambio legítimo posterior y expiración. Nada de sembrar un estado completado como sustituto del productor.
2. Diseñar la correlación exacta de la obligación SDK y su recuperación si el efecto ocurrió pero la respuesta/journal ACK no llegó. Comparar alternativas con el contrato API fijado: metadato factual ligado a identidad original antes del efecto, recibo del resultado original u otra operación SDK documentada. Una observación posterior no puede convertirse en ACK de la invocación perdida ni dar permiso de volver a emitir. No elegir ni implementar silenciosamente una alternativa en este preflight.
3. Componer barreraSQL terminal y su readback primario antes de la observación originalUUID; mantener testigos propios para UPDATE real. Mostrar qué detiene operaciones tardías de otras continuaciones/isolates. La exclusión stage-work local sola no es un fence distribuido ni prueba drenaje físico global.
4. Fijar APIs/operaciones y prueba de retiro de avisos y SDK con límites reales. La paginación/Promiseall interna del SDK exige presupuesto y guard de cada operación nativa; una Promise.race de timeout no demuestra que dejaron de emitirse llamadas ni que terminaron las ya emitidas. Preservar los dos finales: denegación lógica pronta y settlement físico retenido.
5. Restaurar sólo un pointer cuya pertenencia al linaje original esté probada y el baseline recuperable completo; no sobrescribir actividad legítima posterior ni fabricar ACK por leer un pointer. Lost/unknown/foreign deben tener resultado explícito y no habilitar otro ensayo. No borrar journals/grants/eventos para pasar el inventario.
6. Conservar límites vigentes: Root≤30000ms/child≤5000ms, C0=I0+900000,C1=C0+180000, fuente3Nov02:59UTCvencida y SAME owner/alarm original. No trasladar automáticamente los T0/deadlines del setup antiguo a este ciclo. No instalar schema/custodia ni renovar Source/Access en SOURCE/SYN.
7. Diseñar la unidad completa antes del filemap: productor desde el camino original hasta retiro/restauración verificable. Reusar SDK/store/journals protegidos, no crear de nuevo una cadena de componentes sin consumidor. Una prueba nativa final debe partir del POST real de conexión y del permiso original de avisos, cerrar su linaje, preservar ajenos y demostrar que no queda obligación propia desconocida declarada falsamente como drenada.
8. Conservar la restricción de una ocurrencia real coordinada PC-off. La validación previa de esta unidad será SYN y preflight autorizado; no introducir otro ensayo real completo PC-on, nuevos permisos o una ocurrencia adicional por leer esta nota.

## Cierre del bloque

Se cerró la investigación de qué reutilizar y de por qué el cleanup inicial no basta. La próxima unidad necesita su diseño coherente y plan revisado contra estos contratos antes de implementación; este documento no es un diseño aprobado ni una autorización operacional nueva. La selección técnica ordinaria corresponde a Root bajo la delegación vigente del owner; no requiere solicitar un login para poder diseñar.

Source permanece7aab. operationalReadiness=false;completePackage=false;PCoff=false. Sin cambios a código/dependencias/esquema/runtime/identidad/custodia/permisos/OAuth/SDK real/avisos/Max/mail. Trabajo enGitHub, sin clone/build/tests/temporales locales.
