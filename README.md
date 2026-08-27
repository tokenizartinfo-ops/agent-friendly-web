# Agent Friendly Web

Auditor publico y espacio de trabajo para ayudar a propietarios de sitios a mejorar, por etapas, la forma en que agentes y motores de respuesta descubren, comprenden y utilizan su presencia digital.

> Iniciativa creada por Gabriel Mucchiut e incubada dentro de la infraestructura de Tokenizart.

## Estado

Version inicial en desarrollo. El auditor es read-only y trabaja sobre recursos publicos. La metodologia AF-0 a AF-5 es un marco propio de Gabriel Mucchiut: no es una certificacion oficial ni debe presentarse como una norma de la industria.

El origen publico canonico es [agentfriendlyweb.dev](https://agentfriendlyweb.dev/). El dominio esta registrado y administrado en Cloudflare, vinculado al proyecto Sites, con DNS y TLS activos. La URL tecnica de Sites se conserva solo como direccion heredada del proveedor y no se anuncia como origen canonico.

## Que incluye

- Auditoria publica reproducible de `robots.txt`, sitemaps, contenido estructurado y rutas agenticas.
- Puntuacion explicable por siete capas, con evidencia separada de recomendaciones.
- Expediente privado y progresivo para que el propietario aporte contexto sin compartir credenciales.
- Verificacion temporal de dominio por archivo HTTP o TXT DNS, sin entregar acceso de escritura.
- Auditorias privadas guardadas solo por accion expresa y con resultados saneados.
- Registry publico versionado con perfiles HTML, JSON y Markdown y procedencia `owner_declared`, `observed` o `verified`.
- Guia publica de AEO que diferencia SEO, motores de respuesta y preparacion para herramientas agenticas sin prometer ranking ni recomendacion.
- Catalogo machine-readable de crawlers, fetchers y tokens de control, enlazado a fuentes primarias y separado por finalidad.
- Roadmap adaptado al control disponible: origen, DNS/edge, proveedor externo o ausencia de acceso.
- Primer caso integral y perfil curado del Registry: Tokenizart, con Atelier identificado como su plataforma operativa.
- Comparador ilustrativo de evolucion para restaurantes, municipalidades y Tokenizart.
- Manifiesto publico de capacidades que separa `deployed`, `planned` y `research`.
- Documentacion de metodologia, seguridad y arquitectura.

## Principios

1. **Evidencia antes que puntuacion.** Un recurso no cuenta si no se observa y valida.
2. **Estado normativo explicito.** `llms.txt` se describe como propuesta y WebMCP como borrador de Community Group.
3. **Progresividad.** Un sitio puede empezar por contenidos y descubrimiento antes de exponer herramientas.
4. **Control del propietario.** El expediente conserva contexto autorizado; nunca pide contraseñas o claves.
5. **Herramientas con limites.** Acciones, pagos y delegacion requieren identidad, consentimiento, alcance y auditoria.

## Arquitectura inicial

- **Frontend:** vinext/React sobre Sites.
- **Auditor:** route handler read-only con validacion de URL, resolucion DNS publica, limites de cuerpo, timeout y redirecciones deshabilitadas.
- **Identidad:** Sign in with ChatGPT provisto por Sites.
- **Persistencia:** Cloudflare D1 para expedientes y eventos metadata-only.
- **Registry:** perfiles publicos inmutables proyectados desde campos allowlisted; el expediente privado no se publica por defecto.
- **Verificacion:** challenges acotados, con expiracion, limite de intentos y coincidencia exacta de dominio.
- **Metodologia:** modulos ESM compartidos entre runtime y pruebas Node.

## Desarrollo local

```bash
npm install
npm test
npm run lint
npm run dev
```

Las migraciones D1 se generan con:

```bash
npm run db:generate
```

## Documentacion

- [Especificacion funcional y tecnica](docs/SPECIFICATION.es.md)
- [Metodologia AF-0 a AF-5](docs/METHODOLOGY.es.md)
- [Seguridad](docs/SECURITY.md)
- [Caso Tokenizart](docs/TOKENIZART-CASE-2026-08-26.md)
- [Roadmap agent-native](docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md)
- [AEO y politica de crawlers](docs/AEO-AND-CRAWLER-POLICY.es.md)

## Licencias y marca

- Codigo: MIT License.
- Documentacion y metodologia: CC BY 4.0, con atribucion a Gabriel Mucchiut.
- Los nombres, marcas y logotipos de Tokenizart y Agent Friendly Web no se conceden bajo esas licencias. Ver [NOTICE](NOTICE).
