# 클라우드 구성 관리 시스템

AWS, Azure, GCP 등 다수 클라우드 제공업체 구성을 관리하는 Next.js 애플리케이션입니다. TypeScript, React, Tailwind CSS, shadcn/ui 컴포넌트로 구축되었습니다.

## 🚀 주요 기능

### 핵심 기능
- **다중 클라우드 지원**: AWS (완전 구현), Azure & GCP (개발 예정)
- **동적 폼 필드**: 선택한 제공업체에 따라 적응하는 구성 필드
- **다중 선택 컴포넌트**: 여러 클라우드 그룹 및 리전 선택
- **폼 검증**: Zod 스키마 검증을 활용한 강력한 유효성 검사
- **실시간 업데이트**: 현실적인 UX를 위한 500ms 지연 모의 API 응답
- **공유 다이얼로그**: 생성 및 편집 작업을 위한 단일 재사용 가능한 컴포넌트

### UX 기능
- **로딩 상태**: API 호출 중 스피너 및 비활성화 상태
- **오류 처리**: 성공 및 오류 메시지를 위한 토스트 알림
- **반응형 디자인**: 모바일 친화적인 테이블 및 폼 레이아웃
- **호버 효과**: 상호작용 버튼 상태 및 시각적 피드백
- **폼 초기화**: 적절한 폼 상태 관리 및 정리

## 🛠️ 기술 스택

- **프레임워크**: Next.js 15 with App Router
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **폼 처리**: React Hook Form + Zod 검증
- **상태 관리**: React useState (모의 데이터)
- **알림**: Sonner 토스트 라이브러리

## 📦 설치 방법

```bash
# 저장소 복제
git clone [repository-url]
cd cloud-management

# 종속성 설치
npm install

# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 🏗️ 프로젝트 구조

```
cloud-management/
├── app/
│   ├── globals.css          # 글로벌 스타일
│   ├── layout.tsx           # 토스터가 포함된 루트 레이아웃
│   └── page.tsx             # 메인 페이지 컴포넌트
├── components/
│   ├── ui/                  # shadcn/ui 컴포넌트
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── multi-select.tsx # 커스텀 다중 선택 컴포넌트
│   │   └── ...
│   ├── cloud-dialog.tsx     # 메인 폼 다이얼로그
│   ├── cloud-list-page.tsx  # 목록 페이지 컨테이너
│   └── cloud-table.tsx      # 데이터 테이블 컴포넌트
├── lib/
│   ├── api.ts              # 모의 API 함수
│   ├── data.ts             # 샘플 데이터
│   └── utils.ts            # 유틸리티 함수
└── types/
    └── index.ts            # 타입 정의 및 스키마
```

## 🔧 주요 설계 결정사항

### 확장 가능한 컴포넌트 아키텍처

#### 1. 프로바이더 구성 시스템
```typescript
interface ProviderFieldConfig {
  provider: CloudProvider
  credentialFields: FieldConfig[]
  eventSources: string[]
  disabled: boolean
}
```

`PROVIDER_CONFIGS` 객체는 프로바이더별 필드, 검증 규칙, 이벤트 소스가 포함된 새로운 구성 객체를 추가하기만 하면 새로운 클라우드 프로바이더를 쉽게 추가할 수 있게 합니다.

#### 2. 동적 폼 필드 생성
다이얼로그 컴포넌트는 선택된 프로바이더에 따라 자격 증명 필드를 동적으로 렌더링하여, 향후 프로바이더에 대한 유연성을 유지하면서 타입 안전성을 보장합니다.

#### 3. 공유 컴포넌트 패턴
단일 `CloudDialog` 컴포넌트가 생성 및 편집 작업을 모두 처리합니다:
- `config` prop의 존재 여부로 편집 모드 감지
- 폼 필드 동적 채우기
- 버튼 텍스트 및 API 호출 적절히 조정

## 📊 API 관리 전략 (필수)

> **테이텀 시큐리티 요구사항**: 본 과제에서는 단일 API만 사용하지만, 테이텀 시큐리티에서는 총 400여 가지의 API를 React Query를 사용하여 관리하고 있습니다. 따라서 다수의 API를 효율적으로 관리하기 위한 실무 관점의 전체 과정을 제시합니다.
>
> **핵심 관리 요소**:
> 1. 📚 **API 문서 확인**: OpenAPI/Swagger 명세에서 자동 타입 생성
> 2. 📝 **API 타입 작성**: TypeScript 기반 엄격한 타입 정의
> 3. 🪝 **API 호출 훅 구성**: React Query를 활용한 효율적인 데이터 관리

### 현재 구현
이 데모에서는 인메모리 상태의 간단한 모의 API를 사용합니다. 하지만 수백 개의 API가 있는 프로덕션 규모에서는 다음을 권장합니다:

### 1. API 문서화 워크플로우
```typescript
// 1. API 탐색 및 문서화 프로세스
interface APIDiscoveryProcess {
  swaggerDocs: string[]         // OpenAPI 명세서
  postmanCollections: string[]  // 내보낸 Postman 컬렉션
  internalDocs: string[]        // 내부 API 문서
  confluenceDocs: string[]      // Confluence API 문서
  slackChannels: string[]       // API 관련 Slack 채널
}

