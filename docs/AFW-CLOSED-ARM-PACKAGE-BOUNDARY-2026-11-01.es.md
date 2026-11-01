# Frontera del paquete cerrado de observación ARM

01nov2026 UTC. PR690/main80ef7a3e aceptada: árbol9822eb3f, CI41258635626/job124707069889 14/940/4388PASS,0FAIL1skip existente, lint0/14 existentes y cinco paquetesPASS; revisión0P1/P2.

Cualificación real de BASE c570: Actions41259544185/job124709772906 leyó únicamente su módulo inmutable395915B/hash4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f y ejecutó25/25 pruebas nativas de herencia/observación. El paso posterior de preservación rechazó la frontera del bundle antes de publicar: no hubo upload, activación ni ensayo remoto. No reintentar ese run ni atribuirlo a Cloudflare.

Se agrega una comprobación del resultado real de esbuild usando las opciones del workflow, con imports hermanos exactos y límite131072B. Debe reproducir el rechazo antes de ajustar las opciones. No se modifica runtime, BASE, permisos, schemas, APIs o contratos de autoridad. No se afloja el validador del paquete.

Diagnóstico cloud separado: el chat Codex cloud correcto ejecutó Node sin red/archivos, pero esbuild no estaba instalado en /workspace; no instaló ni cambió nada. Esto no acredita conectividad ni AFW Operations. El control CLI oficial de GitHub verificó repo1347578006/push/main80ef7a3e y despachó una sola cualificación. Sin archivos ni dependencias locales.

Schema de borradores ya instalado solo en QA_DB676, intención de DDL CONSUMIDA y recibo issue497#6551153777; no repetir CREATE. PR689 fuente aceptada sin publicación. operationalReadiness=false; ARM/guard/finalizer/consumidor/baja/PCoff/Max siguen pendientes.
