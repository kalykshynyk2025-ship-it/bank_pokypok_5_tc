const STORAGE_KEY = 'bank_pokupok_product_v3';
const TIME_LIMIT = 5 * 60 * 60 * 1000;

const translations = {
  ru: {
    subtitle: 'Банк покупок • Event Product',
    nav: ['Welcome', 'Игра', 'Продукт', 'Figma/Бизнес'],
    legend: 'Ты проходишь путь народного опыта',
    startShop: 'Магазин', startQuest: 'Квест',
    save: 'Сохранить', name: 'Имя', phone: 'Телефон',
    crmTitle: 'CRM-лид', shop: 'Премиум витрина', add: 'Добавить', cart: 'Корзина',
    checkout: 'Оформить', pay: 'Оплата (демо)',
    quest: 'Иммерсивный квест', stage: 'Этап', find: 'Найди точку', scan: 'Сканировать QR', stop: 'Остановить',
    qrNeeded: 'Сначала подтвердите локацию QR-кодом.', submit: 'Подтвердить', answer: 'Введите ответ',
    timer: 'Время', reward: 'Награда', thanks: 'Спасибо за участие', issue: 'Выдать приз на кассе',
    issued: 'Приз выдан', certificate: 'Сертификат',
    productStruct: 'Реальная продуктовая структура',
    monetization: 'Монетизация', scenario: 'Сценарий запуска в ТЦ', designSystem: 'Design system',
    qrFail: 'QR не подходит текущему этапу', cameraFail: 'Камера недоступна',
    done: 'Готово'
  },
  en: {
    subtitle: 'Bank of Purchases • Event Product',
    nav: ['Welcome', 'Game', 'Product', 'Figma/Business'],
    legend: 'You are walking the path of folk experience',
    startShop: 'Shop', startQuest: 'Quest',
    save: 'Save', name: 'Name', phone: 'Phone', crmTitle: 'CRM lead', shop: 'Premium showcase',
    add: 'Add', cart: 'Cart', checkout: 'Checkout', pay: 'Payment (demo)',
    quest: 'Immersive quest', stage: 'Stage', find: 'Find point', scan: 'Scan QR', stop: 'Stop',
    qrNeeded: 'Scan QR to unlock this stage.', submit: 'Submit', answer: 'Type answer', timer: 'Time',
    reward: 'Reward', thanks: 'Thanks for participating', issue: 'Issue prize at cashier', issued: 'Prize issued', certificate: 'Certificate',
    productStruct: 'Real product structure', monetization: 'Monetization', scenario: 'Mall launch scenario', designSystem: 'Design system',
    qrFail: 'Wrong QR for this stage', cameraFail: 'Camera unavailable', done: 'Done'
  },
  mari: {
    subtitle: 'Банк покупок • Event Product',
    nav: ['Welcome', 'Уен', 'Продукт', 'Figma/Бизнес'],
    legend: 'Тый калык опыт корным эртет',
    startShop: 'Кевыт', startQuest: 'Квест', save: 'Аралаш', name: 'Лӱм', phone: 'Телефон',
    crmTitle: 'CRM лид', shop: 'Премиум витрина', add: 'Умдаш', cart: 'Корзина', checkout: 'Шындаш', pay: 'Тӱлыме (демо)',
    quest: 'Квест', stage: 'Этап', find: 'Точкым муаш', scan: 'QR скан', stop: 'Чарен', qrNeeded: 'Ончыч QR сканле.',
    submit: 'Шындаш', answer: 'Вашмут', timer: 'Жап', reward: 'Сайлык', thanks: 'Тау', issue: 'Кассыште пуаш', issued: 'Пуымо', certificate: 'Сертификат',
    productStruct: 'Продукт структура', monetization: 'Монетизаций', scenario: 'ТЦ сценарий', designSystem: 'Дизайн система',
    qrFail: 'QR ок келше', cameraFail: 'Камера уке', done: 'Пытым'
  }
};

const products = [
  { id: 'bag', emoji: '🎒', price: 2900, ru: 'Сумка', en: 'Bag', mari: 'Сумка' },
  { id: 'toy', emoji: '🧸', price: 1800, ru: 'Игрушка', en: 'Toy', mari: 'Уенчык' },
  { id: 'ring', emoji: '💍', price: 3500, ru: 'Украшение', en: 'Jewelry', mari: 'Украшений' },
  { id: 'card', emoji: '💌', price: 450, ru: 'Открытка', en: 'Postcard', mari: 'Открытка' }
];

