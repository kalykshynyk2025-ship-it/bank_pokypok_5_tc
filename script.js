// SPA "Банк покупок". Все состояния храним в localStorage.
const STORAGE_KEY = 'kalykShynykState_v1';
const FIVE_HOURS_MS = 5 * 60 * 60 * 1000;

const translations = {
  ru: {
    subtitle: 'Банк покупок',
    buy: 'Купить', quest: 'Пройти квест',
    mockupTitle: 'Макет интерфейса',
    mockupText: 'Экран 1: Логотип и выбор сценария. Экран 2: Магазин с карточками и корзиной. Экран 3: Квест из 10 этапов: поиск точки, QR, ответы, фото. Экран 4: Награда и сертификат.',
    homeHint: 'Этно-квест в торговом центре: культура марийцев + современные покупки.',
    shop: 'Магазин', cart: 'Корзина', order: 'Оформить', name: 'Имя', phone: 'Телефон',
    scanQr: 'Сканировать QR', stopQr: 'Остановить сканер',
    checkoutOk: 'Заказ принят! Мы свяжемся с вами.',
    questTitle: 'Квест «Банк покупок»',
    questStart: 'Начать/продолжить',
    stage: 'Этап', findPoint: 'Найди точку',
    qrInstruction: 'Найди стенд в ТЦ и отсканируй QR для продолжения.',
    answerPlaceholder: 'Введите ответ', submit: 'Подтвердить',
    uploadPhoto: 'Загрузите фото',
    timerLeft: 'Осталось времени',
    finished: 'Квест завершён! Выберите награду',
    obtained: 'Получено', certificate: 'Сертификат участника',
    qrFail: 'Неверный QR для этого этапа',
    noCamera: 'Камера недоступна. Проверьте разрешения.',
    reward: 'Награда',
    payDemo: 'Оплатить (демо)',
  },
  en: {
    subtitle: 'Bank of Purchases',
    buy: 'Buy', quest: 'Start Quest',
    mockupTitle: 'Interface mockup',
    mockupText: 'Screen 1: Logo + mode selection. Screen 2: Shop with products and cart. Screen 3: 10-stage quest: location, QR, answers, photo. Screen 4: Reward and certificate.',
    homeHint: 'Mall offline quest: Mari culture + modern UX.',
    shop: 'Shop', cart: 'Cart', order: 'Checkout', name: 'Name', phone: 'Phone',
    scanQr: 'Scan QR', stopQr: 'Stop scanner',
    checkoutOk: 'Order confirmed! We will contact you.',
    questTitle: 'Quest “Bank of Purchases”',
    questStart: 'Start/Continue',
    stage: 'Stage', findPoint: 'Find point',
    qrInstruction: 'Find the ornament stand in the mall and scan a QR code.',
    answerPlaceholder: 'Type answer', submit: 'Submit',
    uploadPhoto: 'Upload photo',
    timerLeft: 'Time left',
    finished: 'Quest completed! Choose your reward',
    obtained: 'Obtained', certificate: 'Participant certificate',
    qrFail: 'Wrong QR for this stage',
    noCamera: 'Camera unavailable. Check permissions.',
    reward: 'Reward',
    payDemo: 'Pay (demo)',
  },
  mari: {
    subtitle: 'Нал покупки банк',
    buy: 'Налаш', quest: 'Квестым эрташ',
    mockupTitle: 'Интерфейс макет',
    mockupText: '1 экран: логотип да ойлымаш. 2 экран: туар кумыл. 3 экран: 10 этап, QR, вашмут, фото. 4 экран: сайлык да сертификат.',
    homeHint: 'Марий культур квест, ТЦ дене.',
    shop: 'Кевыт', cart: 'Корзина', order: 'Заказ', name: 'Лӱм', phone: 'Телефон',
    scanQr: 'QR скан', stopQr: 'Сканым чарен',
    checkoutOk: 'Заказ ужын! Тый денет кылдалташ.',
    questTitle: 'Квест «Банк покупок»',
    questStart: 'Тӱҥалаш/шуйын колташ',
    stage: 'Этап', findPoint: 'Точкым муаш',
    qrInstruction: 'ТЦ-ште орнамент стендым му да QR сканле.',
    answerPlaceholder: 'Вашмутым возо', submit: 'Ыштен ончыкте',
    uploadPhoto: 'Фотом колтымо',
    timerLeft: 'Жап кодеш',
    finished: 'Квест пытым! Сайлыкым ойло',
    obtained: 'Налын', certificate: 'Участник сертификат',
    qrFail: 'Тиде этаплан QR йӧн огыл',
    noCamera: 'Камера уке.',
    reward: 'Сайлык',
    payDemo: 'Тӱлыме (демо)',
  }
};

