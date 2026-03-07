// ========== Project Data ==========
const projects = [
  {
    icon: "🌐",
    name: "Portfolio Landing",
    description: "Nginx + Docker로 구동되는 정적 포트폴리오 랜딩페이지. 반응형 다크 테마.",
    tags: ["HTML", "CSS", "Nginx", "Docker"],
    github: "https://github.com/sungbin222-max/landing-page",
    demo: null
  },
  {
    icon: "📰",
    name: "DayBrief",
    description: "OpenClaw AI 에이전트 기반 데일리 AI 브리핑 봇. 매일 아침 AI 에이전트 최신 뉴스, 유튜브 영상, 활용 팁을 텔레그램으로 전송하고 웹 대시보드로 히스토리 조회.",
    tags: ["OpenClaw", "AI Agent", "Telegram", "Docker"],
    github: "https://github.com/sungbin222-max/daybrief",
    demo: "/daybrief/"
  },
  {
    icon: "🗡️",
    name: "Juns RPG",
    description: "끝없이 깊어지는 던전을 탐험하는 텍스트 RPG. 턴제 전투, 장비/스킬 성장, 스코어보드 경쟁.",
    tags: ["Node.js", "MongoDB", "Express", "Docker"],
    github: "https://github.com/sungbin222-max/junscave",
    demo: "/junscave/"
  }
];

// ========== Render Cards ==========
function renderProjects() {
  const grid = document.getElementById("projects-grid");

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";

    const linksHtml = [];
    if (project.github && project.github !== "#") {
      linksHtml.push(`<a href="${project.github}" target="_blank" rel="noopener">GitHub</a>`);
    } else if (project.github === "#") {
      linksHtml.push(`<a href="${project.github}">GitHub</a>`);
    }
    if (project.demo) {
      linksHtml.push(`<a href="${project.demo}" target="_blank" rel="noopener">Demo</a>`);
    }

    card.innerHTML = `
      <div class="card-icon">${project.icon}</div>
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

// ========== Scroll Animation ==========
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
    { threshold: 0.1 }
  );

  document.querySelectorAll(".project-card").forEach((card) => {
    observer.observe(card);
  });
}

// ========== Init ==========
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupScrollAnimation();
});
