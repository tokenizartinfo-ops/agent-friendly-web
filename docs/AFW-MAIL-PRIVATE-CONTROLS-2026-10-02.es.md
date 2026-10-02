# Controles privados de correo AFW

Estado al 2 de octubre: composición implementada y probada; infraestructura canary aislada provisionada, sin envío activado. No acredita un recorrido autenticado real ni operación autónoma desde la nube.

## Operación y separación

El operador humano puede consultar `/review/<key>`, aprobar `/approve` y revocar `/revoke`. La identidad deriva del JWT Access firmado y de un subject permitido en servidor. Las mutaciones requieren Origin exacto y JSON; no aceptan actor, destinatario o texto proporcionados por el navegador. Una aprobación vincula el hash del contenido custodiado, vence en diez minutos y se registra con la transición del outbox en una transacción. Una carrera permite solo una aprobación. Un fallo de almacenamiento revierte ambas escrituras.

El consumidor dispone únicamente de `/consume/<key>`. Requiere JWT de servicio, audience exclusiva diferente de la humana, `type=app`, subject vacío y Client ID exacto. Rechaza llamadas con Origin o cuerpo y exige limitador configurado. Lee contenido y autorización desde custodia; cada comprobación usa una sesión D1 `first-primary` para evitar una lectura de revocación atrasada. La revocación no retira mensajes ya aceptados por el proveedor. Ninguna ruta permite purgar contenido o ingerir correos públicos.

## Infraestructura aislada

- D1 `agent-friendly-web-mail-canary`: `e1d480e2-e369-4f0b-ae7d-5cab3b7eee16`; replicación de lectura desactivada. Esquema `worker/mail/schema.sql` aplicado; cuatro tablas y outbox vacío comprobados.
- Access `AgentFriendlyWebMailOperatorCanary`: aplicación `a5c2c609-5314-47d9-a2cf-9cd97e2131e4`, hostname `mail-ops-canary.agentfriendlyweb.dev`.
- Access `AgentFriendlyWebMailConsumerCanary`: aplicación `34c6b2fd-364e-4f57-a182-bd6796520bdf`, hostname `mail-consumer-canary.agentfriendlyweb.dev`.
- Ambas aplicaciones tienen política explícita deny everyone. No se concedió acceso a usuarios ni se creó un token de servicio.
- `wrangler.mail-canary.jsonc` mantiene ambas funciones en false, sin binding EMAIL, limitador, subject humano, Client ID ni cron. Workers.dev y previews desactivados. Dry-run correcto: 59.91 KiB, gzip 15.41 KiB. Esto no acredita despliegue remoto.

No se modifica el Worker ni D1 de producción. Rollback: mantener flags desactivados y retirar rutas del canary, preservando D1 y políticas Access. No borrar custodia, decisiones o recibos para revertir código.

## Validación y próximos límites

Siete pruebas nuevas verifican identidad firmada, origen, hash, campos desconocidos, rollback transaccional, concurrencia, contenido retirado, separación humano/servicio y cierre predeterminado del Worker. Suite completa: 686 pruebas aprobadas; build aprobado. Lint sin errores; advertencia histórica de imagen en portada. El aviso nuevo de export anónimo se corrigió y el lint focalizado pasó.

Siguiente bloque: desplegar exclusivamente el canary deshabilitado, verificar sus políticas y preparar una pantalla privada mínima de revisión antes de pedir una sesión real. La activación del consumidor requiere custodia de credenciales y permiso específico; no confundir conectores disponibles en este ordenador con disponibilidad en el gerente cloud. El primer cliente todavía necesita completar su acceso real. No duplicar correos ni crear su expediente bajo la identidad del operador.
