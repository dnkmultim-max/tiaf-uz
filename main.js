// Геометрик безак (ikat-руҳида): расмлар тасдиқлангунча вақтинчалик визуал.
// Ранг элементнинг CSS color қийматидан олинади.
const PATTERNS = {
  ikat: (c, o) => `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><g fill="${c}" fill-opacity="${o}"><path d="M28 16 40 28 28 40 16 28Z" fill-opacity="${o * .55}"/><path d="M0 0h8L0 8zM56 0h-8l8 8zM0 56h8L0 48zM56 56h-8l8-8z" fill-opacity="${o * .4}"/></g><path d="M28 4 52 28 28 52 4 28Z" fill="none" stroke="${c}" stroke-opacity="${o}" stroke-width="1.4"/></svg>`,
  stripes: (c, o) => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M-2 2 2 -2M0 14 14 0M12 16 16 12" stroke="${c}" stroke-opacity="${o}" stroke-width="3.5" fill="none"/></svg>`,
  dots: (c, o) => `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><circle cx="9" cy="9" r="2.6" fill="${c}" fill-opacity="${o}"/></svg>`,
};
document.querySelectorAll("[data-pat]").forEach(el => {
  const make = PATTERNS[el.dataset.pat];
  if (!make) return;
  const o = parseFloat(el.dataset.o) || 1;
  el.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(make(getComputedStyle(el).color, o))}")`;
});

document.addEventListener("click", e => {
  // Ҳали тайёр бўлмаган саҳифаларга ҳаволалар (#) жойни ўзгартирмасин
  const link = e.target.closest('a[href="#"]');
  if (link) { e.preventDefault(); return; }

  // «Саҳифа фойдали бўлдими?»
  const rate = e.target.closest("[data-rate]");
  if (rate) {
    const box = rate.closest(".rate");
    box.querySelectorAll("button").forEach(b => (b.disabled = true));
    box.querySelector(".rate-msg").textContent = rate.dataset.rate === "yes" ? t("Раҳмат!") : t("Раҳмат, саҳифани яхшилаймиз.");
    return;
  }
  if (e.target.closest("[data-print]")) { window.print(); return; }
  const share = e.target.closest("[data-share]");
  if (share) {
    const data = { title: document.title, url: location.href };
    if (navigator.share) navigator.share(data).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(() => { share.textContent = t("Ҳавола нусхаланди") + " ✓"; });
  }
});

// Рўйхат фильтри: <div data-filter-group> тугмалари ва [data-level] қаторлари
document.querySelectorAll("[data-filter-group]").forEach(group => {
  group.addEventListener("click", e => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    group.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
    const v = btn.dataset.filter;
    document.querySelectorAll("[data-level]").forEach(r => { r.hidden = v !== "all" && r.dataset.level !== v; });
  });
});

// Онлайн ариза (прототип): текширув, ҳеч нарса юборилмайди
document.querySelectorAll("form[data-demo]").forEach(form => {
  const ok = form.nextElementSibling;
  form.addEventListener("submit", e => {
    e.preventDefault();
    let first = null;
    form.querySelectorAll("[required]").forEach(f => {
      const bad = f.type === "checkbox" ? !f.checked : !f.value.trim();
      f.closest(".field").classList.toggle("invalid", bad);
      f.setAttribute("aria-invalid", String(bad));
      if (bad && !first) first = f;
    });
    if (first) { first.focus(); return; }
    form.hidden = true;
    ok.hidden = false;
    ok.focus();
  });
  form.addEventListener("input", e => {
    const f = e.target.closest(".field");
    if (f) f.classList.remove("invalid");
  });
});
