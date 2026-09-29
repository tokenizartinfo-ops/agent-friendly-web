'use client';
import {useState} from 'react';
import {ScopeImport} from './scope-import';
export function ScopeMemoryPreview(){
 const [locale,setLocale]=useState<'es'|'en'|'pt'>('es');
 const [website,setWebsite]=useState('https://restaurant.example/');
 return <main style={{maxWidth:800,padding:24,margin:'auto'}}><h1>Ensayo local de alcance</h1>
  <label>Idioma <select value={locale} onChange={e=>setLocale(e.target.value as typeof locale)}><option>es</option><option>en</option><option>pt</option></select></label>
  <label>Sitio <input value={website} onChange={e=>setWebsite(e.target.value)}/></label>
  <ScopeImport locale={locale} website={website} onUseWebsite={setWebsite} projectId="scope-synthetic" revision={1} canSave={website==='https://restaurant.example/'} request={fetch}/>
 </main>;
}
