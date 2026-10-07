# Autoridad exclusiva para preparar orientación

Preparación local AFW del 6 de octubre de 2026. Continúa el contrato privado consentido; no configura un servicio remoto.

`lib/assistance-goal-proposal-identity.mjs` prepara firma y verificación de `afw.goal-guidance.propose.v1` para el origen previsto `goal-context-canary.agentfriendlyweb.dev`, ruta `/proposal`. Esta ruta no está habilitada por este módulo ni anunciada como capacidad operativa pública.

Exige una identidad Access RS256 de aplicación con sub vacío, clientId dedicado y una sola audiencia exacta. La configuración debe declarar por separado los IDs/audiencias de lectura y operación: los tres pares deben ser distintos. La clave HMAC de propuesta debe ser distinta de las de lectura y señal, sin copiar secretos al repositorio o navegador. Solo los valores sintéticos de pruebas aparecen en Git.

La firma liga propósito, origen, ruta, timestamp y cuerpo exacto. El cuerpo contiene exclusivamente eventId, projectRef, runId, revision y receiptId; límite512bytes, JSON y timestamp con tolerancia60segundos. Rechaza peticiones del navegador, campos privados, ruta distinta, identidad humana, JWT vencido, audiencias múltiples y reutilización de permiso/clave de lectura u operación.

JWT válido no acredita revocación viva de Access. La verificación tampoco sustituye inscripción, identidad del dueño, consentimiento vigente, revisión, reserva operacional, huellas del recibo o límite de ventana. Esos controles siguen siendo requisitos independientes del coordinador antes y después de generar/guardar. El ledger limita a un intento por recibo; la firma por sí sola no previene repetición ni autoriza cambios.

Pruebas iniciales rojas por ausencia del módulo, seguidas de verificación criptográfica JWT/HMAC real con claves sintéticas. Trece pruebas focalizadas de autoridad de propuesta, autoridad de lectura y coordinador aprobadas. Suite final1072/1072 y lint focalizado aprobados; build y lint completos confirmados por CI37559523375 para5e57759 previo. Consultar la CI de la revisión exacta antes de integrar. El módulo no añade modelo, claves reales, coste de proveedor, dominio, binding, policy, cron o acceso cloud.

Siguiente: adaptador HTTP cerrado que componga esta verificación con fuente primaria, recibo, reserva y presupuesto; después custodia y ensayo propio finito con preservación/rollback. No activar generación real ni clientes por esta evidencia local.
