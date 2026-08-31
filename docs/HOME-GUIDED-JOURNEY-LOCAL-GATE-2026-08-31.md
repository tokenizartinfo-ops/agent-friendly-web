# Home Guided Journey v1 - Gate local

## Estado

`PASS` local el 2026-08-31. La nueva portada esta implementada y validada en el build de produccion local. Este gate no publica ni modifica `agentfriendlyweb.dev`.

## Recorrido aprobado

La portada sigue este orden semantico y visual:

1. La llamada.
2. Ruta de madurez AF-0 a AF-5.
3. Diagnostico publico verificable.
4. Comparador AF-0 a AF-5.
5. Archivo del futuro.
6. Siguientes movimientos.

El Archivo del futuro muestra tres expedientes inicialmente y otros cinco mediante divulgacion progresiva. El menu y el footer conservan el mapa completo para quien quiera profundizar.

## Verificacion automatizada

- `npm test`: 266 pruebas aprobadas, 0 fallos.
- `npm run lint`: aprobado.
- `npm run build`: aprobado.
- ES, EN y PT comparten el mismo recorrido y contenido localizado.
- El elemento raiz declara `lang=es`, `lang=en` o `lang=pt` segun la ruta.
- `/favicon.ico` redirige al icono SVG publicado para evitar errores de consola en navegadores tradicionales.

## QA visual humana

### Escritorio 1440 x 900

- `scrollWidth=1440`: sin overflow horizontal.
- Hero de 780 px con ilustracion completa, lavado central localizado y texto seleccionable.
- Titular, explicacion y acciones no se solapan con los sujetos principales.
- Evidencia: `docs/evidence/2026-08-31-home-guided-journey/desktop-1440x900.png`.

### Movil 390 x 844

- `scrollWidth=390`: sin overflow horizontal.
- Orden visible: titular, ilustracion, explicacion y acciones.
- No hay solapamiento entre titular, imagen y cuerpo.
- Menu movil abre y cierra, ocupa el ancho disponible y conserva 12 destinos.
- Evidencia: `docs/evidence/2026-08-31-home-guided-journey/mobile-390x844.png`.

## Interacciones comprobadas

- El Archivo del futuro pasa de 3 a 8 expedientes al abrirse.
- El comparador cambia de AF-2 a AF-5 y actualiza la respuesta ilustrativa.
- `/en` y `/pt` cargan sin errores de consola y sin desborde movil.
- El servidor de produccion local funciona con `vinext start` sobre el build generado.

## Limites y siguiente gate

El modo `vinext dev` encontro un fallo local de arranque de Miniflare; no afecta tests, lint, build ni el servidor de produccion local, pero queda como deuda de entorno de desarrollo. Publicar esta portada o integrarla en la rama principal requiere una decision separada.
