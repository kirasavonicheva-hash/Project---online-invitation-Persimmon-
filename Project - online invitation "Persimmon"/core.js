/* ============================================================
   ГИФКИ / КАРТИНКИ. ВСТАВЬ СВОИ ССЫЛКИ СЮДА (между кавычками).
   ============================================================ */
const GIFS = {
  hero: "",  // ← гифка на главной (телефон вверху страницы)
  s1:   "",  // ← экран 1: приглашение
  s2:   "",  // ← экран 2: подтверждение
  s3:   "",  // ← экран 3: дата и время
  s4:   "",  // ← экран 4: занятие
  s5:   ""   // ← финальный экран
};
/* Галерея «стикеры» в блоке «Картинка». Вставь до 11 ссылок на гифки, которые гость увидит на выбор. */
const STICKERS = ["","","","","","","","","","",""]; // ← ГИФКИ ДЛЯ ГАЛЕРЕИ

const VIBES=[["#ff6fa5","#ffb3d1","Розовый"],["#ff8fab","#ffc2d1","Нежный"],["#c77dff","#ffb3e6","Лаванда"],["#ff5c8a","#ff9e7d","Персик"],["#d63384","#ff85c0","Малина"],["#ff9a9e","#fecfef","Зефир"],["#b5446e","#ff8fb1","Ягода"],["#f48fb1","#f8bbd0","Пудра"],["#6a1b4d","#d81b84","Слива"]];
const IDEAS=["🍕 Пицца","🎬 Кино","🌳 Прогулка","☕ Кофе","🍦 Мороженое","🎳 Боулинг","🍣 Суши","🎡 Парк аттракционов","🎨 Выставка"];

const DEF = {
  vibe:0,intro:"none",introT:"Для тебя.\nС особым трепетом.",introH:"Нажми на бантик, чтобы открыть",music:"",
  img1:GIFS.s1,img2:GIFS.s2,img3:GIFS.s3,img4:GIFS.s4,img5:GIFS.s5,
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
      st="background:linear-gradient(160deg,#7a2a4d,#c2527f)";
      h=`<h3 style="white-space:pre-line">${esc(c.introT)}</h3><div id="op" style="font-size:64px;cursor:pointer;user-select:none;margin:10px">${c.intro=="bow"?"🎀":"💗"}</div><p>${esc(c.introH)}</p>`;
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
    if(n==0){
      const op=$$("#op");
      if(c.intro=="bow") op.onclick=()=>show(1);
      else{let t;op.onpointerdown=()=>{op.style.transform="scale(1.3)";t=setTimeout(()=>show(1),900)};op.onpointerup=op.onpointerleave=()=>{clearTimeout(t);op.style.transform=""}}
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
  show(start||1);
}
