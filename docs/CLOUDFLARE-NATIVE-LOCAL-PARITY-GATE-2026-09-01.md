# Agent Friendly Web Cloudflare-native local parity gate

**Fecha:** 2026-09-01
**Estado:** aprobado localmente
**Rama:** `ops/cloudflare-native-canary-v1`

## Resultado

- suite: 373 pruebas, 373 aprobadas, 0 fallas;
- lint: 0 errores, 1 advertencia preexistente por `<img>` en la ilustracion principal;
- Vinext: 96% compatible, 0 incompatibilidades y soporte parcial de `next/font/google` por carga CDN;
- build: completo;
- deploy dry-run: completo, sin despliegue;
- runtime local Cloudflare: correcto con Vinext `1.0.0-beta.8`, `@vinext/cloudflare` `1.0.0-beta.6`, `@cloudflare/vite-plugin` `1.54.3`, Wrangler `4.128.0` y workerd `1.20260831.1`;
- smoke: 9 de 9 rutas aprobadas.

## Cobertura del smoke

Se verificaron HTML publico, `robots.txt`, `llms.txt`, negociacion Markdown, readiness, estado de infraestructura, OKF, API Catalog Linkset y cierre de `/expediente` sin identidad.

## Hallazgos resueltos

1. El runtime Cloudflare anterior solo soportaba compatibility date hasta `2026-05-22`; se actualizaron plugin y Wrangler, sin reducir la fecha declarada.
2. API Catalog usa correctamente `application/linkset+json`; el smoke fue alineado con el contrato real.
3. `vinext start` no emula `cloudflare:workers`; la paridad privada se ejecuta con el plugin Cloudflare y no con el servidor Node generico.
4. Se actualizaron React, React DOM y `react-server-dom-webpack` a `19.2.8`, Vinext a `1.0.0-beta.8` y su adaptador Cloudflare a `1.0.0-beta.6`. Las tres vulnerabilidades altas detectadas dejaron de estar presentes.

## Riesgos residuales

- Node local por defecto es `22.17.0`; las herramientas actuales requieren `>=22.18.0`. El runtime empaquetado Node `24.19.0` fue usado para el Worker local.
- `next/font/google` depende de CDN en Vinext.
- `npm audit --omit=dev` informa 0 vulnerabilidades en dependencias de produccion. El arbol completo conserva 4 moderadas en dependencias transitivas de `drizzle-kit`, usada localmente para migraciones; no se ejecuto `audit fix --force` porque propone un downgrade incompatible.
- Access en el edge fue demostrado sobre nueve rutas y una sesion allowlisted confirmo el HTML autenticado. La misma compilacion paso QA Playwright en escritorio y movil, sin overflow horizontal, con ES/EN/PT visibles, imagen principal cargada y cero errores de consola.
- La matriz autenticada se compuso sin leer cookies ni secretos: autenticacion real de la portada, smoke anonimo de Access en el edge y smoke local completo de las rutas publicas/privadas de la misma compilacion.
