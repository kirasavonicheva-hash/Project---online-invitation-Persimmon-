/* ================================================================
   ✦✦✦  ТВОИ ФАЙЛЫ: ГИФКИ, СТИКЕРЫ, МУЗЫКА  ✦✦✦
   Пользователь НИЧЕГО не вставляет сам: он только выбирает из того,
   что ты подготовила здесь. Файлы клади в папки рядом с index.html.
   ================================================================ */

/* 1) СТИКЕРЫ / ГИФКИ. Их гость выбирает в блоке «Картинка / гифка» на каждом экране.
      Создай папку  stickers/  , положи туда гифки и впиши пути ниже
      (по одному пути на строку, сколько угодно штук).                      */
const STICKERS = [
  // "stickers/01.gif",   // ← СЛОТ 1: сюда путь к первой гифке (раскомментируй и поменяй имя)
  // "stickers/02.gif",   // ← СЛОТ 2
  // "stickers/03.gif",   // ← СЛОТ 3
  // "stickers/04.gif",   // ← СЛОТ 4
  // "stickers/05.gif",   // ← СЛОТ 5
  // "stickers/06.gif",   // ← СЛОТ 6 … добавляй дальше по тому же образцу
];

/* 2) ГИФКА В ТЕЛЕФОНЕ НА ГЛАВНОЙ СТРАНИЦЕ (index.html). Пусто = возьмётся первый стикер. */
const HERO_GIF = "";   // ← например "stickers/hero.gif"

/* 3) ГОТОВАЯ МУЗЫКА НА ВЫБОР. Папка  music/  с mp3-файлами. Формат: ["Название", "путь"] */
const MUSIC = [
  // ["Гитара",   "music/guitar.mp3"],   // ← ТРЕК 1
  // ["Пианино",  "music/piano.mp3"],    // ← ТРЕК 2
  // ["Лирика",   "music/soft.mp3"],     // ← ТРЕК 3
];

/* 4) КУДА ЗАГРУЖАЮТСЯ СВОИ ТРЕКИ/ФОТО ГОСТЯ. Это адрес сервера из файла server.js.
      Если сайт запущен через  node server.js  , ничего менять не нужно. */
const UPLOAD_URL = "/upload";

async function uploadFile(file){
  try{
    const r=await fetch(UPLOAD_URL+"?name="+encodeURIComponent(file.name),{method:"POST",headers:{"Content-Type":file.type||"application/octet-stream"},body:file});
    if(!r.ok) throw new Error(r.status);
    const j=await r.json();
    return {url:j.url,ok:true};
  }catch(e){ return {url:URL.createObjectURL(file),ok:false} }
}

const VIBES=[["#ff6fa5","#ffb3d1","Лепестки","petal"],["#ff5c8a","#ff9e7d","Сердечки","heart"],["#f48fb1","#f8bbd0","Пузырьки","bubbles"],["#7a2a4d","#d81b84","Светлячки","fire"],["#6a1b4d","#d81b84","Звёзды","star"],["#ff9a9e","#fecfef","Боке","bokeh"],["#c77dff","#ffb3e6","Сиреневый дым","smoke"],["#ff6fa5","#c77dff","Северное сияние","aurora"],["#ff8fab","#ffc2d1","Конфетти","confetti"]];
const INTRO={bow:["Для тебя.\nС особым трепетом.","Зажми узел в центре бантика и потяни вправо"],heart:["Всё начинается\nс тепла","Коснись сердечка и подержи"],glass:["За этим стеклом — кое-что личное","Сотри дымку пальцем"],note:["Некоторые слова хочется оставить на бумаге","Потяни письмо вверх"],time:["Ещё чуть-чуть…","Приглашение откроется в назначенное время"]};
const IDEAS=["🍕 Пицца","🎬 Кино","🌳 Прогулка","☕ Кофе","🍦 Мороженое","🎳 Боулинг","🍣 Суши","🎡 Парк аттракционов","🎨 Выставка"];

