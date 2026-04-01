const STORAGE_KEY = 'kalykShynykPro_v2';
const STAGE_QR_PREFIX = 'KALYK-MALL-STAGE-';
const LIMIT_MS = 5 * 60 * 60 * 1000;

const translations = {
  ru: {
    subtitle: 'Банк покупок PRO',
    mockup: 'Визуальный mockup',
    mockupText: 'Премиум-поток: Главный экран → CRM + Магазин → Квест по точкам ТЦ (QR/фото/ответы) → Награда → Спасибо и выдача приза на кассе.',
    buy: 'Перейти в магазин',
    quest: 'Начать квест',
    crmTitle: 'Контакт участника',
    name: 'Имя', phone: 'Телефон', saveContact: 'Сохранить контакт',
    shopTitle: 'Подарки и мерч', add: 'Добавить', cart: 'Корзина', checkout: 'Подтвердить заказ',
    payDemo: 'Оплата (демо)',
    questTitle: 'Квест по торговому центру',
    stage: 'Этап', findPoint: 'Найди точку',
    scan: 'Сканировать QR', stop: 'Остановить сканер',
    qrNeeded: 'Сначала отсканируйте QR в этой точке.',
    submit: 'Подтвердить', answerPh: 'Введите ответ',
    timer: 'Лимит времени',
    rewardTitle: 'Выберите награду',
    certificate: 'Сертификат участника',
    obtained: 'Получено',
    thanksTitle: 'Спасибо за участие!',
    cashier: 'Покажите этот экран на кассе для выдачи приза.',
    issuePrize: 'Выдать приз на кассе',
    issued: 'Приз отмечен как выдан',
    qrFail: 'QR-код не подходит к текущему этапу.',
    noCamera: 'Камера недоступна или нет HTTPS.',
    done: 'Готово'
  },
  en: {
    subtitle: 'Bank of Purchases PRO',
    mockup: 'Visual mockup',
    mockupText: 'Premium flow: Home → CRM + Shop → Mall Quest points (QR/photo/answers) → Reward → Thank-you & cashier redemption.',
    buy: 'Open shop', quest: 'Start quest',
    crmTitle: 'Participant contact',
    name: 'Name', phone: 'Phone', saveContact: 'Save contact',
    shopTitle: 'Gifts & merch', add: 'Add', cart: 'Cart', checkout: 'Confirm order',
    payDemo: 'Payment (demo)',
    questTitle: 'Mall location quest',
    stage: 'Stage', findPoint: 'Find point',
    scan: 'Scan QR', stop: 'Stop scanner',
    qrNeeded: 'Scan QR at this location first.',
    submit: 'Submit', answerPh: 'Type answer',
    timer: 'Time limit',
    rewardTitle: 'Choose reward',
    certificate: 'Participant certificate',
    obtained: 'Obtained',
    thanksTitle: 'Thanks for participating!',
    cashier: 'Show this screen at cashier to redeem prize.',
    issuePrize: 'Redeem at cashier',
    issued: 'Prize marked as redeemed',
    qrFail: 'QR does not match this stage.',
    noCamera: 'Camera unavailable or HTTPS missing.',
    done: 'Done'
  },
  mari: {
    subtitle: 'Банк покупок PRO',
    mockup: 'Визуал макет',
    mockupText: 'Премиум поток: Тӱҥ экран → CRM + кевыт → ТЦ квест (QR/фото/вашмут) → сайлык → кассыште налмаш.',
    buy: 'Кевытыш пуро', quest: 'Квестым тӱҥал',
    crmTitle: 'Участник контакт',
    name: 'Лӱм', phone: 'Телефон', saveContact: 'Контактым аралаш',
    shopTitle: 'Подарке-влак', add: 'Умдаш', cart: 'Корзина', checkout: 'Заказым шындыш',
    payDemo: 'Тӱлыме (демо)',
    questTitle: 'ТЦ квест',
    stage: 'Этап', findPoint: 'Точкым муаш',
    scan: 'QR скан', stop: 'Скан чарен',
    qrNeeded: 'Ончыч QR сканле.',
    submit: 'Шындаш', answerPh: 'Вашмутым возо',
    timer: 'Жап лимит',
    rewardTitle: 'Сайлыкым ойло',
    certificate: 'Сертификат',
    obtained: 'Налын',
    thanksTitle: 'Тау лийже!',
    cashier: 'Тиде экран кассыште ончыкто.',
    issuePrize: 'Кассыште пуаш',
    issued: 'Сайлык пуымо палемдалтын',
    qrFail: 'Тиде этаплан QR ок келше.',
    noCamera: 'Камера лийын огыл.',
    done: 'Пытым'
  }
};

