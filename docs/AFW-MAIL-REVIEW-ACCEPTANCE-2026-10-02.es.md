# Aceptación de revisión y retirada del permiso

2 de octubre de 2026. El owner confirmó que, al aprobar y retirar el permiso desde la pantalla privada real, apareció «El intento quedó cancelado». Evidencia complementaria D1 en sesión primaria: caso `synthetic-review-20261002`, state cancelled, decisión revoked, cero recibos y ningún attempt_id. No se envió correo. Acredita este recorrido sintético autenticado; no acredita envío, recepción, consumidor cloud ni otros usuarios.

Cierre: política del operador restaurada a deny everyone y configuración desplegada sin override. Versión cerrada `999794d2-1b10-4e08-8ea0-3ddd4b0b267e`; flags operador/servicio false. Consumer sigue cerrado y sin EMAIL. Custodia y decisión conservadas, sin borrar evidencia. Subject privado permanece custodiado; no autoriza acceso mientras flags/política están cerrados. Producción permanece en `00861678-d968-41d3-be85-180896a321b7` al 100%.

## Siguiente conexión cloud

Usar un único ejecutor de envío. El gerente prepara una referencia opaca; el texto y el destinatario quedan en custodia AFW, fuera de prompts públicos y health store. La aprobación humana autenticada vincula hash, identidad y vencimiento. El ejecutor puede consumir exclusivamente esa referencia; no aprobar, editar, listar expedientes ni purgar. Guardar Client ID en configuración de servidor y secreto de servicio en custodia gestionada del ejecutor, nunca Git, navegador, chat o logs.

Antes de crear credencial: identificar runtime cloud concreto y comprobar que admite custodia/conexión mediada. El acceso MCP Cloudflare de este ordenador no demuestra ese requisito. No crear tokens sin destino seguro; no sustituir la suscripción por API pagada silenciosamente. Access service audience distinta, allow solo al servicio exacto; EMAIL y limitador configurados únicamente en canary propio después de aceptación.

Prueba siguiente: destinatario propio autorizado, un intento, recibo persistido, reejecución sin duplicado, permiso expirado/revocado rechazado y fallo incierto sin reintento automático. Confirmar recepción separadamente. Finalmente comprobar run iniciado por horario/evento con PC apagada. Solo entonces habilitar el flujo de primer cliente, con su identidad y expediente propios. Los fallos de raíz de AFW Operations y el run horario de correo siguen pendientes; esta aceptación no los resuelve.
