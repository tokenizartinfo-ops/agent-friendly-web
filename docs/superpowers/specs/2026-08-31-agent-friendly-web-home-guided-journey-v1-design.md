# Agent Friendly Web Home Guided Journey v1

## Estado

Aprobado por Gabriel Mucchiut el 2026-08-31.

## Objetivo

Convertir la portada en un recorrido humano progresivo sin reducir la informacion publica que necesitan agentes y auditores. La primera visita debe explicar el cambio, mostrar la transformacion F0-F5, permitir medir un sitio, demostrar la diferencia de respuestas y solo despues abrir el archivo tecnico.

## Orden canonico

1. La llamada.
2. Ruta de madurez F0-F5.
3. Diagnostico publico verificable.
4. Comparador AF-0 a AF-5.
5. Archivo del futuro.
6. Tres siguientes caminos.
7. Footer existente.

El orden DOM, visual y de foco debe coincidir. Los idiomas ES, EN y PT conservan la misma secuencia.

## Hero responsive

### Escritorio

- Mantener la ilustracion original de robots como imagen protagonista.
- Reservar un centro de papel limpio mediante una capa CSS gradual; no desenfocar toda la imagen.
- Alejar visualmente los personajes del eje de lectura y limitar el ancho del parrafo.
- Mantener el texto como HTML seleccionable y los dos comandos como enlaces reales.

### Movil

El orden sera etiqueta y slogan, ilustracion, explicacion, accion principal y enlace secundario. La ilustracion debe aparecer dentro de la primera pantalla de 390x844 sin superponer texto ni perder los dos robots.

## Ruta y comparador

La ruta F0-F5 aparece inmediatamente despues de la llamada. El comparador reutiliza el componente existente y conserva el aviso de que sus respuestas son ilustrativas. La portada muestra el comparador completo, pero enlaza a la pagina de evolucion para el contexto metodologico ampliado.

## Archivo progresivo

El Archivo del futuro deja de ser la segunda seccion. Muestra tres expedientes fundamentales y un control nativo `details/summary` para revelar el resto. Todos los expedientes conservan enlace, estado, evidencia y limite.

## Cierre

Tres rutas simples cierran la portada: auditar un sitio, abrir un expediente y comprender el metodo. No se agregan promesas nuevas ni capacidades no desplegadas.

## Accesibilidad y QA

- Contraste WCAG AA contra el fondo efectivo.
- Secuencia significativa y sin reordenamiento CSS que contradiga el DOM.
- Sin overflow horizontal a 390x844 ni solapamiento a 1440x900.
- Foco visible y controles nativos accesibles.
- `prefers-reduced-motion` respetado.