// 2. 자동화된 타입 생성
// openapi-typescript, swagger-codegen 등의 도구 사용
npm run generate-types        // OpenAPI 명세에서 타입 생성
npm run validate-schemas      // 스키마 검증
npm run update-docs          // 문서 자동 업데이트

// 3. API 변경사항 추적
interface APIChangeTracker {
  version: string
  changes: APIChange[]
  deprecatedEndpoints: string[]
  newEndpoints: string[]
  breakingChanges: BreakingChange[]
}
```

### 2. 타입 안전 API 클라이언트 구조
```typescript
// api/client/base.ts - 기본 클라이언트 구성
interface APIClient {
  baseURL: string
  timeout: number
  retries: number
  headers: Record<string, string>
  interceptors: {
    request: RequestInterceptor[]
    response: ResponseInterceptor[]
  }
}

// api/client/endpoints.ts - 엔드포인트별 그룹화
interface EndpointGroups {
  auth: AuthAPI           // 인증 관련 API (20개)
  user: UserAPI           // 사용자 관리 API (35개)
  security: SecurityAPI   // 보안 정책 API (50개)
  cloud: CloudConfigAPI   // 클라우드 구성 API (45개)
  monitoring: MonitorAPI  // 모니터링 API (60개)
  compliance: ComplianceAPI // 컴플라이언스 API (40개)
  reports: ReportsAPI     // 리포트 API (55개)
  integrations: IntegrationAPI // 연동 API (95개)
}

// api/endpoints/cloud-config.ts - 기능별 엔드포인트
interface CloudConfigAPI {
  // CRUD 기본 작업
  list: (params?: ListParams) => Promise<PaginatedResponse<CloudConfig>>
  get: (id: string) => Promise<CloudConfig>
  create: (data: CreateCloudConfigRequest) => Promise<CloudConfig>
  update: (id: string, data: UpdateCloudConfigRequest) => Promise<CloudConfig>
  delete: (id: string) => Promise<void>

  // 고급 작업
  bulkCreate: (configs: CreateCloudConfigRequest[]) => Promise<CloudConfig[]>
  bulkUpdate: (updates: BulkUpdateRequest) => Promise<CloudConfig[]>
  validate: (config: CloudConfigRequest) => Promise<ValidationResult>
  testConnection: (config: CloudConfigRequest) => Promise<ConnectionStatus>
  export: (format: ExportFormat) => Promise<Blob>
  import: (file: File) => Promise<ImportResult>
}
```

### 3. React Query 통합 및 최적화
```typescript
// hooks/api/use-cloud-configs.ts - 상세한 훅 구현
export function useCloudConfigs(params?: CloudConfigListParams) {
  return useQuery({
    queryKey: ['cloud-configs', params],
    queryFn: () => cloudConfigAPI.list(params),
    staleTime: 5 * 60 * 1000,     // 5분
    gcTime: 10 * 60 * 1000,       // 10분 (이전 cacheTime)
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error.status === 404) return false
      return failureCount < 3
    },
    placeholderData: keepPreviousData, // 페이지네이션 최적화
  })
}

