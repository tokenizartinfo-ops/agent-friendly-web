# AFW: aceptación de dos propietarios — 3 de octubre de 2026

## Resultado observado

Chrome normal y ventana de incógnito acreditaron dos identidades distintas. Se creó y guardó el expediente sintético «AFW prueba de aislamiento B», con organización y sitio públicos; no se inventaron objetivos ni se ejecutaron auditorías o publicaciones. D1 conserva seis proyectos. Las navegaciones de ambas sesiones al expediente ajeno mostraron «No pude abrir el expediente», campos vacíos y guardado deshabilitado; esta observación UI no acredita un código HTTP específico.

La ventana del Worker real delegado utilizó el cliente temporal `afw-two-owner-loopback-20261003`, callback localhost:8795 y únicamente `afw:project:read`. Ambas sesiones autorizaron su propio expediente durante diez minutos. El cliente MCP de prueba obtuvo 200 y el proyecto esperado en A y B; la entrada adicional para seleccionar otro proyecto fue rechazada. Esta comprobación no equivale a una segunda cuenta de ChatGPT: fue un cliente MCP real con dos sesiones humanas.

A las 22:54 UTC se retiraron ambos permisos desde sus respectivas pantallas. Las consultas posteriores con los tokens conservados únicamente en memoria devolvieron en ambos casos `403 delegated_access_denied`, sin datos. No se concedió lectura de evidencia, escritura, publicación ni renovación.

## Cierre y preservación

Candidato temporal `b96b5fe2-98a6-454b-866e-5d0914f68e40` sustituido por la versión cerrada `8dfb4024-14fa-4d7d-be33-229b16e5c652`, comprobada por API al 100%. Se retiraron exclusivamente las políticas QA `a190522d-6c8d-4637-9f66-3ecdc0ad884e` y `4dde67e7-2dfc-4d4c-94f7-ddb2ff9bedf8`, tras verificar su destinatario. Se eliminó únicamente el registro del cliente temporal; el servidor local fue detenido y sus credenciales permanecieron en memoria hasta ese cierre. Se preservaron los expedientes y el historial, así como las reglas originales del owner y primer cliente. Eliminar una regla no demuestra invalidación inmediata de una sesión Access previamente emitida; su duración de sesión de quince minutos es un control distinto de la retirada OAuth comprobada.

Sin publicación del Worker web principal, discovery del apex ni aumento acreditado del puntaje externo. La aceptación de renovación desde ChatGPT sigue en su recibo separado.

## Siguiente bloque

Aplicar identidad visual AFW al consentimiento y conexiones sin relajar CSP ni ampliar permisos. Después comprobar recuperación conversacional y contrato de apertura controlada antes de servicio comercial o discovery. No solicitar de nuevo este ingreso de prueba ni reconectar permisos retirados por inferencia.