const stages = [
  { p: 'Вход А: орнамент солнца', qr: 'MALL-STAGE-1', type: 'choice', q: { ru: 'Солнце символизирует…', en: 'Sun symbolizes…', mari: 'Кече символ…' }, o: [['life', 'Жизнь', 'Life', 'Илыме'], ['sale', 'Скидку', 'Sale', 'Скидка']], c: 'life' },
  { p: 'Фудкорт: этно-стенд', qr: 'MALL-STAGE-2', type: 'text', q: { ru: 'Введите: шувыр', en: 'Type: shuvyr', mari: 'Возо: шувыр' }, a: ['шувыр', 'shuvyr'] },
  { p: 'Лестница B: символ коня', qr: 'MALL-STAGE-3', type: 'photo', q: { ru: 'Сделайте фото символа коня', en: 'Take horse symbol photo', mari: 'Имне символ фото' } },
  { p: '2 этаж: символ утки', qr: 'MALL-STAGE-4', type: 'choice', q: { ru: 'Символ воды?', en: 'Water symbol?', mari: 'Вӱд символ?' }, o: [['duck', 'Утка', 'Duck', 'Лудо'], ['sun', 'Солнце', 'Sun', 'Кече']], c: 'duck' },
  { p: 'Маркет-остров', qr: 'MALL-STAGE-5', type: 'text', q: { ru: 'Введите: калык', en: 'Type: kalyk', mari: 'Возо: калык' }, a: ['калык', 'kalyk'] },
  { p: 'Лавка подарков', qr: 'MALL-STAGE-6', type: 'choice', q: { ru: 'Что дарят чаще?', en: 'What is gifted more often?', mari: 'Мом чӱчкыдын пуаҥ?' }, o: [['postcard', 'Открытка', 'Postcard', 'Открытка'], ['stone', 'Камень', 'Stone', 'Кӱ']], c: 'postcard' },
  { p: 'Фото-зона', qr: 'MALL-STAGE-7', type: 'photo', q: { ru: 'Сделайте селфи у рамки', en: 'Take frame selfie', mari: 'Рамка пелен селфи' } },
  { p: 'Мастерская', qr: 'MALL-STAGE-8', type: 'text', q: { ru: 'Введите: мари', en: 'Type: mari', mari: 'Возо: мари' }, a: ['мари', 'mari'] },
  { p: 'Инфостойка', qr: 'MALL-STAGE-9', type: 'choice', q: { ru: 'Сколько этапов?', en: 'How many stages?', mari: 'Мыняр этап?' }, o: [['10', '10', '10', '10'], ['8', '8', '8', '8']], c: '10' },
  { p: 'Финальный стенд', qr: 'MALL-STAGE-10', type: 'text', q: { ru: 'Введите: шынык', en: 'Type: shynyk', mari: 'Возо: шынык' }, a: ['шынык', 'shynyk'] }
];

const facts = [
  'Марийская вышивка часто включает символы солнца, плодородия и воды.',
  'Геймификация в ТЦ повышает среднее время нахождения посетителя.',
  'Персонализация маршрута усиливает вовлечение и завершение квеста.'
];

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || {
  lang: 'ru',
  page: 'welcome',
  flow: 'home',
  crm: { name: '', phone: '' },
  cart: [],
  questStage: 0,
  unlocked: {},
  photos: {},
  reward: null,
  startedAt: null,
  prizeIssued: false,
  sound: true
};

const app = document.getElementById('app');
const lang = document.getElementById('lang');
let scanner = null;

const tt = (k) => translations[state.lang][k] || k;
const pname = (p) => p[state.lang] || p.ru;
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

function renderNav() {
  const labels = tt('nav');
  const keys = ['welcome', 'game', 'product', 'strategy'];
  document.getElementById('mainNav').innerHTML = keys.map((k, i) => `<button class="nav-btn ${state.page===k?'active':''}" data-nav="${k}">${labels[i]}</button>`).join('');
  document.querySelectorAll('[data-nav]').forEach((b)=>b.onclick=()=>{state.page=b.dataset.nav;save();render();});
}

