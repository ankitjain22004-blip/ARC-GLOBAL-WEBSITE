(()=>{
const A=window.ARC,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const q=new URLSearchParams(location.search),page=document.body.dataset.page;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const slug=s=>s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const wa=t=>`https://wa.me/${A.wa}?text=${encodeURIComponent(t)}`;
const enq=n=>wa(`Hello ARC GLOBAL, I would like to enquire about: ${n}`);
const WA='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C9 3 3.3 8.6 3.3 15.5c0 2.4.7 4.7 1.9 6.6L3 29l7.100-2.200a12.800 12.800 0 0 0 5.900 1.400c7 0 12.700-5.600 12.700-12.500S23 3 16 3zm0 23a10.600 10.600 0 0 1-5.400-1.500l-.4-.2-4.200 1.300 1.400-4-.3-.4A10.300 10.300 0 0 1 5.400 15.500C5.400 9.800 10.200 5.200 16 5.200s10.600 4.600 10.600 10.300S21.800 26 16 26zm5.800-7.700c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.200l-1 1.200c-.2.200-.4.200-.7.100a8.700 8.700 0 0 1-4.300-3.700c-.3-.6.300-.5.900-1.700.1-.2.100-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.100-.9.400s-1.200 1.200-1.200 2.800 1.200 3.300 1.400 3.500c.2.200 2.400 3.700 5.800 5.100 2.100.9 2.900.9 3.900.8.600-.1 1.900-.8 2.200-1.500.3-.8.3-1.400.2-1.500l-.5-.4z"/></svg>';
const src=k=>/^(https?:)?\/\//.test(k)?k:`assets/img/${k}.webp`;
/* blueprint glyphs for items without a photograph */
const dl='<path d="M20 110H180M20 105V115M180 105V115" opacity=".45"/>',w=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}"/><circle cx="${x}" cy="${y}" r="${(r*.38).toFixed(1)}" class="a"/>`;
const car='<path d="M26 84L44 62Q52 46 80 46H122Q146 46 160 66L176 84"/>'+w(58,86,14)+w(144,86,14);
const GL={'go-karts':w(50,84,14)+w(150,84,14)+'<path d="M30 72L62 58H138L170 72Z M94 58L100 34M88 34H112"/>',
'atv-quad-bikes':w(46,80,20)+w(154,80,20)+'<path d="M46 80L72 46H128L154 80M72 46L68 30M58 30H82"/>',
'formula-vehicles':w(44,84,15)+w(158,84,15)+'<path d="M20 84L70 70L92 54H116L136 70L184 84M172 56H192M180 56V84"/>',
'electric-vehicles':car+'<path class="a" d="M104 52L92 70H104L96 86"/>',
'electric-bikes':w(46,80,24)+w(154,80,24)+'<path d="M46 80L84 48H122L154 80M84 48L100 80H46M122 48L116 36H132"/>',
'autonomous-vehicles':car+'<path class="a" d="M96 40Q104 26 112 40M88 34Q104 12 120 34"/>',
'drones':'<rect x="86" y="44" width="28" height="28"/><path d="M86 44L52 22M114 44L148 22M86 72L52 94M114 72L148 94"/><ellipse cx="46" cy="18" rx="18" ry="6"/><ellipse cx="154" cy="18" rx="18" ry="6"/><ellipse cx="46" cy="98" rx="18" ry="6"/><ellipse cx="154" cy="98" rx="18" ry="6"/>',
'solar-hybrid-mobility':w(50,88,14)+w(140,88,14)+'<path d="M30 76L60 62H128L156 76Z"/><circle class="a" cx="164" cy="26" r="9"/><path class="a" d="M164 8V2M164 50V44M146 26H140M188 26H182M151 13l-4-4M177 39l4 4M177 13l4-4"/>',
'special-purpose-vehicles':'<polygon points="100,18 132,36 132,74 100,92 68,74 68,36"/><circle class="a" cx="100" cy="55" r="15"/><path d="M146 40L176 24M146 70L176 86"/>',
'default':'<circle cx="100" cy="56" r="36" stroke-dasharray="9 6.9" stroke-width="9"/><circle cx="100" cy="56" r="26"/><circle class="a" cx="100" cy="56" r="10"/>'};
GL['vehicle-parts-components']=GL.default;
const ph=(gid,alt,label)=>`<div class="ph" role="img" aria-label="${esc(alt)}"><svg viewBox="0 0 200 120">${GL[gid]||GL.default}${dl}</svg><small>${esc(label||'Photo coming soon')}</small></div>`;
const pic=(k,alt,gid,label)=>k?`<img src="${src(k)}" alt="${esc(alt)}" loading="lazy" decoding="async">`:ph(gid,alt,label);
const parts=A.parts.map(([cat,name,desc,img,specs])=>({cat,name,desc,img,specs:specs||{},id:slug(name)}));
const byName=Object.fromEntries(parts.map(p=>[p.name,p]));
const specRows=o=>Object.keys(o).length?`<table class="tbl">${Object.entries(o).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</table>`:'<p class="note">Specifications are shared on request. Ask us on WhatsApp for the details you need.</p>';
const waBtn=(n,cls='btn wa',label='WhatsApp Enquiry')=>`<a class="${cls}" href="${enq(n)}" target="_blank" rel="noopener">${WA}${label}</a>`;
const prog=id=>A.programmes.find(p=>p.id===id);
const vcard=(v,cls='')=>`<a class="vc ${v.img?'hasimg ':''}${cls}" href="vehicle.html?v=${v.id}"><div class="fr">${pic(v.img,v.name,v.id,'Photo coming soon')}</div><div class="b"><span class="tg2">${esc(v.tag)}</span><h3>${esc(v.name)}</h3><p>${esc(v.short)}</p><span class="more">Explore</span></div></a>`;
const pcard=(p,tag='a',showCat=true)=>{const inner=`<div class="fr">${pic(p.img,p.name,'default','Photo coming soon')}</div><div class="pb">${showCat?`<small>${esc(p.cat)}</small>`:''}<h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p></div>`;
const main=tag==='a'?`<a class="pmain" href="part.html?p=${p.id}">${inner}</a>`:`<button class="pmain" type="button" data-part="${p.id}">${inner}</button>`;
return `<article class="pcard">${main}<div class="row"><span class="more">Details</span><a class="waic" href="${enq(p.name)}" target="_blank" rel="noopener" aria-label="WhatsApp enquiry for ${esc(p.name)}">${WA}Enquire</a></div></article>`};

/* theme */
const setTheme=t=>{document.documentElement.dataset.theme=t;try{localStorage.setItem('arc-theme',t)}catch(e){}};
const icon='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>';
const flip=()=>setTheme(document.documentElement.dataset.theme==='light'?'dark':'light');

/* header, footer, floating WhatsApp */
const nav=[['index.html','Home','home'],['about.html','About Us','about'],['training.html','Training','training'],['career.html','Career','career'],['vehicles.html','Vehicles','vehicles'],['parts.html','Parts','parts'],['custom.html','Custom Manufacturing','custom'],['contact.html','Contact Us','contact']];
const cur=page==='vehicle'?'vehicles':page==='part'?'parts':page==='programmes'?'training':page;
const hdr=$('#hdr');hdr.className='dk';
hdr.innerHTML=`<div class="wrap hb"><a class="logo" href="index.html" aria-label="ARC Global home"><img src="assets/img/logo-white.png" alt="ARC Global" width="98" height="34"></a><nav class="nav" id="nav" aria-label="Main">${nav.map(n=>`<a href="${n[0]}"${n[2]===cur?' class="on" aria-current="page"':''}>${n[1]}</a>`).join('')}<a href="#" class="tgm" id="tgm">Switch light / dark</a></nav><button class="tg" id="tg" type="button" aria-label="Switch light or dark theme">${icon}</button>${waBtn('ARC GLOBAL','btn wa sm','Enquire')}<button class="burger" id="burger" aria-label="Menu" aria-expanded="false" aria-controls="nav"><i></i><i></i></button></div>`;
const ftr=$('#ftr');ftr.className='dk';
ftr.innerHTML=`<div class="wrap"><div class="fg"><div><img src="assets/img/logo-white.png" alt="ARC Global" width="136" height="38"><p class="motto">${esc(A.motto)}</p><p>Vehicles, mobility solutions and precision components from Noida, India, since 2016.</p></div><div><h4>Explore</h4><ul>${nav.map(n=>`<li><a href="${n[0]}">${n[1]}</a></li>`).join('')}<li><a href="training.html#programmes">Programmes &amp; Events</a></li></ul></div><div><h4>Programmes</h4><ul>${A.programmes.map(p=>`<li><a href="${p.page}">${esc(p.name.split(' (')[0].replace(' Design & Fabrication',''))}</a></li>`).join('')}</ul></div><div><h4>Contact</h4><ul><li>${esc(A.addr)}</li><li><a href="https://wa.me/${A.wa}" target="_blank" rel="noopener">${A.phone} (WhatsApp)</a></li><li><a href="mailto:${A.email}">${A.email}</a></li><li><a href="${A.insta}" target="_blank" rel="noopener">Instagram @_arcglobal</a></li><li><a href="${A.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li></ul></div></div><div class="big" aria-hidden="true">ARC GLOBAL</div><p class="copy"><span>© ${new Date().getFullYear()} ARC Global. All rights reserved.</span><span>${A.web}</span></p></div>`;
document.body.insertAdjacentHTML('beforeend',`<a class="fwa" href="${enq('ARC GLOBAL')}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${WA}</a>`);
const onS=()=>hdr.classList.toggle('solid',scrollY>40);onS();addEventListener('scroll',onS,{passive:true});
$('#burger').onclick=e=>{const o=$('#nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)};
$('#tg').onclick=flip;$('#tgm').onclick=e=>{e.preventDefault();flip()};
$$('#nav a:not(.tgm)').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));
$$('[data-wa]').forEach(a=>{a.href=enq(a.dataset.wa);a.target='_blank';a.rel='noopener';if(a.classList.contains('wa'))a.insertAdjacentHTML('afterbegin',WA)});
$$('.tools,.jump').forEach(e=>e.classList.add('dk'));

/* lightbox */
let lb,list=[],li=0;
const drawLB=()=>{const it=list[li];lb.innerHTML=`<button class="x" aria-label="Close">×</button>${list.length>1?'<button class="lbn p" aria-label="Previous">‹</button><button class="lbn nx" aria-label="Next">›</button>':''}<div class="lb"><img src="${src(it.k)}" alt="${esc(it.c)}"><p>${esc(it.c)}</p></div>`};
const step=d=>{li=(li+d+list.length)%list.length;drawLB()};
const openLB=(l,i)=>{if(!lb){lb=document.createElement('dialog');lb.setAttribute('aria-label','Photo viewer');document.body.append(lb);lb.addEventListener('click',e=>{if(e.target===lb||e.target.closest('.x'))lb.close();const n=e.target.closest('.lbn');if(n)step(n.classList.contains('nx')?1:-1)});lb.addEventListener('keydown',e=>{if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)})}list=l;li=i;drawLB();lb.showModal()};
document.addEventListener('click',e=>{const t=e.target.closest('[data-lb]');if(!t)return;const g=t.closest('[data-lbg]')||document,items=$$('[data-lb]',g);openLB(items.map(x=>({k:x.dataset.lb,c:x.dataset.cap||''})),items.indexOf(t))});

