# Gate 6A.1 - Traction F1 Local Planner

**Fecha:** 2026-09-02

**Estado:** `local_planning_only`

**Producto:** Agent Friendly Web

## Objetivo

Convertir la tabla comercial aprobada en una regla determinista y auditable. La regla ordena una oportunidad con seis senales aportadas por una persona: dolor, responsable, acceso, evidencia, urgencia y presupuesto. No descubre leads, no decide precios y no ejecuta acciones.

## Regla

Cada senal recibe un entero de 0 a 2. El total posible es 0 a 12:

- 8 a 12: preparar un diagnostico y revisar si corresponde un `discovery_pack`;
- 5 a 7: nutrir, aclarar contexto y evaluar un `guided_diagnostic`;
- 0 a 4: mantener la auditoria publica gratuita y no cotizar todavia.

La puntuacion ordena la conversacion, pero no sustituye criterio humano. El resultado siempre exige revision antes de contactar, proponer un alcance, publicar un precio o cobrar.

## Frontera de datos

El planificador acepta un identificador opaco, segmento, fuente, idioma y los seis numeros. Rechaza emails, nombres, telefonos, direcciones, texto libre, notas, cuerpos, adjuntos, contrasenas, tokens y campos desconocidos.

No persiste nada. No llama D1, CRM, email, APIs externas, MCP, pagos ni sitios de clientes.

## Precio de lanzamiento

La hipotesis comercial es competitiva y deliberadamente acotada:

- auditoria publica: gratuita;
- diagnostico guiado: precio objetivo USD 20 y piloto USD 10, sin implementacion;
- Discovery Pack: precio de lista proyectado USD 198 y piloto fundador USD 99;
- implementacion F0/F1 a F3: cotizacion separada segun CMS, volumen, idiomas, acceso y horas.

El piloto fundador del Discovery Pack se limita a los primeros cinco sitios o 30 dias desde la activacion comercial, lo que ocurra primero. La fecha todavia no comenzo: debe quedar escrita en la oferta aprobada. El porcentaje de descuento solo se comunica si USD 198 fue aprobado como precio de lista real; de otro modo se comunica unicamente `piloto fundador USD 99`.

Esta politica no constituye una tarifa publica activa. Publicar precios, aceptar una propuesta, cobrar, generar una factura o activar referidos requiere una aprobacion separada y los gates comercial, contable, legal y de pagos correspondientes.

## Paquetes y customizacion

AF-0 a AF-3 puede estandarizarse cuando dominio, idioma, paginas, fuentes y entregables permanecen dentro del paquete. AF-4 y AF-5 requieren relevamiento, requerimiento firmable, PDR, cotizacion particular, criterios de aceptacion, revision de seguridad, pruebas y rollback. El planificador puede recomendar una conversacion, pero nunca presume que un sitio necesita o compro AF-5.

## Verificacion TDD

```powershell
node --test test/traction-f1.test.mjs
node --test test/traction-f1-contract.test.mjs
npm test
npm run lint
npm run build
git diff --check
```

## Salidas

- politica pura: `lib/traction-f1.mjs`;
- contrato legible por maquinas: `public/.well-known/traction-f1-contract.json`;
- estrategia humana: `docs/INITIAL-GO-TO-MARKET-AND-SALES-MOTION-V1.md`;
- roadmap: `docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md`.

## Limites y siguiente gate

Gate 6A.1 no habilita persistencia, contactos, email, CRM remoto, propuestas, precios publicos, cobros ni cambios de sitios. Todos permanecen bloqueados y requieren aprobacion separada.

Hasta el 2026-09-09 no se publicara este contrato ni se alterara el origen productivo. El proximo paso remoto continua siendo cerrar la ventana de estabilidad y revisar el gate de autenticacion/canary ya preparado.
