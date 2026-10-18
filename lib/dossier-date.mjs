const locales={es:'es-AR',en:'en-US',pt:'pt-BR'};

/** Human-facing evidence dates: explicit 24-hour clock and zone; ISO references stay unchanged. */
export function formatDossierDate(value,locale='es',timeZone){
 if(typeof value!=='string'||!value)return '';
 const date=new Date(value);if(!Number.isFinite(date.getTime()))return '';
 return new Intl.DateTimeFormat(locales[locale]||locales.es,{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23',timeZoneName:'short',...(timeZone?{timeZone}:{})}).format(date);
}