const products = [
  { id: 'bag', emoji: '🎒', price: 2900, ru: 'Сумка', en: 'Bag', mari: 'Сумка' },
  { id: 'toy', emoji: '🧸', price: 1800, ru: 'Игрушка', en: 'Toy', mari: 'Уенчык' },
  { id: 'ring', emoji: '💍', price: 3500, ru: 'Украшение', en: 'Jewelry', mari: 'Украшений' },
  { id: 'card', emoji: '💌', price: 450, ru: 'Открытка', en: 'Postcard', mari: 'Открытка' }
];

const stageNarratives = [
  {
    quote: { ru: '«Традиция живёт, когда ею делятся».', en: '“Tradition lives when shared.”', mari: '«Традиций ушна, кунам поделитлалтеш». ' },
    fact: { ru: 'Марийцы бережно хранят орнаменты с символами солнца, коня и утки.', en: 'Mari people preserve ornaments with sun, horse, and duck symbols.', mari: 'Марий-влак кече, имне, лудо символым аралат.' },
    story: { ru: 'История: семейные узоры часто передавались по женской линии.', en: 'Story: family ornament patterns were often passed through mothers.', mari: 'Историй: узор-влак еш дене колталтеш.' }
  },
  {
    quote: { ru: '«Смысл вещей рождается в контексте».', en: '“Things gain meaning in context.”', mari: '«Паша контекстыште шочеш». ' },
    fact: { ru: 'Музыкальный инструмент шувыр сопровождал праздники и обряды.', en: 'Shuvyr accompanied ceremonies and festivals.', mari: 'Шӱвыр пайрем ден обрядла деке коштеш.' },
    story: { ru: 'История: мастера создавали инструменты индивидуально под голос.', en: 'Story: instruments were handcrafted to match each performer.', mari: 'Историй: инструмент-влак шке койыш да тӱрлыме.' }
  }
];

const questStages = [
  { point: 'Вход А: стенд с солнечным знаком', qr: `${STAGE_QR_PREFIX}1`, type: 'choice', q: { ru: 'Солнце в орнаменте означает…', en: 'Sun in ornament means…', mari: 'Кече орнаментыште мом ончыкта?' }, options: [['life', 'Жизнь', 'Life', 'Илыме'], ['trade', 'Торговлю', 'Trade', 'Сатыме']], correct: 'life' },
  { point: 'Фуд-холл: зона с этно-панно', qr: `${STAGE_QR_PREFIX}2`, type: 'text', q: { ru: 'Введите: шувыр', en: 'Type: shuvyr', mari: 'Возо: шувыр' }, answer: ['шувыр', 'shuvyr'] },
  { point: 'Лестница B: табличка «Конь»', qr: `${STAGE_QR_PREFIX}3`, type: 'photo', q: { ru: 'Сделайте фото символа «конь».', en: 'Take photo of the horse symbol.', mari: '«Имне» символ фото.' } },
  { point: '2 этаж: витрина с уткой', qr: `${STAGE_QR_PREFIX}4`, type: 'choice', q: { ru: 'Символ воды — это…', en: 'Water symbol is…', mari: 'Вӱд символ…' }, options: [['duck', 'Утка', 'Duck', 'Лудо'], ['sun', 'Солнце', 'Sun', 'Кече']], correct: 'duck' },
  { point: 'Точка 5: зона ремесла', qr: `${STAGE_QR_PREFIX}5`, type: 'text', q: { ru: 'Введите слово: калык', en: 'Type word: kalyk', mari: 'Возо: калык' }, answer: ['калык', 'kalyk'] },
  { point: 'Точка 6: маркет остров', qr: `${STAGE_QR_PREFIX}6`, type: 'choice', q: { ru: 'Что дарят чаще на этно-мероприятии?', en: 'Most common ethno-event gift?', mari: 'Этно пайремыште мом пуаҥ?' }, options: [['postcard', 'Открытка', 'Postcard', 'Открытка'], ['ticket', 'Билет', 'Ticket', 'Билет']], correct: 'postcard' },
  { point: 'Точка 7: фото-рамка', qr: `${STAGE_QR_PREFIX}7`, type: 'photo', q: { ru: 'Сделайте селфи у рамки.', en: 'Take selfie at frame.', mari: 'Рамка пелен селфи.' } },
  { point: 'Точка 8: лавка мастера', qr: `${STAGE_QR_PREFIX}8`, type: 'text', q: { ru: 'Введите: мари', en: 'Type: mari', mari: 'Возо: мари' }, answer: ['мари', 'mari'] },
  { point: 'Точка 9: инфо-стойка', qr: `${STAGE_QR_PREFIX}9`, type: 'choice', q: { ru: 'Сколько этапов в квесте?', en: 'How many stages?', mari: 'Мыняр этап?' }, options: [['10', '10', '10', '10'], ['9', '9', '9', '9']], correct: '10' },
  { point: 'Точка 10: финальный стенд', qr: `${STAGE_QR_PREFIX}10`, type: 'text', q: { ru: 'Введите код: шынык', en: 'Type code: shynyk', mari: 'Код возо: шынык' }, answer: ['шынык', 'shynyk'] }
];

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || {
  lang: 'ru',
  screen: 'home',
  sound: true,
  crm: { name: '', phone: '' },
  cart: [],
  questStage: 0,
  stageUnlocked: {},
  photos: {},
  reward: null,
  startedAt: null,
  prizeIssued: false
};

