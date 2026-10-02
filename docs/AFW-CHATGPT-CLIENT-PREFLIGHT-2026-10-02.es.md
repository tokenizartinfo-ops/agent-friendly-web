# Piloto privado ChatGPT: preparación del registro

Fecha2026-10-02. Estado: revisión de compatibilidad y plan, sin servicio privado nuevo habilitado. El A2A público publicado hoy es independiente y no concede acceso a expedientes.

## Decisión para el primer piloto

Mantener un cliente OAuth prerregistrado y permitido explícitamente. El runtime actual deshabilita CIMD y `/oauth/register`; los dos scopes permitidos son `afw:project:read` y `afw:evidence:read`. No habilitar DCR abierto para facilitar la prueba. La documentación de OpenAI contempla clientes predefinidos además de CIMD/DCR; comprobar que la interfaz real de esta cuenta permita cargar ese cliente antes de registrarlo o abrir el canary.

El callback debe copiarse de la gestión del MCP en ChatGPT. Actualmente puede ser específico de la conexión (`https://chatgpt.com/connector/oauth/{callback_id}`); el callback estable requiere identificación de issuer compatible o una conexión anterior admitida. No registrar un callback supuesto ni permitir prefijos/comodines. No confundir este flujo con Sign in with ChatGPT o el uso de tokens de la suscripción por AFW.

## Comprobaciones sin expediente real

- Confirmar mecanismo de registro, callback exacto y método del token endpoint admitidos por la UI. Guardar únicamente metadata pública y referencias opacas; secretos, cookies, códigos y tokens quedan fuera de Git/logs/chat.
- Registrar un único cliente de piloto en el canary separado; mantener identidad Access, PKCE S256, resource exacto, scopes de lectura, plazo y revocación. El token actual dura5 minutos y no tiene refresh; prever reautorización humana sin inventar renovación persistente.
- Comprobar challenge401 y protected-resource metadata, issuer/authorization/token endpoints, S256 y método de cliente. Anunciar RFC9207 solo si respuestas de éxito y error incluyen `iss` correcto; probarlo antes de elegir callback estable.
- Probar ChatGPT conectar → seleccionar proyecto sintético propio → leer resumen/evidencia → desconectar → siguiente lectura rechazada con token todavía vigente. Seleccionar expediente es parte del consentimiento; no determinarlo por correo ni un parámetro del agente.
- Comprobar datos de otro owner, scope ampliado, recurso equivocado, replay y token expirado; contrastar resultados reales con las regresiones locales existentes.

## Paso posterior

Solo tras interoperabilidad sintética de ChatGPT y verificación del runtime desplegado, preparar piloto real mínimo con lectura proporcional y evidencia fechada del expediente autorizado. No copiar datos reales al canary sintético. Definir recursos productivos, migraciones aplicables, consentimiento, desconexión, vigencia y rollback antes de abrir el servicio. Publicar OAuth/Auth.md cuando describan ese servicio real y su registro operativo; una tarjeta A2A aprobada no acredita estas capacidades.

Fuentes actuales: [autenticación de plugins](https://developers.openai.com/plugins/build/auth), especialmente client registration, issuer identification y redirect URL. La disponibilidad del formulario de registro en esta cuenta todavía no está comprobada. La aceptación del cliente local anterior sigue en [recibo OAuth](AFW-OAUTH-ACCEPTANCE-2026-10-01.es.md); no demuestra interoperabilidad ChatGPT.
