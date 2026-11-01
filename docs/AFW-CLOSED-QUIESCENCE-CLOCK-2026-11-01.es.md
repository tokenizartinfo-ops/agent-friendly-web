# Diagnóstico cerrado y reloj de cola: continuidad AFW
01nov2026 UTC. Proyecto AFW, repositorio agent-friendly-web; infraestructura privada de QA, separada de Tokenizart/FCO.

PR693/main dcfde7fc60dfb96bcae21e98c50f2739db42ca60 está integrada con14/952/4400PASS0FAIL1skip preexistente, lint0errors14warnings existentes, cinco paquetes y revisión0P1/P2. Cualificación exactBASE41265959373/job124728696340:29PASS, wrapper48373B/SHA3c9e199d33b68ec69be10bde4fee3ec3c5d954909a8a01076d09c246fda9f308.

La observación0fbb984456c3f005967838d8516c33c031f783406d9ebf298df9ae3376cd502b se CONSUMIÓ y CERRÓ, recibo issue497#6552451638. Candidato0adf1f2d, DEP2f74c886, un Workflow completo pero blocked/schedules/request_failed/httpnull/reads18. Cola3552ms y ejecución1448ms agotaron EXACTAMENTE el contrato v1 de5000ms desde enqueue. No acredita una caída del proveedor ni una clave inválida, ni quiescencia completa. No repetir intención ni ventana.

Una restauración confirmada volvió a c570@100%/DEP32861206-59dd-4d1d-be9c-03c9a073ba8f. Lectura primaria independiente02:40:35.236UTC,25GET: módulo/configuración exactos de tres servicios,14/8/3flagsfalse,22Workflows propios terminales, Container/cron/tails vacíos, namespaces y exposición deshabilitada preservados. Canary2607/DEP7b5a y operador855/DEP9790 sin cambios. Evidencia fechada, no garantía futura.

La variante v2 propuesta es SOLO diagnóstico cerrado con propósito/contexto/operación distintos. Mantiene intactos v1 y el contrato real de ARM. Limita cola previa a<5000ms, ejecución desde primera entrada a<=5000ms y edad total original a<10000ms, además del vencimiento compilado. El plazo se fija antes de Step.do y no se renueva en callbacks, lecturas ni settlement. Cada nuevo intento real requiere su propio H y plan consumible; no es una interfaz RPC genérica ni guardia.

Un resultado v2 no autoriza ARM, efectos, grants, reservas o ejecución de agentes, ni demuestra entrega útil, baja nativa o PC-off. Se exige revisión exacta, CI, cualificación exactBASE y nueva intención concreta antes de publicación. El esquema de borradores está instalado vacío; falta integrar preparación/ARM/guard/finalizer/consumidor y verificar el recorrido real. operationalReadiness=false. Ningún nuevo OTP, token, permiso o dato de Max.
