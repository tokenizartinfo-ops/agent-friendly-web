# Corrección de la excepción de iconos, 7 octubre

La excepción del incidente de portada se reprodujo con Node bajo la condición `react-server`: cargar lucide-react1.34.0 ejecuta `React.createContext`, API ausente en esa condición. Veinte módulos de servidor lo importaban directamente, incluyendo el pie de página del stack observado.

Los iconos importados por esos módulos se exportan ahora desde `app/components/client-icons.tsx`, con límite `use client`. Las páginas conservan su render y sus datos en el servidor. No se cambió el modelo de datos, consentimientos, Access, textos ni estilos.

La prueba de regresión falló antes del cambio con los veinte imports y pasó después. Suite1085, lint sin errores (dos advertencias anteriores), build completo aprobado. Artefacto compilado ejecutado en workerd local:16páginas públicas200, incluyendo portadas es/en/pt, páginas informativas y registry. El primer registry500 desapareció al aplicar el esquema exclusivamente al D1 local vacío; no se aplicaron migraciones remotas. Logs y resultados en output ignorado.

Esto demuestra el render local del artefacto. No demuestra aceptación visual ni una sesión privada de Max. Producción continúa en el rollback recuperado. Próximo: subir versión propia de canary preservando recursos/custodia/flags cerrados, comprobarla en el borde antes de promover producción. La versión anterior de canary2d5e340e-a187-4184-9d6f-adc5cd48c7c4 permanece como rollback. No abrir el generador ni enviar invitaciones por esta corrección.