export function useCloudConfig(id: string) {
  return useQuery({
    queryKey: ['cloud-config', id],
    queryFn: () => cloudConfigAPI.get(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,     // 2분
    select: (data) => {
      // 데이터 변환 및 정규화
      return {
        ...data,
        lastUpdated: new Date(data.updatedAt),
        isActive: data.status === 'active'
      }
    }
  })
}

export function useCreateCloudConfig() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cloudConfigAPI.create,
    onMutate: async (newConfig) => {
      // 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: ['cloud-configs'] })
      const previousConfigs = queryClient.getQueryData(['cloud-configs'])

      queryClient.setQueryData(['cloud-configs'], (old: any) => {
        return {
          ...old,
          data: [...(old?.data || []), { ...newConfig, id: 'temp-id' }]
        }
      })

      return { previousConfigs }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cloud-config', data.id], data)
      queryClient.invalidateQueries({ queryKey: ['cloud-configs'] })
      toast.success('구성이 성공적으로 생성되었습니다')
    },
    onError: (error, variables, context) => {
      // 롤백
      if (context?.previousConfigs) {
        queryClient.setQueryData(['cloud-configs'], context.previousConfigs)
      }
      toast.error(`구성 생성 실패: ${error.message}`)
    }
  })
}

// hooks/api/use-bulk-operations.ts - 대량 작업 최적화
export function useBulkCloudConfigOperations() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (operations: BulkOperation[]) => {
      // 배치 크기별로 분할 처리
      const batchSize = 10
      const batches = chunk(operations, batchSize)

      const results = []
      for (const batch of batches) {
        const batchResults = await Promise.allSettled(
          batch.map(op => {
            switch (op.type) {
              case 'create': return cloudConfigAPI.create(op.data)
              case 'update': return cloudConfigAPI.update(op.id, op.data)
              case 'delete': return cloudConfigAPI.delete(op.id)
            }
          })
        )
        results.push(...batchResults)

        // 배치 간 지연 (rate limiting)
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      return results
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cloud-configs'] })
      toast.success('대량 작업이 완료되었습니다')
    }
  })
}
```

### 4. 캐시 관리 전략
```typescript
// utils/cache-keys.ts - 중앙화된 캐시 키 관리
export const cacheKeys = {
  // 클라우드 구성 관련
  cloudConfigs: {
    all: ['cloud-configs'] as const,
    lists: () => [...cacheKeys.cloudConfigs.all, 'list'] as const,
    list: (filters: ConfigFilters) =>
      [...cacheKeys.cloudConfigs.lists(), { ...filters }] as const,
    details: () => [...cacheKeys.cloudConfigs.all, 'detail'] as const,
    detail: (id: string) =>
      [...cacheKeys.cloudConfigs.details(), id] as const,
    validation: (id: string) =>
      [...cacheKeys.cloudConfigs.detail(id), 'validation'] as const,
  },

  // 사용자 관련
  users: {
    all: ['users'] as const,
    lists: () => [...cacheKeys.users.all, 'list'] as const,
    detail: (id: string) => [...cacheKeys.users.all, 'detail', id] as const,
    permissions: (id: string) => [...cacheKeys.users.detail(id), 'permissions'] as const,
  },

  // 보안 정책 관련
  security: {
    all: ['security'] as const,
    policies: () => [...cacheKeys.security.all, 'policies'] as const,
    compliance: () => [...cacheKeys.security.all, 'compliance'] as const,
    audits: () => [...cacheKeys.security.all, 'audits'] as const,
  }
}

// utils/cache-management.ts - 캐시 무효화 패턴
export class CacheManager {
  constructor(private queryClient: QueryClient) {}

  // 계층적 무효화
  invalidateCloudConfigs(id?: string) {
    if (id) {
      this.queryClient.invalidateQueries({
        queryKey: cacheKeys.cloudConfigs.detail(id)
      })
    } else {
      this.queryClient.invalidateQueries({
        queryKey: cacheKeys.cloudConfigs.all
      })
    }
  }

