# 클라우드 구성 관리 시스템

Next.js, TypeScript, Tailwind CSS로 구축된 현대적인 클라우드 구성 관리 애플리케이션입니다. AWS, Azure, GCP 등 다중 클라우드 구성을 관리하는 포괄적인 인터페이스를 제공합니다.

## 🚀 주요 기능

### 핵심 기능
- **다중 클라우드 지원**: AWS, Azure, GCP 구성 관리
- **클라우드 구성 관리**: 클라우드 구성의 생성, 조회, 수정, 삭제
- **실시간 상태 모니터링**: 활성/비활성 상태 및 스캔 스케줄 확인
- **프로바이더별 설정**: 각 클라우드 프로바이더에 맞춤화된 자격 증명 관리

### 사용자 인터페이스
- **반응형 디자인**: 데스크톱 및 모바일에 최적화
- **고정 컬럼 레이아웃**: Edit과 Delete 작업이 항상 오른쪽에 표시
- **스마트 스크롤**: 고정 액션 컬럼과 함께 대형 테이블의 가로 스크롤
- **동적 그림자**: 스크롤 활성화 시 시각적 표시기
- **브랜드 일관성 디자인**: `#3B36CF` 브랜드 컬러를 사용한 커스텀 색상 체계

### 고급 기능
- **폼 검증**: Zod 스키마를 사용한 포괄적인 검증
- **타입 안전성**: 완전한 TypeScript 구현
- **프로바이더 아이콘**: Lucide React 아이콘을 사용한 시각적 클라우드 프로바이더 식별
- **페이지네이션**: 대용량 데이터셋의 효율적 처리 (페이지당 50개 항목)
- **토스트 알림**: 모든 작업에 대한 사용자 피드백

## 🛠️ 기술 스택

### 프론트엔드
- **프레임워크**: Next.js 15.5.3 with Turbopack
- **언어**: TypeScript 5
- **스타일링**: Tailwind CSS 4 with 커스텀 브랜드 컬러
- **UI 컴포넌트**: Radix UI 기본 요소와 커스텀 스타일링
- **아이콘**: Lucide React
- **폼**: React Hook Form with Zod 검증

### 상태 관리
- **로컬 상태**: React useState and useEffect
- **폼 상태**: React Hook Form
- **API 상태**: 모의 데이터를 사용한 커스텀 API 레이어

### 개발 도구
- **린팅**: ESLint 9 with Next.js config
- **타입 체크**: TypeScript strict mode
- **빌드 도구**: Next.js with Turbopack

## 📁 프로젝트 구조

```
cloud-management/
├── app/                          # Next.js app 디렉토리
│   ├── layout.tsx               # 글로벌 프로바이더가 있는 루트 레이아웃
│   ├── page.tsx                 # 홈 페이지
│   └── globals.css              # 글로벌 스타일 및 브랜드 컬러
├── components/                   # React 컴포넌트
│   ├── cloud-dialog.tsx         # 생성/수정 작업용 모달
│   ├── cloud-list-page.tsx      # 메인 페이지 컴포넌트
│   ├── cloud-provider-logo.tsx  # 클라우드 프로바이더 아이콘
│   ├── cloud-table.tsx          # 고급 데이터 테이블
│   └── ui/                      # 재사용 가능한 UI 컴포넌트
│       ├── badge.tsx
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── table.tsx
│       └── ...
├── lib/                         # 유틸리티 라이브러리
│   ├── api.ts                   # 모의 데이터가 있는 API 레이어
│   ├── data.ts                  # 모의 데이터 정의
│   └── utils.ts                 # 유틸리티 함수
├── types/                       # TypeScript 타입 정의
│   └── types.ts                 # 모든 애플리케이션 타입
├── public/                      # 정적 자산
└── docs/
    └── COLOR_GUIDE.md           # 브랜드 컬러 가이드라인
```

## 🎨 디자인 시스템

### 브랜드 컬러
- **주색상**: `#3B36CF` - 메인 브랜드 컬러
- **호버**: `#342DB8` - 상호작용을 위한 더 어두운 변형
- **밝은색**: `#F0EFFF` - 밝은 배경 및 미묘한 강조

