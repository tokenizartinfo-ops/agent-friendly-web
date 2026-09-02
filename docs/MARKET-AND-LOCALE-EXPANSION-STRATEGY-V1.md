# Market and Locale Expansion Strategy v1

**Fecha:** 2026-08-31

**Estado:** hipotesis de entrada y expansion; revisar con datos de 90 dias

## Decision

Agent Friendly Web no quedara limitado a Tokenizart, arte ni Argentina. Tokenizart es el primer caso integral y el sector cultural aporta credibilidad. La venta se organiza en tres carriles con ritmos diferentes:

1. **Prueba y confianza:** arte, cultura, coleccionismo y archivos.
2. **Escala comercial:** agencias web y mantenedores que puedan aplicar el metodo a multiples clientes.
3. **Producto repetible:** hospitalidad y negocios locales con informacion cambiante, empezando por grupos de restaurantes, hoteles boutique, bodegas y espacios de eventos.

No se atienden todos los paises y sectores de la misma manera. Se prioriza la combinacion de acceso comercial, capacidad de pago, urgencia, repetibilidad y facilidad de demostrar una mejora.

## Por que hospitalidad es un buen segundo vertical

Restaurantes y negocios de hospitalidad tienen preguntas concretas que un humano o agente intenta resolver:

- esta abierto ahora;
- donde esta cada sede;
- cual es el menu y el rango de precios;
- que tipo de cocina o experiencia ofrece;
- acepta reservas, pedidos o pagos;
- que opciones alimentarias existen;
- que eventos o cambios temporales hay;
- cual es la fuente oficial frente a directorios de terceros.

Google documenta `Restaurant` como subtipo de `LocalBusiness` y permite expresar horarios, ubicacion, menu y otras propiedades mediante datos estructurados. Esto facilita una entrega verificable. No implica que Google o un LLM vaya a recomendar el local.

El limite comercial es importante: un restaurante independiente puede depender mas de Google Maps, Instagram, plataformas de reservas y delivery que de su propia web, y puede tener ticket bajo. Por eso el primer objetivo no sera vender consultoria individual a miles de restaurantes. Se priorizaran:

- grupos con varias sedes;
- hoteles, bodegas y espacios con mayor ticket;
- restaurantes con reservas directas y eventos;
- agencias que ya administran decenas de sitios locales.

Para el restaurante pequeno se prepara un paquete automatizado y acotado, distribuido por partners.

## Priorizacion sectorial

| Segmento | Urgencia | Repetibilidad | Ticket | Acceso inicial | Decision |
| --- | --- | --- | --- | --- | --- |
| Agencias y mantenedores web | alta | alta | medio/alto por cartera | medio | canal prioritario |
| Grupos de hospitalidad | alta | alta | medio | medio | primer producto repetible |
| Arte, cultura y coleccionismo | media/alta | media | variable | alto por red existente | casos y ventas consultivas |
| SaaS, APIs y plataformas | alta | alta | alto | bajo/medio | tercera ola, junto con MCP/A2A |
| Municipios e instituciones publicas | alta utilidad | media | medio/alto | bajo por ciclos largos | casos selectivos, no primer motor |
| Profesionales regulados | alta | media | alto | medio | posterior por riesgo legal/medico |
| Restaurante independiente | media | alta | bajo | bajo sin partner | paquete simple, no consultoria intensiva |

Las calificaciones son hipotesis internas, no datos universales. Se revisan con conversion, tiempo y margen reales.

## Priorizacion geografica

### 1. Espana

Primer mercado internacional recomendado para venta directa:

- idioma compartido con el canon actual;
- producto y documentacion ya disponibles en espanol;
- posibilidad de trabajar arte, turismo, gastronomia y agencias;
- adopcion empresarial de IA cercana al promedio europeo: Eurostat registro 20,3% de empresas en 2025.

### 2. Estados Unidos

Segundo mercado recomendado y primero en ingles:

- mercado amplio para agencias, plataformas y hospitalidad;
- mayor posibilidad de tickets en dolares;
- el U.S. Census Bureau observo uso empresarial de IA entre 17% y 20% en el periodo diciembre de 2025 a mayo de 2026, con mayor adopcion esperada en informacion y finanzas;
- exige copy comercial nativo en ingles, soporte horario y propuestas muy delimitadas.

### 3. Reino Unido e Irlanda

Segunda ola en ingles. La inferencia comercial es favorable por idioma, ecosistema de agencias y proximidad a requisitos europeos, pero se validara con partners y entrevistas antes de invertir en campanas propias.

### 4. Portugal

Mercado de aprendizaje en portugues:

- la interfaz ya contempla portugues;
- permite probar paridad real de idioma con menor costo;
- la adopcion empresarial de IA observada por Eurostat en 2025 fue menor que Espana, por lo que no se prioriza por encima de ella sin un partner.

