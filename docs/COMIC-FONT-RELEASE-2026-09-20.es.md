# AFW: tipografia original restaurada

Estado: publicada y verificada el 2026-09-20. Autorizacion: Gabriel solicito recuperar y publicar la tipografia comic ya aprobada, sin elegir otra fuente.

## Procedencia y cambio

La incorporacion original de Bangers figura en `30023f5` (2026-08-31), `app/layout.tsx`. Bangers se conserva para titulos y acentos; Geist para texto y Geist Mono para datos. No se cambiaron tamanos, copy, idiomas, componentes ni distribucion.

El navegador publico mostraba solamente las fuentes Fallback. Las reglas `@font-face` publicadas contenian rutas absolutas Windows de una fuente congelada anterior; no eran URLs de assets servibles. Los mismos bytes originales se recuperaron de `.vinext/fonts` y ahora se sirven bajo `/fonts/`, con `app/fonts.css`. Se retiro `next/font/google` de este layout para no volver a emitir rutas de cache de compilacion. No se cambio de familia ni se descargaron otras fuentes.

La API confirmo como baseline la version `a54704ac-93ac-490e-ac05-ab3a5d839097`, deployment `c1d89551-de45-4b59-a0c6-d6e1d055c50b`. Los 510 archivos de `docs/releases/infrastructure-ledger-2026-09-14.bundle.json` coincidieron con sus hashes antes de copiar la fuente. El candidato tiene una modificacion sobre esa fuente (`app/layout.tsx`) y 15 archivos nuevos: CSS y 14 WOFF2 originales. El resto de los archivos coincide byte a byte.

## Frontera y publicacion

- PROJECT: Agent Friendly Web; REPOSITORY: tokenizartinfo-ops/agent-friendly-web.
- ENVIRONMENT: afw_public_prod; ORIGIN: https://agentfriendlyweb.dev.
- RESOURCE_TYPE: Worker version/deployment y assets; RESOURCE_ID: agent-friendly-web-web-production.
- ALLOWED_ACTION: correccion tipografica y publicacion autorizadas.
- ROLLBACK: version `a54704ac-93ac-490e-ac05-ab3a5d839097` al 100%; no restaurar D1. Releer estado antes de revertir, sin pisar una publicacion posterior.
- Version nueva: `bb490071-3900-4818-a121-f18423f69ecb`.
- Deployment al 100%: `80e41635-a6eb-43f7-b213-3e08582b0aac`, 2026-09-20T23:25:04.872101Z, releido por API.
- Ensayo previo: candidato al 0%, deployment `a9b42951-a810-4371-8d19-37a2de945b70`.

Bindings y script_runtime comparados por API: identicos al baseline. No se alteraron Access, rutas, DNS, base de datos, CRM, permisos o recursos Tokenizart.

## Verificacion

445/445 pruebas, lint sin errores (advertencia previa de imagen), build y upload dry-run correctos. Chromium local, candidato remoto y publicacion normal: ES/EN/PT a 1440x900 y 390x844; Bangers, Geist y Geist Mono cargadas, sin URLs de fuentes Windows, sin desborde horizontal, imagenes rotas ni pageerror. Foco visible y reduced-motion comprobados. Ocho checks edge y ocho posteriores: recursos documentales conservan sus bytes y rutas privadas mantienen redireccion Access.

Fuente desplegada: `output/comic-font-2026-09-20/source`. Manifest: `docs/releases/comic-font-2026-09-20.bundle.json`. Logs: `output/comic-font-2026-09-20/`; capturas: `output/playwright/font-production-*`. La correccion se traslado tambien a los archivos fuente del worktree tras comprobar que el layout no habia cambiado concurrentemente. No se incluyeron los otros cambios pendientes del worktree en el despliegue.

## Punteros para continuar

- Worktree de coordinacion: `C:/Users/gabri/OneDrive/Documentos/Agent Friendly Web Worktrees/wordpress-pilot-review`, rama `test/wordpress-disposable-linux-2026-09-10`, HEAD `f475caa`; contiene cambios sin commit. No equivale por si solo al paquete publicado.
- Main local observado: `9a26819`; main remoto observado mediante ls-remote: `ea77f59ee9ed319a1253645ef89e2b3c16951b6f`. Ninguno sustituye la procedencia del bundle desplegado.
- Canary historico: `ops/cloudflare-native-canary-v1` en `49eeb6e`, con cambios locales. No se publico desde esa fuente.
- `*.chatgpt.site` esta retirado; no usarlo como staging, preview ni rollback. `release.agentfriendlyweb.dev` comparte runtime/datos productivos segun recibo del 14/09; no es sandbox aislado. Esta correccion no revalida todo el canary ni habilita vinculacion CRM.

No hubo commit, push ni merge en este bloque. Conservar los cambios ajenos y usar el manifest de esta release para reconstruirla.