### 컴포넌트 스타일링
- **편집 아이콘**: 브랜드 컬러 (`#3B36CF`)
- **삭제 아이콘**: 빨간색 (`#EF4444`)
- **활성 상태**: 녹색 표시기
- **프로바이더 배지**: 프로바이더별 색상 코드
- **클라우드 그룹 & 리전**: 브랜드 컬러 배지

### 상호작용 요소
- **호버 효과**: 미묘한 애니메이션 및 색상 전환
- **포커스 상태**: 접근 가능한 포커스 표시기
- **로딩 상태**: 스피너 애니메이션
- **토스트 메시지**: 성공/오류 피드백

## 🔧 설치 및 설정

### 필수 요구 사항
- Node.js 18+ 
- npm 또는 yarn 패키지 매니저

### 설치

```bash
# 저장소 복제
git clone <repository-url>
cd cloud-management

# 종속성 설치
npm install

# 개발 서버 시작
npm run dev
```

### 사용 가능한 스크립트

```bash
# 개발
npm run dev          # Turbopack으로 개발 서버 시작

# 프로덕션
npm run build        # Turbopack으로 프로덕션 빌드
npm run start        # 프로덕션 서버 시작

# 코드 품질
npm run lint         # ESLint 실행
```

### 환경 설정

현재 애플리케이션은 모의 데이터를 사용합니다. 개발에 필요한 환경 변수는 없습니다.

## 📊 데이터 모델

### CloudConfig 인터페이스
```typescript
interface CloudConfig {
  id: string
  name: string
  provider: "aws" | "azure" | "gcp"
  cloudGroupName?: string[]
  eventProcessEnabled: boolean
  userActivityEnabled: boolean
  scheduleScanEnabled: boolean
  scheduleScanSetting?: ScheduleScanSetting
  regionList: string[]
  proxyUrl?: string
  credentials: AWSCredential | AzureCredential | GCPCredential
  credentialType: string
  eventSource?: string[]
  isActive?: boolean
  description?: string
  updatedAt?: string
  createdAt?: string
}
```

### 프로바이더별 타입
- **AWS**: Access Key ID, Secret Access Key, Role ARN
- **Azure**: Tenant ID, Subscription ID, Application ID, Secret Key
- **GCP**: Project ID, Service Account JSON

## 🎯 주요 컴포넌트

### CloudTable
다음 기능을 가진 고급 데이터 테이블:
- **고정 레이아웃**: Name 컬럼은 왼쪽 고정, Edit/Delete는 오른쪽 고정
- **가로 스크롤**: 반응형 디자인을 위함
- **동적 그림자**: 스크롤 중 시각적 피드백
- **페이지네이션**: 페이지당 50개 항목
- **프로바이더 아이콘**: 시각적 클라우드 프로바이더 식별
- **상태 표시기**: 사용자 액션 (ON/OFF), 스캔 스케줄 (설정됨/설정 안됨)

### CloudDialog
구성 관리를 위한 모달 폼:
- **생성/편집 모드**: 두 작업 모두를 위한 단일 컴포넌트
- **폼 검증**: Zod 스키마 검증
- **프로바이더별 필드**: 프로바이더에 따른 동적 폼 필드
- **다중 선택**: 클라우드 그룹 및 리전용

### CloudProviderLogo
다음과 같은 아이콘 컴포넌트:
- **AWS**: Database 아이콘 (오렌지 테마)
- **Azure**: Cloud 아이콘 (파란색 테마)  
- **GCP**: CPU 아이콘 (녹색 테마)
- **반응형**: 데스크톱에서는 아이콘 + 이름, 모바일에서는 아이콘만

## 🔄 API 레이어