  // 선택적 데이터 업데이트
  updateCloudConfig(id: string, updater: (old: CloudConfig) => CloudConfig) {
    this.queryClient.setQueryData(
      cacheKeys.cloudConfigs.detail(id),
      updater
    )

    // 목록에서도 업데이트
    this.queryClient.setQueriesData(
      { queryKey: cacheKeys.cloudConfigs.lists() },
      (old: any) => {
        if (!old?.data) return old
        return {
          ...old,
          data: old.data.map((item: CloudConfig) =>
            item.id === id ? updater(item) : item
          )
        }
      }
    )
  }

  // 메모리 사용량 최적화
  optimizeMemoryUsage() {
    // 5분 이상 사용되지 않은 쿼리 제거
    this.queryClient.getQueryCache().getAll()
      .filter(query => {
        const lastDataUpdateTime = query.state.dataUpdatedAt
        return Date.now() - lastDataUpdateTime > 5 * 60 * 1000
      })
      .forEach(query => {
        this.queryClient.removeQueries({ queryKey: query.queryKey })
      })
  }
}
```

### 5. 오류 처리 및 재시도 로직
```typescript
// api/error-handling.ts - 포괄적인 오류 처리
interface APIError {
  code: string
  message: string
  details?: Record<string, any>
  statusCode: number
  timestamp: string
  traceId: string
}

interface RetryConfig {
  attempts: number
  delay: (attemptIndex: number) => number
  retryCondition: (error: APIError) => boolean
  onRetry?: (error: APIError, attemptIndex: number) => void
}

const retryConfig: RetryConfig = {
  attempts: 3,
  delay: (attemptIndex: number) => {
    // 지수 백오프 with jitter
    const baseDelay = 1000 * Math.pow(2, attemptIndex)
    const jitter = Math.random() * 200
    return Math.min(baseDelay + jitter, 30000)
  },
  retryCondition: (error: APIError) => {
    // 재시도 가능한 오류 정의
    const retryableErrors = [
      'NETWORK_ERROR',
      'TIMEOUT',
      'RATE_LIMIT_EXCEEDED',
      'SERVER_ERROR'
    ]

    const retryableStatusCodes = [408, 429, 500, 502, 503, 504]

    return retryableErrors.includes(error.code) ||
           retryableStatusCodes.includes(error.statusCode)
  },
  onRetry: (error, attemptIndex) => {
    console.warn(`API 재시도 ${attemptIndex + 1}/3:`, error.message)

    // 모니터링 시스템에 재시도 로그 전송
    analytics.track('api_retry', {
      error_code: error.code,
      attempt: attemptIndex + 1,
      trace_id: error.traceId
    })
  }
}

// api/interceptors.ts - 요청/응답 인터셉터
export class APIInterceptors {
  static setupRequestInterceptor(client: AxiosInstance) {
    client.interceptors.request.use(
      (config) => {
        // 요청 ID 추가 (추적용)
        config.headers['X-Request-ID'] = generateRequestId()

        // 인증 토큰 자동 추가
        const token = getAuthToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // 요청 로깅
        console.log(`[API 요청] ${config.method?.toUpperCase()} ${config.url}`)

        return config
      },
      (error) => Promise.reject(error)
    )
  }

