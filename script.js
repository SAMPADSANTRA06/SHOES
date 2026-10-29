document.documentElement.classList.add("js");
// ===== EDIT THESE =====
const WHATSAPP_NUMBER = "919999999999"; // country code + number, no + or spaces
const PRODUCTS = [
  {id:1,name:"Denim Low",img:"images/denim-low.png",cat:"Casual",price:3499,up:"#b7d1e4",ac:"#5f86ad",so:"#f6f8fa",lace:"#7ea3c6"},
  {id:2,name:"Pitch Runner",img:"images/pitch-runner.png",cat:"Sport",price:2999,up:"#8f3fa0",ac:"#3a1a45",so:"#f1e3b8",lace:"#e7c6ee"},
  {id:3,name:"Street Green",img:"images/street-green.png",cat:"Casual",price:2499,up:"#2f9e57",ac:"#14402a",so:"#f6f8fa",lace:"#cfeedd"},
  {id:4,name:"Wine Court",img:"images/wine-court.png",cat:"Sport",price:2799,up:"#b0264a",ac:"#4a1020",so:"#f6f8fa",lace:"#f3c4d2"},
  {id:5,name:"Mini Sand",img:"images/mini-sand.png",cat:"Kids",price:1799,up:"#e5d1a4",ac:"#a8742b",so:"#fffaf0",lace:"#c79a55"},
  {id:6,name:"Lite Jogger",img:"images/lite-jogger.png",cat:"Kids",price:1599,up:"#f2b705",ac:"#7a5200",so:"#fffaf0",lace:"#fff0b3"}
];
const SIZES = {Sport:[6,7,8,9,10],Casual:[6,7,8,9,10],Kids:[1,2,3,4,5]};
// ======================

const shoe = p => `<svg viewBox="0 14 300 134" role="img" aria-label="${p.name} sneaker illustration">
<defs><linearGradient id="sh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
<ellipse cx="156" cy="145" rx="132" ry="4" fill="#000" fill-opacity=".28"/>
<path d="M18 110Q18 106 30 106H274Q292 106 294 116L292 126Q288 142 262 142H40Q24 142 22 128Z" fill="${p.so}"/><path d="M18 110Q18 106 30 106H274Q292 106 294 116L292 126Q288 142 262 142H40Q24 142 22 128Z" fill="url(#sh)"/>
<path d="M30 138H282" stroke="#000" stroke-opacity=".22" stroke-width="6" stroke-dasharray="2 6"/>
<path d="M26 117H288" stroke="#000" stroke-opacity=".1" stroke-width="2"/>
<path d="M80 60Q84 34 100 28Q112 26 118 34L114 72Z" fill="${p.up}"/><path d="M80 60Q84 34 100 28Q112 26 118 34L114 72Z" fill="#fff" fill-opacity=".25" stroke="#000" stroke-opacity=".12"/>
<path d="M26 106V56Q26 44 40 42Q62 42 74 58Q82 66 96 68L158 80Q210 88 248 95Q288 101 291 108L289 110H28Z" fill="${p.up}"/><path d="M26 106V56Q26 44 40 42Q62 42 74 58Q82 66 96 68L158 80Q210 88 248 95Q288 101 291 108L289 110H28Z" fill="url(#sh)"/>
<path d="M32 46Q58 38 76 58Q60 52 34 52Z" fill="#000" fill-opacity=".25"/>
<path d="M26 106V58Q26 46 38 44L56 44L62 106Z" fill="${p.ac}"/>
<path d="M30 45Q56 38 74 58" stroke="#fff" stroke-opacity=".6" stroke-width="4" fill="none" stroke-linecap="round"/>
<rect x="99" y="34" width="13" height="9" rx="2" fill="#d6342c"/>
<path d="M100 62l10 12M116 66l10 12M132 70l10 12M148 74l10 12M164 78l10 12" stroke="${p.lace}" stroke-width="7" stroke-linecap="round"/>
<path d="M68 106C100 88 150 92 196 102" stroke="#000" stroke-opacity=".2" stroke-width="2" fill="none" stroke-dasharray="4 3"/>
<path d="M234 96Q228 102 234 107" stroke="#000" stroke-opacity=".2" stroke-width="2" fill="none" stroke-dasharray="3 3"/>
<g fill="#000" fill-opacity=".35"><circle cx="254" cy="101" r="1.8"/><circle cx="264" cy="102" r="1.8"/><circle cx="274" cy="104" r="1.8"/><circle cx="259" cy="106" r="1.8"/><circle cx="269" cy="107" r="1.8"/></g>
</svg>`;
const missing = new Set();
const art = p => (p.img && !missing.has(p.id)) ? `<img class="photo" src="${p.img}" alt="${p.name}" data-id="${p.id}">` : shoe(p);
document.addEventListener("error",e=>{
  const t=e.target;
  if(t.tagName==="IMG" && t.dataset.id){ missing.add(+t.dataset.id); const p=PRODUCTS.find(x=>x.id==t.dataset.id); t.outerHTML=shoe(p); }
},true);
const money = n => "₹" + n.toLocaleString("en-IN");
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let selected = {};
const $ = id => document.getElementById(id);