### 모의 API 함수
```typescript
// 모든 구성 가져오기
cloudApi.getCloudConfigs(): Promise<CloudConfig[]>

// 단일 구성 가져오기
cloudApi.getCloudConfig(id: string): Promise<CloudConfig | null>

// 새 구성 생성
cloudApi.createCloudConfig(data: CloudConfigFormData): Promise<CloudConfig>

// 기존 구성 업데이트
cloudApi.updateCloudConfig(id: string, data: CloudConfigFormData): Promise<CloudConfig>

// 구성 삭제
cloudApi.deleteCloudConfig(id: string): Promise<void>
```

### 데이터 플로우
1. **로딩**: 로딩 스피너 표시
2. **가져오기**: API에서 데이터 검색
3. **표시**: 테이블 형식으로 렌더링
4. **상호작용**: 모달을 통한 편집/삭제
5. **업데이트**: 작업 후 데이터 새로고침

## 🎨 스타일링 가이드라인

### 색상 사용
- **주요 액션**: 브랜드 컬러 배경
- **보조 액션**: 브랜드 컬러 호버가 있는 아웃라인
- **상태 표시기**: 의미론적 색상 (녹색/빨간색/회색)
- **상호작용 요소**: 브랜드 컬러 호버 효과

### 타이포그래피
- **헤더**: Font weight 600-700
- **본문 텍스트**: 기본 font weight
- **설명**: 흐린 텍스트 색상
- **라벨**: 중간 font weight

### 간격
- **컴포넌트 간격**: 4-6 단위 (1rem-1.5rem)
- **폼 필드**: 4 단위 (1rem)
- **버튼**: 2-3 단위 패딩
- **카드**: 6 단위 패딩

## 🔒 타입 안전성

### 폼 검증
```typescript
export const CloudConfigSchema = z.object({
  name: z.string().min(1, "이름은 필수입니다"),
  provider: z.enum(["aws", "azure", "gcp"]),
  cloudGroupName: z.array(z.enum(CLOUD_GROUP_NAMES)).min(1),
  regionList: z.array(z.string()).min(1).refine(
    (regions) => regions.includes("global"),
    "글로벌 리전이 포함되어야 합니다"
  ),
  // ... 더 많은 검증 규칙
})
```

### 타입 정의
- **엄격한 TypeScript**: 모든 props와 함수가 타입화됨
- **유니온 타입**: 프로바이더별 타입
- **제네릭 컴포넌트**: 적절한 타이핑으로 재사용 가능
- **API 응답**: 완전히 타입화된 모의 응답

## 🎯 테이블 기능

### 고급 테이블 레이아웃
- **고정 Name 컬럼**: 스티키 포지셔닝으로 왼쪽에 항상 표시
- **고정 액션 컬럼**: Edit과 Delete가 오른쪽에 항상 표시
- **가로 스크롤**: 중간 컬럼의 부드러운 스크롤
- **동적 그림자**: 스크롤 시 고정 컬럼을 나타내는 그림자 효과

### 컬럼 구조
1. **Name** (왼쪽 고정): 구성 이름 및 설명
2. **Provider**: 클라우드 프로바이더 로고 (AWS/Azure/GCP)
3. **Status**: 활성/비활성 배지
4. **Cloud Groups**: 브랜드 컬러 배지
5. **Regions**: 브랜드 컬러 리전 배지
6. **Event Sources**: 이벤트 소스 표시기
7. **Updated**: 마지막 업데이트 타임스탬프
8. **User Action** (항상 표시): ON/OFF 토글 표시기
9. **Scan Schedule** (항상 표시): 설정됨/설정 안됨 상태
10. **Edit** (오른쪽 고정): 브랜드 컬러 편집 버튼
11. **Delete** (오른쪽 고정): 빨간색 삭제 버튼

### 반응형 동작
- **데스크톱**: 가로 스크롤로 모든 컬럼 표시
- **모바일**: 고정 컬럼 우선, 중간 컬럼은 스크롤 가능
- **터치**: 부드러운 터치 스크롤 지원

## 🧪 테스트 고려사항

### 컴포넌트 테스트
- 폼 검증 시나리오
- 테이블 상호작용 테스트
- 모달 열기/닫기 동작
- API 오류 처리

