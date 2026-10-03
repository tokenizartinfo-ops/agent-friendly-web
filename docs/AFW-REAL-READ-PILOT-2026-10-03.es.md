# Piloto de lectura real: preparación operativa

AFW, 3 de octubre de 2026. El recorrido sintético ChatGPT resumen/evidencia/retirada está aceptado en AFW-EVIDENCE-WINDOW-2026-10-03.es.md. Este plan no abre servicios ni delega un expediente real.

## Comprobado

D1 productivo `d26fc9d2-df5a-4957-8e58-cc4c945faad8`, identificado por configuración y recibo de entrega productiva, compiló las cuatro consultas preflight el 3 de octubre a aproximadamente 19:34 UTC. API estructurada: cuatro resultados correctos, cero filas devueltas/leídas/escritas, changed_db false. No se leyó información de clientes, ni se migró, ni se concedió acceso. Las tablas de autorización y sus columnas de intercambio/consumo están disponibles.

El preflight ahora comprueba dependencias del repositorio y del store OAuth mediante SELECT LIMIT 0. Las consultas de grants/consentimientos del store usan la misma proyección explícita que la comprobación. Pruebas con migraciones reales rechazan ausencia de exchanged_at y consumed_at. Esto no comprueba consentimiento, propietario, permisos Cloudflare de un Worker nuevo ni lectura desde ChatGPT.

## Diseño del primer recorrido

Empezar con un expediente del owner dentro de AFW, elegido y revisado desde su sesión real. No usar Sector de Sistemas hasta que su propietario complete su acceso y consentimiento. No copiar expedientes productivos al canary ni introducir fixtures sintéticos en producción.

Mantener el servicio delegado real separado del canary y de la web pública. Sus nombres, hostname, KV, Access audience y cliente OAuth se registrarán después de provisionarlos; este documento no afirma que existan. El store de autorización debe ser autoritativo y la consulta del proyecto debe operar sobre D1 real. Aunque las herramientas son de solo lectura, el flujo OAuth escribe consentimientos y grants: no describir todo el binding D1 como read-only.

Antes de abrir: verificar Worker/configuración cerrados, bindings exactos, callback obtenido de ChatGPT, none/PKCE S256, resource del nuevo issuer y preflight completo. No reutilizar el cliente canary ni sus tokens. Restringir en servidor el piloto a un proyecto concreto y su propietario; la selección visual o un parámetro project no sustituyen ese límite. Comprobar el subject validado por Access contra user_id sin trasladar JWT, cookies o identidad privada al navegador o Git. No inferir equivalencia de subject entre aplicaciones por compartir correo/cuenta administrativa.

## Experiencia del usuario

Desde el expediente: «Podés consultar tu avance desde ChatGPT. Vos elegís qué compartir y podés desconectarlo cuando quieras». Primero permitir resumen: nombre, sitio saneado, estado, revisión, fecha, progreso y una próxima pregunta. Pedir evidencia solo al consultar comprobaciones guardadas; explicar fecha, alcance, resultado y limitaciones sin presentarla como auditoría nueva. No compartir relato de trabajo, borradores, decisiones privadas ni payload arbitrario.

Para el piloto conservar token de cinco minutos, permiso de diez y ausencia de refresh. Es una prueba acotada, no conexión persistente comercial. Antes de ampliar duración, definir renovación y experiencia de vencimiento con retiro verificable; no prometer acompañamiento continuo mediante una sesión que exige reautorizar cada diez minutos.

## Criterio de cierre

1. Owner ve exactamente proyecto y scopes, autoriza; otra identidad y otro proyecto son denegados por servidor.
2. ChatGPT lee resumen actual y siguiente pregunta coherente; evidencia solo con permiso adicional, fechas y resultados guardados.
3. Desconexión bloquea siguiente lectura mientras token sigue vigente, sin devolver datos ni reconectar automáticamente.
4. Cerrar piloto, conservar datos/grants retirados, registrar versión, origen, revisión y rollback de código. No DROP ni sobrescritura histórica.
5. Solo después evaluar servicio estable, acceso de clientes y discovery productivo/auth.md. La publicación debe describir capacidades realmente aceptadas; repetir auditor externo después de publicación efectiva, sin atribuir score a planes o fixtures.

## Próximo bloque técnico

Implementar límite server-side de proyecto para piloto y probar que un cliente no puede omitirlo/cambiarlo ni aprovechar un grant de otro proyecto. Preparar configuración cerrada del nuevo servicio y controles de identidad/bindings. Después preparar consentimiento concreto del expediente owner y aceptación cloud. DNSSEC y la auditoría externa conservan sus recibos/pendientes propios; este bloque no demuestra mejora numérica.

Preparación local posterior: AFW_OAUTH_PILOT_PROJECT_ID restringe GET de consentimiento, aprobación, intercambio y cada solicitud MCP. Omitir project selecciona el pin del servidor; otro proyecto propio u otro owner son rechazados. Cambiar el pin invalida un consentimiento pendiente, intercambio pendiente y consulta con token ya emitido. Un pin configurado vacío/ambiguo falla cerrado. Si la variable está ausente conserva el comportamiento del canary anterior; la configuración del piloto real debe incluirla obligatoriamente.

Plantilla `wrangler.delegated-real-pilot.example.jsonc` preparada con flag false, sin rutas y marcadores explícitos para recursos todavía no provisionados. No es un servicio existente ni una configuración lista para publicar. La base productiva está identificada; el resto debe verificarse antes de sustituir marcadores, y la identidad debe comprobarse desde Access. No ejecutar deploy de esta plantilla.

Validación local final: 721/721 pruebas, lint sin errores (advertencia histórica de imagen) y build aprobado. El pin y la ampliación del preflight no se publicaron en runtime durante este bloque. Próximo paso operativo: seleccionar expediente owner desde la sesión privada y provisionar recursos separados inicialmente cerrados; luego verificar consentimiento/lectura real y retirada.