const app = document.getElementById('app');
const langSelect = document.getElementById('lang');
const modal = document.getElementById('modal');
let qrScanner = null;

function t(k) { return translations[state.lang][k] || k; }
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function productName(p) { return p[state.lang] || p.ru; }

function ping(freq = 520, dur = 80) {
  if (!state.sound) return;
  const audio = new (window.AudioContext || window.webkitAudioContext)();
  const o = audio.createOscillator(); const g = audio.createGain();
  o.connect(g); g.connect(audio.destination);
  o.frequency.value = freq; g.gain.value = 0.03;
  o.start(); setTimeout(() => { o.stop(); audio.close(); }, dur);
}

function setLangOptions() {
  langSelect.innerHTML = '<option value="ru">RU</option><option value="en">EN</option><option value="mari">MARI</option>';
  langSelect.value = state.lang;
}

function render() {
  document.getElementById('subtitle').textContent = t('subtitle');
  setLangOptions();
  if (state.screen === 'home') renderHome();
  if (state.screen === 'shop') renderShop();
  if (state.screen === 'quest') renderQuest();
  if (state.screen === 'reward') renderReward();
  if (state.screen === 'thanks') renderThanks();
}

function renderHome() {
  app.innerHTML = `
  <section class="screen hero glass trapezoid">
    <div class="kpi">
      <span class="badge">${t('mockup')}</span>
      <p>${t('mockupText')}</p>
    </div>

    <article class="crm">
      <h3>${t('crmTitle')}</h3>
      <div class="grid">
        <div class="row"><label>${t('name')}</label><input id="crmName" value="${state.crm.name}" /></div>
        <div class="row"><label>${t('phone')}</label><input id="crmPhone" value="${state.crm.phone}" /></div>
      </div>
      <div class="inline" style="margin-top:8px;">
        <button class="btn primary" id="saveContact">${t('saveContact')}</button>
      </div>
    </article>

    <div class="inline">
      <button class="btn primary" id="toShop">${t('buy')}</button>
      <button class="btn soft" id="toQuest">${t('quest')}</button>
    </div>
  </section>`;

  document.getElementById('saveContact').onclick = () => {
    state.crm.name = document.getElementById('crmName').value.trim();
    state.crm.phone = document.getElementById('crmPhone').value.trim();
    save();
    openModal('CRM', t('done'));
  };
  document.getElementById('toShop').onclick = () => setScreen('shop');
  document.getElementById('toQuest').onclick = () => {
    if (!state.startedAt) state.startedAt = Date.now();
    save();
    setScreen('quest');
  };
}