### 접근성 테스트
- 키보드 내비게이션
- 스크린 리더 호환성
- 색상 대비 준수
- 포커스 관리

## 🚀 배포

### 빌드 프로세스
```bash
# 프로덕션 빌드 생성
npm run build

# 프로덕션 서버 시작
npm start
```

### 성능 최적화
- **Turbopack**: 빠른 개발 및 빌드
- **코드 분할**: Next.js 자동 기능
- **이미지 최적화**: Next.js 내장 기능
- **번들 분석**: Next.js를 통해 사용 가능

## 🔮 향후 개선사항

### 계획된 기능
- **실제 API 통합**: 모의 데이터 교체
- **고급 필터링**: 검색 및 필터 기능
- **대량 작업**: 다중 선택 액션
- **내보내기 기능**: CSV/JSON 내보내기
- **다크 모드**: 테마 전환

### 기술적 개선사항
- **캐싱**: API 응답 캐싱
- **가상화**: 대용량 데이터셋용
- **오류 경계**: 더 나은 오류 처리
- **테스트**: 단위 및 통합 테스트

## 📝 기여하기

### 개발 워크플로우
1. 저장소 포크
2. 기능 브랜치 생성
3. TypeScript 및 ESLint 규칙 준수
4. 철저한 테스트
5. Pull request 제출

### 코드 표준
- **TypeScript**: Strict mode 활성화
- **ESLint**: 구성된 규칙 준수
- **Prettier**: 일관된 포맷팅
- **커밋 메시지**: 기존 형식 준수

---

# 🌐 국제화(i18n) 구현 전략 - 글로벌 서비스를 위한 효율적 다국어 지원

> **테이텀 시큐리티 i18n 관리 체계 - React 기반 다국어 지원의 체계적 접근법**

## 📋 목차

