# Evidencia guardada: fixture sintético listo, aceptación ChatGPT pendiente

2026-10-03. AFW, repo `tokenizartinfo-ops/agent-friendly-web`, entorno delegated-canary. Runtime cerrado y grant anterior revocado. No se abrió una nueva ventana OAuth.

## Preparación comprobada

Se verificó el proyecto sintético `oauth-canary-owner`, con website `https://example.invalid`, y el esquema de scan_observations. Se añadieron dos registros exclusivamente en D1 canary `6a728254-1494-4039-802e-b39288a55fcc`, usando INSERT SELECT para heredar el owner del proyecto y exigir el website sintético exacto. NOT EXISTS evita sobrescribir registros anteriores.

- `synthetic-evidence-current-20261003`: origen actual `https://example.invalid`.
- `synthetic-evidence-other-origin-20261003`: origen distinto `https://other-origin.example.invalid`, que no debe aparecer.

Ambos llevan checked_at `2026-10-03T18:47:56.000Z`, score null y level `SYNTHETIC - not an audit`. La metodología declara fixture de aceptación sintético, no un resultado de auditoría. Esta fecha corresponde a la preparación de prueba; no ocurrió una auditoría del dominio .invalid. Lectura agregada confirmó dos fixtures y dos score nulos. Primer intento rechazado por parsing de argumentos de CLI no ejecutó SQL; segundo intento con json_object ejecutó dos inserciones.

Rollback: conservar fixtures sintéticos y servicio cerrado; no borrar históricos ni otras observaciones. No hubo cambios productivos ni de Access, clientes OAuth o scopes.

## Prueba local completa por OAuth y MCP

Test añadido en `test/delegated-oauth-flow.test.mjs`: consentimiento PKCE, intercambio de token y llamada real local a read_saved_evidence con los dos scopes. Solo devuelve la fila fechada del propietario y origen actuales; excluye otro owner, otro origen y fecha inválida. score queda null y el payload adicional no se expone. Un segundo permiso limitado a project read obtiene insufficient_scope al consultar evidencia. 13 pruebas del archivo y suite completa 720/720 aprobadas.

Esto no acredita todavía lectura de evidencia desde ChatGPT cloud ni revocación de ese nuevo permiso en edge. La aceptación anterior comprobó únicamente resumen y retirada.

Validación del bloque: suite 720/720; lint sin errores (persiste una advertencia histórica de imagen en comic-home-intro); build de producción aprobado. No requiere publicar runtime: el cambio de repositorio añade prueba y documentación.

## Próxima ventana

1. Ejecutar preflight de esquema con las consultas actuales y conservar las versiones/datos de rollback.
2. Revisar configuración del complemento existente: recurso anuncia project read como alcance mínimo; el catálogo del authorization server anuncia evidence read. No convertir evidence read en requisito del resumen para forzar al cliente. Para este ensayo pedir consentimiento explícito de ambos scopes y configurar el alcance adicional en el formulario de ChatGPT; mantener none, PKCE y callback exacto.
3. Abrir ventana solo cuando la configuración y el owner estén listos, con deadline absoluto visible. Una ventana global más amplia no alarga el grant de diez minutos ni el token de cinco.
4. Llamar read_saved_evidence en conversación cloud AFW Operations. Esperado: una fila synthetic-evidence-current, fecha indicada, score null, ninguna fila de otro origen; explicar que son datos sintéticos guardados, no auditoría nueva.
5. Desconectar, volver a consultar antes de vencer el token, registrar denegación sin datos y restaurar canary cerrado. No consultar un expediente real por inferencia.

Posteriormente, revisar metadata de auth por herramienta y el mecanismo de step-up para que ChatGPT pueda pedir evidence read solo al usar esa función, con nuevo consentimiento. Ese mecanismo aún no está acreditado por este bloque.
