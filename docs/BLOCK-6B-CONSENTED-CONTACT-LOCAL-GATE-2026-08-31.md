# Block 6B - Consented Contact Local Gate

**Fecha:** 2026-08-31

**Resultado:** implementado y verificado localmente; datos reales deshabilitados

## Que quedo preparado

- CTA opcional `Recibir mi plan` despues de una auditoria completa;
- formulario y resumen local en espanol, ingles y portugues;
- consentimiento requerido solo para el plan solicitado;
- contacto comercial y novedades separados y desmarcados;
- contrato publico `/.well-known/contact-intake-contract.json`;
- endpoint `POST /api/contact-intake` fisicamente cerrado: devuelve `503` sin leer el cuerpo;
- validacion Turnstile server-side preparada con action, hostname, timeout e idempotencia;
- tablas D1 aditivas `contact_leads` y `consent_receipts`;
- hash de evidencia de consentimiento sin guardar token Turnstile;
- catalogos agenticos actualizados con estado `prototype`.

## Que no esta activo

- no existe un flag capaz de activar la ruta publica en este gate;
- no se aplico la migracion D1 remota;
- no se provisiono Site Key ni Secret Key de Turnstile;
- no se configura correo, DNS, routing ni proveedor de salida;
- no hay envio de planes ni newsletter;
- no se leen leads ni existe panel CRM;
- no se almacena ningun dato completado en la vista previa.

## Operacion futura

Para abrir `staging_allowlist` se necesita una aprobacion separada y esta secuencia. No basta con cambiar una variable:

1. revisar politica de privacidad, retencion, rectificacion, baja y supresion;
2. exportar backup de D1 staging y registrar rollback;
3. aplicar `drizzle/0004_common_guardsmen.sql` y `drizzle/0005_normal_ma_gnuci.sql` solo a D1 staging;
4. crear widget Turnstile para hostname de staging;
5. guardar `TURNSTILE_SECRET_KEY` como secret y la Site Key como variable publica;
6. implementar lectura acotada del cuerpo y respuestas diferenciadas para errores de cliente y servicio;
7. implementar rate limiting real en el edge o mediante un binding verificable;
8. crear una ruta activa separada solo para staging allowlisted;
9. probar ausencia, invalidez, expiracion y reuso de token;
10. probar idempotencia, conflicto por contenido distinto y cero duplicados;
11. limitar destinatarios y no enviar correo todavia.

## Rollback

El Gate 6B no necesita rollback operativo porque la ruta publica permanece cerrada. En el futuro `staging_allowlist` debera incluir un kill switch que detenga nuevas escrituras sin borrar evidencia existente. Las migraciones son aditivas; las tablas no se eliminan durante un incidente. Cualquier eliminacion o restauracion requiere backup, decision humana y runbook separado.

## Decision pendiente

El siguiente gate remoto no es publicacion general. Es `staging_allowlist` con D1 aislada y Turnstile de prueba. Gate 6C de correo conserva DNS, aliases, remitente y entrega como decision posterior.
