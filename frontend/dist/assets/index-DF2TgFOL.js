(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))d(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&d(i)}).observe(document,{childList:!0,subtree:!0});function r(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(l){if(l.ep)return;l.ep=!0;const o=r(l);fetch(l.href,o)}})();const M="http://localhost:3001/api",h=document.querySelector("#root"),B=[{code:"en",label:"ENG",title:"English"},{code:"ru",label:"RU",title:"Русский"},{code:"tg",label:"TJ",title:"Тоҷикӣ"}];function C(){const a=localStorage.getItem("englishprep_language");return a==="en"||a==="eng"?"en":a==="tg"||a==="tj"?"tg":"ru"}const e={language:C(),langMenuOpen:!1,landingMenuOpen:!1,token:localStorage.getItem("englishprep_token")||"",user:w("englishprep_user",null),tests:[],lessons:[],words:[],tajikWords:{},results:w("englishprep_test_results",[]),completedLessons:w("englishprep_completed_lessons",{}),activeSkill:"reading",writingFilter:"all",authMode:"login",authError:"",testAnswers:{},lessonAnswers:{},testSubmitted:!1,lessonChecked:!1,testTimeLeft:0,timerId:null,mobileOpen:!1};function w(a,s){try{return JSON.parse(localStorage.getItem(a)||"null")??s}catch{return s}}const t=(a,s,r)=>e.language==="en"?r!==void 0?r:a:e.language==="tg"&&s!==void 0?s:a,n=(a="")=>String(a).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),P=a=>{e.language=a,e.langMenuOpen=!1,localStorage.setItem("englishprep_language",a),document.documentElement.lang=a,e.user&&(e.user.language=a,localStorage.setItem("englishprep_user",JSON.stringify(e.user)),v("/user/profile",{method:"PUT",body:JSON.stringify({language:a})}).catch(()=>{})),x()};async function v(a,s={}){const r={"Content-Type":"application/json",...s.headers||{}};e.token&&(r.Authorization=`Bearer ${e.token}`);const d=await fetch(`${M}${a}`,{...s,headers:r}),l=await d.json().catch(()=>({}));if(!d.ok)throw new Error(l.message||`Request failed (${d.status})`);return l}async function O(){const[a,s,r,d]=await Promise.all([fetch("/data/tests.json").then(l=>l.json()).catch(()=>[]),fetch("/data/lessons.json").then(l=>l.json()).catch(()=>[]),fetch("/data/vocabulary.json").then(l=>l.json()).catch(()=>[]),fetch("/data/vocabulary-tg.json").then(l=>l.json()).catch(()=>({}))]);e.tests=a,e.lessons=s,e.words=r,e.tajikWords=d}function f(a){e.timerId&&clearInterval(e.timerId),e.timerId=null,e.mobileOpen=!1,e.landingMenuOpen=!1,e.langMenuOpen=!1,history.pushState({},"",a),x(),window.scrollTo(0,0)}function p(a,s=18){const r={home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7H10v7H4a1 1 0 0 1-1-1z"/>',tests:'<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',chart:'<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-5 5"/>',words:'<path d="M4 5h16M4 10h16M4 15h10M4 20h10"/>',book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>',play:'<path d="m8 5 12 7-12 7z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',check:'<path d="m5 12 4 4L19 6"/>',mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/>',sound:'<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7m3-10a9 9 0 0 1 0 13"/>',x:'<path d="m18 6-12 12M6 6l12 12"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',award:'<circle cx="12" cy="8" r="6"/><path d="m8.2 13-1.2 8 5-3 5 3-1.2-8"/>'};return`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${r[a]||r.book}</svg>`}function $(){return'<span class="flex items-center gap-2 sm:gap-2.5 shrink-0"><img src="/logo.png" alt="EnglishPrep" class="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm ring-1 ring-black/10 shrink-0" style="border-radius: 50%;"><b class="text-lg sm:text-xl font-black tracking-tight text-gray-900">English<span class="text-[#FF5B45]">Prep</span></b></span>'}function k(a=""){const s=B.find(r=>r.code===e.language)||B[1];return`
    <div class="relative inline-block text-left language-dropdown ${a}">
      <button
        type="button"
        data-action="toggle-lang-menu"
        class="compact-btn inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 sm:px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all focus:outline-none"
        aria-label="${t("Выбор языка","Интихоби забон","Select language")}"
        aria-expanded="${e.langMenuOpen}"
      >
        <span class="tracking-wide">${s.label}</span>
        <svg class="w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${e.langMenuOpen?"rotate-180 text-[#FF5B45]":""}" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>

      ${e.langMenuOpen?`
        <div class="absolute right-0 mt-2 w-32 rounded-2xl bg-white p-1.5 shadow-xl border border-gray-100 z-50 animate-fadeIn">
          ${B.map(r=>`
            <button
              type="button"
              data-action="set-language"
              data-language="${r.code}"
              class="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${e.language===r.code?"bg-[#FF5B45]/10 text-[#FF5B45] font-bold":"text-gray-700 hover:bg-gray-50"}"
            >
              <span>${r.label}</span>
              ${e.language===r.code?'<span class="text-[#FF5B45] text-xs font-bold">✓</span>':""}
            </button>
          `).join("")}
        </div>
      `:""}
    </div>
  `}function _(){return`<div class="min-h-screen bg-white text-gray-900 selection:bg-[#FF6B4A]/20 selection:text-[#FF6B4A]">
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="/" data-route="/">${$()}</a>
        <nav class="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-600">
          <a href="#features" class="hover:text-[#FF5B45] transition-colors">${t("Возможности","Имкониятҳо","Features")}</a>
          <a href="#skills" class="hover:text-[#FF5B45] transition-colors">${t("Навыки IELTS","Маҳоратҳои IELTS","IELTS Skills")}</a>
          <a href="#levels" class="hover:text-[#FF5B45] transition-colors">${t("Курсы A1–C2","Курсҳои A1–C2","Courses A1–C2")}</a>
          <a href="#features" class="hover:text-[#FF5B45] transition-colors">${t("Преимущества","Афзалиятҳо","Highlights")}</a>
        </nav>
        
        <!-- Desktop actions -->
        <div class="hidden sm:flex items-center gap-3">
          ${k()}
          ${e.token?`
            <button data-route="/dashboard" class="bg-[#FF5B45] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-[#E6432A] transition-colors">${t("В кабинет","Ба ҳисоб","Dashboard")} →</button>
          `:`
            <button data-route="/auth" data-auth-mode="login" class="text-gray-700 px-3 py-2 text-sm font-medium hover:text-[#FF5B45] transition-colors">${t("Войти","Ворид шудан","Log in")}</button>
            <button data-route="/auth" data-auth-mode="register" class="bg-[#FF5B45] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-[#E6432A] transition-colors">${t("Начать бесплатно","Ройгон оғоз кардан","Start Free")}</button>
          `}
        </div>

        <!-- Mobile header controls -->
        <div class="flex sm:hidden items-center gap-2">
          ${k()}
          <button data-action="landing-menu" class="compact-btn p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors" aria-label="Toggle menu">
            ${p(e.landingMenuOpen?"x":"menu",22)}
          </button>
        </div>
      </div>

      <!-- Mobile dropdown drawer on landing page -->
      ${e.landingMenuOpen?`
        <div class="sm:hidden border-t border-gray-100 bg-white px-4 py-5 shadow-xl animate-fadeIn space-y-4">
          <nav class="flex flex-col gap-2 text-sm font-semibold text-gray-700">
            <a href="#features" data-action="close-landing-menu" class="py-2.5 px-3 rounded-xl hover:bg-gray-50 flex items-center justify-between">
              <span>${t("Возможности","Имкониятҳо","Features")}</span>
              <span class="text-xs text-gray-400">→</span>
            </a>
            <a href="#skills" data-action="close-landing-menu" class="py-2.5 px-3 rounded-xl hover:bg-gray-50 flex items-center justify-between">
              <span>${t("Навыки IELTS","Маҳоратҳои IELTS","IELTS Skills")}</span>
              <span class="text-xs text-gray-400">→</span>
            </a>
            <a href="#levels" data-action="close-landing-menu" class="py-2.5 px-3 rounded-xl hover:bg-gray-50 flex items-center justify-between">
              <span>${t("Курсы A1–C2","Курсҳои A1–C2","Courses A1–C2")}</span>
              <span class="text-xs text-gray-400">→</span>
            </a>
          </nav>
          <div class="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
            ${e.token?`
              <button data-route="/dashboard" class="w-full bg-[#FF5B45] text-white py-3 rounded-xl text-sm font-bold shadow-md">${t("В личный кабинет","Ба ҳисоби шахсӣ","Dashboard")} →</button>
            `:`
              <button data-route="/auth" data-auth-mode="login" class="w-full text-gray-800 border border-gray-200 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50">${t("Войти в аккаунт","Ба ҳисоб ворид шудан","Log in")}</button>
              <button data-route="/auth" data-auth-mode="register" class="w-full bg-[#FF5B45] text-white py-3 rounded-xl text-sm font-bold shadow-md">${t("Начать бесплатно","Ройгон оғоз кардан","Start Free")}</button>
            `}
          </div>
        </div>
      `:""}
    </header>

    <section class="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32">
      <div class="absolute inset-0 pointer-events-none"><img src="https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1920&q=80" alt="" class="w-full h-full object-cover opacity-10"><div class="absolute inset-0 bg-gradient-to-b from-white/60 via-white/95 to-white"></div></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-50 border border-coral-200 text-[#FF5B45] text-xs sm:text-sm font-semibold mb-6 sm:mb-8"><i class="w-2 h-2 rounded-full bg-[#FF5B45] animate-ping shrink-0"></i>${t("Платформа подготовки к IELTS","Платформаи омодагӣ ба IELTS","IELTS Preparation Platform")}</div>
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.15] mb-4 sm:mb-6">${t("Изучи английский от A1 до C2 и подготовься к","Англисиро аз A1 то C2 омӯз ва ба","Master English from A1 to C2 and prepare for")} <span class="text-[#FF5B45] underline decoration-coral-200">IELTS</span></h1>
          <p class="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed">${t("Уроки, словарь и практика всех четырёх навыков IELTS: чтения, аудирования, письма и говорения.","Дарсҳо, луғат ва машқи чор маҳорати IELTS: хониш, шунавоӣ, навиштан ва гуфтор.","Lessons, vocabulary, and practice for all four IELTS skills: reading, listening, writing, and speaking.")}</p>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button data-route="/auth" data-auth-mode="register" class="w-full sm:w-auto bg-[#FF5B45] hover:bg-[#E6432A] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]">${t("Начать обучение бесплатно","Омӯзишро ройгон оғоз кардан","Start Learning Free")} ${p("arrow",18)}</button>
            <button data-route="/auth" data-auth-mode="login" class="w-full sm:w-auto bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-colors">${t("Войти в аккаунт","Ба ҳисоб ворид шудан","Log in to account")}</button>
          </div>
          <div class="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
            <span class="font-semibold text-gray-900">A1 — C2</span>
            <span>•</span>
            <span>48 IELTS ${t("тестов","санҷиш","tests")}</span>
            <span>•</span>
            <span>30 ${t("уроков","дарс","lessons")}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="skills" class="py-12 sm:py-20 bg-[#F8F9FA] border-y border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900">${t("Все четыре навыка IELTS","Ҳамаи чор маҳорати IELTS","All Four IELTS Skills")}</h2>
          <p class="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500">${t("Занимайтесь в одном месте и следите за прогрессом.","Дар як ҷо омӯзед ва пешрафти худро пайгирӣ кунед.","Practice in one place and keep track of your progress.")}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          ${[["book","Academic Reading",t("Тексты и вопросы с разбором ответов.","Матнҳо ва саволҳо бо шарҳи ҷавобҳо.","Passages and questions with in-depth explanations."),"bg-blue-50 text-blue-600"],["sound","Listening Practice",t("Упражнения для понимания устной речи.","Машқҳо барои фаҳмидани нутқи шифоҳӣ.","Exercises to master spoken audio comprehension."),"bg-red-50 text-red-600"],["tests","Writing Task 1 & 2",t("Практика эссе и академического письма.","Машқи иншо ва навиштани академӣ.","Essay writing and academic analysis tasks."),"bg-orange-50 text-orange-600"],["mic","Speaking Simulation",t("Вопросы и тренировочные задания IELTS.","Саволҳо ва машқҳои гуфтории IELTS.","Questions and simulated IELTS speaking tests."),"bg-amber-50 text-amber-600"]].map(([a,s,r,d])=>`
            <article class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${d} flex items-center justify-center mb-4 sm:mb-5">${p(a,22)}</div>
                <h3 class="text-base sm:text-lg font-bold mb-2">${s}</h3>
                <p class="text-gray-500 text-xs sm:text-sm leading-relaxed">${r}</p>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section id="levels" class="py-12 sm:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2 sm:mb-3">${p("globe",14)} CEFR</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900">${t("Курсы английского от A1 до C2","Курсҳои англисӣ аз A1 то C2","English Courses from A1 to C2")}</h2>
          <p class="mt-2 text-xs sm:text-sm text-gray-500">${t("30 уроков с правилами, примерами и упражнениями.","30 дарс бо қоидаҳо, мисолҳо ва машқҳо.","30 lessons with grammar rules, examples, and exercises.")}</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          ${["A1","A2","B1","B2","C1","C2"].map((a,s)=>`
            <button data-route="/lessons?level=${a}" class="p-4 sm:p-5 rounded-2xl sm:rounded-3xl border ${["border-emerald-200 bg-emerald-50/40","border-teal-200 bg-teal-50/40","border-sky-200 bg-sky-50/40","border-indigo-200 bg-indigo-50/40","border-purple-200 bg-purple-50/40","border-rose-200 bg-rose-50/40"][s]} hover:scale-105 transition-all text-left min-h-[105px] sm:min-h-[140px] flex flex-col justify-between">
              <span class="text-2xl sm:text-3xl font-black">${a}</span>
              <p class="text-xs text-gray-500 mt-2">${t("Открыть","Кушодан","Open")} →</p>
            </button>
          `).join("")}
        </div>
      </div>
    </section>

    <section id="features" class="py-14 sm:py-20 bg-gradient-to-br from-[#FF5B45] via-[#FF6B4A] to-[#E6432A] text-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 class="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight">${t("Начни готовиться к IELTS уже сегодня","Имрӯз омодагиро ба IELTS оғоз кун","Start preparing for IELTS today")}</h2>
        <p class="text-sm sm:text-lg text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">${t("Выбери уровень, учи слова и тренируйся в удобном темпе.","Сатҳро интихоб кун, калима омӯз ва бо суръати худ машқ кун.","Pick a level, learn words, and practice at your own pace.")}</p>
        <button data-route="/auth" data-auth-mode="register" class="w-full sm:w-auto bg-white text-[#FF5B45] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">${t("Создать бесплатный аккаунт","Ҳисоби ройгон соз","Create Free Account")}</button>
      </div>
    </section>

    <footer class="bg-gray-950 text-gray-300 py-8 sm:py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-5 text-center sm:text-left">
        <div>${$()}</div>
        <span class="text-xs sm:text-sm text-gray-400">EnglishPrep · IELTS · A1–C2</span>
        <div class="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
          <button data-route="/lessons" class="hover:text-white transition-colors">${t("Уроки","Дарсҳо","Lessons")}</button>
          <button data-route="/vocabulary" class="hover:text-white transition-colors">${t("Словарь","Луғат","Vocabulary")}</button>
          <button data-route="/tests" class="hover:text-white transition-colors">${t("Тесты","Санҷишҳо","Tests")}</button>
        </div>
      </div>
    </footer>
  </div>`}function E(){const a=e.authMode==="register";return`
    <div class="min-h-screen bg-[#F8F9FA] flex flex-col justify-between p-4 sm:p-6 lg:p-8 selection:bg-[#FF6B4A]/20 selection:text-[#FF6B4A]">
      <!-- Header bar -->
      <div class="w-full max-w-md mx-auto flex items-center justify-between py-2" style="max-width: 440px;">
        <button data-route="/" class="text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1.5">
          ← <span>${t("На главную","Ба саҳифаи асосӣ","Back to Home")}</span>
        </button>
        <span class="inline-block">${$()}</span>
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
              ${a?t("Создать аккаунт","Сохтани ҳисоб","Create Account"):t("С возвращением!","Хуш омадед!","Welcome Back!")}
            </h2>
            <p class="text-gray-500 text-xs mt-1">
              ${a?t("Начните подготовку к IELTS и изучайте английский.","Омодагӣ ба IELTS ва омӯзиши англисиро оғоз кунед.","Start preparing for IELTS and learn English."):t("Войдите в свой профиль EnglishPrep.","Ба ҳисоби EnglishPrep ворид шавед.","Sign in to your EnglishPrep profile.")}
            </p>
          </div>

          ${e.authError?`<div class="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-xs mb-4">${n(e.authError)}</div>`:""}

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
            <span>${a?t("Регистрация через Google","Сабти ном бо Google","Sign up with Google"):t("Войти через Google","Воридшавӣ бо Google","Continue with Google")}</span>
          </button>

          <!-- Divider -->
          <div class="relative flex py-3 sm:py-3.5 items-center">
            <div class="flex-grow border-t border-gray-200"></div>
            <span class="flex-shrink mx-3 text-gray-400 text-[11px] uppercase font-semibold tracking-wider">${t("или","ё","or")}</span>
            <div class="flex-grow border-t border-gray-200"></div>
          </div>

          <!-- Email / Password Form -->
          <form id="auth-form" class="flex flex-col gap-3">
            ${a?`
              <label class="text-xs font-semibold text-gray-700">
                ${t("Имя","Ном","Name")}
                <input class="w-full mt-1 border border-gray-200 rounded-xl bg-white px-3 py-2.5 text-base sm:text-sm text-gray-800 focus:outline-none focus:border-[#FF5B45] transition-colors" name="name" placeholder="${t("Ваше имя","Номи шумо","Your name")}" required>
              </label>
            `:""}
            <label class="text-xs font-semibold text-gray-700">
              Email
              <input class="w-full mt-1 border border-gray-200 rounded-xl bg-white px-3 py-2.5 text-base sm:text-sm text-gray-800 focus:outline-none focus:border-[#FF5B45] transition-colors" type="email" name="email" placeholder="example@gmail.com" required>
            </label>
            <label class="text-xs font-semibold text-gray-700">
              ${t("Пароль","Рамз","Password")}
              <input class="w-full mt-1 border border-gray-200 rounded-xl bg-white px-3 py-2.5 text-base sm:text-sm text-gray-800 focus:outline-none focus:border-[#FF5B45] transition-colors" type="password" name="password" placeholder="••••••••" minlength="6" required>
            </label>
            <button type="submit" class="w-full bg-[#FF5B45] hover:bg-[#E6432A] text-white rounded-xl h-11 min-h-[44px] font-semibold text-xs sm:text-sm shadow-md mt-2 transition-colors flex items-center justify-center gap-1.5">
              <span>${a?t("Зарегистрироваться","Сабти ном","Sign Up"):t("Войти","Ворид шудан","Sign In")}</span>
              <span>→</span>
            </button>
          </form>

          <!-- Toggle Auth Mode -->
          <div class="text-center mt-4 sm:mt-5">
            <button type="button" class="text-xs font-semibold text-[#FF5B45] hover:underline py-1" data-action="toggle-auth">
              ${a?t("Уже есть аккаунт? Войти","Аллакай ҳисоб доред? Ворид шавед","Already have an account? Sign In"):t("Нет аккаунта? Зарегистрироваться","Ҳисоб надоред? Сабти ном кунед","Don't have an account? Sign Up")}
            </button>
          </div>
        </div>
      </div>

      <!-- Legal footer -->
      <div class="text-center text-[10px] sm:text-[11px] text-gray-400 py-2 sm:py-3 max-w-md mx-auto" style="max-width: 440px;">
        ${t("Продолжая, вы соглашаетесь с Условиями сервиса и Политикой конфиденциальности EnglishPrep","Бо идома додан, шумо ба шартҳои хизматрасонӣ ва сиёсати махфияти EnglishPrep розӣ мешавед.","By continuing, you agree to EnglishPrep Terms of Service and Privacy Policy.")}
      </div>
    </div>
  `}const N={reading:["Reading","Хониш","Reading"],listening:["Listening","Шунавоӣ","Listening"],writing:["Writing","Навиштан","Writing"],speaking:["Speaking","Гуфтор","Speaking"]};function y(a){const s=N[a]||[a,a,a];return t(s[0],s[1],s[2])}function R(){var s;const a=[["/dashboard","home",t("Главная","Асосӣ","Dashboard")],["/tests","tests",t("Тесты","Санҷишҳо","Tests")],["/statistics","chart",t("Статистика","Омор","Statistics")],["/vocabulary","words",t("Словарь","Луғат","Vocabulary")],["/lessons","book",t("Уроки","Дарсҳо","Lessons")]];return`
    <!-- Mobile top bar in app shell -->
    <div class="lg:hidden flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
      <button data-route="/" class="flex items-center gap-2">${$()}</button>
      <div class="flex items-center gap-2">
        ${k()}
        <button data-action="mobile-menu" class="compact-btn p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors" aria-label="Toggle Menu">
          ${p(e.mobileOpen?"x":"menu",22)}
        </button>
      </div>
    </div>

    <!-- Backdrop for mobile drawer -->
    ${e.mobileOpen?'<div data-action="close-menu" class="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>':""}

    <!-- Slide-out sidebar drawer -->
    <aside class="fixed lg:sticky top-0 left-0 z-50 h-screen w-72 max-w-[85vw] bg-white border-r border-gray-100 flex flex-col justify-between py-5 sm:py-6 px-4 overflow-y-auto transition-transform duration-300 ease-in-out pb-8 ${e.mobileOpen?"translate-x-0 shadow-2xl":"-translate-x-full lg:translate-x-0"}">
      <div class="flex flex-col gap-5 sm:gap-6">
        <div class="flex items-center justify-between px-2">
          <button data-route="/" class="text-left">${$()}</button>
          <button data-action="close-menu" class="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700">${p("x",20)}</button>
        </div>
        <nav class="flex flex-col gap-1.5">
          ${a.map(([r,d,l])=>`
            <button data-route="${r}" class="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${location.pathname===r||r!=="/dashboard"&&location.pathname.startsWith(r+"/")?"bg-[#FF5B45] text-white shadow-md font-bold":"text-gray-600 hover:bg-gray-50"}">
              ${p(d,18)}
              <span>${l}</span>
            </button>
          `).join("")}
        </nav>
      </div>

      <div class="flex flex-col gap-3 mt-6 pt-4 border-t border-gray-100">
        <div class="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-2">
          <span class="px-2 text-xs font-semibold text-gray-500">${t("Язык сайта","Забони сомона","Language")}</span>
          ${k()}
        </div>
        <button data-route="/profile" class="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <span class="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">${p("user",15)}</span>
          <span class="truncate">${n(((s=e.user)==null?void 0:s.name)||t("Личный кабинет","Ҳисоби шахсӣ","Profile"))}</span>
        </button>
        <button data-route="/profile" class="w-full bg-[#FF5B45] hover:bg-[#E6432A] text-white rounded-2xl py-3 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold shadow-md transition-colors">
          ✦ ${t("Получить Premium","Premium гирифтан","Get Premium")}
        </button>
      </div>
    </aside>
  `}function D(){return`
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-1 flex items-center justify-around shadow-[0_-2px_12px_rgba(0,0,0,0.05)] pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      ${[["/dashboard","home",t("Главная","Асосӣ","Home")],["/tests","tests",t("Тесты","Санҷиш","Tests")],["/lessons","book",t("Уроки","Дарсҳо","Lessons")],["/vocabulary","words",t("Словарь","Луғат","Vocab")],["/profile","user",t("Профиль","Профил","Profile")]].map(([s,r,d])=>{const l=location.pathname===s||s!=="/dashboard"&&location.pathname.startsWith(s);return`
          <button data-route="${s}" class="flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all ${l?"text-[#FF5B45] font-bold":"text-gray-500 hover:text-gray-900"}">
            <span class="p-1 rounded-lg ${l?"bg-[#FF5B45]/10":""}">${p(r,18)}</span>
            <span class="text-[10px] mt-0.5 tracking-tight truncate max-w-[64px]">${d}</span>
          </button>
        `}).join("")}
    </nav>
  `}function U(a){return`
    <div class="min-h-screen bg-[#F8F9FA] flex flex-col lg:flex-row antialiased">
      ${R()}
      <main class="flex-1 min-w-0 overflow-y-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-7xl mx-auto w-full pb-24 lg:pb-10">
        ${a}
      </main>
      ${D()}
    </div>
  `}function T(){var l,o;const a=e.results,s=a.filter(i=>typeof i.score=="number"&&Number.isFinite(i.score)),r=s.length?(s.reduce((i,m)=>i+m.score,0)/s.length).toFixed(1):"—",d=Object.values(e.completedLessons).filter(Boolean).length;return`
    <div class="space-y-6 sm:space-y-8 pb-4 sm:pb-12">
      <!-- Welcome Banner -->
      <div class="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FF5B45] via-[#FF6B4A] to-[#E6432A] p-5 sm:p-8 text-white shadow-lg">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div class="flex items-center gap-3.5 sm:gap-4">
            <img src="/logo.png" alt="EnglishPrep" class="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-md ring-2 ring-white/40 shrink-0" style="border-radius: 50%;">
            <div>
              <h1 class="text-lg sm:text-2xl font-black">${t("Добро пожаловать","Хуш омадед","Welcome")}, ${n(((l=e.user)==null?void 0:l.name)||"")}</h1>
              <p class="text-xs sm:text-sm text-white/90 mt-0.5 sm:mt-1">${t("Продолжайте учиться в своём темпе.","Омӯзишро бо суръати худ идома диҳед.","Continue learning at your own pace.")}</p>
            </div>
          </div>
          <div class="bg-white/10 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl border border-white/20 self-start sm:self-auto">
            <span class="text-[9px] sm:text-[10px] uppercase font-bold block">${t("ЦЕЛЬ","ҲАДАФ","TARGET")}</span>
            <span class="text-xl sm:text-2xl font-black">${n(((o=e.user)==null?void 0:o.targetBand)||7)}</span>
          </div>
        </div>
        <div class="mt-6 sm:mt-8 pt-4 border-t border-white/15 grid grid-cols-3 gap-2 sm:gap-4 text-center sm:text-left">
          <div>
            <b class="text-xl sm:text-2xl font-black block">${a.length}</b>
            <p class="text-[10px] sm:text-xs text-white/85 mt-0.5 leading-tight">${t("тестов пройдено","санҷиши гузашта","tests completed")}</p>
          </div>
          <div>
            <b class="text-xl sm:text-2xl font-black block">${r}</b>
            <p class="text-[10px] sm:text-xs text-white/85 mt-0.5 leading-tight">Band ${t("средний балл","холи миёна","average score")}</p>
          </div>
          <div>
            <b class="text-xl sm:text-2xl font-black block">${d}</b>
            <p class="text-[10px] sm:text-xs text-white/85 mt-0.5 leading-tight">${t("уроков пройдено","дарси гузашта","lessons completed")}</p>
          </div>
        </div>
      </div>

      <!-- Practice IELTS Grid -->
      <div>
        <h2 class="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 sm:mb-4">${t("Практика IELTS","Машқи IELTS","IELTS Practice")}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          ${["speaking","listening","reading","writing"].map((i,m)=>{var g;return`
            <button data-route="/tests/${i}/${((g=e.tests.find(u=>u.skill===i))==null?void 0:g.id)||i+"-79"}" class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-md text-left flex items-center justify-between transition-all">
              <span class="flex items-center gap-3">
                <span class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${["bg-amber-50 text-amber-600","bg-rose-50 text-rose-600","bg-sky-50 text-sky-600","bg-orange-50 text-orange-600"][m]} flex items-center justify-center shrink-0">${p(["mic","sound","book","tests"][m],20)}</span>
                <div>
                  <b class="block text-sm sm:text-base text-gray-900 font-bold">${y(i)}</b>
                  <small class="text-xs text-gray-500">${t("Практика · тесты и задания","Машқ · санҷишҳо ва супоришҳо","Practice · tests & tasks")}</small>
                </div>
              </span>
              <span class="text-gray-400 ml-2">${p("arrow",18)}</span>
            </button>
          `}).join("")}
        </div>
      </div>

      <!-- Daily Plan Card -->
      <div class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm text-center">
        <h3 class="text-base sm:text-lg font-bold text-gray-900">${t("Твой ежедневный план","Нақшаи ҳаррӯзаи ту","Your Daily Plan")}</h3>
        <p class="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mt-1 leading-relaxed">${t("Выбери урок, повтори слова и пройди один тест.","Як дарс интихоб кун, калимаҳоро такрор кун ва як санҷиш гузар.","Pick a lesson, review words, and take one test.")}</p>
        <div class="mt-5 sm:mt-6 flex flex-wrap justify-center gap-3">
          <button data-route="/lessons" class="bg-[#FF5B45] hover:bg-[#E6432A] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors shadow-sm">${t("К урокам","Ба дарсҳо","To lessons")}</button>
          <button data-route="/vocabulary" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-full text-xs font-bold transition-colors">${t("К словам","Ба луғат","To vocabulary")}</button>
        </div>
      </div>
    </div>
  `}function G(){const s=(new URLSearchParams(location.search).get("level")||"A1").toUpperCase(),r=e.lessons.filter(l=>String(l.level).toUpperCase()===s),d={A1:["Базовые фразы, знакомство, числа и простые диалоги.","Ибораҳои асосӣ, шиносоӣ, рақамҳо ва гуфтугӯҳои сода.","Basic phrases, greetings, numbers, and simple conversations."],A2:["Повседневные ситуации, покупки, погода и здоровье.","Вазъиятҳои ҳаррӯза, харид, обу ҳаво ва саломатӣ.","Everyday situations, shopping, weather, and health."],B1:["Образование, работа, путешествия и культура.","Маориф, кор, саёҳат ва фарҳанг.","Education, work, travel, and culture."],B2:["Сложные тексты, аргументация и академический английский.","Матнҳои мураккаб, далеловарӣ ва англисии академӣ.","Complex texts, arguments, and academic English."],C1:["Продвинутые темы: наука, право и дипломатия.","Мавзӯъҳои пешрафта: илм, ҳуқуқ ва дипломатия.","Advanced topics: science, law, and diplomacy."],C2:["Точная лексика, риторика и сложные академические тексты.","Луғати дақиқ, риторика ва матнҳои мураккаби академӣ.","Precision vocabulary, rhetoric, and complex academic discourse."]};return`
    <div class="space-y-6 sm:space-y-8 pb-12">
      <header>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral-50 text-[#FF5B45] text-xs font-semibold mb-2">${p("book",14)} ${t("Курсы общего и академического английского","Курсҳои англисии умумӣ ва академӣ","General & Academic English Courses")}</div>
        <h1 class="text-2xl sm:text-4xl font-black text-gray-950">${t("Уроки английского (A1 – C2)","Дарсҳои англисӣ (A1 – C2)","English Lessons (A1 – C2)")}</h1>
        <p class="text-xs sm:text-sm text-gray-500 mt-1">${t("Выберите уровень и проходите интерактивные модули.","Сатҳро интихоб карда, модулҳои интерактивиро омӯзед.","Choose a level and master interactive modules.")}</p>
      </header>

      <!-- Level Selector Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
        ${["A1","A2","B1","B2","C1","C2"].map((l,o)=>`
          <button data-route="/lessons?level=${l}" class="rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border ${s===l?"border-2 border-[#FF5B45] bg-white shadow-md":"bg-white border-gray-100"} min-h-[95px] sm:min-h-[140px] text-left transition-all flex flex-col justify-between">
            <b class="text-xl sm:text-2xl ${["text-emerald-600","text-teal-600","text-sky-600","text-indigo-600","text-purple-600","text-rose-600"][o]}">${l}</b>
            <div>
              <p class="text-[10px] sm:text-[11px] text-gray-500">${t("Уровень","Сатҳ","Level")}</p>
              <span class="text-[10px] sm:text-[11px] text-gray-400">${e.lessons.filter(i=>String(i.level).toUpperCase()===l).length} ${t("уроков","дарс","lessons")}</span>
            </div>
          </button>
        `).join("")}
      </div>

      <!-- Level Description Box -->
      <div class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-8 shadow-sm">
        <span class="text-xs font-black px-2.5 py-1 rounded-full bg-coral-50 text-[#FF5B45]">${t("Уровень","Сатҳ","Level")} ${s}</span>
        <h2 class="text-lg sm:text-2xl font-extrabold text-gray-900 mt-2 sm:mt-3">${t("Курс английского","Курси англисӣ","English Course")} ${s}</h2>
        <p class="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 leading-relaxed">${t(d[s][0],d[s][1],d[s][2])}</p>
      </div>

      <!-- Lessons Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        ${r.map((l,o)=>`
          <button data-route="/lessons/${String(l.level).toLowerCase()}/${l.id}" class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-md text-left flex flex-col justify-between transition-all">
            <div>
              <div class="flex items-start gap-3">
                <span class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-coral-50 text-[#FF5B45] flex items-center justify-center font-bold text-sm shrink-0">${o+1}</span>
                <div>
                  <h3 class="font-bold text-sm sm:text-base text-gray-900 leading-snug">${n(l.title)}</h3>
                  <p class="text-xs text-gray-400 mt-1 flex items-center gap-1">${p("clock",13)} ${l.duration||l.durationMinutes+" min"}</p>
                </div>
              </div>
              <p class="text-xs sm:text-sm text-gray-500 leading-relaxed mt-3 sm:mt-4 line-clamp-3">${n(l.description||"")}</p>
            </div>
            <span class="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-50 text-xs font-semibold text-[#FF5B45] flex items-center justify-between">
              <span>${t("Начать урок","Оғози дарс","Start lesson")}</span>
              <span>→</span>
            </span>
          </button>
        `).join("")||`<p class="text-gray-500 text-sm">${t("Уроки не найдены. Запустите сервер обучения.","Дарсҳо ёфт нашуданд. Сервери омӯзишро оғоз кунед.","No lessons found. Please launch the learning server.")}</p>`}
      </div>
    </div>
  `}function H(a){var o;const s=e.lessons.find(i=>i.id===a);if(!s)return`<div class="text-center py-20"><h2 class="text-xl sm:text-2xl font-bold">${t("Урок не найден","Дарс ёфт нашуд","Lesson not found")}</h2><button data-route="/lessons" class="mt-5 text-[#FF5B45] font-semibold">${t("Вернуться к урокам","Бозгашт ба дарсҳо","Back to lessons")}</button></div>`;const r=s.sections?{overview:s.description,explanations:s.sections.map(i=>i.content),vocabulary:[],grammarRules:[],exercises:s.exercises||[],tips:[]}:s.content||{},d=r.exercises||[],l=(o=s.sections)!=null&&o.length?s.sections.map(i=>{var m;return`<article class="space-y-2"><h3 class="font-bold text-base sm:text-lg text-gray-900 mb-1">${n(i.title)}</h3><p class="text-xs sm:text-sm text-gray-700 leading-relaxed">${n(i.content)}</p>${(m=i.examples)!=null&&m.length?`<div class="mt-3 space-y-2">${i.examples.map(g=>{var u;return`<div class="rounded-xl bg-gray-50 p-3 text-xs sm:text-sm"><p class="font-medium text-gray-800">${n(g.en)}</p>${e.language==="ru"?`<p class="text-gray-500 mt-1">${n(g.ru)}</p>`:e.language==="tg"&&((u=s.exampleTg)!=null&&u[g.en])?`<p class="text-gray-500 mt-1">${n(s.exampleTg[g.en])}</p>`:""}</div>`}).join("")}</div>`:""}</article>`}).join(""):(r.explanations||[]).map(i=>`<p class="text-xs sm:text-sm text-gray-700 leading-relaxed">${n(i)}</p>`).join("");return`
    <div class="space-y-6 sm:space-y-8 pb-16 max-w-4xl mx-auto">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
        <button data-route="/lessons?level=${String(s.level).toUpperCase()}" class="text-xs sm:text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">← ${t("Назад к списку","Бозгашт ба рӯйхат","Back to list")} (${String(s.level).toUpperCase()})</button>
        <span class="text-xs text-gray-400 flex items-center gap-1">${p("clock",13)} ${s.duration||`${s.durationMinutes||20} ${t("мин","дақ","min")}`}</span>
      </div>
      <header>
        <span class="px-2.5 py-1 rounded-full bg-coral-50 text-[#FF5B45] text-xs font-bold">${String(s.level).toUpperCase()} · ${n(s.skill||"English")}</span>
        <h1 class="text-2xl sm:text-3xl font-black text-gray-950 mt-2 sm:mt-3 leading-tight">${n(s.title)}</h1>
        <p class="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">${n(s.description||r.overview||"")}</p>
      </header>
      <section class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-8 space-y-4 sm:space-y-5 shadow-sm">
        <h2 class="text-lg sm:text-xl font-bold">${t("Материал урока","Маводи дарс","Lesson Material")}</h2>
        ${l}
        ${(r.grammarRules||[]).map(i=>`<div class="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50"><b class="text-sm sm:text-base">${n(i.rule)}</b><p class="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">${n(i.example)}</p></div>`).join("")}
        ${(r.vocabulary||[]).length?`<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${r.vocabulary.map(i=>`<div class="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50"><b>${n(i.word)}</b><small class="block text-gray-500">${n(i.meaning)}</small><p class="text-xs sm:text-sm mt-1.5">${n(i.example)}</p></div>`).join("")}</div>`:""}
        ${(r.tips||[]).map(i=>`<p class="p-3 rounded-xl bg-amber-50 text-amber-900 text-xs sm:text-sm">✦ ${n(i)}</p>`).join("")}
      </section>
      <section class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-8 shadow-sm">
        <h2 class="text-lg sm:text-xl font-bold">${t("Практические упражнения","Машқҳои амалӣ","Practice Exercises")}</h2>
        <p class="text-xs sm:text-sm text-gray-500 mt-1 mb-4 sm:mb-5">${t("Ответьте на вопросы и проверьте себя.","Ба саволҳо ҷавоб диҳед ва худро бисанҷед.","Answer the questions and check your comprehension.")}</p>
        <div class="space-y-4 sm:space-y-5">
          ${d.map((i,m)=>{var g;return`
            <div class="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50">
              <p class="font-semibold text-xs sm:text-sm text-gray-900 leading-snug">${m+1}. ${n(i.question||i.prompt||"")}</p>
              ${(g=i.options)!=null&&g.length?`
                <div class="mt-3 grid gap-2">
                  ${i.options.map(u=>`<label class="flex items-center gap-2.5 p-2.5 rounded-lg bg-white text-xs sm:text-sm cursor-pointer shadow-sm"><input type="radio" name="${n(i.id)}" value="${n(u)}" data-lesson-answer="${n(i.id)}" ${e.lessonAnswers[i.id]===u?"checked":""}><span>${n(u)}</span></label>`).join("")}
                </div>
              `:`
                <input data-lesson-answer="${n(i.id)}" class="w-full mt-3 rounded-xl border border-gray-200 p-2.5 text-base sm:text-sm bg-white" value="${n(e.lessonAnswers[i.id]||"")}">
              `}
              ${e.lessonChecked?`<p class="mt-2 text-xs ${e.lessonAnswers[i.id]===i.correctAnswer?"text-emerald-700 font-bold":"text-rose-600"}">${e.lessonAnswers[i.id]===i.correctAnswer?t("Верно ✓","Дуруст ✓","Correct ✓"):t("Ответ","Ҷавоб","Answer")+": "+n(i.correctAnswer||"—")} · ${n(i.explanation||"")}</p>`:""}
            </div>
          `}).join("")}
        </div>
        <button data-action="check-lesson" class="mt-5 w-full sm:w-auto bg-[#FF5B45] hover:bg-[#E6432A] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors shadow-sm">${t("Проверить ответы","Санҷидани ҷавобҳо","Check answers")}</button>
      </section>
      <div class="text-center pt-2">
        <button data-action="complete-lesson" data-lesson-id="${n(s.id)}" class="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-colors shadow-md">
          ${e.completedLessons[s.id]?t("Урок пройден! ✓","Дарс анҷом ёфт! ✓","Lesson completed! ✓"):t("Завершить урок","Анҷом додани дарс","Complete lesson")}
        </button>
      </div>
    </div>
  `}function W(){const a=new URLSearchParams(location.search),s=a.get("level")||"ALL",r=a.get("q")||"",d=e.words.filter(o=>{var i;return(s==="ALL"||o.level===s)&&`${o.word} ${o.translation} ${o.exampleEn} ${((i=e.tajikWords[o.id])==null?void 0:i.meaning)||""}`.toLowerCase().includes(r.toLowerCase())}),l=w("englishprep_learned_words",{});return`
    <div class="space-y-6 sm:space-y-8 pb-12">
      <header>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral-50 text-[#FF5B45] text-xs font-semibold mb-2">${p("words",14)} ${t("Академический и общий вокабуляр","Луғати академӣ ва умумӣ","Academic & General Vocabulary")}</div>
        <h1 class="text-2xl sm:text-4xl font-black text-gray-950">${t("Словарь IELTS","Луғати IELTS","IELTS Vocabulary")}</h1>
        <p class="text-xs sm:text-sm text-gray-500 mt-1">${t("Лексика по уровням A1–C2 с транскрипцией и примерами.","Калимаҳои сатҳҳои A1–C2 бо талаффуз ва мисолҳо.","A1–C2 vocabulary with phonetics and sample usage.")}</p>
      </header>
      
      <!-- Search and Level Filter Bar -->
      <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        <div class="relative flex-1 max-w-md">
          <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">${p("search",16)}</span>
          <input id="word-search" value="${n(r)}" placeholder="${t("Поиск по слову, переводу или примеру...","Ҷустуҷӯи калима, тарҷума ё мисол...","Search word, translation, or example...")}" class="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white rounded-xl sm:rounded-2xl border border-gray-200 text-base sm:text-sm shadow-sm focus:outline-none focus:border-[#FF5B45] transition-colors">
        </div>
        <div class="flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          ${["ALL","A1","A2","B1","B2","C1","C2"].map(o=>`
            <button data-route="/vocabulary?level=${o}${r?`&q=${encodeURIComponent(r)}`:""}" class="whitespace-nowrap px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all shrink-0 ${s===o?"bg-[#FF5B45] text-white shadow-sm":"bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}">
              ${o==="ALL"?t("Все уровни","Ҳамаи сатҳҳо","All Levels"):o}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- Word Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        ${d.map(o=>{const i=e.tajikWords[o.id]||{};let m=o.translation,g=o.exampleRu;return e.language==="tg"?(m=i.meaning||o.translation,g=i.example||o.exampleRu):e.language==="en"&&(m=o.translationEn||o.translation,g=o.exampleEn),`
            <article class="bg-white rounded-2xl sm:rounded-3xl border ${l[o.id]?"border-emerald-200 bg-emerald-50/20":"border-gray-100"} p-4 sm:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-start gap-2">
                  <div class="flex items-center gap-2">
                    <h3 class="text-lg sm:text-xl font-black">${n(o.word)}</h3>
                    <button data-action="speak" data-word="${n(o.word)}" title="${t("Произнести","Талаффуз","Pronounce")}" class="text-gray-400 hover:text-[#FF5B45] p-1 rounded-lg">${p("sound",16)}</button>
                  </div>
                  <span class="text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full bg-gray-100 shrink-0">${o.level}</span>
                </div>
                <div class="text-xs text-gray-400 font-mono my-1.5 sm:my-2">${n(o.phonetics)} · ${o.partOfSpeech}</div>
                <p class="text-xs sm:text-sm font-bold text-gray-800 mb-3 sm:mb-4">${n(m)}</p>
                <div class="p-3 rounded-xl sm:rounded-2xl bg-[#F8F9FA] text-xs space-y-1">
                  <p class="text-gray-700 leading-snug">“${n(o.exampleEn)}”</p>
                  <p class="text-gray-400 italic leading-snug">${n(g)}</p>
                </div>
              </div>
              <button data-action="learn-word" data-word-id="${n(o.id)}" class="mt-4 sm:mt-5 pt-3 border-t border-gray-50 flex items-center gap-2 text-xs font-semibold ${l[o.id]?"text-emerald-700":"text-gray-600"}">
                ${p("check",14)} ${l[o.id]?t("Выучено","Омӯхта шуд","Learned"):t("Отметить как выученное","Ҳамчун омӯхташуда қайд кардан","Mark as learned")}
              </button>
            </article>
          `}).join("")||`<div class="col-span-full text-center py-16 bg-white rounded-3xl border border-gray-100"><h3 class="font-bold text-gray-700">${t("Слов не найдено","Калима ёфт нашуд","No words found")}</h3></div>`}
      </div>
    </div>
  `}function J(){const a=e.tests.filter(s=>s.skill===e.activeSkill);return`
    <div class="space-y-6 sm:space-y-8 pb-12">
      <header>
        <h1 class="text-2xl sm:text-4xl font-black text-gray-950">${t("Пробные тесты IELTS","Санҷишҳои машқии IELTS","IELTS Practice Tests")}</h1>
        <p class="text-xs sm:text-sm text-gray-500 mt-1">${t("Выберите тип теста и начните практику.","Навъи санҷишро интихоб карда, машқро оғоз кунед.","Select a test type and begin practicing.")}</p>
      </header>

      <!-- Practice Banner -->
      <div class="rounded-2xl sm:rounded-3xl border border-rose-100 bg-rose-50/60 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 class="font-extrabold text-gray-900 text-sm sm:text-base">${t("Полная тренировка IELTS","Машқи пурраи IELTS","Full IELTS Practice")}</h3>
          <p class="text-xs text-gray-500 mt-0.5 sm:mt-1">${t("Выберите один из тестов по четырём навыкам.","Аз санҷишҳои чор маҳорат якеро интихоб кунед.","Choose one of the tests across all four skills.")}</p>
        </div>
        <button data-route="/tests" class="bg-[#FF5B45] hover:bg-[#E6432A] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors shrink-0 shadow-sm self-stretch sm:self-auto text-center">${t("Выбрать тест","Интихоби санҷиш","Choose test")} →</button>
      </div>

      <!-- Skill Selector Bar -->
      <div class="flex gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        ${["reading","listening","writing","speaking"].map((s,r)=>`
          <button data-action="skill" data-skill="${s}" class="whitespace-nowrap flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 ${e.activeSkill===s?["bg-blue-500","bg-red-500","bg-orange-500","bg-amber-500"][r]+" text-white shadow-md":"bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}">
            ${p(["book","sound","tests","mic"][r],16)} ${y(s)} <span class="text-xs px-2 py-0.5 rounded-full bg-black/10">${e.tests.filter(d=>d.skill===s).length}</span>
          </button>
        `).join("")}
      </div>

      <div class="flex items-center justify-between gap-3">
        <div>
          <h2 class="text-xl sm:text-2xl font-black">${t("Тесты","Санҷишҳо","Tests")} ${y(e.activeSkill)}</h2>
          <p class="text-xs text-gray-400">${a.length} ${t("тестов","санҷиш","tests")}</p>
        </div>
        ${e.activeSkill==="writing"?`
          <select id="writing-filter" class="bg-white border border-gray-200 rounded-xl p-2 text-xs sm:text-sm">
            <option value="all">${t("Все типы","Ҳамаи навъҳо","All types")}</option>
            ${[...new Set(a.flatMap(s=>s.tags||[]))].map(s=>`<option value="${n(s)}">${n(s)}</option>`).join("")}
          </select>
        `:""}
      </div>

      <!-- Test Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        ${a.filter(s=>e.activeSkill!=="writing"||e.writingFilter==="all"||(s.tags||[]).includes(e.writingFilter)).map(s=>{var r;return`
          <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start gap-2">
                <div>
                  <span class="text-[10px] sm:text-[11px] font-bold uppercase text-gray-400">${n(s.type||s.difficulty||"IELTS")}</span>
                  <h3 class="text-base sm:text-lg font-bold mt-0.5">${n(s.title)}</h3>
                </div>
                <span class="px-2 py-1 rounded-full bg-gray-100 text-[11px] font-semibold shrink-0">${s.durationMinutes} ${t("мин","дақ","min")}</span>
              </div>
              <p class="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 leading-relaxed">${n(s.description||"IELTS practice test")}</p>
            </div>
            <div class="flex items-center justify-between mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-50 text-xs text-gray-500">
              <span>${((r=s.questions)==null?void 0:r.length)||s.totalQuestions||0} ${t("вопросов","савол","questions")}</span>
              <button data-route="/tests/${s.skill}/${s.id}" class="bg-[#FF5B45] hover:bg-[#E6432A] text-white rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-bold text-xs sm:text-sm transition-colors shadow-sm">${t("Начать","Оғоз кардан","Start")} →</button>
            </div>
          </article>
        `}).join("")||`<p class="text-gray-500 text-sm">${t("Тесты не найдены.","Санҷиш ёфт нашуд.","No tests found.")}</p>`}
      </div>
    </div>
  `}function z(a,s){var L;const r=e.tests.find(c=>c.id===s)||null;if(!r)return`<div class="text-center py-20"><h2 class="text-xl sm:text-2xl font-bold">${t("Тест не найден","Санҷиш ёфт нашуд","Test not found")}</h2><button data-route="/tests" class="mt-5 text-[#FF5B45] font-semibold">${t("Вернуться к тестам","Бозгашт ба санҷишҳо","Back to tests")}</button></div>`;e.testTimeLeft||(e.testTimeLeft=(r.durationMinutes||60)*60),!e.testSubmitted&&!e.timerId&&(e.timerId=setInterval(()=>{if(e.testTimeLeft>0){e.testTimeLeft--;const c=document.querySelector("#test-clock");c&&(c.textContent=A(e.testTimeLeft))}else I(r)},1e3));const d=r.questions||[],l=d.length?d.filter(c=>e.testAnswers[c.id]===c.correctAnswer).length:0,o=r.writingTasks||null,m=(r.speakingParts||[]).flatMap(c=>c.questions||[]),g=o?["task1","task2"].map((c,F)=>{const b=o[c];return b?`
      <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm">
        <div class="flex justify-between items-center">
          <b class="text-sm sm:text-base">${t("Задание","Супориш","Task")} ${F+1}</b>
          <span class="text-xs text-gray-400">${b.minWords||150} ${t("слов минимум","калима ҳадди ақал","words minimum")}</span>
        </div>
        <p class="text-xs sm:text-sm leading-relaxed mt-3 text-gray-700">${n(b.prompt)}</p>
        <textarea data-test-answer="${c}" class="w-full min-h-[140px] sm:min-h-[180px] mt-3 rounded-xl border border-gray-200 p-3 text-base sm:text-sm focus:outline-none focus:border-[#FF5B45]" placeholder="${t("Введите ответ на английском...","Ҷавоби худро ба англисӣ нависед...","Write your answer in English...")}">${n(e.testAnswers[c]||"")}</textarea>
        <p class="text-xs text-gray-400 mt-1">${(e.testAnswers[c]||"").trim().split(/\s+/).filter(Boolean).length} ${t("слов","калима","words")}</p>
        ${b.sampleAnswer&&e.testSubmitted?`<details class="mt-3 text-xs sm:text-sm"><summary class="cursor-pointer font-semibold text-[#FF5B45]">${t("Пример ответа","Намунаи ҷавоб","Sample Answer")}</summary><p class="mt-2 text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl">${n(b.sampleAnswer)}</p></details>`:""}
      </article>
    `:""}).join(""):"",u=m.length?`
    <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm">
      <h3 class="font-bold text-sm sm:text-base">${t("Задания для Speaking","Супоришҳои Speaking","Speaking Prompts")}</h3>
      <ol class="list-decimal pl-5 mt-3 space-y-2 text-xs sm:text-sm text-gray-700">${m.map(c=>`<li>${n(c)}</li>`).join("")}</ol>
      <textarea data-test-answer="speakingResponse" class="w-full min-h-[130px] sm:min-h-[160px] mt-3 rounded-xl border border-gray-200 p-3 text-base sm:text-sm focus:outline-none focus:border-[#FF5B45]" placeholder="${t("Запиши свои заметки или ответ на английском...","Ёддошт ё ҷавобро ба англисӣ нависед...","Write your notes or response in English...")}">${n(e.testAnswers.speakingResponse||"")}</textarea>
    </article>
  `:"",j=r.audioInfo?`
    <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm">
      <h3 class="font-bold text-sm sm:text-base">${n(r.audioInfo.title||t("Аудиопрактика","Машқи шунавоӣ","Audio Practice"))}</h3>
      <p class="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">${n(r.audioInfo.description||"")}</p>
      ${r.audioInfo.audioUrl?`<audio controls class="w-full mt-3.5" src="${n(r.audioInfo.audioUrl)}"></audio>`:""}
    </article>
  `:"";return`
    <div class="space-y-6 sm:space-y-8 pb-16 max-w-5xl mx-auto">
      <!-- Sticky Timer & Navigation Bar -->
      <div class="sticky top-0 z-30 bg-[#F8F9FA]/95 backdrop-blur-md flex items-center justify-between border-b border-gray-200 py-3 -mx-4 px-4 sm:mx-0 sm:px-0">
        <button data-route="/tests" class="text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1">← <span>${t("К тестам","Ба санҷишҳо","Back to tests")}</span></button>
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-400 hidden sm:inline">${t("Осталось времени:","Вақти боқимонда:","Time left:")}</span>
          <span id="test-clock" class="font-mono font-bold text-[#FF5B45] bg-coral-50 border border-coral-200 px-3 py-1 rounded-full text-xs sm:text-sm">${A(e.testTimeLeft)}</span>
        </div>
      </div>

      <header>
        <span class="text-xs uppercase font-bold text-[#FF5B45]">${y(r.skill)} · ${r.durationMinutes} ${t("минут","дақиқа","minutes")}</span>
        <h1 class="text-xl sm:text-3xl font-black mt-1 sm:mt-2 text-gray-950">${n(r.title)}</h1>
        <p class="text-xs sm:text-sm text-gray-500 mt-1.5">${n(r.description||"")}</p>
      </header>

      ${e.testSubmitted?`
        <div class="bg-emerald-600 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md">
          <span class="text-xs uppercase font-bold tracking-wider">${t("Результат","Натиҷа","Result")}</span>
          <h2 class="text-2xl sm:text-3xl font-black mt-1">${e.lastTestBand?`${e.lastTestBand} Band`:t("Ответ сохранён","Ҷавоб сабт шуд","Response saved")}</h2>
          ${d.length?`<p class="mt-1 text-sm text-emerald-100">${l}/${d.length} ${t("правильных ответов","ҷавоби дуруст","correct answers")}</p>`:""}
          <button data-action="reset-test" class="mt-4 bg-white text-emerald-700 px-5 py-2 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-95">${t("Пройти заново","Аз нав гузаштан","Retake test")}</button>
        </div>
      `:`
        <div class="grid lg:grid-cols-2 gap-4 sm:gap-5">
          ${r.passage?`
            <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-6 h-fit lg:sticky lg:top-16 shadow-sm">
              <details class="group" open>
                <summary class="flex items-center justify-between font-bold cursor-pointer select-none text-gray-900 pb-2">
                  <span class="flex items-center gap-2">
                    ${p("book",18)}
                    <span>${t("Текст для чтения","Матни хониш","Reading Passage")}</span>
                  </span>
                  <span class="text-xs text-[#FF5B45] font-semibold lg:hidden group-open:hidden">${t("Развернуть","Кушодан","Show text")} ▼</span>
                  <span class="text-xs text-[#FF5B45] font-semibold lg:hidden hidden group-open:inline">${t("Свернуть","Пӯшидан","Hide text")} ▲</span>
                </summary>
                <div class="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line mt-3 pt-3 border-t border-gray-100 max-h-[45vh] lg:max-h-[72vh] overflow-y-auto pr-1">
                  ${n(r.passage)}
                </div>
              </details>
            </article>
          `:""}
          <section class="space-y-4">
            ${j}
            ${d.map((c,F)=>{var b;return`
              <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm">
                <p class="font-bold text-sm sm:text-base text-gray-900">${F+1}. ${n(c.prompt||c.question||"")}</p>
                ${(b=c.options)!=null&&b.length?`
                  <div class="grid gap-2 mt-3">
                    ${c.options.map(S=>`
                      <label class="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 hover:bg-gray-100/80 cursor-pointer text-xs sm:text-sm transition-colors">
                        <input type="radio" name="${n(c.id)}" value="${n(S)}" data-test-answer="${n(c.id)}" ${e.testAnswers[c.id]===S?"checked":""} class="mt-0.5">
                        <span class="text-gray-800 leading-snug">${n(S)}</span>
                      </label>
                    `).join("")}
                  </div>
                `:`<input data-test-answer="${n(c.id)}" class="w-full mt-3 rounded-xl border border-gray-200 p-2.5 text-base sm:text-sm" value="${n(e.testAnswers[c.id]||"")}">`}
              </article>
            `}).join("")}
            ${g}
            ${u}
            ${!d.length&&!o&&!u?`<p class="bg-white p-5 rounded-2xl text-sm">${n(((L=r.audioInfo)==null?void 0:L.description)||t("В этом разделе выполните задание.","Супориши иншоро иҷро кунед.","Complete the task in this section."))}</p>`:""}
            <button data-action="submit-test" data-test-id="${n(r.id)}" class="w-full bg-[#FF5B45] hover:bg-[#E6432A] text-white py-3.5 rounded-full font-bold text-sm sm:text-base transition-colors shadow-md">${t("Завершить тест","Анҷом додани санҷиш","Submit test")}</button>
          </section>
        </div>
      `}
    </div>
  `}function A(a){return`${String(Math.floor(a/60)).padStart(2,"0")}:${String(a%60).padStart(2,"0")}`}function V(a){return a>=.95?9:a>=.88?8.5:a>=.8?8:a>=.72?7.5:a>=.65?7:a>=.58?6.5:a>=.5?6:a>=.42?5.5:a>=.35?5:a>=.28?4.5:a>=.2?4:3.5}function I(a){if(e.testSubmitted)return;const s=a.questions||[],r=s.filter(o=>e.testAnswers[o.id]===o.correctAnswer).length,d=s.length?V(r/s.length):null;e.testSubmitted=!0,e.lastTestBand=d;const l={testId:a.id,title:a.title,skill:a.skill,score:d,correct:r,total:s.length,answers:{...e.testAnswers},completedAt:new Date().toISOString()};e.results.unshift(l),localStorage.setItem("englishprep_test_results",JSON.stringify(e.results)),e.token&&s.length&&v(`/tests/${encodeURIComponent(a.id)}/submit`,{method:"POST",body:JSON.stringify({answers:e.testAnswers})}).catch(()=>{}),e.timerId&&clearInterval(e.timerId),e.timerId=null,x()}function Y(){var d;const a=e.results.filter(l=>typeof l.score=="number"&&Number.isFinite(l.score)),s=a.length?(a.reduce((l,o)=>l+o.score,0)/a.length).toFixed(1):"—",r=["reading","listening","writing","speaking"];return`
    <div class="space-y-6 sm:space-y-8 pb-12">
      <header>
        <div class="text-xs font-semibold text-[#FF5B45] mb-2">${t("Аналитика и прогресс","Таҳлил ва пешрафт","Analytics & Progress")}</div>
        <h1 class="text-2xl sm:text-4xl font-black">${t("Статистика обучения","Омори омӯзиш","Learning Statistics")}</h1>
        <p class="text-xs sm:text-sm text-gray-500 mt-1">${t("Ваши реальные результаты по пройденным заданиям.","Натиҷаҳои воқеии машқҳои гузаронидашуда.","Your real performance and test records.")}</p>
      </header>

      <!-- 4 Key Metrics Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        ${[[e.results.length,t("Пройдено тестов","Санҷишҳои гузашта","Tests Completed")],[s,t("Средний Band","Холи миёна","Average Band")],[Object.values(e.completedLessons).filter(Boolean).length,t("Уроков пройдено","Дарсҳои гузашта","Lessons Done")],[((d=e.user)==null?void 0:d.targetBand)||7,t("Целевой балл","Холи мақсаднок","Target Score")]].map(([l,o])=>`
          <div class="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-gray-100 shadow-sm">
            <span class="text-[11px] sm:text-xs text-gray-400 block truncate">${o}</span>
            <p class="text-2xl sm:text-3xl font-black text-gray-900 mt-1 sm:mt-2">${l}</p>
          </div>
        `).join("")}
      </div>

      <!-- Skill Breakdown -->
      <div class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-8 shadow-sm">
        <h2 class="text-lg sm:text-xl font-black mb-4 sm:mb-6">${t("Результаты по навыкам","Натиҷа аз рӯйи маҳорат","Breakdown by Skill")}</h2>
        <div class="space-y-4 sm:space-y-5">
          ${r.map(l=>{const o=e.results.filter(m=>m.skill===l&&typeof m.score=="number"),i=o.length?o.reduce((m,g)=>m+g.score,0)/o.length:0;return`
              <div>
                <div class="flex justify-between text-xs sm:text-sm mb-1.5 sm:mb-2">
                  <span class="font-medium text-gray-700">${y(l)}</span>
                  <b class="font-bold text-gray-900">${o.length?i.toFixed(1):"—"}</b>
                </div>
                <div class="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div class="h-2 rounded-full bg-[#FF5B45]" style="width:${i/9*100}%"></div>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>

      <!-- Recent Attempts List -->
      <div class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-sm">
        <h2 class="font-bold text-base sm:text-lg mb-3 sm:mb-4">${t("Последние попытки","Кӯшишҳои охирин","Recent Attempts")}</h2>
        <div class="divide-y divide-gray-50">
          ${e.results.slice(0,8).map(l=>`
            <div class="flex flex-col sm:flex-row sm:items-center justify-between py-3 text-xs sm:text-sm gap-1 sm:gap-4">
              <span class="text-gray-800 font-medium">${n(l.title)} · <span class="text-gray-500">${y(l.skill)}</span></span>
              <b class="text-[#FF5B45] font-bold self-start sm:self-auto">${typeof l.score=="number"?`${l.score} Band`:t("Ответ сохранён","Ҷавоб сабт шуд","Saved")}</b>
            </div>
          `).join("")||`<p class="text-xs sm:text-sm text-gray-500 py-4">${t("Пройдите первый тест, чтобы увидеть результаты.","Барои дидани натиҷаҳо аввалин санҷишро гузаред.","Take your first test to see results.")}</p>`}
        </div>
      </div>
    </div>
  `}function Q(){const a=e.user||{};return`
    <div class="space-y-5 sm:space-y-6 pb-16 max-w-5xl mx-auto">
      <!-- Profile Header Banner -->
      <div class="bg-gradient-to-r from-[#FF5B45] via-[#FF6048] to-[#FF5B45] rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5">
        <img src="/logo.png" alt="EnglishPrep" class="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shadow-md ring-2 ring-white/30 shrink-0" style="border-radius: 50%;">
        <div>
          <span class="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white/80">${t("ТВОЙ АККАУНТ","ҲИСОБИ ШУМО","YOUR ACCOUNT")}</span>
          <h1 class="text-xl sm:text-3xl font-black mt-0.5 sm:mt-1">${n(a.name||t("Пользователь","Корбар","User"))}</h1>
          <p class="text-xs sm:text-sm text-white/90">${n(a.email||"")}</p>
        </div>
      </div>

      <!-- Settings Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <section class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-sm">
          <h2 class="text-base sm:text-lg font-extrabold mb-4 sm:mb-5">${t("Личные данные","Маълумоти шахсӣ","Personal Details")}</h2>
          <form id="profile-form" class="space-y-4">
            <label class="block text-xs sm:text-sm font-semibold text-gray-700">
              ${t("Имя","Ном","Name")}
              <input name="name" value="${n(a.name||"")}" class="block w-full mt-1 p-2.5 sm:p-3 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#FF5B45] transition-colors">
            </label>
            <label class="block text-xs sm:text-sm font-semibold text-gray-700">
              Email
              <input value="${n(a.email||"")}" disabled class="block w-full mt-1 p-2.5 sm:p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed text-base sm:text-sm">
            </label>
            <label class="block text-xs sm:text-sm font-semibold text-gray-700">
              ${t("Целевой балл IELTS","Холи мақсадноки IELTS","Target IELTS Band")}
              <input name="targetBand" type="number" min="4" max="9" step="0.5" value="${n(a.targetBand||a.target_band||7)}" class="block w-full mt-1 p-2.5 sm:p-3 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#FF5B45] transition-colors">
            </label>
            <label class="block text-xs sm:text-sm font-semibold text-gray-700">
              ${t("Дата экзамена","Санаи имтиҳон","Exam Date")}
              <input name="examDate" type="date" value="${n(a.examDate||a.ielts_date||"")}" class="block w-full mt-1 p-2.5 sm:p-3 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#FF5B45] transition-colors">
            </label>
            <button type="submit" class="w-full sm:w-auto bg-[#FF5B45] hover:bg-[#E6432A] text-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-colors shadow-sm min-h-[40px]">${t("Сохранить","Сабт кардан","Save changes")}</button>
          </form>
        </section>

        <section class="space-y-4 sm:space-y-5">
          <div class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-sm">
            <h2 class="font-extrabold text-sm sm:text-base mb-3 sm:mb-4">${t("Настройки","Танзимот","Settings")}</h2>
            <div class="flex justify-between items-center">
              <span class="text-xs sm:text-sm font-bold text-gray-700">${t("Язык сайта","Забони сомона","Site language")}</span>
              ${k()}
            </div>
          </div>
          <div class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-sm">
            <h2 class="font-extrabold text-sm sm:text-base">${t("Поддержка","Дастгирӣ","Support")}</h2>
            <a href="mailto:support@englishprep.com" class="text-xs sm:text-sm text-[#FF5B45] block mt-2 font-medium">support@englishprep.com</a>
          </div>
          <button data-action="logout" class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-colors min-h-[44px]">
            ${t("Выйти","Баромадан","Log out")}
          </button>
        </section>
      </div>
    </div>
  `}function x(){document.documentElement.lang=e.language;const a=location.pathname;if(a==="/"){h.innerHTML=_();return}if(a==="/auth"&&e.token&&e.user)return history.replaceState({},"","/dashboard"),x();if(a==="/auth"){h.innerHTML=E();return}if(!e.token||!e.user){history.replaceState({},"","/auth"),h.innerHTML=E();return}let s="";if(a==="/dashboard")s=T();else if(a==="/lessons")s=G();else if(a.startsWith("/lessons/"))s=H(decodeURIComponent(a.split("/").pop()));else if(a==="/vocabulary")s=W();else if(a==="/tests")s=J();else if(a.startsWith("/tests/")){const[,,r,d]=a.split("/");s=z(r,decodeURIComponent(d))}else a==="/statistics"?s=Y():a==="/profile"?s=Q():s=T();if(h.innerHTML=U(s),a.startsWith("/tests/")){const r=document.querySelector("#test-clock");r&&(r.textContent=A(e.testTimeLeft))}}async function K(a){const s=Object.fromEntries(new FormData(a).entries());e.authError="";try{const r=e.authMode==="register"?"/auth/register":"/auth/login",d=await v(r,{method:"POST",body:JSON.stringify({name:s.name,email:s.email,password:s.password,language:e.language})});e.token=d.accessToken||d.token||"",e.user={...d.user,language:e.language},localStorage.setItem("englishprep_token",e.token),localStorage.setItem("englishprep_user",JSON.stringify(e.user)),f("/dashboard")}catch(r){e.authError=r.message,x()}}async function Z(){e.authError="";const a=t("Введите Google Email для быстрого входа:","Email-и Google-ро барои воридшавӣ ворид намоед:","Enter your Google Email to continue:"),s=prompt(a,"edfoevkhurshed111@gmail.com");if(!s||!s.trim())return;const r=s.trim(),d=r.split("@")[0];try{const l=await v("/auth/google",{method:"POST",body:JSON.stringify({email:r,name:d,language:e.language})});e.token=l.accessToken||l.token||"google_token_"+Date.now(),e.user={...l.user,language:e.language},localStorage.setItem("englishprep_token",e.token),localStorage.setItem("englishprep_user",JSON.stringify(e.user)),f("/dashboard")}catch{const o={id:999,name:d.charAt(0).toUpperCase()+d.slice(1),email:r,language:e.language,targetBand:7.5};e.token="google_demo_"+Date.now(),e.user=o,localStorage.setItem("englishprep_token",e.token),localStorage.setItem("englishprep_user",JSON.stringify(e.user)),f("/dashboard")}}async function q(a){const s=Object.fromEntries(new FormData(a).entries());e.user={...e.user,name:s.name,targetBand:Number(s.targetBand),target_band:Number(s.targetBand),examDate:s.examDate,ielts_date:s.examDate},localStorage.setItem("englishprep_user",JSON.stringify(e.user)),v("/user/profile",{method:"PUT",body:JSON.stringify({name:s.name,target_band:Number(s.targetBand),ielts_date:s.examDate,language:e.language})}).catch(()=>{}),x()}document.addEventListener("click",a=>{if(!a.target.closest(".language-dropdown")&&e.langMenuOpen){e.langMenuOpen=!1,x();return}const r=a.target.closest("[data-route],[data-action]");if(!r)return;const d=r.dataset.route;if(d){r.dataset.authMode&&(e.authMode=r.dataset.authMode),a.preventDefault(),f(d);return}const l=r.dataset.action;if(l==="toggle-lang-menu")e.langMenuOpen=!e.langMenuOpen,x();else if(l==="set-language")P(r.dataset.language);else if(l==="google-login")Z();else if(l==="toggle-auth")e.authMode=e.authMode==="login"?"register":"login",e.authError="",x();else if(l==="landing-menu")e.landingMenuOpen=!e.landingMenuOpen,x();else if(l==="close-landing-menu")e.landingMenuOpen=!1,x();else if(l==="mobile-menu")e.mobileOpen=!e.mobileOpen,x();else if(l==="close-menu")e.mobileOpen=!1,x();else if(l==="skill")e.activeSkill=r.dataset.skill,e.writingFilter="all",x();else if(l==="learn-word"){const o=w("englishprep_learned_words",{});o[r.dataset.wordId]=!o[r.dataset.wordId],localStorage.setItem("englishprep_learned_words",JSON.stringify(o)),x()}else if(l==="speak"){if("speechSynthesis"in window){const o=new SpeechSynthesisUtterance(r.dataset.word);o.lang="en-US",speechSynthesis.speak(o)}}else if(l==="check-lesson")e.lessonAnswers={...e.lessonAnswers},e.lessonChecked=!0,x();else if(l==="complete-lesson"){const o=r.dataset.lessonId;e.completedLessons[o]=!0,localStorage.setItem("englishprep_completed_lessons",JSON.stringify(e.completedLessons)),v(`/lessons/${encodeURIComponent(o)}/complete`,{method:"POST",body:JSON.stringify({score:X(o)})}).catch(()=>{}),x()}else if(l==="submit-test"){const o=r.dataset.testId,i=e.tests.find(m=>m.id===o);i&&I(i)}else l==="reset-test"?(e.testAnswers={},e.testSubmitted=!1,e.testTimeLeft=0,f(location.pathname)):l==="logout"&&(e.token="",e.user=null,localStorage.removeItem("englishprep_token"),localStorage.removeItem("englishprep_user"),f("/auth"))});h.addEventListener("change",a=>{const s=a.target;s.matches("[data-test-answer]")&&(e.testAnswers[s.dataset.testAnswer]=s.value),s.matches("[data-lesson-answer]")&&(e.lessonAnswers[s.dataset.lessonAnswer]=s.value),s.id==="writing-filter"&&(e.writingFilter=s.value,x())});h.addEventListener("input",a=>{const s=a.target;if(s.matches("[data-test-answer], [data-lesson-answer]")){const r=s.dataset.testAnswer||s.dataset.lessonAnswer,d=s.hasAttribute("data-test-answer")?e.testAnswers:e.lessonAnswers;d[r]=s.value}if(s.id==="word-search"){const r=new URL(location.href);r.searchParams.set("q",s.value),history.replaceState({},"",r);const d=s.selectionStart;x();const l=document.querySelector("#word-search");l==null||l.focus(),l==null||l.setSelectionRange(d,d)}});h.addEventListener("submit",a=>{a.preventDefault(),a.target.id==="auth-form"&&K(a.target),a.target.id==="profile-form"&&q(a.target)});window.addEventListener("popstate",()=>{e.timerId&&(clearInterval(e.timerId),e.timerId=null),x()});function X(a){var d;const s=e.lessons.find(l=>l.id===a),r=(s==null?void 0:s.exercises)||((d=s==null?void 0:s.content)==null?void 0:d.exercises)||[];return r.length?Math.round(r.filter(l=>e.lessonAnswers[l.id]===l.correctAnswer).length/r.length*100):100}O().then(x).catch(a=>{console.error("Could not load lesson data",a),h.innerHTML=`<main class="min-h-screen grid place-items-center p-6"><div class="bg-white rounded-3xl p-8 shadow-sm text-center"><h1 class="text-xl font-bold">EnglishPrep</h1><p class="text-sm text-gray-500 mt-2">${t("Не удалось загрузить материалы курса. Обновите страницу.","Маводи курс бор нашуд. Саҳифаро нав кунед.","Failed to load course materials. Please refresh.")}</p><button class="mt-5 bg-[#FF5B45] text-white rounded-full px-5 py-2" onclick="location.reload()">${t("Обновить","Нав кардан","Refresh")}</button></div></main>`});
