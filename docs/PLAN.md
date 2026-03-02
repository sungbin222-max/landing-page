# 프로젝트 포트폴리오 랜딩페이지 — 계획서

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | 프로젝트 포트폴리오 랜딩페이지 |
| **목적** | 여러 프로젝트를 한눈에 소개하는 홈페이지 |
| **기술 스택** | HTML / CSS / JavaScript (정적 사이트) |
| **웹서버** | Nginx (Docker 컨테이너) |
| **배포 방식** | Docker Compose |
| **레벨** | Starter (정적 웹) |

## 2. 요구사항

### 2.1 기능 요구사항
- **히어로 섹션**: 메인 타이틀 + 간단한 소개 문구
- **프로젝트 카드 그리드**: 각 프로젝트를 카드 형태로 소개
  - 프로젝트 이름
  - 설명 (1~2줄)
  - 기술 태그 (예: Docker, Python, Node.js 등)
  - 링크 버튼 (GitHub, Demo 등)
- **반응형 디자인**: 모바일 / 태블릿 / 데스크톱 대응
- **푸터**: 연락처 / 소셜 링크

### 2.2 비기능 요구사항
- Nginx를 통한 정적 파일 서빙
- Docker 컨테이너로 실행 (향후 다른 프로젝트 컨테이너와 함께 운용)
- 외부 프레임워크 최소화 (순수 HTML/CSS/JS)

## 3. 디렉토리 구조

```
landing-page/
├── docs/
│   └── PLAN.md              # 이 계획서
├── src/
│   ├── index.html            # 메인 페이지
│   ├── css/
│   │   └── style.css         # 스타일시트
│   ├── js/
│   │   └── main.js           # 인터랙션 (필요 시)
│   └── assets/
│       └── images/           # 프로젝트 썸네일 등
├── nginx/
│   └── default.conf          # Nginx 설정
├── Dockerfile                # Nginx 기반 이미지
├── docker-compose.yml        # 컨테이너 실행 설정
├── .gitignore
└── README.md
```

## 4. 기술 설계

### 4.1 Nginx 설정
- 베이스 이미지: `nginx:alpine` (경량)
- `/usr/share/nginx/html`에 정적 파일 마운트
- 포트: `80` (컨테이너) → `8080` (호스트)
- gzip 압축 활성화
- 캐시 헤더 설정 (이미지, CSS, JS)

### 4.2 Docker 구성
```yaml
# docker-compose.yml 예상 구조
services:
  landing:
    build: .
    ports:
      - "8080:80"
    volumes:
      - ./src:/usr/share/nginx/html:ro  # 개발 시 핫리로드
    restart: unless-stopped
```

### 4.3 페이지 디자인 콘셉트
- **색상**: 다크 모드 기본 (배경 #0f172a, 카드 #1e293b)
- **폰트**: 시스템 폰트 스택 (외부 의존성 없음)
- **레이아웃**: CSS Grid로 프로젝트 카드 배치
- **애니메이션**: 스크롤 시 카드 페이드인 (Intersection Observer)

### 4.4 예시 프로젝트 데이터
JavaScript 배열로 프로젝트 데이터를 관리하여 쉽게 수정 가능:
```javascript
const projects = [
  {
    name: "OpenClaw Bot",
    description: "AI 에이전트 기반 텔레그램 봇",
    tags: ["Node.js", "AI", "Telegram"],
    github: "#",
    demo: "#"
  },
  // ... 더 많은 프로젝트
];
```

## 5. 구현 단계

| 단계 | 작업 | 산출물 |
|------|------|--------|
| **1단계** | 프로젝트 초기화 + Git 설정 | `.gitignore`, 디렉토리 구조 |
| **2단계** | HTML 마크업 작성 | `index.html` |
| **3단계** | CSS 스타일링 (반응형) | `style.css` |
| **4단계** | JS 인터랙션 추가 | `main.js` |
| **5단계** | Nginx 설정 + Dockerfile 작성 | `Dockerfile`, `default.conf` |
| **6단계** | Docker Compose 설정 | `docker-compose.yml` |
| **7단계** | 빌드 + 테스트 | 컨테이너 실행 확인 |

## 6. 향후 확장 계획
- 다른 프로젝트 컨테이너를 `docker-compose.yml`에 추가
- 리버스 프록시로 Nginx를 활용하여 각 프로젝트 서브경로 라우팅
  - 예: `/project-a` → `project-a:3000`
- HTTPS 적용 (Let's Encrypt + certbot)
- CI/CD 파이프라인 추가 (GitHub Actions)
