# algocare-demo 기술 명세서

이 문서는 알고케어 데모 웹앱 프로젝트의 기술 기반을 설명합니다.  
해당 프로젝트는 프론트엔드 단독으로 구성되며, 백엔드 연동 없이 정적 UI 및 라우팅을 중심으로 구성됩니다.

---

## 1. 기술 스택

- **프레임워크:** [Next.js](https://nextjs.org/) 15 (App Router 기반)
  - React 기반 SSR/SSG 지원, 동적 라우팅 및 파일 기반 페이지 구성
  - 개발 생산성 및 Vercel 배포와의 연동이 뛰어남
- **언어:** [TypeScript](https://www.typescriptlang.org/)
  - 정적 타입 지원으로 코드 안정성과 협업 효율 향상
- **상태 관리:** 간단한 로컬 상태만 활용하며, 전역 상태 관리 도구는 사용하지 않음
- **배포:** [Vercel](https://vercel.com/)
  - GitHub 연동, 자동 프리뷰 환경 지원
  - CI/CD를 통한 자동 운영 배포 가능

---

## 2. 비기능적 요구사항

- **유지보수성**
  - 디렉토리 구조는 기능 단위로 모듈화하고, 공통 컴포넌트는 별도 분리
  - ESLint + Prettier를 통해 일관된 코드 스타일 유지
  - 주요 설정 및 의사결정은 `README.md` 및 `docs/` 디렉토리에 기록
- **성능**
  - Next.js의 코드 스플리팅, 자동 최적화 기능을 그대로 활용
  - 가벼운 페이지 기반 전환 및 빠른 초기 로딩
- **웹 접근성 (a11y)**
  - 시맨틱 HTML 사용
  - 키보드 탐색 가능
  - alt 속성 및 ARIA 속성 적용

---

## 3. 개발 및 배포

- **환경 분리**
  - `development`: 로컬 개발
  - `preview`: Vercel의 Pull Request 기반 프리뷰 환경
  - `production`: main 브랜치 기준 운영 환경
- **버전 관리**
  - GitHub 기반 브랜치 전략
    - `main`: 운영
    - `feature/*`: 기능 개발
    - `fix/*`: 버그 수정
- **CI/CD**
  - Vercel과 GitHub 연동하여 자동 배포 구성
  - Pull Request 생성 시 자동 프리뷰
  - main 병합 시 운영 환경 자동 반영
- **코드 리뷰**
  - 모든 작업은 PR을 통해 리뷰 및 병합
  - 리뷰 기준: 구조 적절성, 코드 일관성, UX/UI 흐름 명확성

---

## 4. 로깅 및 모니터링

- **로깅**
  - 개발 시 `console.log()` 수준의 디버깅만 수행
  - 운영 환경에서는 Vercel 기본 로그 뷰어 사용
- **모니터링**
  - [Vercel Analytics](https://vercel.com/analytics) 사용 가능 (필요 시 활성화)
  - 주요 지표: LCP, FCP, CLS 등 Web Vitals 기준

---

이 명세서는 알고케어 데모용 웹 프로토타입의 개발 기준과 실행 환경을 정의하며,  
실제 제품 개발 전 단계에서의 실험과 UI 검증을 목적으로 합니다.
