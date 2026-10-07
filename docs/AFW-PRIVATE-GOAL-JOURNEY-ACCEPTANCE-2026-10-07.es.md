# Recorrido privado de orientación: ensayo propio, 7 de octubre de 2026

## Resultado comprobado

Una sesión real del propietario creó y recuperó un expediente explícitamente sintético en Canary. El pedido de orientación salió mediante el productor canónico, llegó a la base operativa aislada y obtuvo ACK en origen. Una tarea ordinaria de Codex cloud consultó únicamente tipo de sitio y objetivos bajo consentimiento temporal y reserva operativa. Generó una pregunta con explicación, visible dentro del expediente. Un reintento idéntico recuperó el mismo resultado. La retirada desde la interfaz impidió ambas consultas antes del vencimiento de la reserva.

Esto acredita este segmento acotado del recorrido. No acredita el recorrido completo de entrega, el piloto de Sector de Sistemas, una guardia permanente, una ejecución con PC apagada ni una mejora numérica en auditorías externas.

## Procedencia y aislamiento

- Fuente de preparación: `d8b746f1b3d87f6734544dd8e4b57d25f6e71259`, integrada mediante PR312 en `733c1dbb11d80e58e2f2619f94713c7b858f2017`.
- Tarea cloud ordinaria: `01a116b6-f87d-721c-ac2e-f2279c28b009`; publicación adoptada `cecfgver_6ac652ef60c881a3a55fcdccb5e49b93`, red restricted/enforced.
- Expediente propio sintético: `781f34a9-a829-44c2-9d03-daf8e113eaec`, revisión 7. No se creó ni completó un expediente de Max.
- Origen QA: D1 `f100f2fd-952a-45a0-83a4-817205d02df0`; operación QA: D1 `3a61aeee-a25c-4d85-bc12-f34ad7945bba`. Historial conservado.
- Credenciales y enrollment custodiados; sin valores en este documento, Git o mensajes. Los identificadores operativos son opacos.

## Evidencia fechada (UTC)

1. Evento `2ba942727e49632fba4596e47601ff00044286dd794a643e3d11f6379c8e5eb1`, referencia `b55419473a61b60939158ce7e82df52103f95e454fea6248cc8995347a7b9370`, orientación/revisión 7. Recepción `1791384989116`, ACK `1791384990010`. Cron retirado y productor/receptor cerrados después de la entrega.
2. Primer permiso real expiró sin lectura ni generación. Renovación por interfaz bajo el mismo alcance autorizado: consentimiento secuencia 2, emitido `1791385856098`, vencimiento `1791386407790` (15:20:07.790Z).
3. Dos listas autenticadas devolvieron HTTP200 y cero señales. Se reaplicó explícitamente el filtro custodiado del único proyecto propio; la siguiente lista devolvió la señal esperada. Esto demuestra recuperación de la configuración, sin atribuir una causa no observada al valor anterior.
4. Lista, reserva, lectura, propuesta y reintento idéntico: cinco HTTP200. Reserva `553dffe1-cf49-46ae-bf4d-800b3260d757`; recibo `68270bab-bdd8-4d8c-a9f7-0423e4558c0a`; propuesta `ba8364c6-610c-45b0-9de9-44fb1bc553e0`. Mismo ID y mismo resultado en el reintento.
5. Interfaz mostró pregunta, motivo y fecha. «Ya lo leí» guardó una confirmación, aunque la respuesta inicial dejó estado incierto. Consultar orientación recuperó el recibo fechado sin duplicación. No se determinó la causa de la respuesta incierta; no se presenta como pérdida de datos ni fallo corregido de código.
6. Retirada real: `revoke`, emitido `1791386288126`. Cloud consultó con la reserva todavía vigente: contexto 403 `context_unavailable` a las 15:19:00.948Z; propuesta 403 `proposal_unavailable` a las 15:19:01.372Z. Cierre operativo HTTP200 `reviewed` a las 15:19:02.044Z. No significa aprobación de publicación.
7. Recuento primario final: una lectura, una propuesta, una confirmación, una reserva y una generación. Seis pruebas específicas de lector/confirmación pasaron, cero fallos.

## Cierre y recuperación

Los tres tokens usados quedaron deshabilitados, versión secreta 2 conservada. Las dos políticas GOAL volvieron a deny/everyone; la política operativa recuperó su selector anterior. Cuatro gates GOAL false y plazos vacíos; web sin gates de contexto/propuesta. Sin cron del productor.

La selección de la versión anterior del gerente no restauraba por sí sola la API de settings efectiva. Se reconciliaron expresamente flags cerrados, plazo vacío y la D1 original `603c471d-19bb-4530-9773-c02e18b29840`, comprobando ambos campos `id` y `database_id`. No se eliminó ninguna base.

Versiones activas al cerrar orientación: GOAL `57d054b2-56a0-4a4d-9247-3f7adc879a7c`; web QA `e8c1246c-b47d-4b3f-b714-ef18c3073818`; gerente cerrado `a28cd64c-db47-4950-a061-565282d1a72b`, 100% cada una. El cierre posterior de feedback deja web `b2784ad1-85df-4b19-a698-c643b0f1fca7`. Producción pública no modificada por este ensayo.

