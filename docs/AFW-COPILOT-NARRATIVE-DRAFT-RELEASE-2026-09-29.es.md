# Conservar el relato del copilot en el borrador privado

La PR #104 quedó integrada en `ab4021f125f8172b7627a58af552d191739553ae`. La persona puede revisar el relato de texto y las transcripciones corregidas por segmentos, anexarlo a las notas privadas existentes sin sobrescribirlas y aplicarlo al borrador. Debe usar después «Guardar cambios» para persistirlo. El copilot no guarda por sí mismo. Se rechazan duplicados, relatos con patrones conocidos de credenciales y la combinación que supere 5000 caracteres. La normalización de las notas privadas preserva párrafos y admite hasta 5000 caracteres; no hay migración de D1. Las notas no forman parte de `publicAttestationDraft`.

Pasaron 565 pruebas, lint sin errores (una advertencia previa de `<img>`), build y CI de la PR. Se reconstruyó el artefacto desde el commit integrado. La configuración mantuvo D1, Access, AI, cuota 5/60 y compuerta del único expediente sintético `6e972c18-cae1-402b-b959-646abd8499d7`. La versión `96a6cbe0-b287-4ca4-a4b9-28b73e447daa` se asignó al 0 % y después al 100 % del Worker `agent-friendly-web-web-production`. El smoke público posterior pasó 11/11.

En una sesión autenticada de Chrome se revisó un texto sintético en vista previa, se aplicó solo al borrador y se comprobó que el campo de notas conservaba el texto previo más el nuevo. La interfaz señaló que faltaba guardar. Tras recargar, el texto sintético desapareció y las notas persistidas permanecieron intactas. No se hizo un guardado real de 5000 caracteres en D1 ni se publicó contenido.

Rollback inmediato: asignar 100 % a `8f4153c4-f5bc-42c7-ae3e-741f28272b6b`. Cierre completo del piloto: asignar 100 % a `377e6c7a-a783-478b-86ef-e7290d15b97e`. No tocar D1.
