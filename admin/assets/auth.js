const API=((window.ARC_CONFIG||{}).apiUrl||'').replace(/\/$/,'');
async function api(path,opt={}){
 if(!API)throw new Error('API not configured. Edit config/config.js.');
 const h={'X-ARC-CSRF':'1'};let body=opt.body;
 if(body&&!(body instanceof FormData)){h['Content-Type']='application/json';body=JSON.stringify(body)}
 const r=await fetch(API+'/api'+path,{method:opt.method||'GET',credentials:'include',headers:h,body});
 if(opt.blob)return r.ok?r.blob():Promise.reject(new Error('Download failed'));
 const j=await r.json().catch(()=>({}));
 if(r.status===401&&!path.includes('/auth/login')&&!location.pathname.endsWith('login.html'))location.replace('login.html');
 if(!r.ok)throw new Error(j.error+(j.details?': '+j.details.map(d=>d.field+' '+d.message).join('; '):'')||r.status);
 return j}
const Auth={
 me:()=>api('/admin/auth/me').then(j=>j.admin).catch(()=>null),
 async guard(){const u=await Auth.me();if(!u)location.replace('login.html');return u},
 login:(email,password)=>api('/admin/auth/login',{method:'POST',body:{email,password}}),
 logout:async()=>{try{await api('/admin/auth/logout',{method:'POST'})}catch(e){}location.replace('login.html')}};
