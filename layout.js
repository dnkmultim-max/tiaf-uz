// Умумий қобиқ: юқори панель, меню, футер, ён меню. Барча саҳифалар ва тиллар шу файлни ишлатади.
// Прототипда JS орқали чизилади; CMS босқичида сервер томонидан берилади.
// Матнлар t() орқали (ўзбекча манба матн билан) ўтади; таржималар i18n/<тил>.js да (tools/i18n/build_i18n.py яратади).
const t = s => (window.TR && window.TR[s]) || s;

const LANGS = [["uz", "ЎЗ", "uz-Cyrl", "Ўзбекча (кирилл)"], ["oz", "OʻZ", "uz-Latn", "Oʻzbekcha (lotin)"], ["ru", "RU", "ru", "Русский"], ["en", "EN", "en", "English"], ["fr", "FR", "fr", "Français"]];
const htmlLang = document.documentElement.lang;
const curLang = (LANGS.find(l => l[2] === htmlLang) || LANGS[0])[0];
const P = curLang === "uz" ? "" : "../"; // тил папкасидаги саҳифалар учун асосий папкага йўл

const MENU = [
  [t("Академия ҳақида"), "akademiya.html", [
    [t("Миссия ва қарор"), "missiya.html"], [t("Раҳбарият"), "rahbariyat.html"], [t("Тузилма"), "tuzilma.html"],
    [t("Устав ва ҳужжатлар"), "hujjatlar.html"], [t("Ҳамкор академиялар"), "hamkorlar.html"], [t("Манзил ва алоқа"), "aloqa.html"]]],
  [t("Таълим"), "talim.html", [
    [t("Бакалавриат"), "bakalavriat.html"], [t("Магистратура"), "magistratura.html"], [t("Қўшма дастурлар"), "qoshma-dasturlar.html"],
    [t("Дуал таълим"), "dual-talim.html"], [t("Малака ошириш"), "malaka-oshirish.html"], [t("Ўқув календари"), "oquv-kalendari.html"]]],
  [t("Қабул"), "qabul.html", [
    [t("Йўналишлар"), "qabul-yonalishlar.html"], [t("Қабул тартиби"), "qabul-tartibi.html"], [t("Ижодий имтиҳон"), "ijodiy-imtihon.html"],
    [t("Тўлов ва грант"), "tolov-grant.html"], [t("Хорижий фуқаролар"), "xorijiy-fuqarolar.html"], [t("Онлайн ариза"), "onlayn-ariza.html"]]],
  [t("Талабаларга"), "talabalar.html", [
    [t("Регистратор офиси"), "registrator.html"], [t("HEMIS ва LMS"), "hemis-lms.html"], [t("Турар жой"), "turar-joy.html"],
    [t("Стипендия"), "stipendiya.html"], [t("Тўгараклар"), "tugaraklar.html"], [t("Виртуал қабулхона"), "virtual-qabulxona.html"]]],
  [t("Илм-фан"), "#", [[t("Тадқиқот йўналишлари")], [t("Лабораториялар")], [t("Нашрлар")], [t("Конференциялар")], [t("Халқаро ҳамкорлик")], [t("Инновация")]]],
  [t("Шоулар"), "#", [[t("Битирув коллекциялари")], [t("Шоулар ва тадбирлар")], [t("Талаба лойиҳалари")], [t("Миллий брендлар")], [t("Архив")], [t("Галерея")]]],
  [t("Карьера"), "#", [[t("Вакансиялар")], [t("Иш берувчиларга")], [t("Битирувчилар")], [t("Амалиёт")], [t("Бандлик мониторинги")], [t("Карьера маркази")]]],
  [t("Янгиликлар"), "#", [[t("Янгиликлар")], [t("Эълонлар")], [t("Тадбирлар календари")], [t("Журнал")], [t("Медиа")], [t("Матбуот хизмати")]]],
  [t("Очиқлик"), "ochiqlik.html", [
    [t("Очиқ маълумотлар"), "ochiq-malumotlar.html"], [t("Мурожаатлар тартиби"), "murojaatlar.html"], [t("Раҳбар қабулхонаси"), "rahbar-qabulxonasi.html"],
    [t("Коррупцияга қарши"), "korrupsiya.html"], [t("Ҳисоботлар"), "hisobotlar.html"], [t("Харидлар"), "xaridlar.html"]]],
];
const HOME = "index.html";
const APPLY = "onlayn-ariza.html";
const body = document.body;
const here = body.dataset.page || "";
const sectionIdx = body.dataset.section ? Number(body.dataset.section) : -1;
const SITE = t("Тошкент халқаро мода академияси");

