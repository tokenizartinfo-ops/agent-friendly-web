# AFW: dependencia exclusiva Workers AI en publicación cerrada · 27oct2026

## Evidencia y alcance

Publicación propia3be5a2d5 de fuente d890 se detuvo a16:52:21UTC en providerGate unknown/active_related_incident antes del journal (0intentos/0recibos). No reiniciar ni repetir ese plan. Cierre17GET+1promoción+1WorkflowPUT a16:53:44: OP2033/DEP3fc5fa34, Workflow239caf46; canarya75/DEP371 sin cambios. Primaria16:55:09: cron/tails0 ambos, Workflowactivos0, Containerspropios0, clienteOAuth temporal ausente. La reserva única sigue sin consumir.

La API pública oficial del incidente03gc4o049emd (16:56:13 y16:57:08UTC) lo atribuye a «Issues with AI Security for Apps», componente único Workers AI/zvm7mqn92xzc, monitoring. La actualización identificada referencia únicamente ese componente. No hay respuesta nueva sustantiva de soporte Container. Fuentes:
- https://www.cloudflarestatus.com/api/v2/incidents/03gc4o049emd.json
- https://www.cloudflarestatus.com/incidents/03gc4o049emd

El publicador cerrado de AFW no depende de Workers AI: su entrada usa la observación pública, API de versiones y journalD1; los siete bindings comprobados son DB/namespace/credenciales/flags, sin binding AI. No ejecuta modelos o detección de temas. El perfil all-workers mantiene su clasificación conservadora; no se afirma reparación o ausencia de impacto en otros productos.

## Cambio acotado

Solo el perfil existente prebuilt-closed-publication podrá reconocer la combinación exacta de título, único componente Workers AI y toda la evidencia de componentes afectados coincidente. Debe existir al menos una actualización identificada; metadatos ausentes, ambiguos, mezclados o inválidos permanecen desconocidos. Un nuevo componente Workers/D1/Containers/DO/Workflow vuelve a bloquear. La validación conservadora de IDs/fechas/status/duplicados ocurre antes de filtrar. No se modifica la red, el máximo de dos GET, cinco segundos, 262144bytes, mensajes saneados, monotonicidad, ni operationalReadiness=false. No añade autoridad, rutas, credenciales o guardia.

## Ejecución

1. Escribir pruebas de la clasificación observada y de los casos ambiguos/mistos; observar RED antes de producción.
2. Implementar la excepción de dependencia exacta, sin relajación del perfil general o del parser.
3. Una revisión independiente, una pasada de fixes materiales, CI general y paquete nativo.
4. Integrar solo fuente verificada, observar una consulta pública nueva. Nueva publicación cerrada exige plan/source/rollback nuevos y no reutiliza3be5/2b395 u otra ventana consumida.
5. Mantener diagnóstico de Containers y ensayo de suscripción separados. No OTP/consentimiento o credenciales por esta clasificación.

RED pendiente. Código de producción sin cambiar. Desarrollo y pruebas en GitHub/Actions; sin archivos/dependencias/builds locales. El permiso de lectura propio de hoy fue retirado; sesión Access puede reutilizarse cuando corresponda, el grant retirado no.
