# Gate 6C.3C - Integracion privada Review Ready local

**Estado:** `private_flow_adapter_local_ready_remote_disabled`

**Superado el 2026-09-03 por:** `private_flow_adapter_remote_verified_kill_switch_off`. Este documento conserva el preflight local; la verificacion remota se documenta en `docs/BLOCK-6C3D-SYNTHETIC-CONTACT-CANARY-REMOTE-2026-09-03.md`.

**Fecha:** 2026-09-03

## Resultado

El aviso interno verificado en Gate 6C.3B ya cuenta con un adaptador local para conectarse a una solicitud privada real sin copiar datos personales al flujo de correo. El adaptador recibe solamente el UUID opaco de la solicitud y una aprobacion humana explicita.

Antes de preparar el aviso, consulta D1 con una sentencia enlazada que selecciona exclusivamente:

- `id`;
- `locale`;
- `state`.

No selecciona email, nombre, dominio, organizacion, rol, objetivo ni texto. Solo acepta una fila `contact_leads` existente con estado `new`, que representa una solicitud recibida y pendiente de revision inicial. No modifica esa fila.

## Derivacion segura

A partir del UUID persistido, el adaptador deriva internamente el `eventId` y la clave de idempotencia. El idioma proviene de D1 y debe ser `es`, `en` o `pt`. El resultado valida contra `agent-friendly-web.email-review-ready.v1` y queda marcado `prepared_not_sent`.

La interfaz o caller no pueden indicar destinatario, asunto, cuerpo, HTML, adjuntos, dominio, PII, secretos ni identificadores de entrega alternativos.

## Limites vigentes

- no se desplego el adaptador;
- no se modifico D1 remota ni se agrego migracion;
- no se envio correo;
- no se activo captura de contactos;
- no existe union automatica entre alta y aviso;
- `AFW_EMAIL_REVIEW_READY_ENABLED=false` continua gobernando el canary;
- produccion publica no cambio;
- Tokenizart no fue utilizado ni modificado.

## Pruebas TDD

```text
node --test test/private-review-ready-integration.test.mjs
node --test test/email-operations-contract.test.mjs test/private-review-ready-integration.test.mjs
```

Las pruebas cubren forma exacta, rechazo de datos privados, SQL minimo, parametro enlazado, fuente inexistente, estado no elegible, idioma invalido, falla D1 saneada, derivacion determinista y ausencia de envio/persistencia/reintento.

La regresion final cerro con `489/489` pruebas, lint sin errores y build vinext completo `5/5`. El smoke de produccion paso `11/11`; un primer intento tuvo un fallo transitorio de red sobre `/expediente`, cuya respuesta `302` de Cloudflare Access se verifico inmediatamente por separado y en la repeticion integral.

## Siguiente gate

Gate 6C.3D debe ejecutarse solo despues de reconstruir Gate 6B en el mismo `afw_canary` canonico. El orden sera: persistir una solicitud sintetica, preparar el aviso con el adaptador, verificar el cierre con el kill switch OFF y recien entonces evaluar una unica accion humana. No se usaran el Worker de contacto legacy ni `*.chatgpt.site`.

Un envio adicional continuara requiriendo confirmacion humana en el momento exacto de la accion. El adaptador no habilita correo automatico, correo a clientes, marketing ni reintentos.