// Лого: «TIAF» белгиси — расм, ном эса тилга қараб HTML матн (шу тарзда тил алмашганда лого ёзуви ҳам алмашади).
// Қўшимча сатр: инглиз тилидан ташқари ҳамма тилда инглизча ном; инглиз версиясида — ўзбекча лотин ном.
const SUBNAME = curLang === "en" ? "Toshkent xalqaro moda akademiyasi" : "Tashkent International Academy of Fashion";
const lockup = dark => `<span class="lockup${dark ? " on-dark" : ""}"><img class="tiaf" src="${P}assets/tiaf${dark ? "-white" : ""}.png" alt="" width="96" height="44"><span class="lk-rule" aria-hidden="true"></span><span class="lk-names"><span class="lk-name">${SITE}</span><span class="lk-sub">${SUBNAME}</span></span></span>`;

// Ижтимоий тармоқ белгилари (ўзимиз чизган оддий белгилар; расмий логотип файллари олингач алмаштирилади)
const ICON = {
  telegram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.6" r="1.3" fill="currentColor"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5H16l.5-3h-3V8.7c0-.9.3-1.5 1.6-1.5h1.6V4.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.3H8.3v3h2.5V21h2.7z"/></svg>',
};

// Тил алмаштиргич: ҳар бир тил алоҳида URL (ўзбек кирилл — асосий папкада, қолганлар /oz, /ru, /en, /fr)
const langHref = code => (code === "uz" ? P + here : P + code + "/" + here);
const langSwitch = LANGS.map(([code, label, , name]) =>
  `<a href="${langHref(code)}" hreflang="${code === "oz" ? "uz-Latn" : code === "uz" ? "uz-Cyrl" : code}" lang="${code === "oz" ? "uz-Latn" : code === "uz" ? "uz-Cyrl" : code}" title="${name}"${code === curLang ? ' aria-current="true"' : ""}>${label}</a>`).join("");

const topHTML = `
<a class="skip" href="#main">${t("Асосий мазмунга ўтиш")}</a>
<div class="topbar"><div class="wrap">
  <div class="tools">
    <div class="lang" role="group" aria-label="${t("Тилни танлаш")}">${langSwitch}</div>
    <button type="button" id="a11yBtn" aria-pressed="false" title="${t("Кўзи заиф кўрувчилар учун режим")}">👁 ${t("Махсус кўриниш")}</button>
    <button type="button" id="fsPlus" aria-label="${t("Шрифтни катталаштириш")}">A+</button>
    <button type="button" id="fsMinus" aria-label="${t("Шрифтни кичрайтириш")}">A–</button>
  </div>
  <nav aria-label="${t("Тез хизматлар")}">
    <a href="#" id="searchLink">🔍 ${t("Қидирув")}</a>
    <a href="hemis-lms.html">${t("HEMIS кириш")}</a>
    <a href="virtual-qabulxona.html">${t("Виртуал қабулхона")}</a>
    <a class="apply" href="${APPLY}">${t("Ариза топшириш")}</a>
  </nav>
</div></div>
<div class="audience"><div class="wrap" role="navigation" aria-label="${t("Аудитория бўйича")}">
  <b>${t("Мен —")}</b>
  <a href="qabul.html">${t("абитуриентман")}</a><a href="talabalar.html">${t("талабаман")}</a><a href="${HOME}#programs">${t("ўқитувчиман")}</a>
  <a href="${HOME}#partners">${t("иш берувчиман")}</a><a href="${HOME}#partners">${t("битирувчиман")}</a><a href="xorijiy-fuqarolar.html">${t("хорижий фуқароман")}</a>
</div></div>
<header class="site"><div class="wrap">
  <a class="logo" href="${HOME}" aria-label="${SITE} — ${t("бош саҳифа")}">${lockup(false)}</a>
  <nav aria-label="${t("Асосий меню")}"><ul class="menu" id="menu"></ul></nav>
  <button class="burger" id="burger" aria-label="${t("Менюни очиш")}" aria-expanded="false"><span></span><span></span><span></span></button>
</div></header>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-label="${t("Мобил меню")}">
  <div class="top"><span class="logo">${lockup(false)}</span><button class="close" id="drawerClose" aria-label="${t("Ёпиш")}">×</button></div>
  <div id="drawerList"></div>
  <p style="margin-top:22px"><a class="btn brand" href="${APPLY}" style="width:100%;justify-content:center">${t("Ариза топшириш")}</a></p>
</aside>`;