  static setupResponseInterceptor(client: AxiosInstance) {
    client.interceptors.response.use(
      (response) => {
        // 응답 로깅
        console.log(`[API 응답] ${response.status} ${response.config.url}`)

        // 성능 메트릭 수집
        const requestTime = response.config.metadata?.startTime
        if (requestTime) {
          const duration = Date.now() - requestTime
          analytics.track('api_performance', {
            endpoint: response.config.url,
            duration,
            status: response.status
          })
        }

        return response
      },
      async (error) => {
        // 토큰 만료 시 자동 갱신
        if (error.response?.status === 401) {
          try {
            await refreshAuthToken()
            return client.request(error.config)
          } catch (refreshError) {
            // 로그아웃 처리
            redirectToLogin()
            return Promise.reject(refreshError)
          }
        }

        // 오류 정규화
        const normalizedError: APIError = {
          code: error.response?.data?.code || 'UNKNOWN_ERROR',
          message: error.response?.data?.message || error.message,
          details: error.response?.data?.details,
          statusCode: error.response?.status || 0,
          timestamp: new Date().toISOString(),
          traceId: error.response?.headers['x-trace-id'] || 'unknown'
        }

        // 오류 모니터링
        analytics.track('api_error', normalizedError)

        return Promise.reject(normalizedError)
      }
    )
  }
}
```

### 6. API 호출 훅 구성 전략
```typescript
// hooks/factories/api-hook-factory.ts - 훅 팩토리 패턴
export function createAPIHooks<T, CreateT, UpdateT>({
  baseKey,
  api,
  defaultStaleTime = 5 * 60 * 1000
}: {
  baseKey: string
  api: CRUDApi<T, CreateT, UpdateT>
  defaultStaleTime?: number
}) {
  // 목록 조회 훅
  const useList = (params?: any) => {
    return useQuery({
      queryKey: [baseKey, 'list', params],
      queryFn: () => api.list(params),
      staleTime: defaultStaleTime,
      placeholderData: keepPreviousData
    })
  }

  // 단일 조회 훅
  const useDetail = (id: string) => {
    return useQuery({
      queryKey: [baseKey, 'detail', id],
      queryFn: () => api.get(id),
      enabled: !!id,
      staleTime: defaultStaleTime
    })
  }

  // 생성 훅
  const useCreate = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: api.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [baseKey] })
      }
    })
  }

  // 업데이트 훅
  const useUpdate = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateT }) => api.update(id, data),
      onSuccess: (data, { id }) => {
        queryClient.setQueryData([baseKey, 'detail', id], data)
        queryClient.invalidateQueries({ queryKey: [baseKey, 'list'] })
      }
    })
  }

  // 삭제 훅
  const useDelete = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: api.delete,
      onSuccess: (_, id) => {
        queryClient.removeQueries({ queryKey: [baseKey, 'detail', id] })
        queryClient.invalidateQueries({ queryKey: [baseKey, 'list'] })
      }
    })
  }

  return {
    useList,
    useDetail,
    useCreate,
    useUpdate,
    useDelete
  }
}

// 사용 예시
const cloudConfigHooks = createAPIHooks({
  baseKey: 'cloud-configs',
  api: cloudConfigAPI,
  defaultStaleTime: 3 * 60 * 1000 // 3분
})

export const {
  useList: useCloudConfigs,
  useDetail: useCloudConfig,
  useCreate: useCreateCloudConfig,
  useUpdate: useUpdateCloudConfig,
  useDelete: useDeleteCloudConfig
} = cloudConfigHooks
```

### 7. 성능 모니터링 및 최적화
```typescript
// utils/performance-monitor.ts - API 성능 모니터링
class APIPerformanceMonitor {
  private metrics: Map<string, PerformanceMetric[]> = new Map()

  recordAPICall(endpoint: string, duration: number, status: number) {
    const metric: PerformanceMetric = {
      endpoint,
      duration,
      status,
      timestamp: Date.now()
    }

    if (!this.metrics.has(endpoint)) {
      this.metrics.set(endpoint, [])
    }

    const endpointMetrics = this.metrics.get(endpoint)!
    endpointMetrics.push(metric)

    // 최근 100개 레코드만 유지
    if (endpointMetrics.length > 100) {
      endpointMetrics.shift()
    }

    // 성능 경고 처리
    this.checkPerformanceThresholds(endpoint, metric)
  }

  private checkPerformanceThresholds(endpoint: string, metric: PerformanceMetric) {
    const thresholds = {
      slow: 2000,      // 2초 이상
      verySlow: 5000   // 5초 이상
    }

    if (metric.duration > thresholds.verySlow) {
      console.error(`매우 느린 API 호출: ${endpoint} (${metric.duration}ms)`)
      // 슬랙 알림 또는 모니터링 시스템에 전송
    } else if (metric.duration > thresholds.slow) {
      console.warn(`느린 API 호출: ${endpoint} (${metric.duration}ms)`)
    }
  }

