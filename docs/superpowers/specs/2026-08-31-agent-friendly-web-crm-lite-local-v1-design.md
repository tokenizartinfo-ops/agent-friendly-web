# Agent Friendly Web CRM Lite Local v1

**Estado:** especificacion local; persistencia, automatizacion y datos reales deshabilitados

## Objetivo

Definir un pipeline comercial minimo, auditable y reversible para convertir una solicitud consentida en una oportunidad sin duplicar emails, cuerpos de mensajes, credenciales ni datos personales innecesarios.

## Pipeline canonico

`new -> qualified -> discovery -> proposal -> approved -> delivery -> verified -> won`

Una oportunidad no terminal puede pasar a `lost` con un motivo canonico. No se permiten saltos, reaperturas ni transiciones desde estados terminales en v1.

## Metadata minima

- `opportunityId` y `contactRef` opacos;
- dominio publico normalizado;
- segmento, problema y fuente allowlisted;
- idioma;
- contexto del owner y del mantenedor, sin nombres ni emails;
- alcance mediante codigos allowlisted;
- banda de valor estimada, no precio contractual;
- siguiente accion y fecha opcional;
- referencias HTTPS publicas acotadas;
- etapa actual y motivo de perdida cuando corresponda.

## Frontera de privacidad

El modulo rechaza nombres, emails, telefonos, direcciones, cuerpos, notas libres, adjuntos, cookies, tokens, contrasenas y campos desconocidos. El contacto consentido permanece en su propia frontera y el CRM recibe solo `contactRef`.

## Transiciones

Cada transicion produce un plan idempotente metadata-only. Nunca persiste ni modifica una oportunidad. Las etapas `proposal`, `approved`, `delivery`, `verified`, `won` y `lost` requieren revision humana.

`lost` exige uno de estos motivos: `budget`, `timing`, `no_fit`, `no_response`, `maintainer_blocked` u `other`.

## Criterios de aceptacion

1. La metadata valida se normaliza de forma determinista.
2. PII, texto libre, secretos y campos desconocidos fallan cerrados.
3. Solo se permite el siguiente estado canonico o `lost`.
4. Estados terminales no admiten cambios.
5. `won` solo puede seguir a `verified`.
6. El mismo evento produce el mismo `transitionPlanId`.
7. El resultado declara `persistenceEnabled=false` y `automaticActionsAllowed=false`.
8. El contrato machine-readable informa `local_planning_only`.

## Fuera de alcance

D1 remota, importacion de leads, emails reales, scoring automatico, propuestas, precios, pagos, newsletter, tareas, calendario, webhooks, A2A y acciones sobre sitios requieren gates posteriores y aprobacion separada.
