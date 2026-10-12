# Orden para descubrir y probar avisos nativos AFW

## Observaciones de las superficies

El preflight Work y la inspección del mismo dot Chavo no identificaron una fuente inequívoca del piloto AFW en `automations_list_event_sources`. La enumeración del dot se realizó una sola vez el12/10 a las14:59ART, sin error declarado ni llamadas al canary. No se obtuvo `connector_id` ni evento seleccionable. Esto no acredita incompatibilidad de plataforma.

Chavo declara `automations_create_for_aeon` para su propia superficie y `automations_update`, con triggers genéricos `connector_id`, `event`, `params`; no se ejecutaron. No declarar un callback, secreto, TTL o retirada desde campos que la herramienta no expone. El piloto conserva dos herramientas de lectura; no contiene todavía un catálogo de eventos aceptado en la interfaz.

El responsable verificó en los ajustes del plugin el botón **Actualizar herramientas**. La [documentación oficial de MCP Events](https://developers.openai.com/plugins/build/mcp-events) exige descubrir el servidor, listar sus eventos y actualizar el catálogo cuando cambia. Describe una suscripción nativa con callback y firma suministrados por ChatGPT; una respuesta HTTP2xx no acredita la respuesta útil posterior.

## Evitar una dependencia circular

El servidor AFW limita `events/list` al permiso vigente del proyecto y al consentimiento de avisos. Mientras el canary está cerrado o no existe ese consentimiento, no debe divulgar el catálogo privado. Por tanto, **no exigir que el consumidor ya conozca la fuente privada antes del permiso y del rescan**. La asociación exacta se comprueba después del descubrimiento autorizado; antes se prepara la operación y su cierre, sin inventar IDs.

| Fase | Condición y acción | Evidencia de cierre |
| --- | --- | --- |
| Preparación sin permiso | Código aceptado, recurso propio identificado, rescan localizado y operaciones preparadas; cierre original antes de cualquier admisión | Revisión/CI, versión cerrada, mismos recursos y claves, cero procesos |
| Conexión propia | Lectura solo del ensayo, plazo original, consentimiento real de avisos separado | Grant intercambiado en primaria y constancia de propósito; no inferidos de la lectura |
| Descubrimiento autorizado | Actualizar herramientas y comprobar catálogo del mismo piloto | Evento `afw.dossier.changed` y filtro propio resueltos por servidor; asociación inequívoca del consumidor |
| Suscripción nativa | Solicitud acotada en el consumidor elegido; usar su contrato real | Callback/firma emitidos por plataforma, verificación aceptada y recibo original |
| Ensayo de apagado acordado | Una entrega dentro del permiso mientras el PC está apagado | Intervalo del owner, evento original, respuesta cloud útil y siguiente paso sustentado |
| Cierre | Retirada según contrato y cierre del proceso original; deshabilitar consumidor si corresponde | Constancias primarias, plataforma sin instancias, cron vacío y canary cerrado |

La preparación se completa antes de iniciar los diez minutos; no compilar, revisar, redactar documentación ni investigar APIs durante ese plazo. Si el descubrimiento no devuelve una fuente válida, no crear una automatización con IDs supuestos. Si una pantalla queda bloqueada o un acuse es desconocido, reconciliar el estado y cerrar sin repetir admisiones ni reiniciar presupuestos.

El bloqueo local de Chavo y el acceso del responsable a páginas cerradas son observaciones diferentes; ninguno prueba acceso al formulario activo. Solicitar ayuda a Chavo antes del paso humano, pero no pedir reconectar la extensión por un fallo genérico cuando el responsable ya puede controlar Chrome. Si el formulario de propósito requiere intervención, pedir ese único paso con una pantalla concreta y el cierre preparado.

No hay suscripción, entrega cloud útil, ensayo PC-off ni guardia permanente acreditados por este documento. Max permanece fuera de esta QA propia.
