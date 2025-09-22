# 🚀 API 관리 전략 - 400여 개 API 효율적 관리 방안

> **테이텀 시큐리티 API 관리 체계 - React Query 기반 대규모 API 관리 실무 가이드**

## 🎯 핵심 목표

- **400여 개 API 체계적 관리**: 도메인별 구조화된 관리
- **개발자 경험 최적화**: 타입 안전하고 사용하기 쉬운 API
- **성능 최적화**: 효율적인 캐싱과 로딩 전략
- **유지보수성 향상**: 일관된 패턴과 자동화된 관리

---

## 🏗️ API 관리 아키텍처

### 구조화된 폴더 구성

```
src/api/
├── client/
│   ├── axios.ts              # HTTP 클라이언트 설정
│   └── query-client.ts       # React Query 설정
├── endpoints/                # 도메인별 API 엔드포인트
│   ├── auth/                 # 인증 관련 (20개)
│   ├── cloud/                # 클라우드 관리 (80개)
│   ├── security/             # 보안 스캔 (150개)
│   ├── compliance/           # 컴플라이언스 (70개)
│   ├── users/                # 사용자 관리 (30개)
│   ├── dashboard/            # 대시보드 (25개)
│   ├── reports/              # 리포트 (15개)
│   └── settings/             # 설정 (10개)
├── hooks/                    # React Query 훅
│   ├── auth/
│   ├── cloud/
│   └── [각 도메인별 훅]
├── types/                    # API 타입 정의
└── utils/                    # 공통 유틸리티
```

---

## 🔧 API 엔드포인트 패턴

### 1. 표준화된 CRUD 엔드포인트

```typescript
// src/api/endpoints/cloud/cloud-providers.ts
export const cloudProviderEndpoints = {
  list: (params?: PaginationParams) => 
    api.get<CloudProvider[]>('/cloud-providers', { params }),
  
  get: (id: string) => 
    api.get<CloudProvider>(`/cloud-providers/${id}`),
  
  create: (data: CreateCloudProviderRequest) => 
    api.post<CloudProvider>('/cloud-providers', data),
  
  update: (id: string, data: UpdateCloudProviderRequest) => 
    api.put<CloudProvider>(`/cloud-providers/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/cloud-providers/${id}`),
  
  // 특화 엔드포인트
  testConnection: (id: string) => 
    api.post(`/cloud-providers/${id}/test-connection`),
  
  runScan: (id: string, type: 'full' | 'incremental') => 
    api.post(`/cloud-providers/${id}/scan`, { type }),
}
```

### 2. 도메인별 엔드포인트 통합

```typescript
// src/api/endpoints/index.ts
export * from './auth'
export * from './cloud'
export * from './security'
export * from './compliance'
export * from './users'
export * from './dashboard'
export * from './reports'
export * from './settings'

// 통합 API 객체
export const api = {
  auth: authEndpoints,
  cloud: cloudEndpoints,
  security: securityEndpoints,
  compliance: complianceEndpoints,
  users: userEndpoints,
  dashboard: dashboardEndpoints,
  reports: reportEndpoints,
  settings: settingsEndpoints,
}
```

---

## ⚛️ React Query 훅 패턴

### 1. 자동 생성 CRUD 훅

```typescript
// src/api/hooks/common/create-crud-hooks.ts
export function createCrudHooks<T, CreateReq, UpdateReq>(config: {
  domain: string
  endpoints: CrudEndpoints<T, CreateReq, UpdateReq>
  queryKey: string
}) {
  return {
    useList: (params?: PaginationParams) => useQuery({
      queryKey: [config.queryKey, 'list', params],
      queryFn: () => config.endpoints.list(params),
    }),
    
    useDetail: (id: string) => useQuery({
      queryKey: [config.queryKey, 'detail', id],
      queryFn: () => config.endpoints.get(id),
    }),
    
    useCreate: () => useMutation({
      mutationFn: config.endpoints.create,
      onSuccess: () => {
        queryClient.invalidateQueries([config.queryKey])
        toast.success(`${config.domain} 생성 완료`)
      }
    }),
    
    useUpdate: () => useMutation({
      mutationFn: ({ id, data }: { id: string, data: UpdateReq }) => 
        config.endpoints.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries([config.queryKey])
        toast.success(`${config.domain} 수정 완료`)
      }
    }),
    
    useDelete: () => useMutation({
      mutationFn: config.endpoints.delete,
      onSuccess: () => {
        queryClient.invalidateQueries([config.queryKey])
        toast.success(`${config.domain} 삭제 완료`)
      }
    })
  }
}
```

### 2. 도메인별 훅 자동 생성

```typescript
// src/api/hooks/cloud/index.ts
export const {
  useList: useCloudProviderList,
  useDetail: useCloudProviderDetail,
  useCreate: useCreateCloudProvider,
  useUpdate: useUpdateCloudProvider,
  useDelete: useDeleteCloudProvider,
} = createCrudHooks({
  domain: '클라우드 프로바이더',
  endpoints: cloudProviderEndpoints,
  queryKey: 'cloudProviders'
})

// 특화 훅들
export const useTestConnection = () => useMutation({
  mutationFn: cloudProviderEndpoints.testConnection,
  onSuccess: () => toast.success('연결 테스트 성공'),
  onError: () => toast.error('연결 테스트 실패')
})
```