  getAverageResponseTime(endpoint: string): number {
    const metrics = this.metrics.get(endpoint) || []
    if (metrics.length === 0) return 0

    const sum = metrics.reduce((acc, metric) => acc + metric.duration, 0)
    return sum / metrics.length
  }

  getSlowEndpoints(threshold: number = 1000): string[] {
    return Array.from(this.metrics.keys())
      .filter(endpoint => this.getAverageResponseTime(endpoint) > threshold)
      .sort((a, b) => this.getAverageResponseTime(b) - this.getAverageResponseTime(a))
  }
}

// 전역 인스턴스
export const performanceMonitor = new APIPerformanceMonitor()
```

### 8. 실무 배포 및 운영 고려사항
```typescript
// config/api-environments.ts - 환경별 API 구성
interface EnvironmentConfig {
  baseURL: string
  timeout: number
  rateLimit: {
    requests: number
    window: number // ms
  }
  retries: number
  monitoring: {
    enabled: boolean
    sampleRate: number
  }
}

const environmentConfigs: Record<string, EnvironmentConfig> = {
  development: {
    baseURL: 'http://localhost:3001/api',
    timeout: 10000,
    rateLimit: { requests: 100, window: 60000 },
    retries: 1,
    monitoring: { enabled: true, sampleRate: 1.0 }
  },
  staging: {
    baseURL: 'https://api-staging.tatumSecurity.com',
    timeout: 8000,
    rateLimit: { requests: 200, window: 60000 },
    retries: 2,
    monitoring: { enabled: true, sampleRate: 0.1 }
  },
  production: {
    baseURL: 'https://api.tatumSecurity.com',
    timeout: 5000,
    rateLimit: { requests: 1000, window: 60000 },
    retries: 3,
    monitoring: { enabled: true, sampleRate: 0.01 }
  }
}

// utils/api-rate-limiter.ts - Rate Limiting 구현
class APIRateLimiter {
  private requests: Map<string, number[]> = new Map()

  canMakeRequest(endpoint: string, limit: number, window: number): boolean {
    const now = Date.now()
    const endpointRequests = this.requests.get(endpoint) || []

    // window 밖의 오래된 요청 제거
    const validRequests = endpointRequests.filter(time => now - time < window)

    if (validRequests.length >= limit) {
      return false
    }

    validRequests.push(now)
    this.requests.set(endpoint, validRequests)
    return true
  }

  getRemainingRequests(endpoint: string, limit: number, window: number): number {
    const now = Date.now()
    const endpointRequests = this.requests.get(endpoint) || []
    const validRequests = endpointRequests.filter(time => now - time < window)
    return Math.max(0, limit - validRequests.length)
  }
}
```

## 📄 API 문서 확인 및 유지보수 전략

### 1. API 문서 자동화 시스템
```typescript
// scripts/generate-api-docs.ts - API 문서 자동 생성
import { generateAPIDocumentation } from './docs-generator'

interface APIDocumentationConfig {
  openApiSpecs: string[]     // OpenAPI 명세서 경로
  outputDir: string          // 문서 출력 디렉토리
  templates: {
    readme: string           // README 템플릿
    hooks: string            // 훅 사용법 템플릿
    examples: string         // 예제 코드 템플릿
  }
  languages: string[]        // 지원 언어 (한국어, 영어)
}

