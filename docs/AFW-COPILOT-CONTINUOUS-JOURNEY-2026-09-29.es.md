# Acompañamiento continuo del expediente AFW

## Resultado buscado

Una persona puede volver a su expediente y entender qué observó AFW en su web, por qué obtuvo el puntaje actual, qué datos faltan, qué archivos podrían ayudar y cuál es el próximo paso razonable para su objetivo. El nivel AF es una medición técnica fechada, no una meta obligatoria ni una certificación. AF-5 no corresponde a todos los sitios.

## Contrato de verdad

- **Observado:** auditoría pública con origen, fecha, metodología, señales booleanas, puntaje y límites. «No detectado» no significa ausencia absoluta.
- **Declarado:** datos que aporta el titular al expediente. La declaración no se convierte en evidencia verificada por guardarse.
- **Propuesto:** prioridades, archivos y cambios preparados para revisión. No alteran el puntaje observado ni autorizan publicación.
- **Entregado:** cápsula versionada con manifiesto y hashes. Se distingue de un recurso efectivamente publicado y comprobado en el origen.

## Recorrido incremental

1. La auditoría pública muestra puntaje, señales y límites; una persona puede elegir mejoras proporcionales y trasladar una referencia al expediente.
2. El expediente conserva una observación saneada solo tras acción explícita. Al reabrirla debe mostrar las señales guardadas, la fecha y un siguiente paso basado en fundamentos. Las comparaciones solo afirman cambio cuando origen y metodología coinciden.
3. El acompañamiento completa preguntas faltantes con explicación, permite «no sé» y separa borrador, guardado, verificación del dominio y preparación de cápsula.
4. Los archivos como `llms.txt` o `llms-full.txt` se proponen solo si aportan utilidad al sitio. El usuario revisa contenido, alcance, destino y hashes; la cápsula no equivale a publicación.
5. Tras una entrega comprobada, una nueva auditoría puede mostrar cambios observados. Si no hay evidencia comparable, la interfaz lo dice sin inventar mejora ni prometer citas, ventas o nivel AF.

## Copilot y avisos

La guía por estados sigue disponible sin IA. El copilot de Workers AI conserva consentimiento revocable por expediente y confirmación de cada envío; propone datos para revisión, sin escritura autónoma. En esta fase los avisos son **dentro del expediente**: estado de guardado, consulta fallida, nueva observación y siguiente decisión. Correo, webhooks y recordatorios externos requieren preferencias, consentimiento, frecuencia y baja propios; no se activan por este documento. El copilot productivo continúa cerrado hasta una habilitación separada y verificada.

## Bloques de implementación

- **A. Evidencia persistida y explicación:** recuperar del registro privado solo señales booleanas permitidas, mostrarlas con fecha y un próximo fundamento sin forzar MCP ni transacciones. Sin migración D1.
- **B. Progreso accionable:** vincular la sugerencia con campos faltantes, control del sitio y propuesta de archivos. No contar un archivo generado como publicado.
- **C. Prueba de mejora:** presentar comparaciones por origen/metodología y referencias a versiones de cápsulas y auditorías posteriores, con estado de publicación separado.
- **D. Avisos optativos:** diseñar preferencias antes de cualquier canal externo.

Cada bloque debe conservar identidad y aislamiento de Cloudflare Access, rastreos de solo lectura, datos saneados, pruebas locales y verificación productiva. La revisión privada visual requiere una sesión autenticada real; el smoke anónimo no la sustituye.
