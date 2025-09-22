import { z } from "zod"

export type Provider = 'AWS' | 'AZURE' | 'GCP'; // 프로바이더 예시, AWS만 활성화
export type CloudProvider = "aws" | "azure" | "gcp"

export const CLOUD_PROVIDERS: CloudProvider[] = ["aws", "azure", "gcp"]

export const AWSRegionList = [
    'global',
    'ap-northeast-1',
    'ap-northeast-2',
    'ap-northeast-3',
    'ap-south-1',
    'ap-southeast-1',
    'ap-southeast-2',
    'ca-central-1',
    'eu-central-1',
    'eu-north-1',
    'eu-west-1',
    'eu-west-2',
    'eu-west-3',
    'sa-east-1',
    'us-east-1',
    'us-east-2',
    'us-west-1',
    'us-west-2',
] as const;

export const REGIONS: Record<string, string> = {
  'global': 'Global',
  'ap-northeast-1': 'Asia Pacific (Tokyo)',
  'ap-northeast-2': 'Asia Pacific (Seoul)',
  'ap-northeast-3': 'Asia Pacific (Osaka)',
  'ap-south-1': 'Asia Pacific (Mumbai)',
  'ap-southeast-1': 'Asia Pacific (Singapore)',
  'ap-southeast-2': 'Asia Pacific (Sydney)',
  'ca-central-1': 'Canada (Central)',
  'eu-central-1': 'Europe (Frankfurt)',
  'eu-north-1': 'Europe (Stockholm)',
  'eu-west-1': 'Europe (Ireland)',
  'eu-west-2': 'Europe (London)',
  'eu-west-3': 'Europe (Paris)',
  'sa-east-1': 'South America (São Paulo)',
  'us-east-1': 'US East (N. Virginia)',
  'us-east-2': 'US East (Ohio)',
  'us-west-1': 'US West (N. California)',
  'us-west-2': 'US West (Oregon)',
}

export type Region = keyof typeof REGIONS

export const CLOUD_GROUP_NAMES = [
  "production",
  "staging",
  "development",
  "testing",
  "qa"
] as const

export type CloudGroupName = typeof CLOUD_GROUP_NAMES[number]

export const EVENT_SOURCES = {
  aws: ["cloudtrail", "cloudwatch", "config", "inspector"],
  azure: ["activity-log", "security-center", "monitor"],
  gcp: ["audit-logs", "cloud-logging", "security-command-center"]
} as const

export type AWSCredentialType = 'ACCESS_KEY' | 'ASSUME_ROLE' | 'ROLES_ANYWHERE'; // AWS 크리덴셜 타입 예시, ACCESS_KEY만 활성화

export interface AWSCredential {
    accessKeyId: string;
    secretAccessKey: string;
    roleArn?: string;
}

export interface AWSEventSource {
    cloudTrailName?: string;
}

// 타 프로바이더 예시, 미사용
export type AzureCredentialType = 'APPLICATION';

export interface AzureCredential {
    tenantId: string;
    subscriptionId: string;
    applicationId: string;
    secretKey: string;
}

export interface AzureEventSource {
    storageAccountName?: string;
}

export type GCPCredentialType = 'JSON_TEXT';

export interface GCPCredential {
    projectId?: string;
    jsonText: string;
}

export interface GCPEventSource {
    storageAccountName?: string;
}

export interface ScheduleScanSetting {
    /**
     * frequency에 따라 각 필드의 필수 여부가 변경됨. 어떤 필드가 필수로 올지는 자유롭게 선택
     * HOUR  : 매시간을 의미
     * DAY   : 매일을 의미
     * WEEK  : 매주을 의미
     * MONTH : 매월을 의미
     */
    frequency: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';
    date?: string; // '1' ~ '28'
    weekday?: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
    hour?: string; // '0' ~ '23'
    minute?: string; // '0' ~ '60', '5' 단위로 증가
}

// 상세 정보 불러오는 API를 GET, 저장하는 API를 PUT으로 가정
export interface Cloud {
    id: string; // GET 요청 시 획득
    provider: Provider;
    name: string;
    cloudGroupName?: string[]; // 선택 가능한 cloudGroupName 목록을 서버에서 받아야하지만, 편의상 상수로 선언하여 사용
    eventProcessEnabled: boolean;
    userActivityEnabled: boolean;
    scheduleScanEnabled: boolean;
    scheduleScanSetting?: ScheduleScanSetting; // scheduleScanEnabled = true 인 경우만 존재
    regionList: string[];
    proxyUrl?: string;
    /**
     * 비밀 값이라 GET 요쳥 시 마스킹 상태로 데이터 전송됨. 마스킹된 값을 UI에서 어떻게 활용할지는 자유
     * 예 : { accessKeyId: "AKIA********18", secretAccessKey: "jZd1********0n" }
     */
    credentials: AWSCredential | AzureCredential | GCPCredential;
    credentialType: AWSCredentialType | AzureCredentialType | GCPCredentialType;
    /**
     * 비밀 값이 아니라 마스킹되지 않음
     */
    eventSource?: AWSEventSource | AzureEventSource | GCPEventSource;
}

