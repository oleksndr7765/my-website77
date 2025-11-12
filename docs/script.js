
// Enhanced animations + rain background + small interactions
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  document.querySelectorAll('.plan .select').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.plan').forEach(p => p.classList.remove('highlight'));
      btn.closest('.plan').classList.add('highlight');
      btn.innerText = 'Обрано ✓';
      setTimeout(()=>btn.innerText = 'Вибрати', 2000);
    });
  });
});

let observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); e.target.style.opacity=1; e.target.style.transform='none'; observer.unobserve(e.target); }
  });
},{threshold:0.12});

// Rain canvas background (stylized subtle)
(function(){
  const canvas = document.createElement('canvas');
  canvas.id = 'rainCanvas';
  canvas.style.position='fixed';
  canvas.style.left='0'; canvas.style.top='0'; canvas.style.width='100%'; canvas.style.height='100%';
  canvas.style.pointerEvents='none'; canvas.style.zIndex='0'; canvas.style.opacity='0.10';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  window.addEventListener('resize', resize); resize();
  const drops = [];
  for(let i=0;i<160;i++){
    drops.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, l:Math.random()*26+6, s:Math.random()*2+1.4});
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = 'rgba(242,201,76,0.6)';
    ctx.lineWidth = 1;
    drops.forEach(d=>{
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - d.s*0.8, d.y + d.l);
      ctx.stroke();
      d.x += d.s*0.7;
      d.y += d.s*4.2;
      if(d.y > canvas.height){ d.y = -10; d.x = Math.random()*canvas.width; }
      if(d.x > canvas.width) d.x = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
