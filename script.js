const root=document.documentElement,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

/* theme toggle */
const mode=$('#mode'),label=()=>mode.setAttribute('aria-label',root.dataset.theme==='dark'?'Switch to light theme':'Switch to dark theme');
label();
mode.addEventListener('click',()=>{
 root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
 try{localStorage.setItem('theme',root.dataset.theme)}catch(e){}
 label();
});

/* mobile menu */
const bar=$('.bar'),menu=$('#menu');
const setMenu=o=>{bar.classList.toggle('open',o);root.classList.toggle('lock',o);menu.setAttribute('aria-expanded',o);menu.textContent=o?'Close':'Menu'};
menu.addEventListener('click',()=>setMenu(!bar.classList.contains('open')));
$$('nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});

/* background glow follows scroll: --p goes from 0 (top) to 1 (bottom) */
let tick=false;
const update=()=>{tick=false;const h=root.scrollHeight-innerHeight;root.style.setProperty('--p',h>0?Math.min(scrollY/h,1).toFixed(3):0)};
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(update)}},{passive:true});
update();

/* highlight the current section in the nav */
const links=$$('nav a[href^="#"]');
const so=new IntersectionObserver(es=>es.forEach(e=>{
 if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id));
}),{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(s=>so.observe(s));
