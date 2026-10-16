const $=s=>document.querySelector(s),R=matchMedia('(prefers-reduced-motion:reduce)').matches;
const intro=$('#intro');let done=0;const end=()=>{if(done)return;done=1;intro.classList.add('go');setTimeout(()=>intro.remove(),1200)};
setTimeout(end,R?300:3600);$('#skip').onclick=end;
const S=[['Social Media Management','Plan. Create. Engage. Grow.'],['Video Editing','Turn ideas into impactful visuals.'],['Graphic Designing','Designs that speak your brand.'],['Brand Strategy','A clear path to bigger goals.'],['Web Designing','Websites that work and impress.'],['Content Writing','Words that build connection.'],['Paid Ads','Smarter ads. Stronger results.'],['Community Management','Real people. Real conversations.']];
$('#sv').innerHTML=S.map((s,i)=>`<div class="s rv" style="transition-delay:${i%4*80}ms"><b>0${i+1}</b><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('');
document.querySelectorAll('.s').forEach(c=>{c.onmousemove=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`rotateY(${x*12}deg) rotateX(${-y*12}deg)`;c.style.setProperty('--x',x*100+50+'%');c.style.setProperty('--y',y*100+50+'%')};c.onmouseleave=()=>c.style.transform=''});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');const n=e.target.querySelectorAll('[data-n]');n.forEach(el=>{const t=+el.dataset.n,s=el.dataset.suf||'';let k=0;const id=setInterval(()=>{k+=Math.ceil(t/30);if(k>=t){k=t;clearInterval(id)}el.textContent=k+s},40)});io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
/* scroll: parallax + horizontal */
const track=$('#track'),work=$('#work'),prog=$('#prog'),par=[...document.querySelectorAll('[data-s]')].filter(e=>e.dataset.s);
function onS(){const y=scrollY,h=innerHeight;
if(!R)par.forEach(e=>e.style.transform=`translateY(${y*e.dataset.s*-1}px)`);
const r=work.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(work.offsetHeight-h)));
track.style.transform=`translateX(${-p*(track.scrollWidth-innerWidth+innerWidth*.1)}px)`;prog.style.width=p*100+'%'}
addEventListener('scroll',onS,{passive:true});addEventListener('resize',onS);onS();
/* chaos → order particles */
const cv=$('#cv'),x=cv.getContext('2d');let W,H,P=[],mx=-999,my=-999;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;const n=R?40:Math.min(150,W/9|0);P=Array.from({length:n},(_,i)=>{const t=i/n;return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.6,vy:(Math.random()-.5)*.6,hx:W*.08+t*W*.84,hy:H*.88-t*H*.76+(Math.random()-.5)*60,r:Math.random()*2+.6}})}
rs();addEventListener('resize',rs);addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
function loop(){x.clearRect(0,0,W,H);const o=Math.min(1,scrollY/(innerHeight*1.1));
P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
const dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy);if(d<130){p.x+=dx/d*2.4;p.y+=dy/d*2.4}
p.x+=(p.hx-p.x)*.03*o;p.y+=(p.hy-p.y)*.03*o;
x.fillStyle=o>.7?'#c8ff2e':'#fff';x.globalAlpha=.55;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()});
x.strokeStyle='#c8ff2e';x.lineWidth=.6;for(let i=1;i<P.length;i++){const a=P[i-1],b=P[i],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<200*o+30){x.globalAlpha=(1-d/(230))*.5*o+.04;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
requestAnimationFrame(loop)}loop();
