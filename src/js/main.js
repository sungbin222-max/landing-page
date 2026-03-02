// ========== Project Data ==========
const projects = [
  {
    icon: "🤖",
    name: "OpenClaw Bot",
    description: "AI 에이전트 기반 텔레그램 봇. 메시지 자동 응답, 스케줄링, 브라우저 자동화 지원.",
    tags: ["Node.js", "AI", "Telegram", "Docker"],
    github: "https://github.com/sungbin222-max",
    demo: null
  },
  {
    icon: "🌐",
    name: "Portfolio Landing",
    description: "Nginx + Docker로 구동되는 정적 포트폴리오 랜딩페이지. 반응형 다크 테마.",
    tags: ["HTML", "CSS", "Nginx", "Docker"],
    github: "https://github.com/sungbin222-max/landing-page",
    demo: null
  },
  {
    icon: "📊",
    name: "Data Dashboard",
    description: "실시간 데이터 시각화 대시보드. REST API 연동 차트 및 통계 표시.",
    tags: ["React", "Chart.js", "REST API"],
    github: "#",
    demo: "#"
  },
  {
    icon: "🔧",
    name: "CLI Toolkit",
    description: "개발 생산성을 높이는 커맨드라인 도구 모음. 파일 관리, 배포 자동화.",
    tags: ["Python", "CLI", "Automation"],
    github: "#",
    demo: null
  },
  {
    icon: "🛒",
    name: "Simple Store",
    description: "미니멀한 이커머스 프로토타입. 상품 목록, 장바구니, 결제 플로우.",
    tags: ["Next.js", "TypeScript", "Stripe"],
    github: "#",
    demo: "#"
  },
  {
    icon: "💬",
    name: "Chat Service",
    description: "WebSocket 기반 실시간 채팅 서비스. 그룹 채팅 및 파일 공유 지원.",
    tags: ["Node.js", "WebSocket", "Redis"],
    github: "#",
    demo: "#"
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
