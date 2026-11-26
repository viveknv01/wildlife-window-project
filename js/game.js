(() => {
  const canvas = document.getElementById('scene');
  const ctx = canvas.getContext('2d');
  const $ = id => document.getElementById(id);
  const animals = [
    {name:'Spotted deer',kind:'deer',rarity:'Common',weight:24,scale:1.0,color:'#b98758'},
    {name:'Indian peafowl',kind:'peacock',rarity:'Uncommon',weight:10,scale:1.0,color:'#247c76'},
    {name:'Bonnet macaque',kind:'monkey',rarity:'Common',weight:18,scale:.8,color:'#a77b55'},
    {name:'Malabar giant squirrel',kind:'squirrel',rarity:'Uncommon',weight:9,scale:.8,color:'#9b5540'},
    {name:'Indian grey hornbill',kind:'bird',rarity:'Common',weight:18,scale:.75,color:'#d2c7a2'},
    {name:'Racket-tailed drongo',kind:'bird',rarity:'Uncommon',weight:8,scale:.7,color:'#252b2b'},
    {name:'Wild boar',kind:'boar',rarity:'Common',weight:15,scale:.9,color:'#55473b'},
    {name:'Asian elephant',kind:'elephant',rarity:'Rare',weight:3,scale:1.25,color:'#777c70'},
    {name:'Indian leopard',kind:'leopard',rarity:'Very rare',weight:1,scale:1.0,color:'#b28b55'},
    {name:'Indian junglefowl',kind:'bird',rarity:'Uncommon',weight:8,scale:.7,color:'#8a5941'},
    {name:'Malabar trogon',kind:'bird',rarity:'Rare',weight:3,scale:.75,color:'#c65c42'},
    {name:'Sambar deer',kind:'deer',rarity:'Uncommon',weight:7,scale:1.1,color:'#74513b'},
    {name:'Indian giant flying squirrel',kind:'squirrel',rarity:'Rare',weight:2,scale:.85,color:'#a56c4e'}
  ];
  let w=900,h=520,dpr=1,last=0,zoom=1,creatures=[],nextSpawn=2.5,elapsed=0,toastTimer=0,wind=0;
  let pointer={x:0,y:0};
  const rand=(a,b)=>a+Math.random()*(b-a);
  const chooseAnimal=()=>{let total=animals.reduce((s,a)=>s+a.weight,0),r=Math.random()*total;for(const a of animals){r-=a.weight;if(r<=0)return a;}return animals[0];};
  function resize(){const r=canvas.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);w=r.width;h=r.height;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);}
  function roundedRect(x,y,ww,hh,r,fill){ctx.fillStyle=fill;ctx.beginPath();ctx.roundRect(x,y,ww,hh,r);ctx.fill();}
  function drawBackground(t){
    const sky=ctx.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#9bb7a2');sky.addColorStop(.48,'#b7c59c');sky.addColorStop(1,'#536d4d');ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
    // soft morning light
    const sunX=w*.76,sunY=h*.17,glow=ctx.createRadialGradient(sunX,sunY,3,sunX,sunY,h*.48);glow.addColorStop(0,'#f6e9b899');glow.addColorStop(1,'#f6e9b800');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
    // distant hills
    ctx.fillStyle='#829b78';ctx.beginPath();ctx.moveTo(0,h*.48);for(let x=0;x<=w;x+=w/8)ctx.quadraticCurveTo(x+w/16,h*.31+Math.sin(x*.013)*12,x+w/8,h*.46);ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.fill();
    // far tree silhouettes
    for(let i=0;i<15;i++){let x=(i/14)*w+Math.sin(i*8)*12,y=h*(.32+(i%3)*.035),r=h*(.09+(i%4)*.014);ctx.fillStyle=['#547354','#607e5e','#496b52'][i%3];ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.arc(x-r*.55,y+r*.35,r*.72,0,Math.PI*2);ctx.arc(x+r*.6,y+r*.3,r*.8,0,Math.PI*2);ctx.fill();}
    // layered forest floor
    ctx.fillStyle='#506d49';ctx.beginPath();ctx.moveTo(0,h*.64);ctx.quadraticCurveTo(w*.5,h*.55,w,h*.66);ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.fill();
    ctx.fillStyle='#3f6042';ctx.beginPath();ctx.moveTo(0,h*.78);ctx.quadraticCurveTo(w*.5,h*.67,w,h*.77);ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.fill();
    // sunlight gaps
    for(let i=0;i<5;i++){let x=w*(.12+i*.19);ctx.fillStyle='#e5d99a12';ctx.beginPath();ctx.moveTo(x,h*.35);ctx.lineTo(x+w*.045,h*.35);ctx.lineTo(x+w*.14,h);ctx.lineTo(x+w*.07,h);ctx.fill();}
    // foreground shrubs
    for(let i=0;i<26;i++){let x=(i/25)*w+Math.sin(i*12)*14,y=h*(.82+(i%4)*.035),r=h*(.045+(i%3)*.012);ctx.fillStyle=['#294d37','#34583b','#3b6541'][i%3];ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.arc(x-r*.6,y+r*.3,r*.75,0,Math.PI*2);ctx.arc(x+r*.65,y+r*.28,r*.7,0,Math.PI*2);ctx.fill();}
    // hanging leaves
    for(let i=0;i<13;i++){let x=i*w/12,y=0;ctx.strokeStyle='#294a36';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+Math.sin(t*.4+i)*18,h*.06,x+Math.sin(t*.4+i)*27,h*.16);ctx.stroke();for(let j=0;j<3;j++){let lx=x+Math.sin(t*.4+i)*18+j*6,ly=h*(.045+j*.035);ctx.fillStyle='#355d3d';ctx.beginPath();ctx.ellipse(lx,ly,10,24,.5,0,Math.PI*2);ctx.fill();}}
    // small flowers / grass
    for(let i=0;i<55;i++){let x=(i*97%Math.max(1,w)),y=h*(.84+(i*13%14)/100);ctx.strokeStyle='#77905a';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y+8);ctx.lineTo(x+Math.sin(t+i)*3,y-5);ctx.stroke();}
  }
  function drawAnimal(a,t){
    ctx.save();ctx.translate(a.x,a.y);ctx.scale(a.dir*a.scale,a.scale);const bob=Math.sin(t*3+a.phase)*2;
    ctx.translate(0,bob);ctx.globalAlpha=a.alpha;
    if(a.kind==='bird'){drawBird(a,t);}
    else if(a.kind==='deer'){drawDeer(a,t);}
    else if(a.kind==='monkey'){drawMonkey(a,t);}
    else if(a.kind==='squirrel'){drawSquirrel(a,t);}
    else if(a.kind==='boar'){drawBoar(a,t);}
    else if(a.kind==='elephant'){drawElephant(a,t);}
    else if(a.kind==='leopard'){drawLeopard(a,t);}
    ctx.restore();
  }
  function drawBird(a,t){const flap=Math.sin(t*12+a.phase)*5;ctx.fillStyle=a.color;ctx.beginPath();ctx.ellipse(0,0,13,8,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(10,-7,6,0,Math.PI*2);ctx.fill();ctx.fillStyle='#d6ad63';ctx.beginPath();ctx.moveTo(15,-7);ctx.lineTo(23,-4);ctx.lineTo(15,-2);ctx.fill();ctx.strokeStyle=a.color;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-7,0);ctx.quadraticCurveTo(-2,-13,7,-flap);ctx.stroke();ctx.fillStyle='#f4e8c7';ctx.beginPath();ctx.arc(12,-8,1.4,0,Math.PI*2);ctx.fill();if(a.name.includes('drongo')){ctx.strokeStyle=a.color;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-12,1);ctx.lineTo(-25,10);ctx.moveTo(-12,1);ctx.lineTo(-23,14);ctx.stroke();}}
  function drawDeer(a,t){const c=a.color;ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(0,0,27,13,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(22,-10,9,8,-.4,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(24,-14);ctx.lineTo(30,-21);ctx.lineTo(31,-13);ctx.fill();ctx.strokeStyle=c;ctx.lineWidth=4;for(let x of [-17,13]){ctx.beginPath();ctx.moveTo(x,8);ctx.lineTo(x-2,24+Math.sin(t*8+a.phase)*2);ctx.stroke();}ctx.strokeStyle='#594b38';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(24,-17);ctx.lineTo(20,-29);ctx.lineTo(16,-32);ctx.moveTo(20,-25);ctx.lineTo(27,-31);ctx.stroke();if(a.name.includes('Spotted')){ctx.fillStyle='#f1dfb6';for(let i=0;i<6;i++){ctx.beginPath();ctx.arc(-15+i*5,-4+(i%2)*5,1.5,0,7);ctx.fill();}}}
  function drawMonkey(a,t){ctx.strokeStyle='#76533c';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-19,2);ctx.quadraticCurveTo(-39,-5,-32,-23+Math.sin(t*2)*4);ctx.stroke();ctx.fillStyle=a.color;ctx.beginPath();ctx.ellipse(0,0,17,13,0,0,7);ctx.fill();ctx.beginPath();ctx.arc(13,-9,9,0,7);ctx.fill();ctx.fillStyle='#d6b99a';ctx.beginPath();ctx.arc(16,-8,5,0,7);ctx.fill();ctx.strokeStyle=a.color;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-7,8);ctx.lineTo(-12,20);ctx.moveTo(9,8);ctx.lineTo(14,19);ctx.stroke();}
  function drawSquirrel(a,t){ctx.strokeStyle=a.color;ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(-10,1);ctx.bezierCurveTo(-35,-12,-33,-38,-12,-31);ctx.bezierCurveTo(3,-25,-9,-12,-20,-19);ctx.stroke();ctx.fillStyle=a.color;ctx.beginPath();ctx.ellipse(0,0,14,9,-.3,0,7);ctx.arc(12,-8,7,0,7);ctx.fill();ctx.fillStyle='#e7c49c';ctx.beginPath();ctx.arc(14,-8,2,0,7);ctx.fill();}
  function drawBoar(a,t){ctx.fillStyle=a.color;ctx.beginPath();ctx.ellipse(0,0,27,15,0,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(24,-4,12,9,0,0,7);ctx.fill();ctx.fillStyle='#c5aa8a';ctx.beginPath();ctx.moveTo(29,0);ctx.lineTo(34,8);ctx.lineTo(25,6);ctx.fill();ctx.strokeStyle='#40372e';ctx.lineWidth=4;for(let x of [-15,13]){ctx.beginPath();ctx.moveTo(x,9);ctx.lineTo(x,22);ctx.stroke();}}
  function drawElephant(a,t){ctx.fillStyle=a.color;ctx.beginPath();ctx.ellipse(0,0,35,25,0,0,7);ctx.fill();ctx.beginPath();ctx.arc(28,-12,17,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(16,-14,13,17,-.4,0,7);ctx.fill();ctx.strokeStyle=a.color;ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(38,-4);ctx.quadraticCurveTo(48,9+Math.sin(t*2)*3,39,23);ctx.stroke();ctx.strokeStyle='#5c625a';ctx.lineWidth=5;for(let x of [-22,18]){ctx.beginPath();ctx.moveTo(x,16);ctx.lineTo(x,37);ctx.stroke();}}
  function drawLeopard(a,t){ctx.fillStyle=a.color;ctx.beginPath();ctx.ellipse(0,0,29,13,-.05,0,7);ctx.fill();ctx.arc(24,-8,9,0,7);ctx.fill();ctx.strokeStyle=a.color;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-24,1);ctx.quadraticCurveTo(-43,-6,-40,-19);ctx.stroke();ctx.strokeStyle='#59432f';ctx.lineWidth=2;for(let i=0;i<11;i++){ctx.beginPath();ctx.arc(-19+(i%6)*7,-6+Math.floor(i/6)*10,1.7,0,7);ctx.stroke();}ctx.strokeStyle=a.color;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-13,9);ctx.lineTo(-15,21);ctx.moveTo(17,8);ctx.lineTo(19,21);ctx.stroke();}
  function spawn(){const spec=chooseAnimal(),bird=spec.kind==='bird',a={...spec,x:rand(w*.18,w*.83),y:bird?rand(h*.28,h*.53):rand(h*.61,h*.79),dir:Math.random()<.5?-1:1,phase:rand(0,7),scale:(bird?rand(.65,.9):rand(.78,1.05))*Math.min(w/850,1.15),alpha:0,life:rand(12,23),age:0,speed:rand(5,15)};creatures.push(a);$('sightingHint').textContent=bird?'A flutter in the trees':'Movement in the forest';$('messageTitle').textContent='A visitor in the forest';$('messageText').textContent='Take your time. Can you spot the '+spec.name.toLowerCase()+'?';}
  function draw(t,dt){ctx.clearRect(0,0,w,h);ctx.save();ctx.translate(w/2,h/2);ctx.scale(zoom,zoom);ctx.translate(-w/2,-h/2);drawBackground(t);for(const a of creatures){a.age+=dt;a.x+=a.dir*a.speed*dt;a.alpha=Math.min(1,a.age*1.4,Math.max(0,(a.life-a.age)*.8));drawAnimal(a,t);}ctx.restore();creatures=creatures.filter(a=>a.age<a.life&&a.x>-80&&a.x<w+80);if(creatures.length===0&&elapsed>8){$('sightingHint').textContent='Listen to the forest';$('messageTitle').textContent='A quiet moment';$('messageText').textContent='The forest has its own pace. Stay a while.';}}
  function loop(ts){const now=ts/1000,dt=Math.min(.05,now-last||0);last=now;elapsed+=dt;wind+=dt;nextSpawn-=dt;if(nextSpawn<=0){if(creatures.length<2)spawn();nextSpawn=rand(9,17);}draw(now,dt);requestAnimationFrame(loop);}
  function showToast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2300);}
  function capture(){const a=creatures.filter(x=>x.alpha>.55).sort((x,y)=>Math.abs(x.x-w/2)-Math.abs(y.x-w/2))[0];const flash=$('flash');flash.classList.remove('active');void flash.offsetWidth;flash.classList.add('active');const link=document.createElement('a');link.download='wildlife-window-snapshot.png';link.href=canvas.toDataURL('image/png');link.click();if(a){showToast('Captured: '+a.name+' · '+a.rarity);$('messageTitle').textContent='Lovely capture';$('messageText').textContent='A '+a.rarity.toLowerCase()+' sighting. Your photo has been downloaded.';}else showToast('Snapshot captured · No animal in view');}
  $('zoomIn').addEventListener('click',()=>{zoom=Math.min(1.65,+(zoom+.15).toFixed(2));$('zoomLabel').textContent=zoom.toFixed(1)+'×';});
  $('zoomOut').addEventListener('click',()=>{zoom=Math.max(1,+(zoom-.15).toFixed(2));$('zoomLabel').textContent=zoom.toFixed(1)+'×';});
  $('capture').addEventListener('click',capture);
  canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;});
  window.addEventListener('resize',resize);
  resize();requestAnimationFrame(loop);
  // Friendly time label for the prototype; the scene remains a morning/daytime view.
  let clock=8*60+15;setInterval(()=>{clock++;if(clock>=18*60)clock=6*60;const hh=Math.floor(clock/60),mm=clock%60;$('timeLabel').textContent=(hh<12?'Morning':'Daytime')+' · '+String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0');},60000);
})();