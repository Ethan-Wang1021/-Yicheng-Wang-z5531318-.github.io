const gate = document.getElementById('gate');
const agree = document.getElementById('agree');
const enterBtn = document.getElementById('enterBtn');
const heroVideo = document.querySelector('.hero__bg');

agree?.addEventListener('change', () => { enterBtn.disabled = !agree.checked; });

enterBtn?.addEventListener('click', () => {
  gate.style.display = 'none';
  heroVideo?.play?.().catch;
});

const ambience = document.getElementById('ambience');
const audioToggle = document.getElementById('audioToggle');
audioToggle?.addEventListener('click', () => {
  if (ambience.paused) {
    ambience.play().catch(()=>{}); 
    audioToggle.setAttribute('aria-pressed','true');
  } else {
    ambience.pause();
    audioToggle.setAttribute('aria-pressed','false');
  }
});

const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
  const light = document.documentElement.classList.toggle('light');
  themeToggle.setAttribute('aria-pressed', light ? 'true' : 'false');
  if (light) {
    document.documentElement.style.setProperty('--bg', '#f7f8fc');
    document.documentElement.style.setProperty('--bg-2', '#ffffff');
    document.documentElement.style.setProperty('--fg', '#ff0000ff');
    document.documentElement.style.setProperty('--muted', '#5c6472');
    document.documentElement.style.setProperty('--glass', 'rgba(0,0,0,0.06)');
    document.documentElement.style.setProperty('--stroke', 'rgba(0,0,0,0.12)');
    document.documentElement.style.setProperty('--ring', 'rgba(39,174,96,0.25)');
  } else {
    document.documentElement.style.cssText = '';
  }
});

document.querySelectorAll('.dotnav').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const target = document.querySelector(btn.dataset.target);
    target?.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

const dots = document.querySelectorAll('.dotnav');
const sections = ['#hero','#chat','#lab','#news','#credits'].map(s=>document.querySelector(s));
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const idx = sections.indexOf(entry.target);
      dots.forEach(d=>d.classList.remove('active'));
      dots[idx]?.classList.add('active');
    }
  });
},{threshold:0.6});
sections.forEach(s=>io.observe(s));

const mood = document.getElementById('mood');
const moodLabel = document.getElementById('moodLabel');
const autoText = document.getElementById('autoText');
const tone = document.getElementById('tone');

function updateReply(val){
  const v = Number(val);
  if (moodLabel) moodLabel.textContent = v.toString();

  let text, tlabel;
  if(v < 35){
    text = 'Sorry, I am in a bad mood today. I will tidy myself up as soon as possible.';
    tlabel = 'soft';
  }else if(v < 65){
    text = 'Received, I am fine. I will reply to you later.';
    tlabel = 'medium';
  }else{
    text = 'I am in good shape! Shall we have a chat tonight?';
    tlabel = 'active';
  }

  if (autoText) autoText.textContent = text;
  if (tone) tone.textContent = tlabel;
}

mood?.addEventListener('input', e => updateReply(e.target.value));
updateReply(mood?.value ?? 50);

document.querySelectorAll('.bubble.from-me .maskable').forEach(p=>{
  if (!p.dataset.base) p.dataset.base = (p.textContent || '').trim();
});
document.querySelectorAll('.bubble.from-me').forEach(card=>{
  const btn = card.querySelector('.reveal');
  const p   = card.querySelector('.maskable');

  btn?.addEventListener('click', ()=>{
    const inner = card.getAttribute('data-inner') || '';

    if (p?.dataset.state === 'inner'){
      p.textContent = p.dataset.base || p.textContent;
      p.dataset.state = 'auto';
      btn.textContent = 'True emotion';
    }else{
      p.textContent = inner || 'emotion';
      p.dataset.state = 'inner';
      btn.textContent = 'auto';
    }
  });
});

const hero = document.getElementById('hero');
function setFallback(){
  hero && hero.classList.add('fallback');
}
if(heroVideo){
  heroVideo.addEventListener('error', setFallback);
  let timer = setTimeout(setFallback, 10000); 
  heroVideo.addEventListener('canplay', ()=> clearTimeout(timer));
}

const hrvNode = document.getElementById('hrv');
let hrvBase = 62;
setInterval(()=>{
  const jiggle = Math.round((Math.random() - 0.5)*4);
  if(hrvNode) hrvNode.textContent = String(hrvBase + jiggle);
}, 1200);
