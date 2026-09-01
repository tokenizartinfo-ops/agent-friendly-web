# Gate 6D - CRM Lite Local v1

**Estado:** `local_planning_only`, sin datos reales ni persistencia

**Fecha:** 2026-08-31

## Que resuelve

Agent Friendly Web ya tiene una definicion comprobable de como una solicitud consentida podria avanzar comercialmente desde `new` hasta `won` o `lost`. La herramienta local normaliza metadata y prepara el siguiente cambio de etapa; no ejecuta el cambio.

El CRM no copia emails, cuerpos ni credenciales. Usa `contactRef`, `opportunityId`, categorias y referencias publicas. Esto permite coordinar trabajo sin convertir la base comercial en una segunda bandeja de correo ni exponer datos al modelo.

## Pipeline

```text
new -> qualified -> discovery -> proposal -> approved -> delivery -> verified -> won
  \______________________________________________________________________> lost
```

- solo se acepta el siguiente paso canonico;
- `lost` exige motivo allowlisted;
- `won` solo puede seguir a `verified`;
- `won` y `lost` son terminales;
- propuesta, aprobacion, entrega, verificacion y cierre exigen revision humana.

## Datos admitidos

- referencias opacas de oportunidad y contacto;
- dominio;
- segmento, problema, fuente e idioma;
- contexto del owner y mantenedor sin identidad personal;
- alcance por codigos;
- banda de valor no contractual;
- siguiente accion y fecha;
- hasta diez referencias HTTPS publicas;
- etapa y motivo de perdida.

Se rechazan PII, emails, nombres, telefonos, direcciones, texto libre, notas, cuerpos, adjuntos, mensajes crudos, secretos y campos desconocidos.

## Evidencia TDD

```text
node --test test/crm-lite.test.mjs
node --test test/crm-lite-contract.test.mjs
```

Los tests cubren normalizacion, privacidad, saltos, estados terminales, perdida razonada, idempotencia y ausencia de acciones. La regresion integral se registra antes de fusionar el PR.

## Limites

- `persistenceEnabled=false`;
- `automaticActionsAllowed=false`;
- sin D1, red, emails, propuestas, pagos, webhooks o cambios de sitios;
- sin scoring predictivo ni decisiones comerciales autonomas;
- contrato publico local: `public/.well-known/crm-lite-contract.json`.

## Gate remoto posterior

Persistir oportunidades exige aprobacion separada y una migracion D1 aditiva con backup/rollback. La primera prueba debe usar datos sinteticos, identidad allowlisted, aislamiento por actor, idempotencia, auditoria metadata-only y kill switch. El contacto real y el correo permanecen en sus fronteras propias.

## Paquete de aprobacion remota pendiente

El orden recomendado sigue siendo:

1. activar primero Gate 6B en staging privado con datos sinteticos;
2. verificar consent receipts, aislamiento y borrado;
3. activar Gate 6C solo como routing/borrador allowlisted;
4. recien despues agregar tablas CRM de Gate 6D y un unico pipeline sintetico;
5. no habilitar automatizaciones, scoring, propuestas ni pagos en ese canary.
