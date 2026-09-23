/* ==========================================================================
   Hassan Hamid — script.js
   1. Translations (BM default, EN optional)
   2. Language toggle + localStorage preference ("hh-language")
   3. Mobile menu
   4. Reveal-on-scroll + footer year

   To translate an element: add data-i18n="key" in index.html and add
   the same key to BOTH `ms` and `en` below. Values may contain simple HTML
   (<br>, <em>). For image alt text use data-i18n-alt="key".
   ========================================================================== */

const translations = {
  ms: {
    skipLink: "Langkau ke kandungan",
    navJourney: "Journey", navWorks: "Works", navReflections: "Reflections", navGallery: "Gallery", navStore: "Store", navContact: "Contact",
    heroEyebrow: "A LIFELONG LEARNER &amp; INDEPENDENT CREATOR",
    heroTitle: "Creating with AI.<br>Learning through life.<br><em>Leaving something meaningful.</em>",
    heroLead: "Daripada pengalaman kepada idea. Daripada idea kepada karya. Daripada karya kepada sesuatu yang bermanfaat.",
    exploreWorks: "Explore My Works", myJourney: "My Journey", portraitCaption: "Ideas • Learning • Creation",

    labelStory: "THE STORY", storyTitle: "A life of learning.<br>A new chapter of creating.",
    storyText: "Setelah bertahun-tahun dalam kejuruteraan dan perundingan, saya memasuki satu fasa baharu dalam hidup — meneroka teknologi Artificial Intelligence dan menggunakannya untuk menulis, menghasilkan muzik, membina bahan pendidikan, mencipta ilustrasi dan mengembangkan idea menjadi karya.",
    storyNote: "AI bagi saya ialah alat. Idea, pengalaman dan mesej tetap bermula daripada manusia.",

    labelJourney: "THE JOURNEY", journeyTitle: "A journey across disciplines.",
    journeyIntro: "Daripada engineering kepada penulisan, muzik, pendidikan, AI dan karya visual.",
    t2Year: "16 YEARS", t2Title: "Jurutera Awam",
    t2Desc: "Jabatan Parit dan Taliair, kini dikenali sebagai Jabatan Pengairan dan Saliran (JPS)",
    t3Year: "NEXT", t3Title: "Jurutera Perunding", consultingDesc: "Meneruskan kerjaya dalam sektor swasta.",
    t4Desc: "Universiti Sains Malaysia, Pulau Pinang — Pembangunan Islam",
    t5Year: "TODAY",

    labelProcess: "THE CREATIVE PROCESS", processTitle: "From an idea to something people can experience.",
    processIntro: "Satu idea boleh berkembang menjadi pelbagai bentuk.",

    labelWorks: "KARYA &amp; PROJEK", worksTitle: "Many forms. One purpose.",
    worksIntro: "Perjalanan kreatif ini merangkumi penulisan, muzik, pendidikan, kandungan Islamik, ilustrasi, video dan produk.",
    w1: "Penulisan &amp; E-book",
    w2: "Nasyid &amp; Muzik Islamik", w2p: "Reflections of Iman · Lagu · Lirik · Video berserta lirik",
    w3: "Al-Quran, Surah &amp; Pengajaran", w3p: "Kajian ringkas, pengajaran, lirik, nasyid, voice-over, video dan bahan visual.",
    w4: "Lagu Pendidikan",
    w5: "Mnemonik Islamik", w5p: "HAWAU · CENCALOK · Ilustrasi dan bahan peringatan",
    w6: "Motivasi &amp; Peringatan", w6p: "Wallpaper · Poster · Magnet · Mousepad · T-shirt · Mug · Cenderamata",
    w7: "Ilustrasi Digital", w7p: "Islamik · Motivasi · Kehidupan · Pendidikan · Humor · Melaka",
    w8: "Wallpaper Telefon", w8p: "Kata-kata peringatan, mnemonik, motivasi, ilustrasi dan tema pendidikan/Melaka.",
    w9: "Produk Cenderamata",
    w10: "Cenderamata Melaka", w10p: "Humor · permainan bahasa · identiti tempatan",
    w11: "Manglish &amp; Humor", w11p: "Ungkapan harian Malaysia untuk produk kecil dan cenderamata",
    w12: "Video &amp; Kandungan Digital", w12p: "Artikel · Lirik · Lagu · Voice-over · Video · Ilustrasi · Wallpaper",
    w13: "AI sebagai Alat Penghasilan",
    w14: "Daripada Idea kepada Produk", w14p: "Idea → tulisan → lagu → video → ilustrasi → wallpaper → produk",
    w15: "Misi di Hujung Usia", w15p: "Menggunakan masa, pengalaman dan teknologi untuk menghasilkan sesuatu yang bermanfaat.",
    viewProject: "Lihat projek",

    labelReflection: "REFLECTIONS",
    reflectionTitle: "Creating supporting content that invites people to pause, listen, read and reflect.",
    reflectionText: "Antara projek yang ingin dikembangkan ialah kajian terhadap surah-surah Al-Quran, mengenal pasti tema dan pengajaran utama, kemudian mengolahnya menjadi lirik, nasyid, voice-over, video dan bahan visual.",
    reflectionNotice: "Kandungan ini bukan untuk menggantikan pembelajaran Al-Quran atau tafsir. Ia adalah bahan sokongan untuk membantu seseorang berhenti seketika, membaca, mendengar dan merenungkan mesej yang disampaikan. Sebarang kandungan berkaitan Al-Quran wajar dirujuk dan diteliti daripada sumber yang boleh dipercayai.",

    labelGallery: "THE GALLERY", galleryTitle: "A growing visual archive.",
    galleryIntro: "Koleksi ilustrasi akan dikembangkan di sini mengikut tema dan projek.",
    portraitLabel: "POTRET",
    altHero: "Hassan Hamid duduk di meja dalam studio kreatif sambil memegang stylus, dikelilingi buku, komputer riba dan karya seni berbingkai",
    altStudy: "Hassan Hamid di meja kayu dalam bilik bacaan klasik, dengan buku, lampu meja dan khat Islam di belakangnya",
    altPortrait: "Gambar Hassan Hamid memakai songkok dan jaket bersulam corak batik",

    labelStore: "THE STORE", storeTitle: "A message can live on paper, on a screen — or in your hands.",
    storeText: "Karya digital boleh dikembangkan menjadi wallpaper, magnet, mousepad, keychain, sticker, mug, T-shirt, poster dan cenderamata.",

    legacyTitle: "Berubahnya zaman tidak bermakna kita berhenti belajar.",
    legacyText: "Usia bukan penghalang untuk meneroka sesuatu yang baharu. Pengalaman yang telah dilalui boleh digabungkan dengan teknologi baharu untuk menghasilkan sesuatu yang bermanfaat.",
    legacyQuote: "“Selagi masih mempunyai idea, selagi masih mampu belajar dan menghasilkan sesuatu, saya ingin terus berkarya.”",

    labelContact: "CONTACT", contactTitle: "Have an idea worth exploring?",
    contactText: "Website ini dibina sebagai ruang untuk karya, projek, refleksi dan produk Hassan Hamid.",
    footerText: "Ideas · Creativity · Purpose"
  },

  en: {
    skipLink: "Skip to content",
    navJourney: "Journey", navWorks: "Works", navReflections: "Reflections", navGallery: "Gallery", navStore: "Store", navContact: "Contact",
    heroEyebrow: "A LIFELONG LEARNER &amp; INDEPENDENT CREATOR",
    heroTitle: "Creating with AI.<br>Learning through life.<br><em>Leaving something meaningful.</em>",
    heroLead: "From experience to ideas. From ideas to creation. From creation to something meaningful.",
    exploreWorks: "Explore My Works", myJourney: "My Journey", portraitCaption: "Ideas • Learning • Creation",

    labelStory: "THE STORY", storyTitle: "A life of learning.<br>A new chapter of creating.",
    storyText: "After years in engineering and consulting, I entered a new chapter of life — exploring Artificial Intelligence and using it to write, create music, develop educational material, create illustrations and turn ideas into works.",
    storyNote: "For me, AI is a tool. The ideas, experience and message still begin with the human.",

    labelJourney: "THE JOURNEY", journeyTitle: "A journey across disciplines.",
    journeyIntro: "From engineering to writing, music, education, AI and visual creation.",
    t2Year: "16 YEARS", t2Title: "Civil Engineer",
    t2Desc: "Jabatan Parit dan Taliair (Drainage and Irrigation Department), now the Department of Irrigation and Drainage (JPS)",
    t3Year: "NEXT", t3Title: "Consulting Engineer", consultingDesc: "Continuing a career in the private sector.",
    t4Desc: "Universiti Sains Malaysia, Penang — Islamic Development",
    t5Year: "TODAY",

    labelProcess: "THE CREATIVE PROCESS", processTitle: "From an idea to something people can experience.",
    processIntro: "One idea can take many forms.",

    labelWorks: "WORKS &amp; PROJECTS", worksTitle: "Many forms. One purpose.",
    worksIntro: "A creative journey across writing, music, education, Islamic content, illustration, video and products.",
    w1: "Writing &amp; E-books",
    w2: "Nasheed &amp; Islamic Music", w2p: "Reflections of Iman · Songs · Lyrics · Lyric videos",
    w3: "Quran, Surahs &amp; Reflections", w3p: "Short studies, lessons, lyrics, nasheed, voice-over, video and visual material.",
    w4: "Educational Songs",
    w5: "Islamic Mnemonics", w5p: "HAWAU · CENCALOK · Illustrations and reminder material",
    w6: "Motivation &amp; Reminders", w6p: "Wallpapers · Posters · Magnets · Mousepads · T-shirts · Mugs · Souvenirs",
    w7: "Digital Illustration", w7p: "Islamic · Motivation · Life · Education · Humour · Melaka",
    w8: "Phone Wallpapers", w8p: "Reminders, mnemonics, motivation, illustrations and education/Melaka themes.",
    w9: "Souvenir Products",
    w10: "Melaka Souvenirs", w10p: "Humour · wordplay · local identity",
    w11: "Manglish &amp; Humour", w11p: "Everyday Malaysian expressions for small products and souvenirs",
    w12: "Video &amp; Digital Content", w12p: "Articles · Lyrics · Songs · Voice-over · Video · Illustration · Wallpapers",
    w13: "AI as a Creative Tool",
    w14: "From Idea to Product", w14p: "Idea → writing → song → video → illustration → wallpaper → product",
    w15: "A Later-Life Mission", w15p: "Using time, experience and technology to create something meaningful.",
    viewProject: "View project",

    labelReflection: "REFLECTIONS",
    reflectionTitle: "Creating supporting content that invites people to pause, listen, read and reflect.",
    reflectionText: "One area I want to develop further is the study of Quranic surahs — identifying themes and key lessons, then transforming them into lyrics, nasheed, voice-over, video and visual material.",
    reflectionNotice: "This content is not intended to replace Quranic learning or tafsir. It is supporting material designed to help someone pause, read, listen and reflect on the message. Any Quran-related content should be checked carefully against reliable sources.",

    labelGallery: "THE GALLERY", galleryTitle: "A growing visual archive.",
    galleryIntro: "The illustration collection will grow here, organised by theme and project.",
    portraitLabel: "PORTRAIT",
    altHero: "Hassan Hamid seated at his desk in a creative studio, holding a stylus, surrounded by books, a laptop and framed artwork",
    altStudy: "Hassan Hamid at a wooden desk in a classic study, with books, a desk lamp and Islamic calligraphy behind him",
    altPortrait: "Photograph of Hassan Hamid wearing a songkok and a batik-trimmed jacket",

    labelStore: "THE STORE", storeTitle: "A message can live on paper, on a screen — or in your hands.",
    storeText: "Digital works can become wallpapers, magnets, mousepads, keychains, stickers, mugs, T-shirts, posters and souvenirs.",

    legacyTitle: "A changing world does not mean we stop learning.",
    legacyText: "Age is not a barrier to exploring something new. Experience can be combined with new technology to create something useful and meaningful.",
    legacyQuote: "“As long as I have ideas, as long as I can keep learning and creating, I want to keep making.”",

    labelContact: "CONTACT", contactTitle: "Have an idea worth exploring?",
    contactText: "This website is a space for Hassan Hamid’s works, projects, reflections and products.",
    footerText: "Ideas · Creativity · Purpose"
  }
};

