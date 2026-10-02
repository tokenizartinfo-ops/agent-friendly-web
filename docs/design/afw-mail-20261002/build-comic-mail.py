"""Deterministic typographic panels; original robot illustration is unchanged.
No provider call or recipient permission is supplied by this renderer.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json, base64, hashlib

root=Path(__file__).resolve().parent
out=root.parents[2]/'output'/'mail-comic-20261002'
out.mkdir(parents=True,exist_ok=True)
font_path=root/'fonts'/'Bangers-Regular.ttf'
W,S=1200,2
INK,PAPER,WHITE,GREEN,RUST='#181512','#f3eadb','#fffaf1','#3c514b','#ad4f35'
def font(px):return ImageFont.truetype(str(font_path),px*S)
def width(text,f):return ImageDraw.Draw(Image.new('RGB',(1,1))).textlength(text,font=f)
def lines(text,f,max_width):
    rows=[]
    for para in text.split('\n'):
        row=''
        for word in para.split():
            trial=(row+' '+word).strip()
            if row and width(trial,f)>max_width:rows.append(row);row=word
            else:row=trial
        rows.append(row)
    return rows
def block(key,title,paragraphs,bubble=None,eyebrow=None):
    # Sizes are CSS-equivalent at 600px display width; raster is 2x for sharpness.
    runs=[]; y=58
    if eyebrow:runs.append((eyebrow,16,RUST,26));y+=52
    if title:runs.append((title,43,INK,49))
    for p in paragraphs:runs.append((p,23,INK,31))
    measured=[]
    for text,size,color,leading in runs:
        rr=lines(text,font(size),W-136);measured.append((rr,size,color,leading));y+=len(rr)*leading*S+30
    by=0
    if bubble:by=len(lines(bubble,font(27),W-208))*36*S+80;y+=by+20
    im=Image.new('RGB',(W,y+25),WHITE);d=ImageDraw.Draw(im);at=58
    if eyebrow:at=58
    for rr,size,color,leading in measured:
        for row in rr:d.text((68,at),row,font=font(size),fill=color);at+=leading*S
        at+=30
    if bubble:
        d.rectangle((68,at,W-68,at+by),fill=PAPER)
        d.rectangle((68,at,75,at+by),fill=RUST)
        yy=at+28
        for row in lines(bubble,font(27),W-208):d.text((100,yy),row,font=font(27),fill=INK);yy+=72
    p=out/(key+'.png');im.save(p,optimize=True);return p
def header():
    im=Image.new('RGB',(W,156),WHITE);d=ImageDraw.Draw(im)
    d.text((68,29),'AFW',font=font(48),fill=INK)
    d.text((242,29),'.',font=font(48),fill=RUST)
    d.text((310,58),'Agent Friendly Web',font=font(21),fill=INK)
    d.line((0,155,W,155),fill=PAPER,width=2)
    p=out/'brand-header.png';im.save(p,optimize=True);return p
def action():
    im=Image.new('RGB',(W,166),WHITE);d=ImageDraw.Draw(im)
    d.rounded_rectangle((68,24,734,130),radius=10,fill=GREEN)
    d.text((102,40),'Conocer Agent Friendly Web',font=font(25),fill='#ffffff')
    p=out/'action.png';im.save(p,optimize=True);return p
def footer():
    im=Image.new('RGB',(W,238),PAPER);d=ImageDraw.Draw(im)
    for y,text,size in [(32,'Un paso claro. Una decisión a la vez.',23),(98,'hello@agentfriendlyweb.dev',20),(153,'Prueba propia · No enviada a Sector de Sistemas',17)]:d.text((68,y),text,font=font(size),fill=INK)
    p=out/'brand-footer.png';im.save(p,optimize=True);return p
shared_header,cta,shared_footer=header(),action(),footer()
models=[
('01','Editorial cercana','Tu web, más fácil de entender para la IA.',[
 'Hola, Gabriel. Este es el modelo de primer contacto, ahora con tipografía de cómic en todo el correo.',
 'AFW acompaña a las empresas a ordenar su información para que los asistentes de IA puedan comprenderla mejor.',
 'No necesitás tener todo preparado. Lo vemos juntos, una cosa por vez.'
 ],'¿Qué te gustaría que una IA entendiera mejor sobre tu empresa?'),
('02','Cómic conversacional','¿Tu web y la IA se están escuchando?',[
 'Tu empresa tiene mucho para contar. Abramos una conversación que los asistentes puedan entender.',
 '01 · Nos contás tu objetivo.\n02 · Ordenamos la información.\n03 · Revisamos las mejoras con vos.',
 'Un copiloto te acompaña y explica cada paso. Avanzamos hasta donde tu negocio lo necesite.'
 ],None),
('03','Acompañamiento simple','Seguimos con una sola cosa.',[
 'Para preparar una propuesta útil, primero necesitamos entender qué querés conseguir con tu sitio.',
 'Podés responder con tus propias palabras. Si algo no está claro, lo vemos juntos; no necesitás resolverlo todo ahora.'
 ],'¿Qué te gustaría que una IA entendiera mejor sobre tu empresa?'),
('04','Presentación general','Tu empresa tiene mucho para contar.',[
 'AFW: una puerta de entrada para que tu web sea más descubrible, comprensible y útil para los asistentes de IA.',
 'Empezamos por tu objetivo. Ordenamos datos, proponemos mejoras y comprobamos su entrega.',
 'No todas las empresas necesitan lo mismo. Un copiloto te acompaña, una pregunta por vez.',
 'Adjuntamos la presentación actualizada con la misma identidad de cómic en toda la pieza.'
 ],None)
]
def attachment(p,cid):
    return {'disposition':'inline','content_id':cid,'filename':p.name,'type':'image/jpeg' if p.suffix=='.jpg' else 'image/png','content':base64.b64encode(p.read_bytes()).decode()}
for num,label,title,paras,bubble in models:
    body_panel=block('model-'+num,title,paras,bubble,'AFW · '+label+' · Prueba propia')
    images=[(shared_header,'header','AFW · Agent Friendly Web'),(root/'robots-header.jpg','robots','Dos robots de AFW se comunican con latas y un hilo'),(body_panel,'body',title+' '+ ' '.join(paras)+((' '+bubble) if bubble else '')),(cta,'action','Conocer Agent Friendly Web'),(shared_footer,'footer','Un paso claro. Una decisión a la vez. hello@agentfriendlyweb.dev. Prueba propia, no enviada a Sector de Sistemas.')]
    rows=[]
    for p,cid,alt in images:
        tag=f'<img src="cid:{cid}" width="600" alt="{alt}" style="display:block;width:100%;height:auto;border:0">'
        if cid=='action':tag=f'<a href="https://agentfriendlyweb.dev">{tag}</a>'
        if cid=='footer':tag=f'<a href="mailto:hello@agentfriendlyweb.dev">{tag}</a>'
        rows.append('<tr><td style="padding:0">'+tag+'</td></tr>')
    html='<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:18px 8px;background:#f3eadb"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto">'+''.join(rows)+'</table></body></html>'
    body={'from':{'address':'hello@agentfriendlyweb.dev','name':'AFW · Agent Friendly Web'},'to':'tokenizart.info@gmail.com','reply_to':'hello@agentfriendlyweb.dev','subject':f'AFW | Modelo {num}: {label} · COMIC02','text':'AFW · Agent Friendly Web\n'+label+' · PRUEBA PROPIA\n\n'+title+'\n\n'+'\n\n'.join(paras)+(('\n\n'+bubble) if bubble else '')+'\n\nConocer AFW: https://agentfriendlyweb.dev\n\nUn paso claro. Una decisión a la vez.\nhello@agentfriendlyweb.dev\nPrueba propia: no enviada a Sector de Sistemas.','html':html,'attachments':[attachment(p,cid) for p,cid,alt in images],'headers':{'X-AFW-Visual-Test':'20261002-COMIC02-'+num}}
    if num=='04':
        pdf=root.parents[2]/'output'/'pdf'/'AFW-presentacion-general-v2-comic.pdf'
        body['attachments'].append({'disposition':'attachment','filename':pdf.name,'type':'application/pdf','content':base64.b64encode(pdf.read_bytes()).decode()})
    file=out/('model-'+num+'.json');file.write_text(json.dumps(body,ensure_ascii=False),encoding='utf8')
    preview=html
    for p,cid,alt in images:
        a=attachment(p,cid);preview=preview.replace('cid:'+cid,'data:'+a['type']+';base64,'+a['content'])
    (out/('model-'+num+'.html')).write_text(preview,encoding='utf8')
    print(num,label,hashlib.sha256(file.read_bytes()).hexdigest(),sum(len(p.read_bytes()) for p,cid,alt in images))