### 5. Paises nordicos y Benelux

Dinamarca, Finlandia, Suecia, Belgica y Paises Bajos muestran alta adopcion empresarial de IA. Son mercados atractivos, pero no son el primer movimiento directo porque requieren idioma, contexto y canal local. Se abordaran mediante agencias o socios, no mediante expansion indiscriminada.

### Argentina y Latinoamerica

Argentina conserva valor para pilotos, red y validacion, pero no fija el precio internacional. Mexico, Chile, Colombia, Uruguay y otros mercados se compararan despues de validar el mensaje en Espana y de contar con un paquete de bajo costo operativo.

## Estrategia de idioma

### Estado actual

- espanol sin prefijo es el canon temporal;
- ingles vive bajo `/en`;
- portugues vive bajo `/pt`;
- `hreflang` y `x-default` deben mantener equivalencias;
- no se redirige automaticamente por idioma del navegador;
- recursos machine-readable conservan una URL canonica y declaran idiomas disponibles.

### Cambio futuro del canon

El canon no cambia solo porque el ingles tenga mas mercado potencial. Se revisa despues de 90 dias con:

- sesiones humanas por idioma;
- auditorias completadas;
- leads con consentimiento;
- leads calificados;
- propuestas y ventas;
- conversion por idioma;
- referrals de buscadores y asistentes;
- costo de soporte y calidad de respuesta.

Si ingles supera de manera sostenida al menos la mitad de los leads calificados y ventas, se evaluara una portada neutral o inglesa. El historial, URLs existentes y SEO se preservan mediante canonicals y redirecciones planificadas. No se cambia el canon durante una campana activa sin un plan de migracion.

## Estrategia de correo

`hello@agentfriendlyweb.dev` es la identidad universal y machine-readable de entrada. Gate 6C.1 verifico Cloudflare Email Routing bajo `inbound_canary_verified` para estos aliases activos:

- `hola@agentfriendlyweb.dev` para espanol;
- `ola@agentfriendlyweb.dev` para portugues;

`seguridad@agentfriendlyweb.dev`, `auditoria@agentfriendlyweb.dev` y `bajas@agentfriendlyweb.dev` permanecen reservados y no configurados. `no-reply@` descarta entrada y el catch-all esta deshabilitado.

Todos los aliases activos llegan a una unica operacion privada. La web puede mostrar el alias local, pero contratos, manifiestos y directorios usan `hello@`. Gate 6C.2B verifico dominio, SPF, DKIM, DMARC y una entrega saliente humana, pero no dejo binding ni envio recurrente. Las respuestas conservaran el alias por el que llego la consulta solo cuando exista un caso transaccional aprobado. No se crean tres newsletters, tres CRMs ni tres historias de consentimiento.

## Experimentos iniciales

### Experimento A: cultura

- cinco auditorias de contactos existentes;
- dos diagnosticos guiados;
- una propuesta;
- un caso publicable solo con consentimiento.

### Experimento B: hospitalidad en Espana

- diez sitios de grupos, hoteles, bodegas o espacios;
- auditar horarios, sedes, menu/servicios, reservas y consistencia con fuentes externas;
- contactar mediante dos agencias y no solo en forma directa;
- medir respuesta al mensaje `que puede contestar un agente sobre tu negocio hoy`.

### Experimento C: agencias en ingles

- cinco agencias de Estados Unidos o Reino Unido;
- ofrecer auditoria de su propio sitio y un paquete white-label para clientes;
- validar si prefieren fee por sitio, paquete por cartera o revenue share;
- no construir el canal hasta obtener al menos dos entrevistas.

## Criterio de expansion

Un nuevo pais o vertical pasa de investigacion a venta activa cuando existe:

1. mensaje localizado;
2. diez prospectos identificables;
3. al menos tres conversaciones;
4. una necesidad repetida;
5. precio compatible con costo y soporte;
6. un canal de implementacion;
7. fuentes y ejemplos correctos para el sector;
8. capacidad de atender el idioma sin degradar calidad.

## Fuentes primarias

- Eurostat, empresas que usan IA en 2025: `https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20251211-2`
- Eurostat, informe por pais y tamano: `https://ec.europa.eu/eurostat/web/products-statistical-reports/w/ks-01-26-009`
- U.S. Census Bureau, uso de IA en empresas: `https://www.census.gov/library/stories/2026/05/ai-use-businesses.html`
- Google LocalBusiness structured data: `https://developers.google.com/search/docs/appearance/structured-data/local-business`
- OpenAI Publishers and Developers FAQ: `https://help.openai.com/en/articles/12627856-publishers-and-developers-faq`
