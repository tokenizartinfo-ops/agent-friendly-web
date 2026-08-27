# Bloque 3: contrato del asistente de intake

**Estado:** prototipo publico controlado  
**Contrato:** `intake-assistant.v1`  
**Fecha:** 2026-08-27

## Objetivo

Permitir que una persona describa su organizacion con datos incompletos o desordenados y reciba propuestas separadas por campo. El humano decide que conservar antes de copiar o usar el resultado.

## Limites de esta version

- procesamiento determinista en el navegador;
- campos allowlisted;
- deteccion fail-closed de credenciales probables;
- fragmento de origen y confianza por propuesta;
- seleccion humana obligatoria;
- sin modelo externo, persistencia, expediente, email, voz, pagos ni mutacion del sitio.

## Evolucion controlada

1. validar utilidad y falsos positivos con personas;
2. versionar idiomas y taxonomias;
3. agregar preview de diferencias contra el expediente;
4. pedir consentimiento field-scoped;
5. guardar solo campos elegidos en un endpoint autenticado e idempotente;
6. incorporar voz o correo mediante contratos y retencion separados.

Copiar una propuesta no equivale a publicarla ni a autorizar una implementacion.
