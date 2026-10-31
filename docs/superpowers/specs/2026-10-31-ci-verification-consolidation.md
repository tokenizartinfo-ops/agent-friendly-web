# Consolidar verificaciones duplicadas de CI · 31 octubre 2026

## Problema y decisión
En CI41200023749/job124533822554, las22 comprobaciones focales consumieron230segundos, además de263segundos de npm test. Sus54 archivos únicos pertenecen todos a test/*.test.mjs, el mismo glob de la suite completa; los20 pasos históricos no realizan preparación ni tienen un entorno distinto: solo ejecutan node --test sobre subconjuntos que vuelven a ejecutarse después.

Conservar los dos controles cortos de la frontera QA cerrada como feedback rápido y ejecutar una sola suite completa como resultado canónico. Retirar únicamente los20 pasos históricos duplicados. Conservar lint/build, artefacto dist en push, permisos contents:read, job verify, Ubuntu24.04, Node22 y timeout20min. No borrar, omitir, renombrar ni modificar tests; el skip anterior permanece explícito. No cambiar otros workflows ni runtime/secretos.

## Validación proporcional
La validación es la ejecución del workflow candidato en Actions: dos controles QA, TODOS los tests, lint y build correctos. Comparar recuentos con el mismo código y registrar tiempos como observación, no SLA/garantía. Revisar diff con otro agente antes del merge. No agregar un test que solo replique el YAML. Reversión: restaurar únicamente ci.yml del padre aceptado; sin efecto sobre recursos de AFW.