const products = [
  { id: 'bag', emoji: '🎒', price: 1900, name: { ru: 'Сумка', en: 'Bag', mari: 'Сумка' } },
  { id: 'toy', emoji: '🧸', price: 1200, name: { ru: 'Игрушка', en: 'Toy', mari: 'Уенчык' } },
  { id: 'ring', emoji: '💍', price: 2300, name: { ru: 'Украшение', en: 'Jewelry', mari: 'Украшений' } },
  { id: 'card', emoji: '💌', price: 300, name: { ru: 'Открытка', en: 'Postcard', mari: 'Открытка' } }
];

const questStages = [
  { point: 'Фудкорт: стенд с солнцем', qr: 'KALYK-STAGE-1', type: 'choice', q: {ru:'Что символизирует солнце в марийском орнаменте?', en:'What does the sun symbolize in Mari ornament?', mari:'Кече символ мом ончыкта?'}, options:[['life','Жизнь','Life','Илыме'],['water','Вода','Water','Вӱд']], correct: 'life' },
  { point: 'Книжный остров: полка этно', qr: 'KALYK-STAGE-2', type: 'text', q: {ru:'Назовите традиционный марийский музыкальный инструмент.', en:'Name a traditional Mari musical instrument.', mari:'Традиций марий инструмент?'} , answer:['шувыр','shuvyr'] },
  { point: 'Зона ремёсел: конь-орнамент', qr: 'KALYK-STAGE-3', type: 'photo', q: {ru:'Сделайте фото орнамента «конь».', en:'Take a photo of horse ornament.', mari:'«Имне» орнамент фото.'}},
  { point: 'Этаж 2: утиный символ', qr: 'KALYK-STAGE-4', type: 'choice', q:{ru:'Какой символ связан с водой?', en:'Which symbol is linked with water?', mari:'Кӧ символ вӱд дене?'}, options:[['duck','Утка','Duck','Лудо'],['sun','Солнце','Sun','Кече']], correct:'duck' },
  { point: 'Зона отдыха: этно-панно', qr: 'KALYK-STAGE-5', type: 'text', q:{ru:'Введите слово «Калык».', en:'Enter the word “Kalyk”.', mari:'«Калык» мутым возо.'}, answer:['калык','kalyk'] },
  { point: 'Маркет-холл: стойка подарков', qr: 'KALYK-STAGE-6', type: 'choice', q:{ru:'Что чаще дарят на этно-фестивале?', en:'What is often gifted at ethno festivals?', mari:'Этно фестивальыште мом пуат?'}, options:[['postcard','Открытка','Postcard','Открытка'],['stone','Камень','Stone','Кӱ'] ], correct:'postcard' },
  { point: 'Фото-зона: рамка с орнаментом', qr: 'KALYK-STAGE-7', type: 'photo', q:{ru:'Сделайте селфи у этно-рамки.', en:'Take selfie near ethno frame.', mari:'Этно рамка пелен селфи.'}},
  { point: 'Лавка мастера: украшения', qr: 'KALYK-STAGE-8', type: 'text', q:{ru:'Введите «мари».', en:'Type “mari”.', mari:'«mari» возо.'}, answer:['мари','mari'] },
  { point: 'Инфостойка: карта квеста', qr: 'KALYK-STAGE-9', type: 'choice', q:{ru:'Сколько этапов в квесте?', en:'How many quest stages?', mari:'Квестыште кумыл этап?'}, options:[['10','10','10','10'],['8','8','8','8']], correct:'10' },
  { point: 'Финальный стенд: Калык шынык', qr: 'KALYK-STAGE-10', type: 'text', q:{ru:'Введите кодовое слово «шынык».', en:'Enter code word “shynyk”.', mari:'«шынык» код мут.'}, answer:['шынык','shynyk'] }
];

let state = loadState();
let qrScanner = null;
let timerTick = null;

const app = document.getElementById('app');
const langSelect = document.getElementById('languageSelect');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

function t(key) { return translations[state.lang][key] || key; }

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  return {
    lang: 'ru',
    screen: 'home',
    cart: [],
    questStage: 0,
    questStartedAt: null,
    reward: null,
    answers: {},
    photos: {},
    soundOn: true
  };
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function playTone(freq = 520, dur = 90) {
  if (!state.soundOn) return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = freq;
  osc.type = 'sine';
  osc.connect(gain); gain.connect(ctx.destination);
  gain.gain.value = 0.03;
  osc.start();
  setTimeout(() => { osc.stop(); ctx.close(); }, dur);
}

function render() {
  document.getElementById('brandSubtitle').textContent = t('subtitle');
  document.documentElement.lang = state.lang;
  langSelect.value = state.lang;

  if (state.screen === 'home') renderHome();
  if (state.screen === 'shop') renderShop();
  if (state.screen === 'quest') renderQuest();
  if (state.screen === 'reward') renderReward();
}

