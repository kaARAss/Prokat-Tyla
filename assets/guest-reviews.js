'use strict';
(()=>{
 const section=document.getElementById('reviews');if(!section)return;
 section.querySelectorAll('.guest-review-expand').forEach(button=>button.addEventListener('click',()=>{
  const full=document.getElementById(button.getAttribute('aria-controls')),preview=button.closest('blockquote').querySelector('.guest-review-preview');
  const expanded=button.getAttribute('aria-expanded')!=='true';
  full.hidden=!expanded;preview.hidden=expanded;button.setAttribute('aria-expanded',String(expanded));
  button.innerHTML=expanded?'Свернуть <span aria-hidden="true">−</span>':'Читать полностью <span aria-hidden="true">+</span>';
 }));
 const more=section.querySelector('.guest-reviews-more'),cards=[...section.querySelectorAll('.guest-review')];
 if(more)more.addEventListener('click',()=>{const expanded=more.getAttribute('aria-expanded')!=='true';cards.slice(6).forEach(card=>card.hidden=!expanded);more.setAttribute('aria-expanded',String(expanded));more.innerHTML=expanded?'Скрыть дополнительные отзывы <span aria-hidden="true">↑</span>':`Показать ещё ${cards.length-6} отзывов <span aria-hidden="true">↓</span>`;if(!expanded)section.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'})});
})();
