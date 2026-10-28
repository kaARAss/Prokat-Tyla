'use strict';
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const toggle=document.querySelector('.menu-toggle');
 const nav=document.querySelector('.nav');
 const closeMenu=()=>{toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Открыть меню');nav.classList.remove('is-open')};
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');nav.classList.toggle('is-open',open)});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('is-open')){closeMenu();toggle.focus()}});
 document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu()});
 matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
 document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
 if(!reduced&&'IntersectionObserver'in window){
  document.body.classList.add('motion-ready');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
 }
 const dialog=document.querySelector('.lightbox'),buttons=[...document.querySelectorAll('[data-photo]')];
 const image=dialog.querySelector('figure img'),caption=dialog.querySelector('figcaption');let active=0,opener;
 const show=i=>{active=(i+buttons.length)%buttons.length;image.src=buttons[active].dataset.photo;image.alt=buttons[active].dataset.caption;caption.textContent=`${active+1} / ${buttons.length} — ${image.alt}`};
 buttons.forEach((b,i)=>b.addEventListener('click',()=>{opener=b;show(i);dialog.showModal();document.body.style.overflow='hidden';dialog.querySelector('.lightbox-close').focus()}));
 dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
 dialog.querySelector('.lightbox-prev').addEventListener('click',()=>show(active-1));
 dialog.querySelector('.lightbox-next').addEventListener('click',()=>show(active+1));
 dialog.addEventListener('close',()=>{document.body.style.overflow='';if(opener)opener.focus()});
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();show(active+1)}if(e.key==='ArrowLeft'){e.preventDefault();show(active-1)}});
 let startX;dialog.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX},{passive:true});dialog.addEventListener('touchend',e=>{if(startX===undefined)return;const delta=e.changedTouches[0].clientX-startX;if(Math.abs(delta)>60)show(active+(delta<0?1:-1));startX=undefined},{passive:true});
 // Gentle cursor-driven depth, inspired by the reference projects. No scroll hijacking.
 if(!reduced&&matchMedia('(hover:hover)').matches){document.querySelectorAll('.float-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.translate=`${(e.clientX-r.left-r.width/2)*.035}px ${(e.clientY-r.top-r.height/2)*.035}px`});card.addEventListener('pointerleave',()=>card.style.translate='0 0')})}
 // Pause decorative continuous motion offscreen to reduce power consumption.
 if('IntersectionObserver'in window){const motionObserver=new IntersectionObserver(entries=>entries.forEach(e=>{e.target.style.animationPlayState=e.isIntersecting?'running':'paused'}));document.querySelectorAll('.float-card,.ticker>div').forEach(x=>motionObserver.observe(x))}
})();
