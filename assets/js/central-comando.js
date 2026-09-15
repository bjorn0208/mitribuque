/* Central de Comando — interações e gráficos (dados demonstrativos) */
(function () {
  "use strict";

  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Saudação e data ---------- */
  const hora = new Date().getHours();
  const saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";
  document.querySelectorAll("[data-hg-saudacao]").forEach((el) => (el.textContent = saudacao));
  document.querySelectorAll("[data-hg-data]").forEach((el) => {
    el.textContent = new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
  });

  /* ---------- Contadores dos KPIs ---------- */
  document.querySelectorAll("[data-count]").forEach((el) => {
    const alvo = Number(el.dataset.count);
    if (reduzMovimento) { el.textContent = alvo; return; }
    const inicio = performance.now();
    const dur = 1400;
    const passo = (t) => {
      const p = Math.min(1, (t - inicio) / dur);
      el.textContent = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  });

  /* ---------- Fechar widgets ---------- */
  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const w = btn.closest("[data-widget]");
      w.classList.add("is-hidden");
      setTimeout(() => (w.style.display = "none"), 300);
    });
  });

  /* ---------- Sparklines ---------- */
  const temApex = typeof ApexCharts !== "undefined";
  document.querySelectorAll("[data-spark]").forEach((el) => {
    if (!temApex) return;
    const cor = el.dataset.color;
    new ApexCharts(el, {
      chart: { type: "area", height: 52, width: 100, sparkline: { enabled: true }, animations: { enabled: !reduzMovimento } },
      series: [{ data: el.dataset.spark.split(",").map(Number) }],
      stroke: { curve: "smooth", width: 2.2 },
      colors: [cor],
      fill: { type: "gradient", gradient: { opacityFrom: 0.45, opacityTo: 0, stops: [0, 100] } },
      tooltip: { enabled: false },
    }).render();
  });

  /* ---------- Mapa holográfico ---------- */
  const svgNS = "http://www.w3.org/2000/svg";
  const W = 800, H = 520;

  // Gerador pseudoaleatório fixo: o "bairro" é sempre o mesmo
  let semente = 7;
  const rnd = () => ((semente = (semente * 16807) % 2147483647) / 2147483647);

  const blocos = document.getElementById("hg-blocks");
  const ruas = document.getElementById("hg-roads");
  const passoX = 38, passoY = 30;
  for (let y = 0; y < H; y += passoY) {
    for (let x = 0; x < W; x += passoX) {
      const n = 1 + Math.floor(rnd() * 3);
      for (let i = 0; i < n; i++) {
        const r = document.createElementNS(svgNS, "rect");
        const bw = 6 + rnd() * 12, bh = 5 + rnd() * 10;
        r.setAttribute("x", (x + 4 + rnd() * (passoX - bw - 8)).toFixed(1));
        r.setAttribute("y", (y + 4 + rnd() * (passoY - bh - 8)).toFixed(1));
        r.setAttribute("width", bw.toFixed(1));
        r.setAttribute("height", bh.toFixed(1));
        const luz = 0.12 + rnd() * 0.22;
        r.setAttribute("fill", `rgba(${60 + rnd() * 40 | 0},${110 + rnd() * 60 | 0},255,${luz.toFixed(2)})`);
        blocos.appendChild(r);
      }
    }
  }
  const linha = (d, extra) => {
    const p = document.createElementNS(svgNS, "path");
    p.setAttribute("d", d);
    if (extra) Object.entries(extra).forEach(([k, v]) => p.setAttribute(k, v));
    return p;
  };
  for (let x = 0; x <= W; x += passoX) ruas.appendChild(linha(`M${x} 0V${H}`));
  for (let y = 0; y <= H; y += passoY) ruas.appendChild(linha(`M0 ${y}H${W}`));
  ruas.appendChild(linha("M0 470L800 40", { "stroke-width": 2.4, stroke: "rgba(90,160,255,.45)" }));
  ruas.appendChild(linha("M60 0Q380 260 800 330", { "stroke-width": 2.4, stroke: "rgba(90,160,255,.45)" }));

  // Posições em coordenadas do viewBox
  const tecnicos = [
    { id: "t1", x: 280, y: 170, foto: "12", cor: "#3b82ff", nome: "João Silva", job: "OS-5624", servico: "Manutenção de climatização", status: "Em andamento", eta: "Estimado: 45 min" },
    { id: "t2", x: 230, y: 330, foto: "3", cor: "#3fe3ff", nome: "Sara Costa", job: "OS-5631", servico: "Reparo hidráulico", status: "A caminho", eta: "Chegada em 12 min" },
    { id: "t3", x: 520, y: 320, foto: "15", cor: "#8b5cff", nome: "Miguel Dias", job: "OS-5640", servico: "Instalação elétrica", status: "Em andamento", eta: "Estimado: 1h 10min" },
    { id: "t4", x: 640, y: 230, foto: "5", cor: "#d64bff", nome: "Emília Rocha", job: "OS-5652", servico: "Inspeção de sistema", status: "Agendada", eta: "Início às 15:30" },
  ];
  const ordens = [
    { x: 140, y: 250, cor: "#3fe3ff" },
    { x: 340, y: 210, cor: "#3b82ff" },
    { x: 600, y: 120, cor: "#3fe3ff" },
    { x: 530, y: 190, cor: "#d64bff" },
  ];
  const rotas = [
    { d: "M140 262 L280 182 L340 222", cor: "#3fe3ff" },
    { d: "M230 342 L340 400 L420 330 L520 332", cor: "#3b82ff" },
    { d: "M520 332 L470 470", cor: "#8b5cff" },
    { d: "M530 202 L640 242 L600 132", cor: "#d64bff" },
    { d: "M340 222 L420 330", cor: "#8b5cff" },
  ];

  const grupoRotas = document.getElementById("hg-routes");
  rotas.forEach((r) => {
    grupoRotas.appendChild(linha(r.d, { class: "hg-route", stroke: r.cor, "stroke-opacity": ".55" }));
    grupoRotas.appendChild(linha(r.d, { class: "hg-route-flow", stroke: "#ffffff", "stroke-opacity": ".85" }));
  });
  // Nós nas junções das rotas
  [[340, 400], [420, 330], [470, 470], [340, 222]].forEach(([cx, cy]) => {
    const c = document.createElementNS(svgNS, "circle");
    c.setAttribute("cx", cx); c.setAttribute("cy", cy); c.setAttribute("r", 5);
    c.setAttribute("fill", "#bfe9ff");
    grupoRotas.appendChild(c);
  });

  const mapa = document.getElementById("hg-map");
  const pins = document.getElementById("hg-pins");
  const card = document.getElementById("hg-job-card");

  // Converte coordenadas do viewBox para % do contêiner (preserveAspectRatio slice)
  function posicionar(el, x, y) {
    const rw = mapa.clientWidth, rh = mapa.clientHeight;
    const esc = Math.max(rw / W, rh / H);
    const ox = (rw - W * esc) / 2, oy = (rh - H * esc) / 2;
    el.style.left = ox + x * esc + "px";
    el.style.top = oy + y * esc + "px";
  }

  const elementos = [];
  tecnicos.forEach((t) => {
    const el = document.createElement("div");
    el.className = "hg-pin";
    el.dataset.layer = "techs";
    el.dataset.id = t.id;
    el.style.setProperty("--c", t.cor);
    el.title = t.nome;
    el.innerHTML = `<div class="hg-pin-head"><img src="../assets/images/faces/${t.foto}.jpg" alt="${t.nome}"></div>`;
    el.addEventListener("click", () => abrirCard(t, el));
    pins.appendChild(el);
    elementos.push([el, t.x, t.y]);
  });
  ordens.forEach((o) => {
    const el = document.createElement("div");
    el.className = "hg-pin is-job";
    el.dataset.layer = "jobs";
    el.style.setProperty("--c", o.cor);
    el.innerHTML = `<div class="hg-pin-head"><i></i></div>`;
    pins.appendChild(el);
    elementos.push([el, o.x, o.y]);
  });

  function abrirCard(t, pin) {
    document.querySelectorAll(".hg-pin.is-active, .hg-sched-item.is-active").forEach((e) => e.classList.remove("is-active"));
    pin.classList.add("is-active");
    document.querySelector(`.hg-sched-item[data-focus="${t.id}"]`)?.classList.add("is-active");
    card.querySelector('[data-f="id"]').textContent = t.job;
    card.querySelector('[data-f="title"]').textContent = `${t.servico} · ${t.nome}`;
    card.querySelector('[data-f="status"]').textContent = t.status;
    card.querySelector('[data-f="eta"]').textContent = t.eta;
    card.hidden = false;
    card.dataset.x = t.x;
    card.dataset.y = t.y;
    reposicionarCard();
    document.querySelector(".hg-map-dock img").src = `../assets/images/faces/${t.foto}.jpg`;
  }
  function reposicionarCard() {
    if (card.hidden) return;
    posicionar(card, Number(card.dataset.x) + 40, Number(card.dataset.y) - 70);
    // mantém o card dentro do mapa
    const max = mapa.clientWidth - card.offsetWidth - 10;
    if (parseFloat(card.style.left) > max) card.style.left = max + "px";
    if (parseFloat(card.style.top) < 10) card.style.top = "10px";
  }
  card.querySelector("[data-card-close]").addEventListener("click", () => {
    card.hidden = true;
    document.querySelectorAll(".is-active.hg-pin, .hg-sched-item.is-active").forEach((e) => e.classList.remove("is-active"));
  });

  document.querySelectorAll(".hg-sched-item[data-focus]").forEach((item) => {
    item.addEventListener("click", () => {
      const t = tecnicos.find((x) => x.id === item.dataset.focus);
      abrirCard(t, pins.querySelector(`[data-id="${t.id}"]`));
    });
  });

  const layout = () => { elementos.forEach(([el, x, y]) => posicionar(el, x, y)); reposicionarCard(); };
  new ResizeObserver(layout).observe(mapa);
  layout();

  // Camadas
  const alternar = (camada, btn) => {
    const on = btn.classList.toggle("is-on");
    document.querySelectorAll(`.hg-map-tools [data-layer="${camada}"], .hg-map-dock [data-dock="${camada}"]`).forEach((b) => b.classList.toggle("is-on", on));
    if (camada === "routes") grupoRotas.style.display = on ? "" : "none";
    if (camada === "grid") {
      document.getElementById("hg-blocks").style.filter = on ? "brightness(2.2)" : "";
      ruas.setAttribute("stroke", on ? "rgba(120,190,255,.55)" : "rgba(90,150,255,.28)");
    }
    if (camada === "techs" || camada === "jobs") pins.querySelectorAll(`[data-layer="${camada}"]`).forEach((p) => (p.style.display = on ? "" : "none"));
  };
  document.querySelectorAll("[data-layer].hg-icon-btn").forEach((b) => b.addEventListener("click", () => alternar(b.dataset.layer, b)));
  document.querySelectorAll("[data-dock]").forEach((b) => {
    if (b.dataset.dock === "center") b.addEventListener("click", () => abrirCard(tecnicos[0], pins.querySelector('[data-id="t1"]')));
    else b.addEventListener("click", () => alternar(b.dataset.dock, document.querySelector(`.hg-map-tools [data-layer="${b.dataset.dock}"]`)));
  });

  // Abre a primeira ordem ao carregar, como na referência
  setTimeout(() => abrirCard(tecnicos[0], pins.querySelector('[data-id="t1"]')), reduzMovimento ? 0 : 700);

  /* ---------- Desempenho ---------- */
  const periodos = {
    semana: { ef: 92, m: [["Ordens concluídas", "342 / 370", 92], ["Satisfação do cliente", "4,8 / 5,0", 96], ["Resolução na 1ª visita", "87%", 87]] },
    mes: { ef: 88, m: [["Ordens concluídas", "1.412 / 1.600", 88], ["Satisfação do cliente", "4,7 / 5,0", 94], ["Resolução na 1ª visita", "84%", 84]] },
    hoje: { ef: 95, m: [["Ordens concluídas", "41 / 43", 95], ["Satisfação do cliente", "4,9 / 5,0", 98], ["Resolução na 1ª visita", "90%", 90]] },
  };
  const arco = document.getElementById("hg-ring-arc");
  const txt = document.getElementById("hg-ring-txt");
  const metricas = document.getElementById("hg-metrics");
  const cores = [["#3b82ff", "#3fe3ff"], ["#5b6cff", "#8b5cff"], ["#3b82ff", "#3fe3ff"]];
  function renderPeriodo(k) {
    const p = periodos[k];
    arco.style.strokeDashoffset = 314.16 * (1 - p.ef / 100);
    txt.textContent = p.ef + "%";
    metricas.innerHTML = p.m.map((m, i) =>
      `<div class="hg-metric"><div class="hg-metric-row">${m[0]} <b>${m[1]}</b></div><div class="hg-bar"><i style="--a:${cores[i][0]};--b:${cores[i][1]}" data-w="${m[2]}"></i></div></div>`
    ).join("");
    requestAnimationFrame(() => requestAnimationFrame(() => metricas.querySelectorAll("[data-w]").forEach((b) => (b.style.width = b.dataset.w + "%"))));
  }
  document.getElementById("hg-periodo").addEventListener("change", (e) => renderPeriodo(e.target.value));
  setTimeout(() => renderPeriodo("semana"), 200);

  /* ---------- Barras de serviços ---------- */
  setTimeout(() => document.querySelectorAll(".hg-analytics [data-w]").forEach((b) => (b.style.width = b.dataset.w + "%")), 400);

  /* ---------- Gráficos analíticos ---------- */
  if (temApex) {
    new ApexCharts(document.getElementById("hg-donut"), {
      chart: { type: "donut", height: 170, background: "transparent" },
      series: [45, 35, 15, 5],
      labels: ["Em andamento", "Concluídas", "Agendadas", "Em espera"],
      colors: ["#3fe3ff", "#3b82ff", "#8b5cff", "#d64bff"],
      stroke: { width: 3, colors: ["#0a1633"] },
      dataLabels: { enabled: false },
      legend: { show: false },
      plotOptions: { pie: { donut: { size: "74%" } } },
      tooltip: { theme: "dark" },
    }).render();

    new ApexCharts(document.getElementById("hg-area"), {
      chart: { type: "area", height: 200, toolbar: { show: false }, background: "transparent", foreColor: "#8fa6d6" },
      series: [{ name: "Ordens", data: [110, 190, 260, 300, 250, 300, 342] }],
      xaxis: { categories: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"], axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { min: 0, max: 400, tickAmount: 4 },
      colors: ["#4aa3ff"],
      stroke: { curve: "straight", width: 2.5 },
      markers: { size: 5, colors: ["#bfe9ff"], strokeColors: "#3b82ff", strokeWidth: 2, hover: { size: 7 } },
      fill: { type: "gradient", gradient: { shade: "dark", opacityFrom: 0.55, opacityTo: 0.02, stops: [0, 100] } },
      grid: { borderColor: "rgba(80,140,255,.12)", strokeDashArray: 3 },
      dataLabels: { enabled: false },
      annotations: { points: [{ x: "Dom", y: 342, marker: { size: 0 }, label: { text: "342", borderColor: "#3b82ff", style: { background: "#0e1e40", color: "#fff", fontSize: "12px" } } }] },
      tooltip: { theme: "dark" },
    }).render();
  }
})();
