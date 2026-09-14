const envelopeBtn = document.getElementById('envelopeBtn');
const envelope = document.getElementById('envelope');
const overlay = document.getElementById('letterOverlay');
const backdrop = document.getElementById('letterBackdrop');
const paper = document.getElementById('letterPaper');
const title = document.getElementById('letterTitle');
const lines = document.querySelectorAll('.letter-body .line');
const signature = document.getElementById('letterSignature');
const footer = document.getElementById('letterFooter');
const closeBtn = document.getElementById('closeBtn');
const bgParticles = document.getElementById('bg-particles');
const petalsLayer = document.getElementById('petals-layer');
const bokehLayer = document.getElementById('bokeh-layer');

let isOpen = false;

// particles
function createParticles(){
  for(let i=0;i<18;i++){
    const p=document.createElement('div');
    p.className='particle';
    p.style.left=Math.random()*100+'%';
    p.style.animationDuration=(12+Math.random()*18)+'s';
    p.style.animationDelay=Math.random()*10+'s';
    p.style.width=(2+Math.random()*3)+'px';
    p.style.height=p.style.width;
    bgParticles.appendChild(p);
  }
  for(let i=0;i<10;i++){
    const b=document.createElement('div');
    b.className='bokeh';
    b.style.left=(10+Math.random()*80)+'%';
    b.style.top=(10+Math.random()*80)+'%';
    b.style.animationDuration=(3+Math.random()*4)+'s';
    b.style.animationDelay=Math.random()*3+'s';
    bokehLayer.appendChild(b);
  }
  setInterval(()=>spawnPetal(), 1200);
}
function spawnPetal(){
  const petal=document.createElement('div');
  petal.className='petal';
  petal.style.left=Math.random()*100+'%';
  petal.style.top='-20px';
  petal.style.transform=`rotate(${Math.random()*360}deg)`;
  const dur=6+Math.random()*6;
  petal.animate([
    {transform:`translate(0,0) rotate(0deg)`, opacity:0.8},
    {transform:`translate(${(Math.random()-0.5)*120}px, 100vh) rotate(${360+Math.random()*360}deg)`, opacity:0}
  ],{duration:dur*1000, easing:'ease-in-out'}).onfinish=()=>petal.remove();
  petalsLayer.appendChild(petal);
}

function openLetter(){
  if(isOpen) return;
  isOpen=true;
  envelope.classList.add('open');
  envelopeBtn.style.transform='scale(0.9)';
  // cinematic pause
  setTimeout(()=>{
    overlay.classList.add('active');
    document.body.style.overflow='hidden';
    // reveal sequence
    setTimeout(()=>{
      title.style.transition='all .8s ease';
      title.style.opacity='1';
      title.style.transform='translateY(0)';
    },400);
    lines.forEach((line,i)=>{
      setTimeout(()=>{
        line.classList.add('visible');
      }, 900 + i*420);
    });
    const totalDelay = 900 + lines.length*420 + 300;
    setTimeout(()=>{
      signature.classList.add('visible');
    }, totalDelay);
    setTimeout(()=>{
      footer.classList.add('visible');
      // petals burst around letter
      for(let k=0;k<8;k++) setTimeout(spawnPetal, k*120);
    }, totalDelay+600);
  }, 650);
}

function closeLetter(){
  footer.classList.remove('visible');
  signature.classList.remove('visible');
  title.style.opacity='0';
  title.style.transform='translateY(12px)';
  lines.forEach(l=>l.classList.remove('visible'));
  paper.style.transform='translateY(20px) scale(0.95)';
  paper.style.opacity='0';
  setTimeout(()=>{
    overlay.classList.remove('active');
    envelope.classList.remove('open');
    envelopeBtn.style.transform='';
    paper.style.transform='';
    paper.style.opacity='';
    document.body.style.overflow='';
    isOpen=false;
  }, 500);
}

envelopeBtn.addEventListener('click', openLetter);
backdrop.addEventListener('click', closeLetter);
closeBtn.addEventListener('click', closeLetter);

createParticles();

// subtle parallax on mouse / touch
document.addEventListener('mousemove',(e)=>{
  const x=(e.clientX/window.innerWidth-0.5)*12;
  const y=(e.clientY/window.innerHeight-0.5)*12;
  document.getElementById('bouquet').style.transform=`translate(${x}px, ${y}px)`;
});
