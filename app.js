/* Dax Patel portfolio: hero orchestrator canvas, career trace, command palette, small delights. */
(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  /* ── Data (from LinkedIn profile) ─────────────────────────────────────── */
  const ORGS = {
    sams: {
      name: "Sam's Club CRM & Marketing Technology · Walmart Global Tech", meta: "Oct 2025 – Present · Bengaluru",
      roles: ["Senior Software Engineer (IN-4) · Oct 2025 – Present"],
      points: [
        "<strong>Enterprise Martech QA Agent:</strong> built an AI-assisted pre-launch quality gate for Sam's Club and Walmart email and push campaigns, covering content, brand safety, links, landing pages, tracking, accessibility and rendering.",
        "<strong>Email QA:</strong> hydrates personalised email content, validates links and landing-page relevance, and checks inbox rendering across major clients, devices and dark mode.",
        "<strong>Push QA:</strong> validates Android and iOS payloads, deep links, attribution, images and notification presentation for Airship and Braze campaigns.",
        "<strong>Gradial agentic AI:</strong> built MCP submission and status tools with skill instructions to follow accepted jobs without resubmitting them.",
        "<strong>Walmart Global Tech Hackathon 2026:</strong> participated in the five-person MarketMirror team, pitching synthetic audience feedback to support pre-launch campaign iteration. Prediction accuracy and business lift remain unvalidated.",
        "<strong>Campaign Monitoring Agent (in progress):</strong> designing read-only post-schedule monitoring that verifies whether campaigns actually send and reports reach and performance through Slack and email.",
      ],
      stack: "Python · FastAPI · MCP · Agentic AI · LLM &amp; vision models · React · Playwright · Braze · Airship · Salesforce Marketing Cloud",
    },
    walmart: {
      name: "Walmart eCommerce · Walmart Global Tech", meta: "Jan 2024 – Sep 2025 · Bengaluru",
      roles: ["SDE-3 · Jan 2024 – Sep 2025"],
      points: [
        "<strong>Item Read Orchestrator (Tier-0):</strong> 400K+ TPS orchestration layer integrating 40+ resource tiers into one source of item data for Search &amp; Browse, CXO, Ads and Item Page, including real-time availability, pricing and shipping.",
        "<strong>SSR-CSR initiative:</strong> led end to end, from traffic estimation to integration and deployment, using CDN Early Hints: <strong>$117M SEO gains</strong> and <strong>$55M</strong> in page-load improvements.",
        "<strong>Multi-offer and major appliances:</strong> delivered fastest and cheapest secondary offers (<strong>$75–80M</strong> projected) and critical item page, cart and all-sellers flows (<strong>$48M GMV</strong>).",
        "<strong>Pre-owned marketplace:</strong> offer store, add-on services and condition mapping, plus a shared cache integration library: <strong>+20% seller NPS, +75% WFS penetration</strong>.",
        "<strong>Performance and cost:</strong> led cache enablement saving <strong>$129K a year</strong>; cut JVM start-up time by <strong>75%</strong> and saved 8 developer hours per release.",
        "<strong>Reliability and architecture:</strong> built rate-limiting metrics for Black Friday and Cyber Monday peaks, and helped refactor a monolith into domain microservices with gRPC and Protobuf.",
        "<strong>Delivery:</strong> contributed to 5+ major initiatives and 4+ RTBs; promoted to IN-4.",
      ],
      stack: "Java · Reactive Java · Spring Boot · gRPC · Protobuf · Cassandra · Memcache · CDN · Splunk · Grafana · Microservices",
    },
    tekion: {
      name: "Tekion Corp", meta: "Mar 2022 – Jan 2024 · Bengaluru",
      roles: ["Software Engineer · Jul 2023 – Jan 2024", "Associate Software Engineer · Mar 2022 – Jul 2023"],
      points: [
        "<strong>Scale:</strong> owned and scaled 5+ microservices handling <strong>60K+ TPM</strong> across <strong>3,000+ dealerships</strong>, supporting workflows behind <strong>$120M+ ARR</strong>.",
        "<strong>Time &amp; Attendance 2.0:</strong> built a configurable system for 3,000+ dealerships across geographies.",
        "<strong>Vehicle Ownership:</strong> centralised vehicle-association history for <strong>2M+ users</strong>.",
        "<strong>CRM platform:</strong> Contact One View (CMS + CRM global search), advanced appointments for dealers and OEMs, enterprise leadership dashboards, standalone CRM and multilingual support.",
        "<strong>Growth:</strong> earned a promotion and contributed to infrastructure cost reduction.",
      ],
      stack: "Java · Spring Boot · MongoDB · Elasticsearch · Kafka · Redis · Kibana · APM · Sumo Logic · Maven · Gradle",
    },
    tcs: {
      name: "Tata Consultancy Services", meta: "Mar 2021 – Mar 2022 · Bengaluru",
      roles: ["Software Engineer, BFSI UK Research Labs · May 2021 – Mar 2022", "Software Engineer · Mar 2021 – May 2021"],
      points: [
        "<strong>AR Banking:</strong> built a wealth-management and core-banking augmented-reality app with AR Foundation, Unity3D and third-party APIs, resulting in 3+ new deal contracts.",
        "<strong>Internal web:</strong> full-stack developer on internal tools for measuring performance metrics.",
        "Innovator in the rapid-labs cohort; as an intern, built onboarding apps for a core-banking client using Agile.",
      ],
      stack: "Unity3D · AR Foundation · Full-stack web · Agile",
    },
  };
  const SPANS = [
    { org: "sams", role: "Senior SWE (IN-4)", start: "2025-10", end: null, c: "--accent-4" },
    { org: "walmart", role: "SDE-3", start: "2024-01", end: "2025-09", c: "--accent" },
    { org: "tekion", role: "Software Engineer", start: "2023-07", end: "2024-01", c: "--accent-2" },
    { org: "tekion", role: "Associate SWE", start: "2022-03", end: "2023-07", c: "--accent-2" },
    { org: "tcs", role: "SWE · Research Labs", start: "2021-05", end: "2022-03", c: "--accent-3" },
    { org: "tcs", role: "Software Engineer", start: "2021-03", end: "2021-05", c: "--accent-3" },
  ];
  const ORG_SHORT = { sams: "sam's crm", walmart: "walmart", tekion: "tekion", tcs: "tcs" };

  /* ── Career trace ─────────────────────────────────────────────────────── */
  const T0 = new Date("2021-01-01"), T1 = new Date("2027-01-01");
  const pct = (d) => ((d - T0) / (T1 - T0)) * 100;
  const month = (s) => (s ? new Date(`${s}-01`) : new Date());

  function renderTrace() {
    const rows = $("#trace-rows");
    rows.innerHTML = "";
    SPANS.forEach((s, i) => {
      const start = pct(month(s.start)), end = pct(month(s.end));
      const row = document.createElement("div");
      row.className = "trace-row";
      row.innerHTML = `<div class="trace-label"><b>${ORG_SHORT[s.org]}</b> › ${s.role}</div><div class="trace-track"></div>`;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `span-btn${s.end ? "" : " live"}`;
      btn.style.left = `${start}%`;
      btn.style.width = `${Math.max(end - start, 2.2)}%`;
      btn.style.setProperty("--c", `var(${s.c})`);
      btn.style.animationDelay = `${i * 0.08}s`;
      btn.textContent = s.role;
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", `${ORGS[s.org].name}, ${s.role}, ${s.start} to ${s.end || "present"}`);
      btn.addEventListener("click", () => select(s.org, btn));
      row.querySelector(".trace-track").append(btn);
      rows.append(row);
    });
    select("sams", $(".span-btn"));
  }

  function select(orgKey, btn) {
    $$(".span-btn").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    const o = ORGS[orgKey];
    $("#span-detail").innerHTML = `
      <p class="meta">span · ${o.meta}</p>
      <h3>${o.name}</h3>
      <p class="org">${o.roles.join("<br>")}</p>
      <ul>${o.points.map((p) => `<li>${p}</li>`).join("")}</ul>
      <p class="meta">stack · ${o.stack}</p>`;
  }

  /* ── Hero canvas: requests routed through an orchestrator to 40 tiers ── */
  function orchestra() {
    const canvas = $("#orchestra");
    const ctx = canvas.getContext("2d");
    let w, h, dpr, hub, tiers = [], clients = [], packets = [], raf = 0, visible = true;
    const pointer = { x: -1e3, y: -1e3 };

    function layout() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const narrow = w < 760;
      hub = { x: narrow ? w * 0.7 : w * 0.74, y: h * (narrow ? 0.18 : 0.42) };
      const r = Math.min(w, h) * (narrow ? 0.22 : 0.34);
      tiers = Array.from({ length: 40 }, (_, i) => {
        const a = -Math.PI / 2 + (i / 40) * Math.PI * 2;
        const rr = r * (0.82 + ((i * 37) % 10) / 45);
        return { x: hub.x + Math.cos(a) * rr, y: hub.y + Math.sin(a) * rr, glow: 0 };
      });
      // Requests enter from the right edge so they never cross the headline.
      clients = Array.from({ length: 6 }, (_, i) => ({ x: w + 20, y: h * (0.12 + i * 0.13) }));
    }

    function spawn() {
      const c = clients[(Math.random() * clients.length) | 0];
      const fan = 2 + ((Math.random() * 4) | 0);              // one request fans out to a few tiers
      const targets = Array.from({ length: fan }, () => tiers[(Math.random() * tiers.length) | 0]);
      packets.push({ path: [c, hub], t: 0, speed: 0.012 + Math.random() * 0.01, stage: "in", c, targets });
    }

    function step() {
      const accent = css("--accent"), accent2 = css("--accent-2"), line = css("--line");
      ctx.clearRect(0, 0, w, h);
      // edges
      ctx.lineWidth = 1;
      ctx.strokeStyle = line;
      ctx.beginPath();
      tiers.forEach((t) => { ctx.moveTo(hub.x, hub.y); ctx.lineTo(t.x, t.y); });
      ctx.stroke();
      // tiers
      tiers.forEach((t) => {
        const near = Math.hypot(pointer.x - t.x, pointer.y - t.y) < 90;
        t.glow = Math.max(0, t.glow - 0.02) + (near ? 0.05 : 0);
        ctx.beginPath();
        ctx.fillStyle = t.glow > 0.05 ? accent : line;
        ctx.globalAlpha = 0.5 + Math.min(t.glow, 0.5);
        ctx.arc(t.x, t.y, 3 + Math.min(t.glow, 1) * 4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      // hub
      const g = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, 46);
      g.addColorStop(0, accent2); g.addColorStop(1, "transparent");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hub.x, hub.y, 46, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = accent2; ctx.beginPath(); ctx.arc(hub.x, hub.y, 9, 0, Math.PI * 2); ctx.fill();
      // packets
      if (!reduceMotion && Math.random() < 0.12 && packets.length < 60) spawn();
      const next = [];
      for (const p of packets) {
        p.t += p.speed;
        if (p.t < 0) { next.push(p); continue; }       // response still waiting on the fan-out
        const [a, b] = p.path;
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = p.stage === "out" ? accent2 : accent;
        ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
        if (p.t < 1) { next.push(p); continue; }
        if (p.stage === "in") {
          p.targets.forEach((t) => next.push({ path: [hub, t], t: 0, speed: p.speed * 1.4, stage: "fan", back: t }));
          next.push({ path: [hub, p.c], t: -0.6, speed: p.speed, stage: "out" }); // response waits for the fan-out
        } else if (p.stage === "fan") {
          p.back.glow = 1;
          next.push({ path: [p.back, hub], t: 0, speed: p.speed, stage: "ret" });
        }
      }
      packets = next;
      if (!reduceMotion && visible) raf = requestAnimationFrame(step);
    }

    layout();
    if (reduceMotion) { step(); return; }
    for (let i = 0; i < 18; i++) spawn();
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !document.hidden) raf = requestAnimationFrame(step);
    }).observe(canvas);
    document.addEventListener("visibilitychange", () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && visible) raf = requestAnimationFrame(step);
    });
    addEventListener("resize", () => { layout(); });
    canvas.parentElement.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
    });
    canvas.parentElement.addEventListener("pointerleave", () => { pointer.x = pointer.y = -1e3; });
  }

  /* ── Reveal on scroll, counters, nav highlight, tile spotlight ────────── */
  function scrollFx() {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    $$(".reveal").forEach((el) => io.observe(el));

    const counters = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      counters.unobserve(e.target);
      const el = e.target, target = +el.dataset.count;
      const prefix = el.dataset.prefix || "", suffix = el.dataset.suffix || "";
      if (reduceMotion) return;
      const t0 = performance.now();
      const tick = (t) => {
        const k = Math.min((t - t0) / 1200, 1), eased = 1 - Math.pow(1 - k, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }), { threshold: 0.6 });
    $$("[data-count]").forEach((el) => counters.observe(el));

    const links = $$(".nav ul a");
    const spy = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.setAttribute("aria-current", String(a.hash === `#${e.target.id}`)));
    }), { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach((s) => spy.observe(s));

    $$(".tile").forEach((tile) => tile.addEventListener("pointermove", (e) => {
      const r = tile.getBoundingClientRect();
      tile.style.setProperty("--mx", `${e.clientX - r.left}px`);
      tile.style.setProperty("--my", `${e.clientY - r.top}px`);
    }));
  }

  /* ── Theme ─────────────────────────────────────────────────────────────── */
  function theme() {
    const btn = $("#theme-toggle");
    const apply = (t) => {
      document.documentElement.dataset.theme = t;
      btn.setAttribute("aria-label", `Switch to ${t === "dark" ? "light" : "dark"} theme`);
      try { localStorage.setItem("theme", t); } catch { /* private mode */ }
    };
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch { /* ignore */ }
    apply(saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
    const toggle = () => apply(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    btn.addEventListener("click", toggle);
    return toggle;
  }

  /* ── Toast + copy email ───────────────────────────────────────────────── */
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    clearTimeout(toast.id);
    toast.id = setTimeout(() => { t.textContent = ""; }, 2600);
  }
  async function copyEmail() {
    const email = $("#copy-email").dataset.email;
    try { await navigator.clipboard.writeText(email); toast(`Copied ${email}`); }
    catch { toast(email); }
  }

  /* ── Command palette (⌘K / Ctrl+K) ────────────────────────────────────── */
  function palette(toggleTheme) {
    const root = $("#palette"), input = $("#palette-input"), list = $("#palette-list");
    const go = (id) => () => $(id).scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    const commands = [
      { label: "Impact by career phase", hint: "section", run: go("#impact") },
      { label: "About", hint: "section", run: go("#about") },
      { label: "Featured work", hint: "section", run: go("#work") },
      { label: "Career trace", hint: "section", run: go("#trace") },
      { label: "Stack", hint: "section", run: go("#stack") },
      { label: "Education & certifications", hint: "section", run: go("#extras") },
      { label: "Contact", hint: "section", run: go("#contact") },
      { label: "Copy email address", hint: "action", run: copyEmail },
      { label: "Send an email", hint: "action", run: () => { location.href = "mailto:daxpatel11051999@gmail.com"; } },
      { label: "Open LinkedIn", hint: "link", run: () => open("https://www.linkedin.com/in/daxpatel1105", "_blank", "noopener") },
      { label: "Toggle light / dark theme", hint: "action", run: toggleTheme },
    ];
    let shown = commands, active = 0, opener = null;

    const render = () => {
      list.innerHTML = "";
      shown.forEach((c, i) => {
        const li = document.createElement("li");
        li.id = `cmd-${i}`;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", String(i === active));
        li.innerHTML = `${c.label}<span>${c.hint}</span>`;
        li.addEventListener("click", () => run(i));
        list.append(li);
      });
      input.setAttribute("aria-activedescendant", shown.length ? `cmd-${active}` : "");
    };
    const openP = () => {
      opener = document.activeElement;
      root.hidden = false; input.value = ""; shown = commands; active = 0; render(); input.focus();
    };
    const close = () => { root.hidden = true; opener?.focus(); };
    const run = (i) => { const c = shown[i]; close(); c?.run(); };

    input.addEventListener("input", () => {
      const q = input.value.toLowerCase().trim();
      shown = commands.filter((c) => c.label.toLowerCase().includes(q) || c.hint.includes(q));
      active = 0; render();
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { active = Math.min(active + 1, shown.length - 1); render(); e.preventDefault(); }
      if (e.key === "ArrowUp") { active = Math.max(active - 1, 0); render(); e.preventDefault(); }
      if (e.key === "Enter") run(active);
      if (e.key === "Tab") e.preventDefault();          // keep focus inside the dialog
    });
    root.addEventListener("click", (e) => { if (e.target === root) close(); });
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); root.hidden ? openP() : close(); }
      if (e.key === "Escape" && !root.hidden) close();
    });
    $("#open-palette").addEventListener("click", openP);
  }

  /* ── Boot ─────────────────────────────────────────────────────────────── */
  $("#year").textContent = new Date().getFullYear();
  const toggleTheme = theme();
  renderTrace();
  orchestra();
  scrollFx();
  palette(toggleTheme);
  $("#copy-email").addEventListener("click", copyEmail);
})();