const col = (title, links) => `<div><h4>${title}</h4><ul>${links.map(([label, h]) => `<li><a href="${h || "#"}">${label}</a></li>`).join("")}</ul></div>`;
const bottomHTML = `
<footer class="site"><div class="wrap">
  <div class="cols">
    <div>
      <a class="logo" href="${HOME}" aria-label="${SITE}">${lockup(true)}</a>
      <p style="margin:0;max-width:320px">${t("Давлат олий таълим ташкилоти. Енгил саноатни ривожлантириш агентлиги тизимида.")}</p>
      <div class="social" aria-label="${t("Ижтимоий тармоқлар")}"><a class="tg" href="#" aria-label="Telegram" title="Telegram">${ICON.telegram}</a><a class="ig" href="#" aria-label="Instagram" title="Instagram">${ICON.instagram}</a><a class="yt" href="#" aria-label="YouTube" title="YouTube">${ICON.youtube}</a><a class="fb" href="#" aria-label="Facebook" title="Facebook">${ICON.facebook}</a></div>
    </div>
    ${col(t("Академия"), [[t("Миссия ва қарор"), "missiya.html"], [t("Раҳбарият"), "rahbariyat.html"], [t("Тузилма"), "tuzilma.html"], [t("Устав ва ҳужжатлар"), "hujjatlar.html"], [t("Манзил ва алоқа"), "aloqa.html"]])}
    ${col(t("Қабул ва таълим"), [[t("Йўналишлар"), "qabul-yonalishlar.html"], [t("Қабул тартиби"), "qabul-tartibi.html"], [t("Бакалавриат"), "bakalavriat.html"], [t("Ўқув календари"), "oquv-kalendari.html"]])}
    ${col(t("Очиқлик"), [[t("Мурожаатлар тартиби"), "murojaatlar.html"], [t("Коррупцияга қарши"), "korrupsiya.html"], [t("Ҳисоботлар"), "hisobotlar.html"], [t("Харидлар"), "xaridlar.html"]])}
  </div>
  <div class="bottom">
    <span>© 2026 ${SITE}. ${t("Дастлабки макет.")}</span>
    <span><a href="#">${t("Махфийлик сиёсати")}</a> · <a href="#">${t("Фойдаланиш шартлари")}</a> · <a href="#">${t("Сайт харитаси")}</a></span>
  </div>
</div></footer>
<div class="draft" id="draft" role="note"><button type="button" id="draftClose" aria-label="${t("Ёпиш")}">×</button>
  <b>${t("Дастлабки макет.")}</b> ${t("Лого, ранг ва расмлар тасдиқланмаган; «тасдиқланади» белгили жойлар расмий маълумот келгач тўлдирилади.")}${window.TR && window.TR["__auto__"] ? " " + window.TR["__auto__"] : ""}</div>`;

document.getElementById("chrome-top").innerHTML = topHTML;
document.getElementById("chrome-bottom").innerHTML = bottomHTML;

