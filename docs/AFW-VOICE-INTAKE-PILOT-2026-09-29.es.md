# Dictado por segmentos en el expediente AFW

El copilot del expediente puede recibir varios segmentos de voz de hasta 30 segundos. La persona inicia y detiene la grabación, escucha el audio localmente, acepta el envío de ese segmento a Workers AI y revisa la transcripción antes de agregarla al relato editable. Luego usa el análisis de texto existente para obtener propuestas de campos con citas, revisar reemplazos y decidir si aplica algo al borrador. Puede corregir, ampliar o descartar cada segmento.

La transcripción usa `@cf/openai/whisper-large-v3-turbo` mediante el mismo binding de Workers AI ya configurado para AFW. La evaluación de campos sigue usando el modelo de texto del copilot. No se necesita API de Tokenizart, Companion ni otra credencial. El endpoint de audio conserva Cloudflare Access, pertenencia al expediente, compuerta de piloto exacto, consentimiento revocable por expediente, aceptación por envío y cuota compartida de 5 solicitudes cada 60 segundos. Acepta únicamente audio de navegador WebM, MP4 u Ogg hasta 2 MB. No escribe el archivo ni la transcripción en D1, R2 o logs de la aplicación.

La transcripción puede equivocarse. Por eso nunca se convierte directamente en un campo ni en evidencia verificada: queda editable, se comprueba contra el filtro de datos sensibles y requiere que la persona la incorpore. Las propuestas posteriores siguen siendo hipótesis, no nivel AF observado ni autorización para publicar. Cuando el navegador no permite usar micrófono, permanece disponible el ingreso por texto.

Antes de ampliar el piloto hace falta comprobar audio real en una sesión autenticada, revisar calidad en español, inglés y portugués, y confirmar formatos de los navegadores principales. Esta fase no cambia la compuerta productiva de un único expediente sintético ni autoriza habilitación general.

## Entrega del piloto

PR #97, commit integrado `118504c8070a85c11171ad5c2eb13d82eb879426`. Pasaron 554 pruebas, TypeScript, build y CI `36642035262`; lint terminó sin errores con una advertencia previa sobre `<img>`. Se reconstruyó el artefacto desde el commit integrado. La configuración piloto, ignorada por Git, conservó SHA-256 `5f2492cf6fe945b2f80a0caf0ced7aa32669ac1d9f67d15fdcb129145193160e`, con D1 productiva, Cloudflare Access, AI, cuota 5/60 y un solo expediente sintético. No hubo migraciones.

La versión `ad69aea2-ca78-4ee3-8534-3082c1cdb63b` se asignó primero al 0 % y después al 100 % del Worker `agent-friendly-web-web-production`. El smoke anónimo pasó 11/11 rutas. En Chrome con sesión real del owner, el panel apareció en el expediente sintético y mostró la explicación de privacidad, permiso revocado, aceptación por envío y botón de grabación bloqueado hasta habilitar el copilot. No se solicitó acceso al micrófono ni se afirmó una transcripción real. **Rollback:** asignar 100 % a `5fad53a0-51d2-46da-9e0c-f837f9a4f652`; para cerrar por completo el piloto, usar `377e6c7a-a783-478b-86ef-e7290d15b97e`. No tocar D1.
