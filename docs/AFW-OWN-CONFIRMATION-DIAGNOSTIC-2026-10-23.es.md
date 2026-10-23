# AFW: confirmación propia y diagnóstico cerrado — 23 de octubre de 2026

Este recibo describe el ensayo con el ordenador **encendido** del 22 de octubre por la noche, Argentina. `operationalReadiness=false`. No acredita suscripción, entrega útil, retirada nativa, guardia permanente, PC-off ni habilitación de Max.

## Procedencia y corrección aceptada

PR574 corrigió una incompatibilidad comprobada: REST entregaba `event.payload` como string. Solo se admite la cadena canónica exacta del hash calculado internamente; se conservan los demás controles y la prohibición de reintento.

- Fuente del operador: `1d9ad54c7e5dcf1f6fdcc586e1367ea7aa30ec51`; árbol `de11d621a259995a7e69df94ca8fb13b9d738ecb`.
- Worker congelado: fuente `3d4e9d5d20b6185a5d3dcfceae191046e921e1cb`, 1.792.585 bytes, SHA-256 `26ec0366a57fcc2c6bbc832a85d79b24e23e4a1a55e5ab42ebbd28284ed4d4c2`. No cambió.
- Operador cerrado: 1.919.051 bytes, SHA-256 `6080e54d8113b680cb9df823832bea1180c86556f38b9d9add4dfc78de8ec122`.
- RED nativo reproducido y GREEN 43/0/0; paquete con Worker real 15/0/0; revisión independiente sin hallazgos. CI head39888088636 y main39888656628 SUCCESS. Son verificaciones de fuente, no aceptación del recorrido remoto.

Se preservó el bundle cerrado `startAt=0/expiresAt=1`: **nunca invocarlo**. Compilar y transportar un plan privado real no modifica sus permisos ni su fecha original. El traslado posterior se hizo íntegramente en cloud, comprobando el hash de todos los bytes, sin descargas o builds nuevos en el PC.

## Ensayo real y alcance del fallo

Ventana original: **02:28:50.717–02:38:50.717 UTC**. Se reutilizó la sesión humana existente; no hubo otro OTP. La lectura nueva fue solo del resumen sintético, con evidencias opcionales desmarcadas. Avisos y lectura se consintieron por separado. La política histórica de retirada no se renovó.

Una única instancia `afw-release-d91e07ffc380e8f0d447fade1b3339aef2b246b6f82736befac6a7245f8c9a8d` ejecutó el paso nativo entre **02:34:24.052 y 02:34:30.751 UTC**. El transporte corregido sí permitió entrar al paso. La plataforma informó complete/success, pero AFW devolvió **uncertain / mayRetry=false**.

La lectura primaria del nuevo plan mostró **1 intento de activación, 0 recibos y 0 aceptaciones**. Esto acota el problema, pero no distingue entre comprobación posterior al INSERT, observación, tráfico activo, tiempo límite, reloj/lease o escritura del recibo. No repetir ni reiniciar esa instancia, alterar su journal o atribuir una causa sin evidencia.

Se retiraron avisos y lectura por la UI antes del cierre original. D1 comprobó 0 permisos nuevos sin revocar, 0 recibos de suscripción, 0 reservas y 0 launch claims. No se creó un consumidor ni se produjo el evento de guardado.

## Sonda independiente de solo lectura

No fue un reintento del confirmador. ESM autocontenido de 11.922 bytes, SHA-256 `6c858cc89ca15982706e70e9bcc56e3b50a625cfff1a0d931eabaf264d1a2e73`, con 15/15 casos sobre esos mismos bytes y revisión independiente sin hallazgos. Solo se sustituyó una tupla de reloj; la normalización del readback recuperó el hash revisado.

Ventana **02:49:49.233–02:52:49.233 UTC**, tres flags explícitos false. Una instancia `afw-reader-diagnostic-20261023-v1` corrió **02:50:31.244–02:50:33.388 UTC** y devolvió marker nuevo, observed/complete. Hizo cinco GET fijos con la clave de lectura ya custodiada: módulo, legacy, metadata, deployments y aplicación original. Todos los streams terminaron y coincidieron hash, configuración, vínculo y límites de caché/tamaño.

El resultado primario representa los campos HTTP `reads[].status` como `unknown`; conservar ese valor. La ejecución completa exigía status===200 según el código revisado: es una inferencia del programa, no un reemplazo del valor retornado. La presencia de una versión en el historial tampoco prueba tráfico activo.

Esta sonda acredita la lectura con la clave custodiada **a las 02:50**, no su estado a las 02:34. El confirmador completo realiza siete GET y dos comprobaciones de deployment activo bajo un presupuesto conjunto de cinco segundos para el lector de deployment; la sonda no cubrió esa secuencia. No aumentar los límites o relajar controles por inferencia.

## Recuperación comprobada y siguiente paso

- Canary cerrado `1b751b11-870b-4e42-83ae-6d4cb463d5c2`, deployment `d993b39d-f841-40d9-9c9b-8fc835ce0282`, ocho flags false.
- Operador cerrado `e9ba271c-2eda-4b96-93fc-9675abcd1864`, deployment `eb585b97-cd79-4cde-b107-b331d951a962`, tres flags false; restaurado **02:51:40.019 UTC**.
- Workflow cerrado `1eeb1c76-946e-4b01-a749-6ded2ed31880`; cuatro instancias completas, ninguna activa; historial y límites preservados.
- Cron/tails de ambos vacíos a las 02:37:55; consulta explícita de Containers activos vacía a las 02:38:45, sin cursor adicional.
- Claves temporales vencen **02:59 UTC / 23:59 Argentina** según su permiso original. No renovarlas automáticamente.

Primero terminar el diagnóstico diferencial con fixtures interceptados y lectores/journal reales. Una causa no reproducida sigue desconocida. Después preparar una nueva ventana autorizada y plan distintos, comprobar confirmación efectiva, catálogo y consumidor nativos, evento propio, revisión útil y retirada nativa/física. Solo tras aceptar esa cadena corresponde la ocurrencia separada PC-off de PR571, que continúa DRAFT. Max conserva su propio consentimiento y la aprobación del preview exacto del correo.

Evidencia y continuidad: [issue497](https://github.com/tokenizartinfo-ops/agent-friendly-web/issues/497#issuecomment-6346449127), [PR574](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/574). Los artefactos de políticas reales permanecen privados; no adjuntar sus cuerpos a Actions públicos, Git ni correo.