function renderHome() {
  app.innerHTML = `
    <section class="screen card">
      <div class="badge">${t('mockupTitle')}</div>
      <p>${t('mockupText')}</p>
      <p>${t('homeHint')}</p>
      <button class="primary-btn" id="goShop">🛒 ${t('buy')}</button>
      <button class="secondary-btn" id="goQuest">🎮 ${t('quest')}</button>
    </section>`;
  document.getElementById('goShop').onclick = () => setScreen('shop');
  document.getElementById('goQuest').onclick = () => setScreen('quest');
}

function renderShop() {
  const items = products.map(p => {
    const count = state.cart.filter(x => x === p.id).length;
    return `<article class="product">
      <div class="product-image">${p.emoji}</div>
      <div><strong>${p.name[state.lang]}</strong><br><small>${p.price} ₽</small></div>
      <button class="secondary-btn" data-add="${p.id}">+ (${count})</button>
    </article>`;
  }).join('');

  const total = state.cart.reduce((sum, id) => sum + products.find(p => p.id === id).price, 0);

  app.innerHTML = `
  <section class="screen card">
    <h2>${t('shop')}</h2>
    <div class="grid-products">${items}</div>
    <h3>${t('cart')}: ${state.cart.length} / ${total} ₽</h3>
    <div class="row"><label>${t('name')}</label><input id="orderName"/></div>
    <div class="row"><label>${t('phone')}</label><input id="orderPhone"/></div>
    <div class="inline">
      <button class="primary-btn" id="checkout">${t('order')}</button>
      <button class="ghost-btn" id="payDemo">${t('payDemo')}</button>
      <button class="ghost-btn" id="back">←</button>
    </div>
  </section>`;

  app.querySelectorAll('[data-add]').forEach(btn => {
    btn.onclick = () => { state.cart.push(btn.dataset.add); saveState(); playTone(); renderShop(); };
  });
  document.getElementById('checkout').onclick = () => openModal(t('shop'), t('checkoutOk'));
  document.getElementById('payDemo').onclick = () => openModal('Payment API', 'Демо: подключите Stripe/YooKassa через frontend SDK.');
  document.getElementById('back').onclick = () => setScreen('home');
}

function renderQuest() {
  if (!state.questStartedAt) state.questStartedAt = Date.now();
  const stage = questStages[state.questStage];
  if (!stage) return setScreen('reward');

  const pct = Math.round((state.questStage / questStages.length) * 100);
  const left = Math.max(0, FIVE_HOURS_MS - (Date.now() - state.questStartedAt));
  if (left === 0) openModal('Time', 'Лимит 5 часов исчерпан. Можно начать заново.');

  app.innerHTML = `
    <section class="screen card">
      <h2>${t('questTitle')}</h2>
      <div class="progress-wrap">
        <div>${t('stage')} ${state.questStage + 1}/10</div>
        <div class="progress"><span style="width:${pct}%"></span></div>
        <div class="badge">${t('timerLeft')}: ${formatDuration(left)}</div>
      </div>
      <h3>${t('findPoint')}: ${stage.point}</h3>
      <p>${t('qrInstruction')}</p>
      <button class="primary-btn" id="scanBtn">${t('scanQr')}</button>
      <div id="taskArea"></div>
      <button class="ghost-btn" id="home">←</button>
    </section>`;

  document.getElementById('scanBtn').onclick = () => startQrScan(stage.qr);
  document.getElementById('home').onclick = () => setScreen('home');
  renderStageTask(stage);

  clearInterval(timerTick);
  timerTick = setInterval(() => {
    if (state.screen === 'quest') renderQuest();
  }, 1000);
}

