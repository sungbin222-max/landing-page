// ========== Project Data ==========
const projects = [
  {
    icon: "🗡️",
    name: "Juns RPG",
    description: "끝없이 깊어지는 던전을 탐험하는 텍스트 RPG. 턴제 전투, 장비/스킬 성장, 실시간 대시보드, AI 봇 10개 동시 운영.",
    tags: ["Node.js", "MongoDB", "Express", "Python", "Docker"],
    github: "https://github.com/sungbin222-max/junscave",
    demo: "/junscave/",
    status: "live",
    accent: "#f59e0b"
  },
  {
    icon: "📰",
    name: "DayBrief",
    description: "OpenClaw AI 에이전트 기반 데일리 브리핑 봇. 매일 아침 날씨/뉴스를 텔레그램으로 전송하고 웹 대시보드로 히스토리 조회.",
    tags: ["OpenClaw", "AI Agent", "Telegram", "Docker"],
    github: "https://github.com/sungbin222-max/daybrief",
    demo: "/daybrief/",
    status: "live",
    accent: "#10b981"
  },
  {
    icon: "📊",
    name: "IT EDU",
    description: "AI가 설계한 체계적인 커리큘럼과 맥락 인식 교육자료로 효율적으로 학습하세요.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker","Genspark + Claude Opus"],
    github: "https://github.com/sungbin222-max/it-edu",
    demo: "/itedu/",
    status: "live",
    accent: "#8b5cf6"
  },
  {
    icon: "🌐",
    name: "Portfolio Landing",
    description: "지금 보고 있는 이 페이지. Nginx + Docker로 구동되는 포트폴리오 랜딩. Let's Encrypt SSL, 리버스 프록시 통합.",
    tags: ["HTML", "CSS", "Nginx", "Docker", "SSL"],
    github: "https://github.com/sungbin222-max/landing-page",
    demo: null,
    status: "live",
    accent: "#00d4ff"
  }
];

// ========== Skills Data ==========
const skills = [
  { icon: "🟢", name: "Node.js" },
  { icon: "🐍", name: "Python" },
  { icon: "🍃", name: "MongoDB" },
  { icon: "🐳", name: "Docker" },
  { icon: "🤖", name: "AI Agent" },
  { icon: "⚡", name: "Express" },
  { icon: "🚀", name: "FastAPI" },
  { icon: "🔧", name: "Nginx" },
  { icon: "📬", name: "Telegram" }
];

// ========== Render Projects ==========
function renderProjects() {
  const grid = document.getElementById("projects-grid");

  projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.style.setProperty("--card-accent", project.accent);
    card.style.transitionDelay = `${index * 100}ms`;

    const linksHtml = [];
    if (project.github) {
      linksHtml.push(`<a href="${project.github}" target="_blank" rel="noopener" class="card-link-secondary">GitHub</a>`);
    }
    if (project.demo) {
      linksHtml.push(`<a href="${project.demo}" target="_blank" rel="noopener" class="card-link-primary">Demo →</a>`);
    }

    const statusHtml = project.status === "live"
      ? `<span class="card-status"><span class="status-dot"></span>Live</span>`
      : "";

    card.innerHTML = `
      <div class="card-header">
        <div class="card-icon">${project.icon}</div>
        ${statusHtml}
      </div>
      <h3 class="card-title">${project.name}</h3>
      <p class="card-desc">${project.description}</p>
      <div class="card-tags">
        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <div class="card-links">
        ${linksHtml.join("")}
      </div>
    `;

    grid.appendChild(card);
  });
}

// ========== Render Skills ==========
function renderSkills() {
  const grid = document.getElementById("skills-grid");

  skills.forEach((skill, index) => {
    const card = document.createElement("div");
    card.className = "skill-card scroll-reveal";
    card.style.transitionDelay = `${index * 80}ms`;

    card.innerHTML = `
      <span class="skill-icon">${skill.icon}</span>
      <span class="skill-name">${skill.name}</span>
    `;

    grid.appendChild(card);
  });
}

// ========== Scroll Animations ==========
function setupScrollAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll(".project-card, .skill-card, .scroll-reveal").forEach((el) => {
    observer.observe(el);
  });
}

// ========== Header Scroll Effect ==========
function setupHeaderScroll() {
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

// ========== Count-Up Animation ==========
function setupCountUp() {
  const statNumbers = document.querySelectorAll(".stat-number[data-count]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 1500;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = target + (el.dataset.suffix || "");
            }
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => observer.observe(el));
}

// ========== Smooth Scroll for Anchor Links ==========
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ========== Init ==========
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  setupScrollAnimation();
  setupHeaderScroll();
  setupCountUp();
  setupSmoothScroll();
});