// 자동 문서 생성 스크립트
async function generateDocs() {
  const config: APIDocumentationConfig = {
    openApiSpecs: ['./specs/auth.yaml', './specs/cloud-config.yaml'],
    outputDir: './docs/api',
    templates: {
      readme: './templates/api-readme.md',
      hooks: './templates/react-hooks.md',
      examples: './templates/examples.md'
    },
    languages: ['ko', 'en']
  }

  // 1. OpenAPI 명세에서 타입 생성
  await generateTypes(config.openApiSpecs)

  // 2. React Query 훅 자동 생성
  await generateReactQueryHooks(config.openApiSpecs)

  // 3. 문서 생성
  await generateAPIDocumentation(config)

  // 4. 예제 코드 생성
  await generateExampleCode(config)

  console.log('📚 API 문서가 성공적으로 생성되었습니다!')
}
```

### 2. API 타입 작성 자동화
```bash
# package.json 스크립트
{
  "scripts": {
    "api:generate-types": "openapi-typescript ./specs/*.yaml -o ./types/api.ts",
    "api:generate-hooks": "node scripts/generate-hooks.js",
    "api:validate-schemas": "swagger-codegen validate -i ./specs/*.yaml",
    "api:docs": "redoc-cli build ./specs/combined.yaml --output docs/api.html",
    "api:test": "jest api-tests/",
    "api:mock": "prism mock ./specs/combined.yaml",
    "api:all": "npm run api:generate-types && npm run api:generate-hooks && npm run api:docs"
  }
}

# CI/CD 파이프라인에서 자동 실행
# .github/workflows/api-updates.yml
name: API Documentation Update
on:
  push:
    paths:
      - 'specs/**'
  schedule:
    - cron: '0 2 * * *'  # 매일 오전 2시

jobs:
  update-api-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Generate API documentation
        run: npm run api:all
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v4
        with:
          title: 'docs: API 문서 자동 업데이트'
          body: 'OpenAPI 명세에서 자동 생성된 API 문서 업데이트'
```

### 3. API 리뷰 및 테스트 전략
```typescript
// tests/api-contract.test.ts - API 계약 테스트
import { CloudConfigAPI } from '../types/api'
import { validateAPIResponse } from '../utils/api-validation'

describe('Cloud Config API Contract Tests', () => {
  const api = new CloudConfigAPI()

  test('GET /cloud-configs 응답 스키마 검증', async () => {
    const response = await api.list()

    expect(response).toMatchObject({
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          provider: expect.stringMatching(/^(aws|azure|gcp)$/),
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        })
      ]),
      pagination: expect.objectContaining({
        page: expect.any(Number),
        limit: expect.any(Number),
        total: expect.any(Number)
      })
    })
  })

  test('POST /cloud-configs 입력 검증', async () => {
    const validInput = {
      name: 'Test Config',
      provider: 'aws' as const,
      credentials: {
        accessKey: 'test-key',
        secretKey: 'test-secret'
      }
    }

    const response = await api.create(validInput)
    expect(response.id).toBeDefined()
    expect(response.name).toBe(validInput.name)
  })

  test('API 오류 처리 검증', async () => {
    const invalidInput = {
      name: '', // 빈 이름
      provider: 'invalid' as any
    }

    await expect(api.create(invalidInput)).rejects.toMatchObject({
      code: 'VALIDATION_ERROR',
      statusCode: 400,
      details: expect.objectContaining({
        fields: expect.arrayContaining(['name', 'provider'])
      })
    })
  })
})

// tests/performance.test.ts - 성능 테스트
describe('API Performance Tests', () => {
  test('목록 조회 API 1초 이내 응답', async () => {
    const startTime = Date.now()
    await api.list({ limit: 50 })
    const duration = Date.now() - startTime

    expect(duration).toBeLessThan(1000)
  })

  test('대량 데이터 페이지네이션 성능', async () => {
    const responses = await Promise.all([
      api.list({ page: 1, limit: 100 }),
      api.list({ page: 2, limit: 100 }),
      api.list({ page: 3, limit: 100 })
    ])

    responses.forEach(response => {
      expect(response.data.length).toBeLessThanOrEqual(100)
      expect(response.pagination).toBeDefined()
    })
  })
})
```

### 4. API 리팩토링 및 버전 관리
```typescript
// utils/api-migration.ts - API 버전 마이그레이션
interface APIMigration {
  version: string
  description: string
  migrate: (oldData: any) => any
  rollback?: (newData: any) => any
}