## Próximos bloques

1. Mantener el retorno fechado ya comprobado; evitar equiparar revisión con reparación o publicación. Comprobar por separado un siguiente paso de una revisión vigente, sin reutilizar el recibo anterior como vigente.
2. Conservar el ensayo de auditoría, cápsula, responsables y recuperación de entrega ya comprobado. La entrega real sobre un destino de prueba separado sigue como aceptación distinta.
3. Mejorar el camino guiado para recoger tipo de sitio y objetivos sin obligar a expandir todo el expediente; evaluar claridad del estado incierto usando este caso real.
4. Revalidar fuente cloud y cierre antes de promover cualquier cambio. El piloto real requiere identidad, consentimiento y recorrido de Max; no hereda el permiso del ensayo.

Capturas locales de la sesión y checkpoint operativo: `output/afw-private-journey-proposal-20261007.png`, `output/afw-private-journey-read-recovered-20261007.png`, `output/afw-goal-custodial-runtime-checkpoint-20261007.md`. Son artefactos locales, no una promesa de disponibilidad en cloud.

## Continuación: auditoría, control y entrega preparada

La misma sesión real guardó una observación del sitio público el 7 de octubre a las 12:26 Argentina: AFW escáner propio 95/100, AF-5 transaccional. No es un resultado externo Cloudflare. La orientación contextual apareció con su fecha y aclaró que el puntaje no determina el objetivo adecuado para cada sitio.

La vista previa bloqueó primero por dominio sin verificar y después por ausencia de recursos guardados. Los requisitos se resolvieron por el recorrido real, sin insertar aprobaciones ni datos artificiales en SQL. Un TXT temporal, exclusivo de este ensayo y sin registros previos en ese nombre, acreditó control del dominio propio. Registro `433c62f70e81a2b03dcccb3884d61da2` creado y eliminado después de la verificación (ambas API200); no se alteraron registros de tráfico ni DNSSEC. La interfaz confirmó la prueba y aclaró que no concede escritura ni publica perfil.

Se guardaron `llms.txt`, CMS y responsables claramente identificados como ensayo. Cápsula `6e470692-8847-42e4-a4a4-81e224009042`, v1: manifiesto `1e5b44f9c8520f…`, archivo SHA256 `aeba18a6247a5588c9fb39ae90daf014bdcdc3bd6270ad2d42aa9d2abc300f4c`. Comparación completa a las 12:29 Argentina: diferencia respecto al archivo real, no coincidencia. El contenido sigue marcado sintético; nunca debe entregarse sobre producción.

El agente registró la decisión privada de QA en la interfaz bajo autorización del propietario; no se presenta como un clic manual del humano. Borrador técnico guardado como `No enviado`, destino declarado `tokenizartinfo-ops/agent-friendly-web`, ruta `public/llms.txt`, revisor con instrucción explícita de ensayo/no publicar. No se creó rama ni PR desde este plan.

Laboratorio del navegador: contrato válido → dry-run (`remoteMutation:false`) → aplicación solo en copia efímera → rollback verificado, hash original `2a22c062fc61a442…` recuperado. Recibo final local `receipt-1d52e6772fc782f1cb5b7e96`; no acredita entrega remota.

La guía de entrega preguntó capacidad y responsable por separado. Plan guardado con ruta repositorio/responsable del sitio; la interfaz conservó «El acceso sigue pendiente de comprobación; no publicamos archivos». Reapertura real recuperó esa ruta y responsable, así como auditoría, comparación, decisión y borrador `No enviado`. El laboratorio efímero se reinició correctamente. Captura local `output/afw-private-journey-delivery-plan-20261007.png`.

## Retorno de la revisión cloud y cierre definitivo

La base aislada de origen no incluía la tabla de feedback; se añadió únicamente el esquema canónico `worker/operations/assistance-feedback-receipts.sql`, sin inventar recibos. Firma separada de feedback provisionada en memoria/stdin a productor/receptor propios. Ventana acotada solo de metadatos, con contexto/generación/token del gerente cerrados.

Entrega cron real: una constancia primaria `confirmed_at=1791387326921`, revisión 7, `reviewed`, fecha de revisión `1791386341807`. Tres pruebas de feedback pasaron. Una consulta previa sin filas y un tail sin eventos no se usaron como prueba de entrega.

El expediente actual había avanzado después de la revisión. La interfaz mostró la fecha «7 oct 2026, 12:19» y «Esta revisión corresponde a una versión anterior. Revisemos el expediente actual antes de usarla». No se presentó como revisión vigente, solución confirmada ni éxito de entrega.

Después de comprobarlo: productor `bc2cdb28-55a9-4d0c-8874-e5dcea5eb28a`, receptor `60582bbe-330c-4764-896c-83cf3ac2c58a`, flags de feedback/supervisión false y plazos vacíos, schedule[] confirmado por GET. Web `b2784ad1-85df-4b19-a698-c643b0f1fca7` también con asistencia/feedback/contexto/propuesta/copilot/publicación remota false. Gerente `a28cd64c` conserva D1 original, consumidor y supervisión false, plazo vacío. Captura local `output/afw-private-journey-feedback-20261007.png`.
