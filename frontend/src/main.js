const API = 'http://localhost:3001/api';
const root = document.querySelector('#root');

const languages = [
  { code: 'en', label: 'ENG', title: 'English' },
  { code: 'ru', label: 'RU', title: 'Русский' },
  { code: 'tg', label: 'TJ', title: 'Тоҷикӣ' },
];

function getInitialLanguage() {
  const saved = localStorage.getItem('englishprep_language');
  if (saved === 'en' || saved === 'eng') return 'en';
  if (saved === 'tg' || saved === 'tj') return 'tg';
  return 'ru';
}

const state = {
  language: getInitialLanguage(),
  langMenuOpen: false,
  landingMenuOpen: false,
  token: localStorage.getItem('englishprep_token') || '',
  user: readJson('englishprep_user', null),
  tests: [],
  lessons: [],
  words: [],
  tajikWords: {},
  results: readJson('englishprep_test_results', []),
  completedLessons: readJson('englishprep_completed_lessons', {}),
  activeSkill: 'reading',
  writingFilter: 'all',
  authMode: 'login',
  authError: '',
  testAnswers: {},
  lessonAnswers: {},
  testSubmitted: false,
  lessonChecked: false,
  testTimeLeft: 0,
  timerId: null,
  mobileOpen: false,
};

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
  catch { return fallback; }
}

const tr = (ru, tg, en) => {
  if (state.language === 'en') return en !== undefined ? en : ru;
  if (state.language === 'tg') return tg !== undefined ? tg : ru;
  return ru;
};

const esc = (value = '') => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const setLang = (lang) => {
  state.language = lang;
  state.langMenuOpen = false;
  localStorage.setItem('englishprep_language', lang);
  document.documentElement.lang = lang;
  if (state.user) {
    state.user.language = lang;
    localStorage.setItem('englishprep_user', JSON.stringify(state.user));
    api('/user/profile', { method: 'PUT', body: JSON.stringify({ language: lang }) }).catch(() => {});
  }
  render();
};

async function api(endpoint, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  const response = await fetch(`${API}${endpoint}`, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || `Request failed (${response.status})`);
  return payload;
}

async function loadStaticData() {
  const [tests, lessons, words, tajikWords] = await Promise.all([
    fetch('/data/tests.json').then((r) => r.json()).catch(() => []),
    fetch('/data/lessons.json').then((r) => r.json()).catch(() => []),
    fetch('/data/vocabulary.json').then((r) => r.json()).catch(() => []),
    fetch('/data/vocabulary-tg.json').then((r) => r.json()).catch(() => ({})),
  ]);
  state.tests = tests;
  state.lessons = lessons;
  state.words = words;
  state.tajikWords = tajikWords;
}

function nav(path) {
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
  state.mobileOpen = false;
  state.landingMenuOpen = false;
  state.langMenuOpen = false;
  history.pushState({}, '', path);
  render();
  window.scrollTo(0, 0);
}