const migrations: APIMigration[] = [
  {
    version: '2.0.0',
    description: 'CloudConfig API 스키마 변경',
    migrate: (oldConfig) => ({
      ...oldConfig,
      // v1의 `type` 필드를 v2의 `provider`로 변경
      provider: oldConfig.type,
      // v1의 `settings` 필드를 v2의 `credentials`로 변경
      credentials: oldConfig.settings,
      // v2에서 새로 추가된 필드
      version: '2.0.0',
      createdAt: oldConfig.created || new Date().toISOString()
    }),
    rollback: (newConfig) => ({
      ...newConfig,
      type: newConfig.provider,
      settings: newConfig.credentials,
      created: newConfig.createdAt
    })
  }
]

// API 버전 화획성 검사
export function checkAPICompatibility(clientVersion: string, serverVersion: string): boolean {
  const [clientMajor] = clientVersion.split('.').map(Number)
  const [serverMajor] = serverVersion.split('.').map(Number)

  // Major 버전이 다르면 비호환
  return clientMajor === serverMajor
}

// 자동 데이터 변환
export function migrateAPIData(data: any, fromVersion: string, toVersion: string): any {
  const applicableMigrations = migrations.filter(m => {
    const migrationVersion = m.version
    return semverGt(migrationVersion, fromVersion) && semverLte(migrationVersion, toVersion)
  })

  return applicableMigrations.reduce((acc, migration) => {
    console.log(`API 데이터 마이그레이션: ${migration.version} - ${migration.description}`)
    return migration.migrate(acc)
  }, data)
}
```

## 🎯 UX 디자인 철학

### 마이크로 인터렉션
- **점진적 향상**: JavaScript 없이도 작동하도록 기본 기능 제공
- **즉시 피드백**: 로딩 상태 및 낙관적 업데이트
- **오류 복구**: 명확한 오류 메시지와 권장 조치
- **접근성**: ARIA 레이블, 키보드 내비게이션, 스크린 리더 지원

### 폼 디자인 원칙
- **스마트 기본값**: 글로벌 리전 자동 포함
- **상황별 도움말**: 필드 설명 및 검증 메시지
- **프로바이더 적응**: 클라우드 프로바이더 선택에 따른 필드 변경
- **데이터 지속성**: 프로바이더 전환 시 폼 상태 유지

## 📝 QA 및 테스트 전략

### 수동 테스트 체크리스트
- [ ] 모든 필수 필드를 포함한 새 AWS 구성 생성
- [ ] 기존 구성 편집 및 데이터 지속성 확인
- [ ] 프로바이더 전환 테스트 (AWS → Azure → GCP)
- [ ] 리전 요구사항 확인 (글로벌 리전 필수 포함)
- [ ] 다중 선택 상호작용 테스트 (클라우드 그룹, 리전, 이벤트 소스)
- [ ] 폼 오류 및 성공 메시지 검증
- [ ] 모바일 디바이스에서 반응형 디자인 테스트
- [ ] API 호출 중 로딩 상태 확인

### 자동화된 테스트 접근법
```typescript
// tests/cloud-dialog.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CloudDialog } from '@/components/cloud-dialog'

describe('CloudDialog', () => {
  test('새 구성을 생성해야 함', async () => {
    render(<CloudDialog open={true} onOpenChange={jest.fn()} />)

    fireEvent.change(screen.getByLabelText('구성 이름'), {
      target: { value: '테스트 구성' }
    })

    fireEvent.click(screen.getByRole('button', { name: '구성 생성' }))

    await waitFor(() => {
      expect(mockCreateAPI).toHaveBeenCalledWith({
        name: '테스트 구성',
        // ... 기타 예상 필드
      })
    })
  })
})
```

## 🚀 향후 개선 사항

1. **다중 프로바이더 지원**: Azure 및 GCP 구현 완료
2. **대량 작업**: 구성 가져오기/내보내기, 일괄 업데이트
3. **고도 검증**: 실시간 자격 증명 유효성 검사
4. **감사 추적**: 구성 변경 및 사용자 행동 추적
5. **역할 기반 접근 제어**: 사용자 권한 및 승인 워크플로우
6. **구성 템플릿**: 일반적인 사용 사례를 위한 미리 정의된 설정

## 📄 라이센스

MIT 라이센스 - 자세한 내용은 LICENSE 파일을 참조하세요.

---

Next.js, TypeScript, shadcn/ui로 ❤️를 담아 제작되었습니다
