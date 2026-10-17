/* ---------- конструктор по блокам ---------- */
const caps=["Экран 1: приглашение","Экран 2: подтверждение","Экран 3: дата и время","Экран 4: занятие","Финальный экран"];
const sec=(t,m,body)=>`<div class="sec"><h4>${t}</h4>${m?`<p class="mu">${m}</p>`:""}${body}</div>`;
const inp=(k,l,ph)=>`<label>${l}</label><input data-k="${k}" value="${esc(cfg[k])}" placeholder="${ph||""}">`;
const tex=(k,l,r)=>`<label>${l}</label><textarea data-k="${k}" rows="${r||2}">${esc(cfg[k])}</textarea>`;
const chips=(k,arr)=>`<div class="chips">${arr.map(([v,l])=>`<span data-set="${k}" data-v="${v}" class="${cfg[k]==v?"on":""}">${l}</span>`).join("")}</div>`;
const cards=arr=>`<div class="cards">${arr.map(([k,v,ic,t,d,w])=>`<div class="oc ${w?"wide ":""}${cfg[k]==v?"on":""}" data-set="${k}" data-v="${v}">${ic}<b>${t}</b><small class="mu">${d}</small></div>`).join("")}</div>`;
const upName={};
const gal=k=>{
  const list=STICKERS.filter(Boolean);
  const tiles=list.length?list.map(u=>`<div data-set="${k}" data-v="${esc(u)}" class="${cfg[k]==u?"on":""}"><img src="${esc(u)}" alt=""></div>`).join(""):[1,2,3,4,5,6].map(i=>`<div class="dev">${i}</div>`).join("");
  return `<div class="gal"><div data-set="${k}" data-v="" class="${!cfg[k]?"on":""}">Без</div>${tiles}</div>`+(list.length?"":`<p class="mu" style="margin-top:8px">⚠️ Здесь пока пусто: открой core.js и заполни массив STICKERS своими гифками.</p>`);
};
const upl=(k,acc,multi,label,hint)=>`<div style="margin-top:10px"><label class="btn w up" style="padding:9px 18px;cursor:pointer;display:inline-block">${label}<input type="file" data-up="${k}" accept="${acc}" ${multi?"multiple":""}></label> <small class="mu">${hint}</small><div class="mu" id="st-${k}" style="margin-top:6px">${esc(upName[k]||"")}</div></div>`;