function icon(name, size = 18) {
  const paths = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7H10v7H4a1 1 0 0 1-1-1z"/>',
    tests: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
    chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-5 5"/>',
    words: '<path d="M4 5h16M4 10h16M4 15h10M4 20h10"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>',
    play: '<path d="m8 5 12 7-12 7z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/>',
    sound: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7m3-10a9 9 0 0 1 0 13"/>',
    x: '<path d="m18 6-12 12M6 6l12 12"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="m8.2 13-1.2 8 5-3 5 3-1.2-8"/>',
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.book}</svg>`;
}

function logo() {
  return `<span class="flex items-center gap-2 sm:gap-2.5 shrink-0"><img src="/logo.png" alt="EnglishPrep" class="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm ring-1 ring-black/10 shrink-0" style="border-radius: 50%;"><b class="text-lg sm:text-xl font-black tracking-tight text-gray-900">English<span class="text-[#FF5B45]">Prep</span></b></span>`;
}

function languageToggle(extra = '') {
  const current = languages.find((l) => l.code === state.language) || languages[1];
  return `
    <div class="relative inline-block text-left language-dropdown ${extra}">
      <button
        type="button"
        data-action="toggle-lang-menu"
        class="compact-btn inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 sm:px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all focus:outline-none"
        aria-label="${tr('Выбор языка', 'Интихоби забон', 'Select language')}"
        aria-expanded="${state.langMenuOpen}"
      >
        <span class="tracking-wide">${current.label}</span>
        <svg class="w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${state.langMenuOpen ? 'rotate-180 text-[#FF5B45]' : ''}" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>

      ${state.langMenuOpen ? `
        <div class="absolute right-0 mt-2 w-32 rounded-2xl bg-white p-1.5 shadow-xl border border-gray-100 z-50 animate-fadeIn">
          ${languages.map((l) => `
            <button
              type="button"
              data-action="set-language"
              data-language="${l.code}"
              class="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${state.language === l.code ? 'bg-[#FF5B45]/10 text-[#FF5B45] font-bold' : 'text-gray-700 hover:bg-gray-50'}"
            >
              <span>${l.label}</span>
              ${state.language === l.code ? '<span class="text-[#FF5B45] text-xs font-bold">✓</span>' : ''}
            </button>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

function homePage() {
  return `<div class="min-h-screen bg-white text-gray-900 selection:bg-[#FF6B4A]/20 selection:text-[#FF6B4A]">
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="/" data-route="/">${logo()}</a>
        <nav class="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-600">
          <a href="#features" class="hover:text-[#FF5B45] transition-colors">${tr('Возможности', 'Имкониятҳо', 'Features')}</a>
          <a href="#skills" class="hover:text-[#FF5B45] transition-colors">${tr('Навыки IELTS', 'Маҳоратҳои IELTS', 'IELTS Skills')}</a>
          <a href="#levels" class="hover:text-[#FF5B45] transition-colors">${tr('Курсы A1–C2', 'Курсҳои A1–C2', 'Courses A1–C2')}</a>
          <a href="#features" class="hover:text-[#FF5B45] transition-colors">${tr('Преимущества', 'Афзалиятҳо', 'Highlights')}</a>
        </nav>
        
        <!-- Desktop actions -->
        <div class="hidden sm:flex items-center gap-3">
          ${languageToggle()}
          ${state.token ? `
            <button data-route="/dashboard" class="bg-[#FF5B45] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-[#E6432A] transition-colors">${tr('В кабинет', 'Ба ҳисоб', 'Dashboard')} →</button>
          ` : `
            <button data-route="/auth" data-auth-mode="login" class="text-gray-700 px-3 py-2 text-sm font-medium hover:text-[#FF5B45] transition-colors">${tr('Войти', 'Ворид шудан', 'Log in')}</button>
            <button data-route="/auth" data-auth-mode="register" class="bg-[#FF5B45] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-[#E6432A] transition-colors">${tr('Начать бесплатно', 'Ройгон оғоз кардан', 'Start Free')}</button>
          `}
        </div>

        <!-- Mobile header controls -->
        <div class="flex sm:hidden items-center gap-2">
          ${languageToggle()}
          <button data-action="landing-menu" class="compact-btn p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors" aria-label="Toggle menu">
            ${icon(state.landingMenuOpen ? 'x' : 'menu', 22)}
          </button>
        </div>
      </div>

      <!-- Mobile dropdown drawer on landing page -->
      ${state.landingMenuOpen ? `
        <div class="sm:hidden border-t border-gray-100 bg-white px-4 py-5 shadow-xl animate-fadeIn space-y-4">
          <nav class="flex flex-col gap-2 text-sm font-semibold text-gray-700">
            <a href="#features" data-action="close-landing-menu" class="py-2.5 px-3 rounded-xl hover:bg-gray-50 flex items-center justify-between">
              <span>${tr('Возможности', 'Имкониятҳо', 'Features')}</span>
              <span class="text-xs text-gray-400">→</span>
            </a>
            <a href="#skills" data-action="close-landing-menu" class="py-2.5 px-3 rounded-xl hover:bg-gray-50 flex items-center justify-between">
              <span>${tr('Навыки IELTS', 'Маҳоратҳои IELTS', 'IELTS Skills')}</span>
              <span class="text-xs text-gray-400">→</span>
            </a>
            <a href="#levels" data-action="close-landing-menu" class="py-2.5 px-3 rounded-xl hover:bg-gray-50 flex items-center justify-between">
              <span>${tr('Курсы A1–C2', 'Курсҳои A1–C2', 'Courses A1–C2')}</span>
              <span class="text-xs text-gray-400">→</span>
            </a>
          </nav>
          <div class="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
            ${state.token ? `
              <button data-route="/dashboard" class="w-full bg-[#FF5B45] text-white py-3 rounded-xl text-sm font-bold shadow-md">${tr('В личный кабинет', 'Ба ҳисоби шахсӣ', 'Dashboard')} →</button>
            ` : `
              <button data-route="/auth" data-auth-mode="login" class="w-full text-gray-800 border border-gray-200 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50">${tr('Войти в аккаунт', 'Ба ҳисоб ворид шудан', 'Log in')}</button>
              <button data-route="/auth" data-auth-mode="register" class="w-full bg-[#FF5B45] text-white py-3 rounded-xl text-sm font-bold shadow-md">${tr('Начать бесплатно', 'Ройгон оғоз кардан', 'Start Free')}</button>
            `}
          </div>
        </div>
      ` : ''}
    </header>

    <section class="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32">
      <div class="absolute inset-0 pointer-events-none"><img src="https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1920&q=80" alt="" class="w-full h-full object-cover opacity-10"><div class="absolute inset-0 bg-gradient-to-b from-white/60 via-white/95 to-white"></div></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-50 border border-coral-200 text-[#FF5B45] text-xs sm:text-sm font-semibold mb-6 sm:mb-8"><i class="w-2 h-2 rounded-full bg-[#FF5B45] animate-ping shrink-0"></i>${tr('Платформа подготовки к IELTS', 'Платформаи омодагӣ ба IELTS', 'IELTS Preparation Platform')}</div>
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.15] mb-4 sm:mb-6">${tr('Изучи английский от A1 до C2 и подготовься к', 'Англисиро аз A1 то C2 омӯз ва ба', 'Master English from A1 to C2 and prepare for')} <span class="text-[#FF5B45] underline decoration-coral-200">IELTS</span></h1>
          <p class="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed">${tr('Уроки, словарь и практика всех четырёх навыков IELTS: чтения, аудирования, письма и говорения.', 'Дарсҳо, луғат ва машқи чор маҳорати IELTS: хониш, шунавоӣ, навиштан ва гуфтор.', 'Lessons, vocabulary, and practice for all four IELTS skills: reading, listening, writing, and speaking.')}</p>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button data-route="/auth" data-auth-mode="register" class="w-full sm:w-auto bg-[#FF5B45] hover:bg-[#E6432A] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]">${tr('Начать обучение бесплатно', 'Омӯзишро ройгон оғоз кардан', 'Start Learning Free')} ${icon('arrow', 18)}</button>
            <button data-route="/auth" data-auth-mode="login" class="w-full sm:w-auto bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-colors">${tr('Войти в аккаунт', 'Ба ҳисоб ворид шудан', 'Log in to account')}</button>
          </div>
          <div class="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
            <span class="font-semibold text-gray-900">A1 — C2</span>
            <span>•</span>
            <span>48 IELTS ${tr('тестов', 'санҷиш', 'tests')}</span>
            <span>•</span>
            <span>30 ${tr('уроков', 'дарс', 'lessons')}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="skills" class="py-12 sm:py-20 bg-[#F8F9FA] border-y border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900">${tr('Все четыре навыка IELTS', 'Ҳамаи чор маҳорати IELTS', 'All Four IELTS Skills')}</h2>
          <p class="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500">${tr('Занимайтесь в одном месте и следите за прогрессом.', 'Дар як ҷо омӯзед ва пешрафти худро пайгирӣ кунед.', 'Practice in one place and keep track of your progress.')}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          ${[
            ['book', 'Academic Reading', tr('Тексты и вопросы с разбором ответов.', 'Матнҳо ва саволҳо бо шарҳи ҷавобҳо.', 'Passages and questions with in-depth explanations.'), 'bg-blue-50 text-blue-600'],
            ['sound', 'Listening Practice', tr('Упражнения для понимания устной речи.', 'Машқҳо барои фаҳмидани нутқи шифоҳӣ.', 'Exercises to master spoken audio comprehension.'), 'bg-red-50 text-red-600'],
            ['tests', 'Writing Task 1 & 2', tr('Практика эссе и академического письма.', 'Машқи иншо ва навиштани академӣ.', 'Essay writing and academic analysis tasks.'), 'bg-orange-50 text-orange-600'],
            ['mic', 'Speaking Simulation', tr('Вопросы и тренировочные задания IELTS.', 'Саволҳо ва машқҳои гуфтории IELTS.', 'Questions and simulated IELTS speaking tests.'), 'bg-amber-50 text-amber-600'],
          ].map(([ico, title, desc, color]) => `
            <article class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${color} flex items-center justify-center mb-4 sm:mb-5">${icon(ico, 22)}</div>
                <h3 class="text-base sm:text-lg font-bold mb-2">${title}</h3>
                <p class="text-gray-500 text-xs sm:text-sm leading-relaxed">${desc}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="levels" class="py-12 sm:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2 sm:mb-3">${icon('globe', 14)} CEFR</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900">${tr('Курсы английского от A1 до C2', 'Курсҳои англисӣ аз A1 то C2', 'English Courses from A1 to C2')}</h2>
          <p class="mt-2 text-xs sm:text-sm text-gray-500">${tr('30 уроков с правилами, примерами и упражнениями.', '30 дарс бо қоидаҳо, мисолҳо ва машқҳо.', '30 lessons with grammar rules, examples, and exercises.')}</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          ${['A1','A2','B1','B2','C1','C2'].map((level, i) => `
            <button data-route="/lessons?level=${level}" class="p-4 sm:p-5 rounded-2xl sm:rounded-3xl border ${['border-emerald-200 bg-emerald-50/40','border-teal-200 bg-teal-50/40','border-sky-200 bg-sky-50/40','border-indigo-200 bg-indigo-50/40','border-purple-200 bg-purple-50/40','border-rose-200 bg-rose-50/40'][i]} hover:scale-105 transition-all text-left min-h-[105px] sm:min-h-[140px] flex flex-col justify-between">
              <span class="text-2xl sm:text-3xl font-black">${level}</span>
              <p class="text-xs text-gray-500 mt-2">${tr('Открыть', 'Кушодан', 'Open')} →</p>
            </button>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="features" class="py-14 sm:py-20 bg-gradient-to-br from-[#FF5B45] via-[#FF6B4A] to-[#E6432A] text-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 class="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight">${tr('Начни готовиться к IELTS уже сегодня', 'Имрӯз омодагиро ба IELTS оғоз кун', 'Start preparing for IELTS today')}</h2>
        <p class="text-sm sm:text-lg text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">${tr('Выбери уровень, учи слова и тренируйся в удобном темпе.', 'Сатҳро интихоб кун, калима омӯз ва бо суръати худ машқ кун.', 'Pick a level, learn words, and practice at your own pace.')}</p>
        <button data-route="/auth" data-auth-mode="register" class="w-full sm:w-auto bg-white text-[#FF5B45] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">${tr('Создать бесплатный аккаунт', 'Ҳисоби ройгон соз', 'Create Free Account')}</button>
      </div>
    </section>

    <footer class="bg-gray-950 text-gray-300 py-8 sm:py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-5 text-center sm:text-left">
        <div>${logo()}</div>
        <span class="text-xs sm:text-sm text-gray-400">EnglishPrep · IELTS · A1–C2</span>
        <div class="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
          <button data-route="/lessons" class="hover:text-white transition-colors">${tr('Уроки', 'Дарсҳо', 'Lessons')}</button>
          <button data-route="/vocabulary" class="hover:text-white transition-colors">${tr('Словарь', 'Луғат', 'Vocabulary')}</button>
          <button data-route="/tests" class="hover:text-white transition-colors">${tr('Тесты', 'Санҷишҳо', 'Tests')}</button>
        </div>
      </div>
    </footer>
  </div>`;
}

function authPage() {
  const registering = state.authMode === 'register';
  return `
    <div class="min-h-screen bg-[#F8F9FA] flex flex-col justify-between p-4 sm:p-6 lg:p-8 selection:bg-[#FF6B4A]/20 selection:text-[#FF6B4A]">
      <!-- Header bar -->
      <div class="w-full max-w-md mx-auto flex items-center justify-between py-2" style="max-width: 440px;">
        <button data-route="/" class="text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1.5">
          ← <span>${tr('На главную', 'Ба саҳифаи асосӣ', 'Back to Home')}</span>
        </button>
        <span class="inline-block">${logo()}</span>
      </div>

      <!-- Compact Centered Auth Card -->
      <div class="flex-1 flex items-center justify-center py-4 sm:py-6 w-full">
        <div class="auth-card-compact w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-8" style="max-width: 440px; width: 100%;">
          <!-- Top Brand Badge -->
          <div class="text-center">
            <img src="/logo.png" alt="EnglishPrep" class="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shadow-md mx-auto mb-2 sm:mb-3 ring-2 ring-[#FF5B45]/20" style="border-radius: 50%;">
            <h1 class="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">EnglishPrep</h1>
            <p class="text-[11px] sm:text-xs text-gray-400 mt-0.5">IELTS Learning Platform · A1–C2</p>
          </div>

          <!-- Title -->
          <div class="mt-5 sm:mt-6 mb-4 sm:mb-5 text-center sm:text-left">
            <h2 class="text-lg sm:text-2xl font-extrabold text-gray-900 leading-snug">
              ${registering ? tr('Создать аккаунт', 'Сохтани ҳисоб', 'Create Account') : tr('С возвращением!', 'Хуш омадед!', 'Welcome Back!')}
            </h2>
            <p class="text-gray-500 text-xs mt-1">
              ${registering ? tr('Начните подготовку к IELTS и изучайте английский.', 'Омодагӣ ба IELTS ва омӯзиши англисиро оғоз кунед.', 'Start preparing for IELTS and learn English.') : tr('Войдите в свой профиль EnglishPrep.', 'Ба ҳисоби EnglishPrep ворид шавед.', 'Sign in to your EnglishPrep profile.')}
            </p>
          </div>

          ${state.authError ? `<div class="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-xs mb-4">${esc(state.authError)}</div>` : ''}

          <!-- Google Login Button -->
          <button
            type="button"
            data-action="google-login"
            class="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-gray-200 shadow-sm transition-all hover:border-gray-300 min-h-[44px]"
          >
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>${registering ? tr('Регистрация через Google', 'Сабти ном бо Google', 'Sign up with Google') : tr('Войти через Google', 'Воридшавӣ бо Google', 'Continue with Google')}</span>
          </button>

          <!-- Divider -->
          <div class="relative flex py-3 sm:py-3.5 items-center">
            <div class="flex-grow border-t border-gray-200"></div>
            <span class="flex-shrink mx-3 text-gray-400 text-[11px] uppercase font-semibold tracking-wider">${tr('или', 'ё', 'or')}</span>
            <div class="flex-grow border-t border-gray-200"></div>
          </div>

          <!-- Email / Password Form -->
          <form id="auth-form" class="flex flex-col gap-3">
            ${registering ? `
              <label class="text-xs font-semibold text-gray-700">
                ${tr('Имя', 'Ном', 'Name')}
                <input class="w-full mt-1 border border-gray-200 rounded-xl bg-white px-3 py-2.5 text-base sm:text-sm text-gray-800 focus:outline-none focus:border-[#FF5B45] transition-colors" name="name" placeholder="${tr('Ваше имя', 'Номи шумо', 'Your name')}" required>
              </label>
            ` : ''}
            <label class="text-xs font-semibold text-gray-700">
              Email
              <input class="w-full mt-1 border border-gray-200 rounded-xl bg-white px-3 py-2.5 text-base sm:text-sm text-gray-800 focus:outline-none focus:border-[#FF5B45] transition-colors" type="email" name="email" placeholder="example@gmail.com" required>
            </label>
            <label class="text-xs font-semibold text-gray-700">
              ${tr('Пароль', 'Рамз', 'Password')}
              <input class="w-full mt-1 border border-gray-200 rounded-xl bg-white px-3 py-2.5 text-base sm:text-sm text-gray-800 focus:outline-none focus:border-[#FF5B45] transition-colors" type="password" name="password" placeholder="••••••••" minlength="6" required>
            </label>
            <button type="submit" class="w-full bg-[#FF5B45] hover:bg-[#E6432A] text-white rounded-xl h-11 min-h-[44px] font-semibold text-xs sm:text-sm shadow-md mt-2 transition-colors flex items-center justify-center gap-1.5">
              <span>${registering ? tr('Зарегистрироваться', 'Сабти ном', 'Sign Up') : tr('Войти', 'Ворид шудан', 'Sign In')}</span>
              <span>→</span>
            </button>
          </form>

          <!-- Toggle Auth Mode -->
          <div class="text-center mt-4 sm:mt-5">
            <button type="button" class="text-xs font-semibold text-[#FF5B45] hover:underline py-1" data-action="toggle-auth">
              ${registering ? tr('Уже есть аккаунт? Войти', 'Аллакай ҳисоб доред? Ворид шавед', 'Already have an account? Sign In') : tr('Нет аккаунта? Зарегистрироваться', 'Ҳисоб надоред? Сабти ном кунед', "Don't have an account? Sign Up")}
            </button>
          </div>
        </div>
      </div>

      <!-- Legal footer -->
      <div class="text-center text-[10px] sm:text-[11px] text-gray-400 py-2 sm:py-3 max-w-md mx-auto" style="max-width: 440px;">
        ${tr('Продолжая, вы соглашаетесь с Условиями сервиса и Политикой конфиденциальности EnglishPrep', 'Бо идома додан, шумо ба шартҳои хизматрасонӣ ва сиёсати махфияти EnglishPrep розӣ мешавед.', 'By continuing, you agree to EnglishPrep Terms of Service and Privacy Policy.')}
      </div>
    </div>
  `;
}

const skillLabels = {
  reading: ['Reading', 'Хониш', 'Reading'],
  listening: ['Listening', 'Шунавоӣ', 'Listening'],
  writing: ['Writing', 'Навиштан', 'Writing'],
  speaking: ['Speaking', 'Гуфтор', 'Speaking']
};

function skillName(skill) {
  const item = skillLabels[skill] || [skill, skill, skill];
  return tr(item[0], item[1], item[2]);
}

function sidebar() {
  const links = [
    ['/dashboard', 'home', tr('Главная', 'Асосӣ', 'Dashboard')],
    ['/tests', 'tests', tr('Тесты', 'Санҷишҳо', 'Tests')],
    ['/statistics', 'chart', tr('Статистика', 'Омор', 'Statistics')],
    ['/vocabulary', 'words', tr('Словарь', 'Луғат', 'Vocabulary')],
    ['/lessons', 'book', tr('Уроки', 'Дарсҳо', 'Lessons')],
  ];
  return `
    <!-- Mobile top bar in app shell -->
    <div class="lg:hidden flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
      <button data-route="/" class="flex items-center gap-2">${logo()}</button>
      <div class="flex items-center gap-2">
        ${languageToggle()}
        <button data-action="mobile-menu" class="compact-btn p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors" aria-label="Toggle Menu">
          ${icon(state.mobileOpen ? 'x' : 'menu', 22)}
        </button>
      </div>
    </div>

    <!-- Backdrop for mobile drawer -->
    ${state.mobileOpen ? '<div data-action="close-menu" class="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>' : ''}

    <!-- Slide-out sidebar drawer -->
    <aside class="fixed lg:sticky top-0 left-0 z-50 h-screen w-72 max-w-[85vw] bg-white border-r border-gray-100 flex flex-col justify-between py-5 sm:py-6 px-4 overflow-y-auto transition-transform duration-300 ease-in-out pb-8 ${state.mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}">
      <div class="flex flex-col gap-5 sm:gap-6">
        <div class="flex items-center justify-between px-2">
          <button data-route="/" class="text-left">${logo()}</button>
          <button data-action="close-menu" class="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700">${icon('x', 20)}</button>
        </div>
        <nav class="flex flex-col gap-1.5">
          ${links.map(([path, ico, label]) => `
            <button data-route="${path}" class="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path + '/')) ? 'bg-[#FF5B45] text-white shadow-md font-bold' : 'text-gray-600 hover:bg-gray-50'}">
              ${icon(ico, 18)}
              <span>${label}</span>
            </button>
          `).join('')}
        </nav>
      </div>

      <div class="flex flex-col gap-3 mt-6 pt-4 border-t border-gray-100">
        <div class="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-2">
          <span class="px-2 text-xs font-semibold text-gray-500">${tr('Язык сайта', 'Забони сомона', 'Language')}</span>
          ${languageToggle()}
        </div>
        <button data-route="/profile" class="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <span class="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">${icon('user', 15)}</span>
          <span class="truncate">${esc(state.user?.name || tr('Личный кабинет', 'Ҳисоби шахсӣ', 'Profile'))}</span>
        </button>
        <button data-route="/profile" class="w-full bg-[#FF5B45] hover:bg-[#E6432A] text-white rounded-2xl py-3 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold shadow-md transition-colors">
          ✦ ${tr('Получить Premium', 'Premium гирифтан', 'Get Premium')}
        </button>
      </div>
    </aside>
  `;
}

function mobileBottomNav() {
  const navItems = [
    ['/dashboard', 'home', tr('Главная', 'Асосӣ', 'Home')],
    ['/tests', 'tests', tr('Тесты', 'Санҷиш', 'Tests')],
    ['/lessons', 'book', tr('Уроки', 'Дарсҳо', 'Lessons')],
    ['/vocabulary', 'words', tr('Словарь', 'Луғат', 'Vocab')],
    ['/profile', 'user', tr('Профиль', 'Профил', 'Profile')],
  ];
  return `
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-1 flex items-center justify-around shadow-[0_-2px_12px_rgba(0,0,0,0.05)] pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      ${navItems.map(([path, ico, label]) => {
        const isActive = location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));
        return `
          <button data-route="${path}" class="flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all ${isActive ? 'text-[#FF5B45] font-bold' : 'text-gray-500 hover:text-gray-900'}">
            <span class="p-1 rounded-lg ${isActive ? 'bg-[#FF5B45]/10' : ''}">${icon(ico, 18)}</span>
            <span class="text-[10px] mt-0.5 tracking-tight truncate max-w-[64px]">${label}</span>
          </button>
        `;
      }).join('')}
    </nav>
  `;
}

function appShell(content) {
  return `
    <div class="min-h-screen bg-[#F8F9FA] flex flex-col lg:flex-row antialiased">
      ${sidebar()}
      <main class="flex-1 min-w-0 overflow-y-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-7xl mx-auto w-full pb-24 lg:pb-10">
        ${content}
      </main>
      ${mobileBottomNav()}
    </div>
  `;
}

function dashboardPage() {
  const results = state.results;
  const scoredResults = results.filter((result) => typeof result.score === 'number' && Number.isFinite(result.score));
  const average = scoredResults.length ? (scoredResults.reduce((sum, result) => sum + result.score, 0) / scoredResults.length).toFixed(1) : '—';
  const completed = Object.values(state.completedLessons).filter(Boolean).length;
  return `
    <div class="space-y-6 sm:space-y-8 pb-4 sm:pb-12">
      <!-- Welcome Banner -->
      <div class="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FF5B45] via-[#FF6B4A] to-[#E6432A] p-5 sm:p-8 text-white shadow-lg">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div class="flex items-center gap-3.5 sm:gap-4">
            <img src="/logo.png" alt="EnglishPrep" class="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-md ring-2 ring-white/40 shrink-0" style="border-radius: 50%;">
            <div>
              <h1 class="text-lg sm:text-2xl font-black">${tr('Добро пожаловать', 'Хуш омадед', 'Welcome')}, ${esc(state.user?.name || '')}</h1>
              <p class="text-xs sm:text-sm text-white/90 mt-0.5 sm:mt-1">${tr('Продолжайте учиться в своём темпе.', 'Омӯзишро бо суръати худ идома диҳед.', 'Continue learning at your own pace.')}</p>
            </div>
          </div>
          <div class="bg-white/10 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl border border-white/20 self-start sm:self-auto">
            <span class="text-[9px] sm:text-[10px] uppercase font-bold block">${tr('ЦЕЛЬ', 'ҲАДАФ', 'TARGET')}</span>
            <span class="text-xl sm:text-2xl font-black">${esc(state.user?.targetBand || 7)}</span>
          </div>
        </div>
        <div class="mt-6 sm:mt-8 pt-4 border-t border-white/15 grid grid-cols-3 gap-2 sm:gap-4 text-center sm:text-left">
          <div>
            <b class="text-xl sm:text-2xl font-black block">${results.length}</b>
            <p class="text-[10px] sm:text-xs text-white/85 mt-0.5 leading-tight">${tr('тестов пройдено', 'санҷиши гузашта', 'tests completed')}</p>
          </div>
          <div>
            <b class="text-xl sm:text-2xl font-black block">${average}</b>
            <p class="text-[10px] sm:text-xs text-white/85 mt-0.5 leading-tight">Band ${tr('средний балл', 'холи миёна', 'average score')}</p>
          </div>
          <div>
            <b class="text-xl sm:text-2xl font-black block">${completed}</b>
            <p class="text-[10px] sm:text-xs text-white/85 mt-0.5 leading-tight">${tr('уроков пройдено', 'дарси гузашта', 'lessons completed')}</p>
          </div>
        </div>
      </div>

      <!-- Practice IELTS Grid -->
      <div>
        <h2 class="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 sm:mb-4">${tr('Практика IELTS', 'Машқи IELTS', 'IELTS Practice')}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          ${['speaking', 'listening', 'reading', 'writing'].map((skill, i) => `
            <button data-route="/tests/${skill}/${state.tests.find((t) => t.skill === skill)?.id || skill + '-79'}" class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-md text-left flex items-center justify-between transition-all">
              <span class="flex items-center gap-3">
                <span class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${['bg-amber-50 text-amber-600', 'bg-rose-50 text-rose-600', 'bg-sky-50 text-sky-600', 'bg-orange-50 text-orange-600'][i]} flex items-center justify-center shrink-0">${icon(['mic', 'sound', 'book', 'tests'][i], 20)}</span>
                <div>
                  <b class="block text-sm sm:text-base text-gray-900 font-bold">${skillName(skill)}</b>
                  <small class="text-xs text-gray-500">${tr('Практика · тесты и задания', 'Машқ · санҷишҳо ва супоришҳо', 'Practice · tests & tasks')}</small>
                </div>
              </span>
              <span class="text-gray-400 ml-2">${icon('arrow', 18)}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Daily Plan Card -->
      <div class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm text-center">
        <h3 class="text-base sm:text-lg font-bold text-gray-900">${tr('Твой ежедневный план', 'Нақшаи ҳаррӯзаи ту', 'Your Daily Plan')}</h3>
        <p class="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mt-1 leading-relaxed">${tr('Выбери урок, повтори слова и пройди один тест.', 'Як дарс интихоб кун, калимаҳоро такрор кун ва як санҷиш гузар.', 'Pick a lesson, review words, and take one test.')}</p>
        <div class="mt-5 sm:mt-6 flex flex-wrap justify-center gap-3">
          <button data-route="/lessons" class="bg-[#FF5B45] hover:bg-[#E6432A] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors shadow-sm">${tr('К урокам', 'Ба дарсҳо', 'To lessons')}</button>
          <button data-route="/vocabulary" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-full text-xs font-bold transition-colors">${tr('К словам', 'Ба луғат', 'To vocabulary')}</button>
        </div>
      </div>
    </div>
  `;
}

function lessonsPage() {
  const params = new URLSearchParams(location.search);
  const active = (params.get('level') || 'A1').toUpperCase();
  const list = state.lessons.filter((l) => String(l.level).toUpperCase() === active);
  const desc = {
    A1: ['Базовые фразы, знакомство, числа и простые диалоги.', 'Ибораҳои асосӣ, шиносоӣ, рақамҳо ва гуфтугӯҳои сода.', 'Basic phrases, greetings, numbers, and simple conversations.'],
    A2: ['Повседневные ситуации, покупки, погода и здоровье.', 'Вазъиятҳои ҳаррӯза, харид, обу ҳаво ва саломатӣ.', 'Everyday situations, shopping, weather, and health.'],
    B1: ['Образование, работа, путешествия и культура.', 'Маориф, кор, саёҳат ва фарҳанг.', 'Education, work, travel, and culture.'],
    B2: ['Сложные тексты, аргументация и академический английский.', 'Матнҳои мураккаб, далеловарӣ ва англисии академӣ.', 'Complex texts, arguments, and academic English.'],
    C1: ['Продвинутые темы: наука, право и дипломатия.', 'Мавзӯъҳои пешрафта: илм, ҳуқуқ ва дипломатия.', 'Advanced topics: science, law, and diplomacy.'],
    C2: ['Точная лексика, риторика и сложные академические тексты.', 'Луғати дақиқ, риторика ва матнҳои мураккаби академӣ.', 'Precision vocabulary, rhetoric, and complex academic discourse.'],
  };
  return `
    <div class="space-y-6 sm:space-y-8 pb-12">
      <header>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral-50 text-[#FF5B45] text-xs font-semibold mb-2">${icon('book', 14)} ${tr('Курсы общего и академического английского', 'Курсҳои англисии умумӣ ва академӣ', 'General & Academic English Courses')}</div>
        <h1 class="text-2xl sm:text-4xl font-black text-gray-950">${tr('Уроки английского (A1 – C2)', 'Дарсҳои англисӣ (A1 – C2)', 'English Lessons (A1 – C2)')}</h1>
        <p class="text-xs sm:text-sm text-gray-500 mt-1">${tr('Выберите уровень и проходите интерактивные модули.', 'Сатҳро интихоб карда, модулҳои интерактивиро омӯзед.', 'Choose a level and master interactive modules.')}</p>
      </header>

      <!-- Level Selector Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
        ${['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((l, i) => `
          <button data-route="/lessons?level=${l}" class="rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border ${active === l ? 'border-2 border-[#FF5B45] bg-white shadow-md' : 'bg-white border-gray-100'} min-h-[95px] sm:min-h-[140px] text-left transition-all flex flex-col justify-between">
            <b class="text-xl sm:text-2xl ${['text-emerald-600', 'text-teal-600', 'text-sky-600', 'text-indigo-600', 'text-purple-600', 'text-rose-600'][i]}">${l}</b>
            <div>
              <p class="text-[10px] sm:text-[11px] text-gray-500">${tr('Уровень', 'Сатҳ', 'Level')}</p>
              <span class="text-[10px] sm:text-[11px] text-gray-400">${state.lessons.filter((x) => String(x.level).toUpperCase() === l).length} ${tr('уроков', 'дарс', 'lessons')}</span>
            </div>
          </button>
        `).join('')}
      </div>

      <!-- Level Description Box -->
      <div class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-8 shadow-sm">
        <span class="text-xs font-black px-2.5 py-1 rounded-full bg-coral-50 text-[#FF5B45]">${tr('Уровень', 'Сатҳ', 'Level')} ${active}</span>
        <h2 class="text-lg sm:text-2xl font-extrabold text-gray-900 mt-2 sm:mt-3">${tr('Курс английского', 'Курси англисӣ', 'English Course')} ${active}</h2>
        <p class="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 leading-relaxed">${tr(desc[active][0], desc[active][1], desc[active][2])}</p>
      </div>

      <!-- Lessons Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        ${list.map((lesson, idx) => `
          <button data-route="/lessons/${String(lesson.level).toLowerCase()}/${lesson.id}" class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-md text-left flex flex-col justify-between transition-all">
            <div>
              <div class="flex items-start gap-3">
                <span class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-coral-50 text-[#FF5B45] flex items-center justify-center font-bold text-sm shrink-0">${idx + 1}</span>
                <div>
                  <h3 class="font-bold text-sm sm:text-base text-gray-900 leading-snug">${esc(lesson.title)}</h3>
                  <p class="text-xs text-gray-400 mt-1 flex items-center gap-1">${icon('clock', 13)} ${lesson.duration || (lesson.durationMinutes + ' min')}</p>
                </div>
              </div>
              <p class="text-xs sm:text-sm text-gray-500 leading-relaxed mt-3 sm:mt-4 line-clamp-3">${esc(lesson.description || '')}</p>
            </div>
            <span class="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-50 text-xs font-semibold text-[#FF5B45] flex items-center justify-between">
              <span>${tr('Начать урок', 'Оғози дарс', 'Start lesson')}</span>
              <span>→</span>
            </span>
          </button>
        `).join('') || `<p class="text-gray-500 text-sm">${tr('Уроки не найдены. Запустите сервер обучения.', 'Дарсҳо ёфт нашуданд. Сервери омӯзишро оғоз кунед.', 'No lessons found. Please launch the learning server.')}</p>`}
      </div>
    </div>
  `;
}

function lessonDetailPage(id) {
  const lesson = state.lessons.find((item) => item.id === id);
  if (!lesson) return `<div class="text-center py-20"><h2 class="text-xl sm:text-2xl font-bold">${tr('Урок не найден', 'Дарс ёфт нашуд', 'Lesson not found')}</h2><button data-route="/lessons" class="mt-5 text-[#FF5B45] font-semibold">${tr('Вернуться к урокам', 'Бозгашт ба дарсҳо', 'Back to lessons')}</button></div>`;
  const content = lesson.sections ? { overview: lesson.description, explanations: lesson.sections.map((s) => s.content), vocabulary: [], grammarRules: [], exercises: lesson.exercises || [], tips: [] } : (lesson.content || {});
  const exercises = content.exercises || [];
  const courseSections = lesson.sections?.length
    ? lesson.sections.map((section) => `<article class="space-y-2"><h3 class="font-bold text-base sm:text-lg text-gray-900 mb-1">${esc(section.title)}</h3><p class="text-xs sm:text-sm text-gray-700 leading-relaxed">${esc(section.content)}</p>${section.examples?.length ? `<div class="mt-3 space-y-2">${section.examples.map((example) => `<div class="rounded-xl bg-gray-50 p-3 text-xs sm:text-sm"><p class="font-medium text-gray-800">${esc(example.en)}</p>${state.language === 'ru' ? `<p class="text-gray-500 mt-1">${esc(example.ru)}</p>` : state.language === 'tg' && lesson.exampleTg?.[example.en] ? `<p class="text-gray-500 mt-1">${esc(lesson.exampleTg[example.en])}</p>` : ''}</div>`).join('')}</div>` : ''}</article>`).join('')
    : (content.explanations || []).map((paragraph) => `<p class="text-xs sm:text-sm text-gray-700 leading-relaxed">${esc(paragraph)}</p>`).join('');
  return `
    <div class="space-y-6 sm:space-y-8 pb-16 max-w-4xl mx-auto">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
        <button data-route="/lessons?level=${String(lesson.level).toUpperCase()}" class="text-xs sm:text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">← ${tr('Назад к списку', 'Бозгашт ба рӯйхат', 'Back to list')} (${String(lesson.level).toUpperCase()})</button>
        <span class="text-xs text-gray-400 flex items-center gap-1">${icon('clock', 13)} ${lesson.duration || `${lesson.durationMinutes || 20} ${tr('мин', 'дақ', 'min')}`}</span>
      </div>
      <header>
        <span class="px-2.5 py-1 rounded-full bg-coral-50 text-[#FF5B45] text-xs font-bold">${String(lesson.level).toUpperCase()} · ${esc(lesson.skill || 'English')}</span>
        <h1 class="text-2xl sm:text-3xl font-black text-gray-950 mt-2 sm:mt-3 leading-tight">${esc(lesson.title)}</h1>
        <p class="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">${esc(lesson.description || content.overview || '')}</p>
      </header>
      <section class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-8 space-y-4 sm:space-y-5 shadow-sm">
        <h2 class="text-lg sm:text-xl font-bold">${tr('Материал урока', 'Маводи дарс', 'Lesson Material')}</h2>
        ${courseSections}
        ${(content.grammarRules || []).map((rule) => `<div class="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50"><b class="text-sm sm:text-base">${esc(rule.rule)}</b><p class="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">${esc(rule.example)}</p></div>`).join('')}
        ${(content.vocabulary || []).length ? `<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${content.vocabulary.map((word) => `<div class="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50"><b>${esc(word.word)}</b><small class="block text-gray-500">${esc(word.meaning)}</small><p class="text-xs sm:text-sm mt-1.5">${esc(word.example)}</p></div>`).join('')}</div>` : ''}
        ${(content.tips || []).map((tip) => `<p class="p-3 rounded-xl bg-amber-50 text-amber-900 text-xs sm:text-sm">✦ ${esc(tip)}</p>`).join('')}
      </section>
      <section class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-8 shadow-sm">
        <h2 class="text-lg sm:text-xl font-bold">${tr('Практические упражнения', 'Машқҳои амалӣ', 'Practice Exercises')}</h2>
        <p class="text-xs sm:text-sm text-gray-500 mt-1 mb-4 sm:mb-5">${tr('Ответьте на вопросы и проверьте себя.', 'Ба саволҳо ҷавоб диҳед ва худро бисанҷед.', 'Answer the questions and check your comprehension.')}</p>
        <div class="space-y-4 sm:space-y-5">
          ${exercises.map((question, index) => `
            <div class="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50">
              <p class="font-semibold text-xs sm:text-sm text-gray-900 leading-snug">${index + 1}. ${esc(question.question || question.prompt || '')}</p>
              ${question.options?.length ? `
                <div class="mt-3 grid gap-2">
                  ${question.options.map((option) => `<label class="flex items-center gap-2.5 p-2.5 rounded-lg bg-white text-xs sm:text-sm cursor-pointer shadow-sm"><input type="radio" name="${esc(question.id)}" value="${esc(option)}" data-lesson-answer="${esc(question.id)}" ${state.lessonAnswers[question.id] === option ? 'checked' : ''}><span>${esc(option)}</span></label>`).join('')}
                </div>
              ` : `
                <input data-lesson-answer="${esc(question.id)}" class="w-full mt-3 rounded-xl border border-gray-200 p-2.5 text-base sm:text-sm bg-white" value="${esc(state.lessonAnswers[question.id] || '')}">
              `}
              ${state.lessonChecked ? `<p class="mt-2 text-xs ${state.lessonAnswers[question.id] === question.correctAnswer ? 'text-emerald-700 font-bold' : 'text-rose-600'}">${state.lessonAnswers[question.id] === question.correctAnswer ? tr('Верно ✓', 'Дуруст ✓', 'Correct ✓') : tr('Ответ', 'Ҷавоб', 'Answer') + ': ' + esc(question.correctAnswer || '—')} · ${esc(question.explanation || '')}</p>` : ''}
            </div>
          `).join('')}
        </div>
        <button data-action="check-lesson" class="mt-5 w-full sm:w-auto bg-[#FF5B45] hover:bg-[#E6432A] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors shadow-sm">${tr('Проверить ответы', 'Санҷидани ҷавобҳо', 'Check answers')}</button>
      </section>
      <div class="text-center pt-2">
        <button data-action="complete-lesson" data-lesson-id="${esc(lesson.id)}" class="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-colors shadow-md">
          ${state.completedLessons[lesson.id] ? tr('Урок пройден! ✓', 'Дарс анҷом ёфт! ✓', 'Lesson completed! ✓') : tr('Завершить урок', 'Анҷом додани дарс', 'Complete lesson')}
        </button>
      </div>
    </div>
  `;
}

function vocabularyPage() {
  const params = new URLSearchParams(location.search);
  const selected = params.get('level') || 'ALL';
  const search = params.get('q') || '';
  const list = state.words.filter((w) => (selected === 'ALL' || w.level === selected) && `${w.word} ${w.translation} ${w.exampleEn} ${state.tajikWords[w.id]?.meaning || ''}`.toLowerCase().includes(search.toLowerCase()));
  const learned = readJson('englishprep_learned_words', {});
  return `
    <div class="space-y-6 sm:space-y-8 pb-12">
      <header>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral-50 text-[#FF5B45] text-xs font-semibold mb-2">${icon('words', 14)} ${tr('Академический и общий вокабуляр', 'Луғати академӣ ва умумӣ', 'Academic & General Vocabulary')}</div>
        <h1 class="text-2xl sm:text-4xl font-black text-gray-950">${tr('Словарь IELTS', 'Луғати IELTS', 'IELTS Vocabulary')}</h1>
        <p class="text-xs sm:text-sm text-gray-500 mt-1">${tr('Лексика по уровням A1–C2 с транскрипцией и примерами.', 'Калимаҳои сатҳҳои A1–C2 бо талаффуз ва мисолҳо.', 'A1–C2 vocabulary with phonetics and sample usage.')}</p>
      </header>
      
      <!-- Search and Level Filter Bar -->
      <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        <div class="relative flex-1 max-w-md">
          <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">${icon('search', 16)}</span>
          <input id="word-search" value="${esc(search)}" placeholder="${tr('Поиск по слову, переводу или примеру...', 'Ҷустуҷӯи калима, тарҷума ё мисол...', 'Search word, translation, or example...')}" class="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white rounded-xl sm:rounded-2xl border border-gray-200 text-base sm:text-sm shadow-sm focus:outline-none focus:border-[#FF5B45] transition-colors">
        </div>
        <div class="flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          ${['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((l) => `
            <button data-route="/vocabulary?level=${l}${search ? `&q=${encodeURIComponent(search)}` : ''}" class="whitespace-nowrap px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all shrink-0 ${selected === l ? 'bg-[#FF5B45] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}">
              ${l === 'ALL' ? tr('Все уровни', 'Ҳамаи сатҳҳо', 'All Levels') : l}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Word Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        ${list.map((w) => {
          const tg = state.tajikWords[w.id] || {};
          let meaningText = w.translation;
          let exampleTrans = w.exampleRu;
          if (state.language === 'tg') {
            meaningText = tg.meaning || w.translation;
            exampleTrans = tg.example || w.exampleRu;
          } else if (state.language === 'en') {
            meaningText = w.translationEn || w.translation;
            exampleTrans = w.exampleEn;
          }
          return `
            <article class="bg-white rounded-2xl sm:rounded-3xl border ${learned[w.id] ? 'border-emerald-200 bg-emerald-50/20' : 'border-gray-100'} p-4 sm:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-start gap-2">
                  <div class="flex items-center gap-2">
                    <h3 class="text-lg sm:text-xl font-black">${esc(w.word)}</h3>
                    <button data-action="speak" data-word="${esc(w.word)}" title="${tr('Произнести', 'Талаффуз', 'Pronounce')}" class="text-gray-400 hover:text-[#FF5B45] p-1 rounded-lg">${icon('sound', 16)}</button>
                  </div>
                  <span class="text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full bg-gray-100 shrink-0">${w.level}</span>
                </div>
                <div class="text-xs text-gray-400 font-mono my-1.5 sm:my-2">${esc(w.phonetics)} · ${w.partOfSpeech}</div>
                <p class="text-xs sm:text-sm font-bold text-gray-800 mb-3 sm:mb-4">${esc(meaningText)}</p>
                <div class="p-3 rounded-xl sm:rounded-2xl bg-[#F8F9FA] text-xs space-y-1">
                  <p class="text-gray-700 leading-snug">“${esc(w.exampleEn)}”</p>
                  <p class="text-gray-400 italic leading-snug">${esc(exampleTrans)}</p>
                </div>
              </div>
              <button data-action="learn-word" data-word-id="${esc(w.id)}" class="mt-4 sm:mt-5 pt-3 border-t border-gray-50 flex items-center gap-2 text-xs font-semibold ${learned[w.id] ? 'text-emerald-700' : 'text-gray-600'}">
                ${icon('check', 14)} ${learned[w.id] ? tr('Выучено', 'Омӯхта шуд', 'Learned') : tr('Отметить как выученное', 'Ҳамчун омӯхташуда қайд кардан', 'Mark as learned')}
              </button>
            </article>
          `;
        }).join('') || `<div class="col-span-full text-center py-16 bg-white rounded-3xl border border-gray-100"><h3 class="font-bold text-gray-700">${tr('Слов не найдено', 'Калима ёфт нашуд', 'No words found')}</h3></div>`}
      </div>
    </div>
  `;
}

function testsPage() {
  const list = state.tests.filter((t) => t.skill === state.activeSkill);
  return `
    <div class="space-y-6 sm:space-y-8 pb-12">
      <header>
        <h1 class="text-2xl sm:text-4xl font-black text-gray-950">${tr('Пробные тесты IELTS', 'Санҷишҳои машқии IELTS', 'IELTS Practice Tests')}</h1>
        <p class="text-xs sm:text-sm text-gray-500 mt-1">${tr('Выберите тип теста и начните практику.', 'Навъи санҷишро интихоб карда, машқро оғоз кунед.', 'Select a test type and begin practicing.')}</p>
      </header>

      <!-- Practice Banner -->
      <div class="rounded-2xl sm:rounded-3xl border border-rose-100 bg-rose-50/60 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 class="font-extrabold text-gray-900 text-sm sm:text-base">${tr('Полная тренировка IELTS', 'Машқи пурраи IELTS', 'Full IELTS Practice')}</h3>
          <p class="text-xs text-gray-500 mt-0.5 sm:mt-1">${tr('Выберите один из тестов по четырём навыкам.', 'Аз санҷишҳои чор маҳорат якеро интихоб кунед.', 'Choose one of the tests across all four skills.')}</p>
        </div>
        <button data-route="/tests" class="bg-[#FF5B45] hover:bg-[#E6432A] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors shrink-0 shadow-sm self-stretch sm:self-auto text-center">${tr('Выбрать тест', 'Интихоби санҷиш', 'Choose test')} →</button>
      </div>

      <!-- Skill Selector Bar -->
      <div class="flex gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        ${['reading', 'listening', 'writing', 'speaking'].map((skill, i) => `
          <button data-action="skill" data-skill="${skill}" class="whitespace-nowrap flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 ${state.activeSkill === skill ? ['bg-blue-500', 'bg-red-500', 'bg-orange-500', 'bg-amber-500'][i] + ' text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}">
            ${icon(['book', 'sound', 'tests', 'mic'][i], 16)} ${skillName(skill)} <span class="text-xs px-2 py-0.5 rounded-full bg-black/10">${state.tests.filter((t) => t.skill === skill).length}</span>
          </button>
        `).join('')}
      </div>

      <div class="flex items-center justify-between gap-3">
        <div>
          <h2 class="text-xl sm:text-2xl font-black">${tr('Тесты', 'Санҷишҳо', 'Tests')} ${skillName(state.activeSkill)}</h2>
          <p class="text-xs text-gray-400">${list.length} ${tr('тестов', 'санҷиш', 'tests')}</p>
        </div>
        ${state.activeSkill === 'writing' ? `
          <select id="writing-filter" class="bg-white border border-gray-200 rounded-xl p-2 text-xs sm:text-sm">
            <option value="all">${tr('Все типы', 'Ҳамаи навъҳо', 'All types')}</option>
            ${[...new Set(list.flatMap((t) => t.tags || []))].map((tag) => `<option value="${esc(tag)}">${esc(tag)}</option>`).join('')}
          </select>
        ` : ''}
      </div>

      <!-- Test Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        ${list.filter((t) => state.activeSkill !== 'writing' || state.writingFilter === 'all' || (t.tags || []).includes(state.writingFilter)).map((t) => `
          <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start gap-2">
                <div>
                  <span class="text-[10px] sm:text-[11px] font-bold uppercase text-gray-400">${esc(t.type || t.difficulty || 'IELTS')}</span>
                  <h3 class="text-base sm:text-lg font-bold mt-0.5">${esc(t.title)}</h3>
                </div>
                <span class="px-2 py-1 rounded-full bg-gray-100 text-[11px] font-semibold shrink-0">${t.durationMinutes} ${tr('мин', 'дақ', 'min')}</span>
              </div>
              <p class="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 leading-relaxed">${esc(t.description || 'IELTS practice test')}</p>
            </div>
            <div class="flex items-center justify-between mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-50 text-xs text-gray-500">
              <span>${t.questions?.length || t.totalQuestions || 0} ${tr('вопросов', 'савол', 'questions')}</span>
              <button data-route="/tests/${t.skill}/${t.id}" class="bg-[#FF5B45] hover:bg-[#E6432A] text-white rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-bold text-xs sm:text-sm transition-colors shadow-sm">${tr('Начать', 'Оғоз кардан', 'Start')} →</button>
            </div>
          </article>
        `).join('') || `<p class="text-gray-500 text-sm">${tr('Тесты не найдены.', 'Санҷиш ёфт нашуд.', 'No tests found.')}</p>`}
      </div>
    </div>
  `;
}

function testDetailPage(skill, id) {
  const test = state.tests.find((t) => t.id === id) || null;
  if (!test) return `<div class="text-center py-20"><h2 class="text-xl sm:text-2xl font-bold">${tr('Тест не найден', 'Санҷиш ёфт нашуд', 'Test not found')}</h2><button data-route="/tests" class="mt-5 text-[#FF5B45] font-semibold">${tr('Вернуться к тестам', 'Бозгашт ба санҷишҳо', 'Back to tests')}</button></div>`;
  if (!state.testTimeLeft) state.testTimeLeft = (test.durationMinutes || 60) * 60;
  if (!state.testSubmitted && !state.timerId) {
    state.timerId = setInterval(() => {
      if (state.testTimeLeft > 0) {
        state.testTimeLeft--;
        const clock = document.querySelector('#test-clock');
        if (clock) clock.textContent = formatTime(state.testTimeLeft);
      } else submitTest(test);
    }, 1000);
  }
  const questions = test.questions || [];
  const score = questions.length ? questions.filter((q) => state.testAnswers[q.id] === q.correctAnswer).length : 0;
  const writingTasks = test.writingTasks || null;
  const speakingParts = test.speakingParts || [];
  const speakingQuestions = speakingParts.flatMap((part) => part.questions || []);
  const taskMarkup = writingTasks ? ['task1', 'task2'].map((key, index) => {
    const task = writingTasks[key];
    if (!task) return '';
    return `
      <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm">
        <div class="flex justify-between items-center">
          <b class="text-sm sm:text-base">${tr('Задание', 'Супориш', 'Task')} ${index + 1}</b>
          <span class="text-xs text-gray-400">${task.minWords || 150} ${tr('слов минимум', 'калима ҳадди ақал', 'words minimum')}</span>
        </div>
        <p class="text-xs sm:text-sm leading-relaxed mt-3 text-gray-700">${esc(task.prompt)}</p>
        <textarea data-test-answer="${key}" class="w-full min-h-[140px] sm:min-h-[180px] mt-3 rounded-xl border border-gray-200 p-3 text-base sm:text-sm focus:outline-none focus:border-[#FF5B45]" placeholder="${tr('Введите ответ на английском...', 'Ҷавоби худро ба англисӣ нависед...', 'Write your answer in English...')}">${esc(state.testAnswers[key] || '')}</textarea>
        <p class="text-xs text-gray-400 mt-1">${(state.testAnswers[key] || '').trim().split(/\s+/).filter(Boolean).length} ${tr('слов', 'калима', 'words')}</p>
        ${task.sampleAnswer && state.testSubmitted ? `<details class="mt-3 text-xs sm:text-sm"><summary class="cursor-pointer font-semibold text-[#FF5B45]">${tr('Пример ответа', 'Намунаи ҷавоб', 'Sample Answer')}</summary><p class="mt-2 text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl">${esc(task.sampleAnswer)}</p></details>` : ''}
      </article>
    `;
  }).join('') : '';
  const speakingMarkup = speakingQuestions.length ? `
    <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm">
      <h3 class="font-bold text-sm sm:text-base">${tr('Задания для Speaking', 'Супоришҳои Speaking', 'Speaking Prompts')}</h3>
      <ol class="list-decimal pl-5 mt-3 space-y-2 text-xs sm:text-sm text-gray-700">${speakingQuestions.map((q) => `<li>${esc(q)}</li>`).join('')}</ol>
      <textarea data-test-answer="speakingResponse" class="w-full min-h-[130px] sm:min-h-[160px] mt-3 rounded-xl border border-gray-200 p-3 text-base sm:text-sm focus:outline-none focus:border-[#FF5B45]" placeholder="${tr('Запиши свои заметки или ответ на английском...', 'Ёддошт ё ҷавобро ба англисӣ нависед...', 'Write your notes or response in English...')}">${esc(state.testAnswers.speakingResponse || '')}</textarea>
    </article>
  ` : '';
  const audioMarkup = test.audioInfo ? `
    <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm">
      <h3 class="font-bold text-sm sm:text-base">${esc(test.audioInfo.title || tr('Аудиопрактика', 'Машқи шунавоӣ', 'Audio Practice'))}</h3>
      <p class="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">${esc(test.audioInfo.description || '')}</p>
      ${test.audioInfo.audioUrl ? `<audio controls class="w-full mt-3.5" src="${esc(test.audioInfo.audioUrl)}"></audio>` : ''}
    </article>
  ` : '';
  return `
    <div class="space-y-6 sm:space-y-8 pb-16 max-w-5xl mx-auto">
      <!-- Sticky Timer & Navigation Bar -->
      <div class="sticky top-0 z-30 bg-[#F8F9FA]/95 backdrop-blur-md flex items-center justify-between border-b border-gray-200 py-3 -mx-4 px-4 sm:mx-0 sm:px-0">
        <button data-route="/tests" class="text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1">← <span>${tr('К тестам', 'Ба санҷишҳо', 'Back to tests')}</span></button>
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-400 hidden sm:inline">${tr('Осталось времени:', 'Вақти боқимонда:', 'Time left:')}</span>
          <span id="test-clock" class="font-mono font-bold text-[#FF5B45] bg-coral-50 border border-coral-200 px-3 py-1 rounded-full text-xs sm:text-sm">${formatTime(state.testTimeLeft)}</span>
        </div>
      </div>

      <header>
        <span class="text-xs uppercase font-bold text-[#FF5B45]">${skillName(test.skill)} · ${test.durationMinutes} ${tr('минут', 'дақиқа', 'minutes')}</span>
        <h1 class="text-xl sm:text-3xl font-black mt-1 sm:mt-2 text-gray-950">${esc(test.title)}</h1>
        <p class="text-xs sm:text-sm text-gray-500 mt-1.5">${esc(test.description || '')}</p>
      </header>

      ${state.testSubmitted ? `
        <div class="bg-emerald-600 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md">
          <span class="text-xs uppercase font-bold tracking-wider">${tr('Результат', 'Натиҷа', 'Result')}</span>
          <h2 class="text-2xl sm:text-3xl font-black mt-1">${state.lastTestBand ? `${state.lastTestBand} Band` : tr('Ответ сохранён', 'Ҷавоб сабт шуд', 'Response saved')}</h2>
          ${questions.length ? `<p class="mt-1 text-sm text-emerald-100">${score}/${questions.length} ${tr('правильных ответов', 'ҷавоби дуруст', 'correct answers')}</p>` : ''}
          <button data-action="reset-test" class="mt-4 bg-white text-emerald-700 px-5 py-2 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-95">${tr('Пройти заново', 'Аз нав гузаштан', 'Retake test')}</button>
        </div>
      ` : `
        <div class="grid lg:grid-cols-2 gap-4 sm:gap-5">
          ${test.passage ? `
            <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-6 h-fit lg:sticky lg:top-16 shadow-sm">
              <details class="group" open>
                <summary class="flex items-center justify-between font-bold cursor-pointer select-none text-gray-900 pb-2">
                  <span class="flex items-center gap-2">
                    ${icon('book', 18)}
                    <span>${tr('Текст для чтения', 'Матни хониш', 'Reading Passage')}</span>
                  </span>
                  <span class="text-xs text-[#FF5B45] font-semibold lg:hidden group-open:hidden">${tr('Развернуть', 'Кушодан', 'Show text')} ▼</span>
                  <span class="text-xs text-[#FF5B45] font-semibold lg:hidden hidden group-open:inline">${tr('Свернуть', 'Пӯшидан', 'Hide text')} ▲</span>
                </summary>
                <div class="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line mt-3 pt-3 border-t border-gray-100 max-h-[45vh] lg:max-h-[72vh] overflow-y-auto pr-1">
                  ${esc(test.passage)}
                </div>
              </details>
            </article>
          ` : ''}
          <section class="space-y-4">
            ${audioMarkup}
            ${questions.map((q, i) => `
              <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm">
                <p class="font-bold text-sm sm:text-base text-gray-900">${i + 1}. ${esc(q.prompt || q.question || '')}</p>
                ${q.options?.length ? `
                  <div class="grid gap-2 mt-3">
                    ${q.options.map((opt) => `
                      <label class="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 hover:bg-gray-100/80 cursor-pointer text-xs sm:text-sm transition-colors">
                        <input type="radio" name="${esc(q.id)}" value="${esc(opt)}" data-test-answer="${esc(q.id)}" ${state.testAnswers[q.id] === opt ? 'checked' : ''} class="mt-0.5">
                        <span class="text-gray-800 leading-snug">${esc(opt)}</span>
                      </label>
                    `).join('')}
                  </div>
                ` : `<input data-test-answer="${esc(q.id)}" class="w-full mt-3 rounded-xl border border-gray-200 p-2.5 text-base sm:text-sm" value="${esc(state.testAnswers[q.id] || '')}">`}
              </article>
            `).join('')}
            ${taskMarkup}
            ${speakingMarkup}
            ${!questions.length && !writingTasks && !speakingMarkup ? `<p class="bg-white p-5 rounded-2xl text-sm">${esc(test.audioInfo?.description || tr('В этом разделе выполните задание.', 'Супориши иншоро иҷро кунед.', 'Complete the task in this section.'))}</p>` : ''}
            <button data-action="submit-test" data-test-id="${esc(test.id)}" class="w-full bg-[#FF5B45] hover:bg-[#E6432A] text-white py-3.5 rounded-full font-bold text-sm sm:text-base transition-colors shadow-md">${tr('Завершить тест', 'Анҷом додани санҷиш', 'Submit test')}</button>
          </section>
        </div>
      `}
    </div>
  `;
}

function formatTime(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function toBand(ratio) {
  if (ratio >= 0.95) return 9;
  if (ratio >= 0.88) return 8.5;
  if (ratio >= 0.8) return 8;
  if (ratio >= 0.72) return 7.5;
  if (ratio >= 0.65) return 7;
  if (ratio >= 0.58) return 6.5;
  if (ratio >= 0.5) return 6;
  if (ratio >= 0.42) return 5.5;
  if (ratio >= 0.35) return 5;
  if (ratio >= 0.28) return 4.5;
  if (ratio >= 0.2) return 4;
  return 3.5;
}

function submitTest(test) {
  if (state.testSubmitted) return;
  const qs = test.questions || [];
  const correct = qs.filter((q) => state.testAnswers[q.id] === q.correctAnswer).length;
  const band = qs.length ? toBand(correct / qs.length) : null;
  state.testSubmitted = true;
  state.lastTestBand = band;
  const result = { testId: test.id, title: test.title, skill: test.skill, score: band, correct, total: qs.length, answers: { ...state.testAnswers }, completedAt: new Date().toISOString() };
  state.results.unshift(result);
  localStorage.setItem('englishprep_test_results', JSON.stringify(state.results));
  if (state.token && qs.length) api(`/tests/${encodeURIComponent(test.id)}/submit`, { method: 'POST', body: JSON.stringify({ answers: state.testAnswers }) }).catch(() => {});
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
  render();
}

function statisticsPage() {
  const scored = state.results.filter((result) => typeof result.score === 'number' && Number.isFinite(result.score));
  const average = scored.length ? (scored.reduce((sum, result) => sum + result.score, 0) / scored.length).toFixed(1) : '—';
  const skills = ['reading', 'listening', 'writing', 'speaking'];
  return `
    <div class="space-y-6 sm:space-y-8 pb-12">
      <header>
        <div class="text-xs font-semibold text-[#FF5B45] mb-2">${tr('Аналитика и прогресс', 'Таҳлил ва пешрафт', 'Analytics & Progress')}</div>
        <h1 class="text-2xl sm:text-4xl font-black">${tr('Статистика обучения', 'Омори омӯзиш', 'Learning Statistics')}</h1>
        <p class="text-xs sm:text-sm text-gray-500 mt-1">${tr('Ваши реальные результаты по пройденным заданиям.', 'Натиҷаҳои воқеии машқҳои гузаронидашуда.', 'Your real performance and test records.')}</p>
      </header>

      <!-- 4 Key Metrics Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        ${[
          [state.results.length, tr('Пройдено тестов', 'Санҷишҳои гузашта', 'Tests Completed')],
          [average, tr('Средний Band', 'Холи миёна', 'Average Band')],
          [Object.values(state.completedLessons).filter(Boolean).length, tr('Уроков пройдено', 'Дарсҳои гузашта', 'Lessons Done')],
          [state.user?.targetBand || 7, tr('Целевой балл', 'Холи мақсаднок', 'Target Score')],
        ].map(([v, l]) => `
          <div class="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-gray-100 shadow-sm">
            <span class="text-[11px] sm:text-xs text-gray-400 block truncate">${l}</span>
            <p class="text-2xl sm:text-3xl font-black text-gray-900 mt-1 sm:mt-2">${v}</p>
          </div>
        `).join('')}
      </div>

      <!-- Skill Breakdown -->
      <div class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-8 shadow-sm">
        <h2 class="text-lg sm:text-xl font-black mb-4 sm:mb-6">${tr('Результаты по навыкам', 'Натиҷа аз рӯйи маҳорат', 'Breakdown by Skill')}</h2>
        <div class="space-y-4 sm:space-y-5">
          ${skills.map((skill) => {
            const scores = state.results.filter((r) => r.skill === skill && typeof r.score === 'number');
            const val = scores.length ? (scores.reduce((sum, r) => sum + r.score, 0) / scores.length) : 0;
            return `
              <div>
                <div class="flex justify-between text-xs sm:text-sm mb-1.5 sm:mb-2">
                  <span class="font-medium text-gray-700">${skillName(skill)}</span>
                  <b class="font-bold text-gray-900">${scores.length ? val.toFixed(1) : '—'}</b>
                </div>
                <div class="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div class="h-2 rounded-full bg-[#FF5B45]" style="width:${(val / 9) * 100}%"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Recent Attempts List -->
      <div class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-sm">
        <h2 class="font-bold text-base sm:text-lg mb-3 sm:mb-4">${tr('Последние попытки', 'Кӯшишҳои охирин', 'Recent Attempts')}</h2>
        <div class="divide-y divide-gray-50">
          ${state.results.slice(0, 8).map((result) => `
            <div class="flex flex-col sm:flex-row sm:items-center justify-between py-3 text-xs sm:text-sm gap-1 sm:gap-4">
              <span class="text-gray-800 font-medium">${esc(result.title)} · <span class="text-gray-500">${skillName(result.skill)}</span></span>
              <b class="text-[#FF5B45] font-bold self-start sm:self-auto">${typeof result.score === 'number' ? `${result.score} Band` : tr('Ответ сохранён', 'Ҷавоб сабт шуд', 'Saved')}</b>
            </div>
          `).join('') || `<p class="text-xs sm:text-sm text-gray-500 py-4">${tr('Пройдите первый тест, чтобы увидеть результаты.', 'Барои дидани натиҷаҳо аввалин санҷишро гузаред.', 'Take your first test to see results.')}</p>`}
        </div>
      </div>
    </div>
  `;
}

function profilePage() {
  const u = state.user || {};
  return `
    <div class="space-y-5 sm:space-y-6 pb-16 max-w-5xl mx-auto">
      <!-- Profile Header Banner -->
      <div class="bg-gradient-to-r from-[#FF5B45] via-[#FF6048] to-[#FF5B45] rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5">
        <img src="/logo.png" alt="EnglishPrep" class="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shadow-md ring-2 ring-white/30 shrink-0" style="border-radius: 50%;">
        <div>
          <span class="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white/80">${tr('ТВОЙ АККАУНТ', 'ҲИСОБИ ШУМО', 'YOUR ACCOUNT')}</span>
          <h1 class="text-xl sm:text-3xl font-black mt-0.5 sm:mt-1">${esc(u.name || tr('Пользователь', 'Корбар', 'User'))}</h1>
          <p class="text-xs sm:text-sm text-white/90">${esc(u.email || '')}</p>
        </div>
      </div>

      <!-- Settings Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <section class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-sm">
          <h2 class="text-base sm:text-lg font-extrabold mb-4 sm:mb-5">${tr('Личные данные', 'Маълумоти шахсӣ', 'Personal Details')}</h2>
          <form id="profile-form" class="space-y-4">
            <label class="block text-xs sm:text-sm font-semibold text-gray-700">
              ${tr('Имя', 'Ном', 'Name')}
              <input name="name" value="${esc(u.name || '')}" class="block w-full mt-1 p-2.5 sm:p-3 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#FF5B45] transition-colors">
            </label>
            <label class="block text-xs sm:text-sm font-semibold text-gray-700">
              Email
              <input value="${esc(u.email || '')}" disabled class="block w-full mt-1 p-2.5 sm:p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed text-base sm:text-sm">
            </label>
            <label class="block text-xs sm:text-sm font-semibold text-gray-700">
              ${tr('Целевой балл IELTS', 'Холи мақсадноки IELTS', 'Target IELTS Band')}
              <input name="targetBand" type="number" min="4" max="9" step="0.5" value="${esc(u.targetBand || u.target_band || 7)}" class="block w-full mt-1 p-2.5 sm:p-3 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#FF5B45] transition-colors">
            </label>
            <label class="block text-xs sm:text-sm font-semibold text-gray-700">
              ${tr('Дата экзамена', 'Санаи имтиҳон', 'Exam Date')}
              <input name="examDate" type="date" value="${esc(u.examDate || u.ielts_date || '')}" class="block w-full mt-1 p-2.5 sm:p-3 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#FF5B45] transition-colors">
            </label>
            <button type="submit" class="w-full sm:w-auto bg-[#FF5B45] hover:bg-[#E6432A] text-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-colors shadow-sm min-h-[40px]">${tr('Сохранить', 'Сабт кардан', 'Save changes')}</button>
          </form>
        </section>

        <section class="space-y-4 sm:space-y-5">
          <div class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-sm">
            <h2 class="font-extrabold text-sm sm:text-base mb-3 sm:mb-4">${tr('Настройки', 'Танзимот', 'Settings')}</h2>
            <div class="flex justify-between items-center">
              <span class="text-xs sm:text-sm font-bold text-gray-700">${tr('Язык сайта', 'Забони сомона', 'Site language')}</span>
              ${languageToggle()}
            </div>
          </div>
          <div class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-sm">
            <h2 class="font-extrabold text-sm sm:text-base">${tr('Поддержка', 'Дастгирӣ', 'Support')}</h2>
            <a href="mailto:support@englishprep.com" class="text-xs sm:text-sm text-[#FF5B45] block mt-2 font-medium">support@englishprep.com</a>
          </div>
          <button data-action="logout" class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-colors min-h-[44px]">
            ${tr('Выйти', 'Баромадан', 'Log out')}
          </button>
        </section>
      </div>
    </div>
  `;
}

function render() {
  document.documentElement.lang = state.language;
  const path = location.pathname;
  if (path === '/') { root.innerHTML = homePage(); return; }
  if (path === '/auth' && state.token && state.user) { history.replaceState({}, '', '/dashboard'); return render(); }
  if (path === '/auth') { root.innerHTML = authPage(); return; }
  if (!state.token || !state.user) { history.replaceState({}, '', '/auth'); root.innerHTML = authPage(); return; }
  let content = '';
  if (path === '/dashboard') content = dashboardPage();
  else if (path === '/lessons') content = lessonsPage();
  else if (path.startsWith('/lessons/')) content = lessonDetailPage(decodeURIComponent(path.split('/').pop()));
  else if (path === '/vocabulary') content = vocabularyPage();
  else if (path === '/tests') content = testsPage();
  else if (path.startsWith('/tests/')) { const [, , skill, id] = path.split('/'); content = testDetailPage(skill, decodeURIComponent(id)); }
  else if (path === '/statistics') content = statisticsPage();
  else if (path === '/profile') content = profilePage();
  else content = dashboardPage();
  root.innerHTML = appShell(content);
  if (path.startsWith('/tests/')) {
    const clock = document.querySelector('#test-clock');
    if (clock) clock.textContent = formatTime(state.testTimeLeft);
  }
}

async function submitAuth(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  state.authError = '';
  try {
    const endpoint = state.authMode === 'register' ? '/auth/register' : '/auth/login';
    const response = await api(endpoint, { method: 'POST', body: JSON.stringify({ name: values.name, email: values.email, password: values.password, language: state.language }) });
    state.token = response.accessToken || response.token || '';
    state.user = { ...response.user, language: state.language };
    localStorage.setItem('englishprep_token', state.token);
    localStorage.setItem('englishprep_user', JSON.stringify(state.user));
    nav('/dashboard');
  } catch (error) {
    state.authError = error.message;
    render();
  }
}

async function handleGoogleLogin() {
  state.authError = '';
  const promptText = tr(
    'Введите Google Email для быстрого входа:',
    'Email-и Google-ро барои воридшавӣ ворид намоед:',
    'Enter your Google Email to continue:'
  );
  const email = prompt(promptText, 'edfoevkhurshed111@gmail.com');
  if (!email || !email.trim()) return;

  const normalizedEmail = email.trim();
  const userName = normalizedEmail.split('@')[0];

  try {
    const response = await api('/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        email: normalizedEmail,
        name: userName,
        language: state.language,
      }),
    });
    state.token = response.accessToken || response.token || 'google_token_' + Date.now();
    state.user = { ...response.user, language: state.language };
    localStorage.setItem('englishprep_token', state.token);
    localStorage.setItem('englishprep_user', JSON.stringify(state.user));
    nav('/dashboard');
  } catch (error) {
    // If backend is unreachable, gracefully fallback to local demo session
    const mockUser = {
      id: 999,
      name: userName.charAt(0).toUpperCase() + userName.slice(1),
      email: normalizedEmail,
      language: state.language,
      targetBand: 7.5,
    };
    state.token = 'google_demo_' + Date.now();
    state.user = mockUser;
    localStorage.setItem('englishprep_token', state.token);
    localStorage.setItem('englishprep_user', JSON.stringify(state.user));
    nav('/dashboard');
  }
}

async function saveProfile(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  state.user = { ...state.user, name: values.name, targetBand: Number(values.targetBand), target_band: Number(values.targetBand), examDate: values.examDate, ielts_date: values.examDate };
  localStorage.setItem('englishprep_user', JSON.stringify(state.user));
  api('/user/profile', { method: 'PUT', body: JSON.stringify({ name: values.name, target_band: Number(values.targetBand), ielts_date: values.examDate, language: state.language }) }).catch(() => {});
  render();
}

// Global click handler for actions and closing dropdown when clicking outside
document.addEventListener('click', (event) => {
  const dropdownEl = event.target.closest('.language-dropdown');
  if (!dropdownEl && state.langMenuOpen) {
    state.langMenuOpen = false;
    render();
    return;
  }

  const button = event.target.closest('[data-route],[data-action]');
  if (!button) return;

  const route = button.dataset.route;
  if (route) {
    if (button.dataset.authMode) state.authMode = button.dataset.authMode;
    event.preventDefault();
    nav(route);
    return;
  }

  const action = button.dataset.action;
  if (action === 'toggle-lang-menu') {
    state.langMenuOpen = !state.langMenuOpen;
    render();
  } else if (action === 'set-language') {
    setLang(button.dataset.language);
  } else if (action === 'google-login') {
    handleGoogleLogin();
  } else if (action === 'toggle-auth') {
    state.authMode = state.authMode === 'login' ? 'register' : 'login';
    state.authError = '';
    render();
  } else if (action === 'landing-menu') {
    state.landingMenuOpen = !state.landingMenuOpen;
    render();
  } else if (action === 'close-landing-menu') {
    state.landingMenuOpen = false;
    render();
  } else if (action === 'mobile-menu') {
    state.mobileOpen = !state.mobileOpen;
    render();
  } else if (action === 'close-menu') {
    state.mobileOpen = false;
    render();
  } else if (action === 'skill') {
    state.activeSkill = button.dataset.skill;
    state.writingFilter = 'all';
    render();
  } else if (action === 'learn-word') {
    const learned = readJson('englishprep_learned_words', {});
    learned[button.dataset.wordId] = !learned[button.dataset.wordId];
    localStorage.setItem('englishprep_learned_words', JSON.stringify(learned));
    render();
  } else if (action === 'speak') {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(button.dataset.word);
      u.lang = 'en-US';
      speechSynthesis.speak(u);
    }
  } else if (action === 'check-lesson') {
    state.lessonAnswers = { ...state.lessonAnswers };
    state.lessonChecked = true;
    render();
  } else if (action === 'complete-lesson') {
    const id = button.dataset.lessonId;
    state.completedLessons[id] = true;
    localStorage.setItem('englishprep_completed_lessons', JSON.stringify(state.completedLessons));
    api(`/lessons/${encodeURIComponent(id)}/complete`, { method: 'POST', body: JSON.stringify({ score: lessonScore(id) }) }).catch(() => {});
    render();
  } else if (action === 'submit-test') {
    const id = button.dataset.testId;
    const test = state.tests.find((t) => t.id === id);
    if (test) submitTest(test);
  } else if (action === 'reset-test') {
    state.testAnswers = {};
    state.testSubmitted = false;
    state.testTimeLeft = 0;
    nav(location.pathname);
  } else if (action === 'logout') {
    state.token = '';
    state.user = null;
    localStorage.removeItem('englishprep_token');
    localStorage.removeItem('englishprep_user');
    nav('/auth');
  }
});

root.addEventListener('change', (event) => {
  const el = event.target;
  if (el.matches('[data-test-answer]')) {
    state.testAnswers[el.dataset.testAnswer] = el.value;
  }
  if (el.matches('[data-lesson-answer]')) {
    state.lessonAnswers[el.dataset.lessonAnswer] = el.value;
  }
  if (el.id === 'writing-filter') {
    state.writingFilter = el.value;
    render();
  }
});

root.addEventListener('input', (event) => {
  const el = event.target;
  if (el.matches('[data-test-answer], [data-lesson-answer]')) {
    const key = el.dataset.testAnswer || el.dataset.lessonAnswer;
    const target = el.hasAttribute('data-test-answer') ? state.testAnswers : state.lessonAnswers;
    target[key] = el.value;
  }
  if (el.id === 'word-search') {
    const url = new URL(location.href);
    url.searchParams.set('q', el.value);
    history.replaceState({}, '', url);
    const start = el.selectionStart;
    render();
    const input = document.querySelector('#word-search');
    input?.focus();
    input?.setSelectionRange(start, start);
  }
});

root.addEventListener('submit', (event) => {
  event.preventDefault();
  if (event.target.id === 'auth-form') submitAuth(event.target);
  if (event.target.id === 'profile-form') saveProfile(event.target);
});

window.addEventListener('popstate', () => {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
  render();
});

function lessonScore(id) {
  const lesson = state.lessons.find((l) => l.id === id);
  const exercises = lesson?.exercises || lesson?.content?.exercises || [];
  if (!exercises.length) return 100;
  return Math.round((exercises.filter((q) => state.lessonAnswers[q.id] === q.correctAnswer).length / exercises.length) * 100);
}

loadStaticData().then(render).catch((error) => {
  console.error('Could not load lesson data', error);
  root.innerHTML = `<main class="min-h-screen grid place-items-center p-6"><div class="bg-white rounded-3xl p-8 shadow-sm text-center"><h1 class="text-xl font-bold">EnglishPrep</h1><p class="text-sm text-gray-500 mt-2">${tr('Не удалось загрузить материалы курса. Обновите страницу.', 'Маводи курс бор нашуд. Саҳифаро нав кунед.', 'Failed to load course materials. Please refresh.')}</p><button class="mt-5 bg-[#FF5B45] text-white rounded-full px-5 py-2" onclick="location.reload()">${tr('Обновить', 'Нав кардан', 'Refresh')}</button></div></main>`;
});
