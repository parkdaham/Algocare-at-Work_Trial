# AlgoCare Work Demo

알고케어 사내 스타일 가이드를 반영한 Next.js + Emotion 기반 웹 애플리케이션입니다.

## 🚀 기술 스택

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Emotion (`@emotion/react`, `@emotion/styled`)
- **Linting**: ESLint + Prettier (Google 스타일)
- **개발환경**: Node.js 18+

## 📁 프로젝트 구조

```
src/
├── components/          # UI 컴포넌트
│   ├── Button.tsx      # 버튼 컴포넌트
│   └── Card.tsx        # 카드 컴포넌트
├── pages/              # Next.js 페이지
│   ├── _app.tsx        # 앱 래퍼 (글로벌 스타일)
│   ├── _document.tsx   # 문서 설정
│   ├── index.tsx       # 홈 페이지
│   └── demo.tsx        # 데모 페이지
├── styles/             # 스타일 관련
│   ├── theme.ts        # 테마 설정
│   └── globals.ts      # 글로벌 스타일
├── types/              # 타입 정의
│   └── index.ts        # 공통 타입
├── utils/              # 유틸 함수
│   └── index.ts        # 공통 유틸
└── assets/             # 정적 파일
```

## 🛠 설치 및 실행

### 1. 의존성 설치

```bash
npm install
# 또는
yarn install
```

### 2. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 빌드

```bash
npm run build
npm run start
```

## 📄 사용 가능한 스크립트

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 검사
- `npm run lint:fix` - ESLint 자동 수정
- `npm run format` - Prettier 포맷팅
- `npm run type-check` - TypeScript 타입 검사

## 🎨 스타일 가이드

### 색상 팔레트

- **Primary**: `#4A90E2` (메인 블루)
- **Secondary**: `#50C878` (메인 그린)
- **Accent**: `#F5A623` (포인트 오렌지)

### 컴포넌트 사용법

#### Button 컴포넌트

```tsx
import { Button } from '@/components/Button';

<Button variant="primary" size="md">
  클릭하세요
</Button>
```

#### Card 컴포넌트

```tsx
import { Card } from '@/components/Card';

<Card
  title="카드 제목"
  content="카드 내용입니다."
/>
```

## 📝 라이센스

이 프로젝트는 AlgoCare 내부용으로 제작되었습니다.

## 📞 문의

개발 관련 문의사항은 AlgoCare 개발팀에 연락해주세요. 