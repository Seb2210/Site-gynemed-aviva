// Comportements communs : menu, apparition au défilement, fond animé du bandeau d'ouverture.
// Aucun traceur, aucune ressource externe.

document.documentElement.classList.remove("no-js");

(function menu() {
  const toggle = document.querySelector(".menu-toggle");
  const panel = document.getElementById("site-menu");
  if (!toggle || !panel) return;

  const setOpen = (open) => {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    panel.toggleAttribute("inert", !open);
    if (open) panel.querySelector("a")?.focus();
  };

  panel.setAttribute("inert", "");
  toggle.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
  panel.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) { setOpen(false); toggle.focus(); }
  });
})();

(function reveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach((el) => el.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  items.forEach((el) => io.observe(el));
})();

// Particules et filaments lumineux, en écho à la vidéo du site d'origine.
(function heroField() {
  const canvas = document.querySelector(".hero canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const glow = getComputedStyle(document.body).getPropertyValue("--glow").trim() || "214,167,92";

  let w, h, dpr, dots, strands, raf;

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(140, (w * h) / 9000));
    dots = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15 - 0.05,
      a: Math.random() * 0.6 + 0.15,
      warm: Math.random() < 0.08,
    }));
    const hasImage = !!document.querySelector(".hero-bg");
    strands = hasImage ? [] : Array.from({ length: 5 }, (_, i) => ({
      y: h * (0.25 + i * 0.13), amp: 30 + Math.random() * 60,
      k: 0.002 + Math.random() * 0.003, phase: Math.random() * 6.28, speed: 0.0015 + Math.random() * 0.002,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1;
    strands.forEach((s, i) => {
      ctx.beginPath();
      for (let x = -20; x <= w + 20; x += 12) {
        const y = s.y + Math.sin(x * s.k + s.phase + t * s.speed) * s.amp + Math.sin(x * 0.011 + i) * 8;
        x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${glow}, ${0.06 + i * 0.015})`;
      ctx.stroke();
    });
    dots.forEach((d) => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < -5) d.x = w + 5; if (d.x > w + 5) d.x = -5;
      if (d.y < -5) d.y = h + 5; if (d.y > h + 5) d.y = -5;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, 6.283);
      ctx.fillStyle = d.warm ? `rgba(255, 196, 120, ${d.a})` : `rgba(${glow}, ${d.a})`;
      ctx.fill();
    });
  }

  function loop(t) { draw(t); raf = requestAnimationFrame(loop); }

  size();
  if (reduce) { draw(0); } else { raf = requestAnimationFrame(loop); }
  let timer;
  window.addEventListener("resize", () => {
    clearTimeout(timer);
    timer = setTimeout(() => { size(); if (reduce) draw(0); }, 150);
  });
  document.addEventListener("visibilitychange", () => {
    if (reduce) return;
    if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(loop);
  });
})();
