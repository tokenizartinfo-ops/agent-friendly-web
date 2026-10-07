# AFW: auditoría externa fechada, 7oct2026

Consulta real de `https://isitagentready.com/mcp`, herramienta `scan_site`, sitio `https://agentfriendlyweb.dev`, entre17:41:40 y17:41:57UTC (14:41Argentina). Todos los perfiles devuelven nivel5/5 Agent-Native. Perfil all:13PASS/3FAIL; content:7PASS/0FAIL; apiApp:13PASS/3FAIL. Pendientes all/apiApp: oauthDiscovery, oauthProtectedResource y authMd. El proveedor no devolvió puntuación numérica: no afirmar100/100 ni actualizar el73/100 histórico del owner por inferencia.

Comparación con el recibo2oct: all/apiApp12PASS/4FAIL, content6PASS/1FAIL; dnsAid ya no figura como fallo en esta consulta. No atribuir la causa a DNSSEC sin evidencia DNS independiente. Las mejoras son señales verificadas por ese auditor, no una certificación transaccional ni de la plataforma completa.

Respuestas preservadas localmente en `output/external-audit-2026-10-07T17-41-31-865Z`. SHA256 all `a39bc8943728703f0d4d213b6e7f78c9cbb5a016d0a38fe4b97aad6147f0cbdf`; content `9524d66665a2c65a053729bbbd37cc9d3843dd3ff6603303b61adc402ccb5bb9`; apiApp `7a885cfd8a9de62a826d1dc50a8ad79ae3fab2acf040d415c4a8f49cfadf0b98`.

Lectura directa de la tarjeta del dominio principal: HTTP200, nombre Agent Friendly Web Public Diagnostic, JSONRPC1.0 en `https://a2a.agentfriendlyweb.dev/a2a`, skill afw.audit_public_site; streaming/pushNotifications/extendedAgentCard false. La afirmación antigua de metodología «no está desplegado aquí» requiere corrección de texto; ese cambio preparado no acredita una nueva publicación web. No publicar metadatos OAuth o Auth.md para ganar puntos sin completar el servicio y su aceptación real de cliente.
