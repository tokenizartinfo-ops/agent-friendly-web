# AFW: montaje finito de continuidad en el host OAuth existente

Fecha:19oct2026. Estado: preparación de fuente; no publicación ni ensayo remoto.
Proyecto AFW; repositorio tokenizartinfo-ops/agent-friendly-web; origen https://github.com/tokenizartinfo-ops/agent-friendly-web; entorno GitHub/Actions, rama feat/afw-continuity-oauth-host-20261019; base61c9304cbf4163de600e740aa7b15c06baf95406. Recurso: archivos y PR de esta rama. Acción permitida: preparar, verificar, revisar e integrar fuente sin desplegar. Reversión: cerrar PR antes de merge o revertir sus commits mediante PR; sin cambios de runtime que revertir.

## Resultado y límites

Continuar PR493/494 en el mismo servicio. Registrar read_project_next_step solo si AFW_DELEGATED_CONTINUITY_ENABLED es la cadena exacta true y hay ventana propia finita, proyecto y cliente de servidor concretos. No API ni servicio comercial aparte. Gabriel autorizó este siguiente bloque y trabajo cloud; no se requiere otro consentimiento para preparar fuente. No nuevos scopes, esquema, claves, precios, pagos, modelos, eventos, consumidores, instalación ni permiso de publicación. Ningún archivo de configuración habilitará la opción.

Ruling: usar la rama remota y CI existente como espacio aislado y ledger, en lugar de scripts/workspace local de la skill — preferencia permanente cloud del owner — costo: no ejecutar pruebas antes del push; observar RED/GREEN en Actions. No clones, builds, dependencias o artefactos locales.
Ruling: cambio acotado del host ya aceptado, con diseño explícito aquí; no duplicar una fase de arquitectura ni pedir aprobación rutinaria ya concedida. Todo despliegue/ensayo real conserva su gate propio.

## Contrato de host

- Opt-in ausente o distinto conserva las dos herramientas existentes.
- Opt-in exacto exige service mode window, deadline ISO canónico futuro con máximo600000ms restantes, project pin y client pin coincidentes con el contexto OAuth verificado. La duración se acota por el deadline original de servidor; nunca por argumentos del cliente.
- Capturar flags, modo, proyecto, cliente, deadline, bindings DB/KV/limiter, métodos DB.prepare/withSession/limiter.limit y hora inicial. Rechazar cambios o reloj regresivo tras los awaits de lectura.
- Cada admisión usa una sesión NUEVA raw DB.withSession('first-primary'); no reutilizar la sesión del resumen. La semántica documentada de first-primary solo garantiza su primera consulta primaria: https://developers.cloudflare.com/d1/best-practices/read-replication/ .
- Pasar un límite de lectura confiable readUntil, oculto al schema MCP. expiresAt=min(inicio+5000ms, permiso original, permiso en admisión, ventana host). SQL tardío o deriva se descarta; no se promete cancelación del SELECT ni aislamiento serializable sobre cambios futuros.
- Solo proyección de un paso y revisión; todos los flags de autoridad permanecen false. Evidencia/cápsula vacías, sin respuestas completas/narrativa/email.
- Recuperación: fallo temporal permite reintentar lectura con el mismo grant vigente; nunca reconectar o ampliar permisos automáticamente. Una retirada humana impide la siguiente lectura con ese token.

## Plan y criterio de cierre

1. Añadir pruebas HTTP con OAuth PKCE/consentimiento summary-only reales en proceso, SQLite nativo y SDK MCP. Observar RED por falta de montaje, no por imports/configuración de prueba.
2. Implementar guard mínimo del host y límite confiable, observar GREEN del suite completo/lint/build en Actions.
3. Una revisión independiente de toda la rama; corregir hallazgos importantes con regresión RED/GREEN y suite. Registrar fallos, decisiones y límites en la PR.
4. Integrar solo con head exacto probado y base vigente; verificar árbol del merge y CI de main. AGENTS/roadmap apuntan a este documento. La PR es constancia exacta de SHAs, runs y revisión.

Interfaces: host produce factory primaria/clock guard/deadline; repositorio consume factory por admisión; MCP transmite deadline solo al nuevo read; read intersecta validez con permisos y frescura. Compatibilidad: sin flag no hay nuevo tool ni requisitos de primary/window adicionales.

## Verificación y siguiente ensayo

Pruebas deben detectar: falta de herramienta con permiso de solo resumen, default cerrado, configuración incompleta, réplica vieja frente a retirada/transferencia/revisión primaria, deriva tras SQL, vencimiento original, inyección de deadline, recuperación sin nuevo grant y retirada por ruta humana. El doble de routing utiliza dos SQLite reales con divergencia controlada; no es comprobación del routing de D1 real. El único shim de plataforma es WorkerEntrypoint importado por el proveedor; no acredita workerd remoto, ChatGPT, aprobación real ni PC-off.

Tras aceptación de fuente, antes de UNA nueva ventana propia: verificar cuenta/Worker/revisión/configuración efectivas, rollback recuperable y custodia vigente; publicar candidata cerrada solo con alcance autorizado; registrar la intención de cliente/proyecto/presupuesto/deadline y cierre antes de abrir. Usar consentimiento nuevo solo cuando Gabriel esté disponible si necesita sesión; no reutilizar links/OTP/tokens retirados ni renovarlos automáticamente. Comprobar catálogo y lectura, recuperación y retirada reales con IDs/fechas saneados. Si falta conexión/custodia, dejar ese gate explícito.

Container02382110, recepción útil, baja nativa y PC-off siguen independientes y no acreditados. No se envía mail a Max; conserva preview/aprobación y recorrido propio. Catálogo/cotización internos siguen sin endpoint/precio/cobro. No prometer guardia cloud desde el éxito de Actions.

## Ledger

- Inicio: base61c9304c comprobada en main y rama remota tras reinicio. Fuente PR494 aceptada, sin cambios locales.
- Task1 complete: tests-first131b79bb; Actions39276604214 RED esperado21fallos nuevos,2093PASS,1SKIP. Sin errores de setup/import; default de dos herramientas y rechazo de timestamp inválido ya pasan. El siguiente paso implementa el montaje y sus límites; pendiente GREEN/revisión.
