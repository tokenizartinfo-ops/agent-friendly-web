# Gate 6D.1 - Revision comercial sintetica local

**Estado:** `planned_not_persisted`; implementacion local lista, interruptor remoto apagado

**Fecha:** 2026-09-03

## Que resuelve

Este gate une de manera controlada la captura sintetica ya verificada con el planificador CRM Lite. Lee exclusivamente la solicitud fija `example.invalid` que tiene consentimiento `requested_plan` y prepara una vista comercial ordenada.

La salida permite entender el paso siguiente sin convertir la prueba en un CRM activo. Presenta la etapa actual, la proxima etapa sugerida, el alcance inicial y referencias opacas.

## Frontera

- requiere Cloudflare Access y un subject expresamente allowlisted;
- acepta unicamente `GET` sobre el origen y la ruta exactos del canary;
- no acepta identificadores, dominios, emails ni otros parametros del navegador;
- consulta D1 con una sentencia preparada y valores sinteticos fijos;
- exige el consentimiento sintetico `requested_plan`;
- no devuelve email, nombre, mensaje ni UUID original;
- no crea una tabla CRM y no modifica la solicitud fuente;
- no envia correos;
- no crea propuestas;
- no cobra pagos;
- no modifica sitios de clientes;
- produccion publica y recursos Tokenizart quedan fuera de alcance.

## Resultado

El adaptador normaliza una oportunidad `new`, propone el cambio a `qualified` y devuelve `planned_not_persisted`. El planificador mantiene `persistenceEnabled=false` y `automaticActionsAllowed=false`.

La vista humana privada se ubica en `/canary/commercial-review`. Muestra solo etiquetas comerciales saneadas y utiliza `textContent` para evitar renderizar contenido como HTML.

## Evidencia TDD

```text
node --test test/synthetic-commercial-review.test.mjs
node --test test/synthetic-commercial-review-page.test.mjs
node --test test/synthetic-commercial-review-contract.test.mjs
```

Las pruebas verifican kill switch, frontera exacta, identidad Access, allowlist, consulta preparada, consentimiento, ausencia de escrituras, referencias opacas y bloqueo de correo, propuestas y pagos.

## Proximo subgate

La verificacion remota debe desplegar primero la version con el interruptor apagado. Luego puede habilitarse temporalmente solo en `afw_canary`, confirmar la vista con identidad allowlisted, comparar los conteos D1 antes y despues y volver a apagar el interruptor.

Datos reales, persistencia CRM, scoring, propuestas, correo comercial y pagos permanecen fuera de alcance y requieren gates propios.