export interface CloudConfig {
  id: string
  name: string
  provider: CloudProvider
  cloudGroupName?: string[]
  eventProcessEnabled: boolean
  userActivityEnabled: boolean
  scheduleScanEnabled: boolean
  scheduleScanSetting?: ScheduleScanSetting
  regionList: string[]
  proxyUrl?: string
  credentials: AWSCredential | AzureCredential | GCPCredential
  credentialType: AWSCredentialType | AzureCredentialType | GCPCredentialType
  eventSource?: string[]
  isActive?: boolean
  description?: string
  updatedAt?: string
  createdAt?: string
}

export interface CloudCredentials {
  aws?: AWSCredential
  azure?: AzureCredential
  gcp?: GCPCredential
}

export const CloudConfigSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  provider: z.enum(["aws", "azure", "gcp"]),
  cloudGroupName: z.array(z.enum(CLOUD_GROUP_NAMES)).min(1, "At least one cloud group is required"),
  regionList: z.array(z.string()).min(1, "At least one region is required").refine(
    (regions) => regions.includes("global"),
    "Global region must be included"
  ),
  credentials: z.object({
    aws: z.object({
      accessKeyId: z.string().min(1, "Access Key ID is required"),
      secretAccessKey: z.string().min(1, "Secret Access Key is required"),
      roleArn: z.string().optional()
    }).optional(),
    azure: z.object({
      tenantId: z.string().min(1, "Tenant ID is required"),
      subscriptionId: z.string().min(1, "Subscription ID is required"),
      applicationId: z.string().min(1, "Application ID is required"),
      secretKey: z.string().min(1, "Secret Key is required")
    }).optional(),
    gcp: z.object({
      projectId: z.string().min(1, "Project ID is required"),
      jsonText: z.string().min(1, "JSON Text is required")
    }).optional()
  }),
  eventSource: z.array(z.string()).min(1, "At least one event source is required"),
  isActive: z.boolean(),
  eventProcessEnabled: z.boolean().optional(),
  userActivityEnabled: z.boolean().optional(),
  scheduleScanEnabled: z.boolean().optional(),
  proxyUrl: z.string().optional()
})

export type CloudConfigFormData = z.infer<typeof CloudConfigSchema>

export interface ProviderFieldConfig {
  provider: CloudProvider
  credentialFields: {
    key: string
    label: string
    placeholder: string
    type: "text" | "password"
    required: boolean
  }[]
  eventSources: string[]
  disabled: boolean
}

export const PROVIDER_CONFIGS: Record<CloudProvider, ProviderFieldConfig> = {
  aws: {
    provider: "aws",
    credentialFields: [
      {
        key: "accessKeyId",
        label: "Access Key ID",
        placeholder: "AKIAIOSFODNN7EXAMPLE",
        type: "text",
        required: true
      },
      {
        key: "secretAccessKey",
        label: "Secret Access Key",
        placeholder: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYzEXAMPLEKEY",
        type: "password",
        required: true
      },
      {
        key: "roleArn",
        label: "Role ARN (Optional)",
        placeholder: "arn:aws:iam::123456789012:role/ExampleRole",
        type: "text",
        required: false
      }
    ],
    eventSources: [...EVENT_SOURCES.aws],
    disabled: false
  },
  azure: {
    provider: "azure",
    credentialFields: [
      {
        key: "tenantId",
        label: "Tenant ID",
        placeholder: "12345678-1234-1234-1234-123456789012",
        type: "text",
        required: true
      },
      {
        key: "subscriptionId",
        label: "Subscription ID",
        placeholder: "12345678-1234-1234-1234-123456789012",
        type: "text",
        required: true
      },
      {
        key: "applicationId",
        label: "Application ID",
        placeholder: "12345678-1234-1234-1234-123456789012",
        type: "text",
        required: true
      },
      {
        key: "secretKey",
        label: "Secret Key",
        placeholder: "Your application secret key",
        type: "password",
        required: true
      }
    ],
    eventSources: [...EVENT_SOURCES.azure],
    disabled: true
  },
  gcp: {
    provider: "gcp",
    credentialFields: [
      {
        key: "projectId",
        label: "Project ID",
        placeholder: "my-project-id",
        type: "text",
        required: true
      },
      {
        key: "jsonText",
        label: "Service Account JSON",
        placeholder: "Service account JSON content",
        type: "text",
        required: true
      }
    ],
    eventSources: [...EVENT_SOURCES.gcp],
    disabled: true
  }
}
