# Historial mínimo por campo del expediente

Este bloque registra en cada guardado nuevo qué campos del expediente cambiaron y en qué revisión. El evento no duplica los valores del expediente ni conserva frases del relato. Un endpoint privado devuelve, para cada campo, la última revisión y fecha encontrada entre los 500 eventos más recientes del proyecto. Exige la identidad Cloudflare Access y propiedad del expediente; una respuesta vacía también puede significar que el campo solo figura en eventos anteriores que no tenían este formato o quedan fuera de la ventana consultada.

En el piloto, cuando una nueva propuesta del copilot contradice un dato existente, la interfaz avisa que ese campo registra un cambio anterior y propone comprobarlo juntos. No presenta el cambio anterior como verificación del sitio ni atribuye su origen a la IA. La persona sigue revisando la propuesta y el autoguardado se realiza por el circuito existente. El historial no modifica puntuación, autorizaciones, publicación ni el estado de los campos.

Queda para otro bloque conservar la procedencia específica de cada propuesta (frase aportada, transcripción corregida, observación pública o edición manual) y las decisiones de aceptación/rechazo, con retención, privacidad y reconciliación entre pestañas. No inferir esa procedencia a partir de este historial: por ahora solo acredita que una revisión privada guardó un campo.

## Entrega del bloque

PR #112 integrado en `5b08a59d68491631e1afd722090ba6910abcd72e`. Fuente y artefacto compilado tienen el mismo árbol que el commit verificado. Pasaron 574/574 pruebas, lint sin errores (una advertencia preexistente sobre una imagen), build y CI `verify`. No hay migración D1: se agregan metadatos acotados a los eventos ya existentes.

Worker `agent-friendly-web-web-production`, origen `https://agentfriendlyweb.dev`: versión `8d7688fe-d6d1-4c71-ad5c-68e4aab6a2e8` al 100 %, deployment `1a08577a-036e-4003-9103-a16922f6fe24`. La carga se ensayó y estuvo primero al 0 %. Se conservaron D1 productiva, audiencia Cloudflare Access, limitador y bandera del copilot limitada al proyecto sintético `6e972c18-cae1-402b-b959-646abd8499d7`. Reversión inmediata: versión `793142aa-2bc4-47f6-87e6-64a330acfa1b` al 100 %, sin borrar eventos.

El smoke del origen pasó 12/12 tras la promoción y las rutas privadas siguieron respondiendo con redirección de Access a una sesión anónima. No se realizó una prueba autenticada de este aviso de contradicción; el endpoint se verificó con pruebas de identidad y propiedad locales. No se modificaron aplicaciones Tokenizart, Atelier, Companion ni Copilot Nivel 4.
