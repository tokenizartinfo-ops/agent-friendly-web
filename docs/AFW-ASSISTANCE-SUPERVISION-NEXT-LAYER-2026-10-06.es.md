# AFW: siguiente capa de acompañamiento operacional

Diseño preparado el 6 de octubre de 2026; no acredita implementación ni activación. Continúa el puente de guardados descrito en AFW-DOSSIER-SUPERVISION-CONTRACT-2026-10-06.es.md.

## Resultado buscado

El usuario permanece dentro del expediente, con una pregunta o acción principal. Puede pedir ayuda sin describir el mismo problema por correo. El sistema conserva el borrador y distingue el recibo de guardado, el pedido de ayuda y la respuesta del acompañante. Una revisión de metadata nunca se presenta como resolución del problema.

## Evidencia actual y límites

`app/api/projects/route.ts` resuelve identidad y propiedad del expediente por servidor. `app/api/projects/[projectId]/copilot/route.ts` exige origen, proyecto permitido, consentimiento vigente y límite de solicitudes antes de procesar texto. `lib/project-autosave.mjs` suspende guardados en conflicto o renovación de sesión. `lib/copilot-next-turn.mjs` prioriza recuperación y preguntas de una en una. Estos controles deben conservarse.

El puente operacional actual solo admite eventos confirmados `project_created` y `project_updated`. No entrega respuestas, transcripciones o identidad al gerente. No puede inferir una dificultad a partir de campos vacíos, ni leer el expediente para repreguntar. Su aceptación funcional y asociación a un disparador cloud son prerrequisitos de promoción.

## Bloques consecutivos de implementación

1. **Pedido explícito de ayuda.** Endpoint autenticado y mismo origen, propiedad resuelta por servidor y revisión esperada. Solo códigos enumerados: orientación, guardado, comparación o entrega. Identificador idempotente del intento. Recibo duradero privado ligado al expediente; no incluir texto libre en la señal operacional. La interfaz confirma el recibo, conserva el contexto local y permite seguir trabajando.
2. **Fallo comprobado.** Registrar solamente fallos que el servidor pudo verificar después de resolver propietario/proyecto. No aceptar etiquetas de error arbitrarias enviadas por el cliente como evidencia. Un fallo de red previo al servidor no puede prometer recepción: conservar intento local y ofrecer reintento. Evitar nuevos incidentes por cada autosave; deduplicar por intento y transición.
3. **Outbox y transporte versionado.** Añadir un contrato separado para ayuda/fallo; no ampliar silenciosamente los dos tipos de guardado existentes. Payload operacional mínimo: referencia opaca, tipo enumerado, revisión, fechas y recibo opaco. Proyección con separación de propósito, firma, ventana, inscripción y cursor. Reintento tras recibo perdido conserva identidad del evento. La escritura del recibo y su outbox deben ser atómicas; el envío remoto queda fuera del camino de guardado.
4. **Seguimiento en la aplicación.** Estado visible basado en recibos reales: recibido, revisión pendiente, respuesta disponible y retirado. No usar «estoy revisándolo» por el mero alta del evento o por un cron configurado. Revisiones antiguas quedan superseded; una nueva edición obliga a reevaluar. No duplicar avisos si no cambia el estado.
5. **Contexto privado consentido.** Antes de que el gerente formule una repregunta, crear un servicio distinto de lectura consentida: owner/proyecto/purpose resueltos por servidor, alcance mínimo, vigencia y revocación comprobadas en cada lectura. La identidad operacional actual no adquiere acceso privado. Las sugerencias vuelven al borrador para revisión del usuario; ninguna publicación o cambio de alcance se infiere de una sugerencia.
6. **Aprendizaje operacional.** Registrar fricción y resultado con referencia opaca. Reproducir con datos sintéticos, comprobar causa, diff y pruebas proporcionales; desplegar con rollback y postcheck. Solo después cerrar como corregido. El Fix-Center arquitectónico recibe aprendizaje saneado, no tickets ni contenido del cliente.

## Criterios de cierre

- Dos identidades: un usuario no puede pedir ayuda ni consultar recibos de otro.
- Doble clic y respuesta perdida producen un recibo y un evento, no dos investigaciones.
- Conflicto y sesión expirada preservan el borrador; el mensaje no afirma que se guardó.
- Señal operacional contiene exclusivamente el contrato exacto, nunca notas, correo, dominio o transcripción.
- Una revisión cloud real queda correlacionada con evento, fuente e instancia; `reviewed` no equivale a `resolved`.
- Retirada corta la siguiente consulta y entrega; el historial permanece.
- El piloto de Max solo se invita después de verificar la ruta app-first y revisar previamente el correo propio solicitado por Gabriel.

## Reversión y promoción

Flags cerrados por defecto, inscripción propia limitada, ledger QA separado y ventana finita. Retirar disparador, cerrar flags/deadline e identidad antes de revertir código; preservar recibos. No cambiar la inscripción de clientes ni activar guardia permanente por esta nota. Una programación antigua con otra fuente/thread no demuestra adopción del contrato nuevo.