function renderShop() {
  const cards = products.map(p => {
    const count = state.cart.filter(id => id === p.id).length;
    return `<article class="item"><div class="thumb">${p.emoji}</div><div><strong>${productName(p)}</strong><br><small>${p.price} ₽</small></div><button class="btn soft" data-add="${p.id}">${t('add')} (${count})</button></article>`;
  }).join('');
  const total = state.cart.reduce((s, id) => s + products.find(p => p.id === id).price, 0);

  app.innerHTML = `
    <section class="screen glass trapezoid">
      <h2>${t('shopTitle')}</h2>
      <div class="grid products">${cards}</div>
      <div class="kpi">${t('cart')}: ${state.cart.length} / ${total} ₽</div>
      <div class="inline">
        <button class="btn primary" id="checkout">${t('checkout')}</button>
        <button class="btn soft" id="pay">${t('payDemo')}</button>
        <button class="btn ghost" id="back">←</button>
      </div>
    </section>`;

  app.querySelectorAll('[data-add]').forEach(b => b.onclick = () => { state.cart.push(b.dataset.add); save(); ping(); renderShop(); });
  document.getElementById('checkout').onclick = () => openModal('Order', `${t('done')}. CRM: ${state.crm.name || '-'}`);
  document.getElementById('pay').onclick = () => openModal('Payment', 'Demo API hook: Stripe / YooKassa SDK.');
  document.getElementById('back').onclick = () => setScreen('home');
}

function renderQuest() {
  const st = questStages[state.questStage];
  if (!st) return setScreen('reward');
  if (!state.startedAt) state.startedAt = Date.now();

  const narrative = stageNarratives[state.questStage % stageNarratives.length];
  const left = Math.max(0, LIMIT_MS - (Date.now() - state.startedAt));
  const progress = Math.round((state.questStage / questStages.length) * 100);

  app.innerHTML = `
  <section class="screen glass trapezoid">
    <h2>${t('questTitle')}</h2>
    <div class="progress"><span style="width:${progress}%"></span></div>
    <div class="badge">${t('stage')} ${state.questStage + 1}/10 · ${t('timer')}: ${fmt(left)}</div>

    <article class="quote">${narrative.quote[state.lang]}</article>
    <article class="fact">${narrative.fact[state.lang]}</article>
    <article class="story">${narrative.story[state.lang]}</article>

    <div class="kpi"><strong>${t('findPoint')}:</strong> ${st.point}</div>
    <button class="btn primary" id="scan">${t('scan')}</button>
    <div id="taskArea"></div>
    <button class="btn ghost" id="home">←</button>
  </section>`;

  document.getElementById('scan').onclick = () => startScan(st.qr);
  document.getElementById('home').onclick = () => setScreen('home');

  renderTask(st);
  setTimeout(() => { if (state.screen === 'quest') renderQuest(); }, 1000);
}

function renderTask(stage) {
  const container = document.getElementById('taskArea');
  if (!state.stageUnlocked[state.questStage]) {
    container.innerHTML = `<div class="kpi">${t('qrNeeded')}</div>`;
    return;
  }

  if (stage.type === 'choice') {
    const options = stage.options.map(o => {
      const label = state.lang === 'ru' ? o[1] : state.lang === 'en' ? o[2] : o[3];
      return `<button class="btn soft" data-opt="${o[0]}">${label}</button>`;
    }).join('');
    container.innerHTML = `<div class="row"><label>${stage.q[state.lang]}</label></div><div class="inline">${options}</div>`;
    container.querySelectorAll('[data-opt]').forEach(btn => btn.onclick = () => btn.dataset.opt === stage.correct ? nextStage() : openModal('✖', 'Try again'));
  }

  if (stage.type === 'text') {
    container.innerHTML = `<div class="row"><label>${stage.q[state.lang]}</label><input id="ans" placeholder="${t('answerPh')}" /></div><button id="send" class="btn primary">${t('submit')}</button>`;
    document.getElementById('send').onclick = () => {
      const v = document.getElementById('ans').value.trim().toLowerCase();
      if (stage.answer.includes(v)) nextStage();
      else openModal('✖', 'Incorrect');
    };
  }

  if (stage.type === 'photo') {
    const preview = state.photos[state.questStage] ? `<img class="photo-preview" src="${state.photos[state.questStage]}" />` : '';
    container.innerHTML = `<div class="row"><label>${stage.q[state.lang]}</label><input id="photo" type="file" accept="image/*" /></div>${preview}<button id="okPhoto" class="btn primary">${t('submit')}</button>`;
    document.getElementById('photo').onchange = (e) => {
      const file = e.target.files[0]; if (!file) return;
      const fr = new FileReader();
      fr.onload = () => { state.photos[state.questStage] = fr.result; save(); renderTask(stage); };
      fr.readAsDataURL(file);
    };
    document.getElementById('okPhoto').onclick = () => state.photos[state.questStage] ? nextStage() : openModal('Photo', 'Upload photo first');
  }
}

function nextStage() {
  state.questStage += 1;
  save();
  ping(720, 100);
  if (state.questStage >= questStages.length) setScreen('reward');
  else renderQuest();
}

