/** Offline preparation only: no provider call, permission, arbitrary HTML or attachment.
 * Typographic panels are produced by the trusted AFW renderer, then reviewed as images.
 * Their alt text also forms the selectable plain-text alternative. Review must confirm
 * that the raster actually says the same thing; a digest cannot prove that fact.
 */
const VERSION='afw-comic-panels-v1';
const SLOTS=['header','robots','body','action','footer'];
function keys(value,expected){
  if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length!==expected.length||Object.keys(value).some(k=>!expected.includes(k)))throw Error('invalid brand package');
}
function escape(value){return value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
async function digest(bytes){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');}
function freeze(value){if(value&&typeof value==='object'){for(const child of Object.values(value))freeze(child);Object.freeze(value);}return value;}

export async function buildBrandPackage(input){
  keys(input,['to','subject','panels']);
  const {to,subject}=input;
  if(typeof to!=='string'||to.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)||/[\u0000-\u001f\u007f]/.test(to)||typeof subject!=='string'||!subject.trim()||subject.length>200||/[\u0000-\u001f\u007f]/.test(subject))throw Error('invalid brand recipient or subject');
  if(!Array.isArray(input.panels)||input.panels.length!==5)throw Error('invalid brand panels');
  let total=0;const panels=[],attachments=[];
  for(let index=0;index<SLOTS.length;index++){
    const panel=input.panels[index];keys(panel,['slot','type','content','alt']);
    const {slot,type,content,alt}=panel;
    if(slot!==SLOTS[index]||!['image/png','image/jpeg'].includes(type)||typeof alt!=='string'||!alt.trim()||alt.length>4000||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(alt)||typeof content!=='string'||!content||content.length>1400000||content.length%4!==0||! /^[A-Za-z0-9+/]+={0,2}$/.test(content))throw Error('invalid brand panel');
    const decoded=atob(content);if(btoa(decoded)!==content)throw Error('invalid brand encoding');
    const bytes=Uint8Array.from(decoded,c=>c.charCodeAt(0));total+=bytes.length;
    if(total>800000||(type==='image/png'&&! [137,80,78,71,13,10,26,10].every((b,i)=>bytes[i]===b))||(type==='image/jpeg'&&(bytes[0]!==255||bytes[1]!==216||bytes[2]!==255)))throw Error('invalid brand raster');
    panels.push({slot,type,alt,bytes:bytes.length,sha256:await digest(bytes)});
    attachments.push({disposition:'inline',contentId:'afw-'+slot,filename:'afw-'+slot+(type==='image/png'?'.png':'.jpg'),type,content});
  }
  const rows=panels.map(panel=>{
    let image=`<img src="cid:afw-${panel.slot}" width="600" alt="${escape(panel.alt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0">`;
    if(panel.slot==='action')image='<a href="https://agentfriendlyweb.dev">'+image+'</a>';
    if(panel.slot==='footer')image='<a href="mailto:hello@agentfriendlyweb.dev">'+image+'</a>';
    return '<tr><td>'+image+'</td></tr>';
  }).join('');
  const html='<!doctype html><html lang="es"><meta charset="utf-8"><body style="margin:0;padding:18px 8px;background:#f3eadb"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#fffaf1">'+rows+'</table></body></html>';
  const text=panels.map(p=>p.alt).join('\n\n')+'\n\nhttps://agentfriendlyweb.dev\nhello@agentfriendlyweb.dev';
  if(text.length>20000)throw Error('invalid brand alternative length');
  const message={from:{email:'hello@agentfriendlyweb.dev',name:'AFW · Agent Friendly Web'},to,replyTo:'hello@agentfriendlyweb.dev',subject,text,html,attachments};
  const canonical={version:VERSION,panels,message};
  return freeze({...canonical,hash:await digest(new TextEncoder().encode(JSON.stringify(canonical)))});
}

export async function verifyBrandPackage(value){
  try{
    keys(value,['version','panels','message','hash']);
    if(value.version!==VERSION||typeof value.hash!=='string'||! /^[a-f0-9]{64}$/.test(value.hash))return false;
    keys(value.message,['from','to','replyTo','subject','text','html','attachments']);
    if(!Array.isArray(value.panels)||value.panels.length!==5)return false;
    if(!Array.isArray(value.message.attachments)||value.message.attachments.length!==5)return false;
    const input={to:value.message.to,subject:value.message.subject,panels:value.panels.map((panel,index)=>{
      keys(panel,['slot','type','alt','bytes','sha256']);
      return {slot:panel.slot,type:panel.type,content:value.message.attachments[index].content,alt:panel.alt};
    })};
    const rebuilt=await buildBrandPackage(input);
    // Exact serialized snapshots are intentional: custody stores the generated form.
    return JSON.stringify(rebuilt)===JSON.stringify(value);
  }catch{return false;}
}

export async function brandPreview(value){
  const snapshot=structuredClone(value);
  if(!await verifyBrandPackage(snapshot))throw Error('invalid brand preview');
  let html=snapshot.message.html.replace(/<a href="[^"]+">|<\/a>/g,'');
  for(const asset of snapshot.message.attachments)html=html.replace('cid:'+asset.contentId,'data:'+asset.type+';base64,'+asset.content);
  return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'none'; img-src data:; style-src 'unsafe-inline'; frame-ancestors 'self'; base-uri 'none'; form-action 'none'; sandbox"}});
}