function render() {
  document.getElementById('sub').textContent = tt('subtitle');
  lang.innerHTML = '<option value="ru">RU</option><option value="en">EN</option><option value="mari">MARI</option>';
  lang.value = state.lang;
  renderNav();
  if (state.page === 'welcome') return renderWelcome();
  if (state.page === 'game') return renderGame();
  if (state.page === 'product') return renderProduct();
  return renderStrategy();
}

function renderWelcome() {
  app.innerHTML = `<section class="section hero glass trap theme-hero"><span class="chip">Splash / Welcome</span><h2>${tt('legend')}</h2><p>${facts[0]}</p><div class="inline"><button class="btn primary" id="shopBtn">${tt('startShop')}</button><button class="btn secondary" id="questBtn">${tt('startQuest')}</button></div></section>`;
  document.getElementById('shopBtn').onclick = ()=>{state.page='game';state.flow='shop';save();render();};
  document.getElementById('questBtn').onclick = ()=>{state.page='game';state.flow='quest';if(!state.startedAt)state.startedAt=Date.now();save();render();};
}

function renderGame() {
  if (state.flow === 'shop') return renderShop();
  if (state.flow === 'reward') return renderReward();
  if (state.flow === 'thanks') return renderThanks();
  return renderQuest();
}

function renderShop() {
  const cards = products.map(p=>`<article class="product"><div class="thumb">${p.emoji}</div><div><strong>${pname(p)}</strong><br><small>${p.price} ₽</small></div><button class="btn secondary" data-add="${p.id}">${tt('add')}</button></article>`).join('');
  const total = state.cart.reduce((s,id)=>s+products.find(p=>p.id===id).price,0);
  app.innerHTML = `<section class="section glass trap theme-shop"><h2>${tt('shop')}</h2><article class="card"><h3>${tt('crmTitle')}</h3><div class="grid"><label>${tt('name')}<input id="nm" value="${state.crm.name}"></label><label>${tt('phone')}<input id="ph" value="${state.crm.phone}"></label></div><button class="btn secondary" id="saveCrm">${tt('save')}</button></article><div class="grid products">${cards}</div><article class="card">${tt('cart')}: ${state.cart.length} / ${total} ₽</article><div class="inline"><button class="btn primary" id="checkout">${tt('checkout')}</button><button class="btn secondary" id="pay">${tt('pay')}</button><button class="btn ghost" id="toQuest">${tt('startQuest')}</button></div></section>`;
  app.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{state.cart.push(b.dataset.add);save();renderShop();});
  document.getElementById('saveCrm').onclick=()=>{state.crm.name=document.getElementById('nm').value.trim();state.crm.phone=document.getElementById('ph').value.trim();save();openModal('CRM',tt('done'));};
  document.getElementById('checkout').onclick=()=>openModal('Order',`${tt('done')} · CRM: ${state.crm.name||'-'}`);
  document.getElementById('pay').onclick=()=>openModal('Payment','API hook: Stripe/YooKassa');
  document.getElementById('toQuest').onclick=()=>{state.flow='quest';if(!state.startedAt)state.startedAt=Date.now();save();render();};
}

function renderQuest() {
  const s = stages[state.questStage];
  if (!s) { state.flow = 'reward'; save(); return render(); }
  const left = Math.max(0, TIME_LIMIT - (Date.now() - (state.startedAt || Date.now())));
  const progress = Math.round((state.questStage / stages.length) * 100);
  const fact = facts[state.questStage % facts.length];

  app.innerHTML = `<section class="section glass trap theme-quest"><h2>${tt('quest')}</h2><div class="progress"><span style="width:${progress}%"></span></div><span class="chip">${tt('stage')} ${state.questStage+1}/10 · ${tt('timer')}: ${format(left)}</span><article class="quote">«${tt('legend')}»</article><article class="fact">${fact}</article><article class="map-point"><strong>${tt('find')}:</strong> ${s.p}</article><button class="btn primary" id="scan">${tt('scan')}</button><div id="task"></div></section>`;
  renderTask(s);
  document.getElementById('scan').onclick=()=>startScan(s.qr);
  setTimeout(()=>{ if(state.page==='game'&&state.flow==='quest') renderQuest(); },1000);
}

