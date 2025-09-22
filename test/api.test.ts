import { cloudApi } from '@/lib/api'
import { CloudConfigFormData } from '@/types/types'

// Mock the data is not needed - we'll test the actual implementation

describe('cloudApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getCloudConfigs', () => {
    it('returns cloud configurations', async () => {
      const configs = await cloudApi.getCloudConfigs()
      
      expect(Array.isArray(configs)).toBe(true)
      expect(configs.length).toBeGreaterThan(0)
    })
  })

  describe('getCloudConfig', () => {
    it('returns specific configuration by id', async () => {
      const config = await cloudApi.getCloudConfig('1')
      expect(config).toBeTruthy()
    })

    it('returns null for non-existent id', async () => {
      const config = await cloudApi.getCloudConfig('non-existent')
      expect(config).toBeNull()
    })
  })

  describe('createCloudConfig', () => {
    it('creates new configuration', async () => {
      const formData: CloudConfigFormData = {
        name: 'New Config',
        provider: 'aws',
        cloudGroupName: ['production'],
        regionList: ['global', 'us-west-2'],
        eventProcessEnabled: true,
        userActivityEnabled: true,
        scheduleScanEnabled: true,
        credentials: {
          aws: {
            accessKeyId: 'key',
            secretAccessKey: 'secret'
          }
        },
        eventSource: ['cloudtrail'],
        isActive: true
      }

      const newConfig = await cloudApi.createCloudConfig(formData)
      expect(newConfig.name).toBe(formData.name)
      expect(newConfig.id).toBeTruthy()
    })
  })

  describe('updateCloudConfig', () => {
    it('updates existing configuration', async () => {
      const updateData: CloudConfigFormData = {
        name: 'Updated Config',
        provider: 'aws',
        cloudGroupName: ['production'],
        regionList: ['global', 'us-west-1'],
        eventProcessEnabled: false,
        userActivityEnabled: false,
        scheduleScanEnabled: false,
        credentials: {
          aws: {
            accessKeyId: 'updated-key',
            secretAccessKey: 'updated-secret'
          }
        },
        eventSource: ['cloudtrail'],
        isActive: false
      }

      const updatedConfig = await cloudApi.updateCloudConfig('1', updateData)
      expect(updatedConfig.name).toBe(updateData.name)
    })

    it('throws error for non-existent configuration', async () => {
      const updateData: CloudConfigFormData = {
        name: 'Updated Config',
        provider: 'aws',
        cloudGroupName: ['production'],
        regionList: ['global', 'us-east-1'],
        eventProcessEnabled: true,
        userActivityEnabled: true,
        scheduleScanEnabled: true,
        credentials: {
          aws: {
            accessKeyId: 'key',
            secretAccessKey: 'secret'
          }
        },
        eventSource: ['cloudtrail'],
        isActive: true
      }

      await expect(cloudApi.updateCloudConfig('non-existent', updateData))
        .rejects.toThrow('Cloud config not found')
    })
  })

  describe('deleteCloudConfig', () => {
    it('deletes existing configuration', async () => {
      await expect(cloudApi.deleteCloudConfig('1')).resolves.not.toThrow()
    })

    it('throws error for non-existent configuration', async () => {
      await expect(cloudApi.deleteCloudConfig('non-existent'))
        .rejects.toThrow('Cloud config not found')
    })
  })
})