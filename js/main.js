const b = document.getElementById("hamburger");
const m = document.getElementById("nav-links");

const close = () => {
  m.classList.remove("open");
  b.classList.remove("open");
  b.setAttribute("aria-expanded", "false");
};

b.addEventListener("click", () => {
  const o = m.classList.toggle("open");
  b.classList.toggle("open", o);
  b.setAttribute("aria-expanded", String(o));
});

m.querySelectorAll("a").forEach(a => a.addEventListener("click", close));