const DEF = {
  vibe:0,intro:"none",introT:"Для тебя.\nС особым трепетом.",introH:"Нажми на бантик, чтобы открыть",introP:"Я давно хочу спросить…",introAt:"",music:"",
  img1:STICKERS[0]||"",img2:STICKERS[1]||"",img3:STICKERS[2]||"",img4:STICKERS[3]||"",img5:STICKERS[4]||"",
  q:"Пойдёшь со мной на свидание? 💌", yes:"Да! 😍", no:"Нет", anim:"burst", mode:"run",
  t2:"Подожди, ты правда сказала «да»? 😍", s2:"А я так волновался", b2:"Да, да, ДА!",
  pm:"free", t3:"Когда тебе удобно? 📅", b3:"Подтвердить 💫", times:"25.10|19:00\n26.10|18:00",
  t4:"Чем займёмся? 🥰", sub4:"Выбирай, что по душе", opts:["🍕 Пицца","🎬 Кино","🌳 Прогулка","☕ Кофе"],
  t5:"Ура! Это свидание 💗", d5:"Жду тебя {date} в {time}. Нас ждёт: {activity} 💫",
  album:"", voice:"", secret:""
};
let cfg = JSON.parse(JSON.stringify(DEF)), step = 1;
const esc = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const $ = s => document.querySelector(s);
const lines = t => String(t||"").split("\n").map(x=>x.trim()).filter(Boolean);


