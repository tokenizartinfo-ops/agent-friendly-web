import { buildBrandPackage } from '../../lib/mail-brand-package.mjs';
export async function brandedMessage(){
  const content='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=';
  const brand=await buildBrandPackage({to:'owner@example.com',subject:'Prueba propia',panels:['header','robots','body','action','footer'].map(slot=>({slot,type:'image/png',content,alt:slot}))});
  return {to:brand.message.to,subject:brand.message.subject,text:brand.message.text,brand};
}