1. [개요](#개요-1)
2. [i18n 아키텍처 설계](#i18n-아키텍처-설계)
3. [번역 파일 관리](#번역-파일-관리)
4. [React 컴포넌트 i18n 적용](#react-컴포넌트-i18n-적용)
5. [번역 자동화 워크플로우](#번역-자동화-워크플로우)
6. [TypeScript 타입 안전성](#typescript-타입-안전성)
7. [성능 최적화](#성능-최적화-1)
8. [번역 품질 관리](#번역-품질-관리)
9. [개발자 도구 및 워크플로우](#개발자-도구-및-워크플로우)
10. [실제 구현 예시](#실제-구현-예시-1)

---

## 🎯 개요

테이텀 시큐리티는 글로벌 서비스 제공을 위해 체계적인 국제화(i18n) 전략을 구현합니다. 본 가이드는 **효율적인 번역 관리**, **개발자 친화적인 워크플로우**, **자동화된 번역 프로세스**를 제공하는 실무 중심의 종합 솔루션입니다.

### 핵심 목표

- **개발 효율성**: 번역 키 자동 생성 및 타입 안전성 보장
- **번역 품질**: 컨텍스트 기반 번역 및 일관성 유지
- **유지보수성**: 구조화된 번역 파일 및 자동화된 워크플로우
- **성능**: 지연 로딩 및 캐싱을 통한 최적화
- **확장성**: 새로운 언어 추가의 용이성

### 현재 문제점 분석

1. **JSON 관리의 복잡성**: 대량의 번역 키 관리 어려움
2. **번역 작업 비효율성**: 수동 번역 프로세스로 인한 지연
3. **코드 작성 복잡도**: 번역 키 사용의 불편함
4. **일관성 부족**: 번역 품질 및 용어 통일성 문제

---

## 🏗️ i18n 아키텍처 설계

### 전체 구조도

```
src/
├── i18n/                          # 국제화 관리 계층
│   ├── config/                    # i18n 설정
│   │   ├── index.ts              # 메인 설정
│   │   ├── languages.ts          # 지원 언어 목록
│   │   └── namespaces.ts         # 네임스페이스 정의
│   ├── locales/                  # 번역 파일
│   │   ├── ko/                   # 한국어
│   │   │   ├── common.json       # 공통 번역
│   │   │   ├── cloud.json        # 클라우드 관련
│   │   │   ├── security.json     # 보안 관련
│   │   │   ├── users.json        # 사용자 관리
│   │   │   └── index.ts          # 언어별 통합
│   │   ├── en/                   # 영어
│   │   ├── ja/                   # 일본어
│   │   └── zh/                   # 중국어
│   ├── hooks/                    # i18n 훅
│   │   ├── useTranslation.ts     # 번역 훅
│   │   ├── useLanguage.ts        # 언어 설정 훅
│   │   └── useFormatting.ts      # 포맷팅 훅
│   ├── components/               # i18n 컴포넌트
│   │   ├── LanguageProvider.tsx  # Context Provider
│   │   ├── LanguageSelector.tsx  # 언어 선택기
│   │   └── TranslatedText.tsx    # 번역 텍스트 컴포넌트
│   ├── utils/                    # 유틸리티
│   │   ├── translator.ts         # 번역 엔진
│   │   ├── formatter.ts          # 날짜/숫자 포맷팅
│   │   ├── validator.ts          # 번역 검증
│   │   └── loader.ts             # 동적 로딩
│   └── types/                    # 타입 정의
│       ├── i18n.types.ts         # i18n 타입
│       └── translations.types.ts # 번역 타입
├── components/                   # UI 컴포넌트
├── utils/                       # 유틸리티
└── types/                       # 글로벌 타입
```

### 설정 파일 구조

```typescript
// src/i18n/config/index.ts
import { Language } from '@/i18n/types/i18n.types'

export const I18N_CONFIG = {
  // 기본 언어
  defaultLanguage: 'ko' as Language,
  
  // 지원 언어 목록
  supportedLanguages: ['ko', 'en', 'ja', 'zh'] as Language[],
  
  // 폴백 언어
  fallbackLanguage: 'en' as Language,
  
  // 네임스페이스 정의
  namespaces: [
    'common',
    'cloud',
    'security', 
    'users',
    'dashboard',
    'settings',
    'errors'
  ],
  
  // 로딩 전략
  loadingStrategy: 'lazy' as 'eager' | 'lazy',
  
  // 캐시 설정
  cache: {
    enabled: true,
    ttl: 1000 * 60 * 60, // 1시간
    storage: 'localStorage' as 'localStorage' | 'sessionStorage' | 'memory'
  },
  
  // 자동 감지 설정
  detection: {
    enabled: true,
    order: ['localStorage', 'navigator', 'cookie'],
    caches: ['localStorage']
  },
  
  // 번역 품질 설정
  quality: {
    strictMode: true,
    reportMissingKeys: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
      format: (value: any, format?: string) => {
        if (format === 'uppercase') return value.toUpperCase()
        if (format === 'lowercase') return value.toLowerCase()
        return value
      }
    }
  }
} as const

// 타입 추출
export type I18nConfig = typeof I18N_CONFIG
export type SupportedLanguage = typeof I18N_CONFIG.supportedLanguages[number]
export type Namespace = typeof I18N_CONFIG.namespaces[number]
```

---

## 📁 번역 파일 관리

### 1. 구조화된 번역 스키마

```json
// src/i18n/locales/ko/common.json
{
  "actions": {
    "create": "생성",
    "edit": "수정", 
    "delete": "삭제",
    "save": "저장",
    "cancel": "취소",
    "confirm": "확인",
    "search": "검색",
    "filter": "필터",
    "export": "내보내기",
    "import": "가져오기"
  },
  "status": {
    "active": "활성",
    "inactive": "비활성",
    "pending": "대기중",
    "completed": "완료",
    "failed": "실패",
    "loading": "로딩중"
  },
  "messages": {
    "success": {
      "created": "{{item}}이(가) 성공적으로 생성되었습니다.",
      "updated": "{{item}}이(가) 성공적으로 수정되었습니다.", 
      "deleted": "{{item}}이(가) 성공적으로 삭제되었습니다."
    },
    "error": {
      "general": "예상치 못한 오류가 발생했습니다.",
      "network": "네트워크 연결을 확인해주세요.",
      "permission": "권한이 없습니다.",
      "notFound": "{{item}}을(를) 찾을 수 없습니다."
    },
    "validation": {
      "required": "{{field}}은(는) 필수 항목입니다.",
      "minLength": "{{field}}은(는) 최소 {{min}}글자 이상이어야 합니다.",
      "maxLength": "{{field}}은(는) 최대 {{max}}글자까지 입력 가능합니다.",
      "email": "올바른 이메일 형식을 입력해주세요.",
      "url": "올바른 URL 형식을 입력해주세요."
    }
  },
  "navigation": {
    "dashboard": "대시보드",
    "clouds": "클라우드 설정",
    "security": "보안 관리", 
    "users": "사용자 관리",
    "settings": "설정"
  },
  "time": {
    "now": "방금 전",
    "minutes": "{{count}}분 전",
    "hours": "{{count}}시간 전", 
    "days": "{{count}}일 전",
    "weeks": "{{count}}주 전",
    "months": "{{count}}개월 전"
  },
  "pagination": {
    "showing": "{{total}}개 중 {{start}}-{{end}}개 표시",
    "page": "페이지 {{current}} / {{total}}",
    "previous": "이전",
    "next": "다음",
    "itemsPerPage": "페이지당 항목 수"
  }
}
```

```json
// src/i18n/locales/ko/cloud.json
{
  "title": "클라우드 구성 관리",
  "subtitle": "클라우드 프로바이더 구성 및 통합 관리",
  "provider": {
    "aws": "Amazon Web Services",
    "azure": "Microsoft Azure", 
    "gcp": "Google Cloud Platform",
    "kubernetes": "Kubernetes"
  },
  "configuration": {
    "title": "클라우드 구성",
    "name": {
      "label": "구성 이름",
      "placeholder": "예: Production AWS",
      "description": "이 구성을 식별하기 위한 이름을 입력하세요."
    },
    "description": {
      "label": "설명",
      "placeholder": "이 구성에 대한 간단한 설명...",
      "description": "선택사항: 구성에 대한 추가 설명을 입력하세요."
    },
    "provider": {
      "label": "클라우드 프로바이더",
      "placeholder": "프로바이더를 선택하세요"
    },
    "regions": {
      "label": "리전",
      "placeholder": "리전을 선택하세요...",
      "description": "글로벌 리전은 필수이며 자동으로 포함됩니다.",
      "global": "글로벌"
    },
    "cloudGroups": {
      "label": "클라우드 그룹", 
      "placeholder": "클라우드 그룹을 선택하세요...",
      "description": "이 구성에 대해 하나 이상의 클라우드 그룹을 선택하세요."
    },
    "credentials": {
      "title": "인증 정보",
      "aws": {
        "accessKeyId": "Access Key ID",
        "secretAccessKey": "Secret Access Key", 
        "roleArn": "Role ARN (선택사항)"
      },
      "azure": {
        "tenantId": "Tenant ID",
        "subscriptionId": "Subscription ID",
        "applicationId": "Application ID",
        "secretKey": "Secret Key"
      },
      "gcp": {
        "projectId": "Project ID",
        "serviceAccountJson": "Service Account JSON"
      }
    },
    "settings": {
      "isActive": {
        "label": "활성 구성",
        "description": "이벤트 모니터링을 시작하려면 이 구성을 활성화하세요."
      },
      "eventProcess": {
        "label": "이벤트 처리 활성화",
        "description": "클라우드 이벤트 자동 처리를 활성화합니다."
      },
      "userActivity": {
        "label": "사용자 활동 추적",
        "description": "사용자 활동 로그를 추적합니다."
      },
      "scheduleScan": {
        "label": "예약 스캔 활성화", 
        "description": "정기적인 보안 스캔을 활성화합니다."
      }
    }
  },
  "table": {
    "headers": {
      "name": "이름",
      "provider": "프로바이더",
      "status": "상태", 
      "cloudGroups": "클라우드 그룹",
      "regions": "리전",
      "eventSources": "이벤트 소스",
      "updated": "업데이트됨",
      "userAction": "사용자 액션",
      "scanSchedule": "스캔 일정"
    },
    "status": {
      "active": "활성",
      "inactive": "비활성"
    },
    "scanSchedule": {
      "set": "설정됨",
      "notSet": "설정 안됨"
    },
    "userAction": {
      "on": "ON",
      "off": "OFF"
    },
    "empty": {
      "title": "클라우드 구성이 없습니다",
      "description": "첫 번째 클라우드 구성을 생성하여 시작하세요"
    },
    "loading": "클라우드 구성을 불러오는 중..."
  },
  "dialog": {
    "create": {
      "title": "클라우드 구성 생성",
      "description": "새로운 클라우드 프로바이더 통합을 구성하세요."
    },
    "edit": {
      "title": "클라우드 구성 수정", 
      "description": "아래 클라우드 구성 설정을 업데이트하세요."
    },
    "delete": {
      "title": "구성 삭제 확인",
      "description": "이 작업은 되돌릴 수 없습니다. {{name}} 구성을 정말 삭제하시겠습니까?",
      "confirmText": "DELETE",
      "placeholder": "삭제를 확인하려면 'DELETE'를 입력하세요"
    }
  },
  "messages": {
    "success": {
      "created": "클라우드 구성이 성공적으로 생성되었습니다.",
      "updated": "클라우드 구성이 성공적으로 수정되었습니다.",
      "deleted": "클라우드 구성이 성공적으로 삭제되었습니다."
    },
    "error": {
      "loadConfigs": "클라우드 구성을 불러오는데 실패했습니다",
      "loadDetails": "클라우드 구성 세부정보를 불러오는데 실패했습니다",
      "create": "클라우드 구성 생성에 실패했습니다",
      "update": "클라우드 구성 수정에 실패했습니다", 
      "delete": "클라우드 구성 삭제에 실패했습니다"
    }
  }
}
```

### 2. 네임스페이스 관리 전략

```typescript
// src/i18n/config/namespaces.ts
export const NAMESPACE_CONFIG = {
  // 공통 네임스페이스 - 모든 페이지에서 사용
  common: {
    autoLoad: true,
    preload: true,
    fallback: 'en'
  },
  
  // 도메인별 네임스페이스 - 필요시에만 로딩
  cloud: {
    autoLoad: false,
    preload: false,
    routes: ['/clouds', '/cloud-config'],
    fallback: 'en'
  },
  
  security: {
    autoLoad: false,
    preload: false,
    routes: ['/security', '/scans'],
    fallback: 'en'
  },
  
  users: {
    autoLoad: false,
    preload: false, 
    routes: ['/users', '/profile'],
    fallback: 'en'
  },
  
  // 에러 메시지 - 항상 프리로드
  errors: {
    autoLoad: true,
    preload: true,
    fallback: 'en'
  }
} as const

export type NamespaceKey = keyof typeof NAMESPACE_CONFIG
```

---

## 🎯 결론

테이텀 시큐리티의 글로벌 서비스를 위한 i18n 구현에서는:

1. **체계적인 아키텍처**: 명확한 구조와 네임스페이스 관리
2. **자동화된 워크플로우**: 번역 키 생성부터 품질 검증까지
3. **타입 안전성**: TypeScript를 활용한 컴파일 타임 검증
4. **성능 최적화**: 지연 로딩과 메모리 관리를 통한 효율성
5. **품질 관리**: 자동화된 검증과 일관성 유지
6. **개발자 경험**: 직관적인 API와 개발 도구 제공

이러한 전략을 통해 번역 관리의 복잡성을 해결하고, 개발자 생산성을 향상시키며, 높은 품질의 다국어 사용자 경험을 제공할 수 있습니다.

---

*본 문서는 테이텀 시큐리티의 실제 글로벌 서비스 운영 경험을 바탕으로 작성된 실무 중심의 i18n 가이드입니다.*
