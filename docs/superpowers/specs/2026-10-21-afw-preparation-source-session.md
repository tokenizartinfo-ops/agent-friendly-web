# AFW: entrada privada de sesión para preparar una fuente propia
Fecha: 2026-10-21. Proyecto: AFW. Repositorio: tokenizartinfo-ops/agent-friendly-web.
Entorno: fuente no montada; origen futuro exacto https://preparation-canary.agentfriendlyweb.dev.
Resultado: una persona con assertion Access real y firmada puede comprobar su sesión y ver el próximo paso. Cierre: Worker nativo/RS256/exp/casos hostiles en Actions y revisión de rama.
No acredita despliegue, fuente creada, propiedad de dominio, permiso, conexión de asistente ni PC-off.

## Decisión de alcance
Primera pieza del host independiente: GET /source (guía) y GET /source/identity (referencia propia mínima).
No requiere el projectId/clientId que aún faltan para el resto del flujo. No importa el router de OAuth ni el store. No lee DB, KV, registro de clientes, grants o cookies. Cualquier POST se rechaza antes de leer su body.
El alta/inspect HTTP llegará en una pieza posterior usando el store543; no se ofrece un botón que todavía no funcione.
Razón: obtener el subject verificado que permite fijar la siguiente ventana sin adivinarlo desde email, sesión de producción o datos en el navegador.

## Contrato y autoridad
Factory createPreparationSourceSessionHttpHost({enabled,issuer,env,profile,accessVerifier?,now?,monotonic?}).
Perfil exacto: profileId afw.preparation-source-session.v1, operationKey opaca8..120, subject null (bootstrap) o referencia opaca del servidor, startedAt/expiresAt enteros y ventana original <=600000ms.
No renovación ni desplazamiento al abrir o recrear factory. Flag AFW_PREPARATION_SOURCE_INTAKE_ENABLED === 'true', independiente del router existente.
Solo issuer exacto de preparación. Paths/métodos exactos, sin query/hash, URL<=2048bytes. Sin CORS.
Verificador por defecto verifyCloudflareAccessJwtWithExpiry: issuer/audience/sub/email/exp del MISMO JWT firmado; devolver solo subject/exp, nunca assertion/email.
Si subject está fijado y no coincide,403. Si es null, identidad propia de bootstrap sin DB/alta.
Limitador nativo requerido; key hash separada por subject/operationKey,10/60 según binding futuro, sin suponerlo desplegado.
La respuesta expresa sessionVerified y serverSubjectPinned, no confunde sesión con consentimiento.
Todos los flags de autoridad permanecen false. No llama create/inspect, no copia claims.

## Límites
Request lease original5s desde ingreso, AbortSignal y relojes monótonos; no nuevos5s después de Access o limitador.
Pins de options/perfil/env/limiter y vencimiento firmado revalidados tras cada await; drift terminal para esa instancia, fallo temporal no terminal para siguientes solicitudes válidas.
Default-off retorna antes de env/clocks/identity/limiter/body. No DB/KV aun habilitado.
Headers private/no-store, no-referrer, nosniff, CSP sin scripts/form/connect/frame/base, estilo nonce; no cuerpos de error ni credenciales reflejados.
Salidas <=32768bytes; códigos estables y mensajes humanos. Expirado410 no diagnostica cookies o identidad ni pide OTP.
Texto cómic en todo el corpus por decisión expresa del owner; papel/negro/sepia, motivo de latas reutilizado, texto seleccionable y foco visible. Sin imágenes externas ni animación. No F5 ni promesas de mejora/puntaje.

## Siguiente fase y aceptación remota pendiente
1. Montar independiente y cerrado en Worker existente, preservando guardas previas y rollback.
2. Verificar protección Access real de /source*, audiencia y subject con inventario actual antes de nueva ventana.
3. Alta POST+inspección readonly con Origin/CSRF/body/lease y mismoD1; ninguna apertura crea filas.
4. Verificación de dominio real, cliente SDK original y permiso humano concreto por separado.
Estos pasos no se ejecutan por este documento.
Rollback fuente: revertir PR; ningún recurso remoto o esquema cambiado.
