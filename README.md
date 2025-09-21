# Cloud Configuration Management

A Next.js application for managing cloud provider configurations with support for multiple cloud providers (AWS, Azure, GCP). Built with TypeScript, React, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

### Core Functionality
- **Multi-Provider Support**: AWS (fully functional), Azure & GCP (coming soon)
- **Dynamic Form Fields**: Provider-specific configuration fields that adapt based on selection
- **Multi-Select Components**: Select multiple cloud groups and regions
- **Form Validation**: Robust validation using Zod schema validation
- **Real-time Updates**: 500ms delayed mock API responses for realistic UX
- **Shared Dialog**: Single reusable component for both create and edit operations

### UX Features
- **Loading States**: Spinners and disabled states during API calls
- **Error Handling**: Toast notifications for success and error messages
- **Responsive Design**: Mobile-friendly table and form layouts
- **Hover Effects**: Interactive button states and visual feedback
- **Form Reset**: Proper form state management and cleanup

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: React useState (mock data)
- **Notifications**: Sonner toast library

## 📦 Installation

```bash
# Clone the repository
git clone [repository-url]
cd cloud-management

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Project Structure

```
cloud-management/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with Toaster
│   └── page.tsx             # Main page component
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── multi-select.tsx # Custom multi-select component
│   │   └── ...
│   ├── cloud-dialog.tsx     # Main form dialog
│   ├── cloud-list-page.tsx  # List page container
│   └── cloud-table.tsx      # Data table component
├── lib/
│   ├── api.ts              # Mock API functions
│   ├── data.ts             # Sample data
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # Type definitions and schemas
```

## 🔧 Key Design Decisions

### Extensible Component Architecture

#### 1. Provider Configuration System
```typescript
interface ProviderFieldConfig {
  provider: CloudProvider
  credentialFields: FieldConfig[]
  eventSources: string[]
  disabled: boolean
}
```

The `PROVIDER_CONFIGS` object enables easy addition of new cloud providers by simply adding a new configuration object with provider-specific fields, validation rules, and event sources.

#### 2. Dynamic Form Field Generation
The dialog component dynamically renders credential fields based on the selected provider, ensuring type safety while maintaining flexibility for future providers.

#### 3. Shared Component Pattern
A single `CloudDialog` component handles both create and edit operations by:
- Detecting edit mode via the presence of a `config` prop
- Dynamically populating form fields
- Adapting button text and API calls accordingly

## 📊 API Management Strategy

### Current Implementation
For this demo, we use a simple mock API with in-memory state. However, for production scale with hundreds of APIs, we recommend:

### 1. API Documentation Workflow
```typescript
// 1. API Discovery and Documentation
interface APIDiscoveryProcess {
  swaggerDocs: string[]      // OpenAPI specifications
  postmanCollections: string[] // Exported collections
  internalDocs: string[]     // Internal API documentation
}

// 2. Automated Type Generation
// Use tools like openapi-typescript or swagger-codegen
npm run generate-types     // Generate types from OpenAPI specs
```

### 2. Type-Safe API Client Structure
```typescript
// api/client.ts - Base client configuration
interface APIClient {
  baseURL: string
  timeout: number
  retries: number
  headers: Record<string, string>
}

// api/endpoints/cloud-config.ts - Feature-specific endpoints
interface CloudConfigAPI {
  list: () => Promise<CloudConfig[]>
  get: (id: string) => Promise<CloudConfig>
  create: (data: CreateCloudConfigRequest) => Promise<CloudConfig>
  update: (id: string, data: UpdateCloudConfigRequest) => Promise<CloudConfig>
  delete: (id: string) => Promise<void>
}
```

### 3. React Query Integration
```typescript
// hooks/use-cloud-configs.ts
export function useCloudConfigs() {
  return useQuery({
    queryKey: ['cloud-configs'],
    queryFn: () => cloudConfigAPI.list(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
}

export function useCloudConfig(id: string) {
  return useQuery({
    queryKey: ['cloud-config', id],
    queryFn: () => cloudConfigAPI.get(id),
    enabled: !!id,
  })
}

export function useCreateCloudConfig() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: cloudConfigAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cloud-configs'] })
      toast.success('Configuration created successfully')
    },
    onError: (error) => {
      toast.error(`Failed to create configuration: ${error.message}`)
    }
  })
}
```

### 4. Cache Management Strategy
```typescript
// utils/cache-keys.ts - Centralized cache key management
export const cacheKeys = {
  cloudConfigs: {
    all: ['cloud-configs'] as const,
    lists: () => [...cacheKeys.cloudConfigs.all, 'list'] as const,
    list: (filters: ConfigFilters) => 
      [...cacheKeys.cloudConfigs.lists(), filters] as const,
    details: () => [...cacheKeys.cloudConfigs.all, 'detail'] as const,
    detail: (id: string) => 
      [...cacheKeys.cloudConfigs.details(), id] as const,
  }
}