const BOW=`<svg viewBox="0 0 260 200" width="100%"><defs>
<linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd1df"/><stop offset=".45" stop-color="#ec7b9c"/><stop offset="1" stop-color="#a8366a"/></linearGradient>
<linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7a5bd"/><stop offset="1" stop-color="#b0406a"/></linearGradient>
<radialGradient id="g3" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffd9e5"/><stop offset=".6" stop-color="#e0668c"/><stop offset="1" stop-color="#9c2f5f"/></radialGradient></defs>
<path d="M122 104C108 134 92 160 74 190L98 184L108 198C118 166 130 136 138 106Z" fill="url(#g2)"/>
<path d="M138 104C152 134 168 160 186 190L162 184L152 198C142 166 130 136 122 106Z" fill="url(#g2)"/>
<g class="lp"><path d="M128 98C98 38 26 22 16 66C8 104 78 124 128 104Z" fill="url(#g1)"/><path d="M122 99C98 58 52 50 44 72C40 88 78 102 122 100Z" fill="#a8366a" opacity=".45"/><path d="M58 50C84 48 104 66 114 88" stroke="#fff" stroke-opacity=".55" stroke-width="3" fill="none" stroke-linecap="round"/></g>
<g transform="translate(260 0) scale(-1 1)"><g class="lp"><path d="M128 98C98 38 26 22 16 66C8 104 78 124 128 104Z" fill="url(#g1)"/><path d="M122 99C98 58 52 50 44 72C40 88 78 102 122 100Z" fill="#a8366a" opacity=".45"/><path d="M58 50C84 48 104 66 114 88" stroke="#fff" stroke-opacity=".55" stroke-width="3" fill="none" stroke-linecap="round"/></g></g>
<rect x="112" y="80" width="36" height="42" rx="14" fill="url(#g3)"/><path d="M118 87C124 84 134 84 140 88" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
const DOODLE=`<svg class="dh" viewBox="0 0 40 30"><path d="M20 26C6 16 4 6 12 5C17 4 20 9 20 11C20 9 23 4 28 5C36 6 34 16 20 26Z" fill="none" stroke="#b4535f" stroke-width="1.6"/></svg>`;
function drag(node,onmove,onend){
  let sx,sy,on=false; node.style.touchAction="none";
  node.onpointerdown=e=>{on=true;sx=e.clientX;sy=e.clientY;try{node.setPointerCapture(e.pointerId)}catch(_){}};
  node.onpointermove=e=>{if(on)onmove(e.clientX-sx,e.clientY-sy,e)};
  node.onpointerup=node.onpointercancel=()=>{if(on){on=false;onend()}};
}
function fx(el,i){
  const t=(VIBES[i]||VIBES[0])[3];
  if(t=="aurora"){el.classList.add("aur");return}
  const L=document.createElement("div");L.className="fx";
  const N={bokeh:7,smoke:6}[t]||16, r=Math.random;
  for(let k=0;k<N;k++){
    const s=document.createElement("span");s.className="p-"+t;
    s.style.left=r()*100+"%";s.style.animationDelay=(-r()*8)+"s";s.style.animationDuration=(6+r()*8)+"s";
    if(["bokeh","smoke","star","fire"].includes(t)) s.style.top=r()*90+"%";
    if(t=="petal"||t=="heart"||t=="star"){s.style.fontSize=(10+r()*14)+"px";s.textContent=t=="petal"?"🌸":t=="heart"?"💗":"✦"}
    else{const z=t=="bokeh"?60+r()*70:t=="smoke"?110+r()*90:t=="bubbles"?8+r()*22:5+r()*6;s.style.width=s.style.height=z+"px"}
    if(t=="confetti"){s.style.background=["#fff","#ffd1e3","#ff9ec7","#ffe08a"][k%4];s.style.width="7px";s.style.height="12px"}
    L.appendChild(s);
  }
  el.prepend(L);
}

function play(c, host, start, preview){
  let nos = 0, pick = {date:"",time:"",act:""}, audio=null;
  const img = u => u ? `<img src="${esc(u)}" alt="">` : (preview ? `<div class="ph">🐾<br><small>тут гифка</small></div>` : "");
  const bg = () => {const v=VIBES[c.vibe]||VIBES[0];return `background:linear-gradient(160deg,${v[0]},${v[1]})`};
  function hearts(){
    for(let i=0;i<26;i++){
      const h=document.createElement("span");h.className="hr";h.textContent=["💗","💖","💕","🌸"][i%4];
      h.style.left=Math.random()*95+"%";h.style.fontSize=(16+Math.random()*22)+"px";h.style.animationDelay=Math.random()*.8+"s";
      host.appendChild(h);setTimeout(()=>h.remove(),3200);
    }
  }
  function show(n){
    const o = (c.opts||[]).filter(Boolean).slice(0,6);
    let h = "", st = bg();
    if(n==0){
      const k=c.intro, dark=k=="note"?"#8a3f58,#b05a6a":"#7a2a4d,#c2527f";
      st=(k=="glass"?bg():`background:linear-gradient(160deg,${dark})`)+";justify-content:flex-start";
      let stage="";
      if(k=="bow") stage=`<i class="abs rb h"></i><i class="abs rb v"></i><div class="abs bw" id="bw">${BOW}</div><div id="kn" class="abs kn"></div><div class="abs kl">зажми здесь</div>`;
      if(k=="heart") stage=`<div id="hr" class="abs hrt">💗</div>`;
      if(k=="glass") stage=`<canvas id="cv" class="abs gl"></canvas>`;
      if(k=="note") stage=`<div class="abs env"><div class="eb"></div><div id="pp" class="paper"><span>${esc(c.introP)}</span>${DOODLE}</div><div class="efw"><div class="ef"><b>Лично тебе</b><i></i><small>одно маленькое признание</small></div></div></div><div class="abs nh">потяни письмо ↑</div>`;
      if(k=="time") stage=`<div id="cd" style="font-size:26px;font-weight:800;margin:40px 0 14px">…</div><button class="b y" id="op" style="display:none">Открыть 💗</button>`;
      h=`${stage}<h3 style="white-space:pre-line;margin-top:6px">${esc(c.introT)}</h3><p>${esc(c.introH)}</p>${(k!="time"||preview)?'<a id="sk" class="sk">Открыть приглашение ↗</a>':""}`;
    }
    if(n==1) h=`${img(c.img1)}<h3>${esc(c.q)}</h3><div style="position:relative;width:100%;min-height:50px"><button class="b y" id="y">${esc(c.yes)}</button><button class="b n" id="n">${esc(c.no)}</button></div>`;
    if(n==2) h=`${img(c.img2)}<h3>${esc(c.t2)}</h3><p>${esc(c.s2)}</p><button class="b y" id="go">${esc(c.b2)}</button>`;
    if(n==3){
      const body = c.pm=="list"
        ? `<div class="opts" style="grid-template-columns:1fr">${lines(c.times).map((t,i)=>`<button data-t="${i}">${esc(t.replace("|"," в "))}</button>`).join("")}</div>`
        : `<input type="date" id="d"><input type="time" id="t"><button class="b y" id="go">${esc(c.b3)}</button>`;
      h=`${img(c.img3)}<h3>${esc(c.t3)}</h3>${body}`;
    }
    if(n==4) h=`${img(c.img4)}<h3>${esc(c.t4)}</h3>${c.sub4?`<p>${esc(c.sub4)}</p>`:""}<div class="opts">${o.map((x,i)=>`<button data-i="${i}">${esc(x)}</button>`).join("")}</div>`;
    if(n==5){
      const d = c.d5.replace(/\{date\}/g,pick.date||"(дата)").replace(/\{time\}/g,pick.time||"(время)").replace(/\{activity\}/g,pick.act||"(занятие)");
      const al = lines(c.album).map(u=>`<img src="${esc(u)}" alt="">`).join("");
      h=`${img(c.img5)}<h3>${esc(c.t5)}</h3><p>${esc(d)}</p>${al?`<div class="strip">${al}</div>`:""}`
       +(c.voice?`<button class="b n" id="vo">🎤 Голосовое</button>`:"")
       +(c.secret?`<button class="b n" id="se">🎁 Секретный конверт</button>`:"")
       +`<button class="b y" id="send">Отправить ответ 💌</button>`;
    }
    host.innerHTML = `<div class="scr" style="${st}">${h}</div>`;
    const el = host.firstChild, $$ = s => el.querySelector(s);
    if(n!=0||c.intro=="glass") fx(el,c.vibe);
    if(n==0){
      let done=false; const open=()=>{if(!done){done=true;show(1)}};
      const sk=$$("#sk"); if(sk) sk.onclick=open;
      const k=c.intro;
      if(k=="bow"){
        const kn=$$("#kn"),bw=$$("#bw");
        const untie=()=>{if(done)return;done=true;el.classList.add("untied");setTimeout(()=>show(1),700)};
        drag(kn,dx=>{
          if(done)return;
          dx=Math.max(0,Math.min(dx,150));const p=Math.min(1,dx/90);
          kn.style.transform=`translate(calc(-50% + ${dx}px),-50%)`;
          bw.style.setProperty("--p",p);
          bw.style.transform=`translate(calc(-50% + ${dx*.45}px),-50%) rotate(${p*9}deg)`;
          if(dx>=90)untie();
        },()=>{if(!done){kn.style.transform="";bw.style.setProperty("--p",0);bw.style.transform=""}});
      }
      if(k=="heart"){
        const hr=$$("#hr"); let p=0,held=false,raf;
        const tick=()=>{p=Math.max(0,Math.min(1,p+(held?.012:-.03)));hr.style.opacity=.25+.75*p;hr.style.transform=`translate(-50%,-50%) scale(${1+p*.35})`;if(p>=1)return open();if(p>0||held)raf=requestAnimationFrame(tick)};
        hr.onpointerdown=()=>{held=true;cancelAnimationFrame(raf);tick()};
        hr.onpointerup=hr.onpointerleave=()=>{held=false};
        hr.style.opacity=.25;
      }
      if(k=="glass"){
        const cv=$$("#cv"), w=cv.width=cv.offsetWidth||240, hh=cv.height=cv.offsetHeight||300, x=cv.getContext("2d");
        x.fillStyle="rgba(255,255,255,.72)";x.fillRect(0,0,w,hh);
        for(let i=0;i<60;i++){x.fillStyle="rgba(255,255,255,.9)";x.beginPath();x.arc(Math.random()*w,Math.random()*hh,1+Math.random()*2.5,0,7);x.fill()}
        let down=false,cnt=0;
        cv.style.touchAction="none";
        cv.onpointerdown=e=>{down=true;try{cv.setPointerCapture(e.pointerId)}catch(_){}};
        cv.onpointerup=cv.onpointercancel=()=>{down=false};
        cv.onpointermove=e=>{
          if(!down)return;
          const r=cv.getBoundingClientRect();
          x.globalCompositeOperation="destination-out";x.beginPath();x.arc((e.clientX-r.left)*w/r.width,(e.clientY-r.top)*hh/r.height,24,0,7);x.fill();
          if(++cnt%12==0){
            const d=x.getImageData(0,0,w,hh).data;let clear=0,tot=0;
            for(let i=3;i<d.length;i+=4*97){tot++;if(d[i]<40)clear++}
            if(clear/tot>.5)open();
          }
        };
      }
      if(k=="note"){
        const pp=$$("#pp");
        drag(pp,(dx,dy)=>{
          if(done)return;
          dy=Math.max(-110,Math.min(0,dy));pp.style.transform=`translateY(${dy}px)`;
          if(dy<-75){done=true;el.classList.add("opening");setTimeout(()=>show(1),650)}
        },()=>{if(!done)pp.style.transform=""});
      }
      if(k=="time"){
        const cd=$$("#cd"),op=$$("#op"),t=c.introAt?new Date(c.introAt).getTime():0;
        op.onclick=open;
        const upd=()=>{
          if(!document.body.contains(cd)){clearInterval(iv);return}
          const d=t-Date.now();
          if(!t||d<=0){cd.textContent="Пора! 💗";op.style.display="";clearInterval(iv);return}
          const s=Math.floor(d/1000),dd=Math.floor(s/86400),hh2=Math.floor(s%86400/3600),mm=Math.floor(s%3600/60),ss=s%60;
          cd.textContent=(dd?dd+" д ":"")+String(hh2).padStart(2,"0")+":"+String(mm).padStart(2,"0")+":"+String(ss).padStart(2,"0");
        };
        const iv=setInterval(upd,1000);upd();
      }
    }
    if(n==1){
      $$("#y").onclick=()=>{
        if(c.anim=="burst")hearts();
        if(c.music&&!audio){try{audio=new Audio(c.music);audio.loop=true;audio.play().catch(()=>{})}catch(e){}}
        show(2);
      };
      const nb=$$("#n");
      const dodge=e=>{
        nos++;
        if(c.mode=="run"){e.preventDefault();nb.style.position="absolute";nb.style.left=Math.random()*60+"%";nb.style.top=(Math.random()*160-40)+"px"}
        else if(c.mode=="shrink"){nb.style.transform=`scale(${Math.max(.15,1-nos*.2)})`;$$("#y").style.transform=`scale(${1+nos*.12})`}
        else if(nos>=5){nb.style.display="none"}
      };
      nb.onmouseenter=e=>{if(c.mode=="run")dodge(e)};
      nb.ontouchstart=dodge; nb.onclick=dodge;
    }
    if(n==2) $$("#go").onclick=()=>{hearts();show(3)};
    if(n==3){
      if(c.pm=="list") el.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{const p=lines(c.times)[b.dataset.t].split("|");pick.date=p[0];pick.time=p[1]||"";show(4)});
      else $$("#go").onclick=()=>{pick.date=($$("#d").value||"").split("-").reverse().join(".");pick.time=$$("#t").value;show(4)};
    }
    if(n==4) el.querySelectorAll(".opts button").forEach(b=>b.onclick=()=>{pick.act=o[b.dataset.i];hearts();show(5)});
    if(n==5){
      hearts();
      if($$("#vo")) $$("#vo").onclick=()=>{try{new Audio(c.voice).play()}catch(e){}};
      if($$("#se")) $$("#se").onclick=()=>alert(c.secret);
      $$("#send").onclick=()=>{
        const msg=`Мой ответ на «${c.q}»: ${c.yes} 💗\nДата: ${pick.date||"не выбрано"}\nВремя: ${pick.time||"не выбрано"}\nЗанятие: ${pick.act||"не выбрано"}\nПопыток нажать «${c.no}»: ${nos}`;
        if(navigator.share) navigator.share({text:msg}).catch(()=>{});
        else navigator.clipboard.writeText(msg).then(()=>alert("Ответ скопирован! Отправь его в чат 💌"),()=>prompt("Скопируй ответ:",msg));
      };
    }
  }
  show(start==null?1:start);
}
