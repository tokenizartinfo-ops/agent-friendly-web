import {notFound} from 'next/navigation';
import {ScopeMemoryPreview} from '../../components/scope-memory-preview';
export const dynamic='force-dynamic';
export const metadata={robots:{index:false,follow:false}};
export default function Preview(){if(process.env.NODE_ENV!=='development')notFound();return <ScopeMemoryPreview/>;}
