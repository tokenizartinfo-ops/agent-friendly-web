# Gate 6D.1 - Revision comercial sintetica local

**Estado:** `synthetic_commercial_review_verified_kill_switch_off`; implementacion y canary read-only verificados, interruptor remoto apagado

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

## Verificacion remota cerrada

La verificacion remota se completo en `afw_canary`: rechazo con el interruptor apagado, lectura temporal con identidad Access allowlisted, respuesta `planned_not_persisted`, QA visual de escritorio y movil, conteos D1 invariables y rollback al interruptor apagado. La evidencia detallada vive en `docs/BLOCK-6D1-SYNTHETIC-COMMERCIAL-REVIEW-REMOTE-2026-09-03.md` y `docs/evidence/synthetic-commercial-review-remote-2026-09-03.json`.

Datos reales, persistencia CRM, scoring, propuestas, correo comercial y pagos permanecen fuera de alcance y requieren gates propios.
