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