function renderStageTask(stage) {
  const task = document.getElementById('taskArea');
  const q = stage.q[state.lang] || stage.q.ru;

  if (!state.answers[`qr_${state.questStage}`]) {
    task.innerHTML = '<p class="badge">QR required</p>';
    return;
  }

  if (stage.type === 'choice') {
    const opts = stage.options.map(o => {
      const label = state.lang === 'ru' ? o[1] : state.lang === 'en' ? o[2] : o[3];
      return `<button class="secondary-btn" data-opt="${o[0]}">${label}</button>`;
    }).join('');
    task.innerHTML = `<p>${q}</p><div class="answer-grid">${opts}</div>`;
    task.querySelectorAll('[data-opt]').forEach(btn => {
      btn.onclick = () => {
        if (btn.dataset.opt === stage.correct) advanceStage();
        else openModal('✖', 'Попробуйте другой вариант.');
      };
    });
  }

  if (stage.type === 'text') {
    task.innerHTML = `<p>${q}</p><input id="textAnswer" placeholder="${t('answerPlaceholder')}"/><button class="primary-btn" id="sendText">${t('submit')}</button>`;
    document.getElementById('sendText').onclick = () => {
      const val = document.getElementById('textAnswer').value.trim().toLowerCase();
      if (stage.answer.includes(val)) advanceStage();
      else openModal('✖', 'Ответ не совпал.');
    };
  }

  if (stage.type === 'photo') {
    const prev = state.photos[state.questStage] ? `<img class="photo-preview" src="${state.photos[state.questStage]}"/>` : '';
    task.innerHTML = `<p>${q}</p><input type="file" accept="image/*" id="photoInput"/><div>${prev}</div><button class="primary-btn" id="confirmPhoto">${t('submit')}</button>`;
    document.getElementById('photoInput').onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const fr = new FileReader();
      fr.onload = () => {
        state.photos[state.questStage] = fr.result;
        saveState();
        renderStageTask(stage);
      };
      fr.readAsDataURL(file);
    };
    document.getElementById('confirmPhoto').onclick = () => {
      if (state.photos[state.questStage]) advanceStage();
      else openModal('Фото', 'Сначала загрузите фото.');
    };
  }
}

function advanceStage() {
  playTone(730, 110);
  state.questStage += 1;
  saveState();
  if (state.questStage >= questStages.length) setScreen('reward');
  else renderQuest();
}

function renderReward() {
  const choices = products.map(p => `<button class="secondary-btn" data-reward="${p.id}">${p.emoji} ${p.name[state.lang]}</button>`).join('');
  const picked = state.reward ? products.find(p => p.id === state.reward) : null;

  app.innerHTML = `
    <section class="screen card">
      <h2>${t('finished')}</h2>
      <div class="answer-grid">${choices}</div>
      ${picked ? `<div class="card" style="padding:12px;background:#fff;">
        <h3>${t('certificate')}</h3>
        <p>${t('reward')}: ${picked.emoji} ${picked.name[state.lang]}</p>
        <p><strong>${t('obtained')}</strong></p>
      </div>` : ''}
      <button class="ghost-btn" id="backHome">←</button>
    </section>`;

  app.querySelectorAll('[data-reward]').forEach(btn => {
    btn.onclick = () => {
      state.reward = btn.dataset.reward;
      saveState();
      confettiBurst();
      renderReward();
    };
  });
  document.getElementById('backHome').onclick = () => setScreen('home');
}

function setScreen(screen) { state.screen = screen; saveState(); render(); }

function openModal(title, text) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.classList.remove('hidden');
}

document.getElementById('modalClose').onclick = () => modal.classList.add('hidden');
langSelect.onchange = () => { state.lang = langSelect.value; saveState(); render(); };
document.getElementById('soundToggle').onclick = () => {
  state.soundOn = !state.soundOn;
  saveState();
  document.getElementById('soundToggle').textContent = state.soundOn ? '🔊' : '🔇';
};

document.getElementById('stopQrBtn').onclick = stopQr;
document.getElementById('qrTitle').textContent = 'QR';
document.getElementById('stopQrBtn').textContent = t('stopQr');

async function startQrScan(expectedCode) {
  const panel = document.getElementById('qrPanel');
  panel.classList.remove('hidden');
  document.getElementById('stopQrBtn').textContent = t('stopQr');

  try {
    qrScanner = new Html5Qrcode('reader');
    await qrScanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: 220 },
      (decodedText) => {
        if (decodedText.trim() === expectedCode) {
          state.answers[`qr_${state.questStage}`] = true;
          saveState();
          stopQr();
          renderQuest();
        } else openModal('QR', t('qrFail'));
      }
    );
  } catch {
    openModal('QR', t('noCamera'));
    stopQr();
  }
}

function stopQr() {
  const panel = document.getElementById('qrPanel');
  panel.classList.add('hidden');
  if (qrScanner) {
    qrScanner.stop().then(() => qrScanner.clear()).catch(() => {});
    qrScanner = null;
  }
  const reader = document.getElementById('reader');
  reader.innerHTML = '';
}

function formatDuration(ms) {
  const sec = Math.floor(ms / 1000);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function confettiBurst() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: -20,
    r: Math.random() * 6 + 3,
    c: ['#f8a5c2', '#7bc8a4', '#ffd166', '#9b5de5'][Math.floor(Math.random() * 4)],
    vx: Math.random() * 3 - 1.5,
    vy: Math.random() * 4 + 2
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      ctx.fillStyle = p.c;
      ctx.fillRect(p.x, p.y, p.r, p.r);
    });
    frame += 1;
    if (frame < 160) requestAnimationFrame(draw);
  }
  draw();
}

render();
