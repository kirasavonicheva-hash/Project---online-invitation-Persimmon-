/* ---------- конструктор по блокам ---------- */
const caps=["Экран 1: приглашение","Экран 2: подтверждение","Экран 3: дата и время","Экран 4: занятие","Финальный экран"];
const sec=(t,m,body)=>`<div class="sec"><h4>${t}</h4>${m?`<p class="mu">${m}</p>`:""}${body}</div>`;
const inp=(k,l,ph)=>`<label>${l}</label><input data-k="${k}" value="${esc(cfg[k])}" placeholder="${ph||""}">`;
const tex=(k,l,r)=>`<label>${l}</label><textarea data-k="${k}" rows="${r||2}">${esc(cfg[k])}</textarea>`;
const chips=(k,arr)=>`<div class="chips">${arr.map(([v,l])=>`<span data-set="${k}" data-v="${v}" class="${cfg[k]==v?"on":""}">${l}</span>`).join("")}</div>`;
const cards=arr=>`<div class="cards">${arr.map(([k,v,ic,t,d,w])=>`<div class="oc ${w?"wide ":""}${cfg[k]==v?"on":""}" data-set="${k}" data-v="${v}">${ic}<b>${t}</b><small class="mu">${d}</small></div>`).join("")}</div>`;
const gal=k=>`<div class="gal"><div data-set="${k}" data-v="" class="${!cfg[k]?"on":""}">Без</div>${STICKERS.map((u,i)=>`<div data-set="${k}" data-v="${esc(u)}" class="${u&&cfg[k]==u?"on":""}">${u?`<img src="${esc(u)}">`:i+1}</div>`).join("")}</div><div style="height:8px"></div>`+inp(k,"Или ссылка на фото / гифку","https://…");

function panel(){
  const k="img"+step; let h="";
  if(step==1){
    h+=sec("🌈 Вайб (живой фон)","У каждого вайба свой цвет фона.",`<div class="sw">${VIBES.map((v,i)=>`<i data-set="vibe" data-v="${i}" class="${cfg.vibe==i?"on":""}" style="background:linear-gradient(135deg,${v[0]},${v[1]})">${cfg.vibe==i?"✓":""}</i>`).join("")}</div><p class="mu" style="margin-top:8px">Вайб: ${VIBES[cfg.vibe][2]}</p>`);
    h+=sec("Как откроется приглашение","Маленький сюрприз перед первым экраном.",cards([["intro","bow","🎀","Развязать ленту","Нажать на бантик"],["intro","heart","💗","Согреть сердечко","Прикоснуться и подержать"],["intro","none","✨","Без вступления","Сразу к вопросу",1]])
      +(cfg.intro!="none"?tex("introT","Заголовок вступления")+inp("introH","Подсказка к жесту"):""));
    h+=sec("🎵 Музыка на странице","Мягко заиграет, когда гость нажмёт «Да».",inp("music","Ссылка на mp3 / ogg / wav","https://…/song.mp3"));
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
    h+=sec("📷 Фотоальбом «наши моменты»","Ссылки на фото, по одной в строке. Гость увидит их лентой.",tex("album","",3));
    h+=sec("🎤 Голосовое сообщение","Ссылка на аудиофайл с твоим голосом.",inp("voice","","https://…/voice.mp3"));
    h+=sec("🎁 Секретное сообщение-сюрприз","Спрятанный конверт: гость откроет его и увидит твои слова.",tex("secret","",3));
  }
  $("#fields").innerHTML=h;
}
function refresh(){ play(cfg,$("#prev-phone"),step,true) }
const stepsEl=$("#steps");
for(let i=1;i<=5;i++){const b=document.createElement("button");b.textContent=i;b.onclick=()=>go(i);stepsEl.appendChild(b)}
function go(n){
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
  refresh();
});
F.addEventListener("click",e=>{
  const t=e.target.closest("[data-set],[data-idea],[data-del],[data-add]"); if(!t) return;
  const d=t.dataset;
  if(d.set){cfg[d.set]=d.set=="vibe"?+d.v:d.v}
  else if(d.idea){if(cfg.opts.length<6)cfg.opts.push(d.idea)}
  else if(d.del!==undefined){cfg.opts.splice(+d.del,1)}
  else if(d.add){cfg.opts.push("")}
  go(step);
});
$("#tryI").onclick=()=>play(cfg,$("#prev-phone"),0,true);
$("#prev").onclick=()=>go(step-1);
$("#next").onclick=()=>{
  if(step<5) return go(step+1);
  const code=btoa(unescape(encodeURIComponent(JSON.stringify(cfg))));
  $("#link").value=new URL("invite.html",location.href).href+"#"+code;
  $("#out").style.display="block";
};
$("#copy").onclick=()=>{$("#link").select();navigator.clipboard.writeText($("#link").value).then(()=>alert("Ссылка скопирована 💗"),()=>{})};
go(1);
