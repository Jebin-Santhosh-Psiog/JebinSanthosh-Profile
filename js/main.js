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

const ms = [...document.querySelectorAll(".milestone")];
const cy = document.getElementById("ch-year");
const ct = document.getElementById("ch-title");
const co = document.getElementById("ch-org");
const ci = document.getElementById("ch-idx");
const cd = document.getElementById("ch-dots");
const pad = n => String(n).padStart(2, "0");
let cur = -1;

document.getElementById("ch-total").textContent = pad(ms.length);
ms.forEach(() => cd.append(document.createElement("span")));
const dots = [...cd.children];

const setCh = i => {
  if (i === cur) return;
  cur = i;
  const m = ms[i];
  cy.textContent = (m.querySelector(".year").textContent.match(/\d{4}/g) || ["Now"]).pop();
  ct.textContent = m.querySelector("h3").textContent;
  co.textContent = m.querySelector(".org").textContent;
  ci.textContent = pad(i + 1);
  [cy, ct, co].forEach(el => {
    el.classList.remove("swap");
    void el.offsetWidth;
    el.classList.add("swap");
  });
  ms.forEach((x, j) => {
    x.classList.toggle("active", j === i);
    x.classList.toggle("passed", j < i);
  });
  dots.forEach((d, j) => d.classList.toggle("on", j === i));
};

const mo = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) setCh(ms.indexOf(e.target));
  });
}, { rootMargin: "-40% 0px -55% 0px" });

ms.forEach(m => mo.observe(m));
setCh(0);

document.querySelectorAll(".desc").forEach(d => {
  if (d.scrollHeight <= d.clientHeight + 2) return;
  const t = document.createElement("button");
  t.type = "button";
  t.className = "toggle";
  t.textContent = "Show more";
  t.setAttribute("aria-expanded", "false");
  t.addEventListener("click", () => {
    const x = d.classList.toggle("expanded");
    t.textContent = x ? "Show less" : "Show more";
    t.setAttribute("aria-expanded", String(x));
  });
  d.after(t);
});

document.querySelectorAll(".contact").forEach(c => {
  const f = () => c.classList.toggle("flipped");
  c.addEventListener("click", f);
  c.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    f();
  });
});

const wm = document.getElementById("w-music");
const pb = document.getElementById("np-play");

pb.addEventListener("click", () => {
  const on = wm.classList.toggle("playing");
  pb.setAttribute("aria-pressed", String(on));
  pb.setAttribute("aria-label", on ? "Pause" : "Play");
});