function renderTask(s) {
  const box = document.getElementById('task');
  if (!state.unlocked[state.questStage]) { box.innerHTML = `<article class="card">${tt('qrNeeded')}</article>`; return; }

  if (s.type === 'choice') {
    const opts = s.o.map(o=>`<button class="btn secondary" data-op="${o[0]}">${state.lang==='ru'?o[1]:state.lang==='en'?o[2]:o[3]}</button>`).join('');
    box.innerHTML = `<article class="card"><p>${s.q[state.lang]}</p><div class="inline">${opts}</div></article>`;
    box.querySelectorAll('[data-op]').forEach(b=>b.onclick=()=>b.dataset.op===s.c?next():openModal('✖','Try again'));
  }
  if (s.type === 'text') {
    box.innerHTML = `<article class="card"><p>${s.q[state.lang]}</p><input id="ans" placeholder="${tt('answer')}"><button class="btn primary" id="send">${tt('submit')}</button></article>`;
    document.getElementById('send').onclick=()=>{const v=document.getElementById('ans').value.trim().toLowerCase();s.a.includes(v)?next():openModal('✖','Incorrect');};
  }
  if (s.type === 'photo') {
    const prev = state.photos[state.questStage] ? `<img class="photo-preview" src="${state.photos[state.questStage]}"/>` : '';
    box.innerHTML = `<article class="card theme-qr"><p>${s.q[state.lang]}</p><input id="phimg" type="file" accept="image/*">${prev}<button class="btn primary" id="okp">${tt('submit')}</button></article>`;
    document.getElementById('phimg').onchange=e=>{const file=e.target.files[0];if(!file)return;const fr=new FileReader();fr.onload=()=>{state.photos[state.questStage]=fr.result;save();renderTask(s);};fr.readAsDataURL(file);};
    document.getElementById('okp').onclick=()=>state.photos[state.questStage]?next():openModal('Photo','Upload required');
  }
}

function next() { state.questStage += 1; save(); if (state.questStage >= stages.length) state.flow = 'reward'; render(); }

function renderReward() {
  const cards = products.map(p=>`<button class="reward-card btn secondary" data-r="${p.id}">${p.emoji} ${pname(p)}</button>`).join('');
  const r = products.find(p=>p.id===state.reward);
  app.innerHTML = `<section class="section glass trap theme-final"><h2>${tt('reward')}</h2><div class="inline">${cards}</div>${r?`<article class="card"><h3>${tt('certificate')}</h3><p>${r.emoji} ${pname(r)} — ${tt('done')}</p></article>`:''}<button id="toThanks" class="btn primary">${tt('thanks')}</button></section>`;
  app.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{state.reward=b.dataset.r;save();confetti();renderReward();});
  document.getElementById('toThanks').onclick=()=>{state.flow='thanks';save();render();};
}

function renderThanks() {
  const id = `KS-${String(Date.now()).slice(-6)}-${state.questStage}`;
  app.innerHTML = `<section class="section glass trap"><h2>${tt('thanks')}</h2><article class="card"><p>${tt('name')}: ${state.crm.name||'-'}</p><p>${tt('phone')}: ${state.crm.phone||'-'}</p><p>ID: ${id}</p></article><button class="btn primary" id="issue">${tt('issue')}</button>${state.prizeIssued?`<span class="chip">${tt('issued')}</span>`:''}</section>`;
  document.getElementById('issue').onclick=()=>{state.prizeIssued=true;save();openModal('Cashier',tt('issued'));renderThanks();};
}

function renderProduct() {
  app.innerHTML = `<section class="section glass trap"><h2>${tt('productStruct')}</h2><article class="card"><pre>0 Splash → 1 Home → 2 Action → 3 Shop (catalog/card/cart/checkout) → 4 Quest (intro + 10 stages + progress) → 5 Reward → 6 Certificate → 7 Thanks/CRM</pre></article><h3>${tt('designSystem')}</h3><div class="kit-grid"><article class="card">Button (Primary/Secondary)</article><article class="card">Card (Product/Quest)</article><article class="card">Progress/Modal/Input</article><article class="card">Language Switcher</article><article class="card">QR Frame / Upload block</article><article class="card">Glass + Trapezoid geometry</article></div><h3>Design references by category</h3><div class="kit-grid"><article class="card theme-hero">Главный экран (Hero + бренд)</article><article class="card theme-shop">Магазин (премиум витрина)</article><article class="card theme-quest">Квест (иммерсивный UX)</article><article class="card theme-qr">QR + Фото (реальный квест)</article><article class="card theme-final">Финал (вау-эффект)</article><article class="card">Фон: layered gradients + ornaments</article></div></section>`;
}

