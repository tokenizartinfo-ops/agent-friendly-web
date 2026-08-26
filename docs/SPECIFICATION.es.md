# Especificacion funcional y tecnica v1

## 1. Proposito

Agent Friendly Web ayuda a una persona no tecnica a responder tres preguntas:

1. Que pueden descubrir hoy los agentes sobre mi sitio.
2. Que informacion o control falta para mejorarlo.
3. Cual es la proxima accion verificable y proporcionada.

No reemplaza una auditoria de seguridad, no certifica posicionamiento en respuestas de IA y no promete que un proveedor de modelos vaya a indexar o recomendar un sitio.

## 2. Actores

- **Visitante publico:** ejecuta una auditoria read-only sin registrarse.
- **Propietario o responsable:** inicia sesion y construye un expediente progresivo.
- **Colaborador autorizado:** futura extension para aportar contexto sin administrar el proyecto.
- **Revisor tecnico:** contrasta hallazgos, prepara cambios y conserva evidencia.
- **Agente externo:** consume documentacion o herramientas publicas cuando existan contratos vigentes.

## 3. Recorridos

### 3.1 Auditoria publica

1. El visitante ingresa un dominio.
2. El servidor normaliza la URL y rechaza esquemas, credenciales, puertos y hosts no publicos.
3. Se verifica la resolucion DNS mediante Cloudflare DNS over HTTPS.
4. Se consultan recursos publicos con timeout, limite de tamaño y sin seguir redirecciones.
5. Cada señal se valida por contenido y no solo por codigo HTTP.
6. El resultado muestra puntuacion, nivel, evidencia, limites y fecha.

### 3.2 Expediente guiado

1. El propietario inicia sesion.
2. Declara organizacion, sitio, rol, audiencia, objetivos e idiomas.
3. Indica si controla origen, DNS, proveedor o ningun acceso.
4. Puede escribir material desordenado; no se le exige vocabulario tecnico.
5. El sistema guarda cambios, calcula completitud y formula la siguiente pregunta.
6. Se genera un roadmap inicial segun control y objetivos.

### 3.3 Implementacion progresiva

- **Origen controlado:** publicar contenidos, metadatos y rutas en el sitio original.
- **DNS o edge controlado:** incorporar una capa de descubrimiento sin reconstruir todo el origen.
- **Proveedor controlado por terceros:** producir especificaciones y solicitar una ventana de cambio acotada.
- **Sin control:** publicar un expediente externo atribuible como puente, dejando claro que no reemplaza la implementacion nativa.

## 4. Datos del expediente

Campos permitidos:

- organizacion;
- sitio web;
- rol del responsable;
- tipo de sitio;
- nivel de control tecnico;
- audiencia;
- objetivos;
- idiomas;
- CMS;
- hosting;
- notas libres.

No se admiten contraseñas, API keys, tokens, claves privadas ni secretos. Los campos desconocidos son descartados en la frontera del servidor.

## 5. Modelo de persistencia

`site_projects` conserva el expediente actual del usuario. `project_events` registra creacion y actualizaciones con metadata minima: tipo, fecha, campos presentes y porcentaje de completitud. No registra secretos ni el contenido completo de cada cambio.

## 6. Salidas futuras

- informe PDF firmado por version de metodologia;
- exportacion JSON/Markdown del expediente;
- tareas tecnicas asignables;
- generador controlado de `llms.txt`, JSON-LD y OpenAPI;
- conectores de CMS y edge;
- MCP read-only de auditoria;
- monitoreo de regresiones y cambios de proveedores;
- pagos agenticos solo cuando el servicio, consentimiento y responsabilidad esten definidos.

## 7. Criterios de aceptacion v1

- La auditoria nunca modifica el sitio analizado.
- Un 200 HTML de fallback no se presenta como `llms.txt`, MCP u OpenAPI valido.
- Los niveles AF muestran metodologia y evidencia.
- El expediente requiere identidad y se aisla por usuario.
- Ningun formulario solicita secretos.
- Tokenizart se presenta como caso real con fecha y limites, no como sitio 100% agentico antes de serlo.

