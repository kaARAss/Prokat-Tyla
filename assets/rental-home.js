'use strict';
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const header=document.getElementById('hdr'),burger=document.getElementById('burger'),nav=document.getElementById('nav');
 const close=()=>{nav.classList.remove('open');burger.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Открыть меню')};
 burger.addEventListener('click',()=>{const open=burger.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);burger.classList.toggle('open',open);burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню')});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
 document.addEventListener('click',e=>{if(!e.target.closest('#hdr'))close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){close();burger.focus()}});
 matchMedia('(min-width:861px)').addEventListener('change',e=>{if(e.matches)close()});
 const scroll=()=>header.classList.toggle('scrolled',scrollY>35);addEventListener('scroll',scroll,{passive:true});scroll();
 document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
 // Bull-bike's typewriter timing and typography, with K2 phrases only.
 const el=document.getElementById('heroType');
 const phrases=['Заряд энергии и эмоций','Приключения рядом с Тулой','Лес. Карьер. Твой маршрут.','Твой выход из рутины'];
 let timer;
 if(!reduced){let pi=0,ci=phrases[0].length,deleting=true;const tick=()=>{if(document.hidden){timer=setTimeout(tick,500);return}const text=phrases[pi];if(deleting){ci--;el.textContent=text.slice(0,Math.max(ci,1));if(ci<=1){deleting=false;pi=(pi+1)%phrases.length;ci=1;timer=setTimeout(tick,280);return}timer=setTimeout(tick,30)}else{ci++;el.textContent=text.slice(0,ci);if(ci>=text.length){deleting=true;timer=setTimeout(tick,1900);return}timer=setTimeout(tick,68)}};timer=setTimeout(tick,1900);addEventListener('pagehide',()=>clearTimeout(timer),{once:true})}
 if('IntersectionObserver'in window){
  if(!reduced)document.body.classList.add('motion-ready');
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in','is-in');io.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll('.reveal,.fmt-card,.tech-card').forEach(e=>io.observe(e));
 }else document.querySelectorAll('.reveal,.fmt-card,.tech-card').forEach(e=>e.classList.add('in','is-in'));
 if(!reduced&&matchMedia('(hover:hover)').matches){document.querySelectorAll('.tour,.tech-card,.cat .c').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1000px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateY(-4px)`});card.addEventListener('pointerleave',()=>card.style.transform='')})}
 // A real horizontal gallery. Native scrolling, touch and keyboard still work.
 const viewport=document.querySelector('.gal-vp'),prev=document.querySelector('[data-gallery-prev]'),next=document.querySelector('[data-gallery-next]');
 prev.addEventListener('click',()=>viewport.scrollBy({left:-viewport.clientWidth*.75,behavior:reduced?'instant':'smooth'}));
 next.addEventListener('click',()=>viewport.scrollBy({left:viewport.clientWidth*.75,behavior:reduced?'instant':'smooth'}));
 let paused=false,visible=false,last=0,direction=1,raf;
 ['pointerenter','focusin','touchstart','wheel'].forEach(event=>viewport.addEventListener(event,()=>paused=true,{passive:true}));
 viewport.addEventListener('pointerleave',()=>paused=false);viewport.addEventListener('focusout',e=>{if(!viewport.contains(e.relatedTarget))paused=false});
 if(!reduced){new IntersectionObserver(entries=>visible=entries[0].isIntersecting).observe(viewport);const animate=time=>{if(last&&visible&&!paused&&!document.hidden&&!document.querySelector('dialog[open]')){const max=viewport.scrollWidth-viewport.clientWidth;viewport.scrollLeft+=Math.min(time-last,40)*.024*direction;if(viewport.scrollLeft>=max-1)direction=-1;if(viewport.scrollLeft<=1)direction=1}last=time;raf=requestAnimationFrame(animate)};raf=requestAnimationFrame(animate);addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true})}
 const dialog=document.querySelector('.lightbox'),buttons=[...document.querySelectorAll('[data-photo]')],image=dialog.querySelector('figure img'),caption=dialog.querySelector('figcaption');let active=0,opener;
 const show=i=>{active=(i+buttons.length)%buttons.length;image.src=buttons[active].dataset.photo;image.alt=buttons[active].dataset.caption;caption.textContent=`${active+1} / ${buttons.length} — ${image.alt}`};
 buttons.forEach((button,i)=>button.addEventListener('click',()=>{opener=button;show(i);dialog.showModal();document.body.style.overflow='hidden';dialog.querySelector('.lightbox-close').focus()}));
 dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());dialog.querySelector('.lightbox-prev').addEventListener('click',()=>show(active-1));dialog.querySelector('.lightbox-next').addEventListener('click',()=>show(active+1));dialog.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus()});dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();show(active+1)}if(e.key==='ArrowLeft'){e.preventDefault();show(active-1)}});
 let startX;dialog.addEventListener('touchstart',e=>startX=e.changedTouches[0].clientX,{passive:true});dialog.addEventListener('touchend',e=>{if(startX===undefined)return;const delta=e.changedTouches[0].clientX-startX;if(Math.abs(delta)>60)show(active+(delta<0?1:-1));startX=undefined},{passive:true});
})();
