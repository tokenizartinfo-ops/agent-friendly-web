# Gate 6D.1 - Centro Comercial interno

**Estado:** `local_synthetic_only`

**Fecha:** 2026-09-02

## Objetivo

Crear una superficie privada de trabajo para que Gabriel pueda ver en un solo lugar el embudo, las prioridades, las ofertas en estudio, el calendario editorial, las estructuras de email y las metricas que luego sostendran la operacion comercial de Agent Friendly Web.

Esta primera version sirve para validar el modelo mental y la experiencia de uso. Utiliza exclusivamente datos sinteticos versionados y no debe interpretarse como un CRM activo, una lista de clientes ni un reporte de ingresos.

## Fuente y funcionamiento

El tablero compone dos contratos ya existentes:

- `agent-friendly-web.crm-lite.v1`, que normaliza oportunidades y limita las transiciones;
- `agent-friendly-web.traction-f1.v1`, que calcula una recomendacion determinista a partir de seis señales provistas por una persona.

Los cinco casos usan dominios reservados `.example`. No contienen nombres, emails, telefonos, mensajes, notas libres, credenciales ni datos de clientes. La vista permite buscar, filtrar y comprender el estado; no permite modificarlo.

## Vistas

1. Resumen: volumen sintetico, casos para diagnostico, revisiones humanas y contenido planificado.
2. Pipeline: oportunidades ficticias, etapa, recomendacion, puntaje y proximo paso.
3. Precios: hipotesis aprobadas para aprender costos y disposicion a pagar, sin publicarlas como tarifas activas.
4. Contenido: calendario editorial preliminar, sin publicar en redes.
5. Email: inventario de estructuras, sin destinatarios, cuerpos ni envio.
6. Metricas: definiciones y umbrales de aprendizaje, claramente marcados como hipotesis.

## Frontera tecnica

- la ruta solo se compila como visible bajo el modo de desarrollo local de Vite;
- los builds compilados para `afw_canary`, `afw_public_prod` o `vinext start` reciben `404` sin depender de una variable remota activable;
- no se agrega al menu, sitemap ni catalogo agentico publico;
- el contrato vive versionado en `docs/contracts/commercial-control.v1.json`, fuera de `public/`;
- no hay llamadas de red ni escritura de navegador;
- funciona sin D1, emails, publicaciones sociales, propuestas ni pagos;
- toda decision comercial material conserva revision humana.

## Pruebas

```text
node --test test/commercial-control.test.mjs
node --test test/commercial-control-contract.test.mjs
node --test test/commercial-control-ui.test.mjs
```

La regresion integral exige ademas `npm test`, `npm run lint`, `npm run build` y `git diff --check`.

## Gate posterior

Una version privada remota requerira aprobacion separada, Cloudflare Access verificado, almacenamiento aislado, consentimiento, retencion, borrado, auditoria metadata-only, idempotencia y rollback. El correo, las redes, las propuestas y los pagos continuaran siendo fronteras independientes aunque exista un CRM persistente.