/* line icons for Training / Career cards */
const IC={tools:'<path d="M14 6a4 4 0 0 0-5 5L3 17l4 4 6-6a4 4 0 0 0 5-5l-3 3-3-1-1-3z"/>',cycle:'<path d="M4 12a8 8 0 0 1 14-5l2-2v6h-6l2.2-2.2A5 5 0 0 0 7 12M20 12a8 8 0 0 1-14 5l-2 2v-6h6l-2.2 2.2A5 5 0 0 0 17 12"/>',gear:'<circle cx="12" cy="12" r="3.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>',mentor:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 5a3.5 3.5 0 0 1 0 6M18 14a6.5 6.5 0 0 1 3.5 6"/>',flag:'<path d="M5 22V3M5 4h13l-2 4 2 4H5"/>',cert:'<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',car:'<path d="M3 16l1.5-5.5A3 3 0 0 1 7.4 8h9.2a3 3 0 0 1 2.9 2.5L21 16M3 16v3h3v-2h12v2h3v-3M3 16h18"/><circle cx="7.5" cy="13" r=".8"/><circle cx="16.5" cy="13" r=".8"/>',flask:'<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3M7.5 15h9"/>',growth:'<path d="M3 20h18M5 16l4-4 3 3 7-8M14 7h5v5"/>'};
const ico=k=>`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${IC[k]||IC.gear}</svg>`;

/* shared renderers */
const tabsUI=(el,items,render)=>{el.innerHTML=`<div class="tabs" role="tablist">${items.map((it,i)=>`<button role="tab" type="button" aria-selected="${i===0}" data-i="${i}">${esc(it[0])}</button>`).join('')}</div><div class="panel" role="tabpanel"></div>`;
 const pn=$('.panel',el),show=i=>{$$('.tabs button',el).forEach((b,j)=>b.setAttribute('aria-selected',j===i));pn.replaceWith(pn.cloneNode(false));const n=$('.panel',el);n.innerHTML=render(items[i]);n.classList.remove('panel');void n.offsetWidth;n.classList.add('panel')};
 el.addEventListener('click',e=>{const b=e.target.closest('.tabs button');if(b)show(+b.dataset.i)});show(0)};
const services=el=>tabsUI(el,A.services,s=>`<h3>${esc(s[0])}</h3><p>${esc(s[1])}</p><ul class="caps">${s[2].map(c=>`<li>${esc(c)}</li>`).join('')}</ul>`);
const progCards=el=>{el.innerHTML=A.programmes.map(p=>`<article class="pg pgi" id="prog-${p.id}"><div class="fr">${pic(p.img,p.name,p.gid,'ARC Global training')}</div><div class="pgb"><h3>${esc(p.name)}</h3><p>${esc(p.blurb)}</p><div class="pf">${p.facts.map(f=>`<div><b>${esc(f[0])}</b><span>${esc(f[1])}</span></div>`).join('')}</div><ul class="ul">${p.phases.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><details><summary>${p.modules.length} training modules</summary><ol>${p.modules.map(m=>`<li>${esc(m)}</li>`).join('')}</ol></details><div class="cta" style="margin-top:20px"><a class="btn pri sm" href="${p.reg}" target="_blank" rel="noopener">Register</a><a class="btn sm" href="${p.page}">Full programme</a>${waBtn(p.name,'btn wa sm','Ask')}</div></div></article>`).join('')};
const evCards=(el,n)=>{el.innerHTML=A.events.slice(0,n||9).map(e=>`<article class="evc"><div class="fr">${e.img?`<img src="${src(e.img)}" alt="${esc(e.name)}" loading="lazy">`:ph('go-karts',e.name,'Workshop giveaway')}</div><div class="b"><span class="pill">${esc(e.status)}</span><h3>${esc(e.name)}</h3><p>${esc(e.text)}</p>${e.facts.length?`<ul>${e.facts.map(f=>`<li>– ${esc(f)}</li>`).join('')}</ul>`:''}<div class="cta"><a class="btn pri sm" href="${e.page}" ${/\.docx$/.test(e.page)?'':''}>Details</a>${e.reg?`<a class="btn sm" href="${e.reg}" target="_blank" rel="noopener">Register</a>`:''}</div></div></article>`).join('')};
const gallery=el=>{el.setAttribute('data-lbg','');el.innerHTML=A.gallery.map(([k,c])=>`<figure><button type="button" data-lb="${k}" data-cap="${esc(c)}" aria-label="Open photo: ${esc(c)}"><div class="fr"><img src="${src(k)}" alt="${esc(c)}" loading="lazy"></div></button><figcaption>${esc(c)}</figcaption></figure>`).join('')};

/* pages */
if(page==='home'){
  const S=[['hero','Go-karts built, fabricated and tested in-house'],['hubs','Precision hubs, knuckles and brake discs'],['kart-team','The ARC Global team with a go-kart']];
  $('#slides').innerHTML=S.map((s,i)=>`<div class="slide${i?'':' on'}"><img src="${src(s[0])}" alt="${esc(s[1])}" ${i?'loading="lazy"':'fetchpriority="high"'} style="object-position:${['65% 50%','50% 40%','50% 35%'][i]}"></div>`).join('');
  $('#ticks').innerHTML=S.map((s,i)=>`<button type="button" aria-label="Show photo ${i+1}" aria-current="${i===0}"></button>`).join('');
  let k=0,t;const go=i=>{k=(i+S.length)%S.length;$$('.slide').forEach((e,j)=>e.classList.toggle('on',j===k));$$('#ticks button').forEach((b,j)=>b.setAttribute('aria-current',j===k));$('#cap').textContent=S[k][1]};
  $$('#ticks button').forEach((b,i)=>b.onclick=()=>{go(i);rs()});const rs=()=>{clearInterval(t);if(!matchMedia('(prefers-reduced-motion:reduce)').matches)t=setInterval(()=>go(k+1),6500)};go(0);rs();
  const m=A.ticker.map(x=>`<span>${esc(x)}</span>`).join('');$('#mq').innerHTML=`<div>${m}${m}</div>`;
  const cls={'go-karts':'big','vehicle-parts-components':'wide','formula-vehicles':'wide','electric-vehicles':'wide'};
  $('#bento').innerHTML=A.vehicles.map(v=>vcard(v,cls[v.id]||'')).join('');
  gallery($('#mos'));services($('#srv'));
  $('#why').innerHTML=A.why.map(w=>`<li><h3>${esc(w[0])}</h3><p>${esc(w[1])}</p></li>`).join('');
  $('#res').innerHTML=A.research.map(r=>`<div class="card"><h3>${esc(r[0])}</h3><p>${esc(r[1])}</p></div>`).join('');
  evCards($('#evgrid'),3);
  $('#chips').innerHTML=A.programmes.map(p=>`<a href="${p.page}">${esc(p.name.split(' (')[0])}</a>`).join('');
  $('#soc').innerHTML=`<iframe src="${A.social.li}" title="ARC Global on LinkedIn" loading="lazy"></iframe><div class="card" style="display:flex;flex-direction:column;justify-content:center;gap:14px"><h3>Follow the build</h3><p>Workshop updates, vehicle builds and competition stories from ARC Global.</p><div class="cta" style="margin-top:6px"><a class="btn pri" href="${A.social.ig}" target="_blank" rel="noopener">Watch on Instagram</a><a class="btn" href="${A.linkedin}" target="_blank" rel="noopener">LinkedIn</a></div></div>`;
  $$('[data-count]').forEach(e=>e.textContent=parts.length);
}
if(page==='vehicles'){
  $('#jump').innerHTML=A.vehicles.map(v=>`<a href="#${v.id}">${esc(v.name)}</a>`).join('');
  $('#vlist').innerHTML=A.vehicles.map(v=>{const th=v.parts.map(n=>byName[n]).filter(p=>p&&p.img).slice(0,4);return `<article class="vs" id="${v.id}"><a class="fr" href="vehicle.html?v=${v.id}" aria-label="${esc(v.name)} details">${pic(v.img,v.name,v.id)}</a><div><div class="tag">${esc(v.tag)}</div><h2>${esc(v.name)}</h2><p>${esc(v.short)}</p>${th.length?`<div class="thumbs">${th.map(p=>`<a href="part.html?p=${p.id}" title="${esc(p.name)}"><img src="${src(p.img)}" alt="${esc(p.name)}" loading="lazy"></a>`).join('')}</div>`:''}<div class="chips" style="margin-bottom:24px">${v.parts.slice(0,5).map(n=>byName[n]?`<a href="part.html?p=${byName[n].id}">${esc(n)}</a>`:'').join('')}</div><div class="cta" style="margin:0"><a class="btn pri" href="vehicle.html?v=${v.id}">Explore ${esc(v.name)}</a>${waBtn(v.name,'btn wa','Enquire')}</div></div></article>`}).join('');
}
if(page==='vehicle'){
  const v=A.vehicles.find(x=>x.id===q.get('v'))||A.vehicles[0];document.title=`${v.name} | ARC Global`;
  const g=v.gallery&&v.gallery.length?v.gallery:[v.img];
  $('#vcrumb').innerHTML=`<a href="index.html">Home</a> / <a href="vehicles.html">Vehicles</a> / ${esc(v.name)}`;$('#vtitle').textContent=v.name;$('#vtag').textContent=v.tag;$('#vlead').textContent=v.short;
  const pr=v.prog&&prog(v.prog);
  $('#vcta').innerHTML=waBtn(v.name)+`<a class="btn" href="custom.html">Custom build</a>`+(pr?`<a class="btn line" href="${pr.page}">Learn to build it</a>`:'');
  const show=i=>{const real=g[i];$('#mainimg').innerHTML=pic(real,`${v.name} photo ${i+1}`,v.id,`${v.name}: photo coming soon`);$('#mainimg').dataset.i=i;$$('#thumbs button').forEach((b,j)=>b.setAttribute('aria-current',j===i))};
  $('#thumbs').innerHTML=g.length>1?g.map((k,i)=>`<button type="button" aria-label="Show photo ${i+1}">${pic(k,'',v.id)}</button>`).join(''):'';
  $$('#thumbs button').forEach((b,i)=>b.onclick=()=>show(i));show(0);
  $('#mainimg').onclick=()=>{const l=g.filter(Boolean).map(k=>({k,c:v.name}));if(l.length)openLB(l,Math.max(0,l.findIndex(x=>x.k===g[+$('#mainimg').dataset.i])))};
  const sp=v.specs||{};
  $('#vinfo').innerHTML=`<p class="lead" style="margin-bottom:22px">${esc(v.long)}</p><div class="ds"><h3>Datasheet</h3><div><dl><div class="row2"><dt>Category</dt><dd>${esc(v.tag)}</dd></div><div class="row2"><dt>Built in</dt><dd>Noida, India, in-house</dd></div><div class="row2"><dt>Specifications</dt><dd>${Object.keys(sp).length?specRows(sp):'Shared on request'}</dd></div>${pr?`<div class="row2"><dt>Programme</dt><dd><a class="more" href="${pr.page}">${esc(pr.name)}</a></dd></div>`:''}</dl></div></div>`;
  $('#vfeat').innerHTML=`<div class="ds"><h3>Features</h3><div><ul class="ul">${v.features.map(f=>`<li>${esc(f)}</li>`).join('')}</ul></div></div><div class="ds"><h3>Engineering details</h3><div><ul class="ul">${v.eng.map(f=>`<li>${esc(f)}</li>`).join('')}</ul></div></div>`;
  const cp=v.parts.map(n=>byName[n]).filter(Boolean);
  const view=p=>{const used=A.vehicles.filter(x=>x.parts.includes(p.name)&&x!==v);return `<div class="xv"><div class="fr" ${p.img?`data-lbg data-lb="${p.img}" data-cap="${esc(p.name)}" style="cursor:zoom-in"`:''}>${pic(p.img,p.name,'default','Photo coming soon')}</div><div class="info"><div class="tag" style="margin:0">${esc(p.cat)}</div><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p>${specRows(p.specs)}${p.img?'<p class="note">Photo shows ARC Global components from this product family.</p>':''}${used.length?`<div class="chips">${used.map(x=>`<a href="vehicle.html?v=${x.id}">Also in ${esc(x.name)}</a>`).join('')}</div>`:''}<div class="cta" style="margin-top:auto">${waBtn(p.name)}<a class="btn" href="part.html?p=${p.id}">Full details</a></div></div></div>`};
  const sel=i=>{$$('#xl button').forEach((b,j)=>b.setAttribute('aria-selected',j===i));$('#xv').innerHTML=view(cp[i])};
  $('#xl').innerHTML=cp.map((p,i)=>`<button type="button" role="tab" aria-selected="false"><span class="t">${pic(p.img,p.name,'default')}</span><span>${esc(p.name)}</span></button>`).join('');
  $$('#xl button').forEach((b,i)=>b.onclick=()=>sel(i));sel(Math.max(0,cp.findIndex(p=>p.img)));
  const i=A.vehicles.indexOf(v);$('#rel').innerHTML=[1,2,3].map(n=>vcard(A.vehicles[(i+n)%A.vehicles.length])).join('');
}
if(page==='parts'){
  let cat=q.get('cat')||'',term='',photo=false;const box=$('#plist'),fl=$('#filters');
  const cnt=c=>parts.filter(p=>!c||p.cat===c).length;
  fl.innerHTML=['',...A.cats].map(c=>`<button type="button" aria-pressed="false" data-c="${c}">${c||'All parts'}<em>${cnt(c)}</em></button>`).join('');
  const draw=()=>{$$('button',fl).forEach(b=>b.setAttribute('aria-pressed',b.dataset.c===cat));
    const t=term.toLowerCase(),l=parts.filter(p=>(!cat||p.cat===cat)&&(!photo||p.img)&&(!t||(p.name+p.desc+p.cat).toLowerCase().includes(t)));
    $('#pcount').textContent=`${l.length} part${l.length===1?'':'s'}`;
    box.innerHTML=l.length?A.cats.filter(c=>l.some(p=>p.cat===c)).map(c=>`<div class="cat-h" id="${slug(c)}"><h2>${c}</h2><span>${l.filter(p=>p.cat===c).length} parts</span></div><div class="pgrid">${l.filter(p=>p.cat===c).map(p=>pcard(p,'a',false)).join('')}</div>`).join(''):`<div class="empty"><p>No parts match${term?` “${esc(term)}”`:''}.</p><p>Can’t find it? <a class="more" href="${wa('a part: '+term)}" target="_blank" rel="noopener">Ask us on WhatsApp</a></p></div>`};
  fl.onclick=e=>{const b=e.target.closest('button');if(b){cat=b.dataset.c;draw()}};$('#psearch').oninput=e=>{term=e.target.value;draw()};$('#pphoto').onchange=e=>{photo=e.target.checked;draw()};draw();
}
if(page==='part'){
  const p=parts.find(x=>x.id===q.get('p'))||parts[0];document.title=`${p.name} | ARC Global Parts`;
  $('#pcrumb').innerHTML=`<a href="index.html">Home</a> / <a href="parts.html">Parts</a> / <a href="parts.html?cat=${encodeURIComponent(p.cat)}">${esc(p.cat)}</a> / ${esc(p.name)}`;$('#ptitle').textContent=p.name;
  const used=A.vehicles.filter(v=>v.parts.includes(p.name));
  $('#pdetail').innerHTML=`<div><div class="fr main-img" ${p.img?`data-lbg data-lb="${p.img}" data-cap="${esc(p.name)}"`:''}>${pic(p.img,p.name,'default','Photo coming soon')}</div>${p.img?'<p class="note" style="margin-top:10px">Photo shows ARC Global components from this product family; this part is among them. Click to enlarge.</p>':''}</div><div><div class="tag">${esc(p.cat)}</div><p class="lead" style="margin-bottom:22px">${esc(p.desc)}</p><div class="ds" style="margin-bottom:16px"><h3>Specifications</h3><div>${specRows(p.specs)}</div></div>${used.length?`<div class="ds" style="margin-bottom:16px"><h3>Used in</h3><div><div class="chips">${used.map(v=>`<a href="vehicle.html?v=${v.id}">${esc(v.name)}</a>`).join('')}</div></div></div>`:''}<div class="cta" style="margin:0">${waBtn(p.name)}<a class="btn" href="custom.html">Need it custom-made?</a></div></div>`;
  $('#related').innerHTML=parts.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,4).map(x=>pcard(x,'a',false)).join('');
}
if(page==='about'){
  $('#tb').innerHTML=A.facts.map(f=>`<div><span>${esc(f[0])}</span><b>${esc(f[1])}</b></div>`).join('');
  $('#tl').innerHTML=A.journey.map(([y,t])=>`<div><b>${esc(y)}</b><p>${esc(t)}</p></div>`).join('');
  services($('#srv'));
  $('#why').innerHTML=A.why.map(w=>`<li><h3>${esc(w[0])}</h3><p>${esc(w[1])}</p></li>`).join('');
  $('#res').innerHTML=A.research.map(r=>`<div class="card"><h3>${esc(r[0])}</h3><p>${esc(r[1])}</p></div>`).join('');
  $('#vals').innerHTML=A.values.map(v=>`<span>${esc(v)}</span>`).join('');gallery($('#mos'));
  const ini=n=>n.split(' ').map(w=>w[0]).slice(0,2).join('');
  $('#team').innerHTML=A.team.map(([n,r,d,img,pdf])=>`<div class="card"><div class="av">${img?`<img src="${src(img)}" alt="${esc(n)}" loading="lazy">`:ini(n)}</div><h3>${esc(n)}</h3><p class="mono" style="color:var(--accT);margin:8px 0">${esc(r)}</p><p>${esc(d)}</p>${pdf?`<p style="margin-top:12px"><a class="more" href="${pdf}" target="_blank" rel="noopener">View profile</a></p>`:''}</div>`).join('');
}
if(page==='custom'){
  const s=A.services;$('#caps').innerHTML=[...s[3][2],...s[4][2]].map(c=>`<li>${esc(c)}</li>`).join('');
  $('#for').innerHTML=A.customFor.map(c=>`<span>${esc(c)}</span>`).join('');
  $('#cqf').onsubmit=e=>{e.preventDefault();const f=e.target;if(window.ARC_CMS&&ARC_CMS.on)ARC_CMS.rpc('submit_enquiry',{p_type:'custom',p_name:'Website visitor (custom manufacturing)',p_email:'noreply@invalid.local',p_phone:null,p_subject:f.t.value,p_message:'Qty: '+f.n.value+' | '+f.d.value}).catch(()=>{});window.open(wa(`Hello ARC GLOBAL, I would like to enquire about Custom Manufacturing. Type: ${f.t.value}. Quantity: ${f.n.value||'not specified'}. Details: ${f.d.value}`),'_blank','noopener')};
}
if(page==='programmes'){progCards($('#proggrid'));evCards($('#evgrid'))}
if(page==='training'){
  progCards($('#proggrid'));evCards($('#evgrid'));
  $('#tben').innerHTML=A.trainingBenefits.map((b,i)=>`<div class="card bcard">${ico(b[2])}<span class="n">0${i+1}</span><h3>${esc(b[0])}</h3><p>${esc(b[1])}</p></div>`).join('');
  $('#tjump').innerHTML=A.programmes.map(p=>`<a href="#prog-${p.id}">${esc(p.name.split(' (')[0].replace(' Design & Fabrication',''))}</a>`).join('');
  $('#tcta').innerHTML=waBtn('Training programme enquiry','btn wa','WhatsApp enquiry')+`<a class="btn" href="mailto:${A.email}?subject=${encodeURIComponent('Training programme enquiry')}">Email us</a>`;
}
if(page==='career'){
  $('#cwhy').innerHTML=A.careerWhy.map((b,i)=>`<div class="card bcard">${ico(b[2])}<span class="n">0${i+1}</span><h3>${esc(b[0])}</h3><p>${esc(b[1])}</p></div>`).join('');
  $('#careas').innerHTML=A.careerAreas.map(a=>`<article class="card ocard"><span class="pill">Area of interest</span><h3>${esc(a[0])}</h3><p>${esc(a[1])}</p><p class="mono tags">${esc(a[2])}</p><a class="more pick" href="#apply" data-area="${esc(a[0])}">Express interest</a></article>`).join('');
  const f=$('#careerForm'),st=$('#cstat'),sel=f.area,file=f.resume,none='No file chosen. PDF only, up to 5 MB.';
  sel.innerHTML='<option value="">Select an area</option>'+[...A.careerAreas.map(a=>a[0]),'Other / not sure'].map(o=>`<option>${esc(o)}</option>`).join('');
  document.addEventListener('click',e=>{const a=e.target.closest('.pick');if(a)sel.value=a.dataset.area});
  const say=(m,t)=>{st.className='cstat '+t;st.textContent=m};
  file.addEventListener('change',()=>{const x=file.files[0];$('#fname').textContent=x?`${x.name} (${Math.round(x.size/1024)} KB)`:none});
  f.addEventListener('submit',async e=>{e.preventDefault();
    const x=file.files[0];
    if(x&&(!/\.pdf$/i.test(x.name)||x.size>5*1024*1024)){say('Please choose a PDF resume of 5 MB or less.','err');file.focus();return}
    const d={name:f.fullname.value.trim(),email:f.email.value.trim(),phone:f.phone.value.trim(),qual:f.qual.value.trim(),area:f.area.value,msg:f.message.value.trim()};
if(window.ARC_CMS&&ARC_CMS.on){const b=f.querySelector('button[type=submit]');b.disabled=true;say('Sending your application…','info');
      try{const p=x?await ARC_CMS.upload(x):null;await ARC_CMS.rpc('submit_career',{p_name:d.name,p_email:d.email,p_phone:d.phone,p_qualification:d.qual,p_area:d.area,p_message:d.msg,p_resume_path:p});say('Thank you. Your application has been received by ARC Global.','ok');f.reset();$('#fname').textContent=none}
      catch(err){say(`We could not send your application. Please email it to ${A.email} or WhatsApp us.`,'err')}
      b.disabled=false;return}
    if(A.careerEndpoint){
      const b=f.querySelector('button[type=submit]');b.disabled=true;say('Sending your application…','info');
      try{const r=await fetch(A.careerEndpoint,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});
        if(!r.ok)throw new Error(r.status);say('Thank you. Your application has been received by ARC Global.','ok');f.reset();$('#fname').textContent=none}
      catch(err){say(`We could not send your application. Please email it to ${A.email} or WhatsApp us.`,'err')}
      b.disabled=false;return}
    /* No backend configured: open a pre-filled email. Browsers cannot attach files to mailto links, so the applicant attaches the resume. */
    const body=`Career application\n\nName: ${d.name}\nEmail: ${d.email}\nMobile: ${d.phone}\nQualification: ${d.qual}\nArea of interest: ${d.area}\n\nMessage:\n${d.msg}\n\nResume: ${x?x.name+' (please attach this file)':'(please attach your PDF resume)'}`;
    location.href=`mailto:${A.email}?subject=${encodeURIComponent('Career application: '+d.area+' – '+d.name)}&body=${encodeURIComponent(body)}`;
    say('Your email app should now open with your details filled in. Nothing has been sent yet: attach your PDF resume and press Send in your email app. If it did not open, email '+A.email+' or use the WhatsApp button.','info')});
  $('#cwa').addEventListener('click',e=>{e.preventDefault();if(!f.reportValidity())return;window.open(wa(`Hello ARC GLOBAL, I would like to apply for a career. Name: ${f.fullname.value}. Area of interest: ${f.area.value}. Qualification: ${f.qual.value}. Mobile: ${f.phone.value}. ${f.message.value}`),'_blank','noopener')});
  const gf=$('#cgf');if(gf&&A.careerGoogleForm)gf.href=A.careerGoogleForm;
}

if(page==='contact'){
  $('#jobs').innerHTML=A.careers.map(([r,t])=>`<span>${esc(r)} <em style="color:var(--accT);font-style:normal">· ${t}</em></span>`).join('');
  $('#cf').onsubmit=e=>{e.preventDefault();const f=e.target;if(window.ARC_CMS&&ARC_CMS.on)ARC_CMS.rpc('submit_enquiry',{p_type:'general',p_name:f.n.value,p_email:f.e.value,p_phone:null,p_subject:f.s.value,p_message:f.m.value}).catch(()=>{});const m=`Hello ARC GLOBAL, I am ${f.n.value}. Subject: ${f.s.value}. ${f.m.value} (Contact: ${f.e.value})`;
    if(e.submitter&&e.submitter.value==='mail')location.href=`mailto:${A.email}?subject=${encodeURIComponent(f.s.value+' – '+f.n.value)}&body=${encodeURIComponent(f.m.value+'\n\n'+f.n.value+'\n'+f.e.value)}`;else window.open(wa(m),'_blank','noopener')};
}
})();