function renderReward() {
  const options = products.map(p => `<button class="btn soft" data-reward="${p.id}">${p.emoji} ${productName(p)}</button>`).join('');
  const r = products.find(p => p.id === state.reward);

  app.innerHTML = `
    <section class="screen glass trapezoid">
      <h2>${t('rewardTitle')}</h2>
      <div class="inline">${options}</div>
      ${r ? `<article class="kpi"><h3>${t('certificate')}</h3><p>${r.emoji} ${productName(r)} — <strong>${t('obtained')}</strong></p></article>` : ''}
      <button class="btn primary" id="toThanks">${t('done')}</button>
    </section>`;

  app.querySelectorAll('[data-reward]').forEach(btn => btn.onclick = () => {
    state.reward = btn.dataset.reward;
    save();
    launchConfetti();
    renderReward();
  });
  document.getElementById('toThanks').onclick = () => setScreen('thanks');
}

function renderThanks() {
  app.innerHTML = `
    <section class="screen glass trapezoid">
      <h2>${t('thanksTitle')}</h2>
      <div class="kpi">${t('cashier')}</div>
      <div class="crm">
        <p><strong>${t('name')}:</strong> ${state.crm.name || '-'}</p>
        <p><strong>${t('phone')}:</strong> ${state.crm.phone || '-'}</p>
        <p><strong>ID:</strong> KS-${String(Date.now()).slice(-6)}-${state.questStage}</p>
      </div>
      <button class="btn primary" id="issue">${t('issuePrize')}</button>
      ${state.prizeIssued ? `<span class="badge">${t('issued')}</span>` : ''}
      <button class="btn ghost" id="homeFromThanks">←</button>
    </section>`;

  document.getElementById('issue').onclick = () => {
    state.prizeIssued = true;
    save();
    openModal('CRM', t('issued'));
    renderThanks();
  };
  document.getElementById('homeFromThanks').onclick = () => setScreen('home');
}

async function startScan(expected) {
  document.getElementById('qrPanel').classList.remove('hidden');
  document.getElementById('qrTitle').textContent = `${t('stage')} ${state.questStage + 1}`;
  document.getElementById('stopQr').textContent = t('stop');
  try {
    qrScanner = new Html5Qrcode('reader');
    await qrScanner.start({ facingMode: 'environment' }, { fps: 10, qrbox: 220 }, (text) => {
      if (text.trim() === expected) {
        state.stageUnlocked[state.questStage] = true;
        save();
        stopScan();
        renderTask(questStages[state.questStage]);
      } else openModal('QR', t('qrFail'));
    });
  } catch {
    openModal('QR', t('noCamera'));
    stopScan();
  }
}

function stopScan() {
  document.getElementById('qrPanel').classList.add('hidden');
  if (qrScanner) qrScanner.stop().then(() => qrScanner.clear()).catch(() => {});
  qrScanner = null;
  document.getElementById('reader').innerHTML = '';
}

function openModal(title, text) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').textContent = text;
  modal.classList.remove('hidden');
}

function fmt(ms) {
  const s = Math.floor(ms / 1000);
  const h = String(Math.floor(s / 3600)).padStart(2, '0');
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  return `${h}:${m}:${sec}`;
}

function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const bits = Array.from({ length: 130 }, () => ({
    x: Math.random() * canvas.width,
    y: -20,
    vx: Math.random() * 2 - 1,
    vy: Math.random() * 3 + 2,
    c: ['#c97b63', '#8cbdb1', '#ffd7bd', '#ffffff'][Math.floor(Math.random() * 4)],
    r: Math.random() * 6 + 2
  }));
  let f = 0;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bits.forEach(b => { b.x += b.vx; b.y += b.vy; ctx.fillStyle = b.c; ctx.fillRect(b.x, b.y, b.r, b.r); });
    if (f++ < 170) requestAnimationFrame(draw);
  };
  draw();
}

function setScreen(screen) { state.screen = screen; save(); render(); }

document.getElementById('modalClose').onclick = () => modal.classList.add('hidden');
document.getElementById('stopQr').onclick = stopScan;
langSelect.onchange = () => { state.lang = langSelect.value; save(); render(); };
document.getElementById('soundBtn').onclick = () => {
  state.sound = !state.sound;
  document.getElementById('soundBtn').textContent = state.sound ? '🔊' : '🔇';
  save();
};

document.getElementById('soundBtn').textContent = state.sound ? '🔊' : '🔇';
render();
