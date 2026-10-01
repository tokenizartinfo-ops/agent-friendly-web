import {createServer} from 'node:http';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import {createCanaryAuthorization,acceptCanaryCallback,CANARY_ISSUER,CANARY_CLIENT,CANARY_CALLBACK} from '../lib/delegated-canary-client.mjs';

// Credentials live in this process only. No request/error/token logging or files.
const authorization=createCanaryAuthorization();let accepted=false;
const client=new Client({name:'afw-canary-acceptance',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
const server=createServer(async(req,res)=>{
  const code=req.method==='GET'&&req.headers.host==='localhost:8794'
    ?acceptCanaryCallback('http://'+req.headers.host+req.url,authorization.state):null;
  if(!code||accepted){res.writeHead(400,{'Content-Type':'text/plain','Cache-Control':'no-store'});res.end('No se pudo confirmar esta conexión. Volvé a AFW.');return;}
  accepted=true;
  try{
    const response=await fetch(CANARY_ISSUER+'/oauth/token',{method:'POST',redirect:'error',signal:AbortSignal.timeout(10000),headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:new URLSearchParams({grant_type:'authorization_code',code,client_id:CANARY_CLIENT,redirect_uri:CANARY_CALLBACK,resource:CANARY_ISSUER+'/mcp',code_verifier:authorization.verifier})});
    if(response.status!==200)throw Error('exchange');const token=await response.json();if(typeof token.access_token!=='string'||token.refresh_token||token.expires_in!==300)throw Error('token');
    await client.connect(new StreamableHTTPClientTransport(new URL(CANARY_ISSUER+'/mcp'),{requestInit:{headers:{Authorization:'Bearer '+token.access_token}},fetch:(url,options)=>{
      const target=new URL(url);if(target.origin!==CANARY_ISSUER||target.pathname!=='/mcp')throw Error('target');
      return fetch(url,{...options,redirect:'error',signal:AbortSignal.timeout(10000)});
    }}));
    const summary=await client.callTool({name:'read_project_summary',arguments:{}});
    if(summary.isError||summary.structuredContent?.data?.id!=='oauth-canary-owner')throw Error('read');
    const evidence=await client.callTool({name:'read_saved_evidence',arguments:{}});if(evidence.isError)throw Error('evidence');
    console.log('Lectura OAuth real aprobada: proyecto sintético propio y evidencia guardada.');
    console.log('Para comprobar la retirada: '+CANARY_ISSUER+'/connections');
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'none'; frame-ancestors 'none'; base-uri 'none'"});
    res.end(`<h1>Conexión de prueba confirmada</h1><p>Tu asistente leyó únicamente el proyecto sintético. Ahora podés comprobar que AFW retire el permiso.</p><a href="${CANARY_ISSUER}/connections">Revisar y desconectar en AFW</a>`);
    clearTimeout(deadline);server.close();
    const expires=Date.now()+280000;
    for(;;){await new Promise(resolve=>setTimeout(resolve,15000));
      if(Date.now()>expires){console.log('Finalizó el plazo del token sin acreditar desconexión.');break;}
      const result=await client.callTool({name:'read_project_summary',arguments:{}});
      if(result.isError&&result.structuredContent?.code==='delegated_access_denied'){console.log('Desconexión comprobada: la siguiente lectura fue rechazada con el token aún vigente.');break;}
      if(result.isError)throw Error('read');
    }
  }catch{if(!res.writableEnded){res.writeHead(503,{'Content-Type':'text/plain','Cache-Control':'no-store'});res.end('No pude completar la comprobación. Conservamos tus datos; retomá desde AFW.');}
    console.log('La comprobación no se completó; no acredita OAuth o retirada.');process.exitCode=1;
  }finally{clearTimeout(deadline);server.close();await client.close();}
});
server.on('error',()=>{console.log('No se pudo abrir el callback local de prueba.');process.exitCode=1;clearTimeout(deadline);});
const deadline=setTimeout(()=>{console.log('Venció la espera de consentimiento; generar un enlace nuevo.');server.close();},600000);
server.listen(8794,'127.0.0.1',()=>console.log('Abrir en Chrome habitual: '+authorization.url));