function renderStrategy() {
  app.innerHTML = `<section class="section glass trap"><h2>${tt('monetization')}</h2><article class="card"><strong>B2B:</strong> 50k–300k ₽ за запуск (брендирование, квест, аналитика).</article><article class="card"><strong>Аренда в ТЦ:</strong> KPI = время в ТЦ и посещение магазинов.</article><article class="card"><strong>Партнерские точки:</strong> 5k–20k ₽ за включение магазина в маршрут.</article><article class="card"><strong>Товарная модель:</strong> награда/скидка → продажа.</article><article class="card"><strong>CRM lead:</strong> имя, телефон, поведенческие события.</article><h2>${tt('scenario')}</h2><article class="story">1) Баннер у входа + стартовый QR. 2) Пользователь запускает SPA. 3) Идет по точкам ТЦ. 4) Подтверждает QR/фото. 5) Магазины получают трафик. 6) Финал и выдача приза на кассе.</article><article class="quote">Психология: поиск → движение → вовлечение → награда.</article><article class="map-point">WOW-фичи: легенда, звуковое сопровождение, карта ТЦ, персонализация маршрута.</article></section>`;
}

async function startScan(expected) {
  document.getElementById('qrOverlay').classList.remove('hidden');
  document.getElementById('qrHeader').textContent = `${tt('stage')} ${state.questStage + 1}`;
  document.getElementById('stopQr').textContent = tt('stop');
  try {
    scanner = new Html5Qrcode('reader');
    await scanner.start({ facingMode: 'environment' }, { fps: 10, qrbox: 220 }, (text) => {
      if (text.trim() === expected) {
        state.unlocked[state.questStage] = true;
        save();
        stopScan();
        renderTask(stages[state.questStage]);
      } else openModal('QR', tt('qrFail'));
    });
  } catch {
    openModal('QR', tt('cameraFail'));
    stopScan();
  }
}

function stopScan() {
  document.getElementById('qrOverlay').classList.add('hidden');
  if (scanner) scanner.stop().then(()=>scanner.clear()).catch(()=>{});
  scanner = null;
  document.getElementById('reader').innerHTML = '';
}

function confetti() {
  const c = document.getElementById('confetti');
  const ctx = c.getContext('2d');
  c.width = innerWidth; c.height = innerHeight;
  const p = Array.from({length:120},()=>({x:Math.random()*c.width,y:-20,vx:Math.random()*2-1,vy:Math.random()*3+2,r:Math.random()*5+3,col:['#c97b63','#7fb6a8','#ffd9c8','#fff'][Math.floor(Math.random()*4)]}));
  let f=0; (function draw(){ctx.clearRect(0,0,c.width,c.height);p.forEach(i=>{i.x+=i.vx;i.y+=i.vy;ctx.fillStyle=i.col;ctx.fillRect(i.x,i.y,i.r,i.r)});if(f++<160)requestAnimationFrame(draw)})();
}

const format = (ms) => {
  const s = Math.floor(ms / 1000), h = String(Math.floor(s / 3600)).padStart(2, '0'), m = String(Math.floor((s % 3600) / 60)).padStart(2, '0'), sec = String(s % 60).padStart(2, '0');
  return `${h}:${m}:${sec}`;
};

function openModal(title, text) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').textContent = text;
  document.getElementById('modal').classList.remove('hidden');
}

document.getElementById('modalClose').onclick = () => document.getElementById('modal').classList.add('hidden');
document.getElementById('stopQr').onclick = stopScan;
lang.onchange = () => { state.lang = lang.value; save(); render(); };
document.getElementById('sound').onclick = () => { state.sound = !state.sound; document.getElementById('sound').textContent = state.sound ? '🔊' : '🔇'; save(); };
document.getElementById('sound').textContent = state.sound ? '🔊' : '🔇';

render();
