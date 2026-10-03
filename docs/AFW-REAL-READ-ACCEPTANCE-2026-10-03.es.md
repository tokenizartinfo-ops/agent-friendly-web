# Lectura del expediente real propio y retirada desde ChatGPT

## Resultado y alcance

El 3 de octubre de 2026, el owner completó ingreso Access y pulsó «Permitir lectura» para el borrador propio Agent Friendly Web. ChatGPT cloud consultó el resumen real mediante el complemento separado, y una nueva llamada después de desconectar fue denegada mientras su token seguía vigente. Se cerró el servicio y se conservaron expediente, permisos retirados y recursos. Este recibo acredita el piloto real propio de resumen; no habilita un servicio persistente, evidencia de un cliente ni discovery OAuth en el apex.

Preparación y recursos: [recibo de despliegue cerrado](AFW-REAL-READ-CLOSED-RELEASE-2026-10-03.es.md), PR191 integrada en main 1d1e6624c3f9ad287217e44fc0b00745180cf5e2. Código publicado e872dd4, candidato 89193ca7-124c-4cf7-8a7d-3676d40f7f6e; pin exclusivo al borrador propio. No se copiaron expedientes a D1 sintético ni se publicaron web principal/A2A/canary.

## Evidencia de autorización y cliente efectivo

- Complemento «AFW · expediente propio», plugin_asdk_app_6ac15fb7162c81918d743f978f88356c. Cliente público separado afw-chatgpt-real-pilot-20261003, none, PKCE S256, callback obtenido del constructor actual.
- Grant creado 2026-10-03T20:08:52.762Z con únicamente afw:project:read. Intercambio 20:09:02.360Z. Plazo del permiso 20:18:52.762Z; token de cinco minutos hasta 20:14:02.360Z. Fechas obtenidas de proyección acotada sin subjects, hashes ni tokens.
- [Chat cloud de aceptación](https://chatgpt.com/local/01a10364-a63c-7776-acb3-2065d187c011), host durable, entorno AFW Operations, GPT-6.1 Sol Bajo. Título: «@AFW · expediente propio Prueba de aceptación AFW de solo l…».
- Primer turno completado 20:12:02Z: dos llamadas reales a afw_expediente_propio.read_project_summary, ambas completed. Respuesta: Agent Friendly Web, https://agentfriendlyweb.dev/, progreso 17 %, revisión 1, fecha 2026-10-03 16:43:37 Argentina; pregunta sobre qué deben poder descubrir o hacer personas/agentes. No completó campos ni publicó.

El 17 % es el progreso del expediente, no capacidad AF, certificado ni score externo. La siguiente pregunta orienta a confirmar el objetivo; no declara un objetivo por inferencia. No se invocó la herramienta de evidencia ni se amplió ese scope: el borrador nuevo no tiene una auditoría nueva acreditada por esta prueba.

## Retirada antes del vencimiento

Se pulsó Desconectar en la página de conexiones del servicio real. UI mostró «Desconectada» y que no era necesaria otra acción. Store autoritativo registró revoked_at 20:12:17.204Z. Una nueva solicitud del chat cloud invocó read_project_summary, estado failed, finalizó 20:12:47Z con HTTP403, delegated_access_denied (envoltorio INVALID_ARGUMENT), sin devolver el resumen ni reconectar. La llamada ocurrió antes de 20:14:02.360Z: prueba retirada, no simple expiración.

Screenshot local ignorado: output/afw-real-read-revocation-20261003.png. No contiene OTP, tokens ni subjects; no se publica como asset del producto. Las respuestas anteriores permanecen en el chat: desconectar impide nuevas consultas, no borra lo que ya fue leído.

## Cierre comprobado y siguiente bloque

Restaurada versión cerrada 4db09f45-c082-44b1-ab6f-d019467c9178 al 100% mediante deploy 2026-10-03T20:13:23.816404Z, confirmado por API. Después del cierre MCP y ambos metadatos OAuth respondieron 404. Grant retirado, datos preservados; ninguna migración ni borrado. La configuración versionada sigue false/plazo vencido y sirve como rollback de futuras ventanas.

Pruebas técnicas de la misma fuente: 721/721, lint sin errores con advertencia histórica de imagen, build y dry-run aprobados en PR191; CI de PR191 aprobada. Este bloque posterior agrega únicamente documentación de aceptación.

Próximo: diseñar y probar renovación proporcional y experiencia de sesión vencida, con retirada efectiva, antes de prometer una conexión continua o abrir clientes. Revisar coherencia entre progreso del expediente y guía conversacional sin equipararlos al score AF. Mantener piloto real cerrado; cualquier futura evidencia privada requiere alcance específico. DNSSEC y auditor externo siguen sus recibos propios; esta aceptación no acredita un aumento numérico externo.
