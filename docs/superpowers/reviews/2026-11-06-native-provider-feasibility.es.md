# AFW — medición de consultas y viabilidad del proveedor

6nov2026. Diagnóstico SOURCE/SYN, previo a aceptaciónTask3. No se consultó la cuota de la cuenta ni se ejecutó Cloudflare real. operationalReadiness=false; completePackage=false; PCoff=false.

## Evidencia primaria del laboratorio

Run42218799447, head48c4efa6a4d4ea6b24c9550374f3692828b4bac1, job127895381418; Root leyó log59563chars. Seis casos PASS,0FAIL/CANCEL/SKIP; principal66391.864ms agregado de peticiones originales separadas. Se produjo conexión/receipt nativo y continuidad real de SDK/notice/Link bajo proveedor SYN fijo. El archivo no demuestra tiempos del API live.

Histogramadelprincipal:1752peticionesSYNregistradas;16api.github.com y1736api.cloudflare.com. PuntosCFdominantes:

| Endpoint normalizado | Número |
| --- | ---: |
| GET tokens/verify |528|
| GET QA deployments |261|
| GET canary deployments |267|
| GET canary versions/:id |397|
| GET QA versions/:id |256|
| POST canary versions |2|
| POST canary deployments |2|

Los23CFrestantes son otros endpoints de preparación/estado. Suma1752incluyeelupstreaminitial yelrecorrido posterior; desglose por fase exacta aún solicitado alwriter. No atribuir todas las llamadas a una sola root/token sin esedesglose. Contadoresnativos de la captura conservada:10327get,1255list,55transaction,7sync,558firstPrimary,555SQL;69pares medidos297–586ms. Su ámbito respectoareloads debe rotularse en reporte; no inventarcontadoresperdidos. Rootsvigentesregistradas30000mscadauna; SENDupload4641ms/activation4662ms,receiptInsideActivationtrue. DatosdelSYN, noestimacióndeCloudflare.

## Contraste con límite publicado

[Documentación oficial de rate limits](https://developers.cloudflare.com/fundamentals/api/reference/limits/), leídaRoot6nov2026, actualizada25ago2026:1200solicitudes/5min poruser/accounttoken; límitedeusuarioacumulativo entreAPI/dashboard, y200/seg porIP. PublicaRatelimit/Ratelimit-Policy yHTTP429al exceder. No verificamosunaexcepciónpersonal/Enterprise niquélímitesbucketcompartencustodiasAFW.

**Inferencia condicionada:**1736CFconsultasenaprox66s excederían1200/5min si consumenel mismo bucket por defecto. Es una brecha de viabilidad potencial concreta basadaencoste observado; NOHTTP429observado ni afirmacióndeincidente/credencialerrónea. ElproveedorSYNnoimponeesta cuotareal ysu latencianoacreditaelfitlive. Tokens/verificacionesrepetidasymetadataactualsoncandidatosparaanálisis, no autorizaciónparacachear/omitirchecks.

## Gate posterior pendiente

Antesdepromoción/ensayoreal: desglosarporfaseyrolsinvaloressecretos; verificarpresupuesto ylatenciadelcaminoefectivorequeridoparafuncionar respetandofences; analizarlecturasinmutablesvshechosmutablesconpruebaycontratoprimarios. Cualquieroptimizaciónnecesita diseño/revisiónproporcionalydetectardrift/retencióncomohoy. Ningúncambioproductosehacemedianteestenota. Norelajarclocks/rechecks, sleeps/retryparaobtenerPASS, cambiosecreto/plan/cuota ni nuevoaccesoaquímotivados.

Task3mantienealcancefuncionalSYNymatrizdeespecificación; estelímitedebeservisibleenreporte/revisiónintegralyactualCloudSourceProofantesdeoperación. No justificarPCoff/MaxporelGREENniatribuirloalincidenteContainerhistórico. Sourcewritercontinúasutarea; RootnodeSourcewrites.
