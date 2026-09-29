import {notFound} from 'next/navigation';
import {ScanActionPlan} from '../../components/scan-action-plan';

export const dynamic='force-dynamic';
export const metadata={robots:{index:false,follow:false}};

export default async function ScanPlanPreview({searchParams}:{searchParams:Promise<{lang?:string}>}) {
  if(process.env.NODE_ENV!=='development') notFound();
  const {lang}=await searchParams;
  const locale=lang==='en'||lang==='pt'?lang:'es';
  const labels={
    es:['Ejemplo ficticio de AFW','Restaurante ficticio. Las señales son simuladas: no se escaneó ni modificó un sitio real.'],
    en:['Fictional AFW example','Fictional restaurant. Signals are simulated: no real website was scanned or changed.'],
    pt:['Exemplo fictício de AFW','Restaurante fictício. Sinais simulados: nenhum site real foi analisado ou alterado.'],
  };
  const scan={target:'https://restaurant.example/',checkedAt:'2026-09-20T12:00:00.000Z',evidence:{robots:true,sitemap:false,directAnswers:false,structuredData:false,llms:false,markdown:false,ownership:true,sources:true},limits:[labels[locale][1]]};
  return <main lang={locale}>
    <header style={{padding:'24px',borderBottom:'2px solid currentColor'}}>
      <h1>{labels[locale][0]}</h1><p>{labels[locale][1]}</p>
      <nav aria-label="Language">{['es','en','pt'].map(code=><a key={code} href={`?lang=${code}`} style={{display:'inline-block',padding:'12px'}}>{code.toUpperCase()}</a>)}</nav>
    </header>
    <ScanActionPlan key={locale} scan={scan} locale={locale}/>
  </main>;
}
