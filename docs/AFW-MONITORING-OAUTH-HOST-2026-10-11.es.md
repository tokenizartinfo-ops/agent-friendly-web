# Enlace privado de avisos al mismo host OAuth

Estado: fuente cerrada por defecto, no desplegada ni habilitada remotamente. La composición usa el OAuth Worker existente y su limitador. No activa Events, suscripciones, transporte, revisión cloud, programación, guardia ni PC-off. No se han cambiado claves, esquemas remotos, versiones ni permisos reales.

## Alcance y configuración

Las rutas exactas `/monitoring`, `/monitoring/grant` y `/monitoring/revoke` requieren `AFW_DOSSIER_MONITORING_OWNER_ENABLED === 'true'` además de la habilitación OAuth original. Sin el flag propio devuelven 404 antes de consultar limitador, D1, Access o la política. No se añade el flag a las configuraciones remotas. El endpoint MCP público permanece separado.

El host exige `AFW_DOSSIER_MONITORING_OWNER_POLICY`, JSON de servidor de hasta 2048 caracteres, con exactamente `grantId`, `projectId`, `clientId`, `startAt`, `expiresAt`. La ventana es finita, de hasta diez minutos, en epoch ms. Proyecto y cliente deben coincidir con los pins OAuth del mismo host: no se admite proyecto abierto. Recurso canónico, equipo Access, audiencia, D1 y limitador se heredan de ese host. El navegador no escoge esos valores ni aporta identidad, ámbito, acceso o almacenamiento.

Antes de esperar el limitador se toma una instantánea de bindings/configuración. Cambios de flags, política, proyecto, cliente, ventana de servicio, Access, D1/KV o limitador invalidan esa solicitud. El reloj y la verificación Access mantienen esa comprobación durante el handler. El limitador existente es obligatorio y se ejecuta antes de verificar identidad o escribir el formulario. Una negativa devuelve 429; un fallo o configuración inválida no concede permiso. La ventana OAuth original sigue limitada y no se renueva.

El handler de PR399 verifica firma Access, sujeto, vencimiento, dueño actual y grant original. GET no concede avisos. POST mantiene el propósito separado, cookie/nonce, límites de cuerpo, CAS, reintento de la solicitud original y retiro terminal. Retirar avisos no revoca la lectura OAuth; revocar o vencer la lectura no habilita consultas agénticas nuevas. No se añade capacidad Events al servidor MCP por registrar este consentimiento.

Las rutas de lectura, autorización y conexiones conservan su contrato incluso si la configuración de avisos está rota. El enlace humano contextual desde las conexiones se preparará cuando el host y su custodia estén aprobados; hoy no se muestra una capacidad operativa inexistente.

## Verificación y límites

TDD: las cinco pruebas nuevas fallaron antes del enlace; después pasaron. La composición local usa código OAuth, PKCE y exchange reales del proveedor instalado, SQLite y JWT RS256 con JWKS generado localmente. Comprueba lectura y avisos separados, reintento, retiro, identidad ajena, Origin, ventana, rate deny y drift de configuración. Pruebas adicionales conservan conexiones/metadata y rechazan cambio de política durante verificación.

La prueba nativa ejecuta el mismo OAuth Worker con workerd, D1, KV y limitador nativos, verifica Access RS256 y recorre GET/grant/retry/withdraw. El grant de esta fixture se siembra sintéticamente; no representa la identidad o consentimiento de una cuenta real ni un código OAuth emitido remotamente. La prueba local del exchange y la nativa son evidencias complementarias, no una aceptación del piloto alojado. La configuración y claves de las fixtures solo viven en memoria local.

Antes del montaje propio siguen pendientes custodia administrativa de historia y retención, baseline/rollback del host exacto y schemas cerrados; enlace humano y revisión visual; composición DO→Node con presupuesto durable y sin replay; suscripción/callback reales y turno cloud terminado correlacionado. Luego una ocurrencia alojada propia, retirada y cierre independientes; después PC-off acordado. Max necesita aprobación de su mail exacto e identidad y consentimiento propios. No pedir OTP ni recrear claves para estos próximos bloques de fuente.

Revisión única: se reprodujo una escritura demorada que sobrepasaba el plazo OAuth del host mientras JS conservaba una observación anterior. La política efectiva ahora se acota al mínimo de ventana original de monitoreo y vencimiento OAuth del host antes de generar ticket/permiso; ese mismo límite llega a la inserción SQL atómica. Dos regresiones fallaron antes del fix: plazo persistido excesivo y escritura tardía aceptada. El fix no prolonga ni reconstruye ninguna ventana.