// Invalidation patterns
queryClient.invalidateQueries({ queryKey: cacheKeys.cloudConfigs.all })
queryClient.setQueryData(cacheKeys.cloudConfigs.detail(id), newData)
```

### 5. Error Handling & Retry Logic
```typescript
// api/error-handling.ts
interface APIError {
  code: string
  message: string
  details?: Record<string, any>
}

const retryConfig = {
  attempts: 3,
  delay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  retryCondition: (error: APIError) => {
    return error.code === 'NETWORK_ERROR' || 
           error.code === 'TIMEOUT' || 
           (error.code === 'SERVER_ERROR' && error.message.includes('503'))
  }
}
```

## 🌍 Internationalization (i18n) Strategy

### 1. Resource Management Structure
```
locales/
├── en/
│   ├── common.json          # Shared translations
│   ├── cloud-config.json    # Feature-specific translations
│   └── errors.json          # Error messages
├── ko/
│   ├── common.json
│   ├── cloud-config.json
│   └── errors.json
└── ja/
    ├── common.json
    ├── cloud-config.json
    └── errors.json
```

### 2. Key Naming Convention
```json
{
  "cloudConfig": {
    "title": "Cloud Configurations",
    "form": {
      "name": {
        "label": "Configuration Name",
        "placeholder": "e.g., Production AWS",
        "validation": {
          "required": "Configuration name is required",
          "minLength": "Name must be at least 2 characters"
        }
      }
    },
    "actions": {
      "create": "Create Configuration",
      "update": "Update Configuration",
      "delete": "Delete Configuration"
    }
  }
}
```

### 3. Implementation with next-intl
```typescript
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

// components/cloud-dialog.tsx
import { useTranslations } from 'next-intl'

export function CloudDialog() {
  const t = useTranslations('cloudConfig')
  
  return (
    <DialogTitle>
      {isEditing ? t('actions.update') : t('actions.create')}
    </DialogTitle>
  )
}
```

### 4. Loading Strategy & Performance
```typescript
// Dynamic loading for better performance
const loadNamespaces = async (locale: string, namespaces: string[]) => {
  const messages = await Promise.all(
    namespaces.map(ns => 
      import(`../locales/${locale}/${ns}.json`).then(m => m.default)
    )
  )
  
  return namespaces.reduce((acc, ns, index) => ({
    ...acc,
    [ns]: messages[index]
  }), {})
}
```

### 5. Team Collaboration Workflow
1. **Translation Keys**: Use TypeScript for compile-time key validation
2. **Translation Management**: Integrate with services like Crowdin or Lokalise
3. **Review Process**: Require translation review before merging
4. **Automated Checks**: CI pipeline validates missing translations
5. **Context for Translators**: Include screenshots and usage context

## 🎯 UX Design Philosophy

### Micro-Interactions
- **Progressive Enhancement**: Features work without JavaScript, enhanced with it
- **Immediate Feedback**: Loading states and optimistic updates
- **Error Recovery**: Clear error messages with suggested actions
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### Form Design Principles
- **Smart Defaults**: Global region automatically included
- **Contextual Help**: Field descriptions and validation messages
- **Provider Adaptation**: Fields change based on cloud provider selection
- **Data Persistence**: Form state preserved during provider switches

## 📝 QA & Testing Strategy

### Manual Testing Checklist
- [ ] Create new AWS configuration with all required fields
- [ ] Edit existing configuration and verify data persistence
- [ ] Test provider switching (AWS → Azure → GCP)
- [ ] Verify region requirement (global must be included)
- [ ] Test multi-select interactions (cloud groups, regions, event sources)
- [ ] Validate form errors and success messages
- [ ] Test responsive design on mobile devices
- [ ] Verify loading states during API calls

### Automated Testing Approach
```typescript
// tests/cloud-dialog.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CloudDialog } from '@/components/cloud-dialog'

describe('CloudDialog', () => {
  test('should create new configuration', async () => {
    render(<CloudDialog open={true} onOpenChange={jest.fn()} />)
    
    fireEvent.change(screen.getByLabelText('Configuration Name'), {
      target: { value: 'Test Config' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: 'Create Configuration' }))
    
    await waitFor(() => {
      expect(mockCreateAPI).toHaveBeenCalledWith({
        name: 'Test Config',
        // ... other expected fields
      })
    })
  })
})
```

## 🚀 Future Enhancements

1. **Multi-Provider Support**: Complete Azure and GCP implementations
2. **Bulk Operations**: Import/export configurations, batch updates
3. **Advanced Validation**: Real-time credential validation
4. **Audit Trail**: Track configuration changes and user actions
5. **Role-Based Access**: User permissions and approval workflows
6. **Configuration Templates**: Predefined setups for common use cases

## 📄 License

MIT License - see LICENSE file for details.

---

Built with ❤️ using Next.js, TypeScript, and shadcn/ui