/* Labels for the header controls (not part of page copy). */
const ui = {
  ms: { toggleText: "EN", toggleLabel: "Switch to English", menuOpen: "Buka menu", menuClose: "Tutup menu" },
  en: { toggleText: "BM", toggleLabel: "Tukar ke Bahasa Melayu", menuOpen: "Open menu", menuClose: "Close menu" }
};

const STORAGE_KEY = "hh-language";
const DEFAULT_LANG = "ms";

function readStoredLang() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return translations[value] ? value : DEFAULT_LANG;
  } catch (e) {
    return DEFAULT_LANG;
  }
}

function storeLang(value) {
  try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* storage unavailable: ignore */ }
}

let lang = readStoredLang();

document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.getElementById("langToggle");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("site-nav");

  /* ---------- Language ---------- */
  function applyLanguage() {
    const dict = translations[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const value = dict[el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(el => {
      const value = dict[el.dataset.i18nAlt];
      if (value !== undefined) el.alt = value;
    });

    langToggle.textContent = ui[lang].toggleText;
    langToggle.setAttribute("aria-label", ui[lang].toggleLabel);
    langToggle.title = ui[lang].toggleLabel;
    updateMenuLabel();
    storeLang(lang);
  }

  langToggle.addEventListener("click", () => {
    lang = lang === "ms" ? "en" : "ms";
    applyLanguage();
  });

  /* ---------- Mobile menu ---------- */
  const mobileQuery = window.matchMedia("(max-width: 900px)");

  function isMenuOpen() { return menuToggle.getAttribute("aria-expanded") === "true"; }

  function updateMenuLabel() {
    menuToggle.setAttribute("aria-label", isMenuOpen() ? ui[lang].menuClose : ui[lang].menuOpen);
  }

  function setMenu(open, returnFocus) {
    menuToggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    updateMenuLabel();
    syncNavVisibility();
    if (open) {
      const first = nav.querySelector("a");
      if (first) first.focus();
    } else if (returnFocus) {
      menuToggle.focus();
    }
  }

  // Hide the off-screen menu from assistive tech on small screens while closed.
  function syncNavVisibility() {
    if (mobileQuery.matches) {
      nav.toggleAttribute("inert", !isMenuOpen());
    } else {
      nav.removeAttribute("inert");
      if (isMenuOpen()) setMenu(false);
    }
  }

  menuToggle.addEventListener("click", () => {
    setMenu(!isMenuOpen(), true);
  });

  nav.addEventListener("click", e => {
    if (e.target.closest("a") && isMenuOpen()) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && isMenuOpen()) {
      setMenu(false, true);
    }
  });

  if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", syncNavVisibility);
  else mobileQuery.addListener(syncNavVisibility);
  syncNavVisibility();

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("visible"));
  }

  applyLanguage();
});
