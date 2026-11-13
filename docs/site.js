// Shared by every page: the Auto / Light / Dark switch, remembered per browser.
// The <head> of each page applies the saved choice before the page paints.
const buttons = [...document.querySelectorAll(".theme button")];
const apply = (t) => {
  if (t === "auto") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", t);
  buttons.forEach((b) => b.classList.toggle("on", b.dataset.t === t));
  try { localStorage.setItem("atmo-theme", t); } catch {}
};
let saved = "auto";
try { saved = localStorage.getItem("atmo-theme") || "auto"; } catch {}
buttons.forEach((b) => b.addEventListener("click", () => apply(b.dataset.t)));
apply(saved);

// Search of the documentation pages: every option, section and troubleshooting
// question, read from the #search-index script of the page. Every word has to
// match; options come first, questions last.
const input = document.getElementById("search");
const results = document.getElementById("results");
const indexEl = document.getElementById("search-index");
if (input && results && indexEl) {
  const SEARCH = JSON.parse(indexEl.textContent);
  const rank = { option: 0, section: 1, question: 2 };
  let sel = 0;
  const show = () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.hidden = true; return; }
    const qq = q.replace(/\s+/g, "_");
    const words = q.split(/\s+/);
    const hits = SEARCH.filter((o) => (o.k === "option" ? o.n.includes(qq) : words.every((w) => o.n.toLowerCase().includes(w))))
      .sort((a, b) => rank[a.k] - rank[b.k]).slice(0, 14);
    sel = 0;
    results.innerHTML = hits.length
      ? hits.map((o, i) => `<a href="${o.u}" class="${i === 0 ? "sel" : ""}">${o.k === "option" ? `<code>${o.n}</code>` : `<b>${o.n}</b>`} <small>· ${o.w}</small></a>`).join("")
      : '<div class="none">Nothing found.</div>';
    results.hidden = false;
  };
  input.addEventListener("input", show);
  input.addEventListener("keydown", (e) => {
    const links = [...results.querySelectorAll("a")];
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); sel = (sel + (e.key === "ArrowDown" ? 1 : links.length - 1)) % Math.max(1, links.length); links.forEach((a, i) => a.classList.toggle("sel", i === sel)); }
    if (e.key === "Enter" && links[sel]) { location.href = links[sel].getAttribute("href"); results.hidden = true; }
    if (e.key === "Escape") results.hidden = true;
  });
  results.addEventListener("click", () => (results.hidden = true));
  document.addEventListener("click", (e) => { if (!e.target.closest(".search")) results.hidden = true; });
}