function panel(){
  const k="img"+step; let h="";
  if(step==1){
    h+=sec("🌈 Вайб (живой фон)","У каждого вайба свой анимированный фон: лепестки, пузырьки, звёзды…",`<div class="sw">${VIBES.map((v,i)=>`<i data-set="vibe" data-v="${i}" class="${cfg.vibe==i?"on":""}" style="background:linear-gradient(135deg,${v[0]},${v[1]})">${cfg.vibe==i?"✓":""}</i>`).join("")}</div><p class="mu" style="margin-top:8px">Вайб: ${VIBES[cfg.vibe][2]}</p>`);
    h+=sec("Как откроется приглашение","Маленький сюрприз перед первым экраном. Выбери и попробуй в превью.",cards([["intro","bow","🎀","Развязать ленту","Зажать узел и потянуть вправо"],["intro","heart","💗","Согреть сердечко","Прикоснуться и подержать"],["intro","glass","☁️","Запотевшее стекло","Стереть дымку пальцем"],["intro","note","💌","Вытянуть записку","Потянуть письмо вверх"],["intro","time","⏳","В назначенное время","Откроется в выбранные тобой дату и время",1],["intro","none","","Без вступления","",1]])
      +(cfg.intro!="none"?`<div class="idea" style="margin-top:12px"><b style="font-size:13px">✏️ Текст вступления</b>`+tex("introT","Заголовок вступления")+inp("introH","Подсказка к жесту")+(cfg.intro=="note"?inp("introP","Текст на письме"):"")+(cfg.intro=="time"?`<label>Когда откроется</label><input type="datetime-local" data-k="introAt" value="${esc(cfg.introAt)}">`:"")+`</div>`:""));
    h+=sec("🎵 Музыка на странице","Мягко заиграет, когда гость нажмёт «Да».",`<div class="chips"><span data-set="music" data-v="" class="${!cfg.music?"on":""}">Без музыки</span>${MUSIC.map(([n,u])=>`<span data-set="music" data-v="${esc(u)}" class="${cfg.music==u?"on":""}">🎵 ${esc(n)}</span>`).join("")}</div>`+upl("music","audio/*",false,"🎵 Загрузить свой трек","mp3, m4a, ogg, wav — до 20 МБ"));
    h+=sec("🖼️ Картинка / гифка","",gal(k));
    h+=sec("Вопрос и кнопки","",tex("q","Вопрос (заголовок)")+`<div class="two"><div>${inp("yes","Кнопка «Да»")}</div><div>${inp("no","Кнопка «Нет»")}</div></div>`);
    h+=sec("Анимация «Да»","",chips("anim",[["burst","Взрыв сердец 💥"],["none","Без анимации"]]));
    h+=sec("Кнопка «Нет» ведёт себя как…","",chips("mode",[["run","Убегает 🏃"],["shrink","Уменьшается 🔎"],["hide","Исчезает 💋"]]));
  }
  if(step==2) h+=sec("Экран 2: подтверждение 😍","Дразнящий экран сразу после «Да».",tex("t2","Подзаголовок")+inp("s2","Вторая строка (необязательно)")+inp("b2","Кнопка подтверждения"))+sec("Картинка экрана 2","",gal(k));
  if(step==3){
    h+=sec("Дата и время 📅","Предложи время или оставь выбор получателю.",cards([["pm","free","🤍","Довериться получателю","Он сам выберет дату и время"],["pm","list","📅","Предложить варианты","Несколько вариантов на выбор"]]));
    if(cfg.pm=="list") h+=sec("Твои варианты","По одному в строке: дата|время, например 25.10|19:00",tex("times","",4));
    h+=sec("Тексты","",tex("t3","Заголовок экрана")+(cfg.pm=="free"?inp("b3","Текст кнопки"):""))+sec("Картинка экрана","",gal(k));
  }
  if(step==4){
    h+=sec("Активность 🎯","Чем займёмся? Получатель выберет один вариант, от 1 до 6.",tex("t4","Заголовок экрана")+inp("sub4","Подзаголовок (необязательно)"));
    h+=sec(`Варианты <small class="mu">${cfg.opts.length} из 6</small>`,"",
      `<div class="idea"><b style="font-size:13px">✨ Готовые идеи</b><div class="chips" style="margin-top:8px">${IDEAS.map(x=>`<span data-idea="${esc(x)}">${esc(x)}</span>`).join("")}</div></div>`
      +cfg.opts.map((x,i)=>`<div class="row"><input data-oi="${i}" value="${esc(x)}"><button data-del="${i}">×</button></div>`).join("")
      +(cfg.opts.length<6?`<button class="btn w" data-add="1" style="padding:9px 18px">+ Свой вариант</button>`:""));
    h+=sec("Картинка экрана","",gal(k));
  }
  if(step==5){
    h+=sec("Финальный экран 🎉","Гость увидит его, когда выберет дату, время и занятие.",inp("t5","Заголовок")+tex("d5","Описание",3)+`<p class="mu" style="margin-top:6px">Подставятся выбор гостя: <b>{date}</b> <b>{time}</b> <b>{activity}</b></p>`);
    h+=sec("Картинка финала","",gal(k));
    h+=sec("📷 Фотоальбом «наши моменты»","Несколько фото, которые гость пролистает на финальном экране.",upl("album","image/*",true,"📷 Добавить фото","до 12 фото")+(cfg.album?`<p class="mu">Добавлено фото: ${lines(cfg.album).length} <span data-clr="album" style="text-decoration:underline;cursor:pointer">очистить</span></p>`:""));
    h+=sec("🎤 Голосовое сообщение","Загрузи запись с твоим голосом, она прозвучит на финальном экране.",upl("voice","audio/*",false,"🎤 Загрузить голосовое","до 60 секунд"));
    h+=sec("🎁 Секретное сообщение-сюрприз","Спрятанный конверт: гость откроет его и увидит твои слова.",tex("secret","",3));
  }
  $("#fields").innerHTML=h;
}
let showIntro=false;
function refresh(){
  const s=(step==1&&showIntro&&cfg.intro!="none")?0:step;
  play(cfg,$("#prev-phone"),s,true);
  $("#cap").textContent=s==0?"Попробуйте жест — так откроется приглашение":caps[step-1];
}
const stepsEl=$("#steps");
for(let i=1;i<=5;i++){const b=document.createElement("button");b.textContent=i;b.onclick=()=>go(i);stepsEl.appendChild(b)}
function go(n){
  if(n!=step)showIntro=false;
  step=Math.max(1,Math.min(5,n));
  [...stepsEl.children].forEach((b,i)=>b.classList.toggle("on",i+1==step));
  $("#cap").textContent=caps[step-1];
  $("#tryI").style.display=(step==1&&cfg.intro!="none")?"inline-block":"none";
  $("#next").textContent=step==5?"Создать ссылку 💌":"Далее →";
  $("#out").style.display="none";
  panel(); refresh();
}
const F=$("#fields");
F.addEventListener("input",e=>{
  const t=e.target;
  if(t.dataset.k){cfg[t.dataset.k]=t.value}
  else if(t.dataset.oi!==undefined){cfg.opts[t.dataset.oi]=t.value}
  showIntro=["introT","introH","introP","introAt"].includes(t.dataset.k);
  refresh();
});
F.addEventListener("click",e=>{
  const t=e.target.closest("[data-set],[data-idea],[data-del],[data-add],[data-clr]"); if(!t) return;
  const d=t.dataset;showIntro=d.set=="intro";if(d.clr){cfg[d.clr]="";upName[d.clr]=""}
  if(d.set=="music")upName.music="";
  if(d.set){cfg[d.set]=d.set=="vibe"?+d.v:d.v;if(d.set=="intro"&&INTRO[d.v]){cfg.introT=INTRO[d.v][0];cfg.introH=INTRO[d.v][1]}}
  else if(d.idea){if(cfg.opts.length<6)cfg.opts.push(d.idea)}
  else if(d.del!==undefined){cfg.opts.splice(+d.del,1)}
  else if(d.add){cfg.opts.push("")}
  go(step);
});
F.addEventListener("change",async e=>{
  const t=e.target; if(!t.dataset||!t.dataset.up) return;
  const k=t.dataset.up, files=[...t.files]; if(!files.length) return;
  const st=$("#st-"+k); st.textContent="Загружаю…";
  let bad=false, urls=[];
  for(const f of files){
    if(f.size>(k=="album"?5:20)*1048576){st.textContent="⚠️ Файл «"+f.name+"» слишком большой";return}
    const r=await uploadFile(f); if(!r.ok)bad=true; urls.push(r.url);
  }
  cfg[k]=k=="album"?lines(cfg.album).concat(urls).slice(0,12).join("\n"):urls[0];
  upName[k]=(k=="album"?"Загружено файлов: "+files.length:"✓ "+files[0].name)+(bad?" (⚠️ без сервера: звучит только в превью, в ссылку не попадёт)":"");
  panel(); refresh();
});
$("#tryI").onclick=()=>{showIntro=true;refresh()};
$("#prev").onclick=()=>go(step-1);
$("#next").onclick=()=>{
  if(step<5) return go(step+1);
  const safe=JSON.stringify(cfg,(k,v)=>typeof v=="string"?v.split("\n").filter(x=>!x.startsWith("blob:")).join("\n"):v);
  if(safe!==JSON.stringify(cfg)) alert("Часть загруженных файлов не попадёт в ссылку: сайт запущен без сервера загрузки (см. server.js).");
  const code=btoa(unescape(encodeURIComponent(safe)));
  $("#link").value=new URL("invite.html",location.href).href+"#"+code;
  $("#out").style.display="block";
};
$("#copy").onclick=()=>{$("#link").select();navigator.clipboard.writeText($("#link").value).then(()=>alert("Ссылка скопирована 💗"),()=>{})};
go(1);
