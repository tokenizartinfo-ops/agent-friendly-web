from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from pypdf import PdfReader

root = Path(__file__).resolve().parent
out = root.parents[2] / 'output' / 'pdf'
out.mkdir(parents=True, exist_ok=True)
pdf = out / 'AFW-presentacion-general-v2-comic.pdf'
for name in ['AFWText','AFWBold','AFWTitle']:
    pdfmetrics.registerFont(TTFont(name,str(root / 'fonts' / 'Bangers-Regular.ttf')))
pdfmetrics.registerFontFamily('AFWText',normal='AFWText',bold='AFWBold')
ink, paper, cream, green, terracotta = map(HexColor,['#181512','#f3eadb','#fffaf1','#3c514b','#ad4f35'])
c=canvas.Canvas(str(pdf),pagesize=(595.28,841.89))
c.setTitle('AFW | Tu empresa, más comprensible para los asistentes de IA')
c.setAuthor('Agent Friendly Web')
c.setFillColor(cream);c.rect(0,0,596,842,fill=1,stroke=0)
c.setFillColor(ink);c.setFont('AFWBold',25);c.drawString(42,790,'AFW')
c.setFillColor(terracotta);c.drawString(102,790,'.')
c.setFillColor(ink);c.setFont('AFWText',9);c.drawString(126,796,'AGENT FRIENDLY WEB')
c.setFillColor(terracotta);c.setFont('AFWBold',9);c.drawString(42,758,'UNA PUERTA DE ENTRADA A LA CAPACIDAD AGÉNTICA')
c.setFillColor(ink);c.setFont('AFWTitle',38)
for y,t in [(708,'Tu empresa tiene mucho'),(663,'para contar. Hagamos que'),(618,'la IA pueda entenderla.')]:c.drawString(42,y,t)
def para(text,x,y,w=511,size=11,leading=16,color=ink):
    style=ParagraphStyle('body',fontName='AFWText',fontSize=size,leading=leading,textColor=color)
    p=Paragraph(text,style);_,height=p.wrap(w,500);p.drawOn(c,x,y-height);return height
para('AFW acompaña a tu empresa a hacer su web más descubrible, comprensible y útil para los asistentes de IA.',42,605,size=11,leading=15)
c.drawImage(str(root/'robots-header.jpg'),0,368,width=595.28,height=198.43)
c.setFillColor(ink);c.setFont('AFWBold',20);c.drawString(42,340,'Empezamos por tu objetivo.')
for y,n,title,body in [(305,'01','Entender','Conversamos sobre tu empresa y revisamos tu información pública.'),(255,'02','Preparar','Ordenamos datos y proponemos documentos y mejoras de descubrimiento.'),(205,'03','Comprobar','Revisamos la entrega, conservamos evidencia y definimos el siguiente paso.')]:
    c.setFillColor(terracotta);c.setFont('AFWBold',18);c.drawString(42,y,n)
    c.setFillColor(ink);c.setFont('AFWBold',12);c.drawString(82,y+2,title)
    para(body,82,y-6,465,size=10,leading=14)
c.setFillColor(paper);c.rect(42,98,511,62,fill=1,stroke=0)
c.setFillColor(green);c.rect(42,98,3,62,fill=1,stroke=0)
para('<b>Un copiloto durante el recorrido.</b><br/>Una pregunta por vez, decisiones revisables y un siguiente paso claro. Avanzamos hasta donde tu negocio lo necesite.',56,147,480,size=10,leading=14)
c.setFillColor(green);c.setFont('AFWBold',11);c.drawString(42,75,'Conversemos sobre tu web: hello@agentfriendlyweb.dev')
c.linkURL('mailto:hello@agentfriendlyweb.dev',(42,70,550,88),relative=0)
c.setFillColor(ink);c.setFont('AFWText',9);c.drawString(42,55,'agentfriendlyweb.dev  ·  Un paso claro. Una decisión a la vez.')
c.linkURL('https://agentfriendlyweb.dev',(42,50,550,65),relative=0)
c.setFillColor(HexColor('#665d53'));c.setFont('AFWText',7.5);c.drawString(42,29,'AF0-AF5 es el método de AFW; no es una certificación oficial ni exige llegar al nivel máximo.')
c.showPage();c.save()
reader=PdfReader(str(pdf));assert len(reader.pages)==1
assert 'Empezamos por tu objetivo' in reader.pages[0].extract_text()
print(str(pdf))