---

## 🔷 TypeScript 타입 자동 생성

### 1. OpenAPI/Swagger 연동

```typescript
// scripts/generate-api-types.ts
import { generateApi } from 'swagger-typescript-api'

generateApi({
  name: 'api-types.ts',
  url: 'https://api.tatum-security.com/swagger.json',
  output: './src/api/types/',
  httpClientType: 'axios',
  generateClient: false,
  extractRequestParams: true,
  extractResponseTypes: true,
})
```

### 2. 통합 타입 시스템

```typescript
// src/api/types/index.ts
export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
  meta?: {
    pagination?: PaginationMeta
    total?: number
  }
}

export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}

// 자동 생성된 타입들 통합
export * from './generated/api-types'
export * from './common'
export * from './auth'
export * from './cloud'
export * from './security'
```

---

## ⚡ 성능 최적화 전략

### 1. 스마트 캐싱

```typescript
// src/api/client/query-client.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5분
      cacheTime: 10 * 60 * 1000,     // 10분
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false // 4xx 에러는 재시도 안함
        }
        return failureCount < 3
      }
    }
  }
})
```

### 2. 배치 요청 최적화

```typescript
// src/api/utils/batch-requests.ts
export const useBatchRequests = <T>(
  ids: string[],
  fetchFn: (id: string) => Promise<T>,
  options?: { batchSize?: number }
) => {
  const { batchSize = 10 } = options || {}
  
  return useQueries({
    queries: ids.map(id => ({
      queryKey: ['batch', id],
      queryFn: () => fetchFn(id),
      staleTime: 5 * 60 * 1000,
    }))
  })
}
```

---

## 🛠️ 개발자 도구

### 1. API 훅 자동 생성 스크립트

```typescript
// scripts/generate-hooks.ts
import fs from 'fs'
import { glob } from 'glob'

// endpoints 폴더를 스캔하여 자동으로 훅 생성
const generateHooksFromEndpoints = () => {
  const endpointFiles = glob.sync('src/api/endpoints/**/*.ts')
  
  endpointFiles.forEach(file => {
    const domain = file.split('/').slice(-2, -1)[0]
    const endpoints = require(file)
    
    // CRUD 훅 자동 생성
    const hookContent = generateCrudHooksCode(domain, endpoints)
    fs.writeFileSync(`src/api/hooks/${domain}/index.ts`, hookContent)
  })
}
```

### 2. API 문서 자동 동기화

```json
// package.json
{
  "scripts": {
    "api:generate": "ts-node scripts/generate-api-types.ts",
    "api:hooks": "ts-node scripts/generate-hooks.ts", 
    "api:sync": "npm run api:generate && npm run api:hooks",
    "precommit": "npm run api:sync"
  }
}
```

---

## 📊 사용 현황 모니터링

### 1. API 사용량 추적

```typescript
// src/api/utils/api-monitor.ts
export const apiMonitor = {
  trackUsage: (endpoint: string, method: string) => {
    const usage = JSON.parse(localStorage.getItem('api-usage') || '{}')
    const key = `${method} ${endpoint}`
    usage[key] = (usage[key] || 0) + 1
    localStorage.setItem('api-usage', JSON.stringify(usage))
  },
  
  getTopEndpoints: (limit = 10) => {
    const usage = JSON.parse(localStorage.getItem('api-usage') || '{}')
    return Object.entries(usage)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, limit)
  }
}
```

### 2. 성능 메트릭

```typescript
// src/api/client/axios.ts
axios.interceptors.request.use(config => {
  config.metadata = { startTime: Date.now() }
  apiMonitor.trackUsage(config.url!, config.method!)
  return config
})

axios.interceptors.response.use(response => {
  const duration = Date.now() - response.config.metadata.startTime
  console.log(`API ${response.config.url}: ${duration}ms`)
  return response
})
```

---

## 📝 실제 사용 예시

### 컴포넌트에서의 사용

```typescript
// components/CloudProviderList.tsx
export const CloudProviderList = () => {
  const { data: providers, isLoading } = useCloudProviderList()
  const createMutation = useCreateCloudProvider()
  const deleteMutation = useDeleteCloudProvider()
  
  const handleCreate = (data: CreateCloudProviderRequest) => {
    createMutation.mutate(data)
  }
  
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        providers?.map(provider => (
          <ProviderCard 
            key={provider.id}
            provider={provider}
            onDelete={(id) => deleteMutation.mutate(id)}
          />
        ))
      )}
    </div>
  )
}
```

---

## 🎯 핵심 이점

1. **개발 효율성 극대화**: 400개 API를 표준화된 패턴으로 관리
2. **타입 안전성**: 컴파일 타임에 API 오류 감지
3. **자동화된 관리**: 스크립트로 훅과 타입 자동 생성
4. **최적화된 성능**: 스마트 캐싱과 배치 처리
5. **일관된 UX**: 표준화된 로딩/에러 처리