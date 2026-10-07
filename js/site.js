/* ==========================================================
   Sophia Philosophy Club — shared behaviour for every page
   - builds the top menu and the footer
   - switches the language (ع / FR / EN)
   - loads Facebook posts only when they come into view
   ========================================================== */
(function () {
  // Texts shared by every page (menu + footer)
  const SHARED = {
    ar: {
      "brand": "نادي صوفيا",
      "nav.home": "الرئيسية", "nav.debates": "المناقشات", "nav.articles": "المقالات", "nav.videos": "الفيديوهات", "nav.guests": "الضيوف و الزيارات",
      "f.brand": "نادي صوفيا للفلسفة", "f.copy": "© نادي صوفيا للفلسفة", "f.bug": "لاحظت خللًا في الموقع؟ أبلغنا"
    },
    fr: {
      "brand": "Club Sophia",
      "nav.home": "Accueil", "nav.debates": "Débats", "nav.articles": "Articles", "nav.videos": "Vidéos", "nav.guests": "Invités & visites",
      "f.brand": "Club de philosophie Sophia", "f.copy": "© Club de philosophie Sophia", "f.bug": "Un problème sur le site&nbsp;? Signalez-le"
    },
    en: {
      "brand": "Sophia Club",
      "nav.home": "Home", "nav.debates": "Debates", "nav.articles": "Articles", "nav.videos": "Videos", "nav.guests": "Guests & visits",
      "f.brand": "Sophia Philosophy Club", "f.copy": "© Sophia Philosophy Club", "f.bug": "Found a problem on the site? Let us know"
    }
  };
  const AR = SHARED.ar;
  const page = document.body.dataset.page || "";

  // ---------- Top menu ----------
  const links = [
    ["home", "home.html"], ["debates", "debates.html"], ["articles", "articles.html"],
    ["videos", "videos.html"], ["guests", "guests.html"]
  ];
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="wrap bar">
      <a href="home.html" class="brand">
        <img src="images/sophia.png" alt="">
        <span data-i18n="brand">${AR.brand}</span>
      </a>
      <nav class="site-nav">
        <ul>
          ${links.map(([key, href]) =>
            `<li><a href="${href}"${key === page ? ' class="active"' : ""} data-i18n="nav.${key}">${AR["nav." + key]}</a></li>`
          ).join("")}
        </ul>
      </nav>
      <div class="langs" role="group" aria-label="Language">
        <button type="button" data-lang="ar" aria-pressed="true">ع</button>
        <button type="button" data-lang="fr" aria-pressed="false">FR</button>
        <button type="button" data-lang="en" aria-pressed="false">EN</button>
      </div>
      <button class="menu-btn" aria-label="Menu" aria-expanded="false">☰</button>
    </div>`;
  document.body.prepend(header);

  // ---------- Footer ----------
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="wrap">
      <div class="foot">
        <a href="home.html" class="brand">
          <img src="images/sophia.png" alt="">
          <span data-i18n="f.brand">${AR["f.brand"]}</span>
        </a>
        <div class="socials">
          <a href="https://www.facebook.com/profile.php?id=100063707634531" target="_blank" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8Z"/></svg></a>
          <a href="https://www.instagram.com/sophiaphilosophy/" target="_blank" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
          <a href="https://www.youtube.com/@sophiaclub2020" target="_blank" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-4.8 31 31 0 0 0-.4-4.8ZM9.7 15.1V8.9L15.5 12l-5.8 3.1Z"/></svg></a>
          <a href="https://medium.com/@sophia.club2020" target="_blank" aria-label="Medium"><svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="7" cy="12" rx="6" ry="6"/><ellipse cx="17" cy="12" rx="3" ry="5.6"/><ellipse cx="22" cy="12" rx="1" ry="5"/></svg></a>
          <a href="mailto:sophia.club2020@gmail.com" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></svg></a>
        </div>
      </div>
      <div class="fine">
        <span data-i18n="f.copy">${AR["f.copy"]}</span>
        <a href="https://github.com/Sophia-Philosophy-Club" target="_blank" data-i18n="f.bug">${AR["f.bug"]}</a>
      </div>
    </div>`;
  document.body.append(footer);

  // ---------- Language ----------
  // Arabic is read from the page itself; French/English come from SHARED + the page's own PAGE_I18N
  const PAGE = window.PAGE_I18N || {};
  const nodes = document.querySelectorAll("[data-i18n]");
  const arabic = { title: document.title };
  nodes.forEach((el) => { arabic[el.dataset.i18n] = el.innerHTML; });

  function setLang(lang) {
    if (!SHARED[lang]) lang = "ar";
    const dict = lang === "ar" ? {} : Object.assign({}, SHARED[lang], PAGE[lang]);
    nodes.forEach((el) => { el.innerHTML = dict[el.dataset.i18n] ?? arabic[el.dataset.i18n]; });
    document.title = dict.title ?? arabic.title;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll(".langs button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    try { localStorage.setItem("sophia-lang", lang); } catch (e) {}
  }

  document.querySelectorAll(".langs button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

  let start = new URLSearchParams(location.search).get("lang");
  if (!start) { try { start = localStorage.getItem("sophia-lang"); } catch (e) {} }
  if (start && start !== "ar") setLang(start);
  document.documentElement.classList.remove("i18n-wait");

  // ---------- Mobile menu ----------
  const menuBtn = header.querySelector(".menu-btn");
  const nav = header.querySelector(".site-nav");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.textContent = open ? "✕" : "☰";
  });

  // ---------- Fade sections in as they scroll into view ----------
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

  // ---------- Facebook posts: load each one when it gets close to the screen ----------
  const posts = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const box = e.target;
      const frame = document.createElement("iframe");
      frame.src = box.dataset.src;
      frame.title = "Facebook";
      frame.scrolling = "no";
      frame.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      frame.onload = () => box.classList.add("loaded");
      box.append(frame);
      posts.unobserve(box);
    });
  }, { rootMargin: "600px 0px" });
  document.querySelectorAll(".post[data-src]").forEach((el) => posts.observe(el));
})();
