import {
  CloudProvider,
  AWSCredential,
  AzureCredential,
  GCPCredential,
  CloudConfig,
  CloudConfigFormData,
  CloudConfigSchema,
  CLOUD_GROUP_NAMES,
  REGIONS,
  PROVIDER_CONFIGS
} from '@/types/types'

describe('Types and Constants', () => {
  describe('CloudProvider type', () => {
    it('accepts valid cloud providers', () => {
      const aws: CloudProvider = 'aws'
      const azure: CloudProvider = 'azure'
      const gcp: CloudProvider = 'gcp'
      
      expect(aws).toBe('aws')
      expect(azure).toBe('azure')
      expect(gcp).toBe('gcp')
    })
  })

  describe('Credential interfaces', () => {
    it('validates AWS credentials structure', () => {
      const awsCredential: AWSCredential = {
        accessKeyId: 'test-access-key',
        secretAccessKey: 'test-secret-key'
      }
      
      expect(awsCredential.accessKeyId).toBeDefined()
      expect(awsCredential.secretAccessKey).toBeDefined()
    })

    it('validates Azure credentials structure', () => {
      const azureCredential: AzureCredential = {
        tenantId: 'test-tenant-id',
        subscriptionId: 'test-subscription-id',
        applicationId: 'test-application-id',
        secretKey: 'test-secret-key'
      }
      
      expect(azureCredential.tenantId).toBeDefined()
      expect(azureCredential.subscriptionId).toBeDefined()
      expect(azureCredential.applicationId).toBeDefined()
      expect(azureCredential.secretKey).toBeDefined()
    })

    it('validates GCP credentials structure', () => {
      const gcpCredential: GCPCredential = {
        projectId: 'test-project-id',
        jsonText: '{"type": "service_account"}'
      }
      
      expect(gcpCredential.projectId).toBeDefined()
      expect(gcpCredential.jsonText).toBeDefined()
    })
  })

  describe('CloudConfig interface', () => {
    it('validates complete CloudConfig structure', () => {
      const config: CloudConfig = {
        id: 'test-id',
        name: 'Test Configuration',
        provider: 'aws',
        cloudGroupName: ['group1'],
        eventProcessEnabled: true,
        userActivityEnabled: true,
        scheduleScanEnabled: true,
        regionList: ['us-east-1'],
        credentials: {
          accessKeyId: 'test-key',
          secretAccessKey: 'test-secret'
        },
        credentialType: 'ACCESS_KEY',
        isActive: true,
        updatedAt: '2023-01-01T00:00:00Z',
        createdAt: '2023-01-01T00:00:00Z'
      }
      
      expect(config.id).toBeDefined()
      expect(config.name).toBeDefined()
      expect(config.provider).toBeDefined()
      expect(Array.isArray(config.regionList)).toBe(true)
    })
  })

  describe('CloudConfigSchema validation', () => {
    it('validates correct form data', () => {
      const validData: CloudConfigFormData = {
        name: 'Valid Config',
        provider: 'aws',
        cloudGroupName: [CLOUD_GROUP_NAMES[0]],
        regionList: ['global', 'us-east-1'],
        eventProcessEnabled: true,
        userActivityEnabled: true,
        scheduleScanEnabled: true,
        credentials: {
          aws: {
            accessKeyId: 'test-key',
            secretAccessKey: 'test-secret'
          }
        },
        eventSource: ['cloudtrail'],
        isActive: true
      }
      
      const result = CloudConfigSchema.safeParse(validData)
      if (!result.success) {
        console.log('Validation errors:', result.error)
      }
      expect(result.success).toBe(true)
    })

    it('rejects data without required fields', () => {
      const invalidData = {
        provider: 'aws'
      }
      
      const result = CloudConfigSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('Constants', () => {
    it('exports CLOUD_GROUP_NAMES array', () => {
      expect(Array.isArray(CLOUD_GROUP_NAMES)).toBe(true)
      expect(CLOUD_GROUP_NAMES.length).toBeGreaterThan(0)
    })

    it('exports REGIONS object', () => {
      expect(typeof REGIONS).toBe('object')
      expect(REGIONS).not.toBeNull()
      expect(REGIONS['global']).toBeDefined()
    })

    it('exports PROVIDER_CONFIGS object', () => {
      expect(typeof PROVIDER_CONFIGS).toBe('object')
      expect(PROVIDER_CONFIGS).not.toBeNull()
      
      const providers: CloudProvider[] = ['aws', 'azure', 'gcp']
      providers.forEach(provider => {
        expect(PROVIDER_CONFIGS[provider]).toBeDefined()
        expect(PROVIDER_CONFIGS[provider].provider).toBeDefined()
        expect(Array.isArray(PROVIDER_CONFIGS[provider].credentialFields)).toBe(true)
      })
    })
  })
})