// Меню
const menu = document.getElementById("menu");
const drawerList = document.getElementById("drawerList");
const a = (label, h) => `<a href="${h || "#"}"${h === here ? ' aria-current="page"' : ""}>${label}</a>`;
MENU.forEach(([title, href, items], i) => {
  const li = document.createElement("li");
  li.innerHTML = `<a href="${href}" aria-haspopup="true"${i === sectionIdx ? ' aria-current="true" class="cur"' : ""}>${title}</a><ul class="mega">${items.map(([label, h]) => `<li>${a(label, h)}</li>`).join("")}</ul>`;
  menu.appendChild(li);
  const d = document.createElement("details");
  if (i === sectionIdx) d.open = true;
  d.innerHTML = `<summary>${title}</summary>${href !== "#" ? `<a href="${href}">${t("Бўлим бош саҳифаси")}</a>` : ""}${items.map(([label, h]) => a(label, h)).join("")}`;
  drawerList.appendChild(d);
});

// Ички саҳифа ён менюси
const side = document.getElementById("sidenav");
if (side && sectionIdx >= 0) {
  const [title, href, items] = MENU[sectionIdx];
  side.innerHTML = `<p class="side-title"><a href="${href}">${title}</a></p><ul>${items.map(([label, h]) => `<li>${a(label, h)}</li>`).join("")}</ul>
  ${sectionIdx === 8
    ? `<a class="side-cta" href="virtual-qabulxona.html">${t("Мурожаат юбориш")} →</a>`
    : `<a class="side-cta" href="${APPLY}">${t("Ариза топшириш")} →</a>`}`;
}

// Саҳифа охирги блоки: фойдали бўлдими, улашиш, чоп этиш, сана
const foot = document.getElementById("pagefoot");
if (foot) {
  foot.innerHTML = `
  <div class="foot-row">
    <div class="rate" role="group" aria-label="${t("Саҳифа фойдали бўлдими?")}">
      <span>${t("Саҳифа фойдали бўлдими?")}</span>
      <button type="button" data-rate="yes">${t("Ҳа")}</button><button type="button" data-rate="no">${t("Йўқ")}</button>
      <span class="rate-msg" role="status" aria-live="polite"></span>
    </div>
    <div class="share">
      <button type="button" data-share>${t("Улашиш")}</button>
      <button type="button" data-print>${t("Босиб чиқариш / PDF")}</button>
    </div>
  </div>
  <p class="updated">${t("Охирги янгиланиш:")} ${body.dataset.updated || "—"}</p>`;
}

// Мобил меню
const drawer = document.getElementById("drawer");
const scrim = document.getElementById("scrim");
const burger = document.getElementById("burger");
function setDrawer(open) {
  drawer.classList.toggle("open", open);
  scrim.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
}
burger.addEventListener("click", () => setDrawer(true));
document.getElementById("drawerClose").addEventListener("click", () => setDrawer(false));
scrim.addEventListener("click", () => setDrawer(false));
drawer.addEventListener("click", e => { if (e.target.matches('a[href^="#"]')) setDrawer(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape") setDrawer(false); });

// Махсус кўриниш ва шрифт ўлчами
const root = document.documentElement;
let fs = 16;
const a11y = document.getElementById("a11yBtn");
const safe = fn => { try { return fn(); } catch (_) {} };
const applyFs = () => { root.style.setProperty("--fs", fs + "px"); safe(() => localStorage.setItem("tifa-fs", fs)); };
a11y.addEventListener("click", () => {
  const on = root.classList.toggle("hc");
  a11y.setAttribute("aria-pressed", String(on));
  safe(() => localStorage.setItem("tifa-hc", on ? "1" : "0"));
});
document.getElementById("fsPlus").addEventListener("click", () => { fs = Math.min(22, fs + 1); applyFs(); });
document.getElementById("fsMinus").addEventListener("click", () => { fs = Math.max(13, fs - 1); applyFs(); });
safe(() => {
  const s = parseInt(localStorage.getItem("tifa-fs"), 10);
  if (s >= 13 && s <= 22) { fs = s; applyFs(); }
  if (localStorage.getItem("tifa-hc") === "1") { root.classList.add("hc"); a11y.setAttribute("aria-pressed", "true"); }
});

document.getElementById("draftClose").addEventListener("click", e => e.target.closest(".draft").remove());
document.getElementById("searchLink").addEventListener("click", e => e.preventDefault());
