import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buscarCotacao,ErroBrapi} from './servidor/brapi.mjs';
import {buscarClima,buscarCotacoesB3,ErroHGBrasil} from './servidor/hgbrasil.mjs';
import {buscarEmpresasGoogle,ErroGoogleMaps} from './servidor/google-maps.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const port=Number(process.env.VYZOR_PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.gif':'image/gif','.ico':'image/x-icon','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf','.eot':'application/vnd.ms-fontobject','.mp3':'audio/mpeg','.mp4':'video/mp4','.md':'text/plain; charset=utf-8','.opml':'text/xml; charset=utf-8'};
// GET /api/cotacao?simbolo=B3SA3 → dados da brapi (o token fica só no servidor)
const json=(res,status,corpo)=>{const b=Buffer.from(JSON.stringify(corpo));res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Content-Length':b.length,'Cache-Control':'no-store'});res.end(b);};
async function rotaCotacao(url,res){
  try{return json(res,200,await buscarCotacao(url.searchParams.get('simbolo')||url.searchParams.get('symbols')||''));}
  catch(e){
    if(!(e instanceof ErroBrapi)){console.error('cotação:',e);return json(res,500,{erro:'Erro interno ao buscar a cotação.'});}
    // 401/403 da brapi são problema de credencial do servidor: não repassar ao navegador
    const status=e.codigo==='SEM_TOKEN'?503:[400,404,429].includes(e.status)?e.status:e.codigo==='TEMPO_ESGOTADO'?504:502;
    if(status>=500)console.error('cotação:',e.status,e.codigo,e.message);
    return json(res,status,{erro:status===502?'A brapi recusou ou falhou a consulta.':e.message,codigo:e.codigo});
  }
}
// GET /api/clima?cidade=Campinas,SP → clima atual da HG Brasil (a chave fica só no servidor)
async function rotaClima(url,res){
  try{return json(res,200,await buscarClima(url.searchParams.get('cidade')||''));}
  catch(e){
    if(!(e instanceof ErroHGBrasil)){console.error('clima:',e);return json(res,500,{erro:'Erro interno ao buscar o clima.'});}
    const status=e.codigo==='SEM_CHAVE'?503:[400,404,429].includes(e.status)?e.status:e.codigo==='TEMPO_ESGOTADO'?504:502;
    if(status>=500)console.error('clima:',e.status,e.codigo,e.message);
    return json(res,status,{erro:e.codigo==='CHAVE_INVALIDA'?'A HG Brasil recusou a consulta.':e.message,codigo:e.codigo==='CHAVE_INVALIDA'?undefined:e.codigo});
  }
}
// GET /api/bolsa?tickers=B3:PETR4,B3:VALE3 → cotações da B3 via HG Brasil (cache de 15 s no servidor)
async function rotaBolsa(url,res){
  try{return json(res,200,await buscarCotacoesB3((url.searchParams.get('tickers')||'').split(',')));}
  catch(e){
    if(!(e instanceof ErroHGBrasil)){console.error('bolsa:',e);return json(res,500,{erro:'Erro interno ao buscar cotações.'});}
    const status=e.codigo==='SEM_CHAVE'?503:[400,404,429].includes(e.status)?e.status:e.codigo==='TEMPO_ESGOTADO'?504:502;
    if(status>=500)console.error('bolsa:',e.status,e.codigo,e.message);
    return json(res,status,{erro:e.codigo==='CHAVE_INVALIDA'?'A HG Brasil recusou a consulta.':e.message,codigo:e.codigo==='CHAVE_INVALIDA'?undefined:e.codigo});
  }
}
// GET /api/empresas-google?q=contabilidade em Cambuí, Campinas - SP → empresas reais (Google Maps via RapidAPI)
async function rotaEmpresasGoogle(url,res){
  try{return json(res,200,{candidatos:await buscarEmpresasGoogle(url.searchParams.get('q')||'',{limite:Number(url.searchParams.get('limite'))||8})});}
  catch(e){
    if(!(e instanceof ErroGoogleMaps)){console.error('google-maps:',e);return json(res,500,{erro:'Erro interno ao buscar empresas.'});}
    const status=e.codigo==='SEM_CHAVE'?503:[400,429].includes(e.status)?e.status:e.codigo==='TEMPO_ESGOTADO'?504:502;
    if(status>=500)console.error('google-maps:',e.status,e.codigo,e.message);
    return json(res,status,{erro:e.codigo==='CHAVE_INVALIDA'?'O Google Maps recusou a consulta.':e.message,codigo:e.codigo==='CHAVE_INVALIDA'?undefined:e.codigo});
  }
}
http.createServer(async(req,res)=>{try{if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}const url=new URL(req.url,'http://localhost');if(url.pathname==='/api/cotacao')return rotaCotacao(url,res);if(url.pathname==='/api/clima')return rotaClima(url,res);if(url.pathname==='/api/bolsa')return rotaBolsa(url,res);if(url.pathname==='/api/empresas-google')return rotaEmpresasGoogle(url,res);let pathname=decodeURIComponent(url.pathname);if(pathname==='/')pathname='/mapa-arquitetura.html';const file=path.resolve(root,'.'+pathname);if(!file.startsWith(root+path.sep)||pathname.split('/').some((p)=>p.startsWith('.'))){res.writeHead(403);return res.end();}const b=await fs.readFile(file);const tipo=types[path.extname(file)]||'application/octet-stream';const faixa=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range||'');if(faixa){/* pedidos por partes: o Safari/iOS exige para tocar áudio e vídeo */const ini=faixa[1]===''?Math.max(0,b.length-Number(faixa[2])):Number(faixa[1]);const fim=faixa[1]!==''&&faixa[2]!==''?Math.min(Number(faixa[2]),b.length-1):b.length-1;if(ini>fim||ini>=b.length){res.writeHead(416,{'Content-Range':'bytes */'+b.length});return res.end();}res.writeHead(206,{'Content-Type':tipo,'Content-Length':fim-ini+1,'Content-Range':'bytes '+ini+'-'+fim+'/'+b.length,'Accept-Ranges':'bytes','Cache-Control':'no-store'});return res.end(req.method==='HEAD'?undefined:b.subarray(ini,fim+1));}res.writeHead(200,{'Content-Type':tipo,'Content-Length':b.length,'Accept-Ranges':'bytes','Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:b);}catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Arquivo não encontrado.');}}).listen(port,'127.0.0.1',()=>console.log('Mapa: http://127.0.0.1:'+port+'/\nSite: http://127.0.0.1:'+port+'/vyzor-local/html/index.html'));