function renderGrid(f="all"){
  $("grid").innerHTML = PRODUCTS.filter(p=>f==="all"||p.cat===f).map(p=>`
    <article class="card"><div class="art">${art(p)}</div>
    <div class="body"><span class="cat">${p.cat}</span><h3>${p.name}</h3><span class="price">${money(p.price)}</span>
    <div class="sizes" data-id="${p.id}">${SIZES[p.cat].map(s=>`<button data-s="${s}" class="${selected[p.id]==s?"on":""}">${s}</button>`).join("")}</div>
    <button class="btn" data-add="${p.id}">Add to cart</button></div></article>`).join("");
}
function renderCart(){
  $("count").textContent = cart.length; $("count").classList.remove("bump"); void $("count").offsetWidth; $("count").classList.add("bump");
  $("items").innerHTML = cart.length ? cart.map((c,i)=>`<div class="line"><div><strong>${c.name}</strong><br><small>Size ${c.size}</small></div><div>${money(c.price)}<br><button data-rm="${i}">Remove</button></div></div>`).join("") : '<p class="empty">Your cart is empty.</p>';
  $("total").textContent = money(cart.reduce((t,c)=>t+c.price,0));
  localStorage.setItem("cart", JSON.stringify(cart));
}
function toggle(open){
  $("drawer").classList.toggle("open",open); $("scrim").classList.toggle("open",open);
  $("drawer").setAttribute("aria-hidden",!open);
}
$("grid").addEventListener("click",e=>{
  const sz = e.target.closest(".sizes button");
  if(sz){ selected[sz.parentElement.dataset.id]=sz.dataset.s; renderGrid($("filters").querySelector(".on").dataset.f); return; }
  const add = e.target.dataset.add;
  if(add){
    const p = PRODUCTS.find(x=>x.id==add);
    if(!selected[p.id]){ alert("Please choose a size first."); return; }
    cart.push({name:p.name,price:p.price,size:selected[p.id]}); renderCart(); toggle(true);
  }
});
$("filters").addEventListener("click",e=>{
  if(e.target.dataset.f){ $("filters").querySelector(".on").classList.remove("on"); e.target.classList.add("on"); renderGrid(e.target.dataset.f); }
});
$("items").addEventListener("click",e=>{ if(e.target.dataset.rm!==undefined){ cart.splice(+e.target.dataset.rm,1); renderCart(); }});
$("openCart").onclick=()=>toggle(true); $("closeCart").onclick=()=>toggle(false); $("scrim").onclick=()=>toggle(false);
document.addEventListener("keydown",e=>{ if(e.key==="Escape") toggle(false); });
$("checkout").onclick=()=>{
  if(!cart.length){ alert("Your cart is empty."); return; }
  const lines = cart.map(c=>`- ${c.name}, size ${c.size}, ${money(c.price)}`).join("\n");
  const msg = `Hi, I'd like to order:\n${lines}\nTotal: ${$("total").textContent}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank");
};
$("waLink").href = `https://wa.me/${WHATSAPP_NUMBER}`;
let hero = PRODUCTS[0];
function renderHero(){
  $("heroShoe").innerHTML = `<div class="swap"><div class="float">${art(hero)}</div></div>`;
  $("heroSec").style.setProperty("--tint", hero.ac);
  $("heroPrice").textContent = money(hero.price);
  $("heroName").textContent = "STRIDER " + hero.name.toUpperCase();
  $("swatches").innerHTML = PRODUCTS.slice(0,4).map(p=>`<button data-h="${p.id}" class="${p.id===hero.id?"on":""}" aria-label="${p.name}">${art(p)}</button>`).join("");
  $("dots").innerHTML = PRODUCTS.slice(0,4).map(p=>`<button data-h="${p.id}" class="${p.id===hero.id?"on":""}" aria-label="Show ${p.name}"></button>`).join("");
  const pl = document.querySelector(".priceline"); pl.classList.remove("pop"); void pl.offsetWidth; pl.classList.add("pop");
}
function pick(id,user){ hero=PRODUCTS.find(p=>p.id==id); renderHero(); if(user) stopAuto(); }
$("dots").addEventListener("click",e=>{ const b=e.target.closest("button"); if(b) pick(b.dataset.h,true); });
$("swatches").addEventListener("click",e=>{ const b=e.target.closest("button"); if(b){ pick(b.dataset.h,true); }});
$("heroAdd").onclick=()=>{ cart.push({name:hero.name,price:hero.price,size:8}); renderCart(); toggle(true); };
$("heroBuy").onclick=()=>{ const msg=`Hi, I'd like to order ${hero.name}, size 8, ${money(hero.price)}.`; window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank"); };
$("yr").textContent = new Date().getFullYear();
renderHero(); renderGrid(); renderCart();

// ===== Animations =====
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
// headline letters rise one by one
const h1 = document.querySelector(".big");
h1.setAttribute("aria-label", h1.textContent);
h1.innerHTML = [...h1.textContent].map((c,i)=>`<span aria-hidden="true" style="--i:${i}">${c}</span>`).join("");
// auto-rotate colorways until the visitor picks one
let auto = calm ? null : setInterval(()=>pick(PRODUCTS[(PRODUCTS.findIndex(p=>p.id===hero.id)+1)%4].id,false), 4500);
function stopAuto(){ clearInterval(auto); auto = null; }
// mouse parallax
const sec = $("heroSec");
if(!calm && matchMedia("(hover:hover)").matches){
  sec.addEventListener("mousemove",e=>{
    const r = sec.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    sec.style.setProperty("--px",(x*34)+"px"); sec.style.setProperty("--py",(y*20)+"px");
    sec.style.setProperty("--bx",(x*-26)+"px"); sec.style.setProperty("--rot",(-4+x*5)+"deg");
  });
  sec.addEventListener("mouseleave",()=>["--px","--py","--bx","--rot"].forEach(k=>sec.style.removeProperty(k)));
}
// scroll reveal
document.querySelectorAll(".head,.sizing > *,.about .wrap > *,.facts li,.contact > *").forEach(el=>el.classList.add("rv"));
const io = new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }}),{threshold:.12});
function reveal(){ document.querySelectorAll(".card:not(.seen),.rv:not(.seen)").forEach((el,i)=>{ el.classList.add("seen"); el.style.setProperty("--d",(i%4)*90+"ms"); io.observe(el); }); }
const _rg = renderGrid; renderGrid = function(f){ _rg(f); document.querySelectorAll(".card").forEach(c=>c.classList.add("in","seen")); };
reveal();
