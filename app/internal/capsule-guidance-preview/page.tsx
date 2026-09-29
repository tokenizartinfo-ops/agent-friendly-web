import {notFound} from 'next/navigation';
import {CapsuleReview} from '../../components/capsule-review';
export const metadata={robots:{index:false,follow:false}};
export default async function Preview({searchParams}:{searchParams:Promise<{lang?:string}>}) {
 if(process.env.NODE_ENV!=='development')notFound();
 const {lang}=await searchParams;
 const locale=lang==='en'||lang==='pt'?lang:'es';
 return <main style={{maxWidth:1000,margin:'0 auto',padding:20}}><p>Ensayo local ficticio. Las respuestas de prueba se suministran desde el navegador.</p><CapsuleReview projectId="synthetic-guide" expectedDomain="restaurant.example" allowBuild locale={locale}/></main>;
}
