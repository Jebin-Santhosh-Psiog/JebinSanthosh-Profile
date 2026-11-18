document.documentElement.classList.add("js");

const nav = document.getElementById("navbar");
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

const onScroll = () => {
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 20);
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const io = new IntersectionObserver(es => {
  es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("visible");
    io.unobserve(e.target);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));

const links = [...m.querySelectorAll("a")];
const so = new IntersectionObserver(es => {
  es.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });

document.querySelectorAll("main section[id], footer[id]").forEach(s => so.observe(s));
