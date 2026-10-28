'use strict';
(()=>{
 const header=document.querySelector('.header'),text=document.getElementById('heroType');
 const update=()=>header.classList.toggle('is-scrolled',scrollY>40);addEventListener('scroll',update,{passive:true});update();
 if(!text||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const phrases=['Заряд энергии и эмоций','Твой выход из рутины','Приключения рядом с Тулой'];
 let phrase=0,count=phrases[0].length,deleting=true,timer;
 function tick(){if(document.hidden){timer=setTimeout(tick,400);return}const value=phrases[phrase];if(deleting){count=Math.max(1,count-1);text.textContent=value.slice(0,count);if(count===1){deleting=false;phrase=(phrase+1)%phrases.length;timer=setTimeout(tick,280)}else timer=setTimeout(tick,30)}else{count++;text.textContent=value.slice(0,count);if(count>=value.length){deleting=true;timer=setTimeout(tick,1900)}else timer=setTimeout(tick,68)}}
 timer=setTimeout(tick,1900);addEventListener('pagehide',()=>clearTimeout(timer),{once:true});
})();
