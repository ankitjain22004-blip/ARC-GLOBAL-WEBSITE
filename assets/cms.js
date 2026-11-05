/* ARC CMS loader: overlays published content from the ARC API onto window.ARC (built-in data.js/content.js stay as fallback), then starts app.js. */
(()=>{const C=window.ARC_CONFIG||{},A=window.ARC,API=(C.apiUrl||'').replace(/\/$/,''),ok=!!API,CK='arc-cms-v2';
const send=async(path,body,isForm)=>{const r=await fetch(API+path,{method:'POST',credentials:'omit',headers:isForm?{'X-ARC-CSRF':'1'}:{'X-ARC-CSRF':'1','Content-Type':'application/json'},body:isForm?body:JSON.stringify(body)});if(!r.ok)throw new Error((await r.json().catch(()=>({}))).error||r.status)};
/* app.js calls ARC_CMS.upload(file) then ARC_CMS.rpc(name,args); the file travels with the career submission. */
const upload=async f=>f;
const rpc=async(n,a)=>{
 if(n==='submit_enquiry')return send('/api/enquiries',{type:a.p_type,name:a.p_name,email:a.p_email,phone:a.p_phone||'',subject:a.p_subject||'',message:a.p_message});
 if(n==='submit_career'){const f=new FormData();f.append('name',a.p_name);f.append('email',a.p_email);f.append('phone',a.p_phone||'');f.append('qualification',a.p_qualification||'');f.append('area',a.p_area||'');f.append('message',a.p_message||'');if(a.p_resume_path)f.append('resume',a.p_resume_path);return send('/api/careers',f,true)}
 throw new Error('unknown')};
window.ARC_CMS={on:ok,rpc,upload};
const apply=rows=>{try{rows.forEach(r=>{if(r.key==='contact'&&r.value&&typeof r.value==='object')Object.assign(A,r.value);else if(A[r.key]===undefined||typeof r.value===typeof A[r.key])A[r.key]=r.value})}catch(e){}};
let started=0;const go=()=>{if(started++)return;const s=document.createElement('script');s.src='assets/app.js';s.async=false;document.body.appendChild(s)};
if(!ok){go();return}
let cache=null;try{cache=JSON.parse(localStorage.getItem(CK))}catch(e){}
const live=fetch(API+'/api/site/content').then(r=>{if(!r.ok)throw 0;return r.json()}).then(j=>{try{localStorage.setItem(CK,JSON.stringify(j.rows))}catch(e){}return j.rows});
live.catch(()=>{});
Promise.race([live,new Promise(r=>setTimeout(()=>r(null),1500))]).then(rows=>{apply(rows||cache||[]);go()}).catch(()=>{apply(cache||[]);go()});
})();
